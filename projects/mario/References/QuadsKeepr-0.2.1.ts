/// <reference path="ObjectMakr-0.2.2.ts" />

declare namespace QuadsKeepr {
    /**
     * Any bounding box that can be within quadrant(s).
     */
    export interface IThing {
        /**
         * The top border of the bounding box.
         */
        top: number;
        
        /**
         * The right border of the bounding box.
         */
        right: number;
        
        /**
         * The bottom border of the bounding box.
         */
        bottom: number;
        
        /**
         * The left border of the bounding box.
         */
        left: number;
    }

    /**
     * Some collection of Thing groups, keyed by group name.
     */
    export interface IThingsCollection {
        [i: string]: IThing[];
    }

    /** 
     * For each group name in a Quadrant, how many Things it has of that name.
     * 
     * @remarks .numthings[groupName] <= .things[groupName].length, as the .things
     *          Arrays are not resized when Things are remved.
     */
    export interface IThingsCounter {
        [i: string]: number;
    }

    /**
     * A single cell in a grid structure containing any number of Things.
     */
    export interface IQuadrant extends IThing {
        /**
         * Groups of Things known to overlap (be within) the Quadrant, by group.
         */
        things: IThingsCollection;

        /**
         * How many Things are in the Quadrant across all groups.
         */
        numthings: IThingsCounter;
    }
    
    /**
     * A straight line of Quadrants, border-to-border.
     */
    export interface IQuadrantCollection {
        /**
         * The leftmost border (of the leftmost Quadrant).
         */
        left: number;

        /**
         * The top border (of the top Quadrant).
         */
        top: number;

        /**
         * The Quadrants, in order.
         */
        quadrants: IQuadrant[];
    }

    /**
     * A complete row of Quadrants, border-to-border.
     */
    export interface IQuadrantRow extends IQuadrantCollection {
        /**
         * The Quadrants, in order from left to right.
         */
        quadrants: IQuadrant[];
    }

    /**
     * A complete column of Quadrants, border-to-border.
     */
    export interface IQuadrantCol extends IQuadrantCollection {
        /**
         * The Quadrants, in order from top to bottom.
         */
        quadrants: IQuadrant[];
    }

    /**
     * A callback for a newly added or removed area from the grid.
     * 
     * @param direction The direction the changed area is, relative to the existing grid.
     * @param top   The top border of the new area.
     * @param right   The right border of the new area.
     * @param bottom   The bottom border of the new area.
     * @param left  The left border of the new area.
     */
    export interface IQuadrantChangeCallback {
        (direction: string, top: number, right: number, bottom: number, left: number): void;
    }

    /**
     * Settings to initialize a new IQuadsKeepr.
     */
    export interface IQuadsKeeprSettings {
        /**
         * An ObjectMakr used to create Quadrants.
         */
        ObjectMaker: ObjectMakr.IObjectMakr;

        /**
         * How many QuadrantRows to keep at a time.
         */
        numRows: number;

        /**
         * How many QuadrantCols to keep at a time.
         */
        numCols: number;

        /**
         * How wide each Quadrant should be.
         */
        quadrantWidth: number;

        /**
         * How high each Quadrant should be.
         */
        quadrantHeight: number;

        /**
         * The names of groups Things may be in within Quadrants.
         */
        groupNames: string[];

        /**
         * Callback for when Quadrants are added, called on the newly contained area.
         */
        onAdd?: IQuadrantChangeCallback;

        /**
         * Callback for when Quadrants are removed, called on the formerly contained area.
         */
        onRemove?: IQuadrantChangeCallback;

        /**
         * The initial horizontal edge (rounded; by default, 0).
         */
        startLeft?: number;

        /**
         * The initial vertical edge (rounded; by default, 0).
         */
        startTop?: number;

        /**
         * String key under which Things store their top (by default, "top").
         */
        keyTop?: string;

        /**
         * String key under which Things store their right (by default, "right").
         */
        keyRight?: string;

        /**
         * String key under which Things store their bottom (by default, "bottom").
         */
        keyBottom?: string;

        /**
         * String key under which Things store their left (by default, "left").
         */
        keyLeft?: string;

        /**
         * String key under which Things store their number of Quadrants (by default, "numquads").
         */
        keyNumQuads?: string;

        /**
         * String key under which Things store their quadrants (by default, "quadrants").
         */
        keyQuadrants?: string;

        /**
         * String key under which Things store their changed status (by default, "changed").
         */
        keyChanged?: string;

