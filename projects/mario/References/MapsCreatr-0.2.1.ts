/// <reference path="ObjectMakr-0.2.2.ts" />

declare namespace MapsCreatr {
    /**
     * A raw JSON-friendly description of a map.
     */
    export interface IMapsCreatrMapRaw {
        /**
         * The name of the map.
         */
        name: string;

        /**
         * Descriptions of locations in the map.
         */
        locations: {
            [i: string]: IMapsCreatrLocationRaw;
            [i: number]: IMapsCreatrLocationRaw;
        };

        /**
         * Descriptions of areas in the map.
         */
        areas: {
            [i: string]: IMapsCreatrAreaRaw;
            [i: number]: IMapsCreatrAreaRaw;
        };
    }

    /**
     * A raw JSON-friendly description of a map area.
     */
    export interface IMapsCreatrAreaRaw {
        /**
         * Commands to place PreThings in the area.
         */
        creation: any[];
    }

    /**
     * A raw JSON-friendly description of a map location.
     */
    export interface IMapsCreatrLocationRaw {
        /**
         * The entrance method used to enter the location.
         */
        entry?: string;

        /**
         * Which area this location is a part of.
         */
        area?: number | string;
    }

    /**
     * A Map parsed from its raw JSON-friendly description.
     */
    export interface IMapsCreatrMap {
        /**
         * Whether the Map has had its areas and locations set.
         */
        initialized: boolean;

        /**
         * A listing of areas in the Map, keyed by name.
         */
        areas: {
            [i: string]: IMapsCreatrArea;
            [i: number]: IMapsCreatrArea;
        };

        /**
         * A listing of locations in the Map, keyed by name.
         */
        locations: any;
    }

    /**
     * An Area parsed from a raw JSON-friendly Map description.
     */
    export interface IMapsCreatrArea {
        /**
         * The user-friendly label for this Area.
         */
        name: string;

        /**
         * The Map this Area is a part of.
         */
        map: IMapsCreatrMap;

        /**
         * A list of PreThing and macro commands to build this area from scratch.
         */
        creation: any[];

        /**
         * Groups that may be requested by creation commands to store generated
         * Things, so they may reference each other during gameplay.
         */
        collections?: any;

        /**
         * The boundaries for the map; these all start at 0 and are stretched by
         * PreThings placed inside.
         */
        boundaries: {
            "top": number;
            "right": number;
            "bottom": number;
            "left": number;
        };

        /**
         * Optional listing of Things to provide to place at the end of the Area.
         */
        afters?: (string | IPreThingSettings)[];

        /**
         * Optional listing of Things to provide to stretch across the Area.
         */
        stretches?: (string | IPreThingSettings)[];
    }

    /**
     * A Location parsed from a raw JSON-friendly Map description.
     */
    export interface IMapsCreatrLocation {
        /**
         * The user-friendly label for this Location.
         */
        name: string;

        /**
         * The Area this Location is a part of.
         */
        area: IMapsCreatrArea;

        /**
         * The source name for the keyed entry Function used for this Location.
         */
        entryRaw?: string;

        /**
         * The entrance Function used to enter this Location.
         */
        entry?: Function;
    }

    /**
     * Settings to create an IPreThing.
     */
    export interface IPreThingSettings {
        /**
         * The horizontal starting location of the Thing (by default, 0).
         */
        x?: number;

        /**
         * The vertical starting location of the Thing (by default, 0).
         */
        y?: number;

        /**
         * How wide the Thing is (by default, the Thing's prototype's width from
         * ObjectMaker.getFullPropertiesOf).
         */
        width?: number;

        /**
         * How tall the Thing is (by default, the Thing's prototype's height from
         * ObjectMaker.getFullPropertiesOf).
         */
        height?: number;

        /**
         * An optional immediate modifier instruction for where the Thing should be
         * in its GroupHoldr group (either "beginning", "end", or undefined).
         */
        position?: string;

        /**
         * PreThings may pass any settings onto their created Things.
         */
        [i: string]: any;
    }

    /**
     * A position holder around an in-game Thing.
     */
    export interface IPreThing {
        /**
         * The in-game Thing.
         */
        thing: IThing;

        /**
         * What type the Thing is.
         */
        title: any;

        /**
         * The raw JSON-friendly settings that created this.
         */
        reference: IPreThingSettings;

        /**
         * Whether the Thing has been placed in the container Map.
         */
        spawned: boolean;

        /**
         * The top edge of the Thing's bounding box.
         */
        top: number;

        /**
         * The right edge of the Thing's bounding box.
         */
        right: number;

        /**
         * The bottom edge of the Thing's bounding box.
         */
        bottom: number;

