/// <reference path="InputWritr-0.2.0.ts" />
var DeviceLayr;
(function (DeviceLayr_1) {
    "use strict";
    /**
     * Status possibilities for an axis. Neutral is the default; positive is above
     * its threshold; negative is below the threshold / -1.
     */
    (function (AxisStatus) {
        /**
         * Low axis status (lower than the negative of the threshold).
         */
        AxisStatus[AxisStatus["negative"] = 0] = "negative";
        /**
         * Default axis status (absolutely closer to 0 than the threshold).
         */
        AxisStatus[AxisStatus["neutral"] = 1] = "neutral";
        /**
         * High axis status (higher than the threshold).
         */
        AxisStatus[AxisStatus["positive"] = 2] = "positive";
    })(DeviceLayr_1.AxisStatus || (DeviceLayr_1.AxisStatus = {}));
    var AxisStatus = DeviceLayr_1.AxisStatus;
    /**
     * A layer on InputWritr to map GamePad API device actions to InputWritr pipes.
     */
    var DeviceLayr = (function () {
        /**
         * Initializes a new instance of the DeviceLayr class.
         *
         * @param settings   Settings to use for initialization.
         */
        function DeviceLayr(settings) {
            if (typeof settings === "undefined") {
                throw new Error("No settings object given to DeviceLayr.");
            }
            if (typeof settings.InputWriter === "undefined") {
                throw new Error("No InputWriter given to DeviceLayr.");
            }
            this.InputWritr = settings.InputWriter;
            this.triggers = settings.triggers || {};
            this.aliases = settings.aliases || {
                "on": "on",
                "off": "off"
            };
            this.gamepads = [];
        }
        /* Simple gets
        */
        /**
         * @returns The InputWritr being piped button and joystick triggers.
         */
        DeviceLayr.prototype.getInputWritr = function () {
            return this.InputWritr;
        };
        /**
         * @returns Mapping of which device controls should cause what triggers,
         *          along with their current statuses.
         */
        DeviceLayr.prototype.getTriggers = function () {
            return this.triggers;
        };
        /**
         * @returns For "on" and "off" activations, the equivalent event keys
         *          to pass to the internal InputWritr.
         */
        DeviceLayr.prototype.getAliases = function () {
            return this.aliases;
        };
        /**
         * @returns Any added gamepads (devices), in order of activation.
         */
        DeviceLayr.prototype.getGamepads = function () {
            return this.gamepads;
        };
        /* Registration
        */
        /**
         * If possible, checks the navigator for new gamepads, and adds them if found.
         *
         * @returns How many gamepads were added.
         */
        DeviceLayr.prototype.checkNavigatorGamepads = function () {
            if (typeof navigator.getGamepads === "undefined" || !navigator.getGamepads()[this.gamepads.length]) {
                return 0;
            }
            this.registerGamepad(navigator.getGamepads()[this.gamepads.length]);
            return this.checkNavigatorGamepads() + 1;
        };
        /**
         * Registers a new gamepad.
         *
         * @param gamepad   The gamepad to register.
         */
        DeviceLayr.prototype.registerGamepad = function (gamepad) {
            this.gamepads.push(gamepad);
            this.setDefaultTriggerStatuses(gamepad, this.triggers);
        };
        /* Triggers
        */
        /**
         * Checks the trigger statuses of all known gamepads.
         */
        DeviceLayr.prototype.activateAllGamepadTriggers = function () {
            for (var i = 0; i < this.gamepads.length; i += 1) {
                this.activateGamepadTriggers(this.gamepads[i]);
            }
        };
        /**
         * Checks the trigger status of a gamepad, calling the equivalent InputWritr
         * events if any triggers have occurred.
         *
         * @param gamepad   The gamepad whose status is to be checked.
         */
        DeviceLayr.prototype.activateGamepadTriggers = function (gamepad) {
            var mapping = DeviceLayr.controllerMappings[gamepad.mapping || "standard"], i;
            for (i = Math.min(mapping.axes.length, gamepad.axes.length) - 1; i >= 0; i -= 1) {
                this.activateAxisTrigger(gamepad, mapping.axes[i].name, mapping.axes[i].axis, gamepad.axes[i]);
            }
            for (i = Math.min(mapping.buttons.length, gamepad.buttons.length) - 1; i >= 0; i -= 1) {
                this.activateButtonTrigger(gamepad, mapping.buttons[i], gamepad.buttons[i].pressed);
            }
        };
        /**
         * Checks for triggered changes to an axis, and calls the equivalent InputWritr
         * event if one is found.
         *
         * @param gamepad   The gamepad whose triggers are to be checked.
         * @param name   The name of the axis, typically "x" or "y".
         * @param magnitude   The current value of the axis, in [1, -1].
         * @returns Whether the trigger was activated.
         */
        DeviceLayr.prototype.activateAxisTrigger = function (gamepad, name, axis, magnitude) {
            var listing = this.triggers[name][axis], status;
            if (!listing) {
                return;
            }
            // If the axis' current status matches the new one, don't do anything
            status = this.getAxisStatus(gamepad, magnitude);
            if (listing.status === status) {
                return false;
            }
            // If it exists, release the old axis via the InputWritr using the off alias
            if (listing.status !== undefined && listing[AxisStatus[listing.status]] !== undefined) {
                this.InputWritr.callEvent(this.aliases.off, listing[AxisStatus[listing.status]]);
            }
            // Mark the new status in the listing
            listing.status = status;
            // Trigger the new status via the InputWritr using the on alias
            if (listing[AxisStatus[status]] !== undefined) {
                this.InputWritr.callEvent(this.aliases.on, listing[AxisStatus[status]]);
            }
            return true;
        };
        /**
         * Checks for triggered changes to a button, and calls the equivalent InputWritr
         * event if one is found.
         *
         * @param gamepad   The gamepad whose triggers are to be checked.
         * @param {String} name   The name of the button, such as "a" or "left".
         * @param {Boolean} status   Whether the button is activated (pressed).
         * @returns {Boolean} Whether the trigger was activated.
         */
        DeviceLayr.prototype.activateButtonTrigger = function (gamepad, name, status) {
            var listing = this.triggers[name];
            // If the button's current status matches the new one, don't do anything
            if (!listing || listing.status === status) {
                return false;
            }
            listing.status = status;
            // Trigger the new status via the InputWritr using the new alias
            this.InputWritr.callEvent(status ? this.aliases.on : this.aliases.off, listing.trigger);
            return true;
        };
        /**
         * Clears the statuses of all axes and buttons on all known gamepads.
         */
        DeviceLayr.prototype.clearAllGamepadTriggers = function () {
            for (var i = 0; i < this.gamepads.length; i += 1) {
                this.clearGamepadTriggers(this.gamepads[i]);
            }
        };
        /**
         * Clears the status of all axes and buttons on a gamepad.
         *
         * @param gamepad   The gamepad whose triggers are to be cleared.
         */
        DeviceLayr.prototype.clearGamepadTriggers = function (gamepad) {
            var mapping = DeviceLayr.controllerMappings[gamepad.mapping || "standard"], i;
            for (i = 0; i < mapping.axes.length; i += 1) {
                this.clearAxisTrigger(gamepad, mapping.axes[i].name, mapping.axes[i].axis);
            }
            for (i = 0; i < mapping.buttons.length; i += 1) {
                this.clearButtonTrigger(gamepad, mapping.buttons[i]);
            }
        };
        /**
         * Sets the status of an axis to neutral.
         *
         * @param gamepad   The gamepad whose axis is to be cleared.
         * @param name   The name of the axis, typically "x" or "y".
         */
        DeviceLayr.prototype.clearAxisTrigger = function (gamepad, name, axis) {
            var listing = this.triggers[name][axis];
            listing.status = AxisStatus.neutral;
        };
        /**
         * Sets the status of a button to off.
         *
         * @param gamepad   The gamepad whose button is to be checked.
         * @param name   The name of the button, such as "a" or "left".
         */
        DeviceLayr.prototype.clearButtonTrigger = function (gamepad, name) {
            var listing = this.triggers[name];
            listing.status = false;
        };
        /* Private utilities
        */
        /**
         * Puts the default values for all buttons and joystick axes that don't already
         * have statuses. This is useful so activation checks don't glitch out.
         *
         * @param gamepad   The gamepad whose triggers are to be defaulted.
         * @param triggers   The triggers to default, as listings keyed by name.
         */
        DeviceLayr.prototype.setDefaultTriggerStatuses = function (gamepad, triggers) {
            var mapping = DeviceLayr.controllerMappings[gamepad.mapping || "standard"], button, joystick, i, j;
            for (i = 0; i < mapping.buttons.length; i += 1) {
                button = triggers[mapping.buttons[i]];
                if (button && button.status === undefined) {
                    button.status = false;
                }
            }
            for (i = 0; i < mapping.axes.length; i += 1) {
                joystick = triggers[mapping.axes[i].name];
                for (j in joystick) {
                    if (!joystick.hasOwnProperty(j)) {
                        continue;
                    }
                    if (joystick[j].status === undefined) {
                        joystick[j].status = AxisStatus.neutral;
                    }
                }
            }
        };
        /**
         * @param gamepad   The gamepad whose axis is being looked up.
         * @param magnitude   The direction an axis is measured at, in [-1, 1].
         * @returns What direction a magnitude is relative to 0.
         */
        DeviceLayr.prototype.getAxisStatus = function (gamepad, magnitude) {
            var joystickThreshold = DeviceLayr.controllerMappings[gamepad.mapping || "standard"].joystickThreshold;
            if (magnitude > joystickThreshold) {
                return AxisStatus.positive;
            }
            if (magnitude < -joystickThreshold) {
                return AxisStatus.negative;
            }
            return AxisStatus.neutral;
        };
        /**
         * Known mapping schemas for standard controllers. These are referenced
         * by added gamepads via the gamepads' .name attribute.
         */
        DeviceLayr.controllerMappings = {
            /**
             * Controller mapping for a typical Xbox style controller.
             */
            "standard": {
                "axes": [
                    {
                        "axis": "x",
                        "joystick": 0,
                        "name": "leftJoystick"
                    },
                    {
                        "axis": "y",
                        "joystick": 0,
                        "name": "leftJoystick"
                    },
                    {
                        "axis": "x",
                        "joystick": 1,
                        "name": "rightJoystick"
                    },
                    {
                        "axis": "y",
                        "joystick": 1,
                        "name": "rightJoystick"
                    }
                ],
                "buttons": [
                    "a",
                    "b",
                    "x",
                    "y",
                    "leftTop",
                    "rightTop",
                    "leftTrigger",
                    "rightTrigger",
                    "select",
                    "start",
                    "leftStick",
                    "rightStick",
                    "dpadUp",
                    "dpadDown",
                    "dpadLeft",
                    "dpadRight"
                ],
                "joystickThreshold": .49
            }
        };
        return DeviceLayr;
    })();
    DeviceLayr_1.DeviceLayr = DeviceLayr;
})(DeviceLayr || (DeviceLayr = {}));
