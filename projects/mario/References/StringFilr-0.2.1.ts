declare namespace StringFilr {
    /**
     * The core stored library in a StringFilr, as a tree of data.
     */
    export interface ILibrary {
        [i: string]: ILibrary | any;
    }

    /**
     * A cache of previously completed lookups.
     */
    export interface ICache {
        [i: string]: any;
    }

    /**
     * Settings to initialize a new IStringFilr.
     */
    export interface IStringFilrSettings {
        /**
         * An Object containing data stored as children of sub-Objects.
         */
        library: ILibrary;

        /**
         * A String to use as a default key to rescue on, if provided.
         */
        normal?: string;

        /**
         * Whether the library is required to contain the normal key in every
         * descendent (by default, false).
         */
        requireNormalKey?: boolean;
    }
    
    /**
     * A general utility for retrieving data from an Object based on nested class
     * names. Class names may be given in any order ro retrieve nested data. 
     */
    export interface IStringFilr {
        /**
         * @returns The base library of stored information.
         */
        getLibrary(): ILibrary;

        /**
         * @returns The optional normal class String.
         */
        getNormal(): string;

        /**
         * @returns The complete cache of previously completed lookups.
         */
        getCache(): any;

        /**
         * @returns A cached value, if it exists.
         */
        getCached(key: string): any;

        /**
         * Completely clears the lookup cache.  
         */
        clearCache(): void;

        /**
         * Clears the cached entry for a key.
         * 
         * @param keyRaw   The raw key whose lookup is to be cleared.
         */
        clearCached(key: string): void;

        /**
         * Retrieves the deepest matching data in the library for a key. 
         * 
         * @param keyRaw   The raw key for data to look up, in String form.
         * @returns The deepest matching data in the library.
         */
        get(keyRaw: string): any;
    }
}


namespace StringFilr {
    "use strict";

    /**
     * A general utility for retrieving data from an Object based on nested class
     * names. Class names may be given in any order ro retrieve nested data. 
     */
    export class StringFilr implements IStringFilr {
        /**
         * The library of data.
         */
        private library: ILibrary;

        /**
         * A cache of previously completed lookups.
         */
        private cache: ICache;

        /**
         * Optional default index to check when no suitable option is found.
         */
        private normal: string;

        /**
         * Whether to crash when a sub-object in reset has no normal child.
         */
        private requireNormalKey: boolean;

        /**
         * Initializes a new instance of the StringFilr class.
         * 
         * @param settings   Settings to be used for initialization.
         */
        constructor(settings: IStringFilrSettings) {
            if (!settings) {
                throw new Error("No settings given to StringFilr.");
            }
            if (!settings.library) {
                throw new Error("No library given to StringFilr.");
            }

            this.library = settings.library;
            this.normal = settings.normal;
            this.requireNormalKey = settings.requireNormalKey;

            this.cache = {};

            if (this.requireNormalKey) {
                if (typeof this.normal === "undefined") {
                    throw new Error("StringFilr is given requireNormalKey, but no normal class.");
                }

                this.ensureLibraryNormal();
            }
        }

        /**
         * @returns The base library of stored information.
         */
        getLibrary(): ILibrary {
            return this.library;
        }

        /**
         * @returns The optional normal class String.
         */
        getNormal(): string {
            return this.normal;
        }

        /**
         * @returns The complete cache of previously completed lookups.
         */
        getCache(): ICache {
            return this.cache;
        }

        /**
         * @returns A cached value, if it exists.
         */
        getCached(key: string): any {
            return this.cache[key];
        }

        /**
         * Completely clears the lookup cache.  
         */
        clearCache(): void {
            this.cache = {};
        }

        /**
         * Clears the cached entry for a key.
         * 
         * @param keyRaw   The raw key whose lookup is to be cleared.
         */
        clearCached(keyRaw: string): void {
            delete this.cache[keyRaw];

            if (this.normal) {
                delete this.cache[keyRaw.replace(this.normal, "")];
            }
        }

        /**
         * Retrieves the deepest matching data in the library for a key. 
         * 
         * @param keyRaw   The raw key for data to look up, in String form.
         * @returns The deepest matching data in the library.
         */
        get(keyRaw: string): any {
            var key: string,
                result: any;

            if (this.normal) {
                key = keyRaw.replace(this.normal, "");
            } else {
                key = keyRaw;
            }

            // Quickly return a cached result if it exists
            if (this.cache.hasOwnProperty(key)) {
                return this.cache[key];
            }

            // Since a cache didn't exist, it must be found within the library
            result = this.followClass(key.split(/\s+/g), this.library);

            this.cache[key] = this.cache[keyRaw] = result;
            return result;
        }

        /**
         * Utility Function to follow a path into the library (this is the driver 
         * for searching into the library). For each available key, if it matches
         * a key in current, it is removed from keys and recursion happens on the
         * sub-directory in current.
         * 
         * @param keys   The currently available keys to search within.
         * @param current   The current location being searched within the library.
         * @returns The most deeply matched part of the library.
         */
        private followClass(keys: string[], current: any): any {
            var key: string,
                i: number;

            // If keys runs out, we're done
            if (!keys || !keys.length) {
                return current;
            }

            // For each key in the current array...
            for (i = 0; i < keys.length; i += 1) {
                key = keys[i];

                // ...if it matches, recurse on the other keys
                if (current.hasOwnProperty(key)) {
                    keys.splice(i, 1);
                    return this.followClass(keys, current[key]);
                }
            }

            // If no key matched, try the normal (default)
            if (this.normal && current.hasOwnProperty(this.normal)) {
                return this.followClass(keys, current[this.normal]);
            }

            // Nothing matches anything; we're done.
            return current;
        }

        /**
         * Utility helper to recursively check for tree branches in the library 
         * that don't have a key equal to the normal. For each sub-directory that
         * is caught, the path to it is added to output.
         * 
         * @param current   The current location being searched within the library.
         * @param path   The current path within the library.
         * @param output   Paths to parts that don't have a matching key.
         * @returns output
         */
        private findLackingNormal(current: any, path: string, output: string[]): string[] {
            var i: string;

            if (!current.hasOwnProperty(this.normal)) {
                output.push(path);
            }

            if (typeof current[i] === "object") {
                for (i in current) {
                    if (current.hasOwnProperty(i)) {
                        this.findLackingNormal(current[i], path + " " + i, output);
                    }
                }
            }

            return output;
        }

        /**
         * Driver for this.findLackingNormal. If library directories are found to
         * not have a normal, it throws an error.
         */
        private ensureLibraryNormal(): void {
            var caught: string[] = this.findLackingNormal(this.library, "base", []);

            if (caught.length) {
                throw new Error("Found " + caught.length + " library "
                    + "sub-directories missing the normal: "
                    + "\r\n  " + caught.join("\r\n  "));
            }
        }
    }
}