        /**
         * The left edge of the Thing's bounding box.
         */
        left: number;

        /**
         * What part of the in-game container group to move this to, if needed.
         */
        position?: string;
    }

    /**
     * Parsed PreThings from an Area's creation's command analysis.
     */
    export interface IPreThingsRawContainer {
        [i: string]: IPreThing[];
    }

    /**
     * A collection of PreThings sorted in all four directions.
     */
    export interface IPreThingsContainer {
        /**
         * PreThings sorted in increasing horizontal order.
         */
        xInc: IPreThing[];

        /**
         * PreThings sorted in decreasing horizontal order.
         */
        xDec: IPreThing[];

        /**
         * PreThings sorted in increasing vertical order.
         */
        yInc: IPreThing[];

        /**
         * PreThings sorted in decreasing vertical order.
         */
        yDec: IPreThing[];

        /**
         * Adds a PreThing to each sorted collection.
         * 
         * @param prething   A Prething to add.
         */
        push(prething: IPreThing): void;
    }

    /**
     * A collection of PreThing containers, keyed by group name.
     */
    export interface IPreThingsContainers {
        [i: string]: IPreThingsContainer;
    }

    /**
     * An in-game object created from an IPreThing.
     */
    export interface IThing {
        /**
         * The name of the Thing's constructor type, from the MapsCreatr's ObjectMakr.
         */
        title: string;

        /**
         * An optional group for the Thing to be in, keyed by its id.
         */
        collection?: any;

        /**
         * The key of the collection to place this Thing in, if collection isn't undefined.
         */
        collectionKey?: string;

        /**
         * The name this is referred to in its collection, if collection isn't undefined.
         */
        collectionName?: string;

        /**
         * Whether this should skip stretching the boundaries of an area
         */
        noBoundaryStretch?: boolean;
    }

    /**
     * A Function used to enter a Map Location.
     * 
     * @param scope   The container scope causing the entrance.
     * @param location   The Location within an Area being entered.
     */
    export interface IMapsCreatrEntrance {
        (scope: any, location: IMapsCreatrLocation): void;
    }

    /**
     * A Function to automate placing other PreThings or macros in an Area.
     * 
     * @param reference   The JSON-friendly reference causing the macro.
     * @param prethings   The container of PreThings this is adding to.
     * @param area   The container Area containing the PreThings.
     * @param map   The container Map containing the Area.
     * @param scope   The container scope running the macro.
     * @returns A single PreThing or macro descriptor, or Array thereof.
     */
    export interface IMapsCreatrMacro {
        (
            reference: any,
            prethings: IPreThingsContainers,
            area: IMapsCreatrArea | IMapsCreatrAreaRaw,
            map: IMapsCreatrMap | IMapsCreatrAreaRaw,
            scope: any
        ): IPreThing | IPreThing[] | any;
    }

    /**
     * Settings to initialize a new IMapsCreatr.
     */
    export interface IMapsCreatrSettings {
        /**
         * An ObjectMakr used to create Maps and Things.Note that it must store 
         * full properties of Things, for quick size lookups.
         */
        ObjectMaker: ObjectMakr.IObjectMakr;

        /**
         * The names of groups Things may be in.
         */
        groupTypes: string[];

        /**
         * The key for Things to determine what group they belong to (by default,
         * "groupType").
         */
        keyGroupType?: string;

        /**
         * The key for Things to determine what, if any, Location they act as an
         * entrance for (by default, "entrance").
         */
        keyEntrance?: string;

        /**
         * A listing of macros that can be used to automate common operations.
         */
        macros?: any;

        /**
         * A scope to give as a last parameter to macro Functions (by default, the
         * calling MapsCreatr).
         */
        scope?: any;

        /**
         * Optional entrance Functions that may be used as the openings for 
         * Locations.
         */
        entrances?: any;

        /**
         * Whether Locations must have an entrance Function defined by "entry" (by
         * default, false).
         */
        requireEntrance?: boolean;

        /**
         * Any maps that should be immediately stored via a storeMaps call, keyed
         * by name.
         */
        maps?: any;
    }

    /**
     * Storage container and lazy loader for GameStartr maps that is the back-end
     * counterpart to MapsHandlr. Maps are created with their custom Location and
     * Area members, which are initialized the first time the map is retrieved. 
     */
    export interface IMapsCreatr {
        /**
         * @returns The internal ObjectMakr.
         */
        getObjectMaker(): ObjectMakr.IObjectMakr;

        /**
         * @returns The allowed group types.
         */
        getGroupTypes(): string[];

        /**
         * @returns The key under which Things are to store their group.
         */
        getKeyGroupType(): string;

