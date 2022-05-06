/** 
 * @namespace 
 * @description Area management
 */
Wolf.Areas = (function() {
    /*
        Notes:

        Open doors connect two areas, so sounds will travel between them and sight
        will be checked when the player is in a connected area.

        Areaconnect is incremented/decremented by each door. If >0 they connect.

        Every time a door opens or closes the areabyplayer matrix gets recalculated.
        An area is true if it connects with the player's current spor.

    */
    
    /**
     * @description Initialize areas 
     * @memberOf Wolf.Areas
     * @param {object} levelState The level state object
     * @param {number} areanumber Initial area
     */
    function init(level, areanumber) {
        level.state.areaconnect = [];
        level.state.areabyplayer = [];
        for (var i=0;i<Wolf.NUMAREAS;i++) {
            level.state.areaconnect[i] = [];
            for (var j=0;j<Wolf.NUMAREAS;j++) {
                level.state.areaconnect[i][j] = 0;
            }
            level.state.areabyplayer[i] = false;
        }
        level.state.areabyplayer[areanumber] = true;
    }
    
    
    /**
     * @private
     * @description Scans outward from playerarea, marking all connected areas. 
     * @param {object} level The level object
     * @param {number} areanumber Area
     */
    function recursiveConnect(level, areanumber) {
        for (var i = 0;i < Wolf.NUMAREAS; ++i) {
            if (level.state.areaconnect[areanumber][i] && !level.state.areabyplayer[i]) {
                level.state.areabyplayer[i] = true;
                recursiveConnect(level, i);
            }
        }
    }

    /**
     * @description Connect area. 
     * @memberOf Wolf.Areas
     * @param {object} level The level object
     * @param {number} areanumber New area
     */
    function connect(level, areanumber) {
        var	i, c = 0;
        
        if (areanumber >= Wolf.NUMAREAS) {
            throw new Error("areanumber >= Wolf.NUMAREAS");
        }
        
        level.state.areabyplayer = [];
        level.state.areabyplayer[areanumber] = true;
        
        recursiveConnect(level, areanumber);
        for (i = 0; i < Wolf.NUMAREAS; i++) {
            if (level.state.areabyplayer[i]) {
                c++;
            }
        }
    }

    /**
     * @description Join ares 
     * @memberOf Wolf.Areas
     * @param {object} level The level object
     * @param {number} area1 Area 1
     * @param {number} area2 Area 2
     */
    function join(level, area1, area2) {
        if (area1 < 0 || area1 >= Wolf.NUMAREAS) {
            throw new Error("area1 < 0 || area1 >= Wolf.NUMAREAS");
        }
        if (area2 < 0 || area2 >= Wolf.NUMAREAS) {
            throw new Error("area2 < 0 || area2 >= Wolf.NUMAREAS");
        }
        level.state.areaconnect[area1][area2]++;
        level.state.areaconnect[area2][area1]++;
    }

    /**
     * @description Disconnect ares 
     * @memberOf Wolf.Areas
     * @param {object} level The level object
     * @param {number} area1 Area 1
     * @param {number} area2 Area 2
     */
    function disconnect(level, area1, area2) {
        if (area1 < 0 || area1 >= Wolf.NUMAREAS) {
            throw new Error("area1 < 0 || area1 >= Wolf.NUMAREAS");
        }
        if (area2 < 0 || area2 >= Wolf.NUMAREAS) {
            throw new Error("area2 < 0 || area2 >= Wolf.NUMAREAS");
        }
        level.state.areaconnect[area1][area2]--;
        level.state.areaconnect[area2][area1]--;
    }

    return {
        init : init,
        connect : connect,
        join : join,
        disconnect : disconnect
    };

})();

