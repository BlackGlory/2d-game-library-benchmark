var gJ = function() {
  var ye = import.meta.url;
  return function(Vt) {
    Vt = Vt || {};
    var t;
    t || (t = typeof Vt < "u" ? Vt : {});
    var me, ne;
    t.ready = new Promise(function(e, n) {
      me = e, ne = n;
    });
    var Ut = {}, Ft;
    for (Ft in t) t.hasOwnProperty(Ft) && (Ut[Ft] = t[Ft]);
    var fe = typeof window == "object", $t = typeof importScripts == "function", Dt = "", oe, Qt, Xt, qt, kt;
    typeof process == "object" && typeof process.versions == "object" && typeof process.versions.node == "string" ? (Dt = $t ? require("path").dirname(Dt) + "/" : __dirname + "/", oe = function(e, n) {
      return qt || (qt = require("fs")), kt || (kt = require("path")), e = kt.normalize(e), qt.readFileSync(e, n ? null : "utf8");
    }, Xt = function(e) {
      return e = oe(e, true), e.buffer || (e = new Uint8Array(e)), e.buffer || Wt("Assertion failed: undefined"), e;
    }, Qt = function(e, n, o) {
      qt || (qt = require("fs")), kt || (kt = require("path")), e = kt.normalize(e), qt.readFile(e, function(_, l) {
        _ ? o(_) : n(l.buffer);
      });
    }, 1 < process.argv.length && process.argv[1].replace(/\\/g, "/"), process.argv.slice(2), process.on("uncaughtException", function(e) {
      throw e;
    }), process.on("unhandledRejection", function(e) {
      throw e;
    }), t.inspect = function() {
      return "[Emscripten Module object]";
    }) : (fe || $t) && ($t ? Dt = self.location.href : typeof document < "u" && document.currentScript && (Dt = document.currentScript.src), ye && (Dt = ye), Dt = Dt.indexOf("blob:") !== 0 ? Dt.substr(0, Dt.replace(/[?#].*/, "").lastIndexOf("/") + 1) : "", oe = function(e) {
      var n = new XMLHttpRequest();
      return n.open("GET", e, false), n.send(null), n.responseText;
    }, $t && (Xt = function(e) {
      var n = new XMLHttpRequest();
      return n.open("GET", e, false), n.responseType = "arraybuffer", n.send(null), new Uint8Array(n.response);
    }), Qt = function(e, n, o) {
      var _ = new XMLHttpRequest();
      _.open("GET", e, true), _.responseType = "arraybuffer", _.onload = function() {
        _.status == 200 || _.status == 0 && _.response ? n(_.response) : o();
      }, _.onerror = o, _.send(null);
    });
    var lJ = t.print || console.log.bind(console), Et = t.printErr || console.warn.bind(console);
    for (Ft in Ut) Ut.hasOwnProperty(Ft) && (t[Ft] = Ut[Ft]);
    Ut = null;
    var Nt;
    t.wasmBinary && (Nt = t.wasmBinary), t.noExitRuntime, typeof WebAssembly != "object" && Wt("no native wasm support detected");
    var re, de = false, be = typeof TextDecoder < "u" ? new TextDecoder("utf8") : void 0;
    function ge(e, n, o) {
      var _ = n + o;
      for (o = n; e[o] && !(o >= _); ) ++o;
      if (16 < o - n && e.subarray && be) return be.decode(e.subarray(n, o));
      for (_ = ""; n < o; ) {
        var l = e[n++];
        if (l & 128) {
          var U = e[n++] & 63;
          if ((l & 224) == 192) _ += String.fromCharCode((l & 31) << 6 | U);
          else {
            var Mt = e[n++] & 63;
            l = (l & 240) == 224 ? (l & 15) << 12 | U << 6 | Mt : (l & 7) << 18 | U << 12 | Mt << 6 | e[n++] & 63, 65536 > l ? _ += String.fromCharCode(l) : (l -= 65536, _ += String.fromCharCode(55296 | l >> 10, 56320 | l & 1023));
          }
        } else _ += String.fromCharCode(l);
      }
      return _;
    }
    function _e(e) {
      return e ? ge(Tt, e, void 0) : "";
    }
    var he, Tt, zt, Yt, Ze;
    function ve() {
      var e = re.buffer;
      he = e, t.HEAP8 = new Int8Array(e), t.HEAP16 = new Int16Array(e), t.HEAP32 = zt = new Int32Array(e), t.HEAPU8 = Tt = new Uint8Array(e), t.HEAPU16 = new Uint16Array(e), t.HEAPU32 = new Uint32Array(e), t.HEAPF32 = Yt = new Float32Array(e), t.HEAPF64 = Ze = new Float64Array(e);
    }
    var Je, De = [], ie = [], je = [], Se = false;
    function yJ() {
      var e = t.preRun.shift();
      De.unshift(e);
    }
    var Ot = 0, Ht = null;
    t.preloadedImages = {}, t.preloadedAudios = {};
    function Wt(e) {
      throw t.onAbort && t.onAbort(e), e = "Aborted(" + e + ")", Et(e), de = true, e = new WebAssembly.RuntimeError(e + ". Build with -s ASSERTIONS=1 for more info."), ne(e), e;
    }
    function Ge() {
      return vt.startsWith("data:application/octet-stream;base64,");
    }
    var vt;
    if (t.locateFile) {
      if (vt = "Box2D.simd.wasm", !Ge()) {
        var Ae = vt;
        vt = t.locateFile ? t.locateFile(Ae, Dt) : Dt + Ae;
      }
    } else vt = new URL("/2d-game-library-benchmark/assets/Box2D.simd-BnsTHdJ6.wasm", import.meta.url).toString();
    function Ce() {
      var e = vt;
      try {
        if (e == vt && Nt) return new Uint8Array(Nt);
        if (Xt) return Xt(e);
        throw "both async and sync fetching of the wasm failed";
      } catch (n) {
        Wt(n);
      }
    }
    function mJ() {
      if (!Nt && (fe || $t)) {
        if (typeof fetch == "function" && !vt.startsWith("file://")) return fetch(vt, { credentials: "same-origin" }).then(function(e) {
          if (!e.ok) throw "failed to load wasm binary file at '" + vt + "'";
          return e.arrayBuffer();
        }).catch(function() {
          return Ce();
        });
        if (Qt) return new Promise(function(e, n) {
          Qt(vt, function(o) {
            e(new Uint8Array(o));
          }, n);
        });
      }
      return Promise.resolve().then(function() {
        return Ce();
      });
    }
    var fJ = { 10530: function(e, n) {
      if (e = t.getCache(t.JSContactListener)[e], !e.hasOwnProperty("BeginContact")) throw "a JSImplementation must implement all functions, you forgot JSContactListener::BeginContact.";
      e.BeginContact(n);
    }, 10768: function(e, n) {
      if (e = t.getCache(t.JSContactListener)[e], !e.hasOwnProperty("EndContact")) throw "a JSImplementation must implement all functions, you forgot JSContactListener::EndContact.";
      e.EndContact(n);
    }, 11e3: function(e, n, o) {
      if (e = t.getCache(t.JSContactListener)[e], !e.hasOwnProperty("PreSolve")) throw "a JSImplementation must implement all functions, you forgot JSContactListener::PreSolve.";
      e.PreSolve(n, o);
    }, 11229: function(e, n, o) {
      if (e = t.getCache(t.JSContactListener)[e], !e.hasOwnProperty("PostSolve")) throw "a JSImplementation must implement all functions, you forgot JSContactListener::PostSolve.";
      e.PostSolve(n, o);
    }, 11461: function(e, n, o, _, l) {
      if (e = t.getCache(t.JSRayCastCallback)[e], !e.hasOwnProperty("ReportFixture")) throw "a JSImplementation must implement all functions, you forgot JSRayCastCallback::ReportFixture.";
      return e.ReportFixture(n, o, _, l);
    }, 11718: function(e, n) {
      if (e = t.getCache(t.JSQueryCallback)[e], !e.hasOwnProperty("ReportFixture")) throw "a JSImplementation must implement all functions, you forgot JSQueryCallback::ReportFixture.";
      return e.ReportFixture(n);
    }, 11962: function(e, n, o) {
      if (e = t.getCache(t.JSContactFilter)[e], !e.hasOwnProperty("ShouldCollide")) throw "a JSImplementation must implement all functions, you forgot JSContactFilter::ShouldCollide.";
      return e.ShouldCollide(n, o);
    }, 12209: function(e, n) {
      if (e = t.getCache(t.JSDestructionListener)[e], !e.hasOwnProperty("SayGoodbyeJoint")) throw "a JSImplementation must implement all functions, you forgot JSDestructionListener::SayGoodbyeJoint.";
      e.SayGoodbyeJoint(n);
    }, 12464: function(e, n) {
      if (e = t.getCache(t.JSDestructionListener)[e], !e.hasOwnProperty("SayGoodbyeFixture")) throw "a JSImplementation must implement all functions, you forgot JSDestructionListener::SayGoodbyeFixture.";
      e.SayGoodbyeFixture(n);
    }, 12725: function(e, n, o, _) {
      if (e = t.getCache(t.JSDraw)[e], !e.hasOwnProperty("DrawPolygon")) throw "a JSImplementation must implement all functions, you forgot JSDraw::DrawPolygon.";
      e.DrawPolygon(n, o, _);
    }, 12944: function(e, n, o, _) {
      if (e = t.getCache(t.JSDraw)[e], !e.hasOwnProperty("DrawSolidPolygon")) throw "a JSImplementation must implement all functions, you forgot JSDraw::DrawSolidPolygon.";
      e.DrawSolidPolygon(n, o, _);
    }, 13178: function(e, n, o, _) {
      if (e = t.getCache(t.JSDraw)[e], !e.hasOwnProperty("DrawCircle")) throw "a JSImplementation must implement all functions, you forgot JSDraw::DrawCircle.";
      e.DrawCircle(n, o, _);
    }, 13394: function(e, n, o, _, l) {
      if (e = t.getCache(t.JSDraw)[e], !e.hasOwnProperty("DrawSolidCircle")) throw "a JSImplementation must implement all functions, you forgot JSDraw::DrawSolidCircle.";
      e.DrawSolidCircle(n, o, _, l);
    }, 13628: function(e, n, o, _) {
      if (e = t.getCache(t.JSDraw)[e], !e.hasOwnProperty("DrawSegment")) throw "a JSImplementation must implement all functions, you forgot JSDraw::DrawSegment.";
      e.DrawSegment(n, o, _);
    }, 13847: function(e, n) {
      if (e = t.getCache(t.JSDraw)[e], !e.hasOwnProperty("DrawTransform")) throw "a JSImplementation must implement all functions, you forgot JSDraw::DrawTransform.";
      e.DrawTransform(n);
    }, 14066: function(e, n, o, _) {
      if (e = t.getCache(t.JSDraw)[e], !e.hasOwnProperty("DrawPoint")) throw "a JSImplementation must implement all functions, you forgot JSDraw::DrawPoint.";
      e.DrawPoint(n, o, _);
    } };
    function pe(e) {
      for (; 0 < e.length; ) {
        var n = e.shift();
        if (typeof n == "function") n(t);
        else {
          var o = n.AA;
          typeof o == "number" ? n.Mv === void 0 ? Pe(o)() : Pe(o)(n.Mv) : o(n.Mv === void 0 ? null : n.Mv);
        }
      }
    }
    var Kt = [];
    function Pe(e) {
      var n = Kt[e];
      return n || (e >= Kt.length && (Kt.length = e + 1), Kt[e] = n = Je.get(e)), n;
    }
    var dJ = [null, [], []], Be = {}, ue = [];
    function xe(e, n, o) {
      ue.length = 0;
      var _;
      for (o >>= 2; _ = Tt[n++]; ) (_ = 105 > _) && o & 1 && o++, ue.push(_ ? Ze[o++ >> 1] : zt[o]), ++o;
      return fJ[e].apply(null, ue);
    }
    var bJ = { f: function(e, n, o, _) {
      Wt("Assertion failed: " + _e(e) + ", at: " + [n ? _e(n) : "unknown filename", o, _ ? _e(_) : "unknown function"]);
    }, d: function() {
      return 0;
    }, h: function() {
      return 0;
    }, j: function() {
    }, n: function() {
      Wt("");
    }, b: function(e, n) {
      throw "Array index " + e + " out of bounds: [0," + n + ")";
    }, k: function(e, n, o) {
      return xe(e, n, o);
    }, a: xe, m: function(e, n, o) {
      Tt.copyWithin(e, n, n + o);
    }, c: function(e) {
      var n = Tt.length;
      if (e >>>= 0, 2147483648 < e) return false;
      for (var o = 1; 4 >= o; o *= 2) {
        var _ = n * (1 + 0.2 / o);
        _ = Math.min(_, e + 100663296), _ = Math.max(e, _), 0 < _ % 65536 && (_ += 65536 - _ % 65536);
        t: {
          try {
            re.grow(Math.min(2147483648, _) - he.byteLength + 65535 >>> 16), ve();
            var l = 1;
            break t;
          } catch {
          }
          l = void 0;
        }
        if (l) return true;
      }
      return false;
    }, e: function() {
      return 0;
    }, g: function(e, n, o, _) {
      return e = Be.BA(e), n = Be.zA(e, n, o), zt[_ >> 2] = n, 0;
    }, l: function() {
    }, i: function(e, n, o, _) {
      for (var l = 0, U = 0; U < o; U++) {
        var Mt = zt[n >> 2], ee = zt[n + 4 >> 2];
        n += 8;
        for (var ce = 0; ce < ee; ce++) {
          var ae = Tt[Mt + ce], le = dJ[e];
          ae === 0 || ae === 10 ? ((e === 1 ? lJ : Et)(ge(le, 0)), le.length = 0) : le.push(ae);
        }
        l += ee;
      }
      return zt[_ >> 2] = l, 0;
    } };
    (function() {
      function e(l) {
        t.asm = l.exports, re = t.asm.o, ve(), Je = t.asm.Wu, ie.unshift(t.asm.p), Ot--, t.monitorRunDependencies && t.monitorRunDependencies(Ot), Ot == 0 && Ht && (l = Ht, Ht = null, l());
      }
      function n(l) {
        e(l.instance);
      }
      function o(l) {
        return mJ().then(function(U) {
          return WebAssembly.instantiate(U, _);
        }).then(function(U) {
          return U;
        }).then(l, function(U) {
          Et("failed to asynchronously prepare wasm: " + U), Wt(U);
        });
      }
      var _ = { a: bJ };
      if (Ot++, t.monitorRunDependencies && t.monitorRunDependencies(Ot), t.instantiateWasm) try {
        return t.instantiateWasm(_, e);
      } catch (l) {
        return Et("Module.instantiateWasm callback failed with error: " + l), false;
      }
      return function() {
        return Nt || typeof WebAssembly.instantiateStreaming != "function" || Ge() || vt.startsWith("file://") || typeof fetch != "function" ? o(n) : fetch(vt, { credentials: "same-origin" }).then(function(l) {
          return WebAssembly.instantiateStreaming(l, _).then(n, function(U) {
            return Et("wasm streaming compile failed: " + U), Et("falling back to ArrayBuffer instantiation"), o(n);
          });
        });
      }().catch(ne), {};
    })(), t.___wasm_call_ctors = function() {
      return (t.___wasm_call_ctors = t.asm.p).apply(null, arguments);
    };
    var Me = t._emscripten_bind_b2ContactListener___destroy___0 = function() {
      return (Me = t._emscripten_bind_b2ContactListener___destroy___0 = t.asm.q).apply(null, arguments);
    }, we = t._emscripten_bind_b2Shape_GetType_0 = function() {
      return (we = t._emscripten_bind_b2Shape_GetType_0 = t.asm.r).apply(null, arguments);
    }, Re = t._emscripten_bind_b2Shape_GetChildCount_0 = function() {
      return (Re = t._emscripten_bind_b2Shape_GetChildCount_0 = t.asm.s).apply(null, arguments);
    }, Fe = t._emscripten_bind_b2Shape_TestPoint_2 = function() {
      return (Fe = t._emscripten_bind_b2Shape_TestPoint_2 = t.asm.t).apply(null, arguments);
    }, Te = t._emscripten_bind_b2Shape_RayCast_4 = function() {
      return (Te = t._emscripten_bind_b2Shape_RayCast_4 = t.asm.u).apply(null, arguments);
    }, Oe = t._emscripten_bind_b2Shape_ComputeAABB_3 = function() {
      return (Oe = t._emscripten_bind_b2Shape_ComputeAABB_3 = t.asm.v).apply(null, arguments);
    }, We = t._emscripten_bind_b2Shape_ComputeMass_2 = function() {
      return (We = t._emscripten_bind_b2Shape_ComputeMass_2 = t.asm.w).apply(null, arguments);
    }, Le = t._emscripten_bind_b2Shape_get_m_type_0 = function() {
      return (Le = t._emscripten_bind_b2Shape_get_m_type_0 = t.asm.x).apply(null, arguments);
    }, Ie = t._emscripten_bind_b2Shape_set_m_type_1 = function() {
      return (Ie = t._emscripten_bind_b2Shape_set_m_type_1 = t.asm.y).apply(null, arguments);
    }, qe = t._emscripten_bind_b2Shape_get_m_radius_0 = function() {
      return (qe = t._emscripten_bind_b2Shape_get_m_radius_0 = t.asm.z).apply(null, arguments);
    }, ke = t._emscripten_bind_b2Shape_set_m_radius_1 = function() {
      return (ke = t._emscripten_bind_b2Shape_set_m_radius_1 = t.asm.A).apply(null, arguments);
    }, Ee = t._emscripten_bind_b2Shape___destroy___0 = function() {
      return (Ee = t._emscripten_bind_b2Shape___destroy___0 = t.asm.B).apply(null, arguments);
    }, ze = t._emscripten_bind_b2RayCastCallback___destroy___0 = function() {
      return (ze = t._emscripten_bind_b2RayCastCallback___destroy___0 = t.asm.C).apply(null, arguments);
    }, Ve = t._emscripten_bind_b2QueryCallback___destroy___0 = function() {
      return (Ve = t._emscripten_bind_b2QueryCallback___destroy___0 = t.asm.D).apply(null, arguments);
    }, Ue = t._emscripten_bind_b2JointDef_b2JointDef_0 = function() {
      return (Ue = t._emscripten_bind_b2JointDef_b2JointDef_0 = t.asm.E).apply(null, arguments);
    }, $e = t._emscripten_bind_b2JointDef_get_type_0 = function() {
      return ($e = t._emscripten_bind_b2JointDef_get_type_0 = t.asm.F).apply(null, arguments);
    }, Ne = t._emscripten_bind_b2JointDef_set_type_1 = function() {
      return (Ne = t._emscripten_bind_b2JointDef_set_type_1 = t.asm.G).apply(null, arguments);
    }, He = t._emscripten_bind_b2JointDef_get_userData_0 = function() {
      return (He = t._emscripten_bind_b2JointDef_get_userData_0 = t.asm.H).apply(null, arguments);
    }, Qe = t._emscripten_bind_b2JointDef_set_userData_1 = function() {
      return (Qe = t._emscripten_bind_b2JointDef_set_userData_1 = t.asm.I).apply(null, arguments);
    }, Xe = t._emscripten_bind_b2JointDef_get_bodyA_0 = function() {
      return (Xe = t._emscripten_bind_b2JointDef_get_bodyA_0 = t.asm.J).apply(null, arguments);
    }, Ye = t._emscripten_bind_b2JointDef_set_bodyA_1 = function() {
      return (Ye = t._emscripten_bind_b2JointDef_set_bodyA_1 = t.asm.K).apply(null, arguments);
    }, Ke = t._emscripten_bind_b2JointDef_get_bodyB_0 = function() {
      return (Ke = t._emscripten_bind_b2JointDef_get_bodyB_0 = t.asm.L).apply(null, arguments);
    }, tn = t._emscripten_bind_b2JointDef_set_bodyB_1 = function() {
      return (tn = t._emscripten_bind_b2JointDef_set_bodyB_1 = t.asm.M).apply(null, arguments);
    }, en = t._emscripten_bind_b2JointDef_get_collideConnected_0 = function() {
      return (en = t._emscripten_bind_b2JointDef_get_collideConnected_0 = t.asm.N).apply(null, arguments);
    }, nn = t._emscripten_bind_b2JointDef_set_collideConnected_1 = function() {
      return (nn = t._emscripten_bind_b2JointDef_set_collideConnected_1 = t.asm.O).apply(null, arguments);
    }, on = t._emscripten_bind_b2JointDef___destroy___0 = function() {
      return (on = t._emscripten_bind_b2JointDef___destroy___0 = t.asm.P).apply(null, arguments);
    }, rn = t._emscripten_bind_b2Joint_GetType_0 = function() {
      return (rn = t._emscripten_bind_b2Joint_GetType_0 = t.asm.Q).apply(null, arguments);
    }, _n = t._emscripten_bind_b2Joint_GetBodyA_0 = function() {
      return (_n = t._emscripten_bind_b2Joint_GetBodyA_0 = t.asm.R).apply(null, arguments);
    }, pn = t._emscripten_bind_b2Joint_GetBodyB_0 = function() {
      return (pn = t._emscripten_bind_b2Joint_GetBodyB_0 = t.asm.S).apply(null, arguments);
    }, un = t._emscripten_bind_b2Joint_GetAnchorA_0 = function() {
      return (un = t._emscripten_bind_b2Joint_GetAnchorA_0 = t.asm.T).apply(null, arguments);
    }, sn = t._emscripten_bind_b2Joint_GetAnchorB_0 = function() {
      return (sn = t._emscripten_bind_b2Joint_GetAnchorB_0 = t.asm.U).apply(null, arguments);
    }, cn = t._emscripten_bind_b2Joint_GetReactionForce_1 = function() {
      return (cn = t._emscripten_bind_b2Joint_GetReactionForce_1 = t.asm.V).apply(null, arguments);
    }, an = t._emscripten_bind_b2Joint_GetReactionTorque_1 = function() {
      return (an = t._emscripten_bind_b2Joint_GetReactionTorque_1 = t.asm.W).apply(null, arguments);
    }, ln = t._emscripten_bind_b2Joint_GetNext_0 = function() {
      return (ln = t._emscripten_bind_b2Joint_GetNext_0 = t.asm.X).apply(null, arguments);
    }, yn = t._emscripten_bind_b2Joint_GetUserData_0 = function() {
      return (yn = t._emscripten_bind_b2Joint_GetUserData_0 = t.asm.Y).apply(null, arguments);
    }, mn = t._emscripten_bind_b2Joint_GetCollideConnected_0 = function() {
      return (mn = t._emscripten_bind_b2Joint_GetCollideConnected_0 = t.asm.Z).apply(null, arguments);
    }, fn = t._emscripten_bind_b2Joint_Dump_0 = function() {
      return (fn = t._emscripten_bind_b2Joint_Dump_0 = t.asm._).apply(null, arguments);
    }, dn = t._emscripten_bind_b2ContactFilter___destroy___0 = function() {
      return (dn = t._emscripten_bind_b2ContactFilter___destroy___0 = t.asm.$).apply(null, arguments);
    }, bn = t._emscripten_bind_b2DestructionListenerWrapper___destroy___0 = function() {
      return (bn = t._emscripten_bind_b2DestructionListenerWrapper___destroy___0 = t.asm.aa).apply(null, arguments);
    }, gn = t._emscripten_bind_b2Draw_SetFlags_1 = function() {
      return (gn = t._emscripten_bind_b2Draw_SetFlags_1 = t.asm.ba).apply(null, arguments);
    }, hn = t._emscripten_bind_b2Draw_GetFlags_0 = function() {
      return (hn = t._emscripten_bind_b2Draw_GetFlags_0 = t.asm.ca).apply(null, arguments);
    }, Zn = t._emscripten_bind_b2Draw_AppendFlags_1 = function() {
      return (Zn = t._emscripten_bind_b2Draw_AppendFlags_1 = t.asm.da).apply(null, arguments);
    }, vn = t._emscripten_bind_b2Draw_ClearFlags_1 = function() {
      return (vn = t._emscripten_bind_b2Draw_ClearFlags_1 = t.asm.ea).apply(null, arguments);
    }, Jn = t._emscripten_bind_b2Draw___destroy___0 = function() {
      return (Jn = t._emscripten_bind_b2Draw___destroy___0 = t.asm.fa).apply(null, arguments);
    }, Dn = t._emscripten_bind_VoidPtr___destroy___0 = function() {
      return (Dn = t._emscripten_bind_VoidPtr___destroy___0 = t.asm.ga).apply(null, arguments);
    }, jn = t._emscripten_bind_b2Contact_GetManifold_0 = function() {
      return (jn = t._emscripten_bind_b2Contact_GetManifold_0 = t.asm.ha).apply(null, arguments);
    }, Sn = t._emscripten_bind_b2Contact_GetWorldManifold_1 = function() {
      return (Sn = t._emscripten_bind_b2Contact_GetWorldManifold_1 = t.asm.ia).apply(null, arguments);
    }, Gn = t._emscripten_bind_b2Contact_IsTouching_0 = function() {
      return (Gn = t._emscripten_bind_b2Contact_IsTouching_0 = t.asm.ja).apply(null, arguments);
    }, An = t._emscripten_bind_b2Contact_SetEnabled_1 = function() {
      return (An = t._emscripten_bind_b2Contact_SetEnabled_1 = t.asm.ka).apply(null, arguments);
    }, Cn = t._emscripten_bind_b2Contact_IsEnabled_0 = function() {
      return (Cn = t._emscripten_bind_b2Contact_IsEnabled_0 = t.asm.la).apply(null, arguments);
    }, Pn = t._emscripten_bind_b2Contact_GetNext_0 = function() {
      return (Pn = t._emscripten_bind_b2Contact_GetNext_0 = t.asm.ma).apply(null, arguments);
    }, Bn = t._emscripten_bind_b2Contact_GetFixtureA_0 = function() {
      return (Bn = t._emscripten_bind_b2Contact_GetFixtureA_0 = t.asm.na).apply(null, arguments);
    }, xn = t._emscripten_bind_b2Contact_GetChildIndexA_0 = function() {
      return (xn = t._emscripten_bind_b2Contact_GetChildIndexA_0 = t.asm.oa).apply(null, arguments);
    }, Mn = t._emscripten_bind_b2Contact_GetFixtureB_0 = function() {
      return (Mn = t._emscripten_bind_b2Contact_GetFixtureB_0 = t.asm.pa).apply(null, arguments);
    }, wn = t._emscripten_bind_b2Contact_GetChildIndexB_0 = function() {
      return (wn = t._emscripten_bind_b2Contact_GetChildIndexB_0 = t.asm.qa).apply(null, arguments);
    }, Rn = t._emscripten_bind_b2Contact_SetFriction_1 = function() {
      return (Rn = t._emscripten_bind_b2Contact_SetFriction_1 = t.asm.ra).apply(null, arguments);
    }, Fn = t._emscripten_bind_b2Contact_GetFriction_0 = function() {
      return (Fn = t._emscripten_bind_b2Contact_GetFriction_0 = t.asm.sa).apply(null, arguments);
    }, Tn = t._emscripten_bind_b2Contact_ResetFriction_0 = function() {
      return (Tn = t._emscripten_bind_b2Contact_ResetFriction_0 = t.asm.ta).apply(null, arguments);
    }, On = t._emscripten_bind_b2Contact_SetRestitution_1 = function() {
      return (On = t._emscripten_bind_b2Contact_SetRestitution_1 = t.asm.ua).apply(null, arguments);
    }, Wn = t._emscripten_bind_b2Contact_GetRestitution_0 = function() {
      return (Wn = t._emscripten_bind_b2Contact_GetRestitution_0 = t.asm.va).apply(null, arguments);
    }, Ln = t._emscripten_bind_b2Contact_ResetRestitution_0 = function() {
      return (Ln = t._emscripten_bind_b2Contact_ResetRestitution_0 = t.asm.wa).apply(null, arguments);
    }, In = t._emscripten_bind_b2Contact_SetRestitutionThreshold_1 = function() {
      return (In = t._emscripten_bind_b2Contact_SetRestitutionThreshold_1 = t.asm.xa).apply(null, arguments);
    }, qn = t._emscripten_bind_b2Contact_GetRestitutionThreshold_0 = function() {
      return (qn = t._emscripten_bind_b2Contact_GetRestitutionThreshold_0 = t.asm.ya).apply(null, arguments);
    }, kn = t._emscripten_bind_b2Contact_ResetRestitutionThreshold_0 = function() {
      return (kn = t._emscripten_bind_b2Contact_ResetRestitutionThreshold_0 = t.asm.za).apply(null, arguments);
    }, En = t._emscripten_bind_b2Contact_SetTangentSpeed_1 = function() {
      return (En = t._emscripten_bind_b2Contact_SetTangentSpeed_1 = t.asm.Aa).apply(null, arguments);
    }, zn = t._emscripten_bind_b2Contact_GetTangentSpeed_0 = function() {
      return (zn = t._emscripten_bind_b2Contact_GetTangentSpeed_0 = t.asm.Ba).apply(null, arguments);
    }, Vn = t._emscripten_bind_JSContactListener_JSContactListener_0 = function() {
      return (Vn = t._emscripten_bind_JSContactListener_JSContactListener_0 = t.asm.Ca).apply(null, arguments);
    }, Un = t._emscripten_bind_JSContactListener_BeginContact_1 = function() {
      return (Un = t._emscripten_bind_JSContactListener_BeginContact_1 = t.asm.Da).apply(null, arguments);
    }, $n = t._emscripten_bind_JSContactListener_EndContact_1 = function() {
      return ($n = t._emscripten_bind_JSContactListener_EndContact_1 = t.asm.Ea).apply(null, arguments);
    }, Nn = t._emscripten_bind_JSContactListener_PreSolve_2 = function() {
      return (Nn = t._emscripten_bind_JSContactListener_PreSolve_2 = t.asm.Fa).apply(null, arguments);
    }, Hn = t._emscripten_bind_JSContactListener_PostSolve_2 = function() {
      return (Hn = t._emscripten_bind_JSContactListener_PostSolve_2 = t.asm.Ga).apply(null, arguments);
    }, Qn = t._emscripten_bind_JSContactListener___destroy___0 = function() {
      return (Qn = t._emscripten_bind_JSContactListener___destroy___0 = t.asm.Ha).apply(null, arguments);
    }, Xn = t._emscripten_bind_b2World_b2World_1 = function() {
      return (Xn = t._emscripten_bind_b2World_b2World_1 = t.asm.Ia).apply(null, arguments);
    }, Yn = t._emscripten_bind_b2World_SetDestructionListener_1 = function() {
      return (Yn = t._emscripten_bind_b2World_SetDestructionListener_1 = t.asm.Ja).apply(null, arguments);
    }, Kn = t._emscripten_bind_b2World_SetContactFilter_1 = function() {
      return (Kn = t._emscripten_bind_b2World_SetContactFilter_1 = t.asm.Ka).apply(null, arguments);
    }, to = t._emscripten_bind_b2World_SetContactListener_1 = function() {
      return (to = t._emscripten_bind_b2World_SetContactListener_1 = t.asm.La).apply(null, arguments);
    }, eo = t._emscripten_bind_b2World_SetDebugDraw_1 = function() {
      return (eo = t._emscripten_bind_b2World_SetDebugDraw_1 = t.asm.Ma).apply(null, arguments);
    }, no = t._emscripten_bind_b2World_CreateBody_1 = function() {
      return (no = t._emscripten_bind_b2World_CreateBody_1 = t.asm.Na).apply(null, arguments);
    }, oo = t._emscripten_bind_b2World_DestroyBody_1 = function() {
      return (oo = t._emscripten_bind_b2World_DestroyBody_1 = t.asm.Oa).apply(null, arguments);
    }, ro = t._emscripten_bind_b2World_CreateJoint_1 = function() {
      return (ro = t._emscripten_bind_b2World_CreateJoint_1 = t.asm.Pa).apply(null, arguments);
    }, _o = t._emscripten_bind_b2World_DestroyJoint_1 = function() {
      return (_o = t._emscripten_bind_b2World_DestroyJoint_1 = t.asm.Qa).apply(null, arguments);
    }, io = t._emscripten_bind_b2World_Step_3 = function() {
      return (io = t._emscripten_bind_b2World_Step_3 = t.asm.Ra).apply(null, arguments);
    }, po = t._emscripten_bind_b2World_ClearForces_0 = function() {
      return (po = t._emscripten_bind_b2World_ClearForces_0 = t.asm.Sa).apply(null, arguments);
    }, uo = t._emscripten_bind_b2World_DebugDraw_0 = function() {
      return (uo = t._emscripten_bind_b2World_DebugDraw_0 = t.asm.Ta).apply(null, arguments);
    }, so = t._emscripten_bind_b2World_QueryAABB_2 = function() {
      return (so = t._emscripten_bind_b2World_QueryAABB_2 = t.asm.Ua).apply(null, arguments);
    }, co = t._emscripten_bind_b2World_RayCast_3 = function() {
      return (co = t._emscripten_bind_b2World_RayCast_3 = t.asm.Va).apply(null, arguments);
    }, ao = t._emscripten_bind_b2World_GetBodyList_0 = function() {
      return (ao = t._emscripten_bind_b2World_GetBodyList_0 = t.asm.Wa).apply(null, arguments);
    }, lo = t._emscripten_bind_b2World_GetJointList_0 = function() {
      return (lo = t._emscripten_bind_b2World_GetJointList_0 = t.asm.Xa).apply(null, arguments);
    }, yo = t._emscripten_bind_b2World_GetContactList_0 = function() {
      return (yo = t._emscripten_bind_b2World_GetContactList_0 = t.asm.Ya).apply(null, arguments);
    }, mo = t._emscripten_bind_b2World_SetAllowSleeping_1 = function() {
      return (mo = t._emscripten_bind_b2World_SetAllowSleeping_1 = t.asm.Za).apply(null, arguments);
    }, fo = t._emscripten_bind_b2World_GetAllowSleeping_0 = function() {
      return (fo = t._emscripten_bind_b2World_GetAllowSleeping_0 = t.asm._a).apply(null, arguments);
    }, bo = t._emscripten_bind_b2World_SetWarmStarting_1 = function() {
      return (bo = t._emscripten_bind_b2World_SetWarmStarting_1 = t.asm.$a).apply(null, arguments);
    }, go = t._emscripten_bind_b2World_GetWarmStarting_0 = function() {
      return (go = t._emscripten_bind_b2World_GetWarmStarting_0 = t.asm.ab).apply(null, arguments);
    }, ho = t._emscripten_bind_b2World_SetContinuousPhysics_1 = function() {
      return (ho = t._emscripten_bind_b2World_SetContinuousPhysics_1 = t.asm.bb).apply(null, arguments);
    }, Zo = t._emscripten_bind_b2World_GetContinuousPhysics_0 = function() {
      return (Zo = t._emscripten_bind_b2World_GetContinuousPhysics_0 = t.asm.cb).apply(null, arguments);
    }, vo = t._emscripten_bind_b2World_SetSubStepping_1 = function() {
      return (vo = t._emscripten_bind_b2World_SetSubStepping_1 = t.asm.db).apply(null, arguments);
    }, Jo = t._emscripten_bind_b2World_GetSubStepping_0 = function() {
      return (Jo = t._emscripten_bind_b2World_GetSubStepping_0 = t.asm.eb).apply(null, arguments);
    }, Do = t._emscripten_bind_b2World_GetProxyCount_0 = function() {
      return (Do = t._emscripten_bind_b2World_GetProxyCount_0 = t.asm.fb).apply(null, arguments);
    }, jo = t._emscripten_bind_b2World_GetBodyCount_0 = function() {
      return (jo = t._emscripten_bind_b2World_GetBodyCount_0 = t.asm.gb).apply(null, arguments);
    }, So = t._emscripten_bind_b2World_GetJointCount_0 = function() {
      return (So = t._emscripten_bind_b2World_GetJointCount_0 = t.asm.hb).apply(null, arguments);
    }, Go = t._emscripten_bind_b2World_GetContactCount_0 = function() {
      return (Go = t._emscripten_bind_b2World_GetContactCount_0 = t.asm.ib).apply(null, arguments);
    }, Ao = t._emscripten_bind_b2World_GetTreeHeight_0 = function() {
      return (Ao = t._emscripten_bind_b2World_GetTreeHeight_0 = t.asm.jb).apply(null, arguments);
    }, Co = t._emscripten_bind_b2World_GetTreeBalance_0 = function() {
      return (Co = t._emscripten_bind_b2World_GetTreeBalance_0 = t.asm.kb).apply(null, arguments);
    }, Po = t._emscripten_bind_b2World_GetTreeQuality_0 = function() {
      return (Po = t._emscripten_bind_b2World_GetTreeQuality_0 = t.asm.lb).apply(null, arguments);
    }, Bo = t._emscripten_bind_b2World_SetGravity_1 = function() {
      return (Bo = t._emscripten_bind_b2World_SetGravity_1 = t.asm.mb).apply(null, arguments);
    }, xo = t._emscripten_bind_b2World_GetGravity_0 = function() {
      return (xo = t._emscripten_bind_b2World_GetGravity_0 = t.asm.nb).apply(null, arguments);
    }, Mo = t._emscripten_bind_b2World_IsLocked_0 = function() {
      return (Mo = t._emscripten_bind_b2World_IsLocked_0 = t.asm.ob).apply(null, arguments);
    }, wo = t._emscripten_bind_b2World_SetAutoClearForces_1 = function() {
      return (wo = t._emscripten_bind_b2World_SetAutoClearForces_1 = t.asm.pb).apply(null, arguments);
    }, Ro = t._emscripten_bind_b2World_GetAutoClearForces_0 = function() {
      return (Ro = t._emscripten_bind_b2World_GetAutoClearForces_0 = t.asm.qb).apply(null, arguments);
    }, Fo = t._emscripten_bind_b2World_GetProfile_0 = function() {
      return (Fo = t._emscripten_bind_b2World_GetProfile_0 = t.asm.rb).apply(null, arguments);
    }, To = t._emscripten_bind_b2World_Dump_0 = function() {
      return (To = t._emscripten_bind_b2World_Dump_0 = t.asm.sb).apply(null, arguments);
    }, Oo = t._emscripten_bind_b2World___destroy___0 = function() {
      return (Oo = t._emscripten_bind_b2World___destroy___0 = t.asm.tb).apply(null, arguments);
    }, Wo = t._emscripten_bind_b2FixtureUserData_get_pointer_0 = function() {
      return (Wo = t._emscripten_bind_b2FixtureUserData_get_pointer_0 = t.asm.ub).apply(null, arguments);
    }, Lo = t._emscripten_bind_b2FixtureUserData_set_pointer_1 = function() {
      return (Lo = t._emscripten_bind_b2FixtureUserData_set_pointer_1 = t.asm.vb).apply(null, arguments);
    }, Io = t._emscripten_bind_b2FixtureUserData___destroy___0 = function() {
      return (Io = t._emscripten_bind_b2FixtureUserData___destroy___0 = t.asm.wb).apply(null, arguments);
    }, qo = t._emscripten_bind_b2FixtureDef_b2FixtureDef_0 = function() {
      return (qo = t._emscripten_bind_b2FixtureDef_b2FixtureDef_0 = t.asm.xb).apply(null, arguments);
    }, ko = t._emscripten_bind_b2FixtureDef_get_shape_0 = function() {
      return (ko = t._emscripten_bind_b2FixtureDef_get_shape_0 = t.asm.yb).apply(null, arguments);
    }, Eo = t._emscripten_bind_b2FixtureDef_set_shape_1 = function() {
      return (Eo = t._emscripten_bind_b2FixtureDef_set_shape_1 = t.asm.zb).apply(null, arguments);
    }, zo = t._emscripten_bind_b2FixtureDef_get_userData_0 = function() {
      return (zo = t._emscripten_bind_b2FixtureDef_get_userData_0 = t.asm.Ab).apply(null, arguments);
    }, Vo = t._emscripten_bind_b2FixtureDef_set_userData_1 = function() {
      return (Vo = t._emscripten_bind_b2FixtureDef_set_userData_1 = t.asm.Bb).apply(null, arguments);
    }, Uo = t._emscripten_bind_b2FixtureDef_get_friction_0 = function() {
      return (Uo = t._emscripten_bind_b2FixtureDef_get_friction_0 = t.asm.Cb).apply(null, arguments);
    }, $o = t._emscripten_bind_b2FixtureDef_set_friction_1 = function() {
      return ($o = t._emscripten_bind_b2FixtureDef_set_friction_1 = t.asm.Db).apply(null, arguments);
    }, No = t._emscripten_bind_b2FixtureDef_get_restitution_0 = function() {
      return (No = t._emscripten_bind_b2FixtureDef_get_restitution_0 = t.asm.Eb).apply(null, arguments);
    }, Ho = t._emscripten_bind_b2FixtureDef_set_restitution_1 = function() {
      return (Ho = t._emscripten_bind_b2FixtureDef_set_restitution_1 = t.asm.Fb).apply(null, arguments);
    }, Qo = t._emscripten_bind_b2FixtureDef_get_restitutionThreshold_0 = function() {
      return (Qo = t._emscripten_bind_b2FixtureDef_get_restitutionThreshold_0 = t.asm.Gb).apply(null, arguments);
    }, Xo = t._emscripten_bind_b2FixtureDef_set_restitutionThreshold_1 = function() {
      return (Xo = t._emscripten_bind_b2FixtureDef_set_restitutionThreshold_1 = t.asm.Hb).apply(null, arguments);
    }, Yo = t._emscripten_bind_b2FixtureDef_get_density_0 = function() {
      return (Yo = t._emscripten_bind_b2FixtureDef_get_density_0 = t.asm.Ib).apply(null, arguments);
    }, Ko = t._emscripten_bind_b2FixtureDef_set_density_1 = function() {
      return (Ko = t._emscripten_bind_b2FixtureDef_set_density_1 = t.asm.Jb).apply(null, arguments);
    }, tr = t._emscripten_bind_b2FixtureDef_get_isSensor_0 = function() {
      return (tr = t._emscripten_bind_b2FixtureDef_get_isSensor_0 = t.asm.Kb).apply(null, arguments);
    }, er = t._emscripten_bind_b2FixtureDef_set_isSensor_1 = function() {
      return (er = t._emscripten_bind_b2FixtureDef_set_isSensor_1 = t.asm.Lb).apply(null, arguments);
    }, nr = t._emscripten_bind_b2FixtureDef_get_filter_0 = function() {
      return (nr = t._emscripten_bind_b2FixtureDef_get_filter_0 = t.asm.Mb).apply(null, arguments);
    }, or = t._emscripten_bind_b2FixtureDef_set_filter_1 = function() {
      return (or = t._emscripten_bind_b2FixtureDef_set_filter_1 = t.asm.Nb).apply(null, arguments);
    }, rr = t._emscripten_bind_b2FixtureDef___destroy___0 = function() {
      return (rr = t._emscripten_bind_b2FixtureDef___destroy___0 = t.asm.Ob).apply(null, arguments);
    }, _r = t._emscripten_bind_b2Fixture_GetType_0 = function() {
      return (_r = t._emscripten_bind_b2Fixture_GetType_0 = t.asm.Pb).apply(null, arguments);
    }, ir = t._emscripten_bind_b2Fixture_GetShape_0 = function() {
      return (ir = t._emscripten_bind_b2Fixture_GetShape_0 = t.asm.Qb).apply(null, arguments);
    }, pr = t._emscripten_bind_b2Fixture_SetSensor_1 = function() {
      return (pr = t._emscripten_bind_b2Fixture_SetSensor_1 = t.asm.Rb).apply(null, arguments);
    }, ur = t._emscripten_bind_b2Fixture_IsSensor_0 = function() {
      return (ur = t._emscripten_bind_b2Fixture_IsSensor_0 = t.asm.Sb).apply(null, arguments);
    }, sr = t._emscripten_bind_b2Fixture_SetFilterData_1 = function() {
      return (sr = t._emscripten_bind_b2Fixture_SetFilterData_1 = t.asm.Tb).apply(null, arguments);
    }, cr = t._emscripten_bind_b2Fixture_GetFilterData_0 = function() {
      return (cr = t._emscripten_bind_b2Fixture_GetFilterData_0 = t.asm.Ub).apply(null, arguments);
    }, ar = t._emscripten_bind_b2Fixture_Refilter_0 = function() {
      return (ar = t._emscripten_bind_b2Fixture_Refilter_0 = t.asm.Vb).apply(null, arguments);
    }, lr = t._emscripten_bind_b2Fixture_GetBody_0 = function() {
      return (lr = t._emscripten_bind_b2Fixture_GetBody_0 = t.asm.Wb).apply(null, arguments);
    }, yr = t._emscripten_bind_b2Fixture_GetNext_0 = function() {
      return (yr = t._emscripten_bind_b2Fixture_GetNext_0 = t.asm.Xb).apply(null, arguments);
    }, mr = t._emscripten_bind_b2Fixture_GetUserData_0 = function() {
      return (mr = t._emscripten_bind_b2Fixture_GetUserData_0 = t.asm.Yb).apply(null, arguments);
    }, fr = t._emscripten_bind_b2Fixture_TestPoint_1 = function() {
      return (fr = t._emscripten_bind_b2Fixture_TestPoint_1 = t.asm.Zb).apply(null, arguments);
    }, dr = t._emscripten_bind_b2Fixture_RayCast_3 = function() {
      return (dr = t._emscripten_bind_b2Fixture_RayCast_3 = t.asm._b).apply(null, arguments);
    }, br = t._emscripten_bind_b2Fixture_GetMassData_1 = function() {
      return (br = t._emscripten_bind_b2Fixture_GetMassData_1 = t.asm.$b).apply(null, arguments);
    }, gr = t._emscripten_bind_b2Fixture_SetDensity_1 = function() {
      return (gr = t._emscripten_bind_b2Fixture_SetDensity_1 = t.asm.ac).apply(null, arguments);
    }, hr = t._emscripten_bind_b2Fixture_GetDensity_0 = function() {
      return (hr = t._emscripten_bind_b2Fixture_GetDensity_0 = t.asm.bc).apply(null, arguments);
    }, Zr = t._emscripten_bind_b2Fixture_GetFriction_0 = function() {
      return (Zr = t._emscripten_bind_b2Fixture_GetFriction_0 = t.asm.cc).apply(null, arguments);
    }, vr = t._emscripten_bind_b2Fixture_SetFriction_1 = function() {
      return (vr = t._emscripten_bind_b2Fixture_SetFriction_1 = t.asm.dc).apply(null, arguments);
    }, Jr = t._emscripten_bind_b2Fixture_GetRestitution_0 = function() {
      return (Jr = t._emscripten_bind_b2Fixture_GetRestitution_0 = t.asm.ec).apply(null, arguments);
    }, Dr = t._emscripten_bind_b2Fixture_SetRestitution_1 = function() {
      return (Dr = t._emscripten_bind_b2Fixture_SetRestitution_1 = t.asm.fc).apply(null, arguments);
    }, jr = t._emscripten_bind_b2Fixture_GetRestitutionThreshold_0 = function() {
      return (jr = t._emscripten_bind_b2Fixture_GetRestitutionThreshold_0 = t.asm.gc).apply(null, arguments);
    }, Sr = t._emscripten_bind_b2Fixture_SetRestitutionThreshold_1 = function() {
      return (Sr = t._emscripten_bind_b2Fixture_SetRestitutionThreshold_1 = t.asm.hc).apply(null, arguments);
    }, Gr = t._emscripten_bind_b2Fixture_GetAABB_1 = function() {
      return (Gr = t._emscripten_bind_b2Fixture_GetAABB_1 = t.asm.ic).apply(null, arguments);
    }, Ar = t._emscripten_bind_b2Fixture_Dump_1 = function() {
      return (Ar = t._emscripten_bind_b2Fixture_Dump_1 = t.asm.jc).apply(null, arguments);
    }, Cr = t._emscripten_bind_b2Fixture___destroy___0 = function() {
      return (Cr = t._emscripten_bind_b2Fixture___destroy___0 = t.asm.kc).apply(null, arguments);
    }, Pr = t._emscripten_bind_b2Transform_b2Transform_0 = function() {
      return (Pr = t._emscripten_bind_b2Transform_b2Transform_0 = t.asm.lc).apply(null, arguments);
    }, Br = t._emscripten_bind_b2Transform_b2Transform_2 = function() {
      return (Br = t._emscripten_bind_b2Transform_b2Transform_2 = t.asm.mc).apply(null, arguments);
    }, xr = t._emscripten_bind_b2Transform_SetIdentity_0 = function() {
      return (xr = t._emscripten_bind_b2Transform_SetIdentity_0 = t.asm.nc).apply(null, arguments);
    }, Mr = t._emscripten_bind_b2Transform_Set_2 = function() {
      return (Mr = t._emscripten_bind_b2Transform_Set_2 = t.asm.oc).apply(null, arguments);
    }, wr = t._emscripten_bind_b2Transform_get_p_0 = function() {
      return (wr = t._emscripten_bind_b2Transform_get_p_0 = t.asm.pc).apply(null, arguments);
    }, Rr = t._emscripten_bind_b2Transform_set_p_1 = function() {
      return (Rr = t._emscripten_bind_b2Transform_set_p_1 = t.asm.qc).apply(null, arguments);
    }, Fr = t._emscripten_bind_b2Transform_get_q_0 = function() {
      return (Fr = t._emscripten_bind_b2Transform_get_q_0 = t.asm.rc).apply(null, arguments);
    }, Tr = t._emscripten_bind_b2Transform_set_q_1 = function() {
      return (Tr = t._emscripten_bind_b2Transform_set_q_1 = t.asm.sc).apply(null, arguments);
    }, Or = t._emscripten_bind_b2Transform___destroy___0 = function() {
      return (Or = t._emscripten_bind_b2Transform___destroy___0 = t.asm.tc).apply(null, arguments);
    }, Wr = t._emscripten_bind_JSRayCastCallback_JSRayCastCallback_0 = function() {
      return (Wr = t._emscripten_bind_JSRayCastCallback_JSRayCastCallback_0 = t.asm.uc).apply(null, arguments);
    }, Lr = t._emscripten_bind_JSRayCastCallback_ReportFixture_4 = function() {
      return (Lr = t._emscripten_bind_JSRayCastCallback_ReportFixture_4 = t.asm.vc).apply(null, arguments);
    }, Ir = t._emscripten_bind_JSRayCastCallback___destroy___0 = function() {
      return (Ir = t._emscripten_bind_JSRayCastCallback___destroy___0 = t.asm.wc).apply(null, arguments);
    }, qr = t._emscripten_bind_JSQueryCallback_JSQueryCallback_0 = function() {
      return (qr = t._emscripten_bind_JSQueryCallback_JSQueryCallback_0 = t.asm.xc).apply(null, arguments);
    }, kr = t._emscripten_bind_JSQueryCallback_ReportFixture_1 = function() {
      return (kr = t._emscripten_bind_JSQueryCallback_ReportFixture_1 = t.asm.yc).apply(null, arguments);
    }, Er = t._emscripten_bind_JSQueryCallback___destroy___0 = function() {
      return (Er = t._emscripten_bind_JSQueryCallback___destroy___0 = t.asm.zc).apply(null, arguments);
    }, zr = t._emscripten_bind_b2MassData_b2MassData_0 = function() {
      return (zr = t._emscripten_bind_b2MassData_b2MassData_0 = t.asm.Ac).apply(null, arguments);
    }, Vr = t._emscripten_bind_b2MassData_get_mass_0 = function() {
      return (Vr = t._emscripten_bind_b2MassData_get_mass_0 = t.asm.Bc).apply(null, arguments);
    }, Ur = t._emscripten_bind_b2MassData_set_mass_1 = function() {
      return (Ur = t._emscripten_bind_b2MassData_set_mass_1 = t.asm.Cc).apply(null, arguments);
    }, $r = t._emscripten_bind_b2MassData_get_center_0 = function() {
      return ($r = t._emscripten_bind_b2MassData_get_center_0 = t.asm.Dc).apply(null, arguments);
    }, Nr = t._emscripten_bind_b2MassData_set_center_1 = function() {
      return (Nr = t._emscripten_bind_b2MassData_set_center_1 = t.asm.Ec).apply(null, arguments);
    }, Hr = t._emscripten_bind_b2MassData_get_I_0 = function() {
      return (Hr = t._emscripten_bind_b2MassData_get_I_0 = t.asm.Fc).apply(null, arguments);
    }, Qr = t._emscripten_bind_b2MassData_set_I_1 = function() {
      return (Qr = t._emscripten_bind_b2MassData_set_I_1 = t.asm.Gc).apply(null, arguments);
    }, Xr = t._emscripten_bind_b2MassData___destroy___0 = function() {
      return (Xr = t._emscripten_bind_b2MassData___destroy___0 = t.asm.Hc).apply(null, arguments);
    }, Yr = t._emscripten_bind_b2Vec2_b2Vec2_0 = function() {
      return (Yr = t._emscripten_bind_b2Vec2_b2Vec2_0 = t.asm.Ic).apply(null, arguments);
    }, Kr = t._emscripten_bind_b2Vec2_b2Vec2_2 = function() {
      return (Kr = t._emscripten_bind_b2Vec2_b2Vec2_2 = t.asm.Jc).apply(null, arguments);
    }, t_ = t._emscripten_bind_b2Vec2_SetZero_0 = function() {
      return (t_ = t._emscripten_bind_b2Vec2_SetZero_0 = t.asm.Kc).apply(null, arguments);
    }, e_ = t._emscripten_bind_b2Vec2_Set_2 = function() {
      return (e_ = t._emscripten_bind_b2Vec2_Set_2 = t.asm.Lc).apply(null, arguments);
    }, n_ = t._emscripten_bind_b2Vec2_op_add_1 = function() {
      return (n_ = t._emscripten_bind_b2Vec2_op_add_1 = t.asm.Mc).apply(null, arguments);
    }, o_ = t._emscripten_bind_b2Vec2_op_sub_1 = function() {
      return (o_ = t._emscripten_bind_b2Vec2_op_sub_1 = t.asm.Nc).apply(null, arguments);
    }, r_ = t._emscripten_bind_b2Vec2_op_mul_1 = function() {
      return (r_ = t._emscripten_bind_b2Vec2_op_mul_1 = t.asm.Oc).apply(null, arguments);
    }, __ = t._emscripten_bind_b2Vec2_Length_0 = function() {
      return (__ = t._emscripten_bind_b2Vec2_Length_0 = t.asm.Pc).apply(null, arguments);
    }, i_ = t._emscripten_bind_b2Vec2_LengthSquared_0 = function() {
      return (i_ = t._emscripten_bind_b2Vec2_LengthSquared_0 = t.asm.Qc).apply(null, arguments);
    }, p_ = t._emscripten_bind_b2Vec2_Normalize_0 = function() {
      return (p_ = t._emscripten_bind_b2Vec2_Normalize_0 = t.asm.Rc).apply(null, arguments);
    }, u_ = t._emscripten_bind_b2Vec2_IsValid_0 = function() {
      return (u_ = t._emscripten_bind_b2Vec2_IsValid_0 = t.asm.Sc).apply(null, arguments);
    }, s_ = t._emscripten_bind_b2Vec2_Skew_0 = function() {
      return (s_ = t._emscripten_bind_b2Vec2_Skew_0 = t.asm.Tc).apply(null, arguments);
    }, c_ = t._emscripten_bind_b2Vec2_get_x_0 = function() {
      return (c_ = t._emscripten_bind_b2Vec2_get_x_0 = t.asm.Uc).apply(null, arguments);
    }, a_ = t._emscripten_bind_b2Vec2_set_x_1 = function() {
      return (a_ = t._emscripten_bind_b2Vec2_set_x_1 = t.asm.Vc).apply(null, arguments);
    }, l_ = t._emscripten_bind_b2Vec2_get_y_0 = function() {
      return (l_ = t._emscripten_bind_b2Vec2_get_y_0 = t.asm.Wc).apply(null, arguments);
    }, y_ = t._emscripten_bind_b2Vec2_set_y_1 = function() {
      return (y_ = t._emscripten_bind_b2Vec2_set_y_1 = t.asm.Xc).apply(null, arguments);
    }, m_ = t._emscripten_bind_b2Vec2___destroy___0 = function() {
      return (m_ = t._emscripten_bind_b2Vec2___destroy___0 = t.asm.Yc).apply(null, arguments);
    }, f_ = t._emscripten_bind_b2Vec3_b2Vec3_0 = function() {
      return (f_ = t._emscripten_bind_b2Vec3_b2Vec3_0 = t.asm.Zc).apply(null, arguments);
    }, d_ = t._emscripten_bind_b2Vec3_b2Vec3_3 = function() {
      return (d_ = t._emscripten_bind_b2Vec3_b2Vec3_3 = t.asm._c).apply(null, arguments);
    }, b_ = t._emscripten_bind_b2Vec3_SetZero_0 = function() {
      return (b_ = t._emscripten_bind_b2Vec3_SetZero_0 = t.asm.$c).apply(null, arguments);
    }, g_ = t._emscripten_bind_b2Vec3_Set_3 = function() {
      return (g_ = t._emscripten_bind_b2Vec3_Set_3 = t.asm.ad).apply(null, arguments);
    }, h_ = t._emscripten_bind_b2Vec3_op_add_1 = function() {
      return (h_ = t._emscripten_bind_b2Vec3_op_add_1 = t.asm.bd).apply(null, arguments);
    }, Z_ = t._emscripten_bind_b2Vec3_op_sub_1 = function() {
      return (Z_ = t._emscripten_bind_b2Vec3_op_sub_1 = t.asm.cd).apply(null, arguments);
    }, v_ = t._emscripten_bind_b2Vec3_op_mul_1 = function() {
      return (v_ = t._emscripten_bind_b2Vec3_op_mul_1 = t.asm.dd).apply(null, arguments);
    }, J_ = t._emscripten_bind_b2Vec3_get_x_0 = function() {
      return (J_ = t._emscripten_bind_b2Vec3_get_x_0 = t.asm.ed).apply(null, arguments);
    }, D_ = t._emscripten_bind_b2Vec3_set_x_1 = function() {
      return (D_ = t._emscripten_bind_b2Vec3_set_x_1 = t.asm.fd).apply(null, arguments);
    }, j_ = t._emscripten_bind_b2Vec3_get_y_0 = function() {
      return (j_ = t._emscripten_bind_b2Vec3_get_y_0 = t.asm.gd).apply(null, arguments);
    }, S_ = t._emscripten_bind_b2Vec3_set_y_1 = function() {
      return (S_ = t._emscripten_bind_b2Vec3_set_y_1 = t.asm.hd).apply(null, arguments);
    }, G_ = t._emscripten_bind_b2Vec3_get_z_0 = function() {
      return (G_ = t._emscripten_bind_b2Vec3_get_z_0 = t.asm.id).apply(null, arguments);
    }, A_ = t._emscripten_bind_b2Vec3_set_z_1 = function() {
      return (A_ = t._emscripten_bind_b2Vec3_set_z_1 = t.asm.jd).apply(null, arguments);
    }, C_ = t._emscripten_bind_b2Vec3___destroy___0 = function() {
      return (C_ = t._emscripten_bind_b2Vec3___destroy___0 = t.asm.kd).apply(null, arguments);
    }, P_ = t._emscripten_bind_b2BodyUserData_get_pointer_0 = function() {
      return (P_ = t._emscripten_bind_b2BodyUserData_get_pointer_0 = t.asm.ld).apply(null, arguments);
    }, B_ = t._emscripten_bind_b2BodyUserData_set_pointer_1 = function() {
      return (B_ = t._emscripten_bind_b2BodyUserData_set_pointer_1 = t.asm.md).apply(null, arguments);
    }, x_ = t._emscripten_bind_b2BodyUserData___destroy___0 = function() {
      return (x_ = t._emscripten_bind_b2BodyUserData___destroy___0 = t.asm.nd).apply(null, arguments);
    }, M_ = t._emscripten_bind_b2Body_CreateFixture_1 = function() {
      return (M_ = t._emscripten_bind_b2Body_CreateFixture_1 = t.asm.od).apply(null, arguments);
    }, w_ = t._emscripten_bind_b2Body_CreateFixture_2 = function() {
      return (w_ = t._emscripten_bind_b2Body_CreateFixture_2 = t.asm.pd).apply(null, arguments);
    }, R_ = t._emscripten_bind_b2Body_DestroyFixture_1 = function() {
      return (R_ = t._emscripten_bind_b2Body_DestroyFixture_1 = t.asm.qd).apply(null, arguments);
    }, F_ = t._emscripten_bind_b2Body_SetTransform_2 = function() {
      return (F_ = t._emscripten_bind_b2Body_SetTransform_2 = t.asm.rd).apply(null, arguments);
    }, T_ = t._emscripten_bind_b2Body_GetTransform_0 = function() {
      return (T_ = t._emscripten_bind_b2Body_GetTransform_0 = t.asm.sd).apply(null, arguments);
    }, O_ = t._emscripten_bind_b2Body_GetPosition_0 = function() {
      return (O_ = t._emscripten_bind_b2Body_GetPosition_0 = t.asm.td).apply(null, arguments);
    }, W_ = t._emscripten_bind_b2Body_GetAngle_0 = function() {
      return (W_ = t._emscripten_bind_b2Body_GetAngle_0 = t.asm.ud).apply(null, arguments);
    }, L_ = t._emscripten_bind_b2Body_GetWorldCenter_0 = function() {
      return (L_ = t._emscripten_bind_b2Body_GetWorldCenter_0 = t.asm.vd).apply(null, arguments);
    }, I_ = t._emscripten_bind_b2Body_GetLocalCenter_0 = function() {
      return (I_ = t._emscripten_bind_b2Body_GetLocalCenter_0 = t.asm.wd).apply(null, arguments);
    }, q_ = t._emscripten_bind_b2Body_SetLinearVelocity_1 = function() {
      return (q_ = t._emscripten_bind_b2Body_SetLinearVelocity_1 = t.asm.xd).apply(null, arguments);
    }, k_ = t._emscripten_bind_b2Body_GetLinearVelocity_0 = function() {
      return (k_ = t._emscripten_bind_b2Body_GetLinearVelocity_0 = t.asm.yd).apply(null, arguments);
    }, E_ = t._emscripten_bind_b2Body_SetAngularVelocity_1 = function() {
      return (E_ = t._emscripten_bind_b2Body_SetAngularVelocity_1 = t.asm.zd).apply(null, arguments);
    }, z_ = t._emscripten_bind_b2Body_GetAngularVelocity_0 = function() {
      return (z_ = t._emscripten_bind_b2Body_GetAngularVelocity_0 = t.asm.Ad).apply(null, arguments);
    }, V_ = t._emscripten_bind_b2Body_ApplyForce_3 = function() {
      return (V_ = t._emscripten_bind_b2Body_ApplyForce_3 = t.asm.Bd).apply(null, arguments);
    }, U_ = t._emscripten_bind_b2Body_ApplyForceToCenter_2 = function() {
      return (U_ = t._emscripten_bind_b2Body_ApplyForceToCenter_2 = t.asm.Cd).apply(null, arguments);
    }, $_ = t._emscripten_bind_b2Body_ApplyTorque_2 = function() {
      return ($_ = t._emscripten_bind_b2Body_ApplyTorque_2 = t.asm.Dd).apply(null, arguments);
    }, N_ = t._emscripten_bind_b2Body_ApplyLinearImpulse_3 = function() {
      return (N_ = t._emscripten_bind_b2Body_ApplyLinearImpulse_3 = t.asm.Ed).apply(null, arguments);
    }, H_ = t._emscripten_bind_b2Body_ApplyLinearImpulseToCenter_2 = function() {
      return (H_ = t._emscripten_bind_b2Body_ApplyLinearImpulseToCenter_2 = t.asm.Fd).apply(null, arguments);
    }, Q_ = t._emscripten_bind_b2Body_ApplyAngularImpulse_2 = function() {
      return (Q_ = t._emscripten_bind_b2Body_ApplyAngularImpulse_2 = t.asm.Gd).apply(null, arguments);
    }, X_ = t._emscripten_bind_b2Body_GetMass_0 = function() {
      return (X_ = t._emscripten_bind_b2Body_GetMass_0 = t.asm.Hd).apply(null, arguments);
    }, Y_ = t._emscripten_bind_b2Body_GetInertia_0 = function() {
      return (Y_ = t._emscripten_bind_b2Body_GetInertia_0 = t.asm.Id).apply(null, arguments);
    }, K_ = t._emscripten_bind_b2Body_GetMassData_1 = function() {
      return (K_ = t._emscripten_bind_b2Body_GetMassData_1 = t.asm.Jd).apply(null, arguments);
    }, ti = t._emscripten_bind_b2Body_SetMassData_1 = function() {
      return (ti = t._emscripten_bind_b2Body_SetMassData_1 = t.asm.Kd).apply(null, arguments);
    }, ei = t._emscripten_bind_b2Body_ResetMassData_0 = function() {
      return (ei = t._emscripten_bind_b2Body_ResetMassData_0 = t.asm.Ld).apply(null, arguments);
    }, ni = t._emscripten_bind_b2Body_GetWorldPoint_1 = function() {
      return (ni = t._emscripten_bind_b2Body_GetWorldPoint_1 = t.asm.Md).apply(null, arguments);
    }, oi = t._emscripten_bind_b2Body_GetWorldVector_1 = function() {
      return (oi = t._emscripten_bind_b2Body_GetWorldVector_1 = t.asm.Nd).apply(null, arguments);
    }, ri = t._emscripten_bind_b2Body_GetLocalPoint_1 = function() {
      return (ri = t._emscripten_bind_b2Body_GetLocalPoint_1 = t.asm.Od).apply(null, arguments);
    }, _i = t._emscripten_bind_b2Body_GetLocalVector_1 = function() {
      return (_i = t._emscripten_bind_b2Body_GetLocalVector_1 = t.asm.Pd).apply(null, arguments);
    }, ii = t._emscripten_bind_b2Body_GetLinearVelocityFromWorldPoint_1 = function() {
      return (ii = t._emscripten_bind_b2Body_GetLinearVelocityFromWorldPoint_1 = t.asm.Qd).apply(null, arguments);
    }, pi = t._emscripten_bind_b2Body_GetLinearVelocityFromLocalPoint_1 = function() {
      return (pi = t._emscripten_bind_b2Body_GetLinearVelocityFromLocalPoint_1 = t.asm.Rd).apply(null, arguments);
    }, ui = t._emscripten_bind_b2Body_GetLinearDamping_0 = function() {
      return (ui = t._emscripten_bind_b2Body_GetLinearDamping_0 = t.asm.Sd).apply(null, arguments);
    }, si = t._emscripten_bind_b2Body_SetLinearDamping_1 = function() {
      return (si = t._emscripten_bind_b2Body_SetLinearDamping_1 = t.asm.Td).apply(null, arguments);
    }, ci = t._emscripten_bind_b2Body_GetAngularDamping_0 = function() {
      return (ci = t._emscripten_bind_b2Body_GetAngularDamping_0 = t.asm.Ud).apply(null, arguments);
    }, ai = t._emscripten_bind_b2Body_SetAngularDamping_1 = function() {
      return (ai = t._emscripten_bind_b2Body_SetAngularDamping_1 = t.asm.Vd).apply(null, arguments);
    }, li = t._emscripten_bind_b2Body_GetGravityScale_0 = function() {
      return (li = t._emscripten_bind_b2Body_GetGravityScale_0 = t.asm.Wd).apply(null, arguments);
    }, yi = t._emscripten_bind_b2Body_SetGravityScale_1 = function() {
      return (yi = t._emscripten_bind_b2Body_SetGravityScale_1 = t.asm.Xd).apply(null, arguments);
    }, mi = t._emscripten_bind_b2Body_SetType_1 = function() {
      return (mi = t._emscripten_bind_b2Body_SetType_1 = t.asm.Yd).apply(null, arguments);
    }, fi = t._emscripten_bind_b2Body_GetType_0 = function() {
      return (fi = t._emscripten_bind_b2Body_GetType_0 = t.asm.Zd).apply(null, arguments);
    }, di = t._emscripten_bind_b2Body_SetBullet_1 = function() {
      return (di = t._emscripten_bind_b2Body_SetBullet_1 = t.asm._d).apply(null, arguments);
    }, bi = t._emscripten_bind_b2Body_IsBullet_0 = function() {
      return (bi = t._emscripten_bind_b2Body_IsBullet_0 = t.asm.$d).apply(null, arguments);
    }, gi = t._emscripten_bind_b2Body_SetSleepingAllowed_1 = function() {
      return (gi = t._emscripten_bind_b2Body_SetSleepingAllowed_1 = t.asm.ae).apply(null, arguments);
    }, hi = t._emscripten_bind_b2Body_IsSleepingAllowed_0 = function() {
      return (hi = t._emscripten_bind_b2Body_IsSleepingAllowed_0 = t.asm.be).apply(null, arguments);
    }, Zi = t._emscripten_bind_b2Body_SetAwake_1 = function() {
      return (Zi = t._emscripten_bind_b2Body_SetAwake_1 = t.asm.ce).apply(null, arguments);
    }, vi = t._emscripten_bind_b2Body_IsAwake_0 = function() {
      return (vi = t._emscripten_bind_b2Body_IsAwake_0 = t.asm.de).apply(null, arguments);
    }, Ji = t._emscripten_bind_b2Body_SetEnabled_1 = function() {
      return (Ji = t._emscripten_bind_b2Body_SetEnabled_1 = t.asm.ee).apply(null, arguments);
    }, Di = t._emscripten_bind_b2Body_IsEnabled_0 = function() {
      return (Di = t._emscripten_bind_b2Body_IsEnabled_0 = t.asm.fe).apply(null, arguments);
    }, ji = t._emscripten_bind_b2Body_SetFixedRotation_1 = function() {
      return (ji = t._emscripten_bind_b2Body_SetFixedRotation_1 = t.asm.ge).apply(null, arguments);
    }, Si = t._emscripten_bind_b2Body_IsFixedRotation_0 = function() {
      return (Si = t._emscripten_bind_b2Body_IsFixedRotation_0 = t.asm.he).apply(null, arguments);
    }, Gi = t._emscripten_bind_b2Body_GetFixtureList_0 = function() {
      return (Gi = t._emscripten_bind_b2Body_GetFixtureList_0 = t.asm.ie).apply(null, arguments);
    }, Ai = t._emscripten_bind_b2Body_GetJointList_0 = function() {
      return (Ai = t._emscripten_bind_b2Body_GetJointList_0 = t.asm.je).apply(null, arguments);
    }, Ci = t._emscripten_bind_b2Body_GetContactList_0 = function() {
      return (Ci = t._emscripten_bind_b2Body_GetContactList_0 = t.asm.ke).apply(null, arguments);
    }, Pi = t._emscripten_bind_b2Body_GetNext_0 = function() {
      return (Pi = t._emscripten_bind_b2Body_GetNext_0 = t.asm.le).apply(null, arguments);
    }, Bi = t._emscripten_bind_b2Body_GetUserData_0 = function() {
      return (Bi = t._emscripten_bind_b2Body_GetUserData_0 = t.asm.me).apply(null, arguments);
    }, xi = t._emscripten_bind_b2Body_GetWorld_0 = function() {
      return (xi = t._emscripten_bind_b2Body_GetWorld_0 = t.asm.ne).apply(null, arguments);
    }, Mi = t._emscripten_bind_b2Body_Dump_0 = function() {
      return (Mi = t._emscripten_bind_b2Body_Dump_0 = t.asm.oe).apply(null, arguments);
    }, wi = t._emscripten_bind_b2BodyDef_b2BodyDef_0 = function() {
      return (wi = t._emscripten_bind_b2BodyDef_b2BodyDef_0 = t.asm.pe).apply(null, arguments);
    }, Ri = t._emscripten_bind_b2BodyDef_get_type_0 = function() {
      return (Ri = t._emscripten_bind_b2BodyDef_get_type_0 = t.asm.qe).apply(null, arguments);
    }, Fi = t._emscripten_bind_b2BodyDef_set_type_1 = function() {
      return (Fi = t._emscripten_bind_b2BodyDef_set_type_1 = t.asm.re).apply(null, arguments);
    }, Ti = t._emscripten_bind_b2BodyDef_get_position_0 = function() {
      return (Ti = t._emscripten_bind_b2BodyDef_get_position_0 = t.asm.se).apply(null, arguments);
    }, Oi = t._emscripten_bind_b2BodyDef_set_position_1 = function() {
      return (Oi = t._emscripten_bind_b2BodyDef_set_position_1 = t.asm.te).apply(null, arguments);
    }, Wi = t._emscripten_bind_b2BodyDef_get_angle_0 = function() {
      return (Wi = t._emscripten_bind_b2BodyDef_get_angle_0 = t.asm.ue).apply(null, arguments);
    }, Li = t._emscripten_bind_b2BodyDef_set_angle_1 = function() {
      return (Li = t._emscripten_bind_b2BodyDef_set_angle_1 = t.asm.ve).apply(null, arguments);
    }, Ii = t._emscripten_bind_b2BodyDef_get_linearVelocity_0 = function() {
      return (Ii = t._emscripten_bind_b2BodyDef_get_linearVelocity_0 = t.asm.we).apply(null, arguments);
    }, qi = t._emscripten_bind_b2BodyDef_set_linearVelocity_1 = function() {
      return (qi = t._emscripten_bind_b2BodyDef_set_linearVelocity_1 = t.asm.xe).apply(null, arguments);
    }, ki = t._emscripten_bind_b2BodyDef_get_angularVelocity_0 = function() {
      return (ki = t._emscripten_bind_b2BodyDef_get_angularVelocity_0 = t.asm.ye).apply(null, arguments);
    }, Ei = t._emscripten_bind_b2BodyDef_set_angularVelocity_1 = function() {
      return (Ei = t._emscripten_bind_b2BodyDef_set_angularVelocity_1 = t.asm.ze).apply(null, arguments);
    }, zi = t._emscripten_bind_b2BodyDef_get_linearDamping_0 = function() {
      return (zi = t._emscripten_bind_b2BodyDef_get_linearDamping_0 = t.asm.Ae).apply(null, arguments);
    }, Vi = t._emscripten_bind_b2BodyDef_set_linearDamping_1 = function() {
      return (Vi = t._emscripten_bind_b2BodyDef_set_linearDamping_1 = t.asm.Be).apply(null, arguments);
    }, Ui = t._emscripten_bind_b2BodyDef_get_angularDamping_0 = function() {
      return (Ui = t._emscripten_bind_b2BodyDef_get_angularDamping_0 = t.asm.Ce).apply(null, arguments);
    }, $i = t._emscripten_bind_b2BodyDef_set_angularDamping_1 = function() {
      return ($i = t._emscripten_bind_b2BodyDef_set_angularDamping_1 = t.asm.De).apply(null, arguments);
    }, Ni = t._emscripten_bind_b2BodyDef_get_allowSleep_0 = function() {
      return (Ni = t._emscripten_bind_b2BodyDef_get_allowSleep_0 = t.asm.Ee).apply(null, arguments);
    }, Hi = t._emscripten_bind_b2BodyDef_set_allowSleep_1 = function() {
      return (Hi = t._emscripten_bind_b2BodyDef_set_allowSleep_1 = t.asm.Fe).apply(null, arguments);
    }, Qi = t._emscripten_bind_b2BodyDef_get_awake_0 = function() {
      return (Qi = t._emscripten_bind_b2BodyDef_get_awake_0 = t.asm.Ge).apply(null, arguments);
    }, Xi = t._emscripten_bind_b2BodyDef_set_awake_1 = function() {
      return (Xi = t._emscripten_bind_b2BodyDef_set_awake_1 = t.asm.He).apply(null, arguments);
    }, Yi = t._emscripten_bind_b2BodyDef_get_fixedRotation_0 = function() {
      return (Yi = t._emscripten_bind_b2BodyDef_get_fixedRotation_0 = t.asm.Ie).apply(null, arguments);
    }, Ki = t._emscripten_bind_b2BodyDef_set_fixedRotation_1 = function() {
      return (Ki = t._emscripten_bind_b2BodyDef_set_fixedRotation_1 = t.asm.Je).apply(null, arguments);
    }, tp = t._emscripten_bind_b2BodyDef_get_bullet_0 = function() {
      return (tp = t._emscripten_bind_b2BodyDef_get_bullet_0 = t.asm.Ke).apply(null, arguments);
    }, ep = t._emscripten_bind_b2BodyDef_set_bullet_1 = function() {
      return (ep = t._emscripten_bind_b2BodyDef_set_bullet_1 = t.asm.Le).apply(null, arguments);
    }, np = t._emscripten_bind_b2BodyDef_get_enabled_0 = function() {
      return (np = t._emscripten_bind_b2BodyDef_get_enabled_0 = t.asm.Me).apply(null, arguments);
    }, op = t._emscripten_bind_b2BodyDef_set_enabled_1 = function() {
      return (op = t._emscripten_bind_b2BodyDef_set_enabled_1 = t.asm.Ne).apply(null, arguments);
    }, rp = t._emscripten_bind_b2BodyDef_get_userData_0 = function() {
      return (rp = t._emscripten_bind_b2BodyDef_get_userData_0 = t.asm.Oe).apply(null, arguments);
    }, _p = t._emscripten_bind_b2BodyDef_set_userData_1 = function() {
      return (_p = t._emscripten_bind_b2BodyDef_set_userData_1 = t.asm.Pe).apply(null, arguments);
    }, ip = t._emscripten_bind_b2BodyDef_get_gravityScale_0 = function() {
      return (ip = t._emscripten_bind_b2BodyDef_get_gravityScale_0 = t.asm.Qe).apply(null, arguments);
    }, pp = t._emscripten_bind_b2BodyDef_set_gravityScale_1 = function() {
      return (pp = t._emscripten_bind_b2BodyDef_set_gravityScale_1 = t.asm.Re).apply(null, arguments);
    }, up = t._emscripten_bind_b2BodyDef___destroy___0 = function() {
      return (up = t._emscripten_bind_b2BodyDef___destroy___0 = t.asm.Se).apply(null, arguments);
    }, sp = t._emscripten_bind_b2Filter_b2Filter_0 = function() {
      return (sp = t._emscripten_bind_b2Filter_b2Filter_0 = t.asm.Te).apply(null, arguments);
    }, cp = t._emscripten_bind_b2Filter_get_categoryBits_0 = function() {
      return (cp = t._emscripten_bind_b2Filter_get_categoryBits_0 = t.asm.Ue).apply(null, arguments);
    }, ap = t._emscripten_bind_b2Filter_set_categoryBits_1 = function() {
      return (ap = t._emscripten_bind_b2Filter_set_categoryBits_1 = t.asm.Ve).apply(null, arguments);
    }, lp = t._emscripten_bind_b2Filter_get_maskBits_0 = function() {
      return (lp = t._emscripten_bind_b2Filter_get_maskBits_0 = t.asm.We).apply(null, arguments);
    }, yp = t._emscripten_bind_b2Filter_set_maskBits_1 = function() {
      return (yp = t._emscripten_bind_b2Filter_set_maskBits_1 = t.asm.Xe).apply(null, arguments);
    }, mp = t._emscripten_bind_b2Filter_get_groupIndex_0 = function() {
      return (mp = t._emscripten_bind_b2Filter_get_groupIndex_0 = t.asm.Ye).apply(null, arguments);
    }, fp = t._emscripten_bind_b2Filter_set_groupIndex_1 = function() {
      return (fp = t._emscripten_bind_b2Filter_set_groupIndex_1 = t.asm.Ze).apply(null, arguments);
    }, dp = t._emscripten_bind_b2Filter___destroy___0 = function() {
      return (dp = t._emscripten_bind_b2Filter___destroy___0 = t.asm._e).apply(null, arguments);
    }, bp = t._emscripten_bind_b2AABB_b2AABB_0 = function() {
      return (bp = t._emscripten_bind_b2AABB_b2AABB_0 = t.asm.$e).apply(null, arguments);
    }, gp = t._emscripten_bind_b2AABB_IsValid_0 = function() {
      return (gp = t._emscripten_bind_b2AABB_IsValid_0 = t.asm.af).apply(null, arguments);
    }, hp = t._emscripten_bind_b2AABB_GetCenter_0 = function() {
      return (hp = t._emscripten_bind_b2AABB_GetCenter_0 = t.asm.bf).apply(null, arguments);
    }, Zp = t._emscripten_bind_b2AABB_GetExtents_0 = function() {
      return (Zp = t._emscripten_bind_b2AABB_GetExtents_0 = t.asm.cf).apply(null, arguments);
    }, vp = t._emscripten_bind_b2AABB_GetPerimeter_0 = function() {
      return (vp = t._emscripten_bind_b2AABB_GetPerimeter_0 = t.asm.df).apply(null, arguments);
    }, Jp = t._emscripten_bind_b2AABB_Combine_1 = function() {
      return (Jp = t._emscripten_bind_b2AABB_Combine_1 = t.asm.ef).apply(null, arguments);
    }, Dp = t._emscripten_bind_b2AABB_Combine_2 = function() {
      return (Dp = t._emscripten_bind_b2AABB_Combine_2 = t.asm.ff).apply(null, arguments);
    }, jp = t._emscripten_bind_b2AABB_Contains_1 = function() {
      return (jp = t._emscripten_bind_b2AABB_Contains_1 = t.asm.gf).apply(null, arguments);
    }, Sp = t._emscripten_bind_b2AABB_RayCast_2 = function() {
      return (Sp = t._emscripten_bind_b2AABB_RayCast_2 = t.asm.hf).apply(null, arguments);
    }, Gp = t._emscripten_bind_b2AABB_get_lowerBound_0 = function() {
      return (Gp = t._emscripten_bind_b2AABB_get_lowerBound_0 = t.asm.jf).apply(null, arguments);
    }, Ap = t._emscripten_bind_b2AABB_set_lowerBound_1 = function() {
      return (Ap = t._emscripten_bind_b2AABB_set_lowerBound_1 = t.asm.kf).apply(null, arguments);
    }, Cp = t._emscripten_bind_b2AABB_get_upperBound_0 = function() {
      return (Cp = t._emscripten_bind_b2AABB_get_upperBound_0 = t.asm.lf).apply(null, arguments);
    }, Pp = t._emscripten_bind_b2AABB_set_upperBound_1 = function() {
      return (Pp = t._emscripten_bind_b2AABB_set_upperBound_1 = t.asm.mf).apply(null, arguments);
    }, Bp = t._emscripten_bind_b2AABB___destroy___0 = function() {
      return (Bp = t._emscripten_bind_b2AABB___destroy___0 = t.asm.nf).apply(null, arguments);
    }, xp = t._emscripten_bind_b2CircleShape_b2CircleShape_0 = function() {
      return (xp = t._emscripten_bind_b2CircleShape_b2CircleShape_0 = t.asm.of).apply(null, arguments);
    }, Mp = t._emscripten_bind_b2CircleShape_GetType_0 = function() {
      return (Mp = t._emscripten_bind_b2CircleShape_GetType_0 = t.asm.pf).apply(null, arguments);
    }, wp = t._emscripten_bind_b2CircleShape_GetChildCount_0 = function() {
      return (wp = t._emscripten_bind_b2CircleShape_GetChildCount_0 = t.asm.qf).apply(null, arguments);
    }, Rp = t._emscripten_bind_b2CircleShape_TestPoint_2 = function() {
      return (Rp = t._emscripten_bind_b2CircleShape_TestPoint_2 = t.asm.rf).apply(null, arguments);
    }, Fp = t._emscripten_bind_b2CircleShape_RayCast_4 = function() {
      return (Fp = t._emscripten_bind_b2CircleShape_RayCast_4 = t.asm.sf).apply(null, arguments);
    }, Tp = t._emscripten_bind_b2CircleShape_ComputeAABB_3 = function() {
      return (Tp = t._emscripten_bind_b2CircleShape_ComputeAABB_3 = t.asm.tf).apply(null, arguments);
    }, Op = t._emscripten_bind_b2CircleShape_ComputeMass_2 = function() {
      return (Op = t._emscripten_bind_b2CircleShape_ComputeMass_2 = t.asm.uf).apply(null, arguments);
    }, Wp = t._emscripten_bind_b2CircleShape_get_m_p_0 = function() {
      return (Wp = t._emscripten_bind_b2CircleShape_get_m_p_0 = t.asm.vf).apply(null, arguments);
    }, Lp = t._emscripten_bind_b2CircleShape_set_m_p_1 = function() {
      return (Lp = t._emscripten_bind_b2CircleShape_set_m_p_1 = t.asm.wf).apply(null, arguments);
    }, Ip = t._emscripten_bind_b2CircleShape_get_m_type_0 = function() {
      return (Ip = t._emscripten_bind_b2CircleShape_get_m_type_0 = t.asm.xf).apply(null, arguments);
    }, qp = t._emscripten_bind_b2CircleShape_set_m_type_1 = function() {
      return (qp = t._emscripten_bind_b2CircleShape_set_m_type_1 = t.asm.yf).apply(null, arguments);
    }, kp = t._emscripten_bind_b2CircleShape_get_m_radius_0 = function() {
      return (kp = t._emscripten_bind_b2CircleShape_get_m_radius_0 = t.asm.zf).apply(null, arguments);
    }, Ep = t._emscripten_bind_b2CircleShape_set_m_radius_1 = function() {
      return (Ep = t._emscripten_bind_b2CircleShape_set_m_radius_1 = t.asm.Af).apply(null, arguments);
    }, zp = t._emscripten_bind_b2CircleShape___destroy___0 = function() {
      return (zp = t._emscripten_bind_b2CircleShape___destroy___0 = t.asm.Bf).apply(null, arguments);
    }, Vp = t._emscripten_bind_b2EdgeShape_b2EdgeShape_0 = function() {
      return (Vp = t._emscripten_bind_b2EdgeShape_b2EdgeShape_0 = t.asm.Cf).apply(null, arguments);
    }, Up = t._emscripten_bind_b2EdgeShape_SetOneSided_4 = function() {
      return (Up = t._emscripten_bind_b2EdgeShape_SetOneSided_4 = t.asm.Df).apply(null, arguments);
    }, $p = t._emscripten_bind_b2EdgeShape_SetTwoSided_2 = function() {
      return ($p = t._emscripten_bind_b2EdgeShape_SetTwoSided_2 = t.asm.Ef).apply(null, arguments);
    }, Np = t._emscripten_bind_b2EdgeShape_GetType_0 = function() {
      return (Np = t._emscripten_bind_b2EdgeShape_GetType_0 = t.asm.Ff).apply(null, arguments);
    }, Hp = t._emscripten_bind_b2EdgeShape_GetChildCount_0 = function() {
      return (Hp = t._emscripten_bind_b2EdgeShape_GetChildCount_0 = t.asm.Gf).apply(null, arguments);
    }, Qp = t._emscripten_bind_b2EdgeShape_TestPoint_2 = function() {
      return (Qp = t._emscripten_bind_b2EdgeShape_TestPoint_2 = t.asm.Hf).apply(null, arguments);
    }, Xp = t._emscripten_bind_b2EdgeShape_RayCast_4 = function() {
      return (Xp = t._emscripten_bind_b2EdgeShape_RayCast_4 = t.asm.If).apply(null, arguments);
    }, Yp = t._emscripten_bind_b2EdgeShape_ComputeAABB_3 = function() {
      return (Yp = t._emscripten_bind_b2EdgeShape_ComputeAABB_3 = t.asm.Jf).apply(null, arguments);
    }, Kp = t._emscripten_bind_b2EdgeShape_ComputeMass_2 = function() {
      return (Kp = t._emscripten_bind_b2EdgeShape_ComputeMass_2 = t.asm.Kf).apply(null, arguments);
    }, tu = t._emscripten_bind_b2EdgeShape_get_m_vertex1_0 = function() {
      return (tu = t._emscripten_bind_b2EdgeShape_get_m_vertex1_0 = t.asm.Lf).apply(null, arguments);
    }, eu = t._emscripten_bind_b2EdgeShape_set_m_vertex1_1 = function() {
      return (eu = t._emscripten_bind_b2EdgeShape_set_m_vertex1_1 = t.asm.Mf).apply(null, arguments);
    }, nu = t._emscripten_bind_b2EdgeShape_get_m_vertex2_0 = function() {
      return (nu = t._emscripten_bind_b2EdgeShape_get_m_vertex2_0 = t.asm.Nf).apply(null, arguments);
    }, ou = t._emscripten_bind_b2EdgeShape_set_m_vertex2_1 = function() {
      return (ou = t._emscripten_bind_b2EdgeShape_set_m_vertex2_1 = t.asm.Of).apply(null, arguments);
    }, ru = t._emscripten_bind_b2EdgeShape_get_m_vertex0_0 = function() {
      return (ru = t._emscripten_bind_b2EdgeShape_get_m_vertex0_0 = t.asm.Pf).apply(null, arguments);
    }, _u = t._emscripten_bind_b2EdgeShape_set_m_vertex0_1 = function() {
      return (_u = t._emscripten_bind_b2EdgeShape_set_m_vertex0_1 = t.asm.Qf).apply(null, arguments);
    }, iu = t._emscripten_bind_b2EdgeShape_get_m_vertex3_0 = function() {
      return (iu = t._emscripten_bind_b2EdgeShape_get_m_vertex3_0 = t.asm.Rf).apply(null, arguments);
    }, pu = t._emscripten_bind_b2EdgeShape_set_m_vertex3_1 = function() {
      return (pu = t._emscripten_bind_b2EdgeShape_set_m_vertex3_1 = t.asm.Sf).apply(null, arguments);
    }, uu = t._emscripten_bind_b2EdgeShape_get_m_oneSided_0 = function() {
      return (uu = t._emscripten_bind_b2EdgeShape_get_m_oneSided_0 = t.asm.Tf).apply(null, arguments);
    }, su = t._emscripten_bind_b2EdgeShape_set_m_oneSided_1 = function() {
      return (su = t._emscripten_bind_b2EdgeShape_set_m_oneSided_1 = t.asm.Uf).apply(null, arguments);
    }, cu = t._emscripten_bind_b2EdgeShape_get_m_type_0 = function() {
      return (cu = t._emscripten_bind_b2EdgeShape_get_m_type_0 = t.asm.Vf).apply(null, arguments);
    }, au = t._emscripten_bind_b2EdgeShape_set_m_type_1 = function() {
      return (au = t._emscripten_bind_b2EdgeShape_set_m_type_1 = t.asm.Wf).apply(null, arguments);
    }, lu = t._emscripten_bind_b2EdgeShape_get_m_radius_0 = function() {
      return (lu = t._emscripten_bind_b2EdgeShape_get_m_radius_0 = t.asm.Xf).apply(null, arguments);
    }, yu = t._emscripten_bind_b2EdgeShape_set_m_radius_1 = function() {
      return (yu = t._emscripten_bind_b2EdgeShape_set_m_radius_1 = t.asm.Yf).apply(null, arguments);
    }, mu = t._emscripten_bind_b2EdgeShape___destroy___0 = function() {
      return (mu = t._emscripten_bind_b2EdgeShape___destroy___0 = t.asm.Zf).apply(null, arguments);
    }, fu = t._emscripten_bind_b2JointUserData_get_pointer_0 = function() {
      return (fu = t._emscripten_bind_b2JointUserData_get_pointer_0 = t.asm._f).apply(null, arguments);
    }, du = t._emscripten_bind_b2JointUserData_set_pointer_1 = function() {
      return (du = t._emscripten_bind_b2JointUserData_set_pointer_1 = t.asm.$f).apply(null, arguments);
    }, bu = t._emscripten_bind_b2JointUserData___destroy___0 = function() {
      return (bu = t._emscripten_bind_b2JointUserData___destroy___0 = t.asm.ag).apply(null, arguments);
    }, gu = t._emscripten_bind_b2WeldJoint_GetLocalAnchorA_0 = function() {
      return (gu = t._emscripten_bind_b2WeldJoint_GetLocalAnchorA_0 = t.asm.bg).apply(null, arguments);
    }, hu = t._emscripten_bind_b2WeldJoint_GetLocalAnchorB_0 = function() {
      return (hu = t._emscripten_bind_b2WeldJoint_GetLocalAnchorB_0 = t.asm.cg).apply(null, arguments);
    }, Zu = t._emscripten_bind_b2WeldJoint_GetReferenceAngle_0 = function() {
      return (Zu = t._emscripten_bind_b2WeldJoint_GetReferenceAngle_0 = t.asm.dg).apply(null, arguments);
    }, vu = t._emscripten_bind_b2WeldJoint_SetStiffness_1 = function() {
      return (vu = t._emscripten_bind_b2WeldJoint_SetStiffness_1 = t.asm.eg).apply(null, arguments);
    }, Ju = t._emscripten_bind_b2WeldJoint_GetStiffness_0 = function() {
      return (Ju = t._emscripten_bind_b2WeldJoint_GetStiffness_0 = t.asm.fg).apply(null, arguments);
    }, Du = t._emscripten_bind_b2WeldJoint_SetDamping_1 = function() {
      return (Du = t._emscripten_bind_b2WeldJoint_SetDamping_1 = t.asm.gg).apply(null, arguments);
    }, ju = t._emscripten_bind_b2WeldJoint_GetDamping_0 = function() {
      return (ju = t._emscripten_bind_b2WeldJoint_GetDamping_0 = t.asm.hg).apply(null, arguments);
    }, Su = t._emscripten_bind_b2WeldJoint_Dump_0 = function() {
      return (Su = t._emscripten_bind_b2WeldJoint_Dump_0 = t.asm.ig).apply(null, arguments);
    }, Gu = t._emscripten_bind_b2WeldJoint_GetType_0 = function() {
      return (Gu = t._emscripten_bind_b2WeldJoint_GetType_0 = t.asm.jg).apply(null, arguments);
    }, Au = t._emscripten_bind_b2WeldJoint_GetBodyA_0 = function() {
      return (Au = t._emscripten_bind_b2WeldJoint_GetBodyA_0 = t.asm.kg).apply(null, arguments);
    }, Cu = t._emscripten_bind_b2WeldJoint_GetBodyB_0 = function() {
      return (Cu = t._emscripten_bind_b2WeldJoint_GetBodyB_0 = t.asm.lg).apply(null, arguments);
    }, Pu = t._emscripten_bind_b2WeldJoint_GetAnchorA_0 = function() {
      return (Pu = t._emscripten_bind_b2WeldJoint_GetAnchorA_0 = t.asm.mg).apply(null, arguments);
    }, Bu = t._emscripten_bind_b2WeldJoint_GetAnchorB_0 = function() {
      return (Bu = t._emscripten_bind_b2WeldJoint_GetAnchorB_0 = t.asm.ng).apply(null, arguments);
    }, xu = t._emscripten_bind_b2WeldJoint_GetReactionForce_1 = function() {
      return (xu = t._emscripten_bind_b2WeldJoint_GetReactionForce_1 = t.asm.og).apply(null, arguments);
    }, Mu = t._emscripten_bind_b2WeldJoint_GetReactionTorque_1 = function() {
      return (Mu = t._emscripten_bind_b2WeldJoint_GetReactionTorque_1 = t.asm.pg).apply(null, arguments);
    }, wu = t._emscripten_bind_b2WeldJoint_GetNext_0 = function() {
      return (wu = t._emscripten_bind_b2WeldJoint_GetNext_0 = t.asm.qg).apply(null, arguments);
    }, Ru = t._emscripten_bind_b2WeldJoint_GetUserData_0 = function() {
      return (Ru = t._emscripten_bind_b2WeldJoint_GetUserData_0 = t.asm.rg).apply(null, arguments);
    }, Fu = t._emscripten_bind_b2WeldJoint_GetCollideConnected_0 = function() {
      return (Fu = t._emscripten_bind_b2WeldJoint_GetCollideConnected_0 = t.asm.sg).apply(null, arguments);
    }, Tu = t._emscripten_bind_b2WeldJoint___destroy___0 = function() {
      return (Tu = t._emscripten_bind_b2WeldJoint___destroy___0 = t.asm.tg).apply(null, arguments);
    }, Ou = t._emscripten_bind_b2WeldJointDef_b2WeldJointDef_0 = function() {
      return (Ou = t._emscripten_bind_b2WeldJointDef_b2WeldJointDef_0 = t.asm.ug).apply(null, arguments);
    }, Wu = t._emscripten_bind_b2WeldJointDef_Initialize_3 = function() {
      return (Wu = t._emscripten_bind_b2WeldJointDef_Initialize_3 = t.asm.vg).apply(null, arguments);
    }, Lu = t._emscripten_bind_b2WeldJointDef_get_localAnchorA_0 = function() {
      return (Lu = t._emscripten_bind_b2WeldJointDef_get_localAnchorA_0 = t.asm.wg).apply(null, arguments);
    }, Iu = t._emscripten_bind_b2WeldJointDef_set_localAnchorA_1 = function() {
      return (Iu = t._emscripten_bind_b2WeldJointDef_set_localAnchorA_1 = t.asm.xg).apply(null, arguments);
    }, qu = t._emscripten_bind_b2WeldJointDef_get_localAnchorB_0 = function() {
      return (qu = t._emscripten_bind_b2WeldJointDef_get_localAnchorB_0 = t.asm.yg).apply(null, arguments);
    }, ku = t._emscripten_bind_b2WeldJointDef_set_localAnchorB_1 = function() {
      return (ku = t._emscripten_bind_b2WeldJointDef_set_localAnchorB_1 = t.asm.zg).apply(null, arguments);
    }, Eu = t._emscripten_bind_b2WeldJointDef_get_referenceAngle_0 = function() {
      return (Eu = t._emscripten_bind_b2WeldJointDef_get_referenceAngle_0 = t.asm.Ag).apply(null, arguments);
    }, zu = t._emscripten_bind_b2WeldJointDef_set_referenceAngle_1 = function() {
      return (zu = t._emscripten_bind_b2WeldJointDef_set_referenceAngle_1 = t.asm.Bg).apply(null, arguments);
    }, Vu = t._emscripten_bind_b2WeldJointDef_get_stiffness_0 = function() {
      return (Vu = t._emscripten_bind_b2WeldJointDef_get_stiffness_0 = t.asm.Cg).apply(null, arguments);
    }, Uu = t._emscripten_bind_b2WeldJointDef_set_stiffness_1 = function() {
      return (Uu = t._emscripten_bind_b2WeldJointDef_set_stiffness_1 = t.asm.Dg).apply(null, arguments);
    }, $u = t._emscripten_bind_b2WeldJointDef_get_damping_0 = function() {
      return ($u = t._emscripten_bind_b2WeldJointDef_get_damping_0 = t.asm.Eg).apply(null, arguments);
    }, Nu = t._emscripten_bind_b2WeldJointDef_set_damping_1 = function() {
      return (Nu = t._emscripten_bind_b2WeldJointDef_set_damping_1 = t.asm.Fg).apply(null, arguments);
    }, Hu = t._emscripten_bind_b2WeldJointDef_get_type_0 = function() {
      return (Hu = t._emscripten_bind_b2WeldJointDef_get_type_0 = t.asm.Gg).apply(null, arguments);
    }, Qu = t._emscripten_bind_b2WeldJointDef_set_type_1 = function() {
      return (Qu = t._emscripten_bind_b2WeldJointDef_set_type_1 = t.asm.Hg).apply(null, arguments);
    }, Xu = t._emscripten_bind_b2WeldJointDef_get_userData_0 = function() {
      return (Xu = t._emscripten_bind_b2WeldJointDef_get_userData_0 = t.asm.Ig).apply(null, arguments);
    }, Yu = t._emscripten_bind_b2WeldJointDef_set_userData_1 = function() {
      return (Yu = t._emscripten_bind_b2WeldJointDef_set_userData_1 = t.asm.Jg).apply(null, arguments);
    }, Ku = t._emscripten_bind_b2WeldJointDef_get_bodyA_0 = function() {
      return (Ku = t._emscripten_bind_b2WeldJointDef_get_bodyA_0 = t.asm.Kg).apply(null, arguments);
    }, ts = t._emscripten_bind_b2WeldJointDef_set_bodyA_1 = function() {
      return (ts = t._emscripten_bind_b2WeldJointDef_set_bodyA_1 = t.asm.Lg).apply(null, arguments);
    }, es = t._emscripten_bind_b2WeldJointDef_get_bodyB_0 = function() {
      return (es = t._emscripten_bind_b2WeldJointDef_get_bodyB_0 = t.asm.Mg).apply(null, arguments);
    }, ns = t._emscripten_bind_b2WeldJointDef_set_bodyB_1 = function() {
      return (ns = t._emscripten_bind_b2WeldJointDef_set_bodyB_1 = t.asm.Ng).apply(null, arguments);
    }, os = t._emscripten_bind_b2WeldJointDef_get_collideConnected_0 = function() {
      return (os = t._emscripten_bind_b2WeldJointDef_get_collideConnected_0 = t.asm.Og).apply(null, arguments);
    }, rs = t._emscripten_bind_b2WeldJointDef_set_collideConnected_1 = function() {
      return (rs = t._emscripten_bind_b2WeldJointDef_set_collideConnected_1 = t.asm.Pg).apply(null, arguments);
    }, _s = t._emscripten_bind_b2WeldJointDef___destroy___0 = function() {
      return (_s = t._emscripten_bind_b2WeldJointDef___destroy___0 = t.asm.Qg).apply(null, arguments);
    }, is = t._emscripten_bind_b2ChainShape_b2ChainShape_0 = function() {
      return (is = t._emscripten_bind_b2ChainShape_b2ChainShape_0 = t.asm.Rg).apply(null, arguments);
    }, ps = t._emscripten_bind_b2ChainShape_Clear_0 = function() {
      return (ps = t._emscripten_bind_b2ChainShape_Clear_0 = t.asm.Sg).apply(null, arguments);
    }, us = t._emscripten_bind_b2ChainShape_CreateLoop_2 = function() {
      return (us = t._emscripten_bind_b2ChainShape_CreateLoop_2 = t.asm.Tg).apply(null, arguments);
    }, ss = t._emscripten_bind_b2ChainShape_CreateChain_4 = function() {
      return (ss = t._emscripten_bind_b2ChainShape_CreateChain_4 = t.asm.Ug).apply(null, arguments);
    }, cs = t._emscripten_bind_b2ChainShape_GetChildEdge_2 = function() {
      return (cs = t._emscripten_bind_b2ChainShape_GetChildEdge_2 = t.asm.Vg).apply(null, arguments);
    }, as = t._emscripten_bind_b2ChainShape_GetType_0 = function() {
      return (as = t._emscripten_bind_b2ChainShape_GetType_0 = t.asm.Wg).apply(null, arguments);
    }, ls = t._emscripten_bind_b2ChainShape_GetChildCount_0 = function() {
      return (ls = t._emscripten_bind_b2ChainShape_GetChildCount_0 = t.asm.Xg).apply(null, arguments);
    }, ys = t._emscripten_bind_b2ChainShape_TestPoint_2 = function() {
      return (ys = t._emscripten_bind_b2ChainShape_TestPoint_2 = t.asm.Yg).apply(null, arguments);
    }, ms = t._emscripten_bind_b2ChainShape_RayCast_4 = function() {
      return (ms = t._emscripten_bind_b2ChainShape_RayCast_4 = t.asm.Zg).apply(null, arguments);
    }, fs = t._emscripten_bind_b2ChainShape_ComputeAABB_3 = function() {
      return (fs = t._emscripten_bind_b2ChainShape_ComputeAABB_3 = t.asm._g).apply(null, arguments);
    }, ds = t._emscripten_bind_b2ChainShape_ComputeMass_2 = function() {
      return (ds = t._emscripten_bind_b2ChainShape_ComputeMass_2 = t.asm.$g).apply(null, arguments);
    }, bs = t._emscripten_bind_b2ChainShape_get_m_vertices_0 = function() {
      return (bs = t._emscripten_bind_b2ChainShape_get_m_vertices_0 = t.asm.ah).apply(null, arguments);
    }, gs = t._emscripten_bind_b2ChainShape_set_m_vertices_1 = function() {
      return (gs = t._emscripten_bind_b2ChainShape_set_m_vertices_1 = t.asm.bh).apply(null, arguments);
    }, hs = t._emscripten_bind_b2ChainShape_get_m_count_0 = function() {
      return (hs = t._emscripten_bind_b2ChainShape_get_m_count_0 = t.asm.ch).apply(null, arguments);
    }, Zs = t._emscripten_bind_b2ChainShape_set_m_count_1 = function() {
      return (Zs = t._emscripten_bind_b2ChainShape_set_m_count_1 = t.asm.dh).apply(null, arguments);
    }, vs = t._emscripten_bind_b2ChainShape_get_m_prevVertex_0 = function() {
      return (vs = t._emscripten_bind_b2ChainShape_get_m_prevVertex_0 = t.asm.eh).apply(null, arguments);
    }, Js = t._emscripten_bind_b2ChainShape_set_m_prevVertex_1 = function() {
      return (Js = t._emscripten_bind_b2ChainShape_set_m_prevVertex_1 = t.asm.fh).apply(null, arguments);
    }, Ds = t._emscripten_bind_b2ChainShape_get_m_nextVertex_0 = function() {
      return (Ds = t._emscripten_bind_b2ChainShape_get_m_nextVertex_0 = t.asm.gh).apply(null, arguments);
    }, js = t._emscripten_bind_b2ChainShape_set_m_nextVertex_1 = function() {
      return (js = t._emscripten_bind_b2ChainShape_set_m_nextVertex_1 = t.asm.hh).apply(null, arguments);
    }, Ss = t._emscripten_bind_b2ChainShape_get_m_type_0 = function() {
      return (Ss = t._emscripten_bind_b2ChainShape_get_m_type_0 = t.asm.ih).apply(null, arguments);
    }, Gs = t._emscripten_bind_b2ChainShape_set_m_type_1 = function() {
      return (Gs = t._emscripten_bind_b2ChainShape_set_m_type_1 = t.asm.jh).apply(null, arguments);
    }, As = t._emscripten_bind_b2ChainShape_get_m_radius_0 = function() {
      return (As = t._emscripten_bind_b2ChainShape_get_m_radius_0 = t.asm.kh).apply(null, arguments);
    }, Cs = t._emscripten_bind_b2ChainShape_set_m_radius_1 = function() {
      return (Cs = t._emscripten_bind_b2ChainShape_set_m_radius_1 = t.asm.lh).apply(null, arguments);
    }, Ps = t._emscripten_bind_b2ChainShape___destroy___0 = function() {
      return (Ps = t._emscripten_bind_b2ChainShape___destroy___0 = t.asm.mh).apply(null, arguments);
    }, Bs = t._emscripten_bind_b2Color_b2Color_0 = function() {
      return (Bs = t._emscripten_bind_b2Color_b2Color_0 = t.asm.nh).apply(null, arguments);
    }, xs = t._emscripten_bind_b2Color_b2Color_3 = function() {
      return (xs = t._emscripten_bind_b2Color_b2Color_3 = t.asm.oh).apply(null, arguments);
    }, Ms = t._emscripten_bind_b2Color_Set_3 = function() {
      return (Ms = t._emscripten_bind_b2Color_Set_3 = t.asm.ph).apply(null, arguments);
    }, ws = t._emscripten_bind_b2Color_get_r_0 = function() {
      return (ws = t._emscripten_bind_b2Color_get_r_0 = t.asm.qh).apply(null, arguments);
    }, Rs = t._emscripten_bind_b2Color_set_r_1 = function() {
      return (Rs = t._emscripten_bind_b2Color_set_r_1 = t.asm.rh).apply(null, arguments);
    }, Fs = t._emscripten_bind_b2Color_get_g_0 = function() {
      return (Fs = t._emscripten_bind_b2Color_get_g_0 = t.asm.sh).apply(null, arguments);
    }, Ts = t._emscripten_bind_b2Color_set_g_1 = function() {
      return (Ts = t._emscripten_bind_b2Color_set_g_1 = t.asm.th).apply(null, arguments);
    }, Os = t._emscripten_bind_b2Color_get_b_0 = function() {
      return (Os = t._emscripten_bind_b2Color_get_b_0 = t.asm.uh).apply(null, arguments);
    }, Ws = t._emscripten_bind_b2Color_set_b_1 = function() {
      return (Ws = t._emscripten_bind_b2Color_set_b_1 = t.asm.vh).apply(null, arguments);
    }, Ls = t._emscripten_bind_b2Color___destroy___0 = function() {
      return (Ls = t._emscripten_bind_b2Color___destroy___0 = t.asm.wh).apply(null, arguments);
    }, Is = t._emscripten_bind_b2ContactEdge_b2ContactEdge_0 = function() {
      return (Is = t._emscripten_bind_b2ContactEdge_b2ContactEdge_0 = t.asm.xh).apply(null, arguments);
    }, qs = t._emscripten_bind_b2ContactEdge_get_other_0 = function() {
      return (qs = t._emscripten_bind_b2ContactEdge_get_other_0 = t.asm.yh).apply(null, arguments);
    }, ks = t._emscripten_bind_b2ContactEdge_set_other_1 = function() {
      return (ks = t._emscripten_bind_b2ContactEdge_set_other_1 = t.asm.zh).apply(null, arguments);
    }, Es = t._emscripten_bind_b2ContactEdge_get_contact_0 = function() {
      return (Es = t._emscripten_bind_b2ContactEdge_get_contact_0 = t.asm.Ah).apply(null, arguments);
    }, zs = t._emscripten_bind_b2ContactEdge_set_contact_1 = function() {
      return (zs = t._emscripten_bind_b2ContactEdge_set_contact_1 = t.asm.Bh).apply(null, arguments);
    }, Vs = t._emscripten_bind_b2ContactEdge_get_prev_0 = function() {
      return (Vs = t._emscripten_bind_b2ContactEdge_get_prev_0 = t.asm.Ch).apply(null, arguments);
    }, Us = t._emscripten_bind_b2ContactEdge_set_prev_1 = function() {
      return (Us = t._emscripten_bind_b2ContactEdge_set_prev_1 = t.asm.Dh).apply(null, arguments);
    }, $s = t._emscripten_bind_b2ContactEdge_get_next_0 = function() {
      return ($s = t._emscripten_bind_b2ContactEdge_get_next_0 = t.asm.Eh).apply(null, arguments);
    }, Ns = t._emscripten_bind_b2ContactEdge_set_next_1 = function() {
      return (Ns = t._emscripten_bind_b2ContactEdge_set_next_1 = t.asm.Fh).apply(null, arguments);
    }, Hs = t._emscripten_bind_b2ContactEdge___destroy___0 = function() {
      return (Hs = t._emscripten_bind_b2ContactEdge___destroy___0 = t.asm.Gh).apply(null, arguments);
    }, Qs = t._emscripten_bind_b2ContactFeature_get_indexA_0 = function() {
      return (Qs = t._emscripten_bind_b2ContactFeature_get_indexA_0 = t.asm.Hh).apply(null, arguments);
    }, Xs = t._emscripten_bind_b2ContactFeature_set_indexA_1 = function() {
      return (Xs = t._emscripten_bind_b2ContactFeature_set_indexA_1 = t.asm.Ih).apply(null, arguments);
    }, Ys = t._emscripten_bind_b2ContactFeature_get_indexB_0 = function() {
      return (Ys = t._emscripten_bind_b2ContactFeature_get_indexB_0 = t.asm.Jh).apply(null, arguments);
    }, Ks = t._emscripten_bind_b2ContactFeature_set_indexB_1 = function() {
      return (Ks = t._emscripten_bind_b2ContactFeature_set_indexB_1 = t.asm.Kh).apply(null, arguments);
    }, tc = t._emscripten_bind_b2ContactFeature_get_typeA_0 = function() {
      return (tc = t._emscripten_bind_b2ContactFeature_get_typeA_0 = t.asm.Lh).apply(null, arguments);
    }, ec = t._emscripten_bind_b2ContactFeature_set_typeA_1 = function() {
      return (ec = t._emscripten_bind_b2ContactFeature_set_typeA_1 = t.asm.Mh).apply(null, arguments);
    }, nc = t._emscripten_bind_b2ContactFeature_get_typeB_0 = function() {
      return (nc = t._emscripten_bind_b2ContactFeature_get_typeB_0 = t.asm.Nh).apply(null, arguments);
    }, oc = t._emscripten_bind_b2ContactFeature_set_typeB_1 = function() {
      return (oc = t._emscripten_bind_b2ContactFeature_set_typeB_1 = t.asm.Oh).apply(null, arguments);
    }, rc = t._emscripten_bind_b2ContactFeature___destroy___0 = function() {
      return (rc = t._emscripten_bind_b2ContactFeature___destroy___0 = t.asm.Ph).apply(null, arguments);
    }, _c = t._emscripten_bind_JSContactFilter_JSContactFilter_0 = function() {
      return (_c = t._emscripten_bind_JSContactFilter_JSContactFilter_0 = t.asm.Qh).apply(null, arguments);
    }, ic = t._emscripten_bind_JSContactFilter_ShouldCollide_2 = function() {
      return (ic = t._emscripten_bind_JSContactFilter_ShouldCollide_2 = t.asm.Rh).apply(null, arguments);
    }, pc = t._emscripten_bind_JSContactFilter___destroy___0 = function() {
      return (pc = t._emscripten_bind_JSContactFilter___destroy___0 = t.asm.Sh).apply(null, arguments);
    }, uc = t._emscripten_bind_b2ContactID_get_cf_0 = function() {
      return (uc = t._emscripten_bind_b2ContactID_get_cf_0 = t.asm.Th).apply(null, arguments);
    }, sc = t._emscripten_bind_b2ContactID_set_cf_1 = function() {
      return (sc = t._emscripten_bind_b2ContactID_set_cf_1 = t.asm.Uh).apply(null, arguments);
    }, cc = t._emscripten_bind_b2ContactID_get_key_0 = function() {
      return (cc = t._emscripten_bind_b2ContactID_get_key_0 = t.asm.Vh).apply(null, arguments);
    }, ac = t._emscripten_bind_b2ContactID_set_key_1 = function() {
      return (ac = t._emscripten_bind_b2ContactID_set_key_1 = t.asm.Wh).apply(null, arguments);
    }, lc = t._emscripten_bind_b2ContactID___destroy___0 = function() {
      return (lc = t._emscripten_bind_b2ContactID___destroy___0 = t.asm.Xh).apply(null, arguments);
    }, yc = t._emscripten_bind_b2ContactImpulse_get_normalImpulses_1 = function() {
      return (yc = t._emscripten_bind_b2ContactImpulse_get_normalImpulses_1 = t.asm.Yh).apply(null, arguments);
    }, mc = t._emscripten_bind_b2ContactImpulse_set_normalImpulses_2 = function() {
      return (mc = t._emscripten_bind_b2ContactImpulse_set_normalImpulses_2 = t.asm.Zh).apply(null, arguments);
    }, fc = t._emscripten_bind_b2ContactImpulse_get_tangentImpulses_1 = function() {
      return (fc = t._emscripten_bind_b2ContactImpulse_get_tangentImpulses_1 = t.asm._h).apply(null, arguments);
    }, dc = t._emscripten_bind_b2ContactImpulse_set_tangentImpulses_2 = function() {
      return (dc = t._emscripten_bind_b2ContactImpulse_set_tangentImpulses_2 = t.asm.$h).apply(null, arguments);
    }, bc = t._emscripten_bind_b2ContactImpulse_get_count_0 = function() {
      return (bc = t._emscripten_bind_b2ContactImpulse_get_count_0 = t.asm.ai).apply(null, arguments);
    }, gc = t._emscripten_bind_b2ContactImpulse_set_count_1 = function() {
      return (gc = t._emscripten_bind_b2ContactImpulse_set_count_1 = t.asm.bi).apply(null, arguments);
    }, hc = t._emscripten_bind_b2ContactImpulse___destroy___0 = function() {
      return (hc = t._emscripten_bind_b2ContactImpulse___destroy___0 = t.asm.ci).apply(null, arguments);
    }, Zc = t._emscripten_bind_b2DestructionListener___destroy___0 = function() {
      return (Zc = t._emscripten_bind_b2DestructionListener___destroy___0 = t.asm.di).apply(null, arguments);
    }, vc = t._emscripten_bind_JSDestructionListener_JSDestructionListener_0 = function() {
      return (vc = t._emscripten_bind_JSDestructionListener_JSDestructionListener_0 = t.asm.ei).apply(null, arguments);
    }, Jc = t._emscripten_bind_JSDestructionListener_SayGoodbyeJoint_1 = function() {
      return (Jc = t._emscripten_bind_JSDestructionListener_SayGoodbyeJoint_1 = t.asm.fi).apply(null, arguments);
    }, Dc = t._emscripten_bind_JSDestructionListener_SayGoodbyeFixture_1 = function() {
      return (Dc = t._emscripten_bind_JSDestructionListener_SayGoodbyeFixture_1 = t.asm.gi).apply(null, arguments);
    }, jc = t._emscripten_bind_JSDestructionListener___destroy___0 = function() {
      return (jc = t._emscripten_bind_JSDestructionListener___destroy___0 = t.asm.hi).apply(null, arguments);
    }, Sc = t._emscripten_bind_b2DistanceJoint_GetLocalAnchorA_0 = function() {
      return (Sc = t._emscripten_bind_b2DistanceJoint_GetLocalAnchorA_0 = t.asm.ii).apply(null, arguments);
    }, Gc = t._emscripten_bind_b2DistanceJoint_GetLocalAnchorB_0 = function() {
      return (Gc = t._emscripten_bind_b2DistanceJoint_GetLocalAnchorB_0 = t.asm.ji).apply(null, arguments);
    }, Ac = t._emscripten_bind_b2DistanceJoint_GetLength_0 = function() {
      return (Ac = t._emscripten_bind_b2DistanceJoint_GetLength_0 = t.asm.ki).apply(null, arguments);
    }, Cc = t._emscripten_bind_b2DistanceJoint_SetLength_1 = function() {
      return (Cc = t._emscripten_bind_b2DistanceJoint_SetLength_1 = t.asm.li).apply(null, arguments);
    }, Pc = t._emscripten_bind_b2DistanceJoint_GetMinLength_0 = function() {
      return (Pc = t._emscripten_bind_b2DistanceJoint_GetMinLength_0 = t.asm.mi).apply(null, arguments);
    }, Bc = t._emscripten_bind_b2DistanceJoint_SetMinLength_1 = function() {
      return (Bc = t._emscripten_bind_b2DistanceJoint_SetMinLength_1 = t.asm.ni).apply(null, arguments);
    }, xc = t._emscripten_bind_b2DistanceJoint_GetMaxLength_0 = function() {
      return (xc = t._emscripten_bind_b2DistanceJoint_GetMaxLength_0 = t.asm.oi).apply(null, arguments);
    }, Mc = t._emscripten_bind_b2DistanceJoint_SetMaxLength_1 = function() {
      return (Mc = t._emscripten_bind_b2DistanceJoint_SetMaxLength_1 = t.asm.pi).apply(null, arguments);
    }, wc = t._emscripten_bind_b2DistanceJoint_GetCurrentLength_0 = function() {
      return (wc = t._emscripten_bind_b2DistanceJoint_GetCurrentLength_0 = t.asm.qi).apply(null, arguments);
    }, Rc = t._emscripten_bind_b2DistanceJoint_SetStiffness_1 = function() {
      return (Rc = t._emscripten_bind_b2DistanceJoint_SetStiffness_1 = t.asm.ri).apply(null, arguments);
    }, Fc = t._emscripten_bind_b2DistanceJoint_GetStiffness_0 = function() {
      return (Fc = t._emscripten_bind_b2DistanceJoint_GetStiffness_0 = t.asm.si).apply(null, arguments);
    }, Tc = t._emscripten_bind_b2DistanceJoint_SetDamping_1 = function() {
      return (Tc = t._emscripten_bind_b2DistanceJoint_SetDamping_1 = t.asm.ti).apply(null, arguments);
    }, Oc = t._emscripten_bind_b2DistanceJoint_GetDamping_0 = function() {
      return (Oc = t._emscripten_bind_b2DistanceJoint_GetDamping_0 = t.asm.ui).apply(null, arguments);
    }, Wc = t._emscripten_bind_b2DistanceJoint_GetType_0 = function() {
      return (Wc = t._emscripten_bind_b2DistanceJoint_GetType_0 = t.asm.vi).apply(null, arguments);
    }, Lc = t._emscripten_bind_b2DistanceJoint_GetBodyA_0 = function() {
      return (Lc = t._emscripten_bind_b2DistanceJoint_GetBodyA_0 = t.asm.wi).apply(null, arguments);
    }, Ic = t._emscripten_bind_b2DistanceJoint_GetBodyB_0 = function() {
      return (Ic = t._emscripten_bind_b2DistanceJoint_GetBodyB_0 = t.asm.xi).apply(null, arguments);
    }, qc = t._emscripten_bind_b2DistanceJoint_GetAnchorA_0 = function() {
      return (qc = t._emscripten_bind_b2DistanceJoint_GetAnchorA_0 = t.asm.yi).apply(null, arguments);
    }, kc = t._emscripten_bind_b2DistanceJoint_GetAnchorB_0 = function() {
      return (kc = t._emscripten_bind_b2DistanceJoint_GetAnchorB_0 = t.asm.zi).apply(null, arguments);
    }, Ec = t._emscripten_bind_b2DistanceJoint_GetReactionForce_1 = function() {
      return (Ec = t._emscripten_bind_b2DistanceJoint_GetReactionForce_1 = t.asm.Ai).apply(null, arguments);
    }, zc = t._emscripten_bind_b2DistanceJoint_GetReactionTorque_1 = function() {
      return (zc = t._emscripten_bind_b2DistanceJoint_GetReactionTorque_1 = t.asm.Bi).apply(null, arguments);
    }, Vc = t._emscripten_bind_b2DistanceJoint_GetNext_0 = function() {
      return (Vc = t._emscripten_bind_b2DistanceJoint_GetNext_0 = t.asm.Ci).apply(null, arguments);
    }, Uc = t._emscripten_bind_b2DistanceJoint_GetUserData_0 = function() {
      return (Uc = t._emscripten_bind_b2DistanceJoint_GetUserData_0 = t.asm.Di).apply(null, arguments);
    }, $c = t._emscripten_bind_b2DistanceJoint_GetCollideConnected_0 = function() {
      return ($c = t._emscripten_bind_b2DistanceJoint_GetCollideConnected_0 = t.asm.Ei).apply(null, arguments);
    }, Nc = t._emscripten_bind_b2DistanceJoint___destroy___0 = function() {
      return (Nc = t._emscripten_bind_b2DistanceJoint___destroy___0 = t.asm.Fi).apply(null, arguments);
    }, Hc = t._emscripten_bind_b2DistanceJointDef_b2DistanceJointDef_0 = function() {
      return (Hc = t._emscripten_bind_b2DistanceJointDef_b2DistanceJointDef_0 = t.asm.Gi).apply(null, arguments);
    }, Qc = t._emscripten_bind_b2DistanceJointDef_Initialize_4 = function() {
      return (Qc = t._emscripten_bind_b2DistanceJointDef_Initialize_4 = t.asm.Hi).apply(null, arguments);
    }, Xc = t._emscripten_bind_b2DistanceJointDef_get_localAnchorA_0 = function() {
      return (Xc = t._emscripten_bind_b2DistanceJointDef_get_localAnchorA_0 = t.asm.Ii).apply(null, arguments);
    }, Yc = t._emscripten_bind_b2DistanceJointDef_set_localAnchorA_1 = function() {
      return (Yc = t._emscripten_bind_b2DistanceJointDef_set_localAnchorA_1 = t.asm.Ji).apply(null, arguments);
    }, Kc = t._emscripten_bind_b2DistanceJointDef_get_localAnchorB_0 = function() {
      return (Kc = t._emscripten_bind_b2DistanceJointDef_get_localAnchorB_0 = t.asm.Ki).apply(null, arguments);
    }, ta = t._emscripten_bind_b2DistanceJointDef_set_localAnchorB_1 = function() {
      return (ta = t._emscripten_bind_b2DistanceJointDef_set_localAnchorB_1 = t.asm.Li).apply(null, arguments);
    }, ea = t._emscripten_bind_b2DistanceJointDef_get_length_0 = function() {
      return (ea = t._emscripten_bind_b2DistanceJointDef_get_length_0 = t.asm.Mi).apply(null, arguments);
    }, na = t._emscripten_bind_b2DistanceJointDef_set_length_1 = function() {
      return (na = t._emscripten_bind_b2DistanceJointDef_set_length_1 = t.asm.Ni).apply(null, arguments);
    }, oa = t._emscripten_bind_b2DistanceJointDef_get_minLength_0 = function() {
      return (oa = t._emscripten_bind_b2DistanceJointDef_get_minLength_0 = t.asm.Oi).apply(null, arguments);
    }, ra = t._emscripten_bind_b2DistanceJointDef_set_minLength_1 = function() {
      return (ra = t._emscripten_bind_b2DistanceJointDef_set_minLength_1 = t.asm.Pi).apply(null, arguments);
    }, _a = t._emscripten_bind_b2DistanceJointDef_get_maxLength_0 = function() {
      return (_a = t._emscripten_bind_b2DistanceJointDef_get_maxLength_0 = t.asm.Qi).apply(null, arguments);
    }, ia = t._emscripten_bind_b2DistanceJointDef_set_maxLength_1 = function() {
      return (ia = t._emscripten_bind_b2DistanceJointDef_set_maxLength_1 = t.asm.Ri).apply(null, arguments);
    }, pa = t._emscripten_bind_b2DistanceJointDef_get_stiffness_0 = function() {
      return (pa = t._emscripten_bind_b2DistanceJointDef_get_stiffness_0 = t.asm.Si).apply(null, arguments);
    }, ua = t._emscripten_bind_b2DistanceJointDef_set_stiffness_1 = function() {
      return (ua = t._emscripten_bind_b2DistanceJointDef_set_stiffness_1 = t.asm.Ti).apply(null, arguments);
    }, sa = t._emscripten_bind_b2DistanceJointDef_get_damping_0 = function() {
      return (sa = t._emscripten_bind_b2DistanceJointDef_get_damping_0 = t.asm.Ui).apply(null, arguments);
    }, ca = t._emscripten_bind_b2DistanceJointDef_set_damping_1 = function() {
      return (ca = t._emscripten_bind_b2DistanceJointDef_set_damping_1 = t.asm.Vi).apply(null, arguments);
    }, aa = t._emscripten_bind_b2DistanceJointDef_get_type_0 = function() {
      return (aa = t._emscripten_bind_b2DistanceJointDef_get_type_0 = t.asm.Wi).apply(null, arguments);
    }, la = t._emscripten_bind_b2DistanceJointDef_set_type_1 = function() {
      return (la = t._emscripten_bind_b2DistanceJointDef_set_type_1 = t.asm.Xi).apply(null, arguments);
    }, ya = t._emscripten_bind_b2DistanceJointDef_get_userData_0 = function() {
      return (ya = t._emscripten_bind_b2DistanceJointDef_get_userData_0 = t.asm.Yi).apply(null, arguments);
    }, ma = t._emscripten_bind_b2DistanceJointDef_set_userData_1 = function() {
      return (ma = t._emscripten_bind_b2DistanceJointDef_set_userData_1 = t.asm.Zi).apply(null, arguments);
    }, fa = t._emscripten_bind_b2DistanceJointDef_get_bodyA_0 = function() {
      return (fa = t._emscripten_bind_b2DistanceJointDef_get_bodyA_0 = t.asm._i).apply(null, arguments);
    }, da = t._emscripten_bind_b2DistanceJointDef_set_bodyA_1 = function() {
      return (da = t._emscripten_bind_b2DistanceJointDef_set_bodyA_1 = t.asm.$i).apply(null, arguments);
    }, ba = t._emscripten_bind_b2DistanceJointDef_get_bodyB_0 = function() {
      return (ba = t._emscripten_bind_b2DistanceJointDef_get_bodyB_0 = t.asm.aj).apply(null, arguments);
    }, ga = t._emscripten_bind_b2DistanceJointDef_set_bodyB_1 = function() {
      return (ga = t._emscripten_bind_b2DistanceJointDef_set_bodyB_1 = t.asm.bj).apply(null, arguments);
    }, ha = t._emscripten_bind_b2DistanceJointDef_get_collideConnected_0 = function() {
      return (ha = t._emscripten_bind_b2DistanceJointDef_get_collideConnected_0 = t.asm.cj).apply(null, arguments);
    }, Za = t._emscripten_bind_b2DistanceJointDef_set_collideConnected_1 = function() {
      return (Za = t._emscripten_bind_b2DistanceJointDef_set_collideConnected_1 = t.asm.dj).apply(null, arguments);
    }, va = t._emscripten_bind_b2DistanceJointDef___destroy___0 = function() {
      return (va = t._emscripten_bind_b2DistanceJointDef___destroy___0 = t.asm.ej).apply(null, arguments);
    }, Ja = t._emscripten_bind_JSDraw_JSDraw_0 = function() {
      return (Ja = t._emscripten_bind_JSDraw_JSDraw_0 = t.asm.fj).apply(null, arguments);
    }, Da = t._emscripten_bind_JSDraw_DrawPolygon_3 = function() {
      return (Da = t._emscripten_bind_JSDraw_DrawPolygon_3 = t.asm.gj).apply(null, arguments);
    }, ja = t._emscripten_bind_JSDraw_DrawSolidPolygon_3 = function() {
      return (ja = t._emscripten_bind_JSDraw_DrawSolidPolygon_3 = t.asm.hj).apply(null, arguments);
    }, Sa = t._emscripten_bind_JSDraw_DrawCircle_3 = function() {
      return (Sa = t._emscripten_bind_JSDraw_DrawCircle_3 = t.asm.ij).apply(null, arguments);
    }, Ga = t._emscripten_bind_JSDraw_DrawSolidCircle_4 = function() {
      return (Ga = t._emscripten_bind_JSDraw_DrawSolidCircle_4 = t.asm.jj).apply(null, arguments);
    }, Aa = t._emscripten_bind_JSDraw_DrawSegment_3 = function() {
      return (Aa = t._emscripten_bind_JSDraw_DrawSegment_3 = t.asm.kj).apply(null, arguments);
    }, Ca = t._emscripten_bind_JSDraw_DrawTransform_1 = function() {
      return (Ca = t._emscripten_bind_JSDraw_DrawTransform_1 = t.asm.lj).apply(null, arguments);
    }, Pa = t._emscripten_bind_JSDraw_DrawPoint_3 = function() {
      return (Pa = t._emscripten_bind_JSDraw_DrawPoint_3 = t.asm.mj).apply(null, arguments);
    }, Ba = t._emscripten_bind_JSDraw___destroy___0 = function() {
      return (Ba = t._emscripten_bind_JSDraw___destroy___0 = t.asm.nj).apply(null, arguments);
    }, xa = t._emscripten_bind_b2FrictionJoint_GetLocalAnchorA_0 = function() {
      return (xa = t._emscripten_bind_b2FrictionJoint_GetLocalAnchorA_0 = t.asm.oj).apply(null, arguments);
    }, Ma = t._emscripten_bind_b2FrictionJoint_GetLocalAnchorB_0 = function() {
      return (Ma = t._emscripten_bind_b2FrictionJoint_GetLocalAnchorB_0 = t.asm.pj).apply(null, arguments);
    }, wa = t._emscripten_bind_b2FrictionJoint_SetMaxForce_1 = function() {
      return (wa = t._emscripten_bind_b2FrictionJoint_SetMaxForce_1 = t.asm.qj).apply(null, arguments);
    }, Ra = t._emscripten_bind_b2FrictionJoint_GetMaxForce_0 = function() {
      return (Ra = t._emscripten_bind_b2FrictionJoint_GetMaxForce_0 = t.asm.rj).apply(null, arguments);
    }, Fa = t._emscripten_bind_b2FrictionJoint_SetMaxTorque_1 = function() {
      return (Fa = t._emscripten_bind_b2FrictionJoint_SetMaxTorque_1 = t.asm.sj).apply(null, arguments);
    }, Ta = t._emscripten_bind_b2FrictionJoint_GetMaxTorque_0 = function() {
      return (Ta = t._emscripten_bind_b2FrictionJoint_GetMaxTorque_0 = t.asm.tj).apply(null, arguments);
    }, Oa = t._emscripten_bind_b2FrictionJoint_GetType_0 = function() {
      return (Oa = t._emscripten_bind_b2FrictionJoint_GetType_0 = t.asm.uj).apply(null, arguments);
    }, Wa = t._emscripten_bind_b2FrictionJoint_GetBodyA_0 = function() {
      return (Wa = t._emscripten_bind_b2FrictionJoint_GetBodyA_0 = t.asm.vj).apply(null, arguments);
    }, La = t._emscripten_bind_b2FrictionJoint_GetBodyB_0 = function() {
      return (La = t._emscripten_bind_b2FrictionJoint_GetBodyB_0 = t.asm.wj).apply(null, arguments);
    }, Ia = t._emscripten_bind_b2FrictionJoint_GetAnchorA_0 = function() {
      return (Ia = t._emscripten_bind_b2FrictionJoint_GetAnchorA_0 = t.asm.xj).apply(null, arguments);
    }, qa = t._emscripten_bind_b2FrictionJoint_GetAnchorB_0 = function() {
      return (qa = t._emscripten_bind_b2FrictionJoint_GetAnchorB_0 = t.asm.yj).apply(null, arguments);
    }, ka = t._emscripten_bind_b2FrictionJoint_GetReactionForce_1 = function() {
      return (ka = t._emscripten_bind_b2FrictionJoint_GetReactionForce_1 = t.asm.zj).apply(null, arguments);
    }, Ea = t._emscripten_bind_b2FrictionJoint_GetReactionTorque_1 = function() {
      return (Ea = t._emscripten_bind_b2FrictionJoint_GetReactionTorque_1 = t.asm.Aj).apply(null, arguments);
    }, za = t._emscripten_bind_b2FrictionJoint_GetNext_0 = function() {
      return (za = t._emscripten_bind_b2FrictionJoint_GetNext_0 = t.asm.Bj).apply(null, arguments);
    }, Va = t._emscripten_bind_b2FrictionJoint_GetUserData_0 = function() {
      return (Va = t._emscripten_bind_b2FrictionJoint_GetUserData_0 = t.asm.Cj).apply(null, arguments);
    }, Ua = t._emscripten_bind_b2FrictionJoint_GetCollideConnected_0 = function() {
      return (Ua = t._emscripten_bind_b2FrictionJoint_GetCollideConnected_0 = t.asm.Dj).apply(null, arguments);
    }, $a = t._emscripten_bind_b2FrictionJoint___destroy___0 = function() {
      return ($a = t._emscripten_bind_b2FrictionJoint___destroy___0 = t.asm.Ej).apply(null, arguments);
    }, Na = t._emscripten_bind_b2FrictionJointDef_b2FrictionJointDef_0 = function() {
      return (Na = t._emscripten_bind_b2FrictionJointDef_b2FrictionJointDef_0 = t.asm.Fj).apply(null, arguments);
    }, Ha = t._emscripten_bind_b2FrictionJointDef_Initialize_3 = function() {
      return (Ha = t._emscripten_bind_b2FrictionJointDef_Initialize_3 = t.asm.Gj).apply(null, arguments);
    }, Qa = t._emscripten_bind_b2FrictionJointDef_get_localAnchorA_0 = function() {
      return (Qa = t._emscripten_bind_b2FrictionJointDef_get_localAnchorA_0 = t.asm.Hj).apply(null, arguments);
    }, Xa = t._emscripten_bind_b2FrictionJointDef_set_localAnchorA_1 = function() {
      return (Xa = t._emscripten_bind_b2FrictionJointDef_set_localAnchorA_1 = t.asm.Ij).apply(null, arguments);
    }, Ya = t._emscripten_bind_b2FrictionJointDef_get_localAnchorB_0 = function() {
      return (Ya = t._emscripten_bind_b2FrictionJointDef_get_localAnchorB_0 = t.asm.Jj).apply(null, arguments);
    }, Ka = t._emscripten_bind_b2FrictionJointDef_set_localAnchorB_1 = function() {
      return (Ka = t._emscripten_bind_b2FrictionJointDef_set_localAnchorB_1 = t.asm.Kj).apply(null, arguments);
    }, tl = t._emscripten_bind_b2FrictionJointDef_get_maxForce_0 = function() {
      return (tl = t._emscripten_bind_b2FrictionJointDef_get_maxForce_0 = t.asm.Lj).apply(null, arguments);
    }, el = t._emscripten_bind_b2FrictionJointDef_set_maxForce_1 = function() {
      return (el = t._emscripten_bind_b2FrictionJointDef_set_maxForce_1 = t.asm.Mj).apply(null, arguments);
    }, nl = t._emscripten_bind_b2FrictionJointDef_get_maxTorque_0 = function() {
      return (nl = t._emscripten_bind_b2FrictionJointDef_get_maxTorque_0 = t.asm.Nj).apply(null, arguments);
    }, ol = t._emscripten_bind_b2FrictionJointDef_set_maxTorque_1 = function() {
      return (ol = t._emscripten_bind_b2FrictionJointDef_set_maxTorque_1 = t.asm.Oj).apply(null, arguments);
    }, rl = t._emscripten_bind_b2FrictionJointDef_get_type_0 = function() {
      return (rl = t._emscripten_bind_b2FrictionJointDef_get_type_0 = t.asm.Pj).apply(null, arguments);
    }, _l = t._emscripten_bind_b2FrictionJointDef_set_type_1 = function() {
      return (_l = t._emscripten_bind_b2FrictionJointDef_set_type_1 = t.asm.Qj).apply(null, arguments);
    }, il = t._emscripten_bind_b2FrictionJointDef_get_userData_0 = function() {
      return (il = t._emscripten_bind_b2FrictionJointDef_get_userData_0 = t.asm.Rj).apply(null, arguments);
    }, pl = t._emscripten_bind_b2FrictionJointDef_set_userData_1 = function() {
      return (pl = t._emscripten_bind_b2FrictionJointDef_set_userData_1 = t.asm.Sj).apply(null, arguments);
    }, ul = t._emscripten_bind_b2FrictionJointDef_get_bodyA_0 = function() {
      return (ul = t._emscripten_bind_b2FrictionJointDef_get_bodyA_0 = t.asm.Tj).apply(null, arguments);
    }, sl = t._emscripten_bind_b2FrictionJointDef_set_bodyA_1 = function() {
      return (sl = t._emscripten_bind_b2FrictionJointDef_set_bodyA_1 = t.asm.Uj).apply(null, arguments);
    }, cl = t._emscripten_bind_b2FrictionJointDef_get_bodyB_0 = function() {
      return (cl = t._emscripten_bind_b2FrictionJointDef_get_bodyB_0 = t.asm.Vj).apply(null, arguments);
    }, al = t._emscripten_bind_b2FrictionJointDef_set_bodyB_1 = function() {
      return (al = t._emscripten_bind_b2FrictionJointDef_set_bodyB_1 = t.asm.Wj).apply(null, arguments);
    }, ll = t._emscripten_bind_b2FrictionJointDef_get_collideConnected_0 = function() {
      return (ll = t._emscripten_bind_b2FrictionJointDef_get_collideConnected_0 = t.asm.Xj).apply(null, arguments);
    }, yl = t._emscripten_bind_b2FrictionJointDef_set_collideConnected_1 = function() {
      return (yl = t._emscripten_bind_b2FrictionJointDef_set_collideConnected_1 = t.asm.Yj).apply(null, arguments);
    }, ml = t._emscripten_bind_b2FrictionJointDef___destroy___0 = function() {
      return (ml = t._emscripten_bind_b2FrictionJointDef___destroy___0 = t.asm.Zj).apply(null, arguments);
    }, fl = t._emscripten_bind_b2GearJoint_GetJoint1_0 = function() {
      return (fl = t._emscripten_bind_b2GearJoint_GetJoint1_0 = t.asm._j).apply(null, arguments);
    }, dl = t._emscripten_bind_b2GearJoint_GetJoint2_0 = function() {
      return (dl = t._emscripten_bind_b2GearJoint_GetJoint2_0 = t.asm.$j).apply(null, arguments);
    }, bl = t._emscripten_bind_b2GearJoint_SetRatio_1 = function() {
      return (bl = t._emscripten_bind_b2GearJoint_SetRatio_1 = t.asm.ak).apply(null, arguments);
    }, gl = t._emscripten_bind_b2GearJoint_GetRatio_0 = function() {
      return (gl = t._emscripten_bind_b2GearJoint_GetRatio_0 = t.asm.bk).apply(null, arguments);
    }, hl = t._emscripten_bind_b2GearJoint_GetType_0 = function() {
      return (hl = t._emscripten_bind_b2GearJoint_GetType_0 = t.asm.ck).apply(null, arguments);
    }, Zl = t._emscripten_bind_b2GearJoint_GetBodyA_0 = function() {
      return (Zl = t._emscripten_bind_b2GearJoint_GetBodyA_0 = t.asm.dk).apply(null, arguments);
    }, vl = t._emscripten_bind_b2GearJoint_GetBodyB_0 = function() {
      return (vl = t._emscripten_bind_b2GearJoint_GetBodyB_0 = t.asm.ek).apply(null, arguments);
    }, Jl = t._emscripten_bind_b2GearJoint_GetAnchorA_0 = function() {
      return (Jl = t._emscripten_bind_b2GearJoint_GetAnchorA_0 = t.asm.fk).apply(null, arguments);
    }, Dl = t._emscripten_bind_b2GearJoint_GetAnchorB_0 = function() {
      return (Dl = t._emscripten_bind_b2GearJoint_GetAnchorB_0 = t.asm.gk).apply(null, arguments);
    }, jl = t._emscripten_bind_b2GearJoint_GetReactionForce_1 = function() {
      return (jl = t._emscripten_bind_b2GearJoint_GetReactionForce_1 = t.asm.hk).apply(null, arguments);
    }, Sl = t._emscripten_bind_b2GearJoint_GetReactionTorque_1 = function() {
      return (Sl = t._emscripten_bind_b2GearJoint_GetReactionTorque_1 = t.asm.ik).apply(null, arguments);
    }, Gl = t._emscripten_bind_b2GearJoint_GetNext_0 = function() {
      return (Gl = t._emscripten_bind_b2GearJoint_GetNext_0 = t.asm.jk).apply(null, arguments);
    }, Al = t._emscripten_bind_b2GearJoint_GetUserData_0 = function() {
      return (Al = t._emscripten_bind_b2GearJoint_GetUserData_0 = t.asm.kk).apply(null, arguments);
    }, Cl = t._emscripten_bind_b2GearJoint_GetCollideConnected_0 = function() {
      return (Cl = t._emscripten_bind_b2GearJoint_GetCollideConnected_0 = t.asm.lk).apply(null, arguments);
    }, Pl = t._emscripten_bind_b2GearJoint___destroy___0 = function() {
      return (Pl = t._emscripten_bind_b2GearJoint___destroy___0 = t.asm.mk).apply(null, arguments);
    }, Bl = t._emscripten_bind_b2GearJointDef_b2GearJointDef_0 = function() {
      return (Bl = t._emscripten_bind_b2GearJointDef_b2GearJointDef_0 = t.asm.nk).apply(null, arguments);
    }, xl = t._emscripten_bind_b2GearJointDef_get_joint1_0 = function() {
      return (xl = t._emscripten_bind_b2GearJointDef_get_joint1_0 = t.asm.ok).apply(null, arguments);
    }, Ml = t._emscripten_bind_b2GearJointDef_set_joint1_1 = function() {
      return (Ml = t._emscripten_bind_b2GearJointDef_set_joint1_1 = t.asm.pk).apply(null, arguments);
    }, wl = t._emscripten_bind_b2GearJointDef_get_joint2_0 = function() {
      return (wl = t._emscripten_bind_b2GearJointDef_get_joint2_0 = t.asm.qk).apply(null, arguments);
    }, Rl = t._emscripten_bind_b2GearJointDef_set_joint2_1 = function() {
      return (Rl = t._emscripten_bind_b2GearJointDef_set_joint2_1 = t.asm.rk).apply(null, arguments);
    }, Fl = t._emscripten_bind_b2GearJointDef_get_ratio_0 = function() {
      return (Fl = t._emscripten_bind_b2GearJointDef_get_ratio_0 = t.asm.sk).apply(null, arguments);
    }, Tl = t._emscripten_bind_b2GearJointDef_set_ratio_1 = function() {
      return (Tl = t._emscripten_bind_b2GearJointDef_set_ratio_1 = t.asm.tk).apply(null, arguments);
    }, Ol = t._emscripten_bind_b2GearJointDef_get_type_0 = function() {
      return (Ol = t._emscripten_bind_b2GearJointDef_get_type_0 = t.asm.uk).apply(null, arguments);
    }, Wl = t._emscripten_bind_b2GearJointDef_set_type_1 = function() {
      return (Wl = t._emscripten_bind_b2GearJointDef_set_type_1 = t.asm.vk).apply(null, arguments);
    }, Ll = t._emscripten_bind_b2GearJointDef_get_userData_0 = function() {
      return (Ll = t._emscripten_bind_b2GearJointDef_get_userData_0 = t.asm.wk).apply(null, arguments);
    }, Il = t._emscripten_bind_b2GearJointDef_set_userData_1 = function() {
      return (Il = t._emscripten_bind_b2GearJointDef_set_userData_1 = t.asm.xk).apply(null, arguments);
    }, ql = t._emscripten_bind_b2GearJointDef_get_bodyA_0 = function() {
      return (ql = t._emscripten_bind_b2GearJointDef_get_bodyA_0 = t.asm.yk).apply(null, arguments);
    }, kl = t._emscripten_bind_b2GearJointDef_set_bodyA_1 = function() {
      return (kl = t._emscripten_bind_b2GearJointDef_set_bodyA_1 = t.asm.zk).apply(null, arguments);
    }, El = t._emscripten_bind_b2GearJointDef_get_bodyB_0 = function() {
      return (El = t._emscripten_bind_b2GearJointDef_get_bodyB_0 = t.asm.Ak).apply(null, arguments);
    }, zl = t._emscripten_bind_b2GearJointDef_set_bodyB_1 = function() {
      return (zl = t._emscripten_bind_b2GearJointDef_set_bodyB_1 = t.asm.Bk).apply(null, arguments);
    }, Vl = t._emscripten_bind_b2GearJointDef_get_collideConnected_0 = function() {
      return (Vl = t._emscripten_bind_b2GearJointDef_get_collideConnected_0 = t.asm.Ck).apply(null, arguments);
    }, Ul = t._emscripten_bind_b2GearJointDef_set_collideConnected_1 = function() {
      return (Ul = t._emscripten_bind_b2GearJointDef_set_collideConnected_1 = t.asm.Dk).apply(null, arguments);
    }, $l = t._emscripten_bind_b2GearJointDef___destroy___0 = function() {
      return ($l = t._emscripten_bind_b2GearJointDef___destroy___0 = t.asm.Ek).apply(null, arguments);
    }, Nl = t._emscripten_bind_b2JointEdge_b2JointEdge_0 = function() {
      return (Nl = t._emscripten_bind_b2JointEdge_b2JointEdge_0 = t.asm.Fk).apply(null, arguments);
    }, Hl = t._emscripten_bind_b2JointEdge_get_other_0 = function() {
      return (Hl = t._emscripten_bind_b2JointEdge_get_other_0 = t.asm.Gk).apply(null, arguments);
    }, Ql = t._emscripten_bind_b2JointEdge_set_other_1 = function() {
      return (Ql = t._emscripten_bind_b2JointEdge_set_other_1 = t.asm.Hk).apply(null, arguments);
    }, Xl = t._emscripten_bind_b2JointEdge_get_joint_0 = function() {
      return (Xl = t._emscripten_bind_b2JointEdge_get_joint_0 = t.asm.Ik).apply(null, arguments);
    }, Yl = t._emscripten_bind_b2JointEdge_set_joint_1 = function() {
      return (Yl = t._emscripten_bind_b2JointEdge_set_joint_1 = t.asm.Jk).apply(null, arguments);
    }, Kl = t._emscripten_bind_b2JointEdge_get_prev_0 = function() {
      return (Kl = t._emscripten_bind_b2JointEdge_get_prev_0 = t.asm.Kk).apply(null, arguments);
    }, ty = t._emscripten_bind_b2JointEdge_set_prev_1 = function() {
      return (ty = t._emscripten_bind_b2JointEdge_set_prev_1 = t.asm.Lk).apply(null, arguments);
    }, ey = t._emscripten_bind_b2JointEdge_get_next_0 = function() {
      return (ey = t._emscripten_bind_b2JointEdge_get_next_0 = t.asm.Mk).apply(null, arguments);
    }, ny = t._emscripten_bind_b2JointEdge_set_next_1 = function() {
      return (ny = t._emscripten_bind_b2JointEdge_set_next_1 = t.asm.Nk).apply(null, arguments);
    }, oy = t._emscripten_bind_b2JointEdge___destroy___0 = function() {
      return (oy = t._emscripten_bind_b2JointEdge___destroy___0 = t.asm.Ok).apply(null, arguments);
    }, ry = t._emscripten_bind_b2Manifold_b2Manifold_0 = function() {
      return (ry = t._emscripten_bind_b2Manifold_b2Manifold_0 = t.asm.Pk).apply(null, arguments);
    }, _y = t._emscripten_bind_b2Manifold_get_points_1 = function() {
      return (_y = t._emscripten_bind_b2Manifold_get_points_1 = t.asm.Qk).apply(null, arguments);
    }, iy = t._emscripten_bind_b2Manifold_set_points_2 = function() {
      return (iy = t._emscripten_bind_b2Manifold_set_points_2 = t.asm.Rk).apply(null, arguments);
    }, py = t._emscripten_bind_b2Manifold_get_localNormal_0 = function() {
      return (py = t._emscripten_bind_b2Manifold_get_localNormal_0 = t.asm.Sk).apply(null, arguments);
    }, uy = t._emscripten_bind_b2Manifold_set_localNormal_1 = function() {
      return (uy = t._emscripten_bind_b2Manifold_set_localNormal_1 = t.asm.Tk).apply(null, arguments);
    }, sy = t._emscripten_bind_b2Manifold_get_localPoint_0 = function() {
      return (sy = t._emscripten_bind_b2Manifold_get_localPoint_0 = t.asm.Uk).apply(null, arguments);
    }, cy = t._emscripten_bind_b2Manifold_set_localPoint_1 = function() {
      return (cy = t._emscripten_bind_b2Manifold_set_localPoint_1 = t.asm.Vk).apply(null, arguments);
    }, ay = t._emscripten_bind_b2Manifold_get_type_0 = function() {
      return (ay = t._emscripten_bind_b2Manifold_get_type_0 = t.asm.Wk).apply(null, arguments);
    }, ly = t._emscripten_bind_b2Manifold_set_type_1 = function() {
      return (ly = t._emscripten_bind_b2Manifold_set_type_1 = t.asm.Xk).apply(null, arguments);
    }, yy = t._emscripten_bind_b2Manifold_get_pointCount_0 = function() {
      return (yy = t._emscripten_bind_b2Manifold_get_pointCount_0 = t.asm.Yk).apply(null, arguments);
    }, my = t._emscripten_bind_b2Manifold_set_pointCount_1 = function() {
      return (my = t._emscripten_bind_b2Manifold_set_pointCount_1 = t.asm.Zk).apply(null, arguments);
    }, fy = t._emscripten_bind_b2Manifold___destroy___0 = function() {
      return (fy = t._emscripten_bind_b2Manifold___destroy___0 = t.asm._k).apply(null, arguments);
    }, dy = t._emscripten_bind_b2WorldManifold_b2WorldManifold_0 = function() {
      return (dy = t._emscripten_bind_b2WorldManifold_b2WorldManifold_0 = t.asm.$k).apply(null, arguments);
    }, by = t._emscripten_bind_b2WorldManifold_Initialize_5 = function() {
      return (by = t._emscripten_bind_b2WorldManifold_Initialize_5 = t.asm.al).apply(null, arguments);
    }, gy = t._emscripten_bind_b2WorldManifold_get_normal_0 = function() {
      return (gy = t._emscripten_bind_b2WorldManifold_get_normal_0 = t.asm.bl).apply(null, arguments);
    }, hy = t._emscripten_bind_b2WorldManifold_set_normal_1 = function() {
      return (hy = t._emscripten_bind_b2WorldManifold_set_normal_1 = t.asm.cl).apply(null, arguments);
    }, Zy = t._emscripten_bind_b2WorldManifold_get_points_1 = function() {
      return (Zy = t._emscripten_bind_b2WorldManifold_get_points_1 = t.asm.dl).apply(null, arguments);
    }, vy = t._emscripten_bind_b2WorldManifold_set_points_2 = function() {
      return (vy = t._emscripten_bind_b2WorldManifold_set_points_2 = t.asm.el).apply(null, arguments);
    }, Jy = t._emscripten_bind_b2WorldManifold_get_separations_1 = function() {
      return (Jy = t._emscripten_bind_b2WorldManifold_get_separations_1 = t.asm.fl).apply(null, arguments);
    }, Dy = t._emscripten_bind_b2WorldManifold_set_separations_2 = function() {
      return (Dy = t._emscripten_bind_b2WorldManifold_set_separations_2 = t.asm.gl).apply(null, arguments);
    }, jy = t._emscripten_bind_b2WorldManifold___destroy___0 = function() {
      return (jy = t._emscripten_bind_b2WorldManifold___destroy___0 = t.asm.hl).apply(null, arguments);
    }, Sy = t._emscripten_bind_b2ManifoldPoint_b2ManifoldPoint_0 = function() {
      return (Sy = t._emscripten_bind_b2ManifoldPoint_b2ManifoldPoint_0 = t.asm.il).apply(null, arguments);
    }, Gy = t._emscripten_bind_b2ManifoldPoint_get_localPoint_0 = function() {
      return (Gy = t._emscripten_bind_b2ManifoldPoint_get_localPoint_0 = t.asm.jl).apply(null, arguments);
    }, Ay = t._emscripten_bind_b2ManifoldPoint_set_localPoint_1 = function() {
      return (Ay = t._emscripten_bind_b2ManifoldPoint_set_localPoint_1 = t.asm.kl).apply(null, arguments);
    }, Cy = t._emscripten_bind_b2ManifoldPoint_get_normalImpulse_0 = function() {
      return (Cy = t._emscripten_bind_b2ManifoldPoint_get_normalImpulse_0 = t.asm.ll).apply(null, arguments);
    }, Py = t._emscripten_bind_b2ManifoldPoint_set_normalImpulse_1 = function() {
      return (Py = t._emscripten_bind_b2ManifoldPoint_set_normalImpulse_1 = t.asm.ml).apply(null, arguments);
    }, By = t._emscripten_bind_b2ManifoldPoint_get_tangentImpulse_0 = function() {
      return (By = t._emscripten_bind_b2ManifoldPoint_get_tangentImpulse_0 = t.asm.nl).apply(null, arguments);
    }, xy = t._emscripten_bind_b2ManifoldPoint_set_tangentImpulse_1 = function() {
      return (xy = t._emscripten_bind_b2ManifoldPoint_set_tangentImpulse_1 = t.asm.ol).apply(null, arguments);
    }, My = t._emscripten_bind_b2ManifoldPoint_get_id_0 = function() {
      return (My = t._emscripten_bind_b2ManifoldPoint_get_id_0 = t.asm.pl).apply(null, arguments);
    }, wy = t._emscripten_bind_b2ManifoldPoint_set_id_1 = function() {
      return (wy = t._emscripten_bind_b2ManifoldPoint_set_id_1 = t.asm.ql).apply(null, arguments);
    }, Ry = t._emscripten_bind_b2ManifoldPoint___destroy___0 = function() {
      return (Ry = t._emscripten_bind_b2ManifoldPoint___destroy___0 = t.asm.rl).apply(null, arguments);
    }, Fy = t._emscripten_bind_b2Mat22_b2Mat22_0 = function() {
      return (Fy = t._emscripten_bind_b2Mat22_b2Mat22_0 = t.asm.sl).apply(null, arguments);
    }, Ty = t._emscripten_bind_b2Mat22_b2Mat22_2 = function() {
      return (Ty = t._emscripten_bind_b2Mat22_b2Mat22_2 = t.asm.tl).apply(null, arguments);
    }, Oy = t._emscripten_bind_b2Mat22_b2Mat22_4 = function() {
      return (Oy = t._emscripten_bind_b2Mat22_b2Mat22_4 = t.asm.ul).apply(null, arguments);
    }, Wy = t._emscripten_bind_b2Mat22_Set_2 = function() {
      return (Wy = t._emscripten_bind_b2Mat22_Set_2 = t.asm.vl).apply(null, arguments);
    }, Ly = t._emscripten_bind_b2Mat22_SetIdentity_0 = function() {
      return (Ly = t._emscripten_bind_b2Mat22_SetIdentity_0 = t.asm.wl).apply(null, arguments);
    }, Iy = t._emscripten_bind_b2Mat22_SetZero_0 = function() {
      return (Iy = t._emscripten_bind_b2Mat22_SetZero_0 = t.asm.xl).apply(null, arguments);
    }, qy = t._emscripten_bind_b2Mat22_GetInverse_0 = function() {
      return (qy = t._emscripten_bind_b2Mat22_GetInverse_0 = t.asm.yl).apply(null, arguments);
    }, ky = t._emscripten_bind_b2Mat22_Solve_1 = function() {
      return (ky = t._emscripten_bind_b2Mat22_Solve_1 = t.asm.zl).apply(null, arguments);
    }, Ey = t._emscripten_bind_b2Mat22_get_ex_0 = function() {
      return (Ey = t._emscripten_bind_b2Mat22_get_ex_0 = t.asm.Al).apply(null, arguments);
    }, zy = t._emscripten_bind_b2Mat22_set_ex_1 = function() {
      return (zy = t._emscripten_bind_b2Mat22_set_ex_1 = t.asm.Bl).apply(null, arguments);
    }, Vy = t._emscripten_bind_b2Mat22_get_ey_0 = function() {
      return (Vy = t._emscripten_bind_b2Mat22_get_ey_0 = t.asm.Cl).apply(null, arguments);
    }, Uy = t._emscripten_bind_b2Mat22_set_ey_1 = function() {
      return (Uy = t._emscripten_bind_b2Mat22_set_ey_1 = t.asm.Dl).apply(null, arguments);
    }, $y = t._emscripten_bind_b2Mat22___destroy___0 = function() {
      return ($y = t._emscripten_bind_b2Mat22___destroy___0 = t.asm.El).apply(null, arguments);
    }, Ny = t._emscripten_bind_b2Mat33_b2Mat33_0 = function() {
      return (Ny = t._emscripten_bind_b2Mat33_b2Mat33_0 = t.asm.Fl).apply(null, arguments);
    }, Hy = t._emscripten_bind_b2Mat33_b2Mat33_3 = function() {
      return (Hy = t._emscripten_bind_b2Mat33_b2Mat33_3 = t.asm.Gl).apply(null, arguments);
    }, Qy = t._emscripten_bind_b2Mat33_SetZero_0 = function() {
      return (Qy = t._emscripten_bind_b2Mat33_SetZero_0 = t.asm.Hl).apply(null, arguments);
    }, Xy = t._emscripten_bind_b2Mat33_Solve33_1 = function() {
      return (Xy = t._emscripten_bind_b2Mat33_Solve33_1 = t.asm.Il).apply(null, arguments);
    }, Yy = t._emscripten_bind_b2Mat33_Solve22_1 = function() {
      return (Yy = t._emscripten_bind_b2Mat33_Solve22_1 = t.asm.Jl).apply(null, arguments);
    }, Ky = t._emscripten_bind_b2Mat33_GetInverse22_1 = function() {
      return (Ky = t._emscripten_bind_b2Mat33_GetInverse22_1 = t.asm.Kl).apply(null, arguments);
    }, tm = t._emscripten_bind_b2Mat33_GetSymInverse33_1 = function() {
      return (tm = t._emscripten_bind_b2Mat33_GetSymInverse33_1 = t.asm.Ll).apply(null, arguments);
    }, em = t._emscripten_bind_b2Mat33_get_ex_0 = function() {
      return (em = t._emscripten_bind_b2Mat33_get_ex_0 = t.asm.Ml).apply(null, arguments);
    }, nm = t._emscripten_bind_b2Mat33_set_ex_1 = function() {
      return (nm = t._emscripten_bind_b2Mat33_set_ex_1 = t.asm.Nl).apply(null, arguments);
    }, om = t._emscripten_bind_b2Mat33_get_ey_0 = function() {
      return (om = t._emscripten_bind_b2Mat33_get_ey_0 = t.asm.Ol).apply(null, arguments);
    }, rm = t._emscripten_bind_b2Mat33_set_ey_1 = function() {
      return (rm = t._emscripten_bind_b2Mat33_set_ey_1 = t.asm.Pl).apply(null, arguments);
    }, _m = t._emscripten_bind_b2Mat33_get_ez_0 = function() {
      return (_m = t._emscripten_bind_b2Mat33_get_ez_0 = t.asm.Ql).apply(null, arguments);
    }, im = t._emscripten_bind_b2Mat33_set_ez_1 = function() {
      return (im = t._emscripten_bind_b2Mat33_set_ez_1 = t.asm.Rl).apply(null, arguments);
    }, pm = t._emscripten_bind_b2Mat33___destroy___0 = function() {
      return (pm = t._emscripten_bind_b2Mat33___destroy___0 = t.asm.Sl).apply(null, arguments);
    }, um = t._emscripten_bind_b2MouseJoint_SetTarget_1 = function() {
      return (um = t._emscripten_bind_b2MouseJoint_SetTarget_1 = t.asm.Tl).apply(null, arguments);
    }, sm = t._emscripten_bind_b2MouseJoint_GetTarget_0 = function() {
      return (sm = t._emscripten_bind_b2MouseJoint_GetTarget_0 = t.asm.Ul).apply(null, arguments);
    }, cm = t._emscripten_bind_b2MouseJoint_SetMaxForce_1 = function() {
      return (cm = t._emscripten_bind_b2MouseJoint_SetMaxForce_1 = t.asm.Vl).apply(null, arguments);
    }, am = t._emscripten_bind_b2MouseJoint_GetMaxForce_0 = function() {
      return (am = t._emscripten_bind_b2MouseJoint_GetMaxForce_0 = t.asm.Wl).apply(null, arguments);
    }, lm = t._emscripten_bind_b2MouseJoint_SetStiffness_1 = function() {
      return (lm = t._emscripten_bind_b2MouseJoint_SetStiffness_1 = t.asm.Xl).apply(null, arguments);
    }, ym = t._emscripten_bind_b2MouseJoint_GetStiffness_0 = function() {
      return (ym = t._emscripten_bind_b2MouseJoint_GetStiffness_0 = t.asm.Yl).apply(null, arguments);
    }, mm = t._emscripten_bind_b2MouseJoint_SetDamping_1 = function() {
      return (mm = t._emscripten_bind_b2MouseJoint_SetDamping_1 = t.asm.Zl).apply(null, arguments);
    }, fm = t._emscripten_bind_b2MouseJoint_GetDamping_0 = function() {
      return (fm = t._emscripten_bind_b2MouseJoint_GetDamping_0 = t.asm._l).apply(null, arguments);
    }, dm = t._emscripten_bind_b2MouseJoint_GetType_0 = function() {
      return (dm = t._emscripten_bind_b2MouseJoint_GetType_0 = t.asm.$l).apply(null, arguments);
    }, bm = t._emscripten_bind_b2MouseJoint_GetBodyA_0 = function() {
      return (bm = t._emscripten_bind_b2MouseJoint_GetBodyA_0 = t.asm.am).apply(null, arguments);
    }, gm = t._emscripten_bind_b2MouseJoint_GetBodyB_0 = function() {
      return (gm = t._emscripten_bind_b2MouseJoint_GetBodyB_0 = t.asm.bm).apply(null, arguments);
    }, hm = t._emscripten_bind_b2MouseJoint_GetAnchorA_0 = function() {
      return (hm = t._emscripten_bind_b2MouseJoint_GetAnchorA_0 = t.asm.cm).apply(null, arguments);
    }, Zm = t._emscripten_bind_b2MouseJoint_GetAnchorB_0 = function() {
      return (Zm = t._emscripten_bind_b2MouseJoint_GetAnchorB_0 = t.asm.dm).apply(null, arguments);
    }, vm = t._emscripten_bind_b2MouseJoint_GetReactionForce_1 = function() {
      return (vm = t._emscripten_bind_b2MouseJoint_GetReactionForce_1 = t.asm.em).apply(null, arguments);
    }, Jm = t._emscripten_bind_b2MouseJoint_GetReactionTorque_1 = function() {
      return (Jm = t._emscripten_bind_b2MouseJoint_GetReactionTorque_1 = t.asm.fm).apply(null, arguments);
    }, Dm = t._emscripten_bind_b2MouseJoint_GetNext_0 = function() {
      return (Dm = t._emscripten_bind_b2MouseJoint_GetNext_0 = t.asm.gm).apply(null, arguments);
    }, jm = t._emscripten_bind_b2MouseJoint_GetUserData_0 = function() {
      return (jm = t._emscripten_bind_b2MouseJoint_GetUserData_0 = t.asm.hm).apply(null, arguments);
    }, Sm = t._emscripten_bind_b2MouseJoint_GetCollideConnected_0 = function() {
      return (Sm = t._emscripten_bind_b2MouseJoint_GetCollideConnected_0 = t.asm.im).apply(null, arguments);
    }, Gm = t._emscripten_bind_b2MouseJoint___destroy___0 = function() {
      return (Gm = t._emscripten_bind_b2MouseJoint___destroy___0 = t.asm.jm).apply(null, arguments);
    }, Am = t._emscripten_bind_b2MouseJointDef_b2MouseJointDef_0 = function() {
      return (Am = t._emscripten_bind_b2MouseJointDef_b2MouseJointDef_0 = t.asm.km).apply(null, arguments);
    }, Cm = t._emscripten_bind_b2MouseJointDef_get_target_0 = function() {
      return (Cm = t._emscripten_bind_b2MouseJointDef_get_target_0 = t.asm.lm).apply(null, arguments);
    }, Pm = t._emscripten_bind_b2MouseJointDef_set_target_1 = function() {
      return (Pm = t._emscripten_bind_b2MouseJointDef_set_target_1 = t.asm.mm).apply(null, arguments);
    }, Bm = t._emscripten_bind_b2MouseJointDef_get_maxForce_0 = function() {
      return (Bm = t._emscripten_bind_b2MouseJointDef_get_maxForce_0 = t.asm.nm).apply(null, arguments);
    }, xm = t._emscripten_bind_b2MouseJointDef_set_maxForce_1 = function() {
      return (xm = t._emscripten_bind_b2MouseJointDef_set_maxForce_1 = t.asm.om).apply(null, arguments);
    }, Mm = t._emscripten_bind_b2MouseJointDef_get_stiffness_0 = function() {
      return (Mm = t._emscripten_bind_b2MouseJointDef_get_stiffness_0 = t.asm.pm).apply(null, arguments);
    }, wm = t._emscripten_bind_b2MouseJointDef_set_stiffness_1 = function() {
      return (wm = t._emscripten_bind_b2MouseJointDef_set_stiffness_1 = t.asm.qm).apply(null, arguments);
    }, Rm = t._emscripten_bind_b2MouseJointDef_get_damping_0 = function() {
      return (Rm = t._emscripten_bind_b2MouseJointDef_get_damping_0 = t.asm.rm).apply(null, arguments);
    }, Fm = t._emscripten_bind_b2MouseJointDef_set_damping_1 = function() {
      return (Fm = t._emscripten_bind_b2MouseJointDef_set_damping_1 = t.asm.sm).apply(null, arguments);
    }, Tm = t._emscripten_bind_b2MouseJointDef_get_type_0 = function() {
      return (Tm = t._emscripten_bind_b2MouseJointDef_get_type_0 = t.asm.tm).apply(null, arguments);
    }, Om = t._emscripten_bind_b2MouseJointDef_set_type_1 = function() {
      return (Om = t._emscripten_bind_b2MouseJointDef_set_type_1 = t.asm.um).apply(null, arguments);
    }, Wm = t._emscripten_bind_b2MouseJointDef_get_userData_0 = function() {
      return (Wm = t._emscripten_bind_b2MouseJointDef_get_userData_0 = t.asm.vm).apply(null, arguments);
    }, Lm = t._emscripten_bind_b2MouseJointDef_set_userData_1 = function() {
      return (Lm = t._emscripten_bind_b2MouseJointDef_set_userData_1 = t.asm.wm).apply(null, arguments);
    }, Im = t._emscripten_bind_b2MouseJointDef_get_bodyA_0 = function() {
      return (Im = t._emscripten_bind_b2MouseJointDef_get_bodyA_0 = t.asm.xm).apply(null, arguments);
    }, qm = t._emscripten_bind_b2MouseJointDef_set_bodyA_1 = function() {
      return (qm = t._emscripten_bind_b2MouseJointDef_set_bodyA_1 = t.asm.ym).apply(null, arguments);
    }, km = t._emscripten_bind_b2MouseJointDef_get_bodyB_0 = function() {
      return (km = t._emscripten_bind_b2MouseJointDef_get_bodyB_0 = t.asm.zm).apply(null, arguments);
    }, Em = t._emscripten_bind_b2MouseJointDef_set_bodyB_1 = function() {
      return (Em = t._emscripten_bind_b2MouseJointDef_set_bodyB_1 = t.asm.Am).apply(null, arguments);
    }, zm = t._emscripten_bind_b2MouseJointDef_get_collideConnected_0 = function() {
      return (zm = t._emscripten_bind_b2MouseJointDef_get_collideConnected_0 = t.asm.Bm).apply(null, arguments);
    }, Vm = t._emscripten_bind_b2MouseJointDef_set_collideConnected_1 = function() {
      return (Vm = t._emscripten_bind_b2MouseJointDef_set_collideConnected_1 = t.asm.Cm).apply(null, arguments);
    }, Um = t._emscripten_bind_b2MouseJointDef___destroy___0 = function() {
      return (Um = t._emscripten_bind_b2MouseJointDef___destroy___0 = t.asm.Dm).apply(null, arguments);
    }, $m = t._emscripten_bind_b2PolygonShape_b2PolygonShape_0 = function() {
      return ($m = t._emscripten_bind_b2PolygonShape_b2PolygonShape_0 = t.asm.Em).apply(null, arguments);
    }, Nm = t._emscripten_bind_b2PolygonShape_Set_2 = function() {
      return (Nm = t._emscripten_bind_b2PolygonShape_Set_2 = t.asm.Fm).apply(null, arguments);
    }, Hm = t._emscripten_bind_b2PolygonShape_SetAsBox_2 = function() {
      return (Hm = t._emscripten_bind_b2PolygonShape_SetAsBox_2 = t.asm.Gm).apply(null, arguments);
    }, Qm = t._emscripten_bind_b2PolygonShape_SetAsBox_4 = function() {
      return (Qm = t._emscripten_bind_b2PolygonShape_SetAsBox_4 = t.asm.Hm).apply(null, arguments);
    }, Xm = t._emscripten_bind_b2PolygonShape_GetType_0 = function() {
      return (Xm = t._emscripten_bind_b2PolygonShape_GetType_0 = t.asm.Im).apply(null, arguments);
    }, Ym = t._emscripten_bind_b2PolygonShape_GetChildCount_0 = function() {
      return (Ym = t._emscripten_bind_b2PolygonShape_GetChildCount_0 = t.asm.Jm).apply(null, arguments);
    }, Km = t._emscripten_bind_b2PolygonShape_TestPoint_2 = function() {
      return (Km = t._emscripten_bind_b2PolygonShape_TestPoint_2 = t.asm.Km).apply(null, arguments);
    }, tf = t._emscripten_bind_b2PolygonShape_RayCast_4 = function() {
      return (tf = t._emscripten_bind_b2PolygonShape_RayCast_4 = t.asm.Lm).apply(null, arguments);
    }, ef = t._emscripten_bind_b2PolygonShape_ComputeAABB_3 = function() {
      return (ef = t._emscripten_bind_b2PolygonShape_ComputeAABB_3 = t.asm.Mm).apply(null, arguments);
    }, nf = t._emscripten_bind_b2PolygonShape_ComputeMass_2 = function() {
      return (nf = t._emscripten_bind_b2PolygonShape_ComputeMass_2 = t.asm.Nm).apply(null, arguments);
    }, of = t._emscripten_bind_b2PolygonShape_get_m_centroid_0 = function() {
      return (of = t._emscripten_bind_b2PolygonShape_get_m_centroid_0 = t.asm.Om).apply(null, arguments);
    }, rf = t._emscripten_bind_b2PolygonShape_set_m_centroid_1 = function() {
      return (rf = t._emscripten_bind_b2PolygonShape_set_m_centroid_1 = t.asm.Pm).apply(null, arguments);
    }, _f = t._emscripten_bind_b2PolygonShape_get_m_vertices_1 = function() {
      return (_f = t._emscripten_bind_b2PolygonShape_get_m_vertices_1 = t.asm.Qm).apply(null, arguments);
    }, pf = t._emscripten_bind_b2PolygonShape_set_m_vertices_2 = function() {
      return (pf = t._emscripten_bind_b2PolygonShape_set_m_vertices_2 = t.asm.Rm).apply(null, arguments);
    }, uf = t._emscripten_bind_b2PolygonShape_get_m_normals_1 = function() {
      return (uf = t._emscripten_bind_b2PolygonShape_get_m_normals_1 = t.asm.Sm).apply(null, arguments);
    }, sf = t._emscripten_bind_b2PolygonShape_set_m_normals_2 = function() {
      return (sf = t._emscripten_bind_b2PolygonShape_set_m_normals_2 = t.asm.Tm).apply(null, arguments);
    }, cf = t._emscripten_bind_b2PolygonShape_get_m_count_0 = function() {
      return (cf = t._emscripten_bind_b2PolygonShape_get_m_count_0 = t.asm.Um).apply(null, arguments);
    }, af = t._emscripten_bind_b2PolygonShape_set_m_count_1 = function() {
      return (af = t._emscripten_bind_b2PolygonShape_set_m_count_1 = t.asm.Vm).apply(null, arguments);
    }, lf = t._emscripten_bind_b2PolygonShape_get_m_type_0 = function() {
      return (lf = t._emscripten_bind_b2PolygonShape_get_m_type_0 = t.asm.Wm).apply(null, arguments);
    }, yf = t._emscripten_bind_b2PolygonShape_set_m_type_1 = function() {
      return (yf = t._emscripten_bind_b2PolygonShape_set_m_type_1 = t.asm.Xm).apply(null, arguments);
    }, mf = t._emscripten_bind_b2PolygonShape_get_m_radius_0 = function() {
      return (mf = t._emscripten_bind_b2PolygonShape_get_m_radius_0 = t.asm.Ym).apply(null, arguments);
    }, ff = t._emscripten_bind_b2PolygonShape_set_m_radius_1 = function() {
      return (ff = t._emscripten_bind_b2PolygonShape_set_m_radius_1 = t.asm.Zm).apply(null, arguments);
    }, df = t._emscripten_bind_b2PolygonShape___destroy___0 = function() {
      return (df = t._emscripten_bind_b2PolygonShape___destroy___0 = t.asm._m).apply(null, arguments);
    }, bf = t._emscripten_bind_b2PrismaticJoint_GetLocalAnchorA_0 = function() {
      return (bf = t._emscripten_bind_b2PrismaticJoint_GetLocalAnchorA_0 = t.asm.$m).apply(null, arguments);
    }, gf = t._emscripten_bind_b2PrismaticJoint_GetLocalAnchorB_0 = function() {
      return (gf = t._emscripten_bind_b2PrismaticJoint_GetLocalAnchorB_0 = t.asm.an).apply(null, arguments);
    }, hf = t._emscripten_bind_b2PrismaticJoint_GetLocalAxisA_0 = function() {
      return (hf = t._emscripten_bind_b2PrismaticJoint_GetLocalAxisA_0 = t.asm.bn).apply(null, arguments);
    }, Zf = t._emscripten_bind_b2PrismaticJoint_GetReferenceAngle_0 = function() {
      return (Zf = t._emscripten_bind_b2PrismaticJoint_GetReferenceAngle_0 = t.asm.cn).apply(null, arguments);
    }, vf = t._emscripten_bind_b2PrismaticJoint_GetJointTranslation_0 = function() {
      return (vf = t._emscripten_bind_b2PrismaticJoint_GetJointTranslation_0 = t.asm.dn).apply(null, arguments);
    }, Jf = t._emscripten_bind_b2PrismaticJoint_GetJointSpeed_0 = function() {
      return (Jf = t._emscripten_bind_b2PrismaticJoint_GetJointSpeed_0 = t.asm.en).apply(null, arguments);
    }, Df = t._emscripten_bind_b2PrismaticJoint_IsLimitEnabled_0 = function() {
      return (Df = t._emscripten_bind_b2PrismaticJoint_IsLimitEnabled_0 = t.asm.fn).apply(null, arguments);
    }, jf = t._emscripten_bind_b2PrismaticJoint_EnableLimit_1 = function() {
      return (jf = t._emscripten_bind_b2PrismaticJoint_EnableLimit_1 = t.asm.gn).apply(null, arguments);
    }, Sf = t._emscripten_bind_b2PrismaticJoint_GetLowerLimit_0 = function() {
      return (Sf = t._emscripten_bind_b2PrismaticJoint_GetLowerLimit_0 = t.asm.hn).apply(null, arguments);
    }, Gf = t._emscripten_bind_b2PrismaticJoint_GetUpperLimit_0 = function() {
      return (Gf = t._emscripten_bind_b2PrismaticJoint_GetUpperLimit_0 = t.asm.jn).apply(null, arguments);
    }, Af = t._emscripten_bind_b2PrismaticJoint_SetLimits_2 = function() {
      return (Af = t._emscripten_bind_b2PrismaticJoint_SetLimits_2 = t.asm.kn).apply(null, arguments);
    }, Cf = t._emscripten_bind_b2PrismaticJoint_IsMotorEnabled_0 = function() {
      return (Cf = t._emscripten_bind_b2PrismaticJoint_IsMotorEnabled_0 = t.asm.ln).apply(null, arguments);
    }, Pf = t._emscripten_bind_b2PrismaticJoint_EnableMotor_1 = function() {
      return (Pf = t._emscripten_bind_b2PrismaticJoint_EnableMotor_1 = t.asm.mn).apply(null, arguments);
    }, Bf = t._emscripten_bind_b2PrismaticJoint_SetMotorSpeed_1 = function() {
      return (Bf = t._emscripten_bind_b2PrismaticJoint_SetMotorSpeed_1 = t.asm.nn).apply(null, arguments);
    }, xf = t._emscripten_bind_b2PrismaticJoint_GetMotorSpeed_0 = function() {
      return (xf = t._emscripten_bind_b2PrismaticJoint_GetMotorSpeed_0 = t.asm.on).apply(null, arguments);
    }, Mf = t._emscripten_bind_b2PrismaticJoint_SetMaxMotorForce_1 = function() {
      return (Mf = t._emscripten_bind_b2PrismaticJoint_SetMaxMotorForce_1 = t.asm.pn).apply(null, arguments);
    }, wf = t._emscripten_bind_b2PrismaticJoint_GetMaxMotorForce_0 = function() {
      return (wf = t._emscripten_bind_b2PrismaticJoint_GetMaxMotorForce_0 = t.asm.qn).apply(null, arguments);
    }, Rf = t._emscripten_bind_b2PrismaticJoint_GetMotorForce_1 = function() {
      return (Rf = t._emscripten_bind_b2PrismaticJoint_GetMotorForce_1 = t.asm.rn).apply(null, arguments);
    }, Ff = t._emscripten_bind_b2PrismaticJoint_GetType_0 = function() {
      return (Ff = t._emscripten_bind_b2PrismaticJoint_GetType_0 = t.asm.sn).apply(null, arguments);
    }, Tf = t._emscripten_bind_b2PrismaticJoint_GetBodyA_0 = function() {
      return (Tf = t._emscripten_bind_b2PrismaticJoint_GetBodyA_0 = t.asm.tn).apply(null, arguments);
    }, Of = t._emscripten_bind_b2PrismaticJoint_GetBodyB_0 = function() {
      return (Of = t._emscripten_bind_b2PrismaticJoint_GetBodyB_0 = t.asm.un).apply(null, arguments);
    }, Wf = t._emscripten_bind_b2PrismaticJoint_GetAnchorA_0 = function() {
      return (Wf = t._emscripten_bind_b2PrismaticJoint_GetAnchorA_0 = t.asm.vn).apply(null, arguments);
    }, Lf = t._emscripten_bind_b2PrismaticJoint_GetAnchorB_0 = function() {
      return (Lf = t._emscripten_bind_b2PrismaticJoint_GetAnchorB_0 = t.asm.wn).apply(null, arguments);
    }, If = t._emscripten_bind_b2PrismaticJoint_GetReactionForce_1 = function() {
      return (If = t._emscripten_bind_b2PrismaticJoint_GetReactionForce_1 = t.asm.xn).apply(null, arguments);
    }, qf = t._emscripten_bind_b2PrismaticJoint_GetReactionTorque_1 = function() {
      return (qf = t._emscripten_bind_b2PrismaticJoint_GetReactionTorque_1 = t.asm.yn).apply(null, arguments);
    }, kf = t._emscripten_bind_b2PrismaticJoint_GetNext_0 = function() {
      return (kf = t._emscripten_bind_b2PrismaticJoint_GetNext_0 = t.asm.zn).apply(null, arguments);
    }, Ef = t._emscripten_bind_b2PrismaticJoint_GetUserData_0 = function() {
      return (Ef = t._emscripten_bind_b2PrismaticJoint_GetUserData_0 = t.asm.An).apply(null, arguments);
    }, zf = t._emscripten_bind_b2PrismaticJoint_GetCollideConnected_0 = function() {
      return (zf = t._emscripten_bind_b2PrismaticJoint_GetCollideConnected_0 = t.asm.Bn).apply(null, arguments);
    }, Vf = t._emscripten_bind_b2PrismaticJoint___destroy___0 = function() {
      return (Vf = t._emscripten_bind_b2PrismaticJoint___destroy___0 = t.asm.Cn).apply(null, arguments);
    }, Uf = t._emscripten_bind_b2PrismaticJointDef_b2PrismaticJointDef_0 = function() {
      return (Uf = t._emscripten_bind_b2PrismaticJointDef_b2PrismaticJointDef_0 = t.asm.Dn).apply(null, arguments);
    }, $f = t._emscripten_bind_b2PrismaticJointDef_Initialize_4 = function() {
      return ($f = t._emscripten_bind_b2PrismaticJointDef_Initialize_4 = t.asm.En).apply(null, arguments);
    }, Nf = t._emscripten_bind_b2PrismaticJointDef_get_localAnchorA_0 = function() {
      return (Nf = t._emscripten_bind_b2PrismaticJointDef_get_localAnchorA_0 = t.asm.Fn).apply(null, arguments);
    }, Hf = t._emscripten_bind_b2PrismaticJointDef_set_localAnchorA_1 = function() {
      return (Hf = t._emscripten_bind_b2PrismaticJointDef_set_localAnchorA_1 = t.asm.Gn).apply(null, arguments);
    }, Qf = t._emscripten_bind_b2PrismaticJointDef_get_localAnchorB_0 = function() {
      return (Qf = t._emscripten_bind_b2PrismaticJointDef_get_localAnchorB_0 = t.asm.Hn).apply(null, arguments);
    }, Xf = t._emscripten_bind_b2PrismaticJointDef_set_localAnchorB_1 = function() {
      return (Xf = t._emscripten_bind_b2PrismaticJointDef_set_localAnchorB_1 = t.asm.In).apply(null, arguments);
    }, Yf = t._emscripten_bind_b2PrismaticJointDef_get_localAxisA_0 = function() {
      return (Yf = t._emscripten_bind_b2PrismaticJointDef_get_localAxisA_0 = t.asm.Jn).apply(null, arguments);
    }, Kf = t._emscripten_bind_b2PrismaticJointDef_set_localAxisA_1 = function() {
      return (Kf = t._emscripten_bind_b2PrismaticJointDef_set_localAxisA_1 = t.asm.Kn).apply(null, arguments);
    }, td = t._emscripten_bind_b2PrismaticJointDef_get_referenceAngle_0 = function() {
      return (td = t._emscripten_bind_b2PrismaticJointDef_get_referenceAngle_0 = t.asm.Ln).apply(null, arguments);
    }, ed = t._emscripten_bind_b2PrismaticJointDef_set_referenceAngle_1 = function() {
      return (ed = t._emscripten_bind_b2PrismaticJointDef_set_referenceAngle_1 = t.asm.Mn).apply(null, arguments);
    }, nd = t._emscripten_bind_b2PrismaticJointDef_get_enableLimit_0 = function() {
      return (nd = t._emscripten_bind_b2PrismaticJointDef_get_enableLimit_0 = t.asm.Nn).apply(null, arguments);
    }, od = t._emscripten_bind_b2PrismaticJointDef_set_enableLimit_1 = function() {
      return (od = t._emscripten_bind_b2PrismaticJointDef_set_enableLimit_1 = t.asm.On).apply(null, arguments);
    }, rd = t._emscripten_bind_b2PrismaticJointDef_get_lowerTranslation_0 = function() {
      return (rd = t._emscripten_bind_b2PrismaticJointDef_get_lowerTranslation_0 = t.asm.Pn).apply(null, arguments);
    }, _d = t._emscripten_bind_b2PrismaticJointDef_set_lowerTranslation_1 = function() {
      return (_d = t._emscripten_bind_b2PrismaticJointDef_set_lowerTranslation_1 = t.asm.Qn).apply(null, arguments);
    }, id = t._emscripten_bind_b2PrismaticJointDef_get_upperTranslation_0 = function() {
      return (id = t._emscripten_bind_b2PrismaticJointDef_get_upperTranslation_0 = t.asm.Rn).apply(null, arguments);
    }, pd = t._emscripten_bind_b2PrismaticJointDef_set_upperTranslation_1 = function() {
      return (pd = t._emscripten_bind_b2PrismaticJointDef_set_upperTranslation_1 = t.asm.Sn).apply(null, arguments);
    }, ud = t._emscripten_bind_b2PrismaticJointDef_get_enableMotor_0 = function() {
      return (ud = t._emscripten_bind_b2PrismaticJointDef_get_enableMotor_0 = t.asm.Tn).apply(null, arguments);
    }, sd = t._emscripten_bind_b2PrismaticJointDef_set_enableMotor_1 = function() {
      return (sd = t._emscripten_bind_b2PrismaticJointDef_set_enableMotor_1 = t.asm.Un).apply(null, arguments);
    }, cd = t._emscripten_bind_b2PrismaticJointDef_get_maxMotorForce_0 = function() {
      return (cd = t._emscripten_bind_b2PrismaticJointDef_get_maxMotorForce_0 = t.asm.Vn).apply(null, arguments);
    }, ad = t._emscripten_bind_b2PrismaticJointDef_set_maxMotorForce_1 = function() {
      return (ad = t._emscripten_bind_b2PrismaticJointDef_set_maxMotorForce_1 = t.asm.Wn).apply(null, arguments);
    }, ld = t._emscripten_bind_b2PrismaticJointDef_get_motorSpeed_0 = function() {
      return (ld = t._emscripten_bind_b2PrismaticJointDef_get_motorSpeed_0 = t.asm.Xn).apply(null, arguments);
    }, yd = t._emscripten_bind_b2PrismaticJointDef_set_motorSpeed_1 = function() {
      return (yd = t._emscripten_bind_b2PrismaticJointDef_set_motorSpeed_1 = t.asm.Yn).apply(null, arguments);
    }, md = t._emscripten_bind_b2PrismaticJointDef_get_type_0 = function() {
      return (md = t._emscripten_bind_b2PrismaticJointDef_get_type_0 = t.asm.Zn).apply(null, arguments);
    }, fd = t._emscripten_bind_b2PrismaticJointDef_set_type_1 = function() {
      return (fd = t._emscripten_bind_b2PrismaticJointDef_set_type_1 = t.asm._n).apply(null, arguments);
    }, dd = t._emscripten_bind_b2PrismaticJointDef_get_userData_0 = function() {
      return (dd = t._emscripten_bind_b2PrismaticJointDef_get_userData_0 = t.asm.$n).apply(null, arguments);
    }, bd = t._emscripten_bind_b2PrismaticJointDef_set_userData_1 = function() {
      return (bd = t._emscripten_bind_b2PrismaticJointDef_set_userData_1 = t.asm.ao).apply(null, arguments);
    }, gd = t._emscripten_bind_b2PrismaticJointDef_get_bodyA_0 = function() {
      return (gd = t._emscripten_bind_b2PrismaticJointDef_get_bodyA_0 = t.asm.bo).apply(null, arguments);
    }, hd = t._emscripten_bind_b2PrismaticJointDef_set_bodyA_1 = function() {
      return (hd = t._emscripten_bind_b2PrismaticJointDef_set_bodyA_1 = t.asm.co).apply(null, arguments);
    }, Zd = t._emscripten_bind_b2PrismaticJointDef_get_bodyB_0 = function() {
      return (Zd = t._emscripten_bind_b2PrismaticJointDef_get_bodyB_0 = t.asm.eo).apply(null, arguments);
    }, vd = t._emscripten_bind_b2PrismaticJointDef_set_bodyB_1 = function() {
      return (vd = t._emscripten_bind_b2PrismaticJointDef_set_bodyB_1 = t.asm.fo).apply(null, arguments);
    }, Jd = t._emscripten_bind_b2PrismaticJointDef_get_collideConnected_0 = function() {
      return (Jd = t._emscripten_bind_b2PrismaticJointDef_get_collideConnected_0 = t.asm.go).apply(null, arguments);
    }, Dd = t._emscripten_bind_b2PrismaticJointDef_set_collideConnected_1 = function() {
      return (Dd = t._emscripten_bind_b2PrismaticJointDef_set_collideConnected_1 = t.asm.ho).apply(null, arguments);
    }, jd = t._emscripten_bind_b2PrismaticJointDef___destroy___0 = function() {
      return (jd = t._emscripten_bind_b2PrismaticJointDef___destroy___0 = t.asm.io).apply(null, arguments);
    }, Sd = t._emscripten_bind_b2Profile_get_step_0 = function() {
      return (Sd = t._emscripten_bind_b2Profile_get_step_0 = t.asm.jo).apply(null, arguments);
    }, Gd = t._emscripten_bind_b2Profile_set_step_1 = function() {
      return (Gd = t._emscripten_bind_b2Profile_set_step_1 = t.asm.ko).apply(null, arguments);
    }, Ad = t._emscripten_bind_b2Profile_get_collide_0 = function() {
      return (Ad = t._emscripten_bind_b2Profile_get_collide_0 = t.asm.lo).apply(null, arguments);
    }, Cd = t._emscripten_bind_b2Profile_set_collide_1 = function() {
      return (Cd = t._emscripten_bind_b2Profile_set_collide_1 = t.asm.mo).apply(null, arguments);
    }, Pd = t._emscripten_bind_b2Profile_get_solve_0 = function() {
      return (Pd = t._emscripten_bind_b2Profile_get_solve_0 = t.asm.no).apply(null, arguments);
    }, Bd = t._emscripten_bind_b2Profile_set_solve_1 = function() {
      return (Bd = t._emscripten_bind_b2Profile_set_solve_1 = t.asm.oo).apply(null, arguments);
    }, xd = t._emscripten_bind_b2Profile_get_solveInit_0 = function() {
      return (xd = t._emscripten_bind_b2Profile_get_solveInit_0 = t.asm.po).apply(null, arguments);
    }, Md = t._emscripten_bind_b2Profile_set_solveInit_1 = function() {
      return (Md = t._emscripten_bind_b2Profile_set_solveInit_1 = t.asm.qo).apply(null, arguments);
    }, wd = t._emscripten_bind_b2Profile_get_solveVelocity_0 = function() {
      return (wd = t._emscripten_bind_b2Profile_get_solveVelocity_0 = t.asm.ro).apply(null, arguments);
    }, Rd = t._emscripten_bind_b2Profile_set_solveVelocity_1 = function() {
      return (Rd = t._emscripten_bind_b2Profile_set_solveVelocity_1 = t.asm.so).apply(null, arguments);
    }, Fd = t._emscripten_bind_b2Profile_get_solvePosition_0 = function() {
      return (Fd = t._emscripten_bind_b2Profile_get_solvePosition_0 = t.asm.to).apply(null, arguments);
    }, Td = t._emscripten_bind_b2Profile_set_solvePosition_1 = function() {
      return (Td = t._emscripten_bind_b2Profile_set_solvePosition_1 = t.asm.uo).apply(null, arguments);
    }, Od = t._emscripten_bind_b2Profile_get_broadphase_0 = function() {
      return (Od = t._emscripten_bind_b2Profile_get_broadphase_0 = t.asm.vo).apply(null, arguments);
    }, Wd = t._emscripten_bind_b2Profile_set_broadphase_1 = function() {
      return (Wd = t._emscripten_bind_b2Profile_set_broadphase_1 = t.asm.wo).apply(null, arguments);
    }, Ld = t._emscripten_bind_b2Profile_get_solveTOI_0 = function() {
      return (Ld = t._emscripten_bind_b2Profile_get_solveTOI_0 = t.asm.xo).apply(null, arguments);
    }, Id = t._emscripten_bind_b2Profile_set_solveTOI_1 = function() {
      return (Id = t._emscripten_bind_b2Profile_set_solveTOI_1 = t.asm.yo).apply(null, arguments);
    }, qd = t._emscripten_bind_b2Profile___destroy___0 = function() {
      return (qd = t._emscripten_bind_b2Profile___destroy___0 = t.asm.zo).apply(null, arguments);
    }, kd = t._emscripten_bind_b2PulleyJoint_GetGroundAnchorA_0 = function() {
      return (kd = t._emscripten_bind_b2PulleyJoint_GetGroundAnchorA_0 = t.asm.Ao).apply(null, arguments);
    }, Ed = t._emscripten_bind_b2PulleyJoint_GetGroundAnchorB_0 = function() {
      return (Ed = t._emscripten_bind_b2PulleyJoint_GetGroundAnchorB_0 = t.asm.Bo).apply(null, arguments);
    }, zd = t._emscripten_bind_b2PulleyJoint_GetLengthA_0 = function() {
      return (zd = t._emscripten_bind_b2PulleyJoint_GetLengthA_0 = t.asm.Co).apply(null, arguments);
    }, Vd = t._emscripten_bind_b2PulleyJoint_GetLengthB_0 = function() {
      return (Vd = t._emscripten_bind_b2PulleyJoint_GetLengthB_0 = t.asm.Do).apply(null, arguments);
    }, Ud = t._emscripten_bind_b2PulleyJoint_GetRatio_0 = function() {
      return (Ud = t._emscripten_bind_b2PulleyJoint_GetRatio_0 = t.asm.Eo).apply(null, arguments);
    }, $d = t._emscripten_bind_b2PulleyJoint_GetCurrentLengthA_0 = function() {
      return ($d = t._emscripten_bind_b2PulleyJoint_GetCurrentLengthA_0 = t.asm.Fo).apply(null, arguments);
    }, Nd = t._emscripten_bind_b2PulleyJoint_GetCurrentLengthB_0 = function() {
      return (Nd = t._emscripten_bind_b2PulleyJoint_GetCurrentLengthB_0 = t.asm.Go).apply(null, arguments);
    }, Hd = t._emscripten_bind_b2PulleyJoint_GetType_0 = function() {
      return (Hd = t._emscripten_bind_b2PulleyJoint_GetType_0 = t.asm.Ho).apply(null, arguments);
    }, Qd = t._emscripten_bind_b2PulleyJoint_GetBodyA_0 = function() {
      return (Qd = t._emscripten_bind_b2PulleyJoint_GetBodyA_0 = t.asm.Io).apply(null, arguments);
    }, Xd = t._emscripten_bind_b2PulleyJoint_GetBodyB_0 = function() {
      return (Xd = t._emscripten_bind_b2PulleyJoint_GetBodyB_0 = t.asm.Jo).apply(null, arguments);
    }, Yd = t._emscripten_bind_b2PulleyJoint_GetAnchorA_0 = function() {
      return (Yd = t._emscripten_bind_b2PulleyJoint_GetAnchorA_0 = t.asm.Ko).apply(null, arguments);
    }, Kd = t._emscripten_bind_b2PulleyJoint_GetAnchorB_0 = function() {
      return (Kd = t._emscripten_bind_b2PulleyJoint_GetAnchorB_0 = t.asm.Lo).apply(null, arguments);
    }, tb = t._emscripten_bind_b2PulleyJoint_GetReactionForce_1 = function() {
      return (tb = t._emscripten_bind_b2PulleyJoint_GetReactionForce_1 = t.asm.Mo).apply(null, arguments);
    }, eb = t._emscripten_bind_b2PulleyJoint_GetReactionTorque_1 = function() {
      return (eb = t._emscripten_bind_b2PulleyJoint_GetReactionTorque_1 = t.asm.No).apply(null, arguments);
    }, nb = t._emscripten_bind_b2PulleyJoint_GetNext_0 = function() {
      return (nb = t._emscripten_bind_b2PulleyJoint_GetNext_0 = t.asm.Oo).apply(null, arguments);
    }, ob = t._emscripten_bind_b2PulleyJoint_GetUserData_0 = function() {
      return (ob = t._emscripten_bind_b2PulleyJoint_GetUserData_0 = t.asm.Po).apply(null, arguments);
    }, rb = t._emscripten_bind_b2PulleyJoint_GetCollideConnected_0 = function() {
      return (rb = t._emscripten_bind_b2PulleyJoint_GetCollideConnected_0 = t.asm.Qo).apply(null, arguments);
    }, _b = t._emscripten_bind_b2PulleyJoint___destroy___0 = function() {
      return (_b = t._emscripten_bind_b2PulleyJoint___destroy___0 = t.asm.Ro).apply(null, arguments);
    }, ib = t._emscripten_bind_b2PulleyJointDef_b2PulleyJointDef_0 = function() {
      return (ib = t._emscripten_bind_b2PulleyJointDef_b2PulleyJointDef_0 = t.asm.So).apply(null, arguments);
    }, pb = t._emscripten_bind_b2PulleyJointDef_Initialize_7 = function() {
      return (pb = t._emscripten_bind_b2PulleyJointDef_Initialize_7 = t.asm.To).apply(null, arguments);
    }, ub = t._emscripten_bind_b2PulleyJointDef_get_groundAnchorA_0 = function() {
      return (ub = t._emscripten_bind_b2PulleyJointDef_get_groundAnchorA_0 = t.asm.Uo).apply(null, arguments);
    }, sb = t._emscripten_bind_b2PulleyJointDef_set_groundAnchorA_1 = function() {
      return (sb = t._emscripten_bind_b2PulleyJointDef_set_groundAnchorA_1 = t.asm.Vo).apply(null, arguments);
    }, cb = t._emscripten_bind_b2PulleyJointDef_get_groundAnchorB_0 = function() {
      return (cb = t._emscripten_bind_b2PulleyJointDef_get_groundAnchorB_0 = t.asm.Wo).apply(null, arguments);
    }, ab = t._emscripten_bind_b2PulleyJointDef_set_groundAnchorB_1 = function() {
      return (ab = t._emscripten_bind_b2PulleyJointDef_set_groundAnchorB_1 = t.asm.Xo).apply(null, arguments);
    }, lb = t._emscripten_bind_b2PulleyJointDef_get_localAnchorA_0 = function() {
      return (lb = t._emscripten_bind_b2PulleyJointDef_get_localAnchorA_0 = t.asm.Yo).apply(null, arguments);
    }, yb = t._emscripten_bind_b2PulleyJointDef_set_localAnchorA_1 = function() {
      return (yb = t._emscripten_bind_b2PulleyJointDef_set_localAnchorA_1 = t.asm.Zo).apply(null, arguments);
    }, mb = t._emscripten_bind_b2PulleyJointDef_get_localAnchorB_0 = function() {
      return (mb = t._emscripten_bind_b2PulleyJointDef_get_localAnchorB_0 = t.asm._o).apply(null, arguments);
    }, fb = t._emscripten_bind_b2PulleyJointDef_set_localAnchorB_1 = function() {
      return (fb = t._emscripten_bind_b2PulleyJointDef_set_localAnchorB_1 = t.asm.$o).apply(null, arguments);
    }, db = t._emscripten_bind_b2PulleyJointDef_get_lengthA_0 = function() {
      return (db = t._emscripten_bind_b2PulleyJointDef_get_lengthA_0 = t.asm.ap).apply(null, arguments);
    }, bb = t._emscripten_bind_b2PulleyJointDef_set_lengthA_1 = function() {
      return (bb = t._emscripten_bind_b2PulleyJointDef_set_lengthA_1 = t.asm.bp).apply(null, arguments);
    }, gb = t._emscripten_bind_b2PulleyJointDef_get_lengthB_0 = function() {
      return (gb = t._emscripten_bind_b2PulleyJointDef_get_lengthB_0 = t.asm.cp).apply(null, arguments);
    }, hb = t._emscripten_bind_b2PulleyJointDef_set_lengthB_1 = function() {
      return (hb = t._emscripten_bind_b2PulleyJointDef_set_lengthB_1 = t.asm.dp).apply(null, arguments);
    }, Zb = t._emscripten_bind_b2PulleyJointDef_get_ratio_0 = function() {
      return (Zb = t._emscripten_bind_b2PulleyJointDef_get_ratio_0 = t.asm.ep).apply(null, arguments);
    }, vb = t._emscripten_bind_b2PulleyJointDef_set_ratio_1 = function() {
      return (vb = t._emscripten_bind_b2PulleyJointDef_set_ratio_1 = t.asm.fp).apply(null, arguments);
    }, Jb = t._emscripten_bind_b2PulleyJointDef_get_type_0 = function() {
      return (Jb = t._emscripten_bind_b2PulleyJointDef_get_type_0 = t.asm.gp).apply(null, arguments);
    }, Db = t._emscripten_bind_b2PulleyJointDef_set_type_1 = function() {
      return (Db = t._emscripten_bind_b2PulleyJointDef_set_type_1 = t.asm.hp).apply(null, arguments);
    }, jb = t._emscripten_bind_b2PulleyJointDef_get_userData_0 = function() {
      return (jb = t._emscripten_bind_b2PulleyJointDef_get_userData_0 = t.asm.ip).apply(null, arguments);
    }, Sb = t._emscripten_bind_b2PulleyJointDef_set_userData_1 = function() {
      return (Sb = t._emscripten_bind_b2PulleyJointDef_set_userData_1 = t.asm.jp).apply(null, arguments);
    }, Gb = t._emscripten_bind_b2PulleyJointDef_get_bodyA_0 = function() {
      return (Gb = t._emscripten_bind_b2PulleyJointDef_get_bodyA_0 = t.asm.kp).apply(null, arguments);
    }, Ab = t._emscripten_bind_b2PulleyJointDef_set_bodyA_1 = function() {
      return (Ab = t._emscripten_bind_b2PulleyJointDef_set_bodyA_1 = t.asm.lp).apply(null, arguments);
    }, Cb = t._emscripten_bind_b2PulleyJointDef_get_bodyB_0 = function() {
      return (Cb = t._emscripten_bind_b2PulleyJointDef_get_bodyB_0 = t.asm.mp).apply(null, arguments);
    }, Pb = t._emscripten_bind_b2PulleyJointDef_set_bodyB_1 = function() {
      return (Pb = t._emscripten_bind_b2PulleyJointDef_set_bodyB_1 = t.asm.np).apply(null, arguments);
    }, Bb = t._emscripten_bind_b2PulleyJointDef_get_collideConnected_0 = function() {
      return (Bb = t._emscripten_bind_b2PulleyJointDef_get_collideConnected_0 = t.asm.op).apply(null, arguments);
    }, xb = t._emscripten_bind_b2PulleyJointDef_set_collideConnected_1 = function() {
      return (xb = t._emscripten_bind_b2PulleyJointDef_set_collideConnected_1 = t.asm.pp).apply(null, arguments);
    }, Mb = t._emscripten_bind_b2PulleyJointDef___destroy___0 = function() {
      return (Mb = t._emscripten_bind_b2PulleyJointDef___destroy___0 = t.asm.qp).apply(null, arguments);
    }, wb = t._emscripten_bind_b2RayCastInput_get_p1_0 = function() {
      return (wb = t._emscripten_bind_b2RayCastInput_get_p1_0 = t.asm.rp).apply(null, arguments);
    }, Rb = t._emscripten_bind_b2RayCastInput_set_p1_1 = function() {
      return (Rb = t._emscripten_bind_b2RayCastInput_set_p1_1 = t.asm.sp).apply(null, arguments);
    }, Fb = t._emscripten_bind_b2RayCastInput_get_p2_0 = function() {
      return (Fb = t._emscripten_bind_b2RayCastInput_get_p2_0 = t.asm.tp).apply(null, arguments);
    }, Tb = t._emscripten_bind_b2RayCastInput_set_p2_1 = function() {
      return (Tb = t._emscripten_bind_b2RayCastInput_set_p2_1 = t.asm.up).apply(null, arguments);
    }, Ob = t._emscripten_bind_b2RayCastInput_get_maxFraction_0 = function() {
      return (Ob = t._emscripten_bind_b2RayCastInput_get_maxFraction_0 = t.asm.vp).apply(null, arguments);
    }, Wb = t._emscripten_bind_b2RayCastInput_set_maxFraction_1 = function() {
      return (Wb = t._emscripten_bind_b2RayCastInput_set_maxFraction_1 = t.asm.wp).apply(null, arguments);
    }, Lb = t._emscripten_bind_b2RayCastInput___destroy___0 = function() {
      return (Lb = t._emscripten_bind_b2RayCastInput___destroy___0 = t.asm.xp).apply(null, arguments);
    }, Ib = t._emscripten_bind_b2RayCastOutput_get_normal_0 = function() {
      return (Ib = t._emscripten_bind_b2RayCastOutput_get_normal_0 = t.asm.yp).apply(null, arguments);
    }, qb = t._emscripten_bind_b2RayCastOutput_set_normal_1 = function() {
      return (qb = t._emscripten_bind_b2RayCastOutput_set_normal_1 = t.asm.zp).apply(null, arguments);
    }, kb = t._emscripten_bind_b2RayCastOutput_get_fraction_0 = function() {
      return (kb = t._emscripten_bind_b2RayCastOutput_get_fraction_0 = t.asm.Ap).apply(null, arguments);
    }, Eb = t._emscripten_bind_b2RayCastOutput_set_fraction_1 = function() {
      return (Eb = t._emscripten_bind_b2RayCastOutput_set_fraction_1 = t.asm.Bp).apply(null, arguments);
    }, zb = t._emscripten_bind_b2RayCastOutput___destroy___0 = function() {
      return (zb = t._emscripten_bind_b2RayCastOutput___destroy___0 = t.asm.Cp).apply(null, arguments);
    }, Vb = t._emscripten_bind_b2RevoluteJoint_GetLocalAnchorA_0 = function() {
      return (Vb = t._emscripten_bind_b2RevoluteJoint_GetLocalAnchorA_0 = t.asm.Dp).apply(null, arguments);
    }, Ub = t._emscripten_bind_b2RevoluteJoint_GetLocalAnchorB_0 = function() {
      return (Ub = t._emscripten_bind_b2RevoluteJoint_GetLocalAnchorB_0 = t.asm.Ep).apply(null, arguments);
    }, $b = t._emscripten_bind_b2RevoluteJoint_GetReferenceAngle_0 = function() {
      return ($b = t._emscripten_bind_b2RevoluteJoint_GetReferenceAngle_0 = t.asm.Fp).apply(null, arguments);
    }, Nb = t._emscripten_bind_b2RevoluteJoint_GetJointAngle_0 = function() {
      return (Nb = t._emscripten_bind_b2RevoluteJoint_GetJointAngle_0 = t.asm.Gp).apply(null, arguments);
    }, Hb = t._emscripten_bind_b2RevoluteJoint_GetJointSpeed_0 = function() {
      return (Hb = t._emscripten_bind_b2RevoluteJoint_GetJointSpeed_0 = t.asm.Hp).apply(null, arguments);
    }, Qb = t._emscripten_bind_b2RevoluteJoint_IsLimitEnabled_0 = function() {
      return (Qb = t._emscripten_bind_b2RevoluteJoint_IsLimitEnabled_0 = t.asm.Ip).apply(null, arguments);
    }, Xb = t._emscripten_bind_b2RevoluteJoint_EnableLimit_1 = function() {
      return (Xb = t._emscripten_bind_b2RevoluteJoint_EnableLimit_1 = t.asm.Jp).apply(null, arguments);
    }, Yb = t._emscripten_bind_b2RevoluteJoint_GetLowerLimit_0 = function() {
      return (Yb = t._emscripten_bind_b2RevoluteJoint_GetLowerLimit_0 = t.asm.Kp).apply(null, arguments);
    }, Kb = t._emscripten_bind_b2RevoluteJoint_GetUpperLimit_0 = function() {
      return (Kb = t._emscripten_bind_b2RevoluteJoint_GetUpperLimit_0 = t.asm.Lp).apply(null, arguments);
    }, tg = t._emscripten_bind_b2RevoluteJoint_SetLimits_2 = function() {
      return (tg = t._emscripten_bind_b2RevoluteJoint_SetLimits_2 = t.asm.Mp).apply(null, arguments);
    }, eg = t._emscripten_bind_b2RevoluteJoint_IsMotorEnabled_0 = function() {
      return (eg = t._emscripten_bind_b2RevoluteJoint_IsMotorEnabled_0 = t.asm.Np).apply(null, arguments);
    }, ng = t._emscripten_bind_b2RevoluteJoint_EnableMotor_1 = function() {
      return (ng = t._emscripten_bind_b2RevoluteJoint_EnableMotor_1 = t.asm.Op).apply(null, arguments);
    }, og = t._emscripten_bind_b2RevoluteJoint_SetMotorSpeed_1 = function() {
      return (og = t._emscripten_bind_b2RevoluteJoint_SetMotorSpeed_1 = t.asm.Pp).apply(null, arguments);
    }, rg = t._emscripten_bind_b2RevoluteJoint_GetMotorSpeed_0 = function() {
      return (rg = t._emscripten_bind_b2RevoluteJoint_GetMotorSpeed_0 = t.asm.Qp).apply(null, arguments);
    }, _g = t._emscripten_bind_b2RevoluteJoint_SetMaxMotorTorque_1 = function() {
      return (_g = t._emscripten_bind_b2RevoluteJoint_SetMaxMotorTorque_1 = t.asm.Rp).apply(null, arguments);
    }, ig = t._emscripten_bind_b2RevoluteJoint_GetMaxMotorTorque_0 = function() {
      return (ig = t._emscripten_bind_b2RevoluteJoint_GetMaxMotorTorque_0 = t.asm.Sp).apply(null, arguments);
    }, pg = t._emscripten_bind_b2RevoluteJoint_GetMotorTorque_1 = function() {
      return (pg = t._emscripten_bind_b2RevoluteJoint_GetMotorTorque_1 = t.asm.Tp).apply(null, arguments);
    }, ug = t._emscripten_bind_b2RevoluteJoint_GetType_0 = function() {
      return (ug = t._emscripten_bind_b2RevoluteJoint_GetType_0 = t.asm.Up).apply(null, arguments);
    }, sg = t._emscripten_bind_b2RevoluteJoint_GetBodyA_0 = function() {
      return (sg = t._emscripten_bind_b2RevoluteJoint_GetBodyA_0 = t.asm.Vp).apply(null, arguments);
    }, cg = t._emscripten_bind_b2RevoluteJoint_GetBodyB_0 = function() {
      return (cg = t._emscripten_bind_b2RevoluteJoint_GetBodyB_0 = t.asm.Wp).apply(null, arguments);
    }, ag = t._emscripten_bind_b2RevoluteJoint_GetAnchorA_0 = function() {
      return (ag = t._emscripten_bind_b2RevoluteJoint_GetAnchorA_0 = t.asm.Xp).apply(null, arguments);
    }, lg = t._emscripten_bind_b2RevoluteJoint_GetAnchorB_0 = function() {
      return (lg = t._emscripten_bind_b2RevoluteJoint_GetAnchorB_0 = t.asm.Yp).apply(null, arguments);
    }, yg = t._emscripten_bind_b2RevoluteJoint_GetReactionForce_1 = function() {
      return (yg = t._emscripten_bind_b2RevoluteJoint_GetReactionForce_1 = t.asm.Zp).apply(null, arguments);
    }, mg = t._emscripten_bind_b2RevoluteJoint_GetReactionTorque_1 = function() {
      return (mg = t._emscripten_bind_b2RevoluteJoint_GetReactionTorque_1 = t.asm._p).apply(null, arguments);
    }, fg = t._emscripten_bind_b2RevoluteJoint_GetNext_0 = function() {
      return (fg = t._emscripten_bind_b2RevoluteJoint_GetNext_0 = t.asm.$p).apply(null, arguments);
    }, dg = t._emscripten_bind_b2RevoluteJoint_GetUserData_0 = function() {
      return (dg = t._emscripten_bind_b2RevoluteJoint_GetUserData_0 = t.asm.aq).apply(null, arguments);
    }, bg = t._emscripten_bind_b2RevoluteJoint_GetCollideConnected_0 = function() {
      return (bg = t._emscripten_bind_b2RevoluteJoint_GetCollideConnected_0 = t.asm.bq).apply(null, arguments);
    }, gg = t._emscripten_bind_b2RevoluteJoint___destroy___0 = function() {
      return (gg = t._emscripten_bind_b2RevoluteJoint___destroy___0 = t.asm.cq).apply(null, arguments);
    }, hg = t._emscripten_bind_b2RevoluteJointDef_b2RevoluteJointDef_0 = function() {
      return (hg = t._emscripten_bind_b2RevoluteJointDef_b2RevoluteJointDef_0 = t.asm.dq).apply(null, arguments);
    }, Zg = t._emscripten_bind_b2RevoluteJointDef_Initialize_3 = function() {
      return (Zg = t._emscripten_bind_b2RevoluteJointDef_Initialize_3 = t.asm.eq).apply(null, arguments);
    }, vg = t._emscripten_bind_b2RevoluteJointDef_get_localAnchorA_0 = function() {
      return (vg = t._emscripten_bind_b2RevoluteJointDef_get_localAnchorA_0 = t.asm.fq).apply(null, arguments);
    }, Jg = t._emscripten_bind_b2RevoluteJointDef_set_localAnchorA_1 = function() {
      return (Jg = t._emscripten_bind_b2RevoluteJointDef_set_localAnchorA_1 = t.asm.gq).apply(null, arguments);
    }, Dg = t._emscripten_bind_b2RevoluteJointDef_get_localAnchorB_0 = function() {
      return (Dg = t._emscripten_bind_b2RevoluteJointDef_get_localAnchorB_0 = t.asm.hq).apply(null, arguments);
    }, jg = t._emscripten_bind_b2RevoluteJointDef_set_localAnchorB_1 = function() {
      return (jg = t._emscripten_bind_b2RevoluteJointDef_set_localAnchorB_1 = t.asm.iq).apply(null, arguments);
    }, Sg = t._emscripten_bind_b2RevoluteJointDef_get_referenceAngle_0 = function() {
      return (Sg = t._emscripten_bind_b2RevoluteJointDef_get_referenceAngle_0 = t.asm.jq).apply(null, arguments);
    }, Gg = t._emscripten_bind_b2RevoluteJointDef_set_referenceAngle_1 = function() {
      return (Gg = t._emscripten_bind_b2RevoluteJointDef_set_referenceAngle_1 = t.asm.kq).apply(null, arguments);
    }, Ag = t._emscripten_bind_b2RevoluteJointDef_get_enableLimit_0 = function() {
      return (Ag = t._emscripten_bind_b2RevoluteJointDef_get_enableLimit_0 = t.asm.lq).apply(null, arguments);
    }, Cg = t._emscripten_bind_b2RevoluteJointDef_set_enableLimit_1 = function() {
      return (Cg = t._emscripten_bind_b2RevoluteJointDef_set_enableLimit_1 = t.asm.mq).apply(null, arguments);
    }, Pg = t._emscripten_bind_b2RevoluteJointDef_get_lowerAngle_0 = function() {
      return (Pg = t._emscripten_bind_b2RevoluteJointDef_get_lowerAngle_0 = t.asm.nq).apply(null, arguments);
    }, Bg = t._emscripten_bind_b2RevoluteJointDef_set_lowerAngle_1 = function() {
      return (Bg = t._emscripten_bind_b2RevoluteJointDef_set_lowerAngle_1 = t.asm.oq).apply(null, arguments);
    }, xg = t._emscripten_bind_b2RevoluteJointDef_get_upperAngle_0 = function() {
      return (xg = t._emscripten_bind_b2RevoluteJointDef_get_upperAngle_0 = t.asm.pq).apply(null, arguments);
    }, Mg = t._emscripten_bind_b2RevoluteJointDef_set_upperAngle_1 = function() {
      return (Mg = t._emscripten_bind_b2RevoluteJointDef_set_upperAngle_1 = t.asm.qq).apply(null, arguments);
    }, wg = t._emscripten_bind_b2RevoluteJointDef_get_enableMotor_0 = function() {
      return (wg = t._emscripten_bind_b2RevoluteJointDef_get_enableMotor_0 = t.asm.rq).apply(null, arguments);
    }, Rg = t._emscripten_bind_b2RevoluteJointDef_set_enableMotor_1 = function() {
      return (Rg = t._emscripten_bind_b2RevoluteJointDef_set_enableMotor_1 = t.asm.sq).apply(null, arguments);
    }, Fg = t._emscripten_bind_b2RevoluteJointDef_get_motorSpeed_0 = function() {
      return (Fg = t._emscripten_bind_b2RevoluteJointDef_get_motorSpeed_0 = t.asm.tq).apply(null, arguments);
    }, Tg = t._emscripten_bind_b2RevoluteJointDef_set_motorSpeed_1 = function() {
      return (Tg = t._emscripten_bind_b2RevoluteJointDef_set_motorSpeed_1 = t.asm.uq).apply(null, arguments);
    }, Og = t._emscripten_bind_b2RevoluteJointDef_get_maxMotorTorque_0 = function() {
      return (Og = t._emscripten_bind_b2RevoluteJointDef_get_maxMotorTorque_0 = t.asm.vq).apply(null, arguments);
    }, Wg = t._emscripten_bind_b2RevoluteJointDef_set_maxMotorTorque_1 = function() {
      return (Wg = t._emscripten_bind_b2RevoluteJointDef_set_maxMotorTorque_1 = t.asm.wq).apply(null, arguments);
    }, Lg = t._emscripten_bind_b2RevoluteJointDef_get_type_0 = function() {
      return (Lg = t._emscripten_bind_b2RevoluteJointDef_get_type_0 = t.asm.xq).apply(null, arguments);
    }, Ig = t._emscripten_bind_b2RevoluteJointDef_set_type_1 = function() {
      return (Ig = t._emscripten_bind_b2RevoluteJointDef_set_type_1 = t.asm.yq).apply(null, arguments);
    }, qg = t._emscripten_bind_b2RevoluteJointDef_get_userData_0 = function() {
      return (qg = t._emscripten_bind_b2RevoluteJointDef_get_userData_0 = t.asm.zq).apply(null, arguments);
    }, kg = t._emscripten_bind_b2RevoluteJointDef_set_userData_1 = function() {
      return (kg = t._emscripten_bind_b2RevoluteJointDef_set_userData_1 = t.asm.Aq).apply(null, arguments);
    }, Eg = t._emscripten_bind_b2RevoluteJointDef_get_bodyA_0 = function() {
      return (Eg = t._emscripten_bind_b2RevoluteJointDef_get_bodyA_0 = t.asm.Bq).apply(null, arguments);
    }, zg = t._emscripten_bind_b2RevoluteJointDef_set_bodyA_1 = function() {
      return (zg = t._emscripten_bind_b2RevoluteJointDef_set_bodyA_1 = t.asm.Cq).apply(null, arguments);
    }, Vg = t._emscripten_bind_b2RevoluteJointDef_get_bodyB_0 = function() {
      return (Vg = t._emscripten_bind_b2RevoluteJointDef_get_bodyB_0 = t.asm.Dq).apply(null, arguments);
    }, Ug = t._emscripten_bind_b2RevoluteJointDef_set_bodyB_1 = function() {
      return (Ug = t._emscripten_bind_b2RevoluteJointDef_set_bodyB_1 = t.asm.Eq).apply(null, arguments);
    }, $g = t._emscripten_bind_b2RevoluteJointDef_get_collideConnected_0 = function() {
      return ($g = t._emscripten_bind_b2RevoluteJointDef_get_collideConnected_0 = t.asm.Fq).apply(null, arguments);
    }, Ng = t._emscripten_bind_b2RevoluteJointDef_set_collideConnected_1 = function() {
      return (Ng = t._emscripten_bind_b2RevoluteJointDef_set_collideConnected_1 = t.asm.Gq).apply(null, arguments);
    }, Hg = t._emscripten_bind_b2RevoluteJointDef___destroy___0 = function() {
      return (Hg = t._emscripten_bind_b2RevoluteJointDef___destroy___0 = t.asm.Hq).apply(null, arguments);
    }, Qg = t._emscripten_bind_b2Rot_b2Rot_0 = function() {
      return (Qg = t._emscripten_bind_b2Rot_b2Rot_0 = t.asm.Iq).apply(null, arguments);
    }, Xg = t._emscripten_bind_b2Rot_b2Rot_1 = function() {
      return (Xg = t._emscripten_bind_b2Rot_b2Rot_1 = t.asm.Jq).apply(null, arguments);
    }, Yg = t._emscripten_bind_b2Rot_Set_1 = function() {
      return (Yg = t._emscripten_bind_b2Rot_Set_1 = t.asm.Kq).apply(null, arguments);
    }, Kg = t._emscripten_bind_b2Rot_SetIdentity_0 = function() {
      return (Kg = t._emscripten_bind_b2Rot_SetIdentity_0 = t.asm.Lq).apply(null, arguments);
    }, t2 = t._emscripten_bind_b2Rot_GetAngle_0 = function() {
      return (t2 = t._emscripten_bind_b2Rot_GetAngle_0 = t.asm.Mq).apply(null, arguments);
    }, e2 = t._emscripten_bind_b2Rot_GetXAxis_0 = function() {
      return (e2 = t._emscripten_bind_b2Rot_GetXAxis_0 = t.asm.Nq).apply(null, arguments);
    }, n2 = t._emscripten_bind_b2Rot_GetYAxis_0 = function() {
      return (n2 = t._emscripten_bind_b2Rot_GetYAxis_0 = t.asm.Oq).apply(null, arguments);
    }, o2 = t._emscripten_bind_b2Rot_get_s_0 = function() {
      return (o2 = t._emscripten_bind_b2Rot_get_s_0 = t.asm.Pq).apply(null, arguments);
    }, r2 = t._emscripten_bind_b2Rot_set_s_1 = function() {
      return (r2 = t._emscripten_bind_b2Rot_set_s_1 = t.asm.Qq).apply(null, arguments);
    }, _2 = t._emscripten_bind_b2Rot_get_c_0 = function() {
      return (_2 = t._emscripten_bind_b2Rot_get_c_0 = t.asm.Rq).apply(null, arguments);
    }, i2 = t._emscripten_bind_b2Rot_set_c_1 = function() {
      return (i2 = t._emscripten_bind_b2Rot_set_c_1 = t.asm.Sq).apply(null, arguments);
    }, p2 = t._emscripten_bind_b2Rot___destroy___0 = function() {
      return (p2 = t._emscripten_bind_b2Rot___destroy___0 = t.asm.Tq).apply(null, arguments);
    }, u2 = t._emscripten_bind_b2WheelJoint_GetLocalAnchorA_0 = function() {
      return (u2 = t._emscripten_bind_b2WheelJoint_GetLocalAnchorA_0 = t.asm.Uq).apply(null, arguments);
    }, s2 = t._emscripten_bind_b2WheelJoint_GetLocalAnchorB_0 = function() {
      return (s2 = t._emscripten_bind_b2WheelJoint_GetLocalAnchorB_0 = t.asm.Vq).apply(null, arguments);
    }, c2 = t._emscripten_bind_b2WheelJoint_GetLocalAxisA_0 = function() {
      return (c2 = t._emscripten_bind_b2WheelJoint_GetLocalAxisA_0 = t.asm.Wq).apply(null, arguments);
    }, a2 = t._emscripten_bind_b2WheelJoint_GetJointTranslation_0 = function() {
      return (a2 = t._emscripten_bind_b2WheelJoint_GetJointTranslation_0 = t.asm.Xq).apply(null, arguments);
    }, l2 = t._emscripten_bind_b2WheelJoint_GetJointLinearSpeed_0 = function() {
      return (l2 = t._emscripten_bind_b2WheelJoint_GetJointLinearSpeed_0 = t.asm.Yq).apply(null, arguments);
    }, y2 = t._emscripten_bind_b2WheelJoint_GetJointAngle_0 = function() {
      return (y2 = t._emscripten_bind_b2WheelJoint_GetJointAngle_0 = t.asm.Zq).apply(null, arguments);
    }, m2 = t._emscripten_bind_b2WheelJoint_GetJointAngularSpeed_0 = function() {
      return (m2 = t._emscripten_bind_b2WheelJoint_GetJointAngularSpeed_0 = t.asm._q).apply(null, arguments);
    }, f2 = t._emscripten_bind_b2WheelJoint_IsLimitEnabled_0 = function() {
      return (f2 = t._emscripten_bind_b2WheelJoint_IsLimitEnabled_0 = t.asm.$q).apply(null, arguments);
    }, d2 = t._emscripten_bind_b2WheelJoint_EnableLimit_1 = function() {
      return (d2 = t._emscripten_bind_b2WheelJoint_EnableLimit_1 = t.asm.ar).apply(null, arguments);
    }, b2 = t._emscripten_bind_b2WheelJoint_GetLowerLimit_0 = function() {
      return (b2 = t._emscripten_bind_b2WheelJoint_GetLowerLimit_0 = t.asm.br).apply(null, arguments);
    }, g2 = t._emscripten_bind_b2WheelJoint_GetUpperLimit_0 = function() {
      return (g2 = t._emscripten_bind_b2WheelJoint_GetUpperLimit_0 = t.asm.cr).apply(null, arguments);
    }, h2 = t._emscripten_bind_b2WheelJoint_SetLimits_2 = function() {
      return (h2 = t._emscripten_bind_b2WheelJoint_SetLimits_2 = t.asm.dr).apply(null, arguments);
    }, Z2 = t._emscripten_bind_b2WheelJoint_IsMotorEnabled_0 = function() {
      return (Z2 = t._emscripten_bind_b2WheelJoint_IsMotorEnabled_0 = t.asm.er).apply(null, arguments);
    }, v2 = t._emscripten_bind_b2WheelJoint_EnableMotor_1 = function() {
      return (v2 = t._emscripten_bind_b2WheelJoint_EnableMotor_1 = t.asm.fr).apply(null, arguments);
    }, J2 = t._emscripten_bind_b2WheelJoint_SetMotorSpeed_1 = function() {
      return (J2 = t._emscripten_bind_b2WheelJoint_SetMotorSpeed_1 = t.asm.gr).apply(null, arguments);
    }, D2 = t._emscripten_bind_b2WheelJoint_GetMotorSpeed_0 = function() {
      return (D2 = t._emscripten_bind_b2WheelJoint_GetMotorSpeed_0 = t.asm.hr).apply(null, arguments);
    }, j2 = t._emscripten_bind_b2WheelJoint_SetMaxMotorTorque_1 = function() {
      return (j2 = t._emscripten_bind_b2WheelJoint_SetMaxMotorTorque_1 = t.asm.ir).apply(null, arguments);
    }, S2 = t._emscripten_bind_b2WheelJoint_GetMaxMotorTorque_0 = function() {
      return (S2 = t._emscripten_bind_b2WheelJoint_GetMaxMotorTorque_0 = t.asm.jr).apply(null, arguments);
    }, G2 = t._emscripten_bind_b2WheelJoint_GetMotorTorque_1 = function() {
      return (G2 = t._emscripten_bind_b2WheelJoint_GetMotorTorque_1 = t.asm.kr).apply(null, arguments);
    }, A2 = t._emscripten_bind_b2WheelJoint_SetStiffness_1 = function() {
      return (A2 = t._emscripten_bind_b2WheelJoint_SetStiffness_1 = t.asm.lr).apply(null, arguments);
    }, C2 = t._emscripten_bind_b2WheelJoint_GetStiffness_0 = function() {
      return (C2 = t._emscripten_bind_b2WheelJoint_GetStiffness_0 = t.asm.mr).apply(null, arguments);
    }, P2 = t._emscripten_bind_b2WheelJoint_SetDamping_1 = function() {
      return (P2 = t._emscripten_bind_b2WheelJoint_SetDamping_1 = t.asm.nr).apply(null, arguments);
    }, B2 = t._emscripten_bind_b2WheelJoint_GetDamping_0 = function() {
      return (B2 = t._emscripten_bind_b2WheelJoint_GetDamping_0 = t.asm.or).apply(null, arguments);
    }, x2 = t._emscripten_bind_b2WheelJoint_GetType_0 = function() {
      return (x2 = t._emscripten_bind_b2WheelJoint_GetType_0 = t.asm.pr).apply(null, arguments);
    }, M2 = t._emscripten_bind_b2WheelJoint_GetBodyA_0 = function() {
      return (M2 = t._emscripten_bind_b2WheelJoint_GetBodyA_0 = t.asm.qr).apply(null, arguments);
    }, w2 = t._emscripten_bind_b2WheelJoint_GetBodyB_0 = function() {
      return (w2 = t._emscripten_bind_b2WheelJoint_GetBodyB_0 = t.asm.rr).apply(null, arguments);
    }, R2 = t._emscripten_bind_b2WheelJoint_GetAnchorA_0 = function() {
      return (R2 = t._emscripten_bind_b2WheelJoint_GetAnchorA_0 = t.asm.sr).apply(null, arguments);
    }, F2 = t._emscripten_bind_b2WheelJoint_GetAnchorB_0 = function() {
      return (F2 = t._emscripten_bind_b2WheelJoint_GetAnchorB_0 = t.asm.tr).apply(null, arguments);
    }, T2 = t._emscripten_bind_b2WheelJoint_GetReactionForce_1 = function() {
      return (T2 = t._emscripten_bind_b2WheelJoint_GetReactionForce_1 = t.asm.ur).apply(null, arguments);
    }, O2 = t._emscripten_bind_b2WheelJoint_GetReactionTorque_1 = function() {
      return (O2 = t._emscripten_bind_b2WheelJoint_GetReactionTorque_1 = t.asm.vr).apply(null, arguments);
    }, W2 = t._emscripten_bind_b2WheelJoint_GetNext_0 = function() {
      return (W2 = t._emscripten_bind_b2WheelJoint_GetNext_0 = t.asm.wr).apply(null, arguments);
    }, L2 = t._emscripten_bind_b2WheelJoint_GetUserData_0 = function() {
      return (L2 = t._emscripten_bind_b2WheelJoint_GetUserData_0 = t.asm.xr).apply(null, arguments);
    }, I2 = t._emscripten_bind_b2WheelJoint_GetCollideConnected_0 = function() {
      return (I2 = t._emscripten_bind_b2WheelJoint_GetCollideConnected_0 = t.asm.yr).apply(null, arguments);
    }, q2 = t._emscripten_bind_b2WheelJoint___destroy___0 = function() {
      return (q2 = t._emscripten_bind_b2WheelJoint___destroy___0 = t.asm.zr).apply(null, arguments);
    }, k2 = t._emscripten_bind_b2WheelJointDef_b2WheelJointDef_0 = function() {
      return (k2 = t._emscripten_bind_b2WheelJointDef_b2WheelJointDef_0 = t.asm.Ar).apply(null, arguments);
    }, E2 = t._emscripten_bind_b2WheelJointDef_Initialize_4 = function() {
      return (E2 = t._emscripten_bind_b2WheelJointDef_Initialize_4 = t.asm.Br).apply(null, arguments);
    }, z2 = t._emscripten_bind_b2WheelJointDef_get_localAnchorA_0 = function() {
      return (z2 = t._emscripten_bind_b2WheelJointDef_get_localAnchorA_0 = t.asm.Cr).apply(null, arguments);
    }, V2 = t._emscripten_bind_b2WheelJointDef_set_localAnchorA_1 = function() {
      return (V2 = t._emscripten_bind_b2WheelJointDef_set_localAnchorA_1 = t.asm.Dr).apply(null, arguments);
    }, U2 = t._emscripten_bind_b2WheelJointDef_get_localAnchorB_0 = function() {
      return (U2 = t._emscripten_bind_b2WheelJointDef_get_localAnchorB_0 = t.asm.Er).apply(null, arguments);
    }, $2 = t._emscripten_bind_b2WheelJointDef_set_localAnchorB_1 = function() {
      return ($2 = t._emscripten_bind_b2WheelJointDef_set_localAnchorB_1 = t.asm.Fr).apply(null, arguments);
    }, N2 = t._emscripten_bind_b2WheelJointDef_get_localAxisA_0 = function() {
      return (N2 = t._emscripten_bind_b2WheelJointDef_get_localAxisA_0 = t.asm.Gr).apply(null, arguments);
    }, H2 = t._emscripten_bind_b2WheelJointDef_set_localAxisA_1 = function() {
      return (H2 = t._emscripten_bind_b2WheelJointDef_set_localAxisA_1 = t.asm.Hr).apply(null, arguments);
    }, Q2 = t._emscripten_bind_b2WheelJointDef_get_enableLimit_0 = function() {
      return (Q2 = t._emscripten_bind_b2WheelJointDef_get_enableLimit_0 = t.asm.Ir).apply(null, arguments);
    }, X2 = t._emscripten_bind_b2WheelJointDef_set_enableLimit_1 = function() {
      return (X2 = t._emscripten_bind_b2WheelJointDef_set_enableLimit_1 = t.asm.Jr).apply(null, arguments);
    }, Y2 = t._emscripten_bind_b2WheelJointDef_get_lowerTranslation_0 = function() {
      return (Y2 = t._emscripten_bind_b2WheelJointDef_get_lowerTranslation_0 = t.asm.Kr).apply(null, arguments);
    }, K2 = t._emscripten_bind_b2WheelJointDef_set_lowerTranslation_1 = function() {
      return (K2 = t._emscripten_bind_b2WheelJointDef_set_lowerTranslation_1 = t.asm.Lr).apply(null, arguments);
    }, th = t._emscripten_bind_b2WheelJointDef_get_upperTranslation_0 = function() {
      return (th = t._emscripten_bind_b2WheelJointDef_get_upperTranslation_0 = t.asm.Mr).apply(null, arguments);
    }, eh = t._emscripten_bind_b2WheelJointDef_set_upperTranslation_1 = function() {
      return (eh = t._emscripten_bind_b2WheelJointDef_set_upperTranslation_1 = t.asm.Nr).apply(null, arguments);
    }, nh = t._emscripten_bind_b2WheelJointDef_get_enableMotor_0 = function() {
      return (nh = t._emscripten_bind_b2WheelJointDef_get_enableMotor_0 = t.asm.Or).apply(null, arguments);
    }, oh = t._emscripten_bind_b2WheelJointDef_set_enableMotor_1 = function() {
      return (oh = t._emscripten_bind_b2WheelJointDef_set_enableMotor_1 = t.asm.Pr).apply(null, arguments);
    }, rh = t._emscripten_bind_b2WheelJointDef_get_maxMotorTorque_0 = function() {
      return (rh = t._emscripten_bind_b2WheelJointDef_get_maxMotorTorque_0 = t.asm.Qr).apply(null, arguments);
    }, _h = t._emscripten_bind_b2WheelJointDef_set_maxMotorTorque_1 = function() {
      return (_h = t._emscripten_bind_b2WheelJointDef_set_maxMotorTorque_1 = t.asm.Rr).apply(null, arguments);
    }, ih = t._emscripten_bind_b2WheelJointDef_get_motorSpeed_0 = function() {
      return (ih = t._emscripten_bind_b2WheelJointDef_get_motorSpeed_0 = t.asm.Sr).apply(null, arguments);
    }, ph = t._emscripten_bind_b2WheelJointDef_set_motorSpeed_1 = function() {
      return (ph = t._emscripten_bind_b2WheelJointDef_set_motorSpeed_1 = t.asm.Tr).apply(null, arguments);
    }, uh = t._emscripten_bind_b2WheelJointDef_get_stiffness_0 = function() {
      return (uh = t._emscripten_bind_b2WheelJointDef_get_stiffness_0 = t.asm.Ur).apply(null, arguments);
    }, sh = t._emscripten_bind_b2WheelJointDef_set_stiffness_1 = function() {
      return (sh = t._emscripten_bind_b2WheelJointDef_set_stiffness_1 = t.asm.Vr).apply(null, arguments);
    }, ch = t._emscripten_bind_b2WheelJointDef_get_damping_0 = function() {
      return (ch = t._emscripten_bind_b2WheelJointDef_get_damping_0 = t.asm.Wr).apply(null, arguments);
    }, ah = t._emscripten_bind_b2WheelJointDef_set_damping_1 = function() {
      return (ah = t._emscripten_bind_b2WheelJointDef_set_damping_1 = t.asm.Xr).apply(null, arguments);
    }, lh = t._emscripten_bind_b2WheelJointDef_get_type_0 = function() {
      return (lh = t._emscripten_bind_b2WheelJointDef_get_type_0 = t.asm.Yr).apply(null, arguments);
    }, yh = t._emscripten_bind_b2WheelJointDef_set_type_1 = function() {
      return (yh = t._emscripten_bind_b2WheelJointDef_set_type_1 = t.asm.Zr).apply(null, arguments);
    }, mh = t._emscripten_bind_b2WheelJointDef_get_userData_0 = function() {
      return (mh = t._emscripten_bind_b2WheelJointDef_get_userData_0 = t.asm._r).apply(null, arguments);
    }, fh = t._emscripten_bind_b2WheelJointDef_set_userData_1 = function() {
      return (fh = t._emscripten_bind_b2WheelJointDef_set_userData_1 = t.asm.$r).apply(null, arguments);
    }, dh = t._emscripten_bind_b2WheelJointDef_get_bodyA_0 = function() {
      return (dh = t._emscripten_bind_b2WheelJointDef_get_bodyA_0 = t.asm.as).apply(null, arguments);
    }, bh = t._emscripten_bind_b2WheelJointDef_set_bodyA_1 = function() {
      return (bh = t._emscripten_bind_b2WheelJointDef_set_bodyA_1 = t.asm.bs).apply(null, arguments);
    }, gh = t._emscripten_bind_b2WheelJointDef_get_bodyB_0 = function() {
      return (gh = t._emscripten_bind_b2WheelJointDef_get_bodyB_0 = t.asm.cs).apply(null, arguments);
    }, hh = t._emscripten_bind_b2WheelJointDef_set_bodyB_1 = function() {
      return (hh = t._emscripten_bind_b2WheelJointDef_set_bodyB_1 = t.asm.ds).apply(null, arguments);
    }, Zh = t._emscripten_bind_b2WheelJointDef_get_collideConnected_0 = function() {
      return (Zh = t._emscripten_bind_b2WheelJointDef_get_collideConnected_0 = t.asm.es).apply(null, arguments);
    }, vh = t._emscripten_bind_b2WheelJointDef_set_collideConnected_1 = function() {
      return (vh = t._emscripten_bind_b2WheelJointDef_set_collideConnected_1 = t.asm.fs).apply(null, arguments);
    }, Jh = t._emscripten_bind_b2WheelJointDef___destroy___0 = function() {
      return (Jh = t._emscripten_bind_b2WheelJointDef___destroy___0 = t.asm.gs).apply(null, arguments);
    }, Dh = t._emscripten_bind_b2MotorJoint_SetLinearOffset_1 = function() {
      return (Dh = t._emscripten_bind_b2MotorJoint_SetLinearOffset_1 = t.asm.hs).apply(null, arguments);
    }, jh = t._emscripten_bind_b2MotorJoint_GetLinearOffset_0 = function() {
      return (jh = t._emscripten_bind_b2MotorJoint_GetLinearOffset_0 = t.asm.is).apply(null, arguments);
    }, Sh = t._emscripten_bind_b2MotorJoint_SetAngularOffset_1 = function() {
      return (Sh = t._emscripten_bind_b2MotorJoint_SetAngularOffset_1 = t.asm.js).apply(null, arguments);
    }, Gh = t._emscripten_bind_b2MotorJoint_GetAngularOffset_0 = function() {
      return (Gh = t._emscripten_bind_b2MotorJoint_GetAngularOffset_0 = t.asm.ks).apply(null, arguments);
    }, Ah = t._emscripten_bind_b2MotorJoint_SetMaxForce_1 = function() {
      return (Ah = t._emscripten_bind_b2MotorJoint_SetMaxForce_1 = t.asm.ls).apply(null, arguments);
    }, Ch = t._emscripten_bind_b2MotorJoint_GetMaxForce_0 = function() {
      return (Ch = t._emscripten_bind_b2MotorJoint_GetMaxForce_0 = t.asm.ms).apply(null, arguments);
    }, Ph = t._emscripten_bind_b2MotorJoint_SetMaxTorque_1 = function() {
      return (Ph = t._emscripten_bind_b2MotorJoint_SetMaxTorque_1 = t.asm.ns).apply(null, arguments);
    }, Bh = t._emscripten_bind_b2MotorJoint_GetMaxTorque_0 = function() {
      return (Bh = t._emscripten_bind_b2MotorJoint_GetMaxTorque_0 = t.asm.os).apply(null, arguments);
    }, xh = t._emscripten_bind_b2MotorJoint_SetCorrectionFactor_1 = function() {
      return (xh = t._emscripten_bind_b2MotorJoint_SetCorrectionFactor_1 = t.asm.ps).apply(null, arguments);
    }, Mh = t._emscripten_bind_b2MotorJoint_GetCorrectionFactor_0 = function() {
      return (Mh = t._emscripten_bind_b2MotorJoint_GetCorrectionFactor_0 = t.asm.qs).apply(null, arguments);
    }, wh = t._emscripten_bind_b2MotorJoint_GetType_0 = function() {
      return (wh = t._emscripten_bind_b2MotorJoint_GetType_0 = t.asm.rs).apply(null, arguments);
    }, Rh = t._emscripten_bind_b2MotorJoint_GetBodyA_0 = function() {
      return (Rh = t._emscripten_bind_b2MotorJoint_GetBodyA_0 = t.asm.ss).apply(null, arguments);
    }, Fh = t._emscripten_bind_b2MotorJoint_GetBodyB_0 = function() {
      return (Fh = t._emscripten_bind_b2MotorJoint_GetBodyB_0 = t.asm.ts).apply(null, arguments);
    }, Th = t._emscripten_bind_b2MotorJoint_GetAnchorA_0 = function() {
      return (Th = t._emscripten_bind_b2MotorJoint_GetAnchorA_0 = t.asm.us).apply(null, arguments);
    }, Oh = t._emscripten_bind_b2MotorJoint_GetAnchorB_0 = function() {
      return (Oh = t._emscripten_bind_b2MotorJoint_GetAnchorB_0 = t.asm.vs).apply(null, arguments);
    }, Wh = t._emscripten_bind_b2MotorJoint_GetReactionForce_1 = function() {
      return (Wh = t._emscripten_bind_b2MotorJoint_GetReactionForce_1 = t.asm.ws).apply(null, arguments);
    }, Lh = t._emscripten_bind_b2MotorJoint_GetReactionTorque_1 = function() {
      return (Lh = t._emscripten_bind_b2MotorJoint_GetReactionTorque_1 = t.asm.xs).apply(null, arguments);
    }, Ih = t._emscripten_bind_b2MotorJoint_GetNext_0 = function() {
      return (Ih = t._emscripten_bind_b2MotorJoint_GetNext_0 = t.asm.ys).apply(null, arguments);
    }, qh = t._emscripten_bind_b2MotorJoint_GetUserData_0 = function() {
      return (qh = t._emscripten_bind_b2MotorJoint_GetUserData_0 = t.asm.zs).apply(null, arguments);
    }, kh = t._emscripten_bind_b2MotorJoint_GetCollideConnected_0 = function() {
      return (kh = t._emscripten_bind_b2MotorJoint_GetCollideConnected_0 = t.asm.As).apply(null, arguments);
    }, Eh = t._emscripten_bind_b2MotorJoint___destroy___0 = function() {
      return (Eh = t._emscripten_bind_b2MotorJoint___destroy___0 = t.asm.Bs).apply(null, arguments);
    }, zh = t._emscripten_bind_b2MotorJointDef_b2MotorJointDef_0 = function() {
      return (zh = t._emscripten_bind_b2MotorJointDef_b2MotorJointDef_0 = t.asm.Cs).apply(null, arguments);
    }, Vh = t._emscripten_bind_b2MotorJointDef_Initialize_2 = function() {
      return (Vh = t._emscripten_bind_b2MotorJointDef_Initialize_2 = t.asm.Ds).apply(null, arguments);
    }, Uh = t._emscripten_bind_b2MotorJointDef_get_linearOffset_0 = function() {
      return (Uh = t._emscripten_bind_b2MotorJointDef_get_linearOffset_0 = t.asm.Es).apply(null, arguments);
    }, $h = t._emscripten_bind_b2MotorJointDef_set_linearOffset_1 = function() {
      return ($h = t._emscripten_bind_b2MotorJointDef_set_linearOffset_1 = t.asm.Fs).apply(null, arguments);
    }, Nh = t._emscripten_bind_b2MotorJointDef_get_angularOffset_0 = function() {
      return (Nh = t._emscripten_bind_b2MotorJointDef_get_angularOffset_0 = t.asm.Gs).apply(null, arguments);
    }, Hh = t._emscripten_bind_b2MotorJointDef_set_angularOffset_1 = function() {
      return (Hh = t._emscripten_bind_b2MotorJointDef_set_angularOffset_1 = t.asm.Hs).apply(null, arguments);
    }, Qh = t._emscripten_bind_b2MotorJointDef_get_maxForce_0 = function() {
      return (Qh = t._emscripten_bind_b2MotorJointDef_get_maxForce_0 = t.asm.Is).apply(null, arguments);
    }, Xh = t._emscripten_bind_b2MotorJointDef_set_maxForce_1 = function() {
      return (Xh = t._emscripten_bind_b2MotorJointDef_set_maxForce_1 = t.asm.Js).apply(null, arguments);
    }, Yh = t._emscripten_bind_b2MotorJointDef_get_maxTorque_0 = function() {
      return (Yh = t._emscripten_bind_b2MotorJointDef_get_maxTorque_0 = t.asm.Ks).apply(null, arguments);
    }, Kh = t._emscripten_bind_b2MotorJointDef_set_maxTorque_1 = function() {
      return (Kh = t._emscripten_bind_b2MotorJointDef_set_maxTorque_1 = t.asm.Ls).apply(null, arguments);
    }, tZ = t._emscripten_bind_b2MotorJointDef_get_correctionFactor_0 = function() {
      return (tZ = t._emscripten_bind_b2MotorJointDef_get_correctionFactor_0 = t.asm.Ms).apply(null, arguments);
    }, eZ = t._emscripten_bind_b2MotorJointDef_set_correctionFactor_1 = function() {
      return (eZ = t._emscripten_bind_b2MotorJointDef_set_correctionFactor_1 = t.asm.Ns).apply(null, arguments);
    }, nZ = t._emscripten_bind_b2MotorJointDef_get_type_0 = function() {
      return (nZ = t._emscripten_bind_b2MotorJointDef_get_type_0 = t.asm.Os).apply(null, arguments);
    }, oZ = t._emscripten_bind_b2MotorJointDef_set_type_1 = function() {
      return (oZ = t._emscripten_bind_b2MotorJointDef_set_type_1 = t.asm.Ps).apply(null, arguments);
    }, rZ = t._emscripten_bind_b2MotorJointDef_get_userData_0 = function() {
      return (rZ = t._emscripten_bind_b2MotorJointDef_get_userData_0 = t.asm.Qs).apply(null, arguments);
    }, _Z = t._emscripten_bind_b2MotorJointDef_set_userData_1 = function() {
      return (_Z = t._emscripten_bind_b2MotorJointDef_set_userData_1 = t.asm.Rs).apply(null, arguments);
    }, iZ = t._emscripten_bind_b2MotorJointDef_get_bodyA_0 = function() {
      return (iZ = t._emscripten_bind_b2MotorJointDef_get_bodyA_0 = t.asm.Ss).apply(null, arguments);
    }, pZ = t._emscripten_bind_b2MotorJointDef_set_bodyA_1 = function() {
      return (pZ = t._emscripten_bind_b2MotorJointDef_set_bodyA_1 = t.asm.Ts).apply(null, arguments);
    }, uZ = t._emscripten_bind_b2MotorJointDef_get_bodyB_0 = function() {
      return (uZ = t._emscripten_bind_b2MotorJointDef_get_bodyB_0 = t.asm.Us).apply(null, arguments);
    }, sZ = t._emscripten_bind_b2MotorJointDef_set_bodyB_1 = function() {
      return (sZ = t._emscripten_bind_b2MotorJointDef_set_bodyB_1 = t.asm.Vs).apply(null, arguments);
    }, cZ = t._emscripten_bind_b2MotorJointDef_get_collideConnected_0 = function() {
      return (cZ = t._emscripten_bind_b2MotorJointDef_get_collideConnected_0 = t.asm.Ws).apply(null, arguments);
    }, aZ = t._emscripten_bind_b2MotorJointDef_set_collideConnected_1 = function() {
      return (aZ = t._emscripten_bind_b2MotorJointDef_set_collideConnected_1 = t.asm.Xs).apply(null, arguments);
    }, lZ = t._emscripten_bind_b2MotorJointDef___destroy___0 = function() {
      return (lZ = t._emscripten_bind_b2MotorJointDef___destroy___0 = t.asm.Ys).apply(null, arguments);
    }, yZ = t._emscripten_bind_b2RopeTuning_b2RopeTuning_0 = function() {
      return (yZ = t._emscripten_bind_b2RopeTuning_b2RopeTuning_0 = t.asm.Zs).apply(null, arguments);
    }, mZ = t._emscripten_bind_b2RopeTuning_get_stretchingModel_0 = function() {
      return (mZ = t._emscripten_bind_b2RopeTuning_get_stretchingModel_0 = t.asm._s).apply(null, arguments);
    }, fZ = t._emscripten_bind_b2RopeTuning_set_stretchingModel_1 = function() {
      return (fZ = t._emscripten_bind_b2RopeTuning_set_stretchingModel_1 = t.asm.$s).apply(null, arguments);
    }, dZ = t._emscripten_bind_b2RopeTuning_get_bendingModel_0 = function() {
      return (dZ = t._emscripten_bind_b2RopeTuning_get_bendingModel_0 = t.asm.at).apply(null, arguments);
    }, bZ = t._emscripten_bind_b2RopeTuning_set_bendingModel_1 = function() {
      return (bZ = t._emscripten_bind_b2RopeTuning_set_bendingModel_1 = t.asm.bt).apply(null, arguments);
    }, gZ = t._emscripten_bind_b2RopeTuning_get_damping_0 = function() {
      return (gZ = t._emscripten_bind_b2RopeTuning_get_damping_0 = t.asm.ct).apply(null, arguments);
    }, hZ = t._emscripten_bind_b2RopeTuning_set_damping_1 = function() {
      return (hZ = t._emscripten_bind_b2RopeTuning_set_damping_1 = t.asm.dt).apply(null, arguments);
    }, ZZ = t._emscripten_bind_b2RopeTuning_get_stretchStiffness_0 = function() {
      return (ZZ = t._emscripten_bind_b2RopeTuning_get_stretchStiffness_0 = t.asm.et).apply(null, arguments);
    }, vZ = t._emscripten_bind_b2RopeTuning_set_stretchStiffness_1 = function() {
      return (vZ = t._emscripten_bind_b2RopeTuning_set_stretchStiffness_1 = t.asm.ft).apply(null, arguments);
    }, JZ = t._emscripten_bind_b2RopeTuning_get_stretchHertz_0 = function() {
      return (JZ = t._emscripten_bind_b2RopeTuning_get_stretchHertz_0 = t.asm.gt).apply(null, arguments);
    }, DZ = t._emscripten_bind_b2RopeTuning_set_stretchHertz_1 = function() {
      return (DZ = t._emscripten_bind_b2RopeTuning_set_stretchHertz_1 = t.asm.ht).apply(null, arguments);
    }, jZ = t._emscripten_bind_b2RopeTuning_get_stretchDamping_0 = function() {
      return (jZ = t._emscripten_bind_b2RopeTuning_get_stretchDamping_0 = t.asm.it).apply(null, arguments);
    }, SZ = t._emscripten_bind_b2RopeTuning_set_stretchDamping_1 = function() {
      return (SZ = t._emscripten_bind_b2RopeTuning_set_stretchDamping_1 = t.asm.jt).apply(null, arguments);
    }, GZ = t._emscripten_bind_b2RopeTuning_get_bendStiffness_0 = function() {
      return (GZ = t._emscripten_bind_b2RopeTuning_get_bendStiffness_0 = t.asm.kt).apply(null, arguments);
    }, AZ = t._emscripten_bind_b2RopeTuning_set_bendStiffness_1 = function() {
      return (AZ = t._emscripten_bind_b2RopeTuning_set_bendStiffness_1 = t.asm.lt).apply(null, arguments);
    }, CZ = t._emscripten_bind_b2RopeTuning_get_bendHertz_0 = function() {
      return (CZ = t._emscripten_bind_b2RopeTuning_get_bendHertz_0 = t.asm.mt).apply(null, arguments);
    }, PZ = t._emscripten_bind_b2RopeTuning_set_bendHertz_1 = function() {
      return (PZ = t._emscripten_bind_b2RopeTuning_set_bendHertz_1 = t.asm.nt).apply(null, arguments);
    }, BZ = t._emscripten_bind_b2RopeTuning_get_bendDamping_0 = function() {
      return (BZ = t._emscripten_bind_b2RopeTuning_get_bendDamping_0 = t.asm.ot).apply(null, arguments);
    }, xZ = t._emscripten_bind_b2RopeTuning_set_bendDamping_1 = function() {
      return (xZ = t._emscripten_bind_b2RopeTuning_set_bendDamping_1 = t.asm.pt).apply(null, arguments);
    }, MZ = t._emscripten_bind_b2RopeTuning_get_isometric_0 = function() {
      return (MZ = t._emscripten_bind_b2RopeTuning_get_isometric_0 = t.asm.qt).apply(null, arguments);
    }, wZ = t._emscripten_bind_b2RopeTuning_set_isometric_1 = function() {
      return (wZ = t._emscripten_bind_b2RopeTuning_set_isometric_1 = t.asm.rt).apply(null, arguments);
    }, RZ = t._emscripten_bind_b2RopeTuning_get_fixedEffectiveMass_0 = function() {
      return (RZ = t._emscripten_bind_b2RopeTuning_get_fixedEffectiveMass_0 = t.asm.st).apply(null, arguments);
    }, FZ = t._emscripten_bind_b2RopeTuning_set_fixedEffectiveMass_1 = function() {
      return (FZ = t._emscripten_bind_b2RopeTuning_set_fixedEffectiveMass_1 = t.asm.tt).apply(null, arguments);
    }, TZ = t._emscripten_bind_b2RopeTuning_get_warmStart_0 = function() {
      return (TZ = t._emscripten_bind_b2RopeTuning_get_warmStart_0 = t.asm.ut).apply(null, arguments);
    }, OZ = t._emscripten_bind_b2RopeTuning_set_warmStart_1 = function() {
      return (OZ = t._emscripten_bind_b2RopeTuning_set_warmStart_1 = t.asm.vt).apply(null, arguments);
    }, WZ = t._emscripten_bind_b2RopeTuning___destroy___0 = function() {
      return (WZ = t._emscripten_bind_b2RopeTuning___destroy___0 = t.asm.wt).apply(null, arguments);
    }, LZ = t._emscripten_bind_b2RopeDef_b2RopeDef_0 = function() {
      return (LZ = t._emscripten_bind_b2RopeDef_b2RopeDef_0 = t.asm.xt).apply(null, arguments);
    }, IZ = t._emscripten_bind_b2RopeDef_get_position_0 = function() {
      return (IZ = t._emscripten_bind_b2RopeDef_get_position_0 = t.asm.yt).apply(null, arguments);
    }, qZ = t._emscripten_bind_b2RopeDef_set_position_1 = function() {
      return (qZ = t._emscripten_bind_b2RopeDef_set_position_1 = t.asm.zt).apply(null, arguments);
    }, kZ = t._emscripten_bind_b2RopeDef_get_vertices_0 = function() {
      return (kZ = t._emscripten_bind_b2RopeDef_get_vertices_0 = t.asm.At).apply(null, arguments);
    }, EZ = t._emscripten_bind_b2RopeDef_set_vertices_1 = function() {
      return (EZ = t._emscripten_bind_b2RopeDef_set_vertices_1 = t.asm.Bt).apply(null, arguments);
    }, zZ = t._emscripten_bind_b2RopeDef_get_count_0 = function() {
      return (zZ = t._emscripten_bind_b2RopeDef_get_count_0 = t.asm.Ct).apply(null, arguments);
    }, VZ = t._emscripten_bind_b2RopeDef_set_count_1 = function() {
      return (VZ = t._emscripten_bind_b2RopeDef_set_count_1 = t.asm.Dt).apply(null, arguments);
    }, UZ = t._emscripten_bind_b2RopeDef_get_gravity_0 = function() {
      return (UZ = t._emscripten_bind_b2RopeDef_get_gravity_0 = t.asm.Et).apply(null, arguments);
    }, $Z = t._emscripten_bind_b2RopeDef_set_gravity_1 = function() {
      return ($Z = t._emscripten_bind_b2RopeDef_set_gravity_1 = t.asm.Ft).apply(null, arguments);
    }, NZ = t._emscripten_bind_b2RopeDef_get_tuning_0 = function() {
      return (NZ = t._emscripten_bind_b2RopeDef_get_tuning_0 = t.asm.Gt).apply(null, arguments);
    }, HZ = t._emscripten_bind_b2RopeDef_set_tuning_1 = function() {
      return (HZ = t._emscripten_bind_b2RopeDef_set_tuning_1 = t.asm.Ht).apply(null, arguments);
    }, QZ = t._emscripten_bind_b2RopeDef___destroy___0 = function() {
      return (QZ = t._emscripten_bind_b2RopeDef___destroy___0 = t.asm.It).apply(null, arguments);
    }, XZ = t._emscripten_bind_b2Rope_b2Rope_0 = function() {
      return (XZ = t._emscripten_bind_b2Rope_b2Rope_0 = t.asm.Jt).apply(null, arguments);
    }, YZ = t._emscripten_bind_b2Rope_Create_1 = function() {
      return (YZ = t._emscripten_bind_b2Rope_Create_1 = t.asm.Kt).apply(null, arguments);
    }, KZ = t._emscripten_bind_b2Rope_SetTuning_1 = function() {
      return (KZ = t._emscripten_bind_b2Rope_SetTuning_1 = t.asm.Lt).apply(null, arguments);
    }, tv = t._emscripten_bind_b2Rope_Step_3 = function() {
      return (tv = t._emscripten_bind_b2Rope_Step_3 = t.asm.Mt).apply(null, arguments);
    }, ev = t._emscripten_bind_b2Rope_Reset_1 = function() {
      return (ev = t._emscripten_bind_b2Rope_Reset_1 = t.asm.Nt).apply(null, arguments);
    }, nv = t._emscripten_bind_b2Rope_Draw_1 = function() {
      return (nv = t._emscripten_bind_b2Rope_Draw_1 = t.asm.Ot).apply(null, arguments);
    }, ov = t._emscripten_bind_b2Rope___destroy___0 = function() {
      return (ov = t._emscripten_bind_b2Rope___destroy___0 = t.asm.Pt).apply(null, arguments);
    }, rv = t._emscripten_bind_b2ClipVertex_b2ClipVertex_0 = function() {
      return (rv = t._emscripten_bind_b2ClipVertex_b2ClipVertex_0 = t.asm.Qt).apply(null, arguments);
    }, _v = t._emscripten_bind_b2ClipVertex_get_v_0 = function() {
      return (_v = t._emscripten_bind_b2ClipVertex_get_v_0 = t.asm.Rt).apply(null, arguments);
    }, iv = t._emscripten_bind_b2ClipVertex_set_v_1 = function() {
      return (iv = t._emscripten_bind_b2ClipVertex_set_v_1 = t.asm.St).apply(null, arguments);
    }, pv = t._emscripten_bind_b2ClipVertex_get_id_0 = function() {
      return (pv = t._emscripten_bind_b2ClipVertex_get_id_0 = t.asm.Tt).apply(null, arguments);
    }, uv = t._emscripten_bind_b2ClipVertex_set_id_1 = function() {
      return (uv = t._emscripten_bind_b2ClipVertex_set_id_1 = t.asm.Ut).apply(null, arguments);
    }, sv = t._emscripten_bind_b2ClipVertex___destroy___0 = function() {
      return (sv = t._emscripten_bind_b2ClipVertex___destroy___0 = t.asm.Vt).apply(null, arguments);
    }, cv = t._emscripten_enum_b2ShapeType_e_circle = function() {
      return (cv = t._emscripten_enum_b2ShapeType_e_circle = t.asm.Wt).apply(null, arguments);
    }, av = t._emscripten_enum_b2ShapeType_e_edge = function() {
      return (av = t._emscripten_enum_b2ShapeType_e_edge = t.asm.Xt).apply(null, arguments);
    }, lv = t._emscripten_enum_b2ShapeType_e_polygon = function() {
      return (lv = t._emscripten_enum_b2ShapeType_e_polygon = t.asm.Yt).apply(null, arguments);
    }, yv = t._emscripten_enum_b2ShapeType_e_chain = function() {
      return (yv = t._emscripten_enum_b2ShapeType_e_chain = t.asm.Zt).apply(null, arguments);
    }, mv = t._emscripten_enum_b2ShapeType_e_typeCount = function() {
      return (mv = t._emscripten_enum_b2ShapeType_e_typeCount = t.asm._t).apply(null, arguments);
    }, fv = t._emscripten_enum_b2BodyType_b2_staticBody = function() {
      return (fv = t._emscripten_enum_b2BodyType_b2_staticBody = t.asm.$t).apply(null, arguments);
    }, dv = t._emscripten_enum_b2BodyType_b2_kinematicBody = function() {
      return (dv = t._emscripten_enum_b2BodyType_b2_kinematicBody = t.asm.au).apply(null, arguments);
    }, bv = t._emscripten_enum_b2BodyType_b2_dynamicBody = function() {
      return (bv = t._emscripten_enum_b2BodyType_b2_dynamicBody = t.asm.bu).apply(null, arguments);
    }, gv = t._emscripten_enum_b2JointType_e_unknownJoint = function() {
      return (gv = t._emscripten_enum_b2JointType_e_unknownJoint = t.asm.cu).apply(null, arguments);
    }, hv = t._emscripten_enum_b2JointType_e_revoluteJoint = function() {
      return (hv = t._emscripten_enum_b2JointType_e_revoluteJoint = t.asm.du).apply(null, arguments);
    }, Zv = t._emscripten_enum_b2JointType_e_prismaticJoint = function() {
      return (Zv = t._emscripten_enum_b2JointType_e_prismaticJoint = t.asm.eu).apply(null, arguments);
    }, vv = t._emscripten_enum_b2JointType_e_distanceJoint = function() {
      return (vv = t._emscripten_enum_b2JointType_e_distanceJoint = t.asm.fu).apply(null, arguments);
    }, Jv = t._emscripten_enum_b2JointType_e_pulleyJoint = function() {
      return (Jv = t._emscripten_enum_b2JointType_e_pulleyJoint = t.asm.gu).apply(null, arguments);
    }, Dv = t._emscripten_enum_b2JointType_e_mouseJoint = function() {
      return (Dv = t._emscripten_enum_b2JointType_e_mouseJoint = t.asm.hu).apply(null, arguments);
    }, jv = t._emscripten_enum_b2JointType_e_gearJoint = function() {
      return (jv = t._emscripten_enum_b2JointType_e_gearJoint = t.asm.iu).apply(null, arguments);
    }, Sv = t._emscripten_enum_b2JointType_e_wheelJoint = function() {
      return (Sv = t._emscripten_enum_b2JointType_e_wheelJoint = t.asm.ju).apply(null, arguments);
    }, Gv = t._emscripten_enum_b2JointType_e_weldJoint = function() {
      return (Gv = t._emscripten_enum_b2JointType_e_weldJoint = t.asm.ku).apply(null, arguments);
    }, Av = t._emscripten_enum_b2JointType_e_frictionJoint = function() {
      return (Av = t._emscripten_enum_b2JointType_e_frictionJoint = t.asm.lu).apply(null, arguments);
    }, Cv = t._emscripten_enum_b2JointType_e_ropeJoint = function() {
      return (Cv = t._emscripten_enum_b2JointType_e_ropeJoint = t.asm.mu).apply(null, arguments);
    }, Pv = t._emscripten_enum_b2JointType_e_motorJoint = function() {
      return (Pv = t._emscripten_enum_b2JointType_e_motorJoint = t.asm.nu).apply(null, arguments);
    }, Bv = t._emscripten_enum_b2ContactFeatureType_e_vertex = function() {
      return (Bv = t._emscripten_enum_b2ContactFeatureType_e_vertex = t.asm.ou).apply(null, arguments);
    }, xv = t._emscripten_enum_b2ContactFeatureType_e_face = function() {
      return (xv = t._emscripten_enum_b2ContactFeatureType_e_face = t.asm.pu).apply(null, arguments);
    }, Mv = t._emscripten_enum_b2DrawFlag_e_shapeBit = function() {
      return (Mv = t._emscripten_enum_b2DrawFlag_e_shapeBit = t.asm.qu).apply(null, arguments);
    }, wv = t._emscripten_enum_b2DrawFlag_e_jointBit = function() {
      return (wv = t._emscripten_enum_b2DrawFlag_e_jointBit = t.asm.ru).apply(null, arguments);
    }, Rv = t._emscripten_enum_b2DrawFlag_e_aabbBit = function() {
      return (Rv = t._emscripten_enum_b2DrawFlag_e_aabbBit = t.asm.su).apply(null, arguments);
    }, Fv = t._emscripten_enum_b2DrawFlag_e_pairBit = function() {
      return (Fv = t._emscripten_enum_b2DrawFlag_e_pairBit = t.asm.tu).apply(null, arguments);
    }, Tv = t._emscripten_enum_b2DrawFlag_e_centerOfMassBit = function() {
      return (Tv = t._emscripten_enum_b2DrawFlag_e_centerOfMassBit = t.asm.uu).apply(null, arguments);
    }, Ov = t._emscripten_enum_b2ManifoldType_e_circles = function() {
      return (Ov = t._emscripten_enum_b2ManifoldType_e_circles = t.asm.vu).apply(null, arguments);
    }, Wv = t._emscripten_enum_b2ManifoldType_e_faceA = function() {
      return (Wv = t._emscripten_enum_b2ManifoldType_e_faceA = t.asm.wu).apply(null, arguments);
    }, Lv = t._emscripten_enum_b2ManifoldType_e_faceB = function() {
      return (Lv = t._emscripten_enum_b2ManifoldType_e_faceB = t.asm.xu).apply(null, arguments);
    }, Iv = t._emscripten_enum_b2PointState_b2_nullState = function() {
      return (Iv = t._emscripten_enum_b2PointState_b2_nullState = t.asm.yu).apply(null, arguments);
    }, qv = t._emscripten_enum_b2PointState_b2_addState = function() {
      return (qv = t._emscripten_enum_b2PointState_b2_addState = t.asm.zu).apply(null, arguments);
    }, kv = t._emscripten_enum_b2PointState_b2_persistState = function() {
      return (kv = t._emscripten_enum_b2PointState_b2_persistState = t.asm.Au).apply(null, arguments);
    }, Ev = t._emscripten_enum_b2PointState_b2_removeState = function() {
      return (Ev = t._emscripten_enum_b2PointState_b2_removeState = t.asm.Bu).apply(null, arguments);
    }, zv = t._emscripten_enum_b2StretchingModel_b2_pbdStretchingModel = function() {
      return (zv = t._emscripten_enum_b2StretchingModel_b2_pbdStretchingModel = t.asm.Cu).apply(null, arguments);
    }, Vv = t._emscripten_enum_b2StretchingModel_b2_xpbdStretchingModel = function() {
      return (Vv = t._emscripten_enum_b2StretchingModel_b2_xpbdStretchingModel = t.asm.Du).apply(null, arguments);
    }, Uv = t._emscripten_enum_b2BendingModel_b2_springAngleBendingModel = function() {
      return (Uv = t._emscripten_enum_b2BendingModel_b2_springAngleBendingModel = t.asm.Eu).apply(null, arguments);
    }, $v = t._emscripten_enum_b2BendingModel_b2_pbdAngleBendingModel = function() {
      return ($v = t._emscripten_enum_b2BendingModel_b2_pbdAngleBendingModel = t.asm.Fu).apply(null, arguments);
    }, Nv = t._emscripten_enum_b2BendingModel_b2_xpbdAngleBendingModel = function() {
      return (Nv = t._emscripten_enum_b2BendingModel_b2_xpbdAngleBendingModel = t.asm.Gu).apply(null, arguments);
    }, Hv = t._emscripten_enum_b2BendingModel_b2_pbdDistanceBendingModel = function() {
      return (Hv = t._emscripten_enum_b2BendingModel_b2_pbdDistanceBendingModel = t.asm.Hu).apply(null, arguments);
    }, Qv = t._emscripten_enum_b2BendingModel_b2_pbdHeightBendingModel = function() {
      return (Qv = t._emscripten_enum_b2BendingModel_b2_pbdHeightBendingModel = t.asm.Iu).apply(null, arguments);
    }, Xv = t._emscripten_bind_b2RopeDef_get_masses_0 = function() {
      return (Xv = t._emscripten_bind_b2RopeDef_get_masses_0 = t.asm.Ju).apply(null, arguments);
    }, Yv = t._emscripten_bind_b2RopeDef_set_masses_1 = function() {
      return (Yv = t._emscripten_bind_b2RopeDef_set_masses_1 = t.asm.Ku).apply(null, arguments);
    }, Kv = t._emscripten_bind_b2GetPointStates_4 = function() {
      return (Kv = t._emscripten_bind_b2GetPointStates_4 = t.asm.Lu).apply(null, arguments);
    }, tJ = t._emscripten_bind_b2CollideCircles_5 = function() {
      return (tJ = t._emscripten_bind_b2CollideCircles_5 = t.asm.Mu).apply(null, arguments);
    }, eJ = t._emscripten_bind_b2CollidePolygonAndCircle_5 = function() {
      return (eJ = t._emscripten_bind_b2CollidePolygonAndCircle_5 = t.asm.Nu).apply(null, arguments);
    }, nJ = t._emscripten_bind_b2CollidePolygons_5 = function() {
      return (nJ = t._emscripten_bind_b2CollidePolygons_5 = t.asm.Ou).apply(null, arguments);
    }, oJ = t._emscripten_bind_b2CollideEdgeAndCircle_5 = function() {
      return (oJ = t._emscripten_bind_b2CollideEdgeAndCircle_5 = t.asm.Pu).apply(null, arguments);
    }, rJ = t._emscripten_bind_b2CollideEdgeAndPolygon_5 = function() {
      return (rJ = t._emscripten_bind_b2CollideEdgeAndPolygon_5 = t.asm.Qu).apply(null, arguments);
    }, _J = t._emscripten_bind_b2ClipSegmentToLine_5 = function() {
      return (_J = t._emscripten_bind_b2ClipSegmentToLine_5 = t.asm.Ru).apply(null, arguments);
    }, iJ = t._emscripten_bind_b2TestOverlap_6 = function() {
      return (iJ = t._emscripten_bind_b2TestOverlap_6 = t.asm.Su).apply(null, arguments);
    }, pJ = t._emscripten_bind_b2TestOverlap_2 = function() {
      return (pJ = t._emscripten_bind_b2TestOverlap_2 = t.asm.Tu).apply(null, arguments);
    }, uJ = t._emscripten_bind_b2LinearStiffness_6 = function() {
      return (uJ = t._emscripten_bind_b2LinearStiffness_6 = t.asm.Uu).apply(null, arguments);
    }, sJ = t._emscripten_bind_b2AngularStiffness_6 = function() {
      return (sJ = t._emscripten_bind_b2AngularStiffness_6 = t.asm.Vu).apply(null, arguments);
    };
    t._malloc = function() {
      return (t._malloc = t.asm.Xu).apply(null, arguments);
    }, t._free = function() {
      return (t._free = t.asm.Yu).apply(null, arguments);
    };
    var te;
    Ht = function e() {
      te || se(), te || (Ht = e);
    };
    function se() {
      function e() {
        if (!te && (te = true, t.calledRun = true, !de)) {
          if (Se = true, pe(ie), me(t), t.onRuntimeInitialized && t.onRuntimeInitialized(), t.postRun) for (typeof t.postRun == "function" && (t.postRun = [t.postRun]); t.postRun.length; ) {
            var n = t.postRun.shift();
            je.unshift(n);
          }
          pe(je);
        }
      }
      if (!(0 < Ot)) {
        if (t.preRun) for (typeof t.preRun == "function" && (t.preRun = [t.preRun]); t.preRun.length; ) yJ();
        pe(De), 0 < Ot || (t.setStatus ? (t.setStatus("Running..."), setTimeout(function() {
          setTimeout(function() {
            t.setStatus("");
          }, 1), e();
        }, 1)) : e());
      }
    }
    if (t.run = se, t.preInit) for (typeof t.preInit == "function" && (t.preInit = [t.preInit]); 0 < t.preInit.length; ) t.preInit.pop()();
    se();
    function G() {
    }
    G.prototype = Object.create(G.prototype), G.prototype.constructor = G, G.prototype.$u = G, G.av = {}, t.WrapperObject = G;
    function B(e) {
      return (e || G).av;
    }
    t.getCache = B;
    function r(e, n) {
      var o = B(n), _ = o[e];
      return _ || (_ = Object.create((n || G).prototype), _.Zu = e, o[e] = _);
    }
    t.wrapPointer = r, t.castObject = function(e, n) {
      return r(e.Zu, n);
    }, t.NULL = r(0), t.destroy = function(e) {
      if (!e.__destroy__) throw "Error: Cannot destroy object. (Did you create it yourself?)";
      e.__destroy__(), delete B(e.$u)[e.Zu];
    }, t.compare = function(e, n) {
      return e.Zu === n.Zu;
    }, t.getPointer = function(e) {
      return e.Zu;
    }, t.getClass = function(e) {
      return e.$u;
    };
    var cJ = 0, aJ = 0;
    function Lt() {
      cJ || (aJ += 128, (cJ = t._malloc(aJ)) || Wt("Assertion failed: undefined"));
    }
    function At() {
      throw "cannot construct a b2ContactListener, no constructor in IDL";
    }
    At.prototype = Object.create(G.prototype), At.prototype.constructor = At, At.prototype.$u = At, At.av = {}, t.b2ContactListener = At, At.prototype.__destroy__ = At.prototype.bv = function() {
      Me(this.Zu);
    };
    function $() {
      throw "cannot construct a b2Shape, no constructor in IDL";
    }
    $.prototype = Object.create(G.prototype), $.prototype.constructor = $, $.prototype.$u = $, $.av = {}, t.b2Shape = $, $.prototype.GetType = function() {
      return we(this.Zu);
    }, $.prototype.GetChildCount = function() {
      return Re(this.Zu);
    }, $.prototype.TestPoint = function(e, n) {
      var o = this.Zu;
      return e && typeof e == "object" && (e = e.Zu), n && typeof n == "object" && (n = n.Zu), !!Fe(o, e, n);
    }, $.prototype.RayCast = function(e, n, o, _) {
      var l = this.Zu;
      return e && typeof e == "object" && (e = e.Zu), n && typeof n == "object" && (n = n.Zu), o && typeof o == "object" && (o = o.Zu), _ && typeof _ == "object" && (_ = _.Zu), !!Te(l, e, n, o, _);
    }, $.prototype.ComputeAABB = function(e, n, o) {
      var _ = this.Zu;
      e && typeof e == "object" && (e = e.Zu), n && typeof n == "object" && (n = n.Zu), o && typeof o == "object" && (o = o.Zu), Oe(_, e, n, o);
    }, $.prototype.ComputeMass = function(e, n) {
      var o = this.Zu;
      e && typeof e == "object" && (e = e.Zu), n && typeof n == "object" && (n = n.Zu), We(o, e, n);
    }, $.prototype.get_m_type = $.prototype.tv = function() {
      return Le(this.Zu);
    }, $.prototype.set_m_type = $.prototype.wv = function(e) {
      var n = this.Zu;
      e && typeof e == "object" && (e = e.Zu), Ie(n, e);
    }, Object.defineProperty($.prototype, "m_type", { get: $.prototype.tv, set: $.prototype.wv }), $.prototype.get_m_radius = $.prototype.sv = function() {
      return qe(this.Zu);
    }, $.prototype.set_m_radius = $.prototype.vv = function(e) {
      var n = this.Zu;
      e && typeof e == "object" && (e = e.Zu), ke(n, e);
    }, Object.defineProperty($.prototype, "m_radius", { get: $.prototype.sv, set: $.prototype.vv }), $.prototype.__destroy__ = $.prototype.bv = function() {
      Ee(this.Zu);
    };
    function Ct() {
      throw "cannot construct a b2RayCastCallback, no constructor in IDL";
    }
    Ct.prototype = Object.create(G.prototype), Ct.prototype.constructor = Ct, Ct.prototype.$u = Ct, Ct.av = {}, t.b2RayCastCallback = Ct, Ct.prototype.__destroy__ = Ct.prototype.bv = function() {
      ze(this.Zu);
    };
    function Pt() {
      throw "cannot construct a b2QueryCallback, no constructor in IDL";
    }
    Pt.prototype = Object.create(G.prototype), Pt.prototype.constructor = Pt, Pt.prototype.$u = Pt, Pt.av = {}, t.b2QueryCallback = Pt, Pt.prototype.__destroy__ = Pt.prototype.bv = function() {
      Ve(this.Zu);
    };
    function A() {
      this.Zu = Ue(), B(A)[this.Zu] = this;
    }
    A.prototype = Object.create(G.prototype), A.prototype.constructor = A, A.prototype.$u = A, A.av = {}, t.b2JointDef = A, A.prototype.get_type = A.prototype.cv = function() {
      return $e(this.Zu);
    }, A.prototype.set_type = A.prototype.ev = function(e) {
      var n = this.Zu;
      e && typeof e == "object" && (e = e.Zu), Ne(n, e);
    }, Object.defineProperty(A.prototype, "type", { get: A.prototype.cv, set: A.prototype.ev }), A.prototype.get_userData = A.prototype.dv = function() {
      return r(He(this.Zu), I);
    }, A.prototype.set_userData = A.prototype.fv = function(e) {
      var n = this.Zu;
      e && typeof e == "object" && (e = e.Zu), Qe(n, e);
    }, Object.defineProperty(A.prototype, "userData", { get: A.prototype.dv, set: A.prototype.fv }), A.prototype.get_bodyA = A.prototype.gv = function() {
      return r(Xe(this.Zu), s);
    }, A.prototype.set_bodyA = A.prototype.kv = function(e) {
      var n = this.Zu;
      e && typeof e == "object" && (e = e.Zu), Ye(n, e);
    }, Object.defineProperty(A.prototype, "bodyA", { get: A.prototype.gv, set: A.prototype.kv }), A.prototype.get_bodyB = A.prototype.hv = function() {
      return r(Ke(this.Zu), s);
    }, A.prototype.set_bodyB = A.prototype.lv = function(e) {
      var n = this.Zu;
      e && typeof e == "object" && (e = e.Zu), tn(n, e);
    }, Object.defineProperty(A.prototype, "bodyB", { get: A.prototype.hv, set: A.prototype.lv }), A.prototype.get_collideConnected = A.prototype.jv = function() {
      return !!en(this.Zu);
    }, A.prototype.set_collideConnected = A.prototype.mv = function(e) {
      var n = this.Zu;
      e && typeof e == "object" && (e = e.Zu), nn(n, e);
    }, Object.defineProperty(A.prototype, "collideConnected", { get: A.prototype.jv, set: A.prototype.mv }), A.prototype.__destroy__ = A.prototype.bv = function() {
      on(this.Zu);
    };
    function x() {
      throw "cannot construct a b2Joint, no constructor in IDL";
    }
    x.prototype = Object.create(G.prototype), x.prototype.constructor = x, x.prototype.$u = x, x.av = {}, t.b2Joint = x, x.prototype.GetType = function() {
      return rn(this.Zu);
    }, x.prototype.GetBodyA = function() {
      return r(_n(this.Zu), s);
    }, x.prototype.GetBodyB = function() {
      return r(pn(this.Zu), s);
    }, x.prototype.GetAnchorA = function() {
      return r(un(this.Zu), i);
    }, x.prototype.GetAnchorB = function() {
      return r(sn(this.Zu), i);
    }, x.prototype.GetReactionForce = function(e) {
      var n = this.Zu;
      return e && typeof e == "object" && (e = e.Zu), r(cn(n, e), i);
    }, x.prototype.GetReactionTorque = function(e) {
      var n = this.Zu;
      return e && typeof e == "object" && (e = e.Zu), an(n, e);
    }, x.prototype.GetNext = function() {
      return r(ln(this.Zu), x);
    }, x.prototype.GetUserData = function() {
      return r(yn(this.Zu), I);
    }, x.prototype.GetCollideConnected = function() {
      return !!mn(this.Zu);
    }, x.prototype.Dump = function() {
      fn(this.Zu);
    };
    function Bt() {
      throw "cannot construct a b2ContactFilter, no constructor in IDL";
    }
    Bt.prototype = Object.create(G.prototype), Bt.prototype.constructor = Bt, Bt.prototype.$u = Bt, Bt.av = {}, t.b2ContactFilter = Bt, Bt.prototype.__destroy__ = Bt.prototype.bv = function() {
      dn(this.Zu);
    };
    function xt() {
      throw "cannot construct a b2DestructionListenerWrapper, no constructor in IDL";
    }
    xt.prototype = Object.create(G.prototype), xt.prototype.constructor = xt, xt.prototype.$u = xt, xt.av = {}, t.b2DestructionListenerWrapper = xt, xt.prototype.__destroy__ = xt.prototype.bv = function() {
      bn(this.Zu);
    };
    function ht() {
      throw "cannot construct a b2Draw, no constructor in IDL";
    }
    ht.prototype = Object.create(G.prototype), ht.prototype.constructor = ht, ht.prototype.$u = ht, ht.av = {}, t.b2Draw = ht, ht.prototype.SetFlags = function(e) {
      var n = this.Zu;
      e && typeof e == "object" && (e = e.Zu), gn(n, e);
    }, ht.prototype.GetFlags = function() {
      return hn(this.Zu);
    }, ht.prototype.AppendFlags = function(e) {
      var n = this.Zu;
      e && typeof e == "object" && (e = e.Zu), Zn(n, e);
    }, ht.prototype.ClearFlags = function(e) {
      var n = this.Zu;
      e && typeof e == "object" && (e = e.Zu), vn(n, e);
    }, ht.prototype.__destroy__ = ht.prototype.bv = function() {
      Jn(this.Zu);
    };
    function wt() {
      throw "cannot construct a VoidPtr, no constructor in IDL";
    }
    wt.prototype = Object.create(G.prototype), wt.prototype.constructor = wt, wt.prototype.$u = wt, wt.av = {}, t.VoidPtr = wt, wt.prototype.__destroy__ = wt.prototype.bv = function() {
      Dn(this.Zu);
    };
    function K() {
      throw "cannot construct a b2Contact, no constructor in IDL";
    }
    K.prototype = Object.create(G.prototype), K.prototype.constructor = K, K.prototype.$u = K, K.av = {}, t.b2Contact = K, K.prototype.GetManifold = function() {
      return r(jn(this.Zu), M);
    }, K.prototype.GetWorldManifold = function(e) {
      var n = this.Zu;
      e && typeof e == "object" && (e = e.Zu), Sn(n, e);
    }, K.prototype.IsTouching = function() {
      return !!Gn(this.Zu);
    }, K.prototype.SetEnabled = function(e) {
      var n = this.Zu;
      e && typeof e == "object" && (e = e.Zu), An(n, e);
    }, K.prototype.IsEnabled = function() {
      return !!Cn(this.Zu);
    }, K.prototype.GetNext = function() {
      return r(Pn(this.Zu), K);
    }, K.prototype.GetFixtureA = function() {
      return r(Bn(this.Zu), L);
    }, K.prototype.GetChildIndexA = function() {
      return xn(this.Zu);
    }, K.prototype.GetFixtureB = function() {
      return r(Mn(this.Zu), L);
    }, K.prototype.GetChildIndexB = function() {
      return wn(this.Zu);
    }, K.prototype.SetFriction = function(e) {
      var n = this.Zu;
      e && typeof e == "object" && (e = e.Zu), Rn(n, e);
    }, K.prototype.GetFriction = function() {
      return Fn(this.Zu);
    }, K.prototype.ResetFriction = function() {
      Tn(this.Zu);
    }, K.prototype.SetRestitution = function(e) {
      var n = this.Zu;
      e && typeof e == "object" && (e = e.Zu), On(n, e);
    }, K.prototype.GetRestitution = function() {
      return Wn(this.Zu);
    }, K.prototype.ResetRestitution = function() {
      Ln(this.Zu);
    }, K.prototype.SetRestitutionThreshold = function(e) {
      var n = this.Zu;
      e && typeof e == "object" && (e = e.Zu), In(n, e);
    }, K.prototype.GetRestitutionThreshold = function() {
      return qn(this.Zu);
    }, K.prototype.ResetRestitutionThreshold = function() {
      kn(this.Zu);
    }, K.prototype.SetTangentSpeed = function(e) {
      var n = this.Zu;
      e && typeof e == "object" && (e = e.Zu), En(n, e);
    }, K.prototype.GetTangentSpeed = function() {
      return zn(this.Zu);
    };
    function Zt() {
      this.Zu = Vn(), B(Zt)[this.Zu] = this;
    }
    Zt.prototype = Object.create(At.prototype), Zt.prototype.constructor = Zt, Zt.prototype.$u = Zt, Zt.av = {}, t.JSContactListener = Zt, Zt.prototype.BeginContact = function(e) {
      var n = this.Zu;
      e && typeof e == "object" && (e = e.Zu), Un(n, e);
    }, Zt.prototype.EndContact = function(e) {
      var n = this.Zu;
      e && typeof e == "object" && (e = e.Zu), $n(n, e);
    }, Zt.prototype.PreSolve = function(e, n) {
      var o = this.Zu;
      e && typeof e == "object" && (e = e.Zu), n && typeof n == "object" && (n = n.Zu), Nn(o, e, n);
    }, Zt.prototype.PostSolve = function(e, n) {
      var o = this.Zu;
      e && typeof e == "object" && (e = e.Zu), n && typeof n == "object" && (n = n.Zu), Hn(o, e, n);
    }, Zt.prototype.__destroy__ = Zt.prototype.bv = function() {
      Qn(this.Zu);
    };
    function P(e) {
      e && typeof e == "object" && (e = e.Zu), this.Zu = Xn(e), B(P)[this.Zu] = this;
    }
    P.prototype = Object.create(G.prototype), P.prototype.constructor = P, P.prototype.$u = P, P.av = {}, t.b2World = P, P.prototype.SetDestructionListener = function(e) {
      var n = this.Zu;
      e && typeof e == "object" && (e = e.Zu), Yn(n, e);
    }, P.prototype.SetContactFilter = function(e) {
      var n = this.Zu;
      e && typeof e == "object" && (e = e.Zu), Kn(n, e);
    }, P.prototype.SetContactListener = function(e) {
      var n = this.Zu;
      e && typeof e == "object" && (e = e.Zu), to(n, e);
    }, P.prototype.SetDebugDraw = function(e) {
      var n = this.Zu;
      e && typeof e == "object" && (e = e.Zu), eo(n, e);
    }, P.prototype.CreateBody = function(e) {
      var n = this.Zu;
      return e && typeof e == "object" && (e = e.Zu), r(no(n, e), s);
    }, P.prototype.DestroyBody = function(e) {
      var n = this.Zu;
      e && typeof e == "object" && (e = e.Zu), oo(n, e);
    }, P.prototype.CreateJoint = function(e) {
      var n = this.Zu;
      return e && typeof e == "object" && (e = e.Zu), r(ro(n, e), x);
    }, P.prototype.DestroyJoint = function(e) {
      var n = this.Zu;
      e && typeof e == "object" && (e = e.Zu), _o(n, e);
    }, P.prototype.Step = function(e, n, o) {
      var _ = this.Zu;
      e && typeof e == "object" && (e = e.Zu), n && typeof n == "object" && (n = n.Zu), o && typeof o == "object" && (o = o.Zu), io(_, e, n, o);
    }, P.prototype.ClearForces = function() {
      po(this.Zu);
    }, P.prototype.DebugDraw = function() {
      uo(this.Zu);
    }, P.prototype.QueryAABB = function(e, n) {
      var o = this.Zu;
      e && typeof e == "object" && (e = e.Zu), n && typeof n == "object" && (n = n.Zu), so(o, e, n);
    }, P.prototype.RayCast = function(e, n, o) {
      var _ = this.Zu;
      e && typeof e == "object" && (e = e.Zu), n && typeof n == "object" && (n = n.Zu), o && typeof o == "object" && (o = o.Zu), co(_, e, n, o);
    }, P.prototype.GetBodyList = function() {
      return r(ao(this.Zu), s);
    }, P.prototype.GetJointList = function() {
      return r(lo(this.Zu), x);
    }, P.prototype.GetContactList = function() {
      return r(yo(this.Zu), K);
    }, P.prototype.SetAllowSleeping = function(e) {
      var n = this.Zu;
      e && typeof e == "object" && (e = e.Zu), mo(n, e);
    }, P.prototype.GetAllowSleeping = function() {
      return !!fo(this.Zu);
    }, P.prototype.SetWarmStarting = function(e) {
      var n = this.Zu;
      e && typeof e == "object" && (e = e.Zu), bo(n, e);
    }, P.prototype.GetWarmStarting = function() {
      return !!go(this.Zu);
    }, P.prototype.SetContinuousPhysics = function(e) {
      var n = this.Zu;
      e && typeof e == "object" && (e = e.Zu), ho(n, e);
    }, P.prototype.GetContinuousPhysics = function() {
      return !!Zo(this.Zu);
    }, P.prototype.SetSubStepping = function(e) {
      var n = this.Zu;
      e && typeof e == "object" && (e = e.Zu), vo(n, e);
    }, P.prototype.GetSubStepping = function() {
      return !!Jo(this.Zu);
    }, P.prototype.GetProxyCount = function() {
      return Do(this.Zu);
    }, P.prototype.GetBodyCount = function() {
      return jo(this.Zu);
    }, P.prototype.GetJointCount = function() {
      return So(this.Zu);
    }, P.prototype.GetContactCount = function() {
      return Go(this.Zu);
    }, P.prototype.GetTreeHeight = function() {
      return Ao(this.Zu);
    }, P.prototype.GetTreeBalance = function() {
      return Co(this.Zu);
    }, P.prototype.GetTreeQuality = function() {
      return Po(this.Zu);
    }, P.prototype.SetGravity = function(e) {
      var n = this.Zu;
      e && typeof e == "object" && (e = e.Zu), Bo(n, e);
    }, P.prototype.GetGravity = function() {
      return r(xo(this.Zu), i);
    }, P.prototype.IsLocked = function() {
      return !!Mo(this.Zu);
    }, P.prototype.SetAutoClearForces = function(e) {
      var n = this.Zu;
      e && typeof e == "object" && (e = e.Zu), wo(n, e);
    }, P.prototype.GetAutoClearForces = function() {
      return !!Ro(this.Zu);
    }, P.prototype.GetProfile = function() {
      return r(Fo(this.Zu), D);
    }, P.prototype.Dump = function() {
      To(this.Zu);
    }, P.prototype.__destroy__ = P.prototype.bv = function() {
      Oo(this.Zu);
    };
    function ft() {
      throw "cannot construct a b2FixtureUserData, no constructor in IDL";
    }
    ft.prototype = Object.create(G.prototype), ft.prototype.constructor = ft, ft.prototype.$u = ft, ft.av = {}, t.b2FixtureUserData = ft, ft.prototype.get_pointer = ft.prototype.Dv = function() {
      return Wo(this.Zu);
    }, ft.prototype.set_pointer = ft.prototype.Jv = function(e) {
      var n = this.Zu;
      e && typeof e == "object" && (e = e.Zu), Lo(n, e);
    }, Object.defineProperty(ft.prototype, "pointer", { get: ft.prototype.Dv, set: ft.prototype.Jv }), ft.prototype.__destroy__ = ft.prototype.bv = function() {
      Io(this.Zu);
    };
    function v() {
      this.Zu = qo(), B(v)[this.Zu] = this;
    }
    v.prototype = Object.create(G.prototype), v.prototype.constructor = v, v.prototype.$u = v, v.av = {}, t.b2FixtureDef = v, v.prototype.get_shape = v.prototype.dy = function() {
      return r(ko(this.Zu), $);
    }, v.prototype.set_shape = v.prototype.cA = function(e) {
      var n = this.Zu;
      e && typeof e == "object" && (e = e.Zu), Eo(n, e);
    }, Object.defineProperty(v.prototype, "shape", { get: v.prototype.dy, set: v.prototype.cA }), v.prototype.get_userData = v.prototype.dv = function() {
      return r(zo(this.Zu), ft);
    }, v.prototype.set_userData = v.prototype.fv = function(e) {
      var n = this.Zu;
      e && typeof e == "object" && (e = e.Zu), Vo(n, e);
    }, Object.defineProperty(v.prototype, "userData", { get: v.prototype.dv, set: v.prototype.fv }), v.prototype.get_friction = v.prototype.dx = function() {
      return Uo(this.Zu);
    }, v.prototype.set_friction = v.prototype.bz = function(e) {
      var n = this.Zu;
      e && typeof e == "object" && (e = e.Zu), $o(n, e);
    }, Object.defineProperty(v.prototype, "friction", { get: v.prototype.dx, set: v.prototype.bz }), v.prototype.get_restitution = v.prototype.$x = function() {
      return No(this.Zu);
    }, v.prototype.set_restitution = v.prototype.Zz = function(e) {
      var n = this.Zu;
      e && typeof e == "object" && (e = e.Zu), Ho(n, e);
    }, Object.defineProperty(v.prototype, "restitution", { get: v.prototype.$x, set: v.prototype.Zz }), v.prototype.get_restitutionThreshold = v.prototype.ay = function() {
      return Qo(this.Zu);
    }, v.prototype.set_restitutionThreshold = v.prototype.$z = function(e) {
      var n = this.Zu;
      e && typeof e == "object" && (e = e.Zu), Xo(n, e);
    }, Object.defineProperty(v.prototype, "restitutionThreshold", { get: v.prototype.ay, set: v.prototype.$z }), v.prototype.get_density = v.prototype.Xw = function() {
      return Yo(this.Zu);
    }, v.prototype.set_density = v.prototype.Vy = function(e) {
      var n = this.Zu;
      e && typeof e == "object" && (e = e.Zu), Ko(n, e);
    }, Object.defineProperty(v.prototype, "density", { get: v.prototype.Xw, set: v.prototype.Vy }), v.prototype.get_isSensor = v.prototype.mx = function() {
      return !!tr(this.Zu);
    }, v.prototype.set_isSensor = v.prototype.kz = function(e) {
      var n = this.Zu;
      e && typeof e == "object" && (e = e.Zu), er(n, e);
    }, Object.defineProperty(v.prototype, "isSensor", { get: v.prototype.mx, set: v.prototype.kz }), v.prototype.get_filter = v.prototype.$w = function() {
      return r(nr(this.Zu), N);
    }, v.prototype.set_filter = v.prototype.Yy = function(e) {
      var n = this.Zu;
      e && typeof e == "object" && (e = e.Zu), or(n, e);
    }, Object.defineProperty(v.prototype, "filter", { get: v.prototype.$w, set: v.prototype.Yy }), v.prototype.__destroy__ = v.prototype.bv = function() {
      rr(this.Zu);
    };
    function L() {
      throw "cannot construct a b2Fixture, no constructor in IDL";
    }
    L.prototype = Object.create(G.prototype), L.prototype.constructor = L, L.prototype.$u = L, L.av = {}, t.b2Fixture = L, L.prototype.GetType = function() {
      return _r(this.Zu);
    }, L.prototype.GetShape = function() {
      return r(ir(this.Zu), $);
    }, L.prototype.SetSensor = function(e) {
      var n = this.Zu;
      e && typeof e == "object" && (e = e.Zu), pr(n, e);
    }, L.prototype.IsSensor = function() {
      return !!ur(this.Zu);
    }, L.prototype.SetFilterData = function(e) {
      var n = this.Zu;
      e && typeof e == "object" && (e = e.Zu), sr(n, e);
    }, L.prototype.GetFilterData = function() {
      return r(cr(this.Zu), N);
    }, L.prototype.Refilter = function() {
      ar(this.Zu);
    }, L.prototype.GetBody = function() {
      return r(lr(this.Zu), s);
    }, L.prototype.GetNext = function() {
      return r(yr(this.Zu), L);
    }, L.prototype.GetUserData = function() {
      return r(mr(this.Zu), ft);
    }, L.prototype.TestPoint = function(e) {
      var n = this.Zu;
      return e && typeof e == "object" && (e = e.Zu), !!fr(n, e);
    }, L.prototype.RayCast = function(e, n, o) {
      var _ = this.Zu;
      return e && typeof e == "object" && (e = e.Zu), n && typeof n == "object" && (n = n.Zu), o && typeof o == "object" && (o = o.Zu), !!dr(_, e, n, o);
    }, L.prototype.GetMassData = function(e) {
      var n = this.Zu;
      e && typeof e == "object" && (e = e.Zu), br(n, e);
    }, L.prototype.SetDensity = function(e) {
      var n = this.Zu;
      e && typeof e == "object" && (e = e.Zu), gr(n, e);
    }, L.prototype.GetDensity = function() {
      return hr(this.Zu);
    }, L.prototype.GetFriction = function() {
      return Zr(this.Zu);
    }, L.prototype.SetFriction = function(e) {
      var n = this.Zu;
      e && typeof e == "object" && (e = e.Zu), vr(n, e);
    }, L.prototype.GetRestitution = function() {
      return Jr(this.Zu);
    }, L.prototype.SetRestitution = function(e) {
      var n = this.Zu;
      e && typeof e == "object" && (e = e.Zu), Dr(n, e);
    }, L.prototype.GetRestitutionThreshold = function() {
      return jr(this.Zu);
    }, L.prototype.SetRestitutionThreshold = function(e) {
      var n = this.Zu;
      e && typeof e == "object" && (e = e.Zu), Sr(n, e);
    }, L.prototype.GetAABB = function(e) {
      var n = this.Zu;
      return e && typeof e == "object" && (e = e.Zu), r(Gr(n, e), Q);
    }, L.prototype.Dump = function(e) {
      var n = this.Zu;
      e && typeof e == "object" && (e = e.Zu), Ar(n, e);
    }, L.prototype.__destroy__ = L.prototype.bv = function() {
      Cr(this.Zu);
    };
    function it(e, n) {
      e && typeof e == "object" && (e = e.Zu), n && typeof n == "object" && (n = n.Zu), this.Zu = e === void 0 ? Pr() : n === void 0 ? _emscripten_bind_b2Transform_b2Transform_1(e) : Br(e, n), B(it)[this.Zu] = this;
    }
    it.prototype = Object.create(G.prototype), it.prototype.constructor = it, it.prototype.$u = it, it.av = {}, t.b2Transform = it, it.prototype.SetIdentity = function() {
      xr(this.Zu);
    }, it.prototype.Set = it.prototype.Set = function(e, n) {
      var o = this.Zu;
      e && typeof e == "object" && (e = e.Zu), n && typeof n == "object" && (n = n.Zu), Mr(o, e, n);
    }, it.prototype.get_p = it.prototype.Ux = function() {
      return r(wr(this.Zu), i);
    }, it.prototype.set_p = it.prototype.Tz = function(e) {
      var n = this.Zu;
      e && typeof e == "object" && (e = e.Zu), Rr(n, e);
    }, Object.defineProperty(it.prototype, "p", { get: it.prototype.Ux, set: it.prototype.Tz }), it.prototype.get_q = it.prototype.Yx = function() {
      return r(Fr(this.Zu), nt);
    }, it.prototype.set_q = it.prototype.Xz = function(e) {
      var n = this.Zu;
      e && typeof e == "object" && (e = e.Zu), Tr(n, e);
    }, Object.defineProperty(it.prototype, "q", { get: it.prototype.Yx, set: it.prototype.Xz }), it.prototype.__destroy__ = it.prototype.bv = function() {
      Or(this.Zu);
    };
    function jt() {
      this.Zu = Wr(), B(jt)[this.Zu] = this;
    }
    jt.prototype = Object.create(Ct.prototype), jt.prototype.constructor = jt, jt.prototype.$u = jt, jt.av = {}, t.JSRayCastCallback = jt, jt.prototype.ReportFixture = function(e, n, o, _) {
      var l = this.Zu;
      return e && typeof e == "object" && (e = e.Zu), n && typeof n == "object" && (n = n.Zu), o && typeof o == "object" && (o = o.Zu), _ && typeof _ == "object" && (_ = _.Zu), Lr(l, e, n, o, _);
    }, jt.prototype.__destroy__ = jt.prototype.bv = function() {
      Ir(this.Zu);
    };
    function St() {
      this.Zu = qr(), B(St)[this.Zu] = this;
    }
    St.prototype = Object.create(Pt.prototype), St.prototype.constructor = St, St.prototype.$u = St, St.av = {}, t.JSQueryCallback = St, St.prototype.ReportFixture = function(e) {
      var n = this.Zu;
      return e && typeof e == "object" && (e = e.Zu), !!kr(n, e);
    }, St.prototype.__destroy__ = St.prototype.bv = function() {
      Er(this.Zu);
    };
    function tt() {
      this.Zu = zr(), B(tt)[this.Zu] = this;
    }
    tt.prototype = Object.create(G.prototype), tt.prototype.constructor = tt, tt.prototype.$u = tt, tt.av = {}, t.b2MassData = tt, tt.prototype.get_mass = tt.prototype.Mx = function() {
      return Vr(this.Zu);
    }, tt.prototype.set_mass = tt.prototype.Lz = function(e) {
      var n = this.Zu;
      e && typeof e == "object" && (e = e.Zu), Ur(n, e);
    }, Object.defineProperty(tt.prototype, "mass", { get: tt.prototype.Mx, set: tt.prototype.Lz }), tt.prototype.get_center = tt.prototype.Sw = function() {
      return r($r(this.Zu), i);
    }, tt.prototype.set_center = tt.prototype.Qy = function(e) {
      var n = this.Zu;
      e && typeof e == "object" && (e = e.Zu), Nr(n, e);
    }, Object.defineProperty(tt.prototype, "center", { get: tt.prototype.Sw, set: tt.prototype.Qy }), tt.prototype.get_I = tt.prototype.Cw = function() {
      return Hr(this.Zu);
    }, tt.prototype.set_I = tt.prototype.Ay = function(e) {
      var n = this.Zu;
      e && typeof e == "object" && (e = e.Zu), Qr(n, e);
    }, Object.defineProperty(tt.prototype, "I", { get: tt.prototype.Cw, set: tt.prototype.Ay }), tt.prototype.__destroy__ = tt.prototype.bv = function() {
      Xr(this.Zu);
    };
    function i(e, n) {
      e && typeof e == "object" && (e = e.Zu), n && typeof n == "object" && (n = n.Zu), this.Zu = e === void 0 ? Yr() : n === void 0 ? _emscripten_bind_b2Vec2_b2Vec2_1(e) : Kr(e, n), B(i)[this.Zu] = this;
    }
    i.prototype = Object.create(G.prototype), i.prototype.constructor = i, i.prototype.$u = i, i.av = {}, t.b2Vec2 = i, i.prototype.SetZero = function() {
      t_(this.Zu);
    }, i.prototype.Set = i.prototype.Set = function(e, n) {
      var o = this.Zu;
      e && typeof e == "object" && (e = e.Zu), n && typeof n == "object" && (n = n.Zu), e_(o, e, n);
    }, i.prototype.op_add = function(e) {
      var n = this.Zu;
      e && typeof e == "object" && (e = e.Zu), n_(n, e);
    }, i.prototype.op_sub = function(e) {
      var n = this.Zu;
      e && typeof e == "object" && (e = e.Zu), o_(n, e);
    }, i.prototype.op_mul = function(e) {
      var n = this.Zu;
      e && typeof e == "object" && (e = e.Zu), r_(n, e);
    }, i.prototype.Length = function() {
      return __(this.Zu);
    }, i.prototype.LengthSquared = function() {
      return i_(this.Zu);
    }, i.prototype.Normalize = function() {
      return p_(this.Zu);
    }, i.prototype.IsValid = function() {
      return !!u_(this.Zu);
    }, i.prototype.Skew = function() {
      return r(s_(this.Zu), i);
    }, i.prototype.get_x = i.prototype.fw = function() {
      return c_(this.Zu);
    }, i.prototype.set_x = i.prototype.Aw = function(e) {
      var n = this.Zu;
      e && typeof e == "object" && (e = e.Zu), a_(n, e);
    }, Object.defineProperty(i.prototype, "x", { get: i.prototype.fw, set: i.prototype.Aw }), i.prototype.get_y = i.prototype.gw = function() {
      return l_(this.Zu);
    }, i.prototype.set_y = i.prototype.Bw = function(e) {
      var n = this.Zu;
      e && typeof e == "object" && (e = e.Zu), y_(n, e);
    }, Object.defineProperty(i.prototype, "y", { get: i.prototype.gw, set: i.prototype.Bw }), i.prototype.__destroy__ = i.prototype.bv = function() {
      m_(this.Zu);
    };
    function F(e, n, o) {
      e && typeof e == "object" && (e = e.Zu), n && typeof n == "object" && (n = n.Zu), o && typeof o == "object" && (o = o.Zu), this.Zu = e === void 0 ? f_() : n === void 0 ? _emscripten_bind_b2Vec3_b2Vec3_1(e) : o === void 0 ? _emscripten_bind_b2Vec3_b2Vec3_2(e, n) : d_(e, n, o), B(F)[this.Zu] = this;
    }
    F.prototype = Object.create(G.prototype), F.prototype.constructor = F, F.prototype.$u = F, F.av = {}, t.b2Vec3 = F, F.prototype.SetZero = function() {
      b_(this.Zu);
    }, F.prototype.Set = F.prototype.Set = function(e, n, o) {
      var _ = this.Zu;
      e && typeof e == "object" && (e = e.Zu), n && typeof n == "object" && (n = n.Zu), o && typeof o == "object" && (o = o.Zu), g_(_, e, n, o);
    }, F.prototype.op_add = function(e) {
      var n = this.Zu;
      e && typeof e == "object" && (e = e.Zu), h_(n, e);
    }, F.prototype.op_sub = function(e) {
      var n = this.Zu;
      e && typeof e == "object" && (e = e.Zu), Z_(n, e);
    }, F.prototype.op_mul = function(e) {
      var n = this.Zu;
      e && typeof e == "object" && (e = e.Zu), v_(n, e);
    }, F.prototype.get_x = F.prototype.fw = function() {
      return J_(this.Zu);
    }, F.prototype.set_x = F.prototype.Aw = function(e) {
      var n = this.Zu;
      e && typeof e == "object" && (e = e.Zu), D_(n, e);
    }, Object.defineProperty(F.prototype, "x", { get: F.prototype.fw, set: F.prototype.Aw }), F.prototype.get_y = F.prototype.gw = function() {
      return j_(this.Zu);
    }, F.prototype.set_y = F.prototype.Bw = function(e) {
      var n = this.Zu;
      e && typeof e == "object" && (e = e.Zu), S_(n, e);
    }, Object.defineProperty(F.prototype, "y", { get: F.prototype.gw, set: F.prototype.Bw }), F.prototype.get_z = F.prototype.zy = function() {
      return G_(this.Zu);
    }, F.prototype.set_z = F.prototype.yA = function(e) {
      var n = this.Zu;
      e && typeof e == "object" && (e = e.Zu), A_(n, e);
    }, Object.defineProperty(F.prototype, "z", { get: F.prototype.zy, set: F.prototype.yA }), F.prototype.__destroy__ = F.prototype.bv = function() {
      C_(this.Zu);
    };
    function dt() {
      throw "cannot construct a b2BodyUserData, no constructor in IDL";
    }
    dt.prototype = Object.create(G.prototype), dt.prototype.constructor = dt, dt.prototype.$u = dt, dt.av = {}, t.b2BodyUserData = dt, dt.prototype.get_pointer = dt.prototype.Dv = function() {
      return P_(this.Zu);
    }, dt.prototype.set_pointer = dt.prototype.Jv = function(e) {
      var n = this.Zu;
      e && typeof e == "object" && (e = e.Zu), B_(n, e);
    }, Object.defineProperty(dt.prototype, "pointer", { get: dt.prototype.Dv, set: dt.prototype.Jv }), dt.prototype.__destroy__ = dt.prototype.bv = function() {
      x_(this.Zu);
    };
    function s() {
      throw "cannot construct a b2Body, no constructor in IDL";
    }
    s.prototype = Object.create(G.prototype), s.prototype.constructor = s, s.prototype.$u = s, s.av = {}, t.b2Body = s, s.prototype.CreateFixture = function(e, n) {
      var o = this.Zu;
      return e && typeof e == "object" && (e = e.Zu), n && typeof n == "object" && (n = n.Zu), r(n === void 0 ? M_(o, e) : w_(o, e, n), L);
    }, s.prototype.DestroyFixture = function(e) {
      var n = this.Zu;
      e && typeof e == "object" && (e = e.Zu), R_(n, e);
    }, s.prototype.SetTransform = function(e, n) {
      var o = this.Zu;
      e && typeof e == "object" && (e = e.Zu), n && typeof n == "object" && (n = n.Zu), F_(o, e, n);
    }, s.prototype.GetTransform = function() {
      return r(T_(this.Zu), it);
    }, s.prototype.GetPosition = function() {
      return r(O_(this.Zu), i);
    }, s.prototype.GetAngle = function() {
      return W_(this.Zu);
    }, s.prototype.GetWorldCenter = function() {
      return r(L_(this.Zu), i);
    }, s.prototype.GetLocalCenter = function() {
      return r(I_(this.Zu), i);
    }, s.prototype.SetLinearVelocity = function(e) {
      var n = this.Zu;
      e && typeof e == "object" && (e = e.Zu), q_(n, e);
    }, s.prototype.GetLinearVelocity = function() {
      return r(k_(this.Zu), i);
    }, s.prototype.SetAngularVelocity = function(e) {
      var n = this.Zu;
      e && typeof e == "object" && (e = e.Zu), E_(n, e);
    }, s.prototype.GetAngularVelocity = function() {
      return z_(this.Zu);
    }, s.prototype.ApplyForce = function(e, n, o) {
      var _ = this.Zu;
      e && typeof e == "object" && (e = e.Zu), n && typeof n == "object" && (n = n.Zu), o && typeof o == "object" && (o = o.Zu), V_(_, e, n, o);
    }, s.prototype.ApplyForceToCenter = function(e, n) {
      var o = this.Zu;
      e && typeof e == "object" && (e = e.Zu), n && typeof n == "object" && (n = n.Zu), U_(o, e, n);
    }, s.prototype.ApplyTorque = function(e, n) {
      var o = this.Zu;
      e && typeof e == "object" && (e = e.Zu), n && typeof n == "object" && (n = n.Zu), $_(o, e, n);
    }, s.prototype.ApplyLinearImpulse = function(e, n, o) {
      var _ = this.Zu;
      e && typeof e == "object" && (e = e.Zu), n && typeof n == "object" && (n = n.Zu), o && typeof o == "object" && (o = o.Zu), N_(_, e, n, o);
    }, s.prototype.ApplyLinearImpulseToCenter = function(e, n) {
      var o = this.Zu;
      e && typeof e == "object" && (e = e.Zu), n && typeof n == "object" && (n = n.Zu), H_(o, e, n);
    }, s.prototype.ApplyAngularImpulse = function(e, n) {
      var o = this.Zu;
      e && typeof e == "object" && (e = e.Zu), n && typeof n == "object" && (n = n.Zu), Q_(o, e, n);
    }, s.prototype.GetMass = function() {
      return X_(this.Zu);
    }, s.prototype.GetInertia = function() {
      return Y_(this.Zu);
    }, s.prototype.GetMassData = function(e) {
      var n = this.Zu;
      e && typeof e == "object" && (e = e.Zu), K_(n, e);
    }, s.prototype.SetMassData = function(e) {
      var n = this.Zu;
      e && typeof e == "object" && (e = e.Zu), ti(n, e);
    }, s.prototype.ResetMassData = function() {
      ei(this.Zu);
    }, s.prototype.GetWorldPoint = function(e) {
      var n = this.Zu;
      return e && typeof e == "object" && (e = e.Zu), r(ni(n, e), i);
    }, s.prototype.GetWorldVector = function(e) {
      var n = this.Zu;
      return e && typeof e == "object" && (e = e.Zu), r(oi(n, e), i);
    }, s.prototype.GetLocalPoint = function(e) {
      var n = this.Zu;
      return e && typeof e == "object" && (e = e.Zu), r(ri(n, e), i);
    }, s.prototype.GetLocalVector = function(e) {
      var n = this.Zu;
      return e && typeof e == "object" && (e = e.Zu), r(_i(n, e), i);
    }, s.prototype.GetLinearVelocityFromWorldPoint = function(e) {
      var n = this.Zu;
      return e && typeof e == "object" && (e = e.Zu), r(ii(n, e), i);
    }, s.prototype.GetLinearVelocityFromLocalPoint = function(e) {
      var n = this.Zu;
      return e && typeof e == "object" && (e = e.Zu), r(pi(n, e), i);
    }, s.prototype.GetLinearDamping = function() {
      return ui(this.Zu);
    }, s.prototype.SetLinearDamping = function(e) {
      var n = this.Zu;
      e && typeof e == "object" && (e = e.Zu), si(n, e);
    }, s.prototype.GetAngularDamping = function() {
      return ci(this.Zu);
    }, s.prototype.SetAngularDamping = function(e) {
      var n = this.Zu;
      e && typeof e == "object" && (e = e.Zu), ai(n, e);
    }, s.prototype.GetGravityScale = function() {
      return li(this.Zu);
    }, s.prototype.SetGravityScale = function(e) {
      var n = this.Zu;
      e && typeof e == "object" && (e = e.Zu), yi(n, e);
    }, s.prototype.SetType = function(e) {
      var n = this.Zu;
      e && typeof e == "object" && (e = e.Zu), mi(n, e);
    }, s.prototype.GetType = function() {
      return fi(this.Zu);
    }, s.prototype.SetBullet = function(e) {
      var n = this.Zu;
      e && typeof e == "object" && (e = e.Zu), di(n, e);
    }, s.prototype.IsBullet = function() {
      return !!bi(this.Zu);
    }, s.prototype.SetSleepingAllowed = function(e) {
      var n = this.Zu;
      e && typeof e == "object" && (e = e.Zu), gi(n, e);
    }, s.prototype.IsSleepingAllowed = function() {
      return !!hi(this.Zu);
    }, s.prototype.SetAwake = function(e) {
      var n = this.Zu;
      e && typeof e == "object" && (e = e.Zu), Zi(n, e);
    }, s.prototype.IsAwake = function() {
      return !!vi(this.Zu);
    }, s.prototype.SetEnabled = function(e) {
      var n = this.Zu;
      e && typeof e == "object" && (e = e.Zu), Ji(n, e);
    }, s.prototype.IsEnabled = function() {
      return !!Di(this.Zu);
    }, s.prototype.SetFixedRotation = function(e) {
      var n = this.Zu;
      e && typeof e == "object" && (e = e.Zu), ji(n, e);
    }, s.prototype.IsFixedRotation = function() {
      return !!Si(this.Zu);
    }, s.prototype.GetFixtureList = function() {
      return r(Gi(this.Zu), L);
    }, s.prototype.GetJointList = function() {
      return r(Ai(this.Zu), O);
    }, s.prototype.GetContactList = function() {
      return r(Ci(this.Zu), T);
    }, s.prototype.GetNext = function() {
      return r(Pi(this.Zu), s);
    }, s.prototype.GetUserData = function() {
      return r(Bi(this.Zu), dt);
    }, s.prototype.GetWorld = function() {
      return r(xi(this.Zu), P);
    }, s.prototype.Dump = function() {
      Mi(this.Zu);
    };
    function a() {
      this.Zu = wi(), B(a)[this.Zu] = this;
    }
    a.prototype = Object.create(G.prototype), a.prototype.constructor = a, a.prototype.$u = a, a.av = {}, t.b2BodyDef = a, a.prototype.get_type = a.prototype.cv = function() {
      return Ri(this.Zu);
    }, a.prototype.set_type = a.prototype.ev = function(e) {
      var n = this.Zu;
      e && typeof e == "object" && (e = e.Zu), Fi(n, e);
    }, Object.defineProperty(a.prototype, "type", { get: a.prototype.cv, set: a.prototype.ev }), a.prototype.get_position = a.prototype.bw = function() {
      return r(Ti(this.Zu), i);
    }, a.prototype.set_position = a.prototype.ww = function(e) {
      var n = this.Zu;
      e && typeof e == "object" && (e = e.Zu), Oi(n, e);
    }, Object.defineProperty(a.prototype, "position", { get: a.prototype.bw, set: a.prototype.ww }), a.prototype.get_angle = a.prototype.Ew = function() {
      return Wi(this.Zu);
    }, a.prototype.set_angle = a.prototype.Cy = function(e) {
      var n = this.Zu;
      e && typeof e == "object" && (e = e.Zu), Li(n, e);
    }, Object.defineProperty(a.prototype, "angle", { get: a.prototype.Ew, set: a.prototype.Cy }), a.prototype.get_linearVelocity = a.prototype.xx = function() {
      return r(Ii(this.Zu), i);
    }, a.prototype.set_linearVelocity = a.prototype.wz = function(e) {
      var n = this.Zu;
      e && typeof e == "object" && (e = e.Zu), qi(n, e);
    }, Object.defineProperty(a.prototype, "linearVelocity", { get: a.prototype.xx, set: a.prototype.wz }), a.prototype.get_angularVelocity = a.prototype.Hw = function() {
      return ki(this.Zu);
    }, a.prototype.set_angularVelocity = a.prototype.Fy = function(e) {
      var n = this.Zu;
      e && typeof e == "object" && (e = e.Zu), Ei(n, e);
    }, Object.defineProperty(a.prototype, "angularVelocity", { get: a.prototype.Hw, set: a.prototype.Fy }), a.prototype.get_linearDamping = a.prototype.vx = function() {
      return zi(this.Zu);
    }, a.prototype.set_linearDamping = a.prototype.uz = function(e) {
      var n = this.Zu;
      e && typeof e == "object" && (e = e.Zu), Vi(n, e);
    }, Object.defineProperty(a.prototype, "linearDamping", { get: a.prototype.vx, set: a.prototype.uz }), a.prototype.get_angularDamping = a.prototype.Fw = function() {
      return Ui(this.Zu);
    }, a.prototype.set_angularDamping = a.prototype.Dy = function(e) {
      var n = this.Zu;
      e && typeof e == "object" && (e = e.Zu), $i(n, e);
    }, Object.defineProperty(a.prototype, "angularDamping", { get: a.prototype.Fw, set: a.prototype.Dy }), a.prototype.get_allowSleep = a.prototype.Dw = function() {
      return !!Ni(this.Zu);
    }, a.prototype.set_allowSleep = a.prototype.By = function(e) {
      var n = this.Zu;
      e && typeof e == "object" && (e = e.Zu), Hi(n, e);
    }, Object.defineProperty(a.prototype, "allowSleep", { get: a.prototype.Dw, set: a.prototype.By }), a.prototype.get_awake = a.prototype.Iw = function() {
      return !!Qi(this.Zu);
    }, a.prototype.set_awake = a.prototype.Gy = function(e) {
      var n = this.Zu;
      e && typeof e == "object" && (e = e.Zu), Xi(n, e);
    }, Object.defineProperty(a.prototype, "awake", { get: a.prototype.Iw, set: a.prototype.Gy }), a.prototype.get_fixedRotation = a.prototype.bx = function() {
      return !!Yi(this.Zu);
    }, a.prototype.set_fixedRotation = a.prototype.$y = function(e) {
      var n = this.Zu;
      e && typeof e == "object" && (e = e.Zu), Ki(n, e);
    }, Object.defineProperty(a.prototype, "fixedRotation", { get: a.prototype.bx, set: a.prototype.$y }), a.prototype.get_bullet = a.prototype.Pw = function() {
      return !!tp(this.Zu);
    }, a.prototype.set_bullet = a.prototype.Ny = function(e) {
      var n = this.Zu;
      e && typeof e == "object" && (e = e.Zu), ep(n, e);
    }, Object.defineProperty(a.prototype, "bullet", { get: a.prototype.Pw, set: a.prototype.Ny }), a.prototype.get_enabled = a.prototype.Yw = function() {
      return !!np(this.Zu);
    }, a.prototype.set_enabled = a.prototype.Wy = function(e) {
      var n = this.Zu;
      e && typeof e == "object" && (e = e.Zu), op(n, e);
    }, Object.defineProperty(a.prototype, "enabled", { get: a.prototype.Yw, set: a.prototype.Wy }), a.prototype.get_userData = a.prototype.dv = function() {
      return r(rp(this.Zu), dt);
    }, a.prototype.set_userData = a.prototype.fv = function(e) {
      var n = this.Zu;
      e && typeof e == "object" && (e = e.Zu), _p(n, e);
    }, Object.defineProperty(a.prototype, "userData", { get: a.prototype.dv, set: a.prototype.fv }), a.prototype.get_gravityScale = a.prototype.gx = function() {
      return ip(this.Zu);
    }, a.prototype.set_gravityScale = a.prototype.ez = function(e) {
      var n = this.Zu;
      e && typeof e == "object" && (e = e.Zu), pp(n, e);
    }, Object.defineProperty(a.prototype, "gravityScale", { get: a.prototype.gx, set: a.prototype.ez }), a.prototype.__destroy__ = a.prototype.bv = function() {
      up(this.Zu);
    };
    function N() {
      this.Zu = sp(), B(N)[this.Zu] = this;
    }
    N.prototype = Object.create(G.prototype), N.prototype.constructor = N, N.prototype.$u = N, N.av = {}, t.b2Filter = N, N.prototype.get_categoryBits = N.prototype.Rw = function() {
      return cp(this.Zu);
    }, N.prototype.set_categoryBits = N.prototype.Py = function(e) {
      var n = this.Zu;
      e && typeof e == "object" && (e = e.Zu), ap(n, e);
    }, Object.defineProperty(N.prototype, "categoryBits", { get: N.prototype.Rw, set: N.prototype.Py }), N.prototype.get_maskBits = N.prototype.Lx = function() {
      return lp(this.Zu);
    }, N.prototype.set_maskBits = N.prototype.Kz = function(e) {
      var n = this.Zu;
      e && typeof e == "object" && (e = e.Zu), yp(n, e);
    }, Object.defineProperty(N.prototype, "maskBits", { get: N.prototype.Lx, set: N.prototype.Kz }), N.prototype.get_groupIndex = N.prototype.jx = function() {
      return mp(this.Zu);
    }, N.prototype.set_groupIndex = N.prototype.hz = function(e) {
      var n = this.Zu;
      e && typeof e == "object" && (e = e.Zu), fp(n, e);
    }, Object.defineProperty(N.prototype, "groupIndex", { get: N.prototype.jx, set: N.prototype.hz }), N.prototype.__destroy__ = N.prototype.bv = function() {
      dp(this.Zu);
    };
    function Q() {
      this.Zu = bp(), B(Q)[this.Zu] = this;
    }
    Q.prototype = Object.create(G.prototype), Q.prototype.constructor = Q, Q.prototype.$u = Q, Q.av = {}, t.b2AABB = Q, Q.prototype.IsValid = function() {
      return !!gp(this.Zu);
    }, Q.prototype.GetCenter = function() {
      return r(hp(this.Zu), i);
    }, Q.prototype.GetExtents = function() {
      return r(Zp(this.Zu), i);
    }, Q.prototype.GetPerimeter = function() {
      return vp(this.Zu);
    }, Q.prototype.Combine = function(e, n) {
      var o = this.Zu;
      e && typeof e == "object" && (e = e.Zu), n && typeof n == "object" && (n = n.Zu), n === void 0 ? Jp(o, e) : Dp(o, e, n);
    }, Q.prototype.Contains = function(e) {
      var n = this.Zu;
      return e && typeof e == "object" && (e = e.Zu), !!jp(n, e);
    }, Q.prototype.RayCast = function(e, n) {
      var o = this.Zu;
      return e && typeof e == "object" && (e = e.Zu), n && typeof n == "object" && (n = n.Zu), !!Sp(o, e, n);
    }, Q.prototype.get_lowerBound = Q.prototype.Ax = function() {
      return r(Gp(this.Zu), i);
    }, Q.prototype.set_lowerBound = Q.prototype.zz = function(e) {
      var n = this.Zu;
      e && typeof e == "object" && (e = e.Zu), Ap(n, e);
    }, Object.defineProperty(Q.prototype, "lowerBound", { get: Q.prototype.Ax, set: Q.prototype.zz }), Q.prototype.get_upperBound = Q.prototype.vy = function() {
      return r(Cp(this.Zu), i);
    }, Q.prototype.set_upperBound = Q.prototype.uA = function(e) {
      var n = this.Zu;
      e && typeof e == "object" && (e = e.Zu), Pp(n, e);
    }, Object.defineProperty(Q.prototype, "upperBound", { get: Q.prototype.vy, set: Q.prototype.uA }), Q.prototype.__destroy__ = Q.prototype.bv = function() {
      Bp(this.Zu);
    };
    function k() {
      this.Zu = xp(), B(k)[this.Zu] = this;
    }
    k.prototype = Object.create($.prototype), k.prototype.constructor = k, k.prototype.$u = k, k.av = {}, t.b2CircleShape = k, k.prototype.GetType = function() {
      return Mp(this.Zu);
    }, k.prototype.GetChildCount = function() {
      return wp(this.Zu);
    }, k.prototype.TestPoint = function(e, n) {
      var o = this.Zu;
      return e && typeof e == "object" && (e = e.Zu), n && typeof n == "object" && (n = n.Zu), !!Rp(o, e, n);
    }, k.prototype.RayCast = function(e, n, o, _) {
      var l = this.Zu;
      return e && typeof e == "object" && (e = e.Zu), n && typeof n == "object" && (n = n.Zu), o && typeof o == "object" && (o = o.Zu), _ && typeof _ == "object" && (_ = _.Zu), !!Fp(l, e, n, o, _);
    }, k.prototype.ComputeAABB = function(e, n, o) {
      var _ = this.Zu;
      e && typeof e == "object" && (e = e.Zu), n && typeof n == "object" && (n = n.Zu), o && typeof o == "object" && (o = o.Zu), Tp(_, e, n, o);
    }, k.prototype.ComputeMass = function(e, n) {
      var o = this.Zu;
      e && typeof e == "object" && (e = e.Zu), n && typeof n == "object" && (n = n.Zu), Op(o, e, n);
    }, k.prototype.get_m_p = k.prototype.Fx = function() {
      return r(Wp(this.Zu), i);
    }, k.prototype.set_m_p = k.prototype.Ez = function(e) {
      var n = this.Zu;
      e && typeof e == "object" && (e = e.Zu), Lp(n, e);
    }, Object.defineProperty(k.prototype, "m_p", { get: k.prototype.Fx, set: k.prototype.Ez }), k.prototype.get_m_type = k.prototype.tv = function() {
      return Ip(this.Zu);
    }, k.prototype.set_m_type = k.prototype.wv = function(e) {
      var n = this.Zu;
      e && typeof e == "object" && (e = e.Zu), qp(n, e);
    }, Object.defineProperty(k.prototype, "m_type", { get: k.prototype.tv, set: k.prototype.wv }), k.prototype.get_m_radius = k.prototype.sv = function() {
      return kp(this.Zu);
    }, k.prototype.set_m_radius = k.prototype.vv = function(e) {
      var n = this.Zu;
      e && typeof e == "object" && (e = e.Zu), Ep(n, e);
    }, Object.defineProperty(k.prototype, "m_radius", { get: k.prototype.sv, set: k.prototype.vv }), k.prototype.__destroy__ = k.prototype.bv = function() {
      zp(this.Zu);
    };
    function Z() {
      this.Zu = Vp(), B(Z)[this.Zu] = this;
    }
    Z.prototype = Object.create($.prototype), Z.prototype.constructor = Z, Z.prototype.$u = Z, Z.av = {}, t.b2EdgeShape = Z, Z.prototype.SetOneSided = function(e, n, o, _) {
      var l = this.Zu;
      e && typeof e == "object" && (e = e.Zu), n && typeof n == "object" && (n = n.Zu), o && typeof o == "object" && (o = o.Zu), _ && typeof _ == "object" && (_ = _.Zu), Up(l, e, n, o, _);
    }, Z.prototype.SetTwoSided = function(e, n) {
      var o = this.Zu;
      e && typeof e == "object" && (e = e.Zu), n && typeof n == "object" && (n = n.Zu), $p(o, e, n);
    }, Z.prototype.GetType = function() {
      return Np(this.Zu);
    }, Z.prototype.GetChildCount = function() {
      return Hp(this.Zu);
    }, Z.prototype.TestPoint = function(e, n) {
      var o = this.Zu;
      return e && typeof e == "object" && (e = e.Zu), n && typeof n == "object" && (n = n.Zu), !!Qp(o, e, n);
    }, Z.prototype.RayCast = function(e, n, o, _) {
      var l = this.Zu;
      return e && typeof e == "object" && (e = e.Zu), n && typeof n == "object" && (n = n.Zu), o && typeof o == "object" && (o = o.Zu), _ && typeof _ == "object" && (_ = _.Zu), !!Xp(l, e, n, o, _);
    }, Z.prototype.ComputeAABB = function(e, n, o) {
      var _ = this.Zu;
      e && typeof e == "object" && (e = e.Zu), n && typeof n == "object" && (n = n.Zu), o && typeof o == "object" && (o = o.Zu), Yp(_, e, n, o);
    }, Z.prototype.ComputeMass = function(e, n) {
      var o = this.Zu;
      e && typeof e == "object" && (e = e.Zu), n && typeof n == "object" && (n = n.Zu), Kp(o, e, n);
    }, Z.prototype.get_m_vertex1 = Z.prototype.Ix = function() {
      return r(tu(this.Zu), i);
    }, Z.prototype.set_m_vertex1 = Z.prototype.Hz = function(e) {
      var n = this.Zu;
      e && typeof e == "object" && (e = e.Zu), eu(n, e);
    }, Object.defineProperty(Z.prototype, "m_vertex1", { get: Z.prototype.Ix, set: Z.prototype.Hz }), Z.prototype.get_m_vertex2 = Z.prototype.Jx = function() {
      return r(nu(this.Zu), i);
    }, Z.prototype.set_m_vertex2 = Z.prototype.Iz = function(e) {
      var n = this.Zu;
      e && typeof e == "object" && (e = e.Zu), ou(n, e);
    }, Object.defineProperty(Z.prototype, "m_vertex2", { get: Z.prototype.Jx, set: Z.prototype.Iz }), Z.prototype.get_m_vertex0 = Z.prototype.Hx = function() {
      return r(ru(this.Zu), i);
    }, Z.prototype.set_m_vertex0 = Z.prototype.Gz = function(e) {
      var n = this.Zu;
      e && typeof e == "object" && (e = e.Zu), _u(n, e);
    }, Object.defineProperty(Z.prototype, "m_vertex0", { get: Z.prototype.Hx, set: Z.prototype.Gz }), Z.prototype.get_m_vertex3 = Z.prototype.Kx = function() {
      return r(iu(this.Zu), i);
    }, Z.prototype.set_m_vertex3 = Z.prototype.Jz = function(e) {
      var n = this.Zu;
      e && typeof e == "object" && (e = e.Zu), pu(n, e);
    }, Object.defineProperty(Z.prototype, "m_vertex3", { get: Z.prototype.Kx, set: Z.prototype.Jz }), Z.prototype.get_m_oneSided = Z.prototype.Ex = function() {
      return !!uu(this.Zu);
    }, Z.prototype.set_m_oneSided = Z.prototype.Dz = function(e) {
      var n = this.Zu;
      e && typeof e == "object" && (e = e.Zu), su(n, e);
    }, Object.defineProperty(Z.prototype, "m_oneSided", { get: Z.prototype.Ex, set: Z.prototype.Dz }), Z.prototype.get_m_type = Z.prototype.tv = function() {
      return cu(this.Zu);
    }, Z.prototype.set_m_type = Z.prototype.wv = function(e) {
      var n = this.Zu;
      e && typeof e == "object" && (e = e.Zu), au(n, e);
    }, Object.defineProperty(Z.prototype, "m_type", { get: Z.prototype.tv, set: Z.prototype.wv }), Z.prototype.get_m_radius = Z.prototype.sv = function() {
      return lu(this.Zu);
    }, Z.prototype.set_m_radius = Z.prototype.vv = function(e) {
      var n = this.Zu;
      e && typeof e == "object" && (e = e.Zu), yu(n, e);
    }, Object.defineProperty(Z.prototype, "m_radius", { get: Z.prototype.sv, set: Z.prototype.vv }), Z.prototype.__destroy__ = Z.prototype.bv = function() {
      mu(this.Zu);
    };
    function I() {
      throw "cannot construct a b2JointUserData, no constructor in IDL";
    }
    I.prototype = Object.create(G.prototype), I.prototype.constructor = I, I.prototype.$u = I, I.av = {}, t.b2JointUserData = I, I.prototype.get_pointer = I.prototype.Dv = function() {
      return fu(this.Zu);
    }, I.prototype.set_pointer = I.prototype.Jv = function(e) {
      var n = this.Zu;
      e && typeof e == "object" && (e = e.Zu), du(n, e);
    }, Object.defineProperty(I.prototype, "pointer", { get: I.prototype.Dv, set: I.prototype.Jv }), I.prototype.__destroy__ = I.prototype.bv = function() {
      bu(this.Zu);
    };
    function pt() {
      throw "cannot construct a b2WeldJoint, no constructor in IDL";
    }
    pt.prototype = Object.create(x.prototype), pt.prototype.constructor = pt, pt.prototype.$u = pt, pt.av = {}, t.b2WeldJoint = pt, pt.prototype.GetLocalAnchorA = function() {
      return r(gu(this.Zu), i);
    }, pt.prototype.GetLocalAnchorB = function() {
      return r(hu(this.Zu), i);
    }, pt.prototype.GetReferenceAngle = function() {
      return Zu(this.Zu);
    }, pt.prototype.SetStiffness = function(e) {
      var n = this.Zu;
      e && typeof e == "object" && (e = e.Zu), vu(n, e);
    }, pt.prototype.GetStiffness = function() {
      return Ju(this.Zu);
    }, pt.prototype.SetDamping = function(e) {
      var n = this.Zu;
      e && typeof e == "object" && (e = e.Zu), Du(n, e);
    }, pt.prototype.GetDamping = function() {
      return ju(this.Zu);
    }, pt.prototype.Dump = function() {
      Su(this.Zu);
    }, pt.prototype.GetType = function() {
      return Gu(this.Zu);
    }, pt.prototype.GetBodyA = function() {
      return r(Au(this.Zu), s);
    }, pt.prototype.GetBodyB = function() {
      return r(Cu(this.Zu), s);
    }, pt.prototype.GetAnchorA = function() {
      return r(Pu(this.Zu), i);
    }, pt.prototype.GetAnchorB = function() {
      return r(Bu(this.Zu), i);
    }, pt.prototype.GetReactionForce = function(e) {
      var n = this.Zu;
      return e && typeof e == "object" && (e = e.Zu), r(xu(n, e), i);
    }, pt.prototype.GetReactionTorque = function(e) {
      var n = this.Zu;
      return e && typeof e == "object" && (e = e.Zu), Mu(n, e);
    }, pt.prototype.GetNext = function() {
      return r(wu(this.Zu), x);
    }, pt.prototype.GetUserData = function() {
      return r(Ru(this.Zu), I);
    }, pt.prototype.GetCollideConnected = function() {
      return !!Fu(this.Zu);
    }, pt.prototype.__destroy__ = pt.prototype.bv = function() {
      Tu(this.Zu);
    };
    function d() {
      this.Zu = Ou(), B(d)[this.Zu] = this;
    }
    d.prototype = Object.create(A.prototype), d.prototype.constructor = d, d.prototype.$u = d, d.av = {}, t.b2WeldJointDef = d, d.prototype.Initialize = function(e, n, o) {
      var _ = this.Zu;
      e && typeof e == "object" && (e = e.Zu), n && typeof n == "object" && (n = n.Zu), o && typeof o == "object" && (o = o.Zu), Wu(_, e, n, o);
    }, d.prototype.get_localAnchorA = d.prototype.nv = function() {
      return r(Lu(this.Zu), i);
    }, d.prototype.set_localAnchorA = d.prototype.pv = function(e) {
      var n = this.Zu;
      e && typeof e == "object" && (e = e.Zu), Iu(n, e);
    }, Object.defineProperty(d.prototype, "localAnchorA", { get: d.prototype.nv, set: d.prototype.pv }), d.prototype.get_localAnchorB = d.prototype.ov = function() {
      return r(qu(this.Zu), i);
    }, d.prototype.set_localAnchorB = d.prototype.qv = function(e) {
      var n = this.Zu;
      e && typeof e == "object" && (e = e.Zu), ku(n, e);
    }, Object.defineProperty(d.prototype, "localAnchorB", { get: d.prototype.ov, set: d.prototype.qv }), d.prototype.get_referenceAngle = d.prototype.Ev = function() {
      return Eu(this.Zu);
    }, d.prototype.set_referenceAngle = d.prototype.Kv = function(e) {
      var n = this.Zu;
      e && typeof e == "object" && (e = e.Zu), zu(n, e);
    }, Object.defineProperty(d.prototype, "referenceAngle", { get: d.prototype.Ev, set: d.prototype.Kv }), d.prototype.get_stiffness = d.prototype.xv = function() {
      return Vu(this.Zu);
    }, d.prototype.set_stiffness = d.prototype.yv = function(e) {
      var n = this.Zu;
      e && typeof e == "object" && (e = e.Zu), Uu(n, e);
    }, Object.defineProperty(d.prototype, "stiffness", { get: d.prototype.xv, set: d.prototype.yv }), d.prototype.get_damping = d.prototype.rv = function() {
      return $u(this.Zu);
    }, d.prototype.set_damping = d.prototype.uv = function(e) {
      var n = this.Zu;
      e && typeof e == "object" && (e = e.Zu), Nu(n, e);
    }, Object.defineProperty(d.prototype, "damping", { get: d.prototype.rv, set: d.prototype.uv }), d.prototype.get_type = d.prototype.cv = function() {
      return Hu(this.Zu);
    }, d.prototype.set_type = d.prototype.ev = function(e) {
      var n = this.Zu;
      e && typeof e == "object" && (e = e.Zu), Qu(n, e);
    }, Object.defineProperty(d.prototype, "type", { get: d.prototype.cv, set: d.prototype.ev }), d.prototype.get_userData = d.prototype.dv = function() {
      return r(Xu(this.Zu), I);
    }, d.prototype.set_userData = d.prototype.fv = function(e) {
      var n = this.Zu;
      e && typeof e == "object" && (e = e.Zu), Yu(n, e);
    }, Object.defineProperty(d.prototype, "userData", { get: d.prototype.dv, set: d.prototype.fv }), d.prototype.get_bodyA = d.prototype.gv = function() {
      return r(Ku(this.Zu), s);
    }, d.prototype.set_bodyA = d.prototype.kv = function(e) {
      var n = this.Zu;
      e && typeof e == "object" && (e = e.Zu), ts(n, e);
    }, Object.defineProperty(d.prototype, "bodyA", { get: d.prototype.gv, set: d.prototype.kv }), d.prototype.get_bodyB = d.prototype.hv = function() {
      return r(es(this.Zu), s);
    }, d.prototype.set_bodyB = d.prototype.lv = function(e) {
      var n = this.Zu;
      e && typeof e == "object" && (e = e.Zu), ns(n, e);
    }, Object.defineProperty(d.prototype, "bodyB", { get: d.prototype.hv, set: d.prototype.lv }), d.prototype.get_collideConnected = d.prototype.jv = function() {
      return !!os(this.Zu);
    }, d.prototype.set_collideConnected = d.prototype.mv = function(e) {
      var n = this.Zu;
      e && typeof e == "object" && (e = e.Zu), rs(n, e);
    }, Object.defineProperty(d.prototype, "collideConnected", { get: d.prototype.jv, set: d.prototype.mv }), d.prototype.__destroy__ = d.prototype.bv = function() {
      _s(this.Zu);
    };
    function j() {
      this.Zu = is(), B(j)[this.Zu] = this;
    }
    j.prototype = Object.create($.prototype), j.prototype.constructor = j, j.prototype.$u = j, j.av = {}, t.b2ChainShape = j, j.prototype.Clear = function() {
      ps(this.Zu);
    }, j.prototype.CreateLoop = function(e, n) {
      var o = this.Zu;
      e && typeof e == "object" && (e = e.Zu), n && typeof n == "object" && (n = n.Zu), us(o, e, n);
    }, j.prototype.CreateChain = function(e, n, o, _) {
      var l = this.Zu;
      e && typeof e == "object" && (e = e.Zu), n && typeof n == "object" && (n = n.Zu), o && typeof o == "object" && (o = o.Zu), _ && typeof _ == "object" && (_ = _.Zu), ss(l, e, n, o, _);
    }, j.prototype.GetChildEdge = function(e, n) {
      var o = this.Zu;
      e && typeof e == "object" && (e = e.Zu), n && typeof n == "object" && (n = n.Zu), cs(o, e, n);
    }, j.prototype.GetType = function() {
      return as(this.Zu);
    }, j.prototype.GetChildCount = function() {
      return ls(this.Zu);
    }, j.prototype.TestPoint = function(e, n) {
      var o = this.Zu;
      return e && typeof e == "object" && (e = e.Zu), n && typeof n == "object" && (n = n.Zu), !!ys(o, e, n);
    }, j.prototype.RayCast = function(e, n, o, _) {
      var l = this.Zu;
      return e && typeof e == "object" && (e = e.Zu), n && typeof n == "object" && (n = n.Zu), o && typeof o == "object" && (o = o.Zu), _ && typeof _ == "object" && (_ = _.Zu), !!ms(l, e, n, o, _);
    }, j.prototype.ComputeAABB = function(e, n, o) {
      var _ = this.Zu;
      e && typeof e == "object" && (e = e.Zu), n && typeof n == "object" && (n = n.Zu), o && typeof o == "object" && (o = o.Zu), fs(_, e, n, o);
    }, j.prototype.ComputeMass = function(e, n) {
      var o = this.Zu;
      e && typeof e == "object" && (e = e.Zu), n && typeof n == "object" && (n = n.Zu), ds(o, e, n);
    }, j.prototype.get_m_vertices = j.prototype.Vv = function() {
      return r(bs(this.Zu), i);
    }, j.prototype.set_m_vertices = j.prototype.pw = function(e) {
      var n = this.Zu;
      e && typeof e == "object" && (e = e.Zu), gs(n, e);
    }, Object.defineProperty(j.prototype, "m_vertices", { get: j.prototype.Vv, set: j.prototype.pw }), j.prototype.get_m_count = j.prototype.Uv = function() {
      return hs(this.Zu);
    }, j.prototype.set_m_count = j.prototype.ow = function(e) {
      var n = this.Zu;
      e && typeof e == "object" && (e = e.Zu), Zs(n, e);
    }, Object.defineProperty(j.prototype, "m_count", { get: j.prototype.Uv, set: j.prototype.ow }), j.prototype.get_m_prevVertex = j.prototype.Gx = function() {
      return r(vs(this.Zu), i);
    }, j.prototype.set_m_prevVertex = j.prototype.Fz = function(e) {
      var n = this.Zu;
      e && typeof e == "object" && (e = e.Zu), Js(n, e);
    }, Object.defineProperty(j.prototype, "m_prevVertex", { get: j.prototype.Gx, set: j.prototype.Fz }), j.prototype.get_m_nextVertex = j.prototype.Cx = function() {
      return r(Ds(this.Zu), i);
    }, j.prototype.set_m_nextVertex = j.prototype.Bz = function(e) {
      var n = this.Zu;
      e && typeof e == "object" && (e = e.Zu), js(n, e);
    }, Object.defineProperty(j.prototype, "m_nextVertex", { get: j.prototype.Cx, set: j.prototype.Bz }), j.prototype.get_m_type = j.prototype.tv = function() {
      return Ss(this.Zu);
    }, j.prototype.set_m_type = j.prototype.wv = function(e) {
      var n = this.Zu;
      e && typeof e == "object" && (e = e.Zu), Gs(n, e);
    }, Object.defineProperty(j.prototype, "m_type", { get: j.prototype.tv, set: j.prototype.wv }), j.prototype.get_m_radius = j.prototype.sv = function() {
      return As(this.Zu);
    }, j.prototype.set_m_radius = j.prototype.vv = function(e) {
      var n = this.Zu;
      e && typeof e == "object" && (e = e.Zu), Cs(n, e);
    }, Object.defineProperty(j.prototype, "m_radius", { get: j.prototype.sv, set: j.prototype.vv }), j.prototype.__destroy__ = j.prototype.bv = function() {
      Ps(this.Zu);
    };
    function H(e, n, o) {
      e && typeof e == "object" && (e = e.Zu), n && typeof n == "object" && (n = n.Zu), o && typeof o == "object" && (o = o.Zu), this.Zu = e === void 0 ? Bs() : n === void 0 ? _emscripten_bind_b2Color_b2Color_1(e) : o === void 0 ? _emscripten_bind_b2Color_b2Color_2(e, n) : xs(e, n, o), B(H)[this.Zu] = this;
    }
    H.prototype = Object.create(G.prototype), H.prototype.constructor = H, H.prototype.$u = H, H.av = {}, t.b2Color = H, H.prototype.Set = H.prototype.Set = function(e, n, o) {
      var _ = this.Zu;
      e && typeof e == "object" && (e = e.Zu), n && typeof n == "object" && (n = n.Zu), o && typeof o == "object" && (o = o.Zu), Ms(_, e, n, o);
    }, H.prototype.get_r = H.prototype.Zx = function() {
      return ws(this.Zu);
    }, H.prototype.set_r = H.prototype.Yz = function(e) {
      var n = this.Zu;
      e && typeof e == "object" && (e = e.Zu), Rs(n, e);
    }, Object.defineProperty(H.prototype, "r", { get: H.prototype.Zx, set: H.prototype.Yz }), H.prototype.get_g = H.prototype.ex = function() {
      return Fs(this.Zu);
    }, H.prototype.set_g = H.prototype.cz = function(e) {
      var n = this.Zu;
      e && typeof e == "object" && (e = e.Zu), Ts(n, e);
    }, Object.defineProperty(H.prototype, "g", { get: H.prototype.ex, set: H.prototype.cz }), H.prototype.get_b = H.prototype.Jw = function() {
      return Os(this.Zu);
    }, H.prototype.set_b = H.prototype.Hy = function(e) {
      var n = this.Zu;
      e && typeof e == "object" && (e = e.Zu), Ws(n, e);
    }, Object.defineProperty(H.prototype, "b", { get: H.prototype.Jw, set: H.prototype.Hy }), H.prototype.__destroy__ = H.prototype.bv = function() {
      Ls(this.Zu);
    };
    function T() {
      this.Zu = Is(), B(T)[this.Zu] = this;
    }
    T.prototype = Object.create(G.prototype), T.prototype.constructor = T, T.prototype.$u = T, T.av = {}, t.b2ContactEdge = T, T.prototype.get_other = T.prototype.$v = function() {
      return r(qs(this.Zu), s);
    }, T.prototype.set_other = T.prototype.uw = function(e) {
      var n = this.Zu;
      e && typeof e == "object" && (e = e.Zu), ks(n, e);
    }, Object.defineProperty(T.prototype, "other", { get: T.prototype.$v, set: T.prototype.uw }), T.prototype.get_contact = T.prototype.Vw = function() {
      return r(Es(this.Zu), K);
    }, T.prototype.set_contact = T.prototype.Ty = function(e) {
      var n = this.Zu;
      e && typeof e == "object" && (e = e.Zu), zs(n, e);
    }, Object.defineProperty(T.prototype, "contact", { get: T.prototype.Vw, set: T.prototype.Ty }), T.prototype.get_prev = T.prototype.cw = function() {
      return r(Vs(this.Zu), T);
    }, T.prototype.set_prev = T.prototype.xw = function(e) {
      var n = this.Zu;
      e && typeof e == "object" && (e = e.Zu), Us(n, e);
    }, Object.defineProperty(T.prototype, "prev", { get: T.prototype.cw, set: T.prototype.xw }), T.prototype.get_next = T.prototype.Yv = function() {
      return r($s(this.Zu), T);
    }, T.prototype.set_next = T.prototype.sw = function(e) {
      var n = this.Zu;
      e && typeof e == "object" && (e = e.Zu), Ns(n, e);
    }, Object.defineProperty(T.prototype, "next", { get: T.prototype.Yv, set: T.prototype.sw }), T.prototype.__destroy__ = T.prototype.bv = function() {
      Hs(this.Zu);
    };
    function q() {
      throw "cannot construct a b2ContactFeature, no constructor in IDL";
    }
    q.prototype = Object.create(G.prototype), q.prototype.constructor = q, q.prototype.$u = q, q.av = {}, t.b2ContactFeature = q, q.prototype.get_indexA = q.prototype.kx = function() {
      return Qs(this.Zu);
    }, q.prototype.set_indexA = q.prototype.iz = function(e) {
      var n = this.Zu;
      e && typeof e == "object" && (e = e.Zu), Xs(n, e);
    }, Object.defineProperty(q.prototype, "indexA", { get: q.prototype.kx, set: q.prototype.iz }), q.prototype.get_indexB = q.prototype.lx = function() {
      return Ys(this.Zu);
    }, q.prototype.set_indexB = q.prototype.jz = function(e) {
      var n = this.Zu;
      e && typeof e == "object" && (e = e.Zu), Ks(n, e);
    }, Object.defineProperty(q.prototype, "indexB", { get: q.prototype.lx, set: q.prototype.jz }), q.prototype.get_typeA = q.prototype.sy = function() {
      return tc(this.Zu);
    }, q.prototype.set_typeA = q.prototype.rA = function(e) {
      var n = this.Zu;
      e && typeof e == "object" && (e = e.Zu), ec(n, e);
    }, Object.defineProperty(q.prototype, "typeA", { get: q.prototype.sy, set: q.prototype.rA }), q.prototype.get_typeB = q.prototype.ty = function() {
      return nc(this.Zu);
    }, q.prototype.set_typeB = q.prototype.sA = function(e) {
      var n = this.Zu;
      e && typeof e == "object" && (e = e.Zu), oc(n, e);
    }, Object.defineProperty(q.prototype, "typeB", { get: q.prototype.ty, set: q.prototype.sA }), q.prototype.__destroy__ = q.prototype.bv = function() {
      rc(this.Zu);
    };
    function Gt() {
      this.Zu = _c(), B(Gt)[this.Zu] = this;
    }
    Gt.prototype = Object.create(Bt.prototype), Gt.prototype.constructor = Gt, Gt.prototype.$u = Gt, Gt.av = {}, t.JSContactFilter = Gt, Gt.prototype.ShouldCollide = function(e, n) {
      var o = this.Zu;
      return e && typeof e == "object" && (e = e.Zu), n && typeof n == "object" && (n = n.Zu), !!ic(o, e, n);
    }, Gt.prototype.__destroy__ = Gt.prototype.bv = function() {
      pc(this.Zu);
    };
    function ct() {
      throw "cannot construct a b2ContactID, no constructor in IDL";
    }
    ct.prototype = Object.create(G.prototype), ct.prototype.constructor = ct, ct.prototype.$u = ct, ct.av = {}, t.b2ContactID = ct, ct.prototype.get_cf = ct.prototype.Tw = function() {
      return r(uc(this.Zu), q);
    }, ct.prototype.set_cf = ct.prototype.Ry = function(e) {
      var n = this.Zu;
      e && typeof e == "object" && (e = e.Zu), sc(n, e);
    }, Object.defineProperty(ct.prototype, "cf", { get: ct.prototype.Tw, set: ct.prototype.Ry }), ct.prototype.get_key = ct.prototype.rx = function() {
      return cc(this.Zu);
    }, ct.prototype.set_key = ct.prototype.pz = function(e) {
      var n = this.Zu;
      e && typeof e == "object" && (e = e.Zu), ac(n, e);
    }, Object.defineProperty(ct.prototype, "key", { get: ct.prototype.rx, set: ct.prototype.pz }), ct.prototype.__destroy__ = ct.prototype.bv = function() {
      lc(this.Zu);
    };
    function ot() {
      throw "cannot construct a b2ContactImpulse, no constructor in IDL";
    }
    ot.prototype = Object.create(G.prototype), ot.prototype.constructor = ot, ot.prototype.$u = ot, ot.av = {}, t.b2ContactImpulse = ot, ot.prototype.get_normalImpulses = ot.prototype.Tx = function(e) {
      var n = this.Zu;
      return e && typeof e == "object" && (e = e.Zu), yc(n, e);
    }, ot.prototype.set_normalImpulses = ot.prototype.Sz = function(e, n) {
      var o = this.Zu;
      Lt(), e && typeof e == "object" && (e = e.Zu), n && typeof n == "object" && (n = n.Zu), mc(o, e, n);
    }, Object.defineProperty(ot.prototype, "normalImpulses", { get: ot.prototype.Tx, set: ot.prototype.Sz }), ot.prototype.get_tangentImpulses = ot.prototype.py = function(e) {
      var n = this.Zu;
      return e && typeof e == "object" && (e = e.Zu), fc(n, e);
    }, ot.prototype.set_tangentImpulses = ot.prototype.oA = function(e, n) {
      var o = this.Zu;
      Lt(), e && typeof e == "object" && (e = e.Zu), n && typeof n == "object" && (n = n.Zu), dc(o, e, n);
    }, Object.defineProperty(ot.prototype, "tangentImpulses", { get: ot.prototype.py, set: ot.prototype.oA }), ot.prototype.get_count = ot.prototype.Nv = function() {
      return bc(this.Zu);
    }, ot.prototype.set_count = ot.prototype.hw = function(e) {
      var n = this.Zu;
      e && typeof e == "object" && (e = e.Zu), gc(n, e);
    }, Object.defineProperty(ot.prototype, "count", { get: ot.prototype.Nv, set: ot.prototype.hw }), ot.prototype.__destroy__ = ot.prototype.bv = function() {
      hc(this.Zu);
    };
    function Rt() {
      throw "cannot construct a b2DestructionListener, no constructor in IDL";
    }
    Rt.prototype = Object.create(G.prototype), Rt.prototype.constructor = Rt, Rt.prototype.$u = Rt, Rt.av = {}, t.b2DestructionListener = Rt, Rt.prototype.__destroy__ = Rt.prototype.bv = function() {
      Zc(this.Zu);
    };
    function Jt() {
      this.Zu = vc(), B(Jt)[this.Zu] = this;
    }
    Jt.prototype = Object.create(xt.prototype), Jt.prototype.constructor = Jt, Jt.prototype.$u = Jt, Jt.av = {}, t.JSDestructionListener = Jt, Jt.prototype.SayGoodbyeJoint = function(e) {
      var n = this.Zu;
      e && typeof e == "object" && (e = e.Zu), Jc(n, e);
    }, Jt.prototype.SayGoodbyeFixture = function(e) {
      var n = this.Zu;
      e && typeof e == "object" && (e = e.Zu), Dc(n, e);
    }, Jt.prototype.__destroy__ = Jt.prototype.bv = function() {
      jc(this.Zu);
    };
    function X() {
      throw "cannot construct a b2DistanceJoint, no constructor in IDL";
    }
    X.prototype = Object.create(x.prototype), X.prototype.constructor = X, X.prototype.$u = X, X.av = {}, t.b2DistanceJoint = X, X.prototype.GetLocalAnchorA = function() {
      return r(Sc(this.Zu), i);
    }, X.prototype.GetLocalAnchorB = function() {
      return r(Gc(this.Zu), i);
    }, X.prototype.GetLength = function() {
      return Ac(this.Zu);
    }, X.prototype.SetLength = function(e) {
      var n = this.Zu;
      e && typeof e == "object" && (e = e.Zu), Cc(n, e);
    }, X.prototype.GetMinLength = function() {
      return Pc(this.Zu);
    }, X.prototype.SetMinLength = function(e) {
      var n = this.Zu;
      e && typeof e == "object" && (e = e.Zu), Bc(n, e);
    }, X.prototype.GetMaxLength = function() {
      return xc(this.Zu);
    }, X.prototype.SetMaxLength = function(e) {
      var n = this.Zu;
      e && typeof e == "object" && (e = e.Zu), Mc(n, e);
    }, X.prototype.GetCurrentLength = function() {
      return wc(this.Zu);
    }, X.prototype.SetStiffness = function(e) {
      var n = this.Zu;
      e && typeof e == "object" && (e = e.Zu), Rc(n, e);
    }, X.prototype.GetStiffness = function() {
      return Fc(this.Zu);
    }, X.prototype.SetDamping = function(e) {
      var n = this.Zu;
      e && typeof e == "object" && (e = e.Zu), Tc(n, e);
    }, X.prototype.GetDamping = function() {
      return Oc(this.Zu);
    }, X.prototype.GetType = function() {
      return Wc(this.Zu);
    }, X.prototype.GetBodyA = function() {
      return r(Lc(this.Zu), s);
    }, X.prototype.GetBodyB = function() {
      return r(Ic(this.Zu), s);
    }, X.prototype.GetAnchorA = function() {
      return r(qc(this.Zu), i);
    }, X.prototype.GetAnchorB = function() {
      return r(kc(this.Zu), i);
    }, X.prototype.GetReactionForce = function(e) {
      var n = this.Zu;
      return e && typeof e == "object" && (e = e.Zu), r(Ec(n, e), i);
    }, X.prototype.GetReactionTorque = function(e) {
      var n = this.Zu;
      return e && typeof e == "object" && (e = e.Zu), zc(n, e);
    }, X.prototype.GetNext = function() {
      return r(Vc(this.Zu), x);
    }, X.prototype.GetUserData = function() {
      return r(Uc(this.Zu), I);
    }, X.prototype.GetCollideConnected = function() {
      return !!$c(this.Zu);
    }, X.prototype.__destroy__ = X.prototype.bv = function() {
      Nc(this.Zu);
    };
    function y() {
      this.Zu = Hc(), B(y)[this.Zu] = this;
    }
    y.prototype = Object.create(A.prototype), y.prototype.constructor = y, y.prototype.$u = y, y.av = {}, t.b2DistanceJointDef = y, y.prototype.Initialize = function(e, n, o, _) {
      var l = this.Zu;
      e && typeof e == "object" && (e = e.Zu), n && typeof n == "object" && (n = n.Zu), o && typeof o == "object" && (o = o.Zu), _ && typeof _ == "object" && (_ = _.Zu), Qc(l, e, n, o, _);
    }, y.prototype.get_localAnchorA = y.prototype.nv = function() {
      return r(Xc(this.Zu), i);
    }, y.prototype.set_localAnchorA = y.prototype.pv = function(e) {
      var n = this.Zu;
      e && typeof e == "object" && (e = e.Zu), Yc(n, e);
    }, Object.defineProperty(y.prototype, "localAnchorA", { get: y.prototype.nv, set: y.prototype.pv }), y.prototype.get_localAnchorB = y.prototype.ov = function() {
      return r(Kc(this.Zu), i);
    }, y.prototype.set_localAnchorB = y.prototype.qv = function(e) {
      var n = this.Zu;
      e && typeof e == "object" && (e = e.Zu), ta(n, e);
    }, Object.defineProperty(y.prototype, "localAnchorB", { get: y.prototype.ov, set: y.prototype.qv }), y.prototype.get_length = y.prototype.sx = function() {
      return ea(this.Zu);
    }, y.prototype.set_length = y.prototype.qz = function(e) {
      var n = this.Zu;
      e && typeof e == "object" && (e = e.Zu), na(n, e);
    }, Object.defineProperty(y.prototype, "length", { get: y.prototype.sx, set: y.prototype.qz }), y.prototype.get_minLength = y.prototype.Rx = function() {
      return oa(this.Zu);
    }, y.prototype.set_minLength = y.prototype.Qz = function(e) {
      var n = this.Zu;
      e && typeof e == "object" && (e = e.Zu), ra(n, e);
    }, Object.defineProperty(y.prototype, "minLength", { get: y.prototype.Rx, set: y.prototype.Qz }), y.prototype.get_maxLength = y.prototype.Px = function() {
      return _a(this.Zu);
    }, y.prototype.set_maxLength = y.prototype.Oz = function(e) {
      var n = this.Zu;
      e && typeof e == "object" && (e = e.Zu), ia(n, e);
    }, Object.defineProperty(y.prototype, "maxLength", { get: y.prototype.Px, set: y.prototype.Oz }), y.prototype.get_stiffness = y.prototype.xv = function() {
      return pa(this.Zu);
    }, y.prototype.set_stiffness = y.prototype.yv = function(e) {
      var n = this.Zu;
      e && typeof e == "object" && (e = e.Zu), ua(n, e);
    }, Object.defineProperty(y.prototype, "stiffness", { get: y.prototype.xv, set: y.prototype.yv }), y.prototype.get_damping = y.prototype.rv = function() {
      return sa(this.Zu);
    }, y.prototype.set_damping = y.prototype.uv = function(e) {
      var n = this.Zu;
      e && typeof e == "object" && (e = e.Zu), ca(n, e);
    }, Object.defineProperty(y.prototype, "damping", { get: y.prototype.rv, set: y.prototype.uv }), y.prototype.get_type = y.prototype.cv = function() {
      return aa(this.Zu);
    }, y.prototype.set_type = y.prototype.ev = function(e) {
      var n = this.Zu;
      e && typeof e == "object" && (e = e.Zu), la(n, e);
    }, Object.defineProperty(y.prototype, "type", { get: y.prototype.cv, set: y.prototype.ev }), y.prototype.get_userData = y.prototype.dv = function() {
      return r(ya(this.Zu), I);
    }, y.prototype.set_userData = y.prototype.fv = function(e) {
      var n = this.Zu;
      e && typeof e == "object" && (e = e.Zu), ma(n, e);
    }, Object.defineProperty(y.prototype, "userData", { get: y.prototype.dv, set: y.prototype.fv }), y.prototype.get_bodyA = y.prototype.gv = function() {
      return r(fa(this.Zu), s);
    }, y.prototype.set_bodyA = y.prototype.kv = function(e) {
      var n = this.Zu;
      e && typeof e == "object" && (e = e.Zu), da(n, e);
    }, Object.defineProperty(y.prototype, "bodyA", { get: y.prototype.gv, set: y.prototype.kv }), y.prototype.get_bodyB = y.prototype.hv = function() {
      return r(ba(this.Zu), s);
    }, y.prototype.set_bodyB = y.prototype.lv = function(e) {
      var n = this.Zu;
      e && typeof e == "object" && (e = e.Zu), ga(n, e);
    }, Object.defineProperty(y.prototype, "bodyB", { get: y.prototype.hv, set: y.prototype.lv }), y.prototype.get_collideConnected = y.prototype.jv = function() {
      return !!ha(this.Zu);
    }, y.prototype.set_collideConnected = y.prototype.mv = function(e) {
      var n = this.Zu;
      e && typeof e == "object" && (e = e.Zu), Za(n, e);
    }, Object.defineProperty(y.prototype, "collideConnected", { get: y.prototype.jv, set: y.prototype.mv }), y.prototype.__destroy__ = y.prototype.bv = function() {
      va(this.Zu);
    };
    function bt() {
      this.Zu = Ja(), B(bt)[this.Zu] = this;
    }
    bt.prototype = Object.create(ht.prototype), bt.prototype.constructor = bt, bt.prototype.$u = bt, bt.av = {}, t.JSDraw = bt, bt.prototype.DrawPolygon = function(e, n, o) {
      var _ = this.Zu;
      e && typeof e == "object" && (e = e.Zu), n && typeof n == "object" && (n = n.Zu), o && typeof o == "object" && (o = o.Zu), Da(_, e, n, o);
    }, bt.prototype.DrawSolidPolygon = function(e, n, o) {
      var _ = this.Zu;
      e && typeof e == "object" && (e = e.Zu), n && typeof n == "object" && (n = n.Zu), o && typeof o == "object" && (o = o.Zu), ja(_, e, n, o);
    }, bt.prototype.DrawCircle = function(e, n, o) {
      var _ = this.Zu;
      e && typeof e == "object" && (e = e.Zu), n && typeof n == "object" && (n = n.Zu), o && typeof o == "object" && (o = o.Zu), Sa(_, e, n, o);
    }, bt.prototype.DrawSolidCircle = function(e, n, o, _) {
      var l = this.Zu;
      e && typeof e == "object" && (e = e.Zu), n && typeof n == "object" && (n = n.Zu), o && typeof o == "object" && (o = o.Zu), _ && typeof _ == "object" && (_ = _.Zu), Ga(l, e, n, o, _);
    }, bt.prototype.DrawSegment = function(e, n, o) {
      var _ = this.Zu;
      e && typeof e == "object" && (e = e.Zu), n && typeof n == "object" && (n = n.Zu), o && typeof o == "object" && (o = o.Zu), Aa(_, e, n, o);
    }, bt.prototype.DrawTransform = function(e) {
      var n = this.Zu;
      e && typeof e == "object" && (e = e.Zu), Ca(n, e);
    }, bt.prototype.DrawPoint = function(e, n, o) {
      var _ = this.Zu;
      e && typeof e == "object" && (e = e.Zu), n && typeof n == "object" && (n = n.Zu), o && typeof o == "object" && (o = o.Zu), Pa(_, e, n, o);
    }, bt.prototype.__destroy__ = bt.prototype.bv = function() {
      Ba(this.Zu);
    };
    function at() {
      throw "cannot construct a b2FrictionJoint, no constructor in IDL";
    }
    at.prototype = Object.create(x.prototype), at.prototype.constructor = at, at.prototype.$u = at, at.av = {}, t.b2FrictionJoint = at, at.prototype.GetLocalAnchorA = function() {
      return r(xa(this.Zu), i);
    }, at.prototype.GetLocalAnchorB = function() {
      return r(Ma(this.Zu), i);
    }, at.prototype.SetMaxForce = function(e) {
      var n = this.Zu;
      e && typeof e == "object" && (e = e.Zu), wa(n, e);
    }, at.prototype.GetMaxForce = function() {
      return Ra(this.Zu);
    }, at.prototype.SetMaxTorque = function(e) {
      var n = this.Zu;
      e && typeof e == "object" && (e = e.Zu), Fa(n, e);
    }, at.prototype.GetMaxTorque = function() {
      return Ta(this.Zu);
    }, at.prototype.GetType = function() {
      return Oa(this.Zu);
    }, at.prototype.GetBodyA = function() {
      return r(Wa(this.Zu), s);
    }, at.prototype.GetBodyB = function() {
      return r(La(this.Zu), s);
    }, at.prototype.GetAnchorA = function() {
      return r(Ia(this.Zu), i);
    }, at.prototype.GetAnchorB = function() {
      return r(qa(this.Zu), i);
    }, at.prototype.GetReactionForce = function(e) {
      var n = this.Zu;
      return e && typeof e == "object" && (e = e.Zu), r(ka(n, e), i);
    }, at.prototype.GetReactionTorque = function(e) {
      var n = this.Zu;
      return e && typeof e == "object" && (e = e.Zu), Ea(n, e);
    }, at.prototype.GetNext = function() {
      return r(za(this.Zu), x);
    }, at.prototype.GetUserData = function() {
      return r(Va(this.Zu), I);
    }, at.prototype.GetCollideConnected = function() {
      return !!Ua(this.Zu);
    }, at.prototype.__destroy__ = at.prototype.bv = function() {
      $a(this.Zu);
    };
    function g() {
      this.Zu = Na(), B(g)[this.Zu] = this;
    }
    g.prototype = Object.create(A.prototype), g.prototype.constructor = g, g.prototype.$u = g, g.av = {}, t.b2FrictionJointDef = g, g.prototype.Initialize = function(e, n, o) {
      var _ = this.Zu;
      e && typeof e == "object" && (e = e.Zu), n && typeof n == "object" && (n = n.Zu), o && typeof o == "object" && (o = o.Zu), Ha(_, e, n, o);
    }, g.prototype.get_localAnchorA = g.prototype.nv = function() {
      return r(Qa(this.Zu), i);
    }, g.prototype.set_localAnchorA = g.prototype.pv = function(e) {
      var n = this.Zu;
      e && typeof e == "object" && (e = e.Zu), Xa(n, e);
    }, Object.defineProperty(g.prototype, "localAnchorA", { get: g.prototype.nv, set: g.prototype.pv }), g.prototype.get_localAnchorB = g.prototype.ov = function() {
      return r(Ya(this.Zu), i);
    }, g.prototype.set_localAnchorB = g.prototype.qv = function(e) {
      var n = this.Zu;
      e && typeof e == "object" && (e = e.Zu), Ka(n, e);
    }, Object.defineProperty(g.prototype, "localAnchorB", { get: g.prototype.ov, set: g.prototype.qv }), g.prototype.get_maxForce = g.prototype.Bv = function() {
      return tl(this.Zu);
    }, g.prototype.set_maxForce = g.prototype.Hv = function(e) {
      var n = this.Zu;
      e && typeof e == "object" && (e = e.Zu), el(n, e);
    }, Object.defineProperty(g.prototype, "maxForce", { get: g.prototype.Bv, set: g.prototype.Hv }), g.prototype.get_maxTorque = g.prototype.Xv = function() {
      return nl(this.Zu);
    }, g.prototype.set_maxTorque = g.prototype.rw = function(e) {
      var n = this.Zu;
      e && typeof e == "object" && (e = e.Zu), ol(n, e);
    }, Object.defineProperty(g.prototype, "maxTorque", { get: g.prototype.Xv, set: g.prototype.rw }), g.prototype.get_type = g.prototype.cv = function() {
      return rl(this.Zu);
    }, g.prototype.set_type = g.prototype.ev = function(e) {
      var n = this.Zu;
      e && typeof e == "object" && (e = e.Zu), _l(n, e);
    }, Object.defineProperty(g.prototype, "type", { get: g.prototype.cv, set: g.prototype.ev }), g.prototype.get_userData = g.prototype.dv = function() {
      return r(il(this.Zu), I);
    }, g.prototype.set_userData = g.prototype.fv = function(e) {
      var n = this.Zu;
      e && typeof e == "object" && (e = e.Zu), pl(n, e);
    }, Object.defineProperty(g.prototype, "userData", { get: g.prototype.dv, set: g.prototype.fv }), g.prototype.get_bodyA = g.prototype.gv = function() {
      return r(ul(this.Zu), s);
    }, g.prototype.set_bodyA = g.prototype.kv = function(e) {
      var n = this.Zu;
      e && typeof e == "object" && (e = e.Zu), sl(n, e);
    }, Object.defineProperty(g.prototype, "bodyA", { get: g.prototype.gv, set: g.prototype.kv }), g.prototype.get_bodyB = g.prototype.hv = function() {
      return r(cl(this.Zu), s);
    }, g.prototype.set_bodyB = g.prototype.lv = function(e) {
      var n = this.Zu;
      e && typeof e == "object" && (e = e.Zu), al(n, e);
    }, Object.defineProperty(g.prototype, "bodyB", { get: g.prototype.hv, set: g.prototype.lv }), g.prototype.get_collideConnected = g.prototype.jv = function() {
      return !!ll(this.Zu);
    }, g.prototype.set_collideConnected = g.prototype.mv = function(e) {
      var n = this.Zu;
      e && typeof e == "object" && (e = e.Zu), yl(n, e);
    }, Object.defineProperty(g.prototype, "collideConnected", { get: g.prototype.jv, set: g.prototype.mv }), g.prototype.__destroy__ = g.prototype.bv = function() {
      ml(this.Zu);
    };
    function yt() {
      throw "cannot construct a b2GearJoint, no constructor in IDL";
    }
    yt.prototype = Object.create(x.prototype), yt.prototype.constructor = yt, yt.prototype.$u = yt, yt.av = {}, t.b2GearJoint = yt, yt.prototype.GetJoint1 = function() {
      return r(fl(this.Zu), x);
    }, yt.prototype.GetJoint2 = function() {
      return r(dl(this.Zu), x);
    }, yt.prototype.SetRatio = function(e) {
      var n = this.Zu;
      e && typeof e == "object" && (e = e.Zu), bl(n, e);
    }, yt.prototype.GetRatio = function() {
      return gl(this.Zu);
    }, yt.prototype.GetType = function() {
      return hl(this.Zu);
    }, yt.prototype.GetBodyA = function() {
      return r(Zl(this.Zu), s);
    }, yt.prototype.GetBodyB = function() {
      return r(vl(this.Zu), s);
    }, yt.prototype.GetAnchorA = function() {
      return r(Jl(this.Zu), i);
    }, yt.prototype.GetAnchorB = function() {
      return r(Dl(this.Zu), i);
    }, yt.prototype.GetReactionForce = function(e) {
      var n = this.Zu;
      return e && typeof e == "object" && (e = e.Zu), r(jl(n, e), i);
    }, yt.prototype.GetReactionTorque = function(e) {
      var n = this.Zu;
      return e && typeof e == "object" && (e = e.Zu), Sl(n, e);
    }, yt.prototype.GetNext = function() {
      return r(Gl(this.Zu), x);
    }, yt.prototype.GetUserData = function() {
      return r(Al(this.Zu), I);
    }, yt.prototype.GetCollideConnected = function() {
      return !!Cl(this.Zu);
    }, yt.prototype.__destroy__ = yt.prototype.bv = function() {
      Pl(this.Zu);
    };
    function J() {
      this.Zu = Bl(), B(J)[this.Zu] = this;
    }
    J.prototype = Object.create(A.prototype), J.prototype.constructor = J, J.prototype.$u = J, J.av = {}, t.b2GearJointDef = J, J.prototype.get_joint1 = J.prototype.px = function() {
      return r(xl(this.Zu), x);
    }, J.prototype.set_joint1 = J.prototype.nz = function(e) {
      var n = this.Zu;
      e && typeof e == "object" && (e = e.Zu), Ml(n, e);
    }, Object.defineProperty(J.prototype, "joint1", { get: J.prototype.px, set: J.prototype.nz }), J.prototype.get_joint2 = J.prototype.qx = function() {
      return r(wl(this.Zu), x);
    }, J.prototype.set_joint2 = J.prototype.oz = function(e) {
      var n = this.Zu;
      e && typeof e == "object" && (e = e.Zu), Rl(n, e);
    }, Object.defineProperty(J.prototype, "joint2", { get: J.prototype.qx, set: J.prototype.oz }), J.prototype.get_ratio = J.prototype.dw = function() {
      return Fl(this.Zu);
    }, J.prototype.set_ratio = J.prototype.yw = function(e) {
      var n = this.Zu;
      e && typeof e == "object" && (e = e.Zu), Tl(n, e);
    }, Object.defineProperty(J.prototype, "ratio", { get: J.prototype.dw, set: J.prototype.yw }), J.prototype.get_type = J.prototype.cv = function() {
      return Ol(this.Zu);
    }, J.prototype.set_type = J.prototype.ev = function(e) {
      var n = this.Zu;
      e && typeof e == "object" && (e = e.Zu), Wl(n, e);
    }, Object.defineProperty(J.prototype, "type", { get: J.prototype.cv, set: J.prototype.ev }), J.prototype.get_userData = J.prototype.dv = function() {
      return r(Ll(this.Zu), I);
    }, J.prototype.set_userData = J.prototype.fv = function(e) {
      var n = this.Zu;
      e && typeof e == "object" && (e = e.Zu), Il(n, e);
    }, Object.defineProperty(J.prototype, "userData", { get: J.prototype.dv, set: J.prototype.fv }), J.prototype.get_bodyA = J.prototype.gv = function() {
      return r(ql(this.Zu), s);
    }, J.prototype.set_bodyA = J.prototype.kv = function(e) {
      var n = this.Zu;
      e && typeof e == "object" && (e = e.Zu), kl(n, e);
    }, Object.defineProperty(J.prototype, "bodyA", { get: J.prototype.gv, set: J.prototype.kv }), J.prototype.get_bodyB = J.prototype.hv = function() {
      return r(El(this.Zu), s);
    }, J.prototype.set_bodyB = J.prototype.lv = function(e) {
      var n = this.Zu;
      e && typeof e == "object" && (e = e.Zu), zl(n, e);
    }, Object.defineProperty(J.prototype, "bodyB", { get: J.prototype.hv, set: J.prototype.lv }), J.prototype.get_collideConnected = J.prototype.jv = function() {
      return !!Vl(this.Zu);
    }, J.prototype.set_collideConnected = J.prototype.mv = function(e) {
      var n = this.Zu;
      e && typeof e == "object" && (e = e.Zu), Ul(n, e);
    }, Object.defineProperty(J.prototype, "collideConnected", { get: J.prototype.jv, set: J.prototype.mv }), J.prototype.__destroy__ = J.prototype.bv = function() {
      $l(this.Zu);
    };
    function O() {
      this.Zu = Nl(), B(O)[this.Zu] = this;
    }
    O.prototype = Object.create(G.prototype), O.prototype.constructor = O, O.prototype.$u = O, O.av = {}, t.b2JointEdge = O, O.prototype.get_other = O.prototype.$v = function() {
      return r(Hl(this.Zu), s);
    }, O.prototype.set_other = O.prototype.uw = function(e) {
      var n = this.Zu;
      e && typeof e == "object" && (e = e.Zu), Ql(n, e);
    }, Object.defineProperty(O.prototype, "other", { get: O.prototype.$v, set: O.prototype.uw }), O.prototype.get_joint = O.prototype.ox = function() {
      return r(Xl(this.Zu), x);
    }, O.prototype.set_joint = O.prototype.mz = function(e) {
      var n = this.Zu;
      e && typeof e == "object" && (e = e.Zu), Yl(n, e);
    }, Object.defineProperty(O.prototype, "joint", { get: O.prototype.ox, set: O.prototype.mz }), O.prototype.get_prev = O.prototype.cw = function() {
      return r(Kl(this.Zu), O);
    }, O.prototype.set_prev = O.prototype.xw = function(e) {
      var n = this.Zu;
      e && typeof e == "object" && (e = e.Zu), ty(n, e);
    }, Object.defineProperty(O.prototype, "prev", { get: O.prototype.cw, set: O.prototype.xw }), O.prototype.get_next = O.prototype.Yv = function() {
      return r(ey(this.Zu), O);
    }, O.prototype.set_next = O.prototype.sw = function(e) {
      var n = this.Zu;
      e && typeof e == "object" && (e = e.Zu), ny(n, e);
    }, Object.defineProperty(O.prototype, "next", { get: O.prototype.Yv, set: O.prototype.sw }), O.prototype.__destroy__ = O.prototype.bv = function() {
      oy(this.Zu);
    };
    function M() {
      this.Zu = ry(), B(M)[this.Zu] = this;
    }
    M.prototype = Object.create(G.prototype), M.prototype.constructor = M, M.prototype.$u = M, M.av = {}, t.b2Manifold = M, M.prototype.get_points = M.prototype.aw = function(e) {
      var n = this.Zu;
      return e && typeof e == "object" && (e = e.Zu), r(_y(n, e), W);
    }, M.prototype.set_points = M.prototype.vw = function(e, n) {
      var o = this.Zu;
      Lt(), e && typeof e == "object" && (e = e.Zu), n && typeof n == "object" && (n = n.Zu), iy(o, e, n);
    }, Object.defineProperty(M.prototype, "points", { get: M.prototype.aw, set: M.prototype.vw }), M.prototype.get_localNormal = M.prototype.yx = function() {
      return r(py(this.Zu), i);
    }, M.prototype.set_localNormal = M.prototype.xz = function(e) {
      var n = this.Zu;
      e && typeof e == "object" && (e = e.Zu), uy(n, e);
    }, Object.defineProperty(M.prototype, "localNormal", { get: M.prototype.yx, set: M.prototype.xz }), M.prototype.get_localPoint = M.prototype.Sv = function() {
      return r(sy(this.Zu), i);
    }, M.prototype.set_localPoint = M.prototype.mw = function(e) {
      var n = this.Zu;
      e && typeof e == "object" && (e = e.Zu), cy(n, e);
    }, Object.defineProperty(M.prototype, "localPoint", { get: M.prototype.Sv, set: M.prototype.mw }), M.prototype.get_type = M.prototype.cv = function() {
      return ay(this.Zu);
    }, M.prototype.set_type = M.prototype.ev = function(e) {
      var n = this.Zu;
      e && typeof e == "object" && (e = e.Zu), ly(n, e);
    }, Object.defineProperty(M.prototype, "type", { get: M.prototype.cv, set: M.prototype.ev }), M.prototype.get_pointCount = M.prototype.Xx = function() {
      return yy(this.Zu);
    }, M.prototype.set_pointCount = M.prototype.Wz = function(e) {
      var n = this.Zu;
      e && typeof e == "object" && (e = e.Zu), my(n, e);
    }, Object.defineProperty(M.prototype, "pointCount", { get: M.prototype.Xx, set: M.prototype.Wz }), M.prototype.__destroy__ = M.prototype.bv = function() {
      fy(this.Zu);
    };
    function Y() {
      this.Zu = dy(), B(Y)[this.Zu] = this;
    }
    Y.prototype = Object.create(G.prototype), Y.prototype.constructor = Y, Y.prototype.$u = Y, Y.av = {}, t.b2WorldManifold = Y, Y.prototype.Initialize = function(e, n, o, _, l) {
      var U = this.Zu;
      e && typeof e == "object" && (e = e.Zu), n && typeof n == "object" && (n = n.Zu), o && typeof o == "object" && (o = o.Zu), _ && typeof _ == "object" && (_ = _.Zu), l && typeof l == "object" && (l = l.Zu), by(U, e, n, o, _, l);
    }, Y.prototype.get_normal = Y.prototype.Zv = function() {
      return r(gy(this.Zu), i);
    }, Y.prototype.set_normal = Y.prototype.tw = function(e) {
      var n = this.Zu;
      e && typeof e == "object" && (e = e.Zu), hy(n, e);
    }, Object.defineProperty(Y.prototype, "normal", { get: Y.prototype.Zv, set: Y.prototype.tw }), Y.prototype.get_points = Y.prototype.aw = function(e) {
      var n = this.Zu;
      return e && typeof e == "object" && (e = e.Zu), r(Zy(n, e), i);
    }, Y.prototype.set_points = Y.prototype.vw = function(e, n) {
      var o = this.Zu;
      Lt(), e && typeof e == "object" && (e = e.Zu), n && typeof n == "object" && (n = n.Zu), vy(o, e, n);
    }, Object.defineProperty(Y.prototype, "points", { get: Y.prototype.aw, set: Y.prototype.vw }), Y.prototype.get_separations = Y.prototype.cy = function(e) {
      var n = this.Zu;
      return e && typeof e == "object" && (e = e.Zu), Jy(n, e);
    }, Y.prototype.set_separations = Y.prototype.bA = function(e, n) {
      var o = this.Zu;
      Lt(), e && typeof e == "object" && (e = e.Zu), n && typeof n == "object" && (n = n.Zu), Dy(o, e, n);
    }, Object.defineProperty(Y.prototype, "separations", { get: Y.prototype.cy, set: Y.prototype.bA }), Y.prototype.__destroy__ = Y.prototype.bv = function() {
      jy(this.Zu);
    };
    function W() {
      this.Zu = Sy(), B(W)[this.Zu] = this;
    }
    W.prototype = Object.create(G.prototype), W.prototype.constructor = W, W.prototype.$u = W, W.av = {}, t.b2ManifoldPoint = W, W.prototype.get_localPoint = W.prototype.Sv = function() {
      return r(Gy(this.Zu), i);
    }, W.prototype.set_localPoint = W.prototype.mw = function(e) {
      var n = this.Zu;
      e && typeof e == "object" && (e = e.Zu), Ay(n, e);
    }, Object.defineProperty(W.prototype, "localPoint", { get: W.prototype.Sv, set: W.prototype.mw }), W.prototype.get_normalImpulse = W.prototype.Sx = function() {
      return Cy(this.Zu);
    }, W.prototype.set_normalImpulse = W.prototype.Rz = function(e) {
      var n = this.Zu;
      e && typeof e == "object" && (e = e.Zu), Py(n, e);
    }, Object.defineProperty(W.prototype, "normalImpulse", { get: W.prototype.Sx, set: W.prototype.Rz }), W.prototype.get_tangentImpulse = W.prototype.oy = function() {
      return By(this.Zu);
    }, W.prototype.set_tangentImpulse = W.prototype.nA = function(e) {
      var n = this.Zu;
      e && typeof e == "object" && (e = e.Zu), xy(n, e);
    }, Object.defineProperty(W.prototype, "tangentImpulse", { get: W.prototype.oy, set: W.prototype.nA }), W.prototype.get_id = W.prototype.Qv = function() {
      return r(My(this.Zu), ct);
    }, W.prototype.set_id = W.prototype.kw = function(e) {
      var n = this.Zu;
      e && typeof e == "object" && (e = e.Zu), wy(n, e);
    }, Object.defineProperty(W.prototype, "id", { get: W.prototype.Qv, set: W.prototype.kw }), W.prototype.__destroy__ = W.prototype.bv = function() {
      Ry(this.Zu);
    };
    function et(e, n, o, _) {
      e && typeof e == "object" && (e = e.Zu), n && typeof n == "object" && (n = n.Zu), o && typeof o == "object" && (o = o.Zu), _ && typeof _ == "object" && (_ = _.Zu), this.Zu = e === void 0 ? Fy() : n === void 0 ? _emscripten_bind_b2Mat22_b2Mat22_1(e) : o === void 0 ? Ty(e, n) : _ === void 0 ? _emscripten_bind_b2Mat22_b2Mat22_3(e, n, o) : Oy(e, n, o, _), B(et)[this.Zu] = this;
    }
    et.prototype = Object.create(G.prototype), et.prototype.constructor = et, et.prototype.$u = et, et.av = {}, t.b2Mat22 = et, et.prototype.Set = et.prototype.Set = function(e, n) {
      var o = this.Zu;
      e && typeof e == "object" && (e = e.Zu), n && typeof n == "object" && (n = n.Zu), Wy(o, e, n);
    }, et.prototype.SetIdentity = function() {
      Ly(this.Zu);
    }, et.prototype.SetZero = function() {
      Iy(this.Zu);
    }, et.prototype.GetInverse = function() {
      return r(qy(this.Zu), et);
    }, et.prototype.Solve = function(e) {
      var n = this.Zu;
      return e && typeof e == "object" && (e = e.Zu), r(ky(n, e), i);
    }, et.prototype.get_ex = et.prototype.Ov = function() {
      return r(Ey(this.Zu), i);
    }, et.prototype.set_ex = et.prototype.iw = function(e) {
      var n = this.Zu;
      e && typeof e == "object" && (e = e.Zu), zy(n, e);
    }, Object.defineProperty(et.prototype, "ex", { get: et.prototype.Ov, set: et.prototype.iw }), et.prototype.get_ey = et.prototype.Pv = function() {
      return r(Vy(this.Zu), i);
    }, et.prototype.set_ey = et.prototype.jw = function(e) {
      var n = this.Zu;
      e && typeof e == "object" && (e = e.Zu), Uy(n, e);
    }, Object.defineProperty(et.prototype, "ey", { get: et.prototype.Pv, set: et.prototype.jw }), et.prototype.__destroy__ = et.prototype.bv = function() {
      $y(this.Zu);
    };
    function z(e, n, o) {
      e && typeof e == "object" && (e = e.Zu), n && typeof n == "object" && (n = n.Zu), o && typeof o == "object" && (o = o.Zu), this.Zu = e === void 0 ? Ny() : n === void 0 ? _emscripten_bind_b2Mat33_b2Mat33_1(e) : o === void 0 ? _emscripten_bind_b2Mat33_b2Mat33_2(e, n) : Hy(e, n, o), B(z)[this.Zu] = this;
    }
    z.prototype = Object.create(G.prototype), z.prototype.constructor = z, z.prototype.$u = z, z.av = {}, t.b2Mat33 = z, z.prototype.SetZero = function() {
      Qy(this.Zu);
    }, z.prototype.Solve33 = function(e) {
      var n = this.Zu;
      return e && typeof e == "object" && (e = e.Zu), r(Xy(n, e), F);
    }, z.prototype.Solve22 = function(e) {
      var n = this.Zu;
      return e && typeof e == "object" && (e = e.Zu), r(Yy(n, e), i);
    }, z.prototype.GetInverse22 = function(e) {
      var n = this.Zu;
      e && typeof e == "object" && (e = e.Zu), Ky(n, e);
    }, z.prototype.GetSymInverse33 = function(e) {
      var n = this.Zu;
      e && typeof e == "object" && (e = e.Zu), tm(n, e);
    }, z.prototype.get_ex = z.prototype.Ov = function() {
      return r(em(this.Zu), F);
    }, z.prototype.set_ex = z.prototype.iw = function(e) {
      var n = this.Zu;
      e && typeof e == "object" && (e = e.Zu), nm(n, e);
    }, Object.defineProperty(z.prototype, "ex", { get: z.prototype.Ov, set: z.prototype.iw }), z.prototype.get_ey = z.prototype.Pv = function() {
      return r(om(this.Zu), F);
    }, z.prototype.set_ey = z.prototype.jw = function(e) {
      var n = this.Zu;
      e && typeof e == "object" && (e = e.Zu), rm(n, e);
    }, Object.defineProperty(z.prototype, "ey", { get: z.prototype.Pv, set: z.prototype.jw }), z.prototype.get_ez = z.prototype.Zw = function() {
      return r(_m(this.Zu), F);
    }, z.prototype.set_ez = z.prototype.Xy = function(e) {
      var n = this.Zu;
      e && typeof e == "object" && (e = e.Zu), im(n, e);
    }, Object.defineProperty(z.prototype, "ez", { get: z.prototype.Zw, set: z.prototype.Xy }), z.prototype.__destroy__ = z.prototype.bv = function() {
      pm(this.Zu);
    };
    function ut() {
      throw "cannot construct a b2MouseJoint, no constructor in IDL";
    }
    ut.prototype = Object.create(x.prototype), ut.prototype.constructor = ut, ut.prototype.$u = ut, ut.av = {}, t.b2MouseJoint = ut, ut.prototype.SetTarget = function(e) {
      var n = this.Zu;
      e && typeof e == "object" && (e = e.Zu), um(n, e);
    }, ut.prototype.GetTarget = function() {
      return r(sm(this.Zu), i);
    }, ut.prototype.SetMaxForce = function(e) {
      var n = this.Zu;
      e && typeof e == "object" && (e = e.Zu), cm(n, e);
    }, ut.prototype.GetMaxForce = function() {
      return am(this.Zu);
    }, ut.prototype.SetStiffness = function(e) {
      var n = this.Zu;
      e && typeof e == "object" && (e = e.Zu), lm(n, e);
    }, ut.prototype.GetStiffness = function() {
      return ym(this.Zu);
    }, ut.prototype.SetDamping = function(e) {
      var n = this.Zu;
      e && typeof e == "object" && (e = e.Zu), mm(n, e);
    }, ut.prototype.GetDamping = function() {
      return fm(this.Zu);
    }, ut.prototype.GetType = function() {
      return dm(this.Zu);
    }, ut.prototype.GetBodyA = function() {
      return r(bm(this.Zu), s);
    }, ut.prototype.GetBodyB = function() {
      return r(gm(this.Zu), s);
    }, ut.prototype.GetAnchorA = function() {
      return r(hm(this.Zu), i);
    }, ut.prototype.GetAnchorB = function() {
      return r(Zm(this.Zu), i);
    }, ut.prototype.GetReactionForce = function(e) {
      var n = this.Zu;
      return e && typeof e == "object" && (e = e.Zu), r(vm(n, e), i);
    }, ut.prototype.GetReactionTorque = function(e) {
      var n = this.Zu;
      return e && typeof e == "object" && (e = e.Zu), Jm(n, e);
    }, ut.prototype.GetNext = function() {
      return r(Dm(this.Zu), x);
    }, ut.prototype.GetUserData = function() {
      return r(jm(this.Zu), I);
    }, ut.prototype.GetCollideConnected = function() {
      return !!Sm(this.Zu);
    }, ut.prototype.__destroy__ = ut.prototype.bv = function() {
      Gm(this.Zu);
    };
    function h() {
      this.Zu = Am(), B(h)[this.Zu] = this;
    }
    h.prototype = Object.create(A.prototype), h.prototype.constructor = h, h.prototype.$u = h, h.av = {}, t.b2MouseJointDef = h, h.prototype.get_target = h.prototype.qy = function() {
      return r(Cm(this.Zu), i);
    }, h.prototype.set_target = h.prototype.pA = function(e) {
      var n = this.Zu;
      e && typeof e == "object" && (e = e.Zu), Pm(n, e);
    }, Object.defineProperty(h.prototype, "target", { get: h.prototype.qy, set: h.prototype.pA }), h.prototype.get_maxForce = h.prototype.Bv = function() {
      return Bm(this.Zu);
    }, h.prototype.set_maxForce = h.prototype.Hv = function(e) {
      var n = this.Zu;
      e && typeof e == "object" && (e = e.Zu), xm(n, e);
    }, Object.defineProperty(h.prototype, "maxForce", { get: h.prototype.Bv, set: h.prototype.Hv }), h.prototype.get_stiffness = h.prototype.xv = function() {
      return Mm(this.Zu);
    }, h.prototype.set_stiffness = h.prototype.yv = function(e) {
      var n = this.Zu;
      e && typeof e == "object" && (e = e.Zu), wm(n, e);
    }, Object.defineProperty(h.prototype, "stiffness", { get: h.prototype.xv, set: h.prototype.yv }), h.prototype.get_damping = h.prototype.rv = function() {
      return Rm(this.Zu);
    }, h.prototype.set_damping = h.prototype.uv = function(e) {
      var n = this.Zu;
      e && typeof e == "object" && (e = e.Zu), Fm(n, e);
    }, Object.defineProperty(h.prototype, "damping", { get: h.prototype.rv, set: h.prototype.uv }), h.prototype.get_type = h.prototype.cv = function() {
      return Tm(this.Zu);
    }, h.prototype.set_type = h.prototype.ev = function(e) {
      var n = this.Zu;
      e && typeof e == "object" && (e = e.Zu), Om(n, e);
    }, Object.defineProperty(h.prototype, "type", { get: h.prototype.cv, set: h.prototype.ev }), h.prototype.get_userData = h.prototype.dv = function() {
      return r(Wm(this.Zu), I);
    }, h.prototype.set_userData = h.prototype.fv = function(e) {
      var n = this.Zu;
      e && typeof e == "object" && (e = e.Zu), Lm(n, e);
    }, Object.defineProperty(h.prototype, "userData", { get: h.prototype.dv, set: h.prototype.fv }), h.prototype.get_bodyA = h.prototype.gv = function() {
      return r(Im(this.Zu), s);
    }, h.prototype.set_bodyA = h.prototype.kv = function(e) {
      var n = this.Zu;
      e && typeof e == "object" && (e = e.Zu), qm(n, e);
    }, Object.defineProperty(h.prototype, "bodyA", { get: h.prototype.gv, set: h.prototype.kv }), h.prototype.get_bodyB = h.prototype.hv = function() {
      return r(km(this.Zu), s);
    }, h.prototype.set_bodyB = h.prototype.lv = function(e) {
      var n = this.Zu;
      e && typeof e == "object" && (e = e.Zu), Em(n, e);
    }, Object.defineProperty(h.prototype, "bodyB", { get: h.prototype.hv, set: h.prototype.lv }), h.prototype.get_collideConnected = h.prototype.jv = function() {
      return !!zm(this.Zu);
    }, h.prototype.set_collideConnected = h.prototype.mv = function(e) {
      var n = this.Zu;
      e && typeof e == "object" && (e = e.Zu), Vm(n, e);
    }, Object.defineProperty(h.prototype, "collideConnected", { get: h.prototype.jv, set: h.prototype.mv }), h.prototype.__destroy__ = h.prototype.bv = function() {
      Um(this.Zu);
    };
    function S() {
      this.Zu = $m(), B(S)[this.Zu] = this;
    }
    S.prototype = Object.create($.prototype), S.prototype.constructor = S, S.prototype.$u = S, S.av = {}, t.b2PolygonShape = S, S.prototype.Set = S.prototype.Set = function(e, n) {
      var o = this.Zu;
      e && typeof e == "object" && (e = e.Zu), n && typeof n == "object" && (n = n.Zu), Nm(o, e, n);
    }, S.prototype.SetAsBox = function(e, n, o, _) {
      var l = this.Zu;
      e && typeof e == "object" && (e = e.Zu), n && typeof n == "object" && (n = n.Zu), o && typeof o == "object" && (o = o.Zu), _ && typeof _ == "object" && (_ = _.Zu), o === void 0 ? Hm(l, e, n) : _ === void 0 ? _emscripten_bind_b2PolygonShape_SetAsBox_3(l, e, n, o) : Qm(l, e, n, o, _);
    }, S.prototype.GetType = function() {
      return Xm(this.Zu);
    }, S.prototype.GetChildCount = function() {
      return Ym(this.Zu);
    }, S.prototype.TestPoint = function(e, n) {
      var o = this.Zu;
      return e && typeof e == "object" && (e = e.Zu), n && typeof n == "object" && (n = n.Zu), !!Km(o, e, n);
    }, S.prototype.RayCast = function(e, n, o, _) {
      var l = this.Zu;
      return e && typeof e == "object" && (e = e.Zu), n && typeof n == "object" && (n = n.Zu), o && typeof o == "object" && (o = o.Zu), _ && typeof _ == "object" && (_ = _.Zu), !!tf(l, e, n, o, _);
    }, S.prototype.ComputeAABB = function(e, n, o) {
      var _ = this.Zu;
      e && typeof e == "object" && (e = e.Zu), n && typeof n == "object" && (n = n.Zu), o && typeof o == "object" && (o = o.Zu), ef(_, e, n, o);
    }, S.prototype.ComputeMass = function(e, n) {
      var o = this.Zu;
      e && typeof e == "object" && (e = e.Zu), n && typeof n == "object" && (n = n.Zu), nf(o, e, n);
    }, S.prototype.get_m_centroid = S.prototype.Bx = function() {
      return r(of(this.Zu), i);
    }, S.prototype.set_m_centroid = S.prototype.Az = function(e) {
      var n = this.Zu;
      e && typeof e == "object" && (e = e.Zu), rf(n, e);
    }, Object.defineProperty(S.prototype, "m_centroid", { get: S.prototype.Bx, set: S.prototype.Az }), S.prototype.get_m_vertices = S.prototype.Vv = function(e) {
      var n = this.Zu;
      return e && typeof e == "object" && (e = e.Zu), r(_f(n, e), i);
    }, S.prototype.set_m_vertices = S.prototype.pw = function(e, n) {
      var o = this.Zu;
      Lt(), e && typeof e == "object" && (e = e.Zu), n && typeof n == "object" && (n = n.Zu), pf(o, e, n);
    }, Object.defineProperty(S.prototype, "m_vertices", { get: S.prototype.Vv, set: S.prototype.pw }), S.prototype.get_m_normals = S.prototype.Dx = function(e) {
      var n = this.Zu;
      return e && typeof e == "object" && (e = e.Zu), r(uf(n, e), i);
    }, S.prototype.set_m_normals = S.prototype.Cz = function(e, n) {
      var o = this.Zu;
      Lt(), e && typeof e == "object" && (e = e.Zu), n && typeof n == "object" && (n = n.Zu), sf(o, e, n);
    }, Object.defineProperty(S.prototype, "m_normals", { get: S.prototype.Dx, set: S.prototype.Cz }), S.prototype.get_m_count = S.prototype.Uv = function() {
      return cf(this.Zu);
    }, S.prototype.set_m_count = S.prototype.ow = function(e) {
      var n = this.Zu;
      e && typeof e == "object" && (e = e.Zu), af(n, e);
    }, Object.defineProperty(S.prototype, "m_count", { get: S.prototype.Uv, set: S.prototype.ow }), S.prototype.get_m_type = S.prototype.tv = function() {
      return lf(this.Zu);
    }, S.prototype.set_m_type = S.prototype.wv = function(e) {
      var n = this.Zu;
      e && typeof e == "object" && (e = e.Zu), yf(n, e);
    }, Object.defineProperty(S.prototype, "m_type", { get: S.prototype.tv, set: S.prototype.wv }), S.prototype.get_m_radius = S.prototype.sv = function() {
      return mf(this.Zu);
    }, S.prototype.set_m_radius = S.prototype.vv = function(e) {
      var n = this.Zu;
      e && typeof e == "object" && (e = e.Zu), ff(n, e);
    }, Object.defineProperty(S.prototype, "m_radius", { get: S.prototype.sv, set: S.prototype.vv }), S.prototype.__destroy__ = S.prototype.bv = function() {
      df(this.Zu);
    };
    function E() {
      throw "cannot construct a b2PrismaticJoint, no constructor in IDL";
    }
    E.prototype = Object.create(x.prototype), E.prototype.constructor = E, E.prototype.$u = E, E.av = {}, t.b2PrismaticJoint = E, E.prototype.GetLocalAnchorA = function() {
      return r(bf(this.Zu), i);
    }, E.prototype.GetLocalAnchorB = function() {
      return r(gf(this.Zu), i);
    }, E.prototype.GetLocalAxisA = function() {
      return r(hf(this.Zu), i);
    }, E.prototype.GetReferenceAngle = function() {
      return Zf(this.Zu);
    }, E.prototype.GetJointTranslation = function() {
      return vf(this.Zu);
    }, E.prototype.GetJointSpeed = function() {
      return Jf(this.Zu);
    }, E.prototype.IsLimitEnabled = function() {
      return !!Df(this.Zu);
    }, E.prototype.EnableLimit = function(e) {
      var n = this.Zu;
      e && typeof e == "object" && (e = e.Zu), jf(n, e);
    }, E.prototype.GetLowerLimit = function() {
      return Sf(this.Zu);
    }, E.prototype.GetUpperLimit = function() {
      return Gf(this.Zu);
    }, E.prototype.SetLimits = function(e, n) {
      var o = this.Zu;
      e && typeof e == "object" && (e = e.Zu), n && typeof n == "object" && (n = n.Zu), Af(o, e, n);
    }, E.prototype.IsMotorEnabled = function() {
      return !!Cf(this.Zu);
    }, E.prototype.EnableMotor = function(e) {
      var n = this.Zu;
      e && typeof e == "object" && (e = e.Zu), Pf(n, e);
    }, E.prototype.SetMotorSpeed = function(e) {
      var n = this.Zu;
      e && typeof e == "object" && (e = e.Zu), Bf(n, e);
    }, E.prototype.GetMotorSpeed = function() {
      return xf(this.Zu);
    }, E.prototype.SetMaxMotorForce = function(e) {
      var n = this.Zu;
      e && typeof e == "object" && (e = e.Zu), Mf(n, e);
    }, E.prototype.GetMaxMotorForce = function() {
      return wf(this.Zu);
    }, E.prototype.GetMotorForce = function(e) {
      var n = this.Zu;
      return e && typeof e == "object" && (e = e.Zu), Rf(n, e);
    }, E.prototype.GetType = function() {
      return Ff(this.Zu);
    }, E.prototype.GetBodyA = function() {
      return r(Tf(this.Zu), s);
    }, E.prototype.GetBodyB = function() {
      return r(Of(this.Zu), s);
    }, E.prototype.GetAnchorA = function() {
      return r(Wf(this.Zu), i);
    }, E.prototype.GetAnchorB = function() {
      return r(Lf(this.Zu), i);
    }, E.prototype.GetReactionForce = function(e) {
      var n = this.Zu;
      return e && typeof e == "object" && (e = e.Zu), r(If(n, e), i);
    }, E.prototype.GetReactionTorque = function(e) {
      var n = this.Zu;
      return e && typeof e == "object" && (e = e.Zu), qf(n, e);
    }, E.prototype.GetNext = function() {
      return r(kf(this.Zu), x);
    }, E.prototype.GetUserData = function() {
      return r(Ef(this.Zu), I);
    }, E.prototype.GetCollideConnected = function() {
      return !!zf(this.Zu);
    }, E.prototype.__destroy__ = E.prototype.bv = function() {
      Vf(this.Zu);
    };
    function u() {
      this.Zu = Uf(), B(u)[this.Zu] = this;
    }
    u.prototype = Object.create(A.prototype), u.prototype.constructor = u, u.prototype.$u = u, u.av = {}, t.b2PrismaticJointDef = u, u.prototype.Initialize = function(e, n, o, _) {
      var l = this.Zu;
      e && typeof e == "object" && (e = e.Zu), n && typeof n == "object" && (n = n.Zu), o && typeof o == "object" && (o = o.Zu), _ && typeof _ == "object" && (_ = _.Zu), $f(l, e, n, o, _);
    }, u.prototype.get_localAnchorA = u.prototype.nv = function() {
      return r(Nf(this.Zu), i);
    }, u.prototype.set_localAnchorA = u.prototype.pv = function(e) {
      var n = this.Zu;
      e && typeof e == "object" && (e = e.Zu), Hf(n, e);
    }, Object.defineProperty(u.prototype, "localAnchorA", { get: u.prototype.nv, set: u.prototype.pv }), u.prototype.get_localAnchorB = u.prototype.ov = function() {
      return r(Qf(this.Zu), i);
    }, u.prototype.set_localAnchorB = u.prototype.qv = function(e) {
      var n = this.Zu;
      e && typeof e == "object" && (e = e.Zu), Xf(n, e);
    }, Object.defineProperty(u.prototype, "localAnchorB", { get: u.prototype.ov, set: u.prototype.qv }), u.prototype.get_localAxisA = u.prototype.Rv = function() {
      return r(Yf(this.Zu), i);
    }, u.prototype.set_localAxisA = u.prototype.lw = function(e) {
      var n = this.Zu;
      e && typeof e == "object" && (e = e.Zu), Kf(n, e);
    }, Object.defineProperty(u.prototype, "localAxisA", { get: u.prototype.Rv, set: u.prototype.lw }), u.prototype.get_referenceAngle = u.prototype.Ev = function() {
      return td(this.Zu);
    }, u.prototype.set_referenceAngle = u.prototype.Kv = function(e) {
      var n = this.Zu;
      e && typeof e == "object" && (e = e.Zu), ed(n, e);
    }, Object.defineProperty(u.prototype, "referenceAngle", { get: u.prototype.Ev, set: u.prototype.Kv }), u.prototype.get_enableLimit = u.prototype.zv = function() {
      return !!nd(this.Zu);
    }, u.prototype.set_enableLimit = u.prototype.Fv = function(e) {
      var n = this.Zu;
      e && typeof e == "object" && (e = e.Zu), od(n, e);
    }, Object.defineProperty(u.prototype, "enableLimit", { get: u.prototype.zv, set: u.prototype.Fv }), u.prototype.get_lowerTranslation = u.prototype.Tv = function() {
      return rd(this.Zu);
    }, u.prototype.set_lowerTranslation = u.prototype.nw = function(e) {
      var n = this.Zu;
      e && typeof e == "object" && (e = e.Zu), _d(n, e);
    }, Object.defineProperty(u.prototype, "lowerTranslation", { get: u.prototype.Tv, set: u.prototype.nw }), u.prototype.get_upperTranslation = u.prototype.ew = function() {
      return id(this.Zu);
    }, u.prototype.set_upperTranslation = u.prototype.zw = function(e) {
      var n = this.Zu;
      e && typeof e == "object" && (e = e.Zu), pd(n, e);
    }, Object.defineProperty(u.prototype, "upperTranslation", { get: u.prototype.ew, set: u.prototype.zw }), u.prototype.get_enableMotor = u.prototype.Av = function() {
      return !!ud(this.Zu);
    }, u.prototype.set_enableMotor = u.prototype.Gv = function(e) {
      var n = this.Zu;
      e && typeof e == "object" && (e = e.Zu), sd(n, e);
    }, Object.defineProperty(u.prototype, "enableMotor", { get: u.prototype.Av, set: u.prototype.Gv }), u.prototype.get_maxMotorForce = u.prototype.Qx = function() {
      return cd(this.Zu);
    }, u.prototype.set_maxMotorForce = u.prototype.Pz = function(e) {
      var n = this.Zu;
      e && typeof e == "object" && (e = e.Zu), ad(n, e);
    }, Object.defineProperty(u.prototype, "maxMotorForce", { get: u.prototype.Qx, set: u.prototype.Pz }), u.prototype.get_motorSpeed = u.prototype.Cv = function() {
      return ld(this.Zu);
    }, u.prototype.set_motorSpeed = u.prototype.Iv = function(e) {
      var n = this.Zu;
      e && typeof e == "object" && (e = e.Zu), yd(n, e);
    }, Object.defineProperty(u.prototype, "motorSpeed", { get: u.prototype.Cv, set: u.prototype.Iv }), u.prototype.get_type = u.prototype.cv = function() {
      return md(this.Zu);
    }, u.prototype.set_type = u.prototype.ev = function(e) {
      var n = this.Zu;
      e && typeof e == "object" && (e = e.Zu), fd(n, e);
    }, Object.defineProperty(u.prototype, "type", { get: u.prototype.cv, set: u.prototype.ev }), u.prototype.get_userData = u.prototype.dv = function() {
      return r(dd(this.Zu), I);
    }, u.prototype.set_userData = u.prototype.fv = function(e) {
      var n = this.Zu;
      e && typeof e == "object" && (e = e.Zu), bd(n, e);
    }, Object.defineProperty(u.prototype, "userData", { get: u.prototype.dv, set: u.prototype.fv }), u.prototype.get_bodyA = u.prototype.gv = function() {
      return r(gd(this.Zu), s);
    }, u.prototype.set_bodyA = u.prototype.kv = function(e) {
      var n = this.Zu;
      e && typeof e == "object" && (e = e.Zu), hd(n, e);
    }, Object.defineProperty(u.prototype, "bodyA", { get: u.prototype.gv, set: u.prototype.kv }), u.prototype.get_bodyB = u.prototype.hv = function() {
      return r(Zd(this.Zu), s);
    }, u.prototype.set_bodyB = u.prototype.lv = function(e) {
      var n = this.Zu;
      e && typeof e == "object" && (e = e.Zu), vd(n, e);
    }, Object.defineProperty(u.prototype, "bodyB", { get: u.prototype.hv, set: u.prototype.lv }), u.prototype.get_collideConnected = u.prototype.jv = function() {
      return !!Jd(this.Zu);
    }, u.prototype.set_collideConnected = u.prototype.mv = function(e) {
      var n = this.Zu;
      e && typeof e == "object" && (e = e.Zu), Dd(n, e);
    }, Object.defineProperty(u.prototype, "collideConnected", { get: u.prototype.jv, set: u.prototype.mv }), u.prototype.__destroy__ = u.prototype.bv = function() {
      jd(this.Zu);
    };
    function D() {
      throw "cannot construct a b2Profile, no constructor in IDL";
    }
    D.prototype = Object.create(G.prototype), D.prototype.constructor = D, D.prototype.$u = D, D.av = {}, t.b2Profile = D, D.prototype.get_step = D.prototype.jy = function() {
      return Sd(this.Zu);
    }, D.prototype.set_step = D.prototype.iA = function(e) {
      var n = this.Zu;
      e && typeof e == "object" && (e = e.Zu), Gd(n, e);
    }, Object.defineProperty(D.prototype, "step", { get: D.prototype.jy, set: D.prototype.iA }), D.prototype.get_collide = D.prototype.Uw = function() {
      return Ad(this.Zu);
    }, D.prototype.set_collide = D.prototype.Sy = function(e) {
      var n = this.Zu;
      e && typeof e == "object" && (e = e.Zu), Cd(n, e);
    }, Object.defineProperty(D.prototype, "collide", { get: D.prototype.Uw, set: D.prototype.Sy }), D.prototype.get_solve = D.prototype.ey = function() {
      return Pd(this.Zu);
    }, D.prototype.set_solve = D.prototype.dA = function(e) {
      var n = this.Zu;
      e && typeof e == "object" && (e = e.Zu), Bd(n, e);
    }, Object.defineProperty(D.prototype, "solve", { get: D.prototype.ey, set: D.prototype.dA }), D.prototype.get_solveInit = D.prototype.fy = function() {
      return xd(this.Zu);
    }, D.prototype.set_solveInit = D.prototype.eA = function(e) {
      var n = this.Zu;
      e && typeof e == "object" && (e = e.Zu), Md(n, e);
    }, Object.defineProperty(D.prototype, "solveInit", { get: D.prototype.fy, set: D.prototype.eA }), D.prototype.get_solveVelocity = D.prototype.iy = function() {
      return wd(this.Zu);
    }, D.prototype.set_solveVelocity = D.prototype.hA = function(e) {
      var n = this.Zu;
      e && typeof e == "object" && (e = e.Zu), Rd(n, e);
    }, Object.defineProperty(D.prototype, "solveVelocity", { get: D.prototype.iy, set: D.prototype.hA }), D.prototype.get_solvePosition = D.prototype.gy = function() {
      return Fd(this.Zu);
    }, D.prototype.set_solvePosition = D.prototype.fA = function(e) {
      var n = this.Zu;
      e && typeof e == "object" && (e = e.Zu), Td(n, e);
    }, Object.defineProperty(D.prototype, "solvePosition", { get: D.prototype.gy, set: D.prototype.fA }), D.prototype.get_broadphase = D.prototype.Ow = function() {
      return Od(this.Zu);
    }, D.prototype.set_broadphase = D.prototype.My = function(e) {
      var n = this.Zu;
      e && typeof e == "object" && (e = e.Zu), Wd(n, e);
    }, Object.defineProperty(D.prototype, "broadphase", { get: D.prototype.Ow, set: D.prototype.My }), D.prototype.get_solveTOI = D.prototype.hy = function() {
      return Ld(this.Zu);
    }, D.prototype.set_solveTOI = D.prototype.gA = function(e) {
      var n = this.Zu;
      e && typeof e == "object" && (e = e.Zu), Id(n, e);
    }, Object.defineProperty(D.prototype, "solveTOI", { get: D.prototype.hy, set: D.prototype.gA }), D.prototype.__destroy__ = D.prototype.bv = function() {
      qd(this.Zu);
    };
    function st() {
      throw "cannot construct a b2PulleyJoint, no constructor in IDL";
    }
    st.prototype = Object.create(x.prototype), st.prototype.constructor = st, st.prototype.$u = st, st.av = {}, t.b2PulleyJoint = st, st.prototype.GetGroundAnchorA = function() {
      return r(kd(this.Zu), i);
    }, st.prototype.GetGroundAnchorB = function() {
      return r(Ed(this.Zu), i);
    }, st.prototype.GetLengthA = function() {
      return zd(this.Zu);
    }, st.prototype.GetLengthB = function() {
      return Vd(this.Zu);
    }, st.prototype.GetRatio = function() {
      return Ud(this.Zu);
    }, st.prototype.GetCurrentLengthA = function() {
      return $d(this.Zu);
    }, st.prototype.GetCurrentLengthB = function() {
      return Nd(this.Zu);
    }, st.prototype.GetType = function() {
      return Hd(this.Zu);
    }, st.prototype.GetBodyA = function() {
      return r(Qd(this.Zu), s);
    }, st.prototype.GetBodyB = function() {
      return r(Xd(this.Zu), s);
    }, st.prototype.GetAnchorA = function() {
      return r(Yd(this.Zu), i);
    }, st.prototype.GetAnchorB = function() {
      return r(Kd(this.Zu), i);
    }, st.prototype.GetReactionForce = function(e) {
      var n = this.Zu;
      return e && typeof e == "object" && (e = e.Zu), r(tb(n, e), i);
    }, st.prototype.GetReactionTorque = function(e) {
      var n = this.Zu;
      return e && typeof e == "object" && (e = e.Zu), eb(n, e);
    }, st.prototype.GetNext = function() {
      return r(nb(this.Zu), x);
    }, st.prototype.GetUserData = function() {
      return r(ob(this.Zu), I);
    }, st.prototype.GetCollideConnected = function() {
      return !!rb(this.Zu);
    }, st.prototype.__destroy__ = st.prototype.bv = function() {
      _b(this.Zu);
    };
    function m() {
      this.Zu = ib(), B(m)[this.Zu] = this;
    }
    m.prototype = Object.create(A.prototype), m.prototype.constructor = m, m.prototype.$u = m, m.av = {}, t.b2PulleyJointDef = m, m.prototype.Initialize = function(e, n, o, _, l, U, Mt) {
      var ee = this.Zu;
      e && typeof e == "object" && (e = e.Zu), n && typeof n == "object" && (n = n.Zu), o && typeof o == "object" && (o = o.Zu), _ && typeof _ == "object" && (_ = _.Zu), l && typeof l == "object" && (l = l.Zu), U && typeof U == "object" && (U = U.Zu), Mt && typeof Mt == "object" && (Mt = Mt.Zu), pb(ee, e, n, o, _, l, U, Mt);
    }, m.prototype.get_groundAnchorA = m.prototype.hx = function() {
      return r(ub(this.Zu), i);
    }, m.prototype.set_groundAnchorA = m.prototype.fz = function(e) {
      var n = this.Zu;
      e && typeof e == "object" && (e = e.Zu), sb(n, e);
    }, Object.defineProperty(m.prototype, "groundAnchorA", { get: m.prototype.hx, set: m.prototype.fz }), m.prototype.get_groundAnchorB = m.prototype.ix = function() {
      return r(cb(this.Zu), i);
    }, m.prototype.set_groundAnchorB = m.prototype.gz = function(e) {
      var n = this.Zu;
      e && typeof e == "object" && (e = e.Zu), ab(n, e);
    }, Object.defineProperty(m.prototype, "groundAnchorB", { get: m.prototype.ix, set: m.prototype.gz }), m.prototype.get_localAnchorA = m.prototype.nv = function() {
      return r(lb(this.Zu), i);
    }, m.prototype.set_localAnchorA = m.prototype.pv = function(e) {
      var n = this.Zu;
      e && typeof e == "object" && (e = e.Zu), yb(n, e);
    }, Object.defineProperty(m.prototype, "localAnchorA", { get: m.prototype.nv, set: m.prototype.pv }), m.prototype.get_localAnchorB = m.prototype.ov = function() {
      return r(mb(this.Zu), i);
    }, m.prototype.set_localAnchorB = m.prototype.qv = function(e) {
      var n = this.Zu;
      e && typeof e == "object" && (e = e.Zu), fb(n, e);
    }, Object.defineProperty(m.prototype, "localAnchorB", { get: m.prototype.ov, set: m.prototype.qv }), m.prototype.get_lengthA = m.prototype.tx = function() {
      return db(this.Zu);
    }, m.prototype.set_lengthA = m.prototype.rz = function(e) {
      var n = this.Zu;
      e && typeof e == "object" && (e = e.Zu), bb(n, e);
    }, Object.defineProperty(m.prototype, "lengthA", { get: m.prototype.tx, set: m.prototype.rz }), m.prototype.get_lengthB = m.prototype.ux = function() {
      return gb(this.Zu);
    }, m.prototype.set_lengthB = m.prototype.sz = function(e) {
      var n = this.Zu;
      e && typeof e == "object" && (e = e.Zu), hb(n, e);
    }, Object.defineProperty(m.prototype, "lengthB", { get: m.prototype.ux, set: m.prototype.sz }), m.prototype.get_ratio = m.prototype.dw = function() {
      return Zb(this.Zu);
    }, m.prototype.set_ratio = m.prototype.yw = function(e) {
      var n = this.Zu;
      e && typeof e == "object" && (e = e.Zu), vb(n, e);
    }, Object.defineProperty(m.prototype, "ratio", { get: m.prototype.dw, set: m.prototype.yw }), m.prototype.get_type = m.prototype.cv = function() {
      return Jb(this.Zu);
    }, m.prototype.set_type = m.prototype.ev = function(e) {
      var n = this.Zu;
      e && typeof e == "object" && (e = e.Zu), Db(n, e);
    }, Object.defineProperty(m.prototype, "type", { get: m.prototype.cv, set: m.prototype.ev }), m.prototype.get_userData = m.prototype.dv = function() {
      return r(jb(this.Zu), I);
    }, m.prototype.set_userData = m.prototype.fv = function(e) {
      var n = this.Zu;
      e && typeof e == "object" && (e = e.Zu), Sb(n, e);
    }, Object.defineProperty(m.prototype, "userData", { get: m.prototype.dv, set: m.prototype.fv }), m.prototype.get_bodyA = m.prototype.gv = function() {
      return r(Gb(this.Zu), s);
    }, m.prototype.set_bodyA = m.prototype.kv = function(e) {
      var n = this.Zu;
      e && typeof e == "object" && (e = e.Zu), Ab(n, e);
    }, Object.defineProperty(m.prototype, "bodyA", { get: m.prototype.gv, set: m.prototype.kv }), m.prototype.get_bodyB = m.prototype.hv = function() {
      return r(Cb(this.Zu), s);
    }, m.prototype.set_bodyB = m.prototype.lv = function(e) {
      var n = this.Zu;
      e && typeof e == "object" && (e = e.Zu), Pb(n, e);
    }, Object.defineProperty(m.prototype, "bodyB", { get: m.prototype.hv, set: m.prototype.lv }), m.prototype.get_collideConnected = m.prototype.jv = function() {
      return !!Bb(this.Zu);
    }, m.prototype.set_collideConnected = m.prototype.mv = function(e) {
      var n = this.Zu;
      e && typeof e == "object" && (e = e.Zu), xb(n, e);
    }, Object.defineProperty(m.prototype, "collideConnected", { get: m.prototype.jv, set: m.prototype.mv }), m.prototype.__destroy__ = m.prototype.bv = function() {
      Mb(this.Zu);
    };
    function rt() {
      throw "cannot construct a b2RayCastInput, no constructor in IDL";
    }
    rt.prototype = Object.create(G.prototype), rt.prototype.constructor = rt, rt.prototype.$u = rt, rt.av = {}, t.b2RayCastInput = rt, rt.prototype.get_p1 = rt.prototype.Vx = function() {
      return r(wb(this.Zu), i);
    }, rt.prototype.set_p1 = rt.prototype.Uz = function(e) {
      var n = this.Zu;
      e && typeof e == "object" && (e = e.Zu), Rb(n, e);
    }, Object.defineProperty(rt.prototype, "p1", { get: rt.prototype.Vx, set: rt.prototype.Uz }), rt.prototype.get_p2 = rt.prototype.Wx = function() {
      return r(Fb(this.Zu), i);
    }, rt.prototype.set_p2 = rt.prototype.Vz = function(e) {
      var n = this.Zu;
      e && typeof e == "object" && (e = e.Zu), Tb(n, e);
    }, Object.defineProperty(rt.prototype, "p2", { get: rt.prototype.Wx, set: rt.prototype.Vz }), rt.prototype.get_maxFraction = rt.prototype.Ox = function() {
      return Ob(this.Zu);
    }, rt.prototype.set_maxFraction = rt.prototype.Nz = function(e) {
      var n = this.Zu;
      e && typeof e == "object" && (e = e.Zu), Wb(n, e);
    }, Object.defineProperty(rt.prototype, "maxFraction", { get: rt.prototype.Ox, set: rt.prototype.Nz }), rt.prototype.__destroy__ = rt.prototype.bv = function() {
      Lb(this.Zu);
    };
    function mt() {
      throw "cannot construct a b2RayCastOutput, no constructor in IDL";
    }
    mt.prototype = Object.create(G.prototype), mt.prototype.constructor = mt, mt.prototype.$u = mt, mt.av = {}, t.b2RayCastOutput = mt, mt.prototype.get_normal = mt.prototype.Zv = function() {
      return r(Ib(this.Zu), i);
    }, mt.prototype.set_normal = mt.prototype.tw = function(e) {
      var n = this.Zu;
      e && typeof e == "object" && (e = e.Zu), qb(n, e);
    }, Object.defineProperty(mt.prototype, "normal", { get: mt.prototype.Zv, set: mt.prototype.tw }), mt.prototype.get_fraction = mt.prototype.cx = function() {
      return kb(this.Zu);
    }, mt.prototype.set_fraction = mt.prototype.az = function(e) {
      var n = this.Zu;
      e && typeof e == "object" && (e = e.Zu), Eb(n, e);
    }, Object.defineProperty(mt.prototype, "fraction", { get: mt.prototype.cx, set: mt.prototype.az }), mt.prototype.__destroy__ = mt.prototype.bv = function() {
      zb(this.Zu);
    };
    function V() {
      throw "cannot construct a b2RevoluteJoint, no constructor in IDL";
    }
    V.prototype = Object.create(x.prototype), V.prototype.constructor = V, V.prototype.$u = V, V.av = {}, t.b2RevoluteJoint = V, V.prototype.GetLocalAnchorA = function() {
      return r(Vb(this.Zu), i);
    }, V.prototype.GetLocalAnchorB = function() {
      return r(Ub(this.Zu), i);
    }, V.prototype.GetReferenceAngle = function() {
      return $b(this.Zu);
    }, V.prototype.GetJointAngle = function() {
      return Nb(this.Zu);
    }, V.prototype.GetJointSpeed = function() {
      return Hb(this.Zu);
    }, V.prototype.IsLimitEnabled = function() {
      return !!Qb(this.Zu);
    }, V.prototype.EnableLimit = function(e) {
      var n = this.Zu;
      e && typeof e == "object" && (e = e.Zu), Xb(n, e);
    }, V.prototype.GetLowerLimit = function() {
      return Yb(this.Zu);
    }, V.prototype.GetUpperLimit = function() {
      return Kb(this.Zu);
    }, V.prototype.SetLimits = function(e, n) {
      var o = this.Zu;
      e && typeof e == "object" && (e = e.Zu), n && typeof n == "object" && (n = n.Zu), tg(o, e, n);
    }, V.prototype.IsMotorEnabled = function() {
      return !!eg(this.Zu);
    }, V.prototype.EnableMotor = function(e) {
      var n = this.Zu;
      e && typeof e == "object" && (e = e.Zu), ng(n, e);
    }, V.prototype.SetMotorSpeed = function(e) {
      var n = this.Zu;
      e && typeof e == "object" && (e = e.Zu), og(n, e);
    }, V.prototype.GetMotorSpeed = function() {
      return rg(this.Zu);
    }, V.prototype.SetMaxMotorTorque = function(e) {
      var n = this.Zu;
      e && typeof e == "object" && (e = e.Zu), _g(n, e);
    }, V.prototype.GetMaxMotorTorque = function() {
      return ig(this.Zu);
    }, V.prototype.GetMotorTorque = function(e) {
      var n = this.Zu;
      return e && typeof e == "object" && (e = e.Zu), pg(n, e);
    }, V.prototype.GetType = function() {
      return ug(this.Zu);
    }, V.prototype.GetBodyA = function() {
      return r(sg(this.Zu), s);
    }, V.prototype.GetBodyB = function() {
      return r(cg(this.Zu), s);
    }, V.prototype.GetAnchorA = function() {
      return r(ag(this.Zu), i);
    }, V.prototype.GetAnchorB = function() {
      return r(lg(this.Zu), i);
    }, V.prototype.GetReactionForce = function(e) {
      var n = this.Zu;
      return e && typeof e == "object" && (e = e.Zu), r(yg(n, e), i);
    }, V.prototype.GetReactionTorque = function(e) {
      var n = this.Zu;
      return e && typeof e == "object" && (e = e.Zu), mg(n, e);
    }, V.prototype.GetNext = function() {
      return r(fg(this.Zu), x);
    }, V.prototype.GetUserData = function() {
      return r(dg(this.Zu), I);
    }, V.prototype.GetCollideConnected = function() {
      return !!bg(this.Zu);
    }, V.prototype.__destroy__ = V.prototype.bv = function() {
      gg(this.Zu);
    };
    function c() {
      this.Zu = hg(), B(c)[this.Zu] = this;
    }
    c.prototype = Object.create(A.prototype), c.prototype.constructor = c, c.prototype.$u = c, c.av = {}, t.b2RevoluteJointDef = c, c.prototype.Initialize = function(e, n, o) {
      var _ = this.Zu;
      e && typeof e == "object" && (e = e.Zu), n && typeof n == "object" && (n = n.Zu), o && typeof o == "object" && (o = o.Zu), Zg(_, e, n, o);
    }, c.prototype.get_localAnchorA = c.prototype.nv = function() {
      return r(vg(this.Zu), i);
    }, c.prototype.set_localAnchorA = c.prototype.pv = function(e) {
      var n = this.Zu;
      e && typeof e == "object" && (e = e.Zu), Jg(n, e);
    }, Object.defineProperty(c.prototype, "localAnchorA", { get: c.prototype.nv, set: c.prototype.pv }), c.prototype.get_localAnchorB = c.prototype.ov = function() {
      return r(Dg(this.Zu), i);
    }, c.prototype.set_localAnchorB = c.prototype.qv = function(e) {
      var n = this.Zu;
      e && typeof e == "object" && (e = e.Zu), jg(n, e);
    }, Object.defineProperty(c.prototype, "localAnchorB", { get: c.prototype.ov, set: c.prototype.qv }), c.prototype.get_referenceAngle = c.prototype.Ev = function() {
      return Sg(this.Zu);
    }, c.prototype.set_referenceAngle = c.prototype.Kv = function(e) {
      var n = this.Zu;
      e && typeof e == "object" && (e = e.Zu), Gg(n, e);
    }, Object.defineProperty(c.prototype, "referenceAngle", { get: c.prototype.Ev, set: c.prototype.Kv }), c.prototype.get_enableLimit = c.prototype.zv = function() {
      return !!Ag(this.Zu);
    }, c.prototype.set_enableLimit = c.prototype.Fv = function(e) {
      var n = this.Zu;
      e && typeof e == "object" && (e = e.Zu), Cg(n, e);
    }, Object.defineProperty(c.prototype, "enableLimit", { get: c.prototype.zv, set: c.prototype.Fv }), c.prototype.get_lowerAngle = c.prototype.zx = function() {
      return Pg(this.Zu);
    }, c.prototype.set_lowerAngle = c.prototype.yz = function(e) {
      var n = this.Zu;
      e && typeof e == "object" && (e = e.Zu), Bg(n, e);
    }, Object.defineProperty(c.prototype, "lowerAngle", { get: c.prototype.zx, set: c.prototype.yz }), c.prototype.get_upperAngle = c.prototype.uy = function() {
      return xg(this.Zu);
    }, c.prototype.set_upperAngle = c.prototype.tA = function(e) {
      var n = this.Zu;
      e && typeof e == "object" && (e = e.Zu), Mg(n, e);
    }, Object.defineProperty(c.prototype, "upperAngle", { get: c.prototype.uy, set: c.prototype.tA }), c.prototype.get_enableMotor = c.prototype.Av = function() {
      return !!wg(this.Zu);
    }, c.prototype.set_enableMotor = c.prototype.Gv = function(e) {
      var n = this.Zu;
      e && typeof e == "object" && (e = e.Zu), Rg(n, e);
    }, Object.defineProperty(c.prototype, "enableMotor", { get: c.prototype.Av, set: c.prototype.Gv }), c.prototype.get_motorSpeed = c.prototype.Cv = function() {
      return Fg(this.Zu);
    }, c.prototype.set_motorSpeed = c.prototype.Iv = function(e) {
      var n = this.Zu;
      e && typeof e == "object" && (e = e.Zu), Tg(n, e);
    }, Object.defineProperty(c.prototype, "motorSpeed", { get: c.prototype.Cv, set: c.prototype.Iv }), c.prototype.get_maxMotorTorque = c.prototype.Wv = function() {
      return Og(this.Zu);
    }, c.prototype.set_maxMotorTorque = c.prototype.qw = function(e) {
      var n = this.Zu;
      e && typeof e == "object" && (e = e.Zu), Wg(n, e);
    }, Object.defineProperty(c.prototype, "maxMotorTorque", { get: c.prototype.Wv, set: c.prototype.qw }), c.prototype.get_type = c.prototype.cv = function() {
      return Lg(this.Zu);
    }, c.prototype.set_type = c.prototype.ev = function(e) {
      var n = this.Zu;
      e && typeof e == "object" && (e = e.Zu), Ig(n, e);
    }, Object.defineProperty(c.prototype, "type", { get: c.prototype.cv, set: c.prototype.ev }), c.prototype.get_userData = c.prototype.dv = function() {
      return r(qg(this.Zu), I);
    }, c.prototype.set_userData = c.prototype.fv = function(e) {
      var n = this.Zu;
      e && typeof e == "object" && (e = e.Zu), kg(n, e);
    }, Object.defineProperty(c.prototype, "userData", { get: c.prototype.dv, set: c.prototype.fv }), c.prototype.get_bodyA = c.prototype.gv = function() {
      return r(Eg(this.Zu), s);
    }, c.prototype.set_bodyA = c.prototype.kv = function(e) {
      var n = this.Zu;
      e && typeof e == "object" && (e = e.Zu), zg(n, e);
    }, Object.defineProperty(c.prototype, "bodyA", { get: c.prototype.gv, set: c.prototype.kv }), c.prototype.get_bodyB = c.prototype.hv = function() {
      return r(Vg(this.Zu), s);
    }, c.prototype.set_bodyB = c.prototype.lv = function(e) {
      var n = this.Zu;
      e && typeof e == "object" && (e = e.Zu), Ug(n, e);
    }, Object.defineProperty(c.prototype, "bodyB", { get: c.prototype.hv, set: c.prototype.lv }), c.prototype.get_collideConnected = c.prototype.jv = function() {
      return !!$g(this.Zu);
    }, c.prototype.set_collideConnected = c.prototype.mv = function(e) {
      var n = this.Zu;
      e && typeof e == "object" && (e = e.Zu), Ng(n, e);
    }, Object.defineProperty(c.prototype, "collideConnected", { get: c.prototype.jv, set: c.prototype.mv }), c.prototype.__destroy__ = c.prototype.bv = function() {
      Hg(this.Zu);
    };
    function nt(e) {
      e && typeof e == "object" && (e = e.Zu), this.Zu = e === void 0 ? Qg() : Xg(e), B(nt)[this.Zu] = this;
    }
    nt.prototype = Object.create(G.prototype), nt.prototype.constructor = nt, nt.prototype.$u = nt, nt.av = {}, t.b2Rot = nt, nt.prototype.Set = nt.prototype.Set = function(e) {
      var n = this.Zu;
      e && typeof e == "object" && (e = e.Zu), Yg(n, e);
    }, nt.prototype.SetIdentity = function() {
      Kg(this.Zu);
    }, nt.prototype.GetAngle = function() {
      return t2(this.Zu);
    }, nt.prototype.GetXAxis = function() {
      return r(e2(this.Zu), i);
    }, nt.prototype.GetYAxis = function() {
      return r(n2(this.Zu), i);
    }, nt.prototype.get_s = nt.prototype.by = function() {
      return o2(this.Zu);
    }, nt.prototype.set_s = nt.prototype.aA = function(e) {
      var n = this.Zu;
      e && typeof e == "object" && (e = e.Zu), r2(n, e);
    }, Object.defineProperty(nt.prototype, "s", { get: nt.prototype.by, set: nt.prototype.aA }), nt.prototype.get_c = nt.prototype.Qw = function() {
      return _2(this.Zu);
    }, nt.prototype.set_c = nt.prototype.Oy = function(e) {
      var n = this.Zu;
      e && typeof e == "object" && (e = e.Zu), i2(n, e);
    }, Object.defineProperty(nt.prototype, "c", { get: nt.prototype.Qw, set: nt.prototype.Oy }), nt.prototype.__destroy__ = nt.prototype.bv = function() {
      p2(this.Zu);
    };
    function R() {
      throw "cannot construct a b2WheelJoint, no constructor in IDL";
    }
    R.prototype = Object.create(x.prototype), R.prototype.constructor = R, R.prototype.$u = R, R.av = {}, t.b2WheelJoint = R, R.prototype.GetLocalAnchorA = function() {
      return r(u2(this.Zu), i);
    }, R.prototype.GetLocalAnchorB = function() {
      return r(s2(this.Zu), i);
    }, R.prototype.GetLocalAxisA = function() {
      return r(c2(this.Zu), i);
    }, R.prototype.GetJointTranslation = function() {
      return a2(this.Zu);
    }, R.prototype.GetJointLinearSpeed = function() {
      return l2(this.Zu);
    }, R.prototype.GetJointAngle = function() {
      return y2(this.Zu);
    }, R.prototype.GetJointAngularSpeed = function() {
      return m2(this.Zu);
    }, R.prototype.IsLimitEnabled = function() {
      return !!f2(this.Zu);
    }, R.prototype.EnableLimit = function(e) {
      var n = this.Zu;
      e && typeof e == "object" && (e = e.Zu), d2(n, e);
    }, R.prototype.GetLowerLimit = function() {
      return b2(this.Zu);
    }, R.prototype.GetUpperLimit = function() {
      return g2(this.Zu);
    }, R.prototype.SetLimits = function(e, n) {
      var o = this.Zu;
      e && typeof e == "object" && (e = e.Zu), n && typeof n == "object" && (n = n.Zu), h2(o, e, n);
    }, R.prototype.IsMotorEnabled = function() {
      return !!Z2(this.Zu);
    }, R.prototype.EnableMotor = function(e) {
      var n = this.Zu;
      e && typeof e == "object" && (e = e.Zu), v2(n, e);
    }, R.prototype.SetMotorSpeed = function(e) {
      var n = this.Zu;
      e && typeof e == "object" && (e = e.Zu), J2(n, e);
    }, R.prototype.GetMotorSpeed = function() {
      return D2(this.Zu);
    }, R.prototype.SetMaxMotorTorque = function(e) {
      var n = this.Zu;
      e && typeof e == "object" && (e = e.Zu), j2(n, e);
    }, R.prototype.GetMaxMotorTorque = function() {
      return S2(this.Zu);
    }, R.prototype.GetMotorTorque = function(e) {
      var n = this.Zu;
      return e && typeof e == "object" && (e = e.Zu), G2(n, e);
    }, R.prototype.SetStiffness = function(e) {
      var n = this.Zu;
      e && typeof e == "object" && (e = e.Zu), A2(n, e);
    }, R.prototype.GetStiffness = function() {
      return C2(this.Zu);
    }, R.prototype.SetDamping = function(e) {
      var n = this.Zu;
      e && typeof e == "object" && (e = e.Zu), P2(n, e);
    }, R.prototype.GetDamping = function() {
      return B2(this.Zu);
    }, R.prototype.GetType = function() {
      return x2(this.Zu);
    }, R.prototype.GetBodyA = function() {
      return r(M2(this.Zu), s);
    }, R.prototype.GetBodyB = function() {
      return r(w2(this.Zu), s);
    }, R.prototype.GetAnchorA = function() {
      return r(R2(this.Zu), i);
    }, R.prototype.GetAnchorB = function() {
      return r(F2(this.Zu), i);
    }, R.prototype.GetReactionForce = function(e) {
      var n = this.Zu;
      return e && typeof e == "object" && (e = e.Zu), r(T2(n, e), i);
    }, R.prototype.GetReactionTorque = function(e) {
      var n = this.Zu;
      return e && typeof e == "object" && (e = e.Zu), O2(n, e);
    }, R.prototype.GetNext = function() {
      return r(W2(this.Zu), x);
    }, R.prototype.GetUserData = function() {
      return r(L2(this.Zu), I);
    }, R.prototype.GetCollideConnected = function() {
      return !!I2(this.Zu);
    }, R.prototype.__destroy__ = R.prototype.bv = function() {
      q2(this.Zu);
    };
    function p() {
      this.Zu = k2(), B(p)[this.Zu] = this;
    }
    p.prototype = Object.create(A.prototype), p.prototype.constructor = p, p.prototype.$u = p, p.av = {}, t.b2WheelJointDef = p, p.prototype.Initialize = function(e, n, o, _) {
      var l = this.Zu;
      e && typeof e == "object" && (e = e.Zu), n && typeof n == "object" && (n = n.Zu), o && typeof o == "object" && (o = o.Zu), _ && typeof _ == "object" && (_ = _.Zu), E2(l, e, n, o, _);
    }, p.prototype.get_localAnchorA = p.prototype.nv = function() {
      return r(z2(this.Zu), i);
    }, p.prototype.set_localAnchorA = p.prototype.pv = function(e) {
      var n = this.Zu;
      e && typeof e == "object" && (e = e.Zu), V2(n, e);
    }, Object.defineProperty(p.prototype, "localAnchorA", { get: p.prototype.nv, set: p.prototype.pv }), p.prototype.get_localAnchorB = p.prototype.ov = function() {
      return r(U2(this.Zu), i);
    }, p.prototype.set_localAnchorB = p.prototype.qv = function(e) {
      var n = this.Zu;
      e && typeof e == "object" && (e = e.Zu), $2(n, e);
    }, Object.defineProperty(p.prototype, "localAnchorB", { get: p.prototype.ov, set: p.prototype.qv }), p.prototype.get_localAxisA = p.prototype.Rv = function() {
      return r(N2(this.Zu), i);
    }, p.prototype.set_localAxisA = p.prototype.lw = function(e) {
      var n = this.Zu;
      e && typeof e == "object" && (e = e.Zu), H2(n, e);
    }, Object.defineProperty(p.prototype, "localAxisA", { get: p.prototype.Rv, set: p.prototype.lw }), p.prototype.get_enableLimit = p.prototype.zv = function() {
      return !!Q2(this.Zu);
    }, p.prototype.set_enableLimit = p.prototype.Fv = function(e) {
      var n = this.Zu;
      e && typeof e == "object" && (e = e.Zu), X2(n, e);
    }, Object.defineProperty(p.prototype, "enableLimit", { get: p.prototype.zv, set: p.prototype.Fv }), p.prototype.get_lowerTranslation = p.prototype.Tv = function() {
      return Y2(this.Zu);
    }, p.prototype.set_lowerTranslation = p.prototype.nw = function(e) {
      var n = this.Zu;
      e && typeof e == "object" && (e = e.Zu), K2(n, e);
    }, Object.defineProperty(p.prototype, "lowerTranslation", { get: p.prototype.Tv, set: p.prototype.nw }), p.prototype.get_upperTranslation = p.prototype.ew = function() {
      return th(this.Zu);
    }, p.prototype.set_upperTranslation = p.prototype.zw = function(e) {
      var n = this.Zu;
      e && typeof e == "object" && (e = e.Zu), eh(n, e);
    }, Object.defineProperty(p.prototype, "upperTranslation", { get: p.prototype.ew, set: p.prototype.zw }), p.prototype.get_enableMotor = p.prototype.Av = function() {
      return !!nh(this.Zu);
    }, p.prototype.set_enableMotor = p.prototype.Gv = function(e) {
      var n = this.Zu;
      e && typeof e == "object" && (e = e.Zu), oh(n, e);
    }, Object.defineProperty(p.prototype, "enableMotor", { get: p.prototype.Av, set: p.prototype.Gv }), p.prototype.get_maxMotorTorque = p.prototype.Wv = function() {
      return rh(this.Zu);
    }, p.prototype.set_maxMotorTorque = p.prototype.qw = function(e) {
      var n = this.Zu;
      e && typeof e == "object" && (e = e.Zu), _h(n, e);
    }, Object.defineProperty(p.prototype, "maxMotorTorque", { get: p.prototype.Wv, set: p.prototype.qw }), p.prototype.get_motorSpeed = p.prototype.Cv = function() {
      return ih(this.Zu);
    }, p.prototype.set_motorSpeed = p.prototype.Iv = function(e) {
      var n = this.Zu;
      e && typeof e == "object" && (e = e.Zu), ph(n, e);
    }, Object.defineProperty(p.prototype, "motorSpeed", { get: p.prototype.Cv, set: p.prototype.Iv }), p.prototype.get_stiffness = p.prototype.xv = function() {
      return uh(this.Zu);
    }, p.prototype.set_stiffness = p.prototype.yv = function(e) {
      var n = this.Zu;
      e && typeof e == "object" && (e = e.Zu), sh(n, e);
    }, Object.defineProperty(p.prototype, "stiffness", { get: p.prototype.xv, set: p.prototype.yv }), p.prototype.get_damping = p.prototype.rv = function() {
      return ch(this.Zu);
    }, p.prototype.set_damping = p.prototype.uv = function(e) {
      var n = this.Zu;
      e && typeof e == "object" && (e = e.Zu), ah(n, e);
    }, Object.defineProperty(p.prototype, "damping", { get: p.prototype.rv, set: p.prototype.uv }), p.prototype.get_type = p.prototype.cv = function() {
      return lh(this.Zu);
    }, p.prototype.set_type = p.prototype.ev = function(e) {
      var n = this.Zu;
      e && typeof e == "object" && (e = e.Zu), yh(n, e);
    }, Object.defineProperty(p.prototype, "type", { get: p.prototype.cv, set: p.prototype.ev }), p.prototype.get_userData = p.prototype.dv = function() {
      return r(mh(this.Zu), I);
    }, p.prototype.set_userData = p.prototype.fv = function(e) {
      var n = this.Zu;
      e && typeof e == "object" && (e = e.Zu), fh(n, e);
    }, Object.defineProperty(p.prototype, "userData", { get: p.prototype.dv, set: p.prototype.fv }), p.prototype.get_bodyA = p.prototype.gv = function() {
      return r(dh(this.Zu), s);
    }, p.prototype.set_bodyA = p.prototype.kv = function(e) {
      var n = this.Zu;
      e && typeof e == "object" && (e = e.Zu), bh(n, e);
    }, Object.defineProperty(p.prototype, "bodyA", { get: p.prototype.gv, set: p.prototype.kv }), p.prototype.get_bodyB = p.prototype.hv = function() {
      return r(gh(this.Zu), s);
    }, p.prototype.set_bodyB = p.prototype.lv = function(e) {
      var n = this.Zu;
      e && typeof e == "object" && (e = e.Zu), hh(n, e);
    }, Object.defineProperty(p.prototype, "bodyB", { get: p.prototype.hv, set: p.prototype.lv }), p.prototype.get_collideConnected = p.prototype.jv = function() {
      return !!Zh(this.Zu);
    }, p.prototype.set_collideConnected = p.prototype.mv = function(e) {
      var n = this.Zu;
      e && typeof e == "object" && (e = e.Zu), vh(n, e);
    }, Object.defineProperty(p.prototype, "collideConnected", { get: p.prototype.jv, set: p.prototype.mv }), p.prototype.__destroy__ = p.prototype.bv = function() {
      Jh(this.Zu);
    };
    function _t() {
      throw "cannot construct a b2MotorJoint, no constructor in IDL";
    }
    _t.prototype = Object.create(x.prototype), _t.prototype.constructor = _t, _t.prototype.$u = _t, _t.av = {}, t.b2MotorJoint = _t, _t.prototype.SetLinearOffset = function(e) {
      var n = this.Zu;
      e && typeof e == "object" && (e = e.Zu), Dh(n, e);
    }, _t.prototype.GetLinearOffset = function() {
      return r(jh(this.Zu), i);
    }, _t.prototype.SetAngularOffset = function(e) {
      var n = this.Zu;
      e && typeof e == "object" && (e = e.Zu), Sh(n, e);
    }, _t.prototype.GetAngularOffset = function() {
      return Gh(this.Zu);
    }, _t.prototype.SetMaxForce = function(e) {
      var n = this.Zu;
      e && typeof e == "object" && (e = e.Zu), Ah(n, e);
    }, _t.prototype.GetMaxForce = function() {
      return Ch(this.Zu);
    }, _t.prototype.SetMaxTorque = function(e) {
      var n = this.Zu;
      e && typeof e == "object" && (e = e.Zu), Ph(n, e);
    }, _t.prototype.GetMaxTorque = function() {
      return Bh(this.Zu);
    }, _t.prototype.SetCorrectionFactor = function(e) {
      var n = this.Zu;
      e && typeof e == "object" && (e = e.Zu), xh(n, e);
    }, _t.prototype.GetCorrectionFactor = function() {
      return Mh(this.Zu);
    }, _t.prototype.GetType = function() {
      return wh(this.Zu);
    }, _t.prototype.GetBodyA = function() {
      return r(Rh(this.Zu), s);
    }, _t.prototype.GetBodyB = function() {
      return r(Fh(this.Zu), s);
    }, _t.prototype.GetAnchorA = function() {
      return r(Th(this.Zu), i);
    }, _t.prototype.GetAnchorB = function() {
      return r(Oh(this.Zu), i);
    }, _t.prototype.GetReactionForce = function(e) {
      var n = this.Zu;
      return e && typeof e == "object" && (e = e.Zu), r(Wh(n, e), i);
    }, _t.prototype.GetReactionTorque = function(e) {
      var n = this.Zu;
      return e && typeof e == "object" && (e = e.Zu), Lh(n, e);
    }, _t.prototype.GetNext = function() {
      return r(Ih(this.Zu), x);
    }, _t.prototype.GetUserData = function() {
      return r(qh(this.Zu), I);
    }, _t.prototype.GetCollideConnected = function() {
      return !!kh(this.Zu);
    }, _t.prototype.__destroy__ = _t.prototype.bv = function() {
      Eh(this.Zu);
    };
    function b() {
      this.Zu = zh(), B(b)[this.Zu] = this;
    }
    b.prototype = Object.create(A.prototype), b.prototype.constructor = b, b.prototype.$u = b, b.av = {}, t.b2MotorJointDef = b, b.prototype.Initialize = function(e, n) {
      var o = this.Zu;
      e && typeof e == "object" && (e = e.Zu), n && typeof n == "object" && (n = n.Zu), Vh(o, e, n);
    }, b.prototype.get_linearOffset = b.prototype.wx = function() {
      return r(Uh(this.Zu), i);
    }, b.prototype.set_linearOffset = b.prototype.vz = function(e) {
      var n = this.Zu;
      e && typeof e == "object" && (e = e.Zu), $h(n, e);
    }, Object.defineProperty(b.prototype, "linearOffset", { get: b.prototype.wx, set: b.prototype.vz }), b.prototype.get_angularOffset = b.prototype.Gw = function() {
      return Nh(this.Zu);
    }, b.prototype.set_angularOffset = b.prototype.Ey = function(e) {
      var n = this.Zu;
      e && typeof e == "object" && (e = e.Zu), Hh(n, e);
    }, Object.defineProperty(b.prototype, "angularOffset", { get: b.prototype.Gw, set: b.prototype.Ey }), b.prototype.get_maxForce = b.prototype.Bv = function() {
      return Qh(this.Zu);
    }, b.prototype.set_maxForce = b.prototype.Hv = function(e) {
      var n = this.Zu;
      e && typeof e == "object" && (e = e.Zu), Xh(n, e);
    }, Object.defineProperty(b.prototype, "maxForce", { get: b.prototype.Bv, set: b.prototype.Hv }), b.prototype.get_maxTorque = b.prototype.Xv = function() {
      return Yh(this.Zu);
    }, b.prototype.set_maxTorque = b.prototype.rw = function(e) {
      var n = this.Zu;
      e && typeof e == "object" && (e = e.Zu), Kh(n, e);
    }, Object.defineProperty(b.prototype, "maxTorque", { get: b.prototype.Xv, set: b.prototype.rw }), b.prototype.get_correctionFactor = b.prototype.Ww = function() {
      return tZ(this.Zu);
    }, b.prototype.set_correctionFactor = b.prototype.Uy = function(e) {
      var n = this.Zu;
      e && typeof e == "object" && (e = e.Zu), eZ(n, e);
    }, Object.defineProperty(b.prototype, "correctionFactor", { get: b.prototype.Ww, set: b.prototype.Uy }), b.prototype.get_type = b.prototype.cv = function() {
      return nZ(this.Zu);
    }, b.prototype.set_type = b.prototype.ev = function(e) {
      var n = this.Zu;
      e && typeof e == "object" && (e = e.Zu), oZ(n, e);
    }, Object.defineProperty(b.prototype, "type", { get: b.prototype.cv, set: b.prototype.ev }), b.prototype.get_userData = b.prototype.dv = function() {
      return r(rZ(this.Zu), I);
    }, b.prototype.set_userData = b.prototype.fv = function(e) {
      var n = this.Zu;
      e && typeof e == "object" && (e = e.Zu), _Z(n, e);
    }, Object.defineProperty(b.prototype, "userData", { get: b.prototype.dv, set: b.prototype.fv }), b.prototype.get_bodyA = b.prototype.gv = function() {
      return r(iZ(this.Zu), s);
    }, b.prototype.set_bodyA = b.prototype.kv = function(e) {
      var n = this.Zu;
      e && typeof e == "object" && (e = e.Zu), pZ(n, e);
    }, Object.defineProperty(b.prototype, "bodyA", { get: b.prototype.gv, set: b.prototype.kv }), b.prototype.get_bodyB = b.prototype.hv = function() {
      return r(uZ(this.Zu), s);
    }, b.prototype.set_bodyB = b.prototype.lv = function(e) {
      var n = this.Zu;
      e && typeof e == "object" && (e = e.Zu), sZ(n, e);
    }, Object.defineProperty(b.prototype, "bodyB", { get: b.prototype.hv, set: b.prototype.lv }), b.prototype.get_collideConnected = b.prototype.jv = function() {
      return !!cZ(this.Zu);
    }, b.prototype.set_collideConnected = b.prototype.mv = function(e) {
      var n = this.Zu;
      e && typeof e == "object" && (e = e.Zu), aZ(n, e);
    }, Object.defineProperty(b.prototype, "collideConnected", { get: b.prototype.jv, set: b.prototype.mv }), b.prototype.__destroy__ = b.prototype.bv = function() {
      lZ(this.Zu);
    };
    function f() {
      this.Zu = yZ(), B(f)[this.Zu] = this;
    }
    f.prototype = Object.create(G.prototype), f.prototype.constructor = f, f.prototype.$u = f, f.av = {}, t.b2RopeTuning = f, f.prototype.get_stretchingModel = f.prototype.ny = function() {
      return mZ(this.Zu);
    }, f.prototype.set_stretchingModel = f.prototype.mA = function(e) {
      var n = this.Zu;
      e && typeof e == "object" && (e = e.Zu), fZ(n, e);
    }, Object.defineProperty(f.prototype, "stretchingModel", { get: f.prototype.ny, set: f.prototype.mA }), f.prototype.get_bendingModel = f.prototype.Nw = function() {
      return dZ(this.Zu);
    }, f.prototype.set_bendingModel = f.prototype.Ly = function(e) {
      var n = this.Zu;
      e && typeof e == "object" && (e = e.Zu), bZ(n, e);
    }, Object.defineProperty(f.prototype, "bendingModel", { get: f.prototype.Nw, set: f.prototype.Ly }), f.prototype.get_damping = f.prototype.rv = function() {
      return gZ(this.Zu);
    }, f.prototype.set_damping = f.prototype.uv = function(e) {
      var n = this.Zu;
      e && typeof e == "object" && (e = e.Zu), hZ(n, e);
    }, Object.defineProperty(f.prototype, "damping", { get: f.prototype.rv, set: f.prototype.uv }), f.prototype.get_stretchStiffness = f.prototype.my = function() {
      return ZZ(this.Zu);
    }, f.prototype.set_stretchStiffness = f.prototype.lA = function(e) {
      var n = this.Zu;
      e && typeof e == "object" && (e = e.Zu), vZ(n, e);
    }, Object.defineProperty(f.prototype, "stretchStiffness", { get: f.prototype.my, set: f.prototype.lA }), f.prototype.get_stretchHertz = f.prototype.ly = function() {
      return JZ(this.Zu);
    }, f.prototype.set_stretchHertz = f.prototype.kA = function(e) {
      var n = this.Zu;
      e && typeof e == "object" && (e = e.Zu), DZ(n, e);
    }, Object.defineProperty(f.prototype, "stretchHertz", { get: f.prototype.ly, set: f.prototype.kA }), f.prototype.get_stretchDamping = f.prototype.ky = function() {
      return jZ(this.Zu);
    }, f.prototype.set_stretchDamping = f.prototype.jA = function(e) {
      var n = this.Zu;
      e && typeof e == "object" && (e = e.Zu), SZ(n, e);
    }, Object.defineProperty(f.prototype, "stretchDamping", { get: f.prototype.ky, set: f.prototype.jA }), f.prototype.get_bendStiffness = f.prototype.Mw = function() {
      return GZ(this.Zu);
    }, f.prototype.set_bendStiffness = f.prototype.Ky = function(e) {
      var n = this.Zu;
      e && typeof e == "object" && (e = e.Zu), AZ(n, e);
    }, Object.defineProperty(f.prototype, "bendStiffness", { get: f.prototype.Mw, set: f.prototype.Ky }), f.prototype.get_bendHertz = f.prototype.Lw = function() {
      return CZ(this.Zu);
    }, f.prototype.set_bendHertz = f.prototype.Jy = function(e) {
      var n = this.Zu;
      e && typeof e == "object" && (e = e.Zu), PZ(n, e);
    }, Object.defineProperty(f.prototype, "bendHertz", { get: f.prototype.Lw, set: f.prototype.Jy }), f.prototype.get_bendDamping = f.prototype.Kw = function() {
      return BZ(this.Zu);
    }, f.prototype.set_bendDamping = f.prototype.Iy = function(e) {
      var n = this.Zu;
      e && typeof e == "object" && (e = e.Zu), xZ(n, e);
    }, Object.defineProperty(f.prototype, "bendDamping", { get: f.prototype.Kw, set: f.prototype.Iy }), f.prototype.get_isometric = f.prototype.nx = function() {
      return !!MZ(this.Zu);
    }, f.prototype.set_isometric = f.prototype.lz = function(e) {
      var n = this.Zu;
      e && typeof e == "object" && (e = e.Zu), wZ(n, e);
    }, Object.defineProperty(f.prototype, "isometric", { get: f.prototype.nx, set: f.prototype.lz }), f.prototype.get_fixedEffectiveMass = f.prototype.ax = function() {
      return !!RZ(this.Zu);
    }, f.prototype.set_fixedEffectiveMass = f.prototype.Zy = function(e) {
      var n = this.Zu;
      e && typeof e == "object" && (e = e.Zu), FZ(n, e);
    }, Object.defineProperty(f.prototype, "fixedEffectiveMass", { get: f.prototype.ax, set: f.prototype.Zy }), f.prototype.get_warmStart = f.prototype.yy = function() {
      return !!TZ(this.Zu);
    }, f.prototype.set_warmStart = f.prototype.xA = function(e) {
      var n = this.Zu;
      e && typeof e == "object" && (e = e.Zu), OZ(n, e);
    }, Object.defineProperty(f.prototype, "warmStart", { get: f.prototype.yy, set: f.prototype.xA }), f.prototype.__destroy__ = f.prototype.bv = function() {
      WZ(this.Zu);
    };
    function C() {
      this.Zu = LZ(), B(C)[this.Zu] = this;
    }
    C.prototype = Object.create(G.prototype), C.prototype.constructor = C, C.prototype.$u = C, C.av = {}, t.b2RopeDef = C, C.prototype.get_position = C.prototype.bw = function() {
      return r(IZ(this.Zu), i);
    }, C.prototype.set_position = C.prototype.ww = function(e) {
      var n = this.Zu;
      e && typeof e == "object" && (e = e.Zu), qZ(n, e);
    }, Object.defineProperty(C.prototype, "position", { get: C.prototype.bw, set: C.prototype.ww }), C.prototype.get_vertices = C.prototype.xy = function() {
      return r(kZ(this.Zu), i);
    }, C.prototype.set_vertices = C.prototype.wA = function(e) {
      var n = this.Zu;
      e && typeof e == "object" && (e = e.Zu), EZ(n, e);
    }, Object.defineProperty(C.prototype, "vertices", { get: C.prototype.xy, set: C.prototype.wA }), C.prototype.get_count = C.prototype.Nv = function() {
      return zZ(this.Zu);
    }, C.prototype.set_count = C.prototype.hw = function(e) {
      var n = this.Zu;
      e && typeof e == "object" && (e = e.Zu), VZ(n, e);
    }, Object.defineProperty(C.prototype, "count", { get: C.prototype.Nv, set: C.prototype.hw }), C.prototype.get_gravity = C.prototype.fx = function() {
      return r(UZ(this.Zu), i);
    }, C.prototype.set_gravity = C.prototype.dz = function(e) {
      var n = this.Zu;
      e && typeof e == "object" && (e = e.Zu), $Z(n, e);
    }, Object.defineProperty(C.prototype, "gravity", { get: C.prototype.fx, set: C.prototype.dz }), C.prototype.get_tuning = C.prototype.ry = function() {
      return r(NZ(this.Zu), f);
    }, C.prototype.set_tuning = C.prototype.qA = function(e) {
      var n = this.Zu;
      e && typeof e == "object" && (e = e.Zu), HZ(n, e);
    }, Object.defineProperty(C.prototype, "tuning", { get: C.prototype.ry, set: C.prototype.qA }), C.prototype.__destroy__ = C.prototype.bv = function() {
      QZ(this.Zu);
    };
    function gt() {
      this.Zu = XZ(), B(gt)[this.Zu] = this;
    }
    gt.prototype = Object.create(G.prototype), gt.prototype.constructor = gt, gt.prototype.$u = gt, gt.av = {}, t.b2Rope = gt, gt.prototype.Create = function(e) {
      var n = this.Zu;
      e && typeof e == "object" && (e = e.Zu), YZ(n, e);
    }, gt.prototype.SetTuning = function(e) {
      var n = this.Zu;
      e && typeof e == "object" && (e = e.Zu), KZ(n, e);
    }, gt.prototype.Step = function(e, n, o) {
      var _ = this.Zu;
      e && typeof e == "object" && (e = e.Zu), n && typeof n == "object" && (n = n.Zu), o && typeof o == "object" && (o = o.Zu), tv(_, e, n, o);
    }, gt.prototype.Reset = function(e) {
      var n = this.Zu;
      e && typeof e == "object" && (e = e.Zu), ev(n, e);
    }, gt.prototype.Draw = function(e) {
      var n = this.Zu;
      e && typeof e == "object" && (e = e.Zu), nv(n, e);
    }, gt.prototype.__destroy__ = gt.prototype.bv = function() {
      ov(this.Zu);
    };
    function lt() {
      this.Zu = rv(), B(lt)[this.Zu] = this;
    }
    lt.prototype = Object.create(G.prototype), lt.prototype.constructor = lt, lt.prototype.$u = lt, lt.av = {}, t.b2ClipVertex = lt, lt.prototype.get_v = lt.prototype.wy = function() {
      return r(_v(this.Zu), i);
    }, lt.prototype.set_v = lt.prototype.vA = function(e) {
      var n = this.Zu;
      e && typeof e == "object" && (e = e.Zu), iv(n, e);
    }, Object.defineProperty(lt.prototype, "v", { get: lt.prototype.wy, set: lt.prototype.vA }), lt.prototype.get_id = lt.prototype.Qv = function() {
      return r(pv(this.Zu), ct);
    }, lt.prototype.set_id = lt.prototype.kw = function(e) {
      var n = this.Zu;
      e && typeof e == "object" && (e = e.Zu), uv(n, e);
    }, Object.defineProperty(lt.prototype, "id", { get: lt.prototype.Qv, set: lt.prototype.kw }), lt.prototype.__destroy__ = lt.prototype.bv = function() {
      sv(this.Zu);
    }, function() {
      function e() {
        t.b2Shape.e_circle = cv(), t.b2Shape.e_edge = av(), t.b2Shape.e_polygon = lv(), t.b2Shape.e_chain = yv(), t.b2Shape.e_typeCount = mv(), t.b2_staticBody = fv(), t.b2_kinematicBody = dv(), t.b2_dynamicBody = bv(), t.e_unknownJoint = gv(), t.e_revoluteJoint = hv(), t.e_prismaticJoint = Zv(), t.e_distanceJoint = vv(), t.e_pulleyJoint = Jv(), t.e_mouseJoint = Dv(), t.e_gearJoint = jv(), t.e_wheelJoint = Sv(), t.e_weldJoint = Gv(), t.e_frictionJoint = Av(), t.e_ropeJoint = Cv(), t.e_motorJoint = Pv(), t.b2ContactFeature.e_vertex = Bv(), t.b2ContactFeature.e_face = xv(), t.b2Draw.e_shapeBit = Mv(), t.b2Draw.e_jointBit = wv(), t.b2Draw.e_aabbBit = Rv(), t.b2Draw.e_pairBit = Fv(), t.b2Draw.e_centerOfMassBit = Tv(), t.b2Manifold.e_circles = Ov(), t.b2Manifold.e_faceA = Wv(), t.b2Manifold.e_faceB = Lv(), t.b2_nullState = Iv(), t.b2_addState = qv(), t.b2_persistState = kv(), t.b2_removeState = Ev(), t.b2_pbdStretchingModel = zv(), t.b2_xpbdStretchingModel = Vv(), t.b2_springAngleBendingModel = Uv(), t.b2_pbdAngleBendingModel = $v(), t.b2_xpbdAngleBendingModel = Nv(), t.b2_pbdDistanceBendingModel = Hv(), t.b2_pbdHeightBendingModel = Qv();
      }
      Se ? e() : ie.unshift(e);
    }(), C.prototype.get_masses = C.prototype.Nx = function() {
      return r(Xv(this.Zu), i);
    }, C.prototype.set_masses = C.prototype.Mz = function(e) {
      var n = this.Zu;
      e && typeof e == "object" && (e = e.Zu), Yv(n, e);
    }, Object.defineProperty(C.prototype, "masses", { get: C.prototype.Nx, set: C.prototype.Mz });
    const w = (e) => typeof e == "object" ? e.Zu : e;
    t.b2GetPointStates = (e, n, o, _) => {
      Kv(w(e), w(n), w(o), w(_));
    }, t.b2CollideCircles = (e, n, o, _, l) => {
      tJ(w(e), w(n), w(o), w(_), w(l));
    }, t.b2CollidePolygonAndCircle = (e, n, o, _, l) => {
      eJ(w(e), w(n), w(o), w(_), w(l));
    }, t.b2CollidePolygons = (e, n, o, _, l) => {
      nJ(w(e), w(n), w(o), w(_), w(l));
    }, t.b2CollideEdgeAndCircle = (e, n, o, _, l) => {
      oJ(w(e), w(n), w(o), w(_), w(l));
    }, t.b2CollideEdgeAndPolygon = (e, n, o, _, l) => {
      rJ(w(e), w(n), w(o), w(_), w(l));
    }, t.b2ClipSegmentToLine = (e, n, o, _, l) => _J(w(e), w(n), w(o), _, l), t.b2TestOverlap = (e, n, o, _, l, U) => o === void 0 ? !!pJ(w(e), w(n)) : !!iJ(w(e), n, w(o), _, w(l), w(U)), t.reifyArray = (e, n, o, _) => Array.from({ length: n }, (l, U) => r(e + U * o, _)), t.pointsToVec2Array = (e) => {
      const n = new Float32Array(2 * e.length);
      for (let _ = 0; _ < e.length; _++) {
        const { x: l, y: U } = e[_];
        n[2 * _] = l, n[2 * _ + 1] = U;
      }
      const o = t._malloc(n.byteLength);
      return Yt.set(n, o >> 2), [r(o, i), () => t._free(o)];
    }, t.tuplesToVec2Array = (e) => {
      const n = new Float32Array(2 * e.length);
      for (let _ = 0; _ < e.length; _++) {
        const [l, U] = e[_];
        n[2 * _] = l, n[2 * _ + 1] = U;
      }
      const o = t._malloc(n.byteLength);
      return Yt.set(n, o >> 2), [r(o, i), () => t._free(o)];
    }, t.toFloatArray = (e) => {
      e = new Float32Array(e);
      const n = t._malloc(e.byteLength);
      return Yt.set(e, n >> 2), [r(n), () => t._free(n)];
    }, t.sizeof = (e) => {
      const n = new e();
      e = new e();
      const o = e.Zu - n.Zu;
      return e.bv(), n.bv(), o;
    }, t.allocateArray = (e, n, o = 1) => {
      n = new ArrayBuffer(n * o);
      const _ = t._malloc(n.byteLength);
      return Tt.set(n, _), [r(_, e), () => t._free(_)];
    }, t.b2LinearStiffness = (e, n, o, _, l, U) => {
      uJ(w(e), w(n), o, _, w(l), w(U));
    }, t.b2AngularStiffness = (e, n, o, _, l, U) => {
      sJ(w(e), w(n), o, _, w(l), w(U));
    };
    function It() {
      this.Lv = /* @__PURE__ */ new Map(), this.recordLeak = this.recordLeak.bind(this), this.safeWrapPointer = this.safeWrapPointer.bind(this), this.freeLeaked = this.freeLeaked.bind(this);
    }
    return It.prototype.constructor = It, It.freeFromCache = function(e, n = t.getClass(e)) {
      delete t.getCache(n)[t.getPointer(e)];
    }, It.prototype.recordLeak = function(e, n = t.getClass(e)) {
      const o = this.Lv.get(n) ?? /* @__PURE__ */ new Set();
      return o.add(e), this.Lv.set(n, o), e;
    }, It.prototype.safeWrapPointer = function(e, n) {
      return this.CA(t.wrapPointer(e, n), n);
    }, It.prototype.freeLeaked = function() {
      Array.from(this.Lv.entries()).forEach(([e, n]) => {
        e = t.getCache(e);
        for (const o of n) delete e[t.getPointer(o)];
      }), this.Lv.clear();
    }, t.LeakMitigator = It, Vt.ready;
  };
}();
export {
  gJ as default
};
