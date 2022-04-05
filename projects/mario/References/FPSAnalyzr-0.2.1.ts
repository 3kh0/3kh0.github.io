declare namespace FPSAnalyzr {
    /**
     * A Function to generate a current timestamp, such as performance.now.
     */
    export interface ITimestampGetter {
        (): number;
    }

    /**
     * Storage for internal FPS measurements, as either a Number[] or Object.
     */
    export type IMeasurementsContainer = number[] | {
        [i: number]: number;
    }

    /**
     * Settings to initialize a new IFPSAnalyzr.
     */
    export interface IFPSAnalyzrSettings {
        /**
         * How many FPS measurements to keep at any given time, at most.
         */
        maxKept?: number;

        /**
         * A Function to generate a current timestamp, such as performance.now.
         */
        getTimestamp?: any;
    }

    /**
     * A general utility for obtaining and analyzing framerate measurements. The 
     * most recent measurements are kept up to a certain point (either an infinite
     * number or a set amount). Options for analyzing the data such as getting the
     * mean, median, extremes, etc. are available.
     */
    export interface IFPSAnalyzr {
        /**
         * Function to generate a current timestamp, commonly performance.now.
         */
        getTimestamp: ITimestampGetter;

        /**
         * Standard public measurement function.
         * Marks the current timestamp as timeCurrent, and adds an FPS measurement
         * if there was a previous timeCurrent.
         * 
         * @param [time]   An optional timestamp (by default, getTimestamp() is used).
         */
        measure(time?: number): void;

        /**
         * Adds an FPS measurement to measurements, and increments the associated
         * count variables.
         * 
         * @param fps   An FPS calculated as the difference between two timestamps.
         */
        addFPS(fps: number): void;

        /**
         * @returns The number of FPS measurements to keep.
         */
        getMaxKept(): number;

        /**
         * @returns The actual number of FPS measurements currently known.
         */
        getNumRecorded(): number;

        /**
         * @returns The most recent performance.now timestamp.
         */
        getTimeCurrent(): number;

        /**
         * @returns The current position in measurements.
         */
        getTicker(): number;

        /**
         * Get function for a copy of the measurements listing (if the number of
         * measurements is less than the max, that size is used)
         * 
         * @returns A Number[] of the most recent FPS measurements.
         */
        getMeasurements(): number[];

        /**
         * Get function for a copy of the measurements listing, but with the FPS
         * measurements transformed back into time differences
         * 
         * @returns A container of the most recent FPS time differences.
         */
        getDifferences(): number[];

        /**
         * @returns The average recorded FPS measurement.
         */
        getAverage(): number;

        /**
         * @returns The median recorded FPS measurement.
         * @remarks This is O(n*log(n)), where n is the size of the history,
         *          as it creates a copy of the history and sorts it.
         */
        getMedian(): number;

        /**
         * @returns Array containing the lowest and highest recorded FPS 
         *          measurements, in that order.
         */
        getExtremes(): number[];

        /**
         * @returns The range of recorded FPS measurements.
         */
        getRange(): number;
    }
}


namespace FPSAnalyzr {
    "use strict";

    /**
     * A general utility for obtaining and analyzing framerate measurements. The 
     * most recent measurements are kept up to a certain point (either an infinite
     * number or a set amount). Options for analyzing the data such as getting the
     * mean, median, extremes, etc. are available.
     */
    export class FPSAnalyzr implements IFPSAnalyzr {
        /**
         * Function to generate a current timestamp, commonly performance.now.
         */
        public getTimestamp: ITimestampGetter;

        /**
         * How many FPS measurements to keep at any given time, at most.
         */
        private maxKept: number;

        /**
         * A recent history of FPS measurements (normally an Array). These are
         * stored as changes in millisecond timestamps.
         */
        private measurements: IMeasurementsContainer;

        /**
         * The actual number of FPS measurements currently known.
         */
        private numRecorded: number;

        /**
         * The current position in the internal measurements listing.
         */
        private ticker: number;

        /**
         * The most recent timestamp from getTimestamp.
         */
        private timeCurrent: number;

        /**
         * Initializes a new instance of the FPSAnalyzr class.
         * 
         * @param [settings]
         */
        constructor(settings: IFPSAnalyzrSettings = {}) {
            this.maxKept = settings.maxKept || 35;
            this.numRecorded = 0;
            this.ticker = -1;

            // If maxKept is a Number, make the measurements array that long.
            // If it's infinite, make measurements an {} (infinite Array).
            this.measurements = isFinite(this.maxKept) ? new Array(this.maxKept) : {};

            // Headless browsers like PhantomJS won't know performance, so Date.now
            // is used as a backup
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
        }


        /* Public interface
        */

