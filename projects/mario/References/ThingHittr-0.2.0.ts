/// <reference path="QuadsKeepr-0.2.1.ts" />

declare namespace ThingHittr {
    /**
     * For group names, the names of other groups they are allowed to hit.
     */
    export interface IGroupHitList {
        [i: string]: string[];
    }

    /**
     * Determines whether a Thing may all have hits checked.
     * 
     * @returns Whether the Thing may all have hits checked.
     */
    export interface IGlobalCheck {
        (thing: QuadsKeepr.IThing): boolean;
    }

    /**
     * Checks all possible hits for a single Thing, calling the respective hit 
     * Function when any are found.
     * 
     * @param thing   A Thing whose hits are to be checked.
     */
    export interface IHitsCheck {
        (thing: QuadsKeepr.IThing): void;
    }

    /** 
     * Determines whether a Thing collides with another Thing.
     *
     * @param thing   A Thing to check collision with.
     * @param other   A Thing to check collision with.
     * @returns Whether the two Things have collided.
     */
    export interface IHitCheck {
        (thing: QuadsKeepr.IThing, other: QuadsKeepr.IThing): boolean;
    }

    /**
     * Callback for when a Thing collides with another Thing.
     * 
     * @param thing   A Thing that has collided with another Thing.
     * @param other   A Thing that has collided with another Thing.
     * 
     */
    export interface IHitCallback {
        (thing: QuadsKeepr.IThing, other: QuadsKeepr.IThing): void;
    }

    /**
     * A generic Thing Function.
     */
    export type IThingFunction = IGlobalCheck | IHitsCheck | IHitCheck | IHitCallback;

    export interface IThingFunctionGenerator<T extends IThingFunction> {
        (): T;
    }

    export interface IThingFunctionGeneratorContainer<T extends IThingFunction> {
        [i: string]: IThingFunctionGenerator<T>;
    }

    export interface IThingFunctionGeneratorContainerGroup<T extends IThingFunction> {
        [i: string]: IThingFunctionGeneratorContainer<T>;
    }

    export interface IThingFunctionContainer<T extends IThingFunction> {
        [i: string]: T;
    }

    export interface IThingFunctionContainerGroup<T extends IThingFunction> {
        [i: string]: IThingFunctionContainer<T>;
    }

    /**
     * Settings to initialize a new IThingHittr.
     */
    export interface IThingHittrSettings {
        /**
         * The key under which Things store their number of quadrants (by default, "numquads").
         */
        keyNumQuads?: string;

        /**
         * The key under which Things store their quadrants (by default, "quadrants").
         */
        keyQuadrants?: string;

        /**
         * The key under which Things store which group they fall under (by default, "group").
         */
        keyGroupName?: string;

        /**
         * The key under which Things store which type they fall under (by default, "type").
         */
        keyTypeName?: string;

        /**
         * The Function generators used globalChecks.
         */
        globalCheckGenerators: IThingFunctionGeneratorContainer<IGlobalCheck>;

        /**
         * The Function generators used for hitChecks.
         */
        hitCheckGenerators: IThingFunctionGeneratorContainerGroup<IHitCheck>;

        /**
         * The Function generators used for hitCallbacks.
         */
        hitCallbackGenerators: IThingFunctionGeneratorContainerGroup<IHitCallback>;
    }
    
    /**
     * A Thing collision detection automator that unifies GroupHoldr and QuadsKeepr.
     * Functions for checking whether a Thing may collide, checking whether it collides
     * with another Thing, and reacting to a collision are generated and cached for
     * each Thing type, based on the overarching Thing groups.
     */
    export interface IThingHittr {
        /**
         * Caches global and hits checks for the given type if they do not yet exist.
         * 
         * @param typeName   The type to cache hits for.
         * @param groupName   The general group the type fall sunder.
         */
        cacheChecksForType(typeName: string, groupName: string): void;

        /**
         * Checks all hits for a Thing using its generated hits check.
         * 
         * @param thing   The Thing to have hits checked.
         */
        checkHitsForThing(thing: QuadsKeepr.IThing): void;

