const LS_TILE_SIZE = 5;
const LS_TILES_WIDTH = 20;
const LS_TILES_HEIGHT = 15;
const LS_BDR_SIZE = 2;
const LS_ENEMY_SIZE = 3;
const LS_COIN_SIZE = 3;
const LS_PLAYER_SIZE = 4;

const startX = 37;
const startY = 125;
const sepX = 125;
const sepY = 130;
const LS_Y_ADD_P2 = 58;
const LS_SHADOW_OFFSET = 5;

function drawLevelSelect() {
	drawPlainBg();
	var addX, addY;
	var numOnPage;
	var addToLevel = 0;
	var yAddP2 = 0;
	
	if (ls_page == 1) {
		numOnPage = LS_PAGE_TOT;
	}
	else if (ls_page == 2) {
		numOnPage = LS_ALL_TOT - LS_PAGE_TOT;
		addToLevel = LS_PAGE_TOT;
		yAddP2 = LS_Y_ADD_P2;
	}
	
	for (i = 0; i < numOnPage; i++) {
		curX = startX + sepX * (i % 6);
		curY = startY + (sepY * Math.floor(i / 6)) + yAddP2;
	    LS_draw_border (i + 1 + addToLevel, curX, curY);
		LS_draw_walls  (i + 1 + addToLevel, curX, curY);
		LS_draw_floor  (i + 1 + addToLevel, curX, curY);
		LS_draw_checks (i + 1 + addToLevel, curX, curY);
		LS_draw_coins  (i + 1 + addToLevel, curX, curY);
		LS_draw_enemies(i + 1 + addToLevel, curX, curY);
		LS_draw_player (i + 1 + addToLevel, curX, curY);
	    LS_draw_text   (i + 1 + addToLevel, curX, curY);
	}
	LS_draw_nav();
}

function LS_draw_player(l, x, y) {
	canvas.beginPath();
	canvas.rect(
		cwh(x + Math.floor((checkpoints[l][0][0] + checkpoints[l][0][2] / 2) * LS_TILE_SIZE - LS_PLAYER_SIZE / 2)) + os.x,
		cwh(y + Math.floor((checkpoints[l][0][1] + checkpoints[l][0][3] / 2) * LS_TILE_SIZE - LS_PLAYER_SIZE / 2)) + os.y,
		cwh(LS_PLAYER_SIZE), cwh(LS_PLAYER_SIZE));
	canvas.fillStyle = "rgba(" + player.redFill + ", " + player.greenFill + ", " + player.blueFill + ", 1)";
	canvas.fill();
}

function LS_draw_enemies(l, x, y) {
	// colors
	var enemyFillColor;
	if (l >= WALLS_RED) {
		enemyFillColor = ENEMY_FILL_COLOR_2;
	} else if (l >= WALLS_PURPLE) {
		enemyFillColor = ENEMY_FILL_COLOR_1;
	} else {
		enemyFillColor = ENEMY_FILL_COLOR_0;
	}
	
	for (var i = 0; i < enemies[l].length; i++) {
		canvas.beginPath();
		canvas.rect(
			cwh(x + Math.floor(enemies[l][i].simpleX * LS_TILE_SIZE - ((LS_TILE_SIZE - LS_COIN_SIZE) / 2))) + os.x,
			cwh(y + Math.floor(enemies[l][i].simpleY * LS_TILE_SIZE - ((LS_TILE_SIZE - LS_COIN_SIZE) / 2))) + os.y,
			cwh(LS_ENEMY_SIZE),
			cwh(LS_ENEMY_SIZE));
		canvas.fillStyle = enemyFillColor;
		canvas.fill();
	}
}

function LS_draw_coins(l, x, y) {
	for (var i = 0; i < coins[l].length; i++) {
		canvas.beginPath();
		canvas.rect(
			cwh(x + Math.floor(coins[l][i].simpleX * LS_TILE_SIZE + ((LS_TILE_SIZE - LS_COIN_SIZE) / 2))) + os.x,
			cwh(y + Math.floor(coins[l][i].simpleY * LS_TILE_SIZE + ((LS_TILE_SIZE - LS_COIN_SIZE) / 2))) + os.y,
			cwh(LS_COIN_SIZE),
			cwh(LS_COIN_SIZE));
		canvas.fillStyle = COIN_FILL_COLOR + "1)";;
		canvas.fill();
	}
}

function LS_draw_text(l, x, y) {
    if (onButton("ls_" + l))
        canvas.fillStyle = LS_BORDER_HOVER_COLOR;
    else
        canvas.fillStyle = "black";
	canvas.font = cwh(15) + "px Arial Black";
	canvas.textAlign = "center";
	canvas.fillText("LEVEL " + l,
		cwh(x + (LS_TILE_SIZE * LS_TILES_WIDTH / 2)) + os.x,
		cwh(y - 10) + os.y);
}

function LS_draw_checks(l, x, y) {
	for (var i = 0; i < checkpoints[l].length; i++) {
		canvas.beginPath();
		canvas.rect(
			cwh(x + checkpoints[l][i][0] * LS_TILE_SIZE) + os.x,
			cwh(y + checkpoints[l][i][1] * LS_TILE_SIZE) + os.y,
			cwh(checkpoints[l][i][2] * LS_TILE_SIZE),
			cwh(checkpoints[l][i][3] * LS_TILE_SIZE));
		canvas.fillStyle = CHECK_COLOR;
		canvas.fill();
	}
}

