/// <reference path="InputWritr-0.2.0.ts" />

declare namespace TouchPassr {
    /**
     * Schema for where a control should lay on the screen. 
     */
    export interface IPosition {
        /**
         * Vertical position, as "top", "bottom", or "center".
         */
        vertical: string;

        /**
         * Horizontal position, as "top", "right", "center".
         */
        horizontal: string;

        /**
         * Offset measurements to shift from the vertical and horizontal position.
         */
        offset?: IPositionOffset
    }

    /**
     * Offset measurements for a schema's position.
     */
    export interface IPositionOffset {
        /**
         * How much to shift horizontally, as a number or CSS-ready String measurement.
         */
        left?: number | string;
        
        /**
         * How much to shift vertically, as a number or CSS-ready String measurement.
         */
        top?: number | string;
    }

    /**
     * Global declaration of styles for all controls, typically passed from a
     * TouchPassr to its generated controls.
     */
    export interface IRootControlStyles {
        /**
         * Styles that apply to all controls.
         */
        global?: IControlStyles;

        /**
         * Specific controls, such as "Button", have styles keyed by control name.
         */
        [i: string]: IControlStyles;
    }

    /**
     * Container for control classes, keyed by name.
     */
    export interface IControlClassesContainer {
        [i: string]: typeof Control;
    }

    /**
     * Container for controls, keyed by name.
     */
    export interface IControlsContainer {
        [i: string]: Control<IControlSchema>;
    }

    /**
     * Container for control schemas, keyed by name.
     */
    export interface IControlSchemasContainer {
        [i: string]: IControlSchema;
    }
    
    /**
     * General container for element styles of a control. It should be extended
     * for more specific controls.
     */
    export interface IControlStyles {
        /**
         * Styles to apply to the primary (outer) control element.
         */
        element?: CSSRuleList;

        /**
         * Styles to apply to the inner control element.
         */
        elementInner?: CSSRuleList;
    }

    /**
     * Root schema to be followed for all controls. More specific schema versions
     * will extend this.
     */
    export interface IControlSchema {
        /**
         * What name this will be keyed under in the parent TouchPassr.
         */
        name: string;

        /**
         * The type of control this should create, such as "Button".
         */
        control: string;

        /**
         * Where the generated code should be on the screen.
         */
        position: IPosition;

        /**
         * A label to display in the control.
         */
        label?: string;

        /**
         * Additional styles to pass to the control.
         */
        styles?: IControlStyles;
    }

    /**
     * Schema for how a control should interact with its InputWriter. Each member key
     * is the control action, which is linked to any number of InputWriter events, each
     * of which contains any number of key codes to send. 
     */
    export interface IPipes {
        /**
         * Event triggers to pass when a control is activated.
         */
        activated?: {
            [i: string]: (string | number)[]
        };

        /**
         * Event triggers to pass when a control is deactivated.
         */
        deactivated?: {
            [i: string]: (string | number)[]
        };
    }

    /**
     * Settings to initialize a new ITouchPassr.
     */
    export interface ITouchPassrSettings {
        /**
         * An InputWritr for controls to pipe event triggers to.
         */
        InputWriter: InputWritr.IInputWritr;
        
        /**
         * An HTMLElement all controls are placed within.
         */
        container?: HTMLElement;
        
        /**
         * Root container for styles to be added to control elements.
         */
        styles?: IRootControlStyles;

        /**
         * Container for generated controls, keyed by their name.
         */
        controls?: IControlSchemasContainer;
        
        /**
         * Whether this is currently enabled and visually on the screen.
         */
        enabled?: boolean;
    }

    /**
     * A GUI touch layer layer on top of InputWritr that provides an extensible
     * API for adding touch-based control elements into an HTML element.
     */
    export interface ITouchPassr {
        /**
         * @returns The InputWritr for controls to pipe event triggers to.
         */
        getInputWriter(): InputWritr.IInputWritr;

        /**
         * @returns Whether this is currently enabled and visually on the screen.
         */
        getEnabled(): boolean;

        /**
         * @returns The root container for styles to be added to control elements.
         */
        getStyles(): IRootControlStyles;

