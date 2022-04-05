/// <reference path="DeviceLayr-0.2.0.ts" />
/// <reference path="GamesRunnr-0.2.0.ts" />
/// <reference path="ItemsHoldr-0.2.1.ts" />
/// <reference path="InputWritr-0.2.0.ts" />
/// <reference path="LevelEditr-0.2.0.ts" />

/* tslint:disable:interface-name */

interface HTMLElement {
    requestFullScreen: () => void;
    webkitRequestFullScreen: () => void;
    mozRequestFullScreen: () => void;
    webkitFullscreenElement: () => void;
    cancelFullScreen: () => void;
    webkitCancelFullScreen: () => void;
    mozCancelFullScreen: () => void;
    msCancelFullScreen: () => void;
}

declare namespace UserWrappr {
    export interface IEvent {
        target: HTMLElement;
    }

    /**
     * The class of game being controlled by the UserWrappr. This will normally
     * be implemented by the GameStartr project itself.
     */
    export interface IGameStartr {
        DeviceLayer: DeviceLayr.IDeviceLayr;
        GamesRunner: GamesRunnr.IGamesRunnr;
        ItemsHolder: ItemsHoldr.IItemsHoldr;
        InputWriter: InputWritr.IInputWritr;
        LevelEditor: LevelEditr.ILevelEditr;
        UserWrapper: IUserWrappr;
        container: HTMLElement;
        addPageStyles(styles: StyleSheet): void;
        gameStart(): void;
        createElement(tag: string, ...args: any[]): HTMLElement;
        proliferate(recipient: any, donor: any, noOverride?: boolean): any;
    }

    /**
     * Custom settings for an individual IGameStartr instance, such as size info.
     */
    type IGameStartrCustoms = any;

    /**
     * Initializes a new instance of the IGameStartr interface.
     */
    export interface IGameStartrConstructor {
        new (...args: any[]): IGameStartr;
    }

    /**
     * Generator for a user-facing HTML control.
     * 
     * @param schema   A general description of the control to create.
     * @returns An HTML element as described by the schema.
     */
    export interface IOptionsGenerator {
        generate: (schema: UISchemas.ISchema) => HTMLDivElement;
    }

    /**
     * Options generators, keyed by name.
     */
    export interface IOptionsGenerators {
        [i: string]: IOptionsGenerator;
    }

    /**
     * How wide and tall an IUserWrappr's contained IGameStartr should be sized.
     */
    export interface ISizeSummary {
        /**
         * How wide the contained IGameStartr should be, as a standard Number or Infinity.
         */
        width: number;

        /**
         * How tall the contained IGameStartr should be, as a standard Number or Infinity.
         */
        height: number;

        /**
         * Whether the contained IGameStartr should request full screen size.
         */
        full?: boolean;

        /**
         * What this size summary should be referred to, if not its key in the container.
         */
        name?: string;
    }

    /**
     * Size summaries keyed by name.
     */
    export interface ISizeSummaries {
        [i: string]: ISizeSummary;
    }

    /**
     * Settings to initialize a new IUserWrappr.
     */
    export interface IUserWrapprSettings {
        /**
         * What the global object is called, such as "window".
         */
        globalName: string;

        /**
         * Allowed sizes for the game.
         */
        sizes: ISizeSummaries;

        /**
         * The default starting size.
         */
        sizeDefault: string;

        /**
         * Schemas for each UI control to be made.
         */
        schemas: UISchemas.ISchema[];

        /**
         * A list of all allowed keyboard keys to replace the UserWrappr class default.
         */
        allPossibleKeys?: string[];

        /**
         * A CSS selector for the game's container.
         */
        gameElementSelector?: string;

        /**
         * A CSS selector for the UI buttons container.
         */
        gameControlsSelector?: string;

        /**
         * A utility Function to log messages, commonly console.log.
         */
        logger?: (...args: any[]) => void;

        /**
         * Custom arguments to be passed to the IGameStartr's modules.
         */
        customs?: IGameStartrCustoms;

        /**
         * Any additional CSS styles to be applied to the page.
         */
        styleSheet?: StyleSheet;

        /**
         * The constructor for the IGameStartr implementation.
         */
        GameStartrConstructor: IGameStartrConstructor;
    }
    
    /**
     * A user interface manager made to work on top of GameStartr implementations
     * and provide a configurable HTML display of options.
     */
    export interface IUserWrappr {
        /**
         * Resets the internal GameStarter by storing it under window, adding
         * InputWritr pipes for input to the page, creating the HTML buttons,
         * and setting additional CSS styles and page visiblity.
         * 
         * @param settings   Settings for the GameStartr constructor.
         * @param customs   Additional settings for sizing information.
         */
        resetGameStarter(settings: IUserWrapprSettings, customs?: IGameStartrCustoms): void;

        /**
         * @returns The GameStartr implementation this is wrapping around.
         */
        getGameStartrConstructor(): IGameStartrConstructor;

        /**
         * @returns The GameStartr instance created by GameStartrConstructor.
         */
        getGameStarter(): IGameStartr;

        /**
         * @returns The ItemsHoldr used to store UI settings.
         */
        getItemsHolder(): ItemsHoldr.IItemsHoldr;

        /**
         * @returns The settings used to construct this UserWrappr.
         */
        getSettings(): IUserWrapprSettings;

        /**
         * @returns The customs used to construct the IGameStartr.
         */
        getCustoms(): IGameStartrCustoms;

        /**
         * @returns All the keys the user is allowed to pick from in UI controls.
         */
        getAllPossibleKeys(): string[];

        /**
         * @returns The allowed sizes for the game.
         */
        getSizes(): ISizeSummaries;

        /**
         * @returns The currently selected size for the game.
         */
        getCurrentSize(): ISizeSummary;

        /**
         * @returns Whether the game is currently in full screen mode.
         */
        getIsFullScreen(): boolean;

        /**
         * @returns Whether the page is currently known to be hidden.
         */
        getIsPageHidden(): boolean;

        /**
         * @returns A utility Function to log messages, commonly console.log.
         */
        getLogger(): (...args: any[]) => string;

        /**
         * @returns Generators used to generate HTML controls for the user.
         */
        getGenerators(): IOptionsGenerators;

        /**
         * @returns The document element that contains the game.
         */
        getDocumentElement(): HTMLHtmlElement;

        /**
         * @returns The method to request to enter full screen mode.
         */
        getRequestFullScreen(): () => void;

        /**
         * @returns The method to request to exit full screen mode.
         */
        getCancelFullScreen(): () => void;

        /**
         * @returns The identifier for the device input checking interval.
         */
        getDeviceChecker(): number;

        /**
         * Sets the size of the GameStartr by resetting the game with the size
         * information as part of its customs object. Full screen status is
         * changed accordingly.
         * 
         * @param size The size to set, as a String to retrieve the size from
         *             known info, or a container of settings.
         */
        setCurrentSize(size: string | ISizeSummary): void;
    }

    /**
     * Generators and descriptors for controls generated by an IUserWrappr.
     */
    export namespace UISchemas {
        /**
         * A general descripton of a user control containing some number of options.
         */
        export interface ISchema {
            /**
             * The name of the generator that should create this control.
             */
            generator: string;

            /**
             * The label for the control that users will see.
             */
            title: string;
        }

        /**
         * A general description of a single option within a user control.
         */
        export interface IOption {
            /**
             * The label for the option that users will see.
             */
            title: string;

