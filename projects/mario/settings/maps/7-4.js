FullScreenMario.FullScreenMario.settings.maps.library["7-4"] = {
    "name": "7-4",
    "locations": [
        { "entry": "Castle" }
    ],
    "areas": [
        {
            "setting": "Castle",
            "creation": [
                { "macro": "StartInsideCastle" },
                { "thing": "Stone", "y": 88, "width": 128, "height": 24 },
                { "macro": "Floor", "x": 40, "y": 24, "width": 88 },
                { "macro": "Water", "x": 128, "width": 88 },
                { "thing": "Stone", "x": 128, "y": 88, "width": 128 },
                { "thing": "Platform", "x": 144, "y": 48, "width": 16, "falling": true },
                { "thing": "Podoboo", "x": 160, "y": -32 },
                { "thing": "Platform", "x": 176, "y": 40, "width": 16, "falling": true },
                { "macro": "Floor", "x": 216, "y": 24, "width": 40 },
                { "thing": "Stone", "x": 224, "y": 80, "width": 32, "height": 16 },
                { "macro": "Section", "x": 256 }
            ],
            "sections": [
                {
                    "before": {
                        "width": 48,
                        "creation": [
                            { "macro": "Floor", "width": 48 },
                            { "thing": "Stone", "y": 88, "width": 48 },
                            { "thing": "Stone", "x": 16, "y": 32, "width": 32 },
                            { "thing": "Stone", "x": 32, "y": 40, "width": 16 },
                            { "thing": "Stone", "x": 40, "y": 48, "width": 8 },
                        ]
                    },
                    "stretch": {
                        "width": 8,
                        "creation": [
                            { "macro": "Floor" },
                            { "macro": "SectionPass", "y": 24, "height": 24 },
                            { "thing": "Stone", "y": 56, "height": 32 },
                            { "macro": "SectionFail", "y": 80, "height": 24 },
                            { "thing": "Stone", "y": 88 }
                        ]
                    },
                    "after": {
                        "width": 24,
                        "creation": [
                            { "macro": "Floor", "width": 24 },
                            { "thing": "Stone", "y": 88, "width": 24 },
                            { "macro": "Section", "x": 24, "section": 1 }
                        ]
                    }
                },
                {
                    "before": {
                        "width": 8,
                        "creation": [
                            { "macro": "Floor" },
                            { "thing": "Stone", "y": 24 },
                            { "thing": "Stone", "y": 88 }
                        ]
                    },
                    "stretch": {
                        "width": 8,
                        "creation": [
                            { "macro": "Floor" },
                            { "macro": "SectionFail", "y": 16, "height": 16 },
                            { "thing": "Stone", "y": 24 },
                            { "macro": "SectionPass", "y": 48, "height": 24 },
                            { "thing": "Stone", "y": 56 },
                            { "macro": "SectionFail", "y": 80, "height": 24 },
                            { "thing": "Stone", "y": 88 }
                        ]
                    },
                    "after": {
                        "width": 32,
                        "creation": [
                            { "macro": "Floor", "width": 32 },
                            { "thing": "Stone", "y": 24 },
                            { "thing": "Stone", "y": 88, "width": 32 },
                            { "macro": "Section", "x": 32, "section": 2 }
                        ]
                    }
                },
                {
                    "stretch": {
                        "width": 8,
                        "creation": [
                            { "macro": "Floor" },
                            { "macro": "SectionFail", "y": 24, "height": 24 },
                            { "thing": "Stone", "y": 56, "height": 32 },
                            { "macro": "SectionPass", "y": 80, "height": 24 },
                            { "thing": "Stone", "y": 88 }
                        ]
                    },
                    "after": {
                        "width": 80,
                        "creation": [
                            { "macro": "Floor", "width": 80 },
                            { "thing": "Stone", "y": 40 },
                            { "thing": "Stone", "y": 48, "width": 16 },
                            { "thing": "Stone", "y": 56, "width": 32 },
                            { "thing": "Stone", "y": 88, "width": 80 },
                            { "thing": "Stone", "x": 40, "y": 24, "width": 24, "height": 24 },
                            { "macro": "SectionDecider", "x": 80, "pass": 3, "fail": 0 }
                        ]
                    }
                },
                {
                    "before": {
                        "width": 136,
                        "creation": [
                            { "macro": "Floor", "y": 24, "width": 24 },
                            { "thing": "Stone", "y": 88, "width": 136 },
                            { "macro": "Floor", "x": 24, "width": 32 },
                            { "thing": "Stone", "x": 48, "y": 56, "width": 16 },
                            { "macro": "Water", "x": 56, "width": 24 },
                            { "thing": "Stone", "x": 72, "y": 56, "width": 24 },
                            { "macro": "Floor", "x": 80 },
                            { "thing": "CastleBlock", "x": 80, "y": 48, "fireballs": 6, "direction": 1 },
                            { "macro": "Water", "x": 88, "width": 24 },
                            { "thing": "Stone", "x": 104, "y": 56, "width": 32 },
                            { "macro": "Floor", "x": 112, "width": 24 }
                        ]
                    },
                    "stretch": {
                        "width": 8,
                        "creation": [
                            { "macro": "SectionFail", "y": 24, "height": 24 },
                            { "macro": "SectionPass", "y": 80, "height": 24 },
                            { "macro": "Floor" },
                            { "thing": "Stone", "y": 56, "height": 32 },
                            { "thing": "Stone", "y": 88 }
                        ]
                    },
                    "after": {
                        "width": 80,
                        "creation": [
                            { "macro": "Section", "section": 4 }
                        ]
                    }
                },
                {
                    "before": {
                        "width": 64,
                        "creation": [
                            { "macro": "Floor", "width": 64 },
                            { "thing": "Stone", "y": 88, "width": 64 },
                            { "thing": "Stone", "x": 16, "y": 56, "width": 24 },
                            { "thing": "Stone", "x": 24, "y": 24, "width": 24 },
                            { "thing": "Stone", "x": 56, "y": 56 }
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
                        "width": 64,
                        "creation": [
                            { "macro": "Floor", "width": 64 },
                            { "thing": "Stone", "y": 24 },
                            { "thing": "Stone", "y": 88, "width": 64 },
                            { "thing": "Stone", "x": 24, "y": 56, "width": 24 },
                            { "thing": "Stone", "x": 32, "y": 24, "width": 24 },
                            { "macro": "Section", "x": 64, "section": 5 }
                        ]
                    }
                },
                {
                    "before": {
                        "width": 32,
                        "creation": [
                            { "macro": "Floor", "width": 16 },
                            { "thing": "Stone", "y": 56, "height": 32 },
                            { "thing": "Stone", "y": 88, "width": 32 },
                            { "thing": "Stone", "x": 8, "y": 56, "width": 24 },
                            { "macro": "Floor", "x": 16, "y": 8 },
                            { "macro": "Floor", "x": 24, "y": 16 },
                        ]
                    },
                    "stretch": {
                        "width": 8,
                        "creation": [
                            { "macro": "Floor", "y": 24 },
                            { "macro": "SectionPass", "y": 80, "height": 24 },
                            { "thing": "Stone", "y": 56 },
                            { "macro": "SectionFail", "y": 48, "height": 24 },
                            { "thing": "Stone", "y": 88 }
                        ]
                    },
                    "after": {
                        "width": 56,
                        "creation": [
                            { "macro": "Floor", "y": 24, "width": 56 },
                            { "thing": "Stone", "y": 88, "width": 56 },
                            { "macro": "SectionDecider", "x": 56, "y": 80, "height": 56, "pass": 6, "fail": 3 },
                        ]
                    }
                },
                {
                    "before": {
                        "width": 272,
                        "creation": [
                            { "macro": "Floor", "width": 24 },
                            { "thing": "Stone", "y": 88, "width": 272 },
                            { "macro": "Floor", "x": 24, "y": 24, "width": 24 },
                            { "macro": "Floor", "x": 48, "width": 16 },
                            { "macro": "Floor", "x": 64, "y": 24, "width": 64 },
                            { "macro": "Floor", "x": 128, "width": 16 },
                            { "macro": "Floor", "x": 144, "y": 24, "width": 16 },
                            { "macro": "Floor", "x": 160, "width": 16 },
                            { "macro": "Floor", "x": 176, "y": 24, "width": 16 },
                            { "macro": "Floor", "x": 192, "width": 16 },
                            { "macro": "Floor", "x": 208, "y": 24, "width": 64 },
                            { "macro": "EndInsideCastle", "x": 272, "spawnType": "HammerBro", "throwing": false, "transport": { "map": "8-1" } }
                        ]
                    }
                }
            ]
        }
    ]
};