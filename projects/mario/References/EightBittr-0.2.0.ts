declare namespace EightBittr {
    /**
     * A basic representation of an in-game Thing. Size, velocity, and position
     * are stored, as well as a reference to the parent IEightBittr.
     */
    export interface IThing {
        /**
         * The parent IEightBittr controlling this Thing.
         */
        EightBitter: IEightBittr;

        /**
         * The top border of this Thing's bounding box.
         */
        top: number;

        /**
         * The top border of this Thing's bounding box.
         */
        right: number;

        /**
         * The top border of this Thing's bounding box.
         */
        bottom: number;

        /**
         * The top border of this Thing's bounding box.
         */
        left: number;

        /**
         * How wide this Thing is.
         */
        width: number;

        /**
         * How tall this Thing is.
         */
        height: number;

        /**
         * How rapidly this is moving horizontally.
         */
        xvel: number;

        /**
         * How rapidly this is moving vertically.
         */
        yvel: number;
    }

    /**
     * Settings to initialize a new instance of the IEightBittr interface.
     */
    export interface IEightBittrSettings {
        /**
         * How much to expand each pixel from raw sizing measurements to in-game.
         */
        unitsize?: number;

        /**
         * A list of member attributes to copy from the source to the IEightBittr.
         */
        constants?: string[];

        /**
         * Where the constants should be copied from, if not the IEightBittr itself.
         */
        constantsSource?: any;
    }

    /**
     * A summary of times for reset Functions and the overall operation.
     */
    export interface IResetTime {
        /**
         * The name of the reset Function called.
         */
        name: string;

        /**
         * The performance.now timestamp of when the reset started.
         */
        timeStart: number;

        /**
         * The performance.now timestamp of when the reset finished.
         */
        timeEnd: number;

        /**
         * Exactly how long it took between timeStart and timeEnd.
         */
        timeTaken: number;
    }

    /**
     * A summary of times for reset Functions and the overall operation.
     */
    export interface IResetTimes {
        /**
         * What order the reset Functions were called.
         */
        order: string[];

        /**
         * The total start, end, and taken times for the reset operation.
         */
        total: IResetTime;

        /**
         * Start, end, and taken times for individual reset Functions, in order.
         */
        times: IResetTime[];
    }

    /**
     * An interface used exclusively as the parent of IGameStartr. IEightBittr
     * contains useful functions for manipulating IThings that are independent of
     * the required GameStartr modules.
     */
    export interface IEightBittr {
        /**
         * How much to expand each pixel from raw sizing measurements to in-game.
         */
        unitsize: number;

        /**
         * Timed result summaries of resetTimed, if it was called.
         */
        resetTimes: EightBittr.IResetTimes;

        /**
         * Resets the EightBittr by calling all of the named reset member Functions
         * on itself.
         * 
         * @param EightBitter
         * @param resets   The ordered Array of reset Functions to be called.
         * @param customs   Additional arguments to pass to all reset Functions.
         */
        reset(EightBitter: IEightBittr, resets: string[], customs?: any): void;

        /**
         * Resets the EightBittr in a timed manner by calling all the named reset
         * member Functions on itself and adding the time (in milliseconds) along 
         * along with the total process time to an Array, which is then returned.
         * 
         * @param EightBitter
         * @param resets   The ordered Array of reset Functions to be called.
         * @param customs   Additional arguments to pass to all reset Functions.
         */
        resetTimed(EightBitter: IEightBittr, resets: string[], customs?: any): void;

        /**
         * Creates and returns a new HTML <canvas> element with no image smoothing.
         * 
         * @param width   How wide the canvas should be.
         * @param height   How tall the canvas should be.
         * @returns A canvas of the given width and height.
         */
        createCanvas(width: number, height: number): HTMLCanvasElement;

        /**
         * Shifts a Thing vertically by changing its top and bottom attributes.
         * 
         * @param thing   The Thing to shift vertically.
         * @param dy   How far to shift the Thing.
         */
        shiftVert(thing: IThing, dy: number): void;

        /**
         * Shifts a Thing horizontally by changing its top and bottom attributes.
         * 
         * @param thing   The Thing to shift horizontally.
         * @param dy   How far to shift the Thing.
         */
        shiftHoriz(thing: IThing, dx: number): void;

        /**
         * Sets the top of a Thing to a set number, changing the bottom based on its
         * height and the EightBittr's unisize.
         * 
         * @param thing   The Thing to shift vertically.
         * @param top   Where the Thing's top should be.
         */
        setTop(thing: IThing, top: number): void;

        /**
         * Sets the right of a Thing to a set number, changing the left based on its
         * width and the EightBittr's unisize.
         * 
         * @param thing   The Thing to shift horizontally.
         * @param top   Where the Thing's right should be.
         */
        setRight(thing: IThing, right: number): void;

        /**
         * Sets the bottom of a Thing to a set number, changing the top based on its
         * height and the EightBittr's unisize.
         * 
         * @param thing   The Thing to shift vertically.
         * @param top   Where the Thing's bottom should be.
         */
        setBottom(thing: IThing, bottom: number): void;

        /**
         * Sets the left of a Thing to a set number, changing the right based on its
         * width and the EightBittr's unisize.
         * 
         * @param thing   The Thing to shift horizontally.
         * @param top   Where the Thing's left should be.
         */
        setLeft(thing: IThing, left: number): void;

        /**
         * Shifts a Thing so that it is horizontally centered on the given x.
         * 
         * @param thing   The Thing to shift horizontally.
         * @param x   Where the Thing's horizontal midpoint should be.
         */
        setMidX(thing: IThing, x: number): void;

        /**
         * Shifts a Thing so that it is vertically centered on the given y.
         * 
         * @param thing   The Thing to shift vertically.
         * @param y   Where the Thing's vertical midpoint should be.
         */
        setMidY(thing: IThing, y: number): void;

        /**
         * Shifts a Thing so that it is centered on the given x and y.
         * 
         * @param thing   The Thing to shift vertically and horizontally.
         * @param x   Where the Thing's horizontal midpoint should be.
         * @param y   Where the Thing's vertical midpoint should be.
         */
        setMid(thing: IThing, x: number, y: number): void;

        /**
         * @param thing
         * @returns The horizontal midpoint of the Thing.
         */
        getMidX(thing: IThing): number;

        /**
         * @param thing
         * @returns The vertical midpoint of the Thing.
         */
        getMidY(thing: IThing): number;

        /**
         * Shifts a Thing so that its midpoint is centered on the midpoint of the
         * other Thing.
         * 
         * @param thing   The Thing to be shifted.
         * @param other   The Thing whose midpoint is referenced.
         */
        setMidObj(thing: IThing, other: IThing): void;

        /**
         * Shifts a Thing so that its horizontal midpoint is centered on the 
         * midpoint of the other Thing.
         * 
         * @param thing   The Thing to be shifted horizontally.
         * @param other   The Thing whose horizontal midpoint is referenced.
         */
        setMidXObj(thing: IThing, other: IThing): void;

        /**
         * Shifts a Thing so that its vertical midpoint is centered on the 
         * midpoint of the other Thing.
         * 
         * @param thing   The Thing to be shifted vertically.
         * @param other   The Thing whose vertical midpoint is referenced.
         */
        setMidYObj(thing: IThing, other: IThing): void;

        /**
         * @param thing
         * @param other
         * @returns Whether the first Thing's midpoint is to the left of the other's.
         */
        objectToLeft(thing: IThing, other: IThing): boolean;

        /**
         * Shifts a Thing's top up, then sets the bottom (similar to a shiftVert and
         * a setTop combined).
         * 
         * @param thing   The Thing to be shifted vertically.
         * @param dy   How far to shift the Thing vertically.
         */
        updateTop(thing: IThing, dy: number): void;

        /**
         * Shifts a Thing's right, then sets the left (similar to a shiftHoriz and a
         * setRight combined).
         * 
         * @param thing   The Thing to be shifted horizontally.
         * @param dx   How far to shift the Thing horizontally.
         */
        updateRight(thing: IThing, dx: number): void;

        /**
         * Shifts a Thing's bottom down, then sets the bottom (similar to a 
         * shiftVert and a setBottom combined).
         * 
         * @param thing   The Thing to be shifted vertically.
         * @param dy   How far to shift the Thing vertically.
         */
        updateBottom(thing: IThing, dy: number): void;

        /**
         * Shifts a Thing's left, then sets the right (similar to a shiftHoriz and a
         * setLeft combined).
         * 
         * @param thing   The Thing to be shifted horizontally.
         * @param dx   How far to shift the Thing horizontally.
         */
        updateLeft(thing: IThing, dx: number): void;

        /**
         * Shifts a Thing toward a target x, but limits the total distance allowed.
         * Distance is computed as from the Thing's horizontal midpoint.
         * 
         * @param thing   The Thing to be shifted horizontally.
         * @param x   How far to shift the Thing horizontally.
         * @param maxDistance   The maximum distance the Thing can be shifted.
         */
        slideToX(thing: IThing, x: number, maxDistance: number): void;

        /**
         * Shifts a Thing toward a target y, but limits the total distance allowed.
         * Distance is computed as from the Thing's vertical midpoint.
         * 
         * @param thing   The Thing to be shifted vertically.
         * @param x   How far to shift the Thing vertically.
         * @param maxDistance   The maximum distance the Thing can be shifted.
         */
        slideToY(thing: IThing, y: number, maxDistance: number): void;

        /**
         * Ensures the current object is an EightBittr by throwing an error if it 
         * is not. This should be used for functions in any EightBittr descendants
         * that have to call 'this' to ensure their caller is what the programmer
         * expected it to be.
         * 
         * @param current   The scope that should be an EightBittr.
         */
        ensureCorrectCaller(current: any): IEightBittr;

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
        proliferate(recipient: any, donor: any, noOverride?: boolean): any;

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
        proliferateHard(recipient: any, donor: any, noOverride?: boolean): any;

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
        proliferateElement(recipient: HTMLElement, donor: any, noOverride?: boolean): HTMLElement;

        /**
         * Creates and returns an HTMLElement of the specified type. Any additional
         * settings Objects may be given to be proliferated onto the Element via
         * proliferateElement.
         * 
         * @param type   The tag of the Element to be created.
         * @param settings   Additional settings to proliferated onto the Element.
         * @returns {HTMLElement}
         */
        createElement(tag?: string, ...args: any[]): HTMLElement;

        /**
         * Follows a path inside an Object recursively, based on a given path.
         * 
         * @param object   A container to follow a path inside.
         * @param path   The ordered names of attributes to descend into.
         * @param num   The starting index in path (by default, 0).
         * @returns The discovered property within object, or undefined if the
         *          full path doesn't exist.
         */
        followPathHard(object: any, path: string[], index?: number): any;

        /**
         * Switches an object from one Array to another using splice and push.
         * 
         * @param object    The object to move between Arrays.
         * @param arrayOld   The Array to take the object out of.
         * @param arrayNew   The Array to move the object into.
         */
        arraySwitch(object: any, arrayOld: any[], arrayNew: any[]): void;

        /**
         * Sets a Thing's position within an Array to the front by splicing and then
         * unshifting it.
         * 
         * @param object   The object to move within the Array.
         * @param array   An Array currently containing the object.
         */
        arrayToBeginning(object: any, array: any[]): void;

        /**
         * Sets a Thing's position within an Array to the front by splicing and then
         * pushing it.
         * 
         * @param object   The object to move within the Array.
         * @param array   An Array currently containing the object.
         */
        arrayToEnd(object: any, array: any[]): void;

        /**
         * Sets a Thing's position within an Array to a specific index by splicing 
         * it out, then back in.
         * 
         * @param object   The object to move within the Array.
         * @param array   An Array currently containing the object.
         * @param index   Where the object should be moved to in the Array.
         */
        arrayToIndex(object: any, array: any[], index: number): void;
    }
}


