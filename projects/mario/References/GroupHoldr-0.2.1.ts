declare namespace GroupHoldr {
    /**
     * An Object group containing objects of type T.
     * 
     * @param T   The type of values contained within the group.
     */
    export interface IGroupHoldrObjectGroup<T> {
        [i: string]: T;
    }

    /**
     * Stored object groups, keyed by name.
     */
    export interface IGroupHoldrGroups<T> {
        [i: string]: IGroupHoldrObjectGroup<T> | T[];
    }

    /**
     * Types for stored object groups, as Array or Object.
     */
    export interface IGroupHoldrTypesListing {
        [i: string]: (...args: any[]) => void;
    }

    /**
     * Abstract parent interface of all group Functions.
     */
    export type IGroupHoldrFunction = Function

    /**
     * Stores the given group internally.
     * 
     * @param value   The new group to store.
     */
    export interface IGroupHoldrSetGroupFunction<T> extends IGroupHoldrFunction {
        (value: IGroupHoldrObjectGroup<T> | T[]): void;
    }

    /**
     * @returns One of the stored groups.
     */
    export interface IGroupHoldrGetGroupFunction<T> extends IGroupHoldrFunction {
        (): IGroupHoldrObjectGroup<T> | T[];
    }

    /**
     * Sets a value in a group.
     *
     * @param key   The key to store the value under.
     * @param [value]   The value to store in the group.
     */
    export interface IGroupHoldrSetFunction extends IGroupHoldrFunction {
        (key: string | number, value?: any): void;
    }

    /**
     * Retrieves a value from a group.
     * 
     * @param key   The key the value is stored under.
     */
    export interface IGroupHoldrGetFunction extends IGroupHoldrFunction {
        (key: string | number): void;
    }

    /**
     * Adds a value to a group.
     * 
     * @param value   The value to store in the group.
     * @param [key]   The key to store the value under.
     * @remarks If the group is an Array, not providing a key will use Array::push.
     */
    export interface IGroupHoldrAddFunction extends IGroupHoldrFunction {
        (value: any, key?: string | number): void;
    }

    /**
     * Adds a value to an Array group.
     * 
     * @param value   The value to store in the group.
     * @param [key]   The index to store the value under.
     */
    export interface IGroupHoldrArrayAddFunction extends IGroupHoldrAddFunction {
        (value: any, key?: number): void;
    }

    /**
     * Adds a value to an Object group.
     * 
     * @param value   The value to store in the group.
     * @param key   The key to store the value under.
     */
    export interface IGroupHoldrObjectAddFunction extends IGroupHoldrAddFunction {
        (value: any, key: string): void;
    }

    /**
     * Deletes a value from a group.
     * 
     * @param [arg1]   Either the value (Arrays) or the key (Objects).
     * @param [arg2]   Optionally, for Array groups, the value's index.
     */
    export interface IGroupHoldrDeleteFunction extends IGroupHoldrFunction {
        (arg1?: any, arg2?: any): void;
    }

    /**
     * Deletes a value from an Array group.
     * 
     * @param [value]   The value to delete, if index is not provided.
     * @param [index]   The index of the value, to bypass Array::indexOf.
     */
    export interface IGroupHoldrArrayDeleteFunction extends IGroupHoldrDeleteFunction {
        (value?: any, index?: number): void;
    }

    /**
     * Deletes a value from an Object group.
     *
     * @param key   The key of the value to delete.
     */
    export interface IGroupHoldrObjectDeleteFunction extends IGroupHoldrDeleteFunction {
        (key: string): void;
    }

    /**
     * Storage for Function groups of a single group, keyed by their operation.
     */
    export interface IGroupHoldrFunctionGroup<T extends IGroupHoldrFunction> {
        [i: string]: T;
    }

    /**
     * Storage for Function groups, keyed by their operation.
     */
    export interface IGroupHoldrFunctionGroups {
        /**
         * Setter Functions for each group, keyed by their group name.
         */
        setGroup: IGroupHoldrFunctionGroup<IGroupHoldrSetGroupFunction<any>>;
        
        /**
         * Getter Functions for each group, keyed by their group name.
         */
        getGroup: IGroupHoldrFunctionGroup<IGroupHoldrGetGroupFunction<any>>;
        
        /**
         * Value setter Functions for each group, keyed by their group name.
         */
        set: IGroupHoldrFunctionGroup<IGroupHoldrSetFunction>;
        
        /**
         * Value getter Functions for each group, keyed by their group name.
         */
        get: IGroupHoldrFunctionGroup<IGroupHoldrGetFunction>;
        
        /**
         * Value adder Functions for each group, keyed by their group name.
         */
        add: IGroupHoldrFunctionGroup<IGroupHoldrAddFunction>;
        
        /**
         * Valuer deleter Functions for each group, keyed by their group name.
         */
        delete: IGroupHoldrFunctionGroup<IGroupHoldrDeleteFunction>;
    }

    /**
     * Settings to initialize a new IGroupHoldr.
     */
    export interface IGroupHoldrSettings {
        /**
         * The names of groups to be creaed.
         */
        groupNames: string[];

        /**
         * The mapping of group types. This can be a single String ("Array" or
         * "Object") to set each one, or an Object mapping each groupName to 
         * a different String (type).
         */
        groupTypes: string | {
            [i: string]: string;
        };
    }

    /**
     * A general storage container for values in keyed Arrays and/or Objects.
     * Manipulation utlities are provided for adding, removing, switching, and
     * applying methods to values.
     */
    export interface IGroupHoldr {
        /**
         * @returns The mapping of operation types to each group's Functions.
         */
        getFunctions(): IGroupHoldrFunctionGroups;

        /**
         * @returns The stored object groups, keyed by name.
         */
        getGroups(): IGroupHoldrGroups<any>;

        /**
         * @param name   The name of the group to retrieve.
         * @returns The group stored under the given name.
         */
        getGroup(name: string): { [i: string]: any } | any[];

        /**
         * @returns Names of the stored object groups.
         */
        getGroupNames(): string[];

        /**
         * Switches an object from one group to another.
         * 
         * @param value   The value being moved from one group to another.
         * @param groupNameOld   The name of the group to move out of.
         * @param groupNameNew   The name of the group to move into.
         * @param [keyOld]   What key the value used to be under (required if
         *                   the old group is an Object).
         * @param [keyNew]   Optionally, what key the value will now be under
         *                   (required if the new group is an Object).
         */
        switchMemberGroup(value: any, groupNameOld: string, groupNameNew: string, keyOld?: string | number, keyNew?: string | number): void;

        /**
         * Calls a Function for each group, with that group as the first argument.
         * Extra arguments may be passed in an array after scope and func, as in
         * Function.apply's standard.
         * 
         * @param scope   An optional scope to call this from (if falsy, defaults
         *                to the calling GroupHoldr).
         * @param func   A Function to apply to each group.
         * @param [args]   Optionally, arguments to pass in after each group.
         */
        applyAll(scope: any, func: (...args: any[]) => any, args?: any[]): void;

        /**
         * Calls a function for each member of each group. Extra arguments may be 
         * passed in an array after scope and func, as in Function.apply's standard.
         * 
         * @param scope   An optional scope to call this from (if falsy, defaults 
         *                to the calling GroupHoldr).
         * @param func   A Function to apply to each group.
         * @param [args]   Optionally, arguments to pass in after each group.
         */
        applyOnAll(scope: any, func: (...args: any[]) => any, args?: any[]): void;

        /**
         * Calls a Function for each group, with that group as the first argument.
         * Extra arguments may be passed after scope and func natively, as in 
         * Function.call's standard.
         * 
         * @param scope   An optional scope to call this from (if falsy, 
         *                defaults to this).
         * @param func   A Function to apply to each group.
         */
        callAll(scope: any, func: (...args: any[]) => any, ...args: any[]): void;

        /**
         * Calls a function for each member of each group. Extra arguments may be
         * passed after scope and func natively, as in Function.call's standard.
         * 
         * @param scope   An optional scope to call this from (if falsy, 
         *                defaults to this).
         * @param func   A Function to apply to each group member.
         */
        callOnAll(scope: any, func: (...args: any[]) => any, ...args: any[]): void;

        /**
         * Clears each Array by setting its length to 0.
         */
        clearArrays(): void;
    }
}


