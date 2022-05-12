"use strict";
(function () {
  var a = document.createElement("canvas"),
    b = !!(a.getContext("webgl") || a.getContext("experimental-webgl")),
    c = [];
  if ((b || c.push("WebGL"), "undefined" == typeof WebAssembly && c.push("WebAssembly"), 0 === c.length)) window["C3_IsSupported"] = !0;
  else {
    var d = document.createElement("div");
    (d.id = "notSupportedWrap"), document.body.appendChild(d);
    var e = document.createElement("h2");
    (e.id = "notSupportedTitle"), (e.textContent = "Software update needed"), d.appendChild(e);
    var f = document.createElement("p");
    f.id = "notSupportedMessage";
    var g = "This content is not supported because your device's software is out-of-date. ",
      h = navigator.userAgent;
    (g += /android/i.test(h)
      ? '<br><br>On Android, fix this by making sure the <a href="https://play.google.com/store/apps/details?id=com.google.android.webview">Android System Webview</a> app has updates enabled and is up-to-date.'
      : /iphone|ipad|ipod/i.test(h)
      ? "<br><br>Note: the <strong>iOS simulator</strong> is not currently supported due to an <a href='https://bugs.webkit.org/show_bug.cgi?id=191064'>Apple bug</a>. If you are using the simulator, try testing on a real device instead."
      : (/msie/i.test(h) || /trident/i.test(h)) && !/edge\//i.test(h)
      ? "<br><br>Note: <strong>Internet Explorer</strong> is not supported. Try using <a href='https://www.google.com/chrome'>Chrome</a> or <a href='https://www.mozilla.org/firefox'>Firefox</a> instead."
      : "Try installing any available software updates. Alternatively try on a different device."),
      (g += "<br><br><em>Missing features: " + c.join(", ") + "<br>User agent: " + navigator.userAgent + "</em>"),
      (f.innerHTML = g),
      d.appendChild(f);
  }
})();
