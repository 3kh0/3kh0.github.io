/// <reference path="FPSAnalyzr-0.2.1.ts" />

declare namespace GamesRunnr {
    /**
     * A callback for when the game changes playing state (pause or play).
     */
    export interface ITriggerCallback {
        (...args: any[]): void;
    }

    /**
     * A callback to schedule each upkeep.
     *
     * @param callback   The next upkeep to run.
     * @param timeout   How long to wait before calling the next upkeep.
     * @returns A unique identifier that can be passed to an upkeep cancellation.
     */
    export interface IUpkeepScheduler {
        (callback: Function, timeout: number): number;
    }

    /**
     * A callback to disable an upkeep.
     * 
     * @param handle   The unique identifier of the upkeep to cancel.
     */
    export interface IUpkeepCanceller {
        (handle: number): void;
    }

    /**
     * Settings to initialize a new IGamesRunnr instance.
     */
    export interface IGamesRunnrSettings {
        /**
         * The Array of Functions to run on each upkeep.
         */
        games: Function[];

        /**
         * How often, in milliseconds, to call upkeep (by default, 1000/60).
         */
        interval?: number;

        /**
         * A multiplier for interval that can be set independently.
         */
        speed?: number;

        /**
         * Whether scheduling timeouts should adjust to elapsed upkeep time.
         */
        adjustFramerate?: boolean;

        /**
         * A callback to run when upkeep is paused.
         */
        onPause?: ITriggerCallback;

        /**
         * A callback to run when upkeep is played.
         */
        onPlay?: ITriggerCallback;

        /**
         * Arguments to be passed to onPause and onPlay (by default, [this]).
         */
        callbackArguments?: any[];

        /**
         * A Function to replace setTimeout as the upkeepScheduler.
         */
        upkeepScheduler?: IUpkeepScheduler;

        /**
         * A Function to replace clearTimeout as the upkeepCanceller.
         */
        upkeepCanceller?: IUpkeepCanceller;

        /**
         * A scope for games to be run on (defaults to the calling GamesRunnr).
         */
        scope?: any;

        /**
         * An FPSAnalyzr to provide statistics on automated playback. If not 
         * provided, a new one will be made.
         */
        FPSAnalyzer?: FPSAnalyzr.IFPSAnalyzr;

        /**
         * Settings to create a new FPSAnalyzr, if one isn't provided.
         */
        FPSAnalyzerSettings?: FPSAnalyzr.IFPSAnalyzrSettings;
    }

    /**
     * A class to continuously series of "game" Functions. Each game is run in a 
     * set order and the group is run as a whole at a particular interval, with a
     * configurable speed. Playback can be triggered manually, or driven by a timer
     * with pause and play hooks. For automated playback, statistics are 
     * available via an internal FPSAnalyzer.
     */
    export interface IGamesRunnr {
        /** 
         * @returns The FPSAnalyzer used in the GamesRunnr.
         */
        getFPSAnalyzer(): FPSAnalyzr.IFPSAnalyzr;

        /**
         * @returns Whether this is paused.
         */
        getPaused(): boolean;

        /**
         * @returns The Array of game Functions.
         */
        getGames(): any[];

        /**
         * @returns The interval between upkeeps.
         */
        getInterval(): number;

        /**
         * @returns The speed multiplier being applied to the interval.
         */
        getSpeed(): number;

        /**
         * @returns The optional trigger to be called on pause.
         */
        getOnPause(): any;

        /**
         * @returns The optional trigger to be called on play.
         */
        getOnPlay(): any;

        /**
         * @returns Arguments to be given to the optional trigger Functions.
         */
        getCallbackArguments(): any[];

        /**
         * @returns Function used to schedule the next upkeep.
         */
        getUpkeepScheduler(): IUpkeepScheduler;

        /**
         * @returns {Function} Function used to cancel the next upkeep.
         */
        getUpkeepCanceller(): IUpkeepCanceller;

        /**
         * Meaty function, run every <interval*speed> milliseconds, to mark an FPS
         * measurement and run every game once.
         */
        upkeep(): void;

        /**
         * A utility for this.upkeep that calls the same games.forEach(run), timing
         * the total execution time.
         * 
         * @returns The total time spent, in milliseconds.
         */
        upkeepTimed(): number;

        /**
         * Continues execution of this.upkeep by calling it. If an onPlay has been
         * defined, it's called before.
         */
        play(): void;

        /**
         * Stops execution of this.upkeep, and cancels the next call. If an onPause
         * has been defined, it's called after.
         */
        pause(): void;

        /**
         * Calls upkeep a <num or 1> number of times, immediately.
         * 
         * @param [num]   How many times to upkeep (by default, 1).
         */
        step(times?: number): void;

