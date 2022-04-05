/// <reference path="DeviceLayr-0.2.0.ts" />
/// <reference path="GamesRunnr-0.2.0.ts" />
/// <reference path="ItemsHoldr-0.2.1.ts" />
/// <reference path="InputWritr-0.2.0.ts" />
/// <reference path="LevelEditr-0.2.0.ts" />
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var UserWrappr;
(function (UserWrappr) {
    var UISchemas;
    (function (UISchemas) {
        "use strict";
        /**
         * Base class for options generators. These all store a UserWrapper and
         * its GameStartr, along with a generate Function
         */
        var OptionsGenerator = (function () {
            /**
             * Initializes a new instance of the OptionsGenerator class.
             *
             * @param UserWrappr   The container UserWrappr using this generator.
             */
            function OptionsGenerator(UserWrapper) {
                this.UserWrapper = UserWrapper;
                this.GameStarter = this.UserWrapper.getGameStarter();
            }
            /**
             * Recursively searches for an element with the "control" class
             * that's a parent of the given element.
             *
             * @param element   An element to start searching on.
             * @returns The closest node with className "control" to the given element
             *          in its ancestry tree.
             */
            OptionsGenerator.prototype.getParentControlElement = function (element) {
                if (element.className === "control" || !element.parentNode) {
                    return element;
                }
                return this.getParentControlElement(element.parentElement);
            };
            return OptionsGenerator;
        })();
        UISchemas.OptionsGenerator = OptionsGenerator;
    })(UISchemas = UserWrappr.UISchemas || (UserWrappr.UISchemas = {}));
})(UserWrappr || (UserWrappr = {}));
var UserWrappr;
(function (UserWrappr) {
    var UISchemas;
    (function (UISchemas) {
        "use strict";
        /**
         * A buttons generator for an options section that contains any number
         * of general buttons.
         */
        var ButtonsGenerator = (function (_super) {
            __extends(ButtonsGenerator, _super);
            function ButtonsGenerator() {
                _super.apply(this, arguments);
            }
            /**
             * Generates a control element with buttons described in the schema.
             *
             * @param schema   A description of the element to create.
             * @returns An HTML element representing the schema.
             */
            ButtonsGenerator.prototype.generate = function (schema) {
                var output = document.createElement("div"), options = schema.options instanceof Function
                    ? schema.options.call(self, this.GameStarter)
                    : schema.options, classNameStart = "select-option options-button-option", scope = this, option, element, i;
                output.className = "select-options select-options-buttons";
                for (i = 0; i < options.length; i += 1) {
                    option = options[i];
                    element = document.createElement("div");
                    element.className = classNameStart;
                    element.textContent = option.title;
                    element.onclick = function (schema, element) {
                        if (scope.getParentControlElement(element).getAttribute("active") !== "on") {
                            return;
                        }
                        schema.callback.call(scope, scope.GameStarter, schema, element);
                        if (element.getAttribute("option-enabled") === "true") {
                            element.setAttribute("option-enabled", "false");
                            element.className = classNameStart + " option-disabled";
                        }
                        else {
                            element.setAttribute("option-enabled", "true");
                            element.className = classNameStart + " option-enabled";
                        }
                    }.bind(this, schema, element);
                    this.ensureLocalStorageButtonValue(element, option, schema);
                    if (option[schema.keyActive || "active"]) {
                        element.className += " option-enabled";
                        element.setAttribute("option-enabled", "true");
                    }
                    else if (schema.assumeInactive) {
                        element.className += " option-disabled";
                        element.setAttribute("option-enabled", "false");
                    }
                    else {
                        element.setAttribute("option-enabled", "true");
                    }
                    output.appendChild(element);
                }
                return output;
            };
            /**
             * Ensures a value exists in localStorage, and has the given settings. If
             * it doesn't have a value, the schema's callback is used to provide one.
             *
             * @param child   The value's representational HTML element.
             * @param details   Details
             * @param schema
             */
            ButtonsGenerator.prototype.ensureLocalStorageButtonValue = function (child, details, schema) {
                var key = schema.title + "::" + details.title, valueDefault = details.source.call(this, this.GameStarter).toString(), value;
                child.setAttribute("localStorageKey", key);
                this.GameStarter.ItemsHolder.addItem(key, {
                    "storeLocally": true,
                    "valueDefault": valueDefault
                });
                value = this.GameStarter.ItemsHolder.getItem(key);
                if (value.toString().toLowerCase() === "true") {
                    details[schema.keyActive || "active"] = true;
                    schema.callback.call(this, this.GameStarter, schema, child);
                }
            };
            return ButtonsGenerator;
        })(UISchemas.OptionsGenerator);
        UISchemas.ButtonsGenerator = ButtonsGenerator;
    })(UISchemas = UserWrappr.UISchemas || (UserWrappr.UISchemas = {}));
})(UserWrappr || (UserWrappr = {}));
var UserWrappr;
(function (UserWrappr) {
    var UISchemas;
    (function (UISchemas) {
        "use strict";
        /**
         * Options generator for a LevelEditr dialog.
         */
        var LevelEditorGenerator = (function (_super) {
            __extends(LevelEditorGenerator, _super);
            function LevelEditorGenerator() {
                _super.apply(this, arguments);
            }
            /**
             * Generates a control for a level editor based on the provided schema.
             *
             * @param schema   The overall description of the editor control.
             * @returns An HTML element representing the schema.
             */
            LevelEditorGenerator.prototype.generate = function (schema) {
                var output = document.createElement("div"), starter = document.createElement("div"), betweenOne = document.createElement("div"), betweenTwo = document.createElement("div"), uploader = this.createUploaderDiv(), mapper = this.createMapSelectorDiv(schema), scope = this;
                output.className = "select-options select-options-level-editor";
                starter.className = "select-option select-option-large options-button-option";
                starter.innerHTML = "Start the <br /> Level Editor!";
                starter.onclick = function () {
                    scope.GameStarter.LevelEditor.enable();
                };
                betweenOne.className = betweenTwo.className = "select-option-title";
                betweenOne.innerHTML = betweenTwo.innerHTML = "<em>- or -</em><br />";
                output.appendChild(starter);
                output.appendChild(betweenOne);
                output.appendChild(uploader);
                output.appendChild(betweenTwo);
                output.appendChild(mapper);
                return output;
            };
            /**
             * Creates an HTML element that can be clicked or dragged on to upload a JSON file
             * into the level editor.
             *
             * @returns An element containing the uploader div.
             */
            LevelEditorGenerator.prototype.createUploaderDiv = function () {
                var uploader = document.createElement("div"), input = document.createElement("input");
                uploader.className = "select-option select-option-large options-button-option";
                uploader.innerHTML = "Continue an<br />editor file!";
                uploader.setAttribute("textOld", uploader.textContent);
                input.type = "file";
                input.className = "select-upload-input";
                input.onchange = this.handleFileDrop.bind(this, input, uploader);
                uploader.ondragenter = this.handleFileDragEnter.bind(this, uploader);
                uploader.ondragover = this.handleFileDragOver.bind(this, uploader);
                uploader.ondragleave = input.ondragend = this.handleFileDragLeave.bind(this, uploader);
                uploader.ondrop = this.handleFileDrop.bind(this, input, uploader);
                uploader.onclick = input.click.bind(input);
                uploader.appendChild(input);
                return uploader;
            };
            /**
             * Creates an HTML element that allows a user to choose between maps to load into
             * the level editor.
             *
             * @param schema   The overall description of the container user control.
             * @returns An element containing the map selector.
             */
            LevelEditorGenerator.prototype.createMapSelectorDiv = function (schema) {
                var expanded = true, generatorName = "MapsGrid", container = this.GameStarter.createElement("div", {
                    "className": "select-options-group select-options-editor-maps-selector"
                }), toggler = this.GameStarter.createElement("div", {
                    "className": "select-option select-option-large options-button-option"
                }), mapsOut = this.GameStarter.createElement("div", {
                    "className": "select-options-holder select-options-editor-maps-holder"
                }), mapsIn = this.UserWrapper.getGenerators()[generatorName].generate(this.GameStarter.proliferate({
                    "callback": schema.callback
                }, schema.maps));
                toggler.onclick = function (event) {
                    expanded = !expanded;
                    if (expanded) {
                        toggler.textContent = "(cancel)";
                        mapsOut.style.position = "";
                        mapsIn.style.height = "";
                    }
                    else {
                        toggler.innerHTML = "Edit a <br />built-in map!";
                        mapsOut.style.position = "absolute";
                        mapsIn.style.height = "0";
                    }
                    if (!container.parentElement) {
                        return;
                    }
                    [].slice.call(container.parentElement.children)
                        .forEach(function (element) {
                        if (element !== container) {
                            element.style.display = (expanded ? "none" : "block");
                        }
                    });
                };
                toggler.onclick(null);
                mapsOut.appendChild(mapsIn);
                container.appendChild(toggler);
                container.appendChild(mapsOut);
                return container;
            };
            /**
             * Handles a dragged file entering a map selector. Visual styles are updated.
             *
             * @param uploader   The element being dragged onto.
             * @param event   The event caused by the dragging.
             */
            LevelEditorGenerator.prototype.handleFileDragEnter = function (uploader, event) {
                if (event.dataTransfer) {
                    event.dataTransfer.dropEffect = "copy";
                }
                uploader.className += " hovering";
            };
            /**
             * Handles a dragged file moving over a map selector.
             *
             * @param uploader   The element being dragged onto.
             * @param event   The event caused by the dragging.
             */
            LevelEditorGenerator.prototype.handleFileDragOver = function (uploader, event) {
                event.preventDefault();
                return false;
            };
            /**
             * Handles a dragged file leaving a map selector. Visual styles are updated.
             *
             * @param uploader   The element being dragged onto.
             * @param event   The event caused by the dragging.
             */
            LevelEditorGenerator.prototype.handleFileDragLeave = function (uploader, event) {
                if (event.dataTransfer) {
                    event.dataTransfer.dropEffect = "none";
                }
                uploader.className = uploader.className.replace(" hovering", "");
            };
            /**
             * Handles a dragged file being dropped onto a map selector. The file is read, and
             * events attached to its progress.
             *
             * @param input   The HTMLInputElement triggering the file event.
             * @param uploader   The element being dragged onto.
             * @param event   The event caused by the dragging.
             */
            LevelEditorGenerator.prototype.handleFileDrop = function (input, uploader, event) {
                var files = input.files || event.dataTransfer.files, file = files[0], reader = new FileReader();
                this.handleFileDragLeave(input, event);
                event.preventDefault();
                event.stopPropagation();
                reader.onprogress = this.handleFileUploadProgress.bind(this, file, uploader);
                reader.onloadend = this.handleFileUploadCompletion.bind(this, file, uploader);
                reader.readAsText(file);
            };
            /**
             * Handles a file upload reporting some amount of progress.
             *
             * @param file   The file being uploaded.
             * @param uploader   The element the file was being dragged onto.
             * @param event   The event caused by the progress.
             */
            LevelEditorGenerator.prototype.handleFileUploadProgress = function (file, uploader, event) {
                if (!event.lengthComputable) {
                    return;
                }
                var percent = Math.round((event.loaded / event.total) * 100);
                if (percent > 100) {
                    percent = 100;
                }
                uploader.innerText = "Uploading '" + file.name + "' (" + percent + "%)...";
            };
            /**
             * Handles a file upload completing. The file's contents are loaded into
             * the level editor.
             *
             * @param file   The file being uploaded.
             * @param uploader   The element the file was being dragged onto.
             * @param event   The event caused by the upload completing.
             */
            LevelEditorGenerator.prototype.handleFileUploadCompletion = function (file, uploader, event) {
                this.GameStarter.LevelEditor.handleUploadCompletion(event);
                uploader.innerText = uploader.getAttribute("textOld");
            };
            return LevelEditorGenerator;
        })(UISchemas.OptionsGenerator);
        UISchemas.LevelEditorGenerator = LevelEditorGenerator;
    })(UISchemas = UserWrappr.UISchemas || (UserWrappr.UISchemas = {}));
})(UserWrappr || (UserWrappr = {}));
var UserWrappr;
(function (UserWrappr) {
    var UISchemas;
    (function (UISchemas) {
        "use strict";
        /**
         * Options generator for a grid of maps.
         */
        var MapsGridGenerator = (function (_super) {
            __extends(MapsGridGenerator, _super);
            function MapsGridGenerator() {
                _super.apply(this, arguments);
            }
            /**
             * Generates the HTML element for the maps.
             *
             * @param schema   The overall description of the editor control.
             * @returns An HTML element representing the schema.
             */
            MapsGridGenerator.prototype.generate = function (schema) {
                var output = document.createElement("div");
                output.className = "select-options select-options-maps-grid";
                if (schema.rangeX && schema.rangeY) {
                    output.appendChild(this.generateRangedTable(schema));
                }
                if (schema.extras) {
                    this.appendExtras(output, schema);
                }
                return output;
            };
            /**
             * Generates a table of map selection buttons from x- and y- ranges.
             *
             * @param schema   The overall description of the editor control.
             * @returns An HTMLTableElement with a grid of map selection buttons.
             */
            MapsGridGenerator.prototype.generateRangedTable = function (schema) {
                var scope = this, table = document.createElement("table"), rangeX = schema.rangeX, rangeY = schema.rangeY, row, cell, i, j;
                for (i = rangeY[0]; i <= rangeY[1]; i += 1) {
                    row = document.createElement("tr");
                    row.className = "maps-grid-row";
                    for (j = rangeX[0]; j <= rangeX[1]; j += 1) {
                        cell = document.createElement("td");
                        cell.className = "select-option maps-grid-option maps-grid-option-range";
                        cell.textContent = i + "-" + j;
                        cell.onclick = (function (callback) {
                            if (scope.getParentControlElement(cell).getAttribute("active") === "on") {
                                callback();
                            }
                        }).bind(scope, schema.callback.bind(scope, scope.GameStarter, schema, cell));
                        row.appendChild(cell);
                    }
                    table.appendChild(row);
                }
                return table;
            };
            /**
             * Adds any specified extra elements to this control's element.
             *
             * @param output   The element created by this generator.
             * @param schema   The overall discription of the editor control.
             */
            MapsGridGenerator.prototype.appendExtras = function (output, schema) {
                var element, extra, i, j;
                for (i = 0; i < schema.extras.length; i += 1) {
                    extra = schema.extras[i];
                    element = document.createElement("div");
                    element.className = "select-option maps-grid-option maps-grid-option-extra";
                    element.textContent = extra.title;
                    element.setAttribute("value", extra.title);
                    element.onclick = extra.callback.bind(this, this.GameStarter, schema, element);
                    output.appendChild(element);
                    if (extra.extraElements) {
                        for (j = 0; j < extra.extraElements.length; j += 1) {
                            output.appendChild(this.GameStarter.createElement(extra.extraElements[j].tag, extra.extraElements[j].options));
                        }
                    }
                }
            };
            return MapsGridGenerator;
        })(UISchemas.OptionsGenerator);
        UISchemas.MapsGridGenerator = MapsGridGenerator;
    })(UISchemas = UserWrappr.UISchemas || (UserWrappr.UISchemas = {}));
})(UserWrappr || (UserWrappr = {}));
var UserWrappr;
(function (UserWrappr) {
    var UISchemas;
    (function (UISchemas) {
        "use strict";
        /**
         * An options generator for a table of options. Each table contains a (left) label cell
         * and a (right) value cell with some sort of input.
         */
        var TableGenerator = (function (_super) {
            __extends(TableGenerator, _super);
            function TableGenerator() {
                _super.apply(this, arguments);
            }
            /**
             * Generates a control element with tabular information based on the provided schema.
             *
             * @param schema   A description of the tabular data to represent.
             * @returns An HTML element representing the schema.
             */
            TableGenerator.prototype.generate = function (schema) {
                var output = document.createElement("div"), table = document.createElement("table"), option, action, row, label, input, child, i;
                output.className = "select-options select-options-table";
                if (schema.options) {
                    for (i = 0; i < schema.options.length; i += 1) {
                        row = document.createElement("tr");
                        label = document.createElement("td");
                        input = document.createElement("td");
                        option = schema.options[i];
                        label.className = "options-label-" + option.type;
                        label.textContent = option.title;
                        input.className = "options-cell-" + option.type;
                        row.appendChild(label);
                        row.appendChild(input);
                        child = TableGenerator.optionTypes[schema.options[i].type].call(this, input, option, schema);
                        if (option.storeLocally) {
                            this.ensureLocalStorageInputValue(child, option, schema);
                        }
                        table.appendChild(row);
                    }
                }
                output.appendChild(table);
                if (schema.actions) {
                    for (i = 0; i < schema.actions.length; i += 1) {
                        row = document.createElement("div");
                        action = schema.actions[i];
                        row.className = "select-option options-button-option";
                        row.textContent = action.title;
                        row.onclick = action.action.bind(this, this.GameStarter);
                        output.appendChild(row);
                    }
                }
                return output;
            };
            /**
             * Initializes an input for a boolean value.
             *
             * @param input   An input that will contain a boolean value.
             * @param details   Details for this individual value.
             * @param schema   Details for the overall table schema.
             * @returns An HTML element containing the input.
             */
            TableGenerator.prototype.setBooleanInput = function (input, details, schema) {
                var status = details.source.call(this, this.GameStarter), statusClass = status ? "enabled" : "disabled", scope = this;
                input.className = "select-option options-button-option option-" + statusClass;
                input.textContent = status ? "on" : "off";
                input.onclick = function () {
                    input.setValue(input.textContent === "off");
                };
                input.setValue = function (newStatus) {
                    if (newStatus.constructor === String) {
                        if (newStatus === "false" || newStatus === "off") {
                            newStatus = false;
                        }
                        else if (newStatus === "true" || newStatus === "on") {
                            newStatus = true;
                        }
                    }
                    if (newStatus) {
                        details.enable.call(scope, scope.GameStarter);
                        input.textContent = "on";
                        input.className = input.className.replace("disabled", "enabled");
                    }
                    else {
                        details.disable.call(scope, scope.GameStarter);
                        input.textContent = "off";
                        input.className = input.className.replace("enabled", "disabled");
                    }
                    if (details.storeLocally) {
                        scope.storeLocalStorageValue(input, newStatus.toString());
                    }
                };
                return input;
            };
            /**
             * Initializes an input for a keyboard key value.
             *
             * @param input   An input that will contain a keyboard key value.
             * @param details   Details for this individual value.
             * @param schema   Details for the overall table schema.
             * @returns An HTML element containing the input.
             */
            TableGenerator.prototype.setKeyInput = function (input, details, schema) {
                var values = details.source.call(this, this.GameStarter), possibleKeys = this.UserWrapper.getAllPossibleKeys(), children = [], child, scope = this, valueLower, i, j;
                for (i = 0; i < values.length; i += 1) {
                    valueLower = values[i].toLowerCase();
                    child = document.createElement("select");
                    child.className = "options-key-option";
                    child.value = child.valueOld = valueLower;
                    for (j = 0; j < possibleKeys.length; j += 1) {
                        child.appendChild(new Option(possibleKeys[j]));
                        // Setting child.value won't work in IE or Edge...
                        if (possibleKeys[j] === valueLower) {
                            child.selectedIndex = j;
                        }
                    }
                    child.onchange = (function (child) {
                        details.callback.call(scope, scope.GameStarter, child.valueOld, child.value);
                        if (details.storeLocally) {
                            scope.storeLocalStorageValue(child, child.value);
                        }
                    }).bind(undefined, child);
                    children.push(child);
                    input.appendChild(child);
                }
                return children;
            };
            /**
             * Initializes an input for a numeric value.
             *
             * @param input   An input that will contain a numeric value.
             * @param details   Details for this individual value.
             * @param schema   Details for the overall table schema.
             * @returns An HTML element containing the input.
             */
            TableGenerator.prototype.setNumberInput = function (input, details, schema) {
                var child = document.createElement("input"), scope = this;
                child.type = "number";
                child.value = Number(details.source.call(scope, scope.GameStarter)).toString();
                child.min = (details.minimum || 0).toString();
                child.max = (details.maximum || Math.max(details.minimum + 10, 10)).toString();
                child.onchange = child.oninput = function () {
                    if (child.checkValidity()) {
                        details.update.call(scope, scope.GameStarter, child.value);
                    }
                    if (details.storeLocally) {
                        scope.storeLocalStorageValue(child, child.value);
                    }
                };
                input.appendChild(child);
                return child;
            };
            /**
             * Initializes an input for a value with multiple preset options.
             *
             * @param input   An input that will contain a value with multiple present options.
             * @param details   Details for this individual value.
             * @param schema   Details for the overall table schema.
             * @returns An HTML element containing the input.
             */
            TableGenerator.prototype.setSelectInput = function (input, details, schema) {
                var child = document.createElement("select"), options = details.options(this.GameStarter), scope = this, i;
                for (i = 0; i < options.length; i += 1) {
                    child.appendChild(new Option(options[i]));
                }
                child.value = details.source.call(scope, scope.GameStarter);
                child.onchange = function () {
                    details.update.call(scope, scope.GameStarter, child.value);
                    child.blur();
                    if (details.storeLocally) {
                        scope.storeLocalStorageValue(child, child.value);
                    }
                };
                input.appendChild(child);
                return child;
            };
            /**
             * Initializes an input for setting the GameStartr's screen size.
             *
             * @param input   An input that will set a GameStartr's screen size.
             * @param details   Details for this individual value.
             * @param schema   Details for the overall table schema.
             * @returns An HTML element containing the input.
             */
            TableGenerator.prototype.setScreenSizeInput = function (input, details, schema) {
                var scope = this, child;
                details.options = function () {
                    return Object.keys(scope.UserWrapper.getSizes());
                };
                details.source = function () {
                    return scope.UserWrapper.getCurrentSize().name;
                };
                details.update = function (GameStarter, value) {
                    if (value === scope.UserWrapper.getCurrentSize()) {
                        return undefined;
                    }
                    scope.UserWrapper.setCurrentSize(value);
                };
                child = scope.setSelectInput(input, details, schema);
                return child;
            };
            /**
             * Ensures an input's required local storage value is being stored,
             * and adds it to the internal GameStarter.ItemsHolder if not. If it
             * is, and the child's value isn't equal to it, the value is set.
             *
             * @param childRaw   An input or select element, or an Array thereof.
             * @param details   Details containing the title of the item and the
             *                  source Function to get its value.
             * @param schema   The container schema this child is within.
             */
            TableGenerator.prototype.ensureLocalStorageInputValue = function (childRaw, details, schema) {
                if (childRaw.constructor === Array) {
                    this.ensureLocalStorageValues(childRaw, details, schema);
                    return;
                }
                var child = childRaw, key = schema.title + "::" + details.title, valueDefault = details.source.call(this, this.GameStarter).toString(), value;
                child.setAttribute("localStorageKey", key);
                this.GameStarter.ItemsHolder.addItem(key, {
                    "storeLocally": true,
                    "valueDefault": valueDefault
                });
                value = this.GameStarter.ItemsHolder.getItem(key);
                if (value !== "" && value !== child.value) {
                    child.value = value;
                    if (child.setValue) {
                        child.setValue(value);
                    }
                    else if (child.onchange) {
                        child.onchange(undefined);
                    }
                    else if (child.onclick) {
                        child.onclick(undefined);
                    }
                }
            };
            /**
             * Ensures a collection of items all exist in localStorage. If their values
             * don't exist, their schema's .callback is used to provide them.
             *
             * @param childRaw   An Array of input or select elements.
             * @param details   Details containing the title of the item and the source
             *                  Function to get its value.
             * @param schema   The container schema this child is within.
             */
            TableGenerator.prototype.ensureLocalStorageValues = function (children, details, schema) {
                var keyGeneral = schema.title + "::" + details.title, values = details.source.call(this, this.GameStarter), key, value, child, i;
                for (i = 0; i < children.length; i += 1) {
                    key = keyGeneral + "::" + i;
                    child = children[i];
                    child.setAttribute("localStorageKey", key);
                    this.GameStarter.ItemsHolder.addItem(key, {
                        "storeLocally": true,
                        "valueDefault": values[i]
                    });
                    value = this.GameStarter.ItemsHolder.getItem(key);
                    if (value !== "" && value !== child.value) {
                        child.value = value;
                        if (child.onchange) {
                            child.onchange(undefined);
                        }
                        else if (child.onclick) {
                            child.onclick(undefined);
                        }
                    }
                }
            };
            /**
             * Stores an element's value in the internal GameStarter.ItemsHolder,
             * if it has the "localStorageKey" attribute.
             *
             * @param {HTMLElement} child   An element with a value to store.
             * @param {Mixed} value   What value is to be stored under the key.
             */
            TableGenerator.prototype.storeLocalStorageValue = function (child, value) {
                var key = child.getAttribute("localStorageKey");
                if (key) {
                    this.GameStarter.ItemsHolder.setItem(key, value);
                    this.GameStarter.ItemsHolder.saveItem(key);
                }
            };
            /**
             * Generators for the value cells within table rows.
             */
            TableGenerator.optionTypes = {
                "Boolean": TableGenerator.prototype.setBooleanInput,
                "Keys": TableGenerator.prototype.setKeyInput,
                "Number": TableGenerator.prototype.setNumberInput,
                "Select": TableGenerator.prototype.setSelectInput,
                "ScreenSize": TableGenerator.prototype.setScreenSizeInput
            };
            return TableGenerator;
        })(UISchemas.OptionsGenerator);
        UISchemas.TableGenerator = TableGenerator;
    })(UISchemas = UserWrappr.UISchemas || (UserWrappr.UISchemas = {}));
})(UserWrappr || (UserWrappr = {}));
var UserWrappr;
(function (UserWrappr_1) {
    "use strict";
    /**
     * A user interface manager made to work on top of GameStartr implementations
     * and provide a configurable HTML display of options.
     */
    var UserWrappr = (function () {
        /**
         * Initializes a new instance of the UserWrappr class.
         *
         * @param settings   Settings to be used for initialization.
         */
        function UserWrappr(settings) {
            /**
             * The document element that will contain the game.
             */
            this.documentElement = document.documentElement;
            /**
             * A browser-dependent method for request to enter full screen mode.
             */
            this.requestFullScreen = (this.documentElement.requestFullScreen
                || this.documentElement.webkitRequestFullScreen
                || this.documentElement.mozRequestFullScreen
                || this.documentElement.msRequestFullscreen
                || function () {
                    alert("Not able to request full screen...");
                }).bind(this.documentElement);
            /**
             * A browser-dependent method for request to exit full screen mode.
             */
            this.cancelFullScreen = (this.documentElement.cancelFullScreen
                || this.documentElement.webkitCancelFullScreen
                || this.documentElement.mozCancelFullScreen
                || this.documentElement.msCancelFullScreen
                || function () {
                    alert("Not able to cancel full screen...");
                }).bind(document);
            if (typeof settings === "undefined") {
                throw new Error("No settings object given to UserWrappr.");
            }
            if (typeof settings.GameStartrConstructor === "undefined") {
                throw new Error("No GameStartrConstructor given to UserWrappr.");
            }
            if (typeof settings.globalName === "undefined") {
                throw new Error("No globalName given to UserWrappr.");
            }
            if (typeof settings.sizes === "undefined") {
                throw new Error("No sizes given to UserWrappr.");
            }
            if (typeof settings.sizeDefault === "undefined") {
                throw new Error("No sizeDefault given to UserWrappr.");
            }
            if (typeof settings.schemas === "undefined") {
                throw new Error("No schemas given to UserWrappr.");
            }
            this.settings = settings;
            this.GameStartrConstructor = settings.GameStartrConstructor;
            this.globalName = settings.globalName;
            this.sizes = this.importSizes(settings.sizes);
            this.customs = settings.customs || {};
            this.gameElementSelector = settings.gameElementSelector || "#game";
            this.gameControlsSelector = settings.gameControlsSelector || "#controls";
            this.logger = settings.logger || console.log.bind(console);
            this.isFullScreen = false;
            this.setCurrentSize(this.sizes[settings.sizeDefault]);
            this.allPossibleKeys = settings.allPossibleKeys || UserWrappr.allPossibleKeys;
            // Size information is also passed to modules via this.customs
            this.GameStartrConstructor.prototype.proliferate(this.customs, this.currentSize, true);
            this.resetGameStarter(settings, this.customs);
        }
        /**
         * Resets the internal GameStarter by storing it under window, adding
         * InputWritr pipes for input to the page, creating the HTML buttons,
         * and setting additional CSS styles and page visiblity.
         *
         * @param settings   Settings for the GameStartr constructor.
         * @param customs   Additional settings for sizing information.
         */
        UserWrappr.prototype.resetGameStarter = function (settings, customs) {
            if (customs === void 0) { customs = {}; }
            this.loadGameStarter(this.fixCustoms(customs));
            window[settings.globalName] = this.GameStarter;
            this.GameStarter.UserWrapper = this;
            this.loadGenerators();
            this.loadControls(settings.schemas);
            if (settings.styleSheet) {
                this.GameStarter.addPageStyles(settings.styleSheet);
            }
            this.resetPageVisibilityHandlers();
            this.GameStarter.gameStart();
            this.startCheckingDevices();
        };
        /* Simple gets
        */
        /**
         * @returns The GameStartr implementation this is wrapping around.
         */
        UserWrappr.prototype.getGameStartrConstructor = function () {
            return this.GameStartrConstructor;
        };
        /**
         * @returns The GameStartr instance created by GameStartrConstructor.
         */
        UserWrappr.prototype.getGameStarter = function () {
            return this.GameStarter;
        };
        /**
         * @returns The ItemsHoldr used to store UI settings.
         */
        UserWrappr.prototype.getItemsHolder = function () {
            return this.ItemsHolder;
        };
        /**
         * @returns The settings used to construct this UserWrappr.
         */
        UserWrappr.prototype.getSettings = function () {
            return this.settings;
        };
        /**
         * @returns The customs used to construct the IGameStartr.
         */
        UserWrappr.prototype.getCustoms = function () {
            return this.customs;
        };
        /**
         * @returns All the keys the user is allowed to pick from in UI controls.
         */
        UserWrappr.prototype.getAllPossibleKeys = function () {
            return this.allPossibleKeys;
        };
        /**
         * @returns The allowed sizes for the game.
         */
        UserWrappr.prototype.getSizes = function () {
            return this.sizes;
        };
        /**
         * @returns The currently selected size for the game.
         */
        UserWrappr.prototype.getCurrentSize = function () {
            return this.currentSize;
        };
        /**
         * @returns Whether the game is currently in full screen mode.
         */
        UserWrappr.prototype.getIsFullScreen = function () {
            return this.isFullScreen;
        };
        /**
         * @returns Whether the page is currently known to be hidden.
         */
        UserWrappr.prototype.getIsPageHidden = function () {
            return this.isPageHidden;
        };
        /**
         * @returns A utility Function to log messages, commonly console.log.
         */
        UserWrappr.prototype.getLogger = function () {
            return this.logger;
        };
        /**
         * @returns Generators used to generate HTML controls for the user.
         */
        UserWrappr.prototype.getGenerators = function () {
            return this.generators;
        };
        /**
         * @returns The document element that contains the game.
         */
        UserWrappr.prototype.getDocumentElement = function () {
            return this.documentElement;
        };
        /**
         * @returns The method to request to enter full screen mode.
         */
        UserWrappr.prototype.getRequestFullScreen = function () {
            return this.requestFullScreen;
        };
        /**
         * @returns The method to request to exit full screen mode.
         */
        UserWrappr.prototype.getCancelFullScreen = function () {
            return this.cancelFullScreen;
        };
        /**
         * @returns The identifier for the device input checking interval.
         */
        UserWrappr.prototype.getDeviceChecker = function () {
            return this.deviceChecker;
        };
        /* Externally allowed sets
        */
        /**
         * Sets the size of the GameStartr by resetting the game with the size
         * information as part of its customs object. Full screen status is
         * changed accordingly.
         *
         * @param size The size to set, as a String to retrieve the size from
         *             known info, or a container of settings.
         */
        UserWrappr.prototype.setCurrentSize = function (size) {
            if (typeof size === "string" || size.constructor === String) {
                if (!this.sizes.hasOwnProperty(size)) {
                    throw new Error("Size " + size + " does not exist on the UserWrappr.");
                }
                size = this.sizes[size];
            }
            this.customs = this.fixCustoms(this.customs);
            if (size.full) {
                this.requestFullScreen();
                this.isFullScreen = true;
            }
            else if (this.isFullScreen) {
                this.cancelFullScreen();
                this.isFullScreen = false;
            }
            this.currentSize = size;
            if (this.GameStarter) {
                this.GameStarter.container.parentNode.removeChild(this.GameStarter.container);
                this.resetGameStarter(this.settings, this.customs);
            }
        };
        /* Devices
        */
        /**
         * Starts the checkDevices loop to scan for gamepad status changes.
         */
        UserWrappr.prototype.startCheckingDevices = function () {
            this.checkDevices();
        };
        /**
         * Calls the DeviceLayer to check for gamepad triggers, after scheduling
         * another checkDevices call via setTimeout.
         */
        UserWrappr.prototype.checkDevices = function () {
            this.deviceChecker = setTimeout(this.checkDevices.bind(this), this.GameStarter.GamesRunner.getPaused()
                ? 117
                : this.GameStarter.GamesRunner.getInterval() / this.GameStarter.GamesRunner.getSpeed());
            this.GameStarter.DeviceLayer.checkNavigatorGamepads();
            this.GameStarter.DeviceLayer.activateAllGamepadTriggers();
        };
        /* Settings parsing
        */
        /**
         * Creates as a copy of the given sizes with names as members.
         *
         * @param sizesRaw   The listing of preset sizes to go by.
         * @returns A copy of sizes, with names as members.
         */
        UserWrappr.prototype.importSizes = function (sizesRaw) {
            var sizes = this.GameStartrConstructor.prototype.proliferate({}, sizesRaw), i;
            for (i in sizes) {
                if (sizes.hasOwnProperty(i)) {
                    sizes[i].name = sizes[i].name || i;
                }
            }
            return sizes;
        };
        /**
         * Creates a copy of the given customs and adjusts sizing information,
         * such as for infinite width or height.
         *
         * @param customsRaw   Raw, user-provided customs.
         */
        UserWrappr.prototype.fixCustoms = function (customsRaw) {
            var customs = this.GameStartrConstructor.prototype.proliferate({}, customsRaw);
            this.GameStartrConstructor.prototype.proliferate(customs, this.currentSize);
            if (!isFinite(customs.width)) {
                customs.width = document.body.clientWidth;
            }
            if (!isFinite(customs.height)) {
                if (customs.full) {
                    customs.height = screen.height;
                }
                else if (this.isFullScreen) {
                    // Guess for browser window...
                    // @todo Actually compute this!
                    customs.height = window.innerHeight - 140;
                }
                else {
                    customs.height = window.innerHeight;
                }
                // 49px from header, 77px from menus
                customs.height -= 126;
            }
            return customs;
        };
        /* Page visibility
        */
        /**
         * Adds a "visibilitychange" handler to the document bound to
         * this.handleVisibilityChange.
         */
        UserWrappr.prototype.resetPageVisibilityHandlers = function () {
            document.addEventListener("visibilitychange", this.handleVisibilityChange.bind(this));
        };
        /**
         * Handles a visibility change event by calling either this.onPageHidden
         * or this.onPageVisible.
         */
        UserWrappr.prototype.handleVisibilityChange = function () {
            switch (document.visibilityState) {
                case "hidden":
                    this.onPageHidden();
                    return;
                case "visible":
                    this.onPageVisible();
                    return;
                default:
                    return;
            }
        };
        /**
         * Reacts to the page becoming hidden by pausing the GameStartr.
         */
        UserWrappr.prototype.onPageHidden = function () {
            if (!this.GameStarter.GamesRunner.getPaused()) {
                this.isPageHidden = true;
                this.GameStarter.GamesRunner.pause();
            }
        };
        /**
         * Reacts to the page becoming visible by unpausing the GameStartr.
         */
        UserWrappr.prototype.onPageVisible = function () {
            if (this.isPageHidden) {
                this.isPageHidden = false;
                this.GameStarter.GamesRunner.play();
            }
        };
        /* Control section loaders
        */
        /**
         * Loads the internal GameStarter, resetting it with the given customs
         * and attaching handlers to document.body and the holder elements.
         *
         * @param customs   Custom arguments to pass to this.GameStarter.
         */
        UserWrappr.prototype.loadGameStarter = function (customs) {
            var section = document.querySelector(this.gameElementSelector);
            if (this.GameStarter) {
                this.GameStarter.GamesRunner.pause();
            }
            this.GameStarter = new this.GameStartrConstructor(customs);
            section.textContent = "";
            section.appendChild(this.GameStarter.container);
            this.GameStarter.proliferate(document.body, {
                "onkeydown": this.GameStarter.InputWriter.makePipe("onkeydown", "keyCode"),
                "onkeyup": this.GameStarter.InputWriter.makePipe("onkeyup", "keyCode")
            });
            this.GameStarter.proliferate(section, {
                "onmousedown": this.GameStarter.InputWriter.makePipe("onmousedown", "which"),
                "oncontextmenu": this.GameStarter.InputWriter.makePipe("oncontextmenu", null, true)
            });
        };
        /**
         * Loads the internal OptionsGenerator instances under this.generators.
         */
        UserWrappr.prototype.loadGenerators = function () {
            this.generators = {
                OptionsButtons: new UserWrappr_1.UISchemas.ButtonsGenerator(this),
                OptionsTable: new UserWrappr_1.UISchemas.TableGenerator(this),
                LevelEditor: new UserWrappr_1.UISchemas.LevelEditorGenerator(this),
                MapsGrid: new UserWrappr_1.UISchemas.MapsGridGenerator(this)
            };
        };
        /**
         * Loads the externally facing UI controls and the internal ItemsHolder,
         * appending the controls to the controls HTML element.
         *
         * @param schemas   The schemas for each UI control to be made.
         */
        UserWrappr.prototype.loadControls = function (schemas) {
            var section = document.querySelector(this.gameControlsSelector), length = schemas.length, i;
            this.ItemsHolder = new ItemsHoldr.ItemsHoldr({
                "prefix": this.globalName + "::UserWrapper::ItemsHolder"
            });
            section.textContent = "";
            section.className = "length-" + length;
            for (i = 0; i < length; i += 1) {
                section.appendChild(this.loadControlDiv(schemas[i]));
            }
        };
        /**
         * Creates an individual UI control element based on a UI schema.
         *
         * @param schemas   The schemas for a UI control to be made.
         * @returns An individual UI control element.
         */
        UserWrappr.prototype.loadControlDiv = function (schema) {
            var control = document.createElement("div"), heading = document.createElement("h4"), inner = document.createElement("div");
            control.className = "control";
            control.id = "control-" + schema.title;
            heading.textContent = schema.title;
            inner.className = "control-inner";
            inner.appendChild(this.generators[schema.generator].generate(schema));
            control.appendChild(heading);
            control.appendChild(inner);
            // Touch events often propogate to children before the control div has
            // been fully extended. Delaying the "active" attribute fixes that.
            control.onmouseover = function () {
                setTimeout(function () {
                    control.setAttribute("active", "on");
                }, 35);
            };
            control.onmouseout = function () {
                control.setAttribute("active", "off");
            };
            return control;
        };
        /**
         * The default list of all allowed keyboard keys.
         */
        UserWrappr.allPossibleKeys = [
            "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m",
            "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z",
            "up", "right", "down", "left", "space", "shift", "ctrl"
        ];
        return UserWrappr;
    })();
    UserWrappr_1.UserWrappr = UserWrappr;
})(UserWrappr || (UserWrappr = {}));
