
//   Setup inheritance
Path.prototype             = new Shape();
Path.prototype.constructor = Path;
Path.superclass            = Shape.prototype;



//   Class constants

Path.COMMAND = 0;
Path.NUMBER  = 1;
Path.EOD     = 2;

Path.PARAMS = {
    A: [ "rx", "ry", "x-axis-rotation", "large-arc-flag", "sweep-flag", "x", "y" ],
    a: [ "rx", "ry", "x-axis-rotation", "large-arc-flag", "sweep-flag", "x", "y" ],
    C: [ "x1", "y1", "x2", "y2", "x", "y" ],
    c: [ "x1", "y1", "x2", "y2", "x", "y" ],
    H: [ "x" ],
    h: [ "x" ],
    L: [ "x", "y" ],
    l: [ "x", "y" ],
    M: [ "x", "y" ],
    m: [ "x", "y" ],
    Q: [ "x1", "y1", "x", "y" ],
    q: [ "x1", "y1", "x", "y" ],
    S: [ "x2", "y2", "x", "y" ],
    s: [ "x2", "y2", "x", "y" ],
    T: [ "x", "y" ],
    t: [ "x", "y" ],
    V: [ "y" ],
    v: [ "y" ],
    Z: [],
    z: []
};


/*****
*
*   constructor
*
*****/
function Path(svgNode) {
    if ( arguments.length > 0 ) {
        this.init(svgNode);
    }
}


/*****
*
*   init
*
*****/
Path.prototype.init = function(svgNode) {
    if ( svgNode == null || svgNode.localName != "path" )
        throw new Error("Path.init: Invalid localName: " + svgNode.localName);
    
    // Call superclass method
    Path.superclass.init.call(this, svgNode);
    
    // Convert path data to segments
    this.segments = null;
    this.parseData( svgNode.getAttributeNS(null, "d") );
};


/*****
*
*   realize
*
*****/
Path.prototype.realize = function() {
    for ( var i = 0; i < this.segments.length; i++ ) {
        this.segments[i].realize();
    }

    this.svgNode.addEventListener("mousedown", this, false);
};


/*****
*
*   unrealize
*
*****/
Path.prototype.unrealize = function() {
    for ( var i = 0; i < this.segments.length; i++ ) {
        this.segments[i].unrealize();
    }

    this.svgNode.removeEventListener("mousedown", this, false);
};



/*****
*
*   refresh
*
*****/
Path.prototype.refresh = function() {
    var d = new Array();

    for ( var i = 0; i < this.segments.length; i++ ) {
        d.push( this.segments[i].toString() );
    }

    this.svgNode.setAttributeNS(null, "d", d.join(" "));
};


/*****
*
*   registerHandles
*
*****/
Path.prototype.registerHandles = function() {
    for ( var i = 0; i < this.segments.length; i++ ) {
        this.segments[i].registerHandles();
    }
};


/*****
*
*   unregisterHandles
*
*****/
Path.prototype.unregisterHandles = function() {
    for ( var i = 0; i < this.segments.length; i++ ) {
        this.segments[i].unregisterHandles();
    }
};


/*****
*
*   selectHandles
*
*****/
Path.prototype.selectHandles = function(select) {
    for ( var i = 0; i < this.segments.length; i++ ) {
        this.segments[i].selectHandles(select);
    }
};


/*****
*
*   showHandles
*
*****/
Path.prototype.showHandles = function(state) {
    for ( var i = 0; i < this.segments.length; i++ ) {
        this.segments[i].showHandles(state);
    }
};


/*****
*
*   appendPathSegment
*
*****/
Path.prototype.appendPathSegment = function(segment) {
    segment.previous = this.segments[this.segments.length-1];

    this.segments.push(segment);
};


/*****
*
*   parseData
*
*****/
/* XXX BM. This function has been heavilly hacked to get elliptical arcs working XXX */

