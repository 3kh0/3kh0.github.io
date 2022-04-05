var TimeHandlr;
(function (TimeHandlr) {
    "use strict";
    /**
     * An event to be played, including a callback, repetition settings, and arguments.
     */
    var TimeEvent = (function () {
        /**
         * Initializes a new instance of the Event class.
         *
         * @param callback   A callback to be run some number of times. If it returns
         *                   truthy, repetition stops.
         * @param repeat   How many times to run the event.
         * @param time   The current time in the parent TimeHandlr.
         * @param timeRepeat   How long from now to run the callback, and how many
         *                     steps between each call.
         * @param args   Any additional arguments to pass to the callback.
         */
        function TimeEvent(callback, repeat, time, timeRepeat, args) {
            /**
             * How many times this has been called.
             */
            this.count = 0;
            this.callback = callback;
            this.repeat = repeat;
            this.timeRepeat = timeRepeat;
            this.time = time + TimeEvent.runCalculator(timeRepeat, this);
            this.args = args;
        }
        /**
         * Computes a value as either a raw Number or a Function.
         *
         * @param value   The value to be computed.
         * @param args   Any additional arguments, if value is a Function.
         * @returns A numeric equivalent of the value.
         */
        TimeEvent.runCalculator = function (value) {
            var args = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                args[_i - 1] = arguments[_i];
            }
            if (value.constructor === Number) {
                return value;
            }
            else {
                return value.apply(void 0, args);
            }
        };
        /**
         * Set the next call time using timeRepeat.
         *
         * @returns The new call time.
         */
        TimeEvent.prototype.scheduleNextRepeat = function () {
            return this.time += TimeEvent.runCalculator(this.timeRepeat);
        };
        return TimeEvent;
    })();
    TimeHandlr.TimeEvent = TimeEvent;
})(TimeHandlr || (TimeHandlr = {}));
var TimeHandlr;
(function (TimeHandlr_1) {
    "use strict";
    /**
     * A timed events library providing a flexible alternative to setTimeout
     * and setInterval that respects pauses and resumes. Events are assigned
     * integer timestamps, and can be set to repeat multiple times.
     */
    var TimeHandlr = (function () {
        /**
         * Initializes a new instance of the TimeHandlr class.
         *
         * @param settings   Settings to be used for initialization.
         */
        function TimeHandlr(settings) {
            if (settings === void 0) { settings = {}; }
            this.time = 0;
            this.events = {};
            this.timingDefault = settings.timingDefault || 1;
            this.keyCycles = settings.keyCycles || "cycles";
            this.keyClassName = settings.keyClassName || "className";
            this.keyOnClassCycleStart = settings.keyOnClassCycleStart || "onClassCycleStart";
            this.keyDoClassCycleStart = settings.keyDoClassCycleStart || "doClassCycleStart";
            this.keyCycleCheckValidity = settings.keyCycleCheckValidity;
            this.copyCycleSettings = typeof settings.copyCycleSettings === "undefined" ? true : settings.copyCycleSettings;
            this.classAdd = settings.classAdd || this.classAddGeneric;
            this.classRemove = settings.classRemove || this.classRemoveGeneric;
        }
        /* Simple gets
        */
        /**
         * @returns The current time.
         */
        TimeHandlr.prototype.getTime = function () {
            return this.time;
        };
        /**
         * @returns The catalog of events, keyed by their time triggers.
         */
        TimeHandlr.prototype.getEvents = function () {
            return this.events;
        };
        /* Event adding
        */
        /**
         * Adds an event in a manner similar to setTimeout, though any arguments
         * past the timeDelay will be passed to the event callback. The added event
         * is inserted into the events container and set to only repeat once.
         *
         * @param callback   A callback to be run after some time.
         * @param timeDelay   How long from now to run the callback (by default, 1).
         * @param args   Any additional arguments to pass to the callback.
         * @returns An event with the given callback and time information.
         */
        TimeHandlr.prototype.addEvent = function (callback, timeDelay) {
            var args = [];
            for (var _i = 2; _i < arguments.length; _i++) {
                args[_i - 2] = arguments[_i];
            }
            var event = new TimeHandlr_1.TimeEvent(callback, 1, this.time, timeDelay || 1, args);
            this.insertEvent(event);
            return event;
        };
        /**
         * Adds an event in a manner similar to setInterval, though any arguments past
         * the numRepeats will be passed to the event callback. The added event is
         * inserted into the events container and is set to repeat a numRepeat amount
         * of times, though if the callback returns true, it will stop.
         *
         * @param callback   A callback to be run some number of times. If it returns
         *                   truthy, repetition stops.
         * @param timeDelay   How long from now to run the callback, and how many
         *                    steps between each call (by default, 1).
         * @param numRepeats   How many times to run the event. Infinity is an
         *                     acceptable option (by default, 1).
         * @param args   Any additional arguments to pass to the callback.
         * @returns An event with the given callback and time information.
         */
        TimeHandlr.prototype.addEventInterval = function (callback, timeDelay, numRepeats) {
            var args = [];
            for (var _i = 3; _i < arguments.length; _i++) {
                args[_i - 3] = arguments[_i];
            }
            var event = new TimeHandlr_1.TimeEvent(callback, numRepeats || 1, this.time, timeDelay || 1, args);
            this.insertEvent(event);
            return event;
        };
        /**
         * A wrapper around addEventInterval that delays starting the event
         * until the current time is modular with the repeat delay, so that all
         * event intervals synched to the same period are in unison.
         *
         * @param callback   A callback to be run some number of times. If it returns
         *                   truthy, repetition stops.
         * @param timeDelay   How long from now to run the callback, and how many
         *                    steps between each call (by default, 1).
         * @param numRepeats   How many times to run the event. Infinity is an
         *                     acceptable option (by default, 1).
         * @param thing   Some data container to be manipulated.
         * @param args   Any additional arguments to pass to the callback.
         * @returns An event with the given callback and time information.
         */
        TimeHandlr.prototype.addEventIntervalSynched = function (callback, timeDelay, numRepeats) {
            var args = [];
            for (var _i = 3; _i < arguments.length; _i++) {
                args[_i - 3] = arguments[_i];
            }
            timeDelay = timeDelay || 1;
            numRepeats = numRepeats || 1;
            var calcTime = TimeHandlr_1.TimeEvent.runCalculator(timeDelay || this.timingDefault), entryTime = Math.ceil(this.time / calcTime) * calcTime;
            if (entryTime === this.time) {
                return this.addEventInterval.apply(this, [callback, timeDelay, numRepeats].concat(args));
            }
            else {
                return this.addEvent.apply(this, [this.addEventInterval, entryTime - this.time, callback, timeDelay, numRepeats].concat(args));
            }
        };
        /* Class cycles
        */
        /**
         * Adds a sprite cycle (settings) for a thing, to be referenced by the given
         * name in the thing's cycles Object.
         *
         * @param thing   The object whose class is to be cycled.
         * @param settings   A container for repetition settings, particularly .length.
         * @param name   The name of the cycle, to be referenced in the thing's cycles.
         * @param timing   A way to determine how long to wait between classes.
         */
        TimeHandlr.prototype.addClassCycle = function (thing, settings, name, timing) {
            // Make sure the object has a holder for keyCycles...
            if (!thing[this.keyCycles]) {
                thing[this.keyCycles] = {};
            }
            // ...and nothing previously existing for that name
            this.cancelClassCycle(thing, name);
            settings = thing[this.keyCycles][name || "0"] = this.setClassCycle(thing, settings, timing);
            // Immediately run the first class cycle, then return
            this.cycleClass(thing, settings);
            return settings;
        };
        /**
         * Adds a synched sprite cycle (settings) for a thing, to be referenced by
         * the given name in the thing's cycles Object, and in tune with all other
         * cycles of the same period.
         *
         * @param thing   The object whose class is to be cycled.
         * @param settings   A container for repetition settings, particularly .length.
         * @param name   The name of the cycle, to be referenced in the thing's cycles.
         * @param timing   A way to determine how long to wait between classes.
         */
        TimeHandlr.prototype.addClassCycleSynched = function (thing, settings, name, timing) {
            // Make sure the object has a holder for keyCycles...
            if (!thing[this.keyCycles]) {
                thing[this.keyCycles] = {};
            }
            // ...and nothing previously existing for that name
            this.cancelClassCycle(thing, name);
            settings = thing[this.keyCycles][name || "0"] = this.setClassCycle(thing, settings, timing, true);
            // Immediately run the first class cycle, then return
            this.cycleClass(thing, settings);
            return settings;
        };
        /* General event handling
        */
        /**
         * Increments time and handles all now-current events.
         */
        TimeHandlr.prototype.handleEvents = function () {
            var currentEvents, i;
            this.time += 1;
            currentEvents = this.events[this.time];
            if (!currentEvents) {
                return;
            }
            for (i = 0; i < currentEvents.length; i += 1) {
                this.handleEvent(currentEvents[i]);
            }
            // Once all these events are done, ignore the memory
            delete this.events[this.time];
        };
        /**
         * Handles a single event by calling its callback then checking its repeatability.
         * If it is repeatable, it is re-added at a later time to the events listing.
         *
         * @param event   An event to be handled.
         * @returns A new time the event is scheduled for (or undefined if it isn't).
         */
        TimeHandlr.prototype.handleEvent = function (event) {
            // Events return truthy values to indicate a stop.
            if (event.repeat <= 0 || event.callback.apply(this, event.args)) {
                return;
            }
            if (typeof event.repeat === "function") {
                // Repeat calculators return truthy values to indicate to keep going
                if (!event.repeat.apply(this, event.args)) {
                    return;
                }
            }
            else {
                if (!event.repeat) {
                    return;
                }
                event.repeat = event.repeat - 1;
                if (event.repeat <= 0) {
                    return;
                }
            }
            event.scheduleNextRepeat();
            this.insertEvent(event);
            return event.time;
        };
        /**
         * Cancels an event by making its .repeat value 0.
         *
         * @param event   The event to cancel.
         */
        TimeHandlr.prototype.cancelEvent = function (event) {
            event.repeat = 0;
        };
        /**
         * Cancels all events by clearing the events Object.
         */
        TimeHandlr.prototype.cancelAllEvents = function () {
            this.events = {};
        };
        /**
         * Cancels the class cycle of a thing by finding the cycle under the thing's
         * cycles and making it appear to be empty.
         *
         * @param thing   The thing whose cycle is to be cancelled.
         * @param name   The name of the cycle to be cancelled.
         */
        TimeHandlr.prototype.cancelClassCycle = function (thing, name) {
            var cycle;
            if (!thing[this.keyCycles] || !thing[this.keyCycles][name]) {
                return;
            }
            cycle = thing[this.keyCycles][name];
            cycle.event.repeat = 0;
            delete thing[this.keyCycles][name];
        };
        /**
         * Cancels all class cycles of a thing under the thing's sycles.
         *
         * @param thing   The thing whose cycles are to be cancelled.
         */
        TimeHandlr.prototype.cancelAllCycles = function (thing) {
            var keyCycles = thing[this.keyCycles], cycle, name;
            for (name in keyCycles) {
                if (!keyCycles.hasOwnProperty(name)) {
                    continue;
                }
                cycle = keyCycles[name];
                cycle.length = 1;
                cycle[0] = false;
                delete keyCycles[name];
            }
        };
        /* Internal handling
        */
        /**
         * Initialization utility for sprite cycles of things. The settings are
         * added at the right time (immediately if not synched, or on a delay if
         * synched).
         *
         * @param thing   The object whose class is to be cycled.
         * @param settings   A container for repetition settings, particularly .length.
         * @param timing   A way to determine how often to do the cycle.
         * @param synched   Whether the animations should be synched to their period.
         * @returns The cycle containing settings and the new event.
         */
        TimeHandlr.prototype.setClassCycle = function (thing, settings, timing, synched) {
            var _this = this;
            timing = TimeHandlr_1.TimeEvent.runCalculator(timing || this.timingDefault);
            if (this.copyCycleSettings) {
                settings = this.makeSettingsCopy(settings);
            }
            // Start off before the beginning of the cycle
            settings.location = settings.oldclass = -1;
            // Let the object know to start the cycle when needed
            if (synched) {
                thing[this.keyOnClassCycleStart] = function () {
                    var calcTime = settings.length * timing, entryDelay = Math.ceil(_this.time / calcTime) * calcTime - _this.time, event;
                    if (entryDelay === 0) {
                        event = _this.addEventInterval(_this.cycleClass, timing, Infinity, thing, settings);
                    }
                    else {
                        event = _this.addEvent(_this.addEventInterval, entryDelay, _this.cycleClass, timing, Infinity, thing, settings);
                    }
                    settings.event = event;
                };
            }
            else {
                thing[this.keyOnClassCycleStart] = function () {
                    settings.event = _this.addEventInterval(_this.cycleClass, timing, Infinity, thing, settings);
                };
            }
            // If it should already start, do that
            if (thing[this.keyDoClassCycleStart]) {
                thing[this.keyOnClassCycleStart]();
            }
            return settings;
        };
        /**
         * Moves an object from its current class in the sprite cycle to the next.
         * If the next object is === false, or the repeat function returns false,
         * stop by returning true.
         *
         * @param thing   The object whose class is to be cycled.
         * @param settings   A container for repetition settings, particularly .length.
         * @returns Whether the class cycle should stop (normally false).
         */
        TimeHandlr.prototype.cycleClass = function (thing, settings) {
            // If anything has been invalidated, return true to stop
            if (!thing || !settings || !settings.length || (this.keyCycleCheckValidity && !thing[this.keyCycleCheckValidity])) {
                return true;
            }
            var current, name;
            // Get rid of the previous class from settings, if it's a String
            if (settings.oldclass !== -1 && typeof settings[settings.oldclass] === "string") {
                this.classRemove(thing, settings[settings.oldclass]);
            }
            // Move to the next location in settings, as a circular list
            settings.location = (settings.location += 1) % settings.length;
            // Current is the class, bool, or Function currently added and/or run
            current = settings[settings.location];
            if (!current) {
                return false;
            }
            if (current.constructor === Function) {
                name = current(thing, settings);
            }
            else {
                name = current;
            }
            settings.oldclass = settings.location;
            // Strings are classes to be added directly
            if (typeof name === "string") {
                this.classAdd(thing, name);
                return false;
            }
            else {
                // Truthy non-String names imply a stop is required
                return !!name;
            }
        };
        /* Utilities
        */
        /**
         * Quick handler to add an event to events at a particular time. If the time
         * doesn't have any events listed, a new Array is made to hold this event.
         */
        TimeHandlr.prototype.insertEvent = function (event) {
            if (!this.events[event.time]) {
                this.events[event.time] = [event];
            }
            else {
                this.events[event.time].push(event);
            }
        };
        /**
         * Creates a copy of an Object/Array. This is useful for passing settings
         * Objects by value instead of reference.
         *
         * @param original   The original object.
         * @returns A copy of the original object.
         */
        TimeHandlr.prototype.makeSettingsCopy = function (original) {
            var output = new original.constructor(), i;
            for (i in original) {
                if (original.hasOwnProperty(i)) {
                    output[i] = original[i];
                }
            }
            return output;
        };
        /**
         * Default classAdd Function.
         *
         * @param element   The element whose class is being modified.
         * @param className   The String to be added to the thing's class.
         */
        TimeHandlr.prototype.classAddGeneric = function (thing, className) {
            thing[this.keyClassName] += " " + className;
        };
        /**
         * Default classRemove Function.
         *
         * @param element   The element whose class is being modified.
         * @param className   The String to be removed from the thing's class.
         */
        TimeHandlr.prototype.classRemoveGeneric = function (thing, className) {
            thing[this.keyClassName] = thing[this.keyClassName].replace(className, "");
        };
        return TimeHandlr;
    })();
    TimeHandlr_1.TimeHandlr = TimeHandlr;
})(TimeHandlr || (TimeHandlr = {}));
