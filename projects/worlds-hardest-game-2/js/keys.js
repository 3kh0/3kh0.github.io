function key(x, y, gathered, saved, fadeAlpha, fadingIn, fadingOut) {
	
	if(gathered == null)
		gathered = false;
	if(saved == null)
		saved = false;
	
	if(fadeAlpha == null)
		fadeAlpha = 1;
	if(fadingIn == null)
		fadingIn = false;
	if(fadingOut == null)
		fadingOut = false;
	
	this.simpleX = x;
	this.simpleY = y;
	this.x = x * TILE_SIZE + TILE_SIZE / 2;
	this.y = y * TILE_SIZE + TILE_SIZE / 2;
	this.gathered = gathered;
	this.saved = saved;
	this.fadeAlpha = fadeAlpha;
	this.fadingIn = fadingIn;
	this.fadingOut = fadingOut;
	//this.shineTime = shineTime;
	//this.shineAlpha = shineAlpha;
	//this.shiningIn = shiningIn;
	//this.shiningOut = shiningOut;
}

var keys = [
	
	[],
	// level 1
	[],
	// level 2
	[],
	// level 3
	[],
	//level4
	[
	 	new key(19.5, 7)
	],
	// level 5
	[],
	// level 6
	[],
	// level 7
	[],
	// level 8
	[],
	// level 9
	[],
	// level 10
	[],
	// level 11
	[],
	// level 12
	[],
	// level 13
	[],
	// level 14
	[],
	// level 15
	[
	  new key(17, 15)
	],
	// level 16
	[],
	// level 17
	[],
	// level 18
	[
	  new key(13, 6)
	],
	// level 19
	[
	 new key(7.5, 9.5),
	 new key(21.5, 13.5),
	 new key(22.5, 13.5)
	],
	// level 20
	[],
	// level 21
	[
	 new key(18.5, 5.5)
	],
	// level 22
	[
	 new key(19.5, 5.5)
	],
	// level 23
	[],
	// level 24
	[
	 new key(9.5, 3.5),
	 new key(17.5, 3.5),
	 new key(20.5, 9.5)
	],
	// level 25
	[],
	// level 26
	[],
	// level 27
	[],
	// level 28
	[],
	// level 29
	[],
	// level 30
	[],
	// level 31
	[],
	// level 32
	[
	 new key(8.5, 12.5),
	 new key(18.5, 6.5)
	],
	// level 33
	[],
	// level 34
	[
	   new key(8.5, 9.5)
	],
	// level 35
	[],
	// level 36
	[],
	// level 37
	[
	  new key(4.5, 12.5),
	  new key(13.5, 2.5),
	  new key(20.5, 2.5),
	  
	],
	// level 38
	[],
	// level 39
	[],
	// level 40
	[],
	// level 41
	[],
	// level 42
	[],
	// level 43
	[],
	// level 44
	[],
	// level 45
	[],
	// level 46
	[],
	// level 47
	[],
	// level 48
	[],
	// level 49
	[],
	// level 50
	[]
];

function resetKeys(l) {
	for (var i = 0; i < keys[l].length; i++) {
		keys[l][i].gathered = false;
		keys[l][i].saved = false;
		keys[l][i].fadeAlpha = 1;
		keys[l][i].fadingIn = false;
		keys[l][i].fadingOut = false;
		//keys[l][i].shineTime = createCoinShineTime();
		//keys[l][i].shineAlpha = 0;
		//keys[l][i].shiningIn = false;
		//keys[l][i].shiningOut = false;
	}
}

function updateKeys() {
	if (state == "game" && !paused) {
		keysFade();
		//keysShine();
	}
}

