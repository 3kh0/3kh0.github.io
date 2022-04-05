/// <reference path="ItemsHoldr-0.2.1.ts" />

declare namespace ModAttachr {
    /**
     * General schema for a mod, including its name, events with callbacks, 
     * scope, and whether it's enabled.
     */
    export interface IModAttachrMod {
        /**
         * The user-readable name of the mod.
         */
        name: string;

        /**
         * The mapping of events to callback Functions to be evaluated.
         */
        events: IModEvents;

        /**
         * The scope to call event Functions from, if necessary.
         */
        scope?: any;

        /**
         * Whether the mod is currently enabled (by default, false).
         */
        enabled?: boolean;
    }

    /**
     * Abstrack callback Function for any mod event.
     * 
     * @param args   The arguments for the mod event.
     * @returns The result of the mod (normally ignored).
     */
    interface IModEvent {
        (...args: any[]): any;
    }

    /**
     * Listing of events, keying event names to all mods attached to them.
     */
    export interface IModAttachrEvents {
        [i: string]: IModAttachrMod[];
    }

    /**
     * Listing of mods, keyed by name.
     */
    export interface IModAttachrMods {
        [i: string]: IModAttachrMod;
    }

    /**
     * Listing of events attached to a mod, keyed by trigger name.
     */
    export interface IModEvents {
        [i: string]: IModEvent;
    }

    /**
     * Settings to initialize a new IModAttachr.
     */
    export interface IModAttachrSettings {
        /**
         * Mods to be immediately added via addMod.
         */
        mods?: IModAttachrMod[];

        /**
         * A ItemsHoldr to store mod status locally.
         */
        ItemsHoldr?: ItemsHoldr.IItemsHoldr;

        /**
         * Whether there should be a ItemsHoldr created if one isn't given.
         */
        storeLocally?: boolean;

        /**
         * A default scope to apply mod events from, if not the IModAttachr.
         */
        scopeDefault?: any;
    }
    
    /**
     * An addon for for extensible modding functionality. "Mods" register triggers
     * such as "onModEnable" or "onReset" that can be triggered during gameplay.
     */
    export interface IModAttachr {
        /**
         * @returns An Object keying each mod by their name.
         */
        getMods(): IModAttachrMods;

        /**
         * @param name   The name of the mod to return.
         * @returns The mod keyed by the name.
         */
        getMod(name: string): IModAttachrMod;

        /**
         * @returns An Object keying each event by their name.
         */
        getEvents(): IModAttachrEvents;

        /**
         * @returns The mods associated with a particular event.
         */
        getEvent(name: string): IModAttachrMod[];

        /**
         * @returns The ItemsHoldr if storeLocally is true (by default, undefined).
         */
        getItemsHolder(): ItemsHoldr.IItemsHoldr;

        /**
         * @returns The default scope used to apply mods from, if not this ModAttachr.
         */
        getScopeDefault(): any;


        /* Alterations 
        */

        /**
         * Adds a mod to the pool of mods, listing it under all the relevant events.
         * If the event is enabled, the "onModEnable" event for it is triggered.
         * 
         * @param mod   A summary Object for a mod, containing at the very
         *              least a name and listing of events.
         */
        addMod(mod: IModAttachrMod): any;

        /**
         * Adds multiple mods via this.addMod.
         * 
         * @param mods   The mods to add.
         * @returns The return values of the mods' onModEnable events, in order.
         */
        addMods(...mods: IModAttachrMod[]): any[];

        /**
         * Enables a mod of the given name, if it exists. The onModEnable event is
         * called for the mod.
         * 
         * @param name   The name of the mod to enable.
         * @param args   Any additional arguments to pass. This will have `mod`
         *               and `name` unshifted in front, in that order.
         */
        enableMod(name: string, ...args: any[]): any;

        /**
         * Enables any number of mods.
         * 
         * @param names   Names of the mods to enable.
         * @returns The return values of the mods' onModEnable events, in order.
         */
        enableMods(...names: string[]): any[];

