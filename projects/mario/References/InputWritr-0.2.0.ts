declare namespace InputWritr {
    /**
     * A callback for when a piped event is triggered.
     * 
     * @param eventInformation   Some argument passed to the event by the
     *                           parent InputWritr.
     * @param event   The source Event causing the trigger.
     */
    export interface IInputWritrTriggerCallback {
        (eventInformation: any, event: Event): void;
    }
    
    /**
     * A mapping of events to their key codes, to their callbacks.
     */
    export interface IInputWritrTriggerContainer {
        [i: string]: {
            [i: string]: IInputWritrTriggerCallback;
            [i: number]: IInputWritrTriggerCallback;
        }
    }
    
    /**
     * Function to determine whether some functionality is available.
     */
    export interface IInputWriterBooleanGetter {
        (...args: any[]): boolean;
    }

    /**
     * Known, allowed aliases for triggers.
     */
    export interface IAliases {
        [i: string]: any[];
    }
    
    /**
     * A mapping from alias Strings to character code Numbers.
     */
    export interface IAliasesToCodes {
        [i: string]: number;
    }
    
    /**
     * A mapping from character code Numbers to alias Strings.
     */
    export interface ICodesToAliases {
        [i: number]: string;
    }
    
    /**
     * Aliases mapped to their allowed key strings.
     */
    export interface IAliasKeys {
        [i: string]: string[];
    }
    
    /**
     * A JSON-friendly recording of events that have occured, as [trigger, alias].
     */
    export interface IHistory {
        [i: number]: [string, any];
    }
    
    /**
     * Stored histories, keyed by name.
     */
    export interface IHistories {
        [i: string]: IHistory;
    }

    /**
     * Settings to initialize a new IInputWritr.
     */
    export interface IInputWritrSettings {
        /**
         * The mapping of events to their key codes, to their callbacks.
         */
        triggers: IInputWritrTriggerContainer;

        /**
         * The first argument to be passed to event callbacks.
         */
        eventInformation?: any;

        /**
         * Function to generate a current timestamp, commonly performance.now.
         */
        getTimestamp?: () => number;

        /**
         * Known, allowed aliases for triggers.
         */
        aliases?: {
            [i: string]: any[];
        };
        
        /**
         * A quick lookup table of key aliases to their character codes.
         */
        keyAliasesToCodes?: {
            [i: string]: number;
        };
        
        /**
         * A quick lookup table of character codes to their key aliases.
         */
        keyCodesToAliases?: {
            [i: number]: string;
        };

        /**
         * Whether events are initially allowed to trigger (by default, true).
         */
        canTrigger?: boolean | IInputWriterBooleanGetter;

        /**
         * Whether triggered inputs are initially allowed to be written to history
         * (by default, true).
         */
        isRecording?: boolean | IInputWriterBooleanGetter;
    }

    /**
     * A general utility for automating interactions with user-called events linked
     * with callbacks. Pipe functions are available that take in user input, switch 
     * on the event code, and call the appropriate callback. Further utilities allow 
     * for saving and playback of input histories in JSON format.
     */
    export interface IInputWritr {
        /** 
         * @returns The stored mapping of aliases to values.
         */
        getAliases(): any;

        /**
         * @returns The stored mapping of aliases to values, with values
         *          mapped to their equivalent key Strings.
         */
        getAliasesAsKeyStrings(): IAliasKeys;

        /**
         * Determines the allowed key strings for a given alias.
         * 
         * @param alias   An alias allowed to be passed in, typically a
         *                character code.
         * @returns The mapped key Strings corresponding to that alias,
         *          typically the human-readable Strings representing 
         *          input names, such as "a" or "left".
         */
        getAliasAsKeyStrings(alias: any): string[];

        /**
         * @param alias   The alias of an input, typically a character code.
         * @returns The human-readable String representing the input name,
         *          such as "a" or "left".
         */
        convertAliasToKeyString(alias: any): string;

        /**
         * @param key   The number code of an input.
         * @returns The machine-usable character code of the input.
         */
        convertKeyStringToAlias(key: number | string): number | string;

        /**
         * Getter for the currently recording history.
         * 
         * @returns The currently recording history of inputs in JSON-friendly form.
         */
        getHistory(name?: string): any;

        /**
         * Getter for a single saved history.
         * 
         * @param name   The identifier for the old history to return.
         * @returns A history of inputs in JSON-friendly form.
         */
        getHistories(): any;

        /**
         * @returns All previously stored histories.
         */
        getCanTrigger(): IInputWriterBooleanGetter;

        /**
         * @returns Whether this is currently allowing inputs.
         */
        getIsRecording(): IInputWriterBooleanGetter;

        /**
         * Sets whether this is to allow inputs.
         * 
         * @param canTriggerNew   Whether this is now allowing inputs. This 
         *                        may be either a Function (to be evaluated 
         *                        on each input) or a general Boolean.
         */
        setCanTrigger(canTriggerNew: boolean | IInputWriterBooleanGetter): void;

        /**
         * Sets whether this is recording.
         * 
         * @param isRecordingNew   Whether this is now recording inputs.    
         */
        setIsRecording(isRecordingNew: boolean | IInputWriterBooleanGetter): void;

        /**
         * Sets the first argument for event callbacks.
         * 
         * @param eventInformationNew   A new first argument for event callbacks.
         */
        setEventInformation(eventInformationNew: any): void;

        /**
         * Adds a list of values by which an event may be triggered.
         * 
         * @param name   The name of the event that is being given aliases,
         *               such as "left".
         * @param values   An array of aliases by which the event will also 
         *                 be callable.
         */
        addAliasValues(name: any, values: any[]): void;

        /**
         * Removes a list of values by which an event may be triggered.
         * 
         * @param name   The name of the event that is having aliases removed, 
         *               such as "left".
         * @param values   Aliases by which the event will no longer be callable.
         */
        removeAliasValues(name: string, values: any[]): void;

        /**
         * Shortcut to remove old alias values and add new ones in.
         * 
         * 
         * @param name   The name of the event that is having aliases
         *               added and removed, such as "left".
         * @param valuesOld   An array of aliases by which the event will no
         *                    longer be callable.
         * @param valuesNew   An array of aliases by which the event will 
         *                    now be callable.
         */
        switchAliasValues(name: string, valuesOld: any[], valuesNew: any[]): void;

        /**
         * Adds a set of alises from an Object containing "name" => [values] pairs.
         * 
         * @param aliasesRaw   Aliases to be added via this.addAliasvalues.
         */
        addAliases(aliasesRaw: any): void;

        /**
         * Adds a triggerable event by marking a new callback under the trigger's
         * triggers. Any aliases for the label are also given the callback.
         * 
         * @param trigger   The name of the triggered event.
         * @param label   The code within the trigger to call within, 
         *                typically either a character code or an alias.
         * @param callback   The callback Function to be triggered.
         */
        addEvent(trigger: string, label: any, callback: IInputWritrTriggerCallback): void;

        /**
         * Removes a triggerable event by deleting any callbacks under the trigger's
         * triggers. Any aliases for the label are also given the callback.
         * 
         * @param trigger   The name of the triggered event.
         * @param label   The code within the trigger to call within, 
         *                typically either a character code or an alias.
         */
        removeEvent(trigger: string, label: any): void;

        /**
         * Stores the current history in the histories listing. this.restartHistory 
         * is typically called directly after.
         * 
         * @param name   A key to store the history under (by default, one greater than
         *               the length of Object.keys(this.histories)).
         */
        saveHistory(name?: string): void;

        /**
         * Clears the currently tracked inputs history and resets the starting time,
         * and (optionally) saves the current history.
         * 
         * @param keepHistory   Whether the currently tracked history of inputs should 
         *                      be added to the master listing (by default, true).
         */
        restartHistory(keepHistory?: boolean): void;

        /**
         * "Plays" back a history of event information by simulating each keystroke
         * in a new call, timed by setTimeout.
         * 
         * @param history   The events history to play back.
         * @remarks This will execute the same actions in the same order as before,
         *          but the arguments object may be different.
         * @remarks Events will be added to history again, as duplicates.
         */
        playHistory(history: IHistory): void;

        /**
         * Primary driver function to run an event. The event is chosen from the
         * triggers object, and called with eventInformation as the input.
         * 
         * @param event   The event Function (or String alias thereof) to call.
         * @param [keyCode]   The alias of the event Function under triggers[event],
         *                    if event is a String.
         * @param [sourceEvent]   The raw event that caused the calling Pipe
         *                        to be triggered, such as a MouseEvent.
         * @returns The result of calling the triggered event.
         */
        callEvent(event: Function | string, keyCode?: number | string, sourceEvent?: Event): any;

        /**
         * Creates and returns a Function to run a trigger.
         * 
         * @param trigger   The label for the Array of functions that the
         *                  pipe function should choose from.
         * @param codeLabel   A mapping String for the alias to get the
         *                    alias from the event.
         * @param [preventDefaults]   Whether the input to the pipe Function
         *                            will be an DOM-style event, where 
         *                            .preventDefault() should be called.
         * @returns A Function that, when called on an event, runs this.callEvent
         *          on the appropriate trigger event.
         */
        makePipe(trigger: string, codeLabel: string, preventDefaults?: boolean): Function;
    }
}