        /**
         * @returns The container for generated controls, keyed by their name.
         */
        getControls(): IControlsContainer;

        /**
         * @returns The HTMLElement all controls are placed within.
         */
        getContainer(): HTMLElement;

        /**
         * @returns The HTMLElement containing the controls container.
         */
        getParentContainer(): HTMLElement;

        /**
         * Enables the TouchPassr by showing the container.
         */
        enable(): void;

        /**
         * Disables the TouchPassr by hiding the container.
         */
        disable(): void;

        /**
         * Sets the parent container surrounding the controls container.
         * 
         * @param parentElement   A new parent container.
         */
        setParentContainer(parentElement: HTMLElement): void;

        /**
         * Adds any number of controls to the internal listing and HTML container.
         * 
         * @param schemas   Schemas for new controls to be made, keyed by name.
         */
        addControls(schemas: IControlSchemasContainer): void;

        /**
         * Adds a control to the internal listing and HTML container.
         * 
         * @param schema   The schema for the new control to be made.
         */
        addControl(schema: IControlSchema): void;
    }
}

namespace TouchPassr {
    /**
     * Abstract class for on-screen controls. Element creation for .element
     * and .elementInner within the constrained position is provided.
     */
    export class Control<T extends IControlSchema> {
        /**
         * The parent TouchPassr's InputWritr. Pipe events are sent through here.
         */
        protected InputWriter: InputWritr.IInputWritr;

        /**
         * The governing schema for this control. It should be overriden as a more
         * specific shema in child classes.
         */
        protected schema: T;

        /**
         * The outer container element. It should have width and height of 0, so
         * it can be positioned using the schema's .position.
         */
        protected element: HTMLElement;

        /**
         * The inner container element, directly inside the outer container. It 
         * should be positioned absolutely so its center is the outer container.
         */
        protected elementInner: HTMLElement;

        /**
         * Resets the control by setting member variables and calling resetElement.
         * 
         * @param InputWriter   The parent TouchPassr's InputWritr.
         * @param schema   The governing schema for this control.
         * @param styles   Any styles to add to the element.
         */
        constructor(InputWriter: InputWritr.IInputWritr, schema: T, styles: IRootControlStyles) {
            this.InputWriter = InputWriter;
            this.schema = schema;
            this.resetElement(styles);
        }

        /**
         * @returns The outer container element.
         */
        public getElement(): HTMLElement {
            return this.element;
        }

        /**
         * @returns The inner container element.
         */
        public getElementInner(): HTMLElement {
            return this.elementInner;
        }

