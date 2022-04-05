/// <reference path="ChangeLinr-0.2.0.ts" />
/// <reference path="GroupHoldr-0.2.1.ts" />
/// <reference path="InputWritr-0.2.0.ts" />
/// <reference path="MapsCreatr-0.2.1.ts" />
/// <reference path="MapScreenr-0.2.1.ts" />
/// <reference path="AreaSpawnr-0.2.0.ts" />
/// <reference path="ObjectMakr-0.2.2.ts" />
/// <reference path="PixelDrawr-0.2.0.ts" />
/// <reference path="PixelRendr-0.2.0.ts" />
/// <reference path="QuadsKeepr-0.2.1.ts" />
/// <reference path="ItemsHoldr-0.2.1.ts" />
/// <reference path="StringFilr-0.2.1.ts" />
/// <reference path="TimeHandlr-0.2.0.ts" />

declare namespace LevelEditr {
    export interface IGameStartr {
        settings: any;
        GroupHolder: GroupHoldr.IGroupHoldr;
        InputWriter: InputWritr.IInputWritr;
        MapsCreator: MapsCreatr.IMapsCreatr;
        MapScreener: MapScreenr.IMapScreenr;
        AreaSpawner: AreaSpawnr.IAreaSpawnr;
        ObjectMaker: ObjectMakr.IObjectMakr;
        PixelDrawer: PixelDrawr.IPixelDrawr;
        ItemsHolder: ItemsHoldr.IItemsHoldr;
        TimeHandler: TimeHandlr.ITimeHandlr;
        player: IPlayer;
        container: HTMLDivElement;
        scale: number;
        unitsize: number;
        addPageStyles(styles: any): void;
        addThing(thing: IThing, x?: number, y?: number): IThing;
        createElement(tag: "a", ...args: any[]): HTMLLinkElement;
        createElement(tag: "div", ...args: any[]): HTMLDivElement;
        createElement(tag: "h1", ...args: any[]): HTMLHeadingElement;
        createElement(tag: "h2", ...args: any[]): HTMLHeadingElement;
        createElement(tag: "h3", ...args: any[]): HTMLHeadingElement;
        createElement(tag: "h4", ...args: any[]): HTMLHeadingElement;
        createElement(tag: "input", ...args: any[]): HTMLInputElement;
        createElement(tag: "select", ...args: any[]): HTMLSelectElement;
        createElement(tag: string, ...args: any[]): HTMLElement;
        killNormal(thing: IThing): void;
        proliferateElement(recipient: HTMLElement, donor: any, noOverride?: boolean): void;
        setLeft(thing: IThing, left: number): void;
        setMap(name: string, location?: string): void;
        setRight(thing: IThing, right: number): void;
        setTop(thing: IThing, top: number): void;
        shiftHoriz(thing: IThing, dx: number, notChanged?: boolean): void;
        proliferate(recipient: any, donor: any, noOverride?: boolean): any;
        scrollWindow(x: number): void;
    }

    export interface IThing extends PixelDrawr.IThing, MapsCreatr.IThing {
        width: number;
        height: number;
        left: number;
        outerok: boolean | number;
    }

    export interface IPlayer extends IThing {
        dead: boolean;
    }

    export interface IPreThing extends MapsCreatr.IPreThing {
        thing: IThing;
        xloc: number;
        yloc: number;
    }

    export interface IPreThingDescriptor {
        offsetTop?: number;
        offsetLeft?: number;
        width?: IPreThingDimensionDescriptor;
        height?: IPreThingDimensionDescriptor;
        options?: {
            [i: string]: IPreThingDimensionDescriptor;
        };
    }

    export interface IPreThingDimensionDescriptor {
        type?: string;
        value?: any;
        Infinite?: any;
        mod?: number;
        real?: number;
    }

    export interface IMapsCreatrMapRaw extends MapsCreatr.IMapsCreatrMapRaw {
        time: number;
        areas: {
            [i: string]: IMapsCreatrAreaRaw;
        };
    }

    export interface IMapsCreatrAreaRaw extends MapsCreatr.IMapsCreatrAreaRaw {
        setting?: string;
    }

    export interface IDataMouseEvent extends MouseEvent {
        dataTransfer: DataTransfer;
    }

    export interface IDataProgressEvent extends ProgressEvent {
        currentTarget: IDataEventTarget;
    }

    export interface IDataEventTarget extends EventTarget {
        result: string;
    }

    export interface IThingIcon extends HTMLDivElement {
        options: any[];
    }

    export interface IDisplayContainer {
        "container": HTMLDivElement;
        "scrollers": {
            "container": HTMLDivElement;
            "left": HTMLDivElement;
            "right": HTMLDivElement;
        };
        "gui": HTMLDivElement;
        "head": HTMLDivElement;
        "namer": HTMLInputElement;
        "minimizer": HTMLDivElement;
        "stringer": {
            "textarea": HTMLTextAreaElement;
            "messenger": HTMLDivElement;
        };
        "inputDummy": HTMLInputElement;
        "sections": {
            "ClickToPlace": {
                "container": HTMLDivElement;
                "Things": HTMLDivElement;
                "Macros": HTMLDivElement;
                "VisualOptions": HTMLDivElement;
            };
            "MapSettings": {
                "container": HTMLDivElement;
                "Time": HTMLSelectElement;
                "Setting": {
                    "Primary": HTMLSelectElement;
                    "Secondary": HTMLSelectElement;
                    "Tertiary": HTMLSelectElement;
                };
                "Area": HTMLSelectElement;
                "Location": HTMLSelectElement;
                "Entry": HTMLSelectElement;
            };
            "JSON": HTMLDivElement;
            "buttons": {
                "ClickToPlace": {
                    "container": HTMLDivElement;
                    "Things": HTMLDivElement;
                    "Macros": HTMLDivElement;
                };
                "MapSettings": HTMLDivElement;
                "JSON": HTMLDivElement;
            }
        };
    }

    export interface ILevelEditrSettings {
        GameStarter: IGameStartr;
        prethings: { [i: string]: IPreThing[] };
        thingGroups: string[];
        things: { [i: string]: IThing };
        macros: { [i: string]: MapsCreatr.IMapsCreatrMacro };
        beautifier: (text: string) => string;
        mapNameDefault?: string;
        mapTimeDefault?: number;
        mapSettingDefault?: string;
        mapEntrances?: string[];
        mapDefault?: IMapsCreatrMapRaw;
        blocksize?: number;
        keyUndefined?: string;
    }

    export interface ILevelEditr {
        getEnabled(): boolean;
        enable(): void;
        disable(): void;
        minimize(): void;
        maximize(): void;
        startBuilding(): void;
        startPlaying(): void;
        downloadCurrentJSON(): void;
        setCurrentJSON(json: string): void;
        loadCurrentJSON(): void;
        beautify(text: string): string;
        handleUploadCompletion(event: IDataProgressEvent): void;
    }
}


namespace LevelEditr {
    "use strict";

    /**
     * A level editor designed to work natively on top of an existing GameStartr
     * sub-class.
     */
    export class LevelEditr implements ILevelEditr {
        /**
         * Whether the editor is currently visible and active.
         */
        private enabled: boolean;

        /**
         * The container game object to store Thing and map information
         */
        private GameStarter: IGameStartr;

        /**
         * The GameStarter's settings before this LevelEditr was enabled
         */
        private oldInformation: any;

        /**
         * The listings of PreThings that the GUI displays
         */
        private prethings: {
            [i: string]: IPreThingDescriptor[];
        };

        /**
         * The listing of groups that Things may fall into
         */
        private thingGroups: string[];

        /**
         * The complete list of Things that may be placed
         */
        private things: {
            [i: string]: IPreThingDescriptor;
        };

        /**
         * The listings of macros that the GUI display
         */
        private macros: {
            [i: string]: MapsCreatr.IMapsCreatrMacro;
        };

        /**
         * The default String name of the map
         */
        private mapNameDefault: string;

        /**
         * The default integer time of the map
         */
        private mapTimeDefault: number;

        /**
         * The default String setting of the map's areas
         */
        private mapSettingDefault: string;

        /**
         * The allowed String entries of the map's locations
         */
        private mapEntrances: string[];

        /**
         * The starting Object used as a default template for new maps
         */
        private mapDefault: IMapsCreatrMapRaw;

        /**
         * An Object containing the display's HTML elements
         */
        private display: IDisplayContainer;

        /**
         * The current mode of editing as a string, such as "Build" or "Play"
         */
        private currentMode: string;

        /**
         * The current mode of click as a string, such as "Thing" or "Macro"
         */
        private currentClickMode: string;

        /**
         * What size "blocks" placed Things should snap to
         */
        private blocksize: number;

        /**
         * A Function to beautify text given to the map displayer, such as js_beautify
         */
        private beautifier: (text: string) => string;

        /**
         * The currently selected Thing to be placed
         */
        private currentPreThings: IPreThing[];

        /**
         * The type string of the currently selected thing, such as "Koopa"
         */
        private currentTitle: string;

        /**
         * The current arguments for currentPreThings, such as { "smart": true }
         */
        private currentArgs: any;

        /**
         * Whether the pageStyle styles have been added to the page
         */
        private pageStylesAdded: boolean;

        /**
         * A key to use in dropdowns to should indicate an undefined value
         */
        private keyUndefined: string;

        /**
         * Whether clicking to place a Thing or macro is currently allowed.
         */
        private canClick: boolean;

        /**
         * @param {ILevelEditrSettings} settings
         */
        constructor(settings: ILevelEditrSettings) {
            if (typeof settings === "undefined") {
                throw new Error("No settings object given to LevelEditr.");
            }
            if (typeof settings.prethings === "undefined") {
                throw new Error("No prethings given to LevelEditr.");
            }
            if (typeof settings.thingGroups === "undefined") {
                throw new Error("No thingGroups given to LevelEditr.");
            }
            if (typeof settings.things === "undefined") {
                throw new Error("No things given to LevelEditr.");
            }
            if (typeof settings.macros === "undefined") {
                throw new Error("No macros given to LevelEditr.");
            }
            if (typeof settings.beautifier === "undefined") {
                throw new Error("No beautifier given to LevelEditr.");
            }

            this.enabled = false;

            this.GameStarter = settings.GameStarter;
            this.prethings = settings.prethings;
            this.thingGroups = settings.thingGroups;
            this.things = settings.things;
            this.macros = settings.macros;
            this.beautifier = settings.beautifier;
            this.mapNameDefault = settings.mapNameDefault || "New Map";
            this.mapTimeDefault = settings.mapTimeDefault || Infinity;
            this.mapSettingDefault = settings.mapSettingDefault || "";
            this.mapEntrances = settings.mapEntrances || [];
            this.mapDefault = settings.mapDefault;
            this.blocksize = settings.blocksize || 1;
            this.keyUndefined = settings.keyUndefined || "-none-";

            this.currentPreThings = [];
            this.currentMode = "Build";
            this.currentClickMode = "Thing";
            this.canClick = true;
        }


