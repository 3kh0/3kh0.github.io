function coin(x, y, gathered, saved, fadeAlpha, fadingIn, fadingOut, shineTime, shineAlpha, shiningIn, shiningOut) {
    if (gathered == null) {
      gathered = false;
    }
    if (saved == null) {
      saved = false;
    }
    if (fadeAlpha == null) {
      fadeAlpha = 1;
    }
    if (fadingIn == null) {
      fadingIn = false;
    }
    if (fadingOut == null) {
      fadingOut = false;
    }
    if (shineTime == null) {
      shineTime = createCoinShineTime();
    }
    if (shineAlpha == null) {
      shineAlpha = 0;
    }
    if (shiningIn == null) {
      shiningIn = false;
    }
    if (shiningOut == null) {
      shiningOut = false;
    }
  
    this.simpleX = x;
    this.simpleY = y;
    this.x = x * TILE_SIZE + TILE_SIZE / 2;
    this.y = y * TILE_SIZE + TILE_SIZE / 2;
    this.gathered = gathered;
    this.saved = saved;
    this.fadeAlpha = fadeAlpha;
    this.fadingIn = fadingIn;
    this.fadingOut = fadingOut;
    this.shineTime = shineTime;
    this.shineAlpha = shineAlpha;
    this.shiningIn = shiningIn;
    this.shiningOut = shiningOut;
  }
  
  var coins = [
    [],
    // level 1
    [],
  
    // level 2
    [new coin(9, 6.5), new coin(9.5, 6.5), new coin(10, 6.5), new coin(9, 7), new coin(9.5, 7), new coin(10, 7), new coin(9, 7.5), new coin(9.5, 7.5), new coin(10, 7.5)],
  
    // level 3
    [new coin(8, 3), new coin(14, 4), new coin(11, 11), new coin(5, 10)],
  
    // level 4
    [
      new coin(9 - 0.5, 9 - 0.5),
      new coin(9.38 - 0.5, 7.82 - 0.5),
      new coin(10.38 - 0.5, 7.09 - 0.5),
      new coin(11.61 - 0.5, 7.09 - 0.5),
      new coin(12.61 - 0.5, 7.82 - 0.5),
      new coin(13 - 0.5, 9 - 0.5),
      new coin(12.61 - 0.5, 10.17 - 0.5),
      new coin(11.61 - 0.5, 10.9 - 0.5),
      new coin(10.38 - 0.5, 10.9 - 0.5),
      new coin(9.38 - 0.5, 10.17 - 0.5),
    ],
  
    // level 5
    [new coin(7, 8), new coin(7.5, 8), new coin(8, 8), new coin(8.5, 8), new coin(9, 8), new coin(9.5, 8), new coin(10, 8), new coin(10.5, 8), new coin(11, 8), new coin(11.5, 8), new coin(12, 8)],
  
    // level 6
    [new coin(2, 8), new coin(6, 8), new coin(10, 8), new coin(14, 8)],
  
    // level 7
    [
      new coin(5, 3),
      new coin(5.5, 3),
      new coin(6, 3),
      new coin(5, 3.5),
      new coin(5.5, 3.5),
      new coin(6, 3.5),
      new coin(5, 4),
      new coin(5.5, 4),
      new coin(6, 4),
  
      new coin(13, 3),
      new coin(13.5, 3),
      new coin(14, 3),
      new coin(13, 3.5),
      new coin(13.5, 3.5),
      new coin(14, 3.5),
      new coin(13, 4),
      new coin(13.5, 4),
      new coin(14, 4),
  
      new coin(5, 10),
      new coin(5.5, 10),
      new coin(6, 10),
      new coin(5, 10.5),
      new coin(5.5, 10.5),
      new coin(6, 10.5),
      new coin(5, 11),
      new coin(5.5, 11),
      new coin(6, 11),
  
      new coin(13, 10),
      new coin(13.5, 10),
      new coin(14, 10),
      new coin(13, 10.5),
      new coin(13.5, 10.5),
      new coin(14, 10.5),
      new coin(13, 11),
      new coin(13.5, 11),
      new coin(14, 11),
    ],
  
    // level 8
    [new coin(8, 4), new coin(11, 4), new coin(11, 10), new coin(8, 10), new coin(5, 6), new coin(5, 10), new coin(14, 11), new coin(14, 4), new coin(13, 9), new coin(10, 6)],
  
    // level 9
    [new coin(16, 10), new coin(16.5, 10), new coin(17, 10), new coin(16, 10.5), new coin(16.5, 10.5), new coin(17, 10.5), new coin(16, 11), new coin(16.5, 11), new coin(17, 11), new coin(12, 11)],
  
    // level 10
    [],
  
    // level 11
    [
      new coin(6, 3),
      new coin(6, 3.5),
      new coin(6, 4),
      new coin(6.5, 3),
      new coin(7, 3),
      new coin(6.5, 3.5),
  
      new coin(6, 11),
      new coin(6, 10.5),
      new coin(6, 10),
      new coin(6.5, 10.5),
      new coin(6.5, 11),
      new coin(7, 11),
  
      new coin(14, 11),
      new coin(13.5, 11),
      new coin(13, 11),
      new coin(13.5, 10.5),
      new coin(14, 10.5),
      new coin(14, 10),
    ],
  
    // level 12
    [new coin(8, 7), new coin(7.5, 7), new coin(7, 7)],
  
    // level 13
    [],
  
    // level 14
    [],
  
    // level 15
    [],
  
    // level 16
    [
      new coin(9, 7),
      new coin(9.5, 7),
      new coin(10, 7),
      new coin(9, 7.5),
      new coin(9.5, 7.5),
      new coin(10, 7.5),
      new coin(9, 8),
      new coin(9.5, 8),
      new coin(10, 8),
  
      new coin(15, 4),
      new coin(15.5, 4),
      new coin(16, 4),
      new coin(16, 4.5),
      new coin(15.5, 4.5),
      new coin(15, 4.5),
      new coin(15, 5),
      new coin(15.5, 5),
      new coin(16, 5),
  
      new coin(3, 10),
      new coin(3.5, 10),
      new coin(4, 10),
      new coin(3, 10.5),
      new coin(3.5, 10.5),
      new coin(4, 10.5),
      new coin(3, 11),
      new coin(3.5, 11),
      new coin(4, 11),
    ],
  
    // level 17
    [],
  
    // level 18
    [
      new coin(6, 5),
      new coin(6.5, 5),
      new coin(7, 5),
      new coin(7.5, 5),
      new coin(8, 5),
      new coin(8.5, 5),
      new coin(9, 5),
      new coin(9.5, 5),
      new coin(10, 5),
      new coin(10.5, 5),
      new coin(11, 5),
      new coin(11.5, 5),
      new coin(12, 5),
      new coin(12.5, 5),
      new coin(13, 5),
  
      new coin(6, 5.5),
      new coin(6.5, 5.5),
      new coin(7, 5.5),
      new coin(7.5, 5.5),
      new coin(8, 5.5),
      new coin(8.5, 5.5),
      new coin(9, 5.5),
      new coin(9.5, 5.5),
      new coin(10, 5.5),
      new coin(10.5, 5.5),
      new coin(11, 5.5),
      new coin(11.5, 5.5),
      new coin(12, 5.5),
      new coin(12.5, 5.5),
      new coin(13, 5.5),
  
      new coin(6, 6),
      new coin(6.5, 6),
      new coin(7, 6),
      new coin(7.5, 6),
      new coin(8, 6),
      new coin(8.5, 6),
      new coin(9, 6),
      new coin(9.5, 6),
      new coin(10, 6),
      new coin(10.5, 6),
      new coin(11, 6),
      new coin(11.5, 6),
      new coin(12, 6),
      new coin(12.5, 6),
      new coin(13, 6),
  
      new coin(6, 6.5),
      new coin(6.5, 6.5),
      new coin(7, 6.5),
      new coin(7.5, 6.5),
      new coin(8, 6.5),
      new coin(8.5, 6.5),
      new coin(9, 6.5),
      new coin(9.5, 6.5),
      new coin(10, 6.5),
      new coin(10.5, 6.5),
      new coin(11, 6.5),
      new coin(11.5, 6.5),
      new coin(12, 6.5),
      new coin(12.5, 6.5),
      new coin(13, 6.5),
  
      new coin(6, 7),
      new coin(6.5, 7),
      new coin(7, 7),
      new coin(7.5, 7),
      new coin(8, 7),
      new coin(8.5, 7),
      new coin(9, 7),
      new coin(9.5, 7),
      new coin(10, 7),
      new coin(10.5, 7),
      new coin(11, 7),
      new coin(11.5, 7),
      new coin(12, 7),
      new coin(12.5, 7),
      new coin(13, 7),
  
      new coin(6, 7.5),
      new coin(6.5, 7.5),
      new coin(7, 7.5),
      new coin(7.5, 7.5),
      new coin(8, 7.5),
      new coin(8.5, 7.5),
      new coin(9, 7.5),
      new coin(9.5, 7.5),
      new coin(10, 7.5),
      new coin(10.5, 7.5),
      new coin(11, 7.5),
      new coin(11.5, 7.5),
      new coin(12, 7.5),
      new coin(12.5, 7.5),
      new coin(13, 7.5),
  
      new coin(6, 8),
      new coin(6.5, 8),
      new coin(7, 8),
      new coin(7.5, 8),
      new coin(8, 8),
      new coin(8.5, 8),
      new coin(9, 8),
      new coin(9.5, 8),
      new coin(10, 8),
      new coin(10.5, 8),
      new coin(11, 8),
      new coin(11.5, 8),
      new coin(12, 8),
      new coin(12.5, 8),
      new coin(13, 8),
  
      new coin(6, 8.5),
      new coin(6.5, 8.5),
      new coin(7, 8.5),
      new coin(7.5, 8.5),
      new coin(8, 8.5),
      new coin(8.5, 8.5),
      new coin(9, 8.5),
      new coin(9.5, 8.5),
      new coin(10, 8.5),
      new coin(10.5, 8.5),
      new coin(11, 8.5),
      new coin(11.5, 8.5),
      new coin(12, 8.5),
      new coin(12.5, 8.5),
      new coin(13, 8.5),
  
      new coin(6, 9),
      new coin(6.5, 9),
      new coin(7, 9),
      new coin(7.5, 9),
      new coin(8, 9),
      new coin(8.5, 9),
      new coin(9, 9),
      new coin(9.5, 9),
      new coin(10, 9),
      new coin(10.5, 9),
      new coin(11, 9),
      new coin(11.5, 9),
      new coin(12, 9),
      new coin(12.5, 9),
      new coin(13, 9),
    ],
  
    // level 19
    [],
  
    // level 20
    [new coin(7, 5), new coin(7, 8), new coin(10, 7), new coin(13, 5), new coin(13, 8), new coin(16, 7), new coin(17, 4)],
  
    // level 21
    [
      new coin(9, 3),
      new coin(9.5, 3),
      new coin(10, 3),
      new coin(9, 3.5),
      new coin(9.5, 3.5),
      new coin(10, 3.5),
      new coin(9, 4),
      new coin(9.5, 4),
      new coin(10, 4),
      new coin(9, 10),
      new coin(9.5, 10),
      new coin(10, 10),
      new coin(9, 10.5),
      new coin(9.5, 10.5),
      new coin(10, 10.5),
      new coin(9, 11),
      new coin(9.5, 11),
      new coin(10, 11),
    ],
  
    // level 22
    [
      new coin(4, 7),
      new coin(4.5, 7),
      new coin(5, 7),
      new coin(5.5, 7),
      new coin(6, 7),
      new coin(4, 7.5),
      new coin(4.5, 7.5),
      new coin(5, 7.5),
      new coin(5.5, 7.5),
      new coin(6, 7.5),
      new coin(4, 8),
      new coin(4.5, 8),
      new coin(5, 8),
      new coin(5.5, 8),
      new coin(6, 8),
    ],
  
    // level 23
    [
      new coin(11.5 - 0.5, 7.5 - 0.5),
      new coin(11.15 - 0.5, 8.46 - 0.5),
      new coin(10.26 - 0.5, 8.98 - 0.5),
      new coin(9.25 - 0.5, 8.8 - 0.5),
      new coin(8.59 - 0.5, 8.01 - 0.5),
      new coin(8.59 - 0.5, 6.99 - 0.5),
      new coin(9.25 - 0.5, 6.2 - 0.5),
      new coin(10.26 - 0.5, 6.02 - 0.5),
      new coin(11.15 - 0.5, 6.53 - 0.5),
      new coin(12.25 - 0.5, 7.5 - 0.5),
      new coin(11.95 - 0.5, 8.625 - 0.5),
      new coin(11.125 - 0.5, 9.45 - 0.5),
      new coin(10 - 0.5, 9.75 - 0.5),
      new coin(8.875 - 0.5, 9.45 - 0.5),
      new coin(8.05 - 0.5, 8.625 - 0.5),
      new coin(7.75 - 0.5, 7.5 - 0.5),
      new coin(8.05 - 0.5, 6.375 - 0.5),
      new coin(8.87 - 0.5, 5.55 - 0.5),
      new coin(10 - 0.5, 5.25 - 0.5),
      new coin(11.125 - 0.5, 5.55 - 0.5),
      new coin(11.95 - 0.5, 6.37 - 0.5),
      new coin(13 - 0.5, 7.5 - 0.5),
      new coin(12.82 - 0.5, 8.52 - 0.5),
      new coin(12.298 - 0.5, 9.43 - 0.5),
      new coin(11.5 - 0.5, 10.098 - 0.5),
      new coin(10.52 - 0.5, 10.45 - 0.5),
      new coin(9.479 - 0.5, 10.45 - 0.5),
      new coin(8.5 - 0.5, 10.098 - 0.5),
      new coin(7.7 - 0.5, 9.42 - 0.5),
      new coin(7.18 - 0.5, 8.526 - 0.5),
      new coin(7 - 0.5, 7.5 - 0.5),
      new coin(7.18 - 0.5, 6.47 - 0.5),
      new coin(7.7 - 0.5, 5.57 - 0.5),
      new coin(8.5 - 0.5, 4.9 - 0.5),
      new coin(9.48 - 0.5, 4.54 - 0.5),
      new coin(10.52 - 0.5, 4.54 - 0.5),
      new coin(11.5 - 0.5, 4.9 - 0.5),
      new coin(12.298 - 0.5, 5.57 - 0.5),
      new coin(12.819 - 0.5, 6.47 - 0.5),
    ],
  
    // level 24
    [new coin(7, 4), new coin(12, 10)],
  
    // level 25
    [
      new coin(9, 6),
      new coin(9, 6),
      new coin(9, 6.5),
      new coin(9, 6.5),
      new coin(9, 7),
      new coin(9, 7),
      new coin(9.5, 6),
      new coin(9.5, 6),
      new coin(9.5, 6.5),
      new coin(9.5, 6.5),
      new coin(9.5, 7),
      new coin(9.5, 7),
      new coin(10, 6),
      new coin(10, 6),
      new coin(10, 6.5),
      new coin(10, 6.5),
      new coin(10, 7),
      new coin(10, 7),
      new coin(10.5, 6),
      new coin(10.5, 6),
      new coin(10.5, 6.5),
      new coin(10.5, 6.5),
      new coin(10.5, 7),
      new coin(10.5, 7),
      new coin(11, 6),
      new coin(11, 6),
      new coin(11, 6.5),
      new coin(11, 6.5),
      new coin(11, 7),
      new coin(11, 7),
    ],
  
    // level 26
    [
      new coin(3, 2),
      new coin(3, 2.5),
      new coin(3, 3),
      new coin(3, 3.5),
      new coin(3, 4),
      new coin(16, 2),
      new coin(16, 4),
      new coin(1, 9),
      new coin(1, 9.5),
      new coin(1, 10),
      new coin(1, 10.5),
      new coin(1, 11),
      new coin(1, 11.5),
      new coin(1, 12),
      new coin(18, 9),
      new coin(18, 12),
      new coin(9, 11),
      new coin(9.5, 11),
      new coin(10, 11),
      new coin(9, 11.5),
      new coin(9.5, 11.5),
      new coin(10, 11.5),
      new coin(9, 12),
      new coin(9.5, 12),
      new coin(10, 12),
    ],
  
    // level 27
    [
      new coin(17, 6),
      new coin(17, 6.5),
      new coin(17, 7),
      new coin(17, 7.5),
      new coin(17, 8),
      new coin(17.5, 6),
      new coin(17.5, 6.5),
      new coin(17.5, 7),
      new coin(17.5, 7.5),
      new coin(17.5, 8),
      new coin(18, 6),
      new coin(18, 6.5),
      new coin(18, 7),
      new coin(18, 7.5),
      new coin(18, 8),
    ],
  
    // level 28
    [],
  
    // level 29
    [new coin(9, 10), new coin(9.5, 10), new coin(10, 10), new coin(9, 10.5), new coin(9.5, 10.5), new coin(10, 10.5), new coin(9, 11), new coin(9.5, 11), new coin(10, 11)],
  
    // level 30
    [
      new coin(1, 2),
      new coin(1.5, 2),
      new coin(2, 2),
      new coin(1, 2.5),
      new coin(1.5, 2.5),
      new coin(2, 2.5),
      new coin(1, 3),
      new coin(1.5, 3),
      new coin(2, 3),
      new coin(17, 2),
      new coin(17.5, 2),
      new coin(18, 2),
      new coin(17, 2.5),
      new coin(17.5, 2.5),
      new coin(18, 2.5),
      new coin(17, 3),
      new coin(17.5, 3),
      new coin(18, 3),
      new coin(17, 9),
      new coin(17.5, 9),
      new coin(18, 9),
      new coin(17, 9.5),
      new coin(17.5, 9.5),
      new coin(18, 9.5),
      new coin(17, 10),
      new coin(17.5, 10),
      new coin(18, 10),
      new coin(5, 6),
      new coin(5.5, 6),
      new coin(6, 6),
      new coin(6.5, 6),
      new coin(7, 6),
      new coin(7.5, 6),
      new coin(8, 6),
      new coin(8.5, 6),
      new coin(9, 6),
      new coin(9.5, 6),
      new coin(10, 6),
      new coin(10.5, 6),
      new coin(11, 6),
      new coin(11.5, 6),
      new coin(12, 6),
      new coin(12.5, 6),
      new coin(13, 6),
      new coin(13.5, 6),
      new coin(14, 6),
    ],
  ];
  
  function resetCoins(l) {
    for (var i = 0; i < coins[l].length; i++) {
      coins[l][i].gathered = false;
      coins[l][i].saved = false;
      coins[l][i].fadeAlpha = 1;
      coins[l][i].fadingIn = false;
      coins[l][i].fadingOut = false;
      coins[l][i].shineTime = createCoinShineTime();
      coins[l][i].shineAlpha = 0;
      coins[l][i].shiningIn = false;
      coins[l][i].shiningOut = false;
    }
  }
  
  function updateCoins() {
    if (state == "game" && !paused) {
      coinsFade();
      coinsShine();
    }
  }
  
  function drawCoins() {
    if (state == "game") {
      for (var i = 0; i < coins[level].length; i++) {
        if (!coins[level][i].gathered || coins[level][i].fadingIn || coins[level][i].fadingOut) {
          // coin fill
  
          canvas.beginPath();
          canvas.arc(cwh(coins[level][i].x) + os.x, cwh(coins[level][i].y) + os.y, cwh(COIN_SIZE) / 2, 0, 2 * Math.PI, false);
          canvas.fillStyle = COIN_FILL_COLOR + coins[level][i].fadeAlpha + ")";
          canvas.fill();
  
          // coin shine
          canvas.beginPath();
          canvas.arc(cwh(coins[level][i].x) + os.x, cwh(coins[level][i].y) + os.y, cwh(COIN_SIZE) / 2, 0, 2 * Math.PI, false);
          if (coins[level][i].shineAlpha > coins[level][i].fadeAlpha) canvas.fillStyle = COIN_SHINE_COLOR + coins[level][i].fadeAlpha + ")";
          else canvas.fillStyle = COIN_SHINE_COLOR + coins[level][i].shineAlpha + ")";
          canvas.fill();
  
          // coin stroke
          canvas.lineWidth = cwh(4);
          canvas.strokeStyle = COIN_OUTLINE_COLOR + coins[level][i].fadeAlpha + ")";
          canvas.stroke();
        }
      }
    }
  }
  
  function coinsFade() {
    if (state == "game") {
      for (var i = 0; i < coins[level].length; i++) {
        if (coins[level][i].fadingOut && coins[level][i].fadeAlpha > 0) {
          coins[level][i].fadeAlpha -= COIN_FADE_SPEED / 2;
          if (coins[level][i].fadeAlpha < 0) {
            coins[level][i].fadeAlpha = 0;
          }
        } else if (coins[level][i].fadingOut && coins[level][i].fadeAlpha <= 0) {
          coins[level][i].fadeAlpha = 0;
          coins[level][i].fadingOut = false;
          coins[level][i].shineTime = createCoinShineTime();
        } else if (coins[level][i].fadingIn && coins[level][i].fadeAlpha < 1) {
          coins[level][i].fadeAlpha += COIN_FADE_SPEED;
          if (coins[level][i].fadeAlpha > 1) {
            coins[level][i].fadeAlpha = 1;
          }
        } else if (coins[level][i].fadingIn && coins[level][i].fadeAlpha >= 1) {
          coins[level][i].fadeAlpha = 1;
          coins[level][i].fadingIn = false;
        }
        //console.trace(coins[level][i].fadeAlpha);
      }
    }
  }
  
  function getCoinsCollected() {
    var count = 0;
    for (var i = 0; i < coins[level].length; i++) {
      if (coins[level][i].gathered) {
        count++;
      }
    }
    return count;
  }
  
  function getCoinsTotal() {
    return coins[level].length;
  }
  
  function unsavedCoins() {
    for (var i = 0; i < coins[level].length; i++) {
      if (coins[level][i].gathered && !coins[level][i].saved) {
        return true;
      }
    }
    return false;
  }
  
  function createCoinShineTime() {
    return Math.floor(Math.random() * (COIN_SHINE_FREQ + 1));
  }
  
  function coinsShine() {
    coinShineTimer++;
    if (coinShineTimer > COIN_SHINE_FREQ) coinShineTimer = 0;
  
    for (var i = 0; i < coins[level].length; i++) {
      if (!coins[level][i].shiningIn && coinShineTimer == coins[level][i].shineTime) {
        coins[level][i].shiningIn = true;
        coins[level][i].shiningOut = false;
        coins[level][i].shineAlpha = 0;
      } else if (coins[level][i].shiningIn && coins[level][i].shineAlpha < 1) {
        coins[level][i].shineAlpha += COIN_SHINE_FADE_IN_SPEED;
        if (coins[level][i].shineAlpha > 1) {
          coins[level][i].shineAlpha = 1;
        }
      } else if (coins[level][i].shiningIn && coins[level][i].shineAlpha >= 1) {
        coins[level][i].shiningOut = true;
        coins[level][i].shiningIn = false;
        coins[level][i].shineAlpha = 1;
      } else if (coins[level][i].shiningOut && coins[level][i].shineAlpha > 0) {
        coins[level][i].shineAlpha -= COIN_SHINE_FADE_OUT_SPEED;
        if (coins[level][i].shineAlpha < 0) {
          coins[level][i].shineAlpha = 0;
        }
      } else if (coins[level][i].shiningOut && coins[level][i].shineAlpha <= 0) {
        coins[level][i].shiningOut = false;
        coins[level][i].shiningIn = false;
        coins[level][i].shineAlpha = 0;
      }
    }
  }
  
  function submitSavedCoins() {
    coinsSave = [];
    for (var i = 0; i < coins[level].length; i++) {
      if (coins[level][i].saved) coinsSave.push(i);
    }
    if (coinsSave.length == 0) coinsSave.push(-99);
    localStorage.setItem("whg_coins", JSON.stringify(coinsSave));
  }
  
  function loadSavedCoins() {
    resetCoins(level);
    coinsSave = JSON.parse(localStorage["whg_coins"]);
    if (coinsSave[0] >= 0) {
      for (var i = 0; i < coinsSave.length; i++) {
        coins[level][parseInt(coinsSave[i])].gathered = true;
        coins[level][parseInt(coinsSave[i])].saved = true;
      }
    }
  }
  