        /**
         * Creates and returns an HTMLElement of the specified type. Any additional
         * settings Objects may be given to be proliferated onto the Element via
         * proliferateElement.
         * 
         * @param type   The tag of the Element to be created.
         * @param settings   Additional settings for the Element, such as className 
         *                   or style.
         * @returns A newly created HTMLElement of the specified type.
         */
        public createElement(tag: string, ...args: any[]): HTMLElement {
            var element: any = document.createElement(tag || "div"),
                i: number;

            // For each provided object, add those settings to the element
            for (i = 0; i < args.length; i += 1) {
                this.proliferateElement(element, args[i]);
            }

            return element;
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
                            this.proliferateElement(recipient[i], setting);
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
                                this.proliferateElement(recipient[i], setting, noOverride);
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
         * Resets the container elements. In any inherited resetElement, this should
         * still be called, as it implements the schema's position.
         * 
         * @param styles   Container styles for the contained elements.
         */
        protected resetElement(styles: IRootControlStyles, customType?: string): void {
            var position: IPosition = this.schema.position,
                offset: any = position.offset;

            this.element = this.createElement("div", {
                "className": "control",
                "style": {
                    "position": "absolute",
                    "width": 0,
                    "height": 0,
                    "boxSizing": "border-box",
                    "opacity": ".84"
                }
            });
            this.elementInner = this.createElement("div", {
                "className": "control-inner",
                "textContent": this.schema.label || "",
                "style": {
                    "position": "absolute",
                    "boxSizing": "border-box",
                    "textAlign": "center"
                }
            });
            this.element.appendChild(this.elementInner);

            if (position.horizontal === "left") {
                this.element.style.left = "0";
            } else if (position.horizontal === "right") {
                this.element.style.right = "0";
            } else if (position.horizontal === "center") {
                this.element.style.left = "50%";
            }

            if (position.vertical === "top") {
                this.element.style.top = "0";
            } else if (position.vertical === "bottom") {
                this.element.style.bottom = "0";
            } else if (position.vertical === "center") {
                this.element.style.top = "50%";
            }

            this.passElementStyles(styles.global);
            this.passElementStyles(styles[customType]);
            this.passElementStyles(this.schema.styles);

            if (offset.left) {
                this.elementInner.style.marginLeft = this.createPixelMeasurement(offset.left);
            }

            if (offset.top) {
                this.elementInner.style.marginTop = this.createPixelMeasurement(offset.top);
            }

            // elementInner's center-based positioning must wait until its total width is done setting
            setTimeout((): void => {
                if (position.horizontal === "center") {
                    this.elementInner.style.left = this.createHalfSizeMeasurement(this.elementInner, "width", "offsetWidth");
                }
                if (position.vertical === "center") {
                    this.elementInner.style.top = this.createHalfSizeMeasurement(this.elementInner, "height", "offsetHeight");
                }
            });
        }

        /**
         * Converts a String or Number into a CSS-ready String measurement.
         * 
         * @param raw   A raw measurement, such as 7 or "7px" or "7em".
         * @returns The raw measurement as a CSS measurement.
         */
        protected createPixelMeasurement(raw: string | number): string {
            if (!raw) {
                return "0";
            }

            if (typeof raw === "number" || raw.constructor === Number) {
                return raw + "px";
            }

            return <string>raw;
        }

        /**
         * Determines a "half"-measurement that would center an element based on the
         * specified units.
         * 
         * @param element   The element whose half-size should be computed.
         * @param styleTag   The initial CSS measurement to check for, as "width" or 
         *                   "height".
         * @param attributeBackup   A measurement to check for if the CSS size is falsy,
         *                          as "offsetWidth" or "offsetHeight".
         * @returns A measurement equal to half the sytleTag/attributeBackup, such as 
         *          "3.5em" or "10px".
         */
        protected createHalfSizeMeasurement(element: HTMLElement, styleTag: string, attributeBackup: string): string {
            var amountRaw: string,
                amount: number,
                units: string;

            amountRaw = element.style[styleTag] || (attributeBackup && element[attributeBackup]);
            if (!amountRaw) {
                return "0px";
            }

            amount = Number(amountRaw.replace(/[^\d]/g, "")) || 0;
            units = amountRaw.replace(/[\d]/g, "") || "px";

            return Math.round(amount / -2) + units;
        }

        /**
         * Passes a style schema to .element and .elementInner.
         * 
         * @param styles   A container for styles to apply.  
         */
        protected passElementStyles(styles: IControlStyles): void {
            if (!styles) {
                return;
            }

            if (styles.element) {
                this.proliferateElement(this.element, styles.element);
            }

            if (styles.elementInner) {
                this.proliferateElement(this.elementInner, styles.elementInner);
            }
        }

        /**
         * Sets the rotation of an HTML element via CSS.
         * 
         * @param element   An HTML element to rotate.
         * @param rotation   How many degrees to rotate the element.
         */
        protected setRotation(element: HTMLElement, rotation: number): void {
            element.style.transform = "rotate(" + rotation + "deg)";
        }

        /**
         * Finds the position offset of an element relative to the page, factoring in 
         * its parent elements' offsets recursively.
         * 
         * @param element   An HTML element.
         * @returns The [left, top] offset of the element, in px. 
         */
        protected getOffsets(element: HTMLElement): [number, number] {
            var output: [number, number];

            if (element.offsetParent && element !== element.offsetParent) {
                output = this.getOffsets(<HTMLElement>element.offsetParent);
                output[0] += element.offsetLeft;
                output[1] += element.offsetTop;
            } else {
                output = [element.offsetLeft, element.offsetTop];
            }

            return output;
        }
    }
}

namespace TouchPassr {
    /**
     * Control schema for a simple button. Pipes are activated on press and on release.
     */
    export interface IButtonSchema extends IControlSchema {
        /**
         * Pipe descriptions for what should be sent to the InputWritr.
         */
        pipes?: IPipes;
    }
    
