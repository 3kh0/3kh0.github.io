"use strict";
(window.g_aG$ = class {
  constructor(e, a) {
    (this.g_aHa = e), (this.g_aHb = a), (this.g_aHc = !1), (this.g_agm = () => this.g_Jv());
  }
  g_aHd() {}
  g_aHe(e, a, g, _) {
    this.g_aHa.g_aHf(this.g_aHb, e, a, !!g, _);
  }
  g_aHg(e, a, g, _) {
    return this.g_aHa.g_aHh(this.g_aHb, e, a, !!g, _);
  }
  g_aHi(e, a, g) {
    this.g_aHa.g_aHj() ? this.g_aHe(e, a, g) : this.g_aHa.g_aHk()._OnMessageFromDOM({ type: "event", component: this.g_aHb, handler: e, dispatchRuntimeEvent: g, data: a, responseId: null });
  }
  g_aHl(e, a) {
    this.g_aHa.g_aHm(this.g_aHb, e, a);
  }
  g_aHn(e) {
    for (const [a, g] of e) this.g_aHl(a, g);
  }
  g_aHo() {
    return this.g_aHa;
  }
  g_aHp() {
    return this.g_aHb;
  }
  g_Yp() {
    this.g_aHc || (this.g_aHa.g_aHq(this.g_agm), (this.g_aHc = !0));
  }
  g_Yc() {
    this.g_aHc && (this.g_aHa.g_aHr(this.g_agm), (this.g_aHc = !1));
  }
  g_Jv() {}
}),
  "use strict",
  (window.g_aHs = class extends g_aG$ {
    constructor(e, a) {
      super(e, a),
        (this.g_aHt = new Map()),
        (this.g_aHu = !0),
        this.g_aHl("create", (e) => this.g_aHv(e)),
        this.g_aHl("destroy", (e) => this.g_aHw(e)),
        this.g_aHl("set-visible", (e) => this.g_aHx(e)),
        this.g_aHl("update-position", (e) => this.g_aHy(e)),
        this.g_aHl("update-state", (e) => this.g_avD(e)),
        this.g_aHl("focus", (e) => this.g_aHz(e)),
        this.g_aHl("set-css-style", (e) => this.g_aHA(e));
    }
    g_aHB(e) {
      this.g_aHu = !!e;
    }
    g_aHC(e, g) {
      this.g_aHl(e, (e) => {
        const a = e.elementId,
          _ = this.g_aHt.get(a);
        return g(_, e);
      });
    }
    g_aHv(e) {
      const a = e.elementId,
        g = this.g_YP(a, e);
      this.g_aHt.set(a, g), this.g_aHu && document.body.appendChild(g);
    }
    g_YP() {
      throw new Error("required override");
    }
    g_aHD() {}
    g_aHw(e) {
      const a = e.elementId,
        g = this.g_aHt.get(a);
      this.g_aHD(g), this.g_aHu && g.parentElement.removeChild(g), this.g_aHt.delete(a);
    }
    g_aHE(e, a, g) {
      g || (g = {}), (g.elementId = a), this.g_aHe(e, g);
    }
    g_aHF(e, a, g) {
      g || (g = {}), (g.elementId = a), this.g_aHi(e, g);
    }
    g_aHx(e) {
      if (this.g_aHu) {
        const a = this.g_aHt.get(e.elementId);
        a.style.display = e.isVisible ? "" : "none";
      }
    }
    g_aHy(e) {
      if (this.g_aHu) {
        const a = this.g_aHt.get(e.elementId);
        (a.style.left = e.left + "px"), (a.style.top = e.top + "px"), (a.style.width = e.width + "px"), (a.style.height = e.height + "px");
        const g = e.fontSize;
        null !== g && (a.style.fontSize = g + "em");
      }
    }
    g_avD(e) {
      const a = this.g_aHt.get(e.elementId);
      this.g_aHG(a, e);
    }
    g_aHG() {
      throw new Error("required override");
    }
    g_aHz(e) {
      const a = this.g_aHt.get(e.elementId);
      e.focus ? a.focus() : a.blur();
    }
    g_aHA(e) {
      const a = this.g_aHt.get(e.elementId);
      a.style[e.prop] = e.val;
    }
    g_aHH(e) {
      return this.g_aHt.get(e);
    }
  }),
  "use strict";
{
  function _(e) {
    return new Promise((a, g) => {
      const _ = document.createElement("script");
      (_.onload = a), (_.onerror = g), (_.async = !1), (_.src = e), document.head.appendChild(_);
    });
  }
  async function t(e) {
    const a = await r(e),
      g = new TextDecoder("utf-8");
    return g.decode(a);
  }
  function r(e) {
    return new Promise((g, _) => {
      const a = new FileReader();
      (a.onload = (e) => g(e.target.result)), (a.onerror = (e) => _(e)), a.readAsArrayBuffer(e);
    });
  }
  function s() {
    if (!e) return n;
    const g = document.createElement("canvas"),
      a = g.getContext("webgl2", { alpha: !0, depth: !1, antialias: !1, failIfMajorPerformanceCaveat: !0 });
    if (!a) return n;
    const _ = a.getExtension("WEBGL_debug_renderer_info");
    if (!_) return n;
    const t = a.getParameter(_.UNMASKED_RENDERER_WEBGL);
    for (const e of o)
      if (t.toLowerCase().includes(e.toLowerCase()))
        return console.warn(`[Construct 3] This device appears to support WebGL 2, but it is disabled due to GPU driver bugs that make it unusable. (Renderer '${t}' matches blacklist entry '${e}'.) See crbug.com/934823`), 1;
    return n;
  }
  const a = /(iphone|ipod|ipad)/i.test(navigator.userAgent),
    e = /android/i.test(navigator.userAgent);
  let d = new Audio();
  const g = {
    "audio/webm; codecs=opus": !!d.canPlayType("audio/webm; codecs=opus"),
    "audio/ogg; codecs=opus": !!d.canPlayType("audio/ogg; codecs=opus"),
    "audio/webm; codecs=vorbis": !!d.canPlayType("audio/webm; codecs=vorbis"),
    "audio/ogg; codecs=vorbis": !!d.canPlayType("audio/ogg; codecs=vorbis"),
    "audio/mp4": !!d.canPlayType("audio/mp4"),
    "audio/mpeg": !!d.canPlayType("audio/mpeg"),
  };
  d = null;
  const u = [];
  let i = 0;
  const M = [],
    L = new Map(),
    l = new Map();
  let m = 0;
  const n = 2,
    o = ["Mali"];
  window.g_aHI = class e {
    constructor(e) {
      (this.g_aHJ = e.g_aHK),
        (this.g_aHL = null),
        (this.g_afo = ""),
        (this.g_aHM = e.g_aHN),
        (this.g_aHO = {}),
        (this.g_aHP = null),
        (this.g_aHQ = null),
        (this.g_aHR = []),
        (this.g_aHS = null),
        (this.g_ado = null),
        (this.g_ag$ = null),
        (this.g_adX = -1),
        (this.g_aHT = () => this.g_aHU()),
        (this.g_aHV = []),
        (this.g_aft = e.g_aHW),
        "cordova" === this.g_aft && this.g_aHJ && (console.warn("[C3 runtime] Worker mode is enabled and supported, but is disabled in Cordova due to crbug.com/939775. Reverting to DOM mode."), (this.g_aHJ = !1)),
        (this.g_aHX = !1),
        (this.g_aHY = null),
        ("html5" === this.g_aft || "playable-ad" === this.g_aft) &&
          "file" === location.protocol.substr(0, 4) &&
          alert("Exported games won't work until you upload them. (When running on the file: protocol, browsers block many features from working for security reasons.)"),
        this.g_aHm("runtime", "cordova-fetch-local-file", (e) => this.g_aHZ(e)),
        this.g_aHm("runtime", "create-job-worker", (e) => this.g_aH_(e)),
        "cordova" === this.g_aft ? document.addEventListener("deviceready", () => this.g_Xi(e)) : this.g_Xi(e);
    }
    g_eN() {
      this.g_aH$(),
        this.g_aHL && ((this.g_aHL.onmessage = null), (this.g_aHL = null)),
        this.g_aHP && (this.g_aHP.terminate(), (this.g_aHP = null)),
        this.g_aHQ && (this.g_aHQ.g_eN(), (this.g_aHQ = null)),
        this.g_ado && (this.g_ado.parentElement.removeChild(this.g_ado), (this.g_ado = null));
    }
    g_aIa() {
      return this.g_ado;
    }
    g_fE() {
      return this.g_afo;
    }
    g_aHj() {
      return this.g_aHJ;
    }
    g_AD() {
      return this.g_aft;
    }
    g_ahr() {
      return "cordova" === this.g_aft && a;
    }
    g_aIb() {
      if (!this.g_ahr()) return !1;
      const e = window.devicePixelRatio,
        a = window.screen.width * e,
        g = window.screen.height * e;
      return 1125 == a && 2436 == g;
    }
    async g_Xi(e) {
      if ("playable-ad" === this.g_aft) {
        (this.g_aHY = self.c3_base64files), await this.g_aIc();
        for (let a = 0, g = e.g_aId.length; a < g; ++a) {
          const g = e.g_aId[a].toLowerCase();
          this.g_aHY.hasOwnProperty(g) && (e.g_aId[a] = URL.createObjectURL(this.g_aHY[g]));
        }
      }
      if (e.g_aIe) this.g_afo = e.g_aIe;
      else {
        const e = location.origin;
        this.g_afo = ("null" === e ? "file:///" : e) + location.pathname;
        const a = this.g_afo.lastIndexOf("/");
        -1 !== a && (this.g_afo = this.g_afo.substr(0, a + 1));
      }
      if (e.g_aIf) for (const [a, g] of Object.entries(e.g_aIf)) this.g_aHO[a] = URL.createObjectURL(g);
      const a = new MessageChannel();
      (this.g_aHL = a.port1),
        (this.g_aHL.onmessage = (e) => this._OnMessageFromRuntime(e.data)),
        window.c3_addPortMessageHandler && window.c3_addPortMessageHandler((e) => this.g_aIg(e)),
        (this.g_ag$ = new self.g_aIh(this)),
        await this.g_ag$.g_aaM(),
        this.g_aIi(),
        "object" == typeof window.StatusBar && window.StatusBar.hide(),
        await this.g_aIj(),
        this.g_aHJ ? await this.g_aIk(e, a.port2) : await this.g_aIl(e, a.port2);
    }
    g_aIm(e) {
      return this.g_aHO.hasOwnProperty(e)
        ? this.g_aHO[e]
        : e.endsWith("/workerMain.js") && this.g_aHO.hasOwnProperty("workerMain.js")
        ? this.g_aHO["workerMain.js"]
        : "playable-ad" === this.g_aft && this.g_aHY.hasOwnProperty(e.toLowerCase())
        ? URL.createObjectURL(this.g_aHY[e.toLowerCase()])
        : e;
    }
    async g_aIn(g, a, _) {
      if (g.startsWith("blob:")) return new Worker(g, _);
      if (this.g_ahr()) {
        const a = await this.g_Az(this.g_aHM + g),
          e = new Blob([a], { type: "application/javascript" });
        return new Worker(URL.createObjectURL(e), _);
      }
      const n = new URL(g, a),
        t = location.origin !== n.origin;
      if (t) {
        const e = await fetch(n);
        if (!e.ok) throw new Error("failed to fetch worker script");
        const a = await e.blob();
        return new Worker(URL.createObjectURL(a), _);
      }
      return new Worker(n, _);
    }
    g_aIi() {
      if (this.g_aIb()) {
        const e = window.innerWidth > window.innerHeight,
          a = document.documentElement.style,
          g = document.body.style;
        e ? ((g.height = a.height = "375px"), (g.width = a.width = "812px")) : ((g.width = a.width = "375px"), (g.height = a.height = "812px"));
      }
    }
    g_aIo(_) {
      return {
        baseUrl: this.g_afo,
        windowInnerWidth: window.innerWidth,
        windowInnerHeight: window.innerHeight,
        devicePixelRatio: window.devicePixelRatio,
        isFullscreen: e.g_aez(),
        maxWebGLVersion: s(),
        projectData: _.g_aIp,
        previewImageBlobs: window.cr_previewImageBlobs || this.g_aHY,
        previewProjectFileBlobs: window.cr_previewProjectFileBlobs,
        shaders: self.C3_Shaders,
        exportType: _.g_aHW,
        isDebug: -1 < self.location.search.indexOf("debug"),
        ife: !!self.g_aIq,
        jobScheduler: this.g_ag$.g_aIr(),
        supportedAudioFormats: g,
        opusWasmScriptUrl: window.cr_opusWasmScriptUrl || this.g_aHM + "opus.wasm.js",
        opusWasmBinaryUrl: window.cr_opusWasmBinaryUrl || this.g_aHM + "opus.wasm.wasm",
        isWKWebView: this.g_ahr(),
        isFBInstantAvailable: "undefined" != typeof self.FBInstant,
      };
    }
    async g_aIk(e, a) {
      const g = this.g_aIm(e.g_aIs);
      (this.g_aHP = await this.g_aIn(g, this.g_afo, { name: "Runtime" })), (this.g_ado = document.createElement("canvas")), (this.g_ado.style.display = "none");
      const _ = this.g_ado.transferControlToOffscreen();
      document.body.appendChild(this.g_ado),
        (window.c3canvas = this.g_ado),
        this.g_aHP.postMessage(Object.assign(this.g_aIo(e), { type: "init-runtime", isInWorker: !0, messagePort: a, canvas: _, workerDependencyScripts: e.g_aIt || [], engineScripts: e.g_aId }), [a, _, ...this.g_ag$.g_aIu()]),
        (this.g_aHR = M.map((e) => new e(this))),
        this.g_aIv();
    }
    async g_aIl(a, g) {
      (this.g_ado = document.createElement("canvas")), (this.g_ado.style.display = "none"), document.body.appendChild(this.g_ado), (window.c3canvas = this.g_ado), (this.g_aHR = M.map((e) => new e(this))), this.g_aIv();
      const n = a.g_aId.map((e) => new URL(e, this.g_afo).toString());
      await Promise.all(n.map((a) => _(a)));
      const t = Object.assign(this.g_aIo(a), { isInWorker: !1, messagePort: g, canvas: this.g_ado });
      (this.g_aHQ = self.C3_CreateRuntime(t)), await self.C3_InitRuntime(this.g_aHQ, t);
    }
    async g_aH_() {
      const e = await this.g_ag$.g_aIw();
      return { outputPort: e, transferables: [e] };
    }
    g_aHk() {
      if (this.g_aHJ) throw new Error("not available in worker mode");
      return this.g_aHQ;
    }
    g_aHf(g, a, _, n, t) {
      this.g_aHL.postMessage({ type: "event", component: g, handler: a, dispatchRuntimeEvent: n, data: _, responseId: null }, this.g_aHX ? void 0 : t);
    }
    g_aHh(_, a, n, t, i) {
      const e = m++,
        o = new Promise((g, a) => {
          l.set(e, { resolve: g, reject: a });
        });
      return this.g_aHL.postMessage({ type: "event", component: _, handler: a, dispatchRuntimeEvent: t, data: n, responseId: e }, this.g_aHX ? void 0 : i), o;
    }
    ["_OnMessageFromRuntime"](e) {
      const a = e.type;
      if ("event" === a) this.g_aIx(e);
      else if ("result" === a) this.g_aIy(e);
      else if ("runtime-ready" === a) this.g_aIz();
      else throw new Error(`unknown message '${a}'`);
    }
    g_aIx(_) {
      const n = _.component,
        t = _.handler,
        a = _.data,
        i = _.responseId,
        e = L.get(n);
      if (!e) return void console.warn(`[DOM] No event handlers for component '${n}'`);
      const o = e.get(t);
      if (!o) return void console.warn(`[DOM] No handler '${t}' for component '${n}'`);
      let g = null;
      try {
        g = o(a);
      } catch (e) {
        return console.error(`Exception in '${n}' handler '${t}':`, e), void (null !== i && this.g_aIA(i, !1, e.toString()));
      }
      null !== i &&
        (g && g.then
          ? g
              .then((e) => this.g_aIA(i, !0, e))
              .catch((e) => {
                console.error(`Rejection from '${n}' handler '${t}':`, e), this.g_aIA(i, !1, e.toString());
              })
          : this.g_aIA(i, !0, g));
    }
    g_aIA(e, a, g) {
      let _;
      g && g.transferables && (_ = g.transferables), this.g_aHL.postMessage({ type: "result", responseId: e, isOk: a, result: g }, _);
    }
    g_aIy(g) {
      const a = g.responseId,
        _ = g.isOk,
        n = g.result,
        t = l.get(a);
      _ ? t.resolve(n) : t.reject(n), l.delete(a);
    }
    g_aHm(e, a, g) {
      let _ = L.get(e);
      if ((_ || ((_ = new Map()), L.set(e, _)), _.has(a))) throw new Error(`[DOM] Component '${e}' already has handler '${a}'`);
      _.set(a, g);
    }
    static g_aIB(e) {
      if (M.includes(e)) throw new Error("DOM handler already added");
      M.push(e);
    }
    g_aIv() {
      for (const e of this.g_aHR) if ("runtime" === e.g_aHp()) return void (this.g_aHS = e);
      throw new Error("cannot find runtime DOM handler");
    }
    g_aIg(e) {
      this.g_aHf("debugger", "message", e);
    }
    g_aIz() {
      for (const e of this.g_aHR) e.g_aHd();
    }
    static g_aez() {
      return !!(document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement);
    }
    async g_aIC() {
      return await this.g_aHh("runtime", "get-remote-preview-status-info");
    }
    g_aHq(e) {
      this.g_aHV.push(e), this.g_aID();
    }
    g_aHr(e) {
      const a = this.g_aHV.indexOf(e);
      if (-1 === a) throw new Error("invalid callback");
      this.g_aHV.splice(a, 1), this.g_aHV.length || this.g_aH$();
    }
    g_aID() {
      -1 === this.g_adX && this.g_aHV.length && (this.g_adX = requestAnimationFrame(this.g_aHT));
    }
    g_aH$() {
      -1 !== this.g_adX && (cancelAnimationFrame(this.g_adX), (this.g_adX = -1));
    }
    g_aHU() {
      this.g_adX = -1;
      for (const e of this.g_aHV) e();
      this.g_aID();
    }
    g_aIE(e) {
      this.g_aHS.g_aIE(e);
    }
    g_aIF(e) {
      this.g_aHS.g_aIF(e);
    }
    g_aIG() {
      this.g_aHS.g_aIG();
    }
    g_awp(e) {
      this.g_aHS.g_awp(e);
    }
    g_AV(e) {
      return !!g[e];
    }
    async g_ahc(e) {
      const a = await this.g_aHh("runtime", "opus-decode", { arrayBuffer: e }, !1, [e]);
      return new Float32Array(a);
    }
    g_gp(e) {
      return /^(?:[a-z]+:)?\/\//.test(e) || "data:" === e.substr(0, 5) || "blob:" === e.substr(0, 5);
    }
    g_gq(e) {
      return !this.g_gp(e);
    }
    async g_aHZ(e) {
      const a = e.filename;
      switch (e.as) {
        case "text":
          return await this.g_Ax(a);
        case "buffer":
          return await this.g_Az(a);
        default:
          throw new Error("unsupported type");
      }
    }
    g_aIH(e) {
      const g = window.cordova.file.applicationDirectory + "www/" + e;
      return new Promise((e, a) => {
        window.resolveLocalFileSystemURL(
          g,
          (g) => {
            g.file(e, a);
          },
          a
        );
      });
    }
    async g_Ax(e) {
      const a = await this.g_aIH(e);
      return await t(a);
    }
    g_aII() {
      if (u.length && !(8 <= i)) {
        i++;
        const e = u.shift();
        this.g_aIJ(e.filename, e.g_aIK, e.g_aIL);
      }
    }
    g_Az(e) {
      return new Promise((g, _) => {
        u.push({
          filename: e,
          g_aIK: (e) => {
            i--, this.g_aII(), g(e);
          },
          g_aIL: (e) => {
            i--, this.g_aII(), _(e);
          },
        }),
          this.g_aII();
      });
    }
    async g_aIJ(g, a, e) {
      try {
        const _ = await this.g_aIH(g),
          n = await r(_);
        a(n);
      } catch (g) {
        e(g);
      }
    }
    async g_aIc() {
      const e = [];
      for (const [a, g] of Object.entries(this.g_aHY)) e.push(this.g_aIM(a, g));
      await Promise.all(e);
    }
    async g_aIM(e, a) {
      if ("object" == typeof a) this.g_aHY[e] = new Blob([a.str], { type: a.type });
      else {
        const g = await fetch(a),
          _ = await g.blob();
        this.g_aHY[e] = _;
      }
    }
    g_aIj() {
      let e = null;
      const g = new Promise((a) => (e = a)),
        _ = new ArrayBuffer(1),
        n = new MessageChannel();
      return (
        (n.port2.onmessage = (a) => {
          (a.data && a.data.arrayBuffer) || ((this.g_aHX = !0), console.warn("MessageChannel transfers determined to be broken. Disabling transferables.")), e();
        }),
        n.port1.postMessage({ arrayBuffer: _ }, [_]),
        g
      );
    }
  };
}
{
  function g(e) {
    return (e.sourceCapabilities && e.sourceCapabilities.firesTouchEvents) || (e.originalEvent && e.originalEvent.sourceCapabilities && e.originalEvent.sourceCapabilities.firesTouchEvents);
  }
  function a(e) {
    return new Promise((a, g) => {
      const _ = new Image();
      (_.onload = () => a(_)), (_.onerror = (e) => g(e)), (_.src = e);
    });
  }
  async function _(e) {
    const g = URL.createObjectURL(e);
    try {
      return await a(g);
    } finally {
      URL.revokeObjectURL(g);
    }
  }
  function n() {
    try {
      return window.parent && window.parent.document.hasFocus();
    } catch (e) {
      return !1;
    }
  }
  self.C3_RasterSvgImage = async function (g, a, _) {
    const n = document.createElement("canvas");
    (n.width = a), (n.height = _);
    const t = n.getContext("2d");
    return t.drawImage(g, 0, 0, a, _), n;
  };
  let t = !1;
  document.addEventListener("pause", () => (t = !0)), document.addEventListener("resume", () => (t = !1));
  const e = class extends g_aG$ {
    constructor(e) {
      super(e, "runtime"),
        (this.g_aIN = !0),
        (this.g_aIO = "any"),
        (this.g_aIP = !1),
        (this.g_aIQ = !1),
        (this.g_aIR = null),
        e.g_aHm("canvas", "update-size", (e) => this.g_aIS(e)),
        e.g_aHm("runtime", "invoke-download", (e) => this.g_aIT(e)),
        e.g_aHm("runtime", "raster-svg-image", (e) => this.g_aIU(e)),
        e.g_aHm("runtime", "set-target-orientation", (e) => this.g_aIV(e)),
        e.g_aHm("runtime", "register-sw", () => this.g_aIW()),
        e.g_aHm("runtime", "post-to-debugger", (e) => this.g_aIX(e)),
        e.g_aHm("runtime", "before-start-ticking", () => this.g_aIY()),
        e.g_aHm("runtime", "debug-highlight", (e) => this.g_aIZ(e)),
        e.g_aHm("runtime", "enable-device-orientation", () => this.g_aI_()),
        e.g_aHm("runtime", "enable-device-motion", () => this.g_aI$());
      const a = e.g_aIa();
      a.addEventListener("contextmenu", (e) => e.preventDefault()),
        a.addEventListener("selectstart", (e) => e.preventDefault()),
        a.addEventListener("gesturehold", (e) => e.preventDefault()),
        a.addEventListener("touchstart", (e) => e.preventDefault()),
        window.addEventListener("mousedown", (e) => {
          1 === e.button && e.preventDefault();
        }),
        window.addEventListener("resize", () => this.g_aem()),
        (this.g_aJa = new Set()),
        (this.g_aJb = new WeakSet()),
        (this.g_avv = !1);
    }
    g_aIY() {
      return (
        document.addEventListener("visibilitychange", () => this.g_ahb(document.hidden)),
        document.addEventListener("pause", () => this.g_ahb(!0)),
        document.addEventListener("resume", () => this.g_ahb(!1)),
        { isSuspended: !!(document.hidden || t) }
      );
    }
    g_aHd() {
      window.addEventListener("focus", () => this.g_aJc("window-focus")),
        window.addEventListener("blur", () => this.g_aJc("window-blur", { parentHasFocus: n() })),
        window.addEventListener("fullscreenchange", () => this.g_aen()),
        window.addEventListener("webkitfullscreenchange", () => this.g_aen()),
        window.addEventListener("mozfullscreenchange", () => this.g_aen()),
        window.addEventListener("fullscreenerror", (e) => this.g_aeo(e)),
        window.addEventListener("webkitfullscreenerror", (e) => this.g_aeo(e)),
        window.addEventListener("mozfullscreenerror", (e) => this.g_aeo(e)),
        window.addEventListener("keydown", (e) => this.g_aJd("keydown", e)),
        window.addEventListener("keyup", (e) => this.g_aJd("keyup", e)),
        window.addEventListener("mousemove", (e) => this.g_aJe("mousemove", e)),
        window.addEventListener("mousedown", (e) => this.g_aJe("mousedown", e)),
        window.addEventListener("mouseup", (e) => this.g_aJe("mouseup", e)),
        window.addEventListener("dblclick", (e) => this.g_aJe("dblclick", e)),
        window.addEventListener("wheel", (e) => this.g_aJf("wheel", e)),
        "undefined" == typeof PointerEvent
          ? (window.addEventListener("touchstart", (e) => this.g_aJg("pointerdown", e)),
            window.addEventListener("touchmove", (e) => this.g_aJg("pointermove", e)),
            window.addEventListener("touchend", (e) => this.g_aJg("pointerup", e)),
            window.addEventListener("touchcancel", (e) => this.g_aJg("pointercancel", e)))
          : (window.addEventListener("pointerdown", (e) => this.g_aJh("pointerdown", e)),
            window.addEventListener("pointermove", (e) => this.g_aJh("pointermove", e)),
            window.addEventListener("pointerup", (e) => this.g_aJh("pointerup", e)),
            window.addEventListener("pointercancel", (e) => this.g_aJh("pointercancel", e)));
      const e = () => this.g_aIG();
      window.addEventListener("pointerup", e, !0), window.addEventListener("touchend", e, !0), window.addEventListener("click", e, !0), window.addEventListener("keydown", e, !0), window.addEventListener("gamepadconnected", e, !0);
    }
    g_aI_() {
      this.g_aIP || ((this.g_aIP = !0), window.addEventListener("deviceorientation", (e) => this.g_aza(e)));
    }
    g_aI$() {
      this.g_aIQ || ((this.g_aIQ = !0), window.addEventListener("devicemotion", (e) => this.g_azb(e)));
    }
    g_aJc(e, a) {
      this.g_aHe(e, a || null, !0);
    }
    g_aem() {
      this.g_aHe("window-resize", { innerWidth: window.innerWidth, innerHeight: window.innerHeight, devicePixelRatio: window.devicePixelRatio }, !0);
    }
    g_aIV(e) {
      this.g_aIO = e.targetOrientation;
    }
    g_aJi() {
      const e = this.g_aIO;
      if (screen.orientation && screen.orientation.lock) screen.orientation.lock(e).catch((e) => console.warn("[Construct 3] Failed to lock orientation: ", e));
      else
        try {
          let a = !1;
          screen.lockOrientation
            ? (a = screen.lockOrientation(e))
            : screen.webkitLockOrientation
            ? (a = screen.webkitLockOrientation(e))
            : screen.mozLockOrientation
            ? (a = screen.mozLockOrientation(e))
            : screen.msLockOrientation && (a = screen.msLockOrientation(e)),
            a || console.warn("[Construct 3] Failed to lock orientation");
        } catch (e) {
          console.warn("[Construct 3] Failed to lock orientation: ", e);
        }
    }
    g_aen() {
      const e = g_aHI.g_aez();
      e && "any" !== this.g_aIO && this.g_aJi(), this.g_aHe("fullscreenchange", { isFullscreen: e, innerWidth: window.innerWidth, innerHeight: window.innerHeight });
    }
    g_aeo(e) {
      console.warn("[Construct 3] Fullscreen request failed: ", e), this.g_aHe("fullscreenerror", { isFullscreen: g_aHI.g_aez(), innerWidth: window.innerWidth, innerHeight: window.innerHeight });
    }
    g_ahb(e) {
      e ? this.g_aHa.g_aH$() : this.g_aHa.g_aID(), this.g_aHe("visibilitychange", { hidden: e });
    }
    g_aJd(e, a) {
      this.g_aHi(e, { code: a.code, key: a.key, which: a.which, repeat: a.repeat, altKey: a.altKey, ctrlKey: a.ctrlKey, metaKey: a.metaKey, shiftKey: a.shiftKey, timeStamp: a.timeStamp }, !0);
    }
    g_aJe(a, e) {
      g(e) || ("mousedown" === a && window !== window.top && window.focus(), this.g_aHi(a, { button: e.button, clientX: e.clientX, clientY: e.clientY, timeStamp: e.timeStamp }, !0));
    }
    g_aJf(e, a) {
      this.g_aHe(e, { clientX: a.clientX, clientY: a.clientY, deltaX: a.deltaX, deltaY: a.deltaY, deltaZ: a.deltaZ, deltaMode: a.deltaMode, timeStamp: a.timeStamp }, !0);
    }
    g_aJh(e, a) {
      "pointerdown" === e && window !== window.top && window.focus(),
        this.g_aHi(
          e,
          {
            pointerId: a.pointerId,
            pointerType: a.pointerType,
            clientX: a.clientX,
            clientY: a.clientY,
            width: a.width || 0,
            height: a.height || 0,
            pressure: a.pressure || 0,
            tangentialPressure: a.tangentialPressure || 0,
            tiltX: a.tiltX || 0,
            tiltY: a.tiltY || 0,
            twist: a.twist || 0,
            timeStamp: a.timeStamp,
          },
          !0
        );
    }
    g_aJg(e, a) {
      "pointerdown" === e && window !== window.top && window.focus();
      for (let g = 0, _ = a.changedTouches.length; g < _; ++g) {
        const _ = a.changedTouches[g];
        this.g_aHi(
          e,
          {
            pointerId: _.identifier,
            pointerType: "touch",
            clientX: _.clientX,
            clientY: _.clientY,
            width: 2 * (_.radiusX || _.webkitRadiusX || _.mozRadiusX || _.msRadiusX || 0),
            height: 2 * (_.radiusY || _.webkitRadiusY || _.mozRadiusY || _.msRadiusY || 0),
            pressure: _.force || _.webkitForce || _.mozForce || _.msForce || 0,
            tangentialPressure: 0,
            tiltX: 0,
            tiltY: 0,
            twist: _.rotationAngle || 0,
            timeStamp: a.timeStamp,
          },
          !0
        );
      }
    }
    g_aza(e) {
      this.g_aHe("deviceorientation", { alpha: e.alpha || 0, beta: e.beta || 0, gamma: e.gamma || 0, timeStamp: e.timeStamp }, !0);
    }
    g_azb(_) {
      let a = 0,
        n = 0,
        t = 0,
        o = 0,
        r = 0,
        s = 0;
      const l = _.accelerationIncludingGravity;
      l && ((a = l.x || 0), (n = l.y || 0), (t = l.z || 0));
      const u = _.acceleration;
      u && ((o = u.x || 0), (r = u.y || 0), (s = u.z || 0)), this.g_aHe("devicemotion", { acceleration: { x: o, y: r, z: s }, accelerationWithG: { x: a, y: n, z: t }, timeStamp: _.timeStamp }, !0);
    }
    g_aIS(e) {
      const a = this.g_aHo(),
        g = a.g_aIa();
      (g.style.width = e.styleWidth + "px"),
        (g.style.height = e.styleHeight + "px"),
        (g.style.marginLeft = e.marginLeft + "px"),
        (g.style.marginTop = e.marginTop + "px"),
        a.g_aIi(),
        this.g_aIN && ((g.style.display = ""), (this.g_aIN = !1));
    }
    g_aIT(g) {
      const _ = g.url,
        n = g.filename,
        t = document.createElement("a"),
        e = document.body;
      (t.textContent = n), (t.href = _), (t.download = n), e.appendChild(t), t.click(), e.removeChild(t);
    }
    async g_aIU(n) {
      const a = n.blob,
        t = n.width,
        i = n.height,
        e = await _(a),
        o = await self.C3_RasterSvgImage(e, t, i);
      return await createImageBitmap(o);
    }
    g_aIG() {
      const e = [...this.g_aJa];
      if ((this.g_aJa.clear(), !this.g_avv))
        for (const g of e) {
          const e = g.play();
          e &&
            e.catch(() => {
              this.g_aJb.has(g) || this.g_aJa.add(g);
            });
        }
    }
    g_aIE(e) {
      if ("function" != typeof e.play) throw new Error("missing play function");
      this.g_aJb.delete(e);
      let a;
      try {
        a = e.play();
      } catch (a) {
        return void this.g_aJa.add(e);
      }
      a &&
        a.catch(() => {
          this.g_aJb.has(e) || this.g_aJa.add(e);
        });
    }
    g_aIF(e) {
      this.g_aJa.delete(e), this.g_aJb.add(e);
    }
    g_awp(e) {
      this.g_avv = !!e;
    }
    g_aIZ(e) {
      const a = e.show;
      if (!a) return void (this.g_aIR && (this.g_aIR.style.display = "none"));
      this.g_aIR || ((this.g_aIR = document.createElement("div")), (this.g_aIR.id = "inspectOutline"), document.body.appendChild(this.g_aIR));
      const g = this.g_aIR;
      (g.style.display = ""), (g.style.left = e.left - 1 + "px"), (g.style.top = e.top - 1 + "px"), (g.style.width = e.width + 2 + "px"), (g.style.height = e.height + 2 + "px"), (g.textContent = e.name);
    }
    g_aIW() {
      window.C3_RegisterSW && window.C3_RegisterSW();
    }
    g_aIX(e) {
      window.c3_postToMessagePort && ((e.from = "runtime"), window.c3_postToMessagePort(e));
    }
  };
  g_aHI.g_aIB(e);
}
{
  const e = document.currentScript.src;
  self.g_aIh = class {
    constructor(a) {
      (this.g_aJj = a), (this.g_afo = e ? e.substr(0, e.lastIndexOf("/") + 1) : a.g_fE()), (this.g_aji = Math.min(navigator.hardwareConcurrency || 2, 16)), (this.g_aJk = null), (this.g_aJl = []), (this.g_ajg = null), (this.g_aJm = null);
    }
    async g_aaM() {
      if (this.g_aJn) throw new Error("already initialised");
      this.g_aJn = !0;
      const e = this.g_aJj.g_aIm("dispatchWorker.js");
      this.g_aJk = await this.g_aJj.g_aIn(e, this.g_afo, { name: "DispatchWorker" });
      const a = new MessageChannel();
      (this.g_ajg = a.port1), this.g_aJk.postMessage({ type: "_init", "in-port": a.port2 }, [a.port2]), (this.g_aJm = await this.g_aIw());
    }
    async g_aIw() {
      const g = this.g_aJl.length,
        a = this.g_aJj.g_aIm("jobWorker.js"),
        _ = await this.g_aJj.g_aIn(a, this.g_afo, { name: "JobWorker" + g }),
        n = new MessageChannel(),
        t = new MessageChannel();
      return this.g_aJk.postMessage({ type: "_addJobWorker", port: n.port1 }, [n.port1]), _.postMessage({ type: "init", number: g, "dispatch-port": n.port2, "output-port": t.port2 }, [n.port2, t.port2]), this.g_aJl.push(_), t.port1;
    }
    g_aIr() {
      return { inputPort: this.g_ajg, outputPort: this.g_aJm, maxNumWorkers: this.g_aji };
    }
    g_aIu() {
      return [this.g_ajg, this.g_aJm];
    }
  };
}
if (("use strict", window.C3_IsSupported)) {
  "undefined" != typeof OffscreenCanvas;
  window.c3_runtimeInterface = new g_aHI({ g_aHK: !1, g_aIs: "workerMain.js", g_aId: ["scripts/c3runtime.js"], g_aHN: "scripts/", g_aHW: "html5" });
}
{
  function e(e, g) {
    return e.length === g.length && (e === g || e.toLowerCase() === g.toLowerCase());
  }
  const a = class extends g_aG$ {
    constructor(e) {
      super(e, "audio"),
        (this.g_aJo = null),
        (this.g_aJp = null),
        (this.g_aJq = !1),
        (this.g_aJr = () => this.g_aJs()),
        (this.g_aJt = []),
        (this.g_aJu = []),
        (this.g_aJv = null),
        (this.g_aJw = ""),
        (this.g_aJx = -1),
        (this.g_aJy = new Map()),
        (this.g_avu = 1),
        (this.g_avv = !1),
        (this.g_avh = 0),
        (this.g_aaF = 1),
        (this.g_agC = 0),
        (this.g_avk = "HRTF"),
        (this.g_avl = "inverse"),
        (this.g_aJz = 600),
        (this.g_avq = 1e4),
        (this.g_avr = 1),
        (this.g_aJA = !1),
        (this.g_aJB = !1),
        (this.g_aJC = this.g_aHa.g_AV("audio/webm; codecs=opus")),
        (this.g_aJD = new Map()),
        (this.g_aJE = new Set()),
        (this.g_aJF = !1),
        (this.g_aJG = ""),
        (this.g_aJH = null),
        (self.C3Audio_OnMicrophoneStream = (e, a) => this.g_aJI(e, a)),
        (this.g_aJJ = null),
        (self.C3Audio_GetOutputStream = () => this.g_aJK()),
        this.g_aHn([
          ["create-audio-context", (e) => this.g_aJL(e)],
          ["play", (e) => this.g_aJM(e)],
          ["stop", (e) => this.g_aJN(e)],
          ["stop-all", () => this.g_aJO()],
          ["set-paused", (e) => this.g_aJP(e)],
          ["set-volume", (e) => this.g_aJQ(e)],
          ["fade-volume", (e) => this.g_aJR(e)],
          ["set-master-volume", (e) => this.g_aJS(e)],
          ["set-muted", (e) => this.g_aJT(e)],
          ["set-silent", (e) => this.g_aJU(e)],
          ["set-looping", (e) => this.g_aJV(e)],
          ["set-playback-rate", (e) => this.g_aJW(e)],
          ["seek", (e) => this.g_aJX(e)],
          ["preload", (e) => this.g_aJY(e)],
          ["unload", (e) => this.g_FW(e)],
          ["unload-all", () => this.g_aJZ()],
          ["set-suspended", (e) => this.g_aJ_(e)],
          ["add-effect", (e) => this.g_aJ$(e)],
          ["set-effect-param", (e) => this.g_aKa(e)],
          ["remove-effects", (e) => this.g_aKb(e)],
          ["tick", (e) => this.g_Ll(e)],
          ["load-state", (e) => this.g_aKc(e)],
        ]);
    }
    async g_aJL(e) {
      e.isWKWebView && (this.g_aJA = !0),
        (this.g_avh = e.timeScaleMode),
        (this.g_avk = ["equalpower", "HRTF", "soundfield"][e.panningModel]),
        (this.g_avl = ["linear", "inverse", "exponential"][e.distanceModel]),
        (this.g_aJz = e.refDistance),
        (this.g_avq = e.maxDistance),
        (this.g_avr = e.rolloffFactor);
      const a = { latencyHint: e.latencyHint };
      if ("undefined" != typeof AudioContext) this.g_aJo = new AudioContext(a);
      else if ("undefined" != typeof webkitAudioContext) this.g_aJo = new webkitAudioContext(a);
      else throw new Error("Web Audio API not supported");
      (this.g_aJp = this.g_aJo.createGain()), this.g_aJp.connect(this.g_aJo.destination);
      const g = e.listenerPos;
      this.g_aJo.listener.setPosition(g[0], g[1], g[2]),
        this.g_aJo.listener.setOrientation(0, 0, 1, 0, -1, 0),
        window.addEventListener("pointerup", this.g_aJr, !0),
        window.addEventListener("touchend", this.g_aJr, !0),
        window.addEventListener("click", this.g_aJr, !0),
        window.addEventListener("keydown", this.g_aJr, !0),
        (self.C3_GetAudioContextCurrentTime = () => this.g_aKd());
      try {
        await Promise.all(e.preloadList.map((e) => this.g_aKe(e.originalUrl, e.url, e.type, !1)));
      } catch (e) {
        console.error("[Construct 3] Preloading sounds failed: ", e);
      }
      return { sampleRate: this.g_aJo.sampleRate };
    }
    g_aJs() {
      if (!this.g_aJq) {
        const e = this.g_aJo;
        "suspended" === e.state && e.resume && e.resume();
        const a = e.createBuffer(1, 220, 22050),
          g = e.createBufferSource();
        (g.buffer = a),
          g.connect(e.destination),
          g.start(0),
          "running" === e.state &&
            ((this.g_aJq = !0),
            window.removeEventListener("pointerup", this.g_aJr, !0),
            window.removeEventListener("touchend", this.g_aJr, !0),
            window.removeEventListener("click", this.g_aJr, !0),
            window.removeEventListener("keydown", this.g_aJr, !0),
            (this.g_aJr = null));
      }
    }
    g_aKf() {
      return this.g_aJo;
    }
    g_aKd() {
      return this.g_aJo.currentTime;
    }
    g_aKg() {
      return this.g_aJp;
    }
    g_aKh(e) {
      const a = this.g_aJD.get(e.toLowerCase());
      return a ? a[0].g_aKi() : this.g_aKg();
    }
    g_aKj(e, g) {
      e = e.toLowerCase();
      let _ = this.g_aJD.get(e);
      _ || ((_ = []), this.g_aJD.set(e, _)), g.g_acq(_.length), g.g_aKk(e), _.push(g), this.g_aKl(e);
    }
    g_aKl(e) {
      let a = this.g_aKg();
      const g = this.g_aJD.get(e);
      if (g && g.length) {
        a = g[0].g_aKi();
        for (let e = 0, a = g.length; e < a; ++e) {
          const _ = g[e];
          e + 1 === a ? _.g_aKm(this.g_aKg()) : _.g_aKm(g[e + 1].g_aKi());
        }
      }
      for (const g of this.g_aKn(e)) g.g_aKo(a);
      this.g_aJH && this.g_aJG === e && (this.g_aJH.disconnect(), this.g_aJH.connect(a));
    }
    g_aKp() {
      return this.g_avu;
    }
    g_av_() {
      return this.g_avv;
    }
    g_aKq() {
      return this.g_avh;
    }
    g_LA() {
      return this.g_aaF;
    }
    g_EK() {
      return this.g_agC;
    }
    g_aKr() {
      return this.g_aJA;
    }
    g_aKs() {
      return this.g_aJC;
    }
    g_aKt() {
      this.g_aJB = !0;
    }
    g_aKu() {
      return this.g_avk;
    }
    g_aKv() {
      return this.g_avl;
    }
    g_aKw() {
      return this.g_aJz;
    }
    g_aKx() {
      return this.g_avq;
    }
    g_aKy() {
      return this.g_avr;
    }
    g_aKz(e, a) {
      return a
        ? this.g_aHa.g_ahc(e).then((e) => {
            const a = this.g_aJo.createBuffer(1, e.length, 48e3),
              g = a.getChannelData(0);
            return g.set(e), a;
          })
        : new Promise((a, g) => {
            this.g_aJo.decodeAudioData(e, a, g);
          });
    }
    g_aIE(e) {
      this.g_aHa.g_aIE(e);
    }
    g_aIF(e) {
      this.g_aHa.g_aIF(e);
    }
    g_aKA(a) {
      let g = 0;
      for (let _ = 0, e = this.g_aJu.length; _ < e; ++_) {
        const n = this.g_aJu[_];
        (this.g_aJu[g] = n), n.g_aKB() === a ? n.g_eN() : ++g;
      }
      this.g_aJu.length = g;
    }
    g_aKC() {
      let e = 0;
      for (let a = 0, g = this.g_aJt.length; a < g; ++a) {
        const g = this.g_aJt[a];
        (this.g_aJt[e] = g), g.g_aKD() ? g.g_eN() : ++e;
      }
      this.g_aJt.length = e;
    }
    *g_aKn(a) {
      if (a) for (const g of this.g_aJu) e(g.g_aKE(), a) && (yield g);
      else this.g_aJv && !this.g_aJv.g_aKF() && (yield this.g_aJv);
    }
    async g_aKe(g, a, _, n, t) {
      for (const e of this.g_aJt) if (e.g_aKG() === a) return await e.g_AK(), e;
      if (t) return null;
      n && (this.g_aJA || this.g_aJB) && this.g_aKC();
      const e = g_aKH.g_pM(this, g, a, _, n);
      return this.g_aJt.push(e), await e.g_AK(), e;
    }
    async g_aKI(_, a, n, t, i) {
      for (const e of this.g_aJu) if (e.g_aKG() === a && (e.g_aKJ() || i)) return e.g_aKK(t), e;
      const e = await this.g_aKe(_, a, n, i),
        o = e.g_ahH(t);
      return this.g_aJu.push(o), o;
    }
    g_aKL(e) {
      let a = this.g_aJy.get(e);
      if (!a) {
        let g = null;
        const _ = new Promise((e) => (g = e));
        (a = { g_aKM: 0, promise: _, resolve: g }), this.g_aJy.set(e, a);
      }
      a.g_aKM++;
    }
    g_aKN(e) {
      const a = this.g_aJy.get(e);
      if (!a) throw new Error("expected pending tag");
      a.g_aKM--, 0 === a.g_aKM && (a.resolve(), this.g_aJy.delete(e));
    }
    g_aKO(e) {
      e || (e = this.g_aJw);
      const g = this.g_aJy.get(e);
      return g ? g.promise : Promise.resolve();
    }
    g_aKP() {
      if (0 < this.g_aJE.size) return void this.g_Yp();
      for (const e of this.g_aJu) if (e.g_Rw()) return void this.g_Yp();
    }
    g_Jv() {
      for (const a of this.g_aJE) a.g_Jv();
      const e = this.g_aKd();
      for (const a of this.g_aJu) a.g_Jv(e);
      const a = this.g_aJu.filter((a) => a.g_Rw()).map((a) => a.g_aKQ());
      this.g_aHe("state", { tickCount: this.g_aJx, audioInstances: a, analysers: [...this.g_aJE].map((a) => a.g_aKR()) }), 0 === a.length && 0 === this.g_aJE.size && this.g_Yc();
    }
    g_aKS(e, a) {
      this.g_aHe("trigger", { type: e, tag: a });
    }
    async g_aJM(_) {
      const a = _.originalUrl,
        n = _.url,
        t = _.type,
        o = _.isMusic,
        e = _.tag,
        r = _.isLooping,
        g = _.vol,
        d = _.pos,
        i = _.panning;
      let s = _.off;
      if (0 < s && !_.trueClock)
        if (this.g_aJo.getOutputTimestamp) {
          const e = this.g_aJo.getOutputTimestamp();
          s = s - e.performanceTime / 1e3 + e.contextTime;
        } else s = s - performance.now() / 1e3 + this.g_aJo.currentTime;
      (this.g_aJw = e), this.g_aKL(e);
      try {
        (this.g_aJv = await this.g_aKI(a, n, t, e, o)),
          i ? (this.g_aJv.g_aKT(!0), this.g_aJv.g_aKU(i.x, i.y, i.angle, i.innerAngle, i.outerAngle, i.outerGain), i.hasOwnProperty("uid") && this.g_aJv.g_aKV(i.uid)) : this.g_aJv.g_aKT(!1),
          this.g_aJv.g_Jt(r, g, d, s);
      } catch (e) {
        return void console.error("[Construct 3] Audio: error starting playback: ", e);
      } finally {
        this.g_aKN(e);
      }
      this.g_Yp();
    }
    g_aJN(e) {
      const a = e.tag;
      for (const g of this.g_aKn(a)) g.g_Jk();
    }
    g_aJO() {
      for (const e of this.g_aJu) e.g_Jk();
    }
    g_aJP(e) {
      const a = e.tag,
        g = e.paused;
      for (const _ of this.g_aKn(a)) g ? _.g_aKW() : _.g_Js();
      this.g_aKP();
    }
    g_aJQ(e) {
      const a = e.tag,
        g = e.vol;
      for (const _ of this.g_aKn(a)) _.g_awi(g);
    }
    async g_aJR(g) {
      const a = g.tag,
        _ = g.vol,
        n = g.duration,
        t = g.stopOnEnd;
      await this.g_aKO(a);
      for (const e of this.g_aKn(a)) e.g_awj(_, n, t);
      this.g_aKP();
    }
    g_aJS(e) {
      this.g_avu = e.vol;
      for (const a of this.g_aJu) a.g_aKX();
    }
    g_aJT(e) {
      const a = e.tag,
        g = e.isMuted;
      for (const _ of this.g_aKn(a)) _.g_awh(g);
    }
    g_aJU(e) {
      (this.g_avv = e.isSilent), this.g_aHa.g_awp(this.g_avv);
      for (const a of this.g_aJu) a.g_aKY();
    }
    g_aJV(e) {
      const a = e.tag,
        g = e.isLooping;
      for (const _ of this.g_aKn(a)) _.g_awg(g);
    }
    g_aJW(e) {
      const a = e.tag,
        g = e.rate;
      for (const _ of this.g_aKn(a)) _.g_Jq(g);
    }
    g_aJX(e) {
      const a = e.tag,
        g = e.pos;
      for (const _ of this.g_aKn(a)) _.g_awo(g);
    }
    async g_aJY(g) {
      const a = g.originalUrl,
        _ = g.url,
        n = g.type,
        t = g.isMusic;
      try {
        await this.g_aKI(a, _, n, "", t);
      } catch (e) {
        console.error("[Construct 3] Audio: error preloading: ", e);
      }
    }
    async g_FW(g) {
      const a = g.url,
        _ = g.type,
        n = g.isMusic,
        t = await this.g_aKe("", a, _, n, !0);
      if (t) {
        t.g_eN();
        const e = this.g_aJt.indexOf(t);
        -1 !== e && this.g_aJt.splice(e, 1);
      }
    }
    g_aJZ() {
      for (const e of this.g_aJt) e.g_eN();
      this.g_aJt.length = 0;
    }
    g_aJ_(e) {
      const a = e.isSuspended;
      !a && this.g_aJo.resume && this.g_aJo.resume();
      for (const g of this.g_aJu) g.g_ahO(a);
      a && this.g_aJo.suspend && this.g_aJo.suspend();
    }
    g_Ll(e) {
      if (((this.g_aaF = e.timeScale), (this.g_agC = e.gameTime), (this.g_aJx = e.tickCount), 0 !== this.g_avh)) for (const e of this.g_aJu) e.g_aKZ();
      const a = e.listenerPos;
      a && this.g_aJo.listener.setPosition(a[0], a[1], a[2]);
      for (const g of e.instPans) {
        const e = g.uid;
        for (const a of this.g_aJu) a.g_CJ() === e && a.g_aK_(g.x, g.y, g.angle);
      }
    }
    async g_aJ$(g) {
      const a = g.type,
        _ = g.tag,
        n = g.params;
      let t;
      if ("filter" === a) t = new g_aK$(this, ...n);
      else if ("delay" === a) t = new g_aLa(this, ...n);
      else if ("convolution" === a) {
        let a = null;
        try {
          a = await this.g_aKe(g.bufferOriginalUrl, g.bufferUrl, g.bufferType, !1);
        } catch (e) {
          return void console.log("[Construct 3] Audio: error loading convolution: ", e);
        }
        (t = new g_aLb(this, a.g_aLc(), ...n)), t.g_aLd(g.bufferOriginalUrl, g.bufferUrl, g.bufferType);
      } else if ("flanger" === a) t = new g_aLe(this, ...n);
      else if ("phaser" === a) t = new g_aLf(this, ...n);
      else if ("gain" === a) t = new g_aLg(this, ...n);
      else if ("tremolo" === a) t = new g_aLh(this, ...n);
      else if ("ringmod" === a) t = new g_aLi(this, ...n);
      else if ("distortion" === a) t = new g_aLj(this, ...n);
      else if ("compressor" === a) t = new g_aLk(this, ...n);
      else if ("analyser" === a) t = new g_aLl(this, ...n);
      else throw new Error("invalid effect type");
      this.g_aKj(_, t), this.g_aLm();
    }
    g_aKa(_) {
      const a = _.tag,
        n = _.index,
        t = _.param,
        i = _.value,
        e = _.ramp,
        o = _.time,
        g = this.g_aJD.get(a);
      !g || 0 > n || n >= g.length || (g[n].g_aLn(t, i, e, o), this.g_aLm());
    }
    g_aKb(e) {
      const a = e.tag.toLowerCase(),
        g = this.g_aJD.get(a);
      if (g && g.length) {
        for (const e of g) e.g_eN();
        this.g_aJD.delete(a), this.g_aKl(a);
      }
    }
    g_aLo(e) {
      this.g_aJE.add(e), this.g_aKP();
    }
    g_aLp(e) {
      this.g_aJE.delete(e);
    }
    g_aLm() {
      this.g_aJF || ((this.g_aJF = !0), Promise.resolve().then(() => this.g_aLq()));
    }
    g_aLq() {
      const e = {};
      for (const [a, g] of this.g_aJD) e[a] = g.map((e) => e.g_aKQ());
      this.g_aHe("fxstate", { fxstate: e }), (this.g_aJF = !1);
    }
    async g_aKc(e) {
      const g = e.saveLoadMode;
      if (3 !== g) for (const e of this.g_aJu) (e.g_aKD() && 1 === g) || (!e.g_aKD() && 2 === g) || e.g_Jk();
      for (const g of this.g_aJD.values()) for (const e of g) e.g_eN();
      this.g_aJD.clear(), (this.g_aaF = e.timeScale), (this.g_agC = e.gameTime);
      const a = e.listenerPos;
      this.g_aJo.listener.setPosition(a[0], a[1], a[2]), (this.g_avv = e.isSilent), this.g_aHa.g_awp(this.g_avv), (this.g_avu = e.masterVolume);
      const _ = [];
      for (const a of Object.values(e.effects)) _.push(Promise.all(a.map((e) => this.g_aJ$(e))));
      await Promise.all(_), await Promise.all(e.playing.map((e) => this.g_aLr(e, g))), this.g_aKP();
    }
    async g_aLr(_, a) {
      if (3 === a) return;
      const n = _.bufferOriginalUrl,
        t = _.bufferUrl,
        o = _.bufferType,
        e = _.isMusic,
        r = _.tag,
        g = _.isLooping,
        d = _.volume,
        i = _.playbackTime;
      if (e && 1 === a) return;
      if (!e && 2 === a) return;
      let s = null;
      try {
        s = await this.g_aKI(n, t, o, r, e);
      } catch (e) {
        return void console.error("[Construct 3] Audio: error loading audio state: ", e);
      }
      s.g_aLs(_.pan), s.g_Jt(g, d, i, 0), _.isPlaying || s.g_aKW(), s.g_aLt(_);
    }
    g_aJI(e, a) {
      this.g_aJH && this.g_aJH.disconnect(), (this.g_aJG = a.toLowerCase()), (this.g_aJH = this.g_aJo.createMediaStreamSource(e)), this.g_aJH.connect(this.g_aKh(this.g_aJG));
    }
    g_aJK() {
      return this.g_aJJ || ((this.g_aJJ = this.g_aJo.createMediaStreamDestination()), this.g_aJp.connect(this.g_aJJ)), this.g_aJJ.stream;
    }
  };
  g_aHI.g_aIB(a);
}
"use strict",
  (self.g_aKH = class {
    constructor(g, a, _, n, t) {
      (this.g_aLu = g), (this.g_aLv = a), (this.g_Bf = _), (this.g_kA = n), (this.g_aLw = t), (this.g_aLx = ""), (this.g_aLy = "not-loaded"), (this.g_Bk = null);
    }
    g_eN() {
      (this.g_aLy = "not-loaded"), (this.g_aLu = null), (this.g_Bk = null);
    }
    static g_pM(g, a, _, n, t) {
      const e = "audio/webm; codecs=opus" === n && !g.g_aKs();
      return t && e && g.g_aKt(), !t || g.g_aKr() || e ? new g_aLz(g, a, _, n, t, e) : new g_aLA(g, a, _, n, t);
    }
    g_ahH(e) {
      return "html5" === this.g_aLx ? new g_aLB(this.g_aLu, this, e) : new g_aLC(this.g_aLu, this, e);
    }
    g_FQ() {}
    g_AK() {
      return this.g_Bk || (this.g_Bk = this.g_FQ()), this.g_Bk;
    }
    g_Bl() {}
    g_aLD() {}
    g_aLE() {
      return "failed" === this.g_aLy;
    }
    g_aKf() {
      return this.g_aLu.g_aKf();
    }
    g_aLF() {
      return this.g_aLx;
    }
    g_aLG() {
      return this.g_aLv;
    }
    g_aKG() {
      return this.g_Bf;
    }
    g_aLH() {
      return this.g_kA;
    }
    g_aKD() {
      return this.g_aLw;
    }
    g__F() {}
  }),
  "use strict",
  (self.g_aLA = class extends g_aKH {
    constructor(g, a, _, n, t) {
      super(g, a, _, n, t),
        (this.g_aLx = "html5"),
        (this.g_aLI = new Audio()),
        (this.g_aLI.crossOrigin = "anonymous"),
        (this.g_aLI.autoplay = !1),
        (this.g_aLI.preload = "auto"),
        (this.g_aLJ = null),
        (this.g_aLK = null),
        (this.g_aLL = !1),
        this.g_aLI.addEventListener("canplaythrough", () => (this.g_aLL = !0)),
        (this.g_aLM = this.g_aKf().createGain()),
        (this.g_aLN = null),
        this.g_aLI.addEventListener("canplay", () => {
          this.g_aLJ && ((this.g_aLy = "loaded"), this.g_aLJ(), (this.g_aLJ = null), (this.g_aLK = null)), this.g_aLN || !this.g_aLI || ((this.g_aLN = this.g_aKf().createMediaElementSource(this.g_aLI)), this.g_aLN.connect(this.g_aLM));
        }),
        (this.onended = null),
        this.g_aLI.addEventListener("ended", () => {
          this.onended && this.onended();
        }),
        this.g_aLI.addEventListener("error", (e) => this.g_aCL(e));
    }
    g_eN() {
      this.g_aLu.g_aKA(this), this.g_aLM.disconnect(), (this.g_aLM = null), this.g_aLN.disconnect(), (this.g_aLN = null), this.g_aLI && !this.g_aLI.paused && this.g_aLI.pause(), (this.onended = null), (this.g_aLI = null), super.g_eN();
    }
    g_FQ() {
      return (
        (this.g_aLy = "loading"),
        new Promise((e, a) => {
          (this.g_aLJ = e), (this.g_aLK = a), (this.g_aLI.src = this.g_Bf);
        })
      );
    }
    g_aCL(e) {
      console.error(`[Construct 3] Audio '${this.g_Bf}' error: `, e), this.g_aLK && ((this.g_aLy = "failed"), this.g_aLK(e), (this.g_aLJ = null), (this.g_aLK = null));
    }
    g_Bl() {
      const e = 4 <= this.g_aLI.readyState;
      return e && (this.g_aLL = !0), e || this.g_aLL;
    }
    g_aLD() {
      return this.g_Bl();
    }
    g_aLO() {
      return this.g_aLI;
    }
    g_aLP() {
      return this.g_aLM;
    }
    g__F() {
      return this.g_aLI.duration;
    }
  }),
  "use strict",
  (self.g_aLz = class extends g_aKH {
    constructor(g, a, _, n, t, e) {
      super(g, a, _, n, t), (this.g_aLx = "webaudio"), (this.g_aLQ = null), (this.g_aLR = null), (this.g_aLS = !!e);
    }
    g_eN() {
      this.g_aLu.g_aKA(this), (this.g_aLQ = null), (this.g_aLR = null), super.g_eN();
    }
    async g_aLT() {
      if (this.g_aLQ) return this.g_aLQ;
      const e = this.g_aLu.g_aHo();
      if ("cordova" === e.g_AD() && e.g_gq(this.g_Bf)) this.g_aLQ = await e.g_Az(this.g_Bf);
      else {
        const e = await fetch(this.g_Bf);
        if (!e.ok) throw new Error(`error fetching audio data: ${e.status} ${e.statusText}`);
        this.g_aLQ = await e.arrayBuffer();
      }
    }
    async g_aLU() {
      return this.g_aLR ? this.g_aLR : void ((this.g_aLR = await this.g_aLu.g_aKz(this.g_aLQ, this.g_aLS)), (this.g_aLQ = null));
    }
    async g_FQ() {
      try {
        (this.g_aLy = "loading"), await this.g_aLT(), await this.g_aLU(), (this.g_aLy = "loaded");
      } catch (e) {
        (this.g_aLy = "failed"), console.error(`[Construct 3] Failed to load audio '${this.g_Bf}': `, e);
      }
    }
    g_Bl() {
      return !!(this.g_aLQ || this.g_aLR);
    }
    g_aLD() {
      return !!this.g_aLR;
    }
    g_aLc() {
      return this.g_aLR;
    }
    g__F() {
      return this.g_aLR ? this.g_aLR.duration : 0;
    }
  }),
  "use strict";
{
  function _(g) {
    return g * e;
  }
  const e = 180 / Math.PI;
  self.g_aLV = class {
    constructor(e, a, g) {
      (this.g_aLu = e),
        (this.g_vs = a),
        (this.g_aLW = g),
        (this.g_aLX = this.g_aKf().createGain()),
        this.g_aLX.connect(this.g_aKg()),
        (this.g_aLY = null),
        (this.g_aLZ = !1),
        (this.g_OL = !0),
        (this.g_aL_ = !1),
        (this.g_aL$ = !1),
        (this.g_UE = !1),
        (this.g_aMa = 1),
        (this.g_aMb = !1),
        (this.g_H$ = 1);
      const _ = this.g_aLu.g_aKq();
      (this.g_aMc = (1 === _ && !this.g_aKD()) || 2 === _), (this.g_aMd = -1), (this.g_aMe = -1), (this.g_aMf = !1);
    }
    g_eN() {
      (this.g_aLu = null), (this.g_vs = null), this.g_aLY && (this.g_aLY.disconnect(), (this.g_aLY = null)), this.g_aLX.disconnect(), (this.g_aLX = null);
    }
    g_aKf() {
      return this.g_aLu.g_aKf();
    }
    g_aKg() {
      return this.g_aLu.g_aKh(this.g_aLW);
    }
    g_aKp() {
      return this.g_aLu.g_aKp();
    }
    g_aMg() {
      return this.g_aMc ? this.g_aLu.g_EK() : performance.now() / 1e3;
    }
    g_aLG() {
      return this.g_vs.g_aLG();
    }
    g_aKG() {
      return this.g_vs.g_aKG();
    }
    g_aLH() {
      return this.g_vs.g_aLH();
    }
    g_aKB() {
      return this.g_vs;
    }
    g_aKD() {
      return this.g_vs.g_aKD();
    }
    g_aKK(e) {
      this.g_aLW = e;
    }
    g_aKE() {
      return this.g_aLW;
    }
    g_aKF() {}
    g_aKJ() {}
    g_IX() {
      return !this.g_OL && !this.g_aL_ && !this.g_aKF();
    }
    g_Rw() {
      return !this.g_OL && !this.g_aKF();
    }
    g_aMh() {}
    g__F(e) {
      let a = this.g_vs.g__F();
      return e && (a /= this.g_H$ || 0.001), a;
    }
    g_Jt() {}
    g_Jk() {}
    g_aKW() {}
    g_aMi() {
      return this.g_aL_;
    }
    g_Js() {}
    g_awi(e) {
      (this.g_aMa = e), this.g_aLX.gain.cancelScheduledValues(0), (this.g_aMe = -1), (this.g_aLX.gain.value = this.g_aMj());
    }
    g_awj(g, a, _) {
      if (!this.g_aMk()) {
        const n = this.g_aLX.gain;
        n.cancelScheduledValues(0);
        const t = this.g_aLu.g_aKd(),
          e = t + a;
        n.setValueAtTime(this.g_aMa, t), n.linearRampToValueAtTime(g, e), (this.g_aMa = g), (this.g_aMe = e), (this.g_aMf = _);
      }
    }
    g_aKX() {
      this.g_awi(this.g_aMa);
    }
    g_Jv(e) {
      -1 !== this.g_aMe && e >= this.g_aMe && ((this.g_aMe = -1), this.g_aMf && this.g_Jk(), this.g_aLu.g_aKS("fade-ended", this.g_aLW));
    }
    g_aMj() {
      const e = this.g_aMa * this.g_aKp();
      return isFinite(e) ? e : 0;
    }
    g_awh(e) {
      (e = !!e), this.g_aMb === e || ((this.g_aMb = e), this.g_aKY());
    }
    g_aMk() {
      return this.g_aMb;
    }
    g_av_() {
      return this.g_aLu.g_av_();
    }
    g_aKY() {}
    g_awg() {}
    g_SU() {
      return this.g_UE;
    }
    g_Jq(e) {
      this.g_H$ === e || ((this.g_H$ = e), this.g_aKZ());
    }
    g_aKZ() {}
    g_aMl() {
      return this.g_H$;
    }
    g_awo() {}
    g_ahO() {}
    g_aKT(e) {
      (e = !!e),
        this.g_aLZ === e ||
          ((this.g_aLZ = e),
          this.g_aLZ
            ? (!this.g_aLY &&
                ((this.g_aLY = this.g_aKf().createPanner()),
                (this.g_aLY.panningModel = this.g_aLu.g_aKu()),
                (this.g_aLY.distanceModel = this.g_aLu.g_aKv()),
                (this.g_aLY.refDistance = this.g_aLu.g_aKw()),
                (this.g_aLY.maxDistance = this.g_aLu.g_aKx()),
                (this.g_aLY.rolloffFactor = this.g_aLu.g_aKy())),
              this.g_aLX.disconnect(),
              this.g_aLX.connect(this.g_aLY),
              this.g_aLY.connect(this.g_aKg()))
            : (this.g_aLY.disconnect(), this.g_aLX.disconnect(), this.g_aLX.connect(this.g_aKg())));
    }
    g_aKU(a, n, t, i, e, o) {
      this.g_aLZ && (this.g_aK_(a, n, t), (this.g_aLY.coneInnerAngle = _(i)), (this.g_aLY.coneOuterAngle = _(e)), (this.g_aLY.coneOuterGain = o));
    }
    g_aK_(e, a, g) {
      this.g_aLZ && (this.g_aLY.setPosition(e, a, 0), this.g_aLY.setOrientation(Math.cos(g), Math.sin(g), 0));
    }
    g_aKV(e) {
      this.g_aMd = e;
    }
    g_CJ() {
      return this.g_aMd;
    }
    g_aMm() {}
    g_aKo(e) {
      const a = this.g_aLY || this.g_aLX;
      a.disconnect(), a.connect(e);
    }
    g_aKQ() {
      return {
        tag: this.g_aLW,
        duration: this.g__F(),
        volume: this.g_aMa,
        isPlaying: this.g_IX(),
        playbackTime: this.g_aMh(),
        playbackRate: this.g_aMl(),
        uid: this.g_aMd,
        bufferOriginalUrl: this.g_aLG(),
        bufferUrl: "",
        bufferType: this.g_aLH(),
        isMusic: this.g_aKD(),
        isLooping: this.g_SU(),
        isMuted: this.g_aMk(),
        resumePosition: this.g_aMm(),
        pan: this.g_aMn(),
      };
    }
    g_aLt(e) {
      this.g_Jq(e.playbackRate), this.g_awh(e.isMuted);
    }
    g_aMn() {
      if (!this.g_aLY) return null;
      const e = this.g_aLY;
      return {
        pos: [e.positionX.value, e.positionY.value, e.positionZ.value],
        orient: [e.orientationX.value, e.orientationY.value, e.orientationZ.value],
        cia: e.coneInnerAngle,
        coa: e.coneOuterAngle,
        cog: e.coneOuterGain,
        uid: this.g_aMd,
      };
    }
    g_aLs(e) {
      if (!e) return void this.g_aKT(!1);
      this.g_aKT(!0);
      const a = this.g_aLY;
      a.setPosition(...a.pos), a.setOrientation(...a.orient), (a.coneInnerAngle = a.cia), (a.coneOuterAngle = a.coa), (a.coneOuterGain = a.cog), (this.g_aMd = a.uid);
    }
  };
}
"use strict",
  (self.g_aLB = class extends g_aLV {
    constructor(e, a, g) {
      super(e, a, g), this.g_vs.g_aLP().connect(this.g_aLX), (this.g_vs.onended = () => this.g_aMo());
    }
    g_eN() {
      this.g_Jk(), this.g_vs.g_aLP().disconnect(), super.g_eN();
    }
    g_aLO() {
      return this.g_vs.g_aLO();
    }
    g_aMo() {
      (this.g_OL = !0), (this.g_aMd = -1), this.g_aLu.g_aKS("ended", this.g_aLW);
    }
    g_aKF() {
      return this.g_aLO().ended;
    }
    g_aKJ() {
      return !!this.g_OL || this.g_aKF();
    }
    g_aMh(e) {
      let a = this.g_aLO().currentTime;
      return e && (a *= this.g_H$), this.g_UE || (a = Math.min(a, this.g__F())), a;
    }
    g_Jt(e, a, g) {
      const _ = this.g_aLO();
      if ((1 !== _.playbackRate && (_.playbackRate = 1), _.loop !== e && (_.loop = e), this.g_awi(a), _.muted && (_.muted = !1), _.currentTime !== g))
        try {
          _.currentTime = g;
        } catch (e) {
          console.warn(`[Construct 3] Exception seeking audio '${this.g_vs.g_aKG()}' to position '${g}': `, e);
        }
      this.g_aLu.g_aIE(_), (this.g_OL = !1), (this.g_aL_ = !1), (this.g_UE = e), (this.g_H$ = 1);
    }
    g_Jk() {
      const e = this.g_aLO();
      e.paused || e.pause(), this.g_aLu.g_aIF(e), (this.g_OL = !0), (this.g_aL_ = !1), (this.g_aMd = -1);
    }
    g_aKW() {
      if (!(this.g_aL_ || this.g_OL || this.g_aKF())) {
        const e = this.g_aLO();
        e.paused || e.pause(), this.g_aLu.g_aIF(e), (this.g_aL_ = !0);
      }
    }
    g_Js() {
      !this.g_aL_ || this.g_OL || this.g_aKF() || (this.g_aLu.g_aIE(this.g_aLO()), (this.g_aL_ = !1));
    }
    g_aKY() {
      this.g_aLO().muted = this.g_aMb || this.g_av_();
    }
    g_awg(e) {
      (e = !!e), this.g_UE === e || ((this.g_UE = e), (this.g_aLO().loop = e));
    }
    g_aKZ() {
      let e = this.g_H$;
      this.g_aMc && (e *= this.g_aLu.g_LA());
      try {
        this.g_aLO().playbackRate = e;
      } catch (a) {
        console.warn(`[Construct 3] Unable to set playback rate '${e}':`, a);
      }
    }
    g_awo(e) {
      if (!(this.g_OL || this.g_aKF()))
        try {
          this.g_aLO().currentTime = e;
        } catch (a) {
          console.warn(`[Construct 3] Error seeking audio to '${e}': `, a);
        }
    }
    g_aMm() {
      return this.g_aMh();
    }
    g_ahO(e) {
      e ? (this.g_IX() ? (this.g_aLO().pause(), (this.g_aL$ = !0)) : (this.g_aL$ = !1)) : this.g_aL$ && (this.g_aLu.g_aIE(this.g_aLO()), (this.g_aL$ = !1));
    }
  }),
  "use strict",
  (self.g_aLC = class extends g_aLV {
    constructor(e, a, g) {
      super(e, a, g), (this.g_aMp = null), (this.g_aMq = (e) => this.g_aMo(e)), (this.g_aMr = !0), (this.g_aMs = null), (this.g_agx = 0), (this.g_aMt = 0), (this.g_aMu = 1);
    }
    g_eN() {
      this.g_Jk(), this.g_aMv(), (this.g_aMq = null), super.g_eN();
    }
    g_aMv() {
      this.g_aMp && this.g_aMp.disconnect(), (this.g_aMp = null), (this.g_aMs = null);
    }
    g_aMo(e) {
      this.g_aL_ || this.g_aL$ || e.target !== this.g_aMs || ((this.g_aMr = !0), (this.g_OL = !0), (this.g_aMd = -1), this.g_aMv(), this.g_aLu.g_aKS("ended", this.g_aLW));
    }
    g_aKF() {
      return !(!this.g_OL && this.g_aMp && this.g_aMp.loop) && !this.g_aL_ && this.g_aMr;
    }
    g_aKJ() {
      return !this.g_aMp || this.g_OL || this.g_aKF();
    }
    g_aMh(e) {
      let a = 0;
      return (a = this.g_aL_ ? this.g_aMt : this.g_aMg() - this.g_agx), e && (a *= this.g_H$), this.g_UE || (a = Math.min(a, this.g__F())), a;
    }
    g_Jt(e, a, g, _) {
      (this.g_aMu = 1),
        this.g_awi(a),
        this.g_aMv(),
        (this.g_aMp = this.g_aKf().createBufferSource()),
        (this.g_aMp.buffer = this.g_vs.g_aLc()),
        this.g_aMp.connect(this.g_aLX),
        (this.g_aMs = this.g_aMp),
        (this.g_aMp.onended = this.g_aMq),
        (this.g_aMp.loop = e),
        this.g_aMp.start(_, g),
        (this.g_aMr = !1),
        (this.g_OL = !1),
        (this.g_aL_ = !1),
        (this.g_UE = e),
        (this.g_H$ = 1),
        (this.g_agx = this.g_aMg() - g);
    }
    g_Jk() {
      this.g_aMp && this.g_aMp.stop(0), (this.g_OL = !0), (this.g_aL_ = !1), (this.g_aMd = -1);
    }
    g_aKW() {
      this.g_aL_ || this.g_OL || this.g_aKF() || ((this.g_aMt = this.g_aMh(!0)), this.g_UE && (this.g_aMt %= this.g__F()), (this.g_aL_ = !0), this.g_aMp.stop(0));
    }
    g_Js() {
      !this.g_aL_ ||
        this.g_OL ||
        this.g_aKF() ||
        (this.g_aMv(),
        (this.g_aMp = this.g_aKf().createBufferSource()),
        (this.g_aMp.buffer = this.g_vs.g_aLc()),
        this.g_aMp.connect(this.g_aLX),
        (this.g_aMs = this.g_aMp),
        (this.g_aMp.onended = this.g_aMq),
        (this.g_aMp.loop = this.g_UE),
        this.g_aKX(),
        this.g_aKZ(),
        (this.g_agx = this.g_aMg() - this.g_aMt / (this.g_H$ || 0.001)),
        this.g_aMp.start(0, this.g_aMt),
        (this.g_aL_ = !1));
    }
    g_aMj() {
      return super.g_aMj() * this.g_aMu;
    }
    g_aKY() {
      (this.g_aMu = this.g_aMb || this.g_av_() ? 0 : 1), this.g_aKX();
    }
    g_awg(e) {
      (e = !!e), this.g_UE === e || ((this.g_UE = e), this.g_aMp && (this.g_aMp.loop = e));
    }
    g_aKZ() {
      let e = this.g_H$;
      this.g_aMc && (e *= this.g_aLu.g_LA()), this.g_aMp && (this.g_aMp.playbackRate.value = e);
    }
    g_awo(e) {
      this.g_OL || this.g_aKF() || (this.g_aL_ ? (this.g_aMt = e) : (this.g_aKW(), (this.g_aMt = e), this.g_Js()));
    }
    g_aMm() {
      return this.g_aMt;
    }
    g_ahO(e) {
      e
        ? this.g_IX()
          ? ((this.g_aL$ = !0), (this.g_aMt = this.g_aMh(!0)), this.g_UE && (this.g_aMt %= this.g__F()), this.g_aMp.stop(0))
          : (this.g_aL$ = !1)
        : this.g_aL$ &&
          (this.g_aMv(),
          (this.g_aMp = this.g_aKf().createBufferSource()),
          (this.g_aMp.buffer = this.g_vs.g_aLc()),
          this.g_aMp.connect(this.g_aLX),
          (this.g_aMs = this.g_aMp),
          (this.g_aMp.onended = this.g_aMq),
          (this.g_aMp.loop = this.g_UE),
          this.g_aKX(),
          this.g_aKZ(),
          (this.g_agx = this.g_aMg() - this.g_aMt / (this.g_H$ || 0.001)),
          this.g_aMp.start(0, this.g_aMt),
          (this.g_aL$ = !1));
    }
    g_aLt(e) {
      super.g_aLt(e), (this.g_aMt = e.resumePosition);
    }
  }),
  "use strict";
{
  function g(e) {
    return Math.pow(10, e / 20);
  }
  function _(a) {
    return Math.max(Math.min(g(a), 1), 0);
  }
  function n(e) {
    return 20 * (Math.log(e) / 2.302585092994046);
  }
  function t(e) {
    return n(Math.max(Math.min(e, 1), 0));
  }
  function i(e, a) {
    return 1 - Math.exp(-a * e);
  }
  class a {
    constructor(e) {
      (this.g_aLu = e), (this.g_aJo = e.g_aKf()), (this.g_BU = -1), (this.g_aLW = ""), (this.g_kA = ""), (this.g_aMw = null);
    }
    g_eN() {
      this.g_aJo = null;
    }
    g_acq(e) {
      this.g_BU = e;
    }
    g_Dl() {
      return this.g_BU;
    }
    g_aKk(e) {
      this.g_aLW = e;
    }
    g_aKE() {
      return this.g_aLW;
    }
    g_aMx() {
      return this.g_aJo.createGain();
    }
    g_aKi() {}
    g_aKm() {}
    g_aMy(g, a, _, n) {
      if ((g.cancelScheduledValues(0), 0 === n)) return void (g.value = a);
      const t = this.g_aJo.currentTime;
      (n += t), 0 === _ ? g.setValueAtTime(a, n) : 1 === _ ? (g.setValueAtTime(g.value, t), g.linearRampToValueAtTime(a, n)) : 2 === _ ? (g.setValueAtTime(g.value, t), g.exponentialRampToValueAtTime(a, n)) : void 0;
    }
    g_aKQ() {
      return { type: this.g_kA, tag: this.g_aLW, params: this.g_aMw };
    }
  }
  (self.g_aK$ = class extends a {
    constructor(_, a, n, t, i, e, o) {
      super(_),
        (this.g_kA = "filter"),
        (this.g_aMw = [a, n, t, i, e, o]),
        (this.g_aMz = this.g_aMx()),
        (this.g_aMA = this.g_aMx()),
        (this.g_aMA.gain.value = o),
        (this.g_aMB = this.g_aMx()),
        (this.g_aMB.gain.value = 1 - o),
        (this.g_aMC = this.g_aJo.createBiquadFilter()),
        (this.g_aMC.type = a),
        (this.g_aMC.frequency.value = n),
        (this.g_aMC.detune.value = t),
        (this.g_aMC.Q.value = i),
        (this.g_aMC.gain.vlaue = e),
        this.g_aMz.connect(this.g_aMC),
        this.g_aMz.connect(this.g_aMB),
        this.g_aMC.connect(this.g_aMA);
    }
    g_eN() {
      this.g_aMz.disconnect(), this.g_aMC.disconnect(), this.g_aMA.disconnect(), this.g_aMB.disconnect(), super.g_eN();
    }
    g_aKm(e) {
      this.g_aMA.disconnect(), this.g_aMA.connect(e), this.g_aMB.disconnect(), this.g_aMB.connect(e);
    }
    g_aKi() {
      return this.g_aMz;
    }
    g_aLn(e, a, g, _) {
      0 === e
        ? ((a = Math.max(Math.min(a / 100, 1), 0)), (this.g_aMw[5] = a), this.g_aMy(this.g_aMA.gain, a, g, _), this.g_aMy(this.g_aMB.gain, 1 - a, g, _))
        : 1 === e
        ? ((this.g_aMw[1] = a), this.g_aMy(this.g_aMC.frequency, a, g, _))
        : 2 === e
        ? ((this.g_aMw[2] = a), this.g_aMy(this.g_aMC.detune, a, g, _))
        : 3 === e
        ? ((this.g_aMw[3] = a), this.g_aMy(this.g_aMC.Q, a, g, _))
        : 4 === e
        ? ((this.g_aMw[4] = a), this.g_aMy(this.g_aMC.gain, a, g, _))
        : void 0;
    }
  }),
    (self.g_aLa = class extends a {
      constructor(e, a, g, _) {
        super(e),
          (this.g_kA = "delay"),
          (this.g_aMw = [a, g, _]),
          (this.g_aMz = this.g_aMx()),
          (this.g_aMA = this.g_aMx()),
          (this.g_aMA.gain.value = _),
          (this.g_aMB = this.g_aMx()),
          (this.g_aMB.gain.value = 1 - _),
          (this.g_aMD = this.g_aMx()),
          (this.g_aME = this.g_aJo.createDelay(a)),
          (this.g_aME.delayTime.value = a),
          (this.g_aMF = this.g_aMx()),
          (this.g_aMF.gain.value = g),
          this.g_aMz.connect(this.g_aMD),
          this.g_aMz.connect(this.g_aMB),
          this.g_aMD.connect(this.g_aMA),
          this.g_aMD.connect(this.g_aME),
          this.g_aME.connect(this.g_aMF),
          this.g_aMF.connect(this.g_aMD);
      }
      g_eN() {
        this.g_aMz.disconnect(), this.g_aMA.disconnect(), this.g_aMB.disconnect(), this.g_aMD.disconnect(), this.g_aME.disconnect(), this.g_aMF.disconnect(), super.g_eN();
      }
      g_aKm(e) {
        this.g_aMA.disconnect(), this.g_aMA.connect(e), this.g_aMB.disconnect(), this.g_aMB.connect(e);
      }
      g_aKi() {
        return this.g_aMz;
      }
      g_aLn(g, a, n, t) {
        0 === g
          ? ((a = Math.max(Math.min(a / 100, 1), 0)), (this.g_aMw[2] = a), this.g_aMy(this.g_aMA.gain, a, n, t), this.g_aMy(this.g_aMB.gain, 1 - a, n, t))
          : 4 === g
          ? ((this.g_aMw[1] = _(a)), this.g_aMy(this.g_aMF.gain, _(a), n, t))
          : 5 === g
          ? ((this.g_aMw[0] = a), this.g_aMy(this.g_aME.delayTime, a, n, t))
          : void 0;
      }
    }),
    (self.g_aLb = class extends a {
      constructor(e, a, g, _) {
        super(e),
          (this.g_kA = "convolution"),
          (this.g_aMw = [g, _]),
          (this.g_aMG = ""),
          (this.g_aMH = ""),
          (this.g_aMI = ""),
          (this.g_aMz = this.g_aMx()),
          (this.g_aMA = this.g_aMx()),
          (this.g_aMA.gain.value = _),
          (this.g_aMB = this.g_aMx()),
          (this.g_aMB.gain.value = 1 - _),
          (this.g_aMJ = this.g_aJo.createConvolver()),
          (this.g_aMJ.normalize = g),
          (this.g_aMJ.buffer = a),
          this.g_aMz.connect(this.g_aMJ),
          this.g_aMz.connect(this.g_aMB),
          this.g_aMJ.connect(this.g_aMA);
      }
      g_eN() {
        this.g_aMz.disconnect(), this.g_aMJ.disconnect(), this.g_aMA.disconnect(), this.g_aMB.disconnect(), super.g_eN();
      }
      g_aKm(e) {
        this.g_aMA.disconnect(), this.g_aMA.connect(e), this.g_aMB.disconnect(), this.g_aMB.connect(e);
      }
      g_aKi() {
        return this.g_aMz;
      }
      g_aLn(e, a, g, _) {
        0 === e ? ((a = Math.max(Math.min(a / 100, 1), 0)), (this.g_aMw[1] = a), this.g_aMy(this.g_aMA.gain, a, g, _), this.g_aMy(this.g_aMB.gain, 1 - a, g, _)) : void 0;
      }
      g_aLd(e, a, g) {
        (this.g_aMG = e), (this.g_aMH = a), (this.g_aMI = g);
      }
      g_aKQ() {
        const e = super.g_aKQ();
        return (e.bufferOriginalUrl = this.g_aMG), (e.bufferUrl = ""), (e.bufferType = this.g_aMI), e;
      }
    }),
    (self.g_aLe = class extends a {
      constructor(g, a, _, n, t, e) {
        super(g),
          (this.g_kA = "flanger"),
          (this.g_aMw = [a, _, n, t, e]),
          (this.g_aMz = this.g_aMx()),
          (this.g_aMB = this.g_aMx()),
          (this.g_aMB.gain.value = 1 - e / 2),
          (this.g_aMA = this.g_aMx()),
          (this.g_aMA.gain.value = e / 2),
          (this.g_aMK = this.g_aMx()),
          (this.g_aMK.gain.value = t),
          (this.g_aME = this.g_aJo.createDelay(a + _)),
          (this.g_aME.delayTime.value = a),
          (this.g_aML = this.g_aJo.createOscillator()),
          (this.g_aML.frequency.value = n),
          (this.g_aMM = this.g_aMx()),
          (this.g_aMM.gain.value = _),
          this.g_aMz.connect(this.g_aME),
          this.g_aMz.connect(this.g_aMB),
          this.g_aME.connect(this.g_aMA),
          this.g_aME.connect(this.g_aMK),
          this.g_aMK.connect(this.g_aME),
          this.g_aML.connect(this.g_aMM),
          this.g_aMM.connect(this.g_aME.delayTime),
          this.g_aML.start(0);
      }
      g_eN() {
        this.g_aML.stop(0), this.g_aMz.disconnect(), this.g_aME.disconnect(), this.g_aML.disconnect(), this.g_aMM.disconnect(), this.g_aMB.disconnect(), this.g_aMA.disconnect(), this.g_aMK.disconnect(), super.g_eN();
      }
      g_aKm(e) {
        this.g_aMA.disconnect(), this.g_aMA.connect(e), this.g_aMB.disconnect(), this.g_aMB.connect(e);
      }
      g_aKi() {
        return this.g_aMz;
      }
      g_aLn(e, a, g, _) {
        0 === e
          ? ((a = Math.max(Math.min(a / 100, 1), 0)), (this.g_aMw[4] = a), this.g_aMy(this.g_aMA.gain, a / 2, g, _), this.g_aMy(this.g_aMB.gain, 1 - a / 2, g, _))
          : 6 === e
          ? ((this.g_aMw[1] = a / 1e3), this.g_aMy(this.g_aMM.gain, a / 1e3, g, _))
          : 7 === e
          ? ((this.g_aMw[2] = a), this.g_aMy(this.g_aML.frequency, a, g, _))
          : 8 === e
          ? ((this.g_aMw[3] = a / 100), this.g_aMy(this.g_aMK.gain, a / 100, g, _))
          : void 0;
      }
    }),
    (self.g_aLf = class extends a {
      constructor(_, a, n, t, i, e, o) {
        super(_),
          (this.g_kA = "phaser"),
          (this.g_aMw = [a, n, t, i, e, o]),
          (this.g_aMz = this.g_aMx()),
          (this.g_aMB = this.g_aMx()),
          (this.g_aMB.gain.value = 1 - o / 2),
          (this.g_aMA = this.g_aMx()),
          (this.g_aMA.gain.value = o / 2),
          (this.g_aMC = this.g_aJo.createBiquadFilter()),
          (this.g_aMC.type = "allpass"),
          (this.g_aMC.frequency.value = a),
          (this.g_aMC.detune.value = n),
          (this.g_aMC.Q.value = t),
          (this.g_aML = this.g_aJo.createOscillator()),
          (this.g_aML.frequency.value = e),
          (this.g_aMM = this.g_aMx()),
          (this.g_aMM.gain.value = i),
          this.g_aMz.connect(this.g_aMC),
          this.g_aMz.connect(this.g_aMB),
          this.g_aMC.connect(this.g_aMA),
          this.g_aML.connect(this.g_aMM),
          this.g_aMM.connect(this.g_aMC.frequency),
          this.g_aML.start(0);
      }
      g_eN() {
        this.g_aML.stop(0), this.g_aMz.disconnect(), this.g_aMC.disconnect(), this.g_aML.disconnect(), this.g_aMM.disconnect(), this.g_aMB.disconnect(), this.g_aMA.disconnect(), super.g_eN();
      }
      g_aKm(e) {
        this.g_aMA.disconnect(), this.g_aMA.connect(e), this.g_aMB.disconnect(), this.g_aMB.connect(e);
      }
      g_aKi() {
        return this.g_aMz;
      }
      g_aLn(e, a, g, _) {
        0 === e
          ? ((a = Math.max(Math.min(a / 100, 1), 0)), (this.g_aMw[5] = a), this.g_aMy(this.g_aMA.gain, a / 2, g, _), this.g_aMy(this.g_aMB.gain, 1 - a / 2, g, _))
          : 1 === e
          ? ((this.g_aMw[0] = a), this.g_aMy(this.g_aMC.frequency, a, g, _))
          : 2 === e
          ? ((this.g_aMw[1] = a), this.g_aMy(this.g_aMC.detune, a, g, _))
          : 3 === e
          ? ((this.g_aMw[2] = a), this.g_aMy(this.g_aMC.Q, a, g, _))
          : 6 === e
          ? ((this.g_aMw[3] = a), this.g_aMy(this.g_aMM.gain, a, g, _))
          : 7 === e
          ? ((this.g_aMw[4] = a), this.g_aMy(this.g_aML.frequency, a, g, _))
          : void 0;
      }
    }),
    (self.g_aLg = class extends a {
      constructor(e, a) {
        super(e), (this.g_kA = "gain"), (this.g_aMw = [a]), (this.g_aMN = this.g_aMx()), (this.g_aMN.gain.value = a);
      }
      g_eN() {
        this.g_aMN.disconnect(), super.g_eN();
      }
      g_aKm(e) {
        this.g_aMN.disconnect(), this.g_aMN.connect(e);
      }
      g_aKi() {
        return this.g_aMN;
      }
      g_aLn(g, a, n, t) {
        4 === g ? ((this.g_aMw[0] = _(a)), this.g_aMy(this.g_aMN.gain, _(a), n, t)) : void 0;
      }
    }),
    (self.g_aLh = class extends a {
      constructor(e, a, g) {
        super(e),
          (this.g_kA = "tremolo"),
          (this.g_aMw = [a, g]),
          (this.g_aMN = this.g_aMx()),
          (this.g_aMN.gain.value = 1 - g / 2),
          (this.g_aML = this.g_aJo.createOscillator()),
          (this.g_aML.frequency.value = a),
          (this.g_aMM = this.g_aMx()),
          (this.g_aMM.gain.value = g / 2),
          this.g_aML.connect(this.g_aMM),
          this.g_aMM.connect(this.g_aMN.gain),
          this.g_aML.start(0);
      }
      g_eN() {
        this.g_aML.stop(0), this.g_aML.disconnect(), this.g_aMM.disconnect(), this.g_aMN.disconnect(), super.g_eN();
      }
      g_aKm(e) {
        this.g_aMN.disconnect(), this.g_aMN.connect(e);
      }
      g_aKi() {
        return this.g_aMN;
      }
      g_aLn(e, a, g, _) {
        0 === e
          ? ((a = Math.max(Math.min(a / 100, 1), 0)), (this.g_aMw[1] = a), this.g_aMy(this.g_aMN.gain.value, 1 - a / 2, g, _), this.g_aMy(this.g_aMM.gain.value, a / 2, g, _))
          : 7 === e
          ? ((this.g_aMw[0] = a), this.g_aMy(this.g_aML.frequency, a, g, _))
          : void 0;
      }
    }),
    (self.g_aLi = class extends a {
      constructor(e, a, g) {
        super(e),
          (this.g_kA = "ringmod"),
          (this.g_aMw = [a, g]),
          (this.g_aMz = this.g_aMx()),
          (this.g_aMA = this.g_aMx()),
          (this.g_aMA.gain.value = g),
          (this.g_aMB = this.g_aMx()),
          (this.g_aMB.gain.value = 1 - g),
          (this.g_aMO = this.g_aMx()),
          (this.g_aMO.gain.value = 0),
          (this.g_aML = this.g_aJo.createOscillator()),
          (this.g_aML.frequency.value = a),
          this.g_aML.connect(this.g_aMO.gain),
          this.g_aML.start(0),
          this.g_aMz.connect(this.g_aMO),
          this.g_aMz.connect(this.g_aMB),
          this.g_aMO.connect(this.g_aMA);
      }
      g_eN() {
        this.g_aML.stop(0), this.g_aML.disconnect(), this.g_aMO.disconnect(), this.g_aMz.disconnect(), this.g_aMA.disconnect(), this.g_aMB.disconnect(), super.g_eN();
      }
      g_aKm(e) {
        this.g_aMA.disconnect(), this.g_aMA.connect(e), this.g_aMB.disconnect(), this.g_aMB.connect(e);
      }
      g_aKi() {
        return this.g_aMz;
      }
      g_aLn(e, a, g, _) {
        0 === e
          ? ((a = Math.max(Math.min(a / 100, 1), 0)), (this.g_aMw[1] = a), this.g_aMy(this.g_aMA.gain, a, g, _), this.g_aMy(this.g_aMB.gain, 1 - a, g, _))
          : 7 === e
          ? ((this.g_aMw[0] = a), this.g_aMy(this.g_aML.frequency, a, g, _))
          : void 0;
      }
    }),
    (self.g_aLj = class extends a {
      constructor(g, a, _, n, t, e) {
        super(g),
          (this.g_kA = "distortion"),
          (this.g_aMw = [a, _, n, t, e]),
          (this.g_aMz = this.g_aMx()),
          (this.g_aMP = this.g_aMx()),
          (this.g_aMQ = this.g_aMx()),
          this.g_aMR(n, t),
          (this.g_aMA = this.g_aMx()),
          (this.g_aMA.gain.value = e),
          (this.g_aMB = this.g_aMx()),
          (this.g_aMB.gain.value = 1 - e),
          (this.g_aMS = this.g_aJo.createWaveShaper()),
          (this.g_aMT = new Float32Array(65536)),
          this.g_aMU(a, _),
          (this.g_aMS.curve = this.g_aMT),
          this.g_aMz.connect(this.g_aMP),
          this.g_aMz.connect(this.g_aMB),
          this.g_aMP.connect(this.g_aMS),
          this.g_aMS.connect(this.g_aMQ),
          this.g_aMQ.connect(this.g_aMA);
      }
      g_eN() {
        this.g_aMz.disconnect(), this.g_aMP.disconnect(), this.g_aMS.disconnect(), this.g_aMQ.disconnect(), this.g_aMA.disconnect(), this.g_aMB.disconnect(), super.g_eN();
      }
      g_aMR(e, g) {
        0.01 > e && (e = 0.01), (this.g_aMP.gain.value = e), (this.g_aMQ.gain.value = Math.pow(1 / e, 0.6) * g);
      }
      g_aMU(e, a) {
        for (let g, _ = 0; 32768 > _; ++_) (g = _ / 32768), (g = this.g_aMV(g, e, a)), (this.g_aMT[32768 + _] = g), (this.g_aMT[32768 - _ - 1] = -g);
      }
      g_aMV(e, a, _) {
        const n = 1.05 * _ * a - a,
          t = 0 > e ? -1 : 1,
          o = 0 > e ? -e : e;
        let g = o < a ? o : a + n * i(o - a, 1 / n);
        return (g *= t), g;
      }
      g_aKm(e) {
        this.g_aMA.disconnect(), this.g_aMA.connect(e), this.g_aMB.disconnect(), this.g_aMB.connect(e);
      }
      g_aKi() {
        return this.g_aMz;
      }
      g_aLn(e, a, g, _) {
        0 === e ? ((a = Math.max(Math.min(a / 100, 1), 0)), (this.g_aMw[4] = a), this.g_aMy(this.g_aMA.gain, a, g, _), this.g_aMy(this.g_aMB.gain, 1 - a, g, _)) : void 0;
      }
    }),
    (self.g_aLk = class extends a {
      constructor(g, a, _, n, t, e) {
        super(g),
          (this.g_kA = "compressor"),
          (this.g_aMw = [a, _, n, t, e]),
          (this.g_aMN = this.g_aJo.createDynamicsCompressor()),
          (this.g_aMN.threshold.value = a),
          (this.g_aMN.knee.value = _),
          (this.g_aMN.ratio.value = n),
          (this.g_aMN.attack.value = t),
          (this.g_aMN.release.value = e);
      }
      g_eN() {
        this.g_aMN.disconnect(), super.g_eN();
      }
      g_aKm(e) {
        this.g_aMN.disconnect(), this.g_aMN.connect(e);
      }
      g_aKi() {
        return this.g_aMN;
      }
      g_aLn() {}
    }),
    (self.g_aLl = class extends a {
      constructor(e, a, g) {
        super(e),
          (this.g_kA = "analyser"),
          (this.g_aMw = [a, g]),
          (this.g_aMN = this.g_aJo.createAnalyser()),
          (this.g_aMN.fftSize = a),
          (this.g_aMN.smoothingTimeConstant = g),
          (this.g_aMW = new Float32Array(this.g_aMN.frequencyBinCount)),
          (this.g_aMX = new Uint8Array(a)),
          (this.g_aMY = 0),
          (this.g_aMZ = 0),
          this.g_aLu.g_aLo(this);
      }
      g_eN() {
        this.g_aLu.g_aLp(this), this.g_aMN.disconnect(), super.g_eN();
      }
      g_Jv() {
        this.g_aMN.getFloatFrequencyData(this.g_aMW), this.g_aMN.getByteTimeDomainData(this.g_aMX);
        const e = this.g_aMN.fftSize;
        this.g_aMY = 0;
        let a = 0;
        for (let g, _ = 0; _ < e; ++_) (g = (this.g_aMX[_] - 128) / 128), 0 > g && (g = -g), this.g_aMY < g && (this.g_aMY = g), (a += g * g);
        (this.g_aMY = t(this.g_aMY)), (this.g_aMZ = t(Math.sqrt(a / e)));
      }
      g_aKm(e) {
        this.g_aMN.disconnect(), this.g_aMN.connect(e);
      }
      g_aKi() {
        return this.g_aMN;
      }
      g_aLn() {}
      g_aKR() {
        return { tag: this.g_aKE(), index: this.g_Dl(), peak: this.g_aMY, rms: this.g_aMZ, binCount: this.g_aMN.frequencyBinCount, freqBins: this.g_aMW };
      }
    });
}
{
  const e = class extends g_aG$ {
    constructor(e) {
      super(e, "browser"),
        (this.g_aft = ""),
        this.g_aHl("get-initial-state", (e) => this.g_aM_(e)),
        this.g_aHl("ready-for-sw-messages", () => this.g_aM$()),
        this.g_aHl("alert", (e) => this.g_aNa(e)),
        this.g_aHl("close", () => this.g_aNb()),
        this.g_aHl("set-focus", (e) => this.g_aHz(e)),
        this.g_aHl("vibrate", (e) => this.g_aNc(e)),
        this.g_aHl("lock-orientation", (e) => this.g_aNd(e)),
        this.g_aHl("unlock-orientation", () => this.g_aNe()),
        this.g_aHl("navigate", (e) => this.g_aNf(e)),
        this.g_aHl("request-fullscreen", () => this.g_aNg()),
        this.g_aHl("exit-fullscreen", () => this.g_aNh()),
        window.addEventListener("online", () => this.g_axf(!0)),
        window.addEventListener("offline", () => this.g_axf(!1)),
        document.addEventListener("backbutton", () => this.g_aNi()),
        "undefined" != typeof Windows && Windows.UI.Core.SystemNavigationManager.getForCurrentView().addEventListener("backrequested", (e) => this.g_aNj(e));
    }
    g_aM_(e) {
      return (
        (this.g_aft = e.exportType),
        {
          location: location.toString(),
          isOnline: !!navigator.onLine,
          referrer: document.referrer,
          title: document.title,
          isCookieEnabled: !!navigator.cookieEnabled,
          screenWidth: screen.width,
          screenHeight: screen.height,
          windowOuterWidth: window.outerWidth,
          windowOuterHeight: window.outerHeight,
          isScirraArcade: "undefined" != typeof window.is_scirra_arcade,
        }
      );
    }
    g_aM$() {
      window.C3_RegisterSW && window.OfflineClientInfo && window.OfflineClientInfo.SetMessageCallback((e) => this.g_aHe("sw-message", e.data));
    }
    g_axf(e) {
      this.g_aHe("online-state", { isOnline: e });
    }
    g_aNi() {
      this.g_aHe("backbutton");
    }
    g_aNj(e) {
      (e.handled = !0), this.g_aHe("backbutton");
    }
    g_aNk() {
      return "nwjs" === this.g_aft ? nw.Window.get() : null;
    }
    g_aNa(e) {
      alert(e.message);
    }
    g_aNb() {
      navigator.app && navigator.app.exitApp ? navigator.app.exitApp() : navigator.device && navigator.device.exitApp ? navigator.device.exitApp() : window.close();
    }
    g_aHz(e) {
      const g = e.isFocus;
      if ("nwjs" === this.g_aft) {
        const e = this.g_aNk();
        g ? e.focus() : e.blur();
      } else g ? window.focus() : window.blur();
    }
    g_aNc(e) {
      navigator.vibrate && navigator.vibrate(e.pattern);
    }
    g_aNd(e) {
      const g = e.orientation;
      if (screen.orientation && screen.orientation.lock) screen.orientation.lock(g).catch((e) => console.warn("[Construct 3] Failed to lock orientation: ", e));
      else
        try {
          let e = !1;
          screen.lockOrientation
            ? (e = screen.lockOrientation(g))
            : screen.webkitLockOrientation
            ? (e = screen.webkitLockOrientation(g))
            : screen.mozLockOrientation
            ? (e = screen.mozLockOrientation(g))
            : screen.msLockOrientation && (e = screen.msLockOrientation(g)),
            e || console.warn("[Construct 3] Failed to lock orientation");
        } catch (e) {
          console.warn("[Construct 3] Failed to lock orientation: ", e);
        }
    }
    g_aNe() {
      try {
        screen.orientation && screen.orientation.unlock
          ? screen.orientation.unlock()
          : screen.unlockOrientation
          ? screen.unlockOrientation()
          : screen.webkitUnlockOrientation
          ? screen.webkitUnlockOrientation()
          : screen.mozUnlockOrientation
          ? screen.mozUnlockOrientation()
          : screen.msUnlockOrientation && screen.msUnlockOrientation();
      } catch (e) {}
    }
    g_aNf(e) {
      const a = e.type;
      if ("back" === a) navigator.app && navigator.app.backHistory ? navigator.app.backHistory() : window.back();
      else if ("forward" === a) window.forward();
      else if ("home" === a) window.g_aNl();
      else if ("reload" === a) location.reload();
      else if ("url" === a) {
        const a = e.url,
          g = e.target,
          _ = e.exportType;
        "windows-uwp" === _ && "undefined" != typeof Windows
          ? Windows.System.Launcher.launchUriAsync(new Windows.Foundation.Uri(a))
          : navigator.app && navigator.app.loadUrl
          ? navigator.app.loadUrl(a, { openExternal: !0 })
          : "cordova" === _
          ? window.open(a, "_system")
          : "preview" === _
          ? window.open(a, "_blank")
          : !this.g_axe && (2 === g ? (window.top.location = a) : 1 === g ? (window.parent.location = a) : (window.location = a));
      } else if ("new-window" === a) {
        const a = e.url,
          g = e.tag,
          _ = e.exportType;
        "windows-uwp" === _ && "undefined" != typeof Windows
          ? Windows.System.Launcher.launchUriAsync(new Windows.Foundation.Uri(a))
          : navigator.app && navigator.app.loadUrl
          ? navigator.app.loadUrl(a, { openExternal: !0 })
          : "cordova" === _
          ? window.open(a, "_system")
          : window.open(a, g);
      }
    }
    g_aNg() {
      const e = document.documentElement;
      e.requestFullscreen
        ? e.requestFullscreen()
        : e.mozRequestFullScreen
        ? e.mozRequestFullScreen()
        : e.msRequestFullscreen
        ? e.msRequestFullscreen()
        : e.webkitRequestFullScreen && ("undefined" == typeof Element.ALLOW_KEYBOARD_INPUT ? e.webkitRequestFullScreen() : e.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT));
    }
    g_aNh() {
      document.exitFullscreen
        ? document.exitFullscreen()
        : document.mozCancelFullScreen
        ? document.mozCancelFullScreen()
        : document.msExitFullscreen
        ? document.msExitFullscreen()
        : document.webkitCancelFullScreen && document.webkitCancelFullScreen();
    }
  };
  g_aHI.g_aIB(e);
}
{
  function e(e) {
    console.log("[C3 IAP]", e);
  }
  const a = class extends g_aG$ {
    constructor(e) {
      super(e, "mobileiap"),
        (this.g_aNm = null),
        (this.g_aNn = []),
        this.g_aHl("init", () => this.g_aNo()),
        this.g_aHl("register", (e) => this.g_aNp(e)),
        this.g_aHl("complete_registration", () => this.g_aNq()),
        this.g_aHl("purchase", (e) => this.g_aNr(e)),
        this.g_aHl("restore", () => this.g_aNs()),
        this.g_aHl("set_key", (e) => this.g_aNt(e));
    }
    g_aNo() {
      e("Initialising"),
        (this.g_aNm = window.store),
        this.g_aNm &&
          (this.g_aNm.ready(() => this.g_aNu()),
          this.g_aNm.error((e) => this.g_aNv(e)),
          this.g_aNw("valid", (e) => this.g_aAx(e)),
          this.g_aNw("approved", (e) => this.g_aNx(e)),
          this.g_aNw("finished", (e) => this.g_aAy(e)),
          this.g_aNw("error", (e) => this.g_aNy(e)));
    }
    g_aNw(e, a) {
      this.g_aNm.when("product")[e](a);
    }
    g_aNu() {
      e("store ready");
      const a = [...this.g_aNm.products];
      this.g_aHe("registration", a);
    }
    g_aNx(a) {
      e(`product "${a.alias}" approved, finishing`), a.finish();
    }
    g_aAx(e) {
      this.g_aHe("product-available", e);
    }
    g_aAy(e) {
      this.g_aHe("purchase-success", e);
    }
    g_aNy(e) {
      this.g_aHe("purchase-failure", e);
    }
    g_aNv(a) {
      e(a);
    }
    g_aNp(e) {
      const a = e.id,
        g = e.type;
      return this.g_aNm ? void this.g_aNn.push({ id: a, alias: a, type: this.g_aNm[g] }) : null;
    }
    g_aNq() {
      if (this.g_aNm) {
        for (const a of this.g_aNn) e(`Registering product "${a.alias}"`), this.g_aNm.register(a);
        this.g_aNm.refresh();
      }
    }
    g_aNr(a) {
      this.g_aNm && (e(`Purchasing product "${a}"`), this.g_aNm.order(a));
    }
    g_aNs() {
      this.g_aNm && this.g_aNm.refresh();
    }
    g_aNt(e) {
      this.g_aNm && this.g_aNm.setKey(e);
    }
  };
  g_aHI.g_aIB(a);
}
{
  const e = class extends g_aG$ {
    constructor(e) {
      super(e, "advert");
      const a = (e) => [e, (a) => this.g_aNz(e, a)];
      this.g_aHn([
        a("CreateBannerAdvert"),
        a("ShowBannerAdvert"),
        a("HideBannerAdvert"),
        a("CreateInterstitialAdvert"),
        a("ShowInterstitialAdvert"),
        a("CreateVideoAdvert"),
        a("ShowVideoAdvert"),
        a("Configure"),
        a("RequestConsent"),
        a("SetUserPersonalisation"),
      ]);
    }
    g_aNA() {
      return window.cordova && window.cordova.plugins.ConstructAd;
    }
    async g_aNz(g, a) {
      const _ = this.g_aNA();
      if (!_) throw new Error("advert plugin not loaded");
      return new Promise((n, t) => {
        _[g](...a, (e, a) => {
          e ? t(e) : n(a);
        });
      });
    }
  };
  g_aHI.g_aIB(e);
}
{
  const e = class extends g_aG$ {
    constructor(e) {
      super(e, "platform-info"), this.g_aHl("get-initial-state", () => this.g_aM_()), window.addEventListener("resize", () => this.g_aNB());
    }
    g_aM_() {
      return { screenWidth: screen.width, screenHeight: screen.height, windowOuterWidth: window.outerWidth, windowOuterHeight: window.outerHeight };
    }
    g_aNB() {
      this.g_aHe("window-resize", { windowOuterWidth: window.outerWidth, windowOuterHeight: window.outerHeight });
    }
  };
  g_aHI.g_aIB(e);
}
