declare namespace ChangeLinr {
    /**
     * A container of transform Functions, referenced by their keys.
     */
    export interface IChangeLinrTransforms {
        [i: string]: IChangeLinrTransform;
    }

    /**
     * A transformation Function to apply to input.
     * 
     * @param data   The raw input data to be transformed.
     * @param [key]   They key under which the data is to be stored.
     * @param [attributes]   Any extra attributes to be given to the transforms.
     * @param [scope]   The ChangeLinr calling the transformation.
     * @returns The input data, transformed.
     * @remarks All the parameters after data are listed as optional, but they 
     *          will be passed in by the calling ChangeLinr.
     */
    export interface IChangeLinrTransform {
        (data: any, key?: string, attributes?: any, scope?: IChangeLinr): any;
    }

    /**
     * Cached storage for outputs of transformations, keyed by their request key.
     */
    export interface IChangeLinrCache {
        [i: string]: any;
    }

    /**
     * Complete cached storage for transforms, keyed by their request key to
     * a mapping of transforms to results.
     */
    export interface IChangeLinrCacheFull {
        [i: string]: {
            [j: string]: any;
        }
    }

    /**
     * Settings to initialize a new instance of an IChangeLinr.
     */
    export interface IChangeLinrSettings {
        /**
         * Transformation functions to be applied to inputs.
         */
        transforms: IChangeLinrTransforms;

        /**
         * The order to apply transformation functions to inputs.
         */
        pipeline: string[];

        /**
         * Whether a cache should be created of transformation results.
         */
        doMakeCache?: boolean;

        /**
         * Whether cache results should be used for computations.
         */
        doUseCache?: boolean;
    }

    /**
     * A general utility class for transforming raw input to processed output. 
     * Transformation functions for inputs are kept along with an order.
     */
    export interface IChangeLinr {
        /**
         * @returns The cached output of this.process and this.processFull.
         */
        getCache(): IChangeLinrCache;

        /**
         * @param key   The key under which the output was processed
         * @returns The cached output filed under the given key.
         */
        getCached(key: string): any;

        /**
         * @returns A complete listing of the cached outputs from all 
         *          processed information, from each pipeline transform.
         */
        getCacheFull(): IChangeLinrCacheFull;

        /**
         * @returns Whether the cache object is being kept.
         */
        getDoMakeCache(): boolean;

        /**
         * @returns Whether previously cached output is being used in new
         *          process requests.
         */
        getDoUseCache(): boolean;

        /**
         * Applies a series of transforms to input data. If doMakeCache is on, the
         * outputs of this are stored in cache and cacheFull.
         * 
         * @param data   The data to be transformed.
         * @param [key]   They key under which the data is to be stored.
         *                If needed but not provided, defaults to data.
         * @param [attributes]   Any extra attributes to be given to the
         *                       transform Functions.
         * @returns The final output of the pipeline.
         */
        process(data: any, key?: string, attributes?: any): any;

        /**
         * A version of this.process that returns the complete output from each 
         * pipelined transform Function in an Object.
         * 
         * @param data   The data to be transformed.
         * @param key   They key under which the data is to be stored.
         * @param [attributes]   Any extra attributes to be given to the transforms.
         * @returns The final output of the transforms.
         */
        processFull(data: any, key: string, attributes?: any): any;
    }
}


namespace ChangeLinr {
    "use strict";

    /**
     * A general utility class for transforming raw input to processed output. 
     * Transformation functions for inputs are kept along with an order.
     */
    export class ChangeLinr implements IChangeLinr {
        /**
         * Functions that may be used to transform data, keyed by name.
         */
        private transforms: IChangeLinrTransforms;

        /**
         * Ordered listing of Function names to be applied to raw input.
         */
        private pipeline: string[];

        /**
         * Cached output of previous results of the the pipeline.
         */
        private cache: IChangeLinrCache;

        /**
         * Cached output of each step of the pipeline.
         */
        private cacheFull: IChangeLinrCacheFull;

        /**
         * Whether this should be caching responses.
         */
        private doMakeCache: boolean;

        /**
         * Whether this should be retrieving and using cached results.
         */
        private doUseCache: boolean;