namespace GroupHoldr {
    "use strict";

    /**
     * A general storage container for values in keyed Arrays and/or Objects.
     * Manipulation utlities are provided for adding, removing, switching, and
     * applying methods to values.
     */
    export class GroupHoldr {
        /**
         * Stored object groups, keyed by name.
         */
        private groups: IGroupHoldrGroups<any>;

        /**
         * Mapping of "add", "delete", "get", and "set" keys to a listing of the
         * appropriate Functions for each group.
         */
        private functions: IGroupHoldrFunctionGroups;

        /**
         * Names of the stored object groups.
         */
        private groupNames: string[];

        /**
         * Types for each stored object group, as Array or Object.
         */
        private groupTypes: IGroupHoldrTypesListing;

        /**
         * The names of each group's type, as "Array" or "Object".
         */
        private groupTypeNames: any;

        /**
         * Initializes a new instance of the GroupHoldr class.
         * 
         * @param settings   Settings to be used for initialization.
         */
        constructor(settings: IGroupHoldrSettings) {
            if (typeof settings === "undefined") {
                throw new Error("No settings object given to GroupHoldr.");
            }
            if (typeof settings.groupNames === "undefined") {
                throw new Error("No groupNames given to GroupHoldr.");
            }
            if (typeof settings.groupTypes === "undefined") {
                throw new Error("No groupTypes given to GroupHoldr.");
            }

            // These functions containers are filled in setGroupNames 
            this.functions = {
                "setGroup": {},
                "getGroup": {},
                "set": {},
                "get": {},
                "add": {},
                "delete": {}
            };
            this.setGroupNames(settings.groupNames, settings.groupTypes);
        }