        /**
         * String key under which Things store their horizontal tolerance (by default, "tolx").
         */
        keyToleranceX?: string;

        /**
         * String key under which Things store their vertical tolerance (by default, "toly").
         */
        keyToleranceY?: string;

        /**
         * String key under which Things store their group (by default, "group").
         */
        keyGroupName?: string;

        /**
         * String key under which Things store their horizontal offset.
         */
        keyOffsetX?: string;

        /**
         * String key under which Things store their vertical offset.
         */
        keyOffsetY?: string;
    }

    /**
     * Quadrant-based collision detection. A grid structure of Quadrants is kept,
     * with Things placed within quadrants they intersect. Operations are available
     * to shift quadrants horizontally or vertically and add/remove rows and columns.
     */
    export interface IQuadsKeepr {
        /**
         * The top boundary for all quadrants.
         */
        top: number;

        /**
         * The right boundary for all quadrants.
         */
        right: number;

        /**
         * The bottom boundary for all quadrants.
         */
        bottom: number;

        /**
         * The left boundary for all quadrants.
         */
        left: number;

        /**
         * @returns The listing of Quadrants grouped by row.
         */
        getQuadrantRows(): IQuadrantRow[];

        /**
         * @returns The listing of Quadrants grouped by column.
         */
        getQuadrantCols(): IQuadrantCol[];

        /**
         * @returns How many Quadrant rows there are.
         */
        getNumRows(): number;

        /**
         * @returns How many Quadrant columns there are.
         */
        getNumCols(): number;

        /**
         * @returns How wide each Quadrant is.
         */
        getQuadrantWidth(): number;

        /**
         * @returns How high each Quadrant is.
         */
        getQuadrantHeight(): number;

        /**
         * Completely resets all Quadrants. The grid structure of rows and columns
         * is remade with new Quadrants according to startLeft and startTop.
         */
        resetQuadrants(): void;

        /**
         * Shifts each Quadrant horizontally and vertically, along with the row and
         * column containers. Offsets are adjusted to check for row or column 
         * deletion and insertion.
         * 
         * @param dx   How much to shift horizontally (will be rounded).
         * @param dy   How much to shift vertically (will be rounded).
         */
        shiftQuadrants(dx?: number, dy?: number): void;

        /**
         * Adds a QuadrantRow to the end of the quadrantRows Array.
         * 
         * @param callUpdate   Whether this should call the onAdd trigger 
         *                     with the new row's bounding box.
         * @returns The newly created QuadrantRow.
         */
        pushQuadrantRow(callUpdate?: boolean): IQuadrantRow;

        /**
         * Adds a QuadrantCol to the end of the quadrantCols Array.
         * 
         * @param callUpdate   Whether this should call the onAdd trigger 
         *                     with the new col's bounding box.
         * @returns The newly created QuadrantCol.
         */
        pushQuadrantCol(callUpdate?: boolean): IQuadrantCol;

        /**
         * Removes the last QuadrantRow from the end of the quadrantRows Array.
         * 
         * @param callUpdate   Whether this should call the onRemove trigger 
         *                     with the new row's bounding box.
         * @returns The newly created QuadrantRow.
         */
        popQuadrantRow(callUpdate?: boolean): void;

        /**
         * Removes the last QuadrantCol from the end of the quadrantCols Array.
         * 
         * @param callUpdate   Whether this should call the onRemove trigger 
         *                     with the new row's bounding box.
         */
        popQuadrantCol(callUpdate?: boolean): void;

        /**
         * Adds a QuadrantRow to the beginning of the quadrantRows Array.
         * 
         * @param callUpdate   Whether this should call the onAdd trigger 
         *                     with the new row's bounding box.
         * @returns The newly created QuadrantRow.
         */
        unshiftQuadrantRow(callUpdate?: boolean): IQuadrantRow;

        /**
         * Adds a QuadrantCol to the beginning of the quadrantCols Array.
         * 
         * @param callUpdate   Whether this should call the onAdd trigger 
         *                     with the new row's bounding box.
         * @returns The newly created QuadrantCol.
         */
        unshiftQuadrantCol(callUpdate?: boolean): IQuadrantCol;

        /**
         * Removes a QuadrantRow from the beginning of the quadrantRows Array.
         * 
         * @param callUpdate   Whether this should call the onAdd trigger 
         *                     with the new row's bounding box.
         */
        shiftQuadrantRow(callUpdate?: boolean): void;

