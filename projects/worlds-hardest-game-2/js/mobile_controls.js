

var touchOn = false;
var touchStartX = null;
var touchStartY = null;
var touchMoveX = null;
var touchMoveY = null;

var touchAngle = 0;

var testText = "default";

var touchSensitivity = 10;
var diagSensitivity  = 15;
var touchDistance = 0;

var cursorSize = 30;
var cursorLineSize = 10;
var arrowMainSize = 50;
var arrowPointSize = 15;

var cursorColor = "#888";
var arrowColor = "#000";

/*
// old mobile controls
canvasElement.addEventListener("touchstart", function(event) {
	if (state == "game" && !paused) {
		if (event.targetTouches.length == 1) {
			if (event.targetTouches[0].pageY >= cwh(BAR_HEIGHT) + os.y &&
				event.targetTouches[0].pageY <= cwh(CANVAS_HEIGHT - BAR_HEIGHT) + os.y) {
				touchOn = true;
				touchStartX = event.targetTouches[0].pageX;
				touchStartY = event.targetTouches[0].pageY;
				touchMoveX  = event.targetTouches[0].pageX;
				touchMoveY  = event.targetTouches[0].pageY;
			}
		}
	}
}, false);

canvasElement.addEventListener("touchend", function(event) {
	touchOn = false;
	keyUp    = false;
	keyDown  = false;
	keyRight = false;
	keyLeft  = false;
}, false);

canvasElement.addEventListener("touchmove", function(event) {
	if (state == "game" && !paused) {
		if (event.targetTouches.length == 1) {
			touchMoveX = event.targetTouches[0].pageX;
			touchMoveY = event.targetTouches[0].pageY;
		}
	}
}, false);
*/

