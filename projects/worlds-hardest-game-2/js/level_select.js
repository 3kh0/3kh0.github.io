const LS_TILE_SIZE = 3.5;
const LS_TILES_WIDTH = 28;
const LS_TILES_HEIGHT = 20;
const LS_BDR_SIZE = 2;
const LS_ENEMY_SIZE = 2.4;
const LS_COIN_SIZE = 2;
const LS_KEY_SIZE = 2;
const LS_PLAYER_SIZE = 3;

const startX = 27;
const startY = 110;
const sepX = 110;
const sepY = 110;
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
		numOnPage = LS_PAGE_TOT;
		addToLevel = LS_PAGE_TOT;
	}
	else if (ls_page == 3) {
		numOnPage = LS_ALL_TOT - LS_PAGE_TOT * 2;
		addToLevel = LS_PAGE_TOT * 2;
	}
	
	for (i = 0; i < numOnPage; i++) {
			curX = startX + sepX * (i % 6);
			curY = startY + (sepY * Math.floor(i / 6)) + yAddP2;
		    LS_draw_border (i + 1 + addToLevel, curX, curY);
		    LS_draw_text   (i + 1 + addToLevel, curX, curY);
		if (i + 1 + addToLevel <= cheat_levelsDone) {
			LS_draw_walls  (i + 1 + addToLevel, curX, curY);
			LS_draw_floor  (i + 1 + addToLevel, curX, curY);
			LS_draw_checks (i + 1 + addToLevel, curX, curY);
			
			LS_draw_coins  (i + 1 + addToLevel, curX, curY);
			
			LS_draw_keys   (i + 1 + addToLevel, curX, curY);
			
			LS_draw_doors  (i + 1 + addToLevel, curX, curY);
			LS_draw_enemies(i + 1 + addToLevel, curX, curY);
			LS_draw_player (i + 1 + addToLevel, curX, curY);
	    }
	}
	LS_draw_nav();
}

function LS_draw_player(l, x, y) {
	canvas.beginPath();
	canvas.rect(
		x + Math.floor((checkpoints[l][0][0] + checkpoints[l][0][2] / 2) * LS_TILE_SIZE - LS_PLAYER_SIZE / 2),
		y + Math.floor((checkpoints[l][0][1] + checkpoints[l][0][3] / 2) * LS_TILE_SIZE - LS_PLAYER_SIZE / 2),
		LS_PLAYER_SIZE, LS_PLAYER_SIZE);
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
			x + Math.floor(enemies[l][i].simpleX * LS_TILE_SIZE *1.53 + ((LS_TILE_SIZE - LS_COIN_SIZE) / 2)),
			y + Math.floor(enemies[l][i].simpleY * LS_TILE_SIZE*1.53 + ((LS_TILE_SIZE - LS_COIN_SIZE) / 2)),
			LS_ENEMY_SIZE,
			LS_ENEMY_SIZE);
		canvas.fillStyle = enemyFillColor;
		canvas.fill();
	}
}

function LS_draw_coins(l, x, y) {
	for (var i = 0; i < coins[l].length; i++) {
		canvas.beginPath();
		canvas.rect(
			x + Math.floor(coins[l][i].simpleX * LS_TILE_SIZE + ((LS_TILE_SIZE - LS_COIN_SIZE) / 2)),
			y + Math.floor(coins[l][i].simpleY * LS_TILE_SIZE + ((LS_TILE_SIZE - LS_COIN_SIZE) / 2)),
			LS_COIN_SIZE,
			LS_COIN_SIZE);
		canvas.fillStyle = COIN_FILL_COLOR + "1)";;
		canvas.fill();
	}
}

function LS_draw_keys(l, x, y) {
	for (var i = 0; i < keys[l].length; i++) {
		canvas.beginPath();
		canvas.rect(
			x + Math.floor(keys[l][i].simpleX * LS_TILE_SIZE + ((LS_TILE_SIZE - LS_KEY_SIZE) / 2)),
			y + Math.floor(keys[l][i].simpleY * LS_TILE_SIZE + ((LS_TILE_SIZE - LS_KEY_SIZE) / 2)),
			LS_KEY_SIZE,
			LS_KEY_SIZE);
		canvas.fillStyle = KEY_OUTLINE_COLOR + "1)";;
		canvas.fill();
	}
}

