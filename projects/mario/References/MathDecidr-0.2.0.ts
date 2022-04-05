declare namespace MathDecidr {
    /**
     * Useful constants a MathDecidr may use in equations.
     */
    export interface IConstants {
        [i: string]: any;
    }

    /**
     * A calculation Function.
     * 
     * @param constants   Useful constants from a MathDecidr.
     * @param equations   Other calculation Functions stored in the MathDecidr.
     * @param args   Any other arguments to pass to the equation.
     */
    export interface IEquation {
        (constants: IConstants, equations: IEquationContainer, ...args: any[]): any;
    }

    /**
     * A collection of equations, keyed by name.
     */
    export interface IEquationContainer {
        [i: string]: IEquation;
    }

    /**
     * Settings to initialize a new IMathDecidr.
     */
    export interface IMathDecidrSettings {
        /**
         * Constants the MathDecidr may use in equations.
         */
        constants?: any;

        /**
         * Calculation Functions, keyed by name
         */
        equations?: IEquationContainer;
    }

    /**
     * A computation utility to automate running common equations with access
     * to a set of constant values.
     */
    export interface IMathDecidr {
        /**
         * @returns Useful constants the MathDecidr may use in equations.
         */
        getConstants(): any;

        /**
         * @param name   The name of a constant to return.
         * @returns The requested constant.
         */
        getConstant(name: string): any;

        /**
         * @returns Stored equations with the internal members bound as 
         *          their arguments.
         */
        getEquations(): IEquationContainer;

        /**
         * @returns The raw stored equations, unbound.
         */
        getRawEquations(): IEquationContainer;

        /**
         * @param name   The name of the equation to return.
         * @returns The equation under the given name.
         */
        getEquation(name: string): IEquation;

        /**
         * @param name   The name of the equation to return.
         * @returns The raw equation under the given name.
         */
        getRawEquation(name: string): IEquation;

        /**
         * Adds a constant of the given name and value.
         * 
         * @param name   The name of the constant to add.
         * @param value   A value for the constant.
         */
        addConstant(name: string, value: any): void;

        /**
         * Adds an equation Function under the given name.
         * 
         * @param name   The name of the equation to add.
         * @param value   A value for the equation.
         */
        addEquation(name: string, value: IEquation): void;

        /**
         * Runs a stored equation with any number of arguments, returning the result.
         * 
         * @param name   The name of the equation to run.
         * @param args   Any arguments to pass to the equation.
         */
        compute(name: string, ...args: any[]): any;
    }
}


namespace MathDecidr {
    "use strict";

    /**
     * A computation utility to automate running common equations with access
     * to a set of constant values.
     */
    export class MathDecidr implements IMathDecidr {
        /**
         * Useful constants the MathDecidr may use in equations.
         */
        private constants: any;

        /**
         * Stored equations users and other equations may access, with the internal
         * members bound as their arguments.
         */
        private equations: IEquationContainer;

        /**
         * The raw equations, unbound.
         */
        private equationsRaw: IEquationContainer;

        /**
         * Initializes a new instance of the MathDecidr class.
         * 
         * @param [settings]   Settings to be used for initialization.
         */
        constructor(settings: IMathDecidrSettings = {}) {
            var i: string;

            this.constants = settings.constants || {};
            this.equations = {};
            this.equationsRaw = settings.equations || {};

            if (this.equationsRaw) {
                for (i in this.equationsRaw) {
                    if (this.equationsRaw.hasOwnProperty(i)) {
                        this.addEquation(i, this.equationsRaw[i]);
                    }
                }
            }
        }


        /* Simple gets
        */

        /**
         * @returns Useful constants the MathDecidr may use in equations.
         */
        getConstants(): any {
            return this.constants;
        }

        /**
         * @param name   The name of a constant to return.
         * @returns The requested constant.
         */
        getConstant(name: string): any {
            return this.constants[name];
        }

        /**
         * @returns Stored equations with the internal members bound as 
         *          their arguments.
         */
        getEquations(): IEquationContainer {
            return this.equations;
        }

        /**
         * @returns The raw stored equations, unbound.
         */
        getRawEquations(): IEquationContainer {
            return this.equationsRaw;
        }

        /**
         * @param name   The name of the equation to return.
         * @returns The equation under the given name.
         */
        getEquation(name: string): IEquation {
            return this.equations[name];
        }

        /**
         * @param name   The name of the equation to return.
         * @returns The raw equation under the given name.
         */
        getRawEquation(name: string): IEquation {
            return this.equationsRaw[name];
        }


        /* Simple additions
        */

        /**
         * Adds a constant of the given name and value.
         * 
         * @param name   The name of the constant to add.
         * @param value   A value for the constant.
         */
        addConstant(name: string, value: any): void {
            this.constants[name] = value;
        }

        /**
         * Adds an equation Function under the given name.
         * 
         * @param name   The name of the equation to add.
         * @param value   A value for the equation.
         */
        addEquation(name: string, value: IEquation): void {
            this.equationsRaw[name] = value;
            this.equations[name] = value.bind(this, this.constants, this.equations);
        }


        /* Computations
        */

        /**
         * Runs a stored equation with any number of arguments, returning the result.
         * 
         * @param name   The name of the equation to run.
         * @param args   Any arguments to pass to the equation.
         * @returns The result of the equation.
         */
        compute(name: string, ...args: any[]): any {
            return this.equations[name].apply(this, Array.prototype.slice.call(arguments, 1));
        }
    }
}
