declare namespace ItemsHoldr {
    /**
     * A mapping of ItemValue values to triggered callbacks.
     */
    export interface ITriggers {
        [i: string]: Function;
        [i: number]: Function;
    }

    /**
     * A container of default values to pass to IItemValues, keyed by the
     * IItemValue keys.m
     */
    export interface IItemValueDefaults {
        [i: string]: IItemValueSettings;
    }

    /**
     * Settings to initialize a new instance of the IItemValue interface.
     */
    export interface IItemValueSettings {
        /**
         * An initial value to store.
         */
        value?: any;
        
        /**
         * A default initial value to store, if value isn't provided.
         */
        valueDefault?: any;
        
        /**
         * Whether the value should be stored in the IItemHoldr's localStorage.
         */
        storeLocally?: boolean;
        
        /**
         * A mapping of values to callbacks that should be triggered when value
         * is equal to them.
         */
        triggers?: ITriggers;
        
        /**
         * Whether an Element should be created and synced to the value.
         */
        hasElement?: boolean;
        
        /**
         * An Element tag to use in creating the element, if hasElement is true.
         */
        elementTag?: string;
        
        /**
         * A minimum value for the value to equal, if value is a number.
         */
        minimum?: number;
        
        /**
         * A callback to call when the value reaches the minimum value.
         */
        onMinimum?: Function;
        
        /**
         * A maximum value for the value to equal, if value is a number.
         */
        maximum?: number;
        
        /**
         * A callback to call when the value reaches the maximum value.
         */
        onMaximum?: Function;
        
        /**
         * A maximum number to modulo the value against, if value is a number.
         */
        modularity?: number;
        
        /**
         * A callback to call when the value reaches modularity.
         */
        onModular?: Function;
        
        /**
         * A Function to transform the value when it's being set.
         */
        transformGet?: Function;
        
        /**
         * A Function to transform the value when it's being retrieved.
         */
        transformSet?: Function;
    }
    
    /**
     * Storage container for a single IItemsHoldr value. The value may have triggers
     * assigned to value, modularity, and other triggers, as well as an HTML element.
     */
    export interface IItemValue {
        /**
         * The container IItemsHoldr governing usage of this ItemsValue.
         */
        ItemsHolder: IItemsHoldr;
        
        /**
         * The unique key identifying this ItemValue in the ItemsHoldr.
         */
        key: string;
        
        /**
         * A default initial value to store, if value isn't provided.
         */
        valueDefault: any;
        
        /**
         * Whether the value should be stored in the ItemHoldr's localStorage.
         */
        storeLocally: boolean;
        
        /**
         * A mapping of values to callbacks that should be triggered when value
         * is equal to them.
         */
        triggers: ITriggers;
        
        /**
         * An HTML element whose second child's textContent is always set to that of the element.
         */
        element: HTMLElement;
        
        /**
         * Whether an Element should be created and synced to the value.
         */
        hasElement: boolean;
        
        /**
         * An Element tag to use in creating the element, if hasElement is true.
         */
        elementTag: string;
        
        /**
         * A maximum value for the value to equal, if value is a number.
         */
        maximum: number;
        
        /**
         * A callback to call when the value reaches the maximum value.
         */
        onMaximum: Function;
        
        /**
         * A minimum value for the value to equal, if value is a number.
         */
        minimum: number;
        
        /**
         * A callback to call when the value reaches the minimum value.
         */
        onMinimum: Function;
        
        /**
         * A maximum number to modulo the value against, if value is a number.
         */
        modularity: number;
        
        /**
         * A callback to call when the value reaches modularity.
         */
        onModular: Function;
        
        /**
         * A Function to transform the value when it's being set.
         */
        transformGet?: Function;
        
        /**
         * A Function to transform the value when it's being retrieved.
         */
        transformSet?: Function;
        
        /**
         * @returns The value being stored, with a transformGet applied if one exists.
         */
        getValue(): any;
        
        /**
         * Sets the value being stored, with a is a transformSet applied if one exists.
         * Any attached triggers to the new value will be called.
         *
         * @param value   The desired value to now store.
         */
        setValue(value: any): void;
        
        /**
         * General update Function to be run whenever the internal value is changed.
         * It runs all the trigger, modular, etc. checks, updates the HTML element
         * if there is one, and updates localStorage if needed.
         */
        update(): void;
        
