/// <reference path="MapsCreatr-0.2.1.ts" />
/// <reference path="MapScreenr-0.2.1.ts" />
/// <reference path="ObjectMakr-0.2.2.ts" />

declare namespace AreaSpawnr {
    /**
     * A Function to add a map command, such as an after or stretch.
     * 
     * @param thing   The raw command to create a Thing, as either a title
     *                or a JSON object.
     * @param index   Which command this is, as passed through Array.forEach.
     */
    export interface ICommandAdder {
        (thing: string | MapsCreatr.IPreThingSettings, index: number): void;
    }

    /**
     * Settings to initialize a new IAreaSpawnr.
     */
    export interface IAreaSpawnrSettings {
        /**
         * A MapsCreatr used to store and lazily initialize Maps.
         */
        MapsCreator: MapsCreatr.IMapsCreatr;

        /**
         * A MapScreenr used to store attributes of Areas.
         */
        MapScreener: MapScreenr.IMapScreenr;

        /**
         * Function for when a PreThing's Thing should be spawned.
         */
        onSpawn?: (prething: MapsCreatr.IPreThing) => void;

        /**
         * Function for when a PreThing's Thing should be un-spawned.
         */
        onUnspawn?: (prething: MapsCreatr.IPreThing) => void;

        /**
         * Any property names to copy from Areas to MapScreenr.
         */
        screenAttributes?: string[];

        /**
         * Function to add an Area's provided "stretches" commands to stretch
         * across an Area.
         */
        stretchAdd?: ICommandAdder;

        /**
         * Function to add an Area provides an "afters" command to add PreThings
         * to the end of an Area.
         */
        afterAdd?: ICommandAdder;

        /**
         * An optional scope to call stretchAdd and afterAdd on, if not this.
         */
        commandScope?: any;
    }

    /**
     * Area manipulator and spawner for GameStartr Maps that is the front-end
     * counterpart to MapsCreatr. PreThing listings are loaded from Areas stored in a
     * MapsCreatr and added or removed from user input. Area properties are given to
     * a MapScreenr when a new Area is loaded.
     */
    export interface IAreaSpawnr {
        /**
         * @returns The internal MapsCreator.
         */
        getMapsCreator(): MapsCreatr.IMapsCreatr;

        /**
         * @returns The internal MapScreener.
         */
        getMapScreener(): MapScreenr.IMapScreenr;

        /**
         * @returns The attribute names to be copied to MapScreener.
         */
        getScreenAttributes(): string[];

        /**
         * @returns The key by which the current Map is indexed.
         */
        getMapName(): string;

        /**
         * Gets the map listed under the given name. If no name is provided, the
         * mapCurrent is returned instead.
         * 
         * @param name   An optional key to find the map under.
         * @returns A Map under the given name, or the current map if none given.
         */
        getMap(name?: string): MapsCreatr.IMapsCreatrMap;

        /**
         * Simple getter pipe to the internal MapsCreator.getMaps() function.
         * 
         * @returns A listing of maps, keyed by their names.
         */
        getMaps(): { [i: string]: MapsCreatr.IMapsCreatrMap };

        /**
         * @returns The current Area.
         */
        getArea(): MapsCreatr.IMapsCreatrArea;

        /**
         * @returns The name of the current Area.
         */
        getAreaName(): string;

        /**
         * @param location   The key of the Location to return.
         * @returns A Location within the current Map.
         */
        getLocation(location: string): MapsCreatr.IMapsCreatrLocation;

        /**
         * @returns The most recently entered Location in the current Area.
         */
        getLocationEntered(): MapsCreatr.IMapsCreatrLocation;

        /**
         * Simple getter function for the internal prethings object. This will be
         * undefined before the first call to setMap.
         * 
         * @returns A listing of the current area's Prethings.
         */
        getPreThings(): MapsCreatr.IPreThingsContainers;

        /**
         * Sets the currently manipulated Map in the handler to be the one under a
         * given name. Note that this will do very little unless a location is 
         * provided.
         * 
         * @param name   A key to find the map under.
         * @param location   An optional key for a location to immediately start the 
         *                   map in (if not provided, ignored). 
         * @returns The now-current map.               
         */
        setMap(name: string, location?: string): MapsCreatr.IMapsCreatrMap;

        /**
         * Goes to a particular location in the given map. Area attributes are 
         * copied to the MapScreener, PreThings are loaded, and stretches and afters
         * are checked.
         * 
         * @param name   The key of the Location to start in.
         */
        setLocation(name: string): void;

