declare namespace UsageHelpr {
    /**
     * Styles that may be applied to logged help text.
     */
    export interface ITextStyles {
        /**
         * Style for headers.
         */
        head: string;

        /**
         * Style for code.
         */
        code: string;

        /**
         * Style for code comments.
         */
        comment: string;

        /**
         * Style for italicized text.
         */
        italic: string;

        /**
         * No styles at all (plain text).
         */
        none: string;
    }

    /**
     * Text replacements, as originals with their replacements.
     */
    export type IAliases = [string, string][];

    /**
     * A single line of text to write to a console. If an Array, the first String is the 
     * message, and any others are aliases of UserWrappr styles to apply.
     */
    export type IHelpLine = string | string[];

    /**
     * Descriptions of APIs users may use, along with sample code.
     */
    export interface IHelpOption {
        /**
         * A label for the API to research it by.
         */
        title: string;

        /**
         * A common description of the API.
         */
        description: string;

        /**
         * Code sample for usage of the API.
         */
        usage?: string;

        /**
         * API code samples with explanations.
         */
        examples?: IHelpExample[];
    }

    /**
     * Code sample for an API with an explanation.
     */
    export interface IHelpExample {
        /**
         * An API code sample.
         */
        code: IHelpLine;

        /**
         * An explanation for the API code sample.
         */
        comment: IHelpLine;
    }

    /**
     * Settings to initialize a new IUsageHelpr.
     */
    export interface IUsageHelprSettings {
        /**
         * Lines to display immediately upon starting.
         */
        openings?: IHelpLine[];

        /**
         * Descriptions of APIs users may use, along with sample code.
         */
        options?: {
            [i: string]: IHelpOption[];
        };

        /**
         * A message to log before and after a help options menu.
         */
        optionHelp?: string;

        /**
         * Text replacements for logs, as originals keying to their replacements.
         */
        aliases?: IAliases;

        /**
         * A utility Function to log messages, commonly console.log.
         */
        logger?: (...args: any[]) => any;
    }

    /**
     * A simple interactive text-based assistant to demonstrate common API uses.
     */
    export interface IUsageHelpr {
        /**
         * Displays the root help menu dialog, which contains all the openings
         * for each help settings opening.
         */
        displayHelpMenu(): void;

        /**
         * Displays the texts of each help settings options, all surrounded by
         * instructions on how to focus on a group.
         */
        displayHelpOptions(): void;

        /**
         * Displays the summary for a help group of the given optionName.
         * 
         * @param optionName   The help group to display the summary of.
         */
        displayHelpGroupSummary(optionName: string): void;

        /**
         * Displays the full information on a help group of the given optionName.
         * 
         * @param optionName   The help group to display the information of.
         */
        displayHelpOption(optionName: string): void;
    }
}


namespace UsageHelpr {
    "use strict";

    /**
     * A simple interactive text-based assistant to demonstrate common API uses.
     */
    export class UsageHelpr {
        /**
         * Styles for fancy text in logged help messages.
         */
        private static styles: ITextStyles = {
            "code": "color: #000077; font-weight: bold; font-family: Consolas, Courier New, monospace;",
            "comment": "color: #497749; font-style: italic;",
            "head": "font-weight: bold; font-size: 117%;",
            "italic": "font-style: italic;",
            "none": ""
        };

        /**
         * Lines to display immediately upon starting.
         */
        private openings: IHelpLine[];

        /**
         * Descriptions of APIs users may use, along with sample code.
         */
        private options: {
            [i: string]: IHelpOption[];
        };

        /**
         * A message to log before and after a help options menu.
         */
        private optionHelp: string;

        /**
         * Text replacements, as originals with their replacements.
         */
        private aliases: IAliases;

        /**
         * A utility Function to log messages, commonly console.log.
         */
        private logger: (...args: any[]) => any;

