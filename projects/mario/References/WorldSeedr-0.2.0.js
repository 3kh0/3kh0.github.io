var WorldSeedr;
(function (WorldSeedr) {
    "use strict";
    /**
     * Utility to generate distances based on possibility schemas.
     */
    var SpacingCalculator = (function () {
        /**
         * Initializes a new instance of the SpacingCalculator class.
         *
         * @param randomBetween
         * @param chooseAmong
         */
        function SpacingCalculator(randomBetween, chooseAmong) {
            this.randomBetween = randomBetween;
            this.chooseAmong = chooseAmong;
        }
        /**
         * Computes a distance from any description of distance possibilities.
         *
         * @param spacing   Any sort of description for a unit of distance.
         * @returns A valid distance for the given spacing description.
         */
        SpacingCalculator.prototype.calculateFromSpacing = function (spacing) {
            if (!spacing) {
                return 0;
            }
            switch (spacing.constructor) {
                case Array:
                    // Case: [min, max]
                    if (spacing[0].constructor === Number) {
                        return this.randomBetween(spacing[0], spacing[1]);
                    }
                    // Case: IPossibilitySpacingOption[]
                    return this.calculateFromPossibilities(spacing);
                case Object:
                    // Case: IPossibilitySpacing
                    return this.calculateFromPossibility(spacing);
                case Number:
                    // Case: Number
                    return spacing;
                default:
                    throw new Error("Unknown spacing requested: '" + spacing + "'.");
            }
        };
        /**
         * Computes a distance from any description of distance possibilities.
         *
         * @param spacing   A description of a range of possibilities for spacing.
         * @returns A valid distance for the given spacing description.
         */
        SpacingCalculator.prototype.calculateFromPossibility = function (spacing) {
            var spacingObject = spacing, min = spacingObject.min, max = spacingObject.max, units = spacingObject.units || 1;
            return this.randomBetween(min / units, max / units) * units;
        };
        /**
         * Computes a distance from any description of distance possibilities.
         *
         * @param spacing   Descriptions of ranges of possibilities for spacing.
         * @returns A valid distance for the given spacing description.
         */
        SpacingCalculator.prototype.calculateFromPossibilities = function (spacing) {
            return this.calculateFromPossibility(this.chooseAmong(spacing).value);
        };
        return SpacingCalculator;
    })();
    WorldSeedr.SpacingCalculator = SpacingCalculator;
})(WorldSeedr || (WorldSeedr = {}));
var WorldSeedr;
(function (WorldSeedr_1) {
    "use strict";
    /**
     * A constant listing of direction opposites, like top-bottom.
     */
    var directionOpposites = {
        "top": "bottom",
        "right": "left",
        "bottom": "top",
        "left": "right"
    };
    /**
     * A constant listing of what direction the sides of areas correspond to.
     */
    var directionSizing = {
        "top": "height",
        "right": "width",
        "bottom": "height",
        "left": "width"
    };
    /**
     * A constant Array of direction names.
     */
    var directionNames = ["top", "right", "bottom", "left"];
    /**
     * A constant Array of the dimension descriptors.
     */
    var sizingNames = ["width", "height"];
    /**
     * A randomization utility to automate random, recursive generation of
     * possibilities based on position and probability schemas.
     */
    var WorldSeedr = (function () {
        /**
         * Initializes a new instance of the WorldSeedr class.
         *
         * @param settings   Settings to be used for initialization.
         */
        function WorldSeedr(settings) {
            if (typeof settings === "undefined") {
                throw new Error("No settings object given to WorldSeedr.");
            }
            if (typeof settings.possibilities === "undefined") {
                throw new Error("No possibilities given to WorldSeedr.");
            }
            this.possibilities = settings.possibilities;
            this.random = settings.random || Math.random.bind(Math);
            this.onPlacement = settings.onPlacement || console.log.bind(console, "Got:");
            this.spacingCalculator = new WorldSeedr_1.SpacingCalculator(this.randomBetween.bind(this), this.chooseAmong.bind(this));
            this.clearGeneratedCommands();
        }
        /* Simple gets & sets
        */
        /**
         * @returns The listing of possibilities that may be generated.
         */
        WorldSeedr.prototype.getPossibilities = function () {
            return this.possibilities;
        };
        /**
         * @param possibilitiesNew   A new Object to list possibilities
         *                           that may be generated.
         */
        WorldSeedr.prototype.setPossibilities = function (possibilities) {
            this.possibilities = possibilities;
        };
        /**
         * @returns Callback for runGeneratedCommands to place "known" children.
         */
        WorldSeedr.prototype.getOnPlacement = function () {
            return this.onPlacement;
        };
        /**
         * @param onPlacementNew   A new Function to be used as onPlacement.
         */
        WorldSeedr.prototype.setOnPlacement = function (onPlacement) {
            this.onPlacement = onPlacement;
        };
        /* Generated commands
        */
        /**
         * Resets the generatedCommands Array so runGeneratedCommands can start.
         */
        WorldSeedr.prototype.clearGeneratedCommands = function () {
            this.generatedCommands = [];
        };
        /**
         * Runs the onPlacement callback on the generatedCommands Array.
         */
        WorldSeedr.prototype.runGeneratedCommands = function () {
            this.onPlacement(this.generatedCommands);
        };
        /* Hardcore generation functions
        */
        /**
         * Generates a collection of randomly chosen possibilities based on the
         * given schema mapping. These does not recursively parse the output; do
         * do that, use generateFull.
         *
         * @param name   The name of the possibility schema to start from.
         * @param position   An Object that contains .left, .right, .top,
         *                   and .bottom.
         * @returns An Object containing a position within the given
         *          position and some number of children.
         */
        WorldSeedr.prototype.generate = function (name, command) {
            var schema = this.possibilities[name];
            if (!schema) {
                throw new Error("No possibility exists under '" + name + "'");
            }
            if (!schema.contents) {
                throw new Error("Possibility '" + name + "' has no possibile outcomes.");
            }
            return this.generateChildren(schema, this.objectCopy(command));
        };
        /**
         * Recursively generates a schema. The schema's title and itself are given
         * to this.generate; all outputs of type "Known" are added to the
         * generatedCommands Array, while everything else is recursed upon.
         *
         * @param schema   A simple Object with basic information on the
         *                 chosen possibility.
         * @returns An Object containing a position within the given
         *          position and some number of children.
         */
        WorldSeedr.prototype.generateFull = function (schema) {
            var generated = this.generate(schema.title, schema), child, i;
            if (!generated || !generated.children) {
                return;
            }
            for (i = 0; i < generated.children.length; i += 1) {
                child = generated.children[i];
                switch (child.type) {
                    case "Known":
                        this.generatedCommands.push(child);
                        break;
                    case "Random":
                        this.generateFull(child);
                        break;
                    default:
                        throw new Error("Unknown child type: " + child.type);
                }
            }
        };
        /**
         * Generates the children for a given schema, position, and direction. This
         * is the real hardcore function called by this.generate, which calls the
         * differnt subroutines based on whether the contents are in "Certain" or
         * "Random" mode.
         *
         * @param schema   A simple Object with basic information on the
         *                 chosen possibility.
         * @param position   The bounding box for where the children may
         *                   be generated.
         * @param [direction]   A String direction to check the position
         *                      by ("top", "right", "bottom", or "left")
         *                      as a default if contents.direction isn't
         *                      provided.
         * @returns An Object containing a position within the given
         *          position and some number of children.
         */
        WorldSeedr.prototype.generateChildren = function (schema, position, direction) {
            var contents = schema.contents, spacing = contents.spacing || 0, objectMerged = this.objectMerge(schema, position), children;
            direction = contents.direction || direction;
            switch (contents.mode) {
                case "Random":
                    children = this.generateRandom(contents, objectMerged, direction, spacing);
                    break;
                case "Certain":
                    children = this.generateCertain(contents, objectMerged, direction, spacing);
                    break;
                case "Repeat":
                    children = this.generateRepeat(contents, objectMerged, direction, spacing);
                    break;
                case "Multiple":
                    children = this.generateMultiple(contents, objectMerged, direction, spacing);
                    break;
                default:
                    throw new Error("Unknown contents mode: " + contents.mode);
            }
            return this.wrapChoicePositionExtremes(children);
        };
        /**
         * Generates a schema's children that are known to follow a set listing of
         * sub-schemas.
         *
         * @param contents   The known possibilities to choose between.
         * @param position   The bounding box for where the children may be
         *                   generated.
         * @param direction   A String direction to check the position by:
         *                    "top", "right", "bottom", or "left".
         * @param spacing   How much space there should be between each child.
         * @returns An Object containing a position within the given position
         *          and some number of children.
         */
        WorldSeedr.prototype.generateCertain = function (contents, position, direction, spacing) {
            var scope = this;
            return contents.children
                .map(function (choice) {
                if (choice.type === "Final") {
                    return scope.parseChoiceFinal(choice, position, direction);
                }
                var output = scope.parseChoice(choice, position, direction);
                if (output) {
                    if (output.type !== "Known") {
                        output.contents = scope.generate(output.title, position);
                    }
                    scope.shrinkPositionByChild(position, output, direction, spacing);
                }
                return output;
            })
                .filter(function (child) {
                return child !== undefined;
            });
        };
        /**
         * Generates a schema's children that are known to follow a set listing of
         * sub-schemas, repeated until there is no space left.
         *
         * @param contents   The known possibilities to choose between.
         * @param position   The bounding box for where the children may be
         *                   generated.
         * @param direction   A String direction to check the position by:
         *                    "top", "right", "bottom", or "left".
         * @param spacing   How much space there should be between each child.
         * @returns An Object containing a position within the given position
         *          and some number of children.
         */
        WorldSeedr.prototype.generateRepeat = function (contents, position, direction, spacing) {
            var choices = contents.children, children = [], choice, child, i = 0;
            // Continuously loops through the choices and adds them to the output
            // children, so long as there's still room for them
            while (this.positionIsNotEmpty(position, direction)) {
                choice = choices[i];
                if (choice.type === "Final") {
                    child = this.parseChoiceFinal(choice, position, direction);
                }
                else {
                    child = this.parseChoice(choice, position, direction);
                    if (child && child.type !== "Known") {
                        child.contents = this.generate(child.title, position);
                    }
                }
                if (child && this.choiceFitsPosition(child, position)) {
                    this.shrinkPositionByChild(position, child, direction, spacing);
                    children.push(child);
                }
                else {
                    break;
                }
                i += 1;
                if (i >= choices.length) {
                    i = 0;
                }
            }
            return children;
        };
        /**
         * Generates a schema's children that are known to be randomly chosen from a
         * list of possibilities until there is no more room.
         *
         * @param contents   The Array of known possibilities, with probability
         *                   percentages.
         * @param position   An Object that contains .left, .right, .top,
         *                   and .bottom.
         * @param direction   A String direction to check the position by:
         *                    "top", "right", "bottom", or "left".
         * @param spacing   How much space there should be between each child.
         * @returns An Object containing a position within the given position
         *          and some number of children.
         */
        WorldSeedr.prototype.generateRandom = function (contents, position, direction, spacing) {
            var children = [], child;
            // Continuously add random choices to the output children as long as 
            // there's room in the position's bounding box
            while (this.positionIsNotEmpty(position, direction)) {
                child = this.generateChild(contents, position, direction);
                if (!child) {
                    break;
                }
                this.shrinkPositionByChild(position, child, direction, spacing);
                children.push(child);
                if (contents.limit && children.length > contents.limit) {
                    return;
                }
            }
            return children;
        };
        /**
         * Generates a schema's children that are all to be placed within the same
         * position. If a direction is provided, each subsequent one is shifted in
         * that direction by spacing.
         *
         * @param contents   The Array of known possibilities, with probability
         *                   percentages.
         * @param position   An Object that contains .left, .right, .top,
         *                   and .bottom.
         * @param [direction]   A String direction to check the position by:
         *                      "top", "right", "bottom", or "left".
         * @param [spacing]   How much space there should be between each child.
         * @returns An Object containing a position within the given position
         *          and some number of children.
         */
        WorldSeedr.prototype.generateMultiple = function (contents, position, direction, spacing) {
            var scope = this;
            return contents.children.map(function (choice) {
                var output = scope.parseChoice(choice, scope.objectCopy(position), direction);
                if (direction) {
                    scope.movePositionBySpacing(position, direction, spacing);
                }
                return output;
            });
        };
        /* Choice parsing
        */
        /**
         * Shortcut function to choose a choice from an allowed set of choices, and
         * parse it for positioning and sub-choices.
         *
         * @param contents   Choice Objects, each of which must have a .percentage.
         * @param position   An Object that contains .left, .right, .top, and .bottom.
         * @param direction   A String direction to check the position by:
         *                    "top", "right", "bottom", or "left".
         * @returns An Object containing the bounding box position of a parsed child,
         *          with the basic schema (.title) info added as well as any optional
         *          .arguments.
         */
        WorldSeedr.prototype.generateChild = function (contents, position, direction) {
            var choice = this.chooseAmongPosition(contents.children, position);
            if (!choice) {
                return undefined;
            }
            return this.parseChoice(choice, position, direction);
        };
        /**
         * Creates a parsed version of a choice given the position and direction.
         * This is the function that parses and manipulates the positioning of the
         * new choice.
         *
         * @param choice   The simple definition of the Object chosen from a choices
         *                 Array. It should have at least .title,
         *                          and optionally .sizing or .arguments.
         * @param position   An Object that contains .left, .right, .top, and .bottom.
         * @param direction   A String direction to shrink the position by: "top",
         *                    "right", "bottom", or "left".
         * @returns An Object containing the bounding box position of a parsed child,
         *          with the basic schema (.title) info added as well as any optional
         *          .arguments.
         */
        WorldSeedr.prototype.parseChoice = function (choice, position, direction) {
            var title = choice.title, schema = this.possibilities[title], output = {
                "title": title,
                "type": choice.type,
                "arguments": choice.arguments instanceof Array
                    ? (this.chooseAmong(choice.arguments)).values
                    : choice.arguments,
                "width": undefined,
                "height": undefined,
                "top": undefined,
                "right": undefined,
                "bottom": undefined,
                "left": undefined
            };
            this.ensureSizingOnChoice(output, choice, schema);
            this.ensureDirectionBoundsOnChoice(output, position);
            output[direction] = output[directionOpposites[direction]] + output[directionSizing[direction]];
            switch (schema.contents.snap) {
                case "top":
                    output.bottom = output.top - output.height;
                    break;
                case "right":
                    output.left = output.right - output.width;
                    break;
                case "bottom":
                    output.top = output.bottom + output.height;
                    break;
                case "left":
                    output.right = output.left + output.width;
                    break;
                default:
                    break;
            }
            if (choice.stretch) {
                if (!output.arguments) {
                    output.arguments = {};
                }
                if (choice.stretch.width) {
                    output.left = position.left;
                    output.right = position.right;
                    output.width = output.right - output.left;
                    output.arguments.width = output.width;
                }
                if (choice.stretch.height) {
                    output.top = position.top;
                    output.bottom = position.bottom;
                    output.height = output.top - output.bottom;
                    output.arguments.height = output.height;
                }
            }
            return output;
        };
        /**
         * Parses a "Final" choice as a simple IChoice of type Known.
         *
         * @param choice   The simple definition of the Object chosen from a choices
         *                 Array. It should have at least .title,
         *                          and optionally .sizing or .arguments.
         * @param position   An Object that contains .left, .right, .top, and .bottom.
         * @param direction   A String direction to shrink the position by: "top",
         *                    "right", "bottom", or "left".
         * @returns A Known choice with title, arguments, and position information.
         * @todo Investigate whether this is necessary (#7).
         */
        WorldSeedr.prototype.parseChoiceFinal = function (choice, position, direction) {
            var schema = this.possibilities[choice.source], output = {
                "type": "Known",
                "title": choice.title,
                "arguments": choice.arguments,
                "width": schema.width,
                "height": schema.height,
                "top": position.top,
                "right": position.right,
                "bottom": position.bottom,
                "left": position.left
            };
            return output;
        };
        /* Randomization utilities
        */
        /**
         * From an Array of potential choice Objects, returns one chosen at random.
         *
         * @param choice   An Array of objects with .percent.
         * @returns One of the choice Objects, chosen at random.
         */
        WorldSeedr.prototype.chooseAmong = function (choices) {
            if (!choices.length) {
                return undefined;
            }
            if (choices.length === 1) {
                return choices[0];
            }
            var choice = this.randomPercentage(), sum = 0, i;
            for (i = 0; i < choices.length; i += 1) {
                sum += choices[i].percent;
                if (sum >= choice) {
                    return choices[i];
                }
            }
        };
        /**
         * From an Array of potential choice Objects, filtered to only include those
         * within a certain size, returns one chosen at random.
         *
         * @param choice   An Array of objects with .width and .height.
         * @param position   An Object that contains .left, .right, .top, and .bottom.
         * @returns A random choice Object that can fit within the position's size.
         * @remarks Functions that use this will have to react to nothing being
         *          chosen. For example, if only 50 percentage is accumulated
         *          among fitting ones but 75 is randomly chosen, something should
         *          still be returned.
         */
        WorldSeedr.prototype.chooseAmongPosition = function (choices, position) {
            var width = position.right - position.left, height = position.top - position.bottom, scope = this;
            return this.chooseAmong(choices.filter(function (choice) {
                return scope.choiceFitsSize(scope.possibilities[choice.title], width, height);
            }));
        };
        /**
         * Checks whether a choice can fit within a width and height.
         *
         * @param choice   An Object that contains .width and .height.
         * @param width   A maximum width for the choice.
         * @param height   A maximum height for the choice.
         * @returns Whether the choice fits within the dimensions.
         */
        WorldSeedr.prototype.choiceFitsSize = function (choice, width, height) {
            return choice.width <= width && choice.height <= height;
        };
        /**
         * Checks whether a choice can fit within a position.
         *
         * @param choice   An Object that contains .width and .height.
         * @param position   An Object that contains .left, .right, .top, and .bottom.
         * @returns Whether the choice fits within the position.
         * @remarks When calling multiple times on a position (such as in
         *          chooseAmongPosition), it's more efficient to store the width
         *          and height separately and just use doesChoiceFit.
         */
        WorldSeedr.prototype.choiceFitsPosition = function (choice, position) {
            return this.choiceFitsSize(choice, position.right - position.left, position.top - position.bottom);
        };
        /* Position manipulation utilities
        */
        /**
         * Checks and returns whether a position has open room in a particular
         * direction (horizontally for left/right and vertically for top/bottom).
         *
         * @param position   An Object that contains .left, .right, .top, and .bottom.
         * @param direction   A String direction to check the position in:
         *                    "top", "right", "bottom", or "left".
         */
        WorldSeedr.prototype.positionIsNotEmpty = function (position, direction) {
            if (direction === "right" || direction === "left") {
                return position.left < position.right;
            }
            else {
                return position.top > position.bottom;
            }
        };
        /**
         * Shrinks a position by the size of a child, in a particular direction.
         *
         * @param position   An Object that contains .left, .right, .top, and .bottom.
         * @param child   An Object that contains .left, .right, .top, and .bottom.
         * @param direction   A String direction to shrink the position by:
         *                    "top", "right", "bottom", or "left".
         * @param [spacing]   How much space there should be between each child
         *                    (by default, 0).
         */
        WorldSeedr.prototype.shrinkPositionByChild = function (position, child, direction, spacing) {
            if (spacing === void 0) { spacing = 0; }
            switch (direction) {
                case "top":
                    position.bottom = child.top + this.spacingCalculator.calculateFromSpacing(spacing);
                    break;
                case "right":
                    position.left = child.right + this.spacingCalculator.calculateFromSpacing(spacing);
                    break;
                case "bottom":
                    position.top = child.bottom - this.spacingCalculator.calculateFromSpacing(spacing);
                    break;
                case "left":
                    position.right = child.left - this.spacingCalculator.calculateFromSpacing(spacing);
                    break;
                default:
                    break;
            }
        };
        /**
         * Moves a position by its parsed spacing. This is only useful for content
         * of type "Multiple", which are allowed to move themselves via spacing
         * between placements.
         *
         * @param position   An Object that contains .left, .right, .top, and .bottom.
         * @param direction   A String direction to shrink the position by:
         *                    "top", "right", "bottom", or "left".
         * @param [spacing]   How much space there should be between each child
         *                    (by default, 0).
         */
        WorldSeedr.prototype.movePositionBySpacing = function (position, direction, spacing) {
            if (spacing === void 0) { spacing = 0; }
            var space = this.spacingCalculator.calculateFromSpacing(spacing);
            switch (direction) {
                case "top":
                    position.top += space;
                    position.bottom += space;
                    break;
                case "right":
                    position.left += space;
                    position.right += space;
                    break;
                case "bottom":
                    position.top -= space;
                    position.bottom -= space;
                    break;
                case "left":
                    position.left -= space;
                    position.right -= space;
                    break;
                default:
                    throw new Error("Unknown direction: " + direction);
            }
        };
        /**
         * Generates the bounding box position Object (think rectangle) for a set of
         * children. The top, right, etc. member variables become the most extreme
         * out of all the possibilities.
         *
         * @param children   An Array of Objects with .top, .right, .bottom, and .left.
         * @returns An Object with .top, .right, .bottom, and .left.
         */
        WorldSeedr.prototype.wrapChoicePositionExtremes = function (children) {
            var position, child, i;
            if (!children || !children.length) {
                return undefined;
            }
            child = children[0];
            position = {
                "title": undefined,
                "top": child.top,
                "right": child.right,
                "bottom": child.bottom,
                "left": child.left,
                "width": undefined,
                "height": undefined,
                "children": children
            };
            if (children.length === 1) {
                return position;
            }
            for (i = 1; i < children.length; i += 1) {
                child = children[i];
                if (!Object.keys(child).length) {
                    return position;
                }
                position.top = Math.max(position.top, child.top);
                position.right = Math.max(position.right, child.right);
                position.bottom = Math.min(position.bottom, child.bottom);
                position.left = Math.min(position.left, child.left);
            }
            position.width = position.right - position.left;
            position.height = position.top - position.bottom;
            return position;
        };
        /**
         * Ensures an output from parseChoice contains all the necessary size
         * measurements, as listed in this.sizingNames.
         *
         * @param output   The Object (likely a parsed possibility content)
         *                 having its arguments modified.
         * @param choice   The definition of the Object chosen from a choices Array.
         * @param schema   An Object with basic information on the chosen possibility.
         */
        WorldSeedr.prototype.ensureSizingOnChoice = function (output, choice, schema) {
            var name, i;
            for (i in sizingNames) {
                if (!sizingNames.hasOwnProperty(i)) {
                    continue;
                }
                name = sizingNames[i];
                output[name] = (choice.sizing && typeof choice.sizing[name] !== "undefined")
                    ? choice.sizing[name]
                    : schema[name];
            }
        };
        /**
         * Ensures an output from parseChoice contains all the necessary position
         * bounding box measurements, as listed in this.directionNames.
         *
         * @param output   The Object (likely a parsed possibility content)
         *                 having its arguments modified.
         *                          chosen possibility.
         * @param position   An Object that contains .left, .right, .top, and .bottom.
         */
        WorldSeedr.prototype.ensureDirectionBoundsOnChoice = function (output, position) {
            var i;
            for (i in directionNames) {
                if (directionNames.hasOwnProperty(i)) {
                    output[directionNames[i]] = position[directionNames[i]];
                }
            }
        };
        /* General utilities
        */
        /**
         * @returns A number in [1, 100] at random.
         */
        WorldSeedr.prototype.randomPercentage = function () {
            return Math.floor(this.random() * 100) + 1;
        };
        /**
         * @returns A number in [min, max] at random.
         */
        WorldSeedr.prototype.randomBetween = function (min, max) {
            return Math.floor(this.random() * (1 + max - min)) + min;
        };
        /**
         * Creates and returns a copy of an Object, as a shallow copy.
         *
         * @param original   An Object to copy.
         * @returns A shallow copy of the original.
         */
        WorldSeedr.prototype.objectCopy = function (original) {
            var output = {}, i;
            for (i in original) {
                if (original.hasOwnProperty(i)) {
                    output[i] = original[i];
                }
            }
            return output;
        };
        /**
         * Creates a new object with all required attributes taking from the
         * primary source or secondary source, in that order of precedence.
         *
         * @param primary   A primary source for the output.
         * @param secondary   A secondary source for the output.
         * @returns A new Object with properties from primary and secondary.
         */
        WorldSeedr.prototype.objectMerge = function (primary, secondary) {
            var output = this.objectCopy(primary), i;
            for (i in secondary) {
                if (secondary.hasOwnProperty(i) && !output.hasOwnProperty(i)) {
                    output[i] = secondary[i];
                }
            }
            return output;
        };
        return WorldSeedr;
    })();
    WorldSeedr_1.WorldSeedr = WorldSeedr;
})(WorldSeedr || (WorldSeedr = {}));