namespace InputWritr {
    "use strict";

    /**
     * A general utility for automating interactions with user-called events linked
     * with callbacks. Pipe functions are available that take in user input, switch 
     * on the event code, and call the appropriate callback. Further utilities allow 
     * for saving and playback of input histories in JSON format.
     */
    export class InputWritr implements IInputWritr {
        /**
         * A mapping of events to their key codes, to their callbacks.
         */
        private triggers: IInputWritrTriggerContainer;

        /**
         * Known, allowed aliases for triggers.
         */
        private aliases: IAliases;

        /**
         * Recording of every action that has happened, with a timestamp.
         */
        private currentHistory: IHistory;

        /**
         * A listing of all histories, with indices set by this.saveHistory.
         */
        private histories: IHistories;

        /**
         * Function to generate a current timestamp, commonly performance.now.
         */
        private getTimestamp: () => number;

        /**
         * A starting time used for calculating playback delays in playHistory.
         */
        private startingTime: number;

        /**
         * An Object to be passed to event calls, commonly with key information
         * such as { "down": 0 }.
         */
        private eventInformation: any;

        /**
         * An optional Boolean callback to disable or enable input triggers.
         */
        private canTrigger: IInputWriterBooleanGetter;

        /**
         * Whether to record events into history.
         */
        private isRecording: IInputWriterBooleanGetter;

