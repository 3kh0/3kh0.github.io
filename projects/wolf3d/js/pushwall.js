/** 
 * @namespace 
 * @description Push wall management
 */
Wolf.PushWall = (function() {

    var PWall = {};
    reset();

    function reset() {
        PWall.active = false;
        PWall.tilesMoved = 0;
        PWall.pointsMoved = 0;
        PWall.dir = 0;
        PWall.x = 0;
        PWall.y = 0;
        PWall.dx = 0; 
        PWall.dy = 0;
        PWall.texX = 0;
        PWall.texY = 0;
    }

    
    function push(level, x, y, dir) {
        var dx, dy;

        if (PWall.active) {
            return false; // another PWall is moving [only one at a time!]
        }

        dx = Wolf.Math.dx4dir[dir];
        dy = Wolf.Math.dy4dir[dir];

        if (level.tileMap[x + dx][y + dy] & (Wolf.SOLID_TILE | Wolf.DOOR_TILE)) {
            // noway (smth is blocking)
            return true;
        }

        // remove secret flag & make everything needed when pushwall used!
        level.tileMap[x][y] &= (~Wolf.SECRET_TILE);
        level.tileMap[x][y] &= (~Wolf.WALL_TILE);
        level.tileMap[x][y] |= Wolf.PUSHWALL_TILE;

        if (++level.state.foundSecrets == level.state.totalSecrets) {
            Wolf.Game.notify("You found the last secret!");
        } else {
            Wolf.Game.notify("You found a secret!");
        }

        Wolf.Sound.startSound(null, null, 1, Wolf.CHAN_AUTO, "sfx/034.wav", 1, Wolf.ATTN_STATIC, 0);

        // good way to avoid stuckness; [un]comment one more down!
        // it makes a tile behind pushwall unpassable
        level.tileMap[x + dx][y + dy] |= Wolf.PUSHWALL_TILE;
        level.wallTexX[x + dx][y + dy] = level.wallTexX[x][y];
        level.wallTexY[x + dx][y + dy] = level.wallTexY[x][y];

        // write down PWall info
        PWall.active = true;
        PWall.tilesMoved = PWall.pointsMoved = 0;
        PWall.dir = dir;
        PWall.x = x;
        PWall.y = y;
        PWall.dx = dx;
        PWall.dy = dy;
        PWall.texX = level.wallTexX[x][y];
        PWall.texY = level.wallTexY[x][y];

        return true;
    }


    /*
    -----------------------------------------------------------------------------
     Function: PushWall_Process() -Process push-walls. 
    -----------------------------------------------------------------------------
    */
    function process(level, tics) {
        if (!PWall.active) {
            return; // no active PWall to work with
        }

        PWall.pointsMoved += tics;
        
        if (PWall.pointsMoved < 128) {
            return;
        }

        PWall.pointsMoved -= 128;
        PWall.tilesMoved++;
        // Free tile
        level.tileMap[PWall.x][PWall.y] &= (~Wolf.PUSHWALL_TILE);
        // Occupy new tile
        PWall.x += PWall.dx;
        PWall.y += PWall.dy;

        // Shall we move further?
        if (level.tileMap[PWall.x + PWall.dx][PWall.y + PWall.dy] & (Wolf.SOLID_TILE | Wolf.DOOR_TILE | Wolf.ACTOR_TILE | Wolf.POWERUP_TILE) || PWall.tilesMoved == 3) {
            level.tileMap[PWall.x][PWall.y] &= (~Wolf.PUSHWALL_TILE); // wall now
            level.tileMap[PWall.x][PWall.y] |= Wolf.WALL_TILE; // wall now
            level.wallTexX[PWall.x][PWall.y] = PWall.texX;
            level.wallTexY[PWall.x][PWall.y] = PWall.texY;
            PWall.active = false; // Free Push Wall
        } else {
            level.tileMap[PWall.x + PWall.dx][PWall.y + PWall.dy] |= Wolf.PUSHWALL_TILE;
            
            // Not sure if this is right but it fixed an issue with the pushwall texture changing mid-slide.
            level.wallTexX[PWall.x + PWall.dx][PWall.y + PWall.dy] = PWall.texX;
            level.wallTexY[PWall.x + PWall.dx][PWall.y + PWall.dy] = PWall.texY;
        }
    }
    
    function get() {
        return PWall;
    }

    return {
        reset : reset,
        process : process,
        push : push,
        get : get
    };

})();