            /**
             * A source Function for the option's initial value.
             */
            source: IOptionSource;
        }

        /**
         * A source Function for an option's individual value.
         * 
         * @param GameStarter   The GameStarter instance this control is for.
         * @returns An initial value for an option control.
         */
        export interface IOptionSource {
            (GameStarter: IGameStartr, ...args: any[]): any;
        }

        /**
         * An HTMLElement that has been given a utility setValue Function.
         */
        export interface IChoiceElement extends HTMLElement {
            /**
             * A utility Function to set this HTMLElement's value.
             * 
             * @param value   A new value for this element.
             */
            setValue(value: any): void;
        }

        /**
         * An HTMLInputElement that has been given a utility setValue Function.
         */
        export interface IInputElement extends HTMLInputElement, IChoiceElement { }

        /**
         * An HTMLSelectElement that has been given a utility setValue Function, as
         * well as a variable to hold a previous value.
         */
        export interface ISelectElement extends HTMLSelectElement {
            /**
             * A previous value for this element.
             */
            valueOld?: string;

            /**
             * A utility Function to set this HTMLElement's value.
             * 
             * @param value   A new value for this element.
             */
            setValue(value: any): void;
        }
    }
}

namespace UserWrappr.UISchemas {
    "use strict";

    /**
     * Handler for a map being selected.
     * 
     * @param GameStarter   The GameStarter whose level is being edited.
     * @param schema   The overall description of the editor control.
     * @param button   The button that was just clicked.
     * @param event   The event associated with the user clicking the button.
     */
    export interface IMapSelectionCallback {
        (GameStarter: IGameStartr, schema: IOptionsMapGridSchema, button: HTMLElement, event: Event): void;
    }

    /**
     * Base class for options generators. These all store a UserWrapper and
     * its GameStartr, along with a generate Function 
     */
    export abstract class OptionsGenerator implements IOptionsGenerator {
        /**
         * The container UserWrappr using this generator.
         */
        protected UserWrapper: UserWrappr.UserWrappr;

        /**
         * The container UserWrappr's GameStartr instance.
         */
        protected GameStarter: IGameStartr;

        /**
         * Initializes a new instance of the OptionsGenerator class.
         * 
         * @param UserWrappr   The container UserWrappr using this generator.
         */
        constructor(UserWrapper: UserWrappr.UserWrappr) {
            this.UserWrapper = UserWrapper;
            this.GameStarter = this.UserWrapper.getGameStarter();
        }

        /**
         * Generates a control element based on the provided schema.
         *
         * @param schema   A description of an element to create.
         * @returns An HTML element representing the schema.
         */
        abstract generate(schema: ISchema): HTMLDivElement;

        /**
         * Recursively searches for an element with the "control" class
         * that's a parent of the given element.
         * 
         * @param element   An element to start searching on.
         * @returns The closest node with className "control" to the given element
         *          in its ancestry tree.
         */
        protected getParentControlElement(element: HTMLElement): HTMLElement {
            if (element.className === "control" || !element.parentNode) {
                return element;
            }

            return this.getParentControlElement(element.parentElement);
        }
    }
}

namespace UserWrappr.UISchemas {
    "use strict";

    /**
     * Description of a user control for a listing of buttons.
     */
    export interface IOptionsButtonsSchema extends ISchema {
        /**
         * Descriptions of the options to be displayed as buttons.
         */
        options: IOptionSource | IOptionsButtonSchema[];

        /**
         * A general, default callback for when a button is clicked.
         */
        callback: (GameStarter: IGameStartr, ...args: any[]) => void;

        /**
         * A key to add to buttons when they're active.
         */
        keyActive?: string;

        /**
         * Whether buttons should be assumed to be inactive visually.
         */
        assumeInactive?: boolean;
    }

    /**
     * Description for a single button in a buttons schema.
     */
    export interface IOptionsButtonSchema extends IOption {
        /**
         * A callback for when this specific button is pressed.
         */
        callback?: (GameStarter: IGameStartr, ...args: any[]) => void;

        /**
         * A source for the button's initial value.
         */
        source: IOptionSource;

        /**
         * Whether the button's value should be stored locally between sessions.
         */
        storeLocally?: boolean;

        /**
         * What type of button this is, as keyed in the generator.
         */
        type: string;
    }

    /**
     * A buttons generator for an options section that contains any number
     * of general buttons.
     */
    export class ButtonsGenerator extends OptionsGenerator implements IOptionsGenerator {
        /**
         * Generates a control element with buttons described in the schema.
         * 
         * @param schema   A description of the element to create.
         * @returns An HTML element representing the schema.
         */
        generate(schema: IOptionsButtonsSchema): HTMLDivElement {
            var output: HTMLDivElement = document.createElement("div"),
                options: IOptionsButtonSchema[] = schema.options instanceof Function
                    ? (<IOptionSource>schema.options).call(self, this.GameStarter)
                    : schema.options,
                classNameStart: string = "select-option options-button-option",
                scope: ButtonsGenerator = this,
                option: IOptionsButtonSchema,
                element: HTMLDivElement,
                i: number;

            output.className = "select-options select-options-buttons";

            for (i = 0; i < options.length; i += 1) {
                option = options[i];

                element = document.createElement("div");
                element.className = classNameStart;
                element.textContent = option.title;

                element.onclick = function (schema: IOptionsButtonSchema, element: HTMLDivElement): void {
                    if (scope.getParentControlElement(element).getAttribute("active") !== "on") {
                        return;
                    }
                    schema.callback.call(scope, scope.GameStarter, schema, element);

                    if (element.getAttribute("option-enabled") === "true") {
                        element.setAttribute("option-enabled", "false");
                        element.className = classNameStart + " option-disabled";
                    } else {
                        element.setAttribute("option-enabled", "true");
                        element.className = classNameStart + " option-enabled";
                    }
                }.bind(this, schema, element);

                this.ensureLocalStorageButtonValue(element, option, schema);

                if (option[schema.keyActive || "active"]) {
                    element.className += " option-enabled";
                    element.setAttribute("option-enabled", "true");
                } else if (schema.assumeInactive) {
                    element.className += " option-disabled";
                    element.setAttribute("option-enabled", "false");
                } else {
                    element.setAttribute("option-enabled", "true");
                }

                output.appendChild(element);
            }

            return output;
        }

        /**
         * Ensures a value exists in localStorage, and has the given settings. If
         * it doesn't have a value, the schema's callback is used to provide one.
         * 
         * @param child   The value's representational HTML element.
         * @param details   Details 
         * @param schema   
         */
        protected ensureLocalStorageButtonValue(child: HTMLDivElement, details: IOptionsButtonSchema, schema: IOptionsButtonsSchema): void {
            var key: string = schema.title + "::" + details.title,
                valueDefault: string = details.source.call(this, this.GameStarter).toString(),
                value: string;

            child.setAttribute("localStorageKey", key);

            this.GameStarter.ItemsHolder.addItem(key, {
                "storeLocally": true,
                "valueDefault": valueDefault
            });

            value = this.GameStarter.ItemsHolder.getItem(key);
            if (value.toString().toLowerCase() === "true") {
                details[schema.keyActive || "active"] = true;
                schema.callback.call(this, this.GameStarter, schema, child);
            }
        }
    }
}

namespace UserWrappr.UISchemas {
    "use strict";