        /**
         * A quick lookup table of key aliases to their character codes.
         */
        private keyAliasesToCodes: IAliasesToCodes;

        /**
         * A quick lookup table of character codes to their key aliases.
         */
        private keyCodesToAliases: ICodesToAliases;

        /**
         * Initializes a new instance of the InputWritr class.
         * 
         * @param settings   Settings to be used for initialization.
         */
        constructor(settings: IInputWritrSettings) {
            if (typeof settings === "undefined") {
                throw new Error("No settings object given to InputWritr.");
            }
            if (typeof settings.triggers === "undefined") {
                throw new Error("No triggers given to InputWritr.");
            }

            this.triggers = settings.triggers;

            // Headless browsers like PhantomJS might not contain the performance
            // class, so Date.now is used as a backup
            if (typeof settings.getTimestamp === "undefined") {
                if (typeof performance === "undefined") {
                    this.getTimestamp = function (): number {
                        return Date.now();
                    };
                } else {
                    this.getTimestamp = (
                        performance.now
                        || (<any>performance).webkitNow
                        || (<any>performance).mozNow
                        || (<any>performance).msNow
                        || (<any>performance).oNow
                    ).bind(performance);
                }
            } else {
                this.getTimestamp = settings.getTimestamp;
            }

            this.eventInformation = settings.eventInformation;

            this.canTrigger = settings.hasOwnProperty("canTrigger")
                ? <IInputWriterBooleanGetter>settings.canTrigger
                : function (): boolean {
                    return true;
                };
            this.isRecording = settings.hasOwnProperty("isRecording")
                ? <IInputWriterBooleanGetter>settings.isRecording
                : function (): boolean {
                    return true;
                };

            this.currentHistory = {};
            this.histories = {};
            this.aliases = {};

            this.addAliases(settings.aliases || {});

            this.keyAliasesToCodes = settings.keyAliasesToCodes || {
                "shift": 16,
                "ctrl": 17,
                "space": 32,
                "left": 37,
                "up": 38,
                "right": 39,
                "down": 40
            };

            this.keyCodesToAliases = settings.keyCodesToAliases || {
                "16": "shift",
                "17": "ctrl",
                "32": "space",
                "37": "left",
                "38": "up",
                "39": "right",
                "40": "down"
            };
        }


        /* Simple gets
        */

        /** 
         * @returns The stored mapping of aliases to values.
         */
        getAliases(): IAliases {
            return this.aliases;
        }