if (mobile) {
    canvasElement.addEventListener("touchstart", function (event) {
        if (state == "game" && !paused && !hideKeys) {
            for (var i = 0; i < event.targetTouches.length; i++) {
                // down
                if (event.targetTouches[i].pageX > cwh(coords_down[0]) + os.x &&
                    event.targetTouches[i].pageX < cwh(coords_down[1]) + os.x &&
                    event.targetTouches[i].pageY > cwh(coords_down[2]) + os.y &&
                    event.targetTouches[i].pageY < cwh(coords_down[3]) + os.y) {
                    keyDown = true;
                }

                // right
                else if (event.targetTouches[i].pageX > cwh(coords_right[0]) + os.x &&
                    event.targetTouches[i].pageX < cwh(coords_right[1]) + os.x &&
                    event.targetTouches[i].pageY > cwh(coords_right[2]) + os.y &&
                    event.targetTouches[i].pageY < cwh(coords_right[3]) + os.y) {
                    keyRight = true;
                }

                // up
                else if (event.targetTouches[i].pageX > cwh(coords_up[0]) + os.x &&
                    event.targetTouches[i].pageX < cwh(coords_up[1]) + os.x &&
                    event.targetTouches[i].pageY > cwh(coords_up[2]) + os.y &&
                    event.targetTouches[i].pageY < cwh(coords_up[3]) + os.y) {
                    keyUp = true;
                }

                // left
                else if (event.targetTouches[i].pageX > cwh(coords_left[0]) + os.x &&
                    event.targetTouches[i].pageX < cwh(coords_left[1]) + os.x &&
                    event.targetTouches[i].pageY > cwh(coords_left[2]) + os.y &&
                    event.targetTouches[i].pageY < cwh(coords_left[3]) + os.y) {
                    keyLeft = true;
                }
            }
        }
    }, false);


    canvasElement.addEventListener("touchend", function (event) {
        if (state == "game" && !paused && !hideKeys) {
            for (var i = 0; i < event.changedTouches.length; i++) {
                // down
                if (event.changedTouches[i].pageX > cwh(coords_down[0]) + os.x &&
                    event.changedTouches[i].pageX < cwh(coords_down[1]) + os.x &&
                    event.changedTouches[i].pageY > cwh(coords_down[2]) + os.y &&
                    event.changedTouches[i].pageY < cwh(coords_down[3]) + os.y) {
                    keyDown = false;
                }

                // right
                else if (event.changedTouches[i].pageX > cwh(coords_right[0]) + os.x &&
                    event.changedTouches[i].pageX < cwh(coords_right[1]) + os.x &&
                    event.changedTouches[i].pageY > cwh(coords_right[2]) + os.y &&
                    event.changedTouches[i].pageY < cwh(coords_right[3]) + os.y) {
                    keyRight = false;
                }

                // up
                else if (event.changedTouches[i].pageX > cwh(coords_up[0]) + os.x &&
                    event.changedTouches[i].pageX < cwh(coords_up[1]) + os.x &&
                    event.changedTouches[i].pageY > cwh(coords_up[2]) + os.y &&
                    event.changedTouches[i].pageY < cwh(coords_up[3]) + os.y) {
                    keyUp = false;
                }

                // left
                else if (event.changedTouches[i].pageX > cwh(coords_left[0]) + os.x &&
                    event.changedTouches[i].pageX < cwh(coords_left[1]) + os.x &&
                    event.changedTouches[i].pageY > cwh(coords_left[2]) + os.y &&
                    event.changedTouches[i].pageY < cwh(coords_left[3]) + os.y) {
                    keyLeft = false;
                }
            }
        }
    }, false);

    var coords_down  = [580, 680, 440, 540];
    var coords_right = [690, 790, 440, 540];
    var coords_up    = [580, 680, 330, 430];
    var coords_left  = [470, 570, 440, 540];

    //var coords_down  = [690, 790, 440, 540];
    //var coords_right = [580, 680, 440, 540];
    //var coords_up    = [470, 570, 440, 540];
    //var coords_left  = [360, 460, 440, 540];

    function drawMobileControls() {
        if (!hideKeys) {
            var size = 100;
            var keyFill = "rgba(255, 255, 255, 0.5)";
            var keyFillOn = "rgba(255, 255, 0, 0.5)";
            var keyTextFill = "rgba(0, 0, 0, 0.5)";
            var keyTextFillOn = "rgba(255, 0, 0, 0.5)";
            var keyTextSize = 50;

            // down
            canvas.beginPath();
            canvas.rect(
                cwh(580) + os.x,
                cwh(440) + os.y,
                cwh(size),
                cwh(size)
            );
            if (keyDown) {
                canvas.fillStyle = keyFillOn;
            } else {
                canvas.fillStyle = keyFill;
            }
            canvas.fill();

            if (keyDown) {
                canvas.fillStyle = keyTextFillOn;
            } else {
                canvas.fillStyle = keyTextFill;
            }
            canvas.font = "Bold " + cwh(keyTextSize) + "px Arial Black";
            canvas.textAlign = "center";
            canvas.fillText("\u2193", cwh(630) + os.x, cwh(505) + os.y);

            // right
            canvas.beginPath();
            canvas.rect(
                cwh(690) + os.x,
                cwh(440) + os.y,
                cwh(size),
                cwh(size)
            );
            if (keyRight) {
                canvas.fillStyle = keyFillOn;
            } else {
                canvas.fillStyle = keyFill;
            }
            canvas.fill();

            if (keyRight) {
                canvas.fillStyle = keyTextFillOn;
            } else {
                canvas.fillStyle = keyTextFill;
            }
            canvas.font = "Bold " + cwh(keyTextSize) + "px Arial Black";
            canvas.textAlign = "center";
            canvas.fillText("\u2192", cwh(740) + os.x, cwh(505) + os.y);

            // up
            canvas.beginPath();
            canvas.rect(
                cwh(580) + os.x,
                cwh(330) + os.y,
                cwh(size),
                cwh(size)
            );
            if (keyUp) {
                canvas.fillStyle = keyFillOn;
            } else {
                canvas.fillStyle = keyFill;
            }
            canvas.fill();

            if (keyUp) {
                canvas.fillStyle = keyTextFillOn;
            } else {
                canvas.fillStyle = keyTextFill;
            }
            canvas.font = "Bold " + cwh(keyTextSize) + "px Arial Black";
            canvas.textAlign = "center";
            canvas.fillText("\u2191", cwh(630) + os.x, cwh(395) + os.y);

            // left
            canvas.beginPath();
            canvas.rect(
                cwh(470) + os.x,
                cwh(440) + os.y,
                cwh(size),
                cwh(size)
            );
            if (keyLeft) {
                canvas.fillStyle = keyFillOn;
            } else {
                canvas.fillStyle = keyFill;
            }
            canvas.fill();

            if (keyLeft) {
                canvas.fillStyle = keyTextFillOn;
            } else {
                canvas.fillStyle = keyTextFill;
            }
            canvas.font = "Bold " + cwh(keyTextSize) + "px Arial Black";
            canvas.textAlign = "center";
            canvas.fillText("\u2190", cwh(520) + os.x, cwh(505) + os.y);
        }
    }
}