        /**
         * Checks whether two Things are hitting.
         * 
         * @param thing   The primary Thing that may be hitting other.
         * @param other   The secondary Thing that may be being hit by thing.
         * @returns Whether the two Things are hitting.
         */
        checkHitForThings(thing: QuadsKeepr.IThing, other: QuadsKeepr.IThing): boolean;

        /**
         * Reacts to two Things hitting.
         * 
         * @param thing   The primary Thing that is hitting other.
         * @param other   The secondary Thing that is being hit by thing.
         */
        runHitCallbackForThings(thing: QuadsKeepr.IThing, other: QuadsKeepr.IThing): void;
    }
}


namespace ThingHittr {
    "use strict";

    /**
     * A Thing collision detection automator that unifies GroupHoldr and QuadsKeepr.
     * Functions for checking whether a Thing may collide, checking whether it collides
     * with another Thing, and reacting to a collision are generated and cached for
     * each Thing type, based on the overarching Thing groups.
     */
    export class ThingHittr implements IThingHittr {
        /**
         * The key under which Things store their number of quadrants.
         */
        private keyNumQuads: string;

        /**
         * The key under which Things store their quadrants.
         */
        private keyQuadrants: string;

        /**
         * The key under which Things store which group they fall under.
         */
        private keyGroupName: string;

        /**
         * The key under which Things store which type they fall under.
         */
        private keyTypeName: string;

        /**
         * For each group name, the names of other groups it is allowed to hit.
         */
        private groupHitLists: IGroupHitList;

        /**
         * Function generators for globalChecks.
         */
        private globalCheckGenerators: IThingFunctionGeneratorContainer<IGlobalCheck>;

        /**
         * Function generators for hitChecks.
         */
        private hitCheckGenerators: IThingFunctionGeneratorContainerGroup<IHitCheck>;

        /**
         * Function generators for HitCallbacks.
         */
        private hitCallbackGenerators: IThingFunctionGeneratorContainerGroup<IHitCallback>;

        /**
         * Check Functions for Things within groups to see if they're able to
         * collide in the first place.
         */
        private generatedGlobalChecks: IThingFunctionContainer<IGlobalCheck>;

        /**
         * Collision detection Functions to check two Things for collision.
         */
        private generatedHitChecks: IThingFunctionContainerGroup<IHitCheck>;

        /**
         * Hit Function callbacks for when two Things do collide.
         */
        private generatedHitCallbacks: IThingFunctionContainerGroup<IHitCallback>;

        /**
         * Hits checkers for when a Thing should have its hits detected.
         */
        private generatedHitsChecks: IThingFunctionContainer<IHitsCheck>;

