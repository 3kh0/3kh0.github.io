/// <reference path="ChangeLinr-0.2.0.ts" />
/// <reference path="ObjectMakr-0.2.2.ts" />
/// <reference path="PixelRendr-0.2.0.ts" />
/// <reference path="QuadsKeepr-0.2.1.ts" />
/// <reference path="StringFilr-0.2.1.ts" />

declare namespace PixelDrawr {
    /**
     * Boundaries of a drawing area, commonly fulfilled by an IMapScreenr.
     */
    export interface IScreenBoundaries {
        /**
         * The top boundary of the screen.
         */
        top: number;

        /**
         * The right boundary of the screen.
         */
        right: number;

        /**
         * The bottom boundary of the screen.
         */
        bottom: number;

        /**
         * The left boundary of the screen.
         */
        left: number;
    }

    /**
     * For Things with multiple sprites, the various sprite component canvases.
     */
    export interface IThingCanvases {
        /**
         * What direction to draw in, as "vertical", "horizontal", or "corners".
         */
        direction: string;

        /**
         * Whether this is a multiple sprite (always true).
         */
        multiple: boolean;

        /**
         * A middle canvas to draw, if applicable.
         */
        middle?: IThingSubCanvas;

        /**
         * A middle canvas to draw, if applicable.
         */
        top?: IThingSubCanvas;

        /**
         * A right canvas to draw, if applicable.
         */
        right?: IThingSubCanvas;

        /**
         * A bottom canvas to draw, if applicable.
         */
        bottom?: IThingSubCanvas;

        /**
         * A left canvas to draw, if applicable.
         */
        left?: IThingSubCanvas;

        /**
         * A top-right canvas to draw, if applicable.
         */
        topRight?: IThingSubCanvas;

        /**
         * A bottom-right canvas to draw, if applicable.
         */
        bottomRight?: IThingSubCanvas;

        /**
         * A bottom-left canvas to draw, if applicable.
         */
        bottomLeft?: IThingSubCanvas;

        /**
         * A top-left canvas to draw, if applicable.
         */
        topLeft?: IThingSubCanvas;
    }

    /**
     * A simple summary of canvas information.
     */
    export interface IThingSubCanvas {
        /**
         * A source or destination.
         */
        canvas: HTMLCanvasElement;

        /**
         * The 2D context of the canvas.
         */
        context: CanvasRenderingContext2D;
    }

    /**
     * Collected information about a sprite that must be drawn.
     */
    export interface IThing {
        /**
         * The sprite for this Thing to have drawn.
         */
        sprite: Uint8ClampedArray | PixelRendr.ISpriteMultiple;

        /**
         * The canvas upon which the Thing's sprite is to be drawn.
         */
        canvas: HTMLCanvasElement;

        /**
         * For Things with multiple sprites, the various sprite component canvases.
         */
        canvases?: IThingCanvases;

        /**
         * The rendering context used to draw the Thing's sprite on its canvas.
         */
        context: CanvasRenderingContext2D;

        /**
         * Whether this shouldn't be drawn (is completely hidden).
         */
        hidden: boolean;

        /**
         * How transparent this is, in [0, 1].
         */
        opacity: number;

        /**
         * How many sprites this has (1 for regular, 0 or >1 for multiple).
         */
        numSprites?: number;

        /**
         * Whether the Thing's sprite should repeat across large canvases.
         */
        repeat?: boolean;

        /**
         * How much to expand the Thing's sprite size (by default, 1 for not at all).
         */
        scale?: number;

        /**
         * Width in game pixels, equal to width * unitsize.
         */
        unitwidth?: number;

        /**
         * Height in game pixels, equal to height * unitsize.
         */
        unitheight?: number;

        /**
         * How many pixels wide the output sprite should be.
         */
        spritewidth: number;

        /**
         * How many pixels high the output sprite should be.
         */
        spriteheight: number;