        /* Simple gets
        */

        /**
         * @returns The mapping of operation types to each group's Functions.
         */
        getFunctions(): IGroupHoldrFunctionGroups {
            return this.functions;
        }

        /**
         * @returns The stored object groups, keyed by name.
         */
        getGroups(): IGroupHoldrGroups<any> {
            return this.groups;
        }

        /**
         * @param name   The name of the group to retrieve.
         * @returns The group stored under the given name.
         */
        getGroup(name: string): { [i: string]: any } | any[] {
            return this.groups[name];
        }

        /**
         * @returns Names of the stored object groups.
         */
        getGroupNames(): string[] {
            return this.groupNames;
        }


        /* Group/ordering manipulators
        */

        /**
         * Switches an object from one group to another.
         * 
         * @param value   The value being moved from one group to another.
         * @param groupNameOld   The name of the group to move out of.
         * @param groupNameNew   The name of the group to move into.
         * @param [keyOld]   What key the value used to be under (required if
         *                   the old group is an Object).
         * @param [keyNew]   Optionally, what key the value will now be under
         *                   (required if the new group is an Object).
         */
        switchMemberGroup(
            value: any,
            groupNameOld: string,
            groupNameNew: string,
            keyOld?: string | number,
            keyNew?: string | number): void {
            var groupOld: any = this.groups[groupNameOld];

            if (groupOld.constructor === Array) {
                this.functions.delete[groupNameOld](value, keyOld);
            } else {
                this.functions.delete[groupNameOld](keyOld);
            }

            this.functions.add[groupNameNew](value, keyNew);
        }