    /**
     * Description of a user control for a level editor.
     */
    export interface IOptionsEditorSchema extends ISchema {
        /**
         * Map names the user may load into the editor.
         */
        maps: IOptionsMapGridSchema;

        /**
         * Loads a built-in map into the editor after the user has clicked a button.
         */
        callback: IMapSelectionCallback;
    }

    /**
     * Options generator for a LevelEditr dialog.
     */
    export class LevelEditorGenerator extends OptionsGenerator implements IOptionsGenerator {
        /**
         * Generates a control for a level editor based on the provided schema.
         * 
         * @param schema   The overall description of the editor control.
         * @returns An HTML element representing the schema.
         */
        generate(schema: IOptionsEditorSchema): HTMLDivElement {
            var output: HTMLDivElement = document.createElement("div"),
                starter: HTMLDivElement = document.createElement("div"),
                betweenOne: HTMLDivElement = document.createElement("div"),
                betweenTwo: HTMLDivElement = document.createElement("div"),
                uploader: HTMLDivElement = this.createUploaderDiv(),
                mapper: HTMLDivElement = this.createMapSelectorDiv(schema),
                scope: LevelEditorGenerator = this;

            output.className = "select-options select-options-level-editor";

            starter.className = "select-option select-option-large options-button-option";
            starter.innerHTML = "Start the <br /> Level Editor!";
            starter.onclick = function (): void {
                scope.GameStarter.LevelEditor.enable();
            };

            betweenOne.className = betweenTwo.className = "select-option-title";
            betweenOne.innerHTML = betweenTwo.innerHTML = "<em>- or -</em><br />";

            output.appendChild(starter);
            output.appendChild(betweenOne);
            output.appendChild(uploader);
            output.appendChild(betweenTwo);
            output.appendChild(mapper);

            return output;
        }

        /**
         * Creates an HTML element that can be clicked or dragged on to upload a JSON file
         * into the level editor.
         * 
         * @returns An element containing the uploader div.
         */
        protected createUploaderDiv(): HTMLDivElement {
            var uploader: HTMLDivElement = document.createElement("div"),
                input: HTMLInputElement = document.createElement("input");

            uploader.className = "select-option select-option-large options-button-option";
            uploader.innerHTML = "Continue an<br />editor file!";
            uploader.setAttribute("textOld", uploader.textContent);

            input.type = "file";
            input.className = "select-upload-input";
            input.onchange = this.handleFileDrop.bind(this, input, uploader);

            uploader.ondragenter = this.handleFileDragEnter.bind(this, uploader);
            uploader.ondragover = this.handleFileDragOver.bind(this, uploader);
            uploader.ondragleave = input.ondragend = this.handleFileDragLeave.bind(this, uploader);
            uploader.ondrop = this.handleFileDrop.bind(this, input, uploader);
            uploader.onclick = input.click.bind(input);

            uploader.appendChild(input);

            return uploader;
        }

        /**
         * Creates an HTML element that allows a user to choose between maps to load into
         * the level editor.
         * 
         * @param schema   The overall description of the container user control.
         * @returns An element containing the map selector.
         */
        protected createMapSelectorDiv(schema: IOptionsEditorSchema): HTMLDivElement {
            var expanded: boolean = true,
                generatorName: string = "MapsGrid",
                container: HTMLDivElement = <HTMLDivElement>this.GameStarter.createElement(
                    "div",
                    {
                        "className": "select-options-group select-options-editor-maps-selector"
                    }),
                toggler: HTMLDivElement = <HTMLDivElement>this.GameStarter.createElement(
                    "div",
                    {
                        "className": "select-option select-option-large options-button-option"
                    }),
                mapsOut: HTMLDivElement = <HTMLDivElement>this.GameStarter.createElement(
                    "div",
                    {
                        "className": "select-options-holder select-options-editor-maps-holder"
                    }),
                mapsIn: HTMLDivElement = this.UserWrapper.getGenerators()[generatorName].generate(
                    this.GameStarter.proliferate(
                        {
                            "callback": schema.callback
                        },
                        schema.maps));

            toggler.onclick = function (event?: Event): void {
                expanded = !expanded;

                if (expanded) {
                    toggler.textContent = "(cancel)";
                    mapsOut.style.position = "";
                    mapsIn.style.height = "";
                } else {
                    toggler.innerHTML = "Edit a <br />built-in map!";
                    mapsOut.style.position = "absolute";
                    mapsIn.style.height = "0";
                }

                if (!container.parentElement) {
                    return;
                }

                [].slice.call(container.parentElement.children)
                    .forEach(function (element: HTMLElement): void {
                        if (element !== container) {
                            element.style.display = (expanded ? "none" : "block");
                        }
                    });
            };

            toggler.onclick(null);

            mapsOut.appendChild(mapsIn);
            container.appendChild(toggler);
            container.appendChild(mapsOut);

            return container;
        }

        /**
         * Handles a dragged file entering a map selector. Visual styles are updated.
         * 
         * @param uploader   The element being dragged onto.
         * @param event   The event caused by the dragging.
         */
        protected handleFileDragEnter(uploader: HTMLDivElement, event: LevelEditr.IDataMouseEvent): void {
            if (event.dataTransfer) {
                event.dataTransfer.dropEffect = "copy";
            }

            uploader.className += " hovering";
        }

        /**
         * Handles a dragged file moving over a map selector.
         * 
         * @param uploader   The element being dragged onto.
         * @param event   The event caused by the dragging.
         */
        protected handleFileDragOver(uploader: HTMLElement, event: MouseEvent): boolean {
            event.preventDefault();
            return false;
        }

        /**
         * Handles a dragged file leaving a map selector. Visual styles are updated.
         * 
         * @param uploader   The element being dragged onto.
         * @param event   The event caused by the dragging.
         */
        protected handleFileDragLeave(uploader: HTMLElement, event: LevelEditr.IDataMouseEvent): void {
            if (event.dataTransfer) {
                event.dataTransfer.dropEffect = "none";
            }

            uploader.className = uploader.className.replace(" hovering", "");
        }

        /**
         * Handles a dragged file being dropped onto a map selector. The file is read, and
         * events attached to its progress.
         * 
         * @param input   The HTMLInputElement triggering the file event.
         * @param uploader   The element being dragged onto.
         * @param event   The event caused by the dragging.
         */
        protected handleFileDrop(input: HTMLInputElement, uploader: HTMLDivElement, event: LevelEditr.IDataMouseEvent): void {
            var files: FileList = input.files || event.dataTransfer.files,
                file: File = files[0],
                reader: FileReader = new FileReader();

            this.handleFileDragLeave(input, event);
            event.preventDefault();
            event.stopPropagation();

            reader.onprogress = this.handleFileUploadProgress.bind(this, file, uploader);
            reader.onloadend = this.handleFileUploadCompletion.bind(this, file, uploader);

            reader.readAsText(file);
        }

        /**
         * Handles a file upload reporting some amount of progress.
         * 
         * @param file   The file being uploaded.
         * @param uploader   The element the file was being dragged onto.
         * @param event   The event caused by the progress.
         */
        protected handleFileUploadProgress(file: File, uploader: HTMLDivElement, event: LevelEditr.IDataProgressEvent): void {
            if (!event.lengthComputable) {
                return;
            }

            var percent: number = Math.round((event.loaded / event.total) * 100);

            if (percent > 100) {
                percent = 100;
            }

            uploader.innerText = "Uploading '" + file.name + "' (" + percent + "%)...";
        }