        /**
         * Sprite width in real-life pixels, equal to spritewidth * scale.
         */
        spritewidthpixels?: number;

        /**
         * Sprite height in real-life pixels, equal to spritewidth * scale.
         */
        spriteheightpixels?: number;
    }

    /**
     * Settings to initialize a new IPixelDrawr.
     */
    export interface IPixelDrawrSettings {
        /**
         * The PixelRendr used for sprite lookups and generation.
         */
        PixelRender: PixelRendr.IPixelRendr;

        /**
         * The bounds of the screen for bounds checking (typically a MapScreenr).
         */
        MapScreener: IScreenBoundaries;

        /**
         * A Function to create a canvas of a given width and height.
         */
        createCanvas: (width: number, height: number) => HTMLCanvasElement;

        /**
         * How much to scale canvases on creation (by default, 1 for not at all).
         */
        unitsize?: number;

        /**
         * Whether refills should skip redrawing the background each time.
         */
        noRefill?: boolean;

        /**
         * The maximum size of a SpriteMultiple to pre-render (by default, 0 for
         * never pre-rendering).
         */
        spriteCacheCutoff?: number;

        /**
         * The names of groups to refill (only used if using Quadrant refilling).
         */
        groupNames?: string[];

        /**
         * How often to draw frames (by default, 1 for every time).
         */
        framerateSkip?: number;

        /**
         * How to generat ekeys to retrieve sprites from the PixelRendr (by default,
         * Object.toString).
         */
        generateObjectKey?: (thing: IThing) => string;

        /**
         * An arbitrarily small minimum opacity for a Thing to be considered not
         * completely transparent (by default, .007).
         */
        epsilon?: number;

        /**
         * The attribute name for a Thing's width (by default, "width").
         */
        keyWidth?: string;

        /**
         * The attribute name for a Thing's height (by default, "height").
         */
        keyHeight?: string;

        /**
         * The attribute name for a Thing's top (by default, "top").
         */
        keyTop?: string;

        /**
         * The attribute name for a Thing's right (by default, "right").
         */
        keyRight?: string;

        /**
         * The attribute name for a Thing's bottom (by default, "bottom").
         */
        keyBottom?: string;

        /**
         * The attribute name for a Thing's left (by default, "left").
         */
        keyLeft?: string;

        /**
         * The attribute name for a Thing's horizontal offest (by default, ignored).
         */
        keyOffsetX?: string;

        /**
         * The attribute name for a Thing's vertical offset (by default, ignored).
         */
        keyOffsetY?: string;
    }

    /**
     * A front-end to PixelRendr to automate drawing mass amounts of sprites.
     */
    export interface IPixelDrawr {
        /**
         * @returns How often refill calls should be skipped.
         */
        getFramerateSkip(): number;

        /**
         * @returns The Arrays to be redrawn during refill calls.
         */
        getThingArray(): IThing[][];

        /**
         * @returns The canvas element each Thing is to drawn on.
         */
        getCanvas(): HTMLCanvasElement;

        /**
         * @returns The 2D canvas context associated with the canvas.
         */
        getContext(): CanvasRenderingContext2D;

        /**
         * @returns The canvas element used for the background.
         */
        getBackgroundCanvas(): HTMLCanvasElement;

        /**
         * @returns The 2D canvas context associated with the background canvas.
         */
        getBackgroundContext(): CanvasRenderingContext2D;

        /**
         * @returns Whether refills should skip redrawing the background each time.
         */
        getNoRefill(): boolean;

        /**
         * @returns The minimum opacity that will be drawn.
         */
        getEpsilon(): number;

        /**
         * @param framerateSkip   How often refill calls should be skipped.
         */
        setFramerateSkip(framerateSkip: number): void;

        /**
         * @param thingArrays   The Arrays to be redrawn during refill calls.
         */
        setThingArrays(thingArrays: IThing[][]): void;

