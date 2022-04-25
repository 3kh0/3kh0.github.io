var buttons = [
	["pl_playGame",       175, 625, 205, 335, ["preloader"]],
	
	
	["mm_playGame",       5, 280, 220, 256, ["main_menu"]],
    ["mm_levelSelect",    5, 290, 270, 306, ["main_menu"]], 
   
	["mm_mute2",          5, 180, 370, 406, ["main_menu"]],
 
  

//    ["mm_stephenCritoph",   1, 518,   0,  50, ["main_menu", "level_select", "finish"]],
//    ["mm_snayk",          518, 800,   0,  50, ["main_menu", "level_select", "finish"]],
    ["mm_mute",           550, 700, 450 , 490, ["main_menu", "level_select", "finish"]],
    ["bars_pause/menu",     0, 210, 450, 490, ["intermission", "game"]],
    ["fs",                250, 550, 550, 600, ["preloader", "main_menu", "level_select", "finish", "game", "intermission"]],
    ["bars_mute",        550, 700, 450 , 490, ["intermission", "game"]],
    ["ig_resumeGame",     180, 620,  80, 145, ["intermission", "game"]],
    ["ig_mainMenu",       180, 620, 145, 195, ["intermission", "game"]],
    ["ig_levelSelect",    180, 620, 195, 245, ["intermission", "game"]],
    ["ig_playerColor",    180, 620, 245, 295, ["intermission", "game"]],
    ["ig_muteSFX",        180, 620, 295, 345, ["intermission", "game"]],
    ["ig_muteMusic",      180, 620, 345, 395, ["intermission", "game"]],
    ["ig_playerBouncing", 180, 620, 395, 445, ["intermission", "game"]],
//    ["ig_stephenCritoph", 180, 620, 445, 510, ["intermission", "game"]],
    ["ls_back",             0, 145, 400, 450, ["level_select"]],
    ["ls_menu",           205, 590, 400, 450, ["level_select", "finish"]],
    ["ls_next",           590, 800, 400, 450, ["level_select"]],
	
	
	
    ["ls_1",              25, 125,  80, 187,  ["level_select"]],
    ["ls_2",              135, 235, 80, 187, ["level_select"]],
    ["ls_3",              245, 345, 80, 187, ["level_select"]],
    ["ls_4",              355, 455, 80, 187, ["level_select"]],
    ["ls_5",              465, 565, 80, 187, ["level_select"]],
    ["ls_6",              575, 675, 80, 187, ["level_select"]],
    
	["ls_7",              25, 125,  197, 295,  ["level_select"]],
    ["ls_8",              135, 235, 197, 295, ["level_select"]],
    ["ls_9",              245, 345, 197, 295, ["level_select"]],
    ["ls_10",              355, 455, 197, 295, ["level_select"]],
    ["ls_11",              465, 565, 197, 295, ["level_select"]],
    ["ls_12",              575, 675, 197, 295, ["level_select"]],
	
	["ls_13",              25, 125,  307, 402,  ["level_select"]],
    ["ls_14",              135, 235, 307, 402, ["level_select"]],
    ["ls_15",              245, 345, 307, 402, ["level_select"]],
    ["ls_16",              355, 455, 307, 402, ["level_select"]],
    ["ls_17",              465, 565, 307, 402, ["level_select"]],
    ["ls_18",              575, 675, 307, 402, ["level_select"]],
	
	["ls_19",              25, 125,  80, 187,  ["level_select"]],
    ["ls_20",              135, 235, 80, 187, ["level_select"]],
    ["ls_21",              245, 345, 80, 187, ["level_select"]],
    ["ls_22",              355, 455, 80, 187, ["level_select"]],
    ["ls_23",              465, 565, 80, 187, ["level_select"]],
    ["ls_24",              575, 675, 80, 187, ["level_select"]],
    
	["ls_25",              25, 125,  197, 295,  ["level_select"]],
    ["ls_26",              135, 235, 197, 295, ["level_select"]],
    ["ls_27",              245, 345, 197, 295, ["level_select"]],
    ["ls_28",              355, 455, 197, 295, ["level_select"]],
    ["ls_29",              465, 565, 197, 295, ["level_select"]],
    ["ls_30",              575, 675, 197, 295, ["level_select"]],
	
	["ls_31",              25, 125,  307, 402,  ["level_select"]],
    ["ls_32",              135, 235, 307, 402, ["level_select"]],
    ["ls_33",              245, 345, 307, 402, ["level_select"]],
    ["ls_34",              355, 455, 307, 402, ["level_select"]],
    ["ls_35",              465, 565, 307, 402, ["level_select"]],
    ["ls_36",              575, 675, 307, 402, ["level_select"]],
	
	["ls_37",              25, 125,  80, 187,  ["level_select"]],
    ["ls_38",              135, 235, 80, 187, ["level_select"]],
    ["ls_39",              245, 345, 80, 187, ["level_select"]],
    ["ls_40",              355, 455, 80, 187, ["level_select"]],
    ["ls_41",              465, 565, 80, 187, ["level_select"]],
    ["ls_42",              575, 675, 80, 187, ["level_select"]],
    
	["ls_43",              25, 125,  197, 295,  ["level_select"]],
    ["ls_44",              135, 235, 197, 295, ["level_select"]],
    ["ls_45",              245, 345, 197, 295, ["level_select"]],
    ["ls_46",              355, 455, 197, 295, ["level_select"]],
    ["ls_47",              465, 565, 197, 295, ["level_select"]],
    ["ls_48",              575, 675, 197, 295, ["level_select"]],
	
	["ls_49",              25, 125,  307, 402,  ["level_select"]],
    ["ls_50",              135, 235, 307, 402, ["level_select"]]
	
	
];