        /**
         * @returns The stored mapping of aliases to values, with values
         *          mapped to their equivalent key Strings.
         */
        getAliasesAsKeyStrings(): IAliasKeys {
            var output: IAliasKeys = {},
                alias: string;

            for (alias in this.aliases) {
                if (this.aliases.hasOwnProperty(alias)) {
                    output[alias] = this.getAliasAsKeyStrings(alias);
                }
            }

            return output;
        }

        /**
         * Determines the allowed key strings for a given alias.
         * 
         * @param alias   An alias allowed to be passed in, typically a
         *                character code.
         * @returns The mapped key Strings corresponding to that alias,
         *          typically the human-readable Strings representing 
         *          input names, such as "a" or "left".
         */
        getAliasAsKeyStrings(alias: string): string[] {
            return this.aliases[alias].map<string>(this.convertAliasToKeyString.bind(this));
        }

        /**
         * @param alias   The alias of an input, typically a character code.
         * @returns The human-readable String representing the input name,
         *          such as "a" or "left".
         */
        convertAliasToKeyString(alias: any): string {
            if (alias.constructor === String) {
                return alias;
            }

            if (alias > 96 && alias < 105) {
                return String.fromCharCode(alias - 48);
            }

            if (alias > 64 && alias < 97) {
                return String.fromCharCode(alias);
            }

            return typeof this.keyCodesToAliases[alias] !== "undefined"
                ? this.keyCodesToAliases[alias]
                : "?";
        }

        /**
         * @param key   The number code of an input.
         * @returns The machine-usable character code of the input.
         */
        convertKeyStringToAlias(key: number | string): number | string {
            if (key.constructor === Number) {
                return key;
            }

            if ((<string>key).length === 1) {
                return (<string>key).charCodeAt(0) - 32;
            }

            return typeof this.keyAliasesToCodes[<string>key] !== "undefined"
                ? this.keyAliasesToCodes[<string>key]
                : -1;
        }

        /**
         * Getter for the currently recording history.
         * 
         * @returns The currently recording history of inputs in JSON-friendly form.
         */
        getCurrentHistory(): IHistory {
            return this.currentHistory;
        }

        /**
         * Getter for a single saved history.
         * 
         * @param name   The identifier for the old history to return.
         * @returns A history of inputs in JSON-friendly form.
         */
        getHistory(name: string): IHistory {
            return this.histories[name];
        }

        /**
         * @returns All previously stored histories.
         */
        getHistories(): IHistories {
            return this.histories;
        }

        /**
         * @returns Whether this is currently allowing inputs.
         */
        getCanTrigger(): IInputWriterBooleanGetter {
            return this.canTrigger;
        }

        /**
         * @returns Whether this is currently recording allowed inputs.
         */
        getIsRecording(): IInputWriterBooleanGetter {
            return this.isRecording;
        }


        /* Simple sets
        */

        /**
         * Sets whether this is to allow inputs.
         * 
         * @param canTriggerNew   Whether this is now allowing inputs. This 
         *                        may be either a Function (to be evaluated 
         *                        on each input) or a general Boolean.
         */
        setCanTrigger(canTriggerNew: boolean | IInputWriterBooleanGetter): void {
            if (canTriggerNew.constructor === Boolean) {
                this.canTrigger = function (): boolean {
                    return <boolean>canTriggerNew;
                };
            } else {
                this.canTrigger = <IInputWriterBooleanGetter>canTriggerNew;
            }
        }

        /**
         * Sets whether this is recording.
         * 
         * @param isRecordingNew   Whether this is now recording inputs.    
         */
        setIsRecording(isRecordingNew: boolean | IInputWriterBooleanGetter): void {
            if (isRecordingNew.constructor === Boolean) {
                this.isRecording = function (): boolean {
                    return <boolean>isRecordingNew;
                };
            } else {
                this.isRecording = <IInputWriterBooleanGetter>isRecordingNew;
            }
        }

        /**
         * Sets the first argument for event callbacks.
         * 
         * @param eventInformationNew   A new first argument for event callbacks.
         */
        setEventInformation(eventInformationNew: any): void {
            this.eventInformation = eventInformationNew;
        }


        /* Aliases
        */