        /* Simple gets
        */

        getEnabled(): boolean {
            return this.enabled;
        }

        /**
         * 
         */
        getGameStarter(): IGameStartr {
            return this.GameStarter;
        }

        /**
         * 
         */
        getOldInformation(): any {
            return this.oldInformation;
        }

        /**
         * 
         */
        getPreThings(): { [i: string]: IPreThingDimensionDescriptor[] } {
            return this.prethings;
        }

        /**
         * 
         */
        getThingGroups(): string[] {
            return this.thingGroups;
        }

        /**
         * 
         */
        getThings(): { [i: string]: IPreThingDescriptor } {
            return this.things;
        }

        /**
         * 
         */
        getMacros(): { [i: string]: MapsCreatr.IMapsCreatrMacro } {
            return this.macros;
        }

        /**
         * 
         */
        getMapNameDefault(): string {
            return this.mapNameDefault;
        }

        /**
         * 
         */
        getMapTimeDefault(): number {
            return this.mapTimeDefault;
        }

        /**
         * 
         */
        getMapDefault(): IMapsCreatrMapRaw {
            return this.mapDefault;
        }

        /**
         * 
         */
        getDisplay(): IDisplayContainer {
            return this.display;
        }

        /**
         * 
         */
        getCurrentMode(): string {
            return this.currentMode;
        }

        /**
         * 
         */
        getBlockSize(): number {
            return this.blocksize;
        }

        /**
         * 
         */
        getBeautifier(): (text: string) => string {
            return this.beautifier;
        }

        /**
         * 
         */
        getCurrentPreThings(): IPreThing[] {
            return this.currentPreThings;
        }

        /**
         * 
         */
        getCurrentTitle(): string {
            return this.currentTitle;
        }

        /**
         * 
         */
        getCurrentArgs(): any {
            return this.currentArgs;
        }

        /**
         * 
         */
        getPageStylesAdded(): boolean {
            return this.pageStylesAdded;
        }

        /**
         * 
         */
        getKeyUndefined(): string {
            return this.keyUndefined;
        }

        /**
         * 
         */
        getCanClick(): boolean {
            return this.canClick;
        }

        /* State resets
        */

        /**
         * 
         */
        enable(): void {
            if (this.enabled) {
                return;
            }
            this.enabled = true;

            this.oldInformation = {
                "map": this.GameStarter.AreaSpawner.getMapName()
            };

            this.clearAllThings();
            this.resetDisplay();
            this.setCurrentMode("Build");
            (<any>this.GameStarter.MapScreener).nokeys = true;

            this.setTextareaValue(this.stringifySmart(this.mapDefault), true);
            this.resetDisplayMap();
            this.disableAllThings();

            this.GameStarter.ItemsHolder.setItem("lives", Infinity);

            if (!this.pageStylesAdded) {
                this.GameStarter.addPageStyles(this.createPageStyles());
                this.pageStylesAdded = true;
            }

            this.GameStarter.container.insertBefore(this.display.container, this.GameStarter.container.children[0]);
        }

        /**
         * 
         */
        disable(): void {
            if (!this.display || !this.enabled) {
                return;
            }

            this.GameStarter.container.removeChild(this.display.container);
            this.display = undefined;

            this.GameStarter.setMap(this.oldInformation.map);
            this.GameStarter.ItemsHolder.setItem(
                "lives",
                (<any>this.GameStarter.settings.statistics.values).lives.valueDefault);

            this.enabled = false;
        }

        /**
         * 
         */
        minimize(): void {
            this.display.minimizer.innerText = "+";
            this.display.minimizer.onclick = this.maximize.bind(this);
            this.display.container.className += " minimized";

            this.display.scrollers.container.style.opacity = "0";
        }

        /**
         * 
         */
        maximize(): void {
            this.display.minimizer.innerText = "-";
            this.display.minimizer.onclick = this.minimize.bind(this);

            if (this.display.container.className.indexOf("minimized") !== -1) {
                this.display.container.className = this.display.container.className.replace(/ minimized/g, "");
            }

            if (this.currentClickMode === "Thing") {
                this.setSectionClickToPlaceThings();
            } else if (this.currentClickMode === "Macro") {
                this.setSectionClickToPlaceMacros();
            }

            this.display.scrollers.container.style.opacity = "1";
        }

        /**
         * 
         */
        startBuilding(): void {
            this.setCurrentMode("Build");

            this.beautifyTextareaValue();
            this.setDisplayMap(true);
            this.maximize();
        }

        /**
         * 
         */
        startPlaying(): void {
            this.setCurrentMode("Play");

            this.beautifyTextareaValue();
            this.setDisplayMap();
            this.minimize();
        }

        /**
         * 
         */
        downloadCurrentJSON(): void {
            var link: HTMLLinkElement = this.downloadFile(this.getMapName() + ".json", this.display.stringer.textarea.value || "");
            window.open(link.href);
        }

        /**
         * 
         */
        setCurrentJSON(json: string): void {
            this.startBuilding();
            this.setTextareaValue(json, true);
            this.getMapObjectAndTry();
        }

        /**
         * 
         */
        loadCurrentJSON(): void {
            this.display.inputDummy.click();
        }

        /**
         * 
         */
        beautify(text: string): string {
            return this.beautifier(text);
        }


        /* Interactivity
        */

        /**
         * 
         */
        handleUploadCompletion(event: IDataProgressEvent): void {
            this.enable();
            this.setCurrentJSON(event.currentTarget.result);
            this.setSectionJSON();
        }

        /**
         * 
         */
        private setCurrentMode(mode: string): void {
            this.currentMode = mode;
        }

        /**
         * 
         */
        private setCurrentClickMode(mode: string, event?: Event): void {
            this.currentClickMode = mode;
            this.cancelEvent(event);
        }

        /**
         * 
         */
        private setCurrentThing(title: string, x: number = 0, y: number = 0): void {
            var args: any = this.generateCurrentArgs(),
                description: IPreThingDescriptor = this.things[title],
                reference: MapsCreatr.IPreThingSettings = this.GameStarter.proliferate(
                    {
                        "outerok": 2
                    },
                    this.getNormalizedThingArguments(args)),
                thing: IThing = this.GameStarter.ObjectMaker.make(this.currentTitle, reference);

            this.clearCurrentThings();

            this.currentTitle = title;
            this.currentArgs = args;
            this.currentPreThings = [
                {
                    "xloc": 0,
                    "yloc": 0,
                    "top": -description.offsetTop || 0,
                    "right": (description.offsetLeft) + thing.width * this.GameStarter.unitsize,
                    "bottom": (-description.offsetTop || 0) + thing.height * this.GameStarter.unitsize,
                    "left": description.offsetLeft || 0,
                    "title": this.currentTitle,
                    "reference": reference,
                    "thing": thing,
                    "spawned": true
                }
            ];

            this.addThingAndDisableEvents(this.currentPreThings[0].thing, x, y);
        }

        /**
         *
         */
        private resetCurrentThings(event?: MouseEvent): void {
            var currentThing: IPreThing,
                i: number;

            for (i = 0; i < this.currentPreThings.length; i += 1) {
                currentThing = this.currentPreThings[i];
                currentThing.thing.outerok = 2;

                this.GameStarter.addThing(currentThing.thing, currentThing.xloc || 0, currentThing.yloc || 0);
                this.disableThing(currentThing.thing);
            }

            this.onMouseMoveEditing(event);
            this.GameStarter.TimeHandler.cancelAllEvents();
        }

        /**
         *
         */
        private clearCurrentThings(): void {
            if (!this.currentPreThings) {
                return;
            }

            for (var i: number = 0; i < this.currentPreThings.length; i += 1) {
                this.GameStarter.killNormal(this.currentPreThings[i].thing);
            }

            this.currentPreThings = [];
        }

        /**
         * 
         */
        private setCurrentArgs(event?: MouseEvent): void {
            if (this.currentClickMode === "Thing") {
                this.setCurrentThing(this.currentTitle);
            } else if (this.currentClickMode === "Macro") {
                this.onMacroIconClick(this.currentTitle, undefined, this.generateCurrentArgs(), event);
            }

            if (event) {
                event.stopPropagation();
            }
        }


        /* Mouse events
        */

        /**
         * 
         */
        private onMouseDownScrolling(direction: number, event: MouseEvent): void {
            var target: HTMLDivElement = <HTMLDivElement>event.target,
                scope: LevelEditr = this;

            target.setAttribute("scrolling", "1");

            this.GameStarter.TimeHandler.addEventInterval(
                function (): boolean | void {
                    if (target.getAttribute("scrolling") !== "1") {
                        return true;
                    }

                    if (direction < 0 && scope.GameStarter.MapScreener.left <= 0) {
                        (scope.display.scrollers.left).style.opacity = ".14";
                        return;
                    }

                    for (var i: number = 0; i < scope.currentPreThings.length; i += 1) {
                        scope.GameStarter.shiftHoriz(scope.currentPreThings[i].thing, direction);
                    }

                    scope.GameStarter.scrollWindow(direction);
                    scope.display.scrollers.left.style.opacity = "1";
                },
                1,
                Infinity);
        }

        /**
         * 
         */
        private onMouseUpScrolling(event: MouseEvent): void {
            (<HTMLDivElement>event.target).setAttribute("scrolling", "0");
        }


        /**
         * 
         */
        private onMouseMoveEditing(event: MouseEvent): void {
            var x: number = event.x || event.clientX || 0,
                y: number = event.y || event.clientY || 0,
                prething: IPreThing,
                left: number,
                top: number,
                i: number;

            for (i = 0; i < this.currentPreThings.length; i += 1) {
                prething = this.currentPreThings[i];
                left = this.roundTo(x - this.GameStarter.container.offsetLeft, this.blocksize);
                top = this.roundTo(y - this.GameStarter.container.offsetTop, this.blocksize);

                if (prething.left) {
                    left += prething.left * this.GameStarter.unitsize;
                }

                if (prething.top) {
                    top -= prething.top * this.GameStarter.unitsize;
                }

                this.GameStarter.setLeft(prething.thing, left);
                this.GameStarter.setTop(prething.thing, top);
            }
        }

        /**
         * Temporarily disables this.canClick, so double clicking doesn't happen.
         */
        private afterClick(): void {
            this.canClick = false;

            setTimeout(
                (function (): void {
                    this.canClick = true;
                }).bind(this),
                70);
        }

