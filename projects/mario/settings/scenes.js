FullScreenMario.FullScreenMario.settings.scenes = {
    "cutscenes": {
		"Flagpole": {
			"firstRoutine": "StartSlidingDown",
			"routines": {
				"StartSlidingDown": FullScreenMario.FullScreenMario.prototype.cutsceneFlagpoleStartSlidingDown,
				"HitBottom": FullScreenMario.FullScreenMario.prototype.cutsceneFlagpoleHitBottom ,
				"Countdown": FullScreenMario.FullScreenMario.prototype.cutsceneFlagpoleCountdown,
				"Fireworks": FullScreenMario.FullScreenMario.prototype.cutsceneFlagpoleFireworks
			}
		},
		"BowserVictory": {
		    "firstRoutine": "CollideCastleAxe",
		    "routines": {
		        "CollideCastleAxe": FullScreenMario.FullScreenMario.prototype.cutsceneBowserVictoryCollideCastleAxe,
		        "CastleBridgeOpen": FullScreenMario.FullScreenMario.prototype.cutsceneBowserVictoryCastleBridgeOpen,
		        "BowserFalls": FullScreenMario.FullScreenMario.prototype.cutsceneBowserVictoryBowserFalls,
		        "Dialog": FullScreenMario.FullScreenMario.prototype.cutsceneBowserVictoryDialog
		    }
		}
	}
};
