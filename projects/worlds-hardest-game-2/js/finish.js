function updateFinish() {
	for (var i = 0; i < finishText.length; i++) {
		updateFinishLetter (i, 1);
	}
}

function updateFinishLetter (letterNum, frameNum) {
	while (frameNum > 0) {
		if (finishTextSpeed[letterNum][0] == 0 && finishTextSpeed[letterNum][2] < finish_text_speed_max) {
			finishTextSpeed[letterNum][2] += finish_text_speed_inc;
			finishTextSpeed[letterNum][1] += finishTextSpeed[letterNum][2];
			if (finishTextSpeed[letterNum][2] >= finish_text_speed_max) {
				finishTextSpeed[letterNum][2] = finish_text_speed_max;
				finishTextSpeed[letterNum][0] = 1;
			}
		} else if (finishTextSpeed[letterNum][0] == 1 && finishTextSpeed[letterNum][2] > 0) {
			finishTextSpeed[letterNum][2] -= finish_text_speed_inc;
			finishTextSpeed[letterNum][1] += finishTextSpeed[letterNum][2];
			if (finishTextSpeed[letterNum][2] <= 0) {
				finishTextSpeed[letterNum][2] = 0;
				finishTextSpeed[letterNum][0] = 2;
			}
		} else if (finishTextSpeed[letterNum][0] == 2 && finishTextSpeed[letterNum][2] < finish_text_speed_max) {
			finishTextSpeed[letterNum][2] += finish_text_speed_inc;
			finishTextSpeed[letterNum][1] -= finishTextSpeed[letterNum][2];
			if (finishTextSpeed[letterNum][2] >= finish_text_speed_max) {
				finishTextSpeed[letterNum][2] = finish_text_speed_max;
				finishTextSpeed[letterNum][0] = 3;
			}
		} else if (finishTextSpeed[letterNum][0] == 3 && finishTextSpeed[letterNum][2] > 0) {
			finishTextSpeed[letterNum][2] -= finish_text_speed_inc;
			finishTextSpeed[letterNum][1] -= finishTextSpeed[letterNum][2];
			if (finishTextSpeed[letterNum][2] <= 0) {
				finishTextSpeed[letterNum][2] = 0;
				finishTextSpeed[letterNum][0] = 0;
			}
		}
		frameNum--;
	}
}

function initFinish() {
	for (var i = 0; i < finishText.length; i++) {
		finishTextSpeed[i] = [0, finish_text_startY, 0];
		updateFinishLetter(i, i * finish_text_staggerFrames);
	}
}

function drawFinish() {
	
	// bg
    var grad = canvas.createLinearGradient(os.x, os.y, os.x, cwh(CANVAS_HEIGHT - BAR_HEIGHT * 2) + os.y);
    canvas.beginPath();
    canvas.rect(os.x, cwh(BAR_HEIGHT) + os.y, cwh(CANVAS_WIDTH), cwh(CANVAS_HEIGHT - BAR_HEIGHT * 2));
    //grad.addColorStop(0, INTERMISSION_COLOR_2_0);
    //grad.addColorStop(1, INTERMISSION_COLOR_2_1);
    grad.addColorStop(0, INTERMISSION_COLOR_0_0);
    grad.addColorStop(1, INTERMISSION_COLOR_0_1);
    canvas.fillStyle = grad;
    canvas.fill();
    
    // you win
    canvas.fillStyle = "#006";
	canvas.font = cwh(48) + "px Arial Black";
	canvas.textAlign = "center";
	
	for (var i = 0; i < finishText.length; i++) {
		canvas.fillText(finishText[i], cwh(finish_text_startX + (finish_title_spacing * i)) + os.x, cwh(finishTextSpeed[i][1]) + os.y);
	}
	
	// text
	canvas.fillStyle = "black";
	canvas.font = cwh(24) + "px Arial";
	canvas.textAlign = "center";
	canvas.fillText("Now try it with your eyes closed.", cwh(CANVAS_WIDTH / 2) + os.x, cwh(280) + os.y);
	
	// data
	canvas.fillStyle = "#555";
	canvas.font = cwh(24) + "px Arial";
	canvas.textAlign = "left";
	canvas.fillText("Fails:", cwh(finish_data_left) + os.x, cwh(370) + os.y);
	
	canvas.fillStyle = "#555";
	canvas.font = cwh(24) + "px Arial";
	canvas.textAlign = "left";
	canvas.fillText("Time:", cwh(finish_data_left) + os.x, cwh(400) + os.y);
	
	canvas.fillStyle = "black";
	canvas.font = cwh(24) + "px Arial";
	canvas.textAlign = "right";
	canvas.fillText(numberWithCommas(deaths), cwh(finish_data_right) + os.x, cwh(370) + os.y);
	
	canvas.fillStyle = "black";
	canvas.font = cwh(24) + "px Arial";
	canvas.textAlign = "right";
	canvas.fillText(msToTime(gameTimer), cwh(finish_data_right) + os.x, cwh(400) + os.y);
	
    
    // back to menu
    if (onButton("ls_menu"))
        canvas.fillStyle = LS_BUTTON_HOVER_COLOR;
    else
        canvas.fillStyle = "black";
	canvas.font = cwh(25) + "px Arial Black";
	canvas.textAlign = "center";
	canvas.fillText("BACK TO MENU ", cwh(CANVAS_WIDTH / 2) + os.x, cwh(535) + os.y);
    
}