        /**
         * 
         */
        private onClickEditingThing(event: MouseEvent): void {
            if (!this.canClick || this.currentMode !== "Build" || !this.currentPreThings.length) {
                return;
            }

            var coordinates: number[] = this.getNormalizedMouseEventCoordinates(event, true),
                x: number = coordinates[0],
                y: number = coordinates[1];

            if (!this.addMapCreationThing(x, y)) {
                return;
            }

            this.onClickEditingGenericAdd(x, y, this.currentTitle, this.currentArgs);

            this.afterClick();
        }

        /**
         * 
         */
        private onClickEditingMacro(event: MouseEvent): void {
            if (!this.canClick || this.currentMode !== "Build" || !this.currentPreThings.length) {
                return;
            }

            var coordinates: number[] = this.getNormalizedMouseEventCoordinates(event),
                x: number = coordinates[0],
                y: number = coordinates[1],
                prething: IPreThing,
                i: number;

            if (!this.addMapCreationMacro(x, y)) {
                return;
            }

            for (i = 0; i < this.currentPreThings.length; i += 1) {
                prething = this.currentPreThings[i];
                this.onClickEditingGenericAdd(
                    x + (prething.left || 0) * this.GameStarter.unitsize,
                    y - (prething.top || 0) * this.GameStarter.unitsize,
                    prething.thing.title || prething.title,
                    prething.reference
                );
            }

            this.afterClick();
        }

        /**
         * 
         */
        private onClickEditingGenericAdd(x: number, y: number, title: string, args: any): void {
            var thing: IThing = this.GameStarter.ObjectMaker.make(
                title,
                this.GameStarter.proliferate(
                    {
                        "onThingMake": undefined,
                        "onThingAdd": undefined,
                        "onThingAdded": undefined,
                        "movement": undefined
                    },
                    this.getNormalizedThingArguments(args))),
                left: number = x - this.GameStarter.container.offsetLeft,
                top: number = y - this.GameStarter.container.offsetTop;

            if (this.currentMode === "Build") {
                this.disableThing(thing);
            }

            this.addThingAndDisableEvents(thing, left, top);
        }

        /**
         * 
         */
        private onThingIconClick(title: string, event: MouseEvent): void {
            var x: number = event.x || event.clientX || 0,
                y: number = event.y || event.clientY || 0,
                target: IThingIcon = (<HTMLDivElement>event.target).nodeName === "DIV"
                    ? <IThingIcon>event.target
                    : <IThingIcon>(<HTMLElement>event.target).parentNode;

            this.cancelEvent(event);
            this.killCurrentPreThings();

            this.setVisualOptions(target.getAttribute("name"), undefined, target.options);
            this.generateCurrentArgs();
            this.setCurrentThing(title, x, y);
        }

        /**
         * 
         */
        private onMacroIconClick(title: string, description: string, options: any, event?: MouseEvent): void {
            if (description) {
                this.setVisualOptions(title, description, options);
            }

            var map: IMapsCreatrMapRaw = this.getMapObject();

            if (!map) {
                return;
            }

            this.clearCurrentThings();

            this.GameStarter.MapsCreator.analyzePreMacro(
                this.GameStarter.proliferate(
                    {
                        "macro": title,
                        "x": 0,
                        "y": 0
                    },
                    this.generateCurrentArgs()),
                this.createPrethingsHolder(this.currentPreThings),
                this.getCurrentAreaObject(map),
                map);

            this.currentTitle = title;
            this.resetCurrentThings(event);
        }

        /**
         * 
         */
        private createPrethingsHolder(prethings: IPreThing[]): MapsCreatr.IPreThingsRawContainer {
            var output: MapsCreatr.IPreThingsRawContainer = {};

            this.thingGroups.forEach(function (group: string): void {
                output[group] = prethings;
            });

            return output;
        }

        /**
         * 
         */
        private generateCurrentArgs(): any {
            var args: any = {},
                container: HTMLDivElement = this.display.sections.ClickToPlace.VisualOptions,
                children: NodeList = container.getElementsByClassName("VisualOptionsList"),
                child: HTMLDivElement,
                labeler: HTMLDivElement,
                valuer: HTMLInputElement,
                value: boolean | number | string,
                i: number;

            this.currentArgs = args;

            if (children.length === 0) {
                return args;
            }

            children = children[0].childNodes;

            for (i = 0; i < children.length; i += 1) {
                child = <HTMLDivElement>children[i];
                labeler = <HTMLDivElement>child.querySelector(".VisualOptionLabel");
                valuer = <HTMLInputElement>child.querySelector(".VisualOptionValue");

                switch ((valuer.getAttribute("data:type") || valuer.type).toLowerCase()) {
                    case "boolean":
                        value = valuer.value === "true";
                        break;
                    case "number":
                        value = (Number(valuer.value) || 0) * (Number(valuer.getAttribute("data:mod")) || 1);
                        break;
                    default:
                        if (valuer.getAttribute("typeReal") === "Number") {
                            value = Number(valuer.value);
                        } else {
                            value = valuer.value;
                        }
                        break;
                }

                if (value !== this.keyUndefined) {
                    args[labeler.textContent] = value;
                }
            }

            return args;
        }


        /* Map manipulations
        */

        /**
         * 
         */
        private setMapName(): void {
            var name: string = this.getMapName(),
                map: IMapsCreatrMapRaw = this.getMapObject();

            if (map && map.name !== name) {
                map.name = name;
                this.display.namer.value = name;
                this.setTextareaValue(this.stringifySmart(map), true);
                this.GameStarter.ItemsHolder.setItem("world", name);
            }
        }

        /**
         * 
         * 
         * @param {Boolean} fromGui   Whether this is from the MapSettings section
         *                            of the GUI (true), or from the Raw JSON 
         *                            section (false).
         */
        private setMapTime(fromGui: boolean): void {
            var map: IMapsCreatrMapRaw = this.getMapObject(),
                time: number;

            if (!map) {
                return;
            }

            if (fromGui) {
                time = Number(this.display.sections.MapSettings.Time.value);
                map.time = time;
            } else {
                time = map.time;
                this.display.sections.MapSettings.Time.value = time.toString();
            }

            this.setTextareaValue(this.stringifySmart(map), true);
            this.GameStarter.ItemsHolder.setItem("time", time);
            this.GameStarter.TimeHandler.cancelAllEvents();
        }

        /**
         * 
         * 
         * @param {Boolean} fromGui   Whether this is from the MapSettings section
         *                            of the GUI (true), or from the Raw JSON 
         *                            section (false).
         */
        private setMapSetting(fromGui: boolean, event?: MouseEvent): void {
            var map: IMapsCreatrMapRaw = this.getMapObject(),
                area: IMapsCreatrAreaRaw,
                setting: string | string[];

            if (!map) {
                return;
            }

            area = this.getCurrentAreaObject(map);

            if (fromGui) {
                setting = this.display.sections.MapSettings.Setting.Primary.value;
                if (this.display.sections.MapSettings.Setting.Secondary.value) {
                    setting += " " + this.display.sections.MapSettings.Setting.Secondary.value;
                }
                if (this.display.sections.MapSettings.Setting.Tertiary.value) {
                    setting += " " + this.display.sections.MapSettings.Setting.Tertiary.value;
                }
                area.setting = <string>setting;
            } else {
                setting = area.setting.split(" ");
                this.display.sections.MapSettings.Setting.Primary.value = setting[0];
                this.display.sections.MapSettings.Setting.Secondary.value = setting[1];
                this.display.sections.MapSettings.Setting.Tertiary.value = setting[2];
            }

            this.setTextareaValue(this.stringifySmart(map), true);
            this.setDisplayMap(true);
            this.resetCurrentThings(event);
        }

        /**
         * 
         */
        private setLocationArea(): void {
            var map: IMapsCreatrMapRaw = this.getMapObject(),
                location: MapsCreatr.IMapsCreatrLocationRaw;

            if (!map) {
                return;
            }

            location = this.getCurrentLocationObject(map);
            location.area = this.getCurrentArea();

            this.setTextareaValue(this.stringifySmart(map), true);
            this.setDisplayMap(true);
        }

        /**
         * 
         * 
         * @param {Boolean} fromGui   Whether this is from the MapSettings section
         *                            of the GUI (true), or from the Raw JSON 
         *                            section (false).
         */
        private setMapEntry(fromGui: boolean): void {
            var map: IMapsCreatrMapRaw = this.getMapObject(),
                location: MapsCreatr.IMapsCreatrLocationRaw,
                entry: string;

            if (!map) {
                return;
            }

            location = this.getCurrentLocationObject(map);

            if (fromGui) {
                entry = this.display.sections.MapSettings.Entry.value;
                (<any>location).entry = entry;
            } else {
                this.display.sections.MapSettings.Entry.value = entry;
            }

            this.setTextareaValue(this.stringifySmart(map), true);
            this.setDisplayMap(true);
        }

        /**
         * 
         */
        private setCurrentLocation(): void {
            var map: IMapsCreatrMapRaw = this.getMapObject(),
                location: MapsCreatr.IMapsCreatrLocationRaw;

            if (!map) {
                return;
            }

            location = this.getCurrentLocationObject(map);

            this.display.sections.MapSettings.Area.value = location.area
                ? location.area.toString() : "0";

            this.setTextareaValue(this.stringifySmart(map), true);
            this.setDisplayMap(true);
        }

        /**
         * 
         */
        private addLocationToMap(): void {
            var name: string = this.display.sections.MapSettings.Location.options.length.toString(),
                map: IMapsCreatrMapRaw = this.getMapObject();

            if (!map) {
                return;
            }

            map.locations[name] = {
                "entry": this.mapEntrances[0]
            };

            this.resetAllVisualOptionSelects("VisualOptionLocation", Object.keys(map.locations));

            this.setTextareaValue(this.stringifySmart(map), true);
            this.setDisplayMap(true);
        }

        /**
         * 
         */
        private addAreaToMap(): void {
            var name: string = this.display.sections.MapSettings.Area.options.length.toString(),
                map: IMapsCreatrMapRaw = this.getMapObject();

            if (!map) {
                return;
            }

            map.areas[name] = {
                "setting": this.mapSettingDefault,
                "creation": []
            };

            this.resetAllVisualOptionSelects("VisualOptionArea", Object.keys(map.areas));

            this.setTextareaValue(this.stringifySmart(map), true);
            this.setDisplayMap(true);
        }