        /**
         * Stores a ItemValue's value in localStorage under the prefix plus its key.
         * 
         * @param overrideAutoSave   Whether the policy on saving should be ignored
         *                           so saving happens regardless. By default, false.
         */
        updateLocalStorage(overrideAutoSave?: boolean): void;
    }

    /**
     * Settings to initialize a new instance of the IItemsHoldr interface.
     */
    export interface IItemsHoldrSettings {
        /**
         * Initial settings for IItemValues to store.
         */
        values?: IItemValueDefaults;
        
        /**
         * Whether new items are allowed to be added (by default, true).
         */
        allowNewItems?: boolean;
        
        /**
         * Whether values should be saved immediately upon being set.
         */
        autoSave?: boolean;
        
        /**
         * Arguments to pass to triggered callback Functions.
         */
        callbackArgs?: any[];
        
        /**
         * A localStorage object to use instead of the global localStorage.
         */
        localStorage?: any;
        
        /**
         * A prefix to add before IItemsValue keys
         */
        prefix?: string;
        
        /**
         * Default attributes for IItemValues.
         */
        defaults?: IItemValueDefaults;
        
        /**
         * Any hardcoded changes to element content.
         */
        displayChanges?: { [i: string]: string };
        
        /**
         * Whether an HTML container should be created to house the IItemValue elements.
         */
        doMakeContainer?: boolean;
        
        /**
         * Arguments to pass to create the container, if not the default div and className.
         */
        containersArguments?: [string, any][];
    }

    /**
     * A versatile container to store and manipulate values in localStorage, and 
     * optionally keep an updated HTML container showing these values.
     */
    export interface IItemsHoldr {
        /**
         * @returns The values contained within, keyed by their keys.
         */
        getValues(): { [i: string]: IItemValue };
        
        /**
         * @returns Default attributes for values.
         */
        getDefaults(): IItemValueDefaults;
        
        /**
         * @returns A reference to localStorage or a replacment object.
         */
        getLocalStorage(): Storage;
        
        /**
         * @returns Whether this should save changes to localStorage automatically.
         */
        getAutoSave(): boolean;
        
        /**
         * @returns The prefix to store thigns under in localStorage.
         */
        getPrefix(): string;
        
        /**
         * @returns The container HTML element, if it exists.
         */
        getContainer(): HTMLElement;
        
        /**
         * @returns createElement arguments for HTML containers, outside-to-inside.
         */
        getContainersArguments(): [string, any][];
        
        /**
         * @returns Any hard-coded changes to element content.
         */
        getDisplayChanges(): { [i: string]: string };
        
        /**
         * @returns Arguments to be passed to triggered event callbacks.
         */
        getCallbackArgs(): any[];
        
        /**
         * @returns String keys for each of the stored IItemValues.
         */
        getKeys(): string[];
        
        /**
         * @param key   The key for a known value.
         * @returns The known value of a key, assuming that key exists.
         */
        getItem(key: string): any;
        
        /**
         * @param key   The key for a known value.
         * @returns The settings for that particular key.
         */
        getObject(key: string): any;
        
        /**
         * @param key   The key for a potentially known value.
         * @returns Whether there is a value under that key.
         */
        hasKey(key: string): boolean;
        
        /**
         * @returns A mapping of key names to the actual values of all objects being stored.
         */
        exportItems(): any;
        
        /**
         * Adds a new key & value pair to by linking to a newly created ItemValue.
         * 
         * @param key   The key to reference by new ItemValue by.
         * @param settings   The settings for the new ItemValue.
         * @returns The newly created ItemValue.
         */
        addItem(key: string, settings: any): IItemValue;
        
        /**
         * Clears a value from the listing, and removes its element from the
         * container (if they both exist).
         * 
         * @param key   The key of the element to remove.
         */
        removeItem(key: string): void;
        
        /**
         * Completely clears all values from the ItemsHoldr, removing their
         * elements from the container (if they both exist) as well.
         */
        clear(): void;
        
        /**
         * Sets the value for the ItemValue under the given key, then updates the ItemValue
         * (including the ItemValue's element and localStorage, if needed).
         * 
         * @param key   The key of the ItemValue.
         * @param value   The new value for the ItemValue.
         */
        setItem(key: string, value: any): void;
        