    /**
     * Styles schema for a button control.
     */
    export type IButtonStyles = IControlStyles

    /**
     * Global declaration of styles for all controls, typically passed from a
     * TouchPassr to its generated controls.
     */
    export interface IRootControlStyles {
        /**
         * Styles that apply to Button controls.
         */
        Button?: IButtonStyles;
    }

    /**
     * Simple button control. It activates its triggers when the user presses
     * it or releases it, and contains a simple label.
     */
    export class ButtonControl extends Control<IButtonSchema> {
        /**
         * Resets the elements by adding listeners for mouse and touch 
         * activation and deactivation events.
         * 
         * @param styles   Container styles for the contained elements.
         */
        protected resetElement(styles: IRootControlStyles): void {
            var onActivated: any = this.onEvent.bind(this, "activated"),
                onDeactivated: any = this.onEvent.bind(this, "deactivated");

            super.resetElement(styles, "Button");

            this.element.addEventListener("mousedown", onActivated);
            this.element.addEventListener("touchstart", onActivated);

            this.element.addEventListener("mouseup", onDeactivated);
            this.element.addEventListener("touchend", onDeactivated);
        }

        /**
         * Reaction callback for a triggered event.
         * 
         * @param which   The pipe being activated, such as "activated"
         *                or "deactivated".
         * @param event   The triggered event.
         */
        protected onEvent(which: string, event: Event): void {
            var events: any = (<IButtonSchema>this.schema).pipes[which],
                i: string,
                j: number;

            if (!events) {
                return;
            }

            for (i in events) {
                if (!events.hasOwnProperty(i)) {
                    continue;
                }

                for (j = 0; j < events[i].length; j += 1) {
                    this.InputWriter.callEvent(i, events[i][j], event);
                }
            }
        }
    }
}

namespace TouchPassr {
    /**
     * Control schema for a joystick. It may have any number of directions that it
     * will snap to, each of which will have its own pipes.
     */
    export interface IJoystickSchema extends IControlSchema {
        /**
         * Direction ticks to display on the control.
         */
        directions: IJoystickDirection[];
    }

    /**
     * Schema for a single direction for a joystick. It will be represented as a tick
     * on the joystick that the control will snap its direction to.
     */
    export interface IJoystickDirection {
        /**
         * The unique name of this direction, such as "Up".
         */
        name: string;

        /**
         * What degree measurement to place the tick at.
         */
        degrees: number;
        
        /**
         * Pipe descriptions for what should be sent to the InputWritr.
         */
        pipes?: IPipes;
    }
    
    /**
     * Styles schema for a joystick control, adding its ticks and indicator elements.
     */
    export interface IJoystickStyles extends IControlStyles {
        /**
         * Styles for the round circle elements.
         */
        circle?: IControlStyles;

        /**
         * Styles for the individual "tick" elements.
         */
        tick?: IControlStyles;

        /**
         * Styles for the dragging line element.
         */
        dragLine?: IControlStyles;

        /**
         * Styles for the outer shadow element.
         */
        dragShadow?: IControlStyles;
    }

    /**
     * Global declaration of styles for all controls, typically passed from a
     * TouchPassr to its generated controls.
     */
    export interface IRootControlStyles {
        /**
         * Styles that apply to Joystick controls.
         */
        Joystick?: IJoystickStyles;
    }

    /**
     * Joystick control. An inner circle can be dragged to one of a number
     * of directions to trigger pipes on and off.
     */
    export class JoystickControl extends Control<IJoystickSchema> {
        /**
         * The large inner circle that visually surrounds the ticks and other
         * inner elements.
         */
        protected elementCircle: HTMLDivElement;

