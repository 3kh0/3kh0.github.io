/// <reference path="InputWritr-0.2.0.ts" />

declare namespace DeviceLayr {
    /**
     * A representation of a gamepad, directly taken from navigator.getGamepads.
     */
    export interface IGamepad {
        axes: number[];
        buttons: IGamepadButton[];
        mapping: string;
    }

    /**
     * A single button in an IGamepad.
     */
    export interface IGamepadButton {
        value: number;
        pressed: boolean;
    }

    /**
     * A mapping from button names to their equivalent InputWritr pipes.
     */
    export interface ITriggers {
        [i: string]: IButtonListing | IJoystickListing;
    }

    /**
     * Representation of a single button's status.
     */
    export interface IButtonListing {
        /**
         * A sourceEvent name to pass to InputWritr.
         */
        trigger: string;

        /**
         * Whether the button is currently pressed.
         */
        status?: boolean;
    }

    /**
     * Representation of a single joystick's axis' statuses.
     */
    export interface IJoystickListing {
        [i: string]: IJoystickTriggerAxis;
    }

    /**
     * A single joystick axis status.
     */
    export interface IJoystickTriggerAxis {
        /**
         * The current status of the axis.
         */
        status?: AxisStatus;
    }

    /**
     * Equivalent event keys from "on" and "off" activations to pass to the InputWritr.
     */
    export interface IAliases {
        /**
         * The name of the event key for "on" activations.
         */
        on: string;

        /**
         * The name of the event key for "off" activations.
         */
        off: string;
    }

    /**
     * A listing of controller mappings, keyed by their configuration name.
     */
    export interface IControllerMappings {
        [i: string]: IControllerMapping;
    }

    /**
     * A description of what a controller looks like.
     */
    export interface IControllerMapping {
        /**
         * Known axis descriptions for the controller.
         */
        axes: IAxisSchema[];

        /**
         * Names of the controller's buttons.
         */
        buttons: string[];

        /**
         * The threshold for passing from a neutral status to a positive or negative.
         */
        joystickThreshold: number;
    }

    /**
     * A description of a controller's axis.
     */
    export interface IAxisSchema {
        /**
         * The name of the axis, such as "x" or "y".
         */
        axis: string;

        /**
         * The number the joystick is within the gamepad.
         */
        joystick: number;

        /**
         * The common name of the axis.
         */
        name: string;
    }

    /**
     * Settings to initialize a new IDeviceLayr instance.
     */
    export interface IDeviceLayrSettings {
        /**
         * The IInputWritr to pipe button and joystick trigger commands.
         */
        InputWriter: InputWritr.IInputWritr;

        /**
         * Which device controls should cause what triggers.
         */
        triggers?: ITriggers;

        /**
         * For "on" and "off" activations, equivalent event keys to pass 
         * to the IInputWritr.
         */
        aliases?: IAliases;
    }
    
    /**
     * A layer on InputWritr to map GamePad API device actions to InputWritr pipes.
     */
    export interface IDeviceLayr {
        /**
         * @returns The InputWritr being piped button and joystick triggers.
         */
        getInputWritr(): InputWritr.IInputWritr;

        /**
         * @returns Mapping of which device controls should cause what triggers,
         *          along with their current statuses.
         */
        getTriggers(): ITriggers;

        /**
         * @returns For "on" and "off" activations, the equivalent event keys
         *          to pass to the internal InputWritr.
         */
        getAliases(): IAliases;

        /**
         * @returns Any added gamepads (devices), in order of activation.
         */
        getGamepads(): IGamepad[];

        /**
         * If possible, checks the navigator for new gamepads, and adds them if found.
         * 
         * @returns How many gamepads were added.
         */
        checkNavigatorGamepads(): number;

        /**
         * Registers a new gamepad.
         * 
         * @param gamepad   The gamepad to register.
         */
        registerGamepad(gamepad: IGamepad): void;

        /**
         * Checks the trigger statuses of all known gamepads.
         */
        activateAllGamepadTriggers(): void;

        /**
         * Checks the trigger status of a gamepad, calling the equivalent InputWritr
         * events if any triggers have occurred.
         * 
         * @param gamepad   The gamepad whose status is to be checked.
         */
        activateGamepadTriggers(gamepad: IGamepad): void;

        /**
         * Checks for triggered changes to an axis, and calls the equivalent InputWritr
         * event if one is found.
         * 
         * @param gamepad   The gamepad whose triggers are to be checked.
         * @param name   The name of the axis, typically "x" or "y".
         * @param magnitude   The current value of the axis, in [1, -1].
         * @returns Whether the trigger was activated.
         */
        activateAxisTrigger(gamepad: IGamepad, name: string, axis: string, magnitude: number): boolean;

        /**
         * Checks for triggered changes to a button, and calls the equivalent InputWritr
         * event if one is found.
         * 
         * @param gamepad   The gamepad whose triggers are to be checked.
         * @param {String} name   The name of the button, such as "a" or "left".
         * @param {Boolean} status   Whether the button is activated (pressed).
         * @returns {Boolean} Whether the trigger was activated.
         */
        activateButtonTrigger(gamepad: IGamepad, name: string, status: boolean);

