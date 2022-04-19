function fixMacUserAgent() {
  var userAgentStr = window.navigator.appVersion;
  if (userAgentStr && userAgentStr.includes("Intel Mac OS X 11")) {
    userAgentStr = userAgentStr.replace("Intel Mac OS X 11", "Intel Mac OS X 10");
    setUserAgent(window, userAgentStr);
  }
}

function setUserAgent(curWindow, userAgent) {
  // Works on Firefox, Chrome, Opera and IE9+
  if (navigator.__defineGetter__) {
    navigator.__defineGetter__("userAgent", function () {
      return userAgent;
    });
  } else if (Object.defineProperty) {
    Object.defineProperty(navigator, "userAgent", {
      get: function () {
        return userAgent;
      },
    });
  }
  // Works on Safari
  if (curWindow.navigator.userAgent !== userAgent) {
    var userAgentProp = {
      get: function () {
        return userAgent;
      },
    };
    try {
      Object.defineProperty(curWindow.navigator, "userAgent", userAgentProp);
    } catch (e) {
      curWindow.navigator = Object.create(navigator, {
        userAgent: userAgentProp,
      });
    }
  }
}