        /**
         * Increases the value for the ItemValue under the given key, via addition for
         * Numbers or concatenation for Strings.
         * 
         * @param key   The key of the ItemValue.
         * @param amount   The amount to increase by (by default, 1).
         */
        increase(key: string, amount?: number | string): void;
        
        /**
         * Increases the value for the ItemValue under the given key, via addition for
         * Numbers or concatenation for Strings.
         * 
         * @param key   The key of the ItemValue.
         * @param amount   The amount to increase by (by default, 1).
         */
        decrease(key: string, amount?: number): void;
        
        /**
         * Toggles whether a value is true or false.
         * 
         * @param key   The key of the ItemValue.
         */
        toggle(key: string): void;
        
        /**
         * Ensures a key exists in values. If it doesn't, and new values are
         * allowed, it creates it; otherwise, it throws an Error.
         * 
         * @param key
         */
        checkExistence(key: string): void;

        /**
         * Manually saves an item's value to localStorage, ignoring the autoSave flag.
         * 
         * @param key   The key of the item to save.
         */
        saveItem(key: string): void;

        /**
         * Manually saves all values to localStorage, ignoring the autoSave flag. 
         */
        saveAll(): void;
        
        /**
         * Hides the container Element by setting its visibility to hidden.
         */
        hideContainer(): void;
        
        /**
         * Shows the container Element by setting its visibility to visible.
         */
        displayContainer(): void;
        
        /**
         * Creates the container Element, which contains a child for each ItemValue that
         * specifies hasElement to be true.
         * 
         * @param containers   An Array representing the Element to be created and the
         *                     children between it and the contained ItemValues. 
         *                     Each contained Object has a String tag name as its 
         *                     first member, followed by any number of Objects to apply 
         *                     via createElement.
         * @returns A newly created Element that can be used as a container.
         */
        makeContainer(containers: [string, any][]): HTMLElement;
        
        /**
         * @returns Whether displayChanges has an entry for a particular value.
         */
        hasDisplayChange(value: string): boolean;
        
        /**
         * @returns The displayChanges entry for a particular value.
         */
        getDisplayChange(value: string): string;
        
        /**
         * Creates a new HTMLElement of the given type. For each Object given as
         * arguments after, each member is proliferated onto the element.
         * 
         * @param tag   The type of the HTMLElement (by default, "div").
         * @param args   Any number of Objects to be proliferated onto the 
         *               new HTMLElement.
         * @returns A newly created HTMLElement of the given tag.
         */
        createElement(tag?: string, ...args: any[]): HTMLElement;
        
        /**
         * Proliferates all members of the donor to the recipient recursively, as
         * a deep copy.
         * 
         * @param recipient   An object receiving the donor's members.
         * @param donor   An object whose members are copied to recipient.
         * @param noOverride   If recipient properties may be overriden (by 
         *                     default, false).
         * @returns The recipient, which should have the donor proliferated onto it.
         */
        proliferate(recipient: any, donor: any, noOverride?: boolean): any;
        
        /**
         * Identical to proliferate, but tailored for HTML elements because many
         * element attributes don't play nicely with JavaScript Array standards. 
         * Looking at you, HTMLCollection!
         * 
         * @param recipient   An HTMLElement receiving the donor's members.
         * @param donor   An object whose members are copied to recipient.
         * @param noOverride   If recipient properties may be overriden (by 
         *                     default, false).
         * @returns The recipient, which should have the donor proliferated onto it.
         */
        proliferateElement(recipient: any, donor: any, noOverride?: boolean): any;
    }
}


namespace ItemsHoldr {
    "use strict";

    /**
     * Storage container for a single ItemsHoldr value. The value may have triggers
     * assigned to value, modularity, and other triggers, as well as an HTML element.
     */
    export class ItemValue implements IItemValue {
        /**
         * The container ItemsHoldr governing usage of this ItemsValue.
         */
        ItemsHolder: ItemsHoldr;

        /**
         * The unique key identifying this ItemValue in the ItemsHoldr.
         */
        key: string;

        /**
         * A default initial value to store, if value isn't provided.
         */
        valueDefault: any;

