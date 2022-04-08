function initPreloader() {
	initImages();
}

function initImages() {
    img_mainMenu             = new Image();
    img_mainMenu.src             = "images/main_menu.png";
    img_mainMenu.addEventListener            ("load", imageLoaded);
    if (!mobile) {
        img_mainMenu_playGame = new Image();
        img_mainMenu_loadGame = new Image();
        img_mainMenu_levelSelect = new Image();
        //img_mainMenu_moreGames   = new Image();

        img_mainMenu_playGame.src    = "images/main_menu_play_game.png";
        img_mainMenu_loadGame.src    = "images/main_menu_load_game.png";
        img_mainMenu_levelSelect.src = "images/main_menu_level_select.png";
        //img_mainMenu_moreGames.src   = "images/main_menu_more_games.png";

        img_mainMenu_playGame.addEventListener   ("load", imageLoaded);
        img_mainMenu_loadGame.addEventListener   ("load", imageLoaded);
        img_mainMenu_levelSelect.addEventListener("load", imageLoaded);
        //img_mainMenu_moreGames.addEventListener  ("load", imageLoaded);
    }
}

function initSounds() {
    if(!mobile){
	music = new Audio("sounds/music.mp3");
    music.loop = true;

    sfx_bounce0      = new Audio("sounds/sfx_bounce0.mp3");
    sfx_bounce1      = new Audio("sounds/sfx_bounce1.mp3");
    sfx_checkpoint   = new Audio("sounds/sfx_checkpoint.mp3");
    sfx_click        = new Audio("sounds/sfx_click.mp3");
    sfx_coin         = new Audio("sounds/sfx_coin.mp3");
    sfx_die          = new Audio("sounds/sfx_die.mp3");
    sfx_win          = new Audio("sounds/sfx_win.mp3");
    sfx_intermission = new Audio("sounds/sfx_intermission.mp3");
	}
	else {
		
		/*music = new Audio("sounds/music.ogg");
    music.loop = true;

    sfx_bounce0      = new Audio("sounds/sfx_bounce0.ogg");
    sfx_bounce1      = new Audio("sounds/sfx_bounce1.ogg");
    sfx_checkpoint   = new Audio("sounds/sfx_checkpoint.ogg");
    sfx_click        = new Audio("sounds/sfx_click.ogg");
    sfx_coin         = new Audio("sounds/sfx_coin.ogg");
    sfx_die          = new Audio("sounds/sfx_die.ogg");
    sfx_win          = new Audio("sounds/sfx_win.ogg");
    sfx_intermission = new Audio("sounds/sfx_intermission.ogg");*/
	alert("on mobiles it doesnt work");
	
	}
    soundsToMute.push(music);
    soundsToMute.push(sfx_bounce0);
    soundsToMute.push(sfx_bounce1);
    soundsToMute.push(sfx_checkpoint);
    soundsToMute.push(sfx_click);
    soundsToMute.push(sfx_coin);
    soundsToMute.push(sfx_die);
    soundsToMute.push(sfx_win);
    soundsToMute.push(sfx_intermission);

    music.addEventListener           ("canplaythrough", soundLoaded);
    sfx_bounce0.addEventListener     ("canplaythrough", soundLoaded);
    sfx_bounce1.addEventListener     ("canplaythrough", soundLoaded);
    sfx_checkpoint.addEventListener  ("canplaythrough", soundLoaded);
    sfx_click.addEventListener       ("canplaythrough", soundLoaded);
    sfx_coin.addEventListener        ("canplaythrough", soundLoaded);
    sfx_die.addEventListener         ("canplaythrough", soundLoaded);
    sfx_win.addEventListener         ("canplaythrough", soundLoaded);
    sfx_intermission.addEventListener("canplaythrough", soundLoaded);
}

function imageLoaded() {
    loadedImages++;
    loadedAssets++;
    if (loadedImages >= TOTAL_IMAGES) {
        img_mainMenu.removeEventListener            ("load", imageLoaded);
        if (!mobile) {
            img_mainMenu_playGame.removeEventListener("load", imageLoaded);
            img_mainMenu_loadGame.removeEventListener("load", imageLoaded);
            img_mainMenu_levelSelect.removeEventListener("load", imageLoaded);
        }
        initSounds();
    }
}