        /**
         * @returns The key under which Things declare themselves an entrance.
         */
        getKeyEntrance(): string;

        /**
         * @returns The allowed macro Functions.
         */
        getMacros(): { [i: string]: IMapsCreatrMacro; };

        /**
         * @returns The scope to give as a last parameter to macros.
         */
        getScope(): any;

        /**
         * @returns Whether Locations must have an entrance Function.
         */
        getRequireEntrance(): boolean;

        /**
         * @returns The Object storing raw maps, keyed by name.
         */
        getMapsRaw(): { [i: string]: IMapsCreatrMapRaw };

        /**
         * @returns The Object storing maps, keyed by name.
         */
        getMaps(): { [i: string]: IMapsCreatrMap };

        /**
         * @param name   A key to find the map under.
         * @returns The raw map keyed by the given name.
         */
        getMapRaw(name: string): IMapsCreatrMapRaw;

        /**
         * Getter for a map under the maps container. If the map has not yet been
         * initialized that is done here as lazy loading.
         * 
         * @param name   A key to find the map under.
         * @returns The parsed map keyed by the given name.
         */
        getMap(name: string): IMapsCreatrMap;

        /**
         * Creates and stores a set of new maps based on the key/value pairs in a 
         * given Object. These will be stored as maps by their string keys via 
         * this.storeMap.
         * 
         * @param maps   Raw maps keyed by their storage key.
         */
        storeMaps(maps: { [i: string]: IMapsCreatrMapRaw }): void;

        /**
         * Creates and stores a new map. The internal ObjectMaker factory is used to
         * auto-generate it based on a given settings object. The actual loading of
         * Areas and Locations is deferred to this.getMap.
         * 
         * @param name   A name under which the map should be stored.
         * @param mapRaw   A raw map to be stored.
         * @returns A Map object created by the internal ObjectMakr using the raw map.
         */
        storeMap(name: string, mapRaw: IMapsCreatrMapRaw): IMapsCreatrMap;

        /**
         * Given a Area, this processes and returns the PreThings that are to 
         * inhabit the Area per its creation instructions.
         * 
         * @returns A container with the parsed PreThings.
         */
        getPreThings(area: IMapsCreatrArea): IPreThingsContainers;

        /**
         * PreThing switcher: Given a JSON representation of a PreThing, this 
         * determines what to do with it. It may be a location setter (to switch the
         * x- and y- location offset), a macro (to repeat some number of actions),
         * or a raw PreThing.
         * 
         * @param reference   A JSON mapping of some number of PreThings. 
         * @param preThings   The PreThing containers within the Area.
         * @param {Area} area   The Area to be populated.
         * @param {Map} map   The Map containing the Area.
         * @returns The results of analyzePreMacro or analyzePreThing.
         */
        analyzePreSwitch(
            reference: any,
            prethings: IPreThingsContainers | IPreThingsRawContainer,
            area: IMapsCreatrArea | IMapsCreatrAreaRaw,
            map: IMapsCreatrMap | IMapsCreatrMapRaw): any;

        /**
         * PreThing case: Macro instruction. This calls the macro on the same input,
         * captures the output, and recursively repeats the analyzePreSwitch driver
         * function on the output(s). 
         * 
         * @param {Object} reference   A JSON mapping of some number of PreThings. 
         * @param preThings   The PreThing containers within the Area.
         * @param {Area} area   The Area to be populated.
         * @param {Map} map   The Map containing the Area.
         */
        analyzePreMacro(
            reference: any,
            prethings: IPreThingsContainers | IPreThingsRawContainer,
            area: IMapsCreatrArea | IMapsCreatrAreaRaw,
            map: IMapsCreatrMap | IMapsCreatrMapRaw): any[] | any;

        /**
         * Macro case: PreThing instruction. This creates a PreThing from the
         * given reference and adds it to its respective group in PreThings (based
         * on the PreThing's [keyGroupType] variable).
         * 
         * @param reference   A JSON mapping of some number of PreThings. 
         * @param preThings   The PreThing containers within the Area.
         * @param area   The Area to be populated by these PreThings.
         * @param map   The Map containing the Area.
         */
        analyzePreThing(
            reference: any,
            prethings: IPreThingsContainers | IPreThingsRawContainer,
            area: IMapsCreatrArea | IMapsCreatrAreaRaw,
            map: IMapsCreatrMap | IMapsCreatrMapRaw): any;
    }
}

namespace MapsCreatr {
    "use strict";

    /**
     * Basic storage container for a single Thing to be stored in an Area's
     * PreThings member. A PreThing stores an actual Thing along with basic
     * sizing and positioning information, so that a MapsHandler may accurately
     * spawn or unspawn it as needed.
     */
    export class PreThing implements IPreThing {
        /**
         * The contained Thing to be placed during gameplay.
         */
        public thing: IThing;

