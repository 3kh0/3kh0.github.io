FullScreenMario.FullScreenMario.settings.maps = {
    "mapDefault": "1-1",
    "locationDefault": "0",
    "groupTypes": ["Character", "Solid", "Scenery", "Text"],
    "requireEntrance": true,
    "screenAttributes": [
        "gravity",
        "setting",
        "time",
        "underwater",
        "floor",
        "jumpmod",
        "maxyvel",
        "maxyvelinv",
        "notime",
        "nokeys",
        "canscroll"
    ],
    "screenVariables": {
        "bottomDeathDifference": function (GameStarter) {
            return GameStarter.unitsize * 12;
        },
        "bottomPlatformMax": function (GameStarter) {
            var area = GameStarter.AreaSpawner.getArea(),
                diff = GameStarter.MapScreener.bottomDeathDifference;
                
            if (!area) {
                return -1;
            }
                
            return (area.floor + diff) * GameStarter.unitsize;
        },
        "gravity": function (GameStarter) {
            var area = GameStarter.AreaSpawner.getArea();
            
            if (area && area.underwater) {
                return GameStarter.gravity / 2.8;
            }
            
            return GameStarter.gravity;
        }
    },
    "onSpawn": FullScreenMario.FullScreenMario.prototype.addPreThing,
    "macros": {
        "Example": FullScreenMario.FullScreenMario.prototype.macroExample,
        "Fill": FullScreenMario.FullScreenMario.prototype.macroFillPreThings,
        "Pattern": FullScreenMario.FullScreenMario.prototype.macroFillPrePattern,
        "Floor": FullScreenMario.FullScreenMario.prototype.macroFloor,
        "Pipe": FullScreenMario.FullScreenMario.prototype.macroPipe,
        "PipeCorner": FullScreenMario.FullScreenMario.prototype.macroPipeCorner,
        "Tree": FullScreenMario.FullScreenMario.prototype.macroTree,
        "Shroom": FullScreenMario.FullScreenMario.prototype.macroShroom,
        "Water": FullScreenMario.FullScreenMario.prototype.macroWater,
        "CastleSmall": FullScreenMario.FullScreenMario.prototype.macroCastleSmall,
        "CastleLarge": FullScreenMario.FullScreenMario.prototype.macroCastleLarge,
        "Ceiling": FullScreenMario.FullScreenMario.prototype.macroCeiling,
        "Bridge": FullScreenMario.FullScreenMario.prototype.macroBridge,
        "Scale": FullScreenMario.FullScreenMario.prototype.macroScale,
        "PlatformGenerator": FullScreenMario.FullScreenMario.prototype.macroPlatformGenerator,
        "WarpWorld": FullScreenMario.FullScreenMario.prototype.macroWarpWorld,
        "CheepsStart": FullScreenMario.FullScreenMario.prototype.macroCheepsStart,
        "CheepsStop": FullScreenMario.FullScreenMario.prototype.macroCheepsStop,
        "BulletBillsStart": FullScreenMario.FullScreenMario.prototype.macroBulletBillsStart,
        "BulletBillsStop": FullScreenMario.FullScreenMario.prototype.macroBulletBillsStop,
        "LakituStop": FullScreenMario.FullScreenMario.prototype.macroLakituStop,
        "StartInsideCastle": FullScreenMario.FullScreenMario.prototype.macroStartInsideCastle,
        "EndOutsideCastle": FullScreenMario.FullScreenMario.prototype.macroEndOutsideCastle,
        "EndInsideCastle": FullScreenMario.FullScreenMario.prototype.macroEndInsideCastle,
        "Section": FullScreenMario.FullScreenMario.prototype.macroSection,
        "SectionPass": FullScreenMario.FullScreenMario.prototype.macroSectionPass,
        "SectionFail": FullScreenMario.FullScreenMario.prototype.macroSectionFail,
        "SectionDecider": FullScreenMario.FullScreenMario.prototype.macroSectionDecider
    },
    "entrances": {
        "Normal": FullScreenMario.FullScreenMario.prototype.mapEntranceNormal,
        "Plain": FullScreenMario.FullScreenMario.prototype.mapEntrancePlain,
        "Castle": FullScreenMario.FullScreenMario.prototype.mapEntranceCastle,
        "Walking": FullScreenMario.FullScreenMario.prototype.mapEntranceWalking,
        "Vine": FullScreenMario.FullScreenMario.prototype.mapEntranceVine,
        "PipeVertical": FullScreenMario.FullScreenMario.prototype.mapEntrancePipeVertical,
        "PipeHorizontal": FullScreenMario.FullScreenMario.prototype.mapEntrancePipeHorizontal,
    },
    "patterns": (function (patterns) {
        var pattern,
            i;
        for (i in patterns) {
            if (patterns.hasOwnProperty(i)) {
                pattern = patterns[i];
                if (!pattern.length) {
                    continue;
                }
                
                // Pattern's last array should previously be ["blank", width]
                pattern.width = pattern[pattern.length - 1][1];
                pattern.pop();
            }
        }
        return patterns;
    })({
        "BackRegular": [
            ["HillLarge", 0, 0],
            ["Cloud1", 68, 68],
            ["Bush3", 92, 0],
            ["HillSmall", 128, 0],
            ["Cloud1", 156, 76],
            ["Bush1", 188, 0],
            ["Cloud3", 220, 68],
            ["Cloud2", 292, 76],
            ["Bush2", 332, 0],
            ["Blank", 384]
        ],
        "BackCloud": [
            ["Cloud2", 28, 64],
            ["Cloud1", 76, 32],
            ["Cloud2", 148, 72],
            ["Cloud1", 228, 0],
            ["Cloud1", 284, 32],
            ["Cloud1", 308, 40],
            ["Cloud1", 372, 0],
            ["Blank", 384]
        ],
        "BackFence": [
            ["PlantSmall", 88, 0],
            ["PlantLarge", 104, 0],
            ["Fence", 112, 0, 32],
            ["Cloud1", 148, 68],
            ["PlantLarge", 168, 0],
            ["PlantSmall", 184, 0],
            ["PlantSmall", 192, 0],
            ["Cloud1", 220, 76],
            ["Cloud2", 244, 68],
            ["Fence", 304, 0, 16],
            ["PlantSmall", 320, 0],
            ["Fence", 328, 0],
            ["PlantLarge", 344, 0],
            ["Cloud1", 364, 76],
            ["Cloud2", 388, 68],
            ["Blank", 384]
        ],
        "BackFenceMin": [
            ["PlantLarge", 104, 0],
            ["Fence", 112, 0, 32],
            ["Cloud1", 148, 68],
            ["PlantLarge", 168, 0],
            ["PlantSmall", 184, 0],
            ["PlantSmall", 192, 0],
            ["Cloud1", 220, 76],
            ["Cloud2", 244, 68],
            ["Fence", 304, 0, 16],
            ["PlantSmall", 320, 0],
            ["Fence", 328, 0],
            ["Cloud1", 364, 76],
            ["Cloud2", 388, 68],
            ["Blank", 384]
        ],
        "BackFenceMin2": [
            ["Cloud2", 4, 68],
            ["PlantSmall", 88, 0],
            ["PlantLarge", 104, 0],
            ["Fence", 112, 0],
            ["Fence", 128, 0, 16],
            ["Cloud1", 148, 68],
            // ["PlantLarge", 168, 0],
            ["PlantSmall", 184, 0],
            ["PlantSmall", 192, 0],
            ["Cloud1", 220, 76],
            ["Cloud2", 244, 68],
            ["Fence", 304, 0, 16],
            ["PlantSmall", 320, 0],
            ["Fence", 328, 0],
            ["PlantLarge", 344, 0],
            ["Cloud1", 364, 76],
            ["Cloud2", 388, 68],
            ["Blank", 384]
        ],
        "BackFenceMin3": [
            ["Cloud2", 4, 68],
            ["PlantSmall", 88, 0],
            ["PlantLarge", 104, 0],
            ["Fence", 112, 0, 4],
            ["Cloud1", 148, 68],
            ["PlantSmall", 184, 0],
            ["PlantSmall", 192, 0],
            ["Cloud1", 220, 76],
            ["Cloud2", 244, 68],
            ["Cloud1", 364, 76],
            ["Cloud2", 388, 68],
            ["Blank", 384]
        ]
    }),
    "library": {}
};