        /**
         * 
         */
        private resetAllVisualOptionSelects(className: string, options: any[]): void {
            var map: IMapsCreatrMapRaw = this.getMapObject(),
                elements: NodeList = this.display.container.getElementsByClassName(className),
                attributes: any = {
                    "children": options.map(function (option: string): HTMLOptionElement {
                        return new Option(option, option);
                    })
                },
                element: HTMLInputElement,
                value: string,
                i: number;

            if (!map) {
                return;
            }

            for (i = 0; i < elements.length; i += 1) {
                element = <HTMLInputElement>elements[i];
                value = element.value;

                element.textContent = "";
                this.GameStarter.proliferateElement(element, attributes);

                element.value = value;
            }
        }

        private getMapObject(): IMapsCreatrMapRaw {
            var map: IMapsCreatrMapRaw;

            try {
                map = <IMapsCreatrMapRaw>this.parseSmart(this.display.stringer.textarea.value);
                (<HTMLDivElement>this.display.stringer.messenger).textContent = "";
                (<HTMLInputElement>this.display.namer).value = map.name || this.mapNameDefault;
            } catch (error) {
                this.setSectionJSON();
                (<HTMLDivElement>this.display.stringer.messenger).textContent = error.message;
            }

            return map;
        }

        private getMapObjectAndTry(event?: Event): void {
            var mapName: string = this.getMapName() + "::Temporary",
                mapRaw: IMapsCreatrMapRaw = this.getMapObject();

            if (!mapRaw) {
                return;
            }

            try {
                this.GameStarter.MapsCreator.storeMap(mapName, mapRaw);
                this.GameStarter.MapsCreator.getMap(mapName);
                this.setDisplayMap(true);
            } catch (error) {
                this.display.stringer.messenger.textContent = error.message;
            }

            if (event) {
                event.stopPropagation();
            }
        }

        /**
         * 
         */
        private getCurrentArea(): string {
            return this.display.sections.MapSettings.Area.value;
        }

        /**
         * 
         */
        private getCurrentAreaObject(map: IMapsCreatrMapRaw = this.getMapObject()): IMapsCreatrAreaRaw {
            var area: string | number = map.locations[this.getCurrentLocation()].area;
            return map.areas[area ? area.toString() : "0"];
        }

        /**
         * 
         */
        private getCurrentLocation(): string {
            return this.display.sections.MapSettings.Location.value;
        }

        /**
         * 
         */
        private getCurrentLocationObject(map: IMapsCreatrMapRaw): MapsCreatr.IMapsCreatrLocationRaw {
            return map.locations[this.getCurrentLocation()];
        }

        /**
         * 
         */
        private addMapCreationThing(x: number, y: number): boolean {
            var mapObject: IMapsCreatrMapRaw = this.getMapObject(),
                thingRaw: IPreThing = this.GameStarter.proliferate(
                    {
                        "thing": this.currentTitle,
                        "x": this.getNormalizedX(x) + (this.GameStarter.MapScreener.left / this.GameStarter.unitsize),
                        "y": this.getNormalizedY(y)
                    },
                    this.currentArgs);

            if (!mapObject) {
                return false;
            }

            mapObject.areas[this.getCurrentArea()].creation.push(thingRaw);

            this.setTextareaValue(this.stringifySmart(mapObject), true);

            return true;
        }

        private addMapCreationMacro(x: number, y: number): boolean {
            var mapObject: IMapsCreatrMapRaw = this.getMapObject(),
                macroRaw: any = this.GameStarter.proliferate(
                    {
                        "macro": this.currentTitle,
                        "x": this.getNormalizedX(x) + (this.GameStarter.MapScreener.left / this.GameStarter.unitsize),
                        "y": this.getNormalizedY(y)
                    },
                    this.generateCurrentArgs());

            if (!mapObject) {
                return false;
            }

            mapObject.areas[this.getCurrentArea()].creation.push(macroRaw);

            this.setTextareaValue(this.stringifySmart(mapObject), true);

            return true;
        }


        /* HTML manipulations
        */

        private resetDisplay(): void {
            this.display = <any>{
                "container": this.GameStarter.createElement("div", {
                    "className": "LevelEditor",
                    "onclick": this.cancelEvent.bind(this),
                    "ondragenter": this.handleDragEnter.bind(this),
                    "ondragover": this.handleDragOver.bind(this),
                    "ondrop": this.handleDragDrop.bind(this)
                }),
                "scrollers": {},
                "stringer": {},
                "sections": {
                    "ClickToPlace": {},
                    "MapSettings": {
                        "Setting": {}
                    },
                    "buttons": {
                        "ClickToPlace": {}
                    }
                }
            };

            this.resetDisplayScrollers();
            this.resetDisplayGui();
            this.resetDisplayHead();
            this.resetDisplaySectionChoosers();
            this.resetDisplayOptionsList();
            this.resetDisplayMapSettings();

            setTimeout(this.resetDisplayThinCheck.bind(this));
        }

        private resetDisplayThinCheck(): void {
            var width: number = this.display.gui.clientWidth;

            if (width <= 385) {
                this.display.container.className += " thin";
            } else if (width >= 560) {
                this.display.container.className += " thick";
            }
        }

        private resetDisplayGui(): void {
            this.display.gui = this.GameStarter.createElement("div", {
                "className": "EditorGui"
            });

            this.display.container.appendChild(this.display.gui);
        }

        private resetDisplayScrollers(): void {
            this.display.scrollers = {
                "left": this.GameStarter.createElement("div", {
                    "className": "EditorScroller EditorScrollerLeft",
                    "onmousedown": this.onMouseDownScrolling.bind(this, -this.GameStarter.unitsize * 2),
                    "onmouseup": this.onMouseUpScrolling.bind(this),
                    "onmouseout": this.onMouseUpScrolling.bind(this),
                    "onclick": this.cancelEvent.bind(this),
                    "innerText": "<",
                    "style": {
                        "opacity": .14
                    }
                }),
                "right": this.GameStarter.createElement("div", {
                    "className": "EditorScroller EditorScrollerRight",
                    "onmousedown": this.onMouseDownScrolling.bind(this, this.GameStarter.unitsize * 2),
                    "onmouseup": this.onMouseUpScrolling.bind(this),
                    "onmouseout": this.onMouseUpScrolling.bind(this),
                    "onclick": this.cancelEvent.bind(this),
                    "innerText": ">"
                }),
                "container": this.GameStarter.createElement("div", {
                    "className": "EditorScrollers",
                    "onmousemove": this.onMouseMoveEditing.bind(this),
                    "onclick": this.onClickEditingThing.bind(this)
                })
            };

            this.display.scrollers.container.appendChild(this.display.scrollers.left);
            this.display.scrollers.container.appendChild(this.display.scrollers.right);

            this.display.container.appendChild(this.display.scrollers.container);
        }

        private resetDisplayHead(): void {
            this.display.minimizer = this.GameStarter.createElement("div", {
                "className": "EditorHeadButton EditorMinimizer",
                "onclick": this.minimize.bind(this),
                "textContent": "-"
            });

            this.display.head = this.GameStarter.createElement("div", {
                "className": "EditorHead",
                "children": [
                    this.GameStarter.createElement("div", {
                        "className": "EditorNameContainer",
                        "children": [
                            this.display.namer = this.GameStarter.createElement("input", {
                                "className": "EditorNameInput",
                                "type": "text",
                                "placeholder": this.mapNameDefault,
                                "value": this.mapNameDefault,
                                "onkeyup": this.setMapName.bind(this),
                                "onchange": this.setMapName.bind(this)
                            })
                        ]
                    }),
                    this.display.minimizer,
                    this.GameStarter.createElement("div", {
                        "className": "EditorHeadButton EditorCloser",
                        "textContent": "X",
                        "onclick": this.disable.bind(this)
                    })
                ]
            });

            this.display.gui.appendChild(this.display.head);
        }

        private resetDisplaySectionChoosers(): void {
            var sectionChoosers: HTMLDivElement = this.GameStarter.createElement("div", {
                "className": "EditorSectionChoosers",
                "onclick": this.cancelEvent.bind(this),
                "children": [
                    this.display.sections.buttons.ClickToPlace.container = this.GameStarter.createElement("div", {
                        "className": "EditorMenuOption EditorSectionChooser EditorMenuOptionThird",
                        "style": {
                            "background": "white"
                        },
                        "textContent": "Visual",
                        "onclick": this.setSectionClickToPlace.bind(this)
                    }),
                    this.display.sections.buttons.MapSettings = this.GameStarter.createElement("div", {
                        "className": "EditorMenuOption EditorSectionChooser EditorMenuOptionThird",
                        "style": {
                            "background": "gray"
                        },
                        "textContent": "Map",
                        "onclick": this.setSectionMapSettings.bind(this)
                    }),
                    this.display.sections.buttons.JSON = this.GameStarter.createElement("div", {
                        "className": "EditorMenuOption EditorSectionChooser EditorMenuOptionThird",
                        "style": {
                            "background": "gray"
                        },
                        "textContent": "JSON",
                        "onclick": this.setSectionJSON.bind(this)
                    })
                ]
            });

            this.display.gui.appendChild(sectionChoosers);
        }

        private resetDisplayOptionsList(): void {
            this.display.sections.ClickToPlace.container = this.GameStarter.createElement("div", {
                "className": "EditorOptionsList EditorSectionMain",
                "onclick": this.cancelEvent.bind(this)
            });

            this.resetDisplayOptionsListSubOptionsMenu();
            this.resetDisplayOptionsListSubOptions();

            this.display.gui.appendChild(this.display.sections.ClickToPlace.container);
        }

        private resetDisplayOptionsListSubOptionsMenu(): void {
            var holder: HTMLDivElement = this.GameStarter.createElement("div", {
                "className": "EditorSubOptionsListsMenu"
            });

            this.display.sections.buttons.ClickToPlace.Things = this.GameStarter.createElement("div", {
                "className": "EditorMenuOption EditorSubOptionsListChooser EditorMenuOptionHalf",
                "textContent": "Things",
                "onclick": this.setSectionClickToPlaceThings.bind(this),
                "style": {
                    "background": "#CCC"
                }
            });

            this.display.sections.buttons.ClickToPlace.Macros = this.GameStarter.createElement("div", {
                "className": "EditorMenuOption EditorSubOptionsListChooser EditorMenuOptionHalf",
                "textContent": "Macros",
                "onclick": this.setSectionClickToPlaceMacros.bind(this),
                "style": {
                    "background": "#777"
                }
            });

            holder.appendChild(this.display.sections.buttons.ClickToPlace.Things);
            holder.appendChild(this.display.sections.buttons.ClickToPlace.Macros);
            this.display.sections.ClickToPlace.container.appendChild(holder);
        }

