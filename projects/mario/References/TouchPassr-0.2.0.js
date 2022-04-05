/// <reference path="InputWritr-0.2.0.ts" />
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var TouchPassr;
(function (TouchPassr) {
    /**
     * Abstract class for on-screen controls. Element creation for .element
     * and .elementInner within the constrained position is provided.
     */
    var Control = (function () {
        /**
         * Resets the control by setting member variables and calling resetElement.
         *
         * @param InputWriter   The parent TouchPassr's InputWritr.
         * @param schema   The governing schema for this control.
         * @param styles   Any styles to add to the element.
         */
        function Control(InputWriter, schema, styles) {
            this.InputWriter = InputWriter;
            this.schema = schema;
            this.resetElement(styles);
        }
        /**
         * @returns The outer container element.
         */
        Control.prototype.getElement = function () {
            return this.element;
        };
        /**
         * @returns The inner container element.
         */
        Control.prototype.getElementInner = function () {
            return this.elementInner;
        };
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
        Control.prototype.createElement = function (tag) {
            var args = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                args[_i - 1] = arguments[_i];
            }
            var element = document.createElement(tag || "div"), i;
            // For each provided object, add those settings to the element
            for (i = 0; i < args.length; i += 1) {
                this.proliferateElement(element, args[i]);
            }
            return element;
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
        Control.prototype.proliferateElement = function (recipient, donor, noOverride) {
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
                            this.proliferateElement(recipient[i], setting);
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
                                this.proliferateElement(recipient[i], setting, noOverride);
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
         * Resets the container elements. In any inherited resetElement, this should
         * still be called, as it implements the schema's position.
         *
         * @param styles   Container styles for the contained elements.
         */
        Control.prototype.resetElement = function (styles, customType) {
            var _this = this;
            var position = this.schema.position, offset = position.offset;
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
            }
            else if (position.horizontal === "right") {
                this.element.style.right = "0";
            }
            else if (position.horizontal === "center") {
                this.element.style.left = "50%";
            }
            if (position.vertical === "top") {
                this.element.style.top = "0";
            }
            else if (position.vertical === "bottom") {
                this.element.style.bottom = "0";
            }
            else if (position.vertical === "center") {
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
            setTimeout(function () {
                if (position.horizontal === "center") {
                    _this.elementInner.style.left = _this.createHalfSizeMeasurement(_this.elementInner, "width", "offsetWidth");
                }
                if (position.vertical === "center") {
                    _this.elementInner.style.top = _this.createHalfSizeMeasurement(_this.elementInner, "height", "offsetHeight");
                }
            });
        };
        /**
         * Converts a String or Number into a CSS-ready String measurement.
         *
         * @param raw   A raw measurement, such as 7 or "7px" or "7em".
         * @returns The raw measurement as a CSS measurement.
         */
        Control.prototype.createPixelMeasurement = function (raw) {
            if (!raw) {
                return "0";
            }
            if (typeof raw === "number" || raw.constructor === Number) {
                return raw + "px";
            }
            return raw;
        };
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
        Control.prototype.createHalfSizeMeasurement = function (element, styleTag, attributeBackup) {
            var amountRaw, amount, units;
            amountRaw = element.style[styleTag] || (attributeBackup && element[attributeBackup]);
            if (!amountRaw) {
                return "0px";
            }
            amount = Number(amountRaw.replace(/[^\d]/g, "")) || 0;
            units = amountRaw.replace(/[\d]/g, "") || "px";
            return Math.round(amount / -2) + units;
        };
        /**
         * Passes a style schema to .element and .elementInner.
         *
         * @param styles   A container for styles to apply.
         */
        Control.prototype.passElementStyles = function (styles) {
            if (!styles) {
                return;
            }
            if (styles.element) {
                this.proliferateElement(this.element, styles.element);
            }
            if (styles.elementInner) {
                this.proliferateElement(this.elementInner, styles.elementInner);
            }
        };
        /**
         * Sets the rotation of an HTML element via CSS.
         *
         * @param element   An HTML element to rotate.
         * @param rotation   How many degrees to rotate the element.
         */
        Control.prototype.setRotation = function (element, rotation) {
            element.style.transform = "rotate(" + rotation + "deg)";
        };
        /**
         * Finds the position offset of an element relative to the page, factoring in
         * its parent elements' offsets recursively.
         *
         * @param element   An HTML element.
         * @returns The [left, top] offset of the element, in px.
         */
        Control.prototype.getOffsets = function (element) {
            var output;
            if (element.offsetParent && element !== element.offsetParent) {
                output = this.getOffsets(element.offsetParent);
                output[0] += element.offsetLeft;
                output[1] += element.offsetTop;
            }
            else {
                output = [element.offsetLeft, element.offsetTop];
            }
            return output;
        };
        return Control;
    })();
    TouchPassr.Control = Control;
})(TouchPassr || (TouchPassr = {}));
var TouchPassr;
(function (TouchPassr) {
    /**
     * Simple button control. It activates its triggers when the user presses
     * it or releases it, and contains a simple label.
     */
    var ButtonControl = (function (_super) {
        __extends(ButtonControl, _super);
        function ButtonControl() {
            _super.apply(this, arguments);
        }
        /**
         * Resets the elements by adding listeners for mouse and touch
         * activation and deactivation events.
         *
         * @param styles   Container styles for the contained elements.
         */
        ButtonControl.prototype.resetElement = function (styles) {
            var onActivated = this.onEvent.bind(this, "activated"), onDeactivated = this.onEvent.bind(this, "deactivated");
            _super.prototype.resetElement.call(this, styles, "Button");
            this.element.addEventListener("mousedown", onActivated);
            this.element.addEventListener("touchstart", onActivated);
            this.element.addEventListener("mouseup", onDeactivated);
            this.element.addEventListener("touchend", onDeactivated);
        };
        /**
         * Reaction callback for a triggered event.
         *
         * @param which   The pipe being activated, such as "activated"
         *                or "deactivated".
         * @param event   The triggered event.
         */
        ButtonControl.prototype.onEvent = function (which, event) {
            var events = this.schema.pipes[which], i, j;
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
        };
        return ButtonControl;
    })(TouchPassr.Control);
    TouchPassr.ButtonControl = ButtonControl;
})(TouchPassr || (TouchPassr = {}));
var TouchPassr;
(function (TouchPassr) {
    /**
     * Joystick control. An inner circle can be dragged to one of a number
     * of directions to trigger pipes on and off.
     */
    var JoystickControl = (function (_super) {
        __extends(JoystickControl, _super);
        function JoystickControl() {
            _super.apply(this, arguments);
        }
        /**
         * Resets the element by creating a tick for each direction, along with
         * the multiple circular elements with their triggers.
         *
         * @param styles   Container styles for the contained elements.
         */
        JoystickControl.prototype.resetElement = function (styles) {
            _super.prototype.resetElement.call(this, styles, "Joystick");
            var directions = this.schema.directions, element, degrees, sin, cos, dx, dy, i;
            this.proliferateElement(this.elementInner, {
                "style": {
                    "border-radius": "100%"
                }
            });
            // The visible circle is what is actually visible to the user
            this.elementCircle = this.createElement("div", {
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
                element = this.createElement("div", {
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
            this.elementDragLine = this.createElement("div", {
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
            this.elementDragShadow = this.createElement("div", {
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
        };
        /**
         * Enables dragging, showing the elementDragLine.
         */
        JoystickControl.prototype.positionDraggerEnable = function () {
            this.dragEnabled = true;
            this.elementDragLine.style.opacity = "1";
        };
        /**
         * Disables dragging, hiding the drag line and re-centering the
         * inner circle shadow.
         */
        JoystickControl.prototype.positionDraggerDisable = function () {
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
        };
        /**
         * Triggers a movement point for the joystick, and snaps the stick to
         * the nearest direction (based on the angle from the center to the point).
         *
         * @param event   A user-triggered event.
         */
        JoystickControl.prototype.triggerDragger = function (event) {
            event.preventDefault();
            if (!this.dragEnabled) {
                return;
            }
            var coordinates = this.getEventCoordinates(event), x = coordinates[0], y = coordinates[1], offsets = this.getOffsets(this.elementInner), midX = offsets[0] + this.elementInner.offsetWidth / 2, midY = offsets[1] + this.elementInner.offsetHeight / 2, dxRaw = (x - midX) | 0, dyRaw = (midY - y) | 0, thetaRaw = this.getThetaRaw(dxRaw, dyRaw), directionNumber = this.findClosestDirection(thetaRaw), direction = this.schema.directions[directionNumber], theta = direction.degrees, components = this.getThetaComponents(theta), dx = components[0], dy = -components[1];
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
        };
        /**
         * Finds the raw coordinates of an event, whether it's a drag (touch)
         * or mouse event.
         *
         * @returns The x- and y- coordinates of the event.
         */
        JoystickControl.prototype.getEventCoordinates = function (event) {
            if (event.type === "touchmove") {
                // TypeScript 1.5 doesn't seem to have TouchEvent yet.
                var touch = event.touches[0];
                return [touch.pageX, touch.pageY];
            }
            return [event.x, event.y];
        };
        /**
         * Finds the angle from a joystick center to an x and y. This assumes
         * straight up is 0, to the right is 90, down is 180, and left is 270.
         *
         * @returns The degrees to the given point.
         */
        JoystickControl.prototype.getThetaRaw = function (dxRaw, dyRaw) {
            // Based on the quadrant, theta changes...
            if (dxRaw > 0) {
                if (dyRaw > 0) {
                    // Quadrant I
                    return Math.atan(dxRaw / dyRaw) * 180 / Math.PI;
                }
                else {
                    // Quadrant II
                    return -Math.atan(dyRaw / dxRaw) * 180 / Math.PI + 90;
                }
            }
            else {
                if (dyRaw < 0) {
                    // Quadrant III
                    return Math.atan(dxRaw / dyRaw) * 180 / Math.PI + 180;
                }
                else {
                    // Quadrant IV
                    return -Math.atan(dyRaw / dxRaw) * 180 / Math.PI + 270;
                }
            }
        };
        /**
         * Converts an angle to its relative dx and dy coordinates.
         *
         * @param thetaRaw   The raw degrees of an anle.
         * @returns The x- and y- parts of an angle.
         */
        JoystickControl.prototype.getThetaComponents = function (thetaRaw) {
            var theta = thetaRaw * Math.PI / 180;
            return [Math.sin(theta), Math.cos(theta)];
        };
        /**
         * Finds the index of the closest direction to an angle.
         *
         * @param degrees   The degrees of an angle.
         * @returns The index of the closest known direction to the degrees.a
         */
        JoystickControl.prototype.findClosestDirection = function (degrees) {
            var directions = this.schema.directions, difference = Math.abs(directions[0].degrees - degrees), smallestDegrees = directions[0].degrees, smallestDegreesRecord = 0, record = 0, differenceTest, i;
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
        };
        /**
         * Sets the current direction of the joystick, calling the relevant
         * InputWriter pipes if necessary.
         *
         * @param direction   A new direction to face.
         * @param event   A user-triggered event.
         */
        JoystickControl.prototype.setCurrentDirection = function (direction, event) {
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
        };
        /**
         * Trigger for calling pipes when a new direction is set. All children
         * of the pipe has each of its keys triggered.
         *
         * @param pipes   Pipes to trigger.
         * @param event   A user-triggered event.
         */
        JoystickControl.prototype.onEvent = function (pipes, event) {
            var i, j;
            for (i in pipes) {
                if (!pipes.hasOwnProperty(i)) {
                    continue;
                }
                for (j = 0; j < pipes[i].length; j += 1) {
                    this.InputWriter.callEvent(i, pipes[i][j], event);
                }
            }
        };
        return JoystickControl;
    })(TouchPassr.Control);
    TouchPassr.JoystickControl = JoystickControl;
})(TouchPassr || (TouchPassr = {}));
var TouchPassr;
(function (TouchPassr_1) {
    "use strict";
    /**
     * A GUI touch layer layer on top of InputWritr that provides an extensible
     * API for adding touch-based control elements into an HTML element.
     */
    var TouchPassr = (function () {
        /**
         * Initializes a new instance of the TouchPassr class.
         *
         * @param settings   Settings to be used for initialization.
         */
        function TouchPassr(settings) {
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
            }
            else {
                this.enabled = settings.enabled;
            }
            this.enabled ? this.enable() : this.disable();
        }
        /* Simple gets
        */
        /**
         * @returns The InputWritr for controls to pipe event triggers to.
         */
        TouchPassr.prototype.getInputWriter = function () {
            return this.InputWriter;
        };
        /**
         * @returns Whether this is currently enabled and visually on the screen.
         */
        TouchPassr.prototype.getEnabled = function () {
            return this.enabled;
        };
        /**
         * @returns The root container for styles to be added to control elements.
         */
        TouchPassr.prototype.getStyles = function () {
            return this.styles;
        };
        /**
         * @returns The container for generated controls, keyed by their name.
         */
        TouchPassr.prototype.getControls = function () {
            return this.controls;
        };
        /**
         * @returns The HTMLElement all controls are placed within.
         */
        TouchPassr.prototype.getContainer = function () {
            return this.container;
        };
        /**
         * @returns The HTMLElement containing the controls container.
         */
        TouchPassr.prototype.getParentContainer = function () {
            return this.parentContainer;
        };
        /* Core functionality
        */
        /**
         * Enables the TouchPassr by showing the container.
         */
        TouchPassr.prototype.enable = function () {
            this.enabled = true;
            this.container.style.display = "block";
        };
        /**
         * Disables the TouchPassr by hiding the container.
         */
        TouchPassr.prototype.disable = function () {
            this.enabled = false;
            this.container.style.display = "none";
        };
        /**
         * Sets the parent container surrounding the controls container.
         *
         * @param parentElement   A new parent container.
         */
        TouchPassr.prototype.setParentContainer = function (parentElement) {
            this.parentContainer = parentElement;
            this.parentContainer.appendChild(this.container);
        };
        /**
         * Adds any number of controls to the internal listing and HTML container.
         *
         * @param schemas   Schemas for new controls to be made, keyed by name.
         */
        TouchPassr.prototype.addControls = function (schemas) {
            var i;
            for (i in schemas) {
                if (schemas.hasOwnProperty(i)) {
                    this.addControl(schemas[i]);
                }
            }
        };
        /**
         * Adds a control to the internal listing and HTML container.
         *
         * @param schema   The schema for the new control to be made.
         */
        TouchPassr.prototype.addControl = function (schema) {
            if (!TouchPassr.controlClasses.hasOwnProperty(schema.control)) {
                throw new Error("Unknown control schema: '" + schema.control + "'.");
            }
            var control = new TouchPassr.controlClasses[schema.control](this.InputWriter, schema, this.styles);
            this.controls[schema.name] = control;
            this.container.appendChild(control.getElement());
        };
        /* HTML manipulations
        */
        /**
         * Resets the base controls container. If a parent element is provided,
         * the container is added to it.
         *
         * @param parentContainer   A container element, such as from GameStartr.
         */
        TouchPassr.prototype.resetContainer = function (parentContainer) {
            this.container = TouchPassr_1.Control.prototype.createElement("div", {
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
        };
        /**
         * Known, allowed control classes, keyed by name.
         */
        TouchPassr.controlClasses = {
            "Button": TouchPassr_1.ButtonControl,
            "Joystick": TouchPassr_1.JoystickControl
        };
        return TouchPassr;
    })();
    TouchPassr_1.TouchPassr = TouchPassr;
})(TouchPassr || (TouchPassr = {}));
