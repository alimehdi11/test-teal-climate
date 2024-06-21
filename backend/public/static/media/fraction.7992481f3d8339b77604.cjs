/*! For license information please see fraction.7992481f3d8339b77604.cjs.LICENSE.txt */
!(function (t) {
  "use strict";
  var n = { s: 1, n: 0, d: 1 };
  function i(t, n) {
    if (isNaN((t = parseInt(t, 10)))) throw f();
    return t * n;
  }
  function r(t, n) {
    if (0 === n) throw u();
    var i = Object.create(o.prototype);
    i.s = t < 0 ? -1 : 1;
    var r = e((t = t < 0 ? -t : t), n);
    return (i.n = t / r), (i.d = n / r), i;
  }
  function s(t) {
    for (var n = {}, i = t, r = 2, s = 4; s <= i; ) {
      for (; i % r === 0; ) (i /= r), (n[r] = (n[r] || 0) + 1);
      s += 1 + 2 * r++;
    }
    return (
      i !== t ? i > 1 && (n[i] = (n[i] || 0) + 1) : (n[t] = (n[t] || 0) + 1), n
    );
  }
  var h = function (t, r) {
    var s,
      h = 0,
      e = 1,
      o = 1,
      d = 0,
      c = 0,
      l = 0,
      N = 1,
      v = 1,
      w = 0,
      p = 1,
      M = 1,
      b = 1,
      g = 1e7;
    if (void 0 === t || null === t);
    else if (void 0 !== r) {
      if (((o = (h = t) * (e = r)), h % 1 !== 0 || e % 1 !== 0)) throw a();
    } else
      switch (typeof t) {
        case "object":
          if ("d" in t && "n" in t)
            (h = t.n), (e = t.d), "s" in t && (h *= t.s);
          else {
            if (!(0 in t)) throw f();
            (h = t[0]), 1 in t && (e = t[1]);
          }
          o = h * e;
          break;
        case "number":
          if ((t < 0 && ((o = t), (t = -t)), t % 1 === 0)) h = t;
          else if (t > 0) {
            for (
              t >= 1 &&
              (t /= v = Math.pow(10, Math.floor(1 + Math.log(t) / Math.LN10)));
              p <= g && b <= g;

            ) {
              if (t === (s = (w + M) / (p + b))) {
                p + b <= g
                  ? ((h = w + M), (e = p + b))
                  : b > p
                    ? ((h = M), (e = b))
                    : ((h = w), (e = p));
                break;
              }
              t > s ? ((w += M), (p += b)) : ((M += w), (b += p)),
                p > g ? ((h = M), (e = b)) : ((h = w), (e = p));
            }
            h *= v;
          } else (isNaN(t) || isNaN(r)) && (e = h = NaN);
          break;
        case "string":
          if (null === (p = t.match(/\d+|./g))) throw f();
          if (
            ("-" === p[w] ? ((o = -1), w++) : "+" === p[w] && w++,
            p.length === w + 1
              ? (c = i(p[w++], o))
              : "." === p[w + 1] || "." === p[w]
                ? ("." !== p[w] && (d = i(p[w++], o)),
                  (++w + 1 === p.length ||
                    ("(" === p[w + 1] && ")" === p[w + 3]) ||
                    ("'" === p[w + 1] && "'" === p[w + 3])) &&
                    ((c = i(p[w], o)), (N = Math.pow(10, p[w].length)), w++),
                  (("(" === p[w] && ")" === p[w + 2]) ||
                    ("'" === p[w] && "'" === p[w + 2])) &&
                    ((l = i(p[w + 1], o)),
                    (v = Math.pow(10, p[w + 1].length) - 1),
                    (w += 3)))
                : "/" === p[w + 1] || ":" === p[w + 1]
                  ? ((c = i(p[w], o)), (N = i(p[w + 2], 1)), (w += 3))
                  : "/" === p[w + 3] &&
                    " " === p[w + 1] &&
                    ((d = i(p[w], o)),
                    (c = i(p[w + 2], o)),
                    (N = i(p[w + 4], 1)),
                    (w += 5)),
            p.length <= w)
          ) {
            o = h = l + (e = N * v) * d + v * c;
            break;
          }
        default:
          throw f();
      }
    if (0 === e) throw u();
    (n.s = o < 0 ? -1 : 1), (n.n = Math.abs(h)), (n.d = Math.abs(e));
  };
  function e(t, n) {
    if (!t) return n;
    if (!n) return t;
    for (;;) {
      if (!(t %= n)) return n;
      if (!(n %= t)) return t;
    }
  }
  function o(t, i) {
    if ((h(t, i), !(this instanceof o))) return r(n.s * n.n, n.d);
    (t = e(n.d, n.n)), (this.s = n.s), (this.n = n.n / t), (this.d = n.d / t);
  }
  var u = function () {
      return new Error("Division by Zero");
    },
    f = function () {
      return new Error("Invalid argument");
    },
    a = function () {
      return new Error("Parameters must be integer");
    };
  (o.prototype = {
    s: 1,
    n: 0,
    d: 1,
    abs: function () {
      return r(this.n, this.d);
    },
    neg: function () {
      return r(-this.s * this.n, this.d);
    },
    add: function (t, i) {
      return (
        h(t, i), r(this.s * this.n * n.d + n.s * this.d * n.n, this.d * n.d)
      );
    },
    sub: function (t, i) {
      return (
        h(t, i), r(this.s * this.n * n.d - n.s * this.d * n.n, this.d * n.d)
      );
    },
    mul: function (t, i) {
      return h(t, i), r(this.s * n.s * this.n * n.n, this.d * n.d);
    },
    div: function (t, i) {
      return h(t, i), r(this.s * n.s * this.n * n.d, this.d * n.n);
    },
    clone: function () {
      return r(this.s * this.n, this.d);
    },
    mod: function (t, i) {
      if (isNaN(this.n) || isNaN(this.d)) return new o(NaN);
      if (void 0 === t) return r((this.s * this.n) % this.d, 1);
      if ((h(t, i), 0 === n.n && 0 === this.d)) throw u();
      return r((this.s * (n.d * this.n)) % (n.n * this.d), n.d * this.d);
    },
    gcd: function (t, i) {
      return h(t, i), r(e(n.n, this.n) * e(n.d, this.d), n.d * this.d);
    },
    lcm: function (t, i) {
      return (
        h(t, i),
        0 === n.n && 0 === this.n
          ? r(0, 1)
          : r(n.n * this.n, e(n.n, this.n) * e(n.d, this.d))
      );
    },
    ceil: function (t) {
      return (
        (t = Math.pow(10, t || 0)),
        isNaN(this.n) || isNaN(this.d)
          ? new o(NaN)
          : r(Math.ceil((t * this.s * this.n) / this.d), t)
      );
    },
    floor: function (t) {
      return (
        (t = Math.pow(10, t || 0)),
        isNaN(this.n) || isNaN(this.d)
          ? new o(NaN)
          : r(Math.floor((t * this.s * this.n) / this.d), t)
      );
    },
    round: function (t) {
      return (
        (t = Math.pow(10, t || 0)),
        isNaN(this.n) || isNaN(this.d)
          ? new o(NaN)
          : r(Math.round((t * this.s * this.n) / this.d), t)
      );
    },
    roundTo: function (t, i) {
      return (
        h(t, i),
        r(this.s * Math.round((this.n * n.d) / (this.d * n.n)) * n.n, n.d)
      );
    },
    inverse: function () {
      return r(this.s * this.d, this.n);
    },
    pow: function (t, i) {
      if ((h(t, i), 1 === n.d))
        return n.s < 0
          ? r(Math.pow(this.s * this.d, n.n), Math.pow(this.n, n.n))
          : r(Math.pow(this.s * this.n, n.n), Math.pow(this.d, n.n));
      if (this.s < 0) return null;
      var e = s(this.n),
        o = s(this.d),
        u = 1,
        f = 1;
      for (var a in e)
        if ("1" !== a) {
          if ("0" === a) {
            u = 0;
            break;
          }
          if (((e[a] *= n.n), e[a] % n.d !== 0)) return null;
          (e[a] /= n.d), (u *= Math.pow(a, e[a]));
        }
      for (var a in o)
        if ("1" !== a) {
          if (((o[a] *= n.n), o[a] % n.d !== 0)) return null;
          (o[a] /= n.d), (f *= Math.pow(a, o[a]));
        }
      return n.s < 0 ? r(f, u) : r(u, f);
    },
    equals: function (t, i) {
      return h(t, i), this.s * this.n * n.d === n.s * n.n * this.d;
    },
    compare: function (t, i) {
      h(t, i);
      var r = this.s * this.n * n.d - n.s * n.n * this.d;
      return (0 < r) - (r < 0);
    },
    simplify: function (t) {
      if (isNaN(this.n) || isNaN(this.d)) return this;
      t = t || 0.001;
      for (var n = this.abs(), i = n.toContinued(), s = 1; s < i.length; s++) {
        for (var h = r(i[s - 1], 1), e = s - 2; e >= 0; e--)
          h = h.inverse().add(i[e]);
        if (Math.abs(h.sub(n).valueOf()) < t) return h.mul(this.s);
      }
      return this;
    },
    divisible: function (t, i) {
      return h(t, i), !(!(n.n * this.d) || (this.n * n.d) % (n.n * this.d));
    },
    valueOf: function () {
      return (this.s * this.n) / this.d;
    },
    toFraction: function (t) {
      var n,
        i = "",
        r = this.n,
        s = this.d;
      return (
        this.s < 0 && (i += "-"),
        1 === s
          ? (i += r)
          : (t &&
              (n = Math.floor(r / s)) > 0 &&
              ((i += n), (i += " "), (r %= s)),
            (i += r),
            (i += "/"),
            (i += s)),
        i
      );
    },
    toLatex: function (t) {
      var n,
        i = "",
        r = this.n,
        s = this.d;
      return (
        this.s < 0 && (i += "-"),
        1 === s
          ? (i += r)
          : (t && (n = Math.floor(r / s)) > 0 && ((i += n), (r %= s)),
            (i += "\\frac{"),
            (i += r),
            (i += "}{"),
            (i += s),
            (i += "}")),
        i
      );
    },
    toContinued: function () {
      var t,
        n = this.n,
        i = this.d,
        r = [];
      if (isNaN(n) || isNaN(i)) return r;
      do {
        r.push(Math.floor(n / i)), (t = n % i), (n = i), (i = t);
      } while (1 !== n);
      return r;
    },
    toString: function (t) {
      var n = this.n,
        i = this.d;
      if (isNaN(n) || isNaN(i)) return "NaN";
      t = t || 15;
      var r = (function (t, n) {
          for (; n % 2 === 0; n /= 2);
          for (; n % 5 === 0; n /= 5);
          if (1 === n) return 0;
          for (var i = 10 % n, r = 1; 1 !== i; r++)
            if (((i = (10 * i) % n), r > 2e3)) return 0;
          return r;
        })(0, i),
        s = (function (t, n, i) {
          for (
            var r = 1,
              s = (function (t, n, i) {
                for (var r = 1; n > 0; t = (t * t) % i, n >>= 1)
                  1 & n && (r = (r * t) % i);
                return r;
              })(10, i, n),
              h = 0;
            h < 300;
            h++
          ) {
            if (r === s) return h;
            (r = (10 * r) % n), (s = (10 * s) % n);
          }
          return 0;
        })(0, i, r),
        h = this.s < 0 ? "-" : "";
      if (((h += (n / i) | 0), (n %= i), (n *= 10) && (h += "."), r)) {
        for (var e = s; e--; ) (h += (n / i) | 0), (n %= i), (n *= 10);
        h += "(";
        for (e = r; e--; ) (h += (n / i) | 0), (n %= i), (n *= 10);
        h += ")";
      } else for (e = t; n && e--; ) (h += (n / i) | 0), (n %= i), (n *= 10);
      return h;
    },
  }),
    "object" === typeof exports
      ? (Object.defineProperty(exports, "__esModule", { value: !0 }),
        (exports.default = o),
        (module.exports = o))
      : (t.Fraction = o);
})(this);