        /**
         * Whether the value should be stored in the ItemHoldr's localStorage.
         */
        storeLocally: boolean;

        /**
         * A mapping of values to callbacks that should be triggered when value
         * is equal to them.
         */
        triggers: ITriggers;

        /**
         * An HTML element whose second child's textContent is always set to that of the element.
         */
        element: HTMLElement;

        /**
         * Whether an Element should be created and synced to the value.
         */
        hasElement: boolean;

        /**
         * An Element tag to use in creating the element, if hasElement is true.
         */
        elementTag: string;

        /**
         * A minimum value for the value to equal, if value is a number.
         */
        minimum: number;

        /**
         * A callback to call when the value reaches the minimum value.
         */
        onMinimum: Function;

        /**
         * A maximum value for the value to equal, if value is a number.
         */
        maximum: number;

        /**
         * A callback to call when the value reaches the maximum value.
         */
        onMaximum: Function;

        /**
         * A maximum number to modulo the value against, if value is a number.
         */
        modularity: number;

        /**
         * A callback to call when the value reaches modularity.
         */
        onModular: Function;

        /**
         * A Function to transform the value when it's being set.
         */
        transformGet: Function;

        /**
         * A Function to transform the value when it's being retrieved.
         */
        transformSet: Function;

        /**
         * The value being stored.
         */
        private value: any;

        /**
         * Creates a new ItemValue with the given key and settings. Defaults are given
         * to the value via proliferate before the settings.
         * 
         * @constructor
         * @param ItemsHolder   The container for this value.
         * @param key   The key to reference this new ItemValue by.
         * @param settings   Any optional custom settings.
         */
        constructor(ItemsHolder: ItemsHoldr, key: string, settings: any = {}) {
            this.ItemsHolder = ItemsHolder;

            ItemsHolder.proliferate(this, ItemsHolder.getDefaults());
            ItemsHolder.proliferate(this, settings);

            this.key = key;

            if (!this.hasOwnProperty("value")) {
                this.value = this.valueDefault;
            }

            if (this.hasElement) {
                this.element = ItemsHolder.createElement(this.elementTag || "div", {
                    className: ItemsHolder.getPrefix() + "_value " + key
                });
                this.element.appendChild(ItemsHolder.createElement("div", {
                    "textContent": key
                }));
                this.element.appendChild(ItemsHolder.createElement("div", {
                    "textContent": this.value
                }));
            }

            if (this.storeLocally) {
                // If there exists an old version of this property, get it 
                if (ItemsHolder.getLocalStorage().hasOwnProperty(ItemsHolder.getPrefix() + key)) {
                    this.value = this.retrieveLocalStorage();
                    this.update();
                } else {
                    // Otherwise save the new version to memory
                    this.updateLocalStorage();
                }
            }
        }

        /**
         * @returns The value being stored, with a transformGet applied if one exists.
         */
        getValue(): any {
            if (this.transformGet) {
                return this.transformGet(this.value);
            }

            return this.value;
        }

        /**
         * Sets the value being stored, with a is a transformSet applied if one exists.
         * Any attached triggers to the new value will be called.
         *
         * @param value   The desired value to now store.
         */
        setValue(value: any): void {
            if (this.transformSet) {
                this.value = this.transformSet(value);
            } else {
                this.value = value;
            }

            this.update();
        }

        /**
         * General update Function to be run whenever the internal value is changed.
         * It runs all the trigger, modular, etc. checks, updates the HTML element
         * if there is one, and updates localStorage if needed.
         */
        update(): void {
            // Mins and maxes must be obeyed before any other considerations
            if (this.hasOwnProperty("minimum") && Number(this.value) <= Number(this.minimum)) {
                this.value = this.minimum;
                if (this.onMinimum) {
                    this.onMinimum.apply(this, this.ItemsHolder.getCallbackArgs());
                }
            } else if (this.hasOwnProperty("maximum") && Number(this.value) <= Number(this.maximum)) {
                this.value = this.maximum;
                if (this.onMaximum) {
                    this.onMaximum.apply(this, this.ItemsHolder.getCallbackArgs());
                }
            }

            if (this.modularity) {
                this.checkModularity();
            }

            if (this.triggers) {
                this.checkTriggers();
            }

            if (this.hasElement) {
                this.updateElement();
            }

            if (this.storeLocally) {
                this.updateLocalStorage();
            }
        }