        private resetDisplayMapSettings(): void {
            this.display.sections.MapSettings.container = this.GameStarter.createElement("div", {
                "className": "EditorMapSettings EditorSectionMain",
                "onclick": this.cancelEvent.bind(this),
                "style": {
                    "display": "none"
                },
                "children": [
                    this.GameStarter.createElement("div", {
                        "className": "EditorMenuOption",
                        "textContent": "+ Add Area",
                        "onclick": this.addAreaToMap.bind(this)
                    }),
                    this.GameStarter.createElement("div", {
                        "className": "EditorMenuOption",
                        "textContent": "+ Add Location",
                        "onclick": this.addLocationToMap.bind(this)
                    })
                ]
            });

            this.resetDisplayMapSettingsCurrent();
            this.resetDisplayMapSettingsMap();
            this.resetDisplayMapSettingsArea();
            this.resetDisplayMapSettingsLocation();
            this.resetDisplayJSON();
            this.resetDisplayVisualContainers();
            this.resetDisplayButtons();

            this.display.gui.appendChild(this.display.sections.MapSettings.container);
        }

        private resetDisplayMapSettingsCurrent(): void {
            this.display.sections.MapSettings.container.appendChild(this.GameStarter.createElement("div", {
                "className": "EditorMapSettingsSubGroup",
                "children": [
                    this.GameStarter.createElement("label", {
                        "textContent": "Current Location"
                    }),
                    this.display.sections.MapSettings.Location = this.createSelect(["0"], {
                        "className": "VisualOptionLocation",
                        "onchange": this.setCurrentLocation.bind(this)
                    })
                ]
            }));
        }

        private resetDisplayMapSettingsMap(): void {
            this.display.sections.MapSettings.container.appendChild(this.GameStarter.createElement("div", {
                "className": "EditorMapSettingsGroup",
                "children": [
                    this.GameStarter.createElement("h4", {
                        "textContent": "Map"
                    }),
                    this.GameStarter.createElement("div", {
                        "className": "EditorMapSettingsSubGroup",
                        "children": [
                            this.GameStarter.createElement("label", {
                                "className": "EditorMapSettingsLabel",
                                "textContent": "Time"
                            }),
                            this.display.sections.MapSettings.Time = this.createSelect(
                                [
                                    "100", "200", "300", "400", "500", "1000", "Infinity"
                                ],
                                {
                                    "value": this.mapTimeDefault.toString(),
                                    "onchange": this.setMapTime.bind(this, true)
                                })
                        ]
                    })
                ]
            }));
        }

        private resetDisplayMapSettingsArea(): void {
            this.display.sections.MapSettings.container.appendChild(this.GameStarter.createElement("div", {
                "className": "EditorMapSettingsGroup",
                "children": [
                    this.GameStarter.createElement("h4", {
                        "textContent": "Area"
                    }),
                    this.GameStarter.createElement("div", {
                        "className": "EditorMapSettingsSubGroup",
                        "children": [
                            this.GameStarter.createElement("label", {
                                "textContent": "Setting"
                            }),
                            this.display.sections.MapSettings.Setting.Primary = this.createSelect(
                                [
                                    "Overworld", "Underworld", "Underwater", "Castle"
                                ],
                                {
                                    "onchange": this.setMapSetting.bind(this, true)
                                }),
                            this.display.sections.MapSettings.Setting.Secondary = this.createSelect(
                                [
                                    "", "Night", "Underwater", "Alt"
                                ],
                                {
                                    "onchange": this.setMapSetting.bind(this, true)
                                }),
                            this.display.sections.MapSettings.Setting.Tertiary = this.createSelect(
                                [
                                    "", "Night", "Underwater", "Alt"
                                ],
                                {
                                    "onchange": this.setMapSetting.bind(this, true)
                                })
                        ]
                    })
                ]
            }));
        }

        private resetDisplayMapSettingsLocation(): void {
            this.display.sections.MapSettings.container.appendChild(this.GameStarter.createElement("div", {
                "className": "EditorMapSettingsGroup",
                "children": [
                    this.GameStarter.createElement("h4", {
                        "textContent": "Location"
                    }),
                    this.GameStarter.createElement("div", {
                        "className": "EditorMapSettingsSubGroup",
                        "children": [
                            this.GameStarter.createElement("label", {
                                "textContent": "Area"
                            }),
                            this.display.sections.MapSettings.Area = this.createSelect(["0"], {
                                "className": "VisualOptionArea",
                                "onchange": this.setLocationArea.bind(this, true)
                            })
                        ]
                    }),
                    this.GameStarter.createElement("div", {
                        "className": "EditorMapSettingsSubGroup",
                        "children": [
                            this.GameStarter.createElement("label", {
                                "textContent": "Entrance"
                            }),
                            this.display.sections.MapSettings.Entry = this.createSelect(
                                this.mapEntrances,
                                {
                                    "onchange": this.setMapEntry.bind(this, true)
                                })
                        ]
                    })
                ]
            }));
        }

        private resetDisplayJSON(): void {
            this.display.sections.JSON = this.GameStarter.createElement("div", {
                "className": "EditorJSON EditorSectionMain",
                "onclick": this.cancelEvent.bind(this),
                "style": {
                    "display": "none"
                },
                "children": [
                    this.display.stringer.textarea = <HTMLTextAreaElement>this.GameStarter.createElement("textarea", {
                        "className": "EditorJSONInput",
                        "spellcheck": false,
                        "onkeyup": this.getMapObjectAndTry.bind(this),
                        "onchange": this.getMapObjectAndTry.bind(this),
                        "onkeydown": function (event: Event): void {
                            event.stopPropagation();
                        }
                    }),
                    this.display.stringer.messenger = this.GameStarter.createElement("div", {
                        "className": "EditorJSONInfo"
                    })
                ]
            });

            this.display.gui.appendChild(this.display.sections.JSON);
        }

        private resetDisplayVisualContainers(): void {
            this.display.sections.ClickToPlace.VisualOptions = this.GameStarter.createElement("div", {
                "textContent": "Click an icon to view options.",
                "className": "EditorVisualOptions",
                "onclick": this.cancelEvent.bind(this)
            });

            this.display.gui.appendChild(this.display.sections.ClickToPlace.VisualOptions);
        }

        private resetDisplayButtons(): void {
            var scope: LevelEditr = this;

            this.display.gui.appendChild(this.GameStarter.createElement("div", {
                "className": "EditorMenu",
                "onclick": this.cancelEvent.bind(this),
                "children": (function (actions: any): HTMLDivElement[] {
                    return Object.keys(actions).map(function (key: string): HTMLDivElement {
                        return scope.GameStarter.createElement("div", {
                            "className": "EditorMenuOption EditorMenuOptionFifth EditorMenuOption-" + key,
                            "textContent": key,
                            "onclick": actions[key][0].bind(scope),
                            "children": actions[key][1]
                        });
                    });
                })({
                    "Build": [this.startBuilding.bind(this)],
                    "Play": [this.startPlaying.bind(this)],
                    "Save": [this.downloadCurrentJSON.bind(this)],
                    "Load": [
                        this.loadCurrentJSON.bind(this),
                        this.display.inputDummy = this.GameStarter.createElement("input", {
                            "type": "file",
                            "style": {
                                "display": "none"
                            },
                            "onchange": this.handleUploadStart.bind(this)
                        })
                    ],
                    "Reset": [this.resetDisplayMap.bind(this)]
                })
            }));
        }

        /**
         * Adds the Things and Macros menus to the EditorOptionsList container in 
         * the main GUI.
         */
        private resetDisplayOptionsListSubOptions(): void {
            this.resetDisplayOptionsListSubOptionsThings();
            this.resetDisplayOptionsListSubOptionsMacros();
        }

        /**
         * Creates the menu of icons for Things, with a dropdown select to choose
         * the groupings being displayed. These icons, when clicked, trigger 
         * this.onThingIconClick on the Thing's title.
         */
        private resetDisplayOptionsListSubOptionsThings(): void {
            var scope: LevelEditr = this,
                // Without these references, tslint complaints the private functions aren't used
                argumentGetter: any = this.getPrethingSizeArguments.bind(this),
                clicker: any = this.onThingIconClick;

            if (this.display.sections.ClickToPlace.Things) {
                this.display.sections.ClickToPlace.container.removeChild(this.display.sections.ClickToPlace.Things);
            }

            this.display.sections.ClickToPlace.Things = this.GameStarter.createElement("div", {
                "className": "EditorSectionSecondary EditorOptions EditorOptions-Things",
                "style": {
                    "display": "block"
                },
                "children": (function (): HTMLElement[] {
                    var selectedIndex: number = 0,
                        containers: HTMLElement[] = Object.keys(scope.prethings).map(function (key: string): HTMLDivElement {
                            var prethings: IPreThingDimensionDescriptor[] = scope.prethings[key],
                                children: HTMLDivElement[] = Object.keys(prethings).map(
                                    function (title: string): HTMLDivElement {
                                        var prething: IPreThing = prethings[title],
                                            thing: IThing = scope.GameStarter.ObjectMaker.make(
                                                title,
                                                argumentGetter(prething)),
                                            container: HTMLDivElement = <HTMLDivElement>scope.GameStarter.createElement("div", {
                                                "className": "EditorListOption",
                                                "options": scope.prethings[key][title].options,
                                                "children": [thing.canvas],
                                                "onclick": clicker.bind(scope, title)
                                            }),
                                            sizeMax: number = 70,
                                            widthThing: number = thing.width * scope.GameStarter.unitsize,
                                            heightThing: number = thing.height * scope.GameStarter.unitsize,
                                            widthDiff: number = (sizeMax - widthThing) / 2,
                                            heightDiff: number = (sizeMax - heightThing) / 2;

                                        container.setAttribute("name", title);

                                        thing.canvas.style.top = heightDiff + "px";
                                        thing.canvas.style.right = widthDiff + "px";
                                        thing.canvas.style.bottom = heightDiff + "px";
                                        thing.canvas.style.left = widthDiff + "px";

                                        scope.GameStarter.PixelDrawer.setThingSprite(thing);

                                        return container;
                                    });

                            return <HTMLDivElement>scope.GameStarter.createElement("div", {
                                "className": "EditorOptionContainer",
                                "style": {
                                    "display": "none"
                                },
                                "children": children
                            });
                        }),
                        switcher: HTMLSelectElement = scope.createSelect(Object.keys(scope.prethings), {
                            "className": "EditorOptionContainerSwitchers",
                            "onchange": function (): void {
                                containers[selectedIndex + 1].style.display = "none";
                                containers[switcher.selectedIndex + 1].style.display = "block";
                                selectedIndex = switcher.selectedIndex;
                            }
                        });

                    containers[0].style.display = "block";
                    containers.unshift(switcher);

                    return containers;
                })()
            });

            this.display.sections.ClickToPlace.container.appendChild(this.display.sections.ClickToPlace.Things);
        }