        /**
         * A copy of the Thing's title.
         */
        public title: any;

        /**
         * The creation command used to create the Thing.
         */
        public reference: any;

        /**
         * Whether this PreThing has already spawned (initially false).
         */
        public spawned: boolean;

        /**
         * The top edge of the Thing's bounding box.
         */
        public top: number;

        /**
         * The right edge of the Thing's bounding box.
         */
        public right: number;

        /**
         * The bottom edge of the Thing's bounding box.
         */
        public bottom: number;

        /**
         * The left edge of the Thing's bounding box.
         */
        public left: number;

        /**
         * An optional modifier instruction for group placement, from reference.
         */
        public position: string;

        /**
         * @param {Thing} thing   The Thing, freshly created by ObjectMaker.make.
         * @param {IPreThingSettings} reference   The creation Object instruction 
         *                                        used to create the Thing.
         */
        constructor(thing: IThing, reference: IPreThingSettings, ObjectMaker: ObjectMakr.IObjectMakr) {
            this.thing = thing;
            this.title = thing.title;
            this.reference = reference;
            this.spawned = false;

            this.left = reference.x || 0;
            this.top = reference.y || 0;

            this.right = this.left + (reference.width || ObjectMaker.getFullPropertiesOf(this.title).width);
            this.bottom = this.top + (reference.height || ObjectMaker.getFullPropertiesOf(this.title).height);

            if (reference.position) {
                this.position = reference.position;
            }
        }
    }
}


namespace MapsCreatr {
    "use strict";

    /**
     * Storage container and lazy loader for GameStartr maps that is the back-end
     * counterpart to MapsHandlr. Maps are created with their custom Location and
     * Area members, which are initialized the first time the map is retrieved. 
     */
    export class MapsCreatr {
        /**
         * ObjectMakr factory used to create Maps, Areas, Locations, and Things.
         */
        private ObjectMaker: ObjectMakr.IObjectMakr;

        /**
         * Raw map objects passed to this.createMap, keyed by name.
         */
        private mapsRaw: {
            [i: string]: IMapsCreatrMapRaw;
        };

        /**
         * Map objects created by this.createMap, keyed by name.
         */
        private maps: {
            [i: string]: IMapsCreatrMap
        };

        /**
         * The possible group types processed PreThings may be placed in.
         */
        private groupTypes: string[];

        /**
         * Macro functions to create PreThings, keyed by String alias.
         */
        private macros: {
            [i: string]: IMapsCreatrMacro;
        };

        /**
         * String key under which Things store their group.
         */
        private keyGroupType: string;

        /**
         * String key under which Things may store that they are a Location entrance.
         */
        private keyEntrance: string;

        /**
         * Allowed entrance Functions, keyed by string alias.
         */
        private entrances: {
            [i: string]: IMapsCreatrEntrance;
        };

        /**
         * Whether an entrance is required on all Locations.
         */
        private requireEntrance: boolean;

        /**
         * An optional scope to pass to macros as an argument after maps, instead
         * of this MapsCreatr.
         */
        private scope: any;

        /**
         * Initializes a new instance of the MapsCreatr class.
         * 
         * @param settings   Settings to be used for initialization.
         */
        constructor(settings: IMapsCreatrSettings) {
            if (!settings) {
                throw new Error("No settings object given to MapsCreatr.");
            }
            if (!settings.ObjectMaker) {
                throw new Error("No ObjectMakr given to MapsCreatr.");
            }
            if (typeof settings.ObjectMaker.getFullProperties() === "undefined") {
                throw new Error("MapsCreatr's ObjectMaker must store full properties.");
            }
            if (!settings.groupTypes) {
                throw new Error("No groupTypes given to MapsCreatr.");
            }

            this.ObjectMaker = settings.ObjectMaker;
            this.groupTypes = settings.groupTypes;

            this.keyGroupType = settings.keyGroupType || "groupType";
            this.keyEntrance = settings.keyEntrance || "entrance";

            this.macros = settings.macros || {};
            this.scope = settings.scope || this;

            this.entrances = settings.entrances;
            this.requireEntrance = settings.requireEntrance;

            this.mapsRaw = {};
            this.maps = {};
            if (settings.maps) {
                this.storeMaps(settings.maps);
            }
        }


        /* Simple gets
        */

        /**
         * @returns The internal ObjectMakr.
         */
        getObjectMaker(): ObjectMakr.IObjectMakr {
            return this.ObjectMaker;
        }

