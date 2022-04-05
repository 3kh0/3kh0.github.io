declare namespace TimeHandlr {
    /**
     * Lookup of current events, mapping times to all associated events.
     */
    export interface ICurrentEvents {
        [i: number]: TimeEvent[];
    }

    /**
     * Settings to create a class cycling event, commonly as a String[].
     */
    export interface ITimeCycleSettings {
        /**
         * How many class phases should be cycled through.
         */
        length: number;

        /**
         * Each member of the Array-like cycle settings is a status checker, 
         * className, or Function to generate a className.
         */
        [i: number]: boolean | string | IClassCalculator;
    }

    /**
     * Information for a currently cycling time cycle.
     */
    export interface ITimeCycle extends ITimeCycleSettings {
        /**
         * The container event using this cycle.
         */
        event?: ITimeEvent;

        /**
         * Where in the classes this is currently.
         */
        location?: number;

        /**
         * The previous class' index.
         */
        oldclass?: number;
    }

    /**
     * A container of cycle events, such as what a Thing will store.
     */
    export interface ITimeCycles {
        [i: string]: ITimeCycle;
    }

    /**
     * General-purpose Function for events.
     * 
     * @param args   Any arguments, passed through a TimeHandlr.
     * @returns Anything truthy to stop repetition.
     */
    export interface IEventCallback {
        (...args: any[]): any;
    }

    /**
     * General-purpose calculator for numeric values.
     * 
     * @param args   Any arguments.
     * @returns Some numeric value.
     */
    export interface INumericCalculator {
        (...args: any[]): number;
    }

    /**
     * Calculator for event repetition.
     * 
     * @param args   Any arguments, which will be the same as the 
     *               parent event's passed args.
     * @returns Whether an event should keep repeating.
     */
    export interface IRepeatCalculator {
        (...args: any[]): boolean;
    }

    /**
     * Calculator for a class within a class cycle.
     * 
     * @param args   Any arguments.
     * @returns Either a className or a value for whether this should stop.
     */
    export interface IClassCalculator {
        (thing: IThing, settings: ITimeCycle): string | boolean;
    }

    /**
     * General-purpose Function to add or remove a class on a Thing.
     * 
     * @param thing   A Thing whose class is to change.
     * @param className   The class to add or remove.
     */
    export interface IClassChanger {
        (thing: IThing, className: string): void;
    }

    /**
     * An object that may have classes added or removed, such as in a cycle.
     */
    export interface IThing { }

    /**
     * An event to be played, including a callback, repetition settings, and arguments.
     */
    export interface ITimeEvent {
        /**
         * The time at which to call this event.
         */
        time: number;

        /**
         * Something to run when this event is triggered.
         */
        callback: Function;

        /**
         * Arguments to be passed to the callback.
         */
        args?: any[];

        /**
         * How many times this should repeat. If a Function, called for whether to repeat.
         */
        repeat?: number | IRepeatCalculator;

        /**
         * How long to wait between calls, if repeat isn't 1.
         */
        timeRepeat?: number | INumericCalculator;

        /**
         * How many times this has been called.
         */
        count?: number;
    }

    /**
     * Settings to initialize a new ITimeHandlr.
     */
    export interface ITimeHandlrSettings {
        /**
         * The default time separation between events in cycles (by default, 1).
         */
        timingDefault?: number;

        /**
         * Attribute name to store listings of cycles in objects (by default, 
         * "cycles").
         */
        keyCycles?: string;

        /**
         * Atribute name to store class name in objects (by default, "className").
         */
        keyClassName?: string;

        /**
         * Key to check for a callback before a cycle starts in objects (by default,
         * "onClassCycleStart").
         */
        keyOnClassCycleStart?: string;

        /**
         * Key to check for a callback after a cycle starts in objects (by default,
         * "doClassCycleStart").
         */
        keyDoClassCycleStart?: string;

        /**
         * Optional attribute to check for whether a cycle may be given to an 
         * object (if not given, ignored).
         */
        keyCycleCheckValidity?: string;

        /**
         * Whether a copy of settings should be made in setClassCycle.
         */
        copyCycleSettings?: boolean;

        /**
         * Function to add a class to a Thing (by default, String concatenation).
         */
        classAdd?: IClassChanger;

        /**
         * Function to remove a class from a Thing (by default, String removal).
         */
        classRemove?: IClassChanger;
    }

    /**
     * A timed events library providing a flexible alternative to setTimeout 
     * and setInterval that respects pauses and resumes. Events are assigned 
     * integer timestamps, and can be set to repeat multiple times.
     */
    export interface ITimeHandlr {
        /**
         * @returns The current time.
         */
        getTime(): number;

        /**
         * @returns The catalog of events, keyed by their time triggers.
         */
        getEvents(): ICurrentEvents;

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
        addEvent(callback: IEventCallback, timeDelay?: number | INumericCalculator, ...args: any[]): ITimeEvent;

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
        addEventInterval(
            callback: IEventCallback,
            timeDelay?: number | INumericCalculator,
            numRepeats?: number | IEventCallback,
            ...args: any[]): ITimeEvent;

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
         * @param settings   Repetition settings, particularly .length.
         */
        addEventIntervalSynched(
            callback: IEventCallback,
            timeDelay: number,
            numRepeats: number | IEventCallback,
            settings: ITimeCycle): ITimeEvent;

        /**
         * Adds a sprite cycle (settings) for a thing, to be referenced by the given
         * name in the thing's keyCycles Object.
         * 
         * @param thing   The object whose class is to be cycled.
         * @param settings   A container for repetition settings, particularly .length.
         * @param name   The name of the cycle, to be referenced in the thing's cycles.
         * @param timing   A way to determine how long to wait between classes.
         */
        addClassCycle(thing: IThing, settings: ITimeCycle, name?: string, timing?: number | INumericCalculator): ITimeCycle;

        /**
         * Adds a synched sprite cycle (settings) for a thing, to be referenced by
         * the given name in the thing's keyCycles Object, and in tune with all other
         * keyCycles of the same period.
         * 
         * @param thing   The object whose class is to be cycled.
         * @param settings   A container for repetition settings, particularly .length.
         * @param name   The name of the cycle, to be referenced in the thing's cycles.
         * @param timing   A way to determine how long to wait between classes.
         */
        addClassCycleSynched(thing: IThing, settings: ITimeCycle, name?: string, timing?: number | INumericCalculator): ITimeCycle;

        /**
         * Increments time and handles all now-current events.
         */
        handleEvents(): void;

        /**
         * Handles a single event by calling its callback then checking its repeatability.
         * If it is repeatable, it is re-added at a later time to the events listing.
         *
         * @param event   An event to be handled.
         * @returns A new time the event is scheduled for (or undefined if it isn't).
         */
        handleEvent(event: ITimeEvent): number;

        /**
         * Cancels an event by making its .repeat value 0.
         * 
         * @param event   The event to cancel.
         */
        cancelEvent(event: ITimeEvent): void;

        /**
         * Cancels all events by clearing the events Object.
         */
        cancelAllEvents(): void;

        /**
         * Cancels the class cycle of a thing by finding the cycle under the thing's
         * keyCycles and making it appear to be empty.
         * 
         * @param thing   The thing whose cycle is to be cancelled.
         * @param name   The name of the cycle to be cancelled.
         */
        cancelClassCycle(thing: IThing, name: string): void;

        /**
         * Cancels all class keyCycles of a thing under the thing's sycles.
         * 
         * @param thing   The thing whose cycles are to be cancelled.
         */
        cancelAllCycles(thing: IThing): void;
    }
}

