// 20x15
var checkpoints = [
	[],
	// level 1
	[
		[2, 4, 3, 7],
		[15, 4, 3, 7, true]
	],
	
	// level 2
	[
		[2, 6, 2, 3],
		[16, 6, 2, 3, true]
	],
	
	// level 3
	[
		[8, 6, 4, 3, true],
		[8, 3, 1, 1]
	],
	
	// level 4
	[
		[10, 2, 2, 2],
		[4, 8, 2, 2, true]
	],
	
	// level 5
	[
		[2, 2, 1, 1],
		[17, 2, 1, 1],
		[2, 4, 1, 1],
		[12, 6, 1, 1, true]
	],
	
	// level 6
	[
		[2, 5, 2, 2],
		[16, 7, 2, 2, true]
	],
	
	// level 7
	[
		[2, 6, 3, 3],
		[16, 6, 2, 3, true]
	],
	
	// level 8
	[
		[6, 4, 1, 1, true]
	],
	
	// level 9
	[
		[2, 3, 2, 2],
		[10, 8, 2, 2],
		[16, 6, 2, 2, true]
	],
	
	// level 10
	[
		[7, 3, 2, 2],
		[11, 3, 2, 2, true]
	],
	
	// level 11
	[
		[17, 7, 2, 2],
		[1, 6, 3, 3, true]
	],
	
	// level 12
	[
		[15, 9, 2, 2],
		[3, 4, 2, 2],
		[3, 9, 2, 2, true]
	],
	
	// level 13
	[
		[9, 11, 2, 2],
		[9, 2, 2, 2, true]
	],
	
	// level 14
	[
		[2, 8, 3, 3],
		[15, 4, 3, 3, true]
	],
	
	// level 15
	[
		[1, 3, 3, 2],
		[16, 10, 3, 2, true]
	],
	
	// level 16
	[
		[1, 4, 2, 2],
		[17, 10, 2, 2, true]
	],
	
	// level 17
	[
		[3, 3, 1, 1],
		[13, 9, 1, 1, true]
	],
	
	// level 18
	[
		[3, 6, 2, 3],
		[15, 6, 2, 3, true]
	],
	
	// level 19
	[
		[3, 6, 2, 3],
		[15, 6, 2, 3, true]
	],
	
	// level 20
	[
		[16, 10, 2, 2],
		[2, 4, 2, 2, true]
	],
	
	// level 21
	[
		[1, 6, 2, 3],
		[17, 6, 2, 3, true]
	],
	
	// level 22
	[
		[17, 2, 2, 2],
		[3, 11, 2, 2, true]
	],
	
	// level 23
	[
		[3, 3, 2, 2],
		[15, 10, 2, 2, true]
	],
	
	// level 24
	[
		[2, 10, 2, 2],
		[16, 3, 2, 2, true]
	],
	
	// level 25
	[
		[2, 2, 2, 2],
		[17, 10, 2, 2, true]
	],
	
	// level 26
	[
		[9, 7, 2, 3, true]
	],
	
	// level 27
	[
		[1, 6, 2, 3, true]
	],
	
	// level 28
	[
		[1, 11, 2, 2],
		[16, 7, 3, 1],
		[1, 2, 2, 2, true]
	],
	
	// level 29
	[
		[16, 3, 2, 2],
		[2, 3, 2, 2, true]
	],
	
	// level 30
	[
		[1, 11, 2, 2, true]
	]
];

function drawChecks() {
	for (var i = 0; i < checkpoints[level].length; i++) {
		canvas.beginPath();
		canvas.rect(
			checkpoints[level][i][0] * cwh(TILE_SIZE) + os.x,
			checkpoints[level][i][1] * cwh(TILE_SIZE) + os.y,
			checkpoints[level][i][2] * cwh(TILE_SIZE),
			checkpoints[level][i][3] * cwh(TILE_SIZE)
		);
		canvas.fillStyle = CHECK_COLOR;
		canvas.fill();
	}
	drawCheckFlash();
}

function drawCheckFlash() {
	if (checkFlashAlpha > 0 && state == "game") {
		canvas.beginPath();
		canvas.rect(
			checkpoints[level][curCheck][0] * cwh(TILE_SIZE) + os.x,
			checkpoints[level][curCheck][1] * cwh(TILE_SIZE) + os.y,
			checkpoints[level][curCheck][2] * cwh(TILE_SIZE),
			checkpoints[level][curCheck][3] * cwh(TILE_SIZE)
		);
		canvas.fillStyle = CHECK_FLASH_COLOR + checkFlashAlpha + ")";
		canvas.fill();
		checkFlashAlpha -= CHECK_FLASH_FADE_SPEED;
	}
}