Path.prototype.parseData = function(d) {
    // convert path data to token array
    var tokens = this.tokenize(d);

    // point to first token in array
    var index = 0;

    // get the current token
    var token = tokens[index];

    // set mode to signify new path
    var mode = "BOD";

    // init segment array
    // NOTE: should destroy previous segment handles here
    this.segments = new Array();

    // Process all tokens
    while ( !token.typeis(Path.EOD) ) {
        var param_length;
        var params = new Array();

        if ( mode == "BOD" ) {
            // Start of new path.  Must be a moveto command
            if ( token.text == "M" || token.text == "m" ) {
                // Advance past command token
                index++;

                // Get count of numbers that must follow this command
                param_length = Path.PARAMS[token.text].length;

                // Set new parsing mode
                mode = token.text;
            } else {
                // Oops.  New path didn't start with a moveto command
                throw new Error("Path data must begin with a moveto command");
            }
        } else {
            // Currently in a path definition
            if ( token.typeis(Path.NUMBER) ) {
                // Many commands allow you to keep repeating parameters
                // without specifying the command again.  This handles
                // that case.
                param_length = Path.PARAMS[mode].length;
            } else {
                // Advance past command token
                index++; 

                // Get count of numbers that must follow this command
                param_length = Path.PARAMS[token.text].length;

                // Set new parsing mode
                mode = token.text;
            }
        }
        
        // Make sure we have enough tokens left to satisfy the number
        // of parameters we need for the last command
        if ( (index + param_length) < tokens.length ) {
            // Get each parameter
            for (var i = index; i < index + param_length; i++) {
                var number = tokens[i];
                
                // Make sure each parameter is a number.
                if ( number.typeis(Path.NUMBER) )
                    params[params.length] = number.text;
                else
                    throw new Error("Parameter type is not a number: " + mode + "," + number.text);
            }
            
            // NOTE: Should create add an appendPathSegment (careful, that
            // effects RelativePathSegments
            var segment;
            var length   = this.segments.length;
            var previous = ( length == 0 ) ? null : this.segments[length-1];
            switch (mode) {
                case "A":
                    var startPoint = previous.getLastPoint();
                    var x1 = startPoint.x;
                    var y1 = startPoint.y;
                    var bezier_param_list = arcToCurve.apply(this,[x1,y1].concat(params));
                    for (var i=0; i<bezier_param_list.length/6; i++) {
                        var bezier_params = new Array();
                        for (var j=0; j<6; j++) {
                            bezier_params.push(bezier_param_list.shift());
                        }
                        this.segments.push(new AbsoluteCurveto3(bezier_params, this, previous));
                        previous = this.segments[length-1];
                    }
                    break;

                case "C": this.segments.push(new AbsoluteCurveto3(       params, this, previous )); break;
                case "c": this.segments.push(new RelativeCurveto3(       params, this, previous )); break;
                case "H": this.segments.push(new AbsoluteHLineto(        params, this, previous )); break;
                case "L": this.segments.push(new AbsoluteLineto(         params, this, previous )); break;
                case "l": this.segments.push(new RelativeLineto(         params, this, previous )); break;
                case "M": this.segments.push(new AbsoluteMoveto(         params, this, previous )); break;
                case "m": this.segments.push(new RelativeMoveto(         params, this, previous )); break;
                case "Q": this.segments.push(new AbsoluteCurveto2(       params, this, previous )); break;
                case "q": this.segments.push(new RelativeCurveto2(       params, this, previous )); break;
                case "S": this.segments.push(new AbsoluteSmoothCurveto3( params, this, previous )); break;
                case "s": this.segments.push(new RelativeSmoothCurveto3( params, this, previous )); break;
                case "T": this.segments.push(new AbsoluteSmoothCurveto2( params, this, previous )); break;
                case "t": this.segments.push(new RelativeSmoothCurveto2( params, this, previous )); break;
                case "Z": this.segments.push(new RelativeClosePath(      params, this, previous )); break;
                case "z": this.segments.push(new RelativeClosePath(      params, this, previous )); break;
                default:
                    throw new Error("Unsupported segment type: " + mode);
            }

            // advance to the next unused token
            index += param_length;

            // get current token
            token = tokens[index];

            // Lineto's follow moveto when no command follows moveto params
            if ( mode == "M" ) mode = "L";
            if ( mode == "m" ) mode = "l";
        } else {
            throw new Error("Path data ended before all parameters were found");
        }
    }
}


/*****
*
*   tokenize
*
*   Need to add support for scientific notation
*
*****/
Path.prototype.tokenize = function(d) {
    var tokens = new Array();

    while ( d != "" ) {
        if ( d.match(/^([ \t\r\n,]+)/) )
        {
            d = d.substr(RegExp.$1.length);
        }
        else if ( d.match(/^([aAcChHlLmMqQsStTvVzZ])/) )
        {
            tokens[tokens.length] = new Token(Path.COMMAND, RegExp.$1);
            d = d.substr(RegExp.$1.length);
        }
        else if ( d.match(/^(([-+]?[0-9]+(\.[0-9]*)?|[-+]?\.[0-9]+)([eE][-+]?[0-9]+)?)/) )
        {
            tokens[tokens.length] = new Token(Path.NUMBER, parseFloat(RegExp.$1));
            d = d.substr(RegExp.$1.length);
        }
        else
        {
            throw new Error("Unrecognized segment command: " + d);
            //d = "";
        }
    }

    tokens[tokens.length] = new Token(Path.EOD, null);

    return tokens;
}


/*****
*
*   intersection methods
*
*****/

