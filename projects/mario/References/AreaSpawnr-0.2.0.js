/// <reference path="MapsCreatr-0.2.1.ts" />
/// <reference path="MapScreenr-0.2.1.ts" />
/// <reference path="ObjectMakr-0.2.2.ts" />
var AreaSpawnr;
(function (AreaSpawnr_1) {
    "use strict";
    /**
     * Area manipulator and spawner for GameStartr Maps that is the front-end
     * counterpart to MapsCreatr. PreThing listings are loaded from Areas stored in a
     * MapsCreatr and added or removed from user input. Area properties are given to
     * a MapScreenr when a new Area is loaded.
     */
    var AreaSpawnr = (function () {
        /**
         * @param {IAreaSpawnrSettings} settings
         */
        function AreaSpawnr(settings) {
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
        AreaSpawnr.prototype.getMapsCreator = function () {
            return this.MapsCreator;
        };
        /**
         * @returns The internal MapScreener.
         */
        AreaSpawnr.prototype.getMapScreener = function () {
            return this.MapScreener;
        };
        /**
         * @returns The attribute names to be copied to MapScreener.
         */
        AreaSpawnr.prototype.getScreenAttributes = function () {
            return this.screenAttributes;
        };
        /**
         * @returns The key by which the current Map is indexed.
         */
        AreaSpawnr.prototype.getMapName = function () {
            return this.mapName;
        };
        /**
         * Gets the map listed under the given name. If no name is provided, the
         * mapCurrent is returned instead.
         *
         * @param name   An optional key to find the map under.
         * @returns A Map under the given name, or the current map if none given.
         */
        AreaSpawnr.prototype.getMap = function (name) {
            if (typeof name !== "undefined") {
                return this.MapsCreator.getMap(name);
            }
            else {
                return this.mapCurrent;
            }
        };
        /**
         * Simple getter pipe to the internal MapsCreator.getMaps() function.
         *
         * @returns A listing of maps, keyed by their names.
         */
        AreaSpawnr.prototype.getMaps = function () {
            return this.MapsCreator.getMaps();
        };
        /**
         * @returns The current Area.
         */
        AreaSpawnr.prototype.getArea = function () {
            return this.areaCurrent;
        };
        /**
         * @returns The name of the current Area.
         */
        AreaSpawnr.prototype.getAreaName = function () {
            return this.areaCurrent.name;
        };
        /**
         * @param location   The key of the Location to return.
         * @returns A Location within the current Map.
         */
        AreaSpawnr.prototype.getLocation = function (location) {
            return this.areaCurrent.map.locations[location];
        };
        /**
         * @returns The most recently entered Location in the current Area.
         */
        AreaSpawnr.prototype.getLocationEntered = function () {
            return this.locationEntered;
        };
        /**
         * Simple getter function for the internal prethings object. This will be
         * undefined before the first call to setMap.
         *
         * @returns A listing of the current area's Prethings.
         */
        AreaSpawnr.prototype.getPreThings = function () {
            return this.prethings;
        };
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
        AreaSpawnr.prototype.setMap = function (name, location) {
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
        };
        /**
         * Goes to a particular location in the given map. Area attributes are
         * copied to the MapScreener, PreThings are loaded, and stretches and afters
         * are checked.
         *
         * @param name   The key of the Location to start in.
         */
        AreaSpawnr.prototype.setLocation = function (name) {
            var location, attribute, i;
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
        };
        /**
         * Applies the stretchAdd Function to each given "stretch" command and
         * stores the commands in stretches.
         *
         * @param stretchesRaw   Raw descriptions of the stretches.
         */
        AreaSpawnr.prototype.setStretches = function (stretchesRaw) {
            var i;
            this.stretches = stretchesRaw;
            for (i = 0; i < stretchesRaw.length; i += 1) {
                this.stretchAdd.call(this.commandScope || this, stretchesRaw[i], i, stretchesRaw);
            }
        };
        /**
         * Applies the afterAdd Function to each given "after" command and stores
         * the commands in afters.
         *
         * @param aftersRaw   Raw descriptions of the afters.
         */
        AreaSpawnr.prototype.setAfters = function (aftersRaw) {
            var i;
            this.afters = aftersRaw;
            for (i = 0; i < aftersRaw.length; i += 1) {
                this.afterAdd.call(this.commandScope || this, aftersRaw[i], i, aftersRaw);
            }
        };
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
        AreaSpawnr.prototype.spawnArea = function (direction, top, right, bottom, left) {
            if (this.onSpawn) {
                this.applySpawnAction(this.onSpawn, true, direction, top, right, bottom, left);
            }
        };
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
        AreaSpawnr.prototype.unspawnArea = function (direction, top, right, bottom, left) {
            if (this.onUnspawn) {
                this.applySpawnAction(this.onUnspawn, false, direction, top, right, bottom, left);
            }
        };
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
        AreaSpawnr.prototype.applySpawnAction = function (callback, status, direction, top, right, bottom, left) {
            var name, group, prething, mid, start, end, i;
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
        };
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
        AreaSpawnr.prototype.findPreThingsSpawnStart = function (direction, group, mid, top, right, bottom, left) {
            var directionKey = AreaSpawnr.directionKeys[direction], directionEnd = this.getDirectionEnd(directionKey, top, right, bottom, left), i;
            for (i = 0; i < group.length; i += 1) {
                if (group[i][directionKey] >= directionEnd) {
                    return i;
                }
            }
            return i;
        };
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
        AreaSpawnr.prototype.findPreThingsSpawnEnd = function (direction, group, mid, top, right, bottom, left) {
            var directionKey = AreaSpawnr.directionKeys[direction], directionKeyOpposite = AreaSpawnr.directionKeys[AreaSpawnr.directionOpposites[direction]], directionEnd = this.getDirectionEnd(directionKeyOpposite, top, right, bottom, left), i;
            for (i = group.length - 1; i >= 0; i -= 1) {
                if (group[i][directionKey] <= directionEnd) {
                    return i;
                }
            }
            return i;
        };
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
        AreaSpawnr.prototype.getDirectionEnd = function (directionKey, top, right, bottom, left) {
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
        };
        /**
         * Directional equivalents for converting from directions to keys.
         */
        AreaSpawnr.directionKeys = {
            "xInc": "left",
            "xDec": "right",
            "yInc": "top",
            "yDec": "bottom"
        };
        /**
         * Opposite directions for when finding descending order Arrays.
         */
        AreaSpawnr.directionOpposites = {
            "xInc": "xDec",
            "xDec": "xInc",
            "yInc": "yDec",
            "yDec": "yInc"
        };
        return AreaSpawnr;
    })();
    AreaSpawnr_1.AreaSpawnr = AreaSpawnr;
})(AreaSpawnr || (AreaSpawnr = {}));
