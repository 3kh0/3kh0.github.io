declare namespace MapScreenr {
    /**
     * Functions to compute new variable values, keyed by their variable's names.
     */
    export interface IVariableFunctions {
        [i: string]: Function;
    }

    export interface IMapScreenrSettings {
        /**
         * How wide the MapScreenr should be.
         */
        width: number;

        /**
         * How tall the MapScreenr should be.
         */
        height: number;

        /**
         * A mapping of Functions to generate member variables that should be
         * recomputed on screen change, keyed by variable name.
         */
        variables?: IVariableFunctions;

        /**
         * Arguments to be passed to variable Functions.
         */
        variableArgs?: any[];

        /**
         * Variables of any type may be added to the MapScreenr.
         */
        [i: string]: any;
    }

    /**
     * A simple container for Map attributes given by switching to an Area within 
     * that map. A bounding box of the current viewport is kept, along with a bag
     * of assorted variable values.
     */
    export interface IMapScreenr {
        /**
         * A listing of variable Functions to be calculated on screen resets.
         */
        variables: IVariableFunctions;

        /**
         * Arguments to be passed into variable computation Functions.
         */
        variableArgs: any[];

        /**
         * Top border measurement of the bounding box.
         */
        top: number;

        /**
         * Right border measurement of the bounding box.
         */
        right: number;

        /**
         * Bottom border measurement of the bounding box.
         */
        bottom: number;

        /**
         * Left border measurement of the bounding box.
         */
        left: number;

        /**
         * Constant horizontal midpoint of the bounding box, equal to (left + right) / 2.
         */
        middleX: number;

        /**
         * Constant vertical midpoint of the bounding box, equal to (top + bottom) / 2.
         */
        middleY: number;

        /**
         * Constant width of the bounding box.
         */
        width: number;

        /**
         * Constant height of the bounding box.
         */
        height: number;

        /**
         * Completely clears the MapScreenr for use in a new Area. Positioning is
         * reset to (0,0) and user-configured variables are recalculated.
         */
        clearScreen(): void;

        /**
         * Computes middleX as the midpoint between left and right.
         */
        setMiddleX(): void;

        /**
         * Computes middleY as the midpoint between top and bottom.
         */
        setMiddleY(): void;

        /**
         * Recalculates all variables by passing variableArgs to their Functions.
         */
        setVariables(): void;

        /**
         * Recalculates a variable by passing variableArgs to its Function.
         * 
         * @param name   The name of the variable to recalculate.
         * @param value   A new value for the variable instead of its Function's result.
         * @returns The new value of the variable.
         */
        setVariable(name: string, value?: any): any;

        /**
         * Shifts the MapScreenr horizontally and vertically via shiftX and shiftY.
         * 
         * @param dx   How far to scroll horizontally.
         * @param dy   How far to scroll vertically.
         */
        shift(dx: number, dy: number): void;

        /**
         * Shifts the MapScreenr horizontally by changing left and right by the dx.
         * 
         * @param dx   How far to scroll horizontally.
         */
        shiftX(dx: number): void;

        /**
         * Shifts the MapScreenr vertically by changing top and bottom by the dy.
         * 
         * @param dy   How far to scroll vertically.
         */
        shiftY(dy: number): void;

        /**
         * Any variable may be kept publically on a MapScreenr, keyed by name.
         */
        [i: string]: any;
    }
}


namespace MapScreenr {
    "use strict";

    /**
     * A simple container for Map attributes given by switching to an Area within 
     * that map. A bounding box of the current viewport is kept, along with a bag
     * of assorted variable values.
     */
    export class MapScreenr implements IMapScreenr {
        /**
         * A listing of variable Functions to be calculated on screen resets.
         */
        public variables: IVariableFunctions;

        /**
         * Arguments to be passed into variable computation Functions.
         */
        public variableArgs: any[];

        /**
         * Top border measurement of the bounding box.
         */
        public top: number;

        /**
         * Right border measurement of the bounding box.
         */
        public right: number;

        /**
         * Bottom border measurement of the bounding box.
         */
        public bottom: number;

        /**
         * Left border measurement of the bounding box.
         */
        public left: number;

        /**
         * Constant horizontal midpoint of the bounding box, equal to (left + right) / 2.
         */
        public middleX: number;

        /**
         * Constant vertical midpoint of the bounding box, equal to (top + bottom) / 2.
         */
        public middleY: number;

        /**
         * Constant width of the bounding box.
         */
        public width: number;

        /**
         * Constant height of the bounding box.
         */
        public height: number;

        /**
         * Resets the MapScreenr. All members of the settings argument are copied
         * to the MapScreenr itself, though only width and height are required.
         * 
         * @param {IMapScreenrSettings} settings
         */
        constructor(settings: IMapScreenrSettings) {
            if (typeof settings === "undefined") {
                throw new Error("No settings object given to MapScreenr.");
            }
            if (typeof settings.width === "undefined") {
                throw new Error("No width given to MapScreenr.");
            }
            if (typeof settings.height === "undefined") {
                throw new Error("No height given to MapScreenr.");
            }

            var name: string;

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
        clearScreen(): void {
            this.left = 0;
            this.top = 0;
            this.right = this.width;
            this.bottom = this.height;

            this.setMiddleX();
            this.setMiddleY();

            this.setVariables();
        }

        /**
         * Computes middleX as the midpoint between left and right.
         */
        setMiddleX(): void {
            this.middleX = (this.left + this.right) / 2;
        }

        /**
         * Computes middleY as the midpoint between top and bottom.
         */
        setMiddleY(): void {
            this.middleY = (this.top + this.bottom) / 2;
        }

        /**
         * Recalculates all variables by passing variableArgs to their Functions.
         */
        setVariables(): void {
            var i: string;

            for (i in this.variables) {
                if (this.variables.hasOwnProperty(i)) {
                    this.setVariable(i);
                }
            }
        }

        /**
         * Recalculates a variable by passing variableArgs to its Function.
         * 
         * @param name   The name of the variable to recalculate.
         * @param value   A new value for the variable instead of its Function's result.
         * @returns The new value of the variable.
         */
        setVariable(name: string, value?: any): any {
            this[name] = arguments.length === 1
                ? this.variables[name].apply(this, this.variableArgs)
                : value;
        }


        /* Element shifting
        */

        /**
         * Shifts the MapScreenr horizontally and vertically via shiftX and shiftY.
         * 
         * @param dx   How far to scroll horizontally.
         * @param dy   How far to scroll vertically.
         */
        shift(dx: number, dy: number): void {
            if (dx) {
                this.shiftX(dx);
            }

            if (dy) {
                this.shiftY(dy);
            }
        }

        /**
         * Shifts the MapScreenr horizontally by changing left and right by the dx.
         * 
         * @param dx   How far to scroll horizontally.
         */
        shiftX(dx: number): void {
            this.left += dx;
            this.right += dx;
        }

        /**
         * Shifts the MapScreenr vertically by changing top and bottom by the dy.
         * 
         * @param dy   How far to scroll vertically.
         */
        shiftY(dy: number): void {
            this.top += dy;
            this.bottom += dy;
        }

        /**
         * Any variable may be kept publically on a MapScreenr, keyed by name.
         */
        [i: string]: any;
    }
}
