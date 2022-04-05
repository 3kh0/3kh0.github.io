var EightBittr;
(function (EightBittr_1) {
    "use strict";
    /**
     * An abstract class used exclusively as the parent of GameStartr. EightBittr
     * contains useful functions for manipulating Things that are independent of
     * the required GameStartr modules.
     */
    var EightBittr = (function () {
        /**
         * Initializes a new instance of the EightBittr class. Constants are copied
         * onto the EightBittr from the designated source.
         *
         * @param settings   Any optional custom settings.
         */
        function EightBittr(settings) {
            if (settings === void 0) { settings = {}; }
            var EightBitter = EightBittr.prototype.ensureCorrectCaller(this), constants = settings.constants, constantsSource = settings.constantsSource || EightBitter, i;
            EightBitter.unitsize = settings.unitsize || 1;
            EightBitter.constants = constants;
            if (constants) {
                for (i = 0; i < constants.length; i += 1) {
                    EightBitter[constants[i]] = constantsSource[constants[i]];
                }
            }
        }
        /* Resets
        */
        /**
         * Resets the EightBittr by calling all of the named reset member Functions
         * on itself.
         *
         * @param EightBitter
         * @param resets   The ordered Array of reset Functions to be called.
         * @param customs   Additional arguments to pass to all reset Functions.
         */
        EightBittr.prototype.reset = function (EightBitter, resets, customs) {
            var reset, i;
            EightBitter.customs = customs;
            for (i = 0; i < resets.length; i += 1) {
                reset = resets[i];
                if (!EightBitter[reset]) {
                    throw new Error(reset + " is missing on a resetting EightBittr.");
                }
                EightBitter[reset](EightBitter, customs);
            }
        };
        /**
         * Resets the EightBittr in a timed manner by calling all the named reset
         * member Functions on itself and adding the time (in milliseconds) along
         * along with the total process time to an Array, which is then returned.
         *
         * @param EightBitter
         * @param resets   The ordered Array of reset Functions to be called.
         * @param customs   Additional arguments to pass to all reset Functions.
         */
        EightBittr.prototype.resetTimed = function (EightBitter, resets, customs) {
            var timeStartTotal = performance.now(), timeEndTotal, timeStart, timeEnd, i;
            this.resetTimes = {
                order: resets,
                times: []
            };
            for (i = 0; i < resets.length; i += 1) {
                timeStart = performance.now();
                EightBitter[resets[i]](EightBitter, customs);
                timeEnd = performance.now();
                this.resetTimes.times.push({
                    "name": resets[i],
                    "timeStart": timeStart,
                    "timeEnd": timeEnd,
                    "timeTaken": timeEnd - timeStart
                });
            }
            timeEndTotal = performance.now();
            this.resetTimes.total = {
                "name": "resetTimed",
                "timeStart": timeStartTotal,
                "timeEnd": timeEndTotal,
                "timeTaken": timeEndTotal - timeStartTotal
            };
        };
        /* HTML Functions
        */
        /**
         * Creates and returns a new HTML <canvas> element with no image smoothing.
         *
         * @param width   How wide the canvas should be.
         * @param height   How tall the canvas should be.
         * @returns A canvas of the given width and height height.
         */
        EightBittr.prototype.createCanvas = function (width, height) {
            var canvas = document.createElement("canvas"), 
            // context: CanvasRenderingContext2D = canvas.getContext("2d");
            context = canvas.getContext("2d");
            canvas.width = width;
            canvas.height = height;
            // For speed's sake, disable image smoothing in the first supported browsers
            if (typeof context.imageSmoothingEnabled !== "undefined") {
                context.imageSmoothingEnabled = false;
            }
            else if (typeof context.webkitImageSmoothingEnabled !== "undefined") {
                context.webkitImageSmoothingEnabled = false;
            }
            else if (typeof context.mozImageSmoothingEnabled !== "undefined") {
                context.mozImageSmoothingEnabled = false;
            }
            else if (typeof context.msImageSmoothingEnabled !== "undefined") {
                context.msImageSmoothingEnabled = false;
            }
            else if (typeof context.oImageSmoothingEnabled !== "undefined") {
                context.oImageSmoothingEnabled = false;
            }
            return canvas;
        };
        /* Physics functions
        */
        /**
         * Shifts a Thing vertically by changing its top and bottom attributes.
         *
         * @param thing   The Thing to shift vertically.
         * @param dy   How far to shift the Thing.
         */
        EightBittr.prototype.shiftVert = function (thing, dy) {
            thing.top += dy;
            thing.bottom += dy;
        };
        /**
         * Shifts a Thing horizontally by changing its top and bottom attributes.
         *
         * @param thing   The Thing to shift horizontally.
         * @param dy   How far to shift the Thing.
         */
        EightBittr.prototype.shiftHoriz = function (thing, dx) {
            thing.left += dx;
            thing.right += dx;
        };
        /**
         * Sets the top of a Thing to a set number, changing the bottom based on its
         * height and the EightBittr's unisize.
         *
         * @param thing   The Thing to shift vertically.
         * @param top   Where the Thing's top should be.
         */
        EightBittr.prototype.setTop = function (thing, top) {
            thing.top = top;
            thing.bottom = thing.top + thing.height * thing.EightBitter.unitsize;
        };
        /**
         * Sets the right of a Thing to a set number, changing the left based on its
         * width and the EightBittr's unisize.
         *
         * @param thing   The Thing to shift horizontally.
         * @param top   Where the Thing's right should be.
         */
        EightBittr.prototype.setRight = function (thing, right) {
            thing.right = right;
            thing.left = thing.right - thing.width * thing.EightBitter.unitsize;
        };
        /**
         * Sets the bottom of a Thing to a set number, changing the top based on its
         * height and the EightBittr's unisize.
         *
         * @param thing   The Thing to shift vertically.
         * @param top   Where the Thing's bottom should be.
         */
        EightBittr.prototype.setBottom = function (thing, bottom) {
            thing.bottom = bottom;
            thing.top = thing.bottom - thing.height * thing.EightBitter.unitsize;
        };
        /**
         * Sets the left of a Thing to a set number, changing the right based on its
         * width and the EightBittr's unisize.
         *
         * @param thing   The Thing to shift horizontally.
         * @param top   Where the Thing's left should be.
         */
        EightBittr.prototype.setLeft = function (thing, left) {
            thing.left = left;
            thing.right = thing.left + thing.width * thing.EightBitter.unitsize;
        };
        /**
         * Shifts a Thing so that it is horizontally centered on the given x.
         *
         * @param thing   The Thing to shift horizontally.
         * @param x   Where the Thing's horizontal midpoint should be.
         */
        EightBittr.prototype.setMidX = function (thing, x) {
            thing.EightBitter.setLeft(thing, x - thing.width * thing.EightBitter.unitsize / 2);
        };
        /**
         * Shifts a Thing so that it is vertically centered on the given y.
         *
         * @param thing   The Thing to shift vertically.
         * @param y   Where the Thing's vertical midpoint should be.
         */
        EightBittr.prototype.setMidY = function (thing, y) {
            thing.EightBitter.setTop(thing, y - thing.height * thing.EightBitter.unitsize / 2);
        };
        /**
         * Shifts a Thing so that it is centered on the given x and y.
         *
         * @param thing   The Thing to shift vertically and horizontally.
         * @param x   Where the Thing's horizontal midpoint should be.
         * @param y   Where the Thing's vertical midpoint should be.
         */
        EightBittr.prototype.setMid = function (thing, x, y) {
            thing.EightBitter.setMidX(thing, x);
            thing.EightBitter.setMidY(thing, y);
        };
        /**
         * @param thing
         * @returns The horizontal midpoint of the Thing.
         */
        EightBittr.prototype.getMidX = function (thing) {
            return thing.left + thing.width * thing.EightBitter.unitsize / 2;
        };
        /**
         * @param thing
         * @returns The vertical midpoint of the Thing.
         */
        EightBittr.prototype.getMidY = function (thing) {
            return thing.top + thing.height * thing.EightBitter.unitsize / 2;
        };
        /**
         * Shifts a Thing so that its midpoint is centered on the midpoint of the
         * other Thing.
         *
         * @param thing   The Thing to be shifted.
         * @param other   The Thing whose midpoint is referenced.
         */
        EightBittr.prototype.setMidObj = function (thing, other) {
            thing.EightBitter.setMidXObj(thing, other);
            thing.EightBitter.setMidYObj(thing, other);
        };
        /**
         * Shifts a Thing so that its horizontal midpoint is centered on the
         * midpoint of the other Thing.
         *
         * @param thing   The Thing to be shifted horizontally.
         * @param other   The Thing whose horizontal midpoint is referenced.
         */
        EightBittr.prototype.setMidXObj = function (thing, other) {
            thing.EightBitter.setLeft(thing, thing.EightBitter.getMidX(other)
                - (thing.width * thing.EightBitter.unitsize / 2));
        };
        /**
         * Shifts a Thing so that its vertical midpoint is centered on the
         * midpoint of the other Thing.
         *
         * @param thing   The Thing to be shifted vertically.
         * @param other   The Thing whose vertical midpoint is referenced.
         */
        EightBittr.prototype.setMidYObj = function (thing, other) {
            thing.EightBitter.setTop(thing, thing.EightBitter.getMidY(other)
                - (thing.height * thing.EightBitter.unitsize / 2));
        };
        /**
         * @param thing
         * @param other
         * @returns Whether the first Thing's midpoint is to the left of the other's.
         */
        EightBittr.prototype.objectToLeft = function (thing, other) {
            return (thing.EightBitter.getMidX(thing) < thing.EightBitter.getMidX(other));
        };
        /**
         * Shifts a Thing's top up, then sets the bottom (similar to a shiftVert and
         * a setTop combined).
         *
         * @param thing   The Thing to be shifted vertically.
         * @param dy   How far to shift the Thing vertically.
         */
        EightBittr.prototype.updateTop = function (thing, dy) {
            // If a dy is provided, move the thing's top that much
            thing.top += dy || 0;
            // Make the thing's bottom dependent on the top
            thing.bottom = thing.top + thing.height * thing.EightBitter.unitsize;
        };
        /**
         * Shifts a Thing's right, then sets the left (similar to a shiftHoriz and a
         * setRight combined).
         *
         * @param thing   The Thing to be shifted horizontally.
         * @param dx   How far to shift the Thing horizontally.
         */
        EightBittr.prototype.updateRight = function (thing, dx) {
            // If a dx is provided, move the thing's right that much
            thing.right += dx || 0;
            // Make the thing's left dependent on the right
            thing.left = thing.right - thing.width * thing.EightBitter.unitsize;
        };
        /**
         * Shifts a Thing's bottom down, then sets the bottom (similar to a
         * shiftVert and a setBottom combined).
         *
         * @param thing   The Thing to be shifted vertically.
         * @param dy   How far to shift the Thing vertically.
         */
        EightBittr.prototype.updateBottom = function (thing, dy) {
            // If a dy is provided, move the thing's bottom that much
            thing.bottom += dy || 0;
            // Make the thing's top dependent on the top
            thing.top = thing.bottom - thing.height * thing.EightBitter.unitsize;
        };
        /**
         * Shifts a Thing's left, then sets the right (similar to a shiftHoriz and a
         * setLeft combined).
         *
         * @param thing   The Thing to be shifted horizontally.
         * @param dx   How far to shift the Thing horizontally.
         */
        EightBittr.prototype.updateLeft = function (thing, dx) {
            // If a dx is provided, move the thing's left that much
            thing.left += dx || 0;
            // Make the thing's right dependent on the left
            thing.right = thing.left + thing.width * thing.EightBitter.unitsize;
        };
        /**
         * Shifts a Thing toward a target x, but limits the total distance allowed.
         * Distance is computed as from the Thing's horizontal midpoint.
         *
         * @param thing   The Thing to be shifted horizontally.
         * @param x   How far to shift the Thing horizontally.
         * @param maxDistance   The maximum distance the Thing can be shifted.
         */
        EightBittr.prototype.slideToX = function (thing, x, maxDistance) {
            var midx = thing.EightBitter.getMidX(thing);
            // If no maxSpeed is provided, assume Infinity (so it doesn't matter)
            maxDistance = maxDistance || Infinity;
            // Thing to the left? Slide to the right.
            if (midx < x) {
                thing.EightBitter.shiftHoriz(thing, Math.min(maxDistance, x - midx));
            }
            else {
                // Thing to the right? Slide to the left.
                thing.EightBitter.shiftHoriz(thing, Math.max(-maxDistance, x - midx));
            }
        };
        /**
         * Shifts a Thing toward a target y, but limits the total distance allowed.
         * Distance is computed as from the Thing's vertical midpoint.
         *
         * @param thing   The Thing to be shifted vertically.
         * @param x   How far to shift the Thing vertically.
         * @param maxDistance   The maximum distance the Thing can be shifted.
         */
        EightBittr.prototype.slideToY = function (thing, y, maxDistance) {
            var midy = thing.EightBitter.getMidY(thing);
            // If no maxSpeed is provided, assume Infinity (so it doesn't matter)
            maxDistance = maxDistance || Infinity;
            // Thing above? slide down.
            if (midy < y) {
                thing.EightBitter.shiftVert(thing, Math.min(maxDistance, y - midy));
            }
            else {
                // Thing below? Slide up.
                thing.EightBitter.shiftVert(thing, Math.max(-maxDistance, y - midy));
            }
        };
        /* EightBittr utilities
        */
        /**
         * Ensures the current object is an EightBittr by throwing an error if it
         * is not. This should be used for functions in any EightBittr descendants
         * that have to call 'this' to ensure their caller is what the programmer
         * expected it to be.
         *
         * @param current   The scope that should be an EightBittr.
         */
        EightBittr.prototype.ensureCorrectCaller = function (current) {
            if (!(current instanceof EightBittr)) {
                throw new Error("A function requires the caller ('this') to be the "
                    + "manipulated EightBittr object. Unfortunately, 'this' is a "
                    + typeof (this) + ".");
            }
            return current;
        };
        /* General utilities
        */
        /**
         * "Proliferates" all properties of a donor onto a recipient by copying each
         * of them and recursing onto child Objects. This is a deep copy.
         *
         * @param recipient   An object to receive properties from the donor.
         * @param donor   An object do donoate properties to the recipient.
         * @param noOverride   Whether pre-existing properties of the recipient should
         *                     be skipped (defaults to false).
         * @returns recipient
         */
        EightBittr.prototype.proliferate = function (recipient, donor, noOverride) {
            if (noOverride === void 0) { noOverride = false; }
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
         * Identical to proliferate, but instead of checking whether the recipient
         * hasOwnProperty on properties, it just checks if they're truthy.
         *
         * @param recipient   An object to receive properties from the donor.
         * @param donor   An object do donoate properties to the recipient.
         * @param noOverride   Whether pre-existing properties of the recipient should
         *                     be skipped (defaults to false).
         * @returns recipient
         */
        EightBittr.prototype.proliferateHard = function (recipient, donor, noOverride) {
            var setting, i;
            // For each attribute of the donor:
            for (i in donor) {
                if (donor.hasOwnProperty(i)) {
                    // If noOverride, don't override already existing properties
                    if (noOverride && recipient[i]) {
                        continue;
                    }
                    // If it's an object, recurse on a new version of it
                    setting = donor[i];
                    if (typeof setting === "object") {
                        if (!recipient[i]) {
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
         * @param recipient   An HTMLElement to receive properties from the donor.
         * @param donor   An object do donoate properties to the recipient.
         * @param noOverride   Whether pre-existing properties of the recipient should
         *                     be skipped (defaults to false).
         * @returns recipient
         */
        EightBittr.prototype.proliferateElement = function (recipient, donor, noOverride) {
            if (noOverride === void 0) { noOverride = false; }
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
                        // Children and options: just append all of them directly
                        case "children":
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
                            // If it's null, don't do anything (like .textContent)
                            if (setting === null) {
                                recipient[i] = null;
                            }
                            else if (typeof setting === "object") {
                                // If it's an object, recurse on a new version of it
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
         * Creates and returns an HTMLElement of the specified type. Any additional
         * settings Objects may be given to be proliferated onto the Element via
         * proliferateElement.
         *
         * @param type   The tag of the Element to be created.
         * @param settings   Additional settings to proliferated onto the Element.
         * @returns {HTMLElement}
         */
        EightBittr.prototype.createElement = function (tag) {
            var args = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                args[_i - 1] = arguments[_i];
            }
            var EightBitter = EightBittr.prototype.ensureCorrectCaller(this), element = document.createElement(tag || "div"), i;
            // For each provided object, add those settings to the element
            for (i = 0; i < args.length; i += 1) {
                EightBitter.proliferateElement(element, args[i]);
            }
            return element;
        };
        /**
         * Follows a path inside an Object recursively, based on a given path.
         *
         * @param object   A container to follow a path inside.
         * @param path   The ordered names of attributes to descend into.
         * @param num   The starting index in path (by default, 0).
         * @returns The discovered property within object, or undefined if the
         *          full path doesn't exist.
         */
        EightBittr.prototype.followPathHard = function (object, path, index) {
            if (index === void 0) { index = 0; }
            for (var i = index; i < path.length; i += 1) {
                if (typeof object[path[i]] === "undefined") {
                    return undefined;
                }
                else {
                    object = object[path[i]];
                }
            }
            return object;
        };
        /**
         * Switches an object from one Array to another using splice and push.
         *
         * @param object    The object to move between Arrays.
         * @param arrayOld   The Array to take the object out of.
         * @param arrayNew   The Array to move the object into.
         */
        EightBittr.prototype.arraySwitch = function (object, arrayOld, arrayNew) {
            arrayOld.splice(arrayOld.indexOf(object), 1);
            arrayNew.push(object);
        };
        /**
         * Sets a Thing's position within an Array to the front by splicing and then
         * unshifting it.
         *
         * @param object   The object to move within the Array.
         * @param array   An Array currently containing the object.
         */
        EightBittr.prototype.arrayToBeginning = function (object, array) {
            array.splice(array.indexOf(object), 1);
            array.unshift(object);
        };
        /**
         * Sets a Thing's position within an Array to the front by splicing and then
         * pushing it.
         *
         * @param object   The object to move within the Array.
         * @param array   An Array currently containing the object.
         */
        EightBittr.prototype.arrayToEnd = function (object, array) {
            array.splice(array.indexOf(object), 1);
            array.push(object);
        };
        /**
         * Sets a Thing's position within an Array to a specific index by splicing
         * it out, then back in.
         *
         * @param object   The object to move within the Array.
         * @param array   An Array currently containing the object.
         * @param index   Where the object should be moved to in the Array.
         */
        EightBittr.prototype.arrayToIndex = function (object, array, index) {
            array.splice(array.indexOf(object), 1);
            array.splice(index, 0, object);
        };
        return EightBittr;
    })();
    EightBittr_1.EightBittr = EightBittr;
    
})(EightBittr || (EightBittr = {}));
