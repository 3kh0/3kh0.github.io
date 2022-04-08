const BOTTOM_BUTTONS_Y = cwh(CANVAS_HEIGHT - BAR_HEIGHT - 10);
const BOTTOM_FONT = cwh(20) + "px Arial";

function drawMainMenu() {
  // music
  if (firstTimeOnMainMenu && !muteMusic) {
    music.play();
    firstTimeOnMainMenu = false;
  }

  // buttons
  if (!mobile) {
    if (onButton("mm_playGame")) canvas.drawImage(img_mainMenu_playGame, 0, BAR_HEIGHT);
    else if (onButton("mm_loadGame")) canvas.drawImage(img_mainMenu_loadGame, 0, BAR_HEIGHT);
    else if (onButton("mm_levelSelect")) canvas.drawImage(img_mainMenu_levelSelect, 0, BAR_HEIGHT);
    else if (onButton("mm_moreGames")) canvas.drawImage(img_mainMenu_moreGames, 0, BAR_HEIGHT);
    else canvas.drawImage(img_mainMenu, 0, BAR_HEIGHT);
  } else {
    canvas.drawImage(img_mainMenu, os.x, cwh(BAR_HEIGHT) + os.y, cwh(MENU_IMG_WIDTH), cwh(MENU_IMG_HEIGHT));
  }

  /*
	// bottom text - label
	canvas.fillStyle = "black";
	canvas.font = BOTTOM_FONT;
	canvas.textAlign = "left";
	canvas.fillText("MORE FROM THE SERIES:", 128, BOTTOM_BUTTONS_Y);

	// bottom text - twhg2
	if (onButton("mm_twhg2"))
		canvas.fillStyle = LS_BUTTON_HOVER_COLOR;
	else
		canvas.fillStyle = "black";
	canvas.font = "bold " + BOTTOM_FONT;
	canvas.textAlign = "left";
	canvas.fillText("TWHG2", 393, BOTTOM_BUTTONS_Y);

	// bottom text - sep 0
	drawSep(482, 533);

	// bottom text - twhg3
	if (onButton("mm_twhg3"))
		canvas.fillStyle = LS_BUTTON_HOVER_COLOR;
	else
		canvas.fillStyle = "black";
	canvas.font = "bold " + BOTTOM_FONT;
	canvas.textAlign = "left";
	canvas.fillText("TWHG3", 497, BOTTOM_BUTTONS_Y);

	// bottom text - sep 1
	drawSep(585, 533);

	// bottom text - twhg4
	if (onButton("mm_twhg4"))
		canvas.fillStyle = LS_BUTTON_HOVER_COLOR;
	else
		canvas.fillStyle = "black";
	canvas.font = "bold " + BOTTOM_FONT;
	canvas.textAlign = "left";
	canvas.fillText("TWHG4", 600, BOTTOM_BUTTONS_Y);
	
	// coming soon
	if (onButton("mm_twhg2"))
		drawComingSoon(430);
	else if (onButton("mm_twhg3"))
		drawComingSoon(534);
	else if (onButton("mm_twhg4"))
		drawComingSoon(637);
	*/
}

/*
function drawSep(x, y) {
	const SEP_SIZE = 10;
	const SEP_OUTLINE_SIZE = 3;
	canvas.beginPath();
	canvas.arc(x, y, SEP_SIZE / 2, 0, 2 * Math.PI, false);
	canvas.fillStyle = ENEMY_FILL_COLOR_0;
	canvas.fill();
	canvas.lineWidth = SEP_OUTLINE_SIZE;
	canvas.strokeStyle = ENEMY_OUTLINE_COLOR_0;
	canvas.stroke();
}

function drawComingSoon(x) {
	var y = 515;
	var triangle = 15;
	var rectWidth = 280;
	var rectHeight = 40;
	var strokeWidth = 2;
	var shadowOffset = 7;
	
	// shadow
	canvas.beginPath();
	canvas.moveTo(x + shadowOffset, y + shadowOffset);
	canvas.lineTo(x - triangle + shadowOffset, y - triangle + shadowOffset);
	canvas.lineTo(x - rectWidth / 2 + shadowOffset, y - triangle + shadowOffset);
	canvas.lineTo(x - rectWidth / 2 + shadowOffset, y - triangle - rectHeight + shadowOffset);
	canvas.lineTo(x + rectWidth / 2 + shadowOffset, y - triangle - rectHeight + shadowOffset);
	canvas.lineTo(x + rectWidth / 2 + shadowOffset, y - triangle + shadowOffset);
	canvas.lineTo(x + triangle + shadowOffset, y - triangle + shadowOffset);
	canvas.closePath();
	canvas.fillStyle = MENU_SHADOW_COLOR;
	canvas.fill();
	
	// main bubble
	canvas.beginPath();
	canvas.moveTo(x, y);
	canvas.lineTo(x - triangle, y - triangle);
	canvas.lineTo(x - rectWidth / 2, y - triangle);
	canvas.lineTo(x - rectWidth / 2, y - triangle - rectHeight);
	canvas.lineTo(x + rectWidth / 2, y - triangle - rectHeight);
	canvas.lineTo(x + rectWidth / 2, y - triangle);
	canvas.lineTo(x + triangle, y - triangle);
	canvas.closePath();
	canvas.fillStyle = "#fff";
	canvas.fill();
    canvas.lineWidth = strokeWidth;
    canvas.strokeStyle = "#000";
    canvas.stroke();
    
    // text
    canvas.fillStyle = "black";
	canvas.font = "bold " + BOTTOM_FONT;
	canvas.textAlign = "center";
	canvas.fillText("HTML5 COMING SOON...", x, y - 28);
}
*/