function correctButtonsTerms(name) {
   var group = 0;
	var group1 = [
		"ig_resumeGame",
		"ig_mainMenu",
		"ig_levelSelect",
		"ig_playerColor",
		"ig_muteSFX",
		"ig_muteMusic",
		"ig_playerBouncing",
		"ig_coolmathGames",
		"ig_stephenCritoph"
	];
	
	var group2 = [
		"ls_1",
		"ls_2",
		"ls_3",
		"ls_4",
		"ls_5",
		"ls_6",
		"ls_7",
		"ls_8",
		"ls_9",
		"ls_10", 
		"ls_11", 
		"ls_12", 
		"ls_13", 
		"ls_14", 
		"ls_15", 
		"ls_16", 
		"ls_17", 
		"ls_18"
	];
	
	var group3 = [
		"ls_19",
		"ls_20",
		"ls_21",
		"ls_22",
		"ls_23",
		"ls_24",
		"ls_25",
		"ls_26",
		"ls_27",
		"ls_28",
		"ls_29",
		"ls_30",
		"ls_31",
		"ls_32",
		"ls_33",
		"ls_34",
		"ls_35",
		"ls_36"
	];
	
	var group4 = [
		"ls_37",
		"ls_38",
		"ls_39",
		"ls_40",
		"ls_41",
		"ls_42",
		"ls_43",
		"ls_44",
		"ls_45",
		"ls_46",
		"ls_47",
		"ls_48",
		"ls_49",
		"ls_50"
	];
	
	for (var i = 0; i < group1.length; i++) {
		if (name == group1[i]) {
			group = 1;
			break;
		}
	}
	
	if (group == 0) {
		for (var i = 0; i < group2.length; i++) {
			if (name == group2[i]) {
				group = 2;
				break;
			}
		}
	}
	
	if (group == 0) {
		for (var i = 0; i < group3.length; i++) {
			if (name == group3[i]) {
				group = 3;
				break;
			}
		}
	}
	
	if (group == 0) {
		for (var i = 0; i < group4.length; i++) {
			if (name == group4[i]) {
				group = 4;
				break;
			}
		}
	}

    if (name == "pl_playGame") {
        if (loadedAssets == TOTAL_ASSETS)
            return true;
        else
            return false;
    }

	if (name == "ls_back") {
		if (ls_page == 2 || ls_page == 3)
			return true;
		else
			return false;
	}
	
	if (name == "ls_next") {
		if (ls_page == 1 || ls_page == 2)
			return true;
		else
			return false;
	}
	
    if (group == 1) {
        if (paused)
            return true;
        else
            return false;
    }

    else if (group == 2) {
        if (ls_page == 1)
            return true;
        else
            return false;
    }

  

    return true;
}