        /**
         * Removes a QuadrantCol from the beginning of the quadrantCols Array.
         * 
         * @param callUpdate   Whether this should call the onAdd trigger 
         *                     with the new row's bounding box.
         */
        shiftQuadrantCol(callUpdate?: boolean): void;

        /**
         * Determines the Quadrants for an entire Array of Things. This is done by
         * wiping each quadrant's memory of that Array's group type and determining
         * each Thing's quadrants.
         * 
         * @param group   The name of the group to have Quadrants determined.
         * @param things   The listing of Things in that group.
         */
        determineAllQuadrants(group: string, things: IThing[]): void;

        /**
         * Determines the Quadrants for a single Thing. The starting row and column
         * indices are calculated so every Quadrant within them should contain the
         * Thing. In the process, its old Quadrants and new Quadrants are marked as 
         * changed if it was.
         * 
         * @param thing   A Thing whose Quadrants are to be determined.
         */
        determineThingQuadrants(thing: IThing): void;

        /**
         * Sets a Thing to be inside a Quadrant. The two are marked so they can
         * recognize each other's existence later.
         * 
         * @param thing   A Thing to be placed in the Quadrant.
         * @param quadrant   A Quadrant that now contains the Thing.
         * @param group   The grouping under which the Quadrant should store the 
         *                Thing.
         */
        setThingInQuadrant(thing: IThing, quadrant: IQuadrant, group: string): void;
    }
}


namespace QuadsKeepr {
    "use strict";

    /**
     * Quadrant-based collision detection. A grid structure of Quadrants is kept,
     * with Things placed within quadrants they intersect. Operations are available
     * to shift quadrants horizontally or vertically and add/remove rows and columns.
     */
    export class QuadsKeepr implements IQuadsKeepr {
        /**
         * The top boundary for all quadrants.
         */
        top: number;

        /**
         * The right boundary for all quadrants.
         */
        right: number;

        /**
         * The bottom boundary for all quadrants.
         */
        bottom: number;

        /**
         * The left boundary for all quadrants.
         */
        left: number;

        /**
         * The ObjectMakr factory used to create Quadrant objects.
         */
        private ObjectMaker: ObjectMakr.IObjectMakr;

        /**
         * How many rows of Quadrants there should be initially.
         */
        private numRows: number;

        /**
         * How many columns of Quadrants there should be initially.
         */
        private numCols: number;

        /**
         * Horizontal scrolling offset during gameplay.
         */
        private offsetX: number;

        /**
         * Vertical scrolling offset during gameplay.
         */
        private offsetY: number;

        /**
         * Starting coordinates for columns.
         */
        private startLeft: number;

        /**
         * Starting coordinates for rows.
         */
        private startTop: number;

        /**
         * A QuadrantRow[] that holds each QuadrantRow in order.
         */
        private quadrantRows: IQuadrantRow[];

        /**
         * A QuadrantCol[] that holds each QuadrantCol in order.
         */
        private quadrantCols: IQuadrantCol[];

        /**
         * How wide Quadrants should be.
         */
        private quadrantWidth: number;

        /**
         * How tall Quadrants should be.
         */
        private quadrantHeight: number;

        /**
         * String key under which external Things store their top coordinate.
         */
        private keyTop: string;

        /**
         * String key under which external Things store their top coordinate.
         */
        private keyRight: string;

        /**
         * String key under which external Things store their top coordinate.
         */
        private keyBottom: string;

        /**
         * String key under which external Things store their top coordinate.
         */
        private keyLeft: string;

        /**
         * String key under which external Things store their top coordinate.
         */
        private keyNumQuads: string;

        /**
         * String key under which external Things store their top coordinate.
         */
        private keyQuadrants: string;

        /**
         * String key under which external Things store their top coordinate.
         */
        private keyChanged: string;

        /**
         * String key under which external Things store their top coordinate.
         */
        private keyToleranceX: string;

        /**
         * String key under which external Things store their top coordinate.
         */
        private keyToleranceY: string;

        /**
         * String key under which external Things store their top coordinate.
         */
        private keyGroupName: string;

        /**
         * String key under which external Things store their top coordinate.
         */
        private keyOffsetX: string;

        /**
         * String key under which external Things store their top coordinate.
         */
        private keyOffsetY: string;

        /**
         * The groups Things may be placed into within Quadrants.
         */
        private groupNames: string[];

        /**
         * Callback for when Quadrants are added, called on the area and direction.
         */
        private onAdd: IQuadrantChangeCallback;