        /**
         * Sets the currently drawn canvas and context, and recreates 
         * drawThingOnContextBound.
         * 
         * @param canvas   The new primary canvas to be used.
         */
        setCanvas(canvas: HTMLCanvasElement): void;

        /**
         * @param noRefill   Whether refills should now skip redrawing the
         *                   background each time. 
         */
        setNoRefill(noRefill: boolean): void;

        /**
         * @param epsilon   The minimum opacity that will be drawn.
         */
        setEpsilon(epsilon: number): void;

        /**
         * Creates a new canvas the size of MapScreener and sets the background
         * canvas to it, then recreates backgroundContext.
         */
        resetBackground(): void;

        /**
         * Refills the background canvas with a new fillStyle.
         * 
         * @param fillStyle   The new fillStyle for the background context.
         */
        setBackground(fillStyle: any): void;

        /**
         * Draws the background canvas onto the main canvas' context.
         */
        drawBackground(): void;

        /**
         * Goes through all the motions of finding and parsing a Thing's sprite.
         * This should be called whenever the sprite's appearance changes.
         * 
         * @param thing   A Thing whose sprite must be updated.
         */
        setThingSprite(thing: IThing): void;

        /**
         * Called every upkeep to refill the entire main canvas. All Thing arrays
         * are made to call this.refillThingArray in order.
         */
        refillGlobalCanvas(): void;

        /**
         * Calls drawThingOnContext on each Thing in the Array.
         * 
         * @param array   A listing of Things to be drawn onto the canvas.
         */
        refillThingArray(array: IThing[]): void;

        /**
         * General Function to draw a Thing onto a context. This will call
         * drawThingOnContext[Single/Multiple] with more arguments
         * 
         * @param context   The context to have the Thing drawn on it.
         * @param thing   The Thing to be drawn onto the context.
         */
        drawThingOnContext(context: CanvasRenderingContext2D, thing: IThing): void;
    }
}


namespace PixelDrawr {
    "use strict";

    /**
     * A front-end to PixelRendr to automate drawing mass amounts of sprites.
     */
    export class PixelDrawr implements IPixelDrawr {
        /**
         * A PixelRendr used to obtain raw sprite data and canvases.
         */
        private PixelRender: PixelRendr.IPixelRendr;

        /**
         * The bounds of the screen for bounds checking (often a MapScreenr).
         */
        private MapScreener: IScreenBoundaries;

        /**
         * The canvas element each Thing is to be drawn on.
         */
        private canvas: HTMLCanvasElement;

        /**
         * The 2D canvas context associated with the canvas.
         */
        private context: CanvasRenderingContext2D;

        /**
         * A separate canvas that keeps the background of the scene.
         */
        private backgroundCanvas: HTMLCanvasElement;

        /**
         * The 2D canvas context associated with the background canvas.
         */
        private backgroundContext: CanvasRenderingContext2D;

        /**
         * Arrays of Thing[]s that are to be drawn in each refill.
         */
        private thingArrays: IThing[][];

        /**
         * Utility Function to create a canvas.
         */
        private createCanvas: (width: number, height: number) => HTMLCanvasElement;

        /**
         * How much to scale canvases on creation.
         */
        private unitsize: number;

        /**
         * Utility Function to generate a class key for a Thing.
         */
        private generateObjectKey: (thing: IThing) => string;

        /**
         * The maximum size of a SpriteMultiple to pre-render.
         */
        private spriteCacheCutoff: number;

        /**
         * Whether refills should skip redrawing the background each time.
         */
        private noRefill: boolean;

        /**
         * For refillQuadrant, an Array of String names to refill (bottom-to-top).
         */
        private groupNames: string[];

        /**
         * How often the screen redraws (1 for always, 2 for every other call, etc).
         */
        private framerateSkip: number;

        /**
         * How many frames have been drawn so far.
         */
        private framesDrawn: number;

        /**
         * An arbitrarily small minimum for opacity to be completely transparent.
         */
        private epsilon: number;