        /**
         * Disables a mod of the given name, if it exists. The onModDisable event is
         * called for the mod.
         * 
         * @param name   The name of the mod to disable.
         * @returns The return value of the mod's onModDisable event.
         */
        disableMod(name: string): any;

        /**
         * Disables any number of mods.
         * 
         * @param names   Names of the mods to disable.
         */
        disableMods(...names: string[]): any[];

        /**
         * Toggles a mod via enableMod/disableMod of the given name, if it exists.
         * 
         * @param name   The name of the mod to toggle.
         * @returns The result of the mod's onModEnable or onModDisable event.
         */
        toggleMod(name: string): any;

        /**
         * Toggles any number of mods.
         * 
         * @param names   Names of the mods to toggle.
         * @returns The result of the mods' onModEnable or onModDisable events, in order.
         */
        toggleMods(...names: string[]): any[];

        /**
         * Fires an event, which calls all mods listed for that event.
         * 
         * @param event   The name of the event to fire.
         * @param args   Any additional arguments to pass. This will have `mod`
         *               and `event` unshifted in front, in that order.
         */
        fireEvent(event: string, ...args: any[]): void;

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
        fireModEvent(event: string, modName: string, ...args: any[]): any;
    }
}


namespace ModAttachr {
    "use strict";

    /**
     * An addon for for extensible modding functionality. "Mods" register triggers
     * such as "onModEnable" or "onReset" that can be triggered during gameplay.
     */
    export class ModAttachr implements IModAttachr {
        /**
         * For each event, the listing of mods that attach to that event.
         */
        private events: IModAttachrEvents;

        /**
         * All known mods, keyed by name.
         */
        private mods: IModAttachrMods;

        /**
         * A ItemsHoldr object that may be used to store mod status.
         */
        private ItemsHolder: ItemsHoldr.IItemsHoldr;

        /**
         * A default scope to apply mod events from, if not this ModAttachr.
         */
        private scopeDefault: any;

        /**
         * Initializes a new instance of the ModAttachr class.
         * 
         * @param [settings]   Settings to be used for initialization.
         */
        constructor(settings?: IModAttachrSettings) {
            this.mods = {};
            this.events = {};

            if (!settings) {
                return;
            }

            this.scopeDefault = settings.scopeDefault;

            // If a ItemsHoldr is provided, use it
            if (settings.ItemsHoldr) {
                this.ItemsHolder = settings.ItemsHoldr;
            } else if (settings.storeLocally) {
                // If one isn't provided by storeLocally is still true, make one
                this.ItemsHolder = new ItemsHoldr.ItemsHoldr();
            }

            if (settings.mods) {
                this.addMods(...settings.mods);
            }
        }


        /* Simple gets 
        */

        /**
         * @returns An Object keying each mod by their name.
         */
        getMods(): IModAttachrMods {
            return this.mods;
        }

        /**
         * @param name   The name of the mod to return.
         * @returns The mod keyed by the name.
         */
        getMod(name: string): IModAttachrMod {
            return this.mods[name];
        }

        /**
         * @returns An Object keying each event by their name.
         */
        getEvents(): IModAttachrEvents {
            return this.events;
        }

        /**
         * @returns The mods associated with a particular event.
         */
        getEvent(name: string): IModAttachrMod[] {
            return this.events[name];
        }

        /**
         * @returns The ItemsHoldr if storeLocally is true (by default, undefined).
         */
        getItemsHolder(): ItemsHoldr.IItemsHoldr {
            return this.ItemsHolder;
        }

        /**
         * @returns The default scope used to apply mods from, if not this ModAttachr.
         */
        getScopeDefault(): any {
            return this.scopeDefault;
        }


        /* Alterations 
        */