        /**
         * Calls a Function for each group, with that group as the first argument.
         * Extra arguments may be passed in an array after scope and func, as in
         * Function.apply's standard.
         * 
         * @param scope   An optional scope to call this from (if falsy, defaults
         *                to the calling GroupHoldr).
         * @param func   A Function to apply to each group.
         * @param [args]   Optionally, arguments to pass in after each group.
         */
        applyAll(scope: any, func: (...args: any[]) => any, args: any[] = undefined): void {
            var i: number;

            if (!args) {
                args = [undefined];
            } else {
                args.unshift(undefined);
            }

            if (!scope) {
                scope = this;
            }

            for (i = this.groupNames.length - 1; i >= 0; i -= 1) {
                args[0] = this.groups[this.groupNames[i]];
                func.apply(scope, args);
            }

            args.shift();
        }

        /**
         * Calls a function for each member of each group. Extra arguments may be 
         * passed in an array after scope and func, as in Function.apply's standard.
         * 
         * @param scope   An optional scope to call this from (if falsy, defaults 
         *                to the calling GroupHoldr).
         * @param func   A Function to apply to each group.
         * @param [args]   Optionally, arguments to pass in after each group.
         */
        applyOnAll(scope: any, func: (...args: any[]) => any, args: any[] = undefined): void {
            var group: any,
                i: number,
                j: any;

            if (!args) {
                args = [undefined];
            } else {
                args.unshift(undefined);
            }

            if (!scope) {
                scope = this;
            }

            for (i = this.groupNames.length - 1; i >= 0; i -= 1) {
                group = this.groups[this.groupNames[i]];

                if (group instanceof Array) {
                    for (j = 0; j < group.length; j += 1) {
                        args[0] = group[j];
                        func.apply(scope, args);
                    }
                } else {
                    for (j in group) {
                        if (group.hasOwnProperty(j)) {
                            args[0] = group[j];
                            func.apply(scope, args);
                        }
                    }
                }
            }
        }

        /**
         * Calls a Function for each group, with that group as the first argument.
         * Extra arguments may be passed after scope and func natively, as in 
         * Function.call's standard.
         * 
         * @param scope   An optional scope to call this from (if falsy, 
         *                defaults to this).
         * @param func   A Function to apply to each group.
         */
        callAll(scope: any, func: (...args: any[]) => any): void {
            var args: any[] = Array.prototype.slice.call(arguments, 1),
                i: number;

            if (!scope) {
                scope = this;
            }

            for (i = this.groupNames.length - 1; i >= 0; i -= 1) {
                args[0] = this.groups[this.groupNames[i]];
                func.apply(scope, args);
            }
        }

        /**
         * Calls a function for each member of each group. Extra arguments may be
         * passed after scope and func natively, as in Function.call's standard.
         * 
         * @param scope   An optional scope to call this from (if falsy, 
         *                defaults to this).
         * @param func   A Function to apply to each group member.
         */
        callOnAll(scope: any, func: (...args: any[]) => any): void {
            var args: any[] = Array.prototype.slice.call(arguments, 1),
                group: any,
                i: number,
                j: any;

            if (!scope) {
                scope = this;
            }

            for (i = this.groupNames.length - 1; i >= 0; i -= 1) {
                group = this.groups[this.groupNames[i]];

                if (group instanceof Array) {
                    for (j = 0; j < group.length; j += 1) {
                        args[0] = group[j];
                        func.apply(scope, args);
                    }
                } else {
                    for (j in group) {
                        if (group.hasOwnProperty(j)) {
                            args[0] = group[j];
                            func.apply(scope, args);
                        }
                    }
                }
            }
        }

        /**
         * Clears each Array by setting its length to 0.
         */
        clearArrays(): void {
            var group: any,
                i: number;

            for (i = this.groupNames.length - 1; i >= 0; i -= 1) {
                group = this.groups[this.groupNames[i]];

                if (group instanceof Array) {
                    group.length = 0;
                }
            }
        }