        /**
         * String key under which Things store their height.
         */
        private keyHeight: string;

        /**
         * String key under which Things store their width.
         */
        private keyWidth: string;

        /**
         * String key under which Things store their top.
         */
        private keyTop: string;

        /**
         * String key under which Things store their right.
         */
        private keyRight: string;

        /**
         * String key under which Things store their bottom.
         */
        private keyBottom: string;

        /**
         * String key under which Things store their left.
         */
        private keyLeft: string;

        /**
         * String key under which Things store their horizontal offset.
         */
        private keyOffsetX: string;

        /**
         * String key under which Things store their vertical offset.
         */
        private keyOffsetY: string;

        /**
         * Initializes a new instance of the PixelDrawr class.
         * 
         * @param settings   Settings to be used for initialization.
         */
        constructor(settings: IPixelDrawrSettings) {
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

            this.generateObjectKey = settings.generateObjectKey || function (thing: IThing): string {
                return thing.toString();
            };

            this.resetBackground();
        }


        /* Simple gets
        */

        /**
         * @returns How often refill calls should be skipped.
         */
        getFramerateSkip(): number {
            return this.framerateSkip;
        }

        /**
         * @returns The Arrays to be redrawn during refill calls.
         */
        getThingArray(): IThing[][] {
            return this.thingArrays;
        }

        /**
         * @returns The canvas element each Thing is to drawn on.
         */
        getCanvas(): HTMLCanvasElement {
            return this.canvas;
        }

        /**
         * @returns The 2D canvas context associated with the canvas.
         */
        getContext(): CanvasRenderingContext2D {
            return this.context;
        }

        /**
         * @returns The canvas element used for the background.
         */
        getBackgroundCanvas(): HTMLCanvasElement {
            return this.backgroundCanvas;
        }

        /**
         * @returns The 2D canvas context associated with the background canvas.
         */
        getBackgroundContext(): CanvasRenderingContext2D {
            return this.backgroundContext;
        }

        /**
         * @returns Whether refills should skip redrawing the background each time.
         */
        getNoRefill(): boolean {
            return this.noRefill;
        }

        /**
         * @returns The minimum opacity that will be drawn.
         */
        getEpsilon(): number {
            return this.epsilon;
        }


        /* Simple sets
        */

        /**
         * @param framerateSkip   How often refill calls should be skipped.
         */
        setFramerateSkip(framerateSkip: number): void {
            this.framerateSkip = framerateSkip;
        }

        /**
         * @param thingArrays   The Arrays to be redrawn during refill calls.
         */
        setThingArrays(thingArrays: IThing[][]): void {
            this.thingArrays = thingArrays;
        }

        /**
         * Sets the currently drawn canvas and context, and recreates 
         * drawThingOnContextBound.
         * 
         * @param canvas   The new primary canvas to be used.
         */
        setCanvas(canvas: HTMLCanvasElement): void {
            this.canvas = canvas;
            this.context = <CanvasRenderingContext2D>canvas.getContext("2d");
        }

        /**
         * @param noRefill   Whether refills should now skip redrawing the
         *                   background each time. 
         */
        setNoRefill(noRefill: boolean): void {
            this.noRefill = noRefill;
        }

        /**
         * @param epsilon   The minimum opacity that will be drawn.
         */
        setEpsilon(epsilon: number): void {
            this.epsilon = epsilon;
        }


        /* Background manipulations
        */

        /**
         * Creates a new canvas the size of MapScreener and sets the background
         * canvas to it, then recreates backgroundContext.
         */
        resetBackground(): void {
            this.backgroundCanvas = this.createCanvas(this.MapScreener[this.keyWidth], this.MapScreener[this.keyHeight]);
            this.backgroundContext = <CanvasRenderingContext2D>this.backgroundCanvas.getContext("2d");
        }