// old
function mobileControls() {
	if (state == "game" && !paused && !hideKeys) {
		if (touchOn) {
			// cursor
			canvas.beginPath();
			canvas.moveTo(touchStartX - cwh(cursorSize / 2), touchStartY);
			canvas.lineTo(touchStartX + cwh(cursorSize / 2), touchStartY);
		    canvas.lineWidth = cwh(cursorLineSize);
		    canvas.strokeStyle = cursorColor;
		    canvas.stroke();
		    
		    canvas.beginPath();
			canvas.moveTo(touchStartX, touchStartY - cwh(cursorSize / 2));
			canvas.lineTo(touchStartX, touchStartY + cwh(cursorSize / 2));
		    canvas.lineWidth = cwh(cursorLineSize);
		    canvas.strokeStyle = cursorColor;
		    canvas.stroke();
		    
		    touchDistance = Math.sqrt(Math.pow(touchStartX - touchMoveX, 2) + Math.pow(touchStartY - touchMoveY, 2));
		    
		    touchAngle = angle360(touchStartX, touchStartY, touchMoveX, touchMoveY);
		    
		    // arrow - right
		    if (touchDistance >= cwh(touchSensitivity) && (touchAngle >= 360 - 45/2 || touchAngle < 45/2)) {
		    //if ((touchMoveX >= touchStartX + cwh(touchSensitivity)) &&
		    //   !(touchMoveY >= touchStartY + cwh(touchSensitivity) + cwh(diagSensitivity)) &&
		    //   !(touchMoveY <= touchStartY - cwh(touchSensitivity) - cwh(diagSensitivity))) {
			    canvas.beginPath();
				canvas.moveTo(touchStartX, touchStartY);
				canvas.lineTo(touchStartX + cwh(arrowMainSize), touchStartY);
				canvas.lineTo(touchStartX + cwh(arrowMainSize - arrowPointSize), touchStartY - cwh(arrowPointSize));
				canvas.lineTo(touchStartX + cwh(arrowMainSize), touchStartY);
				canvas.lineTo(touchStartX + cwh(arrowMainSize - arrowPointSize), touchStartY + cwh(arrowPointSize));
			    canvas.lineWidth = cwh(cursorLineSize);
			    canvas.strokeStyle = arrowColor;
			    canvas.stroke();
			    
			    keyUp    = false;
				keyDown  = false;
				keyRight = true;
				keyLeft  = false;
		    }
		    
		    // arrow - left
		    else if (touchDistance >= cwh(touchSensitivity) && (touchAngle >= 45*3 + 45/2 && touchAngle < 45*4 + 45/2)) {
		    //else if ((touchMoveX <= touchStartX - cwh(touchSensitivity)) &&
		    //        !(touchMoveY >= touchStartY + cwh(touchSensitivity) + cwh(diagSensitivity)) &&
		    //        !(touchMoveY <= touchStartY - cwh(touchSensitivity) - cwh(diagSensitivity))) {
			    canvas.beginPath();
				canvas.moveTo(touchStartX, touchStartY);
				canvas.lineTo(touchStartX - cwh(arrowMainSize), touchStartY);
				canvas.lineTo(touchStartX - cwh(arrowMainSize - arrowPointSize), touchStartY - cwh(arrowPointSize));
				canvas.lineTo(touchStartX - cwh(arrowMainSize), touchStartY);
				canvas.lineTo(touchStartX - cwh(arrowMainSize - arrowPointSize), touchStartY + cwh(arrowPointSize));
			    canvas.lineWidth = cwh(cursorLineSize);
			    canvas.strokeStyle = arrowColor;
			    canvas.stroke();
			    
			    keyUp    = false;
				keyDown  = false;
				keyRight = false;
				keyLeft  = true;
		    }
		    
		    // arrow - up
		    else if (touchDistance >= cwh(touchSensitivity) && (touchAngle >= 45*5 + 45/2 && touchAngle < 45*6 + 45/2)) {
		    //else if ((touchMoveY <= touchStartY - cwh(touchSensitivity)) &&
		    //        !(touchMoveX >= touchStartX + cwh(touchSensitivity) + cwh(diagSensitivity)) &&
		    //        !(touchMoveX <= touchStartX - cwh(touchSensitivity) - cwh(diagSensitivity))) {
			    canvas.beginPath();
				canvas.moveTo(touchStartX, touchStartY);
				canvas.lineTo(touchStartX, touchStartY - cwh(arrowMainSize));
				canvas.lineTo(touchStartX - cwh(arrowPointSize), touchStartY - cwh(arrowMainSize - arrowPointSize));
				canvas.lineTo(touchStartX, touchStartY - cwh(arrowMainSize));
				canvas.lineTo(touchStartX + cwh(arrowPointSize), touchStartY - cwh(arrowMainSize - arrowPointSize));
			    canvas.lineWidth = cwh(cursorLineSize);
			    canvas.strokeStyle = arrowColor;
			    canvas.stroke();
			    
			    keyUp    = true;
				keyDown  = false;
				keyRight = false;
				keyLeft  = false;
		    }
		    
		    // arrow - down
		    else if (touchDistance >= cwh(touchSensitivity) && (touchAngle >= 45*1 + 45/2 && touchAngle < 45*2 + 45/2)) {
		    //else if ((touchMoveY >= touchStartY + cwh(touchSensitivity)) &&
		    //        !(touchMoveX >= touchStartX + cwh(touchSensitivity) + cwh(diagSensitivity)) &&
		    //        !(touchMoveX <= touchStartX - cwh(touchSensitivity) - cwh(diagSensitivity))) {
			    canvas.beginPath();
				canvas.moveTo(touchStartX, touchStartY);
				canvas.lineTo(touchStartX, touchStartY + cwh(arrowMainSize));
				canvas.lineTo(touchStartX - cwh(arrowPointSize), touchStartY + cwh(arrowMainSize - arrowPointSize));
				canvas.lineTo(touchStartX, touchStartY + cwh(arrowMainSize));
				canvas.lineTo(touchStartX + cwh(arrowPointSize), touchStartY + cwh(arrowMainSize - arrowPointSize));
			    canvas.lineWidth = cwh(cursorLineSize);
			    canvas.strokeStyle = arrowColor;
			    canvas.stroke();
			    
			    keyUp    = false;
				keyDown  = true;
				keyRight = false;
				keyLeft  = false;
		    }
		    
		    // arrow - right/up
		    else if (touchDistance >= cwh(touchSensitivity) && (touchAngle >= 45*6 + 45/2 && touchAngle < 45*7 + 45/2)) {
		    //else if ((touchMoveX >= touchStartX + cwh(touchSensitivity)) &&
		    //         (touchMoveY <= touchStartY - cwh(touchSensitivity))) {
			    canvas.beginPath();
				canvas.moveTo(touchStartX, touchStartY);
				canvas.lineTo(touchStartX + cwh(arrowMainSize * 0.75), touchStartY - cwh(arrowMainSize * 0.75));
				canvas.lineTo(touchStartX + cwh(arrowMainSize * 0.75 - arrowPointSize * 1.5), touchStartY - cwh(arrowMainSize * 0.75));
				canvas.lineTo(touchStartX + cwh(arrowMainSize * 0.75), touchStartY - cwh(arrowMainSize * 0.75));
				canvas.lineTo(touchStartX + cwh(arrowMainSize * 0.75), touchStartY - cwh(arrowMainSize * 0.75 - arrowPointSize * 1.5));
			    canvas.lineWidth = cwh(cursorLineSize);
			    canvas.strokeStyle = arrowColor;
			    canvas.stroke();
			    
			    keyUp    = true;
				keyDown  = false;
				keyRight = true;
				keyLeft  = false;
		    }
		    
		    // arrow - right/down
		    else if (touchDistance >= cwh(touchSensitivity) && (touchAngle >= 45*0 + 45/2 && touchAngle < 45*1 + 45/2)) {
		    //else if ((touchMoveX >= touchStartX + cwh(touchSensitivity)) &&
		    //         (touchMoveY >= touchStartY - cwh(touchSensitivity))) {
			    canvas.beginPath();
				canvas.moveTo(touchStartX, touchStartY);
				canvas.lineTo(touchStartX + cwh(arrowMainSize * 0.75), touchStartY + cwh(arrowMainSize * 0.75));
				canvas.lineTo(touchStartX + cwh(arrowMainSize * 0.75 - arrowPointSize * 1.5), touchStartY + cwh(arrowMainSize * 0.75));
				canvas.lineTo(touchStartX + cwh(arrowMainSize * 0.75), touchStartY + cwh(arrowMainSize * 0.75));
				canvas.lineTo(touchStartX + cwh(arrowMainSize * 0.75), touchStartY + cwh(arrowMainSize * 0.75 - arrowPointSize * 1.5));
			    canvas.lineWidth = cwh(cursorLineSize);
			    canvas.strokeStyle = arrowColor;
			    canvas.stroke();
			    
			    keyUp    = false;
				keyDown  = true;
				keyRight = true;
				keyLeft  = false;
		    }
		    
		    // arrow - left/up
		    else if (touchDistance >= cwh(touchSensitivity) && (touchAngle >= 45*4 + 45/2 && touchAngle < 45*5 + 45/2)) {
		    //else if ((touchMoveX <= touchStartX - cwh(touchSensitivity)) &&
		    //         (touchMoveY <= touchStartY - cwh(touchSensitivity))) {
			    canvas.beginPath();
				canvas.moveTo(touchStartX, touchStartY);
				canvas.lineTo(touchStartX - cwh(arrowMainSize * 0.75), touchStartY - cwh(arrowMainSize * 0.75));
				canvas.lineTo(touchStartX - cwh(arrowMainSize * 0.75 - arrowPointSize * 1.5), touchStartY - cwh(arrowMainSize * 0.75));
				canvas.lineTo(touchStartX - cwh(arrowMainSize * 0.75), touchStartY - cwh(arrowMainSize * 0.75));
				canvas.lineTo(touchStartX - cwh(arrowMainSize * 0.75), touchStartY - cwh(arrowMainSize * 0.75 - arrowPointSize * 1.5));
			    canvas.lineWidth = cwh(cursorLineSize);
			    canvas.strokeStyle = arrowColor;
			    canvas.stroke();
			    
			    keyUp    = true;
				keyDown  = false;
				keyRight = false;
				keyLeft  = true;
		    }
		    
		    // arrow - left/down
		    else if (touchDistance >= cwh(touchSensitivity) && (touchAngle >= 45*2 + 45/2 && touchAngle < 45*3 + 45/2)) {
		    //else if ((touchMoveX <= touchStartX - cwh(touchSensitivity)) &&
		    //         (touchMoveY >= touchStartY + cwh(touchSensitivity))) {
			    canvas.beginPath();
				canvas.moveTo(touchStartX, touchStartY);
				canvas.lineTo(touchStartX - cwh(arrowMainSize * 0.75), touchStartY + cwh(arrowMainSize * 0.75));
				canvas.lineTo(touchStartX - cwh(arrowMainSize * 0.75 - arrowPointSize * 1.5), touchStartY + cwh(arrowMainSize * 0.75));
				canvas.lineTo(touchStartX - cwh(arrowMainSize * 0.75), touchStartY + cwh(arrowMainSize * 0.75));
				canvas.lineTo(touchStartX - cwh(arrowMainSize * 0.75), touchStartY + cwh(arrowMainSize * 0.75 - arrowPointSize * 1.5));
			    canvas.lineWidth = cwh(cursorLineSize);
			    canvas.strokeStyle = arrowColor;
			    canvas.stroke();
			    
			    keyUp    = false;
				keyDown  = true;
				keyRight = false;
				keyLeft  = true;
		    }
		    
		    else {
			    keyUp    = false;
				keyDown  = false;
				keyRight = false;
				keyLeft  = false;
			}
		}
	}
}

function angle(cx, cy, ex, ey) {
  var dy = ey - cy;
  var dx = ex - cx;
  var theta = Math.atan2(dy, dx); // range (-PI, PI]
  theta *= 180 / Math.PI; // rads to degs, range (-180, 180]
  return theta;
}
function angle360(cx, cy, ex, ey) {
  var theta = angle(cx, cy, ex, ey); // range (-180, 180]
  if (theta < 0) theta = 360 + theta; // range [0, 360)
  return theta;
}