/// <reference path="ItemsHoldr-0.2.1.ts" />
var ModAttachr;
(function (ModAttachr_1) {
    "use strict";
    /**
     * An addon for for extensible modding functionality. "Mods" register triggers
     * such as "onModEnable" or "onReset" that can be triggered during gameplay.
     */
    var ModAttachr = (function () {
        /**
         * Initializes a new instance of the ModAttachr class.
         *
         * @param [settings]   Settings to be used for initialization.
         */
        function ModAttachr(settings) {
            this.mods = {};
            this.events = {};
            if (!settings) {
                return;
            }
            this.scopeDefault = settings.scopeDefault;
            // If a ItemsHoldr is provided, use it
            if (settings.ItemsHoldr) {
                this.ItemsHolder = settings.ItemsHoldr;
            }
            else if (settings.storeLocally) {
                // If one isn't provided by storeLocally is still true, make one
                this.ItemsHolder = new ItemsHoldr.ItemsHoldr();
            }
            if (settings.mods) {
                this.addMods.apply(this, settings.mods);
            }
        }
        /* Simple gets
        */
        /**
         * @returns An Object keying each mod by their name.
         */
        ModAttachr.prototype.getMods = function () {
            return this.mods;
        };
        /**
         * @param name   The name of the mod to return.
         * @returns The mod keyed by the name.
         */
        ModAttachr.prototype.getMod = function (name) {
            return this.mods[name];
        };
        /**
         * @returns An Object keying each event by their name.
         */
        ModAttachr.prototype.getEvents = function () {
            return this.events;
        };
        /**
         * @returns The mods associated with a particular event.
         */
        ModAttachr.prototype.getEvent = function (name) {
            return this.events[name];
        };
        /**
         * @returns The ItemsHoldr if storeLocally is true (by default, undefined).
         */
        ModAttachr.prototype.getItemsHolder = function () {
            return this.ItemsHolder;
        };
        /**
         * @returns The default scope used to apply mods from, if not this ModAttachr.
         */
        ModAttachr.prototype.getScopeDefault = function () {
            return this.scopeDefault;
        };
        /* Alterations
        */
        /**
         * Adds a mod to the pool of mods, listing it under all the relevant events.
         * If the event is enabled, the "onModEnable" event for it is triggered.
         *
         * @param mod   A summary Object for a mod, containing at the very
         *              least a name and listing of events.
         */
        ModAttachr.prototype.addMod = function (mod) {
            var modEvents = mod.events, name;
            for (name in modEvents) {
                if (!modEvents.hasOwnProperty(name)) {
                    continue;
                }
                if (!this.events.hasOwnProperty(name)) {
                    this.events[name] = [mod];
                }
                else {
                    this.events[name].push(mod);
                }
            }
            // Mod scope defaults to the ModAttacher's scopeDefault.
            mod.scope = mod.scope || this.scopeDefault;
            // Record the mod in the ModAttachr's mods listing.
            this.mods[mod.name] = mod;
            // If the mod is enabled, trigger its "onModEnable" event
            if (mod.enabled && mod.events.hasOwnProperty("onModEnable")) {
                this.fireModEvent("onModEnable", mod.name, arguments);
            }
            // If there's a ItemsHoldr, record the mod in it
            if (this.ItemsHolder) {
                this.ItemsHolder.addItem(mod.name, {
                    "valueDefault": 0,
                    "storeLocally": true
                });
                // If there was already a (true) value, immediately enable the mod
                if (this.ItemsHolder.getItem(mod.name)) {
                    return this.enableMod(mod.name);
                }
            }
        };
        /**
         * Adds multiple mods via this.addMod.
         *
         * @param mods   The mods to add.
         * @returns The return values of the mods' onModEnable events, in order.
         */
        ModAttachr.prototype.addMods = function () {
            var mods = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                mods[_i - 0] = arguments[_i];
            }
            var results = [], i;
            for (i = 0; i < mods.length; i += 1) {
                results.push(this.addMod(mods[i]));
            }
            return results;
        };
        /**
         * Enables a mod of the given name, if it exists. The onModEnable event is
         * called for the mod.
         *
         * @param name   The name of the mod to enable.
         * @param args   Any additional arguments to pass. This will have `mod`
         *               and `name` unshifted in front, in that order.
         * @returns   The return value of the mod's onModEnable event.
         */
        ModAttachr.prototype.enableMod = function (name) {
            var args = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                args[_i - 1] = arguments[_i];
            }
            var mod = this.mods[name];
            if (!mod) {
                throw new Error("No mod of name: '" + name + "'");
            }
            // The args are manually sliced to prevent external state changes
            args = [].slice.call(args);
            args.unshift(mod, name);
            mod.enabled = true;
            if (this.ItemsHolder) {
                this.ItemsHolder.setItem(name, true);
            }
            if (mod.events.hasOwnProperty("onModEnable")) {
                return this.fireModEvent("onModEnable", mod.name, arguments);
            }
        };
        /**
         * Enables any number of mods.
         *
         * @param names   Names of the mods to enable.
         * @returns The return values of the mods' onModEnable events, in order.
         */
        ModAttachr.prototype.enableMods = function () {
            var names = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                names[_i - 0] = arguments[_i];
            }
            var results = [], i;
            for (i = 0; i < names.length; i += 1) {
                results.push(this.enableMod(names[i]));
            }
            return results;
        };
        /**
         * Disables a mod of the given name, if it exists. The onModDisable event is
         * called for the mod.
         *
         * @param name   The name of the mod to disable.
         * @returns The return value of the mod's onModDisable event.
         */
        ModAttachr.prototype.disableMod = function (name) {
            var mod = this.mods[name], args;
            if (!this.mods[name]) {
                throw new Error("No mod of name: '" + name + "'");
            }
            this.mods[name].enabled = false;
            args = Array.prototype.slice.call(arguments);
            args[0] = mod;
            if (this.ItemsHolder) {
                this.ItemsHolder.setItem(name, false);
            }
            if (mod.events.hasOwnProperty("onModDisable")) {
                return this.fireModEvent("onModDisable", mod.name, args);
            }
        };
        /**
         * Disables any number of mods.
         *
         * @param names   Names of the mods to disable.
         * @returns The return values of the mods' onModEnable events, in order.
         */
        ModAttachr.prototype.disableMods = function () {
            var names = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                names[_i - 0] = arguments[_i];
            }
            var results = [], i;
            for (i = 0; i < names.length; i += 1) {
                results.push(this.disableMod(names[i]));
            }
            return results;
        };
        /**
         * Toggles a mod via enableMod/disableMod of the given name, if it exists.
         *
         * @param name   The name of the mod to toggle.
         * @returns The result of the mod's onModEnable or onModDisable event.
         */
        ModAttachr.prototype.toggleMod = function (name) {
            var mod = this.mods[name];
            if (!mod) {
                throw new Error("No mod found under " + name);
            }
            if (mod.enabled) {
                return this.disableMod(name);
            }
            else {
                return this.enableMod(name);
            }
        };
        /**
         * Toggles any number of mods.
         *
         * @param names   Names of the mods to toggle.
         * @returns The result of the mods' onModEnable or onModDisable events, in order.
         */
        ModAttachr.prototype.toggleMods = function () {
            var names = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                names[_i - 0] = arguments[_i];
            }
            var result = [], i;
            for (var i = 0; i < names.length; i += 1) {
                result.push(this.toggleMod(names[i]));
            }
            return result;
        };
        /* Actions
        */
        /**
         * Fires an event, which calls all mods listed for that event.
         *
         * @param event   The name of the event to fire.
         * @param args   Any additional arguments to pass. This will have `mod`
         *               and `event` unshifted in front, in that order.
         */
        ModAttachr.prototype.fireEvent = function (event) {
            var args = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                args[_i - 1] = arguments[_i];
            }
            var mods = this.events[event], mod, i;
            // If no triggers were defined for this event, that's ok: just stop.
            if (!mods) {
                return;
            }
            // The args are manually sliced to prevent external state changes
            args = [].slice.call(args);
            args.unshift(undefined, event);
            for (i = 0; i < mods.length; i += 1) {
                mod = mods[i];
                if (mod.enabled) {
                    args[0] = mod;
                    mod.events[event].apply(mod.scope, args);
                }
            }
        };
        /**
         * Fires an event specifically for one mod, rather than all mods containing
         * that event.
         *
         * @param event   The name of the event to fire.
         * @param modName   The name of the mod to fire the event.
         * @param args   Any additional arguments to pass. This will have `mod`
         *               and `event` unshifted in front, in that order.
         * @returns The result of the fired mod event.
         */
        ModAttachr.prototype.fireModEvent = function (event, modName) {
            var args = [];
            for (var _i = 2; _i < arguments.length; _i++) {
                args[_i - 2] = arguments[_i];
            }
            var mod = this.mods[modName], fires;
            if (!mod) {
                throw new Error("Unknown mod requested: '" + modName + "'");
            }
            // The args are manually sliced to prevent external state changes
            args = [].slice.call(args);
            args.unshift(mod, event);
            fires = mod.events[event];
            if (!fires) {
                throw new Error("Mod does not contain event: '" + event + "'");
            }
            return fires.apply(mod.scope, args);
        };
        return ModAttachr;
    })();
    ModAttachr_1.ModAttachr = ModAttachr;
})(ModAttachr || (ModAttachr = {}));