        /**
         * Applies the stretchAdd Function to each given "stretch" command and
         * stores the commands in stretches.
         * 
         * @param stretchesRaw   Raw descriptions of the stretches.
         */
        setStretches(stretchesRaw: (string | MapsCreatr.IPreThingSettings)[]): void;

        /**
         * Applies the afterAdd Function to each given "after" command and stores
         * the commands in afters.
         * 
         * @param aftersRaw   Raw descriptions of the afters.
         */
        setAfters(aftersRaw: (string | MapsCreatr.IPreThingSettings)[]): void;

        /**
         * Calls onSpawn on every PreThing touched by the given bounding box, 
         * determined in order of the given direction. This is a simple wrapper 
         * around applySpawnAction that also gives it true as the status.
         * 
         * @param direction   The direction by which to order PreThings, as "xInc",
         *                    "xDec", "yInc", or "yDec".
         * @param top   The upper-most bound to spawn within.
         * @param right   The right-most bound to spawn within.
         * @param bottom    The bottom-most bound to spawn within.
         * @param left    The left-most bound to spawn within.
         */
        spawnArea(direction: string, top: number, right: number, bottom: number, left: number): void;

        /**
         * Calls onUnspawn on every PreThing touched by the given bounding box,
         * determined in order of the given direction. This is a simple wrapper
         * around applySpawnAction that also gives it false as the status.
         * 
         * @param direction   The direction by which to order PreThings, as "xInc",
         *                    "xDec", "yInc", or "yDec".
         * @param top   The upper-most bound to spawn within.
         * @param right   The right-most bound to spawn within.
         * @param bottom    The bottom-most bound to spawn within.
         * @param left    The left-most bound to spawn within.
         */
        unspawnArea(direction: string, top: number, right: number, bottom: number, left: number): void;
    }
}


namespace AreaSpawnr {
    "use strict";

    /**
     * Area manipulator and spawner for GameStartr Maps that is the front-end
     * counterpart to MapsCreatr. PreThing listings are loaded from Areas stored in a
     * MapsCreatr and added or removed from user input. Area properties are given to
     * a MapScreenr when a new Area is loaded.
     */
    export class AreaSpawnr implements IAreaSpawnr {
        /**
         * Directional equivalents for converting from directions to keys.
         */
        public static directionKeys: { [i: string]: string } = {
            "xInc": "left",
            "xDec": "right",
            "yInc": "top",
            "yDec": "bottom"
        };

        /**
         * Opposite directions for when finding descending order Arrays.
         */
        public static directionOpposites: { [i: string]: string } = {
            "xInc": "xDec",
            "xDec": "xInc",
            "yInc": "yDec",
            "yDec": "yInc"
        };

        /**
         * MapsCreatr container for Maps from which this obtains Thing settings.
         */
        private MapsCreator: MapsCreatr.IMapsCreatr;

        /**
         * MapScreenr container for attributes copied from Areas.
         */
        private MapScreener: MapScreenr.IMapScreenr;

        /**
         * The names of attributes to be copied to the MapScreenr during setLocation.
         */
        private screenAttributes: string[];

        /**
         * The currently referenced Map, set by setMap.
         */
        private mapCurrent: MapsCreatr.IMapsCreatrMap;

        /**
         * The currently referenced Area, set by setLocation.
         */
        private areaCurrent: MapsCreatr.IMapsCreatrArea;

        /**
         * The currently referenced Location, set by setLocation.
         */
        private locationEntered: MapsCreatr.IMapsCreatrLocation;

        /**
         * The name of the currently referenced Area, set by setMap.
         */
        private mapName: string;

        /**
         * The current Area's listing of PreThings.
         */
        private prethings: MapsCreatr.IPreThingsContainers;

        /**
         * Function for when a PreThing is to be spawned.
         */
        private onSpawn: (prething: MapsCreatr.IPreThing) => void;

        /**
         * Function for when a PreThing is to be un-spawned.
         */
        private onUnspawn: (prething: MapsCreatr.IPreThing) => void;

        /**
         * Optionally, PreThing settings to stretch across an Area.
         */
        private stretches: (string | MapsCreatr.IPreThingSettings)[];

        /**
         * If stretches exists, a Function to add stretches to an Area.
         */
        private stretchAdd: ICommandAdder;

        /**
         * Optionally, PreThing settings to place at the end of an Area.
         */
        private afters: (string | MapsCreatr.IPreThingSettings)[];

        /**
         * If afters exists, a Function to add afters to an Area.
         */
        private afterAdd: ICommandAdder;

        /** 
         * An optional scope to call stretchAdd and afterAdd on, if not this.
         */
        private commandScope: any;

