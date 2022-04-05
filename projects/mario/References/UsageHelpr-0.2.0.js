var UsageHelpr;
(function (UsageHelpr_1) {
    "use strict";
    /**
     * A simple interactive text-based assistant to demonstrate common API uses.
     */
    var UsageHelpr = (function () {
        /**
         * Initializes a new instance of the UsageHelpr class.
         *
         * @param settings   Settings to be used for initialization.
         */
        function UsageHelpr(settings) {
            if (settings === void 0) { settings = {}; }
            this.openings = settings.openings || [];
            this.options = settings.options || {};
            this.optionHelp = settings.optionHelp || "";
            this.aliases = settings.aliases || [];
            this.logger = settings.logger || console.log.bind(console);
        }
        /**
         * Displays the root help menu dialog, which contains all the openings
         * for each help settings opening.
         */
        UsageHelpr.prototype.displayHelpMenu = function () {
            var _this = this;
            this.openings.forEach(function (opening) { return _this.logHelpText(opening); });
        };
        /**
         * Displays the texts of each help settings options, all surrounded by
         * instructions on how to focus on a group.
         */
        UsageHelpr.prototype.displayHelpOptions = function () {
            var _this = this;
            this.logHelpText([this.optionHelp, "code"]);
            Object.keys(this.options).forEach(function (key) { return _this.displayHelpGroupSummary(key); });
            this.logHelpText(["\r\n" + this.optionHelp, "code"]);
        };
        /**
         * Displays the summary for a help group of the given optionName.
         *
         * @param optionName   The help group to display the summary of.
         */
        UsageHelpr.prototype.displayHelpGroupSummary = function (optionName) {
            var actions = this.options[optionName], action, maxTitleLength = 0, i;
            this.logger("\r\n%c" + optionName, UsageHelpr.styles.head);
            for (i = 0; i < actions.length; i += 1) {
                maxTitleLength = Math.max(maxTitleLength, this.filterHelpText(actions[i].title).length);
            }
            for (i = 0; i < actions.length; i += 1) {
                action = actions[i];
                this.logger("%c" + this.padTextRight(this.filterHelpText(action.title), maxTitleLength) + "%c  // " + action.description, UsageHelpr.styles.code, UsageHelpr.styles.comment);
            }
        };
        /**
         * Displays the full information on a help group of the given optionName.
         *
         * @param optionName   The help group to display the information of.
         */
        UsageHelpr.prototype.displayHelpOption = function (optionName) {
            var actions = this.options[optionName], action, example, maxExampleLength, i, j;
            this.logHelpText([("\r\n\r\n%c" + optionName + "\r\n-------\r\n\r\n"), "head"]);
            for (i = 0; i < actions.length; i += 1) {
                action = actions[i];
                maxExampleLength = 0;
                this.logHelpText([
                    ("%c" + action.title + "%c  ---  " + action.description),
                    "head",
                    "italic"
                ]);
                if (action.usage) {
                    this.logHelpText([
                        ("%cUsage: %c" + action.usage),
                        "comment",
                        "code"
                    ]);
                }
                if (action.examples) {
                    for (j = 0; j < action.examples.length; j += 1) {
                        example = action.examples[j];
                        this.logger("\r\n");
                        this.logHelpText([("%c// " + example.comment), "comment"]);
                        this.logHelpText([
                            ("%c" + this.padTextRight(this.filterHelpText(example.code), maxExampleLength)),
                            "code"
                        ]);
                    }
                }
                this.logger("\r\n");
            }
        };
        /**
         * Logs a bit of help text, filtered by this.filterHelpText, with ordered styles
         * from `UserWrappr.styles` keyed by name.
         *
         * @param text   The text to be filtered and logged.
         * @remarks See https://getfirebug.com/wiki/index.php/Console.log for "%c" usage.
         */
        UsageHelpr.prototype.logHelpText = function (line) {
            if (typeof line === "string") {
                return this.logHelpText([line]);
            }
            var message = line[0], styles = line
                .slice(1)
                .filter(function (style) { return UsageHelpr.styles.hasOwnProperty(style); })
                .map(function (style) { return UsageHelpr.styles[style]; });
            // A last blank "" style allows the last "%c" in the message to reset text styles
            this.logger.apply(this, [this.filterHelpText(message)].concat(styles, [""]));
        };
        /**
         * Filters a span of help text to replace the game name with its alias. If "%c" isn't
         * in the text, it's added at the end.
         *
         * @param text The text to filter.
         * @returns The text, with aliases replaced.
         */
        UsageHelpr.prototype.filterHelpText = function (textRaw) {
            if (textRaw.constructor === Array) {
                return this.filterHelpText(textRaw[0]);
            }
            var text = textRaw, i;
            for (i = 0; i < this.aliases.length; i += 1) {
                text = text.replace(new RegExp(this.aliases[i][0], "g"), this.aliases[i][1]);
            }
            return text;
        };
        /**
         * Ensures a bit of text is of least a certain length.
         *
         * @param text   The text to pad.
         * @param length   How wide the text must be, at minimum.
         * @param spacer   What character to pad the text with, if not a space.
         * @returns The text with spaces padded to the right.
         */
        UsageHelpr.prototype.padTextRight = function (text, length, spacer) {
            if (spacer === void 0) { spacer = " "; }
            var diff = 1 + length - text.length;
            if (diff <= 0) {
                return text;
            }
            return text + Array.call(Array, diff).join(spacer);
        };
        /**
         * Styles for fancy text in logged help messages.
         */
        UsageHelpr.styles = {
            "code": "color: #000077; font-weight: bold; font-family: Consolas, Courier New, monospace;",
            "comment": "color: #497749; font-style: italic;",
            "head": "font-weight: bold; font-size: 117%;",
            "italic": "font-style: italic;",
            "none": ""
        };
        return UsageHelpr;
    })();
    UsageHelpr_1.UsageHelpr = UsageHelpr;
})(UsageHelpr || (UsageHelpr = {}));
