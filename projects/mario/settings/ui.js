/// <reference path="../FullScreenMario.ts" />
var FullScreenMario;
(function (FullScreenMario) {
    "use strict";
    FullScreenMario.FullScreenMario.settings.ui = {
        "globalName": "FSM",
        "styleSheet": {
            ".FullScreenMario": {
                "color": "white"
            },
            "@font-face": {
                "font-family": "'Press Start'",
                "src": [
                    "url('Fonts/pressstart2p-webfont.eot')",
                    "url('Fonts/pressstart2p-webfont.eot?#iefix') format('embedded-opentype')",
                    "url('Fonts/pressstart2p-webfont.woff') format('woff')",
                    "url('Fonts/pressstart2p-webfont.ttf') format('truetype')",
                    "url('Fonts/pressstart2p-webfont.svg') format('svg')"
                ].join(", "),
                "font-weight": "normal",
                "font-style": "normal"
            }
        },
        "sizeDefault": "Wide",
        "sizes": {
            "NES": {
                "width": 512,
                "height": 464,
                "full": false
            },
            "Wide": {
                "width": Infinity,
                "height": 464,
                "full": false
            },
            "Large": {
                "width": Infinity,
                "height": Infinity,
                "full": false
            },
            "Full!": {
                "width": Infinity,
                "height": Infinity,
                "full": true
            }
        },
        "schemas": [
            {
                "title": "Options",
                "generator": "OptionsTable",
                "options": [
                    {
                        "title": "Volume",
                        "type": "Number",
                        "minimum": 0,
                        "maximum": 100,
                        "source": function (FSM) {
                            return Math.round(FSM.AudioPlayer.getVolume() * 100);
                        },
                        "update": function (FSM, value) {
                            FSM.AudioPlayer.setVolume(value / 100);
                        }
                    },
                    {
                        "title": "Mute",
                        "type": "Boolean",
                        "source": function (FSM) {
                            return FSM.AudioPlayer.getMuted();
                        },
                        "enable": function (FSM) {
                            FSM.AudioPlayer.setMutedOn();
                        },
                        "disable": function (FSM) {
                            FSM.AudioPlayer.setMutedOff();
                        }
                    },
                    {
                        "title": "Speed",
                        "type": "Select",
                        "options": function (FSM) {
                            return [".25x", ".5x", "1x", "2x", "5x"];
                        },
                        "source": function (FSM) {
                            return "1x";
                        },
                        "update": function (FSM, value) {
                            FSM.GamesRunner.setSpeed(Number(value.replace("x", "")));
                        },
                        "storeLocally": true
                    },
                    {
                        "title": "View Mode",
                        "type": "ScreenSize"
                    },
                    {
                        "title": "Framerate",
                        "type": "Select",
                        "options": function (FSM) {
                            return ["60fps", "30fps"];
                        },
                        "source": function (FSM) {
                            return (1 / FSM.PixelDrawer.getFramerateSkip() * 60) + "fps";
                        },
                        "update": function (FSM, value) {
                            FSM.PixelDrawer.setFramerateSkip(1 / Number(value.replace("fps", "")) * 60);
                        },
                        "storeLocally": true
                    },
                    {
                        "title": "Touch Controls",
                        "type": "Boolean",
                        "storeLocally": true,
                        "source": function (FSM) { return false; },
                        "enable": function (FSM) {
                            setTimeout(function () { return FSM.TouchPasser.enable(); });
                        },
                        "disable": function (FSM) {
                            setTimeout(function () { return FSM.TouchPasser.disable(); });
                        }
                    },
                    {
                        "title": "Tilt Controls",
                        "type": "Boolean",
                        "storeLocally": true,
                        "source": function (FSM) { return false; },
                        "enable": function (FSM) {
                            window.ondevicemotion = FSM.InputWriter.makePipe("ondevicemotion", "type");
                        },
                        "disable": function (FSM) {
                            window.ondevicemotion = undefined;
                        }
                    }
                ],
                "actions": [
                    {
                        "title": "Screenshot",
                        "action": function (FSM) {
                            FSM.takeScreenshot("FullScreenMario " + new Date().getTime());
                        }
                    }
                ]
            }, {
                "title": "Controls",
                "generator": "OptionsTable",
                "options": (function (controls) {
                    return controls.map(function (title) {
                        return {
                            "title": title[0].toUpperCase() + title.substr(1),
                            "type": "Keys",
                            "storeLocally": true,
                            "source": function (FSM) {
                                return FSM.InputWriter
                                    .getAliasAsKeyStrings(title)
                                    .map(function (string) { return string.toLowerCase(); });
                            },
                            "callback": function (FSM, valueOld, valueNew) {
                                FSM.InputWriter.switchAliasValues(title, [FSM.InputWriter.convertKeyStringToAlias(valueOld)], [FSM.InputWriter.convertKeyStringToAlias(valueNew)]);
                            }
                        };
                    });
                })(["left", "right", "up", "down", "sprint", "pause"])
            }, {
                "title": "Mods!",
                "generator": "OptionsButtons",
                "keyActive": "enabled",
                "assumeInactive": true,
                "options": function (FSM) {
                    var mods = FSM.ModAttacher.getMods(), output = [], mod, i;
                    for (i in mods) {
                        if (!mods.hasOwnProperty(i)) {
                            continue;
                        }
                        mod = mods[i];
                        output.push({
                            "title": mod.name,
                            "source": function () { return mod.enabled; },
                            "storeLocally": true,
                            "type": "text"
                        });
                    }
                    return output;
                },
                "callback": function (FSM, schema, button) {
                    var name = button.textContent, key = button.getAttribute("localStorageKey"), mod = FSM.ModAttacher.getMod(name);
                    FSM.ModAttacher.toggleMod(name);
                    FSM.ItemsHolder.setItem(key, mod.enabled);
                    FSM.ItemsHolder.saveItem(key);
                }
            }, {
                "title": "Editor",
                "generator": "LevelEditor",
                "maps": {
                    "rangeX": [1, 4],
                    "rangeY": [1, 8],
                    "callback": function (FSM, schema, button) {
                        FSM.LevelEditor.enable();
                        FSM.LevelEditor.setCurrentJSON(JSON.stringify(FSM.MapsCreator.getMapRaw(button.textContent)));
                        FSM.LevelEditor.startBuilding();
                    }
                }
            }, {
                "title": "Maps",
                "generator": "MapsGrid",
                "rangeX": [1, 4],
                "rangeY": [1, 8],
                "extras": [
                    (function () {
                        function getNewSeed() {
                            return new Date().getTime()
                                .toString()
                                .split("")
                                .sort(function () { return 0.5 - Math.random(); })
                                .reverse()
                                .join("");
                        }
                        return {
                            "title": "Map Generator!",
                            "callback": function (FSM, schema, button, event) {
                                var parent = event.target.parentElement, randomizer = parent.querySelector(".randomInput");
                                randomizer.value = randomizer.value.replace(/[^\d]/g, "");
                                if (!randomizer.value) {
                                    randomizer.value = getNewSeed();
                                }
                                FSM.LevelEditor.disable();
                                FSM.NumberMaker.resetFromSeed(Number(randomizer.value));
                                FSM.setMap("Random");
                                if (!randomizer.getAttribute("custom")) {
                                    randomizer.value = getNewSeed();
                                }
                            },
                            "extraElements": [
                                {
                                    "tag": "input",
                                    "options": {
                                        "className": "randomInput maps-grid-input",
                                        "type": "text",
                                        "value": getNewSeed(),
                                        "onchange": function (event) {
                                            event.target.setAttribute("custom", "true");
                                        }
                                    }
                                }
                            ]
                        };
                    })()
                ],
                "callback": function (FSM, schema, button) {
                    FSM.LevelEditor.disable();
                    FSM.setMap(button.getAttribute("value") || button.textContent);
                }
            }
        ]
    };
})(FullScreenMario || (FullScreenMario = {}));