        /**
         * @param {IAreaSpawnrSettings} settings
         */
        constructor(settings: IAreaSpawnrSettings) {
            if (!settings) {
                throw new Error("No settings given to AreaSpawnr.");
            }

            // Maps themselves should have been created in the MapsCreator object
            if (!settings.MapsCreator) {
                throw new Error("No MapsCreator provided to AreaSpawnr.");
            }
            this.MapsCreator = settings.MapsCreator;

            // Map/Area attributes will need to be stored in a MapScreenr object
            if (!settings.MapScreener) {
                throw new Error("No MapScreener provided to AreaSpawnr.");
            }
            this.MapScreener = settings.MapScreener;

            this.onSpawn = settings.onSpawn;
            this.onUnspawn = settings.onUnspawn;

            this.screenAttributes = settings.screenAttributes || [];
            this.stretchAdd = settings.stretchAdd;
            this.afterAdd = settings.afterAdd;
            this.commandScope = settings.commandScope;
        }


        /* Simple gets
        */

        /**
         * @returns The internal MapsCreator.
         */
        getMapsCreator(): MapsCreatr.IMapsCreatr {
            return this.MapsCreator;
        }

        /**
         * @returns The internal MapScreener.
         */
        getMapScreener(): MapScreenr.IMapScreenr {
            return this.MapScreener;
        }

        /**
         * @returns The attribute names to be copied to MapScreener.
         */
        getScreenAttributes(): string[] {
            return this.screenAttributes;
        }

        /**
         * @returns The key by which the current Map is indexed.
         */
        getMapName(): string {
            return this.mapName;
        }

        /**
         * Gets the map listed under the given name. If no name is provided, the
         * mapCurrent is returned instead.
         * 
         * @param name   An optional key to find the map under.
         * @returns A Map under the given name, or the current map if none given.
         */
        getMap(name?: string): MapsCreatr.IMapsCreatrMap {
            if (typeof name !== "undefined") {
                return this.MapsCreator.getMap(name);
            } else {
                return this.mapCurrent;
            }
        }

        /**
         * Simple getter pipe to the internal MapsCreator.getMaps() function.
         * 
         * @returns A listing of maps, keyed by their names.
         */
        getMaps(): { [i: string]: MapsCreatr.IMapsCreatrMap } {
            return this.MapsCreator.getMaps();
        }

        /**
         * @returns The current Area.
         */
        getArea(): MapsCreatr.IMapsCreatrArea {
            return this.areaCurrent;
        }

        /**
         * @returns The name of the current Area.
         */
        getAreaName(): string {
            return this.areaCurrent.name;
        }

        /**
         * @param location   The key of the Location to return.
         * @returns A Location within the current Map.
         */
        getLocation(location: string): MapsCreatr.IMapsCreatrLocation {
            return this.areaCurrent.map.locations[location];
        }

        /**
         * @returns The most recently entered Location in the current Area.
         */
        getLocationEntered(): MapsCreatr.IMapsCreatrLocation {
            return this.locationEntered;
        }

        /**
         * Simple getter function for the internal prethings object. This will be
         * undefined before the first call to setMap.
         * 
         * @returns A listing of the current area's Prethings.
         */
        getPreThings(): MapsCreatr.IPreThingsContainers {
            return this.prethings;
        }


        /* Map & area setting
        */

        /**
         * Sets the currently manipulated Map in the handler to be the one under a
         * given name. Note that this will do very little unless a location is 
         * provided.
         * 
         * @param name   A key to find the map under.
         * @param location   An optional key for a location to immediately start the 
         *                   map in (if not provided, ignored). 
         * @returns The now-current map.               
         */
        setMap(name: string, location?: string): MapsCreatr.IMapsCreatrMap {
            // Get the newly current map from this.getMap normally
            this.mapCurrent = this.getMap(name);
            if (!this.mapCurrent) {
                throw new Error("Unknown Map in setMap: '" + name + "'.");
            }

            this.mapName = name;

            // Most of the work is done by setLocation (by default, the map's first)
            if (arguments.length > 1) {
                this.setLocation(location);
            }

            return this.mapCurrent;
        }