        /**
         * Creates the menu of (text) icons for Macros. When clicked, these trigger
         * this.onMacroIconClick on the macro's title, description, and options.
         */
        private resetDisplayOptionsListSubOptionsMacros(): void {
            var scope: LevelEditr = this;

            if (this.display.sections.ClickToPlace.Macros) {
                this.display.sections.ClickToPlace.container.removeChild(this.display.sections.ClickToPlace.Macros);
            }

            scope.display.sections.ClickToPlace.Macros = scope.GameStarter.createElement("div", {
                "className": "EditorSectionSecondary EditorOptions EditorOptions-Macros",
                "style": {
                    "display": "none"
                },
                "children": Object.keys(scope.macros).map(function (key: string): HTMLDivElement {
                    var macro: any = scope.macros[key];

                    return scope.GameStarter.createElement("div", {
                        "className": "EditorOptionContainer",
                        "children": [
                            scope.GameStarter.createElement("div", {
                                "className": "EditorOptionTitle EditorMenuOption",
                                "textContent": key,
                                "onclick": scope.onMacroIconClick.bind(scope, key, macro.description, macro.options)
                            })
                        ]
                    });
                })
            });

            this.display.sections.ClickToPlace.container.appendChild(this.display.sections.ClickToPlace.Macros);
        }

        /**
         * 
         */
        private setSectionClickToPlace(): void {
            this.display.sections.ClickToPlace.VisualOptions.style.display = "block";
            this.display.sections.ClickToPlace.container.style.display = "block";
            this.display.sections.MapSettings.container.style.display = "none";
            this.display.sections.JSON.style.display = "none";
            this.display.sections.buttons.ClickToPlace.container.style.backgroundColor = "white";
            this.display.sections.buttons.MapSettings.style.background = "gray";
            this.display.sections.buttons.JSON.style.background = "gray";

            if (this.currentClickMode !== "Thing" && this.currentClickMode !== "Macro") {
                this.display.sections.buttons.ClickToPlace.Things.click();
            }
        }

        /**
         * 
         */
        private setSectionMapSettings(event?: Event): void {
            this.setCurrentClickMode("Map", event);

            this.display.sections.ClickToPlace.VisualOptions.style.display = "none";
            this.display.sections.ClickToPlace.container.style.display = "none";
            this.display.sections.MapSettings.container.style.display = "block";
            this.display.sections.JSON.style.display = "none";
            this.display.sections.buttons.ClickToPlace.container.style.background = "gray";
            this.display.sections.buttons.MapSettings.style.background = "white";
            this.display.sections.buttons.JSON.style.background = "gray";
        }

        /**
         * 
         */
        private setSectionJSON(event?: Event): void {
            this.setCurrentClickMode("JSON", event);

            this.display.sections.ClickToPlace.VisualOptions.style.display = "none";
            this.display.sections.ClickToPlace.container.style.display = "none";
            this.display.sections.MapSettings.container.style.display = "none";
            this.display.sections.JSON.style.display = "block";
            this.display.sections.buttons.ClickToPlace.container.style.background = "gray";
            this.display.sections.buttons.MapSettings.style.background = "gray";
            this.display.sections.buttons.JSON.style.background = "white";
        }

        /**
         * 
         */
        private setSectionClickToPlaceThings(event?: MouseEvent): void {
            this.setCurrentClickMode("Thing", event);

            this.display.container.onclick = this.onClickEditingThing.bind(this);
            this.display.scrollers.container.onclick = this.onClickEditingThing.bind(this);
            this.display.sections.ClickToPlace.VisualOptions.style.display = "block";
            this.display.sections.ClickToPlace.Things.style.display = "block";
            this.display.sections.ClickToPlace.Macros.style.display = "none";
            this.display.sections.buttons.ClickToPlace.Things.style.background = "#CCC";
            this.display.sections.buttons.ClickToPlace.Macros.style.background = "#777";
        }

        /**
         * 
         */
        private setSectionClickToPlaceMacros(event?: MouseEvent): void {
            this.setCurrentClickMode("Macro", event);

            this.display.container.onclick = this.onClickEditingMacro.bind(this);
            this.display.scrollers.container.onclick = this.onClickEditingMacro.bind(this);
            this.display.sections.ClickToPlace.VisualOptions.style.display = "block";
            this.display.sections.ClickToPlace.Things.style.display = "none";
            this.display.sections.ClickToPlace.Macros.style.display = "block";
            this.display.sections.buttons.ClickToPlace.Things.style.background = "#777";
            this.display.sections.buttons.ClickToPlace.Macros.style.background = "#CCC";
        }

        /**
         * 
         */
        private setTextareaValue(value: string, doBeautify: boolean = false): void {
            if (doBeautify) {
                this.display.stringer.textarea.value = this.beautifier(value);
            } else {
                this.display.stringer.textarea.value = value;
            }
        }

        /** 
         * 
         */
        private beautifyTextareaValue(): void {
            this.display.stringer.textarea.value = this.beautifier(this.display.stringer.textarea.value);
        }

        /**
         * 
         */
        private setVisualOptions(name: string, description: string, options: any): void {
            var visual: HTMLDivElement = this.display.sections.ClickToPlace.VisualOptions,
                // Without clicker, tslint complains createVisualOption isn't being used...
                clicker: any = this.createVisualOption.bind(this),
                scope: LevelEditr = this;

            visual.textContent = "";

            visual.appendChild(this.GameStarter.createElement("h3", {
                "className": "VisualOptionName",
                "textContent": name.replace(/([A-Z][a-z])/g, " $1")
            }));

            if (description) {
                visual.appendChild(this.GameStarter.createElement("div", {
                    "className": "VisualOptionDescription",
                    "textContent": description
                }));
            }

            if (options) {
                visual.appendChild(scope.GameStarter.createElement("div", {
                    "className": "VisualOptionsList",
                    "children": Object.keys(options).map(function (key: string): HTMLDivElement {
                        return <HTMLDivElement>scope.GameStarter.createElement("div", {
                            "className": "VisualOption",
                            "children": [
                                scope.GameStarter.createElement("div", {
                                    "className": "VisualOptionLabel",
                                    "textContent": key
                                }),
                                clicker(options[key])
                            ]
                        });
                    })
                }));
            }
        }

        /**
         * 
         */
        private createVisualOption(optionRaw: number | string | any | any[]): HTMLDivElement | HTMLSelectElement {
            var option: any = this.createVisualOptionObject(optionRaw);

            switch (option.type) {
                case "Boolean":
                    return this.createVisualOptionBoolean();
                case "Number":
                    return this.createVisualOptionNumber(option);
                case "Select":
                    return this.createVisualOptionSelect(option);
                case "String":
                    return this.createVisualOptionString(option);
                case "Location":
                    return this.createVisualOptionLocation(option);
                case "Area":
                    return this.createVisualOptionArea(option);
                case "Everything":
                    return this.createVisualOptionEverything(option);
                default:
                    throw new Error("Unknown type requested: '" + option.type + "'.");
            }
        }

        /**
         * 
         */
        private createVisualOptionObject(optionRaw: number | string | any | any[]): HTMLElement {
            var option: any;

            // If the option isn't already an Object, make it one
            switch (optionRaw.constructor) {
                case Number:
                    option = {
                        "type": "Number",
                        "mod": optionRaw
                    };
                    break;

                case String:
                    option = {
                        "type": optionRaw
                    };
                    break;

                case Array:
                    option = {
                        "type": "Select",
                        "options": optionRaw
                    };
                    break;

                default:
                    option = optionRaw;
            }

            return option;
        }

        /**
         * 
         */
        private createVisualOptionBoolean(): HTMLSelectElement {
            var select: HTMLSelectElement = <HTMLSelectElement>this.createSelect(
                [
                    "false", "true"
                ],
                {
                    "className": "VisualOptionValue",
                    "onkeyup": this.setCurrentArgs.bind(this),
                    "onchange": this.setCurrentArgs.bind(this)
                });

            select.setAttribute("data:type", "Boolean");

            return select;
        }

        /**
         * 
         */
        private createVisualOptionNumber(option: any): HTMLDivElement {
            var scope: LevelEditr = this;

            return this.GameStarter.createElement("div", {
                "className": "VisualOptionHolder",
                "children": (function (): HTMLElement[] {
                    var modReal: number = option.mod || 1,
                        input: HTMLInputElement = <HTMLInputElement>scope.GameStarter.createElement(
                            "input",
                            {
                                "type": "Number",
                                "data:type": "Number",
                                "value": (option.value === undefined) ? 1 : option.value,
                                "className": "VisualOptionValue modReal" + modReal,
                                "onkeyup": scope.setCurrentArgs.bind(scope),
                                "onchange": scope.setCurrentArgs.bind(scope)
                            }),
                        recommendation: HTMLElement = modReal > 1
                            && scope.GameStarter.createElement("div", {
                                "className": "VisualOptionRecommendation",
                                "textContent": "x" + option.mod
                            }),
                        children: HTMLElement[] = [input];

                    input.setAttribute("data:mod", modReal.toString());
                    input.setAttribute("data:type", "Number");
                    input.setAttribute("typeReal", "Number");

                    if (option.Infinite) {
                        var valueOld: string = undefined,
                            infinite: HTMLSelectElement = scope.createSelect(
                                [
                                    "Number", "Infinite"
                                ],
                                {
                                    "className": "VisualOptionInfiniter",
                                    "onchange": function (event: Event): void {
                                        if (infinite.value === "Number") {
                                            input.type = "Number";
                                            input.disabled = false;
                                            input.style.display = "";
                                            if (recommendation) {
                                                recommendation.style.display = "";
                                            }

                                            input.value = valueOld;
                                            input.onchange(event);
                                        } else {
                                            input.type = "Text";
                                            input.disabled = true;
                                            input.style.display = "none";
                                            if (recommendation) {
                                                recommendation.style.display = "none";
                                            }

                                            valueOld = input.value;
                                            input.value = "Infinity";
                                            input.onchange(event);
                                        }
                                    }
                                });

                        if (option.value === Infinity) {
                            infinite.value = "Infinite";
                            infinite.onchange(undefined);
                        }

                        children.push(infinite);
                    }

                    if (recommendation) {
                        children.push(recommendation);
                    }

                    return children;
                })()
            });
        }

        /**
         * 
         */
        private createVisualOptionSelect(option: any): HTMLSelectElement {
            var select: HTMLSelectElement = this.createSelect(option.options, {
                "className": "VisualOptionValue",
                "data:type": "Select",
                "onkeyup": this.setCurrentArgs.bind(this),
                "onchange": this.setCurrentArgs.bind(this)
            });

            select.setAttribute("data:type", "Select");

            return select;
        }