        /**
         * Adds a list of values by which an event may be triggered.
         * 
         * @param name   The name of the event that is being given aliases,
         *               such as "left".
         * @param values   An array of aliases by which the event will also 
         *                 be callable.
         */
        addAliasValues(name: any, values: any[]): void {
            var triggerName: any,
                triggerGroup: any,
                i: number;

            if (!this.aliases.hasOwnProperty(name)) {
                this.aliases[name] = values;
            } else {
                this.aliases[name].push.apply(this.aliases[name], values);
            }

            // triggerName = "onkeydown", "onkeyup", ...
            for (triggerName in this.triggers) {
                if (this.triggers.hasOwnProperty(triggerName)) {
                    // triggerGroup = { "left": function, ... }, ...
                    triggerGroup = this.triggers[triggerName];

                    if (triggerGroup.hasOwnProperty(name)) {
                        // values[i] = 37, 65, ...
                        for (i = 0; i < values.length; i += 1) {
                            triggerGroup[values[i]] = triggerGroup[name];
                        }
                    }
                }
            }
        }

        /**
         * Removes a list of values by which an event may be triggered.
         * 
         * @param name   The name of the event that is having aliases removed, 
         *               such as "left".
         * @param values   Aliases by which the event will no longer be callable.
         */
        removeAliasValues(name: string, values: any[]): void {
            var triggerName: any,
                triggerGroup: any,
                i: number;

            if (!this.aliases.hasOwnProperty(name)) {
                return;
            }

            for (i = 0; i < values.length; i += 1) {
                this.aliases[name].splice(this.aliases[name].indexOf(values[i], 1));
            }

            // triggerName = "onkeydown", "onkeyup", ...
            for (triggerName in this.triggers) {
                if (this.triggers.hasOwnProperty(triggerName)) {
                    // triggerGroup = { "left": function, ... }, ...
                    triggerGroup = this.triggers[triggerName];

                    if (triggerGroup.hasOwnProperty(name)) {
                        // values[i] = 37, 65, ...
                        for (i = 0; i < values.length; i += 1) {
                            if (triggerGroup.hasOwnProperty(values[i])) {
                                delete triggerGroup[values[i]];
                            }
                        }
                    }
                }
            }
        }

        /**
         * Shortcut to remove old alias values and add new ones in.
         * 
         * 
         * @param name   The name of the event that is having aliases
         *               added and removed, such as "left".
         * @param valuesOld   An array of aliases by which the event will no
         *                    longer be callable.
         * @param valuesNew   An array of aliases by which the event will 
         *                    now be callable.
         */
        switchAliasValues(name: string, valuesOld: any[], valuesNew: any[]): void {
            this.removeAliasValues(name, valuesOld);
            this.addAliasValues(name, valuesNew);
        }

        /**
         * Adds a set of alises from an Object containing "name" => [values] pairs.
         * 
         * @param aliasesRaw   Aliases to be added via this.addAliasvalues.
         */
        addAliases(aliasesRaw: any): void {
            var aliasName: string;

            for (aliasName in aliasesRaw) {
                if (aliasesRaw.hasOwnProperty(aliasName)) {
                    this.addAliasValues(aliasName, aliasesRaw[aliasName]);
                }
            }
        }


        /* Functions
        */

        /**
         * Adds a triggerable event by marking a new callback under the trigger's
         * triggers. Any aliases for the label are also given the callback.
         * 
         * @param trigger   The name of the triggered event.
         * @param label   The code within the trigger to call within, 
         *                typically either a character code or an alias.
         * @param callback   The callback Function to be triggered.
         */
        addEvent(trigger: string, label: any, callback: IInputWritrTriggerCallback): void {
            var i: number;

            if (!this.triggers.hasOwnProperty(trigger)) {
                throw new Error("Unknown trigger requested: '" + trigger + "'.");
            }

            this.triggers[trigger][label] = callback;

            if (this.aliases.hasOwnProperty(label)) {
                for (i = 0; i < this.aliases[label].length; i += 1) {
                    this.triggers[trigger][this.aliases[label][i]] = callback;
                }
            }
        }

        /**
         * Removes a triggerable event by deleting any callbacks under the trigger's
         * triggers. Any aliases for the label are also given the callback.
         * 
         * @param trigger   The name of the triggered event.
         * @param label   The code within the trigger to call within, 
         *                typically either a character code or an alias.
         */
        removeEvent(trigger: string, label: any): void {
            var i: number;

            if (!this.triggers.hasOwnProperty(trigger)) {
                throw new Error("Unknown trigger requested: '" + trigger + "'.");
            }

            delete this.triggers[trigger][label];

            if (this.aliases.hasOwnProperty(label)) {
                for (i = 0; i < this.aliases[label].length; i += 1) {
                    if (this.triggers[trigger][this.aliases[label][i]]) {
                        delete this.triggers[trigger][this.aliases[label][i]];
                    }
                }
            }
        }

