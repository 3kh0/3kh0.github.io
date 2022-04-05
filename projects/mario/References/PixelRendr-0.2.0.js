/// <reference path="ChangeLinr-0.2.0.ts" />
/// <reference path="StringFilr-0.2.1.ts" />
var PixelRendr;
(function (PixelRendr) {
    "use strict";
    /**
     * Container for a "multiple" sprite, which is a sprite that contains separate
     * Uint8ClampedArray pieces of data for different sections (such as top, middle, etc.)
     */
    var SpriteMultiple = (function () {
        /**
         * Initializes a new instance of the SpriteMultiple class.
         *
         * @param sprites   Data for each sprite to import, keyed by container.
         * @param render   The parsed sprite source.
         */
        function SpriteMultiple(sprites, render) {
            var sources = render.source[2];
            this.sprites = sprites;
            this.direction = render.source[1];
            if (this.direction === "vertical" || this.direction === "corners") {
                this.topheight = sources.topheight | 0;
                this.bottomheight = sources.bottomheight | 0;
            }
            if (this.direction === "horizontal" || this.direction === "corners") {
                this.rightwidth = sources.rightwidth | 0;
                this.leftwidth = sources.leftwidth | 0;
            }
            this.middleStretch = sources.middleStretch || false;
        }
        return SpriteMultiple;
    })();
    PixelRendr.SpriteMultiple = SpriteMultiple;
})(PixelRendr || (PixelRendr = {}));
var PixelRendr;
(function (PixelRendr) {
    "use strict";
    /**
     * Summary container for a single PixelRendr sprite source. The original source
     * is stored, along with any generated outputs, information on its container,
     * and any filter.
     */
    var Render = (function () {
        /**
         * Initializes a new instance of the Render clsas.
         *
         * @param source   The original command to create this render.
         * @param filter   An optional filter to change colors by, if source
         *                 is a "filter" command.
         */
        function Render(source, filter) {
            this.source = source;
            this.filter = filter;
            this.sprites = {};
            this.containers = [];
        }
        return Render;
    })();
    PixelRendr.Render = Render;
})(PixelRendr || (PixelRendr = {}));
var PixelRendr;
(function (PixelRendr_1) {
    "use strict";
    /**
     * A moderately unusual graphics module designed to compress images as
     * compressed text blobs and store the text blobs in a StringFilr. These tasks
     * are performed and cached quickly enough for use in real-time environments,
     * such as real-time video games.
     */
    var PixelRendr = (function () {
        /**
         * Initializes a new instance of the PixelRendr class.
         *
         * @param settings   Settings to be used for initialization.
         */
        function PixelRendr(settings) {
            if (!settings) {
                throw new Error("No settings given to PixelRendr.");
            }
            if (!settings.paletteDefault) {
                throw new Error("No paletteDefault given to PixelRendr.");
            }
            this.paletteDefault = settings.paletteDefault;
            this.digitsizeDefault = this.getDigitSizeFromArray(this.paletteDefault);
            this.digitsplit = new RegExp(".{1," + this.digitsizeDefault + "}", "g");
            this.library = {
                "raws": settings.library || {}
            };
            this.scale = settings.scale || 1;
            this.filters = settings.filters || {};
            this.flipVert = settings.flipVert || "flip-vert";
            this.flipHoriz = settings.flipHoriz || "flip-horiz";
            this.spriteWidth = settings.spriteWidth || "spriteWidth";
            this.spriteHeight = settings.spriteHeight || "spriteHeight";
            this.Uint8ClampedArray = settings.Uint8ClampedArray || window.Uint8ClampedArray || window.Uint8Array;
            // The first ChangeLinr does the raw processing of Strings to sprites
            // This is used to load & parse sprites into memory on startup
            this.ProcessorBase = new ChangeLinr.ChangeLinr({
                "transforms": {
                    "spriteUnravel": this.spriteUnravel.bind(this),
                    "spriteApplyFilter": this.spriteApplyFilter.bind(this),
                    "spriteExpand": this.spriteExpand.bind(this),
                    "spriteGetArray": this.spriteGetArray.bind(this)
                },
                "pipeline": ["spriteUnravel", "spriteApplyFilter", "spriteExpand", "spriteGetArray"]
            });
            // The second ChangeLinr does row repeating and flipping
            // This is done on demand when given a sprite's settings Object
            this.ProcessorDims = new ChangeLinr.ChangeLinr({
                "transforms": {
                    "spriteRepeatRows": this.spriteRepeatRows.bind(this),
                    "spriteFlipDimensions": this.spriteFlipDimensions.bind(this)
                },
                "pipeline": ["spriteRepeatRows", "spriteFlipDimensions"]
            });
            // As a utility, a processor is included to encode image data to sprites
            this.ProcessorEncode = new ChangeLinr.ChangeLinr({
                "transforms": {
                    "imageGetData": this.imageGetData.bind(this),
                    "imageGetPixels": this.imageGetPixels.bind(this),
                    "imageMapPalette": this.imageMapPalette.bind(this),
                    "imageCombinePixels": this.imageCombinePixels.bind(this)
                },
                "pipeline": ["imageGetData", "imageGetPixels", "imageMapPalette", "imageCombinePixels"],
                "doUseCache": false
            });
            this.library.sprites = this.libraryParse(this.library.raws);
            // The BaseFiler provides a searchable 'view' on the library of sprites
            this.BaseFiler = new StringFilr.StringFilr({
                "library": this.library.sprites,
                "normal": "normal" // to do: put this somewhere more official?
            });
            this.commandGenerators = {
                "multiple": this.generateSpriteCommandMultipleFromRender.bind(this),
                "same": this.generateSpriteCommandSameFromRender.bind(this),
                "filter": this.generateSpriteCommandFilterFromRender.bind(this)
            };
        }
        /* Simple gets
        */
        /**
         * @returns The base container for storing sprite information.
         */
        PixelRendr.prototype.getBaseLibrary = function () {
            return this.BaseFiler.getLibrary();
        };
        /**
         * @returns The StringFilr interface on top of the base library.
         */
        PixelRendr.prototype.getBaseFiler = function () {
            return this.BaseFiler;
        };
        /**
         * @returns The processor that turns raw strings into partial sprites.
         */
        PixelRendr.prototype.getProcessorBase = function () {
            return this.ProcessorBase;
        };
        /**
         * @returns The processor that converts partial sprites and repeats rows.
         */
        PixelRendr.prototype.getProcessorDims = function () {
            return this.ProcessorDims;
        };
        /**
         * @returns The processor that takes real images and compresses their data
         *          into sprite Strings.
         */
        PixelRendr.prototype.getProcessorEncode = function () {
            return this.ProcessorEncode;
        };
        /**
         * Retrieves the base sprite under the given key.
         *
         * @param key   A key for a base sprite.
         * @returns The base sprite for the key. This will be a Uint8ClampedArray
         *          or SpriteMultiple if a sprite is found, or the deepest matching
         *          Object in the library if not.
         */
        PixelRendr.prototype.getSpriteBase = function (key) {
            return this.BaseFiler.get(key);
        };
        /* External APIs
        */
        /**
         * Standard render function. Given a key, this finds the raw information via
         * BaseFiler and processes it using ProcessorDims. Attributes are needed so
         * the ProcessorDims can stretch it on width and height.
         *
         * @param key   The general key for the sprite.
         * @param attributes   Additional attributes for the sprite; width and height
         *                     Numbers are required.
         * @returns A sprite for the given key and attributes.
         */
        PixelRendr.prototype.decode = function (key, attributes) {
            var render = this.BaseFiler.get(key), sprite;
            if (!render) {
                throw new Error("No sprite found for " + key + ".");
            }
            // If the render doesn't have a listing for this key, create one
            if (!render.sprites.hasOwnProperty(key)) {
                this.generateRenderSprite(render, key, attributes);
            }
            sprite = render.sprites[key];
            if (!sprite || (sprite.constructor === this.Uint8ClampedArray && sprite.length === 0)) {
                throw new Error("Could not generate sprite for " + key + ".");
            }
            return sprite;
        };
        /**
         * Encodes an image into a sprite via ProcessorEncode.process.
         *
         * @param image   An image to encode.
         * @param callback   An optional callback to call with image and the result.
         * @param args   Any additional arguments to pass to the callback.
         */
        PixelRendr.prototype.encode = function (image, callback) {
            var args = [];
            for (var _i = 2; _i < arguments.length; _i++) {
                args[_i - 2] = arguments[_i];
            }
            var result = this.ProcessorEncode.process(image);
            if (callback) {
                callback.apply(void 0, [result, image].concat(args));
            }
            return result;
        };
        /**
         * Fetches an image from a source and encodes it into a sprite via
         * ProcessEncode.process. An HtmlImageElement is created and given an onload
         * of this.encode.
         *
         * @param uri   The URI of an image to encode.
         * @param callback   A callback to call on the results.
         */
        PixelRendr.prototype.encodeUri = function (uri, callback) {
            var image = document.createElement("img");
            image.onload = this.encode.bind(this, image, callback);
            image.src = uri;
        };
        /**
         * Miscellaneous utility to generate a complete palette from raw image pixel
         * data. Unique [r,g,b,a] values are found using tree-based caching, and
         * separated into grayscale (r,g,b equal) and general (r,g,b unequal). If a
         * pixel has a=0, it's completely transparent and goes before anything else
         * in the palette. Grayscale colors come next in order of light to dark, and
         * general colors come next sorted by decreasing r, g, and b in order.
         *
         * @param data   The equivalent data from a context's getImageData(...).data.
         * @param forceZeroColor   Whether the palette should have a [0,0,0,0] color
         *                         as the first element even if data does not contain
         *                         it (by default, false).
         * @param giveArrays   Whether the resulting palettes should be converted to
         *                     Arrays (by default, false).
         * @returns A working palette that may be used in sprite settings (Array[] if
         *          giveArrays is true).
         */
        PixelRendr.prototype.generatePaletteFromRawData = function (data, forceZeroColor, giveArrays) {
            var tree = {}, colorsGeneral = [], colorsGrayscale = [], output, i;
            for (i = 0; i < data.length; i += 4) {
                if (data[i + 3] === 0) {
                    forceZeroColor = true;
                    continue;
                }
                if (tree[data[i]]
                    && tree[data[i]][data[i + 1]]
                    && tree[data[i]][data[i + 1]][data[i + 2]]
                    && tree[data[i]][data[i + 1]][data[i + 2]][data[i + 3]]) {
                    continue;
                }
                if (!tree[data[i]]) {
                    tree[data[i]] = {};
                }
                if (!tree[data[i]][data[i + 1]]) {
                    tree[data[i]][data[i + 1]] = {};
                }
                if (!tree[data[i]][data[i + 1]][data[i + 2]]) {
                    tree[data[i]][data[i + 1]][data[i + 2]] = {};
                }
                if (!tree[data[i]][data[i + 1]][data[i + 2]][data[i + 3]]) {
                    tree[data[i]][data[i + 1]][data[i + 2]][data[i + 3]] = true;
                    if (data[i] === data[i + 1] && data[i + 1] === data[i + 2]) {
                        colorsGrayscale.push(data.subarray(i, i + 4));
                    }
                    else {
                        colorsGeneral.push(data.subarray(i, i + 4));
                    }
                }
            }
            // It's safe to sort grayscale colors just on their first values, since
            // grayscale implies they're all the same.
            colorsGrayscale.sort(function (a, b) {
                return a[0] - b[0];
            });
            // For regular colors, sort by the first color that's not equal, so in 
            // order red, green, blue, alpha.
            colorsGeneral.sort(function (a, b) {
                for (i = 0; i < 4; i += 1) {
                    if (a[i] !== b[i]) {
                        return b[i] - a[i];
                    }
                }
            });
            if (forceZeroColor) {
                output = [new this.Uint8ClampedArray([0, 0, 0, 0])]
                    .concat(colorsGrayscale)
                    .concat(colorsGeneral);
            }
            else {
                output = colorsGrayscale.concat(colorsGeneral);
            }
            if (!giveArrays) {
                return output;
            }
            for (i = 0; i < output.length; i += 1) {
                output[i] = Array.prototype.slice.call(output[i]);
            }
            return output;
        };
        /**
         * Copies a stretch of members from one Uint8ClampedArray or number[] to
         * another. This is a useful utility Function for code that may use this
         * PixelRendr to draw its output sprites, such as PixelDrawr.
         *
         * @param source   An Array-like source to copy from.
         * @param destination   An Array-like destination to copy to.
         * @param readloc   Where to start reading from in the source.
         * @param writeloc   Where to start writing to in the source.
         * @param writelength   How many members to copy over.
         * @see http://www.html5rocks.com/en/tutorials/webgl/typed_arrays/
         * @see http://www.javascripture.com/Uint8ClampedArray
         */
        PixelRendr.prototype.memcpyU8 = function (source, destination, readloc, writeloc, writelength) {
            if (readloc === void 0) { readloc = 0; }
            if (writeloc === void 0) { writeloc = 0; }
            if (writelength === void 0) { writelength = Math.max(0, Math.min(source.length, destination.length)); }
            // JIT compilation help
            var lwritelength = writelength + 0, lwriteloc = writeloc + 0, lreadloc = readloc + 0;
            while (lwritelength--) {
                destination[lwriteloc++] = source[lreadloc++];
            }
        };
        /* Library parsing
         */
        /**
         * Recursively travels through a library, turning all raw sprites and
         * commands into Renders.
         *
         * @param reference   The raw source structure to be parsed.
         * @param path   The path to the current place within the library.
         * @returns The parsed library Object.
         */
        PixelRendr.prototype.libraryParse = function (reference) {
            var setNew = {}, source, i;
            // For each child of the current layer:
            for (i in reference) {
                if (!reference.hasOwnProperty(i)) {
                    continue;
                }
                source = reference[i];
                switch (source.constructor) {
                    case String:
                        // Strings directly become IRenders
                        setNew[i] = new PixelRendr_1.Render(source);
                        break;
                    case Array:
                        // Arrays contain a String filter, a String[] source, and any
                        // number of following arguments
                        setNew[i] = new PixelRendr_1.Render(source, source[1]);
                        break;
                    default:
                        // If it's anything else, simply recurse
                        setNew[i] = this.libraryParse(source);
                        break;
                }
                // If a Render was created, mark setNew as a container
                if (setNew[i].constructor === PixelRendr_1.Render) {
                    setNew[i].containers.push({
                        "container": setNew,
                        "key": i
                    });
                }
            }
            return setNew;
        };
        /**
         * Generates a sprite for a Render based on its internal source and an
         * externally given String key and attributes Object. The sprite is stored
         * in the Render's sprites container under that key.
         *
         * @param render   A render whose sprite is being generated.
         * @param key   The key under which the sprite is stored.
         * @param attributes   Any additional information to pass to the sprite
         *                     generation process.
         */
        PixelRendr.prototype.generateRenderSprite = function (render, key, attributes) {
            var sprite;
            if (render.source.constructor === String) {
                sprite = this.generateSpriteSingleFromRender(render, key, attributes);
            }
            else {
                sprite = this.commandGenerators[render.source[0]](render, key, attributes);
            }
            render.sprites[key] = sprite;
        };
        /**
         * Generates the pixel data for a single sprite.
         *
         * @param render   A render whose sprite is being generated.
         * @param key   The key under which the sprite is stored.
         * @param attributes   Any additional information to pass to the sprite generation
         *                     process.
         * @returns   The output sprite.
         */
        PixelRendr.prototype.generateSpriteSingleFromRender = function (render, key, attributes) {
            var base = this.ProcessorBase.process(render.source, key, render.filter), sprite = this.ProcessorDims.process(base, key, attributes);
            return sprite;
        };
        /**
         * Generates the pixel data for a SpriteMultiple to be generated by creating
         * a container in a new SpriteMultiple and filing it with processed single
         * sprites.
         *
         * @param render   A render whose sprite is being generated.
         * @param key   The key under which the sprite is stored.
         * @param attributes   Any additional information to pass to the sprite generation
         *                     process.
         * @returns The output sprite.
         */
        PixelRendr.prototype.generateSpriteCommandMultipleFromRender = function (render, key, attributes) {
            var sources = render.source[2], sprites = {}, sprite, path, output = new PixelRendr_1.SpriteMultiple(sprites, render), i;
            for (i in sources) {
                if (sources.hasOwnProperty(i)) {
                    path = key + " " + i;
                    sprite = this.ProcessorBase.process(sources[i], path, render.filter);
                    sprites[i] = this.ProcessorDims.process(sprite, path, attributes);
                }
            }
            return output;
        };
        /**
         * Generates the output of a "same" command. The referenced Render or
         * directory are found, assigned to the old Render's directory, and
         * this.decode is used to find the output.
         *
         * @param render   A render whose sprite is being generated.
         * @param key   The key under which the sprite is stored.
         * @param attributes   Any additional information to pass to the
         *                              sprite generation process.
         * @returns The output sprite.
         */
        PixelRendr.prototype.generateSpriteCommandSameFromRender = function (render, key, attributes) {
            var replacement = this.followPath(this.library.sprites, render.source[1], 0);
            // The (now temporary) Render's containers are given the Render or directory
            // referenced by the source path
            this.replaceRenderInContainers(render, replacement);
            // BaseFiler will need to remember the new entry for the key,
            // so the cache is cleared and decode restarted
            this.BaseFiler.clearCached(key);
            return this.decode(key, attributes);
        };
        /**
         * Generates the output of a "filter" command. The referenced Render or
         * directory are found, converted into a filtered Render or directory, and
         * this.decode is used to find the output.
         *
         * @param render   A render whose sprite is being generated.
         * @param key   The key under which the sprite is stored.
         * @param attributes   Any additional information to pass to the sprite generation
         *                     process.
         * @returns The output sprite.
         */
        PixelRendr.prototype.generateSpriteCommandFilterFromRender = function (render, key, attributes) {
            var filter = this.filters[render.source[2]], found = this.followPath(this.library.sprites, render.source[1], 0), filtered;
            if (!filter) {
                console.warn("Invalid filter provided: " + render.source[2]);
            }
            // If found is a Render, create a new one as a filtered copy
            if (found.constructor === PixelRendr_1.Render) {
                filtered = new PixelRendr_1.Render(found.source, { filter: filter });
                this.generateRenderSprite(filtered, key, attributes);
            }
            else {
                // Otherwise it's an IRenderLibrary; go through that recursively
                filtered = this.generateRendersFromFilter(found, filter);
            }
            // The (now unused) render gives the filtered Render or directory to its containers
            this.replaceRenderInContainers(render, filtered);
            if (filtered.constructor === PixelRendr_1.Render) {
                return filtered.sprites[key];
            }
            else {
                this.BaseFiler.clearCached(key);
                return this.decode(key, attributes);
            }
        };
        /**
         * Recursively generates a directory of Renders from a filter. This is
         * similar to this.libraryParse, though the filter is added and references
         * aren't.
         *
         * @param directory   The current directory of Renders to create filtered versions
         *                    of.
         * @param filter   The filter being applied.
         * @returns An output directory containing Renders with the filter.
         */
        PixelRendr.prototype.generateRendersFromFilter = function (directory, filter) {
            var output = {}, child, i;
            for (i in directory) {
                if (!directory.hasOwnProperty(i)) {
                    continue;
                }
                child = directory[i];
                if (child.constructor === PixelRendr_1.Render) {
                    output[i] = new PixelRendr_1.Render(child.source, {
                        "filter": filter
                    });
                }
                else {
                    output[i] = this.generateRendersFromFilter(child, filter);
                }
            }
            return output;
        };
        /**
         * Switches all of a given Render's containers to point to a replacement instead.
         *
         * @param render   A Render being replaced.
         * @param replacement   A replacement for render.
         */
        PixelRendr.prototype.replaceRenderInContainers = function (render, replacement) {
            var listing, i;
            for (i = 0; i < render.containers.length; i += 1) {
                listing = render.containers[i];
                listing.container[listing.key] = replacement;
                if (replacement.constructor === PixelRendr_1.Render) {
                    replacement.containers.push(listing);
                }
            }
        };
        /* Core pipeline functions
        */
        /**
         * Given a compressed raw sprite data string, this 'unravels' it. This is
         * the first Function called in the base processor. It could output the
         * Uint8ClampedArray immediately if given the area - deliberately does not
         * to simplify sprite library storage.
         *
         * @param colors   The raw sprite String, including commands like "p" and "x".
         * @returns A version of the sprite with fancy commands replaced by numbers.
         */
        PixelRendr.prototype.spriteUnravel = function (colors) {
            var paletteref = this.getPaletteReferenceStarting(this.paletteDefault), digitsize = this.digitsizeDefault, clength = colors.length, current, rep, nixloc, output = "", loc = 0;
            while (loc < clength) {
                switch (colors[loc]) {
                    // A loop, ordered as 'x char times ,'
                    case "x":
                        // Get the location of the ending comma
                        nixloc = colors.indexOf(",", ++loc);
                        // Get the color
                        current = this.makeDigit(paletteref[colors.slice(loc, loc += digitsize)], this.digitsizeDefault);
                        // Get the rep times
                        rep = Number(colors.slice(loc, nixloc));
                        // Add that int to output, rep many times
                        while (rep--) {
                            output += current;
                        }
                        loc = nixloc + 1;
                        break;
                    // A palette changer, in the form 'p[X,Y,Z...]' (or "p" for default)
                    case "p":
                        // If the next character is a "[", customize.
                        if (colors[++loc] === "[") {
                            nixloc = colors.indexOf("]");
                            // Isolate and split the new palette's numbers
                            paletteref = this.getPaletteReference(colors.slice(loc + 1, nixloc).split(","));
                            loc = nixloc + 1;
                            digitsize = this.getDigitSizeFromObject(paletteref);
                        }
                        else {
                            // Otherwise go back to default
                            paletteref = this.getPaletteReference(this.paletteDefault);
                            digitsize = this.digitsizeDefault;
                        }
                        break;
                    // A typical number
                    default:
                        output += this.makeDigit(paletteref[colors.slice(loc, loc += digitsize)], this.digitsizeDefault);
                        break;
                }
            }
            return output;
        };
        /**
         * Repeats each number in the given string a number of times equal to the
         * scale. This is the second Function called by the base processor.
         *
         * @param colors   A series of sprite colors.
         * @returns   The same series, with each character repeated.
         */
        PixelRendr.prototype.spriteExpand = function (colors) {
            var output = "", clength = colors.length, i = 0, j, current;
            // For each number,
            while (i < clength) {
                current = colors.slice(i, i += this.digitsizeDefault);
                // Put it into output as many times as needed
                for (j = 0; j < this.scale; ++j) {
                    output += current;
                }
            }
            return output;
        };
        /**
         * Used during post-processing before spriteGetArray to filter colors. This
         * is the third Function used by the base processor, but it just returns the
         * original sprite if no filter should be applied from attributes.
         * Filters are applied here because the sprite is just the numbers repeated,
         * so it's easy to loop through and replace them.
         *
         * @param colors   A series of color characters.
         * @param key   The unique key identifying this chain of transforms.
         * @param attributes   Attributes describing the filter to use.
         * @returns The original series of color characters, filtered.
         */
        PixelRendr.prototype.spriteApplyFilter = function (colors, key, attributes) {
            // If there isn't a filter (as is the norm), just return the sprite
            if (!attributes || !attributes.filter) {
                return colors;
            }
            var filter = attributes.filter, filterName = filter[0];
            if (!filterName) {
                return colors;
            }
            switch (filterName) {
                // Palette filters switch all instances of one color with another
                case "palette":
                    // Split the colors on on each digit
                    // ("...1234..." => [..., "12", "34", ...]
                    var split = colors.match(this.digitsplit), i;
                    // For each color filter to be applied, replace it
                    for (i in filter[1]) {
                        if (filter[1].hasOwnProperty(i)) {
                            this.arrayReplace(split, i, filter[1][i]);
                        }
                    }
                    return split.join("");
                default:
                    console.warn("Unknown filter: '" + filterName + "'.");
            }
            return colors;
        };
        /**
         * Converts an unraveled String of sprite numbers to the equivalent RGBA
         * Uint8ClampedArray. Each colors number will be represented by four numbers
         * in the output. This is the fourth Function called in the base processor.
         *
         * @param colors   A series of color characters.
         * @returns A series of pixels equivalent to the colors.
         */
        PixelRendr.prototype.spriteGetArray = function (colors) {
            var clength = colors.length, numcolors = clength / this.digitsizeDefault, split = colors.match(this.digitsplit), olength = numcolors * 4, output = new this.Uint8ClampedArray(olength), reference, i, j, k;
            // For each color,
            for (i = 0, j = 0; i < numcolors; ++i) {
                // Grab its RGBA ints
                reference = this.paletteDefault[Number(split[i])];
                // Place each in output
                for (k = 0; k < 4; ++k) {
                    output[j + k] = reference[k];
                }
                j += 4;
            }
            return output;
        };
        /**
         * Repeats each row of a sprite based on the container attributes to create
         * the actual sprite (before now, the sprite was 1 / scale as high as it
         * should have been). This is the first Function called in the dimensions
         * processor.
         *
         * @param sprite   A series of sprite pixels.
         * @param key   The unique key identifying this chain of transforms.
         * @param attributes   The container Object (commonly a Thing in GameStarter),
         *                     which must contain width and height numbers.
         * @returns A version of the original sprite, with rows repeated.
         */
        PixelRendr.prototype.spriteRepeatRows = function (sprite, key, attributes) {
            var parsed = new this.Uint8ClampedArray(sprite.length * this.scale), rowsize = attributes[this.spriteWidth] * 4, height = attributes[this.spriteHeight] / this.scale, readloc = 0, writeloc = 0, i, j;
            // For each row:
            for (i = 0; i < height; ++i) {
                // Add it to parsed x scale
                for (j = 0; j < this.scale; ++j) {
                    this.memcpyU8(sprite, parsed, readloc, writeloc, rowsize);
                    writeloc += rowsize;
                }
                readloc += rowsize;
            }
            return parsed;
        };
        /**
         * Optionally flips a sprite based on the flipVert and flipHoriz keys. This
         * is the second Function in the dimensions processor and the last step
         * before a sprite is deemed usable.
         *
         * @param sprite   A series of sprite pixels.
         * @param key   The unique key identifying this chain of transforms.
         * @param attributes   The container Object (commonly a Thing in GameStarter),
         *                     which must contain width and height numbers.
         * @returns A version of the original sprite, with dimensions flipped.
         */
        PixelRendr.prototype.spriteFlipDimensions = function (sprite, key, attributes) {
            if (key.indexOf(this.flipHoriz) !== -1) {
                if (key.indexOf(this.flipVert) !== -1) {
                    return this.flipSpriteArrayBoth(sprite);
                }
                else {
                    return this.flipSpriteArrayHoriz(sprite, attributes);
                }
            }
            else if (key.indexOf(this.flipVert) !== -1) {
                return this.flipSpriteArrayVert(sprite, attributes);
            }
            return sprite;
        };
        /**
         * Flips a sprite horizontally by reversing the pixels within each row. Rows
         * are computing using the spriteWidth in attributes.
         *
         * @param sprite   A series of sprite pixels.
         * @param attributes   The container Object (commonly a Thing in GameStarter),
         *                     which must contain width and height numbers.
         * @returns A version of the original sprite, flipped horizontally.
         */
        PixelRendr.prototype.flipSpriteArrayHoriz = function (sprite, attributes) {
            var length = sprite.length + 0, width = attributes[this.spriteWidth] + 0, newsprite = new this.Uint8ClampedArray(length), rowsize = width * 4, newloc, oldloc, i, j, k;
            // For each row:
            for (i = 0; i < length; i += rowsize) {
                newloc = i;
                oldloc = i + rowsize - 4;
                // For each pixel:
                for (j = 0; j < rowsize; j += 4) {
                    // Copy it over
                    for (k = 0; k < 4; ++k) {
                        newsprite[newloc + k] = sprite[oldloc + k];
                    }
                    newloc += 4;
                    oldloc -= 4;
                }
            }
            return newsprite;
        };
        /**
         * Flips a sprite horizontally by reversing the order of the rows. Rows are
         * computing using the spriteWidth in attributes.
         *
         * @param sprite   A series of sprite pixels.
         * @param attributes   The container Object (commonly a Thing in GameStarter),
         *                     which must contain width and height numbers.
         * @returns A version of the original sprite, flipped vertically.
         */
        PixelRendr.prototype.flipSpriteArrayVert = function (sprite, attributes) {
            var length = sprite.length, width = attributes[this.spriteWidth] + 0, newsprite = new this.Uint8ClampedArray(length), rowsize = width * 4, newloc = 0, oldloc = length - rowsize, i, j;
            // For each row
            while (newloc < length) {
                // For each pixel in the rows
                for (i = 0; i < rowsize; i += 4) {
                    // For each rgba value
                    for (j = 0; j < 4; ++j) {
                        newsprite[newloc + i + j] = sprite[oldloc + i + j];
                    }
                }
                newloc += rowsize;
                oldloc -= rowsize;
            }
            return newsprite;
        };
        /**
         * Flips a sprite horizontally and vertically by reversing the order of the
         * pixels. This doesn't actually need attributes.
         *
         * @param sprite   A series of sprite pixels.
         * @param attributes   The container Object (commonly a Thing in GameStarter),
         *                     which must contain width and height numbers.
         * @returns A version of the original sprite, flipped horizontally and vertically.
         */
        PixelRendr.prototype.flipSpriteArrayBoth = function (sprite) {
            var length = sprite.length, newsprite = new this.Uint8ClampedArray(length), oldloc = sprite.length - 4, newloc = 0, i;
            while (newloc < length) {
                for (i = 0; i < 4; ++i) {
                    newsprite[newloc + i] = sprite[oldloc + i];
                }
                newloc += 4;
                oldloc -= 4;
            }
            return newsprite;
        };
        /* Encoding pipeline functions
        */
        /**
         * Retrives the raw pixel data from an image element. It is copied onto a
         * canvas, which as its context return the .getImageDate().data results.
         * This is the first Fiunction used in the encoding processor.
         *
         * @param image   An image whose data is to be retrieved.
         */
        PixelRendr.prototype.imageGetData = function (image) {
            var canvas = document.createElement("canvas"), context = canvas.getContext("2d");
            canvas.width = image.width;
            canvas.height = image.height;
            context.drawImage(image, 0, 0);
            return context.getImageData(0, 0, image.width, image.height).data;
        };
        /**
         * Determines which pixels occur in the data and at what frequency. This is
         * the second Function used in the encoding processor.
         *
         * @param data   The raw pixel data obtained from the imageData of a canvas.
         * @returns [pixels, occurences], where pixels is an array of [rgba] values
         *          and occurences is an Object mapping occurence frequencies of
         *          palette colors in pisels.
         */
        PixelRendr.prototype.imageGetPixels = function (data) {
            var pixels = new Array(data.length / 4), occurences = {}, pixel, i, j;
            for (i = 0, j = 0; i < data.length; i += 4, j += 1) {
                pixel = this.getClosestInPalette(this.paletteDefault, data.subarray(i, i + 4));
                pixels[j] = pixel;
                if (occurences.hasOwnProperty(pixel)) {
                    occurences[pixel] += 1;
                }
                else {
                    occurences[pixel] = 1;
                }
            }
            return [pixels, occurences];
        };
        /**
         * Concretely defines the palette to be used for a new sprite. This is the
         * third Function used in the encoding processor, and creates a technically
         * usable (but uncompressed) sprite with information to compress it.
         *
         * @param information   [pixels, occurences], a result directly from imageGetPixels.
         * @returns [palette, numbers, digitsize], where palette is a String[] of palette
         *          numbers, numbers is the actual sprite data, and digitsize is the sprite's
         *          digit size.
         */
        PixelRendr.prototype.imageMapPalette = function (information) {
            var pixels = information[0], occurences = information[1], palette = Object.keys(occurences), digitsize = this.getDigitSizeFromArray(palette), paletteIndices = this.getValueIndices(palette), numbers = pixels.map(function (pixel) { return paletteIndices[pixel]; });
            return [palette, numbers, digitsize];
        };
        /**
         * Compresses a nearly complete sprite from imageMapPalette into a
         * compressed, storage-ready String. This is the last Function in the
         * encoding processor.
         *
         * @param information   [palette, numbers, digitsize], a result directly from
         *                      imageMapPalette.
         * @returns The pixels from information, combined.
         */
        PixelRendr.prototype.imageCombinePixels = function (information) {
            var palette = information[0], numbers = information[1], digitsize = information[2], threshold = Math.max(3, Math.round(4 / digitsize)), output, current, digit, i = 0, j;
            output = "p[" + palette.map(this.makeSizedDigit.bind(this, digitsize)).join(",") + "]";
            while (i < numbers.length) {
                j = i + 1;
                current = numbers[i];
                digit = this.makeDigit(current, digitsize);
                while (current === numbers[j]) {
                    j += 1;
                }
                if (j - i > threshold) {
                    output += "x" + digit + String(j - i) + ",";
                    i = j;
                }
                else {
                    do {
                        output += digit;
                        i += 1;
                    } while (i < j);
                }
            }
            return output;
        };
        /* Misc. utility functions
        */
        /**
         * Determines how many digits will be required to represent a member of
         * the palette.
         *
         * @param palette   A palette of colors.
         * @returns The equivalent digitsize for the palette.
         */
        PixelRendr.prototype.getDigitSizeFromArray = function (palette) {
            var digitsize = 0, i;
            for (i = palette.length; i >= 1; i /= 10) {
                digitsize += 1;
            }
            return digitsize;
        };
        /**
         * Determines how many digits will be required to represent a member of
         * the palette.
         *
         * @param palette   A palette of colors.
         * @returns The equivalent digitsize for the palette.
         */
        PixelRendr.prototype.getDigitSizeFromObject = function (palette) {
            return this.getDigitSizeFromArray(Object.keys(palette));
        };
        /**
         * Generates an actual palette Object for a given palette, using a digitsize
         * calculated from the palette.
         *
         * @param palette   A palette of colors
         * @returns The actual palette Object for the given palette, with an index
         *          for every palette member.
         */
        PixelRendr.prototype.getPaletteReference = function (palette) {
            var output = {}, digitsize = this.getDigitSizeFromArray(palette), i;
            for (i = 0; i < palette.length; i += 1) {
                output[this.makeDigit(i, digitsize)] = this.makeDigit(palette[i], digitsize);
            }
            return output;
        };
        /**
         * Generates an actual palette Object for a given palette, using the default
         * digitsize.
         *
         * @param palette   A palette of colors.
         * @returns The actual palette Object for the given palette, with an index
         *          for every palette member.
         */
        PixelRendr.prototype.getPaletteReferenceStarting = function (palette) {
            var output = {}, digit, i;
            for (i = 0; i < palette.length; i += 1) {
                digit = this.makeDigit(i, this.digitsizeDefault);
                output[digit] = digit;
            }
            return output;
        };
        /**
         * Finds which rgba value in a palette is closest to a given value. This is
         * useful for determining which color in a pre-existing palette matches up
         * with a raw image's pixel. This is determined by which palette color has
         * the lowest total difference in integer values between r, g, b, and a.
         *
         * @param palette   The palette of pre-existing colors.
         * @param rgba   The RGBA values being assigned, as Numbers in [0, 255].
         * @returns The closest matching color index.
         */
        PixelRendr.prototype.getClosestInPalette = function (palette, rgba) {
            var bestDifference = Infinity, difference, bestIndex, i;
            for (i = palette.length - 1; i >= 0; i -= 1) {
                difference = this.arrayDifference(palette[i], rgba);
                if (difference < bestDifference) {
                    bestDifference = difference;
                    bestIndex = i;
                }
            }
            return bestIndex;
        };
        /**
         * Creates a new String equivalent to an old String repeated any number of
         * times. If times is 0, a blank String is returned.
         *
         * @param string   The characters to repeat.
         * @param times   How many times to repeat (by default, 1).
         * @returns The original string, repeated.
         */
        PixelRendr.prototype.stringOf = function (string, times) {
            return (times === 0) ? "" : new Array(1 + (times || 1)).join(string);
        };
        /**
         * Turns a Number into a String with a prefix added to pad it to a certain
         * number of digits.
         *
         * @param number   The original Number being padded.
         * @param size   How many digits the output must contain.
         * @param prefix   A prefix to repeat for padding (by default, "0").
         * @returns A Stringified digit of the given length.
         * @example makeDigit(7, 3); // '007'
         * @example makeDigit(7, 3, 1); // '117'
         */
        PixelRendr.prototype.makeDigit = function (num, size, prefix) {
            if (prefix === void 0) { prefix = "0"; }
            return this.stringOf(prefix, Math.max(0, size - String(num).length)) + num;
        };
        /**
         * Curry wrapper around makeDigit that reverses size and number argument
         * order. Useful for binding makeDigit.
         *
         * @param number   The original Number being padded.
         * @param size   How many digits the output must contain.
         * @returns A stringified digit of the given length.
         */
        PixelRendr.prototype.makeSizedDigit = function (size, number) {
            return this.makeDigit(number, size, "0");
        };
        /**
         * Replaces all instances of an element in an Array.
         *
         * @param array   The original elements.
         * @param removed   The element to remove.
         * @param inserted   The element to insert.
         * @returns The original Array, with the element replaced.
         */
        PixelRendr.prototype.arrayReplace = function (array, removed, inserted) {
            for (var i = 0; i < array.length; i += 1) {
                if (array[i] === removed) {
                    array[i] = inserted;
                }
            }
            return array;
        };
        /**
         * Computes the sum of the differences of elements between two Arrays of
         * equal length.
         *
         * @param a   An Array of Numbers.
         * @param b   An Array of Numbers.
         * @returns The sum of differences between a and b.
         */
        PixelRendr.prototype.arrayDifference = function (a, b) {
            var sum = 0, i;
            for (i = a.length - 1; i >= 0; i -= 1) {
                sum += Math.abs(a[i] - b[i]) | 0;
            }
            return sum;
        };
        /**
         * Converts an Array to an Object mapping values to indices.
         *
         * @param array   An Array to convert.
         * @returns An Object with an index equal to each element of the Array.
         */
        PixelRendr.prototype.getValueIndices = function (array) {
            var output = {}, i;
            for (i = 0; i < array.length; i += 1) {
                output[array[i]] = i;
            }
            return output;
        };
        /**
         * Follows a path inside an Object recursively, based on a given path.
         *
         * @param object   An Object to delve within.
         * @param path   The ordered names of attributes to descend into.
         * @param index   The starting index in path.
         * @returns A found element within object.
         */
        PixelRendr.prototype.followPath = function (object, path, index) {
            if (index < path.length && object.hasOwnProperty(path[index])) {
                return this.followPath(object[path[index]], path, index + 1);
            }
            return object;
        };
        return PixelRendr;
    })();
    PixelRendr_1.PixelRendr = PixelRendr;
})(PixelRendr || (PixelRendr = {}));