        /**
         * @returns The allowed group types.
         */
        getGroupTypes(): string[] {
            return this.groupTypes;
        }

        /**
         * @returns The key under which Things are to store their group.
         */
        getKeyGroupType(): string {
            return this.keyGroupType;
        }

        /**
         * @returns The key under which Things declare themselves an entrance.
         */
        getKeyEntrance(): string {
            return this.keyEntrance;
        }

        /**
         * @returns The allowed macro Functions.
         */
        getMacros(): { [i: string]: IMapsCreatrMacro; } {
            return this.macros;
        }

        /**
         * @returns The scope to give as a last parameter to macros.
         */
        getScope(): any {
            return this.scope;
        }

        /**
         * @returns Whether Locations must have an entrance Function.
         */
        getRequireEntrance(): boolean {
            return this.requireEntrance;
        }

        /**
         * @returns The Object storing raw maps, keyed by name.
         */
        getMapsRaw(): { [i: string]: IMapsCreatrMapRaw } {
            return this.mapsRaw;
        }

        /**
         * @returns The Object storing maps, keyed by name.
         */
        getMaps(): { [i: string]: IMapsCreatrMap } {
            return this.maps;
        }

        /**
         * @param name   A key to find the map under.
         * @returns The raw map keyed by the given name.
         */
        getMapRaw(name: string): IMapsCreatrMapRaw {
            var mapRaw: IMapsCreatrMapRaw = this.mapsRaw[name];
            if (!mapRaw) {
                throw new Error("No map found under: " + name);
            }

            return mapRaw;
        }

        /**
         * Getter for a map under the maps container. If the map has not yet been
         * initialized that is done here as lazy loading.
         * 
         * @param name   A key to find the map under.
         * @returns The parsed map keyed by the given name.
         */
        getMap(name: string): IMapsCreatrMap {
            var map: IMapsCreatrMap = this.maps[name];
            if (!map) {
                throw new Error("No map found under: " + name);
            }

            if (!map.initialized) {
                this.initializeMap(map);
            }

            return map;
        }

        /**
         * Creates and stores a set of new maps based on the key/value pairs in a 
         * given Object. These will be stored as maps by their string keys via 
         * this.storeMap.
         * 
         * @param maps   Raw maps keyed by their storage key.
         */
        storeMaps(maps: { [i: string]: IMapsCreatrMapRaw }): void {
            var i: string;

            for (i in maps) {
                if (maps.hasOwnProperty(i)) {
                    this.storeMap(i, maps[i]);
                }
            }
        }

        /**
         * Creates and stores a new map. The internal ObjectMaker factory is used to
         * auto-generate it based on a given settings object. The actual loading of
         * Areas and Locations is deferred to this.getMap.
         * 
         * @param name   A name under which the map should be stored.
         * @param mapRaw   A raw map to be stored.
         * @returns A Map object created by the internal ObjectMakr using the raw map.
         */
        storeMap(name: string, mapRaw: IMapsCreatrMapRaw): IMapsCreatrMap {
            if (!name) {
                throw new Error("Maps cannot be created with no name.");
            }

            var map: IMapsCreatrMap = this.ObjectMaker.make("Map", mapRaw);

            this.mapsRaw[name] = mapRaw;

            if (!map.areas) {
                throw new Error("Maps cannot be used with no areas: " + name);
            }

            if (!map.locations) {
                throw new Error("Maps cannot be used with no locations: " + name);
            }

            this.maps[name] = map;
            return map;
        }


        /* Area setup (PreThing analysis)
        */

        /**
         * Given a Area, this processes and returns the PreThings that are to 
         * inhabit the Area per its creation instructions.
         * 
         * @returns A container with the parsed PreThings.
         */
        getPreThings(area: IMapsCreatrArea): IPreThingsContainers {
            var map: IMapsCreatrMap = area.map,
                creation: any = area.creation,
                prethings: IPreThingsRawContainer = this.createObjectFromStringArray(this.groupTypes),
                i: number;

            area.collections = {};

            for (i = 0; i < creation.length; i += 1) {
                this.analyzePreSwitch(creation[i], prethings, area, map);
            }

            return this.processPreThingsArrays(prethings);
        }

