/// <reference path="../FullScreenMario.ts" />

namespace FullScreenMario {
    "use strict";

    FullScreenMario.settings.collisions = {
        "keyGroupName": "groupType",
        "keyTypeName": "title",
        "globalCheckGenerators": {
            "Character": FullScreenMario.prototype.generateCanThingCollide,
            "Solid": FullScreenMario.prototype.generateCanThingCollide
        },
        "hitCheckGenerators": {
            "Character": {
                "Character": FullScreenMario.prototype.generateIsCharacterTouchingCharacter,
                "Solid": FullScreenMario.prototype.generateIsCharacterTouchingSolid
            }
        },
        "hitCallbackGenerators": {
            "Character": {
                "Solid": FullScreenMario.prototype.generateHitCharacterSolid,
                "Character": FullScreenMario.prototype.generateHitCharacterCharacter
            }
        }
    };
}
