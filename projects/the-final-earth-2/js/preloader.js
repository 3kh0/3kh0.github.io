if (window.gamePreloads == undefined) window.gamePreloads = [];
if (window.gamePreloadsBefore == undefined) window.gamePreloadsBefore = [];
if (window.useGamePack) {
    window.gamePreloads.push("js/jspack.js");
} else {
    window.gamePreloads.push("js/game_js.js");
    window.gamePreloads.push("js/pixi-sound.js");
    window.gamePreloads.push("js/pixi.js");
    window.gamePreloads.push("js/js_functions.js");
}

for (var i = window.gamePreloadsBefore.length - 1; i >= 0; i--) {
    window.gamePreloads.push(window.gamePreloadsBefore[i]);
}

(function() {
    window.createLoadingTextP = function(text) {
        var loadingText = document.createElement("P");
        loadingText.style.position = "absolute";
        loadingText.style.left = "50%";
        loadingText.style.top = "50%";
        loadingText.style.transform = "translate(-50%, -50%)";
        loadingText.innerText = text;
        loadingText.style.fontFamily = "Arial, sans-serif";
        loadingText.style.fontSize = "1.5em";
        loadingText.style.color = "#e0e0e0";
        loadingText.style.margin = "0";
        loadingText.style.opacity = 1;
        document.body.appendChild(loadingText);
        return loadingText;
    }

    var loadingExplainer;
    var explainerTexts = ["Undiscovering Computers...", "Carefully Stacking Ancient Ruins...", "Calculating Space Ship Trajectories...", "Planting Trees...",
        "Pixelating People...", "Wiring Supercomputers...", "Distributing Seeds...", "Arranging Light Shows...", "Making 'em Dance...", "Flattening Worlds...",
        "Dotting Stars..."];

    window.createLoadingExplainer = function() {
        var loadingExText = document.createElement("P");
        loadingExText.style.position = "absolute";
        loadingExText.style.left = "50%";
        loadingExText.style.top = "calc(50% + 1.5em)";
        loadingExText.style.transform = "translate(-50%, -50%)";
        function changeExplainerText() {
            if (explainerTexts.length > 0) {
                var i = Math.floor(explainerTexts.length * Math.random());
                var text = explainerTexts[i];
                loadingExText.innerText = text;
                explainerTexts.splice(i, 1);
            }
        }
        changeExplainerText();
        window.setTimeout(function() {
            if (loadingExText.parentNode != null) {
                changeExplainerText();
                function nextInterval() {
                    if (loadingExText.parentNode != null) {
                        changeExplainerText();
                        window.setTimeout(function() {
                            nextInterval();
                        }, 3300);
                    }
                }
                window.setTimeout(nextInterval, 3300);
            }
        }, 2200 + 3300);
        loadingExText.style.fontFamily = "Arial, sans-serif";
        loadingExText.style.fontSize = "1.5em";
        loadingExText.style.color = "#e0e0e0";
        loadingExText.style.margin = "0";
        loadingExText.className = "loadingExplainer";
        document.body.appendChild(loadingExText);
        loadingExplainer = loadingExText;
        return loadingExText;
    }

    window.removeLoadingExplainer = function() {
        document.body.removeChild(loadingExplainer);
    }
    
    window.removeLoadingTextP = function(loadingTextP) {
        document.body.removeChild(loadingTextP);
    }

    /* Preload the following:
    <script src="js/js_functions.js"></script>
    <script src="js/pixi.js"></script>
    <script src="js/pixi-sound.js"></script>
    <script src="js/game_js.js"></script> */

    function loadJS(filename, then) {
        var scriptelem = document.createElement('script');
        scriptelem.setAttribute("src", filename);
        document.getElementsByTagName('head')[0].appendChild(scriptelem);
        scriptelem.onload = then;
    }

    var loadingText = createLoadingTextP("Loading...");

    createLoadingExplainer();

    function loadAdditionals() {
        if (gamePreloads.length == 0) {
            removeLoadingTextP(loadingText);
        } else {
            var nextAdditionalPreload = window.gamePreloads.pop();
            loadJS(nextAdditionalPreload, loadAdditionals);
        }
    }

    loadAdditionals();
})();