function drawKeys() {
	if (state == "game") {
		for (var i = 0; i < keys[level].length; i++) {
			if (!keys[level][i].gathered || keys[level][i].fadingIn || keys[level][i].fadingOut) {
				/*
				// key fill
				canvas.beginPath();
				canvas.arc(keys[level][i].x, keys[level][i].y, COIN_SIZE / 2, 0, 2 * Math.PI, false);
				canvas.fillStyle = KEY_FILL_COLOR + keys[level][i].fadeAlpha + ")";
				canvas.fill();
				
				// key shine
				canvas.beginPath();
				canvas.arc(keys[level][i].x, keys[level][i].y, COIN_SIZE / 2, 0, 2 * Math.PI, false);
				if (keys[level][i].shineAlpha > keys[level][i].fadeAlpha)
					canvas.fillStyle = COIN_SHINE_COLOR + keys[level][i].fadeAlpha + ")";
				else
					canvas.fillStyle = COIN_SHINE_COLOR + keys[level][i].shineAlpha + ")";
				canvas.fill();
				*/

				// key stroke
				canvas.beginPath();
				canvas.arc   (keys[level][i].x - 5,             keys[level][i].y + 5, 3.6*1.5, -0.2* Math.PI, 1.6 * Math.PI, false);
				
				
				canvas.fillStyle = KEY_OUTLINE_COLOR;
				canvas.fill();
				canvas.lineWidth = 2;
				canvas.strokeStyle = ENEMY_OUTLINE_COLOR_0 + keys[level][i].fadeAlpha + ")";
				canvas.stroke();
				
				canvas.beginPath();
			
				canvas.arc   (keys[level][i].x - 5,             keys[level][i].y + 5, 1.2, 0, 2 * Math.PI, true);
				
				canvas.fillStyle = KEY_OUTLINE_COLOR;
				canvas.fill();
				canvas.lineWidth = 2;
				canvas.strokeStyle = ENEMY_OUTLINE_COLOR_0 + keys[level][i].fadeAlpha + ")";
				canvas.stroke();
				
				canvas.beginPath();
				canvas.moveTo(keys[level][i].x -5 +1.4 *1.5  ,     keys[level][i].y+5 -2.9*1.5);
				canvas.lineTo(keys[level][i].x -5 +2.8*1.5,     keys[level][i].y +5 -4.4*1.5);
				canvas.lineTo(keys[level][i].x -5 +1.3*1.5,     keys[level][i].y +5 -5.9*1.5);
				canvas.lineTo(keys[level][i].x -5 +2.8*1.5,     keys[level][i].y +5 -7.4*1.5);
				canvas.lineTo(keys[level][i].x -5 +4.4*1.5,     keys[level][i].y +5 -5.9*1.5);
				canvas.lineTo(keys[level][i].x -5 +5.6*1.5,     keys[level][i].y +5 -7*1.5);
				canvas.lineTo(keys[level][i].x -5 +4.3*1.5,     keys[level][i].y +5 -8.8*1.5);
				canvas.lineTo(keys[level][i].x -5 +5.4*1.5,     keys[level][i].y +5 -10*1.5);
				canvas.lineTo(keys[level][i].x -5 +8.5*1.5,     keys[level][i].y +5 -6.9*1.5);
				canvas.lineTo(keys[level][i].x -5 +3*1.5,     keys[level][i].y +5 -1.4*1.5);
				
				/*canvas.lineTo(keys[level][i].x + 5 - 5 - 9 - 5, keys[level][i].y - 5 + 5 + 9 - 5);
				canvas.lineTo(keys[level][i].x + 5 - 5 - 9,     keys[level][i].y - 5 + 5 + 9);
				canvas.lineTo(keys[level][i].x + 5 - 5 - 4,     keys[level][i].y - 5 + 5 + 4);
				canvas.lineTo(keys[level][i].x + 5 - 5 - 4 - 5, keys[level][i].y - 5 + 5 + 4 - 5);*/
				
				canvas.fillStyle = KEY_OUTLINE_COLOR;
				canvas.fill();
				canvas.lineWidth = 2;
				canvas.strokeStyle = ENEMY_OUTLINE_COLOR_0 + keys[level][i].fadeAlpha + ")";
				canvas.stroke();
				
				/*canvas.fillStyle = enemyFillColor;
			canvas.fill();
			canvas.lineWidth = cwh(4);
			canvas.strokeStyle = enemyOutlineColor;
			canvas.stroke();*/
				
				/*canvas.beginPath();
				canvas.arc   (keys[level][i].x - 5,             keys[level][i].y + 5, 6, 0, 2 * Math.PI, false);
				
				/*canvas.moveTo(keys[level][i].x + 5 - 5 + 2,     keys[level][i].y - 5 + 5 - 2);
				canvas.lineTo(keys[level][i].x + 5 - 5 - 9,     keys[level][i].y - 5 + 5 + 9);
				canvas.lineTo(keys[level][i].x + 5 - 5 - 9 - 5, keys[level][i].y - 5 + 5 + 9 - 5);
				canvas.lineTo(keys[level][i].x + 5 - 5 - 9,     keys[level][i].y - 5 + 5 + 9);
				canvas.lineTo(keys[level][i].x + 5 - 5 - 4,     keys[level][i].y - 5 + 5 + 4);
				canvas.lineTo(keys[level][i].x + 5 - 5 - 4 - 5, keys[level][i].y - 5 + 5 + 4 - 5);*/
				/*
				canvas.lineWidth = 4;
				canvas.strokeStyle = ENEMY_OUTLINE_COLOR_0 + keys[level][i].fadeAlpha + ")";
				canvas.stroke();*/
			}
		}
	}
}

