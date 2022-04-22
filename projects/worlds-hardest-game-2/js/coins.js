function coin(x, y, gathered, saved, fadeAlpha, fadingIn, fadingOut,
	shineTime, shineAlpha, shiningIn, shiningOut) {

    if (gathered   == null) { gathered   = false; }
    if (saved      == null) { saved      = false; }
    if (fadeAlpha  == null) { fadeAlpha  = 1; }
    if (fadingIn   == null) { fadingIn   = false; }
    if (fadingOut  == null) { fadingOut  = false; }
    if (shineTime  == null) { shineTime  = createCoinShineTime(); }
    if (shineAlpha == null) { shineAlpha = 0; }
    if (shiningIn  == null) { shiningIn  = false; }
    if (shiningOut == null) { shiningOut = false; }

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
	[
        new coin(11.5, 10.5),
		new coin(13.5, 7.5),
		new coin(15.5, 10.5),
	],

	// level 2
	[
		new coin(13.5, 8.5),
		new coin(13.5, 10.5),
		
	],

	// level 3
	[
		new coin(21.5, 9.5),
		
	],
	
	// level 4
	[
		
	],

	// level 5
	[
		new coin(8, 14),
		new coin(8, 5),
		new coin(19, 5),
		new coin(19, 14),
		
	],
	
	// level 6
	[
		new coin(5, 8),
		new coin(6, 8),
		new coin(5, 9),
		new coin(6, 9),
		new coin(21, 8),
		new coin(22, 8),
		new coin(21, 9),
		new coin(22, 9)
	],
	
	// level 7
	[
		
	],

	// level 8
	[
		new coin(13, 9),
		new coin(14, 9),
		new coin(13, 10),
		new coin(14, 10)
		
	],
	
	// level 9
	[
		new coin(10, 9.5),
		new coin(13.5, 6),
		new coin(17, 9.5),
		new coin(13.5, 13),
		
	],
	
	// level 10
	[   
	    new coin(9, 9.5),
		new coin(13.5, 5),
		new coin(18, 9.5),
		new coin(13.5, 14),
	],
	
	// level 11
	[
		new coin(10.5, 8.5),
		new coin(10.5, 10.5),
		new coin(16.5, 8.5),
		new coin(16.5, 10.5),
		
	],

	// level 12
	[
		
	],
	
	// level 13
	[],

	// level 14
	[
	    new coin(10.5, 6.5),
		new coin(13.5, 5.5),
		new coin(16.5, 6.5),
		new coin(9.5, 9.5),
		new coin(17.5, 9.5),
		new coin(10.5, 12.5),
		new coin(13.5, 12.5),
		new coin(16.5, 12.5)
		],
	
	// level 15
	[],

	// level 16
	[
		
	],

	// level 17
	[
	    new coin(10.5, 4.5),
		new coin(12.5, 4.5),
		new coin(14.5, 4.5),
		new coin(16.5, 4.5)
	],

	// level 18
	[
		
	],

	// level 19
	[
	    new coin(21, 5),
		new coin(22, 5),
		new coin(23, 5),
		new coin(21, 6),
		new coin(22, 6),
        new coin(23, 6)
				
	],
	
	// level 20
	[
		
	],
	
	// level 21
	[
		new coin(13.5, 4.5),
		new coin(13.5, 5.5),
		new coin(13.5, 6.5),
	
	],
	
	// level 22
	[
		new coin(7, 13),
		new coin(8, 13),
		new coin(7, 14),
		new coin(8, 14)
		
	],
	
	// level 23
	[
		
	],
	
	// level 24
	[
		
	],
	
	// level 25
	[
		
	],
	
	// level 26
	[
	],
	
	// level 27
	[
		new coin(9, 3),
		new coin(18, 3),
		new coin(4, 6),
		new coin(9, 6),
		new coin(18, 6),
		new coin(23, 6),
		new coin(4, 13),
		new coin(9, 13),
	
		new coin(18, 13),
		new coin(23, 13),
		new coin(9, 16),
		new coin(18, 16)
	],
	
	// level 28
	[],
	
	// level 29
	[
		
	],
	
	// level 30
	[
		new coin(10.5, 5.5),
		new coin(16.5, 5.5),
		new coin(10.5, 13.5),
		new coin(16.5, 13.5)
		
		
	],
	
	// level 31
	[
		new coin(12.5, 3.5),
		new coin(14.5, 3.5),
		new coin(12.5, 15.5),
		new coin(14.5, 15.5)
		
		
	],
	
	// level 32
	[
		new coin(5.5, 9.5),
		new coin(6.5, 8.5),
		new coin(7.5, 7.5),
		new coin(8.5, 6.5),
		new coin(9.5, 7.5),
		new coin(10.5, 8.5),
		new coin(11.5, 9.5),
		new coin(10.5, 10.5),
		new coin(9.5, 11.5),
		new coin(7.5, 11.5),
		new coin(6.5, 10.5),
		
		new coin(19.5, 7.5),
		new coin(20.5, 8.5),
		new coin(21.5, 9.5),
		new coin(20.5, 10.5),
		new coin(19.5, 11.5),
		new coin(18.5, 12.5),
		new coin(17.5, 11.5),
		new coin(16.5, 10.5),
		new coin(15.5, 9.5),
		new coin(16.5, 8.5),
		new coin(17.5, 7.5)
		
		
	],
	
	// level 33
	[
		new coin(6, 9),
		new coin(7, 9),
		new coin(8, 9),
		new coin(9, 9),
		new coin(10, 9),
		new coin(11, 9),
		new coin(12, 9),
		new coin(13, 9),
		new coin(14, 9),
		new coin(15, 9),
		new coin(16, 9),
		new coin(17, 9),
		new coin(18, 9),
		new coin(19, 9),
		new coin(20, 9),
		new coin(21, 9),
		
		new coin(6, 10),
		new coin(7, 10),
		new coin(8, 10),
		new coin(9, 10),
		new coin(10, 10),
		new coin(11, 10),
		new coin(12, 10),
		new coin(13, 10),
		new coin(14, 10),
		new coin(15, 10),
		new coin(16, 10),
		new coin(17, 10),
		new coin(18, 10),
		new coin(19, 10),
		new coin(20, 10),
		new coin(21, 10),
		
		new coin(13, 5),
		new coin(13, 6),
		new coin(13, 7),
		new coin(13, 8),
		new coin(13, 9),
		new coin(13, 10),
		new coin(13, 11),
		new coin(13, 12),
		new coin(13, 13),
		new coin(13, 14),
		
		new coin(14, 5),
		new coin(14, 6),
		new coin(14, 7),
		new coin(14, 8),
		new coin(14, 9),
		new coin(14, 10),
		new coin(14, 11),
		new coin(14, 12),
		new coin(14, 13),
		new coin(14, 14),
		
		
		
		
	],
	
	// level 34
	[
		
		
		
	],
	
	// level 35
	[
		new coin(10.5, 6.5),
		new coin(16.5, 6.5),
		new coin(10.5, 12.5),
		new coin(16.5, 12.5)
		
		
	],
	
	// level 36
	[
		
		
	],
	
	// level 37
	[
		
		
		
	],
	
	// level 38
	[
		new coin(13.5, 5.5),
		new coin(6.5, 9.5),
		new coin(20.5, 9.5),
		new coin(13.5, 13.5)
		
		
	],
	
	// level 39
	[
		
		
	],
	
	// level 40
	[
		new coin(6.5, 7.5),
		new coin(6.5, 9.5),
		new coin(6.5, 11.5),
		
		new coin(8.5, 7.5),
		new coin(8.5, 9.5),
		new coin(8.5, 11.5),
		
		new coin(10.5, 7.5),
		new coin(10.5, 9.5),
		new coin(10.5, 11.5),
		
		new coin(12.5, 7.5),
		new coin(12.5, 9.5),
		new coin(12.5, 11.5),
		
		
		
		new coin(14.5, 7.5),
		new coin(14.5, 9.5),
		new coin(14.5, 11.5),
		
		new coin(16.5, 7.5),
		new coin(16.5, 9.5),
		new coin(16.5, 11.5),
		
		new coin(18.5, 7.5),
		new coin(18.5, 9.5),
		new coin(18.5, 11.5),
		
		new coin(20.5, 7.5),
		new coin(20.5, 9.5),
		new coin(20.5, 11.5),
		
		new coin(22.5, 7.5),
		new coin(22.5, 9.5),
		new coin(22.5, 11.5),
		
	],
	
	// level 41
	[
		new coin(11.5, 4.5),
		new coin(11.5, 6.5),
		new coin(11.5, 8.5),
		
		new coin(11.5, 10.5),
		new coin(11.5, 12.5),
		new coin(13.5, 12.5),
		
		new coin(15.5, 12.5),
		new coin(15.5, 10.5),
		new coin(15.5, 8.5),
		
		new coin(15.5, 6.5),
		new coin(15.5, 4.5)
		
		
	],
	
	// level 42
	[
		
		
		
	],
	
	// level 43
	[
		new coin(10.5, 7.5),
		new coin(13.5, 4.5),
		new coin(16.5, 7.5),
		new coin(16.5, 12.5),
		new coin(13.5, 14.5),
		new coin(10.5, 12.5)
		
		
	],
	
	// level 44
	[
		
		
		
	],
	
	// level 45
	[
		new coin(4.5, 5.5),
		new coin(4.5, 4.5),
		new coin(5.5, 3.5),
		new coin(6.5, 2.5),
		new coin(7.5, 2.5),
		new coin(8.5, 3.5),
		new coin(9.5, 4.5),
		new coin(9.5, 5.5),
		new coin(8.5, 6.5),
		new coin(7.5, 7.5),
		new coin(6.3, 7.5),
		new coin(5.5, 6.5),
		
		new coin(11.5, 5.5),
		new coin(11.5, 4.5),
		new coin(12.5, 3.5),
		new coin(13.5, 2.5),
		new coin(14.5, 2.5),
		new coin(15.5, 3.5),
		new coin(16.5, 4.5),
		new coin(16.5, 5.5),
		new coin(15.5, 6.5),
		new coin(14.5, 7.5),
		new coin(13.3, 7.5),
		new coin(12.5, 6.5),
		
		new coin(18.5, 5.5),
		new coin(18.5, 4.5),
		new coin(19.5, 3.5),
		new coin(20.5, 2.5),
		new coin(21.5, 2.5),
		new coin(22.5, 3.5),
		new coin(23.5, 4.5),
		new coin(23.5, 5.5),
		new coin(22.5, 6.5),
		new coin(21.5, 7.5),
		new coin(20.3, 7.5),
		new coin(19.5, 6.5),
		
		new coin(4.5, 12.5),
		new coin(4.5, 11.5),
		new coin(5.5, 10.5),
		new coin(6.5, 9.5),
		new coin(7.5, 9.5),
		new coin(8.5, 10.5),
		new coin(9.5, 11.5),
		new coin(9.5, 12.5),
		new coin(8.5, 13.5),
		new coin(7.5, 14.5),
		new coin(6.3, 14.5),
		new coin(5.5, 13.5),
		
		new coin(11.5, 12.5),
		new coin(11.5, 11.5),
		new coin(12.5, 10.5),
		new coin(13.5, 9.5),
		new coin(14.5, 9.5),
		new coin(15.5, 10.5),
		new coin(16.5, 11.5),
		new coin(16.5, 12.5),
		new coin(15.5, 13.5),
		new coin(14.5, 14.5),
		new coin(13.3, 14.5),
		new coin(12.5, 13.5),
		
		new coin(18.5, 12.5),
		new coin(18.5, 11.5),
		new coin(19.5, 10.5),
		new coin(20.5, 9.5),
		new coin(21.5, 9.5),
		new coin(22.5, 10.5),
		new coin(23.5, 11.5),
		new coin(23.5, 12.5),
		new coin(22.5, 13.5),
		new coin(21.5, 14.5),
		new coin(20.3, 14.5),
		new coin(19.5, 13.5)
		
	],
	
	// level 46
	[
		new coin(8.5, 11.5),
		new coin(8.5, 9.5),
		new coin(8.5, 7.5),
		new coin(10.5, 7.5),
		new coin(12.5, 7.5),
		new coin(14.5, 7.5),
		new coin(16.5, 7.5),
		new coin(18.5, 7.5),
		new coin(18.5, 9.5),
		new coin(18.5, 11.5),
		new coin(16.3, 11.5),
		new coin(14.5, 11.5),
		
		new coin(12.5, 11.5),
		new coin(10.5, 11.5),
		new coin(8.5, 11.5)
		
	],
	
	// level 47
	[
	
		
	],
	
	// level 48
	[
		new coin(7.5, 9.5),
		new coin(11.5, 9.5),
		new coin(15.5, 9.5),
		new coin(19.5, 9.5)
		
		
	],
	
	// level 49
	[
		new coin(7.5, 5.5),
		new coin(13.5, 5.5),
		new coin(19.5, 5.5),
		new coin(7.5, 13.5),
		new coin(13.5, 13.5),
		new coin(19.5, 13.5)
		
		
	],
	
	// level 50
	[
		new coin(11.5, 9.5),
		new coin(12.5, 8.5),
		new coin(13.5, 7.5),
		new coin(14.5, 8.5),
		
		new coin(14.5, 10.5),
		new coin(13.5, 11.5),
		new coin(12.5, 10.5),
		new coin(11.5, 9.5),
		new coin(15.5, 9.5)
		
		
	]
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
				if (coins[level][i].shineAlpha > coins[level][i].fadeAlpha)
					canvas.fillStyle = COIN_SHINE_COLOR + coins[level][i].fadeAlpha + ")";
				else
					canvas.fillStyle = COIN_SHINE_COLOR + coins[level][i].shineAlpha + ")";
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
				coins[level][i].fadeAlpha -= COIN_FADE_SPEED/2;
				if(coins[level][i].fadeAlpha<0){
					coins[level][i].fadeAlpha = 0;
				}
			}
			else if (coins[level][i].fadingOut && coins[level][i].fadeAlpha <= 0) {
				coins[level][i].fadeAlpha = 0;
				coins[level][i].fadingOut = false;
				coins[level][i].shineTime = createCoinShineTime();
			}
			else if (coins[level][i].fadingIn && coins[level][i].fadeAlpha < 1) {
				coins[level][i].fadeAlpha += COIN_FADE_SPEED;
				if(coins[level][i].fadeAlpha>1){
					coins[level][i].fadeAlpha = 1;
				}
			}
			else if (coins[level][i].fadingIn && coins[level][i].fadeAlpha >= 1) {
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
	if (coinShineTimer > COIN_SHINE_FREQ)
		coinShineTimer = 0;
	
	for (var i = 0; i < coins[level].length; i++) {
		if (!coins[level][i].shiningIn && coinShineTimer == coins[level][i].shineTime) {
			coins[level][i].shiningIn = true;
			coins[level][i].shiningOut = false;
			coins[level][i].shineAlpha = 0;
		} else if (coins[level][i].shiningIn && coins[level][i].shineAlpha < 1) {
			coins[level][i].shineAlpha += COIN_SHINE_FADE_IN_SPEED;
			if(coins[level][i].shineAlpha>1){
              coins[level][i].shineAlpha = 1;				
			}
		} else if (coins[level][i].shiningIn && coins[level][i].shineAlpha >= 1) {
			coins[level][i].shiningOut = true;
			coins[level][i].shiningIn = false;
			coins[level][i].shineAlpha = 1;
		} else if (coins[level][i].shiningOut && coins[level][i].shineAlpha > 0) {
			coins[level][i].shineAlpha -= COIN_SHINE_FADE_OUT_SPEED;
			if(coins[level][i].shineAlpha<0){
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
		if (coins[level][i].saved)
			coinsSave.push(i);
	}
	if (coinsSave.length == 0)
		coinsSave.push(-99);
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