/// <reference path="../FullScreenMario.ts" />
var FullScreenMario;
(function (FullScreenMario) {
    "use strict";
    FullScreenMario.FullScreenMario.settings.math = {
        "equations": {
            /**
             * Determines whether a player is within touching distance of a castle axe
             * (assuming it is alive), so that it can start the BowserVictory cutscene.
             *
             * @param thing   A player close to a castle axe.
             * @param other   A castle axe that can defeat Bowser.
             * @returns Whether the player is both alive and close enough to the axe.
             */
            "canPlayerTouchCastleAxe": function (constants, equations, thing, other) {
                if (!thing.FSM.isThingAlive(thing)) {
                    return false;
                }
                if (thing.right < other.left + other.EightBitter.unitsize) {
                    return false;
                }
                if (thing.bottom > other.bottom - other.EightBitter.unitsize) {
                    return false;
                }
                return true;
            },
            /**
             * Decreases a player's jumping yvel based on whether it's running.
             */
            "decreasePlayerJumpingYvel": function (constants, equations, player) {
                var jumpmod = player.FSM.MapScreener.jumpmod - player.xvel * .0014, power = Math.pow(player.keys.jumplev, jumpmod), dy = player.FSM.unitsize / power;
                player.yvel = Math.max(player.yvel - dy, constants.maxyvelinv);
            },
            /**
             * Decreases a player's running xvel based on whether it's sprinting.
             * @returns {Boolean} True if the player started or stopped skidding,
             *                    or false if the skidding status was unchanged.
             */
            "decreasePlayerRunningXvel": function (constants, equations, player) {
                // If a button is pressed, hold/increase speed
                if (player.keys.run !== 0 && !player.crouching) {
                    var dir = player.keys.run, 
                    // No sprinting underwater
                    sprinting = Number(player.keys.sprint && !player.FSM.MapScreener.underwater) || 0, adder = dir * (.098 * (Number(sprinting) + 1)), decel = 0, skiddingChanged = false;
                    // Reduce the speed, both by subtracting and dividing a little
                    player.xvel += adder || 0;
                    player.xvel *= .98;
                    decel = .0007;
                    // If you're accelerating in the opposite direction from your current velocity, that's a skid
                    if ((player.keys.run > 0) === player.moveleft) {
                        if (!player.skidding) {
                            player.skidding = true;
                            skiddingChanged = true;
                        }
                    }
                    else if (player.skidding) {
                        // Not accelerating: make sure you're not skidding
                        player.skidding = false;
                        skiddingChanged = true;
                    }
                }
                else {
                    // Otherwise slow down a bit
                    player.xvel *= .98;
                    decel = .035;
                }
                if (player.xvel > decel) {
                    player.xvel -= decel;
                }
                else if (player.xvel < -decel) {
                    player.xvel += decel;
                }
                else if (player.xvel !== 0) {
                    player.xvel = 0;
                    if (!player.FSM.MapScreener.nokeys && player.keys.run === 0) {
                        if (player.keys.leftDown) {
                            player.keys.run = -1;
                        }
                        else if (player.keys.rightDown) {
                            player.keys.run = 1;
                        }
                    }
                }
                return skiddingChanged;
            },
            /**
             * @returns A player's yvel for when riding up a springboard.
             */
            "springboardYvelUp": function (constants, equations, thing) {
                return Math.max(thing.FSM.unitsize * -2, thing.tensionSave * -.98);
            },
            /**
             * @returns How many fireworks to show at the end of a level,
             *          based on the given time's rightmost digit.
             */
            "numberOfFireworks": function (constants, equations, time) {
                var numFireworks = time % 10;
                if (!(numFireworks === 1 || numFireworks === 3 || numFireworks === 6)) {
                    return 0;
                }
                return numFireworks;
            }
        }
    };
})(FullScreenMario || (FullScreenMario = {}));
