var GroupHoldr;
(function (GroupHoldr_1) {
    "use strict";
    /**
     * A general storage container for values in keyed Arrays and/or Objects.
     * Manipulation utlities are provided for adding, removing, switching, and
     * applying methods to values.
     */
    var GroupHoldr = (function () {
        /**
         * Initializes a new instance of the GroupHoldr class.
         *
         * @param settings   Settings to be used for initialization.
         */
        function GroupHoldr(settings) {
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
        GroupHoldr.prototype.getFunctions = function () {
            return this.functions;
        };
        /**
         * @returns The stored object groups, keyed by name.
         */
        GroupHoldr.prototype.getGroups = function () {
            return this.groups;
        };
        /**
         * @param name   The name of the group to retrieve.
         * @returns The group stored under the given name.
         */
        GroupHoldr.prototype.getGroup = function (name) {
            return this.groups[name];
        };
        /**
         * @returns Names of the stored object groups.
         */
        GroupHoldr.prototype.getGroupNames = function () {
            return this.groupNames;
        };
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
        GroupHoldr.prototype.switchMemberGroup = function (value, groupNameOld, groupNameNew, keyOld, keyNew) {
            var groupOld = this.groups[groupNameOld];
            if (groupOld.constructor === Array) {
                this.functions.delete[groupNameOld](value, keyOld);
            }
            else {
                this.functions.delete[groupNameOld](keyOld);
            }
            this.functions.add[groupNameNew](value, keyNew);
        };
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
        GroupHoldr.prototype.applyAll = function (scope, func, args) {
            if (args === void 0) { args = undefined; }
            var i;
            if (!args) {
                args = [undefined];
            }
            else {
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
        };
        /**
         * Calls a function for each member of each group. Extra arguments may be
         * passed in an array after scope and func, as in Function.apply's standard.
         *
         * @param scope   An optional scope to call this from (if falsy, defaults
         *                to the calling GroupHoldr).
         * @param func   A Function to apply to each group.
         * @param [args]   Optionally, arguments to pass in after each group.
         */
        GroupHoldr.prototype.applyOnAll = function (scope, func, args) {
            if (args === void 0) { args = undefined; }
            var group, i, j;
            if (!args) {
                args = [undefined];
            }
            else {
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
                }
                else {
                    for (j in group) {
                        if (group.hasOwnProperty(j)) {
                            args[0] = group[j];
                            func.apply(scope, args);
                        }
                    }
                }
            }
        };
        /**
         * Calls a Function for each group, with that group as the first argument.
         * Extra arguments may be passed after scope and func natively, as in
         * Function.call's standard.
         *
         * @param scope   An optional scope to call this from (if falsy,
         *                defaults to this).
         * @param func   A Function to apply to each group.
         */
        GroupHoldr.prototype.callAll = function (scope, func) {
            var args = Array.prototype.slice.call(arguments, 1), i;
            if (!scope) {
                scope = this;
            }
            for (i = this.groupNames.length - 1; i >= 0; i -= 1) {
                args[0] = this.groups[this.groupNames[i]];
                func.apply(scope, args);
            }
        };
        /**
         * Calls a function for each member of each group. Extra arguments may be
         * passed after scope and func natively, as in Function.call's standard.
         *
         * @param scope   An optional scope to call this from (if falsy,
         *                defaults to this).
         * @param func   A Function to apply to each group member.
         */
        GroupHoldr.prototype.callOnAll = function (scope, func) {
            var args = Array.prototype.slice.call(arguments, 1), group, i, j;
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
                }
                else {
                    for (j in group) {
                        if (group.hasOwnProperty(j)) {
                            args[0] = group[j];
                            func.apply(scope, args);
                        }
                    }
                }
            }
        };
        /**
         * Clears each Array by setting its length to 0.
         */
        GroupHoldr.prototype.clearArrays = function () {
            var group, i;
            for (i = this.groupNames.length - 1; i >= 0; i -= 1) {
                group = this.groups[this.groupNames[i]];
                if (group instanceof Array) {
                    group.length = 0;
                }
            }
        };
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
        GroupHoldr.prototype.setGroupNames = function (names, types) {
            var scope = this, typeFunc, typeName;
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
                this.groupNames.forEach(function (name) {
                    scope.groupTypes[name] = scope.getTypeFunction(types[name]);
                    scope.groupTypeNames[name] = scope.getTypeName(types[name]);
                });
            }
            else {
                // Otherwise assume everything uses the same one, such as from a String
                typeFunc = this.getTypeFunction(types);
                typeName = this.getTypeName(types);
                this.groupNames.forEach(function (name) {
                    scope.groupTypes[name] = typeFunc;
                    scope.groupTypeNames[name] = typeName;
                });
            }
            // Create the containers, and set the modifying functions
            this.setGroups();
            this.createFunctions();
        };
        /**
         * Removes any pre-existing "set", "get", etc. functions.
         */
        GroupHoldr.prototype.clearFunctions = function () {
            this.groupNames.forEach(function (name) {
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
        };
        /**
         * Resets groups to an empty Object, and fills it with a new groupType for
         * each name in groupNames.
         */
        GroupHoldr.prototype.setGroups = function () {
            var scope = this;
            this.groups = {};
            this.groupNames.forEach(function (name) {
                scope.groups[name] = new scope.groupTypes[name]();
            });
        };
        /**
         * Calls the Function creators for each name in groupNames.
         */
        GroupHoldr.prototype.createFunctions = function () {
            var groupName, i;
            for (i = 0; i < this.groupNames.length; i += 1) {
                groupName = this.groupNames[i];
                this.createFunctionSetGroup(groupName);
                this.createFunctionGetGroup(groupName);
                this.createFunctionSet(groupName);
                this.createFunctionGet(groupName);
                this.createFunctionAdd(groupName);
                this.createFunctionDelete(groupName);
            }
        };
        /* Function generators
        */
        /**
         * Creates a setGroup Function under this and functions.setGroup.
         *
         * @param name   The name of the group, from groupNames.
         */
        GroupHoldr.prototype.createFunctionSetGroup = function (name) {
            var scope = this;
            /**
             * Sets the value of the group referenced by the name.
             *
             * @param value   The new value for the group, which should be
             *                the same type as the group (Array or Object).
             */
            this.functions.setGroup[name] = this["set" + name + "Group"] = function (value) {
                scope.groups[name] = value;
            };
        };
        /**
         * Creates a getGroup Function under this and functions.getGroup.
         *
         * @param name   The name of the group, from groupNames.
         */
        GroupHoldr.prototype.createFunctionGetGroup = function (name) {
            var scope = this;
            /**
             * @param key   The String key that references the group.
             * @returns The group referenced by the given key.
             */
            this.functions.getGroup[name] = this["get" + name + "Group"] = function () {
                return scope.groups[name];
            };
        };
        /**
         * Creates a set Function under this and functions.set.
         *
         * @param name   The name of the group, from groupNames.
         */
        GroupHoldr.prototype.createFunctionSet = function (name) {
            /**
             * Sets a value contained within the group.
             *
             * @param key   The key referencing the value to obtain. This
             *              should be a Number if the group is an Array, or
             *              a String if the group is an Object.
             * @param value   The value to be contained within the group.
             */
            this.functions.set[name] = this["set" + name] = function (key, value) {
                if (value === void 0) { value = undefined; }
                this.groups[name][key] = value;
            };
        };
        /**
         * Creates a get<type> function under this and functions.get
         *
         * @param name   The name of the group, from groupNames.
         */
        GroupHoldr.prototype.createFunctionGet = function (name) {
            /**
             * Gets the value within a group referenced by the given key.
             *
             * @param  key   The key referencing the value to obtain. This
             *               should be a Number if the group is an Array, or
             *               a String if the group is an Object.
             * @param value   The value contained within the group.
             */
            this.functions.get[name] = this["get" + name] = function (key) {
                return this.groups[name][key];
            };
        };
        /**
         * Creates an add function under this and functions.add.
         *
         * @param name   The name of the group, from groupNames.
         */
        GroupHoldr.prototype.createFunctionAdd = function (name) {
            var group = this.groups[name];
            if (this.groupTypes[name] === Object) {
                /**
                 * Adds a value to the group, referenced by the given key.
                 *
                 * @param key   The String key to reference the value to be
                 *              added.
                 * @param value   The value to be added to the group.
                 */
                this.functions.add[name] = this["add" + name] = function (value, key) {
                    group[key] = value;
                };
            }
            else {
                /**
                 * Adds a value to the group, referenced by the given key.
                 *
                 * @param value   The value to be added to the group.
                 */
                this.functions.add[name] = this["add" + name] = function (value, key) {
                    if (key !== undefined) {
                        group[key] = value;
                    }
                    else {
                        group.push(value);
                    }
                };
            }
        };
        /**
         * Creates a delete function under this and functions.delete.
         *
         * @param name   The name of the group, from groupNames.
         */
        GroupHoldr.prototype.createFunctionDelete = function (name) {
            var group = this.groups[name];
            if (this.groupTypes[name] === Object) {
                /**
                 * Deletes a value from the group, referenced by the given key.
                 *
                 * @param key   The String key to reference the value to be
                 *              deleted.
                 */
                this.functions.delete[name] = this["delete" + name] = function (key) {
                    delete group[key];
                };
            }
            else {
                /**
                 * Deletes a value from the group, referenced by the given key.
                 *
                 * @param value The value to be deleted.
                 */
                this.functions.delete[name] = this["delete" + name] = function (value, index) {
                    if (index === void 0) { index = group.indexOf(value); }
                    if (index !== -1) {
                        group.splice(index, 1);
                    }
                };
            }
        };
        /* Utilities
        */
        /**
         * Returns the name of a type specified by a string ("Array" or "Object").
         *
         * @param str   The name of the type. If falsy, defaults to Array
         * @returns The proper name of the type.
         */
        GroupHoldr.prototype.getTypeName = function (str) {
            if (str && str.charAt && str.charAt(0).toLowerCase() === "o") {
                return "Object";
            }
            return "Array";
        };
        /**
         * Returns function specified by a string (Array or Object).
         *
         * @param str   The name of the type. If falsy, defaults to Array
         * @returns The class Function of the type.
         */
        GroupHoldr.prototype.getTypeFunction = function (str) {
            if (str && str.charAt && str.charAt(0).toLowerCase() === "o") {
                return Object;
            }
            return Array;
        };
        return GroupHoldr;
    })();
    GroupHoldr_1.GroupHoldr = GroupHoldr;
})(GroupHoldr || (GroupHoldr = {}));