        /**
         * Handles a file upload completing. The file's contents are loaded into
         * the level editor.
         * 
         * @param file   The file being uploaded.
         * @param uploader   The element the file was being dragged onto.
         * @param event   The event caused by the upload completing.
         */
        protected handleFileUploadCompletion(file: File, uploader: HTMLDivElement, event: LevelEditr.IDataProgressEvent): void {
            this.GameStarter.LevelEditor.handleUploadCompletion(event);
            uploader.innerText = uploader.getAttribute("textOld");
        }
    }
}

namespace UserWrappr.UISchemas {
    "use strict";

    /**
     * Description of a user control for a map selector.
     */
    export interface IOptionsMapGridSchema extends ISchema {
        /**
         * Handler for a map being selected.
         */
        callback: IMapSelectionCallback;

        /**
         * If there is a table of maps, the start and end x-values.
         */
        rangeX?: [number, number];

        /**
         * If there is a table of maps, the start and end y-values.
         */
        rangeY?: [number, number];

        /**
         * Extra options to be displayed.
         */
        extras?: IOptionsMapGridExtra[];
    }

    /**
     * An extra option to be displayed in a maps grid.
     */
    export interface IOptionsMapGridExtra {
        /**
         * The visible label of the extra's button.
         */
        title: string;

        /**
         * Handler for when this extra's button is triggered.
         */
        callback: IMapSelectionCallback;

        /**
         * Descriptions of any extra elements to be displayed.
         */
        extraElements: IOptionsMapGridExtraElement[];
    }

    /**
     * A description of an extra element to place after a maps grid extra, to be piped
     * directly int IGameStartr::createElement.
     */
    export interface IOptionsMapGridExtraElement {
        /**
         * The tag name of the element.
         */
        tag: string;

        /**
         * Options for the element, such as className or value.
         */
        options: any;
    }

    /**
     * Options generator for a grid of maps.
     */
    export class MapsGridGenerator extends OptionsGenerator implements IOptionsGenerator {
        /**
         * Generates the HTML element for the maps.
         * 
         * @param schema   The overall description of the editor control.
         * @returns An HTML element representing the schema.
         */
        generate(schema: IOptionsMapGridSchema): HTMLDivElement {
            var output: HTMLDivElement = document.createElement("div");

            output.className = "select-options select-options-maps-grid";

            if (schema.rangeX && schema.rangeY) {
                output.appendChild(this.generateRangedTable(schema));
            }

            if (schema.extras) {
                this.appendExtras(output, schema);
            }

            return output;
        }

        /**
         * Generates a table of map selection buttons from x- and y- ranges.
         * 
         * @param schema   The overall description of the editor control.
         * @returns An HTMLTableElement with a grid of map selection buttons.
         */
        generateRangedTable(schema: IOptionsMapGridSchema): HTMLTableElement {
            var scope: MapsGridGenerator = this,
                table: HTMLTableElement = document.createElement("table"),
                rangeX: number[] = schema.rangeX,
                rangeY: number[] = schema.rangeY,
                row: HTMLTableRowElement,
                cell: HTMLTableCellElement,
                i: number,
                j: number;

            for (i = rangeY[0]; i <= rangeY[1]; i += 1) {
                row = document.createElement("tr");
                row.className = "maps-grid-row";

                for (j = rangeX[0]; j <= rangeX[1]; j += 1) {
                    cell = document.createElement("td");
                    cell.className = "select-option maps-grid-option maps-grid-option-range";
                    cell.textContent = i + "-" + j;
                    cell.onclick = (function (callback: () => any): void {
                        if (scope.getParentControlElement(cell).getAttribute("active") === "on") {
                            callback();
                        }
                    }).bind(scope, schema.callback.bind(scope, scope.GameStarter, schema, cell));
                    row.appendChild(cell);
                }

                table.appendChild(row);
            }

            return table;
        }

        /**
         * Adds any specified extra elements to this control's element.
         * 
         * @param output   The element created by this generator.
         * @param schema   The overall discription of the editor control.
         */
        appendExtras(output: HTMLDivElement, schema: IOptionsMapGridSchema): void {
            var element: HTMLDivElement,
                extra: IOptionsMapGridExtra,
                i: number,
                j: number;

            for (i = 0; i < schema.extras.length; i += 1) {
                extra = schema.extras[i];
                element = document.createElement("div");

                element.className = "select-option maps-grid-option maps-grid-option-extra";
                element.textContent = extra.title;
                element.setAttribute("value", extra.title);
                element.onclick = extra.callback.bind(this, this.GameStarter, schema, element);
                output.appendChild(element);

                if (extra.extraElements) {
                    for (j = 0; j < extra.extraElements.length; j += 1) {
                        output.appendChild(this.GameStarter.createElement(
                            extra.extraElements[j].tag,
                            extra.extraElements[j].options));
                    }
                }
            }
        }
    }
}

namespace UserWrappr.UISchemas {
    "use strict";

    /**
     * Description of a user control for a table of options.
     */
    export interface IOptionsTableSchema extends ISchema {
        /**
         * Descriptions of action buttons that should be appended to the options.
         */
        actions?: IOptionsTableAction[];

        /**
         * Descriptions of the options to be displayed in the table.
         */
        options: IOptionsTableOption[];
    }

    /**
     * Description of an action button in the control.
     */
    export interface IOptionsTableAction {
        /**
         * The button's label, displayed to the user.
         */
        title: string;

        /**
         * Callback for when the button is triggered.
         * 
         * @param GameStarter   The GameStarter this option is controlling.
         */
        action: (GameStarter: IGameStartr) => void;
    }

    /**
     * Desription of an option to be displayed in a table control.
     */
    export interface IOptionsTableOption extends IOption {
        /**
         * The key for the type of option, such as "Button".
         */
        type: string;

        /**
         * Whether the button's value should be stored locally between sessions.
         */
        storeLocally?: boolean;
    }

    /**
     * Description of an option with a boolean value.
     */
    export interface IOptionsTableBooleanOption extends IOptionsTableOption {
        /**
         * Callback for when the value becomes false.
         * 
         * @param GameStarter   The GameStarter this option is controlling.
         */
        disable: (GameStarter: IGameStartr) => void;

        /**
         * Callback for when the value becomes true.
         * 
         * @param GameStarter   The GameStarter this option is controlling.
         */
        enable: (GameStarter: IGameStartr) => void;

        /**
         * A key to add to the button's className when the value is true.
         */
        keyActive?: string;

        /**
         * Whether the button's value is assumed to be false visually.
         */
        assumeInactive?: boolean;
    }

    /**
     * Description of an option for keyboard keys.
     */
    export interface IOptionsTableKeysOption extends IOptionsTableOption {
        /**
         * Callback for when the value changes.
         * 
         * @param GameStarter   The GameStarter this option is controlling.
         */
        callback: (GameStarter: IGameStartr) => void;

        /**
         * A source for the allowed keys in the option.
         * 
         * @returns The allowed keys in the option.
         */
        source: (GameStarter: IGameStartr) => string[];
    }

    /**
     * Description of an option with a numeric value.
     */
    export interface IOptionsTableNumberOption extends IOptionsTableOption {
        /**
         * A minimum value.
         */
        minimum?: number;

        /**
         * A maximum value.
         */
        maximum?: number;

        /**
         * Callback for when the value changes.
         * 
         * @param GameStarter   The GameStarter this option is controlling.
         */
        update: (GameStarter: IGameStartr) => void;
    }

