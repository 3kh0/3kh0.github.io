var InputWritr;
(function (InputWritr_1) {
    "use strict";
    /**
     * A general utility for automating interactions with user-called events linked
     * with callbacks. Pipe functions are available that take in user input, switch
     * on the event code, and call the appropriate callback. Further utilities allow
     * for saving and playback of input histories in JSON format.
     */
    var InputWritr = (function () {
        /**
         * Initializes a new instance of the InputWritr class.
         *
         * @param settings   Settings to be used for initialization.
         */
        function InputWritr(settings) {
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
                    this.getTimestamp = function () {
                        return Date.now();
                    };
                }
                else {
                    this.getTimestamp = (performance.now
                        || performance.webkitNow
                        || performance.mozNow
                        || performance.msNow
                        || performance.oNow).bind(performance);
                }
            }
            else {
                this.getTimestamp = settings.getTimestamp;
            }
            this.eventInformation = settings.eventInformation;
            this.canTrigger = settings.hasOwnProperty("canTrigger")
                ? settings.canTrigger
                : function () {
                    return true;
                };
            this.isRecording = settings.hasOwnProperty("isRecording")
                ? settings.isRecording
                : function () {
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
        InputWritr.prototype.getAliases = function () {
            return this.aliases;
        };
        /**
         * @returns The stored mapping of aliases to values, with values
         *          mapped to their equivalent key Strings.
         */
        InputWritr.prototype.getAliasesAsKeyStrings = function () {
            var output = {}, alias;
            for (alias in this.aliases) {
                if (this.aliases.hasOwnProperty(alias)) {
                    output[alias] = this.getAliasAsKeyStrings(alias);
                }
            }
            return output;
        };
        /**
         * Determines the allowed key strings for a given alias.
         *
         * @param alias   An alias allowed to be passed in, typically a
         *                character code.
         * @returns The mapped key Strings corresponding to that alias,
         *          typically the human-readable Strings representing
         *          input names, such as "a" or "left".
         */
        InputWritr.prototype.getAliasAsKeyStrings = function (alias) {
            return this.aliases[alias].map(this.convertAliasToKeyString.bind(this));
        };
        /**
         * @param alias   The alias of an input, typically a character code.
         * @returns The human-readable String representing the input name,
         *          such as "a" or "left".
         */
        InputWritr.prototype.convertAliasToKeyString = function (alias) {
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
        };
        /**
         * @param key   The number code of an input.
         * @returns The machine-usable character code of the input.
         */
        InputWritr.prototype.convertKeyStringToAlias = function (key) {
            if (key.constructor === Number) {
                return key;
            }
            if (key.length === 1) {
                return key.charCodeAt(0) - 32;
            }
            return typeof this.keyAliasesToCodes[key] !== "undefined"
                ? this.keyAliasesToCodes[key]
                : -1;
        };
        /**
         * Getter for the currently recording history.
         *
         * @returns The currently recording history of inputs in JSON-friendly form.
         */
        InputWritr.prototype.getCurrentHistory = function () {
            return this.currentHistory;
        };
        /**
         * Getter for a single saved history.
         *
         * @param name   The identifier for the old history to return.
         * @returns A history of inputs in JSON-friendly form.
         */
        InputWritr.prototype.getHistory = function (name) {
            return this.histories[name];
        };
        /**
         * @returns All previously stored histories.
         */
        InputWritr.prototype.getHistories = function () {
            return this.histories;
        };
        /**
         * @returns Whether this is currently allowing inputs.
         */
        InputWritr.prototype.getCanTrigger = function () {
            return this.canTrigger;
        };
        /**
         * @returns Whether this is currently recording allowed inputs.
         */
        InputWritr.prototype.getIsRecording = function () {
            return this.isRecording;
        };
        /* Simple sets
        */
        /**
         * Sets whether this is to allow inputs.
         *
         * @param canTriggerNew   Whether this is now allowing inputs. This
         *                        may be either a Function (to be evaluated
         *                        on each input) or a general Boolean.
         */
        InputWritr.prototype.setCanTrigger = function (canTriggerNew) {
            if (canTriggerNew.constructor === Boolean) {
                this.canTrigger = function () {
                    return canTriggerNew;
                };
            }
            else {
                this.canTrigger = canTriggerNew;
            }
        };
        /**
         * Sets whether this is recording.
         *
         * @param isRecordingNew   Whether this is now recording inputs.
         */
        InputWritr.prototype.setIsRecording = function (isRecordingNew) {
            if (isRecordingNew.constructor === Boolean) {
                this.isRecording = function () {
                    return isRecordingNew;
                };
            }
            else {
                this.isRecording = isRecordingNew;
            }
        };
        /**
         * Sets the first argument for event callbacks.
         *
         * @param eventInformationNew   A new first argument for event callbacks.
         */
        InputWritr.prototype.setEventInformation = function (eventInformationNew) {
            this.eventInformation = eventInformationNew;
        };
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
        InputWritr.prototype.addAliasValues = function (name, values) {
            var triggerName, triggerGroup, i;
            if (!this.aliases.hasOwnProperty(name)) {
                this.aliases[name] = values;
            }
            else {
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
        };
        /**
         * Removes a list of values by which an event may be triggered.
         *
         * @param name   The name of the event that is having aliases removed,
         *               such as "left".
         * @param values   Aliases by which the event will no longer be callable.
         */
        InputWritr.prototype.removeAliasValues = function (name, values) {
            var triggerName, triggerGroup, i;
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
        };
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
        InputWritr.prototype.switchAliasValues = function (name, valuesOld, valuesNew) {
            this.removeAliasValues(name, valuesOld);
            this.addAliasValues(name, valuesNew);
        };
        /**
         * Adds a set of alises from an Object containing "name" => [values] pairs.
         *
         * @param aliasesRaw   Aliases to be added via this.addAliasvalues.
         */
        InputWritr.prototype.addAliases = function (aliasesRaw) {
            var aliasName;
            for (aliasName in aliasesRaw) {
                if (aliasesRaw.hasOwnProperty(aliasName)) {
                    this.addAliasValues(aliasName, aliasesRaw[aliasName]);
                }
            }
        };
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
        InputWritr.prototype.addEvent = function (trigger, label, callback) {
            var i;
            if (!this.triggers.hasOwnProperty(trigger)) {
                throw new Error("Unknown trigger requested: '" + trigger + "'.");
            }
            this.triggers[trigger][label] = callback;
            if (this.aliases.hasOwnProperty(label)) {
                for (i = 0; i < this.aliases[label].length; i += 1) {
                    this.triggers[trigger][this.aliases[label][i]] = callback;
                }
            }
        };
        /**
         * Removes a triggerable event by deleting any callbacks under the trigger's
         * triggers. Any aliases for the label are also given the callback.
         *
         * @param trigger   The name of the triggered event.
         * @param label   The code within the trigger to call within,
         *                typically either a character code or an alias.
         */
        InputWritr.prototype.removeEvent = function (trigger, label) {
            var i;
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
        };
        /**
         * Stores the current history in the histories listing. this.restartHistory
         * is typically called directly after.
         *
         * @param name   A key to store the history under (by default, one greater than
         *               the length of Object.keys(this.histories)).
         */
        InputWritr.prototype.saveHistory = function (name) {
            if (name === void 0) { name = Object.keys(this.histories).length.toString(); }
            this.histories[name] = this.currentHistory;
        };
        /**
         * Clears the currently tracked inputs history and resets the starting time,
         * and (optionally) saves the current history.
         *
         * @param keepHistory   Whether the currently tracked history of inputs should
         *                      be added to the master listing (by default, true).
         */
        InputWritr.prototype.restartHistory = function (keepHistory) {
            if (keepHistory === void 0) { keepHistory = true; }
            if (keepHistory) {
                this.saveHistory();
            }
            this.currentHistory = {};
            this.startingTime = this.getTimestamp();
        };
        /**
         * "Plays" back a history of event information by simulating each keystroke
         * in a new call, timed by setTimeout.
         *
         * @param history   The events history to play back.
         * @remarks This will execute the same actions in the same order as before,
         *          but the arguments object may be different.
         * @remarks Events will be added to history again, as duplicates.
         */
        InputWritr.prototype.playHistory = function (history) {
            var time;
            for (time in history) {
                if (history.hasOwnProperty(time)) {
                    setTimeout(this.makeEventCall(history[time]), (Number(time) - this.startingTime) | 0);
                }
            }
        };
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
        InputWritr.prototype.callEvent = function (event, keyCode, sourceEvent) {
            if (!event) {
                throw new Error("Blank event given to InputWritr.");
            }
            if (!this.canTrigger(event, keyCode, sourceEvent)) {
                return;
            }
            if (event.constructor === String) {
                event = this.triggers[event][keyCode];
            }
            return event(this.eventInformation, sourceEvent);
        };
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
        InputWritr.prototype.makePipe = function (trigger, codeLabel, preventDefaults) {
            var _this = this;
            var functions = this.triggers[trigger];
            if (!functions) {
                throw new Error("No trigger of label '" + trigger + "' defined.");
            }
            return function (event) {
                var alias = event[codeLabel];
                // Typical usage means alias will be an event from a key/mouse input
                if (preventDefaults && event.preventDefault instanceof Function) {
                    event.preventDefault();
                }
                // If there's a Function under that alias, run it
                if (functions.hasOwnProperty(alias)) {
                    if (_this.isRecording()) {
                        _this.saveEventInformation([trigger, alias]);
                    }
                    _this.callEvent(functions[alias], alias, event);
                }
            };
        };
        /**
         * Curry utility to create a closure that runs callEvent when called.
         *
         * @param info   An array containing [trigger, alias].
         * @returns A closure that activates a trigger when called.
         */
        InputWritr.prototype.makeEventCall = function (info) {
            var _this = this;
            return function () {
                _this.callEvent(info[0], info[1]);
                if (_this.isRecording()) {
                    _this.saveEventInformation(info);
                }
            };
        };
        /**
         * Records event information in this.currentHistory.
         *
         * @param info   Information on the event, as [trigger, alias].
         */
        InputWritr.prototype.saveEventInformation = function (info) {
            this.currentHistory[this.getTimestamp() | 0] = info;
        };
        return InputWritr;
    })();
    InputWritr_1.InputWritr = InputWritr;
})(InputWritr || (InputWritr = {}));