        /**
         * 
         */
        private createVisualOptionString(option: any): HTMLSelectElement {
            var select: HTMLSelectElement = this.createSelect(option.options, {
                "className": "VisualOptionValue",
                "data:type": "String",
                "onkeyup": this.setCurrentArgs.bind(this),
                "onchange": this.setCurrentArgs.bind(this)
            });

            select.setAttribute("data:type", "String");

            return select;
        }

        /**
         * 
         */
        private createVisualOptionLocation(option: any): HTMLDivElement | HTMLSelectElement {
            var map: IMapsCreatrMapRaw = this.getMapObject(),
                locations: string[],
                select: HTMLSelectElement;

            if (!map) {
                return this.GameStarter.createElement("div", {
                    "className": "VisualOptionValue VisualOptionLocation EditorComplaint",
                    "text": "Fix map compilation to get locations!"
                });
            }

            locations = Object.keys(map.locations);
            locations.unshift(this.keyUndefined);

            select = this.createSelect(locations, {
                "className": "VisualOptionValue VisualOptionLocation",
                "data-type": "String",
                "onkeyup": this.setCurrentArgs.bind(this),
                "onchange": this.setCurrentArgs.bind(this)
            });
            select.setAttribute("data-type", "String");

            return select;
        }

        /**
         * 
         */
        private createVisualOptionArea(option: any): HTMLDivElement | HTMLSelectElement {
            var map: IMapsCreatrMapRaw = this.getMapObject(),
                areas: string[],
                select: HTMLSelectElement;

            if (!map) {
                return this.GameStarter.createElement("div", {
                    "className": "VisualOptionValue VisualOptionArea EditorComplaint",
                    "text": "Fix map compilation to get areas!"
                });
            }

            areas = Object.keys(map.areas);
            areas.unshift(this.keyUndefined);

            select = this.createSelect(areas, {
                "className": "VisualOptionValue VisualOptionArea",
                "data-type": "String",
                "onkeyup": this.setCurrentArgs.bind(this),
                "onchange": this.setCurrentArgs.bind(this)
            });
            select.setAttribute("data-type", "String");

            return select;
        }

        /**
         * 
         */
        private createVisualOptionEverything(option: any): HTMLSelectElement {
            var select: HTMLSelectElement = this.createSelect(Object.keys(this.things), {
                "className": "VisualOptionValue VisualOptionEverything",
                "data-type": "String",
                "onkeyup": this.setCurrentArgs.bind(this),
                "onchange": this.setCurrentArgs.bind(this)
            });

            select.setAttribute("data-type", "String");

            return select;
        }

        /**
         * 
         */
        private resetDisplayMap(): void {
            this.setTextareaValue(this.stringifySmart(this.mapDefault), true);
            this.setDisplayMap(true);
        }

        /**
         * 
         */
        private setDisplayMap(doDisableThings?: boolean): void {
            var value: string = this.display.stringer.textarea.value,
                mapName: string = this.getMapName(),
                testObject: any,
                map: MapsCreatr.IMapsCreatrMap;

            try {
                testObject = this.parseSmart(value);
                this.setTextareaValue(this.display.stringer.textarea.value);
            } catch (error) {
                this.setSectionJSON();
                this.display.stringer.messenger.textContent = error.message;
                return;
            }

            try {
                this.GameStarter.MapsCreator.storeMap(mapName, testObject);
                map = this.GameStarter.MapsCreator.getMap(mapName);
            } catch (error) {
                this.setSectionJSON();
                this.display.stringer.messenger.textContent = error.message;
                return;
            }

            this.display.stringer.messenger.textContent = "";
            this.setTextareaValue(this.display.stringer.textarea.value);

            this.GameStarter.setMap(mapName, this.getCurrentLocation());
            this.resetDisplayOptionsListSubOptionsThings();

            if (doDisableThings) {
                this.disableAllThings();
            }
        }

        /**
         * 
         */
        private getMapName(): string {
            return this.display.namer.value || this.mapNameDefault;
        }


        /* Utility functions
        */

        /**
         * 
         */
        private roundTo(num: number, rounding: number): number {
            return Math.round(num / rounding) * rounding;
        }

        /**
         * 
         */
        private stringifySmart(object: any = {}): string {
            return JSON.stringify(object, this.jsonReplacerSmart);
        }

        /**
         * 
         * 
         * @remarks Settings .editor=true informs the area that the player
         *          should respawn upon death without resetting gameplay.
         */
        private parseSmart(text: string): any {
            var map: any = JSON.parse(text, this.jsonReplacerSmart),
                areas: any = map.areas,
                i: any;

            for (i in areas) {
                if (areas.hasOwnProperty(i)) {
                    areas[i].editor = true;
                }
            }

            return map;
        }

        /**
         * 
         */
        private jsonReplacerSmart(key: string, value: any): any {
            if (value !== value) {
                return "NaN";
            } else if (value === Infinity) {
                return "Infinity";
            } else if (value === -Infinity) {
                return "-Infinity";
            } else {
                return <string>value;
            }
        }


        /**
         * 
         */
        private disableThing(thing: any, opacity: number = 1): void {
            thing.movement = undefined;
            thing.nofall = true;
            thing.nocollide = true;
            thing.outerok = 2;
            thing.xvel = 0;
            thing.yvel = 0;
            thing.opacity = opacity;
        }

        /**
         * 
         */
        private disableAllThings(): void {
            var scope: LevelEditr = this,
                groups: GroupHoldr.IGroupHoldrGroups<IThing> = this.GameStarter.GroupHolder.getGroups(),
                i: string;

            for (i in groups) {
                if (groups.hasOwnProperty(i)) {
                    (<IThing[]>groups[i]).forEach(function (thing: IThing): void {
                        scope.disableThing(thing);
                    });
                }
            }

            this.GameStarter.TimeHandler.cancelAllEvents();
        }

        /**
         *
         */
        private addThingAndDisableEvents(thing: IThing, x?: number, y?: number): void {
            var left: number = this.roundTo(x, this.GameStarter.scale),
                top: number = this.roundTo(y, this.GameStarter.scale);

            this.GameStarter.addThing(thing, left, top);
            this.disableThing(thing);
            this.GameStarter.TimeHandler.cancelAllEvents();

            if ((thing.hasOwnProperty("hidden") && thing.hidden) || thing.opacity === 0) {
                thing.hidden = false;
                thing.opacity = .35;
            }
        }

        /**
         * 
         */
        private clearAllThings(): void {
            var scope: LevelEditr = this,
                groups: GroupHoldr.IGroupHoldrGroups<IThing> = this.GameStarter.GroupHolder.getGroups(),
                i: string;

            for (i in groups) {
                if (groups.hasOwnProperty(i)) {
                    (<IThing[]>groups[i]).forEach(function (thing: IThing): void {
                        scope.GameStarter.killNormal(thing);
                    });
                }
            }
        }

        /**
         * 
         */
        private getNormalizedX(raw: number): number {
            return raw / this.GameStarter.unitsize;
        }

        /**
         * 
         */
        private getNormalizedY(raw: number): number {
            return (<any>this.GameStarter.MapScreener).floor
                - (raw / this.GameStarter.unitsize)
                + this.GameStarter.unitsize * 3; // Why +3?
        }

        /**
         * 
         */
        private getNormalizedThingArguments(args: any): any {
            var argsNormal: any = this.GameStarter.proliferate({}, args);

            if (argsNormal.height === Infinity) {
                argsNormal.height = this.GameStarter.MapScreener.height;
            }

            if (argsNormal.width === Infinity) {
                argsNormal.width = this.GameStarter.MapScreener.width;
            }

            return argsNormal;
        }

        /**
         *
         */
        private getNormalizedMouseEventCoordinates(event: MouseEvent, referenceThing?: boolean): number[] {
            var x: number = this.roundTo(event.x || event.clientX || 0, this.blocksize),
                y: number = this.roundTo(event.y || event.clientY || 0, this.blocksize),
                prething: IPreThingDescriptor;

            if (referenceThing) {
                prething = this.things[this.currentTitle];

                if (prething.offsetLeft) {
                    x += prething.offsetLeft * this.GameStarter.unitsize;
                }

                if (prething.offsetTop) {
                    y += prething.offsetTop * this.GameStarter.unitsize;
                }
            }

            return [x, y];
        }

        /**
         *
         */
        private getPrethingSizeArguments(descriptor: IPreThingDescriptor): any {
            var output: any = {},
                width: number = this.getPrethingSizeArgument(descriptor.width),
                height: number = this.getPrethingSizeArgument(descriptor.height);

            if (width) {
                output.width = width;
            }

            if (height) {
                output.height = height;
            }

            return output;
        }

        /**
         *
         */
        private getPrethingSizeArgument(descriptor: IPreThingDimensionDescriptor): number {
            if (!descriptor) {
                return undefined;
            }

            if (descriptor.real) {
                return descriptor.real;
            }

            var value: number = descriptor.value || 1,
                mod: number = descriptor.mod || 1;

            if (!isFinite(value)) {
                return mod || 8;
            }

            return value * mod;
        }

        /**
         * 
         */
        private createSelect(options: string[], attributes: any): HTMLSelectElement {
            var select: HTMLSelectElement = this.GameStarter.createElement("select", attributes),
                i: number;

            for (i = 0; i < options.length; i += 1) {
                select.appendChild(this.GameStarter.createElement("option", {
                    "value": options[i],
                    "textContent": options[i]
                }));
            }

            if (typeof attributes.value !== "undefined") {
                select.value = attributes.value;
            }

            this.applyElementAttributes(select, attributes);

            return select;
        }

        /**
         *
         */
        private applyElementAttributes(element: HTMLElement, attributes: any): void {
            var i: string;

            for (i in attributes) {
                if (attributes.hasOwnProperty(i) && i.indexOf("data:") === 0) {
                    element.setAttribute(i, attributes[i]);
                }
            }
        }

        /**
         * 
         */
        private downloadFile(name: string, content: string): HTMLLinkElement {
            var link: HTMLLinkElement = this.GameStarter.createElement("a", {
                "download": name,
                "href": "data:text/json;charset=utf-8," + encodeURIComponent(content)
            });

            this.display.container.appendChild(link);
            link.click();
            this.display.container.removeChild(link);

            return link;
        }

        /**
         * 
         */
        private killCurrentPreThings(): void {
            for (var i: number = 0; i < this.currentPreThings.length - 1; i += 1) {
                this.GameStarter.killNormal(this.currentPreThings[i].thing);
            }
        }


        /* File uploading
        */

