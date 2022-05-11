"use strict";

const OFFLINE_DATA_FILE = "offline.js";
const CACHE_NAME_PREFIX = "c2offline";
const BROADCASTCHANNEL_NAME = "offline";
const CONSOLE_PREFIX = "[SW] ";

// Create a BroadcastChannel if supported.
const broadcastChannel = typeof BroadcastChannel === "undefined" ? null : new BroadcastChannel(BROADCASTCHANNEL_NAME);

//////////////////////////////////////
// Utility methods
function PostBroadcastMessage(o) {
  if (!broadcastChannel) return; // not supported

  // Impose artificial (and arbitrary!) delay of 3 seconds to make sure client is listening by the time the message is sent.
  // Note we could remove the delay on some messages, but then we create a race condition where sometimes messages can arrive
  // in the wrong order (e.g. "update ready" arrives before "started downloading update"). So to keep the consistent ordering,
  // delay all messages by the same amount.
  setTimeout(() => broadcastChannel.postMessage(o), 3000);
}

function Broadcast(type) {
  PostBroadcastMessage({
    type: type,
  });
}

function BroadcastDownloadingUpdate(version) {
  PostBroadcastMessage({
    type: "downloading-update",
    version: version,
  });
}

function BroadcastUpdateReady(version) {
  PostBroadcastMessage({
    type: "update-ready",
    version: version,
  });
}

function GetCacheBaseName() {
  // Include the scope to avoid name collisions with any other SWs on the same origin.
  // e.g. "c2offline-https://example.com/foo/" (won't collide with anything under bar/)
  return CACHE_NAME_PREFIX + "-" + self.registration.scope;
}

function GetCacheVersionName(version) {
  // Append the version number to the cache name.
  // e.g. "c2offline-https://example.com/foo/-v2"
  return GetCacheBaseName() + "-v" + version;
}

// Return caches.keys() filtered down to just caches we're interested in (with the right base name).
// This filters out caches from unrelated scopes.
function GetAvailableCacheNames() {
  return caches.keys().then((cacheNames) => {
    const cacheBaseName = GetCacheBaseName();
    return cacheNames.filter((n) => n.startsWith(cacheBaseName));
  });
}

// Identify if an update is pending, which is the case when we have 2 or more available caches.
// One must be an update that is waiting, since the next navigate that does an upgrade will
// delete all the old caches leaving just one currently-in-use cache.
function IsUpdatePending() {
  return GetAvailableCacheNames().then((availableCacheNames) => availableCacheNames.length >= 2);
}

// Automatically deduce the main page URL (e.g. index.html or main.aspx) from the available browser windows.
// This prevents having to hard-code an index page in the file list, implicitly caching it like AppCache did.
function GetMainPageUrl() {
  return clients
    .matchAll({
      includeUncontrolled: true,
      type: "window",
    })
    .then((clients) => {
      for (let c of clients) {
        // Parse off the scope from the full client URL, e.g. https://example.com/index.html -> index.html
        let url = c.url;
        if (url.startsWith(self.registration.scope)) url = url.substring(self.registration.scope.length);

        if (url && url !== "/") {
          // ./ is also implicitly cached so don't bother returning that
          // If the URL is solely a search string, prefix it with / to ensure it caches correctly.
          // e.g. https://example.com/?foo=bar needs to cache as /?foo=bar, not just ?foo=bar.
          if (url.startsWith("?")) url = "/" + url;

          return url;
        }
      }

      return ""; // no main page URL could be identified
    });
}

// Hack to fetch optionally bypassing HTTP cache until fetch cache options are supported in Chrome (crbug.com/453190)
function fetchWithBypass(request, bypassCache) {
  if (typeof request === "string") request = new Request(request);

  if (bypassCache) {
    // bypass enabled: add a random search parameter to avoid getting a stale HTTP cache result
    const url = new URL(request.url);
    url.search += Math.floor(Math.random() * 1000000);

    return fetch(url, {
      headers: request.headers,
      mode: request.mode,
      credentials: request.credentials,
      redirect: request.redirect,
      cache: "no-store",
    });
  } else {
    // bypass disabled: perform normal fetch which is allowed to return from HTTP cache
    return fetch(request);
  }
}

// Effectively a cache.addAll() that only creates the cache on all requests being successful (as a weak attempt at making it atomic)
// and can optionally cache-bypass with fetchWithBypass in every request
function CreateCacheFromFileList(cacheName, fileList, bypassCache) {
  // Kick off all requests and wait for them all to complete
  return Promise.all(fileList.map((url) => fetchWithBypass(url, bypassCache))).then((responses) => {
    // Check if any request failed. If so don't move on to opening the cache.
    // This makes sure we only open a cache if all requests succeeded.
    let allOk = true;

    for (let response of responses) {
      if (!response.ok) {
        allOk = false;
        console.error(CONSOLE_PREFIX + "Error fetching '" + originalUrl + "' (" + response.status + " " + response.statusText + ")");
      }
    }

    if (!allOk) throw new Error("not all resources were fetched successfully");

    // Can now assume all responses are OK. Open a cache and write all responses there.
    // TODO: ideally we can do this transactionally to ensure a complete cache is written as one atomic operation.
    // This needs either new transactional features in the spec, or at the very least a way to rename a cache
    // (so we can write to a temporary name that won't be returned by GetAvailableCacheNames() and then rename it when ready).
    return caches
      .open(cacheName)
      .then((cache) => {
        return Promise.all(responses.map((response, i) => cache.put(fileList[i], response)));
      })
      .catch((err) => {
        // Not sure why cache.put() would fail (maybe if storage quota exceeded?) but in case it does,
        // clean up the cache to try to avoid leaving behind an incomplete cache.
        console.error(CONSOLE_PREFIX + "Error writing cache entries: ", err);
        caches.delete(cacheName);
        throw err;
      });
  });
}

