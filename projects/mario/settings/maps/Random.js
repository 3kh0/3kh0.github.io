FullScreenMario.FullScreenMario.settings.maps.library.Random = {
    "name": "Random",
    "locations": {
        "0": { "entry": "Plain", "area": "Overworld" },
        "Overworld": { "entry": "Plain", "area": "Overworld" },
        "OverworldFromSky": { "area": "Overworld" },
        "OverworldFromPipe": { "entry": "PipeVertical", "area": "OverworldWithPipe" },
        "Underworld": { "area": "Underworld" },
        "Sky": { "entry": "Vine", "area": "Sky" },
        "Castle": { "entry": "Castle", "area": "Castle" }
    },
    "areas": {
        "Overworld": {
            "setting": "Overworld",
            "random": true,
            "creation": [
                { "thing": "RandomSpawner", "x": 0, "y": 0, "randomization": "Overworld", "randomTop": 80, "randomWidth": 2800, "randomBottom": -8 }
            ]
        },
        "OverworldWithPipe": {
            "setting": "Overworld",
            "random": true,
            "creation": [
                { "macro": "Pipe", "entrance": "OverworldFromPipe", "height": 16 },
                { "thing": "RandomSpawner", "x": 0, "y": 0, "randomization": "Overworld", "randomTop": 80, "randomWidth": 1520, "randomBottom": -8 }
            ]
        },
        "Underworld": {
            "setting": "Underworld",
            "random": true,
            "creation": [
                { "thing": "RandomSpawner", "x": 0, "y": 0, "randomization": "Underworld", "randomTop": 80, "randomWidth": 2800, "randomBottom": -8 }
            ]
        },
        "Sky": {
            "setting": "Sky",
            "random": true,
            "exit": "OverworldFromSky",
            "creation": [
                { "thing": "RandomSpawner", "x": 0, "y": 0, "randomization": "Sky", "randomTop": 80, "randomWidth": 2800, "randomBottom": -8 }
            ]
        },
        "Castle": {
            "setting": "Castle",
            "random": true,
            "creation": [
                { "thing": "RandomSpawner", "x": 0, "y": 0, "randomization": "Castle", "randomTop": 80, "randomWidth": 2000, "randomBottom": -8 }
            ]
        }
    }
};