    /**
     * Description of an option with multiple preset values.
     */
    export interface IOptionsTableSelectOption extends IOptionsTableOption {
        /**
         * A source for the allowed keys in the option.
         * 
         * @param GameStarter   The GameStarter this option is controlling.
         * @returns The allowed keys in the option.
         */
        options: (GameStarter: IGameStartr) => string[];

        /**
         * A source for the initially selected value.
         * 
         * @param GameStarter   The GameStarter this option is controlling.
         * @returns The allowed keys in the option.
         */
        source: (GameStarter: IGameStartr) => string;

        /**
         * Callback for when the value changes.
         * 
         * @param GameStarter   The GameStarter this option is controlling.
         * @param value   A new value, if this is triggered via a code callback.
         */
        update: (GameStarter: IGameStartr, value?: any) => void;
    }

    /**
     * Description of an option for setting the GameStartr's screen size.
     */
    export interface IOptionsTableScreenSizeOption extends IOptionsTableOption {
        /**
         * A source for names of the allowed screen sizes.
         * 
         * @param GameStarter   The GameStarter this option is controlling. 
         * @returns Names of the allowed screen sizes.
         */
        options: (GameStarter: IGameStartr) => string[];

        /**
         * A source for the initially selected value.
         * 
         * @param GameStarter   The GameStarter this option is controlling.
         * @returns The allowed keys in the option.
         */
        source: (GameStarter: IGameStartr) => string;

        /**
         * Callback for when the value changes.
         * 
         * @param GameStarter   The GameStarter this option is controlling.
         * @param value   The newly selected size information.
         */
        update: (GameStarter: IGameStartr, value: ISizeSummary) => void;
    }

    /**
     * Container of table option descriptions, keyed by name.
     */
    export interface IOptionsTableTypes {
        [i: string]: (input: IInputElement | ISelectElement, details: IOptionsTableOption, schema: ISchema) => any;
    }

    /**
     * An options generator for a table of options. Each table contains a (left) label cell
     * and a (right) value cell with some sort of input.
     */
    export class TableGenerator extends OptionsGenerator implements IOptionsGenerator {
        /**
         * Generators for the value cells within table rows.
         */
        protected static optionTypes: IOptionsTableTypes = {
            "Boolean": TableGenerator.prototype.setBooleanInput,
            "Keys": TableGenerator.prototype.setKeyInput,
            "Number": TableGenerator.prototype.setNumberInput,
            "Select": TableGenerator.prototype.setSelectInput,
            "ScreenSize": TableGenerator.prototype.setScreenSizeInput
        };

        /**
         * Generates a control element with tabular information based on the provided schema.
         * 
         * @param schema   A description of the tabular data to represent.
         * @returns An HTML element representing the schema.
         */
        generate(schema: IOptionsTableSchema): HTMLDivElement {
            var output: HTMLDivElement = document.createElement("div"),
                table: HTMLTableElement = document.createElement("table"),
                option: IOptionsTableOption,
                action: IOptionsTableAction,
                row: HTMLTableRowElement | HTMLDivElement,
                label: HTMLTableDataCellElement,
                input: HTMLTableDataCellElement,
                child: IInputElement | ISelectElement,
                i: number;

            output.className = "select-options select-options-table";

            if (schema.options) {
                for (i = 0; i < schema.options.length; i += 1) {
                    row = document.createElement("tr");
                    label = document.createElement("td");
                    input = document.createElement("td");

                    option = schema.options[i];

                    label.className = "options-label-" + option.type;
                    label.textContent = option.title;

                    input.className = "options-cell-" + option.type;

                    row.appendChild(label);
                    row.appendChild(input);

                    child = TableGenerator.optionTypes[schema.options[i].type].call(this, input, option, schema);
                    if (option.storeLocally) {
                        this.ensureLocalStorageInputValue(child, option, schema);
                    }

                    table.appendChild(row);
                }
            }

            output.appendChild(table);

            if (schema.actions) {
                for (i = 0; i < schema.actions.length; i += 1) {
                    row = document.createElement("div");

                    action = schema.actions[i];

                    row.className = "select-option options-button-option";
                    row.textContent = action.title;
                    row.onclick = action.action.bind(this, this.GameStarter);

                    output.appendChild(row);
                }
            }

            return output;
        }

        /**
         * Initializes an input for a boolean value.
         * 
         * @param input   An input that will contain a boolean value.
         * @param details   Details for this individual value.
         * @param schema   Details for the overall table schema.
         * @returns An HTML element containing the input.
         */
        protected setBooleanInput(input: IInputElement, details: IOptionsTableBooleanOption, schema: ISchema): IInputElement {
            var status: boolean = details.source.call(this, this.GameStarter),
                statusClass: string = status ? "enabled" : "disabled",
                scope: TableGenerator = this;

            input.className = "select-option options-button-option option-" + statusClass;
            input.textContent = status ? "on" : "off";

            input.onclick = function (): void {
                input.setValue(input.textContent === "off");
            };

            input.setValue = function (newStatus: string | boolean): void {
                if (newStatus.constructor === String) {
                    if (newStatus === "false" || newStatus === "off") {
                        newStatus = false;
                    } else if (newStatus === "true" || newStatus === "on") {
                        newStatus = true;
                    }
                }

                if (newStatus) {
                    details.enable.call(scope, scope.GameStarter);
                    input.textContent = "on";
                    input.className = input.className.replace("disabled", "enabled");
                } else {
                    details.disable.call(scope, scope.GameStarter);
                    input.textContent = "off";
                    input.className = input.className.replace("enabled", "disabled");
                }

                if (details.storeLocally) {
                    scope.storeLocalStorageValue(input, newStatus.toString());
                }
            };

            return input;
        }

        /**
         * Initializes an input for a keyboard key value.
         * 
         * @param input   An input that will contain a keyboard key value.
         * @param details   Details for this individual value.
         * @param schema   Details for the overall table schema.
         * @returns An HTML element containing the input.
         */
        protected setKeyInput(input: IInputElement, details: IOptionsTableKeysOption, schema: ISchema): ISelectElement[] {
            var values: string = details.source.call(this, this.GameStarter),
                possibleKeys: string[] = this.UserWrapper.getAllPossibleKeys(),
                children: ISelectElement[] = [],
                child: ISelectElement,
                scope: TableGenerator = this,
                valueLower: string,
                i: number,
                j: number;

            for (i = 0; i < values.length; i += 1) {
                valueLower = values[i].toLowerCase();

                child = <ISelectElement>document.createElement("select");
                child.className = "options-key-option";
                child.value = child.valueOld = valueLower;

                for (j = 0; j < possibleKeys.length; j += 1) {
                    child.appendChild(new Option(possibleKeys[j]));

                    // Setting child.value won't work in IE or Edge...
                    if (possibleKeys[j] === valueLower) {
                        child.selectedIndex = j;
                    }
                }

                child.onchange = (function (child: ISelectElement): void {
                    details.callback.call(scope, scope.GameStarter, child.valueOld, child.value);
                    if (details.storeLocally) {
                        scope.storeLocalStorageValue(child, child.value);
                    }
                }).bind(undefined, child);

                children.push(child);
                input.appendChild(child);
            }

            return children;
        }