        /**
         * The normally hidden tick to display a snapped direction.
         */
        protected elementDragLine: HTMLDivElement;

        /**
         * The normally hidden circle that emulates the outer part of a joystick.
         */
        protected elementDragShadow: HTMLDivElement;

        /**
         * Whether dragging is currently enabled, generally by the user starting
         * an interation event with touch or a mouse.
         */
        protected dragEnabled: boolean;

        /**
         * The currently snaped direction, if dragEnabled is true.
         */
        protected currentDirection: IJoystickDirection;

        /**
         * Resets the element by creating a tick for each direction, along with
         * the multiple circular elements with their triggers.
         * 
         * @param styles   Container styles for the contained elements.
         */
        protected resetElement(styles: IRootControlStyles): void {
            super.resetElement(styles, "Joystick");

            var directions: IJoystickDirection[] = (<IJoystickSchema>this.schema).directions,
                element: HTMLDivElement,
                degrees: number,
                sin: number,
                cos: number,
                dx: number,
                dy: number,
                i: number;

            this.proliferateElement(this.elementInner, {
                "style": {
                    "border-radius": "100%"
                }
            });

            // The visible circle is what is actually visible to the user
            this.elementCircle = <HTMLDivElement>this.createElement("div", {
                "className": "control-inner control-joystick-circle",
                "style": {
                    "position": "absolute",
                    "background": "red",
                    "borderRadius": "100%"
                }
            });
            this.proliferateElement(this.elementCircle, styles.Joystick.circle);

            // Each direction creates a "tick" element, like on a clock
            for (i = 0; i < directions.length; i += 1) {
                degrees = directions[i].degrees;

                // sin and cos are an amount / 1 the tick is offset from the center
                sin = Math.sin(degrees * Math.PI / 180);
                cos = Math.cos(degrees * Math.PI / 180);

                // dx and dy are measured as percent from the center, based on sin & cos
                dx = cos * 50 + 50;
                dy = sin * 50 + 50;

                element = <HTMLDivElement>this.createElement("div", {
                    "className": "control-joystick-tick",
                    "style": {
                        "position": "absolute",
                        "left": dx + "%",
                        "top": dy + "%",
                        "marginLeft": (-cos * 5 - 5) + "px",
                        "marginTop": (-sin * 2 - 1) + "px"
                    }
                });

                this.proliferateElement(element, styles.Joystick.tick);
                this.setRotation(element, degrees);

                this.elementCircle.appendChild(element);
            }

            // In addition to the ticks, a drag element shows current direction
            this.elementDragLine = <HTMLDivElement>this.createElement("div", {
                "className": "control-joystick-drag-line",
                "style": {
                    "position": "absolute",
                    "opacity": "0",
                    "top": ".77cm",
                    "left": ".77cm"
                }
            });
            this.proliferateElement(this.elementDragLine, styles.Joystick.dragLine);
            this.elementCircle.appendChild(this.elementDragLine);

            // A shadow-like circle supports the drag effect
            this.elementDragShadow = <HTMLDivElement>this.createElement("div", {
                "className": "control-joystick-drag-shadow",
                "style": {
                    "position": "absolute",
                    "opacity": "1",
                    "top": "14%",
                    "right": "14%",
                    "bottom": "14%",
                    "left": "14%",
                    "marginLeft": "0",
                    "marginTop": "0",
                    "borderRadius": "100%"
                }
            });
            this.proliferateElement(this.elementDragShadow, styles.Joystick.dragShadow);
            this.elementCircle.appendChild(this.elementDragShadow);

            this.elementInner.appendChild(this.elementCircle);

            this.elementInner.addEventListener("click", this.triggerDragger.bind(this));
            this.elementInner.addEventListener("touchmove", this.triggerDragger.bind(this));
            this.elementInner.addEventListener("mousemove", this.triggerDragger.bind(this));

            this.elementInner.addEventListener("mouseover", this.positionDraggerEnable.bind(this));
            this.elementInner.addEventListener("touchstart", this.positionDraggerEnable.bind(this));

            this.elementInner.addEventListener("mouseout", this.positionDraggerDisable.bind(this));
            this.elementInner.addEventListener("touchend", this.positionDraggerDisable.bind(this));
        }