        /* Core setup logic
        */

        /** 
         * Meaty function to reset, given an Array of names and an object of 
         * types. Any pre-existing Functions are cleared, and new ones are added 
         * as member objects and to this.functions.
         * 
         * @param names   An array of names of groupings to be made
         * @param types   An mapping of the function types of
         *                the names given in names. This may also be taken
         *                in as a String, to be converted to an Object.
         */
        private setGroupNames(names: string[], types: string | any): void {
            var scope: GroupHoldr = this,
                typeFunc: any,
                typeName: any;

            // If there already were group names, clear them
            if (this.groupNames) {
                this.clearFunctions();
            }

            // Reset the group types and type names, to be filled next
            this.groupNames = names;
            this.groupTypes = {};
            this.groupTypeNames = {};

            // If groupTypes is an object, set custom group types for everything
            if (types.constructor === Object) {
                this.groupNames.forEach(function (name: string): void {
                    scope.groupTypes[name] = scope.getTypeFunction(types[name]);
                    scope.groupTypeNames[name] = scope.getTypeName(types[name]);
                });
            } else {
                // Otherwise assume everything uses the same one, such as from a String
                typeFunc = this.getTypeFunction(types);
                typeName = this.getTypeName(types);

                this.groupNames.forEach(function (name: string): void {
                    scope.groupTypes[name] = typeFunc;
                    scope.groupTypeNames[name] = typeName;
                });
            }

            // Create the containers, and set the modifying functions
            this.setGroups();
            this.createFunctions();
        }

        /**
         * Removes any pre-existing "set", "get", etc. functions.
         */
        private clearFunctions(): void {
            this.groupNames.forEach(function (name: string): void {
                // Delete member variable functions
                delete this["set" + name + "Group"];
                delete this["get" + name + "Group"];
                delete this["set" + name];
                delete this["get" + name];
                delete this["add" + name];
                delete this["delete" + name];

                // Delete functions under .functions by making each type a new {}
                this.functions.setGroup = {};
                this.functions.getGroup = {};
                this.functions.set = {};
                this.functions.get = {};
                this.functions.add = {};
                this.functions.delete = {};
            });
        }

        /**
         * Resets groups to an empty Object, and fills it with a new groupType for
         * each name in groupNames.
         */
        private setGroups(): void {
            var scope: GroupHoldr = this;

            this.groups = {};
            this.groupNames.forEach(function (name: string): void {
                scope.groups[name] = new scope.groupTypes[name]();
            });
        }

        /**
         * Calls the Function creators for each name in groupNames.
         */
        private createFunctions(): void {
            var groupName: string,
                i: number;

            for (i = 0; i < this.groupNames.length; i += 1) {
                groupName = this.groupNames[i];

                this.createFunctionSetGroup(groupName);
                this.createFunctionGetGroup(groupName);
                this.createFunctionSet(groupName);
                this.createFunctionGet(groupName);
                this.createFunctionAdd(groupName);
                this.createFunctionDelete(groupName);
            }
        }


        /* Function generators
        */

        /**
         * Creates a setGroup Function under this and functions.setGroup.
         * 
         * @param name   The name of the group, from groupNames.
         */
        private createFunctionSetGroup(name: string): void {
            var scope: GroupHoldr = this;

            /**
             * Sets the value of the group referenced by the name.
             * 
             * @param value   The new value for the group, which should be 
             *                the same type as the group (Array or Object).
             */
            this.functions.setGroup[name] = (<any>this)["set" + name + "Group"] = function (value: any | any[]): void {
                scope.groups[name] = value;
            };
        }