        /**
         * Goes to a particular location in the given map. Area attributes are 
         * copied to the MapScreener, PreThings are loaded, and stretches and afters
         * are checked.
         * 
         * @param name   The key of the Location to start in.
         */
        setLocation(name: string): void {
            var location: MapsCreatr.IMapsCreatrLocation,
                attribute: string,
                i: number;

            // Query the location from the current map and ensure it exists
            location = this.mapCurrent.locations[name];
            if (!location) {
                throw new Error("Unknown location in setLocation: '" + name + "'.");
            }

            // Since the location is valid, mark it as current (with its area)
            this.locationEntered = location;
            this.areaCurrent = location.area;
            this.areaCurrent.boundaries = {
                "top": 0,
                "right": 0,
                "bottom": 0,
                "left": 0
            };

            // Copy all the settings from that area into the MapScreenr container
            for (i = 0; i < this.screenAttributes.length; i += 1) {
                attribute = this.screenAttributes[i];
                this.MapScreener[attribute] = this.areaCurrent[attribute];
            }

            // Reset the prethings object, enabling it to be used as a fresh start
            // for the new Area/Location placements
            this.prethings = this.MapsCreator.getPreThings(location.area);

            // Optional: set stretch commands
            if (this.areaCurrent.stretches) {
                this.setStretches(this.areaCurrent.stretches);
            }

            // Optional: set after commands
            if (this.areaCurrent.afters) {
                this.setAfters(this.areaCurrent.afters);
            }
        }

        /**
         * Applies the stretchAdd Function to each given "stretch" command and
         * stores the commands in stretches.
         * 
         * @param stretchesRaw   Raw descriptions of the stretches.
         */
        setStretches(stretchesRaw: (string | MapsCreatr.IPreThingSettings)[]): void {
            var i: number;

            this.stretches = stretchesRaw;

            for (i = 0; i < stretchesRaw.length; i += 1) {
                this.stretchAdd.call(this.commandScope || this, stretchesRaw[i], i, stretchesRaw);
            }
        }

        /**
         * Applies the afterAdd Function to each given "after" command and stores
         * the commands in afters.
         * 
         * @param aftersRaw   Raw descriptions of the afters.
         */
        setAfters(aftersRaw: (string | MapsCreatr.IPreThingSettings)[]): void {
            var i: number;

            this.afters = aftersRaw;

            for (i = 0; i < aftersRaw.length; i += 1) {
                this.afterAdd.call(this.commandScope || this, aftersRaw[i], i, aftersRaw);
            }
        }

        /**
         * Calls onSpawn on every PreThing touched by the given bounding box, 
         * determined in order of the given direction. This is a simple wrapper 
         * around applySpawnAction that also gives it true as the status.
         * 
         * @param direction   The direction by which to order PreThings, as "xInc",
         *                    "xDec", "yInc", or "yDec".
         * @param top   The upper-most bound to spawn within.
         * @param right   The right-most bound to spawn within.
         * @param bottom    The bottom-most bound to spawn within.
         * @param left    The left-most bound to spawn within.
         */
        spawnArea(direction: string, top: number, right: number, bottom: number, left: number): void {
            if (this.onSpawn) {
                this.applySpawnAction(this.onSpawn, true, direction, top, right, bottom, left);
            }
        }

        /**
         * Calls onUnspawn on every PreThing touched by the given bounding box,
         * determined in order of the given direction. This is a simple wrapper
         * around applySpawnAction that also gives it false as the status.
         * 
         * @param direction   The direction by which to order PreThings, as "xInc",
         *                    "xDec", "yInc", or "yDec".
         * @param top   The upper-most bound to spawn within.
         * @param right   The right-most bound to spawn within.
         * @param bottom    The bottom-most bound to spawn within.
         * @param left    The left-most bound to spawn within.
         */
        unspawnArea(direction: string, top: number, right: number, bottom: number, left: number): void {
            if (this.onUnspawn) {
                this.applySpawnAction(this.onUnspawn, false, direction, top, right, bottom, left);
            }
        }

        /**
         * Calls onUnspawn on every PreThing touched by the given bounding box,
         * determined in order of the given direction. This is used both to spawn
         * and un-spawn PreThings, such as during QuadsKeepr shifting. The given
         * status is used as a filter: all PreThings that already have the status
         * (generally true or false as spawned or unspawned, respectively) will have
         * the callback called on them.
         * 
         * @param callback   The callback to be run whenever a matching matching 
         *                   PreThing is found.
         * @param status   The spawn status to match PreThings against. Only PreThings 
         *                 with .spawned === status will have the callback applied.
         * @param direction   The direction by which to order PreThings, as "xInc", 
         *                    "xDec", "yInc", or "yDec".
         * @param top   The upper-most bound to apply within.
         * @param right   The right-most bound to apply within.
         * @param bottom    The bottom-most bound to apply within.
         * @param left    The left-most bound to apply within.
         */
        private applySpawnAction(
            callback: (prething: MapsCreatr.IPreThing) => void,
            status: boolean,
            direction: string,
            top: number,
            right: number,
            bottom: number,
            left: number): void {
            var name: string,
                group: MapsCreatr.IPreThing[],
                prething: MapsCreatr.IPreThing,
                mid: number,
                start: number,
                end: number,
                i: number;

            // For each group of PreThings currently able to spawn...
            for (name in this.prethings) {
                if (!this.prethings.hasOwnProperty(name)) {
                    continue;
                }

                // Don't bother trying to spawn the group if it has no members
                group = this.prethings[name][direction];
                if (group.length === 0) {
                    continue;
                }

                // Find the start and end points within the PreThings Array
                // Ex. if direction="xInc", go from .left >= left to .left <= right
                mid = (group.length / 2) | 0;
                start = this.findPreThingsSpawnStart(direction, group, mid, top, right, bottom, left);
                end = this.findPreThingsSpawnEnd(direction, group, mid, top, right, bottom, left);

                // Loop through all the directionally valid PreThings, spawning if 
                // they're within the bounding box
                for (i = start; i <= end; i += 1) {
                    prething = group[i];

                    // For example: if status is true (spawned), don't spawn again
                    if (prething.spawned !== status) {
                        prething.spawned = status;
                        callback(prething);
                    }
                }
            }
        }

