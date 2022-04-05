FullScreenMario.FullScreenMario.settings.maps.library["3-2"] = {
    "name": "3-2",
    "time": 300,
    "locations": [
        { "entry": "Plain" }
    ],
    "areas": [
        {
            "setting": "Overworld Night Alt",
            "blockBoundaries": true,
            "creation": [
                { "macro": "Pattern", "pattern": "BackFence", "x": -384, "repeat": 6 },
                { "macro": "Floor", "width": 640 },
                { "macro": "CastleSmall" },
                { "thing": "Koopa", "x": 136, "y": 12 },
                { "macro": "Fill", "thing": "Goomba", "x": 192, "y": 8, "xnum": 3, "xwidth": 12 },
                { "macro": "Fill", "thing": "Koopa", "x": 264, "y": 12, "xnum": 3, "xwidth": 12 },
                { "macro": "Fill", "thing": "Koopa", "x": 344, "y": 12, "xnum": 2, "xwidth": 12 },
                { "thing": "Stone", "x": 392, "y": 8 },
                { "macro": "Fill", "thing": "Coin", "x": 441, "y": 31, "xnum": 3, "xwidth": 8 },
                { "thing": "Stone", "x": 480, "y": 24, "height": 24 },
                { "thing": "Block", "x": 480, "y": 56, "contents": "Mushroom" },
                { "thing": "Koopa", "x": 528, "y": 12 },
                { "macro": "Fill", "thing": "Goomba", "x": 568, "y": 8, "xnum": 3, "xwidth": 12 },
                { "thing": "Stone", "x": 600, "y": 16, "height": 16 },
                { "thing": "Brick", "x": 616, "y": 32, "contents": "Coin" },
                { "thing": "Brick", "x": 616, "y": 64, "contents": "Star" },
                { "thing": "Koopa", "x": 624, "y": 12 },
                { "thing": "Stone", "x": 632, "y": 16, "height": 16 },
                { "macro": "Floor", "x": 656, "width": 328 },
                { "thing": "Koopa", "x": 736, "y": 34, "jumping": true },
                { "thing": "Koopa", "x": 888, "y": 12 },
                { "macro": "Fill", "thing": "Goomba", "x": 952, "y": 8, "xnum": 3, "xwidth": 12 },
                { "macro": "Floor", "x": 1000, "width": 24 },
                { "thing": "Stone", "x": 1008, "y": 16, "height": 16 },
                { "thing": "Brick", "x": 1008, "y": 56 },
                { "macro": "Floor", "x": 1040, "width": 752 },
                { "thing": "Koopa", "x": 1072, "y": 12 },
                { "macro": "Fill", "thing": "Koopa", "x": 1120, "y": 12, "xnum": 3, "xwidth": 12 },
                { "macro": "Fill", "thing": "Koopa", "x": 1200, "y": 12, "xnum": 2, "xwidth": 12 },
                { "macro": "Fill", "thing": "Koopa", "x": 1296, "y": 12, "xnum": 3, "xwidth": 12 },
                { "macro": "Fill", "thing": "Coin", "x": 1345, "y": 55, "xnum": 4, "xwidth": 8 },
                { "macro": "Pipe", "x": 1352, "height": 24, "piranha": true },
                { "thing": "Koopa", "x": 1400, "y": 12 },
                { "macro": "Fill", "thing": "Goomba", "x": 1432, "y": 8, "xnum": 3, "xwidth": 12 },
                { "macro": "Fill", "thing": "Goomba", "x": 1504, "y": 8, "xnum": 3, "xwidth": 12 },
                { "thing": "Stone", "x": 1536, "y": 8 },
                { "thing": "Stone", "x": 1544, "y": 16, "height": 16 },
                { "thing": "Stone", "x": 1552, "y": 24, "height": 24 },
                { "thing": "Stone", "x": 1560, "y": 32, "height": 32 },
                { "thing": "Stone", "x": 1568, "y": 40, "height": 40 },
                { "thing": "Stone", "x": 1576, "y": 48, "height": 48 },
                { "thing": "Stone", "x": 1584, "y": 56, "height": 56 },
                { "thing": "Stone", "x": 1592, "y": 64, "width": 16, "height": 64 },
                { "macro": "EndOutsideCastle", "x": 1672, "transport": { "map": "3-3" } }
            ]
        }
    ]
};