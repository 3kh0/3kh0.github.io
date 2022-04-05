FullScreenMario.FullScreenMario.settings.maps.library["4-4"] = {
    "name": "4-4",
    "time": 300,
    "locations": [
        { "entry": "Castle" }
    ],
    "areas": [
        {
            "setting": "Castle",
            "creation": [
                { "macro": "StartInsideCastle", "width": 48 },
                { "thing": "Stone", "y": 88, "width": 48, "height": 24 },
                { "macro": "Floor", "x": 48, "y": 24 },
                { "thing": "Stone", "x": 48, "y": 88, "width": 80 },
                { "macro": "Water", "x": 56, "width": 16 },
                { "macro": "Floor", "x": 72, "y": 24, "width": 16 },
                { "macro": "Water", "x": 88, "width": 16 },
                { "macro": "Floor", "x": 104, "y": 24, "width": 24 },
                { "macro": "Section", "x": 128, "section": 0 }
            ],
            "sections": [
                {
                    "before": {
                        "width": 400,
                        "creation": [
                            { "macro": "Floor", "width": 400 },
                            { "thing": "Stone", "y": 88, "width": 400 },
                            { "thing": "Stone", "x": 16, "y": 56, "width": 48, "height": 32 },
                            { "macro": "Fill", "thing": "Stone", "x": 72, "y": 56, "xnum": 5, "xwidth": 16, "height": 32 },
                            { "thing": "Stone", "x": 152, "y": 56, "width": 24, "height": 32 },
                            { "thing": "Stone", "x": 176, "y": 56, "width": 48 },
                            { "macro": "Pipe", "x": 192, "height": 24, "piranha": true },
                            { "thing": "Stone", "x": 224, "y": 56, "width": 136, "height": 32 },
                            { "thing": "CastleBlock", "x": 296, "y": 56, "fireballs": 6, "hidden": true },
                            { "thing": "CastleBlock", "x": 352, "y": 32, "fireballs": 6, "hidden": true },
                            { "macro": "SectionFail", "x": 384, "y": 24, "width": 40, "height": 24 },
                            { "macro": "SectionPass", "x": 394, "y": 80, "width": 40, "height": 24 },
                        ]
                    },
                    "stretch": {
                        "width": 8,
                        "creation": [
                            { "macro": "Floor" },
                            { "thing": "Stone", "y": 56, "height": 32 },
                            { "thing": "Stone", "y": 88 }
                        ]
                    },
                    "after": {
                        "width": 40,
                        "creation": [
                            { "macro": "Floor", "width": 40 },
                            { "thing": "Stone", "y": 88, "width": 40 },
                            { "thing": "Stone", "x": 16, "y": 80, "width": 24, "height": 24 },
                            { "thing": "Stone", "x": 16, "y": 24, "width": 24, "height": 24 },
                            { "macro": "SectionDecider", "x": 40, "pass": 1, "fail": 0 }
                        ]
                    }
                },
                {
                    "before": {
                        "width": 320,
                        "creation": [
                            { "macro": "Floor", "width": 64 },
                            { "thing": "Stone", "y": 88, "width": 336 },
                            { "thing": "Stone", "x": 48, "y": 24, "width": 16 },
                            { "macro": "Water", "x": 64, "width": 16 },
                            { "thing": "Stone", "x": 72, "y": 40, "width": 16 },
                            { "macro": "Floor", "x": 80, "y": 16 },
                            { "thing": "Stone", "x": 80, "y": 24, "width": 40 },
                            { "macro": "Water", "x": 88, "width": 32 },
                            { "thing": "Stone", "x": 104, "y": 48 },
                            { "thing": "Stone", "x": 112, "y": 40, "height": 16 },
                            { "macro": "Floor", "x": 120, "width": 216 },
                            { "thing": "Stone", "x": 120, "y": 56, "height": 16 },
                            { "thing": "Stone", "x": 128, "y": 24, "width": 208 },
                            { "thing": "Stone", "x": 128, "y": 56, "width": 16 },
                            { "thing": "Stone", "x": 160, "y": 56, "width": 32 },
                            { "thing": "Stone", "x": 200, "y": 48, "height": 24 },
                            { "thing": "Stone", "x": 200, "y": 56, "width": 24 },
                            { "thing": "Stone", "x": 240, "y": 56, "width": 96 },
                            { "thing": "CastleBlock", "x": 280, "y": 56, "fireballs": 6, "hidden": true },
                            { "thing": "CastleBlock", "x": 328, "y": 24, "fireballs": 6, "hidden": true },
                            { "macro": "SectionPass", "x": 360, "y": 16, "width": 40, "height": 16 },
                            { "macro": "SectionFail", "x": 360, "y": 48, "width": 40, "height": 24 },
                            { "macro": "SectionFail", "x": 360, "y": 80, "width": 40, "height": 24 }
                        ]
                    },
                    "stretch": {
                        "width": 8,
                        "creation": [
                            { "macro": "Floor" },
                            { "thing": "Stone", "y": 24 },
                            { "thing": "Stone", "y": 56 },
                            { "thing": "Stone", "y": 88 }
                        ]
                    },
                    "after": {
                        "width": 136,
                        "creation": [
                            { "macro": "Floor", "width": 80 },
                            { "thing": "Stone", "y": 64, "height": 40 },
                            { "thing": "Stone", "y": 88 },
                            { "thing": "Stone", "x": 8, "y": 88, "width": 16, "height": 24 },
                            { "macro": "Floor", "x": 72, "y": 24, "width": 32 },
                            { "thing": "Stone", "x": 72, "y": 88, "width": 64 },
                            { "macro": "Floor", "x": 96, "width": 32 },
                            { "macro": "Floor", "x": 120, "y": 24, "width": 16 },
                            { "macro": "SectionDecider", "x": 136, "pass": 2 }
                        ]
                    }
                },
                {
                    "before": {
                        "width": 256,
                        "creation": [
                            { "macro": "EndInsideCastle", "spawnType": "SpinyEgg", "transport": { "map": "5-1" } }
                        ]
                    }
                }
            ]
        }
    ]
};