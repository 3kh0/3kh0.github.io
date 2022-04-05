FullScreenMario.FullScreenMario.settings.input = {
    "InputWritrArgs": {
        "aliases": {
            // Keyboard aliases
            "left":   [65, 37],     // a,     left
            "right":  [68, 39],     // d,     right
            "up":     [87, 38, 32], // w,     up,    space
            "down":   [83, 40],     // s,     down
            "sprint": [16, 17],     // shift, ctrl
            "pause":  [80],         // p (pause)
            // Mouse aliases
            "rightclick": [3],
        },
        "triggers": {
            "onkeydown": {
                "left": FullScreenMario.FullScreenMario.prototype.keyDownLeft,
                "right": FullScreenMario.FullScreenMario.prototype.keyDownRight,
                "up": FullScreenMario.FullScreenMario.prototype.keyDownUp,
                "down": FullScreenMario.FullScreenMario.prototype.keyDownDown,
                "sprint": FullScreenMario.FullScreenMario.prototype.keyDownSprint,
                "pause": FullScreenMario.FullScreenMario.prototype.keyDownPause,
                "mute": FullScreenMario.FullScreenMario.prototype.keyDownMute,
            },
            "onkeyup": {
                "left": FullScreenMario.FullScreenMario.prototype.keyUpLeft,
                "right": FullScreenMario.FullScreenMario.prototype.keyUpRight,
                "up": FullScreenMario.FullScreenMario.prototype.keyUpUp,
                "down": FullScreenMario.FullScreenMario.prototype.keyUpDown,
                "sprint": FullScreenMario.FullScreenMario.prototype.keyUpSprint,
                "pause": FullScreenMario.FullScreenMario.prototype.keyUpPause
            },
            "onmousedown": {
                "rightclick": FullScreenMario.FullScreenMario.prototype.mouseDownRight
            },
            "oncontextmenu": {},
            "ondevicemotion": {
                "devicemotion": FullScreenMario.FullScreenMario.prototype.deviceMotion
            }
        }
    }
};
