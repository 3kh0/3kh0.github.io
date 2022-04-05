/// <reference path="QuadsKeepr-0.2.1.ts" />
var ThingHittr;
(function (ThingHittr_1) {
    "use strict";
    /**
     * A Thing collision detection automator that unifies GroupHoldr and QuadsKeepr.
     * Functions for checking whether a Thing may collide, checking whether it collides
     * with another Thing, and reacting to a collision are generated and cached for
     * each Thing type, based on the overarching Thing groups.
     */
    var ThingHittr = (function () {
        /**
         * Initializes a new instance of the ThingHittr class.
         *
         * @param settings   Settings to be used for initialization.
         */
        function ThingHittr(settings) {
            if (typeof settings === "undefined") {
                throw new Error("No settings object given to ThingHittr.");
            }
            if (typeof settings.globalCheckGenerators === "undefined") {
                throw new Error("No globalCheckGenerators given to ThingHittr.");
            }
            if (typeof settings.hitCheckGenerators === "undefined") {
                throw new Error("No hitCheckGenerators given to ThingHittr.");
            }
            if (typeof settings.hitCallbackGenerators === "undefined") {
                throw new Error("No hitCallbackGenerators given to ThingHittr.");
            }
            this.keyNumQuads = settings.keyNumQuads || "numquads";
            this.keyQuadrants = settings.keyQuadrants || "quadrants";
            this.keyGroupName = settings.keyGroupName || "group";
            this.keyTypeName = settings.keyTypeName || "type";
            this.globalCheckGenerators = settings.globalCheckGenerators;
            this.hitCheckGenerators = settings.hitCheckGenerators;
            this.hitCallbackGenerators = settings.hitCallbackGenerators;
            this.generatedHitChecks = {};
            this.generatedHitCallbacks = {};
            this.generatedGlobalChecks = {};
            this.generatedHitsChecks = {};
            this.groupHitLists = this.generateGroupHitLists(this.hitCheckGenerators);
        }
        /**
         * Caches global and hits checks for the given type if they do not yet exist
         * and have their generators defined
         *
         * @param typeName   The type to cache hits for.
         * @param groupName   The general group the type fall sunder.
         */
        ThingHittr.prototype.cacheChecksForType = function (typeName, groupName) {
            if (!this.generatedGlobalChecks.hasOwnProperty(typeName) && this.globalCheckGenerators.hasOwnProperty(groupName)) {
                this.generatedGlobalChecks[typeName] = this.globalCheckGenerators[groupName]();
                this.generatedHitsChecks[typeName] = this.generateHitsCheck(typeName);
            }
        };
        /**
         * Checks all hits for a Thing using its generated hits check.
         *
         * @param thing   The Thing to have hits checked.
         */
        ThingHittr.prototype.checkHitsForThing = function (thing) {
            this.generatedHitsChecks[thing[this.keyTypeName]](thing);
        };
        /**
         * Checks whether two Things are hitting.
         *
         * @param thing   The primary Thing that may be hitting other.
         * @param other   The secondary Thing that may be being hit by thing.
         * @returns Whether the two Things are hitting.
         */
        ThingHittr.prototype.checkHitForThings = function (thing, other) {
            return this.runThingsFunctionSafely(this.generatedHitChecks, thing, other, this.hitCheckGenerators);
        };
        /**
         * Reacts to two Things hitting.
         *
         * @param thing   The primary Thing that is hitting other.
         * @param other   The secondary Thing that is being hit by thing.
         */
        ThingHittr.prototype.runHitCallbackForThings = function (thing, other) {
            this.runThingsFunctionSafely(this.generatedHitCallbacks, thing, other, this.hitCallbackGenerators);
        };
        /**
         * Function generator for a hits check for a specific Thing type.
         *
         * @param typeName   The type of the Things to generate for.
         * @returns A Function that can check all hits for a Thing of the given type.
         */
        ThingHittr.prototype.generateHitsCheck = function (typeName) {
            var _this = this;
            /**
             * Collision detection Function for a Thing. For each Quadrant the Thing
             * is in, for all groups within that Function that the Thing's group is
             * allowed to collide with, it is checked for collision with the Things
             * in that group. For each Thing it does collide with, the appropriate
             * hit Function is called.
             *
             * @param thing   A Thing to check collision detection for.
             */
            return function (thing) {
                // Don't do anything if the thing shouldn't be checking
                if (!_this.generatedGlobalChecks[typeName](thing)) {
                    return;
                }
                var groupNames = _this.groupHitLists[thing[_this.keyGroupName]], groupName, others, other, i, j, k;
                // For each quadrant thing is in, look at each of its groups that thing can check
                for (i = 0; i < thing[_this.keyNumQuads]; i += 1) {
                    for (j = 0; j < groupNames.length; j += 1) {
                        groupName = groupNames[j];
                        others = thing[_this.keyQuadrants][i].things[groupName];
                        // For each other Thing in this group that should be checked...
                        for (k = 0; k < others.length; k += 1) {
                            other = others[k];
                            // If they are the same, breaking prevents double hits
                            if (thing === other) {
                                break;
                            }
                            // Do nothing if other can't collide in the first place
                            if (!_this.generatedGlobalChecks[other[_this.keyTypeName]](other)) {
                                continue;
                            }
                            // If they do hit (hitCheck), call the corresponding hitCallback
                            if (_this.checkHitForThings(thing, other)) {
                                _this.runHitCallbackForThings(thing, other);
                            }
                        }
                    }
                }
            };
        };
        /**
         * Runs the Function in the group that maps to the two Things' types. If it doesn't
         * yet exist, it is created.
         *
         * @param group   The group of Functions to use.
         * @param thing   The primary Thing reacting to other.
         * @param other   The secondary Thing that thing is reacting to.
         * @returns The result of the ThingFunction from the group.
         */
        ThingHittr.prototype.runThingsFunctionSafely = function (group, thing, other, generators) {
            var typeThing = thing[this.keyTypeName], typeOther = other[this.keyTypeName], container = group[typeThing], check;
            if (!container) {
                container = group[typeThing] = {};
            }
            check = container[typeOther];
            if (!check) {
                check = container[typeOther] = generators[thing[this.keyGroupName]][other[this.keyGroupName]]();
            }
            return check(thing, other);
        };
        /**
         * Generates the list of group names each group is allowd to hit.
         *
         * @param group   A summary of group containers.
         */
        ThingHittr.prototype.generateGroupHitLists = function (group) {
            var output = {}, i;
            for (i in group) {
                if (group.hasOwnProperty(i)) {
                    output[i] = Object.keys(group[i]);
                }
            }
            return output;
        };
        return ThingHittr;
    })();
    ThingHittr_1.ThingHittr = ThingHittr;
})(ThingHittr || (ThingHittr = {}));