        /**
         * Stores a ItemValue's value in localStorage under the prefix plus its key.
         * 
         * @param {Boolean} [overrideAutoSave]   Whether the policy on saving should
         *                                       be ignored (so saving happens
         *                                       regardless). By default, false.
         */
        updateLocalStorage(overrideAutoSave?: boolean): void {
            if (overrideAutoSave || this.ItemsHolder.getAutoSave()) {
                this.ItemsHolder.getLocalStorage()[this.ItemsHolder.getPrefix() + this.key] = JSON.stringify(this.value);
            }
        }

        /**
         * Checks if the current value should trigger a callback, and if so calls it.
         */
        private checkTriggers(): void {
            if (this.triggers.hasOwnProperty(this.value)) {
                this.triggers[this.value].apply(this, this.ItemsHolder.getCallbackArgs());
            }
        }

        /**
         * Checks if the current value is greater than the modularity (assuming
         * modular is a non-zero Numbers), and if so, continuously reduces value and 
         * calls this.onModular.
         */
        private checkModularity(): void {
            if (this.value.constructor !== Number || !this.modularity) {
                return;
            }

            while (this.value >= this.modularity) {
                this.value = Math.max(0, this.value - this.modularity);
                if (this.onModular) {
                    this.onModular.apply(this, this.ItemsHolder.getCallbackArgs());
                }
            }
        }

        /**
         * Updates the ItemValue's element's second child to be the ItemValue's value.
         */
        private updateElement(): void {
            if (this.ItemsHolder.hasDisplayChange(this.value)) {
                this.element.children[1].textContent = this.ItemsHolder.getDisplayChange(this.value);
            } else {
                this.element.children[1].textContent = this.value;
            }
        }

        /**
         * Retrieves a ItemValue's value from localStorage, making sure not to try to
         * JSON.parse an undefined or null value.
         * 
         * @returns {Mixed}
         */
        private retrieveLocalStorage(): void {
            var value: any = localStorage.getItem(this.ItemsHolder.getPrefix() + this.key);

            if (value === "undefined") {
                return undefined;
            }

            if (value.constructor !== String) {
                return value;
            }

            return JSON.parse(value);
        }
    }

    /**
     * A versatile container to store and manipulate values in localStorage, and
     * optionally keep an updated HTML container showing these values. 
     */
    export class ItemsHoldr implements IItemsHoldr {
        /**
         * The ItemValues being stored, keyed by name.
         */
        private items: { [i: string]: ItemValue };

        /**
         * A listing of all the String keys for the stored items.
         */
        private itemKeys: string[];

        /**
         * Default attributes for ItemValues.
         */
        private defaults: IItemValueDefaults;

        /**
         * A reference to localStorage or a replacement object.
         */
        private localStorage: Storage;

        /**
         * A prefix to store things under in localStorage.
         */
        private prefix: string;

        /**
         * Whether new items are allowed to be created using setItem.
         */
        private allowNewItems: boolean;

        /**
         * Whether this should save changes to localStorage automatically.
         */
        private autoSave: boolean;

        /**
         * A container element containing children for each value's element.
         */
        private container: HTMLElement;

        /**
         * An Array of elements as createElement arguments, outside-to-inside.
         */
        private containersArguments: [string, any][];

        /**
         * Any hardcoded changes to element content, such as "INF" for Infinity.
         */
        private displayChanges: { [i: string]: string };

        /**
         * Arguments to be passed to triggered callback Functions.
         */
        private callbackArgs: any[];

        /**
         * Initializes a new instance of the ItemsHoldr class.
         * 
         * @param settings   Any optional custom settings.
         */
        constructor(settings: IItemsHoldrSettings = {}) {
            var key: string;

            this.prefix = settings.prefix || "";
            this.autoSave = settings.autoSave;
            this.callbackArgs = settings.callbackArgs || [];

            this.allowNewItems = settings.allowNewItems === undefined
                ? true : settings.allowNewItems;

            if (settings.localStorage) {
                this.localStorage = settings.localStorage;
            } else if (typeof localStorage === "undefined") {
                this.localStorage = this.createPlaceholderStorage();
            } else {
                this.localStorage = localStorage;
            }

            this.defaults = settings.defaults || {};
            this.displayChanges = settings.displayChanges || {};

            this.items = {};
            if (settings.values) {
                this.itemKeys = Object.keys(settings.values);

                for (key in settings.values) {
                    if (settings.values.hasOwnProperty(key)) {
                        this.addItem(key, settings.values[key]);
                    }
                }
            } else {
                this.itemKeys = [];
            }

            if (settings.doMakeContainer) {
                this.containersArguments = settings.containersArguments || [
                    ["div", {
                        "className": this.prefix + "_container"
                    }]
                ];
                this.container = this.makeContainer(settings.containersArguments);
            }
        }


