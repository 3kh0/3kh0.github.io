var FPSAnalyzr;
(function (FPSAnalyzr_1) {
    "use strict";
    /**
     * A general utility for obtaining and analyzing framerate measurements. The
     * most recent measurements are kept up to a certain point (either an infinite
     * number or a set amount). Options for analyzing the data such as getting the
     * mean, median, extremes, etc. are available.
     */
    var FPSAnalyzr = (function () {
        /**
         * Initializes a new instance of the FPSAnalyzr class.
         *
         * @param [settings]
         */
        function FPSAnalyzr(settings) {
            if (settings === void 0) { settings = {}; }
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
        FPSAnalyzr.prototype.measure = function (time) {
            if (time === void 0) { time = this.getTimestamp(); }
            if (this.timeCurrent) {
                this.addFPS(1000 / (time - this.timeCurrent));
            }
            this.timeCurrent = time;
        };
        /**
         * Adds an FPS measurement to measurements, and increments the associated
         * count variables.
         *
         * @param fps   An FPS calculated as the difference between two timestamps.
         */
        FPSAnalyzr.prototype.addFPS = function (fps) {
            this.ticker = (this.ticker += 1) % this.maxKept;
            this.measurements[this.ticker] = fps;
            this.numRecorded += 1;
        };
        /* Gets
        */
        /**
         * @returns The number of FPS measurements to keep.
         */
        FPSAnalyzr.prototype.getMaxKept = function () {
            return this.maxKept;
        };
        /**
         * @returns The actual number of FPS measurements currently known.
         */
        FPSAnalyzr.prototype.getNumRecorded = function () {
            return this.numRecorded;
        };
        /**
         * @returns The most recent performance.now timestamp.
         */
        FPSAnalyzr.prototype.getTimeCurrent = function () {
            return this.timeCurrent;
        };
        /**
         * @returns The current position in measurements.
         */
        FPSAnalyzr.prototype.getTicker = function () {
            return this.ticker;
        };
        /**
         * Get function for a copy of the measurements listing (if the number of
         * measurements is less than the max, that size is used)
         *
         * @returns A Number[] of the most recent FPS measurements.
         */
        FPSAnalyzr.prototype.getMeasurements = function () {
            var fpsKeptReal = Math.min(this.maxKept, this.numRecorded), copy, i;
            if (isFinite(this.maxKept)) {
                copy = new Array(fpsKeptReal);
            }
            else {
                copy = {};
                copy.length = fpsKeptReal;
            }
            for (i = fpsKeptReal - 1; i >= 0; --i) {
                copy[i] = this.measurements[i];
            }
            return copy;
        };
        /**
         * Get function for a copy of the measurements listing, but with the FPS
         * measurements transformed back into time differences
         *
         * @returns A container of the most recent FPS time differences.
         */
        FPSAnalyzr.prototype.getDifferences = function () {
            var copy = this.getMeasurements(), i;
            for (i = copy.length - 1; i >= 0; --i) {
                copy[i] = 1000 / copy[i];
            }
            return copy;
        };
        /**
         * @returns The average recorded FPS measurement.
         */
        FPSAnalyzr.prototype.getAverage = function () {
            var total = 0, max = Math.min(this.maxKept, this.numRecorded), i;
            for (i = max - 1; i >= 0; --i) {
                total += this.measurements[i];
            }
            return total / max;
        };
        /**
         * @returns The median recorded FPS measurement.
         * @remarks This is O(n*log(n)), where n is the size of the history,
         *          as it creates a copy of the history and sorts it.
         */
        FPSAnalyzr.prototype.getMedian = function () {
            var copy = this.getMeasurementsSorted(), fpsKeptReal = copy.length, fpsKeptHalf = Math.floor(fpsKeptReal / 2);
            if (copy.length % 2 === 0) {
                return copy[fpsKeptHalf];
            }
            else {
                return (copy[fpsKeptHalf - 2] + copy[fpsKeptHalf]) / 2;
            }
        };
        /**
         * @returns Array containing the lowest and highest recorded FPS
         *          measurements, in that order.
         */
        FPSAnalyzr.prototype.getExtremes = function () {
            var lowest = this.measurements[0], highest = lowest, max = Math.min(this.maxKept, this.numRecorded), fps, i;
            for (i = max - 1; i >= 0; --i) {
                fps = this.measurements[i];
                if (fps > highest) {
                    highest = fps;
                }
                else if (fps < lowest) {
                    lowest = fps;
                }
            }
            return [lowest, highest];
        };
        /**
         * @returns The range of recorded FPS measurements.
         */
        FPSAnalyzr.prototype.getRange = function () {
            var extremes = this.getExtremes();
            return extremes[1] - extremes[0];
        };
        /**
         * Converts all measurements to a Number[] in sorted order, regardless
         * of whether they're initially stored in an Array or Object.
         *
         * @returns All measurements, sorted.
         */
        FPSAnalyzr.prototype.getMeasurementsSorted = function () {
            var copy, i;
            if (this.measurements.constructor === Array) {
                copy = [].slice.call(this.measurements).sort();
            }
            else {
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
        };
        return FPSAnalyzr;
    })();
    FPSAnalyzr_1.FPSAnalyzr = FPSAnalyzr;
})(FPSAnalyzr || (FPSAnalyzr = {}));
