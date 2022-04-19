document.addEventListener(
  "visibilitychange",
  () => {
    if (!window.unityInstance) {
      return;
    }

    var isFocused = document.visibilityState === "visible";
    window.unityInstance.SendMessage("PersistantObjects", "OnApplicationFocusChange", isFocused ? 1 : 0);
  },
  false
);