        /* Simple gets
        */

        /**
         * 
         */
        key(index: number): string {
            return this.itemKeys[index];
        }

        /**
         * @returns The values contained within, keyed by their keys.
         */
        getValues(): { [i: string]: IItemValue } {
            return this.items;
        }

        /**
         * @returns {Mixed} Default attributes for values.
         */
        getDefaults(): any {
            return this.defaults;
        }

        /**
         * @returns A reference to localStorage or a replacment object.
         */
        getLocalStorage(): Storage {
            return this.localStorage;
        }

        /**
         * @returns Whether this should save changes to localStorage automatically.
         */
        getAutoSave(): boolean {
            return this.autoSave;
        }

        /**
         * @returns The prefix to store thigns under in localStorage.
         */
        getPrefix(): string {
            return this.prefix;
        }

        /**
         * @returns The container HTML element, if it exists.
         */
        getContainer(): HTMLElement {
            return this.container;
        }

        /**
         * @returns createElement arguments for HTML containers, outside-to-inside.
         */
        getContainersArguments(): [string, any][] {
            return this.containersArguments;
        }

        /**
         * @returns Any hard-coded changes to element content.
         */
        getDisplayChanges(): { [i: string]: string } {
            return this.displayChanges;
        }

        /**
         * @returns Arguments to be passed to triggered event callbacks.
         */
        getCallbackArgs(): any[] {
            return this.callbackArgs;
        }


        /* Retrieval
        */

        /**
         * @returns String keys for each of the stored ItemValues.
         */
        getKeys(): string[] {
            return Object.keys(this.items);
        }

        /**
         * @param key   The key for a known value.
         * @returns The known value of a key, assuming that key exists.
         */
        getItem(key: string): any {
            this.checkExistence(key);

            return this.items[key].getValue();
        }

        /**
         * @param key   The key for a known value.
         * @returns The settings for that particular key.
         */
        getObject(key: string): any {
            return this.items[key];
        }

        /**
         * @param key   The key for a potentially known value.
         * @returns Whether there is a value under that key.
         */
        hasKey(key: string): boolean {
            return this.items.hasOwnProperty(key);
        }

        /**
         * @returns A mapping of key names to the actual values of all objects being stored.
         */
        exportItems(): any {
            var output: any = {},
                i: string;

            for (i in this.items) {
                if (this.items.hasOwnProperty(i)) {
                    output[i] = this.items[i].getValue();
                }
            }

            return output;
        }


        /* ItemValues
        */

        /**
         * Adds a new key & value pair to by linking to a newly created ItemValue.
         * 
         * @param key   The key to reference by new ItemValue by.
         * @param settings   The settings for the new ItemValue.
         * @returns The newly created ItemValue.
         */
        addItem(key: string, settings: any = {}): ItemValue {
            this.items[key] = new ItemValue(this, key, settings);
            this.itemKeys.push(key);
            return this.items[key];
        }

        /**
         * Clears a value from the listing, and removes its element from the
         * container (if they both exist).
         * 
         * @param key   The key of the element to remove.
         */
        removeItem(key: string): void {
            if (!this.items.hasOwnProperty(key)) {
                return;
            }

            if (this.container && this.items[key].hasElement) {
                this.container.removeChild(this.items[key].element);
            }

            this.itemKeys.splice(this.itemKeys.indexOf(key), 1);

            delete this.items[key];
        }

        /**
         * Completely clears all values from the ItemsHoldr, removing their
         * elements from the container (if they both exist) as well.
         */
        clear(): void {
            var i: string;

            if (this.container) {
                for (i in this.items) {
                    if (this.items[i].hasElement) {
                        this.container.removeChild(this.items[i].element);
                    }
                }
            }

            this.items = {};
            this.itemKeys = [];
        }

