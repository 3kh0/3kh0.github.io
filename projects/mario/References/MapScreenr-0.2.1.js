var MapScreenr;
(function (MapScreenr_1) {
    "use strict";
    /**
     * A simple container for Map attributes given by switching to an Area within
     * that map. A bounding box of the current viewport is kept, along with a bag
     * of assorted variable values.
     */
    var MapScreenr = (function () {
        /**
         * Resets the MapScreenr. All members of the settings argument are copied
         * to the MapScreenr itself, though only width and height are required.
         *
         * @param {IMapScreenrSettings} settings
         */
        function MapScreenr(settings) {
            if (typeof settings === "undefined") {
                throw new Error("No settings object given to MapScreenr.");
            }
            if (typeof settings.width === "undefined") {
                throw new Error("No width given to MapScreenr.");
            }
            if (typeof settings.height === "undefined") {
                throw new Error("No height given to MapScreenr.");
            }
            var name;
            for (name in settings) {
                if (settings.hasOwnProperty(name)) {
                    this[name] = settings[name];
                }
            }
            this.variables = settings.variables || {};
            this.variableArgs = settings.variableArgs || [];
        }
        /* State changes
        */
        /**
         * Completely clears the MapScreenr for use in a new Area. Positioning is
         * reset to (0,0) and user-configured variables are recalculated.
         */
        MapScreenr.prototype.clearScreen = function () {
            this.left = 0;
            this.top = 0;
            this.right = this.width;
            this.bottom = this.height;
            this.setMiddleX();
            this.setMiddleY();
            this.setVariables();
        };
        /**
         * Computes middleX as the midpoint between left and right.
         */
        MapScreenr.prototype.setMiddleX = function () {
            this.middleX = (this.left + this.right) / 2;
        };
        /**
         * Computes middleY as the midpoint between top and bottom.
         */
        MapScreenr.prototype.setMiddleY = function () {
            this.middleY = (this.top + this.bottom) / 2;
        };
        /**
         * Recalculates all variables by passing variableArgs to their Functions.
         */
        MapScreenr.prototype.setVariables = function () {
            var i;
            for (i in this.variables) {
                if (this.variables.hasOwnProperty(i)) {
                    this.setVariable(i);
                }
            }
        };
        /**
         * Recalculates a variable by passing variableArgs to its Function.
         *
         * @param name   The name of the variable to recalculate.
         * @param value   A new value for the variable instead of its Function's result.
         * @returns The new value of the variable.
         */
        MapScreenr.prototype.setVariable = function (name, value) {
            this[name] = arguments.length === 1
                ? this.variables[name].apply(this, this.variableArgs)
                : value;
        };
        /* Element shifting
        */
        /**
         * Shifts the MapScreenr horizontally and vertically via shiftX and shiftY.
         *
         * @param dx   How far to scroll horizontally.
         * @param dy   How far to scroll vertically.
         */
        MapScreenr.prototype.shift = function (dx, dy) {
            if (dx) {
                this.shiftX(dx);
            }
            if (dy) {
                this.shiftY(dy);
            }
        };
        /**
         * Shifts the MapScreenr horizontally by changing left and right by the dx.
         *
         * @param dx   How far to scroll horizontally.
         */
        MapScreenr.prototype.shiftX = function (dx) {
            this.left += dx;
            this.right += dx;
        };
        /**
         * Shifts the MapScreenr vertically by changing top and bottom by the dy.
         *
         * @param dy   How far to scroll vertically.
         */
        MapScreenr.prototype.shiftY = function (dy) {
            this.top += dy;
            this.bottom += dy;
        };
        return MapScreenr;
    })();
    MapScreenr_1.MapScreenr = MapScreenr;
})(MapScreenr || (MapScreenr = {}));