        /**
         * Initializes an input for a numeric value.
         * 
         * @param input   An input that will contain a numeric value.
         * @param details   Details for this individual value.
         * @param schema   Details for the overall table schema.
         * @returns An HTML element containing the input.
         */
        protected setNumberInput(input: IInputElement, details: IOptionsTableNumberOption, schema: ISchema): IInputElement {
            var child: IInputElement = <UISchemas.IInputElement>document.createElement("input"),
                scope: TableGenerator = this;

            child.type = "number";
            child.value = Number(details.source.call(scope, scope.GameStarter)).toString();
            child.min = (details.minimum || 0).toString();
            child.max = (details.maximum || Math.max(details.minimum + 10, 10)).toString();

            child.onchange = child.oninput = function (): void {
                if (child.checkValidity()) {
                    details.update.call(scope, scope.GameStarter, child.value);
                }
                if (details.storeLocally) {
                    scope.storeLocalStorageValue(child, child.value);
                }
            };

            input.appendChild(child);

            return child;
        }

        /**
         * Initializes an input for a value with multiple preset options.
         * 
         * @param input   An input that will contain a value with multiple present options.
         * @param details   Details for this individual value.
         * @param schema   Details for the overall table schema.
         * @returns An HTML element containing the input.
         */
        protected setSelectInput(input: ISelectElement, details: IOptionsTableSelectOption, schema: ISchema): ISelectElement {
            var child: ISelectElement = <ISelectElement>document.createElement("select"),
                options: string[] = details.options(this.GameStarter),
                scope: TableGenerator = this,
                i: number;

            for (i = 0; i < options.length; i += 1) {
                child.appendChild(new Option(options[i]));
            }

            child.value = details.source.call(scope, scope.GameStarter);

            child.onchange = function (): void {
                details.update.call(scope, scope.GameStarter, child.value);
                child.blur();

                if (details.storeLocally) {
                    scope.storeLocalStorageValue(child, child.value);
                }
            };

            input.appendChild(child);

            return child;
        }

        /**
         * Initializes an input for setting the GameStartr's screen size.
         * 
         * @param input   An input that will set a GameStartr's screen size.
         * @param details   Details for this individual value.
         * @param schema   Details for the overall table schema.
         * @returns An HTML element containing the input.
         */
        protected setScreenSizeInput(input: ISelectElement, details: IOptionsTableScreenSizeOption, schema: ISchema): ISelectElement {
            var scope: TableGenerator = this,
                child: ISelectElement;

            details.options = function (): string[] {
                return Object.keys(scope.UserWrapper.getSizes());
            };

            details.source = function (): string {
                return scope.UserWrapper.getCurrentSize().name;
            };

            details.update = function (GameStarter: IGameStartr, value: ISizeSummary | string): ISelectElement {
                if (value === scope.UserWrapper.getCurrentSize()) {
                    return undefined;
                }

                scope.UserWrapper.setCurrentSize(value);
            };
            child = scope.setSelectInput(input, details, schema);

            return child;
        }

        /**
         * Ensures an input's required local storage value is being stored,
         * and adds it to the internal GameStarter.ItemsHolder if not. If it
         * is, and the child's value isn't equal to it, the value is set.
         * 
         * @param childRaw   An input or select element, or an Array thereof. 
         * @param details   Details containing the title of the item and the 
         *                  source Function to get its value.
         * @param schema   The container schema this child is within.
         */
        protected ensureLocalStorageInputValue(childRaw: IChoiceElement | IChoiceElement[], details: IOption, schema: ISchema): void {
            if (childRaw.constructor === Array) {
                this.ensureLocalStorageValues(<IInputElement[]>childRaw, details, schema);
                return;
            }

            var child: IInputElement | ISelectElement = <IInputElement | ISelectElement>childRaw,
                key: string = schema.title + "::" + details.title,
                valueDefault: string = details.source.call(this, this.GameStarter).toString(),
                value: string;

            child.setAttribute("localStorageKey", key);
            this.GameStarter.ItemsHolder.addItem(key, {
                "storeLocally": true,
                "valueDefault": valueDefault
            });

            value = this.GameStarter.ItemsHolder.getItem(key);
            if (value !== "" && value !== child.value) {
                child.value = value;

                if (child.setValue) {
                    child.setValue(value);
                } else if (child.onchange) {
                    child.onchange(undefined);
                } else if (child.onclick) {
                    child.onclick(undefined);
                }
            }
        }

        /**
         * Ensures a collection of items all exist in localStorage. If their values
         * don't exist, their schema's .callback is used to provide them.
         * 
         * @param childRaw   An Array of input or select elements.
         * @param details   Details containing the title of the item and the source 
         *                  Function to get its value.
         * @param schema   The container schema this child is within.
         */
        protected ensureLocalStorageValues(children: (IInputElement | ISelectElement)[], details: IOption, schema: ISchema): void {
            var keyGeneral: string = schema.title + "::" + details.title,
                values: any[] = details.source.call(this, this.GameStarter),
                key: string,
                value: any,
                child: IInputElement | ISelectElement,
                i: number;

            for (i = 0; i < children.length; i += 1) {
                key = keyGeneral + "::" + i;
                child = children[i];
                child.setAttribute("localStorageKey", key);

                this.GameStarter.ItemsHolder.addItem(key, {
                    "storeLocally": true,
                    "valueDefault": values[i]
                });

                value = this.GameStarter.ItemsHolder.getItem(key);
                if (value !== "" && value !== child.value) {
                    child.value = value;

                    if (child.onchange) {
                        child.onchange(undefined);
                    } else if (child.onclick) {
                        child.onclick(undefined);
                    }
                }
            }
        }

        /**
         * Stores an element's value in the internal GameStarter.ItemsHolder,
         * if it has the "localStorageKey" attribute.
         * 
         * @param {HTMLElement} child   An element with a value to store.
         * @param {Mixed} value   What value is to be stored under the key.
         */
        protected storeLocalStorageValue(child: IInputElement | ISelectElement, value: any): void {
            var key: string = child.getAttribute("localStorageKey");

            if (key) {
                this.GameStarter.ItemsHolder.setItem(key, value);
                this.GameStarter.ItemsHolder.saveItem(key);
            }
        }
    }
}


namespace UserWrappr {
    "use strict";

    /**
     * A user interface manager made to work on top of GameStartr implementations
     * and provide a configurable HTML display of options.
     */
    export class UserWrappr {
        /**
         * The default list of all allowed keyboard keys.
         */
        private static allPossibleKeys: string[] = [
            "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m",
            "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z",
            "up", "right", "down", "left", "space", "shift", "ctrl"
        ];

        /**
         * The GameStartr implementation this is wrapping around, such as
         * FullScreenMario or FullScreenPokemon.
         */
        private GameStartrConstructor: IGameStartrConstructor;

        /**
         * The GameStartr instance created by GameStartrConstructor and stored
         * under window.
         */
        private GameStarter: IGameStartr;

        /**
         * A ItemsHoldr used to store UI settings.
         */
        private ItemsHolder: ItemsHoldr.IItemsHoldr;

        /**
         * The settings used to construct the UserWrappr.
         */
        private settings: IUserWrapprSettings;

        /**
         * Custom arguments to be passed to the GameStartr's modules.
         */
        private customs: any;

        /**
         * What the global object is called (typically "window" for browser 
         * environments and "global" for node-style environments).
         */
        private globalName: string;

        /**
         * All the keys the user is allowed to pick from as key bindings.
         */
        private allPossibleKeys: string[];

        /**
         * The allowed sizes for the game.
         */
        private sizes: ISizeSummaries;