        /**
         * Refills the background canvas with a new fillStyle.
         * 
         * @param fillStyle   The new fillStyle for the background context.
         */
        setBackground(fillStyle: any): void {
            this.backgroundContext.fillStyle = fillStyle;
            this.backgroundContext.fillRect(0, 0, this.MapScreener[this.keyWidth], this.MapScreener[this.keyHeight]);
        }

        /**
         * Draws the background canvas onto the main canvas' context.
         */
        drawBackground(): void {
            this.context.drawImage(this.backgroundCanvas, 0, 0);
        }


        /* Core rendering
        */

        /**
         * Goes through all the motions of finding and parsing a Thing's sprite.
         * This should be called whenever the sprite's appearance changes.
         * 
         * @param thing   A Thing whose sprite must be updated.
         */
        setThingSprite(thing: IThing): void {
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
            } else {
                thing.numSprites = 1;
                this.refillThingCanvasSingle(thing);
            }
        }


        /* Core drawing APIs
        */

        /**
         * Called every upkeep to refill the entire main canvas. All Thing arrays
         * are made to call this.refillThingArray in order.
         */
        refillGlobalCanvas(): void {
            this.framesDrawn += 1;
            if (this.framesDrawn % this.framerateSkip !== 0) {
                return;
            }

            if (!this.noRefill) {
                this.drawBackground();
            }

            for (var i: number = 0; i < this.thingArrays.length; i += 1) {
                this.refillThingArray(this.thingArrays[i]);
            }
        }

        /**
         * Calls drawThingOnContext on each Thing in the Array.
         * 
         * @param array   A listing of Things to be drawn onto the canvas.
         */
        refillThingArray(array: IThing[]): void {
            for (var i: number = 0; i < array.length; i += 1) {
                this.drawThingOnContext(this.context, array[i]);
            }
        }

        /**
         * General Function to draw a Thing onto a context. This will call
         * drawThingOnContext[Single/Multiple] with more arguments
         * 
         * @param context   The context to have the Thing drawn on it.
         * @param thing   The Thing to be drawn onto the context.
         */
        drawThingOnContext(context: CanvasRenderingContext2D, thing: IThing): void {
            if (
                thing.hidden
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
            } else {
                this.drawThingOnContextMultiple(context, thing.canvases, thing, this.getLeft(thing), this.getTop(thing));
            }
        }


        /* Core drawing internals
        */

        /**
         * Simply draws a thing's sprite to its canvas by getting and setting
         * a canvas::imageData object via context.getImageData(...).
         * 
         * @param thing   A Thing whose canvas must be updated.
         */
        private refillThingCanvasSingle(thing: IThing): void {
            // Don't draw small Things.
            if (<any>thing[this.keyWidth] < 1 || <any>thing[this.keyHeight] < 1) {
                return;
            }

            // Retrieve the imageData from the Thing's canvas & renderingContext
            var canvas: HTMLCanvasElement = thing.canvas,
                context: CanvasRenderingContext2D = thing.context,
                imageData: ImageData = context.getImageData(0, 0, canvas[this.keyWidth], canvas[this.keyHeight]);

            // Copy the thing's sprite to that imageData and into the contextz
            this.PixelRender.memcpyU8(<Uint8ClampedArray>thing.sprite, imageData.data);
            context.putImageData(imageData, 0, 0);
        }

