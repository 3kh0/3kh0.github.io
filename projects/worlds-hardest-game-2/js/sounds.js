function doMuteMusic() {
	muteMusic = true;
	music.pause();
	music.currentTime = 0.0;
}

function doUnmuteMusic() {
	muteMusic = false;
	music.play();
}

function doMuteSFX() {
	muteSFX = true;
	for (var i = 0; i < soundsToMute.length; i++) {
		soundsToMute[i].pause();
		soundsToMute[i].currentTime = 0.0;
	}
}

function doUnmuteSFX() {
	muteSFX = false;
}

function playSFX(sound) {
	if (!muteSFX) {
		sound.currentTime = 0.0;
		sound.play();
	}
}