        /**
         * PreThing switcher: Given a JSON representation of a PreThing, this 
         * determines what to do with it. It may be a location setter (to switch the
         * x- and y- location offset), a macro (to repeat some number of actions),
         * or a raw PreThing.
         * 
         * @param reference   A JSON mapping of some number of PreThings. 
         * @param preThings   The PreThing containers within the Area.
         * @param {Area} area   The Area to be populated.
         * @param {Map} map   The Map containing the Area.
         * @returns The results of analyzePreMacro or analyzePreThing.
         */
        analyzePreSwitch(
            reference: any,
            prethings: IPreThingsContainers | IPreThingsRawContainer,
            area: IMapsCreatrArea | IMapsCreatrAreaRaw,
            map: IMapsCreatrMap | IMapsCreatrMapRaw): any {
            // Case: macro (unless it's undefined)
            if (reference.macro) {
                return this.analyzePreMacro(reference, prethings, area, map);
            } else {
                // Case: default (a regular PreThing)
                return this.analyzePreThing(reference, prethings, area, map);
            }
        }

        /**
         * PreThing case: Macro instruction. This calls the macro on the same input,
         * captures the output, and recursively repeats the analyzePreSwitch driver
         * function on the output(s). 
         * 
         * @param {Object} reference   A JSON mapping of some number of PreThings. 
         * @param preThings   The PreThing containers within the Area.
         * @param {Area} area   The Area to be populated.
         * @param {Map} map   The Map containing the Area.
         */
        analyzePreMacro(
            reference: any,
            prethings: IPreThingsContainers | IPreThingsRawContainer,
            area: IMapsCreatrArea | IMapsCreatrAreaRaw,
            map: IMapsCreatrMap | IMapsCreatrMapRaw): any[] | any {
            var macro: any = this.macros[reference.macro],
                outputs: any[] | any,
                i: number;

            if (!macro) {
                throw new Error("A non-existent macro is referenced: '" + reference.macro + "'.");
            }

            // Avoid modifying the original macro by creating a new object in its
            // place, while submissively proliferating any default macro settings
            outputs = macro(reference, prethings, area, map, this.scope);

            // If there is any output, recurse on all components of it, Array or not
            if (outputs) {
                if (outputs instanceof Array) {
                    for (i = 0; i < outputs.length; i += 1) {
                        this.analyzePreSwitch(outputs[i], prethings, area, map);
                    }
                } else {
                    this.analyzePreSwitch(outputs, prethings, area, map);
                }
            }

            return outputs;
        }

        /**
         * Macro case: PreThing instruction. This creates a PreThing from the
         * given reference and adds it to its respective group in PreThings (based
         * on the PreThing's [keyGroupType] variable).
         * 
         * @param reference   A JSON mapping of some number of PreThings. 
         * @param preThings   The PreThing containers within the Area.
         * @param area   The Area to be populated by these PreThings.
         * @param map   The Map containing the Area.
         */
        analyzePreThing(
            reference: any,
            prethings: IPreThingsContainers | IPreThingsRawContainer,
            area: IMapsCreatrArea | IMapsCreatrAreaRaw,
            map: IMapsCreatrMap | IMapsCreatrMapRaw): any {
            var title: string = reference.thing,
                thing: IThing,
                prething: PreThing;

            if (!this.ObjectMaker.hasFunction(title)) {
                throw new Error("A non-existent Thing type is referenced: '" + title + "'.");
            }

            prething = new PreThing(this.ObjectMaker.make(title, reference), reference, this.ObjectMaker);
            thing = prething.thing;

            if (!prething.thing[this.keyGroupType]) {
                throw new Error("A Thing of type '" + title + "' does not contain a " + this.keyGroupType + ".");
            }

            if (this.groupTypes.indexOf(prething.thing[this.keyGroupType]) === -1) {
                throw new Error("A Thing of type '" + title + "' contains an unknown " + this.keyGroupType + ".");
            }

            prethings[prething.thing[this.keyGroupType]].push(prething);
            if (!thing.noBoundaryStretch && (<IMapsCreatrArea>area).boundaries) {
                this.stretchAreaBoundaries(prething, <IMapsCreatrArea>area);
            }

            // If a Thing is an entrance, then the entrance's location must know the Thing.
            if (thing[this.keyEntrance] !== undefined && typeof thing[this.keyEntrance] !== "object") {
                if (typeof map.locations[thing[this.keyEntrance]] !== "undefined") {
                    if (typeof map.locations[thing[this.keyEntrance]].xloc === "undefined") {
                        map.locations[thing[this.keyEntrance]].xloc = prething.left;
                    }
                    if (typeof map.locations[thing[this.keyEntrance]].yloc === "undefined") {
                        map.locations[thing[this.keyEntrance]].yloc = prething.top;
                    }

                    map.locations[thing[this.keyEntrance]].entrance = prething.thing;
                }
            }

            if (reference.collectionName && (<IMapsCreatrArea>area).collections) {
                this.ensureThingCollection(
                    thing,
                    reference.collectionName,
                    reference.collectionKey,
                    <IMapsCreatrArea>area
                );
            }

            return prething;
        }


