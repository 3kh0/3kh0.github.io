FullScreenMario.FullScreenMario.settings.objects = {
    "onMake": "onMake",
    "indexMap": ["width", "height"],
    "doPropertiesFull": true,
    "inheritance": {
        "Quadrant": {},
        "Map": {},
        "Area": {},
        "Location": {},
        "Thing": {
            "character": {
                "Player": {},
                "enemy": {
                    "Goomba": {},
                    "Koopa": {},
                    "Beetle": {},
                    "Piranha": {},
                    "Blooper": {},
                    "CheepCheep": {},
                    "Podoboo": {},
                    "BulletBill": {},
                    "Lakitu": {},
                    "SpinyEgg": {},
                    "Spiny": {},
                    "HammerBro": {
                        "Bowser": {}
                    },
                    "Hammer": {},
                    "BowserFire": {},
                },
                "item": {
                    "Mushroom": {
                        "Mushroom1Up": {},
                        "MushroomDeathly": {}
                    },
                    "FireFlower": {},
                    "Fireball": {
                        "CastleFireball": {}
                    },
                    "Star": {},
                    "Shell": {
                        "BeetleShell": {}
                    },
                    "Vine": {}
                },
                "BrickShard": {},
                "Bubble": {},
                "Coin": {},
                "Firework": {},
            },
            "solid": {
                "Block": {},
                "BridgeBase": {},
                "Brick": {},
                "DeadGoomba": {},
                "Pipe": {},
                "PipeHorizontal": {},
                "PipeVertical": {},
                "Platform": {},
                "Stone": {
                    "RestingStone": {}
                },
                "Cannon": {},
                "Springboard": {},
                "Floor": {},
                "TreeTop": {},
                "ShroomTop": {},
                "CastleAxe": {},
                "CastleBlock": {},
                "CastleBridge": {},
                "CastleChain": {},
                "Coral": {},
                "WaterBlocker": {},
                "detector": {
                    "DetectCollision": {
                        "ScrollEnabler": {},
                    },
                    "DetectWindow": {
                        "ScrollBlocker": {},
                        "RandomSpawner": {}
                    },
                    "DetectSpawn": {}
                }
            },
            "scenery": {
                "Blank": {},
                "BrickHalf": {},
                "BrickPlain": {},
                "Bush1": {},
                "Bush2": {},
                "Bush3": {},
                "CastleDoor": {},
                "CastleFlag": {},
                "CastleRailing": {},
                "CastleRailingFilled": {},
                "CastleTop": {},
                "CastleWall": {},
                "Cloud": {
                    "Cloud1": {},
                    "Cloud2": {},
                    "Cloud3": {},
                },
                "Fence": {},
                "Flag": {},
                "FlagPole": {},
                "FlagTop": {},
                "HillSmall": {},
                "HillLarge": {},
                "Peach": {},
                "PlatformString": {},
                "PlantSmall": {},
                "PlantLarge": {},
                "Railing": {},
                "ShroomTrunk": {},
                "String": {},
                "StringCornerLeft": {},
                "StringCornerRight": {},
                "Toad": {},
                "TreeTrunk": {},
                "Water": {}
            },
            "Text": {
                "DecorativeBack": {},
                "DecorativeDot": {},
                "TextA": {},
                "TextB": {},
                "TextC": {},
                "TextD": {},
                "TextE": {},
                "TextF": {},
                "TextG": {},
                "TextH": {},
                "TextI": {},
                "TextJ": {},
                "TextK": {},
                "TextL": {},
                "TextM": {},
                "TextN": {},
                "TextO": {},
                "TextP": {},
                "TextQ": {},
                "TextR": {},
                "TextS": {},
                "TextT": {},
                "TextU": {},
                "TextV": {},
                "TextW": {},
                "TextX": {},
                "TextY": {},
                "TextZ": {},
                "Text0": {},
                "Text1": {},
                "Text2": {},
                "Text3": {},
                "Text4": {},
                "Text5": {},
                "Text6": {},
                "Text7": {},
                "Text8": {},
                "Text9": {},
                "TextSpace": {},
                "TextSlash": {},
                "TextCharacters": {
                    "TextPeriod": {},
                    "TextExclamationMark": {},
                    "TextColon": {},
                },
                "TextColored": {
                    "TextColoredD": {},
                    "TextColoredE": {},
                    "TextColoredI": {},
                    "TextColoredN": {},
                    "TextColoredO": {},
                    "TextColoredT": {},
                    "TextColored1": {},
                    "TextColored5": {},
                    "TextColored8": {},
                    "TextColored9": {},
                    "TextColoredSpace": {},
                    "TextColoredCopyright": {}
                },
                "TextLarge": {
                    "TextLargeE": {},
                    "TextLargeP": {},
                    "TextLargeR": {},
                    "TextLargeS": {},
                    "TextLargeU": {}
                },
                "TextHuge": {
                    "TextHugeA": {},
                    "TextHugeB": {},
                    "TextHugeI": {},
                    "TextHugeM": {},
                    "TextHugeO": {},
                    "TextHugeR": {},
                    "TextHugeS": {},
                    "TextHugeSpace": {},
                    "TextHugePeriod": {}
                },
                "ScoreText": {
                    "Text100": {},
                    "Text200": {},
                    "Text400": {},
                    "Text500": {},
                    "Text800": {},
                    "Text1000": {},
                    "Text2000": {},
                    "Text4000": {},
                    "Text5000": {},
                    "Text8000": {},
                    "Text1Up": {},
                },
                "CustomText": {}
            }
        }
    },
    "properties": {
        "Quadrant": {
            "tolx": 0,
            "toly": 0
        },
        "Map": {
            "initialized": false,
            "time": 400
        },
        "Area": {
            "onMake": FullScreenMario.FullScreenMario.prototype.initializeArea,
            "setBackground": FullScreenMario.FullScreenMario.prototype.setAreaBackground,
            "floor": 104,
            "jumpmod": 1.056,
            "maxyvel": FullScreenMario.FullScreenMario.unitsize * 2,
            "maxyvelinv": FullScreenMario.FullScreenMario.unitsize * -3.5,
            "onPlayerDeathTimeout": 280,
            "onGameOverTimeout": 280,
            "gravity": FullScreenMario.FullScreenMario.gravity,
            "canscroll": true,
            "underwater": false,
            "notime": false,
            "nokeys": false,
            "onPlayerDeath": FullScreenMario.FullScreenMario.prototype.setMap,
            "onGameOver": FullScreenMario.FullScreenMario.prototype.gameOver,
            "attributes": {
                "underwater": {
                    "gravity": FullScreenMario.FullScreenMario.gravity / 2.8,
                    "stretches": [{
                        "thing": "WaterBlocker",
                        "y": 104,
                        "height": 16
                    }, {
                        "thing": "Water",
                        "y": 88
                    }]
                },
                "blockBoundaries": {
                    "afters": [{
                        "thing": "ScrollBlocker", "noBoundaryStretch": true
                    }]
                },
                "random": {
                    "onPlayerDeath": FullScreenMario.FullScreenMario.prototype.mapEntranceRespawn,
                    "onPlayerDeathTimeout": 140
                },
                "editor": {
                    "onPlayerDeath": FullScreenMario.FullScreenMario.prototype.mapEntranceRespawn,
                    "onPlayerDeathTimeout": 140
                }
            }
        },
        "Location": {
            "area": 0,
            "entry": "Normal"
        },
        "Thing": {
            // Sizing
            "width": 8,
            "height": 8,
            "tolx": 0,
            "toly": FullScreenMario.FullScreenMario.unitsize / 8,
            // Velocity
            "xvel": 0,
            "yvel": 0,
            "speed": 0,
            // Score amounts on death
            "scoreStomp": 100,
            "scoreFire": 200,
            "scoreStar": 200,
            "scoreBelow": 100,
            // Placement
            "alive": true,
            "placed": false,
            // Quadrants
            "maxquads": 4,
            "outerok": false,
            // Sprites
            "sprite": "",
            "spriteType": "neither",
            "opacity": 1,
            "scale": 1,
            // Triggered functions
            "animate": FullScreenMario.FullScreenMario.prototype.animateEmerge,
            "onMake": FullScreenMario.FullScreenMario.prototype.thingProcess,
            "death": FullScreenMario.FullScreenMario.prototype.killNormal,
            "collide": undefined,
            "movement": undefined
        },
        "character": {
            "groupType": "Character",
            "character": true,
            "lookleft": true,
            "moveleft": true,
            "firedeath": true,
            "movement": FullScreenMario.FullScreenMario.prototype.moveSimple
        },
        "Player": {
            "player": true,
            "canjump": true,
            "nofire": true,
            "nokillend": true,
            "checkOverlaps": true,
            "power": 1,
            "numballs": 0,
            "moveleft": 0,
            "skidding": 0,
            "star": 0,
            "dieing": 0,
            "nofall": 0,
            "maxvel": 0,
            "paddling": 0,
            "jumpers": 0,
            "landing": 0,
            "tolx": FullScreenMario.FullScreenMario.unitsize * 2,
            "toly": 0,
            "walkspeed": FullScreenMario.FullScreenMario.unitsize / 2,
            "maxspeed": FullScreenMario.FullScreenMario.unitsize * 1.35, // Really only used for timed animations
            "maxspeedsave": FullScreenMario.FullScreenMario.unitsize * 1.35,
            "scrollspeed": FullScreenMario.FullScreenMario.unitsize * 1.75,
            "running": '', // Evaluates to false for cycle checker
            "fire": FullScreenMario.FullScreenMario.prototype.animatePlayerFire,
            "movement": FullScreenMario.FullScreenMario.prototype.movePlayer,
            "death": FullScreenMario.FullScreenMario.prototype.killPlayer,
            "onResting": FullScreenMario.FullScreenMario.prototype.animatePlayerLanding,
            "onRestingOff": FullScreenMario.FullScreenMario.prototype.animatePlayerRestingOff,
            "type": "character",
            "name": "player normal small still",
            "getKeys": function () {
                return {
                    "run": 0,
                    "crouch": 0,
                    "jump": 0,
                    "jumplev": 0,
                    "sprint": 0
                };
            }
        },
        "enemy": {
            "type": "enemy",
            "speed": FullScreenMario.FullScreenMario.unitsize * .21,
            "collide": FullScreenMario.FullScreenMario.prototype.collideEnemy,
            "death": FullScreenMario.FullScreenMario.prototype.killFlip
        },
        "Goomba": {
            "scoreFire": 100,
            "scoreStar": 100,
            "spawnType": "DeadGoomba",
            "toly": FullScreenMario.FullScreenMario.unitsize,
            "death": FullScreenMario.FullScreenMario.prototype.killGoomba,
            "spriteCycleSynched": [
                [FullScreenMario.FullScreenMario.prototype.unflipHoriz, FullScreenMario.FullScreenMario.prototype.flipHoriz]
            ]
        },
        "Koopa": {
            "height": 12,
            "shellspawn": true,
            "spawnType": "Shell",
            "shelltype": "Shell",
            "toly": FullScreenMario.FullScreenMario.unitsize * 2,
            "death": FullScreenMario.FullScreenMario.prototype.killKoopa,
            "spriteCycle": [
                ["one", "two"]
            ],
            "attributes": {
                "smart": {
                    "movement": FullScreenMario.FullScreenMario.prototype.moveSmart,
                    "spawnSettings": {
                        "smart": true
                    }
                },
                "jumping": {
                    "movement": FullScreenMario.FullScreenMario.prototype.moveJumping,
                    "jumpheight": FullScreenMario.FullScreenMario.unitsize * 1.17,
                    "gravity": FullScreenMario.FullScreenMario.gravity / 2.8,
                    "scoreStomp": 400
                },
                "floating": {
                    "onThingAdded": FullScreenMario.FullScreenMario.prototype.spawnMoveFloating,
                    "movement": FullScreenMario.FullScreenMario.prototype.moveFloating,
                    "nofall": true,
                    "yvel": FullScreenMario.FullScreenMario.unitsize / 8,
                    "maxvel": FullScreenMario.FullScreenMario.unitsize / 4,
                    "scoreStomp": 400
                }
            }
        },
        "Beetle": {
            "speed": FullScreenMario.FullScreenMario.unitsize * .21,
            "xvel": FullScreenMario.FullScreenMario.unitsize * .21,
            "height": 8,
            "nofire": 2,
            "shellspawn": true,
            "movement": FullScreenMario.FullScreenMario.prototype.moveSmart,
            "death": FullScreenMario.FullScreenMario.prototype.killToShell,
            "spawnType": "BeetleShell",
            "shelltype": "BeetleShell",
            "spriteCycle": [
                ["one", "two"]
            ],
        },
        "Piranha": {
            "height": 12,
            "toly": FullScreenMario.FullScreenMario.unitsize * 8,
            "countermax": 49,
            // nofall": true,
            "deadly": true,
            // nocollidesolid": true,
            "grounded": true,
            "death": FullScreenMario.FullScreenMario.prototype.killNormal,
            "movement": FullScreenMario.FullScreenMario.prototype.movePiranha,
            "onThingAdded": FullScreenMario.FullScreenMario.prototype.spawnPiranha,
            "spriteCycleSynched": [
                ["one", "two"]
            ]
        },
        "Blooper": {
            "height": 12,
            "nofall": true,
            "nocollidesolid": true,
            "speed": FullScreenMario.FullScreenMario.unitsize / 2,
            "onThingAdded": FullScreenMario.FullScreenMario.prototype.spawnBlooper,
            "movement": FullScreenMario.FullScreenMario.prototype.moveBlooper,
            "death": FullScreenMario.FullScreenMario.prototype.killFlip
        },
        "CheepCheep": {
            "nofall": true,
            "nocollidesolid": true,
            "nocollidechar": true,
            "movement": FullScreenMario.FullScreenMario.prototype.moveCheepCheep,
            "xvel": FullScreenMario.FullScreenMario.unitsize / -6,
            "yvel": FullScreenMario.FullScreenMario.unitsize / -32,
            "death": FullScreenMario.FullScreenMario.prototype.killFlip,
            "spriteCycleSynched": [
                ["one", "two"]
            ],
            "attributes": {
                "red": {
                    "xvel": FullScreenMario.FullScreenMario.unitsize / -4,
                    "yvel": FullScreenMario.FullScreenMario.unitsize / -24
                },
                "flying": {
                    "movement": FullScreenMario.FullScreenMario.prototype.moveCheepCheepFlying,
                    "gravity": FullScreenMario.FullScreenMario.gravity / 3.5
                }
            }
        },
        "Podoboo": {
            "width": 7,
            "speed": FullScreenMario.FullScreenMario.unitsize * 1.75,
            "gravity": FullScreenMario.FullScreenMario.unitsize / 24,
            "jumpHeight": 28,
            "frequency": 245,
            "deadly": true,
            "nofall": true,
            "nofire": true,
            "nocollidechar": true,
            "nocollidesolid": true,
            "grounded": true,
            "movement": undefined,
            "onThingAdded": FullScreenMario.FullScreenMario.prototype.spawnPodoboo
        },
        "BulletBill": {
            "height": 7,
            "nofall": true,
            "nofire": true,
            "nocollidechar": true,
            "nocollidesolid": true,
            "grounded": true,
            "movement": undefined,
            "xvel": FullScreenMario.FullScreenMario.unitsize / 2,
        },
        "Lakitu": {
            "height": 12,
            "nofall": true,
            "noshiftx": true,
            "nocollidesolid": true,
            "grounded": true,
            "death": FullScreenMario.FullScreenMario.prototype.killLakitu,
            "onThingAdded": FullScreenMario.FullScreenMario.prototype.spawnLakitu,
            "movement": FullScreenMario.FullScreenMario.prototype.moveLakituInitial
        },
        "SpinyEgg": {
            "width": 7,
            "deadly": true,
            "movement": undefined,
            "onResting": FullScreenMario.FullScreenMario.prototype.animateSpinyEggHatching,
            "spawnType": "Spiny",
            "spriteCycleSynched": [
                ["one", "two"]
            ]
        },
        "Spiny": {
            "deadly": true,
            "moveleft": true,
            "spriteCycle": [
                ["one", "two"]
            ]
        },
        "HammerBro": {
            "height": 12,
            "onThingAdded": FullScreenMario.FullScreenMario.prototype.spawnHammerBro,
            "movement": FullScreenMario.FullScreenMario.prototype.moveHammerBro,
            "spriteCycle": [
                ["one", "two"]
            ]
        },
        "Bowser": {
            "width": 16,
            "height": 16,
            "speed": FullScreenMario.FullScreenMario.unitsize * .14,
            "gravity": FullScreenMario.FullScreenMario.gravity / 2.8,
            "jumpTimes": [117],
            "fireTimes": [280, 350, 490],
            "throwAmount": 7,
            "throwDelay": 84,
            "throwPeriod": 210,
            "throwBetween": 11,
            "deadly": true,
            "noflip": true,
            "nofiredeath": true,
            "nokillend": true,
            "outerok": true,
            "spawnType": "Goomba",
            "movement": FullScreenMario.FullScreenMario.prototype.moveBowser,
            "killonend": FullScreenMario.FullScreenMario.prototype.animateBowserFreeze,
            "death": FullScreenMario.FullScreenMario.prototype.killBowser,
            "onThingAdded": FullScreenMario.FullScreenMario.prototype.spawnBowser,
            "spriteCycle": [
                ["one", "two"]
            ]
        },
        "Hammer": {
            "movement": undefined,
            "nocollidesolid": true,
            "nocollidechar": true,
            "deadly": true,
            "nofire": true,
            "spriteCycle": [
                ["one", "two", "three", "four"],
                3
            ]
        },
        "BowserFire": {
            "width": 12,
            "height": 4,
            "nocollidesolid": true,
            "nocollidechar": true,
            "nofall": true,
            "deadly": true,
            "nofire": true,
            "movement": FullScreenMario.FullScreenMario.prototype.moveBowserFire,
            "xvel": FullScreenMario.FullScreenMario.unitsize * -.63,
            "spriteCycle": [
                [
                    FullScreenMario.FullScreenMario.prototype.flipVert,
                    FullScreenMario.FullScreenMario.prototype.unflipVert
                ]
            ]
        },
        "item": {
            "collide": FullScreenMario.FullScreenMario.prototype.collideFriendly,
            "onCollideUp": FullScreenMario.FullScreenMario.prototype.collideUpItem,
            "jump": FullScreenMario.FullScreenMario.prototype.itemJump,
            "item": true,
            "nofire": true
        },
        "Mushroom": {
            "action": FullScreenMario.FullScreenMario.prototype.playerShroom,
            "speed": FullScreenMario.FullScreenMario.unitsize * .42
        },
        "Mushroom1Up": {
            "action": FullScreenMario.FullScreenMario.prototype.playerShroom1Up
        },
        "MushroomDeathly": {
            "action": FullScreenMario.FullScreenMario.prototype.killPlayer
        },
        "FireFlower": {
            "action": FullScreenMario.FullScreenMario.prototype.playerShroom,
            "spriteCycle": [
                ["one", "two", "three", "four"]
            ]
        },
        "Fireball": {
            "width": 4,
            "height": 4,
            "nofire": true,
            "nostar": true,
            "collidePrimary": true,
            "grounded": true,
            "animate": FullScreenMario.FullScreenMario.prototype.animateFireballEmerge,
            "collide": FullScreenMario.FullScreenMario.prototype.collideFireball,
            "death": FullScreenMario.FullScreenMario.prototype.animateFireballExplode,
            "spriteCycleSynched": [
                ["one", "two", "three", "four"], "spinning", 4
            ]
        },
        "CastleFireball": {
            "deadly": true,
            "nocollidesolid": true,
            "nocollidechar": true,
            "nofall": true,
            "outerok": true,
            "collide": FullScreenMario.FullScreenMario.prototype.collideCastleFireball
        },
        "Firework": {
            "nocollide": true,
            "nofall": true,
            "animate": FullScreenMario.FullScreenMario.prototype.animateFirework
        },
        "Star": {
            "name": "star item", // Item class so player's star isn't confused with this
            "width": 7,
            "grounded": true,
            "speed": FullScreenMario.FullScreenMario.unitsize * .56,
            "action": FullScreenMario.FullScreenMario.prototype.collideStar,
            "movement": FullScreenMario.FullScreenMario.prototype.moveJumping,
            "jumpheight": FullScreenMario.FullScreenMario.unitsize * 1.17,
            "gravity": FullScreenMario.FullScreenMario.gravity / 2.8,
            "spriteCycle": [
                ["one", "two", "three", "four"], 0, 7
            ]
        },
        "Shell": {
            "height": 7,
            "speed": FullScreenMario.FullScreenMario.unitsize * 2,
            "collidePrimary": true,
            "nofire": false,
            "moveleft": 0,
            "xvel": 0,
            "move": 0,
            "shell": true,
            "hitcount": 0,
            "peeking": 0,
            "counting": 0,
            "landing": 0,
            "enemyhitcount": 0,
            "movement": FullScreenMario.FullScreenMario.prototype.moveShell,
            "collide": FullScreenMario.FullScreenMario.prototype.collideShell,
            "death": FullScreenMario.FullScreenMario.prototype.killFlip,
            "spawnType": "Koopa",
            "attributes": {
                "smart": {}
            }
        },
        "BeetleShell": {
            "height": 8,
            "nofire": 2,
            "spawnType": "Beetle"
        },
        "Vine": {
            "width": 7,
            "nofall": true,
            "nocollide": true,
            "nocollidesolid": true,
            "grounded": true,
            "speed": FullScreenMario.FullScreenMario.unitsize / 4,
            "movement": FullScreenMario.FullScreenMario.prototype.moveVine,
            "collide": FullScreenMario.FullScreenMario.prototype.collideVine,
            "animate": FullScreenMario.FullScreenMario.prototype.animateEmergeVine
        },
        "BrickShard": {
            "width": 4,
            "height": 4,
            "nocollide": true,
            "grounded": true,
            "movement": undefined,
            "spriteCycle": [
                [FullScreenMario.FullScreenMario.prototype.unflipHoriz, FullScreenMario.FullScreenMario.prototype.flipHoriz]
            ]
        },
        "Bubble": {
            "width": 2,
            "height": 2,
            "nocollide": true,
            "nofall": true,
            "movement": FullScreenMario.FullScreenMario.prototype.moveBubble,
            "yvel": FullScreenMario.FullScreenMario.unitsize / -4
        },
        "Coin": {
            "width": 5,
            "spritewidth": 5,
            "height": 7,
            "nofall": true,
            "nocollidechar": true,
            "nocollidesolid": true,
            "allowUpSolids": true,
            "animate": FullScreenMario.FullScreenMario.prototype.animateEmergeCoin,
            "onCollideUp": FullScreenMario.FullScreenMario.prototype.collideUpCoin,
            "collide": FullScreenMario.FullScreenMario.prototype.collideCoin,
            "spriteCycleSynched": [
                ["one", "two", "three", "two", "one"]
            ]
        },
        "solid": {
            "type": "solid",
            "groupType": "Solid",
            "spritewidth": 8,
            "spriteheight": 8,
            "repeat": true,
            "solid": true,
            "nocollidesolid": true,
            "firedeath": 0,
            "nofire": 2,
            "collide": FullScreenMario.FullScreenMario.prototype.collideCharacterSolid,
        },
        "Brick": {
            "breakable": true,
            "bottomBump": FullScreenMario.FullScreenMario.prototype.collideBottomBrick
        },
        "Block": {
            "unused": true,
            "contents": "Coin",
            "bottomBump": FullScreenMario.FullScreenMario.prototype.collideBottomBlock,
            "spriteCycleSynched": [
                ["one", "two", "three", "two", "one"]
            ]
        },
        "BridgeBase": {
            "height": 4,
            "spritewidth": 4,
        },
        "DeadGoomba": {
            "height": 4,
            "nocollide": true,
            "onThingAdded": FullScreenMario.FullScreenMario.prototype.spawnDeadGoomba
        },
        "Pipe": {
            "width": 16,
            "spritewidth": 16,
            "actionTop": FullScreenMario.FullScreenMario.prototype.mapExitPipeVertical
        },
        "PipeHorizontal": {
            "height": 16,
            "spriteheight": 16,
            "width": 19.5,
            "spritewidth": 19.5,
            "actionLeft": FullScreenMario.FullScreenMario.prototype.mapExitPipeHorizontal,
            "attributes": {
                "width": 8,
                "spritewidth": 8
            }
        },
        "PipeVertical": {
            "position": "beginning",
            "width": 16,
            "spritewidth": 16
        },
        "Platform": {
            "height": 4,
            "spritewidth": 4,
            "fallThresholdStart": FullScreenMario.FullScreenMario.unitsize * 2.8,
            "fallThresholdEnd": FullScreenMario.FullScreenMario.unitsize * 2,
            "acceleration": FullScreenMario.FullScreenMario.unitsize / 16,
            "repeat": true,
            "killonend": false,
            "maxvel": FullScreenMario.FullScreenMario.unitsize / 4 * 1.5,
            "attributes": {
                "floating": {
                    "onThingAdded": FullScreenMario.FullScreenMario.prototype.spawnMoveFloating,
                    "movement": FullScreenMario.FullScreenMario.prototype.moveFloating,
                    "yvel": FullScreenMario.FullScreenMario.unitsize / 4 * 1.5
                },
                "sliding": {
                    "onThingAdded": FullScreenMario.FullScreenMario.prototype.spawnMoveSliding,
                    "movement": FullScreenMario.FullScreenMario.prototype.moveSliding,
                    "xvel": FullScreenMario.FullScreenMario.unitsize / 4 * 1.5
                },
                "transport": {
                    "movement": undefined,
                    "collide": FullScreenMario.FullScreenMario.prototype.collideTransport
                },
                "falling": {
                    "movement": FullScreenMario.FullScreenMario.prototype.moveFalling
                },
                "inScale": {
                    "movement": FullScreenMario.FullScreenMario.prototype.movePlatformScale
                }
            }
        },
        "RestingStone": {
            "opacity": 0.01, // Why is opacity set to 1 when added?
            "onRestedUpon": FullScreenMario.FullScreenMario.prototype.activateRestingStone
        },
        "Cannon": {
            "frequency": 280,
            "spriteheight": 8,
            "onThingAdded": FullScreenMario.FullScreenMario.prototype.spawnCannon
        },
        "Springboard": {
            "height": 14.5,
            "heightNormal": 14.5,
            "spriteheight": 10,
            "collide": FullScreenMario.FullScreenMario.prototype.collideSpringboard
        },
        "CastleAxe": {
            "collide": FullScreenMario.FullScreenMario.prototype.collideCastleAxe
        },
        "CastleBlock": {
            "onThingAdded": FullScreenMario.FullScreenMario.prototype.spawnCastleBlock,
            "attributes": {
                "fireballs": {
                    "speed": 1
                }
            }
        },
        "CastleBridge": {
            "height": 8,
            "spriteheight": 8,
            "spritewidth": 4,
            "killonend": FullScreenMario.FullScreenMario.prototype.animateCastleBridgeOpen
        },
        "CastleChain": {
            "width": 7.5,
            "spritewidth": 7.5,
            "height": 8,
            "nocollide": true,
            "killonend": FullScreenMario.FullScreenMario.prototype.animateCastleChainOpen
        },
        "Floor": {
            "nofire": true // for the "Super Fireballs" mod
        },
        "WaterBlocker": {
            "hidden": true,
            "collide": FullScreenMario.FullScreenMario.prototype.collideWaterBlocker
        },
        "detector": {
            "hidden": true,
            "collideHidden": true
        },
        "DetectCollision": {
            "collide": FullScreenMario.FullScreenMario.prototype.collideDetector
        },
        "ScrollEnabler": {
            "activate": FullScreenMario.FullScreenMario.prototype.activateScrollEnabler
        },
        "DetectWindow": {
            "movement": FullScreenMario.FullScreenMario.prototype.activateWindowDetector
        },
        "RandomSpawner": {
            "activate": FullScreenMario.FullScreenMario.prototype.spawnRandomSpawner
        },
        "ScrollBlocker": {
            "onThingAdded": FullScreenMario.FullScreenMario.prototype.spawnScrollBlocker,
            "activate": FullScreenMario.FullScreenMario.prototype.activateScrollBlocker
        },
        "DetectSpawn": {
            "movement": FullScreenMario.FullScreenMario.prototype.spawnDetector
        },
        "scenery": {
            "groupType": "Scenery",
            "repeat": true,
            "nocollide": true, // for when placed in Solid group
            "noBoundaryStretch": true
        },
        "BrickHalf": [8, 4],
        "BrickPlain": [8, 8],
        "Bush1": [16, 8],
        "Bush2": [24, 8],
        "Bush3": [32, 8],
        "CastleDoor": [8, 20],
        "CastleFlag": [6.5, 10],
        "CastleRailing": [8, 4],
        "CastleRailingFilled": [8, 4],
        "CastleTop": [12, 12],
        "CastleWall": [8, 48],
        "Cloud1": [16, 12],
        "Cloud2": [24, 12],
        "Cloud3": [32, 12],
        "Flag": [8, 8],
        "FlagPole": [1, 72],
        "FlagTop": [4, 4],
        "Fence": [8, 8],
        "HillSmall": [24, 9.5],
        "HillLarge": [40, 17.5],
        "Peach": [8, 13],
        "PlatformString": [1, 1],
        "PlantSmall": [7, 15],
        "PlantLarge": [8, 23],
        "Railing": [4, 4],
        "ShroomTrunk": [8, 8],
        "String": [1, 1],
        "StringCornerLeft": [5, 5],
        "StringCornerRight": [5, 5],
        "Toad": [8, 13],
        "TreeTrunk": [4, 4],
        "Water": {
            "width": 4,
            "height": 5
        },
        "Text": {
            "width": 3.5,
            "height": 3.5,
            "groupType": "Text",
            "size": ""
        },
        "DecorativeBack": {
            "width": 88,
            "height": 44,
            "spritewidth": .5,
            "spriteheight": .5,
        },
        "DecorativeDot": {
            "width": 1.5,
            "height": 1.5
        },
        "TextSpace": {
            "hidden": true
        },
        "TextColored1": [3, 3.5],
        "TextColoredSpace": {
            "hidden": true
        },
        "TextColoredCopyright": [4, 4],
        "TextLarge": {
            "width": 7.5,
            "height": 14,
            "size": "Large"
        },
        "TextHuge": {
            "width": 7.5,
            "height": 22
        },
        "TextHugeI": {
            "width": 3.5
        },
        "TextHugeM": {
            "width": 11.5
        },
        "TextHugeSpace": {
            "width": 3.5,
            "hidden": true
        },
        "TextHugePeriod": {
            "width": 3.5
        },
        "ScoreText": {
            "groupType": "Text",
        },
        "TextCharacters": [2.5, 4],
        "TextCharagersHuge": [1, 1],
        "Text100": [6, 4],
        "Text200": [6, 4],
        "Text400": [6, 4],
        "Text500": [6, 4],
        "Text800": [6, 4],
        "Text1000": [8, 4],
        "Text2000": [8, 4],
        "Text4000": [8, 4],
        "Text5000": [8, 4],
        "Text8000": [8, 4],
        "Text1Up": [8, 4],
        "CustomText": {
            "hidden": true,
            "spacingHorizontal": .5,
            "spacingVertical": 8,
            "spacingVerticalBlank": 6,
            "onThingAdded": FullScreenMario.FullScreenMario.prototype.spawnCustomText
        }
    }
};
