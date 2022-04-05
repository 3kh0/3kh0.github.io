/// <reference path="ChangeLinr-0.2.0.ts" />
/// <reference path="ObjectMakr-0.2.2.ts" />
/// <reference path="PixelRendr-0.2.0.ts" />
/// <reference path="QuadsKeepr-0.2.1.ts" />
/// <reference path="StringFilr-0.2.1.ts" />
var PixelDrawr;
(function (PixelDrawr_1) {
    "use strict";
    /**
     * A front-end to PixelRendr to automate drawing mass amounts of sprites.
     */
    var PixelDrawr = (function () {
        /**
         * Initializes a new instance of the PixelDrawr class.
         *
         * @param settings   Settings to be used for initialization.
         */
        function PixelDrawr(settings) {
            if (!settings) {
                throw new Error("No settings object given to PixelDrawr.");
            }
            if (typeof settings.PixelRender === "undefined") {
                throw new Error("No PixelRender given to PixelDrawr.");
            }
            if (typeof settings.MapScreener === "undefined") {
                throw new Error("No MapScreener given to PixelDrawr.");
            }
            if (typeof settings.createCanvas === "undefined") {
                throw new Error("No createCanvas given to PixelDrawr.");
            }
            this.PixelRender = settings.PixelRender;
            this.MapScreener = settings.MapScreener;
            this.createCanvas = settings.createCanvas;
            this.unitsize = settings.unitsize || 1;
            this.noRefill = settings.noRefill;
            this.spriteCacheCutoff = settings.spriteCacheCutoff || 0;
            this.groupNames = settings.groupNames;
            this.framerateSkip = settings.framerateSkip || 1;
            this.framesDrawn = 0;
            this.epsilon = settings.epsilon || .007;
            this.keyWidth = settings.keyWidth || "width";
            this.keyHeight = settings.keyHeight || "height";
            this.keyTop = settings.keyTop || "top";
            this.keyRight = settings.keyRight || "right";
            this.keyBottom = settings.keyBottom || "bottom";
            this.keyLeft = settings.keyLeft || "left";
            this.keyOffsetX = settings.keyOffsetX;
            this.keyOffsetY = settings.keyOffsetY;
            this.generateObjectKey = settings.generateObjectKey || function (thing) {
                return thing.toString();
            };
            this.resetBackground();
        }
        /* Simple gets
        */
        /**
         * @returns How often refill calls should be skipped.
         */
        PixelDrawr.prototype.getFramerateSkip = function () {
            return this.framerateSkip;
        };
        /**
         * @returns The Arrays to be redrawn during refill calls.
         */
        PixelDrawr.prototype.getThingArray = function () {
            return this.thingArrays;
        };
        /**
         * @returns The canvas element each Thing is to drawn on.
         */
        PixelDrawr.prototype.getCanvas = function () {
            return this.canvas;
        };
        /**
         * @returns The 2D canvas context associated with the canvas.
         */
        PixelDrawr.prototype.getContext = function () {
            return this.context;
        };
        /**
         * @returns The canvas element used for the background.
         */
        PixelDrawr.prototype.getBackgroundCanvas = function () {
            return this.backgroundCanvas;
        };
        /**
         * @returns The 2D canvas context associated with the background canvas.
         */
        PixelDrawr.prototype.getBackgroundContext = function () {
            return this.backgroundContext;
        };
        /**
         * @returns Whether refills should skip redrawing the background each time.
         */
        PixelDrawr.prototype.getNoRefill = function () {
            return this.noRefill;
        };
        /**
         * @returns The minimum opacity that will be drawn.
         */
        PixelDrawr.prototype.getEpsilon = function () {
            return this.epsilon;
        };
        /* Simple sets
        */
        /**
         * @param framerateSkip   How often refill calls should be skipped.
         */
        PixelDrawr.prototype.setFramerateSkip = function (framerateSkip) {
            this.framerateSkip = framerateSkip;
        };
        /**
         * @param thingArrays   The Arrays to be redrawn during refill calls.
         */
        PixelDrawr.prototype.setThingArrays = function (thingArrays) {
            this.thingArrays = thingArrays;
        };
        /**
         * Sets the currently drawn canvas and context, and recreates
         * drawThingOnContextBound.
         *
         * @param canvas   The new primary canvas to be used.
         */
        PixelDrawr.prototype.setCanvas = function (canvas) {
            this.canvas = canvas;
            this.context = canvas.getContext("2d");
        };
        /**
         * @param noRefill   Whether refills should now skip redrawing the
         *                   background each time.
         */
        PixelDrawr.prototype.setNoRefill = function (noRefill) {
            this.noRefill = noRefill;
        };
        /**
         * @param epsilon   The minimum opacity that will be drawn.
         */
        PixelDrawr.prototype.setEpsilon = function (epsilon) {
            this.epsilon = epsilon;
        };
        /* Background manipulations
        */
        /**
         * Creates a new canvas the size of MapScreener and sets the background
         * canvas to it, then recreates backgroundContext.
         */
        PixelDrawr.prototype.resetBackground = function () {
            this.backgroundCanvas = this.createCanvas(this.MapScreener[this.keyWidth], this.MapScreener[this.keyHeight]);
            this.backgroundContext = this.backgroundCanvas.getContext("2d");
        };
        /**
         * Refills the background canvas with a new fillStyle.
         *
         * @param fillStyle   The new fillStyle for the background context.
         */
        PixelDrawr.prototype.setBackground = function (fillStyle) {
            this.backgroundContext.fillStyle = fillStyle;
            this.backgroundContext.fillRect(0, 0, this.MapScreener[this.keyWidth], this.MapScreener[this.keyHeight]);
        };
        /**
         * Draws the background canvas onto the main canvas' context.
         */
        PixelDrawr.prototype.drawBackground = function () {
            this.context.drawImage(this.backgroundCanvas, 0, 0);
        };
        /* Core rendering
        */
        /**
         * Goes through all the motions of finding and parsing a Thing's sprite.
         * This should be called whenever the sprite's appearance changes.
         *
         * @param thing   A Thing whose sprite must be updated.
         */
        PixelDrawr.prototype.setThingSprite = function (thing) {
            // If it's set as hidden, don't bother updating it
            if (thing.hidden) {
                return;
            }
            // PixelRender does most of the work in fetching the rendered sprite
            thing.sprite = this.PixelRender.decode(this.generateObjectKey(thing), thing);
            // To do: remove dependency on .numSprites
            // For now, it's used to know whether it's had its sprite set, but 
            // wouldn't physically having a .sprite do that?
            if (thing.sprite.constructor === PixelRendr.SpriteMultiple) {
                thing.numSprites = 0;
                this.refillThingCanvasMultiple(thing);
            }
            else {
                thing.numSprites = 1;
                this.refillThingCanvasSingle(thing);
            }
        };
        /* Core drawing APIs
        */
        /**
         * Called every upkeep to refill the entire main canvas. All Thing arrays
         * are made to call this.refillThingArray in order.
         */
        PixelDrawr.prototype.refillGlobalCanvas = function () {
            this.framesDrawn += 1;
            if (this.framesDrawn % this.framerateSkip !== 0) {
                return;
            }
            if (!this.noRefill) {
                this.drawBackground();
            }
            for (var i = 0; i < this.thingArrays.length; i += 1) {
                this.refillThingArray(this.thingArrays[i]);
            }
        };
        /**
         * Calls drawThingOnContext on each Thing in the Array.
         *
         * @param array   A listing of Things to be drawn onto the canvas.
         */
        PixelDrawr.prototype.refillThingArray = function (array) {
            for (var i = 0; i < array.length; i += 1) {
                this.drawThingOnContext(this.context, array[i]);
            }
        };
        /**
         * General Function to draw a Thing onto a context. This will call
         * drawThingOnContext[Single/Multiple] with more arguments
         *
         * @param context   The context to have the Thing drawn on it.
         * @param thing   The Thing to be drawn onto the context.
         */
        PixelDrawr.prototype.drawThingOnContext = function (context, thing) {
            if (thing.hidden
                || thing.opacity < this.epsilon
                || thing[this.keyHeight] < 1
                || thing[this.keyWidth] < 1
                || this.getTop(thing) > this.MapScreener[this.keyHeight]
                || this.getRight(thing) < 0
                || this.getBottom(thing) < 0
                || this.getLeft(thing) > this.MapScreener[this.keyWidth]) {
                return;
            }
            // If Thing hasn't had a sprite yet (previously hidden), do that first
            if (typeof thing.numSprites === "undefined") {
                this.setThingSprite(thing);
            }
            // Whether or not the thing has a regular sprite or a SpriteMultiple, 
            // that sprite has already been drawn to the thing's canvas, unless it's
            // above the cutoff, in which case that logic happens now.
            if (thing.canvas[this.keyWidth] > 0) {
                this.drawThingOnContextSingle(context, thing.canvas, thing, this.getLeft(thing), this.getTop(thing));
            }
            else {
                this.drawThingOnContextMultiple(context, thing.canvases, thing, this.getLeft(thing), this.getTop(thing));
            }
        };
        /* Core drawing internals
        */
        /**
         * Simply draws a thing's sprite to its canvas by getting and setting
         * a canvas::imageData object via context.getImageData(...).
         *
         * @param thing   A Thing whose canvas must be updated.
         */
        PixelDrawr.prototype.refillThingCanvasSingle = function (thing) {
            // Don't draw small Things.
            if (thing[this.keyWidth] < 1 || thing[this.keyHeight] < 1) {
                return;
            }
            // Retrieve the imageData from the Thing's canvas & renderingContext
            var canvas = thing.canvas, context = thing.context, imageData = context.getImageData(0, 0, canvas[this.keyWidth], canvas[this.keyHeight]);
            // Copy the thing's sprite to that imageData and into the contextz
            this.PixelRender.memcpyU8(thing.sprite, imageData.data);
            context.putImageData(imageData, 0, 0);
        };
        /**
         * For SpriteMultiples, this copies the sprite information for each
         * sub-sprite into its own canvas, sets thing.sprites, then draws the newly
         * rendered information onto the thing's canvas.
         *
         * @param thing   A Thing whose canvas and sprites must be updated.
         */
        PixelDrawr.prototype.refillThingCanvasMultiple = function (thing) {
            if (thing[this.keyWidth] < 1 || thing[this.keyHeight] < 1) {
                return;
            }
            var spritesRaw = thing.sprite, canvases = thing.canvases = {
                "direction": spritesRaw.direction,
                "multiple": true
            }, canvas, context, imageData, i;
            thing.numSprites = 1;
            for (i in spritesRaw.sprites) {
                if (!spritesRaw.sprites.hasOwnProperty(i)) {
                    continue;
                }
                // Make a new sprite for this individual component
                canvas = this.createCanvas(thing.spritewidth * this.unitsize, thing.spriteheight * this.unitsize);
                context = canvas.getContext("2d");
                // Copy over this sprite's information the same way as refillThingCanvas
                imageData = context.getImageData(0, 0, canvas[this.keyWidth], canvas[this.keyHeight]);
                this.PixelRender.memcpyU8(spritesRaw.sprites[i], imageData.data);
                context.putImageData(imageData, 0, 0);
                // Record the canvas and context in thing.sprites
                canvases[i] = {
                    "canvas": canvas,
                    "context": context
                };
                thing.numSprites += 1;
            }
            // Only pre-render multiple sprites if they're below the cutoff
            if (thing[this.keyWidth] * thing[this.keyHeight] < this.spriteCacheCutoff) {
                thing.canvas[this.keyWidth] = thing[this.keyWidth] * this.unitsize;
                thing.canvas[this.keyHeight] = thing[this.keyHeight] * this.unitsize;
                this.drawThingOnContextMultiple(thing.context, thing.canvases, thing, 0, 0);
            }
            else {
                thing.canvas[this.keyWidth] = thing.canvas[this.keyHeight] = 0;
            }
        };
        /**
         * Draws a Thing's single canvas onto a context, commonly called by
         * this.drawThingOnContext.
         *
         * @param context    The context being drawn on.
         * @param canvas   The Thing's canvas being drawn onto the context.
         * @param thing   The Thing whose canvas is being drawn.
         * @param left   The x-position to draw the Thing from.
         * @param top   The y-position to draw the Thing from.
         */
        PixelDrawr.prototype.drawThingOnContextSingle = function (context, canvas, thing, left, top) {
            // If the sprite should repeat, use the pattern equivalent
            if (thing.repeat) {
                this.drawPatternOnContext(context, canvas, left, top, thing.unitwidth, thing.unitheight, thing.opacity || 1);
            }
            else if (thing.opacity !== 1) {
                // Opacities not equal to one must reset the context afterwards
                context.globalAlpha = thing.opacity;
                context.drawImage(canvas, left, top, canvas.width * thing.scale, canvas.height * thing.scale);
                context.globalAlpha = 1;
            }
            else {
                context.drawImage(canvas, left, top, canvas.width * thing.scale, canvas.height * thing.scale);
            }
        };
        /**
         * Draws a Thing's multiple canvases onto a context, typicall called by
         * drawThingOnContext. A variety of cases for canvases is allowed:
         * "vertical", "horizontal", and "corners".
         *
         * @param context    The context being drawn on.
         * @param canvases   The canvases being drawn onto the context.
         * @param thing   The Thing whose canvas is being drawn.
         * @param left   The x-position to draw the Thing from.
         * @param top   The y-position to draw the Thing from.
         */
        PixelDrawr.prototype.drawThingOnContextMultiple = function (context, canvases, thing, left, top) {
            var sprite = thing.sprite, topreal = top, leftreal = left, rightreal = left + thing.unitwidth, bottomreal = top + thing.unitheight, widthreal = thing.unitwidth, heightreal = thing.unitheight, spritewidthpixels = thing.spritewidthpixels, spriteheightpixels = thing.spriteheightpixels, widthdrawn = Math.min(widthreal, spritewidthpixels), heightdrawn = Math.min(heightreal, spriteheightpixels), opacity = thing.opacity, diffhoriz, diffvert, canvasref;
            switch (canvases.direction) {
                // Vertical sprites may have "top", "bottom", "middle"
                case "vertical":
                    // If there's a bottom, draw that and push up bottomreal
                    if ((canvasref = canvases[this.keyBottom])) {
                        diffvert = sprite.bottomheight ? sprite.bottomheight * this.unitsize : spriteheightpixels;
                        this.drawPatternOnContext(context, canvasref.canvas, leftreal, bottomreal - diffvert, widthreal, heightdrawn, opacity);
                        bottomreal -= diffvert;
                        heightreal -= diffvert;
                    }
                    // If there's a top, draw that and push down topreal
                    if ((canvasref = canvases[this.keyTop])) {
                        diffvert = sprite.topheight ? sprite.topheight * this.unitsize : spriteheightpixels;
                        this.drawPatternOnContext(context, canvasref.canvas, leftreal, topreal, widthreal, heightdrawn, opacity);
                        topreal += diffvert;
                        heightreal -= diffvert;
                    }
                    break;
                // Horizontal sprites may have "left", "right", "middle"
                case "horizontal":
                    // If there's a left, draw that and push forward leftreal
                    if ((canvasref = canvases[this.keyLeft])) {
                        diffhoriz = sprite.leftwidth ? sprite.leftwidth * this.unitsize : spritewidthpixels;
                        this.drawPatternOnContext(context, canvasref.canvas, leftreal, topreal, widthdrawn, heightreal, opacity);
                        leftreal += diffhoriz;
                        widthreal -= diffhoriz;
                    }
                    // If there's a right, draw that and push back rightreal
                    if ((canvasref = canvases[this.keyRight])) {
                        diffhoriz = sprite.rightwidth ? sprite.rightwidth * this.unitsize : spritewidthpixels;
                        this.drawPatternOnContext(context, canvasref.canvas, rightreal - diffhoriz, topreal, widthdrawn, heightreal, opacity);
                        rightreal -= diffhoriz;
                        widthreal -= diffhoriz;
                    }
                    break;
                // Corner (vertical + horizontal + corner) sprites must have corners
                // in "topRight", "bottomRight", "bottomLeft", and "topLeft".
                case "corners":
                    // topLeft, left, bottomLeft
                    diffvert = sprite.topheight ? sprite.topheight * this.unitsize : spriteheightpixels;
                    diffhoriz = sprite.leftwidth ? sprite.leftwidth * this.unitsize : spritewidthpixels;
                    this.drawPatternOnContext(context, canvases.topLeft.canvas, leftreal, topreal, widthdrawn, heightdrawn, opacity);
                    this.drawPatternOnContext(context, canvases[this.keyLeft].canvas, leftreal, topreal + diffvert, widthdrawn, heightreal - diffvert * 2, opacity);
                    this.drawPatternOnContext(context, canvases.bottomLeft.canvas, leftreal, bottomreal - diffvert, widthdrawn, heightdrawn, opacity);
                    leftreal += diffhoriz;
                    widthreal -= diffhoriz;
                    // top, topRight
                    diffhoriz = sprite.rightwidth ? sprite.rightwidth * this.unitsize : spritewidthpixels;
                    this.drawPatternOnContext(context, canvases[this.keyTop].canvas, leftreal, topreal, widthreal - diffhoriz, heightdrawn, opacity);
                    this.drawPatternOnContext(context, canvases.topRight.canvas, rightreal - diffhoriz, topreal, widthdrawn, heightdrawn, opacity);
                    topreal += diffvert;
                    heightreal -= diffvert;
                    // right, bottomRight, bottom
                    diffvert = sprite.bottomheight ? sprite.bottomheight * this.unitsize : spriteheightpixels;
                    this.drawPatternOnContext(context, canvases[this.keyRight].canvas, rightreal - diffhoriz, topreal, widthdrawn, heightreal - diffvert, opacity);
                    this.drawPatternOnContext(context, canvases.bottomRight.canvas, rightreal - diffhoriz, bottomreal - diffvert, widthdrawn, heightdrawn, opacity);
                    this.drawPatternOnContext(context, canvases[this.keyBottom].canvas, leftreal, bottomreal - diffvert, widthreal - diffhoriz, heightdrawn, opacity);
                    rightreal -= diffhoriz;
                    widthreal -= diffhoriz;
                    bottomreal -= diffvert;
                    heightreal -= diffvert;
                    break;
                default:
                    throw new Error("Unknown or missing direction given in SpriteMultiple.");
            }
            // If there's still room, draw the actual canvas
            if ((canvasref = canvases.middle) && topreal < bottomreal && leftreal < rightreal) {
                if (sprite.middleStretch) {
                    context.globalAlpha = opacity;
                    context.drawImage(canvasref.canvas, leftreal, topreal, widthreal, heightreal);
                    context.globalAlpha = 1;
                }
                else {
                    this.drawPatternOnContext(context, canvasref.canvas, leftreal, topreal, widthreal, heightreal, opacity);
                }
            }
        };
        /* Position utilities (which should almost always be optimized)
        */
        /**
         * @param thing   Any Thing.
         * @returns The Thing's top position, accounting for vertical offset if needed.
         */
        PixelDrawr.prototype.getTop = function (thing) {
            if (this.keyOffsetY) {
                return thing[this.keyTop] + thing[this.keyOffsetY];
            }
            else {
                return thing[this.keyTop];
            }
        };
        /**
         * @param thing   Any Thing.
         * @returns The Thing's right position, accounting for horizontal offset if needed.
         */
        PixelDrawr.prototype.getRight = function (thing) {
            if (this.keyOffsetX) {
                return thing[this.keyRight] + thing[this.keyOffsetX];
            }
            else {
                return thing[this.keyRight];
            }
        };
        /**
         * @param thing   Any Thing.
         * @returns {Number} The Thing's bottom position, accounting for vertical
         *                  offset if needed.
         */
        PixelDrawr.prototype.getBottom = function (thing) {
            if (this.keyOffsetX) {
                return thing[this.keyBottom] + thing[this.keyOffsetY];
            }
            else {
                return thing[this.keyBottom];
            }
        };
        /**
         * @param thing   Any Thing.
         * @returns The Thing's left position, accounting for horizontal offset if needed.
         */
        PixelDrawr.prototype.getLeft = function (thing) {
            if (this.keyOffsetX) {
                return thing[this.keyLeft] + thing[this.keyOffsetX];
            }
            else {
                return thing[this.keyLeft];
            }
        };
        /* Utilities
        */
        /**
         * Draws a source pattern onto a context. The pattern is clipped to the size
         * of MapScreener.
         *
         * @param context   The context the pattern will be drawn onto.
         * @param source   The image being repeated as a pattern. This can be a canvas,
         *                 an image, or similar.
         * @param left   The x-location to draw from.
         * @param top   The y-location to draw from.
         * @param width   How many pixels wide the drawing area should be.
         * @param left   How many pixels high the drawing area should be.
         * @param opacity   How transparent the drawing is, in [0,1].
         */
        PixelDrawr.prototype.drawPatternOnContext = function (context, source, left, top, width, height, opacity) {
            context.globalAlpha = opacity;
            context.translate(left, top);
            context.fillStyle = context.createPattern(source, "repeat");
            context.fillRect(0, 0, 
            // Math.max(width, left - MapScreener[keyRight]),
            // Math.max(height, top - MapScreener[keyBottom])
            width, height);
            context.translate(-left, -top);
            context.globalAlpha = 1;
        };
        return PixelDrawr;
    })();
    PixelDrawr_1.PixelDrawr = PixelDrawr;
})(PixelDrawr || (PixelDrawr = {}));
