// Version 1.5.2 three-conic-polygon-geometry - https://github.com/vasturiano/three-conic-polygon-geometry
! function(t, n) {
    "object" == typeof exports && "undefined" != typeof module ? n(exports, require("three")) : "function" == typeof define && define.amd ? define(["exports", "three"], n) : n((t = "undefined" != typeof globalThis ? globalThis : t || self).THREE = t.THREE || {}, t.THREE)
}(this, (function(t, n) {
    "use strict";

    function e(t, n) {
        for (var e = 0; e < n.length; e++) {
            var r = n[e];
            r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(t, r.key, r)
        }
    }

    function r(t) {
        return r = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(t) {
            return t.__proto__ || Object.getPrototypeOf(t)
        }, r(t)
    }

    function i(t, n) {
        return i = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(t, n) {
            return t.__proto__ = n, t
        }, i(t, n)
    }

    function o(t, n) {
        if (n && ("object" == typeof n || "function" == typeof n)) return n;
        if (void 0 !== n) throw new TypeError("Derived constructors may only return object or undefined");
        return function(t) {
            if (void 0 === t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return t
        }(t)
    }

    function u(t) {
        var n = function() {
            if ("undefined" == typeof Reflect || !Reflect.construct) return !1;
            if (Reflect.construct.sham) return !1;
            if ("function" == typeof Proxy) return !0;
            try {
                return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], (function() {}))), !0
            } catch (t) {
                return !1
            }
        }();
        return function() {
            var e, i = r(t);
            if (n) {
                var u = r(this).constructor;
                e = Reflect.construct(i, arguments, u)
            } else e = i.apply(this, arguments);
            return o(this, e)
        }
    }

    function a(t, n) {
        return function(t) {
            if (Array.isArray(t)) return t
        }(t) || function(t, n) {
            var e = null == t ? null : "undefined" != typeof Symbol && t[Symbol.iterator] || t["@@iterator"];
            if (null == e) return;
            var r, i, o = [],
                u = !0,
                a = !1;
            try {
                for (e = e.call(t); !(u = (r = e.next()).done) && (o.push(r.value), !n || o.length !== n); u = !0);
            } catch (t) {
                a = !0, i = t
            } finally {
                try {
                    u || null == e.return || e.return()
                } finally {
                    if (a) throw i
                }
            }
            return o
        }(t, n) || s(t, n) || function() {
            throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
        }()
    }

    function l(t) {
        return function(t) {
            if (Array.isArray(t)) return c(t)
        }(t) || function(t) {
            if ("undefined" != typeof Symbol && null != t[Symbol.iterator] || null != t["@@iterator"]) return Array.from(t)
        }(t) || s(t) || function() {
            throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
        }()
    }

    function s(t, n) {
        if (t) {
            if ("string" == typeof t) return c(t, n);
            var e = Object.prototype.toString.call(t).slice(8, -1);
            return "Object" === e && t.constructor && (e = t.constructor.name), "Map" === e || "Set" === e ? Array.from(t) : "Arguments" === e || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(e) ? c(t, n) : void 0
        }
    }

    function c(t, n) {
        (null == n || n > t.length) && (n = t.length);
        for (var e = 0, r = new Array(n); e < n; e++) r[e] = t[e];
        return r
    }

    function h(t, n) {
        return null == t || null == n ? NaN : t < n ? -1 : t > n ? 1 : t >= n ? 0 : NaN
    }

    function f(t, n) {
        return null == t || null == n ? NaN : n < t ? -1 : n > t ? 1 : n >= t ? 0 : NaN
    }

    function p(t) {
        let n, e, r;

        function i(t, r, i = 0, o = t.length) {
            if (i < o) {
                if (0 !== n(r, r)) return o;
                do {
                    const n = i + o >>> 1;
                    e(t[n], r) < 0 ? i = n + 1 : o = n
                } while (i < o)
            }
            return i
        }
        return 2 !== t.length ? (n = h, e = (n, e) => h(t(n), e), r = (n, e) => t(n) - e) : (n = t === h || t === f ? t : g, e = t, r = t), {
            left: i,
            center: function(t, n, e = 0, o = t.length) {
                const u = i(t, n, e, o - 1);
                return u > e && r(t[u - 1], n) > -r(t[u], n) ? u - 1 : u
            },
            right: function(t, r, i = 0, o = t.length) {
                if (i < o) {
                    if (0 !== n(r, r)) return o;
                    do {
                        const n = i + o >>> 1;
                        e(t[n], r) <= 0 ? i = n + 1 : o = n
                    } while (i < o)
                }
                return i
            }
        }
    }

    function g() {
        return 0
    }
    const d = p(h).right;
    p((function(t) {
        return null === t ? NaN : +t
    })).center;
    var y = d;

    function v(t, n) {
        let e, r;
        if (void 0 === n)
            for (const n of t) null != n && (void 0 === e ? n >= n && (e = r = n) : (e > n && (e = n), r < n && (r = n)));
        else {
            let i = -1;
            for (let o of t) null != (o = n(o, ++i, t)) && (void 0 === e ? o >= o && (e = r = o) : (e > o && (e = o), r < o && (r = o)))
        }
        return [e, r]
    }
    class m {
        constructor() {
            this._partials = new Float64Array(32), this._n = 0
        }
        add(t) {
            const n = this._partials;
            let e = 0;
            for (let r = 0; r < this._n && r < 32; r++) {
                const i = n[r],
                    o = t + i,
                    u = Math.abs(t) < Math.abs(i) ? t - (o - i) : i - (o - t);
                u && (n[e++] = u), t = o
            }
            return n[e] = t, this._n = e + 1, this
        }
        valueOf() {
            const t = this._partials;
            let n, e, r, i = this._n,
                o = 0;
            if (i > 0) {
                for (o = t[--i]; i > 0 && (n = o, e = t[--i], o = n + e, r = e - (o - n), !r););
                i > 0 && (r < 0 && t[i - 1] < 0 || r > 0 && t[i - 1] > 0) && (e = 2 * r, n = o + e, e == n - o && (o = n))
            }
            return o
        }
    }
    var x = Math.sqrt(50),
        w = Math.sqrt(10),
        b = Math.sqrt(2);

    function _(t, n, e) {
        var r = (n - t) / Math.max(0, e),
            i = Math.floor(Math.log(r) / Math.LN10),
            o = r / Math.pow(10, i);
        return i >= 0 ? (o >= x ? 10 : o >= w ? 5 : o >= b ? 2 : 1) * Math.pow(10, i) : -Math.pow(10, -i) / (o >= x ? 10 : o >= w ? 5 : o >= b ? 2 : 1)
    }

    function M(t, n) {
        let e = 0,
            r = 0;
        if (void 0 === n)
            for (let n of t) null != n && (n = +n) >= n && (++e, r += n);
        else {
            let i = -1;
            for (let o of t) null != (o = n(o, ++i, t)) && (o = +o) >= o && (++e, r += o)
        }
        if (e) return r / e
    }

    function E(t) {
        return Array.from(function*(t) {
            for (const n of t) yield* n
        }(t))
    }
    var S = {
        exports: {}
    };

    function N(t, n, e) {
        e = e || 2;
        var r, i, o, u, a, l, s, c = n && n.length,
            h = c ? n[0] * e : t.length,
            f = k(t, 0, h, e, !0),
            p = [];
        if (!f || f.next === f.prev) return p;
        if (c && (f = function(t, n, e, r) {
                var i, o, u, a = [];
                for (i = 0, o = n.length; i < o; i++)(u = k(t, n[i] * r, i < o - 1 ? n[i + 1] * r : t.length, r, !1)) === u.next && (u.steiner = !0), a.push(L(u));
                for (a.sort(z), i = 0; i < a.length; i++) e = I(a[i], e);
                return e
            }(t, n, f, e)), t.length > 80 * e) {
            r = o = t[0], i = u = t[1];
            for (var g = e; g < h; g += e)(a = t[g]) < r && (r = a), (l = t[g + 1]) < i && (i = l), a > o && (o = a), l > u && (u = l);
            s = 0 !== (s = Math.max(o - r, u - i)) ? 32767 / s : 0
        }
        return $(f, p, e, r, i, s, 0), p
    }

    function k(t, n, e, r, i) {
        var o, u;
        if (i === Y(t, n, e, r) > 0)
            for (o = n; o < e; o += r) u = V(o, t[o], t[o + 1], u);
        else
            for (o = e - r; o >= n; o -= r) u = V(o, t[o], t[o + 1], u);
        return u && C(u, u.next) && (X(u), u = u.next), u
    }

    function A(t, n) {
        if (!t) return t;
        n || (n = t);
        var e, r = t;
        do {
            if (e = !1, r.steiner || !C(r, r.next) && 0 !== H(r.prev, r, r.next)) r = r.next;
            else {
                if (X(r), (r = n = r.prev) === r.next) break;
                e = !0
            }
        } while (e || r !== n);
        return n
    }

    function $(t, n, e, r, i, o, u) {
        if (t) {
            !u && o && function(t, n, e, r) {
                var i = t;
                do {
                    0 === i.z && (i.z = Z(i.x, i.y, n, e, r)), i.prevZ = i.prev, i.nextZ = i.next, i = i.next
                } while (i !== t);
                i.prevZ.nextZ = null, i.prevZ = null,
                    function(t) {
                        var n, e, r, i, o, u, a, l, s = 1;
                        do {
                            for (e = t, t = null, o = null, u = 0; e;) {
                                for (u++, r = e, a = 0, n = 0; n < s && (a++, r = r.nextZ); n++);
                                for (l = s; a > 0 || l > 0 && r;) 0 !== a && (0 === l || !r || e.z <= r.z) ? (i = e, e = e.nextZ, a--) : (i = r, r = r.nextZ, l--), o ? o.nextZ = i : t = i, i.prevZ = o, o = i;
                                e = r
                            }
                            o.nextZ = null, s *= 2
                        } while (u > 1)
                    }(i)
            }(t, r, i, o);
            for (var a, l, s = t; t.prev !== t.next;)
                if (a = t.prev, l = t.next, o ? T(t, r, i, o) : P(t)) n.push(a.i / e | 0), n.push(t.i / e | 0), n.push(l.i / e | 0), X(t), t = l.next, s = l.next;
                else if ((t = l) === s) {
                u ? 1 === u ? $(t = j(A(t), n, e), n, e, r, i, o, 2) : 2 === u && F(t, n, e, r, i, o) : $(A(t), n, e, r, i, o, 1);
                break
            }
        }
    }

    function P(t) {
        var n = t.prev,
            e = t,
            r = t.next;
        if (H(n, e, r) >= 0) return !1;
        for (var i = n.x, o = e.x, u = r.x, a = n.y, l = e.y, s = r.y, c = i < o ? i < u ? i : u : o < u ? o : u, h = a < l ? a < s ? a : s : l < s ? l : s, f = i > o ? i > u ? i : u : o > u ? o : u, p = a > l ? a > s ? a : s : l > s ? l : s, g = r.next; g !== n;) {
            if (g.x >= c && g.x <= f && g.y >= h && g.y <= p && q(i, a, o, l, u, s, g.x, g.y) && H(g.prev, g, g.next) >= 0) return !1;
            g = g.next
        }
        return !0
    }

    function T(t, n, e, r) {
        var i = t.prev,
            o = t,
            u = t.next;
        if (H(i, o, u) >= 0) return !1;
        for (var a = i.x, l = o.x, s = u.x, c = i.y, h = o.y, f = u.y, p = a < l ? a < s ? a : s : l < s ? l : s, g = c < h ? c < f ? c : f : h < f ? h : f, d = a > l ? a > s ? a : s : l > s ? l : s, y = c > h ? c > f ? c : f : h > f ? h : f, v = Z(p, g, n, e, r), m = Z(d, y, n, e, r), x = t.prevZ, w = t.nextZ; x && x.z >= v && w && w.z <= m;) {
            if (x.x >= p && x.x <= d && x.y >= g && x.y <= y && x !== i && x !== u && q(a, c, l, h, s, f, x.x, x.y) && H(x.prev, x, x.next) >= 0) return !1;
            if (x = x.prevZ, w.x >= p && w.x <= d && w.y >= g && w.y <= y && w !== i && w !== u && q(a, c, l, h, s, f, w.x, w.y) && H(w.prev, w, w.next) >= 0) return !1;
            w = w.nextZ
        }
        for (; x && x.z >= v;) {
            if (x.x >= p && x.x <= d && x.y >= g && x.y <= y && x !== i && x !== u && q(a, c, l, h, s, f, x.x, x.y) && H(x.prev, x, x.next) >= 0) return !1;
            x = x.prevZ
        }
        for (; w && w.z <= m;) {
            if (w.x >= p && w.x <= d && w.y >= g && w.y <= y && w !== i && w !== u && q(a, c, l, h, s, f, w.x, w.y) && H(w.prev, w, w.next) >= 0) return !1;
            w = w.nextZ
        }
        return !0
    }

    function j(t, n, e) {
        var r = t;
        do {
            var i = r.prev,
                o = r.next.next;
            !C(i, o) && B(i, r, r.next, o) && K(i, o) && K(o, i) && (n.push(i.i / e | 0), n.push(r.i / e | 0), n.push(o.i / e | 0), X(r), X(r.next), r = t = o), r = r.next
        } while (r !== t);
        return A(r)
    }

    function F(t, n, e, r, i, o) {
        var u = t;
        do {
            for (var a = u.next.next; a !== u.prev;) {
                if (u.i !== a.i && R(u, a)) {
                    var l = D(u, a);
                    return u = A(u, u.next), l = A(l, l.next), $(u, n, e, r, i, o, 0), void $(l, n, e, r, i, o, 0)
                }
                a = a.next
            }
            u = u.next
        } while (u !== t)
    }

    function z(t, n) {
        return t.x - n.x
    }

    function I(t, n) {
        var e = function(t, n) {
            var e, r = n,
                i = t.x,
                o = t.y,
                u = -1 / 0;
            do {
                if (o <= r.y && o >= r.next.y && r.next.y !== r.y) {
                    var a = r.x + (o - r.y) * (r.next.x - r.x) / (r.next.y - r.y);
                    if (a <= i && a > u && (u = a, e = r.x < r.next.x ? r : r.next, a === i)) return e
                }
                r = r.next
            } while (r !== n);
            if (!e) return null;
            var l, s = e,
                c = e.x,
                h = e.y,
                f = 1 / 0;
            r = e;
            do {
                i >= r.x && r.x >= c && i !== r.x && q(o < h ? i : u, o, c, h, o < h ? u : i, o, r.x, r.y) && (l = Math.abs(o - r.y) / (i - r.x), K(r, t) && (l < f || l === f && (r.x > e.x || r.x === e.x && O(e, r))) && (e = r, f = l)), r = r.next
            } while (r !== s);
            return e
        }(t, n);
        if (!e) return n;
        var r = D(e, t);
        return A(r, r.next), A(e, e.next)
    }

    function O(t, n) {
        return H(t.prev, t, n.prev) < 0 && H(n.next, t, t.next) < 0
    }

    function Z(t, n, e, r, i) {
        return (t = 1431655765 & ((t = 858993459 & ((t = 252645135 & ((t = 16711935 & ((t = (t - e) * i | 0) | t << 8)) | t << 4)) | t << 2)) | t << 1)) | (n = 1431655765 & ((n = 858993459 & ((n = 252645135 & ((n = 16711935 & ((n = (n - r) * i | 0) | n << 8)) | n << 4)) | n << 2)) | n << 1)) << 1
    }

    function L(t) {
        var n = t,
            e = t;
        do {
            (n.x < e.x || n.x === e.x && n.y < e.y) && (e = n), n = n.next
        } while (n !== t);
        return e
    }

    function q(t, n, e, r, i, o, u, a) {
        return (i - u) * (n - a) >= (t - u) * (o - a) && (t - u) * (r - a) >= (e - u) * (n - a) && (e - u) * (o - a) >= (i - u) * (r - a)
    }

    function R(t, n) {
        return t.next.i !== n.i && t.prev.i !== n.i && ! function(t, n) {
            var e = t;
            do {
                if (e.i !== t.i && e.next.i !== t.i && e.i !== n.i && e.next.i !== n.i && B(e, e.next, t, n)) return !0;
                e = e.next
            } while (e !== t);
            return !1
        }(t, n) && (K(t, n) && K(n, t) && function(t, n) {
            var e = t,
                r = !1,
                i = (t.x + n.x) / 2,
                o = (t.y + n.y) / 2;
            do {
                e.y > o != e.next.y > o && e.next.y !== e.y && i < (e.next.x - e.x) * (o - e.y) / (e.next.y - e.y) + e.x && (r = !r), e = e.next
            } while (e !== t);
            return r
        }(t, n) && (H(t.prev, t, n.prev) || H(t, n.prev, n)) || C(t, n) && H(t.prev, t, t.next) > 0 && H(n.prev, n, n.next) > 0)
    }

    function H(t, n, e) {
        return (n.y - t.y) * (e.x - n.x) - (n.x - t.x) * (e.y - n.y)
    }

    function C(t, n) {
        return t.x === n.x && t.y === n.y
    }

    function B(t, n, e, r) {
        var i = U(H(t, n, e)),
            o = U(H(t, n, r)),
            u = U(H(e, r, t)),
            a = U(H(e, r, n));
        return i !== o && u !== a || (!(0 !== i || !G(t, e, n)) || (!(0 !== o || !G(t, r, n)) || (!(0 !== u || !G(e, t, r)) || !(0 !== a || !G(e, n, r)))))
    }

    function G(t, n, e) {
        return n.x <= Math.max(t.x, e.x) && n.x >= Math.min(t.x, e.x) && n.y <= Math.max(t.y, e.y) && n.y >= Math.min(t.y, e.y)
    }

    function U(t) {
        return t > 0 ? 1 : t < 0 ? -1 : 0
    }

    function K(t, n) {
        return H(t.prev, t, t.next) < 0 ? H(t, n, t.next) >= 0 && H(t, t.prev, n) >= 0 : H(t, n, t.prev) < 0 || H(t, t.next, n) < 0
    }

    function D(t, n) {
        var e = new J(t.i, t.x, t.y),
            r = new J(n.i, n.x, n.y),
            i = t.next,
            o = n.prev;
        return t.next = n, n.prev = t, e.next = i, i.prev = e, r.next = e, e.prev = r, o.next = r, r.prev = o, r
    }

    function V(t, n, e, r) {
        var i = new J(t, n, e);
        return r ? (i.next = r.next, i.prev = r, r.next.prev = i, r.next = i) : (i.prev = i, i.next = i), i
    }

    function X(t) {
        t.next.prev = t.prev, t.prev.next = t.next, t.prevZ && (t.prevZ.nextZ = t.nextZ), t.nextZ && (t.nextZ.prevZ = t.prevZ)
    }

    function J(t, n, e) {
        this.i = t, this.x = n, this.y = e, this.prev = null, this.next = null, this.z = 0, this.prevZ = null, this.nextZ = null, this.steiner = !1
    }

    function Y(t, n, e, r) {
        for (var i = 0, o = n, u = e - r; o < e; o += r) i += (t[u] - t[o]) * (t[o + 1] + t[u + 1]), u = o;
        return i
    }
    S.exports = N, S.exports.default = N, N.deviation = function(t, n, e, r) {
        var i = n && n.length,
            o = i ? n[0] * e : t.length,
            u = Math.abs(Y(t, 0, o, e));
        if (i)
            for (var a = 0, l = n.length; a < l; a++) {
                var s = n[a] * e,
                    c = a < l - 1 ? n[a + 1] * e : t.length;
                u -= Math.abs(Y(t, s, c, e))
            }
        var h = 0;
        for (a = 0; a < r.length; a += 3) {
            var f = r[a] * e,
                p = r[a + 1] * e,
                g = r[a + 2] * e;
            h += Math.abs((t[f] - t[g]) * (t[p + 1] - t[f + 1]) - (t[f] - t[p]) * (t[g + 1] - t[f + 1]))
        }
        return 0 === u && 0 === h ? 0 : Math.abs((h - u) / u)
    }, N.flatten = function(t) {
        for (var n = t[0][0].length, e = {
                vertices: [],
                holes: [],
                dimensions: n
            }, r = 0, i = 0; i < t.length; i++) {
            for (var o = 0; o < t[i].length; o++)
                for (var u = 0; u < n; u++) e.vertices.push(t[i][o][u]);
            i > 0 && (r += t[i - 1].length, e.holes.push(r))
        }
        return e
    };
    const W = 134217729;

    function Q(t, n, e, r, i) {
        let o, u, a, l, s = n[0],
            c = r[0],
            h = 0,
            f = 0;
        c > s == c > -s ? (o = s, s = n[++h]) : (o = c, c = r[++f]);
        let p = 0;
        if (h < t && f < e)
            for (c > s == c > -s ? (u = s + o, a = o - (u - s), s = n[++h]) : (u = c + o, a = o - (u - c), c = r[++f]), o = u, 0 !== a && (i[p++] = a); h < t && f < e;) c > s == c > -s ? (u = o + s, l = u - o, a = o - (u - l) + (s - l), s = n[++h]) : (u = o + c, l = u - o, a = o - (u - l) + (c - l), c = r[++f]), o = u, 0 !== a && (i[p++] = a);
        for (; h < t;) u = o + s, l = u - o, a = o - (u - l) + (s - l), s = n[++h], o = u, 0 !== a && (i[p++] = a);
        for (; f < e;) u = o + c, l = u - o, a = o - (u - l) + (c - l), c = r[++f], o = u, 0 !== a && (i[p++] = a);
        return 0 === o && 0 !== p || (i[p++] = o), p
    }

    function tt(t) {
        return new Float64Array(t)
    }
    const nt = tt(4),
        et = tt(8),
        rt = tt(12),
        it = tt(16),
        ot = tt(4);

    function ut(t, n, e, r, i, o) {
        const u = (n - o) * (e - i),
            a = (t - i) * (r - o),
            l = u - a;
        if (0 === u || 0 === a || u > 0 != a > 0) return l;
        const s = Math.abs(u + a);
        return Math.abs(l) >= 33306690738754716e-32 * s ? l : - function(t, n, e, r, i, o, u) {
            let a, l, s, c, h, f, p, g, d, y, v, m, x, w, b, _, M, E;
            const S = t - i,
                N = e - i,
                k = n - o,
                A = r - o;
            w = S * A, f = W * S, p = f - (f - S), g = S - p, f = W * A, d = f - (f - A), y = A - d, b = g * y - (w - p * d - g * d - p * y), _ = k * N, f = W * k, p = f - (f - k), g = k - p, f = W * N, d = f - (f - N), y = N - d, M = g * y - (_ - p * d - g * d - p * y), v = b - M, h = b - v, nt[0] = b - (v + h) + (h - M), m = w + v, h = m - w, x = w - (m - h) + (v - h), v = x - _, h = x - v, nt[1] = x - (v + h) + (h - _), E = m + v, h = E - m, nt[2] = m - (E - h) + (v - h), nt[3] = E;
            let $ = function(t, n) {
                    let e = n[0];
                    for (let r = 1; r < t; r++) e += n[r];
                    return e
                }(4, nt),
                P = 22204460492503146e-32 * u;
            if ($ >= P || -$ >= P) return $;
            if (h = t - S, a = t - (S + h) + (h - i), h = e - N, s = e - (N + h) + (h - i), h = n - k, l = n - (k + h) + (h - o), h = r - A, c = r - (A + h) + (h - o), 0 === a && 0 === l && 0 === s && 0 === c) return $;
            if (P = 11093356479670487e-47 * u + 33306690738754706e-32 * Math.abs($), $ += S * c + A * a - (k * s + N * l), $ >= P || -$ >= P) return $;
            w = a * A, f = W * a, p = f - (f - a), g = a - p, f = W * A, d = f - (f - A), y = A - d, b = g * y - (w - p * d - g * d - p * y), _ = l * N, f = W * l, p = f - (f - l), g = l - p, f = W * N, d = f - (f - N), y = N - d, M = g * y - (_ - p * d - g * d - p * y), v = b - M, h = b - v, ot[0] = b - (v + h) + (h - M), m = w + v, h = m - w, x = w - (m - h) + (v - h), v = x - _, h = x - v, ot[1] = x - (v + h) + (h - _), E = m + v, h = E - m, ot[2] = m - (E - h) + (v - h), ot[3] = E;
            const T = Q(4, nt, 4, ot, et);
            w = S * c, f = W * S, p = f - (f - S), g = S - p, f = W * c, d = f - (f - c), y = c - d, b = g * y - (w - p * d - g * d - p * y), _ = k * s, f = W * k, p = f - (f - k), g = k - p, f = W * s, d = f - (f - s), y = s - d, M = g * y - (_ - p * d - g * d - p * y), v = b - M, h = b - v, ot[0] = b - (v + h) + (h - M), m = w + v, h = m - w, x = w - (m - h) + (v - h), v = x - _, h = x - v, ot[1] = x - (v + h) + (h - _), E = m + v, h = E - m, ot[2] = m - (E - h) + (v - h), ot[3] = E;
            const j = Q(T, et, 4, ot, rt);
            w = a * c, f = W * a, p = f - (f - a), g = a - p, f = W * c, d = f - (f - c), y = c - d, b = g * y - (w - p * d - g * d - p * y), _ = l * s, f = W * l, p = f - (f - l), g = l - p, f = W * s, d = f - (f - s), y = s - d, M = g * y - (_ - p * d - g * d - p * y), v = b - M, h = b - v, ot[0] = b - (v + h) + (h - M), m = w + v, h = m - w, x = w - (m - h) + (v - h), v = x - _, h = x - v, ot[1] = x - (v + h) + (h - _), E = m + v, h = E - m, ot[2] = m - (E - h) + (v - h), ot[3] = E;
            const F = Q(j, rt, 4, ot, it);
            return it[F - 1]
        }(t, n, e, r, i, o, s)
    }
    const at = Math.pow(2, -52),
        lt = new Uint32Array(512);
    class st {
        static from(t, n = dt, e = yt) {
            const r = t.length,
                i = new Float64Array(2 * r);
            for (let o = 0; o < r; o++) {
                const r = t[o];
                i[2 * o] = n(r), i[2 * o + 1] = e(r)
            }
            return new st(i)
        }
        constructor(t) {
            const n = t.length >> 1;
            if (n > 0 && "number" != typeof t[0]) throw new Error("Expected coords to contain numbers.");
            this.coords = t;
            const e = Math.max(2 * n - 5, 0);
            this._triangles = new Uint32Array(3 * e), this._halfedges = new Int32Array(3 * e), this._hashSize = Math.ceil(Math.sqrt(n)), this._hullPrev = new Uint32Array(n), this._hullNext = new Uint32Array(n), this._hullTri = new Uint32Array(n), this._hullHash = new Int32Array(this._hashSize).fill(-1), this._ids = new Uint32Array(n), this._dists = new Float64Array(n), this.update()
        }
        update() {
            const {
                coords: t,
                _hullPrev: n,
                _hullNext: e,
                _hullTri: r,
                _hullHash: i
            } = this, o = t.length >> 1;
            let u = 1 / 0,
                a = 1 / 0,
                l = -1 / 0,
                s = -1 / 0;
            for (let n = 0; n < o; n++) {
                const e = t[2 * n],
                    r = t[2 * n + 1];
                e < u && (u = e), r < a && (a = r), e > l && (l = e), r > s && (s = r), this._ids[n] = n
            }
            const c = (u + l) / 2,
                h = (a + s) / 2;
            let f, p, g, d = 1 / 0;
            for (let n = 0; n < o; n++) {
                const e = ct(c, h, t[2 * n], t[2 * n + 1]);
                e < d && (f = n, d = e)
            }
            const y = t[2 * f],
                v = t[2 * f + 1];
            d = 1 / 0;
            for (let n = 0; n < o; n++) {
                if (n === f) continue;
                const e = ct(y, v, t[2 * n], t[2 * n + 1]);
                e < d && e > 0 && (p = n, d = e)
            }
            let m = t[2 * p],
                x = t[2 * p + 1],
                w = 1 / 0;
            for (let n = 0; n < o; n++) {
                if (n === f || n === p) continue;
                const e = ft(y, v, m, x, t[2 * n], t[2 * n + 1]);
                e < w && (g = n, w = e)
            }
            let b = t[2 * g],
                _ = t[2 * g + 1];
            if (w === 1 / 0) {
                for (let n = 0; n < o; n++) this._dists[n] = t[2 * n] - t[0] || t[2 * n + 1] - t[1];
                pt(this._ids, this._dists, 0, o - 1);
                const n = new Uint32Array(o);
                let e = 0;
                for (let t = 0, r = -1 / 0; t < o; t++) {
                    const i = this._ids[t];
                    this._dists[i] > r && (n[e++] = i, r = this._dists[i])
                }
                return this.hull = n.subarray(0, e), this.triangles = new Uint32Array(0), void(this.halfedges = new Uint32Array(0))
            }
            if (ut(y, v, m, x, b, _) < 0) {
                const t = p,
                    n = m,
                    e = x;
                p = g, m = b, x = _, g = t, b = n, _ = e
            }
            const M = function(t, n, e, r, i, o) {
                const u = e - t,
                    a = r - n,
                    l = i - t,
                    s = o - n,
                    c = u * u + a * a,
                    h = l * l + s * s,
                    f = .5 / (u * s - a * l);
                return {
                    x: t + (s * c - a * h) * f,
                    y: n + (u * h - l * c) * f
                }
            }(y, v, m, x, b, _);
            this._cx = M.x, this._cy = M.y;
            for (let n = 0; n < o; n++) this._dists[n] = ct(t[2 * n], t[2 * n + 1], M.x, M.y);
            pt(this._ids, this._dists, 0, o - 1), this._hullStart = f;
            let E = 3;
            e[f] = n[g] = p, e[p] = n[f] = g, e[g] = n[p] = f, r[f] = 0, r[p] = 1, r[g] = 2, i.fill(-1), i[this._hashKey(y, v)] = f, i[this._hashKey(m, x)] = p, i[this._hashKey(b, _)] = g, this.trianglesLen = 0, this._addTriangle(f, p, g, -1, -1, -1);
            for (let o, u, a = 0; a < this._ids.length; a++) {
                const l = this._ids[a],
                    s = t[2 * l],
                    c = t[2 * l + 1];
                if (a > 0 && Math.abs(s - o) <= at && Math.abs(c - u) <= at) continue;
                if (o = s, u = c, l === f || l === p || l === g) continue;
                let h = 0;
                for (let t = 0, n = this._hashKey(s, c); t < this._hashSize && (h = i[(n + t) % this._hashSize], -1 === h || h === e[h]); t++);
                h = n[h];
                let d, y = h;
                for (; d = e[y], ut(s, c, t[2 * y], t[2 * y + 1], t[2 * d], t[2 * d + 1]) >= 0;)
                    if (y = d, y === h) {
                        y = -1;
                        break
                    } if (-1 === y) continue;
                let v = this._addTriangle(y, l, e[y], -1, -1, r[y]);
                r[l] = this._legalize(v + 2), r[y] = v, E++;
                let m = e[y];
                for (; d = e[m], ut(s, c, t[2 * m], t[2 * m + 1], t[2 * d], t[2 * d + 1]) < 0;) v = this._addTriangle(m, l, d, r[l], -1, r[m]), r[l] = this._legalize(v + 2), e[m] = m, E--, m = d;
                if (y === h)
                    for (; d = n[y], ut(s, c, t[2 * d], t[2 * d + 1], t[2 * y], t[2 * y + 1]) < 0;) v = this._addTriangle(d, l, y, -1, r[y], r[d]), this._legalize(v + 2), r[d] = v, e[y] = y, E--, y = d;
                this._hullStart = n[l] = y, e[y] = n[m] = l, e[l] = m, i[this._hashKey(s, c)] = l, i[this._hashKey(t[2 * y], t[2 * y + 1])] = y
            }
            this.hull = new Uint32Array(E);
            for (let t = 0, n = this._hullStart; t < E; t++) this.hull[t] = n, n = e[n];
            this.triangles = this._triangles.subarray(0, this.trianglesLen), this.halfedges = this._halfedges.subarray(0, this.trianglesLen)
        }
        _hashKey(t, n) {
            return Math.floor(function(t, n) {
                const e = t / (Math.abs(t) + Math.abs(n));
                return (n > 0 ? 3 - e : 1 + e) / 4
            }(t - this._cx, n - this._cy) * this._hashSize) % this._hashSize
        }
        _legalize(t) {
            const {
                _triangles: n,
                _halfedges: e,
                coords: r
            } = this;
            let i = 0,
                o = 0;
            for (;;) {
                const u = e[t],
                    a = t - t % 3;
                if (o = a + (t + 2) % 3, -1 === u) {
                    if (0 === i) break;
                    t = lt[--i];
                    continue
                }
                const l = u - u % 3,
                    s = a + (t + 1) % 3,
                    c = l + (u + 2) % 3,
                    h = n[o],
                    f = n[t],
                    p = n[s],
                    g = n[c];
                if (ht(r[2 * h], r[2 * h + 1], r[2 * f], r[2 * f + 1], r[2 * p], r[2 * p + 1], r[2 * g], r[2 * g + 1])) {
                    n[t] = g, n[u] = h;
                    const r = e[c];
                    if (-1 === r) {
                        let n = this._hullStart;
                        do {
                            if (this._hullTri[n] === c) {
                                this._hullTri[n] = t;
                                break
                            }
                            n = this._hullPrev[n]
                        } while (n !== this._hullStart)
                    }
                    this._link(t, r), this._link(u, e[o]), this._link(o, c);
                    const a = l + (u + 1) % 3;
                    i < lt.length && (lt[i++] = a)
                } else {
                    if (0 === i) break;
                    t = lt[--i]
                }
            }
            return o
        }
        _link(t, n) {
            this._halfedges[t] = n, -1 !== n && (this._halfedges[n] = t)
        }
        _addTriangle(t, n, e, r, i, o) {
            const u = this.trianglesLen;
            return this._triangles[u] = t, this._triangles[u + 1] = n, this._triangles[u + 2] = e, this._link(u, r), this._link(u + 1, i), this._link(u + 2, o), this.trianglesLen += 3, u
        }
    }

    function ct(t, n, e, r) {
        const i = t - e,
            o = n - r;
        return i * i + o * o
    }

    function ht(t, n, e, r, i, o, u, a) {
        const l = t - u,
            s = n - a,
            c = e - u,
            h = r - a,
            f = i - u,
            p = o - a,
            g = c * c + h * h,
            d = f * f + p * p;
        return l * (h * d - g * p) - s * (c * d - g * f) + (l * l + s * s) * (c * p - h * f) < 0
    }

    function ft(t, n, e, r, i, o) {
        const u = e - t,
            a = r - n,
            l = i - t,
            s = o - n,
            c = u * u + a * a,
            h = l * l + s * s,
            f = .5 / (u * s - a * l),
            p = (s * c - a * h) * f,
            g = (u * h - l * c) * f;
        return p * p + g * g
    }

    function pt(t, n, e, r) {
        if (r - e <= 20)
            for (let i = e + 1; i <= r; i++) {
                const r = t[i],
                    o = n[r];
                let u = i - 1;
                for (; u >= e && n[t[u]] > o;) t[u + 1] = t[u--];
                t[u + 1] = r
            } else {
                let i = e + 1,
                    o = r;
                gt(t, e + r >> 1, i), n[t[e]] > n[t[r]] && gt(t, e, r), n[t[i]] > n[t[r]] && gt(t, i, r), n[t[e]] > n[t[i]] && gt(t, e, i);
                const u = t[i],
                    a = n[u];
                for (;;) {
                    do {
                        i++
                    } while (n[t[i]] < a);
                    do {
                        o--
                    } while (n[t[o]] > a);
                    if (o < i) break;
                    gt(t, i, o)
                }
                t[e + 1] = t[o], t[o] = u, r - i + 1 >= o - e ? (pt(t, n, i, r), pt(t, n, e, o - 1)) : (pt(t, n, e, o - 1), pt(t, n, i, r))
            }
    }

    function gt(t, n, e) {
        const r = t[n];
        t[n] = t[e], t[e] = r
    }

    function dt(t) {
        return t[0]
    }

    function yt(t) {
        return t[1]
    }

    function vt(t, n, e) {
        if (void 0 === e && (e = {}), !t) throw new Error("point is required");
        if (!n) throw new Error("polygon is required");
        var r, i = function(t) {
                if (!t) throw new Error("coord is required");
                if (!Array.isArray(t)) {
                    if ("Feature" === t.type && null !== t.geometry && "Point" === t.geometry.type) return t.geometry.coordinates;
                    if ("Point" === t.type) return t.coordinates
                }
                if (Array.isArray(t) && t.length >= 2 && !Array.isArray(t[0]) && !Array.isArray(t[1])) return t;
                throw new Error("coord must be GeoJSON Point or an Array of numbers")
            }(t),
            o = "Feature" === (r = n).type ? r.geometry : r,
            u = o.type,
            a = n.bbox,
            l = o.coordinates;
        if (a && !1 === function(t, n) {
                return n[0] <= t[0] && n[1] <= t[1] && n[2] >= t[0] && n[3] >= t[1]
            }(i, a)) return !1;
        "Polygon" === u && (l = [l]);
        for (var s = !1, c = 0; c < l.length && !s; c++)
            if (mt(i, l[c][0], e.ignoreBoundary)) {
                for (var h = !1, f = 1; f < l[c].length && !h;) mt(i, l[c][f], !e.ignoreBoundary) && (h = !0), f++;
                h || (s = !0)
            } return s
    }

    function mt(t, n, e) {
        var r = !1;
        n[0][0] === n[n.length - 1][0] && n[0][1] === n[n.length - 1][1] && (n = n.slice(0, n.length - 1));
        for (var i = 0, o = n.length - 1; i < n.length; o = i++) {
            var u = n[i][0],
                a = n[i][1],
                l = n[o][0],
                s = n[o][1];
            if (t[1] * (u - l) + a * (l - t[0]) + s * (t[0] - u) == 0 && (u - t[0]) * (l - t[0]) <= 0 && (a - t[1]) * (s - t[1]) <= 0) return !e;
            a > t[1] != s > t[1] && t[0] < (l - u) * (t[1] - a) / (s - a) + u && (r = !r)
        }
        return r
    }
    var xt = 1e-6,
        wt = 1e-12,
        bt = Math.PI,
        _t = bt / 2,
        Mt = bt / 4,
        Et = 2 * bt,
        St = 180 / bt,
        Nt = bt / 180,
        kt = Math.abs,
        At = Math.atan,
        $t = Math.atan2,
        Pt = Math.cos,
        Tt = Math.hypot,
        jt = Math.sin,
        Ft = Math.sign || function(t) {
            return t > 0 ? 1 : t < 0 ? -1 : 0
        },
        zt = Math.sqrt;

    function It(t) {
        return t > 1 ? _t : t < -1 ? -_t : Math.asin(t)
    }

    function Ot(t) {
        return (t = jt(t / 2)) * t
    }

    function Zt() {}

    function Lt(t, n) {
        t && Rt.hasOwnProperty(t.type) && Rt[t.type](t, n)
    }
    var qt = {
            Feature: function(t, n) {
                Lt(t.geometry, n)
            },
            FeatureCollection: function(t, n) {
                for (var e = t.features, r = -1, i = e.length; ++r < i;) Lt(e[r].geometry, n)
            }
        },
        Rt = {
            Sphere: function(t, n) {
                n.sphere()
            },
            Point: function(t, n) {
                t = t.coordinates, n.point(t[0], t[1], t[2])
            },
            MultiPoint: function(t, n) {
                for (var e = t.coordinates, r = -1, i = e.length; ++r < i;) t = e[r], n.point(t[0], t[1], t[2])
            },
            LineString: function(t, n) {
                Ht(t.coordinates, n, 0)
            },
            MultiLineString: function(t, n) {
                for (var e = t.coordinates, r = -1, i = e.length; ++r < i;) Ht(e[r], n, 0)
            },
            Polygon: function(t, n) {
                Ct(t.coordinates, n)
            },
            MultiPolygon: function(t, n) {
                for (var e = t.coordinates, r = -1, i = e.length; ++r < i;) Ct(e[r], n)
            },
            GeometryCollection: function(t, n) {
                for (var e = t.geometries, r = -1, i = e.length; ++r < i;) Lt(e[r], n)
            }
        };

    function Ht(t, n, e) {
        var r, i = -1,
            o = t.length - e;
        for (n.lineStart(); ++i < o;) r = t[i], n.point(r[0], r[1], r[2]);
        n.lineEnd()
    }

    function Ct(t, n) {
        var e = -1,
            r = t.length;
        for (n.polygonStart(); ++e < r;) Ht(t[e], n, 1);
        n.polygonEnd()
    }

    function Bt(t, n) {
        t && qt.hasOwnProperty(t.type) ? qt[t.type](t, n) : Lt(t, n)
    }
    var Gt, Ut, Kt, Dt, Vt, Xt, Jt, Yt, Wt, Qt, tn, nn, en, rn, on, un, an = new m,
        ln = new m,
        sn = {
            point: Zt,
            lineStart: Zt,
            lineEnd: Zt,
            polygonStart: function() {
                an = new m, sn.lineStart = cn, sn.lineEnd = hn
            },
            polygonEnd: function() {
                var t = +an;
                ln.add(t < 0 ? Et + t : t), this.lineStart = this.lineEnd = this.point = Zt
            },
            sphere: function() {
                ln.add(Et)
            }
        };

    function cn() {
        sn.point = fn
    }

    function hn() {
        pn(Gt, Ut)
    }

    function fn(t, n) {
        sn.point = pn, Gt = t, Ut = n, Kt = t *= Nt, Dt = Pt(n = (n *= Nt) / 2 + Mt), Vt = jt(n)
    }

    function pn(t, n) {
        var e = (t *= Nt) - Kt,
            r = e >= 0 ? 1 : -1,
            i = r * e,
            o = Pt(n = (n *= Nt) / 2 + Mt),
            u = jt(n),
            a = Vt * u,
            l = Dt * o + a * Pt(i),
            s = a * r * jt(i);
        an.add($t(s, l)), Kt = t, Dt = o, Vt = u
    }

    function gn(t) {
        return [$t(t[1], t[0]), It(t[2])]
    }

    function dn(t) {
        var n = t[0],
            e = t[1],
            r = Pt(e);
        return [r * Pt(n), r * jt(n), jt(e)]
    }

    function yn(t, n) {
        return t[0] * n[0] + t[1] * n[1] + t[2] * n[2]
    }

    function vn(t, n) {
        return [t[1] * n[2] - t[2] * n[1], t[2] * n[0] - t[0] * n[2], t[0] * n[1] - t[1] * n[0]]
    }

    function mn(t, n) {
        t[0] += n[0], t[1] += n[1], t[2] += n[2]
    }

    function xn(t, n) {
        return [t[0] * n, t[1] * n, t[2] * n]
    }

    function wn(t) {
        var n = zt(t[0] * t[0] + t[1] * t[1] + t[2] * t[2]);
        t[0] /= n, t[1] /= n, t[2] /= n
    }
    var bn, _n, Mn, En, Sn, Nn, kn, An, $n, Pn, Tn, jn, Fn, zn, In, On, Zn = {
        point: Ln,
        lineStart: Rn,
        lineEnd: Hn,
        polygonStart: function() {
            Zn.point = Cn, Zn.lineStart = Bn, Zn.lineEnd = Gn, rn = new m, sn.polygonStart()
        },
        polygonEnd: function() {
            sn.polygonEnd(), Zn.point = Ln, Zn.lineStart = Rn, Zn.lineEnd = Hn, an < 0 ? (Xt = -(Yt = 180), Jt = -(Wt = 90)) : rn > xt ? Wt = 90 : rn < -1e-6 && (Jt = -90), un[0] = Xt, un[1] = Yt
        },
        sphere: function() {
            Xt = -(Yt = 180), Jt = -(Wt = 90)
        }
    };

    function Ln(t, n) {
        on.push(un = [Xt = t, Yt = t]), n < Jt && (Jt = n), n > Wt && (Wt = n)
    }

    function qn(t, n) {
        var e = dn([t * Nt, n * Nt]);
        if (en) {
            var r = vn(en, e),
                i = vn([r[1], -r[0], 0], r);
            wn(i), i = gn(i);
            var o, u = t - Qt,
                a = u > 0 ? 1 : -1,
                l = i[0] * St * a,
                s = kt(u) > 180;
            s ^ (a * Qt < l && l < a * t) ? (o = i[1] * St) > Wt && (Wt = o) : s ^ (a * Qt < (l = (l + 360) % 360 - 180) && l < a * t) ? (o = -i[1] * St) < Jt && (Jt = o) : (n < Jt && (Jt = n), n > Wt && (Wt = n)), s ? t < Qt ? Un(Xt, t) > Un(Xt, Yt) && (Yt = t) : Un(t, Yt) > Un(Xt, Yt) && (Xt = t) : Yt >= Xt ? (t < Xt && (Xt = t), t > Yt && (Yt = t)) : t > Qt ? Un(Xt, t) > Un(Xt, Yt) && (Yt = t) : Un(t, Yt) > Un(Xt, Yt) && (Xt = t)
        } else on.push(un = [Xt = t, Yt = t]);
        n < Jt && (Jt = n), n > Wt && (Wt = n), en = e, Qt = t
    }

    function Rn() {
        Zn.point = qn
    }

    function Hn() {
        un[0] = Xt, un[1] = Yt, Zn.point = Ln, en = null
    }

    function Cn(t, n) {
        if (en) {
            var e = t - Qt;
            rn.add(kt(e) > 180 ? e + (e > 0 ? 360 : -360) : e)
        } else tn = t, nn = n;
        sn.point(t, n), qn(t, n)
    }

    function Bn() {
        sn.lineStart()
    }

    function Gn() {
        Cn(tn, nn), sn.lineEnd(), kt(rn) > xt && (Xt = -(Yt = 180)), un[0] = Xt, un[1] = Yt, en = null
    }

    function Un(t, n) {
        return (n -= t) < 0 ? n + 360 : n
    }

    function Kn(t, n) {
        return t[0] - n[0]
    }

    function Dn(t, n) {
        return t[0] <= t[1] ? t[0] <= n && n <= t[1] : n < t[0] || t[1] < n
    }

    function Vn(t) {
        var n, e, r, i, o, u, a;
        if (Wt = Yt = -(Xt = Jt = 1 / 0), on = [], Bt(t, Zn), e = on.length) {
            for (on.sort(Kn), n = 1, o = [r = on[0]]; n < e; ++n) Dn(r, (i = on[n])[0]) || Dn(r, i[1]) ? (Un(r[0], i[1]) > Un(r[0], r[1]) && (r[1] = i[1]), Un(i[0], r[1]) > Un(r[0], r[1]) && (r[0] = i[0])) : o.push(r = i);
            for (u = -1 / 0, n = 0, r = o[e = o.length - 1]; n <= e; r = i, ++n) i = o[n], (a = Un(r[1], i[0])) > u && (u = a, Xt = i[0], Yt = r[1])
        }
        return on = un = null, Xt === 1 / 0 || Jt === 1 / 0 ? [
            [NaN, NaN],
            [NaN, NaN]
        ] : [
            [Xt, Jt],
            [Yt, Wt]
        ]
    }
    var Xn = {
        sphere: Zt,
        point: Jn,
        lineStart: Wn,
        lineEnd: ne,
        polygonStart: function() {
            Xn.lineStart = ee, Xn.lineEnd = re
        },
        polygonEnd: function() {
            Xn.lineStart = Wn, Xn.lineEnd = ne
        }
    };

    function Jn(t, n) {
        t *= Nt;
        var e = Pt(n *= Nt);
        Yn(e * Pt(t), e * jt(t), jt(n))
    }

    function Yn(t, n, e) {
        ++bn, Mn += (t - Mn) / bn, En += (n - En) / bn, Sn += (e - Sn) / bn
    }

    function Wn() {
        Xn.point = Qn
    }

    function Qn(t, n) {
        t *= Nt;
        var e = Pt(n *= Nt);
        zn = e * Pt(t), In = e * jt(t), On = jt(n), Xn.point = te, Yn(zn, In, On)
    }

    function te(t, n) {
        t *= Nt;
        var e = Pt(n *= Nt),
            r = e * Pt(t),
            i = e * jt(t),
            o = jt(n),
            u = $t(zt((u = In * o - On * i) * u + (u = On * r - zn * o) * u + (u = zn * i - In * r) * u), zn * r + In * i + On * o);
        _n += u, Nn += u * (zn + (zn = r)), kn += u * (In + (In = i)), An += u * (On + (On = o)), Yn(zn, In, On)
    }

    function ne() {
        Xn.point = Jn
    }

    function ee() {
        Xn.point = ie
    }

    function re() {
        oe(jn, Fn), Xn.point = Jn
    }

    function ie(t, n) {
        jn = t, Fn = n, t *= Nt, n *= Nt, Xn.point = oe;
        var e = Pt(n);
        zn = e * Pt(t), In = e * jt(t), On = jt(n), Yn(zn, In, On)
    }

    function oe(t, n) {
        t *= Nt;
        var e = Pt(n *= Nt),
            r = e * Pt(t),
            i = e * jt(t),
            o = jt(n),
            u = In * o - On * i,
            a = On * r - zn * o,
            l = zn * i - In * r,
            s = Tt(u, a, l),
            c = It(s),
            h = s && -c / s;
        $n.add(h * u), Pn.add(h * a), Tn.add(h * l), _n += c, Nn += c * (zn + (zn = r)), kn += c * (In + (In = i)), An += c * (On + (On = o)), Yn(zn, In, On)
    }

    function ue(t) {
        bn = _n = Mn = En = Sn = Nn = kn = An = 0, $n = new m, Pn = new m, Tn = new m, Bt(t, Xn);
        var n = +$n,
            e = +Pn,
            r = +Tn,
            i = Tt(n, e, r);
        return i < wt && (n = Nn, e = kn, r = An, _n < xt && (n = Mn, e = En, r = Sn), (i = Tt(n, e, r)) < wt) ? [NaN, NaN] : [$t(e, n) * St, It(r / i) * St]
    }

    function ae(t, n) {
        function e(e, r) {
            return e = t(e, r), n(e[0], e[1])
        }
        return t.invert && n.invert && (e.invert = function(e, r) {
            return (e = n.invert(e, r)) && t.invert(e[0], e[1])
        }), e
    }

    function le(t, n) {
        return [kt(t) > bt ? t + Math.round(-t / Et) * Et : t, n]
    }

    function se(t, n, e) {
        return (t %= Et) ? n || e ? ae(he(t), fe(n, e)) : he(t) : n || e ? fe(n, e) : le
    }

    function ce(t) {
        return function(n, e) {
            return [(n += t) > bt ? n - Et : n < -bt ? n + Et : n, e]
        }
    }

    function he(t) {
        var n = ce(t);
        return n.invert = ce(-t), n
    }

    function fe(t, n) {
        var e = Pt(t),
            r = jt(t),
            i = Pt(n),
            o = jt(n);

        function u(t, n) {
            var u = Pt(n),
                a = Pt(t) * u,
                l = jt(t) * u,
                s = jt(n),
                c = s * e + a * r;
            return [$t(l * i - c * o, a * e - s * r), It(c * i + l * o)]
        }
        return u.invert = function(t, n) {
            var u = Pt(n),
                a = Pt(t) * u,
                l = jt(t) * u,
                s = jt(n),
                c = s * i - l * o;
            return [$t(l * i + s * o, a * e + c * r), It(c * e - a * r)]
        }, u
    }

    function pe(t, n) {
        (n = dn(n))[0] -= t, wn(n);
        var e, r = (e = -n[1]) > 1 ? 0 : e < -1 ? bt : Math.acos(e);
        return ((-n[2] < 0 ? -r : r) + Et - xt) % Et
    }

    function ge() {
        var t, n = [];
        return {
            point: function(n, e, r) {
                t.push([n, e, r])
            },
            lineStart: function() {
                n.push(t = [])
            },
            lineEnd: Zt,
            rejoin: function() {
                n.length > 1 && n.push(n.pop().concat(n.shift()))
            },
            result: function() {
                var e = n;
                return n = [], t = null, e
            }
        }
    }

    function de(t, n) {
        return kt(t[0] - n[0]) < xt && kt(t[1] - n[1]) < xt
    }

    function ye(t, n, e, r) {
        this.x = t, this.z = n, this.o = e, this.e = r, this.v = !1, this.n = this.p = null
    }

    function ve(t, n, e, r, i) {
        var o, u, a = [],
            l = [];
        if (t.forEach((function(t) {
                if (!((n = t.length - 1) <= 0)) {
                    var n, e, r = t[0],
                        u = t[n];
                    if (de(r, u)) {
                        if (!r[2] && !u[2]) {
                            for (i.lineStart(), o = 0; o < n; ++o) i.point((r = t[o])[0], r[1]);
                            return void i.lineEnd()
                        }
                        u[0] += 2e-6
                    }
                    a.push(e = new ye(r, t, null, !0)), l.push(e.o = new ye(r, null, e, !1)), a.push(e = new ye(u, t, null, !1)), l.push(e.o = new ye(u, null, e, !0))
                }
            })), a.length) {
            for (l.sort(n), me(a), me(l), o = 0, u = l.length; o < u; ++o) l[o].e = e = !e;
            for (var s, c, h = a[0];;) {
                for (var f = h, p = !0; f.v;)
                    if ((f = f.n) === h) return;
                s = f.z, i.lineStart();
                do {
                    if (f.v = f.o.v = !0, f.e) {
                        if (p)
                            for (o = 0, u = s.length; o < u; ++o) i.point((c = s[o])[0], c[1]);
                        else r(f.x, f.n.x, 1, i);
                        f = f.n
                    } else {
                        if (p)
                            for (s = f.p.z, o = s.length - 1; o >= 0; --o) i.point((c = s[o])[0], c[1]);
                        else r(f.x, f.p.x, -1, i);
                        f = f.p
                    }
                    s = (f = f.o).z, p = !p
                } while (!f.v);
                i.lineEnd()
            }
        }
    }

    function me(t) {
        if (n = t.length) {
            for (var n, e, r = 0, i = t[0]; ++r < n;) i.n = e = t[r], e.p = i, i = e;
            i.n = e = t[0], e.p = i
        }
    }

    function xe(t) {
        return kt(t[0]) <= bt ? t[0] : Ft(t[0]) * ((kt(t[0]) + bt) % Et - bt)
    }

    function we(t, n) {
        var e = xe(n),
            r = n[1],
            i = jt(r),
            o = [jt(e), -Pt(e), 0],
            u = 0,
            a = 0,
            l = new m;
        1 === i ? r = _t + xt : -1 === i && (r = -_t - xt);
        for (var s = 0, c = t.length; s < c; ++s)
            if (f = (h = t[s]).length)
                for (var h, f, p = h[f - 1], g = xe(p), d = p[1] / 2 + Mt, y = jt(d), v = Pt(d), x = 0; x < f; ++x, g = b, y = M, v = E, p = w) {
                    var w = h[x],
                        b = xe(w),
                        _ = w[1] / 2 + Mt,
                        M = jt(_),
                        E = Pt(_),
                        S = b - g,
                        N = S >= 0 ? 1 : -1,
                        k = N * S,
                        A = k > bt,
                        $ = y * M;
                    if (l.add($t($ * N * jt(k), v * E + $ * Pt(k))), u += A ? S + N * Et : S, A ^ g >= e ^ b >= e) {
                        var P = vn(dn(p), dn(w));
                        wn(P);
                        var T = vn(o, P);
                        wn(T);
                        var j = (A ^ S >= 0 ? -1 : 1) * It(T[2]);
                        (r > j || r === j && (P[0] || P[1])) && (a += A ^ S >= 0 ? 1 : -1)
                    }
                }
        return (u < -1e-6 || u < xt && l < -1e-12) ^ 1 & a
    }

    function be(t, n, e, r) {
        return function(i) {
            var o, u, a, l = n(i),
                s = ge(),
                c = n(s),
                h = !1,
                f = {
                    point: p,
                    lineStart: d,
                    lineEnd: y,
                    polygonStart: function() {
                        f.point = v, f.lineStart = m, f.lineEnd = x, u = [], o = []
                    },
                    polygonEnd: function() {
                        f.point = p, f.lineStart = d, f.lineEnd = y, u = E(u);
                        var t = we(o, r);
                        u.length ? (h || (i.polygonStart(), h = !0), ve(u, Me, t, e, i)) : t && (h || (i.polygonStart(), h = !0), i.lineStart(), e(null, null, 1, i), i.lineEnd()), h && (i.polygonEnd(), h = !1), u = o = null
                    },
                    sphere: function() {
                        i.polygonStart(), i.lineStart(), e(null, null, 1, i), i.lineEnd(), i.polygonEnd()
                    }
                };

            function p(n, e) {
                t(n, e) && i.point(n, e)
            }

            function g(t, n) {
                l.point(t, n)
            }

            function d() {
                f.point = g, l.lineStart()
            }

            function y() {
                f.point = p, l.lineEnd()
            }

            function v(t, n) {
                a.push([t, n]), c.point(t, n)
            }

            function m() {
                c.lineStart(), a = []
            }

            function x() {
                v(a[0][0], a[0][1]), c.lineEnd();
                var t, n, e, r, l = c.clean(),
                    f = s.result(),
                    p = f.length;
                if (a.pop(), o.push(a), a = null, p)
                    if (1 & l) {
                        if ((n = (e = f[0]).length - 1) > 0) {
                            for (h || (i.polygonStart(), h = !0), i.lineStart(), t = 0; t < n; ++t) i.point((r = e[t])[0], r[1]);
                            i.lineEnd()
                        }
                    } else p > 1 && 2 & l && f.push(f.pop().concat(f.shift())), u.push(f.filter(_e))
            }
            return f
        }
    }

    function _e(t) {
        return t.length > 1
    }

    function Me(t, n) {
        return ((t = t.x)[0] < 0 ? t[1] - _t - xt : _t - t[1]) - ((n = n.x)[0] < 0 ? n[1] - _t - xt : _t - n[1])
    }
    le.invert = le;
    var Ee = be((function() {
        return !0
    }), (function(t) {
        var n, e = NaN,
            r = NaN,
            i = NaN;
        return {
            lineStart: function() {
                t.lineStart(), n = 1
            },
            point: function(o, u) {
                var a = o > 0 ? bt : -bt,
                    l = kt(o - e);
                kt(l - bt) < xt ? (t.point(e, r = (r + u) / 2 > 0 ? _t : -_t), t.point(i, r), t.lineEnd(), t.lineStart(), t.point(a, r), t.point(o, r), n = 0) : i !== a && l >= bt && (kt(e - i) < xt && (e -= i * xt), kt(o - a) < xt && (o -= a * xt), r = function(t, n, e, r) {
                    var i, o, u = jt(t - e);
                    return kt(u) > xt ? At((jt(n) * (o = Pt(r)) * jt(e) - jt(r) * (i = Pt(n)) * jt(t)) / (i * o * u)) : (n + r) / 2
                }(e, r, o, u), t.point(i, r), t.lineEnd(), t.lineStart(), t.point(a, r), n = 0), t.point(e = o, r = u), i = a
            },
            lineEnd: function() {
                t.lineEnd(), e = r = NaN
            },
            clean: function() {
                return 2 - n
            }
        }
    }), (function(t, n, e, r) {
        var i;
        if (null == t) i = e * _t, r.point(-bt, i), r.point(0, i), r.point(bt, i), r.point(bt, 0), r.point(bt, -i), r.point(0, -i), r.point(-bt, -i), r.point(-bt, 0), r.point(-bt, i);
        else if (kt(t[0] - n[0]) > xt) {
            var o = t[0] < n[0] ? bt : -bt;
            i = e * o / 2, r.point(-o, i), r.point(0, i), r.point(o, i)
        } else r.point(n[0], n[1])
    }), [-bt, -_t]);

    function Se(t) {
        var n = Pt(t),
            e = 6 * Nt,
            r = n > 0,
            i = kt(n) > xt;

        function o(t, e) {
            return Pt(t) * Pt(e) > n
        }

        function u(t, e, r) {
            var i = [1, 0, 0],
                o = vn(dn(t), dn(e)),
                u = yn(o, o),
                a = o[0],
                l = u - a * a;
            if (!l) return !r && t;
            var s = n * u / l,
                c = -n * a / l,
                h = vn(i, o),
                f = xn(i, s);
            mn(f, xn(o, c));
            var p = h,
                g = yn(f, p),
                d = yn(p, p),
                y = g * g - d * (yn(f, f) - 1);
            if (!(y < 0)) {
                var v = zt(y),
                    m = xn(p, (-g - v) / d);
                if (mn(m, f), m = gn(m), !r) return m;
                var x, w = t[0],
                    b = e[0],
                    _ = t[1],
                    M = e[1];
                b < w && (x = w, w = b, b = x);
                var E = b - w,
                    S = kt(E - bt) < xt;
                if (!S && M < _ && (x = _, _ = M, M = x), S || E < xt ? S ? _ + M > 0 ^ m[1] < (kt(m[0] - w) < xt ? _ : M) : _ <= m[1] && m[1] <= M : E > bt ^ (w <= m[0] && m[0] <= b)) {
                    var N = xn(p, (-g + v) / d);
                    return mn(N, f), [m, gn(N)]
                }
            }
        }

        function a(n, e) {
            var i = r ? t : bt - t,
                o = 0;
            return n < -i ? o |= 1 : n > i && (o |= 2), e < -i ? o |= 4 : e > i && (o |= 8), o
        }
        return be(o, (function(t) {
            var n, e, l, s, c;
            return {
                lineStart: function() {
                    s = l = !1, c = 1
                },
                point: function(h, f) {
                    var p, g = [h, f],
                        d = o(h, f),
                        y = r ? d ? 0 : a(h, f) : d ? a(h + (h < 0 ? bt : -bt), f) : 0;
                    if (!n && (s = l = d) && t.lineStart(), d !== l && (!(p = u(n, g)) || de(n, p) || de(g, p)) && (g[2] = 1), d !== l) c = 0, d ? (t.lineStart(), p = u(g, n), t.point(p[0], p[1])) : (p = u(n, g), t.point(p[0], p[1], 2), t.lineEnd()), n = p;
                    else if (i && n && r ^ d) {
                        var v;
                        y & e || !(v = u(g, n, !0)) || (c = 0, r ? (t.lineStart(), t.point(v[0][0], v[0][1]), t.point(v[1][0], v[1][1]), t.lineEnd()) : (t.point(v[1][0], v[1][1]), t.lineEnd(), t.lineStart(), t.point(v[0][0], v[0][1], 3)))
                    }!d || n && de(n, g) || t.point(g[0], g[1]), n = g, l = d, e = y
                },
                lineEnd: function() {
                    l && t.lineEnd(), n = null
                },
                clean: function() {
                    return c | (s && l) << 1
                }
            }
        }), (function(n, r, i, o) {
            ! function(t, n, e, r, i, o) {
                if (e) {
                    var u = Pt(n),
                        a = jt(n),
                        l = r * e;
                    null == i ? (i = n + r * Et, o = n - l / 2) : (i = pe(u, i), o = pe(u, o), (r > 0 ? i < o : i > o) && (i += r * Et));
                    for (var s, c = i; r > 0 ? c > o : c < o; c -= l) s = gn([u, -a * Pt(c), -a * jt(c)]), t.point(s[0], s[1])
                }
            }(o, t, e, i, n, r)
        }), r ? [0, -t] : [-bt, t - bt])
    }
    var Ne, ke, Ae, $e, Pe = 1e9,
        Te = -Pe;

    function je(t, n, e, r) {
        function i(i, o) {
            return t <= i && i <= e && n <= o && o <= r
        }

        function o(i, o, a, s) {
            var c = 0,
                h = 0;
            if (null == i || (c = u(i, a)) !== (h = u(o, a)) || l(i, o) < 0 ^ a > 0)
                do {
                    s.point(0 === c || 3 === c ? t : e, c > 1 ? r : n)
                } while ((c = (c + a + 4) % 4) !== h);
            else s.point(o[0], o[1])
        }

        function u(r, i) {
            return kt(r[0] - t) < xt ? i > 0 ? 0 : 3 : kt(r[0] - e) < xt ? i > 0 ? 2 : 1 : kt(r[1] - n) < xt ? i > 0 ? 1 : 0 : i > 0 ? 3 : 2
        }

        function a(t, n) {
            return l(t.x, n.x)
        }

        function l(t, n) {
            var e = u(t, 1),
                r = u(n, 1);
            return e !== r ? e - r : 0 === e ? n[1] - t[1] : 1 === e ? t[0] - n[0] : 2 === e ? t[1] - n[1] : n[0] - t[0]
        }
        return function(u) {
            var l, s, c, h, f, p, g, d, y, v, m, x = u,
                w = ge(),
                b = {
                    point: _,
                    lineStart: function() {
                        b.point = M, s && s.push(c = []);
                        v = !0, y = !1, g = d = NaN
                    },
                    lineEnd: function() {
                        l && (M(h, f), p && y && w.rejoin(), l.push(w.result()));
                        b.point = _, y && x.lineEnd()
                    },
                    polygonStart: function() {
                        x = w, l = [], s = [], m = !0
                    },
                    polygonEnd: function() {
                        var n = function() {
                                for (var n = 0, e = 0, i = s.length; e < i; ++e)
                                    for (var o, u, a = s[e], l = 1, c = a.length, h = a[0], f = h[0], p = h[1]; l < c; ++l) o = f, u = p, f = (h = a[l])[0], p = h[1], u <= r ? p > r && (f - o) * (r - u) > (p - u) * (t - o) && ++n : p <= r && (f - o) * (r - u) < (p - u) * (t - o) && --n;
                                return n
                            }(),
                            e = m && n,
                            i = (l = E(l)).length;
                        (e || i) && (u.polygonStart(), e && (u.lineStart(), o(null, null, 1, u), u.lineEnd()), i && ve(l, a, n, o, u), u.polygonEnd());
                        x = u, l = s = c = null
                    }
                };

            function _(t, n) {
                i(t, n) && x.point(t, n)
            }

            function M(o, u) {
                var a = i(o, u);
                if (s && c.push([o, u]), v) h = o, f = u, p = a, v = !1, a && (x.lineStart(), x.point(o, u));
                else if (a && y) x.point(o, u);
                else {
                    var l = [g = Math.max(Te, Math.min(Pe, g)), d = Math.max(Te, Math.min(Pe, d))],
                        w = [o = Math.max(Te, Math.min(Pe, o)), u = Math.max(Te, Math.min(Pe, u))];
                    ! function(t, n, e, r, i, o) {
                        var u, a = t[0],
                            l = t[1],
                            s = 0,
                            c = 1,
                            h = n[0] - a,
                            f = n[1] - l;
                        if (u = e - a, h || !(u > 0)) {
                            if (u /= h, h < 0) {
                                if (u < s) return;
                                u < c && (c = u)
                            } else if (h > 0) {
                                if (u > c) return;
                                u > s && (s = u)
                            }
                            if (u = i - a, h || !(u < 0)) {
                                if (u /= h, h < 0) {
                                    if (u > c) return;
                                    u > s && (s = u)
                                } else if (h > 0) {
                                    if (u < s) return;
                                    u < c && (c = u)
                                }
                                if (u = r - l, f || !(u > 0)) {
                                    if (u /= f, f < 0) {
                                        if (u < s) return;
                                        u < c && (c = u)
                                    } else if (f > 0) {
                                        if (u > c) return;
                                        u > s && (s = u)
                                    }
                                    if (u = o - l, f || !(u < 0)) {
                                        if (u /= f, f < 0) {
                                            if (u > c) return;
                                            u > s && (s = u)
                                        } else if (f > 0) {
                                            if (u < s) return;
                                            u < c && (c = u)
                                        }
                                        return s > 0 && (t[0] = a + s * h, t[1] = l + s * f), c < 1 && (n[0] = a + c * h, n[1] = l + c * f), !0
                                    }
                                }
                            }
                        }
                    }(l, w, t, n, e, r) ? a && (x.lineStart(), x.point(o, u), m = !1): (y || (x.lineStart(), x.point(l[0], l[1])), x.point(w[0], w[1]), a || x.lineEnd(), m = !1)
                }
                g = o, d = u, y = a
            }
            return b
        }
    }
    var Fe = {
        sphere: Zt,
        point: Zt,
        lineStart: function() {
            Fe.point = Ie, Fe.lineEnd = ze
        },
        lineEnd: Zt,
        polygonStart: Zt,
        polygonEnd: Zt
    };

    function ze() {
        Fe.point = Fe.lineEnd = Zt
    }

    function Ie(t, n) {
        ke = t *= Nt, Ae = jt(n *= Nt), $e = Pt(n), Fe.point = Oe
    }

    function Oe(t, n) {
        t *= Nt;
        var e = jt(n *= Nt),
            r = Pt(n),
            i = kt(t - ke),
            o = Pt(i),
            u = r * jt(i),
            a = $e * e - Ae * r * o,
            l = Ae * e + $e * r * o;
        Ne.add($t(zt(u * u + a * a), l)), ke = t, Ae = e, $e = r
    }
    var Ze = [null, null],
        Le = {
            type: "LineString",
            coordinates: Ze
        };

    function qe(t, n) {
        return Ze[0] = t, Ze[1] = n,
            function(t) {
                return Ne = new m, Bt(t, Fe), +Ne
            }(Le)
    }
    var Re = {
            Feature: function(t, n) {
                return Ce(t.geometry, n)
            },
            FeatureCollection: function(t, n) {
                for (var e = t.features, r = -1, i = e.length; ++r < i;)
                    if (Ce(e[r].geometry, n)) return !0;
                return !1
            }
        },
        He = {
            Sphere: function() {
                return !0
            },
            Point: function(t, n) {
                return Be(t.coordinates, n)
            },
            MultiPoint: function(t, n) {
                for (var e = t.coordinates, r = -1, i = e.length; ++r < i;)
                    if (Be(e[r], n)) return !0;
                return !1
            },
            LineString: function(t, n) {
                return Ge(t.coordinates, n)
            },
            MultiLineString: function(t, n) {
                for (var e = t.coordinates, r = -1, i = e.length; ++r < i;)
                    if (Ge(e[r], n)) return !0;
                return !1
            },
            Polygon: function(t, n) {
                return Ue(t.coordinates, n)
            },
            MultiPolygon: function(t, n) {
                for (var e = t.coordinates, r = -1, i = e.length; ++r < i;)
                    if (Ue(e[r], n)) return !0;
                return !1
            },
            GeometryCollection: function(t, n) {
                for (var e = t.geometries, r = -1, i = e.length; ++r < i;)
                    if (Ce(e[r], n)) return !0;
                return !1
            }
        };

    function Ce(t, n) {
        return !(!t || !He.hasOwnProperty(t.type)) && He[t.type](t, n)
    }

    function Be(t, n) {
        return 0 === qe(t, n)
    }

    function Ge(t, n) {
        for (var e, r, i, o = 0, u = t.length; o < u; o++) {
            if (0 === (r = qe(t[o], n))) return !0;
            if (o > 0 && (i = qe(t[o], t[o - 1])) > 0 && e <= i && r <= i && (e + r - i) * (1 - Math.pow((e - r) / i, 2)) < wt * i) return !0;
            e = r
        }
        return !1
    }

    function Ue(t, n) {
        return !!we(t.map(Ke), De(n))
    }

    function Ke(t) {
        return (t = t.map(De)).pop(), t
    }

    function De(t) {
        return [t[0] * Nt, t[1] * Nt]
    }

    function Ve(t, n) {
        return (t && Re.hasOwnProperty(t.type) ? Re[t.type] : Ce)(t, n)
    }
    var Xe = t => t,
        Je = 1 / 0,
        Ye = Je,
        We = -Je,
        Qe = We;
    var tr = {
        point: function(t, n) {
            t < Je && (Je = t);
            t > We && (We = t);
            n < Ye && (Ye = n);
            n > Qe && (Qe = n)
        },
        lineStart: Zt,
        lineEnd: Zt,
        polygonStart: Zt,
        polygonEnd: Zt,
        result: function() {
            var t = [
                [Je, Ye],
                [We, Qe]
            ];
            return We = Qe = -(Ye = Je = 1 / 0), t
        }
    };

    function nr(t) {
        return function(n) {
            var e = new er;
            for (var r in t) e[r] = t[r];
            return e.stream = n, e
        }
    }

    function er() {}

    function rr(t, n, e) {
        var r = t.clipExtent && t.clipExtent();
        return t.scale(150).translate([0, 0]), null != r && t.clipExtent(null), Bt(e, t.stream(tr)), n(tr.result()), null != r && t.clipExtent(r), t
    }

    function ir(t, n, e) {
        return rr(t, (function(e) {
            var r = n[1][0] - n[0][0],
                i = n[1][1] - n[0][1],
                o = Math.min(r / (e[1][0] - e[0][0]), i / (e[1][1] - e[0][1])),
                u = +n[0][0] + (r - o * (e[1][0] + e[0][0])) / 2,
                a = +n[0][1] + (i - o * (e[1][1] + e[0][1])) / 2;
            t.scale(150 * o).translate([u, a])
        }), e)
    }
    er.prototype = {
        constructor: er,
        point: function(t, n) {
            this.stream.point(t, n)
        },
        sphere: function() {
            this.stream.sphere()
        },
        lineStart: function() {
            this.stream.lineStart()
        },
        lineEnd: function() {
            this.stream.lineEnd()
        },
        polygonStart: function() {
            this.stream.polygonStart()
        },
        polygonEnd: function() {
            this.stream.polygonEnd()
        }
    };
    var or = Pt(30 * Nt);

    function ur(t, n) {
        return +n ? function(t, n) {
            function e(r, i, o, u, a, l, s, c, h, f, p, g, d, y) {
                var v = s - r,
                    m = c - i,
                    x = v * v + m * m;
                if (x > 4 * n && d--) {
                    var w = u + f,
                        b = a + p,
                        _ = l + g,
                        M = zt(w * w + b * b + _ * _),
                        E = It(_ /= M),
                        S = kt(kt(_) - 1) < xt || kt(o - h) < xt ? (o + h) / 2 : $t(b, w),
                        N = t(S, E),
                        k = N[0],
                        A = N[1],
                        $ = k - r,
                        P = A - i,
                        T = m * $ - v * P;
                    (T * T / x > n || kt((v * $ + m * P) / x - .5) > .3 || u * f + a * p + l * g < or) && (e(r, i, o, u, a, l, k, A, S, w /= M, b /= M, _, d, y), y.point(k, A), e(k, A, S, w, b, _, s, c, h, f, p, g, d, y))
                }
            }
            return function(n) {
                var r, i, o, u, a, l, s, c, h, f, p, g, d = {
                    point: y,
                    lineStart: v,
                    lineEnd: x,
                    polygonStart: function() {
                        n.polygonStart(), d.lineStart = w
                    },
                    polygonEnd: function() {
                        n.polygonEnd(), d.lineStart = v
                    }
                };

                function y(e, r) {
                    e = t(e, r), n.point(e[0], e[1])
                }

                function v() {
                    c = NaN, d.point = m, n.lineStart()
                }

                function m(r, i) {
                    var o = dn([r, i]),
                        u = t(r, i);
                    e(c, h, s, f, p, g, c = u[0], h = u[1], s = r, f = o[0], p = o[1], g = o[2], 16, n), n.point(c, h)
                }

                function x() {
                    d.point = y, n.lineEnd()
                }

                function w() {
                    v(), d.point = b, d.lineEnd = _
                }

                function b(t, n) {
                    m(r = t, n), i = c, o = h, u = f, a = p, l = g, d.point = m
                }

                function _() {
                    e(c, h, s, f, p, g, i, o, r, u, a, l, 16, n), d.lineEnd = x, x()
                }
                return d
            }
        }(t, n) : function(t) {
            return nr({
                point: function(n, e) {
                    n = t(n, e), this.stream.point(n[0], n[1])
                }
            })
        }(t)
    }
    var ar = nr({
        point: function(t, n) {
            this.stream.point(t * Nt, n * Nt)
        }
    });

    function lr(t, n, e, r, i, o) {
        if (!o) return function(t, n, e, r, i) {
            function o(o, u) {
                return [n + t * (o *= r), e - t * (u *= i)]
            }
            return o.invert = function(o, u) {
                return [(o - n) / t * r, (e - u) / t * i]
            }, o
        }(t, n, e, r, i);
        var u = Pt(o),
            a = jt(o),
            l = u * t,
            s = a * t,
            c = u / t,
            h = a / t,
            f = (a * e - u * n) / t,
            p = (a * n + u * e) / t;

        function g(t, o) {
            return [l * (t *= r) - s * (o *= i) + n, e - s * t - l * o]
        }
        return g.invert = function(t, n) {
            return [r * (c * t - h * n + f), i * (p - h * t - c * n)]
        }, g
    }

    function sr(t) {
        return function(t) {
            var n, e, r, i, o, u, a, l, s, c, h = 150,
                f = 480,
                p = 250,
                g = 0,
                d = 0,
                y = 0,
                v = 0,
                m = 0,
                x = 0,
                w = 1,
                b = 1,
                _ = null,
                M = Ee,
                E = null,
                S = Xe,
                N = .5;

            function k(t) {
                return l(t[0] * Nt, t[1] * Nt)
            }

            function A(t) {
                return (t = l.invert(t[0], t[1])) && [t[0] * St, t[1] * St]
            }

            function $() {
                var t = lr(h, 0, 0, w, b, x).apply(null, n(g, d)),
                    r = lr(h, f - t[0], p - t[1], w, b, x);
                return e = se(y, v, m), a = ae(n, r), l = ae(e, a), u = ur(a, N), P()
            }

            function P() {
                return s = c = null, k
            }
            return k.stream = function(t) {
                    return s && c === t ? s : s = ar(function(t) {
                        return nr({
                            point: function(n, e) {
                                var r = t(n, e);
                                return this.stream.point(r[0], r[1])
                            }
                        })
                    }(e)(M(u(S(c = t)))))
                }, k.preclip = function(t) {
                    return arguments.length ? (M = t, _ = void 0, P()) : M
                }, k.postclip = function(t) {
                    return arguments.length ? (S = t, E = r = i = o = null, P()) : S
                }, k.clipAngle = function(t) {
                    return arguments.length ? (M = +t ? Se(_ = t * Nt) : (_ = null, Ee), P()) : _ * St
                }, k.clipExtent = function(t) {
                    return arguments.length ? (S = null == t ? (E = r = i = o = null, Xe) : je(E = +t[0][0], r = +t[0][1], i = +t[1][0], o = +t[1][1]), P()) : null == E ? null : [
                        [E, r],
                        [i, o]
                    ]
                }, k.scale = function(t) {
                    return arguments.length ? (h = +t, $()) : h
                }, k.translate = function(t) {
                    return arguments.length ? (f = +t[0], p = +t[1], $()) : [f, p]
                }, k.center = function(t) {
                    return arguments.length ? (g = t[0] % 360 * Nt, d = t[1] % 360 * Nt, $()) : [g * St, d * St]
                }, k.rotate = function(t) {
                    return arguments.length ? (y = t[0] % 360 * Nt, v = t[1] % 360 * Nt, m = t.length > 2 ? t[2] % 360 * Nt : 0, $()) : [y * St, v * St, m * St]
                }, k.angle = function(t) {
                    return arguments.length ? (x = t % 360 * Nt, $()) : x * St
                }, k.reflectX = function(t) {
                    return arguments.length ? (w = t ? -1 : 1, $()) : w < 0
                }, k.reflectY = function(t) {
                    return arguments.length ? (b = t ? -1 : 1, $()) : b < 0
                }, k.precision = function(t) {
                    return arguments.length ? (u = ur(a, N = t * t), P()) : zt(N)
                }, k.fitExtent = function(t, n) {
                    return ir(k, t, n)
                }, k.fitSize = function(t, n) {
                    return function(t, n, e) {
                        return ir(t, [
                            [0, 0], n
                        ], e)
                    }(k, t, n)
                }, k.fitWidth = function(t, n) {
                    return function(t, n, e) {
                        return rr(t, (function(e) {
                            var r = +n,
                                i = r / (e[1][0] - e[0][0]),
                                o = (r - i * (e[1][0] + e[0][0])) / 2,
                                u = -i * e[0][1];
                            t.scale(150 * i).translate([o, u])
                        }), e)
                    }(k, t, n)
                }, k.fitHeight = function(t, n) {
                    return function(t, n, e) {
                        return rr(t, (function(e) {
                            var r = +n,
                                i = r / (e[1][1] - e[0][1]),
                                o = -i * e[0][0],
                                u = (r - i * (e[1][1] + e[0][1])) / 2;
                            t.scale(150 * i).translate([o, u])
                        }), e)
                    }(k, t, n)
                },
                function() {
                    return n = t.apply(this, arguments), k.invert = n.invert && A, $()
                }
        }((function() {
            return t
        }))()
    }

    function cr(t, n) {
        var e = Pt(n),
            r = 1 + Pt(t) * e;
        return [e * jt(t) / r, jt(n) / r]
    }

    function hr() {
        return sr(cr).scale(250).clipAngle(142)
    }
    cr.invert = function(t) {
        return function(n, e) {
            var r = zt(n * n + e * e),
                i = t(r),
                o = jt(i),
                u = Pt(i);
            return [$t(n * o, r * u), It(r && e * o / r)]
        }
    }((function(t) {
        return 2 * At(t)
    }));
    const fr = 1e-6;
    class pr {
        constructor() {
            this._x0 = this._y0 = this._x1 = this._y1 = null, this._ = ""
        }
        moveTo(t, n) {
            this._ += `M${this._x0=this._x1=+t},${this._y0=this._y1=+n}`
        }
        closePath() {
            null !== this._x1 && (this._x1 = this._x0, this._y1 = this._y0, this._ += "Z")
        }
        lineTo(t, n) {
            this._ += `L${this._x1=+t},${this._y1=+n}`
        }
        arc(t, n, e) {
            const r = (t = +t) + (e = +e),
                i = n = +n;
            if (e < 0) throw new Error("negative radius");
            null === this._x1 ? this._ += `M${r},${i}` : (Math.abs(this._x1 - r) > fr || Math.abs(this._y1 - i) > fr) && (this._ += "L" + r + "," + i), e && (this._ += `A${e},${e},0,1,1,${t-e},${n}A${e},${e},0,1,1,${this._x1=r},${this._y1=i}`)
        }
        rect(t, n, e, r) {
            this._ += `M${this._x0=this._x1=+t},${this._y0=this._y1=+n}h${+e}v${+r}h${-e}Z`
        }
        value() {
            return this._ || null
        }
    }
    class gr {
        constructor() {
            this._ = []
        }
        moveTo(t, n) {
            this._.push([t, n])
        }
        closePath() {
            this._.push(this._[0].slice())
        }
        lineTo(t, n) {
            this._.push([t, n])
        }
        value() {
            return this._.length ? this._ : null
        }
    }
    class dr {
        constructor(t, [n, e, r, i] = [0, 0, 960, 500]) {
            if (!((r = +r) >= (n = +n) && (i = +i) >= (e = +e))) throw new Error("invalid bounds");
            this.delaunay = t, this._circumcenters = new Float64Array(2 * t.points.length), this.vectors = new Float64Array(2 * t.points.length), this.xmax = r, this.xmin = n, this.ymax = i, this.ymin = e, this._init()
        }
        update() {
            return this.delaunay.update(), this._init(), this
        }
        _init() {
            const {
                delaunay: {
                    points: t,
                    hull: n,
                    triangles: e
                },
                vectors: r
            } = this, i = this.circumcenters = this._circumcenters.subarray(0, e.length / 3 * 2);
            for (let n, r, o = 0, u = 0, a = e.length; o < a; o += 3, u += 2) {
                const a = 2 * e[o],
                    l = 2 * e[o + 1],
                    s = 2 * e[o + 2],
                    c = t[a],
                    h = t[a + 1],
                    f = t[l],
                    p = t[l + 1],
                    g = t[s],
                    d = t[s + 1],
                    y = f - c,
                    v = p - h,
                    m = g - c,
                    x = d - h,
                    w = 2 * (y * x - v * m);
                if (Math.abs(w) < 1e-9) {
                    let i = 1e9;
                    const o = 2 * e[0];
                    i *= Math.sign((t[o] - c) * x - (t[o + 1] - h) * m), n = (c + g) / 2 - i * x, r = (h + d) / 2 + i * m
                } else {
                    const t = 1 / w,
                        e = y * y + v * v,
                        i = m * m + x * x;
                    n = c + (x * e - v * i) * t, r = h + (y * i - m * e) * t
                }
                i[u] = n, i[u + 1] = r
            }
            let o, u, a, l = n[n.length - 1],
                s = 4 * l,
                c = t[2 * l],
                h = t[2 * l + 1];
            r.fill(0);
            for (let e = 0; e < n.length; ++e) l = n[e], o = s, u = c, a = h, s = 4 * l, c = t[2 * l], h = t[2 * l + 1], r[o + 2] = r[s] = a - h, r[o + 3] = r[s + 1] = c - u
        }
        render(t) {
            const n = null == t ? t = new pr : void 0,
                {
                    delaunay: {
                        halfedges: e,
                        inedges: r,
                        hull: i
                    },
                    circumcenters: o,
                    vectors: u
                } = this;
            if (i.length <= 1) return null;
            for (let n = 0, r = e.length; n < r; ++n) {
                const r = e[n];
                if (r < n) continue;
                const i = 2 * Math.floor(n / 3),
                    u = 2 * Math.floor(r / 3),
                    a = o[i],
                    l = o[i + 1],
                    s = o[u],
                    c = o[u + 1];
                this._renderSegment(a, l, s, c, t)
            }
            let a, l = i[i.length - 1];
            for (let n = 0; n < i.length; ++n) {
                a = l, l = i[n];
                const e = 2 * Math.floor(r[l] / 3),
                    s = o[e],
                    c = o[e + 1],
                    h = 4 * a,
                    f = this._project(s, c, u[h + 2], u[h + 3]);
                f && this._renderSegment(s, c, f[0], f[1], t)
            }
            return n && n.value()
        }
        renderBounds(t) {
            const n = null == t ? t = new pr : void 0;
            return t.rect(this.xmin, this.ymin, this.xmax - this.xmin, this.ymax - this.ymin), n && n.value()
        }
        renderCell(t, n) {
            const e = null == n ? n = new pr : void 0,
                r = this._clip(t);
            if (null === r || !r.length) return;
            n.moveTo(r[0], r[1]);
            let i = r.length;
            for (; r[0] === r[i - 2] && r[1] === r[i - 1] && i > 1;) i -= 2;
            for (let t = 2; t < i; t += 2) r[t] === r[t - 2] && r[t + 1] === r[t - 1] || n.lineTo(r[t], r[t + 1]);
            return n.closePath(), e && e.value()
        }* cellPolygons() {
            const {
                delaunay: {
                    points: t
                }
            } = this;
            for (let n = 0, e = t.length / 2; n < e; ++n) {
                const t = this.cellPolygon(n);
                t && (t.index = n, yield t)
            }
        }
        cellPolygon(t) {
            const n = new gr;
            return this.renderCell(t, n), n.value()
        }
        _renderSegment(t, n, e, r, i) {
            let o;
            const u = this._regioncode(t, n),
                a = this._regioncode(e, r);
            0 === u && 0 === a ? (i.moveTo(t, n), i.lineTo(e, r)) : (o = this._clipSegment(t, n, e, r, u, a)) && (i.moveTo(o[0], o[1]), i.lineTo(o[2], o[3]))
        }
        contains(t, n, e) {
            return (n = +n) == n && (e = +e) == e && this.delaunay._step(t, n, e) === t
        }* neighbors(t) {
            const n = this._clip(t);
            if (n)
                for (const e of this.delaunay.neighbors(t)) {
                    const t = this._clip(e);
                    if (t) t: for (let r = 0, i = n.length; r < i; r += 2)
                        for (let o = 0, u = t.length; o < u; o += 2)
                            if (n[r] == t[o] && n[r + 1] == t[o + 1] && n[(r + 2) % i] == t[(o + u - 2) % u] && n[(r + 3) % i] == t[(o + u - 1) % u]) {
                                yield e;
                                break t
                            }
                }
        }
        _cell(t) {
            const {
                circumcenters: n,
                delaunay: {
                    inedges: e,
                    halfedges: r,
                    triangles: i
                }
            } = this, o = e[t];
            if (-1 === o) return null;
            const u = [];
            let a = o;
            do {
                const e = Math.floor(a / 3);
                if (u.push(n[2 * e], n[2 * e + 1]), a = a % 3 == 2 ? a - 2 : a + 1, i[a] !== t) break;
                a = r[a]
            } while (a !== o && -1 !== a);
            return u
        }
        _clip(t) {
            if (0 === t && 1 === this.delaunay.hull.length) return [this.xmax, this.ymin, this.xmax, this.ymax, this.xmin, this.ymax, this.xmin, this.ymin];
            const n = this._cell(t);
            if (null === n) return null;
            const {
                vectors: e
            } = this, r = 4 * t;
            return e[r] || e[r + 1] ? this._clipInfinite(t, n, e[r], e[r + 1], e[r + 2], e[r + 3]) : this._clipFinite(t, n)
        }
        _clipFinite(t, n) {
            const e = n.length;
            let r, i, o, u, a = null,
                l = n[e - 2],
                s = n[e - 1],
                c = this._regioncode(l, s),
                h = 0;
            for (let f = 0; f < e; f += 2)
                if (r = l, i = s, l = n[f], s = n[f + 1], o = c, c = this._regioncode(l, s), 0 === o && 0 === c) u = h, h = 0, a ? a.push(l, s) : a = [l, s];
                else {
                    let n, e, f, p, g;
                    if (0 === o) {
                        if (null === (n = this._clipSegment(r, i, l, s, o, c))) continue;
                        [e, f, p, g] = n
                    } else {
                        if (null === (n = this._clipSegment(l, s, r, i, c, o))) continue;
                        [p, g, e, f] = n, u = h, h = this._edgecode(e, f), u && h && this._edge(t, u, h, a, a.length), a ? a.push(e, f) : a = [e, f]
                    }
                    u = h, h = this._edgecode(p, g), u && h && this._edge(t, u, h, a, a.length), a ? a.push(p, g) : a = [p, g]
                } if (a) u = h, h = this._edgecode(a[0], a[1]), u && h && this._edge(t, u, h, a, a.length);
            else if (this.contains(t, (this.xmin + this.xmax) / 2, (this.ymin + this.ymax) / 2)) return [this.xmax, this.ymin, this.xmax, this.ymax, this.xmin, this.ymax, this.xmin, this.ymin];
            return a
        }
        _clipSegment(t, n, e, r, i, o) {
            for (;;) {
                if (0 === i && 0 === o) return [t, n, e, r];
                if (i & o) return null;
                let u, a, l = i || o;
                8 & l ? (u = t + (e - t) * (this.ymax - n) / (r - n), a = this.ymax) : 4 & l ? (u = t + (e - t) * (this.ymin - n) / (r - n), a = this.ymin) : 2 & l ? (a = n + (r - n) * (this.xmax - t) / (e - t), u = this.xmax) : (a = n + (r - n) * (this.xmin - t) / (e - t), u = this.xmin), i ? (t = u, n = a, i = this._regioncode(t, n)) : (e = u, r = a, o = this._regioncode(e, r))
            }
        }
        _clipInfinite(t, n, e, r, i, o) {
            let u, a = Array.from(n);
            if ((u = this._project(a[0], a[1], e, r)) && a.unshift(u[0], u[1]), (u = this._project(a[a.length - 2], a[a.length - 1], i, o)) && a.push(u[0], u[1]), a = this._clipFinite(t, a))
                for (let n, e = 0, r = a.length, i = this._edgecode(a[r - 2], a[r - 1]); e < r; e += 2) n = i, i = this._edgecode(a[e], a[e + 1]), n && i && (e = this._edge(t, n, i, a, e), r = a.length);
            else this.contains(t, (this.xmin + this.xmax) / 2, (this.ymin + this.ymax) / 2) && (a = [this.xmin, this.ymin, this.xmax, this.ymin, this.xmax, this.ymax, this.xmin, this.ymax]);
            return a
        }
        _edge(t, n, e, r, i) {
            for (; n !== e;) {
                let e, o;
                switch (n) {
                    case 5:
                        n = 4;
                        continue;
                    case 4:
                        n = 6, e = this.xmax, o = this.ymin;
                        break;
                    case 6:
                        n = 2;
                        continue;
                    case 2:
                        n = 10, e = this.xmax, o = this.ymax;
                        break;
                    case 10:
                        n = 8;
                        continue;
                    case 8:
                        n = 9, e = this.xmin, o = this.ymax;
                        break;
                    case 9:
                        n = 1;
                        continue;
                    case 1:
                        n = 5, e = this.xmin, o = this.ymin
                }
                r[i] === e && r[i + 1] === o || !this.contains(t, e, o) || (r.splice(i, 0, e, o), i += 2)
            }
            if (r.length > 4)
                for (let t = 0; t < r.length; t += 2) {
                    const n = (t + 2) % r.length,
                        e = (t + 4) % r.length;
                    (r[t] === r[n] && r[n] === r[e] || r[t + 1] === r[n + 1] && r[n + 1] === r[e + 1]) && (r.splice(n, 2), t -= 2)
                }
            return i
        }
        _project(t, n, e, r) {
            let i, o, u, a = 1 / 0;
            if (r < 0) {
                if (n <= this.ymin) return null;
                (i = (this.ymin - n) / r) < a && (u = this.ymin, o = t + (a = i) * e)
            } else if (r > 0) {
                if (n >= this.ymax) return null;
                (i = (this.ymax - n) / r) < a && (u = this.ymax, o = t + (a = i) * e)
            }
            if (e > 0) {
                if (t >= this.xmax) return null;
                (i = (this.xmax - t) / e) < a && (o = this.xmax, u = n + (a = i) * r)
            } else if (e < 0) {
                if (t <= this.xmin) return null;
                (i = (this.xmin - t) / e) < a && (o = this.xmin, u = n + (a = i) * r)
            }
            return [o, u]
        }
        _edgecode(t, n) {
            return (t === this.xmin ? 1 : t === this.xmax ? 2 : 0) | (n === this.ymin ? 4 : n === this.ymax ? 8 : 0)
        }
        _regioncode(t, n) {
            return (t < this.xmin ? 1 : t > this.xmax ? 2 : 0) | (n < this.ymin ? 4 : n > this.ymax ? 8 : 0)
        }
    }
    const yr = 2 * Math.PI,
        vr = Math.pow;

    function mr(t) {
        return t[0]
    }

    function xr(t) {
        return t[1]
    }

    function wr(t, n, e) {
        return [t + Math.sin(t + n) * e, n + Math.cos(t - n) * e]
    }
    class br {
        static from(t, n = mr, e = xr, r) {
            return new br("length" in t ? function(t, n, e, r) {
                const i = t.length,
                    o = new Float64Array(2 * i);
                for (let u = 0; u < i; ++u) {
                    const i = t[u];
                    o[2 * u] = n.call(r, i, u, t), o[2 * u + 1] = e.call(r, i, u, t)
                }
                return o
            }(t, n, e, r) : Float64Array.from(function*(t, n, e, r) {
                let i = 0;
                for (const o of t) yield n.call(r, o, i, t), yield e.call(r, o, i, t), ++i
            }(t, n, e, r)))
        }
        constructor(t) {
            this._delaunator = new st(t), this.inedges = new Int32Array(t.length / 2), this._hullIndex = new Int32Array(t.length / 2), this.points = this._delaunator.coords, this._init()
        }
        update() {
            return this._delaunator.update(), this._init(), this
        }
        _init() {
            const t = this._delaunator,
                n = this.points;
            if (t.hull && t.hull.length > 2 && function(t) {
                    const {
                        triangles: n,
                        coords: e
                    } = t;
                    for (let t = 0; t < n.length; t += 3) {
                        const r = 2 * n[t],
                            i = 2 * n[t + 1],
                            o = 2 * n[t + 2];
                        if ((e[o] - e[r]) * (e[i + 1] - e[r + 1]) - (e[i] - e[r]) * (e[o + 1] - e[r + 1]) > 1e-10) return !1
                    }
                    return !0
                }(t)) {
                this.collinear = Int32Array.from({
                    length: n.length / 2
                }, ((t, n) => n)).sort(((t, e) => n[2 * t] - n[2 * e] || n[2 * t + 1] - n[2 * e + 1]));
                const t = this.collinear[0],
                    e = this.collinear[this.collinear.length - 1],
                    r = [n[2 * t], n[2 * t + 1], n[2 * e], n[2 * e + 1]],
                    i = 1e-8 * Math.hypot(r[3] - r[1], r[2] - r[0]);
                for (let t = 0, e = n.length / 2; t < e; ++t) {
                    const e = wr(n[2 * t], n[2 * t + 1], i);
                    n[2 * t] = e[0], n[2 * t + 1] = e[1]
                }
                this._delaunator = new st(n)
            } else delete this.collinear;
            const e = this.halfedges = this._delaunator.halfedges,
                r = this.hull = this._delaunator.hull,
                i = this.triangles = this._delaunator.triangles,
                o = this.inedges.fill(-1),
                u = this._hullIndex.fill(-1);
            for (let t = 0, n = e.length; t < n; ++t) {
                const n = i[t % 3 == 2 ? t - 2 : t + 1]; - 1 !== e[t] && -1 !== o[n] || (o[n] = t)
            }
            for (let t = 0, n = r.length; t < n; ++t) u[r[t]] = t;
            r.length <= 2 && r.length > 0 && (this.triangles = new Int32Array(3).fill(-1), this.halfedges = new Int32Array(3).fill(-1), this.triangles[0] = r[0], o[r[0]] = 1, 2 === r.length && (o[r[1]] = 0, this.triangles[1] = r[1], this.triangles[2] = r[1]))
        }
        voronoi(t) {
            return new dr(this, t)
        }* neighbors(t) {
            const {
                inedges: n,
                hull: e,
                _hullIndex: r,
                halfedges: i,
                triangles: o,
                collinear: u
            } = this;
            if (u) {
                const n = u.indexOf(t);
                return n > 0 && (yield u[n - 1]), void(n < u.length - 1 && (yield u[n + 1]))
            }
            const a = n[t];
            if (-1 === a) return;
            let l = a,
                s = -1;
            do {
                if (yield s = o[l], l = l % 3 == 2 ? l - 2 : l + 1, o[l] !== t) return;
                if (l = i[l], -1 === l) {
                    const n = e[(r[t] + 1) % e.length];
                    return void(n !== s && (yield n))
                }
            } while (l !== a)
        }
        find(t, n, e = 0) {
            if ((t = +t) != t || (n = +n) != n) return -1;
            const r = e;
            let i;
            for (;
                (i = this._step(e, t, n)) >= 0 && i !== e && i !== r;) e = i;
            return i
        }
        _step(t, n, e) {
            const {
                inedges: r,
                hull: i,
                _hullIndex: o,
                halfedges: u,
                triangles: a,
                points: l
            } = this;
            if (-1 === r[t] || !l.length) return (t + 1) % (l.length >> 1);
            let s = t,
                c = vr(n - l[2 * t], 2) + vr(e - l[2 * t + 1], 2);
            const h = r[t];
            let f = h;
            do {
                let r = a[f];
                const h = vr(n - l[2 * r], 2) + vr(e - l[2 * r + 1], 2);
                if (h < c && (c = h, s = r), f = f % 3 == 2 ? f - 2 : f + 1, a[f] !== t) break;
                if (f = u[f], -1 === f) {
                    if (f = i[(o[t] + 1) % i.length], f !== r && vr(n - l[2 * f], 2) + vr(e - l[2 * f + 1], 2) < c) return f;
                    break
                }
            } while (f !== h);
            return s
        }
        render(t) {
            const n = null == t ? t = new pr : void 0,
                {
                    points: e,
                    halfedges: r,
                    triangles: i
                } = this;
            for (let n = 0, o = r.length; n < o; ++n) {
                const o = r[n];
                if (o < n) continue;
                const u = 2 * i[n],
                    a = 2 * i[o];
                t.moveTo(e[u], e[u + 1]), t.lineTo(e[a], e[a + 1])
            }
            return this.renderHull(t), n && n.value()
        }
        renderPoints(t, n) {
            void 0 !== n || t && "function" == typeof t.moveTo || (n = t, t = null), n = null == n ? 2 : +n;
            const e = null == t ? t = new pr : void 0,
                {
                    points: r
                } = this;
            for (let e = 0, i = r.length; e < i; e += 2) {
                const i = r[e],
                    o = r[e + 1];
                t.moveTo(i + n, o), t.arc(i, o, n, 0, yr)
            }
            return e && e.value()
        }
        renderHull(t) {
            const n = null == t ? t = new pr : void 0,
                {
                    hull: e,
                    points: r
                } = this,
                i = 2 * e[0],
                o = e.length;
            t.moveTo(r[i], r[i + 1]);
            for (let n = 1; n < o; ++n) {
                const i = 2 * e[n];
                t.lineTo(r[i], r[i + 1])
            }
            return t.closePath(), n && n.value()
        }
        hullPolygon() {
            const t = new gr;
            return this.renderHull(t), t.value()
        }
        renderTriangle(t, n) {
            const e = null == n ? n = new pr : void 0,
                {
                    points: r,
                    triangles: i
                } = this,
                o = 2 * i[t *= 3],
                u = 2 * i[t + 1],
                a = 2 * i[t + 2];
            return n.moveTo(r[o], r[o + 1]), n.lineTo(r[u], r[u + 1]), n.lineTo(r[a], r[a + 1]), n.closePath(), e && e.value()
        }* trianglePolygons() {
            const {
                triangles: t
            } = this;
            for (let n = 0, e = t.length / 3; n < e; ++n) yield this.trianglePolygon(n)
        }
        trianglePolygon(t) {
            const n = new gr;
            return this.renderTriangle(t, n), n.value()
        }
    }
    const _r = Math.PI,
        Mr = _r / 2,
        Er = 180 / _r,
        Sr = _r / 180,
        Nr = Math.atan2,
        kr = Math.cos,
        Ar = Math.max,
        $r = Math.min,
        Pr = Math.sin,
        Tr = Math.sign || function(t) {
            return t > 0 ? 1 : t < 0 ? -1 : 0
        },
        jr = Math.sqrt;

    function Fr(t, n) {
        return t[0] * n[0] + t[1] * n[1] + t[2] * n[2]
    }

    function zr(t, n) {
        return [t[1] * n[2] - t[2] * n[1], t[2] * n[0] - t[0] * n[2], t[0] * n[1] - t[1] * n[0]]
    }

    function Ir(t, n) {
        return [t[0] + n[0], t[1] + n[1], t[2] + n[2]]
    }

    function Or(t) {
        var n = jr(t[0] * t[0] + t[1] * t[1] + t[2] * t[2]);
        return [t[0] / n, t[1] / n, t[2] / n]
    }

    function Zr(t) {
        return [Nr(t[1], t[0]) * Er, (n = Ar(-1, $r(1, t[2])), (n > 1 ? Mr : n < -1 ? -Mr : Math.asin(n)) * Er)];
        var n
    }

    function Lr(t) {
        const n = t[0] * Sr,
            e = t[1] * Sr,
            r = kr(e);
        return [r * kr(n), r * Pr(n), Pr(e)]
    }

    function qr(t) {
        return Fr((t = t.map((t => Lr(t))))[0], zr(t[2], t[1]))
    }

    function Rr(t) {
        const n = function(t) {
                if (t.length < 2) return {};
                let n = 0;
                for (; isNaN(t[n][0] + t[n][1]) && n++ < t.length;);
                const e = function(t) {
                        function n(n) {
                            return (n = t(n[0] * Nt, n[1] * Nt))[0] *= St, n[1] *= St, n
                        }
                        return t = se(t[0] * Nt, t[1] * Nt, t.length > 2 ? t[2] * Nt : 0), n.invert = function(n) {
                            return (n = t.invert(n[0] * Nt, n[1] * Nt))[0] *= St, n[1] *= St, n
                        }, n
                    }(t[n]),
                    r = hr().translate([0, 0]).scale(1).rotate(e.invert([180, 0]));
                t = t.map(r);
                const i = [];
                let o = 1;
                for (let n = 0, e = t.length; n < e; n++) {
                    let e = t[n][0] ** 2 + t[n][1] ** 2;
                    !isFinite(e) || e > 1e32 ? i.push(n) : e > o && (o = e)
                }
                const u = 1e6 * jr(o);
                i.forEach((n => t[n] = [u, 0])), t.push([0, u]), t.push([-u, 0]), t.push([0, -u]);
                const a = br.from(t);
                a.projection = r;
                const {
                    triangles: l,
                    halfedges: s,
                    inedges: c
                } = a;
                for (let e = 0, r = s.length; e < r; e++)
                    if (s[e] < 0) {
                        const t = e % 3 == 2 ? e - 2 : e + 1,
                            r = e % 3 == 0 ? e + 2 : e - 1,
                            i = s[t],
                            o = s[r];
                        s[i] = o, s[o] = i, s[t] = s[r] = -1, l[e] = l[t] = l[r] = n, c[l[i]] = i % 3 == 0 ? i + 2 : i - 1, c[l[o]] = o % 3 == 0 ? o + 2 : o - 1, e += 2 - e % 3
                    } else l[e] > t.length - 3 - 1 && (l[e] = n);
                return a
            }(t),
            e = function(t) {
                const {
                    triangles: n
                } = t;
                if (!n) return [];
                const e = [];
                for (let t = 0, r = n.length / 3; t < r; t++) {
                    const r = n[3 * t],
                        i = n[3 * t + 1],
                        o = n[3 * t + 2];
                    r !== i && i !== o && e.push([r, o, i])
                }
                return e
            }(n),
            r = function(t, n) {
                const e = new Set;
                return 2 === n.length ? [
                    [0, 1]
                ] : (t.forEach((t => {
                    if (t[0] !== t[1] && !(qr(t.map((t => n[t]))) < 0))
                        for (let n, r = 0; r < 3; r++) n = (r + 1) % 3, e.add(v([t[r], t[n]]).join("-"))
                })), Array.from(e, (t => t.split("-").map(Number))))
            }(e, t),
            i = function(t, n) {
                const e = [];
                t.forEach((t => {
                    for (let n = 0; n < 3; n++) {
                        const r = t[n],
                            i = t[(n + 1) % 3];
                        e[r] = e[r] || [], e[r].push(i)
                    }
                })), 0 === t.length && (2 === n ? (e[0] = [1], e[1] = [0]) : 1 === n && (e[0] = []));
                return e
            }(e, t.length),
            o = function(t, n) {
                function e(t, n) {
                    let e = t[0] - n[0],
                        r = t[1] - n[1],
                        i = t[2] - n[2];
                    return e * e + r * r + i * i
                }
                return function(r, i, o) {
                    void 0 === o && (o = 0);
                    let u, a, l = o;
                    const s = Lr([r, i]);
                    do {
                        u = o, o = null, a = e(s, Lr(n[u])), t[u].forEach((t => {
                            let r = e(s, Lr(n[t]));
                            if (r < a) return a = r, o = t, void(l = t)
                        }))
                    } while (null !== o);
                    return l
                }
            }(i, t),
            u = function(t, n) {
                return t.map((t => {
                    const e = t.map((t => n[t])).map(Lr);
                    return Zr(Or(Ir(Ir(zr(e[1], e[0]), zr(e[2], e[1])), zr(e[0], e[2]))))
                }))
            }(e, t),
            {
                polygons: a,
                centers: l
            } = function(t, n, e) {
                const r = [],
                    i = t.slice();
                if (0 === n.length) {
                    if (e.length < 2) return {
                        polygons: r,
                        centers: i
                    };
                    if (2 === e.length) {
                        const t = Lr(e[0]),
                            n = Lr(e[1]),
                            u = Or(Ir(t, n)),
                            a = Or(zr(t, n)),
                            l = zr(u, a),
                            s = [u, zr(u, l), zr(zr(u, l), l), zr(zr(zr(u, l), l), l)].map(Zr).map(o);
                        return r.push(s), r.push(s.slice().reverse()), {
                            polygons: r,
                            centers: i
                        }
                    }
                }
                n.forEach(((t, n) => {
                    for (let e = 0; e < 3; e++) {
                        const i = t[e],
                            o = t[(e + 1) % 3],
                            u = t[(e + 2) % 3];
                        r[i] = r[i] || [], r[i].push([o, u, n, [i, o, u]])
                    }
                }));

                function o(t) {
                    let e = -1;
                    return i.slice(n.length, 1 / 0).forEach(((r, i) => {
                        r[0] === t[0] && r[1] === t[1] && (e = i + n.length)
                    })), e < 0 && (e = i.length, i.push(t)), e
                }
                return {
                    polygons: r.map((t => {
                        const n = [t[0][2]];
                        let r = t[0][1];
                        for (let e = 1; e < t.length; e++)
                            for (let e = 0; e < t.length; e++)
                                if (t[e][0] == r) {
                                    r = t[e][1], n.push(t[e][2]);
                                    break
                                } if (n.length > 2) return n;
                        if (2 == n.length) {
                            const r = Hr(e[t[0][3][0]], e[t[0][3][1]], i[n[0]]),
                                u = Hr(e[t[0][3][2]], e[t[0][3][0]], i[n[0]]),
                                a = o(r),
                                l = o(u);
                            return [n[0], l, n[1], a]
                        }
                    })),
                    centers: i
                }
            }(u, e, t),
            s = function(t) {
                const n = [];
                return t.forEach((t => {
                    if (!t) return;
                    let e = t[t.length - 1];
                    for (let r of t) r > e && n.push([e, r]), e = r
                })), n
            }(a),
            c = function(t, n) {
                const e = new Set,
                    r = [];
                t.map((t => {
                    if (!(qr(t.map((t => n[t > n.length ? 0 : t]))) > 1e-12))
                        for (let n = 0; n < 3; n++) {
                            let r = [t[n], t[(n + 1) % 3]],
                                i = `${r[0]}-${r[1]}`;
                            e.has(i) ? e.delete(i) : e.add(`${r[1]}-${r[0]}`)
                        }
                }));
                const i = new Map;
                let o;
                if (e.forEach((t => {
                        t = t.split("-").map(Number), i.set(t[0], t[1]), o = t[0]
                    })), void 0 === o) return r;
                let u = o;
                do {
                    r.push(u);
                    let t = i.get(u);
                    i.set(u, -1), u = t
                } while (u > -1 && u !== o);
                return r
            }(e, t),
            h = function(t, n) {
                return function(e) {
                    const r = new Map,
                        i = new Map;
                    return t.forEach(((t, n) => {
                        const o = t.join("-");
                        r.set(o, e[n]), i.set(o, !0)
                    })), n.forEach((t => {
                        let n = 0,
                            e = -1;
                        for (let i = 0; i < 3; i++) {
                            let o = v([t[i], t[(i + 1) % 3]]).join("-");
                            r.get(o) > n && (n = r.get(o), e = o)
                        }
                        i.set(e, !1)
                    })), t.map((t => i.get(t.join("-"))))
                }
            }(r, e);
        return {
            delaunay: n,
            edges: r,
            triangles: e,
            centers: l,
            neighbors: i,
            polygons: a,
            mesh: s,
            hull: c,
            urquhart: h,
            find: o
        }
    }

    function Hr(t, n, e) {
        t = Lr(t), n = Lr(n), e = Lr(e);
        const r = Tr(Fr(zr(n, t), e));
        return Zr(Or(Ir(t, n)).map((t => r * t)))
    }

    function Cr(t) {
        const n = function(t) {
            if (n.delaunay = null, n._data = t, "object" == typeof n._data && "FeatureCollection" === n._data.type && (n._data = n._data.features), "object" == typeof n._data) {
                const t = n._data.map((t => [n._vx(t), n._vy(t), t])).filter((t => isFinite(t[0] + t[1])));
                n.points = t.map((t => [t[0], t[1]])), n.valid = t.map((t => t[2])), n.delaunay = Rr(n.points)
            }
            return n
        };
        return n._vx = function(t) {
            return "object" == typeof t && "type" in t ? ue(t)[0] : 0 in t ? t[0] : void 0
        }, n._vy = function(t) {
            return "object" == typeof t && "type" in t ? ue(t)[1] : 1 in t ? t[1] : void 0
        }, n.x = function(t) {
            return t ? (n._vx = t, n) : n._vx
        }, n.y = function(t) {
            return t ? (n._vy = t, n) : n._vy
        }, n.polygons = function(t) {
            if (void 0 !== t && n(t), !n.delaunay) return !1;
            const e = {
                type: "FeatureCollection",
                features: []
            };
            return 0 === n.valid.length || (n.delaunay.polygons.forEach(((t, r) => e.features.push({
                type: "Feature",
                geometry: t ? {
                    type: "Polygon",
                    coordinates: [
                        [...t, t[0]].map((t => n.delaunay.centers[t]))
                    ]
                } : null,
                properties: {
                    site: n.valid[r],
                    sitecoordinates: n.points[r],
                    neighbours: n.delaunay.neighbors[r]
                }
            }))), 1 === n.valid.length && e.features.push({
                type: "Feature",
                geometry: {
                    type: "Sphere"
                },
                properties: {
                    site: n.valid[0],
                    sitecoordinates: n.points[0],
                    neighbours: []
                }
            })), e
        }, n.triangles = function(t) {
            return void 0 !== t && n(t), !!n.delaunay && {
                type: "FeatureCollection",
                features: n.delaunay.triangles.map(((t, e) => ((t = t.map((t => n.points[t]))).center = n.delaunay.centers[e], t))).filter((t => qr(t) > 0)).map((t => ({
                    type: "Feature",
                    properties: {
                        circumcenter: t.center
                    },
                    geometry: {
                        type: "Polygon",
                        coordinates: [
                            [...t, t[0]]
                        ]
                    }
                })))
            }
        }, n.links = function(t) {
            if (void 0 !== t && n(t), !n.delaunay) return !1;
            const e = n.delaunay.edges.map((t => qe(n.points[t[0]], n.points[t[1]]))),
                r = n.delaunay.urquhart(e);
            return {
                type: "FeatureCollection",
                features: n.delaunay.edges.map(((t, i) => ({
                    type: "Feature",
                    properties: {
                        source: n.valid[t[0]],
                        target: n.valid[t[1]],
                        length: e[i],
                        urquhart: !!r[i]
                    },
                    geometry: {
                        type: "LineString",
                        coordinates: [n.points[t[0]], n.points[t[1]]]
                    }
                })))
            }
        }, n.mesh = function(t) {
            return void 0 !== t && n(t), !!n.delaunay && {
                type: "MultiLineString",
                coordinates: n.delaunay.edges.map((t => [n.points[t[0]], n.points[t[1]]]))
            }
        }, n.cellMesh = function(t) {
            if (void 0 !== t && n(t), !n.delaunay) return !1;
            const {
                centers: e,
                polygons: r
            } = n.delaunay, i = [];
            for (const t of r)
                if (t)
                    for (let n = t.length, r = t[n - 1], o = t[0], u = 0; u < n; r = o, o = t[++u]) o > r && i.push([e[r], e[o]]);
            return {
                type: "MultiLineString",
                coordinates: i
            }
        }, n._found = void 0, n.find = function(t, e, r) {
            if (n._found = n.delaunay.find(t, e, n._found), !r || qe([t, e], n.points[n._found]) < r) return n._found
        }, n.hull = function(t) {
            void 0 !== t && n(t);
            const e = n.delaunay.hull,
                r = n.points;
            return 0 === e.length ? null : {
                type: "Polygon",
                coordinates: [
                    [...e.map((t => r[t])), r[e[0]]]
                ]
            }
        }, t ? n(t) : n
    }

    function Br(t, n) {
        switch (arguments.length) {
            case 0:
                break;
            case 1:
                this.range(t);
                break;
            default:
                this.range(n).domain(t)
        }
        return this
    }

    function Gr(t, n, e) {
        t.prototype = n.prototype = e, e.constructor = t
    }

    function Ur(t, n) {
        var e = Object.create(t.prototype);
        for (var r in n) e[r] = n[r];
        return e
    }

    function Kr() {}
    var Dr = .7,
        Vr = 1 / Dr,
        Xr = "\\s*([+-]?\\d+)\\s*",
        Jr = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)\\s*",
        Yr = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)%\\s*",
        Wr = /^#([0-9a-f]{3,8})$/,
        Qr = new RegExp(`^rgb\\(${Xr},${Xr},${Xr}\\)$`),
        ti = new RegExp(`^rgb\\(${Yr},${Yr},${Yr}\\)$`),
        ni = new RegExp(`^rgba\\(${Xr},${Xr},${Xr},${Jr}\\)$`),
        ei = new RegExp(`^rgba\\(${Yr},${Yr},${Yr},${Jr}\\)$`),
        ri = new RegExp(`^hsl\\(${Jr},${Yr},${Yr}\\)$`),
        ii = new RegExp(`^hsla\\(${Jr},${Yr},${Yr},${Jr}\\)$`),
        oi = {
            aliceblue: 15792383,
            antiquewhite: 16444375,
            aqua: 65535,
            aquamarine: 8388564,
            azure: 15794175,
            beige: 16119260,
            bisque: 16770244,
            black: 0,
            blanchedalmond: 16772045,
            blue: 255,
            blueviolet: 9055202,
            brown: 10824234,
            burlywood: 14596231,
            cadetblue: 6266528,
            chartreuse: 8388352,
            chocolate: 13789470,
            coral: 16744272,
            cornflowerblue: 6591981,
            cornsilk: 16775388,
            crimson: 14423100,
            cyan: 65535,
            darkblue: 139,
            darkcyan: 35723,
            darkgoldenrod: 12092939,
            darkgray: 11119017,
            darkgreen: 25600,
            darkgrey: 11119017,
            darkkhaki: 12433259,
            darkmagenta: 9109643,
            darkolivegreen: 5597999,
            darkorange: 16747520,
            darkorchid: 10040012,
            darkred: 9109504,
            darksalmon: 15308410,
            darkseagreen: 9419919,
            darkslateblue: 4734347,
            darkslategray: 3100495,
            darkslategrey: 3100495,
            darkturquoise: 52945,
            darkviolet: 9699539,
            deeppink: 16716947,
            deepskyblue: 49151,
            dimgray: 6908265,
            dimgrey: 6908265,
            dodgerblue: 2003199,
            firebrick: 11674146,
            floralwhite: 16775920,
            forestgreen: 2263842,
            fuchsia: 16711935,
            gainsboro: 14474460,
            ghostwhite: 16316671,
            gold: 16766720,
            goldenrod: 14329120,
            gray: 8421504,
            green: 32768,
            greenyellow: 11403055,
            grey: 8421504,
            honeydew: 15794160,
            hotpink: 16738740,
            indianred: 13458524,
            indigo: 4915330,
            ivory: 16777200,
            khaki: 15787660,
            lavender: 15132410,
            lavenderblush: 16773365,
            lawngreen: 8190976,
            lemonchiffon: 16775885,
            lightblue: 11393254,
            lightcoral: 15761536,
            lightcyan: 14745599,
            lightgoldenrodyellow: 16448210,
            lightgray: 13882323,
            lightgreen: 9498256,
            lightgrey: 13882323,
            lightpink: 16758465,
            lightsalmon: 16752762,
            lightseagreen: 2142890,
            lightskyblue: 8900346,
            lightslategray: 7833753,
            lightslategrey: 7833753,
            lightsteelblue: 11584734,
            lightyellow: 16777184,
            lime: 65280,
            limegreen: 3329330,
            linen: 16445670,
            magenta: 16711935,
            maroon: 8388608,
            mediumaquamarine: 6737322,
            mediumblue: 205,
            mediumorchid: 12211667,
            mediumpurple: 9662683,
            mediumseagreen: 3978097,
            mediumslateblue: 8087790,
            mediumspringgreen: 64154,
            mediumturquoise: 4772300,
            mediumvioletred: 13047173,
            midnightblue: 1644912,
            mintcream: 16121850,
            mistyrose: 16770273,
            moccasin: 16770229,
            navajowhite: 16768685,
            navy: 128,
            oldlace: 16643558,
            olive: 8421376,
            olivedrab: 7048739,
            orange: 16753920,
            orangered: 16729344,
            orchid: 14315734,
            palegoldenrod: 15657130,
            palegreen: 10025880,
            paleturquoise: 11529966,
            palevioletred: 14381203,
            papayawhip: 16773077,
            peachpuff: 16767673,
            peru: 13468991,
            pink: 16761035,
            plum: 14524637,
            powderblue: 11591910,
            purple: 8388736,
            rebeccapurple: 6697881,
            red: 16711680,
            rosybrown: 12357519,
            royalblue: 4286945,
            saddlebrown: 9127187,
            salmon: 16416882,
            sandybrown: 16032864,
            seagreen: 3050327,
            seashell: 16774638,
            sienna: 10506797,
            silver: 12632256,
            skyblue: 8900331,
            slateblue: 6970061,
            slategray: 7372944,
            slategrey: 7372944,
            snow: 16775930,
            springgreen: 65407,
            steelblue: 4620980,
            tan: 13808780,
            teal: 32896,
            thistle: 14204888,
            tomato: 16737095,
            turquoise: 4251856,
            violet: 15631086,
            wheat: 16113331,
            white: 16777215,
            whitesmoke: 16119285,
            yellow: 16776960,
            yellowgreen: 10145074
        };

    function ui() {
        return this.rgb().formatHex()
    }

    function ai() {
        return this.rgb().formatRgb()
    }

    function li(t) {
        var n, e;
        return t = (t + "").trim().toLowerCase(), (n = Wr.exec(t)) ? (e = n[1].length, n = parseInt(n[1], 16), 6 === e ? si(n) : 3 === e ? new pi(n >> 8 & 15 | n >> 4 & 240, n >> 4 & 15 | 240 & n, (15 & n) << 4 | 15 & n, 1) : 8 === e ? ci(n >> 24 & 255, n >> 16 & 255, n >> 8 & 255, (255 & n) / 255) : 4 === e ? ci(n >> 12 & 15 | n >> 8 & 240, n >> 8 & 15 | n >> 4 & 240, n >> 4 & 15 | 240 & n, ((15 & n) << 4 | 15 & n) / 255) : null) : (n = Qr.exec(t)) ? new pi(n[1], n[2], n[3], 1) : (n = ti.exec(t)) ? new pi(255 * n[1] / 100, 255 * n[2] / 100, 255 * n[3] / 100, 1) : (n = ni.exec(t)) ? ci(n[1], n[2], n[3], n[4]) : (n = ei.exec(t)) ? ci(255 * n[1] / 100, 255 * n[2] / 100, 255 * n[3] / 100, n[4]) : (n = ri.exec(t)) ? xi(n[1], n[2] / 100, n[3] / 100, 1) : (n = ii.exec(t)) ? xi(n[1], n[2] / 100, n[3] / 100, n[4]) : oi.hasOwnProperty(t) ? si(oi[t]) : "transparent" === t ? new pi(NaN, NaN, NaN, 0) : null
    }

    function si(t) {
        return new pi(t >> 16 & 255, t >> 8 & 255, 255 & t, 1)
    }

    function ci(t, n, e, r) {
        return r <= 0 && (t = n = e = NaN), new pi(t, n, e, r)
    }

    function hi(t) {
        return t instanceof Kr || (t = li(t)), t ? new pi((t = t.rgb()).r, t.g, t.b, t.opacity) : new pi
    }

    function fi(t, n, e, r) {
        return 1 === arguments.length ? hi(t) : new pi(t, n, e, null == r ? 1 : r)
    }

    function pi(t, n, e, r) {
        this.r = +t, this.g = +n, this.b = +e, this.opacity = +r
    }

    function gi() {
        return `#${mi(this.r)}${mi(this.g)}${mi(this.b)}`
    }

    function di() {
        const t = yi(this.opacity);
        return `${1===t?"rgb(":"rgba("}${vi(this.r)}, ${vi(this.g)}, ${vi(this.b)}${1===t?")":`, ${t})`}`
    }

    function yi(t) {
        return isNaN(t) ? 1 : Math.max(0, Math.min(1, t))
    }

    function vi(t) {
        return Math.max(0, Math.min(255, Math.round(t) || 0))
    }

    function mi(t) {
        return ((t = vi(t)) < 16 ? "0" : "") + t.toString(16)
    }

    function xi(t, n, e, r) {
        return r <= 0 ? t = n = e = NaN : e <= 0 || e >= 1 ? t = n = NaN : n <= 0 && (t = NaN), new bi(t, n, e, r)
    }

    function wi(t) {
        if (t instanceof bi) return new bi(t.h, t.s, t.l, t.opacity);
        if (t instanceof Kr || (t = li(t)), !t) return new bi;
        if (t instanceof bi) return t;
        var n = (t = t.rgb()).r / 255,
            e = t.g / 255,
            r = t.b / 255,
            i = Math.min(n, e, r),
            o = Math.max(n, e, r),
            u = NaN,
            a = o - i,
            l = (o + i) / 2;
        return a ? (u = n === o ? (e - r) / a + 6 * (e < r) : e === o ? (r - n) / a + 2 : (n - e) / a + 4, a /= l < .5 ? o + i : 2 - o - i, u *= 60) : a = l > 0 && l < 1 ? 0 : u, new bi(u, a, l, t.opacity)
    }

    function bi(t, n, e, r) {
        this.h = +t, this.s = +n, this.l = +e, this.opacity = +r
    }

    function _i(t) {
        return (t = (t || 0) % 360) < 0 ? t + 360 : t
    }

    function Mi(t) {
        return Math.max(0, Math.min(1, t || 0))
    }

    function Ei(t, n, e) {
        return 255 * (t < 60 ? n + (e - n) * t / 60 : t < 180 ? e : t < 240 ? n + (e - n) * (240 - t) / 60 : n)
    }
    Gr(Kr, li, {
        copy(t) {
            return Object.assign(new this.constructor, this, t)
        },
        displayable() {
            return this.rgb().displayable()
        },
        hex: ui,
        formatHex: ui,
        formatHex8: function() {
            return this.rgb().formatHex8()
        },
        formatHsl: function() {
            return wi(this).formatHsl()
        },
        formatRgb: ai,
        toString: ai
    }), Gr(pi, fi, Ur(Kr, {
        brighter(t) {
            return t = null == t ? Vr : Math.pow(Vr, t), new pi(this.r * t, this.g * t, this.b * t, this.opacity)
        },
        darker(t) {
            return t = null == t ? Dr : Math.pow(Dr, t), new pi(this.r * t, this.g * t, this.b * t, this.opacity)
        },
        rgb() {
            return this
        },
        clamp() {
            return new pi(vi(this.r), vi(this.g), vi(this.b), yi(this.opacity))
        },
        displayable() {
            return -.5 <= this.r && this.r < 255.5 && -.5 <= this.g && this.g < 255.5 && -.5 <= this.b && this.b < 255.5 && 0 <= this.opacity && this.opacity <= 1
        },
        hex: gi,
        formatHex: gi,
        formatHex8: function() {
            return `#${mi(this.r)}${mi(this.g)}${mi(this.b)}${mi(255*(isNaN(this.opacity)?1:this.opacity))}`
        },
        formatRgb: di,
        toString: di
    })), Gr(bi, (function(t, n, e, r) {
        return 1 === arguments.length ? wi(t) : new bi(t, n, e, null == r ? 1 : r)
    }), Ur(Kr, {
        brighter(t) {
            return t = null == t ? Vr : Math.pow(Vr, t), new bi(this.h, this.s, this.l * t, this.opacity)
        },
        darker(t) {
            return t = null == t ? Dr : Math.pow(Dr, t), new bi(this.h, this.s, this.l * t, this.opacity)
        },
        rgb() {
            var t = this.h % 360 + 360 * (this.h < 0),
                n = isNaN(t) || isNaN(this.s) ? 0 : this.s,
                e = this.l,
                r = e + (e < .5 ? e : 1 - e) * n,
                i = 2 * e - r;
            return new pi(Ei(t >= 240 ? t - 240 : t + 120, i, r), Ei(t, i, r), Ei(t < 120 ? t + 240 : t - 120, i, r), this.opacity)
        },
        clamp() {
            return new bi(_i(this.h), Mi(this.s), Mi(this.l), yi(this.opacity))
        },
        displayable() {
            return (0 <= this.s && this.s <= 1 || isNaN(this.s)) && 0 <= this.l && this.l <= 1 && 0 <= this.opacity && this.opacity <= 1
        },
        formatHsl() {
            const t = yi(this.opacity);
            return `${1===t?"hsl(":"hsla("}${_i(this.h)}, ${100*Mi(this.s)}%, ${100*Mi(this.l)}%${1===t?")":`, ${t})`}`
        }
    }));
    var Si = t => () => t;

    function Ni(t) {
        return 1 == (t = +t) ? ki : function(n, e) {
            return e - n ? function(t, n, e) {
                return t = Math.pow(t, e), n = Math.pow(n, e) - t, e = 1 / e,
                    function(r) {
                        return Math.pow(t + r * n, e)
                    }
            }(n, e, t) : Si(isNaN(n) ? e : n)
        }
    }

    function ki(t, n) {
        var e = n - t;
        return e ? function(t, n) {
            return function(e) {
                return t + e * n
            }
        }(t, e) : Si(isNaN(t) ? n : t)
    }
    var Ai = function t(n) {
        var e = Ni(n);

        function r(t, n) {
            var r = e((t = fi(t)).r, (n = fi(n)).r),
                i = e(t.g, n.g),
                o = e(t.b, n.b),
                u = ki(t.opacity, n.opacity);
            return function(n) {
                return t.r = r(n), t.g = i(n), t.b = o(n), t.opacity = u(n), t + ""
            }
        }
        return r.gamma = t, r
    }(1);

    function $i(t, n) {
        n || (n = []);
        var e, r = t ? Math.min(n.length, t.length) : 0,
            i = n.slice();
        return function(o) {
            for (e = 0; e < r; ++e) i[e] = t[e] * (1 - o) + n[e] * o;
            return i
        }
    }

    function Pi(t, n) {
        var e, r = n ? n.length : 0,
            i = t ? Math.min(r, t.length) : 0,
            o = new Array(i),
            u = new Array(r);
        for (e = 0; e < i; ++e) o[e] = Zi(t[e], n[e]);
        for (; e < r; ++e) u[e] = n[e];
        return function(t) {
            for (e = 0; e < i; ++e) u[e] = o[e](t);
            return u
        }
    }

    function Ti(t, n) {
        var e = new Date;
        return t = +t, n = +n,
            function(r) {
                return e.setTime(t * (1 - r) + n * r), e
            }
    }

    function ji(t, n) {
        return t = +t, n = +n,
            function(e) {
                return t * (1 - e) + n * e
            }
    }

    function Fi(t, n) {
        var e, r = {},
            i = {};
        for (e in null !== t && "object" == typeof t || (t = {}), null !== n && "object" == typeof n || (n = {}), n) e in t ? r[e] = Zi(t[e], n[e]) : i[e] = n[e];
        return function(t) {
            for (e in r) i[e] = r[e](t);
            return i
        }
    }
    var zi = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g,
        Ii = new RegExp(zi.source, "g");

    function Oi(t, n) {
        var e, r, i, o = zi.lastIndex = Ii.lastIndex = 0,
            u = -1,
            a = [],
            l = [];
        for (t += "", n += "";
            (e = zi.exec(t)) && (r = Ii.exec(n));)(i = r.index) > o && (i = n.slice(o, i), a[u] ? a[u] += i : a[++u] = i), (e = e[0]) === (r = r[0]) ? a[u] ? a[u] += r : a[++u] = r : (a[++u] = null, l.push({
            i: u,
            x: ji(e, r)
        })), o = Ii.lastIndex;
        return o < n.length && (i = n.slice(o), a[u] ? a[u] += i : a[++u] = i), a.length < 2 ? l[0] ? function(t) {
            return function(n) {
                return t(n) + ""
            }
        }(l[0].x) : function(t) {
            return function() {
                return t
            }
        }(n) : (n = l.length, function(t) {
            for (var e, r = 0; r < n; ++r) a[(e = l[r]).i] = e.x(t);
            return a.join("")
        })
    }

    function Zi(t, n) {
        var e, r, i = typeof n;
        return null == n || "boolean" === i ? Si(n) : ("number" === i ? ji : "string" === i ? (e = li(n)) ? (n = e, Ai) : Oi : n instanceof li ? Ai : n instanceof Date ? Ti : (r = n, !ArrayBuffer.isView(r) || r instanceof DataView ? Array.isArray(n) ? Pi : "function" != typeof n.valueOf && "function" != typeof n.toString || isNaN(n) ? Fi : ji : $i))(t, n)
    }

    function Li(t, n) {
        return t = +t, n = +n,
            function(e) {
                return Math.round(t * (1 - e) + n * e)
            }
    }

    function qi(t) {
        return +t
    }
    var Ri = [0, 1];

    function Hi(t) {
        return t
    }

    function Ci(t, n) {
        return (n -= t = +t) ? function(e) {
            return (e - t) / n
        } : (e = isNaN(n) ? NaN : .5, function() {
            return e
        });
        var e
    }

    function Bi(t, n, e) {
        var r = t[0],
            i = t[1],
            o = n[0],
            u = n[1];
        return i < r ? (r = Ci(i, r), o = e(u, o)) : (r = Ci(r, i), o = e(o, u)),
            function(t) {
                return o(r(t))
            }
    }

    function Gi(t, n, e) {
        var r = Math.min(t.length, n.length) - 1,
            i = new Array(r),
            o = new Array(r),
            u = -1;
        for (t[r] < t[0] && (t = t.slice().reverse(), n = n.slice().reverse()); ++u < r;) i[u] = Ci(t[u], t[u + 1]), o[u] = e(n[u], n[u + 1]);
        return function(n) {
            var e = y(t, n, 1, r) - 1;
            return o[e](i[e](n))
        }
    }

    function Ui(t, n) {
        return n.domain(t.domain()).range(t.range()).interpolate(t.interpolate()).clamp(t.clamp()).unknown(t.unknown())
    }

    function Ki() {
        var t, n, e, r, i, o, u = Ri,
            a = Ri,
            l = Zi,
            s = Hi;

        function c() {
            var t, n, e, l = Math.min(u.length, a.length);
            return s !== Hi && (t = u[0], n = u[l - 1], t > n && (e = t, t = n, n = e), s = function(e) {
                return Math.max(t, Math.min(n, e))
            }), r = l > 2 ? Gi : Bi, i = o = null, h
        }

        function h(n) {
            return null == n || isNaN(n = +n) ? e : (i || (i = r(u.map(t), a, l)))(t(s(n)))
        }
        return h.invert = function(e) {
                return s(n((o || (o = r(a, u.map(t), ji)))(e)))
            }, h.domain = function(t) {
                return arguments.length ? (u = Array.from(t, qi), c()) : u.slice()
            }, h.range = function(t) {
                return arguments.length ? (a = Array.from(t), c()) : a.slice()
            }, h.rangeRound = function(t) {
                return a = Array.from(t), l = Li, c()
            }, h.clamp = function(t) {
                return arguments.length ? (s = !!t || Hi, c()) : s !== Hi
            }, h.interpolate = function(t) {
                return arguments.length ? (l = t, c()) : l
            }, h.unknown = function(t) {
                return arguments.length ? (e = t, h) : e
            },
            function(e, r) {
                return t = e, n = r, c()
            }
    }

    function Di() {
        return Ki()(Hi, Hi)
    }

    function Vi(t, n) {
        if ((e = (t = n ? t.toExponential(n - 1) : t.toExponential()).indexOf("e")) < 0) return null;
        var e, r = t.slice(0, e);
        return [r.length > 1 ? r[0] + r.slice(2) : r, +t.slice(e + 1)]
    }

    function Xi(t) {
        return (t = Vi(Math.abs(t))) ? t[1] : NaN
    }
    var Ji, Yi = /^(?:(.)?([<>=^]))?([+\-( ])?([$#])?(0)?(\d+)?(,)?(\.\d+)?(~)?([a-z%])?$/i;

    function Wi(t) {
        if (!(n = Yi.exec(t))) throw new Error("invalid format: " + t);
        var n;
        return new Qi({
            fill: n[1],
            align: n[2],
            sign: n[3],
            symbol: n[4],
            zero: n[5],
            width: n[6],
            comma: n[7],
            precision: n[8] && n[8].slice(1),
            trim: n[9],
            type: n[10]
        })
    }

    function Qi(t) {
        this.fill = void 0 === t.fill ? " " : t.fill + "", this.align = void 0 === t.align ? ">" : t.align + "", this.sign = void 0 === t.sign ? "-" : t.sign + "", this.symbol = void 0 === t.symbol ? "" : t.symbol + "", this.zero = !!t.zero, this.width = void 0 === t.width ? void 0 : +t.width, this.comma = !!t.comma, this.precision = void 0 === t.precision ? void 0 : +t.precision, this.trim = !!t.trim, this.type = void 0 === t.type ? "" : t.type + ""
    }

    function to(t, n) {
        var e = Vi(t, n);
        if (!e) return t + "";
        var r = e[0],
            i = e[1];
        return i < 0 ? "0." + new Array(-i).join("0") + r : r.length > i + 1 ? r.slice(0, i + 1) + "." + r.slice(i + 1) : r + new Array(i - r.length + 2).join("0")
    }
    Wi.prototype = Qi.prototype, Qi.prototype.toString = function() {
        return this.fill + this.align + this.sign + this.symbol + (this.zero ? "0" : "") + (void 0 === this.width ? "" : Math.max(1, 0 | this.width)) + (this.comma ? "," : "") + (void 0 === this.precision ? "" : "." + Math.max(0, 0 | this.precision)) + (this.trim ? "~" : "") + this.type
    };
    var no = {
        "%": (t, n) => (100 * t).toFixed(n),
        b: t => Math.round(t).toString(2),
        c: t => t + "",
        d: function(t) {
            return Math.abs(t = Math.round(t)) >= 1e21 ? t.toLocaleString("en").replace(/,/g, "") : t.toString(10)
        },
        e: (t, n) => t.toExponential(n),
        f: (t, n) => t.toFixed(n),
        g: (t, n) => t.toPrecision(n),
        o: t => Math.round(t).toString(8),
        p: (t, n) => to(100 * t, n),
        r: to,
        s: function(t, n) {
            var e = Vi(t, n);
            if (!e) return t + "";
            var r = e[0],
                i = e[1],
                o = i - (Ji = 3 * Math.max(-8, Math.min(8, Math.floor(i / 3)))) + 1,
                u = r.length;
            return o === u ? r : o > u ? r + new Array(o - u + 1).join("0") : o > 0 ? r.slice(0, o) + "." + r.slice(o) : "0." + new Array(1 - o).join("0") + Vi(t, Math.max(0, n + o - 1))[0]
        },
        X: t => Math.round(t).toString(16).toUpperCase(),
        x: t => Math.round(t).toString(16)
    };

    function eo(t) {
        return t
    }
    var ro, io, oo, uo = Array.prototype.map,
        ao = ["y", "z", "a", "f", "p", "n", "µ", "m", "", "k", "M", "G", "T", "P", "E", "Z", "Y"];

    function lo(t) {
        var n, e, r = void 0 === t.grouping || void 0 === t.thousands ? eo : (n = uo.call(t.grouping, Number), e = t.thousands + "", function(t, r) {
                for (var i = t.length, o = [], u = 0, a = n[0], l = 0; i > 0 && a > 0 && (l + a + 1 > r && (a = Math.max(1, r - l)), o.push(t.substring(i -= a, i + a)), !((l += a + 1) > r));) a = n[u = (u + 1) % n.length];
                return o.reverse().join(e)
            }),
            i = void 0 === t.currency ? "" : t.currency[0] + "",
            o = void 0 === t.currency ? "" : t.currency[1] + "",
            u = void 0 === t.decimal ? "." : t.decimal + "",
            a = void 0 === t.numerals ? eo : function(t) {
                return function(n) {
                    return n.replace(/[0-9]/g, (function(n) {
                        return t[+n]
                    }))
                }
            }(uo.call(t.numerals, String)),
            l = void 0 === t.percent ? "%" : t.percent + "",
            s = void 0 === t.minus ? "−" : t.minus + "",
            c = void 0 === t.nan ? "NaN" : t.nan + "";

        function h(t) {
            var n = (t = Wi(t)).fill,
                e = t.align,
                h = t.sign,
                f = t.symbol,
                p = t.zero,
                g = t.width,
                d = t.comma,
                y = t.precision,
                v = t.trim,
                m = t.type;
            "n" === m ? (d = !0, m = "g") : no[m] || (void 0 === y && (y = 12), v = !0, m = "g"), (p || "0" === n && "=" === e) && (p = !0, n = "0", e = "=");
            var x = "$" === f ? i : "#" === f && /[boxX]/.test(m) ? "0" + m.toLowerCase() : "",
                w = "$" === f ? o : /[%p]/.test(m) ? l : "",
                b = no[m],
                _ = /[defgprs%]/.test(m);

            function M(t) {
                var i, o, l, f = x,
                    M = w;
                if ("c" === m) M = b(t) + M, t = "";
                else {
                    var E = (t = +t) < 0 || 1 / t < 0;
                    if (t = isNaN(t) ? c : b(Math.abs(t), y), v && (t = function(t) {
                            t: for (var n, e = t.length, r = 1, i = -1; r < e; ++r) switch (t[r]) {
                                case ".":
                                    i = n = r;
                                    break;
                                case "0":
                                    0 === i && (i = r), n = r;
                                    break;
                                default:
                                    if (!+t[r]) break t;
                                    i > 0 && (i = 0)
                            }
                            return i > 0 ? t.slice(0, i) + t.slice(n + 1) : t
                        }(t)), E && 0 == +t && "+" !== h && (E = !1), f = (E ? "(" === h ? h : s : "-" === h || "(" === h ? "" : h) + f, M = ("s" === m ? ao[8 + Ji / 3] : "") + M + (E && "(" === h ? ")" : ""), _)
                        for (i = -1, o = t.length; ++i < o;)
                            if (48 > (l = t.charCodeAt(i)) || l > 57) {
                                M = (46 === l ? u + t.slice(i + 1) : t.slice(i)) + M, t = t.slice(0, i);
                                break
                            }
                }
                d && !p && (t = r(t, 1 / 0));
                var S = f.length + t.length + M.length,
                    N = S < g ? new Array(g - S + 1).join(n) : "";
                switch (d && p && (t = r(N + t, N.length ? g - M.length : 1 / 0), N = ""), e) {
                    case "<":
                        t = f + t + M + N;
                        break;
                    case "=":
                        t = f + N + t + M;
                        break;
                    case "^":
                        t = N.slice(0, S = N.length >> 1) + f + t + M + N.slice(S);
                        break;
                    default:
                        t = N + f + t + M
                }
                return a(t)
            }
            return y = void 0 === y ? 6 : /[gprs]/.test(m) ? Math.max(1, Math.min(21, y)) : Math.max(0, Math.min(20, y)), M.toString = function() {
                return t + ""
            }, M
        }
        return {
            format: h,
            formatPrefix: function(t, n) {
                var e = h(((t = Wi(t)).type = "f", t)),
                    r = 3 * Math.max(-8, Math.min(8, Math.floor(Xi(n) / 3))),
                    i = Math.pow(10, -r),
                    o = ao[8 + r / 3];
                return function(t) {
                    return e(i * t) + o
                }
            }
        }
    }

    function so(t, n, e, r) {
        var i, o = function(t, n, e) {
            var r = Math.abs(n - t) / Math.max(0, e),
                i = Math.pow(10, Math.floor(Math.log(r) / Math.LN10)),
                o = r / i;
            return o >= x ? i *= 10 : o >= w ? i *= 5 : o >= b && (i *= 2), n < t ? -i : i
        }(t, n, e);
        switch ((r = Wi(null == r ? ",f" : r)).type) {
            case "s":
                var u = Math.max(Math.abs(t), Math.abs(n));
                return null != r.precision || isNaN(i = function(t, n) {
                    return Math.max(0, 3 * Math.max(-8, Math.min(8, Math.floor(Xi(n) / 3))) - Xi(Math.abs(t)))
                }(o, u)) || (r.precision = i), oo(r, u);
            case "":
            case "e":
            case "g":
            case "p":
            case "r":
                null != r.precision || isNaN(i = function(t, n) {
                    return t = Math.abs(t), n = Math.abs(n) - t, Math.max(0, Xi(n) - Xi(t)) + 1
                }(o, Math.max(Math.abs(t), Math.abs(n)))) || (r.precision = i - ("e" === r.type));
                break;
            case "f":
            case "%":
                null != r.precision || isNaN(i = function(t) {
                    return Math.max(0, -Xi(Math.abs(t)))
                }(o)) || (r.precision = i - 2 * ("%" === r.type))
        }
        return io(r)
    }

    function co(t) {
        var n = t.domain;
        return t.ticks = function(t) {
            var e = n();
            return function(t, n, e) {
                var r, i, o, u, a = -1;
                if (e = +e, (t = +t) == (n = +n) && e > 0) return [t];
                if ((r = n < t) && (i = t, t = n, n = i), 0 === (u = _(t, n, e)) || !isFinite(u)) return [];
                if (u > 0) {
                    let e = Math.round(t / u),
                        r = Math.round(n / u);
                    for (e * u < t && ++e, r * u > n && --r, o = new Array(i = r - e + 1); ++a < i;) o[a] = (e + a) * u
                } else {
                    u = -u;
                    let e = Math.round(t * u),
                        r = Math.round(n * u);
                    for (e / u < t && ++e, r / u > n && --r, o = new Array(i = r - e + 1); ++a < i;) o[a] = (e + a) / u
                }
                return r && o.reverse(), o
            }(e[0], e[e.length - 1], null == t ? 10 : t)
        }, t.tickFormat = function(t, e) {
            var r = n();
            return so(r[0], r[r.length - 1], null == t ? 10 : t, e)
        }, t.nice = function(e) {
            null == e && (e = 10);
            var r, i, o = n(),
                u = 0,
                a = o.length - 1,
                l = o[u],
                s = o[a],
                c = 10;
            for (s < l && (i = l, l = s, s = i, i = u, u = a, a = i); c-- > 0;) {
                if ((i = _(l, s, e)) === r) return o[u] = l, o[a] = s, n(o);
                if (i > 0) l = Math.floor(l / i) * i, s = Math.ceil(s / i) * i;
                else {
                    if (!(i < 0)) break;
                    l = Math.ceil(l * i) / i, s = Math.floor(s * i) / i
                }
                r = i
            }
            return t
        }, t
    }

    function ho() {
        var t = Di();
        return t.copy = function() {
            return Ui(t, ho())
        }, Br.apply(t, arguments), co(t)
    }

    function fo(t, n) {
        return t.map((function(t) {
            var e, r = [];
            return t.forEach((function(t) {
                if (e) {
                    var i = 180 * qe(t, e) / Math.PI;
                    if (i > n)
                        for (var o = function(t, n) {
                                var e = t[0] * Nt,
                                    r = t[1] * Nt,
                                    i = n[0] * Nt,
                                    o = n[1] * Nt,
                                    u = Pt(r),
                                    a = jt(r),
                                    l = Pt(o),
                                    s = jt(o),
                                    c = u * Pt(e),
                                    h = u * jt(e),
                                    f = l * Pt(i),
                                    p = l * jt(i),
                                    g = 2 * It(zt(Ot(o - r) + u * l * Ot(i - e))),
                                    d = jt(g),
                                    y = g ? function(t) {
                                        var n = jt(t *= g) / d,
                                            e = jt(g - t) / d,
                                            r = e * c + n * f,
                                            i = e * h + n * p,
                                            o = e * a + n * s;
                                        return [$t(i, r) * St, $t(o, zt(r * r + i * i)) * St]
                                    } : function() {
                                        return [e * St, r * St]
                                    };
                                return y.distance = g, y
                            }(e, t), u = 1 / Math.ceil(i / n), a = u; a < 1;) r.push(o(a)), a += u
                }
                r.push(e = t)
            })), r
        }))
    }

    function po(t, n) {
        var e = {
                type: "Polygon",
                coordinates: t
            },
            r = a(Vn(e), 2),
            i = a(r[0], 2),
            o = i[0],
            u = i[1],
            l = a(r[1], 2),
            s = l[0],
            c = l[1];
        if (Math.min(Math.abs(s - o), Math.abs(c - u)) < n) return [];
        var h = o > s || c >= 89 || u <= -89;
        return function(t) {
            for (var n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}, e = n.minLng, r = n.maxLng, i = n.minLat, o = n.maxLat, u = Math.round(Math.pow(360 / t, 2) / Math.PI), a = (1 + Math.sqrt(5)) / 2, l = function(t) {
                    return t / a * 360 % 360 - 180
                }, s = function(t) {
                    return Math.acos(2 * t / u - 1) / Math.PI * 180 - 90
                }, c = function(t) {
                    return u * (Math.cos((t + 90) * Math.PI / 180) + 1) / 2
                }, h = [void 0 !== o ? Math.ceil(c(o)) : 0, void 0 !== i ? Math.floor(c(i)) : u - 1], f = void 0 === e && void 0 === r ? function() {
                    return !0
                } : void 0 === e ? function(t) {
                    return t <= r
                } : void 0 === r ? function(t) {
                    return t >= e
                } : r >= e ? function(t) {
                    return t >= e && t <= r
                } : function(t) {
                    return t >= e || t <= r
                }, p = [], g = h[0]; g <= h[1]; g++) {
                var d = l(g);
                f(d) && p.push([d, s(g)])
            }
            return p
        }(n, {
            minLng: o,
            maxLng: s,
            minLat: u,
            maxLat: c
        }).filter((function(t) {
            return go(t, e, h)
        }))
    }

    function go(t, n) {
        var e = arguments.length > 2 && void 0 !== arguments[2] && arguments[2];
        return e ? Ve(n, t) : vt(t, n)
    }
    ro = lo({
        thousands: ",",
        grouping: [3],
        currency: ["$", ""]
    }), io = ro.format, oo = ro.formatPrefix;
    var yo = window.THREE ? window.THREE : {
            BufferGeometry: n.BufferGeometry,
            Float32BufferAttribute: n.Float32BufferAttribute
        },
        vo = (new yo.BufferGeometry).setAttribute ? "setAttribute" : "addAttribute",
        mo = function(t) {
            ! function(t, n) {
                if ("function" != typeof n && null !== n) throw new TypeError("Super expression must either be null or a function");
                t.prototype = Object.create(n && n.prototype, {
                    constructor: {
                        value: t,
                        writable: !0,
                        configurable: !0
                    }
                }), Object.defineProperty(t, "prototype", {
                    writable: !1
                }), n && i(t, n)
            }(c, t);
            var n, r, o, s = u(c);

            function c(t, n, e, r, i, o, u) {
                var h;
                ! function(t, n) {
                    if (!(t instanceof n)) throw new TypeError("Cannot call a class as a function")
                }(this, c), (h = s.call(this)).type = "ConicPolygonBufferGeometry", h.parameters = {
                    polygonGeoJson: t,
                    startHeight: n,
                    endHeight: e,
                    closedBottom: r,
                    closedTop: i,
                    includeSides: o,
                    curvatureResolution: u
                }, n = n || 0, e = e || 1, r = void 0 === r || r, i = void 0 === i || i, o = void 0 === o || o;
                var f = function(t) {
                        var n = (arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}).resolution,
                            e = void 0 === n ? 1 / 0 : n,
                            r = fo(t, e),
                            i = E(r),
                            o = po(t, e),
                            u = [].concat(l(i), l(o)),
                            s = {
                                type: "Polygon",
                                coordinates: t
                            },
                            c = a(Vn(s), 2),
                            h = a(c[0], 2),
                            f = h[0],
                            p = h[1],
                            g = a(c[1], 2),
                            d = g[0],
                            y = g[1],
                            m = f > d || y >= 89 || p <= -89,
                            x = [];
                        if (m) {
                            var w = Cr(u).triangles(),
                                b = new Map(u.map((function(t, n) {
                                    var e = a(t, 2),
                                        r = e[0],
                                        i = e[1];
                                    return ["".concat(r, "-").concat(i), n]
                                })));
                            w.features.forEach((function(t) {
                                var n, e = t.geometry.coordinates[0].slice(0, 3).reverse(),
                                    r = [];
                                if (e.forEach((function(t) {
                                        var n = a(t, 2),
                                            e = n[0],
                                            i = n[1],
                                            o = "".concat(e, "-").concat(i);
                                        b.has(o) && r.push(b.get(o))
                                    })), 3 === r.length) {
                                    if (r.some((function(t) {
                                            return t < i.length
                                        })) && !go(t.properties.circumcenter, s, m)) return;
                                    (n = x).push.apply(n, r)
                                }
                            }))
                        } else if (o.length) ! function() {
                            for (var t = st.from(u), n = function(n, e) {
                                    var r, o = [2, 1, 0].map((function(e) {
                                            return t.triangles[n + e]
                                        })),
                                        a = o.map((function(t) {
                                            return u[t]
                                        }));
                                    if (o.some((function(t) {
                                            return t < i.length
                                        })) && !go([0, 1].map((function(t) {
                                            return M(a, (function(n) {
                                                return n[t]
                                            }))
                                        })), s, m)) return "continue";
                                    (r = x).push.apply(r, l(o))
                                }, e = 0, r = t.triangles.length; e < r; e += 3) n(e)
                        }();
                        else {
                            var _ = S.exports.flatten(r),
                                N = _.vertices,
                                k = _.holes,
                                A = void 0 === k ? [] : k;
                            x = S.exports(N, A, 2)
                        }
                        var $ = ho(v(u, (function(t) {
                                return t[0]
                            })), [0, 1]),
                            P = ho(v(u, (function(t) {
                                return t[1]
                            })), [0, 1]),
                            T = u.map((function(t) {
                                var n = a(t, 2),
                                    e = n[0],
                                    r = n[1];
                                return [$(e), P(r)]
                            }));
                        return {
                            contour: r,
                            triangles: {
                                points: u,
                                indices: x,
                                uvs: T
                            }
                        }
                    }(t, {
                        resolution: u = u || 5
                    }),
                    p = f.contour,
                    g = f.triangles,
                    d = E(g.uvs),
                    y = [],
                    m = [],
                    x = [],
                    w = 0,
                    b = function(t) {
                        var n = Math.round(y.length / 3),
                            e = x.length;
                        y = y.concat(t.vertices), m = m.concat(t.uvs), x = x.concat(n ? t.indices.map((function(t) {
                            return t + n
                        })) : t.indices), h.addGroup(e, x.length - e, w++)
                    };

                function _(t, n) {
                    var e = t.map((function(t) {
                        return t.map((function(t) {
                            var e = a(t, 2),
                                r = e[0];
                            return function(t, n) {
                                var e = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 0,
                                    r = (90 - t) * Math.PI / 180,
                                    i = (90 - n) * Math.PI / 180;
                                return [e * Math.sin(r) * Math.cos(i), e * Math.cos(r), e * Math.sin(r) * Math.sin(i)]
                            }(e[1], r, n)
                        }))
                    }));
                    return S.exports.flatten(e)
                }

                function N(t) {
                    var n = !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1];
                    return {
                        indices: n ? g.indices : g.indices.slice().reverse(),
                        vertices: _([g.points], t).vertices,
                        uvs: d
                    }
                }
                return o && b(function() {
                    for (var t = _(p, n), r = t.vertices, i = t.holes, o = _(p, e).vertices, u = E([o, r]), a = Math.round(o.length / 3), l = new Set(i), s = 0, c = [], h = 0; h < a; h++) {
                        var f = h + 1;
                        if (f === a) f = s;
                        else if (l.has(f)) {
                            var g = f;
                            f = s, s = g
                        }
                        c.push(h, h + a, f + a), c.push(f + a, f, h)
                    }
                    for (var d = [], y = 1; y >= 0; y--)
                        for (var v = 0; v < a; v += 1) d.push(v / (a - 1), y);
                    return {
                        indices: c,
                        vertices: u,
                        uvs: d
                    }
                }()), r && b(N(n, !1)), i && b(N(e, !0)), h.setIndex(x), h[vo]("position", new yo.Float32BufferAttribute(y, 3)), h[vo]("uv", new yo.Float32BufferAttribute(m, 2)), h.computeVertexNormals(), h
            }
            return n = c, r && e(n.prototype, r), o && e(n, o), Object.defineProperty(n, "prototype", {
                writable: !1
            }), n
        }(yo.BufferGeometry);
    t.ConicPolygonBufferGeometry = mo, t.ConicPolygonGeometry = mo, Object.defineProperty(t, "__esModule", {
        value: !0
    })
}));