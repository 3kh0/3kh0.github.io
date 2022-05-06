/** 
 * @namespace 
 * @description Angle math
 */
Wolf.Angle = (function() {

    Wolf.setConsts({
        DEG2RAD         : function(a) { return a * 0.01745329251994329576; }, // a * M_PI / 180.0f
        RAD2DEG         : function(a) { return a / 0.01745329251994329576; }, // a * 180.0f / M_PI 
        ANGLE2SHORT     : function(x) {	return ((x * 65536 / 360)>>0) & 65535; },
        SHORT2ANGLE     : function(x) {	return x * 360.0 / 65536; }
    });

    /**
     * @description Finds the difference between two angles.
     * @memberOf Wolf.Angle
     * @param {number} angle1 Angle in radians.
     * @param {number} angle2 Angle in radians.
     * @returns {number} The absolute difference between two angles, this will always be between 0 and 180 degrees.
     */
    function diff(angle1, angle2) {
        var d;

        if (angle1 > angle2) {
            d = angle1 - angle2;
        } else {
            d = angle2 - angle1;
        }

        if (d > Math.PI) {
            return 2 * Math.PI - d;
        } else {
            return d;
        }
    }

    /**
     * @description Clockwise distance between two angles.
     * @memberOf Wolf.Angle
     * @param {number} angle1 Angle in radians.
     * @param {number} angle2 Angle in radians.
     * @returns {number} The clockwise distance from angle2 to angle1, this may be greater than 180 degrees.
     */
    function distCW(angle1, angle2) {
        if (angle1 > angle2) {
            return angle1 - angle2;
        } else {
            return angle1 + 2 * Math.PI - angle2;
        }
    }

    /**
     * @description Linear interpolate between angle from and to by fraction frac.
     * @memberOf Wolf.Angle
     * @param {number} from Angle in radians.
     * @param {number} to Angle in radians.
     * @param {number} frac Fraction.
     * @returns {number}
     */
    function interpolate(from, to, frac) {
        var d = diff(from, to) * frac;

        if (distCW(to, from) >= Math.PI) {
            return from - diff;
        } else {
            return from + diff;
        }
    }


    /**
     * @description Normalize angle.
     * @memberOf Wolf.Angle
     * @param {number} angle
     * @returns {number}
     */
    function normalize(angle) {
        while (angle < 0) {
            angle += (2 * Math.PI);
        }
        while (angle >= (2 * Math.PI)) {
            angle -= (2 * Math.PI);
        }
        return angle;
    }



    /**
     * @description Linear interpolate allowing for the Modulo 360 problem.
     * @memberOf Wolf.Angle
     * @param {number} from Angle in radians.
     * @param {number} to Angle in radians.
     * @param {number} frac fraction.
     * @returns {number}
     */

    function lerp(from, to, frac) {
        if (to - from > 180) {
            to -= 360;
        }
        if (to - from < -180) {
            to += 360;
        }
        return from + frac * (to - from);
    }

    return {
        diff : diff,
        distCW : distCW,
        normalize : normalize,
        interpolate : interpolate,
        lerp : lerp
    }

})();