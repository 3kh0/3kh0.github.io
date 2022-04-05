/// <reference path="AreaSpawnr-0.2.0.ts" />
/// <reference path="AudioPlayr-0.2.1.ts" />
/// <reference path="ChangeLinr-0.2.0.ts" />
/// <reference path="DeviceLayr-0.2.0.ts" />
/// <reference path="EightBittr-0.2.0.ts" />
/// <reference path="FPSAnalyzr-0.2.1.ts" />
/// <reference path="GamesRunnr-0.2.0.ts" />
/// <reference path="GroupHoldr-0.2.1.ts" />
/// <reference path="InputWritr-0.2.0.ts" />
/// <reference path="ItemsHoldr-0.2.1.ts" />
/// <reference path="LevelEditr-0.2.0.ts" />
/// <reference path="MapsCreatr-0.2.1.ts" />
/// <reference path="MapScreenr-0.2.1.ts" />
/// <reference path="MathDecidr-0.2.0.ts" />
/// <reference path="ModAttachr-0.2.2.ts" />
/// <reference path="NumberMakr-0.2.2.ts" />
/// <reference path="ObjectMakr-0.2.2.ts" />
/// <reference path="PixelDrawr-0.2.0.ts" />
/// <reference path="PixelRendr-0.2.0.ts" />
/// <reference path="QuadsKeepr-0.2.1.ts" />
/// <reference path="ScenePlayr-0.2.0.ts" />
/// <reference path="StringFilr-0.2.1.ts" />
/// <reference path="ThingHittr-0.2.0.ts" />
/// <reference path="TimeHandlr-0.2.0.ts" />
/// <reference path="TouchPassr-0.2.0.ts" />
/// <reference path="UsageHelpr-0.2.0.ts" />
/// <reference path="UserWrappr-0.2.0.ts" />
/// <reference path="WorldSeedr-0.2.0.ts" />
/// <reference path="js_beautify.ts" />
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var GameStartr;
(function (GameStartr_1) {
    "use strict";
    /**
     * A general-use game engine for 2D 8-bit games.
     */
    var GameStartr = (function (_super) {
        __extends(GameStartr, _super);
        /**
         * Initializes a new instance of the GameStartr class.
         *
         * @param customs   Any optional custom settings.
         */
        function GameStartr(settings) {
            if (settings === void 0) { settings = {}; }
            _super.call(this, {
                "unitsize": settings.unitsize,
                "constantsSource": settings.constantsSource,
                "constants": settings.constants
            });
            /**
             * Default list of reset Functions to call during this.reset or this.resetTimed,
             * in order of when they should be called.
             */
            this.resets = [
                "resetUsageHelper",
                "resetObjectMaker",
                "resetPixelRender",
                "resetTimeHandler",
                "resetItemsHolder",
                "resetAudioPlayer",
                "resetQuadsKeeper",
                "resetGamesRunner",
                "resetGroupHolder",
                "resetThingHitter",
                "resetMapScreener",
                "resetPixelDrawer",
                "resetNumberMaker",
                "resetMapsCreator",
                "resetAreaSpawner",
                "resetInputWriter",
                "resetDeviceLayer",
                "resetTouchPasser",
                "resetLevelEditor",
                "resetWorldSeeder",
                "resetScenePlayer",
                "resetMathDecider",
                "resetModAttacher",
                "startModAttacher",
                "resetContainer"
            ];
            if (settings.extraResets) {
                this.resets.push.apply(this.resets, settings.extraResets);
            }
            if (settings.resetTimed) {
                this.resetTimed(this, settings);
            }
            else {
                this.reset(this, settings);
            }
        }
        /* Resets
        */
        /**
         * Resets the GameStartr by calling the parent EightBittr.prototype.reset.
         *
         * @param GameStarter
         * @param customs   Any optional custom settings.
         */
        GameStartr.prototype.reset = function (GameStarter, settings) {
            _super.prototype.reset.call(this, GameStarter, GameStarter.resets, settings);
        };
        /**
         * Resets the EightBittr and records the time by calling the parent
         * EightBittr.prototype.resetTimed.
         *
         * @param GameStarter
         * @param customs   Any optional custom settings.
         */
        GameStartr.prototype.resetTimed = function (GameStarter, settings) {
            _super.prototype.resetTimed.call(this, GameStarter, GameStarter.resets, settings);
        };
        /**
         * Sets this.UsageHelper.
         *
         * @param GameStarter
         * @param customs   Any optional custom settings.
         */
        GameStartr.prototype.resetUsageHelper = function (GameStarter, settings) {
            GameStarter.UsageHelper = new UsageHelpr.UsageHelpr(GameStarter.settings.help);
        };
        /**
         * Sets this.ObjectMaker.
         *
         * Because many Thing functions require access to other GameStartr modules, each is
         * given a reference to this container GameStartr via properties.thing.GameStarter.
         *
         * @param GameStarter
         * @param customs   Any optional custom settings.
         */
        GameStartr.prototype.resetObjectMaker = function (GameStarter, settings) {
            GameStarter.ObjectMaker = new ObjectMakr.ObjectMakr(GameStarter.proliferate({
                "properties": {
                    "Quadrant": {
                        "EightBitter": GameStarter,
                        "GameStarter": GameStarter
                    },
                    "Thing": {
                        "EightBitter": GameStarter,
                        "GameStarter": GameStarter
                    }
                }
            }, GameStarter.settings.objects));
        };
        /**
         * Sets this.QuadsKeeper.
         *
         * @param GameStarter
         * @param customs   Any optional custom settings.
         */
        GameStartr.prototype.resetQuadsKeeper = function (GameStarter, settings) {
            var quadrantWidth = settings.width / (GameStarter.settings.quadrants.numCols - 3), quadrantHeight = settings.height / (GameStarter.settings.quadrants.numRows - 2);
            GameStarter.QuadsKeeper = new QuadsKeepr.QuadsKeepr(GameStarter.proliferate({
                "ObjectMaker": GameStarter.ObjectMaker,
                "createCanvas": GameStarter.createCanvas,
                "quadrantWidth": quadrantWidth,
                "quadrantHeight": quadrantHeight,
                "startLeft": -quadrantWidth,
                "startHeight": -quadrantHeight,
                "onAdd": GameStarter.onAreaSpawn.bind(GameStarter, GameStarter),
                "onRemove": GameStarter.onAreaUnspawn.bind(GameStarter, GameStarter)
            }, GameStarter.settings.quadrants));
        };
        /**
         * Sets this.PixelRender.
         *
         * @param GameStarter
         * @param customs   Any optional custom settings.
         */
        GameStartr.prototype.resetPixelRender = function (GameStarter, settings) {
            GameStarter.PixelRender = new PixelRendr.PixelRendr(GameStarter.proliferate({
                "scale": GameStarter.scale,
                "QuadsKeeper": GameStarter.QuadsKeeper,
                "unitsize": GameStarter.unitsize
            }, GameStarter.settings.sprites));
        };
        /**
         * Sets this.PixelDrawer.
         *
         * @param GameStarter
         * @param customs   Any optional custom settings.
         */
        GameStartr.prototype.resetPixelDrawer = function (GameStarter, settings) {
            GameStarter.PixelDrawer = new PixelDrawr.PixelDrawr(GameStarter.proliferate({
                "PixelRender": GameStarter.PixelRender,
                "MapScreener": GameStarter.MapScreener,
                "createCanvas": GameStarter.createCanvas,
                "unitsize": GameStarter.unitsize,
                "generateObjectKey": GameStarter.generateThingKey
            }, GameStarter.settings.renderer));
        };
        /**
         * Sets this.TimeHandler.
         *
         * @param GameStarter
         * @param customs   Any optional custom settings.
         */
        GameStartr.prototype.resetTimeHandler = function (GameStarter, settings) {
            GameStarter.TimeHandler = new TimeHandlr.TimeHandlr(GameStarter.proliferate({
                "classAdd": GameStarter.addClass,
                "classRemove": GameStarter.removeClass
            }, GameStarter.settings.events));
        };
        /**
         * Sets this.AudioPlayer.
         *
         * @param GameStarter
         * @param customs   Any optional custom settings.
         */
        GameStartr.prototype.resetAudioPlayer = function (GameStarter, settings) {
            GameStarter.AudioPlayer = new AudioPlayr.AudioPlayr(GameStarter.proliferate({
                "ItemsHolder": GameStarter.ItemsHolder
            }, GameStarter.settings.audio));
        };
        /**
         * Sets this.GamesRunner.
         *
         * @param GameStarter
         * @param customs   Any optional custom settings.
         */
        GameStartr.prototype.resetGamesRunner = function (GameStarter, settings) {
            GameStarter.GamesRunner = new GamesRunnr.GamesRunnr(GameStarter.proliferate({
                "adjustFramerate": true,
                "scope": GameStarter,
                "onPlay": GameStarter.onGamePlay.bind(GameStarter, GameStarter),
                "onPause": GameStarter.onGamePause.bind(GameStarter, GameStarter),
                "FPSAnalyzer": new FPSAnalyzr.FPSAnalyzr()
            }, GameStarter.settings.runner));
            GameStarter.FPSAnalyzer = GameStarter.GamesRunner.getFPSAnalyzer();
        };
        /**
         * Sets this.ItemsHolder.
         *
         * @param GameStarter
         * @param customs   Any optional custom settings.
         */
        GameStartr.prototype.resetItemsHolder = function (GameStarter, settings) {
            GameStarter.ItemsHolder = new ItemsHoldr.ItemsHoldr(GameStarter.proliferate({
                "callbackArgs": [GameStarter]
            }, GameStarter.settings.items));
        };
        /**
         * Sets this.GroupHolder.
         *
         * @param GameStarter
         * @param customs   Any optional custom settings.
         */
        GameStartr.prototype.resetGroupHolder = function (GameStarter, settings) {
            GameStarter.GroupHolder = new GroupHoldr.GroupHoldr(GameStarter.settings.groups);
        };
        /**
         * Sets this.ThingHitter.
         *
         * @param GameStarter
         * @param customs   Any optional custom settings.
         */
        GameStartr.prototype.resetThingHitter = function (GameStarter, settings) {
            GameStarter.ThingHitter = new ThingHittr.ThingHittr(GameStarter.proliferate({
                "scope": GameStarter
            }, GameStarter.settings.collisions));
        };
        /**
         * Sets this.MapScreener.
         *
         * @param GameStarter
         * @param customs   Any optional custom settings.
         */
        GameStartr.prototype.resetMapScreener = function (GameStarter, settings) {
            GameStarter.MapScreener = new MapScreenr.MapScreenr({
                "EightBitter": GameStarter,
                "unitsize": GameStarter.unitsize,
                "width": settings.width,
                "height": settings.height,
                "variableArgs": [GameStarter],
                "variables": GameStarter.settings.maps.screenVariables
            });
        };
        /**
         * Sets this.NumberMaker.
         *
         * @param GameStarter
         * @param customs   Any optional custom settings.
         */
        GameStartr.prototype.resetNumberMaker = function (GameStarter, settings) {
            GameStarter.NumberMaker = new NumberMakr.NumberMakr();
        };
        /**
         * Sets this.MapCreator.
         *
         * @param GameStarter
         * @param customs   Any optional custom settings.
         */
        GameStartr.prototype.resetMapsCreator = function (GameStarter, settings) {
            GameStarter.MapsCreator = new MapsCreatr.MapsCreatr({
                "ObjectMaker": GameStarter.ObjectMaker,
                "groupTypes": GameStarter.settings.maps.groupTypes,
                "macros": GameStarter.settings.maps.macros,
                "entrances": GameStarter.settings.maps.entrances,
                "maps": GameStarter.settings.maps.library,
                "scope": GameStarter
            });
        };
        /**
         * Sets this.AreaSpawner.
         *
         * @param GameStarter
         * @param customs   Any optional custom settings.
         */
        GameStartr.prototype.resetAreaSpawner = function (GameStarter, settings) {
            GameStarter.AreaSpawner = new AreaSpawnr.AreaSpawnr({
                "MapsCreator": GameStarter.MapsCreator,
                "MapScreener": GameStarter.MapScreener,
                "screenAttributes": GameStarter.settings.maps.screenAttributes,
                "onSpawn": GameStarter.settings.maps.onSpawn,
                "onUnspawn": GameStarter.settings.maps.onUnspawn,
                "stretchAdd": GameStarter.settings.maps.stretchAdd,
                "afterAdd": GameStarter.settings.maps.afterAdd,
                "commandScope": GameStarter
            });
        };
        /**
         * Sets this.InputWriter.
         *
         * @param GameStarter
         * @param customs   Any optional custom settings.
         */
        GameStartr.prototype.resetInputWriter = function (GameStarter, settings) {
            GameStarter.InputWriter = new InputWritr.InputWritr(GameStarter.proliferate({
                "canTrigger": GameStarter.canInputsTrigger.bind(GameStarter, GameStarter),
                "eventInformation": GameStarter
            }, GameStarter.settings.input.InputWritrArgs));
        };
        /**
         * Sets this.DeviceLayer.
         *
         * @param GameStarter
         * @param customs   Any optional custom settings.
         */
        GameStartr.prototype.resetDeviceLayer = function (GameStarter, settings) {
            GameStarter.DeviceLayer = new DeviceLayr.DeviceLayr(GameStarter.proliferate({
                "InputWriter": GameStarter.InputWriter
            }, GameStarter.settings.devices));
        };
        /**
         * Sets this.InputWriter.
         *
         * @param GameStarter
         * @param customs   Any optional custom settings.
         */
        GameStartr.prototype.resetTouchPasser = function (GameStarter, settings) {
            GameStarter.TouchPasser = new TouchPassr.TouchPassr(GameStarter.proliferate({
                "InputWriter": GameStarter.InputWriter
            }, GameStarter.settings.touch));
        };
        /**
         * Sets this.LevelEditor.
         *
         * @param GameStarter
         * @param customs   Any optional custom settings.
         */
        GameStartr.prototype.resetLevelEditor = function (GameStarter, settings) {
            GameStarter.LevelEditor = new LevelEditr.LevelEditr(GameStarter.proliferate({
                "GameStarter": GameStarter,
                "beautifier": js_beautify
            }, GameStarter.settings.editor));
        };
        /**
         * Sets this.WorldSeeder.
         *
         * @param GameStarter
         * @param customs   Any optional custom settings.
         */
        GameStartr.prototype.resetWorldSeeder = function (GameStarter, settings) {
            GameStarter.WorldSeeder = new WorldSeedr.WorldSeedr(GameStarter.proliferate({
                "random": GameStarter.NumberMaker.random.bind(GameStarter.NumberMaker),
                "onPlacement": GameStarter.mapPlaceRandomCommands.bind(GameStarter, GameStarter)
            }, GameStarter.settings.generator));
        };
        /**
         * Sets this.ScenePlayer.
         *
         * @param GameStarter
         * @param customs   Any optional custom settings.
         */
        GameStartr.prototype.resetScenePlayer = function (GameStarter, settings) {
            GameStarter.ScenePlayer = new ScenePlayr.ScenePlayr(GameStarter.proliferate({
                "cutsceneArguments": [GameStarter]
            }, GameStarter.settings.scenes));
        };
        /**
         * Sets this.MathDecider.
         *
         * @param GameStarter
         * @param customs   Any optional custom settings.
         */
        GameStartr.prototype.resetMathDecider = function (GameStarter, settings) {
            GameStarter.MathDecider = new MathDecidr.MathDecidr(GameStarter.settings.math);
        };
        /**
         * Sets this.ModAttacher.
         *
         * @param GameStarter
         * @param customs   Any optional custom settings.
         */
        GameStartr.prototype.resetModAttacher = function (GameStarter, settings) {
            GameStarter.ModAttacher = new ModAttachr.ModAttachr(GameStarter.proliferate({
                "scopeDefault": GameStarter,
                "ItemsHoldr": GameStarter.ItemsHolder
            }, GameStarter.settings.mods));
        };
        /**
         * Starts self.ModAttacher. All mods are enabled, and the "onReady" trigger
         * is fired.
         *
         * @param GameStarter
         * @param customs   Any optional custom settings.
         */
        GameStartr.prototype.startModAttacher = function (GameStarter, settings) {
            var mods = settings.mods, i;
            if (mods) {
                for (i in mods) {
                    if (mods.hasOwnProperty(i) && mods[i]) {
                        GameStarter.ModAttacher.enableMod(i);
                    }
                }
            }
            GameStarter.ModAttacher.fireEvent("onReady", GameStarter, GameStarter);
        };
        /**
         * Resets the parent HTML container. Width and height are set by customs,
         * and canvas, ItemsHolder, and TouchPassr container elements are added.
         *
         * @param GameStarter
         * @param customs   Any optional custom settings.
         */
        GameStartr.prototype.resetContainer = function (GameStarter, settings) {
            GameStarter.container = GameStarter.createElement("div", {
                "className": "EightBitter",
                "style": GameStarter.proliferate({
                    "position": "relative",
                    "width": settings.width + "px",
                    "height": settings.height + "px"
                }, settings.style)
            });
            GameStarter.canvas = GameStarter.createCanvas(settings.width, settings.height);
            GameStarter.PixelDrawer.setCanvas(GameStarter.canvas);
            GameStarter.container.appendChild(GameStarter.canvas);
            GameStarter.TouchPasser.setParentContainer(GameStarter.container);
        };
        /* Global manipulations
        */
        /**
         * Scrolls the game window by shifting all Things and checking for quadrant
         * refreshes. Shifts are rounded to the nearest integer, to preserve pixels.
         *
         * @param customs   Any optional custom settings.
         * @param dx   How far to scroll horizontally.
         * @param dy   How far to scroll vertically.
         */
        GameStartr.prototype.scrollWindow = function (dx, dy) {
            var GameStarter = GameStartr.prototype.ensureCorrectCaller(this);
            dx = dx | 0;
            dy = dy | 0;
            if (!dx && !dy) {
                return;
            }
            GameStarter.MapScreener.shift(dx, dy);
            GameStarter.shiftAll(-dx, -dy);
            GameStarter.QuadsKeeper.shiftQuadrants(-dx, -dy);
        };
        /**
         * Scrolls everything but a single Thing.
         *
         * @param thing   The only Thing that shouldn't move on the screen.
         * @param dx   How far to scroll horizontally.
         * @param dy   How far to scroll vertically.
         */
        GameStartr.prototype.scrollThing = function (thing, dx, dy) {
            var saveleft = thing.left, savetop = thing.top;
            thing.GameStarter.scrollWindow(dx, dy);
            thing.GameStarter.setLeft(thing, saveleft);
            thing.GameStarter.setTop(thing, savetop);
        };
        /**
         * Spawns all Things within a given area that should be there.
         *
         * @param GameStarter
         * @param direction   The direction spawning comes from.
         * @param top   A top boundary to spawn within.
         * @param right   A right boundary to spawn within.
         * @param bottom   A bottom boundary to spawn within.
         * @param left   A left boundary to spawn within.
         * @remarks This is generally called by a QuadsKeepr during a screen update.
         */
        GameStartr.prototype.onAreaSpawn = function (GameStarter, direction, top, right, bottom, left) {
            GameStarter.AreaSpawner.spawnArea(direction, (top + GameStarter.MapScreener.top) / GameStarter.unitsize, (right + GameStarter.MapScreener.left) / GameStarter.unitsize, (bottom + GameStarter.MapScreener.top) / GameStarter.unitsize, (left + GameStarter.MapScreener.left) / GameStarter.unitsize);
        };
        /**
         * "Unspawns" all Things within a given area that should be gone by marking
         * their PreThings as not in game.
         *
         * @param GameStarter
         * @param direction   The direction spawning comes from.
         * @param top   A top boundary to spawn within.
         * @param right   A right boundary to spawn within.
         * @param bottom   A bottom boundary to spawn within.
         * @param left   A left boundary to spawn within.
         * @remarks This is generally called by a QuadsKeepr during a screen update.
         */
        GameStartr.prototype.onAreaUnspawn = function (GameStarter, direction, top, right, bottom, left) {
            GameStarter.AreaSpawner.unspawnArea(direction, (top + GameStarter.MapScreener.top) / GameStarter.unitsize, (right + GameStarter.MapScreener.left) / GameStarter.unitsize, (bottom + GameStarter.MapScreener.top) / GameStarter.unitsize, (left + GameStarter.MapScreener.left) / GameStarter.unitsize);
        };
        /**
         * Adds a new Thing to the game at a given position, relative to the top
         * left corner of the screen.
         *
         * @param thingRaw   What type of Thing to add. This may be a String of
         *                   the class title, an Array containing the String
         *                   and an Object of settings, or an actual Thing.
         * @param left   The horizontal point to place the Thing's left at (by default, 0).
         * @param top   The vertical point to place the Thing's top at (by default, 0).
         */
        GameStartr.prototype.addThing = function (thingRaw, left, top) {
            if (left === void 0) { left = 0; }
            if (top === void 0) { top = 0; }
            var thing;
            if (typeof thingRaw === "string" || thingRaw instanceof String) {
                thing = this.ObjectMaker.make(thingRaw);
            }
            else if (thingRaw.constructor === Array) {
                thing = this.ObjectMaker.make.apply(this.ObjectMaker, thingRaw);
            }
            else {
                thing = thingRaw;
            }
            if (arguments.length > 2) {
                thing.GameStarter.setLeft(thing, left);
                thing.GameStarter.setTop(thing, top);
            }
            else if (arguments.length > 1) {
                thing.GameStarter.setLeft(thing, left);
            }
            thing.GameStarter.updateSize(thing);
            thing.GameStarter.GroupHolder.getFunctions().add[thing.groupType](thing);
            thing.placed = true;
            // This will typically be a TimeHandler.cycleClass call
            if (thing.onThingAdd) {
                thing.onThingAdd(thing);
            }
            thing.GameStarter.PixelDrawer.setThingSprite(thing);
            // This will typically be a spawn* call
            if (thing.onThingAdded) {
                thing.onThingAdded(thing);
            }
            thing.GameStarter.ModAttacher.fireEvent("onAddThing", thing, left, top);
            return thing;
        };
        /**
         * Processes a Thing so that it is ready to be placed in gameplay. There are
         * a lot of steps here: width and height must be set with defaults and given
         * to spritewidth and spriteheight, a quadrants Array must be given, the
         * sprite must be set, attributes and onThingMake called upon, and initial
         * class cycles and flipping set.
         *
         * @param thing   The Thing being processed.
         * @param title   What type Thing this is (the name of the class).
         * @param settings   Additional settings to be given to the Thing.
         * @param defaults   The default settings for the Thing's class.
         * @remarks This is generally called as the onMake call in an ObjectMakr.
         */
        GameStartr.prototype.thingProcess = function (thing, title, settings, defaults) {
            var maxQuads = 4, num, cycle;
            // If the Thing doesn't specify its own title, use the type by default
            thing.title = thing.title || title;
            // If a width/height is provided but no spritewidth/height,
            // use the default spritewidth/height
            if (thing.width && !thing.spritewidth) {
                thing.spritewidth = defaults.spritewidth || defaults.width;
            }
            if (thing.height && !thing.spriteheight) {
                thing.spriteheight = defaults.spriteheight || defaults.height;
            }
            // Each thing has at least 4 maximum quadrants for the QuadsKeepr
            num = Math.floor(thing.width * (thing.GameStarter.unitsize / thing.GameStarter.QuadsKeeper.getQuadrantWidth()));
            if (num > 0) {
                maxQuads += ((num + 1) * maxQuads / 2);
            }
            num = Math.floor(thing.height * thing.GameStarter.unitsize / thing.GameStarter.QuadsKeeper.getQuadrantHeight());
            if (num > 0) {
                maxQuads += ((num + 1) * maxQuads / 2);
            }
            thing.maxquads = maxQuads;
            thing.quadrants = new Array(maxQuads);
            // Basic sprite information
            thing.spritewidth = thing.spritewidth || thing.width;
            thing.spriteheight = thing.spriteheight || thing.height;
            // Sprite sizing
            thing.spritewidthpixels = thing.spritewidth * thing.GameStarter.unitsize;
            thing.spriteheightpixels = thing.spriteheight * thing.GameStarter.unitsize;
            // Canvas, context
            thing.canvas = thing.GameStarter.createCanvas(thing.spritewidthpixels, thing.spriteheightpixels);
            thing.context = thing.canvas.getContext("2d");
            if (thing.opacity !== 1) {
                thing.GameStarter.setOpacity(thing, thing.opacity);
            }
            // Attributes, such as Koopa.smart
            if (thing.attributes) {
                thing.GameStarter.thingProcessAttributes(thing, thing.attributes);
            }
            // Important custom functions
            if (thing.onThingMake) {
                thing.onThingMake(thing, settings);
            }
            // Initial class / sprite setting
            thing.GameStarter.setSize(thing, thing.width, thing.height);
            thing.GameStarter.setClassInitial(thing, thing.name || thing.title);
            // Sprite cycles
            if (cycle = thing.spriteCycle) {
                thing.GameStarter.TimeHandler.addClassCycle(thing, cycle[0], cycle[1] || null, cycle[2] || null);
            }
            if (cycle = thing.spriteCycleSynched) {
                thing.GameStarter.TimeHandler.addClassCycleSynched(thing, cycle[0], cycle[1] || null, cycle[2] || null);
            }
            // flipHoriz and flipVert initially 
            if (thing.flipHoriz) {
                thing.GameStarter.flipHoriz(thing);
            }
            if (thing.flipVert) {
                thing.GameStarter.flipVert(thing);
            }
            // Mods!
            thing.GameStarter.ModAttacher.fireEvent("onThingMake", thing.GameStarter, thing, title, settings, defaults);
        };
        /**
         * Processes additional Thing attributes. For each attribute the Thing's
         * class says it may have, if it has it, the attribute's key is appeneded to
         * the Thing's name and the attribute value proliferated onto the Thing.
         *
         * @param thing
         * @param attributes   A lookup of attributes that may be added to the Thing's class.
         */
        GameStartr.prototype.thingProcessAttributes = function (thing, attributes) {
            var attribute;
            // For each listing in the attributes...
            for (attribute in attributes) {
                // If the thing has that attribute as true:
                if (thing[attribute]) {
                    // Add the extra options
                    thing.GameStarter.proliferate(thing, attributes[attribute]);
                    // Also add a marking to the name, which will go into the className
                    if (thing.name) {
                        thing.name += " " + attribute;
                    }
                    else {
                        thing.name = thing.title + " " + attribute;
                    }
                }
            }
        };
        /**
         * Runs through commands generated by a WorldSeedr and evaluates all of
         * to create PreThings via MapsCreator.analyzePreSwitch.
         *
         * @param GameStarter
         * @param generatedCommands   Commands generated by WorldSeedr.generateFull.
         */
        GameStartr.prototype.mapPlaceRandomCommands = function (GameStarter, generatedCommands) {
            var MapsCreator = GameStarter.MapsCreator, AreaSpawner = GameStarter.AreaSpawner, prethings = AreaSpawner.getPreThings(), area = AreaSpawner.getArea(), map = AreaSpawner.getMap(), command, output, i;
            for (i = 0; i < generatedCommands.length; i += 1) {
                command = generatedCommands[i];
                output = {
                    "thing": command.title,
                    "x": command.left,
                    "y": command.top
                };
                if (command.arguments) {
                    GameStarter.proliferateHard(output, command.arguments, true);
                }
                MapsCreator.analyzePreSwitch(output, prethings, area, map);
            }
        };
        /**
         * Triggered Function for when the game is unpaused. Music resumes, and
         * the mod event is fired.
         *
         * @param GameStartr
         */
        GameStartr.prototype.onGamePlay = function (GameStarter) {
            GameStarter.AudioPlayer.resumeAll();
            GameStarter.ModAttacher.fireEvent("onGamePlay");
        };
        /**
         * Triggered Function for when the game is paused. Music stops, and the
         * mod event is fired.
         *
         * @param GameStartr
         */
        GameStartr.prototype.onGamePause = function (GameStarter) {
            GameStarter.AudioPlayer.pauseAll();
            GameStarter.ModAttacher.fireEvent("onGamePause");
        };
        /**
         * Checks whether inputs can be fired, which by default is always true.
         *
         * @param GameStartr
         * @returns Whether inputs can be fired, which is always true.
         */
        GameStartr.prototype.canInputsTrigger = function (GameStarter) {
            return true;
        };
        /**
         * Generic Function to start the game. Nothing actually happens here.
         */
        GameStartr.prototype.gameStart = function () {
            this.ModAttacher.fireEvent("onGameStart");
        };
        /* Physics & similar
        */
        /**
         * Generically kills a Thing by setting its alive to false, hidden to true,
         * and clearing its movement.
         *
         * @param thing
         */
        GameStartr.prototype.killNormal = function (thing) {
            if (!thing) {
                return;
            }
            thing.alive = false;
            thing.hidden = true;
            thing.movement = undefined;
        };
        /**
         * Sets a Thing's "changed" flag to true, which indicates to the PixelDrawr
         * to redraw the Thing and its quadrant.
         *
         * @param thing
         */
        GameStartr.prototype.markChanged = function (thing) {
            thing.changed = true;
        };
        /**
         * Shifts a Thing vertically using the EightBittr utility, and marks the
         * Thing as having a changed appearance.
         *
         * @param thing
         * @param dy   How far to shift the Thing vertically.
         * @param notChanged   Whether to skip marking the Thing as changed (by
         *                     default, false).
         */
        GameStartr.prototype.shiftVert = function (thing, dy, notChanged) {
            EightBittr.EightBittr.prototype.shiftVert(thing, dy);
            if (!notChanged) {
                thing.GameStarter.markChanged(thing);
            }
        };
        /**
         * Shifts a Thing horizontally using the EightBittr utility, and marks the
         * Thing as having a changed appearance.
         *
         * @param thing
         * @param dx   How far to shift the Thing horizontally.
         * @param notChanged   Whether to skip marking the Thing as changed (by
         *                     default, false).
         */
        GameStartr.prototype.shiftHoriz = function (thing, dx, notChanged) {
            EightBittr.EightBittr.prototype.shiftHoriz(thing, dx);
            if (!notChanged) {
                thing.GameStarter.markChanged(thing);
            }
        };
        /**
         * Sets a Thing's top using the EightBittr utility, and marks the Thing as
         * having a changed appearance.
         *
         * @param thing
         * @param top   A new top border for the Thing.
         */
        GameStartr.prototype.setTop = function (thing, top) {
            EightBittr.EightBittr.prototype.setTop(thing, top);
            thing.GameStarter.markChanged(thing);
        };
        /**
         * Sets a Thing's right using the EightBittr utility, and marks the Thing as
         * having a changed appearance.
         *
         * @param thing
         * @param right   A new right border for the Thing.
         */
        GameStartr.prototype.setRight = function (thing, right) {
            EightBittr.EightBittr.prototype.setRight(thing, right);
            thing.GameStarter.markChanged(thing);
        };
        /**
         * Sets a Thing's bottom using the EightBittr utility, and marks the Thing
         * as having a changed appearance.
         *
         * @param thing
         * @param bottom   A new bottom border for the Thing.
         */
        GameStartr.prototype.setBottom = function (thing, bottom) {
            EightBittr.EightBittr.prototype.setBottom(thing, bottom);
            thing.GameStarter.markChanged(thing);
        };
        /**
         * Sets a Thing's left using the EightBittr utility, and marks the Thing
         * as having a changed appearance.
         *
         * @param thing
         * @param left   A new left border for the Thing.
         */
        GameStartr.prototype.setLeft = function (thing, left) {
            EightBittr.EightBittr.prototype.setLeft(thing, left);
            thing.GameStarter.markChanged(thing);
        };
        /**
         * Shifts a thing both horizontally and vertically. If the Thing marks
         * itself as having a parallax effect (parallaxHoriz or parallaxVert), that
         * proportion of movement is respected (.5 = half, etc.).
         *
         * @param thing
         * @param dx   How far to shift the Thing horizontally.
         * @param dy   How far to shift the Thing vertically.
         * @param notChanged   Whether to skip marking the Thing as changed (by
         *                     default, false).
         */
        GameStartr.prototype.shiftBoth = function (thing, dx, dy, notChanged) {
            dx = dx || 0;
            dy = dy || 0;
            if (!thing.noshiftx) {
                if (thing.parallaxHoriz) {
                    thing.GameStarter.shiftHoriz(thing, thing.parallaxHoriz * dx, notChanged);
                }
                else {
                    thing.GameStarter.shiftHoriz(thing, dx, notChanged);
                }
            }
            if (!thing.noshifty) {
                if (thing.parallaxVert) {
                    thing.GameStarter.shiftVert(thing, thing.parallaxVert * dy, notChanged);
                }
                else {
                    thing.GameStarter.shiftVert(thing, dy, notChanged);
                }
            }
        };
        /**
         * Calls shiftBoth on all members of an Array.
         *
         * @param dx   How far to shift the Things horizontally.
         * @param dy   How far to shift the Things vertically.
         * @param notChanged   Whether to skip marking the Things as changed (by
         *                     default, false).
         */
        GameStartr.prototype.shiftThings = function (things, dx, dy, notChanged) {
            for (var i = things.length - 1; i >= 0; i -= 1) {
                things[i].GameStarter.shiftBoth(things[i], dx, dy, notChanged);
            }
        };
        /**
         * Calls shiftBoth on all groups in the calling GameStartr's GroupHoldr.
         *
         * @param dx   How far to shift the Things horizontally.
         * @param dy   How far to shift the Things vertically.
         */
        GameStartr.prototype.shiftAll = function (dx, dy) {
            var GameStarter = GameStartr.prototype.ensureCorrectCaller(this);
            GameStarter.GroupHolder.callAll(GameStarter, GameStarter.shiftThings, dx, dy, true);
        };
        /**
         * Sets the width and unitwidth of a Thing, and optionally updates the
         * Thing's spritewidth and spritewidth pixels, and/or calls updateSize.
         * The thing is marked as having changed appearance.
         *
         * @param thing
         * @param width   A new width for the Thing.
         * @param updateSprite   Whether to update the Thing's spritewidth and
         *                       spritewidthpixels (by default, false).
         * @param updateSize   Whether to call updateSize on the Thing (by
         *                     default, false).
         */
        GameStartr.prototype.setWidth = function (thing, width, updateSprite, updateSize) {
            thing.width = width;
            thing.unitwidth = width * thing.GameStarter.unitsize;
            if (updateSprite) {
                thing.spritewidth = width;
                thing.spritewidthpixels = width * thing.GameStarter.unitsize;
            }
            if (updateSize) {
                thing.GameStarter.updateSize(thing);
            }
            thing.GameStarter.markChanged(thing);
        };
        /**
         * Sets the height and unitheight of a Thing, and optionally updates the
         * Thing's spriteheight and spriteheight pixels, and/or calls updateSize.
         * The thing is marked as having changed appearance.
         *
         * @param thing
         * @param height   A new height for the Thing.
         * @param updateSprite   Whether to update the Thing's spriteheight and
         *                       spriteheightpixels (by default, false).
         * @param updateSize   Whether to call updateSize on the Thing (by
         *                     default, false).
         */
        GameStartr.prototype.setHeight = function (thing, height, updateSprite, updateSize) {
            thing.height = height;
            thing.unitheight = height * thing.GameStarter.unitsize;
            if (updateSprite) {
                thing.spriteheight = height;
                thing.spriteheightpixels = height * thing.GameStarter.unitsize;
            }
            if (updateSize) {
                thing.GameStarter.updateSize(thing);
            }
            thing.GameStarter.markChanged(thing);
        };
        /**
         * Utility to call both setWidth and setHeight on a Thing.
         *
         * @param thing
         * @param width   A new width for the Thing.
         * @param height   A new height for the Thing.
         * @param updateSprite   Whether to update the Thing's spritewidth,
         *                       spriteheight, spritewidthpixels, and
         *                       spritspriteheightpixels (by default, false).
         * @param updateSize   Whether to call updateSize on the Thing (by
         *                     default, false).
         */
        GameStartr.prototype.setSize = function (thing, width, height, updateSprite, updateSize) {
            thing.GameStarter.setWidth(thing, width, updateSprite, updateSize);
            thing.GameStarter.setHeight(thing, height, updateSprite, updateSize);
        };
        /**
         * Shifts a Thing horizontally by its xvel and vertically by its yvel, using
         * shiftHoriz and shiftVert.
         *
         * @param thing
         */
        GameStartr.prototype.updatePosition = function (thing) {
            thing.GameStarter.shiftHoriz(thing, thing.xvel);
            thing.GameStarter.shiftVert(thing, thing.yvel);
        };
        /**
         * Completely updates the size measurements of a Thing. That means the
         * unitwidth, unitheight, spritewidthpixels, spriteheightpixels, and
         * spriteheightpixels attributes. The Thing's sprite is then updated by the
         * PixelDrawer, and its appearance is marked as changed.
         *
         * @param thing
         */
        GameStartr.prototype.updateSize = function (thing) {
            thing.unitwidth = thing.width * thing.GameStarter.unitsize;
            thing.unitheight = thing.height * thing.GameStarter.unitsize;
            thing.spritewidthpixels = thing.spritewidth * thing.GameStarter.unitsize;
            thing.spriteheightpixels = thing.spriteheight * thing.GameStarter.unitsize;
            thing.canvas.width = thing.spritewidthpixels;
            thing.canvas.height = thing.spriteheightpixels;
            thing.GameStarter.PixelDrawer.setThingSprite(thing);
            thing.GameStarter.markChanged(thing);
        };
        /**
         * Reduces a Thing's width by pushing back its right and decreasing its
         * width. It is marked as changed in appearance.
         *
         * @param thing
         * @param dx   How much to reduce the Thing's width.
         * @param updateSize   Whether to also call updateSize on the Thing
         *                     (by default, false).
         */
        GameStartr.prototype.reduceWidth = function (thing, dx, updateSize) {
            thing.right -= dx;
            thing.width -= dx / thing.GameStarter.unitsize;
            if (updateSize) {
                thing.GameStarter.updateSize(thing);
            }
            else {
                thing.GameStarter.markChanged(thing);
            }
        };
        /**
         * Reduces a Thing's height by pushing down its top and decreasing its
         * height. It is marked as changed in appearance.
         *
         * @param thing
         * @param dy   How much to reduce the Thing's height.
         * @param updateSize   Whether to also call updateSize on the Thing
         *                     (by default, false).
         */
        GameStartr.prototype.reduceHeight = function (thing, dy, updateSize) {
            thing.top += dy;
            thing.height -= dy / thing.GameStarter.unitsize;
            if (updateSize) {
                thing.GameStarter.updateSize(thing);
            }
            else {
                thing.GameStarter.markChanged(thing);
            }
        };
        /**
         * Increases a Thing's width by pushing forward its right and decreasing its
         * width. It is marked as changed in appearance.
         *
         * @param thing
         * @param dx   How much to increase the Thing's width.
         * @param updateSize   Whether to also call updateSize on the Thing
         *                     (by default, false).
         */
        GameStartr.prototype.increaseWidth = function (thing, dx, updateSize) {
            thing.right += dx;
            thing.width += dx / thing.GameStarter.unitsize;
            thing.unitwidth = thing.width * thing.GameStarter.unitsize;
            if (updateSize) {
                thing.GameStarter.updateSize(thing);
            }
            else {
                thing.GameStarter.markChanged(thing);
            }
        };
        /**
         * Reduces a Thing's height by pushing down its top and decreasing its
         * height. It is marked as changed in appearance.
         *
         * @param thing
         * @param dy   How much to increase the Thing's height.
         * @param updateSize   Whether to also call updateSize on the Thing
         *                     (by default, false).
         */
        GameStartr.prototype.increaseHeight = function (thing, dy, updateSize) {
            thing.top -= dy;
            thing.height += dy / thing.GameStarter.unitsize;
            thing.unitheight = thing.height * thing.GameStarter.unitsize;
            if (updateSize) {
                thing.GameStarter.updateSize(thing);
            }
            else {
                thing.GameStarter.markChanged(thing);
            }
        };
        /* Appearance utilities
        */
        /**
         * Generates a key for a Thing based off the Thing's basic attributes.
         * This key should be used for PixelRender.get calls, to cache the Thing's
         * sprite.
         *
         * @param thing
         * @returns A key that to identify the Thing's sprite.
         */
        GameStartr.prototype.generateThingKey = function (thing) {
            return thing.groupType + " " + thing.title + " " + thing.className;
        };
        /**
         * Sets the class of a Thing, sets the new sprite for it, and marks it as
         * having changed appearance. The class is stored in the Thing's internal
         * .className attribute.
         *
         * @param thing
         * @param className   A new .className for the Thing.
         */
        GameStartr.prototype.setClass = function (thing, className) {
            thing.className = className;
            thing.GameStarter.PixelDrawer.setThingSprite(thing);
            thing.GameStarter.markChanged(thing);
        };
        /**
         * A version of setClass to be used before the Thing's sprite attributes
         * have been set. This just sets the internal .className.
         *
         * @param thing
         * @param className   A new .className for the Thing.
         */
        GameStartr.prototype.setClassInitial = function (thing, className) {
            thing.className = className;
        };
        /**
         * Adds a string to a Thing's class after a " ", updates the Thing's
         * sprite, and marks it as having changed appearance.
         *
         * @param thing
         * @param className   A class to add to the Thing.
         */
        GameStartr.prototype.addClass = function (thing, className) {
            thing.className += " " + className;
            thing.GameStarter.PixelDrawer.setThingSprite(thing);
            thing.GameStarter.markChanged(thing);
        };
        /**
         * Adds multiple strings to a Thing's class after a " ", updates the Thing's
         * sprite, and marks it as having changed appearance. Strings may be given
         * as Arrays or Strings; Strings will be split on " ". Any number of
         * additional arguments may be given.
         *
         * @param thing
         * @param classes   Any number of classes to add to the Thing.
         */
        GameStartr.prototype.addClasses = function (thing) {
            var classes = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                classes[_i - 1] = arguments[_i];
            }
            var adder, i, j;
            for (i = 0; i < classes.length; i += 1) {
                adder = classes[i];
                if (adder.constructor === String || typeof adder === "string") {
                    adder = adder.split(" ");
                }
                for (j = adder.length - 1; j >= 0; j -= 1) {
                    thing.GameStarter.addClass(thing, adder[j]);
                }
            }
        };
        /**
         * Removes a string from a Thing's class, updates the Thing's sprite, and
         * marks it as having changed appearance.
         *
         * @param thing
         * @param className   A class to remove from the Thing.
         */
        GameStartr.prototype.removeClass = function (thing, className) {
            if (!className) {
                return;
            }
            if (className.indexOf(" ") !== -1) {
                thing.GameStarter.removeClasses(thing, className);
            }
            thing.className = thing.className.replace(new RegExp(" " + className, "gm"), "");
            thing.GameStarter.PixelDrawer.setThingSprite(thing);
        };
        /**
         * Removes multiple strings from a Thing's class, updates the Thing's
         * sprite, and marks it as having changed appearance. Strings may be given
         * as Arrays or Strings; Strings will be split on " ". Any number of
         * additional arguments may be given.
         *
         * @param thing
         * @param classes   Any number of classes to remove from the Thing.
         */
        GameStartr.prototype.removeClasses = function (thing) {
            var classes = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                classes[_i - 1] = arguments[_i];
            }
            var adder, i, j;
            for (i = 0; i < classes.length; i += 1) {
                adder = classes[i];
                if (adder.constructor === String || typeof adder === "string") {
                    adder = adder.split(" ");
                }
                for (j = adder.length - 1; j >= 0; --j) {
                    thing.GameStarter.removeClass(thing, adder[j]);
                }
            }
        };
        /**
         * @param thing
         * @param className   A class to check for in the Thing.
         * @returns  Whether the Thing's class contains the class.
         */
        GameStartr.prototype.hasClass = function (thing, className) {
            return thing.className.indexOf(className) !== -1;
        };
        /**
         * Removes the first class from a Thing and adds the second. All typical
         * sprite updates are called.
         *
         * @param thing
         * @param classNameOut   A class to remove from the Thing.
         * @param classNameIn   A class to add to the thing.
         */
        GameStartr.prototype.switchClass = function (thing, classNameOut, classNameIn) {
            thing.GameStarter.removeClass(thing, classNameOut);
            thing.GameStarter.addClass(thing, classNameIn);
        };
        /**
         * Marks a Thing as being flipped horizontally by setting its .flipHoriz
         * attribute to true and giving it a "flipped" class.
         *
         * @param thing
         */
        GameStartr.prototype.flipHoriz = function (thing) {
            thing.flipHoriz = true;
            thing.GameStarter.addClass(thing, "flipped");
        };
        /**
         * Marks a Thing as being flipped vertically by setting its .flipVert
         * attribute to true and giving it a "flipped" class.
         *
         * @param thing
         */
        GameStartr.prototype.flipVert = function (thing) {
            thing.flipVert = true;
            thing.GameStarter.addClass(thing, "flip-vert");
        };
        /**
         * Marks a Thing as not being flipped horizontally by setting its .flipHoriz
         * attribute to false and giving it a "flipped" class.
         *
         * @param thing
         */
        GameStartr.prototype.unflipHoriz = function (thing) {
            thing.flipHoriz = false;
            thing.GameStarter.removeClass(thing, "flipped");
        };
        /**
         * Marks a Thing as not being flipped vertically by setting its .flipVert
         * attribute to true and giving it a "flipped" class.
         *
         * @param thing
         */
        GameStartr.prototype.unflipVert = function (thing) {
            thing.flipVert = false;
            thing.GameStarter.removeClass(thing, "flip-vert");
        };
        /**
         * Sets the opacity of the Thing and marks its appearance as changed.
         *
         * @param thing
         * @param opacity   A number in [0,1].
         */
        GameStartr.prototype.setOpacity = function (thing, opacity) {
            thing.opacity = opacity;
            thing.GameStarter.markChanged(thing);
        };
        /* Miscellaneous utilities
        */
        /**
         * Ensures the current object is a GameStartr by throwing an error if it
         * is not. This should be used for Functions in any GameStartr descendants
         * that have to call 'this' to ensure their caller is what the programmer
         * expected it to be.
         *
         * @param current
         */
        GameStartr.prototype.ensureCorrectCaller = function (current) {
            if (!(current instanceof GameStartr)) {
                throw new Error("A function requires the scope ('this') to be the "
                    + "manipulated GameStartr object. Unfortunately, 'this' is a "
                    + typeof (this) + ".");
            }
            return current;
        };
        /**
         * Removes a Thing from an Array using Array.splice. If the thing has an
         * onDelete, that is called.
         *
         * @param thing
         * @param array   The group containing the thing.
         * @param location   The index of the Thing in the Array, for speed's
         *                   sake (by default, it is found using Array.indexOf).
         */
        GameStartr.prototype.arrayDeleteThing = function (thing, array, location) {
            if (location === void 0) { location = array.indexOf(thing); }
            if (location === -1) {
                return;
            }
            array.splice(location, 1);
            if (typeof thing.onDelete === "function") {
                thing.onDelete(thing);
            }
        };
        /**
         * Takes a snapshot of the current screen canvas by simulating a click event
         * on a dummy link.
         *
         * @param name   A name for the image to be saved as.
         * @param format   A format for the image to be saved as (by default, png).
         * @remarks For security concerns, browsers won't allow this unless it's
         *          called within a callback of a genuine user-triggered event.
         */
        GameStartr.prototype.takeScreenshot = function (name, format) {
            if (format === void 0) { format = "image/png"; }
            var GameStarter = GameStartr.prototype.ensureCorrectCaller(this), link = GameStarter.createElement("a", {
                "download": name + "." + format.split("/")[1],
                "href": GameStarter.canvas.toDataURL(format).replace(format, "image/octet-stream")
            });
            link.click();
        };
        /**
         * Adds a set of CSS styles to the page.
         *
         * @param styles   CSS styles represented as JSON.
         */
        GameStartr.prototype.addPageStyles = function (styles) {
            var GameStarter = GameStartr.prototype.ensureCorrectCaller(this), sheet = GameStarter.createElement("style", {
                "type": "text/css"
            }), compiled = "", i, j;
            for (i in styles) {
                if (!styles.hasOwnProperty(i)) {
                    continue;
                }
                compiled += i + " { \r\n";
                for (j in styles[i]) {
                    if (styles[i].hasOwnProperty(j)) {
                        compiled += "  " + j + ": " + styles[i][j] + ";\r\n";
                    }
                }
                compiled += "}\r\n";
            }
            if (sheet.styleSheet) {
                sheet.style.cssText = compiled;
            }
            else {
                sheet.appendChild(document.createTextNode(compiled));
            }
            document.querySelector("head").appendChild(sheet);
        };
        return GameStartr;
    })(EightBittr.EightBittr);
    GameStartr_1.GameStartr = GameStartr;
})(GameStartr || (GameStartr = {}));