        /**
         * Toggles whether this is paused, and calls the appropriate Function.
         */
        togglePause(): void;

        /**
         * Sets the interval between between upkeeps.
         * 
         * @param interval   The new time interval in milliseconds.
         */
        setInterval(interval: number): void;

        /**
         * Sets the speed multiplier for the interval.
         * 
         * @param speed   The new speed multiplier. 2 will cause interval to be
         *                twice as fast, and 0.5 will be half as fast.
         */
        setSpeed(speed: number): void;
    }
}


namespace GamesRunnr {
    "use strict";

    /**
     * A class to continuously series of "game" Functions. Each game is run in a 
     * set order and the group is run as a whole at a particular interval, with a
     * configurable speed. Playback can be triggered manually, or driven by a timer
     * with pause and play hooks. For automated playback, statistics are 
     * available via an internal FPSAnalyzer.
     */
    export class GamesRunnr implements IGamesRunnr {
        /**
         * Functions to be run, in order, on each upkeep.
         */
        private games: Function[];

        /**
         * Optional trigger Function for this.pause.
         */
        private onPause: ITriggerCallback;

        /**
         * Optional trigger Function for this.play.
         */
        private onPlay: ITriggerCallback;

        /**
         * Arguments to be passed to the optional trigger Functions.
         */
        private callbackArguments: any[];

        /**
         * Reference to the next upkeep, such as setTimeout's returned int.
         */
        private upkeepNext: number;

        /**
         * Function used to schedule the next upkeep, such as setTimeout.
         */
        private upkeepScheduler: IUpkeepScheduler;

        /**
         * Function used to cancel the next upkeep, such as clearTimeout
         */
        private upkeepCanceller: (handle: number) => void;

        /**
         * this.upkeep bound to this GamesRunnr, for use in upkeepScheduler.
         */
        private upkeepBound: any;

        /**
         * Whether the game is currently paused.
         */
        private paused: boolean;

        /**
         * The amount of time, in milliseconds, between each upkeep.
         */
        private interval: number;

        /**
         * The playback rate multiplier (defaults to 1, for no change).
         */
        private speed: number;

        /**
         * The actual speed, as (1 / speed) * interval.
         */
        private intervalReal: number;

        /**
         * An internal FPSAnalyzr object that measures on each upkeep.
         */
        private FPSAnalyzer: FPSAnalyzr.IFPSAnalyzr;

        /**
         * An object to set as the scope for games, if not this GamesRunnr.
         */
        private scope: any;

        /**
         * Whether scheduling timeouts should adjust to elapsed upkeep time.
         */
        private adjustFramerate: boolean;

        /**
         * Initializes a new instance of the GamesRunnr class.
         * 
         * @param settings   Settings to be used for initialization.
         */
        constructor(settings: IGamesRunnrSettings) {
            if (typeof settings === "undefined") {
                throw new Error("No settings object given GamesRunnr.");
            }
            if (typeof settings.games === "undefined") {
                throw new Error("No games given to GamesRunnr.");
            }

            var i: number;

            this.games = settings.games;
            this.interval = settings.interval || 1000 / 60;
            this.speed = settings.speed || 1;
            this.onPause = settings.onPause;
            this.onPlay = settings.onPlay;
            this.callbackArguments = settings.callbackArguments || [this];
            this.adjustFramerate = settings.adjustFramerate;
            this.FPSAnalyzer = settings.FPSAnalyzer || new FPSAnalyzr.FPSAnalyzr(settings.FPSAnalyzerSettings);

            this.scope = settings.scope || this;
            this.paused = true;

            this.upkeepScheduler = settings.upkeepScheduler || function (handler: any, timeout: number): number {
                return setTimeout(handler, timeout);
            };
            this.upkeepCanceller = settings.upkeepCanceller || function (handle: number): void {
                clearTimeout(handle);
            };

            this.upkeepBound = this.upkeep.bind(this);

            for (i = 0; i < this.games.length; i += 1) {
                this.games[i] = this.games[i].bind(this.scope);
            }

            this.setIntervalReal();
        }


        /* Gets
        */

        /** 
         * @returns The FPSAnalyzer used in the GamesRunnr.
         */
        getFPSAnalyzer(): FPSAnalyzr.IFPSAnalyzr {
            return this.FPSAnalyzer;
        }

        /**
         * @returns Whether this is paused.
         */
        getPaused(): boolean {
            return this.paused;
        }

        /**
         * @returns The Array of game Functions.
         */
        getGames(): Function[] {
            return this.games;
        }