namespace EightBittr {
    "use strict";

    /**
     * An abstract class used exclusively as the parent of GameStartr. EightBittr
     * contains useful functions for manipulating Things that are independent of
     * the required GameStartr modules.
     */
    export class EightBittr implements IEightBittr {
        /**
         * How much to expand each pixel from raw sizing measurements to in-game.
         */
        public unitsize: number;

        /**
         * Timed result summaries of resetTimed, if it was called.
         */
        public resetTimes: EightBittr.IResetTimes;

        /**
         * Any custom settings passed in during construction to be passed to
         * reset Functions.
         */
        protected customs: any;

        /**
         * A listing of the names of all member variables of this EightBittr
         * that should be pulled in from the setting's constantsSource.
         */
        protected constants: string[];

        /**
         * Initializes a new instance of the EightBittr class. Constants are copied
         * onto the EightBittr from the designated source.
         * 
         * @param settings   Any optional custom settings.
         */
        constructor(settings: IEightBittrSettings = {}) {
            var EightBitter: EightBittr = EightBittr.prototype.ensureCorrectCaller(this),
                constants: any = settings.constants,
                constantsSource: any = settings.constantsSource || EightBitter,
                i: number;

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
        reset(EightBitter: EightBittr, resets: string[], customs?: any): void {
            var reset: string,
                i: number;

            EightBitter.customs = customs;

            for (i = 0; i < resets.length; i += 1) {
                reset = resets[i];

                if (!EightBitter[reset]) {
                    throw new Error(reset + " is missing on a resetting EightBittr.");
                }

                EightBitter[reset](EightBitter, customs);
            }
        }

        /**
         * Resets the EightBittr in a timed manner by calling all the named reset
         * member Functions on itself and adding the time (in milliseconds) along 
         * along with the total process time to an Array, which is then returned.
         * 
         * @param EightBitter
         * @param resets   The ordered Array of reset Functions to be called.
         * @param customs   Additional arguments to pass to all reset Functions.
         */
        resetTimed(EightBitter: EightBittr, resets: string[], customs?: any): void {
            var timeStartTotal: number = performance.now(),
                timeEndTotal: number,
                timeStart: number,
                timeEnd: number,
                i: number;

            this.resetTimes = <any>{
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
        }


        /* HTML Functions
        */

        /**
         * Creates and returns a new HTML <canvas> element with no image smoothing.
         * 
         * @param width   How wide the canvas should be.
         * @param height   How tall the canvas should be.
         * @returns A canvas of the given width and height height.
         */
        createCanvas(width: number, height: number): HTMLCanvasElement {
            var canvas: HTMLCanvasElement = document.createElement("canvas"),
                // context: CanvasRenderingContext2D = canvas.getContext("2d");
                context: any = canvas.getContext("2d");

            canvas.width = width;
            canvas.height = height;

            // For speed's sake, disable image smoothing in the first supported browsers
            if (typeof context.imageSmoothingEnabled !== "undefined") {
                context.imageSmoothingEnabled = false;
            } else if (typeof context.webkitImageSmoothingEnabled !== "undefined") {
                context.webkitImageSmoothingEnabled = false;
            } else if (typeof context.mozImageSmoothingEnabled !== "undefined") {
                context.mozImageSmoothingEnabled = false;
            } else if (typeof context.msImageSmoothingEnabled !== "undefined") {
                context.msImageSmoothingEnabled = false;
            } else if (typeof context.oImageSmoothingEnabled !== "undefined") {
                context.oImageSmoothingEnabled = false;
            }

            return canvas;
        }


        /* Physics functions 
        */

        /**
         * Shifts a Thing vertically by changing its top and bottom attributes.
         * 
         * @param thing   The Thing to shift vertically.
         * @param dy   How far to shift the Thing.
         */
        shiftVert(thing: IThing, dy: number): void {
            thing.top += dy;
            thing.bottom += dy;
        }

        /**
         * Shifts a Thing horizontally by changing its top and bottom attributes.
         * 
         * @param thing   The Thing to shift horizontally.
         * @param dy   How far to shift the Thing.
         */
        shiftHoriz(thing: IThing, dx: number): void {
            thing.left += dx;
            thing.right += dx;
        }

        /**
         * Sets the top of a Thing to a set number, changing the bottom based on its
         * height and the EightBittr's unisize.
         * 
         * @param thing   The Thing to shift vertically.
         * @param top   Where the Thing's top should be.
         */
        setTop(thing: IThing, top: number): void {
            thing.top = top;
            thing.bottom = thing.top + thing.height * thing.EightBitter.unitsize;
        }

        /**
         * Sets the right of a Thing to a set number, changing the left based on its
         * width and the EightBittr's unisize.
         * 
         * @param thing   The Thing to shift horizontally.
         * @param top   Where the Thing's right should be.
         */
        setRight(thing: IThing, right: number): void {
            thing.right = right;
            thing.left = thing.right - thing.width * thing.EightBitter.unitsize;
        }

        /**
         * Sets the bottom of a Thing to a set number, changing the top based on its
         * height and the EightBittr's unisize.
         * 
         * @param thing   The Thing to shift vertically.
         * @param top   Where the Thing's bottom should be.
         */
        setBottom(thing: IThing, bottom: number): void {
            thing.bottom = bottom;
            thing.top = thing.bottom - thing.height * thing.EightBitter.unitsize;
        }

        /**
         * Sets the left of a Thing to a set number, changing the right based on its
         * width and the EightBittr's unisize.
         * 
         * @param thing   The Thing to shift horizontally.
         * @param top   Where the Thing's left should be.
         */
        setLeft(thing: IThing, left: number): void {
            thing.left = left;
            thing.right = thing.left + thing.width * thing.EightBitter.unitsize;
        }

        /**
         * Shifts a Thing so that it is horizontally centered on the given x.
         * 
         * @param thing   The Thing to shift horizontally.
         * @param x   Where the Thing's horizontal midpoint should be.
         */
        setMidX(thing: IThing, x: number): void {
            thing.EightBitter.setLeft(
                thing,
                x - thing.width * thing.EightBitter.unitsize / 2);
        }

        /**
         * Shifts a Thing so that it is vertically centered on the given y.
         * 
         * @param thing   The Thing to shift vertically.
         * @param y   Where the Thing's vertical midpoint should be.
         */
        setMidY(thing: IThing, y: number): void {
            thing.EightBitter.setTop(
                thing,
                y - thing.height * thing.EightBitter.unitsize / 2);
        }

        /**
         * Shifts a Thing so that it is centered on the given x and y.
         * 
         * @param thing   The Thing to shift vertically and horizontally.
         * @param x   Where the Thing's horizontal midpoint should be.
         * @param y   Where the Thing's vertical midpoint should be.
         */
        setMid(thing: IThing, x: number, y: number): void {
            thing.EightBitter.setMidX(thing, x);
            thing.EightBitter.setMidY(thing, y);
        }

        /**
         * @param thing
         * @returns The horizontal midpoint of the Thing.
         */
        getMidX(thing: IThing): number {
            return thing.left + thing.width * thing.EightBitter.unitsize / 2;
        }

        /**
         * @param thing
         * @returns The vertical midpoint of the Thing.
         */
        getMidY(thing: IThing): number {
            return thing.top + thing.height * thing.EightBitter.unitsize / 2;
        }

        /**
         * Shifts a Thing so that its midpoint is centered on the midpoint of the
         * other Thing.
         * 
         * @param thing   The Thing to be shifted.
         * @param other   The Thing whose midpoint is referenced.
         */
        setMidObj(thing: IThing, other: IThing): void {
            thing.EightBitter.setMidXObj(thing, other);
            thing.EightBitter.setMidYObj(thing, other);
        }

        /**
         * Shifts a Thing so that its horizontal midpoint is centered on the 
         * midpoint of the other Thing.
         * 
         * @param thing   The Thing to be shifted horizontally.
         * @param other   The Thing whose horizontal midpoint is referenced.
         */
        setMidXObj(thing: IThing, other: IThing): void {
            thing.EightBitter.setLeft(
                thing,
                thing.EightBitter.getMidX(other)
                - (thing.width * thing.EightBitter.unitsize / 2)
            );
        }

        /**
         * Shifts a Thing so that its vertical midpoint is centered on the 
         * midpoint of the other Thing.
         * 
         * @param thing   The Thing to be shifted vertically.
         * @param other   The Thing whose vertical midpoint is referenced.
         */
        setMidYObj(thing: IThing, other: IThing): void {
            thing.EightBitter.setTop(
                thing,
                thing.EightBitter.getMidY(other)
                - (thing.height * thing.EightBitter.unitsize / 2)
            );
        }

        /**
         * @param thing
         * @param other
         * @returns Whether the first Thing's midpoint is to the left of the other's.
         */
        objectToLeft(thing: IThing, other: IThing): boolean {
            return (
                thing.EightBitter.getMidX(thing) < thing.EightBitter.getMidX(other)
            );
        }

        /**
         * Shifts a Thing's top up, then sets the bottom (similar to a shiftVert and
         * a setTop combined).
         * 
         * @param thing   The Thing to be shifted vertically.
         * @param dy   How far to shift the Thing vertically.
         */
        updateTop(thing: IThing, dy: number): void {
            // If a dy is provided, move the thing's top that much
            thing.top += dy || 0;

            // Make the thing's bottom dependent on the top
            thing.bottom = thing.top + thing.height * thing.EightBitter.unitsize;
        }

        /**
         * Shifts a Thing's right, then sets the left (similar to a shiftHoriz and a
         * setRight combined).
         * 
         * @param thing   The Thing to be shifted horizontally.
         * @param dx   How far to shift the Thing horizontally.
         */
        updateRight(thing: IThing, dx: number): void {
            // If a dx is provided, move the thing's right that much
            thing.right += dx || 0;

            // Make the thing's left dependent on the right
            thing.left = thing.right - thing.width * thing.EightBitter.unitsize;
        }

        /**
         * Shifts a Thing's bottom down, then sets the bottom (similar to a 
         * shiftVert and a setBottom combined).
         * 
         * @param thing   The Thing to be shifted vertically.
         * @param dy   How far to shift the Thing vertically.
         */
        updateBottom(thing: IThing, dy: number): void {
            // If a dy is provided, move the thing's bottom that much
            thing.bottom += dy || 0;

            // Make the thing's top dependent on the top
            thing.top = thing.bottom - thing.height * thing.EightBitter.unitsize;
        }

        /**
         * Shifts a Thing's left, then sets the right (similar to a shiftHoriz and a
         * setLeft combined).
         * 
         * @param thing   The Thing to be shifted horizontally.
         * @param dx   How far to shift the Thing horizontally.
         */
        updateLeft(thing: IThing, dx: number): void {
            // If a dx is provided, move the thing's left that much
            thing.left += dx || 0;

            // Make the thing's right dependent on the left
            thing.right = thing.left + thing.width * thing.EightBitter.unitsize;
        }

        /**
         * Shifts a Thing toward a target x, but limits the total distance allowed.
         * Distance is computed as from the Thing's horizontal midpoint.
         * 
         * @param thing   The Thing to be shifted horizontally.
         * @param x   How far to shift the Thing horizontally.
         * @param maxDistance   The maximum distance the Thing can be shifted.
         */
        slideToX(thing: IThing, x: number, maxDistance: number): void {
            var midx: number = thing.EightBitter.getMidX(thing);

            // If no maxSpeed is provided, assume Infinity (so it doesn't matter)
            maxDistance = maxDistance || Infinity;

            // Thing to the left? Slide to the right.
            if (midx < x) {
                thing.EightBitter.shiftHoriz(thing, Math.min(maxDistance, x - midx));
            } else {
                // Thing to the right? Slide to the left.
                thing.EightBitter.shiftHoriz(thing, Math.max(-maxDistance, x - midx));
            }
        }

        /**
         * Shifts a Thing toward a target y, but limits the total distance allowed.
         * Distance is computed as from the Thing's vertical midpoint.
         * 
         * @param thing   The Thing to be shifted vertically.
         * @param x   How far to shift the Thing vertically.
         * @param maxDistance   The maximum distance the Thing can be shifted.
         */
        slideToY(thing: IThing, y: number, maxDistance: number): void {
            var midy: number = thing.EightBitter.getMidY(thing);

            // If no maxSpeed is provided, assume Infinity (so it doesn't matter)
            maxDistance = maxDistance || Infinity;

            // Thing above? slide down.
            if (midy < y) {
                thing.EightBitter.shiftVert(thing, Math.min(maxDistance, y - midy));
            } else {
                // Thing below? Slide up.
                thing.EightBitter.shiftVert(thing, Math.max(-maxDistance, y - midy));
            }
        }


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
        ensureCorrectCaller(current: any): EightBittr {
            if (!(current instanceof EightBittr)) {
                throw new Error("A function requires the caller ('this') to be the "
                    + "manipulated EightBittr object. Unfortunately, 'this' is a "
                    + typeof (this) + ".");
            }
            return current;
        }


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
        proliferate(recipient: any, donor: any, noOverride: boolean = false): any {
            var setting: any,
                i: string;

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
                    } else {
                        // Regular primitives are easy to copy otherwise
                        recipient[i] = setting;
                    }
                }
            }