        /**
         * Clears the statuses of all axes and buttons on all known gamepads.
         */
        clearAllGamepadTriggers(): void;

        /**
         * Clears the status of all axes and buttons on a gamepad.
         * 
         * @param gamepad   The gamepad whose triggers are to be cleared.
         */
        clearGamepadTriggers(gamepad: IGamepad): void;

        /**
         * Sets the status of an axis to neutral.
         * 
         * @param gamepad   The gamepad whose axis is to be cleared.
         * @param name   The name of the axis, typically "x" or "y".
         */
        clearAxisTrigger(gamepad: IGamepad, name: string, axis: string): void;

        /**
         * Sets the status of a button to off.
         * 
         * @param gamepad   The gamepad whose button is to be checked.
         * @param name   The name of the button, such as "a" or "left".
         */
        clearButtonTrigger(gamepad: IGamepad, name: string): void;
    }
}


namespace DeviceLayr {
    "use strict";

    /**
     * Status possibilities for an axis. Neutral is the default; positive is above
     * its threshold; negative is below the threshold / -1.
     */
    export enum AxisStatus {
        /**
         * Low axis status (lower than the negative of the threshold).
         */
        negative,

        /**
         * Default axis status (absolutely closer to 0 than the threshold).
         */
        neutral,

        /**
         * High axis status (higher than the threshold).
         */
        positive
    }