        /**
         * Enables dragging, showing the elementDragLine.
         */
        protected positionDraggerEnable(): void {
            this.dragEnabled = true;
            this.elementDragLine.style.opacity = "1";
        }

        /**
         * Disables dragging, hiding the drag line and re-centering the 
         * inner circle shadow.
         */
        protected positionDraggerDisable(): void {
            this.dragEnabled = false;
            this.elementDragLine.style.opacity = "0";

            this.elementDragShadow.style.top = "14%";
            this.elementDragShadow.style.right = "14%";
            this.elementDragShadow.style.bottom = "14%";
            this.elementDragShadow.style.left = "14%";

            if (this.currentDirection) {
                if (this.currentDirection.pipes && this.currentDirection.pipes.deactivated) {
                    this.onEvent(this.currentDirection.pipes.deactivated, event);
                }

                this.currentDirection = undefined;
            }
        }

        /**
         * Triggers a movement point for the joystick, and snaps the stick to
         * the nearest direction (based on the angle from the center to the point).
         * 
         * @param event   A user-triggered event.
         */
        protected triggerDragger(event: DragEvent | MouseEvent): void {
            event.preventDefault();

            if (!this.dragEnabled) {
                return;
            }

            var coordinates: number[] = this.getEventCoordinates(event),
                x: number = coordinates[0],
                y: number = coordinates[1],
                offsets: number[] = this.getOffsets(this.elementInner),
                midX: number = offsets[0] + this.elementInner.offsetWidth / 2,
                midY: number = offsets[1] + this.elementInner.offsetHeight / 2,
                dxRaw: number = (x - midX) | 0,
                dyRaw: number = (midY - y) | 0,
                thetaRaw: number = this.getThetaRaw(dxRaw, dyRaw),
                directionNumber: number = this.findClosestDirection(thetaRaw),
                direction: IJoystickDirection = (<IJoystickSchema>this.schema).directions[directionNumber],
                theta: number = direction.degrees,
                components: number[] = this.getThetaComponents(theta),
                dx: number = components[0],
                dy: number = -components[1];

            // Ensure theta is above 0, and offset it by 90 for visual rotation
            theta = (theta + 450) % 360;

            this.elementDragLine.style.marginLeft = ((dx * 77) | 0) + "%";
            this.elementDragLine.style.marginTop = ((dy * 77) | 0) + "%";

            this.elementDragShadow.style.top = ((14 + dy * 10) | 0) + "%";
            this.elementDragShadow.style.right = ((14 - dx * 10) | 0) + "%";
            this.elementDragShadow.style.bottom = ((14 - dy * 10) | 0) + "%";
            this.elementDragShadow.style.left = ((14 + dx * 10) | 0) + "%";

            this.setRotation(this.elementDragLine, theta);
            this.positionDraggerEnable();

            this.setCurrentDirection(direction, event);
        }

        /**
         * Finds the raw coordinates of an event, whether it's a drag (touch)
         * or mouse event.
         * 
         * @returns The x- and y- coordinates of the event.
         */
        protected getEventCoordinates(event: DragEvent | MouseEvent): number[] {
            if (event.type === "touchmove") {
                // TypeScript 1.5 doesn't seem to have TouchEvent yet.
                var touch: any = (<any>event).touches[0];
                return [touch.pageX, touch.pageY];
            }

            return [(<MouseEvent>event).x, (<MouseEvent>event).y];
        }

        /**
         * Finds the angle from a joystick center to an x and y. This assumes 
         * straight up is 0, to the right is 90, down is 180, and left is 270.
         * 
         * @returns The degrees to the given point.
         */
        protected getThetaRaw(dxRaw: number, dyRaw: number): number {
            // Based on the quadrant, theta changes...
            if (dxRaw > 0) {
                if (dyRaw > 0) {
                    // Quadrant I
                    return Math.atan(dxRaw / dyRaw) * 180 / Math.PI;
                } else {
                    // Quadrant II
                    return -Math.atan(dyRaw / dxRaw) * 180 / Math.PI + 90;
                }
            } else {
                if (dyRaw < 0) {
                    // Quadrant III
                    return Math.atan(dxRaw / dyRaw) * 180 / Math.PI + 180;
                } else {
                    // Quadrant IV
                    return -Math.atan(dyRaw / dxRaw) * 180 / Math.PI + 270;
                }
            }
        }