        /**
         * @returns The interval between upkeeps.
         */
        getInterval(): number {
            return this.interval;
        }

        /**
         * @returns The speed multiplier being applied to the interval.
         */
        getSpeed(): number {
            return this.speed;
        }

        /**
         * @returns The optional trigger to be called on pause.
         */
        getOnPause(): any {
            return this.onPause;
        }

        /**
         * @returns The optional trigger to be called on play.
         */
        getOnPlay(): any {
            return this.onPlay;
        }

        /**
         * @returns Arguments to be given to the optional trigger Functions.
         */
        getCallbackArguments(): any[] {
            return this.callbackArguments;
        }

        /**
         * @returns Function used to schedule the next upkeep.
         */
        getUpkeepScheduler(): IUpkeepScheduler {
            return this.upkeepScheduler;
        }

        /**
         * @returns {Function} Function used to cancel the next upkeep.
         */
        getUpkeepCanceller(): (handle: number) => void {
            return this.upkeepCanceller;
        }


        /* Runtime
        */

        /**
         * Meaty function, run every <interval*speed> milliseconds, to mark an FPS
         * measurement and run every game once.
         */
        upkeep(): void {
            if (this.paused) {
                return;
            }

            // Prevents double upkeeping, in case a new upkeepNext was scheduled.
            this.upkeepCanceller(this.upkeepNext);

            if (this.adjustFramerate) {
                this.upkeepNext = this.upkeepScheduler(this.upkeepBound, this.intervalReal - (this.upkeepTimed() | 0));
            } else {
                this.upkeepNext = this.upkeepScheduler(this.upkeepBound, this.intervalReal);
                this.runAllGames();
            }

            if (this.FPSAnalyzer) {
                this.FPSAnalyzer.measure();
            }
        }

        /**
         * A utility for this.upkeep that calls the same games.forEach(run), timing
         * the total execution time.
         * 
         * @returns The total time spent, in milliseconds.
         */
        upkeepTimed(): number {
            if (!this.FPSAnalyzer) {
                throw new Error("An internal FPSAnalyzr is required for upkeepTimed.");
            }

            var now: number = this.FPSAnalyzer.getTimestamp();
            this.runAllGames();
            return this.FPSAnalyzer.getTimestamp() - now;
        }

        /**
         * Continues execution of this.upkeep by calling it. If an onPlay has been
         * defined, it's called before.
         */
        play(): void {
            if (!this.paused) {
                return;
            }
            this.paused = false;

            if (this.onPlay) {
                this.onPlay.apply(this, this.callbackArguments);
            }

            this.upkeep();
        }

        /**
         * Stops execution of this.upkeep, and cancels the next call. If an onPause
         * has been defined, it's called after.
         */
        pause(): void {
            if (this.paused) {
                return;
            }
            this.paused = true;

            if (this.onPause) {
                this.onPause.apply(this, this.callbackArguments);
            }

            this.upkeepCanceller(this.upkeepNext);
        }

        /**
         * Calls upkeep a <num or 1> number of times, immediately.
         * 
         * @param [num]   How many times to upkeep (by default, 1).
         */
        step(times: number = 1): void {
            this.play();
            this.pause();
            if (times > 0) {
                this.step(times - 1);
            }
        }

        /**
         * Toggles whether this is paused, and calls the appropriate Function.
         */
        togglePause(): void {
            this.paused ? this.play() : this.pause();
        }


        /* Games manipulations
        */

        /**
         * Sets the interval between between upkeeps.
         * 
         * @param interval   The new time interval in milliseconds.
         */
        setInterval(interval: number): void {
            var intervalReal: number = Number(interval);

            if (isNaN(intervalReal)) {
                throw new Error("Invalid interval given to setInterval: " + interval);
            }

            this.interval = intervalReal;
            this.setIntervalReal();
        }

        /**
         * Sets the speed multiplier for the interval.
         * 
         * @param speed   The new speed multiplier. 2 will cause interval to be
         *                twice as fast, and 0.5 will be half as fast.
         */
        setSpeed(speed: number): void {
            var speedReal: number = Number(speed);

            if (isNaN(speedReal)) {
                throw new Error("Invalid speed given to setSpeed: " + speed);
            }

            this.speed = speedReal;
            this.setIntervalReal();
        }


        /* Utilities
        */

        /**
         * Sets the intervalReal variable, which is interval * (inverse of speed).
         */
        private setIntervalReal(): void {
            this.intervalReal = (1 / this.speed) * this.interval;
        }

        /**
         * Runs all games in this.games.
         */
        private runAllGames(): void {
            for (var i: number = 0; i < this.games.length; i += 1) {
                this.games[i]();
            }
        }
    }
}