function keysFade() {
	if (state == "game") {
		for (var i = 0; i < keys[level].length; i++) {
			if (keys[level][i].fadingOut && keys[level][i].fadeAlpha > 0) {
				keys[level][i].fadeAlpha -= COIN_FADE_SPEED;
			}
			else if (keys[level][i].fadingOut && keys[level][i].fadeAlpha <= 0) {
				keys[level][i].fadeAlpha = 0;
				keys[level][i].fadingOut = false;
				//keys[level][i].shineTime = createCoinShineTime();
			}
			else if (keys[level][i].fadingIn && keys[level][i].fadeAlpha < 1) {
				keys[level][i].fadeAlpha += COIN_FADE_SPEED;
			}
			else if (keys[level][i].fadingIn && keys[level][i].fadeAlpha >= 1) {
				keys[level][i].fadeAlpha = 1;
				keys[level][i].fadingIn = false;
			}
		}
	}
}

function getKeysTotal() {
	return keys[level].length;
}

function unsavedKeys() {
	for (var i = 0; i < keys[level].length; i++) {
		if (keys[level][i].gathered && !keys[level][i].saved) {
			return true;
		}
	}
	return false;
}

/*
function keysShine() {
	coinShineTimer++;
	if (coinShineTimer > COIN_SHINE_FREQ)
		coinShineTimer = 0;
	
	for (var i = 0; i < keys[level].length; i++) {
		if (!keys[level][i].shiningIn && coinShineTimer == keys[level][i].shineTime) {
			keys[level][i].shiningIn = true;
			keys[level][i].shiningOut = false;
			keys[level][i].shineAlpha = 0;
		} else if (keys[level][i].shiningIn && keys[level][i].shineAlpha < 1) {
			keys[level][i].shineAlpha += COIN_SHINE_FADE_IN_SPEED;
		} else if (keys[level][i].shiningIn && keys[level][i].shineAlpha >= 1) {
			keys[level][i].shiningOut = true;
			keys[level][i].shiningIn = false;
			keys[level][i].shineAlpha = 1;
		} else if (keys[level][i].shiningOut && keys[level][i].shineAlpha > 0) {
			keys[level][i].shineAlpha -= COIN_SHINE_FADE_OUT_SPEED;
		} else if (keys[level][i].shiningOut && keys[level][i].shineAlpha <= 0) {
			keys[level][i].shiningOut = false;
			keys[level][i].shiningIn = false;
			keys[level][i].shineAlpha = 0;
		}
	}
}
*/

function submitSavedKeys() {
	keysSave = [];
	for (var i = 0; i < keys[level].length; i++) {
		if (keys[level][i].saved)
			keysSave.push(i);
	}
	if (keysSave.length == 0)
		keysSave.push(-99);
	localStorage.setItem("whg2_keys", JSON.stringify(keysSave));
}

function loadSavedKeys() {
	resetKeys(level);
	keysSave = JSON.parse(localStorage["whg2_keys"]);
	if (keysSave[0] >= 0) {
		for (var i = 0; i < keysSave.length; i++) {
			keys[level][parseInt(keysSave[i])].gathered = true;
			keys[level][parseInt(keysSave[i])].saved = true;
		}
	}
}