        /**
         * Adds a mod to the pool of mods, listing it under all the relevant events.
         * If the event is enabled, the "onModEnable" event for it is triggered.
         * 
         * @param mod   A summary Object for a mod, containing at the very
         *              least a name and listing of events.
         */
        addMod(mod: IModAttachrMod): void {
            var modEvents: any = mod.events,
                name: string;

            for (name in modEvents) {
                if (!modEvents.hasOwnProperty(name)) {
                    continue;
                }

                if (!this.events.hasOwnProperty(name)) {
                    this.events[name] = [mod];
                } else {
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
        }

        /**
         * Adds multiple mods via this.addMod.
         * 
         * @param mods   The mods to add.
         * @returns The return values of the mods' onModEnable events, in order.
         */
        addMods(...mods: IModAttachrMod[]): any[] {
            var results: any[] = [],
                i: number;

            for (i = 0; i < mods.length; i += 1) {
                results.push(this.addMod(mods[i]));
            }

            return results;
        }

        /**
         * Enables a mod of the given name, if it exists. The onModEnable event is
         * called for the mod.
         * 
         * @param name   The name of the mod to enable.
         * @param args   Any additional arguments to pass. This will have `mod`
         *               and `name` unshifted in front, in that order.
         * @returns   The return value of the mod's onModEnable event.
         */
        enableMod(name: string, ...args: any[]): any {
            var mod: IModAttachrMod = this.mods[name];

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
        }

        /**
         * Enables any number of mods.
         * 
         * @param names   Names of the mods to enable.
         * @returns The return values of the mods' onModEnable events, in order.
         */
        enableMods(...names: string[]): any[] {
            var results: any[] = [],
                i: number;

            for (i = 0; i < names.length; i += 1) {
                results.push(this.enableMod(names[i]));
            }

            return results;
        }

        /**
         * Disables a mod of the given name, if it exists. The onModDisable event is
         * called for the mod.
         * 
         * @param name   The name of the mod to disable.
         * @returns The return value of the mod's onModDisable event.
         */
        disableMod(name: string): any {
            var mod: IModAttachrMod = this.mods[name],
                args: any[];

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
        }

        /**
         * Disables any number of mods.
         * 
         * @param names   Names of the mods to disable.
         * @returns The return values of the mods' onModEnable events, in order.
         */
        disableMods(...names: string[]): any[] {
            var results: any[] = [],
                i: number;

            for (i = 0; i < names.length; i += 1) {
                results.push(this.disableMod(names[i]));
            }

            return results;
        }

        /**
         * Toggles a mod via enableMod/disableMod of the given name, if it exists.
         * 
         * @param name   The name of the mod to toggle.
         * @returns The result of the mod's onModEnable or onModDisable event.
         */
        toggleMod(name: string): any {
            var mod: IModAttachrMod = this.mods[name];

            if (!mod) {
                throw new Error("No mod found under " + name);
            }

            if (mod.enabled) {
                return this.disableMod(name);
            } else {
                return this.enableMod(name);
            }
        }

        /**
         * Toggles any number of mods.
         * 
         * @param names   Names of the mods to toggle.
         * @returns The result of the mods' onModEnable or onModDisable events, in order.
         */
        toggleMods(...names: string[]): any[] {
            var result: any[] = [],
                i: number;

            for (var i: number = 0; i < names.length; i += 1) {
                result.push(this.toggleMod(names[i]));
            }

            return result;
        }


        /* Actions
        */

        /**
         * Fires an event, which calls all mods listed for that event.
         * 
         * @param event   The name of the event to fire.
         * @param args   Any additional arguments to pass. This will have `mod`
         *               and `event` unshifted in front, in that order.
         */
        fireEvent(event: string, ...args: any[]): void {
            var mods: IModAttachrMod[] = this.events[event],
                mod: IModAttachrMod,
                i: number;

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
        }

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
        fireModEvent(event: string, modName: string, ...args: any[]): any {
            var mod: IModAttachrMod = this.mods[modName],
                fires: IModEvent;

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
        }
    }
}