        /**
         * Creates a getGroup Function under this and functions.getGroup.
         * 
         * @param name   The name of the group, from groupNames.
         */
        private createFunctionGetGroup(name: string): void {
            var scope: GroupHoldr = this;

            /**
             * @param key   The String key that references the group.
             * @returns The group referenced by the given key.
             */
            this.functions.getGroup[name] = (<any>this)["get" + name + "Group"] = function (): any | any[] {
                return scope.groups[name];
            };
        }

        /**
         * Creates a set Function under this and functions.set.
         * 
         * @param name   The name of the group, from groupNames.
         */
        private createFunctionSet(name: string): void {
            /**
             * Sets a value contained within the group.
             * 
             * @param key   The key referencing the value to obtain. This 
             *              should be a Number if the group is an Array, or
             *              a String if the group is an Object.
             * @param value   The value to be contained within the group.
             */
            this.functions.set[name] = (<any>this)["set" + name] = function (key: string | number, value: any = undefined): void {
                this.groups[name][<string>key] = value;
            };
        }

        /**
         * Creates a get<type> function under this and functions.get
         * 
         * @param name   The name of the group, from groupNames.
         */
        private createFunctionGet(name: string): void {
            /**
             * Gets the value within a group referenced by the given key.
             * 
             * @param  key   The key referencing the value to obtain. This 
             *               should be a Number if the group is an Array, or
             *               a String if the group is an Object.
             * @param value   The value contained within the group.
             */
            this.functions.get[<string>name] = this["get" + name] = function (key: string | number): void {
                return this.groups[name][<string>key];
            };
        }

        /**
         * Creates an add function under this and functions.add.
         * 
         * @param name   The name of the group, from groupNames.
         */
        private createFunctionAdd(name: string): void {
            var group: any = this.groups[name];

            if (this.groupTypes[name] === Object) {
                /**
                 * Adds a value to the group, referenced by the given key.
                 * 
                 * @param key   The String key to reference the value to be
                 *              added.
                 * @param value   The value to be added to the group.
                 */
                this.functions.add[name] = this["add" + name] = function (value: any, key: string): void {
                    group[key] = value;
                };
            } else {
                /**
                 * Adds a value to the group, referenced by the given key.
                 * 
                 * @param value   The value to be added to the group.
                 */
                this.functions.add[name] = this["add" + name] = function (value: any, key?: number): void {
                    if (key !== undefined) {
                        group[key] = value;
                    } else {
                        group.push(value);
                    }
                };
            }
        }

        /**
         * Creates a delete function under this and functions.delete.
         * 
         * @param name   The name of the group, from groupNames.
         */
        private createFunctionDelete(name: string): void {
            var group: any = this.groups[name];

            if (this.groupTypes[name] === Object) {
                /**
                 * Deletes a value from the group, referenced by the given key.
                 * 
                 * @param key   The String key to reference the value to be
                 *              deleted.
                 */
                this.functions.delete[name] = this["delete" + name] = function (key: string): void {
                    delete group[key];
                };
            } else {
                /**
                 * Deletes a value from the group, referenced by the given key.
                 * 
                 * @param value The value to be deleted.
                 */
                this.functions.delete[name] = this["delete" + name] = function (value: any, index: number = group.indexOf(value)): void {
                    if (index !== -1) {
                        group.splice(index, 1);
                    }
                };
            }
        }


        /* Utilities
        */

        /**
         * Returns the name of a type specified by a string ("Array" or "Object").
         * 
         * @param str   The name of the type. If falsy, defaults to Array
         * @returns The proper name of the type.
         */
        private getTypeName(str: string): string {
            if (str && str.charAt && str.charAt(0).toLowerCase() === "o") {
                return "Object";
            }
            return "Array";
        }

        /**
         * Returns function specified by a string (Array or Object).
         * 
         * @param str   The name of the type. If falsy, defaults to Array
         * @returns The class Function of the type.
         */
        private getTypeFunction(str: string): any {
            if (str && str.charAt && str.charAt(0).toLowerCase() === "o") {
                return Object;
            }
            return Array;
        }
    }
}
