function drawBars() {
    if (mobile) {
      // bars
      canvas.beginPath();
      canvas.rect(os.x, os.y, cwh(CANVAS_WIDTH), cwh(BAR_HEIGHT));
      canvas.fillStyle = "black";
      canvas.fill();
  
      canvas.beginPath();
      canvas.rect(os.x, cwh(CANVAS_HEIGHT - BAR_HEIGHT) + os.y, cwh(CANVAS_WIDTH), cwh(BAR_HEIGHT));
      canvas.fillStyle = "black";
      canvas.fill();
  
      // game text
      if (state == "game" || state == "intermission") {
        canvas.fillStyle = "white";
        canvas.font = cwh(30) + "px Arial";
        canvas.textAlign = "left";
        canvas.fillText("LEVEL: " + level, cwh(BAR_TEXT_FIX) + os.x, cwh(BAR_HEIGHT / 2 + BAR_TEXT_FIX) + os.y);
  
        if (getCoinsTotal() > 0) {
          canvas.fillStyle = "white";
          canvas.font = cwh(30) + "px Arial";
          canvas.textAlign = "center";
          canvas.fillText("COINS: " + getCoinsCollected() + "/" + getCoinsTotal(), cwh(CANVAS_WIDTH / 2) + os.x, cwh(BAR_HEIGHT / 2 + BAR_TEXT_FIX) + os.y);
        }
  
        canvas.fillStyle = "white";
        canvas.font = cwh(30) + "px Arial";
        canvas.textAlign = "right";
        canvas.fillText("FAILS: " + numberWithCommas(deaths), cwh(CANVAS_WIDTH - BAR_TEXT_FIX) + os.x, cwh(BAR_HEIGHT / 2 + BAR_TEXT_FIX) + os.y);
  
        /*
              if (onButton("bars_coolmath"))
                  canvas.fillStyle = BARS_BUTTON_HOVER_COLOR;
              else
                  canvas.fillStyle = "white";
              canvas.font = "30px Arial";
              canvas.textAlign = "left";
              canvas.fillText("COOLMATH", BAR_TEXT_FIX, CANVAS_HEIGHT - BAR_HEIGHT / 2 + BAR_TEXT_FIX);
              */
  
        canvas.fillStyle = "white";
        canvas.font = cwh(30) + "px Arial";
        canvas.textAlign = "right";
        if (muteSFX && muteMusic) {
          canvas.fillText("UNMUTE", cwh(CANVAS_WIDTH - BAR_TEXT_FIX) + os.x, cwh(CANVAS_HEIGHT - BAR_HEIGHT / 2 + BAR_TEXT_FIX) + os.y);
  
          //canvas.beginPath();
          //canvas.rect(cwh(704) + os.x, cwh(591) + os.y, cwh(25), cwh(3));
          //canvas.fill();
        } else {
          canvas.fillText("MUTE", cwh(CANVAS_WIDTH - BAR_TEXT_FIX) + os.x, cwh(CANVAS_HEIGHT - BAR_HEIGHT / 2 + BAR_TEXT_FIX) + os.y);
  
          //canvas.beginPath();
          //canvas.rect(cwh(704) + os.x, cwh(591) + os.y, cwh(25), cwh(3));
          //canvas.fill();
        }
  
        canvas.fillStyle = "white";
        canvas.font = cwh(30) + "px Arial";
        canvas.textAlign = "left";
        if (paused) {
          canvas.fillText("UNPAUSE", cwh(BAR_TEXT_FIX) + os.x, cwh(CANVAS_HEIGHT - BAR_HEIGHT / 2 + BAR_TEXT_FIX) + os.y);
  
          //canvas.beginPath();
          //canvas.rect(cwh(53) + os.x, cwh(591) + os.y, cwh(20), cwh(3));
          //canvas.fill();
        } else {
          canvas.fillText("PAUSE/MENU", cwh(BAR_TEXT_FIX) + os.x, cwh(CANVAS_HEIGHT - BAR_HEIGHT / 2 + BAR_TEXT_FIX) + os.y);
  
          //canvas.beginPath();
          //canvas.rect(cwh(8) + os.x, cwh(591) + os.y, cwh(20), cwh(3));
          //canvas.fill();
        }
      }
  
      // main menu / level select text
      else if (state == "main_menu" || state == "level_select" || state == "finish") {
        canvas.fillStyle = "white";
        canvas.font = cwh(30) + "px Arial";
        canvas.textAlign = "left";
        canvas.fillText("CREATOR: STEPHEN CRITOPH", cwh(BAR_TEXT_FIX) + os.x, cwh(BAR_HEIGHT / 2 + BAR_TEXT_FIX) + os.y);
  
        canvas.fillStyle = "white";
        canvas.font = cwh(30) + "px Arial";
        canvas.textAlign = "right";
        canvas.fillText("MUSIC: SNAYK", cwh(CANVAS_WIDTH - BAR_TEXT_FIX) + os.x, cwh(BAR_HEIGHT / 2 + BAR_TEXT_FIX) + os.y);
  
        /*
              if (onButton("mm_coolmathGames"))
                  canvas.fillStyle = BARS_BUTTON_HOVER_COLOR;
              else
                  canvas.fillStyle = "white";
              canvas.font = "30px Arial";
              canvas.textAlign = "left";
              canvas.fillText("COOLMATH GAMES", BAR_TEXT_FIX, CANVAS_HEIGHT - BAR_HEIGHT / 2 + BAR_TEXT_FIX);
              */
  
        canvas.fillStyle = "white";
        canvas.font = cwh(30) + "px Arial";
        canvas.textAlign = "right";
        if (muteSFX && muteMusic) {
          canvas.fillText("UNMUTE", cwh(CANVAS_WIDTH - BAR_TEXT_FIX) + os.x, cwh(CANVAS_HEIGHT - BAR_HEIGHT / 2 + BAR_TEXT_FIX) + os.y);
        } else {
          canvas.fillText("MUTE", cwh(CANVAS_WIDTH - BAR_TEXT_FIX) + os.x, cwh(CANVAS_HEIGHT - BAR_HEIGHT / 2 + BAR_TEXT_FIX) + os.y);
        }
        //canvas.beginPath();
        //canvas.rect(704, 591, 25, 3);
        //canvas.fill();
      }
    } else {
      // bars
      canvas.beginPath();
      canvas.rect(0, 0, CANVAS_WIDTH, BAR_HEIGHT);
      canvas.fillStyle = "black";
      canvas.fill();
  
      canvas.beginPath();
      canvas.rect(0, CANVAS_HEIGHT - BAR_HEIGHT, CANVAS_WIDTH, BAR_HEIGHT);
      canvas.fillStyle = "black";
      canvas.fill();
  
      // game text
      if (state == "game" || state == "intermission") {
        canvas.fillStyle = "white";
        canvas.font = "30px Arial";
        canvas.textAlign = "left";
        canvas.fillText("LEVEL: " + level, BAR_TEXT_FIX, BAR_HEIGHT / 2 + BAR_TEXT_FIX);
  
        if (getCoinsTotal() > 0) {
          canvas.fillStyle = "white";
          canvas.font = "30px Arial";
          canvas.textAlign = "center";
          canvas.fillText("COINS: " + getCoinsCollected() + "/" + getCoinsTotal(), CANVAS_WIDTH / 2, BAR_HEIGHT / 2 + BAR_TEXT_FIX);
        }
  
        canvas.fillStyle = "white";
        canvas.font = "30px Arial";
        canvas.textAlign = "right";
        canvas.fillText("FAILS: " + numberWithCommas(deaths), CANVAS_WIDTH - BAR_TEXT_FIX, BAR_HEIGHT / 2 + BAR_TEXT_FIX);
  
        /*
              if (onButton("bars_coolmath"))
                  canvas.fillStyle = BARS_BUTTON_HOVER_COLOR;
              else
                  canvas.fillStyle = "white";
              canvas.font = "30px Arial";
              canvas.textAlign = "left";
              canvas.fillText("COOLMATH", BAR_TEXT_FIX, CANVAS_HEIGHT - BAR_HEIGHT / 2 + BAR_TEXT_FIX);
              */
  
        if (onButton("bars_mute")) canvas.fillStyle = BARS_BUTTON_HOVER_COLOR;
        else canvas.fillStyle = "white";
        canvas.font = "30px Arial";
        canvas.textAlign = "right";
        if (muteSFX && muteMusic) {
          canvas.fillText("UNMUTE", CANVAS_WIDTH - BAR_TEXT_FIX, CANVAS_HEIGHT - BAR_HEIGHT / 2 + BAR_TEXT_FIX);
  
          canvas.beginPath();
          canvas.rect(704, 591, 25, 3);
          canvas.fill();
        } else {
          canvas.fillText("MUTE", CANVAS_WIDTH - BAR_TEXT_FIX, CANVAS_HEIGHT - BAR_HEIGHT / 2 + BAR_TEXT_FIX);
  
          canvas.beginPath();
          canvas.rect(704, 591, 25, 3);
          canvas.fill();
        }
  
        if (onButton("bars_pause/menu")) canvas.fillStyle = BARS_BUTTON_HOVER_COLOR;
        else canvas.fillStyle = "white";
        canvas.font = "30px Arial";
        canvas.textAlign = "left";
        if (paused) {
          canvas.fillText("UNPAUSE", BAR_TEXT_FIX, CANVAS_HEIGHT - BAR_HEIGHT / 2 + BAR_TEXT_FIX);
  
          canvas.beginPath();
          canvas.rect(53, 591, 20, 3);
          canvas.fill();
        } else {
          canvas.fillText("PAUSE/MENU", BAR_TEXT_FIX, CANVAS_HEIGHT - BAR_HEIGHT / 2 + BAR_TEXT_FIX);
  
          canvas.beginPath();
          canvas.rect(8, 591, 20, 3);
          canvas.fill();
        }
      }
  
      // main menu / level select text
      else if (state == "main_menu" || state == "level_select" || state == "finish") {
        //if (onButton("mm_stephenCritoph"))
        //    canvas.fillStyle = BARS_BUTTON_HOVER_COLOR;
        //else
        canvas.fillStyle = "white";
        canvas.font = "30px Arial";
        canvas.textAlign = "left";
        canvas.fillText("CREATOR: STEPHEN CRITOPH", BAR_TEXT_FIX, BAR_HEIGHT / 2 + BAR_TEXT_FIX);
  
        //if (onButton("mm_snayk"))
        //    canvas.fillStyle = BARS_BUTTON_HOVER_COLOR;
        //else
        canvas.fillStyle = "white";
        canvas.font = "30px Arial";
        canvas.textAlign = "right";
        canvas.fillText("MUSIC: SNAYK", CANVAS_WIDTH - BAR_TEXT_FIX, BAR_HEIGHT / 2 + BAR_TEXT_FIX);
  
        /*
              if (onButton("mm_coolmathGames"))
                  canvas.fillStyle = BARS_BUTTON_HOVER_COLOR;
              else
                  canvas.fillStyle = "white";
              canvas.font = "30px Arial";
              canvas.textAlign = "left";
              canvas.fillText("COOLMATH GAMES", BAR_TEXT_FIX, CANVAS_HEIGHT - BAR_HEIGHT / 2 + BAR_TEXT_FIX);
              */
  
        if (onButton("mm_mute")) canvas.fillStyle = BARS_BUTTON_HOVER_COLOR;
        else canvas.fillStyle = "white";
        canvas.font = "30px Arial";
        canvas.textAlign = "right";
        if (muteSFX && muteMusic) {
          canvas.fillText("UNMUTE", CANVAS_WIDTH - BAR_TEXT_FIX, CANVAS_HEIGHT - BAR_HEIGHT / 2 + BAR_TEXT_FIX);
        } else {
          canvas.fillText("MUTE", CANVAS_WIDTH - BAR_TEXT_FIX, CANVAS_HEIGHT - BAR_HEIGHT / 2 + BAR_TEXT_FIX);
        }
        canvas.beginPath();
        canvas.rect(704, 591, 25, 3);
        canvas.fill();
      }
    }
  }
  
  // https://stackoverflow.com/questions/2901102/how-to-print-a-number-with-commas-as-thousands-separators-in-javascript
  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  