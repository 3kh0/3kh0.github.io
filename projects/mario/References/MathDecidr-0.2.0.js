var MathDecidr;
(function (MathDecidr_1) {
    "use strict";
    /**
     * A computation utility to automate running common equations with access
     * to a set of constant values.
     */
    var MathDecidr = (function () {
        /**
         * Initializes a new instance of the MathDecidr class.
         *
         * @param [settings]   Settings to be used for initialization.
         */
        function MathDecidr(settings) {
            if (settings === void 0) { settings = {}; }
            var i;
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
        MathDecidr.prototype.getConstants = function () {
            return this.constants;
        };
        /**
         * @param name   The name of a constant to return.
         * @returns The requested constant.
         */
        MathDecidr.prototype.getConstant = function (name) {
            return this.constants[name];
        };
        /**
         * @returns Stored equations with the internal members bound as
         *          their arguments.
         */
        MathDecidr.prototype.getEquations = function () {
            return this.equations;
        };
        /**
         * @returns The raw stored equations, unbound.
         */
        MathDecidr.prototype.getRawEquations = function () {
            return this.equationsRaw;
        };
        /**
         * @param name   The name of the equation to return.
         * @returns The equation under the given name.
         */
        MathDecidr.prototype.getEquation = function (name) {
            return this.equations[name];
        };
        /**
         * @param name   The name of the equation to return.
         * @returns The raw equation under the given name.
         */
        MathDecidr.prototype.getRawEquation = function (name) {
            return this.equationsRaw[name];
        };
        /* Simple additions
        */
        /**
         * Adds a constant of the given name and value.
         *
         * @param name   The name of the constant to add.
         * @param value   A value for the constant.
         */
        MathDecidr.prototype.addConstant = function (name, value) {
            this.constants[name] = value;
        };
        /**
         * Adds an equation Function under the given name.
         *
         * @param name   The name of the equation to add.
         * @param value   A value for the equation.
         */
        MathDecidr.prototype.addEquation = function (name, value) {
            this.equationsRaw[name] = value;
            this.equations[name] = value.bind(this, this.constants, this.equations);
        };
        /* Computations
        */
        /**
         * Runs a stored equation with any number of arguments, returning the result.
         *
         * @param name   The name of the equation to run.
         * @param args   Any arguments to pass to the equation.
         * @returns The result of the equation.
         */
        MathDecidr.prototype.compute = function (name) {
            var args = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                args[_i - 1] = arguments[_i];
            }
            return this.equations[name].apply(this, Array.prototype.slice.call(arguments, 1));
        };
        return MathDecidr;
    })();
    MathDecidr_1.MathDecidr = MathDecidr;
})(MathDecidr || (MathDecidr = {}));
