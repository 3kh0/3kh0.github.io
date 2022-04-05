declare namespace ObjectMakr {
    /**
     * A tree representing class inheritances, where each key represents
     * a class, and its children inherit from that class.
     */
    export interface IClassInheritance {
        [i: string]: IClassInheritance;
    }

    /**
     * Properties for a class prototype, which may be of any type.
     */
    export interface IClassProperties {
        [i: string]: any;
    }

    /**
     * Listing of class Functions, keyed by name.
     */
    export interface IClassFunctions {
        [i: string]: IClassFunction;
    }

    /**
     * Root abstract definition for class Functions.
     */
    export interface IClassFunction {
        new ();
    }

    /**
     * Member callback for when an output onMake is a Function.
     */
    export interface IOnMakeFunction {
        (output: any, name: string, settings: any, defaults: any): any;
    }

    /**
     * Settings to initialize a new IObjectMakr.
     */
    export interface IObjectMakrSettings {
        /**
         * A sketch of class inheritance.
         */
        inheritance: IClassInheritance;

        /**
         * Properties for each class.
         */
        properties?: IClassProperties;

        /**
         * Whether a full property mapping should be made for each type.
         */
        doPropertiesFull?: boolean;

        /**
         * How propperties can be mapped from an Array to indices.
         */
        indexMap?: any[];

        /**
         * Optionally, a String index for each generated Object's Function to
         * be run when made.
         */
        onMake?: string;
    }

    /**
     * An factory for JavaScript classes that automates the process of 
     * setting constructors' prototypal inheritance. A sketch of class inheritance 
     * and a listing of properties for each class is taken in, and dynamically
     * accessible constructors keyed by String names are made available.
     */
    export interface IObjectMakr {
        /**
         * @returns The complete inheritance mapping.
         */
        getInheritance(): any;

        /**
         * @returns The complete properties mapping.
         */
        getProperties(): any;

        /**
         * @returns The properties for a particular class.
         */
        getPropertiesOf(title: string): any;

        /**
         * @returns Full properties, if doPropertiesFull is true.
         */
        getFullProperties(): any;

        /**
         * @returns Full properties for a particular class, if
         *          doPropertiesFull is true.
         */
        getFullPropertiesOf(title: string): any;

        /**
         * @returns The full mapping of class constructors.
         */
        getFunctions(): IClassFunctions;

        /**
         * @param name   The name of a class to retrieve.
         * @returns The constructor for the given class.
         */
        getFunction(name: string): IClassFunction;

        /**
         * @param type   The name of a class to check for.
         * @returns Whether that class exists.
         */
        hasFunction(name: string): boolean;

        /**
         * @returns The optional mapping of indices.
         */
        getIndexMap(): any[];

        /**
         * Creates a new instance of the specified type and returns it.
         * If desired, any settings are applied to it (deep copy using proliferate).
         * 
         * @param name   The name of the type to initialize a new instance of.
         * @param [settings]   Additional attributes to add to the new instance.
         * @returns A newly created instance of the specified type.
         */
        make(name: string, settings?: any): any;
    }
}


namespace ObjectMakr {
    "use strict";

    /**
     * An factory for JavaScript classes that automates the process of 
     * setting constructors' prototypal inheritance. A sketch of class inheritance 
     * and a listing of properties for each class is taken in, and dynamically
     * accessible constructors keyed by String names are made available.
     */
    export class ObjectMakr implements IObjectMakr {
        /**
         * The sketch of class inheritance.
         */
        private inheritance: IClassInheritance;

        /**
         * Properties for each class.
         */
        private properties: IClassProperties;

        /**
         * The actual Functions for the classes to be made.
         */
        private functions: IClassFunctions;

        /**
         * Whether a full property mapping should be made for each type.
         */
        private doPropertiesFull: boolean;

        /**
         * If doPropertiesFull is true, a version of properties that contains the
         * sum properties for each type (rather than missing inherited ones).
         */
        private propertiesFull: IClassProperties;

        /**
         * How properties can be mapped from an Array to indices.
         */
        private indexMap: any[];

        /**
         * Optionally, a String index for each generated Object's Function to
         * be run when made.
         */
        private onMake: string;

        /**
         * Initializes a new instance of the ObjectMakr class.
         * 
         * @param settings   Settings to be used for initialization.
         */
        constructor(settings: IObjectMakrSettings) {
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
        getInheritance(): any {
            return this.inheritance;
        }

        /**
         * @returns The complete properties mapping.
         */
        getProperties(): any {
            return this.properties;
        }

        /**
         * @returns The properties for a particular class.
         */
        getPropertiesOf(title: string): any {
            return this.properties[title];
        }

        /**
         * @returns Full properties, if doPropertiesFull is true.
         */
        getFullProperties(): any {
            return this.propertiesFull;
        }

        /**
         * @returns Full properties for a particular class, if
         *          doPropertiesFull is true.
         */
        getFullPropertiesOf(title: string): any {
            return this.doPropertiesFull ? this.propertiesFull[title] : undefined;
        }

        /**
         * @returns The full mapping of class constructors.
         */
        getFunctions(): IClassFunctions {
            return this.functions;
        }

        /**
         * @param name   The name of a class to retrieve.
         * @returns The constructor for the given class.
         */
        getFunction(name: string): IClassFunction {
            return this.functions[name];
        }

        /**
         * @param type   The name of a class to check for.
         * @returns Whether that class exists.
         */
        hasFunction(name: string): boolean {
            return this.functions.hasOwnProperty(name);
        }

        /**
         * @returns The optional mapping of indices.
         */
        getIndexMap(): any[] {
            return this.indexMap;
        }


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
        make(name: string, settings?: any): any {
            var output: any;

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
                (<IOnMakeFunction>output[this.onMake])(
                    output,
                    name,
                    settings,
                    (this.doPropertiesFull ? this.propertiesFull : this.properties)[name]);
            }

            return output;
        }


        /* Core parsing
        */

        /**
         * Parser that calls processPropertyArray on all properties given as arrays
         * 
         * @param properties   Type properties for classes to create.
         * @remarks Only call this if indexMap is given as an array
         */
        private processProperties(properties: any): void {
            var name: string;

            // For each of the given properties:
            for (name in properties) {
                if (properties.hasOwnProperty(name)) {
                    // If it's an Array, replace it with a mapped version
                    if (properties[name] instanceof Array) {
                        properties[name] = this.processPropertyArray(properties[name]);
                    }
                }
            }
        }

        /**
         * Creates an output properties object with the mapping shown in indexMap
         * 
         * @param properties   An Array with indiced versions of properties
         * @example
         *     this.indexMap = ["width", "height"];
         *     this.processPropertyArray([7, 14]);
         *     // { "width": 7, "height": 14 }
         */
        private processPropertyArray(properties: any[]): any {
            var output: any = {},
                i: number;

            // For each [i] in properties, set that property as under indexMap[i]
            for (i = properties.length - 1; i >= 0; --i) {
                output[this.indexMap[i]] = properties[i];
            }

            return output;
        }

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
        private processFunctions(base: any, parent: IClassFunction, parentName?: string): void {
            var name: string,
                ref: string;

            // For each name in the current object:
            for (name in base) {
                if (base.hasOwnProperty(name)) {
                    this.functions[name] = <IClassFunction>(new Function());

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
        }


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
        private proliferate(recipient: any, donor: any, noOverride?: boolean): void {
            var setting: any,
                i: string;

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
                } else {
                    // Regular primitives are easy to copy otherwise
                    recipient[i] = setting;
                }
            }

            return recipient;
        }
    }
}