namespace TimeHandlr {
    "use strict";

    /**
     * An event to be played, including a callback, repetition settings, and arguments.
     */
    export class TimeEvent implements ITimeEvent {
        /**
         * The time at which to call this event.
         */
        time: number;

        /**
         * Something to run when this event is triggered.
         */
        callback: Function;

        /**
         * Arguments to be passed to the callback.
         */
        args: any[];

        /**
         * How many times this should repeat. If a Function, called for a return value.
         */
        repeat: number | IEventCallback;

        /**
         * How long to wait between calls, if repeat isn't 1.
         */
        timeRepeat: number | INumericCalculator;

        /**
         * How many times this has been called.
         */
        count: number = 0;

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
        constructor(
            callback: IEventCallback,
            repeat: number | INumericCalculator,
            time: number,
            timeRepeat: number | INumericCalculator,
            args?: any[]) {
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
        static runCalculator(value: number | INumericCalculator, ...args: any[]): number {
            if (value.constructor === Number) {
                return <number>value;
            } else {
                return (<INumericCalculator>value)(...args);
            }
        }

        /**
         * Set the next call time using timeRepeat.
         * 
         * @returns The new call time.
         */
        scheduleNextRepeat(): number {
            return this.time += TimeEvent.runCalculator(this.timeRepeat);
        }
    }
}


namespace TimeHandlr {
    "use strict";

    /**
     * A timed events library providing a flexible alternative to setTimeout 
     * and setInterval that respects pauses and resumes. Events are assigned 
     * integer timestamps, and can be set to repeat multiple times.
     */
    export class TimeHandlr implements ITimeHandlr {
        /**
         * The current (most recently reached) time.
         */
        private time: number;

        /**
         * Lookup table of all events yet to be triggered, keyed by their time.
         */
        private events: ICurrentEvents;

        /**
         * The default time separation between events in cycles.
         */
        private timingDefault: number;

        /**
         * Attribute name to store listings of cycles in objects.
         */
        private keyCycles: string;