/*****
*
*   intersectShape
*
*****/
Path.prototype.intersectShape = function(shape) {
    var result = new Intersection("No Intersection");

    for ( var i = 0; i < this.segments.length; i++ ) {
        var inter = Intersection.intersectShapes(this.segments[i],shape);

        result.appendPoints(inter.points);
    }

    if ( result.points.length > 0 ) result.status = "Intersection";

    return result;
};


/*****
*
*   get/set methods
*
*****/

/*****
*
*   getIntersectionParams
*
*****/
Path.prototype.getIntersectionParams = function() {
    return new IntersectionParams(
        "Path",
        []
    );
};




function arcToCurve (x1, y1, rx, ry, angle, large_arc_flag, sweep_flag, x2, y2, recursive) {
    // for more information of where this math came from visit:
    // http://www.w3.org/TR/SVG11/implnote.html#ArcImplementationNotes
    var _120 = Math.PI * 120 / 180,
        rad = Math.PI / 180 * (+angle || 0),
        res = [],
        xy,
        rotate = function (x, y, rad) {
            var X = x * Math.cos(rad) - y * Math.sin(rad),
                Y = x * Math.sin(rad) + y * Math.cos(rad);
            return {x: X, y: Y};
        },
        f1, f2,
        cx, cy;
    if (!recursive) {
        xy = rotate(x1, y1, -rad);
        x1 = xy.x;
        y1 = xy.y;
        xy = rotate(x2, y2, -rad);
        x2 = xy.x;
        y2 = xy.y;
        var cos = Math.cos(Math.PI / 180 * angle),
            sin = Math.sin(Math.PI / 180 * angle),
            x = (x1 - x2) / 2,
            y = (y1 - y2) / 2;
        var h = (x * x) / (rx * rx) + (y * y) / (ry * ry);
        if (h > 1) {
            h = Math.sqrt(h);
            rx = h * rx;
            ry = h * ry;
        }
        var rx2 = rx * rx,
            ry2 = ry * ry,
            k = (large_arc_flag == sweep_flag ? -1 : 1) *
                Math.sqrt(Math.abs((rx2 * ry2 - rx2 * y * y - ry2 * x * x) / (rx2 * y * y + ry2 * x * x)));

        cx = k * rx * y / ry + (x1 + x2) / 2;
        cy = k * -ry * x / rx + (y1 + y2) / 2;

        f1 = Math.asin(((y1 - cy) / ry).toFixed(9));
        f2 = Math.asin(((y2 - cy) / ry).toFixed(9));
        f1 = x1 < cx ? Math.PI - f1 : f1;
        f2 = x2 < cx ? Math.PI - f2 : f2;
//        f1 < 0 && (f1 = Math.PI * 2 + f1);
        f1 = f1 < 0 ? Math.PI * 2 + f1 : f1;
        f2 = f2 < 0 ? Math.PI * 2 + f2 : f2;
        if (sweep_flag && f1 > f2) {
            f1 = f1 - Math.PI * 2;
        }
        if (!sweep_flag && f2 > f1) {
            f2 = f2 - Math.PI * 2;
        }
    } else {
        f1 = recursive[0];
        f2 = recursive[1];
        cx = recursive[2];
        cy = recursive[3];
    }
    var df = f2 - f1;
    if (Math.abs(df) > _120) {
        var f2old = f2,
            x2old = x2,
            y2old = y2;
        f2 = f1 + _120 * (sweep_flag && f2 > f1 ? 1 : -1);
        x2 = cx + rx * Math.cos(f2);
        y2 = cy + ry * Math.sin(f2);
        res = arcToCurve(x2, y2, rx, ry, angle, 0, sweep_flag, x2old, y2old, [f2, f2old, cx, cy]);
    }
    df = f2 - f1;
    var c1 = Math.cos(f1),
        s1 = Math.sin(f1),
        c2 = Math.cos(f2),
        s2 = Math.sin(f2),
        t = Math.tan(df / 4),
        hx = 4 / 3 * rx * t,
        hy = 4 / 3 * ry * t,
        m1 = [x1, y1],
        m2 = [x1 + hx * s1, y1 - hy * c1],
        m3 = [x2 + hx * s2, y2 - hy * c2],
        m4 = [x2, y2];
    m2[0] = 2 * m1[0] - m2[0];
    m2[1] = 2 * m1[1] - m2[1];
    if (recursive) {
        return [m2, m3, m4].concat(res);
    } else {
        res = [m2, m3, m4].concat(res).join().split(",");
        var newres = [];
        for (var i = 0, ii = res.length; i < ii; i++) {
            newres[i] = i % 2 ? rotate(res[i - 1], res[i], rad).y : rotate(res[i], res[i + 1], rad).x;
        }
        return newres;
    }
}