function soundLoaded() {
	
	loadedSounds++;
	loadedAssets++;
	if (loadedSounds >= TOTAL_SOUNDS) {
		music.removeEventListener           ("canplaythrough", soundLoaded);
		sfx_bounce0.removeEventListener     ("canplaythrough", soundLoaded);
		sfx_bounce1.removeEventListener     ("canplaythrough", soundLoaded);
		sfx_checkpoint.removeEventListener  ("canplaythrough", soundLoaded);
		sfx_click.removeEventListener       ("canplaythrough", soundLoaded);
		sfx_coin.removeEventListener        ("canplaythrough", soundLoaded);
		sfx_die.removeEventListener         ("canplaythrough", soundLoaded);
		sfx_win.removeEventListener         ("canplaythrough", soundLoaded);
		sfx_intermission.removeEventListener("canplaythrough", soundLoaded);
	}
}

function updatePreloader() {
	if (loadedAssets >= TOTAL_ASSETS && loadBarAlpha > 0) {
		loadBarAlpha -= loadBarFade;
		if (loadBarAlpha < 0)
			loadBarAlpha = 0;
	}
}

var loadBarWidth = 250;

function drawPreloader() {
	// bg
	canvas.beginPath();
    canvas.fillStyle = "black";
	canvas.rect(os.x, os.y, cwh(CANVAS_WIDTH), cwh(CANVAS_HEIGHT));
    canvas.fill();
    
    // load text
    canvas.fillStyle = "white";
	canvas.font = cwh(16) + "px Arial";
	canvas.textAlign = "left";
	
	if (loadedImages < TOTAL_IMAGES) {
		canvas.fillText("Loading Images... (" + loadedImages + " / " + TOTAL_IMAGES + ")", cwh(CANVAS_WIDTH / 2 - loadBarWidth / 2) + os.x, cwh(245) + os.y);
	} else if (loadedSounds < TOTAL_SOUNDS) {
		canvas.fillText("Loading Sounds... (" + loadedSounds + " / " + TOTAL_SOUNDS + ")", cwh(CANVAS_WIDTH / 2 - loadBarWidth / 2) + os.x, cwh(245) + os.y);
	} else {
		canvas.fillText("Finished Loading!", cwh(CANVAS_WIDTH / 2 - loadBarWidth / 2) + os.x, cwh(245) + os.y);
	}
    
    // load bar fill
    if (onButton("pl_playGame") || loadBarAlpha > 0) {
		canvas.beginPath();
		
		canvas.fillStyle = "rgba(255, 255, 255, " + loadBarAlpha + ")";
	    
	    canvas.rect(cwh(CANVAS_WIDTH / 2 - loadBarWidth / 2 + 0.5) + os.x, cwh(255 + 0.5) + os.y, cwh(Math.floor(loadedAssets / TOTAL_ASSETS * loadBarWidth)), cwh(30));
	    canvas.fill();
	}
	
	// load bar outline
	canvas.beginPath();
    canvas.strokeStyle = "white";
    canvas.lineWidth = cwh(1);
	canvas.rect(cwh(CANVAS_WIDTH / 2 - loadBarWidth / 2 + 0.5) + os.x, cwh(255 + 0.5) + os.y, cwh(loadBarWidth), cwh(30));
    canvas.stroke();
    
    // load bar button
    if (loadedAssets >= TOTAL_ASSETS) {
	    canvas.fillStyle = "white";
	    
		canvas.font = "Bold " + cwh(20) + "px Arial";
		canvas.textAlign = "center";
		canvas.fillText("PLAY GAME", cwh(CANVAS_WIDTH / 2) + os.x, cwh(277.5) + os.y);
	}
    
    // warning text
    canvas.fillStyle = "white";
	canvas.font = cwh(16) + "px Arial";
	canvas.textAlign = "center";
	canvas.fillText("This is The World's Hardest Game.", cwh(CANVAS_WIDTH / 2) + os.x, cwh(310) + os.y);
	canvas.fillText("It is harder than any game you have", cwh(CANVAS_WIDTH / 2) + os.x, cwh(330) + os.y);
	canvas.fillText("ever played, or ever will play.", cwh(CANVAS_WIDTH / 2) + os.x, cwh(350) + os.y);
}