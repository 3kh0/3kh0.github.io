var instructions = [
	[-1, "Touch anywhere on the screen and drag to move.", CANVAS_WIDTH / 2],
	[2, "Collect all the coins.", CANVAS_WIDTH / 2],
	[3, "Sometimes there's extra checkpoints to help out.", CANVAS_WIDTH / 2],
	[4, "Sometimes going", "diagonally helps.", CANVAS_WIDTH / 4],
	[6, "You can change the player color on the menu.", CANVAS_WIDTH / 2]
];

function initInstructions() {
	instrForLevel = null;
	for (var i = 0; i < instructions.length; i++) {
		if (instructions[i][0] == level) {
			instrForLevel = i;
			break;
		}
	}
	if (instrForLevel != null) {
		instructionsOn = true;
		instructionsWaiting = true;
		instructionsFadingIn = false;
		instructionsFadingOut = false;
		instructionsTimer = 0;
		instructionsAlpha = 0;
	}
}

function updateInstructions() {
	if (instructionsOn && instrForLevel != null) {
		if (instructionsWaiting) {
			if (instructionsTimer < INSTRUCTIONS_WAIT_TIME_TOT) {
				instructionsTimer++;
			} else {
				instructionsTimer = 0;
				instructionsAlpha = 0;
				instructionsFadingIn = true;
				instructionsFadingOut = false;
				instructionsWaiting = false;
			}
		}
		else if (instructionsFadingIn) {
			if (instructionsAlpha < 1) {
				instructionsAlpha += INSTRUCTIONS_FADE_IN_SPEED;
			} else {
				instructionsAlpha = 1;
				instructionsTimer = 0;
				instructionsFadingIn = false;
				instructionsFadingOut = false;
				instructionsWaiting = false;
			}
		} else if (!instructionsFadingIn &&
				   !instructionsFadingOut &&
				   !instructionsWaiting) {
			if (instructionsTimer < INSTRUCTIONS_TIMER_TOT) {
				instructionsTimer++;
			} else {
				instructionsFadingIn = false;
				instructionsFadingOut = true;
				instructionsWaiting = false;
				instructionsTimer = 0;
				instructionsAlpha = 1;
			}
		} else if (instructionsFadingOut) {
			if (instructionsAlpha > 0) {
				instructionsAlpha -= INSTRUCTIONS_FADE_OUT_SPEED;
				if(instructionsAlpha<0){
					instructionsAlpha = 0;
				}
			} else {
				finishInstructions();
			}
		}
	}
}

function drawInstructions() {
	if (instrForLevel != null) {
		canvas.fillStyle = INSTRUCTIONS_COLOR + instructionsAlpha + ")";
		canvas.font = "Bold " + cwh(INSTRUCTIONS_TEXT_SIZE) + "px Arial";
		canvas.textAlign = "center";
		if (instructions[instrForLevel].length == 3) {
			canvas.fillText(instructions[instrForLevel][1], cwh(instructions[instrForLevel][2]) + os.x, cwh(INSTRUCTIONS_Y_0) + os.y);
		} else if (instructions[instrForLevel].length == 4) {
			canvas.fillText(instructions[instrForLevel][1], cwh(instructions[instrForLevel][3]) + os.x, cwh(INSTRUCTIONS_Y_0) + os.y);
			canvas.fillText(instructions[instrForLevel][2], cwh(instructions[instrForLevel][3]) + os.x, cwh(INSTRUCTIONS_Y_1) + os.y);
		}
	}
}

function finishInstructions() {
	instructionsOn = false;
	instructionsFadingIn = false;
	instructionsFadingOut = false;
	instructionsWaiting = false;
	instructionsTimer = 0;
	instructionsAlpha = 0;
	instrForLevel = null;
}