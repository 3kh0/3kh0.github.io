function door(x, y, w, h, dir, curW, curH, opened, saved, opening, closing) {
	
	if(curW== null)
		curW=1;
	if(curH== null)
		curH=1;
	if(opened== null)
		opened=false;
	if(saved== null)
		saved=false;
	if(opening== null)
		opening=false;
	
	if(closing== null)
		closing=false;
	
	
	
	
	this.x = x;
	this.y = y;
	this.w = w;
	this.h = h;
	this.dir = dir;
	this.curW = curW;
	this.curH = curH;
	this.opened = opened;
	this.saved = saved;
	this.opening = opening;
	this.closing = closing;
	this.inited = false;
	
	
	
	
}

var doors = [
	[],
	// level 1
	[],
	// level 2
	[],
	// level 3
	[],
	// level 4
	[
	new door(7, 9, 3, 2, "right")
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
	  new door(16, 3, 1, 2, "bottom")
	],
	// level 16
	[],
	// level 17
	[],
	// level 18
	[
	  new door(9, 7, 2, 2, "left")
	],
	// level 19
	[
	 new door(19, 13, 2, 3, "left"),
	 new door(19, 4, 2, 3, "left"),
	 new door(19, 8, 2, 4, "left")
	 
	 
	],
	// level 20
	[],
	// level 21
	[
	  new door(11, 4, 2, 4, "left")
	],
	// level 22
	[
	 new door(8, 12, 1, 1, "left")
	 ],
	// level 23
	[],
	// level 24
	[
	 new door(9, 5, 2, 1, "left"),
	 new door(17, 5, 2, 1, "left"),
	 new door(13, 14, 2, 1, "left")
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
	 new door(13, 9, 2, 2, "left"),
	 new door(23, 9, 1, 2, "left")
	 
	],
	// level 33
	[],
	// level 34
	[
	   new door(18, 14, 1, 2, "left")
	],
	// level 35
	[],
	// level 36
	[],
	// level 37
	[
	 new door(10, 12, 1, 2, "left"),
	 new door(17, 12, 1, 2, "left"),
	 new door(20, 10, 2, 1, "left"),
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
	
	
	/*[
		new door(10, 6, 2, 2, "left")
	]*/
];

function resetDoors(l) {
	for (var i = 0; i < doors[l].length; i++) {
		doors[l][i].curW = 1;
		doors[l][i].curH = 1;
		doors[l][i].opened = false;
		doors[l][i].saved = false;
		doors[l][i].opening = false;
		doors[l][i].closing = false;
	}
	detectDoorsInWalls();
}

function addDoorsToWalls() {
	for (var i = 0; i < doors[level].length; i++) {
	 for (var yy = doors[level][i].y; yy < (doors[level][i].h+ doors[level][i].y) ; yy++) {
        for (var xx = doors[level][i].x; xx < (doors[level][i].w+ doors[level][i].x); xx++) {
            walls[level][yy][xx] = 1; 
        }
     }
	}
}

function detectDoorsInWalls() {
	for (var i = 0; i < doors[level].length; i++) {
		var changeTo = null;
		if (doors[level][i].opened)
			changeTo = 0;
		else
			changeTo = 1;
		
		for (var x = 0; x < doors[level][i].w; x++) {
			for (var y = 0; y < doors[level][i].h; y++) {
				walls[level][doors[level][i].y + y][doors[level][i].x + x] = changeTo;
			}
		}
	}
}

function updateDoors() {
	if (state == "game" && !paused) {
		// open and close
		for (var i = 0; i < doors[level].length; i++) {
			
			if(doors[level][i].inited == false){
				doors[level][i].inited = true;
				addDoorsToWalls();
			}
			
			if (doors[level][i].opening) {
				if (doors[level][i].dir == "right" || doors[level][i].dir == "left") {
					doors[level][i].curW -= DOOR_OPEN_SPEED;
					if (doors[level][i].curW <= 0) {
						doors[level][i].curW = 0;
						doors[level][i].opening = false;
					}
				} else {
					doors[level][i].curH -= DOOR_OPEN_SPEED;
					if (doors[level][i].curH <= 0) {
						doors[level][i].curH = 0;
						doors[level][i].opening = false;
					}
				}
			} else if (doors[level][i].closing) {
				if (doors[level][i].dir == "right" || doors[level][i].dir == "left") {
					doors[level][i].curW += DOOR_OPEN_SPEED;
					if (doors[level][i].curW >= 1) {
						doors[level][i].curW = 1;
						doors[level][i].closing = false;
					}
				} else {
					doors[level][i].curH += DOOR_OPEN_SPEED;
					if (doors[level][i].curH >= 1) {
						doors[level][i].curH = 1;
						doors[level][i].closing = false;
					}
				}
			}
		}
		
		
	}
}

function drawDoors() {
	if (state == "game") {
		for (var i = 0; i < doors[level].length; i++) {
			if (!(!doors[level][i].opening && !doors[level][i].closing && doors[level][i].opened)) {
				canvas.beginPath();
				if (doors[level][i].dir == "left" || doors[level][i].dir == "up") {
					canvas.rect(
						doors[level][i].x * TILE_SIZE,
						doors[level][i].y * TILE_SIZE,
						doors[level][i].curW * doors[level][i].w * TILE_SIZE,
						doors[level][i].curH * doors[level][i].h * TILE_SIZE);
				} else {
					// mod for right down
					canvas.rect(
						doors[level][i].x * TILE_SIZE,
						doors[level][i].y * TILE_SIZE,
						doors[level][i].curW * doors[level][i].w * TILE_SIZE,
						doors[level][i].curH * doors[level][i].h * TILE_SIZE);
				}
				canvas.fillStyle = DOOR_FILL_COLOR;
				canvas.fill();
				canvas.strokeStyle = DOOR_OUTLINE_COLOR;
				canvas.lineWidth = 4;
				canvas.stroke();
			}
		}
	}
}

function getDoorsTotal() {
	return doors[level].length;
}