        /**
         * Stores the current history in the histories listing. this.restartHistory 
         * is typically called directly after.
         * 
         * @param name   A key to store the history under (by default, one greater than
         *               the length of Object.keys(this.histories)).
         */
        saveHistory(name: string = Object.keys(this.histories).length.toString()): void {
            this.histories[name] = this.currentHistory;
        }

        /**
         * Clears the currently tracked inputs history and resets the starting time,
         * and (optionally) saves the current history.
         * 
         * @param keepHistory   Whether the currently tracked history of inputs should 
         *                      be added to the master listing (by default, true).
         */
        restartHistory(keepHistory: boolean = true): void {
            if (keepHistory) {
                this.saveHistory();
            }

            this.currentHistory = {};
            this.startingTime = this.getTimestamp();
        }

        /**
         * "Plays" back a history of event information by simulating each keystroke
         * in a new call, timed by setTimeout.
         * 
         * @param history   The events history to play back.
         * @remarks This will execute the same actions in the same order as before,
         *          but the arguments object may be different.
         * @remarks Events will be added to history again, as duplicates.
         */
        playHistory(history: IHistory): void {
            var time: string;

            for (time in history) {
                if (history.hasOwnProperty(time)) {
                    setTimeout(
                        this.makeEventCall(history[time]),
                        (Number(time) - this.startingTime) | 0);
                }
            }
        }

        /**
         * Primary driver function to run an event. The event is chosen from the
         * triggers object, and called with eventInformation as the input.
         * 
         * @param event   The event Function (or String alias thereof) to call.
         * @param [keyCode]   The alias of the event Function under triggers[event],
         *                    if event is a String.
         * @param [sourceEvent]   The raw event that caused the calling Pipe
         *                        to be triggered, such as a MouseEvent.
         * @returns The result of calling the triggered event.
         */
        callEvent(event: Function | string, keyCode?: number | string, sourceEvent?: Event): any {
            if (!event) {
                throw new Error("Blank event given to InputWritr.");
            }

            if (!this.canTrigger(event, keyCode, sourceEvent)) {
                return;
            }

            if (event.constructor === String) {
                event = this.triggers[<string>event][<string>keyCode];
            }

            return (<Function>event)(this.eventInformation, sourceEvent);
        }

        /**
         * Creates and returns a Function to run a trigger.
         * 
         * @param trigger   The label for the Array of functions that the
         *                  pipe function should choose from.
         * @param codeLabel   A mapping String for the alias to get the
         *                    alias from the event.
         * @param [preventDefaults]   Whether the input to the pipe Function
         *                            will be an DOM-style event, where 
         *                            .preventDefault() should be called.
         * @returns A Function that, when called on an event, runs this.callEvent
         *          on the appropriate trigger event.
         */
        makePipe(trigger: string, codeLabel: string, preventDefaults?: boolean): Function {
            var functions: any = this.triggers[trigger];

            if (!functions) {
                throw new Error("No trigger of label '" + trigger + "' defined.");
            }

            return (event: Event) => {
                var alias: number | string = event[codeLabel];

                // Typical usage means alias will be an event from a key/mouse input
                if (preventDefaults && event.preventDefault instanceof Function) {
                    event.preventDefault();
                }

                // If there's a Function under that alias, run it
                if (functions.hasOwnProperty(alias)) {
                    if (this.isRecording()) {
                        this.saveEventInformation([trigger, alias]);
                    }

                    this.callEvent(functions[alias], alias, event);
                }
            };
        }

        /**
         * Curry utility to create a closure that runs callEvent when called.
         * 
         * @param info   An array containing [trigger, alias].
         * @returns A closure that activates a trigger when called.
         */
        private makeEventCall(info: [string, any]): Function {
            return (): void => {
                this.callEvent(info[0], info[1]);
                if (this.isRecording()) {
                    this.saveEventInformation(info);
                }
            };
        }

        /**
         * Records event information in this.currentHistory.
         * 
         * @param info   Information on the event, as [trigger, alias].
         */
        private saveEventInformation(info: [string, any]): void {
            this.currentHistory[this.getTimestamp() | 0] = info;
        }
    }
}