        /**
         * For SpriteMultiples, this copies the sprite information for each 
         * sub-sprite into its own canvas, sets thing.sprites, then draws the newly
         * rendered information onto the thing's canvas.
         * 
         * @param thing   A Thing whose canvas and sprites must be updated.
         */
        private refillThingCanvasMultiple(thing: IThing): void {
            if (thing[this.keyWidth] < 1 || thing[this.keyHeight] < 1) {
                return;
            }

            var spritesRaw: PixelRendr.SpriteMultiple = <PixelRendr.SpriteMultiple>thing.sprite,
                canvases: any = thing.canvases = {
                    "direction": spritesRaw.direction,
                    "multiple": true
                },
                canvas: HTMLCanvasElement,
                context: CanvasRenderingContext2D,
                imageData: ImageData,
                i: string;

            thing.numSprites = 1;

            for (i in spritesRaw.sprites) {
                if (!spritesRaw.sprites.hasOwnProperty(i)) {
                    continue;
                }

                // Make a new sprite for this individual component
                canvas = this.createCanvas(thing.spritewidth * this.unitsize, thing.spriteheight * this.unitsize);
                context = <CanvasRenderingContext2D>canvas.getContext("2d");

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
            } else {
                thing.canvas[this.keyWidth] = thing.canvas[this.keyHeight] = 0;
            }
        }

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
        private drawThingOnContextSingle(
            context: CanvasRenderingContext2D,
            canvas: HTMLCanvasElement,
            thing: IThing,
            left: number,
            top: number): void {
            // If the sprite should repeat, use the pattern equivalent
            if (thing.repeat) {
                this.drawPatternOnContext(context, canvas, left, top, thing.unitwidth, thing.unitheight, thing.opacity || 1);
            } else if (thing.opacity !== 1) {
                // Opacities not equal to one must reset the context afterwards
                context.globalAlpha = thing.opacity;
                context.drawImage(canvas, left, top, canvas.width * thing.scale, canvas.height * thing.scale);
                context.globalAlpha = 1;
            } else {
                context.drawImage(canvas, left, top, canvas.width * thing.scale, canvas.height * thing.scale);
            }
        }

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
        private drawThingOnContextMultiple(
            context: CanvasRenderingContext2D,
            canvases: IThingCanvases,
            thing: IThing,
            left: number,
            top: number): void {
            var sprite: PixelRendr.SpriteMultiple = <PixelRendr.SpriteMultiple>thing.sprite,
                topreal: number = top,
                leftreal: number = left,
                rightreal: number = left + thing.unitwidth,
                bottomreal: number = top + thing.unitheight,
                widthreal: number = thing.unitwidth,
                heightreal: number = thing.unitheight,
                spritewidthpixels: number = thing.spritewidthpixels,
                spriteheightpixels: number = thing.spriteheightpixels,
                widthdrawn: number = Math.min(widthreal, spritewidthpixels),
                heightdrawn: number = Math.min(heightreal, spriteheightpixels),
                opacity: number = thing.opacity,
                diffhoriz: number,
                diffvert: number,
                canvasref: IThingSubCanvas;

            switch (canvases.direction) {
                // Vertical sprites may have "top", "bottom", "middle"
                case "vertical":
                    // If there's a bottom, draw that and push up bottomreal
                    if ((canvasref = <IThingSubCanvas>canvases[this.keyBottom])) {
                        diffvert = sprite.bottomheight ? sprite.bottomheight * this.unitsize : spriteheightpixels;
                        this.drawPatternOnContext(
                            context,
                            canvasref.canvas,
                            leftreal,
                            bottomreal - diffvert,
                            widthreal,
                            heightdrawn,
                            opacity);
                        bottomreal -= diffvert;
                        heightreal -= diffvert;
                    }
                    // If there's a top, draw that and push down topreal
                    if ((canvasref = <IThingSubCanvas>canvases[this.keyTop])) {
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
                        this.drawPatternOnContext(
                            context,
                            canvasref.canvas,
                            rightreal - diffhoriz,
                            topreal,
                            widthdrawn,
                            heightreal,
                            opacity);
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
                    this.drawPatternOnContext(
                        context,
                        canvases.topLeft.canvas,
                        leftreal,
                        topreal,
                        widthdrawn,
                        heightdrawn,
                        opacity);
                    this.drawPatternOnContext(
                        context,
                        canvases[this.keyLeft].canvas,
                        leftreal,
                        topreal + diffvert,
                        widthdrawn,
                        heightreal - diffvert * 2,
                        opacity);
                    this.drawPatternOnContext(
                        context,
                        canvases.bottomLeft.canvas,
                        leftreal,
                        bottomreal - diffvert,
                        widthdrawn,
                        heightdrawn,
                        opacity);
                    leftreal += diffhoriz;
                    widthreal -= diffhoriz;

                    // top, topRight
                    diffhoriz = sprite.rightwidth ? sprite.rightwidth * this.unitsize : spritewidthpixels;
                    this.drawPatternOnContext(
                        context,
                        canvases[this.keyTop].canvas,
                        leftreal,
                        topreal,
                        widthreal - diffhoriz,
                        heightdrawn,
                        opacity);
                    this.drawPatternOnContext(
                        context,
                        canvases.topRight.canvas,
                        rightreal - diffhoriz,
                        topreal,
                        widthdrawn,
                        heightdrawn,
                        opacity);
                    topreal += diffvert;
                    heightreal -= diffvert;

                    // right, bottomRight, bottom
                    diffvert = sprite.bottomheight ? sprite.bottomheight * this.unitsize : spriteheightpixels;
                    this.drawPatternOnContext(
                        context,
                        canvases[this.keyRight].canvas,
                        rightreal - diffhoriz,
                        topreal,
                        widthdrawn,
                        heightreal - diffvert,
                        opacity);
                    this.drawPatternOnContext(
                        context,
                        canvases.bottomRight.canvas,
                        rightreal - diffhoriz,
                        bottomreal - diffvert,
                        widthdrawn,
                        heightdrawn,
                        opacity);
                    this.drawPatternOnContext(
                        context,
                        canvases[this.keyBottom].canvas,
                        leftreal,
                        bottomreal - diffvert,
                        widthreal - diffhoriz,
                        heightdrawn,
                        opacity);
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
                } else {
                    this.drawPatternOnContext(context, canvasref.canvas, leftreal, topreal, widthreal, heightreal, opacity);
                }
            }
        }