        /**
         * Finds the index from which PreThings should stop having an action 
         * applied to them in applySpawnAction. This is less efficient than the 
         * unused version below, but is more reliable for slightly unsorted groups.
         * 
         * @param direction   The direction by which to order PreThings, as "xInc", 
         *                    "xDec", "yInc", or "yDec".
         * @param group   The group to find a PreThing index within.
         * @param mid   The middle of the group. This is currently unused.
         * @param top   The upper-most bound to apply within.
         * @param right   The right-most bound to apply within.
         * @param bottom    The bottom-most bound to apply within.
         * @param left    The left-most bound to apply within.
         * @returns The index to start spawning PreThings from.
         */
        private findPreThingsSpawnStart(
            direction: string,
            group: MapsCreatr.IPreThing[],
            mid: number,
            top: number,
            right: number,
            bottom: number,
            left: number): number {
            var directionKey: string = AreaSpawnr.directionKeys[direction],
                directionEnd: number = this.getDirectionEnd(directionKey, top, right, bottom, left),
                i: number;

            for (i = 0; i < group.length; i += 1) {
                if (group[i][directionKey] >= directionEnd) {
                    return i;
                }
            }

            return i;
        }

        /**
         * Finds the index from which PreThings should stop having an action 
         * applied to them in applySpawnAction. This is less efficient than the 
         * unused version below, but is more reliable for slightly unsorted groups.
         * 
         * @param direction   The direction by which to order PreThings, as "xInc",
         *                    "xDec", "yInc", or "yDec".
         * @param group   The group to find a PreThing index within.
         * @param mid   The middle of the group. This is currently unused.
         * @param top   The upper-most bound to apply within.
         * @param right   The right-most bound to apply within.
         * @param bottom    The bottom-most bound to apply within.
         * @param left    The left-most bound to apply within.
         * @returns The index to stop spawning PreThings from.
         */
        private findPreThingsSpawnEnd(
            direction: string,
            group: MapsCreatr.IPreThing[],
            mid: number,
            top: number,
            right: number,
            bottom: number,
            left: number): number {
            var directionKey: string = AreaSpawnr.directionKeys[direction],
                directionKeyOpposite: string = AreaSpawnr.directionKeys[AreaSpawnr.directionOpposites[direction]],
                directionEnd: number = this.getDirectionEnd(directionKeyOpposite, top, right, bottom, left),
                i: number;

            for (i = group.length - 1; i >= 0; i -= 1) {
                if (group[i][directionKey] <= directionEnd) {
                    return i;
                }
            }

            return i;
        }

        /**
         * Conditionally returns a measurement based on what direction String is
         * given. This is useful for generically finding boundaries when the 
         * direction isn't known, such as in findPreThingsSpawnStart and -End.
         * 
         * @param direction   The direction by which to order PreThings, as "xInc",
         *                    "xDec", "yInc", or "yDec".
         * @param top   The upper-most bound to apply within.
         * @param right   The right-most bound to apply within.
         * @param bottom    The bottom-most bound to apply within.
         * @param left    The left-most bound to apply within.
         * @returns Either top, right, bottom, or left, depending on direction.
         */
        private getDirectionEnd(directionKey: string, top: number, right: number, bottom: number, left: number): number {
            switch (directionKey) {
                case "top":
                    return top;
                case "right":
                    return right;
                case "bottom":
                    return bottom;
                case "left":
                    return left;
                default:
                    throw new Error("Unknown directionKey: " + directionKey);
            }
        }
    }
}
