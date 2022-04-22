function hotkeys() {
	if (!mobile) {
        if (state == "preloader" && keydown.space && !hotkeyDown_space) {
            playSFX(sfx_click);
            if (localStorage.getItem("whg_level") == null)
                localStorage.setItem("whg_coins", "[-99]");
            hotkeyDown_space = true;
            state = "main_menu";
        } else if (state == "main_menu" && keydown.space && !hotkeyDown_space) {
            playSFX(sfx_intermission);
            player.dying = false;
            paused = false;
            level = 1;
            gameTimer = 0;
            deaths = 0;
            coinsSave = [-99];
            localStorage.setItem("whg_level", level);
            localStorage.setItem("whg_deaths", deaths);
            localStorage.setItem("whg_gameTimer", gameTimer);
            localStorage.setItem("whg_curCheck", 0);
            localStorage.setItem("whg_coins", "[-99]");
            justLoaded = false;
            initIntermission();
            hotkeyDown_space = true;
        } else if ((state == "game" || state == "intermission") && keydown.p && !hotkeyDown_p) {
            if (paused) {
                paused = false;
                if (pauseTime != 0)
                    gameTimer -= new Date().getTime() - pauseTime;
            } else {
                paused = true;
                pauseTime = new Date().getTime();
            }
            playSFX(sfx_click);
            hotkeyDown_p = true;
        } else if (keydown.m && !hotkeyDown_m) {
            if (muteSFX && muteMusic) {
                doUnmuteSFX();
                doUnmuteMusic();
                playSFX(sfx_click);
            } else {
                doMuteSFX();
                doMuteMusic();
            }
            hotkeyDown_m = true;
        }

        if (!keydown.space && hotkeyDown_space)
            hotkeyDown_space = false;
        if (!keydown.p && hotkeyDown_p)
            hotkeyDown_p = false;
        if (!keydown.m && hotkeyDown_m)
            hotkeyDown_m = false;
    }
}