        /**
         * Initializes a new instance of the UsageHelpr class.
         * 
         * @param settings   Settings to be used for initialization.
         */
        constructor(settings: IUsageHelprSettings = {}) {
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
        displayHelpMenu(): void {
            this.openings.forEach((opening: string[]): void => this.logHelpText(opening));
        }

        /**
         * Displays the texts of each help settings options, all surrounded by
         * instructions on how to focus on a group.
         */
        displayHelpOptions(): void {
            this.logHelpText([this.optionHelp, "code"]);

            Object.keys(this.options).forEach((key: string): void => this.displayHelpGroupSummary(key));

            this.logHelpText(["\r\n" + this.optionHelp, "code"]);
        }

        /**
         * Displays the summary for a help group of the given optionName.
         * 
         * @param optionName   The help group to display the summary of.
         */
        displayHelpGroupSummary(optionName: string): void {
            var actions: IHelpOption[] = this.options[optionName],
                action: IHelpOption,
                maxTitleLength: number = 0,
                i: number;

            this.logger(`\r\n%c${optionName}`, UsageHelpr.styles.head);

            for (i = 0; i < actions.length; i += 1) {
                maxTitleLength = Math.max(maxTitleLength, this.filterHelpText(actions[i].title).length);
            }

            for (i = 0; i < actions.length; i += 1) {
                action = actions[i];
                this.logger(
                    `%c${this.padTextRight(this.filterHelpText(action.title), maxTitleLength)}%c  // ${action.description}`,
                    UsageHelpr.styles.code,
                    UsageHelpr.styles.comment);
            }
        }

        /**
         * Displays the full information on a help group of the given optionName.
         * 
         * @param optionName   The help group to display the information of.
         */
        displayHelpOption(optionName: string): void {
            var actions: IHelpOption[] = this.options[optionName],
                action: IHelpOption,
                example: IHelpExample,
                maxExampleLength: number,
                i: number,
                j: number;

            this.logHelpText([`\r\n\r\n%c${optionName}\r\n-------\r\n\r\n`, "head"]);

            for (i = 0; i < actions.length; i += 1) {
                action = actions[i];
                maxExampleLength = 0;

                this.logHelpText([
                    `%c${action.title}%c  ---  ${action.description}`,
                    "head",
                    "italic"
                ]);

                if (action.usage) {
                    this.logHelpText([
                        `%cUsage: %c${action.usage}`,
                        "comment",
                        "code"
                    ]);
                }

                if (action.examples) {
                    for (j = 0; j < action.examples.length; j += 1) {
                        example = action.examples[j];

                        this.logger("\r\n");
                        this.logHelpText([`%c// ${example.comment}`, "comment"]);
                        this.logHelpText([
                            `%c${this.padTextRight(this.filterHelpText(example.code), maxExampleLength)}`,
                            "code"
                        ]);
                    }
                }

                this.logger("\r\n");
            }
        }

        /**
         * Logs a bit of help text, filtered by this.filterHelpText, with ordered styles
         * from `UserWrappr.styles` keyed by name.
         * 
         * @param text   The text to be filtered and logged.
         * @remarks See https://getfirebug.com/wiki/index.php/Console.log for "%c" usage.
         */
        private logHelpText(line: IHelpLine): void {
            if (typeof line === "string") {
                return this.logHelpText([line]);
            }

            var message: string = line[0],
                styles: string[] = (<string[]>line)
                    .slice(1)
                    .filter((style: string): boolean => UsageHelpr.styles.hasOwnProperty(style))
                    .map((style: string): string => UsageHelpr.styles[style]);

            // A last blank "" style allows the last "%c" in the message to reset text styles
            this.logger(this.filterHelpText(message), ...styles, "");
        }

        /**
         * Filters a span of help text to replace the game name with its alias. If "%c" isn't
         * in the text, it's added at the end.
         * 
         * @param text The text to filter.
         * @returns The text, with aliases replaced.
         */
        private filterHelpText(textRaw: IHelpLine): string {
            if (textRaw.constructor === Array) {
                return this.filterHelpText(textRaw[0]);
            }

            var text: string = <string>textRaw,
                i: number;

            for (i = 0; i < this.aliases.length; i += 1) {
                text = text.replace(new RegExp(this.aliases[i][0], "g"), this.aliases[i][1]);
            }

            return text;
        }

        /**
         * Ensures a bit of text is of least a certain length.
         * 
         * @param text   The text to pad.
         * @param length   How wide the text must be, at minimum.
         * @param spacer   What character to pad the text with, if not a space.
         * @returns The text with spaces padded to the right.
         */
        private padTextRight(text: string, length: number, spacer: string = " "): string {
            var diff: number = 1 + length - text.length;

            if (diff <= 0) {
                return text;
            }

            return text + Array.call(Array, diff).join(spacer);
        }
    }
}