function clickButtons() {
    if (onButton("fs")) {
	    //playSFX(sfx_click);
        //justClicked = true;
        /*
        if (FSOn)
        	exitFullScreen();
    	else
        	goFullScreen();
        */
    } else if (onButton("pl_playGame")) {
	    //playSFX(sfx_click);
	    music.play();
        justClicked = true;
        if (localStorage.getItem("whg_level") == null)
	    	localStorage.setItem("whg_coins", "[-99]");
        state = "main_menu";
    } else if (onButton("mm_playGame")) {
	    playSFX(sfx_intermission);
        justClicked = true;
	    player.dying = false;
	    paused = false;
	    gameTimer = 0;
        level = 1;
        deaths = 0;
        coinsSave = [-99];
        localStorage.setItem("whg_gameTimer", gameTimer);
        localStorage.setItem("whg_level", level);
        localStorage.setItem("whg_deaths", deaths);
        localStorage.setItem("whg_curCheck", 0);
	    localStorage.setItem("whg_coins", "[-99]");
        justLoaded = false;
        initIntermission();
    } else if (onButton("mm_loadGame")) {
	    playSFX(sfx_intermission);
        justClicked = true;
	    player.dying = false;
	    paused = false;
	    if (localStorage.getItem("whg_level") == null) {
		    gameTimer = 0;
	        level     = 1;
	        deaths    = 0;
	        curCheck  = 0;
	        coinsSave = [-99];
	        localStorage.setItem("whg_gameTimer", gameTimer);
	        localStorage.setItem("whg_level", level);
	        localStorage.setItem("whg_deaths", deaths);
	        localStorage.setItem("whg_curCheck", 0);
		    localStorage.setItem("whg_coins", "[-99]");
	        resetCoins(level);
		} else {
			gameTimer = parseInt(localStorage.getItem("whg_gameTimer"));
	        level     = parseInt(localStorage.getItem("whg_level"));
	        deaths    = parseInt(localStorage.getItem("whg_deaths"));
	        curCheck  = parseInt(localStorage.getItem("whg_curCheck"));
	        loadSavedCoins();
		}
        justLoaded = true;
        justLoadedTimer = true;
        initIntermission();
    } else if (onButton("mm_levelSelect")) {
	    playSFX(sfx_click);
        justClicked = true;
        paused = false;
        player.dying = false;
        level = null;
        ls_page = 1;
        state = "level_select";
    }
    /*
    else if (onButton("mm_moreGames")) {
	    playSFX(sfx_click);
        justClicked = true;
		window.open(LINK_COOLMATH, "_blank");
	}
	*/
	else if (onButton("mm_mute")) {
        if (muteSFX && muteMusic) {
            justClicked = true;
            doUnmuteSFX();
            doUnmuteMusic();
	    	playSFX(sfx_click);
        } else {
            justClicked = true;
            doMuteSFX();
            doMuteMusic();
        }
    }else if (onButton("mm_mute2")) {
        if (muteSFX && muteMusic) {
            justClicked = true;
            doUnmuteSFX();
            doUnmuteMusic();
	    	playSFX(sfx_click);
        } else {
            justClicked = true;
            doMuteSFX();
            doMuteMusic();
        }
    }
	else if (onButton("mm_stephenCritoph")) {
	    playSFX(sfx_click);
        justClicked = true;
		window.open(LINK_STEPHEN, "_blank");
	} else if (onButton("mm_snayk")) {
	    playSFX(sfx_click);
        justClicked = true;
		window.open(LINK_SNAYK, "_blank");
	}
	/*
	else if (onButton("mm_coolmathGames")) {
	    playSFX(sfx_click);
        justClicked = true;
		window.open(LINK_COOLMATH, "_blank");
	}
	*/
	/*
	else if (onButton("bars_coolmath")) {
	    playSFX(sfx_click);
        justClicked = true;
		window.open(LINK_COOLMATH, "_blank");
	}
	*/
	else if (onButton("bars_mute")) {
        if (muteSFX && muteMusic) {
            justClicked = true;
            doUnmuteSFX();
            doUnmuteMusic();
	    	playSFX(sfx_click);
        } else {
            justClicked = true;
            doMuteSFX();
            doMuteMusic();
        }
    } else if (onButton("bars_pause/menu")) {
        if (paused) {
	    	playSFX(sfx_click);
            justClicked = true;
            paused = false;
            
            if (pauseTime != 0)
            	gameTimer -= new Date().getTime() - pauseTime;
        } else {
	    	playSFX(sfx_click);
            justClicked = true;
            paused = true;
            
            pauseTime = new Date().getTime();
        }
    } else if (onButton("ig_resumeGame")) {
        if (paused) {
	    	playSFX(sfx_click);
            justClicked = true;
	        paused = false;
	        
	        if (pauseTime != 0)
            	gameTimer -= new Date().getTime() - pauseTime;
        }
    } else if (onButton("ig_mainMenu")) {
        if (paused) {
	    	playSFX(sfx_click);
            justClicked = true;
	        paused = false;
	        player.dying = false;
	        level = null;
	        state = "main_menu";
        }
    } else if (onButton("ig_levelSelect")) {
        if (paused) {
			resetCoins(level);
	    	playSFX(sfx_click);
            justClicked = true;
	        paused = false;
	        player.dying = false;
	        level = null;
	        ls_page = 1;
	        state = "level_select";
        }
    } else if (onButton("ig_playerColor")) {
	    if (paused) {
			if (player.color < PLAYER_FILL_COLORS.length - 1) {
	    		playSFX(sfx_click);
                justClicked = true;
				player.color++;
				player.redFill = PLAYER_FILL_COLORS[player.color][0];
				player.greenFill = PLAYER_FILL_COLORS[player.color][1];
				player.blueFill = PLAYER_FILL_COLORS[player.color][2];
				player.redOutline = PLAYER_OUTLINE_COLORS[player.color][0];
				player.greenOutline = PLAYER_OUTLINE_COLORS[player.color][1];
				player.blueOutline = PLAYER_OUTLINE_COLORS[player.color][2];
			} else if (player.color < PLAYER_FILL_COLORS.length) {
	    		playSFX(sfx_click);
                justClicked = true;
				player.color++;
				player.redFill = PLAYER_FILL_COLORS[RAINBOW_START][0];
				player.greenFill = PLAYER_FILL_COLORS[RAINBOW_START][1];
				player.blueFill = PLAYER_FILL_COLORS[RAINBOW_START][2];
				player.redOutline = PLAYER_OUTLINE_COLORS[RAINBOW_START][0];
				player.greenOutline = PLAYER_OUTLINE_COLORS[RAINBOW_START][1];
				player.blueOutline = PLAYER_OUTLINE_COLORS[RAINBOW_START][2];
				player.rainbowUnder = RAINBOW_START;
				player.rainbowOver = RAINBOW_START + 1;
				player.rainbowPercent = 0;
			} else {
	    		playSFX(sfx_click);
                justClicked = true;
				player.color = 0;
				player.redFill = PLAYER_FILL_COLORS[player.color][0];
				player.greenFill = PLAYER_FILL_COLORS[player.color][1];
				player.blueFill = PLAYER_FILL_COLORS[player.color][2];
				player.redOutline = PLAYER_OUTLINE_COLORS[player.color][0];
				player.greenOutline = PLAYER_OUTLINE_COLORS[player.color][1];
				player.blueOutline = PLAYER_OUTLINE_COLORS[player.color][2];
				player.rainbowUnder = null;
				player.rainbowOver = null;
				player.rainbowPercent = 0;
			}
		}
	} else if (onButton("ig_muteSFX")) {
		if (paused) {
			if (muteSFX) {
                justClicked = true;
				doUnmuteSFX();
	    		playSFX(sfx_click);
			} else {
                justClicked = true;
				doMuteSFX();
			}
		}
	} else if (onButton("ig_muteMusic")) {
		if (paused) {
			if (muteMusic) {
	    		playSFX(sfx_click);
                justClicked = true;
				doUnmuteMusic();
			} else {
	    		playSFX(sfx_click);
                justClicked = true;
				doMuteMusic();
			}
		}
	} else if (onButton("ig_playerBouncing")) {
		if (paused) {
			if (bouncingEnabled) {
                justClicked = true;
				bouncingEnabled = false;
				
				player.bouncing = false;
				player.bounceState = null;
				player.bounceY = null;
				player.bounceTarget = null;
				player.width = 1;
				player.height = 1;
				
	    		playSFX(sfx_click);
			} else {
                justClicked = true;
				bouncingEnabled = true;
	    		playSFX(sfx_click);
			}
		}
	}
	/*
	else if (onButton("ig_coolmathGames")) {
	    if (paused) {
	    	playSFX(sfx_click);
            justClicked = true;
			window.open(LINK_COOLMATH, "_blank");
		}
	}
	*/
	else if (onButton("ig_stephenCritoph")) {
	    if (paused) {
	    	playSFX(sfx_click);
            justClicked = true;
			window.open(LINK_STEPHEN, "_blank");
		}
	} else if (onButton("ls_menu")) {
	    playSFX(sfx_click);
        justClicked = true;
        state = "main_menu";
    } else if (onButton("ls_back")) {
	    playSFX(sfx_click);
        justClicked = true;
        if (ls_page > 1)
        	ls_page--;
    }  else if (onButton("ls_next")) {
	    playSFX(sfx_click);
        justClicked = true;
        if (ls_page < 3)
        	ls_page++;
    }
    
    // level select
    if (state == "level_select") {
	    for (var i = 0; i < LS_ALL_TOT; i++) {
		    if (onButton("ls_" + (i + 1))) {
			    if ((i < LS_PAGE_TOT && ls_page == 1) ||
			    	(i >= LS_PAGE_TOT && ls_page == 2)) {	
	    			playSFX(sfx_intermission);
                    justClicked = true;		    
				    player.dying = false;
				    paused = false;
				    level = i + 1;
				    deaths = 0;
				    gameTimer = 0;
				    coinsSave = [-99];
				    keysSave = [-99];
				    curCheck = 0;
        			resetEnemies(i + 1);
				    resetCoins(i + 1);
				    resetKeys(i + 1);
        			resetDoors(i + 1);
			        localStorage.setItem("whg2_gameTimer", gameTimer);
			        localStorage.setItem("whg2_level", level);
			        localStorage.setItem("whg2_deaths", deaths);
			        localStorage.setItem("whg2_curCheck", 0);
			        localStorage.setItem("whg2_coins", "[-99]");
			        localStorage.setItem("whg2_keys", "[-99]");
				    initIntermission();
			    }else {
					if((i >= LS_PAGE_TOT*2 && ls_page == 3)){
						playSFX(sfx_intermission);
                    justClicked = true;		    
				    player.dying = false;
				    paused = false;
				    level = i + 1;
				    deaths = 0;
				    gameTimer = 0;
				    coinsSave = [-99];
				    keysSave = [-99];
				    curCheck = 0;
        			resetEnemies(i + 1);
				    resetCoins(i + 1);
				    resetKeys(i + 1);
        			resetDoors(i + 1);
			        localStorage.setItem("whg2_gameTimer", gameTimer);
			        localStorage.setItem("whg2_level", level);
			        localStorage.setItem("whg2_deaths", deaths);
			        localStorage.setItem("whg2_curCheck", 0);
			        localStorage.setItem("whg2_coins", "[-99]");
			        localStorage.setItem("whg2_keys", "[-99]");
				    initIntermission();
					}
					
				}
		    }
		}
	}
}

function onButton(name) {
    if (!justClicked) {
        var id = -1;
        for (var i = 0; i < buttons.length; i++) {
            if (buttons[i][0] == name) {
                id = i;
                break;
            }
        }
        if (id != -1) {
            var correctState = false;
            for (var i = 0; i < buttons[id][5].length; i++) {
                if (state == buttons[id][5][i]) {
                    correctState = true;
                    break;
                }
            }
            
            if (correctState &&
            	correctButtonsTerms(name) &&
                mouseX >= cwh(buttons[id][1]) + os.x &&
                mouseX <  cwh(buttons[id][2]) + os.x &&
                mouseY >= cwh(buttons[id][3]) + os.y &&
                mouseY <  cwh(buttons[id][4]) + os.y ) {
                if (cursorType == 0) {
                    $("#twhgCanvas").css("cursor", "pointer");
                    cursorType = 1;
                }
                touchOn = false;
                return true;
            }
        }
    }
    return false;
}