function runGameTimer() {
	if ((state == "game" || state == "intermission") && !paused) {
		currentTime = new Date().getTime();
		if (oldTime == 0 || justLoadedTimer) {
			oldTime = currentTime;
			justLoadedTimer = false;
		}
		gameTimer += currentTime - oldTime;
		oldTime = currentTime;
	}
}