FullScreenMario.FullScreenMario.settings.maps.library["4-1"] = {
    "name": "4-1",
    "locations": [
        { "entry": "Plain" },
        { "entry": "PipeVertical" },
        { "area": 1 }
    ],
    "areas": [
        {
            "setting": "Overworld",
            "blockBoundaries": true,
            "creation": [
                { "macro": "Floor", "width": 256 },
                { "macro": "CastleLarge", "x": -16 },
                { "macro": "Pattern", "pattern": "BackRegular", "repeat": 5 },
                { "macro": "Pipe", "x": 168, "height": 24, "piranha": true },
                { "thing": "Block", "x": 200, "y": 32, "contents": "Mushroom" },
                { "thing": "Block", "x": 200, "y": 64 },
                { "thing": "Lakitu", "x": 212, "y": 84 },
                { "macro": "Floor", "x": 272, "width": 352 },
                { "macro": "Fill", "thing": "Coin", "x": 329, "y": 31, "xnum": 2, "xwidth": 24 },
                { "macro": "Fill", "thing": "Coin", "x": 337, "y": 39, "xnum": 2, "xwidth": 8 },
                { "macro": "Fill", "thing": "Block", "x": 512, "y": 32, "xnum": 2, "ynum": 2, "xwidth": 24, "yheight": 32 },
                { "macro": "Floor", "x": 656, "width": 536 },
                { "macro": "Fill", "thing": "Block", "x": 720, "y": 32, "xnum": 4 },
                { "thing": "Block", "x": 736, "y": 64, "contents": "Mushroom1Up", "hidden": true },
                { "thing": "Stone", "x": 824, "y": 24, "height": 24 },
                { "macro": "Fill", "thing": "Coin", "x": 841, "y": 55, "xnum": 4, "xwidth": 8 },
                { "macro": "Pipe", "x": 928, "height": 32, "piranha": true },
                { "macro": "Fill", "thing": "Coin", "x": 953, "y": 55, "xnum": 4, "xwidth": 8 },
                { "macro": "Pipe", "x": 1056, "height": 32, "piranha": true, "transport": 2 },
                { "macro": "Fill", "thing": "Coin", "x": 1081, "y": 55, "xnum": 4, "xwidth": 8 },
                { "macro": "Fill", "thing": "Block", "x": 1168, "y": 32, "xnum": 2 },
                { "thing": "Block", "x": 1184, "y": 32, "contents": "Mushroom" },
                { "macro": "Fill", "thing": "Block", "x": 1184, "y": 64, "xnum": 4 },
                { "macro": "Fill", "thing": "Brick", "x": 1192, "y": 32, "xnum": 2 },
                { "macro": "Fill", "thing": "Block", "x": 1208, "y": 32, "xnum": 3 },
                { "macro": "Floor", "x": 1208, "width": 184 },
                { "macro": "Pipe", "x": 1304, "height": 16, "piranha": true, "entrance": 1 },
                { "macro": "Floor", "x": 1416, "width": 24 },
                { "macro": "Floor", "x": 1456, "width": 64 },
                { "thing": "Stone", "x": 1512, "y": 24, "height": 24 },
                { "macro": "Floor", "x": 1536, "width": 384 },
                { "macro": "LakituStop", "x": 1664 },
                { "thing": "Stone", "x": 1664, "y": 8 },
                { "thing": "Stone", "x": 1672, "y": 16, "height": 16 },
                { "thing": "Stone", "x": 1680, "y": 24, "height": 24 },
                { "thing": "Stone", "x": 1688, "y": 32, "height": 32 },
                { "thing": "Stone", "x": 1696, "y": 40, "height": 40 },
                { "thing": "Stone", "x": 1704, "y": 48, "height": 48 },
                { "thing": "Stone", "x": 1712, "y": 56, "height": 56 },
                { "thing": "Stone", "x": 1720, "y": 64, "width": 16, "height": 64 },
                { "thing": "Brick", "x": 1760, "y": 32, "contents": "Coin" },
                { "macro": "EndOutsideCastle", "x": 1800, "transport": { "map": "4-2" } }
            ]
        }, {
            "setting": "Underworld",
            "blockBoundaries": true,
            "creation": [
                { "macro": "Floor", "width": 136 },
                { "macro": "Fill", "thing": "Brick", "y": 8, "ynum": 11 },
                { "macro": "Fill", "thing": "Brick", "x": 24, "y": 16, "ynum": 3 },
                { "macro": "Fill", "thing": "Brick", "x": 24, "y": 80, "xnum": 12 },
                { "macro": "Fill", "thing": "Coin", "x": 25, "y": 39, "xnum": 8, "xwidth": 8 },
                { "macro": "Fill", "thing": "Coin", "x": 25, "y": 7, "xnum": 10, "xwidth": 8 },
                { "macro": "Fill", "thing": "Brick", "x": 32, "y": 32, "xnum": 6 },
                { "macro": "Fill", "thing": "Brick", "x": 80, "y": 16, "ynum": 3 },
                { "thing": "PipeHorizontal", "x": 104, "y": 16, "transport": 1 },
                { "thing": "Brick", "x": 104, "y": 32, "contents": "Mushroom" },
                { "thing": "PipeVertical", "x": 120, "y": 88, "height": 88 }
            ]
        }
    ]
};