        /**
         * Converts an angle to its relative dx and dy coordinates.
         * 
         * @param thetaRaw   The raw degrees of an anle.
         * @returns The x- and y- parts of an angle.
         */
        protected getThetaComponents(thetaRaw: number): [number, number] {
            var theta: number = thetaRaw * Math.PI / 180;
            return [Math.sin(theta), Math.cos(theta)];
        }

        /**
         * Finds the index of the closest direction to an angle. 
         * 
         * @param degrees   The degrees of an angle.
         * @returns The index of the closest known direction to the degrees.a
         */
        protected findClosestDirection(degrees: number): number {
            var directions: IJoystickDirection[] = (<IJoystickSchema>this.schema).directions,
                difference: number = Math.abs(directions[0].degrees - degrees),
                smallestDegrees: number = directions[0].degrees,
                smallestDegreesRecord: number = 0,
                record: number = 0,
                differenceTest: number,
                i: number;

            // Find the direction with the smallest difference in degrees
            for (i = 1; i < directions.length; i += 1) {
                differenceTest = Math.abs(directions[i].degrees - degrees);
                if (differenceTest < difference) {
                    difference = differenceTest;
                    record = i;
                }
                if (directions[i].degrees < smallestDegrees) {
                    smallestDegrees = directions[i].degrees;
                    smallestDegreesRecord = i;
                }
            }

            // 359 is closer to 360 than 0, so pretend the smallest is above 360
            differenceTest = Math.abs(smallestDegrees + 360 - degrees);
            if (differenceTest < difference) {
                difference = differenceTest;
                record = smallestDegreesRecord;
            }

            return record;
        }

        /**
         * Sets the current direction of the joystick, calling the relevant 
         * InputWriter pipes if necessary.
         * 
         * @param direction   A new direction to face.
         * @param event   A user-triggered event.
         */
        protected setCurrentDirection(direction: IJoystickDirection, event?: Event): void {
            if (this.currentDirection === direction) {
                return;
            }

            if (this.currentDirection && this.currentDirection.pipes && this.currentDirection.pipes.deactivated) {
                this.onEvent(this.currentDirection.pipes.deactivated, event);
            }

            if (direction.pipes && direction.pipes.activated) {
                this.onEvent(direction.pipes.activated, event);
            }

            this.currentDirection = direction;
        }

        /**
         * Trigger for calling pipes when a new direction is set. All children
         * of the pipe has each of its keys triggered.
         * 
         * @param pipes   Pipes to trigger.
         * @param event   A user-triggered event.
         */
        protected onEvent(pipes: IPipes, event?: Event): void {
            var i: string,
                j: number;

            for (i in pipes) {
                if (!pipes.hasOwnProperty(i)) {
                    continue;
                }

                for (j = 0; j < pipes[i].length; j += 1) {
                    this.InputWriter.callEvent(i, pipes[i][j], event);
                }
            }
        }
    }
}


namespace TouchPassr {
    "use strict";

    /**
     * A GUI touch layer layer on top of InputWritr that provides an extensible
     * API for adding touch-based control elements into an HTML element.
     */
    export class TouchPassr implements ITouchPassr {
        /**
         * Known, allowed control classes, keyed by name.
         */
        private static controlClasses: IControlClassesContainer = {
            "Button": ButtonControl,
            "Joystick": JoystickControl
        };

        /**
         * An InputWritr for controls to pipe event triggers to.
         */
        private InputWriter: InputWritr.IInputWritr;

        /**
         * Whether this is currently enabled and visually on the screen.
         */
        private enabled: boolean;

        /**
         * Root container for styles to be added to control elements.
         */
        private styles: IRootControlStyles;

        /**
         * Container for generated controls, keyed by their name.
         */
        private controls: IControlsContainer;