            return recipient;
        }

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
        proliferateHard(recipient: any, donor: any, noOverride?: boolean): any {
            var setting: any,
                i: string;

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
                    } else {
                        // Regular primitives are easy to copy otherwise
                        recipient[i] = setting;
                    }
                }
            }
            return recipient;
        }

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
        proliferateElement(recipient: HTMLElement, donor: any, noOverride: boolean = false): HTMLElement {
            var setting: any,
                i: string,
                j: number;

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
                            } else if (typeof setting === "object") {
                                // If it's an object, recurse on a new version of it
                                if (!recipient.hasOwnProperty(i)) {
                                    recipient[i] = new setting.constructor();
                                }
                                this.proliferate(recipient[i], setting, noOverride);
                            } else {
                                // Regular primitives are easy to copy otherwise
                                recipient[i] = setting;
                            }
                            break;
                    }
                }
            }

            return recipient;
        }

        /**
         * Creates and returns an HTMLElement of the specified type. Any additional
         * settings Objects may be given to be proliferated onto the Element via
         * proliferateElement.
         * 
         * @param type   The tag of the Element to be created.
         * @param settings   Additional settings to proliferated onto the Element.
         * @returns {HTMLElement}
         */
        createElement(tag?: string, ...args: any[]): HTMLElement {
            var EightBitter: EightBittr = EightBittr.prototype.ensureCorrectCaller(this),
                element: HTMLElement = document.createElement(tag || "div"),
                i: number;

            // For each provided object, add those settings to the element
            for (i = 0; i < args.length; i += 1) {
                EightBitter.proliferateElement(element, args[i]);
            }

            return element;
        }

        /**
         * Follows a path inside an Object recursively, based on a given path.
         * 
         * @param object   A container to follow a path inside.
         * @param path   The ordered names of attributes to descend into.
         * @param num   The starting index in path (by default, 0).
         * @returns The discovered property within object, or undefined if the
         *          full path doesn't exist.
         */
        followPathHard(object: any, path: string[], index: number = 0): any {
            for (var i: number = index; i < path.length; i += 1) {
                if (typeof object[path[i]] === "undefined") {
                    return undefined;
                } else {
                    object = object[path[i]];
                }
            }

            return object;
        }

        /**
         * Switches an object from one Array to another using splice and push.
         * 
         * @param object    The object to move between Arrays.
         * @param arrayOld   The Array to take the object out of.
         * @param arrayNew   The Array to move the object into.
         */
        arraySwitch(object: any, arrayOld: any[], arrayNew: any[]): void {
            arrayOld.splice(arrayOld.indexOf(object), 1);
            arrayNew.push(object);
        }

        /**
         * Sets a Thing's position within an Array to the front by splicing and then
         * unshifting it.
         * 
         * @param object   The object to move within the Array.
         * @param array   An Array currently containing the object.
         */
        arrayToBeginning(object: any, array: any[]): void {
            array.splice(array.indexOf(object), 1);
            array.unshift(object);
        }

        /**
         * Sets a Thing's position within an Array to the front by splicing and then
         * pushing it.
         * 
         * @param object   The object to move within the Array.
         * @param array   An Array currently containing the object.
         */
        arrayToEnd(object: IThing, array: any[]): void {
            array.splice(array.indexOf(object), 1);
            array.push(object);
        }

        /**
         * Sets a Thing's position within an Array to a specific index by splicing 
         * it out, then back in.
         * 
         * @param object   The object to move within the Array.
         * @param array   An Array currently containing the object.
         * @param index   Where the object should be moved to in the Array.
         */
        arrayToIndex(object: IThing, array: any[], index: number): void {
            array.splice(array.indexOf(object), 1);
            array.splice(index, 0, object);
        }
    };
}
