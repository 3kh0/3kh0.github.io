var passiveEventsAreSupported = null;
var crossPromoJSIsReady = false;
var crossPromoConfigName = "";

var jsFunctions = {
    isFullscreen: function() {
        try {
            return document.fullscreenElement != null || document.mozFullScreenElement != null
            || document.webkitFullscreenElement != null || document.msFullscreenElement != null;
        } catch (err) {
            return false;
        }
    },
    goFullscreen: function (toggle, thenDo) {
        try {
            if (document.fullscreenElement != null || document.mozFullScreenElement != null
                || document.webkitFullscreenElement != null || document.msFullscreenElement != null) {
                if (toggle) {
                    if (document.cancelFullScreen) {
                        document.cancelFullScreen();
                    } else if (document.mozCancelFullScreen) {
                        document.mozCancelFullScreen();
                    } else if (document.webkitCancelFullScreen) {
                        document.webkitCancelFullScreen();
                    } else if (document.msCancelFullScreen) {
                        document.msCancelFullScreen();
                    }
                }
                
                return;
            }
            
            var failedOrientationLock = false;

            function tryLockOrientation() {
                if ("orientation" in screen) {
                    if ("lock" in screen.orientation)
                        screen.orientation.lock("landscape").catch(function() {
                            failedOrientationLock = true;
                        });
                    else if ("lockOrientation" in screen.orientation)
                        screen.orientation.lockOrientation("landscape");
                    else if ("mozLockOrientation" in screen.orientation)
                        screen.orientation.mozLockOrientation("landscape");
                } else if ("mozOrientation" in screen) {
                    if ("mozLock" in screen.mozOrientation)
                        screen.orientation.mozLock("landscape").catch(function() {
                            failedOrientationLock = true;
                        });
                    else if ("mozLockOrientation" in screen.mozOrientation)
                        screen.orientation.mozLockOrientation("landscape");
                } else if ("msOrientation" in screen) {
                    if ("msLock" in screen.msOrientation)
                        screen.orientation.msLock("landscape").catch(function() {
                            failedOrientationLock = true;
                        });
                    else if ("msLockOrientation" in screen.msOrientation)
                        screen.orientation.msLockOrientation("landscape");
                } else if ("webkitOrientation" in screen) {
                    if ("webkitLock" in screen.webkitOrientation)
                        screen.orientation.webkitLock("landscape").catch(function() {
                            failedOrientationLock = true;
                        });
                    else if ("webkitLockOrientation" in screen.webkitOrientation)
                        screen.orientation.webkitLockOrientation("landscape");
                }
            }

            var element = document.body;
            if (element.requestFullscreen) {
                var thePromiseHopefully = element.requestFullscreen();
                
                //ThenDo is executed if the stars are right
                if (thePromiseHopefully != undefined)
                    thePromiseHopefully.catch(function() {
                        
                    }).then(function() {
                        if (thenDo != null)
                            thenDo();

                        if (failedOrientationLock)
                            tryLockOrientation();
                    });
            } else if (element.mozRequestFullScreen) {
                element.mozRequestFullScreen();
            } else if (element.webkitRequestFullscreen) {
                element.webkitRequestFullscreen();
            } else if (element.msRequestFullscreen) {
                element.msRequestFullscreen();
            }

            tryLockOrientation();
        } catch (err) {

        }
    },
    orientationLockSupported: function() {
        try {
            return "orientation" in screen || "mozOrientation" in screen || "msOrientation" in screen || "webkitOrientation" in screen;
        } catch (err) {
            return false;
        }
    },
    getPassiveEventListenerVar: function() {
        if (passiveEventsAreSupported != null)
            return passiveEventsAreSupported ? {passive: false} : false;

        //https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener
        try {
            var options = {
                get passive() { // This function will be called when the browser
                                //   attempts to access the passive property.
                    passiveEventsAreSupported = true;
                }
            };

            window.addEventListener("test", options, options);
            window.removeEventListener("test", options, options);
        } catch(err) {
            passiveEventsAreSupported = false;
        }

        return passiveEventsAreSupported ? {passive: false} : false;
    },
    loadJS: function(filename, then, thenError) {
        var scriptelem = document.createElement('script');
        scriptelem.setAttribute("src", filename);
        document.getElementsByTagName('head')[0].appendChild(scriptelem);
        scriptelem.onload = then;
        if (thenError != undefined)
            scriptelem.onerror = thenError;
    },
    initGA: function() {
        // Initialize Google Analytics
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
      
        gtag('config', 'UA-48290579-2', { 'anonymize_ip': true });

        jsFunctions.gaSendEvent = function(category, action, label, value, nonInteraction) {
            gtag('event', action, {
                'event_category': category,
                'event_label': label,
                'value': value,
                "non_interaction": nonInteraction
            });        
        };
        //Errors aren't nice, let's catch them!
        jsFunctions.gaSendError = function(errorMessage) {
            gtag('event', 'exception', {
                'description': errorMessage
            });
        }
    },
    initCrossPromo: function(configName) {
        jsFunctions.loadJS("https://florianvanstrien.nl/crosspromo/wagtail_crosspromo.js", function() {
            try {
                crossPromoConfig("The Final Earth 2", configName);
                crossPromoJSIsReady = true;
                crossPromoConfigName = configName;
            } catch(err) {
                crossPromoJSIsReady = false;
            }
        });
    },
    showCrossPromoDisplay: function(useFallback) {
        if (!crossPromoJSIsReady) {
            //Fallback
            if (useFallback)
                window.location.assign("https://florianvanstrien.nl/crosspromo/index.html?name=The%20Final%20Earth%202&config=" + crossPromoConfigName);
        } else {
            //The nice cross promo
            crossPromoOpen();
        }
    },
    crossPromoIsVisible: function() {
        if (crossPromoJSIsReady)
            return crossPromoVisible();
        return false;
    },
    crossPromoClose: function() {
        if (crossPromoJSIsReady)
            window.closeCrossPromo();
    },
    crossPromoInited: function() {
        if (! crossPromoJSIsReady)
            return false;
        return crossPromoIsReady();
    }
};

/* canvas-toBlob.js
 * A canvas.toBlob() implementation.
 * 2016-05-26
 * 
 * By Eli Grey, http://eligrey.com and Devin Samarin, https://github.com/eboyjr
 * License: MIT
 *   See https://github.com/eligrey/canvas-toBlob.js/blob/master/LICENSE.md
 */

/*global self */
/*jslint bitwise: true, regexp: true, confusion: true, es5: true, vars: true, white: true,
  plusplus: true */

/*! @source http://purl.eligrey.com/github/canvas-toBlob.js/blob/master/canvas-toBlob.js */

