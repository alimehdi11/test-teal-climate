(self.webpackChunkfrontend = self.webpackChunkfrontend || []).push([
  [64],
  {
    9568: function (t) {
      (function () {
        var e, r, i, n, s, a;
        "undefined" !== typeof performance &&
        null !== performance &&
        performance.now
          ? (t.exports = function () {
              return performance.now();
            })
          : "undefined" !== typeof process && null !== process && process.hrtime
            ? ((t.exports = function () {
                return (e() - s) / 1e6;
              }),
              (r = process.hrtime),
              (n = (e = function () {
                var t;
                return 1e9 * (t = r())[0] + t[1];
              })()),
              (a = 1e9 * process.uptime()),
              (s = n - a))
            : Date.now
              ? ((t.exports = function () {
                  return Date.now() - i;
                }),
                (i = Date.now()))
              : ((t.exports = function () {
                  return new Date().getTime() - i;
                }),
                (i = new Date().getTime()));
      }).call(this);
    },
    6868: (t, e, r) => {
      for (
        var i = r(9568),
          n = "undefined" === typeof window ? r.g : window,
          s = ["moz", "webkit"],
          a = "AnimationFrame",
          o = n["request" + a],
          h = n["cancel" + a] || n["cancelRequest" + a],
          u = 0;
        !o && u < s.length;
        u++
      )
        (o = n[s[u] + "Request" + a]),
          (h = n[s[u] + "Cancel" + a] || n[s[u] + "CancelRequest" + a]);
      if (!o || !h) {
        var l = 0,
          c = 0,
          g = [];
        (o = function (t) {
          if (0 === g.length) {
            var e = i(),
              r = Math.max(0, 16.666666666666668 - (e - l));
            (l = r + e),
              setTimeout(function () {
                var t = g.slice(0);
                g.length = 0;
                for (var e = 0; e < t.length; e++)
                  if (!t[e].cancelled)
                    try {
                      t[e].callback(l);
                    } catch (r) {
                      setTimeout(function () {
                        throw r;
                      }, 0);
                    }
              }, Math.round(r));
          }
          return g.push({ handle: ++c, callback: t, cancelled: !1 }), c;
        }),
          (h = function (t) {
            for (var e = 0; e < g.length; e++)
              g[e].handle === t && (g[e].cancelled = !0);
          });
      }
      (t.exports = function (t) {
        return o.call(n, t);
      }),
        (t.exports.cancel = function () {
          h.apply(n, arguments);
        }),
        (t.exports.polyfill = function (t) {
          t || (t = n),
            (t.requestAnimationFrame = o),
            (t.cancelAnimationFrame = h);
        });
    },
    8464: (t) => {
      t.exports = function (t) {
        (this.ok = !1),
          (this.alpha = 1),
          "#" == t.charAt(0) && (t = t.substr(1, 6)),
          (t = (t = t.replace(/ /g, "")).toLowerCase());
        var e = {
          aliceblue: "f0f8ff",
          antiquewhite: "faebd7",
          aqua: "00ffff",
          aquamarine: "7fffd4",
          azure: "f0ffff",
          beige: "f5f5dc",
          bisque: "ffe4c4",
          black: "000000",
          blanchedalmond: "ffebcd",
          blue: "0000ff",
          blueviolet: "8a2be2",
          brown: "a52a2a",
          burlywood: "deb887",
          cadetblue: "5f9ea0",
          chartreuse: "7fff00",
          chocolate: "d2691e",
          coral: "ff7f50",
          cornflowerblue: "6495ed",
          cornsilk: "fff8dc",
          crimson: "dc143c",
          cyan: "00ffff",
          darkblue: "00008b",
          darkcyan: "008b8b",
          darkgoldenrod: "b8860b",
          darkgray: "a9a9a9",
          darkgreen: "006400",
          darkkhaki: "bdb76b",
          darkmagenta: "8b008b",
          darkolivegreen: "556b2f",
          darkorange: "ff8c00",
          darkorchid: "9932cc",
          darkred: "8b0000",
          darksalmon: "e9967a",
          darkseagreen: "8fbc8f",
          darkslateblue: "483d8b",
          darkslategray: "2f4f4f",
          darkturquoise: "00ced1",
          darkviolet: "9400d3",
          deeppink: "ff1493",
          deepskyblue: "00bfff",
          dimgray: "696969",
          dodgerblue: "1e90ff",
          feldspar: "d19275",
          firebrick: "b22222",
          floralwhite: "fffaf0",
          forestgreen: "228b22",
          fuchsia: "ff00ff",
          gainsboro: "dcdcdc",
          ghostwhite: "f8f8ff",
          gold: "ffd700",
          goldenrod: "daa520",
          gray: "808080",
          green: "008000",
          greenyellow: "adff2f",
          honeydew: "f0fff0",
          hotpink: "ff69b4",
          indianred: "cd5c5c",
          indigo: "4b0082",
          ivory: "fffff0",
          khaki: "f0e68c",
          lavender: "e6e6fa",
          lavenderblush: "fff0f5",
          lawngreen: "7cfc00",
          lemonchiffon: "fffacd",
          lightblue: "add8e6",
          lightcoral: "f08080",
          lightcyan: "e0ffff",
          lightgoldenrodyellow: "fafad2",
          lightgrey: "d3d3d3",
          lightgreen: "90ee90",
          lightpink: "ffb6c1",
          lightsalmon: "ffa07a",
          lightseagreen: "20b2aa",
          lightskyblue: "87cefa",
          lightslateblue: "8470ff",
          lightslategray: "778899",
          lightsteelblue: "b0c4de",
          lightyellow: "ffffe0",
          lime: "00ff00",
          limegreen: "32cd32",
          linen: "faf0e6",
          magenta: "ff00ff",
          maroon: "800000",
          mediumaquamarine: "66cdaa",
          mediumblue: "0000cd",
          mediumorchid: "ba55d3",
          mediumpurple: "9370d8",
          mediumseagreen: "3cb371",
          mediumslateblue: "7b68ee",
          mediumspringgreen: "00fa9a",
          mediumturquoise: "48d1cc",
          mediumvioletred: "c71585",
          midnightblue: "191970",
          mintcream: "f5fffa",
          mistyrose: "ffe4e1",
          moccasin: "ffe4b5",
          navajowhite: "ffdead",
          navy: "000080",
          oldlace: "fdf5e6",
          olive: "808000",
          olivedrab: "6b8e23",
          orange: "ffa500",
          orangered: "ff4500",
          orchid: "da70d6",
          palegoldenrod: "eee8aa",
          palegreen: "98fb98",
          paleturquoise: "afeeee",
          palevioletred: "d87093",
          papayawhip: "ffefd5",
          peachpuff: "ffdab9",
          peru: "cd853f",
          pink: "ffc0cb",
          plum: "dda0dd",
          powderblue: "b0e0e6",
          purple: "800080",
          rebeccapurple: "663399",
          red: "ff0000",
          rosybrown: "bc8f8f",
          royalblue: "4169e1",
          saddlebrown: "8b4513",
          salmon: "fa8072",
          sandybrown: "f4a460",
          seagreen: "2e8b57",
          seashell: "fff5ee",
          sienna: "a0522d",
          silver: "c0c0c0",
          skyblue: "87ceeb",
          slateblue: "6a5acd",
          slategray: "708090",
          snow: "fffafa",
          springgreen: "00ff7f",
          steelblue: "4682b4",
          tan: "d2b48c",
          teal: "008080",
          thistle: "d8bfd8",
          tomato: "ff6347",
          turquoise: "40e0d0",
          violet: "ee82ee",
          violetred: "d02090",
          wheat: "f5deb3",
          white: "ffffff",
          whitesmoke: "f5f5f5",
          yellow: "ffff00",
          yellowgreen: "9acd32",
        };
        t = e[t] || t;
        for (
          var r = [
              {
                re: /^rgba\((\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3}),\s*((?:\d?\.)?\d)\)$/,
                example: ["rgba(123, 234, 45, 0.8)", "rgba(255,234,245,1.0)"],
                process: function (t) {
                  return [
                    parseInt(t[1]),
                    parseInt(t[2]),
                    parseInt(t[3]),
                    parseFloat(t[4]),
                  ];
                },
              },
              {
                re: /^rgb\((\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3})\)$/,
                example: ["rgb(123, 234, 45)", "rgb(255,234,245)"],
                process: function (t) {
                  return [parseInt(t[1]), parseInt(t[2]), parseInt(t[3])];
                },
              },
              {
                re: /^([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/,
                example: ["#00ff00", "336699"],
                process: function (t) {
                  return [
                    parseInt(t[1], 16),
                    parseInt(t[2], 16),
                    parseInt(t[3], 16),
                  ];
                },
              },
              {
                re: /^([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,
                example: ["#fb0", "f0f"],
                process: function (t) {
                  return [
                    parseInt(t[1] + t[1], 16),
                    parseInt(t[2] + t[2], 16),
                    parseInt(t[3] + t[3], 16),
                  ];
                },
              },
            ],
            i = 0;
          i < r.length;
          i++
        ) {
          var n = r[i].re,
            s = r[i].process,
            a = n.exec(t);
          if (a) {
            var o = s(a);
            (this.r = o[0]),
              (this.g = o[1]),
              (this.b = o[2]),
              o.length > 3 && (this.alpha = o[3]),
              (this.ok = !0);
          }
        }
        (this.r =
          this.r < 0 || isNaN(this.r) ? 0 : this.r > 255 ? 255 : this.r),
          (this.g =
            this.g < 0 || isNaN(this.g) ? 0 : this.g > 255 ? 255 : this.g),
          (this.b =
            this.b < 0 || isNaN(this.b) ? 0 : this.b > 255 ? 255 : this.b),
          (this.alpha =
            this.alpha < 0
              ? 0
              : this.alpha > 1 || isNaN(this.alpha)
                ? 1
                : this.alpha),
          (this.toRGB = function () {
            return "rgb(" + this.r + ", " + this.g + ", " + this.b + ")";
          }),
          (this.toRGBA = function () {
            return (
              "rgba(" +
              this.r +
              ", " +
              this.g +
              ", " +
              this.b +
              ", " +
              this.alpha +
              ")"
            );
          }),
          (this.toHex = function () {
            var t = this.r.toString(16),
              e = this.g.toString(16),
              r = this.b.toString(16);
            return (
              1 == t.length && (t = "0" + t),
              1 == e.length && (e = "0" + e),
              1 == r.length && (r = "0" + r),
              "#" + t + e + r
            );
          }),
          (this.getHelpXML = function () {
            for (var t = new Array(), i = 0; i < r.length; i++)
              for (var n = r[i].example, s = 0; s < n.length; s++)
                t[t.length] = n[s];
            for (var a in e) t[t.length] = a;
            var o = document.createElement("ul");
            o.setAttribute("id", "rgbcolor-examples");
            for (i = 0; i < t.length; i++)
              try {
                var h = document.createElement("li"),
                  u = new RGBColor(t[i]),
                  l = document.createElement("div");
                (l.style.cssText =
                  "margin: 3px; border: 1px solid black; background:" +
                  u.toHex() +
                  "; color:" +
                  u.toHex()),
                  l.appendChild(document.createTextNode("test"));
                var c = document.createTextNode(
                  " " + t[i] + " -> " + u.toRGB() + " -> " + u.toHex()
                );
                h.appendChild(l), h.appendChild(c), o.appendChild(h);
              } catch (g) {}
            return o;
          });
      };
    },
    7552: (t, e, r) => {
      "use strict";
      var i = r(3700),
        n = r(1355),
        s = TypeError;
      t.exports = function (t) {
        if (i(t)) return t;
        throw new s(n(t) + " is not a function");
      };
    },
    3776: (t, e, r) => {
      "use strict";
      var i = r(6928),
        n = String,
        s = TypeError;
      t.exports = function (t) {
        if (i(t)) return t;
        throw new s("Can't set " + n(t) + " as a prototype");
      };
    },
    7424: (t, e, r) => {
      "use strict";
      var i = r(1952),
        n = r(1412),
        s = r(332).f,
        a = i("unscopables"),
        o = Array.prototype;
      void 0 === o[a] && s(o, a, { configurable: !0, value: n(null) }),
        (t.exports = function (t) {
          o[a][t] = !0;
        });
    },
    2904: (t, e, r) => {
      "use strict";
      var i = r(5960).charAt;
      t.exports = function (t, e, r) {
        return e + (r ? i(t, e).length : 1);
      };
    },
    1152: (t, e, r) => {
      "use strict";
      var i = r(9168),
        n = String,
        s = TypeError;
      t.exports = function (t) {
        if (i(t)) return t;
        throw new s(n(t) + " is not an object");
      };
    },
    7848: (t, e, r) => {
      "use strict";
      var i = r(4248),
        n = r(8411),
        s = r(3152),
        a = function (t) {
          return function (e, r, a) {
            var o,
              h = i(e),
              u = s(h),
              l = n(a, u);
            if (t && r !== r) {
              for (; u > l; ) if ((o = h[l++]) !== o) return !0;
            } else
              for (; u > l; l++)
                if ((t || l in h) && h[l] === r) return t || l || 0;
            return !t && -1;
          };
        };
      t.exports = { includes: a(!0), indexOf: a(!1) };
    },
    2744: (t, e, r) => {
      "use strict";
      var i = r(1320),
        n = i({}.toString),
        s = i("".slice);
      t.exports = function (t) {
        return s(n(t), 8, -1);
      };
    },
    6736: (t, e, r) => {
      "use strict";
      var i = r(2876),
        n = r(3700),
        s = r(2744),
        a = r(1952)("toStringTag"),
        o = Object,
        h =
          "Arguments" ===
          s(
            (function () {
              return arguments;
            })()
          );
      t.exports = i
        ? s
        : function (t) {
            var e, r, i;
            return void 0 === t
              ? "Undefined"
              : null === t
                ? "Null"
                : "string" ==
                    typeof (r = (function (t, e) {
                      try {
                        return t[e];
                      } catch (r) {}
                    })((e = o(t)), a))
                  ? r
                  : h
                    ? s(e)
                    : "Object" === (i = s(e)) && n(e.callee)
                      ? "Arguments"
                      : i;
          };
    },
    1548: (t, e, r) => {
      "use strict";
      var i = r(1848),
        n = r(3112),
        s = r(4888),
        a = r(332);
      t.exports = function (t, e, r) {
        for (var o = n(e), h = a.f, u = s.f, l = 0; l < o.length; l++) {
          var c = o[l];
          i(t, c) || (r && i(r, c)) || h(t, c, u(e, c));
        }
      };
    },
    304: (t, e, r) => {
      "use strict";
      var i = r(172);
      t.exports = !i(function () {
        function t() {}
        return (
          (t.prototype.constructor = null),
          Object.getPrototypeOf(new t()) !== t.prototype
        );
      });
    },
    504: (t) => {
      "use strict";
      t.exports = function (t, e) {
        return { value: t, done: e };
      };
    },
    9560: (t, e, r) => {
      "use strict";
      var i = r(7184),
        n = r(332),
        s = r(3315);
      t.exports = i
        ? function (t, e, r) {
            return n.f(t, e, s(1, r));
          }
        : function (t, e, r) {
            return (t[e] = r), t;
          };
    },
    3315: (t) => {
      "use strict";
      t.exports = function (t, e) {
        return {
          enumerable: !(1 & t),
          configurable: !(2 & t),
          writable: !(4 & t),
          value: e,
        };
      };
    },
    4544: (t, e, r) => {
      "use strict";
      var i = r(3700),
        n = r(332),
        s = r(9676),
        a = r(7312);
      t.exports = function (t, e, r, o) {
        o || (o = {});
        var h = o.enumerable,
          u = void 0 !== o.name ? o.name : e;
        if ((i(r) && s(r, u, o), o.global)) h ? (t[e] = r) : a(e, r);
        else {
          try {
            o.unsafe ? t[e] && (h = !0) : delete t[e];
          } catch (l) {}
          h
            ? (t[e] = r)
            : n.f(t, e, {
                value: r,
                enumerable: !1,
                configurable: !o.nonConfigurable,
                writable: !o.nonWritable,
              });
        }
        return t;
      };
    },
    7312: (t, e, r) => {
      "use strict";
      var i = r(1800),
        n = Object.defineProperty;
      t.exports = function (t, e) {
        try {
          n(i, t, { value: e, configurable: !0, writable: !0 });
        } catch (r) {
          i[t] = e;
        }
        return e;
      };
    },
    7184: (t, e, r) => {
      "use strict";
      var i = r(172);
      t.exports = !i(function () {
        return (
          7 !==
          Object.defineProperty({}, 1, {
            get: function () {
              return 7;
            },
          })[1]
        );
      });
    },
    6320: (t, e, r) => {
      "use strict";
      var i = r(1800),
        n = r(9168),
        s = i.document,
        a = n(s) && n(s.createElement);
      t.exports = function (t) {
        return a ? s.createElement(t) : {};
      };
    },
    6488: (t) => {
      "use strict";
      t.exports = {
        CSSRuleList: 0,
        CSSStyleDeclaration: 0,
        CSSValueList: 0,
        ClientRectList: 0,
        DOMRectList: 0,
        DOMStringList: 0,
        DOMTokenList: 1,
        DataTransferItemList: 0,
        FileList: 0,
        HTMLAllCollection: 0,
        HTMLCollection: 0,
        HTMLFormElement: 0,
        HTMLSelectElement: 0,
        MediaList: 0,
        MimeTypeArray: 0,
        NamedNodeMap: 0,
        NodeList: 1,
        PaintRequestList: 0,
        Plugin: 0,
        PluginArray: 0,
        SVGLengthList: 0,
        SVGNumberList: 0,
        SVGPathSegList: 0,
        SVGPointList: 0,
        SVGStringList: 0,
        SVGTransformList: 0,
        SourceBufferList: 0,
        StyleSheetList: 0,
        TextTrackCueList: 0,
        TextTrackList: 0,
        TouchList: 0,
      };
    },
    1856: (t, e, r) => {
      "use strict";
      var i = r(6320)("span").classList,
        n = i && i.constructor && i.constructor.prototype;
      t.exports = n === Object.prototype ? void 0 : n;
    },
    9020: (t) => {
      "use strict";
      t.exports =
        ("undefined" != typeof navigator && String(navigator.userAgent)) || "";
    },
    2664: (t, e, r) => {
      "use strict";
      var i,
        n,
        s = r(1800),
        a = r(9020),
        o = s.process,
        h = s.Deno,
        u = (o && o.versions) || (h && h.version),
        l = u && u.v8;
      l && (n = (i = l.split("."))[0] > 0 && i[0] < 4 ? 1 : +(i[0] + i[1])),
        !n &&
          a &&
          (!(i = a.match(/Edge\/(\d+)/)) || i[1] >= 74) &&
          (i = a.match(/Chrome\/(\d+)/)) &&
          (n = +i[1]),
        (t.exports = n);
    },
    2056: (t) => {
      "use strict";
      t.exports = [
        "constructor",
        "hasOwnProperty",
        "isPrototypeOf",
        "propertyIsEnumerable",
        "toLocaleString",
        "toString",
        "valueOf",
      ];
    },
    5952: (t, e, r) => {
      "use strict";
      var i = r(1800),
        n = r(4888).f,
        s = r(9560),
        a = r(4544),
        o = r(7312),
        h = r(1548),
        u = r(2968);
      t.exports = function (t, e) {
        var r,
          l,
          c,
          g,
          p,
          f = t.target,
          d = t.global,
          y = t.stat;
        if ((r = d ? i : y ? i[f] || o(f, {}) : i[f] && i[f].prototype))
          for (l in e) {
            if (
              ((g = e[l]),
              (c = t.dontCallGetSet ? (p = n(r, l)) && p.value : r[l]),
              !u(d ? l : f + (y ? "." : "#") + l, t.forced) && void 0 !== c)
            ) {
              if (typeof g == typeof c) continue;
              h(g, c);
            }
            (t.sham || (c && c.sham)) && s(g, "sham", !0), a(r, l, g, t);
          }
      };
    },
    172: (t) => {
      "use strict";
      t.exports = function (t) {
        try {
          return !!t();
        } catch (e) {
          return !0;
        }
      };
    },
    4720: (t, e, r) => {
      "use strict";
      r(1864);
      var i = r(9232),
        n = r(4544),
        s = r(9308),
        a = r(172),
        o = r(1952),
        h = r(9560),
        u = o("species"),
        l = RegExp.prototype;
      t.exports = function (t, e, r, c) {
        var g = o(t),
          p = !a(function () {
            var e = {};
            return (
              (e[g] = function () {
                return 7;
              }),
              7 !== ""[t](e)
            );
          }),
          f =
            p &&
            !a(function () {
              var e = !1,
                r = /a/;
              return (
                "split" === t &&
                  (((r = {}).constructor = {}),
                  (r.constructor[u] = function () {
                    return r;
                  }),
                  (r.flags = ""),
                  (r[g] = /./[g])),
                (r.exec = function () {
                  return (e = !0), null;
                }),
                r[g](""),
                !e
              );
            });
        if (!p || !f || r) {
          var d = /./[g],
            y = e(g, ""[t], function (t, e, r, n, a) {
              var o = e.exec;
              return o === s || o === l.exec
                ? p && !a
                  ? { done: !0, value: i(d, e, r, n) }
                  : { done: !0, value: i(t, r, e, n) }
                : { done: !1 };
            });
          n(String.prototype, t, y[0]), n(l, g, y[1]);
        }
        c && h(l[g], "sham", !0);
      };
    },
    2640: (t, e, r) => {
      "use strict";
      var i = r(9080),
        n = Function.prototype,
        s = n.apply,
        a = n.call;
      t.exports =
        ("object" == typeof Reflect && Reflect.apply) ||
        (i
          ? a.bind(s)
          : function () {
              return a.apply(s, arguments);
            });
    },
    9080: (t, e, r) => {
      "use strict";
      var i = r(172);
      t.exports = !i(function () {
        var t = function () {}.bind();
        return "function" != typeof t || t.hasOwnProperty("prototype");
      });
    },
    9232: (t, e, r) => {
      "use strict";
      var i = r(9080),
        n = Function.prototype.call;
      t.exports = i
        ? n.bind(n)
        : function () {
            return n.apply(n, arguments);
          };
    },
    8728: (t, e, r) => {
      "use strict";
      var i = r(7184),
        n = r(1848),
        s = Function.prototype,
        a = i && Object.getOwnPropertyDescriptor,
        o = n(s, "name"),
        h = o && "something" === function () {}.name,
        u = o && (!i || (i && a(s, "name").configurable));
      t.exports = { EXISTS: o, PROPER: h, CONFIGURABLE: u };
    },
    2152: (t, e, r) => {
      "use strict";
      var i = r(1320),
        n = r(7552);
      t.exports = function (t, e, r) {
        try {
          return i(n(Object.getOwnPropertyDescriptor(t, e)[r]));
        } catch (s) {}
      };
    },
    1320: (t, e, r) => {
      "use strict";
      var i = r(9080),
        n = Function.prototype,
        s = n.call,
        a = i && n.bind.bind(s, s);
      t.exports = i
        ? a
        : function (t) {
            return function () {
              return s.apply(t, arguments);
            };
          };
    },
    8848: (t, e, r) => {
      "use strict";
      var i = r(1800),
        n = r(3700);
      t.exports = function (t, e) {
        return arguments.length < 2
          ? ((r = i[t]), n(r) ? r : void 0)
          : i[t] && i[t][e];
        var r;
      };
    },
    2144: (t, e, r) => {
      "use strict";
      var i = r(7552),
        n = r(9732);
      t.exports = function (t, e) {
        var r = t[e];
        return n(r) ? void 0 : i(r);
      };
    },
    324: (t, e, r) => {
      "use strict";
      var i = r(1320),
        n = r(9604),
        s = Math.floor,
        a = i("".charAt),
        o = i("".replace),
        h = i("".slice),
        u = /\$([$&'`]|\d{1,2}|<[^>]*>)/g,
        l = /\$([$&'`]|\d{1,2})/g;
      t.exports = function (t, e, r, i, c, g) {
        var p = r + t.length,
          f = i.length,
          d = l;
        return (
          void 0 !== c && ((c = n(c)), (d = u)),
          o(g, d, function (n, o) {
            var u;
            switch (a(o, 0)) {
              case "$":
                return "$";
              case "&":
                return t;
              case "`":
                return h(e, 0, r);
              case "'":
                return h(e, p);
              case "<":
                u = c[h(o, 1, -1)];
                break;
              default:
                var l = +o;
                if (0 === l) return n;
                if (l > f) {
                  var g = s(l / 10);
                  return 0 === g
                    ? n
                    : g <= f
                      ? void 0 === i[g - 1]
                        ? a(o, 1)
                        : i[g - 1] + a(o, 1)
                      : n;
                }
                u = i[l - 1];
            }
            return void 0 === u ? "" : u;
          })
        );
      };
    },
    1800: function (t, e, r) {
      "use strict";
      var i = function (t) {
        return t && t.Math === Math && t;
      };
      t.exports =
        i("object" == typeof globalThis && globalThis) ||
        i("object" == typeof window && window) ||
        i("object" == typeof self && self) ||
        i("object" == typeof r.g && r.g) ||
        i("object" == typeof this && this) ||
        (function () {
          return this;
        })() ||
        Function("return this")();
    },
    1848: (t, e, r) => {
      "use strict";
      var i = r(1320),
        n = r(9604),
        s = i({}.hasOwnProperty);
      t.exports =
        Object.hasOwn ||
        function (t, e) {
          return s(n(t), e);
        };
    },
    3067: (t) => {
      "use strict";
      t.exports = {};
    },
    3128: (t, e, r) => {
      "use strict";
      var i = r(8848);
      t.exports = i("document", "documentElement");
    },
    2379: (t, e, r) => {
      "use strict";
      var i = r(7184),
        n = r(172),
        s = r(6320);
      t.exports =
        !i &&
        !n(function () {
          return (
            7 !==
            Object.defineProperty(s("div"), "a", {
              get: function () {
                return 7;
              },
            }).a
          );
        });
    },
    3736: (t, e, r) => {
      "use strict";
      var i = r(1320),
        n = r(172),
        s = r(2744),
        a = Object,
        o = i("".split);
      t.exports = n(function () {
        return !a("z").propertyIsEnumerable(0);
      })
        ? function (t) {
            return "String" === s(t) ? o(t, "") : a(t);
          }
        : a;
    },
    7672: (t, e, r) => {
      "use strict";
      var i = r(1320),
        n = r(3700),
        s = r(2176),
        a = i(Function.toString);
      n(s.inspectSource) ||
        (s.inspectSource = function (t) {
          return a(t);
        }),
        (t.exports = s.inspectSource);
    },
    8652: (t, e, r) => {
      "use strict";
      var i,
        n,
        s,
        a = r(3812),
        o = r(1800),
        h = r(9168),
        u = r(9560),
        l = r(1848),
        c = r(2176),
        g = r(848),
        p = r(3067),
        f = "Object already initialized",
        d = o.TypeError,
        y = o.WeakMap;
      if (a || c.state) {
        var v = c.state || (c.state = new y());
        (v.get = v.get),
          (v.has = v.has),
          (v.set = v.set),
          (i = function (t, e) {
            if (v.has(t)) throw new d(f);
            return (e.facade = t), v.set(t, e), e;
          }),
          (n = function (t) {
            return v.get(t) || {};
          }),
          (s = function (t) {
            return v.has(t);
          });
      } else {
        var m = g("state");
        (p[m] = !0),
          (i = function (t, e) {
            if (l(t, m)) throw new d(f);
            return (e.facade = t), u(t, m, e), e;
          }),
          (n = function (t) {
            return l(t, m) ? t[m] : {};
          }),
          (s = function (t) {
            return l(t, m);
          });
      }
      t.exports = {
        set: i,
        get: n,
        has: s,
        enforce: function (t) {
          return s(t) ? n(t) : i(t, {});
        },
        getterFor: function (t) {
          return function (e) {
            var r;
            if (!h(e) || (r = n(e)).type !== t)
              throw new d("Incompatible receiver, " + t + " required");
            return r;
          };
        },
      };
    },
    3700: (t) => {
      "use strict";
      var e = "object" == typeof document && document.all;
      t.exports =
        "undefined" == typeof e && void 0 !== e
          ? function (t) {
              return "function" == typeof t || t === e;
            }
          : function (t) {
              return "function" == typeof t;
            };
    },
    2968: (t, e, r) => {
      "use strict";
      var i = r(172),
        n = r(3700),
        s = /#|\.prototype\./,
        a = function (t, e) {
          var r = h[o(t)];
          return r === l || (r !== u && (n(e) ? i(e) : !!e));
        },
        o = (a.normalize = function (t) {
          return String(t).replace(s, ".").toLowerCase();
        }),
        h = (a.data = {}),
        u = (a.NATIVE = "N"),
        l = (a.POLYFILL = "P");
      t.exports = a;
    },
    9732: (t) => {
      "use strict";
      t.exports = function (t) {
        return null === t || void 0 === t;
      };
    },
    9168: (t, e, r) => {
      "use strict";
      var i = r(3700);
      t.exports = function (t) {
        return "object" == typeof t ? null !== t : i(t);
      };
    },
    6928: (t, e, r) => {
      "use strict";
      var i = r(9168);
      t.exports = function (t) {
        return i(t) || null === t;
      };
    },
    1551: (t) => {
      "use strict";
      t.exports = !1;
    },
    9896: (t, e, r) => {
      "use strict";
      var i = r(8848),
        n = r(3700),
        s = r(5480),
        a = r(8320),
        o = Object;
      t.exports = a
        ? function (t) {
            return "symbol" == typeof t;
          }
        : function (t) {
            var e = i("Symbol");
            return n(e) && s(e.prototype, o(t));
          };
    },
    1824: (t, e, r) => {
      "use strict";
      var i = r(2268).IteratorPrototype,
        n = r(1412),
        s = r(3315),
        a = r(9928),
        o = r(8012),
        h = function () {
          return this;
        };
      t.exports = function (t, e, r, u) {
        var l = e + " Iterator";
        return (
          (t.prototype = n(i, { next: s(+!u, r) })),
          a(t, l, !1, !0),
          (o[l] = h),
          t
        );
      };
    },
    3340: (t, e, r) => {
      "use strict";
      var i = r(5952),
        n = r(9232),
        s = r(1551),
        a = r(8728),
        o = r(3700),
        h = r(1824),
        u = r(408),
        l = r(952),
        c = r(9928),
        g = r(9560),
        p = r(4544),
        f = r(1952),
        d = r(8012),
        y = r(2268),
        v = a.PROPER,
        m = a.CONFIGURABLE,
        x = y.IteratorPrototype,
        b = y.BUGGY_SAFARI_ITERATORS,
        S = f("iterator"),
        w = "keys",
        T = "values",
        A = "entries",
        O = function () {
          return this;
        };
      t.exports = function (t, e, r, a, f, y, C) {
        h(r, e, a);
        var P,
          E,
          M,
          N = function (t) {
            if (t === f && I) return I;
            if (!b && t && t in R) return R[t];
            switch (t) {
              case w:
              case T:
              case A:
                return function () {
                  return new r(this, t);
                };
            }
            return function () {
              return new r(this);
            };
          },
          _ = e + " Iterator",
          V = !1,
          R = t.prototype,
          k = R[S] || R["@@iterator"] || (f && R[f]),
          I = (!b && k) || N(f),
          L = ("Array" === e && R.entries) || k;
        if (
          (L &&
            (P = u(L.call(new t()))) !== Object.prototype &&
            P.next &&
            (s || u(P) === x || (l ? l(P, x) : o(P[S]) || p(P, S, O)),
            c(P, _, !0, !0),
            s && (d[_] = O)),
          v &&
            f === T &&
            k &&
            k.name !== T &&
            (!s && m
              ? g(R, "name", T)
              : ((V = !0),
                (I = function () {
                  return n(k, this);
                }))),
          f)
        )
          if (((E = { values: N(T), keys: y ? I : N(w), entries: N(A) }), C))
            for (M in E) (b || V || !(M in R)) && p(R, M, E[M]);
          else i({ target: e, proto: !0, forced: b || V }, E);
        return (
          (s && !C) || R[S] === I || p(R, S, I, { name: f }), (d[e] = I), E
        );
      };
    },
    2268: (t, e, r) => {
      "use strict";
      var i,
        n,
        s,
        a = r(172),
        o = r(3700),
        h = r(9168),
        u = r(1412),
        l = r(408),
        c = r(4544),
        g = r(1952),
        p = r(1551),
        f = g("iterator"),
        d = !1;
      [].keys &&
        ("next" in (s = [].keys())
          ? (n = l(l(s))) !== Object.prototype && (i = n)
          : (d = !0)),
        !h(i) ||
        a(function () {
          var t = {};
          return i[f].call(t) !== t;
        })
          ? (i = {})
          : p && (i = u(i)),
        o(i[f]) ||
          c(i, f, function () {
            return this;
          }),
        (t.exports = { IteratorPrototype: i, BUGGY_SAFARI_ITERATORS: d });
    },
    8012: (t) => {
      "use strict";
      t.exports = {};
    },
    3152: (t, e, r) => {
      "use strict";
      var i = r(7132);
      t.exports = function (t) {
        return i(t.length);
      };
    },
    9676: (t, e, r) => {
      "use strict";
      var i = r(1320),
        n = r(172),
        s = r(3700),
        a = r(1848),
        o = r(7184),
        h = r(8728).CONFIGURABLE,
        u = r(7672),
        l = r(8652),
        c = l.enforce,
        g = l.get,
        p = String,
        f = Object.defineProperty,
        d = i("".slice),
        y = i("".replace),
        v = i([].join),
        m =
          o &&
          !n(function () {
            return 8 !== f(function () {}, "length", { value: 8 }).length;
          }),
        x = String(String).split("String"),
        b = (t.exports = function (t, e, r) {
          "Symbol(" === d(p(e), 0, 7) &&
            (e = "[" + y(p(e), /^Symbol\(([^)]*)\).*$/, "$1") + "]"),
            r && r.getter && (e = "get " + e),
            r && r.setter && (e = "set " + e),
            (!a(t, "name") || (h && t.name !== e)) &&
              (o ? f(t, "name", { value: e, configurable: !0 }) : (t.name = e)),
            m &&
              r &&
              a(r, "arity") &&
              t.length !== r.arity &&
              f(t, "length", { value: r.arity });
          try {
            r && a(r, "constructor") && r.constructor
              ? o && f(t, "prototype", { writable: !1 })
              : t.prototype && (t.prototype = void 0);
          } catch (n) {}
          var i = c(t);
          return (
            a(i, "source") || (i.source = v(x, "string" == typeof e ? e : "")),
            t
          );
        });
      Function.prototype.toString = b(function () {
        return (s(this) && g(this).source) || u(this);
      }, "toString");
    },
    4012: (t) => {
      "use strict";
      var e = Math.ceil,
        r = Math.floor;
      t.exports =
        Math.trunc ||
        function (t) {
          var i = +t;
          return (i > 0 ? r : e)(i);
        };
    },
    1412: (t, e, r) => {
      "use strict";
      var i,
        n = r(1152),
        s = r(8368),
        a = r(2056),
        o = r(3067),
        h = r(3128),
        u = r(6320),
        l = r(848),
        c = "prototype",
        g = "script",
        p = l("IE_PROTO"),
        f = function () {},
        d = function (t) {
          return "<" + g + ">" + t + "</" + g + ">";
        },
        y = function (t) {
          t.write(d("")), t.close();
          var e = t.parentWindow.Object;
          return (t = null), e;
        },
        v = function () {
          try {
            i = new ActiveXObject("htmlfile");
          } catch (e) {}
          v =
            "undefined" != typeof document
              ? document.domain && i
                ? y(i)
                : (function () {
                    var t,
                      e = u("iframe"),
                      r = "java" + g + ":";
                    return (
                      (e.style.display = "none"),
                      h.appendChild(e),
                      (e.src = String(r)),
                      (t = e.contentWindow.document).open(),
                      t.write(d("document.F=Object")),
                      t.close(),
                      t.F
                    );
                  })()
              : y(i);
          for (var t = a.length; t--; ) delete v[c][a[t]];
          return v();
        };
      (o[p] = !0),
        (t.exports =
          Object.create ||
          function (t, e) {
            var r;
            return (
              null !== t
                ? ((f[c] = n(t)), (r = new f()), (f[c] = null), (r[p] = t))
                : (r = v()),
              void 0 === e ? r : s.f(r, e)
            );
          });
    },
    8368: (t, e, r) => {
      "use strict";
      var i = r(7184),
        n = r(5808),
        s = r(332),
        a = r(1152),
        o = r(4248),
        h = r(6208);
      e.f =
        i && !n
          ? Object.defineProperties
          : function (t, e) {
              a(t);
              for (var r, i = o(e), n = h(e), u = n.length, l = 0; u > l; )
                s.f(t, (r = n[l++]), i[r]);
              return t;
            };
    },
    332: (t, e, r) => {
      "use strict";
      var i = r(7184),
        n = r(2379),
        s = r(5808),
        a = r(1152),
        o = r(8796),
        h = TypeError,
        u = Object.defineProperty,
        l = Object.getOwnPropertyDescriptor,
        c = "enumerable",
        g = "configurable",
        p = "writable";
      e.f = i
        ? s
          ? function (t, e, r) {
              if (
                (a(t),
                (e = o(e)),
                a(r),
                "function" === typeof t &&
                  "prototype" === e &&
                  "value" in r &&
                  p in r &&
                  !r[p])
              ) {
                var i = l(t, e);
                i &&
                  i[p] &&
                  ((t[e] = r.value),
                  (r = {
                    configurable: g in r ? r[g] : i[g],
                    enumerable: c in r ? r[c] : i[c],
                    writable: !1,
                  }));
              }
              return u(t, e, r);
            }
          : u
        : function (t, e, r) {
            if ((a(t), (e = o(e)), a(r), n))
              try {
                return u(t, e, r);
              } catch (i) {}
            if ("get" in r || "set" in r)
              throw new h("Accessors not supported");
            return "value" in r && (t[e] = r.value), t;
          };
    },
    4888: (t, e, r) => {
      "use strict";
      var i = r(7184),
        n = r(9232),
        s = r(7733),
        a = r(3315),
        o = r(4248),
        h = r(8796),
        u = r(1848),
        l = r(2379),
        c = Object.getOwnPropertyDescriptor;
      e.f = i
        ? c
        : function (t, e) {
            if (((t = o(t)), (e = h(e)), l))
              try {
                return c(t, e);
              } catch (r) {}
            if (u(t, e)) return a(!n(s.f, t, e), t[e]);
          };
    },
    9116: (t, e, r) => {
      "use strict";
      var i = r(363),
        n = r(2056).concat("length", "prototype");
      e.f =
        Object.getOwnPropertyNames ||
        function (t) {
          return i(t, n);
        };
    },
    968: (t, e) => {
      "use strict";
      e.f = Object.getOwnPropertySymbols;
    },
    408: (t, e, r) => {
      "use strict";
      var i = r(1848),
        n = r(3700),
        s = r(9604),
        a = r(848),
        o = r(304),
        h = a("IE_PROTO"),
        u = Object,
        l = u.prototype;
      t.exports = o
        ? u.getPrototypeOf
        : function (t) {
            var e = s(t);
            if (i(e, h)) return e[h];
            var r = e.constructor;
            return n(r) && e instanceof r
              ? r.prototype
              : e instanceof u
                ? l
                : null;
          };
    },
    5480: (t, e, r) => {
      "use strict";
      var i = r(1320);
      t.exports = i({}.isPrototypeOf);
    },
    363: (t, e, r) => {
      "use strict";
      var i = r(1320),
        n = r(1848),
        s = r(4248),
        a = r(7848).indexOf,
        o = r(3067),
        h = i([].push);
      t.exports = function (t, e) {
        var r,
          i = s(t),
          u = 0,
          l = [];
        for (r in i) !n(o, r) && n(i, r) && h(l, r);
        for (; e.length > u; ) n(i, (r = e[u++])) && (~a(l, r) || h(l, r));
        return l;
      };
    },
    6208: (t, e, r) => {
      "use strict";
      var i = r(363),
        n = r(2056);
      t.exports =
        Object.keys ||
        function (t) {
          return i(t, n);
        };
    },
    7733: (t, e) => {
      "use strict";
      var r = {}.propertyIsEnumerable,
        i = Object.getOwnPropertyDescriptor,
        n = i && !r.call({ 1: 2 }, 1);
      e.f = n
        ? function (t) {
            var e = i(this, t);
            return !!e && e.enumerable;
          }
        : r;
    },
    952: (t, e, r) => {
      "use strict";
      var i = r(2152),
        n = r(1152),
        s = r(3776);
      t.exports =
        Object.setPrototypeOf ||
        ("__proto__" in {}
          ? (function () {
              var t,
                e = !1,
                r = {};
              try {
                (t = i(Object.prototype, "__proto__", "set"))(r, []),
                  (e = r instanceof Array);
              } catch (a) {}
              return function (r, i) {
                return n(r), s(i), e ? t(r, i) : (r.__proto__ = i), r;
              };
            })()
          : void 0);
    },
    9440: (t, e, r) => {
      "use strict";
      var i = r(9232),
        n = r(3700),
        s = r(9168),
        a = TypeError;
      t.exports = function (t, e) {
        var r, o;
        if ("string" === e && n((r = t.toString)) && !s((o = i(r, t))))
          return o;
        if (n((r = t.valueOf)) && !s((o = i(r, t)))) return o;
        if ("string" !== e && n((r = t.toString)) && !s((o = i(r, t))))
          return o;
        throw new a("Can't convert object to primitive value");
      };
    },
    3112: (t, e, r) => {
      "use strict";
      var i = r(8848),
        n = r(1320),
        s = r(9116),
        a = r(968),
        o = r(1152),
        h = n([].concat);
      t.exports =
        i("Reflect", "ownKeys") ||
        function (t) {
          var e = s.f(o(t)),
            r = a.f;
          return r ? h(e, r(t)) : e;
        };
    },
    9252: (t, e, r) => {
      "use strict";
      var i = r(9232),
        n = r(1152),
        s = r(3700),
        a = r(2744),
        o = r(9308),
        h = TypeError;
      t.exports = function (t, e) {
        var r = t.exec;
        if (s(r)) {
          var u = i(r, t, e);
          return null !== u && n(u), u;
        }
        if ("RegExp" === a(t)) return i(o, t, e);
        throw new h("RegExp#exec called on incompatible receiver");
      };
    },
    9308: (t, e, r) => {
      "use strict";
      var i = r(9232),
        n = r(1320),
        s = r(9e3),
        a = r(272),
        o = r(3165),
        h = r(8912),
        u = r(1412),
        l = r(8652).get,
        c = r(6416),
        g = r(1280),
        p = h("native-string-replace", String.prototype.replace),
        f = RegExp.prototype.exec,
        d = f,
        y = n("".charAt),
        v = n("".indexOf),
        m = n("".replace),
        x = n("".slice),
        b = (function () {
          var t = /a/,
            e = /b*/g;
          return (
            i(f, t, "a"), i(f, e, "a"), 0 !== t.lastIndex || 0 !== e.lastIndex
          );
        })(),
        S = o.BROKEN_CARET,
        w = void 0 !== /()??/.exec("")[1];
      (b || w || S || c || g) &&
        (d = function (t) {
          var e,
            r,
            n,
            o,
            h,
            c,
            g,
            T = this,
            A = l(T),
            O = s(t),
            C = A.raw;
          if (C)
            return (
              (C.lastIndex = T.lastIndex),
              (e = i(d, C, O)),
              (T.lastIndex = C.lastIndex),
              e
            );
          var P = A.groups,
            E = S && T.sticky,
            M = i(a, T),
            N = T.source,
            _ = 0,
            V = O;
          if (
            (E &&
              ((M = m(M, "y", "")),
              -1 === v(M, "g") && (M += "g"),
              (V = x(O, T.lastIndex)),
              T.lastIndex > 0 &&
                (!T.multiline ||
                  (T.multiline && "\n" !== y(O, T.lastIndex - 1))) &&
                ((N = "(?: " + N + ")"), (V = " " + V), _++),
              (r = new RegExp("^(?:" + N + ")", M))),
            w && (r = new RegExp("^" + N + "$(?!\\s)", M)),
            b && (n = T.lastIndex),
            (o = i(f, E ? r : T, V)),
            E
              ? o
                ? ((o.input = x(o.input, _)),
                  (o[0] = x(o[0], _)),
                  (o.index = T.lastIndex),
                  (T.lastIndex += o[0].length))
                : (T.lastIndex = 0)
              : b && o && (T.lastIndex = T.global ? o.index + o[0].length : n),
            w &&
              o &&
              o.length > 1 &&
              i(p, o[0], r, function () {
                for (h = 1; h < arguments.length - 2; h++)
                  void 0 === arguments[h] && (o[h] = void 0);
              }),
            o && P)
          )
            for (o.groups = c = u(null), h = 0; h < P.length; h++)
              c[(g = P[h])[0]] = o[g[1]];
          return o;
        }),
        (t.exports = d);
    },
    272: (t, e, r) => {
      "use strict";
      var i = r(1152);
      t.exports = function () {
        var t = i(this),
          e = "";
        return (
          t.hasIndices && (e += "d"),
          t.global && (e += "g"),
          t.ignoreCase && (e += "i"),
          t.multiline && (e += "m"),
          t.dotAll && (e += "s"),
          t.unicode && (e += "u"),
          t.unicodeSets && (e += "v"),
          t.sticky && (e += "y"),
          e
        );
      };
    },
    3165: (t, e, r) => {
      "use strict";
      var i = r(172),
        n = r(1800).RegExp,
        s = i(function () {
          var t = n("a", "y");
          return (t.lastIndex = 2), null !== t.exec("abcd");
        }),
        a =
          s ||
          i(function () {
            return !n("a", "y").sticky;
          }),
        o =
          s ||
          i(function () {
            var t = n("^r", "gy");
            return (t.lastIndex = 2), null !== t.exec("str");
          });
      t.exports = { BROKEN_CARET: o, MISSED_STICKY: a, UNSUPPORTED_Y: s };
    },
    6416: (t, e, r) => {
      "use strict";
      var i = r(172),
        n = r(1800).RegExp;
      t.exports = i(function () {
        var t = n(".", "s");
        return !(t.dotAll && t.test("\n") && "s" === t.flags);
      });
    },
    1280: (t, e, r) => {
      "use strict";
      var i = r(172),
        n = r(1800).RegExp;
      t.exports = i(function () {
        var t = n("(?<a>b)", "g");
        return "b" !== t.exec("b").groups.a || "bc" !== "b".replace(t, "$<a>c");
      });
    },
    6784: (t, e, r) => {
      "use strict";
      var i = r(9732),
        n = TypeError;
      t.exports = function (t) {
        if (i(t)) throw new n("Can't call method on " + t);
        return t;
      };
    },
    9928: (t, e, r) => {
      "use strict";
      var i = r(332).f,
        n = r(1848),
        s = r(1952)("toStringTag");
      t.exports = function (t, e, r) {
        t && !r && (t = t.prototype),
          t && !n(t, s) && i(t, s, { configurable: !0, value: e });
      };
    },
    848: (t, e, r) => {
      "use strict";
      var i = r(8912),
        n = r(1304),
        s = i("keys");
      t.exports = function (t) {
        return s[t] || (s[t] = n(t));
      };
    },
    2176: (t, e, r) => {
      "use strict";
      var i = r(1800),
        n = r(7312),
        s = "__core-js_shared__",
        a = i[s] || n(s, {});
      t.exports = a;
    },
    8912: (t, e, r) => {
      "use strict";
      var i = r(1551),
        n = r(2176);
      (t.exports = function (t, e) {
        return n[t] || (n[t] = void 0 !== e ? e : {});
      })("versions", []).push({
        version: "3.35.1",
        mode: i ? "pure" : "global",
        copyright: "\xa9 2014-2024 Denis Pushkarev (zloirock.ru)",
        license: "https://github.com/zloirock/core-js/blob/v3.35.1/LICENSE",
        source: "https://github.com/zloirock/core-js",
      });
    },
    5960: (t, e, r) => {
      "use strict";
      var i = r(1320),
        n = r(5352),
        s = r(9e3),
        a = r(6784),
        o = i("".charAt),
        h = i("".charCodeAt),
        u = i("".slice),
        l = function (t) {
          return function (e, r) {
            var i,
              l,
              c = s(a(e)),
              g = n(r),
              p = c.length;
            return g < 0 || g >= p
              ? t
                ? ""
                : void 0
              : (i = h(c, g)) < 55296 ||
                  i > 56319 ||
                  g + 1 === p ||
                  (l = h(c, g + 1)) < 56320 ||
                  l > 57343
                ? t
                  ? o(c, g)
                  : i
                : t
                  ? u(c, g, g + 2)
                  : l - 56320 + ((i - 55296) << 10) + 65536;
          };
        };
      t.exports = { codeAt: l(!1), charAt: l(!0) };
    },
    8944: (t, e, r) => {
      "use strict";
      var i = r(2664),
        n = r(172),
        s = r(1800).String;
      t.exports =
        !!Object.getOwnPropertySymbols &&
        !n(function () {
          var t = Symbol("symbol detection");
          return (
            !s(t) ||
            !(Object(t) instanceof Symbol) ||
            (!Symbol.sham && i && i < 41)
          );
        });
    },
    8411: (t, e, r) => {
      "use strict";
      var i = r(5352),
        n = Math.max,
        s = Math.min;
      t.exports = function (t, e) {
        var r = i(t);
        return r < 0 ? n(r + e, 0) : s(r, e);
      };
    },
    4248: (t, e, r) => {
      "use strict";
      var i = r(3736),
        n = r(6784);
      t.exports = function (t) {
        return i(n(t));
      };
    },
    5352: (t, e, r) => {
      "use strict";
      var i = r(4012);
      t.exports = function (t) {
        var e = +t;
        return e !== e || 0 === e ? 0 : i(e);
      };
    },
    7132: (t, e, r) => {
      "use strict";
      var i = r(5352),
        n = Math.min;
      t.exports = function (t) {
        var e = i(t);
        return e > 0 ? n(e, 9007199254740991) : 0;
      };
    },
    9604: (t, e, r) => {
      "use strict";
      var i = r(6784),
        n = Object;
      t.exports = function (t) {
        return n(i(t));
      };
    },
    6936: (t, e, r) => {
      "use strict";
      var i = r(9232),
        n = r(9168),
        s = r(9896),
        a = r(2144),
        o = r(9440),
        h = r(1952),
        u = TypeError,
        l = h("toPrimitive");
      t.exports = function (t, e) {
        if (!n(t) || s(t)) return t;
        var r,
          h = a(t, l);
        if (h) {
          if (
            (void 0 === e && (e = "default"), (r = i(h, t, e)), !n(r) || s(r))
          )
            return r;
          throw new u("Can't convert object to primitive value");
        }
        return void 0 === e && (e = "number"), o(t, e);
      };
    },
    8796: (t, e, r) => {
      "use strict";
      var i = r(6936),
        n = r(9896);
      t.exports = function (t) {
        var e = i(t, "string");
        return n(e) ? e : e + "";
      };
    },
    2876: (t, e, r) => {
      "use strict";
      var i = {};
      (i[r(1952)("toStringTag")] = "z"),
        (t.exports = "[object z]" === String(i));
    },
    9e3: (t, e, r) => {
      "use strict";
      var i = r(6736),
        n = String;
      t.exports = function (t) {
        if ("Symbol" === i(t))
          throw new TypeError("Cannot convert a Symbol value to a string");
        return n(t);
      };
    },
    1355: (t) => {
      "use strict";
      var e = String;
      t.exports = function (t) {
        try {
          return e(t);
        } catch (r) {
          return "Object";
        }
      };
    },
    1304: (t, e, r) => {
      "use strict";
      var i = r(1320),
        n = 0,
        s = Math.random(),
        a = i((1).toString);
      t.exports = function (t) {
        return "Symbol(" + (void 0 === t ? "" : t) + ")_" + a(++n + s, 36);
      };
    },
    8320: (t, e, r) => {
      "use strict";
      var i = r(8944);
      t.exports = i && !Symbol.sham && "symbol" == typeof Symbol.iterator;
    },
    5808: (t, e, r) => {
      "use strict";
      var i = r(7184),
        n = r(172);
      t.exports =
        i &&
        n(function () {
          return (
            42 !==
            Object.defineProperty(function () {}, "prototype", {
              value: 42,
              writable: !1,
            }).prototype
          );
        });
    },
    3812: (t, e, r) => {
      "use strict";
      var i = r(1800),
        n = r(3700),
        s = i.WeakMap;
      t.exports = n(s) && /native code/.test(String(s));
    },
    1952: (t, e, r) => {
      "use strict";
      var i = r(1800),
        n = r(8912),
        s = r(1848),
        a = r(1304),
        o = r(8944),
        h = r(8320),
        u = i.Symbol,
        l = n("wks"),
        c = h ? u.for || u : (u && u.withoutSetter) || a;
      t.exports = function (t) {
        return s(l, t) || (l[t] = o && s(u, t) ? u[t] : c("Symbol." + t)), l[t];
      };
    },
    9396: (t, e, r) => {
      "use strict";
      var i = r(4248),
        n = r(7424),
        s = r(8012),
        a = r(8652),
        o = r(332).f,
        h = r(3340),
        u = r(504),
        l = r(1551),
        c = r(7184),
        g = "Array Iterator",
        p = a.set,
        f = a.getterFor(g);
      t.exports = h(
        Array,
        "Array",
        function (t, e) {
          p(this, { type: g, target: i(t), index: 0, kind: e });
        },
        function () {
          var t = f(this),
            e = t.target,
            r = t.index++;
          if (!e || r >= e.length) return (t.target = void 0), u(void 0, !0);
          switch (t.kind) {
            case "keys":
              return u(r, !1);
            case "values":
              return u(e[r], !1);
          }
          return u([r, e[r]], !1);
        },
        "values"
      );
      var d = (s.Arguments = s.Array);
      if (
        (n("keys"), n("values"), n("entries"), !l && c && "values" !== d.name)
      )
        try {
          o(d, "name", { value: "values" });
        } catch (y) {}
    },
    1864: (t, e, r) => {
      "use strict";
      var i = r(5952),
        n = r(9308);
      i({ target: "RegExp", proto: !0, forced: /./.exec !== n }, { exec: n });
    },
    660: (t, e, r) => {
      "use strict";
      var i = r(2640),
        n = r(9232),
        s = r(1320),
        a = r(4720),
        o = r(172),
        h = r(1152),
        u = r(3700),
        l = r(9732),
        c = r(5352),
        g = r(7132),
        p = r(9e3),
        f = r(6784),
        d = r(2904),
        y = r(2144),
        v = r(324),
        m = r(9252),
        x = r(1952)("replace"),
        b = Math.max,
        S = Math.min,
        w = s([].concat),
        T = s([].push),
        A = s("".indexOf),
        O = s("".slice),
        C = "$0" === "a".replace(/./, "$0"),
        P = !!/./[x] && "" === /./[x]("a", "$0");
      a(
        "replace",
        function (t, e, r) {
          var s = P ? "$" : "$0";
          return [
            function (t, r) {
              var i = f(this),
                s = l(t) ? void 0 : y(t, x);
              return s ? n(s, t, i, r) : n(e, p(i), t, r);
            },
            function (t, n) {
              var a = h(this),
                o = p(t);
              if ("string" == typeof n && -1 === A(n, s) && -1 === A(n, "$<")) {
                var l = r(e, a, o, n);
                if (l.done) return l.value;
              }
              var f = u(n);
              f || (n = p(n));
              var y,
                x = a.global;
              x && ((y = a.unicode), (a.lastIndex = 0));
              for (var C, P = []; null !== (C = m(a, o)) && (T(P, C), x); ) {
                "" === p(C[0]) && (a.lastIndex = d(o, g(a.lastIndex), y));
              }
              for (var E, M = "", N = 0, _ = 0; _ < P.length; _++) {
                for (
                  var V,
                    R = p((C = P[_])[0]),
                    k = b(S(c(C.index), o.length), 0),
                    I = [],
                    L = 1;
                  L < C.length;
                  L++
                )
                  T(I, void 0 === (E = C[L]) ? E : String(E));
                var D = C.groups;
                if (f) {
                  var B = w([R], I, k, o);
                  void 0 !== D && T(B, D), (V = p(i(n, void 0, B)));
                } else V = v(R, o, k, I, D, n);
                k >= N && ((M += O(o, N, k) + V), (N = k + R.length));
              }
              return M + O(o, N);
            },
          ];
        },
        !!o(function () {
          var t = /./;
          return (
            (t.exec = function () {
              var t = [];
              return (t.groups = { a: "7" }), t;
            }),
            "7" !== "".replace(t, "$<a>")
          );
        }) ||
          !C ||
          P
      );
    },
    2656: (t, e, r) => {
      "use strict";
      var i = r(1800),
        n = r(6488),
        s = r(1856),
        a = r(9396),
        o = r(9560),
        h = r(9928),
        u = r(1952)("iterator"),
        l = a.values,
        c = function (t, e) {
          if (t) {
            if (t[u] !== l)
              try {
                o(t, u, l);
              } catch (i) {
                t[u] = l;
              }
            if ((h(t, e, !0), n[e]))
              for (var r in a)
                if (t[r] !== a[r])
                  try {
                    o(t, r, a[r]);
                  } catch (i) {
                    t[r] = a[r];
                  }
          }
        };
      for (var g in n) c(i[g] && i[g].prototype, g);
      c(s, "DOMTokenList");
    },
    1064: (t, e, r) => {
      "use strict";
      function i(t, e, r, i, n, s, a) {
        try {
          var o = t[s](a),
            h = o.value;
        } catch (u) {
          return void r(u);
        }
        o.done ? e(h) : Promise.resolve(h).then(i, n);
      }
      function n(t) {
        return function () {
          var e = this,
            r = arguments;
          return new Promise(function (n, s) {
            var a = t.apply(e, r);
            function o(t) {
              i(a, n, s, o, h, "next", t);
            }
            function h(t) {
              i(a, n, s, o, h, "throw", t);
            }
            o(void 0);
          });
        };
      }
      r.r(e),
        r.d(e, {
          AElement: () => ce,
          AnimateColorElement: () => se,
          AnimateElement: () => ne,
          AnimateTransformElement: () => ae,
          BoundingBox: () => It,
          CB1: () => nt,
          CB2: () => st,
          CB3: () => at,
          CB4: () => ot,
          Canvg: () => He,
          CircleElement: () => Yt,
          ClipPathElement: () => Ee,
          DefsElement: () => Kt,
          DescElement: () => Ie,
          Document: () => ze,
          Element: () => Mt,
          EllipseElement: () => qt,
          FeColorMatrixElement: () => Oe,
          FeCompositeElement: () => Ve,
          FeDropShadowElement: () => Ne,
          FeGaussianBlurElement: () => Re,
          FeMorphologyElement: () => _e,
          FilterElement: () => Me,
          Font: () => kt,
          FontElement: () => oe,
          FontFaceElement: () => he,
          GElement: () => Jt,
          GlyphElement: () => zt,
          GradientElement: () => te,
          ImageElement: () => ye,
          LineElement: () => Gt,
          LinearGradientElement: () => ee,
          MarkerElement: () => Zt,
          MaskElement: () => Ce,
          Matrix: () => At,
          MissingGlyphElement: () => ue,
          Mouse: () => ft,
          PSEUDO_ZERO: () => tt,
          Parser: () => bt,
          PathElement: () => Bt,
          PathParser: () => Lt,
          PatternElement: () => $t,
          Point: () => pt,
          PolygonElement: () => Qt,
          PolylineElement: () => Wt,
          Property: () => ct,
          QB1: () => ht,
          QB2: () => ut,
          QB3: () => lt,
          RadialGradientElement: () => re,
          RectElement: () => Xt,
          RenderedElement: () => Dt,
          Rotate: () => wt,
          SVGElement: () => Ut,
          SVGFontLoader: () => me,
          Scale: () => Tt,
          Screen: () => vt,
          Skew: () => Ot,
          SkewX: () => Ct,
          SkewY: () => Pt,
          StopElement: () => ie,
          StyleElement: () => xe,
          SymbolElement: () => ve,
          TRefElement: () => le,
          TSpanElement: () => jt,
          TextElement: () => Ft,
          TextPathElement: () => fe,
          TitleElement: () => ke,
          Transform: () => Et,
          Translate: () => St,
          UnknownElement: () => Nt,
          UseElement: () => be,
          ViewPort: () => gt,
          compressSpaces: () => D,
          default: () => He,
          getSelectorSpecificity: () => J,
          normalizeAttributeName: () => H,
          normalizeColor: () => X,
          parseExternalUrl: () => U,
          presets: () => L,
          toNumbers: () => F,
          trimLeft: () => B,
          trimRight: () => z,
          vectorMagnitude: () => et,
          vectorsAngle: () => it,
          vectorsRatio: () => rt,
        });
      r(660), r(2656);
      var s = r(1568);
      function a(t) {
        var e = (function (t, e) {
          if ("object" != (0, s.c)(t) || !t) return t;
          var r = t[Symbol.toPrimitive];
          if (void 0 !== r) {
            var i = r.call(t, e || "default");
            if ("object" != (0, s.c)(i)) return i;
            throw new TypeError("@@toPrimitive must return a primitive value.");
          }
          return ("string" === e ? String : Number)(t);
        })(t, "string");
        return "symbol" == (0, s.c)(e) ? e : String(e);
      }
      function o(t, e, r) {
        return (
          (e = a(e)) in t
            ? Object.defineProperty(t, e, {
                value: r,
                enumerable: !0,
                configurable: !0,
                writable: !0,
              })
            : (t[e] = r),
          t
        );
      }
      var h = r(6868),
        u = r(8464),
        l = function (t, e) {
          return (l =
            Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array &&
              function (t, e) {
                t.__proto__ = e;
              }) ||
            function (t, e) {
              for (var r in e)
                Object.prototype.hasOwnProperty.call(e, r) && (t[r] = e[r]);
            })(t, e);
        };
      function c(t, e) {
        if ("function" != typeof e && null !== e)
          throw new TypeError(
            "Class extends value " + String(e) + " is not a constructor or null"
          );
        function r() {
          this.constructor = t;
        }
        l(t, e),
          (t.prototype =
            null === e
              ? Object.create(e)
              : ((r.prototype = e.prototype), new r()));
      }
      function g(t, e) {
        var r = t[0],
          i = t[1];
        return [
          r * Math.cos(e) - i * Math.sin(e),
          r * Math.sin(e) + i * Math.cos(e),
        ];
      }
      function p() {
        for (var t = [], e = 0; e < arguments.length; e++) t[e] = arguments[e];
        for (var r = 0; r < t.length; r++)
          if ("number" != typeof t[r])
            throw new Error(
              "assertNumbers arguments[" +
                r +
                "] is not a number. " +
                typeof t[r] +
                " == typeof " +
                t[r]
            );
        return !0;
      }
      var f = Math.PI;
      function d(t, e, r) {
        (t.lArcFlag = 0 === t.lArcFlag ? 0 : 1),
          (t.sweepFlag = 0 === t.sweepFlag ? 0 : 1);
        var i = t.rX,
          n = t.rY,
          s = t.x,
          a = t.y;
        (i = Math.abs(t.rX)), (n = Math.abs(t.rY));
        var o = g([(e - s) / 2, (r - a) / 2], (-t.xRot / 180) * f),
          h = o[0],
          u = o[1],
          l = Math.pow(h, 2) / Math.pow(i, 2) + Math.pow(u, 2) / Math.pow(n, 2);
        1 < l && ((i *= Math.sqrt(l)), (n *= Math.sqrt(l))),
          (t.rX = i),
          (t.rY = n);
        var c =
            Math.pow(i, 2) * Math.pow(u, 2) + Math.pow(n, 2) * Math.pow(h, 2),
          p =
            (t.lArcFlag !== t.sweepFlag ? 1 : -1) *
            Math.sqrt(Math.max(0, (Math.pow(i, 2) * Math.pow(n, 2) - c) / c)),
          d = ((i * u) / n) * p,
          y = ((-n * h) / i) * p,
          v = g([d, y], (t.xRot / 180) * f);
        (t.cX = v[0] + (e + s) / 2),
          (t.cY = v[1] + (r + a) / 2),
          (t.phi1 = Math.atan2((u - y) / n, (h - d) / i)),
          (t.phi2 = Math.atan2((-u - y) / n, (-h - d) / i)),
          0 === t.sweepFlag && t.phi2 > t.phi1 && (t.phi2 -= 2 * f),
          1 === t.sweepFlag && t.phi2 < t.phi1 && (t.phi2 += 2 * f),
          (t.phi1 *= 180 / f),
          (t.phi2 *= 180 / f);
      }
      function y(t, e, r) {
        p(t, e, r);
        var i = t * t + e * e - r * r;
        if (0 > i) return [];
        if (0 === i)
          return [[(t * r) / (t * t + e * e), (e * r) / (t * t + e * e)]];
        var n = Math.sqrt(i);
        return [
          [
            (t * r + e * n) / (t * t + e * e),
            (e * r - t * n) / (t * t + e * e),
          ],
          [
            (t * r - e * n) / (t * t + e * e),
            (e * r + t * n) / (t * t + e * e),
          ],
        ];
      }
      var v,
        m = Math.PI / 180;
      function x(t, e, r) {
        return (1 - r) * t + r * e;
      }
      function b(t, e, r, i) {
        return t + Math.cos((i / 180) * f) * e + Math.sin((i / 180) * f) * r;
      }
      function S(t, e, r, i) {
        var n = 1e-6,
          s = e - t,
          a = r - e,
          o = 3 * s + 3 * (i - r) - 6 * a,
          h = 6 * (a - s),
          u = 3 * s;
        return Math.abs(o) < n
          ? [-u / h]
          : (function (t, e, r) {
              void 0 === r && (r = 1e-6);
              var i = (t * t) / 4 - e;
              if (i < -r) return [];
              if (i <= r) return [-t / 2];
              var n = Math.sqrt(i);
              return [-t / 2 - n, -t / 2 + n];
            })(h / o, u / o, n);
      }
      function w(t, e, r, i, n) {
        var s = 1 - n;
        return (
          t * (s * s * s) +
          e * (3 * s * s * n) +
          r * (3 * s * n * n) +
          i * (n * n * n)
        );
      }
      !(function (t) {
        function e() {
          return n(function (t, e, r) {
            return (
              t.relative &&
                (void 0 !== t.x1 && (t.x1 += e),
                void 0 !== t.y1 && (t.y1 += r),
                void 0 !== t.x2 && (t.x2 += e),
                void 0 !== t.y2 && (t.y2 += r),
                void 0 !== t.x && (t.x += e),
                void 0 !== t.y && (t.y += r),
                (t.relative = !1)),
              t
            );
          });
        }
        function r() {
          var t = NaN,
            e = NaN,
            r = NaN,
            i = NaN;
          return n(function (n, s, a) {
            return (
              n.type & E.SMOOTH_CURVE_TO &&
                ((n.type = E.CURVE_TO),
                (t = isNaN(t) ? s : t),
                (e = isNaN(e) ? a : e),
                (n.x1 = n.relative ? s - t : 2 * s - t),
                (n.y1 = n.relative ? a - e : 2 * a - e)),
              n.type & E.CURVE_TO
                ? ((t = n.relative ? s + n.x2 : n.x2),
                  (e = n.relative ? a + n.y2 : n.y2))
                : ((t = NaN), (e = NaN)),
              n.type & E.SMOOTH_QUAD_TO &&
                ((n.type = E.QUAD_TO),
                (r = isNaN(r) ? s : r),
                (i = isNaN(i) ? a : i),
                (n.x1 = n.relative ? s - r : 2 * s - r),
                (n.y1 = n.relative ? a - i : 2 * a - i)),
              n.type & E.QUAD_TO
                ? ((r = n.relative ? s + n.x1 : n.x1),
                  (i = n.relative ? a + n.y1 : n.y1))
                : ((r = NaN), (i = NaN)),
              n
            );
          });
        }
        function i() {
          var t = NaN,
            e = NaN;
          return n(function (r, i, n) {
            if (
              (r.type & E.SMOOTH_QUAD_TO &&
                ((r.type = E.QUAD_TO),
                (t = isNaN(t) ? i : t),
                (e = isNaN(e) ? n : e),
                (r.x1 = r.relative ? i - t : 2 * i - t),
                (r.y1 = r.relative ? n - e : 2 * n - e)),
              r.type & E.QUAD_TO)
            ) {
              (t = r.relative ? i + r.x1 : r.x1),
                (e = r.relative ? n + r.y1 : r.y1);
              var s = r.x1,
                a = r.y1;
              (r.type = E.CURVE_TO),
                (r.x1 = ((r.relative ? 0 : i) + 2 * s) / 3),
                (r.y1 = ((r.relative ? 0 : n) + 2 * a) / 3),
                (r.x2 = (r.x + 2 * s) / 3),
                (r.y2 = (r.y + 2 * a) / 3);
            } else (t = NaN), (e = NaN);
            return r;
          });
        }
        function n(t) {
          var e = 0,
            r = 0,
            i = NaN,
            n = NaN;
          return function (s) {
            if (isNaN(i) && !(s.type & E.MOVE_TO))
              throw new Error("path must start with moveto");
            var a = t(s, e, r, i, n);
            return (
              s.type & E.CLOSE_PATH && ((e = i), (r = n)),
              void 0 !== s.x && (e = s.relative ? e + s.x : s.x),
              void 0 !== s.y && (r = s.relative ? r + s.y : s.y),
              s.type & E.MOVE_TO && ((i = e), (n = r)),
              a
            );
          };
        }
        function s(t, e, r, i, s, a) {
          return (
            p(t, e, r, i, s, a),
            n(function (n, o, h, u) {
              var l = n.x1,
                c = n.x2,
                g = n.relative && !isNaN(u),
                p = void 0 !== n.x ? n.x : g ? 0 : o,
                f = void 0 !== n.y ? n.y : g ? 0 : h;
              function d(t) {
                return t * t;
              }
              n.type & E.HORIZ_LINE_TO &&
                0 !== e &&
                ((n.type = E.LINE_TO), (n.y = n.relative ? 0 : h)),
                n.type & E.VERT_LINE_TO &&
                  0 !== r &&
                  ((n.type = E.LINE_TO), (n.x = n.relative ? 0 : o)),
                void 0 !== n.x && (n.x = n.x * t + f * r + (g ? 0 : s)),
                void 0 !== n.y && (n.y = p * e + n.y * i + (g ? 0 : a)),
                void 0 !== n.x1 && (n.x1 = n.x1 * t + n.y1 * r + (g ? 0 : s)),
                void 0 !== n.y1 && (n.y1 = l * e + n.y1 * i + (g ? 0 : a)),
                void 0 !== n.x2 && (n.x2 = n.x2 * t + n.y2 * r + (g ? 0 : s)),
                void 0 !== n.y2 && (n.y2 = c * e + n.y2 * i + (g ? 0 : a));
              var y = t * i - e * r;
              if (
                void 0 !== n.xRot &&
                (1 !== t || 0 !== e || 0 !== r || 1 !== i)
              )
                if (0 === y)
                  delete n.rX,
                    delete n.rY,
                    delete n.xRot,
                    delete n.lArcFlag,
                    delete n.sweepFlag,
                    (n.type = E.LINE_TO);
                else {
                  var v = (n.xRot * Math.PI) / 180,
                    m = Math.sin(v),
                    x = Math.cos(v),
                    b = 1 / d(n.rX),
                    S = 1 / d(n.rY),
                    w = d(x) * b + d(m) * S,
                    T = 2 * m * x * (b - S),
                    A = d(m) * b + d(x) * S,
                    O = w * i * i - T * e * i + A * e * e,
                    C = T * (t * i + e * r) - 2 * (w * r * i + A * t * e),
                    P = w * r * r - T * t * r + A * t * t,
                    M = ((Math.atan2(C, O - P) + Math.PI) % Math.PI) / 2,
                    N = Math.sin(M),
                    _ = Math.cos(M);
                  (n.rX =
                    Math.abs(y) / Math.sqrt(O * d(_) + C * N * _ + P * d(N))),
                    (n.rY =
                      Math.abs(y) / Math.sqrt(O * d(N) - C * N * _ + P * d(_))),
                    (n.xRot = (180 * M) / Math.PI);
                }
              return (
                void 0 !== n.sweepFlag &&
                  0 > y &&
                  (n.sweepFlag = +!n.sweepFlag),
                n
              );
            })
          );
        }
        (t.ROUND = function (t) {
          function e(e) {
            return Math.round(e * t) / t;
          }
          return (
            void 0 === t && (t = 1e13),
            p(t),
            function (t) {
              return (
                void 0 !== t.x1 && (t.x1 = e(t.x1)),
                void 0 !== t.y1 && (t.y1 = e(t.y1)),
                void 0 !== t.x2 && (t.x2 = e(t.x2)),
                void 0 !== t.y2 && (t.y2 = e(t.y2)),
                void 0 !== t.x && (t.x = e(t.x)),
                void 0 !== t.y && (t.y = e(t.y)),
                void 0 !== t.rX && (t.rX = e(t.rX)),
                void 0 !== t.rY && (t.rY = e(t.rY)),
                t
              );
            }
          );
        }),
          (t.TO_ABS = e),
          (t.TO_REL = function () {
            return n(function (t, e, r) {
              return (
                t.relative ||
                  (void 0 !== t.x1 && (t.x1 -= e),
                  void 0 !== t.y1 && (t.y1 -= r),
                  void 0 !== t.x2 && (t.x2 -= e),
                  void 0 !== t.y2 && (t.y2 -= r),
                  void 0 !== t.x && (t.x -= e),
                  void 0 !== t.y && (t.y -= r),
                  (t.relative = !0)),
                t
              );
            });
          }),
          (t.NORMALIZE_HVZ = function (t, e, r) {
            return (
              void 0 === t && (t = !0),
              void 0 === e && (e = !0),
              void 0 === r && (r = !0),
              n(function (i, n, s, a, o) {
                if (isNaN(a) && !(i.type & E.MOVE_TO))
                  throw new Error("path must start with moveto");
                return (
                  e &&
                    i.type & E.HORIZ_LINE_TO &&
                    ((i.type = E.LINE_TO), (i.y = i.relative ? 0 : s)),
                  r &&
                    i.type & E.VERT_LINE_TO &&
                    ((i.type = E.LINE_TO), (i.x = i.relative ? 0 : n)),
                  t &&
                    i.type & E.CLOSE_PATH &&
                    ((i.type = E.LINE_TO),
                    (i.x = i.relative ? a - n : a),
                    (i.y = i.relative ? o - s : o)),
                  i.type & E.ARC &&
                    (0 === i.rX || 0 === i.rY) &&
                    ((i.type = E.LINE_TO),
                    delete i.rX,
                    delete i.rY,
                    delete i.xRot,
                    delete i.lArcFlag,
                    delete i.sweepFlag),
                  i
                );
              })
            );
          }),
          (t.NORMALIZE_ST = r),
          (t.QT_TO_C = i),
          (t.INFO = n),
          (t.SANITIZE = function (t) {
            void 0 === t && (t = 0), p(t);
            var e = NaN,
              r = NaN,
              i = NaN,
              s = NaN;
            return n(function (n, a, o, h, u) {
              var l = Math.abs,
                c = !1,
                g = 0,
                p = 0;
              if (
                (n.type & E.SMOOTH_CURVE_TO &&
                  ((g = isNaN(e) ? 0 : a - e), (p = isNaN(r) ? 0 : o - r)),
                n.type & (E.CURVE_TO | E.SMOOTH_CURVE_TO)
                  ? ((e = n.relative ? a + n.x2 : n.x2),
                    (r = n.relative ? o + n.y2 : n.y2))
                  : ((e = NaN), (r = NaN)),
                n.type & E.SMOOTH_QUAD_TO
                  ? ((i = isNaN(i) ? a : 2 * a - i),
                    (s = isNaN(s) ? o : 2 * o - s))
                  : n.type & E.QUAD_TO
                    ? ((i = n.relative ? a + n.x1 : n.x1),
                      (s = n.relative ? o + n.y1 : n.y2))
                    : ((i = NaN), (s = NaN)),
                n.type & E.LINE_COMMANDS ||
                  (n.type & E.ARC &&
                    (0 === n.rX || 0 === n.rY || !n.lArcFlag)) ||
                  n.type & E.CURVE_TO ||
                  n.type & E.SMOOTH_CURVE_TO ||
                  n.type & E.QUAD_TO ||
                  n.type & E.SMOOTH_QUAD_TO)
              ) {
                var f = void 0 === n.x ? 0 : n.relative ? n.x : n.x - a,
                  d = void 0 === n.y ? 0 : n.relative ? n.y : n.y - o;
                (g = isNaN(i)
                  ? void 0 === n.x1
                    ? g
                    : n.relative
                      ? n.x
                      : n.x1 - a
                  : i - a),
                  (p = isNaN(s)
                    ? void 0 === n.y1
                      ? p
                      : n.relative
                        ? n.y
                        : n.y1 - o
                    : s - o);
                var y = void 0 === n.x2 ? 0 : n.relative ? n.x : n.x2 - a,
                  v = void 0 === n.y2 ? 0 : n.relative ? n.y : n.y2 - o;
                l(f) <= t &&
                  l(d) <= t &&
                  l(g) <= t &&
                  l(p) <= t &&
                  l(y) <= t &&
                  l(v) <= t &&
                  (c = !0);
              }
              return (
                n.type & E.CLOSE_PATH &&
                  l(a - h) <= t &&
                  l(o - u) <= t &&
                  (c = !0),
                c ? [] : n
              );
            });
          }),
          (t.MATRIX = s),
          (t.ROTATE = function (t, e, r) {
            void 0 === e && (e = 0), void 0 === r && (r = 0), p(t, e, r);
            var i = Math.sin(t),
              n = Math.cos(t);
            return s(n, i, -i, n, e - e * n + r * i, r - e * i - r * n);
          }),
          (t.TRANSLATE = function (t, e) {
            return void 0 === e && (e = 0), p(t, e), s(1, 0, 0, 1, t, e);
          }),
          (t.SCALE = function (t, e) {
            return void 0 === e && (e = t), p(t, e), s(t, 0, 0, e, 0, 0);
          }),
          (t.SKEW_X = function (t) {
            return p(t), s(1, 0, Math.atan(t), 1, 0, 0);
          }),
          (t.SKEW_Y = function (t) {
            return p(t), s(1, Math.atan(t), 0, 1, 0, 0);
          }),
          (t.X_AXIS_SYMMETRY = function (t) {
            return void 0 === t && (t = 0), p(t), s(-1, 0, 0, 1, t, 0);
          }),
          (t.Y_AXIS_SYMMETRY = function (t) {
            return void 0 === t && (t = 0), p(t), s(1, 0, 0, -1, 0, t);
          }),
          (t.A_TO_C = function () {
            return n(function (t, e, r) {
              return E.ARC === t.type
                ? (function (t, e, r) {
                    var i, n, s, a;
                    t.cX || d(t, e, r);
                    for (
                      var o = Math.min(t.phi1, t.phi2),
                        h = Math.max(t.phi1, t.phi2) - o,
                        u = Math.ceil(h / 90),
                        l = new Array(u),
                        c = e,
                        p = r,
                        f = 0;
                      f < u;
                      f++
                    ) {
                      var y = x(t.phi1, t.phi2, f / u),
                        v = x(t.phi1, t.phi2, (f + 1) / u),
                        b = v - y,
                        S = (4 / 3) * Math.tan((b * m) / 4),
                        w = [
                          Math.cos(y * m) - S * Math.sin(y * m),
                          Math.sin(y * m) + S * Math.cos(y * m),
                        ],
                        T = w[0],
                        A = w[1],
                        O = [Math.cos(v * m), Math.sin(v * m)],
                        C = O[0],
                        P = O[1],
                        M = [C + S * Math.sin(v * m), P - S * Math.cos(v * m)],
                        N = M[0],
                        _ = M[1];
                      l[f] = { relative: t.relative, type: E.CURVE_TO };
                      var V = function (e, r) {
                        var i = g([e * t.rX, r * t.rY], t.xRot),
                          n = i[0],
                          s = i[1];
                        return [t.cX + n, t.cY + s];
                      };
                      (i = V(T, A)),
                        (l[f].x1 = i[0]),
                        (l[f].y1 = i[1]),
                        (n = V(N, _)),
                        (l[f].x2 = n[0]),
                        (l[f].y2 = n[1]),
                        (s = V(C, P)),
                        (l[f].x = s[0]),
                        (l[f].y = s[1]),
                        t.relative &&
                          ((l[f].x1 -= c),
                          (l[f].y1 -= p),
                          (l[f].x2 -= c),
                          (l[f].y2 -= p),
                          (l[f].x -= c),
                          (l[f].y -= p)),
                        (c = (a = [l[f].x, l[f].y])[0]),
                        (p = a[1]);
                    }
                    return l;
                  })(t, t.relative ? 0 : e, t.relative ? 0 : r)
                : t;
            });
          }),
          (t.ANNOTATE_ARCS = function () {
            return n(function (t, e, r) {
              return (
                t.relative && ((e = 0), (r = 0)),
                E.ARC === t.type && d(t, e, r),
                t
              );
            });
          }),
          (t.CLONE = function () {
            return function (t) {
              var e = {};
              for (var r in t) e[r] = t[r];
              return e;
            };
          }),
          (t.CALCULATE_BOUNDS = function () {
            var t = e(),
              s = i(),
              a = r(),
              o = n(function (e, r, i) {
                var n = a(
                  s(
                    t(
                      (function (t) {
                        var e = {};
                        for (var r in t) e[r] = t[r];
                        return e;
                      })(e)
                    )
                  )
                );
                function h(t) {
                  t > o.maxX && (o.maxX = t), t < o.minX && (o.minX = t);
                }
                function u(t) {
                  t > o.maxY && (o.maxY = t), t < o.minY && (o.minY = t);
                }
                if (
                  (n.type & E.DRAWING_COMMANDS && (h(r), u(i)),
                  n.type & E.HORIZ_LINE_TO && h(n.x),
                  n.type & E.VERT_LINE_TO && u(n.y),
                  n.type & E.LINE_TO && (h(n.x), u(n.y)),
                  n.type & E.CURVE_TO)
                ) {
                  h(n.x), u(n.y);
                  for (var l = 0, c = S(r, n.x1, n.x2, n.x); l < c.length; l++)
                    0 < (R = c[l]) && 1 > R && h(w(r, n.x1, n.x2, n.x, R));
                  for (var g = 0, p = S(i, n.y1, n.y2, n.y); g < p.length; g++)
                    0 < (R = p[g]) && 1 > R && u(w(i, n.y1, n.y2, n.y, R));
                }
                if (n.type & E.ARC) {
                  h(n.x), u(n.y), d(n, r, i);
                  for (
                    var f = (n.xRot / 180) * Math.PI,
                      v = Math.cos(f) * n.rX,
                      m = Math.sin(f) * n.rX,
                      x = -Math.sin(f) * n.rY,
                      T = Math.cos(f) * n.rY,
                      A =
                        n.phi1 < n.phi2
                          ? [n.phi1, n.phi2]
                          : -180 > n.phi2
                            ? [n.phi2 + 360, n.phi1 + 360]
                            : [n.phi2, n.phi1],
                      O = A[0],
                      C = A[1],
                      P = function (t) {
                        var e = t[0],
                          r = t[1],
                          i = (180 * Math.atan2(r, e)) / Math.PI;
                        return i < O ? i + 360 : i;
                      },
                      M = 0,
                      N = y(x, -v, 0).map(P);
                    M < N.length;
                    M++
                  )
                    (R = N[M]) > O && R < C && h(b(n.cX, v, x, R));
                  for (var _ = 0, V = y(T, -m, 0).map(P); _ < V.length; _++) {
                    var R;
                    (R = V[_]) > O && R < C && u(b(n.cY, m, T, R));
                  }
                }
                return e;
              });
            return (
              (o.minX = 1 / 0),
              (o.maxX = -1 / 0),
              (o.minY = 1 / 0),
              (o.maxY = -1 / 0),
              o
            );
          });
      })(v || (v = {}));
      var T,
        A = (function () {
          function t() {}
          return (
            (t.prototype.round = function (t) {
              return this.transform(v.ROUND(t));
            }),
            (t.prototype.toAbs = function () {
              return this.transform(v.TO_ABS());
            }),
            (t.prototype.toRel = function () {
              return this.transform(v.TO_REL());
            }),
            (t.prototype.normalizeHVZ = function (t, e, r) {
              return this.transform(v.NORMALIZE_HVZ(t, e, r));
            }),
            (t.prototype.normalizeST = function () {
              return this.transform(v.NORMALIZE_ST());
            }),
            (t.prototype.qtToC = function () {
              return this.transform(v.QT_TO_C());
            }),
            (t.prototype.aToC = function () {
              return this.transform(v.A_TO_C());
            }),
            (t.prototype.sanitize = function (t) {
              return this.transform(v.SANITIZE(t));
            }),
            (t.prototype.translate = function (t, e) {
              return this.transform(v.TRANSLATE(t, e));
            }),
            (t.prototype.scale = function (t, e) {
              return this.transform(v.SCALE(t, e));
            }),
            (t.prototype.rotate = function (t, e, r) {
              return this.transform(v.ROTATE(t, e, r));
            }),
            (t.prototype.matrix = function (t, e, r, i, n, s) {
              return this.transform(v.MATRIX(t, e, r, i, n, s));
            }),
            (t.prototype.skewX = function (t) {
              return this.transform(v.SKEW_X(t));
            }),
            (t.prototype.skewY = function (t) {
              return this.transform(v.SKEW_Y(t));
            }),
            (t.prototype.xSymmetry = function (t) {
              return this.transform(v.X_AXIS_SYMMETRY(t));
            }),
            (t.prototype.ySymmetry = function (t) {
              return this.transform(v.Y_AXIS_SYMMETRY(t));
            }),
            (t.prototype.annotateArcs = function () {
              return this.transform(v.ANNOTATE_ARCS());
            }),
            t
          );
        })(),
        O = function (t) {
          return " " === t || "\t" === t || "\r" === t || "\n" === t;
        },
        C = function (t) {
          return (
            "0".charCodeAt(0) <= t.charCodeAt(0) &&
            t.charCodeAt(0) <= "9".charCodeAt(0)
          );
        },
        P = (function (t) {
          function e() {
            var e = t.call(this) || this;
            return (
              (e.curNumber = ""),
              (e.curCommandType = -1),
              (e.curCommandRelative = !1),
              (e.canParseCommandOrComma = !0),
              (e.curNumberHasExp = !1),
              (e.curNumberHasExpDigits = !1),
              (e.curNumberHasDecimal = !1),
              (e.curArgs = []),
              e
            );
          }
          return (
            c(e, t),
            (e.prototype.finish = function (t) {
              if (
                (void 0 === t && (t = []),
                this.parse(" ", t),
                0 !== this.curArgs.length || !this.canParseCommandOrComma)
              )
                throw new SyntaxError("Unterminated command at the path end.");
              return t;
            }),
            (e.prototype.parse = function (t, e) {
              var r = this;
              void 0 === e && (e = []);
              for (
                var i = function (t) {
                    e.push(t),
                      (r.curArgs.length = 0),
                      (r.canParseCommandOrComma = !0);
                  },
                  n = 0;
                n < t.length;
                n++
              ) {
                var s = t[n],
                  a = !(
                    this.curCommandType !== E.ARC ||
                    (3 !== this.curArgs.length && 4 !== this.curArgs.length) ||
                    1 !== this.curNumber.length ||
                    ("0" !== this.curNumber && "1" !== this.curNumber)
                  ),
                  o = C(s) && (("0" === this.curNumber && "0" === s) || a);
                if (!C(s) || o)
                  if ("e" !== s && "E" !== s)
                    if (
                      ("-" !== s && "+" !== s) ||
                      !this.curNumberHasExp ||
                      this.curNumberHasExpDigits
                    )
                      if (
                        "." !== s ||
                        this.curNumberHasExp ||
                        this.curNumberHasDecimal ||
                        a
                      ) {
                        if (this.curNumber && -1 !== this.curCommandType) {
                          var h = Number(this.curNumber);
                          if (isNaN(h))
                            throw new SyntaxError(
                              "Invalid number ending at " + n
                            );
                          if (this.curCommandType === E.ARC)
                            if (
                              0 === this.curArgs.length ||
                              1 === this.curArgs.length
                            ) {
                              if (0 > h)
                                throw new SyntaxError(
                                  'Expected positive number, got "' +
                                    h +
                                    '" at index "' +
                                    n +
                                    '"'
                                );
                            } else if (
                              (3 === this.curArgs.length ||
                                4 === this.curArgs.length) &&
                              "0" !== this.curNumber &&
                              "1" !== this.curNumber
                            )
                              throw new SyntaxError(
                                'Expected a flag, got "' +
                                  this.curNumber +
                                  '" at index "' +
                                  n +
                                  '"'
                              );
                          this.curArgs.push(h),
                            this.curArgs.length === M[this.curCommandType] &&
                              (E.HORIZ_LINE_TO === this.curCommandType
                                ? i({
                                    type: E.HORIZ_LINE_TO,
                                    relative: this.curCommandRelative,
                                    x: h,
                                  })
                                : E.VERT_LINE_TO === this.curCommandType
                                  ? i({
                                      type: E.VERT_LINE_TO,
                                      relative: this.curCommandRelative,
                                      y: h,
                                    })
                                  : this.curCommandType === E.MOVE_TO ||
                                      this.curCommandType === E.LINE_TO ||
                                      this.curCommandType === E.SMOOTH_QUAD_TO
                                    ? (i({
                                        type: this.curCommandType,
                                        relative: this.curCommandRelative,
                                        x: this.curArgs[0],
                                        y: this.curArgs[1],
                                      }),
                                      E.MOVE_TO === this.curCommandType &&
                                        (this.curCommandType = E.LINE_TO))
                                    : this.curCommandType === E.CURVE_TO
                                      ? i({
                                          type: E.CURVE_TO,
                                          relative: this.curCommandRelative,
                                          x1: this.curArgs[0],
                                          y1: this.curArgs[1],
                                          x2: this.curArgs[2],
                                          y2: this.curArgs[3],
                                          x: this.curArgs[4],
                                          y: this.curArgs[5],
                                        })
                                      : this.curCommandType ===
                                          E.SMOOTH_CURVE_TO
                                        ? i({
                                            type: E.SMOOTH_CURVE_TO,
                                            relative: this.curCommandRelative,
                                            x2: this.curArgs[0],
                                            y2: this.curArgs[1],
                                            x: this.curArgs[2],
                                            y: this.curArgs[3],
                                          })
                                        : this.curCommandType === E.QUAD_TO
                                          ? i({
                                              type: E.QUAD_TO,
                                              relative: this.curCommandRelative,
                                              x1: this.curArgs[0],
                                              y1: this.curArgs[1],
                                              x: this.curArgs[2],
                                              y: this.curArgs[3],
                                            })
                                          : this.curCommandType === E.ARC &&
                                            i({
                                              type: E.ARC,
                                              relative: this.curCommandRelative,
                                              rX: this.curArgs[0],
                                              rY: this.curArgs[1],
                                              xRot: this.curArgs[2],
                                              lArcFlag: this.curArgs[3],
                                              sweepFlag: this.curArgs[4],
                                              x: this.curArgs[5],
                                              y: this.curArgs[6],
                                            })),
                            (this.curNumber = ""),
                            (this.curNumberHasExpDigits = !1),
                            (this.curNumberHasExp = !1),
                            (this.curNumberHasDecimal = !1),
                            (this.canParseCommandOrComma = !0);
                        }
                        if (!O(s))
                          if ("," === s && this.canParseCommandOrComma)
                            this.canParseCommandOrComma = !1;
                          else if ("+" !== s && "-" !== s && "." !== s)
                            if (o)
                              (this.curNumber = s),
                                (this.curNumberHasDecimal = !1);
                            else {
                              if (0 !== this.curArgs.length)
                                throw new SyntaxError(
                                  "Unterminated command at index " + n + "."
                                );
                              if (!this.canParseCommandOrComma)
                                throw new SyntaxError(
                                  'Unexpected character "' +
                                    s +
                                    '" at index ' +
                                    n +
                                    ". Command cannot follow comma"
                                );
                              if (
                                ((this.canParseCommandOrComma = !1),
                                "z" !== s && "Z" !== s)
                              )
                                if ("h" === s || "H" === s)
                                  (this.curCommandType = E.HORIZ_LINE_TO),
                                    (this.curCommandRelative = "h" === s);
                                else if ("v" === s || "V" === s)
                                  (this.curCommandType = E.VERT_LINE_TO),
                                    (this.curCommandRelative = "v" === s);
                                else if ("m" === s || "M" === s)
                                  (this.curCommandType = E.MOVE_TO),
                                    (this.curCommandRelative = "m" === s);
                                else if ("l" === s || "L" === s)
                                  (this.curCommandType = E.LINE_TO),
                                    (this.curCommandRelative = "l" === s);
                                else if ("c" === s || "C" === s)
                                  (this.curCommandType = E.CURVE_TO),
                                    (this.curCommandRelative = "c" === s);
                                else if ("s" === s || "S" === s)
                                  (this.curCommandType = E.SMOOTH_CURVE_TO),
                                    (this.curCommandRelative = "s" === s);
                                else if ("q" === s || "Q" === s)
                                  (this.curCommandType = E.QUAD_TO),
                                    (this.curCommandRelative = "q" === s);
                                else if ("t" === s || "T" === s)
                                  (this.curCommandType = E.SMOOTH_QUAD_TO),
                                    (this.curCommandRelative = "t" === s);
                                else {
                                  if ("a" !== s && "A" !== s)
                                    throw new SyntaxError(
                                      'Unexpected character "' +
                                        s +
                                        '" at index ' +
                                        n +
                                        "."
                                    );
                                  (this.curCommandType = E.ARC),
                                    (this.curCommandRelative = "a" === s);
                                }
                              else
                                e.push({ type: E.CLOSE_PATH }),
                                  (this.canParseCommandOrComma = !0),
                                  (this.curCommandType = -1);
                            }
                          else
                            (this.curNumber = s),
                              (this.curNumberHasDecimal = "." === s);
                      } else
                        (this.curNumber += s), (this.curNumberHasDecimal = !0);
                    else this.curNumber += s;
                  else (this.curNumber += s), (this.curNumberHasExp = !0);
                else
                  (this.curNumber += s),
                    (this.curNumberHasExpDigits = this.curNumberHasExp);
              }
              return e;
            }),
            (e.prototype.transform = function (t) {
              return Object.create(this, {
                parse: {
                  value: function (e, r) {
                    void 0 === r && (r = []);
                    for (
                      var i = 0,
                        n = Object.getPrototypeOf(this).parse.call(this, e);
                      i < n.length;
                      i++
                    ) {
                      var s = n[i],
                        a = t(s);
                      Array.isArray(a) ? r.push.apply(r, a) : r.push(a);
                    }
                    return r;
                  },
                },
              });
            }),
            e
          );
        })(A),
        E = (function (t) {
          function e(r) {
            var i = t.call(this) || this;
            return (i.commands = "string" == typeof r ? e.parse(r) : r), i;
          }
          return (
            c(e, t),
            (e.prototype.encode = function () {
              return e.encode(this.commands);
            }),
            (e.prototype.getBounds = function () {
              var t = v.CALCULATE_BOUNDS();
              return this.transform(t), t;
            }),
            (e.prototype.transform = function (t) {
              for (var e = [], r = 0, i = this.commands; r < i.length; r++) {
                var n = t(i[r]);
                Array.isArray(n) ? e.push.apply(e, n) : e.push(n);
              }
              return (this.commands = e), this;
            }),
            (e.encode = function (t) {
              return (function (t) {
                var e = "";
                Array.isArray(t) || (t = [t]);
                for (var r = 0; r < t.length; r++) {
                  var i = t[r];
                  if (i.type === E.CLOSE_PATH) e += "z";
                  else if (i.type === E.HORIZ_LINE_TO)
                    e += (i.relative ? "h" : "H") + i.x;
                  else if (i.type === E.VERT_LINE_TO)
                    e += (i.relative ? "v" : "V") + i.y;
                  else if (i.type === E.MOVE_TO)
                    e += (i.relative ? "m" : "M") + i.x + " " + i.y;
                  else if (i.type === E.LINE_TO)
                    e += (i.relative ? "l" : "L") + i.x + " " + i.y;
                  else if (i.type === E.CURVE_TO)
                    e +=
                      (i.relative ? "c" : "C") +
                      i.x1 +
                      " " +
                      i.y1 +
                      " " +
                      i.x2 +
                      " " +
                      i.y2 +
                      " " +
                      i.x +
                      " " +
                      i.y;
                  else if (i.type === E.SMOOTH_CURVE_TO)
                    e +=
                      (i.relative ? "s" : "S") +
                      i.x2 +
                      " " +
                      i.y2 +
                      " " +
                      i.x +
                      " " +
                      i.y;
                  else if (i.type === E.QUAD_TO)
                    e +=
                      (i.relative ? "q" : "Q") +
                      i.x1 +
                      " " +
                      i.y1 +
                      " " +
                      i.x +
                      " " +
                      i.y;
                  else if (i.type === E.SMOOTH_QUAD_TO)
                    e += (i.relative ? "t" : "T") + i.x + " " + i.y;
                  else {
                    if (i.type !== E.ARC)
                      throw new Error(
                        'Unexpected command type "' +
                          i.type +
                          '" at index ' +
                          r +
                          "."
                      );
                    e +=
                      (i.relative ? "a" : "A") +
                      i.rX +
                      " " +
                      i.rY +
                      " " +
                      i.xRot +
                      " " +
                      +i.lArcFlag +
                      " " +
                      +i.sweepFlag +
                      " " +
                      i.x +
                      " " +
                      i.y;
                  }
                }
                return e;
              })(t);
            }),
            (e.parse = function (t) {
              var e = new P(),
                r = [];
              return e.parse(t, r), e.finish(r), r;
            }),
            (e.CLOSE_PATH = 1),
            (e.MOVE_TO = 2),
            (e.HORIZ_LINE_TO = 4),
            (e.VERT_LINE_TO = 8),
            (e.LINE_TO = 16),
            (e.CURVE_TO = 32),
            (e.SMOOTH_CURVE_TO = 64),
            (e.QUAD_TO = 128),
            (e.SMOOTH_QUAD_TO = 256),
            (e.ARC = 512),
            (e.LINE_COMMANDS = e.LINE_TO | e.HORIZ_LINE_TO | e.VERT_LINE_TO),
            (e.DRAWING_COMMANDS =
              e.HORIZ_LINE_TO |
              e.VERT_LINE_TO |
              e.LINE_TO |
              e.CURVE_TO |
              e.SMOOTH_CURVE_TO |
              e.QUAD_TO |
              e.SMOOTH_QUAD_TO |
              e.ARC),
            e
          );
        })(A),
        M =
          (((T = {})[E.MOVE_TO] = 2),
          (T[E.LINE_TO] = 2),
          (T[E.HORIZ_LINE_TO] = 1),
          (T[E.VERT_LINE_TO] = 1),
          (T[E.CLOSE_PATH] = 0),
          (T[E.QUAD_TO] = 4),
          (T[E.SMOOTH_QUAD_TO] = 2),
          (T[E.CURVE_TO] = 6),
          (T[E.SMOOTH_CURVE_TO] = 4),
          (T[E.ARC] = 7),
          T);
      function N(t) {
        return (
          (N =
            "function" === typeof Symbol && "symbol" === typeof Symbol.iterator
              ? function (t) {
                  return typeof t;
                }
              : function (t) {
                  return t &&
                    "function" === typeof Symbol &&
                    t.constructor === Symbol &&
                    t !== Symbol.prototype
                    ? "symbol"
                    : typeof t;
                }),
          N(t)
        );
      }
      var _ = [
          512, 512, 456, 512, 328, 456, 335, 512, 405, 328, 271, 456, 388, 335,
          292, 512, 454, 405, 364, 328, 298, 271, 496, 456, 420, 388, 360, 335,
          312, 292, 273, 512, 482, 454, 428, 405, 383, 364, 345, 328, 312, 298,
          284, 271, 259, 496, 475, 456, 437, 420, 404, 388, 374, 360, 347, 335,
          323, 312, 302, 292, 282, 273, 265, 512, 497, 482, 468, 454, 441, 428,
          417, 405, 394, 383, 373, 364, 354, 345, 337, 328, 320, 312, 305, 298,
          291, 284, 278, 271, 265, 259, 507, 496, 485, 475, 465, 456, 446, 437,
          428, 420, 412, 404, 396, 388, 381, 374, 367, 360, 354, 347, 341, 335,
          329, 323, 318, 312, 307, 302, 297, 292, 287, 282, 278, 273, 269, 265,
          261, 512, 505, 497, 489, 482, 475, 468, 461, 454, 447, 441, 435, 428,
          422, 417, 411, 405, 399, 394, 389, 383, 378, 373, 368, 364, 359, 354,
          350, 345, 341, 337, 332, 328, 324, 320, 316, 312, 309, 305, 301, 298,
          294, 291, 287, 284, 281, 278, 274, 271, 268, 265, 262, 259, 257, 507,
          501, 496, 491, 485, 480, 475, 470, 465, 460, 456, 451, 446, 442, 437,
          433, 428, 424, 420, 416, 412, 408, 404, 400, 396, 392, 388, 385, 381,
          377, 374, 370, 367, 363, 360, 357, 354, 350, 347, 344, 341, 338, 335,
          332, 329, 326, 323, 320, 318, 315, 312, 310, 307, 304, 302, 299, 297,
          294, 292, 289, 287, 285, 282, 280, 278, 275, 273, 271, 269, 267, 265,
          263, 261, 259,
        ],
        V = [
          9, 11, 12, 13, 13, 14, 14, 15, 15, 15, 15, 16, 16, 16, 16, 17, 17, 17,
          17, 17, 17, 17, 18, 18, 18, 18, 18, 18, 18, 18, 18, 19, 19, 19, 19,
          19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 20, 20, 20, 20, 20, 20, 20,
          20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 21, 21, 21, 21, 21, 21,
          21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21,
          21, 21, 21, 21, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22,
          22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22,
          22, 22, 22, 22, 22, 22, 22, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23,
          23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23,
          23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23,
          23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 24, 24, 24, 24, 24, 24, 24,
          24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24,
          24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24,
          24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24,
          24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24,
        ];
      function R(t, e, r, i, n) {
        if (
          ("string" === typeof t && (t = document.getElementById(t)),
          !t || "object" !== N(t) || !("getContext" in t))
        )
          throw new TypeError(
            "Expecting canvas with `getContext` method in processCanvasRGB(A) calls!"
          );
        var s = t.getContext("2d");
        try {
          return s.getImageData(e, r, i, n);
        } catch (a) {
          throw new Error("unable to access image data: " + a);
        }
      }
      function k(t, e, r, i, n, s) {
        if (!(isNaN(s) || s < 1)) {
          s |= 0;
          var a = R(t, e, r, i, n);
          (a = (function (t, e, r, i, n, s) {
            for (
              var a,
                o = t.data,
                h = 2 * s + 1,
                u = i - 1,
                l = n - 1,
                c = s + 1,
                g = (c * (c + 1)) / 2,
                p = new I(),
                f = p,
                d = 1;
              d < h;
              d++
            )
              (f = f.next = new I()), d === c && (a = f);
            f.next = p;
            for (
              var y = null, v = null, m = 0, x = 0, b = _[s], S = V[s], w = 0;
              w < n;
              w++
            ) {
              f = p;
              for (
                var T = o[x], A = o[x + 1], O = o[x + 2], C = o[x + 3], P = 0;
                P < c;
                P++
              )
                (f.r = T), (f.g = A), (f.b = O), (f.a = C), (f = f.next);
              for (
                var E = 0,
                  M = 0,
                  N = 0,
                  R = 0,
                  k = c * T,
                  L = c * A,
                  D = c * O,
                  B = c * C,
                  z = g * T,
                  F = g * A,
                  j = g * O,
                  H = g * C,
                  U = 1;
                U < c;
                U++
              ) {
                var X = x + ((u < U ? u : U) << 2),
                  Y = o[X],
                  q = o[X + 1],
                  G = o[X + 2],
                  W = o[X + 3],
                  Q = c - U;
                (z += (f.r = Y) * Q),
                  (F += (f.g = q) * Q),
                  (j += (f.b = G) * Q),
                  (H += (f.a = W) * Q),
                  (E += Y),
                  (M += q),
                  (N += G),
                  (R += W),
                  (f = f.next);
              }
              (y = p), (v = a);
              for (var $ = 0; $ < i; $++) {
                var Z = (H * b) >>> S;
                if (((o[x + 3] = Z), 0 !== Z)) {
                  var K = 255 / Z;
                  (o[x] = ((z * b) >>> S) * K),
                    (o[x + 1] = ((F * b) >>> S) * K),
                    (o[x + 2] = ((j * b) >>> S) * K);
                } else o[x] = o[x + 1] = o[x + 2] = 0;
                (z -= k),
                  (F -= L),
                  (j -= D),
                  (H -= B),
                  (k -= y.r),
                  (L -= y.g),
                  (D -= y.b),
                  (B -= y.a);
                var J = $ + s + 1;
                (J = (m + (J < u ? J : u)) << 2),
                  (z += E += y.r = o[J]),
                  (F += M += y.g = o[J + 1]),
                  (j += N += y.b = o[J + 2]),
                  (H += R += y.a = o[J + 3]),
                  (y = y.next);
                var tt = v,
                  et = tt.r,
                  rt = tt.g,
                  it = tt.b,
                  nt = tt.a;
                (k += et),
                  (L += rt),
                  (D += it),
                  (B += nt),
                  (E -= et),
                  (M -= rt),
                  (N -= it),
                  (R -= nt),
                  (v = v.next),
                  (x += 4);
              }
              m += i;
            }
            for (var st = 0; st < i; st++) {
              var at = o[(x = st << 2)],
                ot = o[x + 1],
                ht = o[x + 2],
                ut = o[x + 3],
                lt = c * at,
                ct = c * ot,
                gt = c * ht,
                pt = c * ut,
                ft = g * at,
                dt = g * ot,
                yt = g * ht,
                vt = g * ut;
              f = p;
              for (var mt = 0; mt < c; mt++)
                (f.r = at), (f.g = ot), (f.b = ht), (f.a = ut), (f = f.next);
              for (
                var xt = i, bt = 0, St = 0, wt = 0, Tt = 0, At = 1;
                At <= s;
                At++
              ) {
                x = (xt + st) << 2;
                var Ot = c - At;
                (ft += (f.r = at = o[x]) * Ot),
                  (dt += (f.g = ot = o[x + 1]) * Ot),
                  (yt += (f.b = ht = o[x + 2]) * Ot),
                  (vt += (f.a = ut = o[x + 3]) * Ot),
                  (Tt += at),
                  (bt += ot),
                  (St += ht),
                  (wt += ut),
                  (f = f.next),
                  At < l && (xt += i);
              }
              (x = st), (y = p), (v = a);
              for (var Ct = 0; Ct < n; Ct++) {
                var Pt = x << 2;
                (o[Pt + 3] = ut = (vt * b) >>> S),
                  ut > 0
                    ? ((ut = 255 / ut),
                      (o[Pt] = ((ft * b) >>> S) * ut),
                      (o[Pt + 1] = ((dt * b) >>> S) * ut),
                      (o[Pt + 2] = ((yt * b) >>> S) * ut))
                    : (o[Pt] = o[Pt + 1] = o[Pt + 2] = 0),
                  (ft -= lt),
                  (dt -= ct),
                  (yt -= gt),
                  (vt -= pt),
                  (lt -= y.r),
                  (ct -= y.g),
                  (gt -= y.b),
                  (pt -= y.a),
                  (Pt = (st + ((Pt = Ct + c) < l ? Pt : l) * i) << 2),
                  (ft += Tt += y.r = o[Pt]),
                  (dt += bt += y.g = o[Pt + 1]),
                  (yt += St += y.b = o[Pt + 2]),
                  (vt += wt += y.a = o[Pt + 3]),
                  (y = y.next),
                  (lt += at = v.r),
                  (ct += ot = v.g),
                  (gt += ht = v.b),
                  (pt += ut = v.a),
                  (Tt -= at),
                  (bt -= ot),
                  (St -= ht),
                  (wt -= ut),
                  (v = v.next),
                  (x += i);
              }
            }
            return t;
          })(a, 0, 0, i, n, s)),
            t.getContext("2d").putImageData(a, e, r);
        }
      }
      var I = function t() {
        !(function (t, e) {
          if (!(t instanceof e))
            throw new TypeError("Cannot call a class as a function");
        })(this, t),
          (this.r = 0),
          (this.g = 0),
          (this.b = 0),
          (this.a = 0),
          (this.next = null);
      };
      var L = Object.freeze({
        __proto__: null,
        offscreen: function () {
          var { DOMParser: t } =
              arguments.length > 0 && void 0 !== arguments[0]
                ? arguments[0]
                : {},
            e = {
              window: null,
              ignoreAnimation: !0,
              ignoreMouse: !0,
              DOMParser: t,
              createCanvas: (t, e) => new OffscreenCanvas(t, e),
              createImage: (t) =>
                n(function* () {
                  var e = yield fetch(t),
                    r = yield e.blob();
                  return yield createImageBitmap(r);
                })(),
            };
          return (
            ("undefined" === typeof DOMParser && "undefined" !== typeof t) ||
              Reflect.deleteProperty(e, "DOMParser"),
            e
          );
        },
        node: function (t) {
          var { DOMParser: e, canvas: r, fetch: i } = t;
          return {
            window: null,
            ignoreAnimation: !0,
            ignoreMouse: !0,
            DOMParser: e,
            fetch: i,
            createCanvas: r.createCanvas,
            createImage: r.loadImage,
          };
        },
      });
      function D(t) {
        return t.replace(/(?!\u3000)\s+/gm, " ");
      }
      function B(t) {
        return t.replace(/^[\n \t]+/, "");
      }
      function z(t) {
        return t.replace(/[\n \t]+$/, "");
      }
      function F(t) {
        return (
          (t || "").match(
            /-?(\d+(?:\.\d*(?:[eE][+-]?\d+)?)?|\.\d+)(?=\D|$)/gm
          ) || []
        ).map(parseFloat);
      }
      var j = /^[A-Z-]+$/;
      function H(t) {
        return j.test(t) ? t.toLowerCase() : t;
      }
      function U(t) {
        var e = /url\(('([^']+)'|"([^"]+)"|([^'")]+))\)/.exec(t) || [];
        return e[2] || e[3] || e[4];
      }
      function X(t) {
        if (!t.startsWith("rgb")) return t;
        var e = 3;
        return t.replace(/\d+(\.\d+)?/g, (t, r) =>
          e-- && r ? String(Math.round(parseFloat(t))) : t
        );
      }
      var Y = /(\[[^\]]+\])/g,
        q = /(#[^\s+>~.[:]+)/g,
        G = /(\.[^\s+>~.[:]+)/g,
        W = /(::[^\s+>~.[:]+|:first-line|:first-letter|:before|:after)/gi,
        Q = /(:[\w-]+\([^)]*\))/gi,
        $ = /(:[^\s+>~.[:]+)/g,
        Z = /([^\s+>~.[:]+)/g;
      function K(t, e) {
        var r = e.exec(t);
        return r ? [t.replace(e, " "), r.length] : [t, 0];
      }
      function J(t) {
        var e = [0, 0, 0],
          r = t
            .replace(/:not\(([^)]*)\)/g, "     $1 ")
            .replace(/{[\s\S]*/gm, " "),
          i = 0;
        return (
          ([r, i] = K(r, Y)),
          (e[1] += i),
          ([r, i] = K(r, q)),
          (e[0] += i),
          ([r, i] = K(r, G)),
          (e[1] += i),
          ([r, i] = K(r, W)),
          (e[2] += i),
          ([r, i] = K(r, Q)),
          (e[1] += i),
          ([r, i] = K(r, $)),
          (e[1] += i),
          (r = r.replace(/[*\s+>~]/g, " ").replace(/[#.]/g, " ")),
          ([r, i] = K(r, Z)),
          (e[2] += i),
          e.join("")
        );
      }
      var tt = 1e-8;
      function et(t) {
        return Math.sqrt(Math.pow(t[0], 2) + Math.pow(t[1], 2));
      }
      function rt(t, e) {
        return (t[0] * e[0] + t[1] * e[1]) / (et(t) * et(e));
      }
      function it(t, e) {
        return (t[0] * e[1] < t[1] * e[0] ? -1 : 1) * Math.acos(rt(t, e));
      }
      function nt(t) {
        return t * t * t;
      }
      function st(t) {
        return 3 * t * t * (1 - t);
      }
      function at(t) {
        return 3 * t * (1 - t) * (1 - t);
      }
      function ot(t) {
        return (1 - t) * (1 - t) * (1 - t);
      }
      function ht(t) {
        return t * t;
      }
      function ut(t) {
        return 2 * t * (1 - t);
      }
      function lt(t) {
        return (1 - t) * (1 - t);
      }
      class ct {
        constructor(t, e, r) {
          (this.document = t),
            (this.name = e),
            (this.value = r),
            (this.isNormalizedColor = !1);
        }
        static empty(t) {
          return new ct(t, "EMPTY", "");
        }
        split() {
          var t =
              arguments.length > 0 && void 0 !== arguments[0]
                ? arguments[0]
                : " ",
            { document: e, name: r } = this;
          return D(this.getString())
            .trim()
            .split(t)
            .map((t) => new ct(e, r, t));
        }
        hasValue(t) {
          var { value: e } = this;
          return (
            null !== e && "" !== e && (t || 0 !== e) && "undefined" !== typeof e
          );
        }
        isString(t) {
          var { value: e } = this,
            r = "string" === typeof e;
          return r && t ? t.test(e) : r;
        }
        isUrlDefinition() {
          return this.isString(/^url\(/);
        }
        isPixels() {
          if (!this.hasValue()) return !1;
          var t = this.getString();
          switch (!0) {
            case t.endsWith("px"):
            case /^[0-9]+$/.test(t):
              return !0;
            default:
              return !1;
          }
        }
        setValue(t) {
          return (this.value = t), this;
        }
        getValue(t) {
          return "undefined" === typeof t || this.hasValue() ? this.value : t;
        }
        getNumber(t) {
          if (!this.hasValue())
            return "undefined" === typeof t ? 0 : parseFloat(t);
          var { value: e } = this,
            r = parseFloat(e);
          return this.isString(/%$/) && (r /= 100), r;
        }
        getString(t) {
          return "undefined" === typeof t || this.hasValue()
            ? "undefined" === typeof this.value
              ? ""
              : String(this.value)
            : String(t);
        }
        getColor(t) {
          var e = this.getString(t);
          return (
            this.isNormalizedColor ||
              ((this.isNormalizedColor = !0), (e = X(e)), (this.value = e)),
            e
          );
        }
        getDpi() {
          return 96;
        }
        getRem() {
          return this.document.rootEmSize;
        }
        getEm() {
          return this.document.emSize;
        }
        getUnits() {
          return this.getString().replace(/[0-9.-]/g, "");
        }
        getPixels(t) {
          var e =
            arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
          if (!this.hasValue()) return 0;
          var [r, i] = "boolean" === typeof t ? [void 0, t] : [t],
            { viewPort: n } = this.document.screen;
          switch (!0) {
            case this.isString(/vmin$/):
              return (
                (this.getNumber() / 100) *
                Math.min(n.computeSize("x"), n.computeSize("y"))
              );
            case this.isString(/vmax$/):
              return (
                (this.getNumber() / 100) *
                Math.max(n.computeSize("x"), n.computeSize("y"))
              );
            case this.isString(/vw$/):
              return (this.getNumber() / 100) * n.computeSize("x");
            case this.isString(/vh$/):
              return (this.getNumber() / 100) * n.computeSize("y");
            case this.isString(/rem$/):
              return this.getNumber() * this.getRem();
            case this.isString(/em$/):
              return this.getNumber() * this.getEm();
            case this.isString(/ex$/):
              return (this.getNumber() * this.getEm()) / 2;
            case this.isString(/px$/):
              return this.getNumber();
            case this.isString(/pt$/):
              return this.getNumber() * this.getDpi() * (1 / 72);
            case this.isString(/pc$/):
              return 15 * this.getNumber();
            case this.isString(/cm$/):
              return (this.getNumber() * this.getDpi()) / 2.54;
            case this.isString(/mm$/):
              return (this.getNumber() * this.getDpi()) / 25.4;
            case this.isString(/in$/):
              return this.getNumber() * this.getDpi();
            case this.isString(/%$/) && i:
              return this.getNumber() * this.getEm();
            case this.isString(/%$/):
              return this.getNumber() * n.computeSize(r);
            default:
              var s = this.getNumber();
              return e && s < 1 ? s * n.computeSize(r) : s;
          }
        }
        getMilliseconds() {
          return this.hasValue()
            ? this.isString(/ms$/)
              ? this.getNumber()
              : 1e3 * this.getNumber()
            : 0;
        }
        getRadians() {
          if (!this.hasValue()) return 0;
          switch (!0) {
            case this.isString(/deg$/):
              return this.getNumber() * (Math.PI / 180);
            case this.isString(/grad$/):
              return this.getNumber() * (Math.PI / 200);
            case this.isString(/rad$/):
              return this.getNumber();
            default:
              return this.getNumber() * (Math.PI / 180);
          }
        }
        getDefinition() {
          var t = this.getString(),
            e = /#([^)'"]+)/.exec(t);
          return e && (e = e[1]), e || (e = t), this.document.definitions[e];
        }
        getFillStyleDefinition(t, e) {
          var r = this.getDefinition();
          if (!r) return null;
          if ("function" === typeof r.createGradient)
            return r.createGradient(this.document.ctx, t, e);
          if ("function" === typeof r.createPattern) {
            if (r.getHrefAttribute().hasValue()) {
              var i = r.getAttribute("patternTransform");
              (r = r.getHrefAttribute().getDefinition()),
                i.hasValue() &&
                  r.getAttribute("patternTransform", !0).setValue(i.value);
            }
            return r.createPattern(this.document.ctx, t, e);
          }
          return null;
        }
        getTextBaseline() {
          return this.hasValue()
            ? ct.textBaselineMapping[this.getString()]
            : null;
        }
        addOpacity(t) {
          for (
            var e = this.getColor(), r = e.length, i = 0, n = 0;
            n < r && ("," === e[n] && i++, 3 !== i);
            n++
          );
          if (t.hasValue() && this.isString() && 3 !== i) {
            var s = new u(e);
            s.ok && ((s.alpha = t.getNumber()), (e = s.toRGBA()));
          }
          return new ct(this.document, this.name, e);
        }
      }
      ct.textBaselineMapping = {
        baseline: "alphabetic",
        "before-edge": "top",
        "text-before-edge": "top",
        middle: "middle",
        central: "middle",
        "after-edge": "bottom",
        "text-after-edge": "bottom",
        ideographic: "ideographic",
        alphabetic: "alphabetic",
        hanging: "hanging",
        mathematical: "alphabetic",
      };
      class gt {
        constructor() {
          this.viewPorts = [];
        }
        clear() {
          this.viewPorts = [];
        }
        setCurrent(t, e) {
          this.viewPorts.push({ width: t, height: e });
        }
        removeCurrent() {
          this.viewPorts.pop();
        }
        getCurrent() {
          var { viewPorts: t } = this;
          return t[t.length - 1];
        }
        get width() {
          return this.getCurrent().width;
        }
        get height() {
          return this.getCurrent().height;
        }
        computeSize(t) {
          return "number" === typeof t
            ? t
            : "x" === t
              ? this.width
              : "y" === t
                ? this.height
                : Math.sqrt(
                    Math.pow(this.width, 2) + Math.pow(this.height, 2)
                  ) / Math.sqrt(2);
        }
      }
      class pt {
        constructor(t, e) {
          (this.x = t), (this.y = e);
        }
        static parse(t) {
          var e =
              arguments.length > 1 && void 0 !== arguments[1]
                ? arguments[1]
                : 0,
            [r = e, i = e] = F(t);
          return new pt(r, i);
        }
        static parseScale(t) {
          var e =
              arguments.length > 1 && void 0 !== arguments[1]
                ? arguments[1]
                : 1,
            [r = e, i = r] = F(t);
          return new pt(r, i);
        }
        static parsePath(t) {
          for (var e = F(t), r = e.length, i = [], n = 0; n < r; n += 2)
            i.push(new pt(e[n], e[n + 1]));
          return i;
        }
        angleTo(t) {
          return Math.atan2(t.y - this.y, t.x - this.x);
        }
        applyTransform(t) {
          var { x: e, y: r } = this,
            i = e * t[0] + r * t[2] + t[4],
            n = e * t[1] + r * t[3] + t[5];
          (this.x = i), (this.y = n);
        }
      }
      class ft {
        constructor(t) {
          (this.screen = t),
            (this.working = !1),
            (this.events = []),
            (this.eventElements = []),
            (this.onClick = this.onClick.bind(this)),
            (this.onMouseMove = this.onMouseMove.bind(this));
        }
        isWorking() {
          return this.working;
        }
        start() {
          if (!this.working) {
            var { screen: t, onClick: e, onMouseMove: r } = this,
              i = t.ctx.canvas;
            (i.onclick = e), (i.onmousemove = r), (this.working = !0);
          }
        }
        stop() {
          if (this.working) {
            var t = this.screen.ctx.canvas;
            (this.working = !1), (t.onclick = null), (t.onmousemove = null);
          }
        }
        hasEvents() {
          return this.working && this.events.length > 0;
        }
        runEvents() {
          if (this.working) {
            var { screen: t, events: e, eventElements: r } = this,
              { style: i } = t.ctx.canvas;
            i && (i.cursor = ""),
              e.forEach((t, e) => {
                for (var { run: i } = t, n = r[e]; n; ) i(n), (n = n.parent);
              }),
              (this.events = []),
              (this.eventElements = []);
          }
        }
        checkPath(t, e) {
          if (this.working && e) {
            var { events: r, eventElements: i } = this;
            r.forEach((r, n) => {
              var { x: s, y: a } = r;
              !i[n] && e.isPointInPath && e.isPointInPath(s, a) && (i[n] = t);
            });
          }
        }
        checkBoundingBox(t, e) {
          if (this.working && e) {
            var { events: r, eventElements: i } = this;
            r.forEach((r, n) => {
              var { x: s, y: a } = r;
              !i[n] && e.isPointInBox(s, a) && (i[n] = t);
            });
          }
        }
        mapXY(t, e) {
          for (
            var { window: r, ctx: i } = this.screen,
              n = new pt(t, e),
              s = i.canvas;
            s;

          )
            (n.x -= s.offsetLeft), (n.y -= s.offsetTop), (s = s.offsetParent);
          return (
            r.scrollX && (n.x += r.scrollX), r.scrollY && (n.y += r.scrollY), n
          );
        }
        onClick(t) {
          var { x: e, y: r } = this.mapXY(t.clientX, t.clientY);
          this.events.push({
            type: "onclick",
            x: e,
            y: r,
            run(t) {
              t.onClick && t.onClick();
            },
          });
        }
        onMouseMove(t) {
          var { x: e, y: r } = this.mapXY(t.clientX, t.clientY);
          this.events.push({
            type: "onmousemove",
            x: e,
            y: r,
            run(t) {
              t.onMouseMove && t.onMouseMove();
            },
          });
        }
      }
      var dt = "undefined" !== typeof window ? window : null,
        yt = "undefined" !== typeof fetch ? fetch.bind(void 0) : null;
      class vt {
        constructor(t) {
          var { fetch: e = yt, window: r = dt } =
            arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
          (this.ctx = t),
            (this.FRAMERATE = 30),
            (this.MAX_VIRTUAL_PIXELS = 3e4),
            (this.CLIENT_WIDTH = 800),
            (this.CLIENT_HEIGHT = 600),
            (this.viewPort = new gt()),
            (this.mouse = new ft(this)),
            (this.animations = []),
            (this.waits = []),
            (this.frameDuration = 0),
            (this.isReadyLock = !1),
            (this.isFirstRender = !0),
            (this.intervalId = null),
            (this.window = r),
            (this.fetch = e);
        }
        wait(t) {
          this.waits.push(t);
        }
        ready() {
          return this.readyPromise ? this.readyPromise : Promise.resolve();
        }
        isReady() {
          if (this.isReadyLock) return !0;
          var t = this.waits.every((t) => t());
          return (
            t && ((this.waits = []), this.resolveReady && this.resolveReady()),
            (this.isReadyLock = t),
            t
          );
        }
        setDefaults(t) {
          (t.strokeStyle = "rgba(0,0,0,0)"),
            (t.lineCap = "butt"),
            (t.lineJoin = "miter"),
            (t.miterLimit = 4);
        }
        setViewBox(t) {
          var {
              document: e,
              ctx: r,
              aspectRatio: i,
              width: n,
              desiredWidth: s,
              height: a,
              desiredHeight: o,
              minX: h = 0,
              minY: u = 0,
              refX: l,
              refY: c,
              clip: g = !1,
              clipX: p = 0,
              clipY: f = 0,
            } = t,
            d = D(i).replace(/^defer\s/, ""),
            [y, v] = d.split(" "),
            m = y || "xMidYMid",
            x = v || "meet",
            b = n / s,
            S = a / o,
            w = Math.min(b, S),
            T = Math.max(b, S),
            A = s,
            O = o;
          "meet" === x && ((A *= w), (O *= w)),
            "slice" === x && ((A *= T), (O *= T));
          var C = new ct(e, "refX", l),
            P = new ct(e, "refY", c),
            E = C.hasValue() && P.hasValue();
          if (
            (E && r.translate(-w * C.getPixels("x"), -w * P.getPixels("y")), g)
          ) {
            var M = w * p,
              N = w * f;
            r.beginPath(),
              r.moveTo(M, N),
              r.lineTo(n, N),
              r.lineTo(n, a),
              r.lineTo(M, a),
              r.closePath(),
              r.clip();
          }
          if (!E) {
            var _ = "meet" === x && w === S,
              V = "slice" === x && T === S,
              R = "meet" === x && w === b,
              k = "slice" === x && T === b;
            m.startsWith("xMid") && (_ || V) && r.translate(n / 2 - A / 2, 0),
              m.endsWith("YMid") && (R || k) && r.translate(0, a / 2 - O / 2),
              m.startsWith("xMax") && (_ || V) && r.translate(n - A, 0),
              m.endsWith("YMax") && (R || k) && r.translate(0, a - O);
          }
          switch (!0) {
            case "none" === m:
              r.scale(b, S);
              break;
            case "meet" === x:
              r.scale(w, w);
              break;
            case "slice" === x:
              r.scale(T, T);
          }
          r.translate(-h, -u);
        }
        start(t) {
          var {
              enableRedraw: e = !1,
              ignoreMouse: r = !1,
              ignoreAnimation: i = !1,
              ignoreDimensions: n = !1,
              ignoreClear: s = !1,
              forceRedraw: a,
              scaleWidth: o,
              scaleHeight: u,
              offsetX: l,
              offsetY: c,
            } = arguments.length > 1 && void 0 !== arguments[1]
              ? arguments[1]
              : {},
            { FRAMERATE: g, mouse: p } = this,
            f = 1e3 / g;
          if (
            ((this.frameDuration = f),
            (this.readyPromise = new Promise((t) => {
              this.resolveReady = t;
            })),
            this.isReady() && this.render(t, n, s, o, u, l, c),
            e)
          ) {
            var d = Date.now(),
              y = d,
              v = 0,
              m = () => {
                (d = Date.now()),
                  (v = d - y) >= f &&
                    ((y = d - (v % f)),
                    this.shouldUpdate(i, a) &&
                      (this.render(t, n, s, o, u, l, c), p.runEvents())),
                  (this.intervalId = h(m));
              };
            r || p.start(), (this.intervalId = h(m));
          }
        }
        stop() {
          this.intervalId &&
            (h.cancel(this.intervalId), (this.intervalId = null)),
            this.mouse.stop();
        }
        shouldUpdate(t, e) {
          if (!t) {
            var { frameDuration: r } = this;
            if (this.animations.reduce((t, e) => e.update(r) || t, !1))
              return !0;
          }
          return (
            !("function" !== typeof e || !e()) ||
            !(this.isReadyLock || !this.isReady()) ||
            !!this.mouse.hasEvents()
          );
        }
        render(t, e, r, i, n, s, a) {
          var {
              CLIENT_WIDTH: o,
              CLIENT_HEIGHT: h,
              viewPort: u,
              ctx: l,
              isFirstRender: c,
            } = this,
            g = l.canvas;
          u.clear(),
            g.width && g.height
              ? u.setCurrent(g.width, g.height)
              : u.setCurrent(o, h);
          var p = t.getStyle("width"),
            f = t.getStyle("height");
          !e &&
            (c || ("number" !== typeof i && "number" !== typeof n)) &&
            (p.hasValue() &&
              ((g.width = p.getPixels("x")),
              g.style && (g.style.width = "".concat(g.width, "px"))),
            f.hasValue() &&
              ((g.height = f.getPixels("y")),
              g.style && (g.style.height = "".concat(g.height, "px"))));
          var d = g.clientWidth || g.width,
            y = g.clientHeight || g.height;
          if (
            (e &&
              p.hasValue() &&
              f.hasValue() &&
              ((d = p.getPixels("x")), (y = f.getPixels("y"))),
            u.setCurrent(d, y),
            "number" === typeof s && t.getAttribute("x", !0).setValue(s),
            "number" === typeof a && t.getAttribute("y", !0).setValue(a),
            "number" === typeof i || "number" === typeof n)
          ) {
            var v = F(t.getAttribute("viewBox").getString()),
              m = 0,
              x = 0;
            if ("number" === typeof i) {
              var b = t.getStyle("width");
              b.hasValue()
                ? (m = b.getPixels("x") / i)
                : isNaN(v[2]) || (m = v[2] / i);
            }
            if ("number" === typeof n) {
              var S = t.getStyle("height");
              S.hasValue()
                ? (x = S.getPixels("y") / n)
                : isNaN(v[3]) || (x = v[3] / n);
            }
            m || (m = x),
              x || (x = m),
              t.getAttribute("width", !0).setValue(i),
              t.getAttribute("height", !0).setValue(n);
            var w = t.getStyle("transform", !0, !0);
            w.setValue(
              ""
                .concat(w.getString(), " scale(")
                .concat(1 / m, ", ")
                .concat(1 / x, ")")
            );
          }
          r || l.clearRect(0, 0, d, y),
            t.render(l),
            c && (this.isFirstRender = !1);
        }
      }
      (vt.defaultWindow = dt), (vt.defaultFetch = yt);
      var { defaultFetch: mt } = vt,
        xt = "undefined" !== typeof DOMParser ? DOMParser : null;
      class bt {
        constructor() {
          var { fetch: t = mt, DOMParser: e = xt } =
            arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
          (this.fetch = t), (this.DOMParser = e);
        }
        parse(t) {
          var e = this;
          return n(function* () {
            return t.startsWith("<") ? e.parseFromString(t) : e.load(t);
          })();
        }
        parseFromString(t) {
          var e = new this.DOMParser();
          try {
            return this.checkDocument(e.parseFromString(t, "image/svg+xml"));
          } catch (r) {
            return this.checkDocument(e.parseFromString(t, "text/xml"));
          }
        }
        checkDocument(t) {
          var e = t.getElementsByTagName("parsererror")[0];
          if (e) throw new Error(e.textContent);
          return t;
        }
        load(t) {
          var e = this;
          return n(function* () {
            var r = yield e.fetch(t),
              i = yield r.text();
            return e.parseFromString(i);
          })();
        }
      }
      class St {
        constructor(t, e) {
          (this.type = "translate"),
            (this.point = null),
            (this.point = pt.parse(e));
        }
        apply(t) {
          var { x: e, y: r } = this.point;
          t.translate(e || 0, r || 0);
        }
        unapply(t) {
          var { x: e, y: r } = this.point;
          t.translate(-1 * e || 0, -1 * r || 0);
        }
        applyToPoint(t) {
          var { x: e, y: r } = this.point;
          t.applyTransform([1, 0, 0, 1, e || 0, r || 0]);
        }
      }
      class wt {
        constructor(t, e, r) {
          (this.type = "rotate"),
            (this.angle = null),
            (this.originX = null),
            (this.originY = null),
            (this.cx = 0),
            (this.cy = 0);
          var i = F(e);
          (this.angle = new ct(t, "angle", i[0])),
            (this.originX = r[0]),
            (this.originY = r[1]),
            (this.cx = i[1] || 0),
            (this.cy = i[2] || 0);
        }
        apply(t) {
          var { cx: e, cy: r, originX: i, originY: n, angle: s } = this,
            a = e + i.getPixels("x"),
            o = r + n.getPixels("y");
          t.translate(a, o), t.rotate(s.getRadians()), t.translate(-a, -o);
        }
        unapply(t) {
          var { cx: e, cy: r, originX: i, originY: n, angle: s } = this,
            a = e + i.getPixels("x"),
            o = r + n.getPixels("y");
          t.translate(a, o), t.rotate(-1 * s.getRadians()), t.translate(-a, -o);
        }
        applyToPoint(t) {
          var { cx: e, cy: r, angle: i } = this,
            n = i.getRadians();
          t.applyTransform([1, 0, 0, 1, e || 0, r || 0]),
            t.applyTransform([
              Math.cos(n),
              Math.sin(n),
              -Math.sin(n),
              Math.cos(n),
              0,
              0,
            ]),
            t.applyTransform([1, 0, 0, 1, -e || 0, -r || 0]);
        }
      }
      class Tt {
        constructor(t, e, r) {
          (this.type = "scale"),
            (this.scale = null),
            (this.originX = null),
            (this.originY = null);
          var i = pt.parseScale(e);
          (0 !== i.x && 0 !== i.y) || ((i.x = tt), (i.y = tt)),
            (this.scale = i),
            (this.originX = r[0]),
            (this.originY = r[1]);
        }
        apply(t) {
          var {
              scale: { x: e, y: r },
              originX: i,
              originY: n,
            } = this,
            s = i.getPixels("x"),
            a = n.getPixels("y");
          t.translate(s, a), t.scale(e, r || e), t.translate(-s, -a);
        }
        unapply(t) {
          var {
              scale: { x: e, y: r },
              originX: i,
              originY: n,
            } = this,
            s = i.getPixels("x"),
            a = n.getPixels("y");
          t.translate(s, a), t.scale(1 / e, 1 / r || e), t.translate(-s, -a);
        }
        applyToPoint(t) {
          var { x: e, y: r } = this.scale;
          t.applyTransform([e || 0, 0, 0, r || 0, 0, 0]);
        }
      }
      class At {
        constructor(t, e, r) {
          (this.type = "matrix"),
            (this.matrix = []),
            (this.originX = null),
            (this.originY = null),
            (this.matrix = F(e)),
            (this.originX = r[0]),
            (this.originY = r[1]);
        }
        apply(t) {
          var { originX: e, originY: r, matrix: i } = this,
            n = e.getPixels("x"),
            s = r.getPixels("y");
          t.translate(n, s),
            t.transform(i[0], i[1], i[2], i[3], i[4], i[5]),
            t.translate(-n, -s);
        }
        unapply(t) {
          var { originX: e, originY: r, matrix: i } = this,
            n = i[0],
            s = i[2],
            a = i[4],
            o = i[1],
            h = i[3],
            u = i[5],
            l =
              1 /
              (n * (1 * h - 0 * u) - s * (1 * o - 0 * u) + a * (0 * o - 0 * h)),
            c = e.getPixels("x"),
            g = r.getPixels("y");
          t.translate(c, g),
            t.transform(
              l * (1 * h - 0 * u),
              l * (0 * u - 1 * o),
              l * (0 * a - 1 * s),
              l * (1 * n - 0 * a),
              l * (s * u - a * h),
              l * (a * o - n * u)
            ),
            t.translate(-c, -g);
        }
        applyToPoint(t) {
          t.applyTransform(this.matrix);
        }
      }
      class Ot extends At {
        constructor(t, e, r) {
          super(t, e, r),
            (this.type = "skew"),
            (this.angle = null),
            (this.angle = new ct(t, "angle", e));
        }
      }
      class Ct extends Ot {
        constructor(t, e, r) {
          super(t, e, r),
            (this.type = "skewX"),
            (this.matrix = [1, 0, Math.tan(this.angle.getRadians()), 1, 0, 0]);
        }
      }
      class Pt extends Ot {
        constructor(t, e, r) {
          super(t, e, r),
            (this.type = "skewY"),
            (this.matrix = [1, Math.tan(this.angle.getRadians()), 0, 1, 0, 0]);
        }
      }
      class Et {
        constructor(t, e, r) {
          (this.document = t), (this.transforms = []);
          var i = (function (t) {
            return D(t)
              .trim()
              .replace(/\)([a-zA-Z])/g, ") $1")
              .replace(/\)(\s?,\s?)/g, ") ")
              .split(/\s(?=[a-z])/);
          })(e);
          i.forEach((t) => {
            if ("none" !== t) {
              var [e, i] = (function (t) {
                  var [e, r] = t.split("(");
                  return [e.trim(), r.trim().replace(")", "")];
                })(t),
                n = Et.transformTypes[e];
              "undefined" !== typeof n &&
                this.transforms.push(new n(this.document, i, r));
            }
          });
        }
        static fromElement(t, e) {
          var r = e.getStyle("transform", !1, !0),
            [i, n = i] = e.getStyle("transform-origin", !1, !0).split(),
            s = [i, n];
          return r.hasValue() ? new Et(t, r.getString(), s) : null;
        }
        apply(t) {
          for (var { transforms: e } = this, r = e.length, i = 0; i < r; i++)
            e[i].apply(t);
        }
        unapply(t) {
          for (var { transforms: e } = this, r = e.length - 1; r >= 0; r--)
            e[r].unapply(t);
        }
        applyToPoint(t) {
          for (var { transforms: e } = this, r = e.length, i = 0; i < r; i++)
            e[i].applyToPoint(t);
        }
      }
      Et.transformTypes = {
        translate: St,
        rotate: wt,
        scale: Tt,
        matrix: At,
        skewX: Ct,
        skewY: Pt,
      };
      class Mt {
        constructor(t, e) {
          var r =
            arguments.length > 2 && void 0 !== arguments[2] && arguments[2];
          if (
            ((this.document = t),
            (this.node = e),
            (this.captureTextNodes = r),
            (this.attributes = {}),
            (this.styles = {}),
            (this.stylesSpecificity = {}),
            (this.animationFrozen = !1),
            (this.animationFrozenValue = ""),
            (this.parent = null),
            (this.children = []),
            e && 1 === e.nodeType)
          ) {
            if (
              (Array.from(e.attributes).forEach((e) => {
                var r = H(e.nodeName);
                this.attributes[r] = new ct(t, r, e.value);
              }),
              this.addStylesFromStyleDefinition(),
              this.getAttribute("style").hasValue())
            ) {
              var i = this.getAttribute("style")
                .getString()
                .split(";")
                .map((t) => t.trim());
              i.forEach((e) => {
                if (e) {
                  var [r, i] = e.split(":").map((t) => t.trim());
                  this.styles[r] = new ct(t, r, i);
                }
              });
            }
            var { definitions: n } = t,
              s = this.getAttribute("id");
            s.hasValue() && (n[s.getString()] || (n[s.getString()] = this)),
              Array.from(e.childNodes).forEach((e) => {
                if (1 === e.nodeType) this.addChild(e);
                else if (r && (3 === e.nodeType || 4 === e.nodeType)) {
                  var i = t.createTextNode(e);
                  i.getText().length > 0 && this.addChild(i);
                }
              });
          }
        }
        getAttribute(t) {
          var e =
              arguments.length > 1 && void 0 !== arguments[1] && arguments[1],
            r = this.attributes[t];
          if (!r && e) {
            var i = new ct(this.document, t, "");
            return (this.attributes[t] = i), i;
          }
          return r || ct.empty(this.document);
        }
        getHrefAttribute() {
          for (var t in this.attributes)
            if ("href" === t || t.endsWith(":href")) return this.attributes[t];
          return ct.empty(this.document);
        }
        getStyle(t) {
          var e =
              arguments.length > 1 && void 0 !== arguments[1] && arguments[1],
            r = arguments.length > 2 && void 0 !== arguments[2] && arguments[2],
            i = this.styles[t];
          if (i) return i;
          var n = this.getAttribute(t);
          if (null !== n && void 0 !== n && n.hasValue())
            return (this.styles[t] = n), n;
          if (!r) {
            var { parent: s } = this;
            if (s) {
              var a = s.getStyle(t);
              if (null !== a && void 0 !== a && a.hasValue()) return a;
            }
          }
          if (e) {
            var o = new ct(this.document, t, "");
            return (this.styles[t] = o), o;
          }
          return i || ct.empty(this.document);
        }
        render(t) {
          if (
            "none" !== this.getStyle("display").getString() &&
            "hidden" !== this.getStyle("visibility").getString()
          ) {
            if ((t.save(), this.getStyle("mask").hasValue())) {
              var e = this.getStyle("mask").getDefinition();
              e && (this.applyEffects(t), e.apply(t, this));
            } else if ("none" !== this.getStyle("filter").getValue("none")) {
              var r = this.getStyle("filter").getDefinition();
              r && (this.applyEffects(t), r.apply(t, this));
            } else
              this.setContext(t), this.renderChildren(t), this.clearContext(t);
            t.restore();
          }
        }
        setContext(t) {}
        applyEffects(t) {
          var e = Et.fromElement(this.document, this);
          e && e.apply(t);
          var r = this.getStyle("clip-path", !1, !0);
          if (r.hasValue()) {
            var i = r.getDefinition();
            i && i.apply(t);
          }
        }
        clearContext(t) {}
        renderChildren(t) {
          this.children.forEach((e) => {
            e.render(t);
          });
        }
        addChild(t) {
          var e = t instanceof Mt ? t : this.document.createElement(t);
          (e.parent = this),
            Mt.ignoreChildTypes.includes(e.type) || this.children.push(e);
        }
        matchesSelector(t) {
          var e,
            { node: r } = this;
          if ("function" === typeof r.matches) return r.matches(t);
          var i =
            null === (e = r.getAttribute) || void 0 === e
              ? void 0
              : e.call(r, "class");
          return (
            !(!i || "" === i) && i.split(" ").some((e) => ".".concat(e) === t)
          );
        }
        addStylesFromStyleDefinition() {
          var { styles: t, stylesSpecificity: e } = this.document;
          for (var r in t)
            if (!r.startsWith("@") && this.matchesSelector(r)) {
              var i = t[r],
                n = e[r];
              if (i)
                for (var s in i) {
                  var a = this.stylesSpecificity[s];
                  "undefined" === typeof a && (a = "000"),
                    n >= a &&
                      ((this.styles[s] = i[s]),
                      (this.stylesSpecificity[s] = n));
                }
            }
        }
        removeStyles(t, e) {
          return e.reduce((e, r) => {
            var i = t.getStyle(r);
            if (!i.hasValue()) return e;
            var n = i.getString();
            return i.setValue(""), [...e, [r, n]];
          }, []);
        }
        restoreStyles(t, e) {
          e.forEach((e) => {
            var [r, i] = e;
            t.getStyle(r, !0).setValue(i);
          });
        }
        isFirstChild() {
          var t;
          return (
            0 ===
            (null === (t = this.parent) || void 0 === t
              ? void 0
              : t.children.indexOf(this))
          );
        }
      }
      Mt.ignoreChildTypes = ["title"];
      class Nt extends Mt {
        constructor(t, e, r) {
          super(t, e, r);
        }
      }
      function _t(t) {
        var e = t.trim();
        return /^('|")/.test(e) ? e : '"'.concat(e, '"');
      }
      function Vt(t) {
        if (!t) return "";
        var e = t.trim().toLowerCase();
        switch (e) {
          case "normal":
          case "italic":
          case "oblique":
          case "inherit":
          case "initial":
          case "unset":
            return e;
          default:
            return /^oblique\s+(-|)\d+deg$/.test(e) ? e : "";
        }
      }
      function Rt(t) {
        if (!t) return "";
        var e = t.trim().toLowerCase();
        switch (e) {
          case "normal":
          case "bold":
          case "lighter":
          case "bolder":
          case "inherit":
          case "initial":
          case "unset":
            return e;
          default:
            return /^[\d.]+$/.test(e) ? e : "";
        }
      }
      class kt {
        constructor(t, e, r, i, n, s) {
          var a = s ? ("string" === typeof s ? kt.parse(s) : s) : {};
          (this.fontFamily = n || a.fontFamily),
            (this.fontSize = i || a.fontSize),
            (this.fontStyle = t || a.fontStyle),
            (this.fontWeight = r || a.fontWeight),
            (this.fontVariant = e || a.fontVariant);
        }
        static parse() {
          var t = arguments.length > 1 ? arguments[1] : void 0,
            e = "",
            r = "",
            i = "",
            n = "",
            s = "",
            a = D(
              arguments.length > 0 && void 0 !== arguments[0]
                ? arguments[0]
                : ""
            )
              .trim()
              .split(" "),
            o = {
              fontSize: !1,
              fontStyle: !1,
              fontWeight: !1,
              fontVariant: !1,
            };
          return (
            a.forEach((t) => {
              switch (!0) {
                case !o.fontStyle && kt.styles.includes(t):
                  "inherit" !== t && (e = t), (o.fontStyle = !0);
                  break;
                case !o.fontVariant && kt.variants.includes(t):
                  "inherit" !== t && (r = t),
                    (o.fontStyle = !0),
                    (o.fontVariant = !0);
                  break;
                case !o.fontWeight && kt.weights.includes(t):
                  "inherit" !== t && (i = t),
                    (o.fontStyle = !0),
                    (o.fontVariant = !0),
                    (o.fontWeight = !0);
                  break;
                case !o.fontSize:
                  "inherit" !== t && ([n] = t.split("/")),
                    (o.fontStyle = !0),
                    (o.fontVariant = !0),
                    (o.fontWeight = !0),
                    (o.fontSize = !0);
                  break;
                default:
                  "inherit" !== t && (s += t);
              }
            }),
            new kt(e, r, i, n, s, t)
          );
        }
        toString() {
          return [
            Vt(this.fontStyle),
            this.fontVariant,
            Rt(this.fontWeight),
            this.fontSize,
            ((t = this.fontFamily),
            "undefined" === typeof process
              ? t
              : t.trim().split(",").map(_t).join(",")),
          ]
            .join(" ")
            .trim();
          var t;
        }
      }
      (kt.styles = "normal|italic|oblique|inherit"),
        (kt.variants = "normal|small-caps|inherit"),
        (kt.weights =
          "normal|bold|bolder|lighter|100|200|300|400|500|600|700|800|900|inherit");
      class It {
        constructor() {
          var t =
              arguments.length > 0 && void 0 !== arguments[0]
                ? arguments[0]
                : Number.NaN,
            e =
              arguments.length > 1 && void 0 !== arguments[1]
                ? arguments[1]
                : Number.NaN,
            r =
              arguments.length > 2 && void 0 !== arguments[2]
                ? arguments[2]
                : Number.NaN,
            i =
              arguments.length > 3 && void 0 !== arguments[3]
                ? arguments[3]
                : Number.NaN;
          (this.x1 = t),
            (this.y1 = e),
            (this.x2 = r),
            (this.y2 = i),
            this.addPoint(t, e),
            this.addPoint(r, i);
        }
        get x() {
          return this.x1;
        }
        get y() {
          return this.y1;
        }
        get width() {
          return this.x2 - this.x1;
        }
        get height() {
          return this.y2 - this.y1;
        }
        addPoint(t, e) {
          "undefined" !== typeof t &&
            ((isNaN(this.x1) || isNaN(this.x2)) &&
              ((this.x1 = t), (this.x2 = t)),
            t < this.x1 && (this.x1 = t),
            t > this.x2 && (this.x2 = t)),
            "undefined" !== typeof e &&
              ((isNaN(this.y1) || isNaN(this.y2)) &&
                ((this.y1 = e), (this.y2 = e)),
              e < this.y1 && (this.y1 = e),
              e > this.y2 && (this.y2 = e));
        }
        addX(t) {
          this.addPoint(t, null);
        }
        addY(t) {
          this.addPoint(null, t);
        }
        addBoundingBox(t) {
          if (t) {
            var { x1: e, y1: r, x2: i, y2: n } = t;
            this.addPoint(e, r), this.addPoint(i, n);
          }
        }
        sumCubic(t, e, r, i, n) {
          return (
            Math.pow(1 - t, 3) * e +
            3 * Math.pow(1 - t, 2) * t * r +
            3 * (1 - t) * Math.pow(t, 2) * i +
            Math.pow(t, 3) * n
          );
        }
        bezierCurveAdd(t, e, r, i, n) {
          var s = 6 * e - 12 * r + 6 * i,
            a = -3 * e + 9 * r - 9 * i + 3 * n,
            o = 3 * r - 3 * e;
          if (0 !== a) {
            var h = Math.pow(s, 2) - 4 * o * a;
            if (!(h < 0)) {
              var u = (-s + Math.sqrt(h)) / (2 * a);
              0 < u &&
                u < 1 &&
                (t
                  ? this.addX(this.sumCubic(u, e, r, i, n))
                  : this.addY(this.sumCubic(u, e, r, i, n)));
              var l = (-s - Math.sqrt(h)) / (2 * a);
              0 < l &&
                l < 1 &&
                (t
                  ? this.addX(this.sumCubic(l, e, r, i, n))
                  : this.addY(this.sumCubic(l, e, r, i, n)));
            }
          } else {
            if (0 === s) return;
            var c = -o / s;
            0 < c &&
              c < 1 &&
              (t
                ? this.addX(this.sumCubic(c, e, r, i, n))
                : this.addY(this.sumCubic(c, e, r, i, n)));
          }
        }
        addBezierCurve(t, e, r, i, n, s, a, o) {
          this.addPoint(t, e),
            this.addPoint(a, o),
            this.bezierCurveAdd(!0, t, r, n, a),
            this.bezierCurveAdd(!1, e, i, s, o);
        }
        addQuadraticCurve(t, e, r, i, n, s) {
          var a = t + (2 / 3) * (r - t),
            o = e + (2 / 3) * (i - e),
            h = a + (1 / 3) * (n - t),
            u = o + (1 / 3) * (s - e);
          this.addBezierCurve(t, e, a, h, o, u, n, s);
        }
        isPointInBox(t, e) {
          var { x1: r, y1: i, x2: n, y2: s } = this;
          return r <= t && t <= n && i <= e && e <= s;
        }
      }
      class Lt extends E {
        constructor(t) {
          super(
            t
              .replace(/([+\-.])\s+/gm, "$1")
              .replace(/[^MmZzLlHhVvCcSsQqTtAae\d\s.,+-].*/g, "")
          ),
            (this.control = null),
            (this.start = null),
            (this.current = null),
            (this.command = null),
            (this.commands = this.commands),
            (this.i = -1),
            (this.previousCommand = null),
            (this.points = []),
            (this.angles = []);
        }
        reset() {
          (this.i = -1),
            (this.command = null),
            (this.previousCommand = null),
            (this.start = new pt(0, 0)),
            (this.control = new pt(0, 0)),
            (this.current = new pt(0, 0)),
            (this.points = []),
            (this.angles = []);
        }
        isEnd() {
          var { i: t, commands: e } = this;
          return t >= e.length - 1;
        }
        next() {
          var t = this.commands[++this.i];
          return (this.previousCommand = this.command), (this.command = t), t;
        }
        getPoint() {
          var t =
              arguments.length > 0 && void 0 !== arguments[0]
                ? arguments[0]
                : "x",
            e =
              arguments.length > 1 && void 0 !== arguments[1]
                ? arguments[1]
                : "y",
            r = new pt(this.command[t], this.command[e]);
          return this.makeAbsolute(r);
        }
        getAsControlPoint(t, e) {
          var r = this.getPoint(t, e);
          return (this.control = r), r;
        }
        getAsCurrentPoint(t, e) {
          var r = this.getPoint(t, e);
          return (this.current = r), r;
        }
        getReflectedControlPoint() {
          var t = this.previousCommand.type;
          if (
            t !== E.CURVE_TO &&
            t !== E.SMOOTH_CURVE_TO &&
            t !== E.QUAD_TO &&
            t !== E.SMOOTH_QUAD_TO
          )
            return this.current;
          var {
            current: { x: e, y: r },
            control: { x: i, y: n },
          } = this;
          return new pt(2 * e - i, 2 * r - n);
        }
        makeAbsolute(t) {
          if (this.command.relative) {
            var { x: e, y: r } = this.current;
            (t.x += e), (t.y += r);
          }
          return t;
        }
        addMarker(t, e, r) {
          var { points: i, angles: n } = this;
          r &&
            n.length > 0 &&
            !n[n.length - 1] &&
            (n[n.length - 1] = i[i.length - 1].angleTo(r)),
            this.addMarkerAngle(t, e ? e.angleTo(t) : null);
        }
        addMarkerAngle(t, e) {
          this.points.push(t), this.angles.push(e);
        }
        getMarkerPoints() {
          return this.points;
        }
        getMarkerAngles() {
          for (var { angles: t } = this, e = t.length, r = 0; r < e; r++)
            if (!t[r])
              for (var i = r + 1; i < e; i++)
                if (t[i]) {
                  t[r] = t[i];
                  break;
                }
          return t;
        }
      }
      class Dt extends Mt {
        constructor() {
          super(...arguments), (this.modifiedEmSizeStack = !1);
        }
        calculateOpacity() {
          for (var t = 1, e = this; e; ) {
            var r = e.getStyle("opacity", !1, !0);
            r.hasValue(!0) && (t *= r.getNumber()), (e = e.parent);
          }
          return t;
        }
        setContext(t) {
          var e =
            arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
          if (!e) {
            var r = this.getStyle("fill"),
              i = this.getStyle("fill-opacity"),
              n = this.getStyle("stroke"),
              s = this.getStyle("stroke-opacity");
            if (r.isUrlDefinition()) {
              var a = r.getFillStyleDefinition(this, i);
              a && (t.fillStyle = a);
            } else if (r.hasValue()) {
              "currentColor" === r.getString() &&
                r.setValue(this.getStyle("color").getColor());
              var o = r.getColor();
              "inherit" !== o &&
                (t.fillStyle = "none" === o ? "rgba(0,0,0,0)" : o);
            }
            if (i.hasValue()) {
              var h = new ct(this.document, "fill", t.fillStyle)
                .addOpacity(i)
                .getColor();
              t.fillStyle = h;
            }
            if (n.isUrlDefinition()) {
              var u = n.getFillStyleDefinition(this, s);
              u && (t.strokeStyle = u);
            } else if (n.hasValue()) {
              "currentColor" === n.getString() &&
                n.setValue(this.getStyle("color").getColor());
              var l = n.getString();
              "inherit" !== l &&
                (t.strokeStyle = "none" === l ? "rgba(0,0,0,0)" : l);
            }
            if (s.hasValue()) {
              var c = new ct(this.document, "stroke", t.strokeStyle)
                .addOpacity(s)
                .getString();
              t.strokeStyle = c;
            }
            var g = this.getStyle("stroke-width");
            if (g.hasValue()) {
              var p = g.getPixels();
              t.lineWidth = p || tt;
            }
            var f = this.getStyle("stroke-linecap"),
              d = this.getStyle("stroke-linejoin"),
              y = this.getStyle("stroke-miterlimit"),
              v = this.getStyle("stroke-dasharray"),
              m = this.getStyle("stroke-dashoffset");
            if (
              (f.hasValue() && (t.lineCap = f.getString()),
              d.hasValue() && (t.lineJoin = d.getString()),
              y.hasValue() && (t.miterLimit = y.getNumber()),
              v.hasValue() && "none" !== v.getString())
            ) {
              var x = F(v.getString());
              "undefined" !== typeof t.setLineDash
                ? t.setLineDash(x)
                : "undefined" !== typeof t.webkitLineDash
                  ? (t.webkitLineDash = x)
                  : "undefined" === typeof t.mozDash ||
                    (1 === x.length && 0 === x[0]) ||
                    (t.mozDash = x);
              var b = m.getPixels();
              "undefined" !== typeof t.lineDashOffset
                ? (t.lineDashOffset = b)
                : "undefined" !== typeof t.webkitLineDashOffset
                  ? (t.webkitLineDashOffset = b)
                  : "undefined" !== typeof t.mozDashOffset &&
                    (t.mozDashOffset = b);
            }
          }
          if (
            ((this.modifiedEmSizeStack = !1), "undefined" !== typeof t.font)
          ) {
            var S = this.getStyle("font"),
              w = this.getStyle("font-style"),
              T = this.getStyle("font-variant"),
              A = this.getStyle("font-weight"),
              O = this.getStyle("font-size"),
              C = this.getStyle("font-family"),
              P = new kt(
                w.getString(),
                T.getString(),
                A.getString(),
                O.hasValue() ? "".concat(O.getPixels(!0), "px") : "",
                C.getString(),
                kt.parse(S.getString(), t.font)
              );
            w.setValue(P.fontStyle),
              T.setValue(P.fontVariant),
              A.setValue(P.fontWeight),
              O.setValue(P.fontSize),
              C.setValue(P.fontFamily),
              (t.font = P.toString()),
              O.isPixels() &&
                ((this.document.emSize = O.getPixels()),
                (this.modifiedEmSizeStack = !0));
          }
          e ||
            (this.applyEffects(t), (t.globalAlpha = this.calculateOpacity()));
        }
        clearContext(t) {
          super.clearContext(t),
            this.modifiedEmSizeStack && this.document.popEmSize();
        }
      }
      class Bt extends Dt {
        constructor(t, e, r) {
          super(t, e, r),
            (this.type = "path"),
            (this.pathParser = null),
            (this.pathParser = new Lt(this.getAttribute("d").getString()));
        }
        path(t) {
          var { pathParser: e } = this,
            r = new It();
          for (e.reset(), t && t.beginPath(); !e.isEnd(); )
            switch (e.next().type) {
              case Lt.MOVE_TO:
                this.pathM(t, r);
                break;
              case Lt.LINE_TO:
                this.pathL(t, r);
                break;
              case Lt.HORIZ_LINE_TO:
                this.pathH(t, r);
                break;
              case Lt.VERT_LINE_TO:
                this.pathV(t, r);
                break;
              case Lt.CURVE_TO:
                this.pathC(t, r);
                break;
              case Lt.SMOOTH_CURVE_TO:
                this.pathS(t, r);
                break;
              case Lt.QUAD_TO:
                this.pathQ(t, r);
                break;
              case Lt.SMOOTH_QUAD_TO:
                this.pathT(t, r);
                break;
              case Lt.ARC:
                this.pathA(t, r);
                break;
              case Lt.CLOSE_PATH:
                this.pathZ(t, r);
            }
          return r;
        }
        getBoundingBox(t) {
          return this.path();
        }
        getMarkers() {
          var { pathParser: t } = this,
            e = t.getMarkerPoints(),
            r = t.getMarkerAngles(),
            i = e.map((t, e) => [t, r[e]]);
          return i;
        }
        renderChildren(t) {
          this.path(t), this.document.screen.mouse.checkPath(this, t);
          var e = this.getStyle("fill-rule");
          "" !== t.fillStyle &&
            ("inherit" !== e.getString("inherit")
              ? t.fill(e.getString())
              : t.fill()),
            "" !== t.strokeStyle &&
              ("non-scaling-stroke" ===
              this.getAttribute("vector-effect").getString()
                ? (t.save(),
                  t.setTransform(1, 0, 0, 1, 0, 0),
                  t.stroke(),
                  t.restore())
                : t.stroke());
          var r = this.getMarkers();
          if (r) {
            var i = r.length - 1,
              n = this.getStyle("marker-start"),
              s = this.getStyle("marker-mid"),
              a = this.getStyle("marker-end");
            if (n.isUrlDefinition()) {
              var o = n.getDefinition(),
                [h, u] = r[0];
              o.render(t, h, u);
            }
            if (s.isUrlDefinition())
              for (var l = s.getDefinition(), c = 1; c < i; c++) {
                var [g, p] = r[c];
                l.render(t, g, p);
              }
            if (a.isUrlDefinition()) {
              var f = a.getDefinition(),
                [d, y] = r[i];
              f.render(t, d, y);
            }
          }
        }
        static pathM(t) {
          var e = t.getAsCurrentPoint();
          return (t.start = t.current), { point: e };
        }
        pathM(t, e) {
          var { pathParser: r } = this,
            { point: i } = Bt.pathM(r),
            { x: n, y: s } = i;
          r.addMarker(i), e.addPoint(n, s), t && t.moveTo(n, s);
        }
        static pathL(t) {
          var { current: e } = t;
          return { current: e, point: t.getAsCurrentPoint() };
        }
        pathL(t, e) {
          var { pathParser: r } = this,
            { current: i, point: n } = Bt.pathL(r),
            { x: s, y: a } = n;
          r.addMarker(n, i), e.addPoint(s, a), t && t.lineTo(s, a);
        }
        static pathH(t) {
          var { current: e, command: r } = t,
            i = new pt((r.relative ? e.x : 0) + r.x, e.y);
          return (t.current = i), { current: e, point: i };
        }
        pathH(t, e) {
          var { pathParser: r } = this,
            { current: i, point: n } = Bt.pathH(r),
            { x: s, y: a } = n;
          r.addMarker(n, i), e.addPoint(s, a), t && t.lineTo(s, a);
        }
        static pathV(t) {
          var { current: e, command: r } = t,
            i = new pt(e.x, (r.relative ? e.y : 0) + r.y);
          return (t.current = i), { current: e, point: i };
        }
        pathV(t, e) {
          var { pathParser: r } = this,
            { current: i, point: n } = Bt.pathV(r),
            { x: s, y: a } = n;
          r.addMarker(n, i), e.addPoint(s, a), t && t.lineTo(s, a);
        }
        static pathC(t) {
          var { current: e } = t;
          return {
            current: e,
            point: t.getPoint("x1", "y1"),
            controlPoint: t.getAsControlPoint("x2", "y2"),
            currentPoint: t.getAsCurrentPoint(),
          };
        }
        pathC(t, e) {
          var { pathParser: r } = this,
            {
              current: i,
              point: n,
              controlPoint: s,
              currentPoint: a,
            } = Bt.pathC(r);
          r.addMarker(a, s, n),
            e.addBezierCurve(i.x, i.y, n.x, n.y, s.x, s.y, a.x, a.y),
            t && t.bezierCurveTo(n.x, n.y, s.x, s.y, a.x, a.y);
        }
        static pathS(t) {
          var { current: e } = t;
          return {
            current: e,
            point: t.getReflectedControlPoint(),
            controlPoint: t.getAsControlPoint("x2", "y2"),
            currentPoint: t.getAsCurrentPoint(),
          };
        }
        pathS(t, e) {
          var { pathParser: r } = this,
            {
              current: i,
              point: n,
              controlPoint: s,
              currentPoint: a,
            } = Bt.pathS(r);
          r.addMarker(a, s, n),
            e.addBezierCurve(i.x, i.y, n.x, n.y, s.x, s.y, a.x, a.y),
            t && t.bezierCurveTo(n.x, n.y, s.x, s.y, a.x, a.y);
        }
        static pathQ(t) {
          var { current: e } = t;
          return {
            current: e,
            controlPoint: t.getAsControlPoint("x1", "y1"),
            currentPoint: t.getAsCurrentPoint(),
          };
        }
        pathQ(t, e) {
          var { pathParser: r } = this,
            { current: i, controlPoint: n, currentPoint: s } = Bt.pathQ(r);
          r.addMarker(s, n, n),
            e.addQuadraticCurve(i.x, i.y, n.x, n.y, s.x, s.y),
            t && t.quadraticCurveTo(n.x, n.y, s.x, s.y);
        }
        static pathT(t) {
          var { current: e } = t,
            r = t.getReflectedControlPoint();
          return (
            (t.control = r),
            { current: e, controlPoint: r, currentPoint: t.getAsCurrentPoint() }
          );
        }
        pathT(t, e) {
          var { pathParser: r } = this,
            { current: i, controlPoint: n, currentPoint: s } = Bt.pathT(r);
          r.addMarker(s, n, n),
            e.addQuadraticCurve(i.x, i.y, n.x, n.y, s.x, s.y),
            t && t.quadraticCurveTo(n.x, n.y, s.x, s.y);
        }
        static pathA(t) {
          var { current: e, command: r } = t,
            { rX: i, rY: n, xRot: s, lArcFlag: a, sweepFlag: o } = r,
            h = s * (Math.PI / 180),
            u = t.getAsCurrentPoint(),
            l = new pt(
              (Math.cos(h) * (e.x - u.x)) / 2 + (Math.sin(h) * (e.y - u.y)) / 2,
              (-Math.sin(h) * (e.x - u.x)) / 2 + (Math.cos(h) * (e.y - u.y)) / 2
            ),
            c =
              Math.pow(l.x, 2) / Math.pow(i, 2) +
              Math.pow(l.y, 2) / Math.pow(n, 2);
          c > 1 && ((i *= Math.sqrt(c)), (n *= Math.sqrt(c)));
          var g =
            (a === o ? -1 : 1) *
            Math.sqrt(
              (Math.pow(i, 2) * Math.pow(n, 2) -
                Math.pow(i, 2) * Math.pow(l.y, 2) -
                Math.pow(n, 2) * Math.pow(l.x, 2)) /
                (Math.pow(i, 2) * Math.pow(l.y, 2) +
                  Math.pow(n, 2) * Math.pow(l.x, 2))
            );
          isNaN(g) && (g = 0);
          var p = new pt((g * i * l.y) / n, (g * -n * l.x) / i),
            f = new pt(
              (e.x + u.x) / 2 + Math.cos(h) * p.x - Math.sin(h) * p.y,
              (e.y + u.y) / 2 + Math.sin(h) * p.x + Math.cos(h) * p.y
            ),
            d = it([1, 0], [(l.x - p.x) / i, (l.y - p.y) / n]),
            y = [(l.x - p.x) / i, (l.y - p.y) / n],
            v = [(-l.x - p.x) / i, (-l.y - p.y) / n],
            m = it(y, v);
          return (
            rt(y, v) <= -1 && (m = Math.PI),
            rt(y, v) >= 1 && (m = 0),
            {
              currentPoint: u,
              rX: i,
              rY: n,
              sweepFlag: o,
              xAxisRotation: h,
              centp: f,
              a1: d,
              ad: m,
            }
          );
        }
        pathA(t, e) {
          var { pathParser: r } = this,
            {
              currentPoint: i,
              rX: n,
              rY: s,
              sweepFlag: a,
              xAxisRotation: o,
              centp: h,
              a1: u,
              ad: l,
            } = Bt.pathA(r),
            c = 1 - a ? 1 : -1,
            g = u + c * (l / 2),
            p = new pt(h.x + n * Math.cos(g), h.y + s * Math.sin(g));
          if (
            (r.addMarkerAngle(p, g - (c * Math.PI) / 2),
            r.addMarkerAngle(i, g - c * Math.PI),
            e.addPoint(i.x, i.y),
            t && !isNaN(u) && !isNaN(l))
          ) {
            var f = n > s ? n : s,
              d = n > s ? 1 : n / s,
              y = n > s ? s / n : 1;
            t.translate(h.x, h.y),
              t.rotate(o),
              t.scale(d, y),
              t.arc(0, 0, f, u, u + l, Boolean(1 - a)),
              t.scale(1 / d, 1 / y),
              t.rotate(-o),
              t.translate(-h.x, -h.y);
          }
        }
        static pathZ(t) {
          t.current = t.start;
        }
        pathZ(t, e) {
          Bt.pathZ(this.pathParser),
            t && e.x1 !== e.x2 && e.y1 !== e.y2 && t.closePath();
        }
      }
      class zt extends Bt {
        constructor(t, e, r) {
          super(t, e, r),
            (this.type = "glyph"),
            (this.horizAdvX = this.getAttribute("horiz-adv-x").getNumber()),
            (this.unicode = this.getAttribute("unicode").getString()),
            (this.arabicForm = this.getAttribute("arabic-form").getString());
        }
      }
      class Ft extends Dt {
        constructor(t, e, r) {
          super(t, e, new.target === Ft || r),
            (this.type = "text"),
            (this.x = 0),
            (this.y = 0),
            (this.measureCache = -1);
        }
        setContext(t) {
          var e =
            arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
          super.setContext(t, e);
          var r =
            this.getStyle("dominant-baseline").getTextBaseline() ||
            this.getStyle("alignment-baseline").getTextBaseline();
          r && (t.textBaseline = r);
        }
        initializeCoordinates() {
          (this.x = 0),
            (this.y = 0),
            (this.leafTexts = []),
            (this.textChunkStart = 0),
            (this.minX = Number.POSITIVE_INFINITY),
            (this.maxX = Number.NEGATIVE_INFINITY);
        }
        getBoundingBox(t) {
          if ("text" !== this.type) return this.getTElementBoundingBox(t);
          this.initializeCoordinates(), this.adjustChildCoordinatesRecursive(t);
          var e = null;
          return (
            this.children.forEach((r, i) => {
              var n = this.getChildBoundingBox(t, this, this, i);
              e ? e.addBoundingBox(n) : (e = n);
            }),
            e
          );
        }
        getFontSize() {
          var { document: t, parent: e } = this,
            r = kt.parse(t.ctx.font).fontSize;
          return e.getStyle("font-size").getNumber(r);
        }
        getTElementBoundingBox(t) {
          var e = this.getFontSize();
          return new It(
            this.x,
            this.y - e,
            this.x + this.measureText(t),
            this.y
          );
        }
        getGlyph(t, e, r) {
          var i = e[r],
            n = null;
          if (t.isArabic) {
            var s = e.length,
              a = e[r - 1],
              o = e[r + 1],
              h = "isolated";
            if (
              ((0 === r || " " === a) &&
                r < s - 1 &&
                " " !== o &&
                (h = "terminal"),
              r > 0 && " " !== a && r < s - 1 && " " !== o && (h = "medial"),
              r > 0 &&
                " " !== a &&
                (r === s - 1 || " " === o) &&
                (h = "initial"),
              "undefined" !== typeof t.glyphs[i])
            ) {
              var u = t.glyphs[i];
              n = u instanceof zt ? u : u[h];
            }
          } else n = t.glyphs[i];
          return n || (n = t.missingGlyph), n;
        }
        getText() {
          return "";
        }
        getTextFromNode(t) {
          var e = t || this.node,
            r = Array.from(e.parentNode.childNodes),
            i = r.indexOf(e),
            n = r.length - 1,
            s = D(e.textContent || "");
          return 0 === i && (s = B(s)), i === n && (s = z(s)), s;
        }
        renderChildren(t) {
          if ("text" === this.type) {
            this.initializeCoordinates(),
              this.adjustChildCoordinatesRecursive(t),
              this.children.forEach((e, r) => {
                this.renderChild(t, this, this, r);
              });
            var { mouse: e } = this.document.screen;
            e.isWorking() && e.checkBoundingBox(this, this.getBoundingBox(t));
          } else this.renderTElementChildren(t);
        }
        renderTElementChildren(t) {
          var { document: e, parent: r } = this,
            i = this.getText(),
            n = r.getStyle("font-family").getDefinition();
          if (n)
            for (
              var { unitsPerEm: s } = n.fontFace,
                a = kt.parse(e.ctx.font),
                o = r.getStyle("font-size").getNumber(a.fontSize),
                h = r.getStyle("font-style").getString(a.fontStyle),
                u = o / s,
                l = n.isRTL ? i.split("").reverse().join("") : i,
                c = F(r.getAttribute("dx").getString()),
                g = l.length,
                p = 0;
              p < g;
              p++
            ) {
              var f = this.getGlyph(n, l, p);
              t.translate(this.x, this.y), t.scale(u, -u);
              var d = t.lineWidth;
              (t.lineWidth = (t.lineWidth * s) / o),
                "italic" === h && t.transform(1, 0, 0.4, 1, 0, 0),
                f.render(t),
                "italic" === h && t.transform(1, 0, -0.4, 1, 0, 0),
                (t.lineWidth = d),
                t.scale(1 / u, -1 / u),
                t.translate(-this.x, -this.y),
                (this.x += (o * (f.horizAdvX || n.horizAdvX)) / s),
                "undefined" === typeof c[p] || isNaN(c[p]) || (this.x += c[p]);
            }
          else {
            var { x: y, y: v } = this;
            t.fillStyle && t.fillText(i, y, v),
              t.strokeStyle && t.strokeText(i, y, v);
          }
        }
        applyAnchoring() {
          if (!(this.textChunkStart >= this.leafTexts.length)) {
            var t = this.leafTexts[this.textChunkStart],
              e = t.getStyle("text-anchor").getString("start"),
              r = 0;
            r =
              "start" === e
                ? t.x - this.minX
                : "end" === e
                  ? t.x - this.maxX
                  : t.x - (this.minX + this.maxX) / 2;
            for (var i = this.textChunkStart; i < this.leafTexts.length; i++)
              this.leafTexts[i].x += r;
            (this.minX = Number.POSITIVE_INFINITY),
              (this.maxX = Number.NEGATIVE_INFINITY),
              (this.textChunkStart = this.leafTexts.length);
          }
        }
        adjustChildCoordinatesRecursive(t) {
          this.children.forEach((e, r) => {
            this.adjustChildCoordinatesRecursiveCore(t, this, this, r);
          }),
            this.applyAnchoring();
        }
        adjustChildCoordinatesRecursiveCore(t, e, r, i) {
          var n = r.children[i];
          n.children.length > 0
            ? n.children.forEach((r, i) => {
                e.adjustChildCoordinatesRecursiveCore(t, e, n, i);
              })
            : this.adjustChildCoordinates(t, e, r, i);
        }
        adjustChildCoordinates(t, e, r, i) {
          var n = r.children[i];
          if ("function" !== typeof n.measureText) return n;
          t.save(), n.setContext(t, !0);
          var s = n.getAttribute("x"),
            a = n.getAttribute("y"),
            o = n.getAttribute("dx"),
            h = n.getAttribute("dy"),
            u = n.getStyle("font-family").getDefinition(),
            l = Boolean(u) && u.isRTL;
          0 === i &&
            (s.hasValue() || s.setValue(n.getInheritedAttribute("x")),
            a.hasValue() || a.setValue(n.getInheritedAttribute("y")),
            o.hasValue() || o.setValue(n.getInheritedAttribute("dx")),
            h.hasValue() || h.setValue(n.getInheritedAttribute("dy")));
          var c = n.measureText(t);
          return (
            l && (e.x -= c),
            s.hasValue()
              ? (e.applyAnchoring(),
                (n.x = s.getPixels("x")),
                o.hasValue() && (n.x += o.getPixels("x")))
              : (o.hasValue() && (e.x += o.getPixels("x")), (n.x = e.x)),
            (e.x = n.x),
            l || (e.x += c),
            a.hasValue()
              ? ((n.y = a.getPixels("y")),
                h.hasValue() && (n.y += h.getPixels("y")))
              : (h.hasValue() && (e.y += h.getPixels("y")), (n.y = e.y)),
            (e.y = n.y),
            e.leafTexts.push(n),
            (e.minX = Math.min(e.minX, n.x, n.x + c)),
            (e.maxX = Math.max(e.maxX, n.x, n.x + c)),
            n.clearContext(t),
            t.restore(),
            n
          );
        }
        getChildBoundingBox(t, e, r, i) {
          var n = r.children[i];
          if ("function" !== typeof n.getBoundingBox) return null;
          var s = n.getBoundingBox(t);
          return s
            ? (n.children.forEach((r, i) => {
                var a = e.getChildBoundingBox(t, e, n, i);
                s.addBoundingBox(a);
              }),
              s)
            : null;
        }
        renderChild(t, e, r, i) {
          var n = r.children[i];
          n.render(t),
            n.children.forEach((r, i) => {
              e.renderChild(t, e, n, i);
            });
        }
        measureText(t) {
          var { measureCache: e } = this;
          if (~e) return e;
          var r = this.getText(),
            i = this.measureTargetText(t, r);
          return (this.measureCache = i), i;
        }
        measureTargetText(t, e) {
          if (!e.length) return 0;
          var { parent: r } = this,
            i = r.getStyle("font-family").getDefinition();
          if (i) {
            for (
              var n = this.getFontSize(),
                s = i.isRTL ? e.split("").reverse().join("") : e,
                a = F(r.getAttribute("dx").getString()),
                o = s.length,
                h = 0,
                u = 0;
              u < o;
              u++
            ) {
              (h +=
                ((this.getGlyph(i, s, u).horizAdvX || i.horizAdvX) * n) /
                i.fontFace.unitsPerEm),
                "undefined" === typeof a[u] || isNaN(a[u]) || (h += a[u]);
            }
            return h;
          }
          if (!t.measureText) return 10 * e.length;
          t.save(), this.setContext(t, !0);
          var { width: l } = t.measureText(e);
          return this.clearContext(t), t.restore(), l;
        }
        getInheritedAttribute(t) {
          for (var e = this; e instanceof Ft && e.isFirstChild(); ) {
            var r = e.parent.getAttribute(t);
            if (r.hasValue(!0)) return r.getValue("0");
            e = e.parent;
          }
          return null;
        }
      }
      class jt extends Ft {
        constructor(t, e, r) {
          super(t, e, new.target === jt || r),
            (this.type = "tspan"),
            (this.text =
              this.children.length > 0 ? "" : this.getTextFromNode());
        }
        getText() {
          return this.text;
        }
      }
      class Ht extends jt {
        constructor() {
          super(...arguments), (this.type = "textNode");
        }
      }
      class Ut extends Dt {
        constructor() {
          super(...arguments), (this.type = "svg"), (this.root = !1);
        }
        setContext(t) {
          var e,
            { document: r } = this,
            { screen: i, window: n } = r,
            s = t.canvas;
          if (
            (i.setDefaults(t),
            s.style &&
              "undefined" !== typeof t.font &&
              n &&
              "undefined" !== typeof n.getComputedStyle)
          ) {
            t.font = n.getComputedStyle(s).getPropertyValue("font");
            var a = new ct(r, "fontSize", kt.parse(t.font).fontSize);
            a.hasValue() &&
              ((r.rootEmSize = a.getPixels("y")), (r.emSize = r.rootEmSize));
          }
          this.getAttribute("x").hasValue() ||
            this.getAttribute("x", !0).setValue(0),
            this.getAttribute("y").hasValue() ||
              this.getAttribute("y", !0).setValue(0);
          var { width: o, height: h } = i.viewPort;
          this.getStyle("width").hasValue() ||
            this.getStyle("width", !0).setValue("100%"),
            this.getStyle("height").hasValue() ||
              this.getStyle("height", !0).setValue("100%"),
            this.getStyle("color").hasValue() ||
              this.getStyle("color", !0).setValue("black");
          var u = this.getAttribute("refX"),
            l = this.getAttribute("refY"),
            c = this.getAttribute("viewBox"),
            g = c.hasValue() ? F(c.getString()) : null,
            p =
              !this.root &&
              "visible" !== this.getStyle("overflow").getValue("hidden"),
            f = 0,
            d = 0,
            y = 0,
            v = 0;
          g && ((f = g[0]), (d = g[1])),
            this.root ||
              ((o = this.getStyle("width").getPixels("x")),
              (h = this.getStyle("height").getPixels("y")),
              "marker" === this.type && ((y = f), (v = d), (f = 0), (d = 0))),
            i.viewPort.setCurrent(o, h),
            !this.node ||
              (this.parent &&
                "foreignObject" !==
                  (null === (e = this.node.parentNode) || void 0 === e
                    ? void 0
                    : e.nodeName)) ||
              !this.getStyle("transform", !1, !0).hasValue() ||
              this.getStyle("transform-origin", !1, !0).hasValue() ||
              this.getStyle("transform-origin", !0, !0).setValue("50% 50%"),
            super.setContext(t),
            t.translate(
              this.getAttribute("x").getPixels("x"),
              this.getAttribute("y").getPixels("y")
            ),
            g && ((o = g[2]), (h = g[3])),
            r.setViewBox({
              ctx: t,
              aspectRatio: this.getAttribute("preserveAspectRatio").getString(),
              width: i.viewPort.width,
              desiredWidth: o,
              height: i.viewPort.height,
              desiredHeight: h,
              minX: f,
              minY: d,
              refX: u.getValue(),
              refY: l.getValue(),
              clip: p,
              clipX: y,
              clipY: v,
            }),
            g && (i.viewPort.removeCurrent(), i.viewPort.setCurrent(o, h));
        }
        clearContext(t) {
          super.clearContext(t), this.document.screen.viewPort.removeCurrent();
        }
        resize(t) {
          var e =
              arguments.length > 1 && void 0 !== arguments[1]
                ? arguments[1]
                : t,
            r = arguments.length > 2 && void 0 !== arguments[2] && arguments[2],
            i = this.getAttribute("width", !0),
            n = this.getAttribute("height", !0),
            s = this.getAttribute("viewBox"),
            a = this.getAttribute("style"),
            o = i.getNumber(0),
            h = n.getNumber(0);
          if (r)
            if ("string" === typeof r)
              this.getAttribute("preserveAspectRatio", !0).setValue(r);
            else {
              var u = this.getAttribute("preserveAspectRatio");
              u.hasValue() &&
                u.setValue(u.getString().replace(/^\s*(\S.*\S)\s*$/, "$1"));
            }
          if (
            (i.setValue(t),
            n.setValue(e),
            s.hasValue() ||
              s.setValue("0 0 ".concat(o || t, " ").concat(h || e)),
            a.hasValue())
          ) {
            var l = this.getStyle("width"),
              c = this.getStyle("height");
            l.hasValue() && l.setValue("".concat(t, "px")),
              c.hasValue() && c.setValue("".concat(e, "px"));
          }
        }
      }
      class Xt extends Bt {
        constructor() {
          super(...arguments), (this.type = "rect");
        }
        path(t) {
          var e = this.getAttribute("x").getPixels("x"),
            r = this.getAttribute("y").getPixels("y"),
            i = this.getStyle("width", !1, !0).getPixels("x"),
            n = this.getStyle("height", !1, !0).getPixels("y"),
            s = this.getAttribute("rx"),
            a = this.getAttribute("ry"),
            o = s.getPixels("x"),
            h = a.getPixels("y");
          if (
            (s.hasValue() && !a.hasValue() && (h = o),
            a.hasValue() && !s.hasValue() && (o = h),
            (o = Math.min(o, i / 2)),
            (h = Math.min(h, n / 2)),
            t)
          ) {
            var u = ((Math.sqrt(2) - 1) / 3) * 4;
            t.beginPath(),
              n > 0 &&
                i > 0 &&
                (t.moveTo(e + o, r),
                t.lineTo(e + i - o, r),
                t.bezierCurveTo(
                  e + i - o + u * o,
                  r,
                  e + i,
                  r + h - u * h,
                  e + i,
                  r + h
                ),
                t.lineTo(e + i, r + n - h),
                t.bezierCurveTo(
                  e + i,
                  r + n - h + u * h,
                  e + i - o + u * o,
                  r + n,
                  e + i - o,
                  r + n
                ),
                t.lineTo(e + o, r + n),
                t.bezierCurveTo(
                  e + o - u * o,
                  r + n,
                  e,
                  r + n - h + u * h,
                  e,
                  r + n - h
                ),
                t.lineTo(e, r + h),
                t.bezierCurveTo(e, r + h - u * h, e + o - u * o, r, e + o, r),
                t.closePath());
          }
          return new It(e, r, e + i, r + n);
        }
        getMarkers() {
          return null;
        }
      }
      class Yt extends Bt {
        constructor() {
          super(...arguments), (this.type = "circle");
        }
        path(t) {
          var e = this.getAttribute("cx").getPixels("x"),
            r = this.getAttribute("cy").getPixels("y"),
            i = this.getAttribute("r").getPixels();
          return (
            t &&
              i > 0 &&
              (t.beginPath(),
              t.arc(e, r, i, 0, 2 * Math.PI, !1),
              t.closePath()),
            new It(e - i, r - i, e + i, r + i)
          );
        }
        getMarkers() {
          return null;
        }
      }
      class qt extends Bt {
        constructor() {
          super(...arguments), (this.type = "ellipse");
        }
        path(t) {
          var e = ((Math.sqrt(2) - 1) / 3) * 4,
            r = this.getAttribute("rx").getPixels("x"),
            i = this.getAttribute("ry").getPixels("y"),
            n = this.getAttribute("cx").getPixels("x"),
            s = this.getAttribute("cy").getPixels("y");
          return (
            t &&
              r > 0 &&
              i > 0 &&
              (t.beginPath(),
              t.moveTo(n + r, s),
              t.bezierCurveTo(n + r, s + e * i, n + e * r, s + i, n, s + i),
              t.bezierCurveTo(n - e * r, s + i, n - r, s + e * i, n - r, s),
              t.bezierCurveTo(n - r, s - e * i, n - e * r, s - i, n, s - i),
              t.bezierCurveTo(n + e * r, s - i, n + r, s - e * i, n + r, s),
              t.closePath()),
            new It(n - r, s - i, n + r, s + i)
          );
        }
        getMarkers() {
          return null;
        }
      }
      class Gt extends Bt {
        constructor() {
          super(...arguments), (this.type = "line");
        }
        getPoints() {
          return [
            new pt(
              this.getAttribute("x1").getPixels("x"),
              this.getAttribute("y1").getPixels("y")
            ),
            new pt(
              this.getAttribute("x2").getPixels("x"),
              this.getAttribute("y2").getPixels("y")
            ),
          ];
        }
        path(t) {
          var [{ x: e, y: r }, { x: i, y: n }] = this.getPoints();
          return (
            t && (t.beginPath(), t.moveTo(e, r), t.lineTo(i, n)),
            new It(e, r, i, n)
          );
        }
        getMarkers() {
          var [t, e] = this.getPoints(),
            r = t.angleTo(e);
          return [
            [t, r],
            [e, r],
          ];
        }
      }
      class Wt extends Bt {
        constructor(t, e, r) {
          super(t, e, r),
            (this.type = "polyline"),
            (this.points = []),
            (this.points = pt.parsePath(
              this.getAttribute("points").getString()
            ));
        }
        path(t) {
          var { points: e } = this,
            [{ x: r, y: i }] = e,
            n = new It(r, i);
          return (
            t && (t.beginPath(), t.moveTo(r, i)),
            e.forEach((e) => {
              var { x: r, y: i } = e;
              n.addPoint(r, i), t && t.lineTo(r, i);
            }),
            n
          );
        }
        getMarkers() {
          var { points: t } = this,
            e = t.length - 1,
            r = [];
          return (
            t.forEach((i, n) => {
              n !== e && r.push([i, i.angleTo(t[n + 1])]);
            }),
            r.length > 0 && r.push([t[t.length - 1], r[r.length - 1][1]]),
            r
          );
        }
      }
      class Qt extends Wt {
        constructor() {
          super(...arguments), (this.type = "polygon");
        }
        path(t) {
          var e = super.path(t),
            [{ x: r, y: i }] = this.points;
          return t && (t.lineTo(r, i), t.closePath()), e;
        }
      }
      class $t extends Mt {
        constructor() {
          super(...arguments), (this.type = "pattern");
        }
        createPattern(t, e, r) {
          var i = this.getStyle("width").getPixels("x", !0),
            n = this.getStyle("height").getPixels("y", !0),
            s = new Ut(this.document, null);
          (s.attributes.viewBox = new ct(
            this.document,
            "viewBox",
            this.getAttribute("viewBox").getValue()
          )),
            (s.attributes.width = new ct(
              this.document,
              "width",
              "".concat(i, "px")
            )),
            (s.attributes.height = new ct(
              this.document,
              "height",
              "".concat(n, "px")
            )),
            (s.attributes.transform = new ct(
              this.document,
              "transform",
              this.getAttribute("patternTransform").getValue()
            )),
            (s.children = this.children);
          var a = this.document.createCanvas(i, n),
            o = a.getContext("2d"),
            h = this.getAttribute("x"),
            u = this.getAttribute("y");
          h.hasValue() &&
            u.hasValue() &&
            o.translate(h.getPixels("x", !0), u.getPixels("y", !0)),
            r.hasValue()
              ? (this.styles["fill-opacity"] = r)
              : Reflect.deleteProperty(this.styles, "fill-opacity");
          for (var l = -1; l <= 1; l++)
            for (var c = -1; c <= 1; c++)
              o.save(),
                (s.attributes.x = new ct(this.document, "x", l * a.width)),
                (s.attributes.y = new ct(this.document, "y", c * a.height)),
                s.render(o),
                o.restore();
          return t.createPattern(a, "repeat");
        }
      }
      class Zt extends Mt {
        constructor() {
          super(...arguments), (this.type = "marker");
        }
        render(t, e, r) {
          if (e) {
            var { x: i, y: n } = e,
              s = this.getAttribute("orient").getString("auto"),
              a = this.getAttribute("markerUnits").getString("strokeWidth");
            t.translate(i, n),
              "auto" === s && t.rotate(r),
              "strokeWidth" === a && t.scale(t.lineWidth, t.lineWidth),
              t.save();
            var o = new Ut(this.document, null);
            (o.type = this.type),
              (o.attributes.viewBox = new ct(
                this.document,
                "viewBox",
                this.getAttribute("viewBox").getValue()
              )),
              (o.attributes.refX = new ct(
                this.document,
                "refX",
                this.getAttribute("refX").getValue()
              )),
              (o.attributes.refY = new ct(
                this.document,
                "refY",
                this.getAttribute("refY").getValue()
              )),
              (o.attributes.width = new ct(
                this.document,
                "width",
                this.getAttribute("markerWidth").getValue()
              )),
              (o.attributes.height = new ct(
                this.document,
                "height",
                this.getAttribute("markerHeight").getValue()
              )),
              (o.attributes.overflow = new ct(
                this.document,
                "overflow",
                this.getAttribute("overflow").getValue()
              )),
              (o.attributes.fill = new ct(
                this.document,
                "fill",
                this.getAttribute("fill").getColor("black")
              )),
              (o.attributes.stroke = new ct(
                this.document,
                "stroke",
                this.getAttribute("stroke").getValue("none")
              )),
              (o.children = this.children),
              o.render(t),
              t.restore(),
              "strokeWidth" === a && t.scale(1 / t.lineWidth, 1 / t.lineWidth),
              "auto" === s && t.rotate(-r),
              t.translate(-i, -n);
          }
        }
      }
      class Kt extends Mt {
        constructor() {
          super(...arguments), (this.type = "defs");
        }
        render() {}
      }
      class Jt extends Dt {
        constructor() {
          super(...arguments), (this.type = "g");
        }
        getBoundingBox(t) {
          var e = new It();
          return (
            this.children.forEach((r) => {
              e.addBoundingBox(r.getBoundingBox(t));
            }),
            e
          );
        }
      }
      class te extends Mt {
        constructor(t, e, r) {
          super(t, e, r),
            (this.attributesToInherit = ["gradientUnits"]),
            (this.stops = []);
          var { stops: i, children: n } = this;
          n.forEach((t) => {
            "stop" === t.type && i.push(t);
          });
        }
        getGradientUnits() {
          return this.getAttribute("gradientUnits").getString(
            "objectBoundingBox"
          );
        }
        createGradient(t, e, r) {
          var i = this;
          this.getHrefAttribute().hasValue() &&
            ((i = this.getHrefAttribute().getDefinition()),
            this.inheritStopContainer(i));
          var { stops: n } = i,
            s = this.getGradient(t, e);
          if (!s) return this.addParentOpacity(r, n[n.length - 1].color);
          if (
            (n.forEach((t) => {
              s.addColorStop(t.offset, this.addParentOpacity(r, t.color));
            }),
            this.getAttribute("gradientTransform").hasValue())
          ) {
            var { document: a } = this,
              { MAX_VIRTUAL_PIXELS: o, viewPort: h } = a.screen,
              [u] = h.viewPorts,
              l = new Xt(a, null);
            (l.attributes.x = new ct(a, "x", -o / 3)),
              (l.attributes.y = new ct(a, "y", -o / 3)),
              (l.attributes.width = new ct(a, "width", o)),
              (l.attributes.height = new ct(a, "height", o));
            var c = new Jt(a, null);
            (c.attributes.transform = new ct(
              a,
              "transform",
              this.getAttribute("gradientTransform").getValue()
            )),
              (c.children = [l]);
            var g = new Ut(a, null);
            (g.attributes.x = new ct(a, "x", 0)),
              (g.attributes.y = new ct(a, "y", 0)),
              (g.attributes.width = new ct(a, "width", u.width)),
              (g.attributes.height = new ct(a, "height", u.height)),
              (g.children = [c]);
            var p = a.createCanvas(u.width, u.height),
              f = p.getContext("2d");
            return (
              (f.fillStyle = s), g.render(f), f.createPattern(p, "no-repeat")
            );
          }
          return s;
        }
        inheritStopContainer(t) {
          this.attributesToInherit.forEach((e) => {
            !this.getAttribute(e).hasValue() &&
              t.getAttribute(e).hasValue() &&
              this.getAttribute(e, !0).setValue(t.getAttribute(e).getValue());
          });
        }
        addParentOpacity(t, e) {
          return t.hasValue()
            ? new ct(this.document, "color", e).addOpacity(t).getColor()
            : e;
        }
      }
      class ee extends te {
        constructor(t, e, r) {
          super(t, e, r),
            (this.type = "linearGradient"),
            this.attributesToInherit.push("x1", "y1", "x2", "y2");
        }
        getGradient(t, e) {
          var r = "objectBoundingBox" === this.getGradientUnits(),
            i = r ? e.getBoundingBox(t) : null;
          if (r && !i) return null;
          this.getAttribute("x1").hasValue() ||
            this.getAttribute("y1").hasValue() ||
            this.getAttribute("x2").hasValue() ||
            this.getAttribute("y2").hasValue() ||
            (this.getAttribute("x1", !0).setValue(0),
            this.getAttribute("y1", !0).setValue(0),
            this.getAttribute("x2", !0).setValue(1),
            this.getAttribute("y2", !0).setValue(0));
          var n = r
              ? i.x + i.width * this.getAttribute("x1").getNumber()
              : this.getAttribute("x1").getPixels("x"),
            s = r
              ? i.y + i.height * this.getAttribute("y1").getNumber()
              : this.getAttribute("y1").getPixels("y"),
            a = r
              ? i.x + i.width * this.getAttribute("x2").getNumber()
              : this.getAttribute("x2").getPixels("x"),
            o = r
              ? i.y + i.height * this.getAttribute("y2").getNumber()
              : this.getAttribute("y2").getPixels("y");
          return n === a && s === o ? null : t.createLinearGradient(n, s, a, o);
        }
      }
      class re extends te {
        constructor(t, e, r) {
          super(t, e, r),
            (this.type = "radialGradient"),
            this.attributesToInherit.push("cx", "cy", "r", "fx", "fy", "fr");
        }
        getGradient(t, e) {
          var r = "objectBoundingBox" === this.getGradientUnits(),
            i = e.getBoundingBox(t);
          if (r && !i) return null;
          this.getAttribute("cx").hasValue() ||
            this.getAttribute("cx", !0).setValue("50%"),
            this.getAttribute("cy").hasValue() ||
              this.getAttribute("cy", !0).setValue("50%"),
            this.getAttribute("r").hasValue() ||
              this.getAttribute("r", !0).setValue("50%");
          var n = r
              ? i.x + i.width * this.getAttribute("cx").getNumber()
              : this.getAttribute("cx").getPixels("x"),
            s = r
              ? i.y + i.height * this.getAttribute("cy").getNumber()
              : this.getAttribute("cy").getPixels("y"),
            a = n,
            o = s;
          this.getAttribute("fx").hasValue() &&
            (a = r
              ? i.x + i.width * this.getAttribute("fx").getNumber()
              : this.getAttribute("fx").getPixels("x")),
            this.getAttribute("fy").hasValue() &&
              (o = r
                ? i.y + i.height * this.getAttribute("fy").getNumber()
                : this.getAttribute("fy").getPixels("y"));
          var h = r
              ? ((i.width + i.height) / 2) * this.getAttribute("r").getNumber()
              : this.getAttribute("r").getPixels(),
            u = this.getAttribute("fr").getPixels();
          return t.createRadialGradient(a, o, u, n, s, h);
        }
      }
      class ie extends Mt {
        constructor(t, e, r) {
          super(t, e, r), (this.type = "stop");
          var i = Math.max(
              0,
              Math.min(1, this.getAttribute("offset").getNumber())
            ),
            n = this.getStyle("stop-opacity"),
            s = this.getStyle("stop-color", !0);
          "" === s.getString() && s.setValue("#000"),
            n.hasValue() && (s = s.addOpacity(n)),
            (this.offset = i),
            (this.color = s.getColor());
        }
      }
      class ne extends Mt {
        constructor(t, e, r) {
          super(t, e, r),
            (this.type = "animate"),
            (this.duration = 0),
            (this.initialValue = null),
            (this.initialUnits = ""),
            (this.removed = !1),
            (this.frozen = !1),
            t.screen.animations.push(this),
            (this.begin = this.getAttribute("begin").getMilliseconds()),
            (this.maxDuration =
              this.begin + this.getAttribute("dur").getMilliseconds()),
            (this.from = this.getAttribute("from")),
            (this.to = this.getAttribute("to")),
            (this.values = new ct(t, "values", null));
          var i = this.getAttribute("values");
          i.hasValue() && this.values.setValue(i.getString().split(";"));
        }
        getProperty() {
          var t = this.getAttribute("attributeType").getString(),
            e = this.getAttribute("attributeName").getString();
          return "CSS" === t
            ? this.parent.getStyle(e, !0)
            : this.parent.getAttribute(e, !0);
        }
        calcValue() {
          var { initialUnits: t } = this,
            { progress: e, from: r, to: i } = this.getProgress(),
            n = r.getNumber() + (i.getNumber() - r.getNumber()) * e;
          return "%" === t && (n *= 100), "".concat(n).concat(t);
        }
        update(t) {
          var { parent: e } = this,
            r = this.getProperty();
          if (
            (this.initialValue ||
              ((this.initialValue = r.getString()),
              (this.initialUnits = r.getUnits())),
            this.duration > this.maxDuration)
          ) {
            var i = this.getAttribute("fill").getString("remove");
            if (
              "indefinite" === this.getAttribute("repeatCount").getString() ||
              "indefinite" === this.getAttribute("repeatDur").getString()
            )
              this.duration = 0;
            else if ("freeze" !== i || this.frozen) {
              if ("remove" === i && !this.removed)
                return (
                  (this.removed = !0),
                  r.setValue(
                    e.animationFrozen
                      ? e.animationFrozenValue
                      : this.initialValue
                  ),
                  !0
                );
            } else
              (this.frozen = !0),
                (e.animationFrozen = !0),
                (e.animationFrozenValue = r.getString());
            return !1;
          }
          this.duration += t;
          var n = !1;
          if (this.begin < this.duration) {
            var s = this.calcValue(),
              a = this.getAttribute("type");
            if (a.hasValue()) {
              var o = a.getString();
              s = "".concat(o, "(").concat(s, ")");
            }
            r.setValue(s), (n = !0);
          }
          return n;
        }
        getProgress() {
          var { document: t, values: e } = this,
            r = {
              progress:
                (this.duration - this.begin) / (this.maxDuration - this.begin),
            };
          if (e.hasValue()) {
            var i = r.progress * (e.getValue().length - 1),
              n = Math.floor(i),
              s = Math.ceil(i);
            (r.from = new ct(t, "from", parseFloat(e.getValue()[n]))),
              (r.to = new ct(t, "to", parseFloat(e.getValue()[s]))),
              (r.progress = (i - n) / (s - n));
          } else (r.from = this.from), (r.to = this.to);
          return r;
        }
      }
      class se extends ne {
        constructor() {
          super(...arguments), (this.type = "animateColor");
        }
        calcValue() {
          var { progress: t, from: e, to: r } = this.getProgress(),
            i = new u(e.getColor()),
            n = new u(r.getColor());
          if (i.ok && n.ok) {
            var s = i.r + (n.r - i.r) * t,
              a = i.g + (n.g - i.g) * t,
              o = i.b + (n.b - i.b) * t;
            return "rgb("
              .concat(Math.floor(s), ", ")
              .concat(Math.floor(a), ", ")
              .concat(Math.floor(o), ")");
          }
          return this.getAttribute("from").getColor();
        }
      }
      class ae extends ne {
        constructor() {
          super(...arguments), (this.type = "animateTransform");
        }
        calcValue() {
          var { progress: t, from: e, to: r } = this.getProgress(),
            i = F(e.getString()),
            n = F(r.getString()),
            s = i.map((e, r) => e + (n[r] - e) * t).join(" ");
          return s;
        }
      }
      class oe extends Mt {
        constructor(t, e, r) {
          super(t, e, r),
            (this.type = "font"),
            (this.glyphs = {}),
            (this.horizAdvX = this.getAttribute("horiz-adv-x").getNumber());
          var { definitions: i } = t,
            { children: n } = this;
          for (var s of n)
            switch (s.type) {
              case "font-face":
                this.fontFace = s;
                var a = s.getStyle("font-family");
                a.hasValue() && (i[a.getString()] = this);
                break;
              case "missing-glyph":
                this.missingGlyph = s;
                break;
              case "glyph":
                var o = s;
                o.arabicForm
                  ? ((this.isRTL = !0),
                    (this.isArabic = !0),
                    "undefined" === typeof this.glyphs[o.unicode] &&
                      (this.glyphs[o.unicode] = {}),
                    (this.glyphs[o.unicode][o.arabicForm] = o))
                  : (this.glyphs[o.unicode] = o);
            }
        }
        render() {}
      }
      class he extends Mt {
        constructor(t, e, r) {
          super(t, e, r),
            (this.type = "font-face"),
            (this.ascent = this.getAttribute("ascent").getNumber()),
            (this.descent = this.getAttribute("descent").getNumber()),
            (this.unitsPerEm = this.getAttribute("units-per-em").getNumber());
        }
      }
      class ue extends Bt {
        constructor() {
          super(...arguments),
            (this.type = "missing-glyph"),
            (this.horizAdvX = 0);
        }
      }
      class le extends Ft {
        constructor() {
          super(...arguments), (this.type = "tref");
        }
        getText() {
          var t = this.getHrefAttribute().getDefinition();
          if (t) {
            var e = t.children[0];
            if (e) return e.getText();
          }
          return "";
        }
      }
      class ce extends Ft {
        constructor(t, e, r) {
          super(t, e, r), (this.type = "a");
          var { childNodes: i } = e,
            n = i[0],
            s = i.length > 0 && Array.from(i).every((t) => 3 === t.nodeType);
          (this.hasText = s), (this.text = s ? this.getTextFromNode(n) : "");
        }
        getText() {
          return this.text;
        }
        renderChildren(t) {
          if (this.hasText) {
            super.renderChildren(t);
            var { document: e, x: r, y: i } = this,
              { mouse: n } = e.screen,
              s = new ct(e, "fontSize", kt.parse(e.ctx.font).fontSize);
            n.isWorking() &&
              n.checkBoundingBox(
                this,
                new It(r, i - s.getPixels("y"), r + this.measureText(t), i)
              );
          } else if (this.children.length > 0) {
            var a = new Jt(this.document, null);
            (a.children = this.children), (a.parent = this), a.render(t);
          }
        }
        onClick() {
          var { window: t } = this.document;
          t && t.open(this.getHrefAttribute().getString());
        }
        onMouseMove() {
          this.document.ctx.canvas.style.cursor = "pointer";
        }
      }
      function ge(t, e) {
        var r = Object.keys(t);
        if (Object.getOwnPropertySymbols) {
          var i = Object.getOwnPropertySymbols(t);
          e &&
            (i = i.filter(function (e) {
              return Object.getOwnPropertyDescriptor(t, e).enumerable;
            })),
            r.push.apply(r, i);
        }
        return r;
      }
      function pe(t) {
        for (var e = 1; e < arguments.length; e++) {
          var r = null != arguments[e] ? arguments[e] : {};
          e % 2
            ? ge(Object(r), !0).forEach(function (e) {
                o(t, e, r[e]);
              })
            : Object.getOwnPropertyDescriptors
              ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(r))
              : ge(Object(r)).forEach(function (e) {
                  Object.defineProperty(
                    t,
                    e,
                    Object.getOwnPropertyDescriptor(r, e)
                  );
                });
        }
        return t;
      }
      class fe extends Ft {
        constructor(t, e, r) {
          super(t, e, r),
            (this.type = "textPath"),
            (this.textWidth = 0),
            (this.textHeight = 0),
            (this.pathLength = -1),
            (this.glyphInfo = null),
            (this.letterSpacingCache = []),
            (this.measuresCache = new Map([["", 0]]));
          var i = this.getHrefAttribute().getDefinition();
          (this.text = this.getTextFromNode()),
            (this.dataArray = this.parsePathData(i));
        }
        getText() {
          return this.text;
        }
        path(t) {
          var { dataArray: e } = this;
          t && t.beginPath(),
            e.forEach((e) => {
              var { type: r, points: i } = e;
              switch (r) {
                case Lt.LINE_TO:
                  t && t.lineTo(i[0], i[1]);
                  break;
                case Lt.MOVE_TO:
                  t && t.moveTo(i[0], i[1]);
                  break;
                case Lt.CURVE_TO:
                  t && t.bezierCurveTo(i[0], i[1], i[2], i[3], i[4], i[5]);
                  break;
                case Lt.QUAD_TO:
                  t && t.quadraticCurveTo(i[0], i[1], i[2], i[3]);
                  break;
                case Lt.ARC:
                  var [n, s, a, o, h, u, l, c] = i,
                    g = a > o ? a : o,
                    p = a > o ? 1 : a / o,
                    f = a > o ? o / a : 1;
                  t &&
                    (t.translate(n, s),
                    t.rotate(l),
                    t.scale(p, f),
                    t.arc(0, 0, g, h, h + u, Boolean(1 - c)),
                    t.scale(1 / p, 1 / f),
                    t.rotate(-l),
                    t.translate(-n, -s));
                  break;
                case Lt.CLOSE_PATH:
                  t && t.closePath();
              }
            });
        }
        renderChildren(t) {
          this.setTextData(t), t.save();
          var e = this.parent.getStyle("text-decoration").getString(),
            r = this.getFontSize(),
            { glyphInfo: i } = this,
            n = t.fillStyle;
          "underline" === e && t.beginPath(),
            i.forEach((i, n) => {
              var { p0: s, p1: a, rotation: o, text: h } = i;
              t.save(),
                t.translate(s.x, s.y),
                t.rotate(o),
                t.fillStyle && t.fillText(h, 0, 0),
                t.strokeStyle && t.strokeText(h, 0, 0),
                t.restore(),
                "underline" === e &&
                  (0 === n && t.moveTo(s.x, s.y + r / 8),
                  t.lineTo(a.x, a.y + r / 5));
            }),
            "underline" === e &&
              ((t.lineWidth = r / 20),
              (t.strokeStyle = n),
              t.stroke(),
              t.closePath()),
            t.restore();
        }
        getLetterSpacingAt() {
          var t =
            arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 0;
          return this.letterSpacingCache[t] || 0;
        }
        findSegmentToFitChar(t, e, r, i, n, s, a, o, h) {
          var u = s,
            l = this.measureText(t, o);
          " " === o && "justify" === e && r < i && (l += (i - r) / n),
            h > -1 && (u += this.getLetterSpacingAt(h));
          var c = this.textHeight / 20,
            g = this.getEquidistantPointOnPath(u, c, 0),
            p = this.getEquidistantPointOnPath(u + l, c, 0),
            f = { p0: g, p1: p },
            d = g && p ? Math.atan2(p.y - g.y, p.x - g.x) : 0;
          if (a) {
            var y = Math.cos(Math.PI / 2 + d) * a,
              v = Math.cos(-d) * a;
            (f.p0 = pe(pe({}, g), {}, { x: g.x + y, y: g.y + v })),
              (f.p1 = pe(pe({}, p), {}, { x: p.x + y, y: p.y + v }));
          }
          return { offset: (u += l), segment: f, rotation: d };
        }
        measureText(t, e) {
          var { measuresCache: r } = this,
            i = e || this.getText();
          if (r.has(i)) return r.get(i);
          var n = this.measureTargetText(t, i);
          return r.set(i, n), n;
        }
        setTextData(t) {
          if (!this.glyphInfo) {
            var e = this.getText(),
              r = e.split(""),
              i = e.split(" ").length - 1,
              n = this.parent
                .getAttribute("dx")
                .split()
                .map((t) => t.getPixels("x")),
              s = this.parent.getAttribute("dy").getPixels("y"),
              a = this.parent.getStyle("text-anchor").getString("start"),
              o = this.getStyle("letter-spacing"),
              h = this.parent.getStyle("letter-spacing"),
              u = 0;
            o.hasValue() && "inherit" !== o.getValue()
              ? o.hasValue() &&
                "initial" !== o.getValue() &&
                "unset" !== o.getValue() &&
                (u = o.getPixels())
              : (u = h.getPixels());
            var l = [],
              c = e.length;
            this.letterSpacingCache = l;
            for (var g = 0; g < c; g++)
              l.push("undefined" !== typeof n[g] ? n[g] : u);
            var p = l.reduce((t, e, r) => (0 === r ? 0 : t + e || 0), 0),
              f = this.measureText(t),
              d = Math.max(f + p, 0);
            (this.textWidth = f),
              (this.textHeight = this.getFontSize()),
              (this.glyphInfo = []);
            var y = this.getPathLength(),
              v = this.getStyle("startOffset").getNumber(0) * y,
              m = 0;
            ("middle" !== a && "center" !== a) || (m = -d / 2),
              ("end" !== a && "right" !== a) || (m = -d),
              (m += v),
              r.forEach((e, n) => {
                var {
                  offset: o,
                  segment: h,
                  rotation: u,
                } = this.findSegmentToFitChar(t, a, d, y, i, m, s, e, n);
                (m = o),
                  h.p0 &&
                    h.p1 &&
                    this.glyphInfo.push({
                      text: r[n],
                      p0: h.p0,
                      p1: h.p1,
                      rotation: u,
                    });
              });
          }
        }
        parsePathData(t) {
          if (((this.pathLength = -1), !t)) return [];
          var e = [],
            { pathParser: r } = t;
          for (r.reset(); !r.isEnd(); ) {
            var { current: i } = r,
              n = i ? i.x : 0,
              s = i ? i.y : 0,
              a = r.next(),
              o = a.type,
              h = [];
            switch (a.type) {
              case Lt.MOVE_TO:
                this.pathM(r, h);
                break;
              case Lt.LINE_TO:
                o = this.pathL(r, h);
                break;
              case Lt.HORIZ_LINE_TO:
                o = this.pathH(r, h);
                break;
              case Lt.VERT_LINE_TO:
                o = this.pathV(r, h);
                break;
              case Lt.CURVE_TO:
                this.pathC(r, h);
                break;
              case Lt.SMOOTH_CURVE_TO:
                o = this.pathS(r, h);
                break;
              case Lt.QUAD_TO:
                this.pathQ(r, h);
                break;
              case Lt.SMOOTH_QUAD_TO:
                o = this.pathT(r, h);
                break;
              case Lt.ARC:
                h = this.pathA(r);
                break;
              case Lt.CLOSE_PATH:
                Bt.pathZ(r);
            }
            a.type !== Lt.CLOSE_PATH
              ? e.push({
                  type: o,
                  points: h,
                  start: { x: n, y: s },
                  pathLength: this.calcLength(n, s, o, h),
                })
              : e.push({ type: Lt.CLOSE_PATH, points: [], pathLength: 0 });
          }
          return e;
        }
        pathM(t, e) {
          var { x: r, y: i } = Bt.pathM(t).point;
          e.push(r, i);
        }
        pathL(t, e) {
          var { x: r, y: i } = Bt.pathL(t).point;
          return e.push(r, i), Lt.LINE_TO;
        }
        pathH(t, e) {
          var { x: r, y: i } = Bt.pathH(t).point;
          return e.push(r, i), Lt.LINE_TO;
        }
        pathV(t, e) {
          var { x: r, y: i } = Bt.pathV(t).point;
          return e.push(r, i), Lt.LINE_TO;
        }
        pathC(t, e) {
          var { point: r, controlPoint: i, currentPoint: n } = Bt.pathC(t);
          e.push(r.x, r.y, i.x, i.y, n.x, n.y);
        }
        pathS(t, e) {
          var { point: r, controlPoint: i, currentPoint: n } = Bt.pathS(t);
          return e.push(r.x, r.y, i.x, i.y, n.x, n.y), Lt.CURVE_TO;
        }
        pathQ(t, e) {
          var { controlPoint: r, currentPoint: i } = Bt.pathQ(t);
          e.push(r.x, r.y, i.x, i.y);
        }
        pathT(t, e) {
          var { controlPoint: r, currentPoint: i } = Bt.pathT(t);
          return e.push(r.x, r.y, i.x, i.y), Lt.QUAD_TO;
        }
        pathA(t) {
          var {
            rX: e,
            rY: r,
            sweepFlag: i,
            xAxisRotation: n,
            centp: s,
            a1: a,
            ad: o,
          } = Bt.pathA(t);
          return (
            0 === i && o > 0 && (o -= 2 * Math.PI),
            1 === i && o < 0 && (o += 2 * Math.PI),
            [s.x, s.y, e, r, a, o, n, i]
          );
        }
        calcLength(t, e, r, i) {
          var n = 0,
            s = null,
            a = null,
            o = 0;
          switch (r) {
            case Lt.LINE_TO:
              return this.getLineLength(t, e, i[0], i[1]);
            case Lt.CURVE_TO:
              for (
                n = 0,
                  s = this.getPointOnCubicBezier(
                    0,
                    t,
                    e,
                    i[0],
                    i[1],
                    i[2],
                    i[3],
                    i[4],
                    i[5]
                  ),
                  o = 0.01;
                o <= 1;
                o += 0.01
              )
                (a = this.getPointOnCubicBezier(
                  o,
                  t,
                  e,
                  i[0],
                  i[1],
                  i[2],
                  i[3],
                  i[4],
                  i[5]
                )),
                  (n += this.getLineLength(s.x, s.y, a.x, a.y)),
                  (s = a);
              return n;
            case Lt.QUAD_TO:
              for (
                n = 0,
                  s = this.getPointOnQuadraticBezier(
                    0,
                    t,
                    e,
                    i[0],
                    i[1],
                    i[2],
                    i[3]
                  ),
                  o = 0.01;
                o <= 1;
                o += 0.01
              )
                (a = this.getPointOnQuadraticBezier(
                  o,
                  t,
                  e,
                  i[0],
                  i[1],
                  i[2],
                  i[3]
                )),
                  (n += this.getLineLength(s.x, s.y, a.x, a.y)),
                  (s = a);
              return n;
            case Lt.ARC:
              n = 0;
              var h = i[4],
                u = i[5],
                l = i[4] + u,
                c = Math.PI / 180;
              if (
                (Math.abs(h - l) < c && (c = Math.abs(h - l)),
                (s = this.getPointOnEllipticalArc(
                  i[0],
                  i[1],
                  i[2],
                  i[3],
                  h,
                  0
                )),
                u < 0)
              )
                for (o = h - c; o > l; o -= c)
                  (a = this.getPointOnEllipticalArc(
                    i[0],
                    i[1],
                    i[2],
                    i[3],
                    o,
                    0
                  )),
                    (n += this.getLineLength(s.x, s.y, a.x, a.y)),
                    (s = a);
              else
                for (o = h + c; o < l; o += c)
                  (a = this.getPointOnEllipticalArc(
                    i[0],
                    i[1],
                    i[2],
                    i[3],
                    o,
                    0
                  )),
                    (n += this.getLineLength(s.x, s.y, a.x, a.y)),
                    (s = a);
              return (
                (a = this.getPointOnEllipticalArc(
                  i[0],
                  i[1],
                  i[2],
                  i[3],
                  l,
                  0
                )),
                (n += this.getLineLength(s.x, s.y, a.x, a.y))
              );
          }
          return 0;
        }
        getPointOnLine(t, e, r, i, n) {
          var s =
              arguments.length > 5 && void 0 !== arguments[5]
                ? arguments[5]
                : e,
            a =
              arguments.length > 6 && void 0 !== arguments[6]
                ? arguments[6]
                : r,
            o = (n - r) / (i - e + tt),
            h = Math.sqrt((t * t) / (1 + o * o));
          i < e && (h *= -1);
          var u = o * h,
            l = null;
          if (i === e) l = { x: s, y: a + u };
          else if ((a - r) / (s - e + tt) === o) l = { x: s + h, y: a + u };
          else {
            var c,
              g,
              p = this.getLineLength(e, r, i, n);
            if (p < tt) return null;
            var f = (s - e) * (i - e) + (a - r) * (n - r);
            (c = e + (f /= p * p) * (i - e)), (g = r + f * (n - r));
            var d = this.getLineLength(s, a, c, g),
              y = Math.sqrt(t * t - d * d);
            (h = Math.sqrt((y * y) / (1 + o * o))),
              i < e && (h *= -1),
              (l = { x: c + h, y: g + (u = o * h) });
          }
          return l;
        }
        getPointOnPath(t) {
          var e = this.getPathLength(),
            r = 0,
            i = null;
          if (t < -5e-5 || t - 5e-5 > e) return null;
          var { dataArray: n } = this;
          for (var s of n) {
            if (!s || !(s.pathLength < 5e-5 || r + s.pathLength + 5e-5 < t)) {
              var a = t - r,
                o = 0;
              switch (s.type) {
                case Lt.LINE_TO:
                  i = this.getPointOnLine(
                    a,
                    s.start.x,
                    s.start.y,
                    s.points[0],
                    s.points[1],
                    s.start.x,
                    s.start.y
                  );
                  break;
                case Lt.ARC:
                  var h = s.points[4],
                    u = s.points[5],
                    l = s.points[4] + u;
                  if (
                    ((o = h + (a / s.pathLength) * u),
                    (u < 0 && o < l) || (u >= 0 && o > l))
                  )
                    break;
                  i = this.getPointOnEllipticalArc(
                    s.points[0],
                    s.points[1],
                    s.points[2],
                    s.points[3],
                    o,
                    s.points[6]
                  );
                  break;
                case Lt.CURVE_TO:
                  (o = a / s.pathLength) > 1 && (o = 1),
                    (i = this.getPointOnCubicBezier(
                      o,
                      s.start.x,
                      s.start.y,
                      s.points[0],
                      s.points[1],
                      s.points[2],
                      s.points[3],
                      s.points[4],
                      s.points[5]
                    ));
                  break;
                case Lt.QUAD_TO:
                  (o = a / s.pathLength) > 1 && (o = 1),
                    (i = this.getPointOnQuadraticBezier(
                      o,
                      s.start.x,
                      s.start.y,
                      s.points[0],
                      s.points[1],
                      s.points[2],
                      s.points[3]
                    ));
              }
              if (i) return i;
              break;
            }
            r += s.pathLength;
          }
          return null;
        }
        getLineLength(t, e, r, i) {
          return Math.sqrt((r - t) * (r - t) + (i - e) * (i - e));
        }
        getPathLength() {
          return (
            -1 === this.pathLength &&
              (this.pathLength = this.dataArray.reduce(
                (t, e) => (e.pathLength > 0 ? t + e.pathLength : t),
                0
              )),
            this.pathLength
          );
        }
        getPointOnCubicBezier(t, e, r, i, n, s, a, o, h) {
          return {
            x: o * nt(t) + s * st(t) + i * at(t) + e * ot(t),
            y: h * nt(t) + a * st(t) + n * at(t) + r * ot(t),
          };
        }
        getPointOnQuadraticBezier(t, e, r, i, n, s, a) {
          return {
            x: s * ht(t) + i * ut(t) + e * lt(t),
            y: a * ht(t) + n * ut(t) + r * lt(t),
          };
        }
        getPointOnEllipticalArc(t, e, r, i, n, s) {
          var a = Math.cos(s),
            o = Math.sin(s),
            h = r * Math.cos(n),
            u = i * Math.sin(n);
          return { x: t + (h * a - u * o), y: e + (h * o + u * a) };
        }
        buildEquidistantCache(t, e) {
          var r = this.getPathLength(),
            i = e || 0.25,
            n = t || r / 100;
          if (
            !this.equidistantCache ||
            this.equidistantCache.step !== n ||
            this.equidistantCache.precision !== i
          ) {
            this.equidistantCache = { step: n, precision: i, points: [] };
            for (var s = 0, a = 0; a <= r; a += i) {
              var o = this.getPointOnPath(a),
                h = this.getPointOnPath(a + i);
              o &&
                h &&
                (s += this.getLineLength(o.x, o.y, h.x, h.y)) >= n &&
                (this.equidistantCache.points.push({
                  x: o.x,
                  y: o.y,
                  distance: a,
                }),
                (s -= n));
            }
          }
        }
        getEquidistantPointOnPath(t, e, r) {
          if (
            (this.buildEquidistantCache(e, r),
            t < 0 || t - this.getPathLength() > 5e-5)
          )
            return null;
          var i = Math.round(
            (t / this.getPathLength()) *
              (this.equidistantCache.points.length - 1)
          );
          return this.equidistantCache.points[i] || null;
        }
      }
      var de =
        /^\s*data:(([^/,;]+\/[^/,;]+)(?:;([^,;=]+=[^,;=]+))?)?(?:;(base64))?,(.*)$/i;
      class ye extends Dt {
        constructor(t, e, r) {
          super(t, e, r), (this.type = "image"), (this.loaded = !1);
          var i = this.getHrefAttribute().getString();
          if (i) {
            var n = i.endsWith(".svg") || /^\s*data:image\/svg\+xml/i.test(i);
            t.images.push(this),
              n ? this.loadSvg(i) : this.loadImage(i),
              (this.isSvg = n);
          }
        }
        loadImage(t) {
          var e = this;
          return n(function* () {
            try {
              var r = yield e.document.createImage(t);
              e.image = r;
            } catch (i) {
              console.error('Error while loading image "'.concat(t, '":'), i);
            }
            e.loaded = !0;
          })();
        }
        loadSvg(t) {
          var e = this;
          return n(function* () {
            var r = de.exec(t);
            if (r) {
              var i = r[5];
              "base64" === r[4]
                ? (e.image = atob(i))
                : (e.image = decodeURIComponent(i));
            } else
              try {
                var n = yield e.document.fetch(t),
                  s = yield n.text();
                e.image = s;
              } catch (a) {
                console.error('Error while loading image "'.concat(t, '":'), a);
              }
            e.loaded = !0;
          })();
        }
        renderChildren(t) {
          var { document: e, image: r, loaded: i } = this,
            n = this.getAttribute("x").getPixels("x"),
            s = this.getAttribute("y").getPixels("y"),
            a = this.getStyle("width").getPixels("x"),
            o = this.getStyle("height").getPixels("y");
          if (i && r && a && o) {
            if ((t.save(), t.translate(n, s), this.isSvg)) {
              var h = e.canvg.forkString(t, this.image, {
                ignoreMouse: !0,
                ignoreAnimation: !0,
                ignoreDimensions: !0,
                ignoreClear: !0,
                offsetX: 0,
                offsetY: 0,
                scaleWidth: a,
                scaleHeight: o,
              });
              (h.document.documentElement.parent = this), h.render();
            } else {
              var u = this.image;
              e.setViewBox({
                ctx: t,
                aspectRatio: this.getAttribute(
                  "preserveAspectRatio"
                ).getString(),
                width: a,
                desiredWidth: u.width,
                height: o,
                desiredHeight: u.height,
              }),
                this.loaded &&
                  ("undefined" === typeof u.complete || u.complete) &&
                  t.drawImage(u, 0, 0);
            }
            t.restore();
          }
        }
        getBoundingBox() {
          var t = this.getAttribute("x").getPixels("x"),
            e = this.getAttribute("y").getPixels("y"),
            r = this.getStyle("width").getPixels("x"),
            i = this.getStyle("height").getPixels("y");
          return new It(t, e, t + r, e + i);
        }
      }
      class ve extends Dt {
        constructor() {
          super(...arguments), (this.type = "symbol");
        }
        render(t) {}
      }
      class me {
        constructor(t) {
          (this.document = t), (this.loaded = !1), t.fonts.push(this);
        }
        load(t, e) {
          var r = this;
          return n(function* () {
            try {
              var { document: i } = r,
                n = (yield i.canvg.parser.load(e)).getElementsByTagName("font");
              Array.from(n).forEach((e) => {
                var r = i.createElement(e);
                i.definitions[t] = r;
              });
            } catch (s) {
              console.error('Error while loading font "'.concat(e, '":'), s);
            }
            r.loaded = !0;
          })();
        }
      }
      class xe extends Mt {
        constructor(t, e, r) {
          super(t, e, r), (this.type = "style");
          var i = D(
            Array.from(e.childNodes)
              .map((t) => t.textContent)
              .join("")
              .replace(
                /(\/\*([^*]|[\r\n]|(\*+([^*/]|[\r\n])))*\*+\/)|(^[\s]*\/\/.*)/gm,
                ""
              )
              .replace(/@import.*;/g, "")
          );
          i.split("}").forEach((e) => {
            var r = e.trim();
            if (r) {
              var i = r.split("{"),
                n = i[0].split(","),
                s = i[1].split(";");
              n.forEach((e) => {
                var r = e.trim();
                if (r) {
                  var i = t.styles[r] || {};
                  if (
                    (s.forEach((e) => {
                      var r = e.indexOf(":"),
                        n = e.substr(0, r).trim(),
                        s = e.substr(r + 1, e.length - r).trim();
                      n && s && (i[n] = new ct(t, n, s));
                    }),
                    (t.styles[r] = i),
                    (t.stylesSpecificity[r] = J(r)),
                    "@font-face" === r)
                  ) {
                    var n = i["font-family"].getString().replace(/"|'/g, "");
                    i.src
                      .getString()
                      .split(",")
                      .forEach((e) => {
                        if (e.indexOf('format("svg")') > 0) {
                          var r = U(e);
                          r && new me(t).load(n, r);
                        }
                      });
                  }
                }
              });
            }
          });
        }
      }
      xe.parseExternalUrl = U;
      class be extends Dt {
        constructor() {
          super(...arguments), (this.type = "use");
        }
        setContext(t) {
          super.setContext(t);
          var e = this.getAttribute("x"),
            r = this.getAttribute("y");
          e.hasValue() && t.translate(e.getPixels("x"), 0),
            r.hasValue() && t.translate(0, r.getPixels("y"));
        }
        path(t) {
          var { element: e } = this;
          e && e.path(t);
        }
        renderChildren(t) {
          var { document: e, element: r } = this;
          if (r) {
            var i = r;
            if (
              ("symbol" === r.type &&
                (((i = new Ut(e, null)).attributes.viewBox = new ct(
                  e,
                  "viewBox",
                  r.getAttribute("viewBox").getString()
                )),
                (i.attributes.preserveAspectRatio = new ct(
                  e,
                  "preserveAspectRatio",
                  r.getAttribute("preserveAspectRatio").getString()
                )),
                (i.attributes.overflow = new ct(
                  e,
                  "overflow",
                  r.getAttribute("overflow").getString()
                )),
                (i.children = r.children),
                (r.styles.opacity = new ct(
                  e,
                  "opacity",
                  this.calculateOpacity()
                ))),
              "svg" === i.type)
            ) {
              var n = this.getStyle("width", !1, !0),
                s = this.getStyle("height", !1, !0);
              n.hasValue() &&
                (i.attributes.width = new ct(e, "width", n.getString())),
                s.hasValue() &&
                  (i.attributes.height = new ct(e, "height", s.getString()));
            }
            var a = i.parent;
            (i.parent = this), i.render(t), (i.parent = a);
          }
        }
        getBoundingBox(t) {
          var { element: e } = this;
          return e ? e.getBoundingBox(t) : null;
        }
        elementTransform() {
          var { document: t, element: e } = this;
          return Et.fromElement(t, e);
        }
        get element() {
          return (
            this.cachedElement ||
              (this.cachedElement = this.getHrefAttribute().getDefinition()),
            this.cachedElement
          );
        }
      }
      function Se(t, e, r, i, n, s) {
        return t[r * i * 4 + 4 * e + s];
      }
      function we(t, e, r, i, n, s, a) {
        t[r * i * 4 + 4 * e + s] = a;
      }
      function Te(t, e, r) {
        return t[e] * r;
      }
      function Ae(t, e, r, i) {
        return e + Math.cos(t) * r + Math.sin(t) * i;
      }
      class Oe extends Mt {
        constructor(t, e, r) {
          super(t, e, r), (this.type = "feColorMatrix");
          var i = F(this.getAttribute("values").getString());
          switch (this.getAttribute("type").getString("matrix")) {
            case "saturate":
              var n = i[0];
              i = [
                0.213 + 0.787 * n,
                0.715 - 0.715 * n,
                0.072 - 0.072 * n,
                0,
                0,
                0.213 - 0.213 * n,
                0.715 + 0.285 * n,
                0.072 - 0.072 * n,
                0,
                0,
                0.213 - 0.213 * n,
                0.715 - 0.715 * n,
                0.072 + 0.928 * n,
                0,
                0,
                0,
                0,
                0,
                1,
                0,
                0,
                0,
                0,
                0,
                1,
              ];
              break;
            case "hueRotate":
              var s = (i[0] * Math.PI) / 180;
              i = [
                Ae(s, 0.213, 0.787, -0.213),
                Ae(s, 0.715, -0.715, -0.715),
                Ae(s, 0.072, -0.072, 0.928),
                0,
                0,
                Ae(s, 0.213, -0.213, 0.143),
                Ae(s, 0.715, 0.285, 0.14),
                Ae(s, 0.072, -0.072, -0.283),
                0,
                0,
                Ae(s, 0.213, -0.213, -0.787),
                Ae(s, 0.715, -0.715, 0.715),
                Ae(s, 0.072, 0.928, 0.072),
                0,
                0,
                0,
                0,
                0,
                1,
                0,
                0,
                0,
                0,
                0,
                1,
              ];
              break;
            case "luminanceToAlpha":
              i = [
                0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.2125, 0.7154,
                0.0721, 0, 0, 0, 0, 0, 0, 1,
              ];
          }
          (this.matrix = i),
            (this.includeOpacity =
              this.getAttribute("includeOpacity").hasValue());
        }
        apply(t, e, r, i, n) {
          for (
            var { includeOpacity: s, matrix: a } = this,
              o = t.getImageData(0, 0, i, n),
              h = 0;
            h < n;
            h++
          )
            for (var u = 0; u < i; u++) {
              var l = Se(o.data, u, h, i, 0, 0),
                c = Se(o.data, u, h, i, 0, 1),
                g = Se(o.data, u, h, i, 0, 2),
                p = Se(o.data, u, h, i, 0, 3),
                f =
                  Te(a, 0, l) +
                  Te(a, 1, c) +
                  Te(a, 2, g) +
                  Te(a, 3, p) +
                  Te(a, 4, 1),
                d =
                  Te(a, 5, l) +
                  Te(a, 6, c) +
                  Te(a, 7, g) +
                  Te(a, 8, p) +
                  Te(a, 9, 1),
                y =
                  Te(a, 10, l) +
                  Te(a, 11, c) +
                  Te(a, 12, g) +
                  Te(a, 13, p) +
                  Te(a, 14, 1),
                v =
                  Te(a, 15, l) +
                  Te(a, 16, c) +
                  Te(a, 17, g) +
                  Te(a, 18, p) +
                  Te(a, 19, 1);
              s && ((f = 0), (d = 0), (y = 0), (v *= p / 255)),
                we(o.data, u, h, i, 0, 0, f),
                we(o.data, u, h, i, 0, 1, d),
                we(o.data, u, h, i, 0, 2, y),
                we(o.data, u, h, i, 0, 3, v);
            }
          t.clearRect(0, 0, i, n), t.putImageData(o, 0, 0);
        }
      }
      class Ce extends Mt {
        constructor() {
          super(...arguments), (this.type = "mask");
        }
        apply(t, e) {
          var { document: r } = this,
            i = this.getAttribute("x").getPixels("x"),
            n = this.getAttribute("y").getPixels("y"),
            s = this.getStyle("width").getPixels("x"),
            a = this.getStyle("height").getPixels("y");
          if (!s && !a) {
            var o = new It();
            this.children.forEach((e) => {
              o.addBoundingBox(e.getBoundingBox(t));
            }),
              (i = Math.floor(o.x1)),
              (n = Math.floor(o.y1)),
              (s = Math.floor(o.width)),
              (a = Math.floor(o.height));
          }
          var h = this.removeStyles(e, Ce.ignoreStyles),
            u = r.createCanvas(i + s, n + a),
            l = u.getContext("2d");
          r.screen.setDefaults(l),
            this.renderChildren(l),
            new Oe(r, {
              nodeType: 1,
              childNodes: [],
              attributes: [
                { nodeName: "type", value: "luminanceToAlpha" },
                { nodeName: "includeOpacity", value: "true" },
              ],
            }).apply(l, 0, 0, i + s, n + a);
          var c = r.createCanvas(i + s, n + a),
            g = c.getContext("2d");
          r.screen.setDefaults(g),
            e.render(g),
            (g.globalCompositeOperation = "destination-in"),
            (g.fillStyle = l.createPattern(u, "no-repeat")),
            g.fillRect(0, 0, i + s, n + a),
            (t.fillStyle = g.createPattern(c, "no-repeat")),
            t.fillRect(0, 0, i + s, n + a),
            this.restoreStyles(e, h);
        }
        render(t) {}
      }
      Ce.ignoreStyles = ["mask", "transform", "clip-path"];
      var Pe = () => {};
      class Ee extends Mt {
        constructor() {
          super(...arguments), (this.type = "clipPath");
        }
        apply(t) {
          var { document: e } = this,
            r = Reflect.getPrototypeOf(t),
            { beginPath: i, closePath: n } = t;
          r && ((r.beginPath = Pe), (r.closePath = Pe)),
            Reflect.apply(i, t, []),
            this.children.forEach((i) => {
              if ("undefined" !== typeof i.path) {
                var s =
                  "undefined" !== typeof i.elementTransform
                    ? i.elementTransform()
                    : null;
                s || (s = Et.fromElement(e, i)),
                  s && s.apply(t),
                  i.path(t),
                  r && (r.closePath = n),
                  s && s.unapply(t);
              }
            }),
            Reflect.apply(n, t, []),
            t.clip(),
            r && ((r.beginPath = i), (r.closePath = n));
        }
        render(t) {}
      }
      class Me extends Mt {
        constructor() {
          super(...arguments), (this.type = "filter");
        }
        apply(t, e) {
          var { document: r, children: i } = this,
            n = e.getBoundingBox(t);
          if (n) {
            var s = 0,
              a = 0;
            i.forEach((t) => {
              var e = t.extraFilterDistance || 0;
              (s = Math.max(s, e)), (a = Math.max(a, e));
            });
            var o = Math.floor(n.width),
              h = Math.floor(n.height),
              u = o + 2 * s,
              l = h + 2 * a;
            if (!(u < 1 || l < 1)) {
              var c = Math.floor(n.x),
                g = Math.floor(n.y),
                p = this.removeStyles(e, Me.ignoreStyles),
                f = r.createCanvas(u, l),
                d = f.getContext("2d");
              r.screen.setDefaults(d),
                d.translate(-c + s, -g + a),
                e.render(d),
                i.forEach((t) => {
                  "function" === typeof t.apply && t.apply(d, 0, 0, u, l);
                }),
                t.drawImage(f, 0, 0, u, l, c - s, g - a, u, l),
                this.restoreStyles(e, p);
            }
          }
        }
        render(t) {}
      }
      Me.ignoreStyles = ["filter", "transform", "clip-path"];
      class Ne extends Mt {
        constructor(t, e, r) {
          super(t, e, r),
            (this.type = "feDropShadow"),
            this.addStylesFromStyleDefinition();
        }
        apply(t, e, r, i, n) {}
      }
      class _e extends Mt {
        constructor() {
          super(...arguments), (this.type = "feMorphology");
        }
        apply(t, e, r, i, n) {}
      }
      class Ve extends Mt {
        constructor() {
          super(...arguments), (this.type = "feComposite");
        }
        apply(t, e, r, i, n) {}
      }
      class Re extends Mt {
        constructor(t, e, r) {
          super(t, e, r),
            (this.type = "feGaussianBlur"),
            (this.blurRadius = Math.floor(
              this.getAttribute("stdDeviation").getNumber()
            )),
            (this.extraFilterDistance = this.blurRadius);
        }
        apply(t, e, r, i, n) {
          var { document: s, blurRadius: a } = this,
            o = s.window ? s.window.document.body : null,
            h = t.canvas;
          (h.id = s.getUniqueId()),
            o && ((h.style.display = "none"), o.appendChild(h)),
            k(h, e, r, i, n, a),
            o && o.removeChild(h);
        }
      }
      class ke extends Mt {
        constructor() {
          super(...arguments), (this.type = "title");
        }
      }
      class Ie extends Mt {
        constructor() {
          super(...arguments), (this.type = "desc");
        }
      }
      var Le = {
        svg: Ut,
        rect: Xt,
        circle: Yt,
        ellipse: qt,
        line: Gt,
        polyline: Wt,
        polygon: Qt,
        path: Bt,
        pattern: $t,
        marker: Zt,
        defs: Kt,
        linearGradient: ee,
        radialGradient: re,
        stop: ie,
        animate: ne,
        animateColor: se,
        animateTransform: ae,
        font: oe,
        "font-face": he,
        "missing-glyph": ue,
        glyph: zt,
        text: Ft,
        tspan: jt,
        tref: le,
        a: ce,
        textPath: fe,
        image: ye,
        g: Jt,
        symbol: ve,
        style: xe,
        use: be,
        mask: Ce,
        clipPath: Ee,
        filter: Me,
        feDropShadow: Ne,
        feMorphology: _e,
        feComposite: Ve,
        feColorMatrix: Oe,
        feGaussianBlur: Re,
        title: ke,
        desc: Ie,
      };
      function De(t, e) {
        var r = Object.keys(t);
        if (Object.getOwnPropertySymbols) {
          var i = Object.getOwnPropertySymbols(t);
          e &&
            (i = i.filter(function (e) {
              return Object.getOwnPropertyDescriptor(t, e).enumerable;
            })),
            r.push.apply(r, i);
        }
        return r;
      }
      function Be() {
        return (
          (Be = n(function* (t) {
            var e =
                arguments.length > 1 && void 0 !== arguments[1] && arguments[1],
              r = document.createElement("img");
            return (
              e && (r.crossOrigin = "Anonymous"),
              new Promise((e, i) => {
                (r.onload = () => {
                  e(r);
                }),
                  (r.onerror = (t, e, r, n, s) => {
                    i(s);
                  }),
                  (r.src = t);
              })
            );
          })),
          Be.apply(this, arguments)
        );
      }
      class ze {
        constructor(t) {
          var {
            rootEmSize: e = 12,
            emSize: r = 12,
            createCanvas: i = ze.createCanvas,
            createImage: n = ze.createImage,
            anonymousCrossOrigin: s,
          } = arguments.length > 1 && void 0 !== arguments[1]
            ? arguments[1]
            : {};
          (this.canvg = t),
            (this.definitions = {}),
            (this.styles = {}),
            (this.stylesSpecificity = {}),
            (this.images = []),
            (this.fonts = []),
            (this.emSizeStack = []),
            (this.uniqueId = 0),
            (this.screen = t.screen),
            (this.rootEmSize = e),
            (this.emSize = r),
            (this.createCanvas = i),
            (this.createImage = this.bindCreateImage(n, s)),
            this.screen.wait(this.isImagesLoaded.bind(this)),
            this.screen.wait(this.isFontsLoaded.bind(this));
        }
        bindCreateImage(t, e) {
          return "boolean" === typeof e
            ? (r, i) => t(r, "boolean" === typeof i ? i : e)
            : t;
        }
        get window() {
          return this.screen.window;
        }
        get fetch() {
          return this.screen.fetch;
        }
        get ctx() {
          return this.screen.ctx;
        }
        get emSize() {
          var { emSizeStack: t } = this;
          return t[t.length - 1];
        }
        set emSize(t) {
          var { emSizeStack: e } = this;
          e.push(t);
        }
        popEmSize() {
          var { emSizeStack: t } = this;
          t.pop();
        }
        getUniqueId() {
          return "canvg".concat(++this.uniqueId);
        }
        isImagesLoaded() {
          return this.images.every((t) => t.loaded);
        }
        isFontsLoaded() {
          return this.fonts.every((t) => t.loaded);
        }
        createDocumentElement(t) {
          var e = this.createElement(t.documentElement);
          return (
            (e.root = !0),
            e.addStylesFromStyleDefinition(),
            (this.documentElement = e),
            e
          );
        }
        createElement(t) {
          var e = t.nodeName.replace(/^[^:]+:/, ""),
            r = ze.elementTypes[e];
          return "undefined" !== typeof r ? new r(this, t) : new Nt(this, t);
        }
        createTextNode(t) {
          return new Ht(this, t);
        }
        setViewBox(t) {
          this.screen.setViewBox(
            (function (t) {
              for (var e = 1; e < arguments.length; e++) {
                var r = null != arguments[e] ? arguments[e] : {};
                e % 2
                  ? De(Object(r), !0).forEach(function (e) {
                      o(t, e, r[e]);
                    })
                  : Object.getOwnPropertyDescriptors
                    ? Object.defineProperties(
                        t,
                        Object.getOwnPropertyDescriptors(r)
                      )
                    : De(Object(r)).forEach(function (e) {
                        Object.defineProperty(
                          t,
                          e,
                          Object.getOwnPropertyDescriptor(r, e)
                        );
                      });
              }
              return t;
            })({ document: this }, t)
          );
        }
      }
      function Fe(t, e) {
        var r = Object.keys(t);
        if (Object.getOwnPropertySymbols) {
          var i = Object.getOwnPropertySymbols(t);
          e &&
            (i = i.filter(function (e) {
              return Object.getOwnPropertyDescriptor(t, e).enumerable;
            })),
            r.push.apply(r, i);
        }
        return r;
      }
      function je(t) {
        for (var e = 1; e < arguments.length; e++) {
          var r = null != arguments[e] ? arguments[e] : {};
          e % 2
            ? Fe(Object(r), !0).forEach(function (e) {
                o(t, e, r[e]);
              })
            : Object.getOwnPropertyDescriptors
              ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(r))
              : Fe(Object(r)).forEach(function (e) {
                  Object.defineProperty(
                    t,
                    e,
                    Object.getOwnPropertyDescriptor(r, e)
                  );
                });
        }
        return t;
      }
      (ze.createCanvas = function (t, e) {
        var r = document.createElement("canvas");
        return (r.width = t), (r.height = e), r;
      }),
        (ze.createImage = function (t) {
          return Be.apply(this, arguments);
        }),
        (ze.elementTypes = Le);
      class He {
        constructor(t, e) {
          var r =
            arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
          (this.parser = new bt(r)),
            (this.screen = new vt(t, r)),
            (this.options = r);
          var i = new ze(this, r),
            n = i.createDocumentElement(e);
          (this.document = i), (this.documentElement = n);
        }
        static from(t, e) {
          var r = arguments;
          return n(function* () {
            var i = r.length > 2 && void 0 !== r[2] ? r[2] : {},
              n = new bt(i),
              s = yield n.parse(e);
            return new He(t, s, i);
          })();
        }
        static fromString(t, e) {
          var r =
              arguments.length > 2 && void 0 !== arguments[2]
                ? arguments[2]
                : {},
            i = new bt(r).parseFromString(e);
          return new He(t, i, r);
        }
        fork(t, e) {
          var r =
            arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
          return He.from(t, e, je(je({}, this.options), r));
        }
        forkString(t, e) {
          var r =
            arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
          return He.fromString(t, e, je(je({}, this.options), r));
        }
        ready() {
          return this.screen.ready();
        }
        isReady() {
          return this.screen.isReady();
        }
        render() {
          var t = arguments,
            e = this;
          return n(function* () {
            var r = t.length > 0 && void 0 !== t[0] ? t[0] : {};
            e.start(
              je({ enableRedraw: !0, ignoreAnimation: !0, ignoreMouse: !0 }, r)
            ),
              yield e.ready(),
              e.stop();
          })();
        }
        start() {
          var t =
              arguments.length > 0 && void 0 !== arguments[0]
                ? arguments[0]
                : {},
            { documentElement: e, screen: r, options: i } = this;
          r.start(e, je(je({ enableRedraw: !0 }, i), t));
        }
        stop() {
          this.screen.stop();
        }
        resize(t) {
          var e =
              arguments.length > 1 && void 0 !== arguments[1]
                ? arguments[1]
                : t,
            r = arguments.length > 2 && void 0 !== arguments[2] && arguments[2];
          this.documentElement.resize(t, e, r);
        }
      }
    },
  },
]);
//# sourceMappingURL=64.631a6e93.chunk.js.map