function LS_draw_doors(l, x, y) {
	for (var i = 0; i < doors[l].length; i++) {
		canvas.beginPath();
		canvas.rect(
			x + doors[l][i].x * LS_TILE_SIZE,
			y + doors[l][i].y * LS_TILE_SIZE,
			doors[l][i].w * LS_TILE_SIZE,
			doors[l][i].h * LS_TILE_SIZE);
		canvas.fillStyle = DOOR_FILL_COLOR;
		canvas.fill();
	}
}

function LS_draw_text(l, x, y) {
	if (onButton("ls_" + l))
		canvas.fillStyle = LS_BORDER_HOVER_COLOR;
	else
		canvas.fillStyle = "black";
	canvas.font = "15px Arial Black";
	canvas.textAlign = "center";
	canvas.fillText("LEVEL " + l,
		x + (LS_TILE_SIZE * LS_TILES_WIDTH / 2),
		y - 10);
}

function LS_draw_checks(l, x, y) {
	for (var i = 0; i < checkpoints[l].length; i++) {
		canvas.beginPath();
		canvas.rect(
			x + checkpoints[l][i][0] * LS_TILE_SIZE,
			y + checkpoints[l][i][1] * LS_TILE_SIZE,
			checkpoints[l][i][2] * LS_TILE_SIZE,
			checkpoints[l][i][3] * LS_TILE_SIZE);
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
		x,
		y,
		LS_TILE_SIZE * TILES_X, LS_TILE_SIZE * TILES_Y);
	canvas.fillStyle = wallsColor;
	canvas.fill();
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
					x + j * LS_TILE_SIZE,
					y + i * LS_TILE_SIZE,
					LS_TILE_SIZE, LS_TILE_SIZE);
				canvas.fillStyle = bgTileColor;
				canvas.fill();
			}
		}
	}
}

function LS_draw_border(l, x, y) {
	// shadow
	canvas.beginPath();
	canvas.rect(x - LS_BDR_SIZE + LS_SHADOW_OFFSET, y - LS_BDR_SIZE + LS_SHADOW_OFFSET,
		LS_TILE_SIZE * LS_TILES_WIDTH + LS_BDR_SIZE * 2, LS_TILE_SIZE * LS_TILES_HEIGHT + LS_BDR_SIZE * 2);
	canvas.fillStyle = MENU_SHADOW_COLOR;
	canvas.fill();
	
	// border
	canvas.beginPath();
	canvas.rect(x - LS_BDR_SIZE, y - LS_BDR_SIZE,
		LS_TILE_SIZE * LS_TILES_WIDTH + LS_BDR_SIZE * 2, LS_TILE_SIZE * LS_TILES_HEIGHT + LS_BDR_SIZE * 2);
	if (onButton("ls_" + l))
		canvas.fillStyle = LS_BORDER_HOVER_COLOR;
	else
		canvas.fillStyle = LS_BORDER_COLOR;
	canvas.fill();
}

function LS_draw_nav() {
	// back
	if (ls_page == 2 || ls_page == 3) {
		if (onButton("ls_back"))
			canvas.fillStyle = LS_BUTTON_HOVER_COLOR;
		else
			canvas.fillStyle = "black";
	} else {
		canvas.fillStyle = LS_BUTTON_DISABLED_COLOR;
	}
	canvas.font = "25px Arial Black";
	canvas.textAlign = "left";
	canvas.fillText("<< BACK", 15, 435);
	
	// back to menu
	if (onButton("ls_menu"))
		canvas.fillStyle = LS_BUTTON_HOVER_COLOR;
	else
		canvas.fillStyle = "black";
	canvas.font = "25px Arial Black";
	canvas.textAlign = "center";
	canvas.fillText("BACK TO MENU ", CANVAS_WIDTH / 2, 435);
	
	// next
	if (ls_page == 1 || ls_page == 2) {
		if (onButton("ls_next"))
			canvas.fillStyle = LS_BUTTON_HOVER_COLOR;
		else
			canvas.fillStyle = "black";
	} else {
		canvas.fillStyle = LS_BUTTON_DISABLED_COLOR;
	}
	canvas.font = "25px Arial Black";
	canvas.textAlign = "right";
	canvas.fillText("NEXT >>", CANVAS_WIDTH - 15, 435);
}