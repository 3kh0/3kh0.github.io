var StringFilr;
(function (StringFilr_1) {
    "use strict";
    /**
     * A general utility for retrieving data from an Object based on nested class
     * names. Class names may be given in any order ro retrieve nested data.
     */
    var StringFilr = (function () {
        /**
         * Initializes a new instance of the StringFilr class.
         *
         * @param settings   Settings to be used for initialization.
         */
        function StringFilr(settings) {
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
        StringFilr.prototype.getLibrary = function () {
            return this.library;
        };
        /**
         * @returns The optional normal class String.
         */
        StringFilr.prototype.getNormal = function () {
            return this.normal;
        };
        /**
         * @returns The complete cache of previously completed lookups.
         */
        StringFilr.prototype.getCache = function () {
            return this.cache;
        };
        /**
         * @returns A cached value, if it exists.
         */
        StringFilr.prototype.getCached = function (key) {
            return this.cache[key];
        };
        /**
         * Completely clears the lookup cache.
         */
        StringFilr.prototype.clearCache = function () {
            this.cache = {};
        };
        /**
         * Clears the cached entry for a key.
         *
         * @param keyRaw   The raw key whose lookup is to be cleared.
         */
        StringFilr.prototype.clearCached = function (keyRaw) {
            delete this.cache[keyRaw];
            if (this.normal) {
                delete this.cache[keyRaw.replace(this.normal, "")];
            }
        };
        /**
         * Retrieves the deepest matching data in the library for a key.
         *
         * @param keyRaw   The raw key for data to look up, in String form.
         * @returns The deepest matching data in the library.
         */
        StringFilr.prototype.get = function (keyRaw) {
            var key, result;
            if (this.normal) {
                key = keyRaw.replace(this.normal, "");
            }
            else {
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
        };
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
        StringFilr.prototype.followClass = function (keys, current) {
            var key, i;
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
        };
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
        StringFilr.prototype.findLackingNormal = function (current, path, output) {
            var i;
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
        };
        /**
         * Driver for this.findLackingNormal. If library directories are found to
         * not have a normal, it throws an error.
         */
        StringFilr.prototype.ensureLibraryNormal = function () {
            var caught = this.findLackingNormal(this.library, "base", []);
            if (caught.length) {
                throw new Error("Found " + caught.length + " library "
                    + "sub-directories missing the normal: "
                    + "\r\n  " + caught.join("\r\n  "));
            }
        };
        return StringFilr;
    })();
    StringFilr_1.StringFilr = StringFilr;
})(StringFilr || (StringFilr = {}));