(function (view) {
    "use strict";
    var
        Uint8Array = view.Uint8Array
        , HTMLCanvasElement = view.HTMLCanvasElement
        , canvas_proto = HTMLCanvasElement && HTMLCanvasElement.prototype
        , is_base64_regex = /\s*;\s*base64\s*(?:;|$)/i
        , to_data_url = "toDataURL"
        , base64_ranks
        , decode_base64 = function (base64) {
            var
                len = base64.length
                , buffer = new Uint8Array(len / 4 * 3 | 0)
                , i = 0
                , outptr = 0
                , last = [0, 0]
                , state = 0
                , save = 0
                , rank
                , code
                , undef
                ;
            while (len--) {
                code = base64.charCodeAt(i++);
                rank = base64_ranks[code - 43];
                if (rank !== 255 && rank !== undef) {
                    last[1] = last[0];
                    last[0] = code;
                    save = (save << 6) | rank;
                    state++;
                    if (state === 4) {
                        buffer[outptr++] = save >>> 16;
                        if (last[1] !== 61 /* padding character */) {
                            buffer[outptr++] = save >>> 8;
                        }
                        if (last[0] !== 61 /* padding character */) {
                            buffer[outptr++] = save;
                        }
                        state = 0;
                    }
                }
            }
            // 2/3 chance there's going to be some null bytes at the end, but that
            // doesn't really matter with most image formats.
            // If it somehow matters for you, truncate the buffer up outptr.
            return buffer;
        }
        ;
    if (Uint8Array) {
        base64_ranks = new Uint8Array([
            62, -1, -1, -1, 63, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, -1
            , -1, -1, 0, -1, -1, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9
            , 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25
            , -1, -1, -1, -1, -1, -1, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35
            , 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51
        ]);
    }
    if (HTMLCanvasElement && (!canvas_proto.toBlob || !canvas_proto.toBlobHD)) {
        if (!canvas_proto.toBlob)
            canvas_proto.toBlob = function (callback, type /*, ...args*/) {
                if (!type) {
                    type = "image/png";
                } if (this.mozGetAsFile) {
                    callback(this.mozGetAsFile("canvas", type));
                    return;
                } if (this.msToBlob && /^\s*image\/png\s*(?:$|;)/i.test(type)) {
                    callback(this.msToBlob());
                    return;
                }

                var
                    args = Array.prototype.slice.call(arguments, 1)
                    , dataURI = this[to_data_url].apply(this, args)
                    , header_end = dataURI.indexOf(",")
                    , data = dataURI.substring(header_end + 1)
                    , is_base64 = is_base64_regex.test(dataURI.substring(0, header_end))
                    , blob
                    ;
                if (Blob.fake) {
                    // no reason to decode a data: URI that's just going to become a data URI again
                    blob = new Blob
                    if (is_base64) {
                        blob.encoding = "base64";
                    } else {
                        blob.encoding = "URI";
                    }
                    blob.data = data;
                    blob.size = data.length;
                } else if (Uint8Array) {
                    if (is_base64) {
                        blob = new Blob([decode_base64(data)], { type: type });
                    } else {
                        blob = new Blob([decodeURIComponent(data)], { type: type });
                    }
                }
                callback(blob);
            };

        if (!canvas_proto.toBlobHD && canvas_proto.toDataURLHD) {
            canvas_proto.toBlobHD = function () {
                to_data_url = "toDataURLHD";
                var blob = this.toBlob();
                to_data_url = "toDataURL";
                return blob;
            }
        } else {
            canvas_proto.toBlobHD = canvas_proto.toBlob;
        }
    }
}(typeof self !== "undefined" && self || typeof window !== "undefined" && window || this.content || this));

/* FileSaver.js
 * A saveAs() FileSaver implementation.
 * 1.3.4
 * 2018-01-12 13:14:0
 *
 * By Eli Grey, http://eligrey.com
 * License: MIT
 *   See https://github.com/eligrey/FileSaver.js/blob/master/LICENSE.md
 *
The MIT License

Copyright Â© 2016 Eli Grey.

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

/*global self */
/*jslint bitwise: true, indent: 4, laxbreak: true, laxcomma: true, smarttabs: true, plusplus: true */

/*! @source http://purl.eligrey.com/github/FileSaver.js/blob/master/FileSaver.js */

var saveAs = saveAs || (function (view) {
    "use strict";
    // IE <10 is explicitly unsupported
    if (typeof view === "undefined" || typeof navigator !== "undefined" && /MSIE [1-9]\./.test(navigator.userAgent)) {
        return;
    }
    var
        doc = view.document
        // only get URL when necessary in case Blob.js hasn't overridden it yet
        , get_URL = function () {
            return view.URL || view.webkitURL || view;
        }
        , save_link = doc.createElementNS("http://www.w3.org/1999/xhtml", "a")
        , can_use_save_link = "download" in save_link
        , click = function (node) {
            var event = new MouseEvent("click");
            node.dispatchEvent(event);
        }
        , is_safari = /constructor/i.test(view.HTMLElement) || view.safari
        , is_chrome_ios = /CriOS\/[\d]+/.test(navigator.userAgent)
        , throw_outside = function (ex) {
            (view.setImmediate || view.setTimeout)(function () {
                throw ex;
            }, 0);
        }
        , force_saveable_type = "application/octet-stream"
        // the Blob API is fundamentally broken as there is no "downloadfinished" event to subscribe to
        , arbitrary_revoke_timeout = 1000 * 40 // in ms
        , revoke = function (file) {
            var revoker = function () {
                if (typeof file === "string") { // file is an object URL
                    get_URL().revokeObjectURL(file);
                } else { // file is a File
                    file.remove();
                }
            };
            setTimeout(revoker, arbitrary_revoke_timeout);
        }
        , dispatch = function (filesaver, event_types, event) {
            event_types = [].concat(event_types);
            var i = event_types.length;
            while (i--) {
                var listener = filesaver["on" + event_types[i]];
                if (typeof listener === "function") {
                    try {
                        listener.call(filesaver, event || filesaver);
                    } catch (ex) {
                        throw_outside(ex);
                    }
                }
            }
        }
        , auto_bom = function (blob) {
            // prepend BOM for UTF-8 XML and text/* types (including HTML)
            // note: your browser will automatically convert UTF-16 U+FEFF to EF BB BF
            if (/^\s*(?:text\/\S*|application\/xml|\S*\/\S*\+xml)\s*;.*charset\s*=\s*utf-8/i.test(blob.type)) {
                return new Blob([String.fromCharCode(0xFEFF), blob], { type: blob.type });
            }
            return blob;
        }
        , FileSaver = function (blob, name, no_auto_bom) {
            if (!no_auto_bom) {
                blob = auto_bom(blob);
            }
            // First try a.download, then web filesystem, then object URLs
            var
                filesaver = this
                , type = blob.type
                , force = type === force_saveable_type
                , object_url
                , dispatch_all = function () {
                    dispatch(filesaver, "writestart progress write writeend".split(" "));
                }
                // on any filesys errors revert to saving with object URLs
                , fs_error = function () {
                    if ((is_chrome_ios || (force && is_safari)) && view.FileReader) {
                        // Safari doesn't allow downloading of blob urls
                        var reader = new FileReader();
                        reader.onloadend = function () {
                            var url = is_chrome_ios ? reader.result : reader.result.replace(/^data:[^;]*;/, 'data:attachment/file;');
                            var popup = view.open(url, '_blank');
                            if (!popup) view.location.href = url;
                            url = undefined; // release reference before dispatching
                            filesaver.readyState = filesaver.DONE;
                            dispatch_all();
                        };
                        reader.readAsDataURL(blob);
                        filesaver.readyState = filesaver.INIT;
                        return;
                    }
                    // don't create more object URLs than needed
                    if (!object_url) {
                        object_url = get_URL().createObjectURL(blob);
                    }
                    if (force) {
                        view.location.href = object_url;
                    } else {
                        var opened = view.open(object_url, "_blank");
                        if (!opened) {
                            // Apple does not allow window.open, see https://developer.apple.com/library/safari/documentation/Tools/Conceptual/SafariExtensionGuide/WorkingwithWindowsandTabs/WorkingwithWindowsandTabs.html
                            view.location.href = object_url;
                        }
                    }
                    filesaver.readyState = filesaver.DONE;
                    dispatch_all();
                    revoke(object_url);
                }
                ;
            filesaver.readyState = filesaver.INIT;

            if (can_use_save_link) {
                object_url = get_URL().createObjectURL(blob);
                setTimeout(function () {
                    save_link.href = object_url;
                    save_link.download = name;
                    click(save_link);
                    dispatch_all();
                    revoke(object_url);
                    filesaver.readyState = filesaver.DONE;
                });
                return;
            }

            fs_error();
        }
        , FS_proto = FileSaver.prototype
        , saveAs = function (blob, name, no_auto_bom) {
            return new FileSaver(blob, name || blob.name || "download", no_auto_bom);
        }
        ;
    // IE 10+ (native saveAs)
    if (typeof navigator !== "undefined" && navigator.msSaveOrOpenBlob) {
        return function (blob, name, no_auto_bom) {
            name = name || blob.name || "download";

            if (!no_auto_bom) {
                blob = auto_bom(blob);
            }
            return navigator.msSaveOrOpenBlob(blob, name);
        };
    }

    FS_proto.abort = function () { };
    FS_proto.readyState = FS_proto.INIT = 0;
    FS_proto.WRITING = 1;
    FS_proto.DONE = 2;

    FS_proto.error =
        FS_proto.onwritestart =
        FS_proto.onprogress =
        FS_proto.onwrite =
        FS_proto.onabort =
        FS_proto.onerror =
        FS_proto.onwriteend =
        null;

    return saveAs;
}(
    typeof self !== "undefined" && self
    || typeof window !== "undefined" && window
    || this
    ));