        /**
         * The currently selected size for the game.
         */
        private currentSize: ISizeSummary;

        /**
         * The CSS selector for the HTML element containing GameStarter's container.
         */
        private gameElementSelector: string;

        /**
         * The CSS selector for the HTMl element containing the UI buttons.
         */
        private gameControlsSelector: string;

        /**
         * Whether the game is currently in full screen mode.
         */
        private isFullScreen: boolean;

        /**
         * Whether the page is currently known to be hidden.
         */
        private isPageHidden: boolean;

        /**
         * A utility Function to log messages, commonly console.log.
         */
        private logger: (...args: any[]) => any;

        /**
         * Generators used to generate HTML controls for the user.
         */
        private generators: { [i: string]: IOptionsGenerator };

        /**
         * Identifier for the interval Function checking for device input.
         */
        private deviceChecker: number;

        /**
         * The document element that will contain the game.
         */
        private documentElement: HTMLHtmlElement = <HTMLHtmlElement>document.documentElement;

        /**
         * A browser-dependent method for request to enter full screen mode.
         */
        private requestFullScreen: () => void = (
            this.documentElement.requestFullScreen
            || this.documentElement.webkitRequestFullScreen
            || this.documentElement.mozRequestFullScreen
            || (<any>this.documentElement).msRequestFullscreen
            || function (): void {
                alert("Not able to request full screen...");
            }
        ).bind(this.documentElement);

        /**
         * A browser-dependent method for request to exit full screen mode.
         */
        private cancelFullScreen: () => void = (
            this.documentElement.cancelFullScreen
            || this.documentElement.webkitCancelFullScreen
            || this.documentElement.mozCancelFullScreen
            || (<any>this.documentElement).msCancelFullScreen
            || function (): void {
                alert("Not able to cancel full screen...");
            }
        ).bind(document);

        /**
         * Initializes a new instance of the UserWrappr class.
         * 
         * @param settings   Settings to be used for initialization.
         */
        constructor(settings: IUserWrapprSettings) {
            if (typeof settings === "undefined") {
                throw new Error("No settings object given to UserWrappr.");
            }
            if (typeof settings.GameStartrConstructor === "undefined") {
                throw new Error("No GameStartrConstructor given to UserWrappr.");
            }
            if (typeof settings.globalName === "undefined") {
                throw new Error("No globalName given to UserWrappr.");
            }
            if (typeof settings.sizes === "undefined") {
                throw new Error("No sizes given to UserWrappr.");
            }
            if (typeof settings.sizeDefault === "undefined") {
                throw new Error("No sizeDefault given to UserWrappr.");
            }
            if (typeof settings.schemas === "undefined") {
                throw new Error("No schemas given to UserWrappr.");
            }

            this.settings = settings;
            this.GameStartrConstructor = settings.GameStartrConstructor;
            this.globalName = settings.globalName;

            this.sizes = this.importSizes(settings.sizes);

            this.customs = settings.customs || {};
            this.gameElementSelector = settings.gameElementSelector || "#game";
            this.gameControlsSelector = settings.gameControlsSelector || "#controls";
            this.logger = settings.logger || console.log.bind(console);

            this.isFullScreen = false;
            this.setCurrentSize(this.sizes[settings.sizeDefault]);

            this.allPossibleKeys = settings.allPossibleKeys || UserWrappr.allPossibleKeys;

            // Size information is also passed to modules via this.customs
            this.GameStartrConstructor.prototype.proliferate(this.customs, this.currentSize, true);

            this.resetGameStarter(settings, this.customs);
        }

        /**
         * Resets the internal GameStarter by storing it under window, adding
         * InputWritr pipes for input to the page, creating the HTML buttons,
         * and setting additional CSS styles and page visiblity.
         * 
         * @param settings   Settings for the GameStartr constructor.
         * @param customs   Additional settings for sizing information.
         */
        resetGameStarter(settings: IUserWrapprSettings, customs: IGameStartrCustoms = {}): void {
            this.loadGameStarter(this.fixCustoms(customs));

            window[settings.globalName] = this.GameStarter;
            this.GameStarter.UserWrapper = this;

            this.loadGenerators();
            this.loadControls(settings.schemas);

            if (settings.styleSheet) {
                this.GameStarter.addPageStyles(settings.styleSheet);
            }

            this.resetPageVisibilityHandlers();

            this.GameStarter.gameStart();

            this.startCheckingDevices();
        }


        /* Simple gets
        */

        /**
         * @returns The GameStartr implementation this is wrapping around.
         */
        getGameStartrConstructor(): IGameStartrConstructor {
            return this.GameStartrConstructor;
        }

        /**
         * @returns The GameStartr instance created by GameStartrConstructor.
         */
        getGameStarter(): IGameStartr {
            return this.GameStarter;
        }

        /**
         * @returns The ItemsHoldr used to store UI settings.
         */
        getItemsHolder(): ItemsHoldr.IItemsHoldr {
            return this.ItemsHolder;
        }

        /**
         * @returns The settings used to construct this UserWrappr.
         */
        getSettings(): IUserWrapprSettings {
            return this.settings;
        }

        /**
         * @returns The customs used to construct the IGameStartr.
         */
        getCustoms(): IGameStartrCustoms {
            return this.customs;
        }

        /**
         * @returns All the keys the user is allowed to pick from in UI controls.
         */
        getAllPossibleKeys(): string[] {
            return this.allPossibleKeys;
        }

        /**
         * @returns The allowed sizes for the game.
         */
        getSizes(): ISizeSummaries {
            return this.sizes;
        }

        /**
         * @returns The currently selected size for the game.
         */
        getCurrentSize(): ISizeSummary {
            return this.currentSize;
        }

        /**
         * @returns Whether the game is currently in full screen mode.
         */
        getIsFullScreen(): boolean {
            return this.isFullScreen;
        }

        /**
         * @returns Whether the page is currently known to be hidden.
         */
        getIsPageHidden(): boolean {
            return this.isPageHidden;
        }

        /**
         * @returns A utility Function to log messages, commonly console.log.
         */
        getLogger(): (...args: any[]) => string {
            return this.logger;
        }

        /**
         * @returns Generators used to generate HTML controls for the user.
         */
        getGenerators(): IOptionsGenerators {
            return this.generators;
        }

        /**
         * @returns The document element that contains the game.
         */
        getDocumentElement(): HTMLHtmlElement {
            return this.documentElement;
        }

        /**
         * @returns The method to request to enter full screen mode.
         */
        getRequestFullScreen(): () => void {
            return this.requestFullScreen;
        }

        /**
         * @returns The method to request to exit full screen mode.
         */
        getCancelFullScreen(): () => void {
            return this.cancelFullScreen;
        }

        /**
         * @returns The identifier for the device input checking interval.
         */
        getDeviceChecker(): number {
            return this.deviceChecker;
        }


        /* Externally allowed sets
        */