        /**
         * Attribute name to store class name in objects.
         */
        private keyClassName: string;

        /**
         * Key to check for a callback before a cycle starts in objects.
         */
        private keyOnClassCycleStart: string;

        /**
         * Key to check for a callback after a cycle starts in objects.
         */
        private keyDoClassCycleStart: string;

        /**
         * Optional attribute to check for whether a cycle may be given to an 
         * object.
         */
        private keyCycleCheckValidity: string;

        /**
         * Whether a copy of settings should be made in setClassCycle.
         */
        private copyCycleSettings: boolean;

        /**
         * Function to add a class to a Thing.
         */
        private classAdd: IClassChanger;

        /**
         * Function to remove a class from a Thing.
         */
        private classRemove: IClassChanger;

        /**
         * Initializes a new instance of the TimeHandlr class.
         * 
         * @param settings   Settings to be used for initialization.
         */
        constructor(settings: ITimeHandlrSettings = {}) {
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
        getTime(): number {
            return this.time;
        }

        /**
         * @returns The catalog of events, keyed by their time triggers.
         */
        getEvents(): ICurrentEvents {
            return this.events;
        }


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
        addEvent(callback: IEventCallback, timeDelay?: number | INumericCalculator, ...args: any[]): TimeEvent {
            var event: TimeEvent = new TimeEvent(callback, 1, this.time, timeDelay || 1, args);
            this.insertEvent(event);
            return event;
        }

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
        addEventInterval(
            callback: IEventCallback,
            timeDelay?: number | INumericCalculator,
            numRepeats?: number | IEventCallback,
            ...args: any[]): TimeEvent {
            var event: TimeEvent = new TimeEvent(callback, numRepeats || 1, this.time, timeDelay || 1, args);
            this.insertEvent(event);
            return event;
        }

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
        addEventIntervalSynched(
            callback: IEventCallback,
            timeDelay?: number | INumericCalculator,
            numRepeats?: number | IEventCallback,
            ...args: any[]): TimeEvent {
            timeDelay = timeDelay || 1;
            numRepeats = numRepeats || 1;

            var calcTime: number = TimeEvent.runCalculator(timeDelay || this.timingDefault),
                entryTime: number = Math.ceil(this.time / calcTime) * calcTime;

            if (entryTime === this.time) {
                return this.addEventInterval(callback, timeDelay, numRepeats, ...args);
            } else {
                return this.addEvent(this.addEventInterval, entryTime - this.time, callback, timeDelay, numRepeats, ...args);
            }
        }


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
        addClassCycle(thing: IThing, settings: ITimeCycleSettings, name?: string, timing?: number | INumericCalculator): ITimeCycle {
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
        }

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
        addClassCycleSynched(thing: IThing, settings: ITimeCycle, name?: string, timing?: number | INumericCalculator): ITimeCycle {
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
        }

        /* General event handling
        */

        /**
         * Increments time and handles all now-current events.
         */
        handleEvents(): void {
            var currentEvents: TimeEvent[],
                i: number;

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
        }

        /**
         * Handles a single event by calling its callback then checking its repeatability.
         * If it is repeatable, it is re-added at a later time to the events listing.
         *
         * @param event   An event to be handled.
         * @returns A new time the event is scheduled for (or undefined if it isn't).
         */
        handleEvent(event: TimeEvent): number {
            // Events return truthy values to indicate a stop.
            if (event.repeat <= 0 || event.callback.apply(this, event.args)) {
                return;
            }

            if (typeof event.repeat === "function") {
                // Repeat calculators return truthy values to indicate to keep going
                if (!(<IRepeatCalculator>event.repeat).apply(this, event.args)) {
                    return;
                }
            } else {
                if (!event.repeat) {
                    return;
                }

                event.repeat = <number>event.repeat - 1;
                if (event.repeat <= 0) {
                    return;
                }
            }

            event.scheduleNextRepeat();
            this.insertEvent(event);
            return event.time;
        }

        /**
         * Cancels an event by making its .repeat value 0.
         * 
         * @param event   The event to cancel.
         */
        cancelEvent(event: ITimeEvent): void {
            event.repeat = 0;
        }

        /**
         * Cancels all events by clearing the events Object.
         */
        cancelAllEvents(): void {
            this.events = {};
        }

        /**
         * Cancels the class cycle of a thing by finding the cycle under the thing's
         * cycles and making it appear to be empty.
         * 
         * @param thing   The thing whose cycle is to be cancelled.
         * @param name   The name of the cycle to be cancelled.
         */
        cancelClassCycle(thing: IThing, name: string): void {
            var cycle: ITimeCycle;

            if (!thing[this.keyCycles] || !thing[this.keyCycles][name]) {
                return;
            }

            cycle = thing[this.keyCycles][name];
            cycle.event.repeat = 0;

            delete thing[this.keyCycles][name];
        }

        /**
         * Cancels all class cycles of a thing under the thing's sycles.
         * 
         * @param thing   The thing whose cycles are to be cancelled.
         */
        cancelAllCycles(thing: IThing): void {
            var keyCycles: ITimeCycles = thing[this.keyCycles],
                cycle: ITimeCycle,
                name: string;

            for (name in keyCycles) {
                if (!keyCycles.hasOwnProperty(name)) {
                    continue;
                }

                cycle = keyCycles[name];
                cycle.length = 1;
                cycle[0] = false;
                delete keyCycles[name];
            }
        }


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
        private setClassCycle(thing: IThing, settings: ITimeCycle, timing?: number | INumericCalculator, synched?: boolean): ITimeCycle {
            timing = TimeEvent.runCalculator(timing || this.timingDefault);

            if (this.copyCycleSettings) {
                settings = this.makeSettingsCopy(settings);
            }

            // Start off before the beginning of the cycle
            settings.location = settings.oldclass = -1;

            // Let the object know to start the cycle when needed
            if (synched) {
                thing[this.keyOnClassCycleStart] = (): void => {
                    var calcTime: number = settings.length * <number>timing,
                        entryDelay: number = Math.ceil(this.time / calcTime) * calcTime - this.time,
                        event: ITimeEvent;

                    if (entryDelay === 0) {
                        event = this.addEventInterval(this.cycleClass, timing, Infinity, thing, settings);
                    } else {
                        event = this.addEvent(this.addEventInterval, entryDelay, this.cycleClass, timing, Infinity, thing, settings);
                    }

                    settings.event = event;
                };
            } else {
                thing[this.keyOnClassCycleStart] = (): void => {
                    settings.event = this.addEventInterval(this.cycleClass, timing, Infinity, thing, settings);
                };
            }

            // If it should already start, do that
            if (thing[this.keyDoClassCycleStart]) {
                thing[this.keyOnClassCycleStart]();
            }

            return settings;
        }

        /**
         * Moves an object from its current class in the sprite cycle to the next.
         * If the next object is === false, or the repeat function returns false, 
         * stop by returning true.
         * 
         * @param thing   The object whose class is to be cycled.
         * @param settings   A container for repetition settings, particularly .length.
         * @returns Whether the class cycle should stop (normally false).
         */
        private cycleClass(thing: IThing, settings: ITimeCycle): boolean {
            // If anything has been invalidated, return true to stop
            if (!thing || !settings || !settings.length || (this.keyCycleCheckValidity && !thing[this.keyCycleCheckValidity])) {
                return true;
            }

            var current: boolean | string | IClassCalculator,
                name: string | boolean;

            // Get rid of the previous class from settings, if it's a String
            if (settings.oldclass !== -1 && typeof settings[settings.oldclass] === "string") {
                this.classRemove(thing, <string>settings[settings.oldclass]);
            }

            // Move to the next location in settings, as a circular list
            settings.location = (settings.location += 1) % settings.length;

            // Current is the class, bool, or Function currently added and/or run
            current = settings[settings.location];
            if (!current) {
                return false;
            }

            if (current.constructor === Function) {
                name = (<IClassCalculator>current)(thing, settings);
            } else {
                name = <string>current;
            }

            settings.oldclass = settings.location;

            // Strings are classes to be added directly
            if (typeof name === "string") {
                this.classAdd(thing, name);
                return false;
            } else {
                // Truthy non-String names imply a stop is required
                return !!name;
            }
        }


        /* Utilities
        */

        /**
         * Quick handler to add an event to events at a particular time. If the time
         * doesn't have any events listed, a new Array is made to hold this event.
         */
        private insertEvent(event: TimeEvent): void {
            if (!this.events[event.time]) {
                this.events[event.time] = [event];
            } else {
                this.events[event.time].push(event);
            }
        }

        /**
         * Creates a copy of an Object/Array. This is useful for passing settings
         * Objects by value instead of reference.
         * 
         * @param original   The original object.
         * @returns A copy of the original object.
         */
        private makeSettingsCopy(original: any): any {
            var output: any = new original.constructor(),
                i: string;

            for (i in original) {
                if (original.hasOwnProperty(i)) {
                    output[i] = original[i];
                }
            }

            return output;
        }

        /**
         * Default classAdd Function.
         * 
         * @param element   The element whose class is being modified.
         * @param className   The String to be added to the thing's class.
         */
        private classAddGeneric(thing: IThing, className: string): void {
            thing[this.keyClassName] += " " + className;
        }

        /**
         * Default classRemove Function.
         * 
         * @param element   The element whose class is being modified.
         * @param className   The String to be removed from the thing's class.
         */
        private classRemoveGeneric(thing: IThing, className: string): void {
            thing[this.keyClassName] = thing[this.keyClassName].replace(className, "");
        }
    }
}