        /**
         * Sets the value for the ItemValue under the given key, then updates the ItemValue
         * (including the ItemValue's element and localStorage, if needed).
         * 
         * @param key   The key of the ItemValue.
         * @param value   The new value for the ItemValue.
         */
        setItem(key: string, value: any): void {
            this.checkExistence(key);

            this.items[key].setValue(value);
        }

        /**
         * Increases the value for the ItemValue under the given key, via addition for
         * Numbers or concatenation for Strings.
         * 
         * @param key   The key of the ItemValue.
         * @param amount   The amount to increase by (by default, 1).
         */
        increase(key: string, amount: number | string = 1): void {
            this.checkExistence(key);

            var value: any = this.items[key].getValue();

            value += amount;

            this.items[key].setValue(value);
        }

        /**
         * Increases the value for the ItemValue under the given key, via addition for
         * Numbers or concatenation for Strings.
         * 
         * @param key   The key of the ItemValue.
         * @param amount   The amount to increase by (by default, 1).
         */
        decrease(key: string, amount: number = 1): void {
            this.checkExistence(key);

            var value: any = this.items[key].getValue();

            value -= amount;

            this.items[key].setValue(value);
        }

        /**
         * Toggles whether a value is true or false.
         * 
         * @param key   The key of the ItemValue.
         */
        toggle(key: string): void {
            this.checkExistence(key);

            var value: any = this.items[key].getValue();

            value = value ? false : true;

            this.items[key].setValue(value);
        }

        /**
         * Ensures a key exists in values. If it doesn't, and new values are
         * allowed, it creates it; otherwise, it throws an Error.
         * 
         * @param key
         */
        checkExistence(key: string): void {
            if (!this.items.hasOwnProperty(key)) {
                if (this.allowNewItems) {
                    this.addItem(key);
                } else {
                    throw new Error("Unknown key given to ItemsHoldr: '" + key + "'.");
                }
            }
        }

        /**
         * Manually saves an item's value to localStorage, ignoring the autoSave flag.
         * 
         * @param key   The key of the item to save.
         */
        saveItem(key: string): void {
            if (!this.items.hasOwnProperty(key)) {
                throw new Error("Unknown key given to ItemsHoldr: '" + key + "'.");
            }

            this.items[key].updateLocalStorage(true);
        }

        /**
         * Manually saves all values to localStorage, ignoring the autoSave flag. 
         */
        saveAll(): void {
            var key: string;

            for (key in this.items) {
                if (this.items.hasOwnProperty(key)) {
                    this.items[key].updateLocalStorage(true);
                }
            }
        }


        /* HTML helpers
        */

        /**
         * Hides the container Element by setting its visibility to hidden.
         */
        hideContainer(): void {
            this.container.style.visibility = "hidden";
        }

        /**
         * Shows the container Element by setting its visibility to visible.
         */
        displayContainer(): void {
            this.container.style.visibility = "visible";
        }

        /**
         * Creates the container Element, which contains a child for each ItemValue that
         * specifies hasElement to be true.
         * 
         * @param containers   An Array representing the Element to be created and the
         *                     children between it and the contained ItemValues. 
         *                     Each contained Object has a String tag name as its 
         *                     first member, followed by any number of Objects to apply 
         *                     via createElement.
         * @returns A newly created Element that can be used as a container.
         */
        makeContainer(containers: [string, any][]): HTMLElement {
            var output: HTMLElement = this.createElement.apply(this, containers[0]),
                current: HTMLElement = output,
                child: HTMLElement,
                key: string,
                i: number;

            for (i = 1; i < containers.length; ++i) {
                child = this.createElement.apply(this, containers[i]);
                current.appendChild(child);
                current = child;
            }

            for (key in this.items) {
                if (this.items[key].hasElement) {
                    child.appendChild(this.items[key].element);
                }
            }

            return output;
        }

        /**
         * @returns Whether displayChanges has an entry for a particular value.
         */
        hasDisplayChange(value: string): boolean {
            return this.displayChanges.hasOwnProperty(value);
        }

        /**
         * @returns The displayChanges entry for a particular value.
         */
        getDisplayChange(value: string): string {
            return this.displayChanges[value];
        }


