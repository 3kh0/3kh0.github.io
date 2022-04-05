FullScreenMario.FullScreenMario.settings.maps.library["5-1"] = {
    "name": "5-1",
    "locations": [
        { "entry": "Plain" },
        { "entry": "PipeVertical" },
        { "area": 1 }
    ],
    "areas": [
        {
            "setting": "Overworld Alt",
            "blockBoundaries": true,
            "creation": [
                { "macro": "Pattern", "pattern": "BackFence", "x": -384, "repeat": 6 },
                { "macro": "Floor", "width": 392 },
                { "macro": "CastleLarge", "x": -16 },
                { "thing": "Koopa", "x": 128, "y": 12 },
                { "macro": "Fill", "thing": "Goomba", "x": 152, "y": 8, "xnum": 3, "xwidth": 21 },
                { "macro": "Fill", "thing": "Goomba", "x": 240, "y": 8, "xnum": 3, "xwidth": 21 },
                { "macro": "Fill", "thing": "Goomba", "x": 328, "y": 12, "xnum": 2, "xwidth": 21 },
                { "macro": "Pipe", "x": 352, "height": 24, "piranha": true },
                { "macro": "Floor", "x": 408, "width": 328 },
                { "macro": "Pipe", "x": 408, "height": 24, "piranha": true },
                { "thing": "Koopa", "x": 488, "y": 32, "jumping": true },
                { "thing": "Goomba", "x": 520, "y": 8, "xnum": 3, "xwidth": 12 },
                { "thing": "Goomba", "x": 608, "y": 8, "xnum": 3, "xwidth": 12 },
                { "thing": "Koopa", "x": 696, "y": 16, "jumping": true },
                { "thing": "Stone", "x": 712, "y": 24, "height": 24 },
                { "thing": "Stone", "x": 712, "y": 32, "width": 40 },
                { "macro": "Fill", "thing": "Brick", "x": 720, "y": 64, "xnum": 2, "xwidth": 16 },
                { "thing": "Brick", "x": 728, "y": 64, "contents": "Star" },
                { "macro": "Floor", "x": 768, "width": 324 },
                { "macro": "Fill", "thing": "Goomba", "x": 824, "y": 8, "xnum": 3, "xwidth": 12 },
                { "thing": "Cannon", "x": 888, "y": 16, "height": 16 },
                { "macro": "Floor", "x": 928, "width": 288 },
                { "thing": "Stone", "x": 928, "y": 24, "height": 24 },
                { "macro": "Fill", "thing": "Goomba", "x": 968, "y": 8, "xnum": 3, "xwidth": 12 },
                { "thing": "Koopa", "x": 1016, "y": 12 },
                { "macro": "Fill", "thing": "Goomba", "x": 1080, "y": 8, "xnum": 3, "xwidth": 12 },
                { "macro": "Fill", "thing": "Koopa", "x": 1152, "y": 12, "xnum": 2, "xwidth": 12 },
                { "thing": "Stone", "x": 1176, "y": 32, "width": 32 },
                { "thing": "Block", "x": 1184, "y": 32, "contents": "Mushroom1Up", "hidden": true },
                { "macro": "Fill", "thing": "Brick", "x": 1192, "y": 32, "xnum": 2 },
                { "macro": "Floor", "x": 1240, "width": 552 },
                { "thing": "Stone", "x": 1248, "y": 32, "width": 16 },
                { "macro": "Pipe", "x": 1248, "y": 32, "height": 16, "piranha": true, "transport": 2 },
                { "thing": "Cannon", "x": 1272, "y": 16, "height": 16 },
                { "macro": "Pipe", "x": 1304, "height": 16, "piranha": true, "entrance": 1 },
                { "thing": "Cannon", "x": 1360, "y": 16, "height": 16 },
                { "thing": "Koopa", "x": 1424, "y": 12, "jumping": true },
                { "thing": "Stone", "x": 1456, "y": 8 },
                { "thing": "Brick", "x": 1456, "y": 44 },
                { "thing": "Stone", "x": 1464, "y": 16, "height": 16 },
                { "thing": "Stone", "x": 1472, "y": 24, "height": 24 },
                { "thing": "Stone", "x": 1480, "y": 32, "height": 32 },
                { "thing": "Stone", "x": 1488, "y": 40, "height": 40 },
                { "thing": "Stone", "x": 1512, "y": 64, "width": 16, "height": 48 },
                { "macro": "EndOutsideCastle", "x": 1592, "transport": { "map": "5-2" } }
            ]
        }, {
            "setting": "Underworld",
            "blockBoundaries": true,
            "creation": [
                { "macro": "Floor", "width": 136 },
                { "macro": "Ceiling", "x": 32, "width": 56 },
                { "macro": "Fill", "thing": "Brick", "y": 8, "ynum": 11 },
                { "macro": "Fill", "thing": "Brick", "x": 32, "y": 48, "xnum": 7 },
                { "thing": "Brick", "x": 32, "y": 56 },
                { "macro": "Fill", "thing": "Coin", "x": 41, "y": 55, "xnum": 5, "ynum": 2, "xwidth": 8, "yheight": 8 },
                { "macro": "Fill", "thing": "Brick", "x": 80, "y": 56, "ynum": 4 },
                { "thing": "Brick", "x": 88, "y": 56, "xnum": 2 },
                { "thing": "Brick", "x": 112, "y": 48, "contents": "Coin" },
                { "thing": "PipeHorizontal", "x": 104, "y": 16, "transport": 1 },
                { "thing": "PipeVertical", "x": 120, "y": 88, "height": 88 }
            ]
        }
    ]
};