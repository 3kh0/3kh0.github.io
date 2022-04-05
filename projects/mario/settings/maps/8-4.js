FullScreenMario.FullScreenMario.settings.maps.library["8-4"] = {
    "name": "8-4",
    "locations": [
        { "entry": "Castle" },
        { "entry": "PipeVertical" },  // 1: Pipe 1
        { "area": 1, "entry": "PipeVertical" }, // 2: Past B 
        { "area": 2, "entry": "PipeVertical" }, // 3: Past C
        { "area": 3, "entry": "PipeVertical", "xloc": 0 }, // 4: Underwater
        { "area": 4, "entry": "PipeVertical" } // 5: Past E
    ],
    "areas": [
        {
            "setting": "Castle",
            "creation": [
                { "macro": "StartInsideCastle" },
                { "thing": "Stone", "y": 88, "width": 256 },
                { "macro": "Floor", "x": 40, "y": 24 },
                { "macro": "Water", "x": 48, "width": 40 },
                { "macro": "Floor", "x": 88, "width": 64 },
                { "macro": "Pipe", "x": 152, "y": 16, "height": "Infinity", "piranha": true, "entrance": 1 },
                { "macro": "Section", "x": 168 }
            ],
            "sections": [
                {
                    "stretch": {
                        "width": 8,
                        "creation": [
                            { "macro": "Floor" },
                            { "thing": "Stone", "y": 88 },
                        ]
                    },
                    "after": {
                        "width": 424,
                        "creation": [
                            { "macro": "Pipe", "y": 16, "height": "Infinity", "piranha": true, "transport": 1 },
                            { "thing": "Stone", "y": 88, "width": 424 },
                            { "macro": "Floor", "x": 16, "width": 72 },
                            { "macro": "Fill", "thing": "Goomba", "x": 36, "y": 8, "xnum": 3, "xwidth": 12 },
                            { "macro": "Floor", "x": 88, "y": 24, "width": 32 },
                            { "macro": "Water", "x": 120, "width": 136 },
                            { "thing": "Platform", "x": 152, "width": 16, "sliding": true, "begin": 140, "end": 232, "speed": 2 },
                            { "macro": "Floor", "x": 256, "y": 24, "width": 48 },
                            { "thing": "Stone", "x": 264, "y": 56, "width": 32 },
                            { "macro": "Pipe", "x": 304, "y": 40, "height": "Infinity", "piranha": true, "transport": 2 },
                            { "macro": "Floor", "x": 320, "y": 24, "width": 56 },
                            { "macro": "Pipe", "x": 376, "y": 48, "height": "Infinity", "piranha": true },
                            { "macro": "Floor", "x": 392, "y": 24, "width": 32 },
                            { "macro": "Section", "x": 424 }
                        ]
                    }
                },
            ]
        }, {
            "setting": "Castle",
            "creation": [
                { "macro": "Pipe", "y": 16, "height": "Infinity", "piranha": true, "entrance": 2 },
                { "thing": "Stone", "y": 88, "width": 16 },
                { "macro": "Section", "x": 16 }
            ],
            "sections": [
                {
                    "before": {
                        "width": 328,
                        "creation": [
                            { "thing": "Stone", "y": 88, "width": 328 },
                            { "macro": "Floor", "width": 40 },
                            { "macro": "Pipe", "x": 40, "y": 24, "height": "Infinity", "piranha": true },
                            { "macro": "Floor", "x": 56, "width": 64 },
                            { "macro": "Fill", "thing": "Beetle", "x": 88, "y": 8.5, "xnum": 2, "xwidth": 16 },
                            { "macro": "Pipe", "x": 120, "y": 16, "height": "Infinity", "piranha": true, "transport": 1 },
                            { "macro": "Floor", "x": 136, "width": 64 },
                            { "thing": "Koopa", "x": 176, "y": 32, "jumping": true },
                            { "thing": "Koopa", "x": 192, "y": 24, "jumping": true },
                            { "macro": "Pipe", "x": 200, "y": 24, "height": "Infinity", "piranha": true },
                            { "macro": "Water", "x": 216, "width": 24 },
                            { "macro": "Floor", "x": 240, "width": 88 },
                            { "thing": "Block", "x": 264, "y": 32, "hidden": true },
                            { "thing": "Stone", "x": 280, "y": 32, "width": 16 },
                            { "macro": "Pipe", "x": 280, "y": 32, "height": 24, "transport": 3 },
                            { "thing": "Koopa", "x": 304, "y": 28, "jumping": true },
                            { "thing": "Koopa", "x": 320, "y": 36, "jumping": true },
                        ]
                    },
                    "stretch": {
                        "width": 8,
                        "creation": [
                            { "macro": "Floor" },
                            { "thing": "Stone", "y": 88 },
                        ]
                    },
                    "after": {
                        "width": 16,
                        "creation": [
                            { "macro": "Pipe", "y": 16, "height": "Infinity", "piranha": true },
                            { "thing": "Stone", "y": 88, "width": 16 },
                            { "macro": "Section", "x": 16 }
                        ]
                    }
                }
            ]
        }, {
            "setting": "Castle",
            "creation": [
                { "macro": "Pipe", "y": 16, "height": "Infinity", "piranha": true, "entrance": 3 },
                { "thing": "Stone", "y": 88, "width": 16 },
                { "macro": "Section", "x": 16 }
            ],
            "sections": [
                {
                    "before": {
                        "width": 264,
                        "creation": [
                            { "thing": "Stone", "y": 88, "width": 264 },
                            { "macro": "Floor" },
                            { "macro": "Floor", "x": 8, "y": 24, "width": 48 },
                            { "macro": "Pipe", "x": 56, "y": 40, "height": "Infinity", "piranha": true },
                            { "macro": "CheepsStart", "x": 72 },
                            { "macro": "Floor", "x": 72, "y": 24, "width": 48 },
                            { "macro": "Pipe", "x": 120, "y": 48, "height": "Infinity", "piranha": true, "transport": 1 },
                            { "macro": "Floor", "x": 136, "y": 24, "width": 48 },
                            { "macro": "Water", "x": 184, "width": 32 },
                            { "macro": "Floor", "x": 216, "y": 24, "width": 32 },
                            { "macro": "Pipe", "x": 248, "y": 40, "height": "Infinity", "piranha": true, "transport": 4 },
                            { "macro": "CheepsStop", "x": 264 },
                        ]
                    },
                    "stretch": {
                        "width": 8,
                        "creation": [
                            { "macro": "Floor", "y": 24 },
                            { "thing": "Stone", "y": 88 }
                        ]
                    },
                    "after": {
                        "width": 40,
                        "creation": [
                            { "macro": "Floor", "width": 24 },
                            { "thing": "Stone", "y": 88, "width": 40 },
                            { "macro": "Pipe", "x": 24, "y": 16, "height": "Infinity", "piranha": true },
                            { "macro": "Section", "x": 40 }
                        ]
                    }
                }
            ]
        }, {
            "setting": "Underwater Castle",
            "blockBoundaries": true,
            "underwater": true,
            "creation": [
                { "macro": "Floor", "y": 88, "width": 16 },
                { "macro": "Floor", "x": 16 },
                { "macro": "Pipe", "x": 24, "y": 16, "height": "Infinity", "entrance": 4 },
                { "macro": "Floor", "x": 40, "width": 536 },
                { "thing": "Stone", "x": 48, "y": 24, "width": 40, "height": 24 },
                { "thing": "Stone", "x": 48, "y": 80, "width": 40, "height": 16 },
                { "thing": "Stone", "x": 48, "y": 88, "width": 528 },
                { "thing": "Stone", "x": 88, "y": 32, "width": 56, "height": 32 },
                { "thing": "Stone", "x": 88, "y": 80, "width": 56, "height": 24 },
                { "thing": "CastleBlock", "x": 160, "y": 46, "fireballs": 6, "hidden": true },
                { "thing": "Blooper", "x": 224, "y": 16 },
                { "thing": "CastleBlock", "x": 248, "y": 22, "fireballs": 6, "hidden": true },
                { "thing": "Stone", "x": 312, "y": 24, "width": 24, "height": 24 },
                { "thing": "Stone", "x": 312, "y": 80, "width": 24, "height": 24 },
                { "thing": "CastleBlock", "x": 320, "y": 54, "fireballs": 6, "hidden": true },
                { "thing": "Blooper", "x": 408, "y": 24 },
                { "thing": "Blooper", "x": 424, "y": 56 },
                { "thing": "CastleBlock", "x": 446, "y": 38, "fireballs": 6, "hidden": true },
                { "thing": "CastleBlock", "x": 512, "y": 44, "fireballs": 6, "hidden": true },
                { "thing": "Stone", "x": 536, "y": 32, "width": 40, "height": 32 },
                { "thing": "Stone", "x": 536, "y": 80, "width": 40, "height": 24 },
                { "thing": "PipeHorizontal", "x": 544, "y": 48, "transport": 5 },
                { "thing": "Stone", "x": 552, "y": 56, "width": 24, "height": 24 }
            ]
        }, {
            "setting": "Castle",
            "blockBoundaries": true,
            "creation": [
                { "macro": "Pipe", "y": 16, "height": "Infinity", "piranha": true, "entrance": 5 },
                { "thing": "Stone", "y": 88, "width": 232 },
                { "macro": "Floor", "x": 16, "width": 40 },
                { "macro": "Pipe", "x": 56, "y": 16, "height": "Infinity", "piranha": true, "transport": 1 },
                { "macro": "Floor", "x": 72, "width": 72 },
                { "thing": "HammerBro", "x": 112, "y": 12 },
                { "macro": "Water", "x": 128, "width": 56 },
                { "thing": "Podoboo", "x": 160, "y": -32 },
                { "macro": "Floor", "x": 184, "y": 24, "width": 48 },
                { "thing": "Stone", "x": 184, "y": 80, "width": 48, "height": 16 },
                { "macro": "EndInsideCastle", "x": 232, "spawnType": "Bowser", "throwing": true, "npc": "Peach", "transport": { "map": "1-1" } }
            ]
        }
    ]
};