        /* Position utilities (which should almost always be optimized)
        */

        /**
         * @param thing   Any Thing.
         * @returns The Thing's top position, accounting for vertical offset if needed.
         */
        private getTop(thing: IThing): number {
            if (this.keyOffsetY) {
                return thing[this.keyTop] + thing[this.keyOffsetY];
            } else {
                return thing[this.keyTop];
            }
        }

        /**
         * @param thing   Any Thing.
         * @returns The Thing's right position, accounting for horizontal offset if needed.
         */
        private getRight(thing: IThing): number {
            if (this.keyOffsetX) {
                return thing[this.keyRight] + thing[this.keyOffsetX];
            } else {
                return thing[this.keyRight];
            }
        }

        /**
         * @param thing   Any Thing.
         * @returns {Number} The Thing's bottom position, accounting for vertical
         *                  offset if needed.
         */
        private getBottom(thing: IThing): number {
            if (this.keyOffsetX) {
                return thing[this.keyBottom] + thing[this.keyOffsetY];
            } else {
                return thing[this.keyBottom];
            }
        }

        /**
         * @param thing   Any Thing.
         * @returns The Thing's left position, accounting for horizontal offset if needed.
         */
        private getLeft(thing: IThing): number {
            if (this.keyOffsetX) {
                return thing[this.keyLeft] + thing[this.keyOffsetX];
            } else {
                return thing[this.keyLeft];
            }
        }


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
        private drawPatternOnContext(
            context: CanvasRenderingContext2D,
            source: any,
            left: number,
            top: number,
            width: number,
            height: number,
            opacity: number): void {
            context.globalAlpha = opacity;
            context.translate(left, top);
            context.fillStyle = context.createPattern(source, "repeat");
            context.fillRect(
                0, 0,
                // Math.max(width, left - MapScreener[keyRight]),
                // Math.max(height, top - MapScreener[keyBottom])
                width, height);
            context.translate(-left, -top);
            context.globalAlpha = 1;
        }
    }
}
