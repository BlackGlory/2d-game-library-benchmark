import { S as n, a as u, G as o, b as f, __tla as __tla_0 } from "./index-3yp-ebrO.js";
let b;
let __tla = Promise.all([
  (() => {
    try {
      return __tla_0;
    } catch {
    }
  })()
]).then(async () => {
  const s = class i extends n {
    constructor(e) {
      e = {
        ...i.defaultOptions,
        ...e
      }, super(e), this.enabled = true, this._state = u.for2d(), this.blendMode = e.blendMode, this.padding = e.padding, typeof e.antialias == "boolean" ? this.antialias = e.antialias ? "on" : "off" : this.antialias = e.antialias, this.resolution = e.resolution, this.blendRequired = e.blendRequired, this.clipToViewport = e.clipToViewport, this.addResource("uTexture", 0, 1), e.blendRequired && this.addResource("uBackTexture", 0, 3);
    }
    apply(e, t, a, r) {
      e.applyFilter(this, t, a, r);
    }
    get blendMode() {
      return this._state.blendMode;
    }
    set blendMode(e) {
      this._state.blendMode = e;
    }
    static from(e) {
      const { gpu: t, gl: a, ...r } = e;
      let l, d;
      return t && (l = o.from(t)), a && (d = f.from(a)), new i({
        gpuProgram: l,
        glProgram: d,
        ...r
      });
    }
  };
  s.defaultOptions = {
    blendMode: "normal",
    resolution: 1,
    padding: 0,
    antialias: "off",
    blendRequired: false,
    clipToViewport: true
  };
  b = s;
});
export {
  b as F,
  __tla
};
