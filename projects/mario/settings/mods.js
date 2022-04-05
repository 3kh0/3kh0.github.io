FullScreenMario.FullScreenMario.settings.mods = {
    "storeLocally": true,
    "mods": [
        {
            "name": "Bouncy Bounce",
            "description": "Mario landing causes him to jump.",
            "author": {
                "name": "Josh Goldberg",
                "email": "josh@fullscreenmario.com"
            },
            "enabled": false,
            "events": {
                "onPlayerLanding": function (mod) {
                    var player = this.player;
                    
                    // Don't trigger during cutscenes or small landings
                    if (
                        player.FSM.MapScreener.nokeys
                        || Math.abs(player.yvel) < player.FSM.unitsize / 4
                    ) {
                        return;
                    }
                    
                    if (player.resting.actionTop) {
                        player.resting.actionTop(player, player.resting);
                    }
                    
                    player.jumpcount = 0;
                    player.resting = undefined;
                    player.yvel = -3 * player.FSM.unitsize;
                },
                "onPlayerActionLeft": function (mod, player, other) {
                    other.actionLeft(player, other, true);
                }
            },
        }, {
            "name": "Dark is the Night",
            "description": "The night is darkest before the dawn, but I promise you: the dawn is coming.",
            "author": {
                "name": "Josh Goldberg",
                "email": "josh@fullscreenmario.com"
            },
            "enabled": false,
            "events": {
                "onModEnable": function (mod) {
                    var area = this.AreaSpawner.getArea();
                    
                    if (!area) {
                        return;
                    }
                    
                    mod.events.onPreSetLocation.call(this, mod);
                },
                "onPreSetLocation": function (mod) {
                    var area = this.AreaSpawner.getArea();
                    
                    area.setting += " Castle Alt2";
                    area.setBackground(area);
                    
                    this.PixelDrawer.setBackground(area.background);
                    this.GroupHolder.callOnAll(this, this.PixelDrawer.setThingSprite.bind(this.PixelDrawer));
                    
                    this.ModAttacher.fireEvent(
                        "onSetLocation",
                        this.AreaSpawner.getLocation()
                    );
                },
                "onModDisable": function (mod) {
                    var area = this.AreaSpawner.getArea();
                    
                    area.setting = area.setting.replace(" Castle Alt2", "");
                    area.setBackground(area);
                    
                    this.PixelDrawer.setBackground(area.background);
                    this.GroupHolder.callOnAll(this, this.PixelDrawer.setThingSprite.bind(this.PixelDrawer));
                    
                    this.ModAttacher.fireEvent(
                        "onSetLocation",
                        this.AreaSpawner.getLocation()
                    );
                }
            }
        }, {
            "name": "Earthquake!",
            "description": "Mario landing causes everything else to jump.",
            "author": {
                "name": "Josh Goldberg",
                "email": "josh@fullscreenmario.com"
            },
            "enabled": false,
            "events": {
                "onPlayerLanding": (function () {
                    var shiftLevels = [2, 1.5, 1, .5, 0, -.5, -1, -1.5, -2],
                        shiftCount = 0,
                        shiftAll = function (FSM, texts, solids, scenery, characters) {
                            var dy = shiftLevels[shiftCount];
                            
                            if (dy < 0) {
                                FSM.shiftVert(FSM.player, dy);
                            }
                            
                            FSM.shiftThings(texts, 0, dy);
                            FSM.shiftThings(solids, 0, dy);
                            FSM.shiftThings(scenery, 0, dy);
                            FSM.shiftThings(characters, 0, dy);
                            
                            shiftCount += 1;
                            if (shiftCount >= shiftLevels.length) {
                                shiftCount = 0;
                                return true;
                            }
                        };
                    
                    return function (mod) {
                        var player = this.player,
                            characters, solids, scenery, texts, character, i;
                    
                        // Don't trigger during cutscenes or small landings
                        if (
                            player.FSM.MapScreener.nokeys
                            || Math.abs(player.yvel) < player.FSM.unitsize / 4
                        ) {
                            return;
                        }
                        
                        this.AudioPlayer.play("Bump");
                        
                        texts = this.GroupHolder.getTextGroup().slice();
                        scenery = this.GroupHolder.getSceneryGroup().slice();
                        solids = this.GroupHolder.getSolidGroup().slice();
                        characters = this.GroupHolder.getCharacterGroup().slice();
                        
                        for (i = 0; i < characters.length; i += 1) {
                            character = characters[i];
                            if (
                                character.player 
                                || character.nofall 
                                || !character.resting 
                                || character.grounded
                            ) {
                                continue;
                            }
                            
                            character.resting = undefined;
                            character.yvel = player.FSM.unitsize * -1.4;
                        }
                        
                        // A copy of each group is made because new Things 
                        // added in shouldn't start being moved in the middle
                        if (shiftCount === 0) {
                            this.TimeHandler.addEventInterval(
                                shiftAll, 1, Infinity, this,
                                texts, solids, scenery, characters
                            );
                        }
                    }
                })()
            }
        }, {
            "name": "Gradient Skies",
            "description": "Skies fade out to black in the heavens above.",
            "author": {
                "name": "Josh Goldberg",
                "email": "josh@fullscreenmario.com"
            },
            "enabled": false,
            "events": {
                "onModEnable": function (mod) {
                    if (this.AreaSpawner.getMap()) {
                        mod.events.onSetLocation.call(this, mod);
                    }
                },
                "onModDisable": function (mod) {
                    var area = this.AreaSpawner.getArea();
                    
                    area.setBackground(area);
                    this.PixelDrawer.setBackground(area.background);
                },
                "onSetLocation": (function (gradients) {
                    return function (mod) {
                        var area = this.AreaSpawner.getArea(),
                            setting = area.setting,
                            context = this.canvas.getContext("2d"),
                            background = context.createLinearGradient(
                                0, 0,
                                this.MapScreener.width,
                                this.MapScreener.height
                            ), gradient, i;
                        
                        for (i in gradients) {
                            if (setting.indexOf(i) !== -1) {
                                gradient = gradients[i]
                                break;
                            }
                        }
                        
                        if (!gradient) {
                            gradient = gradients["default"];
                        }
                        
                        for (i in gradient) {
                            background.addColorStop(i, gradient[i]);
                        }
                        
                        area.background = background;
                        this.PixelDrawer.setBackground(area.background);
                    };
                })({
                    "Underwater": {
                        ".21": "#5CC7FC",
                        "1": "#CCCCAA"
                    },
                    "Night": {
                        "0": "#000000",
                        "0.49": "#000035",
                        "0.84": "#280035",
                        "1": "#350035"
                    },
                    "Underworld": {
                        "0.35": "#000000",
                        "1": "#003528"
                    },
                    "Castle": {
                        "0.21": "#000000",
                        "1": "#700000"
                    },
                    "Shrooms": {
                        ".21": "#9C94EC",
                        ".49": "#A7AAEE",
                        "1": "#FFCC77"
                    },
                    "Womb": {
                        "0.21": "#703521",
                        ".7": "#770014",
                        "1": "#AA0035"
                    },
                    "default": {
                        ".21": "#5C94FC",
                        ".49": "#77AAFF",
                        "1": "#FFCCAA"
                    }
                })
            },
            "settings": {}
        }, {
            // http://www.themushroomkingdom.net/smb_breakdown.shtml#hard
            "name": "Hard Mode",
            "description": "Like in Super Mario Bros Deluxe!",
            "author": {
                "name": "Josh Goldberg",
                "email": "josh@fullscreenmario.com"
            },
            "enabled": false,
            "events": {
                "onAddThing": function (mod, thing) {
                    var spawn;
                    if (thing.title === "Goomba") {
                        spawn = thing.FSM.killReplace(
                            thing,
                            "Beetle", 
                            undefined,
                            [ "direction", "moveleft", "lookleft", "xvel", "yvel", "speed" ]
                        );
                        spawn.mod = "Hard Mode";
                    }
                    else if (thing.title === "Platform") {
                        thing.FSM.reduceWidth(thing, thing.FSM.unitsize * 8, true);
                        thing.FSM.shiftHoriz(thing, thing.FSM.unitsize * 4);
                    }
                    
                    if (thing.groupType === "Character") {
                        thing.speed *= 1.4;
                    }
                },
                "onModEnable": function (mod) {
                    var FSM = FullScreenMario.FullScreenMario.prototype.ensureCorrectCaller(this),
                        characters = FSM.GroupHolder.getCharacterGroup(),
                        solids = FSM.GroupHolder.getSolidGroup(),
                        attributes = ["direction", "moveleft", "lookleft", "xvel", "yvel", "speed"],
                        spawn, thing, i;
                    
                    for (i = 0; i < characters.length; i += 1) {
                        thing = characters[i];
                        if (thing.title === "Goomba") {
                            spawn = thing.FSM.killReplace(
                                thing, 
                                "Beetle", 
                                undefined,
                                attributes
                            );
                            spawn.mod = "Hard Mode";
                            if (thing.xvel > 0) {
                                spawn.FSM.flipHoriz(spawn);
                            } else {
                                spawn.FSM.unflipHoriz(spawn);
                            }
                        }
                        thing.speed *= 1.4;
                    }
                    
                    for(i = 0; i < solids.length; i += 1) {
                        thing = solids[i];
                        if(thing.title === "Platform") {
                            thing.FSM.reduceWidth(thing, thing.FSM.unitsize * 8, true);
                            thing.FSM.shiftHoriz(thing, thing.FSM.unitsize * 4);
                        }
                    }
                },
                "onModDisable": function (mod) {
                    var FSM = FullScreenMario.FullScreenMario.prototype.ensureCorrectCaller(this),
                        characters = FSM.GroupHolder.getCharacterGroup(),
                        solids = FSM.GroupHolder.getSolidGroup(),
                        attributes = ["direction", "moveleft", "lookleft", "xvel", "yvel", "speed"],
                        thing, i;
                    
                    for (i = 0; i < characters.length; i += 1) {
                        thing = characters[i];
                        if (thing.title === "Beetle" && thing.mod === "Hard Mode") {
                            thing.FSM.killReplace(
                                thing, 
                                "Goomba", 
                                undefined,
                                attributes
                            );
                        } else {
                            thing.speed /= 1.4;
                        }
                    }
                    
                    for (i = 0; i < solids.length; i += 1) {
                        thing = solids[i];
                        if (thing.title === "Platform") {
                            thing.FSM.increaseWidth(thing, thing.FSM.unitsize * 8);
                            thing.FSM.shiftHoriz(thing, thing.FSM.unitsize * -4);
                        }
                    }
                }
            }
        }, {
            "name": "High Speed",
            "description": "Mario's maximum speed is quadrupled.",
            "author": {
                "name": "Josh Goldberg",
                "email": "josh@fullscreenmario.com"
            },
            "enabled": false,
            "events": {
                "onModEnable": function (mod) {
                    var stats = this.ObjectMaker.getFunction("Player").prototype,
                        keyNames = mod.settings.keyNames,
                        multiplier = mod.settings.multiplier,
                        i;
                    
                    for (i = 0; i < keyNames.length; i += 1) {
                        mod.settings[keyNames[i]] = stats[keyNames[i]];
                        stats[keyNames[i]] *= multiplier;
                    }
                },
                "onModDisable": function (mod) {
                    var stats = this.ObjectMaker.getFunction("Player").prototype,
                        keyNames = mod.settings.keyNames,
                        i;
                    
                    for (i = 0; i < keyNames.length; i += 1) {
                        stats[keyNames[i]] = mod.settings[keyNames[i]];
                    }
                }
            },
            "settings": {
                "keyNames": ["maxspeedsave", "maxspeed", "scrollspeed"],
                "multiplier": 14
            }
        }, {
            "name": "Infinite Lives",
            "description": "Mario never really dies.",
            "author": {
                "name": "Josh Goldberg",
                "email": "josh@fullscreenmario.com"
            },
            "enabled": false,
            "events": {
                "onModEnable": function (mod) {
                    var FSM = FullScreenMario.FullScreenMario.prototype.ensureCorrectCaller(this),
                        proto = FSM.ObjectMaker.getFunction("Area").prototype,
                        stats = FSM.settings.items.values.lives;
                    
                    mod.settings.onPlayerDeathOld = proto.onPlayerDeath;
                    proto.onPlayerDeath = FSM.mapEntranceRespawn;
                    
                    mod.settings.livesOld = FSM.ItemsHolder.getItem("lives");
                    mod.settings.statsOld = stats;
                    stats.valueDefault = Infinity;
                    FSM.ItemsHolder.setItem("lives", Infinity);
                },
                "onModDisable": function (mod) {
                    var FSM = FullScreenMario.FullScreenMario.prototype.ensureCorrectCaller(this),
                        proto = FSM.ObjectMaker.getFunction("Area").prototype,
                        stats = FSM.settings.items.values.lives;
                    
                    proto.onPlayerDeath = mod.settings.onPlayerDeathOld;
                    
                    stats.valueDefault = mod.settings.statsOld.valueDefault;
                    FSM.ItemsHolder.setItem("lives", mod.settings.livesOld);
                }
            },
            "settings": {
                "onPlayerDeathOld": undefined,
                "statsOld": undefined,
                "livesOld": undefined
            }
        }, {
            "name": "Invincibility",
            "description": "Mario is constantly given star power.",
            "author": {
                "name": "Josh Goldberg",
                "email": "josh@fullscreenmario.com"
            },
            "enabled": false,
            "events": {
                "onModEnable": function () {
                    if (this.player) {
                        this.playerStarUp(this.player, Infinity);
                    }
                },
                "onModDisable": function () {
                    if (this.player) {
                        this.playerStarDown(this.player);
                    }
                },
                "onSetLocation": function () {
                    if (this.player) {
                        this.playerStarUp(this.player, Infinity);
                    }
                },
                "onPlayerRespawn": function () {
                    if (this.player) {
                        this.playerStarUp(this.player, Infinity);
                    }
                }
            }
        }, {
            "name": "Parallax Clouds",
            "description": "Clouds in the sky scroll at about 63% the normal rate.",
            "author": {
                "name": "Josh Goldberg",
                "email": "josh@fullscreenmario.com"
            },
            "enabled": false,
            "events": {
                "onModEnable": function () {
                    this.ObjectMaker.getFunction("Cloud").prototype.parallaxHoriz = .7;
                },
                "onModDisable": function () {
                    this.ObjectMaker.getFunction("Cloud").prototype.parallaxHoriz = undefined;
                }
            }
        }, {
            "name": "Low Gravity",
            "description": "I believe I can fly!",
            "author": {
                "name": "Josh Goldberg",
                "email": "josh@fullscreenmario.com"
            },
            "enabled": false,
            "events": {
                "onModEnable": function () {
                    this.ObjectMaker.getFunction("Player").prototype.gravity 
                            = this.ObjectMaker.getFunction("Area").prototype.gravity / 1.4
                },
                "onModDisable": function () {
                    this.ObjectMaker.getFunction("Player").prototype.gravity 
                            = this.ObjectMaker.getFunction("Area").prototype.gravity;
                }
            }
        }, {
            "name": "Luigi",
            "description": "The little brother who could!",
            "author": {
                "name": "Josh Goldberg",
                "email": "josh@fullscreenmario.com"
            },
            "enabled": false,
            "events": {
                "onModEnable": function () {
                    this.ItemsHolder.setItem("luigi", true);
                    this.ObjectMaker.getFunction("Player").prototype.title = "Luigi";
                    
                    if (this.player) {
                        this.player.title = "Luigi";
                        this.PixelDrawer.setThingSprite(this.player);
                        
                        this.ThingHitter.cacheChecksForType(this.player.title, this.player.groupType);
                    }
                },
                "onModDisable": function () {
                    this.ItemsHolder.setItem("luigi", false);
                    this.ObjectMaker.getFunction("Player").prototype.title = "Player";
                    
                    if (this.player) {
                        this.player.title = "Player";
                        this.PixelDrawer.setThingSprite(this.player);
                    }
                }
            }
        }, { 
            "name": "Tilt Gravity",
            "description": "Tilting your device pushes characters around",
            "author": {
                "name": "Josh Goldberg",
                "email": "josh@fullscreenmario.com"
            },
            "enabled": false,
            "events": {
                "onDeviceMotion": function (mod, event) {
                    var characters = this.GroupHolder.getCharacterGroup(),
                        acceleration = event.accelerationIncludingGravity,
                        diff = -acceleration.x * this.unitsize,
                        y = acceleration.y,
                        character, i;
                    
                    for (i = 0; i < characters.length; i += 1) {
                        character = characters[i];
                        if (!character.player && !character.grounded) {
                            this.shiftHoriz(character, diff);
                        }
                    }
                    
                    if (typeof mod.settings.y !== "undefined") {
                        diff = (y - mod.settings.y) * this.unitsize * 2;
                        if (diff > 0) {
                            for (i = 0; i < characters.length; i += 1) {
                                character = characters[i];
                                if (!character.grounded) {
                                    this.shiftVert(character, -diff);
                                    character.yvel = -diff;
                                    character.resting = undefined;
                                }
                            }
                        }
                    }
                    
                    mod.settings.y = y;
                }
            },
            "settings": {
                "y": undefined
            }
        }, {
            "name": "Palette Swap",
            "description": "Swaps the color palette around randomly for each area.",
            "author": {
                "name": "Josh Goldberg",
                "email": "josh@fullscreenmario.com"
            },
            "enabled": false,
            "events": {
                "onModEnable": function (mod) {
                    mod.settings.paletteDefaultOld = this.settings.sprites.paletteDefault;
                    
                    if (this.AreaSpawner.getMapName()) {
                        mod.events.onPreSetLocation.call(this, mod);
                    }
                },
                "onModDisable": function (mod) {
                    this.settings.sprites.paletteDefault = mod.settings.paletteDefaultOld;
                    
                    mod.resetVisuals(this);
                    mod.resetThingSprites(this);
                },
                "onPreSetLocation": function (mod, location) {
                    this.settings.sprites.paletteDefault = mod.shufflePalette(
                        Array.prototype.slice.call(mod.settings.paletteDefaultOld)
                    );
                    
                    mod.resetVisuals(this);
                    mod.resetThingSprites(this);
                }
            },
            "settings": {
                "paletteOld": undefined
            },
            "resetVisuals": function (FSM) {
                FSM.resetPixelRender(FSM, FSM.customs);
                FSM.resetPixelDrawer(FSM, FSM.customs);
                FSM.PixelDrawer.setCanvas(FSM.canvas);
                FSM.PixelDrawer.setThingArrays([
                    FSM.GroupHolder.getSceneryGroup(),
                    FSM.GroupHolder.getSolidGroup(),
                    FSM.GroupHolder.getCharacterGroup(),
                    FSM.GroupHolder.getTextGroup()
                ]);
                FSM.PixelDrawer.setBackground(
                    FSM.AreaSpawner.getArea().background
                );
            },
            "resetThingSprites": function (FSM) {
                FSM.GroupHolder.callOnAll(undefined, function (thing) {
                    thing.numSprites = undefined;
                    // FSM.PixelDrawer.setThingSprite(thing);
                });
            },
            "shufflePalette": function shufflePalette(array) {
                var i, j, temp;
                
                for (i = 0; i < array.length - 1; i += 1) {
                    j = Math.floor(Math.random() * i);
                    temp = array[i + 1];
                    array[i + 1] = array[j + 1];
                    array[j + 1] = temp;
                }
                
                return array;
            }
        }, {
            "name": "QCount",
            "description": "QQQQQQQ",
            "author": {
                "name": "Josh Goldberg",
                "email": "josh@fullscreenmario.com"
            },
            "enabled": false,
            "events": {
                "onModEnable": function (mod) {
                    var FSM = FullScreenMario.FullScreenMario.prototype.ensureCorrectCaller(this),
                        characters = mod.settings.characters,
                        charactersFSM = FSM.GroupHolder.getCharacterGroup(),
                        level;
                    
                    FSM.InputWriter.addEvent("onkeydown", "q", function () {
                        mod.settings.qcount += 1;
                        
                        if (mod.settings.levels[mod.settings.qcount]) {
                            var level = mod.settings.levels[mod.settings.qcount];
                            mod.settings.events.push(FSM.TimeHandler.addEventInterval(function () {
                                if (charactersFSM.length < 210) {
                                    var num = Math.floor(Math.random() * level.length),
                                        lul = FSM.ObjectMaker.make.apply(FSM.ObjectMaker, level[num]);
                                    
                                    lul.yvel = Math.random() * FSM.unitsize / 4;
                                    lul.xvel = lul.speed = Math.random() * FSM.unitsize * 2;
                                    if (Math.floor(Math.random() * 2)) {
                                        lul.xvel *= -1;
                                    }
                                    
                                    characters.push(lul);
                                    FSM.addThing(
                                        lul, 
                                        (32 * Math.random() + 128) * FSM.unitsize,
                                        88 * Math.random() * FSM.unitsize
                                    );
                                }
                            }, 7, Infinity));
                        }
                    });
                    FSM.InputWriter.addAliasValues("q", [81]);
                },
                "onModDisable": function (mod) {
                    mod.settings.qcount = 0;
                    mod.settings.events.forEach(this.TimeHandler.cancelEvent);
                    mod.settings.events.length = 0;
                    this.InputWriter.removeEvent("onkeydown", 81, undefined);
                    this.InputWriter.removeEvent("onkeydown", "q", undefined);
                },
                "onSetLocation": function (mod) {
                    mod.settings.qcount = 0;
                }
            },
            "settings": {
                "qcount": 0,
                "characters": [],
                "events": [],
                "levels": {
                    "7": [ ["Goomba"] ],
                    "14": [ 
                        ["Koopa"],
                        ["Koopa", { "smart": true }],
                        ["Koopa", { "jumping": true }],
                        ["Koopa", { "smart": true, "jumping": true }],
                        ["Beetle"],
                        ["HammerBro"],
                        ["Lakitu"],
                        ["Blooper"]
                    ],
                    "21": [ ["Bowser"] ]
                }
            }
        }, {
            "name": "Super Fireballs",
            "description": "Fireballs blow up solids, and Mario has unlimited.",
            "author": {
                "name": "Josh Goldberg",
                "email": "josh@fullscreenmario.com"
            },
            "enabled": false,
            "events": {
                "onModEnable": function (mod) {
                    this.ObjectMaker.getFunction("solid").prototype.nofire = 0;
                    this.ObjectMaker.getFunction("solid").prototype.firedeath = 1;
                },
                "onModDisable": function (mod) {
                    this.ObjectMaker.getFunction("solid").prototype.nofire = 2;
                    this.ObjectMaker.getFunction("solid").prototype.firedeath = 0;
                }
            }
        }, {
            "name": "Trip of Acid",
            "description": "Sprites aren't cleared from the screen each game tick.",
            "author": {
                "name": "Josh Goldberg",
                "email": "josh@fullscreenmario.com"
            },
            "enabled": false,
            "events": {
                "onModEnable": function (mod) {
                    this.TimeHandler.addEvent(function () {
                        this.PixelDrawer.setNoRefill(true);
                    }.bind(this), 3);
                },
                "onSetLocation": function (mod) {
                    this.PixelDrawer.setNoRefill(false);
                    this.TimeHandler.addEvent(function () {
                        this.PixelDrawer.setNoRefill(true);
                    }.bind(this), 3);
                },
                "onModDisable": function (mod) {
                    this.PixelDrawer.setNoRefill(false);
                }
            }
        }
    ]
};