        /* Map initialization
        */

        /**
         * Parses the Areas and Locations in a map to make it ready for use.
         * 
         * @param map   A map to be initialized.
         */
        private initializeMap(map: IMapsCreatrMap): void {
            // Set the one-to-many Map->Area relationships within the Map
            this.setMapAreas(map);

            // Set the one-to-many Area->Location relationships within the Map
            this.setMapLocations(map);

            map.initialized = true;
        }

        /**
         * Converts the raw area settings in a Map into Area objects.
         * 
         * @param map   A map whose area settings should be parsed.
         */
        private setMapAreas(map: IMapsCreatrMap): void {
            var areasRaw: any = map.areas,
                locationsRaw: any = map.locations,
                // The parsed containers should be the same types as the originals
                areasParsed: any = new areasRaw.constructor(),
                locationsParsed: any = new locationsRaw.constructor(),
                area: IMapsCreatrArea,
                location: IMapsCreatrLocation,
                i: string;

            // Parse all the Area objects (works for both Arrays and Objects)
            for (i in areasRaw) {
                if (areasRaw.hasOwnProperty(i)) {
                    area = this.ObjectMaker.make("Area", areasRaw[i]);
                    areasParsed[i] = area;

                    area.map = map;
                    area.name = i;

                    area.boundaries = {
                        "top": 0,
                        "right": 0,
                        "bottom": 0,
                        "left": 0
                    };
                }
            }

            // Parse all the Location objects (works for both Arrays and Objects)
            for (i in locationsRaw) {
                if (locationsRaw.hasOwnProperty(i)) {
                    location = this.ObjectMaker.make("Location", locationsRaw[i]);
                    locationsParsed[i] = location;

                    location.entryRaw = locationsRaw[i].entry;
                    location.name = i;
                    location.area = locationsRaw[i].area || 0;

                    if (this.requireEntrance) {
                        if (!this.entrances.hasOwnProperty(location.entryRaw)) {
                            throw new Error("Location " + i + " has unknown entry string: " + location.entryRaw);
                        }
                    }

                    if (this.entrances && location.entryRaw) {
                        location.entry = this.entrances[location.entryRaw];
                    } else if (location.entry && location.entry.constructor === String) {
                        location.entry = this.entrances[String(location.entry)];
                    }
                }
            }

            // Store the output object in the Map, and keep the raw settings for the
            // sake of debugging / user interest
            map.areas = areasParsed;
            map.locations = locationsParsed;
        }

        /**
         * Converts the raw location settings in a Map into Location objects.
         * 
         * @param {Map} map
         */
        private setMapLocations(map: IMapsCreatrMap): void {
            var locationsRaw: any = map.locations,
                // The parsed container should be the same type as the original
                locationsParsed: any = new locationsRaw.constructor(),
                location: IMapsCreatrLocation,
                i: string;

            // Parse all the keys in locasRaw (works for both Arrays and Objects)
            for (i in locationsRaw) {
                if (locationsRaw.hasOwnProperty(i)) {
                    location = this.ObjectMaker.make("Location", locationsRaw[i]);
                    locationsParsed[i] = location;

                    // The area should be an object reference, under the Map's areas
                    location.area = map.areas[locationsRaw[i].area || 0];
                    if (!locationsParsed[i].area) {
                        throw new Error("Location " + i + " references an invalid area:" + locationsRaw[i].area);
                    }
                }
            }

            // Store the output object in the Map, and keep the old settings for the
            // sake of debugging / user interest
            map.locations = locationsParsed;
        }

        /**
         * "Stretches" an Area's boundaries based on a PreThing. For each direction,
         * if the PreThing has a more extreme version of it (higher top, etc.), the
         * boundary is updated.
         * 
         * @param prething   The PreThing stretching the Area's boundaries.
         * @param area   An Area containing the PreThing.
         */
        private stretchAreaBoundaries(prething: PreThing, area: IMapsCreatrArea): void {
            var boundaries: any = area.boundaries;

            boundaries.top = Math.min(prething.top, boundaries.top);
            boundaries.right = Math.max(prething.right, boundaries.right);
            boundaries.bottom = Math.max(prething.bottom, boundaries.bottom);
            boundaries.left = Math.min(prething.left, boundaries.left);
        }

        /**
         * Adds a Thing to the specified collection in the Map's Area. If the collection
         * doesn't exist yet, it's created.
         * 
         * @param thing   The thing that has specified a collection.
         * @param collectionName   The name of the collection.
         * @param collectionKey   The key under which the collection should store 
         *                        the Thing.
         * @param area   The Area containing the collection.
         */
        private ensureThingCollection(thing: IThing, collectionName: string, collectionKey: string, area: IMapsCreatrArea): void {
            var collection: any = area.collections[collectionName];

            if (!collection) {
                collection = area.collections[collectionName] = {};
            }

            thing.collection = collection;
            collection[collectionKey] = thing;
        }

