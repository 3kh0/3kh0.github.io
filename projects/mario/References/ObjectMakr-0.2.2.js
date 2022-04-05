var ObjectMakr;
(function (ObjectMakr_1) {
    "use strict";
    /**
     * An factory for JavaScript classes that automates the process of
     * setting constructors' prototypal inheritance. A sketch of class inheritance
     * and a listing of properties for each class is taken in, and dynamically
     * accessible constructors keyed by String names are made available.
     */
    var ObjectMakr = (function () {
        /**
         * Initializes a new instance of the ObjectMakr class.
         *
         * @param settings   Settings to be used for initialization.
         */
        function ObjectMakr(settings) {
            if (typeof settings === "undefined") {
                throw new Error("No settings object given to ObjectMakr.");
            }
            if (typeof settings.inheritance === "undefined") {
                throw new Error("No inheritance given to ObjectMakr.");
            }
            this.inheritance = settings.inheritance;
            this.properties = settings.properties || {};
            this.doPropertiesFull = settings.doPropertiesFull;
            this.indexMap = settings.indexMap;
            this.onMake = settings.onMake;
            this.functions = {};
            if (this.doPropertiesFull) {
                this.propertiesFull = {};
            }
            if (this.indexMap) {
                this.processProperties(this.properties);
            }
            this.processFunctions(this.inheritance, Object, "Object");
        }
        /* Simple gets
        */
        /**
         * @returns The complete inheritance mapping.
         */
        ObjectMakr.prototype.getInheritance = function () {
            return this.inheritance;
        };
        /**
         * @returns The complete properties mapping.
         */
        ObjectMakr.prototype.getProperties = function () {
            return this.properties;
        };
        /**
         * @returns The properties for a particular class.
         */
        ObjectMakr.prototype.getPropertiesOf = function (title) {
            return this.properties[title];
        };
        /**
         * @returns Full properties, if doPropertiesFull is true.
         */
        ObjectMakr.prototype.getFullProperties = function () {
            return this.propertiesFull;
        };
        /**
         * @returns Full properties for a particular class, if
         *          doPropertiesFull is true.
         */
        ObjectMakr.prototype.getFullPropertiesOf = function (title) {
            return this.doPropertiesFull ? this.propertiesFull[title] : undefined;
        };
        /**
         * @returns The full mapping of class constructors.
         */
        ObjectMakr.prototype.getFunctions = function () {
            return this.functions;
        };
        /**
         * @param name   The name of a class to retrieve.
         * @returns The constructor for the given class.
         */
        ObjectMakr.prototype.getFunction = function (name) {
            return this.functions[name];
        };
        /**
         * @param type   The name of a class to check for.
         * @returns Whether that class exists.
         */
        ObjectMakr.prototype.hasFunction = function (name) {
            return this.functions.hasOwnProperty(name);
        };
        /**
         * @returns The optional mapping of indices.
         */
        ObjectMakr.prototype.getIndexMap = function () {
            return this.indexMap;
        };
        /* Core usage
        */
        /**
         * Creates a new instance of the specified type and returns it.
         * If desired, any settings are applied to it (deep copy using proliferate).
         *
         * @param name   The name of the type to initialize a new instance of.
         * @param [settings]   Additional attributes to add to the new instance.
         * @returns A newly created instance of the specified type.
         */
        ObjectMakr.prototype.make = function (name, settings) {
            var output;
            // Make sure the type actually exists in Functions
            if (!this.functions.hasOwnProperty(name)) {
                throw new Error("Unknown type given to ObjectMakr: " + name);
            }
            // Create the new object, copying any given settings
            output = new this.functions[name]();
            if (settings) {
                this.proliferate(output, settings);
            }
            // onMake triggers are handled respecting doPropertiesFull.
            if (this.onMake && output[this.onMake]) {
                output[this.onMake](output, name, settings, (this.doPropertiesFull ? this.propertiesFull : this.properties)[name]);
            }
            return output;
        };
        /* Core parsing
        */
        /**
         * Parser that calls processPropertyArray on all properties given as arrays
         *
         * @param properties   Type properties for classes to create.
         * @remarks Only call this if indexMap is given as an array
         */
        ObjectMakr.prototype.processProperties = function (properties) {
            var name;
            // For each of the given properties:
            for (name in properties) {
                if (properties.hasOwnProperty(name)) {
                    // If it's an Array, replace it with a mapped version
                    if (properties[name] instanceof Array) {
                        properties[name] = this.processPropertyArray(properties[name]);
                    }
                }
            }
        };
        /**
         * Creates an output properties object with the mapping shown in indexMap
         *
         * @param properties   An Array with indiced versions of properties
         * @example
         *     this.indexMap = ["width", "height"];
         *     this.processPropertyArray([7, 14]);
         *     // { "width": 7, "height": 14 }
         */
        ObjectMakr.prototype.processPropertyArray = function (properties) {
            var output = {}, i;
            // For each [i] in properties, set that property as under indexMap[i]
            for (i = properties.length - 1; i >= 0; --i) {
                output[this.indexMap[i]] = properties[i];
            }
            return output;
        };
        /**
         * Recursive parser to generate each Function, starting from the base.
         *
         * @param base   An object whose keys are the names of Functions to
         *               made, and whose values are objects whose keys are
         *               for children that inherit from these Functions
         * @param parent   The parent class Function of the classes about to be made.
         * @param [parentName]   The name of the parent class to be inherited from,
         *                       if it is a generated one (and not Object itself).
         */
        ObjectMakr.prototype.processFunctions = function (base, parent, parentName) {
            var name, ref;
            // For each name in the current object:
            for (name in base) {
                if (base.hasOwnProperty(name)) {
                    this.functions[name] = (new Function());
                    // This sets the Function as inheriting from the parent
                    this.functions[name].prototype = new parent();
                    this.functions[name].prototype.constructor = this.functions[name];
                    // Add each property from properties to the Function prototype
                    for (ref in this.properties[name]) {
                        if (this.properties[name].hasOwnProperty(ref)) {
                            this.functions[name].prototype[ref] = this.properties[name][ref];
                        }
                    }
                    // If the entire property tree is being mapped, copy everything
                    // from both this and its parent to its equivalent
                    if (this.doPropertiesFull) {
                        this.propertiesFull[name] = {};
                        if (parentName) {
                            for (ref in this.propertiesFull[parentName]) {
                                if (this.propertiesFull[parentName].hasOwnProperty(ref)) {
                                    this.propertiesFull[name][ref] = this.propertiesFull[parentName][ref];
                                }
                            }
                        }
                        for (ref in this.properties[name]) {
                            if (this.properties[name].hasOwnProperty(ref)) {
                                this.propertiesFull[name][ref] = this.properties[name][ref];
                            }
                        }
                    }
                    this.processFunctions(base[name], this.functions[name], name);
                }
            }
        };
        /* Utilities
        */
        /**
         * Proliferates all members of the donor to the recipient recursively, as
         * a deep copy.
         *
         * @param recipient   An object receiving the donor's members.
         * @param donor   An object whose members are copied to recipient.
         * @param [noOverride]   If recipient properties may be overriden (by default, false).
         */
        ObjectMakr.prototype.proliferate = function (recipient, donor, noOverride) {
            var setting, i;
            // For each attribute of the donor:
            for (i in donor) {
                // If noOverride is specified, don't override if it already exists
                if (noOverride && recipient.hasOwnProperty(i)) {
                    continue;
                }
                // If it's an object, recurse on a new version of it
                setting = donor[i];
                if (typeof setting === "object") {
                    if (!recipient.hasOwnProperty(i)) {
                        recipient[i] = new setting.constructor();
                    }
                    this.proliferate(recipient[i], setting, noOverride);
                }
                else {
                    // Regular primitives are easy to copy otherwise
                    recipient[i] = setting;
                }
            }
            return recipient;
        };
        return ObjectMakr;
    })();
    ObjectMakr_1.ObjectMakr = ObjectMakr;
})(ObjectMakr || (ObjectMakr = {}));