        /**
         * Sets the size of the GameStartr by resetting the game with the size
         * information as part of its customs object. Full screen status is
         * changed accordingly.
         * 
         * @param size The size to set, as a String to retrieve the size from
         *             known info, or a container of settings.
         */
        setCurrentSize(size: string | ISizeSummary): void {
            if (typeof size === "string" || size.constructor === String) {
                if (!this.sizes.hasOwnProperty(<string>size)) {
                    throw new Error("Size " + size + " does not exist on the UserWrappr.");
                }
                size = <ISizeSummary>this.sizes[<string>size];
            }

            this.customs = this.fixCustoms(this.customs);

            if ((<ISizeSummary>size).full) {
                this.requestFullScreen();
                this.isFullScreen = true;
            } else if (this.isFullScreen) {
                this.cancelFullScreen();
                this.isFullScreen = false;
            }

            this.currentSize = <ISizeSummary>size;

            if (this.GameStarter) {
                this.GameStarter.container.parentNode.removeChild(this.GameStarter.container);
                this.resetGameStarter(this.settings, this.customs);
            }
        }


        /* Devices
        */

        /**
         * Starts the checkDevices loop to scan for gamepad status changes.
         */
        private startCheckingDevices(): void {
            this.checkDevices();
        }

        /**
         * Calls the DeviceLayer to check for gamepad triggers, after scheduling
         * another checkDevices call via setTimeout.
         */
        private checkDevices(): void {
            this.deviceChecker = setTimeout(
                this.checkDevices.bind(this),
                this.GameStarter.GamesRunner.getPaused()
                    ? 117
                    : this.GameStarter.GamesRunner.getInterval() / this.GameStarter.GamesRunner.getSpeed());

            this.GameStarter.DeviceLayer.checkNavigatorGamepads();
            this.GameStarter.DeviceLayer.activateAllGamepadTriggers();
        }


        /* Settings parsing
        */

        /**
         * Creates as a copy of the given sizes with names as members.
         * 
         * @param sizesRaw   The listing of preset sizes to go by.
         * @returns A copy of sizes, with names as members.
         */
        private importSizes(sizesRaw: ISizeSummaries): ISizeSummaries {
            var sizes: ISizeSummaries = this.GameStartrConstructor.prototype.proliferate({}, sizesRaw),
                i: string;

            for (i in sizes) {
                if (sizes.hasOwnProperty(i)) {
                    sizes[i].name = sizes[i].name || i;
                }
            }

            return sizes;
        }

        /**
         * Creates a copy of the given customs and adjusts sizing information,
         * such as for infinite width or height.
         * 
         * @param customsRaw   Raw, user-provided customs.
         */
        private fixCustoms(customsRaw: IGameStartrCustoms): any {
            var customs: IGameStartrCustoms = this.GameStartrConstructor.prototype.proliferate({}, customsRaw);

            this.GameStartrConstructor.prototype.proliferate(customs, this.currentSize);

            if (!isFinite(customs.width)) {
                customs.width = document.body.clientWidth;
            }
            if (!isFinite(customs.height)) {
                if (customs.full) {
                    customs.height = screen.height;
                } else if (this.isFullScreen) {
                    // Guess for browser window...
                    // @todo Actually compute this!
                    customs.height = window.innerHeight - 140;
                } else {
                    customs.height = window.innerHeight;
                }
                // 49px from header, 77px from menus
                customs.height -= 126;
            }

            return customs;
        }


        /* Page visibility
        */

        /**
         * Adds a "visibilitychange" handler to the document bound to 
         * this.handleVisibilityChange.
         */
        private resetPageVisibilityHandlers(): void {
            document.addEventListener("visibilitychange", this.handleVisibilityChange.bind(this));
        }

        /**
         * Handles a visibility change event by calling either this.onPageHidden
         * or this.onPageVisible.
         */
        private handleVisibilityChange(): void {
            switch (document.visibilityState) {
                case "hidden":
                    this.onPageHidden();
                    return;
                case "visible":
                    this.onPageVisible();
                    return;
                default:
                    return;
            }
        }

        /**
         * Reacts to the page becoming hidden by pausing the GameStartr.
         */
        private onPageHidden(): void {
            if (!this.GameStarter.GamesRunner.getPaused()) {
                this.isPageHidden = true;
                this.GameStarter.GamesRunner.pause();
            }
        }

        /**
         * Reacts to the page becoming visible by unpausing the GameStartr.
         */
        private onPageVisible(): void {
            if (this.isPageHidden) {
                this.isPageHidden = false;
                this.GameStarter.GamesRunner.play();
            }
        }


        /* Control section loaders
        */

        /**
         * Loads the internal GameStarter, resetting it with the given customs
         * and attaching handlers to document.body and the holder elements.
         * 
         * @param customs   Custom arguments to pass to this.GameStarter.
         */
        private loadGameStarter(customs: IGameStartrCustoms): void {
            var section: HTMLElement = <HTMLElement>document.querySelector(this.gameElementSelector);

            if (this.GameStarter) {
                this.GameStarter.GamesRunner.pause();
            }

            this.GameStarter = new this.GameStartrConstructor(customs);

            section.textContent = "";
            section.appendChild(this.GameStarter.container);

            this.GameStarter.proliferate(document.body, {
                "onkeydown": this.GameStarter.InputWriter.makePipe("onkeydown", "keyCode"),
                "onkeyup": this.GameStarter.InputWriter.makePipe("onkeyup", "keyCode")
            });

            this.GameStarter.proliferate(section, {
                "onmousedown": this.GameStarter.InputWriter.makePipe("onmousedown", "which"),
                "oncontextmenu": this.GameStarter.InputWriter.makePipe("oncontextmenu", null, true)
            });
        }

        /**
         * Loads the internal OptionsGenerator instances under this.generators.
         */
        private loadGenerators(): void {
            this.generators = {
                OptionsButtons: new UISchemas.ButtonsGenerator(this),
                OptionsTable: new UISchemas.TableGenerator(this),
                LevelEditor: new UISchemas.LevelEditorGenerator(this),
                MapsGrid: new UISchemas.MapsGridGenerator(this)
            };
        }

        /**
         * Loads the externally facing UI controls and the internal ItemsHolder,
         * appending the controls to the controls HTML element.
         * 
         * @param schemas   The schemas for each UI control to be made.
         */
        private loadControls(schemas: UISchemas.ISchema[]): void {
            var section: HTMLElement = <HTMLElement>document.querySelector(this.gameControlsSelector),
                length: number = schemas.length,
                i: number;

            this.ItemsHolder = new ItemsHoldr.ItemsHoldr({
                "prefix": this.globalName + "::UserWrapper::ItemsHolder"
            });

            section.textContent = "";
            section.className = "length-" + length;

            for (i = 0; i < length; i += 1) {
                section.appendChild(this.loadControlDiv(schemas[i]));
            }
        }

        /** 
         * Creates an individual UI control element based on a UI schema.
         * 
         * @param schemas   The schemas for a UI control to be made.
         * @returns An individual UI control element.
         */
        private loadControlDiv(schema: UISchemas.ISchema): HTMLDivElement {
            var control: HTMLDivElement = document.createElement("div"),
                heading: HTMLHeadingElement = document.createElement("h4"),
                inner: HTMLDivElement = document.createElement("div");

            control.className = "control";
            control.id = "control-" + schema.title;

            heading.textContent = schema.title;

            inner.className = "control-inner";
            inner.appendChild(this.generators[schema.generator].generate(schema));

            control.appendChild(heading);
            control.appendChild(inner);

            // Touch events often propogate to children before the control div has
            // been fully extended. Delaying the "active" attribute fixes that.
            control.onmouseover = function (): void {
                setTimeout(
                    function (): void {
                        control.setAttribute("active", "on");
                    },
                    35);
            };

            control.onmouseout = function (): void {
                control.setAttribute("active", "off");
            };

            return control;
        }
    }
}