        /**
         * Creates an Object wrapper around a PreThings Object with versions of each 
         * child PreThing[] sorted by xloc and yloc, in increasing and decreasing order.
         * 
         * @param prethings   A raw container of PreThings.
         * @returns A PreThing wrapper with the keys "xInc", "xDec", "yInc", and "yDec".
         */
        private processPreThingsArrays(prethings: IPreThingsRawContainer): IPreThingsContainers {
            var output: IPreThingsContainers = {},
                i: string;

            for (i in prethings) {
                if (prethings.hasOwnProperty(i)) {
                    var children: IPreThing[] = prethings[i],
                        array: IPreThingsContainer = {
                            "xInc": this.getArraySorted(children, this.sortPreThingsXInc),
                            "xDec": this.getArraySorted(children, this.sortPreThingsXDec),
                            "yInc": this.getArraySorted(children, this.sortPreThingsYInc),
                            "yDec": this.getArraySorted(children, this.sortPreThingsYDec),
                            "push": (prething: IPreThing): void => {
                                this.addArraySorted(array.xInc, prething, this.sortPreThingsXInc);
                                this.addArraySorted(array.xDec, prething, this.sortPreThingsXDec);
                                this.addArraySorted(array.yInc, prething, this.sortPreThingsYInc);
                                this.addArraySorted(array.yDec, prething, this.sortPreThingsYDec);
                            }
                        };

                    output[i] = array;
                }
            }

            return output;
        }


        /* Utilities
        */

        /**
         * Creates an Object pre-populated with one key for each of the Strings in
         * the input Array, each pointing to a new Array. 
         * 
         * @param array   An Array listing the keys to be made into an Object.
         * @returns An Object with the keys listed in the Array.
         */
        private createObjectFromStringArray(array: string[]): any {
            var output: any = {},
                i: number;

            for (i = 0; i < array.length; i += 1) {
                output[array[i]] = [];
            }

            return output;
        }

        /**
         * Returns a shallow copy of an Array, in sorted order based on a given
         * sorter Function.
         * 
         * @param array   An Array to be sorted.
         * @param sorter   A standard sorter Function.
         * @returns A copy of the original Array, sorted.
         */
        private getArraySorted(array: any[], sorter?: (a: any, b: any) => number): any[] {
            var copy: any[] = array.slice();
            copy.sort(sorter);
            return copy;
        }

        /**
         * Adds an element into an Array using a binary search with a sorter Function. 
         * 
         * @param array   An Array to insert the element into.
         * @param element   An element to insert into the Array.
         * @param sorter   A standard sorter Function.
         */
        private addArraySorted(array: any, element: any, sorter: (a: any, b: any) => number): void {
            var lower: number = 0,
                upper: number = array.length,
                index: number;

            while (lower !== upper) {
                index = ((lower + upper) / 2) | 0;

                // Case: element is less than the index
                if (sorter(element, array[index]) < 0) {
                    upper = index;
                } else {
                    // Case: element is higher than the index
                    lower = index + 1;
                }
            }

            if (lower === upper) {
                array.splice(lower, 0, element);
                return;
            }
        }

        /**
         * Sorter for PreThings that results in increasing horizontal order.
         * 
         * @param a   A PreThing.
         * @param b   A PreThing.
         */
        private sortPreThingsXInc(a: PreThing, b: PreThing): number {
            return a.left === b.left ? a.top - b.top : a.left - b.left;
        }

        /**
         * Sorter for PreThings that results in decreasing horizontal order.
         * 
         * @param a   A PreThing.
         * @param b   A PreThing.
         */
        private sortPreThingsXDec(a: PreThing, b: PreThing): number {
            return b.right === a.right ? b.bottom - a.bottom : b.right - a.right;
        }

        /**
         * Sorter for PreThings that results in increasing vertical order.
         * 
         * @param a   A PreThing.
         * @param b   A PreThing.
         */
        private sortPreThingsYInc(a: PreThing, b: PreThing): number {
            return a.top === b.top ? a.left - b.left : a.top - b.top;
        }

        /**
         * Sorter for PreThings that results in decreasing vertical order.
         * 
         * @param a   A PreThing.
         * @param b   A PreThing.
         */
        private sortPreThingsYDec(a: PreThing, b: PreThing): number {
            return b.bottom === a.bottom ? b.right - a.right : b.bottom - a.bottom;
        }
    }
}