        /**
         * Standard public measurement function.
         * Marks the current timestamp as timeCurrent, and adds an FPS measurement
         * if there was a previous timeCurrent.
         * 
         * @param [time]   An optional timestamp (by default, getTimestamp() is used).
         */
        measure(time: number = this.getTimestamp()): void {
            if (this.timeCurrent) {
                this.addFPS(1000 / (time - this.timeCurrent));
            }

            this.timeCurrent = time;
        }

        /**
         * Adds an FPS measurement to measurements, and increments the associated
         * count variables.
         * 
         * @param fps   An FPS calculated as the difference between two timestamps.
         */
        addFPS(fps: number): void {
            this.ticker = (this.ticker += 1) % this.maxKept;
            this.measurements[this.ticker] = fps;
            this.numRecorded += 1;
        }


        /* Gets
        */

        /**
         * @returns The number of FPS measurements to keep.
         */
        getMaxKept(): number {
            return this.maxKept;
        }

        /**
         * @returns The actual number of FPS measurements currently known.
         */
        getNumRecorded(): number {
            return this.numRecorded;
        }

        /**
         * @returns The most recent performance.now timestamp.
         */
        getTimeCurrent(): number {
            return this.timeCurrent;
        }

        /**
         * @returns The current position in measurements.
         */
        getTicker(): number {
            return this.ticker;
        }

        /**
         * Get function for a copy of the measurements listing (if the number of
         * measurements is less than the max, that size is used)
         * 
         * @returns A Number[] of the most recent FPS measurements.
         */
        getMeasurements(): number[] {
            var fpsKeptReal: number = Math.min(this.maxKept, this.numRecorded),
                copy: any,
                i: number;

            if (isFinite(this.maxKept)) {
                copy = new Array(fpsKeptReal);
            } else {
                copy = {};
                copy.length = fpsKeptReal;
            }

            for (i = fpsKeptReal - 1; i >= 0; --i) {
                copy[i] = this.measurements[i];
            }

            return copy;
        }

        /**
         * Get function for a copy of the measurements listing, but with the FPS
         * measurements transformed back into time differences
         * 
         * @returns A container of the most recent FPS time differences.
         */
        getDifferences(): number[] {
            var copy: number[] = this.getMeasurements(),
                i: number;

            for (i = copy.length - 1; i >= 0; --i) {
                copy[i] = 1000 / copy[i];
            }

            return copy;
        }

        /**
         * @returns The average recorded FPS measurement.
         */
        getAverage(): number {
            var total: number = 0,
                max: number = Math.min(this.maxKept, this.numRecorded),
                i: number;

            for (i = max - 1; i >= 0; --i) {
                total += this.measurements[i];
            }

            return total / max;
        }

        /**
         * @returns The median recorded FPS measurement.
         * @remarks This is O(n*log(n)), where n is the size of the history,
         *          as it creates a copy of the history and sorts it.
         */
        getMedian(): number {
            var copy: any = this.getMeasurementsSorted(),
                fpsKeptReal: number = copy.length,
                fpsKeptHalf: number = Math.floor(fpsKeptReal / 2);

            if (copy.length % 2 === 0) {
                return copy[fpsKeptHalf];
            } else {
                return (copy[fpsKeptHalf - 2] + copy[fpsKeptHalf]) / 2;
            }
        }

        /**
         * @returns Array containing the lowest and highest recorded FPS 
         *          measurements, in that order.
         */
        getExtremes(): number[] {
            var lowest: number = this.measurements[0],
                highest: number = lowest,
                max: number = Math.min(this.maxKept, this.numRecorded),
                fps: number,
                i: number;

            for (i = max - 1; i >= 0; --i) {
                fps = this.measurements[i];
                if (fps > highest) {
                    highest = fps;
                } else if (fps < lowest) {
                    lowest = fps;
                }
            }

            return [lowest, highest];
        }

        /**
         * @returns The range of recorded FPS measurements.
         */
        getRange(): number {
            var extremes: number[] = this.getExtremes();
            return extremes[1] - extremes[0];
        }

        /**
         * Converts all measurements to a Number[] in sorted order, regardless
         * of whether they're initially stored in an Array or Object.
         * 
         * @returns All measurements, sorted.
         */
        private getMeasurementsSorted(): number[] {
            var copy: number[],
                i: string;

            if (this.measurements.constructor === Array) {
                copy = [].slice.call((<number[]>this.measurements)).sort();
            } else {
                copy = [];

                for (i in this.measurements) {
                    if (this.measurements.hasOwnProperty(i)) {
                        if (typeof this.measurements[i] !== "undefined") {
                            copy[i] = this.measurements[i];
                        }
                    }
                }

                copy.sort();
            }

            if (this.numRecorded < this.maxKept) {
                copy.length = this.numRecorded;
            }

            return copy.sort();
        }
    }
}