        /**
         * Callback for when Quadrants are removed, called on the area and direction.
         */
        private onRemove: IQuadrantChangeCallback;

        /**
         * @param {IQuadsKeeprSettings} settings
         */
        constructor(settings: IQuadsKeeprSettings) {
            if (!settings) {
                throw new Error("No settings object given to QuadsKeepr.");
            }
            if (!settings.ObjectMaker) {
                throw new Error("No ObjectMaker given to QuadsKeepr.");
            }
            if (!settings.numRows) {
                throw new Error("No numRows given to QuadsKeepr.");
            }
            if (!settings.numCols) {
                throw new Error("No numCols given to QuadsKeepr.");
            }
            if (!settings.quadrantWidth) {
                throw new Error("No quadrantWidth given to QuadsKeepr.");
            }
            if (!settings.quadrantHeight) {
                throw new Error("No quadrantHeight given to QuadsKeepr.");
            }
            if (!settings.groupNames) {
                throw new Error("No groupNames given to QuadsKeepr.");
            }

            this.ObjectMaker = settings.ObjectMaker;
            this.numRows = settings.numRows | 0;
            this.numCols = settings.numCols | 0;
            this.quadrantWidth = settings.quadrantWidth | 0;
            this.quadrantHeight = settings.quadrantHeight | 0;

            this.groupNames = settings.groupNames;

            this.onAdd = settings.onAdd;
            this.onRemove = settings.onRemove;

            this.startLeft = settings.startLeft | 0;
            this.startTop = settings.startTop | 0;

            this.keyTop = settings.keyTop || "top";
            this.keyLeft = settings.keyLeft || "left";
            this.keyBottom = settings.keyBottom || "bottom";
            this.keyRight = settings.keyRight || "right";
            this.keyNumQuads = settings.keyNumQuads || "numquads";
            this.keyQuadrants = settings.keyQuadrants || "quadrants";
            this.keyChanged = settings.keyChanged || "changed";
            this.keyToleranceX = settings.keyToleranceX || "tolx";
            this.keyToleranceY = settings.keyToleranceY || "toly";
            this.keyGroupName = settings.keyGroupName || "group";
            this.keyOffsetX = settings.keyOffsetX;
            this.keyOffsetY = settings.keyOffsetY;
        }


        /* Simple gets
        */

        /**
         * @returns The listing of Quadrants grouped by row.
         */
        getQuadrantRows(): IQuadrantRow[] {
            return this.quadrantRows;
        }

        /**
         * @returns The listing of Quadrants grouped by column.
         */
        getQuadrantCols(): IQuadrantCol[] {
            return this.quadrantCols;
        }

        /**
         * @returns How many Quadrant rows there are.
         */
        getNumRows(): number {
            return this.numRows;
        }

        /**
         * @returns How many Quadrant columns there are.
         */
        getNumCols(): number {
            return this.numCols;
        }

        /**
         * @returns How wide each Quadrant is.
         */
        getQuadrantWidth(): number {
            return this.quadrantWidth;
        }

        /**
         * @returns How high each Quadrant is.
         */
        getQuadrantHeight(): number {
            return this.quadrantHeight;
        }


        /* Quadrant updates
        */

        /**
         * Completely resets all Quadrants. The grid structure of rows and columns
         * is remade with new Quadrants according to startLeft and startTop.
         */
        resetQuadrants(): void {
            var left: number = this.startLeft,
                top: number = this.startTop,
                quadrant: IQuadrant,
                i: number,
                j: number;

            this.top = this.startTop;
            this.right = this.startLeft + this.quadrantWidth * this.numCols;
            this.bottom = this.startTop + this.quadrantHeight * this.numRows;
            this.left = this.startLeft;

            this.quadrantRows = [];
            this.quadrantCols = [];

            this.offsetX = 0;
            this.offsetY = 0;

            for (i = 0; i < this.numRows; i += 1) {
                this.quadrantRows.push({
                    "left": this.startLeft,
                    "top": top,
                    "quadrants": []
                });
                top += this.quadrantHeight;
            }

            for (j = 0; j < this.numCols; j += 1) {
                this.quadrantCols.push({
                    "left": left,
                    "top": this.startTop,
                    "quadrants": []
                });
                left += this.quadrantWidth;
            }

            top = this.startTop;
            for (i = 0; i < this.numRows; i += 1) {
                left = this.startLeft;
                for (j = 0; j < this.numCols; j += 1) {
                    quadrant = this.createQuadrant(left, top);
                    this.quadrantRows[i].quadrants.push(quadrant);
                    this.quadrantCols[j].quadrants.push(quadrant);
                    left += this.quadrantWidth;
                }
                top += this.quadrantHeight;
            }

            if (this.onAdd) {
                this.onAdd("xInc", this.top, this.right, this.bottom, this.left);
            }
        }