        /**
         * @param {IChangeLinrSettings} settings
         */
        constructor(settings: IChangeLinrSettings) {
            if (typeof settings === "undefined") {
                throw new Error("No settings object given to ChangeLinr.");
            }
            if (typeof settings.pipeline === "undefined") {
                throw new Error("No pipeline given to ChangeLinr.");
            }
            if (typeof settings.transforms === "undefined") {
                throw new Error("No transforms given to ChangeLinr.");
            }

            var i: number;

            this.pipeline = settings.pipeline || [];

            this.transforms = settings.transforms || {};

            this.doMakeCache = typeof settings.doMakeCache === "undefined"
                ? true : settings.doMakeCache;

            this.doUseCache = typeof settings.doUseCache === "undefined"
                ? true : settings.doUseCache;

            this.cache = {};
            this.cacheFull = {};

            for (i = 0; i < this.pipeline.length; i += 1) {
                if (!this.pipeline[i]) {
                    throw new Error("Pipe[" + i + "] is invalid.");
                }

                if (!this.transforms.hasOwnProperty(this.pipeline[i])) {
                    throw new Error("Pipe[" + i + "] ('" + this.pipeline[i] + "') not found in transforms.");
                }

                if (!(this.transforms[this.pipeline[i]] instanceof Function)) {
                    throw new Error("Pipe[" + i + "] ('" + this.pipeline[i] + "') is not a valid Function from transforms.");
                }

                this.cacheFull[i] = this.cacheFull[this.pipeline[i]] = {};
            }
        }


        /* Simple gets
        */

        /**
         * @returns The cached output of this.process and this.processFull.
         */
        getCache(): IChangeLinrCache {
            return this.cache;
        }

        /**
         * @param key   The key under which the output was processed
         * @returns The cached output filed under the given key.
         */
        getCached(key: string): any {
            return this.cache[key];
        }

        /**
         * @returns A complete listing of the cached outputs from all 
         *          processed information, from each pipeline transform.
         */
        getCacheFull(): IChangeLinrCacheFull {
            return this.cacheFull;
        }

        /**
         * @returns Whether the cache object is being kept.
         */
        getDoMakeCache(): boolean {
            return this.doMakeCache;
        }

        /**
         * @returns Whether previously cached output is being used in new
         *          process requests.
         */
        getDoUseCache(): boolean {
            return this.doUseCache;
        }


        /* Core processing
        */

        /**
         * Applies a series of transforms to input data. If doMakeCache is on, the
         * outputs of this are stored in cache and cacheFull.
         * 
         * @param data   The data to be transformed.
         * @param [key]   They key under which the data is to be stored. If needed
         *                for caching but not provided, defaults to data.
         * @param [attributes]   Any extra attributes to be given to transforms.
         * @returns The final output of the pipeline.
         */
        process(data: any, key?: string, attributes?: any): any {
            var i: number;

            if (typeof key === "undefined" && (this.doMakeCache || this.doUseCache)) {
                key = data;
            }

            // If this keyed input was already processed, get that
            if (this.doUseCache && this.cache.hasOwnProperty(key)) {
                return this.cache[key];
            }

            // Apply (and optionally cache) each transform in order
            for (i = 0; i < this.pipeline.length; i += 1) {
                data = this.transforms[this.pipeline[i]](data, key, attributes, this);

                if (this.doMakeCache) {
                    this.cacheFull[this.pipeline[i]][key] = data;
                }
            }

            if (this.doMakeCache) {
                this.cache[key] = data;
            }

            return data;
        }

        /**
         * A version of this.process that returns the complete output from each 
         * pipelined transform Function in an Object.
         * 
         * @param data   The data to be transformed.
         * @param key   They key under which the data is to be stored.
         * @param [attributes]   Any extra attributes to be given to the transforms.
         * @returns The final output of the transforms.
         */
        processFull(data: any, key: string, attributes?: any): any {
            var output: any = {},
                i: number;

            this.process(data, key, attributes);

            for (i = 0; i < this.pipeline.length; i += 1) {
                output[i] = output[this.pipeline[i]] = this.cacheFull[this.pipeline[i]][key];
            }

            return output;
        }
    }
}