    /**
     * A layer on InputWritr to map GamePad API device actions to InputWritr pipes.
     */
    export class DeviceLayr implements IDeviceLayr {
        /**
         * Known mapping schemas for standard controllers. These are referenced
         * by added gamepads via the gamepads' .name attribute.
         */
        private static controllerMappings: IControllerMappings = {
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

        /**
         * The InputWritr being piped button and joystick triggers commands.
         */
        private InputWritr: InputWritr.IInputWritr;

        /**
         * Mapping of which device controls should cause what triggers, along
         * with their current statuses.
         */
        private triggers: ITriggers;

        /**
         * For "on" and "off" activations, the equivalent event keys to pass to
         * the internal InputWritr.
         */
        private aliases: IAliases;

        /**
         * Any added gamepads (devices), in order of activation.
         */
        private gamepads: IGamepad[];

        /**
         * Initializes a new instance of the DeviceLayr class.
         * 
         * @param settings   Settings to use for initialization.
         */
        constructor(settings: IDeviceLayrSettings) {
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
        getInputWritr(): InputWritr.IInputWritr {
            return this.InputWritr;
        }

        /**
         * @returns Mapping of which device controls should cause what triggers,
         *          along with their current statuses.
         */
        getTriggers(): ITriggers {
            return this.triggers;
        }

        /**
         * @returns For "on" and "off" activations, the equivalent event keys
         *          to pass to the internal InputWritr.
         */
        getAliases(): IAliases {
            return this.aliases;
        }

        /**
         * @returns Any added gamepads (devices), in order of activation.
         */
        getGamepads(): IGamepad[] {
            return this.gamepads;
        }


        /* Registration
        */

        /**
         * If possible, checks the navigator for new gamepads, and adds them if found.
         * 
         * @returns How many gamepads were added.
         */
        checkNavigatorGamepads(): number {
            if (typeof (<any>navigator).getGamepads === "undefined" || !(<any>navigator).getGamepads()[this.gamepads.length]) {
                return 0;
            }

            this.registerGamepad((<any>navigator).getGamepads()[this.gamepads.length]);

            return this.checkNavigatorGamepads() + 1;
        }

        /**
         * Registers a new gamepad.
         * 
         * @param gamepad   The gamepad to register.
         */
        registerGamepad(gamepad: IGamepad): void {
            this.gamepads.push(gamepad);
            this.setDefaultTriggerStatuses(gamepad, this.triggers);
        }


        /* Triggers
        */

        /**
         * Checks the trigger statuses of all known gamepads.
         */
        activateAllGamepadTriggers(): void {
            for (var i: number = 0; i < this.gamepads.length; i += 1) {
                this.activateGamepadTriggers(this.gamepads[i]);
            }
        }

        /**
         * Checks the trigger status of a gamepad, calling the equivalent InputWritr
         * events if any triggers have occurred.
         * 
         * @param gamepad   The gamepad whose status is to be checked.
         */
        activateGamepadTriggers(gamepad: IGamepad): void {
            var mapping: IControllerMapping = DeviceLayr.controllerMappings[gamepad.mapping || "standard"],
                i: number;

            for (i = Math.min(mapping.axes.length, gamepad.axes.length) - 1; i >= 0; i -= 1) {
                this.activateAxisTrigger(gamepad, mapping.axes[i].name, mapping.axes[i].axis, gamepad.axes[i]);
            }

            for (i = Math.min(mapping.buttons.length, gamepad.buttons.length) - 1; i >= 0; i -= 1) {
                this.activateButtonTrigger(gamepad, mapping.buttons[i], gamepad.buttons[i].pressed);
            }
        }

        /**
         * Checks for triggered changes to an axis, and calls the equivalent InputWritr
         * event if one is found.
         * 
         * @param gamepad   The gamepad whose triggers are to be checked.
         * @param name   The name of the axis, typically "x" or "y".
         * @param magnitude   The current value of the axis, in [1, -1].
         * @returns Whether the trigger was activated.
         */
        activateAxisTrigger(gamepad: IGamepad, name: string, axis: string, magnitude: number): boolean {
            var listing: IJoystickTriggerAxis = (<IJoystickListing>this.triggers[name])[axis],
                status: AxisStatus;

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
        }

        /**
         * Checks for triggered changes to a button, and calls the equivalent InputWritr
         * event if one is found.
         * 
         * @param gamepad   The gamepad whose triggers are to be checked.
         * @param {String} name   The name of the button, such as "a" or "left".
         * @param {Boolean} status   Whether the button is activated (pressed).
         * @returns {Boolean} Whether the trigger was activated.
         */
        activateButtonTrigger(gamepad: IGamepad, name: string, status: boolean): boolean {
            var listing: IButtonListing = <IButtonListing>this.triggers[name];

            // If the button's current status matches the new one, don't do anything
            if (!listing || listing.status === status) {
                return false;
            }

            listing.status = status;

            // Trigger the new status via the InputWritr using the new alias
            this.InputWritr.callEvent(status ? this.aliases.on : this.aliases.off, listing.trigger);

            return true;
        }

        /**
         * Clears the statuses of all axes and buttons on all known gamepads.
         */
        clearAllGamepadTriggers(): void {
            for (var i: number = 0; i < this.gamepads.length; i += 1) {
                this.clearGamepadTriggers(this.gamepads[i]);
            }
        }

        /**
         * Clears the status of all axes and buttons on a gamepad.
         * 
         * @param gamepad   The gamepad whose triggers are to be cleared.
         */
        clearGamepadTriggers(gamepad: IGamepad): void {
            var mapping: IControllerMapping = DeviceLayr.controllerMappings[gamepad.mapping || "standard"],
                i: number;

            for (i = 0; i < mapping.axes.length; i += 1) {
                this.clearAxisTrigger(gamepad, mapping.axes[i].name, mapping.axes[i].axis);
            }

            for (i = 0; i < mapping.buttons.length; i += 1) {
                this.clearButtonTrigger(gamepad, mapping.buttons[i]);
            }
        }

        /**
         * Sets the status of an axis to neutral.
         * 
         * @param gamepad   The gamepad whose axis is to be cleared.
         * @param name   The name of the axis, typically "x" or "y".
         */
        clearAxisTrigger(gamepad: IGamepad, name: string, axis: string): void {
            var listing: IJoystickTriggerAxis = (<IJoystickListing>this.triggers[name])[axis];

            listing.status = AxisStatus.neutral;
        }

        /**
         * Sets the status of a button to off.
         * 
         * @param gamepad   The gamepad whose button is to be checked.
         * @param name   The name of the button, such as "a" or "left".
         */
        clearButtonTrigger(gamepad: IGamepad, name: string): void {
            var listing: IButtonListing = <IButtonListing>this.triggers[name];

            listing.status = false;
        }


        /* Private utilities
        */

        /**
         * Puts the default values for all buttons and joystick axes that don't already
         * have statuses. This is useful so activation checks don't glitch out.
         * 
         * @param gamepad   The gamepad whose triggers are to be defaulted.
         * @param triggers   The triggers to default, as listings keyed by name.
         */
        private setDefaultTriggerStatuses(gamepad: IGamepad, triggers: ITriggers): void {
            var mapping: IControllerMapping = DeviceLayr.controllerMappings[gamepad.mapping || "standard"],
                button: IButtonListing,
                joystick: IJoystickListing,
                i: number,
                j: string;

            for (i = 0; i < mapping.buttons.length; i += 1) {
                button = <IButtonListing>triggers[mapping.buttons[i]];

                if (button && button.status === undefined) {
                    button.status = false;
                }
            }

            for (i = 0; i < mapping.axes.length; i += 1) {
                joystick = <IJoystickListing>triggers[mapping.axes[i].name];

                for (j in joystick) {
                    if (!joystick.hasOwnProperty(j)) {
                        continue;
                    }

                    if (joystick[j].status === undefined) {
                        joystick[j].status = AxisStatus.neutral;
                    }
                }
            }
        }

        /**
         * @param gamepad   The gamepad whose axis is being looked up.
         * @param magnitude   The direction an axis is measured at, in [-1, 1].
         * @returns What direction a magnitude is relative to 0.
         */
        private getAxisStatus(gamepad: IGamepad, magnitude: number): AxisStatus {
            var joystickThreshold: number = DeviceLayr.controllerMappings[gamepad.mapping || "standard"].joystickThreshold;

            if (magnitude > joystickThreshold) {
                return AxisStatus.positive;
            }

            if (magnitude < -joystickThreshold) {
                return AxisStatus.negative;
            }

            return AxisStatus.neutral;
        }
    }
}
