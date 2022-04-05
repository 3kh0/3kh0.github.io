/// <reference path="../FullScreenMario.ts" />
var FullScreenMario;
(function (FullScreenMario) {
    "use strict";
    FullScreenMario.FullScreenMario.settings.help = {
        "globalName": "FSM",
        "aliases": [
            ["{GAME}", "FSM"]
        ],
        "openings": [
            ["%cHi, thanks for playing FullScreenMario!%c :)", "head"],
            ["If you'd like to know the common cheats, enter %c{GAME}.UsageHelper.displayHelpOptions();%c here.", "code"],
            "http://www.github.com/FullScreenShenanigans/FullScreenMario"
        ],
        "options": {
            "Map": [
                {
                    "title": "{GAME}.setMap",
                    "description": "Go to a specified map and location.",
                    "usage": "{GAME}.setMap(<map>[, <location>]);",
                    "examples": [
                        {
                            "code": "{GAME}.setMap(\"1-1\");",
                            "comment": "Starts map 1-1."
                        }, {
                            "code": "{GAME}.setMap(\"1-2\", 1);",
                            "comment": "Starts map 1-2, at the second location."
                        }, {
                            "code": "{GAME}.setMap(\"Random\");",
                            "comment": "Starts the random map."
                        }, {
                            "code": "{GAME}.setMap(\"Random\", \"Underworld\");",
                            "comment": "Starts the random map in the Underworld."
                        }]
                }],
            "Things": [
                {
                    "title": "{GAME}.addThing",
                    "description": "Adds a new Thing to the game.",
                    "usage": "{GAME}.addThing(<thing>, left, top);",
                    "examples": [
                        {
                            "code": "{GAME}.addThing(\"Goomba\", 256, 384);",
                            "comment": "Adds a Goomba to the game."
                        }, {
                            "code": "{GAME}.addThing(\"Mushroom\", {GAME}.player.right + 80, {GAME}.player.top);",
                            "comment": "Adds a Mushroom to the right of the player."
                        }, {
                            "code": "{GAME}.addThing([\"Koopa\", { \"smart\": true }], 256, 368);",
                            "comment": "Adds a smart Koopa to the game."
                        }, {
                            "code": "{GAME}.addThing({GAME}.ObjectMaker.make(\"Koopa\", { \"smart\": true, \"jumping\": true }), 256, 368);",
                            "comment": "Adds a smart jumping Koopa to the game."
                        }]
                }, {
                    "title": "{GAME}.GroupHolder.getGroups",
                    "description": "Gets the groups of in-game Things.",
                    "usage": "{GAME}.GroupHolder.getGroups();"
                }, {
                    "title": "{GAME}.GroupHolder.get*******Group",
                    "description": "Retrieves the group of in-game Things under that name.",
                    "usage": "{GAME}.GroupHolder.get*******Group();",
                    "examples": [
                        {
                            "code": "{GAME}.GroupHolder.getCharacterGroup();",
                            "comment": "Retrieves the currently playing Characters."
                        }]
                }, {
                    "title": "{GAME}.GroupHolder.get*******",
                    "description": "Retrieves the numbered Thing from its group.",
                    "usage": "{GAME}.GroupHolder.get*******(<index>);",
                    "examples": [
                        {
                            "code": "{GAME}.GroupHolder.getCharacter(0);",
                            "comment": "Retrieves the first playing Character."
                        }]
                }],
            "Physics": [
                {
                    "title": "{GAME}.shiftBoth",
                    "description": "Shifts a Thing horizontally and/or vertically.",
                    "usage": "{GAME}.shiftBoth(<thing>, <dx>[, <dy>]);",
                    "examples": [
                        {
                            "code": "{GAME}.shiftBoth({GAME}.player, 700);",
                            "comment": "Shifts the player 700 spaces to the right"
                        }, {
                            "code": "{GAME}.player.resting = undefined;\r\n{GAME}.shiftBoth({GAME}.player, 0, -{GAME}.player.top);",
                            "comment": "Shifts the player to the top of the screen."
                        }]
                }, {
                    "title": "{GAME}.killNormal",
                    "description": "Kills a specified Character with animation.",
                    "usage": "{GAME}.killNormal(<thing>);",
                    "examples": [
                        {
                            "code": "{GAME}.killNormal({GAME}.GroupHolder.getCharacter(0));",
                            "comment": "Kills the first playing Character."
                        }, {
                            "code": "{GAME}.GroupHolder.getSceneryGroup().forEach({GAME}.killNormal.bind(FSM));",
                            "comment": "Kills all playing Scenery."
                        }]
                }, {
                    "title": "{GAME}.player.gravity",
                    "description": "Sets the current Player's gravity.",
                    "usage": "{GAME}.player.gravity = <number>;",
                    "examples": [
                        {
                            "code": "{GAME}.player.gravity = {GAME}.MapScreener.gravity / 2;",
                            "comment": "Sets the player's gravity to half the default."
                        }]
                }],
            "Powerups": [
                {
                    "title": "{GAME}.playerShroom",
                    "description": "Simulates the player hitting a Mushroom.",
                    "usage": "{GAME}.playerShroom({GAME}.player);"
                }, {
                    "title": "{GAME}.playerStarUp",
                    "description": "Simulates the player hitting a Star.",
                    "usage": "{GAME}.playerStarUp({GAME}.player);"
                }],
            "Statistics": [
                {
                    "title": "{GAME}.ItemsHolder.getKeys",
                    "description": "Gets the keys you can manipulate.",
                    "usage": "{GAME}.ItemsHolder.getKeys();"
                }, {
                    "title": "{GAME}.ItemsHolder.setItem",
                    "description": "Sets a stored statitistic to a value.",
                    "usage": "{GAME}.ItemsHolder.setItem(\"<key>\", <number>);",
                    "examples": [
                        {
                            "code": "{GAME}.ItemsHolder.setItem(\"coins\", 77);",
                            "comment": "Sets the number of coins to 77."
                        }, {
                            "code": "{GAME}.ItemsHolder.setItem(\"lives\", 7);",
                            "comment": "Sets the number of lives to seven."
                        }, {
                            "code": "{GAME}.ItemsHolder.setItem(\"lives\", Infinity);",
                            "comment": "Sets the number of lives to Infinity and beyond."
                        }]
                }, {
                    "title": "{GAME}.ItemsHolder.increase",
                    "description": "Increases the number of coins you have.",
                    "usage": "{GAME}.ItemsHolder.increase(\"coins\", <number>);",
                    "examples": [
                        {
                            "code": "{GAME}.ItemsHolder.increase(\"coins\", 7);",
                            "comment": "Increases the number of coins by seven."
                        }]
                }],
            "Mods": [
                {
                    "title": "{GAME}.ModAttacher.getMods",
                    "description": "Gets all the available mods.",
                    "usage": "{GAME}.ItemsHolder.getMods();"
                }, {
                    "title": "{GAME}.ModAttacher.enableMod",
                    "description": "Enables a mod.",
                    "usage": "{GAME}.enableMod(\"<key>\");",
                    "examples": [
                        {
                            "code": "{GAME}.enableMod(\"Gradient Skies\");",
                            "comment": "Enables the \"Gradient Skies\" mod."
                        }]
                }, {
                    "title": "{GAME}.ModAttacher.disableMod",
                    "description": "Disables a mod.",
                    "usage": "{GAME}.disableMod(\"<key>\");",
                    "examples": [
                        {
                            "code": "{GAME}.disableMod(\"Gradient Skies\");",
                            "comment": "Disables the \"Gradient Skies\" mod."
                        }]
                }]
        },
        "optionHelp": "To focus on a group, enter %c{GAME}.UsageHelper.displayHelpOption(\"<group-name>\");%c"
    };
})(FullScreenMario || (FullScreenMario = {}));
