FullScreenMario.FullScreenMario.settings.generator = {
    "possibilities": {
        
        /* Overworld
        */
        
        "Overworld": {
            "height": 80,
            "width": 2992,
            "contents": {
                "mode": "Certain",
                "direction": "right",
                "children": [{
                    "type": "Known",
                    "title": "ScrollEnabler"
                }, {
                    "type": "Random",
                    "title": "OverworldStart"
                }, {
                    "type": "Random",
                    "title": "OverworldBody"
                }, {
                    "type": "Random",
                    "title": "OverworldEnd"
                }]
            }
        },
        "OverworldStart": {
            "width": 112,
            "height": 80,
            "contents": {
                "mode": "Certain",
                "direction": "top",
                "spacing": -8,
                "children": [{
                    "type": "Known",
                    "title": "Floor",
                    "arguments": {
                        "macro": "Floor",
                        "width": 112
                    }
                }, {
                    "type": "Random",
                    "title": "OverworldScenery"
                }]
            }
        },
        "OverworldBody": {
            "width": 2480,
            "height": 80,
            "contents": {
                "mode": "Multiple",
                "children": [{
                    "type": "Random",
                    "title": "OverworldRandomization"
                }, {
                    "type": "Random",
                    "title": "OverworldClouds"
                }]
            }
        },
        "OverworldRandomization": {
            "width": 2480,
            "height": 80,
            "contents": {
                "mode": "Repeat",
                "direction": "right",
                "children": [{
                    "type": "Random",
                    "title": "OverworldClump"
                }, {
                    "type": "Random",
                    "title": "OverworldSegwaySpotty"
                }, {
                    "type": "Random",
                    "title": "OverworldSegway"
                }, {
                    "type": "Random",
                    "title": "OverworldSegwaySpotty"
                }]
            }
        },
        "OverworldClump": {
            "width": 320,
            "height": 80,
            "contents": {
                "mode": "Random",
                "direction": "right",
                "children": [{
                    "percent": 60,
                    "type": "Random",
                    "title": "OverworldClumpLand"
                }, {
                    "percent": 20,
                    "type": "Random",
                    "title": "OverworldClumpWater"
                }, {
                    "percent": 20,
                    "type": "Random",
                    "title": "OverworldClumpTrees"
                }]
            }
        },
        "OverworldClumpLand": {
            "width": 160,
            "height": 80,
            "contents": {
                "mode": "Multiple",
                "children": [{
                    "type": "Random",
                    "title": "OverworldScenery"
                }, {
                    "type": "Random",
                    "title": "OverworldLandArea"
                }]
            }
        },
        "OverworldLandArea": {
            "width": 160,
            "height": 80,
            "contents": {
                "mode": "Certain",
                "direction": "top",
                "children": [{
                    "type": "Known",
                    "title": "Floor",
                    "arguments": {
                        "macro": "Floor",
                        "width": 160
                    }
                }, {
                    "type": "Random",
                    "title": "LandObstacleGroup"
                }]
            }
        },
        "OverworldClumpWater": {
            "width": 320,
            "height": 80,
            "contents": {
                "mode": "Multiple",
                "children": [{
                    "type": "Random",
                    "title": "Water",
                    "sizing": {
                        "height": 8,
                        "width": 320
                    }
                }, {
                    "type": "Random",
                    "title": "OverworldClumpWaterMain",
                }]
            }
        },
        "OverworldClumpWaterMain": {
            "width": 320,
            "height": 80,
            "contents": {
                "mode": "Certain",
                "direction": "top",
                "spacing": {
                    "min": 0,
                    "max": 16,
                    "units": 8
                },
                "children": [{
                    "type": "Random",
                    "title": "Nothing"
                }, {
                    "type": "Random",
                    "title": "OverworldClumpWaterContents"
                }]
            }
        },
        "OverworldClumpWaterContents": {
            "width": 320,
            "height": 8,
            "contents": {
                "mode": "Certain",
                "direction": "right",
                "children": [{
                    "type": "Random",
                    "title": "CheepsStart"
                }, {
                    "type": "Random",
                    "title": "OverworldClumpWaterBridge"
                }, {
                    "type": "Random",
                    "title": "CheepsStop"
                }]
            }
        },
        "OverworldClumpWaterBridge": {
            "width": 320,
            "height": 8,
            "contents": {
                "mode": "Certain",
                "direction": "top",
                "spacing": 24,
                "children": [{
                    "type": "Known",
                    "title": "Bridge",
                    "sizing": {
                        "width": 320
                    },
                    "arguments": {
                        "macro": "Bridge",
                        "width": 320,
                        "begin": true,
                        "end": true
                    }
                }, {
                    "type": "Random",
                    "title": "OverworldClumpWaterBridgeBlock"
                }]
            }
        },
        "OverworldClumpWaterBridgeBlock": {
            "width": 320,
            "height": 8,
            "contents": {
                "mode": "Certain",
                "direction": "right",
                "spacing": {
                    "min": 80,
                    "max": 240,
                    "units": 8
                },
                "children": [{
                    "type": "Random",
                    "title": "Nothing"
                }, {
                    "type": "Known",
                    "title": "Block",
                    "arguments": [{
                        "percent": 70,
                        "values": {
                            "contents": "Mushroom"
                        }
                    }, {
                        "percent": 30,
                        "values": {
                            "contents": "Star"
                        }
                    }]
                }]
            }
        },
        "OverworldClumpTrees": {
            "width": 320,
            "height": 80,
            "contents": {
                "mode": "Random",
                "direction": "right",
                "spacing": {
                    "min": 0,
                    "max": 24,
                    "units": 8
                },
                "children": [{
                    "percent": 40,
                    "type": "Random",
                    "title": "OverworldTreeLarge"
                }, {
                    "percent": 40,
                    "type": "Random",
                    "title": "OverworldTreesSmall"
                }, {
                    "percent": 20,
                    "type": "Random",
                    "title": "PlatformGenerator"
                }]
            }
        },
        "OverworldTreesSmall": {
            "width": 64,
            "height": 80,
            "contents": {
                "mode": "Certain",
                "direction": "right",
                "spacing": {
                    "min": 0,
                    "max": 8,
                    "units": 8
                },
                "children": [{
                    "type": "Random",
                    "title": "OverworldTreeSmallShort"
                }, {
                    "type": "Random",
                    "title": "OverworldTreeSmall"
                }]
            }
        },
        "OverworldTreeSmall": {
            "width": 24,
            "height": 80,
            "contents": {
                "mode": "Repeat",
                "limit": 1,
                "direction": "top",
                "spacing": {
                    "min": 32,
                    "max": 88,
                    "units": 8
                },
                "children": [{
                    "type": "Random",
                    "title": "Nothing"
                }, {
                    "type": "Random",
                    "title": "TreeFancy"
                }]
            }
        },
        "OverworldTreeSmallShort": {
            "width": 24,
            "height": 80,
            "contents": {
                "mode": "Certain",
                "direction": "top",
                "snap": "bottom",
                "spacing": {
                    "min": 0,
                    "max": 16,
                    "units": 8
                },
                "children": [{
                    "type": "Random",
                    "title": "Nothing"
                }, {
                    "type": "Known",
                    "title": "Tree",
                    "arguments": {
                        "macro": "Tree",
                        "width": 24
                    }
                }]
            }
        },
        "OverworldTreeLarge": {
            "width": 64,
            "height": 80,
            "contents": {
                "mode": "Multiple",
                "direction": "right",
                "spacing": {
                    "min": 0,
                    "max": 40,
                    "units": 8
                },
                "children": [{
                    "type": "Random",
                    "title": "OverworldTreeLargeBase"
                }, {
                    "type": "Random",
                    "title": "OverworldTreeSmall"
                }]
            }
        },
        "OverworldTreeLargeBase": {
            "width": 64,
            "height": 80,
            "contents": {
                "mode": "Certain",
                "direction": "top",
                "snap": "bottom",
                "spacing": [0, 8, 8],
                "children": [{
                    "type": "Random",
                    "title": "Nothing"
                }, {
                    "type": "Known",
                    "title": "Tree",
                    "arguments": {
                        "macro": "Tree",
                        "width": 64
                    }
                }, {
                    "type": "Random",
                    "title": "TreeLargeCoins"
                }]
            }
        },
        
        
        /* Areas Segway floors
        */
        
        "OverworldSegway": {
            "width": 112,
            "height": 80,
            "contents": {
                "mode": "Random",
                "direction": "right",
                "children": [{
                    "percent": 30,
                    "type": "Random",
                    "title": "OverworldSegwaySpotty"
                }, {
                    "percent": 20,
                    "type": "Random",
                    "title": "OverworldSegwayEnemySpots"
                }, {
                    "percent": 15,
                    "type": "Random",
                    "title": "OverworldSegwayRamps"
                }, {
                    "percent": 15,
                    "type": "Random",
                    "title": "OverworldSegwayWatery"
                }, {
                    "percent": 10,
                    "type": "Random",
                    "title": "OverworldSegwaySpring"
                }, {
                    "percent": 10,
                    "type": "Random",
                    "title": "OverworldSegwayPipeTransit"
                }]
            }
        },
        "OverworldSegwaySpotty": {
            "width": 112,
            "height": 80,
            "contents": {
                "mode": "Random",
                "direction": "right",
                "children": [{
                    "percent": 60,
                    "type": "Random",
                    "title": "OverworldSegwaySpot",
                }, {
                    "percent": 40,
                    "type": "Random",
                    "title": "Nothing",
                }]
            }
        },
        "OverworldSegwaySpot": {
            "width": 8,
            "height": 80,
            "contents": {
                "mode": "Certain",
                "direction": "top",
                "children": [{
                    "type": "Known",
                    "title": "Floor",
                    "arguments": {
                        "macro": "Floor",
                    }
                }, {
                    "type": "Random",
                    "title": "OverworldSegwaySpotContent"
                }]
            }
        },
        "OverworldSegwaySpotContent": {
            "width": 8,
            "height": 24,
            "contents": {
                "mode": "Random",
                "direction": "top",
                "spacing": 24,
                "children": [{
                    "percent": 90,
                    "type": "Random",
                    "title": "OverworldSegwaySpotScenery"
                }, {
                    "percent": 10,
                    "type": "Random",
                    "title": "KoopaJumping"
                }]
            }
        },
        "OverworldSegwayEnemySpots": {
            "width": 112,
            "height": 24,
            "contents": {
                "mode": "Repeat",
                "direction": "right",
                "spacing": [{
                    "percent": 60,
                    "value": 0
                }, {
                    "percent": 25,
                    "value": 8
                }, {
                    "percent": 15,
                    "value": 16
                }],
                "children": [{
                    "type": "Random",
                    "title": "OverworldSegwayEnemySpot"
                }]
            }
        },
        "OverworldSegwayEnemySpot": {
            "width": 32,
            "height": 80,
            "contents": {
                "mode": "Certain",
                "direction": "top",
                "children": [{
                    "type": "Known",
                    "title": "Floor",
                    "arguments": {
                        "macro": "Floor",
                        "width": 32
                    }
                }, {
                    "type": "Random",
                    "title": "OverworldSegwayEnemySpotContent"
                }]
            }
        },
        "OverworldSegwayEnemySpotContent": {
            "width": 32,
            "height": 80,
            "contents": {
                "mode": "Random",
                "direction": "right",
                "children": [{
                    "percent": 45,
                    "type": "Random",
                    "title": "EnemyEasy"
                }, {
                    "percent": 15,
                    "type": "Random",
                    "title": "Nothing"
                }, {
                    "percent": 40,
                    "type": "Random",
                    "title": "LandObstacleGroupVertical"
                }]
            }
        },
        "OverworldSegwayRamps": {
            "width": 112,
            "height": 80,
            "contents": {
                "mode": "Certain",
                "direction": "right",
                "children": [{
                    "type": "Random",
                    "title": "RampUpSmallFloor"
                }, {
                    "type": "Random",
                    "title": "Nothing",
                    "sizing": {
                        "width": 48
                    }
                }, {
                    "type": "Random",
                    "title": "RampDownSmallFloor"
                }]
            }
        },
        "OverworldSegwayFloating": {
            "width": 112,
            "height": 80,
            "contents": {
                "mode": "Random",
                "direction": "right",
                "children": [{
                    "percent": 50,
                    "type": "Random",
                    "title": "Nothing"
                }, {
                    "percent": 50,
                    "type": "Random",
                    "title": "OverworldSegwayFloat"
                }]
            }
        },
        "OverworldSegwayFloat": {
            "width": 8,
            "height": 80,
            "contents": {
                "mode": "Certain",
                "direction": "top",
                "children": [{
                    "type": "Random",
                    "title": "Stone"
                }]
            }
        },
        "OverworldSegwayWatery": {
            "width": 112,
            "height": 80,
            "contents": {
                "mode": "Certain",
                "direction": "right",
                "children": [{
                    "type": "Random",
                    "title": "RampUpSmallFloor"
                }, {
                    "type": "Random",
                    "title": "OverworldSegwayWateryBridge", 
                }, {
                    "type": "Random",
                    "title": "RampDownSmallFloor"
                }]
            }
        },
        "OverworldSegwayWateryBridge": {
            "width": 48,
            "height": 80,
            "contents": {
                "mode": "Certain",
                "direction": "top",
                "children": [{
                    "type": "Random",
                    "title": "Water",
                    "sizing": {
                        "height": 8
                    }
                }, {
                    "type": "Random",
                    "title": "Nothing",
                    "sizing": {
                        "height": 24
                    },
                }, {
                    "type": "Random",
                    "title": "Bridge"
                }, {
                    "type": "Random",
                    "title": "OverworldSegwayWateryBridgeTop"
                }]
            }
        },
        "OverworldSegwayWateryBridgeTop": {
            "width": 48,
            "height": 40,
            "contents": {
                "mode": "Certain",
                "direction": "top",
                "children": [{
                    "type": "Random",
                    "title": "OverworldSegwayWateryBridgeTopEnemies"
                }, {
                    "type": "Random",
                    "title": "OverworldSegwayWateryBridgeTopSolid"
                }]
            }
        },
        "OverworldSegwayWateryBridgeTopEnemies": {
            "width": 48,
            "height": 16,
            "contents": {
                "mode": "Certain",
                "direction": "right",
                "snap": "bottom",
                "spacing": {
                    "min": 4,
                    "max": 20,
                    "units": 4
                },
                "children": [{
                    "type": "Random",
                    "title": "Nothing",
                    "sizing": 16
                }, {
                    "type": "Random",
                    "title": "EnemyEasy"
                }, {
                    "type": "Random",
                    "title": "EnemyEasy"
                }, {
                    "type": "Random",
                    "title": "EnemyEasy"
                }]
            }
        },
        "OverworldSegwayWateryBridgeTopSolid": {
            "width": 48,
            "height": 24,
            "contents": {
                "mode": "Certain",
                "direction": "right",
                "snap": "bottom",
                "spacing": {
                    "min": 0,
                    "max": 24,
                    "units": 8
                },
                "children": [{
                    "type": "Random",
                    "title": "Nothing"
                }, {
                    "type": "Random",
                    "title": "BlockReward"
                }]
            }
        },
        "OverworldSegwaySpring": {
            "width": 112,
            "height": 80,
            "contents": {
                "mode": "Certain",
                "direction": "right",
                "children": [{
                    "type": "Random",
                    "title": "OverworldSegwaySpringLand"
                }, {
                    "type": "Random",
                    "title": "OverworldSegwaySpringGap"
                }]
            }
        },
        "OverworldSegwaySpringLand": {
            "width": 8,
            "height": 80,
            "contents": {
                "mode": "Certain",
                "direction": "top",
                "children": [{
                    "type": "Known",
                    "title": "Floor",
                    "arguments": {
                        "macro": "Floor"
                    }
                }, {
                    "type": "Known",
                    "title": "Springboard"
                }]
            }
        },
        "OverworldSegwaySpringGap": {
            "width": 104,
            "height": 80,
            "contents": {
                "mode": "Certain",
                "direction": "right",
                "spacing": {
                    "min": 48,
                    "max": 80,
                    "units": 8
                },
                "children": [{
                    "type": "Random",
                    "title": "Nothing"
                }, {
                    "type": "Random",
                    "title": "OverworldSegwaySpringReward"
                }]
            }
        },
        "OverworldSegwaySpringReward": {
            "width": 8,
            "height": 80,
            "contents": {
                "mode": "Certain",
                "direction": "top",
                "spacing": {
                    "min": 16,
                    "max": 40,
                    "units": 8
                },
                "children": [{
                    "type": "Random",
                    "title": "Nothing"
                }, {
                    "type": "Random",
                    "title": "Brick"
                }, {
                    "type": "Random",
                    "title": "BlockTreasureFloating"
                }]
            }
        },
        "OverworldSegwayPipeTransit": {
            "width": 112,
            "height": 80,
            "contents": {
                "mode": "Certain",
                "direction": "top",
                "children": [{
                    "type": "Known",
                    "title": "Floor",
                    "arguments": {
                        "macro": "Floor",
                        "width": 112
                    }
                }, {
                    "type": "Random",
                    "title": "OverworldSegwayPipeTransitLand"
                }]
            }
        },
        "OverworldSegwayPipeTransitLand": {
            "width": 104,
            "height": 80,
            "contents": {
                "mode": "Certain",
                "direction": "right",
                "snap": "bottom",
                "spacing": {
                    "min": 32,
                    "max": 80,
                    "units": 8
                },
                "children": [{
                    "type": "Random",
                    "title": "Nothing"
                }, {
                    "type": "Random",
                    "title": "PipeRandomTransit"
                }]
            }
        },
        
        
        /* General obstacles
        */
        
        "LandObstacleGroup": {
            "width": 160,
            "height": 80,
            "contents": {
                "mode": "Random",
                "direction": "right",
                "spacing": {
                    "min": 0,
                    "max": 8,
                    "units": 16
                },
                "children": [{
                    "percent": 30,
                    "type": "Random",
                    "title": "LandObstacleGroupDoubleStory"
                }, {
                    "percent": 30,
                    "type": "Random",
                    "title": "LandObstacleGroupSingleStory"
                }, {
                    "percent": 25,
                    "type": "Random",
                    "title": "LandObstacleGroupVertical"
                }, {
                    "percent": 20,
                    "type": "Random",
                    "title": "LandObstacleGroupPipes"
                }, {
                    "percent": 3,
                    "type": "Random",
                    "title": "LandObstacleGroupPitSmall"
                }, {
                    "percent": 2,
                    "type": "Random",
                    "title": "LandObstacleGroupPitLarge"
                }]
            }
        },
        "LandObstacleGroupEnemies": {
            "width": 64,
            "height": 80,
            "contents": {
                "mode": "Random",
                "direction": "right",
                "spacing": 4,
                "children": [{
                    "percent": 65,
                    "type": "Random",
                    "title": "EnemyEasyScattered"
                }, {
                    "percent": 2,
                    "type": "Random",
                    "title": "EnemyHard"
                }, {
                    "percent": 13,
                    "type": "Random",
                    "title": "LandObstacleGroupVertical"
                }]
            }
        },
        "LandObstacleGroupEnemiesPure": {
            "width": 64,
            "height": 80,
            "contents": {
                "mode": "Random",
                "direction": "right",
                "spacing": {
                    "min": 4,
                    "max": 8,
                    "units": 4
                },
                "children": [{
                    "percent": 90,
                    "type": "Random",
                    "title": "EnemyEasyScattered"
                }, {
                    "percent": 5,
                    "type": "Random",
                    "title": "EnemyHard"
                }]
            }
        },
        "LandObstacleGroupSingleStory": {
            "width": 64,
            "height": 80,
            "contents": {
                "mode": "Multiple",
                "snap": "bottom",
                "children": [{
                    "type": "Random",
                    "title": "LandObstacleGroupSolidsSpotty"
                }, {
                    "type": "Random",
                    "title": "EnemyEasy"
                }]
            }
        },
        "LandObstacleGroupSingleStorySolids": {
            "width": 64,
            "height": 40,
            "contents": {
                "mode": "Certain",
                "direction": "top",
                "children": [{
                    "type": "Random",
                    "title": "Nothing",
                    "sizing": {
                        "height": 32
                    }
                }, {
                    "type": "Random",
                    "title": "LandObstacleGroupSolidsSpotty"
                }]
            }
        },
        "LandObstacleGroupDoubleStory": {
            "width": 64,
            "height": 80,
            "contents": {
                "mode": "Multiple",
                "snap": "bottom",
                "children": [{
                    "type": "Random",
                    "title": "LandObstacleGroupDoubleStorySolids"
                }, {
                    "type": "Random",
                    "title": "LandObstacleGroupEnemiesPure"
                }]
            }
        },
        "LandObstacleGroupDoubleStorySolids": {
            "width": 64,
            "height": 80,
            "contents": {
                "mode": "Certain",
                "snap": "bottom",
                "direction": "top",
                "children": [{
                    "type": "Random",
                    "title": "LandObstacleGroupSolidsPopulated"
                }, {
                    "type": "Random",
                    "title": "LandObstacleGroupSolidsSpotty"
                }]
            }
        },
        "LandObstacleGroupSolidsPopulated": {
            "width": 64,
            "height": 32,
            "contents": {
                "mode": "Certain",
                "direction": "top",
                "children": [{
                    "type": "Random",
                    "title": "Nothing",
                    "sizing": {
                        "height": 24
                    }
                }, {
                    "type": "Random",
                    "title": "LandObstacleGroupSolid"
                }, {
                    "type": "Random",
                    "title": "EnemyEasyElevated"
                }]
            }
        },
        "LandObstacleGroupSolids": {
            "width": 64,
            "height": 32,
            "contents": {
                "mode": "Random",
                "snap": "bottom",
                "direction": "right",
                "children": [{
                    "percent": 75,
                    "type": "Random",
                    "title": "Brick"
                }, {
                    "percent": 25,
                    "type": "Random",
                    "title": "Block"
                }]
            }
        },
        "LandObstacleGroupSolidsSpotty": {
            "width": 64,
            "height": 32,
            "contents": {
                "mode": "Random",
                "snap": "bottom",
                "direction": "right",
                "children": [{
                    "percent": 30,
                    "type": "Random",
                    "title": "Brick"
                }, {
                    "percent": 20,
                    "type": "Random",
                    "title": "Block"
                }, {
                    "percent": 50,
                    "type": "Random",
                    "title": "Nothing"
                }]
            }
        },
        "LandObstacleGroupPipes": {
            "width": 112,
            "height": 80,
            "contents": {
                "mode": "Random",
                "snap": "bottom",
                "direction": "right",
                "children": [{
                    "percent": 80,
                    "type": "Random",
                    "title": "PipeRandom"
                }, {
                    "percent": 10,
                    "type": "Random",
                    "title": "PipeRandomTransit"
                }, {
                    "percent": 10,
                    "type": "Random",
                    "title": "PipeFloating"
                }]
            }
        },
        "LandObstacleGroupVertical": {
            "width": 32,
            "height": 80,
            "contents": {
                "mode": "Random",
                "snap": "bottom",
                "direction": "right",
                "spacing": {
                    "min": 0,
                    "max": 16,
                    "units": 8
                },
                "children": [{
                    "percent": 40,
                    "type": "Random",
                    "title": "PipeRandom"
                }, {
                    "percent": 35,
                    "type": "Random",
                    "title": "StoneTower"
                }, {
                    "percent": 25,
                    "type": "Random",
                    "title": "CannonTower"
                }]
            }
        },
        "LandObstacleGroupPitSmall": {
            "width": 40,
            "height": 80,
            "contents": {
                "mode": "Certain",
                "snap": "bottom",
                "direction": "right",
                "children": [{
                    "type": "Random",
                    "title": "StoneTower"
                }, {
                    "type": "Random",
                    "title": "Nothing"
                }, {
                    "type": "Random",
                    "title": "PitTreasure"
                }, {
                    "type": "Random",
                    "title": "Nothing"
                }, {
                    "type": "Random",
                    "title": "StoneTower"
                }]
            }
        },
        "LandObstacleGroupPitLarge": {
            "width": 56,
            "height": 80,
            "contents": {
                "mode": "Certain",
                "snap": "bottom",
                "direction": "right",
                "children": [{
                    "type": "Random",
                    "title": "StoneTower"
                }, {
                    "type": "Random",
                    "title": "Nothing",
                    "sizing": {
                        "width": 16
                    }
                }, {
                    "type": "Random",
                    "title": "PitTreasure"
                }, {
                    "type": "Random",
                    "title": "EnemyEasy"
                }, {
                    "type": "Random",
                    "title": "Nothing"
                }, {
                    "type": "Random",
                    "title": "StoneTower"
                }]
            }
        },
        "PitTreasure": {
            "width": 8,
            "height": 80,
            "contents": {
                "mode": "Certain",
                "direction": "top",
                "spacing": {
                    "min": 0,
                    "max": 40,
                    "units": 8
                },
                "children": [{
                    "type": "Random",
                    "title": "Nothing",
                    "sizing": {
                        "height": 32
                    }
                }, {
                    "type": "Random",
                    "title": "BlockTreasure",
                }]
            }
        },
        
        
        /* Underworld
        */
        
        "Underworld": {
            "width": 1520,
            "height": 88,
            "contents": {
                "mode": "Certain",
                "direction": "right",
                "snap": "left",
                "children": [{
                    "type": "Random",
                    "title": "UnderworldStart"
                }, {
                    "type": "Random",
                    "title": "UnderworldRandomization"
                }, {
                    "type": "Random",
                    "title": "UnderworldPreEnd"
                }, {
                    "type": "Random",
                    "title": "Nothing"
                }, {
                    "type": "Random",
                    "title": "UnderworldEnd"
                }]
            }
        },
        "UnderworldStart": {
            "width": 128,
            "height": 80,
            "contents": {
                "mode": "Certain",
                "direction": "top",
                "snap": "left",
                "children": [{
                    "type": "Known",
                    "title": "Floor",
                    "arguments": [{
                        "percent": 25,
                        "values": {
                            "macro": "Floor", 
                            "width": 80
                        }
                    }, {
                        "percent": 25,
                        "values": {
                            "macro": "Floor",
                            "width": 96
                        }
                    }, {
                        "percent": 25,
                        "values": {
                            "macro": "Floor",
                            "width": 104
                        }
                    }, {
                        "percent": 25,
                        "values": {
                            "macro": "Floor",
                            "width": 128
                        }
                    }]
                }, {
                    "type": "Known",
                    "title": "Brick",
                    "arguments": {
                        "macro": "Fill",
                        "ynum": 11
                    }
                }]
            }
        },
        "UnderworldRandomization": {
            "width": 1512,
            "height": 80,
            "contents": {
                "mode": "Random",
                "direction": "right",
                "children": [{
                    "percent": 40,
                    "type": "Random",
                    "title": "UnderworldLandArea"
                }, {
                    "percent": 40,
                    "type": "Random",
                    "title": "UnderworldSegway"
                }, {
                    "percent": 20,
                    "type": "Random",
                    "title": "Nothing"
                }]
            }
        },
        "UnderworldLandArea": {
            "width": 160,
            "height": 80,
            "contents": {
                "mode": "Certain",
                "direction": "top",
                "children": [{
                    "type": "Known",
                    "title": "Floor",
                    "arguments": {
                        "macro": "Floor",
                        "width": 160
                    }
                }, {
                    "type": "Random",
                    "title": "UnderworldObstacleGroup"
                }, {
                    "type": "Random",
                    "title": "Brick", 
                    "sizing": {
                        "width": 160
                    }
                }]
            }
        },
        "UnderworldObstacleGroup": {
            "width": 160,
            "height": 80,
            "contents": {
                "mode": "Random",
                "direction": "right",
                "spacing": [{
                    "percent": 50,
                    "value": 0
                }, {
                    "percent": 30,
                    "value": 8
                }, {
                    "percent": 20,
                    "value": 16
                }],
                "children": [{
                    "percent": 30,
                    "type": "Random",
                    "title": "EnemyEasyScattered"
                }, {
                    "percent": 25,
                    "type": "Random",
                    "title": "UnderworldBricksOverhangs"
                }, {
                    "percent": 20,
                    "type": "Random",
                    "title": "LandObstacleGroupSingleStory"
                }, {
                    "percent": 25,
                    "type": "Random",
                    "title": "LandObstacleGroupVertical"
                }]
            }
        },
        "UnderworldBricksOverhangs": {
            "width": 160,
            "height": 64,
            "contents": {
                "mode": "Repeat",
                "direction": "right",
                "snap": "bottom",
                "spacing": {
                    "min": 0,
                    "max": 24,
                    "units": 8
                },
                "children": [{
                    "percent": 100,
                    "type": "Random",
                    "title": "UnderworldBricksOverhang"
                }]
            }
        },
        "UnderworldBricksOverhang": {
            "width": 32,
            "height": 64,
            "contents": {
                "mode": "Random",
                "direction": "top",
                "snap": "left",
                "spacing": [{
                    "percent": 40,
                    "value": 0
                }, {
                    "percent": 40,
                    "value": 16
                }, {
                    "percent": 20,
                    "value": 8
                }],
                "children": [{
                    "percent": 40,
                    "type": "Random",
                    "title": "UnderworldBrickCluster"
                }, {
                    "percent": 30,
                    "type": "Known",
                    "title": "Coin",
                    "arguments": {
                        "macro": "Fill",
                        "xnum": 4,
                        "xwidth": 8
                    },
                    "sizing": {
                        "width": 32,
                        "height": 16
                    }
                }, {
                    "percent": 30,
                    "type": "Random",
                    "title": "EnemyEasyScattered",
                }]
            }
        },
        "UnderworldBrickCluster": {
            "width": 32,
            "height": 16,
            "contents": {
                "mode": "Repeat",
                "direction": "top",
                "children": [{
                    "type": "Random",
                    "title": "UnderworldBrickRow"
                }]
            }
        },
        "UnderworldBrickRow": {
            "width": 32,
            "height": 8,
            "contents": {
                "mode": "Random",
                "direction": "right",
                "children": [{
                    "percent": 97,
                    "type": "Known",
                    "title": "Brick"
                }, {
                    "percent": 3,
                    "type": "Known",
                    "title": "Brick",
                    "arguments": {
                        "contents": "Coin"
                    }
                }]
            }
        },
        "UnderworldSegway": {
            "width": 112,
            "height": 80,
            "contents": {
                "mode": "Random",
                "direction": "right",
                "children": [{
                    "percent": 30,
                    "type": "Random",
                    "title": "UnderworldSegwaySpotty"
                }, {
                    "percent": 25,
                    "type": "Random",
                    "title": "OverworldSegwayWatery"
                }, {
                    "percent": 25,
                    "type": "Random",
                    "title": "UnderworldSegwayPlatforms"
                }, {
                    "percent": 20,
                    "type": "Random",
                    "title": "OverworldSegwayRamps"
                }]
            }
        },
        "UnderworldSegwaySpotty": {
            "width": 112,
            "height": 80,
            "contents": {
                "mode": "Multiple",
                "direction": "right",
                "snap": "bottom",
                "children": [{
                    "type": "Random",
                    "title": "UnderworldSegwaySpots"
                }, {
                    "type": "Random",
                    "title": "UnderworldBrickCeiling",
                    "sizing": {
                        "width": 112
                    }
                }]
            }
        },
        "UnderworldSegwaySpots": {
            "width": 112,
            "height": 80,
            "contents": {
                "mode": "Random",
                "direction": "right",
                "snap": "bottom",
                "children": [{
                    "percent": 50,
                    "type": "Random",
                    "title": "UnderworldSegwaySpot",
                }, {
                    "percent": 50,
                    "type": "Random",
                    "title": "Nothing",
                }]
            }
        },
        "UnderworldSegwaySpot": {
            "width": 8,
            "height": 80,
            "contents": {
                "mode": "Certain",
                "direction": "top",
                "children": [{
                    "type": "Known",
                    "title": "Floor",
                    "arguments": [{
                        "percent": 40,
                        "values": {
                            "macro": "Floor"
                        }
                    }, {
                        "percent": 30,
                        "values": {
                            "macro": "Floor",
                            "y": 8
                        }
                    }, {
                        "percent": 30,
                        "values": {
                            "macro": "Floor",
                            "y": 16
                        }
                    }]
                }]
            }
        },
        "UnderworldSegwayPlatforms": {
            "width": 112,
            "height": 80,
            "contents": {
                "mode": "Certain",
                "direction": "right",
                "spacing": {
                    "min": 0,
                    "max": 8,
                    "units": 8
                },
                "children": [{
                    "type": "Random",
                    "title": "Nothing",
                    "sizing": {
                        "width": 16
                    }
                }, {
                    "type": "Random",
                    "title": "PlatformGenerator"
                }, {
                    "type": "Random",
                    "title": "Nothing"
                }, {
                    "type": "Random",
                    "title": "PlatformGenerator"
                }, {
                    "type": "Random",
                    "title": "Nothing"
                }]
            }
        },
        "UnderworldBrickCeiling": {
            "width": 8,
            "height": 80,
            "contents": {
                "mode": "Certain",
                "direction": "top",
                "snap": "left",
                "children": [{
                    "type": "Random",
                    "title": "Nothing",
                    "sizing": {
                        "height": 88
                    }
                }, {
                    "type": "Random",
                    "title": "Brick"
                }]
            }
        },
        "UnderworldPreEnd": {
            "width": 112,
            "height": 80,
            "contents": {
                "mode": "Random",
                "direction": "right",
                "snap": "left",
                "spacing": 32,
                "children": [{
                    "percent": 50,
                    "type": "Random",
                    "title": "OverworldSegwaySpring"
                }, {
                    "percent": 50,
                    "type": "Random",
                    "title": "PlatformGenerator"
                }]
            }
        },
        
        // OverworldSegwaySpring is 112
        // platgen is 24
        "UnderworldEnd": {
            "width": 480,
            "height": 80,
            "contents": {
                "mode": "Certain",
                "direction": "top",
                "snap": "left",
                "children": [{
                    "type": "Random",
                    "title": "UnderworldEndFloor"
                }, {
                    "type": "Random",
                    "title": "UnderworldEndLand"
                }]
            }
        },
        "UnderworldEndFloor": {
            "width": 480,
            "height": 8,
            "contents": {
                "mode": "Certain",
                "children": [{
                    "type": "Random",
                    "title": "Floor"
                }]
            }
        },
        "UnderworldEndLand": {
            "width": 488,
            "height": 72,
            "contents": {
                "mode": "Certain",
                "direction": "right",
                "snap": "bottom",
                "children": [{
                    "type": "Random",
                    "title": "LakituStop",
                    "sizing": {
                        "width": 0
                    }
                }, {
                    "type": "Random",
                    "title": "UnderworldEndPipeArea"
                }, {
                    "type": "Random",
                    "title": "Nothing",
                    "sizing": {
                        "width": 64
                    }
                }, {
                    "type": "Random",
                    "title": "RampUpLarge"
                }, {
                    "type": "Random",
                    "title": "Nothing",
                    "sizing": {
                        "width": 64
                    }
                }, {
                    "type": "Random",
                    "title": "UnderworldEndOutsideCastle"
                }, {
                    "type": "Known",
                    "title": "ScrollBlocker",
                    "sizing": {
                        "width": 0,
                        "height": 0
                    }
                }]
            }
        },
        "UnderworldEndPipeArea": {
            "width": 144,
            "height": 88,
            "contents": {
                "mode": "Certain",
                "direction": "right",
                "snap": "bottom",
                "children": [{
                    "type": "Random",
                    "title": "UnderworldEndPipeFront"
                }, {
                    "type": "Random",
                    "title": "UnderworldEndPipeTransport"
                }, {
                    "type": "Known",
                    "title": "Brick",
                    "arguments": {
                        "macro": "Fill",
                        "xnum": 7,
                        "ynum": 11,
                        "yheight": -8
                    }
                }]
            }
        },
        "UnderworldEndPipeFront": {
            "width": 80,
            "height": 80,
            "contents": {
                "mode": "Certain",
                "direction": "top",
                "snap": "left",
                "children": [{
                    "type": "Known",
                    "title": "Brick",
                    "arguments": {
                        "macro": "Fill",
                        "xnum": 10,
                        "ynum": 3
                    }
                }, {
                    "type": "Random",
                    "title": "Nothing",
                    "sizing": {
                        "height": 40
                    }
                }, {
                    "type": "Known",
                    "title": "Block",
                    "arguments": {
                        "hidden": true
                    }
                }, {
                    "type": "Random",
                    "title": "Nothing",
                    "sizing": {
                        "height": 24
                    }
                }, {
                    "type": "Known",
                    "title": "Brick",
                    "arguments": {
                        "macro": "Fill",
                        "xnum": 10,
                        "ynum": 1
                    }
                }]
            }
        },
        "UnderworldEndPipeTransport": {
            "width": 32,
            "height": 80,
            "contents": {
                "mode": "Certain",
                "direction": "top",
                "snap": "right",
                "children": [{
                    "type": "Known",
                    "title": "Brick",
                    "arguments": {
                        "macro": "Fill",
                        "xnum": 4,
                        "ynum": 3,
                        "yheight": -8
                    },
                    "sizing": {
                        "height": 24
                    }
                }, {
                    "type": "Known",
                    "title": "PipeCorner",
                    "arguments": {
                        "macro": "PipeCorner",
                        "height": 64,
                        "transport": "Overworld",
                        "scrollEnabler": true,
                        "scrollBlocker": true
                    }
                }, {
                    "type": "Random",
                    "title": "Nothing",
                    "sizing": {
                        "height": 40
                    }
                }, {
                    "type": "Known",
                    "title": "Brick",
                    "arguments": {
                        "macro": "Fill",
                        "xnum": 2
                    }
                }]
            }
        },
        
        
        /* Sky
        */
        
        "Sky": {
            "width": 1400, // ???
            "height": 80,
            "contents": {
                "mode": "Certain",
                "direction": "right",
                "snap": "left",
                "children": [{
                    "type": "Random",
                    "title": "SkyStart"
                }, {
                    "type": "Random",
                    "title": "Nothing"
                }, {
                    "type": "Random",
                    "title": "SkyBeforeMain"
                }, {
                    "type": "Random",
                    "title": "SkyMain"
                }, {
                    "type": "Random",
                    "title": "SkyEnd"
                }]
            }
        },
        "SkyStart": {
            "width": 32,
            "height": 80,
            "contents": {
                "mode": "Certain",
                "direction": "top",
                "snap": "left",
                "children": [{
                    "type": "Known",
                    "title": "Stone",
                    "arguments": {
                        "width": 32
                    },
                    "sizing": {
                        "width": 32
                    }
                }]
            }
        },
        "SkyBeforeMain": {
            "width": 80,
            "height": 80,
            "contents": {
                "mode": "Certain",
                "direction": "top",
                "snap": "left",
                "children": [{
                    "type": "Known",
                    "title": "Stone",
                    "arguments": {
                        "width": 80
                    },
                    "sizing": {
                        "width": 80
                    }
                }]
            }
        },
        "SkyMain": {
            "width": 560,
            "height": 80,
            "contents": {
                "mode": "Multiple",
                "children": [{
                    "type": "Random",
                    "title": "SkyMainLand"
                }, {
                    "type": "Random",
                    "title": "SkyMainTransport"
                }, {
                    "type": "Random",
                    "title": "SkyMainAir"
                }]
            }
        },
        "SkyMainLand": {
            "width": 560,
            "height": 80,
            "contents": {
                "mode": "Certain",
                "direction": "top",
                "snap": "left",
                "children": [{
                    "type": "Known",
                    "title": "Stone",
                    "arguments": {
                        "width": 560
                    }
                }]
            }
        },
        "SkyMainTransport": {
            "width": 140,
            "height": 40,
            "contents": {
                "mode": "Certain",
                "direction": "top",
                "snap": "left",
                "children": [{
                    "type": "Random",
                    "title": "Nothing",
                    "sizing": {
                        "height": 32 
                    }
                }, {
                    "type": "Known",
                    "title": "Platform",
                    "arguments": {
                        "width": 24,
                        "transport": "true"
                    }
                }]
            }
        },
        "SkyMainAir": {
            "width": 560,
            "height": 80,
            "contents": {
                "mode": "Random",
                "direction": "right",
                "snap": "bottom",
                "spacing": 8,
                "children": [{
                    "percent": 20,
                    "type": "Random",
                    "title": "SkyCoinsShort"
                }, {
                    "percent": 20,
                    "type": "Random",
                    "title": "SkyCoinsMedium"
                }, {
                    "percent": 20,
                    "type": "Random",
                    "title": "SkyCoinsLong"
                }, {
                    "percent": 40,
                    "type": "Random",
                    "title": "SkyCoinsStone"
                }]
            }
        },
        "SkyCoinsShort": {
            "width": 24,
            "height": 80,
            "contents": {
                "mode": "Certain",
                "direction": "top",
                "snap": "left",
                "spacing": {
                    "min": 0,
                    "max": 16,
                    "units": 8
                },
                "children": [{
                    "type": "Random",
                    "title": "Nothing",
                    "sizing": {
                        "height": 56
                    }
                }, {
                    "type": "Random",
                    "title": "SkyCoinsRow",
                    "stretch": {
                        "width": true
                    }
                }]
            }
        },
        "SkyCoinsMedium": {
            "width": 56,
            "height": 80,
            "contents": {
                "mode": "Certain",
                "direction": "top",
                "snap": "left",
                "spacing": {
                    "min": 0,
                    "max": 16,
                    "units": 8
                },
                "children": [{
                    "type": "Random",
                    "title": "Nothing",
                    "sizing": {
                        "height": 56
                    }
                }, {
                    "type": "Random",
                    "title": "SkyCoinsRow",
                    "stretch": {
                        "width": true
                    }
                }]
            }
        },
        "SkyCoinsLong": {
            "width": 128,
            "height": 80,
            "contents": {
                "mode": "Certain",
                "direction": "top",
                "snap": "left",
                "spacing": {
                    "min": 0,
                    "max": 16,
                    "units": 8
                },
                "children": [{
                    "type": "Random",
                    "title": "Nothing",
                    "sizing": {
                        "height": 56
                    }
                }, {
                    "type": "Random",
                    "title": "SkyCoinsRow",
                    "stretch": {
                        "width": true
                    }
                }]
            }
        },
        "SkyCoinsRow": {
            "width": 5,
            "height": 7,
            "contents": {
                "mode": "Repeat",
                "direction": "right",
                "snap": "top",
                "spacing": 3,
                "children": [{
                    "type": "Random",
                    "title": "Coin"
                }]
            }
        },
        "SkyCoinsStone": {
            "width": 24,
            "height": 80,
            "contents": {
                "mode": "Certain",
                "direction": "right",
                "snap": "bottom",
                "children": [{
                    "type": "Random",
                    "title": "Nothing",
                }, {
                    "type": "Random",
                    "title": "SkyCoinsStoneVertical",
                }]
            }
        },
        "SkyCoinsStoneVertical": {
            "width": 8,
            "height": 80,
            "contents": {
                "mode": "Certain",
                "direction": "top",
                "spacing": {
                    "min": 0,
                    "max": 8,
                    "units": 8
                },
                "children": [{
                    "type": "Random",
                    "title": "Nothing",
                    "sizing": {
                        "height": 64
                    }
                }, {
                    "type": "Known",
                    "title": "Stone",
                    "arguments": [{
                        "percent": 33,
                        "values": {}
                    }, {
                        "percent": 34,
                        "values": {
                            "width": 16
                        }
                    }, {
                        "percent": 33,
                        "values": {
                            "height": 16
                        }
                    }]
                }]
            }
        },
        "SkyEnd": {
            "width": 320,
            "height": 80,
            "contents": {
                "mode": "Certain",
                "direction": "top",
                "snap": "right",
                "children": [{
                    "type": "Random",
                    "title": "Nothing"
                }, {
                    "type": "Random",
                    "title": "SkyEndCoins"
                }]
            }
        },
        "SkyEndCoins": {
            "width": 24,
            "height": 7,
            "contents": {
                "mode": "Certain",
                "direction": "right",
                "snap": "bottom",
                "spacing": 3,
                "children": [{
                    "type": "Random",
                    "title": "Nothing",
                    "sizing": {
                        "width": 64
                    }
                }, {
                    "type": "Known",
                    "title": "Coin"
                }, {
                    "type": "Known",
                    "title": "Coin"
                }, {
                    "type": "Known",
                    "title": "Coin"
                }]
            }
        },
        
        
        /* Castle
        */
        
        "Castle": {
            "height": 80,
            "width": 2000,
            "contents": {
                "mode": "Certain",
                "direction": "right",
                "children": [{
                    "type": "Random",
                    "title": "CastleStart"
                }, {
                    "type": "Random",
                    "title": "CastleBody"
                }, {
                    "type": "Random",
                    "title": "CastleEnd"
                }]
            }
        },
        "CastleStart": {
            "width": 112,
            "height": 80,
            "contents": {
                "mode": "Certain",
                "direction": "top",
                "children": [{
                    "type": "Random",
                    "title": "StartInsideCastle"
                }, {
                    "type": "Random",
                    "title": "Nothing",
                    "sizing": {
                        "height": 80
                    }
                }, {
                    "type": "Known",
                    "title": "Stone",
                    "arguments": {
                        "height": 24,
                        "width": 112
                    }
                }]
            }
        },
        "CastleBody": {
            "width": 1632,
            "height": 80,
            "contents": {
                "mode": "Repeat",
                "direction": "right",
                "children": [{
                    "type": "Random",
                    "title": "CastleSegway"
                }, {
                    "type": "Random",
                    "title": "CastleLandArea"
                }, {
                    "type": "Random",
                    "title": "CastleSegway"
                }, {
                    "type": "Random",
                    "title": "CastleLandAreaLarge"
                }]
            }
        },
        "CastleSegway": {
            "width": 168,
            "height": 80,
            "contents": {
                "mode": "Random",
                "direction": "right",
                "snap": "bottom",
                "children": [{
                    "percent": 50,
                    "type": "Random",
                    "title": "CastleSegwayFloatingGap"
                }, {
                    "percent": 50,
                    "type": "Random",
                    "title": "CastleSegwayPlatformGap"
                }]
            }
        },
        "CastleSegwayFloatingGap": {
            "width": 168,
            "height": 80,
            "contents": {
                "mode": "Repeat",
                "direction": "right",
                "snap": "bottom",
                "children": [{
                    "type": "Random",
                    "title": "CastleSegwayGapSpace"
                }, {
                    "type": "Random",
                    "title": "CastleSegwayGapChunk"
                }]
            }
        },
        "CastleSegwayGapSpace": {
            "width": 24,
            "height": 80,
            "contents": {
                "mode": "Multiple",
                "children": [{
                    "type": "Random",
                    "title": "CastleSegwayGapSpaceWater"
                }, {
                    "type": "Random",
                    "title": "CastleSegwayGapSpaceEnemyArea"
                }]
            }
        },
        "CastleSegwayGapSpaceWater": {
            "width": 24,
            "height": 80,
            "contents": {
                "mode": "Certain",
                "direction": "right",
                "snap": "bottom",
                "children": [{
                    "type": "Random",
                    "title": "Water",
                    "sizing": {
                        "width": 24
                    }
                }]
            }
        },
        "CastleSegwayGapSpaceEnemyArea": {
            "width": 24,
            "height": 40,
            "contents": {
                "mode": "Repeat",
                "direction": "right",
                "snap": "bottom",
                "spacing": [{
                    "percent": 60,
                    "value": 24
                }, {
                    "percent": 15,
                    "value": 0
                }, {
                    "percent": 15,
                    "value": 8
                }, {
                    "percent": 15,
                    "value": 16
                }],
                "children": [{
                    "type": "Random",
                    "title": "Nothing",
                    "sizing": {
                        "width": 0
                    }
                }, {
                    "type": "Random",
                    "title": "Podoboo"
                }]
            }
        },
        "CastleSegwayGapChunk": {
            "width": 24,
            "height": 80,
            "contents": {
                "mode": "Certain",
                "direction": "top",
                "spacing": {
                    "min": 16,
                    "max": 40,
                    "units": 8
                },
                "children": [{
                    "type": "Random",
                    "title": "Water",
                    "sizing": {
                        "width": 24
                    }
                }, {
                    "type": "Random",
                    "title": "CastleSegwayGapChunkSolids"
                }, {
                    "type": "Random",
                    "title": "CastleSegwayGapChunkReward"
                }]
            }
        },
        "CastleSegwayGapChunkSolids": {
            "width": 24,
            "height": 8,
            "contents": {
                "mode": "Repeat",
                "direction": "right",
                "children": [{
                    "percent": 80,
                    "type": "Random",
                    "title": "Stone"
                }, {
                    "percent": 20,
                    "type": "Random",
                    "title": "CastleBlockActive"
                }]
            }
        },
        "CastleSegwayGapChunkReward": {
            "width": 16,
            "height": 8,
            "contents": {
                "mode": "Certain",
                "direction": "right",
                "children": [{
                    "type": "Random",
                    "title": "Nothing"
                }, {
                    "type": "Random",
                    "title": "CastleSegwayGapChunkBlock"
                }]
            }
        },
        "CastleSegwayGapChunkBlock": {
            "width": 8,
            "height": 8,
            "contents": {
                "mode": "Random",
                "direction": "right",
                "children": [{
                    "percent": 50,
                    "type": "Random",
                    "title": "Nothing"
                }, {
                    "percent": 50,
                    "type": "Known",
                    "title": "Block",
                    "arguments": {
                        "contents": "Mushroom"
                    }
                }]
            }
        },
        "CastleSegwayPlatformGap": {
            "width": 168,
            "height": 80,
            "contents": {
                "mode": "Certain",
                "direction": "right",
                "children": [{
                    "type": "Random",
                    "title": "CastleSegwayPlatformGapBorder"
                }, {
                    "type": "Random",
                    "title": "CastleSegwayPlatformGapPlatforms"
                }, {
                    "type": "Random",
                    "title": "CastleSegwayPlatformGapBorder"
                }]
            }
        },
        "CastleSegwayPlatformGapBorder": {
            "width": 24,
            "height": 80,
            "contents": {
                "mode": "Certain",
                "direction": "top",
                "spacing": {
                    "min": 0,
                    "max": 24,
                    "units": 8
                },
                "children": [{
                    "type": "Known",
                    "title": "Floor",
                    "arguments": {
                        "macro": "Floor"
                    },
                    "sizing": {
                        "height": 32
                    },
                    "stretch": {
                        "width": true
                    }
                }, {
                    "type": "Random",
                    "title": "CastleSegwayPlatformGapBorderCastleBlock"
                }]
            }
        },
        "CastleSegwayPlatformGapBorderCastleBlock": {
            "width": 24,
            "height": 8,
            "contents": {
                "mode": "Certain",
                "direction": "right",
                "spacing": {
                    "min": 0,
                    "max": 16,
                    "units": 8
                },
                "children": [{
                    "type": "Random",
                    "title": "Nothing",
                    "sizing": {
                        "width": 0
                    }
                }, {
                    "type": "Random",
                    "title": "CastleBlockActive"
                }]
            }
        },
        "CastleSegwayPlatformGapPlatforms": {
            "width": 120,
            "height": 80,
            "contents": {
                "mode": "Repeat",
                "direction": "right",
                "spacing": {
                    "min": 0,
                    "max": 16,
                    "units": 16
                },
                "children": [{
                    "type": "Random",
                    "title": "Nothing"
                }, {
                    "type": "Random",
                    "title": "PlatformGenerator"
                }]
            }
        },
        "CastleLandArea": {
            "width": 160,
            "height": 80,
            "contents": {
                "mode": "Random",
                "direction": "right",
                "children": [{
                    "percent": 100,
                    "type": "Random",
                    "title": "CastleLandTunnel"
                }]
            }
        },
        "CastleLandTunnel": {
            "width": 160,
            "height": 80,
            "contents": {
                "mode": "Certain",
                "direction": "top",
                "children": [{
                    "type": "Known",
                    "title": "Floor",
                    "arguments": {
                        "macro": "Floor",
                        "width": 160,
                    },
                    "sizing": {
                        "height": 32
                    }
                }, {
                    "type": "Random",
                    "title": "CastleLandTunnelEnemies"
                }, {
                    "type": "Random",
                    "title": "CastleLandTunnelTop"
                }]
            }
        },
        "CastleLandTunnelEnemies": {
            "width": 160,
            "height": 16,
            "contents": {
                "mode": "Random",
                "direction": "right",
                "snap": "bottom",
                "spacing": [{
                    "percent": 10,
                    "value": 4
                }, {
                    "percent": 15,
                    "value": 8
                }, {
                    "percent": 85,
                    "value": {
                        "min": 32,
                        "max": 64,
                        "units": 8
                    }
                }],
                "children": [{
                    "percent": 70,
                    "type": "Random",
                    "title": "Goomba"
                }, {
                    "percent": 15,
                    "type": "Random",
                    "title": "Beetle"
                }, {
                    "percent": 15,
                    "type": "Random",
                    "title": "Koopa"
                }]
            }
        },
        "CastleLandTunnelTop": {
            "width": 160,
            "height": 32,
            "contents": {
                "mode": "Certain",
                "direction": "bottom",
                "children": [{
                    "type": "Known",
                    "title": "Stone",
                    "stretch": {
                        "width": true
                    },
                    "arguments": [{
                        "percent": 33,
                        "values": {
                            "height": 24
                        }
                    }, {
                        "percent": 34,
                        "values": {
                            "height": 32
                        }
                    }, {
                        "percent": 33,
                        "values": {
                            "height": 40
                        }
                    }, ]
                }]
            }
        },
        "CastleLandAreaLarge": {
            "width": 320,
            "height": 80,
            "contents": {
                "mode": "Repeat",
                "direction": "right",
                "children": [{
                    "type": "Random",
                    "title": "CastleLandAreaChunk"
                }, {
                    "type": "Random",
                    "title": "CastleLandAreaBetween"
                }]
            }
        },
        "CastleLandAreaChunk": {
            "width": 152,
            "height": 80,
            "contents": {
                "mode": "Repeat",
                "direction": "right",
                "children": [{
                    "percent": 100,
                    "type": "Random",
                    "title": "CastleLandAreaCavern"
                }]
            }
        },
        "CastleLandAreaCavern": {
            "width": 152,
            "height": 80,
            "contents": {
                "mode": "Certain",
                "direction": "top",
                "children": [{
                    "type": "Known",
                    "title": "Floor",
                    "arguments": {
                        "macro": "Floor",
                        "width": 152,
                    }
                }, {
                    "type": "Random",
                    "title": "CastleLandAreaCavernInside"
                }, {
                    "type": "Known",
                    "title": "Stone",
                    "arguments": {
                        "width": 152
                    }
                }]
            }
        },
        "CastleLandAreaCavernInside": {
            "width": 152,
            "height": 80,
            "contents": {
                "mode": "Random",
                "direction": "right",
                "snap": "bottom",
                "spacing": {
                    "min": 8,
                    "max": 40,
                    "units": 8
                },
                "children": [{
                    "percent": 40,
                    "type": "Random",
                    "title": "CastleLandAreaCavernInsideTites"
                }, {
                    "percent": 35,
                    "type": "Random",
                    "title": "CastleLandAreaCavernInsideBonus"
                }, {
                    "percent": 25,
                    "type": "Random",
                    "title": "Nothing",
                    "sizing": {
                        "width": 24
                    }
                }]
            }
        },
        "CastleLandAreaCavernInsideTites": {
            "width": 24,
            "height": 80,
            "contents": {
                "mode": "Certain",
                "direction": "top",
                "snap": "bottom",
                "children": [{
                    "type": "Known",
                    "title": "Stone",
                    "arguments": {
                        "width": 24
                    }
                }, {
                    "type": "Random",
                    "title": "CastleLandAreaCavernInsideTitesCastleBlock"
                }, {
                    "type": "Random",
                    "title": "Nothing",
                    "sizing": {
                        "height": 40
                    }
                }, {
                    "type": "Random",
                    "title": "CastleLandAreaCavernInsideTitesCastleBlock"
                }, {
                    "type": "Known",
                    "title": "Stone",
                    "sizing": {
                        "width": 24,
                        "height": 16
                    },
                    "arguments": {
                        "width": 24,
                        "height": 16
                    }
                }]
            }
        },
        "CastleLandAreaCavernInsideTitesCastleBlock": {
            "width": 24,
            "height": 8,
            "contents": {
                "mode": "Certain",
                "direction": "right",
                "children": [{
                    "type": "Random",
                    "title": "Nothing"
                }, {
                    "type": "Random",
                    "title": "CastleBlockActive"
                }]
            }
        },
        "CastleLandAreaCavernInsideBonus": {
            "width": 24,
            "height": 64,
            "contents": {
                "mode": "Certain",
                "direction": "top",
                "spacing": {
                    "min": 8,
                    "max": 24,
                    "units": 8
                },
                "children": [{
                    "type": "Random",
                    "title": "Nothing"
                }, {
                    "type": "Random",
                    "title": "CastleLandAreaCavernInsideBonusBlocks"
                }, {
                    "type": "Random",
                    "title": "CastleLandAreaCavernInsideBonusBlocks"
                }]
            }
        },
        "CastleLandAreaCavernInsideBonusBlocks": {
            "width": 24,
            "height": 8,
            "contents": {
                "mode": "Certain",
                "direction": "right",
                "children": [{
                    "type": "Random",
                    "title": "Nothing"
                }, {
                    "type": "Known",
                    "title": "Block",
                    "arguments": [{
                        "percent": 45,
                        "values": {
                            "hidden": true
                        }
                    }, {
                        "percent": 35,
                        "values": {}
                    }, {
                        "percent": 15,
                        "values": {
                            "contents": "Mushroom",
                            "hidden": true
                        }
                    }, {
                        "percent": 5,
                        "values": {
                            "contents": "Mushroom",
                        }
                    }]
                }]
            }
        },
        "CastleLandAreaBetween": {
            "width": 16,
            "height": 80,
            "contents": {
                "mode": "Certain",
                "direction": "top",
                "children": [{
                    "type": "Known",
                    "title": "Water",
                    "arguments": {
                        "macro": "Water",
                        "width": 16
                    }
                }, {
                    "type": "Random",
                    "title": "Nothing",
                    "sizing": {
                        "height": 83
                    }
                }, {
                    "type": "Known",
                    "title": "Stone",
                    "arguments": {
                        "width": 16
                    }
                }]
            }
        },
        "CastleEnd": {
            "width": 256,
            "height": 8,
            "contents": {
                "mode": "Certain",
                "direction": "right",
                "children": [{
                    "type": "Random",
                    "title": "CastlePreEnd"
                }, {
                    "type": "Random",
                    "title": "EndInsideCastle"
                }, {
                    "type": "Random",
                    "title": "Overworld"
                }]
            }
        },
        "CastlePreEnd": {
            "width": 80,
            "height": 80,
            "contents": {
                "mode": "Certain",
                "direction": "top",
                "children": [{
                    "type": "Known",
                    "title": "Floor", 
                    "arguments": {
                        "macro": "Floor",
                        "width": 80
                    }
                }, {
                    "type": "Random",
                    "title": "CastlePreEndBlocks"
                }, {
                    "type": "Random",
                    "title": "Nothing",
                    "sizing": {
                        "height": 56
                    }
                }, {
                    "type": "Known",
                    "title": "Stone",
                    "arguments": [{
                        "percent": 50,
                        "values": {
                            "width": 80,
                            "height": 24
                        }
                    }, {
                        "percent": 50,
                        "values": {
                            "width": 80,
                            "height": 32
                        }
                    }]
                }]
            }
        },
        "CastlePreEndBlocks": {
            "width": 80,
            "height": 24,
            "contents": {
                "mode": "Repeat",
                "direction": "right",
                "snap": "top",
                "spacing": 16,
                "children": [{
                    "type": "Known",
                    "title": "Stone",
                    "sizing": {
                        "width": 16,
                        "height": 24
                    },
                    "arguments": {
                        "width": 16,
                        "height": 24
                    }
                }]
            }
        },
        
        
        /* Enemy groups
        */
        
        "EnemyEasy": {
            "width": 8,
            "height": 12,
            "contents": {
                "mode": "Random",
                "direction": "right",
                "spacing": [{
                    "percent": 75,
                    "value": 4
                }, {
                    "percent": 25,
                    "value": 8
                }],
                "children": [{
                    "percent": 45,
                    "type": "Random",
                    "title": "Goomba"
                }, {
                    "percent": 35,
                    "type": "Random",
                    "title": "Koopa"
                }, {
                    "percent": 20,
                    "type": "Random",
                    "title": "Beetle"
                }]
            }
        },
        "EnemyEasyScattered": {
            "width": 8,
            "height": 12,
            "contents": {
                "mode": "Random",
                "direction": "right",
                "spacing": [{
                    "percent": 45,
                    "value": 8
                }, {
                    "percent": 25,
                    "value": 4
                }, {
                    "percent": 15,
                    "value": 12
                }, {
                    "percent": 15,
                    "value": 16
                }],
                "children": [{
                    "percent": 40,
                    "type": "Random",
                    "title": "Goomba"
                }, {
                    "percent": 30,
                    "type": "Random",
                    "title": "Koopa"
                }, {
                    "percent": 15,
                    "type": "Random",
                    "title": "Beetle"
                }, {
                    "percent": 15,
                    "type": "Random",
                    "title": "Nothing"
                }]
            }
        },
        "EnemyEasyElevated": {
            "width": 64,
            "height": 12,
            "contents": {
                "mode": "Random",
                "direction": "right",
                "snap": "bottom",
                "spacing": 4,
                "children": [{
                    "percent": 25,
                    "type": "Random",
                    "title": "Goomba"
                }, {
                    "percent": 15,
                    "type": "Random",
                    "title": "Koopa"
                }, {
                    "percent": 10,
                    "type": "Random",
                    "title": "Beetle"
                }, {
                    "percent": 50,
                    "type": "Random",
                    "title": "Nothing"
                }]
            }
        },
        "EnemyHard": {
            "width": 8,
            "height": 12,
            "contents": {
                "mode": "Random",
                "direction": "right",
                "children": [{
                    "percent": 40,
                    "type": "Random",
                    "title": "HammerBro"
                }, {
                    "percent": 40,
                    "type": "Random",
                    "title": "Blooper"
                }, {
                    "percent": 20,
                    "type": "Random",
                    "title": "Lakitu"
                }]
            }
        },
        
        
        /* Solid groups
        */
        
        "SolidSmall": {
            "width": 8,
            "height": 12,
            "contents": {
                "mode": "Random",
                "direction": "right",
                "children": [{
                    "percent": 80,
                    "type": "Random",
                    "title": "Brick"
                }, {
                    "percent": 20,
                    "type": "Random",
                    "title": "Block"
                }]
            }
        },
        "SolidSmallSpotty": {
            "width": 8,
            "height": 12,
            "contents": {
                "mode": "Random",
                "direction": "right",
                "children": [{
                    "percent": 50,
                    "type": "Random",
                    "title": "Brick"
                }, {
                    "percent": 30,
                    "type": "Random",
                    "title": "Nothing"
                }, {
                    "percent": 20,
                    "type": "Random",
                    "title": "Block"
                }]
            }
        },
        "LandObstacleGroupSolid": {
            "width": 8,
            "height": 8,
            "contents": {
                "mode": "Random",
                "direction": "right",
                "children": [{
                    "percent": 70,
                    "type": "Random",
                    "title": "Brick"
                }, {
                    "percent": 30,
                    "type": "Random",
                    "title": "Block"
                }]
            }
        },
        "Cannon": {
            "width": 8,
            "height": 32,
            "contents": {
                "mode": "Random",
                "direction": "top",
                "snap": "bottom",
                "spacing": [{
                    "percent": 50,
                    "value": 0
                }, {
                    "percent": 50,
                    "value": 24
                }],
                "children": [{
                    "percent": 50,
                    "type": "Random",
                    "title": "CannonMedium"
                }, {
                    "percent": 10,
                    "type": "Random",
                    "title": "CannonSmall"
                }, {
                    "percent": 40,
                    "type": "Random",
                    "title": "CannonLarge"
                }]    
            }
        },
        "CannonStack": {
            "width": 8,
            "height": 32,
            "contents": {
                "mode": "Certain",
                "direction": "top",
                "snap": "bottom",
                "children": [{
                    "type": "Random",
                    "title": "Cannon"
                }, {
                    "type": "Random",
                    "title": "Cannon"
                }]
            }
        },
        "RampUpSmall": {
            "width": 32,
            "height": 32,
            "contents": {
                "mode": "Certain",
                "direction": "right",
                "snap": "bottom",
                "children": [{
                    "type": "Random",
                    "title": "Stone"
                }, {
                    "type": "Known",
                    "title": "Stone",
                    "sizing": {
                        "height": 16
                    },
                    "arguments": {
                        "height": 16
                    }
                }, {
                    "type": "Known",
                    "title": "Stone",
                    "sizing": {
                        "height": 24
                    },
                    "arguments": {
                        "height": 24
                    }
                }, {
                    "type": "Known",
                    "title": "Stone",
                    "sizing": {
                        "height": 32
                    },
                    "arguments": {
                        "height": 32
                    }
                }]
            }
        },
        "RampUpSmallFloor": {
            "width": 32,
            "height": 80,
            "contents": {
                "mode": "Certain",
                "direction": "top",
                "children": [{
                    "type": "Known",
                    "title": "Floor",
                    "arguments": {
                        "macro": "Floor",
                        "width": 32
                    }
                }, {
                    "type": "Random",
                    "title": "RampUpSmall"
                }]
            }
        },
        "RampUpLarge": {
            "width": 64,
            "height": 64,
            "contents": {
                "mode": "Certain",
                "direction": "right",
                "snap": "bottom",
                "children": [{
                    "type": "Random",
                    "title": "Stone"
                }, {
                    "type": "Known",
                    "title": "Stone",
                    "sizing": {
                        "height": 16
                    },
                    "arguments": {
                        "height": 16
                    }
                }, {
                    "type": "Known",
                    "title": "Stone",
                    "sizing": {
                        "height": 24
                    },
                    "arguments": {
                        "height": 24
                    }
                }, {
                    "type": "Known",
                    "title": "Stone",
                    "sizing": {
                        "height": 32
                    },
                    "arguments": {
                        "height": 32
                    }
                }, {
                    "type": "Known",
                    "title": "Stone",
                    "sizing": {
                        "height": 40
                    },
                    "arguments": {
                        "height": 40
                    }
                }, {
                    "type": "Known",
                    "title": "Stone",
                    "sizing": {
                        "height": 48
                    },
                    "arguments": {
                        "height": 48
                    }
                }, {
                    "type": "Known",
                    "title": "Stone",
                    "sizing": {
                        "height": 56
                    },
                    "arguments": {
                        "height": 56
                    }
                }, {
                    "type": "Known",
                    "title": "Stone",
                    "sizing": {
                        "height": 64
                    },
                    "arguments": {
                        "height": 64
                    }
                }]
            }
        },
        "RampUpLargeFloor": {
            "width": 64,
            "height": 80,
            "contents": {
                "mode": "Certain",
                "direction": "top",
                "children": [{
                    "type": "Known",
                    "title": "Floor",
                    "arguments": {
                        "macro": "Floor",
                        "width": 64
                    }
                }, {
                    "type": "Random",
                    "title": "RampUpLarge"
                }]
            }
        },
        "RampDownSmall": {
            "width": 32,
            "height": 32,
            "contents": {
                "mode": "Certain",
                "direction": "right",
                "snap": "bottom",
                "children": [{
                    "type": "Known",
                    "title": "Stone",
                    "sizing": {
                        "height": 32
                    },
                    "arguments": {
                        "height": 32
                    }
                }, {
                    "type": "Known",
                    "title": "Stone",
                    "sizing": {
                        "height": 24
                    },
                    "arguments": {
                        "height": 24
                    }
                }, {
                    "type": "Known",
                    "title": "Stone",
                    "sizing": {
                        "height": 16
                    },
                    "arguments": {
                        "height": 16
                    }
                }, {
                    "type": "Known",
                    "title": "Stone"
                }]
            }
        },
        "RampDownSmallFloor": {
            "width": 32,
            "height": 80,
            "contents": {
                "mode": "Certain",
                "direction": "top",
                "children": [{
                    "type": "Known",
                    "title": "Floor",
                    "arguments": {
                        "macro": "Floor",
                        "width": 32
                    }
                }, {
                    "type": "Random",
                    "title": "RampDownSmall"
                }]
            }
        },
        "RampDownLarge": {
            "width": 64,
            "height": 64,
            "contents": {
                "mode": "Certain",
                "direction": "right",
                "snap": "bottom",
                "children": [{
                    "type": "Known",
                    "title": "Stone",
                    "sizing": {
                        "height": 64
                    },
                    "arguments": {
                        "height": 64
                    }
                }, {
                    "type": "Known",
                    "title": "Stone",
                    "sizing": {
                        "height": 56
                    },
                    "arguments": {
                        "height": 56
                    }
                }, {
                    "type": "Known",
                    "title": "Stone",
                    "sizing": {
                        "height": 48
                    },
                    "arguments": {
                        "height": 48
                    }
                }, {
                    "type": "Known",
                    "title": "Stone",
                    "sizing": {
                        "height": 40
                    },
                    "arguments": {
                        "height": 40
                    }
                }, {
                    "type": "Known",
                    "title": "Stone",
                    "sizing": {
                        "height": 32
                    },
                    "arguments": {
                        "height": 32
                    }
                }, {
                    "type": "Known",
                    "title": "Stone",
                    "sizing": {
                        "height": 24
                    },
                    "arguments": {
                        "height": 24
                    }
                }, {
                    "type": "Known",
                    "title": "Stone",
                    "sizing": {
                        "height": 16
                    },
                    "arguments": {
                        "height": 16
                    }
                }, {
                    "type": "Known",
                    "title": "Stone"
                }]
            }
        },
        "RampDownLargeFloor": {
            "width": 64,
            "height": 80,
            "contents": {
                "mode": "Certain",
                "direction": "top",
                "children": [{
                    "type": "Known",
                    "title": "Floor",
                    "arguments": {
                        "macro": "Floor",
                        "width": 64
                    }
                }, {
                    "type": "Random",
                    "title": "RampDownLarge"
                }]
            }
        },
        "StoneTower": {
            "width": 8,
            "height": 32,
            "contents": {
                "mode": "Random",
                "direction": "right",
                "snap": "bottom",
                "children": [{
                    "percent": 50,
                    "type": "Known",
                    "title": "Stone",
                    "snap": "bottom",
                    "sizing": {
                        "height": 24
                    },
                    "arguments": {
                        "height": 24
                    }
                }, {
                    "percent": 50,
                    "type": "Known",
                    "title": "Stone",
                    "stretch": {
                        "height": true
                    },
                }]
            }
        },
        "StoneTowerLarge": {
            "width": 8,
            "height": 64,
            "contents": {
                "mode": "Certain",
                "direction": "right",
                "snap": "top",
                "children": [{
                    "type": "Known",
                    "title": "Stone",
                    "arguments": {
                        "height": 64
                    },
                    "sizing": {
                        "height": 64
                    }
                }]
            }
        },
        "CannonTower": {
            "width": 24,
            "height": 32,
            "contents": {
                "mode": "Certain",
                "direction": "right",
                "snap": "bottom",
                "children": [{
                    "type": "Random",
                    "title": "Nothing"
                }, {
                    "type": "Random",
                    "title": "Cannon"
                }, {
                    "type": "Random",
                    "title": "Nothing"
                }]
            }
        },
        
        /* Scenery groups
        */
        
        "OverworldScenery": {
            "width": 160,
            "height": 80,
            "contents": {
                "mode": "Certain",
                "direction": "top",
                "snap": "bottom",
                "children": [{
                    "type": "Random",
                    "title": "Nothing",
                    "sizing": {
                        "height": 8
                    }
                }, {
                    "type": "Random",
                    "title": "OverworldLandScenery"
                }, {
                    "type": "Random",
                    "title": "Nothing",
                    "sizing": {
                        "height": 32
                    }
                }]
            }
        },
        "OverworldLandScenery": {
            "height": 40,
            "width": 160,
            "contents": {
                "mode": "Random",
                "direction": "right",
                "snap": "bottom",
                "spacing": {
                    "min": -4,
                    "max": 40,
                    "units": 4
                },
                "children": [{
                    "percent": 25,
                    "type": "Random",
                    "title": "HillSmall"
                }, {
                    "percent": 25,
                    "type": "Random",
                    "title": "HillLarge"
                }, {
                    "percent": 12,
                    "type": "Random",
                    "title": "Bush1"
                }, {
                    "percent": 11,
                    "type": "Random",
                    "title": "Bush2"
                }, {
                    "percent": 12,
                    "type": "Random",
                    "title": "Bush3"
                }, {
                    "percent": 10,
                    "type": "Random",
                    "title": "Fence"
                }, {
                    "percent": 5,
                    "type": "Random",
                    "title": "PlantSmall"
                }, {
                    "percent": 5,
                    "type": "Random",
                    "title": "PlantLarge"
                }]
            }
        },
        "OverworldClouds": {
            "height": 56,
            "width": 2528,
            "contents": {
                "mode": "Random",
                "direction": "right",
                "snap": "top",
                "spacing": {
                    "min": 16,
                    "max": 80,
                    "units": 8
                },
                "children": [{
                    "percent": 40,
                    "type": "Random",
                    "title": "CloudClump1"
                }, {
                    "percent": 35,
                    "type": "Random",
                    "title": "CloudClump2"
                }, {
                    "percent": 25,
                    "type": "Random",
                    "title": "CloudClump3"
                }]
            }
        },
        "CloudClump1": {
            "height": 56,
            "width": 16,
            "contents": {
                "mode": "Certain",
                "direction": "top",
                "spacing": {
                    "min": 16,
                    "max": 40,
                    "units": 8
                },
                "children": [{
                    "type": "Random",
                    "title": "Nothing",
                }, {
                    "type": "Random",
                    "title": "Cloud1"
                }]
            }
        },
        "CloudClump2": {
            "height": 56,
            "width": 24,
            "contents": {
                "mode": "Certain",
                "direction": "top",
                "spacing": {
                    "min": 16,
                    "max": 40,
                    "units": 8
                },
                "children": [{
                    "type": "Random",
                    "title": "Nothing",
                }, {
                    "type": "Random",
                    "title": "Cloud2"
                }]
            }
        },
        "CloudClump3": {
            "height": 56,
            "width": 32,
            "contents": {
                "mode": "Certain",
                "direction": "top",
                "spacing": {
                    "min": 16,
                    "max": 40,
                    "units": 8
                },
                "children": [{
                    "type": "Random",
                    "title": "Nothing",
                }, {
                    "type": "Random",
                    "title": "Cloud3"
                }]
            }
        },
        "Cloud": {
            "width": 32,
            "height": 12,
            "contents": {
                "mode": "Random",
                "direction": "right",
                "limit": 1,
                "children": [{
                    "percent": 40,
                    "type": "Random",
                    "title": "Cloud1"
                }, {
                    "percent": 35,
                    "type": "Random",
                    "title": "Cloud2"
                }, {
                    "percent": 25,
                    "type": "Random",
                    "title": "Cloud3"
                }]
            }
        },
        "OverworldSegwaySpotScenery": {
            "width": 8,
            "height": 23,
            "contents": {
                "mode": "Random",
                "direction": "top",
                "snap": "bottom",
                "children": [{
                    "percent": 70,
                    "type": "Random",
                    "title": "Nothing",
                    "stretch": {
                        "height": true
                    }
                }, {
                    "percent": 15,
                    "type": "Random",
                    "title": "PlantSmall"
                }, {
                    "percent": 15,
                    "type": "Random",
                    "title": "PlantLarge"
                }]
            }
        },
        
        
        /* Characters
        */
        
        "Goomba": {
            "width": 8,
            "height": 8,
            "contents": {
                "mode": "Certain",
                "direction": "right",
                "snap": "bottom",
                "children": [{
                    "type": "Known",
                    "title": "Goomba"
                }]
            }
        },
        "Koopa": {
            "width": 8,
            "height": 12,
            "contents": {
                "mode": "Random",
                "direction": "right",
                "snap": "bottom",
                "children": [{
                    "percent": 20,
                    "type": "Known",
                    "title": "Koopa",
                }, {
                    "percent": 40,
                    "type": "Known",
                    "title": "Koopa",
                    "arguments": {
                        "smart": true
                    }
                }, {
                    "percent": 15,
                    "type": "Known",
                    "title": "Koopa",
                    "arguments": {
                        "jumping": true
                    }
                }, {
                    "percent": 25,
                    "type": "Known",
                    "title": "Koopa",
                    "arguments": {
                        "smart": true,
                        "jumping": true
                    }
                }]
            }
        },
        "KoopaJumping": {
            "width": 8,
            "height": 12,
            "contents": {
                "mode": "Random",
                "direction": "top",
                "snap": "left",
                "children": [{
                    "percent": 35,
                    "type": "Known",
                    "title": "Koopa",
                    "arguments": {
                        "jumping": true
                    }
                }, {
                    "percent": 65,
                    "type": "Known",
                    "title": "Koopa",
                    "arguments": {
                        "smart": true,
                        "jumping": true
                    }
                }]
            }
        },
        "Beetle": {
            "width": 8,
            "height": 8.5,
            "contents": {
                "mode": "Certain",
                "direction": "right",
                "snap": "bottom",
                "children": [{
                    "type": "Known",
                    "title": "Beetle"
                }]
            }
        },
        "HammerBro": {
            "width": 8,
            "height": 12,
            "contents": {
                "mode": "Certain",
                "direction": "right",
                "snap": "bottom",
                "children": [{
                    "type": "Known",
                    "title": "HammerBro"
                }]
            }
        },
        "Blooper": {
            "width": 8,
            "height": 40,
            "contents": {
                "mode": "Certain",
                "direction": "right",
                "snap": "top",
                "children": [{
                    "type": "Known",
                    "title": "Blooper"
                }]
            }
        },
        "Lakitu": {
            "width": 8,
            "height": 80,
            "contents": {
                "mode": "Certain",
                "direction": "top",
                "snap": "right",
                "spacing": 4,
                "children": [{
                    "type": "Random",
                    "title": "Nothing",
                    "sizing": {
                        "height": 0
                    }
                }, {
                    "type": "Known",
                    "title": "Lakitu"
                }]
            }
        },
        "Podoboo": {
            "width": 8,
            "height": 8,
            "contents": {
                "mode": "Certain",
                "direction": "top",
                "spacing": -40,
                "snap": "bottom",
                "children": [{
                    "type": "Random",
                    "title": "Nothing"
                }, {
                    "type": "Known",
                    "title": "Podoboo"
                }]
            }
        },
        
        
        /* Solids
        */
        
        "Brick": {
            "width": 8,
            "height": 8,
            "contents": {
                "mode": "Random",
                "direction": "right",
                "snap": "top",
                "children": [{
                    "percent": 85,
                    "type": "Known",
                    "title": "Brick"
                }, {
                    "percent": 10,
                    "type": "Known",
                    "title": "Brick",
                    "arguments": {
                        "contents": "Coin"
                    }
                }, {
                    "percent": 5,
                    "type": "Known",
                    "title": "Brick",
                    "arguments": {
                        "contents": "Star"
                    }
                }]
            }
        },
        "Block": {
            "width": 8,
            "height": 8,
            "contents": {
                "mode": "Certain",
                "direction": "right",
                "snap": "top",
                "children": [{
                    "type": "Known",
                    "title": "Block",
                    "arguments": [{
                        "percent": 90,
                        "values": {}
                    }, {
                        "percent": 9,
                        "values": {
                            "contents": "Mushroom"
                        }
                    }, {
                        "percent": 1,
                        "values": {
                            "contents": "Mushroom1Up",
                            "hidden": true
                        }
                    }]
                }]
            }
        },
        "BlockTreasure": {
            "width": 8,
            "height": 8,
            "contents": {
                "mode": "Certain",
                "direction": "right",
                "snap": "top",
                "children": [{
                    "type": "Known",
                    "title": "Block",
                    "arguments": [{
                        "percent": 35,
                        "values": {
                            "contents": "Mushroom"
                        }
                    }, {
                        "percent": 35,
                        "values": {
                            "contents": "Star"
                        }
                    }, {
                        "percent": 30,
                        "values": {
                            "contents": "Mushroom1Up"
                        }
                    }]
                }]
            }
        },
        "BlockTreasureFloating": {
            "width": 8,
            "height": 8,
            "contents": {
                "mode": "Certain",
                "direction": "right",
                "snap": "top",
                "children": [{
                    "type": "Known",
                    "title": "Block",
                    "arguments": [{
                        "percent": 20,
                        "values": {
                            "contents": "Mushroom"
                        }
                    }, {
                        "percent": 20,
                        "values": {
                            "hidden": true,
                            "contents": "Mushroom"
                        }
                    }, {
                        "percent": 15,
                        "values": {
                            "contents": "Star"
                        }
                    }, {
                        "percent": 15,
                        "values": {
                            "hidden": true,
                            "contents": "Star"
                        }
                    }, {
                        "percent": 20,
                        "values": {
                            "contents": "Mushroom1Up"
                        }
                    }, {
                        "percent": 20,
                        "values": {
                            "hidden": true,
                            "contents": "Mushroom1Up"
                        }
                    }]
                }]
            }
        },
        "BlockReward": {
            "width": 8,
            "height": 8,
            "contents": {
                "mode": "Certain",
                "direction": "right", 
                "snap": "top",
                "children": [{
                    "type": "Known",
                    "title": "Block",
                    "arguments": [{
                        "percent": 30,
                        "values": {
                            "hidden": true
                        }
                    }, {
                        "percent": 30,
                        "values": {
                            "hidden": true,
                            "contents": "Mushroom"
                        }
                    }, {
                        "percent": 30,
                        "values": {
                            "hidden": true,
                            "contents": "Star"
                        }
                    }, {
                        "percent": 30,
                        "values": {
                            "hidden": true,
                            "contents": "Mushroom1Up"
                        }
                    }]
                }]
            }
        },
        "Bridge": {
            "width": 8,
            "height": 8,
            "contents": {
                "mode": "Certain",
                "snap": "bottom",
                "direction": "right",
                "children": [{
                    "type": "Known",
                    "title": "Bridge",
                    "stretch": {
                        "width": true
                    },
                    "arguments": {
                        "macro": "Bridge",
                    }
                }]
            }
        },
        "Tree": {
            "width": 24,
            "height": 8,
            "contents": {
                "mode": "Certain",
                "direction": "top",
                "children": [{
                    "type": "Known",
                    "title": "Tree",
                    "stretch": {
                        "width": true
                    },
                    "arguments": {
                        "macro": "Tree"
                    }
                }]
            }
        },
        "TreeCoin": {
            "width": 8,
            "height": 12,
            "contents": {
                "mode": "Certain",
                "direction": "top",
                "snap": "bottom",
                "children": [{
                    "type": "Random",
                    "title": "Nothing",
                    "sizing": {
                        "height": 4
                    }
                }, {
                    "type": "Random",
                    "title": "Coin",
                    "sizing": {
                        "height": 4
                    }
                }]
            }
        },
        "TreeCoins": {
            "width": 8,
            "height": 12,
            "contents": {
                "mode": "Random",
                "direction": "right",
                "stretch": {
                    "width": true
                },
                "spacing": 4,
                "children": [{
                    "percent": 55,
                    "type": "Random",
                    "title": "TreeCoin"
                }, {
                    "percent": 30,
                    "type": "Random",
                    "title": "Nothing"
                }, {
                    "percent": 15,
                    "type": "Random",
                    "title": "EnemyEasy"
                }]
            }
        },
        "TreeLargeCoins": {
            "width": 64,
            "height": 12,
            "contents": {
                "mode": "Certain",
                "direction": "right",
                "children": [{
                    "type": "Random",
                    "title": "Nothing"
                }, {
                    "type": "Random",
                    "title": "TreeCoins",
                    "sizing": {
                        "width": 56
                    }
                }]
            }
        },
        "TreeFancy": {
            "width": 24,
            "height": 8,
            "contents": {
                "mode": "Certain",
                "direction": "top",
                "children": [{
                    "type": "Known",
                    "title": "Tree",
                    "stretch": {
                        "width": true
                    },
                    "arguments": {
                        "macro": "Tree"
                    }
                }, {
                    "type": "Random",
                    "title": "TreeCoins",
                    "stretch": {
                        "width": true
                    }
                }]
            }
        },
        "Coin": {
            "width": 5,
            "height": 7,
            "contents": {
                "mode": "Certain",
                "direction": "right",
                "children": [{
                    "type": "Known",
                    "title": "Coin"
                }]
            }
        },
        "PipeRandom": {
            "width": 16,
            "height": 40,
            "contents": {
                "mode": "Certain",
                "direction": "top",
                "snap": "bottom",
                "children": [{
                    "type": "Random",
                    "title": "Nothing",
                    "sizing": {
                        "height": 0
                    }
                }, {
                    "type": "Known",
                    "title": "Pipe",
                    "sizing": {
                        "height": 0
                    },
                    "arguments": [{
                        "percent": 25,
                        "values": {
                            "macro": "Pipe",
                            "piranha": true,
                            "height": 16
                        }
                    }, {
                        "percent": 5,
                        "values": {
                            "macro": "Pipe",
                            "height": 16
                        }
                    }, {
                        "percent": 25,
                        "values": {
                            "macro": "Pipe",
                            "piranha": true,
                            "height": 24
                        }
                    }, {
                        "percent": 5,
                        "values": {
                            "macro": "Pipe",
                            "height": 24
                        }
                    }, {
                        "percent": 20,
                        "values": {
                            "macro": "Pipe",
                            "piranha": true,
                            "height": 32
                        }
                    }, {
                        "percent": 5,
                        "values": {
                            "macro": "Pipe",
                            "height": 32
                        }
                    }, {
                        "percent": 5,
                        "values": {
                            "macro": "Pipe",
                            "piranha": true,
                            "transport": "Underworld",
                            "height": 32
                        }
                    }, {
                        "percent": 5,
                        "values": {
                            "macro": "Pipe",
                            "transport": "Underworld",
                            "height": 32
                        }
                    }, {
                        "percent": 3,
                        "values": {
                            "macro": "Pipe",
                            "piranha": true,
                            "transport": "Underwater",
                            "height": 32
                        }
                    }, {
                        "percent": 2,
                        "values": {
                            "macro": "Pipe",
                            "transport": "Underwater",
                            "height": 32
                        }
                    }]
                }]
            }
        },
        "PipeRandomTransit": {
            "width": 16,
            "height": 40,
            "contents": {
                "mode": "Certain",
                "direction": "top",
                "snap": "bottom",
                "children": [{
                    "type": "Known",
                    "title": "Pipe",
                    "sizing": {
                        "height": 0
                    },
                    "arguments": [{
                        "percent": 50,
                        "values": {
                            "macro": "Pipe",
                            "piranha": true,
                            "height": 24,
                            "transport": "Underworld"
                        }
                    }, {
                        "percent": 50,
                        "values": {
                            "macro": "Pipe",
                            "piranha": true,
                            "height": 32,
                            "transport": "Underworld"
                        }
                    }]
                }]
            }
        },
        "PipeFloating": {
            "width": 64,
            "height": 80,
            "contents": {
                "mode": "Certain",
                "direction": "top",
                "snap": "bottom",
                "spacing": {
                    "min": 8,
                    "max": 32,
                    "units": 8
                },
                "children": [{
                    "type": "Random",
                    "title": "Nothing"
                }, {
                    "type": "Random",
                    "title": "PipeFloatingContents"
                }]
            }
        },
        "PipeFloatingContents": {
            "width": 64,
            "height": 8,
            "contents": {
                "mode": "Certain",
                "direction": "right",
                "snap": "bottom",
                "children": [{
                    "type": "Random",
                    "title": "Nothing"
                }, {
                    "type": "Random",
                    "title": "PipeFloatingSolid"
                }, {
                    "type": "Random",
                    "title": "PipeFloatingCenter"
                }, {
                    "type": "Random",
                    "title": "PipeFloatingSolid"
                }]
            }
        },
        "PipeFloatingSolid": {
            "width": 8,
            "height": 8,
            "contents": {
                "mode": "Random",
                "direction": "right",
                "children": [{
                    "percent": 65,
                    "type": "Random",
                    "title": "Brick"
                }, {
                    "percent": 35,
                    "type": "Random",
                    "title": "Block"
                }, ]
            }
        },
        "PipeFloatingCenter": {
            "width": 16,
            "height": 8,
            "contents": {
                "mode": "Certain",
                "direction": "top",
                "children": [{
                    "type": "Known",
                    "title": "Stone",
                    "arguments": {
                        "width": 16
                    }
                }, {
                    "type": "Random",
                    "title": "PipeRandomTransit"
                }]
            }
        },
        "Pipe": {
            "width": 16,
            "height": 32,
            "contents": {
                "mode": "Certain",
                "snap": "bottom",
                "children": [{
                    "type": "Known",
                    "title": "Pipe"
                }]
            }
        },
        "PipeHorizontal": {
            "width": 16,
            "height": 16,
            "contents": {
                "mode": "Certain",
                "snap": "bottom",
                "children": [{
                    "type": "Known",
                    "title": "PipeHorizontal"
                }]
            }
        },
        "PipeVertical": {
            "width": 16,
            "height": 16,
            "contents": {
                "mode": "Certain",
                "snap": "bottom",
                "children": [{
                    "type": "Known",
                    "title": "PipeVertical"
                }]
            }
        },
        "PipeCorner": {
            "width": 32,
            "height": 16,
            "contents": {
                "mode": "Certain",
                "snap": "bottom",
                "children": [{
                    "type": "Known",
                    "title": "PipeCorner",
                    "arguments": {
                        "macro": "PipeCorner"
                    }
                }]
            }
        },
        "CannonSmall": {
            "width": 8,
            "height": 8,
            "contents": {
                "mode": "Certain",
                "snap": "bottom",
                "children": [{
                    "type": "Final",
                    "source": "CannonSmall",
                    "title": "Cannon",
                }]
            }
        },
        "CannonMedium": {
            "width": 8,
            "height": 16,
            "contents": {
                "mode": "Certain",
                "children": [{
                    "type": "Final",
                    "source": "CannonMedium",
                    "title": "Cannon",
                    "arguments": {
                        "height": 16
                    }
                }]
            }
        },
        "CannonLarge": {
            "width": 8,
            "height": 24,
            "contents": {
                "mode": "Certain",
                "children": [{
                    "type": "Final",
                    "source": "CannonLarge",
                    "title": "Cannon",
                    "arguments": {
                        "height": 24 
                    }
                }]
            }
        },
        "Floor": {
            "width": 8,
            "height": 8,
            "contents": {
                "mode": "Certain",
                "direction": "right",
                "snap": "top",
                "children": [{
                    "type": "Known",
                    "title": "Floor",
                    "stretch": {
                        "width": true,
                    },
                    "arguments": {
                        "height": "Infinity"
                    }
                }]
            }
        },
        "Springboard": {
            "width": 8,
            "height": 14.5,
            "contents": {
                "mode": "Certain",
                "direction": "right",
                "snap": "bottom",
                "children": [{
                    "type": "Known",
                    "title": "Springboard"
                }]
            }
        },
        "Stone": {
            "width": 8,
            "height": 8,
            "contents": {
                "mode": "Certain",
                "direction": "right",
                "snap": "bottom",
                "children": [{
                    "type": "Known",
                    "title": "Stone"
                }]
            }
        },
        "CastleBlock": {
            "width": 8,
            "height": 8,
            "contents": {
                "mode": "Certain",
                "children": [{
                    "type": "Known",
                    "title": "CastleBlock"
                }]
            }
        },
        "CastleBlockActive": {
            "width": 8,
            "height": 8,
            "contents": {
                "mode": "Certain",
                "direction": "right",
                "children": [{
                    "type": "Known",
                    "title": "CastleBlock",
                    "arguments": [{
                        "percent": 30,
                        "values": {}
                    }, {
                        "percent": 30,
                        "values": {
                            "fireballs": 6
                        }
                    }, {
                        "percent": 30,
                        "values": {
                            "fireballs": 6,
                            "direction": 1
                        }
                    }, {
                        "percent": 5,
                        "values": {
                            "fireballs": 12
                        }
                    }, {
                        "percent": 5,
                        "values": {
                            "fireballs": 12,
                            "direction": 1
                        }
                    }]
                }]
            }
        },
        
        
        /* Scenery
        */
        
        "Bush1": {
            "width": 16,
            "height": 8,
            "contents": {
                "mode": "Certain",
                "snap": "bottom",
                "children": [{
                    "type": "Known",
                    "title": "Bush1"
                }]
            }
        },
        "Bush2": {
            "width": 24,
            "height": 8,
            "contents": {
                "mode": "Certain",
                "snap": "bottom",
                "children": [{
                    "type": "Known",
                    "title": "Bush2"
                }]
            }
        },
        "Bush3": {
            "width": 32,
            "height": 8,
            "contents": {
                "mode": "Certain",
                "snap": "bottom",
                "children": [{
                    "type": "Known",
                    "title": "Bush3"
                }]
            }
        },
        "Cloud1": {
            "width": 16,
            "height": 12,
            "contents": {
                "mode": "Certain",
                "children": [{
                    "type": "Known",
                    "title": "Cloud1"
                }]
            }
        },
        "Cloud2": {
            "width": 24,
            "height": 12,
            "contents": {
                "mode": "Certain",
                "children": [{
                    "type": "Known",
                    "title": "Cloud2"
                }]
            }
        },
        "Cloud3": {
            "width": 32,
            "height": 12,
            "contents": {
                "mode": "Certain",
                "children": [{
                    "type": "Known",
                    "title": "Cloud3"
                }]
            }
        },
        "Fence": {
            "width": 8,
            "height": 8,
            "contents": {
                "mode": "Certain",
                "snap": "bottom",
                "children": [{
                    "type": "Known",
                    "title": "Fence"
                }]
            }
        },
        "HillSmall": {
            "width": 24,
            "height": 9.5,
            "contents": {
                "mode": "Certain",
                "snap": "bottom",
                "children": [{
                    "type": "Known",
                    "title": "HillSmall"
                }]
            }
        },
        "HillLarge": {
            "width": 40,
            "height": 17.5,
            "contents": {
                "mode": "Certain",
                "snap": "bottom",
                "children": [{
                    "type": "Known",
                    "title": "HillLarge"
                }]
            }
        },
        "PlantSmall": {
            "width": 7,
            "height": 15,
            "contents": {
                "mode": "Certain",
                "snap": "bottom",
                "children": [{
                    "type": "Known",
                    "title": "PlantSmall"
                }]
            }
        },
        "PlantLarge": {
            "width": 8,
            "height": 23,
            "contents": {
                "mode": "Certain",
                "snap": "bottom",
                "children": [{
                    "type": "Known",
                    "title": "PlantLarge"
                }]
            }
        },
        "Water": {
            "width": 4,
            "height": 5,
            "contents": {
                "mode": "Certain",
                "snap": "bottom",
                "direction": "right",
                "children": [{
                    "type": "Known",
                    "title": "Water",
                    "stretch": {
                        "width": true
                    },
                    "arguments": {
                        "macro": "Water",
                    }
                }]
            }
        },
        
        
        /* General macros & helpers
        */
        
        "LakituStop": {
            "width": 8,
            "height": 8,
            "contents": {
                "mode": "Certain",
                "children": [{
                    "type": "Known",
                    "title": "LakituStop",
                    "arguments": {
                        "macro": "LakituStop"
                    }
                }]
            }
        },
        "Platform": {
            "width": 16,
            "height": 4,
            "contents": {
                "mode": "Certain",
                "children": [{
                    "type": "Known",
                    "title": "Platform",
                    "stretch": {
                        "width": true
                    }
                }]
            }
        },
        "PlatformGenerator": {
            "width": 24,
            "height": 80,
            "contents": {
                "mode": "Certain",
                "children": [{
                    "type": "Known",
                    "title": "PlatformGenerator",
                    "arguments": [{
                        "percent": 25,
                        "values": {
                            "macro": "PlatformGenerator"
                        }
                    }, {
                        "percent": 25,
                        "values": {
                            "macro": "PlatformGenerator",
                            "width": 24
                        }
                    }, {
                        "percent": 25,
                        "values": {
                            "macro": "PlatformGenerator",
                            "direction": -1,
                            "width": 24
                        }
                    }, {
                        "percent": 25,
                        "values": {
                            "macro": "PlatformGenerator",
                            "direction": -1,
                        }
                    }]
                }]
            }
        },
        "OverworldEnd": {
            "width": 288,
            "height": 80,
            "contents": {
                "mode": "Certain",
                "direction": "top",
                "snap": "left",
                "children": [{
                    "type": "Random",
                    "title": "OverworldEndFloor"
                }, {
                    "type": "Random",
                    "title": "OverworldEndLand"
                }]
            }
        },
        "OverworldEndFloor": {
            "width": 288,
            "height": 8,
            "contents": {
                "mode": "Certain",
                "children": [{
                    "type": "Random", 
                    "title": "Floor"
                }]
            }
        },
        "OverworldEndLand": {
            "width": 288,
            "height": 64,
            "contents": {
                "mode": "Certain",
                "direction": "right",
                "snap": "bottom",
                "children": [{
                    "type": "Random",
                    "title": "LakituStop"
                }, {
                    "type": "Random", 
                    "title": "RampUpLarge"
                }, {
                    "type": "Random",
                    "title": "StoneTowerLarge"
                }, {
                    "type": "Random",
                    "title": "Nothing",
                    "sizing": {
                        "width": 64
                    }
                }, {
                    "type": "Random",
                    "title": "OverworldEndOutsideCastle"
                }, {
                    "type": "Random",
                    "title": "ScrollBlocker"
                }]
            }
        },
        "OverworldEndOutsideCastle": {
            "width": 144,
            "height": 80,
            "contents": {
                "mode": "Multiple",
                "direction": "right",
                "spacing": -112,
                "children": [{
                    "type": "Random",
                    "title": "EndOutsideCastle"
                }, {
                    "type": "Random",
                    "title": "OverworldEndOutsideCastleScenery"
                }]
            }
        },
        "OverworldEndOutsideCastleScenery": {
            "width": 144,
            "height": 80,
            "contents": {
                "mode": "Multiple",
                "direction": "top",
                "spacing": -8,
                "children": [{
                    "type": "Random",
                    "title": "Nothing",
                    "sizing": {
                        "height": 0
                    }
                }, {
                    "type": "Random",
                    "title": "OverworldScenery"
                }]
            }
        },
        "EndOutsideCastle": {
            "width": 144,
            "height": 80,
            "contents": {
                "mode": "Certain",
                "direction": "top",
                "children": [{
                    "type": "Known",
                    "title": "EndOutsideCastle",
                    "arguments": {
                        "macro": "EndOutsideCastle",
                        "large": true,
                        "transport": {
                            "map": "Random",
                            "location": "Castle"
                        }
                    },
                    "sizing": {
                        "height": 0
                    }
                }]
            }
        },
        "UnderworldEndOutsideCastle": {
            "width": 144,
            "Height": 88,
            "contents": {
                "mode": "Certain",
                "direction": "top",
                "children": [{
                    "type": "Random",
                    "title": "EndOutsideCastle"
                }]
            }
        },
        "StartInsideCastle": {
            "width": 112,
            "height": 8,
            "contents": {
                "mode": "Certain",
                "direction": "top",
                "snap": "bottom",
                "children": [{
                    "type": "Known",
                    "title": "StartInsideCastle",
                    "arguments": {
                        "macro": "StartInsideCastle",
                        "width": 112
                    }
                }]
            }
        },
        "EndInsideCastle": {
            "width": 248,
            "height": 80,
            "contents": {
                "mode": "Certain",
                "direction": "top",
                "children": [{
                    "type": "Known",
                    "title": "EndInsideCastle",
                    "arguments": {
                        "macro": "EndInsideCastle",
                        "spawnType": "Bowser",
                        "npc": "Peach",
                        "transport": {
                            "map": "Random",
                            "location": "Overworld"
                        },
                        "topScrollEnabler": true
                    },
                    "sizing": {
                        "height": 8
                    }
                }]
            }
        },
        "CheepsStart": {
            "width": 0,
            "height": 0,
            "contents": {
                "mode": "Certain",
                "children": [{
                    "type": "Known",
                    "title": "CheepsStart",
                    "arguments": {
                        "macro": "CheepsStart"
                    }
                }]
            }
        },
        "CheepsStop": {
            "width": 0,
            "height": 0,
            "contents": {
                "mode": "Certain",
                "children": [{
                    "type": "Known",
                    "title": "CheepsStop",
                    "arguments": {
                        "macro": "CheepsStop"
                    }
                }]
            }
        },
        "ScrollEnabler": {
            "width": 0,
            "height": 0,
            "contents": {
                "mode": "Certain",
                "direction": "right",
                "children": [{
                    "type": "Known",
                    "title": "ScrollEnabler"
                }]
            }
        },
        "ScrollBlocker": {
            "width": 0,
            "height": 0,
            "contents": {
                "mode": "Certain",
                "direction": "right",
                "children": [{
                    "type": "Known",
                    "title": "ScrollBlocker"
                }]
            }
        },
        
        
        /* Misc.
        */
        
        "Nothing": {
            "width": 8,
            "height": 8,
            "contents": {
                "mode": "Certain",
                "children": []
            }
        }
    }
};