function UpdateCheck(isFirst) {
  // Always bypass cache when requesting offline.js to make sure we find out about new versions.
  return fetchWithBypass(OFFLINE_DATA_FILE, true)
    .then((r) => r.json())
    .then((data) => {
      const version = data.version;
      let fileList = data.fileList;
      const currentCacheName = GetCacheVersionName(version);

      return caches.has(currentCacheName).then((cacheExists) => {
        // Don't recache if there is already a cache that exists for this version. Assume it is complete.
        if (cacheExists) {
          // Log whether we are up-to-date or pending an update.
          return IsUpdatePending().then((isUpdatePending) => {
            if (isUpdatePending) {
              console.log(CONSOLE_PREFIX + "Update pending");
              Broadcast("update-pending");
            } else {
              console.log(CONSOLE_PREFIX + "Up to date");
              Broadcast("up-to-date");
            }
          });
        }

        // Implicitly add the main page URL to the file list, e.g. "index.html", so we don't have to assume a specific name.
        return GetMainPageUrl().then((mainPageUrl) => {
          // Prepend the main page URL to the file list if we found one and it is not already in the list.
          // Also make sure we request the base / which should serve the main page.
          fileList.unshift("./");

          if (mainPageUrl && fileList.indexOf(mainPageUrl) === -1) fileList.unshift(mainPageUrl);

          console.log(CONSOLE_PREFIX + "Caching " + fileList.length + " files for offline use");

          if (isFirst) Broadcast("downloading");
          else BroadcastDownloadingUpdate(version);

          // Note we don't bypass the cache on the first update check. This is because SW installation and the following
          // update check caching will race with the normal page load requests. For any normal loading fetches that have already
          // completed or are in-flight, it is pointless and wasteful to cache-bust the request for offline caching, since that
          // forces a second network request to be issued when a response from the browser HTTP cache would be fine.
          return CreateCacheFromFileList(currentCacheName, fileList, !isFirst)
            .then(IsUpdatePending)
            .then((isUpdatePending) => {
              if (isUpdatePending) {
                console.log(CONSOLE_PREFIX + "All resources saved, update ready");
                BroadcastUpdateReady(version);
              } else {
                console.log(CONSOLE_PREFIX + "All resources saved, offline support ready");
                Broadcast("offline-ready");
              }
            });
        });
      });
    })
    .catch((err) => {
      // Update check fetches fail when we're offline, but in case there's any other kind of problem with it, log a warning.
      console.warn(CONSOLE_PREFIX + "Update check failed: ", err);
    });
}

self.addEventListener("install", (event) => {
  // On install kick off an update check to cache files on first use.
  // If it fails we can still complete the install event and leave the SW running, we'll just
  // retry on the next navigate.
  event.waitUntil(
    UpdateCheck(true) // first update
      .catch(() => null)
  );
});

self.addEventListener("fetch", (event) => {
  const isNavigateRequest = event.request.mode === "navigate";

  let responsePromise = GetAvailableCacheNames().then((availableCacheNames) => {
    // No caches available: go to network
    if (!availableCacheNames.length) return fetch(event.request);

    // Resolve with the cache name to use.
    return Promise.resolve()
      .then(() => {
        // Prefer the oldest cache available. This avoids mixed-version responses by ensuring that if a new cache
        // is created and filled due to an update check while the page is running, we keep returning resources
        // from the original (oldest) cache only.
        if (availableCacheNames.length === 1 || !isNavigateRequest) return availableCacheNames[0];

        // We are making a navigate request with more than one cache available. Check if we can expire any old ones.
        return clients.matchAll().then((clients) => {
          // If there are other clients open, don't expire anything yet. We don't want to delete any caches they
          // might be using, which could cause mixed-version responses.
          // TODO: verify client count is as expected in navigate requests.
          // TODO: find a way to upgrade on reloading the only client. Chrome seems to think there are 2 clients in that case.
          if (clients.length > 1) return availableCacheNames[0];

          // Identify newest cache to use. Delete all the others.
          let latestCacheName = availableCacheNames[availableCacheNames.length - 1];
          console.log(CONSOLE_PREFIX + "Updating to new version");

          return Promise.all(availableCacheNames.slice(0, -1).map((c) => caches.delete(c))).then(() => latestCacheName);
        });
      })
      .then((useCacheName) => {
        return caches
          .open(useCacheName)
          .then((c) => c.match(event.request))
          .then((response) => response || fetch(event.request));
      });
  });

  if (isNavigateRequest) {
    // allow the main request to complete, then check for updates
    event.waitUntil(responsePromise.then(() => UpdateCheck(false))); // not first check
  }

  event.respondWith(responsePromise);
});