        /**
         * Initializes a new instance of the ThingHittr class.
         * 
         * @param settings   Settings to be used for initialization.
         */
        constructor(settings: IThingHittrSettings) {
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
        cacheChecksForType(typeName: string, groupName: string): void {
            if (!this.generatedGlobalChecks.hasOwnProperty(typeName) && this.globalCheckGenerators.hasOwnProperty(groupName)) {
                this.generatedGlobalChecks[typeName] = this.globalCheckGenerators[groupName]();
                this.generatedHitsChecks[typeName] = this.generateHitsCheck(typeName);
            }
        }

        /**
         * Checks all hits for a Thing using its generated hits check.
         * 
         * @param thing   The Thing to have hits checked.
         */
        checkHitsForThing(thing: QuadsKeepr.IThing): void {
            this.generatedHitsChecks[thing[this.keyTypeName]](thing);
        }

        /**
         * Checks whether two Things are hitting.
         * 
         * @param thing   The primary Thing that may be hitting other.
         * @param other   The secondary Thing that may be being hit by thing.
         * @returns Whether the two Things are hitting.
         */
        checkHitForThings(thing: QuadsKeepr.IThing, other: QuadsKeepr.IThing): boolean {
            return this.runThingsFunctionSafely(this.generatedHitChecks, thing, other, this.hitCheckGenerators);
        }

        /**
         * Reacts to two Things hitting.
         * 
         * @param thing   The primary Thing that is hitting other.
         * @param other   The secondary Thing that is being hit by thing.
         */
        runHitCallbackForThings(thing: QuadsKeepr.IThing, other: QuadsKeepr.IThing): void {
            this.runThingsFunctionSafely(this.generatedHitCallbacks, thing, other, this.hitCallbackGenerators);
        }

        /**
         * Function generator for a hits check for a specific Thing type.
         * 
         * @param typeName   The type of the Things to generate for.
         * @returns A Function that can check all hits for a Thing of the given type.
         */
        private generateHitsCheck(typeName: string): IHitsCheck {
            /**
             * Collision detection Function for a Thing. For each Quadrant the Thing
             * is in, for all groups within that Function that the Thing's group is 
             * allowed to collide with, it is checked for collision with the Things
             * in that group. For each Thing it does collide with, the appropriate
             * hit Function is called.
             * 
             * @param thing   A Thing to check collision detection for.
             */
            return (thing: QuadsKeepr.IThing): void => {
                // Don't do anything if the thing shouldn't be checking
                if (!this.generatedGlobalChecks[typeName](thing)) {
                    return;
                }

                var groupNames: string[] = this.groupHitLists[thing[this.keyGroupName]],
                    groupName: string,
                    others: QuadsKeepr.IThing[],
                    other: QuadsKeepr.IThing,
                    i: number,
                    j: number,
                    k: number;

                // For each quadrant thing is in, look at each of its groups that thing can check
                for (i = 0; i < thing[this.keyNumQuads]; i += 1) {
                    for (j = 0; j < groupNames.length; j += 1) {
                        groupName = groupNames[j];
                        others = thing[this.keyQuadrants][i].things[groupName];

                        // For each other Thing in this group that should be checked...
                        for (k = 0; k < others.length; k += 1) {
                            other = others[k];

                            // If they are the same, breaking prevents double hits
                            if (thing === other) {
                                break;
                            }

                            // Do nothing if other can't collide in the first place
                            if (!this.generatedGlobalChecks[other[this.keyTypeName]](other)) {
                                continue;
                            }

                            // If they do hit (hitCheck), call the corresponding hitCallback
                            if (this.checkHitForThings(thing, other)) {
                                this.runHitCallbackForThings(thing, other);
                            }
                        }
                    }
                }
            };
        }

        /**
         * Runs the Function in the group that maps to the two Things' types. If it doesn't
         * yet exist, it is created.
         * 
         * @param group   The group of Functions to use.
         * @param thing   The primary Thing reacting to other.
         * @param other   The secondary Thing that thing is reacting to.
         * @returns The result of the ThingFunction from the group.
         */
        private runThingsFunctionSafely(
            group: IThingFunctionContainerGroup<IThingFunction>,
            thing: QuadsKeepr.IThing,
            other: QuadsKeepr.IThing,
            generators: IThingFunctionGeneratorContainerGroup<IThingFunction>): any {
            var typeThing: string = thing[this.keyTypeName],
                typeOther: string = other[this.keyTypeName],
                container: IThingFunctionContainer<IThingFunction> = group[typeThing],
                check: IThingFunction;

            if (!container) {
                container = group[typeThing] = {};
            }

            check = container[typeOther];
            if (!check) {
                check = container[typeOther] = generators[thing[this.keyGroupName]][other[this.keyGroupName]]();
            }

            return (<Function>check)(thing, other);
        }

        /**
         * Generates the list of group names each group is allowd to hit.
         * 
         * @param group   A summary of group containers.
         */
        private generateGroupHitLists(group: IThingFunctionGeneratorContainerGroup<IThingFunction>): IGroupHitList {
            var output: IGroupHitList = {},
                i: string;

            for (i in group) {
                if (group.hasOwnProperty(i)) {
                    output[i] = Object.keys(group[i]);
                }
            }

            return output;
        }
    }
}