        /* Utilities
        */

        /**
         * Creates a new HTMLElement of the given type. For each Object given as
         * arguments after, each member is proliferated onto the element.
         * 
         * @param tag   The type of the HTMLElement (by default, "div").
         * @param args   Any number of Objects to be proliferated onto the 
         *               new HTMLElement.
         * @returns A newly created HTMLElement of the given tag.
         */
        createElement(tag: string = "div", ...args: any[]): HTMLElement {
            var element: HTMLElement = document.createElement(tag),
                i: number;

            // For each provided object, add those settings to the element
            for (i = 0; i < args.length; i += 1) {
                this.proliferateElement(element, args[i]);
            }

            return element;
        }

        /**
         * Proliferates all members of the donor to the recipient recursively, as
         * a deep copy.
         * 
         * @param recipient   An object receiving the donor's members.
         * @param donor   An object whose members are copied to recipient.
         * @param noOverride   If recipient properties may be overriden (by 
         *                     default, false).
         * @returns The recipient, which should have the donor proliferated onto it.
         */
        proliferate(recipient: any, donor: any, noOverride?: boolean): any {
            var setting: any,
                i: string;

            // For each attribute of the donor:
            for (i in donor) {
                if (donor.hasOwnProperty(i)) {
                    // If noOverride, don't override already existing properties
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
            }
            return recipient;
        }

        /**
         * Identical to proliferate, but tailored for HTML elements because many
         * element attributes don't play nicely with JavaScript Array standards. 
         * Looking at you, HTMLCollection!
         * 
         * @param recipient   An HTMLElement receiving the donor's members.
         * @param donor   An object whose members are copied to recipient.
         * @param noOverride   If recipient properties may be overriden (by 
         *                     default, false).
         * @returns The recipient, which should have the donor proliferated onto it.
         */
        proliferateElement(recipient: any, donor: any, noOverride?: boolean): HTMLElement {
            var setting: any,
                i: string,
                j: number;

            // For each attribute of the donor:
            for (i in donor) {
                if (donor.hasOwnProperty(i)) {
                    // If noOverride, don't override already existing properties
                    if (noOverride && recipient.hasOwnProperty(i)) {
                        continue;
                    }

                    setting = donor[i];

                    // Special cases for HTML elements
                    switch (i) {
                        // Children: just append all of them directly
                        case "children":
                            if (typeof (setting) !== "undefined") {
                                for (j = 0; j < setting.length; j += 1) {
                                    recipient.appendChild(setting[j]);
                                }
                            }
                            break;

                        // Style: proliferate (instead of making a new Object)
                        case "style":
                            this.proliferate(recipient[i], setting);
                            break;

                        // By default, use the normal proliferate logic
                        default:
                            // If it's an object, recurse on a new version of it
                            if (typeof setting === "object") {
                                if (!recipient.hasOwnProperty(i)) {
                                    recipient[i] = new setting.constructor();
                                }
                                this.proliferate(recipient[i], setting, noOverride);
                            } else {
                                // Regular primitives are easy to copy otherwise
                                recipient[i] = setting;
                            }
                            break;
                    }
                }
            }

            return recipient;
        }

        /**
         * Creates an Object that can be used to create a new LocalStorage
         * replacement, if the JavaScript environment doesn't have one.
         * 
         * @returns {Object}
         */
        private createPlaceholderStorage(): Storage {
            var i: string,
                output: any = {
                    "keys": [],
                    "getItem": function (key: string): any {
                        return this.localStorage[key];
                    },
                    "setItem": function (key: string, value: string): void {
                        this.localStorage[key] = value;
                    },
                    "clear": function (): void {
                        for (i in this) {
                            if (this.hasOwnProperty(i)) {
                                delete this[i];
                            }
                        }
                    },
                    "removeItem": function (key: string): void {
                        delete this[key];
                    },
                    "key": function (index: number): string {
                        return this.keys[index];
                    }
                };

            Object.defineProperties(output, {
                "length": {
                    "get": function (): number {
                        return output.keys.length;
                    }
                },
                "remainingSpace": {
                    "get": function (): number {
                        return 9001; // Is there a way to calculate this?
                    }
                }
            });

            return output;
        }
    }
}