if (typeof module !== "undefined" && module.exports) {
    module.exports.saveAs = saveAs;
} else if ((typeof define !== "undefined" && define !== null) && (define.amd !== null)) {
    define("FileSaver.js", function () {
        return saveAs;
    });
}

jsFunctions.saveAs = saveAs;

/** End FileSaver */

/*!
    localForage -- Offline Storage, Improved
    Version 1.7.3
    https://localforage.github.io/localForage
    (c) 2013-2017 Mozilla, Apache License 2.0
*/
!function (a) { if ("object" == typeof exports && "undefined" != typeof module) module.exports = a(); else if ("function" == typeof define && define.amd) define([], a); else { var b; b = "undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : this, b.localforage = a() } }(function () { return function a(b, c, d) { function e(g, h) { if (!c[g]) { if (!b[g]) { var i = "function" == typeof require && require; if (!h && i) return i(g, !0); if (f) return f(g, !0); var j = new Error("Cannot find module '" + g + "'"); throw j.code = "MODULE_NOT_FOUND", j } var k = c[g] = { exports: {} }; b[g][0].call(k.exports, function (a) { var c = b[g][1][a]; return e(c || a) }, k, k.exports, a, b, c, d) } return c[g].exports } for (var f = "function" == typeof require && require, g = 0; g < d.length; g++)e(d[g]); return e }({ 1: [function (a, b, c) { (function (a) { "use strict"; function c() { k = !0; for (var a, b, c = l.length; c;) { for (b = l, l = [], a = -1; ++a < c;)b[a](); c = l.length } k = !1 } function d(a) { 1 !== l.push(a) || k || e() } var e, f = a.MutationObserver || a.WebKitMutationObserver; if (f) { var g = 0, h = new f(c), i = a.document.createTextNode(""); h.observe(i, { characterData: !0 }), e = function () { i.data = g = ++g % 2 } } else if (a.setImmediate || void 0 === a.MessageChannel) e = "document" in a && "onreadystatechange" in a.document.createElement("script") ? function () { var b = a.document.createElement("script"); b.onreadystatechange = function () { c(), b.onreadystatechange = null, b.parentNode.removeChild(b), b = null }, a.document.documentElement.appendChild(b) } : function () { setTimeout(c, 0) }; else { var j = new a.MessageChannel; j.port1.onmessage = c, e = function () { j.port2.postMessage(0) } } var k, l = []; b.exports = d }).call(this, "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {}) }, {}], 2: [function (a, b, c) { "use strict"; function d() { } function e(a) { if ("function" != typeof a) throw new TypeError("resolver must be a function"); this.state = s, this.queue = [], this.outcome = void 0, a !== d && i(this, a) } function f(a, b, c) { this.promise = a, "function" == typeof b && (this.onFulfilled = b, this.callFulfilled = this.otherCallFulfilled), "function" == typeof c && (this.onRejected = c, this.callRejected = this.otherCallRejected) } function g(a, b, c) { o(function () { var d; try { d = b(c) } catch (b) { return p.reject(a, b) } d === a ? p.reject(a, new TypeError("Cannot resolve promise with itself")) : p.resolve(a, d) }) } function h(a) { var b = a && a.then; if (a && ("object" == typeof a || "function" == typeof a) && "function" == typeof b) return function () { b.apply(a, arguments) } } function i(a, b) { function c(b) { f || (f = !0, p.reject(a, b)) } function d(b) { f || (f = !0, p.resolve(a, b)) } function e() { b(d, c) } var f = !1, g = j(e); "error" === g.status && c(g.value) } function j(a, b) { var c = {}; try { c.value = a(b), c.status = "success" } catch (a) { c.status = "error", c.value = a } return c } function k(a) { return a instanceof this ? a : p.resolve(new this(d), a) } function l(a) { var b = new this(d); return p.reject(b, a) } function m(a) { function b(a, b) { function d(a) { g[b] = a, ++h !== e || f || (f = !0, p.resolve(j, g)) } c.resolve(a).then(d, function (a) { f || (f = !0, p.reject(j, a)) }) } var c = this; if ("[object Array]" !== Object.prototype.toString.call(a)) return this.reject(new TypeError("must be an array")); var e = a.length, f = !1; if (!e) return this.resolve([]); for (var g = new Array(e), h = 0, i = -1, j = new this(d); ++i < e;)b(a[i], i); return j } function n(a) { function b(a) { c.resolve(a).then(function (a) { f || (f = !0, p.resolve(h, a)) }, function (a) { f || (f = !0, p.reject(h, a)) }) } var c = this; if ("[object Array]" !== Object.prototype.toString.call(a)) return this.reject(new TypeError("must be an array")); var e = a.length, f = !1; if (!e) return this.resolve([]); for (var g = -1, h = new this(d); ++g < e;)b(a[g]); return h } var o = a(1), p = {}, q = ["REJECTED"], r = ["FULFILLED"], s = ["PENDING"]; b.exports = e, e.prototype.catch = function (a) { return this.then(null, a) }, e.prototype.then = function (a, b) { if ("function" != typeof a && this.state === r || "function" != typeof b && this.state === q) return this; var c = new this.constructor(d); if (this.state !== s) { g(c, this.state === r ? a : b, this.outcome) } else this.queue.push(new f(c, a, b)); return c }, f.prototype.callFulfilled = function (a) { p.resolve(this.promise, a) }, f.prototype.otherCallFulfilled = function (a) { g(this.promise, this.onFulfilled, a) }, f.prototype.callRejected = function (a) { p.reject(this.promise, a) }, f.prototype.otherCallRejected = function (a) { g(this.promise, this.onRejected, a) }, p.resolve = function (a, b) { var c = j(h, b); if ("error" === c.status) return p.reject(a, c.value); var d = c.value; if (d) i(a, d); else { a.state = r, a.outcome = b; for (var e = -1, f = a.queue.length; ++e < f;)a.queue[e].callFulfilled(b) } return a }, p.reject = function (a, b) { a.state = q, a.outcome = b; for (var c = -1, d = a.queue.length; ++c < d;)a.queue[c].callRejected(b); return a }, e.resolve = k, e.reject = l, e.all = m, e.race = n }, { 1: 1 }], 3: [function (a, b, c) { (function (b) { "use strict"; "function" != typeof b.Promise && (b.Promise = a(2)) }).call(this, "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {}) }, { 2: 2 }], 4: [function (a, b, c) { "use strict"; function d(a, b) { if (!(a instanceof b)) throw new TypeError("Cannot call a class as a function") } function e() { try { if ("undefined" != typeof indexedDB) return indexedDB; if ("undefined" != typeof webkitIndexedDB) return webkitIndexedDB; if ("undefined" != typeof mozIndexedDB) return mozIndexedDB; if ("undefined" != typeof OIndexedDB) return OIndexedDB; if ("undefined" != typeof msIndexedDB) return msIndexedDB } catch (a) { return } } function f() { try { if (!ta) return !1; var a = "undefined" != typeof openDatabase && /(Safari|iPhone|iPad|iPod)/.test(navigator.userAgent) && !/Chrome/.test(navigator.userAgent) && !/BlackBerry/.test(navigator.platform), b = "function" == typeof fetch && -1 !== fetch.toString().indexOf("[native code"); return (!a || b) && "undefined" != typeof indexedDB && "undefined" != typeof IDBKeyRange } catch (a) { return !1 } } function g(a, b) { a = a || [], b = b || {}; try { return new Blob(a, b) } catch (f) { if ("TypeError" !== f.name) throw f; for (var c = "undefined" != typeof BlobBuilder ? BlobBuilder : "undefined" != typeof MSBlobBuilder ? MSBlobBuilder : "undefined" != typeof MozBlobBuilder ? MozBlobBuilder : WebKitBlobBuilder, d = new c, e = 0; e < a.length; e += 1)d.append(a[e]); return d.getBlob(b.type) } } function h(a, b) { b && a.then(function (a) { b(null, a) }, function (a) { b(a) }) } function i(a, b, c) { "function" == typeof b && a.then(b), "function" == typeof c && a.catch(c) } function j(a) { return "string" != typeof a && (console.warn(a + " used as a key, but it is not a string."), a = String(a)), a } function k() { if (arguments.length && "function" == typeof arguments[arguments.length - 1]) return arguments[arguments.length - 1] } function l(a) { for (var b = a.length, c = new ArrayBuffer(b), d = new Uint8Array(c), e = 0; e < b; e++)d[e] = a.charCodeAt(e); return c } function m(a) { return new wa(function (b) { var c = a.transaction(xa, Aa), d = g([""]); c.objectStore(xa).put(d, "key"), c.onabort = function (a) { a.preventDefault(), a.stopPropagation(), b(!1) }, c.oncomplete = function () { var a = navigator.userAgent.match(/Chrome\/(\d+)/), c = navigator.userAgent.match(/Edge\//); b(c || !a || parseInt(a[1], 10) >= 43) } }).catch(function () { return !1 }) } function n(a) { return "boolean" == typeof ua ? wa.resolve(ua) : m(a).then(function (a) { return ua = a }) } function o(a) { var b = va[a.name], c = {}; c.promise = new wa(function (a, b) { c.resolve = a, c.reject = b }), b.deferredOperations.push(c), b.dbReady ? b.dbReady = b.dbReady.then(function () { return c.promise }) : b.dbReady = c.promise } function p(a) { var b = va[a.name], c = b.deferredOperations.pop(); if (c) return c.resolve(), c.promise } function q(a, b) { var c = va[a.name], d = c.deferredOperations.pop(); if (d) return d.reject(b), d.promise } function r(a, b) { return new wa(function (c, d) { if (a.db) { if (!b) return c(a.db); o(a), a.db.close() } var e = [a.name]; b && e.push(a.version); var f = ta.open.apply(ta, e); b && (f.onupgradeneeded = function (b) { var c = f.result; try { c.createObjectStore(a.storeName), b.oldVersion <= 1 && c.createObjectStore(xa) } catch (c) { if ("ConstraintError" !== c.name) throw c; console.warn('The database "' + a.name + '" has been upgraded from version ' + b.oldVersion + " to version " + b.newVersion + ', but the storage "' + a.storeName + '" already exists.') } }), f.onerror = function (a) { a.preventDefault(), d(f.error) }, f.onsuccess = function () { c(f.result), p(a) } }) } function s(a) { return r(a, !1) } function t(a) { return r(a, !0) } function u(a, b) { if (!a.db) return !0; var c = !a.db.objectStoreNames.contains(a.storeName), d = a.version < a.db.version, e = a.version > a.db.version; if (d && (a.version !== b && console.warn('The database "' + a.name + "\" can't be downgraded from version " + a.db.version + " to version " + a.version + "."), a.version = a.db.version), e || c) { if (c) { var f = a.db.version + 1; f > a.version && (a.version = f) } return !0 } return !1 } function v(a) { return new wa(function (b, c) { var d = new FileReader; d.onerror = c, d.onloadend = function (c) { var d = btoa(c.target.result || ""); b({ __local_forage_encoded_blob: !0, data: d, type: a.type }) }, d.readAsBinaryString(a) }) } function w(a) { return g([l(atob(a.data))], { type: a.type }) } function x(a) { return a && a.__local_forage_encoded_blob } function y(a) { var b = this, c = b._initReady().then(function () { var a = va[b._dbInfo.name]; if (a && a.dbReady) return a.dbReady }); return i(c, a, a), c } function z(a) { o(a); for (var b = va[a.name], c = b.forages, d = 0; d < c.length; d++) { var e = c[d]; e._dbInfo.db && (e._dbInfo.db.close(), e._dbInfo.db = null) } return s(a).then(function (b) { for (var d = 0; d < c.length; d++)c[d]._dbInfo.db = b; a.db = b }).then(function () { if (u(a)) return t(a) }).catch(function (b) { throw q(a, b), b }) } function A(a, b, c, d) { void 0 === d && (d = 1); try { var e = a.db.transaction(a.storeName, b); c(null, e) } catch (e) { if (d > 0 && (!a.db || "InvalidStateError" === e.name || "NotFoundError" === e.name)) return wa.resolve().then(function () { if (!a.db || "NotFoundError" === e.name && !a.db.objectStoreNames.contains(a.storeName) && a.version <= a.db.version) return a.db && (a.version = a.db.version + 1), t(a) }).then(function () { return z(a).then(function () { A(a, b, c, d - 1) }) }).catch(c); c(e) } } function B(a) { function b() { return wa.resolve() } var c = this, d = { db: null }; if (a) for (var e in a) d[e] = a[e]; va || (va = {}); var f = va[d.name]; f || (f = { forages: [], db: null, dbReady: null, deferredOperations: [] }, va[d.name] = f), f.forages.push(c), c._initReady || (c._initReady = c.ready, c.ready = y); for (var g = [], h = 0; h < f.forages.length; h++) { var i = f.forages[h]; i !== c && g.push(i._initReady().catch(b)) } var j = f.forages.slice(0); return wa.all(g).then(function () { return d.db = f.db, s(d) }).then(function (a) { return d.db = a, u(d, c._defaultConfig.version) ? t(d) : a }).then(function (a) { d.db = f.db = a, c._dbInfo = d; for (var b = 0; b < j.length; b++) { var e = j[b]; e !== c && (e._dbInfo.db = d.db, e._dbInfo.version = d.version) } }) } function C(a, b) { var c = this; a = j(a); var d = new wa(function (b, d) { c.ready().then(function () { A(c._dbInfo, za, function (e, f) { if (e) return d(e); try { var g = f.objectStore(c._dbInfo.storeName), h = g.get(a); h.onsuccess = function () { var a = h.result; void 0 === a && (a = null), x(a) && (a = w(a)), b(a) }, h.onerror = function () { d(h.error) } } catch (a) { d(a) } }) }).catch(d) }); return h(d, b), d } function D(a, b) { var c = this, d = new wa(function (b, d) { c.ready().then(function () { A(c._dbInfo, za, function (e, f) { if (e) return d(e); try { var g = f.objectStore(c._dbInfo.storeName), h = g.openCursor(), i = 1; h.onsuccess = function () { var c = h.result; if (c) { var d = c.value; x(d) && (d = w(d)); var e = a(d, c.key, i++); void 0 !== e ? b(e) : c.continue() } else b() }, h.onerror = function () { d(h.error) } } catch (a) { d(a) } }) }).catch(d) }); return h(d, b), d } function E(a, b, c) { var d = this; a = j(a); var e = new wa(function (c, e) { var f; d.ready().then(function () { return f = d._dbInfo, "[object Blob]" === ya.call(b) ? n(f.db).then(function (a) { return a ? b : v(b) }) : b }).then(function (b) { A(d._dbInfo, Aa, function (f, g) { if (f) return e(f); try { var h = g.objectStore(d._dbInfo.storeName); null === b && (b = void 0); var i = h.put(b, a); g.oncomplete = function () { void 0 === b && (b = null), c(b) }, g.onabort = g.onerror = function () { var a = i.error ? i.error : i.transaction.error; e(a) } } catch (a) { e(a) } }) }).catch(e) }); return h(e, c), e } function F(a, b) { var c = this; a = j(a); var d = new wa(function (b, d) { c.ready().then(function () { A(c._dbInfo, Aa, function (e, f) { if (e) return d(e); try { var g = f.objectStore(c._dbInfo.storeName), h = g.delete(a); f.oncomplete = function () { b() }, f.onerror = function () { d(h.error) }, f.onabort = function () { var a = h.error ? h.error : h.transaction.error; d(a) } } catch (a) { d(a) } }) }).catch(d) }); return h(d, b), d } function G(a) { var b = this, c = new wa(function (a, c) { b.ready().then(function () { A(b._dbInfo, Aa, function (d, e) { if (d) return c(d); try { var f = e.objectStore(b._dbInfo.storeName), g = f.clear(); e.oncomplete = function () { a() }, e.onabort = e.onerror = function () { var a = g.error ? g.error : g.transaction.error; c(a) } } catch (a) { c(a) } }) }).catch(c) }); return h(c, a), c } function H(a) { var b = this, c = new wa(function (a, c) { b.ready().then(function () { A(b._dbInfo, za, function (d, e) { if (d) return c(d); try { var f = e.objectStore(b._dbInfo.storeName), g = f.count(); g.onsuccess = function () { a(g.result) }, g.onerror = function () { c(g.error) } } catch (a) { c(a) } }) }).catch(c) }); return h(c, a), c } function I(a, b) { var c = this, d = new wa(function (b, d) { if (a < 0) return void b(null); c.ready().then(function () { A(c._dbInfo, za, function (e, f) { if (e) return d(e); try { var g = f.objectStore(c._dbInfo.storeName), h = !1, i = g.openCursor(); i.onsuccess = function () { var c = i.result; if (!c) return void b(null); 0 === a ? b(c.key) : h ? b(c.key) : (h = !0, c.advance(a)) }, i.onerror = function () { d(i.error) } } catch (a) { d(a) } }) }).catch(d) }); return h(d, b), d } function J(a) { var b = this, c = new wa(function (a, c) { b.ready().then(function () { A(b._dbInfo, za, function (d, e) { if (d) return c(d); try { var f = e.objectStore(b._dbInfo.storeName), g = f.openCursor(), h = []; g.onsuccess = function () { var b = g.result; if (!b) return void a(h); h.push(b.key), b.continue() }, g.onerror = function () { c(g.error) } } catch (a) { c(a) } }) }).catch(c) }); return h(c, a), c } function K(a, b) { b = k.apply(this, arguments); var c = this.config(); a = "function" != typeof a && a || {}, a.name || (a.name = a.name || c.name, a.storeName = a.storeName || c.storeName); var d, e = this; if (a.name) { var f = a.name === c.name && e._dbInfo.db ? wa.resolve(e._dbInfo.db) : s(a); d = a.storeName ? f.then(function (b) { if (b.objectStoreNames.contains(a.storeName)) { var c = b.version + 1; o(a); for (var d = va[a.name], e = d.forages, f = 0; f < e.length; f++) { var g = e[f]; g._dbInfo.db && (g._dbInfo.db.close(), g._dbInfo.db = null, g._dbInfo.version = c) } return new wa(function (b, d) { var e = ta.open(a.name, c); e.onerror = d, e.onupgradeneeded = function () { e.result.deleteObjectStore(a.storeName) }, e.onsuccess = function () { var a = e.result; b(a) } }).then(function (a) { for (var b = 0; b < e.length; b++) { var c = e[b]; c._dbInfo.db = a, p(c._dbInfo) } }).catch(function (b) { throw (q(a, b) || wa.resolve()).catch(function () { }), b }) } }) : f.then(function () { o(a); for (var b = va[a.name], c = b.forages, d = 0; d < c.length; d++) { var e = c[d]; e._dbInfo.db && (e._dbInfo.db.close(), e._dbInfo.db = null) } return new wa(function (b, c) { var d = ta.deleteDatabase(a.name); d.onerror = d.onblocked = c, d.onsuccess = b }).then(function () { for (var a = 0; a < c.length; a++)p(e._dbInfo) }).catch(function (b) { throw (q(a, b) || wa.resolve()).catch(function () { }), b }) }) } else d = wa.reject("Invalid arguments"); return h(d, b), d } function L() { return "function" == typeof openDatabase } function M(a) { var b, c, d, e, f, g = .75 * a.length, h = a.length, i = 0; "=" === a[a.length - 1] && (g-- , "=" === a[a.length - 2] && g--); var j = new ArrayBuffer(g), k = new Uint8Array(j); for (b = 0; b < h; b += 4)c = Ca.indexOf(a[b]), d = Ca.indexOf(a[b + 1]), e = Ca.indexOf(a[b + 2]), f = Ca.indexOf(a[b + 3]), k[i++] = c << 2 | d >> 4, k[i++] = (15 & d) << 4 | e >> 2, k[i++] = (3 & e) << 6 | 63 & f; return j } function N(a) { var b, c = new Uint8Array(a), d = ""; for (b = 0; b < c.length; b += 3)d += Ca[c[b] >> 2], d += Ca[(3 & c[b]) << 4 | c[b + 1] >> 4], d += Ca[(15 & c[b + 1]) << 2 | c[b + 2] >> 6], d += Ca[63 & c[b + 2]]; return c.length % 3 == 2 ? d = d.substring(0, d.length - 1) + "=" : c.length % 3 == 1 && (d = d.substring(0, d.length - 2) + "=="), d } function O(a, b) { var c = ""; if (a && (c = Ta.call(a)), a && ("[object ArrayBuffer]" === c || a.buffer && "[object ArrayBuffer]" === Ta.call(a.buffer))) { var d, e = Fa; a instanceof ArrayBuffer ? (d = a, e += Ha) : (d = a.buffer, "[object Int8Array]" === c ? e += Ja : "[object Uint8Array]" === c ? e += Ka : "[object Uint8ClampedArray]" === c ? e += La : "[object Int16Array]" === c ? e += Ma : "[object Uint16Array]" === c ? e += Oa : "[object Int32Array]" === c ? e += Na : "[object Uint32Array]" === c ? e += Pa : "[object Float32Array]" === c ? e += Qa : "[object Float64Array]" === c ? e += Ra : b(new Error("Failed to get type for BinaryArray"))), b(e + N(d)) } else if ("[object Blob]" === c) { var f = new FileReader; f.onload = function () { var c = Da + a.type + "~" + N(this.result); b(Fa + Ia + c) }, f.readAsArrayBuffer(a) } else try { b(JSON.stringify(a)) } catch (c) { console.error("Couldn't convert value into a JSON string: ", a), b(null, c) } } function P(a) { if (a.substring(0, Ga) !== Fa) return JSON.parse(a); var b, c = a.substring(Sa), d = a.substring(Ga, Sa); if (d === Ia && Ea.test(c)) { var e = c.match(Ea); b = e[1], c = c.substring(e[0].length) } var f = M(c); switch (d) { case Ha: return f; case Ia: return g([f], { type: b }); case Ja: return new Int8Array(f); case Ka: return new Uint8Array(f); case La: return new Uint8ClampedArray(f); case Ma: return new Int16Array(f); case Oa: return new Uint16Array(f); case Na: return new Int32Array(f); case Pa: return new Uint32Array(f); case Qa: return new Float32Array(f); case Ra: return new Float64Array(f); default: throw new Error("Unkown type: " + d) } } function Q(a, b, c, d) { a.executeSql("CREATE TABLE IF NOT EXISTS " + b.storeName + " (id INTEGER PRIMARY KEY, key unique, value)", [], c, d) } function R(a) { var b = this, c = { db: null }; if (a) for (var d in a) c[d] = "string" != typeof a[d] ? a[d].toString() : a[d]; var e = new wa(function (a, d) { try { c.db = openDatabase(c.name, String(c.version), c.description, c.size) } catch (a) { return d(a) } c.db.transaction(function (e) { Q(e, c, function () { b._dbInfo = c, a() }, function (a, b) { d(b) }) }, d) }); return c.serializer = Ua, e } function S(a, b, c, d, e, f) { a.executeSql(c, d, e, function (a, g) { g.code === g.SYNTAX_ERR ? a.executeSql("SELECT name FROM sqlite_master WHERE type='table' AND name = ?", [name], function (a, h) { h.rows.length ? f(a, g) : Q(a, b, function () { a.executeSql(c, d, e, f) }, f) }, f) : f(a, g) }, f) } function T(a, b) { var c = this; a = j(a); var d = new wa(function (b, d) { c.ready().then(function () { var e = c._dbInfo; e.db.transaction(function (c) { S(c, e, "SELECT * FROM " + e.storeName + " WHERE key = ? LIMIT 1", [a], function (a, c) { var d = c.rows.length ? c.rows.item(0).value : null; d && (d = e.serializer.deserialize(d)), b(d) }, function (a, b) { d(b) }) }) }).catch(d) }); return h(d, b), d } function U(a, b) { var c = this, d = new wa(function (b, d) { c.ready().then(function () { var e = c._dbInfo; e.db.transaction(function (c) { S(c, e, "SELECT * FROM " + e.storeName, [], function (c, d) { for (var f = d.rows, g = f.length, h = 0; h < g; h++) { var i = f.item(h), j = i.value; if (j && (j = e.serializer.deserialize(j)), void 0 !== (j = a(j, i.key, h + 1))) return void b(j) } b() }, function (a, b) { d(b) }) }) }).catch(d) }); return h(d, b), d } function V(a, b, c, d) { var e = this; a = j(a); var f = new wa(function (f, g) { e.ready().then(function () { void 0 === b && (b = null); var h = b, i = e._dbInfo; i.serializer.serialize(b, function (b, j) { j ? g(j) : i.db.transaction(function (c) { S(c, i, "INSERT OR REPLACE INTO " + i.storeName + " (key, value) VALUES (?, ?)", [a, b], function () { f(h) }, function (a, b) { g(b) }) }, function (b) { if (b.code === b.QUOTA_ERR) { if (d > 0) return void f(V.apply(e, [a, h, c, d - 1])); g(b) } }) }) }).catch(g) }); return h(f, c), f } function W(a, b, c) { return V.apply(this, [a, b, c, 1]) } function X(a, b) { var c = this; a = j(a); var d = new wa(function (b, d) { c.ready().then(function () { var e = c._dbInfo; e.db.transaction(function (c) { S(c, e, "DELETE FROM " + e.storeName + " WHERE key = ?", [a], function () { b() }, function (a, b) { d(b) }) }) }).catch(d) }); return h(d, b), d } function Y(a) { var b = this, c = new wa(function (a, c) { b.ready().then(function () { var d = b._dbInfo; d.db.transaction(function (b) { S(b, d, "DELETE FROM " + d.storeName, [], function () { a() }, function (a, b) { c(b) }) }) }).catch(c) }); return h(c, a), c } function Z(a) { var b = this, c = new wa(function (a, c) { b.ready().then(function () { var d = b._dbInfo; d.db.transaction(function (b) { S(b, d, "SELECT COUNT(key) as c FROM " + d.storeName, [], function (b, c) { var d = c.rows.item(0).c; a(d) }, function (a, b) { c(b) }) }) }).catch(c) }); return h(c, a), c } function $(a, b) { var c = this, d = new wa(function (b, d) { c.ready().then(function () { var e = c._dbInfo; e.db.transaction(function (c) { S(c, e, "SELECT key FROM " + e.storeName + " WHERE id = ? LIMIT 1", [a + 1], function (a, c) { var d = c.rows.length ? c.rows.item(0).key : null; b(d) }, function (a, b) { d(b) }) }) }).catch(d) }); return h(d, b), d } function _(a) { var b = this, c = new wa(function (a, c) { b.ready().then(function () { var d = b._dbInfo; d.db.transaction(function (b) { S(b, d, "SELECT key FROM " + d.storeName, [], function (b, c) { for (var d = [], e = 0; e < c.rows.length; e++)d.push(c.rows.item(e).key); a(d) }, function (a, b) { c(b) }) }) }).catch(c) }); return h(c, a), c } function aa(a) { return new wa(function (b, c) { a.transaction(function (d) { d.executeSql("SELECT name FROM sqlite_master WHERE type='table' AND name <> '__WebKitDatabaseInfoTable__'", [], function (c, d) { for (var e = [], f = 0; f < d.rows.length; f++)e.push(d.rows.item(f).name); b({ db: a, storeNames: e }) }, function (a, b) { c(b) }) }, function (a) { c(a) }) }) } function ba(a, b) { b = k.apply(this, arguments); var c = this.config(); a = "function" != typeof a && a || {}, a.name || (a.name = a.name || c.name, a.storeName = a.storeName || c.storeName); var d, e = this; return d = a.name ? new wa(function (b) { var d; d = a.name === c.name ? e._dbInfo.db : openDatabase(a.name, "", "", 0), b(a.storeName ? { db: d, storeNames: [a.storeName] } : aa(d)) }).then(function (a) { return new wa(function (b, c) { a.db.transaction(function (d) { function e(a) { return new wa(function (b, c) { d.executeSql("DROP TABLE IF EXISTS " + a, [], function () { b() }, function (a, b) { c(b) }) }) } for (var f = [], g = 0, h = a.storeNames.length; g < h; g++)f.push(e(a.storeNames[g])); wa.all(f).then(function () { b() }).catch(function (a) { c(a) }) }, function (a) { c(a) }) }) }) : wa.reject("Invalid arguments"), h(d, b), d } function ca() { try { return "undefined" != typeof localStorage && "setItem" in localStorage && "function" == typeof localStorage.setItem } catch (a) { return !1 } } function da(a, b) { var c = a.name + "/"; return a.storeName !== b.storeName && (c += a.storeName + "/"), c } function ea() { var a = "_localforage_support_test"; try { return localStorage.setItem(a, !0), localStorage.removeItem(a), !1 } catch (a) { return !0 } } function fa() { return !ea() || localStorage.length > 0 } function ga(a) { var b = this, c = {}; if (a) for (var d in a) c[d] = a[d]; return c.keyPrefix = da(a, b._defaultConfig), fa() ? (b._dbInfo = c, c.serializer = Ua, wa.resolve()) : wa.reject() } function ha(a) { var b = this, c = b.ready().then(function () { for (var a = b._dbInfo.keyPrefix, c = localStorage.length - 1; c >= 0; c--) { var d = localStorage.key(c); 0 === d.indexOf(a) && localStorage.removeItem(d) } }); return h(c, a), c } function ia(a, b) { var c = this; a = j(a); var d = c.ready().then(function () { var b = c._dbInfo, d = localStorage.getItem(b.keyPrefix + a); return d && (d = b.serializer.deserialize(d)), d }); return h(d, b), d } function ja(a, b) { var c = this, d = c.ready().then(function () { for (var b = c._dbInfo, d = b.keyPrefix, e = d.length, f = localStorage.length, g = 1, h = 0; h < f; h++) { var i = localStorage.key(h); if (0 === i.indexOf(d)) { var j = localStorage.getItem(i); if (j && (j = b.serializer.deserialize(j)), void 0 !== (j = a(j, i.substring(e), g++))) return j } } }); return h(d, b), d } function ka(a, b) { var c = this, d = c.ready().then(function () { var b, d = c._dbInfo; try { b = localStorage.key(a) } catch (a) { b = null } return b && (b = b.substring(d.keyPrefix.length)), b }); return h(d, b), d } function la(a) { var b = this, c = b.ready().then(function () { for (var a = b._dbInfo, c = localStorage.length, d = [], e = 0; e < c; e++) { var f = localStorage.key(e); 0 === f.indexOf(a.keyPrefix) && d.push(f.substring(a.keyPrefix.length)) } return d }); return h(c, a), c } function ma(a) { var b = this, c = b.keys().then(function (a) { return a.length }); return h(c, a), c } function na(a, b) { var c = this; a = j(a); var d = c.ready().then(function () { var b = c._dbInfo; localStorage.removeItem(b.keyPrefix + a) }); return h(d, b), d } function oa(a, b, c) { var d = this; a = j(a); var e = d.ready().then(function () { void 0 === b && (b = null); var c = b; return new wa(function (e, f) { var g = d._dbInfo; g.serializer.serialize(b, function (b, d) { if (d) f(d); else try { localStorage.setItem(g.keyPrefix + a, b), e(c) } catch (a) { "QuotaExceededError" !== a.name && "NS_ERROR_DOM_QUOTA_REACHED" !== a.name || f(a), f(a) } }) }) }); return h(e, c), e } function pa(a, b) { if (b = k.apply(this, arguments), a = "function" != typeof a && a || {}, !a.name) { var c = this.config(); a.name = a.name || c.name, a.storeName = a.storeName || c.storeName } var d, e = this; return d = a.name ? new wa(function (b) { b(a.storeName ? da(a, e._defaultConfig) : a.name + "/") }).then(function (a) { for (var b = localStorage.length - 1; b >= 0; b--) { var c = localStorage.key(b); 0 === c.indexOf(a) && localStorage.removeItem(c) } }) : wa.reject("Invalid arguments"), h(d, b), d } function qa(a, b) { a[b] = function () { var c = arguments; return a.ready().then(function () { return a[b].apply(a, c) }) } } function ra() { for (var a = 1; a < arguments.length; a++) { var b = arguments[a]; if (b) for (var c in b) b.hasOwnProperty(c) && (Xa(b[c]) ? arguments[0][c] = b[c].slice() : arguments[0][c] = b[c]) } return arguments[0] } var sa = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (a) { return typeof a } : function (a) { return a && "function" == typeof Symbol && a.constructor === Symbol && a !== Symbol.prototype ? "symbol" : typeof a }, ta = e(); "undefined" == typeof Promise && a(3); var ua, va, wa = Promise, xa = "local-forage-detect-blob-support", ya = Object.prototype.toString, za = "readonly", Aa = "readwrite", Ba = { _driver: "asyncStorage", _initStorage: B, _support: f(), iterate: D, getItem: C, setItem: E, removeItem: F, clear: G, length: H, key: I, keys: J, dropInstance: K }, Ca = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", Da = "~~local_forage_type~", Ea = /^~~local_forage_type~([^~]+)~/, Fa = "__lfsc__:", Ga = Fa.length, Ha = "arbf", Ia = "blob", Ja = "si08", Ka = "ui08", La = "uic8", Ma = "si16", Na = "si32", Oa = "ur16", Pa = "ui32", Qa = "fl32", Ra = "fl64", Sa = Ga + Ha.length, Ta = Object.prototype.toString, Ua = { serialize: O, deserialize: P, stringToBuffer: M, bufferToString: N }, Va = { _driver: "webSQLStorage", _initStorage: R, _support: L(), iterate: U, getItem: T, setItem: W, removeItem: X, clear: Y, length: Z, key: $, keys: _, dropInstance: ba }, Wa = { _driver: "localStorageWrapper", _initStorage: ga, _support: ca(), iterate: ja, getItem: ia, setItem: oa, removeItem: na, clear: ha, length: ma, key: ka, keys: la, dropInstance: pa }, Xa = Array.isArray || function (a) { return "[object Array]" === Object.prototype.toString.call(a) }, Ya = {}, Za = {}, $a = { INDEXEDDB: Ba, WEBSQL: Va, LOCALSTORAGE: Wa }, _a = [$a.INDEXEDDB._driver, $a.WEBSQL._driver, $a.LOCALSTORAGE._driver], ab = ["dropInstance"], bb = ["clear", "getItem", "iterate", "key", "keys", "length", "removeItem", "setItem"].concat(ab), cb = { description: "", driver: _a.slice(), name: "localforage", size: 4980736, storeName: "keyvaluepairs", version: 1 }, db = function () { function a(b) { d(this, a); for (var c in $a) if ($a.hasOwnProperty(c)) { var e = $a[c], f = e._driver; this[c] = f, Ya[f] || this.defineDriver(e) } this._defaultConfig = ra({}, cb), this._config = ra({}, this._defaultConfig, b), this._driverSet = null, this._initDriver = null, this._ready = !1, this._dbInfo = null, this._wrapLibraryMethodsWithReady(), this.setDriver(this._config.driver).catch(function () { }) } return a.prototype.config = function (a) { if ("object" === (void 0 === a ? "undefined" : sa(a))) { if (this._ready) return new Error("Can't call config() after localforage has been used."); for (var b in a) { if ("storeName" === b && (a[b] = a[b].replace(/\W/g, "_")), "version" === b && "number" != typeof a[b]) return new Error("Database version must be a number."); this._config[b] = a[b] } return !("driver" in a && a.driver) || this.setDriver(this._config.driver) } return "string" == typeof a ? this._config[a] : this._config }, a.prototype.defineDriver = function (a, b, c) { var d = new wa(function (b, c) { try { var d = a._driver, e = new Error("Custom driver not compliant; see https://mozilla.github.io/localForage/#definedriver"); if (!a._driver) return void c(e); for (var f = bb.concat("_initStorage"), g = 0, i = f.length; g < i; g++) { var j = f[g]; if ((ab.indexOf(j) < 0 || a[j]) && "function" != typeof a[j]) return void c(e) } (function () { for (var b = function (a) { return function () { var b = new Error("Method " + a + " is not implemented by the current driver"), c = wa.reject(b); return h(c, arguments[arguments.length - 1]), c } }, c = 0, d = ab.length; c < d; c++) { var e = ab[c]; a[e] || (a[e] = b(e)) } })(); var k = function (c) { Ya[d] && console.info("Redefining LocalForage driver: " + d), Ya[d] = a, Za[d] = c, b() }; "_support" in a ? a._support && "function" == typeof a._support ? a._support().then(k, c) : k(!!a._support) : k(!0) } catch (a) { c(a) } }); return i(d, b, c), d }, a.prototype.driver = function () { return this._driver || null }, a.prototype.getDriver = function (a, b, c) { var d = Ya[a] ? wa.resolve(Ya[a]) : wa.reject(new Error("Driver not found.")); return i(d, b, c), d }, a.prototype.getSerializer = function (a) { var b = wa.resolve(Ua); return i(b, a), b }, a.prototype.ready = function (a) { var b = this, c = b._driverSet.then(function () { return null === b._ready && (b._ready = b._initDriver()), b._ready }); return i(c, a, a), c }, a.prototype.setDriver = function (a, b, c) { function d() { g._config.driver = g.driver() } function e(a) { return g._extend(a), d(), g._ready = g._initStorage(g._config), g._ready } function f(a) { return function () { function b() { for (; c < a.length;) { var f = a[c]; return c++ , g._dbInfo = null, g._ready = null, g.getDriver(f).then(e).catch(b) } d(); var h = new Error("No available storage method found."); return g._driverSet = wa.reject(h), g._driverSet } var c = 0; return b() } } var g = this; Xa(a) || (a = [a]); var h = this._getSupportedDrivers(a), j = null !== this._driverSet ? this._driverSet.catch(function () { return wa.resolve() }) : wa.resolve(); return this._driverSet = j.then(function () { var a = h[0]; return g._dbInfo = null, g._ready = null, g.getDriver(a).then(function (a) { g._driver = a._driver, d(), g._wrapLibraryMethodsWithReady(), g._initDriver = f(h) }) }).catch(function () { d(); var a = new Error("No available storage method found."); return g._driverSet = wa.reject(a), g._driverSet }), i(this._driverSet, b, c), this._driverSet }, a.prototype.supports = function (a) { return !!Za[a] }, a.prototype._extend = function (a) { ra(this, a) }, a.prototype._getSupportedDrivers = function (a) { for (var b = [], c = 0, d = a.length; c < d; c++) { var e = a[c]; this.supports(e) && b.push(e) } return b }, a.prototype._wrapLibraryMethodsWithReady = function () { for (var a = 0, b = bb.length; a < b; a++)qa(this, bb[a]) }, a.prototype.createInstance = function (b) { return new a(b) }, a }(), eb = new db; b.exports = eb }, { 3: 3 }] }, {}, [4])(4) });

localforage.config({
    name: "Floating Space Cities"
});

/** End localForage */

/** Haxe library licenses: */
/*

thx.core:

The MIT License (MIT)

Copyright (c) 2014 Franco Ponticelli

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

thx.color:
The MIT License (MIT)

Copyright (c) 2014 Franco Ponticelli

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

polygonal-ds:
DATA STRUCTURES FOR GAMES (DS)
https://github.com/polygonal/ds

Copyright (c) 2008-2016 Michael Baczynski, http://www.polygonal.de

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and
associated documentation files (the "Software"), to deal in the Software without restriction,
including without limitation the rights to use, copy, modify, merge, publish, distribute,
sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or
substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT
NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT
OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

polygonal-printf:

                           _/                                                    _/
      _/_/_/      _/_/    _/  _/    _/    _/_/_/    _/_/    _/_/_/      _/_/_/  _/
     _/    _/  _/    _/  _/  _/    _/  _/    _/  _/    _/  _/    _/  _/    _/  _/
    _/    _/  _/    _/  _/  _/    _/  _/    _/  _/    _/  _/    _/  _/    _/  _/
   _/_/_/      _/_/    _/    _/_/_/    _/_/_/    _/_/    _/    _/    _/_/_/  _/
  _/                            _/        _/
 _/                        _/_/      _/_/

POLYGONAL - A HAXE LIBRARY FOR GAME DEVELOPERS
Copyright (c) 2013 Michael Baczynski @polygonal, Zachary Dremann @Dr_Eman

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
"Software"), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:
The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

pixijs:

The MIT License (MIT)

Copyright (c) 2015 Adi Reddy Mora

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.


*/

//IsMobile.js
//CC0
!function(e){var n=/iPhone/i,t=/iPod/i,r=/iPad/i,a=/\bAndroid(?:.+)Mobile\b/i,p=/Android/i,b=/\bAndroid(?:.+)SD4930UR\b/i,l=/\bAndroid(?:.+)(?:KF[A-Z]{2,4})\b/i,f=/Windows Phone/i,s=/\bWindows(?:.+)ARM\b/i,u=/BlackBerry/i,c=/BB10/i,h=/Opera Mini/i,v=/\b(CriOS|Chrome)(?:.+)Mobile/i,w=/Mobile(?:.+)Firefox\b/i;function m(e,i){return e.test(i)}function i(e){var i=e||("undefined"!=typeof navigator?navigator.userAgent:""),o=i.split("[FBAN");void 0!==o[1]&&(i=o[0]),void 0!==(o=i.split("Twitter"))[1]&&(i=o[0]);var d={apple:{phone:m(n,i)&&!m(f,i),ipod:m(t,i),tablet:!m(n,i)&&m(r,i)&&!m(f,i),device:(m(n,i)||m(t,i)||m(r,i))&&!m(f,i)},amazon:{phone:m(b,i),tablet:!m(b,i)&&m(l,i),device:m(b,i)||m(l,i)},android:{phone:!m(f,i)&&m(b,i)||!m(f,i)&&m(a,i),tablet:!m(f,i)&&!m(b,i)&&!m(a,i)&&(m(l,i)||m(p,i)),device:!m(f,i)&&(m(b,i)||m(l,i)||m(a,i)||m(p,i))||m(/\bokhttp\b/i,i)},windows:{phone:m(f,i),tablet:m(s,i),device:m(f,i)||m(s,i)},other:{blackberry:m(u,i),blackberry10:m(c,i),opera:m(h,i),firefox:m(w,i),chrome:m(v,i),device:m(u,i)||m(c,i)||m(h,i)||m(w,i)||m(v,i)}};return d.any=d.apple.device||d.android.device||d.windows.device||d.other.device,d.phone=d.apple.phone||d.android.phone||d.windows.phone,d.tablet=d.apple.tablet||d.android.tablet||d.windows.tablet,d}"undefined"!=typeof module&&module.exports&&"undefined"==typeof window?module.exports=i:"undefined"!=typeof module&&module.exports&&"undefined"!=typeof window?(module.exports=i(),module.exports.isMobile=i):"function"==typeof define&&define.amd?define([],e.isMobile=i()):e.isMobile=i()}(this);

jsFunctions.isAnyMobile = function() {
    return isMobile.any;
}

jsFunctions.isAnyApple = function() {
    return isMobile.apple.device;
}

localforage.getItemParsed = function(key, onSuccess) {
    localforage.getItem(key, onSuccess);
}

localforage.getItemBuffer = function(key, onSuccess) {
    localforage.getItem(key, onSuccess);
}