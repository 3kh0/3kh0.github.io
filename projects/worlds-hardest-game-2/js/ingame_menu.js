var rainbowGradient = canvas.createLinearGradient(302, 0, 498, 0);
rainbowGradient.addColorStop(0,           "rgb(" + PLAYER_FILL_COLORS[0][0] + "," + PLAYER_FILL_COLORS[0][1] + "," + PLAYER_FILL_COLORS[0][2] + ")");
rainbowGradient.addColorStop(0 + (1 / 8), "rgb(" + PLAYER_FILL_COLORS[1][0] + "," + PLAYER_FILL_COLORS[1][1] + "," + PLAYER_FILL_COLORS[1][2] + ")");
rainbowGradient.addColorStop(0 + (2 / 8), "rgb(" + PLAYER_FILL_COLORS[2][0] + "," + PLAYER_FILL_COLORS[2][1] + "," + PLAYER_FILL_COLORS[2][2] + ")");
rainbowGradient.addColorStop(0 + (3 / 8), "rgb(" + PLAYER_FILL_COLORS[3][0] + "," + PLAYER_FILL_COLORS[3][1] + "," + PLAYER_FILL_COLORS[3][2] + ")");
rainbowGradient.addColorStop(0 + (4 / 8), "rgb(" + PLAYER_FILL_COLORS[4][0] + "," + PLAYER_FILL_COLORS[4][1] + "," + PLAYER_FILL_COLORS[4][2] + ")");
rainbowGradient.addColorStop(0 + (5 / 8), "rgb(" + PLAYER_FILL_COLORS[5][0] + "," + PLAYER_FILL_COLORS[5][1] + "," + PLAYER_FILL_COLORS[5][2] + ")");
rainbowGradient.addColorStop(0 + (6 / 8), "rgb(" + PLAYER_FILL_COLORS[6][0] + "," + PLAYER_FILL_COLORS[6][1] + "," + PLAYER_FILL_COLORS[6][2] + ")");
rainbowGradient.addColorStop(0 + (7 / 8), "rgb(" + PLAYER_FILL_COLORS[7][0] + "," + PLAYER_FILL_COLORS[7][1] + "," + PLAYER_FILL_COLORS[7][2] + ")");
rainbowGradient.addColorStop(1,           "rgb(" + PLAYER_FILL_COLORS[0][0] + "," + PLAYER_FILL_COLORS[0][1] + "," + PLAYER_FILL_COLORS[0][2] + ")");


