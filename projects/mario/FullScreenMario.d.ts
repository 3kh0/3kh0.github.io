declare module FullScreenMario {
    /**
     * A simple container for Map attributes given by switching to an Area within 
     * that map. A bounding box of the current viewport is kept, along with a bag
     * of assorted variable values.
     */
    export interface IMapScreenr extends MapScreenr.IMapScreenr {
        /**
         * The bottom position to spawn infinitely floating platforms to and from.
         */
        bottomPlatformMax: number;

        /**
         * Whether the screen may current scroll horizontally.
         */
        canscroll: boolean;

        /**
         * How far from the top of the screen Floor objects should be placed.
         */
        floor: number;

        /**
         * How much to increase y-velocity of Characters that aren't resting.
         */
        gravity: number;

        /**
         * A modifier to calculate a jumping Player's y-velocity.
         */
        jumpmod: number;

        /**
         * A singleton Lakitu that may be active in-game.
         */
        lakitu?: ILakitu;

        /**
         * The maximum falling y-velocity for a Player.
         */
        maxyvel: number;

        /**
         * The maximum upward velocity for a jumping Player.
         */
        maxyvelinv: number;

        /**
         * Whether user input keys are currently disabled.
         */
        nokeys: boolean;

        /**
         * Whether decreasing game time is currently disabled.
         */
        notime: boolean;

        /**
         * Whether a Castle loop section has been passed.
         */
        sectionPassed?: boolean;

        /**
         * Whether the game screen is currently spawning CheepCheeps.
         */
        spawningCheeps?: boolean;

        /**
         * Whether the game screen is currently spawning BulletBills.
         */
        spawningBulletBills?: boolean;

        /**
         * Whether the current Area is underwater.
         */
        underwater?: boolean;
    }

    /**
     * A Map parsed from its raw JSON-friendly description.
     */
    export interface IMap extends MapsCreatr.IMapsCreatrMap {
        /**
         * The default location for the Map.
         */
        locationDefault?: string;

        /**
         * A starting seed to initialize random number generation.
         */
        seed?: number | number[];

        /**
         * The default starting time.
         */
        time?: number;
    }

    /**
     * An Area parsed from a JSON-friendly Map description.
     */
    export interface IArea extends MapsCreatr.IMapsCreatrArea {
        /**
         * Any additional attributes that should add extra properties to this Area.
         */
        attributes?: {
            [i: string]: any;
        };

        /**
         * A Location to transport to instead of dieing upon falling through the floor.
         */
        exit?: string | number;

        /**
         * The background color to display behind all Things.
         */
        background: string;

        /**
         * A description of the environment, such as "Overworld".
         */
        setting: string;

        /**
         * A callback to initialize the Area background as a function of its setting.
         * 
         * @param area   The Area having its background set.
         */
        setBackground: (area: IArea) => void;

        /**
         * A callback for when a Player runs out of lives.
         * 
         * @param FSM
         */
        onGameOver: (FSM: IFullScreenMario) => void;

        /**
         * How long to wait before calling onGameOver.
         */
        onGameOverTimeout: number;

        /**
         * A callback for when a Player loses a life (dies).
         * 
         * @param FSM
         */
        onPlayerDeath: (FSM: IFullScreenMario) => void;

        /**
         * How long to wait before calling onPlayerDeath.
         */
        onPlayerDeathTimeout: number;

        /**
         * Components of stretchable Castle sections.
         */
        sections?: any[];

        /**
         * A starting time to use instead of the container Map's.
         */
        time?: number;
    }

    /**
     * A Location parsed from a raw JSON-friendly Map description.
     */
    export interface ILocation extends MapsCreatr.IMapsCreatrLocation {
        /**
         * How far this is from the left-most edge of the parent Area.
         */
        xloc: number;

        /**
         * A Thing to snap a Player and xloc to when spawning at this Location.
         */
        entrance?: IThing;
    }

    /**
     * Current status of device motion across all recognized axis.
     */
    export interface IDeviceMotionStatus {
        /**
         * Whether the device is currently moving to the left.
         */
        motionLeft: boolean;

        /**
         * Whether the device is currently moving to the right.
         */
        motionRight: boolean;

        /**
         * The device's current horizontal acceleration.
         */
        x: number;

        /**
         * The device's current vertical acceleration.
         */
        y: number;

        /**
         * How much the vertical acceleration has changed since the last upkeep.
         */
        dy: number;
    }

    /**
     * A position holder around an in-game Thing.
     */
    export interface IPreThing extends MapsCreatr.IPreThing {
        /**
         * The in-game Thing.
         */
        thing: IThing;
    }

    /**
     * An in-game Thing with size, velocity, position, and other information.
     */
    export interface IThing extends GameStartr.IThing {
        /**
         * The parent IFullScreenMario controlling this Thing.
         */
        FSM: IFullScreenMario;

        /**
         * Whether this is currently alive and able to move.
         */
        alive: boolean;

        /**
         * Whether this has been killed.
         */
        dead?: boolean;

        /**
         * Whether this is "flickering" (switching hidden on and off).
         */
        flickering?: boolean;

        /**
         * How many quadrants this is currently a member of.
         */
        numquads: number;

        /**
         * Whether this is allowed to exist outside the Quadrant boundaries, as
         * `true` for when to the right of the delx, or `2` for always.
         */
        outerok: boolean | number;

        /**
         * Whether this is allowed to fall due to gravity.
         */
        nofall?: boolean;

        /**
         * Scratch variable for whether this is allowed to fall due to gravity.
         */
        nofallOld?: boolean;

        /**
         * Whether this is barred from colliding with other Things.
         */
        nocollide?: boolean;

        /**
         * Scratch flag for whether this is barred from colliding with other Things.
         */
        nocollideOld?: boolean;

        /**
         * Scratch storage for the normal Function to move during an upkeep event.
         */
        movementOld?: Function;

        /**
         * Other Things in the same collection as this one.
         */
        partners?: {
            [i: string]: IThing
        };

        /**
         * Whether to shift this to the "beginning" or "end" of its Things group.
         */
        position?: string;

        /**
         * Horizontal tolerance for not colliding with another Thing.
         */
        tolx: number;

        /**
         * Vertical tolerance for not colliding with another Thing.
         */
        toly: number;

        /**
         * Original x-position, copied from the PreThing settings.
         */
        x: number;

        /**
         * Original y-position, copied from the PreThing settings.
         */
        y: number;
    }

    /**
     * An in-game Thing that can float up and down.
     */
    export interface IThingFloating extends IThing {
        /**
         * The beginning y-position of floatation.
         */
        begin: number;

        /**
         * The end y-position of floatation.
         */
        end: number;

        /**
         * The maximum velocity of floatation.
         */
        maxvel: number;
    }

    /**
     * An in-game Thing that can float side to side.
     */
    export interface IThingSliding extends IThing {
        /**
         * The beginning x-position of floatation.
         */
        begin: number;

        /**
         * The end x-position of floatation.
         */
        end: number;

        /**
         * The maximum velocity of floatation.
         */
        maxvel: number;
    }

    /**
     * An in-game Thing wrapping around some number of Text Things.
     */
    export interface ICustomText extends IThing {
        /**
         * Children Text Things spawned as characters.
         */
        children: IText[];

        /**
         * What type of text the children should be, as "", "Colored", "Large", or "Huge".
         */
        size: string;

        /**
         * How much horizontal space to put between children.
         */
        spacingHorizontal: number;

        /**
         * How much vertical space to put between lines of children.
         */
        spacingVertical: number;

        /**
         * How much vertical space to use when a blank line is given.
         */
        spacingVerticalBlank: number;

        /**
         * Any additional attributes to give to children.
         */
        textAttributes?: any;

        /**
         * Raw descriptions of text to display as children Text Things.
         */
        texts: ICustomTextInfo[];
    }

    /**
     * A line of text in a CustomText Thing.
     */
    export interface ICustomTextInfo {
        /**
         * The line of text to display.
         */
        text: string;

        /**
         * How much horizontal offset to put before the line of text.
         */
        offset: number;
    }

    /**
     * A single character of text in a line of characters.
     */
    export interface IText extends IThing {
        /**
         * What type of text this is, as "", "Colored", "Large", or "Huge".
         */
        size: string;
    }

    /**
     * Text title replacements for Text Things.
     */
    export interface ITextMappings {
        [i: string]: string;
    }

    /**
     * A solid Thing that may be rested upon or bumped into.
     */
    export interface ISolid extends IThing {
        /**
         * A callback for when a Player actively runs into this from the left.
         * 
         * @param thing   The Character running into other from the left.
         * @param other   The Solid being run into by thing.
         * @param transport   Other's transport property, if it exists.
         */
        actionLeft?: (thing: ICharacter, other: ISolid, transport?: any) => void;

        /**
         * A callback for when a Player actively attemps to crouch on top of this.
         * 
         * @param thing   The Character crouching on other.
         * @param other   The Solid being crouched on by thing.
         * @param transport   Other's transport property, if it exists.
         */
        actionTop?: (thing: ICharacter, other: ISolid, transport?: any) => void;

        /**
         * A Character holding onto this, such as with a Vine or Flagpole.
         */
        attachedCharacter?: ICharacter;

        /**
         * A callback for when a Player jumps up and hits the bottom of this.
         * 
         * @param thing   The Character bumping into other from the bottom.
         * @param other   The Solid being run into by thing.
         */
        bottomBump?: (thing: ISolid, other: ICharacter) => void;

        /**
         * A callback for when a Character collides with this.
         * 
         * @param thing   The Character colliding into other.
         * @param other   The Solid being collided into by thing.
         */
        collide: (thing: ICharacter, other: ISolid) => void;

        /**
         * Whether this can be collided with while hidden.
         */
        collideHidden?: boolean;

        /**
         * Whether this should be killed when a level is completed, either as a Boolean
         * for true/false or a callback Function to do so.
         */
        killonend?: boolean | { (thing: ISolid, group: ISolid[], i: number): void };

        /**
         * A callback for when a Character starts resting on this.
         * 
         * @param thing   The Character now resting on other.
         * @param other   The Solid being rested on by thing.
         */
        onRestedUpon?: (thing: ISolid, other: ICharacter) => void;

        /**
         * Whether this is a solid (always true for Solids, but not for other Things).
         */
        solid: boolean;

        /**
         * A Map and/or Location transportation description to take a Player to when
         * a transportation action is triggered.
         */
        transport?: any;

        /**
         * A Character that bottom-bumped this Solid into being "up".
         */
        up?: ICharacter;
    }

    /**
     * A Brick Solid.
     */
    export interface IBrick extends ISolid {
        /**
         * Whether this is currently breakable.
         */
        breakable: boolean;

        /**
         * Name of a Thing held inside.
         */
        contents?: string;

        /**
         * Whether this has coins and the last one has been reached.
         */
        lastcoin?: boolean;

        /**
         * Whether this has been used up.
         */
        used: boolean;
    }

    /**
     * A Block Solid.
     */
    export interface IBlock extends ISolid {
        /**
         * Name of a Thing held inside, if not "Coin".
         */
        contents: string;

        /**
         * Whether this has been used up.
         */
        used: boolean;
    }

    /**
     * A Cannon solid.
     */
    export interface ICannon extends ISolid {
        /**
         * How often this should fire a BulletBill.
         */
        frequency: number;

        /**
         * Whether this should never fire a BulletBill.
         */
        noBullets?: boolean;
    }

    /**
     * A CastleAxe Solid.
     */
    export interface ICastleAxe extends ISolid { }

    /**
     * A CastleBlock Solid, which may have a line Fireballs rotating around it.
     */
    export interface ICastleBlock extends ISolid {
        /**
         * What angle the attached line Fireballs are facing.
         */
        angle?: number;

        /**
         * The direction of Fireball spinning, as -1 for counter-clockwise or 1 
         * for clockwise (by default, clockwise).
         */
        direction: number;

        /**
         * How rapidly the Fireballs are rotating (difference in theta).
         */
        dt?: number;

        /**
         * How many Fireballs should extend from this.
         */
        fireballs: number;

        /**
         * How rapidly change the Fireball line's angle, as 7 / Math.abs(speed).
         */
        speed: number;
    }

    /**
     * An activateable detector Solid. After a single activation, it will kill itself.
     */
    export interface IDetector extends ISolid {
        /**
         * Callback for when a Thing activates this.
         * 
         * @param thing   The Thing that activated this.
         */
        activate(thing: IThing): void;
    }

    /**
     * A collision detector Solid for when a Player collides with this.
     */
    export interface IDetectCollision extends IDetector {
        /**
         * A callback for when a non-Player Character collides with this,
         * called from activate instead of Player functionality.
         * 
         * @param thing   The Character activating this detector.
         */
        activateFail?: (thing: ICharacter) => void;

        /**
         * A callback for when a Character collides with this.
         * 
         * @param thing   The Character activating other.
         * @param other   The detector being activated by thing.
         */
        activate: (thing: ICharacter, other?: IDetectCollision) => void;

        /**
         * Whether this should abstain from killing itself after an activation.
         */
        noActivateDeath?: boolean;
    }

    /**
     * A detector that activates itself when it scrolls into view.
     */
    export interface IDetectWindow extends IDetector {
        /**
         * Callback for when this scrolls into view.
         * 
         * @param thing   This window detector.
         */
        activate(thing: IThing): void;
    }

    /**
     * A window detector that decides which looping Castle sub-section to spawn.
     */
    export interface ISectionDetector extends IDetectWindow {
        /**
         * The section whose sub-sections are to be chosen from.
         */
        section: number;
    }

    /**
     * A window detector that spawns a random map section.
     */
    export interface IRandomSpawner extends IDetectWindow {
        /**
         * The name of the possibilities container to spawn from.
         */
        randomization: string;

        /**
         * The top boundary for the randomization area.
         */
        randomTop: number;

        /**
         * The right boundary for the randomization area.
         */
        randomRight: number;

        /**
         * The bottom boundary for the randomization area.
         */
        randomBottom: number;

        /**
         * How wide the randomization area should be.
         */
        randomWidth: number;
    }

    /**
     * A window detector that immediately disables window scrolling.
     */
    export interface IScrollBlocker extends IDetectWindow {
        /**
         * Whether this has more than scrolled into view, and should trigger
         * a reverse scroll to compensate.
         */
        setEdge: boolean;
    }

    /**
     * A Pipe Solid.
     */
    export interface IPipe extends ISolid { }

    /**
     * A Platform Solid that may be floating, sliding, a transport, a falling trigger,
     * or a part of a partner-based Scale.
     */
    export interface IPlatform extends ISolid {
        /**
         * How much this is currently accelerating downward.
         */
        acceleration?: number;

        /**
         * Whether this has gone far enough down to be in a free-fall.
         */
        freefall?: boolean;

        /**
         * The y-velocity to start falling down, if a falling trigger.
         */
        fallThresholdStart?: number;

        /**
         * The maximum velocity achievable when in free fall.
         */
        fallThresholdEnd?: number;

        /**
         * The total y-velocity in this Platform, which is the inverse of
         * a Scale group's partner platform.
         */
        tension?: number;

        /**
         * Partners in a Scale group.
         */
        partners?: {
            /**
             * This Platform's String Scenery.
             */
            ownString: IScenery;

            /**
             * The partner Platform.
             */
            partnerPlatform: IPlatform;

            /**
             * The partner Platform's String Scenery.
             */
            partnerString: IScenery;

            [i: string]: IScenery | IPlatform;
        };
    }

    /**
     * A normally-invisible Solid to catch a respawning Player.
     */
    export interface IRestingStone extends ISolid {
        /**
         * Whether a Player has landed on this.
         */
        activated: boolean;
    }

    /**
     * A bouncy Springboard Solid.
     */
    export interface ISpringboard extends ISolid {
        /**
         * Scratch variable for the normal height of this Springboard.
         */
        heightNormal: number;

        /**
         * How much tension a Player's vertical velocity has added to this.
         */
        tension: number;

        /**
         * Scratch variable for how much tension a Player's vertical velocity has
         * added to this.
         */
        tensionSave?: number;
    }

    /**
     * A Vine Solid.
     */
    export interface IVine extends ISolid {
        /**
         * The Solid this Vine is growing out of.
         */
        attachedSolid: ISolid;

        /**
         * How rapidly this Vine should grow.
         */
        speed: number;
    }

    /**
     * A Character Thing.
     */
    export interface ICharacter extends IThing {
        /**
         * Whether this shouldn't be killed by "up" Solids.
         */
        allowUpSolids?: boolean;

        /**
         * A callback to animate this, such as when emerging from a Solid.
         * 
         * @param thing   The Charater being animated.
         * @param other   An optional Solid used as the animation source.
         */
        animate?: (thing: ICharacter, other?: ISolid) => void;

        /**
         * If this was spawned as a Solid's contents, the spawning Solid.
         */
        blockparent?: ISolid;

        /**
         * Whether this should check for any overlapping Solids.
         */
        checkOverlaps?: boolean;

        /**
         * A callback for when this collides with another Thing.
         * 
         * @param thing   The "primary" (first) Thing colliding.
         * @param other   The "secondary" (second) Thing colliding.
         */
        collide?: (thing: IThing, other: IThing) => void;

        /**
         * Whether this should always be the first Thing in collide arguments.
         */
        collidePrimary?: boolean;

        /**
         * A callback for when this dies.
         * 
         * @param thing   The dieing Thing.
         * @param severity   How severe the death is, as 1 for normal or 2 for instant.
         */
        death: (thing: IThing, severity?: number) => void;

        /**
         * What direction this is facing.
         */
        direction: number;

        /**
         * A callback for when this has finished emerging from a spawning Solid.
         * 
         * @param thing   This Character.
         * @param other   The spawning Solid.
         */
        emergeOut?: (thing: ICharacter, other: ISolid) => void;

        /**
         * How much to increase this Character's y-velocity each upkeep while falling.
         */
        gravity?: number;

        /**
         * How high to jump, if movement is moveJumping.
         */
        jumpheight?: number;

        /**
         * Whether this is currently visually looking to the left.
         */
        lookleft: boolean;

        /**
         * A callback to kill this Character on end, instead of killNormal.
         * 
         * @param thing   The Thing being killed on end.
         */
        killonend?: (thing: IThing) => void;

        /**
         * Whether this is a Player.
         */
        player?: boolean;

        /**
         * Whether this is currently facing to the left (by default, false).
         */
        moveleft: boolean;

        /**
         * Whether this is barred from colliding with other Characters.
         */
        nocollidechar?: boolean;

        /**
         * Whether this is barred from colliding with Player Characters.
         */
        nocollideplayer?: boolean;

        /**
         * Whether this is barred from colliding with Solids.
         */
        nocollidesolid?: boolean;

        /**
         * Whether this is resistant to fire, as 1 for ignoring it and 2 for Fireballs
         * blowing up upon collision.
         */
        nofire?: number;

        /**
         * Whether this has a custom death handler for when hit by a Fireball, such as
         * Koopas spawning shells.
         */
        nofiredeath?: boolean;

        /**
         * Whether this ignores visual horizontal flipping during moveSimple.
         */
        noflip?: boolean;

        /**
         * Whether this should skip being killed upon level completion.
         */
        nokillend?: boolean;

        /**
         * Whether this should ignore its movement Function during upkeeps.
         */
        nomove?: boolean;

        /**
         * A callback for when this is hit by an "up" Solid.
         * 
         * @param thing   This Character.
         * @param other   The "up" Solid hitting this Character.
         */
        onCollideUp?: (thing: ICharacter, other: ISolid) => void;

        /**
         * A callback for when this starts resting on a Solid.
         * 
         * @param thing   This Character.
         * @param other   The Solid now being rested upon.
         */
        onResting?: (thing: ICharacter, other: ISolid) => void;

        /**
         * A callback for when this stops resting on a Solid.
         *
         * @param thing   This Character.
         * @param other   The Solid no longer being rested upon.
         */
        onRestingOff?: (character: ICharacter, other: ISolid) => void;

        /**
         * Any Solids whose bounding boxes overlap this Character's.
         */
        overlaps?: ISolid[];

        /**
         * A Solid this is resting upon.
         */
        resting?: ISolid;

        /**
         * Points given for killing this by hitting an "up" Solid into it.
         */
        scoreBelow: number;

        /**
         * Points given for killing this by shooting a Fireball into it.
         */
        scoreFire: number;

        /**
         * Points given for killing this by running into it using Star power.
         */
        scoreStar: number;

        /**
         * Whether this is a Shell Thing.
         */
        shell?: boolean;

        /**
         * Whether this should spawn another Thing when killed by a moving Shell.
         */
        shellspawn?: boolean;

        /**
         * What type of Shell to spawn when killed.
         */
        shelltype?: string;

        /**
         * Whether this is "smart" (will not walk off cliffs).
         */
        smart?: boolean;

        /**
         * What type of Thing to typically spawn when killed.
         */
        spawnType?: string;

        /**
         * Any additional settings to give to a spawned Thing.
         */
        spawnSettings?: any;

        /**
         * How fast this moves.
         */
        speed: number;

        /**
         * Solids touching this Character's top.
         */
        under?: ISolid[];

        /**
         * A Solid touching this Character's top and above its horizontal center.
         */
        undermid?: ISolid;
    }

    /**
     * A Character that's overlapping with any number of Solids.
     */
    export interface ICharacterOverlapping extends ICharacter {
        /**
         * The horizontal location to check overlaps at.
         */
        overlapCheck: number;

        /**
         * The horizontal goal to slide to for removing overlaps.
         */
        overlapGoal: number;

        /**
         * Whether overlap correction should move this to the right.
         */
        overlapGoRight: boolean;
    }

    /**
     * A falling shard of a Brick.
     */
    export interface IBrickShard extends ICharacter { }

    /**
     * A Castle Fireball.
     */
    export interface ICastleFireball extends ICharacter { }

    /**
     * A malicious enemy Character.
     */
    export interface IEnemy extends ICharacter {
        /**
         * Whether this will kill a Player on contact, even if stepped on.
         */
        deadly?: boolean;

        /**
         * Whether this is an Enemy (true for all Enemy Characters).
         */
        enemy?: boolean;

        /**
         * Whether this ignores collisions with Star power Players.
         */
        nostar?: boolean;

        /**
         * Whether this is a Shell.
         */
        shell?: boolean;
    }

    /**
     * A Blooper Character.
     */
    export interface IBlooper extends IEnemy {
        /**
         * How long this Blooper has been squeezing itself to go down.
         */
        squeeze: number;

        /**
         * A general movement counter for moveBlooper.
         */
        counter: number;
    }

    /**
     * A piece of fire emitted by Bowser's mouth.
     */
    export interface IBowserFire extends IEnemy {
        /**
         * A target y-position to navigate to.
         */
        ylev: number;
    }

    /**
     * A BulletBill Character.
     */
    export interface IBulletBill extends IEnemy { }

    /**
     * A CheepCheep Character
     */
    export interface ICheepCheep extends IEnemy {
        /**
         * Whether this is gracefully flying through the air instead of swimming.
         */
        flying: boolean;
    }

    /**
     * A player-emited Fireball Enemy.
     */
    export interface IFireball extends IEnemy { }

    /**
     * A Goomba Enemy.
     */
    export interface IGoomba extends IEnemy { }

    /**
     * A HammerBro Enemy.
     */
    export interface IHammerBro extends IEnemy {
        /**
         * A general counter for movePacing.
         */
        counter: number;

        /**
         * Whether this is falling down a level.
         */
        falling: boolean;
    }

    /**
     * A Bowser Enemy.
     */
    export interface IBowser extends IHammerBro {
        /**
         * How many times this has been hit with a Player's Fireball.
         */
        deathcount: number;

        /**
         * Delays for shooting BowserFires.
         */
        fireTimes: number[];

        /**
         * Delays for jumping into the air.
         */
        jumpTimes: number[];

        /**
         * Whether this should skip throwing Hammers.
         */
        nothrow: boolean;

        /**
         * How many hammers to throw.
         */
        throwAmount?: number;

        /**
         * How long to delay between throwing Hammers.
         */
        throwBetween?: number;

        /**
         * How long to delay before throwing Hammers.
         */
        throwDelay?: number;

        /**
         * How many hammers to throw each cycle.
         */
        throwPeriod?: number;

        /**
         * Whether this is currently throwing Hammers.
         */
        throwing: boolean;
    }

    /**
     * A Koopa Enemy.
     */
    export interface IKoopa extends IEnemy {
        /**
         * Whether this is currently floating through the air.
         */
        floating: boolean;

        /**
         * Whether this is currently flapping wings to jump around.
         */
        jumping: boolean;
    }

    /**
     * A Lakitu Enemy.
     */
    export interface ILakitu extends IEnemy {
        /**
         * A standard counter for movePacing.
         */
        counter: number;

        /**
         * Whether this is fleeing to the left edge of the screen.
         */
        fleeing?: boolean;
    }

    /**
     * A Piranha enemy.
     */
    export interface IPiranha extends IEnemy {
        /**
         * A standard counter for movePiranha.
         */
        counter: number;

        /**
         * How long to wait before switching direction after a pause.
         */
        countermax: number;

        /**
         * What direction this is currently facing, as 1 (up) or -1 (down).
         */
        direction: number;

        /**
         * Whether this was spawned as part of a Pipe.
         */
        onPipe: boolean;
    }

    /**
     * A Podoboo Enemy.
     */
    export interface IPodoboo extends IEnemy {
        /**
         * How often this should jump.
         */
        frequency: number;

        /**
         * How high this should jump.
         */
        jumpHeight: number;

        /**
         * The recorded starting y-location.
         */
        starty: number;
    }

    /**
     * A SpinyEgg Enemy.
     */
    export interface ISpinyEgg extends IEnemy { }

    /**
     * A Spiny Enemy hatched from a SpinyEgg.
     */
    export interface ISpiny extends IEnemy { }

    /**
     * An item Players may interact with, such as power-ups.
     */
    export interface IItem extends ICharacter {
        /**
         * A callback for when a Player interacts with this item.
         * 
         * @param thing   A Player that just triggered this Item.
         * @param other   This Item being triggered.
         */
        action?: (thing: IPlayer, other: IItem) => void;

        /**
         * Whether this is an Item (always true for Items).
         */
        item?: boolean;
    }

    /**
     * A Coin Item that gives a Player a point when touched.
     */
    export interface ICoin extends IItem {
        /**
         * Animation callback for when this is bumped by a Solid.
         *
         * @param thing   The Soin being bumped by other.
         * @param other   The Solid bumping thing.
         */
        animate(thing: ICoin, other: ISolid): void;
    }

    /**
     * A Shell that may be kicked by a Player into Characters.
     */
    export interface IShell extends IItem {
        /**
         * A counter for when this will turn back into its source Enemy.
         */
        counting: number;

        /**
         * How many Enemies this has killed.
         */
        enemyhitcount: number;

        /**
         * How many times a Player has hit this.
         */
        hitcount: number;

        /**
         * Whether a Player is currently landing on this.
         */
        landing: number;

        /**
         * Whether this is about to turn back into its source Enemy.
         */
        peeking: number;

        /**
         * When colliding with another Shell, whether this is to the left.
         */
        shelltoleft: boolean;

        /**
         * Whether this comes from a "smart" Koopa.
         */
        smart?: boolean;

        /**
         * Settings to pass onto an Enemy if turned back into one.
         */
        spawnSettings?: {
            /**
             * Whether this comes from a "smart" Koopa.
             */
            smart?: boolean;
        };
    }

    /**
     * A Star Item that grants a Player temporary invincibility.
     */
    export interface IStar extends IItem {
        /**
         * Whether this is a star (useful for collision checks).
         */
        star: boolean;
    }

    /**
     * A user-controlled Player Character.
     */
    export interface IPlayer extends ICharacter {
        /**
         * Whether this is currently climbing a Solid.
         */
        animatedClimbing?: boolean;

        /**
         * What direction an attached Solid is, as -1 (left) or 1 (right).
         */
        attachedDirection?: number;

        /**
         * Whether this is to the left of a colliding climbable Solid.
         */
        attachedLeft?: boolean;

        /**
         * A Solid this is climbing.
         */
        attachedSolid?: ISolid;

        /**
         * How far this must be from an attached Solid to remove itself.
         */
        attachedOff?: number;

        /**
         * Whether this is currently allowed to jump.
         */
        canjump?: boolean;

        /**
         * Whether this is currently climbing a Solid.
         */
        climbing?: boolean;

        /**
         * Whether this is currently crouching.
         */
        crouching: boolean;

        /**
         * Whether this was just killed and is now dieing.
         */
        dieing?: boolean;

        /**
         * A callback for when this Player shoots a Fireball.
         * 
         * @param player   The Player shooting a Fireball.
         */
        fire: (player: IPlayer) => void;

        /**
         * Retrieval Function for a new user keys description.
         * 
         * @returns A new descriptor Object for a user's keys.
         */
        getKeys: () => IPlayerKeys;

        /**
         * Whether this is currently hopping on an enemy.
         */
        hopping?: boolean;

        /**
         * How many enemies this has jumped on without touching a Solid.
         */
        jumpcount: number;

        /**
         * How many simultaneous enemies this is currently jumping on.
         */
        jumpers?: number;

        /**
         * Whether this is currently jumping through the air.
         */
        jumping?: boolean;

        /**
         * A descriptor for a user's key's statuses.
         */
        keys: IPlayerKeys;

        /**
         * A maximum speed for this Player to run.
         */
        maxspeed: number;

        /**
         * Scratch variable to store maxspeed.
         */
        maxspeedsave?: number;

        /**
         * How many Fireballs this Player has dropped.
         */
        numballs: number;

        /**
         * Whether this is currently paddling through water.
         */
        paddling?: boolean;

        /**
         * Whether this currently has an animation cycle for paddling.
         */
        paddlingCycle?: boolean;

        /**
         * Whether this is currently moving into or out of a Pipe.
         */
        piping?: boolean;

        /**
         * How strong this is, as 1 (normal), 2 (big), or 3 (fiery).
         */
        power: number;

        /**
         * Whether this is currently running.
         */
        running: boolean;

        /**
         * A maximum scrolling speed for a window.
         */
        scrollspeed: number;

        /**
         * Whether this is currently skidding visually.
         */
        skidding?: boolean;

        /**
         * Whether this is increasing in power due to a Mushroom.
         */
        shrooming?: boolean;

        /**
         * An attached SpringBoard being jumped on.
         */
        spring?: ISpringboard;

        /**
         * A counter of how many Star power-ups this has collected that
         * are still active.
         */
        star: number;

        /**
         * Whether this is currently swimming, and possible paddling.
         */
        swimming?: boolean;

        /**
         * Scratch variable for tolx.
         */
        tolxOld?: number;

        /**
         * Scratch variable for toly.
         */
        tolyOld?: number;

        /**
         * Maximum speed to walk at during cutscenes.
         */
        walkspeed: number;
    }

    /**
     * A descriptor for a user's keys' statuses.
     */
    export interface IPlayerKeys {
        /**
         * Whether the user is indicating a crouch.
         */
        crouch: boolean;

        /**
         * Whether the user is indicating a jump.
         */
        jump: boolean;

        /**
         * How strongly the user is indicating a jump.
         */
        jumplev: number;

        /**
         * Whether the left key is being pressed.
         */
        leftDown?: boolean;

        /**
         * Whether the right key is being pressed.
         */
        rightDown?: boolean;

        /**
         * Whether either the left or right keys are being pressed.
         */
        run: number;

        /**
         * Whether the sprint key is being pressed.
         */
        sprint: boolean;

        /**
         * Whether the up key is being pressed.
         */
        up: boolean;
    }

    /**
     * A decorative Scenery Thing.
     */
    export interface IScenery extends IThing { }

    /**
     * A Firework Scenery that may animate an explosion.
     */
    export interface IFirework extends IScenery {
        /**
         * Animates an explosion of the Firework.
         * 
         * @param thing   The exploding Firework.
         */
        animate(thing: IFirework): void;
    }

    /**
     * General-purpose settings for macros.
     */
    export interface IMacroSettings {
        /**
         * The x-location (by default, 0).
         */
        x?: number;

        /**
         * The y-location (by default, 0).
         */
        y?: number;

        [i: string]: any;
    }

    /**
     * Settings for a FillPreThings macro.
     */
    export interface IMacroFillPreThingsSettings extends IMacroSettings {
        /**
         * The name of the Thing to fill, such as "Brick".
         */
        thing: string;

        /**
         * How many times to repeat the Thing horizontally to the
         * right (by default, 1).
         */
        xnum?: number;

        /**
         * How many times to repeat the Thing vertically upwards
         * (by default, 1).
         */
        ynum?: number;

        /**
         * How many units are between the left edges of placed
         * Things horizontally (by default, 0).
         */
        xwidth?: number;

        /**
         * How many units are between the top edges of placed
         * Things vertically (by default, 0).
         */
        yheight?: number;
    }

    /**
     * Settings for a FillPrePattern macro.
     */
    export interface IMacroFillPrePatternSettings extends IMacroSettings {
        /**
         * The name of the pattern to print, from the listing in
         * FSM.settings.maps.patterns.
         */
        pattern: string;

        /**
         * How many times to repeat the overall pattern (by 
         * default, 1).
         */
        repeat?: number;

        /**
         * Numbered items to skip, if any.
         */
        skips?: number[];
    }

    /**
     * Settings for a Floor macro.
     */
    export interface IMacroFloorSettings extends IMacroSettings {
        /**
         * How wide the Floor should be (by default, 8).
         */
        width?: number;
    }

    /**
     * Settings for a Pipe macro.
     */
    export interface IMacroPipeSettings extends IMacroSettings {
        /**
         * How high the Pipe should be, as a Number or "Infinity"
         * (by default, 8).
         */
        height?: number | string;

        /**
         * Whether there should be a Piranha spawning with the
         * Pipe (by default, false).
         */
        piranha?: boolean;

        /**
         * What location the Pipe should transport to (by default,
         * none).
         */
        transport?: any;

        /**
         * What location the Pipe should act as an entrance to (by
         * default, none).
         */
        entrance?: any;
    }

    /**
     * Settings for a PipeCorner macro.
     */
    export interface IMacroPipeCornerSettings extends IMacroSettings {
        /**
         * How high the Pipe should be (by default, 8).
         */
        height: number;

        /**
         * What location the Pipe should transport to (by default,
         * none).
         */
        transport?: any;

        /**
         * Whether there should be a ScrollEnabler placed on top of
         * the PipeVertical (by default, false).
         */
        scrollEnabler?: boolean;

        /**
         * Whether there should be a ScrollBlocker placed on top of
         * the PipeVertical (by default, false).
         */
        scrollBlocker?: boolean;
    }

    /**
     * Settings for a Tree macro.
     */
    export interface IMacroTreeSettings extends IMacroSettings {
        /**
         * How wide the Tree should be (preferably a multiple of 8).
         */
        width: number;

        /**
         * Whether the trunk scenery should be listed in the Solids
         * group instead of Scenery, to keep it in front of clouds
         * (by default, false).
         */
        solidTrunk?: boolean;
    }

    /**
     * Settings for a Shroom macro.
     */
    export interface IMacroShroomSettings extends IMacroSettings {
        /**
         * How wide the Shroom should be (preferably a multiple of 8).
         */
        width: number;

        /**
         * Whether the trunk scenery should be listed in the Solids
         * group instead of Scenery, to keep it in front of clouds
         * (by default, false).
         */
        solidTrunk?: boolean;
    }

    /**
     * Settings for a Water macro.
     */
    export interface IMacroWaterSettings extends IMacroSettings {
        /**
         * How wide the Water should be.
         */
        width: number;
    }

    /**
     * Settings for a Ceiling macro.
     */
    export interface IMacroCeilingSettings extends IMacroSettings {
        /**
         * How wide the ceiling should be.
         */
        width: number;
    }

    /**
     * Settings for a Bridge macro.
     */
    export interface IMacroBridgeSettings extends IMacroSettings {
        /**
         * How wide the bridge should be (by default, 16).
         */
        width?: number;

        /**
         * Whether the first 8 units should be taken up by an infinitely
         * high Stone column (by default, false).
         */
        begin?: boolean;

        /**
         * Whether the last 8 units should be taken up by an infinitely
         * high Stone column (by default, false).
         */
        end?: boolean;
    }

    /**
     *
     */
    export interface IMacroScaleSettings extends IMacroSettings {
        /**
         * How wide the left Platform should be (by default, 24).
         */
        widthLeft?: number;

        /**
         * How wide the right Platform should be (by default, 24).
         */
        widthRight?: number;

        /**
         * How much space there should be between Platforms (by
         * default, 40).
         */
        between?: number;

        /**
         * How far down from y the left Platform should start (by
         * default, 24).
         */
        dropLeft?: number;

        /**
         * How far down from y the right Platform should start (by
         * default, 24).
         */
        dropRight?: number;
    }

    /**
     * Settings for a PlatformGenerator macro.
     */
    export interface IMacroPlatformGeneratorSettings extends IMacroSettings {
        /**
         * What direction to travel, as -1 for up or 1 for down (by 
         * default, 1).
         */
        direction?: number;

        /**
         * How wide the Platforms should be (by default, 16).
         */
        width?: number;
    }

    /**
     * Settings for a WarpWorld macro.
     */
    export interface IMacroWarpWorldSettings extends IMacroSettings {
        /**
         * Names of maps the Pipes should warp to, in order.
         */
        warps: string[];

        /**
         * How far above the Piranhas to place the CustomText labels
         * (by default, 8).
         */
        textHeight?: number;
    }

    /**
     * Settings for a CheepsStart macro.
     */
    export interface IMacroCheepsStartSettings extends IMacroSettings {
        /**
         * How wide the detector should be (by default, 8).
         */
        width?: number;
    }

    /**
     * Settings for a CheepsStop macro.
     */
    export interface IMacroCheepsStopSettings extends IMacroSettings {
        /**
         * How wide the detector should be (by default, 8).
         */
        width?: number;
    }

    /**
     * Settings for a BulletBillsStart macro.
     */
    export interface IMacroBulletBillsStartSettings extends IMacroSettings {
        /**
         * How wide the detector should be (by default, 8).
         */
        width?: number;
    }

    /**
     * Settings for a BulletBillsStop macro.
     */
    export interface IMacroBulletBillsStopSettings extends IMacroSettings {
        /**
         * How wide the detector should be (by default, 8).
         */
        width?: number;
    }

    /**
     * Settings for a LakituStop macro.
     */
    export interface IMacroLakituStopSettings extends IMacroSettings {
        /**
         * How wide the detector should be (by default, 8).
         */
        width?: number;
    }

    /**
     * Settings for a CastleSmall or CastleLarge macro.
     */
    export interface IMacroCastleSettings extends IMacroSettings {
        /**
         * What map or location to shift to after ending theatrics.
         */
        transport: any;

        /**
         * How many CastleWalls should be placed to the right of the castle
         * (by default, 2).
         */
        walls?: number;
    }

    /**
     * Settings for a StartInsideCastle macro.
     */
    export interface IMacroStartInsideCastleSettings extends IMacroSettings {
        /**
         * How wide the starting zone should be (by default, 40).
         */
        width?: number;
    }

    /**
     * Settings for an EndOutsideCastle macro.
     */
    export interface IMacroEndOutsideCastleSettings extends IMacroSettings {
        /**
         * Where to transport to after ending theatrics.
         */
        transport: any;

        /**
         * Whether this should place a large castle instead of a small
         * (by default, false).
         */
        large?: boolean;

        /**
         * How far from the flagpole to the castle (by default, 24 for large
         * castles and 32 for small).
         */
        castleDistance?: number;

        /**
         * For large castles, how many CastleWall Things should be placed
         * after (by default, 2).
         */
        walls?: number;
    }

    /**
     *
     */
    export interface IMacroEndInsideCastleSettings extends IMacroSettings {
        /**
         * Where to transport to after ending theatrics.
         */
        transport: any;

        /**
         * Which NPC to use, as "Toach" or "Peach" (by default, "Toad").
         */
        npc?: string;

        /**
         * Whether Bowser should be in "hard" mode (by default, false).
         */
        hard?: boolean;

        /**
         * What Bowser's spawnType should be (by default, "Goomba").
         */
        spawnType?: string;

        /**
         * Whether Bowser is also throwing hammers (by default, false).
         */
        throwing?: boolean;

        /**
         * Whether a ScrollEnabler should be added above (by default, false).
         */
        topScrollEnabler?: boolean;
    }

    /**
     * Settings for a SectionPass macro.
     */
    export interface IMacroSectionPassSettings extends IMacroSettings {
        /**
         * How wide the detector should be (by default, 8).
         */
        width?: number;

        /**
         * How high the detector should be (by default, 8).
         */
        height?: number;
    }

    /**
     * Settings for a SectionFail macro.
     */
    export interface IMacroSectionFailSettings extends IMacroSettings {
        /**
         * How wide the detector should be (by default, 8).
         */
        width?: number;

        /**
         * How high the detector should be (by default, 8).
         */
        height?: number;
    }

    /**
     * Settings for a SectionDecider macro.
     */
    export interface IMacroSectionDeciderSettings extends IMacroSettings {
        /**
         * Which section to spawn if passed (by default, 0).
         */
        pass?: number;

        /**
         * Which section to spawn if failed (by default, 0).
         */
        fail?: number;
    }

    /**
     * Settings for a Section macro.
     */
    export interface IMacroSectionSettings extends IMacroSettings {
        /**
         * Which of the Area's sections to spawn (by default, 0).
         */
        section?: number;
    }

    /**
     * Settings regarding maps, particularly for AreaSpawnr, MapScreenr,
     * and MapsCreatr.
     */
    export interface IMapCustoms extends GameStartr.IMapCustoms {
        /**
         * Named patterns of Things and positions.
         */
        patterns: {
            [i: string]: [string, number, number];
        };
    }

    /**
     * Stored settings to be stored separately and kept within FullScreenMario.
     */
    export interface IFullScreenMarioStoredSettings extends GameStartr.IGameStartrStoredSettings {
        /**
         * Settings regarding maps, particularly for an IAreaSpawnr, an
         * IMapScreenr, and an IMapsCreatr.
         */
        maps: IMapCustoms;
    }

    /**
     * A free HTML5 remake of Nintendo's original Super Mario Bros, expanded for the
     * modern web. It includes the original 32 levels, a random map generator, a 
     * level editor, and over a dozen custom mods.
     */
    export interface IFullScreenMario extends GameStartr.IGameStartr {
        /**
         * Overriden MapScreenr refers to the IMapScreenr defined in IFullScreenMario.d.ts.
         */
        MapScreener: IMapScreenr;

        /**
         * Stored settings to be stored separately and kept within a GameStartr.
         */
        settings: IFullScreenMarioStoredSettings;

        /**
         * How much to expand each pixel from raw sizing measurements to in-game.
         */
        unitsize: number;

        /**
         * Levels of points to award for hopping on / shelling enemies.
         */
        pointLevels: number[];

        /**
         * Internal reference to the static customTextMappings.
         */

        /**
         * Useful for custom text Things, where "text!" cannot be a Function name.
         */
        customTextMappings: ITextMappings;

        /**
         * The game's player, which (when defined) will always be a Player Thing.
         */
        player: IPlayer;

        /**
         * Container for device motion information, used by this.deviceMotion.
         */
        deviceMotionStatus: IDeviceMotionStatus;

        /**
         * Sets this.ObjectMaker.
         *
         * Because many Thing functions require access to other FSM modules, each is
         * given a reference to this container FSM via properties.thing.GameStarter.
         *
         * @param FSM
         * @param customs   Any optional custom settings.
         */
        resetObjectMaker(FSM: IFullScreenMario, settings: GameStartr.IGameStartrSettings): void;

        /**
         * Sets this.AudioPlayer.
         *
         * @param FSM
         * @param customs   Any optional custom settings.
         */
        resetAudioPlayer(FSM: IFullScreenMario, settings: GameStartr.IGameStartrSettings): void;

        /**
         * Sets this.AreaSpawner.
         *
         * @param FSM
         * @param customs   Any optional custom settings.
         */
        resetAreaSpawner(FSM: IFullScreenMario, settings: GameStartr.IGameStartrSettings): void;

        /**
         * Resets this.ItemsHolder via the parent GameStartr resetItemsHolder.
         *
         * If the screen isn't wide enough to fit the "lives" display, it's hidden.
         *
         * @param FSM
         * @param customs   Any optional custom settings.
         */
        resetItemsHolder(FSM: IFullScreenMario, settings: GameStartr.IGameStartrSettings): void;

        /**
         * Sets this.MathDecider, using its existing MapScreenr as its constants.
         *
         * @param FSM
         * @param customs   Any optional custom settings.
         */
        resetMathDecider(FSM: IFullScreenMario, customs: GameStartr.IMathDecidrCustoms): void;

        /**
         * Sets this.container via the parent GameStartr resetContaienr.
         *
         * The container is given the "Press Start" font, the PixelRender is told
         * to draw the scenery, solid, character, and text groups, and the container
         * width is set to the custom's width.
         *
         * @param FSM
         * @param customs   Any optional custom settings.
         */
        resetContainer(FSM: IFullScreenMario, settings: GameStartr.IGameStartrSettings): void;

        /**
         * Completely restarts the game. Lives are reset to 3, the map goes back
         * to default, and the onGameStart mod trigger is fired.
         */
        gameStart(): void;

        /**
         * Completely ends the game. All Thing groups are clared, sounds are
         * stopped, the screen goes to black, "GAME OVER" is displayed. After a
         * while, the game restarts again via gameStart.
         */
        gameOver(): void;

        /**
         * Slight addition to the GameStartr thingProcess Function. The Thing's hit
         * check type is cached immediately.
         *
         * @param thing   The Thing being processed.
         * @param title   What type Thing this is (the name of the class).
         * @param settings   Additional settings to be given to the Thing.
         * @param defaults   The default settings for the Thing's class.
         * @remarks This is generally called as the onMake call in an ObjectMakr.
         */
        thingProcess(thing: IThing, title: string, settings: any, defaults: any): void;

        /**
         * Generates a key for a Thing based off the current area and the Thing's
         * basic attributes. This should be used for PixelRender.get calls, to
         * cache the Thing's sprite.
         * 
         * @param thing
         * @returns A key that to identify the Thing's sprite.
         */
        generateThingKey(thing: IThing): string;

        /**
         * Adds a Thing via addPreThing based on the specifications in a PreThing.
         * This is done relative to MapScreener.left and MapScreener.floor.
         *
         * @param prething   A PreThing whose Thing is to be added to the game.
         */
        addPreThing(prething: IPreThing): void;

        /**
         * Adds a new Player Thing to the game and sets it as EightBitter.play. Any
         * required additional settings (namely keys, power/size, and swimming) are
         * applied here.
         *
         * @param left   A left edge to place the Thing at (by default, unitsize * 16).
         * @param bottom   A bottom to place the Thing upon (by default, unitsize * 16).
         * @returns A newly created Player in the game.
         */
        addPlayer(left?: number, bottom?: number): IPlayer;

        /**
         * Shortcut to call scrollThing on a Player.
         *
         * @param dx   How far to scroll horizontally.
         * @param dy   How far to scroll vertically.
         */
        scrollPlayer(dx: number, dy?: number): void;

        /**
         * Triggered Function for when the game is paused. Music stops, the pause
         * bleep is played, and the mod event is fired.
         *
         * @param FSM
         */
        onGamePause(FSM: IFullScreenMario): void;

        /**
         * Triggered Function for when the game is played or unpause. Music resumes
         * and the mod event is fired.
         *
         * @param FSM
         */
        onGamePlay(FSM: IFullScreenMario): void;

        /**
         * Reacts to the left key being pressed. keys.run and leftDown are marked
         * and the mod event is fired.
         *
         * @param FSM
         * @param event   The original user-caused Event.
         */
        keyDownLeft(FSM: IFullScreenMario, event?: Event): void;

        /**
         * Reacts to the right key being pressed. keys.run and keys.rightDown are
         * marked and the mod event is fired.
         *
         * @param FSM
         * @param event   The original user-caused Event.
         */
        keyDownRight(FSM: IFullScreenMario, event?: Event): void;

        /**
         * Reacts to the up key being pressed. If a Player can jump, it does, and
         * underwater paddling is checked. The mod event is fired.
         *
         * @param FSM
         * @param event   The original user-caused Event.
         */
        keyDownUp(FSM: IFullScreenMario, event?: Event): void;

        /**
         * Reacts to the down key being pressed. A player's keys.crouch is marked
         * and the mod event is fired.
         *
         * @param FSM
         * @param event   The original user-caused Event.
         */
        keyDownDown(FSM: IFullScreenMario, event?: Event): void;

        /**
         * Reacts to the sprint key being pressed. Firing happens if a Player is
         * able, keys.spring is marked, and the mod event is fired.
         *
         * @param FSM
         * @param event   The original user-caused Event.
         */
        keyDownSprint(FSM: IFullScreenMario, event?: Event): void;

        /**
         * Reacts to the pause key being pressed. The game is either paused or unpaused,
         * and the mod event is fired.
         *
         * @param FSM
         * @param event   The original user-caused Event.
         */
        keyDownPause(FSM: IFullScreenMario, event?: Event): void;

        /**
         * Reacts to the mute key being lifted. Muting is toggled and the mod event
         * is fired.
         *
         * @param FSM
         * @param event   The original user-caused Event.
         */
        keyDownMute(FSM: IFullScreenMario, event?: Event): void;

        /**
         * Reacts to the left key being lifted. keys.run and keys.leftDown are
         * marked and the mod event is fired.
         *
         * @param FSM
         * @param event   The original user-caused Event.
         */
        keyUpLeft(FSM: IFullScreenMario, event?: Event): void;

        /**
         * Reacts to the right key being lifted. keys.run and keys.rightDown are
         * marked and the mod event is fired.
         *
         * @param FSM
         * @param event   The original user-caused Event.
         */
        keyUpRight(FSM: IFullScreenMario, event?: Event): void;

        /**
         * Reacts to the up key being lifted. Jumping stops and the mod event is
         * fired.
         *
         * @param FSM
         * @param event   The original user-caused Event.
         */
        keyUpUp(FSM: IFullScreenMario, event?: Event): void;

        /**
         * Reacts to the down key being lifted. keys.crouch is marked, crouch
         * removal happens if necessary, and the mod event is fired.
         *
         * @param FSM
         * @param event   The original user-caused Event.
         */
        keyUpDown(FSM: IFullScreenMario, event?: Event): void;

        /**
         * Reacts to the spring key being lifted. keys.sprint is marked and the mod
         * event is fired.
         *
         * @param FSM
         * @param event   The original user-caused Event.
         */
        keyUpSprint(FSM: IFullScreenMario, event?: Event): void;

        /**
         * Reacts to the pause key being lifted. The mod event is fired.
         *
         * @param FSM
         * @param event   The original user-caused Event.
         */
        keyUpPause(FSM: IFullScreenMario, event?: Event): void;

        /**
         * Reacts to a right click being pressed. Pausing is toggled and the mod
         * event is fired.
         *
         * @param FSM
         * @param event   The original user-caused Event.
         */
        mouseDownRight(FSM: IFullScreenMario, event?: Event): void;

        /**
         * Reacts to a regularly caused device motion event. Acceleration is checked
         * for changed tilt horizontally (to trigger left or right key statuses) or
         * changed tilt vertically (jumping). The mod event is also fired.
         *
         * @param FSM
         * @param event   The original user-caused Event.
         */
        deviceMotion(FSM: IFullScreenMario, event: DeviceMotionEvent): void;

        /**
         * Checks whether inputs can be fired, which is equivalent to the status of
         * the MapScreener's nokeys variable (an inverse value).
         *
         * @param FSM
         * @returns Whether inputs are allowed to trigger.
         */
        canInputsTrigger(FSM: IFullScreenMario): boolean;

        /**
         * Regular maintenance Function called to decrease time every 25 game ticks.
         *
         * @param FSM
         * @returns Whether time should stop counting, which is whether it's <= 0.
         */
        maintainTime(FSM: IFullScreenMario): boolean;

        /**
         * Regular maintenance Function called on the Scenery group every 350
         * upkeeps (slightly over 5 seconds). Things are checked for being alive
         * and to the left of QuadsKeeper.left; if they aren't, they are removed.
         *
         * @param FSM
         */
        maintainScenery(FSM: IFullScreenMario): void;

        /**
         * Regular maintenance Function called on the Solids group every upkeep.
         * Things are checked for being alive and to the right of QuadsKeeper.left;
         * if they aren't, they are removed. Each Thing is also allowed a movement
         * Function.
         *
         * @param FSM
         * @param solids   FSM's GroupHolder's Solid group.
         */
        maintainSolids(FSM: IFullScreenMario, solids: ISolid[]): void;

        /**
         * Regular maintenance Function called on the Characters group every upkeep.
         * Things have gravity and y-velocities, collision detection, and resting
         * checks applied before they're checked for being alive. If they are, they
         * are allowed a movement Function; if not, they are removed.
         *
         * @param FSM
         * @param characters   FSM's GroupHolder's Characters group.
         */
        maintainCharacters(FSM: IFullScreenMario, characters: ICharacter[]): void;

        /**
         * Maintenance Function only triggered for Things that are known to have
         * overlapping Solids stored in their overlaps attribute. This will slide
         * the offending Thing away from the midpoint of those overlaps once a call
         * until it's past the boundary (and check for those boundaries if not
         * already set).
         *
         * @param character   A Character that is known to be overlapping Solid(s).
         */
        maintainOverlaps(character: ICharacterOverlapping): void;

        /**
         * Sets the overlapping properties of a Thing when it is first detected as
         * overlapping in maintainOverlaps. All Solids in its overlaps Array are
         * checked to find the leftmost and rightmost extremes and midpoint.
         * Then, the Thing is checked for being to the left or right of the
         * midpoint, and the goal set to move it away from the midpoint.
         *
         * @param thing
         * @returns Whether the Thing's overlaps were successfully recorded.
         */
        setOverlapBoundaries(thing: ICharacterOverlapping): boolean;

        /**
         * Regular maintenance Function called on a Player every upkeep. A barrage
         * of tests are applied, namely falling/jumping, dieing, x- and y-velocities,
         * running, and scrolling. This is separate from the movePlayer movement
         * Function that will be called in maintainCharacters.
         *
         * @param FSM
         */
        maintainPlayer(FSM: IFullScreenMario): void;

        /**
         * Function generator for the generic canThingCollide checker. This is used
         * repeatedly by ThingHittr to generate separately optimized Functions for
         * different Thing types.
         *
         * @returns A Function that generates a canThingCollide checker.
         */
        generateCanThingCollide(): (thing: IThing) => boolean;

        /**
         * @param thing
         * @returns Whether the Thing is alive, meaning it has a true alive flag
         *          and a false dead flag.
         */
        isThingAlive(thing: IThing): boolean;

        /**
         * Generic base function to check if one Thing is touching another. This
         * will be called by the more specific Thing touching functions.
         *
         * @param thing
         * @param other
         * @returns Whether the two Things are touching.
         * @remarks The horizontal checks use allow a unitsize of flexibility.
         */
        isThingTouchingThing(thing: IThing, other: IThing): boolean;

        /**
         * General top collision detection Function for two Things to determine if
         * one Thing is on top of another. This takes into consideration factors
         * such as which are solid or an enemy, and y-velocity.
         *
         * @param thing
         * @param other
         * @returns Whether thing is on top of other.
         * @remarks This is a more specific form of isThingTouchingThing.
         */
        isThingOnThing(thing: IThing, other: IThing): boolean;

        /**
         * Top collision Function to determine if a Thing is on top of a Solid.
         *
         * @param thing
         * @param other
         * @returns Whether thing is on top of other.
         * @remarks Similar to isThingOnThing, but more specifically used for
         *          isCharacterOnSolid and isCharacterOnResting
         */
        isThingOnSolid(thing: IThing, other: ISolid): boolean;

        /**
         * Top collision Function to determine if a character is on top of a solid.
         * This is always true for resting (since resting checks happen before when
         * this should be called).
         *
         * @param thing
         * @param other
         * @returns Whether thing is on top of other.
         */
        isCharacterOnSolid(thing: ICharacter, other: ISolid): boolean;

        /**
         * Top collision Function to determine if a character should be considered
         * resting on a solid. This mostly uses isThingOnSolid, but also checks for
         * the corner cases of the character being exactly at the edge of the solid
         * (such as when jumping while next to it).
         *
         * @param thing
         * @param other
         * @returns Whether thing is on top of other.
         */
        isCharacterOnResting(thing: ICharacter, other: ISolid): boolean;

        /**
         * Function generator for the generic isCharacterTouchingCharacter checker.
         * This is used repeatedly by ThingHittr to generate separately optimized
         * Functions for different Thing types.
         *
         * @returns A Function that generates isCharacterTouchingCharacter.
         */
        generateIsCharacterTouchingCharacter(): (thing: ICharacter, other: ICharacter) => boolean;

        /**
         * Function generator for the generic isCharacterTouchingSolid checker. This
         * is used repeatedly by ThingHittr to generate separately optimized
         * Functions for different Thing types.
         *
         * @returns A Function that generates isCharacterTouchingSolid.
         */
        generateIsCharacterTouchingSolid(): (thing: ICharacter, other: ISolid) => boolean;

        /**
         * @param thing
         * @param other
         * @returns Whether thing's bottom is above other's top, allowing for
         *          other's toly.
         */
        isCharacterAboveEnemy(thing: ICharacter, other: ICharacter): boolean;

        /**
         * @param thing
         * @param other
         * @returns Whether thing's top is above other's bottom, allowing for
         *          the Thing's toly and yvel.
         */
        isCharacterBumpingSolid(thing: ICharacter, other: ISolid): boolean;

        /**
         * @param thing
         * @param other
         * @returns Whether thing is "overlapping" other.
         */
        isCharacterOverlappingSolid(thing: ICharacter, other: ISolid): boolean;

        /**
         * @param thing
         * @param other
         * @returns Whether thing, typically a solid, is on top of other.
         * @remarks This is similar to isThingOnThing, but more specifically
         *          used for characterTouchedSolid.
         */
        isSolidOnCharacter(thing: ISolid, other: ICharacter): boolean;

        /**
         * Externally facing Function to gain some number of lives. ItemsHolder
         * increases the "score" statistic, an audio is played, and the mod event is
         * fired.
         *
         * @param amount   How many lives to gain (by default, 1).
         * @param nosound   Whether the sound should be skipped (by default,
         *                  false).
         */
        gainLife(amount: number, nosound?: boolean): void;

        /**
         * Basic Function for an item to jump slightly into the air, such as from
         * a Player hitting a solid below it.
         *
         * @param thing   An item.
         * @remarks This simply moves the thing up slightly and decreases its
         *          y-velocity, without considering x-direction.
         */
        itemJump(thing: IItem): void;

        /**
         * Generic Function for when a Player jumps on top of an enemy. The enemy
         * is killed, a Player's velocity points upward, and score is gained.
         *
         * @param thing   A Player jumping on other.
         * @param other   An Enemy being jumped upon.
         */
        jumpEnemy(thing: IPlayer, other: IEnemy): void;

        /**
         * Callback for a Player hitting a Mushroom or FireFlower. A player's
         * power and the ItemsHolder's "power" statistic both go up, and the
         * corresponding animations and mod event are triggered.
         *
         * @param thing   A Player powering up.
         * @param other   A Mushroom powering up hte Player.
         */
        playerShroom(thing: IPlayer, other: IItem): void;

        /**
         * Callback for a Player hitting a Mushroom1Up. The game simply calls
         * gainLife and triggers the mod event.
         *
         * @param thing   A Player gaining a life.
         * @param other   The Mushroom1Up giving the life.
         */
        playerShroom1Up(thing: ICharacter, other: IItem): void;

        /**
         * Callback for a Player hitting a Star. A set of animation loops and
         * sounds play, and the mod event is triggered. After some long period time,
         * playerStarDown is called to start the process of removing star power.
         *
         * @param thing   A Player gaining star powers.
         * @param timeout   How long to wait before calling playerStarDown
         *                  (by default, 560).
         */
        playerStarUp(thing: IPlayer, timeout?: number): void;

        /**
         * Trigger to commence reducing a Player's star power. This slows the
         * class cycle, times a playerStarOffCycle trigger, and fires the mod event.
         *
         * @param thing   A Player losing star powers.
         */
        playerStarDown(thing: IPlayer): void;

        /**
         * Trigger to continue reducing a Player's star power. This resumes
         * playing the regular theme, times a playerStarOffFinal trigger, and fires
         * the mod event.
         *
         * @param thing   A Player losing star powers.
         */
        playerStarOffCycle(thing: IPlayer): void;

        /**
         * Trigger to finish reducing a Player's star power. This actually reduces
         * a Player's star attribute, cancels the sprite cycle, adds the previous
         * classes back, and fires the mod event.
         *
         * @param thing   A Player losing star powers.
         */
        playerStarOffFinal(thing: IPlayer): void;

        /**
         * Sizing modifier for a Player, typically called when entering a location
         * or colliding with a Mushroom. This sets a Player's size to the large
         * mode and optionally plays the animation. The mod event is then fired.
         *
         * @param thing   A Player increasing in size.
         * @param noAnimation   Whether to skip the animation (by default,
         *                      false).
         */
        playerGetsBig(thing: IPlayer, noAnimation?: boolean): void;

        /**
         * Animation scheduler for a Player getting big. The shrooming classes are
         * cycled through rapidly while a Player's velocity is paused.
         *
         * @param thing   A Player increasing in size.
         */
        playerGetsBigAnimation(thing: IPlayer): void;

        /**
         * Sizing modifier for a Player, typically called when going down to
         * normal size after being large. This containst eha nimation scheduling
         * to cycle through paddling classes, then flickers a Player. The mod
         * event is fired.
         *
         * @param thing   A Player decreasing in size.
         */
        playerGetsSmall(thing: IPlayer): void;

        /**
         * Visual changer for when a Player collides with a FireFlower. The
         * "fiery" class is added, and the mod event is fired.
         *
         * @param thing   A Player gaining fire powers.
         */
        playerGetsFire(thing: IPlayer): void;

        /**
         * Actually sets the size for a player to small (8x8) via setSize and
         * updateSize.
         *
         * @param thing   A Player decreasing in size.
         */
        setPlayerSizeSmall(thing: IPlayer): void;

        /**
         * Actually sets the size for a player to large (8x16) via setSize and
         * updateSize.
         *
         * @param thing   A Player increasing in size.
         */
        setPlayerSizeLarge(thing: IPlayer): void;

        /**
         * Removes the crouching flag from a Player and re-adds the running cycle.
         * If a Player is large (has power > 1), size and classes must be set.
         *
         * @param thing   A Player that is no longer crouching.
         */
        animatePlayerRemoveCrouch(thing: IPlayer): void;

        /**
         * Officially unattaches a player from a solid. The thing's physics flags
         * are reset to normal, the two have their attachment flags set, and the
         * thing is set to be jumping off.
         *
         * @param thing   A Player attached to other.
         * @param other   A Solid thing is attached to.
         */
        unattachPlayer(thing: IPlayer, other: ISolid): void;

        /**
         * Adds an invisible RestingStone underneath a Player. It is hidden and
         * unable to collide until a Player falls to its level, at which point the
         * stone is set underneath a Player to be rested upon.
         *
         * @param thing   A Player respawning into the game.
         */
        playerAddRestingStone(thing: IPlayer): void;

        /**
         * Marks a new overlapping Thing in the first Thing's overlaps Array,
         * creating the Array if needed.
         *
         * @param thing   The Thing that is overlapping another Thing.
         * @param other   The Thing being added to the overlaps Array.
         */
        markOverlap(thing: ICharacterOverlapping, other: ISolid): void;

        /**
         * Spawn callback for DeadGoombas. They simply disappear after 21 steps.
         *
         * @param thing   A DeadGoomba being spawned.
         */
        spawnDeadGoomba(thing: IThing): void;

        /**
         * Spawn callback for HammerBros. Gravity is reduced, and the hammer and
         * jump event intervals are started. The cyclical movement counter is set to
         * 0.
         *
         * @param thing   A HammerBro being spawned.
         */
        spawnHammerBro(thing: IHammerBro): void;

        /**
         * Spawn callback for Bowsers. The cyclical movement counter is set to 0 and
         * the firing and jumping event intervals are started. If it also specifies
         * a throwing interval, that's started too.
         *
         * @param thing   A Bowser being spawned.
         */
        spawnBowser(thing: IBowser): void;

        /**
         * Spawn callback for Piranhas. The movement counter and direction are
         * reset, and if the Piranha is on a pipe, it has a reduced height (6).
         *
         * @param thing   A Piranha being spawned.
         */
        spawnPiranha(thing: IPiranha): void;

        /**
         * Spawn callback for Bloopers. Its squeeze and movement counters are
         * set to 0.
         *
         * @param thing   A Blooper being spawned.
         */
        spawnBlooper(thing: IBlooper): void;

        /**
         * Spawn callback for Podoboos. The jumping interval is set to the Thing's
         * frequency.
         *
         * @param thing   A Podoboo being spawned.
         */
        spawnPodoboo(thing: IPodoboo): void;

        /**
         * Spawn callback for Lakitus. MapScreenr registers the most recently
         * added Lakitu as some areas spawn them every once in a while.
         *
         * @param thing   A Lakitu being spawned.
         */
        spawnLakitu(thing: ILakitu): void;

        /**
         * Spawning callback for Cannons. Unless specified by the noBullets flag,
         * the firing interval is set to the Thing's frequency.
         *
         * @param thing   A Cannon being spawned.
         */
        spawnCannon(thing: ICannon): void;

        /**
         * Spawning callback for CastleBlocks. If the Thing has fireballs, an Array
         * of them are made and animated to tick around the block like a clock, set
         * by the thing's speed and direction.
         *
         * @param thing   A CastleBlock being spawned.
         */
        spawnCastleBlock(thing: ICastleBlock): void;

        /**
         * Spawning callback for floating Things, such as Koopas and Platforms. The
         * Thing's begin and end attributes are set relative to the MapScreener's
         * floor, so its movement can handle cycling between the two.
         *
         * @param thing   A Thing being spawned to float around.
         */
        spawnMoveFloating(thing: IThingFloating): void;

        /**
         * Spawning callback for sliding Things, such as Platforms. The Thing's
         * begin and end attributes do not need to be relative to anything.
         *
         * @param thing   A Thing being spawned to slide back and forth.
         */
        spawnMoveSliding(thing: IThingSliding): void;

        /**
         * Spawning callback for a Platform that's a part of a Scale.
         *
         * @param thing   A Platform being spawned within a Scale group.
         */
        spawnScalePlatform(thing: IPlatform): void;

        /**
         * Generator callback to create a random CheepCheep. The spawn is given a
         * random x-velocity, is placed at a random point just below the screen, and
         * is oriented towards a Player.
         *
         * @param FSM
         * @returns Whether CheepCheep spawning has been cancelled.
         */
        spawnRandomCheep(FSM: IFullScreenMario): boolean;

        /**
         * Generator callback to create a BulleBill. The spawn moves horizontally
         * at a constant rate towards the left side of the bill, and is placed at a
         * random point to the right side of the screen.
         *
         * @param FSM
         * @returns Whether BulletBill spawning has been cancelled.
         */
        spawnRandomBulletBill(FSM: IFullScreenMario): boolean;

        /**
         * Spawns a CustomText by killing it and placing the contents of its texts
         * member variable. These are written with a determined amount of spacing
         * between them, as if by a typewriter.
         *
         * @param thing   A CustomText being spawned.
         */
        spawnCustomText(thing: ICustomText): void;

        /**
         * Spawning callback for generic detectors, activated as soon as they are
         * placed. The Thing's activate trigger is called, then it is killed.
         *
         * @param thing   A Detector being spawned.
         */
        spawnDetector(thing: IDetector): void;

        /**
         * Spawning callback for ScrollBlockers. If the Thing is to the right of
         * the visible viewframe, it should limit scrolling when triggered.
         *
         * @param thing   A ScrollBlocker being spawned.
         */
        spawnScrollBlocker(thing: IScrollBlocker): void;

        /**
         * Used by Things in a collection to register themselves as a part of their
         * container collection Object. This is called by onThingMake, so they're
         * immediately put in the collection and have it as a member variable.
         *
         * @param collection   The collection Object shared by all members.
         * @param thing   A member of the collection being spawned.
         */
        spawnCollectionComponent(collection: any, thing: IThing): void;

        /**
         * Spawning callback for RandomSpawner Things, which generate a set of
         * commands using the WorldSeeder to be piped into the AreaSpawnr, then
         * spawn the immediate area.
         *
         * @param thing   A RandomSpawner being spawned.
         */
        spawnRandomSpawner(thing: IRandomSpawner): void;

        /**
         * Activation callback for starting spawnRandomCheep on an interval.
         * MapScreener is notified that spawningCheeps is true.
         *
         * @param thing   A Detector activated to start spawning CheepCheeps.
         */
        activateCheepsStart(thing: IDetector): void;

        /**
         * Activation callback to stop spawning CheepCheeps. MapScreener is notified
         * that spawningCheeps is false.
         *
         * @param thing   A Detector activated to stop spawning CheepCheeps.
         */
        activateCheepsStop(thing: IDetector): void;

        /**
         * Activation callback for starting spawnRandomBulletBill on an interval.
         * MapScreener is notified that spawningBulletBills is true.
         *
         * @param thing   A Detector activated to start spawning BulletBills.
         */
        activateBulletBillsStart(thing: IDetector): void;

        /**
         * Activation callback to stop spawning BulletBills. MapScreener is notified
         * that spawningBulletBills is false.
         *
         * @param thing   A Detector activated to stop spawning BulletBills.
         */
        activateBulletBillsStop(thing: IDetector): void;

        /**
         * Activation callback to tell the area's Lakitu, if it exists, to start
         * fleeing the scene.
         *
         * @param thing   A Detector activated to make the Lakitu flee.
         */
        activateLakituStop(thing: IDetector): void;

        /**
         * Activation callback for a warp world area, triggered by a Player
         * touching a collider on top of it. Piranhas disappear and texts are
         * revealed.
         *
         * @param thing   A Player activating the warp world.
         * @param other   A Detector triggered by thing to activate a warp world.
         */
        activateWarpWorld(thing: ICharacter, other: IDetectCollision): void;

        /**
         * Activation callback for when a Player lands on a RestingStone. The
         * stone "appears" (via opacity), the regular theme plays if it wasn't
         * already, and the RestingStone waits to kill itself when a Player isn't
         * touching it.
         *
         * @param thing   A RestingStone being landed on.
         * @param other   A Player landing on thing.
         */
        activateRestingStone(thing: IRestingStone, other: IPlayer): void;

        /**
         * Generic activation callback for DetectWindow Things. This is typically
         * set as a .movement Function, so it waits until the calling Thing is
         * within the MapScreener's area to call the activate Function and kill
         * itself.
         *
         * @param thing   A DetectWindow that might be activated.
         */
        activateWindowDetector(thing: IDetectWindow): void;

        /**
         * Activation callback for ScrollBlocker Things. These are WindowDetectors
         * that set MapScreener.canscroll to false when they're triggered. If the
         * latest scrollWindow call pushed it too far to the left, it scrolls back
         * the other way.
         *
         * @param thing   A ScrollBlocker that might be activated.
         */
        activateScrollBlocker(thing: IScrollBlocker): void;

        /**
         * Activation callback for ScrollBlocker Things. These are DetectCollision
         * that set MapScreener.canscroll to true when they're triggered.
         *
         * @param thing   An activated ScrollEnabler.
         */
        activateScrollEnabler(thing: IDetectCollision): void;

        /**
         * Activates the "before" component of a stretchable section. The creation
         * commands of the section are loaded onto the screen as is and a
         * DetectWindow is added to their immediate right that will trigger the
         * equivalent activateSectionStretch.
         *
         * @param thing   An activated SectionDecider.
         */
        activateSectionBefore(thing: ISectionDetector): void;

        /**
         * Activates the "stretch" component of a stretchable section. The creation
         * commands of the section are loaded onto the screen and have their widths
         * set to take up the entire width of the screen. A DetectWindow is added
         * to their immediate right that will trigger the equivalent
         * activateSectionAfter.
         *
         * @param thing   An activated SectionDetector.
         */
        activateSectionStretch(thing: ISectionDetector): void;

        /**
         * Activates the "after" component of a stretchable sectin. The creation
         * commands of the stretch are loaded onto the screen as is.
         *
         * @param thing   An activated SectioNDetector.
         */
        activateSectionAfter(thing: ISectionDetector): void;

        /**
         * Function generator for the generic hitCharacterSolid callback. This is
         * used repeatedly by ThingHittr to generate separately optimized Functions
         * for different Thing types.
         *
         * @returns A Function that generates hitCharacterSolid.
         */
        generateHitCharacterSolid(): (thing: ICharacter, other: ISolid) => void;

        /**
         * Function generator for the generic hitCharacterCharacter callback. This
         * is used repeatedly by ThingHittr to generate separately optimized
         * Functions for different Thing types.
         *
         * @returns A Function that generates hitCharacterCharacter.
         */
        generateHitCharacterCharacter(): (thing: ICharacter, other: ICharacter) => void;

        /**
         * Collision callback used by most Items. The item's action callback will
         * be called only if the first Thing is a player.
         *
         * @param thing   A Character touching other.
         * @param other   An Item being touched by thing.
         */
        collideFriendly(thing: ICharacter, other: IItem): void;

        /**
         * General callback for when a character touches a solid. This mostly
         * determines if the character is on top (it should rest on the solid), to
         * the side (it should shouldn't overlap), or undernearth (it also shouldn't
         * overlap).
         *
         * @param thing   A Character touching other.
         * @param other   A Solid being touched by thing.
         */
        collideCharacterSolid(thing: ICharacter, other: ISolid): void;

        /**
         * Collision callback for a character hitting an "up" solid. If it has an
         * onCollideUp callback, that is called; otherwise, it is killed.
         *
         * @param thing   A Character touching other.
         * @param other   A Solid being touched by thing.
         */
        collideCharacterSolidUp(thing: ICharacter, other: ISolid): void;

        /**
         * Collision callback for an item hitting an "up" solid. Items just hop
         * and switch direction.
         *
         * @param thing   An Item touching other.
         * @param other   A Solid being touched by thing.
         */
        collideUpItem(thing: IItem, other: ISolid): void;

        /**
         * Collision callback for a floating coin being hit by an "up" solid. It is
         * animated, as if it were hit as the contents of a solid.
         *
         * @param thing   A Coin being touched by other.
         * @param other   A Solid touching thing.
         */
        collideUpCoin(thing: ICoin, other: ISolid): void;

        /**
         * Collision callback for a player hitting a regular Coin. The Coin
         * disappears but points and Coin totals are both increased, along with
         * the "Coin" sound being played.
         *
         * @param thing   A Player touching other.
         * @param other   A Coin being touched by thing.
         */
        collideCoin(thing: IPlayer, other: ICoin): void;

        /**
         * Collision callback for a player hitting a Star. The Star is killed, and
         * a PlayerStarUp trigger is called on the Thing.
         *
         * @param thing   A Player touching other.
         * @param other   A Star being touched by thing.
         */
        collideStar(thing: IPlayer, other: IStar): void;

        /**
         * Collision callback for a character being hit by a fireball. It will
         * most likely be killed with an explosion unless it has the nofiredeath
         * flag, in which case only the fireball dies.
         *
         * @param thing   A Character being touched by other.
         * @param other   A Fireball touching thing.
         */
        collideFireball(thing: ICharacter, other: IFireball): void;

        /**
         * Collision callback for hitting a CastleFireball. The character is killed
         * unless it has the star flag, in which case the CastleFireball is.
         *
         * @param thing   A Character being touched by other.
         * @param other   A CastleFireball touching thing.
         */
        collideCastleFireball(thing: ICharacter, other: ICastleFireball): void;

        /**
         * Collision callback for when a character hits a Shell. This covers various
         * cases, such as deaths, side-to-side Shell collisions, player stomps, and
         * so on.
         *
         * @param thing   A Character touching other.
         * @param other   A Shell being touched by thing.
         */
        collideShell(thing: ICharacter, other: IShell): void;

        /**
         * Collision callback for a solid being hit by a Shell. The Shell will
         * bounce the opposition direction.
         *
         * @param thing   A Solid being touched by other.
         * @param other   A Shell touching thing.
         */
        collideShellSolid(thing: ISolid, other: IShell): void;

        /**
         * Collision callback for when a Player hits a Shell. This covers all the
         * possible scenarios, and is much larger than common sense dictates.
         *
         * @param thing   A Player touching other.
         * @param other   A Shell being touched by thing.
         */
        collideShellPlayer(thing: IPlayer, other: IShell): void;

        /**
         * Collision callback for two Shells. If one is moving, it kills the other;
         * otherwise, they bounce off.
         *
         * @param thing   A Shell touching other.
         * @param other   A Shell being touched by thing.
         */
        collideShellShell(thing: IShell, other: IShell): void;

        /**
         * Collision callback for a general character hitting an enemy. This covers
         * many general cases, most of which involve a player and an enemy.
         *
         * @param thing   A Character touching other.
         * @param other   An Enemy being touched by thing.
         */
        collideEnemy(thing: ICharacter, other: IEnemy): void;

        /**
         * Collision callback for a character bumping into the bottom of a solid.
         * Only players cause the solid to jump and be considered "up", though large
         * players will kill solids that have the breakable flag on. If the solid
         * does jump and has contents, they emerge.
         *
         * @param thing   A Brick being touched by other.
         * @param other   A Character touching thing.
         */
        collideBottomBrick(thing: IBrick, other: ICharacter): void;

        /**
         * Collision callback for a Player hitting the bottom of a Block. Unused
         * Blocks have their contents emerge (by default a Coin), while used Blocks
         * just have a small bump noise played.
         *
         * @param thing   A Block being touched by other.
         * @param other   A Player touching thing.
         */
        collideBottomBlock(thing: IBlock, other: IPlayer): void;

        /**
         * Collision callback for Vines. A player becomes "attached" to the Vine
         * and starts climbing it, with movement set to movePlayerVine.
         *
         * @param thing   A Player touching other.
         * @param other   A Solid being touched by thing.
         */
        collideVine(thing: IPlayer, other: IVine): void;

        /**
         * Collision callback for a character hitting a Springboard. This acts as a
         * normal solid to non-players, and only acts as a spring if a Player is
         * above it and moving down.
         *
         * @param thing   A Character touching other.
         * @param other   A Springboard being touched by thing.
         */
        collideSpringboard(thing: ICharacter, other: ISpringboard): void;

        /**
         * Collision callback for a character hitting a WaterBlocker on the top of
         * an underwater area. It simply stops them from moving up.
         *
         * @param thing   A Character touching other.
         * @param other   A WaterBlocker being touched by thing.
         */
        collideWaterBlocker(thing: ICharacter, other: ISolid): void;

        /**
         * Collision callback for the DetectCollision on a flagpole at the end of an
         * EndOutsideCastle. The Flagpole cutscene is started.
         *
         * @param thing   A Player touching other.
         * @param other   A DetectCollision being touched by thing.
         */
        collideFlagpole(thing: IPlayer, other: IDetectCollision): void;

        /**
         * Collision callback for a Player hitting a CastleAxe. A player and
         * screen are paused for 140 steps (other callbacks should be animating
         * the custcene).
         *
         * @param thing   A Player touching other.
         * @param other   A CastleAxe being touched by thing.
         */
        collideCastleAxe(thing: IPlayer, other: ICastleAxe): void;

        /**
         * Collision callback for a player hitting the DetectCollision placed next
         * a CastleDoor in EndOutsideCastle. Things and the current time are added
         * to cutscene settings. Infinite time goes directly to the Fireworks
         * routine, while having non-infinite time goes to the Countdown routine.
         *
         * @param thing   A Player touching other.
         * @param other   A DetectCollision being touched by thing.
         */
        collideCastleDoor(thing: IPlayer, other: IDetectCollision): void;

        /**
         * Collision callback for a player reaching a castle NPC. Things and
         * the NPC's keys are added to cutscene settings, and the Dialog routine
         * is played.
         *
         * @param thing   A Player touching other.
         * @param other   A DetectCollision being touched by thing.
         */
        collideCastleNPC(thing: IPlayer, other: IDetectCollision): void;

        /**
         * Collision callback for a player hitting the transportation Platform in
         * cloud worlds. A player collides with it as normal for solids, but if
         * a Player is then resting on it, it becomes a normal moving platform
         * with only horizontal momentum.
         *
         * @param thing   A Player touching other.
         * @param other   A Solid being touched by thing.
         */
        collideTransport(thing: IPlayer, other: ISolid): void;

        /**
         * General collision callback for DetectCollision Things. The real activate
         * callback is only hit if the Thing is a player; otherwise, an optional
         * activateFail may be activated. The DetectCollision is then killed if it
         * doesn't have the noActivateDeath flag.
         *
         * @param thing   A Character touching other.
         * @param other   A DetectCollision being touched by thing.
         */
        collideDetector(thing: ICharacter, other: IDetectCollision): void;

        /**
         * Collision callback for level transports (any Thing with a .transport
         * attribute). Depending on the transport, either the map or location are
         * shifted to it.
         *
         * @param thing   A Player touching other.
         * @param other   A Solid being touched by thing.
         */
        collideLevelTransport(thing: IPlayer, other: ISolid): void;

        /**
         * Base, generic movement Function for simple characters. The Thing moves
         * at a constant rate in either the x or y direction, and switches direction
         * only if directed by the engine (e.g. when it hits a Solid)
         *
         * @param thing   A Character that should move.
         * @remarks thing.speed is the only required member attribute; .direction
         *          and .moveleft should be set by the game engine.
         */
        moveSimple(thing: ICharacter): void;

        /**
         * Extension of the moveSimple movement Function for Things that shouldn't
         * fall off the edge of their resting blocks
         *
         * @param thing   A Character that should move.
         */
        moveSmart(thing: ICharacter): void;

        /**
         * Extension of the moveSimple movement Function for Things that should
         * jump whenever they start resting.
         *
         * @param thing   A Character that should move.
         * @remarks thing.jumpheight is required to know how high to jump.
         */
        moveJumping(thing: ICharacter): void;

        /**
         * Movement Function for Characters that slide back and forth, such as
         * HammerBros and Lakitus.
         *
         * @param thing   A HammerBro or Lakitu that should move.
         * @remarks thing.counter must be set elsewhere, such as during spawning.
         */
        movePacing(thing: IHammerBro | ILakitu): void;

        /**
         * Movement Function for HammerBros. They movePacing, look towards the
         * player, and have the nocollidesolid flag if they're jumping up or
         * intentionally falling through a solid.
         *
         * @param thing   A HammerBro that should move.
         */
        moveHammerBro(thing: IHammerBro): void;

        /**
         * Movement Function for Bowser. Bowser always faces a Player and
         * movePaces if he's to the right of a Player, or moves to the right if
         * he's to the left.
         *
         * @param thing   A Bowser that should move.
         */
        moveBowser(thing: IBowser): void;

        /**
         * Movement Function for Bowser's spewed fire. It has a ylev stored from
         * creation that will tell it when to stop changing its vertical
         * velocity from this Function; otherwise, it shifts its vertical
         * position to move to the ylev.
         *
         * @param thing   A BowserFire that should move.
         */
        moveBowserFire(thing: IBowserFire): void;

        /**
         * Movement function for Things that float up and down (vertically).
         * If the Thing has reached thing.begin or thing.end, it gradually switches
         * thing.yvel
         *
         * @param thing   A Thing that should move.
         * @remarks thing.maxvel is used as the maximum absolute speed vertically
         * @remarks thing.begin and thing.end are used as the vertical endpoints;
         *          .begin is the bottom and .end is the top (since begin <= end)
         */
        moveFloating(thing: IThingFloating): void;

        /**
         * Actual movement Function for Things that float sideways (horizontally).
         * If the Thing has reached thing.begin or thing.end, it gradually switches
         * thing.xvel.
         *
         * @param thing   A Thing that should move.
         * @remarks thing.maxvel is used as the maximum absolute speed horizontally
         * @remarks thing.begin and thing.end are used as the horizontal endpoints;
         *          .begin is the left and .end is the right (since begin <= end)
         */
        moveSliding(thing: IThingSliding): void;

        /**
         * Ensures thing.begin <= thing.end (so there won't be glitches pertaining
         * to them in functions like moveFloating and moveSliding
         *
         * @param thing   A spawning Thing that needs its movement endpoings set.
         */
        setMovementEndpoints(thing: IThingFloating | IThingSliding): void;

        /**
         * General movement Function for Platforms. Moves a Platform by its
         * velocities, and checks for whether a Thing is resting on it (if so,
         * the Thing is accordingly).
         *
         * @param thing   A Platform that should move.
         */
        movePlatform(thing: IPlatform): void;

        /**
         * Movement Function for platforms that are in a PlatformGenerator. They
         * have the typical movePlatform applied to them, but if they reach the
         * bottom or top of the screen, they are shifted to the opposite side.
         *
         * @param thing   A Platform that should move.
         */
        movePlatformSpawn(thing: IPlatform): void;

        /**
         * Movement Function for Platforms that fall whenever rested upon by a
         * player. Being rested upon means the Platform falls; when it reaches a
         * terminal velocity, it switches to moveFreeFalling forever.
         *
         * @param thing   A Platform that should move.
         */
        moveFalling(thing: IPlatform): void;

        /**
         * Movement Function for Platforms that have reached terminal velocity in
         * moveFalling and are now destined to die. The Platform will continue to
         * accelerate towards certain death until another velocity threshold,
         * and then switches to movePlatform to remain at that rate.
         *
         * @param thing   A Platform that should move.
         */
        moveFreeFalling(thing: IPlatform): void;

        /**
         * Movement Function for Platforms that are a part of a scale.  Nothing
         * happens if a Platform isn't being rested and doesn't have a y-velocity.
         * Being rested upon means the y-velocity increases, and not being rested
         * means the y-velocity decreases: either moves the corresponding Platform
         * "partner" in the other vertical direction. When the Platform is too far
         * down (visually has no string left), they both fall.
         *
         * @param thing   A Platform that should move.
         */
        movePlatformScale(thing: IPlatform): void;

        /**
         * Movement Function for Vines. They are constantly growing upward, until
         * some trigger (generally from animateEmergeVine) sets movement to
         * undefined. If there is an attached Thing, it is moved up at the same rate
         * as the Vine.
         *
         * @param thing   A Vine that should move.
         */
        moveVine(thing: IVine): void;

        /**
         * Movement Function for Springboards that are "pushing up" during or after
         * being hit by a player. The Springboard changes its height based on its
         * tension. If a Player is still on it, then a Player is given extra
         * vertical velocity and taken off.
         *
         * @param thing   A Springboard that should move.
         */
        moveSpringboardUp(thing: ISpringboard): void;

        /**
         * Movement Function for Shells. This actually does nothing for moving
         * Shells (since they only interact unusually on collision). For Shells with
         * no x-velocity, a counting variable is increased. Once it reaches 350, the
         * shell is "peeking" visually; when it reaches 490, the Shell spawns back
         * into its original spawner (typically Koopa or Beetle).
         *
         * @param thing   A Shell that should move.
         */
        moveShell(thing: IShell): void;

        /**
         * Movement Function for Piranhas. These constantly change their height
         * except when they reach 0 or full height (alternating direction), at which
         * point they switch to movePiranhaLatent to wait to move in the opposite
         * direction.
         *
         * @param thing   A Piranha that should move.
         */
        movePiranha(thing: IPiranha): void;

        /**
         * Movement Function for Piranhas that are not changing size. They wait
         * until a counter reaches a point (and then, if their height is 0, for the
         * player to go away) to switch back to movePiranha.
         *
         * @param thing   A Piranha that should move.
         */
        movePiranhaLatent(thing: IPiranha): void;

        /**
         * Movement Function for the Bubbles that come out of a player's mouth
         * underwater. They die when they reach a top threshold of unitsize * 16.
         *
         * @param thing   A Thing that should move.
         */
        moveBubble(thing: IThing): void;

        /**
         * Movement Function for typical CheepCheeps, which are underwater. They
         * move according to their native velocities except that they cannot travel
         * above the unitsize * 16 top threshold.
         *
         * @param thing   A CheepCheep that should move.
         */
        moveCheepCheep(thing: ICheepCheep): void;

        /**
         * Movement Function for flying CheepCheeps, like in bridge areas. They
         * lose a movement Function (and therefore just fall) at a unitsize * 28 top
         * threshold.
         *
         * @param thing   A CheepCheep that should move.
         */
        moveCheepCheepFlying(thing: IThing): void;

        /**
         * Movement Function for Bloopers. These switch between "squeezing" (moving
         * down) and moving up ("unsqueezing"). They always try to unsqueeze if the
         * player is above them.
         *
         * @param thing   A Blooper that should move.
         */
        moveBlooper(thing: IBlooper): void;

        /**
         * Additional movement Function for Bloopers that are "squeezing". Squeezing
         * Bloopers travel downard at a gradual pace until they reach either the
         * player's bottom or a threshold of unitsize * 90.
         *
         * @param thing   A Blooper that should move.
         */
        moveBlooperSqueezing(thing: IBlooper): void;

        /**
         * Movement Function for Podoboos that is only used when they are falling.
         * Podoboo animations trigger this when they reach a certain height, and
         * use this to determine when they should stop accelerating downward, which
         * is their starting location.
         *
         * @param thing   A Podoboo that should move.
         */
        movePodobooFalling(thing: IPodoboo): void;

        /**
         * Movement Function for Lakitus that have finished their moveLakituInitial
         * run. This is similar to movePacing in that it makes the Lakitu pace to
         * left and right of a Player, and moves with a Player rather than the
         * scrolling window.
         *
         * @param thing   A Lakitu that should move.
         */
        moveLakitu(thing: ILakitu): void;

        /**
         * Initial entry movement Function for Lakitus. They enter by sliding across
         * the top of the screen until they reach a Player, and then switch to
         * their standard moveLakitu movement.
         *
         * @param thing   A Lakitu that should move.
         */
        moveLakituInitial(thing: ILakitu): void;

        /**
         * Alternate movement Function for Lakitus. This is used when a Player
         * reaches the ending flagpole in a level and the Lakitu just flies to the
         * left.
         *
         * @param thing   A Lakitu that should move.
         */
        moveLakituFleeing(thing: ILakitu): void;

        /**
         * Movement Function for Coins that have been animated. They move based on
         * their yvel, and if they have a parent, die when they go below the parent.
         *
         * @param thing   A Coin that should move up.
         * @param parent   A parent Solid spawning thing.
         */
        moveCoinEmerge(thing: ICoin, parent?: ISolid): void;

        /**
         * Movement Function for a Player. It reacts to almost all actions that
         * to be done, but is horribly written so that is all the documentation you
         * get here. Sorry! Sections are labeled on the inside.
         *
         * @param thing   A player that should move.
         */
        movePlayer(thing: IPlayer): void;

        /**
         * Alternate movement Function for players attached to a Vine. They may
         * climb up or down the Vine, or jump off.
         *
         * @param thing   A Player that should move.
         */
        movePlayerVine(thing: IPlayer): void;

        /**
         * Movement Function for players pressing down onto a Springboard. This does
         * basically nothing except check for when a Player is off the spring or
         * the spring is fully contracted. The former restores a Player's movement
         * and the latter clears it (to be restored in moveSpringboardUp).
         *
         * @param thing   A Player that should move.
         */
        movePlayerSpringboardDown(thing: IPlayer): void;

        /**
         * Animates a solid that has just had its bottom "bumped" by a player. It
         * moves with a dx that is initially negative (up) and increases (to down).
         *
         * @param thing   A Solid being bumped.
         */
        animateSolidBump(thing: ISolid): void;

        /**
         * Animates a Block to switch from unused to used.
         *
         * @param thing   A Block that is now marked as used.
         */
        animateBlockBecomesUsed(thing: IBlock): void;

        /**
         * Animates a solid to have its contents emerge. A new Thing based on the
         * contents is spawned directly on top of (visually behind) the solid, and
         * has its animate callback triggered.
         *
         * @param thing   A Solid whose contents are coming out.
         * @param other   A Playe triggering the Solid contents.
         * @remarks If the contents are "Mushroom" and a large player hits the
         *          solid, they turn into "FireFlower".
         * @remarks For level editors, if thing.contents is falsy, the prototype
         *          is tried (so nothing becomes Coin in Blocks).
         */
        animateSolidContents(thing: IBrick | IBlock, other: IPlayer): ICharacter;

        /**
         * Animates a Brick turning into four rotating shards flying out of it. The
         * shards have an initial x- and y-velocities, and die after 70 steps.
         *
         * @param thing   A destroyed Brick to be animated.
         */
        animateBrickShards(thing: IBrick): void;

        /**
         * Standard animation Function for Things emerging from a solid as contents.
         * They start at inside the solid, slowly move up, then moveSimple until
         * they're off the solid, at which point they revert to their normal
         * movement.
         *
         * @param thing   A Character emerging from other.
         * @param other   A Solid that thing is emerging from.
         */
        animateEmerge(thing: ICharacter, other: ISolid): void;

        /**
         * Animation Function for Coins emerging from (or being hit by) a solid. The
         * Coin switches to the Scenery group, rotates between animation classes,
         * moves up then down then dies, plays the "Coin" sound, and increaes the
         * "coins" and "score" statistics.
         *
         * @param thing   A Coin emerging from other.
         * @param other   A Solid thing is emerging from.
         */
        animateEmergeCoin(thing: ICoin, other: ISolid): void;

        /**
         * Animation Function for a Vine emerging from a solid. It continues to grow
         * as normal via moveVine for 700 steps, then has its movement erased to
         * stop.
         *
         * @param thing   A Vine emerging from other.
         * @param other   A Solid thing is emerging from.
         */
        animateEmergeVine(thing: IVine, solid: ISolid): void;

        /**
         * Animates a "flicker" effect on a Thing by repeatedly toggling its hidden
         * flag for a little while.
         *
         * @param thing   A Thing switching between hidden and visible.
         * @param cleartime   How long to wait to stop the effect (by default, 49).
         * @param interval   How many steps between hidden toggles (by default, 2).
         */
        animateFlicker(thing: IThing, cleartime?: number, interval?: number): void;

        /**
         * Animate Function for a HammerBro to throw a hammer. The HammerBro
         * switches to the "throwing" class, waits and throws a few repeats, then
         * goes back to normal.
         *
         * @param thing   A HammerBro throwing hammers.
         * @param count   How many times left there are to throw a hammer. If equal
         *                to 3, a hammer will not be thrown (to mimic the pause in
         *                the original game).
         */
        animateThrowingHammer(thing: IHammerBro, count: number): boolean;

        /**
         * Animation Function for when Bowser jumps. This will only trigger if he is
         * facing left and a player exists. If either Bowser or a Player die, it
         * is cancelled. He is given a negative yvel to jump, and the nocollidesolid
         * flag is enabled as long as he is rising.
         *
         * @param thing   A Bowser about to jump.
         * @returns Whether to stop the event interval occasionally triggering this.
         */
        animateBowserJump(thing: IBowser): boolean;

        /**
         * Animation Function for when Bowser fires. This will only trigger if he is
         * facing left and a player exists. If either Bowser or a Player die, it
         * is cancelled. His mouth is closed and an animateBowserFireOpen call is
         * scheduled to complete the animation.
         *
         * @param thing   A Bowser about to fire.
         * @returns Whether to stop the event interval occasionally triggering this.
         */
        animateBowserFire(thing: IBowser): boolean;

        /**
         * Animation Function for when Bowser actually fires. A BowserFire Thing is
         * placed at his mouth, given a (rounded to unitsize * 8) destination y, and
         * sent firing to a Player.
         *
         * @param thing   A Bowser opening its mouth.
         * @returns Whether to stop the event interval occasionally triggering this.
         */
        animateBowserFireOpen(thing: IBowser): boolean;

        /**
         * Animation Function for when Bowser throws a Hammer. It's similar to a
         * HammerBro, but the hammer appears on top of Bowser for a few steps
         * before being thrown in the direction Bowser is facing (though it will
         * only be added if facing left).
         *
         * @param thing   A Bowser about to throw a hammer.
         * @returns Whether to stop the event interval occasionally triggering this.
         */
        animateBowserThrow(thing: IBowser): boolean;

        /**
         * Animation Function for when Bowser freezes upon a Player hitting a
         * CastleAxe. Velocity and movement are paused, and the Bowser is added to
         * the current cutscene's settings.
         *
         * @param thing   A Bowser that has just been killed.
         * @remarks This is triggered as Bowser's killonend property.
         */
        animateBowserFreeze(thing: IBowser): void;

        /**
         * Animation Function for a standard jump, such as what HammerBros do. The
         * jump may be in either up or down, chosen at random by the NumberMaker.
         * Steps are taken to ensure the Thing does not collide at improper points
         * during the jump.
         *
         * @param thing   A HammerBro about to jump.
         * @returns Whether to stop the event interval occasionally triggering this.
         */
        animateJump(thing: IHammerBro): boolean;

        /**
         * Animation Function for Bloopers starting to "unsqueeze". The "squeeze"
         * class is removed, their height is reset to 12, and their counter reset.
         *
         * @param thing   An unsqueezing Blooper.
         */
        animateBlooperUnsqueezing(thing: IBlooper): void;

        /**
         * Animation Function for Podoboos jumping up. Their top is recorded and a
         * large negative yvel is given; after the jumpheight number of steps, they
         * fall back down.
         *
         * @param thing   A Podoboo jumping up.
         */
        animatePodobooJumpUp(thing: IPodoboo): void;

        /**
         * Animation Function for when a Podoboo needs to stop jumping. It obtains
         * the movePodobooFalling movement to track its descent.
         *
         * @param thing   A Podoboo jumping down.
         */
        animatePodobooJumpDown(thing: IPodoboo): void;

        /**
         * Animation Function for a Lakitu throwing a SpinyEgg. The Lakitu hides
         * behind its cloud ("hiding" class), waits 21 steps, then throws an egg up
         * and comes out of "hiding".
         *
         * @param thing   A Lakitu throwing a Spiny.
         * @returns Whether to stop the event interval occasionally triggering this.
         */
        animateLakituThrowingSpiny(thing: ILakitu): boolean;

        /**
         * Animation Function for when a SpinyEgg hits the ground. The SpinyEgg is
         * killed and a Spiny is put in its place, moving towards a Player.
         *
         * @param thing   A SpinyEgg hatching into a Spiny.
         */
        animateSpinyEggHatching(thing: ISpinyEgg): void;

        /**
         * Animation Function for when a Fireball emerges from a Player. All that
         * happens is the "Fireball" sound plays.
         *
         * @param thing   A Fireball emerging from a Player.
         */
        animateFireballEmerge(thing: IFireball): void;

        /**
         * Animation Function for when a Fireball explodes. It is deleted and,
         * unless big is === 2 (as this is used as a kill Function), a Firework is
         * put in its place.
         *
         * @param thing   An exploding Fireball.
         * @param big   The "level" of death this is (a 2 implies this is a sudden
         *              death, without animations).
         */
        animateFireballExplode(thing: IFireball, big?: number): void;

        /**
         * Animation Function for a Firework, triggered immediately upon spawning.
         * The Firework cycles between "n1" through "n3", then dies.
         *
         * @param thing   An exploding Firework.
         */
        animateFirework(thing: IFirework): void;

        /**
         * Animation Function for a Cannon outputting a BulletBill. This will only
         * happen if the Cannon isn't within 8 units of a Player. The spawn flies
         * at a constant rate towards a Player.
         *
         * @param thing   A firing Cannon.
         */
        animateCannonFiring(thing: ICannon): void;

        /**
         * Animation Function for a fiery player throwing a Fireball. A player may
         * only do so if fewer than 2 other thrown Fireballs exist. A new Fireball
         * is created in front of where a Player is facing and are sent bouncing
         * away.
         *
         * @param thing   A Player throwing a fireball.
         */
        animatePlayerFire(thing: IPlayer): void;

        /**
         * Animation Function that regularly spings CastleFireballs around their
         * parent CastleBlock. The CastleBlock's location and angle determine the
         * location of each CastleFireball, and its dt and direction determine how
         * the angle is changed for the next call.
         *
         * @param thing   A CastleBlock with CastleFireballs around it.
         * @param balls   CastleFireballs rotating from thing's center.
         */
        animateCastleBlock(thing: ICastleBlock, balls: ICastleFireball[]): void;

        /**
         * Animation Function to close a CastleBridge when a Player triggers its
         * killonend after hitting the CastleAxe in EndInsideCastle. Its width is
         * reduced repeatedly on an interval until it's 0.
         *
         * @param thing   A CastleBridge opening from a CastleAxe's trigger.
         * @remarks This is triggered as the killonend property of the bridge.
         */
        animateCastleBridgeOpen(thing: ISolid): void;

        /**
         * Animation Function for when a CastleChain opens, which just delays a
         * killNormal call for 7 steps.
         *
         * @param thing   A CastleChain opening from a CastleAxe's trigger.
         * @remarks This is triggered as the killonend property of the chain.
         */
        animateCastleChainOpen(thing: ISolid): void;

        /**
         * Animation Function for when a Player paddles underwater. Any previous
         * Any previous paddling classes and cycle are removed, and a new one is
         * added that, when it finishes, remnoves a Player's paddlingCycle as
         * well.
         *
         * @param thing   A Player paddling in water.
         */
        animatePlayerPaddling(thing: IPlayer): void;

        /**
         * Animation Function for when a player lands to reset size and remove
         * hopping (and if underwater, paddling) classes. The mod event is fired.
         *
         * @param thing   A Player landing on a Solid.
         */
        animatePlayerLanding(thing: IPlayer): void;

        /**
         * Animation Function for when a Player moves off a resting solid. It
         * sets resting to undefined, and if underwater, switches the "running" and
         * "paddling" classes.
         *
         * @param thing   A Player moving off a resting Solid.
         */
        animatePlayerRestingOff(thing: IPlayer): void;

        /**
         * Animation Function for when a player breathes a underwater. This creates
         * a Bubble, which slowly rises to the top of the screen.
         *
         * @param thing   An underwater Player.
         */
        animatePlayerBubbling(thing: IPlayer): void;

        /**
         * Animation Function to give a Player a cycle of running classes. The
         * cycle auto-updates its time as a function of how fast a Player is
         * moving relative to its maximum speed.
         *
         * @param thing   A running player.
         */
        animatePlayerRunningCycle(thing: IPlayer): void;

        /**
         * Completely pauses a Thing by setting its velocities to zero and disabling
         * it from falling, colliding, or moving. Its old attributes for those are
         * saved so thingResumeVelocity may restore them.
         *
         * @param thing   A Character being forzen in place.
         * @param keepMovement   Whether to keep movement instead of wiping it
         *                       (by default, false).
         */
        animateCharacterPauseVelocity(thing: ICharacter, keepMovement?: boolean): void;

        /**
         * Resumes a Thing's velocity and movements after they were paused by
         * thingPauseVelocity.
         *
         * @param thing   A Character being unfrozen.
         * @param noVelocity   Whether to skip restoring the Thing's velocity
         *                     (by default, false).
         */
        animateCharacterResumeVelocity(thing: ICharacter, noVelocity?: boolean): void;

        /**
         * Animation Function for when a player hops on an enemy. Resting is set to
         * undefined, and a small vertical yvel is given.
         *
         * @param thing   A Character hopping up.
         */
        animateCharacterHop(thing: ICharacter): void;

        /**
         * Animation Function to start a player transferring through a Pipe. This is
         * generic for entrances and exists horizontally and vertically: movement
         * and velocities are frozen, size is reset, and the piping flag enabled.
         * a Player is also moved into the Scenery group to be behind the Pipe.
         *
         * @param thing   A Player entering a Pipe.
         */
        animatePlayerPipingStart(thing: IPlayer): void;

        /**
         * Animation Function for when a player is done passing through a Pipe. This
         * is abstracted for exits both horizontally and vertically, typically after
         * an area has just been entered.
         *
         * @param thing   A Player completing a pass through a Pipe.
         */
        animatePlayerPipingEnd(thing: IPlayer): void;

        /**
         * Animation Function for when a player is hopping off a pole. It hops off
         * and faces the opposite direction.
         *
         * @param thing   A Player moving a way from a pole.
         * @param doRun   Whether a Player should have a running cycle added
         *                added immediately, such as during cutscenes (by
         *                default, false).
         */
        animatePlayerOffPole(thing: IPlayer, doRun?: boolean): void;

        /**
         * Animation Function for when a player must hop off a Vine during an area's
         * opening cutscene. A player switches sides, waits 14 steps, then calls
         * animatePlayerOffPole.
         *
         * @param thing   A Player moving away from a Vine.
         */
        animatePlayerOffVine(thing: IPlayer): void;

        /**
         * Makes one Thing look towards another, chainging lookleft and moveleft in
         * the process.
         *
         * @param thing   A Character looking towards other.
         * @param other   A Thing being looked at by thing.
         */
        lookTowardsThing(thing: ICharacter, other: IThing): void;

        /**
         * Makes one Thing look towards a Player, chainging lookleft and moveleft
         * in the process.
         *
         * @param thing   A Character looking towards the Player.
         * @param big   Whether to always change lookleft and moveleft,
         *              even if lookleft is already accurate (by
         *              default, false).
         */
        lookTowardsPlayer(thing: ICharacter, big?: boolean): void;

        /**
         * Standard Function to kill a Thing, which means marking it as dead and
         * clearing its numquads, resting, movement, and cycles. It will later be
         * marked as gone by its maintain* Function (Solids or Characters).
         *
         * @param thing   A Thing to kill.
         */
        killNormal(thing: IThing): void;

        /**
         * Death Function commonly called on characters to animate a small flip
         * before killNormal is called.
         *
         * @param thing   A Thing to kill.
         * @param extra   How much time to wait beyond the standard 70 steps
         *                before calling killNormal (by default, 0).
         */
        killFlip(thing: ICharacter, extra?: number): void;

        /**
         * Kill Function to replace a Thing with a spawned Thing, determined by the
         * thing's spawnType, in the same location.
         *
         * @param thing    A Thing to kill.
         * @param big   Whether this should skip creating the spawn (by default,
         *              false).
         */
        killSpawn(thing: ICharacter, big?: boolean): IThing;

        /**
         * A kill Function similar to killSpawn but more configurable. A spawned
         * Thing is created with the given attributes and copies over any specified
         * attributes from the original Thing.
         *
         * @param thing   A Thing to kill.
         * @param title   The type of new Thing to create, such as "Goomba".
         * @param attributes   An optional object to pass in to the ObjectMaker.make
         *                     call (by default, {}).
         * @param attributesCopied   An optional listing of attributes to copy from
         *                           the original Thing (by default, none).
         */
        killReplace(thing: IThing, title: string, attributes?: any, attributesCopied?: string[]): IThing;

        /**
         * Kill Function for Goombas. If big isn't specified, it replaces the
         * killed Goomba with a DeadGoomba via killSpawn.
         *
         * @param thing   A Goomba to kill.
         * @param big   Whether to call killFlip on the Thing instead of
         *              killSpawn, such as when a Shell hits it.
         */
        killGoomba(thing: IGoomba, big?: boolean): void;

        /**
         * Kill Function for Koopas. Jumping and floating Koopas are replacing with
         * an equivalent Koopa that's just walking, while walking Koopas become
         * Shells.
         *
         * @param thing   A Koopa to kill.
         * @param big   Whether shells should be immediately killed.
         * @remarks This isn't called when a Shell hits a Koopa.
         */
        killKoopa(thing: IKoopa, big?: boolean): ICharacter;

        /**
         * Kill Function for Lakitus. If this is the last Lakitu in Characters,
         * a new one is scheduled to be spawned at the same y-position.
         *
         * @param thing   A Lakitu to kill.
         */
        killLakitu(thing: ILakitu): void;

        /**
         * Kill Function for Bowsers. In reality this is only called when a Player
         * Fireballs him or all NPCs are to be killed. It takes five Fireballs to
         * killFlip a Bowser, which scores 5000 points.
         *
         * @param thing   A Bowser to kill.
         * @param big   Whether this should default to killFlip, as in an
         *              EndInsideCastle cutscene.
         */
        killBowser(thing: IBowser, big?: boolean): void;

        /**
         * Kills a Thing by replacing it with another Thing, typically a Shell or
         * BeetleShell (determined by thing.shelltype). The spawn inherits smartness
         * and location from its parent, and is temporarily given nocollidechar to
         * stop double collision detections.
         *
         * @param thing   A Character to kill.
         * @param big   Whether the spawned Shell should be killed
         *              immediately (by default, false).
         */
        killToShell(thing: ICharacter, big?: number): IShell;

        /**
         * Wipes the screen of any characters or solids that should be gone during
         * an important cutscene, such as hitting an end-of-level flag.
         * For characters, they're deleted if .nokillonend isn't truthy. If they
         * have a .killonend function, that's called on them.
         * Solids are only deleted if their .killonend is true.
         *
         * @remarks If thing.killonend is a Function, it is called on the Thing.
         */
        killNPCs(): void;

        /**
         * Kill Function for Bricks. The Brick is killed an an animateBrickShards
         * animation is timed. If other is provided, it's also marked as the Brick's
         * up, which will kill colliding characters: this works because
         * maintainSolids happens before maintainCharacters, so the killNormal won't
         * come into play until after the next maintainCharacters call.
         *
         * @param thing   A Brick to kill.
         * @param other   An optional Character to mark as the cause of the
         *                Brick's death (its up attribute).
         */
        killBrick(thing: IBrick, other?: ICharacter): void;

        /**
         * Kill Function for a Player. It's big and complicated, but in general...
         * 1. If big === 2, just kill it altogether
         * 2. If a Player is large and big isn't true, just power down a Player.
         * 3. A player can't survive this, so animate the "shrug" class and an
         *    up-then-down movement.
         * At the end of 1. and 3., decrease the "lives" and "power" statistics and
         * call the equivalent onPlayerDeath or onGameOver callbacks, depending on
         * how many lives are left. The mod event is also fired.
         *
         * @param thing   A Player to kill.
         * @param big   The severity of this death: 0 for normal, 1 for not
         *              survivable, or 2 for immediate death.
         */
        killPlayer(thing: IPlayer, big?: number): void;

        /**
         * Determines how many points should be gained from a number of consecutive
         * enemy deaths (such as via hops or shells).
         *
         * @param level   How many deaths have happened.
         * @returns How many points should be gained (or 0, for having gained a life).
         */
        findScore(level: number): number;

        /**
         * Driver function to score some number of points for a Player and show
         * the gains via an animation.
         *
         * @param value   How many points a Player is receiving.
         * @param continuation   Whether the game shouldn't increase the score
         *                       amount in the ItemsHoldr (this will only be
         *                       false on the first score() call).
         * @remarks For point gains that should not have a visual animation,
         *          directly call ItemsHolder.increase("score", value).
         * @remarks The calling chain will be:
         *              score -> scoreOn -> scoreAnimateOn -> scoreAnimate
         */
        score(value: number, continuation?: boolean): void;

        /**
         * Scores a given number of points for a Player, and shows the gains via
         * an animation centered at the top of a thing.
         *
         * @param value   How many points a Player is receiving.
         * @param thing   An in-game Thing to place the visual score text
         *                        on top of and centered.
         * @param continuation   Whether the game shouldn't increase the score
         *                       amount in the ItemsHoldr (this will only be
         *                       false on the first score() call).
         * @remarks The calling chain will be:
         *              scoreOn -> scoreAnimateOn -> scoreAnimate
         */
        scoreOn(value: number, thing: IThing, continuation?: boolean): void;

        /**
         * Centers a text associated with some points gain on the top of a Thing,
         * and animates it updward, setting an event for it to die.
         *
         * @param text   The text whose position is being manipulated.
         * @param thing   An in-game Thing to place the visual score text
         *                on top of and centered.
         * @remarks The calling chain will be:
         *              scoreAnimateOn -> scoreAnimate
         */
        scoreAnimateOn(text: IText, thing: IThing): void;

        /**
         * Animates a score on top of a Thing.
         *
         * @param thing   An in-game Thing to place the visual score text
         *                on top of and centered.
         * @param timeout   How many game ticks to wait before killing
         *                  the text (by default, 28).
         * @remarks This is the last function in the score() calling chain:
         *              scoreAnimate <- scoreAnimateOn <- scoreOn <- score
         */
        scoreAnimate(thing: IThing, timeout?: number): void;

        /**
         * Inelegant catch-all Function for when a Player has hit a shell and
         * needs points to be scored. This takes into account player star status and
         * Shell resting and peeking. With none of those modifiers, it defaults to
         * scoreOn with 400.
         *
         * @param thing   A Player hitting other.
         * @param other   A Shell being hit by thing.
         * @remarks See http://themushroomkingdom.net/smb_breakdown.shtml
         */
        scorePlayerShell(thing: IPlayer, other: IShell): void;

        /**
         * Determines the amount a Player should score upon hitting a flagpole,
         * based on the Player's y-position.
         *
         * @param thing   A Player hitting a flagpole
         * @param difference   How far up the pole the collision happened,
         *                     by absolute amount (not multiplied by
         *                     unitsize).
         * @returns How many points to award.
         * @remarks See http://themushroomkingdom.net/smb_breakdown.shtml
         */
        scorePlayerFlag(thing: IThing, difference: number): number;

        /**
         * Determines how loud a sound should be at an x-location. This
         * is louder closer to a Player, and nothing to the right of the
         * visible screen.
         *
         * @param FSM
         * @param xloc   The x-location of the sound's source.
         * @returns How loud the sound should be, in [0,1].
         */
        getVolumeLocal(FSM: IFullScreenMario, xloc: number): number;

        /**
         * Determines the name of the default theme for the current area,
         * which is the first word in the area's setting (split on spaces).
         *
         * @param FSM
         * @returns The default theme for the current area.
         */
        getAudioThemeDefault(FSM: IFullScreenMario): string;

        /**
         * Sets the game state to a new map, resetting all Things and inputs in the
         * process. The mod events are fired.
         *
         * @param name   The name of the map (by default, the currently
         *               played one).
         * @param location   The name of the location within the map (by
         *                   default, 0 for the first in Array form).
         * @remarks Most of the work here is done by setLocation.
         */
        setMap(name?: string | IFullScreenMario, location?: string | number): void;

        /**
         * Sets the game state to a location within the current map, resetting all
         * Things, inputs, the current Area, PixelRender, and MapScreener in the
         * process. The location's entry Function is called to bring a new Player
         * into the game. The mod events are fired.
         *
         * @param name   The name of the location within the map (by
         *               default, 0 for the first in Array form).
         */
        setLocation(name?: string | number): void;

        /**
         * Standard map entrance Function for dropping from the ceiling. A new
         * player is placed 16x16 units away from the top-left corner, with
         * location.xloc scrolling applied if necessary.
         *
         * @param FSM
         * @param location   The calling Location entering into (by default,
         *                   not used).
         */
        mapEntranceNormal(FSM: IFullScreenMario, location?: ILocation): void;

        /**
         * Standard map entrance Function for starting on the ground. A new player
         * is placed 16x16 units away from the top-left corner, with location.xloc
         * scrolling applied if necessary.
         *
         * @param FSM
         * @param location   The calling Location entering into (by default,
         *                   not used).
         */
        mapEntrancePlain(FSM: IFullScreenMario, location?: ILocation): void;

        /**
         * Map entrance Function for starting on the ground and immediately walking
         * as if in a cutscene. mapEntrancePlain is immediately called, and the
         * player has movement forced to be walking, with nokeys and notime set to
         * true.
         *
         * @param FSM
         * @param location   The calling Location entering into (by default,
         *                   not used).
         */
        mapEntranceWalking(FSM: IFullScreenMario, location?: ILocation): void;

        /**
         * Map entrance Function for entering a castle area. A player is simply
         * added at 2 x 56.
         *
         * @param FSM
         */
        mapEntranceCastle(FSM: IFullScreenMario): void;

        /**
         * Map entrance Function for entering an area climbing a Vine. The Vine
         * enters first by growing, then a Player climbs it and hops off. The
         * player's actions are done via mapEntranceVinePlayer and are triggered
         * when the Vine's top reaches its threshold.
         *
         * @param FSM
         */
        mapEntranceVine(FSM: IFullScreenMario): void;

        /**
         * Continuation of mapEntranceVine for a Player's actions. A player
         * climbs up the Vine; once it reaches the threshold, it hops off using
         * animatePlayerOffVine.
         *
         * @param FSM
         * @param vine   A Vine bringing a Player up.
         */
        mapEntranceVinePlayer(FSM: IFullScreenMario, vine: IVine): void;

        /**
         * Map entrance Function for coming in through a vertical Pipe. A player
         * is added just below the top of the Pipe, and is animated to rise up
         * through it like an Italian chestburster.
         *
         * @param FSM
         * @param location   The calling Location entering into (by default,
         *                   not used).
         */
        mapEntrancePipeVertical(FSM: IFullScreenMario, location?: ILocation): void;

        /**
         * Map entrance Function for coming in through a horizontal Pipe. A player
         * is added just to the left of the entrance, and is animated to pass
         * through it like an Italian chestburster.
         *
         * @param FSM
         * @param location   The calling Location entering into (by default,
         *                   not used).
         */
        mapEntrancePipeHorizontal(FSM: IFullScreenMario, location?: ILocation): void;

        /**
         * Map entrance Function for a Player reincarnating into a level,
         * typically from a random map. A player is placed at 16 x 0 and a
         * Resting Stone placed some spaces below via playerAddRestingStone.
         *
         * @param FSM
         */
        mapEntranceRespawn(FSM: IFullScreenMario): void;

        /**
         * Map exit Function for leaving through a vertical Pipe. A player is
         * animated to pass through it and then transfer locations.
         *
         * @param thing   A Player exiting through other.
         * @param other   A Pipe sucking in thing.
         */
        mapExitPipeVertical(thing: IPlayer, other: IPipe): void;

        /**
         * Map exit Function for leaving through a horiontal Pipe. A player is
         * animated to pass through it and then transfer locations.
         *
         * @param thing   A Player exiting through other.
         * @param other   A Pipe sucking in thing.
         * @param shouldTransport   Whether not resting and not paddling does
         *                          not imply a Player cannot pass through the
         *                          Pipe (by default, false, as this is normal).
         * @remarks The shouldTransport argument was added because the "Bouncy
         *          Bounce!" mod rendered some areas unenterable without it.
         */
        mapExitPipeHorizontal(thing: IPlayer, other: IPipe, shouldTransport?: boolean): void;

        /**
         * The onMake callback for Areas. Attributes are copied as specified in the
         * prototype, and the background is set based on the setting.
         *
         * @remarks The scope for this will be an Area.
         */
        initializeArea(): void;

        /**
         * Sets an area's background as a function of its setting.
         *
         * @param area   An Area having its background set.
         * @remarks In the future, it might be more elegant to make Areas inherit
         * from base Area types (Overworld, etc.) so this inelegant switch
         * statement doesn't have to be used.
         */
        setAreaBackground(area: IArea): void;

        /**
         * Determines the absolute height of a y-location, which is the distance
         * from the absolute base (bottom of the user's viewport) to a specific
         * height above the floor.
         *
         * @param yloc   A height to find the distance to the floor from.
         * @param correctUnitsize   Whether the yloc accounts for unitsize
         *                          expansion (e.g. 48 rather than 12, for
         *                          unitsize=4).
         * @returns The absolute height of the y-location.
         */
        getAbsoluteHeight(yloc: number, correctUnitsize?: boolean): number;

        /**
         * Adds a PreThing to the map and stretches it to fit a width equal to the
         * current map's outermost boundaries.
         *
         * @param prethingRaw   A raw PreThing descriptor.
         * @returns A strethed Thing, newly added via addThing.
         */
        mapAddStretched(prethingRaw: string | MapsCreatr.IPreThingSettings): IThing;

        /**
         * Analyzes a PreThing to be placed to the right of the current map's
         * boundaries (after everything else).
         *
         * @param prethingRaw   A raw PreThing descriptor.
         */
        mapAddAfter(prethingRaw: string | MapsCreatr.IPreThingSettings): void;

        /**
         * First cutscene for the Flagpole routine. A player becomes invincible and
         * starts sliding down the flagpole, while all other Things are killed.
         * A score calculated by scorePlayerFlag is shown at the base of the pole and
         * works its way up. The collideFlagBottom callback will be fired when a Player
         * reaches the bottom.
         *
         * @param FSM
         * @param settings   Storage for the cutscene from ScenePlayr.
         */
        cutsceneFlagpoleStartSlidingDown(FSM: IFullScreenMario, settings: any): void;

        /**
         * Routine for when a player hits the bottom of a flagpole. It is
         * flipped horizontally, shifted to the other side of the pole, and the
         * animatePlayerOffPole callback is quickly timed.
         *
         * @param FSM
         * @param settings   Storage for the cutscene from ScenePlayr.
         */
        cutsceneFlagpoleHitBottom(FSM: IFullScreenMario, settings: any): void;

        /**
         * Routine for counting down time and increasing score at the end of
         * a level. When it's done, it calls the Fireworks routine.
         *
         * @param FSM
         * @param settings   Storage for the cutscene from ScenePlayr.
         */
        cutsceneFlagpoleCountdown(FSM: IFullScreenMario, settings: any): void;

        /**
         * Animation routine for the fireworks found at the end of EndOutsideCastle.
         * Fireworks are added on a timer (if there should be any), and the level
         * transport is called when any fireworks are done.
         *
         * @param FSM
         * @param settings   Storage for the cutscene from ScenePlayr.
         */
        cutsceneFlagpoleFireworks(FSM: IFullScreenMario, settings: any): void;

        /**
         * Routine for when a player collides with a castle axe. All unimportant NPCs
         * are killed and a Player running again is scheduled.
         *
         * @param FSM
         * @param settings   Storage for the cutscene from ScenePlayr.
         */
        cutsceneBowserVictoryCollideCastleAxe(FSM: IFullScreenMario, settings: any): void;

        /**
         * Routine for a castle bridge opening. Its width is reduced repeatedly on an
         * interval until it's 0, at which point the BowserFalls routine plays.
         *
         * @param FSM
         * @param settings   Storage for the cutscene from ScenePlayr.
         * @remarks The castle bridge's animateCastleBridgeOpen (called via killNPCs
         *          as the bridge's .killonend attribute) is what triggers this.
         */
        cutsceneBowserVictoryCastleBridgeOpen(FSM: IFullScreenMario, settings: any): void;

        /**
         * Routine for Bowser falling after his bridge opens.
         *
         * @param settings   Storage for the cutscene from ScenePlayr.
         * @param FSM
         * @remarks This is called by the CastleBridgeOpen routine, once the bridge
         *          has been reduced to no width.
         */
        cutsceneBowserVictoryBowserFalls(FSM: IFullScreenMario, settings: any): void;

        /**
         * Routine for displaying text above a castle NPC. Each "layer" of text
         * is added in order, after which collideLevelTransport is called.
         *
         * @param settings   Storage for the cutscene from ScenePlayr.
         * @param FSM
         * @remarks This is called by collideCastleNPC.
         */
        cutsceneBowserVictoryDialog(FSM: IFullScreenMario, settings: any): void;

        /**
         * Macro to place a single type of Thing multiple times, drawing from a
         * bottom/left corner to a top/right corner.
         *
         * @alias Fill
         * @param reference   Settings for a FillPreThings macro.
         * @param prethings   The container Area's creation commands.
         * @param area   The container Area.
         * @param map   The container Map.
         * @param FSM   The calling IFullScreenMario.
         * @returns A single type of Thing any number of times.
         */
        macroFillPreThings(reference: IMacroFillPreThingsSettings, prethings: any[], area: IArea, map: IMap, FSM: IFullScreenMario): any;

        /**
         * Macro to continuously place a listing of Things multiple times, from left
         * to right. This is commonly used for repeating background scenery.
         *
         * @alias Pattern
         * @param reference   Settings for a FillPrePattern macro.
         * @param prethings   The container Area's creation commands.
         * @param area   The container Area.
         * @param map   The container Map.
         * @param FSM   The calling IFullScreenMario.
         * @returns Preset Things in a pattern.
         */
        macroFillPrePattern(reference: IMacroFillPrePatternSettings, prethings: any[], area: IArea, map: IMap, FSM: IFullScreenMario): any;

        /**
         * Macro to place a Floor Thing with infinite height. All settings are
         * passed in except "macro", which becomes undefined.
         *
         * @alias Floor
         * @param reference   Settings for a Floor macro.
         * @param prethings   The container Area's creation commands.
         * @param area   The container Area.
         * @param map   The container Map.
         * @param FSM   The calling IFullScreenMario.
         * @returns A single Floor.
         */
        macroFloor(reference: IMacroFloorSettings, prethings: any[], area: IArea, map: IMap, FSM: IFullScreenMario): any;

        /**
         * Macro to place a Pipe, possibly with a pirahna, location hooks, and/or
         * infinite height. All settings are copied to Pipe except for "macro",
         * which becomes undefined.
         *
         * @alias Pipe
         * @param reference   Settings for a Pipe macro.
         * @param prethings   The container Area's creation commands.
         * @param area   The container Area.
         * @param map   The container Map.
         * @param FSM   The calling IFullScreenMario.
         * @returns A Pipe, and potentially a Piranha.
         */
        macroPipe(reference: IMacroPipeSettings, prethings: any[], area: IArea, map: IMap, scope: IFullScreenMario): any;

        /**
         * Macro to place a horizontal Pipe with a vertical one, likely with
         * location hooks.
         *
         * @alias PipeCorner
         * @param reference   Settings for a PipeCorner macro.
         * @param prethings   The container Area's creation commands.
         * @param area   The container Area.
         * @param map   The container Map.
         * @param FSM   The calling IFullScreenMario.
         * @returns A horizontal Pipe and a vertical Pipe.
         */
        macroPipeCorner(reference: IMacroPipeCornerSettings, prethings: any[], area: IArea, map: IMap, scope: any): any;

        /**
         * Macro to place a Tree.
         *
         * @alias Tree
         * @param reference   Settings for a Tree macro.
         * @param prethings   The container Area's creation commands.
         * @param area   The container Area.
         * @param map   The container Map.
         * @param FSM   The calling IFullScreenMario.
         * @returns A Tree and its trunk.
         */
        macroTree(reference: IMacroTreeSettings, prethings: any[], area: IArea, map: IMap, scope: IFullScreenMario): any;

        /**
         * Macro to place a large Shroom (a Tree that looks like a large Mushroom).
         *
         * @alias Shroom
         * @param reference   Settings for a Shroom macro.
         * @param prethings   The container Area's creation commands.
         * @param area   The container Area.
         * @param map   The container Map.
         * @param FSM   The calling IFullScreenMario.
         * @returns A Shroom and its trunk.
         */
        macroShroom(reference: IMacroShroomSettings, prethings: any[], area: IArea, map: IMap, scope: IFullScreenMario): any;

        /**
         * Macro to place Water of infinite height. All settings are copied to the
         * Water except for "macro", which becomes undefined.
         *
         * @alias Water
         * @param reference   Settings for a Water macro.
         * @param prethings   The container Area's creation commands.
         * @param area   The container Area.
         * @param map   The container Map.
         * @param FSM   The calling IFullScreenMario.
         * @returns A Water scenery.
         */
        macroWater(reference: IMacroWaterSettings, prethings: any[], area: IArea, map: IMap, FSM: IFullScreenMario): any;

        /**
         * Macro to place a row of Bricks at y = 88.
         *
         * @alias Ceiling
         * @param reference   Settings for a Ceiling macro.
         * @returns A Brick ceiling.
         */
        macroCeiling(reference: IMacroCeilingSettings): any;

        /**
         * Macro to place a bridge, possibly with columns at the start and/or end.
         *
         * @alias Bridge
         * @param reference   Settings for a Bridge macro.
         * @returns A bridge.
         */
        macroBridge(reference: IMacroBridgeSettings): any;

        /**
         * Macro to place a scale, which is two Platforms seemingly suspended
         * by Strings.
         *
         * @alias Scale
         * @param reference   Settings for a Scale macro.
         * @param prethings   The container Area's creation commands.
         * @param area   The container Area.
         * @param map   The container Map.
         * @param FSM   The calling IFullScreenMario.
         * @returns A scale group.
         */
        macroScale(reference: IMacroScaleSettings, prethings: any[], area: IArea, map: IMap, FSM: IFullScreenMario): any;

        /**
         * Macro to place Platforms traveling and spawning vertically.
         *
         * @alias PlatformGenerator
         * @param reference   Settings for a PlatformGenerator macro.
         * @param prethings   The container Area's creation commands.
         * @param area   The container Area.
         * @param map   The container Map.
         * @param FSM   The calling IFullScreenMario.
         * @returns Multiple Platforms.
         */
        macroPlatformGenerator(
            reference: IMacroPlatformGeneratorSettings,
            prethings: any[],
            area: IArea,
            map: IMap,
            FSM: IFullScreenMario): any;

        /**
         * Macro to place a Warp World group of Pipes, Texts, Piranhas, and
         * detectors.
         *
         * @alias WarpWorld
         * @param reference   Settings for a WarpWorld macro.
         * @param prethings   The container Area's creation commands.
         * @param area   The container Area.
         * @param map   The container Map.
         * @param FSM   The calling IFullScreenMario.
         * @returns A Warp World group.
         */
        macroWarpWorld(reference: IMacroWarpWorldSettings, prethings: any[], area: IArea, map: IMap, FSM: IFullScreenMario): any;

        /**
         * Macro to place a DetectCollision that will start the map spawning random
         * CheepCheeps intermittently.
         *
         * @alias CheepsStart
         * @param reference   Settings for a CheepsStart macro.
         * @param prethings   The container Area's creation commands.
         * @param area   The container Area.
         * @param map   The container Map.
         * @param FSM   The calling IFullScreenMario.
         * @returns A detector to start spawning CheepCheeps.
         */
        macroCheepsStart(reference: IMacroCheepsStartSettings, prethings: any[], area: IArea, map: IMap, FSM: IFullScreenMario): any;

        /**
         * Macro to place a DetectCollision that will stop the map spawning random
         * CheepCheeps intermittently.
         *
         * @alias CheepsStop
         * @param reference   Settings for a CheepsStop macro.
         * @param prethings   The container Area's creation commands.
         * @param area   The container Area.
         * @param map   The container Map.
         * @param FSM   The calling IFullScreenMario.
         * @returns A detector to stop spawning CheepCheeps.
         */
        macroCheepsStop(reference: IMacroCheepsStopSettings, prethings: any[], area: IArea, map: IMap, FSM: IFullScreenMario): any;

        /**
         * Macro to place a DetectCollision that will start the map spawning random
         * BulletBills intermittently.
         *
         * @alias BulletBillsStart
         * @param reference   Settings for a BulletBillsStart macro.
         * @param prethings   The container Area's creation commands.
         * @param area   The container Area.
         * @param map   The container Map.
         * @param FSM   The calling IFullScreenMario.
         * @returns A detector to start spawning BulletBills.
         */
        macroBulletBillsStart(
            reference: IMacroBulletBillsStartSettings,
            prethings: any[],
            area: IArea,
            map: IMap,
            FSM: IFullScreenMario): any;

        /**
         * Macro to place a DetectCollision that will stop the map spawning random
         * BulletBills intermittently.
         *
         * @alias BulletBillsStop
         * @param reference   Settings for a BulletBillsStop macro.
         * @param prethings   The container Area's creation commands.
         * @param area   The container Area.
         * @param map   The container Map.
         * @param FSM   The calling IFullScreenMario.
         * @returns A detector to stop spawning BulletBills.
         */
        macroBulletBillsStop(
            reference: IMacroBulletBillsStopSettings,
            prethings: any[],
            area: IArea,
            map: IMap,
            FSM: IFullScreenMario): any;

        /**
         * Macro to place a DetectCollision that will tell any current Lakitu to
         * flee the scene.
         *
         * @alias LakituStop
         * @param reference   Settings for a LakituStop macro.
         * @param prethings   The container Area's creation commands.
         * @param area   The container Area.
         * @param map   The container Map.
         * @param FSM   The calling IFullScreenMario.
         * @returns A detector to cause any current Lakitu to flee.
         */
        macroLakituStop(reference: IMacroLakituStopSettings, prethings: any[], area: IArea, map: IMap, FSM: IFullScreenMario): any;

        /**
         * Macro to place a small castle, which is really a collection of sceneries.
         *
         * @alias CastleSmall
         * @param reference   Settings for a CastleSmall macro.
         * @param prethings   The container Area's creation commands.
         * @param area   The container Area.
         * @param map   The container Map.
         * @param FSM   The calling IFullScreenMario.
         * @returns A small castle.
         */
        macroCastleSmall(reference: IMacroCastleSettings, prethings: any[], area: IArea, map: IMap, FSM: IFullScreenMario): any;

        /**
         * Macro to place a large castle, which is really a collection of sceneries
         * underneath a small castle.
         *
         * @alias CastleLarge
         * @param reference   Settings for a CastleLarge macro.
         * @param prethings   The container Area's creation commands.
         * @param area   The container Area.
         * @param map   The container Map.
         * @param FSM   The calling IFullScreenMario.
         * @returns A large castle.
         */
        macroCastleLarge(
            reference: IMacroCastleSettings,
            prethings: any[],
            area: MapsCreatr.IMapsCreatrArea,
            map: MapsCreatr.IMapsCreatrMap,
            FSM: IFullScreenMario): any;

        /**
         * Macro to place the typical starting Things for the inside of a castle
         * area.
         *
         * @alias StartInsideCastle
         * @param reference   Settings for a StartInsideCastle macro.
         * @returns A starting zone for the inside of a castle.
         */
        macroStartInsideCastle(reference: IMacroStartInsideCastleSettings): any;

        /**
         * Macro to place the typical ending Things for the inside of an outdoor
         * area.
         *
         * @alias EndOutsideCastle
         * @param reference   Settings for an EndOutsideCastle macro.
         * @param prethings   The container Area's creation commands.
         * @param area   The container Area.
         * @param map   The container Map.
         * @param FSM   The calling IFullScreenMario.
         * @returns An outdoors castle ending.
         */
        macroEndOutsideCastle(
            reference: IMacroEndOutsideCastleSettings,
            prethings: any[],
            area: MapsCreatr.IMapsCreatrArea,
            map: MapsCreatr.IMapsCreatrMap,
            FSM: IFullScreenMario): any;

        /**
         * Macro to place the typical ending Things for the inside of a castle area.
         *
         * @alias EndInsideCastle
         * @param reference   Settings for an EndInsideCastle macro.
         * @param prethings   The container Area's creation commands.
         * @param area   The container Area.
         * @param map   The container Map.
         * @param FSM   The calling IFullScreenMario.
         * @returns An ending zone for inside a castle.
         */
        macroEndInsideCastle(
            reference: IMacroEndInsideCastleSettings,
            prethings: any[],
            area: IArea,
            map: IMap,
            FSM: IFullScreenMario): any;

        /**
         * Macro to place a DetectSpawn that will call activateSectionBefore to
         * start a stretch section.
         *
         * @alias Section
         * @param reference   Settings for a Section macro.
         * @param prethings   The container Area's creation commands.
         * @param area   The container Area.
         * @param map   The container Map.
         * @param FSM   The calling IFullScreenMario.
         * @returns A section.
         */
        macroSection(reference: IMacroSectionSettings, prethings: any[], area: IArea, map: IMap, FSM: IFullScreenMario): any;

        /**
         * Macro to place a DetectCollision to mark the current section as passed.
         *
         * @alias SectionPass
         * @param reference   Settings for a SectionPass macro.
         * @returns A section pass detector.
         */
        macroSectionPass(reference: IMacroSectionPassSettings): any;

        /**
         * Macro to place a DetectCollision to mark the current section as failed.
         *
         * @alias SectionFail
         * @param reference   Settings for a SectionFail macro.
         * @returns A section fail detector.
         */
        macroSectionFail(reference: IMacroSectionFailSettings): any;

        /**
         * Macro to place a DetectSpawn that will spawn a following section based on
         * whether the current one was marked as passed or failed.
         *
         * @alias SectionDecider
         * @param reference   Settings for a SectionDecider macro.
         * @param prethings   The container Area's creation commands.
         * @param area   The container Area.
         * @param map   The container Map.
         * @param FSM   The calling IFullScreenMario.
         * @returns A section decider detector.
         */
        macroSectionDecider(reference: IMacroSectionDeciderSettings): any;

        /**
         * Ensures the current object is a GameStartr by throwing an error if it
         * is not. This should be used for functions in any GameStartr descendants
         * that have to call 'this' to ensure their caller is what the programmer
         * expected it to be.
         *
         * @param {Mixed} current
         */
        ensureCorrectCaller(current: any): IFullScreenMario;
    }
}