        /**
         * Shifts each Quadrant horizontally and vertically, along with the row and
         * column containers. Offsets are adjusted to check for row or column 
         * deletion and insertion.
         * 
         * @param dx   How much to shift horizontally (will be rounded).
         * @param dy   How much to shift vertically (will be rounded).
         */
        shiftQuadrants(dx: number = 0, dy: number = 0): void {
            var row: number,
                col: number;

            dx = dx | 0;
            dy = dy | 0;

            this.offsetX += dx;
            this.offsetY += dy;

            this.top += dy;
            this.right += dx;
            this.bottom += dy;
            this.left += dx;

            for (row = 0; row < this.numRows; row += 1) {
                this.quadrantRows[row].left += dx;
                this.quadrantRows[row].top += dy;
            }

            for (col = 0; col < this.numCols; col += 1) {
                this.quadrantCols[col].left += dx;
                this.quadrantCols[col].top += dy;
            }

            for (row = 0; row < this.numRows; row += 1) {
                for (col = 0; col < this.numCols; col += 1) {
                    this.shiftQuadrant(this.quadrantRows[row].quadrants[col], dx, dy);
                }
            }

            this.adjustOffsets();
        }

        /**
         * Adds a QuadrantRow to the end of the quadrantRows Array.
         * 
         * @param callUpdate   Whether this should call the onAdd trigger 
         *                     with the new row's bounding box.
         * @returns The newly created QuadrantRow.
         */
        pushQuadrantRow(callUpdate?: boolean): IQuadrantRow {
            var row: IQuadrantRow = this.createQuadrantRow(this.left, this.bottom),
                i: number;

            this.numRows += 1;
            this.quadrantRows.push(row);

            for (i = 0; i < this.quadrantCols.length; i += 1) {
                this.quadrantCols[i].quadrants.push(row.quadrants[i]);
            }

            this.bottom += this.quadrantHeight;

            if (callUpdate && this.onAdd) {
                this.onAdd("yInc", this.bottom, this.right, this.bottom - this.quadrantHeight, this.left);
            }

            return row;
        }

        /**
         * Adds a QuadrantCol to the end of the quadrantCols Array.
         * 
         * @param callUpdate   Whether this should call the onAdd trigger 
         *                     with the new col's bounding box.
         * @returns The newly created QuadrantCol.
         */
        pushQuadrantCol(callUpdate?: boolean): IQuadrantCol {
            var col: IQuadrantCol = this.createQuadrantCol(this.right, this.top),
                i: number;

            this.numCols += 1;
            this.quadrantCols.push(col);

            for (i = 0; i < this.quadrantRows.length; i += 1) {
                this.quadrantRows[i].quadrants.push(col.quadrants[i]);
            }

            this.right += this.quadrantWidth;

            if (callUpdate && this.onAdd) {
                this.onAdd("xInc", this.top, this.right - this.offsetY, this.bottom, this.right - this.quadrantWidth - this.offsetY);
            }

            return col;
        }

        /**
         * Removes the last QuadrantRow from the end of the quadrantRows Array.
         * 
         * @param callUpdate   Whether this should call the onRemove trigger 
         *                     with the new row's bounding box.
         * @returns The newly created QuadrantRow.
         */
        popQuadrantRow(callUpdate?: boolean): void {
            for (var i: number = 0; i < this.quadrantCols.length; i += 1) {
                this.quadrantCols[i].quadrants.pop();
            }

            this.numRows -= 1;
            this.quadrantRows.pop();

            if (callUpdate && this.onRemove) {
                this.onRemove("yInc", this.bottom, this.right, this.bottom - this.quadrantHeight, this.left);
            }

            this.bottom -= this.quadrantHeight;
        }