function drawIGMenu() {
	if (!mobile) {
        if (paused && (state == "game" || state == "intermission")) {

            // bg
            canvas.beginPath();
            canvas.rect(0, BAR_HEIGHT, CANVAS_WIDTH, CANVAS_HEIGHT - BAR_HEIGHT * 2);
            canvas.fillStyle = "rgba(0, 0, 0, " + INGAME_MENU_BG_ALPHA + ")";
            canvas.fill();

            // timer
            canvas.fillStyle = TIMER_COLOR;
            canvas.font = IG_BTN_TEXT_SIZE + "px Arial";
            canvas.textAlign = "right";
            canvas.fillText(msToTime(gameTimer), CANVAS_WIDTH - 10, BAR_HEIGHT + 30);

            // resume game
            if (onButton("ig_resumeGame"))
                canvas.fillStyle = BARS_BUTTON_HOVER_COLOR;
            else
                canvas.fillStyle = "white";
            canvas.font = "Bold " + IG_BTN_TEXT_SIZE + "px Arial";
            canvas.textAlign = "center";
            canvas.fillText("RESUME GAME", CANVAS_WIDTH / 2, IG_BUTTONS_TOP);

            // main menu
            if (onButton("ig_mainMenu"))
                canvas.fillStyle = BARS_BUTTON_HOVER_COLOR;
            else
                canvas.fillStyle = "white";
            canvas.font = "Bold " + IG_BTN_TEXT_SIZE + "px Arial";
            canvas.textAlign = "center";
            canvas.fillText("MAIN MENU", CANVAS_WIDTH / 2, IG_BUTTONS_TOP + IG_BTN_SPACE);

            // level select
            if (onButton("ig_levelSelect"))
                canvas.fillStyle = BARS_BUTTON_HOVER_COLOR;
            else
                canvas.fillStyle = "white";
            canvas.font = "Bold " + IG_BTN_TEXT_SIZE + "px Arial";
            canvas.textAlign = "center";
            canvas.fillText("LEVEL SELECT", CANVAS_WIDTH / 2, IG_BUTTONS_TOP + IG_BTN_SPACE * 2);

            // change player color
            if (onButton("ig_playerColor")) {
                if (player.color == PLAYER_OUTLINE_COLORS.length) {
                    canvas.fillStyle = rainbowGradient;
                } else {
                    canvas.fillStyle = "rgba(" + player.redFill + ", " + player.greenFill + ", " + player.blueFill + ", 1)";
                }
            } else {
                canvas.fillStyle = "white";
            }
            canvas.font = "Bold " + IG_BTN_TEXT_SIZE + "px Arial";
            canvas.textAlign = "center";
            canvas.fillText("PLAYER COLOR", CANVAS_WIDTH / 2, IG_BUTTONS_TOP + IG_BTN_SPACE * 3);

            // mute SFX
            if (onButton("ig_muteSFX"))
                canvas.fillStyle = BARS_BUTTON_HOVER_COLOR;
            else
                canvas.fillStyle = "white";
            canvas.font = "Bold " + IG_BTN_TEXT_SIZE + "px Arial";
            canvas.textAlign = "center";
            if (muteSFX)
                canvas.fillText("UNMUTE SFX", CANVAS_WIDTH / 2, IG_BUTTONS_TOP + IG_BTN_SPACE * 4);
            else
                canvas.fillText("MUTE SFX", CANVAS_WIDTH / 2, IG_BUTTONS_TOP + IG_BTN_SPACE * 4);

            // mute music
            if (onButton("ig_muteMusic"))
                canvas.fillStyle = BARS_BUTTON_HOVER_COLOR;
            else
                canvas.fillStyle = "white";
            canvas.font = "Bold " + IG_BTN_TEXT_SIZE + "px Arial";
            canvas.textAlign = "center";
            if (muteMusic)
                canvas.fillText("UNMUTE MUSIC", CANVAS_WIDTH / 2, IG_BUTTONS_TOP + IG_BTN_SPACE * 5);
            else
                canvas.fillText("MUTE MUSIC", CANVAS_WIDTH / 2, IG_BUTTONS_TOP + IG_BTN_SPACE * 5);

            // player bouncing
            if (onButton("ig_playerBouncing"))
                canvas.fillStyle = BARS_BUTTON_HOVER_COLOR;
            else
                canvas.fillStyle = "white";
            canvas.font = "Bold " + IG_BTN_TEXT_SIZE + "px Arial";
            canvas.textAlign = "center";
            if (bouncingEnabled)
                canvas.fillText("DISABLE PLAYER BOUNCING", CANVAS_WIDTH / 2, IG_BUTTONS_TOP + IG_BTN_SPACE * 6);
            else
                canvas.fillText("ENABLE PLAYER BOUNCING", CANVAS_WIDTH / 2, IG_BUTTONS_TOP + IG_BTN_SPACE * 6);

            // coolmath games
            /*
            if (onButton("ig_coolmathGames"))
                canvas.fillStyle = BARS_BUTTON_HOVER_COLOR;
            else
                canvas.fillStyle = "white";
            canvas.font = "Bold " + IG_BTN_TEXT_SIZE + "px Arial";
            canvas.textAlign = "center";
            canvas.fillText("COOLMATH GAMES", CANVAS_WIDTH / 2, IG_BUTTONS_TOP + IG_BTN_SPACE * 7);
            */

            // stephen critoph
            //if (onButton("ig_stephenCritoph"))
            //    canvas.fillStyle = BARS_BUTTON_HOVER_COLOR;
            //else
                canvas.fillStyle = "white";
            canvas.font = "Bold " + IG_BTN_TEXT_SIZE + "px Arial";
            canvas.textAlign = "center";
            canvas.fillText("BY: STEPHEN CRITOPH", CANVAS_WIDTH / 2, IG_BUTTONS_TOP + IG_BTN_SPACE * 7);
        }
	} else {
        if (paused && (state == "game" || state == "intermission")) {

            // bg
            canvas.beginPath();
            canvas.rect(os.x, cwh(BAR_HEIGHT) + os.y, cwh(CANVAS_WIDTH), cwh(CANVAS_HEIGHT - BAR_HEIGHT * 2));
            canvas.fillStyle = "rgba(0, 0, 0, " + INGAME_MENU_BG_ALPHA + ")";
            canvas.fill();

            // timer
            canvas.fillStyle = TIMER_COLOR;
            canvas.font = cwh(IG_BTN_TEXT_SIZE) + "px Arial";
            canvas.textAlign = "right";
            canvas.fillText(msToTime(gameTimer), cwh(CANVAS_WIDTH - 10) + os.x, cwh(BAR_HEIGHT + 30) + os.y);

            // resume game
            canvas.fillStyle = "white";
            canvas.font = "Bold " + cwh(IG_BTN_TEXT_SIZE) + "px Arial";
            canvas.textAlign = "center";
            canvas.fillText("RESUME GAME", cwh(CANVAS_WIDTH / 2) + os.x, cwh(IG_BUTTONS_TOP) + os.y);

            // main menu
            canvas.fillStyle = "white";
            canvas.font = "Bold " + cwh(IG_BTN_TEXT_SIZE) + "px Arial";
            canvas.textAlign = "center";
            canvas.fillText("MAIN MENU", cwh(CANVAS_WIDTH / 2) + os.x, cwh(IG_BUTTONS_TOP + IG_BTN_SPACE) + os.y);

            // level select
            canvas.fillStyle = "white";
            canvas.font = "Bold " + cwh(IG_BTN_TEXT_SIZE) + "px Arial";
            canvas.textAlign = "center";
            canvas.fillText("LEVEL SELECT", cwh(CANVAS_WIDTH / 2) + os.x, cwh(IG_BUTTONS_TOP + IG_BTN_SPACE * 2) + os.y);

            // change player color
            canvas.fillStyle = "rgba(" + player.redFill + ", " + player.greenFill + ", " + player.blueFill + ", 1)";
            canvas.font = "Bold " + cwh(IG_BTN_TEXT_SIZE) + "px Arial";
            canvas.textAlign = "center";
            canvas.fillText("PLAYER COLOR", cwh(CANVAS_WIDTH / 2) + os.x, cwh(IG_BUTTONS_TOP + IG_BTN_SPACE * 3) + os.y);

            // mute SFX
            canvas.fillStyle = "white";
            canvas.font = "Bold " + cwh(IG_BTN_TEXT_SIZE) + "px Arial";
            canvas.textAlign = "center";
            if (muteSFX)
                canvas.fillText("UNMUTE SFX", cwh(CANVAS_WIDTH / 2) + os.x, cwh(IG_BUTTONS_TOP + IG_BTN_SPACE * 4) + os.y);
            else
                canvas.fillText("MUTE SFX", cwh(CANVAS_WIDTH / 2) + os.x, cwh(IG_BUTTONS_TOP + IG_BTN_SPACE * 4) + os.y);

            // mute music
            canvas.fillStyle = "white";
            canvas.font = "Bold " + cwh(IG_BTN_TEXT_SIZE) + "px Arial";
            canvas.textAlign = "center";
            if (muteMusic)
                canvas.fillText("UNMUTE MUSIC", cwh(CANVAS_WIDTH / 2) + os.x, cwh(IG_BUTTONS_TOP + IG_BTN_SPACE * 5) + os.y);
            else
                canvas.fillText("MUTE MUSIC", cwh(CANVAS_WIDTH / 2) + os.x, cwh(IG_BUTTONS_TOP + IG_BTN_SPACE * 5) + os.y);

            // player bouncing
            canvas.fillStyle = "white";
            canvas.font = "Bold " + cwh(IG_BTN_TEXT_SIZE) + "px Arial";
            canvas.textAlign = "center";
            if (bouncingEnabled)
                canvas.fillText("DISABLE PLAYER BOUNCING", cwh(CANVAS_WIDTH / 2) + os.x, cwh(IG_BUTTONS_TOP + IG_BTN_SPACE * 6) + os.y);
            else
                canvas.fillText("ENABLE PLAYER BOUNCING", cwh(CANVAS_WIDTH / 2) + os.x, cwh(IG_BUTTONS_TOP + IG_BTN_SPACE * 6) + os.y);

            // coolmath games
            /*
            canvas.fillStyle = "white";
            canvas.font = "Bold " + cwh(IG_BTN_TEXT_SIZE) + "px Arial";
            canvas.textAlign = "center";
            canvas.fillText("COOLMATH GAMES", CANVAS_WIDTH / 2, IG_BUTTONS_TOP + IG_BTN_SPACE * 7);
            */

            // stephen critoph
            canvas.fillStyle = "white";
            canvas.font = "Bold " + cwh(IG_BTN_TEXT_SIZE) + "px Arial";
            canvas.textAlign = "center";
            canvas.fillText("BY: STEPHEN CRITOPH", cwh(CANVAS_WIDTH / 2) + os.x, cwh(IG_BUTTONS_TOP + IG_BTN_SPACE * 7) + os.y);
        }
    }
}

// https://stackoverflow.com/questions/9763441/milliseconds-to-time-in-javascript
function msToTime(s) {

  function pad(n, z) {
    z = z || 2;
    return ('00' + n).slice(-z);
  }

  var ms = s % 1000;
  s = (s - ms) / 1000;
  var secs = s % 60;
  s = (s - secs) / 60;
  var mins = s % 60;
  var hrs = (s - mins) / 60;

  return pad(hrs) + ':' + pad(mins) + ':' + pad(secs) + '.' + pad(ms, 3);
}