window.configInit = true;

let conf;
let initWasCalled = false;

function initRemoteConfig() {
  initWasCalled = true;
  const remoteConfig = firebase.remoteConfig();
  remoteConfig.settings.minimumFetchIntervalMillis = 2000;

  remoteConfig
    .fetchAndActivate()
    .then(() => {
      conf = {};
      // Convert all of the remote config parameters to a dict:
      for (const [key, value] of Object.entries(remoteConfig.getAll())) {
        conf[key] = value.asString();
      }
    })
    .catch((err) => {
      console.warn("config error: " + err);
    });
}

// Being called from unity embedded browser on pc version
async function getRemoteConfigAsync(onFinish) {
  if (!initWasCalled) initRemoteConfig();

  while (conf === undefined) {
    await sleep(500);
  }

  onFinish(conf);
}

async function sendConfig() {
  while (conf === undefined || window.unityInstance === undefined) {
    await sleep(500);
  }

  await sleep(3000);
  window.unityInstance.SendMessage("PersistantObjects", "ActivateRemoteConfig", JSON.stringify(conf));
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