function LS_draw_walls(l, x, y) {
	// colors
	var wallsColor;
	if (l >= WALLS_RED) {
		wallsColor = WALLS_COLOR_2;
	} else if (l >= WALLS_PURPLE) {
		wallsColor = WALLS_COLOR_1;
	} else {
		wallsColor = WALLS_COLOR_0;
	}
	
	canvas.beginPath();
	canvas.rect(
		cwh(x) + os.x,
		cwh(y) + os.y,
		cwh(LS_TILE_SIZE * TILES_X), cwh(LS_TILE_SIZE * TILES_Y));
	canvas.fillStyle = wallsColor;
	canvas.fill();
	
	/*
	for (var i = 0; i < LS_TILES_HEIGHT; i++) {
		for (var j = 0; j < LS_TILES_WIDTH; j++) {
			if (walls[l][i][j] == 1) {
				canvas.beginPath();
				canvas.rect(
					cwh(x + j * LS_TILE_SIZE) + os.x,
					cwh(y + i * LS_TILE_SIZE) + os.y,
					cwh(LS_TILE_SIZE), cwh(LS_TILE_SIZE));
				canvas.fillStyle = wallsColor;
				canvas.fill();
			}
		}
	}
	*/
}

function LS_draw_floor(l, x, y) {
	// colors
	var floorColor0, floorColor1;
	if (l >= WALLS_RED) {
		floorColor0 = TILE_COLOR_2_0;
		floorColor1 = TILE_COLOR_2_1;
	} else if (l >= WALLS_PURPLE) {
		floorColor0 = TILE_COLOR_1_0;
		floorColor1 = TILE_COLOR_1_1;
	} else {
		floorColor0 = TILE_COLOR_0_0;
		floorColor1 = TILE_COLOR_0_1;
	}
	
	for (var i = 0; i < LS_TILES_HEIGHT; i++) {
		for (var j = 0; j < LS_TILES_WIDTH; j++) {
			if (walls[l][i][j] == 0) {
				var bgTileColor = floorColor0;
				if (j % 2 == 0 && i % 2 == 0 ||
					j % 2 == 1 && i % 2 == 1)
					bgTileColor = floorColor1;
				canvas.beginPath();
				canvas.rect(
					cwh(x + j * LS_TILE_SIZE) + os.x,
					cwh(y + i * LS_TILE_SIZE) + os.y,
					cwh(LS_TILE_SIZE), cwh(LS_TILE_SIZE));
				canvas.fillStyle = bgTileColor;
				canvas.fill();
			}
		}
	}
}

function LS_draw_border(l, x, y) {
	// shadow
	canvas.beginPath();
	canvas.rect(cwh(x - LS_BDR_SIZE + LS_SHADOW_OFFSET) + os.x, cwh(y - LS_BDR_SIZE + LS_SHADOW_OFFSET) + os.y,
		cwh(LS_TILE_SIZE * LS_TILES_WIDTH + LS_BDR_SIZE * 2), cwh(LS_TILE_SIZE * LS_TILES_HEIGHT + LS_BDR_SIZE * 2));
	canvas.fillStyle = MENU_SHADOW_COLOR;
	canvas.fill();
	
	// border
	canvas.beginPath();
	canvas.rect(cwh(x - LS_BDR_SIZE) + os.x, cwh(y - LS_BDR_SIZE) + os.y,
		cwh(LS_TILE_SIZE * LS_TILES_WIDTH + LS_BDR_SIZE * 2), cwh(LS_TILE_SIZE * LS_TILES_HEIGHT + LS_BDR_SIZE * 2));
    if (onButton("ls_" + l))
        canvas.fillStyle = LS_BORDER_HOVER_COLOR;
    else
        canvas.fillStyle = LS_BORDER_COLOR;
	canvas.fill();
}

function LS_draw_nav() {
	// back
    if (ls_page == 2) {
        if (onButton("ls_back"))
            canvas.fillStyle = LS_BUTTON_HOVER_COLOR;
        else
            canvas.fillStyle = "black";
    } else {
        canvas.fillStyle = LS_BUTTON_DISABLED_COLOR;
    }
	canvas.font = cwh(25) + "px Arial Black";
	canvas.textAlign = "left";
	canvas.fillText("<< BACK", cwh(15) + os.x, cwh(535) + os.y);
	
	// back to menu
    if (onButton("ls_menu"))
        canvas.fillStyle = LS_BUTTON_HOVER_COLOR;
    else
        canvas.fillStyle = "black";
	canvas.font = cwh(25) + "px Arial Black";
	canvas.textAlign = "center";
	canvas.fillText("BACK TO MENU ", cwh(CANVAS_WIDTH / 2) + os.x, cwh(535) + os.y);
	
	// next
    if (ls_page == 1) {
        if (onButton("ls_next"))
            canvas.fillStyle = LS_BUTTON_HOVER_COLOR;
        else
            canvas.fillStyle = "black";
    } else {
        canvas.fillStyle = LS_BUTTON_DISABLED_COLOR;
    }
	canvas.font = cwh(25) + "px Arial Black";
	canvas.textAlign = "right";
	canvas.fillText("NEXT >>", cwh(CANVAS_WIDTH - 15) + os.x, cwh(535) + os.y);
}