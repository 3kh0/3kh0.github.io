var ItemsHoldr;
(function (ItemsHoldr_1) {
    "use strict";
    /**
     * Storage container for a single ItemsHoldr value. The value may have triggers
     * assigned to value, modularity, and other triggers, as well as an HTML element.
     */
    var ItemValue = (function () {
        /**
         * Creates a new ItemValue with the given key and settings. Defaults are given
         * to the value via proliferate before the settings.
         *
         * @constructor
         * @param ItemsHolder   The container for this value.
         * @param key   The key to reference this new ItemValue by.
         * @param settings   Any optional custom settings.
         */
        function ItemValue(ItemsHolder, key, settings) {
            if (settings === void 0) { settings = {}; }
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
                }
                else {
                    // Otherwise save the new version to memory
                    this.updateLocalStorage();
                }
            }
        }
        /**
         * @returns The value being stored, with a transformGet applied if one exists.
         */
        ItemValue.prototype.getValue = function () {
            if (this.transformGet) {
                return this.transformGet(this.value);
            }
            return this.value;
        };
        /**
         * Sets the value being stored, with a is a transformSet applied if one exists.
         * Any attached triggers to the new value will be called.
         *
         * @param value   The desired value to now store.
         */
        ItemValue.prototype.setValue = function (value) {
            if (this.transformSet) {
                this.value = this.transformSet(value);
            }
            else {
                this.value = value;
            }
            this.update();
        };
        /**
         * General update Function to be run whenever the internal value is changed.
         * It runs all the trigger, modular, etc. checks, updates the HTML element
         * if there is one, and updates localStorage if needed.
         */
        ItemValue.prototype.update = function () {
            // Mins and maxes must be obeyed before any other considerations
            if (this.hasOwnProperty("minimum") && Number(this.value) <= Number(this.minimum)) {
                this.value = this.minimum;
                if (this.onMinimum) {
                    this.onMinimum.apply(this, this.ItemsHolder.getCallbackArgs());
                }
            }
            else if (this.hasOwnProperty("maximum") && Number(this.value) <= Number(this.maximum)) {
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
        };
        /**
         * Stores a ItemValue's value in localStorage under the prefix plus its key.
         *
         * @param {Boolean} [overrideAutoSave]   Whether the policy on saving should
         *                                       be ignored (so saving happens
         *                                       regardless). By default, false.
         */
        ItemValue.prototype.updateLocalStorage = function (overrideAutoSave) {
            if (overrideAutoSave || this.ItemsHolder.getAutoSave()) {
                this.ItemsHolder.getLocalStorage()[this.ItemsHolder.getPrefix() + this.key] = JSON.stringify(this.value);
            }
        };
        /**
         * Checks if the current value should trigger a callback, and if so calls it.
         */
        ItemValue.prototype.checkTriggers = function () {
            if (this.triggers.hasOwnProperty(this.value)) {
                this.triggers[this.value].apply(this, this.ItemsHolder.getCallbackArgs());
            }
        };
        /**
         * Checks if the current value is greater than the modularity (assuming
         * modular is a non-zero Numbers), and if so, continuously reduces value and
         * calls this.onModular.
         */
        ItemValue.prototype.checkModularity = function () {
            if (this.value.constructor !== Number || !this.modularity) {
                return;
            }
            while (this.value >= this.modularity) {
                this.value = Math.max(0, this.value - this.modularity);
                if (this.onModular) {
                    this.onModular.apply(this, this.ItemsHolder.getCallbackArgs());
                }
            }
        };
        /**
         * Updates the ItemValue's element's second child to be the ItemValue's value.
         */
        ItemValue.prototype.updateElement = function () {
            if (this.ItemsHolder.hasDisplayChange(this.value)) {
                this.element.children[1].textContent = this.ItemsHolder.getDisplayChange(this.value);
            }
            else {
                this.element.children[1].textContent = this.value;
            }
        };
        /**
         * Retrieves a ItemValue's value from localStorage, making sure not to try to
         * JSON.parse an undefined or null value.
         *
         * @returns {Mixed}
         */
        ItemValue.prototype.retrieveLocalStorage = function () {
            var value = localStorage.getItem(this.ItemsHolder.getPrefix() + this.key);
            if (value === "undefined") {
                return undefined;
            }
            if (value.constructor !== String) {
                return value;
            }
            return JSON.parse(value);
        };
        return ItemValue;
    })();
    ItemsHoldr_1.ItemValue = ItemValue;
    /**
     * A versatile container to store and manipulate values in localStorage, and
     * optionally keep an updated HTML container showing these values.
     */
    var ItemsHoldr = (function () {
        /**
         * Initializes a new instance of the ItemsHoldr class.
         *
         * @param settings   Any optional custom settings.
         */
        function ItemsHoldr(settings) {
            if (settings === void 0) { settings = {}; }
            var key;
            this.prefix = settings.prefix || "";
            this.autoSave = settings.autoSave;
            this.callbackArgs = settings.callbackArgs || [];
            this.allowNewItems = settings.allowNewItems === undefined
                ? true : settings.allowNewItems;
            if (settings.localStorage) {
                this.localStorage = settings.localStorage;
            }
            else if (typeof localStorage === "undefined") {
                this.localStorage = this.createPlaceholderStorage();
            }
            else {
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
            }
            else {
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
        ItemsHoldr.prototype.key = function (index) {
            return this.itemKeys[index];
        };
        /**
         * @returns The values contained within, keyed by their keys.
         */
        ItemsHoldr.prototype.getValues = function () {
            return this.items;
        };
        /**
         * @returns {Mixed} Default attributes for values.
         */
        ItemsHoldr.prototype.getDefaults = function () {
            return this.defaults;
        };
        /**
         * @returns A reference to localStorage or a replacment object.
         */
        ItemsHoldr.prototype.getLocalStorage = function () {
            return this.localStorage;
        };
        /**
         * @returns Whether this should save changes to localStorage automatically.
         */
        ItemsHoldr.prototype.getAutoSave = function () {
            return this.autoSave;
        };
        /**
         * @returns The prefix to store thigns under in localStorage.
         */
        ItemsHoldr.prototype.getPrefix = function () {
            return this.prefix;
        };
        /**
         * @returns The container HTML element, if it exists.
         */
        ItemsHoldr.prototype.getContainer = function () {
            return this.container;
        };
        /**
         * @returns createElement arguments for HTML containers, outside-to-inside.
         */
        ItemsHoldr.prototype.getContainersArguments = function () {
            return this.containersArguments;
        };
        /**
         * @returns Any hard-coded changes to element content.
         */
        ItemsHoldr.prototype.getDisplayChanges = function () {
            return this.displayChanges;
        };
        /**
         * @returns Arguments to be passed to triggered event callbacks.
         */
        ItemsHoldr.prototype.getCallbackArgs = function () {
            return this.callbackArgs;
        };
        /* Retrieval
        */
        /**
         * @returns String keys for each of the stored ItemValues.
         */
        ItemsHoldr.prototype.getKeys = function () {
            return Object.keys(this.items);
        };
        /**
         * @param key   The key for a known value.
         * @returns The known value of a key, assuming that key exists.
         */
        ItemsHoldr.prototype.getItem = function (key) {
            this.checkExistence(key);
            return this.items[key].getValue();
        };
        /**
         * @param key   The key for a known value.
         * @returns The settings for that particular key.
         */
        ItemsHoldr.prototype.getObject = function (key) {
            return this.items[key];
        };
        /**
         * @param key   The key for a potentially known value.
         * @returns Whether there is a value under that key.
         */
        ItemsHoldr.prototype.hasKey = function (key) {
            return this.items.hasOwnProperty(key);
        };
        /**
         * @returns A mapping of key names to the actual values of all objects being stored.
         */
        ItemsHoldr.prototype.exportItems = function () {
            var output = {}, i;
            for (i in this.items) {
                if (this.items.hasOwnProperty(i)) {
                    output[i] = this.items[i].getValue();
                }
            }
            return output;
        };
        /* ItemValues
        */
        /**
         * Adds a new key & value pair to by linking to a newly created ItemValue.
         *
         * @param key   The key to reference by new ItemValue by.
         * @param settings   The settings for the new ItemValue.
         * @returns The newly created ItemValue.
         */
        ItemsHoldr.prototype.addItem = function (key, settings) {
            if (settings === void 0) { settings = {}; }
            this.items[key] = new ItemValue(this, key, settings);
            this.itemKeys.push(key);
            return this.items[key];
        };
        /**
         * Clears a value from the listing, and removes its element from the
         * container (if they both exist).
         *
         * @param key   The key of the element to remove.
         */
        ItemsHoldr.prototype.removeItem = function (key) {
            if (!this.items.hasOwnProperty(key)) {
                return;
            }
            if (this.container && this.items[key].hasElement) {
                this.container.removeChild(this.items[key].element);
            }
            this.itemKeys.splice(this.itemKeys.indexOf(key), 1);
            delete this.items[key];
        };
        /**
         * Completely clears all values from the ItemsHoldr, removing their
         * elements from the container (if they both exist) as well.
         */
        ItemsHoldr.prototype.clear = function () {
            var i;
            if (this.container) {
                for (i in this.items) {
                    if (this.items[i].hasElement) {
                        this.container.removeChild(this.items[i].element);
                    }
                }
            }
            this.items = {};
            this.itemKeys = [];
        };
        /**
         * Sets the value for the ItemValue under the given key, then updates the ItemValue
         * (including the ItemValue's element and localStorage, if needed).
         *
         * @param key   The key of the ItemValue.
         * @param value   The new value for the ItemValue.
         */
        ItemsHoldr.prototype.setItem = function (key, value) {
            this.checkExistence(key);
            this.items[key].setValue(value);
        };
        /**
         * Increases the value for the ItemValue under the given key, via addition for
         * Numbers or concatenation for Strings.
         *
         * @param key   The key of the ItemValue.
         * @param amount   The amount to increase by (by default, 1).
         */
        ItemsHoldr.prototype.increase = function (key, amount) {
            if (amount === void 0) { amount = 1; }
            this.checkExistence(key);
            var value = this.items[key].getValue();
            value += amount;
            this.items[key].setValue(value);
        };
        /**
         * Increases the value for the ItemValue under the given key, via addition for
         * Numbers or concatenation for Strings.
         *
         * @param key   The key of the ItemValue.
         * @param amount   The amount to increase by (by default, 1).
         */
        ItemsHoldr.prototype.decrease = function (key, amount) {
            if (amount === void 0) { amount = 1; }
            this.checkExistence(key);
            var value = this.items[key].getValue();
            value -= amount;
            this.items[key].setValue(value);
        };
        /**
         * Toggles whether a value is true or false.
         *
         * @param key   The key of the ItemValue.
         */
        ItemsHoldr.prototype.toggle = function (key) {
            this.checkExistence(key);
            var value = this.items[key].getValue();
            value = value ? false : true;
            this.items[key].setValue(value);
        };
        /**
         * Ensures a key exists in values. If it doesn't, and new values are
         * allowed, it creates it; otherwise, it throws an Error.
         *
         * @param key
         */
        ItemsHoldr.prototype.checkExistence = function (key) {
            if (!this.items.hasOwnProperty(key)) {
                if (this.allowNewItems) {
                    this.addItem(key);
                }
                else {
                    throw new Error("Unknown key given to ItemsHoldr: '" + key + "'.");
                }
            }
        };
        /**
         * Manually saves an item's value to localStorage, ignoring the autoSave flag.
         *
         * @param key   The key of the item to save.
         */
        ItemsHoldr.prototype.saveItem = function (key) {
            if (!this.items.hasOwnProperty(key)) {
                throw new Error("Unknown key given to ItemsHoldr: '" + key + "'.");
            }
            this.items[key].updateLocalStorage(true);
        };
        /**
         * Manually saves all values to localStorage, ignoring the autoSave flag.
         */
        ItemsHoldr.prototype.saveAll = function () {
            var key;
            for (key in this.items) {
                if (this.items.hasOwnProperty(key)) {
                    this.items[key].updateLocalStorage(true);
                }
            }
        };
        /* HTML helpers
        */
        /**
         * Hides the container Element by setting its visibility to hidden.
         */
        ItemsHoldr.prototype.hideContainer = function () {
            this.container.style.visibility = "hidden";
        };
        /**
         * Shows the container Element by setting its visibility to visible.
         */
        ItemsHoldr.prototype.displayContainer = function () {
            this.container.style.visibility = "visible";
        };
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
        ItemsHoldr.prototype.makeContainer = function (containers) {
            var output = this.createElement.apply(this, containers[0]), current = output, child, key, i;
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
        };
        /**
         * @returns Whether displayChanges has an entry for a particular value.
         */
        ItemsHoldr.prototype.hasDisplayChange = function (value) {
            return this.displayChanges.hasOwnProperty(value);
        };
        /**
         * @returns The displayChanges entry for a particular value.
         */
        ItemsHoldr.prototype.getDisplayChange = function (value) {
            return this.displayChanges[value];
        };
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
        ItemsHoldr.prototype.createElement = function (tag) {
            if (tag === void 0) { tag = "div"; }
            var args = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                args[_i - 1] = arguments[_i];
            }
            var element = document.createElement(tag), i;
            // For each provided object, add those settings to the element
            for (i = 0; i < args.length; i += 1) {
                this.proliferateElement(element, args[i]);
            }
            return element;
        };
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
        ItemsHoldr.prototype.proliferate = function (recipient, donor, noOverride) {
            var setting, i;
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
                    }
                    else {
                        // Regular primitives are easy to copy otherwise
                        recipient[i] = setting;
                    }
                }
            }
            return recipient;
        };
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
        ItemsHoldr.prototype.proliferateElement = function (recipient, donor, noOverride) {
            var setting, i, j;
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
                            }
                            else {
                                // Regular primitives are easy to copy otherwise
                                recipient[i] = setting;
                            }
                            break;
                    }
                }
            }
            return recipient;
        };
        /**
         * Creates an Object that can be used to create a new LocalStorage
         * replacement, if the JavaScript environment doesn't have one.
         *
         * @returns {Object}
         */
        ItemsHoldr.prototype.createPlaceholderStorage = function () {
            var i, output = {
                "keys": [],
                "getItem": function (key) {
                    return this.localStorage[key];
                },
                "setItem": function (key, value) {
                    this.localStorage[key] = value;
                },
                "clear": function () {
                    for (i in this) {
                        if (this.hasOwnProperty(i)) {
                            delete this[i];
                        }
                    }
                },
                "removeItem": function (key) {
                    delete this[key];
                },
                "key": function (index) {
                    return this.keys[index];
                }
            };
            Object.defineProperties(output, {
                "length": {
                    "get": function () {
                        return output.keys.length;
                    }
                },
                "remainingSpace": {
                    "get": function () {
                        return 9001; // Is there a way to calculate this?
                    }
                }
            });
            return output;
        };
        return ItemsHoldr;
    })();
    ItemsHoldr_1.ItemsHoldr = ItemsHoldr;
})(ItemsHoldr || (ItemsHoldr = {}));