        /**
         * Removes the last QuadrantCol from the end of the quadrantCols Array.
         * 
         * @param callUpdate   Whether this should call the onRemove trigger 
         *                     with the new row's bounding box.
         */
        popQuadrantCol(callUpdate?: boolean): void {
            for (var i: number = 0; i < this.quadrantRows.length; i += 1) {
                this.quadrantRows[i].quadrants.pop();
            }

            this.numCols -= 1;
            this.quadrantCols.pop();

            if (callUpdate && this.onRemove) {
                this.onRemove("xDec", this.top, this.right - this.offsetY, this.bottom, this.right - this.quadrantWidth - this.offsetY);
            }

            this.right -= this.quadrantWidth;
        }

        /**
         * Adds a QuadrantRow to the beginning of the quadrantRows Array.
         * 
         * @param callUpdate   Whether this should call the onAdd trigger 
         *                     with the new row's bounding box.
         * @returns The newly created QuadrantRow.
         */
        unshiftQuadrantRow(callUpdate?: boolean): IQuadrantRow {
            var row: IQuadrantRow = this.createQuadrantRow(this.left, this.top - this.quadrantHeight),
                i: number;

            this.numRows += 1;
            this.quadrantRows.unshift(row);

            for (i = 0; i < this.quadrantCols.length; i += 1) {
                this.quadrantCols[i].quadrants.unshift(row.quadrants[i]);
            }

            this.top -= this.quadrantHeight;

            if (callUpdate && this.onAdd) {
                this.onAdd("yDec", this.top, this.right, this.top + this.quadrantHeight, this.left);
            }

            return row;
        }

        /**
         * Adds a QuadrantCol to the beginning of the quadrantCols Array.
         * 
         * @param callUpdate   Whether this should call the onAdd trigger 
         *                     with the new row's bounding box.
         * @returns The newly created QuadrantCol.
         */
        unshiftQuadrantCol(callUpdate?: boolean): IQuadrantCol {
            var col: IQuadrantCol = this.createQuadrantCol(this.left - this.quadrantWidth, this.top),
                i: number;

            this.numCols += 1;
            this.quadrantCols.unshift(col);

            for (i = 0; i < this.quadrantRows.length; i += 1) {
                this.quadrantRows[i].quadrants.unshift(col.quadrants[i]);
            }

            this.left -= this.quadrantWidth;

            if (callUpdate && this.onAdd) {
                this.onAdd("xDec", this.top, this.left, this.bottom, this.left + this.quadrantWidth);
            }

            return col;
        }

        /**
         * Removes a QuadrantRow from the beginning of the quadrantRows Array.
         * 
         * @param callUpdate   Whether this should call the onAdd trigger 
         *                     with the new row's bounding box.
         */
        shiftQuadrantRow(callUpdate?: boolean): void {
            for (var i: number = 0; i < this.quadrantCols.length; i += 1) {
                this.quadrantCols[i].quadrants.shift();
            }

            this.numRows -= 1;
            this.quadrantRows.pop();

            if (callUpdate && this.onRemove) {
                this.onRemove("yInc", this.top, this.right, this.top + this.quadrantHeight, this.left);
            }

            this.top += this.quadrantHeight;
        }

        /**
         * Removes a QuadrantCol from the beginning of the quadrantCols Array.
         * 
         * @param callUpdate   Whether this should call the onAdd trigger 
         *                     with the new row's bounding box.
         */
        shiftQuadrantCol(callUpdate?: boolean): void {
            for (var i: number = 0; i < this.quadrantRows.length; i += 1) {
                this.quadrantRows[i].quadrants.shift();
            }

            this.numCols -= 1;
            this.quadrantCols.pop();

            if (callUpdate && this.onRemove) {
                this.onRemove("xInc", this.top, this.left + this.quadrantWidth, this.bottom, this.left);
            }

            this.left += this.quadrantWidth;
        }


        /* Thing manipulations
        */

        /**
         * Determines the Quadrants for an entire Array of Things. This is done by
         * wiping each quadrant's memory of that Array's group type and determining
         * each Thing's quadrants.
         * 
         * @param group   The name of the group to have Quadrants determined.
         * @param things   The listing of Things in that group.
         */
        determineAllQuadrants(group: string, things: IThing[]): void {
            var row: number,
                col: number;

            for (row = 0; row < this.numRows; row += 1) {
                for (col = 0; col < this.numCols; col += 1) {
                    this.quadrantRows[row].quadrants[col].numthings[group] = 0;
                }
            }

            things.forEach(this.determineThingQuadrants.bind(this));
        }

