var jaws = (function (f) {
    var d;
    var b;
    f.title = function (g) {
        if (g) {
            return (d.innerHTML = g);
        }
        return d.innerHTML;
    };
    f.unpack = function () {
        var g = ["Sprite", "SpriteList", "Animation", "Viewport", "SpriteSheet", "Parallax", "TileMap", "Rect", "pressed"];
        g.forEach(function (j, k, h) {
            if (window[j]) {
                f.log(j + "already exists in global namespace");
            } else {
                window[j] = f[j];
            }
        });
    };
    f.log = function (h, g) {
        if (b) {
            h += "<br />";
            if (g) {
                b.innerHTML = b.innerHTML.toString() + h;
            } else {
                b.innerHTML = h;
            }
        }
    };
    f.init = function (g) {
        d = document.getElementsByTagName("title")[0];
        f.url_parameters = e();
        b = document.getElementById("jaws-log");
        if (f.url_parameters.debug) {
            if (!b) {
                b = document.createElement("div");
                b.style.cssText = "overflow: auto; color: #aaaaaa; width: 300px; height: 150px; margin: 40px auto 0px auto; padding: 5px; border: #444444 1px solid; clear: both; font: 10px verdana; text-align: left;";
                document.body.appendChild(b);
            }
        }
        f.canvas = document.getElementsByTagName("canvas")[0];
        if (f.canvas) {
            f.context = f.canvas.getContext("2d");
        } else {
            f.dom = document.getElementById("canvas");
            f.dom.style.position = "relative";
        }
        f.width = f.canvas ? f.canvas.width : f.dom.offsetWidth;
        f.height = f.canvas ? f.canvas.height : f.dom.offsetHeigh;
    };
    function c() {
        f.canvas = document.getElementsByTagName("canvas")[0];
        if (!f.canvas) {
            f.canvas = document.createElement("canvas");
            f.canvas.width = 500;
            f.canvas.height = 300;
            document.body.appendChild(f.canvas);
            f.log("creating canvas", true);
        } else {
            f.log("found canvas", true);
        }
        f.context = f.canvas.getContext("2d");
    }
    f.start = function (h, l) {
        var k = (l && l.fps) || 60;
        f.init();
        f.log("setupInput()", true);
        f.setupInput();
        function j(o, n) {
            f.log(n + "%: " + o, true);
        }
        function m(n) {
            f.log("Error loading: " + n);
        }
        function g() {
            f.log("all assets loaded", true);
            if (h && f.isFunction(h)) {
                h = new h();
            }
            if (!h) {
                h = window;
            }
            f.gameloop = new f.GameLoop(h.setup, h.update, h.draw, k);
            f.game_state = h;
            f.gameloop.start();
        }
        f.log("assets.loadAll()", true);
        if (f.assets.length() > 0) {
            f.assets.loadAll({ onload: j, onerror: m, onfinish: g });
        } else {
            g();
        }
    };
    f.switchGameState = function (g) {
        f.gameloop.stop();
        f.clearKeyCallbacks();
        if (f.isFunction(g)) {
            g = new g();
        }
        f.previous_game_state = f.game_state;
        f.game_state = g;
        f.gameloop = new f.GameLoop(g.setup, g.update, g.draw, f.gameloop.fps);
        f.gameloop.start();
    };
    f.forceArray = function (g) {
        return Array.isArray(g) ? g : [g];
    };
    f.clear = function () {
        f.context.clearRect(0, 0, f.width, f.height);
    };
    f.isImage = function (g) {
        return Object.prototype.toString.call(g) === "[object HTMLImageElement]";
    };
    f.isCanvas = function (g) {
        return Object.prototype.toString.call(g) === "[object HTMLCanvasElement]";
    };
    f.isDrawable = function (g) {
        return f.isImage(g) || f.isCanvas(g);
    };
    f.isString = function (g) {
        return typeof g == "string";
    };
    f.isArray = function (g) {
        return !(g.constructor.toString().indexOf("Array") == -1);
    };
    f.isFunction = function (g) {
        return Object.prototype.toString.call(g) === "[object Function]";
    };
    function e() {
        var k = [],
            j;
        var h = window.location.href.slice(window.location.href.indexOf("?") + 1).split("&");
        for (var g = 0; g < h.length; g++) {
            j = h[g].split("=");
            k.push(j[0]);
            k[j[0]] = j[1];
        }
        return k;
    }
    return f;
})(jaws || {});
var jaws = (function (j) {
    var f = {};
    var e = [];
    var d = [];
    var h = [];
    j.setupInput = function () {
        var m = [];
        m[8] = "backspace";
        m[9] = "tab";
        m[13] = "enter";
        m[16] = "shift";
        m[17] = "ctrl";
        m[18] = "alt";
        m[19] = "pause";
        m[20] = "capslock";
        m[27] = "esc";
        m[32] = "space";
        m[33] = "pageup";
        m[34] = "pagedown";
        m[35] = "end";
        m[36] = "home";
        m[37] = "left";
        m[38] = "up";
        m[39] = "right";
        m[40] = "down";
        m[45] = "insert";
        m[46] = "delete";
        m[91] = "leftwindowkey";
        m[92] = "rightwindowkey";
        m[93] = "selectkey";
        m[106] = "multiply";
        m[107] = "add";
        m[109] = "subtract";
        m[110] = "decimalpoint";
        m[111] = "divide";
        m[144] = "numlock";
        m[145] = "scrollock";
        m[186] = "semicolon";
        m[187] = "equalsign";
        m[188] = "comma";
        m[189] = "dash";
        m[190] = "period";
        m[191] = "forwardslash";
        m[192] = "graveaccent";
        m[219] = "openbracket";
        m[220] = "backslash";
        m[221] = "closebracket";
        m[222] = "singlequote";
        var n = ["numpad1", "numpad2", "numpad3", "numpad4", "numpad5", "numpad6", "numpad7", "numpad8", "numpad9"];
        var l = ["f1", "f2", "f3", "f4", "f5", "f6", "f7", "f8", "f9"];
        var p = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
        var q = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
        for (var o = 0; p[o]; o++) {
            m[48 + o] = p[o];
        }
        for (var o = 0; q[o]; o++) {
            m[65 + o] = q[o];
        }
        for (var o = 0; n[o]; o++) {
            m[96 + o] = n[o];
        }
        for (var o = 0; l[o]; o++) {
            m[112 + o] = l[o];
        }
        e = m;
        window.onkeydown = function (k) {
            c(k);
        };
        window.onkeyup = function (k) {
            g(k);
        };
        window.onkeypress = function (k) {};
    };
    function g(l) {
        event = l ? l : window.event;
        var k = e[event.keyCode];
        f[k] = false;
        if (h[k]) {
            h[k]();
            l.preventDefault();
        }
        if (b[k]) {
            l.preventDefault();
        }
    }
    function c(l) {
        event = l ? l : window.event;
        var k = e[event.keyCode];
        f[k] = true;
        if (d[k]) {
            d[k]();
            l.preventDefault();
        }
        if (b[k]) {
            l.preventDefault();
        }
    }
    var b = [];
    j.preventDefaultKeys = function (k) {
        k.forEach(function (m, l) {
            b[m] = true;
        });
    };
    j.pressed = function (k) {
        return f[k];
    };
    j.on_keydown = function (l, m) {
        if (j.isArray(l)) {
            for (var k = 0; l[k]; k++) {
                d[l[k]] = m;
            }
        } else {
            d[l] = m;
        }
    };
    j.on_keyup = function (l, m) {
        if (j.isArray(l)) {
            for (var k = 0; l[k]; k++) {
                h[l[k]] = m;
            }
        } else {
            h[l] = m;
        }
    };
    j.clearKeyCallbacks = function () {
        h = [];
        d = [];
    };
    return j;
})(jaws || {});
var jaws = (function (e) {
    e.Assets = function () {
        this.loaded = [];
        this.loading = [];
        this.src_list = [];
        this.data = [];
        this.image_to_canvas = true;
        this.fuchia_to_transparent = true;
        this.root = "";
        this.file_type = {};
        this.file_type.json = "json";
        this.file_type.wav = "audio";
        this.file_type.mp3 = "audio";
        this.file_type.ogg = "audio";
        this.file_type.png = "image";
        this.file_type.jpg = "image";
        this.file_type.jpeg = "image";
        this.file_type.gif = "image";
        this.file_type.bmp = "image";
        this.file_type.tiff = "image";
        var f = this;
        this.length = function () {
            return this.src_list.length;
        };
        this.get = function (g) {
            if (e.isArray(g)) {
                return g.map(function (h) {
                    return f.data[h];
                });
            } else {
                if (this.loaded[g]) {
                    return this.data[g];
                } else {
                    e.log("No such asset: " + g);
                }
            }
        };
        this.isLoading = function (g) {
            return this.loading[g];
        };
        this.isLoaded = function (g) {
            return this.loaded[g];
        };
        this.getPostfix = function (g) {
            postfix_regexp = /\.([a-zA-Z]+)/;
            return postfix_regexp.exec(g)[1];
        };
        this.getType = function (h) {
            var g = this.getPostfix(h);
            return this.file_type[g] ? this.file_type[g] : g;
        };
        this.add = function (h) {
            if (e.isArray(h)) {
                for (var g = 0; h[g]; g++) {
                    this.add(h[g]);
                }
            } else {
                h = this.root + h;
                this.src_list.push(h);
            }
            return this;
        };
        this.loadAll = function (g) {
            this.load_count = 0;
            this.error_count = 0;
            this.onload = g.onload;
            this.onerror = g.onerror;
            this.onfinish = g.onfinish;
            for (i = 0; this.src_list[i]; i++) {
                this.load(this.src_list[i]);
            }
        };
        this.getOrLoad = function (h, j, g) {
            if (this.data[h]) {
                j();
            } else {
                this.load(h, j, g);
            }
        };
        this.load = function (k, l, j) {
            var g = {};
            g.src = k;
            g.onload = l;
            g.onerror = j;
            this.loading[k] = true;
            switch (this.getType(g.src)) {
                case "image":
                    var k = g.src + "?" + parseInt(Math.random() * 10000000);
                    g.image = new Image();
                    g.image.asset = g;
                    g.image.onload = this.assetLoaded;
                    g.image.onerror = this.assetError;
                    g.image.src = k;
                    break;
                case "audio":
                    var k = g.src + "?" + parseInt(Math.random() * 10000000);
                    g.audio = new Audio(k);
                    g.audio.asset = g;
                    this.data[g.src] = g.audio;
                    g.audio.addEventListener("canplay", this.assetLoaded, false);
                    g.audio.addEventListener("error", this.assetError, false);
                    g.audio.load();
                    break;
                default:
                    var k = g.src + "?" + parseInt(Math.random() * 10000000);
                    var h = new XMLHttpRequest();
                    h.asset = g;
                    h.onreadystatechange = this.assetLoaded;
                    h.open("GET", k, true);
                    h.send(null);
                    break;
            }
        };
        this.assetLoaded = function (k) {
            var j = this.asset;
            var l = j.src;
            var h = f.getType(j.src);
            f.loaded[l] = true;
            f.loading[l] = false;
            if (h == "json") {
                if (this.readyState != 4) {
                    return;
                }
                f.data[j.src] = JSON.parse(this.responseText);
            } else {
                if (h == "image") {
                    var g = f.image_to_canvas ? b(j.image) : j.image;
                    if (f.fuchia_to_transparent && f.getPostfix(j.src) == "bmp") {
                        g = c(g);
                    }
                    f.data[j.src] = g;
                } else {
                    if (h == "audio") {
                        j.audio.removeEventListener("canplay", f.assetLoaded, false);
                        f.data[j.src] = j.audio;
                    }
                }
            }
            f.load_count++;
            if (j.onload) {
                j.onload();
            }
            f.processCallbacks(j);
        };
        this.assetError = function (h) {
            var g = this.asset;
            f.error_count++;
            if (g.onerror) {
                g.onerror(g);
            }
            f.processCallbacks(g);
        };
        this.processCallbacks = function (h) {
            var g = parseInt(((f.load_count + f.error_count) / f.src_list.length) * 100);
            if (f.onload) {
                f.onload(h.src, g);
            }
            if (g == 100) {
                if (f.onfinish) {
                    f.onfinish();
                }
                f.onload = null;
                f.onerror = null;
                f.onfinish = null;
            }
        };
    };
    function b(h) {
        var g = document.createElement("canvas");
        g.src = h.src;
        g.width = h.width;
        g.height = h.height;
        var f = g.getContext("2d");
        f.drawImage(h, 0, 0, h.width, h.height);
        return g;
    }
    function c(k) {
        canvas = e.isImage(k) ? b(k) : k;
        var h = canvas.getContext("2d");
        var f = h.getImageData(0, 0, canvas.width, canvas.height);
        var j = f.data;
        for (var g = 0; g < j.length; g += 4) {
            if (j[g] == 255 && j[g + 1] == 0 && j[g + 2] == 255) {
                j[g + 3] = 0;
            }
        }
        h.putImageData(f, 0, 0);
        return canvas;
    }
    function d(k, f) {
        canvas = e.isImage(k) ? b(k) : k;
        var h = canvas.getContext("2d");
        var p = h.getImageData(0, 0, canvas.width, canvas.height);
        var l = p.data;
        var g = document.createElement("canvas");
        g.width = k.width * f;
        g.height = k.height * f;
        var m = canvas.getContext("2d");
        var n = m.getImageData(0, 0, g.width, g.height);
        var j = n.data;
        for (var q = 0; q < canvas.width * f; q++) {
            for (var o = 0; o < canvas.height * f; o++) {
                j[q * o] = l[(q * o) / f];
                j[q * o + 1] = l[q * o + 1 / f];
                j[q * o + 2] = l[q * o + 2 / f];
                j[q * o + 3] = l[q * o + 3 / f];
            }
        }
        m.putImageData(n, 0, 0);
        return g;
    }
    e.assets = new e.Assets();
    return e;
})(jaws || {});
var jaws = (function (c) {
    c.GameLoop = function (e, k, d, g) {
        this.ticks = 0;
        this.tick_duration = 0;
        this.fps = 0;
        var j;
        var f = false;
        var h = this;
        var l = new b(20);
        this.start = function () {
            c.log("gameloop start", true);
            this.current_tick = new Date().getTime();
            this.last_tick = new Date().getTime();
            if (e) {
                e();
            }
            j = setInterval(this.loop, 1000 / g);
            c.log("gameloop loop", true);
        };
        this.loop = function () {
            h.current_tick = new Date().getTime();
            h.tick_duration = h.current_tick - h.last_tick;
            h.fps = l.add(1000 / h.tick_duration).get();
            if (!f) {
                if (k) {
                    k();
                }
                if (d) {
                    d();
                }
                h.ticks++;
            }
            h.last_tick = h.current_tick;
        };
        this.pause = function () {
            f = true;
        };
        this.unpause = function () {
            f = false;
        };
        this.stop = function () {
            if (j) {
                clearInterval(j);
            }
        };
    };
    function b(d) {
        this.size = d;
        this.values = new Array(this.size);
        this.value;
        this.add = function (f) {
            if (this.values.length > this.size) {
                this.values.splice(0, 1);
                this.value = 0;
                for (var e = 0; this.values[e]; e++) {
                    this.value += this.values[e];
                }
                this.value = this.value / this.size;
            }
            this.values.push(f);
            return this;
        };
        this.get = function () {
            return parseInt(this.value);
        };
    }
    return c;
})(jaws || {});
var jaws = (function (b) {
    b.Rect = function (c, f, d, e) {
        this.x = c;
        this.y = f;
        this.width = d;
        this.height = e;
        this.right = c + d;
        this.bottom = f + e;
    };
    b.Rect.prototype.getPosition = function () {
        return [this.x, this.y];
    };
    b.Rect.prototype.move = function (c, d) {
        this.x += c;
        this.y += d;
        this.right += c;
        this.bottom += d;
    };
    b.Rect.prototype.moveTo = function (c, d) {
        this.x = c;
        this.y = d;
        this.right = this.x + this.width;
        this.bottom = this.y + this.height;
        return this;
    };
    b.Rect.prototype.resize = function (c, d) {
        this.width += c;
        this.height += d;
        this.right = this.x + this.width;
        this.bottom = this.y + this.height;
        return this;
    };
    b.Rect.prototype.resizeTo = function (c, d) {
        this.width = c;
        this.height = d;
        this.right = this.x + this.width;
        this.bottom = this.y + this.height;
        return this;
    };
    b.Rect.prototype.draw = function () {
        b.context.strokeStyle = "red";
        b.context.strokeRect(this.x, this.y, this.width, this.height);
        return this;
    };
    b.Rect.prototype.collidePoint = function (c, d) {
        return c >= this.x && c <= this.right && d >= this.y && d <= this.bottom;
    };
    b.Rect.prototype.collideRect = function (c) {
        return ((this.x >= c.x && this.x <= c.right) || (c.x >= this.x && c.x <= this.right)) && ((this.y >= c.y && this.y <= c.bottom) || (c.y >= this.y && c.y <= this.bottom));
    };
    b.Rect.prototype.toString = function () {
        return "[Rect " + this.x + ", " + this.y + ", " + this.width + ", " + this.height + "]";
    };
    return b;
})(jaws || {});
if (typeof module !== "undefined" && "exports" in module) {
    module.exports = jaws.Rect;
}
var jaws = (function (b) {
    b.Sprite = function (c) {
        this.options = c;
        this.set(c);
        this.context = c.context || b.context;
        if (!this.context) {
            this.createDiv();
        }
    };
    b.Sprite.prototype.set = function (c) {
        this.scale_factor_x = this.scale_factor_y = c.scale || 1;
        if (!c.anchor_x == undefined) {
            this.anchor_x = c.anchor_x;
        }
        if (!c.anchor_y == undefined) {
            this.anchor_y = c.anchor_y;
        }
        this.x = c.x || 0;
        this.y = c.y || 0;
        this.alpha = c.alpha || 1;
        this.angle = c.angle || 0;
        this.flipped = c.flipped || false;
        this.anchor(c.anchor || "top_left");
        c.image && this.setImage(c.image);
        this.cacheOffsets();
        return this;
    };
    b.Sprite.prototype.setImage = function (d) {
        var c = this;
        if (b.isDrawable(d)) {
            this.image = d;
            return this.cacheOffsets();
        } else {
            if (b.assets.isLoaded(d)) {
                this.image = b.assets.get(d);
                this.cacheOffsets();
            } else {
                b.assets.load(d, function () {
                    c.image = b.assets.get(d);
                    c.cacheOffsets();
                });
            }
        }
        return this;
    };
    b.Sprite.prototype.flip = function () {
        this.flipped = this.flipped ? false : true;
        return this;
    };
    b.Sprite.prototype.flipTo = function (c) {
        this.flipped = c;
        return this;
    };
    b.Sprite.prototype.rotate = function (c) {
        this.angle += c;
        return this;
    };
    b.Sprite.prototype.rotateTo = function (c) {
        this.angle = c;
        return this;
    };
    b.Sprite.prototype.moveTo = function (c, d) {
        this.x = c;
        this.y = d;
        return this;
    };
    b.Sprite.prototype.move = function (c, d) {
        if (c) {
            this.x += c;
        }
        if (d) {
            this.y += d;
        }
        return this;
    };
    b.Sprite.prototype.scale = function (c) {
        this.scale_factor_x *= c;
        this.scale_factor_y *= c;
        return this.cacheOffsets();
    };
    b.Sprite.prototype.scaleTo = function (c) {
        this.scale_factor_x = this.scale_factor_y = c;
        return this.cacheOffsets();
    };
    b.Sprite.prototype.scaleWidth = function (c) {
        this.scale_factor_x *= c;
        return this.cacheOffsets();
    };
    b.Sprite.prototype.scaleHeight = function (c) {
        this.scale_factor_y *= c;
        return this.cacheOffsets();
    };
    b.Sprite.prototype.setX = function (c) {
        this.x = c;
        return this;
    };
    b.Sprite.prototype.setY = function (c) {
        this.y = c;
        return this;
    };
    b.Sprite.prototype.setWidth = function (c) {
        this.scale_factor_x = c / this.image.width;
        return this.cacheOffsets();
    };
    b.Sprite.prototype.setHeight = function (c) {
        this.scale_factor_y = c / this.image.height;
        return this.cacheOffsets();
    };
    b.Sprite.prototype.resize = function (c, d) {
        this.scale_factor_x = (this.width + c) / this.image.width;
        this.scale_factor_y = (this.height + d) / this.image.height;
        return this.cacheOffsets();
    };
    b.Sprite.prototype.resizeTo = function (c, d) {
        this.scale_factor_x = c / this.image.width;
        this.scale_factor_y = d / this.image.height;
        return this.cacheOffsets();
    };
    b.Sprite.prototype.anchor = function (d) {
        var c = {
            top_left: [0, 0],
            left_top: [0, 0],
            center_left: [0, 0.5],
            left_center: [0, 0.5],
            bottom_left: [0, 1],
            left_bottom: [0, 1],
            top_center: [0.5, 0],
            center_top: [0.5, 0],
            center_center: [0.5, 0.5],
            center: [0.5, 0.5],
            bottom_center: [0.5, 1],
            center_bottom: [0.5, 1],
            top_right: [1, 0],
            right_top: [1, 0],
            center_right: [1, 0.5],
            right_center: [1, 0.5],
            bottom_right: [1, 1],
            right_bottom: [1, 1],
        };
        if ((a = c[d])) {
            this.anchor_x = a[0];
            this.anchor_y = a[1];
            if (this.image) {
                this.cacheOffsets();
            }
        }
        return this;
    };
    b.Sprite.prototype.cacheOffsets = function () {
        if (!this.image) {
            return;
        }
        this.width = this.image.width * this.scale_factor_x;
        this.height = this.image.height * this.scale_factor_y;
        this.left_offset = this.width * this.anchor_x;
        this.top_offset = this.height * this.anchor_y;
        this.right_offset = this.width * (1 - this.anchor_x);
        this.bottom_offset = this.height * (1 - this.anchor_y);
        if (this.cached_rect) {
            this.cached_rect.resizeTo(this.width, this.height);
        }
        return this;
    };
    b.Sprite.prototype.rect = function () {
        if (!this.cached_rect) {
            this.cached_rect = new b.Rect(this.x, this.top, this.width, this.height);
        }
        this.cached_rect.moveTo(this.x - this.left_offset, this.y - this.top_offset);
        return this.cached_rect;
    };
    b.Sprite.prototype.createDiv = function () {
        this.div = document.createElement("div");
        this.div.style.position = "absolute";
        if (this.image) {
            this.div.style.width = this.image.width + "px";
            this.div.style.height = this.image.height + "px";
            this.div.style.backgroundImage = "url(" + this.image.src + ")";
        }
        if (b.dom) {
            b.dom.appendChild(this.div);
        }
        this.updateDiv();
    };
    b.Sprite.prototype.updateDiv = function () {
        this.div.style.left = this.x + "px";
        this.div.style.top = this.y + "px";
        var c = "";
        c += "rotate(" + this.angle + "deg) ";
        if (this.flipped) {
            c += "scale(-" + this.scale_factor_x + "," + this.scale_factor_y + ")";
        } else {
            c += "scale(" + this.scale_factor_x + "," + this.scale_factor_y + ")";
        }
        this.div.style.MozTransform = c;
        this.div.style.WebkitTransform = c;
        this.div.style.transform = c;
        return this;
    };
    b.Sprite.prototype.draw = function () {
        if (!this.image) {
            return this;
        }
        if (b.dom) {
            return this.updateDiv();
        }
        this.context.save();
        this.context.translate(this.x, this.y);
        if (this.angle != 0) {
            b.context.rotate((this.angle * Math.PI) / 180);
        }
        this.flipped && this.context.scale(-1, 1);
        this.context.globalAlpha = this.alpha;
        this.context.translate(-this.left_offset, -this.top_offset);
        this.context.drawImage(this.image, 0, 0, this.width, this.height);
        this.context.restore();
        return this;
    };
    b.Sprite.prototype.asCanvasContext = function () {
        var d = document.createElement("canvas");
        d.width = this.width;
        d.height = this.height;
        var c = d.getContext("2d");
        c.mozImageSmoothingEnabled = b.context.mozImageSmoothingEnabled;
        c.drawImage(this.image, 0, 0, this.width, this.height);
        return c;
    };
    b.Sprite.prototype.toString = function () {
        return "[Sprite " + this.x + ", " + this.y + "," + this.width + "," + this.height + "]";
    };
    return b;
})(jaws || {});
var jaws = (function (b) {
    b.SpriteList = function () {};
    b.SpriteList.prototype = new Array();
    b.SpriteList.prototype.remove = function (d) {
        var c = this.indexOf(d);
        if (c > -1) {
            this.splice(c, 1);
        }
    };
    b.SpriteList.prototype.draw = function () {
        for (i = 0; this[i]; i++) {
            this[i].draw();
        }
    };
    b.SpriteList.prototype.drawIf = function (c) {
        for (i = 0; this[i]; i++) {
            if (c(this[i])) {
                this[i].draw();
            }
        }
    };
    b.SpriteList.prototype.update = function () {
        for (i = 0; this[i]; i++) {
            this[i].update();
        }
    };
    b.SpriteList.prototype.updateIf = function (c) {
        for (i = 0; this[i]; i++) {
            if (c(this[i])) {
                this[i].update();
            }
        }
    };
    b.SpriteList.prototype.deleteIf = function (d) {
        for (var c = 0; this[c]; c++) {
            if (d(this[c])) {
                this.splice(c, 1);
            }
        }
    };
    b.SpriteList.prototype.toString = function () {
        return "[SpriteList " + this.length + " sprites]";
    };
    return b;
})(jaws || {});
var jaws = (function (c) {
    function b(j, d, k, f, h) {
        var g = document.createElement("canvas");
        g.width = f;
        g.height = h;
        var e = g.getContext("2d");
        e.drawImage(j, d, k, f, h, 0, 0, g.width, g.height);
        return g;
    }
    c.SpriteSheet = function (f) {
        this.image = c.isDrawable(f.image) ? f.image : c.assets.data[f.image];
        this.orientation = f.orientation || "right";
        this.frame_size = f.frame_size || [32, 32];
        this.frames = [];
        var e = 0;
        for (var d = 0; d < this.image.width; d += this.frame_size[0]) {
            for (var g = 0; g < this.image.height; g += this.frame_size[1]) {
                this.frames.push(b(this.image, d, g, this.frame_size[0], this.frame_size[1]));
            }
        }
    };
    c.SpriteSheet.prototype.toString = function () {
        return "[SpriteSheet " + this.frames.length + " frames]";
    };
    return c;
})(jaws || {});
var jaws = (function (b) {
    b.Parallax = function (c) {
        this.scale = c.scale || 1;
        this.repeat_x = c.repeat_x;
        this.repeat_y = c.repeat_y;
        this.camera_x = c.camera_x || 0;
        this.camera_y = c.camera_y || 0;
        this.layers = [];
    };
    b.Parallax.prototype.draw = function (e) {
        var d, f, g;
        for (var c = 0; c < this.layers.length; c++) {
            d = this.layers[c];
            f = d.x;
            g = d.y;
            d.x = -(this.camera_x / d.damping);
            d.y = -(this.camera_y / d.damping);
            while (this.repeat_x && d.x > 0) {
                d.x -= d.width;
            }
            while (this.repeat_y && d.y > 0) {
                d.y -= d.width;
            }
            while (this.repeat_x && d.x < b.width) {
                while (this.repeat_y && d.y < b.height) {
                    d.draw();
                    d.y += d.height;
                }
                d.y = g;
                d.draw();
                d.x += d.width - 1;
            }
            while (d.repeat_y && !d.repeat_x && d.y < b.height) {
                d.draw();
                d.y += d.height;
            }
            d.x = f;
        }
    };
    b.Parallax.prototype.addLayer = function (d) {
        var c = new b.ParallaxLayer(d);
        c.scale(this.scale);
        this.layers.push(c);
    };
    b.Parallax.prototype.toString = function () {
        return "[Parallax " + this.x + ", " + this.y + ". " + this.layers.length + " layers]";
    };
    b.ParallaxLayer = function (c) {
        this.damping = c.damping || 0;
        b.Sprite.call(this, c);
    };
    b.ParallaxLayer.prototype = b.Sprite.prototype;
    b.Parallax.prototype.toString = function () {
        return "[ParallaxLayer " + this.x + ", " + this.y + "]";
    };
    return b;
})(jaws || {});
var jaws = (function (b) {
    b.Animation = function (c) {
        this.options = c;
        this.frames = c.frames || [];
        this.frame_duration = c.frame_duration || 100;
        this.index = c.index || 0;
        this.loop = c.loop || 1;
        this.bounce = c.bounce || 0;
        this.frame_direction = 1;
        if (c.sprite_sheet) {
            var d = b.isDrawable(c.sprite_sheet) ? c.sprite_sheet : b.assets.get(c.sprite_sheet);
            var e = new b.SpriteSheet({ image: d, frame_size: c.frame_size });
            this.frames = e.frames;
        }
        this.current_tick = new Date().getTime();
        this.last_tick = new Date().getTime();
        this.sum_tick = 0;
    };
    b.Animation.prototype.update = function () {
        this.current_tick = new Date().getTime();
        this.sum_tick += this.current_tick - this.last_tick;
        this.last_tick = this.current_tick;
        if (this.sum_tick > this.frame_duration) {
            this.index += this.frame_direction;
            this.sum_tick = 0;
        }
        if (this.index >= this.frames.length || this.index <= 0) {
            if (this.bounce) {
                this.frame_direction = -this.frame_direction;
                this.index += this.frame_direction * 2;
            } else {
                if (this.loop) {
                    this.index = 0;
                }
            }
        }
        return this;
    };
    b.Animation.prototype.slice = function (e, c) {
        var d = {};
        d.frame_duration = this.frame_duration;
        d.loop = this.loop;
        d.bounce = this.bounce;
        d.frame_direction = this.frame_direction;
        d.frames = this.frames.slice().slice(e, c);
        return new b.Animation(d);
    };
    b.Animation.prototype.next = function () {
        this.update();
        return this.frames[this.index];
    };
    b.Animation.prototype.currentFrame = function () {
        return this.frames[this.index];
    };
    b.Animation.prototype.toString = function () {
        return "[Animation, " + this.frames.length + " frames]";
    };
    return b;
})(jaws || {});
var jaws = (function (b) {
    b.Viewport = function (c) {
        this.options = c;
        this.context = c.context || b.context;
        this.width = c.width || b.width;
        this.height = c.height || b.height;
        this.max_x = c.max_x || b.width;
        this.max_y = c.max_y || b.height;
        this.verifyPosition = function () {
            var d = this.max_x - this.width;
            if (this.x < 0) {
                this.x = 0;
            }
            if (this.x > d) {
                this.x = d;
            }
            var d = this.max_y - this.height;
            if (this.y < 0) {
                this.y = 0;
            }
            if (this.y > d) {
                this.y = d;
            }
        };
        this.move = function (d, e) {
            d && (this.x += d);
            e && (this.y += e);
            this.verifyPosition();
        };
        this.moveTo = function (d, e) {
            if (!(d == undefined)) {
                this.x = d;
            }
            if (!(e == undefined)) {
                this.y = e;
            }
            this.verifyPosition();
        };
        this.isOutside = function (d) {
            return !this.isInside(d);
        };
        this.isInside = function (d) {
            return d.x >= this.x && d.x <= this.x + this.width && d.y >= this.y && d.y <= this.y + this.height;
        };
        this.centerAround = function (d) {
            this.x = d.x - this.width / 2;
            this.y = d.y - this.height / 2;
            this.verifyPosition();
        };
        this.apply = function (d) {
            this.context.save();
            this.context.translate(-this.x, -this.y);
            d();
            this.context.restore();
        };
        this.moveTo(c.x || 0, c.y || 0);
    };
    b.Viewport.prototype.toString = function () {
        return "[Viewport " + this.x + ", " + this.y + "," + this.width + "," + this.height + "]";
    };
    return b;
})(jaws || {});
var jaws = (function (b) {
    b.TileMap = function (d) {
        this.cell_size = d.cell_size || [32, 32];
        this.size = d.size;
        this.cells = new Array(this.size[0]);
        this.sortFunction = undefined;
        for (var c = 0; c < this.size[0]; c++) {
            this.cells[c] = new Array(this.size[1]);
            for (var e = 0; e < this.size[1]; e++) {
                this.cells[c][e] = [];
            }
        }
    };
    b.TileMap.prototype.clear = function () {
        for (var c = 0; c < this.size[0]; c++) {
            for (var d = 0; d < this.size[1]; d++) {
                this.cells[c][d] = [];
            }
        }
    };
    b.TileMap.prototype.sortCells = function (c) {
        for (var d = 0; d < this.size[0]; d++) {
            for (var e = 0; e < this.size[1]; e++) {
                this.cells[d][e].sort(c);
            }
        }
    };
    b.TileMap.prototype.push = function (e) {
        if (e.length) {
            for (var d = 0; d < e.length; d++) {
                this.push(e[d]);
            }
            return e;
        }
        if (e.rect) {
            return this.pushAsRect(e, e.rect());
        } else {
            var c = parseInt(e.x / this.cell_size[0]);
            var f = parseInt(e.y / this.cell_size[1]);
            return this.pushToCell(c, f, e);
        }
    };
    b.TileMap.prototype.pushAsPoint = function (e) {
        if (Array.isArray(e)) {
            for (var d = 0; d < e.length; d++) {
                this.pushAsPoint(e[d]);
            }
            return e;
        } else {
            var c = parseInt(e.x / this.cell_size[0]);
            var f = parseInt(e.y / this.cell_size[1]);
            return this.pushToCell(c, f, e);
        }
    };
    b.TileMap.prototype.pushAsRect = function (h, g) {
        var k = parseInt(g.x / this.cell_size[0]);
        var c = parseInt((g.right - 1) / this.cell_size[0]);
        for (var d = k; d <= c; d++) {
            var e = parseInt(g.y / this.cell_size[1]);
            var f = parseInt((g.bottom - 1) / this.cell_size[1]);
            for (var j = e; j <= f; j++) {
                this.pushToCell(d, j, h);
            }
        }
        return h;
    };
    b.TileMap.prototype.pushToCell = function (c, e, d) {
        this.cells[c][e].push(d);
        if (this.sortFunction) {
            this.cells[c][e].sort(this.sortFunction);
        }
        return this;
    };
    b.TileMap.prototype.at = function (c, f) {
        var d = parseInt(c / this.cell_size[0]);
        var e = parseInt(f / this.cell_size[1]);
        return this.cells[d][e];
    };
    b.TileMap.prototype.atRect = function (j) {
        var k = [];
        var h;
        var c = parseInt(j.x / this.cell_size[0]);
        var e = parseInt(j.right / this.cell_size[0]);
        for (var d = c; d <= e; d++) {
            var f = parseInt(j.y / this.cell_size[1]);
            var g = parseInt(j.bottom / this.cell_size[1]);
            for (var l = f; l <= g; l++) {
                this.cells[d][l].forEach(function (n, m) {
                    if (k.indexOf(n) == -1) {
                        k.push(n);
                    }
                });
            }
        }
        return k;
    };
    b.TileMap.prototype.all = function () {
        var d = [];
        for (var c = 0; c < this.size[0]; c++) {
            for (var e = 0; e < this.size[1]; e++) {
                this.cells[c][e].forEach(function (f, g) {
                    d.push(f);
                });
            }
        }
        return d;
    };
    b.TileMap.prototype.cell = function (c, d) {
        return this.cells[c][d];
    };
    b.TileMap.prototype.toString = function () {
        return "[TileMap " + this.size[0] + " cols, " + this.size[1] + " rows]";
    };
    return b;
})(jaws || {});
if (typeof module !== "undefined" && "exports" in module) {
    module.exports = jaws.TileMap;
}
var BLOCK_WIDTH = 24;
function Block(d) {
    var b, c;
    d = d || {};
    this.boX = (d.boardOriginX || 0) + FIELD_OFFSET_X;
    this.boY = (d.boardOriginY || 0) + FIELD_OFFSET_Y;
    this.blockX = d.blockX;
    this.blockY = d.blockY;
    this.occupiedPositions = d.occupiedPositions;
    this.addOccupied(this.blockX, this.blockY);
    Block.invalidSpaces[this.blockX + "," + this.blockY] = true;
    d.x = this.boX + BLOCK_WIDTH * this.blockX;
    d.y = this.boY + BLOCK_WIDTH * this.blockY;
    if (d.preview) {
        d.image = "media/greyblock.png";
    } else {
        if (d.empty) {
            d.image = "media/emptyblock.png";
        } else {
            d.image = SHAPES[d.shape].image;
        }
    }
    b = new jaws.Sprite(d);
    for (c in b) {
        this[c] = b[c];
    }
}
Block.invalidSpaces = {};
Block.allInvalidated = false;
Block.invalidFlushed = function () {
    Block.invalidSpaces = {};
    Block.allInvalidated = false;
};
Block.invalidateAll = function () {
    Block.allInvalidated = true;
};
Block.prototype.setColor = function (b, c) {
    if (c) {
        this.setImage("media/greyblock.png");
    } else {
        this.setImage(SHAPES[b].image);
    }
    Block.invalidSpaces[this.blockX + "," + this.blockY] = true;
};
Block.prototype.moveBlock = function (c, b) {
    Block.invalidSpaces[this.blockX + "," + this.blockY] = true;
    this.removeOccupied(this.blockX, this.blockY);
    this.blockX += c;
    this.blockY += b;
    Block.invalidSpaces[this.blockX + "," + this.blockY] = true;
    this.addOccupied(this.blockX, this.blockY);
    this.x += c * BLOCK_WIDTH;
    this.y += b * BLOCK_WIDTH;
};
Block.prototype.setPosition = function (b, c) {
    Block.invalidSpaces[this.blockX + "," + this.blockY] = true;
    this.removeOccupied(this.blockX, this.blockY);
    this.blockX = b;
    this.blockY = c;
    Block.invalidSpaces[this.blockX + "," + this.blockY] = true;
    this.addOccupied(this.blockX, this.blockY);
    this.x = this.boX + b * BLOCK_WIDTH;
    this.y = this.boY + c * BLOCK_WIDTH;
};
Block.prototype.getX = function () {
    return this.blockX;
};
Block.prototype.getY = function () {
    return this.blockY;
};
Block.prototype.isPosition = function (b, c) {
    return this.blockX === b && this.blockY === c;
};
Block.prototype.drawIfInvalid = function () {
    if (Block.invalidSpaces[this.blockX + "," + this.blockY] || Block.allInvalidated || this.blockY < 0) {
        this.draw();
    }
};
Block.prototype.kill = function () {
    Block.invalidSpaces[this.blockX + "," + this.blockY] = true;
    this.removeOccupied(this.blockX, this.blockY);
};
Block.prototype.removeOccupied = function (b, d) {
    var c = b + "," + d;
    if (this.occupiedPositions && this.occupiedPositions[c]) {
        this.occupiedPositions[c] -= 1;
    }
};
Block.prototype.addOccupied = function (b, d) {
    var c = b + "," + d;
    if (this.occupiedPositions) {
        if (this.occupiedPositions[c] === undefined) {
            this.occupiedPositions[c] = 0;
        }
        this.occupiedPositions[c] += 1;
    }
};
var SHAPES = {
    i: {
        spin: "corner",
        startX: 5,
        startY: 0,
        pos: [
            { x: -2, y: -1 },
            { x: -1, y: -1 },
            { x: 0, y: -1 },
            { x: 1, y: -1 },
        ],
        image: "media/cyanblock.png",
        kickType: "i_block",
    },
    o: {
        spin: "corner",
        startX: 5,
        startY: -1,
        pos: [
            { x: -1, y: 0 },
            { x: 0, y: 0 },
            { x: -1, y: -1 },
            { x: 0, y: -1 },
        ],
        image: "media/yellowblock.png",
        kickType: "standard",
    },
    j: {
        spin: "block",
        startX: 4,
        startY: -1,
        pos: [
            { x: -1, y: -1 },
            { x: -1, y: 0 },
            { x: 0, y: 0 },
            { x: 1, y: 0 },
        ],
        image: "media/blueblock.png",
        kickType: "standard",
    },
    l: {
        spin: "block",
        startX: 4,
        startY: -1,
        pos: [
            { x: -1, y: 0 },
            { x: 0, y: 0 },
            { x: 1, y: 0 },
            { x: 1, y: -1 },
        ],
        image: "media/orangeblock.png",
        kickType: "standard",
    },
    s: {
        spin: "block",
        startX: 4,
        startY: -1,
        pos: [
            { x: -1, y: 0 },
            { x: 0, y: 0 },
            { x: 0, y: -1 },
            { x: 1, y: -1 },
        ],
        image: "media/greenblock.png",
        kickType: "standard",
    },
    z: {
        spin: "block",
        startX: 4,
        startY: -1,
        pos: [
            { x: -1, y: -1 },
            { x: 0, y: -1 },
            { x: 0, y: 0 },
            { x: 1, y: 0 },
        ],
        image: "media/redblock.png",
        kickType: "standard",
    },
    t: {
        spin: "block",
        startX: 4,
        startY: -1,
        pos: [
            { x: -1, y: 0 },
            { x: 0, y: 0 },
            { x: 0, y: -1 },
            { x: 1, y: 0 },
        ],
        image: "media/purpleblock.png",
        kickType: "standard",
    },
};
var WALL_KICK_OFFSETS = {};
WALL_KICK_OFFSETS.standard = [
    {
        cw: [
            { x: 0, y: 0 },
            { x: -1, y: 0 },
            { x: -1, y: -1 },
            { x: 0, y: 2 },
            { x: -1, y: 2 },
        ],
        ccw: [
            { x: 0, y: 0 },
            { x: 1, y: 0 },
            { x: 1, y: -1 },
            { x: 0, y: 2 },
            { x: 1, y: 2 },
        ],
    },
    {
        cw: [
            { x: 0, y: 0 },
            { x: 1, y: 0 },
            { x: 1, y: 1 },
            { x: 0, y: -2 },
            { x: 1, y: -2 },
        ],
        ccw: [
            { x: 0, y: 0 },
            { x: 1, y: 0 },
            { x: 1, y: 1 },
            { x: 0, y: -2 },
            { x: 1, y: -2 },
        ],
    },
    {
        cw: [
            { x: 0, y: 0 },
            { x: 1, y: 0 },
            { x: 1, y: -1 },
            { x: 0, y: 2 },
            { x: 1, y: 2 },
        ],
        ccw: [
            { x: 0, y: 0 },
            { x: -1, y: 0 },
            { x: -1, y: -1 },
            { x: 0, y: 2 },
            { x: -1, y: 2 },
        ],
    },
    {
        cw: [
            { x: 0, y: 0 },
            { x: -1, y: 0 },
            { x: -1, y: 1 },
            { x: 0, y: -2 },
            { x: -1, y: -2 },
        ],
        ccw: [
            { x: 0, y: 0 },
            { x: -1, y: 0 },
            { x: -1, y: 1 },
            { x: 0, y: -2 },
            { x: -1, y: -2 },
        ],
    },
];
WALL_KICK_OFFSETS.i_block = [
    {
        cw: [
            { x: 0, y: 0 },
            { x: -2, y: 0 },
            { x: 1, y: 0 },
            { x: -2, y: 1 },
            { x: 1, y: -2 },
        ],
        ccw: [
            { x: 0, y: 0 },
            { x: -1, y: 0 },
            { x: 2, y: 0 },
            { x: -1, y: -2 },
            { x: 2, y: 1 },
        ],
    },
    {
        cw: [
            { x: 0, y: 0 },
            { x: -1, y: 0 },
            { x: 2, y: 0 },
            { x: -1, y: -2 },
            { x: 2, y: 1 },
        ],
        ccw: [
            { x: 0, y: 0 },
            { x: 2, y: 0 },
            { x: -1, y: 0 },
            { x: 2, y: -1 },
            { x: -1, y: 2 },
        ],
    },
    {
        cw: [
            { x: 0, y: 0 },
            { x: 2, y: 0 },
            { x: -1, y: 0 },
            { x: 2, y: -1 },
            { x: -1, y: 2 },
        ],
        ccw: [
            { x: 0, y: 0 },
            { x: 1, y: 0 },
            { x: -2, y: 0 },
            { x: 1, y: 2 },
            { x: -2, y: -1 },
        ],
    },
    {
        cw: [
            { x: 0, y: 0 },
            { x: 1, y: 0 },
            { x: -2, y: 0 },
            { x: 1, y: 2 },
            { x: -2, y: 1 },
        ],
        ccw: [
            { x: 0, y: 0 },
            { x: -2, y: 0 },
            { x: 1, y: 0 },
            { x: -2, y: 1 },
            { x: 1, y: -2 },
        ],
    },
];
function ControlGroup(h, b, g) {
    var d, f, e, c;
    c = SHAPES[b];
    this.pos = c.pos;
    this.spin = c.spin;
    this.bottomed = false;
    this.blocks = h;
    this.baseX = c.startX;
    this.baseY = c.startY;
    this.shape = b;
    this.kickOffsets = WALL_KICK_OFFSETS[c.kickType];
    this.dir = 0;
    this.isIllegalStart = false;
    this.isLegalCallback =
        g ||
        function () {
            return true;
        };
    this.lastWasSpin = false;
    for (d = 0; d < h.length; d += 1) {
        f = this.baseX + this.pos[d].x;
        e = this.baseY + this.pos[d].y;
        if (!this.isLegalCallback(f, e)) {
            this.isIllegalStart = true;
        }
        this.blocks[d].setPosition(f, e);
    }
    this.updateBottomedState();
}
ControlGroup.prototype.isLegalPosition = function (b, e) {
    var c,
        d = this.blocks;
    for (c = 0; c < 4; c += 1) {
        if (d[c].isPosition(b, e)) {
            return true;
        }
    }
    return this.isLegalCallback(b, e);
};
ControlGroup.prototype.shift = function (d) {
    var b = d ? -1 : 1,
        c;
    for (c = 0; c < 4; c += 1) {
        if (!this.isLegalPosition(this.blocks[c].getX() + b, this.blocks[c].getY())) {
            return false;
        }
    }
    this.lastWasSpin = false;
    this.baseX += b;
    for (c = 0; c < this.blocks.length; c += 1) {
        this.blocks[c].moveBlock(b, 0);
    }
    this.updateBottomedState();
    return true;
};
ControlGroup.prototype.updateBottomedState = function () {
    var b;
    for (b = 0; b < this.blocks.length; b += 1) {
        if (!this.isLegalPosition(this.blocks[b].getX(), this.blocks[b].getY() + 1)) {
            this.bottomed = true;
            return;
        }
    }
    this.bottomed = false;
};
ControlGroup.prototype.drop = function () {
    var b;
    if (this.bottomed) {
        return;
    }
    this.lastWasSpin = false;
    this.baseY += 1;
    for (b = 0; b < this.blocks.length; b += 1) {
        this.blocks[b].moveBlock(0, 1);
    }
    this.updateBottomedState();
};
ControlGroup.prototype.isBottomed = function () {
    return this.bottomed;
};
ControlGroup.prototype.turn = function (b) {
    var e,
        c = null,
        g = b ? "cw" : "ccw",
        f = this.kickOffsets[this.dir][g],
        d;
    for (d = 0; d < f.length; d += 1) {
        e = f[d];
        c = this.tryTurn(b, e);
        if (c) {
            break;
        }
    }
    if (!c) {
        return false;
    }
    this.lastWasSpin = true;
    for (d = 0; d < 4; d += 1) {
        this.blocks[d].setPosition(c[d].x, c[d].y);
    }
    this.baseX += e.x;
    this.baseY += e.y;
    if (b) {
        this.dir += 1;
        if (this.dir === 4) {
            this.dir = 0;
        }
    } else {
        this.dir -= 1;
        if (this.dir === -1) {
            this.dir = 3;
        }
    }
    this.updateBottomedState();
    return true;
};
ControlGroup.prototype.tryTurn = function (d, g) {
    var c,
        k,
        j,
        h,
        e,
        b = [],
        f;
    if (this.spin === "block") {
        for (e = 0; e < this.blocks.length; e += 1) {
            c = (d ? -1 : 1) * (this.blocks[e].blockY - this.baseY) + this.baseX + g.x;
            k = (d ? 1 : -1) * (this.blocks[e].blockX - this.baseX) + this.baseY + g.y;
            b[e] = { x: c, y: k };
        }
    } else {
        for (e = 0; e < this.blocks.length; e += 1) {
            j = this.blocks[e].blockX - this.baseX;
            h = this.blocks[e].blockY - this.baseY;
            if (j >= 0) {
                j += 1;
            }
            if (h >= 0) {
                h += 1;
            }
            c = (d ? -1 : 1) * h;
            k = (d ? 1 : -1) * j;
            if (c > 0) {
                c -= 1;
            }
            if (k > 0) {
                k -= 1;
            }
            b[e] = { x: c + this.baseX + g.x, y: k + this.baseY + g.y };
        }
    }
    for (e = 0; e < 4; e += 1) {
        f = b[e];
        if (!this.isLegalPosition(f.x, f.y)) {
            return null;
        }
    }
    return b;
};
ControlGroup.prototype.getFallPositions = function () {
    var d = [],
        e = 0,
        c,
        f,
        b = true;
    while (b) {
        e += 1;
        for (c = 0; c < 4 && b; c += 1) {
            f = this.blocks[c];
            if (!this.isLegalPosition(f.getX(), f.getY() + e)) {
                e -= 1;
                b = false;
            }
        }
    }
    for (c = 0; c < 4; c += 1) {
        f = this.blocks[c];
        d.push({ x: f.getX(), y: f.getY() + e });
    }
    return { dist: e, positions: d };
};
ControlGroup.prototype.fall = function () {
    var e = this.getFallPositions(),
        b = e.positions,
        f = e.dist,
        d,
        c;
    if (f !== 0) {
        this.lastWasSpin = false;
    }
    for (d = 0; d < 4; d += 1) {
        c = b[d];
        this.blocks[d].setPosition(c.x, c.y);
    }
    this.bottomed = true;
    return f;
};
ControlGroup.prototype.configurePreviewBlocks = function (c) {
    var b = this.getFallPositions().positions,
        d;
    for (d = 0; d < 4; d += 1) {
        c[d].setPosition(b[d].x, b[d].y);
    }
};
ControlGroup.prototype.getShape = function () {
    return this.shape;
};
ControlGroup.prototype.getBlocks = function () {
    return this.blocks;
};
ControlGroup.prototype.getTSpin = function () {
    var c,
        e = [
            { x: -1, y: -1 },
            { x: 1, y: -1 },
            { x: 1, y: 1 },
            { x: -1, y: 1 },
        ],
        f = 0,
        d = false,
        b;
    if (!this.lastWasSpin) {
        return null;
    }
    if (this.shape !== "t") {
        return null;
    }
    if (this.dir === 0) {
        e[0].miniCheck = true;
        e[1].miniCheck = true;
    } else {
        if (this.dir === 1) {
            e[1].miniCheck = true;
            e[2].miniCheck = true;
        } else {
            if (this.dir === 2) {
                e[2].miniCheck = true;
                e[3].miniCheck = true;
            } else {
                if (this.dir === 3) {
                    e[3].miniCheck = true;
                    e[0].miniCheck = true;
                }
            }
        }
    }
    for (c = 0; c < 4; c += 1) {
        b = e[c];
        if (!this.isLegalPosition(this.baseX + b.x, this.baseY + b.y)) {
            f += 1;
        } else {
            if (b.miniCheck) {
                d = true;
            }
        }
    }
    if (f >= 3) {
        if (d) {
            return "mini";
        }
        return "normal";
    }
    return null;
};
var Background = function (c) {
    var b, e, d;
    c = c || {};
    this.originX = (c.x || 0) + FIELD_OFFSET_X;
    this.originY = (c.y || 0) + FIELD_OFFSET_Y;
    this.width = 10;
    this.height = 20;
    this.tiles = [];
    for (b = 0; b < this.width; b += 1) {
        for (e = 0; e < this.height; e += 1) {
            d = new Block({ empty: true, blockX: b, blockY: e });
            this.tiles.push(d);
        }
    }
    this.backdrop = new jaws.Sprite({ image: "media/background/backdrop.png" });
    this.backdrop.x = 0;
    this.backdrop.y = 0;
    this.topBar = new jaws.Sprite({ image: "media/background/topbar.png" });
    this.topBar.x = 181;
    this.topBar.y = 0;
    this.fullRedrawNeeded = true;
};
Background.prototype.draw = function (b) {
    var c;
    if (this.fullRedrawNeeded || b) {
        this.backdrop.draw();
        for (c = 0; c < this.tiles.length; c += 1) {
            this.tiles[c].draw();
        }
        this.fullRedrawNeeded = false;
    } else {
        this.topBar.draw();
        jaws.context.fillstyle = "#000D00";
        jaws.context.fillRect(24, 42, 118, 60);
        jaws.context.fillRect(457, 18, 107, 341);
        for (c = 0; c < this.tiles.length; c += 1) {
            this.tiles[c].drawIfInvalid();
        }
    }
};
function RandomBag(b) {
    this.available = [];
    this.queue = [];
    while (this.queue.length < b) {
        this.queue.push(this.nextAvailable());
    }
}
RandomBag.initialList = ["i", "o", "j", "l", "z", "s", "t"];
RandomBag.prototype.getQueue = function () {
    return this.queue;
};
RandomBag.prototype.popQueue = function () {
    var b = this.queue.shift();
    this.queue.push(this.nextAvailable());
    return b;
};
RandomBag.prototype.nextAvailable = function () {
    var b, c;
    if (this.available.length === 0) {
        this.available = RandomBag.initialList.slice(0);
    }
    b = Math.floor(Math.random() * this.available.length);
    c = this.available.splice(b, 1)[0];
    return c;
};
function PreviewGroup(d, c) {
    var b;
    this.blocks = [];
    this.shape = null;
    for (b = 0; b < 4; b += 1) {
        this.blocks.push(new Block({ boardOriginX: d, boardOriginY: c, blockX: 0, blockY: 0, shape: "i" }));
    }
}
PreviewGroup.prototype.setShape = function (b) {
    var d = SHAPES[b],
        c;
    this.shape = b;
    for (c = 0; c < 4; c += 1) {
        this.blocks[c].setPosition(d.pos[c].x, d.pos[c].y);
        this.blocks[c].setColor(b, false);
    }
};
PreviewGroup.prototype.getShape = function () {
    return this.shape;
};
PreviewGroup.prototype.draw = function () {
    var b;
    for (b = 0; b < 4; b += 1) {
        this.blocks[b].draw();
    }
};
function ScoreTracker(c, e, b, d) {
    this.level = 1;
    this.score = 0;
    this.linesRemaining = ScoreTracker.levelLines(this.level);
    this.scoreOutput = c;
    this.linesOutput = e;
    this.levelOutput = b;
    this.tickerOutput = d;
    this.curCombo = -1;
    this.lastWasBonus = false;
    this.backToBackCount = 0;
    this.isGameWon = false;
    this.outputScore();
    this.outputLines();
    this.outputLevel();
}
ScoreTracker.levelLines = function (b) {
    return b * 5;
};
ScoreTracker.prototype.updateScore = function (f) {
    var c = 0,
        b = false,
        d = 0,
        g = [],
        e;
    if (f.miniT) {
        g.push("T Spin Mini");
        c += 1;
        d += 100 * this.level;
        if (f.lines === 1) {
            c += 1;
            d += 100 * this.level;
        }
    } else {
        if (f.normalT) {
            switch (f.lines) {
                case 0:
                    g.push("T Spin");
                    c += 4;
                    d += 400 * this.level;
                    break;
                case 1:
                    g.push("T Spin Single");
                    c += 8;
                    b = true;
                    d += 800 * this.level;
                    break;
                case 2:
                    g.push("T Spin Double");
                    c += 12;
                    b = true;
                    d += 1200 * this.level;
                    break;
                case 3:
                    g.push("T SPIN TRIPLE");
                    c += 16;
                    b = true;
                    d += 1600 * this.level;
                    break;
            }
        } else {
            if (f.lines > 0) {
                switch (f.lines) {
                    case 1:
                        g.push("Single");
                        c += 1;
                        d += 100 * this.level;
                        break;
                    case 2:
                        g.push("Double");
                        c += 3;
                        d += 300 * this.level;
                        break;
                    case 3:
                        g.push("Triple");
                        c += 5;
                        d += 500 * this.level;
                        break;
                    case 4:
                        g.push("TETRIS");
                        c += 8;
                        b = true;
                        d += 800 * this.level;
                        break;
                }
            }
        }
    }
    if (c > 0) {
        this.curCombo += 1;
        c += Math.floor(this.curCombo * 0.5);
        d += 50 * this.curCombo * this.level;
        if (this.curCombo >= 1) {
            g.push("Combo x" + this.curCombo);
        }
    } else {
        this.curCombo = -1;
    }
    if (this.lastWasBonus && b) {
        g.push("Back-to-Back");
        this.backToBackCount += 1;
        c = Math.floor(c * 1.5);
        d += this.backToBackCount * 0.5 * d;
    } else {
        this.backToBackCount = 0;
    }
    if (f.lines > 0) {
        this.lastWasBonus = b;
    }
    this.linesRemaining -= c;
    if (this.linesRemaining <= 0) {
        if (this.level < 15) {
            this.level += 1;
            this.linesRemaining = ScoreTracker.levelLines(this.level);
        } else {
            this.isGameWon = true;
        }
        this.outputLevel();
    }
    if (c > 0) {
        this.outputLines();
    }
    this.score += d;
    this.outputScore();
    if (g.length === 0) {
        this.tickerOutput.addLine("");
    } else {
        for (e = 0; e < g.length; e += 1) {
            this.tickerOutput.addLine(g[e]);
        }
    }
};
ScoreTracker.prototype.softDrop = function () {
    this.score += 1;
};
ScoreTracker.prototype.hardDrop = function (b) {
    this.score += 2 * b;
};
ScoreTracker.prototype.getLinesRemaining = function () {
    return this.linesRemaining;
};
ScoreTracker.prototype.getScore = function () {
    return this.score;
};
ScoreTracker.prototype.getLevel = function () {
    return this.level;
};
ScoreTracker.prototype.getLevelPeriod = function () {
    var b = [1000, 800, 600, 470, 380, 250, 200, 160, 130, 90, 50, 27, 20, 15, 10],
        c = b[this.level < b.length ? this.level : b.length - 1];
    return c;
};
ScoreTracker.prototype.gameWon = function () {
    return this.isGameWon;
};
ScoreTracker.prototype.getResults = function () {
    return { score: this.score, level: this.level, won: this.isGameWon };
};
ScoreTracker.prototype.outputScore = function () {
    this.scoreOutput.addLine("Score:");
    this.scoreOutput.addLine("" + this.score);
    this.scoreOutput.addLine("");
};
ScoreTracker.prototype.outputLines = function () {
    this.linesOutput.addLine("Lines:");
    this.linesOutput.addLine("" + this.linesRemaining);
    this.linesOutput.addLine("");
};
ScoreTracker.prototype.outputLevel = function () {
    this.levelOutput.addLine("Level:");
    this.levelOutput.addLine("" + this.level);
    this.levelOutput.addLine("");
};
function TtyBlock(e, d, f, c) {
    var b;
    this.elem = document.getElementById(e);
    this.curPos = 0;
    this.cursorShown = false;
    this.timePassedType = 0;
    this.timePassedFlash = 0;
    this.typePeriod = 30;
    this.flashPeriod = 300;
    this.lines = [];
    for (b = 0; b < d; b += 1) {
        this.lines.push("");
    }
    this.rollOverLength = f || 9;
    this.rollOverRemove = c || 3;
    this.backlog = [];
}
TtyBlock.prototype.draw = function (b) {
    var d,
        c = "",
        e;
    this.timePassedType += b;
    while (this.timePassedType > this.typePeriod) {
        this.curPos += 1;
        this.timePassedType -= this.typePeriod;
    }
    e = this.lines[this.lines.length - 1];
    if (this.curPos > e.length) {
        this.timePassedFlash += b;
        while (this.timePassedFlash > this.flashPeriod) {
            this.cursorShown = !this.cursorShown;
            this.timePassedFlash -= this.flashPeriod;
        }
    }
    if (this.curPos > e.length && this.backlog.length > 0) {
        this.lines.shift();
        e = this.backlog.shift();
        this.lines.push(e);
        this.curPos = 0;
    }
    for (d = 0; d < this.lines.length - 1; d += 1) {
        c += this.lines[d] + "<br/>";
    }
    c += e.slice(0, Math.min(this.curPos, e.length));
    if (this.cursorShown) {
        c += "_";
    }
    c.replace(">", "&gt");
    this.elem.innerHTML = c;
};
TtyBlock.prototype.addLine = function (b) {
    if (this.backlog.length > this.rollOverLength) {
        this.backlog.splice(this.backlog.length - this.rollOverRemove, this.rollOverRemove);
    }
    this.backlog.push("   > " + b);
};
function Game(e, f, d) {
    var c = this,
        b;
    this.firstLoop = true;
    this.blocks = [];
    this.controlGroup = null;
    this.previewBlocks = [];
    for (b = 0; b < 4; b += 1) {
        this.previewBlocks.push(new Block({ blockX: -10, blockY: -10, preview: true }));
    }
    this.scoreOutput = new TtyBlock("scoreDiv", 3);
    this.linesOutput = new TtyBlock("linesDiv", 3);
    this.levelOutput = new TtyBlock("levelDiv", 3);
    this.tickerOutput = new TtyBlock("tickerDiv", 5);
    this.scoreTracker = new ScoreTracker(this.scoreOutput, this.linesOutput, this.levelOutput, this.tickerOutput);
    this.dropPeriod = this.scoreTracker.getLevelPeriod();
    this.timeToNextDrop = this.dropPeriod;
    this.keyChargeTime = d;
    this.keyRepeatTime = f;
    this.bottomTimer = null;
    this.bottomLockTime = 500;
    this.lastBottomedState = false;
    this.lastTime = null;
    this.gameLost = false;
    this.previewLength = 5;
    this.randBag = new RandomBag(this.previewLength);
    this.previewGroups = [];
    for (b = 0; b < this.previewLength; b += 1) {
        this.previewGroups.push(new PreviewGroup(330, 70 * b + 35));
    }
    this.swapGroup = null;
    this.swapAllowed = true;
    this.occupiedPositions = {};
    this.input = {
        shiftLeft: {
            autoRepeat: true,
            handler: function () {
                if (c.controlGroup.shift(true)) {
                    c.resetLockCounter(true);
                }
            },
        },
        shiftRight: {
            autoRepeat: true,
            handler: function () {
                if (c.controlGroup.shift(false)) {
                    c.resetLockCounter(true);
                }
            },
        },
        softDrop: {
            autoRepeat: true,
            preCharged: true,
            handler: function () {
                c.dropBlock();
                c.scoreTracker.softDrop();
            },
        },
        hardDrop: {
            handler: function () {
                var g = c.controlGroup.fall();
                c.scoreTracker.hardDrop(g);
                c.lockBlocks();
            },
        },
        rotateLeft: {
            handler: function () {
                if (c.controlGroup.turn(false)) {
                    c.resetLockCounter(true);
                }
            },
        },
        rotateRight: {
            handler: function () {
                if (c.controlGroup.turn(true)) {
                    c.resetLockCounter(true);
                }
            },
        },
        swap: {
            handler: function () {
                c.swap();
            },
        },
    };
    this.inputMapping = e;
}
Game.prototype.newBlock = function (e) {
    var d = this,
        b = this.randBag.popQueue(),
        f = [],
        g,
        c;
    this.dropPeriod = this.scoreTracker.getLevelPeriod();
    for (c = 0; c < 4; c += 1) {
        g = new Block({ blockX: -10, blockY: -10, shape: b, occupiedPositions: this.occupiedPositions });
        f.push(g);
        this.blocks.push(g);
    }
    this.controlGroup = new ControlGroup(f, b, function (h, j) {
        return d.isLegalPosition(h, j);
    });
    if (this.controlGroup.isIllegalStart) {
        this.gameLost = true;
    }
    if (!e) {
        this.swapAllowed = true;
    }
    this.updatePreviews(this.randBag.getQueue());
};
Game.prototype.processInput = function (c) {
    var e, d, g, b, e, f;
    for (actionType in this.inputMapping) {
        g = this.inputMapping[actionType];
        e = this.input[actionType];
        b = false;
        for (f = 0; f < g.length; f += 1) {
            if (jaws.pressed(g[f])) {
                b = true;
            }
        }
        if (b) {
            if (!e.lastState) {
                e.handler();
                e.lastState = true;
                e.charged = e.preCharged ? true : false;
                e.holdTime = 0;
            }
            if (e.autoRepeat) {
                e.holdTime += c;
                if (!e.charged && e.holdTime > this.keyChargeTime) {
                    e.holdTime -= this.keyChargeTime;
                    e.handler();
                    e.charged = true;
                }
                if (e.charged && e.holdTime > this.keyRepeatTime) {
                    e.holdTime -= this.keyRepeatTime;
                    e.handler();
                }
            }
        } else {
            e.lastState = false;
        }
    }
};
Game.prototype.update = function (e) {
    var d, b, c;
    if (this.firstLoop) {
        this.firstLoop = false;
        this.newBlock();
        this.lastTime = e;
    }
    d = e;
    b = d - this.lastTime;
    this.lastTime = d;
    this.processInput(b);
    if (!this.controlGroup.isBottomed()) {
        this.lastBottomedState = false;
        this.applyGravity(b);
    } else {
        if (!this.lastBottomedState) {
            this.resetLockCounter(false);
        } else {
            this.bottomTimer -= b;
            if (this.bottomTimer <= 0 || this.slideCount >= 15) {
                this.lockBlocks();
            }
        }
        this.lastBottomedState = true;
    }
    if (this.controlGroup) {
        this.controlGroup.configurePreviewBlocks(this.previewBlocks);
    } else {
        for (c = 0; c < 4; c += 1) {
            this.previewBlocks[c].setPosition(-10, -10);
        }
    }
};
Game.prototype.draw = function (b) {
    var c;
    this.scoreOutput.draw(b);
    this.linesOutput.draw(b);
    this.levelOutput.draw(b);
    this.tickerOutput.draw(b);
    for (c = 0; c < 4; c += 1) {
        this.previewBlocks[c].drawIfInvalid();
    }
    if (this.swapGroup) {
        this.swapGroup.draw();
    }
    for (c = 0; c < this.previewGroups.length; c += 1) {
        this.previewGroups[c].draw();
    }
    for (c = 0; c < this.blocks.length; c += 1) {
        this.blocks[c].drawIfInvalid();
    }
};
Game.prototype.isLegalPosition = function (b, c) {
    if (this.occupiedPositions[b + "," + c]) {
        return false;
    }
    if (b >= 10 || b < 0 || c >= 20) {
        return false;
    }
    return true;
};
Game.prototype.dropBlock = function (b) {
    if (!b) {
        this.timeToNextDrop = this.dropPeriod;
    }
    this.controlGroup.drop();
};
Game.prototype.getRows = function () {
    var d,
        e = [],
        c = [],
        b;
    for (d = 0; d < 20; d += 1) {
        e[d] = 0;
    }
    for (d = 0; d < this.blocks.length; d += 1) {
        b = this.blocks[d].getY();
        e[b] += 1;
        if (e[b] === 10) {
            c.push(b);
        }
    }
    return c;
};
Game.prototype.removeRows = function (g) {
    var c = {},
        e,
        d,
        f = {},
        h,
        b;
    for (e = -4; e < 20; e += 1) {
        c[e] = 0;
    }
    for (e = 0; e < g.length; e += 1) {
        f[g[e]] = true;
        for (d = -4; d < g[e]; d += 1) {
            c[d] += 1;
        }
    }
    for (e = 0; e < this.blocks.length; e += 1) {
        h = this.blocks[e];
        b = h.getY();
        if (f[b]) {
            this.removeBlock(e);
            e -= 1;
        } else {
            h.setPosition(h.getX(), h.getY() + c[b]);
        }
    }
};
Game.prototype.removeBlock = function (b) {
    this.blocks[b].kill();
    return this.blocks.splice(b, 1);
};
Game.prototype.applyGravity = function (b) {
    this.timeToNextDrop -= b;
    while (this.timeToNextDrop < 0 && !this.controlGroup.isBottomed()) {
        this.dropBlock(true);
        this.timeToNextDrop += this.dropPeriod;
    }
    if (this.controlGroup.isBottomed()) {
        this.timeToNextDrop = this.dropPeriod;
    }
};
Game.prototype.updatePreviews = function (b) {
    var c;
    for (c = 0; c < b.length; c += 1) {
        this.previewGroups[c].setShape(b[c]);
    }
};
Game.prototype.swap = function () {
    var d,
        c,
        b,
        h = this.controlGroup.getShape(),
        g = this.controlGroup.getBlocks(),
        f = [],
        e = this;
    if (!this.swapAllowed) {
        return;
    }
    this.swapAllowed = false;
    this.resetLockCounter(false);
    for (d = 0; d < this.blocks.length; d += 1) {
        for (c = 0; c < 4; c += 1) {
            if (g[c] === this.blocks[d]) {
                this.removeBlock(d);
                d -= 1;
            }
        }
    }
    if (this.swapGroup) {
        b = this.swapGroup.getShape();
        for (d = 0; d < 4; d += 1) {
            f.push(new Block({ blockX: -10, blockY: -10, shape: b, occupiedPositions: this.occupiedPositions }));
            this.blocks.push(f[d]);
        }
        this.controlGroup = new ControlGroup(f, b, function (j, k) {
            return e.isLegalPosition(j, k);
        });
        this.swapGroup.setShape(h);
        return;
    }
    this.swapGroup = new PreviewGroup(-100, 60);
    this.swapGroup.setShape(h);
    this.newBlock(true);
};
Game.prototype.lockBlocks = function () {
    var b = this.controlGroup.getTSpin(),
        c = {},
        d;
    if (b === "mini") {
        c.miniT = true;
    } else {
        if (b === "normal") {
            c.normalT = true;
        }
    }
    d = this.getRows();
    c.lines = d.length;
    if (d.length > 0) {
        this.removeRows(d);
    }
    this.scoreTracker.updateScore(c);
    this.newBlock();
    this.resetLockCounter(false);
};
Game.prototype.resetLockCounter = function (b) {
    if (b) {
        this.slideCount += 1;
    } else {
        this.slideCount = 0;
    }
    this.bottomTimer = this.bottomLockTime;
};
Game.prototype.getResults = function () {
    if (this.gameLost || this.scoreTracker.gameWon()) {
        return this.scoreTracker.getResults();
    }
    return null;
};
function Button(d) {
    var b = new jaws.Sprite(d),
        c;
    for (c in b) {
        this[c] = b[c];
    }
}
Button.prototype.isClicked = function (b, c) {
    return this.rect().collidePoint(b, c);
};
FIELD_OFFSET_X = 180;
FIELD_OFFSET_Y = 12;
function TetrisControl() {
    var b = new Tetris(this);
    this.setup = function () {
        b.setup();
    };
    this.update = function () {
        b.update();
    };
    this.draw = function () {
        b.draw();
    };
    this.restart = function () {
        b = new Tetris(this);
        b.setup();
        b.update();
    };
}
function Tetris(d) {
    var h = null,
        q = null,
        p = 0,
        c = false,
        l = 0,
        k = false,
        e = false,
        o = false,
        n = null,
        r = this,
        g = null,
        b = null,
        f = null,
        m = null,
        j = new TtyBlock("gameEndDiv", 10, 20, 1);
    this.setup = function () {
        var t = [],
            s,
            u;
        for (s in inputAssignments) {
            t = t.concat(inputAssignments[s]);
        }
        jaws.preventDefaultKeys(t);
        Tetris.currentInstance = r;
        q = new Game(inputAssignments, autoRepeatConfig, thresholdConfig);
        g = new Button({ image: "media/buttons/continue.png", x: 250, y: 150 });
        b = new Button({ image: "media/buttons/restart.png", x: 250, y: 200 });
        h = new Background();
        p = new Date().getTime();
    };
    this.update = function () {
        var u = new Date().getTime(),
            t = jaws.pressed("esc"),
            s;
        if (f === null) {
            m = 0;
            f = u;
        } else {
            m = u - f;
            f = u;
        }
        if (!k && !o) {
            if (t && !c) {
                l = u;
                k = true;
            } else {
                q.update(u - p);
                s = q.getResults();
                if (s) {
                    o = true;
                    document.getElementById("gameEndContainer").setAttribute("class", "gameEndOutputVisible");
                    j.addLine("GOOD GAME!!!");
                    j.addLine("");
                    j.addLine("");
                    if (s.won) {
                        j.addLine("You Win!");
                    } else {
                        j.addLine("Better Luck Next Time.");
                    }
                    j.addLine("");
                    j.addLine("");
                }
            }
        } else {
            if (k) {
                if (t && !c) {
                    p += u - l;
                    k = false;
                }
                if (n) {
                    if (g.isClicked(n.x, n.y)) {
                        p += u - l;
                        k = false;
                    }
                    if (b.isClicked(n.x, n.y)) {
                        d.restart();
                        return;
                    }
                }
            } else {
            }
        }
        c = t;
        n = null;
    };
    this.draw = function () {
        if (!k && !o) {
            h.draw(e);
            if (e) {
                e = false;
                Block.invalidateAll();
            }
            q.draw(m);
            Block.invalidFlushed();
        } else {
            if (k) {
                h.draw();
                q.draw(m);
                g.draw();
                b.draw();
                e = true;
            } else {
                h.draw();
                q.draw(m);
            }
        }
        j.draw(m);
    };
    this.mouseClicked = function (s, t) {
        n = { x: s, y: t };
    };
}
window.onload = function () {
    loadGameControls();
    jaws.assets.add("media/blueblock.png");
    jaws.assets.add("media/cyanblock.png");
    jaws.assets.add("media/greenblock.png");
    jaws.assets.add("media/orangeblock.png");
    jaws.assets.add("media/purpleblock.png");
    jaws.assets.add("media/redblock.png");
    jaws.assets.add("media/yellowblock.png");
    jaws.assets.add("media/greyblock.png");
    jaws.assets.add("media/emptyblock.png");
    jaws.assets.add("media/buttons/continue.png");
    jaws.assets.add("media/buttons/restart.png");
    jaws.assets.add("media/background/backdrop.png");
    jaws.assets.add("media/background/topbar.png");
    jaws.start(TetrisControl);
};
var inputAssignments = { shiftLeft: ["left"], shiftRight: ["right"], softDrop: ["down"], rotateLeft: ["z"], rotateRight: ["x", "up"], swap: ["shift", "c"], hardDrop: ["space"] };
var autoRepeatConfig = 50;
var thresholdConfig = 200;
function loadGameControls() {
    var d = ["rotateLeft", "rotateRight", "shiftLeft", "shiftRight", "softDrop", "hardDrop", "swap"],
        c,
        b;
    if (readCookie("customControls") === "TRUE") {
        for (c = 0; c < d.length; c += 1) {
            b = readCookie(d[c]);
            document.getElementById(d[c]).innerHTML = b;
            inputAssignments[d[c]] = [b.toLowerCase()];
        }
    }
    var f = readCookie("autoRepeat");
    if (f !== null) {
        autoRepeatConfig = parseInt(f);
    }
    var e = readCookie("threshold");
    if (e != null) {
        thresholdConfig = parseInt(e);
    }
}