        /**
         * An HTMLElement all controls are placed within.
         */
        private container: HTMLElement;

        /**
         * HTMLElement containing the controls container.
         */
        private parentContainer: HTMLElement;

        /**
         * Initializes a new instance of the TouchPassr class.
         * 
         * @param settings   Settings to be used for initialization.
         */
        constructor(settings: ITouchPassrSettings) {
            if (typeof settings === "undefined") {
                throw new Error("No settings object given to TouchPassr.");
            }
            if (typeof settings.InputWriter === "undefined") {
                throw new Error("No InputWriter given to TouchPassr.");
            }

            this.InputWriter = settings.InputWriter;
            this.styles = settings.styles || {};

            this.resetContainer(settings.container);

            this.controls = {};
            if (settings.controls) {
                this.addControls(settings.controls);
            }

            if (typeof settings.enabled === "undefined") {
                this.enabled = true;
            } else {
                this.enabled = settings.enabled;
            }

            this.enabled ? this.enable() : this.disable();
        }


        /* Simple gets
        */

        /**
         * @returns The InputWritr for controls to pipe event triggers to.
         */
        getInputWriter(): InputWritr.IInputWritr {
            return this.InputWriter;
        }

        /**
         * @returns Whether this is currently enabled and visually on the screen.
         */
        getEnabled(): boolean {
            return this.enabled;
        }

        /**
         * @returns The root container for styles to be added to control elements.
         */
        getStyles(): IRootControlStyles {
            return this.styles;
        }

        /**
         * @returns The container for generated controls, keyed by their name.
         */
        getControls(): IControlsContainer {
            return this.controls;
        }

        /**
         * @returns The HTMLElement all controls are placed within.
         */
        getContainer(): HTMLElement {
            return this.container;
        }

        /**
         * @returns The HTMLElement containing the controls container.
         */
        getParentContainer(): HTMLElement {
            return this.parentContainer;
        }


        /* Core functionality
        */

        /**
         * Enables the TouchPassr by showing the container.
         */
        enable(): void {
            this.enabled = true;
            this.container.style.display = "block";
        }

        /**
         * Disables the TouchPassr by hiding the container.
         */
        disable(): void {
            this.enabled = false;
            this.container.style.display = "none";
        }

        /**
         * Sets the parent container surrounding the controls container.
         * 
         * @param parentElement   A new parent container.
         */
        setParentContainer(parentElement: HTMLElement): void {
            this.parentContainer = parentElement;
            this.parentContainer.appendChild(this.container);
        }

        /**
         * Adds any number of controls to the internal listing and HTML container.
         * 
         * @param schemas   Schemas for new controls to be made, keyed by name.
         */
        addControls(schemas: IControlSchemasContainer): void {
            var i: string;

            for (i in schemas) {
                if (schemas.hasOwnProperty(i)) {
                    this.addControl(schemas[i]);
                }
            }
        }

        /**
         * Adds a control to the internal listing and HTML container.
         * 
         * @param schema   The schema for the new control to be made.
         */
        addControl<T extends IControlSchema>(schema: T): void {
            if (!TouchPassr.controlClasses.hasOwnProperty(schema.control)) {
                throw new Error("Unknown control schema: '" + schema.control + "'.");
            }

            var control: Control<T> = new TouchPassr.controlClasses[schema.control](this.InputWriter, schema, this.styles);


            this.controls[schema.name] = control;
            this.container.appendChild(control.getElement());
        }


        /* HTML manipulations
        */

        /**
         * Resets the base controls container. If a parent element is provided,
         * the container is added to it.
         * 
         * @param parentContainer   A container element, such as from GameStartr.
         */
        private resetContainer(parentContainer?: HTMLElement): void {
            this.container = Control.prototype.createElement("div", {
                "className": "touch-passer-container",
                "style": {
                    "position": "absolute",
                    "top": 0,
                    "right": 0,
                    "bottom": 0,
                    "left": 0
                }
            });

            if (parentContainer) {
                this.setParentContainer(parentContainer);
            }
        }
    }
}