        /**
         * Determines the Quadrants for a single Thing. The starting row and column
         * indices are calculated so every Quadrant within them should contain the
         * Thing. In the process, its old Quadrants and new Quadrants are marked as 
         * changed if it was.
         * 
         * @param thing   A Thing whose Quadrants are to be determined.
         */
        determineThingQuadrants(thing: IThing): void {
            var group: string = thing[this.keyGroupName],
                rowStart: number = this.findQuadrantRowStart(thing),
                colStart: number = this.findQuadrantColStart(thing),
                rowEnd: number = this.findQuadrantRowEnd(thing),
                colEnd: number = this.findQuadrantColEnd(thing),
                row: number,
                col: number;

            // Mark each of the Thing's Quadrants as changed
            // This is done first because the old Quadrants are changed
            if (thing[this.keyChanged]) {
                this.markThingQuadrantsChanged(thing);
            }

            // The Thing no longer has any Quadrants: rebuild them!
            thing[this.keyNumQuads] = 0;

            for (row = rowStart; row <= rowEnd; row += 1) {
                for (col = colStart; col <= colEnd; col += 1) {
                    this.setThingInQuadrant(thing, this.quadrantRows[row].quadrants[col], group);
                }
            }

            // The thing is no longer considered changed, since quadrants know it
            thing[this.keyChanged] = false;
        }

        /**
         * Sets a Thing to be inside a Quadrant. The two are marked so they can
         * recognize each other's existence later.
         * 
         * @param thing   A Thing to be placed in the Quadrant.
         * @param quadrant   A Quadrant that now contains the Thing.
         * @param group   The grouping under which the Quadrant should store the 
         *                Thing.
         */
        setThingInQuadrant(thing: IThing, quadrant: IQuadrant, group: string): void {
            // Mark the Quadrant in the Thing
            thing[this.keyQuadrants][thing[this.keyNumQuads]] = quadrant;
            thing[this.keyNumQuads] += 1;

            // Mark the Thing in the Quadrant
            quadrant.things[group][quadrant.numthings[group]] = thing;
            quadrant.numthings[group] += 1;

            // If necessary, mark the Quadrant as changed
            if (thing[this.keyChanged]) {
                quadrant[this.keyChanged] = true;
            }
        }


        /* Internal rearranging
        */

        /** 
         * Adjusts the offset measurements by checking if rows or columns have gone
         * over the limit, which requires rows or columns be removed and new ones
         * added.
         */
        private adjustOffsets(): void {
            // Quadrant shift: add to the right
            while (-this.offsetX > this.quadrantWidth) {
                this.shiftQuadrantCol(true);
                this.pushQuadrantCol(true);
                this.offsetX += this.quadrantWidth;
            }

            // Quadrant shift: add to the left
            while (this.offsetX > this.quadrantWidth) {
                this.popQuadrantCol(true);
                this.unshiftQuadrantCol(true);
                this.offsetX -= this.quadrantWidth;
            }

            // Quadrant shift: add to the bottom
            while (-this.offsetY > this.quadrantHeight) {
                this.unshiftQuadrantRow(true);
                this.pushQuadrantRow(true);
                this.offsetY += this.quadrantHeight;
            }

            // Quadrant shift: add to the top
            while (this.offsetY > this.quadrantHeight) {
                this.popQuadrantRow(true);
                this.unshiftQuadrantRow(true);
                this.offsetY -= this.quadrantHeight;
            }
        }

        /**
         * Shifts a Quadrant horizontally and vertically.
         * 
         * @param dx   How much to shift horizontally.
         * @param dy   How much to shift vertically.
         */
        private shiftQuadrant(quadrant: IQuadrant, dx: number, dy: number): void {
            quadrant.top += dy;
            quadrant.right += dx;
            quadrant.bottom += dy;
            quadrant.left += dx;
            quadrant[this.keyChanged] = true;
        }


        /* Quadrant placements
        */

        /**
         * Creates a new Quadrant using the internal ObjectMaker and sets its position.
         * 
         * @param left   The horizontal displacement of the Quadrant.
         * @param top   The vertical displacement of the Quadrant.
         * @returns The newly created Quadrant.
         */
        private createQuadrant(left: number, top: number): IQuadrant {
            var quadrant: IQuadrant = this.ObjectMaker.make("Quadrant"),
                i: number;

            quadrant[this.keyChanged] = true;
            quadrant.things = {};
            quadrant.numthings = {};

            for (i = 0; i < this.groupNames.length; i += 1) {
                quadrant.things[this.groupNames[i]] = [];
                quadrant.numthings[this.groupNames[i]] = 0;
            }

            quadrant.left = left;
            quadrant.top = top;
            quadrant.right = left + this.quadrantWidth;
            quadrant.bottom = top + this.quadrantHeight;

            return quadrant;
        }

