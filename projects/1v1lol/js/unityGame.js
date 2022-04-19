window.gameScriptLoaded = true;

function showGame() {
  let gameJsonUrl = getGameJsonUrl();
  let hostname = window.location.hostname;
  if (hostname.indexOf("dev1v1") >= 0 || hostname.indexOf("dev.1v1") >= 0 || hostname.indexOf("test1v1") >= 0 || hostname.indexOf("test.1v1") >= 0) {
    let urlParams = new URLSearchParams(window.location.search);
    let queryParam = urlParams.get("version");

    if (queryParam !== undefined && queryParam !== null) {
      gameJsonUrl = gameJsonUrl.replace(/[0-9][0-9]+/i, queryParam);
    }
  }

  let gameInstance = UnityLoader.instantiate("gameContainer", gameJsonUrl, { onProgress: UnityProgress });
  //var gameInstance = UnityLoader.instantiate("gameContainer", "Build/WebGL.json", {onProgress: UnityProgress});

  window.unityInstance = gameInstance;
  showAds();
}

function UnityProgress(gameInstance, progress) {
  if (!gameInstance.Module) {
    return;
  }
  const loader = document.querySelector("#loader");
  if (!gameInstance.progress) {
    const progress = document.querySelector("#loader .progress");
    progress.style.display = "block";
    gameInstance.progress = progress.querySelector(".full");
    loader.querySelector(".spinner").style.display = "none";
  }
  gameInstance.progress.style.transform = `scaleX(${progress})`;
  if (progress === 1 && !gameInstance.removeTimeout) {
    loader.style.display = "none";
    gameLoaded = true;
  }
}