        /**
         * 
         */
        private handleUploadStart(event: IDataMouseEvent): void {
            var file: File,
                reader: FileReader;

            this.cancelEvent(event);

            if (event && event.dataTransfer) {
                file = event.dataTransfer.files[0];
            } else {
                file = this.display.inputDummy.files[0];
                reader = new FileReader();
            }

            if (!file) {
                return;
            }

            reader = new FileReader();
            reader.onloadend = this.handleUploadCompletion.bind(this);
            reader.readAsText(file);
        }

        /**
         * 
         */
        private handleDragEnter(event: IDataMouseEvent): void {
            this.setSectionJSON();
        }

        /**
         * 
         */
        private handleDragOver(event: IDataMouseEvent): void {
            this.cancelEvent(event);
        }

        /**
         * 
         */
        private handleDragDrop(event: IDataMouseEvent): void {
            this.handleUploadStart(event);
        }

        /**
         * 
         */
        private cancelEvent(event?: Event): void {
            if (!event) {
                return;
            }

            if (typeof event.preventDefault === "function") {
                event.preventDefault();
            }

            if (typeof event.stopPropagation === "function") {
                event.stopPropagation();
            }

            event.cancelBubble = true;
        }


        /* Styles
         */

        /*
         * 
         */
        private createPageStyles(): any {
            return {
                ".LevelEditor": {
                    "position": "absolute",
                    "top": "0",
                    "right": "0",
                    "bottom": "0",
                    "left": "0"
                },
                ".LevelEditor h4": {
                    "margin": "14px 0 7px 0"
                },
                ".LevelEditor select, .LevelEditor input": {
                    "margin": "7px",
                    "padding": "3px 7px",
                    "font-size": "1.17em"
                },
                // EditorGUI & EditorScrollers
                ".LevelEditor .EditorGui": {
                    "position": "absolute",
                    "top": "0",
                    "right": "0",
                    "bottom": "0",
                    "width": "50%",
                    "background": "rgba(0, 7, 14, .84)",
                    "overflow": "hidden",
                    "user-select": "none",
                    "box-sizing": "border-box",
                    "z-index": "70",
                    "transition": "117ms all"
                },
                // EditorMenuContainer & EditorScrollers
                ".LevelEditor .EditorMenuContainer": {
                    "position": "absolute",
                    "top": "0",
                    "right": "0",
                    "bottom": "0",
                    "width": "50%",
                    "background": "rgba(0, 7, 14, .84)",
                    "overflow": "hidden",
                    "user-select": "none",
                    "box-sizing": "border-box",
                    "z-index": "70",
                    "transition": "117ms all"
                },
                ".LevelEditor .EditorScrollers": {
                    "position": "absolute",
                    "top": "0",
                    "right": "50%",
                    "bottom": "0",
                    "left": "0",
                    "transition": "117ms all"
                },
                ".EditorScroller": {
                    "position": "absolute",
                    "top": "50%",
                    "margin-top": "-35px",
                    "width": "70px",
                    "cursor": "pointer",
                    "box-sizing": "border-box",
                    "font-size": "70px",
                    "text-align": "center",
                    "transition": "280ms all"
                },
                ".EditorScrollerRight": {
                    "right": "0",
                    "padding-left": ".084em"
                },
                ".EditorScrollerLeft": {
                    "left": "0"
                },
                ".LevelEditor.minimized .EditorGui": {
                    "width": "117px"
                },
                ".LevelEditor.minimized .EditorMenuContainer": {
                    "width": "117px"
                },
                ".LevelEditor.minimized .EditorScrollers": {
                    "right": "117px",
                    "padding-right": "117px"
                },
                // EditorHead
                ".LevelEditor .EditorHead": {
                    "position": "relative",
                    "height": "35px"
                },
                ".LevelEditor .EditorHead .EditorNameContainer": {
                    "position": "absolute",
                    "top": "1px",
                    "right": "73px",
                    "left": "2px",
                    "height": "35px"
                },
                ".LevelEditor .EditorHead .EditorNameInput": {
                    "display": "block",
                    "margin": "0",
                    "padding": "3px 7px",
                    "width": "100%",
                    "background": "white",
                    "border": "1px solid black",
                    "font-size": "1.4em",
                    "box-sizing": "border-box"
                },
                ".LevelEditor .EditorHead .EditorHeadButton": {
                    "position": "absolute",
                    "top": "2px",
                    "width": "32px",
                    "height": "32px",
                    "background": "rgb(35,35,35)",
                    "border": "1px solid silver",
                    "box-sizing": "border-box",
                    "text-align": "center",
                    "padding-top": "7px",
                    "cursor": "pointer"
                },
                ".LevelEditor .EditorHead .EditorMinimizer": {
                    "right": "38px"
                },
                ".LevelEditor .EditorHead .EditorCloser": {
                    "right": "3px"
                },
                // EditorSectionChoosers
                ".LevelEditor .EditorSectionChooser": {
                    "width": "50%",
                    "box-sizing": "border-box",
                    "height": "35px",
                    "background": "white",
                    "border": "3px solid black",
                    "color": "black",
                    "cursor": "pointer"
                },
                ".LevelEditor .EditorSectionChooser.Inactive": {
                    "background": "gray"
                },
                ".LevelEditor.minimized .EditorSectionChoosers": {
                    "opacity": "0"
                },
                // EditorSectionMain
                ".LevelEditor .EditorSectionMain": {
                    "position": "absolute",
                    "top": "70px",
                    "right": "0",
                    "bottom": "35px",
                    "left": "0",
                    "overflow-y": "auto"
                },
                ".LevelEditor.minimized .EditorSectionMain": {
                    "display": "none"
                },
                ".LevelEditor .EditorSectionSecondary": {
                    "position": "absolute",
                    "top": "35px",
                    "right": "203px",
                    "bottom": "0px",
                    "left": "0",
                    "min-width": "182px",
                    "overflow-y": "auto",
                    "overflow-x": "hidden"
                },
                // EditorJSON
                ".LevelEditor .EditorJSON": {
                    "font-family": "Courier"
                },
                ".LevelEditor .EditorJSONInput": {
                    "display": "block",
                    "width": "100%",
                    "height": "84%",
                    "background": "rgba(0, 3, 7, .91)",
                    "color": "rgba(255, 245, 245, .91)",
                    "box-sizing": "border-box",
                    "overflow-y": "auto",
                    "resize": "none"
                },
                ".LevelEditor .EditorJSONInfo": {
                    "height": "1.75em",
                    "padding": "3px 7px"
                },
                ".LevelEditor.minimized .EditorJSON": {
                    "opacity": "0"
                },
                // EditorOptions
                ".LevelEditor .EditorOptions, .LevelEditor .EditorOptionContainer": {
                    "padding-left": "3px",
                    "clear": "both"
                },
                ".LevelEditor.minimized .EditorOptionsList": {
                    "opacity": "0"
                },
                ".LevelEditor .EditorListOption": {
                    "position": "relative",
                    "float": "left",
                    "margin": "0 7px 7px 0",
                    "width": "70px",
                    "height": "70px",
                    "background": "rgba(77, 77, 77, .7)",
                    "border": "2px solid black",
                    "overflow": "hidden",
                    "cursor": "pointer"
                },
                ".LevelEditor .EditorListOption canvas": {
                    "position": "absolute"
                },
                // EditorVisualOptions
                ".LevelEditor .EditorVisualOptions": {
                    "position": "absolute",
                    "top": "105px",
                    "right": "0",
                    "bottom": "35px",
                    "padding": "7px 11px",
                    "width": "203px",
                    "border-left": "1px solid silver",
                    "background": "rgba(0, 7, 14, .84)",
                    "overflow-x": "visible",
                    "overflow-y": "auto",
                    "line-height": "140%",
                    "opacity": "1",
                    "box-sizing": "border-box",
                    "transition": "117ms opacity, 70ms left"
                },
                ".LevelEditor.thin .EditorVisualOptions": {
                    "left": "185px"
                },
                ".LevelEditor.thin .EditorVisualOptions:hover": {
                    "left": "70px",
                    "right": "0",
                    "width": "auto",
                    "overflow-x": "hidden"
                },
                ".LevelEditor.thick .EditorVisualOptions": {
                    "width": "350px"
                },
                ".LevelEditor.thick .EditorSectionSecondary": {
                    "right": "350px"
                },
                ".LevelEditor.minimized .EditorVisualOptions": {
                    "left": "100%"
                },
                ".LevelEditor .EditorVisualOptions .VisualOption": {
                    "padding": "14px 0"
                },
                ".LevelEditor .EditorVisualOptions .VisualOptionName": {
                    "margin": "3px 0 7px 0"
                },
                ".LevelEditor .EditorVisualOptions .VisualOptionDescription": {
                    "padding-bottom": "14px"
                },
                ".LevelEditor .EditorVisualOptions .VisualOptionValue": {
                    "max-width": "117px"
                },
                ".LevelEditor .EditorVisualOptions select.VisualOptionValue": {
                    "max-width": "156px"
                },
                ".LevelEditor .EditorVisualOptions .VisualOptionInfiniter, .LevelEditor .EditorVisualOptions .VisualOptionRecommendation": {
                    "display": "inline"
                },
                // EditorMenu
                ".LevelEditor .EditorMenu": {
                    "position": "absolute",
                    "right": "0",
                    "bottom": "0",
                    "left": "0"
                },
                ".LevelEditor .EditorMenuOption": {
                    "display": "inline-block",
                    "padding": "7px 14px",
                    "background": "white",
                    "border": "3px solid black",
                    "box-sizing": "border-box",
                    "color": "black",
                    "text-align": "center",
                    "overflow": "hidden",
                    "cursor": "pointer"
                },
                ".LevelEditor.minimized .EditorMenuOption:not(:first-of-type)": {
                    "display": "none"
                },
                ".LevelEditor.minimized .EditorMenuOption:first-of-type": {
                    "width": "auto"
                },
                ".LevelEditor .EditorMenuOption:hover": {
                    "opacity": ".91"
                },
                ".LevelEditor .EditorMenuOption.EditorMenuOptionHalf": {
                    "width": "50%"
                },
                ".LevelEditor .EditorMenuOption.EditorMenuOptionThird": {
                    "width": "33%"
                },
                ".LevelEditor .EditorMenuOption.EditorMenuOptionFifth": {
                    "width": "20%"
                },
                // EditorMapSettings
                ".LevelEditor .EditorMapSettingsGroup": {
                    "padding-left": "7px"
                },
                ".LevelEditor .EditorMapSettingsSubGroup": {
                    "padding-left": "14px"
                },
                ".LevelEditor.minimized .EditorMapSettings": {
                    "opacity": "0"
                }
            };
        }
    }
}