        /**
         * Creates a QuadrantRow, with length determined by numCols.
         * 
         * @param left   The initial horizontal displacement of the col.
         * @param top   The vertical displacement of the col.
         * @returns The newly created QuadrantRow.
         */
        private createQuadrantRow(left: number = 0, top: number = 0): IQuadrantRow {
            var row: IQuadrantRow = {
                "left": left,
                "top": top,
                "quadrants": []
            },
                i: number;

            for (i = 0; i < this.numCols; i += 1) {
                row.quadrants.push(this.createQuadrant(left, top));
                left += this.quadrantWidth;
            }

            return row;
        }

        /**
         * Creates a QuadrantCol, with length determined by numRows.
         * 
         * @param left   The horizontal displacement of the col.
         * @param top   The initial vertical displacement of the col.
         * @returns The newly created QuadrantCol.
         */
        private createQuadrantCol(left: number, top: number): IQuadrantCol {
            var col: IQuadrantCol = {
                "left": left,
                "top": top,
                "quadrants": []
            },
                i: number;

            for (i = 0; i < this.numRows; i += 1) {
                col.quadrants.push(this.createQuadrant(left, top));
                top += this.quadrantHeight;
            }

            return col;
        }


        /* Position utilities
        */

        /**
         * @param thing   A Thing to check the bounding box of.
         * @returns The Thing's top position, accounting for vertical offset 
         *          if needed.
         */
        private getTop(thing: IThing): number {
            if (this.keyOffsetY) {
                return thing[this.keyTop] - Math.abs(thing[this.keyOffsetY]);
            } else {
                return thing[this.keyTop];
            }
        }

        /**
         * @param thing   A Thing to check the bounding box of.
         * @returns The Thing's right position, accounting for horizontal offset 
         *          if needed.
         */
        private getRight(thing: IThing): number {
            if (this.keyOffsetX) {
                return thing[this.keyRight] + Math.abs(thing[this.keyOffsetX]);
            } else {
                return thing[this.keyRight];
            }
        }

        /**
         * @param thing   A Thing to check the bounding box of.
         * @returns The Thing's bottom position, accounting for vertical 
         *          offset if needed.
         */
        private getBottom(thing: IThing): number {
            if (this.keyOffsetX) {
                return thing[this.keyBottom] + Math.abs(thing[this.keyOffsetY]);
            } else {
                return thing[this.keyBottom];
            }
        }

        /**
         * @param thing   A Thing to check the bounding box of.
         * @returns The Thing's left position, accounting for horizontal offset 
         *          if needed.
         */
        private getLeft(thing: IThing): number {
            if (this.keyOffsetX) {
                return thing[this.keyLeft] - Math.abs(thing[this.keyOffsetX]);
            } else {
                return thing[this.keyLeft];
            }
        }

        /** 
         * Marks all Quadrants a Thing is contained within as changed.
         */
        private markThingQuadrantsChanged(thing: IThing): void {
            for (var i: number = 0; i < thing[this.keyNumQuads]; i += 1) {
                thing[this.keyQuadrants][i][this.keyChanged] = true;
            }
        }

        /**
         * @param thing   A Thing to check the bounding box of.
         * @returns The index of the first row the Thing is inside.
         */
        private findQuadrantRowStart(thing: IThing): number {
            return Math.max(Math.floor((this.getTop(thing) - this.top) / this.quadrantHeight), 0);
        }

        /**
         * @param thing   A Thing to check the bounding box of.
         * @returns The index of the last row the Thing is inside.
         */
        private findQuadrantRowEnd(thing: IThing): number {
            return Math.min(Math.floor((this.getBottom(thing) - this.top) / this.quadrantHeight), this.numRows - 1);
        }

        /**
         * @param thing   A Thing to check the bounding box of.
         * @returns The index of the first column the Thing is inside.
         */
        private findQuadrantColStart(thing: IThing): number {
            return Math.max(Math.floor((this.getLeft(thing) - this.left) / this.quadrantWidth), 0);
        }

        /**
         * @param thing   A Thing to check the bounding box of.
         * @returns The index of the last column the Thing is inside.
         */
        private findQuadrantColEnd(thing: IThing): number {
            return Math.min(Math.floor((this.getRight(thing) - this.left) / this.quadrantWidth), this.numCols - 1);
        }
    }
}
