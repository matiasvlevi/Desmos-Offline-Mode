var requirejs, require, define;
! function(e) {
    function t(e, t) {
        return y.call(e, t)
    }

    function n(e, t) {
        var n, o, s, r, c, a, i, l, u, d, p = t && t.split("/"),
            m = h.map,
            f = m && m["*"] || {};
        if (e && "." === e.charAt(0))
            if (t) {
                for (p = p.slice(0, p.length - 1), e = p.concat(e.split("/")), l = 0; l < e.length; l += 1)
                    if ("." === (d = e[l])) e.splice(l, 1), l -= 1;
                    else if (".." === d) {
                    if (1 === l && (".." === e[2] || ".." === e[0])) break;
                    l > 0 && (e.splice(l - 1, 2), l -= 2)
                }
                e = e.join("/")
            } else 0 === e.indexOf("./") && (e = e.substring(2));
        if ((p || f) && m) {
            for (n = e.split("/"), l = n.length; l > 0; l -= 1) {
                if (o = n.slice(0, l).join("/"), p)
                    for (u = p.length; u > 0; u -= 1)
                        if ((s = m[p.slice(0, u).join("/")]) && (s = s[o])) {
                            r = s, c = l;
                            break
                        } if (r) break;
                !a && f && f[o] && (a = f[o], i = l)
            }!r && a && (r = a, c = i), r && (n.splice(0, c, r), e = n.join("/"))
        }
        return e
    }

    function o(t, n) {
        return function() {
            return u.apply(e, v.call(arguments, 0).concat([t, n]))
        }
    }

    function s(e) {
        return function(t) {
            return n(t, e)
        }
    }

    function r(e) {
        return function(t) {
            m[e] = t
        }
    }

    function c(n) {
        if (t(f, n)) {
            var o = f[n];
            delete f[n], g[n] = !0, l.apply(e, o)
        }
        if (!t(m, n) && !t(g, n)) throw new Error("No " + n);
        return m[n]
    }

    function a(e) {
        var t, n = e ? e.indexOf("!") : -1;
        return n > -1 && (t = e.substring(0, n), e = e.substring(n + 1, e.length)), [t, e]
    }

    function i(e) {
        return function() {
            return h && h.config && h.config[e] || {}
        }
    }
    var l, u, d, p, m = {},
        f = {},
        h = {},
        g = {},
        y = Object.prototype.hasOwnProperty,
        v = [].slice;
    d = function(e, t) {
        var o, r = a(e),
            i = r[0];
        return e = r[1], i && (i = n(i, t), o = c(i)), i ? e = o && o.normalize ? o.normalize(e, s(t)) : n(e, t) : (e = n(e, t), r = a(e), i = r[0], e = r[1], i && (o = c(i))), {
            f: i ? i + "!" + e : e,
            n: e,
            pr: i,
            p: o
        }
    }, p = {
        require: function(e) {
            return o(e)
        },
        exports: function(e) {
            var t = m[e];
            return void 0 !== t ? t : m[e] = {}
        },
        module: function(e) {
            return {
                id: e,
                uri: "",
                exports: m[e],
                config: i(e)
            }
        }
    }, l = function(n, s, a, i) {
        var l, u, h, y, v, E, b = [];
        if (i = i || n, "function" == typeof a) {
            for (s = !s.length && a.length ? ["require", "exports", "module"] : s, v = 0; v < s.length; v += 1)
                if (y = d(s[v], i), "require" === (u = y.f)) b[v] = p.require(n);
                else if ("exports" === u) b[v] = p.exports(n), E = !0;
            else if ("module" === u) l = b[v] = p.module(n);
            else if (t(m, u) || t(f, u) || t(g, u)) b[v] = c(u);
            else {
                if (!y.p) throw new Error(n + " missing " + u);
                y.p.load(y.n, o(i, !0), r(u), {}), b[v] = m[u]
            }
            h = a.apply(m[n], b), n && (l && l.exports !== e && l.exports !== m[n] ? m[n] = l.exports : h === e && E || (m[n] = h))
        } else n && (m[n] = a)
    }, requirejs = require = u = function(t, n, o, s, r) {
        return "string" == typeof t ? p[t] ? p[t](n) : c(d(t, n).f) : (t.splice || (h = t, n.splice ? (t = n, n = o, o = null) : t = e), n = n || function() {}, "function" == typeof o && (o = s, s = r), s ? l(e, t, n, o) : setTimeout(function() {
            l(e, t, n, o)
        }, 4), u)
    }, u.config = function(e) {
        return h = e, h.deps && u(h.deps, h.callback), u
    }, define = function(e, n, o) {
        n.splice || (o = n, n = []), t(m, e) || t(f, e) || (f[e] = [e, n, o])
    }, define.amd = {
        jQuery: !0
    }
}(), "undefined" != typeof ALMOND_OVERRIDES && ALMOND_OVERRIDES && (define = ALMOND_OVERRIDES.define || define, require = ALMOND_OVERRIDES.require || require, requirejs = ALMOND_OVERRIDES.requirejs || requirejs), define("vendor/almond", function() {}), define("testbridge", ["require"], function(e) {
        function t() {
            window.consoleOverride = !0;
            var e = window.console.log;
            window.console.log = function() {
                for (var t = [], n = 0; n < arguments.length; n++) t.push(arguments[n]);
                e.apply(window.console, [].concat([t.join(" ")], t))
            }
        }
        var n = {
            ready: function() {
                try {
                    window.TestBridge = n, parent.USING_SELENIUM && t()
                } catch (e) {}
            }
        };
        return n
    }), define("ipad.ghostevents", ["require"], function(e) {
        function t(e) {
            o && r.evtInScope(e) && (e.stopPropagation(), e.stopImmediatePropagation())
        }

        function n(e) {
            o && r.evtInScope(e) && (e.preventDefault(), e.stopPropagation(), e.stopImmediatePropagation())
        }
        var o = !1,
            s = null,
            r = {
                isGhostEvent: function(e) {
                    return !1
                },
                evtInScope: function(e) {
                    return !1
                }
            };
        return document.addEventListener("mousedown", function(e) {
            r.evtInScope(e) && (s = document.activeElement, o = r.isGhostEvent(e), t(e))
        }, !0), document.addEventListener("mouseup", t, !0), document.addEventListener("click", function(e) {
            n(e), o && document.activeElement !== s && (document.activeElement && document.activeElement.blur(), s && s.focus()), o = !1
        }, !0), document.addEventListener("focus", n, !0), document.addEventListener("blur", n, !0), r
    }),
    function(e, t) {
        "object" == typeof module && "object" == typeof module.exports ? module.exports = e.document ? t(e, !0) : function(e) {
            if (!e.document) throw new Error("jQuery requires a window with a document");
            return t(e)
        } : t(e)
    }("undefined" != typeof window ? window : this, function(e, t) {
        function n(e) {
            var t = !!e && "length" in e && e.length,
                n = se.type(e);
            return "function" !== n && !se.isWindow(e) && ("array" === n || 0 === t || "number" == typeof t && t > 0 && t - 1 in e)
        }

        function o(e, t, n) {
            if (se.isFunction(t)) return se.grep(e, function(e, o) {
                return !!t.call(e, o, e) !== n
            });
            if (t.nodeType) return se.grep(e, function(e) {
                return e === t !== n
            });
            if ("string" == typeof t) {
                if (fe.test(t)) return se.filter(t, e, n);
                t = se.filter(t, e)
            }
            return se.grep(e, function(e) {
                return Z.call(t, e) > -1 !== n
            })
        }

        function s(e, t) {
            for (;
                (e = e[t]) && 1 !== e.nodeType;);
            return e
        }

        function r(e) {
            var t = {};
            return se.each(e.match(Ee) || [], function(e, n) {
                t[n] = !0
            }), t
        }

        function c() {
            $.removeEventListener("DOMContentLoaded", c), e.removeEventListener("load", c), se.ready()
        }

        function a() {
            this.expando = se.expando + a.uid++
        }

        function i(e, t, n) {
            var o;
            if (void 0 === n && 1 === e.nodeType)
                if (o = "data-" + t.replace(Se, "-$&").toLowerCase(), "string" == typeof(n = e.getAttribute(o))) {
                    try {
                        n = "true" === n || "false" !== n && ("null" === n ? null : +n + "" === n ? +n : xe.test(n) ? se.parseJSON(n) : n)
                    } catch (e) {}
                    Ce.set(e, t, n)
                } else n = void 0;
            return n
        }

        function l(e, t, n, o) {
            var s, r = 1,
                c = 20,
                a = o ? function() {
                    return o.cur()
                } : function() {
                    return se.css(e, t, "")
                },
                i = a(),
                l = n && n[3] || (se.cssNumber[t] ? "" : "px"),
                u = (se.cssNumber[t] || "px" !== l && +i) && Ae.exec(se.css(e, t));
            if (u && u[3] !== l) {
                l = l || u[3], n = n || [], u = +i || 1;
                do {
                    r = r || ".5", u /= r, se.style(e, t, u + l)
                } while (r !== (r = a() / i) && 1 !== r && --c)
            }
            return n && (u = +u || +i || 0, s = n[1] ? u + (n[1] + 1) * n[2] : +n[2], o && (o.unit = l, o.start = u, o.end = s)), s
        }

        function u(e, t) {
            var n = void 0 !== e.getElementsByTagName ? e.getElementsByTagName(t || "*") : void 0 !== e.querySelectorAll ? e.querySelectorAll(t || "*") : [];
            return void 0 === t || t && se.nodeName(e, t) ? se.merge([e], n) : n
        }

        function d(e, t) {
            for (var n = 0, o = e.length; n < o; n++) Te.set(e[n], "globalEval", !t || Te.get(t[n], "globalEval"))
        }

        function p(e, t, n, o, s) {
            for (var r, c, a, i, l, p, m = t.createDocumentFragment(), f = [], h = 0, g = e.length; h < g; h++)
                if ((r = e[h]) || 0 === r)
                    if ("object" === se.type(r)) se.merge(f, r.nodeType ? [r] : r);
                    else if (Ne.test(r)) {
                for (c = c || m.appendChild(t.createElement("div")), a = (Ie.exec(r) || ["", ""])[1].toLowerCase(), i = Fe[a] || Fe._default, c.innerHTML = i[1] + se.htmlPrefilter(r) + i[2], p = i[0]; p--;) c = c.lastChild;
                se.merge(f, c.childNodes), c = m.firstChild, c.textContent = ""
            } else f.push(t.createTextNode(r));
            for (m.textContent = "", h = 0; r = f[h++];)
                if (o && se.inArray(r, o) > -1) s && s.push(r);
                else if (l = se.contains(r.ownerDocument, r), c = u(m.appendChild(r), "script"), l && d(c), n)
                for (p = 0; r = c[p++];) qe.test(r.type || "") && n.push(r);
            return m
        }

        function m() {
            return !0
        }

        function f() {
            return !1
        }

        function h() {
            try {
                return $.activeElement
            } catch (e) {}
        }

        function g(e, t, n, o, s, r) {
            var c, a;
            if ("object" == typeof t) {
                "string" != typeof n && (o = o || n, n = void 0);
                for (a in t) g(e, a, n, o, t[a], r);
                return e
            }
            if (null == o && null == s ? (s = n, o = n = void 0) : null == s && ("string" == typeof n ? (s = o, o = void 0) : (s = o, o = n, n = void 0)), !1 === s) s = f;
            else if (!s) return e;
            return 1 === r && (c = s, s = function(e) {
                return se().off(e), c.apply(this, arguments)
            }, s.guid = c.guid || (c.guid = se.guid++)), e.each(function() {
                se.event.add(this, t, s, o, n)
            })
        }

        function y(e, t) {
            return se.nodeName(e, "table") && se.nodeName(11 !== t.nodeType ? t : t.firstChild, "tr") ? e.getElementsByTagName("tbody")[0] || e.appendChild(e.ownerDocument.createElement("tbody")) : e
        }

        function v(e) {
            return e.type = (null !== e.getAttribute("type")) + "/" + e.type, e
        }

        function E(e) {
            var t = Be.exec(e.type);
            return t ? e.type = t[1] : e.removeAttribute("type"), e
        }

        function b(e, t) {
            var n, o, s, r, c, a, i, l;
            if (1 === t.nodeType) {
                if (Te.hasData(e) && (r = Te.access(e), c = Te.set(t, r), l = r.events)) {
                    delete c.handle, c.events = {};
                    for (s in l)
                        for (n = 0, o = l[s].length; n < o; n++) se.event.add(t, s, l[s][n])
                }
                Ce.hasData(e) && (a = Ce.access(e), i = se.extend({}, a), Ce.set(t, i))
            }
        }

        function w(e, t) {
            var n = t.nodeName.toLowerCase();
            "input" === n && Oe.test(e.type) ? t.checked = e.checked : "input" !== n && "textarea" !== n || (t.defaultValue = e.defaultValue)
        }

        function k(e, t, n, o) {
            t = Y.apply([], t);
            var s, r, c, a, i, l, d = 0,
                m = e.length,
                f = m - 1,
                h = t[0],
                g = se.isFunction(h);
            if (g || m > 1 && "string" == typeof h && !oe.checkClone && Ge.test(h)) return e.each(function(s) {
                var r = e.eq(s);
                g && (t[0] = h.call(this, s, r.html())), k(r, t, n, o)
            });
            if (m && (s = p(t, e[0].ownerDocument, !1, e, o), r = s.firstChild, 1 === s.childNodes.length && (s = r), r || o)) {
                for (c = se.map(u(s, "script"), v), a = c.length; d < m; d++) i = s, d !== f && (i = se.clone(i, !0, !0), a && se.merge(c, u(i, "script"))), n.call(e[d], i, d);
                if (a)
                    for (l = c[c.length - 1].ownerDocument, se.map(c, E), d = 0; d < a; d++) i = c[d], qe.test(i.type || "") && !Te.access(i, "globalEval") && se.contains(l, i) && (i.src ? se._evalUrl && se._evalUrl(i.src) : se.globalEval(i.textContent.replace(He, "")))
            }
            return e
        }

        function T(e, t, n) {
            for (var o, s = t ? se.filter(t, e) : e, r = 0; null != (o = s[r]); r++) n || 1 !== o.nodeType || se.cleanData(u(o)), o.parentNode && (n && se.contains(o.ownerDocument, o) && d(u(o, "script")), o.parentNode.removeChild(o));
            return e
        }

        function C(e, t) {
            var n = se(t.createElement(e)).appendTo(t.body),
                o = se.css(n[0], "display");
            return n.detach(), o
        }

        function x(e) {
            var t = $,
                n = Ve[e];
            return n || (n = C(e, t), "none" !== n && n || (We = (We || se("<iframe frameborder='0' width='0' height='0'/>")).appendTo(t.documentElement), t = We[0].contentDocument, t.write(), t.close(), n = C(e, t), We.detach()), Ve[e] = n), n
        }

        function S(e, t, n) {
            var o, s, r, c, a = e.style;
            return n = n || Ke(e), c = n ? n.getPropertyValue(t) || n[t] : void 0, "" !== c && void 0 !== c || se.contains(e.ownerDocument, e) || (c = se.style(e, t)), n && !oe.pixelMarginRight() && ze.test(c) && Qe.test(t) && (o = a.width, s = a.minWidth, r = a.maxWidth, a.minWidth = a.maxWidth = a.width = c, c = n.width, a.width = o, a.minWidth = s, a.maxWidth = r), void 0 !== c ? c + "" : c
        }

        function _(e, t) {
            return {
                get: function() {
                    return e() ? void delete this.get : (this.get = t).apply(this, arguments)
                }
            }
        }

        function A(e) {
            if (e in tt) return e;
            for (var t = e[0].toUpperCase() + e.slice(1), n = et.length; n--;)
                if ((e = et[n] + t) in tt) return e
        }

        function D(e, t, n) {
            var o = Ae.exec(t);
            return o ? Math.max(0, o[2] - (n || 0)) + (o[3] || "px") : t
        }

        function L(e, t, n, o, s) {
            for (var r = n === (o ? "border" : "content") ? 4 : "width" === t ? 1 : 0, c = 0; r < 4; r += 2) "margin" === n && (c += se.css(e, n + De[r], !0, s)), o ? ("content" === n && (c -= se.css(e, "padding" + De[r], !0, s)), "margin" !== n && (c -= se.css(e, "border" + De[r] + "Width", !0, s))) : (c += se.css(e, "padding" + De[r], !0, s), "padding" !== n && (c += se.css(e, "border" + De[r] + "Width", !0, s)));
            return c
        }

        function O(e, t, n) {
            var o = !0,
                s = "width" === t ? e.offsetWidth : e.offsetHeight,
                r = Ke(e),
                c = "border-box" === se.css(e, "boxSizing", !1, r);
            if (s <= 0 || null == s) {
                if (s = S(e, t, r), (s < 0 || null == s) && (s = e.style[t]), ze.test(s)) return s;
                o = c && (oe.boxSizingReliable() || s === e.style[t]), s = parseFloat(s) || 0
            }
            return s + L(e, t, n || (c ? "border" : "content"), o, r) + "px"
        }

        function I(e, t) {
            for (var n, o, s, r = [], c = 0, a = e.length; c < a; c++) o = e[c], o.style && (r[c] = Te.get(o, "olddisplay"), n = o.style.display, t ? (r[c] || "none" !== n || (o.style.display = ""), "" === o.style.display && Le(o) && (r[c] = Te.access(o, "olddisplay", x(o.nodeName)))) : (s = Le(o), "none" === n && s || Te.set(o, "olddisplay", s ? n : se.css(o, "display"))));
            for (c = 0; c < a; c++) o = e[c], o.style && (t && "none" !== o.style.display && "" !== o.style.display || (o.style.display = t ? r[c] || "" : "none"));
            return e
        }

        function q(e, t, n, o, s) {
            return new q.prototype.init(e, t, n, o, s)
        }

        function F() {
            return e.setTimeout(function() {
                nt = void 0
            }), nt = se.now()
        }

        function N(e, t) {
            var n, o = 0,
                s = {
                    height: e
                };
            for (t = t ? 1 : 0; o < 4; o += 2 - t) n = De[o], s["margin" + n] = s["padding" + n] = e;
            return t && (s.opacity = s.width = e), s
        }

        function R(e, t, n) {
            for (var o, s = (P.tweeners[t] || []).concat(P.tweeners["*"]), r = 0, c = s.length; r < c; r++)
                if (o = s[r].call(n, t, e)) return o
        }

        function M(e, t, n) {
            var o, s, r, c, a, i, l, u = this,
                d = {},
                p = e.style,
                m = e.nodeType && Le(e),
                f = Te.get(e, "fxshow");
            n.queue || (a = se._queueHooks(e, "fx"), null == a.unqueued && (a.unqueued = 0, i = a.empty.fire, a.empty.fire = function() {
                a.unqueued || i()
            }), a.unqueued++, u.always(function() {
                u.always(function() {
                    a.unqueued--, se.queue(e, "fx").length || a.empty.fire()
                })
            })), 1 === e.nodeType && ("height" in t || "width" in t) && (n.overflow = [p.overflow, p.overflowX, p.overflowY], l = se.css(e, "display"), "inline" === ("none" === l ? Te.get(e, "olddisplay") || x(e.nodeName) : l) && "none" === se.css(e, "float") && (p.display = "inline-block")), n.overflow && (p.overflow = "hidden", u.always(function() {
                p.overflow = n.overflow[0], p.overflowX = n.overflow[1], p.overflowY = n.overflow[2]
            }));
            for (o in t)
                if (s = t[o], st.exec(s)) {
                    if (delete t[o], r = r || "toggle" === s, s === (m ? "hide" : "show")) {
                        if ("show" !== s || !f || void 0 === f[o]) continue;
                        m = !0
                    }
                    d[o] = f && f[o] || se.style(e, o)
                } else l = void 0;
            if (se.isEmptyObject(d)) "inline" === ("none" === l ? x(e.nodeName) : l) && (p.display = l);
            else {
                f ? "hidden" in f && (m = f.hidden) : f = Te.access(e, "fxshow", {}), r && (f.hidden = !m), m ? se(e).show() : u.done(function() {
                    se(e).hide()
                }), u.done(function() {
                    var t;
                    Te.remove(e, "fxshow");
                    for (t in d) se.style(e, t, d[t])
                });
                for (o in d) c = R(m ? f[o] : 0, o, u), o in f || (f[o] = c.start, m && (c.end = c.start, c.start = "width" === o || "height" === o ? 1 : 0))
            }
        }

        function j(e, t) {
            var n, o, s, r, c;
            for (n in e)
                if (o = se.camelCase(n), s = t[o], r = e[n], se.isArray(r) && (s = r[1], r = e[n] = r[0]), n !== o && (e[o] = r, delete e[n]), (c = se.cssHooks[o]) && "expand" in c) {
                    r = c.expand(r), delete e[o];
                    for (n in r) n in e || (e[n] = r[n], t[n] = s)
                } else t[o] = s
        }

        function P(e, t, n) {
            var o, s, r = 0,
                c = P.prefilters.length,
                a = se.Deferred().always(function() {
                    delete i.elem
                }),
                i = function() {
                    if (s) return !1;
                    for (var t = nt || F(), n = Math.max(0, l.startTime + l.duration - t), o = n / l.duration || 0, r = 1 - o, c = 0, i = l.tweens.length; c < i; c++) l.tweens[c].run(r);
                    return a.notifyWith(e, [l, r, n]), r < 1 && i ? n : (a.resolveWith(e, [l]), !1)
                },
                l = a.promise({
                    elem: e,
                    props: se.extend({}, t),
                    opts: se.extend(!0, {
                        specialEasing: {},
                        easing: se.easing._default
                    }, n),
                    originalProperties: t,
                    originalOptions: n,
                    startTime: nt || F(),
                    duration: n.duration,
                    tweens: [],
                    createTween: function(t, n) {
                        var o = se.Tween(e, l.opts, t, n, l.opts.specialEasing[t] || l.opts.easing);
                        return l.tweens.push(o), o
                    },
                    stop: function(t) {
                        var n = 0,
                            o = t ? l.tweens.length : 0;
                        if (s) return this;
                        for (s = !0; n < o; n++) l.tweens[n].run(1);
                        return t ? (a.notifyWith(e, [l, 1, 0]), a.resolveWith(e, [l, t])) : a.rejectWith(e, [l, t]), this
                    }
                }),
                u = l.props;
            for (j(u, l.opts.specialEasing); r < c; r++)
                if (o = P.prefilters[r].call(l, e, u, l.opts)) return se.isFunction(o.stop) && (se._queueHooks(l.elem, l.opts.queue).stop = se.proxy(o.stop, o)), o;
            return se.map(u, R, l), se.isFunction(l.opts.start) && l.opts.start.call(e, l), se.fx.timer(se.extend(i, {
                elem: e,
                anim: l,
                queue: l.opts.queue
            })), l.progress(l.opts.progress).done(l.opts.done, l.opts.complete).fail(l.opts.fail).always(l.opts.always)
        }

        function U(e) {
            return e.getAttribute && e.getAttribute("class") || ""
        }

        function G(e) {
            return function(t, n) {
                "string" != typeof t && (n = t, t = "*");
                var o, s = 0,
                    r = t.toLowerCase().match(Ee) || [];
                if (se.isFunction(n))
                    for (; o = r[s++];) "+" === o[0] ? (o = o.slice(1) || "*", (e[o] = e[o] || []).unshift(n)) : (e[o] = e[o] || []).push(n)
            }
        }

        function B(e, t, n, o) {
            function s(a) {
                var i;
                return r[a] = !0, se.each(e[a] || [], function(e, a) {
                    var l = a(t, n, o);
                    return "string" != typeof l || c || r[l] ? c ? !(i = l) : void 0 : (t.dataTypes.unshift(l), s(l), !1)
                }), i
            }
            var r = {},
                c = e === Ct;
            return s(t.dataTypes[0]) || !r["*"] && s("*")
        }

        function H(e, t) {
            var n, o, s = se.ajaxSettings.flatOptions || {};
            for (n in t) void 0 !== t[n] && ((s[n] ? e : o || (o = {}))[n] = t[n]);
            return o && se.extend(!0, e, o), e
        }

        function W(e, t, n) {
            for (var o, s, r, c, a = e.contents, i = e.dataTypes;
                "*" === i[0];) i.shift(), void 0 === o && (o = e.mimeType || t.getResponseHeader("Content-Type"));
            if (o)
                for (s in a)
                    if (a[s] && a[s].test(o)) {
                        i.unshift(s);
                        break
                    } if (i[0] in n) r = i[0];
            else {
                for (s in n) {
                    if (!i[0] || e.converters[s + " " + i[0]]) {
                        r = s;
                        break
                    }
                    c || (c = s)
                }
                r = r || c
            }
            if (r) return r !== i[0] && i.unshift(r), n[r]
        }

        function V(e, t, n, o) {
            var s, r, c, a, i, l = {},
                u = e.dataTypes.slice();
            if (u[1])
                for (c in e.converters) l[c.toLowerCase()] = e.converters[c];
            for (r = u.shift(); r;)
                if (e.responseFields[r] && (n[e.responseFields[r]] = t), !i && o && e.dataFilter && (t = e.dataFilter(t, e.dataType)), i = r, r = u.shift())
                    if ("*" === r) r = i;
                    else if ("*" !== i && i !== r) {
                if (!(c = l[i + " " + r] || l["* " + r]))
                    for (s in l)
                        if (a = s.split(" "), a[1] === r && (c = l[i + " " + a[0]] || l["* " + a[0]])) {
                            !0 === c ? c = l[s] : !0 !== l[s] && (r = a[0], u.unshift(a[1]));
                            break
                        } if (!0 !== c)
                    if (c && e.throws) t = c(t);
                    else try {
                        t = c(t)
                    } catch (e) {
                        return {
                            state: "parsererror",
                            error: c ? e : "No conversion from " + i + " to " + r
                        }
                    }
            }
            return {
                state: "success",
                data: t
            }
        }

        function Q(e, t, n, o) {
            var s;
            if (se.isArray(t)) se.each(t, function(t, s) {
                n || At.test(e) ? o(e, s) : Q(e + "[" + ("object" == typeof s && null != s ? t : "") + "]", s, n, o)
            });
            else if (n || "object" !== se.type(t)) o(e, t);
            else
                for (s in t) Q(e + "[" + s + "]", t[s], n, o)
        }

        function z(e) {
            return se.isWindow(e) ? e : 9 === e.nodeType && e.defaultView
        }
        var K = [],
            $ = e.document,
            X = K.slice,
            Y = K.concat,
            J = K.push,
            Z = K.indexOf,
            ee = {},
            te = ee.toString,
            ne = ee.hasOwnProperty,
            oe = {},
            se = function(e, t) {
                return new se.fn.init(e, t)
            },
            re = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,
            ce = /^-ms-/,
            ae = /-([\da-z])/gi,
            ie = function(e, t) {
                return t.toUpperCase()
            };
        se.fn = se.prototype = {
            jquery: "2.2.4",
            constructor: se,
            selector: "",
            length: 0,
            toArray: function() {
                return X.call(this)
            },
            get: function(e) {
                return null != e ? e < 0 ? this[e + this.length] : this[e] : X.call(this)
            },
            pushStack: function(e) {
                var t = se.merge(this.constructor(), e);
                return t.prevObject = this, t.context = this.context, t
            },
            each: function(e) {
                return se.each(this, e)
            },
            map: function(e) {
                return this.pushStack(se.map(this, function(t, n) {
                    return e.call(t, n, t)
                }))
            },
            slice: function() {
                return this.pushStack(X.apply(this, arguments))
            },
            first: function() {
                return this.eq(0)
            },
            last: function() {
                return this.eq(-1)
            },
            eq: function(e) {
                var t = this.length,
                    n = +e + (e < 0 ? t : 0);
                return this.pushStack(n >= 0 && n < t ? [this[n]] : [])
            },
            end: function() {
                return this.prevObject || this.constructor()
            },
            push: J,
            sort: K.sort,
            splice: K.splice
        }, se.extend = se.fn.extend = function() {
            var e, t, n, o, s, r, c = arguments[0] || {},
                a = 1,
                i = arguments.length,
                l = !1;
            for ("boolean" == typeof c && (l = c, c = arguments[a] || {}, a++), "object" == typeof c || se.isFunction(c) || (c = {}), a === i && (c = this, a--); a < i; a++)
                if (null != (e = arguments[a]))
                    for (t in e) n = c[t], o = e[t], c !== o && (l && o && (se.isPlainObject(o) || (s = se.isArray(o))) ? (s ? (s = !1, r = n && se.isArray(n) ? n : []) : r = n && se.isPlainObject(n) ? n : {}, c[t] = se.extend(l, r, o)) : void 0 !== o && (c[t] = o));
            return c
        }, se.extend({
            expando: "jQuery" + ("2.2.4" + Math.random()).replace(/\D/g, ""),
            isReady: !0,
            error: function(e) {
                throw new Error(e)
            },
            noop: function() {},
            isFunction: function(e) {
                return "function" === se.type(e)
            },
            isArray: Array.isArray,
            isWindow: function(e) {
                return null != e && e === e.window
            },
            isNumeric: function(e) {
                var t = e && e.toString();
                return !se.isArray(e) && t - parseFloat(t) + 1 >= 0
            },
            isPlainObject: function(e) {
                var t;
                if ("object" !== se.type(e) || e.nodeType || se.isWindow(e)) return !1;
                if (e.constructor && !ne.call(e, "constructor") && !ne.call(e.constructor.prototype || {}, "isPrototypeOf")) return !1;
                for (t in e);
                return void 0 === t || ne.call(e, t)
            },
            isEmptyObject: function(e) {
                var t;
                for (t in e) return !1;
                return !0
            },
            type: function(e) {
                return null == e ? e + "" : "object" == typeof e || "function" == typeof e ? ee[te.call(e)] || "object" : typeof e
            },
            globalEval: function(e) {
                var t, n = eval;
                (e = se.trim(e)) && (1 === e.indexOf("use strict") ? (t = $.createElement("script"), t.text = e, $.head.appendChild(t).parentNode.removeChild(t)) : n(e))
            },
            camelCase: function(e) {
                return e.replace(ce, "ms-").replace(ae, ie)
            },
            nodeName: function(e, t) {
                return e.nodeName && e.nodeName.toLowerCase() === t.toLowerCase()
            },
            each: function(e, t) {
                var o, s = 0;
                if (n(e))
                    for (o = e.length; s < o && !1 !== t.call(e[s], s, e[s]); s++);
                else
                    for (s in e)
                        if (!1 === t.call(e[s], s, e[s])) break;
                return e
            },
            trim: function(e) {
                return null == e ? "" : (e + "").replace(re, "")
            },
            makeArray: function(e, t) {
                var o = t || [];
                return null != e && (n(Object(e)) ? se.merge(o, "string" == typeof e ? [e] : e) : J.call(o, e)), o
            },
            inArray: function(e, t, n) {
                return null == t ? -1 : Z.call(t, e, n)
            },
            merge: function(e, t) {
                for (var n = +t.length, o = 0, s = e.length; o < n; o++) e[s++] = t[o];
                return e.length = s, e
            },
            grep: function(e, t, n) {
                for (var o = [], s = 0, r = e.length, c = !n; s < r; s++) !t(e[s], s) !== c && o.push(e[s]);
                return o
            },
            map: function(e, t, o) {
                var s, r, c = 0,
                    a = [];
                if (n(e))
                    for (s = e.length; c < s; c++) null != (r = t(e[c], c, o)) && a.push(r);
                else
                    for (c in e) null != (r = t(e[c], c, o)) && a.push(r);
                return Y.apply([], a)
            },
            guid: 1,
            proxy: function(e, t) {
                var n, o, s;
                if ("string" == typeof t && (n = e[t], t = e, e = n), se.isFunction(e)) return o = X.call(arguments, 2), s = function() {
                    return e.apply(t || this, o.concat(X.call(arguments)))
                }, s.guid = e.guid = e.guid || se.guid++, s
            },
            now: Date.now,
            support: oe
        }), "function" == typeof Symbol && (se.fn[Symbol.iterator] = K[Symbol.iterator]), se.each("Boolean Number String Function Array Date RegExp Object Error Symbol".split(" "), function(e, t) {
            ee["[object " + t + "]"] = t.toLowerCase()
        });
        var le = function(e) {
            function t(e, t, n, o) {
                var s, r, c, a, l, d, p, m, f = t && t.ownerDocument,
                    h = t ? t.nodeType : 9;
                if (n = n || [], "string" != typeof e || !e || 1 !== h && 9 !== h && 11 !== h) return n;
                if (!o && ((t ? t.ownerDocument || t : j) !== L && D(t), t = t || L, I)) {
                    if (11 !== h && (d = he.exec(e)))
                        if (s = d[1]) {
                            if (9 === h) {
                                if (!(c = t.getElementById(s))) return n;
                                if (c.id === s) return n.push(c), n
                            } else if (f && (c = f.getElementById(s)) && R(t, c) && c.id === s) return n.push(c), n
                        } else {
                            if (d[2]) return X.apply(n, t.getElementsByTagName(e)), n;
                            if ((s = d[3]) && E.getElementsByClassName && t.getElementsByClassName) return X.apply(n, t.getElementsByClassName(s)), n
                        } if (E.qsa && !H[e + " "] && (!q || !q.test(e))) {
                        if (1 !== h) f = t, m = e;
                        else if ("object" !== t.nodeName.toLowerCase()) {
                            for ((a = t.getAttribute("id")) ? a = a.replace(ye, "\\$&") : t.setAttribute("id", a = M), p = T(e), r = p.length, l = ue.test(a) ? "#" + a : "[id='" + a + "']"; r--;) p[r] = l + " " + u(p[r]);
                            m = p.join(","), f = ge.test(e) && i(t.parentNode) || t
                        }
                        if (m) try {
                            return X.apply(n, f.querySelectorAll(m)), n
                        } catch (e) {} finally {
                            a === M && t.removeAttribute("id")
                        }
                    }
                }
                return x(e.replace(re, "$1"), t, n, o)
            }

            function n() {
                function e(n, o) {
                    return t.push(n + " ") > b.cacheLength && delete e[t.shift()], e[n + " "] = o
                }
                var t = [];
                return e
            }

            function o(e) {
                return e[M] = !0, e
            }

            function s(e) {
                var t = L.createElement("div");
                try {
                    return !!e(t)
                } catch (e) {
                    return !1
                } finally {
                    t.parentNode && t.parentNode.removeChild(t), t = null
                }
            }

            function r(e, t) {
                for (var n = e.split("|"), o = n.length; o--;) b.attrHandle[n[o]] = t
            }

            function c(e, t) {
                var n = t && e,
                    o = n && 1 === e.nodeType && 1 === t.nodeType && (~t.sourceIndex || V) - (~e.sourceIndex || V);
                if (o) return o;
                if (n)
                    for (; n = n.nextSibling;)
                        if (n === t) return -1;
                return e ? 1 : -1
            }

            function a(e) {
                return o(function(t) {
                    return t = +t, o(function(n, o) {
                        for (var s, r = e([], n.length, t), c = r.length; c--;) n[s = r[c]] && (n[s] = !(o[s] = n[s]))
                    })
                })
            }

            function i(e) {
                return e && void 0 !== e.getElementsByTagName && e
            }

            function l() {}

            function u(e) {
                for (var t = 0, n = e.length, o = ""; t < n; t++) o += e[t].value;
                return o
            }

            function d(e, t, n) {
                var o = t.dir,
                    s = n && "parentNode" === o,
                    r = U++;
                return t.first ? function(t, n, r) {
                    for (; t = t[o];)
                        if (1 === t.nodeType || s) return e(t, n, r)
                } : function(t, n, c) {
                    var a, i, l, u = [P, r];
                    if (c) {
                        for (; t = t[o];)
                            if ((1 === t.nodeType || s) && e(t, n, c)) return !0
                    } else
                        for (; t = t[o];)
                            if (1 === t.nodeType || s) {
                                if (l = t[M] || (t[M] = {}), i = l[t.uniqueID] || (l[t.uniqueID] = {}), (a = i[o]) && a[0] === P && a[1] === r) return u[2] = a[2];
                                if (i[o] = u, u[2] = e(t, n, c)) return !0
                            }
                }
            }

            function p(e) {
                return e.length > 1 ? function(t, n, o) {
                    for (var s = e.length; s--;)
                        if (!e[s](t, n, o)) return !1;
                    return !0
                } : e[0]
            }

            function m(e, n, o) {
                for (var s = 0, r = n.length; s < r; s++) t(e, n[s], o);
                return o
            }

            function f(e, t, n, o, s) {
                for (var r, c = [], a = 0, i = e.length, l = null != t; a < i; a++)(r = e[a]) && (n && !n(r, o, s) || (c.push(r), l && t.push(a)));
                return c
            }

            function h(e, t, n, s, r, c) {
                return s && !s[M] && (s = h(s)), r && !r[M] && (r = h(r, c)), o(function(o, c, a, i) {
                    var l, u, d, p = [],
                        h = [],
                        g = c.length,
                        y = o || m(t || "*", a.nodeType ? [a] : a, []),
                        v = !e || !o && t ? y : f(y, p, e, a, i),
                        E = n ? r || (o ? e : g || s) ? [] : c : v;
                    if (n && n(v, E, a, i), s)
                        for (l = f(E, h), s(l, [], a, i), u = l.length; u--;)(d = l[u]) && (E[h[u]] = !(v[h[u]] = d));
                    if (o) {
                        if (r || e) {
                            if (r) {
                                for (l = [], u = E.length; u--;)(d = E[u]) && l.push(v[u] = d);
                                r(null, E = [], l, i)
                            }
                            for (u = E.length; u--;)(d = E[u]) && (l = r ? J(o, d) : p[u]) > -1 && (o[l] = !(c[l] = d))
                        }
                    } else E = f(E === c ? E.splice(g, E.length) : E), r ? r(null, c, E, i) : X.apply(c, E)
                })
            }

            function g(e) {
                for (var t, n, o, s = e.length, r = b.relative[e[0].type], c = r || b.relative[" "], a = r ? 1 : 0, i = d(function(e) {
                        return e === t
                    }, c, !0), l = d(function(e) {
                        return J(t, e) > -1
                    }, c, !0), m = [function(e, n, o) {
                        var s = !r && (o || n !== S) || ((t = n).nodeType ? i(e, n, o) : l(e, n, o));
                        return t = null, s
                    }]; a < s; a++)
                    if (n = b.relative[e[a].type]) m = [d(p(m), n)];
                    else {
                        if (n = b.filter[e[a].type].apply(null, e[a].matches), n[M]) {
                            for (o = ++a; o < s && !b.relative[e[o].type]; o++);
                            return h(a > 1 && p(m), a > 1 && u(e.slice(0, a - 1).concat({
                                value: " " === e[a - 2].type ? "*" : ""
                            })).replace(re, "$1"), n, a < o && g(e.slice(a, o)), o < s && g(e = e.slice(o)), o < s && u(e))
                        }
                        m.push(n)
                    } return p(m)
            }

            function y(e, n) {
                var s = n.length > 0,
                    r = e.length > 0,
                    c = function(o, c, a, i, l) {
                        var u, d, p, m = 0,
                            h = "0",
                            g = o && [],
                            y = [],
                            v = S,
                            E = o || r && b.find.TAG("*", l),
                            w = P += null == v ? 1 : Math.random() || .1,
                            k = E.length;
                        for (l && (S = c === L || c || l); h !== k && null != (u = E[h]); h++) {
                            if (r && u) {
                                for (d = 0, c || u.ownerDocument === L || (D(u), a = !I); p = e[d++];)
                                    if (p(u, c || L, a)) {
                                        i.push(u);
                                        break
                                    } l && (P = w)
                            }
                            s && ((u = !p && u) && m--, o && g.push(u))
                        }
                        if (m += h, s && h !== m) {
                            for (d = 0; p = n[d++];) p(g, y, c, a);
                            if (o) {
                                if (m > 0)
                                    for (; h--;) g[h] || y[h] || (y[h] = K.call(i));
                                y = f(y)
                            }
                            X.apply(i, y), l && !o && y.length > 0 && m + n.length > 1 && t.uniqueSort(i)
                        }
                        return l && (P = w, S = v), g
                    };
                return s ? o(c) : c
            }
            var v, E, b, w, k, T, C, x, S, _, A, D, L, O, I, q, F, N, R, M = "sizzle" + 1 * new Date,
                j = e.document,
                P = 0,
                U = 0,
                G = n(),
                B = n(),
                H = n(),
                W = function(e, t) {
                    return e === t && (A = !0), 0
                },
                V = 1 << 31,
                Q = {}.hasOwnProperty,
                z = [],
                K = z.pop,
                $ = z.push,
                X = z.push,
                Y = z.slice,
                J = function(e, t) {
                    for (var n = 0, o = e.length; n < o; n++)
                        if (e[n] === t) return n;
                    return -1
                },
                Z = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",
                ee = "[\\x20\\t\\r\\n\\f]",
                te = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",
                ne = "\\[" + ee + "*(" + te + ")(?:" + ee + "*([*^$|!~]?=)" + ee + "*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + te + "))|)" + ee + "*\\]",
                oe = ":(" + te + ")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|" + ne + ")*)|.*)\\)|)",
                se = new RegExp(ee + "+", "g"),
                re = new RegExp("^" + ee + "+|((?:^|[^\\\\])(?:\\\\.)*)" + ee + "+$", "g"),
                ce = new RegExp("^" + ee + "*," + ee + "*"),
                ae = new RegExp("^" + ee + "*([>+~]|" + ee + ")" + ee + "*"),
                ie = new RegExp("=" + ee + "*([^\\]'\"]*?)" + ee + "*\\]", "g"),
                le = new RegExp(oe),
                ue = new RegExp("^" + te + "$"),
                de = {
                    ID: new RegExp("^#(" + te + ")"),
                    CLASS: new RegExp("^\\.(" + te + ")"),
                    TAG: new RegExp("^(" + te + "|[*])"),
                    ATTR: new RegExp("^" + ne),
                    PSEUDO: new RegExp("^" + oe),
                    CHILD: new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + ee + "*(even|odd|(([+-]|)(\\d*)n|)" + ee + "*(?:([+-]|)" + ee + "*(\\d+)|))" + ee + "*\\)|)", "i"),
                    bool: new RegExp("^(?:" + Z + ")$", "i"),
                    needsContext: new RegExp("^" + ee + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + ee + "*((?:-\\d)?\\d*)" + ee + "*\\)|)(?=[^-]|$)", "i")
                },
                pe = /^(?:input|select|textarea|button)$/i,
                me = /^h\d$/i,
                fe = /^[^{]+\{\s*\[native \w/,
                he = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,
                ge = /[+~]/,
                ye = /'|\\/g,
                ve = new RegExp("\\\\([\\da-f]{1,6}" + ee + "?|(" + ee + ")|.)", "ig"),
                Ee = function(e, t, n) {
                    var o = "0x" + t - 65536;
                    return o !== o || n ? t : o < 0 ? String.fromCharCode(o + 65536) : String.fromCharCode(o >> 10 | 55296, 1023 & o | 56320)
                },
                be = function() {
                    D()
                };
            try {
                X.apply(z = Y.call(j.childNodes), j.childNodes), z[j.childNodes.length].nodeType
            } catch (e) {
                X = {
                    apply: z.length ? function(e, t) {
                        $.apply(e, Y.call(t))
                    } : function(e, t) {
                        for (var n = e.length, o = 0; e[n++] = t[o++];);
                        e.length = n - 1
                    }
                }
            }
            E = t.support = {}, k = t.isXML = function(e) {
                var t = e && (e.ownerDocument || e).documentElement;
                return !!t && "HTML" !== t.nodeName
            }, D = t.setDocument = function(e) {
                var t, n, o = e ? e.ownerDocument || e : j;
                return o !== L && 9 === o.nodeType && o.documentElement ? (L = o, O = L.documentElement, I = !k(L), (n = L.defaultView) && n.top !== n && (n.addEventListener ? n.addEventListener("unload", be, !1) : n.attachEvent && n.attachEvent("onunload", be)), E.attributes = s(function(e) {
                    return e.className = "i", !e.getAttribute("className")
                }), E.getElementsByTagName = s(function(e) {
                    return e.appendChild(L.createComment("")), !e.getElementsByTagName("*").length
                }), E.getElementsByClassName = fe.test(L.getElementsByClassName), E.getById = s(function(e) {
                    return O.appendChild(e).id = M, !L.getElementsByName || !L.getElementsByName(M).length
                }), E.getById ? (b.find.ID = function(e, t) {
                    if (void 0 !== t.getElementById && I) {
                        var n = t.getElementById(e);
                        return n ? [n] : []
                    }
                }, b.filter.ID = function(e) {
                    var t = e.replace(ve, Ee);
                    return function(e) {
                        return e.getAttribute("id") === t
                    }
                }) : (delete b.find.ID, b.filter.ID = function(e) {
                    var t = e.replace(ve, Ee);
                    return function(e) {
                        var n = void 0 !== e.getAttributeNode && e.getAttributeNode("id");
                        return n && n.value === t
                    }
                }), b.find.TAG = E.getElementsByTagName ? function(e, t) {
                    return void 0 !== t.getElementsByTagName ? t.getElementsByTagName(e) : E.qsa ? t.querySelectorAll(e) : void 0
                } : function(e, t) {
                    var n, o = [],
                        s = 0,
                        r = t.getElementsByTagName(e);
                    if ("*" === e) {
                        for (; n = r[s++];) 1 === n.nodeType && o.push(n);
                        return o
                    }
                    return r
                }, b.find.CLASS = E.getElementsByClassName && function(e, t) {
                    if (void 0 !== t.getElementsByClassName && I) return t.getElementsByClassName(e)
                }, F = [], q = [], (E.qsa = fe.test(L.querySelectorAll)) && (s(function(e) {
                    O.appendChild(e).innerHTML = "<a id='" + M + "'></a><select id='" + M + "-\r\\' msallowcapture=''><option selected=''></option></select>", e.querySelectorAll("[msallowcapture^='']").length && q.push("[*^$]=" + ee + "*(?:''|\"\")"), e.querySelectorAll("[selected]").length || q.push("\\[" + ee + "*(?:value|" + Z + ")"), e.querySelectorAll("[id~=" + M + "-]").length || q.push("~="), e.querySelectorAll(":checked").length || q.push(":checked"), e.querySelectorAll("a#" + M + "+*").length || q.push(".#.+[+~]")
                }), s(function(e) {
                    var t = L.createElement("input");
                    t.setAttribute("type", "hidden"), e.appendChild(t).setAttribute("name", "D"), e.querySelectorAll("[name=d]").length && q.push("name" + ee + "*[*^$|!~]?="), e.querySelectorAll(":enabled").length || q.push(":enabled", ":disabled"), e.querySelectorAll("*,:x"), q.push(",.*:")
                })), (E.matchesSelector = fe.test(N = O.matches || O.webkitMatchesSelector || O.mozMatchesSelector || O.oMatchesSelector || O.msMatchesSelector)) && s(function(e) {
                    E.disconnectedMatch = N.call(e, "div"), N.call(e, "[s!='']:x"), F.push("!=", oe)
                }), q = q.length && new RegExp(q.join("|")), F = F.length && new RegExp(F.join("|")), t = fe.test(O.compareDocumentPosition), R = t || fe.test(O.contains) ? function(e, t) {
                    var n = 9 === e.nodeType ? e.documentElement : e,
                        o = t && t.parentNode;
                    return e === o || !(!o || 1 !== o.nodeType || !(n.contains ? n.contains(o) : e.compareDocumentPosition && 16 & e.compareDocumentPosition(o)))
                } : function(e, t) {
                    if (t)
                        for (; t = t.parentNode;)
                            if (t === e) return !0;
                    return !1
                }, W = t ? function(e, t) {
                    if (e === t) return A = !0, 0;
                    var n = !e.compareDocumentPosition - !t.compareDocumentPosition;
                    return n || (n = (e.ownerDocument || e) === (t.ownerDocument || t) ? e.compareDocumentPosition(t) : 1, 1 & n || !E.sortDetached && t.compareDocumentPosition(e) === n ? e === L || e.ownerDocument === j && R(j, e) ? -1 : t === L || t.ownerDocument === j && R(j, t) ? 1 : _ ? J(_, e) - J(_, t) : 0 : 4 & n ? -1 : 1)
                } : function(e, t) {
                    if (e === t) return A = !0, 0;
                    var n, o = 0,
                        s = e.parentNode,
                        r = t.parentNode,
                        a = [e],
                        i = [t];
                    if (!s || !r) return e === L ? -1 : t === L ? 1 : s ? -1 : r ? 1 : _ ? J(_, e) - J(_, t) : 0;
                    if (s === r) return c(e, t);
                    for (n = e; n = n.parentNode;) a.unshift(n);
                    for (n = t; n = n.parentNode;) i.unshift(n);
                    for (; a[o] === i[o];) o++;
                    return o ? c(a[o], i[o]) : a[o] === j ? -1 : i[o] === j ? 1 : 0
                }, L) : L
            }, t.matches = function(e, n) {
                return t(e, null, null, n)
            }, t.matchesSelector = function(e, n) {
                if ((e.ownerDocument || e) !== L && D(e), n = n.replace(ie, "='$1']"), E.matchesSelector && I && !H[n + " "] && (!F || !F.test(n)) && (!q || !q.test(n))) try {
                    var o = N.call(e, n);
                    if (o || E.disconnectedMatch || e.document && 11 !== e.document.nodeType) return o
                } catch (e) {}
                return t(n, L, null, [e]).length > 0
            }, t.contains = function(e, t) {
                return (e.ownerDocument || e) !== L && D(e), R(e, t)
            }, t.attr = function(e, t) {
                (e.ownerDocument || e) !== L && D(e);
                var n = b.attrHandle[t.toLowerCase()],
                    o = n && Q.call(b.attrHandle, t.toLowerCase()) ? n(e, t, !I) : void 0;
                return void 0 !== o ? o : E.attributes || !I ? e.getAttribute(t) : (o = e.getAttributeNode(t)) && o.specified ? o.value : null
            }, t.error = function(e) {
                throw new Error("Syntax error, unrecognized expression: " + e)
            }, t.uniqueSort = function(e) {
                var t, n = [],
                    o = 0,
                    s = 0;
                if (A = !E.detectDuplicates, _ = !E.sortStable && e.slice(0), e.sort(W), A) {
                    for (; t = e[s++];) t === e[s] && (o = n.push(s));
                    for (; o--;) e.splice(n[o], 1)
                }
                return _ = null, e
            }, w = t.getText = function(e) {
                var t, n = "",
                    o = 0,
                    s = e.nodeType;
                if (s) {
                    if (1 === s || 9 === s || 11 === s) {
                        if ("string" == typeof e.textContent) return e.textContent;
                        for (e = e.firstChild; e; e = e.nextSibling) n += w(e)
                    } else if (3 === s || 4 === s) return e.nodeValue
                } else
                    for (; t = e[o++];) n += w(t);
                return n
            }, b = t.selectors = {
                cacheLength: 50,
                createPseudo: o,
                match: de,
                attrHandle: {},
                find: {},
                relative: {
                    ">": {
                        dir: "parentNode",
                        first: !0
                    },
                    " ": {
                        dir: "parentNode"
                    },
                    "+": {
                        dir: "previousSibling",
                        first: !0
                    },
                    "~": {
                        dir: "previousSibling"
                    }
                },
                preFilter: {
                    ATTR: function(e) {
                        return e[1] = e[1].replace(ve, Ee), e[3] = (e[3] || e[4] || e[5] || "").replace(ve, Ee), "~=" === e[2] && (e[3] = " " + e[3] + " "), e.slice(0, 4)
                    },
                    CHILD: function(e) {
                        return e[1] = e[1].toLowerCase(), "nth" === e[1].slice(0, 3) ? (e[3] || t.error(e[0]), e[4] = +(e[4] ? e[5] + (e[6] || 1) : 2 * ("even" === e[3] || "odd" === e[3])), e[5] = +(e[7] + e[8] || "odd" === e[3])) : e[3] && t.error(e[0]), e
                    },
                    PSEUDO: function(e) {
                        var t, n = !e[6] && e[2];
                        return de.CHILD.test(e[0]) ? null : (e[3] ? e[2] = e[4] || e[5] || "" : n && le.test(n) && (t = T(n, !0)) && (t = n.indexOf(")", n.length - t) - n.length) && (e[0] = e[0].slice(0, t), e[2] = n.slice(0, t)), e.slice(0, 3))
                    }
                },
                filter: {
                    TAG: function(e) {
                        var t = e.replace(ve, Ee).toLowerCase();
                        return "*" === e ? function() {
                            return !0
                        } : function(e) {
                            return e.nodeName && e.nodeName.toLowerCase() === t
                        }
                    },
                    CLASS: function(e) {
                        var t = G[e + " "];
                        return t || (t = new RegExp("(^|" + ee + ")" + e + "(" + ee + "|$)")) && G(e, function(e) {
                            return t.test("string" == typeof e.className && e.className || void 0 !== e.getAttribute && e.getAttribute("class") || "")
                        })
                    },
                    ATTR: function(e, n, o) {
                        return function(s) {
                            var r = t.attr(s, e);
                            return null == r ? "!=" === n : !n || (r += "", "=" === n ? r === o : "!=" === n ? r !== o : "^=" === n ? o && 0 === r.indexOf(o) : "*=" === n ? o && r.indexOf(o) > -1 : "$=" === n ? o && r.slice(-o.length) === o : "~=" === n ? (" " + r.replace(se, " ") + " ").indexOf(o) > -1 : "|=" === n && (r === o || r.slice(0, o.length + 1) === o + "-"))
                        }
                    },
                    CHILD: function(e, t, n, o, s) {
                        var r = "nth" !== e.slice(0, 3),
                            c = "last" !== e.slice(-4),
                            a = "of-type" === t;
                        return 1 === o && 0 === s ? function(e) {
                            return !!e.parentNode
                        } : function(t, n, i) {
                            var l, u, d, p, m, f, h = r !== c ? "nextSibling" : "previousSibling",
                                g = t.parentNode,
                                y = a && t.nodeName.toLowerCase(),
                                v = !i && !a,
                                E = !1;
                            if (g) {
                                if (r) {
                                    for (; h;) {
                                        for (p = t; p = p[h];)
                                            if (a ? p.nodeName.toLowerCase() === y : 1 === p.nodeType) return !1;
                                        f = h = "only" === e && !f && "nextSibling"
                                    }
                                    return !0
                                }
                                if (f = [c ? g.firstChild : g.lastChild], c && v) {
                                    for (p = g, d = p[M] || (p[M] = {}), u = d[p.uniqueID] || (d[p.uniqueID] = {}), l = u[e] || [], m = l[0] === P && l[1], E = m && l[2], p = m && g.childNodes[m]; p = ++m && p && p[h] || (E = m = 0) || f.pop();)
                                        if (1 === p.nodeType && ++E && p === t) {
                                            u[e] = [P, m, E];
                                            break
                                        }
                                } else if (v && (p = t, d = p[M] || (p[M] = {}), u = d[p.uniqueID] || (d[p.uniqueID] = {}), l = u[e] || [], m = l[0] === P && l[1], E = m), !1 === E)
                                    for (;
                                        (p = ++m && p && p[h] || (E = m = 0) || f.pop()) && ((a ? p.nodeName.toLowerCase() !== y : 1 !== p.nodeType) || !++E || (v && (d = p[M] || (p[M] = {}), u = d[p.uniqueID] || (d[p.uniqueID] = {}), u[e] = [P, E]), p !== t)););
                                return (E -= s) === o || E % o == 0 && E / o >= 0
                            }
                        }
                    },
                    PSEUDO: function(e, n) {
                        var s, r = b.pseudos[e] || b.setFilters[e.toLowerCase()] || t.error("unsupported pseudo: " + e);
                        return r[M] ? r(n) : r.length > 1 ? (s = [e, e, "", n], b.setFilters.hasOwnProperty(e.toLowerCase()) ? o(function(e, t) {
                            for (var o, s = r(e, n), c = s.length; c--;) o = J(e, s[c]), e[o] = !(t[o] = s[c])
                        }) : function(e) {
                            return r(e, 0, s)
                        }) : r
                    }
                },
                pseudos: {
                    not: o(function(e) {
                        var t = [],
                            n = [],
                            s = C(e.replace(re, "$1"));
                        return s[M] ? o(function(e, t, n, o) {
                            for (var r, c = s(e, null, o, []), a = e.length; a--;)(r = c[a]) && (e[a] = !(t[a] = r))
                        }) : function(e, o, r) {
                            return t[0] = e, s(t, null, r, n), t[0] = null, !n.pop()
                        }
                    }),
                    has: o(function(e) {
                        return function(n) {
                            return t(e, n).length > 0
                        }
                    }),
                    contains: o(function(e) {
                        return e = e.replace(ve, Ee),
                            function(t) {
                                return (t.textContent || t.innerText || w(t)).indexOf(e) > -1
                            }
                    }),
                    lang: o(function(e) {
                        return ue.test(e || "") || t.error("unsupported lang: " + e), e = e.replace(ve, Ee).toLowerCase(),
                            function(t) {
                                var n;
                                do {
                                    if (n = I ? t.lang : t.getAttribute("xml:lang") || t.getAttribute("lang")) return (n = n.toLowerCase()) === e || 0 === n.indexOf(e + "-")
                                } while ((t = t.parentNode) && 1 === t.nodeType);
                                return !1
                            }
                    }),
                    target: function(t) {
                        var n = e.location && e.location.hash;
                        return n && n.slice(1) === t.id
                    },
                    root: function(e) {
                        return e === O
                    },
                    focus: function(e) {
                        return e === L.activeElement && (!L.hasFocus || L.hasFocus()) && !!(e.type || e.href || ~e.tabIndex)
                    },
                    enabled: function(e) {
                        return !1 === e.disabled
                    },
                    disabled: function(e) {
                        return !0 === e.disabled
                    },
                    checked: function(e) {
                        var t = e.nodeName.toLowerCase();
                        return "input" === t && !!e.checked || "option" === t && !!e.selected
                    },
                    selected: function(e) {
                        return e.parentNode && e.parentNode.selectedIndex, !0 === e.selected
                    },
                    empty: function(e) {
                        for (e = e.firstChild; e; e = e.nextSibling)
                            if (e.nodeType < 6) return !1;
                        return !0
                    },
                    parent: function(e) {
                        return !b.pseudos.empty(e)
                    },
                    header: function(e) {
                        return me.test(e.nodeName)
                    },
                    input: function(e) {
                        return pe.test(e.nodeName)
                    },
                    button: function(e) {
                        var t = e.nodeName.toLowerCase();
                        return "input" === t && "button" === e.type || "button" === t
                    },
                    text: function(e) {
                        var t;
                        return "input" === e.nodeName.toLowerCase() && "text" === e.type && (null == (t = e.getAttribute("type")) || "text" === t.toLowerCase())
                    },
                    first: a(function() {
                        return [0]
                    }),
                    last: a(function(e, t) {
                        return [t - 1]
                    }),
                    eq: a(function(e, t, n) {
                        return [n < 0 ? n + t : n]
                    }),
                    even: a(function(e, t) {
                        for (var n = 0; n < t; n += 2) e.push(n);
                        return e
                    }),
                    odd: a(function(e, t) {
                        for (var n = 1; n < t; n += 2) e.push(n);
                        return e
                    }),
                    lt: a(function(e, t, n) {
                        for (var o = n < 0 ? n + t : n; --o >= 0;) e.push(o);
                        return e
                    }),
                    gt: a(function(e, t, n) {
                        for (var o = n < 0 ? n + t : n; ++o < t;) e.push(o);
                        return e
                    })
                }
            }, b.pseudos.nth = b.pseudos.eq;
            for (v in {
                    radio: !0,
                    checkbox: !0,
                    file: !0,
                    password: !0,
                    image: !0
                }) b.pseudos[v] = function(e) {
                return function(t) {
                    return "input" === t.nodeName.toLowerCase() && t.type === e
                }
            }(v);
            for (v in {
                    submit: !0,
                    reset: !0
                }) b.pseudos[v] = function(e) {
                return function(t) {
                    var n = t.nodeName.toLowerCase();
                    return ("input" === n || "button" === n) && t.type === e
                }
            }(v);
            return l.prototype = b.filters = b.pseudos, b.setFilters = new l, T = t.tokenize = function(e, n) {
                var o, s, r, c, a, i, l, u = B[e + " "];
                if (u) return n ? 0 : u.slice(0);
                for (a = e, i = [], l = b.preFilter; a;) {
                    o && !(s = ce.exec(a)) || (s && (a = a.slice(s[0].length) || a), i.push(r = [])), o = !1, (s = ae.exec(a)) && (o = s.shift(), r.push({
                        value: o,
                        type: s[0].replace(re, " ")
                    }), a = a.slice(o.length));
                    for (c in b.filter) !(s = de[c].exec(a)) || l[c] && !(s = l[c](s)) || (o = s.shift(), r.push({
                        value: o,
                        type: c,
                        matches: s
                    }), a = a.slice(o.length));
                    if (!o) break
                }
                return n ? a.length : a ? t.error(e) : B(e, i).slice(0)
            }, C = t.compile = function(e, t) {
                var n, o = [],
                    s = [],
                    r = H[e + " "];
                if (!r) {
                    for (t || (t = T(e)), n = t.length; n--;) r = g(t[n]), r[M] ? o.push(r) : s.push(r);
                    r = H(e, y(s, o)), r.selector = e
                }
                return r
            }, x = t.select = function(e, t, n, o) {
                var s, r, c, a, l, d = "function" == typeof e && e,
                    p = !o && T(e = d.selector || e);
                if (n = n || [], 1 === p.length) {
                    if (r = p[0] = p[0].slice(0), r.length > 2 && "ID" === (c = r[0]).type && E.getById && 9 === t.nodeType && I && b.relative[r[1].type]) {
                        if (!(t = (b.find.ID(c.matches[0].replace(ve, Ee), t) || [])[0])) return n;
                        d && (t = t.parentNode), e = e.slice(r.shift().value.length)
                    }
                    for (s = de.needsContext.test(e) ? 0 : r.length; s-- && (c = r[s], !b.relative[a = c.type]);)
                        if ((l = b.find[a]) && (o = l(c.matches[0].replace(ve, Ee), ge.test(r[0].type) && i(t.parentNode) || t))) {
                            if (r.splice(s, 1), !(e = o.length && u(r))) return X.apply(n, o), n;
                            break
                        }
                }
                return (d || C(e, p))(o, t, !I, n, !t || ge.test(e) && i(t.parentNode) || t), n
            }, E.sortStable = M.split("").sort(W).join("") === M, E.detectDuplicates = !!A, D(), E.sortDetached = s(function(e) {
                return 1 & e.compareDocumentPosition(L.createElement("div"))
            }), s(function(e) {
                return e.innerHTML = "<a href='#'></a>", "#" === e.firstChild.getAttribute("href")
            }) || r("type|href|height|width", function(e, t, n) {
                if (!n) return e.getAttribute(t, "type" === t.toLowerCase() ? 1 : 2)
            }), E.attributes && s(function(e) {
                return e.innerHTML = "<input/>", e.firstChild.setAttribute("value", ""), "" === e.firstChild.getAttribute("value")
            }) || r("value", function(e, t, n) {
                if (!n && "input" === e.nodeName.toLowerCase()) return e.defaultValue
            }), s(function(e) {
                return null == e.getAttribute("disabled")
            }) || r(Z, function(e, t, n) {
                var o;
                if (!n) return !0 === e[t] ? t.toLowerCase() : (o = e.getAttributeNode(t)) && o.specified ? o.value : null
            }), t
        }(e);
        se.find = le, se.expr = le.selectors, se.expr[":"] = se.expr.pseudos, se.uniqueSort = se.unique = le.uniqueSort, se.text = le.getText, se.isXMLDoc = le.isXML, se.contains = le.contains;
        var ue = function(e, t, n) {
                for (var o = [], s = void 0 !== n;
                    (e = e[t]) && 9 !== e.nodeType;)
                    if (1 === e.nodeType) {
                        if (s && se(e).is(n)) break;
                        o.push(e)
                    } return o
            },
            de = function(e, t) {
                for (var n = []; e; e = e.nextSibling) 1 === e.nodeType && e !== t && n.push(e);
                return n
            },
            pe = se.expr.match.needsContext,
            me = /^<([\w-]+)\s*\/?>(?:<\/\1>|)$/,
            fe = /^.[^:#\[\.,]*$/;
        se.filter = function(e, t, n) {
            var o = t[0];
            return n && (e = ":not(" + e + ")"), 1 === t.length && 1 === o.nodeType ? se.find.matchesSelector(o, e) ? [o] : [] : se.find.matches(e, se.grep(t, function(e) {
                return 1 === e.nodeType
            }))
        }, se.fn.extend({
            find: function(e) {
                var t, n = this.length,
                    o = [],
                    s = this;
                if ("string" != typeof e) return this.pushStack(se(e).filter(function() {
                    for (t = 0; t < n; t++)
                        if (se.contains(s[t], this)) return !0
                }));
                for (t = 0; t < n; t++) se.find(e, s[t], o);
                return o = this.pushStack(n > 1 ? se.unique(o) : o), o.selector = this.selector ? this.selector + " " + e : e, o
            },
            filter: function(e) {
                return this.pushStack(o(this, e || [], !1))
            },
            not: function(e) {
                return this.pushStack(o(this, e || [], !0))
            },
            is: function(e) {
                return !!o(this, "string" == typeof e && pe.test(e) ? se(e) : e || [], !1).length
            }
        });
        var he, ge = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/;
        (se.fn.init = function(e, t, n) {
            var o, s;
            if (!e) return this;
            if (n = n || he, "string" == typeof e) {
                if (!(o = "<" === e[0] && ">" === e[e.length - 1] && e.length >= 3 ? [null, e, null] : ge.exec(e)) || !o[1] && t) return !t || t.jquery ? (t || n).find(e) : this.constructor(t).find(e);
                if (o[1]) {
                    if (t = t instanceof se ? t[0] : t, se.merge(this, se.parseHTML(o[1], t && t.nodeType ? t.ownerDocument || t : $, !0)), me.test(o[1]) && se.isPlainObject(t))
                        for (o in t) se.isFunction(this[o]) ? this[o](t[o]) : this.attr(o, t[o]);
                    return this
                }
                return s = $.getElementById(o[2]), s && s.parentNode && (this.length = 1, this[0] = s), this.context = $, this.selector = e, this
            }
            return e.nodeType ? (this.context = this[0] = e, this.length = 1, this) : se.isFunction(e) ? void 0 !== n.ready ? n.ready(e) : e(se) : (void 0 !== e.selector && (this.selector = e.selector, this.context = e.context), se.makeArray(e, this))
        }).prototype = se.fn, he = se($);
        var ye = /^(?:parents|prev(?:Until|All))/,
            ve = {
                children: !0,
                contents: !0,
                next: !0,
                prev: !0
            };
        se.fn.extend({
            has: function(e) {
                var t = se(e, this),
                    n = t.length;
                return this.filter(function() {
                    for (var e = 0; e < n; e++)
                        if (se.contains(this, t[e])) return !0
                })
            },
            closest: function(e, t) {
                for (var n, o = 0, s = this.length, r = [], c = pe.test(e) || "string" != typeof e ? se(e, t || this.context) : 0; o < s; o++)
                    for (n = this[o]; n && n !== t; n = n.parentNode)
                        if (n.nodeType < 11 && (c ? c.index(n) > -1 : 1 === n.nodeType && se.find.matchesSelector(n, e))) {
                            r.push(n);
                            break
                        } return this.pushStack(r.length > 1 ? se.uniqueSort(r) : r)
            },
            index: function(e) {
                return e ? "string" == typeof e ? Z.call(se(e), this[0]) : Z.call(this, e.jquery ? e[0] : e) : this[0] && this[0].parentNode ? this.first().prevAll().length : -1
            },
            add: function(e, t) {
                return this.pushStack(se.uniqueSort(se.merge(this.get(), se(e, t))))
            },
            addBack: function(e) {
                return this.add(null == e ? this.prevObject : this.prevObject.filter(e))
            }
        }), se.each({
            parent: function(e) {
                var t = e.parentNode;
                return t && 11 !== t.nodeType ? t : null
            },
            parents: function(e) {
                return ue(e, "parentNode")
            },
            parentsUntil: function(e, t, n) {
                return ue(e, "parentNode", n)
            },
            next: function(e) {
                return s(e, "nextSibling")
            },
            prev: function(e) {
                return s(e, "previousSibling")
            },
            nextAll: function(e) {
                return ue(e, "nextSibling")
            },
            prevAll: function(e) {
                return ue(e, "previousSibling")
            },
            nextUntil: function(e, t, n) {
                return ue(e, "nextSibling", n)
            },
            prevUntil: function(e, t, n) {
                return ue(e, "previousSibling", n)
            },
            siblings: function(e) {
                return de((e.parentNode || {}).firstChild, e)
            },
            children: function(e) {
                return de(e.firstChild)
            },
            contents: function(e) {
                return e.contentDocument || se.merge([], e.childNodes)
            }
        }, function(e, t) {
            se.fn[e] = function(n, o) {
                var s = se.map(this, t, n);
                return "Until" !== e.slice(-5) && (o = n), o && "string" == typeof o && (s = se.filter(o, s)), this.length > 1 && (ve[e] || se.uniqueSort(s), ye.test(e) && s.reverse()), this.pushStack(s)
            }
        });
        var Ee = /\S+/g;
        se.Callbacks = function(e) {
            e = "string" == typeof e ? r(e) : se.extend({}, e);
            var t, n, o, s, c = [],
                a = [],
                i = -1,
                l = function() {
                    for (s = e.once, o = t = !0; a.length; i = -1)
                        for (n = a.shift(); ++i < c.length;) !1 === c[i].apply(n[0], n[1]) && e.stopOnFalse && (i = c.length, n = !1);
                    e.memory || (n = !1), t = !1, s && (c = n ? [] : "")
                },
                u = {
                    add: function() {
                        return c && (n && !t && (i = c.length - 1, a.push(n)), function t(n) {
                            se.each(n, function(n, o) {
                                se.isFunction(o) ? e.unique && u.has(o) || c.push(o) : o && o.length && "string" !== se.type(o) && t(o)
                            })
                        }(arguments), n && !t && l()), this
                    },
                    remove: function() {
                        return se.each(arguments, function(e, t) {
                            for (var n;
                                (n = se.inArray(t, c, n)) > -1;) c.splice(n, 1), n <= i && i--
                        }), this
                    },
                    has: function(e) {
                        return e ? se.inArray(e, c) > -1 : c.length > 0
                    },
                    empty: function() {
                        return c && (c = []), this
                    },
                    disable: function() {
                        return s = a = [], c = n = "", this
                    },
                    disabled: function() {
                        return !c
                    },
                    lock: function() {
                        return s = a = [], n || (c = n = ""), this
                    },
                    locked: function() {
                        return !!s
                    },
                    fireWith: function(e, n) {
                        return s || (n = n || [], n = [e, n.slice ? n.slice() : n], a.push(n), t || l()), this
                    },
                    fire: function() {
                        return u.fireWith(this, arguments), this
                    },
                    fired: function() {
                        return !!o
                    }
                };
            return u
        }, se.extend({
            Deferred: function(e) {
                var t = [
                        ["resolve", "done", se.Callbacks("once memory"), "resolved"],
                        ["reject", "fail", se.Callbacks("once memory"), "rejected"],
                        ["notify", "progress", se.Callbacks("memory")]
                    ],
                    n = "pending",
                    o = {
                        state: function() {
                            return n
                        },
                        always: function() {
                            return s.done(arguments).fail(arguments), this
                        },
                        then: function() {
                            var e = arguments;
                            return se.Deferred(function(n) {
                                se.each(t, function(t, r) {
                                    var c = se.isFunction(e[t]) && e[t];
                                    s[r[1]](function() {
                                        var e = c && c.apply(this, arguments);
                                        e && se.isFunction(e.promise) ? e.promise().progress(n.notify).done(n.resolve).fail(n.reject) : n[r[0] + "With"](this === o ? n.promise() : this, c ? [e] : arguments)
                                    })
                                }), e = null
                            }).promise()
                        },
                        promise: function(e) {
                            return null != e ? se.extend(e, o) : o
                        }
                    },
                    s = {};
                return o.pipe = o.then, se.each(t, function(e, r) {
                    var c = r[2],
                        a = r[3];
                    o[r[1]] = c.add, a && c.add(function() {
                        n = a
                    }, t[1 ^ e][2].disable, t[2][2].lock), s[r[0]] = function() {
                        return s[r[0] + "With"](this === s ? o : this, arguments), this
                    }, s[r[0] + "With"] = c.fireWith
                }), o.promise(s), e && e.call(s, s), s
            },
            when: function(e) {
                var t, n, o, s = 0,
                    r = X.call(arguments),
                    c = r.length,
                    a = 1 !== c || e && se.isFunction(e.promise) ? c : 0,
                    i = 1 === a ? e : se.Deferred(),
                    l = function(e, n, o) {
                        return function(s) {
                            n[e] = this, o[e] = arguments.length > 1 ? X.call(arguments) : s, o === t ? i.notifyWith(n, o) : --a || i.resolveWith(n, o)
                        }
                    };
                if (c > 1)
                    for (t = new Array(c), n = new Array(c), o = new Array(c); s < c; s++) r[s] && se.isFunction(r[s].promise) ? r[s].promise().progress(l(s, n, t)).done(l(s, o, r)).fail(i.reject) : --a;
                return a || i.resolveWith(o, r), i.promise()
            }
        });
        var be;
        se.fn.ready = function(e) {
            return se.ready.promise().done(e), this
        }, se.extend({
            isReady: !1,
            readyWait: 1,
            holdReady: function(e) {
                e ? se.readyWait++ : se.ready(!0)
            },
            ready: function(e) {
                (!0 === e ? --se.readyWait : se.isReady) || (se.isReady = !0, !0 !== e && --se.readyWait > 0 || (be.resolveWith($, [se]), se.fn.triggerHandler && (se($).triggerHandler("ready"), se($).off("ready"))))
            }
        }), se.ready.promise = function(t) {
            return be || (be = se.Deferred(), "complete" === $.readyState || "loading" !== $.readyState && !$.documentElement.doScroll ? e.setTimeout(se.ready) : ($.addEventListener("DOMContentLoaded", c), e.addEventListener("load", c))), be.promise(t)
        }, se.ready.promise();
        var we = function(e, t, n, o, s, r, c) {
                var a = 0,
                    i = e.length,
                    l = null == n;
                if ("object" === se.type(n)) {
                    s = !0;
                    for (a in n) we(e, t, a, n[a], !0, r, c)
                } else if (void 0 !== o && (s = !0, se.isFunction(o) || (c = !0), l && (c ? (t.call(e, o), t = null) : (l = t, t = function(e, t, n) {
                        return l.call(se(e), n)
                    })), t))
                    for (; a < i; a++) t(e[a], n, c ? o : o.call(e[a], a, t(e[a], n)));
                return s ? e : l ? t.call(e) : i ? t(e[0], n) : r
            },
            ke = function(e) {
                return 1 === e.nodeType || 9 === e.nodeType || !+e.nodeType
            };
        a.uid = 1, a.prototype = {
            register: function(e, t) {
                var n = t || {};
                return e.nodeType ? e[this.expando] = n : Object.defineProperty(e, this.expando, {
                    value: n,
                    writable: !0,
                    configurable: !0
                }), e[this.expando]
            },
            cache: function(e) {
                if (!ke(e)) return {};
                var t = e[this.expando];
                return t || (t = {}, ke(e) && (e.nodeType ? e[this.expando] = t : Object.defineProperty(e, this.expando, {
                    value: t,
                    configurable: !0
                }))), t
            },
            set: function(e, t, n) {
                var o, s = this.cache(e);
                if ("string" == typeof t) s[t] = n;
                else
                    for (o in t) s[o] = t[o];
                return s
            },
            get: function(e, t) {
                return void 0 === t ? this.cache(e) : e[this.expando] && e[this.expando][t]
            },
            access: function(e, t, n) {
                var o;
                return void 0 === t || t && "string" == typeof t && void 0 === n ? (o = this.get(e, t), void 0 !== o ? o : this.get(e, se.camelCase(t))) : (this.set(e, t, n), void 0 !== n ? n : t)
            },
            remove: function(e, t) {
                var n, o, s, r = e[this.expando];
                if (void 0 !== r) {
                    if (void 0 === t) this.register(e);
                    else {
                        se.isArray(t) ? o = t.concat(t.map(se.camelCase)) : (s = se.camelCase(t), t in r ? o = [t, s] : (o = s, o = o in r ? [o] : o.match(Ee) || [])), n = o.length;
                        for (; n--;) delete r[o[n]]
                    }(void 0 === t || se.isEmptyObject(r)) && (e.nodeType ? e[this.expando] = void 0 : delete e[this.expando])
                }
            },
            hasData: function(e) {
                var t = e[this.expando];
                return void 0 !== t && !se.isEmptyObject(t)
            }
        };
        var Te = new a,
            Ce = new a,
            xe = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
            Se = /[A-Z]/g;
        se.extend({
            hasData: function(e) {
                return Ce.hasData(e) || Te.hasData(e)
            },
            data: function(e, t, n) {
                return Ce.access(e, t, n)
            },
            removeData: function(e, t) {
                Ce.remove(e, t)
            },
            _data: function(e, t, n) {
                return Te.access(e, t, n)
            },
            _removeData: function(e, t) {
                Te.remove(e, t)
            }
        }), se.fn.extend({
            data: function(e, t) {
                var n, o, s, r = this[0],
                    c = r && r.attributes;
                if (void 0 === e) {
                    if (this.length && (s = Ce.get(r), 1 === r.nodeType && !Te.get(r, "hasDataAttrs"))) {
                        for (n = c.length; n--;) c[n] && (o = c[n].name, 0 === o.indexOf("data-") && (o = se.camelCase(o.slice(5)), i(r, o, s[o])));
                        Te.set(r, "hasDataAttrs", !0)
                    }
                    return s
                }
                return "object" == typeof e ? this.each(function() {
                    Ce.set(this, e)
                }) : we(this, function(t) {
                    var n, o;
                    if (r && void 0 === t) {
                        if (void 0 !== (n = Ce.get(r, e) || Ce.get(r, e.replace(Se, "-$&").toLowerCase()))) return n;
                        if (o = se.camelCase(e), void 0 !== (n = Ce.get(r, o))) return n;
                        if (void 0 !== (n = i(r, o, void 0))) return n
                    } else o = se.camelCase(e), this.each(function() {
                        var n = Ce.get(this, o);
                        Ce.set(this, o, t), e.indexOf("-") > -1 && void 0 !== n && Ce.set(this, e, t)
                    })
                }, null, t, arguments.length > 1, null, !0)
            },
            removeData: function(e) {
                return this.each(function() {
                    Ce.remove(this, e)
                })
            }
        }), se.extend({
            queue: function(e, t, n) {
                var o;
                if (e) return t = (t || "fx") + "queue", o = Te.get(e, t), n && (!o || se.isArray(n) ? o = Te.access(e, t, se.makeArray(n)) : o.push(n)), o || []
            },
            dequeue: function(e, t) {
                t = t || "fx";
                var n = se.queue(e, t),
                    o = n.length,
                    s = n.shift(),
                    r = se._queueHooks(e, t),
                    c = function() {
                        se.dequeue(e, t)
                    };
                "inprogress" === s && (s = n.shift(), o--), s && ("fx" === t && n.unshift("inprogress"), delete r.stop, s.call(e, c, r)), !o && r && r.empty.fire()
            },
            _queueHooks: function(e, t) {
                var n = t + "queueHooks";
                return Te.get(e, n) || Te.access(e, n, {
                    empty: se.Callbacks("once memory").add(function() {
                        Te.remove(e, [t + "queue", n])
                    })
                })
            }
        }), se.fn.extend({
            queue: function(e, t) {
                var n = 2;
                return "string" != typeof e && (t = e, e = "fx", n--), arguments.length < n ? se.queue(this[0], e) : void 0 === t ? this : this.each(function() {
                    var n = se.queue(this, e, t);
                    se._queueHooks(this, e), "fx" === e && "inprogress" !== n[0] && se.dequeue(this, e)
                })
            },
            dequeue: function(e) {
                return this.each(function() {
                    se.dequeue(this, e)
                })
            },
            clearQueue: function(e) {
                return this.queue(e || "fx", [])
            },
            promise: function(e, t) {
                var n, o = 1,
                    s = se.Deferred(),
                    r = this,
                    c = this.length,
                    a = function() {
                        --o || s.resolveWith(r, [r])
                    };
                for ("string" != typeof e && (t = e, e = void 0), e = e || "fx"; c--;)(n = Te.get(r[c], e + "queueHooks")) && n.empty && (o++, n.empty.add(a));
                return a(), s.promise(t)
            }
        });
        var _e = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,
            Ae = new RegExp("^(?:([+-])=|)(" + _e + ")([a-z%]*)$", "i"),
            De = ["Top", "Right", "Bottom", "Left"],
            Le = function(e, t) {
                return e = t || e, "none" === se.css(e, "display") || !se.contains(e.ownerDocument, e)
            },
            Oe = /^(?:checkbox|radio)$/i,
            Ie = /<([\w:-]+)/,
            qe = /^$|\/(?:java|ecma)script/i,
            Fe = {
                option: [1, "<select multiple='multiple'>", "</select>"],
                thead: [1, "<table>", "</table>"],
                col: [2, "<table><colgroup>", "</colgroup></table>"],
                tr: [2, "<table><tbody>", "</tbody></table>"],
                td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
                _default: [0, "", ""]
            };
        Fe.optgroup = Fe.option, Fe.tbody = Fe.tfoot = Fe.colgroup = Fe.caption = Fe.thead, Fe.th = Fe.td;
        var Ne = /<|&#?\w+;/;
        ! function() {
            var e = $.createDocumentFragment(),
                t = e.appendChild($.createElement("div")),
                n = $.createElement("input");
            n.setAttribute("type", "radio"), n.setAttribute("checked", "checked"), n.setAttribute("name", "t"), t.appendChild(n), oe.checkClone = t.cloneNode(!0).cloneNode(!0).lastChild.checked, t.innerHTML = "<textarea>x</textarea>", oe.noCloneChecked = !!t.cloneNode(!0).lastChild.defaultValue
        }();
        var Re = /^key/,
            Me = /^(?:mouse|pointer|contextmenu|drag|drop)|click/,
            je = /^([^.]*)(?:\.(.+)|)/;
        se.event = {
            global: {},
            add: function(e, t, n, o, s) {
                var r, c, a, i, l, u, d, p, m, f, h, g = Te.get(e);
                if (g)
                    for (n.handler && (r = n, n = r.handler, s = r.selector), n.guid || (n.guid = se.guid++), (i = g.events) || (i = g.events = {}), (c = g.handle) || (c = g.handle = function(t) {
                            return void 0 !== se && se.event.triggered !== t.type ? se.event.dispatch.apply(e, arguments) : void 0
                        }), t = (t || "").match(Ee) || [""], l = t.length; l--;) a = je.exec(t[l]) || [], m = h = a[1], f = (a[2] || "").split(".").sort(), m && (d = se.event.special[m] || {}, m = (s ? d.delegateType : d.bindType) || m, d = se.event.special[m] || {}, u = se.extend({
                        type: m,
                        origType: h,
                        data: o,
                        handler: n,
                        guid: n.guid,
                        selector: s,
                        needsContext: s && se.expr.match.needsContext.test(s),
                        namespace: f.join(".")
                    }, r), (p = i[m]) || (p = i[m] = [], p.delegateCount = 0, d.setup && !1 !== d.setup.call(e, o, f, c) || e.addEventListener && e.addEventListener(m, c)), d.add && (d.add.call(e, u), u.handler.guid || (u.handler.guid = n.guid)), s ? p.splice(p.delegateCount++, 0, u) : p.push(u), se.event.global[m] = !0)
            },
            remove: function(e, t, n, o, s) {
                var r, c, a, i, l, u, d, p, m, f, h, g = Te.hasData(e) && Te.get(e);
                if (g && (i = g.events)) {
                    for (t = (t || "").match(Ee) || [""], l = t.length; l--;)
                        if (a = je.exec(t[l]) || [], m = h = a[1], f = (a[2] || "").split(".").sort(), m) {
                            for (d = se.event.special[m] || {}, m = (o ? d.delegateType : d.bindType) || m, p = i[m] || [], a = a[2] && new RegExp("(^|\\.)" + f.join("\\.(?:.*\\.|)") + "(\\.|$)"), c = r = p.length; r--;) u = p[r], !s && h !== u.origType || n && n.guid !== u.guid || a && !a.test(u.namespace) || o && o !== u.selector && ("**" !== o || !u.selector) || (p.splice(r, 1), u.selector && p.delegateCount--, d.remove && d.remove.call(e, u));
                            c && !p.length && (d.teardown && !1 !== d.teardown.call(e, f, g.handle) || se.removeEvent(e, m, g.handle), delete i[m])
                        } else
                            for (m in i) se.event.remove(e, m + t[l], n, o, !0);
                    se.isEmptyObject(i) && Te.remove(e, "handle events")
                }
            },
            dispatch: function(e) {
                e = se.event.fix(e);
                var t, n, o, s, r, c = [],
                    a = X.call(arguments),
                    i = (Te.get(this, "events") || {})[e.type] || [],
                    l = se.event.special[e.type] || {};
                if (a[0] = e, e.delegateTarget = this, !l.preDispatch || !1 !== l.preDispatch.call(this, e)) {
                    for (c = se.event.handlers.call(this, e, i), t = 0;
                        (s = c[t++]) && !e.isPropagationStopped();)
                        for (e.currentTarget = s.elem, n = 0;
                            (r = s.handlers[n++]) && !e.isImmediatePropagationStopped();) e.rnamespace && !e.rnamespace.test(r.namespace) || (e.handleObj = r, e.data = r.data, void 0 !== (o = ((se.event.special[r.origType] || {}).handle || r.handler).apply(s.elem, a)) && !1 === (e.result = o) && (e.preventDefault(), e.stopPropagation()));
                    return l.postDispatch && l.postDispatch.call(this, e), e.result
                }
            },
            handlers: function(e, t) {
                var n, o, s, r, c = [],
                    a = t.delegateCount,
                    i = e.target;
                if (a && i.nodeType && ("click" !== e.type || isNaN(e.button) || e.button < 1))
                    for (; i !== this; i = i.parentNode || this)
                        if (1 === i.nodeType && (!0 !== i.disabled || "click" !== e.type)) {
                            for (o = [], n = 0; n < a; n++) r = t[n], s = r.selector + " ", void 0 === o[s] && (o[s] = r.needsContext ? se(s, this).index(i) > -1 : se.find(s, this, null, [i]).length), o[s] && o.push(r);
                            o.length && c.push({
                                elem: i,
                                handlers: o
                            })
                        } return a < t.length && c.push({
                    elem: this,
                    handlers: t.slice(a)
                }), c
            },
            props: "altKey bubbles cancelable ctrlKey currentTarget detail eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),
            fixHooks: {},
            keyHooks: {
                props: "char charCode key keyCode".split(" "),
                filter: function(e, t) {
                    return null == e.which && (e.which = null != t.charCode ? t.charCode : t.keyCode), e
                }
            },
            mouseHooks: {
                props: "button buttons clientX clientY offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
                filter: function(e, t) {
                    var n, o, s, r = t.button;
                    return null == e.pageX && null != t.clientX && (n = e.target.ownerDocument || $, o = n.documentElement, s = n.body, e.pageX = t.clientX + (o && o.scrollLeft || s && s.scrollLeft || 0) - (o && o.clientLeft || s && s.clientLeft || 0), e.pageY = t.clientY + (o && o.scrollTop || s && s.scrollTop || 0) - (o && o.clientTop || s && s.clientTop || 0)), e.which || void 0 === r || (e.which = 1 & r ? 1 : 2 & r ? 3 : 4 & r ? 2 : 0), e
                }
            },
            fix: function(e) {
                if (e[se.expando]) return e;
                var t, n, o, s = e.type,
                    r = e,
                    c = this.fixHooks[s];
                for (c || (this.fixHooks[s] = c = Me.test(s) ? this.mouseHooks : Re.test(s) ? this.keyHooks : {}), o = c.props ? this.props.concat(c.props) : this.props, e = new se.Event(r), t = o.length; t--;) n = o[t], e[n] = r[n];
                return e.target || (e.target = $), 3 === e.target.nodeType && (e.target = e.target.parentNode), c.filter ? c.filter(e, r) : e
            },
            special: {
                load: {
                    noBubble: !0
                },
                focus: {
                    trigger: function() {
                        if (this !== h() && this.focus) return this.focus(), !1
                    },
                    delegateType: "focusin"
                },
                blur: {
                    trigger: function() {
                        if (this === h() && this.blur) return this.blur(), !1
                    },
                    delegateType: "focusout"
                },
                click: {
                    trigger: function() {
                        if ("checkbox" === this.type && this.click && se.nodeName(this, "input")) return this.click(), !1
                    },
                    _default: function(e) {
                        return se.nodeName(e.target, "a")
                    }
                },
                beforeunload: {
                    postDispatch: function(e) {
                        void 0 !== e.result && e.originalEvent && (e.originalEvent.returnValue = e.result)
                    }
                }
            }
        }, se.removeEvent = function(e, t, n) {
            e.removeEventListener && e.removeEventListener(t, n)
        }, se.Event = function(e, t) {
            if (!(this instanceof se.Event)) return new se.Event(e, t);
            e && e.type ? (this.originalEvent = e, this.type = e.type, this.isDefaultPrevented = e.defaultPrevented || void 0 === e.defaultPrevented && !1 === e.returnValue ? m : f) : this.type = e, t && se.extend(this, t), this.timeStamp = e && e.timeStamp || se.now(), this[se.expando] = !0
        }, se.Event.prototype = {
            constructor: se.Event,
            isDefaultPrevented: f,
            isPropagationStopped: f,
            isImmediatePropagationStopped: f,
            isSimulated: !1,
            preventDefault: function() {
                var e = this.originalEvent;
                this.isDefaultPrevented = m, e && !this.isSimulated && e.preventDefault()
            },
            stopPropagation: function() {
                var e = this.originalEvent;
                this.isPropagationStopped = m, e && !this.isSimulated && e.stopPropagation()
            },
            stopImmediatePropagation: function() {
                var e = this.originalEvent;
                this.isImmediatePropagationStopped = m, e && !this.isSimulated && e.stopImmediatePropagation(), this.stopPropagation()
            }
        }, se.each({
            mouseenter: "mouseover",
            mouseleave: "mouseout",
            pointerenter: "pointerover",
            pointerleave: "pointerout"
        }, function(e, t) {
            se.event.special[e] = {
                delegateType: t,
                bindType: t,
                handle: function(e) {
                    var n, o = this,
                        s = e.relatedTarget,
                        r = e.handleObj;
                    return s && (s === o || se.contains(o, s)) || (e.type = r.origType, n = r.handler.apply(this, arguments), e.type = t), n
                }
            }
        }), se.fn.extend({
            on: function(e, t, n, o) {
                return g(this, e, t, n, o)
            },
            one: function(e, t, n, o) {
                return g(this, e, t, n, o, 1)
            },
            off: function(e, t, n) {
                var o, s;
                if (e && e.preventDefault && e.handleObj) return o = e.handleObj, se(e.delegateTarget).off(o.namespace ? o.origType + "." + o.namespace : o.origType, o.selector, o.handler), this;
                if ("object" == typeof e) {
                    for (s in e) this.off(s, t, e[s]);
                    return this
                }
                return !1 !== t && "function" != typeof t || (n = t, t = void 0), !1 === n && (n = f), this.each(function() {
                    se.event.remove(this, e, n, t)
                })
            }
        });
        var Pe = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:-]+)[^>]*)\/>/gi,
            Ue = /<script|<style|<link/i,
            Ge = /checked\s*(?:[^=]|=\s*.checked.)/i,
            Be = /^true\/(.*)/,
            He = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g;
        se.extend({
            htmlPrefilter: function(e) {
                return e.replace(Pe, "<$1></$2>")
            },
            clone: function(e, t, n) {
                var o, s, r, c, a = e.cloneNode(!0),
                    i = se.contains(e.ownerDocument, e);
                if (!(oe.noCloneChecked || 1 !== e.nodeType && 11 !== e.nodeType || se.isXMLDoc(e)))
                    for (c = u(a), r = u(e), o = 0, s = r.length; o < s; o++) w(r[o], c[o]);
                if (t)
                    if (n)
                        for (r = r || u(e), c = c || u(a), o = 0, s = r.length; o < s; o++) b(r[o], c[o]);
                    else b(e, a);
                return c = u(a, "script"), c.length > 0 && d(c, !i && u(e, "script")), a
            },
            cleanData: function(e) {
                for (var t, n, o, s = se.event.special, r = 0; void 0 !== (n = e[r]); r++)
                    if (ke(n)) {
                        if (t = n[Te.expando]) {
                            if (t.events)
                                for (o in t.events) s[o] ? se.event.remove(n, o) : se.removeEvent(n, o, t.handle);
                            n[Te.expando] = void 0
                        }
                        n[Ce.expando] && (n[Ce.expando] = void 0)
                    }
            }
        }), se.fn.extend({
            domManip: k,
            detach: function(e) {
                return T(this, e, !0)
            },
            remove: function(e) {
                return T(this, e)
            },
            text: function(e) {
                return we(this, function(e) {
                    return void 0 === e ? se.text(this) : this.empty().each(function() {
                        1 !== this.nodeType && 11 !== this.nodeType && 9 !== this.nodeType || (this.textContent = e)
                    })
                }, null, e, arguments.length)
            },
            append: function() {
                return k(this, arguments, function(e) {
                    if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
                        y(this, e).appendChild(e)
                    }
                })
            },
            prepend: function() {
                return k(this, arguments, function(e) {
                    if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
                        var t = y(this, e);
                        t.insertBefore(e, t.firstChild)
                    }
                })
            },
            before: function() {
                return k(this, arguments, function(e) {
                    this.parentNode && this.parentNode.insertBefore(e, this)
                })
            },
            after: function() {
                return k(this, arguments, function(e) {
                    this.parentNode && this.parentNode.insertBefore(e, this.nextSibling)
                })
            },
            empty: function() {
                for (var e, t = 0; null != (e = this[t]); t++) 1 === e.nodeType && (se.cleanData(u(e, !1)), e.textContent = "");
                return this
            },
            clone: function(e, t) {
                return e = null != e && e, t = null == t ? e : t, this.map(function() {
                    return se.clone(this, e, t)
                })
            },
            html: function(e) {
                return we(this, function(e) {
                    var t = this[0] || {},
                        n = 0,
                        o = this.length;
                    if (void 0 === e && 1 === t.nodeType) return t.innerHTML;
                    if ("string" == typeof e && !Ue.test(e) && !Fe[(Ie.exec(e) || ["", ""])[1].toLowerCase()]) {
                        e = se.htmlPrefilter(e);
                        try {
                            for (; n < o; n++) t = this[n] || {}, 1 === t.nodeType && (se.cleanData(u(t, !1)), t.innerHTML = e);
                            t = 0
                        } catch (e) {}
                    }
                    t && this.empty().append(e)
                }, null, e, arguments.length)
            },
            replaceWith: function() {
                var e = [];
                return k(this, arguments, function(t) {
                    var n = this.parentNode;
                    se.inArray(this, e) < 0 && (se.cleanData(u(this)), n && n.replaceChild(t, this))
                }, e)
            }
        }), se.each({
            appendTo: "append",
            prependTo: "prepend",
            insertBefore: "before",
            insertAfter: "after",
            replaceAll: "replaceWith"
        }, function(e, t) {
            se.fn[e] = function(e) {
                for (var n, o = [], s = se(e), r = s.length - 1, c = 0; c <= r; c++) n = c === r ? this : this.clone(!0), se(s[c])[t](n), J.apply(o, n.get());
                return this.pushStack(o)
            }
        });
        var We, Ve = {
                HTML: "block",
                BODY: "block"
            },
            Qe = /^margin/,
            ze = new RegExp("^(" + _e + ")(?!px)[a-z%]+$", "i"),
            Ke = function(t) {
                var n = t.ownerDocument.defaultView;
                return n && n.opener || (n = e), n.getComputedStyle(t)
            },
            $e = function(e, t, n, o) {
                var s, r, c = {};
                for (r in t) c[r] = e.style[r], e.style[r] = t[r];
                s = n.apply(e, o || []);
                for (r in t) e.style[r] = c[r];
                return s
            },
            Xe = $.documentElement;
        ! function() {
            function t() {
                a.style.cssText = "-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;position:relative;display:block;margin:auto;border:1px;padding:1px;top:1%;width:50%", a.innerHTML = "", Xe.appendChild(c);
                var t = e.getComputedStyle(a);
                n = "1%" !== t.top, r = "2px" === t.marginLeft, o = "4px" === t.width, a.style.marginRight = "50%", s = "4px" === t.marginRight, Xe.removeChild(c)
            }
            var n, o, s, r, c = $.createElement("div"),
                a = $.createElement("div");
            a.style && (a.style.backgroundClip = "content-box", a.cloneNode(!0).style.backgroundClip = "", oe.clearCloneStyle = "content-box" === a.style.backgroundClip, c.style.cssText = "border:0;width:8px;height:0;top:0;left:-9999px;padding:0;margin-top:1px;position:absolute", c.appendChild(a), se.extend(oe, {
                pixelPosition: function() {
                    return t(), n
                },
                boxSizingReliable: function() {
                    return null == o && t(), o
                },
                pixelMarginRight: function() {
                    return null == o && t(), s
                },
                reliableMarginLeft: function() {
                    return null == o && t(), r
                },
                reliableMarginRight: function() {
                    var t, n = a.appendChild($.createElement("div"));
                    return n.style.cssText = a.style.cssText = "-webkit-box-sizing:content-box;box-sizing:content-box;display:block;margin:0;border:0;padding:0", n.style.marginRight = n.style.width = "0", a.style.width = "1px", Xe.appendChild(c), t = !parseFloat(e.getComputedStyle(n).marginRight), Xe.removeChild(c), a.removeChild(n), t
                }
            }))
        }();
        var Ye = /^(none|table(?!-c[ea]).+)/,
            Je = {
                position: "absolute",
                visibility: "hidden",
                display: "block"
            },
            Ze = {
                letterSpacing: "0",
                fontWeight: "400"
            },
            et = ["Webkit", "O", "Moz", "ms"],
            tt = $.createElement("div").style;
        se.extend({
            cssHooks: {
                opacity: {
                    get: function(e, t) {
                        if (t) {
                            var n = S(e, "opacity");
                            return "" === n ? "1" : n
                        }
                    }
                }
            },
            cssNumber: {
                animationIterationCount: !0,
                columnCount: !0,
                fillOpacity: !0,
                flexGrow: !0,
                flexShrink: !0,
                fontWeight: !0,
                lineHeight: !0,
                opacity: !0,
                order: !0,
                orphans: !0,
                widows: !0,
                zIndex: !0,
                zoom: !0
            },
            cssProps: {
                float: "cssFloat"
            },
            style: function(e, t, n, o) {
                if (e && 3 !== e.nodeType && 8 !== e.nodeType && e.style) {
                    var s, r, c, a = se.camelCase(t),
                        i = e.style;
                    if (t = se.cssProps[a] || (se.cssProps[a] = A(a) || a), c = se.cssHooks[t] || se.cssHooks[a], void 0 === n) return c && "get" in c && void 0 !== (s = c.get(e, !1, o)) ? s : i[t];
                    r = typeof n, "string" === r && (s = Ae.exec(n)) && s[1] && (n = l(e, t, s), r = "number"), null != n && n === n && ("number" === r && (n += s && s[3] || (se.cssNumber[a] ? "" : "px")), oe.clearCloneStyle || "" !== n || 0 !== t.indexOf("background") || (i[t] = "inherit"), c && "set" in c && void 0 === (n = c.set(e, n, o)) || (i[t] = n))
                }
            },
            css: function(e, t, n, o) {
                var s, r, c, a = se.camelCase(t);
                return t = se.cssProps[a] || (se.cssProps[a] = A(a) || a), c = se.cssHooks[t] || se.cssHooks[a], c && "get" in c && (s = c.get(e, !0, n)), void 0 === s && (s = S(e, t, o)), "normal" === s && t in Ze && (s = Ze[t]), "" === n || n ? (r = parseFloat(s), !0 === n || isFinite(r) ? r || 0 : s) : s
            }
        }), se.each(["height", "width"], function(e, t) {
            se.cssHooks[t] = {
                get: function(e, n, o) {
                    if (n) return Ye.test(se.css(e, "display")) && 0 === e.offsetWidth ? $e(e, Je, function() {
                        return O(e, t, o)
                    }) : O(e, t, o)
                },
                set: function(e, n, o) {
                    var s, r = o && Ke(e),
                        c = o && L(e, t, o, "border-box" === se.css(e, "boxSizing", !1, r), r);
                    return c && (s = Ae.exec(n)) && "px" !== (s[3] || "px") && (e.style[t] = n, n = se.css(e, t)), D(e, n, c)
                }
            }
        }), se.cssHooks.marginLeft = _(oe.reliableMarginLeft, function(e, t) {
            if (t) return (parseFloat(S(e, "marginLeft")) || e.getBoundingClientRect().left - $e(e, {
                marginLeft: 0
            }, function() {
                return e.getBoundingClientRect().left
            })) + "px"
        }), se.cssHooks.marginRight = _(oe.reliableMarginRight, function(e, t) {
            if (t) return $e(e, {
                display: "inline-block"
            }, S, [e, "marginRight"])
        }), se.each({
            margin: "",
            padding: "",
            border: "Width"
        }, function(e, t) {
            se.cssHooks[e + t] = {
                expand: function(n) {
                    for (var o = 0, s = {}, r = "string" == typeof n ? n.split(" ") : [n]; o < 4; o++) s[e + De[o] + t] = r[o] || r[o - 2] || r[0];
                    return s
                }
            }, Qe.test(e) || (se.cssHooks[e + t].set = D)
        }), se.fn.extend({
            css: function(e, t) {
                return we(this, function(e, t, n) {
                    var o, s, r = {},
                        c = 0;
                    if (se.isArray(t)) {
                        for (o = Ke(e), s = t.length; c < s; c++) r[t[c]] = se.css(e, t[c], !1, o);
                        return r
                    }
                    return void 0 !== n ? se.style(e, t, n) : se.css(e, t)
                }, e, t, arguments.length > 1)
            },
            show: function() {
                return I(this, !0)
            },
            hide: function() {
                return I(this)
            },
            toggle: function(e) {
                return "boolean" == typeof e ? e ? this.show() : this.hide() : this.each(function() {
                    Le(this) ? se(this).show() : se(this).hide()
                })
            }
        }), se.Tween = q, q.prototype = {
            constructor: q,
            init: function(e, t, n, o, s, r) {
                this.elem = e, this.prop = n, this.easing = s || se.easing._default, this.options = t, this.start = this.now = this.cur(), this.end = o,
                    this.unit = r || (se.cssNumber[n] ? "" : "px")
            },
            cur: function() {
                var e = q.propHooks[this.prop];
                return e && e.get ? e.get(this) : q.propHooks._default.get(this)
            },
            run: function(e) {
                var t, n = q.propHooks[this.prop];
                return this.options.duration ? this.pos = t = se.easing[this.easing](e, this.options.duration * e, 0, 1, this.options.duration) : this.pos = t = e, this.now = (this.end - this.start) * t + this.start, this.options.step && this.options.step.call(this.elem, this.now, this), n && n.set ? n.set(this) : q.propHooks._default.set(this), this
            }
        }, q.prototype.init.prototype = q.prototype, q.propHooks = {
            _default: {
                get: function(e) {
                    var t;
                    return 1 !== e.elem.nodeType || null != e.elem[e.prop] && null == e.elem.style[e.prop] ? e.elem[e.prop] : (t = se.css(e.elem, e.prop, ""), t && "auto" !== t ? t : 0)
                },
                set: function(e) {
                    se.fx.step[e.prop] ? se.fx.step[e.prop](e) : 1 !== e.elem.nodeType || null == e.elem.style[se.cssProps[e.prop]] && !se.cssHooks[e.prop] ? e.elem[e.prop] = e.now : se.style(e.elem, e.prop, e.now + e.unit)
                }
            }
        }, q.propHooks.scrollTop = q.propHooks.scrollLeft = {
            set: function(e) {
                e.elem.nodeType && e.elem.parentNode && (e.elem[e.prop] = e.now)
            }
        }, se.easing = {
            linear: function(e) {
                return e
            },
            swing: function(e) {
                return .5 - Math.cos(e * Math.PI) / 2
            },
            _default: "swing"
        }, se.fx = q.prototype.init, se.fx.step = {};
        var nt, ot, st = /^(?:toggle|show|hide)$/,
            rt = /queueHooks$/;
        se.Animation = se.extend(P, {
                tweeners: {
                    "*": [function(e, t) {
                        var n = this.createTween(e, t);
                        return l(n.elem, e, Ae.exec(t), n), n
                    }]
                },
                tweener: function(e, t) {
                    se.isFunction(e) ? (t = e, e = ["*"]) : e = e.match(Ee);
                    for (var n, o = 0, s = e.length; o < s; o++) n = e[o], P.tweeners[n] = P.tweeners[n] || [], P.tweeners[n].unshift(t)
                },
                prefilters: [M],
                prefilter: function(e, t) {
                    t ? P.prefilters.unshift(e) : P.prefilters.push(e)
                }
            }), se.speed = function(e, t, n) {
                var o = e && "object" == typeof e ? se.extend({}, e) : {
                    complete: n || !n && t || se.isFunction(e) && e,
                    duration: e,
                    easing: n && t || t && !se.isFunction(t) && t
                };
                return o.duration = se.fx.off ? 0 : "number" == typeof o.duration ? o.duration : o.duration in se.fx.speeds ? se.fx.speeds[o.duration] : se.fx.speeds._default, null != o.queue && !0 !== o.queue || (o.queue = "fx"), o.old = o.complete, o.complete = function() {
                    se.isFunction(o.old) && o.old.call(this), o.queue && se.dequeue(this, o.queue)
                }, o
            }, se.fn.extend({
                fadeTo: function(e, t, n, o) {
                    return this.filter(Le).css("opacity", 0).show().end().animate({
                        opacity: t
                    }, e, n, o)
                },
                animate: function(e, t, n, o) {
                    var s = se.isEmptyObject(e),
                        r = se.speed(t, n, o),
                        c = function() {
                            var t = P(this, se.extend({}, e), r);
                            (s || Te.get(this, "finish")) && t.stop(!0)
                        };
                    return c.finish = c, s || !1 === r.queue ? this.each(c) : this.queue(r.queue, c)
                },
                stop: function(e, t, n) {
                    var o = function(e) {
                        var t = e.stop;
                        delete e.stop, t(n)
                    };
                    return "string" != typeof e && (n = t, t = e, e = void 0), t && !1 !== e && this.queue(e || "fx", []), this.each(function() {
                        var t = !0,
                            s = null != e && e + "queueHooks",
                            r = se.timers,
                            c = Te.get(this);
                        if (s) c[s] && c[s].stop && o(c[s]);
                        else
                            for (s in c) c[s] && c[s].stop && rt.test(s) && o(c[s]);
                        for (s = r.length; s--;) r[s].elem !== this || null != e && r[s].queue !== e || (r[s].anim.stop(n), t = !1, r.splice(s, 1));
                        !t && n || se.dequeue(this, e)
                    })
                },
                finish: function(e) {
                    return !1 !== e && (e = e || "fx"), this.each(function() {
                        var t, n = Te.get(this),
                            o = n[e + "queue"],
                            s = n[e + "queueHooks"],
                            r = se.timers,
                            c = o ? o.length : 0;
                        for (n.finish = !0, se.queue(this, e, []), s && s.stop && s.stop.call(this, !0), t = r.length; t--;) r[t].elem === this && r[t].queue === e && (r[t].anim.stop(!0), r.splice(t, 1));
                        for (t = 0; t < c; t++) o[t] && o[t].finish && o[t].finish.call(this);
                        delete n.finish
                    })
                }
            }), se.each(["toggle", "show", "hide"], function(e, t) {
                var n = se.fn[t];
                se.fn[t] = function(e, o, s) {
                    return null == e || "boolean" == typeof e ? n.apply(this, arguments) : this.animate(N(t, !0), e, o, s)
                }
            }), se.each({
                slideDown: N("show"),
                slideUp: N("hide"),
                slideToggle: N("toggle"),
                fadeIn: {
                    opacity: "show"
                },
                fadeOut: {
                    opacity: "hide"
                },
                fadeToggle: {
                    opacity: "toggle"
                }
            }, function(e, t) {
                se.fn[e] = function(e, n, o) {
                    return this.animate(t, e, n, o)
                }
            }), se.timers = [], se.fx.tick = function() {
                var e, t = 0,
                    n = se.timers;
                for (nt = se.now(); t < n.length; t++)(e = n[t])() || n[t] !== e || n.splice(t--, 1);
                n.length || se.fx.stop(), nt = void 0
            }, se.fx.timer = function(e) {
                se.timers.push(e), e() ? se.fx.start() : se.timers.pop()
            }, se.fx.interval = 13, se.fx.start = function() {
                ot || (ot = e.setInterval(se.fx.tick, se.fx.interval))
            }, se.fx.stop = function() {
                e.clearInterval(ot), ot = null
            }, se.fx.speeds = {
                slow: 600,
                fast: 200,
                _default: 400
            }, se.fn.delay = function(t, n) {
                return t = se.fx ? se.fx.speeds[t] || t : t, n = n || "fx", this.queue(n, function(n, o) {
                    var s = e.setTimeout(n, t);
                    o.stop = function() {
                        e.clearTimeout(s)
                    }
                })
            },
            function() {
                var e = $.createElement("input"),
                    t = $.createElement("select"),
                    n = t.appendChild($.createElement("option"));
                e.type = "checkbox", oe.checkOn = "" !== e.value, oe.optSelected = n.selected, t.disabled = !0, oe.optDisabled = !n.disabled, e = $.createElement("input"), e.value = "t", e.type = "radio", oe.radioValue = "t" === e.value
            }();
        var ct, at = se.expr.attrHandle;
        se.fn.extend({
            attr: function(e, t) {
                return we(this, se.attr, e, t, arguments.length > 1)
            },
            removeAttr: function(e) {
                return this.each(function() {
                    se.removeAttr(this, e)
                })
            }
        }), se.extend({
            attr: function(e, t, n) {
                var o, s, r = e.nodeType;
                if (3 !== r && 8 !== r && 2 !== r) return void 0 === e.getAttribute ? se.prop(e, t, n) : (1 === r && se.isXMLDoc(e) || (t = t.toLowerCase(), s = se.attrHooks[t] || (se.expr.match.bool.test(t) ? ct : void 0)), void 0 !== n ? null === n ? void se.removeAttr(e, t) : s && "set" in s && void 0 !== (o = s.set(e, n, t)) ? o : (e.setAttribute(t, n + ""), n) : s && "get" in s && null !== (o = s.get(e, t)) ? o : (o = se.find.attr(e, t), null == o ? void 0 : o))
            },
            attrHooks: {
                type: {
                    set: function(e, t) {
                        if (!oe.radioValue && "radio" === t && se.nodeName(e, "input")) {
                            var n = e.value;
                            return e.setAttribute("type", t), n && (e.value = n), t
                        }
                    }
                }
            },
            removeAttr: function(e, t) {
                var n, o, s = 0,
                    r = t && t.match(Ee);
                if (r && 1 === e.nodeType)
                    for (; n = r[s++];) o = se.propFix[n] || n, se.expr.match.bool.test(n) && (e[o] = !1), e.removeAttribute(n)
            }
        }), ct = {
            set: function(e, t, n) {
                return !1 === t ? se.removeAttr(e, n) : e.setAttribute(n, n), n
            }
        }, se.each(se.expr.match.bool.source.match(/\w+/g), function(e, t) {
            var n = at[t] || se.find.attr;
            at[t] = function(e, t, o) {
                var s, r;
                return o || (r = at[t], at[t] = s, s = null != n(e, t, o) ? t.toLowerCase() : null, at[t] = r), s
            }
        });
        var it = /^(?:input|select|textarea|button)$/i,
            lt = /^(?:a|area)$/i;
        se.fn.extend({
            prop: function(e, t) {
                return we(this, se.prop, e, t, arguments.length > 1)
            },
            removeProp: function(e) {
                return this.each(function() {
                    delete this[se.propFix[e] || e]
                })
            }
        }), se.extend({
            prop: function(e, t, n) {
                var o, s, r = e.nodeType;
                if (3 !== r && 8 !== r && 2 !== r) return 1 === r && se.isXMLDoc(e) || (t = se.propFix[t] || t, s = se.propHooks[t]), void 0 !== n ? s && "set" in s && void 0 !== (o = s.set(e, n, t)) ? o : e[t] = n : s && "get" in s && null !== (o = s.get(e, t)) ? o : e[t]
            },
            propHooks: {
                tabIndex: {
                    get: function(e) {
                        var t = se.find.attr(e, "tabindex");
                        return t ? parseInt(t, 10) : it.test(e.nodeName) || lt.test(e.nodeName) && e.href ? 0 : -1
                    }
                }
            },
            propFix: {
                for: "htmlFor",
                class: "className"
            }
        }), oe.optSelected || (se.propHooks.selected = {
            get: function(e) {
                var t = e.parentNode;
                return t && t.parentNode && t.parentNode.selectedIndex, null
            },
            set: function(e) {
                var t = e.parentNode;
                t && (t.selectedIndex, t.parentNode && t.parentNode.selectedIndex)
            }
        }), se.each(["tabIndex", "readOnly", "maxLength", "cellSpacing", "cellPadding", "rowSpan", "colSpan", "useMap", "frameBorder", "contentEditable"], function() {
            se.propFix[this.toLowerCase()] = this
        });
        var ut = /[\t\r\n\f]/g;
        se.fn.extend({
            addClass: function(e) {
                var t, n, o, s, r, c, a, i = 0;
                if (se.isFunction(e)) return this.each(function(t) {
                    se(this).addClass(e.call(this, t, U(this)))
                });
                if ("string" == typeof e && e)
                    for (t = e.match(Ee) || []; n = this[i++];)
                        if (s = U(n), o = 1 === n.nodeType && (" " + s + " ").replace(ut, " ")) {
                            for (c = 0; r = t[c++];) o.indexOf(" " + r + " ") < 0 && (o += r + " ");
                            a = se.trim(o), s !== a && n.setAttribute("class", a)
                        } return this
            },
            removeClass: function(e) {
                var t, n, o, s, r, c, a, i = 0;
                if (se.isFunction(e)) return this.each(function(t) {
                    se(this).removeClass(e.call(this, t, U(this)))
                });
                if (!arguments.length) return this.attr("class", "");
                if ("string" == typeof e && e)
                    for (t = e.match(Ee) || []; n = this[i++];)
                        if (s = U(n), o = 1 === n.nodeType && (" " + s + " ").replace(ut, " ")) {
                            for (c = 0; r = t[c++];)
                                for (; o.indexOf(" " + r + " ") > -1;) o = o.replace(" " + r + " ", " ");
                            a = se.trim(o), s !== a && n.setAttribute("class", a)
                        } return this
            },
            toggleClass: function(e, t) {
                var n = typeof e;
                return "boolean" == typeof t && "string" === n ? t ? this.addClass(e) : this.removeClass(e) : se.isFunction(e) ? this.each(function(n) {
                    se(this).toggleClass(e.call(this, n, U(this), t), t)
                }) : this.each(function() {
                    var t, o, s, r;
                    if ("string" === n)
                        for (o = 0, s = se(this), r = e.match(Ee) || []; t = r[o++];) s.hasClass(t) ? s.removeClass(t) : s.addClass(t);
                    else void 0 !== e && "boolean" !== n || (t = U(this), t && Te.set(this, "__className__", t), this.setAttribute && this.setAttribute("class", t || !1 === e ? "" : Te.get(this, "__className__") || ""))
                })
            },
            hasClass: function(e) {
                var t, n, o = 0;
                for (t = " " + e + " "; n = this[o++];)
                    if (1 === n.nodeType && (" " + U(n) + " ").replace(ut, " ").indexOf(t) > -1) return !0;
                return !1
            }
        });
        var dt = /\r/g,
            pt = /[\x20\t\r\n\f]+/g;
        se.fn.extend({
            val: function(e) {
                var t, n, o, s = this[0]; {
                    if (arguments.length) return o = se.isFunction(e), this.each(function(n) {
                        var s;
                        1 === this.nodeType && (s = o ? e.call(this, n, se(this).val()) : e, null == s ? s = "" : "number" == typeof s ? s += "" : se.isArray(s) && (s = se.map(s, function(e) {
                            return null == e ? "" : e + ""
                        })), (t = se.valHooks[this.type] || se.valHooks[this.nodeName.toLowerCase()]) && "set" in t && void 0 !== t.set(this, s, "value") || (this.value = s))
                    });
                    if (s) return (t = se.valHooks[s.type] || se.valHooks[s.nodeName.toLowerCase()]) && "get" in t && void 0 !== (n = t.get(s, "value")) ? n : (n = s.value, "string" == typeof n ? n.replace(dt, "") : null == n ? "" : n)
                }
            }
        }), se.extend({
            valHooks: {
                option: {
                    get: function(e) {
                        var t = se.find.attr(e, "value");
                        return null != t ? t : se.trim(se.text(e)).replace(pt, " ")
                    }
                },
                select: {
                    get: function(e) {
                        for (var t, n, o = e.options, s = e.selectedIndex, r = "select-one" === e.type || s < 0, c = r ? null : [], a = r ? s + 1 : o.length, i = s < 0 ? a : r ? s : 0; i < a; i++)
                            if (n = o[i], (n.selected || i === s) && (oe.optDisabled ? !n.disabled : null === n.getAttribute("disabled")) && (!n.parentNode.disabled || !se.nodeName(n.parentNode, "optgroup"))) {
                                if (t = se(n).val(), r) return t;
                                c.push(t)
                            } return c
                    },
                    set: function(e, t) {
                        for (var n, o, s = e.options, r = se.makeArray(t), c = s.length; c--;) o = s[c], (o.selected = se.inArray(se.valHooks.option.get(o), r) > -1) && (n = !0);
                        return n || (e.selectedIndex = -1), r
                    }
                }
            }
        }), se.each(["radio", "checkbox"], function() {
            se.valHooks[this] = {
                set: function(e, t) {
                    if (se.isArray(t)) return e.checked = se.inArray(se(e).val(), t) > -1
                }
            }, oe.checkOn || (se.valHooks[this].get = function(e) {
                return null === e.getAttribute("value") ? "on" : e.value
            })
        });
        var mt = /^(?:focusinfocus|focusoutblur)$/;
        se.extend(se.event, {
            trigger: function(t, n, o, s) {
                var r, c, a, i, l, u, d, p = [o || $],
                    m = ne.call(t, "type") ? t.type : t,
                    f = ne.call(t, "namespace") ? t.namespace.split(".") : [];
                if (c = a = o = o || $, 3 !== o.nodeType && 8 !== o.nodeType && !mt.test(m + se.event.triggered) && (m.indexOf(".") > -1 && (f = m.split("."), m = f.shift(), f.sort()), l = m.indexOf(":") < 0 && "on" + m, t = t[se.expando] ? t : new se.Event(m, "object" == typeof t && t), t.isTrigger = s ? 2 : 3, t.namespace = f.join("."), t.rnamespace = t.namespace ? new RegExp("(^|\\.)" + f.join("\\.(?:.*\\.|)") + "(\\.|$)") : null, t.result = void 0, t.target || (t.target = o), n = null == n ? [t] : se.makeArray(n, [t]), d = se.event.special[m] || {}, s || !d.trigger || !1 !== d.trigger.apply(o, n))) {
                    if (!s && !d.noBubble && !se.isWindow(o)) {
                        for (i = d.delegateType || m, mt.test(i + m) || (c = c.parentNode); c; c = c.parentNode) p.push(c), a = c;
                        a === (o.ownerDocument || $) && p.push(a.defaultView || a.parentWindow || e)
                    }
                    for (r = 0;
                        (c = p[r++]) && !t.isPropagationStopped();) t.type = r > 1 ? i : d.bindType || m, u = (Te.get(c, "events") || {})[t.type] && Te.get(c, "handle"), u && u.apply(c, n), (u = l && c[l]) && u.apply && ke(c) && (t.result = u.apply(c, n), !1 === t.result && t.preventDefault());
                    return t.type = m, s || t.isDefaultPrevented() || d._default && !1 !== d._default.apply(p.pop(), n) || !ke(o) || l && se.isFunction(o[m]) && !se.isWindow(o) && (a = o[l], a && (o[l] = null), se.event.triggered = m, o[m](), se.event.triggered = void 0, a && (o[l] = a)), t.result
                }
            },
            simulate: function(e, t, n) {
                var o = se.extend(new se.Event, n, {
                    type: e,
                    isSimulated: !0
                });
                se.event.trigger(o, null, t)
            }
        }), se.fn.extend({
            trigger: function(e, t) {
                return this.each(function() {
                    se.event.trigger(e, t, this)
                })
            },
            triggerHandler: function(e, t) {
                var n = this[0];
                if (n) return se.event.trigger(e, t, n, !0)
            }
        }), se.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "), function(e, t) {
            se.fn[t] = function(e, n) {
                return arguments.length > 0 ? this.on(t, null, e, n) : this.trigger(t)
            }
        }), se.fn.extend({
            hover: function(e, t) {
                return this.mouseenter(e).mouseleave(t || e)
            }
        }), oe.focusin = "onfocusin" in e, oe.focusin || se.each({
            focus: "focusin",
            blur: "focusout"
        }, function(e, t) {
            var n = function(e) {
                se.event.simulate(t, e.target, se.event.fix(e))
            };
            se.event.special[t] = {
                setup: function() {
                    var o = this.ownerDocument || this,
                        s = Te.access(o, t);
                    s || o.addEventListener(e, n, !0), Te.access(o, t, (s || 0) + 1)
                },
                teardown: function() {
                    var o = this.ownerDocument || this,
                        s = Te.access(o, t) - 1;
                    s ? Te.access(o, t, s) : (o.removeEventListener(e, n, !0), Te.remove(o, t))
                }
            }
        });
        var ft = e.location,
            ht = se.now(),
            gt = /\?/;
        se.parseJSON = function(e) {
            return JSON.parse(e + "")
        }, se.parseXML = function(t) {
            var n;
            if (!t || "string" != typeof t) return null;
            try {
                n = (new e.DOMParser).parseFromString(t, "text/xml")
            } catch (e) {
                n = void 0
            }
            return n && !n.getElementsByTagName("parsererror").length || se.error("Invalid XML: " + t), n
        };
        var yt = /#.*$/,
            vt = /([?&])_=[^&]*/,
            Et = /^(.*?):[ \t]*([^\r\n]*)$/gm,
            bt = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
            wt = /^(?:GET|HEAD)$/,
            kt = /^\/\//,
            Tt = {},
            Ct = {},
            xt = "*/".concat("*"),
            St = $.createElement("a");
        St.href = ft.href, se.extend({
            active: 0,
            lastModified: {},
            etag: {},
            ajaxSettings: {
                url: ft.href,
                type: "GET",
                isLocal: bt.test(ft.protocol),
                global: !0,
                processData: !0,
                async: !0,
                contentType: "application/x-www-form-urlencoded; charset=UTF-8",
                accepts: {
                    "*": xt,
                    text: "text/plain",
                    html: "text/html",
                    xml: "application/xml, text/xml",
                    json: "application/json, text/javascript"
                },
                contents: {
                    xml: /\bxml\b/,
                    html: /\bhtml/,
                    json: /\bjson\b/
                },
                responseFields: {
                    xml: "responseXML",
                    text: "responseText",
                    json: "responseJSON"
                },
                converters: {
                    "* text": String,
                    "text html": !0,
                    "text json": se.parseJSON,
                    "text xml": se.parseXML
                },
                flatOptions: {
                    url: !0,
                    context: !0
                }
            },
            ajaxSetup: function(e, t) {
                return t ? H(H(e, se.ajaxSettings), t) : H(se.ajaxSettings, e)
            },
            ajaxPrefilter: G(Tt),
            ajaxTransport: G(Ct),
            ajax: function(t, n) {
                function o(t, n, o, a) {
                    var l, d, v, E, w, T = n;
                    2 !== b && (b = 2, i && e.clearTimeout(i), s = void 0, c = a || "", k.readyState = t > 0 ? 4 : 0, l = t >= 200 && t < 300 || 304 === t, o && (E = W(p, k, o)), E = V(p, E, k, l), l ? (p.ifModified && (w = k.getResponseHeader("Last-Modified"), w && (se.lastModified[r] = w), (w = k.getResponseHeader("etag")) && (se.etag[r] = w)), 204 === t || "HEAD" === p.type ? T = "nocontent" : 304 === t ? T = "notmodified" : (T = E.state, d = E.data, v = E.error, l = !v)) : (v = T, !t && T || (T = "error", t < 0 && (t = 0))), k.status = t, k.statusText = (n || T) + "", l ? h.resolveWith(m, [d, T, k]) : h.rejectWith(m, [k, T, v]), k.statusCode(y), y = void 0, u && f.trigger(l ? "ajaxSuccess" : "ajaxError", [k, p, l ? d : v]), g.fireWith(m, [k, T]), u && (f.trigger("ajaxComplete", [k, p]), --se.active || se.event.trigger("ajaxStop")))
                }
                "object" == typeof t && (n = t, t = void 0), n = n || {};
                var s, r, c, a, i, l, u, d, p = se.ajaxSetup({}, n),
                    m = p.context || p,
                    f = p.context && (m.nodeType || m.jquery) ? se(m) : se.event,
                    h = se.Deferred(),
                    g = se.Callbacks("once memory"),
                    y = p.statusCode || {},
                    v = {},
                    E = {},
                    b = 0,
                    w = "canceled",
                    k = {
                        readyState: 0,
                        getResponseHeader: function(e) {
                            var t;
                            if (2 === b) {
                                if (!a)
                                    for (a = {}; t = Et.exec(c);) a[t[1].toLowerCase()] = t[2];
                                t = a[e.toLowerCase()]
                            }
                            return null == t ? null : t
                        },
                        getAllResponseHeaders: function() {
                            return 2 === b ? c : null
                        },
                        setRequestHeader: function(e, t) {
                            var n = e.toLowerCase();
                            return b || (e = E[n] = E[n] || e, v[e] = t), this
                        },
                        overrideMimeType: function(e) {
                            return b || (p.mimeType = e), this
                        },
                        statusCode: function(e) {
                            var t;
                            if (e)
                                if (b < 2)
                                    for (t in e) y[t] = [y[t], e[t]];
                                else k.always(e[k.status]);
                            return this
                        },
                        abort: function(e) {
                            var t = e || w;
                            return s && s.abort(t), o(0, t), this
                        }
                    };
                if (h.promise(k).complete = g.add, k.success = k.done, k.error = k.fail, p.url = ((t || p.url || ft.href) + "").replace(yt, "").replace(kt, ft.protocol + "//"), p.type = n.method || n.type || p.method || p.type, p.dataTypes = se.trim(p.dataType || "*").toLowerCase().match(Ee) || [""], null == p.crossDomain) {
                    l = $.createElement("a");
                    try {
                        l.href = p.url, l.href = l.href, p.crossDomain = St.protocol + "//" + St.host != l.protocol + "//" + l.host
                    } catch (e) {
                        p.crossDomain = !0
                    }
                }
                if (p.data && p.processData && "string" != typeof p.data && (p.data = se.param(p.data, p.traditional)), B(Tt, p, n, k), 2 === b) return k;
                u = se.event && p.global, u && 0 == se.active++ && se.event.trigger("ajaxStart"), p.type = p.type.toUpperCase(), p.hasContent = !wt.test(p.type), r = p.url, p.hasContent || (p.data && (r = p.url += (gt.test(r) ? "&" : "?") + p.data, delete p.data), !1 === p.cache && (p.url = vt.test(r) ? r.replace(vt, "$1_=" + ht++) : r + (gt.test(r) ? "&" : "?") + "_=" + ht++)), p.ifModified && (se.lastModified[r] && k.setRequestHeader("If-Modified-Since", se.lastModified[r]), se.etag[r] && k.setRequestHeader("If-None-Match", se.etag[r])), (p.data && p.hasContent && !1 !== p.contentType || n.contentType) && k.setRequestHeader("Content-Type", p.contentType), k.setRequestHeader("Accept", p.dataTypes[0] && p.accepts[p.dataTypes[0]] ? p.accepts[p.dataTypes[0]] + ("*" !== p.dataTypes[0] ? ", " + xt + "; q=0.01" : "") : p.accepts["*"]);
                for (d in p.headers) k.setRequestHeader(d, p.headers[d]);
                if (p.beforeSend && (!1 === p.beforeSend.call(m, k, p) || 2 === b)) return k.abort();
                w = "abort";
                for (d in {
                        success: 1,
                        error: 1,
                        complete: 1
                    }) k[d](p[d]);
                if (s = B(Ct, p, n, k)) {
                    if (k.readyState = 1, u && f.trigger("ajaxSend", [k, p]), 2 === b) return k;
                    p.async && p.timeout > 0 && (i = e.setTimeout(function() {
                        k.abort("timeout")
                    }, p.timeout));
                    try {
                        b = 1, s.send(v, o)
                    } catch (e) {
                        if (!(b < 2)) throw e;
                        o(-1, e)
                    }
                } else o(-1, "No Transport");
                return k
            },
            getJSON: function(e, t, n) {
                return se.get(e, t, n, "json")
            },
            getScript: function(e, t) {
                return se.get(e, void 0, t, "script")
            }
        }), se.each(["get", "post"], function(e, t) {
            se[t] = function(e, n, o, s) {
                return se.isFunction(n) && (s = s || o, o = n, n = void 0), se.ajax(se.extend({
                    url: e,
                    type: t,
                    dataType: s,
                    data: n,
                    success: o
                }, se.isPlainObject(e) && e))
            }
        }), se._evalUrl = function(e) {
            return se.ajax({
                url: e,
                type: "GET",
                dataType: "script",
                async: !1,
                global: !1,
                throws: !0
            })
        }, se.fn.extend({
            wrapAll: function(e) {
                var t;
                return se.isFunction(e) ? this.each(function(t) {
                    se(this).wrapAll(e.call(this, t))
                }) : (this[0] && (t = se(e, this[0].ownerDocument).eq(0).clone(!0), this[0].parentNode && t.insertBefore(this[0]), t.map(function() {
                    for (var e = this; e.firstElementChild;) e = e.firstElementChild;
                    return e
                }).append(this)), this)
            },
            wrapInner: function(e) {
                return se.isFunction(e) ? this.each(function(t) {
                    se(this).wrapInner(e.call(this, t))
                }) : this.each(function() {
                    var t = se(this),
                        n = t.contents();
                    n.length ? n.wrapAll(e) : t.append(e)
                })
            },
            wrap: function(e) {
                var t = se.isFunction(e);
                return this.each(function(n) {
                    se(this).wrapAll(t ? e.call(this, n) : e)
                })
            },
            unwrap: function() {
                return this.parent().each(function() {
                    se.nodeName(this, "body") || se(this).replaceWith(this.childNodes)
                }).end()
            }
        }), se.expr.filters.hidden = function(e) {
            return !se.expr.filters.visible(e)
        }, se.expr.filters.visible = function(e) {
            return e.offsetWidth > 0 || e.offsetHeight > 0 || e.getClientRects().length > 0
        };
        var _t = /%20/g,
            At = /\[\]$/,
            Dt = /\r?\n/g,
            Lt = /^(?:submit|button|image|reset|file)$/i,
            Ot = /^(?:input|select|textarea|keygen)/i;
        se.param = function(e, t) {
            var n, o = [],
                s = function(e, t) {
                    t = se.isFunction(t) ? t() : null == t ? "" : t, o[o.length] = encodeURIComponent(e) + "=" + encodeURIComponent(t)
                };
            if (void 0 === t && (t = se.ajaxSettings && se.ajaxSettings.traditional), se.isArray(e) || e.jquery && !se.isPlainObject(e)) se.each(e, function() {
                s(this.name, this.value)
            });
            else
                for (n in e) Q(n, e[n], t, s);
            return o.join("&").replace(_t, "+")
        }, se.fn.extend({
            serialize: function() {
                return se.param(this.serializeArray())
            },
            serializeArray: function() {
                return this.map(function() {
                    var e = se.prop(this, "elements");
                    return e ? se.makeArray(e) : this
                }).filter(function() {
                    var e = this.type;
                    return this.name && !se(this).is(":disabled") && Ot.test(this.nodeName) && !Lt.test(e) && (this.checked || !Oe.test(e))
                }).map(function(e, t) {
                    var n = se(this).val();
                    return null == n ? null : se.isArray(n) ? se.map(n, function(e) {
                        return {
                            name: t.name,
                            value: e.replace(Dt, "\r\n")
                        }
                    }) : {
                        name: t.name,
                        value: n.replace(Dt, "\r\n")
                    }
                }).get()
            }
        }), se.ajaxSettings.xhr = function() {
            try {
                return new e.XMLHttpRequest
            } catch (e) {}
        };
        var It = {
                0: 200,
                1223: 204
            },
            qt = se.ajaxSettings.xhr();
        oe.cors = !!qt && "withCredentials" in qt, oe.ajax = qt = !!qt, se.ajaxTransport(function(t) {
            var n, o;
            if (oe.cors || qt && !t.crossDomain) return {
                send: function(s, r) {
                    var c, a = t.xhr();
                    if (a.open(t.type, t.url, t.async, t.username, t.password), t.xhrFields)
                        for (c in t.xhrFields) a[c] = t.xhrFields[c];
                    t.mimeType && a.overrideMimeType && a.overrideMimeType(t.mimeType), t.crossDomain || s["X-Requested-With"] || (s["X-Requested-With"] = "XMLHttpRequest");
                    for (c in s) a.setRequestHeader(c, s[c]);
                    n = function(e) {
                        return function() {
                            n && (n = o = a.onload = a.onerror = a.onabort = a.onreadystatechange = null, "abort" === e ? a.abort() : "error" === e ? "number" != typeof a.status ? r(0, "error") : r(a.status, a.statusText) : r(It[a.status] || a.status, a.statusText, "text" !== (a.responseType || "text") || "string" != typeof a.responseText ? {
                                binary: a.response
                            } : {
                                text: a.responseText
                            }, a.getAllResponseHeaders()))
                        }
                    }, a.onload = n(), o = a.onerror = n("error"), void 0 !== a.onabort ? a.onabort = o : a.onreadystatechange = function() {
                        4 === a.readyState && e.setTimeout(function() {
                            n && o()
                        })
                    }, n = n("abort");
                    try {
                        a.send(t.hasContent && t.data || null)
                    } catch (e) {
                        if (n) throw e
                    }
                },
                abort: function() {
                    n && n()
                }
            }
        }), se.ajaxSetup({
            accepts: {
                script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
            },
            contents: {
                script: /\b(?:java|ecma)script\b/
            },
            converters: {
                "text script": function(e) {
                    return se.globalEval(e), e
                }
            }
        }), se.ajaxPrefilter("script", function(e) {
            void 0 === e.cache && (e.cache = !1), e.crossDomain && (e.type = "GET")
        }), se.ajaxTransport("script", function(e) {
            if (e.crossDomain) {
                var t, n;
                return {
                    send: function(o, s) {
                        t = se("<script>").prop({
                            charset: e.scriptCharset,
                            src: e.url
                        }).on("load error", n = function(e) {
                            t.remove(), n = null, e && s("error" === e.type ? 404 : 200, e.type)
                        }), $.head.appendChild(t[0])
                    },
                    abort: function() {
                        n && n()
                    }
                }
            }
        });
        var Ft = [],
            Nt = /(=)\?(?=&|$)|\?\?/;
        se.ajaxSetup({
            jsonp: "callback",
            jsonpCallback: function() {
                var e = Ft.pop() || se.expando + "_" + ht++;
                return this[e] = !0, e
            }
        }), se.ajaxPrefilter("json jsonp", function(t, n, o) {
            var s, r, c, a = !1 !== t.jsonp && (Nt.test(t.url) ? "url" : "string" == typeof t.data && 0 === (t.contentType || "").indexOf("application/x-www-form-urlencoded") && Nt.test(t.data) && "data");
            if (a || "jsonp" === t.dataTypes[0]) return s = t.jsonpCallback = se.isFunction(t.jsonpCallback) ? t.jsonpCallback() : t.jsonpCallback, a ? t[a] = t[a].replace(Nt, "$1" + s) : !1 !== t.jsonp && (t.url += (gt.test(t.url) ? "&" : "?") + t.jsonp + "=" + s), t.converters["script json"] = function() {
                return c || se.error(s + " was not called"), c[0]
            }, t.dataTypes[0] = "json", r = e[s], e[s] = function() {
                c = arguments
            }, o.always(function() {
                void 0 === r ? se(e).removeProp(s) : e[s] = r, t[s] && (t.jsonpCallback = n.jsonpCallback, Ft.push(s)), c && se.isFunction(r) && r(c[0]), c = r = void 0
            }), "script"
        }), se.parseHTML = function(e, t, n) {
            if (!e || "string" != typeof e) return null;
            "boolean" == typeof t && (n = t, t = !1), t = t || $;
            var o = me.exec(e),
                s = !n && [];
            return o ? [t.createElement(o[1])] : (o = p([e], t, s), s && s.length && se(s).remove(), se.merge([], o.childNodes))
        };
        var Rt = se.fn.load;
        se.fn.load = function(e, t, n) {
            if ("string" != typeof e && Rt) return Rt.apply(this, arguments);
            var o, s, r, c = this,
                a = e.indexOf(" ");
            return a > -1 && (o = se.trim(e.slice(a)), e = e.slice(0, a)), se.isFunction(t) ? (n = t, t = void 0) : t && "object" == typeof t && (s = "POST"), c.length > 0 && se.ajax({
                url: e,
                type: s || "GET",
                dataType: "html",
                data: t
            }).done(function(e) {
                r = arguments, c.html(o ? se("<div>").append(se.parseHTML(e)).find(o) : e)
            }).always(n && function(e, t) {
                c.each(function() {
                    n.apply(this, r || [e.responseText, t, e])
                })
            }), this
        }, se.each(["ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend"], function(e, t) {
            se.fn[t] = function(e) {
                return this.on(t, e)
            }
        }), se.expr.filters.animated = function(e) {
            return se.grep(se.timers, function(t) {
                return e === t.elem
            }).length
        }, se.offset = {
            setOffset: function(e, t, n) {
                var o, s, r, c, a, i, l, u = se.css(e, "position"),
                    d = se(e),
                    p = {};
                "static" === u && (e.style.position = "relative"), a = d.offset(), r = se.css(e, "top"), i = se.css(e, "left"), l = ("absolute" === u || "fixed" === u) && (r + i).indexOf("auto") > -1, l ? (o = d.position(), c = o.top, s = o.left) : (c = parseFloat(r) || 0, s = parseFloat(i) || 0), se.isFunction(t) && (t = t.call(e, n, se.extend({}, a))), null != t.top && (p.top = t.top - a.top + c), null != t.left && (p.left = t.left - a.left + s), "using" in t ? t.using.call(e, p) : d.css(p)
            }
        }, se.fn.extend({
            offset: function(e) {
                if (arguments.length) return void 0 === e ? this : this.each(function(t) {
                    se.offset.setOffset(this, e, t)
                });
                var t, n, o = this[0],
                    s = {
                        top: 0,
                        left: 0
                    },
                    r = o && o.ownerDocument;
                if (r) return t = r.documentElement, se.contains(t, o) ? (s = o.getBoundingClientRect(), n = z(r), {
                    top: s.top + n.pageYOffset - t.clientTop,
                    left: s.left + n.pageXOffset - t.clientLeft
                }) : s
            },
            position: function() {
                if (this[0]) {
                    var e, t, n = this[0],
                        o = {
                            top: 0,
                            left: 0
                        };
                    return "fixed" === se.css(n, "position") ? t = n.getBoundingClientRect() : (e = this.offsetParent(), t = this.offset(), se.nodeName(e[0], "html") || (o = e.offset()), o.top += se.css(e[0], "borderTopWidth", !0), o.left += se.css(e[0], "borderLeftWidth", !0)), {
                        top: t.top - o.top - se.css(n, "marginTop", !0),
                        left: t.left - o.left - se.css(n, "marginLeft", !0)
                    }
                }
            },
            offsetParent: function() {
                return this.map(function() {
                    for (var e = this.offsetParent; e && "static" === se.css(e, "position");) e = e.offsetParent;
                    return e || Xe
                })
            }
        }), se.each({
            scrollLeft: "pageXOffset",
            scrollTop: "pageYOffset"
        }, function(e, t) {
            var n = "pageYOffset" === t;
            se.fn[e] = function(o) {
                return we(this, function(e, o, s) {
                    var r = z(e);
                    if (void 0 === s) return r ? r[t] : e[o];
                    r ? r.scrollTo(n ? r.pageXOffset : s, n ? s : r.pageYOffset) : e[o] = s
                }, e, o, arguments.length)
            }
        }), se.each(["top", "left"], function(e, t) {
            se.cssHooks[t] = _(oe.pixelPosition, function(e, n) {
                if (n) return n = S(e, t), ze.test(n) ? se(e).position()[t] + "px" : n
            })
        }), se.each({
            Height: "height",
            Width: "width"
        }, function(e, t) {
            se.each({
                padding: "inner" + e,
                content: t,
                "": "outer" + e
            }, function(n, o) {
                se.fn[o] = function(o, s) {
                    var r = arguments.length && (n || "boolean" != typeof o),
                        c = n || (!0 === o || !0 === s ? "margin" : "border");
                    return we(this, function(t, n, o) {
                        var s;
                        return se.isWindow(t) ? t.document.documentElement["client" + e] : 9 === t.nodeType ? (s = t.documentElement, Math.max(t.body["scroll" + e], s["scroll" + e], t.body["offset" + e], s["offset" + e], s["client" + e])) : void 0 === o ? se.css(t, n, c) : se.style(t, n, o, c)
                    }, t, r ? o : void 0, r, null)
                }
            })
        }), se.fn.extend({
            bind: function(e, t, n) {
                return this.on(e, null, t, n)
            },
            unbind: function(e, t) {
                return this.off(e, null, t)
            },
            delegate: function(e, t, n, o) {
                return this.on(t, e, n, o)
            },
            undelegate: function(e, t, n) {
                return 1 === arguments.length ? this.off(e, "**") : this.off(t, e || "**", n)
            },
            size: function() {
                return this.length
            }
        }), se.fn.andSelf = se.fn.addBack, "function" == typeof define && define.amd && define("jquery", [], function() {
            return se
        });
        var Mt = e.jQuery,
            jt = e.$;
        return se.noConflict = function(t) {
            return e.$ === se && (e.$ = jt), t && e.jQuery === se && (e.jQuery = Mt), se
        }, t || (e.jQuery = e.$ = se), se
    }),
    function() {
        function e(e) {
            function t(t, n, o, s, r, c) {
                for (; r >= 0 && r < c; r += e) {
                    var a = s ? s[r] : r;
                    o = n(o, t[a], a, t)
                }
                return o
            }
            return function(n, o, s, r) {
                o = E(o, r, 4);
                var c = !S(n) && v.keys(n),
                    a = (c || n).length,
                    i = e > 0 ? 0 : a - 1;
                return arguments.length < 3 && (s = n[c ? c[i] : i], i += e), t(n, o, s, c, i, a)
            }
        }

        function t(e) {
            return function(t, n, o) {
                n = b(n, o);
                for (var s = x(t), r = e > 0 ? 0 : s - 1; r >= 0 && r < s; r += e)
                    if (n(t[r], r, t)) return r;
                return -1
            }
        }

        function n(e, t, n) {
            return function(o, s, r) {
                var c = 0,
                    a = x(o);
                if ("number" == typeof r) e > 0 ? c = r >= 0 ? r : Math.max(r + a, c) : a = r >= 0 ? Math.min(r + 1, a) : r + a + 1;
                else if (n && r && a) return r = n(o, s), o[r] === s ? r : -1;
                if (s !== s) return r = t(u.call(o, c, a), v.isNaN), r >= 0 ? r + c : -1;
                for (r = e > 0 ? c : a - 1; r >= 0 && r < a; r += e)
                    if (o[r] === s) return r;
                return -1
            }
        }

        function o(e, t) {
            var n = O.length,
                o = e.constructor,
                s = v.isFunction(o) && o.prototype || a,
                r = "constructor";
            for (v.has(e, r) && !v.contains(t, r) && t.push(r); n--;)(r = O[n]) in e && e[r] !== s[r] && !v.contains(t, r) && t.push(r)
        }
        var s = this,
            r = s._,
            c = Array.prototype,
            a = Object.prototype,
            i = Function.prototype,
            l = c.push,
            u = c.slice,
            d = a.toString,
            p = a.hasOwnProperty,
            m = Array.isArray,
            f = Object.keys,
            h = i.bind,
            g = Object.create,
            y = function() {},
            v = function(e) {
                return e instanceof v ? e : this instanceof v ? void(this._wrapped = e) : new v(e)
            };
        "undefined" != typeof exports ? ("undefined" != typeof module && module.exports && (exports = module.exports = v), exports._ = v) : s._ = v, v.VERSION = "1.8.3";
        var E = function(e, t, n) {
                if (void 0 === t) return e;
                switch (null == n ? 3 : n) {
                    case 1:
                        return function(n) {
                            return e.call(t, n)
                        };
                    case 2:
                        return function(n, o) {
                            return e.call(t, n, o)
                        };
                    case 3:
                        return function(n, o, s) {
                            return e.call(t, n, o, s)
                        };
                    case 4:
                        return function(n, o, s, r) {
                            return e.call(t, n, o, s, r)
                        }
                }
                return function() {
                    return e.apply(t, arguments)
                }
            },
            b = function(e, t, n) {
                return null == e ? v.identity : v.isFunction(e) ? E(e, t, n) : v.isObject(e) ? v.matcher(e) : v.property(e)
            };
        v.iteratee = function(e, t) {
            return b(e, t, 1 / 0)
        };
        var w = function(e, t) {
                return function(n) {
                    var o = arguments.length;
                    if (o < 2 || null == n) return n;
                    for (var s = 1; s < o; s++)
                        for (var r = arguments[s], c = e(r), a = c.length, i = 0; i < a; i++) {
                            var l = c[i];
                            t && void 0 !== n[l] || (n[l] = r[l])
                        }
                    return n
                }
            },
            k = function(e) {
                if (!v.isObject(e)) return {};
                if (g) return g(e);
                y.prototype = e;
                var t = new y;
                return y.prototype = null, t
            },
            T = function(e) {
                return function(t) {
                    return null == t ? void 0 : t[e]
                }
            },
            C = Math.pow(2, 53) - 1,
            x = T("length"),
            S = function(e) {
                var t = x(e);
                return "number" == typeof t && t >= 0 && t <= C
            };
        v.each = v.forEach = function(e, t, n) {
            t = E(t, n);
            var o, s;
            if (S(e))
                for (o = 0, s = e.length; o < s; o++) t(e[o], o, e);
            else {
                var r = v.keys(e);
                for (o = 0, s = r.length; o < s; o++) t(e[r[o]], r[o], e)
            }
            return e
        }, v.map = v.collect = function(e, t, n) {
            t = b(t, n);
            for (var o = !S(e) && v.keys(e), s = (o || e).length, r = Array(s), c = 0; c < s; c++) {
                var a = o ? o[c] : c;
                r[c] = t(e[a], a, e)
            }
            return r
        }, v.reduce = v.foldl = v.inject = e(1), v.reduceRight = v.foldr = e(-1), v.find = v.detect = function(e, t, n) {
            var o;
            if (void 0 !== (o = S(e) ? v.findIndex(e, t, n) : v.findKey(e, t, n)) && -1 !== o) return e[o]
        }, v.filter = v.select = function(e, t, n) {
            var o = [];
            return t = b(t, n), v.each(e, function(e, n, s) {
                t(e, n, s) && o.push(e)
            }), o
        }, v.reject = function(e, t, n) {
            return v.filter(e, v.negate(b(t)), n)
        }, v.every = v.all = function(e, t, n) {
            t = b(t, n);
            for (var o = !S(e) && v.keys(e), s = (o || e).length, r = 0; r < s; r++) {
                var c = o ? o[r] : r;
                if (!t(e[c], c, e)) return !1
            }
            return !0
        }, v.some = v.any = function(e, t, n) {
            t = b(t, n);
            for (var o = !S(e) && v.keys(e), s = (o || e).length, r = 0; r < s; r++) {
                var c = o ? o[r] : r;
                if (t(e[c], c, e)) return !0
            }
            return !1
        }, v.contains = v.includes = v.include = function(e, t, n, o) {
            return S(e) || (e = v.values(e)), ("number" != typeof n || o) && (n = 0), v.indexOf(e, t, n) >= 0
        }, v.invoke = function(e, t) {
            var n = u.call(arguments, 2),
                o = v.isFunction(t);
            return v.map(e, function(e) {
                var s = o ? t : e[t];
                return null == s ? s : s.apply(e, n)
            })
        }, v.pluck = function(e, t) {
            return v.map(e, v.property(t))
        }, v.where = function(e, t) {
            return v.filter(e, v.matcher(t))
        }, v.findWhere = function(e, t) {
            return v.find(e, v.matcher(t))
        }, v.max = function(e, t, n) {
            var o, s, r = -1 / 0,
                c = -1 / 0;
            if (null == t && null != e) {
                e = S(e) ? e : v.values(e);
                for (var a = 0, i = e.length; a < i; a++)(o = e[a]) > r && (r = o)
            } else t = b(t, n), v.each(e, function(e, n, o) {
                ((s = t(e, n, o)) > c || s === -1 / 0 && r === -1 / 0) && (r = e, c = s)
            });
            return r
        }, v.min = function(e, t, n) {
            var o, s, r = 1 / 0,
                c = 1 / 0;
            if (null == t && null != e) {
                e = S(e) ? e : v.values(e);
                for (var a = 0, i = e.length; a < i; a++)(o = e[a]) < r && (r = o)
            } else t = b(t, n), v.each(e, function(e, n, o) {
                ((s = t(e, n, o)) < c || s === 1 / 0 && r === 1 / 0) && (r = e, c = s)
            });
            return r
        }, v.shuffle = function(e) {
            for (var t, n = S(e) ? e : v.values(e), o = n.length, s = Array(o), r = 0; r < o; r++) t = v.random(0, r), t !== r && (s[r] = s[t]), s[t] = n[r];
            return s
        }, v.sample = function(e, t, n) {
            return null == t || n ? (S(e) || (e = v.values(e)), e[v.random(e.length - 1)]) : v.shuffle(e).slice(0, Math.max(0, t))
        }, v.sortBy = function(e, t, n) {
            return t = b(t, n), v.pluck(v.map(e, function(e, n, o) {
                return {
                    value: e,
                    index: n,
                    criteria: t(e, n, o)
                }
            }).sort(function(e, t) {
                var n = e.criteria,
                    o = t.criteria;
                if (n !== o) {
                    if (n > o || void 0 === n) return 1;
                    if (n < o || void 0 === o) return -1
                }
                return e.index - t.index
            }), "value")
        };
        var _ = function(e) {
            return function(t, n, o) {
                var s = {};
                return n = b(n, o), v.each(t, function(o, r) {
                    var c = n(o, r, t);
                    e(s, o, c)
                }), s
            }
        };
        v.groupBy = _(function(e, t, n) {
            v.has(e, n) ? e[n].push(t) : e[n] = [t]
        }), v.indexBy = _(function(e, t, n) {
            e[n] = t
        }), v.countBy = _(function(e, t, n) {
            v.has(e, n) ? e[n]++ : e[n] = 1
        }), v.toArray = function(e) {
            return e ? v.isArray(e) ? u.call(e) : S(e) ? v.map(e, v.identity) : v.values(e) : []
        }, v.size = function(e) {
            return null == e ? 0 : S(e) ? e.length : v.keys(e).length
        }, v.partition = function(e, t, n) {
            t = b(t, n);
            var o = [],
                s = [];
            return v.each(e, function(e, n, r) {
                (t(e, n, r) ? o : s).push(e)
            }), [o, s]
        }, v.first = v.head = v.take = function(e, t, n) {
            if (null != e) return null == t || n ? e[0] : v.initial(e, e.length - t)
        }, v.initial = function(e, t, n) {
            return u.call(e, 0, Math.max(0, e.length - (null == t || n ? 1 : t)))
        }, v.last = function(e, t, n) {
            if (null != e) return null == t || n ? e[e.length - 1] : v.rest(e, Math.max(0, e.length - t))
        }, v.rest = v.tail = v.drop = function(e, t, n) {
            return u.call(e, null == t || n ? 1 : t)
        }, v.compact = function(e) {
            return v.filter(e, v.identity)
        };
        var A = function(e, t, n, o) {
            for (var s = [], r = 0, c = o || 0, a = x(e); c < a; c++) {
                var i = e[c];
                if (S(i) && (v.isArray(i) || v.isArguments(i))) {
                    t || (i = A(i, t, n));
                    var l = 0,
                        u = i.length;
                    for (s.length += u; l < u;) s[r++] = i[l++]
                } else n || (s[r++] = i)
            }
            return s
        };
        v.flatten = function(e, t) {
            return A(e, t, !1)
        }, v.without = function(e) {
            return v.difference(e, u.call(arguments, 1))
        }, v.uniq = v.unique = function(e, t, n, o) {
            v.isBoolean(t) || (o = n, n = t, t = !1), null != n && (n = b(n, o));
            for (var s = [], r = [], c = 0, a = x(e); c < a; c++) {
                var i = e[c],
                    l = n ? n(i, c, e) : i;
                t ? (c && r === l || s.push(i), r = l) : n ? v.contains(r, l) || (r.push(l), s.push(i)) : v.contains(s, i) || s.push(i)
            }
            return s
        }, v.union = function() {
            return v.uniq(A(arguments, !0, !0))
        }, v.intersection = function(e) {
            for (var t = [], n = arguments.length, o = 0, s = x(e); o < s; o++) {
                var r = e[o];
                if (!v.contains(t, r)) {
                    for (var c = 1; c < n && v.contains(arguments[c], r); c++);
                    c === n && t.push(r)
                }
            }
            return t
        }, v.difference = function(e) {
            var t = A(arguments, !0, !0, 1);
            return v.filter(e, function(e) {
                return !v.contains(t, e)
            })
        }, v.zip = function() {
            return v.unzip(arguments)
        }, v.unzip = function(e) {
            for (var t = e && v.max(e, x).length || 0, n = Array(t), o = 0; o < t; o++) n[o] = v.pluck(e, o);
            return n
        }, v.object = function(e, t) {
            for (var n = {}, o = 0, s = x(e); o < s; o++) t ? n[e[o]] = t[o] : n[e[o][0]] = e[o][1];
            return n
        }, v.findIndex = t(1), v.findLastIndex = t(-1), v.sortedIndex = function(e, t, n, o) {
            n = b(n, o, 1);
            for (var s = n(t), r = 0, c = x(e); r < c;) {
                var a = Math.floor((r + c) / 2);
                n(e[a]) < s ? r = a + 1 : c = a
            }
            return r
        }, v.indexOf = n(1, v.findIndex, v.sortedIndex), v.lastIndexOf = n(-1, v.findLastIndex), v.range = function(e, t, n) {
            null == t && (t = e || 0, e = 0), n = n || 1;
            for (var o = Math.max(Math.ceil((t - e) / n), 0), s = Array(o), r = 0; r < o; r++, e += n) s[r] = e;
            return s
        };
        var D = function(e, t, n, o, s) {
            if (!(o instanceof t)) return e.apply(n, s);
            var r = k(e.prototype),
                c = e.apply(r, s);
            return v.isObject(c) ? c : r
        };
        v.bind = function(e, t) {
            if (h && e.bind === h) return h.apply(e, u.call(arguments, 1));
            if (!v.isFunction(e)) throw new TypeError("Bind must be called on a function");
            var n = u.call(arguments, 2),
                o = function() {
                    return D(e, o, t, this, n.concat(u.call(arguments)))
                };
            return o
        }, v.partial = function(e) {
            var t = u.call(arguments, 1),
                n = function() {
                    for (var o = 0, s = t.length, r = Array(s), c = 0; c < s; c++) r[c] = t[c] === v ? arguments[o++] : t[c];
                    for (; o < arguments.length;) r.push(arguments[o++]);
                    return D(e, n, this, this, r)
                };
            return n
        }, v.bindAll = function(e) {
            var t, n, o = arguments.length;
            if (o <= 1) throw new Error("bindAll must be passed function names");
            for (t = 1; t < o; t++) n = arguments[t], e[n] = v.bind(e[n], e);
            return e
        }, v.memoize = function(e, t) {
            var n = function(o) {
                var s = n.cache,
                    r = "" + (t ? t.apply(this, arguments) : o);
                return v.has(s, r) || (s[r] = e.apply(this, arguments)), s[r]
            };
            return n.cache = {}, n
        }, v.delay = function(e, t) {
            var n = u.call(arguments, 2);
            return setTimeout(function() {
                return e.apply(null, n)
            }, t)
        }, v.defer = v.partial(v.delay, v, 1), v.throttle = function(e, t, n) {
            var o, s, r, c = null,
                a = 0;
            n || (n = {});
            var i = function() {
                a = !1 === n.leading ? 0 : v.now(), c = null, r = e.apply(o, s), c || (o = s = null)
            };
            return function() {
                var l = v.now();
                a || !1 !== n.leading || (a = l);
                var u = t - (l - a);
                return o = this, s = arguments, u <= 0 || u > t ? (c && (clearTimeout(c), c = null), a = l, r = e.apply(o, s), c || (o = s = null)) : c || !1 === n.trailing || (c = setTimeout(i, u)), r
            }
        }, v.debounce = function(e, t, n) {
            var o, s, r, c, a, i = function() {
                var l = v.now() - c;
                l < t && l >= 0 ? o = setTimeout(i, t - l) : (o = null, n || (a = e.apply(r, s), o || (r = s = null)))
            };
            return function() {
                r = this, s = arguments, c = v.now();
                var l = n && !o;
                return o || (o = setTimeout(i, t)), l && (a = e.apply(r, s), r = s = null), a
            }
        }, v.wrap = function(e, t) {
            return v.partial(t, e)
        }, v.negate = function(e) {
            return function() {
                return !e.apply(this, arguments)
            }
        }, v.compose = function() {
            var e = arguments,
                t = e.length - 1;
            return function() {
                for (var n = t, o = e[t].apply(this, arguments); n--;) o = e[n].call(this, o);
                return o
            }
        }, v.after = function(e, t) {
            return function() {
                if (--e < 1) return t.apply(this, arguments)
            }
        }, v.before = function(e, t) {
            var n;
            return function() {
                return --e > 0 && (n = t.apply(this, arguments)), e <= 1 && (t = null), n
            }
        }, v.once = v.partial(v.before, 2);
        var L = !{
                toString: null
            }.propertyIsEnumerable("toString"),
            O = ["valueOf", "isPrototypeOf", "toString", "propertyIsEnumerable", "hasOwnProperty", "toLocaleString"];
        v.keys = function(e) {
            if (!v.isObject(e)) return [];
            if (f) return f(e);
            var t = [];
            for (var n in e) v.has(e, n) && t.push(n);
            return L && o(e, t), t
        }, v.allKeys = function(e) {
            if (!v.isObject(e)) return [];
            var t = [];
            for (var n in e) t.push(n);
            return L && o(e, t), t
        }, v.values = function(e) {
            for (var t = v.keys(e), n = t.length, o = Array(n), s = 0; s < n; s++) o[s] = e[t[s]];
            return o
        }, v.mapObject = function(e, t, n) {
            t = b(t, n);
            for (var o, s = v.keys(e), r = s.length, c = {}, a = 0; a < r; a++) o = s[a], c[o] = t(e[o], o, e);
            return c
        }, v.pairs = function(e) {
            for (var t = v.keys(e), n = t.length, o = Array(n), s = 0; s < n; s++) o[s] = [t[s], e[t[s]]];
            return o
        }, v.invert = function(e) {
            for (var t = {}, n = v.keys(e), o = 0, s = n.length; o < s; o++) t[e[n[o]]] = n[o];
            return t
        }, v.functions = v.methods = function(e) {
            var t = [];
            for (var n in e) v.isFunction(e[n]) && t.push(n);
            return t.sort()
        }, v.extend = w(v.allKeys), v.extendOwn = v.assign = w(v.keys), v.findKey = function(e, t, n) {
            t = b(t, n);
            for (var o, s = v.keys(e), r = 0, c = s.length; r < c; r++)
                if (o = s[r], t(e[o], o, e)) return o
        }, v.pick = function(e, t, n) {
            var o, s, r = {},
                c = e;
            if (null == c) return r;
            v.isFunction(t) ? (s = v.allKeys(c), o = E(t, n)) : (s = A(arguments, !1, !1, 1), o = function(e, t, n) {
                return t in n
            }, c = Object(c));
            for (var a = 0, i = s.length; a < i; a++) {
                var l = s[a],
                    u = c[l];
                o(u, l, c) && (r[l] = u)
            }
            return r
        }, v.omit = function(e, t, n) {
            if (v.isFunction(t)) t = v.negate(t);
            else {
                var o = v.map(A(arguments, !1, !1, 1), String);
                t = function(e, t) {
                    return !v.contains(o, t)
                }
            }
            return v.pick(e, t, n)
        }, v.defaults = w(v.allKeys, !0), v.create = function(e, t) {
            var n = k(e);
            return t && v.extendOwn(n, t), n
        }, v.clone = function(e) {
            return v.isObject(e) ? v.isArray(e) ? e.slice() : v.extend({}, e) : e
        }, v.tap = function(e, t) {
            return t(e), e
        }, v.isMatch = function(e, t) {
            var n = v.keys(t),
                o = n.length;
            if (null == e) return !o;
            for (var s = Object(e), r = 0; r < o; r++) {
                var c = n[r];
                if (t[c] !== s[c] || !(c in s)) return !1
            }
            return !0
        };
        var I = function(e, t, n, o) {
            if (e === t) return 0 !== e || 1 / e == 1 / t;
            if (null == e || null == t) return e === t;
            e instanceof v && (e = e._wrapped), t instanceof v && (t = t._wrapped);
            var s = d.call(e);
            if (s !== d.call(t)) return !1;
            switch (s) {
                case "[object RegExp]":
                case "[object String]":
                    return "" + e == "" + t;
                case "[object Number]":
                    return +e != +e ? +t != +t : 0 == +e ? 1 / +e == 1 / t : +e == +t;
                case "[object Date]":
                case "[object Boolean]":
                    return +e == +t
            }
            var r = "[object Array]" === s;
            if (!r) {
                if ("object" != typeof e || "object" != typeof t) return !1;
                var c = e.constructor,
                    a = t.constructor;
                if (c !== a && !(v.isFunction(c) && c instanceof c && v.isFunction(a) && a instanceof a) && "constructor" in e && "constructor" in t) return !1
            }
            n = n || [], o = o || [];
            for (var i = n.length; i--;)
                if (n[i] === e) return o[i] === t;
            if (n.push(e), o.push(t), r) {
                if ((i = e.length) !== t.length) return !1;
                for (; i--;)
                    if (!I(e[i], t[i], n, o)) return !1
            } else {
                var l, u = v.keys(e);
                if (i = u.length, v.keys(t).length !== i) return !1;
                for (; i--;)
                    if (l = u[i], !v.has(t, l) || !I(e[l], t[l], n, o)) return !1
            }
            return n.pop(), o.pop(), !0
        };
        v.isEqual = function(e, t) {
            return I(e, t)
        }, v.isEmpty = function(e) {
            return null == e || (S(e) && (v.isArray(e) || v.isString(e) || v.isArguments(e)) ? 0 === e.length : 0 === v.keys(e).length)
        }, v.isElement = function(e) {
            return !(!e || 1 !== e.nodeType)
        }, v.isArray = m || function(e) {
            return "[object Array]" === d.call(e)
        }, v.isObject = function(e) {
            var t = typeof e;
            return "function" === t || "object" === t && !!e
        }, v.each(["Arguments", "Function", "String", "Number", "Date", "RegExp", "Error"], function(e) {
            v["is" + e] = function(t) {
                return d.call(t) === "[object " + e + "]"
            }
        }), v.isArguments(arguments) || (v.isArguments = function(e) {
            return v.has(e, "callee")
        }), "function" != typeof /./ && "object" != typeof Int8Array && (v.isFunction = function(e) {
            return "function" == typeof e || !1
        }), v.isFinite = function(e) {
            return isFinite(e) && !isNaN(parseFloat(e))
        }, v.isNaN = function(e) {
            return v.isNumber(e) && e !== +e
        }, v.isBoolean = function(e) {
            return !0 === e || !1 === e || "[object Boolean]" === d.call(e)
        }, v.isNull = function(e) {
            return null === e
        }, v.isUndefined = function(e) {
            return void 0 === e
        }, v.has = function(e, t) {
            return null != e && p.call(e, t)
        }, v.noConflict = function() {
            return s._ = r, this
        }, v.identity = function(e) {
            return e
        }, v.constant = function(e) {
            return function() {
                return e
            }
        }, v.noop = function() {}, v.property = T, v.propertyOf = function(e) {
            return null == e ? function() {} : function(t) {
                return e[t]
            }
        }, v.matcher = v.matches = function(e) {
            return e = v.extendOwn({}, e),
                function(t) {
                    return v.isMatch(t, e)
                }
        }, v.times = function(e, t, n) {
            var o = Array(Math.max(0, e));
            t = E(t, n, 1);
            for (var s = 0; s < e; s++) o[s] = t(s);
            return o
        }, v.random = function(e, t) {
            return null == t && (t = e, e = 0), e + Math.floor(Math.random() * (t - e + 1))
        }, v.now = Date.now || function() {
            return (new Date).getTime()
        };
        var q = {
                "&": "&amp;",
                "<": "&lt;",
                ">": "&gt;",
                '"': "&quot;",
                "'": "&#x27;",
                "`": "&#x60;"
            },
            F = v.invert(q),
            N = function(e) {
                var t = function(t) {
                        return e[t]
                    },
                    n = "(?:" + v.keys(e).join("|") + ")",
                    o = RegExp(n),
                    s = RegExp(n, "g");
                return function(e) {
                    return e = null == e ? "" : "" + e, o.test(e) ? e.replace(s, t) : e
                }
            };
        v.escape = N(q), v.unescape = N(F), v.result = function(e, t, n) {
            var o = null == e ? void 0 : e[t];
            return void 0 === o && (o = n), v.isFunction(o) ? o.call(e) : o
        };
        var R = 0;
        v.uniqueId = function(e) {
            var t = ++R + "";
            return e ? e + t : t
        }, v.templateSettings = {
            evaluate: /<%([\s\S]+?)%>/g,
            interpolate: /<%=([\s\S]+?)%>/g,
            escape: /<%-([\s\S]+?)%>/g
        };
        var M = /(.)^/,
            j = {
                "'": "'",
                "\\": "\\",
                "\r": "r",
                "\n": "n",
                "\u2028": "u2028",
                "\u2029": "u2029"
            },
            P = /\\|'|\r|\n|\u2028|\u2029/g,
            U = function(e) {
                return "\\" + j[e]
            };
        v.template = function(e, t, n) {
            !t && n && (t = n), t = v.defaults({}, t, v.templateSettings);
            var o = RegExp([(t.escape || M).source, (t.interpolate || M).source, (t.evaluate || M).source].join("|") + "|$", "g"),
                s = 0,
                r = "__p+='";
            e.replace(o, function(t, n, o, c, a) {
                return r += e.slice(s, a).replace(P, U), s = a + t.length, n ? r += "'+\n((__t=(" + n + "))==null?'':_.escape(__t))+\n'" : o ? r += "'+\n((__t=(" + o + "))==null?'':__t)+\n'" : c && (r += "';\n" + c + "\n__p+='"), t
            }), r += "';\n", t.variable || (r = "with(obj||{}){\n" + r + "}\n"), r = "var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};\n" + r + "return __p;\n";
            try {
                var c = new Function(t.variable || "obj", "_", r)
            } catch (e) {
                throw e.source = r, e
            }
            var a = function(e) {
                return c.call(this, e, v)
            };
            return a.source = "function(" + (t.variable || "obj") + "){\n" + r + "}", a
        }, v.chain = function(e) {
            var t = v(e);
            return t._chain = !0, t
        };
        var G = function(e, t) {
            return e._chain ? v(t).chain() : t
        };
        v.mixin = function(e) {
            v.each(v.functions(e), function(t) {
                var n = v[t] = e[t];
                v.prototype[t] = function() {
                    var e = [this._wrapped];
                    return l.apply(e, arguments), G(this, n.apply(v, e))
                }
            })
        }, v.mixin(v), v.each(["pop", "push", "reverse", "shift", "sort", "splice", "unshift"], function(e) {
            var t = c[e];
            v.prototype[e] = function() {
                var n = this._wrapped;
                return t.apply(n, arguments), "shift" !== e && "splice" !== e || 0 !== n.length || delete n[0], G(this, n)
            }
        }), v.each(["concat", "join", "slice"], function(e) {
            var t = c[e];
            v.prototype[e] = function() {
                return G(this, t.apply(this._wrapped, arguments))
            }
        }), v.prototype.value = function() {
            return this._wrapped
        }, v.prototype.valueOf = v.prototype.toJSON = v.prototype.value, v.prototype.toString = function() {
            return "" + this._wrapped
        }, "function" == typeof define && define.amd && define("underscore", [], function() {
            return v
        })
    }.call(this), define("pjs", [], function() {
        return function(e, t, n) {
            function o(e) {
                return "object" == typeof e
            }

            function s(e) {
                return "function" == typeof e
            }

            function r() {}

            function c(a, i) {
                function l() {
                    var e = new u;
                    return s(e.init) && e.init.apply(e, arguments), e
                }

                function u() {}
                i === n && (i = a, a = Object), l.Bare = u;
                var d, p = r[e] = a[e],
                    m = u[e] = l[e] = new r;
                return m.constructor = l, l.mixin = function(t) {
                    return u[e] = l[e] = c(l, t)[e], l
                }, (l.open = function(e) {
                    if (d = {}, s(e) ? d = e.call(l, m, p, l, a) : o(e) && (d = e), o(d))
                        for (var n in d) t.call(d, n) && (m[n] = d[n]);
                    return s(m.init) || (m.init = a), l
                })(i)
            }
            return c
        }("prototype", {}.hasOwnProperty)
    }), define("underscore_model", ["require", "underscore", "pjs"], function(e) {
        var t = e("underscore");
        return {
            UnderscoreModel: e("pjs")(function(e) {
                var n = 0,
                    o = "guid_" + Math.round(1e6 * Math.random()) + "_" + (new Date).getTime() + "_";
                e.init = function() {
                    this.__observers = {}, this.__eventObservers = {}, this.__oldProperties = {}, this.__propertyComparators = {}, this.guid = o + ++n
                }, e.unobserveAll = function() {
                    this.__observers = {}, this.__eventObservers = {}
                }, e.getProperty = function(e) {
                    return this[e]
                }, e.getOldProperty = function(e) {
                    return this.__oldProperties[e]
                }, e.setProperty = function(e, n) {
                    var o = this[e];
                    this[e] = n;
                    var s = this.__propertyComparators[e];
                    if (s) {
                        if (s(o, n)) return
                    } else if (t.isEqual(o, n)) return;
                    this.__oldProperties[e] = o, this.notifyPropertyChange(e)
                }, e.setProperties = function(e) {
                    for (var t in e) e.hasOwnProperty(t) && this.setProperty(t, e[t])
                }, e.setPropertyComparator = function(e, t) {
                    this.__propertyComparators[e] = t
                }, e.notifyPropertyChange = function(e) {
                    this.__callObservers(this.__observers, e, this)
                }, e.observe = function(e, t) {
                    this.__addObservers(this.__observers, e, t)
                }, e.unobserve = function(e) {
                    this.__removeObservers(this.__observers, e)
                }, e.observeAndSync = function(e, t) {
                    this.observe(e, t);
                    for (var n = e.split(" "), o = 0; o < n.length; o++) {
                        var s = n[o].split("."),
                            r = s[0];
                        this.hasOwnProperty(r) && t(r, this)
                    }
                }, e.triggerEvent = function(e, t) {
                    this.__callObservers(this.__eventObservers, e, t)
                }, e.observeEvent = function(e, t) {
                    this.__addObservers(this.__eventObservers, e, t)
                }, e.unobserveEvent = function(e) {
                    this.__removeObservers(this.__eventObservers, e)
                }, e.__callObservers = function(e, t, n) {
                    var o = e[t];
                    if (o)
                        for (var s = 0; s < o.length; s++) o[s].callback(t, n)
                }, e.__removeObservers = function(e, t) {
                    for (var n = t.split(" "), o = 0; o < n.length; o++) {
                        var s = n[o].split("."),
                            r = s[0],
                            c = s[1];
                        if (r && c) {
                            var a = e[r],
                                i = [];
                            if (!a) continue;
                            for (var l = 0; l < a.length; l++) {
                                var u = a[l];
                                u.namespace !== c && i.push(u)
                            }
                            e[r] = i
                        } else if (r) delete e[r];
                        else if (c)
                            for (r in e) e.hasOwnProperty(r) && this.__removeObservers(e, r + "." + c)
                    }
                }, e.__addObservers = function(e, t, n) {
                    for (var o = t.split(" "), s = 0; s < o.length; s++) {
                        var r = o[s].split("."),
                            c = r[0];
                        if (!c) throw "Must supply a property to observe";
                        var a = r[1],
                            i = {
                                namespace: a,
                                callback: n
                            },
                            l = e[c];
                        l ? l.push(i) : e[c] = [i]
                    }
                }
            })
        }
    }), define("browser", ["require", "jquery"], function(e) {
        var t = e("jquery"),
            n = {
                IS_IE8: null !== navigator.userAgent.match(/MSIE 8.0/i),
                IS_IE9: null !== navigator.userAgent.match(/MSIE 9.0/i),
                IS_IE: null !== navigator.userAgent.match(/MSIE/i),
                IS_EDGE: null !== navigator.userAgent.match(/Edge/i),
                IS_IPAD: null !== navigator.userAgent.match(/iPad/i),
                IS_MOBILE: null !== navigator.userAgent.match(/Mobile|Android/i),
                IS_ANDROID: null !== navigator.userAgent.match(/Android/i),
                IS_IOS: null !== navigator.userAgent.match(/(iPad|iPhone|iPod)/i) || "MacIntel" === navigator.platform && navigator.maxTouchPoints > 1,
                IS_CHROME: null !== navigator.userAgent.match(/Chrome/i),
                IS_FIREFOX: null !== navigator.userAgent.match(/Firefox/i),
                IS_SAFARI: null !== navigator.userAgent.match(/^((?!chrome|android).)*safari/i),
                IS_APPLE: null !== navigator.platform.match(/(Mac|iPhone|iPod|iPad)/i),
                IS_WINDOWS: null !== navigator.platform.match(/(Win32)/i),
                IS_TOUCH: null !== navigator.userAgent.match(/Touch/i),
                IS_KINDLE: null !== navigator.userAgent.match(/Kindle/i) || null !== navigator.userAgent.match(/Silk/i),
                IS_BRAILLENOTE: null !== navigator.userAgent.match(/KeyWeb/i),
                IS_IN_IFRAME: window.parent !== window
            };
        return n.IS_TABLET = n.IS_IPAD || n.IS_ANDROID || n.IS_KINDLE, n.IS_TOUCH_DEVICE = n.SHOULD_NOT_AUTOFOCUS = n.IS_IOS || n.IS_ANDROID || navigator.userAgent.match(/webOS/i) || navigator.userAgent.match(/BlackBerry/i) || navigator.userAgent.match(/Windows Phone/i), n.IOS_VERSION = function() {
            var e = navigator.appVersion.match(/OS (\d+)_(\d+)_?(\d+)?/);
            return e ? [parseInt(e[1], 10), parseInt(e[2], 10), parseInt(e[3] || 0, 10)] : null
        }(), n.MAC_VERSION = function() {
            var e = navigator.appVersion.match(/OS X (\d+)_(\d+)_?(\d+)?/);
            return e ? [parseInt(e[1], 10), parseInt(e[2], 10), parseInt(e[3] || 0, 10)] : null
        }(), n.CHROME_VERSION = function() {
            var e = navigator.appVersion.match(/Chrom(e|ium)\/([0-9]+)\.([0-9]+)\.?([0-9]+)?/);
            return e ? [parseInt(e[2], 10), parseInt(e[3], 10), parseInt(e[4] || 0, 10)] : null
        }(), n.SUPPORTS_INPUTMODE = function() {
            var e = n.IOS_VERSION,
                t = n.MAC_VERSION,
                o = n.CHROME_VERSION;
            return e && e[0] >= 13 || n.IS_IOS && !e && t && (t[0] > 10 || 10 === t[0] && t[1] >= 15) || n.IS_ANDROID && o && o[0] >= 76
        }(), n.SUPPORTS_TRANSLATE3D = !1, t(document).ready(function() {
            var e, t, o = document.createElement("p"),
                s = {
                    webkitTransform: "-webkit-transform",
                    OTransform: "-o-transform",
                    msTransform: "-ms-transform",
                    MozTransform: "-moz-transform",
                    transform: "transform"
                };
            document.body.insertBefore(o, null);
            for (var r in s)
                if (void 0 !== o.style[r]) {
                    if (o.style[r] = "translate3d(1px,1px,1px)", !(t = window.getComputedStyle(o))) return;
                    e = t.getPropertyValue(s[r])
                } document.body.removeChild(o), n.SUPPORTS_TRANSLATE3D = void 0 !== e && e.length > 0 && "none" !== e
        }), n.translateRule = function(e, t) {
            return n.SUPPORTS_TRANSLATE3D ? "translate3d(" + e + (e ? "px" : "") + "," + t + (t ? "px" : "") + ",0)" : "translate(" + e + (e ? "px" : "") + "," + t + (t ? "px" : "") + ")"
        }, n.SUPPORTS_CANVAS = function() {
            var e = document.createElement("canvas");
            return !(!e.getContext || !e.getContext("2d"))
        }(), n
    }), define("keys", ["require"], function(e) {
        return new function() {
            var e = {
                    8: this.BACKSPACE = "Backspace",
                    9: this.TAB = "Tab",
                    13: this.ENTER = "Enter",
                    16: this.SHIFT = "Shift",
                    17: this.CONTROL = "Control",
                    18: this.ALT = "Alt",
                    20: this.CAPSLOCK = "CapsLock",
                    27: this.ESCAPE = "Esc",
                    32: this.SPACEBAR = "Space",
                    33: this.PAGEUP = "PageUp",
                    34: this.PAGEDOWN = "PageDown",
                    35: this.END = "End",
                    36: this.HOME = "Home",
                    37: this.LEFT = "Left",
                    38: this.UP = "Up",
                    39: this.RIGHT = "Right",
                    40: this.DOWN = "Down",
                    46: this.DELETE = "Del"
                },
                t = {
                    UIKeyInputUpArrow: this.UP,
                    UIKeyInputDownArrow: this.DOWN,
                    UIKeyInputLeftArrow: this.LEFT,
                    UIKeyInputRightArrow: this.RIGHT,
                    UIKeyInputEscape: this.ESCAPE,
                    UIKeyInputPageUp: this.PAGEUP,
                    UIKeyInputPageDown: this.PAGEDOWN
                };
            this.isUndo = function(e) {
                return !e.altKey && (e.ctrlKey || e.metaKey) && 90 == e.which && !e.shiftKey
            }, this.isRedo = function(e) {
                return !e.altKey && (e.ctrlKey || e.metaKey) && (89 == e.which || 90 == e.which && e.shiftKey)
            }, this.isSelectAll = function(e) {
                return !e.altKey && (e.ctrlKey || e.metaKey) && 65 == e.which
            }, this.isBacktick = function(e) {
                return !(e.altKey || e.ctrlKey || e.metaKey || e.shiftKey || 192 != e.which)
            }, this.isHelp = function(e) {
                return !e.altKey && (e.ctrlKey || e.metaKey) && 191 == e.which
            }, this.lookup = function(n) {
                return e[n.which] || t[n.key]
            }, this.lookupChar = function(e) {
                return String.fromCharCode(e.which)
            }
        }
    }), define("text", {}), define("lib/inject-css", ["require", "underscore"], function(e) {
        function t(e, t) {
            var r = o[e];
            if (!r) {
                r = document.createElement("style"), o[e] = r;
                var c = n.sortedIndex(s, e),
                    a = o[s[c]];
                a ? document.head.insertBefore(r, a) : document.head.appendChild(r), s.splice(c, 0, e)
            }
            r.textContent = t
        }
        var n = e("underscore"),
            o = {},
            s = [];
        return t
    }), define("vendor/css", {}), define("lib/prefix-css", ["require", "vendor/css"], function(e) {
        function t(e, t) {
            if (t) {
                var s = "." + t;
                return n(s), o(e, s)
            }
            return e
        }

        function n(e) {
            if (!/\.-?[_a-zA-Z]+[_a-zA-Z0-9-]*/.test(e)) throw new Error("Illegal css selector prefix " + e)
        }

        function o(e, t) {
            var n = a.parse(e),
                o = Object.assign({}, n, {
                    stylesheet: s(n.stylesheet, t)
                });
            return a.stringify(o)
        }

        function s(e, t) {
            return Object.assign({}, e, {
                rules: r(e.rules, t)
            })
        }

        function r(e, t) {
            return e.map(function(e) {
                return e.rules ? Object.assign({}, e, {
                    rules: r(e.rules, t)
                }) : e.selectors ? Object.assign({}, e, {
                    selectors: c(e.selectors, t)
                }) : e
            })
        }

        function c(e, t) {
            for (var n = [], o = 0; o < e.length; o++) {
                var s = e[o];
                if ("html" === s) n.push(s);
                else if (/dcg(-mq)?-aria-alert/.test(s)) n.push(s);
                else if (/^html body( |$)/.test(s)) n.push("html" + t + " body" + s.slice("html body".length)), n.push("html body " + t + s.slice("html body".length));
                else {
                    if (/^html/.test(s)) throw new Error("Cannot correctly prefix selector " + s);
                    n.push(t + " " + s)
                }
            }
            return n
        }
        var a = e("vendor/css");
        return t
    }), define("loadcss", {
        load: function(e) {
            throw new Error("Dynamic load not allowed: " + e)
        }
    }), define("loadcss!touchtracking", function() {}), define("touchtracking", ["require", "jquery", "ipad.ghostevents", "keys", "loadcss!./touchtracking"], function(e) {
        function t(e, t) {
            var o = R ? {
                passive: !1
            } : void 0;
            document.addEventListener(e, function(e) {
                t(n.event.fix(e))
            }, o)
        }
        var n = e("jquery"),
            o = e("ipad.ghostevents"),
            s = e("keys");
        e("loadcss!./touchtracking"), void 0 == window._touchtracking_id_counter && (window._touchtracking_id_counter = 0), window._touchtracking_id_counter += 1;
        var r = "touchtracking_id_" + window._touchtracking_id_counter,
            c = function(e) {
                n(e).addClass("dcg-tap-container"), n(e).addClass(r)
            },
            a = function(e) {
                n(e).addClass("dcg-no-touchtracking")
            };
        o.evtInScope = function(e) {
            return T(e.target)
        }, o.isGhostEvent = function(e) {
            return !window.PointerEvent && (!(u !== i && u !== l && !S()) && (e.target !== g && ((!e.target || !n.contains(e.target, g)) && (!g || !n.contains(g, e.target)))))
        };
        var i = 1,
            l = 4,
            u = 0,
            d = {},
            p = {},
            m = [],
            f = 0,
            h = null,
            g = null,
            y = null,
            v = [],
            E = function(e) {
                for (var t = []; e;) t.push(e), e = e.parentNode;
                return t
            },
            b = function(e) {
                for (var t = [], o = 0; o < e.length; o++) {
                    var s = e[o];
                    if (t.push(s), n(s).is(".dcg-tap-container, .dcg-no-touchtracking")) return n(s).is(".dcg-tap-container." + r) ? t : []
                }
                return []
            },
            w = function(e, t) {
                g = null, u = e, m = E(u === i ? t.originalEvent.touches[0].target : t.target), n(b(m)).addClass("dcg-depressed").each(function() {
                    var e = n(this);
                    C(e) && e.addClass("dcg-focus-by-tap")
                }), n(m).each(function() {
                    var e = n(this);
                    e.data({
                        originalScrollTop: e.scrollTop(),
                        originalScrollLeft: e.scrollLeft()
                    })
                }), p = {}
            },
            k = function(e) {
                return e.is("input, textarea, select") || e.hasClass("dcg-mathquill-input-span")
            },
            T = function(e) {
                return !!n(e).closest(".dcg-tap-container, .dcg-no-touchtracking").is(".dcg-tap-container." + r)
            },
            C = function(e) {
                return 3 !== u && !k(e) && T(e)
            },
            x = function(e) {
                g = null, n(".dcg-depressed").removeClass("dcg-depressed");
                var t = n(document.activeElement);
                if (C(t)) try {
                    t.blur()
                } catch (e) {}
                if (n(".dcg-focus-by-tap").removeClass("dcg-focus-by-tap"), n(m).each(function() {
                        var e = n(this),
                            t = e.data("originalScrollTop") - e.scrollTop(),
                            o = e.data("originalScrollLeft") - e.scrollLeft();
                        (t || o) && (p.scroll = !0)
                    }), 1 === p["dcg-tapstart"] && 1 === p["dcg-tapend"] && !p["dcg-tapcancel"] && !p.scroll) {
                    var o = "mouse" === e.device ? e.clientX : e.originalEvent.changedTouches[0].clientX,
                        s = "mouse" === e.device ? e.clientY : e.originalEvent.changedTouches[0].clientY;
                    if (e && !e.device && 0 === o && 0 === s) {
                        var r = e.target.getBoundingClientRect();
                        o = (r.left + r.right) / 2, s = (r.top + r.bottom) / 2, e.device = "keyboard"
                    }
                    for (var c = !1, a = 0; a < m.length && !c; a++) {
                        var d, y = n(m[a]);
                        if ("function" == typeof y[0].getBoundingClientRect && (d = y[0].getBoundingClientRect()), "true" === y.attr("tapboundary") && (c = !0), d) {
                            if (o < d.left || s < d.top) continue;
                            if (o > d.right) continue;
                            if (s > d.bottom) continue
                        }
                        g = y[0], A("dcg-tap", e, g);
                        break
                    }
                }
                u !== i && u !== l || (h = setTimeout(function() {
                    h = null, f = (new Date).getTime()
                }, 1e3)), m = [], u = 0
            },
            S = function() {
                return h || (new Date).getTime() - f < 500
            },
            _ = function(e) {
                for (var t = [], n = 0; n < e.length; n++) {
                    var o = e[n];
                    t.push({
                        identifier: o.identifier,
                        x: o.pageX,
                        y: o.pageY,
                        screenX: o.screenX,
                        screenY: o.screenY,
                        pageX: o.pageX,
                        pageY: o.pageY,
                        clientX: o.clientX,
                        clientY: o.clientY
                    })
                }
                return t
            },
            A = function(e, t, o) {
                if ("dcg-tapstart" === e) d[t.identifier] = {
                    type: e,
                    pageX: t.originalEvent.changedTouches[0].pageX,
                    pageY: t.originalEvent.changedTouches[0].pageY
                };
                else if ("dcg-tapmove" === e) {
                    var s = t.originalEvent.changedTouches[0],
                        r = d[t.identifier];
                    if (r && s.pageX === r.pageX && s.pageY === r.pageY) return;
                    if ((u === i || u === l) && r && "dcg-tapstart" === r.type && Math.abs(r.pageX - s.pageX) + Math.abs(r.pageY - s.pageY) < 2) return;
                    d[t.identifier] = {
                        type: e,
                        pageX: t.originalEvent.changedTouches[0].pageX,
                        pageY: t.originalEvent.changedTouches[0].pageY
                    }
                }
                void 0 === p[e.toLowerCase()] ? p[e.toLowerCase()] = 1 : p[e.toLowerCase()]++;
                var c = n.event.fix(t.originalEvent);
                c.type = e, c.device = u === i || u === l ? "touch" : 3 === u ? "keyboard" : "mouse", c.touches = _(t.originalEvent.touches), c.changedTouches = _(t.originalEvent.changedTouches), c.target = o || t.target;
                var a = "keyboard" !== c.device && p["dcg-longhold"] > 0;
                c.wasLongheld = function() {
                    return a
                }, c.preventTap = function() {
                    p["dcg-tapcancel"] = 1
                }, clearTimeout(y), "dcg-tapstart" === c.type && "keyboard" !== c.device && 1 === c.touches.length && (y = setTimeout(function() {
                    A("dcg-longhold", t, o)
                }, 500)), c.target && n.nodeName(c.target, "a") && "dcg-tap" === c.type && "keyboard" === c.device && c.target.click && c.target.click(), n(c.target).trigger(c)
            },
            D = function(e) {
                var t = m,
                    o = !!m.length,
                    s = n(".dcg-tap-container." + r + " .dcg-hovered"),
                    c = n.makeArray(s.filter(function() {
                        return T(this)
                    })),
                    a = [],
                    i = [],
                    l = [];
                b(E(e)).forEach(function(e) {
                    o && -1 === t.indexOf(e) || (-1 === c.indexOf(e) && l.push(e), a.push(e))
                });
                for (var u = 0; u < c.length; u++) e = c[u], -1 === a.indexOf(e) && i.push(e);
                n(i).removeClass("dcg-hovered").trigger("tipsyhide"), n(l).addClass("dcg-hovered").trigger("tipsyshow")
            },
            L = function(e) {
                for (var t = 0; t < v.length; t++)
                    if (v[t].pointerId === e) return !0;
                return !1
            },
            O = function(e) {
                for (var t = 0; t < v.length; t++)
                    if (v[t].pointerId === e) return v.splice(t, 1)[0]
            },
            I = function(e) {
                0 === u && w(l, e), D(null), v.push(e.originalEvent), e.originalEvent.identifier = e.originalEvent.pointerId, e.originalEvent.touches = v, e.originalEvent.changedTouches = [e.originalEvent], A("dcg-tapstart", e)
            },
            q = function(e) {
                O(e.originalEvent.pointerId), e.originalEvent.identifier = e.originalEvent.pointerId, e.originalEvent.touches = v, e.originalEvent.changedTouches = [e.originalEvent], A("dcg-tapcancel", e), 0 === v.length && x(e)
            },
            F = function(e) {
                O(e.originalEvent.pointerId), e.originalEvent.identifier = e.originalEvent.pointerId, e.originalEvent.touches = v, e.originalEvent.changedTouches = [e.originalEvent], A("dcg-tapend", e), 0 === v.length && x(e)
            },
            N = function(e) {
                return "touch" === e.originalEvent.pointerType || 2 === e.originalEvent.pointerType
            };
        n(document).on("pointerdown MSPointerDown", function(e) {
            2 !== u && u !== i && N(e) && (L(e.originalEvent.pointerId) || I(e))
        }), n(document).on("pointermove MSPointerMove", function(e) {
            2 !== u && u !== i && N(e) && (L(e.originalEvent.pointerId) || I(e), O(e.originalEvent.pointerId), v.push(e.originalEvent), e.originalEvent.identifier = e.originalEvent.pointerId, e.originalEvent.touches = v, e.originalEvent.changedTouches = [e.originalEvent], A("dcg-tapmove", e))
        }), n(document).on("pointercancel MSPointerCancel", function(e) {
            if (u === l && N(e) && L(e.originalEvent.pointerId)) {
                q(e);
                for (var t; t = v.pop();) {
                    var e = n.Event(t, {
                        originalEvent: t
                    });
                    q(e)
                }
            }
        }), n(document).on("pointerup MSPointerUp", function(e) {
            if (u === l && N(e) && L(e.originalEvent.pointerId)) {
                F(e);
                for (var t; t = v.pop();) {
                    var e = n.Event(t, {
                        originalEvent: t
                    });
                    F(e)
                }
            }
        });
        var R = function() {
            var e = !1;
            try {
                var t = Object.defineProperty({}, "passive", {
                    get: function() {
                        e = !0
                    }
                });
                window.addEventListener("test", function() {}, t), window.removeEventListener("test", function() {}, t)
            } catch (e) {}
            return e
        }();
        return t("touchstart", function(e) {
            2 !== u && u !== l && (0 === u && w(i, e), D(null), A("dcg-tapstart", e))
        }), t("touchmove", function(e) {
            u === i && A("dcg-tapmove", e)
        }), t("touchcancel", function(e) {
            u === i && (A("dcg-tapcancel", e), 0 === e.originalEvent.touches.length && x(e))
        }), t("touchend", function(e) {
            u === i && (A("dcg-tapend", e), 0 === e.originalEvent.touches.length && x(e))
        }), n(document).on("mousedown", function(e) {
            if (1 !== e.button && 2 !== e.button) {
                if (u === i || u === l || S()) return void(!n(e.target).is("input, textarea, select") && T(e.target) && e.preventDefault());
                w(2, e), e.originalEvent.touches = [e], e.originalEvent.changedTouches = [e], A("dcg-tapstart", e)
            }
        }), n(document).ready(function() {
            n(document).on("mousedown", function(e) {
                var t = !!n(e.target).closest(".dcg-do-not-blur").length,
                    o = !!n(e.target).closest(".dcg-do-blur").length;
                if (t && !o && T(e.target)) {
                    e.preventDefault();
                    try {
                        var s = window.getSelection();
                        if (1 === s.rangeCount) {
                            var r = s.getRangeAt(0);
                            r.startContainer === r.endContainer && n(r.startContainer).closest(".dcg-text-selectable").length && s.removeAllRanges()
                        }
                    } catch (e) {}
                }
            })
        }), n(document).on("mouseleave", function(e) {
            0 === u && (S() || D(null))
        }), n(document).on("mousemove", function(e) {
            1 !== e.button && 2 !== e.button && u !== i && u !== l && (S() || (D(e.target), e.originalEvent.touches = [e], e.originalEvent.changedTouches = [e], A("dcg-tapmove", e)))
        }), n(document).on("mouseup", function(e) {
            1 !== e.button && 2 !== e.button && 2 === u && (e.originalEvent.touches = [], e.originalEvent.changedTouches = [e], A("dcg-tapend", e), x(e))
        }), n(document).on("keydown", function(e) {
            if ((s.lookup(e) === s.ENTER || s.lookup(e) === s.SPACEBAR) && T(e.target) && 3 !== u) {
                if (n(e.target).is('a:not([ontap]), button, input, textarea, select, [contenteditable="true"]')) return;
                e.preventDefault(), w(3, e), e.originalEvent.touches = [e], e.originalEvent.changedTouches = [e], A("dcg-tapstart", e)
            }
        }), n(document).on("keyup", function(e) {
            s.lookup(e) !== s.ENTER && s.lookup(e) !== s.SPACEBAR || !T(e.target) || 3 === u && (e.originalEvent.touches = [], e.originalEvent.changedTouches = [e], A("dcg-tapend", e), x(e))
        }), {
            monitor: c,
            ignore: a,
            isTapActive: function() {
                return 0 !== u
            },
            elIsFocusable: k
        }
    }), define("lib/conditional_blur", ["require", "exports", "touchtracking", "jquery"], function(e, t, n, o) {
        "use strict";

        function s() {
            if (document.activeElement) {
                var e = o(document.activeElement);
                n.elIsFocusable(e) && o(document.activeElement).blur()
            }
        }
        Object.defineProperty(t, "__esModule", {
            value: !0
        }), t.default = s
    }), define("vendor/fake-xml-http-request", [], function() {
        function e(e) {
            var t;
            if ("undefined" != typeof DOMParser) {
                t = (new DOMParser).parseFromString(e, "text/xml")
            } else t = new ActiveXObject("Microsoft.XMLDOM"), t.async = "false", t.loadXML(e);
            return t
        }

        function t(e, t) {
            t.addEventListener(e, function(n) {
                var o = t["on" + e];
                o && "function" == typeof o && o.call(n.target, n)
            })
        }

        function n() {
            this._eventListeners = {};
            for (var e = ["loadstart", "progress", "load", "abort", "loadend"], n = e.length - 1; n >= 0; n--) t(e[n], this)
        }

        function o() {
            n.call(this), this.readyState = o.UNSENT, this.requestHeaders = {}, this.requestBody = null, this.status = 0, this.statusText = "", this.upload = new n
        }

        function s(e) {
            if (e.readyState !== o.OPENED) throw new Error("INVALID_STATE_ERR");
            if (e.sendFlag) throw new Error("INVALID_STATE_ERR")
        }

        function r(e) {
            if (e.readyState == o.DONE) throw new Error("Request done")
        }

        function c(e) {
            if (e.async && e.readyState != o.HEADERS_RECEIVED) throw new Error("No headers received")
        }

        function a(e) {
            if ("string" != typeof e) {
                var t = new Error("Attempted to respond to fake XMLHttpRequest with " + e + ", which is not a string.");
                throw t.name = "InvalidBodyException", t
            }
        }
        var i = function(e, t, n, o) {
            this.type = e, this.bubbles = t, this.cancelable = n, this.target = o
        };
        i.prototype = {
            stopPropagation: function() {},
            preventDefault: function() {
                this.defaultPrevented = !0
            }
        };
        var l = {
                100: "Continue",
                101: "Switching Protocols",
                200: "OK",
                201: "Created",
                202: "Accepted",
                203: "Non-Authoritative Information",
                204: "No Content",
                205: "Reset Content",
                206: "Partial Content",
                300: "Multiple Choice",
                301: "Moved Permanently",
                302: "Found",
                303: "See Other",
                304: "Not Modified",
                305: "Use Proxy",
                307: "Temporary Redirect",
                400: "Bad Request",
                401: "Unauthorized",
                402: "Payment Required",
                403: "Forbidden",
                404: "Not Found",
                405: "Method Not Allowed",
                406: "Not Acceptable",
                407: "Proxy Authentication Required",
                408: "Request Timeout",
                409: "Conflict",
                410: "Gone",
                411: "Length Required",
                412: "Precondition Failed",
                413: "Request Entity Too Large",
                414: "Request-URI Too Long",
                415: "Unsupported Media Type",
                416: "Requested Range Not Satisfiable",
                417: "Expectation Failed",
                422: "Unprocessable Entity",
                500: "Internal Server Error",
                501: "Not Implemented",
                502: "Bad Gateway",
                503: "Service Unavailable",
                504: "Gateway Timeout",
                505: "HTTP Version Not Supported"
            },
            u = {
                "Accept-Charset": !0,
                "Accept-Encoding": !0,
                Connection: !0,
                "Content-Length": !0,
                Cookie: !0,
                Cookie2: !0,
                "Content-Transfer-Encoding": !0,
                Date: !0,
                Expect: !0,
                Host: !0,
                "Keep-Alive": !0,
                Referer: !0,
                TE: !0,
                Trailer: !0,
                "Transfer-Encoding": !0,
                Upgrade: !0,
                "User-Agent": !0,
                Via: !0
            };
        n.prototype = {
            addEventListener: function(e, t) {
                this._eventListeners[e] = this._eventListeners[e] || [], this._eventListeners[e].push(t)
            },
            removeEventListener: function(e, t) {
                for (var n = this._eventListeners[e] || [], o = 0, s = n.length; o < s; ++o)
                    if (n[o] == t) return n.splice(o, 1)
            },
            dispatchEvent: function(e) {
                for (var t = e.type, n = this._eventListeners[t] || [], o = 0; o < n.length; o++) "function" == typeof n[o] ? n[o].call(this, e) : n[o].handleEvent(e);
                return !!e.defaultPrevented
            },
            _progress: function(e, t, n) {
                var o = new i("progress");
                o.target = this, o.lengthComputable = e, o.loaded = t, o.total = n, this.dispatchEvent(o)
            }
        }, o.prototype = new n, o.UNSENT = 0, o.OPENED = 1, o.HEADERS_RECEIVED = 2, o.LOADING = 3, o.DONE = 4;
        var d = {
            UNSENT: 0,
            OPENED: 1,
            HEADERS_RECEIVED: 2,
            LOADING: 3,
            DONE: 4,
            async: !0,
            withCredentials: !1,
            open: function(e, t, n, s, r) {
                this.method = e, this.url = t, this.async = "boolean" != typeof n || n, this.username = s, this.password = r, this.responseText = null, this.responseXML = null, this.requestHeaders = {}, this.sendFlag = !1, this._readyStateChange(o.OPENED)
            },
            setRequestHeader: function(e, t) {
                if (s(this), u[e] || /^(Sec-|Proxy-)/.test(e)) throw new Error('Refused to set unsafe header "' + e + '"');
                this.requestHeaders[e] ? this.requestHeaders[e] += "," + t : this.requestHeaders[e] = t
            },
            send: function(e) {
                if (s(this), !/^(get|head)$/i.test(this.method)) {
                    var t = !1;
                    Object.keys(this.requestHeaders).forEach(function(e) {
                        "content-type" === e.toLowerCase() && (t = !0)
                    }), t || (e || "").toString().match("FormData") || (this.requestHeaders["Content-Type"] = "text/plain;charset=UTF-8"), this.requestBody = e
                }
                this.errorFlag = !1, this.sendFlag = this.async, this._readyStateChange(o.OPENED), "function" == typeof this.onSend && this.onSend(this), this.dispatchEvent(new i("loadstart", !1, !1, this)), o.onSend && o.onSend(this)
            },
            abort: function() {
                this.aborted = !0, this.responseText = null, this.errorFlag = !0, this.requestHeaders = {}, this.readyState > o.UNSENT && this.sendFlag && (this._readyStateChange(o.DONE), this.sendFlag = !1), this.readyState = o.UNSENT, this.dispatchEvent(new i("abort", !1, !1, this)), "function" == typeof this.onerror && this.onerror()
            },
            getResponseHeader: function(e) {
                if (this.readyState < o.HEADERS_RECEIVED) return null;
                if (/^Set-Cookie2?$/i.test(e)) return null;
                e = e.toLowerCase();
                for (var t in this.responseHeaders)
                    if (t.toLowerCase() == e) return this.responseHeaders[t];
                return null
            },
            getAllResponseHeaders: function() {
                if (this.readyState < o.HEADERS_RECEIVED) return "";
                var e = "";
                for (var t in this.responseHeaders) this.responseHeaders.hasOwnProperty(t) && !/^Set-Cookie2?$/i.test(t) && (e += t + ": " + this.responseHeaders[t] + "\r\n");
                return e
            },
            overrideMimeType: function(e) {
                "string" == typeof e && (this.forceMimeType = e.toLowerCase())
            },
            _readyStateChange: function(e) {
                this.readyState = e, "function" == typeof this.onreadystatechange && this.onreadystatechange(new i("readystatechange")), this.dispatchEvent(new i("readystatechange")), this.readyState == o.DONE && (this.dispatchEvent(new i("load", !1, !1, this)), this.dispatchEvent(new i("loadend", !1, !1, this)))
            },
            _setResponseHeaders: function(e) {
                this.responseHeaders = {};
                for (var t in e) e.hasOwnProperty(t) && (this.responseHeaders[t] = e[t]);
                this.forceMimeType && (this.responseHeaders["Content-Type"] = this.forceMimeType), this.async ? this._readyStateChange(o.HEADERS_RECEIVED) : this.readyState = o.HEADERS_RECEIVED
            },
            _setResponseBody: function(t) {
                r(this), c(this), a(t);
                var n = this.chunkSize || 10,
                    s = 0;
                this.responseText = "";
                do {
                    this.async && this._readyStateChange(o.LOADING), this.responseText += t.substring(s, s + n), s += n
                } while (s < t.length);
                var i = this.getResponseHeader("Content-Type");
                if (this.responseText && (!i || /(text\/xml)|(application\/xml)|(\+xml)/.test(i))) try {
                    this.responseXML = e(this.responseText)
                } catch (e) {}
                this.async ? this._readyStateChange(o.DONE) : this.readyState = o.DONE
            },
            respond: function(e, t, n) {
                this._setResponseHeaders(t || {}), this.status = "number" == typeof e ? e : 200, this.statusText = l[this.status], this._setResponseBody(n || "")
            }
        };
        for (var p in d) o.prototype[p] = d[p];
        return o
    }), define("console", ["require"], function(e) {
        var t = function() {},
            n = ["log", "info", "warn", "error", "assert", "dir", "clear", "profile", "profileEnd", "time", "timeEnd", "group", "groupCollapsed", "groupEnd", "trace"],
            o = {},
            s = function(e) {
                "undefined" != typeof window && window.console && window.console[e] ? o[e] = function() {
                    Function.prototype.apply.call(window.console[e], window.console, arguments)
                } : o[e] = t
            };
        return n.forEach(s), o
    }), define("main/backend", ["require", "jquery"], function(require) {
        var $ = require("jquery"),
            Backend = {
                baseURL: "",
                getGoogleLoginURL: function(e) {
                    void 0 === e && (e = {});
                    var t = e.changeToken ? "?" + e.changeToken : "";
                    return t += e.changeToken ? "&source" : "?source=" + (e.from ? e.from : ""), Backend.baseURL + "/drive_api/calculator/login" + t
                },
                exchangeGoogleAuthCode: function(e) {
                    var t = $.Deferred();
                    return e ? this.getJSON("/account/google_auth?code=" + e).always(function(e) {
                        e && e.success ? t.resolve() : t.reject()
                    }) : setTimeout(function() {
                        t.reject("no auth code")
                    }, 1), t.promise()
                },
                handleDeprecatedRoute: function(msg) {
                    if (msg && msg.routeDeprecated) {
                        msg.js && eval(msg.js);
                        var deferred = $.Deferred();
                        return deferred.reject(msg), deferred.promise()
                    }
                    return msg
                },
                post: function(e, t) {
                    return $.ajax({
                        type: "POST",
                        url: Backend.baseURL + e,
                        data: t,
                        xhrFields: {
                            withCredentials: !0
                        }
                    }).then(Backend.handleDeprecatedRoute)
                },
                getJSON: function(e) {
                    return $.ajax({
                        dataType: "json",
                        url: Backend.baseURL + e,
                        xhrFields: {
                            withCredentials: !0
                        }
                    }).then(Backend.handleDeprecatedRoute)
                }
            };
        return Backend
    }), define("lib/app-bridge", ["require", "jquery", "underscore_model", "browser", "lib/conditional_blur", "vendor/fake-xml-http-request", "pjs", "console", "main/backend"], function(e) {
        function t() {
            window.XMLHttpRequest = a, a.onSend = function(e) {
                var t = h + "";
                h += 1, f[t] = e, i.methods.proxyXHR(JSON.stringify({
                    id: t,
                    url: e.url,
                    method: e.method,
                    headers: e.requestHeaders,
                    body: e.requestBody
                }))
            }
        }

        function n(e) {
            var t = o(e.target).closest("a[href]")[0];
            if (t && "file:" === t.protocol) {
                var n = t.getAttribute("href");
                "/" !== n[0] && (n = "/" + n), t.setAttribute("href", m.baseURL + n)
            }
        }
        var o = e("jquery"),
            s = e("underscore_model").UnderscoreModel,
            r = e("browser"),
            c = e("lib/conditional_blur").default,
            a = e("vendor/fake-xml-http-request"),
            i = null,
            l = null,
            u = e("pjs"),
            d = e("console"),
            p = !1,
            m = e("main/backend"),
            f = {},
            h = 0;
        if (r.IS_IOS) {
            var g = [],
                y = [],
                v = function(e) {
                    var t = y.length ? y.pop() : g.length;
                    return g[t] = e, t
                },
                E = function(e) {
                    var t = g[e];
                    return g[e] = null, y.push(e), t
                };
            i = {
                loaded: !1,
                methods: {},
                queuedMethodCalls: []
            }, o(function() {
                var e = [];
                window.ObjC_callback = function(o) {
                    i.loaded = !0, o.split(" ").forEach(function(t) {
                        i.methods[t] = function(o, s) {
                            var r = s ? v(s) : -1;
                            e.push("desmos:" + t + "/" + r + "/" + encodeURIComponent(o)), 1 === e.length && n.attr("src", e[0])
                        }
                    }), this.ObjC_callback = function(t, o) {
                        try {
                            -1 !== t && E(t)(o)
                        } finally {
                            e.shift(), e.length > 0 && n.attr("src", e[0])
                        }
                    }, i.methods.proxyXHR && t(), i.queuedMethodCalls.forEach(function(e) {
                        k[e.methodName].apply(k, e.args)
                    })
                };
                var n = o('<iframe id="objc-bridge" style="position:absolute; left: -1000px; z-index: -1" src="desmos:loaded"/>').appendTo(document.body)
            })
        } else r.IS_ANDROID ? l = window.Android : p = !0;
        var b = u(s, function(e, t) {
                e.init = function() {
                    t.init.call(this), this.heartbeatTimeout = null, this.observeEvent("started resumed", function(e) {
                        this.gaEvent(e + ":" + this.versionNumber), this.incrementHeartbeat(0)
                    }.bind(this)), -1 !== document.location.search.indexOf("simulateVersionNumber") && (this.versionNumber = "?.?.?")
                }, e.heartbeat = function(e) {
                    clearTimeout(this.heartbeatTimeout), this.gaEvent("heartbeat-" + 10 * e), this.incrementHeartbeat(e)
                }, e.incrementHeartbeat = function(e) {
                    clearTimeout(this.heartbeatTimeout), this.heartbeatTimeout = setTimeout(function() {
                        this.heartbeat(e + 1)
                    }.bind(this), 6e5)
                }, e._started = function(e, t) {
                    this.appId = e, this.versionNumber = t, this.triggerEvent("started")
                }, e._resumed = function() {
                    this.triggerEvent("resumed")
                }, e.ensureKeypadClosedAndReturnIfWasOpened = function() {
                    var e = window.Calc && window.Calc.controller;
                    return e && e.isKeypadOpen() ? (c(), "true") : "false"
                }, e.onGoogleAuthResult = function(e) {
                    this.triggerEvent("onGoogleAuthResult", e)
                }, e.onObjCXHRProxyResult = function(e) {
                    var t = e.id,
                        n = f[t];
                    delete f[t], n.respond(e.status, e.headers, e.body)
                }
            }),
            w = ["hideLoadingScreen", "gaEvent", "openGoogleLogin", "logout", "saveCookies", "deleteCookies", "startSingleAppMode", "endSingleAppMode", "setWWWSubdomain"],
            k = new b;
        return w.forEach(function(e) {
            k[e] = function() {
                p || (l ? l[e] ? l[e].apply(l, arguments) : d.log("call to missing Android method", e, arguments) : i && (i.loaded ? i.methods[e] ? i.methods[e].apply(i, arguments) : d.log("call to missing ObjC method", e, arguments) : i.queuedMethodCalls.push({
                    methodName: e,
                    args: arguments
                })))
            }
        }), p || (window.AppBridge = k, document.addEventListener("click", n, !0)), k
    }), define("animation-frame-src", ["require"], function(e) {
        var t = 0,
            n = function(e, n) {
                var o = (new Date).getTime(),
                    s = Math.max(0, 16 - (o - t)),
                    r = window.setTimeout(function() {
                        e(o + s)
                    }, s);
                return t = o + s, r
            };
        return window.requestAnimationFrame && window.cancelAnimationFrame ? {
            requestAnimationFrame: window.requestAnimationFrame.bind(window),
            cancelAnimationFrame: window.cancelAnimationFrame.bind(window)
        } : {
            requestAnimationFrame: n,
            cancelAnimationFrame: window.clearTimeout.bind(window)
        }
    }), define("lib/animation-frame", ["require", "exports", "animation-frame-src"], function(e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        }), t.requestAnimationFrame = n.requestAnimationFrame, t.cancelAnimationFrame = n.cancelAnimationFrame
    }), define("main/raf-loop", ["require", "lib/animation-frame"], function(e) {
        function t(e) {
            function t(o) {
                n.requestAnimationFrame(t), e(o)
            }
            n.requestAnimationFrame(t)
        }
        var n = e("lib/animation-frame");
        return t
    }), define("main/shared-clock-bus", ["require", "exports", "main/raf-loop", "underscore_model"], function(e, t, n, o) {
        "use strict";

        function s(e) {
            return a += 1, c.observeEvent("tick." + a, function(t, n) {
                e(n)
            }), a
        }

        function r(e) {
            c.unobserveEvent("tick." + e)
        }
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var c = new o.UnderscoreModel;
        n(function(e) {
            c.triggerEvent("tick", e)
        });
        var a = 0;
        t.subscribe = s, t.unsubscribe = r
    }), define("submodules/dcgview/src/attr-event-handler", [], function() {
        function e(e, t) {
            if (null !== t && void 0 !== t) {
                if ("string" != typeof e) throw new Error("Must pass a string for an EventHandler name");
                if ("function" != typeof t) throw new Error("Must pass a function for an EventHandler callback");
                return {
                    bindings: {
                        onMount: function(n) {
                            n[e.toLowerCase()] = function(e) {
                                e && t.apply(this, arguments)
                            }
                        }
                    }
                }
            }
        }
        return e
    }), define("submodules/dcgview/src/const", ["require"], function(e) {
        function t(e) {
            var t = function() {
                return e
            };
            return t.isDCGViewConst = !0, t
        }

        function n(e) {
            return !("function" != typeof e || !e.isDCGViewConst)
        }
        return {
            isConst: n,
            makeConst: t
        }
    }), define("submodules/dcgview/src/attr", ["require"], function(e) {
        function t(e, t, n) {
            void 0 === n ? e.removeAttribute(t) : e.setAttribute(t, n + "")
        }
        return {
            update: t
        }
    }), define("submodules/dcgview/src/attr-generic", ["require", "./const", "./attr"], function(e) {
        function t(e, t) {
            var s, r = t();
            return n.isConst(t) || (s = {
                onUpdate: function(n) {
                    var s = t();
                    s !== r && (r = s, o.update(n, e, s))
                }
            }), {
                value: r,
                bindings: s
            }
        }
        var n = e("./const"),
            o = e("./attr");
        return t
    }), define("submodules/dcgview/src/is-event-handler", [], function() {
        function e(e) {
            return "o" === e[0] && "n" === e[1] && e[2].toUpperCase() === e[2]
        }
        return e
    }), define("submodules/dcgview/src/custom-attributes", ["require"], function(e) {
        function t(e, t) {
            s[e] = t
        }

        function n(e) {
            return s.hasOwnProperty(e)
        }

        function o(e, t) {
            return (0, s[e])(t)
        }
        var s = {};
        return {
            isCustomAttribute: n,
            add: t,
            parse: o
        }
    }), define("submodules/dcgview/src/bindings", ["require"], function(e) {
        function t(e, t, n) {
            var o = e._bindings[t];
            o ? o.push(n) : e._bindings[t] = [n]
        }

        function n(e, t) {
            var n = e._bindings[t];
            if (n)
                for (var o = n.length, s = 0; s < o; s++) n[s]()
        }
        return {
            add: t,
            invoke: n
        }
    }), define("submodules/dcgview/src/bind-attrs", ["require", "./attr-event-handler", "./attr-generic", "./is-event-handler", "./custom-attributes", "./bindings"], function(e) {
        function t(e, t, n) {
            var o = n.bindings;
            if (o)
                for (var s in o) {
                    var r = o[s];
                    s in l && (r = r.bind(null, t)), i.add(e, s, r)
                }
        }

        function n(e, t) {
            if ("function" != typeof t) throw new Error('The "' + e + '" attr must be a function. It is: ' + JSON.stringify(t));
            return a.isCustomAttribute(e) ? a.parse(e, t) : c(e) ? s(e, t) : r(e, t)
        }

        function o(e, o, s) {
            if (o)
                for (var r in o) {
                    var c = n(r, o[r]);
                    if (c) {
                        var a = c.value;
                        void 0 !== a && s.setAttribute(r, a), c.bindings && t(e, s, c)
                    }
                }
        }
        var s = e("./attr-event-handler"),
            r = e("./attr-generic"),
            c = e("./is-event-handler"),
            a = e("./custom-attributes"),
            i = e("./bindings"),
            l = {
                onMount: !0,
                didMount: !0,
                willUnmount: !0,
                willUpdate: !0,
                onUpdate: !0,
                didUpdate: !0
            };
        return o
    }), define("submodules/dcgview/src/bind-text", ["require", "./bindings"], function(e) {
        function t() {
            s = !0
        }

        function n(e, t, n) {
            if ("function" != typeof n) throw new Error("bindText expects a function");
            var r = n();
            void 0 !== r && null !== r || (r = "");
            var c = document.createTextNode(r);
            if (s) {
                var a = document.createElement("span");
                a.appendChild(c), t.appendChild(a)
            } else t.appendChild(c);
            o.add(e, "onUpdate", function() {
                var e = n();
                void 0 !== e && null !== e || (e = ""), r !== e && (c.nodeValue = e, r = e)
            })
        }
        var o = e("./bindings"),
            s = !1;
        return {
            bindText: n,
            enableSpanWrapping: t
        }
    }), define("submodules/dcgview/src/warnings", ["require"], function(e) {
        function t(e) {
            s.push(e)
        }

        function n(e) {
            var t = s;
            s = [];
            for (var n = 0; n < t.length; n++) {
                var o = t[n];
                o !== e && s.push(o)
            }
        }

        function o(e) {
            try {
                throw new Error(e)
            } catch (e) {
                console.warn(e);
                for (var t = 0; t < s.length; t++) s[t](e)
            }
        }
        var s = [];
        return {
            warn: o,
            addWarningHandler: t,
            removeWarningHandler: n
        }
    }), define("submodules/dcgview/src/dcg-element", ["require", "./bind-attrs", "./bind-text", "./const", "./warnings"], function(e) {
        function t(e, t) {
            var n = document.createTextNode(t);
            e.appendChild(n)
        }

        function n(e, t, n) {
            this.tagName = e, this.attrs = t, this.children = n
        }
        var o = e("./bind-attrs"),
            s = e("./bind-text").bindText,
            r = e("./const"),
            c = e("./warnings");
        return n.prototype._isDCGElement = !0, n.prototype.renderToDocFrag = function(e, n) {
            if (this._domNode) throw new Error("Cannot remount a DCGElement");
            var a = this.children,
                i = document.createElement(this.tagName);
            this._domNode = i, o(n, this.attrs, i), e.appendChild(i);
            for (var l = a.length, u = 0; u < l; u++) {
                var d = a[u];
                d._isDCGElement ? d.renderToDocFrag(i, n) : r.isConst(d) ? t(i, d()) : "function" == typeof d ? s(n, i, d) : (c.warn("Text should be a const or a getter: " + JSON.stringify(d)), t(i, d))
            }
        }, n
    }), define("submodules/dcgview/src/create-element", ["require", "./dcg-element"], function(e) {
        function t(e, n) {
            if (null !== e && void 0 !== e)
                if (Array.isArray(e))
                    for (var o = 0; o < e.length; o++) t(e[o], n);
                else n.push(e)
        }

        function n(e, n) {
            for (var s = [], r = arguments.length - 1, c = 2; c <= r; c++) t(arguments[c], s);
            if ("string" == typeof e) return new o(e, n, s);
            if (e && e._isDCGViewClass) return new e(n, s);
            throw new Error("createElement expects a String or DCGViewClass")
        }
        var o = e("./dcg-element");
        return n
    }), define("submodules/dcgview/src/mounting", ["require", "./bindings"], function(e) {
        function t() {
            for (var e = this._element; e._isDCGView;) e = e._element;
            return e._domNode
        }

        function n(e, t) {
            if (t && t._childViews.push(this), this.__generatedHTMLBefore) throw new Error("Cannot remount a DCGView");
            this.__generatedHTMLBefore = !0, this._element.renderToDocFrag(e, this)
        }

        function o(e, t, n) {
            if (!e || !e._isDCGViewClass) throw new Error("Must pass a DCGView class to be mounted");
            if (!t || 1 !== t.nodeType) throw new Error("Must pass an HTMLElement for the node");
            if (t._mountedDCGView) throw new Error("This node is already mounted by a view");
            var o = new e(n),
                s = document.createDocumentFragment();
            return o.renderToDocFrag(s), t.innerHTML = "", r(o), t._mountedDCGView = o, t.appendChild(s), c(o), a(o), o
        }

        function s(e) {
            var t = e._mountedDCGView;
            if (!t) throw new Error("This node is not mounted by a DCGView");
            i(t), e.innerHTML = "", delete e._mountedDCGView, l(t), u(t)
        }

        function r(e) {
            e.willMount && e.willMount(), p.invoke(e, "willMount"), e._childViews.forEach(r)
        }

        function c(e) {
            e._isMounted = !0, e.onMount && e.onMount(), p.invoke(e, "onMount"), e._childViews.forEach(c)
        }

        function a(e) {
            e.didMount && e.didMount(), p.invoke(e, "didMount"), e._childViews.forEach(a)
        }

        function i(e) {
            e.willUnmount && e.willUnmount(), p.invoke(e, "willUnmount"), e._childViews.forEach(i)
        }

        function l(e) {
            e._isMounted = !1, e._childViews.forEach(l), p.invoke(e, "onUnmount"), e.onUnmount && e.onUnmount()
        }

        function u(e) {
            e._childViews.forEach(u), p.invoke(e, "didUnmount"), e.didUnmount && e.didUnmount()
        }

        function d(e, t) {
            var n = document.createDocumentFragment();
            return e.renderToDocFrag(n, t), n.firstChild
        }
        var p = e("./bindings");
        return {
            renderToDocFrag: n,
            findRootNode: t,
            createNodeForView: d,
            willMount: r,
            onMount: c,
            didMount: a,
            willUnmount: i,
            onUnmount: l,
            didUnmount: u,
            mountToNode: o,
            unmountFromNode: s
        }
    }), define("submodules/dcgview/src/update", ["require", "./bindings", "./warnings"], function(e) {
        function t() {
            if (!this._isMounted) return o.warn("Trying to update view that is not mounted. Ignoring update.");
            if (!this.shouldUpdate || this.shouldUpdate()) {
                if (this.willUpdate && this.willUpdate(), n.invoke(this, "willUpdate"), n.invoke(this, "onUpdate"), this.onUpdate && this.onUpdate(), this.overrideChildUpdates) this.overrideChildUpdates();
                else
                    for (var e = this._childViews, t = e.length, s = 0; s < t; s++) e[s].update();
                n.invoke(this, "didUpdate"), this.didUpdate && this.didUpdate()
            }
        }
        var n = e("./bindings"),
            o = e("./warnings");
        return {
            update: t
        }
    }), define("submodules/dcgview/src/spread", ["require"], function(e) {
        function t(e) {
            var t = arguments.length;
            if (t < 2) return e;
            for (var n = 1; n < t; n++)
                for (var o = arguments[n], s = Object.keys(o), r = s.length, c = 0; c < r; c++) {
                    var a = s[c];
                    e[a] = o[a]
                }
            return e
        }
        return t
    }), define("submodules/dcgview/src/create-class", ["require", "./create-element", "./mounting", "./update", "./const", "./spread"], function(e) {
        function t(e) {
            if (!e) throw new Error("must pass a spec to DCGView.createClass");
            if ("function" != typeof e.template) throw new Error("must pass a template function to DCGView.createClass");
            var t = function(e, t) {
                this._setupProps(e, t), this.init && this.init(), this._callTemplate()
            };
            t.prototype._setupProps = function(e, t) {
                if (e) {
                    for (var n in e) {
                        var o = e[n];
                        if ("function" != typeof o && void 0 !== o) throw new Error('The "' + n + '" prop must be a function. It is: ' + JSON.stringify(o))
                    }
                    this.props = e
                } else this.props = {};
                this.children = t, this._childViews = [], this._bindings = {}
            }, t.prototype._callTemplate = function() {
                if (this._element = this.template(), !this._element || !this._element._isDCGElement) throw new Error("template() must return a DCGElement")
            }, t.prototype.bindFn = function(e) {
                return e.bind(this)
            }, t.prototype.findRootNode = o.findRootNode, t.prototype.renderToDocFrag = o.renderToDocFrag, t.prototype.const = r.makeConst, t.prototype.spread = c, t.prototype.createElement = n, t.prototype.update = s.update;
            for (var a in e)
                if (e.hasOwnProperty(a)) {
                    if (t.prototype.hasOwnProperty(a)) throw new Error("Cannot override the " + a + "() method");
                    t.prototype[a] = e[a]
                } return t._isDCGViewClass = !0, t.prototype._isDCGView = !0, t.prototype._isDCGElement = !0, t
        }
        var n = e("./create-element"),
            o = e("./mounting"),
            s = e("./update"),
            r = e("./const"),
            c = e("./spread");
        return t
    }), define("submodules/dcgview/src/attr-style", ["require", "./const", "./attr"], function(e) {
        function t(e) {
            var t = e(),
                n = typeof t;
            if ("string" === n) return t;
            if (!n || "object" !== n) throw new Error("Unsupported type returned from style getter: " + n);
            var o = "";
            for (var s in t) {
                var r = t[s];
                t.hasOwnProperty(s) && null !== r && void 0 !== r && (o ? o += ";" + s + ":" + r : o = s + ":" + r)
            }
            return o
        }

        function n(e) {
            var n, r = t(e);
            return o.isConst(e) || (n = {
                onUpdate: function(n) {
                    var o = t(e);
                    r !== o && (s.update(n, "style", o), r = o)
                }
            }), {
                value: r,
                bindings: n
            }
        }
        var o = e("./const"),
            s = e("./attr");
        return n
    }), define("submodules/dcgview/src/attr-class", ["require", "./const"], function(e) {
        function t(e) {
            var t = e(),
                n = typeof t;
            if ("string" === n) return t;
            if (!n || "object" !== n) throw new Error("Unsupported type returned from class getter: " + n);
            var o = "";
            for (var s in t)
                if (t.hasOwnProperty(s)) {
                    var r = t[s];
                    r && (o ? o += " " + s : o = s)
                } return o
        }

        function n(e, t, n) {
            for (var o = [], s = e.className.replace(r, "").split(c), a = t.replace(r, "").split(c), i = {}, l = a.length - 1; l >= 0; l--) i[a[l]] = !0;
            var u = s.length;
            for (l = 0; l < u; l++) {
                var d = s[l];
                i.hasOwnProperty(d) || o.push(d)
            }
            return n ? o.length ? n + " " + o.join(" ") : n : o.join(" ")
        }

        function o(e) {
            var o, r = t(e);
            return s.isConst(e) || (o = {
                onUpdate: function(o) {
                    var s = t(e);
                    r !== s && (o.className === r ? (o.className = s, r = s) : (o.className = n(o, r, s), r = s))
                }
            }), {
                value: r,
                bindings: o
            }
        }
        var s = e("./const"),
            r = /^\s+|\s+$/g,
            c = /\s+/;
        return o
    }), define("submodules/dcgview/src/attr-lifecycle", ["require", "./const"], function(e) {
        function t(e) {
            return function(t) {
                if ("function" != typeof t) throw new Error("The " + e + " attribute expects a function for the value");
                if (n.isConst(t)) throw new Error("The " + e + " attribute does not expect a const for the value");
                var o = {
                    bindings: {}
                };
                return o.bindings[e] = t, o
            }
        }
        var n = e("./const");
        return t
    }), define("submodules/dcgview/src/longest-subsequence", ["require"], function(e) {
        return function(e) {
            var t, n, o = e.length,
                s = new Array(o),
                r = new Array(o + 1),
                c = 0;
            for (n = 0; n < o; n++) {
                if (e[r[c]] < e[n]) t = c + 1;
                else {
                    for (var a = 1, i = c - 1; a <= i;) {
                        var l = Math.ceil((a + i) / 2);
                        e[r[l]] < e[n] ? a = l + 1 : i = l - 1
                    }
                    t = a
                }
                s[n] = r[t - 1], r[t] = n, t > c && (c = t)
            }
            var u = new Array(c),
                d = r[c];
            for (n = c - 1; n >= 0; n--) u[n] = e[d], d = s[d];
            return u
        }
    }), define("submodules/dcgview/src/compute-key-mutations", ["require", "./longest-subsequence"], function(e) {
        function t(e, t) {
            var o, s, r = {},
                c = [],
                a = [];
            for (o = 0; o < t.length; o++) s = t[o], r[s] = o;
            for (o = 0; o < e.length; o++) s = e[o], void 0 === r[s] && c.push(s);
            var i = [];
            for (o = 0; o < e.length; o++) {
                s = e[o];
                var l = r[s];
                void 0 !== l && i.push(l)
            }
            var u = n(i),
                d = {};
            for (o = 0; o < u.length; o++) s = t[u[o]], d[s] = !0;
            for (o = t.length - 1; o >= 0; o--) s = t[o], d[s] || a.push({
                key: s,
                beforeKey: t[o + 1]
            });
            return {
                removes: c,
                inserts: a
            }
        }
        var n = e("./longest-subsequence");
        return t
    }), define("submodules/dcgview/src/for", ["require", "./create-class", "./compute-key-mutations", "./const", "./mounting"], function(e) {
        var t = e("./create-class"),
            n = e("./compute-key-mutations"),
            o = e("./const"),
            s = e("./mounting"),
            r = t({
                template: function() {
                    return this.children[0]
                }
            });
        return t({
            _isDCGFor: !0,
            getKeys: function() {
                this._keyToItem = {};
                var e = this.props.each();
                if (!Array.isArray(e)) throw new Error("<For each={}> must return an array");
                var t = this.props.key ? e.map(this.props.key) : e.slice(0);
                if (!this._chosenKeyType && t.length && (this._chosenKeyType = typeof t[0], "string" !== this._chosenKeyType && "number" !== this._chosenKeyType)) throw new Error("The key: " + JSON.stringify(t[0]) + " is not a string or number");
                for (var n = 0; n < t.length; n++) {
                    var o = t[n];
                    if (typeof o !== this._chosenKeyType) throw new Error("Keys must be the same type. " + JSON.stringify(o) + " is not a " + this._chosenKeyType);
                    if (o in this._keyToItem) throw new Error("The key: " + JSON.stringify(o) + " is not unique");
                    this._keyToItem[o] = e[n]
                }
                return t
            },
            createViewForKey: function(e) {
                var t = this._keyToItem[e],
                    n = this._viewFunction.call(this, t, e),
                    o = n;
                return o._isDCGView || (o = this.createElement(r, null, n)), this._keyToView[e] = o, o
            },
            template: function() {
                if (this._keyToView = {}, "function" != typeof this.props.each) throw new Error("<For each={}> must be a function");
                if (1 !== this.children.length) throw new Error("<For> expects a single child. You passed " + this.children.length);
                var e = this.children[0];
                if (!e || !e._isDCGElement) throw new Error("<For> expects the root node to be a DCGElement. You passed " + JSON.stringify(e));
                if (e._isDCGView) throw new Error("<For> expects the root node to not be a DCGView. Pass in something like <div> or <span>");
                if (1 !== e.children.length) throw new Error("<For> expects a root node with a single child. You passed " + e.children.length);
                if (this._viewFunction = e.children[0], this._viewFunction && this._viewFunction._isDCGElement) throw new Error("<For> expects a function that constructs a DCGElement. You passed a DCGElement directly");
                if ("function" != typeof this._viewFunction) {
                    var t = JSON.stringify(this._viewFunction);
                    throw new Error("<For> expects a function that constructs a DCGElement. You passed " + t)
                }
                if (o.isConst(this._viewFunction)) throw new Error("<For> expects a function that constructs a DCGElement. You passed a constant");
                this._keys = this.getKeys();
                for (var n = [], s = 0; s < this._keys.length; s++) {
                    var r = this._keys[s];
                    n.push(this.createViewForKey(r))
                }
                return e.children = n, e
            },
            detachAllRemovedViews: function() {
                for (var e, t = this._childViews, n = 0, o = t.length, s = 0; s < o; s++) e = t[s], e._will_be_unmounted_ ? n++ : t[s - n] = e;
                t.splice(o - n, n)
            },
            overrideChildUpdates: function() {
                var e = this._keys,
                    t = this.getKeys();
                this._keys = t;
                var o, r, c, a, i, l, u = this.findRootNode(),
                    d = n(e, t),
                    p = [];
                for (o = d.removes.length - 1; o >= 0; o--) l = d.removes[o], p.push(this._keyToView[l]);
                for (p.forEach(s.willUnmount), o = 0; o < d.removes.length; o++) l = d.removes[o], r = this._keyToView[l], delete this._keyToView[l], r._will_be_unmounted_ = !0, u.removeChild(r.findRootNode());
                p.length > 0 && this.detachAllRemovedViews(), p.forEach(s.onUnmount), p.forEach(s.didUnmount);
                var m = [];
                for (o = d.inserts.length - 1; o >= 0; o--)(l = d.inserts[o].key) in this._keyToView || (r = this.createViewForKey(l), m.push(r), s.createNodeForView(r, this));
                for (m.forEach(s.willMount), o = 0; o < d.inserts.length; o++) i = d.inserts[o], c = this._keyToView[i.key].findRootNode(), a = void 0 !== i.beforeKey ? this._keyToView[i.beforeKey].findRootNode() : null, u.insertBefore(c, a);
                m.forEach(s.onMount), m.forEach(s.didMount);
                var f = this._childViews,
                    h = f.length - m.length;
                for (o = 0; o < h; o++) f[o].update()
            }
        })
    }), define("submodules/dcgview/src/switch", ["require", "./create-class", "./const", "./mounting"], function(e) {
        var t = e("./create-class"),
            n = e("./const"),
            o = e("./mounting"),
            s = t({
                template: function() {
                    return this.children[0]
                }
            });
        return t({
            _isDCGSwitch: !0,
            updateKey: function() {
                this._key = this.props.key()
            },
            createView: function() {
                var e = this._viewFunction(this._key);
                return null !== e && void 0 !== e || (e = this.createElement("div", {
                    style: this.const("display: none")
                })), this.createElement(s, null, e)
            },
            template: function() {
                if (this._key = void 0, "function" != typeof this.props.key) throw new Error("<Switch key={}> must be a function");
                if (1 !== this.children.length) throw new Error("<Switch> expects a single child. You passed " + this.children.length);
                if (this._viewFunction = this.children[0], this._viewFunction && this._viewFunction._isDCGElement) throw new Error("<Switch> expects a function that constructs a DCGElement. You passed a DCGElement directly");
                if ("function" != typeof this._viewFunction) {
                    var e = JSON.stringify(this._viewFunction);
                    throw new Error("<Switch> expects a function that constructs a DCGElement. You passed " + e)
                }
                if (n.isConst(this._viewFunction)) throw new Error("<Switch> expects a function that constructs a DCGElement. You passed a constant");
                return this.updateKey(), this.createView()
            },
            overrideChildUpdates: function() {
                var e = this._key;
                if (this.updateKey(), e === this._key) this._element.update();
                else {
                    var t = this.findRootNode(),
                        n = document.createTextNode("");
                    t.parentNode.insertBefore(n, t), o.willUnmount(this._element), this._childViews = [], t.parentNode.removeChild(t), o.onUnmount(this._element), o.didUnmount(this._element), this._element = this.createView();
                    var s = o.createNodeForView(this._element, this);
                    o.willMount(this._element), n.parentNode.insertBefore(s, n), n.parentNode.removeChild(n), o.onMount(this._element), o.didMount(this._element)
                }
            }
        })
    }), define("submodules/dcgview/src/switch-union", ["require", "./create-class", "./mounting", "./create-element"], function(e) {
        function t(e, t, n) {
            return r(a, {
                getCase: function() {
                    var n = t();
                    return e ? n && n[e] : n
                },
                buildChildView: function(e) {
                    var o = n[e];
                    if (o) return o(t)
                }
            })
        }

        function n(e, n) {
            return "string" == typeof e ? t.bind(this, e, n) : t(void 0, e, n)
        }
        var o = e("./create-class"),
            s = e("./mounting"),
            r = e("./create-element"),
            c = o({
                template: function() {
                    return this.children[0]
                }
            }),
            a = o({
                _isDCGSwitchUnion: !0,
                updateCase: function() {
                    this._case = this.props.getCase()
                },
                createView: function() {
                    var e = this.props.buildChildView(this._case);
                    return null !== e && void 0 !== e || (e = this.createElement("div", {
                        style: this.const("display: none")
                    })), this.createElement(c, null, e)
                },
                template: function() {
                    return this._case = void 0, this.updateCase(), this.createView()
                },
                overrideChildUpdates: function() {
                    var e = this._case;
                    if (this.updateCase(), e === this._case) this._element.update();
                    else {
                        var t = this.findRootNode(),
                            n = document.createTextNode("");
                        t.parentNode.insertBefore(n, t), s.willUnmount(this._element), this._childViews = [], t.parentNode.removeChild(t), s.onUnmount(this._element), s.didUnmount(this._element), this._element = this.createView();
                        var o = s.createNodeForView(this._element, this);
                        s.willMount(this._element), n.parentNode.insertBefore(o, n), n.parentNode.removeChild(n), s.onMount(this._element), s.didMount(this._element)
                    }
                }
            });
        return n
    }), define("submodules/dcgview/src/if", ["require", "./create-class", "./const", "./switch"], function(e) {
        var t = e("./create-class"),
            n = e("./const"),
            o = e("./switch");
        return t({
            _isDCGIf: !0,
            template: function() {
                if ("function" != typeof this.props.predicate) throw new Error("<If predicate={}> must be a function");
                if (1 !== this.children.length) throw new Error("<If> expects a single child. You passed " + this.children.length);
                if (this._viewFunction = this.children[0], this._viewFunction && this._viewFunction._isDCGElement) throw new Error("<If> expects a function that constructs a DCGElement. You passed a DCGElement directly");
                if ("function" != typeof this._viewFunction) {
                    var e = JSON.stringify(this._viewFunction);
                    throw new Error("<If> expects a function that constructs a DCGElement. You passed " + e)
                }
                if (n.isConst(this._viewFunction)) throw new Error("<If> expects a function that constructs a DCGElement. You passed a constant");
                var t = function() {
                        return !!this.props.predicate()
                    }.bind(this),
                    s = function(e) {
                        if (e) return this._viewFunction()
                    }.bind(this);
                return this.createElement(o, {
                    key: t
                }, s)
            }
        })
    }), define("submodules/dcgview/src/if-defined", ["require", "./create-class", "./mounting", "./create-element"], function(e) {
        function t(e, t) {
            return s(c, {
                isDefined: function() {
                    return null != e()
                },
                buildChildView: function() {
                    return t(e)
                }
            })
        }
        var n = e("./create-class"),
            o = e("./mounting"),
            s = e("./create-element"),
            r = n({
                template: function() {
                    return this.children[0]
                }
            }),
            c = n({
                _isDCGIfDefined: !0,
                updateIsDefined: function() {
                    this._isDefined = this.props.isDefined()
                },
                createView: function() {
                    var e;
                    return this._isDefined && (e = this.props.buildChildView()), null !== e && void 0 !== e || (e = this.createElement("div", {
                        style: this.const("display: none")
                    })), this.createElement(r, null, e)
                },
                template: function() {
                    return this._isDefined = void 0, this.updateIsDefined(), this.createView()
                },
                overrideChildUpdates: function() {
                    var e = this._isDefined;
                    if (this.updateIsDefined(), e === this._isDefined) this._element.update();
                    else {
                        var t = this.findRootNode(),
                            n = document.createTextNode("");
                        t.parentNode.insertBefore(n, t), o.willUnmount(this._element), this._childViews = [], t.parentNode.removeChild(t), o.onUnmount(this._element), o.didUnmount(this._element), this._element = this.createView();
                        var s = o.createNodeForView(this._element, this);
                        o.willMount(this._element), n.parentNode.insertBefore(s, n), n.parentNode.removeChild(n), o.onMount(this._element), o.didMount(this._element)
                    }
                }
            });
        return t
    }), define("submodules/dcgview/src/if-else", ["require", "./switch-union"], function(e) {
        function t(e, t) {
            return n(function() {
                return e() ? "true" : "false"
            }, t)
        }
        var n = e("./switch-union");
        return t
    }), define("submodules/dcgview/src/textarea", ["require", "./create-class", "./spread"], function(e) {
        var t = e("./create-class"),
            n = e("./spread");
        return t({
            computeValue: function() {
                var e = this.props.value();
                return null === e || void 0 === e ? "" : e + ""
            },
            template: function() {
                if (!this.props.value) throw new Error('<Textarea> expects a "value={}" prop');
                if (!this.props.onInput) throw new Error('<Textarea> expects an "onInput={}" prop');
                var e = n({}, this.props, {
                    onInput: function(e) {
                        this.props.onInput(e.target.value), this._isMounted && this.update()
                    }.bind(this)
                });
                return this.props.disabled && (e.disabled = function() {
                    return !!this.props.disabled() || void 0
                }.bind(this)), delete e.value, this.createElement("textarea", e, this.const(this.computeValue()))
            },
            didUpdate: function() {
                this.rootDOM || (this.rootDOM = this.findRootNode());
                var e = this.computeValue();
                this.rootDOM.value !== e && (this.rootDOM.value = e)
            }
        })
    }), define("submodules/dcgview/src/input", ["require", "./create-class", "./spread"], function(e) {
        var t = e("./create-class"),
            n = e("./spread");
        return t({
            computeValue: function() {
                var e = this.props.value();
                return null === e || void 0 === e ? "" : e + ""
            },
            template: function() {
                if (!this.props.value) throw new Error('<Input> expects a "value={}" prop');
                if (!this.props.onInput) throw new Error('<Input> expects an "onInput={}" prop');
                var e = n({}, this.props, {
                    value: this.const(this.computeValue()),
                    onInput: function(e) {
                        this.props.onInput(e.target.value), this._isMounted && this.update()
                    }.bind(this)
                });
                return this.props.disabled && (e.disabled = function() {
                    return !!this.props.disabled() || void 0
                }.bind(this)), e.hasOwnProperty("tabindex") || (e.tabindex = function() {
                    return this.props.disabled && this.props.disabled() ? "-1" : "0"
                }.bind(this)), this.createElement("input", e)
            },
            didUpdate: function() {
                this.rootDOM || (this.rootDOM = this.findRootNode());
                var e = this.computeValue();
                this.rootDOM.value !== e && (this.rootDOM.value = e)
            }
        })
    }), define("submodules/dcgview/src/checkbox", ["require", "./create-class", "./spread"], function(e) {
        var t = e("./create-class"),
            n = e("./spread");
        return t({
            computeChecked: function() {
                return !!this.props.checked()
            },
            template: function() {
                if (!this.props.checked) throw new Error('<Checkbox> expects a "checked={}" prop');
                if (!this.props.onChange) throw new Error('<Checkbox> expects an "onChange={}" prop');
                var e = n({}, this.props, {
                    type: this.const("checkbox"),
                    checked: this.const(this.computeChecked() ? "checked" : void 0),
                    onChange: function(e) {
                        this.props.onChange(e.target.checked), this._isMounted && this.update()
                    }.bind(this)
                });
                return this.createElement("input", e)
            },
            didUpdate: function() {
                this.rootDOM || (this.rootDOM = this.findRootNode());
                var e = this.computeChecked();
                this.rootDOM.checked !== e && (this.rootDOM.checked = e)
            }
        })
    }), define("submodules/dcgview/src/components", ["require", "./for", "./switch", "./switch-union", "./if", "./if-defined", "./if-else", "./textarea", "./input", "./checkbox"], function(e) {
        return {
            For: e("./for"),
            Switch: e("./switch"),
            SwitchUnion: e("./switch-union"),
            If: e("./if"),
            IfDefined: e("./if-defined"),
            IfElse: e("./if-else"),
            Textarea: e("./textarea"),
            Input: e("./input"),
            Checkbox: e("./checkbox")
        }
    }), define("submodules/dcgview/src/class", ["require", "./create-class"], function(e) {
        return e("./create-class")({
            template: function() {}
        })
    }), define("submodules/dcgview/src/dcg-view", ["require", "./create-element", "./create-class", "./mounting", "./spread", "./const", "./custom-attributes", "./attr-style", "./attr-class", "./attr-lifecycle", "./components", "./warnings", "./bind-text", "./class"], function(e) {
        var t = e("./create-element"),
            n = e("./create-class"),
            o = e("./mounting"),
            s = e("./spread"),
            r = e("./const"),
            c = e("./custom-attributes"),
            a = e("./attr-style"),
            i = e("./attr-class"),
            l = e("./attr-lifecycle"),
            u = e("./components"),
            d = e("./warnings"),
            p = e("./bind-text").enableSpanWrapping,
            m = e("./class"),
            f = {
                createElement: t,
                createClass: n,
                mountToNode: o.mountToNode,
                unmountFromNode: o.unmountFromNode,
                spread: s,
                const: r.makeConst,
                addCustomAttribute: c.add,
                Components: u,
                addWarningHandler: d.addWarningHandler,
                removeWarningHandler: d.removeWarningHandler,
                enableSpanWrapping: p,
                Class: m
            };
        return f.addCustomAttribute("style", a), f.addCustomAttribute("class", i), f.addCustomAttribute("willMount", l("willMount")), f.addCustomAttribute("onMount", l("onMount")), f.addCustomAttribute("didMount", l("didMount")), f.addCustomAttribute("willUnmount", l("willUnmount")), f.addCustomAttribute("onUnmount", l("onUnmount")), f.addCustomAttribute("didUnmount", l("didUnmount")), f.addCustomAttribute("willUpdate", l("willUpdate")),
            f.addCustomAttribute("onUpdate", l("onUpdate")), f.addCustomAttribute("didUpdate", l("didUpdate")), f
    }), define("submodules/dcgview/dcgview", ["require", "./src/dcg-view"], function(e) {
        return e("./src/dcg-view")
    }),
    function() {
        var e, t, n, o, s, r, c, a, i, l, u, d, p, m, f, h, g, y, v, E, b = {};
        ! function(e) {
            function t(e, t) {
                return e !== n && ("function" == typeof Object.create ? Object.defineProperty(e, "__esModule", {
                        value: !0
                    }) : e.__esModule = !0),
                    function(n, o) {
                        return e[n] = t ? t(n, o) : o
                    }
            }
            var n = "object" == typeof b ? b : "object" == typeof self ? self : "object" == typeof this ? this : {};
            "function" == typeof define && define.amd ? define("tslib", ["exports"], function(o) {
                e(t(n, t(o)))
            }) : e("object" == typeof module && "object" == typeof module.exports ? t(n, t(module.exports)) : t(n))
        }(function(b) {
            var w = Object.setPrototypeOf || {
                __proto__: []
            }
            instanceof Array && function(e, t) {
                e.__proto__ = t
            } || function(e, t) {
                for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n])
            };
            e = function(e, t) {
                function n() {
                    this.constructor = e
                }
                w(e, t), e.prototype = null === t ? Object.create(t) : (n.prototype = t.prototype, new n)
            }, t = Object.assign || function(e) {
                for (var t, n = 1, o = arguments.length; n < o; n++) {
                    t = arguments[n];
                    for (var s in t) Object.prototype.hasOwnProperty.call(t, s) && (e[s] = t[s])
                }
                return e
            }, n = function(e, t) {
                var n = {};
                for (var o in e) Object.prototype.hasOwnProperty.call(e, o) && t.indexOf(o) < 0 && (n[o] = e[o]);
                if (null != e && "function" == typeof Object.getOwnPropertySymbols)
                    for (var s = 0, o = Object.getOwnPropertySymbols(e); s < o.length; s++) t.indexOf(o[s]) < 0 && Object.prototype.propertyIsEnumerable.call(e, o[s]) && (n[o[s]] = e[o[s]]);
                return n
            }, o = function(e, t, n, o) {
                var s, r = arguments.length,
                    c = r < 3 ? t : null === o ? o = Object.getOwnPropertyDescriptor(t, n) : o;
                if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) c = Reflect.decorate(e, t, n, o);
                else
                    for (var a = e.length - 1; a >= 0; a--)(s = e[a]) && (c = (r < 3 ? s(c) : r > 3 ? s(t, n, c) : s(t, n)) || c);
                return r > 3 && c && Object.defineProperty(t, n, c), c
            }, s = function(e, t) {
                return function(n, o) {
                    t(n, o, e)
                }
            }, r = function(e, t) {
                if ("object" == typeof Reflect && "function" == typeof Reflect.metadata) return Reflect.metadata(e, t)
            }, c = function(e, t, n, o) {
                return new(n || (n = Promise))(function(s, r) {
                    function c(e) {
                        try {
                            i(o.next(e))
                        } catch (e) {
                            r(e)
                        }
                    }

                    function a(e) {
                        try {
                            i(o.throw(e))
                        } catch (e) {
                            r(e)
                        }
                    }

                    function i(e) {
                        e.done ? s(e.value) : new n(function(t) {
                            t(e.value)
                        }).then(c, a)
                    }
                    i((o = o.apply(e, t || [])).next())
                })
            }, a = function(e, t) {
                function n(e) {
                    return function(t) {
                        return o([e, t])
                    }
                }

                function o(n) {
                    if (s) throw new TypeError("Generator is already executing.");
                    for (; i;) try {
                        if (s = 1, r && (c = 2 & n[0] ? r.return : n[0] ? r.throw || ((c = r.return) && c.call(r), 0) : r.next) && !(c = c.call(r, n[1])).done) return c;
                        switch (r = 0, c && (n = [2 & n[0], c.value]), n[0]) {
                            case 0:
                            case 1:
                                c = n;
                                break;
                            case 4:
                                return i.label++, {
                                    value: n[1],
                                    done: !1
                                };
                            case 5:
                                i.label++, r = n[1], n = [0];
                                continue;
                            case 7:
                                n = i.ops.pop(), i.trys.pop();
                                continue;
                            default:
                                if (c = i.trys, !(c = c.length > 0 && c[c.length - 1]) && (6 === n[0] || 2 === n[0])) {
                                    i = 0;
                                    continue
                                }
                                if (3 === n[0] && (!c || n[1] > c[0] && n[1] < c[3])) {
                                    i.label = n[1];
                                    break
                                }
                                if (6 === n[0] && i.label < c[1]) {
                                    i.label = c[1], c = n;
                                    break
                                }
                                if (c && i.label < c[2]) {
                                    i.label = c[2], i.ops.push(n);
                                    break
                                }
                                c[2] && i.ops.pop(), i.trys.pop();
                                continue
                        }
                        n = t.call(e, i)
                    } catch (e) {
                        n = [6, e], r = 0
                    } finally {
                        s = c = 0
                    }
                    if (5 & n[0]) throw n[1];
                    return {
                        value: n[0] ? n[1] : void 0,
                        done: !0
                    }
                }
                var s, r, c, a, i = {
                    label: 0,
                    sent: function() {
                        if (1 & c[0]) throw c[1];
                        return c[1]
                    },
                    trys: [],
                    ops: []
                };
                return a = {
                    next: n(0),
                    throw: n(1),
                    return: n(2)
                }, "function" == typeof Symbol && (a[Symbol.iterator] = function() {
                    return this
                }), a
            }, i = function(e, t) {
                for (var n in e) t.hasOwnProperty(n) || (t[n] = e[n])
            }, l = function(e) {
                var t = "function" == typeof Symbol && e[Symbol.iterator],
                    n = 0;
                return t ? t.call(e) : {
                    next: function() {
                        return e && n >= e.length && (e = void 0), {
                            value: e && e[n++],
                            done: !e
                        }
                    }
                }
            }, u = function(e, t) {
                var n = "function" == typeof Symbol && e[Symbol.iterator];
                if (!n) return e;
                var o, s, r = n.call(e),
                    c = [];
                try {
                    for (;
                        (void 0 === t || t-- > 0) && !(o = r.next()).done;) c.push(o.value)
                } catch (e) {
                    s = {
                        error: e
                    }
                } finally {
                    try {
                        o && !o.done && (n = r.return) && n.call(r)
                    } finally {
                        if (s) throw s.error
                    }
                }
                return c
            }, d = function() {
                for (var e = [], t = 0; t < arguments.length; t++) e = e.concat(u(arguments[t]));
                return e
            }, p = function() {
                for (var e = 0, t = 0, n = arguments.length; t < n; t++) e += arguments[t].length;
                for (var o = Array(e), s = 0, t = 0; t < n; t++)
                    for (var r = arguments[t], c = 0, a = r.length; c < a; c++, s++) o[s] = r[c];
                return o
            }, m = function(e) {
                return this instanceof m ? (this.v = e, this) : new m(e)
            }, f = function(e, t, n) {
                function o(e) {
                    u[e] && (l[e] = function(t) {
                        return new Promise(function(n, o) {
                            d.push([e, t, n, o]) > 1 || s(e, t)
                        })
                    })
                }

                function s(e, t) {
                    try {
                        r(u[e](t))
                    } catch (e) {
                        i(d[0][3], e)
                    }
                }

                function r(e) {
                    e.value instanceof m ? Promise.resolve(e.value.v).then(c, a) : i(d[0][2], e)
                }

                function c(e) {
                    s("next", e)
                }

                function a(e) {
                    s("throw", e)
                }

                function i(e, t) {
                    e(t), d.shift(), d.length && s(d[0][0], d[0][1])
                }
                if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
                var l, u = n.apply(e, t || []),
                    d = [];
                return l = {}, o("next"), o("throw"), o("return"), l[Symbol.asyncIterator] = function() {
                    return this
                }, l
            }, h = function(e) {
                function t(t, s) {
                    n[t] = e[t] ? function(n) {
                        return (o = !o) ? {
                            value: m(e[t](n)),
                            done: "return" === t
                        } : s ? s(n) : n
                    } : s
                }
                var n, o;
                return n = {}, t("next"), t("throw", function(e) {
                    throw e
                }), t("return"), n[Symbol.iterator] = function() {
                    return this
                }, n
            }, g = function(e) {
                function t(t) {
                    o[t] = e[t] && function(o) {
                        return new Promise(function(s, r) {
                            o = e[t](o), n(s, r, o.done, o.value)
                        })
                    }
                }

                function n(e, t, n, o) {
                    Promise.resolve(o).then(function(t) {
                        e({
                            value: t,
                            done: n
                        })
                    }, t)
                }
                if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
                var o, s = e[Symbol.asyncIterator];
                return s ? s.call(e) : (e = "function" == typeof l ? l(e) : e[Symbol.iterator](), o = {}, t("next"), t("throw"), t("return"), o[Symbol.asyncIterator] = function() {
                    return this
                }, o)
            }, y = function(e, t) {
                return Object.defineProperty ? Object.defineProperty(e, "raw", {
                    value: t
                }) : e.raw = t, e
            }, v = function(e) {
                if (e && e.__esModule) return e;
                var t = {};
                if (null != e)
                    for (var n in e) Object.hasOwnProperty.call(e, n) && (t[n] = e[n]);
                return t.default = e, t
            }, E = function(e) {
                return e && e.__esModule ? e : {
                    default: e
                }
            }, b("__extends", e), b("__assign", t), b("__rest", n), b("__decorate", o), b("__param", s), b("__metadata", r), b("__awaiter", c), b("__generator", a), b("__exportStar", i), b("__values", l), b("__read", u), b("__spread", d), b("__spreadArrays", p), b("__await", m), b("__asyncGenerator", f), b("__asyncDelegator", h), b("__asyncValues", g), b("__makeTemplateObject", y), b("__importStar", v), b("__importDefault", E)
        })
    }(), define("bugsnag", ["require", "exports", "tslib"], function(e, t, n) {
        "use strict";

        function o() {
            return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(e) {
                var t = 16 * Math.random() | 0;
                return ("x" == e ? t : 3 & t | 8).toString(16)
            })
        }

        function s() {
            return window.Desmos && window.Desmos.commit
        }

        function r() {
            var e = "production";
            if (location && location.hostname) {
                var t = location.hostname,
                    n = t.split("."),
                    o = n.slice(0, n.length - 2).join(".");
                "desmos.com" === n.slice(n.length - 2).join(".") && (e = o && "www" !== o ? o : "production")
            }
            return e
        }

        function c(e) {
            if (!u) {
                var t = 0,
                    n = o();
                u = e({
                    apiKey: "7f7807097671acbc4557e64bbf5eb529",
                    maxBreadcrumbs: 40,
                    appVersion: s(),
                    releaseStage: r(),
                    consoleBreadcrumbsEnabled: !1,
                    beforeSend: function(e) {
                        if (e.errorClass)
                            for (var o = 0, s = p; o < s.length; o++) {
                                var r = s[o];
                                if (-1 !== e.errorClass.indexOf(r)) return void e.ignore()
                            }
                        if (e.errorMessage)
                            for (var c = 0, a = p; c < a.length; c++) {
                                var r = a[c];
                                if (-1 !== e.errorMessage.indexOf(r)) return void e.ignore()
                            }
                        d && d(e), e.isIgnored() || (t += 1, e.metaData.errorNumber = t, e.metaData.pageLoadId = n)
                    }
                })
            }
        }

        function a(e, t) {
            u && u.notify(e, t)
        }

        function i(e, t, o, s) {
            if (t) {
                t = n.__assign({}, t);
                for (var r in t) try {
                    t[r] = JSON.stringify(t[r], null, 2)
                } catch (e) {
                    t[r] = "[[could not stringify]]"
                }
            }
            u && u.leaveBreadcrumb(e, t, o, s)
        }

        function l(e) {
            d = e
        }
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var u, d, p = ["UnhandledRejection", "lnrAppboy", "socratic", "MyAppGet", "SymBrowser_", "mobincube_", "_avast_submit", "Cannot redefine property: googletag", "jcarousel", "SyntaxError: Unexpected identifier 'script'", "__gCrWeb.autofill.extractForms", "BrowseITEXT", "Can't find variable: removeAllHighlights", "aAttribruteValue.parentNode.getAttribute", "vid_mate_check", "GetImageTagSrcFromPoint", "Can't find variable: didEnterViewPort", "tinyMCE is not defined"];
        t.init = c, t.notify = a, t.leaveBreadcrumb = i, t.setBeforeSendCB = l
    }), define("loadcss!dcgview-shim", function() {}),
    function() {
        define("dcgview", ["require", "jquery", "underscore", "submodules/dcgview/dcgview", "submodules/dcgview/src/const", "bugsnag", "loadcss!dcgview-shim"], function(e) {
            var t, n, o, s, r, c;
            return t = e("jquery"), r = e("underscore"), s = e("submodules/dcgview/dcgview"), o = e("submodules/dcgview/src/const"), n = e("bugsnag"), e("loadcss!dcgview-shim"), s.addWarningHandler(function(e) {
                return n.notify(e)
            }), c = [], s.onUrlChange = function(e) {
                return c.push(e)
            }, s.addCustomAttribute("href", function(e) {
                var n;
                return n = {
                    value: "" + e(),
                    bindings: {
                        onMount: function(n) {
                            var o;
                            if (!t(n).is("a") && !t(n).is("use")) throw new Error("Cannot have an href on a non-link element.");
                            return o = !1, t(n).on("dcg-tap", function(t) {
                                var n;
                                if (!t.metaKey && (o = !1, n = e(), r.any(c.map(function(e) {
                                        return e(n, t)
                                    })))) return o = !0
                            }), t(n).on("click", function(e) {
                                if (o) return o = !1, e.preventDefault()
                            })
                        }
                    }
                }, o.isConst(e) || (n.bindings.onUpdate = function(t) {
                    return t.setAttribute("href", e())
                }), n
            }), s.addCustomAttribute("onTap", function(e) {
                return {
                    value: "",
                    bindings: {
                        onMount: function(n) {
                            return t(n).on("dcg-tap", e)
                        }
                    }
                }
            }), s.addCustomAttribute("ignoreRealClick", function(e) {
                return {
                    bindings: {
                        onMount: function(n) {
                            return t(n).on("click", function(t) {
                                if (e()) return t.preventDefault()
                            })
                        }
                    }
                }
            }), s.addCustomAttribute("onTapStart", function(e) {
                return {
                    bindings: {
                        onMount: function(n) {
                            return t(n).on("dcg-tapstart", e)
                        }
                    }
                }
            }), s.addCustomAttribute("onTapMove", function(e) {
                return {
                    bindings: {
                        onMount: function(n) {
                            return t(n).on("dcg-tapmove", e)
                        }
                    }
                }
            }), s.addCustomAttribute("onTapEnd", function(e) {
                return {
                    bindings: {
                        onMount: function(n) {
                            return t(n).on("dcg-tapend", e)
                        }
                    }
                }
            }), s.addCustomAttribute("onLongHold", function(e) {
                return {
                    bindings: {
                        onMount: function(n) {
                            return t(n).on("dcg-longhold", e)
                        }
                    }
                }
            }), s.addCustomAttribute("manageFocus", function(e) {
                return void 0 === e() ? {} : {
                    bindings: {
                        onMount: function(t) {
                            return e().shouldBeFocused() && t.focus(), t.onfocus = function() {
                                if (!e().shouldBeFocused()) return e().onFocusedChanged(!0)
                            }, t.onblur = function() {
                                if (e().shouldBeFocused()) return e().onFocusedChanged(!1)
                            }
                        },
                        onUpdate: function(t) {
                            var n, o;
                            return o = e().shouldBeFocused(), n = document.activeElement === t, o && !n ? t.focus() : n && !o ? t.blur() : void 0
                        },
                        willUnmount: function(e) {
                            return delete e.onfocus, delete e.onblur
                        }
                    }
                }
            }), s
        })
    }.call(this), define("practice/dcgview-practice", ["require", "exports", "tslib", "dcgview"], function(e, t, n, o) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var s = function(e) {
            function t() {
                return null !== e && e.apply(this, arguments) || this
            }
            return n.__extends(t, e), t.prototype.init = function() {
                this.controller = this.props.controller()
            }, t
        }(o.Class);
        t.default = s
    }),
    function() {
        function e() {}

        function t(e) {
            var t = b.call(arguments, 1);
            return function() {
                return e.apply(this, t)
            }
        }

        function n(e, t) {
            if (!t) throw new Error("prayer failed: " + e)
        }

        function o(e) {
            n("a direction was passed", e === k || e === T)
        }

        function s() {
            _ || (_ = !0, setTimeout(r))
        }

        function r() {
            _ = !1, S = {}
        }

        function c(e, t) {
            var n = e[k];
            if (n)
                for (; n !== e[T][T]; n = n[T]) {
                    var o = t(n);
                    if (!1 === o) break
                }
        }

        function a(e, t, n) {
            var o = e[k];
            if (!o) return t;
            for (; o !== e[T][T]; o = o[T]) t = n(t, o);
            return t
        }

        function i(e, t, o) {
            n("a parent is always present", e), n("leftward is properly set up", function() {
                return t ? t[T] === o && t.parent === e : e.ends[k] === o
            }()), n("rightward is properly set up", function() {
                return o ? o[k] === t && o.parent === e : e.ends[T] === t
            }())
        }

        function l() {
            window.console && console.warn('You are using the MathQuill API without specifying an interface version, which will fail in v1.0.0. Easiest fix is to do the following before doing anything else:\n\n    MathQuill = MathQuill.getInterface(1);\n    // now MathQuill.MathField() works like it used to\n\nSee also the "`dev` branch (2014–2015) → v0.10.0 Migration Guide" at\n  https://github.com/mathquill/mathquill/wiki/%60dev%60-branch-(2014%E2%80%932015)-%E2%86%92-v0.10.0-Migration-Guide')
        }

        function u(e) {
            return l(), qe(e)
        }

        function d(t) {
            function n(e) {
                if (!e || !e.nodeType) return null;
                var t = A.getNodeOfElement(C(e).children(".dcg-mq-root-block")[0]),
                    n = t && t.controller;
                return n ? s[n.KIND_OF_MQ](n) : null
            }

            function o(e, t) {
                t && t.handlers && (t.handlers = {
                    fns: t.handlers,
                    APIClasses: s
                });
                for (var n in t)
                    if (t.hasOwnProperty(n)) {
                        var o = t[n],
                            r = M[n];
                        e[n] = r ? r(o) : o
                    }
            }
            if (!(U <= t && t <= G)) throw "Only interface versions between " + U + " and " + G + " supported. You specified: " + t;
            var s = {};
            n.L = k, n.R = T, n.saneKeyboardEvents = H, n.config = function(e) {
                return o(R.p, e), this
            }, n.registerEmbed = function(e, t) {
                if (!/^[a-z][a-z0-9]*$/i.test(e)) throw "Embed name must start with letter and be only letters and digits";
                P[e] = t
            };
            var r = s.AbstractMathQuill = w(j, function(e) {
                e.init = function(e) {
                    this.__controller = e, this.__options = e.options, this.id = e.id, this.data = e.data
                }, e.__mathquillify = function(e) {
                    var t = this.__controller,
                        n = t.root,
                        o = t.container;
                    t.createTextarea();
                    var s = o.addClass(e).contents().detach();
                    n.jQ = C('<span class="dcg-mq-root-block"/>').appendTo(o), A.linkElementByBlockId(n.jQ[0], n.id), this.latex(s.text()), this.revert = function() {
                        return o.empty().unbind(".mathquill").removeClass("dcg-mq-editable-field dcg-mq-math-mode dcg-mq-text-mode").append(s)
                    }
                }, e.config = function(e) {
                    return o(this.__options, e), this
                }, e.el = function() {
                    return this.__controller.container[0]
                }, e.text = function() {
                    return this.__controller.exportText()
                }, e.mathspeak = function() {
                    return this.__controller.exportMathSpeak()
                }, e.latex = function(e) {
                    return arguments.length > 0 ? (this.__controller.renderLatexMath(e), this.__controller.blurred && this.__controller.cursor.hide().parent.blur(), this) : this.__controller.exportLatex()
                }, e.html = function() {
                    return this.__controller.root.jQ.html().replace(/ mathquill-(?:command|block)-id="?\d+"?/g, "").replace(/<span class="?dcg-mq-cursor( dcg-mq-blink)?"?>.?<\/span>/i, "").replace(/ dcg-mq-hasCursor|dcg-mq-hasCursor ?/, "").replace(/ class=(""|(?= |>))/g, "")
                }, e.reflow = function() {
                    return this.__controller.root.postOrder(function(e) {
                        e.reflow()
                    }), this
                }
            });
            n.prototype = r.prototype, s.EditableField = w(r, function(t, n) {
                t.__mathquillify = function() {
                    return n.__mathquillify.apply(this, arguments), this.__controller.editable = !0, this.__controller.delegateMouseEvents(), this.__controller.editablesTextareaEvents(), this
                }, t.focus = function() {
                    return this.__controller.textarea.focus(), this.__controller.scrollHoriz(), this
                }, t.blur = function() {
                    return this.__controller.textarea.blur(), this
                }, t.write = function(e) {
                    return this.__controller.writeLatex(e), this.__controller.scrollHoriz(), this.__controller.blurred && this.__controller.cursor.hide().parent.blur(), this
                }, t.cmd = function(e) {
                    var t = this.__controller.notify(),
                        n = t.cursor;
                    if (/^\\[a-z]+$/i.test(e)) {
                        e = e.slice(1);
                        var o = L[e];
                        o && (e = o(e), n.selection && e.replaces(n.replaceSelection()), e.createLeftOf(n.show()))
                    } else n.parent.write(n, e);
                    return t.scrollHoriz(), t.blurred && n.hide().parent.blur(), this
                }, t.select = function() {
                    var e = this.__controller;
                    for (e.notify("move").cursor.insAtRightEnd(e.root); e.cursor[k];) e.selectLeft();
                    return this
                }, t.clearSelection = function() {
                    return this.__controller.cursor.clearSelection(), this
                }, t.moveToDirEnd = function(e) {
                    return this.__controller.notify("move").cursor.insAtDirEnd(e, this.__controller.root), this
                }, t.moveToLeftEnd = function() {
                    return this.moveToDirEnd(k)
                }, t.moveToRightEnd = function() {
                    return this.moveToDirEnd(T)
                }, t.keystroke = function(t, n) {
                    for (var t = t.replace(/^\s+|\s+$/g, "").split(/\s+/), o = 0; o < t.length; o += 1) this.__controller.keystroke(t[o], n || {
                        preventDefault: e
                    });
                    return this
                }, t.typedText = function(e) {
                    for (var t = 0; t < e.length; t += 1) this.__controller.typedText(e.charAt(t));
                    return this
                }, t.dropEmbedded = function(e, t, n) {
                    var o = e - C(window).scrollLeft(),
                        s = t - C(window).scrollTop(),
                        r = document.elementFromPoint(o, s);
                    this.__controller.seek(C(r), e, t), Ie().setOptions(n).createLeftOf(this.__controller.cursor)
                }, t.setAriaLabel = function(e) {
                    return this.__controller.ariaLabel = e && "string" == typeof e && "" != e ? e : "Math Input", this
                }, t.getAriaLabel = function() {
                    return this.__controller.ariaLabel || "Math Input"
                }, t.setAriaPostLabel = function(e, t) {
                    var n = this.__controller;
                    return e && "string" == typeof e && "" != e ? (e !== n.ariaPostLabel && "number" == typeof t && (this.ariaAlertTimeout && clearTimeout(this.ariaAlertTimeout), this.ariaAlertTimeout = setTimeout(function() {
                        C(document.activeElement).closest(C(n.container)).length && z.alert(this.mathspeak().trim() + " " + e.trim())
                    }.bind(this), t)), n.ariaPostLabel = e) : (this.ariaAlertTimeout && clearTimeout(this.ariaAlertTimeout), n.ariaPostLabel = ""), this
                }, t.getAriaPostLabel = function() {
                    return this.__controller.ariaPostLabel || ""
                }, t.clickAt = function(e, t, n) {
                    n = n || document.elementFromPoint(e, t);
                    var o = this.__controller,
                        s = o.root;
                    return y.contains(s.jQ[0], n) || (n = s.jQ[0]), o.seek(C(n), e + pageXOffset, t + pageYOffset), o.blurred && this.focus(), this
                }, t.ignoreNextMousedown = function(e) {
                    return this.__controller.cursor.options.ignoreNextMousedown = e, this
                }
            }), n.EditableField = function() {
                throw "wtf don't call me, I'm 'abstract'"
            }, n.EditableField.prototype = s.EditableField.prototype;
            for (var c in N) ! function(e, o) {
                var r = s[e] = o(s);
                n[e] = function(o, s) {
                    var c = n(o);
                    if (c instanceof r || !o || !o.nodeType) return c;
                    var a = F(r.RootBlock(), C(o), R());
                    return a.KIND_OF_MQ = e, r(a).__mathquillify(s, t)
                }, n[e].prototype = r.prototype
            }(c, N[c]);
            return n
        }

        function p(e) {
            for (var t = "moveOutOf deleteOutOf selectOutOf upOutOf downOutOf".split(" "), n = 0; n < t.length; n += 1) ! function(t) {
                e[t] = function(e) {
                    this.controller.handle(t, e)
                }
            }(t[n]);
            e.reflow = function() {
                this.controller.handle("reflow"), this.controller.handle("edited"), this.controller.handle("edit")
            }
        }

        function m(e) {
            var t = this.parent,
                n = e;
            do {
                if (n[T]) return e.insLeftOf(t);
                n = n.parent.parent
            } while (n !== t);
            e.insRightOf(t)
        }

        function f(e, t) {
            e.jQadd = function() {
                t.jQadd.apply(this, arguments), this.delimjQs = this.jQ.children(":first").add(this.jQ.children(":last")), this.contentjQ = this.jQ.children(":eq(1)")
            }
        }

        function h(e, n, o) {
            var n = n || e,
                s = De[e],
                r = De[n];
            O[e] = t(Ae, k, e, s, n, r), O[s] = t(Ae, T, e, s, n, r), Le[e] = Le[s] = o
        }
        var g, y = window.jQuery,
            v = Math.min,
            E = Math.max;
        if (!y) throw "MathQuill requires jQuery 1.5.2+ to be loaded first";
        var b = [].slice,
            w = function(e, t, n) {
                function o(e) {
                    return "object" == typeof e
                }

                function s(e) {
                    return "function" == typeof e
                }

                function r() {}
                return function e(n, c) {
                    function a() {
                        var e = new i;
                        return s(e.init) && e.init.apply(e, arguments), e
                    }

                    function i() {}
                    void 0 === c && (c = n, n = Object), a.Bare = i;
                    var l, u = r.prototype = n.prototype,
                        d = i.prototype = a.prototype = a.p = new r;
                    return d.constructor = a, a.extend = function(t) {
                        return e(a, t)
                    }, (a.open = function(e) {
                        if (l = {}, s(e) ? l = e.call(a, d, u, a, n) : o(e) && (l = e), o(l))
                            for (var r in l) t.call(l, r) && (d[r] = l[r]);
                        return s(d.init) || (d.init = n), a
                    })(c)
                }
            }(0, {}.hasOwnProperty),
            k = -1,
            T = 1,
            C = w(y, function(e) {
                e.insDirOf = function(e, t) {
                    return e === k ? this.insertBefore(t.first()) : this.insertAfter(t.last())
                }, e.insAtDirEnd = function(e, t) {
                    return e === k ? this.prependTo(t) : this.appendTo(t)
                }
            }),
            x = w(function(e) {
                e.parent = 0, e[k] = 0, e[T] = 0, e.init = function(e, t, n) {
                    this.parent = e, this[k] = t, this[T] = n
                }, this.copy = function(e) {
                    return x(e.parent, e[k], e[T])
                }
            }),
            S = {},
            _ = !1,
            A = w(function(e) {
                function t() {
                    return n += 1
                }
                e[k] = 0, e[T] = 0, e.parent = 0;
                var n = 0;
                this.getNodeOfElement = function(e) {
                    if (e) {
                        if (!e.nodeType) throw new Error("must pass an HTMLElement to Node.getNodeOfElement");
                        return e.mqBlockNode || e.mqCmdNode
                    }
                }, this.linkElementByBlockId = function(e, t) {
                    A.linkElementByBlockNode(e, S[t])
                }, this.linkElementByBlockNode = function(e, t) {
                    e.mqBlockNode = t
                }, this.linkElementByCmdNode = function(e, t) {
                    e.mqCmdNode = t
                }, e.init = function() {
                    this.id = t(), S[n] = this, s(), this.ends = {}, this.ends[k] = 0, this.ends[T] = 0
                }, e.toString = function() {
                    return "{{ MathQuill Node #" + this.id + " }}"
                }, e.jQ = C(), e.jQadd = function(e) {
                    return this.jQ = this.jQ.add(e)
                }, e.jQize = function(e) {
                    function t(e) {
                        if (e.getAttribute) {
                            var n = e.getAttribute("mathquill-command-id");
                            if (n) {
                                e.removeAttribute("mathquill-command-id");
                                var o = S[n];
                                o.jQadd(e), A.linkElementByCmdNode(e, o)
                            }
                            var s = e.getAttribute("mathquill-block-id");
                            if (s) {
                                e.removeAttribute("mathquill-block-id");
                                var r = S[s];
                                r.jQadd(e), A.linkElementByBlockNode(e, r)
                            }
                        }
                        for (e = e.firstChild; e; e = e.nextSibling) t(e)
                    }
                    for (var e = C(e || this.html()), n = 0; n < e.length; n += 1) t(e[n]);
                    return e
                }, e.createDir = function(e, t) {
                    o(e);
                    var n = this;
                    return n.jQize(), n.jQ.insDirOf(e, t.jQ), t[e] = n.adopt(t.parent, t[k], t[T]), n
                }, e.createLeftOf = function(e) {
                    return this.createDir(k, e)
                }, e.selectChildren = function(e, t) {
                    return q(e, t)
                }, e.bubble = function(e) {
                    for (var t = this; t; t = t.parent) {
                        if (!1 === e(t)) break
                    }
                    return this
                }, e.postOrder = function(e) {
                    return function t(n) {
                        n.eachChild(t), e(n)
                    }(this), this
                }, e.isEmpty = function() {
                    return 0 === this.ends[k] && 0 === this.ends[T]
                }, e.isEmptyParens = function() {
                    return !!this.isEmpty() && (!!this.parent && "\\left(" === this.parent.ctrlSeq)
                }, e.isStyleBlock = function() {
                    return !1
                }, e.children = function() {
                    return D(this.ends[k], this.ends[T])
                }, e.eachChild = function(e) {
                    return c(this.ends, e), this
                }, e.foldChildren = function(e, t) {
                    return a(this.ends, e, t)
                }, e.withDirAdopt = function(e, t, n, o) {
                    return D(this, this).withDirAdopt(e, t, n, o), this
                }, e.adopt = function(e, t, n) {
                    return D(this, this).adopt(e, t, n), this
                }, e.disown = function() {
                    return D(this, this).disown(), this
                }, e.remove = function() {
                    return this.jQ.remove(), this.disown()
                }, e.isParentSimpleSubscript = function() {
                    return !!this.parent && (this.parent.parent instanceof we && !!this.parent.jQ.hasClass("dcg-mq-sub"))
                }, e.finalizeTree = function() {}, e.contactWeld = function() {}, e.blur = function() {}, e.intentionalBlur = function() {}, e.reflow = function() {}, e.registerInnerField = function() {}
            }),
            D = w(function(e) {
                e.init = function(e, t, s) {
                    if (s === g && (s = k), o(s), n("no half-empty fragments", !e == !t), this.ends = {}, e) {
                        n("withDir is passed to Fragment", e instanceof A), n("oppDir is passed to Fragment", t instanceof A), n("withDir and oppDir have the same parent", e.parent === t.parent), this.ends[s] = e, this.ends[-s] = t;
                        var r = this.fold([], function(e, t) {
                            return e.push.apply(e, t.jQ.get()), e
                        });
                        this.jQ = this.jQ.add(r)
                    }
                }, e.jQ = C(), e.withDirAdopt = function(e, t, n, o) {
                    return e === k ? this.adopt(t, n, o) : this.adopt(t, o, n)
                }, e.adopt = function(e, t, n) {
                    i(e, t, n);
                    var o = this;
                    o.disowned = !1;
                    var s = o.ends[k];
                    if (!s) return this;
                    var r = o.ends[T];
                    return t || (e.ends[k] = s), n ? n[k] = r : e.ends[T] = r, o.ends[T][T] = n, o.each(function(n) {
                        n[k] = t, n.parent = e, t && (t[T] = n), t = n
                    }), o
                }, e.disown = function() {
                    var e = this,
                        t = e.ends[k];
                    if (!t || e.disowned) return e;
                    e.disowned = !0;
                    var n = e.ends[T],
                        o = t.parent;
                    return i(o, t[k], t), i(o, n, n[T]), t[k] ? t[k][T] = n[T] : o.ends[k] = n[T], n[T] ? n[T][k] = t[k] : o.ends[T] = t[k], e
                }, e.remove = function() {
                    return this.jQ.remove(), this.disown()
                }, e.each = function(e) {
                    return c(this.ends, e), this
                }, e.fold = function(e, t) {
                    return a(this.ends, e, t)
                }
            }),
            L = {},
            O = {},
            I = w(x, function(e) {
                e.init = function(e, t, n) {
                    this.controller = n, this.parent = e, this.options = t;
                    var o = this.jQ = this._jQ = C('<span class="dcg-mq-cursor">&#8203;</span>');
                    this.blink = function() {
                        o.toggleClass("dcg-mq-blink")
                    }, this.upDownCache = {}
                }, e.show = function() {
                    return this.jQ = this._jQ.removeClass("dcg-mq-blink"), "intervalId" in this ? clearInterval(this.intervalId) : (this[T] ? this.selection && this.selection.ends[k][k] === this[k] ? this.jQ.insertBefore(this.selection.jQ) : this.jQ.insertBefore(this[T].jQ.first()) : this.jQ.appendTo(this.parent.jQ), this.parent.focus()), this.intervalId = setInterval(this.blink, 500), this
                }, e.hide = function() {
                    return "intervalId" in this && clearInterval(this.intervalId), delete this.intervalId, this.jQ.detach(), this.jQ = C(), this
                }, e.withDirInsertAt = function(e, t, n, o) {
                    var s = this.parent;
                    this.parent = t, this[e] = n, this[-e] = o, s !== t && s.blur && s.blur(this)
                }, e.insDirOf = function(e, t) {
                    return o(e), this.jQ.insDirOf(e, t.jQ), this.withDirInsertAt(e, t.parent, t[e], t), this.parent.jQ.addClass("dcg-mq-hasCursor"), this
                }, e.insLeftOf = function(e) {
                    return this.insDirOf(k, e)
                }, e.insRightOf = function(e) {
                    return this.insDirOf(T, e)
                }, e.insAtDirEnd = function(e, t) {
                    return o(e), this.jQ.insAtDirEnd(e, t.jQ), this.withDirInsertAt(e, t, 0, t.ends[e]), t.focus(), this
                }, e.insAtLeftEnd = function(e) {
                    return this.insAtDirEnd(k, e)
                }, e.insAtRightEnd = function(e) {
                    return this.insAtDirEnd(T, e)
                }, e.jumpUpDown = function(e, t) {
                    var n = this;
                    n.upDownCache[e.id] = x.copy(n);
                    var o = n.upDownCache[t.id];
                    if (o) o[T] ? n.insLeftOf(o[T]) : n.insAtRightEnd(o.parent);
                    else {
                        var s = n.offset().left;
                        t.seek(s, n)
                    }
                    z.queue(t, !0)
                }, e.offset = function() {
                    var e = this,
                        t = e.jQ.removeClass("dcg-mq-cursor").offset();
                    return e.jQ.addClass("dcg-mq-cursor"), t
                }, e.unwrapGramp = function() {
                    var e = this.parent.parent,
                        t = e.parent,
                        n = e[T],
                        o = this,
                        s = e[k];
                    if (e.disown().eachChild(function(o) {
                            o.isEmpty() || (o.children().adopt(t, s, n).each(function(t) {
                                t.jQ.insertBefore(e.jQ.first())
                            }), s = o.ends[T])
                        }), !this[T])
                        if (this[k]) this[T] = this[k][T];
                        else
                            for (; !this[T];) {
                                if (this.parent = this.parent[T], !this.parent) {
                                    this[T] = e[T], this.parent = t;
                                    break
                                }
                                this[T] = this.parent.ends[k]
                            }
                    this[T] ? this.insLeftOf(this[T]) : this.insAtRightEnd(t), e.jQ.remove(), e[k].siblingDeleted && e[k].siblingDeleted(o.options, T), e[T].siblingDeleted && e[T].siblingDeleted(o.options, k)
                }, e.startSelection = function() {
                    for (var e = this.anticursor = x.copy(this), t = e.ancestors = {}, n = e; n.parent; n = n.parent) t[n.parent.id] = n
                }, e.endSelection = function() {
                    delete this.anticursor
                }, e.select = function() {
                    var e = this.anticursor;
                    if (this[k] === e[k] && this.parent === e.parent) return !1;
                    for (var t = this; t.parent; t = t.parent)
                        if (t.parent.id in e.ancestors) {
                            var o = t.parent;
                            break
                        } n("cursor and anticursor in the same tree", o);
                    var s, r, c = e.ancestors[o.id],
                        a = T;
                    if (t[k] !== c)
                        for (var i = t; i; i = i[T])
                            if (i[T] === c[T]) {
                                a = k, s = t, r = c;
                                break
                            } return a === T && (s = c, r = t), s instanceof x && (s = s[T]), r instanceof x && (r = r[k]), this.hide().selection = o.selectChildren(s, r), this.insDirOf(a, this.selection.ends[a]), this.selectionChanged(), !0
                }, e.resetToEnd = function(e) {
                    this.clearSelection();
                    var t = e.root;
                    this[T] = 0, this[k] = t.ends[T], this.parent = t
                }, e.clearSelection = function() {
                    return this.selection && (this.selection.clear(), delete this.selection, this.selectionChanged()), this
                }, e.deleteSelection = function() {
                    this.selection && (this[k] = this.selection.ends[k][k], this[T] = this.selection.ends[T][T], this.selection.remove(), this.selectionChanged(), delete this.selection)
                }, e.replaceSelection = function() {
                    var e = this.selection;
                    return e && (this[k] = e.ends[k][k], this[T] = e.ends[T][T], delete this.selection), e
                }
            }),
            q = w(D, function(e, t) {
                e.init = function() {
                    t.init.apply(this, arguments), this.jQ = this.jQ.wrapAll('<span class="dcg-mq-selection"></span>').parent()
                }, e.adopt = function() {
                    return this.jQ.replaceWith(this.jQ = this.jQ.children()), t.adopt.apply(this, arguments)
                }, e.clear = function() {
                    return this.jQ.replaceWith(this.jQ[0].childNodes), this
                }, e.join = function(e, t) {
                    var n = t || "";
                    return this.fold("", function(t, o) {
                        return t + n + o[e]()
                    })
                }
            }),
            F = w(function(e) {
                e.init = function(e, t, n) {
                    this.id = e.id, this.data = {}, this.root = e, this.container = t, this.options = n, this.ariaLabel = "Math Input", this.ariaPostLabel = "", e.controller = this, this.cursor = e.cursor = I(e, n, this)
                }, e.handle = function(e, t) {
                    var n = this.options.handlers;
                    if (n && n.fns[e]) {
                        var o = n.APIClasses[this.KIND_OF_MQ](this);
                        t === k || t === T ? n.fns[e](t, o) : n.fns[e](o)
                    }
                };
                var t = [];
                this.onNotify = function(e) {
                    t.push(e)
                }, e.notify = function() {
                    for (var e = 0; e < t.length; e += 1) t[e].apply(this.cursor, arguments);
                    return this
                }
            }),
            N = {},
            R = w(),
            M = {},
            j = w(),
            P = {};
        u.prototype = j.p, u.VERSION = "v0.10.1", u.interfaceVersion = function(e) {
            if (1 !== e) throw "Only interface version 1 supported. You specified: " + e;
            return l = function() {
                window.console && console.warn('You called MathQuill.interfaceVersion(1); to specify the interface version, which will fail in v1.0.0. You can fix this easily by doing this before doing anything else:\n\n    MathQuill = MathQuill.getInterface(1);\n    // now MathQuill.MathField() works like it used to\n\nSee also the "`dev` branch (2014–2015) → v0.10.0 Migration Guide" at\n  https://github.com/mathquill/mathquill/wiki/%60dev%60-branch-(2014%E2%80%932015)-%E2%86%92-v0.10.0-Migration-Guide')
            }, l(), u
        }, u.getInterface = d;
        var U = d.MIN = 1,
            G = d.MAX = 2;
        u.noConflict = function() {
            return window.MathQuill = B, u
        };
        var B = window.MathQuill;
        window.MathQuill = u;
        var H = function() {
                function t(e) {
                    var t, o = e.which || e.keyCode,
                        s = n[o],
                        r = [];
                    return e.ctrlKey && r.push("Ctrl"), e.originalEvent && e.originalEvent.metaKey && r.push("Meta"), e.altKey && r.push("Alt"), e.shiftKey && r.push("Shift"), t = s || String.fromCharCode(o), r.length || s ? (r.push(t), r.join("-")) : t
                }
                var n = {
                    8: "Backspace",
                    9: "Tab",
                    10: "Enter",
                    13: "Enter",
                    16: "Shift",
                    17: "Control",
                    18: "Alt",
                    20: "CapsLock",
                    27: "Esc",
                    32: "Spacebar",
                    33: "PageUp",
                    34: "PageDown",
                    35: "End",
                    36: "Home",
                    37: "Left",
                    38: "Up",
                    39: "Right",
                    40: "Down",
                    45: "Insert",
                    46: "Del",
                    144: "NumLock"
                };
                return function(n, o) {
                    function s(e) {
                        C = e, clearTimeout(E), E = setTimeout(e)
                    }

                    function r(t) {
                        s(function(n) {
                            C = e, clearTimeout(E), t(n)
                        })
                    }

                    function c() {
                        try {
                            k[0].select()
                        } catch (e) {}
                    }

                    function a(t) {
                        C(), C = e, clearTimeout(E), k.val(t), t && c(), x = !!t
                    }

                    function i() {
                        var e = k[0];
                        return "selectionStart" in e && e.selectionStart !== e.selectionEnd
                    }

                    function l() {
                        o.options && o.options.overrideKeystroke ? o.options.overrideKeystroke(t(b), b) : o.keystroke(t(b), b)
                    }

                    function u(e) {
                        b = e, w = null, x && r(function(e) {
                            e && "focusout" === e.type || c()
                        }), l()
                    }

                    function d(e) {
                        if (!e || !e.originalEvent) return !1;
                        switch (e.originalEvent.key) {
                            case "ArrowRight":
                            case "ArrowLeft":
                            case "ArrowDown":
                            case "ArrowUp":
                                return !0
                        }
                        return !1
                    }

                    function p(e) {
                        b && w && l(), w = e, d(e) || s(f)
                    }

                    function m(e) {
                        b && !w && (d(e) || s(f))
                    }

                    function f() {
                        if (!i()) {
                            var e = k.val();
                            1 === e.length ? (k.val(""), o.options && o.options.overrideTypedText ? o.options.overrideTypedText(e) : o.typedText(e)) : e && c()
                        }
                    }

                    function h() {
                        b = null, w = null, C = e, clearTimeout(E), k.val("")
                    }

                    function g(e) {
                        k.focus(), s(v)
                    }

                    function v() {
                        var e = k.val();
                        k.val(""), e && o.paste(e)
                    }
                    var E, b = null,
                        w = null,
                        k = y(n),
                        T = y(o.container || k),
                        C = e;
                    T.bind("keydown keypress input keyup paste", function(e) {
                        C(e)
                    });
                    var x = !1;
                    return o.options && o.options.disableCopyPaste ? T.bind({
                        keydown: u,
                        keypress: p,
                        keyup: m,
                        focusout: h,
                        copy: function(e) {
                            e.preventDefault()
                        },
                        cut: function(e) {
                            e.preventDefault()
                        },
                        paste: function(e) {
                            e.preventDefault()
                        }
                    }) : T.bind({
                        keydown: u,
                        keypress: p,
                        keyup: m,
                        focusout: h,
                        cut: function() {
                            r(function() {
                                o.cut()
                            })
                        },
                        copy: function() {
                            r(function() {
                                o.copy()
                            })
                        },
                        paste: g
                    }), {
                        select: a
                    }
                }
            }(),
            W = w(function(e, t, o) {
                function s(e, t) {
                    throw e = e ? "'" + e + "'" : "EOF", "Parse Error: " + t + " at " + e
                }
                e.init = function(e) {
                    this._ = e
                }, e.parse = function(e) {
                    function t(e, t) {
                        return t
                    }
                    return this.skip(a)._("" + e, t, s)
                }, e.or = function(e) {
                    n("or is passed a parser", e instanceof o);
                    var t = this;
                    return o(function(n, o, s) {
                        function r(t) {
                            return e._(n, o, s)
                        }
                        return t._(n, o, r)
                    })
                }, e.then = function(e) {
                    var t = this;
                    return o(function(s, r, c) {
                        function a(t, s) {
                            var a = e instanceof o ? e : e(s);
                            return n("a parser is returned", a instanceof o), a._(t, r, c)
                        }
                        return t._(s, a, c)
                    })
                }, e.many = function() {
                    var e = this;
                    return o(function(t, n, o) {
                        function s(e, n) {
                            return t = e, c.push(n), !0
                        }

                        function r() {
                            return !1
                        }
                        for (var c = []; e._(t, s, r););
                        return n(t, c)
                    })
                }, e.times = function(e, t) {
                    arguments.length < 2 && (t = e);
                    var n = this;
                    return o(function(o, s, r) {
                        function c(e, t) {
                            return u.push(t), o = e, !0
                        }

                        function a(e, t) {
                            return l = t, o = e, !1
                        }

                        function i(e, t) {
                            return !1
                        }
                        for (var l, u = [], d = !0, p = 0; p < e; p += 1)
                            if (!(d = n._(o, c, a))) return r(o, l);
                        for (; p < t && d; p += 1) d = n._(o, c, i);
                        return s(o, u)
                    })
                }, e.result = function(e) {
                    return this.then(c(e))
                }, e.atMost = function(e) {
                    return this.times(0, e)
                }, e.atLeast = function(e) {
                    var t = this;
                    return t.times(e).then(function(e) {
                        return t.many().map(function(t) {
                            return e.concat(t)
                        })
                    })
                }, e.map = function(e) {
                    return this.then(function(t) {
                        return c(e(t))
                    })
                }, e.skip = function(e) {
                    return this.then(function(t) {
                        return e.result(t)
                    })
                };
                var r = (this.string = function(e) {
                        var t = e.length,
                            n = "expected '" + e + "'";
                        return o(function(o, s, r) {
                            var c = o.slice(0, t);
                            return c === e ? s(o.slice(t), c) : r(o, n)
                        })
                    }, this.regex = function(e) {
                        n("regexp parser is anchored", "^" === e.toString().charAt(1));
                        var t = "expected " + e;
                        return o(function(n, o, s) {
                            var r = e.exec(n);
                            if (r) {
                                var c = r[0];
                                return o(n.slice(c.length), c)
                            }
                            return s(n, t)
                        })
                    }),
                    c = o.succeed = function(e) {
                        return o(function(t, n) {
                            return n(t, e)
                        })
                    },
                    a = (o.fail = function(e) {
                        return o(function(t, n, o) {
                            return o(t, e)
                        })
                    }, o.letter = r(/^[a-z]/i), o.letters = r(/^[a-z]*/i), o.digit = r(/^[0-9]/), o.digits = r(/^[0-9]*/), o.whitespace = r(/^\s+/), o.optWhitespace = r(/^\s*/), o.any = o(function(e, t, n) {
                        return e ? t(e.slice(1), e.charAt(0)) : n(e, "expected any character")
                    }), o.all = o(function(e, t, n) {
                        return t("", e)
                    }), o.eof = o(function(e, t, n) {
                        return e ? n(e, "expected EOF") : t(e, e)
                    }))
            });
        F.open(function(e) {
            this.onNotify(function(e) {
                if ("edit" === e || "replace" === e || e === g) {
                    var t = this.controller;
                    if (!t) return;
                    if (!t.options.enableDigitGrouping) return;
                    if (!1 !== t.blurred) return;
                    t.disableGroupingForSeconds(1)
                }
            }), e.disableGroupingForSeconds = function(e) {
                clearTimeout(this.__disableGroupingTimeout);
                var t = this.root.jQ;
                0 === e ? t.removeClass("dcg-mq-suppress-grouping") : (t.addClass("dcg-mq-suppress-grouping"), this.__disableGroupingTimeout = setTimeout(function() {
                    t.removeClass("dcg-mq-suppress-grouping")
                }, 1e3 * e))
            }, e.focusBlurEvents = function() {
                function e() {
                    clearTimeout(o), c.selection && c.selection.jQ.addClass("dcg-mq-blur"), t(), n()
                }

                function t() {
                    c.hide().parent.blur(), s.container.removeClass("dcg-mq-focused"), C(window).unbind("blur", e), s.options && s.options.resetCursorOnBlur && c.resetToEnd(s)
                }

                function n() {
                    var e = (s.ariaLabel + ": " + r.mathspeak() + " " + s.ariaPostLabel).trim();
                    z.jQ.empty(), s.textarea.attr("aria-label", e), s.container.attr("aria-label", e)
                }
                var o, s = this,
                    r = s.root,
                    c = s.cursor;
                s.textarea.focus(function() {
                    n(), s.blurred = !1, clearTimeout(o), s.container.addClass("dcg-mq-focused"), c.parent || c.insAtRightEnd(r), c.selection ? (c.selection.jQ.removeClass("dcg-mq-blur"), s.selectionChanged()) : c.show(), s.setOverflowClasses()
                }).blur(function() {
                    s.textareaSelectionTimeout && (clearTimeout(s.textareaSelectionTimeout), s.textareaSelectionTimeout = g), s.disableGroupingForSeconds(0), s.blurred = !0, o = setTimeout(function() {
                        r.postOrder(function(e) {
                            e.intentionalBlur()
                        }), c.clearSelection().endSelection(), t(), n(), s.scrollHoriz()
                    }), C(window).bind("blur", e)
                }), n(), s.blurred = !0, c.hide().parent.blur()
            }
        }), F.open(function(e, t) {
            e.exportText = function() {
                return this.root.foldChildren("", function(e, t) {
                    return e + t.text()
                })
            }
        }), F.open(function(t) {
            R.p.ignoreNextMousedown = e;
            var n;
            this.onNotify(function(e) {
                "edit" !== e && "replace" !== e || n && n.cursor === this && n.cb()
            }), t.delegateMouseEvents = function() {
                var t = this.root.jQ;
                this.container.bind("mousedown.mathquill", function(o) {
                    function s(e) {
                        y = C(e.target)
                    }

                    function r(e) {
                        p.anticursor || p.startSelection(), d.seek(y, e.pageX, e.pageY).cursor.select(), p.selection && z.clear().queue(p.selection.join("mathspeak") + " selected").alert(), y = g
                    }

                    function c(e) {
                        l.unbind("mousemove", s), C(e.target.ownerDocument).unbind("mousemove", r).unbind("mouseup", i), n = g
                    }

                    function a() {
                        d.editable ? (p.show(), z.queue(p.parent).alert()) : f.detach()
                    }

                    function i(e) {
                        p.blink = m, p.selection || a(), c(e)
                    }
                    var l = C(o.target).closest(".dcg-mq-root-block"),
                        u = A.getNodeOfElement(l[0]) || A.getNodeOfElement(t[0]),
                        d = u.controller,
                        p = d.cursor,
                        m = p.blink,
                        f = d.textareaSpan,
                        h = d.textarea;
                    if (o.preventDefault(), o.target.unselectable = !0, !p.options.ignoreNextMousedown(o)) {
                        p.options.ignoreNextMousedown = e;
                        var y, v;
                        n = {
                            cursor: p,
                            cb: function() {
                                v = !0, p.blink = m, p.clearSelection(), a(), c(o)
                            }
                        }, d.blurred && (d.editable || l.prepend(f), h.focus(), v) || (p.blink = e, d.seek(C(o.target), o.pageX, o.pageY).cursor.startSelection(), l.mousemove(s), C(o.target.ownerDocument).mousemove(r).mouseup(i))
                    }
                })
            }
        }), F.open(function(e) {
            e.seek = function(e, t, n) {
                for (var o, s = this.notify("select").cursor, r = e && e[0]; r && !(o = A.getNodeOfElement(r));) r = r.parentElement;
                return o || (o = this.root), s.clearSelection().show(), o.seek(t, s), this.scrollHoriz(), this
            }
        }), F.open(function(e) {
            e.keystroke = function(e, t) {
                this.cursor.parent.keystroke(e, t, this)
            }
        }), A.open(function(e) {
            e.keystroke = function(e, t, n) {
                var o = n.cursor;
                switch (e) {
                    case "Ctrl-Shift-Backspace":
                    case "Ctrl-Backspace":
                        n.ctrlDeleteDir(k);
                        break;
                    case "Shift-Backspace":
                    case "Backspace":
                        n.backspace();
                        break;
                    case "Esc":
                    case "Tab":
                        return void n.escapeDir(T, e, t);
                    case "Shift-Tab":
                    case "Shift-Esc":
                        return void n.escapeDir(k, e, t);
                    case "End":
                        n.notify("move").cursor.insAtRightEnd(o.parent), z.queue("end of").queue(o.parent, !0);
                        break;
                    case "Ctrl-End":
                        n.notify("move").cursor.insAtRightEnd(n.root), z.queue("end of").queue(n.ariaLabel).queue(n.root).queue(n.ariaPostLabel);
                        break;
                    case "Shift-End":
                        for (; o[T];) n.selectRight();
                        break;
                    case "Ctrl-Shift-End":
                        for (; o[T] || o.parent !== n.root;) n.selectRight();
                        break;
                    case "Home":
                        n.notify("move").cursor.insAtLeftEnd(o.parent), z.queue("beginning of").queue(o.parent, !0);
                        break;
                    case "Ctrl-Home":
                        n.notify("move").cursor.insAtLeftEnd(n.root), z.queue("beginning of").queue(n.ariaLabel).queue(n.root).queue(n.ariaPostLabel);
                        break;
                    case "Shift-Home":
                        for (; o[k];) n.selectLeft();
                        break;
                    case "Ctrl-Shift-Home":
                        for (; o[k] || o.parent !== n.root;) n.selectLeft();
                        break;
                    case "Left":
                        n.moveLeft();
                        break;
                    case "Shift-Left":
                        n.selectLeft();
                        break;
                    case "Ctrl-Left":
                        break;
                    case "Right":
                        n.moveRight();
                        break;
                    case "Shift-Right":
                        n.selectRight();
                        break;
                    case "Ctrl-Right":
                        break;
                    case "Up":
                        n.moveUp();
                        break;
                    case "Down":
                        n.moveDown();
                        break;
                    case "Shift-Up":
                        if (o[k])
                            for (; o[k];) n.selectLeft();
                        else n.selectLeft();
                    case "Shift-Down":
                        if (o[T])
                            for (; o[T];) n.selectRight();
                        else n.selectRight();
                    case "Ctrl-Up":
                    case "Ctrl-Down":
                        break;
                    case "Ctrl-Shift-Del":
                    case "Ctrl-Del":
                        n.ctrlDeleteDir(T);
                        break;
                    case "Shift-Del":
                    case "Del":
                        n.deleteForward();
                        break;
                    case "Meta-A":
                    case "Ctrl-A":
                        for (n.notify("move").cursor.insAtRightEnd(n.root); o[k];) n.selectLeft();
                        break;
                    case "Ctrl-Alt-Up":
                        o.parent.parent && o.parent.parent instanceof A ? z.queue(o.parent.parent) : z.queue("nothing above");
                        break;
                    case "Ctrl-Alt-Down":
                        o.parent && o.parent instanceof A ? z.queue(o.parent) : z.queue("block is empty");
                        break;
                    case "Ctrl-Alt-Left":
                        o.parent.parent && o.parent.parent.ends && o.parent.parent.ends[k] && o.parent.parent.ends[k] instanceof A ? z.queue(o.parent.parent.ends[k]) : z.queue("nothing to the left");
                        break;
                    case "Ctrl-Alt-Right":
                        o.parent.parent && o.parent.parent.ends && o.parent.parent.ends[T] && o.parent.parent.ends[T] instanceof A ? z.queue(o.parent.parent.ends[T]) : z.queue("nothing to the right");
                        break;
                    case "Ctrl-Alt-Shift-Down":
                        o.selection ? z.queue(o.selection.join("mathspeak", " ").trim() + " selected") : z.queue("nothing selected");
                        break;
                    case "Ctrl-Alt-=":
                    case "Ctrl-Alt-Shift-Right":
                        n.ariaPostLabel.length ? z.queue(n.ariaPostLabel) : z.queue("no answer");
                        break;
                    default:
                        return
                }
                z.alert(), t.preventDefault(), n.scrollHoriz()
            }, e.moveOutOf = e.moveTowards = e.deleteOutOf = e.deleteTowards = e.unselectInto = e.selectOutOf = e.selectTowards = function() {
                n("overridden or never called on this node")
            }
        }), F.open(function(e) {
            function t(e, t) {
                var n = e.notify("upDown").cursor,
                    o = t + "Into",
                    s = t + "OutOf";
                return n[T][o] ? n.insAtLeftEnd(n[T][o]) : n[k][o] ? n.insAtRightEnd(n[k][o]) : n.parent.bubble(function(e) {
                    var t = e[s];
                    if (t && ("function" == typeof t && (t = e[s](n)), t instanceof A && n.jumpUpDown(e, t), !0 !== t)) return !1
                }), e
            }
            this.onNotify(function(e) {
                "move" !== e && "upDown" !== e || this.show().clearSelection()
            }), e.escapeDir = function(e, t, n) {
                o(e);
                var s = this.cursor;
                if (s.parent !== this.root && n.preventDefault(), s.parent !== this.root) return s.parent.moveOutOf(e, s), z.alert(), this.notify("move")
            }, M.leftRightIntoCmdGoes = function(e) {
                if (e && "up" !== e && "down" !== e) throw '"up" or "down" required for leftRightIntoCmdGoes option, got "' + e + '"';
                return e
            }, e.moveDir = function(e) {
                o(e);
                var t = this.cursor,
                    n = t.options.leftRightIntoCmdGoes;
                return t.selection ? t.insDirOf(e, t.selection.ends[e]) : t[e] ? t[e].moveTowards(e, t, n) : t.parent.moveOutOf(e, t, n), this.notify("move")
            }, e.moveLeft = function() {
                return this.moveDir(k)
            }, e.moveRight = function() {
                return this.moveDir(T)
            }, e.moveUp = function() {
                return t(this, "up")
            }, e.moveDown = function() {
                return t(this, "down")
            }, this.onNotify(function(e) {
                "upDown" !== e && (this.upDownCache = {})
            }), this.onNotify(function(e) {
                "edit" === e && this.show().deleteSelection()
            }), e.deleteDir = function(e) {
                o(e);
                var t = this.cursor,
                    n = t[e],
                    s = t.parent.parent;
                if (n && n instanceof A) n.sides ? z.queue(n.parent.chToCmd(n.sides[-e].ch).mathspeak({
                    createdLeftOf: t
                })) : n.blocks || "\\text" === n.parent.ctrlSeq || z.queue(n);
                else if (s && s instanceof A)
                    if (s.sides) z.queue(s.parent.chToCmd(s.sides[e].ch).mathspeak({
                        createdLeftOf: t
                    }));
                    else if (s.blocks && s.mathspeakTemplate)
                    if (s.upInto && s.downInto) z.queue(s.mathspeakTemplate[1]);
                    else {
                        var r = s.mathspeakTemplate,
                            c = e === k ? r[0] : r[r.length - 1];
                        z.queue(c)
                    }
                else z.queue(s);
                var a = t.selection;
                return this.notify("edit"), a || (t[e] ? t[e].deleteTowards(e, t) : t.parent.deleteOutOf(e, t)), t[k].siblingDeleted && t[k].siblingDeleted(t.options, T), t[T].siblingDeleted && t[T].siblingDeleted(t.options, k), t.parent.bubble(function(e) {
                    e.reflow()
                }), this
            }, e.ctrlDeleteDir = function(e) {
                o(e);
                var t = this.cursor;
                if (!t[e] || t.selection) return this.deleteDir(e);
                this.notify("edit");
                var n;
                return n = e === k ? D(t.parent.ends[k], t[k]) : D(t[T], t.parent.ends[T]), z.queue(n), n.remove(), t.insAtDirEnd(e, t.parent), t[k].siblingDeleted && t[k].siblingDeleted(t.options, T), t[T].siblingDeleted && t[T].siblingDeleted(t.options, k), t.parent.bubble(function(e) {
                    e.reflow()
                }), this
            }, e.backspace = function() {
                return this.deleteDir(k)
            }, e.deleteForward = function() {
                return this.deleteDir(T)
            }, this.onNotify(function(e) {
                "select" !== e && this.endSelection()
            }), e.selectDir = function(e) {
                var t = this.notify("select").cursor,
                    n = t.selection;
                o(e), t.anticursor || t.startSelection();
                var s = t[e];
                s ? n && n.ends[e] === s && t.anticursor[-e] !== s ? s.unselectInto(e, t) : s.selectTowards(e, t) : t.parent.selectOutOf(e, t), t.clearSelection(), t.select() || t.show(), t.selection && z.clear().queue(t.selection.join("mathspeak", " ").trim() + " selected")
            }, e.selectLeft = function() {
                return this.selectDir(k)
            }, e.selectRight = function() {
                return this.selectDir(T)
            }
        }), F.open(function(e) {
            R.p.substituteTextarea = function() {
                return C("<textarea autocapitalize=off autocomplete=off autocorrect=off spellcheck=false x-palm-disable-ste-all=true/>")[0]
            }, e.createTextarea = function() {
                var e = this.textareaSpan = C('<span class="dcg-mq-textarea"></span>'),
                    t = this.options.substituteTextarea();
                if (!t.nodeType) throw "substituteTextarea() must return a DOM element, got " + t;
                t = this.textarea = C(t).appendTo(e);
                var n = this;
                n.cursor.selectionChanged = function() {
                    n.selectionChanged()
                }
            }, e.selectionChanged = function() {
                var e = this;
                e.textareaSelectionTimeout === g && (e.textareaSelectionTimeout = setTimeout(function() {
                    e.setTextareaSelection()
                }))
            }, e.setTextareaSelection = function() {
                this.textareaSelectionTimeout = g;
                var e = "";
                this.cursor.selection && (e = this.cleanLatex(this.cursor.selection.join("latex")), this.options.statelessClipboard && (e = "$" + e + "$")), this.selectFn(e)
            }, e.staticMathTextareaEvents = function() {
                function e() {
                    r.detach(), t.blurred = !0
                }
                var t = this,
                    n = t.root,
                    o = t.cursor,
                    s = t.textarea,
                    r = t.textareaSpan;
                this.container.prepend('<span aria-hidden="true" class="dcg-mq-selectable">$' + t.exportLatex() + "$</span>"), t.blurred = !0, s.bind("cut paste", !1), t.options.disableCopyPaste ? s.bind("copy", !1) : s.bind("copy", function() {
                    t.setTextareaSelection()
                }), s.focus(function() {
                    t.blurred = !1
                }).blur(function() {
                    o.selection && o.selection.clear(), setTimeout(e)
                }), t.selectFn = function(e) {
                    s.val(e), e && s.select()
                };
                var c = t && "Math Input" !== t.ariaLabel ? t.ariaLabel + ": " : "";
                t.container.attr("aria-label", c + n.mathspeak().trim());
                var a = navigator.userAgent || navigator.vendor || window.opera,
                    i = /iPad|iPhone|iPod/.test(a) && !window.Stream; - 1 !== navigator.appVersion.indexOf("Mac") && !i || t.container.attr("role", "math")
            }, R.p.substituteKeyboardEvents = H, e.editablesTextareaEvents = function() {
                var e = this,
                    t = e.textarea,
                    n = e.textareaSpan,
                    o = this.options.substituteKeyboardEvents(t, this);
                this.selectFn = function(e) {
                    o.select(e)
                }, this.container.prepend(n), this.focusBlurEvents()
            }, e.typedText = function(e) {
                if ("\n" === e) return this.handle("enter");
                var t = this.notify().cursor;
                t.parent.write(t, e), this.scrollHoriz()
            }, e.cut = function() {
                var e = this,
                    t = e.cursor;
                t.selection && setTimeout(function() {
                    e.notify("edit"), t.parent.bubble(function(e) {
                        e.reflow()
                    }), e.options && e.options.onCut && e.options.onCut()
                })
            }, e.copy = function() {
                this.setTextareaSelection()
            }, e.paste = function(e) {
                this.options.statelessClipboard && (e = "$" === e.slice(0, 1) && "$" === e.slice(-1) ? e.slice(1, -1) : "\\text{" + e + "}"), this.writeLatex(e).cursor.show(), this.scrollHoriz(), this.options && this.options.onPaste && this.options.onPaste()
            }
        });
        var V = function() {
            function e(e) {
                var t = Z();
                return e.adopt(t, 0, 0), t
            }

            function t(e) {
                for (var t = e[0] || Z(), n = 1; n < e.length; n += 1) e[n].children().adopt(t, t.ends[T], 0);
                return t
            }
            var n = W.string,
                o = W.regex,
                s = W.letter,
                r = W.digit,
                c = W.any,
                a = W.optWhitespace,
                i = W.succeed,
                l = W.fail,
                u = s.map(function(e) {
                    return se(e)
                }),
                d = r.map(function(e) {
                    return ne(e)
                }),
                p = o(/^[^${}\\_^]/).map(function(e) {
                    return Y(e)
                }),
                m = o(/^[^\\a-eg-zA-Z]/).or(n("\\").then(o(/^[a-z]+/i).or(o(/^\s+/).result(" ")).or(c))).then(function(e) {
                    var t = L[e];
                    return t ? t(e).parser() : l("unknown command: \\" + e)
                }),
                f = m.or(u).or(d).or(p),
                h = n("{").then(function() {
                    return y
                }).skip(n("}")),
                g = a.then(h.or(f.map(e))),
                y = g.many().map(t).skip(a),
                v = n("[").then(g.then(function(e) {
                    return "]" !== e.join("latex") ? i(e) : l()
                }).many().map(t).skip(a)).skip(n("]")),
                E = y;
            return E.block = g, E.optBlock = v, E
        }();
        F.open(function(e, t) {
            e.cleanLatex = function(e) {
                return e.replace(/(\\[a-z]+) (?![a-z])/gi, "$1")
            }, e.exportLatex = function() {
                return this.cleanLatex(this.root.latex())
            }, e.writeLatex = function(e) {
                var t = this.notify("edit").cursor,
                    n = W.all,
                    o = W.eof,
                    s = V.skip(o).or(n.result(!1)).parse(e);
                if (s && !s.isEmpty()) {
                    s.children().adopt(t.parent, t[k], t[T]);
                    s.jQize().insertBefore(t.jQ), t[k] = s.ends[T], s.finalizeInsert(t.options, t), s.ends[T][T].siblingCreated && s.ends[T][T].siblingCreated(t.options, k), s.ends[k][k].siblingCreated && s.ends[k][k].siblingCreated(t.options, T), t.parent.bubble(function(e) {
                        e.reflow()
                    })
                }
                return this
            }, e.classifyLatexForEfficientUpdate = function(e) {
                if ("string" == typeof e) {
                    var t = e.match(/-?[0-9.]+$/g);
                    return t && 1 === t.length ? {
                        latex: e,
                        prefix: e.substr(0, e.length - t[0].length),
                        digits: t[0]
                    } : void 0
                }
            }, e.renderLatexMathEfficiently = function(e) {
                var t, n, o = this.classifyLatexForEfficientUpdate(e);
                if (!o) return !1;
                if (t = this.exportLatex(), !(n = this.classifyLatexForEfficientUpdate(t)) || n.prefix !== o.prefix) return !1;
                var s = this.root,
                    r = n.digits,
                    c = o.digits,
                    a = !1,
                    i = !1;
                "-" === r[0] && (a = !0, r = r.substr(1)), "-" === c[0] && (i = !0, c = c.substr(1));
                for (var l = this.root.ends[T], u = [], d = r.length - 1; d >= 0; d--) {
                    if (l.ctrlSeq !== r[d]) return !1;
                    if (l.parent !== s) return !1;
                    u.unshift(l), l = l[k]
                }
                if (a && !i) {
                    var p = l;
                    if ("-" !== p.ctrlSeq) return !1;
                    if (p[T] !== u[0]) return !1;
                    if (p.parent !== s) return !1;
                    if (p[k] && p[k].parent !== s) return !1;
                    u[0][k] = p[k], s.ends[k] === p && (s.ends[k] = u[0]), p[k] && (p[k][T] = u[0]), p.jQ.remove()
                }
                if (!a && i) {
                    var m = pe("-"),
                        f = document.createElement("span");
                    f.textContent = "-", m.jQ = C(f), u[0][k] && (u[0][k][T] = m), s.ends[k] === u[0] && (s.ends[k] = m), m.parent = s, m[k] = u[0][k], m[T] = u[0], u[0][k] = m, m.contactWeld(), m.jQ.insertBefore(u[0].jQ)
                }
                var h = Math.min(r.length, c.length);
                for (d = 0; d < h; d++) {
                    var g = c[d];
                    l = u[d], l.ctrlSeq !== g && (l.ctrlSeq = g, l.jQ[0].textContent = g, l.mathspeakName = g)
                }
                if (r.length > c.length)
                    for (l = u[c.length - 1], s.ends[T] = l, l[T] = 0, d = r.length - 1; d >= h; d--) u[d].jQ.remove();
                if (c.length > r.length) {
                    var y = document.createDocumentFragment();
                    for (d = h; d < c.length; d++) {
                        var v = document.createElement("span");
                        v.className = "dcg-mq-digit", v.textContent = c[d];
                        var E = ne(c[d]);
                        E.parent = s, E.jQ = C(v), y.appendChild(v), E[k] = s.ends[T], E[T] = 0, E[k][T] = E, s.ends[T] = E
                    }
                    s.jQ[0].appendChild(y)
                }
                var b = this.exportLatex();
                if (b !== e) return console.warn("tried updating latex efficiently but did not work. Attempted: " + e + " but wrote: " + b), !1;
                this.cursor.resetToEnd(this);
                var w = s.ends[T];
                return w.fixDigitGrouping && w.fixDigitGrouping(this.cursor.options), !0
            }, e.renderLatexMathFromScratch = function(e) {
                var t = this.root,
                    n = this.cursor,
                    o = W.all,
                    s = W.eof,
                    r = V.skip(s).or(o.result(!1)).parse(e);
                t.ends[k] = t.ends[T] = 0, r && r.children().adopt(t, 0, 0);
                var c = t.jQ;
                if (r) {
                    var a = r.join("html");
                    c.html(a), t.jQize(c.children()), t.finalizeInsert(n.options)
                } else c.empty();
                var i = this.ariaLabel && "Math Input" !== this.ariaLabel ? this.ariaLabel + ": " : "";
                this.container.attr("aria-label", i + t.mathspeak().trim()), delete n.selection, n.insAtRightEnd(t)
            }, e.renderLatexMath = function(e) {
                this.notify("replace"), this.renderLatexMathEfficiently(e) || this.renderLatexMathFromScratch(e)
            }, e.renderLatexText = function(e) {
                var t = this.root,
                    n = this.cursor;
                t.jQ.children().slice(1).remove(), t.ends[k] = t.ends[T] = 0, delete n.selection, n.show().insAtRightEnd(t);
                var o = W.regex,
                    s = W.string,
                    r = W.eof,
                    c = W.all,
                    a = s("$").then(V).skip(s("$").or(r)).map(function(e) {
                        var t = RootMathCommand(n);
                        t.createBlocks();
                        var o = t.ends[k];
                        return e.children().adopt(o, 0, 0), t
                    }),
                    i = s("\\$").result("$"),
                    l = i.or(o(/^[^$]/)).map(Y),
                    u = a.or(l).many(),
                    d = u.skip(r).or(c.result(!1)).parse(e);
                if (d) {
                    for (var p = 0; p < d.length; p += 1) d[p].adopt(t, t.ends[T], 0);
                    t.jQize().appendTo(t.jQ), t.finalizeInsert(n.options)
                }
            }
        }), F.open(function(e) {
            e.setOverflowClasses = function() {
                var e = this.root.jQ[0],
                    t = !1,
                    n = !1;
                if (!this.blurred) {
                    var o = e.getBoundingClientRect().width,
                        s = e.scrollWidth,
                        r = e.scrollLeft;
                    t = s > o + r, n = r > 0
                }
                e.classList.contains("dcg-mq-editing-overflow-right") !== t && e.classList.toggle("dcg-mq-editing-overflow-right"), e.classList.contains("dcg-mq-editing-overflow-left") !== n && e.classList.toggle("dcg-mq-editing-overflow-left")
            }, e.scrollHoriz = function() {
                var e = this.cursor,
                    t = e.selection,
                    n = this.root.jQ[0].getBoundingClientRect();
                if (!e.jQ[0] && !t) return void this.root.jQ.stop().animate({
                    scrollLeft: 0
                }, 100, function() {
                    this.setOverflowClasses()
                }.bind(this));
                if (t) {
                    var o = t.jQ[0].getBoundingClientRect(),
                        s = o.left - (n.left + 20),
                        r = o.right - (n.right - 20);
                    if (t.ends[k] === e[T])
                        if (s < 0) var c = s;
                        else {
                            if (!(r > 0)) return;
                            if (o.left - r < n.left + 20) var c = s;
                            else var c = r
                        }
                    else if (r > 0) var c = r;
                    else {
                        if (!(s < 0)) return;
                        if (o.right - s > n.right - 20) var c = r;
                        else var c = s
                    }
                } else {
                    var a = e.jQ[0].getBoundingClientRect().left;
                    if (a > n.right - 20) var c = a - (n.right - 20);
                    else {
                        if (!(a < n.left + 20)) return;
                        var c = a - (n.left + 20)
                    }
                }
                var i = this.root.jQ[0];
                c < 0 && 0 === i.scrollLeft || c > 0 && i.scrollWidth <= i.scrollLeft + n.width || this.root.jQ.stop().animate({
                    scrollLeft: "+=" + c
                }, 100, function() {
                    this.setOverflowClasses()
                }.bind(this))
            }
        });
        var Q = w(function(e) {
                e.init = function() {
                    this.jQ = y([]), y(document).ready(function() {
                        var e = ".dcg-mq-aria-alert";
                        y(e).length || y("body").append("<p aria-live='assertive' aria-atomic='true' class='dcg-mq-aria-alert'></p>"), this.jQ = y(e)
                    }.bind(this)), this.items = [], this.msg = ""
                }, e.queue = function(e, t) {
                    return e instanceof A && (e = t ? e.parent && e.parent.ariaLabel && "block" === e.ariaLabel ? e.parent.ariaLabel + " " + e.mathspeak() : e.ariaLabel ? e.ariaLabel + " " + e.mathspeak() : e.mathspeak() : e.mathspeak()), this.items.push(e), this
                }, e.queueDirOf = function(e) {
                    return o(e), this.queue(e === k ? "before" : "after")
                }, e.queueDirEndOf = function(e) {
                    return o(e), this.queue(e === k ? "beginning of" : "end of")
                }, e.alert = function(e) {
                    return e && this.queue(e), this.items.length && (this.msg = this.items.join(" ").replace(/ +(?= )/g, "").trim(), this.jQ.empty().text(this.msg)), this.clear()
                }, e.clear = function() {
                    return this.items.length = 0, this
                }
            }),
            z = Q();
        F.open(function(e) {
            e.aria = z, e.exportMathSpeak = function() {
                return this.root.mathspeak()
            }
        });
        var K = w(A, function(e, t) {
                e.finalizeInsert = function(e, t) {
                    var n = this;
                    n.postOrder(function(t) {
                        t.finalizeTree(e)
                    }), n.postOrder(function(e) {
                        e.contactWeld(t)
                    }), n.postOrder(function(e) {
                        e.blur()
                    }), n.postOrder(function(e) {
                        e.reflow()
                    }), n[T].siblingCreated && n[T].siblingCreated(e, k), n[k].siblingCreated && n[k].siblingCreated(e, T), n.bubble(function(e) {
                        e.reflow()
                    })
                }
            }),
            $ = w(K, function(e, t) {
                e.init = function(e, n, o) {
                    var s = this;
                    t.init.call(s), s.ctrlSeq || (s.ctrlSeq = e), n && (s.htmlTemplate = n), o && (s.textTemplate = o)
                }, e.replaces = function(e) {
                    e.disown(), this.replacedFragment = e
                }, e.isEmpty = function() {
                    return this.foldChildren(!0, function(e, t) {
                        return e && t.isEmpty()
                    })
                }, e.parser = function() {
                    var e = V.block,
                        t = this;
                    return e.times(t.numBlocks()).map(function(e) {
                        t.blocks = e;
                        for (var n = 0; n < e.length; n += 1) e[n].adopt(t, t.ends[T], 0);
                        return t
                    })
                }, e.createLeftOf = function(e) {
                    var n = this,
                        o = n.replacedFragment;
                    n.createBlocks(), t.createLeftOf.call(n, e), o && (o.adopt(n.ends[k], 0, 0), o.jQ.appendTo(n.ends[k].jQ)), n.finalizeInsert(e.options), n.placeCursor(e)
                }, e.createBlocks = function() {
                    for (var e = this, t = e.numBlocks(), n = e.blocks = Array(t), o = 0; o < t; o += 1) {
                        (n[o] = Z()).adopt(e, e.ends[T], 0)
                    }
                }, e.placeCursor = function(e) {
                    e.insAtRightEnd(this.foldChildren(this.ends[k], function(e, t) {
                        return e.isEmpty() ? e : t
                    }))
                }, e.moveTowards = function(e, t, n) {
                    var o = n && this[n + "Into"];
                    t.insAtDirEnd(-e, o || this.ends[-e]), z.queueDirEndOf(-e).queue(t.parent, !0)
                }, e.deleteTowards = function(e, t) {
                    this.isEmpty() ? t[e] = this.remove()[e] : this.moveTowards(e, t, null)
                }, e.selectTowards = function(e, t) {
                    t[-e] = this, t[e] = this[e]
                }, e.selectChildren = function() {
                    return q(this, this)
                }, e.unselectInto = function(e, t) {
                    t.insAtDirEnd(-e, t.anticursor.ancestors[this.id])
                }, e.seek = function(e, t) {
                    function n(e) {
                        var t = {};
                        return t[k] = e.jQ.offset().left, t[T] = t[k] + e.jQ.outerWidth(), t
                    }
                    var o = this,
                        s = n(o);
                    if (e < s[k]) return t.insLeftOf(o);
                    if (e > s[T]) return t.insRightOf(o);
                    var r = s[k];
                    o.eachChild(function(c) {
                        var a = n(c);
                        return e < a[k] ? (e - r < a[k] - e ? c[k] ? t.insAtRightEnd(c[k]) : t.insLeftOf(o) : t.insAtLeftEnd(c), !1) : e > a[T] ? void(c[T] ? r = a[T] : s[T] - e < e - a[T] ? t.insRightOf(o) : t.insAtRightEnd(c)) : (c.seek(e, t), !1)
                    })
                }, e.numBlocks = function() {
                    var e = this.htmlTemplate.match(/&\d+/g);
                    return e ? e.length : 0
                }, e.html = function() {
                    var e = this,
                        t = e.blocks,
                        o = " mathquill-command-id=" + e.id,
                        s = e.htmlTemplate.match(/<[^<>]+>|[^<>]+/g);
                    n("no unmatched angle brackets", s.join("") === this.htmlTemplate);
                    for (var r = 0, c = s[0]; c; r += 1, c = s[r])
                        if ("/>" === c.slice(-2)) s[r] = c.slice(0, -2) + o + ' aria-hidden="true"/>';
                        else if ("<" === c.charAt(0)) {
                        n("not an unmatched top-level close tag", "/" !== c.charAt(1)), s[r] = c.slice(0, -1) + o + ' aria-hidden="true">';
                        var a = 1;
                        do {
                            r += 1, c = s[r], n("no missing close tags", c), "</" === c.slice(0, 2) ? a -= 1 : "<" === c.charAt(0) && "/>" !== c.slice(-2) && (a += 1)
                        } while (a > 0)
                    }
                    return s.join("").replace(/>&(\d+)/g, function(e, n) {
                        return " mathquill-block-id=" + t[n].id + ' aria-hidden="true">' + t[n].join("html")
                    })
                }, e.latex = function() {
                    return this.foldChildren(this.ctrlSeq, function(e, t) {
                        return e + "{" + (t.latex() || " ") + "}"
                    })
                }, e.textTemplate = [""], e.text = function() {
                    var e = this,
                        t = 0;
                    return e.foldChildren(e.textTemplate[t], function(n, o) {
                        t += 1;
                        var s = o.text();
                        return n && "(" === e.textTemplate[t] && "(" === s[0] && ")" === s.slice(-1) ? n + s.slice(1, -1) + e.textTemplate[t] : n + s + (e.textTemplate[t] || "")
                    })
                }, e.mathspeakTemplate = [], e.mathspeak = function() {
                    var e = this,
                        t = 0;
                    return e.foldChildren(e.mathspeakTemplate[t] || "Start" + e.ctrlSeq + " ", function(n, o) {
                        return t += 1, n + " " + o.mathspeak() + " " + (e.mathspeakTemplate[t] + " " || "End" + e.ctrlSeq + " ")
                    })
                }
            }),
            X = w($, function(t, n) {
                t.init = function(e, t, o, s) {
                    !o && e && (o = e.replace(/^\\/, "")), this.mathspeakName = s || o, n.init.call(this, e, t, [o])
                }, t.parser = function() {
                    return W.succeed(this)
                }, t.numBlocks = function() {
                    return 0
                }, t.replaces = function(e) {
                    e.remove()
                }, t.createBlocks = e, t.moveTowards = function(e, t) {
                    t.jQ.insDirOf(e, this.jQ), t[-e] = this, t[e] = this[e], z.queue(this)
                }, t.deleteTowards = function(e, t) {
                    t[e] = this.remove()[e]
                }, t.seek = function(e, t) {
                    e - this.jQ.offset().left < this.jQ.outerWidth() / 2 ? t.insLeftOf(this) : t.insRightOf(this)
                }, t.latex = function() {
                    return this.ctrlSeq
                }, t.text = function() {
                    return this.textTemplate.join("")
                }, t.mathspeak = function() {
                    return this.mathspeakName
                }, t.placeCursor = e, t.isEmpty = function() {
                    return !0
                }
            }),
            Y = w(X, function(e, t) {
                e.init = function(e, n, o) {
                    t.init.call(this, e, "<span>" + (n || e) + "</span>", g, o)
                }
            }),
            J = w(X, function(e, t) {
                e.init = function(e, n, o, s) {
                    t.init.call(this, e, '<span class="dcg-mq-binary-operator">' + n + "</span>", o, s)
                }
            }),
            Z = w(K, function(e, t) {
                e.join = function(e) {
                    return this.foldChildren("", function(t, n) {
                        return t + n[e]()
                    })
                }, e.html = function() {
                    return this.join("html")
                }, e.latex = function() {
                    return this.join("latex")
                }, e.text = function() {
                    return this.ends[k] === this.ends[T] && 0 !== this.ends[k] ? this.ends[k].text() : this.join("text")
                }, e.mathspeak = function() {
                    var e = "",
                        t = {};
                    return this.controller && (t = this.controller.options.autoOperatorNames), this.foldChildren([], function(n, o) {
                        if (o.isPartOfOperator) e += o.mathspeak();
                        else {
                            if ("" !== e) {
                                if (t !== {} && t._maxLength > 0) {
                                    var s = t[e.toLowerCase()];
                                    "string" == typeof s && (e = s)
                                }
                                n.push(e + " "), e = ""
                            }
                            var r = o.mathspeak(),
                                c = o.ctrlSeq;
                            isNaN(c) && (r = " " + r, "." !== c && (r += " ")), n.push(r)
                        }
                        return n
                    }).join("").replace(/ +(?= )/g, "")
                }, e.ariaLabel = "block", e.keystroke = function(e, n, o) {
                    return !o.options.spaceBehavesLikeTab || "Spacebar" !== e && "Shift-Spacebar" !== e ? t.keystroke.apply(this, arguments) : (n.preventDefault(), void o.escapeDir("Shift-Spacebar" === e ? k : T, e, n))
                }, e.moveOutOf = function(e, t, n) {
                    n && this.parent[n + "Into"] || !this[e] ? (t.insDirOf(e, this.parent), z.queueDirOf(e).queue(this.parent)) : (t.insAtDirEnd(-e, this[e]), z.queueDirEndOf(-e).queue(t.parent, !0))
                }, e.selectOutOf = function(e, t) {
                    t.insDirOf(e, this.parent)
                }, e.deleteOutOf = function(e, t) {
                    t.unwrapGramp()
                }, e.seek = function(e, t) {
                    var n = this.ends[T];
                    if (!n || n.jQ.offset().left + n.jQ.outerWidth() < e) return t.insAtRightEnd(this);
                    if (e < this.ends[k].jQ.offset().left) return t.insAtLeftEnd(this);
                    for (; e < n.jQ.offset().left;) n = n[k];
                    return n.seek(e, t)
                }, e.chToCmd = function(e, t) {
                    var n;
                    return e.match(/^[a-eg-zA-Z]$/) ? se(e) : /^\d$/.test(e) ? ne(e) : t && t.typingSlashWritesDivisionSymbol && "/" === e ? L["÷"](e) : t && t.typingAsteriskWritesTimesSymbol && "*" === e ? L["×"](e) : t && t.typingPercentWritesPercentOf && "%" === e ? L.percentof(e) : (n = O[e] || L[e]) ? n(e) : Y(e)
                }, e.write = function(e, t) {
                    var n = this.chToCmd(t, e.options);
                    e.selection && n.replaces(e.replaceSelection()), n.createLeftOf(e.show()), "/" === t ? z.alert("over") : z.alert(n.mathspeak({
                        createdLeftOf: e
                    }))
                }, e.focus = function() {
                    return this.jQ.addClass("dcg-mq-hasCursor"), this.jQ.removeClass("dcg-mq-empty"), this
                }, e.blur = function() {
                    return this.jQ.removeClass("dcg-mq-hasCursor"), this.isEmpty() && (this.jQ.addClass("dcg-mq-empty"), this.isEmptyParens() && this.jQ.addClass("dcg-mq-empty-parens")), this
                }
            });
        N.StaticMath = function(e) {
            return w(e.AbstractMathQuill, function(t, n) {
                this.RootBlock = Z, t.__mathquillify = function(e, t) {
                    return this.config(e), n.__mathquillify.call(this, "dcg-mq-math-mode"), this.__controller.delegateMouseEvents(), this.__controller.staticMathTextareaEvents(), this
                }, t.init = function() {
                    n.init.apply(this, arguments);
                    var t = this.innerFields = [];
                    this.__controller.root.postOrder(function(n) {
                        n.registerInnerField(t, e.MathField)
                    })
                }, t.latex = function() {
                    var t = n.latex.apply(this, arguments);
                    if (arguments.length > 0) {
                        var o = this.innerFields = [];
                        this.__controller.root.postOrder(function(t) {
                            t.registerInnerField(o, e.MathField)
                        })
                    }
                    return t
                }, t.setAriaLabel = function(e) {
                    this.__controller.ariaLabel = "string" == typeof e ? e : "";
                    var t = "Math Input" !== this.__controller.ariaLabel ? this.__controller.ariaLabel + ": " : "";
                    return this.__controller.container.attr("aria-label", t + this.__controller.root.mathspeak().trim()), this
                }, t.getAriaLabel = function() {
                    return this.__controller.ariaLabel || ""
                }
            })
        };
        var ee = w(Z, p);
        N.MathField = function(t) {
            return w(t.EditableField, function(t, n) {
                this.RootBlock = ee, t.__mathquillify = function(t, o) {
                    return this.config(t), o > 1 && (this.__controller.root.reflow = e), n.__mathquillify.call(this, "dcg-mq-editable-field dcg-mq-math-mode"), delete this.__controller.root.reflow, this
                }
            })
        };
        var te = w(X, function(e, t) {
                e.finalizeTree = e.siblingDeleted = e.siblingCreated = function(e, t) {
                    t !== k && this[T] instanceof te || this.fixDigitGrouping(e)
                }, e.fixDigitGrouping = function(e) {
                    if (e.enableDigitGrouping) {
                        var t = this,
                            n = this,
                            o = 0,
                            s = [],
                            r = t;
                        do {
                            if (/^[0-9]$/.test(r.ctrlSeq)) t = r;
                            else if ("\\ " === r.ctrlSeq) t = r, o += 1;
                            else {
                                if ("." !== r.ctrlSeq) break;
                                t = r, s.push(r)
                            }
                        } while (r = t[k]);
                        for (; r = n[T];)
                            if (/^[0-9]$/.test(r.ctrlSeq)) n = r;
                            else if ("\\ " === r.ctrlSeq) n = r, o += 1;
                        else {
                            if ("." !== r.ctrlSeq) break;
                            n = r, s.push(r)
                        }
                        for (; n !== t && "\\ " === t.ctrlSeq;) t = t[T], o -= 1;
                        for (; n !== t && "\\ " === n.ctrlSeq;) n = n[k], o -= 1;
                        if (t !== n || "\\ " !== t.ctrlSeq) {
                            o > 0 || s.length > 1 ? this.removeGroupingBetween(t, n) : s[0] ? (s[0] !== t && this.addGroupingBetween(s[0][k], t), s[0] !== n && this.removeGroupingBetween(s[0][T], n)) : this.addGroupingBetween(n, t)
                        }
                    }
                }, e.removeGroupingBetween = function(e, t) {
                    var n = e;
                    do {
                        if (n.setGroupingClass(g), n === t) break
                    } while (n = n[T])
                }, e.addGroupingBetween = function(e, t) {
                    for (var n = e, o = 0, s = 0, n = e; n && (s += 1, n !== t);) n = n[k];
                    var r = s % 3;
                    0 === r && (r = 3);
                    for (var n = e; n && (o += 1, cls = g, s >= 4 && (o === s ? cls = "dcg-mq-group-leading-" + r : o % 3 == 0 && o !== s && (cls = "dcg-mq-group-start"), cls || (cls = "dcg-mq-group-other")), n.setGroupingClass(cls), n !== t);) n = n[k]
                }, e.setGroupingClass = function(e) {
                    this._groupingClass !== e && (this._groupingClass && this.jQ.removeClass(this._groupingClass), e && this.jQ.addClass(e), this._groupingClass = e)
                }
            }),
            ne = w(te, function(e, t) {
                e.init = function(e, n, o) {
                    t.init.call(this, e, '<span class="dcg-mq-digit">' + (n || e) + "</span>", g, o)
                }, e.createLeftOf = function(e) {
                    e.options.autoSubscriptNumerals && e.parent !== e.parent.parent.sub && (e[k] instanceof oe && !1 !== e[k].isItalic || e[k] instanceof we && e[k][k] instanceof oe && !1 !== e[k][k].isItalic) ? (L._().createLeftOf(e), t.createLeftOf.call(this, e), e.insRightOf(e.parent.parent)) : t.createLeftOf.call(this, e)
                }, e.mathspeak = function(e) {
                    if (e && e.createdLeftOf) {
                        var n = e.createdLeftOf;
                        if (n.options.autoSubscriptNumerals && n.parent !== n.parent.parent.sub && (n[k] instanceof oe && !1 !== n[k].isItalic || n[k] instanceof we && n[k][k] instanceof oe && !1 !== n[k][k].isItalic)) return "Subscript " + t.mathspeak.call(this) + " Baseline"
                    }
                    return t.mathspeak.apply(this, arguments)
                }
            }),
            oe = w(X, function(e, t) {
                e.init = function(e, n) {
                    t.init.call(this, e, "<var>" + (n || e) + "</var>")
                }, e.text = function() {
                    var e = this.ctrlSeq;
                    return this.isPartOfOperator ? "\\" == e[0] ? e = e.slice(1, e.length) : " " == e[e.length - 1] && (e = e.slice(0, -1)) : (!this[k] || this[k] instanceof oe || this[k] instanceof J || "\\ " === this[k].ctrlSeq || (e = "*" + e), !this[T] || this[T] instanceof J || this[T] instanceof we || (e += "*")), e
                }, e.mathspeak = function() {
                    var e = this.ctrlSeq;
                    return this.isPartOfOperator || 1 !== e.length ? t.mathspeak.call(this) : '"' + e + '"'
                }
            });
        R.p.autoCommands = {
            _maxLength: 0
        }, M.autoCommands = function(e) {
            if (!/^[a-z]+(?: [a-z]+)*$/i.test(e)) throw '"' + e + '" not a space-delimited list of only letters';
            for (var t = e.split(" "), n = {}, o = 0, s = 0; s < t.length; s += 1) {
                var r = t[s];
                if (r.length < 2) throw 'autocommand "' + r + '" not minimum length of 2';
                if (L[r] === ie) throw '"' + r + '" is a built-in operator name';
                n[r] = 1, o = E(o, r.length)
            }
            return n._maxLength = o, n
        }, R.p.autoParenthesizedFunctions = {
            _maxLength: 0
        }, M.autoParenthesizedFunctions = function(e) {
            if (!/^[a-z]+(?: [a-z]+)*$/i.test(e)) throw '"' + e + '" not a space-delimited list of only letters';
            for (var t = e.split(" "), n = {}, o = 0, s = 0; s < t.length; s += 1) {
                var r = t[s];
                if (r.length < 2) throw 'autocommand "' + r + '" not minimum length of 2';
                n[r] = 1, o = E(o, r.length)
            }
            return n._maxLength = o, n
        };
        var se = w(oe, function(e, t) {
                function n(e) {
                    return !e || ("." === e.ctrlSeq || (e instanceof J || e instanceof ke))
                }
                e.init = function(e) {
                    return t.init.call(this, this.letter = e)
                }, e.checkAutoCmds = function(e) {
                    var t = e.options.autoCommands,
                        n = t._maxLength;
                    if (n > 0) {
                        for (var o = "", s = this, r = 0; s instanceof se && s.ctrlSeq === s.letter && r < n;) o = s.letter + o, s = s[k], r += 1;
                        for (; o.length;) {
                            if (t.hasOwnProperty(o)) {
                                for (var r = 1, s = this; r < o.length; r += 1, s = s[k]);
                                return D(s, this).remove(), e[k] = s[k], L[o](o).createLeftOf(e)
                            }
                            o = o.slice(1)
                        }
                    }
                }, e.autoParenthesize = function(e) {
                    var t = e.parent.ends[T];
                    if (!(t && t instanceof Ae && "\\left(" === t.ctrlSeq || this.isParentSimpleSubscript())) {
                        for (var n = "", o = this, s = 0, r = e.options.autoParenthesizedFunctions, c = r._maxLength, a = e.options.autoOperatorNames; o instanceof se && s < c;) n = o.letter + n, o = o[k], s += 1;
                        for (; n.length;) {
                            if (r.hasOwnProperty(n) && a.hasOwnProperty(n)) return e.parent.write(e, "(");
                            n = n.slice(1)
                        }
                    }
                }, e.createLeftOf = function(e) {
                    t.createLeftOf.apply(this, arguments), this.checkAutoCmds(e), this.autoParenthesize(e)
                }, e.italicize = function(e) {
                    return this.isItalic = e, this.isPartOfOperator = !e, this.jQ.toggleClass("dcg-mq-operator-name", !e), this
                }, e.finalizeTree = e.siblingDeleted = e.siblingCreated = function(e, t) {
                    t !== k && this[T] instanceof se || this.autoUnItalicize(e)
                }, e.autoUnItalicize = function(e) {
                    var t = e.autoOperatorNames;
                    if (0 !== t._maxLength && !this.isParentSimpleSubscript()) {
                        for (var o = this.letter, s = this[k]; s instanceof se; s = s[k]) o = s.letter + o;
                        for (var r = this[T]; r instanceof se; r = r[T]) o += r.letter;
                        D(s[T] || this.parent.ends[k], r[k] || this.parent.ends[T]).each(function(e) {
                            e.italicize(!0).jQ.removeClass("dcg-mq-first dcg-mq-last dcg-mq-followed-by-supsub"), e.ctrlSeq = e.letter
                        });
                        e: for (var c = 0, a = s[T] || this.parent.ends[k]; c < o.length; c += 1, a = a[T])
                            for (var i = v(t._maxLength, o.length - c); i > 0; i -= 1) {
                                var l = o.slice(c, c + i);
                                if (t.hasOwnProperty(l)) {
                                    for (var u = 0, d = a; u < i; u += 1, d = d[T]) {
                                        d.italicize(!1);
                                        var p = d
                                    }
                                    var m = re.hasOwnProperty(l);
                                    if (a.ctrlSeq = (m ? "\\" : "\\operatorname{") + a.ctrlSeq, p.ctrlSeq += m ? " " : "}", ae.hasOwnProperty(l) && p[k][k][k].jQ.addClass("dcg-mq-last"), n(a[k]) || a.jQ.addClass("dcg-mq-first"), !n(p[T]))
                                        if (p[T] instanceof we) {
                                            var f = p[T],
                                                h = f.siblingCreated = f.siblingDeleted = function() {
                                                    f.jQ.toggleClass("dcg-mq-after-operator-name", !(f[T] instanceof Ae))
                                                };
                                            h()
                                        } else p.jQ.toggleClass("dcg-mq-last", !(p[T] instanceof Ae));
                                    c += i - 1, a = p;
                                    continue e
                                }
                            }
                    }
                }
            }),
            re = {},
            ce = R.p.autoOperatorNames = {
                _maxLength: 9
            },
            ae = {
                limsup: 1,
                liminf: 1,
                projlim: 1,
                injlim: 1
            };
        ! function() {
            for (var e = "arg deg det dim exp gcd hom inf ker lg lim ln log max min sup limsup liminf injlim projlim Pr".split(" "), t = 0; t < e.length; t += 1) re[e[t]] = ce[e[t]] = 1;
            for (var n = "sin cos tan arcsin arccos arctan sinh cosh tanh sec csc cot coth".split(" "), t = 0; t < n.length; t += 1) re[n[t]] = 1;
            for (var o = "sin cos tan sec cosec csc cotan cot ctg".split(" "), t = 0; t < o.length; t += 1) ce[o[t]] = ce["arc" + o[t]] = ce[o[t] + "h"] = ce["ar" + o[t] + "h"] = ce["arc" + o[t] + "h"] = 1;
            for (var s = "gcf hcf lcm proj span".split(" "), t = 0; t < s.length; t += 1) ce[s[t]] = 1
        }(), M.autoOperatorNames = function(e) {
            if ("string" != typeof e) throw '"' + e + '" not a space-delimited list';
            if (!/^[a-z\|\-]+(?: [a-z\|\-]+)*$/i.test(e)) throw '"' + e + '" not a space-delimited list of letters or "|"';
            for (var t = e.split(" "), n = {}, o = 0, s = 0; s < t.length; s += 1) {
                var r = t[s];
                if (r.length < 2) throw '"' + r + '" not minimum length of 2';
                if (r.indexOf("|") < 0) n[r] = r, o = E(o, r.length);
                else {
                    var c = r.split("|");
                    if (c.length > 2) throw '"' + r + '" has more than 1 mathspeak delimiter';
                    if (c[0].length < 2) throw '"' + r[0] + '" not minimum length of 2';
                    n[c[0]] = c[1].replace(/-/g, " "), o = E(o, c[0].length)
                }
            }
            return n._maxLength = o, n
        };
        var ie = w(X, function(e, t) {
            e.init = function(e) {
                this.ctrlSeq = e
            }, e.createLeftOf = function(e) {
                for (var t = this.ctrlSeq, n = 0; n < t.length; n += 1) se(t.charAt(n)).createLeftOf(e)
            }, e.parser = function() {
                for (var e = this.ctrlSeq, t = Z(), n = 0; n < e.length; n += 1) se(e.charAt(n)).adopt(t, t.ends[T], 0);
                return W.succeed(t.children())
            }
        });
        for (var le in ce) ce.hasOwnProperty(le) && (L[le] = ie);
        L.operatorname = w($, function(t) {
            t.createLeftOf = e, t.numBlocks = function() {
                return 1
            }, t.parser = function() {
                return V.block.map(function(e) {
                    var t = !0,
                        n = "",
                        o = e.children();
                    return o.each(function(e) {
                        e instanceof se ? n += e.letter : t = !1
                    }), t && "ans" === n ? L[n](n) : o
                })
            }
        }), L.f = w(se, function(e, t) {
            e.init = function() {
                X.p.init.call(this, this.letter = "f", '<var class="dcg-mq-f">f</var>')
            }, e.italicize = function(e) {
                return this.jQ.html("f").toggleClass("dcg-mq-f", e), t.italicize.apply(this, arguments)
            }
        }), L[" "] = L.space = w(te, function(e, t) {
            e.init = function() {
                t.init.call(this, "\\ ", "<span>&nbsp;</span>", " ")
            }
        }), L["."] = w(te, function(e, t) {
            e.init = function() {
                t.init.call(this, ".", '<span class="dcg-mq-digit">.</span>', ".")
            }
        }), L["'"] = L.prime = t(Y, "'", "&prime;", "prime"), L["″"] = L.dprime = t(Y, "″", "&Prime;", "double prime"), L.backslash = t(Y, "\\backslash ", "\\", "backslash"), O["\\"] || (O["\\"] = L.backslash), L.$ = t(Y, "\\$", "$", "dollar"), L.square = t(Y, "\\square ", "□", "square"), L.mid = t(Y, "\\mid ", "∣", "mid");
        var ue = w(X, function(e, t) {
            e.init = function(e, n) {
                t.init.call(this, e, '<span class="dcg-mq-nonSymbola">' + (n || e) + "</span>")
            }
        });
        L["@"] = ue, L["&"] = t(ue, "\\&", "&amp;", "and"), L["%"] = w(ue, function(e, t) {
            e.init = function() {
                t.init.call(this, "\\%", "%", "percent")
            }, e.parser = function() {
                var e = W.optWhitespace,
                    n = W.string;
                return e.then(n("\\operatorname{of}").map(function() {
                    return L.percentof()
                })).or(t.parser.call(this))
            }
        }), L["∥"] = L.parallel = t(Y, "\\parallel ", "&#x2225;", "parallel"), L["∦"] = L.nparallel = t(Y, "\\nparallel ", "&#x2226;", "not parallel"), L["⟂"] = L.perp = t(Y, "\\perp ", "&#x27C2;", "perpendicular"), L.alpha = L.beta = L.gamma = L.delta = L.zeta = L.eta = L.theta = L.iota = L.kappa = L.mu = L.nu = L.xi = L.rho = L.sigma = L.tau = L.chi = L.psi = L.omega = w(oe, function(e, t) {
            e.init = function(e) {
                t.init.call(this, "\\" + e + " ", "&" + e + ";")
            }
        }), L.phi = t(oe, "\\phi ", "&#981;", "phi"), L.phiv = L.varphi = t(oe, "\\varphi ", "&phi;", "phi"), L.epsilon = t(oe, "\\epsilon ", "&#1013;", "epsilon"), L.epsiv = L.varepsilon = t(oe, "\\varepsilon ", "&epsilon;", "epsilon"), L.piv = L.varpi = t(oe, "\\varpi ", "&piv;", "piv"), L.sigmaf = L.sigmav = L.varsigma = t(oe, "\\varsigma ", "&sigmaf;", "sigma"), L.thetav = L.vartheta = L.thetasym = t(oe, "\\vartheta ", "&thetasym;", "theta"), L.upsilon = L.upsi = t(oe, "\\upsilon ", "&upsilon;", "upsilon"), L.gammad = L.Gammad = L.digamma = t(oe, "\\digamma ", "&#989;", "gamma"), L.kappav = L.varkappa = t(oe, "\\varkappa ", "&#1008;", "kappa"), L.rhov = L.varrho = t(oe, "\\varrho ", "&#1009;", "rho"), L.pi = L["π"] = t(ue, "\\pi ", "&pi;", "pi"), L.lambda = t(ue, "\\lambda ", "&lambda;", "lambda"), L.Upsilon = L.Upsi = L.upsih = L.Upsih = t(X, "\\Upsilon ", '<var style="font-family: serif">&upsih;</var>', "capital upsilon"), L.Gamma = L.Delta = L.Theta = L.Lambda = L.Xi = L.Pi = L.Sigma = L.Phi = L.Psi = L.Omega = L.forall = w(Y, function(e, t) {
            e.init = function(e) {
                t.init.call(this, "\\" + e + " ", "&" + e + ";")
            }
        });
        var de = w($, function(e) {
            e.init = function(e) {
                this.latex = e
            }, e.createLeftOf = function(e) {
                var t = V.parse(this.latex);
                t.children().adopt(e.parent, e[k], e[T]), e[k] = t.ends[T], t.jQize().insertBefore(e.jQ), t.finalizeInsert(e.options, e), t.ends[T][T].siblingCreated && t.ends[T][T].siblingCreated(e.options, k), t.ends[k][k].siblingCreated && t.ends[k][k].siblingCreated(e.options, T), e.parent.bubble(function(e) {
                    e.reflow()
                })
            }, e.mathspeak = function() {
                return V.parse(this.latex).mathspeak()
            }, e.parser = function() {
                var e = V.parse(this.latex).children();
                return W.succeed(e)
            }
        });
        L["⁰"] = t(de, "^0"), L["¹"] = t(de, "^1"), L["²"] = t(de, "^2"), L["³"] = t(de, "^3"), L["⁴"] = t(de, "^4"), L["⁵"] = t(de, "^5"), L["⁶"] = t(de, "^6"), L["⁷"] = t(de, "^7"), L["⁸"] = t(de, "^8"), L["⁹"] = t(de, "^9"), L["¼"] = t(de, "\\frac14"), L["½"] = t(de, "\\frac12"), L["¾"] = t(de, "\\frac34"), L["√"] = t(de, "\\sqrt{}");
        var pe = w(J, function(e) {
            e.init = Y.prototype.init, e.contactWeld = e.siblingCreated = e.siblingDeleted = function(e, t) {
                function n(e) {
                    return e[k] ? e[k] instanceof J || /^(\\ )|[,;:\(\[]$/.test(e[k].ctrlSeq) ? "" : "dcg-mq-binary-operator" : e.parent && e.parent.parent && e.parent.parent.isStyleBlock() ? n(e.parent.parent) : ""
                }
                if (t !== T) return this.jQ[0].className = n(this), this
            }
        });
        L["+"] = t(pe, "+", "+", "plus"), L["−"] = L["—"] = L["–"] = L["-"] = t(pe, "-", "&minus;", "minus"), L["±"] = L.pm = L.plusmn = L.plusminus = t(pe, "\\pm ", "&plusmn;", "plus-or-minus"), L.mp = L.mnplus = L.minusplus = t(pe, "\\mp ", "&#8723;", "minus-or-plus"), O["*"] = L.sdot = L.cdot = t(J, "\\cdot ", "&middot;", "*", "times");
        var me = w(J, function(e, t) {
                e.init = function(e, n) {
                    this.data = e, this.strict = n;
                    var o = n ? "Strict" : "";
                    t.init.call(this, e["ctrlSeq" + o], e["html" + o], e["text" + o], e["mathspeak" + o])
                }, e.swap = function(e) {
                    this.strict = e;
                    var t = e ? "Strict" : "";
                    this.ctrlSeq = this.data["ctrlSeq" + t], this.jQ.html(this.data["html" + t]), this.textTemplate = [this.data["text" + t]], this.mathspeakName = this.data["mathspeak" + t]
                }, e.deleteTowards = function(e, n) {
                    if (e === k && !this.strict) return this.swap(!0), void this.bubble(function(e) {
                        e.reflow()
                    });
                    t.deleteTowards.apply(this, arguments)
                }
            }),
            fe = {
                ctrlSeq: "\\le ",
                html: "&le;",
                text: "≤",
                mathspeak: "less than or equal to",
                ctrlSeqStrict: "<",
                htmlStrict: "&lt;",
                textStrict: "<",
                mathspeakStrict: "less than"
            },
            he = {
                ctrlSeq: "\\ge ",
                html: "&ge;",
                text: "≥",
                mathspeak: "greater than or equal to",
                ctrlSeqStrict: ">",
                htmlStrict: "&gt;",
                textStrict: ">",
                mathspeakStrict: "greater than"
            };
        L["<"] = L.lt = t(me, fe, !0), L[">"] = L.gt = t(me, he, !0), L["≤"] = L.le = L.leq = t(me, fe, !1), L["≥"] = L.ge = L.geq = t(me, he, !1), L.infty = L.infin = L.infinity = t(Y, "\\infty ", "&infin;", "infinity"), L["≠"] = L.ne = L.neq = t(J, "\\ne ", "&ne;", "not equal");
        var ge = w(J, function(e, t) {
            e.init = function() {
                t.init.call(this, "=", "=", "=", "equals")
            }, e.createLeftOf = function(e) {
                if (e[k] instanceof me && e[k].strict) return e[k].swap(!1), void e[k].bubble(function(e) {
                    e.reflow()
                });
                t.createLeftOf.apply(this, arguments)
            }
        });
        L["="] = ge, L["×"] = L.times = t(J, "\\times ", "&times;", "[x]", "times"), L["÷"] = L.div = L.divide = L.divides = t(J, "\\div ", "&divide;", "[/]", "over");
        var ye = w(J, function(e, t) {
                e.init = function() {
                    t.init.call(this, "\\sim ", "~", "~", "tilde")
                }, e.createLeftOf = function(e) {
                    if (e[k] instanceof ye) {
                        var n = e[k];
                        return e[k] = n[k], n.remove(), ve().createLeftOf(e), void e[k].bubble(function(e) {
                            e.reflow()
                        })
                    }
                    t.createLeftOf.apply(this, arguments)
                }
            }),
            ve = w(J, function(e, t) {
                e.init = function() {
                    t.init.call(this, "\\approx ", "&approx;", "≈", "approximately equal")
                }, e.deleteTowards = function(e, n) {
                    if (e === k) {
                        var o = n[k];
                        return D(o, this).remove(), n[k] = o[k], ye().createLeftOf(n), void n[k].bubble(function(e) {
                            e.reflow()
                        })
                    }
                    t.deleteTowards.apply(this, arguments)
                }
            });
        O["~"] = L.sim = ye, L["≈"] = L.approx = ve;
        var Ee = {
                sqrt: {
                    html: '<svg preserveAspectRatio="none" viewBox="0 0 32 54"><path d="M0 33 L7 27 L12.5 47 L13 47 L30 0 L32 0 L13 54 L11 54 L4.5 31 L0 33" /></svg>'
                },
                "|": {
                    width: ".4em",
                    html: '<svg preserveAspectRatio="none" viewBox="0 0 10 54"><path d="M4.4 0 L4.4 54 L5.6 54 L5.6 0" /></svg>'
                },
                "[": {
                    width: ".55em",
                    html: '<svg preserveAspectRatio="none" viewBox="0 0 11 24"><path d="M8 0 L3 0 L3 24 L8 24 L8 23 L4 23 L4 1 L8 1" /></svg>'
                },
                "]": {
                    width: ".55em",
                    html: '<svg preserveAspectRatio="none" viewBox="0 0 11 24"><path d="M3 0 L8 0 L8 24 L3 24 L3 23 L7 23 L7 1 L3 1" /></svg>'
                },
                "(": {
                    width: ".55em",
                    html: '<svg preserveAspectRatio="none" viewBox="3 0 106 186"><path d="M85 0 A61 101 0 0 0 85 186 L75 186 A75 101 0 0 1 75 0" /></svg>'
                },
                ")": {
                    width: ".55em",
                    html: '<svg preserveAspectRatio="none" viewBox="3 0 106 186"><path d="M24 0 A61 101 0 0 1 24 186 L34 186 A75 101 0 0 0 34 0" /></svg>'
                },
                "{": {
                    width: ".7em",
                    html: '<svg preserveAspectRatio="none" viewBox="10 0 210 350"><path d="M170 0 L170 6 A47 52 0 0 0 123 60 L123 127 A35 48 0 0 1 88 175 A35 48 0 0 1 123 223 L123 290 A47 52 0 0 0 170 344 L170 350 L160 350 A58 49 0 0 1 102 301 L103 220 A45 40 0 0 0 58 180 L58 170 A45 40 0 0 0 103 130 L103 49 A58 49 0 0 1 161 0" /></svg>'
                },
                "}": {
                    width: ".7em",
                    html: '<svg preserveAspectRatio="none" viewBox="10 0 210 350"><path d="M60 0 L60 6 A47 52 0 0 1 107 60 L107 127 A35 48 0 0 0 142 175 A35 48 0 0 0 107 223 L107 290 A47 52 0 0 1 60 344 L60 350 L70 350 A58 49 0 0 0 128 301 L127 220 A45 40 0 0 1 172 180 L172 170 A45 40 0 0 1 127 130 L127 49 A58 49 0 0 0 70 0" /></svg>'
                },
                "&#8741;": {
                    width: ".7em",
                    html: '<svg preserveAspectRatio="none" viewBox="0 0 10 54"><path d="M3.2 0 L3.2 54 L4 54 L4 0 M6.8 0 L6.8 54 L6 54 L6 0" /></svg>'
                },
                "&lang;": {
                    width: ".55em",
                    html: '<svg preserveAspectRatio="none" viewBox="0 0 10 54"><path d="M6.8 0 L3.2 27 L6.8 54 L7.8 54 L4.2 27 L7.8 0" /></svg>'
                },
                "&rang;": {
                    width: ".55em",
                    html: '<svg preserveAspectRatio="none" viewBox="0 0 10 54"><path d="M3.2 0 L6.8 27 L3.2 54 L2.2 54 L5.8 27 L2.2 0" /></svg>'
                }
            },
            be = w($, function(e, t) {
                e.init = function(n, o, s, r) {
                    t.init.call(this, n, "<" + o + " " + s + ">&0</" + o + ">"), e.ariaLabel = r || n.replace(/^\\/, ""), e.mathspeakTemplate = ["Start" + e.ariaLabel + ",", "End" + e.ariaLabel]
                }
            });
        L.mathrm = t(be, "\\mathrm", "span", 'class="dcg-mq-roman dcg-mq-font"', "Roman Font"), L.mathit = t(be, "\\mathit", "i", 'class="dcg-mq-font"', "Italic Font"), L.mathbf = t(be, "\\mathbf", "b", 'class="dcg-mq-font"', "Bold Font"), L.mathsf = t(be, "\\mathsf", "span", 'class="dcg-mq-sans-serif dcg-mq-font"', "Serif Font"), L.mathtt = t(be, "\\mathtt", "span", 'class="dcg-mq-monospace dcg-mq-font"', "Math Text"), L.underline = t(be, "\\underline", "span", 'class="dcg-mq-non-leaf dcg-mq-underline"', "Underline"), L.overline = L.bar = t(be, "\\overline", "span", 'class="dcg-mq-non-leaf dcg-mq-overline"', "Overline"), L.overrightarrow = t(be, "\\overrightarrow", "span", 'class="dcg-mq-non-leaf dcg-mq-overarrow dcg-mq-arrow-right"', "Over Right Arrow"), L.overleftarrow = t(be, "\\overleftarrow", "span", 'class="dcg-mq-non-leaf dcg-mq-overarrow dcg-mq-arrow-left"', "Over Left Arrow"), L.overleftrightarrow = t(be, "\\overleftrightarrow ", "span", 'class="dcg-mq-non-leaf dcg-mq-overarrow dcg-mq-arrow-leftright"', "Over Left and Right Arrow"), L.overarc = t(be, "\\overarc", "span", 'class="dcg-mq-non-leaf dcg-mq-overarc"', "Over Arc");
        var we = (L.textcolor = w($, function(e, t) {
            e.setColor = function(e) {
                this.color = e, this.htmlTemplate = '<span class="dcg-mq-textcolor" style="color:' + e + '">&0</span>'
            }, e.latex = function() {
                return "\\textcolor{" + this.color + "}{" + this.blocks[0].latex() + "}"
            }, e.parser = function() {
                var e = this,
                    n = W.optWhitespace,
                    o = W.string,
                    s = W.regex;
                return n.then(o("{")).then(s(/^[#\w\s.,()%-]*/)).skip(o("}")).then(function(n) {
                    return e.setColor(n), t.parser.call(e)
                })
            }, e.isStyleBlock = function() {
                return !0
            }
        }), L.class = w($, function(e, t) {
            e.parser = function() {
                var e = this,
                    n = W.string,
                    o = W.regex;
                return W.optWhitespace.then(n("{")).then(o(/^[-\w\s\\\xA0-\xFF]*/)).skip(n("}")).then(function(n) {
                    return e.cls = n || "", e.htmlTemplate = '<span class="dcg-mq-class ' + n + '">&0</span>', t.parser.call(e)
                })
            }, e.latex = function() {
                return "\\class{" + this.cls + "}{" + this.blocks[0].latex() + "}"
            }, e.isStyleBlock = function() {
                return !0
            }
        }), w($, function(e, t) {
            e.ctrlSeq = "_{...}^{...}", e.createLeftOf = function(e) {
                if (this.replacedFragment || e[k] || !e.options.supSubsRequireOperand) return t.createLeftOf.apply(this, arguments)
            }, e.contactWeld = function(e) {
                for (var t = k; t; t = t === k && T)
                    if (this[t] instanceof we) {
                        for (var n = "sub"; n; n = "sub" === n && "sup") {
                            var o = this[n],
                                s = this[t][n];
                            if (o) {
                                if (s)
                                    if (o.isEmpty()) var r = x(s, 0, s.ends[k]);
                                    else {
                                        o.jQ.children().insAtDirEnd(-t, s.jQ);
                                        var c = o.children().disown(),
                                            r = x(s, c.ends[T], s.ends[k]);
                                        t === k ? c.adopt(s, s.ends[T], 0) : c.adopt(s, 0, s.ends[k])
                                    }
                                else this[t].addBlock(o.disown());
                                this.placeCursor = function(e, n) {
                                    return function(o) {
                                        o.insAtDirEnd(-t, e || n)
                                    }
                                }(s, o)
                            }
                        }
                        this.remove(), e && e[k] === this && (t === T && r ? r[k] ? e.insRightOf(r[k]) : e.insAtLeftEnd(r.parent) : e.insRightOf(this[t]));
                        break
                    }
            }, R.p.charsThatBreakOutOfSupSub = "", e.finalizeTree = function() {
                this.ends[k].write = function(e, t) {
                    if (e.options.autoSubscriptNumerals && this === this.parent.sub) {
                        if ("_" === t) return;
                        var n = this.chToCmd(t, e.options);
                        return n instanceof X ? e.deleteSelection() : e.clearSelection().insRightOf(this.parent), n.createLeftOf(e.show()), void z.queue("Baseline").alert(n.mathspeak({
                            createdLeftOf: e
                        }))
                    }
                    e[k] && !e[T] && !e.selection && e.options.charsThatBreakOutOfSupSub.indexOf(t) > -1 && (e.insRightOf(this.parent), z.queue("Baseline")), Z.p.write.apply(this, arguments)
                }
            }, e.moveTowards = function(e, n, o) {
                n.options.autoSubscriptNumerals && !this.sup ? n.insDirOf(e, this) : t.moveTowards.apply(this, arguments)
            }, e.deleteTowards = function(e, n) {
                if (n.options.autoSubscriptNumerals && this.sub) {
                    var o = this.sub.ends[-e];
                    o instanceof X ? o.remove() : o && o.deleteTowards(e, n.insAtDirEnd(-e, this.sub)), this.sub.isEmpty() && (this.sub.deleteOutOf(k, n.insAtLeftEnd(this.sub)), this.sup && n.insDirOf(-e, this))
                } else t.deleteTowards.apply(this, arguments)
            }, e.latex = function() {
                function e(e, t) {
                    var n = t && t.latex();
                    return t ? e + "{" + (n || " ") + "}" : ""
                }
                return e("_", this.sub) + e("^", this.sup)
            }, e.addBlock = function(e) {
                "sub" === this.supsub ? (this.sup = this.upInto = this.sub.upOutOf = e, e.adopt(this, this.sub, 0).downOutOf = this.sub, e.jQ = C('<span class="dcg-mq-sup"/>').append(e.jQ.children()).prependTo(this.jQ), A.linkElementByBlockNode(e.jQ[0], e)) : (this.sub = this.downInto = this.sup.downOutOf = e, e.adopt(this, 0, this.sup).upOutOf = this.sup, e.jQ = C('<span class="dcg-mq-sub"></span>').append(e.jQ.children()).appendTo(this.jQ.removeClass("dcg-mq-sup-only")), A.linkElementByBlockNode(e.jQ[0], e), this.jQ.append('<span style="display:inline-block;width:0">&#8203;</span>'));
                for (var t = 0; t < 2; t += 1) ! function(e, t, n, o) {
                    e[t].deleteOutOf = function(s, r) {
                        if (r.insDirOf(this[s] ? -s : s, this.parent), !this.isEmpty()) {
                            var c = this.ends[s];
                            this.children().disown().withDirAdopt(s, r.parent, r[s], r[-s]).jQ.insDirOf(-s, r.jQ), r[-s] = c
                        }
                        e.supsub = n, delete e[t], delete e[o + "Into"], e[n][o + "OutOf"] = m, delete e[n].deleteOutOf, "sub" === t && C(e.jQ.addClass("dcg-mq-sup-only")[0].lastChild).remove(), this.remove()
                    }
                }(this, "sub sup".split(" ")[t], "sup sub".split(" ")[t], "down up".split(" ")[t])
            }
        }));
        L.subscript = L._ = w(we, function(e, t) {
            e.supsub = "sub", e.htmlTemplate = '<span class="dcg-mq-supsub dcg-mq-non-leaf"><span class="dcg-mq-sub">&0</span><span style="display:inline-block;width:0">&#8203;</span></span>', e.textTemplate = ["_"], e.mathspeakTemplate = ["Subscript,", ", Baseline"], e.ariaLabel = "subscript", e.finalizeTree = function() {
                this.downInto = this.sub = this.ends[k], this.sub.upOutOf = m, t.finalizeTree.call(this)
            }
        }), L.superscript = L.supscript = L["^"] = w(we, function(e, t) {
            e.supsub = "sup", e.htmlTemplate = '<span class="dcg-mq-supsub dcg-mq-non-leaf dcg-mq-sup-only"><span class="dcg-mq-sup">&0</span></span>', e.textTemplate = ["^"], e.mathspeakTemplate = ["Superscript,", ", Baseline"], e.ariaLabel = "superscript", e.finalizeTree = function() {
                this.upInto = this.sup = this.ends[T], this.sup.downOutOf = m, t.finalizeTree.call(this)
            }
        });
        var ke = w($, function(e, t) {
            e.init = function(t, n, o) {
                e.ariaLabel = o || ctrlSeq.replace(/^\\/, "");
                var s = '<span class="dcg-mq-large-operator dcg-mq-non-leaf"><span class="dcg-mq-to"><span>&1</span></span><big>' + n + '</big><span class="dcg-mq-from"><span>&0</span></span></span>';
                X.prototype.init.call(this, t, s)
            }, e.createLeftOf = function(e) {
                t.createLeftOf.apply(this, arguments), e.options.sumStartsWithNEquals && (se("n").createLeftOf(e), ge().createLeftOf(e))
            }, e.latex = function() {
                function e(e) {
                    return "{" + (e || " ") + "}"
                }
                return this.ctrlSeq + "_" + e(this.ends[k].latex()) + "^" + e(this.ends[T].latex())
            }, e.mathspeak = function() {
                return "Start " + this.ariaLabel + " from " + this.ends[k].mathspeak() + " to " + this.ends[T].mathspeak() + ", end " + this.ariaLabel + ", "
            }, e.parser = function() {
                for (var e = W.string, t = W.optWhitespace, n = W.succeed, o = V.block, s = this, r = s.blocks = [Z(), Z()], c = 0; c < r.length; c += 1) r[c].adopt(s, s.ends[T], 0);
                return t.then(e("_").or(e("^"))).then(function(e) {
                    var t = r["_" === e ? 0 : 1];
                    return o.then(function(e) {
                        return e.children().adopt(t, t.ends[T], 0), n(s)
                    })
                }).many().result(s)
            }, e.finalizeTree = function() {
                this.ends[k].ariaLabel = "lower bound", this.ends[T].ariaLabel = "upper bound", this.downInto = this.ends[k], this.upInto = this.ends[T], this.ends[k].upOutOf = this.ends[T], this.ends[T].downOutOf = this.ends[k]
            }
        });
        L["∑"] = L.sum = L.summation = t(ke, "\\sum ", "&sum;", "sum"), L["∏"] = L.prod = L.product = t(ke, "\\prod ", "&prod;", "product"), L.coprod = L.coproduct = t(ke, "\\coprod ", "&#8720;", "co product"), L["∫"] = L.int = L.integral = w(ke, function(e, t) {
            e.init = function() {
                e.ariaLabel = "integral";
                X.prototype.init.call(this, "\\int ", '<span class="dcg-mq-int dcg-mq-non-leaf"><big>&int;</big><span class="dcg-mq-supsub dcg-mq-non-leaf"><span class="dcg-mq-sup"><span class="dcg-mq-sup-inner">&1</span></span><span class="dcg-mq-sub">&0</span><span style="display:inline-block;width:0">&#8203</span></span></span>', "integral")
            }, e.createLeftOf = $.p.createLeftOf
        });
        var Te = L.frac = L.dfrac = L.cfrac = L.fraction = w($, function(e, t) {
                e.ctrlSeq = "\\frac", e.htmlTemplate = '<span class="dcg-mq-fraction dcg-mq-non-leaf"><span class="dcg-mq-numerator">&0</span><span class="dcg-mq-denominator">&1</span><span style="display:inline-block;width:0">&#8203;</span></span>', e.textTemplate = ["(", ")/(", ")"], e.finalizeTree = function() {
                    this.upInto = this.ends[T].upOutOf = this.ends[k], this.downInto = this.ends[k].downOutOf = this.ends[T], this.ends[k].ariaLabel = "numerator", this.ends[T].ariaLabel = "denominator", this.getFracDepth() > 1 ? this.mathspeakTemplate = ["StartNestedFraction,", "NestedOver", ", EndNestedFraction"] : this.mathspeakTemplate = ["StartFraction,", "Over", ", EndFraction"]
                }, e.mathspeak = function(e) {
                    if (e && e.createdLeftOf) {
                        return e.createdLeftOf.parent.mathspeak()
                    }
                    return t.mathspeak.apply(this, arguments)
                }, e.getFracDepth = function() {
                    var e = function(t, n) {
                        return t instanceof A && t.ctrlSeq && t.ctrlSeq.toLowerCase().search("frac") >= 0 && (n += 1), t.parent ? e(t.parent, n) : n
                    };
                    return e(this, 0)
                }
            }),
            Ce = L.over = O["/"] = w(Te, function(t, n) {
                t.createLeftOf = function(t) {
                    if (!this.replacedFragment) {
                        var o = t[k];
                        if (!t.options.typingSlashCreatesNewFraction)
                            for (; o && !(o instanceof J || o instanceof(L.text || e) || o instanceof ke || "\\ " === o.ctrlSeq || /^[,;:]$/.test(o.ctrlSeq));) o = o[k];
                        o instanceof ke && o[T] instanceof we && (o = o[T], o[T] instanceof we && o[T].ctrlSeq != o.ctrlSeq && (o = o[T])), o !== t[k] && (this.replaces(D(o[T] || t.parent.ends[k], t[k])), t[k] = o)
                    }
                    n.createLeftOf.call(this, t)
                }
            });
        L.ans = w(X, function(e, t) {
            e.init = function(e) {
                t.init.call(this, "\\operatorname{ans}", '<span class="dcg-mq-ans">ans</span>', "ans")
            }
        }), L.percent = L.percentof = w(X, function(e, t) {
            e.init = function() {
                t.init.call(this, "\\%\\operatorname{of}", '<span class="dcg-mq-nonSymbola dcg-mq-operator-name">% of </span>', "percent of")
            }
        });
        var xe = L.sqrt = w($, function(e, t) {
                e.ctrlSeq = "\\sqrt", e.htmlTemplate = '<span class="dcg-mq-non-leaf dcg-mq-sqrt-container"><span class="dcg-mq-scaled dcg-mq-sqrt-prefix">' + Ee.sqrt.html + '</span><span class="dcg-mq-non-leaf dcg-mq-sqrt-stem">&0</span></span>', e.textTemplate = ["sqrt(", ")"], e.mathspeakTemplate = ["StartRoot,", ", EndRoot"], e.ariaLabel = "root", e.parser = function() {
                    return V.optBlock.then(function(e) {
                        return V.block.map(function(t) {
                            var n = Se();
                            return n.blocks = [e, t], e.adopt(n, 0, 0), t.adopt(n, e, 0), n
                        })
                    }).or(t.parser.call(this))
                }
            }),
            Se = (L.hat = w($, function(e, t) {
                e.ctrlSeq = "\\hat", e.htmlTemplate = '<span class="dcg-mq-non-leaf"><span class="dcg-mq-hat-prefix">^</span><span class="dcg-mq-hat-stem">&0</span></span>', e.textTemplate = ["hat(", ")"]
            }), L.nthroot = w(xe, function(e, t) {
                e.htmlTemplate = '<span class="dcg-mq-nthroot-container dcg-mq-non-leaf"><sup class="dcg-mq-nthroot dcg-mq-non-leaf">&0</sup><span class="dcg-mq-scaled dcg-mq-sqrt-container"><span class="dcg-mq-sqrt-prefix dcg-mq-scaled">' + Ee.sqrt.html + '</span><span class="dcg-mq-sqrt-stem dcg-mq-non-leaf">&1</span></span></span>', e.textTemplate = ["sqrt[", "](", ")"], e.latex = function() {
                    return "\\sqrt[" + this.ends[k].latex() + "]{" + this.ends[T].latex() + "}"
                }, e.mathspeak = function() {
                    var e = this.ends[k].mathspeak(),
                        t = this.ends[T].mathspeak();
                    return this.ends[k].ariaLabel = "Index", this.ends[T].ariaLabel = "Radicand", "3" === e ? "Start Cube Root, " + t + ", End Cube Root" : "Root Index " + e + ", Start Root, " + t + ", End Root"
                }
            })),
            _e = (L.cbrt = w(Se, function(e, t) {
                e.createLeftOf = function(e) {
                    t.createLeftOf.apply(this, arguments), ne("3").createLeftOf(e), e.controller.moveRight()
                }
            }), w($, function(e, t) {
                e.init = function(e, n, o) {
                    var s = '<span class="dcg-mq-non-leaf"><span class="dcg-mq-diacritic-above">' + n + '</span><span class="dcg-mq-diacritic-stem">&0</span></span>';
                    t.init.call(this, e, s, o)
                }
            }));
        L.vec = t(_e, "\\vec", "&rarr;", ["vec(", ")"]), L.tilde = t(_e, "\\tilde", "~", ["tilde(", ")"]);
        var Ae = w(w($, f), function(t, n) {
                t.init = function(e, t, o, s, r) {
                    n.init.call(this, "\\left" + s, g, [t, o]), this.side = e, this.sides = {}, this.sides[k] = {
                        ch: t,
                        ctrlSeq: s
                    }, this.sides[T] = {
                        ch: o,
                        ctrlSeq: r
                    }
                }, t.numBlocks = function() {
                    return 1
                }, t.html = function() {
                    var e = this.getSymbol(k),
                        t = this.getSymbol(T);
                    return this.htmlTemplate = '<span class="dcg-mq-non-leaf dcg-mq-bracket-container"><span style="width:' + e.width + '" class="dcg-mq-scaled dcg-mq-bracket-l dcg-mq-paren' + (this.side === T ? " dcg-mq-ghost" : "") + '">' + e.html + '</span><span style="margin-left:' + e.width + ";margin-right:" + t.width + '" class="dcg-mq-bracket-middle dcg-mq-non-leaf">&0</span><span style="width:' + t.width + '" class="dcg-mq-scaled dcg-mq-bracket-r dcg-mq-paren' + (this.side === k ? " dcg-mq-ghost" : "") + '">' + t.html + "</span></span>", n.html.call(this)
                }, t.getSymbol = function(e) {
                    return Ee[this.sides[e || T].ch] || {
                        width: "0",
                        html: ""
                    }
                }, t.latex = function() {
                    return "\\left" + this.sides[k].ctrlSeq + this.ends[k].latex() + "\\right" + this.sides[T].ctrlSeq
                }, t.mathspeak = function(e) {
                    var t = this.sides[k].ch,
                        o = this.sides[T].ch;
                    if ("|" === t && "|" === o) this.mathspeakTemplate = ["StartAbsoluteValue,", ", EndAbsoluteValue"], this.ariaLabel = "absolute value";
                    else {
                        if (e && e.createdLeftOf && this.side) {
                            var s = "";
                            return this.side === k ? s = this.textTemplate[0] : this.side === T && (s = this.textTemplate[1]), (this.side === k ? "left " : "right ") + Le[s]
                        }
                        this.mathspeakTemplate = ["left " + Le[t] + ",", ", right " + Le[o]], this.ariaLabel = Le[t] + " block"
                    }
                    return n.mathspeak.call(this)
                }, t.matchBrack = function(e, t, n) {
                    return n instanceof Ae && n.side && n.side !== -t && (!e.restrictMismatchedBrackets || De[this.sides[this.side].ch] === n.sides[n.side].ch || {
                        "(": "]",
                        "[": ")"
                    } [this.sides[k].ch] === n.sides[T].ch) && n
                }, t.closeOpposing = function(e) {
                    e.side = 0, e.sides[this.side] = this.sides[this.side];
                    var t = e.delimjQs.eq(this.side === k ? 0 : 1).removeClass("dcg-mq-ghost");
                    this.replaceBracket(t, this.side)
                }, t.createLeftOf = function(e) {
                    if (!this.replacedFragment) {
                        var t = e.options;
                        if ("|" === this.sides[k].ch) var o = this.matchBrack(t, T, e[T]) || this.matchBrack(t, k, e[k]) || this.matchBrack(t, 0, e.parent.parent);
                        else var o = this.matchBrack(t, -this.side, e[-this.side]) || this.matchBrack(t, -this.side, e.parent.parent)
                    }
                    if (o) {
                        var s = this.side = -o.side;
                        this.closeOpposing(o), o === e.parent.parent && e[s] && D(e[s], e.parent.ends[s], -s).disown().withDirAdopt(-s, o.parent, o, o[s]).jQ.insDirOf(s, o.jQ), o.bubble(function(e) {
                            e.reflow()
                        })
                    } else o = this, s = o.side, o.replacedFragment ? o.side = 0 : e[-s] && (o.replaces(D(e[-s], e.parent.ends[-s], s)), e[-s] = 0), n.createLeftOf.call(o, e);
                    s === k ? e.insAtLeftEnd(o.ends[k]) : e.insRightOf(o)
                }, t.placeCursor = e, t.unwrap = function() {
                    this.ends[k].children().disown().adopt(this.parent, this, this[T]).jQ.insertAfter(this.jQ), this.remove()
                }, t.deleteSide = function(e, t, n) {
                    var o = this.parent,
                        s = this[e],
                        r = o.ends[e];
                    if (e === this.side) return this.unwrap(), void(s ? n.insDirOf(-e, s) : n.insAtDirEnd(e, o));
                    var c = n.options,
                        a = !this.side;
                    if (this.side = -e, this.matchBrack(c, e, this.ends[k].ends[this.side])) {
                        this.closeOpposing(this.ends[k].ends[this.side]);
                        var i = this.ends[k].ends[e];
                        this.unwrap(), i.siblingCreated && i.siblingCreated(n.options, e), s ? n.insDirOf(-e, s) : n.insAtDirEnd(e, o)
                    } else {
                        if (this.matchBrack(c, e, this.parent.parent)) this.parent.parent.closeOpposing(this), this.parent.parent.unwrap();
                        else {
                            if (t && a) return this.unwrap(), void(s ? n.insDirOf(-e, s) : n.insAtDirEnd(e, o));
                            this.sides[e] = {
                                ch: De[this.sides[this.side].ch],
                                ctrlSeq: De[this.sides[this.side].ctrlSeq]
                            };
                            var l = this.delimjQs.removeClass("dcg-mq-ghost").eq(e === k ? 0 : 1).addClass("dcg-mq-ghost");
                            this.replaceBracket(l, e)
                        }
                        if (s) {
                            var i = this.ends[k].ends[e];
                            D(s, r, -e).disown().withDirAdopt(-e, this.ends[k], i, 0).jQ.insAtDirEnd(e, this.ends[k].jQ.removeClass("dcg-mq-empty")), i.siblingCreated && i.siblingCreated(n.options, e), n.insDirOf(-e, s)
                        } else t ? n.insDirOf(e, this) : n.insAtDirEnd(e, this.ends[k])
                    }
                }, t.replaceBracket = function(e, t) {
                    var n = this.getSymbol(t);
                    e.html(n.html).css("width", n.width), t === k ? e.next().css("margin-left", n.width) : e.prev().css("margin-right", n.width)
                }, t.deleteTowards = function(e, t) {
                    this.deleteSide(-e, !1, t)
                }, t.finalizeTree = function() {
                    this.ends[k].deleteOutOf = function(e, t) {
                        this.parent.deleteSide(e, !0, t)
                    }, this.finalizeTree = this.intentionalBlur = function() {
                        this.delimjQs.eq(this.side === k ? 1 : 0).removeClass("dcg-mq-ghost"), this.side = 0
                    }
                }, t.siblingCreated = function(e, t) {
                    t === -this.side && this.finalizeTree()
                }
            }),
            De = {
                "(": ")",
                ")": "(",
                "[": "]",
                "]": "[",
                "{": "}",
                "}": "{",
                "\\{": "\\}",
                "\\}": "\\{",
                "&lang;": "&rang;",
                "&rang;": "&lang;",
                "\\langle ": "\\rangle ",
                "\\rangle ": "\\langle ",
                "|": "|",
                "\\lVert ": "\\rVert ",
                "\\rVert ": "\\lVert "
            },
            Le = {
                "&lang;": "angle-bracket",
                "&rang;": "angle-bracket",
                "|": "pipe"
            };
        h("(", null, "parenthesis"), h("[", null, "bracket"), h("{", "\\{", "brace"), L.langle = t(Ae, k, "&lang;", "&rang;", "\\langle ", "\\rangle "), L.rangle = t(Ae, T, "&lang;", "&rang;", "\\langle ", "\\rangle "), O["|"] = t(Ae, k, "|", "|", "|", "|"), L.lVert = t(Ae, k, "&#8741;", "&#8741;", "\\lVert ", "\\rVert "), L.rVert = t(Ae, T, "&#8741;", "&#8741;", "\\lVert ", "\\rVert "), L.left = w($, function(e) {
            e.parser = function() {
                var e = W.regex,
                    t = W.string,
                    n = (W.succeed, W.optWhitespace);
                return n.then(e(/^(?:[([|]|\\\{|\\langle\b|\\lVert\b)/)).then(function(o) {
                    var s = o.replace(/^\\/, "");
                    return "\\langle" == o && (s = "&lang;", o += " "), "\\lVert" == o && (s = "&#8741;", o += " "), V.then(function(r) {
                        return t("\\right").skip(n).then(e(/^(?:[\])|]|\\\}|\\rangle\b|\\rVert\b)/)).map(function(e) {
                            var t = e.replace(/^\\/, "");
                            "\\rangle" == e && (t = "&rang;", e += " "), "\\rVert" == e && (t = "&#8741;", e += " ");
                            var n = Ae(0, s, t, o, e);
                            return n.blocks = [r], r.adopt(n, 0, 0), n
                        })
                    })
                })
            }
        }), L.right = w($, function(e) {
            e.parser = function() {
                return W.fail("unmatched \\right")
            }
        });
        var Oe = L.binom = L.binomial = w(w($, f), function(e, t) {
            var n = Ee["("],
                o = Ee[")"];
            e.ctrlSeq = "\\binom", e.htmlTemplate = '<span class="dcg-mq-non-leaf dcg-mq-bracket-container"><span style="width:' + n.width + '" class="dcg-mq-paren dcg-mq-bracket-l dcg-mq-scaled">' + n.html + '</span><span style="margin-left:' + n.width + "; margin-right:" + o.width + ';" class="dcg-mq-non-leaf dcg-mq-bracket-middle"><span class="dcg-mq-array dcg-mq-non-leaf"><span>&0</span><span>&1</span></span></span><span style="width:' + o.width + '" class="dcg-mq-paren dcg-mq-bracket-r dcg-mq-scaled">' + o.html + "</span></span>", e.textTemplate = ["choose(", ",", ")"], e.mathspeakTemplate = ["StartBinomial,", "Choose", ", EndBinomial"], e.ariaLabel = "binomial"
        });
        L.choose = w(Oe, function(e) {
            e.createLeftOf = Ce.prototype.createLeftOf
        });
        L.editable = L.MathQuillMathField = w($, function(e, t) {
            e.ctrlSeq = "\\MathQuillMathField", e.htmlTemplate = '<span class="dcg-mq-editable-field"><span class="dcg-mq-root-block">&0</span></span>', e.parser = function() {
                var e = this,
                    n = W.string,
                    o = W.regex,
                    s = W.succeed;
                return n("[").then(o(/^[a-z][a-z0-9]*/i)).skip(n("]")).map(function(t) {
                    e.name = t
                }).or(s()).then(t.parser.call(e))
            }, e.finalizeTree = function(e) {
                var t = F(this.ends[k], this.jQ, e);
                t.KIND_OF_MQ = "MathField", t.editable = !0, t.createTextarea(), t.editablesTextareaEvents(), t.cursor.insAtRightEnd(t.root), p(t.root)
            }, e.registerInnerField = function(e, t) {
                e.push(e[this.name] = t(this.ends[k].controller))
            }, e.latex = function() {
                return this.ends[k].latex()
            }, e.text = function() {
                return this.ends[k].text()
            }
        });
        var Ie = L.embed = w(X, function(e, t) {
                e.setOptions = function(e) {
                    function t() {
                        return ""
                    }
                    return this.text = e.text || t, this.htmlTemplate = e.htmlString || "", this.latex = e.latex || t, this
                }, e.parser = function() {
                    var e = this,
                        t = W.string,
                        n = W.regex,
                        o = W.succeed;
                    return t("{").then(n(/^[a-z][a-z0-9]*/i)).skip(t("}")).then(function(s) {
                        return t("[").then(n(/^[-\w\s]*/)).skip(t("]")).or(o()).map(function(t) {
                            return e.setOptions(P[s](t))
                        })
                    })
                }
            }),
            qe = d(1);
        for (var Fe in qe) ! function(e, t) {
            "function" == typeof t ? (u[e] = function() {
                return l(), t.apply(this, arguments)
            }, u[e].prototype = t.prototype) : u[e] = t
        }(Fe, qe[Fe])
    }(), define("mathquill_src", ["jquery"], function() {}), define("loadcss!Symbola-basic", function() {}), define("loadcss!vendor_css/mathquill/mathquill-basic", function() {}), define("toplevel/mathquill", ["require", "mathquill_src", "loadcss!Symbola-basic", "loadcss!vendor_css/mathquill/mathquill-basic"], function(e) {
        return e("mathquill_src"), e("loadcss!Symbola-basic"), e("loadcss!vendor_css/mathquill/mathquill-basic"), window.MathQuill.noConflict()
    }), define("lib/deepCopy", ["require", "exports"], function(e, t) {
        "use strict";

        function n(e) {
            var t = e;
            if (t && "function" == typeof t.toJSON && (t = t.toJSON()), !t) return t;
            if ("object" != typeof t) return t;
            if (Array.isArray(t)) return t.map(n);
            var o = {};
            for (var s in t) t.hasOwnProperty(s) && (o[s] = n(t[s]));
            return o
        }
        Object.defineProperty(t, "__esModule", {
            value: !0
        }), t.default = n
    }), define("config", ["require", "exports", "lib/deepCopy"], function(e, t, n) {
        "use strict";

        function o(e) {
            return r[e]
        }

        function s() {
            return n.default(r)
        }
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var r = {},
            c = location.search;
        "?" === c[0] && (c = c.slice(1));
        for (var a = c.split("&"), i = {}, l = 0; l < a.length; l++) {
            var u = a[l].split("=");
            i[u[0]] = 2 !== u.length || u[1]
        }
        if ("undefined" != typeof Desmos && Desmos.config)
            for (var d in Desmos.config) Desmos.config.hasOwnProperty(d) && (i[d] = Desmos.config[d]);
        var p = function(e) {
                return i.hasOwnProperty(e)
            },
            m = function(e) {
                r[e] = p(e)
            },
            f = function(e) {
                r[e] = !p("no" + e)
            };
        m("testing"), m("maintenance"), m("disableScrollFix"), m("nativeOnscreenKeypad"), m("hidden"), m("disableMouseInteractions"), m("advancedStyling"), m("authorIDE"), m("clickableObjects"), m("outofdom"), i.lang && (r.lang = i.lang), i.fontSize && (r.fontSize = i.fontSize), i.backgroundColor && (r.backgroundColor = "#" + i.backgroundColor), i.textColor && (r.textColor = "#" + i.textColor), i.brailleMode && (r.brailleMode = i.brailleMode), i.sixKeyInput && (r.sixKeyInput = !0), r.no_navigation_warning = p("noconcat") || p("testing"), r.previewMessage = "You're previewing some new accessibility features.", r.previewFeedbackUrl = "mailto:feedback@desmos.com";
        var h = location && "preview.desmos.com" === location.hostname;
        r.previewMode = p("previewMode") || h, m("lockViewport"), m("administerSecretFolders"), m("clickableObjects"), m("degreeMode"), m("clearIntoDegreeMode"), m("plaidMode"), m("editOnWeb"), m("crossOriginSaveTest"), m("showResetButtonOnGraphpaper"), m("transparentBackground"), f("links"), f("trace"), m("expressionsCollapsed"), m("invertedColors"), m("projectorMode"), f("images"), f("folders"), f("settingsMenu"), f("expressionsTopbar"), f("zoomButtons"), f("keypad"), f("graphpaper"), f("expressions"), f("expressionsTopbar"), f("settingsMenu"), f("branding"), f("pointsOfInterest"), f("plotSingleVariableImplicitEquations"), f("plotImplicits"), f("plotInequalities"), f("notes"), f("sliders"), m("pauseWhenOffscreen"), m("sciKeypad"), m("4fnKeypad"), m("ans"), p("braille") && (r.braille = !0), f("qwertyKeyboard"), m("restrictedFunctions"), f("functionDefinition"), m("singleExpression"), m("restrictedEditing"), m("replaceCommaWith10Exp"), m("replaceRoundWithReciprocal"), p("typingAsteriskWritesTimesSymbol") && (r.typingAsteriskWritesTimesSymbol = !0), f("labels"), m("bare-i18n"), f("distributions"), r["4fnKeypad"] ? m("decimalToFraction") : f("decimalToFraction"), m("3d"), p("exponentButtonForSquareRoot") ? r.additionalFunctions = ["exponent"] : i.additionalFunctions && "string" == typeof i.additionalFunctions && (r.additionalFunctions = i.additionalFunctions.split(",")), t.get = o, t.all = s
    }), define("mathquill", ["require", "browser", "jquery", "toplevel/mathquill", "config"], function(e) {
        var t = e("browser"),
            n = e("jquery"),
            o = e("toplevel/mathquill").getInterface(1),
            s = e("config"),
            r = ["erf|error-function", "TTest|t-test ttest|t-test TScore|t-score tscore|t-score", "iTTest|independent-t-test ittest|independent-t-test IndependentTTest", "TScore|t-score Tscore|t-score tscore|t-score", "normaldist|normal-distribution tdist|t-distribution poissondist|poisson-distribution", "binomialdist|binomial-distribution", "uniformdist|uniform-distribution", "pdf cdf random inverseCdf inversecdf", "histogram dotplot boxplot", "pdf cdf", "histogram dotplot boxplot"].join(" "),
            c = ["cube sphere cone dodecahedron octahedron tetrahedron"].join(" ");
        return o.config({
            leftRightIntoCmdGoes: "up",
            sumStartsWithNEquals: !0,
            supSubsRequireOperand: !0,
            charsThatBreakOutOfSupSub: "+-=<>*",
            autoCommands: "alpha beta sqrt theta phi pi tau nthroot cbrt sum prod int ans percent infinity infty",
            autoSubscriptNumerals: !0,
            restrictMismatchedBrackets: !0,
            typingPercentWritesPercentOf: !0,
            substituteTextarea: function() {
                return t.IS_IOS || t.IS_ANDROID ? n('<span class="dcg-mathquill-input-span" tabindex=0 role="textbox" style="display:inline-block;height:1px;width:1px">')[0] : t.IS_WINDOWS && t.IS_TOUCH ? n("<textarea readonly>").on("keydown", function() {
                    this.readOnly = !1, this.select()
                }).on("blur", function() {
                    this.readOnly = !0
                })[0] : n("<textarea>")[0]
            },
            autoOperatorNames: ["exp|exponent ln|natural-log log", "total length mean median quantile quartile nCr nPr stats", "stdev|standard-deviation stddev|standard-deviation", "stdDev|standard-deviation stdevp|standard-deviation-population", "stddevp|standard-deviation-population stdDevP|standard-deviation-population mad var|variance", "varp|variance-population variance cov|co-variance corr|correlation spearman", "lcm mcm gcd mcd gcf mod ceil|ceiling floor round abs|absolute-value min max sign|signum signum", "sin|sine cos|cosine tan|tangent csc|co-secant sec|secant cot|co-tangent", "sinh|hyperbolic-sine cosh|hyperbolic-cosine tanh|hyperbolic-tangent csch|hyperbolic-co-secant", "sech|hyperbolic-secant coth|hyperbolic-co-tangent", "arcsin|arc-sine arccos|arc-cosine arctan|arc-tangent arccsc|arc-co-secant arcsec|arc-secant", "arccot|arc-co-tangent", "arcsinh|hyperbolic-arc-sine arccosh|hyperbolic-arc-cosine arctanh|hyperbolic-arc-co-tangent", "arccsch|hyperbolic-arc-co-secant arcsech|hyperbolic-arc-secant", "arccoth|hyperbolic-arc-co-tangent", "polygon", "distance midpoint", r, s.get("3d") ? c : ""].filter(function(e) {
                return !!e
            }).join(" "),
            resetCursorOnBlur: !0,
            enableDigitGrouping: !0
        })
    }), define("vendor/mathquill", ["require", "exports", "toplevel/mathquill", "mathquill"], function(e, t, n, o) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        }), t.MQ = n.getInterface(1).config(o)
    }), define("loadcss!dcgview-helpers/static-mathquill-view", function() {}), define("dcgview-helpers/static-mathquill-view", ["require", "exports", "tslib", "dcgview", "vendor/mathquill", "jquery", "lib/conditional_blur", "loadcss!./static-mathquill-view"], function(e, t, n, o, s, r, c) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var a = function(e) {
            function t() {
                return null !== e && e.apply(this, arguments) || this
            }
            return n.__extends(t, e), t.prototype.template = function() {
                var e = this;
                return 1 === this.children.length ? this.children[0] : o.createElement("div", {
                    didMount: function(t) {
                        return e.didMountMathquill(t)
                    }
                })
            }, t.prototype.didMount = function() {
                1 === this.children.length && this.didMountMathquill(this.findRootNode())
            }, t.prototype.didMountMathquill = function(e) {
                this.staticMath = s.MQ.StaticMath(e), r(e).off(".mathquill").addClass("dcg-static-mathquill-view").on("dcg-tapstart", function() {
                    c.default()
                }), this.updateMathquill()
            }, t.prototype.didUpdate = function() {
                this.updateMathquill()
            }, t.prototype.updateMathquill = function() {
                this.updateMathquillAria(), this.updateMathquillLatex()
            }, t.prototype.updateMathquillLatex = function() {
                if (this.staticMath) {
                    var e = this.props.latex();
                    this.lastLatex !== e && (this.staticMath.latex(e), this.lastLatex = e, this.props.onReflow && this.props.onReflow())
                }
            }, t.prototype.updateMathquillAria = function() {
                if (this.staticMath && this.props.getAriaLabel) {
                    var e = this.props.getAriaLabel();
                    e !== this.staticMath.getAriaLabel() && this.staticMath.setAriaLabel(e)
                }
            }, t
        }(o.Class);
        t.default = a
    }), define("loadcss!lib/tooltip", function() {}), define("lib/tooltip", ["require", "exports", "tslib", "keys", "dcgview", "jquery", "underscore", "dcgview-helpers/static-mathquill-view", "loadcss!./tooltip"], function(e, t, n, o, s, r, c, a) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var i = s.Components.IfElse,
            l = function(e) {
                function t() {
                    return null !== e && e.apply(this, arguments) || this
                }
                return n.__extends(t, e), t.prototype.template = function() {
                    var e = this;
                    return s.createElement("div", {
                        class: s.const("dcg-tooltip-positioning-container"),
                        style: function() {
                            return {
                                top: e.props.hitAreaRect().top + (e.props.offset().top || 0) + "px",
                                left: e.props.hitAreaRect().left + "px",
                                width: e.props.hitAreaRect().width + "px",
                                height: e.props.hitAreaRect().height + "px"
                            }
                        }
                    }, s.createElement("div", {
                        class: s.const("dcg-tooltip-message-container"),
                        style: this.bindFn(this.getMessageStyle)
                    }, i(function() {
                        return e.props.renderAsLatex()
                    }, {
                        true: function() {
                            return s.createElement("div", {
                                class: function() {
                                    return {
                                        "dcg-tooltip-message": !0,
                                        "dcg-latex": !0,
                                        "dcg-sticky-not-stuck": e.props.isStickyAndNotStuck()
                                    }
                                }
                            }, s.createElement(a.default, {
                                latex: function() {
                                    return e.props.tooltip()
                                }
                            }))
                        },
                        false: function() {
                            return s.createElement("div", {
                                class: s.const("dcg-tooltip-message"),
                                style: function() {
                                    return {
                                        background: e.getBackgroundColor(),
                                        cursor: e.props.isStickyAndNotStuck() ? "pointer" : "default"
                                    }
                                }
                            }, e.props.tooltip)
                        }
                    })), s.createElement("div", {
                        class: s.const("dcg-tooltip-arrow"),
                        style: function() {
                            return e.props.renderAsLatex() ? e.getArrowWithBorderStyle() : e.getSolidArrowStyle()
                        }
                    }))
                }, t.prototype.getArrowWithBorderStyle = function() {
                    var e = this.props.gravity(),
                        t = this.getBackgroundColor(),
                        o = this.props.isStickyAndNotStuck() ? ".95" : "1",
                        s = {
                            width: "8px",
                            height: "8px",
                            border: "1px solid #bbb",
                            transform: "rotate(45deg)",
                            background: t,
                            opacity: o
                        };
                    switch (e) {
                        case "s":
                            return n.__assign(n.__assign({}, s), {
                                top: "100%",
                                left: "50%",
                                "margin-top": "1px",
                                "border-right": "0",
                                "border-bottom": "0"
                            });
                        case "sw":
                            return n.__assign(n.__assign({}, s), {
                                top: "100%",
                                right: "10px",
                                "margin-top": "1px",
                                "border-right": "0",
                                "border-bottom": "0"
                            });
                        case "se":
                            return n.__assign(n.__assign({}, s), {
                                top: "100%",
                                left: "10px",
                                "margin-top": "1px",
                                "border-right": "0",
                                "border-bottom": "0"
                            });
                        case "n":
                            return n.__assign(n.__assign({}, s), {
                                bottom: "100%",
                                left: "50%",
                                "margin-bottom": "1px",
                                "border-left": "0",
                                "border-top": "0"
                            });
                        case "nw":
                            return n.__assign(n.__assign({}, s), {
                                bottom: "100%",
                                right: "10px",
                                "margin-bottom": "1px",
                                "border-left": "0",
                                "border-top": "0"
                            });
                        case "ne":
                            return n.__assign(n.__assign({}, s), {
                                bottom: "100%",
                                left: "10px",
                                "margin-bottom": "1px",
                                "border-left": "0",
                                "border-top": "0"
                            });
                        case "e":
                            return n.__assign(n.__assign({}, s), {
                                transform: "translateY(-50%) rotate(45deg)",
                                top: "50%",
                                left: "100%",
                                "margin-left": "1px",
                                "border-right": "0",
                                "border-top": "0"
                            });
                        case "w":
                            return n.__assign(n.__assign({}, s), {
                                transform: "translateY(-50%) rotate(45deg)",
                                top: "50%",
                                right: "100%",
                                "margin-right": "1px",
                                "border-left": "0",
                                "border-bottom": "0"
                            });
                        default:
                            return e
                    }
                }, t.prototype.getSolidArrowStyle = function() {
                    var e = this.props.gravity(),
                        t = this.props.offset().left || 0,
                        n = this.getBackgroundColor(),
                        o = "transparent transparent " + n + " transparent",
                        s = n + " transparent transparent transparent",
                        r = "transparent " + n + " transparent transparent",
                        c = "transparent transparent transparent " + n;
                    switch (e) {
                        case "s":
                            return {
                                top: "100%", left: "50%", border: "5px solid transparent", "border-color": o, "margin-top": "-5px", "margin-left": "-5px"
                            };
                        case "sw":
                            return {
                                top: "100%", right: "10px", border: "5px solid transparent", "border-color": o, "margin-top": "-5px", "margin-left": "-5px"
                            };
                        case "se":
                            return {
                                top: "100%", left: "10px", border: "5px solid transparent", "border-color": o, "margin-top": "-5px", "margin-left": "-5px"
                            };
                        case "n":
                            return {
                                bottom: "100%", left: "50%", border: "5px solid transparent", "border-color": s, "margin-bottom": "-5px", "margin-left": "-5px"
                            };
                        case "nw":
                            return {
                                bottom: "100%", right: "10px", border: "5px solid transparent", "border-color": s, "margin-bottom": "-5px", "margin-left": "-5px"
                            };
                        case "ne":
                            return {
                                bottom: "100%", left: "10px", border: "5px solid transparent", "border-color": s, "margin-bottom": "-5px", "margin-left": "-5px"
                            };
                        case "e":
                            return {
                                top: "50%", left: "100%", border: "5px solid transparent", "border-color": r, "margin-left": "-" + (5 - t) + "px", "margin-top": "-5px"
                            };
                        case "w":
                            return {
                                top: "50%", right: "100%", border: "5px solid transparent", "border-color": c, "margin-right": "-5px", "margin-top": "-5px"
                            };
                        default:
                            return e
                    }
                }, t.prototype.getBackgroundColor = function() {
                    return this.props.renderAsLatex() ? "#fff" : this.props.isStickyAndNotStuck() ? "#666" : "#000"
                }, t.prototype.getMessageStyle = function() {
                    var e = this.props.hitAreaRect(),
                        t = this.props.gravity(),
                        n = this.props.offset().left || 0;
                    switch (t) {
                        case "s":
                            return {
                                top: "100%", transform: "translate(-50%, 0)", left: .5 * e.width + n + "px", "margin-top": "5px", "text-align": "center"
                            };
                        case "sw":
                            return {
                                top: "100%", right: -n + "px", "margin-top": "5px", "text-align": "right"
                            };
                        case "se":
                            return {
                                top: "100%", left: n + "px", "margin-top": "5px", "text-align": "left"
                            };
                        case "n":
                            return {
                                bottom: "100%", transform: "translate(-50%, 0)", left: .5 * e.width + n + "px", "margin-bottom": "5px", "text-align": "center"
                            };
                        case "nw":
                            return {
                                bottom: "100%", right: -n + "px", "margin-bottom": "5px", "text-align": "right"
                            };
                        case "ne":
                            return {
                                bottom: "100%", left: n + "px", "margin-bottom": "5px", "text-align": "left"
                            };
                        case "e":
                            return {
                                transform: "translate(0, -50%)", left: "100%", top: .5 * e.height + "px", "margin-left": 5 + n + "px", "text-align": "left"
                            };
                        case "w":
                            return {
                                transform: "translate(0, -50%)", right: "100%", top: .5 * e.height + "px", "margin-right": 5 - n + "px", "text-align": "right"
                            };
                        default:
                            return t
                    }
                }, t
            }(s.Class),
            u = function(e) {
                function t() {
                    return null !== e && e.apply(this, arguments) || this
                }
                return n.__extends(t, e), t.prototype.init = function() {
                    this.uuid = c.uniqueId(), this.isMounted = !0
                }, t.prototype.template = function() {
                    var e = this;
                    return s.createElement("div", {
                        class: s.const("dcg-tooltip-hit-area-container"),
                        handleevent: s.const("true"),
                        didMount: function(t) {
                            e.hitAreaNode = t, e.setupEventListeners(e.hitAreaNode)
                        },
                        onTap: function() {
                            if (e.isStuck) return e.clearTimeouts(), void e.hideTooltip();
                            e.isSticky() ? (e.showTooltip(), e.stickTooltip()) : e.hideTooltip()
                        }
                    }, this.children)
                }, t.prototype.didUpdate = function() {
                    this.updateTooltip()
                }, t.prototype.updateTooltip = function() {
                    if (this.wrapperRef) {
                        var e = this.hitAreaNode.getBoundingClientRect(),
                            t = this.wrapperRef.elt.getBoundingClientRect(),
                            n = this.wrapperRef,
                            o = n.originalTop,
                            s = n.originalLeft,
                            r = e.top - t.top,
                            c = e.left - t.left;
                        Math.abs(r - o) > 3 || Math.abs(c - s) > 3 ? this.hideTooltip() : this.wrapperRef.view.update()
                    }
                }, t.prototype.setupEventListeners = function(e) {
                    var t = this;
                    r(e).on("tipsyshow", function(n) {
                        if (!(n.target !== e || t.props.disabled && t.props.disabled())) {
                            var o = t.props.delay ? t.props.delay() : 500;
                            t.clearTimeouts(), t.showTooltipTimeout = setTimeout(t.bindFn(t.showTooltip), o)
                        }
                    }).on("tipsyhide", function(n) {
                        n.target !== e || t.isStuck || (t.clearTimeouts(), t.hideTooltipTimeout = setTimeout(t.bindFn(t.hideTooltip), 150))
                    })
                }, t.prototype.willUnmount = function() {
                    this.clearTimeouts(), this.isMounted = !1, this.hideTooltip()
                }, t.prototype.stickTooltip = function() {
                    var e = this;
                    this.isMounted && this.wrapperRef && (this.isStuck || (r(document).on("mousedown.dcg-tooltip-" + this.uuid + " touchstart.dcg-tooltip-" + this.uuid + " pointerdown.dcg-tooltip-" + this.uuid, function(t) {
                        e.wrapperRef && (r(t.target).closest(e.hitAreaNode).length || r(t.target).closest(e.wrapperRef.elt).length || e.hideTooltip())
                    }), this.isStuck = !0, this.updateTooltip()))
                }, t.prototype.clearTimeouts = function() {
                    clearTimeout(this.showTooltipTimeout), clearTimeout(this.hideTooltipTimeout)
                }, t.prototype.showTooltip = function() {
                    var e = this;
                    if (this.isMounted && !this.wrapperRef) {
                        var t = this.hitAreaNode.getBoundingClientRect(),
                            n = document.createElement("div");
                        n.className = "dcg-tooltip-mount-pt";
                        r(this.hitAreaNode).closest(".dcg-tap-container")[0].appendChild(n);
                        var c = n.getBoundingClientRect(),
                            a = t.left - c.left,
                            i = t.top - c.top,
                            u = {
                                tooltip: this.props.tooltip,
                                isStickyAndNotStuck: function() {
                                    return e.isSticky() && !e.isStuck
                                },
                                offset: function() {
                                    return e.props.offset ? e.props.offset() : {}
                                },
                                gravity: function() {
                                    return e.props.gravity ? e.props.gravity() : "s"
                                },
                                renderAsLatex: function() {
                                    return !!e.props.renderAsLatex && e.props.renderAsLatex()
                                },
                                hitAreaRect: function() {
                                    return {
                                        top: i || 0,
                                        left: a || 0,
                                        width: t.width || 0,
                                        height: t.height || 0
                                    }
                                }
                            };
                        this.setupEventListeners(n), r(n).on("dcg-tap", function() {
                            e.isSticky() && e.stickTooltip()
                        });
                        var d = s.mountToNode(l, n, u);
                        r(document).on("keydown.dcg-tooltip-" + this.uuid, function(t) {
                            o.lookup(t) === o.ESCAPE && e.hideTooltip()
                        });
                        var p = function() {
                            return e.updateTooltip()
                        };
                        window.addEventListener("scroll", p, !0), this.wrapperRef = {
                            elt: n,
                            view: d,
                            originalLeft: a,
                            originalTop: i,
                            onScroll: p
                        }
                    }
                }, t.prototype.hideTooltip = function() {
                    this.clearTimeouts(), this.wrapperRef && (this.isStuck = !1, r(document).off(".dcg-tooltip-" + this.uuid), window.removeEventListener("scroll", this.wrapperRef.onScroll, !0), s.unmountFromNode(this.wrapperRef.elt), this.wrapperRef.elt.parentNode && this.wrapperRef.elt.parentNode.removeChild(this.wrapperRef.elt), this.wrapperRef = void 0)
                }, t.prototype.isSticky = function() {
                    return !!this.props.sticky && this.props.sticky()
                }, t
            }(s.Class);
        t.Tooltip = u
    }), define("loadcss!shared-header/header-bar", function() {}), define("practice/header-view", ["require", "exports", "tslib", "dcgview", "./dcgview-practice", "../lib/tooltip", "loadcss!shared-header/header-bar"], function(e, t, n, o, s, r) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var c = o.Components.If,
            a = function(e) {
                function t() {
                    return null !== e && e.apply(this, arguments) || this
                }
                return n.__extends(t, e), t.prototype.template = function() {
                    var e = this;
                    return o.createElement("div", {
                        class: function() {
                            return {
                                "dcg-header": !0,
                                "dcg-secure-header": !0,
                                "dcg-header-desktop": !0
                            }
                        },
                        style: function() {
                            return {
                                "background-color": e.controller.getHeaderColor()
                            }
                        },
                        role: o.const("navigation")
                    }, o.createElement("div", {
                        class: o.const("align-left-container")
                    }, o.createElement("div", {
                        class: o.const("title-div")
                    }, o.createElement("span", {
                        role: o.const("heading"),
                        "aria-level": o.const("1"),
                        class: o.const("dcg-config-name")
                    }, function() {
                        return e.controller.getCurrentTitle()
                    }))), o.createElement("div", {
                        class: o.const("align-center-container")
                    }, o.createElement(c, {
                        predicate: function() {
                            return e.controller.shouldShowSecureBadge()
                        }
                    }, function() {
                        return o.createElement("i", {
                            class: o.const("dcg-icon-desmos-badge"),
                            "aria-label": o.const("Desmos Secure Badge")
                        })
                    }), o.createElement("i", {
                        class: o.const("dcg-icon-desmos"),
                        "aria-label": o.const("desmos Logo")
                    })), o.createElement("div", {
                        class: o.const("align-right-container")
                    }, o.createElement(c, {
                        predicate: function() {
                            return e.controller.isInSession()
                        }
                    }, function() {
                        return o.createElement(r.Tooltip, {
                            tooltip: e.const("Help"),
                            gravity: e.const("s"),
                            sticky: e.const(!1)
                        }, o.createElement("i", {
                            class: o.const("dcg-icon-question-sign dcg-help-btn"),
                            role: o.const("button"),
                            tabindex: o.const("0"),
                            "aria-label": o.const("Help"),
                            onTap: function() {
                                return e.controller.dispatch({
                                    type: "toggle-help-menu"
                                })
                            }
                        }))
                    }), o.createElement(c, {
                        predicate: function() {
                            return e.controller.shouldShowDoneButton()
                        }
                    }, function() {
                        return o.createElement("div", {
                            class: o.const("dcg-end-test-button"),
                            role: o.const("button"),
                            tabindex: o.const("0"),
                            onTap: function() {
                                return e.controller.dispatch({
                                    type: "header-done"
                                })
                            }
                        }, o.const("Done"))
                    })))
                }, t.prototype.getError = function() {
                    return "Turn something off / on"
                }, t
            }(s.default);
        t.default = a
    }), define("lib/aria", ["require", "exports", "browser", "jquery"], function(e, t, n, o) {
        "use strict";

        function s(e) {
            a.push(e)
        }

        function r(e) {
            if (void 0 !== e && s(e), void 0 !== c && a.length > 0) {
                var t = a.join(" ").replace(/ +(?= )/g, "");
                c.attr("aria-relevant", i === t && n.IS_APPLE ? "all" : "additions text"), c.empty().text(t), i = t
            }
            a.length = 0
        }
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var c, a = [],
            i = "";
        t.queue = s, t.alert = r, o(document).ready(function() {
            var e = ".dcg-aria-alert";
            0 === o(e).length && o("body").append("<p aria-live='assertive' aria-atomic='true' class='dcg-aria-alert'></p>"), c = o(e)
        })
    }), define("loadcss!dcgview-helpers/searchable-dropdown", function() {}), define("dcgview-helpers/searchable-dropdown", ["require", "exports", "tslib", "dcgview", "keys", "lib/aria", "loadcss!./searchable-dropdown"], function(e, t, n, o, s, r) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var c = o.Components,
            a = c.If,
            i = c.For,
            l = c.Input,
            u = function(e) {
                function t() {
                    var t = null !== e && e.apply(this, arguments) || this;
                    return t.filter = void 0, t.focusLocation = void 0, t.lastResultCount = 0, t
                }
                return n.__extends(t, e), t.prototype.template = function() {
                    var e = this;
                    return o.createElement("div", {
                        class: o.const("dcg-search-container"),
                        onKeydown: this.bindFn(this.onKeydown)
                    }, o.createElement(a, {
                        predicate: this.props.renderWithInput
                    }, function() {
                        return o.createElement("div", {
                            role: o.const("search"),
                            class: o.const("dcg-searchable-dropdown")
                        }, o.createElement(l, {
                            didMount: e.bindFn(e.didMountInput),
                            onInput: e.bindFn(e.onInputChange),
                            value: e.bindFn(e.getFilterString),
                            placeholder: e.const("Find your test"),
                            manageFocus: e.const({
                                shouldBeFocused: e.bindFn(e.shouldFilterBeFocused),
                                onFocusedChanged: e.bindFn(e.onFilterFocusChange)
                            })
                        }), o.createElement(a, {
                            predicate: function() {
                                return e.shouldShowDeleteX()
                            }
                        }, function() {
                            return o.createElement("div", {
                                class: o.const("dcg-remove-x dcg-do-not-blur")
                            }, o.createElement("span", {
                                class: o.const("dcg-icon-remove"),
                                onTap: e.bindFn(e.onDeleteXTapped)
                            }))
                        }))
                    }), o.createElement(a, {
                        predicate: function() {
                            return e.getFilteredOptions().length > 0
                        }
                    }, function() {
                        return o.createElement("div", {
                            class: o.const("dcg-searchable-dropdown-list-container")
                        }, o.createElement(i, {
                            each: function() {
                                return e.getFilteredOptions()
                            },
                            key: function(e) {
                                return e.id + "-" + e.label
                            }
                        }, o.createElement("div", {
                            class: function() {
                                return {
                                    "dcg-searchable-dropdown-list": !0,
                                    "dcg-do-not-blur": !0,
                                    "dcg-no-input": !e.props.renderWithInput()
                                }
                            },
                            role: o.const("listbox"),
                            "aria-label": o.const("Results")
                        }, function(t) {
                            return o.createElement("div", {
                                class: o.const("dcg-searchable-dropdown-option"),
                                role: o.const("option"),
                                onTap: function(n) {
                                    return e.selectOption(t, "keyboard" === n.device)
                                },
                                manageFocus: e.const({
                                    shouldBeFocused: function() {
                                        return e.shouldOptionBeFocused(t)
                                    },
                                    onFocusedChanged: function(n) {
                                        return e.onOptionFocusChange(t, n)
                                    }
                                }),
                                tabindex: o.const(0)
                            }, e.const(t.label))
                        })))
                    }), o.createElement(a, {
                        predicate: function() {
                            return 0 === e.getFilteredOptions().length
                        }
                    }, function() {
                        return o.createElement("div", {
                            class: o.const("dcg-searchable-dropdown-list dcg-no-search-results")
                        }, o.const("No results."))
                    }))
                }, t.prototype.didMountInput = function() {
                    this.focusFilter()
                }, t.prototype.shouldShowDeleteX = function() {
                    return !!this.getFilterString()
                }, t.prototype.onDeleteXTapped = function() {
                    this.filter = void 0, this.focusFilter(), this.update()
                }, t.prototype.shouldFilterBeFocused = function() {
                    return this.focusLocation && "filter" === this.focusLocation.type
                }, t.prototype.onFilterFocusChange = function(e) {
                    e ? this.focusFilter() : (this.filter = void 0, this.focusLocation = void 0, this.update())
                }, t.prototype.shouldOptionBeFocused = function(e) {
                    return this.focusLocation && "option" === this.focusLocation.type && this.focusLocation.id === e.id
                }, t.prototype.focusFilter = function() {
                    this.focusLocation = {
                        type: "filter"
                    }, this.update()
                }, t.prototype.focusOption = function(e) {
                    this.focusLocation = {
                        type: "option",
                        id: e.id
                    }, this.update()
                }, t.prototype.getFocusedOptionIndex = function() {
                    if (!this.focusLocation) return -1;
                    if ("option" !== this.focusLocation.type) return -1;
                    for (var e = this.focusLocation.id, t = this.getFilteredOptions(), n = 0; n < t.length; n++) {
                        if (t[n].id === e) return n
                    }
                    return -1
                }, t.prototype.onOptionFocusChange = function(e, t) {
                    t ? this.focusOption(e) : (this.focusLocation = void 0, this.update())
                }, t.prototype.onKeydown = function(e) {
                    switch (s.lookup(e)) {
                        case s.ENTER:
                            if (this.shouldFilterBeFocused()) {
                                var t = this.getFilteredOptions();
                                1 === t.length && this.selectOption(t[0], !0)
                            }
                            break;
                        case s.UP:
                            this.moveFocusInDirection(-1) && e.preventDefault();
                            break;
                        case s.DOWN:
                            this.moveFocusInDirection(1) && e.preventDefault();
                            break;
                        case s.HOME:
                            e.preventDefault(), this.focusFirstOption();
                            break;
                        case s.END:
                            e.preventDefault(), this.focusLastOption();
                            break;
                        case s.ESCAPE:
                            this.props.onCancel();
                            break;
                        case s.TAB:
                            e.shiftKey ? this.moveFocusInDirection(-1) && e.preventDefault() : this.moveFocusInDirection(1) && e.preventDefault()
                    }
                }, t.prototype.moveFocusInDirection = function(e) {
                    var t = this.getFilteredOptions(),
                        n = this.getFocusedOptionIndex(),
                        o = n + e;
                    if (-1 == o && this.props.renderWithInput()) return this.focusFilter(), !0;
                    var s = t[o];
                    return !!s && (this.focusOption(s), !0)
                }, t.prototype.focusFirstOption = function() {
                    var e = this.getFilteredOptions();
                    0 !== e.length && this.focusOption(e[0])
                }, t.prototype.focusLastOption = function() {
                    var e = this.getFilteredOptions();
                    0 !== e.length && this.focusOption(e[e.length - 1])
                }, t.prototype.onInputChange = function(e) {
                    this.filter = e, this.update()
                }, t.prototype.getFilterString = function() {
                    return this.filter || ""
                }, t.prototype.selectOption = function(e, t) {
                    this.filter = void 0, this.focusLocation = void 0, this.update(), this.props.onChange({
                        value: e.id,
                        fromKeyboard: t
                    })
                }, t.prototype.getFilteredOptions = function() {
                    var e = this.props.options(),
                        t = (this.filter || "").toLowerCase().trim();
                    return t && (e = e.filter(function(e) {
                        return -1 !== e.label.toLowerCase().indexOf(t)
                    })), e
                }, t.prototype.onUpdate = function() {
                    var e = this.getFilteredOptions().length;
                    if (this.focusLocation && "filter" === this.focusLocation.type && e !== this.lastResultCount) switch (e) {
                        case 0:
                            r.alert("No results");
                            break;
                        case 1:
                            r.alert("1 result");
                            break;
                        default:
                            r.alert(e + " results")
                    }
                    this.lastResultCount = e
                }, t
            }(o.Class);
        t.default = u
    }), define("spa/states", ["require", "exports", "tslib"], function(e, t, n) {
        "use strict";

        function o(e) {
            return e.replace(/ /g, "").toLowerCase()
        }

        function s(e) {
            for (var n = 0; n < t.states.length; n++)
                if (t.states[n].svgid === e) return t.states[n]
        }

        function r(e) {
            for (var n = 0; n < t.states.length; n++)
                if (t.states[n].code === e) return t.states[n]
        }

        function c(e) {
            for (var n = 0; n < t.states.length; n++)
                if (o(t.states[n].name) === e) return t.states[n]
        }

        function a(e) {
            for (var n = 0; n < t.states.length; n++)
                if (t.states[n].name === e) return t.states[n].svgid
        }

        function i() {
            return t.states.filter(function(e) {
                return e.usesDesmos && "IBMYP" !== e.code && "MAP" !== e.code
            }).map(function(e) {
                return e.name
            })
        }
        Object.defineProperty(t, "__esModule", {
            value: !0
        }), t.TRANSITIONAL_DEFAULT_GRAPHING_CONFIG = {
            images: !1,
            folders: !1,
            notes: !1,
            qwertyKeyboard: !1,
            restrictedFunctions: !0,
            degreeMode: !0,
            branding: !1,
            border: !1,
            plotSingleVariableImplicitEquations: !1,
            decimalToFraction: !1,
            links: !1,
            distributions: !1
        }, t.FUTURE_DEFAULT_GRAPHING_CONFIG = n.__assign(n.__assign({}, t.TRANSITIONAL_DEFAULT_GRAPHING_CONFIG), {
            decimalToFraction: !0,
            distributions: !0
        }), t.TRANSITIONAL_DEFAULT_SCIENTIFIC_CONFIG = {
            qwertyKeyboard: !1,
            functionDefinition: !1,
            degreeMode: !0,
            decimalToFraction: !1,
            links: !1,
            brailleExpressionDownload: !1
        }, t.FUTURE_DEFAULT_SCIENTIFIC_CONFIG = n.__assign(n.__assign({}, t.TRANSITIONAL_DEFAULT_SCIENTIFIC_CONFIG), {
            decimalToFraction: !0
        }), t.TRANSITIONAL_DEFAULT_FOURFUNCTION_CONFIG = {
            brailleExpressionDownload: !1,
            links: !1
        }, t.FUTURE_DEFAULT_FOURFUNCTION_CONFIG = n.__assign({}, t.TRANSITIONAL_DEFAULT_FOURFUNCTION_CONFIG), t.states = [{
            svgid: 1,
            name: "Alabama",
            code: "AL",
            usesDesmos: !0,
            stateTestName: "ACAP",
            stateTestWebsite: "https://www.alsde.edu/sec/sa/Pages/testing-all.aspx",
            scientific: "Grades 6-8",
            scientificConfig: n.__assign(n.__assign({}, t.FUTURE_DEFAULT_SCIENTIFIC_CONFIG), {
                qwertyKeyboard: !0,
                degreeMode: !1
            }),
            fourFunction: "Grades 6-8"
        }, {
            svgid: 2,
            name: "Alaska",
            code: "AK"
        }, {
            svgid: 4,
            name: "Arizona",
            code: "AZ",
            usesDesmos: !0,
            stateTestName: "AzMERIT",
            stateTestWebsite: "http://azmeritportal.org/",
            scientific: "Grades 7-8",
            graphing: "High School"
        }, {
            svgid: 5,
            name: "Arkansas",
            code: "AK"
        }, {
            svgid: 6,
            name: "California",
            code: "CA",
            usesDesmos: !0,
            stateTestName: "CAASPP",
            stateTestWebsite: "http://www.caaspp.org/",
            fourFunction: "Grade 6",
            scientific: "Grades 7-8",
            graphing: "High School"
        }, {
            svgid: 8,
            name: "Colorado",
            code: "CO"
        }, {
            svgid: 9,
            name: "Connecticut",
            code: "CT",
            usesDesmos: !0,
            stateTestName: "CSDE Comprehensive Assessment Program",
            stateTestWebsite: "https://ct.portal.airast.org/",
            fourFunction: "Grade 6",
            scientific: "Grades 7-8"
        }, {
            svgid: 10,
            name: "Delaware",
            code: "DE",
            usesDesmos: !0,
            stateTestName: "DeSSA",
            stateTestWebsite: "http://de.portal.airast.org/",
            fourFunction: "Grade 6",
            scientific: "Grades 7-8",
            graphing: "High School"
        }, {
            svgid: 12,
            name: "Florida",
            code: "FL",
            usesDesmos: !0,
            stateTestName: "FSA",
            stateTestWebsite: "https://fsassessments.org/",
            scientific: "Grades 7-8",
            scientificConfig: {
                links: !1,
                brailleExpressionDownload: !1,
                singleExpression: !0,
                restrictedEditing: !0,
                degreeMode: !0,
                decimalToFraction: !1
            }
        }, {
            svgid: 13,
            name: "Georgia",
            code: "GA",
            usesDesmos: !0,
            stateTestName: "Georgia Milestones Assessment System",
            stateTestWebsite: "https://www.gadoe.org/Curriculum-Instruction-and-Assessment/Assessment/Pages/Georgia-Milestones-Assessment-System.aspx",
            fourFunction: "Grade 6",
            scientific: "Grades 7-8 & High School",
            graphing: "High School"
        }, {
            svgid: 15,
            name: "Hawaii",
            code: "HI",
            usesDesmos: !0,
            stateTestName: "HSAP",
            stateTestWebsite: "http://alohahsap.org/SMARTERBALANCED/",
            fourFunction: "Grade 6",
            scientific: "Grades 7-8",
            graphing: "High School"
        }, {
            svgid: 16,
            name: "Idaho",
            code: "ID",
            usesDesmos: !0,
            stateTestName: "ISAT",
            stateTestWebsite: "http://idaho.portal.airast.org/",
            fourFunction: "Grade 6",
            scientific: "Grades 7-8",
            graphing: "High School"
        }, {
            svgid: 17,
            name: "Illinois",
            code: "IL"
        }, {
            svgid: 18,
            name: "Indiana",
            code: "IN",
            usesDesmos: !0,
            stateTestName: "ILEARN Assessments",
            stateTestWebsite: "https://www.doe.in.gov/assessment/ilearn-policy-and-guidance",
            fourFunction: "Grade 6",
            scientific: "Grades 7-8"
        }, {
            name: "International Baccalaureate",
            code: "IBMYP",
            stateTestName: "MYP",
            usesDesmos: !0,
            scientificConfig: {
                functionDefinition: !1,
                qwertyKeyboard: !1,
                decimalToFraction: !1,
                brailleExpressionDownload: !1,
                typingAsteriskWritesTimesSymbol: !0,
                replaceCommaWith10Exp: !0,
                replaceRoundWithReciprocal: !0
            }
        }, {
            svgid: 19,
            name: "Iowa",
            code: "IA",
            usesDesmos: !0,
            stateTestName: "ISASP",
            stateTestWebsite: "http://iowa.pearsonaccessnext.com/test-prep/",
            fourFunction: "Grade 5 (Science), Grades 3-6 (Math)",
            scientific: "Grades 8 & 10 (Science), Grades 7-11 (Math)",
            scientificConfig: {
                links: !1,
                brailleExpressionDownload: !1,
                qwertyKeyboard: !0,
                functionDefinition: !1,
                degreeMode: !0,
                decimalToFraction: !1
            }
        }, {
            svgid: 20,
            name: "Kansas",
            code: "KA"
        }, {
            svgid: 21,
            name: "Kentucky",
            code: "KY",
            usesDesmos: !0,
            stateTestName: "K-PREP",
            stateTestWebsite: "https://education.ky.gov/AA/Assessments/Pages/K-PREP.aspx",
            fourFunction: "High School (Mathematics)",
            scientific: "High School (Mathematics)",
            graphing: "High School (Mathematics and Science)",
            graphingConfig: {
                images: !1,
                folders: !1,
                notes: !1,
                qwertyKeyboard: !1,
                restrictedFunctions: !0,
                degreeMode: !0,
                branding: !1,
                border: !1,
                plotSingleVariableImplicitEquations: !1,
                distributions: !0,
                decimalToFraction: !0
            }
        }, {
            svgid: 22,
            name: "Louisiana",
            code: "LA",
            usesDesmos: !0,
            stateTestName: "LEAP 2025",
            stateTestWebsite: "https://www.louisianabelieves.com/measuringresults/assessments-for-high-schools",
            graphing: "High School",
            graphingConfig: n.__assign(n.__assign({}, t.TRANSITIONAL_DEFAULT_GRAPHING_CONFIG), {
                decimalToFraction: !0
            })
        }, {
            svgid: 23,
            name: "Maine",
            code: "ME"
        }, {
            svgid: 24,
            name: "Maryland",
            code: "MD",
            usesDesmos: !0,
            stateTestName: "MCAP and MISA",
            stateTestWebsite: "http://marylandpublicschools.org/about/Pages/DAAIT/Assessment/index.aspx",
            fourFunction: "Grades 5&8 (Science), Grades 6-7 (Math)",
            scientific: "Grade 8",
            scientificConfig: n.__assign(n.__assign({}, t.TRANSITIONAL_DEFAULT_SCIENTIFIC_CONFIG), {
                qwertyKeyboard: !0,
                degreeMode: !1
            }),
            graphing: "High School",
            graphingConfig: n.__assign(n.__assign({}, t.FUTURE_DEFAULT_GRAPHING_CONFIG), {
                qwertyKeyboard: !0
            })
        }, {
            svgid: 25,
            name: "Massachusetts",
            code: "MA"
        }, {
            svgid: 26,
            name: "Michigan",
            code: "MI",
            usesDesmos: !0,
            stateTestName: "M-STEP",
            stateTestWebsite: "https://www.michigan.gov/mde/0,4615,7-140-22709_70117---,00.html",
            fourFunction: "Grade 6",
            scientific: "Grade 7",
            scientificConfig: n.__assign(n.__assign({}, t.FUTURE_DEFAULT_SCIENTIFIC_CONFIG), {
                qwertyKeyboard: !0,
                degreeMode: !1
            })
        }, {
            svgid: 27,
            name: "Minnesotta",
            code: "MN"
        }, {
            svgid: 28,
            name: "Mississippi",
            code: "MS",
            usesDesmos: !0,
            stateTestName: "MAAP",
            stateTestWebsite: "https://www.mdek12.org/OSA/MAAP",
            graphing: "Algebra 1"
        }, {
            svgid: 29,
            name: "Misssouri",
            code: "MO"
        }, {
            svgid: 30,
            name: "Montana",
            code: "MT",
            usesDesmos: !0,
            stateTestName: "MontCAS",
            stateTestWebsite: "http://mt.portal.airast.org/",
            fourFunction: "Grade 6",
            scientific: "Grades 7-8",
            graphing: "High School"
        }, {
            svgid: 31,
            name: "Nebraska",
            code: "NE",
            usesDesmos: !0,
            stateTestName: "NSCAS",
            stateTestWebsite: "https://community.nwea.org/community/nebraska",
            fourFunction: "Grade 6",
            scientific: "Grades 7-8"
        }, {
            svgid: 32,
            name: "Nevada",
            code: "NV"
        }, {
            svgid: 33,
            name: "New Hampshire",
            code: "NH",
            usesDesmos: !0,
            stateTestName: "New Hampshire Statewide Assessment System",
            stateTestWebsite: "http://nh.portal.airast.org/",
            fourFunction: "Grade 6",
            scientific: "Grades 7-8",
            graphing: "High School"
        }, {
            svgid: 34,
            name: "New Jersey",
            code: "NJ"
        }, {
            svgid: 35,
            name: "New Mexico",
            code: "NM"
        }, {
            svgid: 36,
            name: "New York",
            code: "NY"
        }, {
            svgid: 37,
            name: "North Carolina",
            code: "NC",
            usesDesmos: !0,
            stateTestName: "NCTest",
            stateTestWebsite: "http://www.ncpublicschools.org/accountability/testing/generalinfo",
            fourFunction: "Grades 3-5",
            scientific: "Grades 6-8",
            graphing: "Math 1 and above",
            graphingConfig: t.FUTURE_DEFAULT_GRAPHING_CONFIG,
            fourFunctionConfig: n.__assign(n.__assign({}, t.TRANSITIONAL_DEFAULT_FOURFUNCTION_CONFIG), {
                decimalToFraction: !0
            })
        }, {
            svgid: 38,
            name: "North Dakota",
            code: "ND",
            usesDesmos: !0,
            stateTestName: "NDSA",
            stateTestWebsite: "http://ndsa.portal.airast.org/",
            fourFunction: "Grade 6",
            scientific: "Grades 7-8",
            graphing: "High School-Grade 11"
        }, {
            name: "NWEA",
            code: "MAP",
            stateTestName: "MAP Growth",
            usesDesmos: !0,
            scientificConfig: t.TRANSITIONAL_DEFAULT_SCIENTIFIC_CONFIG,
            fourFunctionConfig: t.TRANSITIONAL_DEFAULT_FOURFUNCTION_CONFIG
        }, {
            svgid: 39,
            name: "Ohio",
            code: "OH",
            usesDesmos: !0,
            stateTestName: "OST",
            stateTestWebsite: "http://oh.portal.airast.org/ocba/",
            scientific: "Grades 3-8",
            graphing: "High School"
        }, {
            svgid: 40,
            name: "Oklahoma",
            code: "OK"
        }, {
            svgid: 41,
            name: "Oregon",
            code: "OR",
            usesDesmos: !0,
            stateTestName: "OSAS",
            stateTestWebsite: "https://osasportal.org",
            fourFunction: "Grade 6",
            scientific: "Grades 7-8",
            graphing: "High School"
        }, {
            svgid: 42,
            name: "Pennsylvania",
            code: "PA"
        }, {
            svgid: 44,
            name: "Rhode Island",
            code: "RI",
            usesDesmos: !0,
            stateTestName: "NGSA",
            stateTestWebsite: "https://ri.portal.airast.org/",
            fourFunction: "Grade 5",
            scientific: "Grade 8",
            graphing: "Grade 11"
        }, {
            svgid: 45,
            name: "South Carolina",
            code: "SC",
            usesDesmos: !0,
            stateTestName: "South Carolina Alternate Assessments",
            stateTestWebsite: "https://sc-alt.portal.airast.org/",
            fourFunction: "Grade 6",
            scientific: "Grades 7, 8, 11"
        }, {
            svgid: 46,
            name: "South Dakota",
            code: "SD",
            usesDesmos: !0,
            stateTestName: "South Dakota Smarter Balanced Assessment",
            stateTestWebsite: "http://sd.portal.airast.org/",
            fourFunction: "Grade 6",
            scientific: "Grades 7-8",
            graphing: "High School"
        }, {
            svgid: 47,
            name: "Tennessee",
            code: "TN"
        }, {
            svgid: 48,
            name: "Texas",
            code: "TX",
            usesDesmos: !1,
            stateTestName: "STAAR",
            fourFunction: "Grade 8 Science, Biology",
            scientific: "Grade 8 Science, Biology",
            graphing: "Grade 8 Science, Biology, Grade 8 Math, Algebra 1, Algebra 2",
            graphingConfig: n.__assign(n.__assign({}, t.FUTURE_DEFAULT_GRAPHING_CONFIG), {
                plotImplicits: !1,
                plotInequalities: !1,
                sliders: !1,
                qwertyKeyboard: !0
            }),
            scientificConfig: n.__assign(n.__assign({}, t.FUTURE_DEFAULT_SCIENTIFIC_CONFIG), {
                qwertyKeyboard: !0
            }),
            fourFunctionConfig: t.FUTURE_DEFAULT_FOURFUNCTION_CONFIG
        }, {
            svgid: 49,
            name: "Utah",
            code: "UT",
            usesDesmos: !0,
            stateTestName: "Utah Aspire Plus Assessments",
            stateTestWebsite: "http://utah.pearsonaccessnext.com/",
            graphing: "Grades 9-10 (Mathematics)",
            graphingConfig: {
                images: !1,
                folders: !1,
                notes: !1,
                qwertyKeyboard: !0,
                restrictedFunctions: !0,
                degreeMode: !0,
                branding: !1,
                links: !1,
                border: !1,
                decimalToFraction: !0,
                distributions: !0
            },
            scientific: "Grades 9-10 (Science)",
            scientificConfig: {
                links: !1,
                brailleExpressionDownload: !1,
                qwertyKeyboard: !0,
                functionDefinition: !1,
                degreeMode: !0,
                decimalToFraction: !1
            }
        }, {
            svgid: 50,
            name: "Vermont",
            code: "VT",
            usesDesmos: !0,
            stateTestName: "CAS",
            stateTestWebsite: "http://vt.portal.airast.org/",
            fourFunction: "Grade 6",
            scientific: "Grades 7-8",
            graphing: "High School"
        }, {
            svgid: 51,
            name: "Virginia",
            code: "VA",
            usesDesmos: !0,
            stateTestName: "Standards of Learning",
            stateTestWebsite: "http://www.doe.virginia.gov/testing/index.shtml",
            fourFunction: "Grades 4-5",
            scientific: "Grades 6-8",
            graphing: "High School",
            graphingConfig: {
                images: !1,
                folders: !1,
                links: !1,
                notes: !1,
                restrictedFunctions: !0,
                degreeMode: !0,
                clearIntoDegreeMode: !0,
                branding: !1,
                border: !1,
                decimalToFraction: !0,
                distributions: !0
            },
            scientificConfig: {
                functionDefinition: !1,
                decimalToFraction: !1,
                links: !1,
                brailleExpressionDownload: !1
            }
        }, {
            svgid: 53,
            name: "Washington",
            code: "WA",
            usesDesmos: !0,
            stateTestName: "WCAP",
            stateTestWebsite: "http://wa.portal.airast.org/",
            fourFunction: "Grade 5 (Science), Grade 6 (Math)",
            scientific: "Grades 7-8 (Math), Grade 8 & High School (Science)",
            graphing: "High School (Math)"
        }, {
            svgid: 54,
            name: "West Virginia",
            code: "WV",
            usesDesmos: !0,
            stateTestName: "West Virginia General Summative Assessments",
            stateTestWebsite: "http://wv.portal.airast.org/",
            fourFunction: "Grade 6",
            scientific: "Grades 7-8",
            graphing: "High School"
        }, {
            svgid: 55,
            name: "Wisconsin",
            code: "WI"
        }, {
            svgid: 56,
            name: "Wyoming",
            code: "WY",
            usesDesmos: !0,
            stateTestName: "WY-TOPP",
            stateTestWebsite: "http://wyoassessment.org/",
            fourFunction: "Grade 6",
            scientific: "Grades 7-8",
            graphing: "High School"
        }];
        for (var l = 0, u = t.states; l < u.length; l++) {
            var d = u[l];
            d.graphing && !d.graphingConfig && (d.graphingConfig = t.TRANSITIONAL_DEFAULT_GRAPHING_CONFIG), d.scientific && !d.scientificConfig && (d.scientificConfig = t.TRANSITIONAL_DEFAULT_SCIENTIFIC_CONFIG), d.fourFunction && !d.fourFunctionConfig && (d.fourFunctionConfig = t.TRANSITIONAL_DEFAULT_FOURFUNCTION_CONFIG)
        }
        t.normalizeStateName = o, t.getStateFromId = s, t.getStateFromCode = r, t.getStateFromNormalizedName = c, t.getStateIdFromName = a, t.getDesmosStateNames = i
    }), define("practice/test-configs", ["require", "exports", "spa/states"], function(e, t, n) {
        "use strict";

        function o() {
            return c
        }

        function s(e) {
            return a[e]
        }

        function r(e, t) {
            var o = "",
                s = "",
                r = n.getStateFromCode(e);
            switch (r && (o = r[t] || ""), t) {
                case "graphing":
                    s = "Graphing Calculator";
                    break;
                case "scientific":
                    s = "Scientific Calculator";
                    break;
                case "fourFunction":
                    s = "Four Function Calculator";
                    break;
                default:
                    return t
            }
            return o ? o + ": " + s : s
        }
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var c = [],
            a = {};
        c.push("default"), a.default = {
            id: "default",
            name: "Desmos Default Calculator",
            options: {
                graphing: n.FUTURE_DEFAULT_GRAPHING_CONFIG,
                scientific: n.FUTURE_DEFAULT_SCIENTIFIC_CONFIG,
                fourFunction: n.FUTURE_DEFAULT_FOURFUNCTION_CONFIG
            }
        };
        for (var i = 0, l = n.states; i < l.length; i++) {
            var u = l[i];
            (u.usesDesmos || "TX" === u.code) && "IBMYP" !== u.code && (c.push(u.code), a[u.code] = {
                id: u.code,
                name: u.name + " (" + u.stateTestName + ")",
                options: {
                    graphing: u.graphingConfig,
                    fourFunction: u.fourFunctionConfig,
                    scientific: u.scientificConfig
                }
            })
        }
        t.getTestIds = o, t.getTestDetails = s, t.getCalculatorName = r
    }), define("loadcss!practice/start-practice", function() {}), define("practice/start-practice-modal", ["require", "exports", "lib/app-bridge", "tslib", "keys", "dcgview", "./dcgview-practice", "dcgview-helpers/searchable-dropdown", "./test-configs", "jquery", "loadcss!./start-practice"], function(e, t, n, o, s, r, c, a, i, l) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var u = r.Components,
            d = u.If,
            p = u.Switch,
            m = function(e) {
                function t() {
                    return null !== e && e.apply(this, arguments) || this
                }
                return o.__extends(t, e), t.prototype.template = function() {
                    var e = this;
                    return r.createElement("div", {
                        class: r.const("dcg-singleappmode-screen"),
                        didMount: function(t) {
                            return e.rootElt = t
                        }
                    }, r.createElement("div", {
                        class: r.const("dcg-centered-margined-content")
                    }, r.createElement("div", {
                        class: r.const("dcg-screen-title"),
                        role: r.const("heading"),
                        "aria-level": r.const("1"),
                        "aria-label": r.const("Desmos Logo")
                    }, r.createElement("i", {
                        class: r.const("dcg-icon-desmos")
                    })), r.createElement(p, {
                        key: this.bindFn(this.getHeaderState)
                    }, function(t) {
                        switch (t) {
                            case "mdm-config":
                                return;
                            case "no-config":
                                return r.createElement("div", {
                                    role: r.const("link"),
                                    tabindex: r.const("0"),
                                    class: r.const("dcg-centered-top-link dcg-custom-config-link dcg-gray-link"),
                                    onTap: e.bindFn(e.switchToCustomConfiguration)
                                }, r.const("Choose Assessment"));
                            case "picking-config":
                                return r.createElement("div", {
                                    role: r.const("link"),
                                    tabindex: r.const("0"),
                                    class: r.const("dcg-back-link dcg-centered-top-link dcg-gray-link"),
                                    onTap: e.bindFn(e.clearCustomConfiguration)
                                }, r.const("Cancel"));
                            case "has-config":
                                return r.createElement("div", {
                                    class: r.const("dcg-config-container")
                                }, r.createElement("div", {
                                    class: r.const("dcg-config-header")
                                }, r.createElement("span", {
                                    class: r.const("dcg-section-title dcg-choose-test"),
                                    role: r.const("heading"),
                                    "aria-level": r.const("2")
                                }, r.const("Assessment")), r.createElement("span", {
                                    role: r.const("link"),
                                    tabindex: r.const("0"),
                                    class: r.const("dcg-blue-link dcg-clear-config"),
                                    onTap: function() {
                                        return e.clearCustomConfiguration()
                                    }
                                }, r.const("Clear"))), r.createElement("div", {
                                    class: r.const("dcg-config-name")
                                }, function() {
                                    return e.getSelectedTestName()
                                }))
                        }
                    }), r.createElement(d, {
                        predicate: this.bindFn(this.showPickerUI)
                    }, function() {
                        return r.createElement("div", {
                            class: r.const("dcg-dropdown-container dcg-testid-dropdown")
                        }, r.createElement(a.default, {
                            renderWithInput: e.bindFn(e.renderPickerWithInput),
                            onCancel: e.bindFn(e.clearCustomConfiguration),
                            onChange: e.bindFn(e.onTestChosen),
                            options: function() {
                                return e.getTestIdOptions()
                            }
                        }))
                    }), r.createElement(d, {
                        predicate: function() {
                            return !e.showPickerUI()
                        }
                    }, function() {
                        return r.createElement("div", {
                            class: r.const("dcg-pick-calculator-container")
                        }, r.createElement("div", {
                            class: r.const("dcg-section-title dcg-choose-calc"),
                            role: r.const("heading"),
                            "aria-level": r.const("3")
                        }, r.const("Testing Calculator")), r.createElement("div", {
                            class: r.const("dcg-segmented-container"),
                            role: r.const("radiogroup"),
                            "aria-label": r.const("Calculator"),
                            onKeydown: e.bindFn(e.handleRadioKeydown)
                        }, r.createElement(d, {
                            predicate: function() {
                                return e.isCalculatorAllowed("fourFunction")
                            }
                        }, function() {
                            return r.createElement("div", {
                                class: function() {
                                    return {
                                        "dcg-segmented-option": !0,
                                        "dcg-calc-option-fourfunction": !0,
                                        "dcg-is-selected": e.isCalculatorSelected("fourFunction")
                                    }
                                },
                                role: r.const("radio"),
                                tabindex: function() {
                                    return e.isCalculatorSelected("fourFunction") ? 0 : -1
                                },
                                "aria-checked": function() {
                                    return e.isCalculatorSelected("fourFunction")
                                },
                                onFocus: e.bindFn(e.onSelectFourFunction),
                                onTap: e.bindFn(e.onSelectFourFunction)
                            }, r.createElement("i", {
                                class: r.const("dcg-practice-icon-app-four-function")
                            }), r.createElement("span", {
                                class: r.const("dcg-calculator-name")
                            }, function() {
                                return e.getNameForCalculatorType("fourFunction")
                            }))
                        }), r.createElement(d, {
                            predicate: function() {
                                return e.isCalculatorAllowed("scientific")
                            }
                        }, function() {
                            return r.createElement("div", {
                                class: function() {
                                    return {
                                        "dcg-segmented-option": !0,
                                        "dcg-calc-option-scientific": !0,
                                        "dcg-is-selected": e.isCalculatorSelected("scientific")
                                    }
                                },
                                role: r.const("radio"),
                                tabindex: function() {
                                    return e.isCalculatorSelected("scientific") ? 0 : -1
                                },
                                "aria-checked": function() {
                                    return e.isCalculatorSelected("scientific")
                                },
                                onFocus: e.bindFn(e.onSelectScientific),
                                onTap: e.bindFn(e.onSelectScientific)
                            }, r.createElement("i", {
                                class: r.const("dcg-practice-icon-app-scientific")
                            }), r.createElement("span", {
                                class: r.const("dcg-calculator-name")
                            }, function() {
                                return e.getNameForCalculatorType("scientific")
                            }))
                        }), r.createElement(d, {
                            predicate: function() {
                                return e.isCalculatorAllowed("graphing")
                            }
                        }, function() {
                            return r.createElement("div", {
                                class: function() {
                                    return {
                                        "dcg-segmented-option": !0,
                                        "dcg-calc-option-graphing": !0,
                                        "dcg-is-selected": e.isCalculatorSelected("graphing")
                                    }
                                },
                                role: r.const("radio"),
                                tabindex: function() {
                                    return e.isCalculatorSelected("graphing") ? 0 : -1
                                },
                                "aria-checked": function() {
                                    return e.isCalculatorSelected("graphing")
                                },
                                onFocus: e.bindFn(e.onSelectGraphing),
                                onTap: e.bindFn(e.onSelectGraphing)
                            }, r.createElement("i", {
                                class: r.const("dcg-practice-icon-app-graphing")
                            }), r.createElement("span", {
                                class: r.const("dcg-calculator-name")
                            }, function() {
                                return e.getNameForCalculatorType("graphing")
                            }))
                        })))
                    }), r.createElement(d, {
                        predicate: function() {
                            return !!e.controller.getCustomBranding()
                        }
                    }, function() {
                        return r.createElement("div", {
                            class: r.const("dcg-custom-branding")
                        }, function() {
                            return e.controller.getCustomBranding()
                        })
                    }), r.createElement(d, {
                        predicate: function() {
                            return !e.showPickerUI()
                        }
                    }, function() {
                        return r.createElement("div", {
                            class: r.const("dcg-continue-container")
                        }, r.createElement(d, {
                            predicate: function() {
                                return !!e.controller.getSecuredByMessage()
                            }
                        }, function() {
                            return r.createElement("span", {
                                class: r.const("dcg-secure-message")
                            }, r.createElement("i", {
                                class: r.const("dcg-icon-desmos-badge")
                            }), function() {
                                return e.controller.getSecuredByMessage()
                            })
                        }), r.createElement(d, {
                            predicate: function() {
                                return e.controller.shouldShowInternetWarning()
                            }
                        }, function() {
                            return r.createElement("span", null, r.const("You must disable internet to start the test"))
                        }), r.createElement(d, {
                            predicate: function() {
                                return !e.controller.shouldShowStartTestButton()
                            }
                        }, function() {
                            return r.createElement("a", {
                                href: r.const("https://www.desmos.com/test-mode"),
                                target: r.const("_blank"),
                                class: r.const("dcg-gray-link dcg-security-link")
                            }, r.const("Learn how to use securely."))
                        }), r.createElement("div", {
                            class: r.const("dcg-button-container")
                        }, r.createElement(d, {
                            predicate: function() {
                                return e.controller.shouldShowStartPracticeButton()
                            }
                        }, function() {
                            return r.createElement("div", {
                                class: function() {
                                    return {
                                        "dcg-btn-blue-outline": e.controller.shouldShowStartTestButton(),
                                        "dcg-btn-blue": !e.controller.shouldShowStartTestButton()
                                    }
                                },
                                role: r.const("button"),
                                tabindex: r.const("0"),
                                onTap: function() {
                                    return e.dispatchStartPractice()
                                }
                            }, r.const("Start Practice"))
                        }), r.createElement(d, {
                            predicate: function() {
                                return e.controller.shouldShowStartTestButton()
                            }
                        }, function() {
                            return r.createElement("div", {
                                class: r.const("dcg-btn-blue"),
                                role: r.const("button"),
                                tabindex: r.const("0"),
                                onTap: function() {
                                    return e.dispatchStartTest()
                                }
                            }, r.const("Start Test"))
                        })))
                    }), r.createElement(d, {
                        predicate: function() {
                            return !e.showPickerUI()
                        }
                    }, function() {
                        return r.createElement("div", {
                            class: r.const("dcg-flex-spacer")
                        })
                    }), r.createElement("div", {
                        class: r.const("dcg-footer-links"),
                        role: r.const("footer")
                    }, r.createElement(d, {
                        predicate: this.bindFn(this.showFooterLinks)
                    }, function() {
                        return r.createElement("a", {
                            href: r.const("https://www.desmos.com/terms"),
                            target: r.const("_blank"),
                            class: r.const("dcg-gray-link")
                        }, r.const("Terms of Service"))
                    }), r.createElement(d, {
                        predicate: this.bindFn(this.showFooterLinks)
                    }, function() {
                        return r.createElement("a", {
                            href: r.const("https://www.desmos.com/privacy"),
                            target: r.const("_blank"),
                            class: r.const("dcg-gray-link")
                        }, r.const("Privacy Policy"))
                    }), r.createElement(d, {
                        predicate: this.bindFn(this.showVersionNumber)
                    }, function() {
                        return r.createElement("span", {
                            class: function() {
                                return {
                                    "dcg-version-number": !0,
                                    "dcg-show-left-divider": e.showFooterLinks()
                                }
                            }
                        }, function() {
                            return e.showFooterLinks() ? "" : "version "
                        }, function() {
                            return n.versionNumber
                        })
                    }))))
                }, t.prototype.showFooterLinks = function() {
                    return !this.showPickerUI() && (!this.controller.isConfiguredByAppConfig() && ("guided-access" !== this.controller.getSingleAppMode() && "chrome-kiosk-mode" !== this.controller.getSingleAppMode()))
                }, t.prototype.showVersionNumber = function() {
                    return !this.showPickerUI() && !!n.versionNumber
                }, t.prototype.renderPickerWithInput = function() {
                    return !this.controller.isMobileApp()
                }, t.prototype.showPickerUI = function() {
                    return this.isInCustomConfiguration() && !this.getSelectedTestId()
                }, t.prototype.getHeaderState = function() {
                    return this.controller.isConfiguredByAppConfig() ? "mdm-config" : this.showPickerUI() ? "picking-config" : this.isInCustomConfiguration() ? "has-config" : "no-config"
                }, t.prototype.getSelectedTestId = function() {
                    return this.controller.getTentativeConfigTestId()
                }, t.prototype.getSelectedCalculator = function() {
                    return this.controller.getTentativeConfigCalculator()
                }, t.prototype.getSelectedTestName = function() {
                    var e = this.getSelectedTestId();
                    if (!e) return "";
                    var t = i.getTestDetails(e);
                    return t ? t.name : ""
                }, t.prototype.isInCustomConfiguration = function() {
                    return "default" !== this.getSelectedTestId()
                }, t.prototype.switchToCustomConfiguration = function(e) {
                    this.controller.dispatch({
                        type: "set-tentative-config",
                        testId: void 0,
                        calculator: void 0
                    }), this.renderPickerWithInput() || "keyboard" !== e.device || l(this.rootElt).find(".dcg-searchable-dropdown-option:eq(0)").focus()
                }, t.prototype.clearCustomConfiguration = function() {
                    this.controller.dispatch({
                        type: "set-tentative-config",
                        testId: "default",
                        calculator: "graphing"
                    })
                }, t.prototype.dispatchStartPractice = function() {
                    this.controller.dispatch({
                        type: "start-practice",
                        testId: this.getSelectedTestId(),
                        calculator: this.getSelectedCalculator()
                    })
                }, t.prototype.dispatchStartTest = function() {
                    this.controller.dispatch({
                        type: "start-test",
                        testId: this.getSelectedTestId(),
                        calculator: this.getSelectedCalculator()
                    })
                }, t.prototype.isCalculatorSelected = function(e) {
                    return this.getSelectedCalculator() === e
                }, t.prototype.getNameForCalculatorType = function(e) {
                    var t = this.getSelectedTestId();
                    if (this.controller.isConfiguredByAppConfig()) {
                        var n = this.controller.getNameForMDMCalculator(e);
                        if (n) return n;
                        t = "default"
                    }
                    return t ? i.getCalculatorName(t, e) : ""
                }, t.prototype.handleRadioKeydown = function(e) {
                    var t = s.lookup(e);
                    if (t === s.ENTER) {
                        if (this.controller.shouldShowStartTestButton()) return void this.dispatchStartTest();
                        if (this.controller.shouldShowStartPracticeButton()) return void this.dispatchStartPractice()
                    }
                    var n = 0;
                    if (t === s.UP ? n = -1 : t === s.DOWN && (n = 1), 0 !== n) {
                        e.preventDefault(), e.stopPropagation();
                        var o = ".dcg-segmented-option:not(.dcg-is-disabled)",
                            r = 1 === n ? l(":focus").closest(o).next() : l(":focus").closest(o).prev();
                        r && r.focus()
                    }
                }, t.prototype.onSelectFourFunction = function(e) {
                    this.onCalculatorChosen({
                        value: "fourFunction",
                        fromKeyboard: "keyboard" === e.device
                    })
                }, t.prototype.onSelectScientific = function(e) {
                    this.onCalculatorChosen({
                        value: "scientific",
                        fromKeyboard: "keyboard" === e.device
                    })
                }, t.prototype.onSelectGraphing = function(e) {
                    this.onCalculatorChosen({
                        value: "graphing",
                        fromKeyboard: "keyboard" === e.device
                    })
                }, t.prototype.onCalculatorChosen = function(e) {
                    var t = e.value;
                    this.controller.dispatch({
                        type: "set-tentative-config",
                        testId: this.getSelectedTestId(),
                        calculator: t
                    }), e.fromKeyboard && l(this.rootElt).find(".dcg-submit-btn .dcg-btn-blue").focus()
                }, t.prototype.getTestIdOptions = function() {
                    return i.getTestIds().filter(function(e) {
                        return "default" !== e
                    }).map(function(e) {
                        return {
                            id: e,
                            label: i.getTestDetails(e).name
                        }
                    })
                }, t.prototype.getAllowedCalculatorOptions = function() {
                    var e = this;
                    return this.getAllowedCalculatorTypes(this.getSelectedTestId()).map(function(t) {
                        return {
                            id: t,
                            label: e.getNameForCalculatorType(t)
                        }
                    })
                }, t.prototype.getAllowedCalculatorTypes = function(e) {
                    if (!e) return [];
                    var t = i.getTestDetails(e);
                    if (!t) return [];
                    var n = [];
                    return t.options.fourFunction && n.push("fourFunction"), t.options.scientific && n.push("scientific"), t.options.graphing && n.push("graphing"), n
                }, t.prototype.isCalculatorAllowed = function(e) {
                    return this.controller.isConfiguredByAppConfig() ? this.controller.isAllowedMDMCalculator(e) : -1 !== this.getAllowedCalculatorTypes(this.getSelectedTestId()).indexOf(e)
                }, t.prototype.onTestChosen = function(e) {
                    var t = e.value,
                        n = this.getAllowedCalculatorTypes(t),
                        o = n[n.length - 1];
                    this.controller.dispatch({
                        type: "set-tentative-config",
                        testId: t,
                        calculator: o
                    }), e.fromKeyboard && l(this.rootElt).find(".dcg-segmented-option.dcg-is-selected").focus()
                }, t
            }(c.default);
        t.default = m
    }), define("loadcss!practice/modals", function() {}), define("practice/end-practice-modal", ["require", "exports", "tslib", "dcgview", "./dcgview-practice", "loadcss!./modals"], function(e, t, n, o, s) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var r = o.Components.If,
            c = function(e) {
                function t() {
                    return null !== e && e.apply(this, arguments) || this
                }
                return n.__extends(t, e), t.prototype.template = function() {
                    var e = this;
                    return o.createElement("div", {
                        class: o.const("dcg-singleappmode-modal-container")
                    }, o.createElement("div", {
                        class: o.const("dcg-singleappmode-modal-background"),
                        onTap: function() {
                            return e.controller.dispatch({
                                type: "close-modal"
                            })
                        }
                    }), o.createElement("div", {
                        class: o.const("dcg-singleappmode-modal dcg-end-test-modal")
                    }, o.createElement("div", {
                        class: o.const("dcg-test-time-container")
                    }, o.createElement("div", {
                        class: o.const("dcg-modal-title"),
                        role: o.const("heading"),
                        "aria-level": o.const("2")
                    }, o.createElement("span", null, o.const("You've been using the calculator for")), o.createElement("div", {
                        class: o.const("dcg-test-time")
                    }, function() {
                        return e.controller.getPracticeElapsedTime()
                    })), o.createElement("div", {
                        class: o.const("dcg-test-clock")
                    }, o.const("Start time: "), function() {
                        return e.controller.getPracticeStartTime()
                    }), o.createElement(r, {
                        predicate: function() {
                            return !!e.controller.getSecuredByMessage()
                        }
                    }, function() {
                        return o.createElement("div", {
                            class: o.const("dcg-secure-badge-container")
                        }, o.createElement("span", {
                            class: o.const("dcg-secure-badge")
                        }, o.createElement("i", {
                            class: o.const("dcg-icon-desmos-badge")
                        }), function() {
                            return e.controller.getSecuredByMessage()
                        }))
                    })), o.createElement("div", {
                        class: o.const("dcg-exit-instructions")
                    }, function() {
                        return e.controller.getExitInstructions()
                    }), o.createElement("div", {
                        class: o.const("dcg-session-summary")
                    }, o.createElement("div", {
                        class: o.const("dcg-button-container")
                    }, o.createElement("div", {
                        class: o.const("dcg-submit-btn")
                    }, o.createElement(r, {
                        predicate: function() {
                            return e.controller.shouldShowImDoneButton()
                        }
                    }, function() {
                        return o.createElement("div", {
                            onTap: function() {
                                return e.controller.dispatch({
                                    type: "end-practice"
                                })
                            },
                            class: o.const("dcg-btn-blue-outline"),
                            role: o.const("button"),
                            tabindex: o.const("0")
                        }, o.const("I'm Done"))
                    }), o.createElement("div", {
                        class: o.const("dcg-btn-blue"),
                        role: o.const("button"),
                        tabindex: o.const("0"),
                        onTap: function() {
                            return e.controller.dispatch({
                                type: "close-modal"
                            })
                        }
                    }, o.const("Continue Session")))))))
                }, t
            }(s.default);
        t.default = c
    }), define("loadcss!practice/help-menu", function() {}), define("practice/help-menu", ["require", "exports", "lib/app-bridge", "tslib", "dcgview", "./dcgview-practice", "jquery", "loadcss!./help-menu"], function(e, t, n, o, s, r, c) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var a = s.Components.If,
            i = function(e) {
                function t() {
                    return null !== e && e.apply(this, arguments) || this
                }
                return o.__extends(t, e), t.prototype.template = function() {
                    var e = this;
                    return s.createElement("div", {
                        class: s.const("dcg-singleappmode-help-container dcg-popover dcg-bottom"),
                        didMount: this.bindFn(this.didMountRoot),
                        didUnmount: this.bindFn(this.didUnmountRoot)
                    }, s.createElement("div", {
                        class: s.const("dcg-help-links dcg-popover-interior")
                    }, s.createElement("div", {
                        class: s.const("dcg-mobile-app-container")
                    }, s.createElement(a, {
                        predicate: function() {
                            return e.shouldShowTimeElapsed()
                        }
                    }, function() {
                        return s.createElement("div", {
                            class: s.const("dcg-secure-app-container")
                        }, s.createElement("div", {
                            class: s.const("dcg-test-time-container")
                        }, s.createElement("div", {
                            class: s.const("dcg-modal-title"),
                            role: s.const("heading"),
                            "aria-level": s.const("2")
                        }, s.const("You've been using the calculator for"), s.const(" "), s.createElement("div", {
                            class: s.const("dcg-test-time")
                        }, function() {
                            return e.controller.getPracticeElapsedTime()
                        })), s.createElement("div", {
                            class: s.const("dcg-test-clock")
                        }, s.const("Start time: "), function() {
                            return e.controller.getPracticeStartTime()
                        })), s.createElement(a, {
                            predicate: function() {
                                return !!e.controller.getSecuredByMessage()
                            }
                        }, function() {
                            return s.createElement("div", {
                                class: s.const("dcg-secure-badge")
                            }, s.createElement("i", {
                                class: s.const("dcg-icon-desmos-badge")
                            }), function() {
                                return e.controller.getSecuredByMessage()
                            })
                        }))
                    }), s.createElement(a, {
                        predicate: function() {
                            return e.shouldShowPracticeMessage()
                        }
                    }, function() {
                        return s.createElement("div", {
                            class: s.const("dcg-not-secure-message")
                        }, s.const("You’re using Desmos in Practice Mode. For tests, we recommend using it securely."), s.const(" "), s.createElement("a", {
                            href: s.const("https://www.desmos.com/test-mode"),
                            target: s.const("_blank"),
                            class: s.const("dcg-blue-link")
                        }, s.const("Learn more.")))
                    }), s.createElement(a, {
                        predicate: function() {
                            return e.shouldShowNonChromeOSMessage()
                        }
                    }, function() {
                        return s.createElement("div", {
                            class: s.const("dcg-non-chromeos-message")
                        }, s.const("You are running this Chrome app on a non-ChromeOS device. As a result, some features may be missing. To learn more, visit www.desmos.com/test-mode."))
                    }), s.createElement(a, {
                        predicate: function() {
                            return n.versionNumber
                        }
                    }, function() {
                        return s.createElement("div", {
                            class: s.const("dcg-version-number")
                        }, s.const("Version: "), function() {
                            return n.versionNumber
                        })
                    })), s.createElement("a", {
                        role: s.const("link"),
                        tabindex: s.const("0"),
                        class: s.const("dcg-link"),
                        onTap: function() {
                            return e.controller.dispatch({
                                type: "open-modal",
                                modal: "keyboard-shortcuts"
                            })
                        }
                    }, s.createElement("i", {
                        class: s.const("dcg-icon-keyboard")
                    }), s.createElement("span", {
                        class: s.const("dcg-link-text")
                    }, s.const("Keyboard Shortcuts")))), s.createElement("span", {
                        class: s.const("dcg-arrow"),
                        didMount: this.bindFn(this.didMountArrow)
                    }))
                }, t.prototype.didUpdate = function() {
                    this.positionMenu()
                }, t.prototype.didMount = function() {
                    this.positionMenu()
                }, t.prototype.positionMenu = function() {
                    if (this.root && this.arrowNode) {
                        var e = c(".dcg-header")[0].getBoundingClientRect(),
                            t = window.innerWidth - e.right + 5;
                        this.root.style.right = t + "px";
                        var n = this.arrowNode.getBoundingClientRect(),
                            o = c(".dcg-help-btn")[0].getBoundingClientRect(),
                            s = (o.left + o.right) / 2,
                            r = this.root.getBoundingClientRect(),
                            a = s - r.left - n.width / 2;
                        this.arrowNode.style.left = a + "px"
                    }
                }, t.prototype.didMountArrow = function(e) {
                    this.arrowNode = e
                }, t.prototype.didMountRoot = function(e) {
                    var t = this;
                    this.root = e, c(document).on("dcg-tapstart.help-menu", function(e) {
                        c(e.target).closest(t.root).length || c(e.target).closest(".dcg-help-btn").length || t.controller.dispatch({
                            type: "close-help-menu"
                        })
                    })
                }, t.prototype.didUnmountRoot = function() {
                    this.root = void 0, c(document).off(".help-menu")
                }, t.prototype.shouldShowTimeElapsed = function() {
                    return this.controller.isInTestSession()
                }, t.prototype.shouldShowNonChromeOSMessage = function() {
                    return "legacy_app" === this.controller.getPlatform()
                }, t.prototype.shouldShowPracticeMessage = function() {
                    return !this.shouldShowNonChromeOSMessage() && !this.shouldShowTimeElapsed()
                }, t
            }(r.default);
        t.default = i
    }), define("loadcss!practice/keyboard-shortcuts", function() {}), define("practice/graphing-keyboard-shortcuts", ["require", "exports", "tslib", "dcgview", "./dcgview-practice", "dcgview-helpers/static-mathquill-view", "jquery", "loadcss!./keyboard-shortcuts"], function(e, t, n, o, s, r, c) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var a = o.Components.If,
            i = function(e) {
                function t() {
                    return null !== e && e.apply(this, arguments) || this
                }
                return n.__extends(t, e), t.prototype.t = function(e) {
                    return e
                }, t.prototype.template = function() {
                    var e = this;
                    return o.createElement("div", {
                        class: o.const("dcg-hotkey-container")
                    }, o.createElement("div", {
                        class: o.const("dcg-hotkey-section")
                    }, o.createElement("h2", {
                        class: o.const("dcg-hotkey-section-header")
                    }, function() {
                        return e.t("Common Actions")
                    }), o.createElement("table", null, o.createElement("tr", null, o.createElement("th", null, function() {
                        return e.t("Function")
                    }), o.createElement("th", null, function() {
                        return e.t("Shortcut")
                    })), o.createElement("tr", null, o.createElement("td", null, function() {
                        return e.t("Close a Dialog (like this one!)")
                    }), o.createElement("td", {
                        class: o.const("dcg-keyboard-shortcut dcg-os-windows")
                    }, o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("Esc"))), o.createElement("td", {
                        class: o.const("dcg-keyboard-shortcut dcg-os-mac")
                    }, o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("Esc")))), o.createElement("tr", {
                        class: o.const("hotkey-table-row")
                    }, o.createElement("td", null, function() {
                        return e.t("Focus the Expression List")
                    }), o.createElement("td", {
                        class: o.const("dcg-keyboard-shortcut dcg-os-windows")
                    }, o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("CTRL")), o.const("+"), o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("ALT")), o.const("+"), o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("E"))), o.createElement("td", {
                        class: o.const("dcg-keyboard-shortcut dcg-os-mac")
                    }, o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("CTRL")), o.const("+"), o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("COMMAND")), o.const("+"), o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("E")))), o.createElement("tr", null, o.createElement("td", null, function() {
                        return e.t("Add an Expression")
                    }), o.createElement("td", {
                        class: o.const("dcg-keyboard-shortcut dcg-os-windows")
                    }, o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("CTRL")), o.const("+"), o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("ALT")), o.const("+"), o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("X"))), o.createElement("td", {
                        class: o.const("dcg-keyboard-shortcut dcg-os-mac")
                    }, o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("CTRL")), o.const("+"), o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("COMMAND")), o.const("+"), o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("X")))), o.createElement("tr", null, o.createElement("td", null, function() {
                        return e.t("Add a Table")
                    }), o.createElement("td", {
                        class: o.const("dcg-keyboard-shortcut dcg-os-windows")
                    }, o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("CTRL")), o.const("+"), o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("ALT")), o.const("+"), o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("T"))), o.createElement("td", {
                        class: o.const("dcg-keyboard-shortcut dcg-os-mac")
                    }, o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("CTRL")), o.const("+"), o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("COMMAND")), o.const("+"), o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("T")))), o.createElement("tr", null, o.createElement("td", null, function() {
                        return e.t("Undo")
                    }), o.createElement("td", {
                        class: o.const("dcg-keyboard-shortcut dcg-os-windows")
                    }, o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("CTRL")), o.const("+"), o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("Z"))), o.createElement("td", {
                        class: o.const("dcg-keyboard-shortcut dcg-os-mac")
                    }, o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("COMMAND")), o.const("+"), o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("Z")))), o.createElement("tr", null, o.createElement("td", null, function() {
                        return e.t("Redo")
                    }), o.createElement("td", {
                        class: o.const("dcg-keyboard-shortcut dcg-os-windows")
                    }, o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("CTRL")), o.const("+"), o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("SHIFT")), o.const("+"), o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("Z"))), o.createElement("td", {
                        class: o.const("dcg-keyboard-shortcut dcg-os-mac")
                    }, o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("COMMAND")), o.const("+"), o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("SHIFT")), o.const("+"), o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("Z")))), o.createElement("tr", null, o.createElement("td", null, function() {
                        return e.t("Turn Edit List Mode On or Off")
                    }), o.createElement("td", {
                        class: o.const("dcg-keyboard-shortcut dcg-os-windows")
                    }, o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("CTRL")), o.const("+"), o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("ALT")), o.const("+"), o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("D"))), o.createElement("td", {
                        class: o.const("dcg-keyboard-shortcut dcg-os-mac")
                    }, o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("CTRL")), o.const("+"), o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("OPTION")), o.const("+"), o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("D")))), o.createElement("tr", null, o.createElement("td", null, function() {
                        return e.t("Open or Close the Graph Settings Menu")
                    }), o.createElement("td", {
                        class: o.const("dcg-keyboard-shortcut dcg-os-windows")
                    }, o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("CTRL")), o.const("+"), o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("ALT")), o.const("+"), o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("G"))), o.createElement("td", {
                        class: o.const("dcg-keyboard-shortcut dcg-os-mac")
                    }, o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("CTRL")), o.const("+"), o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("COMMAND")), o.const("+"), o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("G")))), o.createElement("tr", null, o.createElement("td", null, function() {
                        return e.t("Open or Close the Help Menu")
                    }), o.createElement("td", {
                        class: o.const("dcg-keyboard-shortcut dcg-os-windows")
                    }, o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("CTRL")), o.const("+"), o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("ALT")), o.const("+"), o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("H"))), o.createElement("td", {
                        class: o.const("dcg-keyboard-shortcut dcg-os-mac")
                    }, o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("CTRL")), o.const("+"), o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("COMMAND")), o.const("+"), o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("H"))))), o.createElement("h2", {
                        class: o.const("dcg-hotkey-section-header")
                    }, function() {
                        return e.t("Expression Entry and Navigation")
                    }), o.createElement("table", null, o.createElement("tr", null, o.createElement("th", null, function() {
                        return e.t("Function")
                    }), o.createElement("th", null, function() {
                        return e.t("Shortcut")
                    })), o.createElement("tr", null, o.createElement("td", null, function() {
                        return e.t("Move to Previous Expression")
                    }), o.createElement("td", {
                        class: o.const("dcg-keyboard-shortcut dcg-os-windows")
                    }, o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("Up Arrow")), function() {
                        return e.t("or")
                    }, o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("SHIFT")), o.const("+"), o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("Tab"))), o.createElement("td", {
                        class: o.const("dcg-keyboard-shortcut dcg-os-mac")
                    }, o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("Up Arrow")), function() {
                        return e.t("or")
                    }, o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("SHIFT")), o.const("+"), o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("Tab")))), o.createElement("tr", null, o.createElement("td", null, function() {
                        return e.t("Move to Next Expression")
                    }), o.createElement("td", {
                        class: o.const("dcg-keyboard-shortcut dcg-os-windows")
                    }, o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("Down Arrow")), function() {
                        return e.t("or")
                    }, o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("Tab"))), o.createElement("td", {
                        class: o.const("dcg-keyboard-shortcut dcg-os-mac")
                    }, o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("Down Arrow")), function() {
                        return e.t("or")
                    }, o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("Tab")))), o.createElement("tr", null, o.createElement("td", null, function() {
                        return e.t("Remove Selected Empty Expression")
                    }), o.createElement("td", {
                        class: o.const("dcg-keyboard-shortcut dcg-os-windows")
                    }, o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("Backspace"))), o.createElement("td", {
                        class: o.const("dcg-keyboard-shortcut dcg-os-mac")
                    }, o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("Delete")))), o.createElement("tr", null, o.createElement("td", null, function() {
                        return e.t("Previous Character")
                    }), o.createElement("td", {
                        class: o.const("dcg-keyboard-shortcut dcg-os-windows")
                    }, o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("Left Arrow"))), o.createElement("td", {
                        class: o.const("dcg-keyboard-shortcut dcg-os-mac")
                    }, o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("Left Arrow")))), o.createElement("tr", null, o.createElement("td", null, function() {
                        return e.t("Next Character")
                    }), o.createElement("td", {
                        class: o.const("dcg-keyboard-shortcut dcg-os-windows")
                    }, o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("Right Arrow"))), o.createElement("td", {
                        class: o.const("dcg-keyboard-shortcut dcg-os-mac")
                    }, o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("Right Arrow")))), o.createElement("tr", null, o.createElement("td", null, function() {
                        return e.t("Move to Numerator Within Fraction")
                    }), o.createElement("td", {
                        class: o.const("dcg-keyboard-shortcut dcg-os-windows")
                    }, o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("Up Arrow"))), o.createElement("td", {
                        class: o.const("dcg-keyboard-shortcut dcg-os-mac")
                    }, o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("Up Arrow")))), o.createElement("tr", null, o.createElement("td", null, function() {
                        return e.t("Move to Denominator Within Fraction")
                    }), o.createElement("td", {
                        class: o.const("dcg-keyboard-shortcut dcg-os-windows")
                    }, o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("Down Arrow"))), o.createElement("td", {
                        class: o.const("dcg-keyboard-shortcut dcg-os-mac")
                    }, o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("Down Arrow")))), o.createElement("tr", null, o.createElement("td", null, function() {
                        return e.t("Exit Current Block")
                    }), o.createElement("td", {
                        class: o.const("dcg-keyboard-shortcut dcg-os-windows")
                    }, o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("Tab"))), o.createElement("td", {
                        class: o.const("dcg-keyboard-shortcut dcg-os-mac")
                    }, o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("Tab")))), o.createElement("tr", null, o.createElement("td", null, function() {
                        return e.t("Beginning of Current Block")
                    }), o.createElement("td", {
                        class: o.const("dcg-keyboard-shortcut dcg-os-windows")
                    }, o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("Home"))), o.createElement("td", {
                        class: o.const("dcg-keyboard-shortcut dcg-os-mac")
                    }, o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("Fn")), o.const("+"), o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("Left Arrow")))), o.createElement("tr", null, o.createElement("td", null, function() {
                        return e.t("End of Current Block")
                    }), o.createElement("td", {
                        class: o.const("dcg-keyboard-shortcut dcg-os-windows")
                    }, o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("End"))), o.createElement("td", {
                        class: o.const("dcg-keyboard-shortcut dcg-os-mac")
                    }, o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("Fn")), o.const("+"), o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("Right Arrow")))), o.createElement("tr", null, o.createElement("td", null, function() {
                        return e.t("Beginning of Current Expression")
                    }), o.createElement("td", {
                        class: o.const("dcg-keyboard-shortcut dcg-os-windows")
                    }, o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("CTRL")), o.const("+"), o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("Home"))), o.createElement("td", {
                        class: o.const("dcg-keyboard-shortcut dcg-os-mac")
                    }, o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("CTRL")), o.const("+"), o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("Fn")), o.const("+"), o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("Left Arrow")))), o.createElement("tr", null, o.createElement("td", null, function() {
                        return e.t("End of Current Expression")
                    }), o.createElement("td", {
                        class: o.const("dcg-keyboard-shortcut dcg-os-windows")
                    }, o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("CTRL")), o.const("+"), o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("End"))), o.createElement("td", {
                        class: o.const("dcg-keyboard-shortcut dcg-os-mac")
                    }, o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("CTRL")), o.const("+"), o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("Fn")), o.const("+"), o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("Right Arrow")))), o.createElement("tr", null, o.createElement("td", null, function() {
                        return e.t("Increase Selection Left")
                    }), o.createElement("td", {
                        class: o.const("dcg-keyboard-shortcut dcg-os-windows")
                    }, o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("SHIFT")), o.const("+"), o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("Left Arrow"))), o.createElement("td", {
                        class: o.const("dcg-keyboard-shortcut dcg-os-mac")
                    }, o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("SHIFT")), o.const("+"), o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("Left Arrow")))), o.createElement("tr", null, o.createElement("td", null, function() {
                        return e.t("Increase Selection Right")
                    }), o.createElement("td", {
                        class: o.const("dcg-keyboard-shortcut dcg-os-windows")
                    }, o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("SHIFT")), o.const("+"), o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("Right Arrow"))), o.createElement("td", {
                        class: o.const("dcg-keyboard-shortcut dcg-os-mac")
                    }, o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("SHIFT")), o.const("+"), o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("Right Arrow")))), o.createElement("tr", null, o.createElement("td", null, function() {
                        return e.t("Delete Selection")
                    }), o.createElement("td", {
                        class: o.const("dcg-keyboard-shortcut dcg-os-windows")
                    }, o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("Backspace"))), o.createElement("td", {
                        class: o.const("dcg-keyboard-shortcut dcg-os-mac")
                    }, o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("Delete")))), o.createElement("tr", null, o.createElement("td", null, function() {
                        return e.t("Select All")
                    }), o.createElement("td", {
                        class: o.const("dcg-keyboard-shortcut dcg-os-windows")
                    }, o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("CTRL")), o.const("+"), o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("A"))), o.createElement("td", {
                        class: o.const("dcg-keyboard-shortcut dcg-os-mac")
                    }, o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("COMMAND")), o.const("+"), o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("A")))), o.createElement("tr", null, o.createElement("td", null, function() {
                        return e.t("Speak Parent Block")
                    }), o.createElement("td", {
                        class: o.const("dcg-keyboard-shortcut dcg-os-windows")
                    }, o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("CTRL")), o.const("+"), o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("ALT")), o.const("+"), o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("Up Arrow"))), o.createElement("td", {
                        class: o.const("dcg-keyboard-shortcut dcg-os-mac")
                    }, o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("CTRL")), o.const("+"), o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("Option")), o.const("+"), o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("Up Arrow")))), o.createElement("tr", null, o.createElement("td", null, function() {
                        return e.t("Speak Focused Block")
                    }), o.createElement("td", {
                        class: o.const("dcg-keyboard-shortcut dcg-os-windows")
                    }, o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("CTRL")), o.const("+"), o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("ALT")), o.const("+"), o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("Down Arrow"))), o.createElement("td", {
                        class: o.const("dcg-keyboard-shortcut dcg-os-mac")
                    }, o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("CTRL")), o.const("+"), o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("Option")), o.const("+"), o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("Down Arrow")))), o.createElement("tr", null, o.createElement("td", null, function() {
                        return e.t("Speak Left-Adjacent Block")
                    }), o.createElement("td", {
                        class: o.const("dcg-keyboard-shortcut dcg-os-windows")
                    }, o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("CTRL")), o.const("+"), o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("ALT")), o.const("+"), o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("Left Arrow"))), o.createElement("td", {
                        class: o.const("dcg-keyboard-shortcut dcg-os-mac")
                    }, o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("CTRL")), o.const("+"), o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("Option")), o.const("+"), o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("Left Arrow")))), o.createElement("tr", null, o.createElement("td", null, function() {
                        return e.t("Speak Right-Adjacent Block")
                    }), o.createElement("td", {
                        class: o.const("dcg-keyboard-shortcut dcg-os-windows")
                    }, o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("CTRL")), o.const("+"), o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("ALT")), o.const("+"), o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("Right Arrow"))), o.createElement("td", {
                        class: o.const("dcg-keyboard-shortcut dcg-os-mac")
                    }, o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("CTRL")), o.const("+"), o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("Option")), o.const("+"), o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("Right Arrow")))), o.createElement("tr", null, o.createElement("td", null, function() {
                        return e.t("Speak Selection")
                    }), o.createElement("td", {
                        class: o.const("dcg-keyboard-shortcut dcg-os-windows")
                    }, o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("CTRL")), o.const("+"), o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("ALT")), o.const("+"), o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("SHIFT")), o.const("+"), o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("Down Arrow"))), o.createElement("td", {
                        class: o.const("dcg-keyboard-shortcut dcg-os-mac")
                    }, o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("CTRL")), o.const("+"), o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("Option")), o.const("+"), o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("SHIFT")), o.const("+"), o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("Down Arrow")))), o.createElement("tr", null, o.createElement("td", null, function() {
                        return e.t("Speak Answer")
                    }), o.createElement("td", {
                        class: o.const("dcg-keyboard-shortcut dcg-os-windows")
                    }, o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("CTRL")), o.const("+"), o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("ALT")), o.const("+"), o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("="))), o.createElement("td", {
                        class: o.const("dcg-keyboard-shortcut dcg-os-mac")
                    }, o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("CTRL")), o.const("+"), o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("Option")), o.const("+"), o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("SHIFT")), o.const("+"), o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("Right Arrow")))), o.createElement(a, {
                        predicate: function() {
                            return e.isDecimalToFractionEnabled()
                        }
                    }, function() {
                        return o.createElement("tr", null, o.createElement("td", null, function() {
                            return e.t("Show Answer as Decimal or Fraction")
                        }), o.createElement("td", {
                            class: o.const("dcg-keyboard-shortcut dcg-os-windows")
                        }, o.createElement("span", {
                            class: o.const("dcg-key-command")
                        }, o.const("ALT")), o.const("+"), o.createElement("span", {
                            class: o.const("dcg-key-command")
                        }, o.const("SHIFT")), o.const("+"), o.createElement("span", {
                            class: o.const("dcg-key-command")
                        }, o.const("F"))), o.createElement("td", {
                            class: o.const("dcg-keyboard-shortcut dcg-os-mac")
                        }, o.createElement("span", {
                            class: o.const("dcg-key-command")
                        }, o.const("COMMAND")), o.const("+"), o.createElement("span", {
                            class: o.const("dcg-key-command")
                        }, o.const("SHIFT")), o.const("+"), o.createElement("span", {
                            class: o.const("dcg-key-command")
                        }, o.const("F"))))
                    })), o.createElement("h2", {
                        class: o.const("dcg-hotkey-section-header")
                    }, function() {
                        return e.t("Graphs with Interactive Points")
                    }), o.createElement("table", null, o.createElement("tr", null, o.createElement("th", null, function() {
                        return e.t("Function")
                    }), o.createElement("th", null, function() {
                        return e.t("Shortcut")
                    })), o.createElement("tr", null, o.createElement("td", null, function() {
                        return e.t("Focus First Interactive Point On Screen")
                    }), o.createElement("td", {
                        class: o.const("dcg-keyboard-shortcut dcg-os-windows")
                    }, o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("CTRL")), o.const("+"), o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("ALT")), o.const("+"), o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("P"))), o.createElement("td", {
                        class: o.const("dcg-keyboard-shortcut dcg-os-mac")
                    }, o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("CTRL")), o.const("+"), o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("COMMAND")), o.const("+"), o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("P")))), o.createElement("tr", null, o.createElement("td", null, function() {
                        return e.t("Go to Next Interactive Point")
                    }), o.createElement("td", {
                        class: o.const("dcg-keyboard-shortcut dcg-os-windows")
                    }, o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("Tab"))), o.createElement("td", {
                        class: o.const("dcg-keyboard-shortcut dcg-os-mac")
                    }, o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("Tab")))), o.createElement("tr", null, o.createElement("td", null, function() {
                        return e.t("Go to Previous Interactive Point")
                    }), o.createElement("td", {
                        class: o.const("dcg-keyboard-shortcut dcg-os-windows")
                    }, o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("SHIFT")), o.const("+"), o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("Tab"))), o.createElement("td", {
                        class: o.const("dcg-keyboard-shortcut dcg-os-mac")
                    }, o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("SHIFT")), o.const("+"), o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("Tab")))), o.createElement("tr", null, o.createElement("td", null, function() {
                        return e.t("Increase X")
                    }), o.createElement("td", {
                        class: o.const("dcg-keyboard-shortcut dcg-os-windows")
                    }, o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("Right Arrow"))), o.createElement("td", {
                        class: o.const("dcg-keyboard-shortcut dcg-os-mac")
                    }, o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("Right Arrow")))), o.createElement("tr", null, o.createElement("td", null, function() {
                        return e.t("Decrease X")
                    }), o.createElement("td", {
                        class: o.const("dcg-keyboard-shortcut dcg-os-windows")
                    }, o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("Left Arrow"))), o.createElement("td", {
                        class: o.const("dcg-keyboard-shortcut dcg-os-mac")
                    }, o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("Left Arrow")))), o.createElement("tr", null, o.createElement("td", null, function() {
                        return e.t("Increase Y")
                    }), o.createElement("td", {
                        class: o.const("dcg-keyboard-shortcut dcg-os-windows")
                    }, o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("Up Arrow"))), o.createElement("td", {
                        class: o.const("dcg-keyboard-shortcut dcg-os-mac")
                    }, o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("Up Arrow")))), o.createElement("tr", null, o.createElement("td", null, function() {
                        return e.t("Decrease Y")
                    }), o.createElement("td", {
                        class: o.const("dcg-keyboard-shortcut dcg-os-windows")
                    }, o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("Down Arrow"))), o.createElement("td", {
                        class: o.const("dcg-keyboard-shortcut dcg-os-mac")
                    }, o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("Down Arrow")))), o.createElement("tr", null, o.createElement("td", null, function() {
                        return e.t("Increase X by Larger Amount")
                    }), o.createElement("td", {
                        class: o.const("dcg-keyboard-shortcut dcg-os-windows")
                    }, o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("SHIFT")), o.const("+"), o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("Right Arrow"))), o.createElement("td", {
                        class: o.const("dcg-keyboard-shortcut dcg-os-mac")
                    }, o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("SHIFT")), o.const("+"), o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("Right Arrow")))), o.createElement("tr", null, o.createElement("td", null, function() {
                        return e.t("Decrease X by Larger Amount")
                    }), o.createElement("td", {
                        class: o.const("dcg-keyboard-shortcut dcg-os-windows")
                    }, o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("SHIFT")), o.const("+"), o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("Left Arrow"))), o.createElement("td", {
                        class: o.const("dcg-keyboard-shortcut dcg-os-mac")
                    }, o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("SHIFT")), o.const("+"), o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("Left Arrow")))), o.createElement("tr", null, o.createElement("td", null, function() {
                        return e.t("Increase Y by Larger Amount")
                    }), o.createElement("td", {
                        class: o.const("dcg-keyboard-shortcut dcg-os-windows")
                    }, o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("SHIFT")), o.const("+"), o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("Up Arrow"))), o.createElement("td", {
                        class: o.const("dcg-keyboard-shortcut dcg-os-mac")
                    }, o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("SHIFT")), o.const("+"), o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("Up Arrow")))), o.createElement("tr", null, o.createElement("td", null, function() {
                        return e.t("Decrease Y by Larger Amount")
                    }), o.createElement("td", {
                        class: o.const("dcg-keyboard-shortcut dcg-os-windows")
                    }, o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("SHIFT")), o.const("+"), o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("Down Arrow"))), o.createElement("td", {
                        class: o.const("dcg-keyboard-shortcut dcg-os-mac")
                    }, o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("SHIFT")), o.const("+"), o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("Down Arrow")))), o.createElement("tr", null, o.createElement("td", null, function() {
                        return e.t("Speak X Coordinate")
                    }), o.createElement("td", {
                        class: o.const("dcg-keyboard-shortcut dcg-os-windows")
                    }, o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("X"))), o.createElement("td", {
                        class: o.const("dcg-keyboard-shortcut dcg-os-mac")
                    }, o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("X")))), o.createElement("tr", null, o.createElement("td", null, function() {
                        return e.t("Speak Y Coordinate")
                    }), o.createElement("td", {
                        class: o.const("dcg-keyboard-shortcut dcg-os-windows")
                    }, o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("Y"))), o.createElement("td", {
                        class: o.const("dcg-keyboard-shortcut dcg-os-mac")
                    }, o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("Y")))), o.createElement("tr", null, o.createElement("td", null, function() {
                        return e.t("Speak Label")
                    }), o.createElement("td", {
                        class: o.const("dcg-keyboard-shortcut dcg-os-windows")
                    }, o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("L"))), o.createElement("td", {
                        class: o.const("dcg-keyboard-shortcut dcg-os-mac")
                    }, o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("L")))), o.createElement("tr", null, o.createElement("td", null, function() {
                        return e.t("Speak Color")
                    }), o.createElement("td", {
                        class: o.const("dcg-keyboard-shortcut dcg-os-windows")
                    }, o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("C"))), o.createElement("td", {
                        class: o.const("dcg-keyboard-shortcut dcg-os-mac")
                    }, o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("C")))))), o.createElement("div", {
                        class: o.const("dcg-hotkey-section")
                    }, o.createElement("h2", {
                        class: o.const("dcg-hotkey-section-header")
                    }, function() {
                        return e.t("Symbols")
                    }), o.createElement("table", null, o.createElement("tr", null, o.createElement("th", null, function() {
                        return e.t("Function")
                    }), o.createElement("th", null, function() {
                        return e.t("Shortcut")
                    })), o.createElement("tr", null, o.createElement("td", null, o.createElement(r.default, {
                        latex: this.const("a^b")
                    })), o.createElement("td", {
                        class: o.const("dcg-keyboard-shortcut dcg-os-windows")
                    }, o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("^")), o.const("(usually"), o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("SHIFT")), o.const("+"), o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("6")), o.const(")")), o.createElement("td", {
                        class: o.const("dcg-keyboard-shortcut dcg-os-mac")
                    }, o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("^")), o.const("(usually"), o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("SHIFT")), o.const("+"), o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("6")), o.const(")"))), o.createElement("tr", null, o.createElement("td", null, o.createElement(r.default, {
                        latex: this.const("a_b")
                    })), o.createElement("td", {
                        class: o.const("dcg-keyboard-shortcut dcg-os-windows")
                    }, o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("_")), o.const("(usually"), o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("SHIFT")), o.const("+"), o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("-")), o.const(")")), o.createElement("td", {
                        class: o.const("dcg-keyboard-shortcut dcg-os-mac")
                    }, o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("_")), o.const("(usually"), o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("SHIFT")), o.const("+"), o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("-")), o.const(")"))), o.createElement("tr", null, o.createElement("td", null, o.createElement(r.default, {
                        latex: this.const("\\le")
                    })), o.createElement("td", {
                        class: o.const("dcg-keyboard-shortcut dcg-os-windows")
                    }, o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("<")), o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("="))), o.createElement("td", {
                        class: o.const("dcg-keyboard-shortcut dcg-os-mac")
                    }, o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("<")), o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("=")))), o.createElement("tr", null, o.createElement("td", null, o.createElement(r.default, {
                        latex: this.const("\\ge")
                    })), o.createElement("td", {
                        class: o.const("dcg-keyboard-shortcut dcg-os-windows")
                    }, o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const(">")), o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("="))), o.createElement("td", {
                        class: o.const("dcg-keyboard-shortcut dcg-os-mac")
                    }, o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const(">")), o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("=")))), o.createElement("tr", null, o.createElement("td", null, o.createElement(r.default, {
                        latex: this.const("a'")
                    })), o.createElement("td", {
                        class: o.const("dcg-keyboard-shortcut dcg-os-windows")
                    }, o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("'"))), o.createElement("td", {
                        class: o.const("dcg-keyboard-shortcut dcg-os-mac")
                    }, o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("'")))), o.createElement("tr", null, o.createElement("td", null, o.createElement(r.default, {
                        latex: this.const("\\sqrt{a}")
                    })), o.createElement("td", {
                        class: o.const("dcg-keyboard-shortcut dcg-os-windows")
                    }, o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("s")), o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("q")), o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("r")), o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("t"))), o.createElement("td", {
                        class: o.const("dcg-keyboard-shortcut dcg-os-mac")
                    }, o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("s")), o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("q")), o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("r")), o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("t")))), o.createElement("tr", null, o.createElement("td", null, o.createElement(r.default, {
                        latex: this.const("\\sqrt[3]{a}")
                    })), o.createElement("td", {
                        class: o.const("dcg-keyboard-shortcut dcg-os-windows")
                    }, o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("c")), o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("b")), o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("r")), o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("t"))), o.createElement("td", {
                        class: o.const("dcg-keyboard-shortcut dcg-os-mac")
                    }, o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("c")), o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("b")), o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("r")), o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("t")))), o.createElement("tr", null, o.createElement("td", null, o.createElement(r.default, {
                        latex: this.const("\\sqrt[n]{a}")
                    })), o.createElement("td", {
                        class: o.const("dcg-keyboard-shortcut dcg-os-windows")
                    }, o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("n")), o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("t")), o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("h")), o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("r")), o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("o")), o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("o")), o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("t"))), o.createElement("td", {
                        class: o.const("dcg-keyboard-shortcut dcg-os-mac")
                    }, o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("n")), o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("t")), o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("h")), o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("r")), o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("o")), o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("o")), o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("t")))), o.createElement("tr", null, o.createElement("td", null, o.createElement(r.default, {
                        latex: this.const("\\sum_{n=a}^b")
                    })), o.createElement("td", {
                        class: o.const("dcg-keyboard-shortcut dcg-os-windows")
                    }, o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("s")), o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("u")), o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("m"))), o.createElement("td", {
                        class: o.const("dcg-keyboard-shortcut dcg-os-mac")
                    }, o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("s")), o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("u")), o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("m")))), o.createElement("tr", null, o.createElement("td", null, o.createElement(r.default, {
                        latex: this.const("\\int_a^b")
                    })), o.createElement("td", {
                        class: o.const("dcg-keyboard-shortcut dcg-os-windows")
                    }, o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("i")), o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("n")), o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("t"))), o.createElement("td", {
                        class: o.const("dcg-keyboard-shortcut dcg-os-mac")
                    }, o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("i")), o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("n")), o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("t")))), o.createElement("tr", null, o.createElement("td", null, o.createElement(r.default, {
                        latex: this.const("\\prod_{n=a}^b")
                    })), o.createElement("td", {
                        class: o.const("dcg-keyboard-shortcut dcg-os-windows")
                    }, o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("p")), o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("r")), o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("o")), o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("d"))), o.createElement("td", {
                        class: o.const("dcg-keyboard-shortcut dcg-os-mac")
                    }, o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("p")), o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("r")), o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("o")), o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("d")))), o.createElement("tr", null, o.createElement("td", null, o.createElement(r.default, {
                        latex: this.const("\\pi")
                    })), o.createElement("td", {
                        class: o.const("dcg-keyboard-shortcut dcg-os-windows")
                    }, o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("p")), o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("i"))), o.createElement("td", {
                        class: o.const("dcg-keyboard-shortcut dcg-os-mac")
                    }, o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("p")), o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("i")))), o.createElement("tr", null, o.createElement("td", null, o.createElement(r.default, {
                        latex: this.const("\\theta")
                    })), o.createElement("td", {
                        class: o.const("dcg-keyboard-shortcut dcg-os-windows")
                    }, o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("t")), o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("h")), o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("e")), o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("t")), o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("a"))), o.createElement("td", {
                        class: o.const("dcg-keyboard-shortcut dcg-os-mac")
                    }, o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("t")), o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("h")), o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("e")), o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("t")), o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("a"))))), o.createElement("h2", {
                        class: o.const("dcg-hotkey-section-header")
                    }, function() {
                        return e.t("Audio Tracing")
                    }), o.createElement("table", null, o.createElement("tr", null, o.createElement("th", null, function() {
                        return e.t("Function")
                    }), o.createElement("th", null, function() {
                        return e.t("Shortcut")
                    })), o.createElement("tr", null, o.createElement("td", null, function() {
                        return e.t("Enable or Disable Audio Trace Mode")
                    }), o.createElement("td", {
                        class: o.const("dcg-keyboard-shortcut dcg-os-windows")
                    }, o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("ALT")), o.const("+"), o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("T"))), o.createElement("td", {
                        class: o.const("dcg-keyboard-shortcut dcg-os-mac")
                    }, o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("Option")), o.const("+"), o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("T")))), o.createElement("tr", null, o.createElement("td", null, function() {
                        return e.t("Summarize Graph")
                    }), o.createElement("td", {
                        class: o.const("dcg-keyboard-shortcut dcg-os-windows")
                    }, o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("ALT")), o.const("+"), o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("S"))), o.createElement("td", {
                        class: o.const("dcg-keyboard-shortcut dcg-os-mac")
                    }, o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("Option")), o.const("+"), o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("S")))), o.createElement("tr", null, o.createElement("td", null, function() {
                        return e.t("Previous Point")
                    }), o.createElement("td", {
                        class: o.const("dcg-keyboard-shortcut dcg-os-windows")
                    }, o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("Left Arrow")), o.const(","), o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("Up Arrow")), o.const(", or"), o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("J"))), o.createElement("td", {
                        class: o.const("dcg-keyboard-shortcut dcg-os-mac")
                    }, o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("Left Arrow")), o.const(","), o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("Up Arrow")), o.const(", or"), o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("J")))), o.createElement("tr", null, o.createElement("td", null, function() {
                        return e.t("Next Point")
                    }), o.createElement("td", {
                        class: o.const("dcg-keyboard-shortcut dcg-os-windows")
                    }, o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("Right Arrow")), o.const(","), o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("Down Arrow")), o.const(", or"), o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("L"))), o.createElement("td", {
                        class: o.const("dcg-keyboard-shortcut dcg-os-mac")
                    }, o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("Right Arrow")), o.const(","), o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("Down Arrow")), o.const(", or"), o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("L")))), o.createElement("tr", null, o.createElement("td", null, function() {
                        return e.t("Next Point of Interest")
                    }), o.createElement("td", {
                        class: o.const("dcg-keyboard-shortcut dcg-os-windows")
                    }, o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("Page Down")), o.const(","), o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("Tab")), o.const(", or"), o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("I"))), o.createElement("td", {
                        class: o.const("dcg-keyboard-shortcut dcg-os-mac")
                    }, o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("Fn")), o.const("+"), o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("Down Arrow")), o.const(","), o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("Tab")), o.const(", or"), o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("I")))), o.createElement("tr", null, o.createElement("td", null, function() {
                        return e.t("Previous Point of Interest")
                    }), o.createElement("td", {
                        class: o.const("dcg-keyboard-shortcut dcg-os-windows")
                    }, o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("Page Up")), o.const(","), o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("SHIFT")), o.const("+"), o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("Tab")), o.const(", or"), o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("K"))), o.createElement("td", {
                        class: o.const("dcg-keyboard-shortcut dcg-os-mac")
                    }, o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("Fn")), o.const("+"), o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("Up Arrow")), o.const(","), o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("SHIFT")), o.const("+"), o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("Tab")), o.const(", or"), o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("K")))), o.createElement("tr", null, o.createElement("td", null, function() {
                        return e.t("First Point")
                    }), o.createElement("td", {
                        class: o.const("dcg-keyboard-shortcut dcg-os-windows")
                    }, o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("Home")), function() {
                        return e.t("or")
                    }, o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("U"))), o.createElement("td", {
                        class: o.const("dcg-keyboard-shortcut dcg-os-mac")
                    }, o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("Fn")), o.const("+"), o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("Left Arrow")), function() {
                        return e.t("or")
                    }, o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("U")))), o.createElement("tr", null, o.createElement("td", null, function() {
                        return e.t("Last Point")
                    }), o.createElement("td", {
                        class: o.const("dcg-keyboard-shortcut dcg-os-windows")
                    }, o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("End")), function() {
                        return e.t("or")
                    }, o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("N"))), o.createElement("td", {
                        class: o.const("dcg-keyboard-shortcut dcg-os-mac")
                    }, o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("Fn")), o.const("+"), o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("Right Arrow")), function() {
                        return e.t("or")
                    }, o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("N")))), o.createElement("tr", null, o.createElement("td", null, function() {
                        return e.t("Speak Point of Interest Count")
                    }), o.createElement("td", {
                        class: o.const("dcg-keyboard-shortcut dcg-os-windows")
                    }, o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("P"))), o.createElement("td", {
                        class: o.const("dcg-keyboard-shortcut dcg-os-mac")
                    }, o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("P")))), o.createElement("tr", null, o.createElement("td", null, function() {
                        return e.t("Speak X Coordinate")
                    }), o.createElement("td", {
                        class: o.const("dcg-keyboard-shortcut dcg-os-windows")
                    }, o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("X"))), o.createElement("td", {
                        class: o.const("dcg-keyboard-shortcut dcg-os-mac")
                    }, o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("X")))), o.createElement("tr", null, o.createElement("td", null, function() {
                        return e.t("Speak Y Coordinate")
                    }), o.createElement("td", {
                        class: o.const("dcg-keyboard-shortcut dcg-os-windows")
                    }, o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("Y"))), o.createElement("td", {
                        class: o.const("dcg-keyboard-shortcut dcg-os-mac")
                    }, o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("Y")))), o.createElement("tr", null, o.createElement("td", null, function() {
                        return e.t("Speak Color")
                    }), o.createElement("td", {
                        class: o.const("dcg-keyboard-shortcut dcg-os-windows")
                    }, o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("C"))), o.createElement("td", {
                        class: o.const("dcg-keyboard-shortcut dcg-os-mac")
                    }, o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("C")))), o.createElement("tr", null, o.createElement("td", null, function() {
                        return e.t("Speak Branch")
                    }), o.createElement("td", {
                        class: o.const("dcg-keyboard-shortcut dcg-os-windows")
                    }, o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("B"))), o.createElement("td", {
                        class: o.const("dcg-keyboard-shortcut dcg-os-mac")
                    }, o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("B")))), o.createElement("tr", null, o.createElement("td", null, function() {
                        return e.t("Speak Type of Selected Point")
                    }), o.createElement("td", {
                        class: o.const("dcg-keyboard-shortcut dcg-os-windows")
                    }, o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("T"))), o.createElement("td", {
                        class: o.const("dcg-keyboard-shortcut dcg-os-mac")
                    }, o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("T")))), o.createElement("tr", null, o.createElement("td", null, function() {
                        return e.t("Move to Origin")
                    }), o.createElement("td", {
                        class: o.const("dcg-keyboard-shortcut dcg-os-windows")
                    }, o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("O"))), o.createElement("td", {
                        class: o.const("dcg-keyboard-shortcut dcg-os-mac")
                    }, o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("O")))), o.createElement("tr", null, o.createElement("td", null, function() {
                        return e.t("Move to Previous Curve")
                    }), o.createElement("td", {
                        class: o.const("dcg-keyboard-shortcut dcg-os-windows")
                    }, o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("CTRL")), o.const("+"), o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("Up Arrow"))), o.createElement("td", {
                        class: o.const("dcg-keyboard-shortcut dcg-os-mac")
                    }, o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("COMMAND")), o.const("+"), o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("Up Arrow")))), o.createElement("tr", null, o.createElement("td", null, function() {
                        return e.t("Move to Next Curve")
                    }), o.createElement("td", {
                        class: o.const("dcg-keyboard-shortcut dcg-os-windows")
                    }, o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("CTRL")), o.const("+"), o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("Down Arrow"))), o.createElement("td", {
                        class: o.const("dcg-keyboard-shortcut dcg-os-mac")
                    }, o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("COMMAND")), o.const("+"), o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("Down Arrow")))), o.createElement("tr", null, o.createElement("td", null, function() {
                        return e.t("Hear Graph")
                    }), o.createElement("td", {
                        class: o.const("dcg-keyboard-shortcut dcg-os-windows")
                    }, o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("H"))), o.createElement("td", {
                        class: o.const("dcg-keyboard-shortcut dcg-os-mac")
                    }, o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("H")))), o.createElement("tr", null, o.createElement("td", null, function() {
                        return e.t("Hear Only Branch 1 Through 10")
                    }), o.createElement("td", {
                        class: o.const("dcg-keyboard-shortcut dcg-os-windows")
                    }, o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("1")), o.const("-"), o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("0"))), o.createElement("td", {
                        class: o.const("dcg-keyboard-shortcut dcg-os-mac")
                    }, o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("1")), o.const("-"), o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("0")))), o.createElement("tr", null, o.createElement("td", null, function() {
                        return e.t("Adjust Playback Speed (1 = slowest, 5 = fastest)")
                    }), o.createElement("td", {
                        class: o.const("dcg-keyboard-shortcut dcg-os-windows")
                    }, o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("ALT")), o.const("+"), o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("1")), o.const("-"), o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("5"))), o.createElement("td", {
                        class: o.const("dcg-keyboard-shortcut dcg-os-mac")
                    }, o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("Option")), o.const("+"), o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("1")), o.const("-"), o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("5")))), o.createElement("tr", null, o.createElement("td", null, function() {
                        return e.t("Increase Volume")
                    }), o.createElement("td", {
                        class: o.const("dcg-keyboard-shortcut dcg-os-windows")
                    }, o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("V"))), o.createElement("td", {
                        class: o.const("dcg-keyboard-shortcut dcg-os-mac")
                    }, o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("V")))), o.createElement("tr", null, o.createElement("td", null, function() {
                        return e.t("Decrease Volume")
                    }), o.createElement("td", {
                        class: o.const("dcg-keyboard-shortcut dcg-os-windows")
                    }, o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("SHIFT")), o.const("+"), o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("V"))), o.createElement("td", {
                        class: o.const("dcg-keyboard-shortcut dcg-os-mac")
                    }, o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("SHIFT")), o.const("+"), o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("V")))), o.createElement("tr", null, o.createElement("td", null, function() {
                        return e.t("Announce Active Slider Animations")
                    }), o.createElement("td", {
                        class: o.const("dcg-keyboard-shortcut dcg-os-windows")
                    }, o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("A"))), o.createElement("td", {
                        class: o.const("dcg-keyboard-shortcut dcg-os-mac")
                    }, o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("A")))), o.createElement("tr", null, o.createElement("td", null, function() {
                        return e.t("Toggle Slider Trace Mode")
                    }), o.createElement("td", {
                        class: o.const("dcg-keyboard-shortcut dcg-os-windows")
                    }, o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("S"))), o.createElement("td", {
                        class: o.const("dcg-keyboard-shortcut dcg-os-mac")
                    }, o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("S")))), o.createElement("tr", null, o.createElement("td", null, function() {
                        return e.t("Decrease Value of Selected Slider When in Slider Trace")
                    }), o.createElement("td", {
                        class: o.const("dcg-keyboard-shortcut dcg-os-windows")
                    }, o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("Left Arrow")), function() {
                        return e.t("or")
                    }, o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("J"))), o.createElement("td", {
                        class: o.const("dcg-keyboard-shortcut dcg-os-mac")
                    }, o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("Left Arrow")), function() {
                        return e.t("or")
                    }, o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("J")))), o.createElement("tr", null, o.createElement("td", null, function() {
                        return e.t("Decrease Value of Selected Slider by Larger Increment When in Slider Trace")
                    }), o.createElement("td", {
                        class: o.const("dcg-keyboard-shortcut dcg-os-windows")
                    }, o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("Page Down"))), o.createElement("td", {
                        class: o.const("dcg-keyboard-shortcut dcg-os-mac")
                    }, o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("Fn")), o.const("+"), o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("Down Arrow")))), o.createElement("tr", null, o.createElement("td", null, function() {
                        return e.t("Increase Value of Selected Slider When in Slider Trace")
                    }), o.createElement("td", {
                        class: o.const("dcg-keyboard-shortcut dcg-os-windows")
                    }, o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("Right Arrow")), function() {
                        return e.t("or")
                    }, o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("L"))), o.createElement("td", {
                        class: o.const("dcg-keyboard-shortcut dcg-os-mac")
                    }, o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("Right Arrow")), function() {
                        return e.t("or")
                    }, o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("L")))), o.createElement("tr", null, o.createElement("td", null, function() {
                        return e.t("Increase Value of Selected Slider by Larger Increment When in Slider Trace")
                    }), o.createElement("td", {
                        class: o.const("dcg-keyboard-shortcut dcg-os-windows")
                    }, o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("Page Up"))), o.createElement("td", {
                        class: o.const("dcg-keyboard-shortcut dcg-os-mac")
                    }, o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("Fn")), o.const("+"), o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("Up Arrow")))), o.createElement("tr", null, o.createElement("td", null, function() {
                        return e.t("Move to Lowest Value of Selected Slider When in Slider Trace")
                    }), o.createElement("td", {
                        class: o.const("dcg-keyboard-shortcut dcg-os-windows")
                    }, o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("Home")), function() {
                        return e.t("or")
                    }, o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("U"))), o.createElement("td", {
                        class: o.const("dcg-keyboard-shortcut dcg-os-mac")
                    }, o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("Fn")), o.const("+"), o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("Left Arrow")), function() {
                        return e.t("or")
                    }, o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("U")))), o.createElement("tr", null, o.createElement("td", null, function() {
                        return e.t("Move to Highest Value of Selected Slider When in Slider Trace")
                    }), o.createElement("td", {
                        class: o.const("dcg-keyboard-shortcut dcg-os-windows")
                    }, o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("End")), function() {
                        return e.t("or")
                    }, o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("N"))), o.createElement("td", {
                        class: o.const("dcg-keyboard-shortcut dcg-os-mac")
                    }, o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("Fn")), o.const("+"), o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("Right Arrow")), function() {
                        return e.t("or")
                    }, o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("N")))), o.createElement("tr", null, o.createElement("td", null, function() {
                        return e.t("Select Next Slider When in Slider Trace")
                    }), o.createElement("td", {
                        class: o.const("dcg-keyboard-shortcut dcg-os-windows")
                    }, o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("Down Arrow")), o.const(","), o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("Tab")), o.const(", or"), o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("K"))), o.createElement("td", {
                        class: o.const("dcg-keyboard-shortcut dcg-os-mac")
                    }, o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("Down Arrow")), o.const(","), o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("Tab")), o.const(", or"), o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("K")))), o.createElement("tr", null, o.createElement("td", null, function() {
                        return e.t("Select Previous Slider When in Slider Trace")
                    }), o.createElement("td", {
                        class: o.const("dcg-keyboard-shortcut dcg-os-windows")
                    }, o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("Up Arrow")), o.const(","), o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("SHIFT")), o.const("+"), o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("Tab")), o.const(", or"), o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("I"))), o.createElement("td", {
                        class: o.const("dcg-keyboard-shortcut dcg-os-mac")
                    }, o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("Up Arrow")), o.const(","), o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("SHIFT")), o.const("+"), o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("Tab")), o.const(", or"), o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("I"))))), o.createElement("h2", {
                        class: o.const("dcg-hotkey-section-header")
                    }, function() {
                        return e.t("Sliders")
                    }), o.createElement("table", null, o.createElement("tr", null, o.createElement("th", null, function() {
                        return e.t("Function")
                    }), o.createElement("th", null, function() {
                        return e.t("Shortcut")
                    })), o.createElement("tr", null, o.createElement("td", null, function() {
                        return e.t("Decrease Value")
                    }), o.createElement("td", {
                        class: o.const("dcg-keyboard-shortcut dcg-os-windows")
                    }, o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("Left Arrow"))), o.createElement("td", {
                        class: o.const("dcg-keyboard-shortcut dcg-os-mac")
                    }, o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("Left Arrow")))), o.createElement("tr", null, o.createElement("td", null, function() {
                        return e.t("Decrease Value by Larger Increment")
                    }), o.createElement("td", {
                        class: o.const("dcg-keyboard-shortcut dcg-os-windows")
                    }, o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("Page Down"))), o.createElement("td", {
                        class: o.const("dcg-keyboard-shortcut dcg-os-mac")
                    }, o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("Fn")), o.const("+"), o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("Down Arrow")))), o.createElement("tr", null, o.createElement("td", null, function() {
                        return e.t("Increase Value")
                    }), o.createElement("td", {
                        class: o.const("dcg-keyboard-shortcut dcg-os-windows")
                    }, o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("Right Arrow"))), o.createElement("td", {
                        class: o.const("dcg-keyboard-shortcut dcg-os-mac")
                    }, o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("Right Arrow")))), o.createElement("tr", null, o.createElement("td", null, function() {
                        return e.t("Increase Value by Larger Increment")
                    }), o.createElement("td", {
                        class: o.const("dcg-keyboard-shortcut dcg-os-windows")
                    }, o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("Page Up"))), o.createElement("td", {
                        class: o.const("dcg-keyboard-shortcut dcg-os-mac")
                    }, o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("Fn")), o.const("+"), o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("Up Arrow")))), o.createElement("tr", null, o.createElement("td", null, function() {
                        return e.t("Lowest Value")
                    }), o.createElement("td", {
                        class: o.const("dcg-keyboard-shortcut dcg-os-windows")
                    }, o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("Home"))), o.createElement("td", {
                        class: o.const("dcg-keyboard-shortcut dcg-os-mac")
                    }, o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("Fn")), o.const("+"), o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("Left Arrow")))), o.createElement("tr", null, o.createElement("td", null, function() {
                        return e.t("Highest Value")
                    }), o.createElement("td", {
                        class: o.const("dcg-keyboard-shortcut dcg-os-windows")
                    }, o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("End"))), o.createElement("td", {
                        class: o.const("dcg-keyboard-shortcut dcg-os-mac")
                    }, o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("Fn")), o.const("+"), o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("Right Arrow"))))), o.createElement("h2", {
                        class: o.const("dcg-hotkey-section-header tables-section")
                    }, function() {
                        return e.t("Tables")
                    }), o.createElement("table", null, o.createElement("tr", null, o.createElement("th", null, function() {
                        return e.t("Function")
                    }), o.createElement("th", null, function() {
                        return e.t("Shortcut")
                    })), o.createElement("tr", null, o.createElement("td", null, function() {
                        return e.t("Previous Cell")
                    }), o.createElement("td", {
                        class: o.const("dcg-keyboard-shortcut dcg-os-windows")
                    }, o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("SHIFT")), o.const("+"), o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("Tab"))), o.createElement("td", {
                        class: o.const("dcg-keyboard-shortcut dcg-os-mac")
                    }, o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("SHIFT")), o.const("+"), o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("Tab")))), o.createElement("tr", null, o.createElement("td", null, function() {
                        return e.t("Next Cell")
                    }), o.createElement("td", {
                        class: o.const("dcg-keyboard-shortcut dcg-os-windows")
                    }, o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("Tab"))), o.createElement("td", {
                        class: o.const("dcg-keyboard-shortcut dcg-os-mac")
                    }, o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("Tab")))), o.createElement("tr", null, o.createElement("td", null, function() {
                        return e.t("Previous Row")
                    }), o.createElement("td", {
                        class: o.const("dcg-keyboard-shortcut dcg-os-windows")
                    }, o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("Up Arrow"))), o.createElement("td", {
                        class: o.const("dcg-keyboard-shortcut dcg-os-mac")
                    }, o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("Up Arrow")))), o.createElement("tr", null, o.createElement("td", null, function() {
                        return e.t("Next Row")
                    }), o.createElement("td", {
                        class: o.const("dcg-keyboard-shortcut dcg-os-windows")
                    }, o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("Down Arrow"))), o.createElement("td", {
                        class: o.const("dcg-keyboard-shortcut dcg-os-mac")
                    }, o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("Down Arrow")))), o.createElement("tr", null, o.createElement("td", null, function() {
                        return e.t("Previous Column")
                    }), o.createElement("td", {
                        class: o.const("dcg-keyboard-shortcut dcg-os-windows")
                    }, o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("Left Arrow"))), o.createElement("td", {
                        class: o.const("dcg-keyboard-shortcut dcg-os-mac")
                    }, o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("Left Arrow")))), o.createElement("tr", null, o.createElement("td", null, function() {
                        return e.t("Next Column")
                    }), o.createElement("td", {
                        class: o.const("dcg-keyboard-shortcut dcg-os-windows")
                    }, o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("Right Arrow"))), o.createElement("td", {
                        class: o.const("dcg-keyboard-shortcut dcg-os-mac")
                    }, o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("Right Arrow")))), o.createElement("tr", null, o.createElement("td", null, function() {
                        return e.t("First Row in Column")
                    }), o.createElement("td", {
                        class: o.const("dcg-keyboard-shortcut dcg-os-windows")
                    }, o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("CTRL")), o.const("+"), o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("Up Arrow"))), o.createElement("td", {
                        class: o.const("dcg-keyboard-shortcut dcg-os-mac")
                    }, o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("CTRL")), o.const("+"), o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("Up Arrow")))), o.createElement("tr", null, o.createElement("td", null, function() {
                        return e.t("Last Row in Column")
                    }), o.createElement("td", {
                        class: o.const("dcg-keyboard-shortcut dcg-os-windows")
                    }, o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("CTRL")), o.const("+"), o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("Down Arrow"))), o.createElement("td", {
                        class: o.const("dcg-keyboard-shortcut dcg-os-mac")
                    }, o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("CTRL")), o.const("+"), o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("Down Arrow")))), o.createElement("tr", null, o.createElement("td", null, function() {
                        return e.t("First Column in Row")
                    }), o.createElement("td", {
                        class: o.const("dcg-keyboard-shortcut dcg-os-windows")
                    }, o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("CTRL")), o.const("+"), o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("Left Arrow"))), o.createElement("td", {
                        class: o.const("dcg-keyboard-shortcut dcg-os-mac")
                    }, o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("CTRL")), o.const("+"), o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("Left Arrow")))), o.createElement("tr", null, o.createElement("td", null, function() {
                        return e.t("Last Column in Row")
                    }), o.createElement("td", {
                        class: o.const("dcg-keyboard-shortcut dcg-os-windows")
                    }, o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("CTRL")), o.const("+"), o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("Right Arrow"))), o.createElement("td", {
                        class: o.const("dcg-keyboard-shortcut dcg-os-mac")
                    }, o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("CTRL")), o.const("+"), o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("Right Arrow")))), o.createElement("tr", null, o.createElement("td", null, function() {
                        return e.t("Speak Column Header")
                    }), o.createElement("td", {
                        class: o.const("dcg-keyboard-shortcut dcg-os-windows")
                    }, o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("CTRL")), o.const("+"), o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("H"))), o.createElement("td", {
                        class: o.const("dcg-keyboard-shortcut dcg-os-mac")
                    }, o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("CTRL")), o.const("+"), o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("H")))))))
                }, t.prototype.getShortcutOS = function() {
                    return this.controller.getKeyboardOS()
                }, t.prototype.didMount = function() {
                    this.updateVisibleShortcuts()
                }, t.prototype.didUpdate = function() {
                    this.updateVisibleShortcuts()
                }, t.prototype.updateVisibleShortcuts = function() {
                    var e = this.getShortcutOS(),
                        t = c(".dcg-os-mac"),
                        n = c(".dcg-os-windows");
                    "mac" == e ? (t.show(), n.hide()) : (t.hide(), n.show())
                }, t.prototype.isDecimalToFractionEnabled = function() {
                    return !1
                }, t
            }(s.default);
        t.default = i
    }), define("practice/scientific-keyboard-shortcuts", ["require", "exports", "tslib", "dcgview", "./dcgview-practice", "dcgview-helpers/static-mathquill-view", "jquery", "loadcss!./keyboard-shortcuts"], function(e, t, n, o, s, r, c) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var a = o.Components.If,
            i = function(e) {
                function t() {
                    return null !== e && e.apply(this, arguments) || this
                }
                return n.__extends(t, e), t.prototype.t = function(e) {
                    return e
                }, t.prototype.template = function() {
                    var e = this;
                    return o.createElement("div", {
                        class: o.const("dcg-hotkey-container")
                    }, o.createElement("div", {
                        class: o.const("dcg-hotkey-section")
                    }, o.createElement("h2", {
                        class: o.const("dcg-hotkey-section-header")
                    }, function() {
                        return e.t("Common Actions")
                    }), o.createElement("table", null, o.createElement("tr", null, o.createElement("th", null, function() {
                        return e.t("Function")
                    }), o.createElement("th", null, function() {
                        return e.t("Shortcut")
                    })), o.createElement("tr", null, o.createElement("td", null, function() {
                        return e.t("Close a Dialog (like this one!)")
                    }), o.createElement("td", {
                        class: o.const("dcg-keyboard-shortcut dcg-os-windows")
                    }, o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("Esc"))), o.createElement("td", {
                        class: o.const("dcg-keyboard-shortcut dcg-os-mac")
                    }, o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("Esc")))), o.createElement("tr", null, o.createElement("td", null, function() {
                        return e.t("Undo")
                    }), o.createElement("td", {
                        class: o.const("dcg-keyboard-shortcut dcg-os-windows")
                    }, o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("CTRL")), o.const("+"), o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("Z"))), o.createElement("td", {
                        class: o.const("dcg-keyboard-shortcut dcg-os-mac")
                    }, o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("COMMAND")), o.const("+"), o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("Z")))), o.createElement("tr", null, o.createElement("td", null, function() {
                        return e.t("Redo")
                    }), o.createElement("td", {
                        class: o.const("dcg-keyboard-shortcut dcg-os-windows")
                    }, o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("CTRL")), o.const("+"), o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("SHIFT")), o.const("+"), o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("Z"))), o.createElement("td", {
                        class: o.const("dcg-keyboard-shortcut dcg-os-mac")
                    }, o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("COMMAND")), o.const("+"), o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("SHIFT")), o.const("+"), o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("Z")))), o.createElement("tr", null, o.createElement("td", null, function() {
                        return e.t("Open or Close the Help Menu")
                    }), o.createElement("td", {
                        class: o.const("dcg-keyboard-shortcut dcg-os-windows")
                    }, o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("CTRL")), o.const("+"), o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("ALT")), o.const("+"), o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("H"))), o.createElement("td", {
                        class: o.const("dcg-keyboard-shortcut dcg-os-mac")
                    }, o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("CTRL")), o.const("+"), o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("COMMAND")), o.const("+"), o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("H"))))), o.createElement("h2", {
                        class: o.const("dcg-hotkey-section-header")
                    }, function() {
                        return e.t("Expression Entry and Navigation")
                    }), o.createElement("table", null, o.createElement("tr", null, o.createElement("th", null, function() {
                        return e.t("Function")
                    }), o.createElement("th", null, function() {
                        return e.t("Shortcut")
                    })), o.createElement("tr", null, o.createElement("td", null, function() {
                        return e.t("Move to Previous Expression")
                    }), o.createElement("td", {
                        class: o.const("dcg-keyboard-shortcut dcg-os-windows")
                    }, o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("Up Arrow")), function() {
                        return e.t("or")
                    }, o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("SHIFT")), o.const("+"), o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("Tab"))), o.createElement("td", {
                        class: o.const("dcg-keyboard-shortcut dcg-os-mac")
                    }, o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("Up Arrow")), function() {
                        return e.t("or")
                    }, o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("SHIFT")), o.const("+"), o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("Tab")))), o.createElement("tr", null, o.createElement("td", null, function() {
                        return e.t("Move to Next Expression")
                    }), o.createElement("td", {
                        class: o.const("dcg-keyboard-shortcut dcg-os-windows")
                    }, o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("Down Arrow")), function() {
                        return e.t("or")
                    }, o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("Tab"))), o.createElement("td", {
                        class: o.const("dcg-keyboard-shortcut dcg-os-mac")
                    }, o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("Down Arrow")), function() {
                        return e.t("or")
                    }, o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("Tab")))), o.createElement("tr", null, o.createElement("td", null, function() {
                        return e.t("Remove Selected Empty Expression")
                    }), o.createElement("td", {
                        class: o.const("dcg-keyboard-shortcut dcg-os-windows")
                    }, o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("Backspace"))), o.createElement("td", {
                        class: o.const("dcg-keyboard-shortcut dcg-os-mac")
                    }, o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("Delete")))), o.createElement("tr", null, o.createElement("td", null, function() {
                        return e.t("Previous Character")
                    }), o.createElement("td", {
                        class: o.const("dcg-keyboard-shortcut dcg-os-windows")
                    }, o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("Left Arrow"))), o.createElement("td", {
                        class: o.const("dcg-keyboard-shortcut dcg-os-mac")
                    }, o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("Left Arrow")))), o.createElement("tr", null, o.createElement("td", null, function() {
                        return e.t("Next Character")
                    }), o.createElement("td", {
                        class: o.const("dcg-keyboard-shortcut dcg-os-windows")
                    }, o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("Right Arrow"))), o.createElement("td", {
                        class: o.const("dcg-keyboard-shortcut dcg-os-mac")
                    }, o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("Right Arrow")))), o.createElement("tr", null, o.createElement("td", null, function() {
                        return e.t("Move to Numerator Within Fraction")
                    }), o.createElement("td", {
                        class: o.const("dcg-keyboard-shortcut dcg-os-windows")
                    }, o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("Up Arrow"))), o.createElement("td", {
                        class: o.const("dcg-keyboard-shortcut dcg-os-mac")
                    }, o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("Up Arrow")))), o.createElement("tr", null, o.createElement("td", null, function() {
                        return e.t("Move to Denominator Within Fraction")
                    }), o.createElement("td", {
                        class: o.const("dcg-keyboard-shortcut dcg-os-windows")
                    }, o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("Down Arrow"))), o.createElement("td", {
                        class: o.const("dcg-keyboard-shortcut dcg-os-mac")
                    }, o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("Down Arrow")))), o.createElement("tr", null, o.createElement("td", null, function() {
                        return e.t("Exit Current Block")
                    }), o.createElement("td", {
                        class: o.const("dcg-keyboard-shortcut dcg-os-windows")
                    }, o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("Tab"))), o.createElement("td", {
                        class: o.const("dcg-keyboard-shortcut dcg-os-mac")
                    }, o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("Tab")))), o.createElement("tr", null, o.createElement("td", null, function() {
                        return e.t("Beginning of Current Block")
                    }), o.createElement("td", {
                        class: o.const("dcg-keyboard-shortcut dcg-os-windows")
                    }, o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("Home"))), o.createElement("td", {
                        class: o.const("dcg-keyboard-shortcut dcg-os-mac")
                    }, o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("Fn")), o.const("+"), o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("Left Arrow")))), o.createElement("tr", null, o.createElement("td", null, function() {
                        return e.t("End of Current Block")
                    }), o.createElement("td", {
                        class: o.const("dcg-keyboard-shortcut dcg-os-windows")
                    }, o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("End"))), o.createElement("td", {
                        class: o.const("dcg-keyboard-shortcut dcg-os-mac")
                    }, o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("Fn")), o.const("+"), o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("Right Arrow")))), o.createElement("tr", null, o.createElement("td", null, function() {
                        return e.t("Beginning of Current Expression")
                    }), o.createElement("td", {
                        class: o.const("dcg-keyboard-shortcut dcg-os-windows")
                    }, o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("CTRL")), o.const("+"), o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("Home"))), o.createElement("td", {
                        class: o.const("dcg-keyboard-shortcut dcg-os-mac")
                    }, o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("CTRL")), o.const("+"), o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("Fn")), o.const("+"), o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("Left Arrow")))), o.createElement("tr", null, o.createElement("td", null, function() {
                        return e.t("End of Current Expression")
                    }), o.createElement("td", {
                        class: o.const("dcg-keyboard-shortcut dcg-os-windows")
                    }, o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("CTRL")), o.const("+"), o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("End"))), o.createElement("td", {
                        class: o.const("dcg-keyboard-shortcut dcg-os-mac")
                    }, o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("CTRL")), o.const("+"), o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("Fn")), o.const("+"), o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("Right Arrow")))), o.createElement("tr", null, o.createElement("td", null, function() {
                        return e.t("Increase Selection Left")
                    }), o.createElement("td", {
                        class: o.const("dcg-keyboard-shortcut dcg-os-windows")
                    }, o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("SHIFT")), o.const("+"), o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("Left Arrow"))), o.createElement("td", {
                        class: o.const("dcg-keyboard-shortcut dcg-os-mac")
                    }, o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("SHIFT")), o.const("+"), o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("Left Arrow")))), o.createElement("tr", null, o.createElement("td", null, function() {
                        return e.t("Increase Selection Right")
                    }), o.createElement("td", {
                        class: o.const("dcg-keyboard-shortcut dcg-os-windows")
                    }, o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("SHIFT")), o.const("+"), o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("Right Arrow"))), o.createElement("td", {
                        class: o.const("dcg-keyboard-shortcut dcg-os-mac")
                    }, o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("SHIFT")), o.const("+"), o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("Right Arrow")))), o.createElement("tr", null, o.createElement("td", null, function() {
                        return e.t("Delete Selection")
                    }), o.createElement("td", {
                        class: o.const("dcg-keyboard-shortcut dcg-os-windows")
                    }, o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("Backspace"))), o.createElement("td", {
                        class: o.const("dcg-keyboard-shortcut dcg-os-mac")
                    }, o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("Delete")))), o.createElement("tr", null, o.createElement("td", null, function() {
                        return e.t("Select All")
                    }), o.createElement("td", {
                        class: o.const("dcg-keyboard-shortcut dcg-os-windows")
                    }, o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("CTRL")), o.const("+"), o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("A"))), o.createElement("td", {
                        class: o.const("dcg-keyboard-shortcut dcg-os-mac")
                    }, o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("COMMAND")), o.const("+"), o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("A")))), o.createElement("tr", null, o.createElement("td", null, function() {
                        return e.t("Speak Parent Block")
                    }), o.createElement("td", {
                        class: o.const("dcg-keyboard-shortcut dcg-os-windows")
                    }, o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("CTRL")), o.const("+"), o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("ALT")), o.const("+"), o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("Up Arrow"))), o.createElement("td", {
                        class: o.const("dcg-keyboard-shortcut dcg-os-mac")
                    }, o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("CTRL")), o.const("+"), o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("Option")), o.const("+"), o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("Up Arrow")))), o.createElement("tr", null, o.createElement("td", null, function() {
                        return e.t("Speak Focused Block")
                    }), o.createElement("td", {
                        class: o.const("dcg-keyboard-shortcut dcg-os-windows")
                    }, o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("CTRL")), o.const("+"), o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("ALT")), o.const("+"), o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("Down Arrow"))), o.createElement("td", {
                        class: o.const("dcg-keyboard-shortcut dcg-os-mac")
                    }, o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("CTRL")), o.const("+"), o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("Option")), o.const("+"), o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("Down Arrow")))), o.createElement("tr", null, o.createElement("td", null, function() {
                        return e.t("Speak Left-Adjacent Block")
                    }), o.createElement("td", {
                        class: o.const("dcg-keyboard-shortcut dcg-os-windows")
                    }, o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("CTRL")), o.const("+"), o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("ALT")), o.const("+"), o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("Left Arrow"))), o.createElement("td", {
                        class: o.const("dcg-keyboard-shortcut dcg-os-mac")
                    }, o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("CTRL")), o.const("+"), o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("Option")), o.const("+"), o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("Left Arrow")))), o.createElement("tr", null, o.createElement("td", null, function() {
                        return e.t("Speak Right-Adjacent Block")
                    }), o.createElement("td", {
                        class: o.const("dcg-keyboard-shortcut dcg-os-windows")
                    }, o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("CTRL")), o.const("+"), o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("ALT")), o.const("+"), o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("Right Arrow"))), o.createElement("td", {
                        class: o.const("dcg-keyboard-shortcut dcg-os-mac")
                    }, o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("CTRL")), o.const("+"), o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("Option")), o.const("+"), o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("Right Arrow")))), o.createElement("tr", null, o.createElement("td", null, function() {
                        return e.t("Speak Selection")
                    }), o.createElement("td", {
                        class: o.const("dcg-keyboard-shortcut dcg-os-windows")
                    }, o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("CTRL")), o.const("+"), o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("ALT")), o.const("+"), o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("SHIFT")), o.const("+"), o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("Down Arrow"))), o.createElement("td", {
                        class: o.const("dcg-keyboard-shortcut dcg-os-mac")
                    }, o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("CTRL")), o.const("+"), o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("Option")), o.const("+"), o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("SHIFT")), o.const("+"), o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("Down Arrow")))), o.createElement("tr", null, o.createElement("td", null, function() {
                        return e.t("Speak Answer")
                    }), o.createElement("td", {
                        class: o.const("dcg-keyboard-shortcut dcg-os-windows")
                    }, o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("CTRL")), o.const("+"), o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("ALT")), o.const("+"), o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("="))), o.createElement("td", {
                        class: o.const("dcg-keyboard-shortcut dcg-os-mac")
                    }, o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("CTRL")), o.const("+"), o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("Option")), o.const("+"), o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("SHIFT")), o.const("+"), o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("Right Arrow")))))), o.createElement("div", {
                        class: o.const("dcg-hotkey-section")
                    }, o.createElement(a, {
                        predicate: this.bindFn(this.showSymbols)
                    }, function() {
                        return o.createElement("h2", {
                            class: o.const("dcg-hotkey-section-header")
                        }, function() {
                            return e.t("Symbols")
                        })
                    }), o.createElement(a, {
                        predicate: this.bindFn(this.showSymbols)
                    }, function() {
                        return o.createElement("table", null, o.createElement("tr", null, o.createElement("th", null, function() {
                            return e.t("Function")
                        }), o.createElement("th", null, function() {
                            return e.t("Shortcut")
                        })), o.createElement("tr", null, o.createElement("td", null, o.createElement(r.default, {
                            latex: e.const("a^b")
                        })), o.createElement("td", {
                            class: o.const("dcg-keyboard-shortcut dcg-os-windows")
                        }, o.createElement("span", {
                            class: o.const("dcg-key-command")
                        }, o.const("^")), o.const("(usually"), o.createElement("span", {
                            class: o.const("dcg-key-command")
                        }, o.const("SHIFT")), o.const("+"), o.createElement("span", {
                            class: o.const("dcg-key-command")
                        }, o.const("6")), o.const(")")), o.createElement("td", {
                            class: o.const("dcg-keyboard-shortcut dcg-os-mac")
                        }, o.createElement("span", {
                            class: o.const("dcg-key-command")
                        }, o.const("^")), o.const("(usually"), o.createElement("span", {
                            class: o.const("dcg-key-command")
                        }, o.const("SHIFT")), o.const("+"), o.createElement("span", {
                            class: o.const("dcg-key-command")
                        }, o.const("6")), o.const(")"))), o.createElement("tr", null, o.createElement("td", null, o.createElement(r.default, {
                            latex: e.const("a_b")
                        })), o.createElement("td", {
                            class: o.const("dcg-keyboard-shortcut dcg-os-windows")
                        }, o.createElement("span", {
                            class: o.const("dcg-key-command")
                        }, o.const("_")), o.const("(usually"), o.createElement("span", {
                            class: o.const("dcg-key-command")
                        }, o.const("SHIFT")), o.const("+"), o.createElement("span", {
                            class: o.const("dcg-key-command")
                        }, o.const("-")), o.const(")")), o.createElement("td", {
                            class: o.const("dcg-keyboard-shortcut dcg-os-mac")
                        }, o.createElement("span", {
                            class: o.const("dcg-key-command")
                        }, o.const("_")), o.const("(usually"), o.createElement("span", {
                            class: o.const("dcg-key-command")
                        }, o.const("SHIFT")), o.const("+"), o.createElement("span", {
                            class: o.const("dcg-key-command")
                        }, o.const("-")), o.const(")"))), o.createElement("tr", null, o.createElement("td", null, o.createElement(r.default, {
                            latex: e.const("\\sqrt{a}")
                        })), o.createElement("td", {
                            class: o.const("dcg-keyboard-shortcut dcg-os-windows")
                        }, o.createElement("span", {
                            class: o.const("dcg-key-command")
                        }, o.const("s")), o.createElement("span", {
                            class: o.const("dcg-key-command")
                        }, o.const("q")), o.createElement("span", {
                            class: o.const("dcg-key-command")
                        }, o.const("r")), o.createElement("span", {
                            class: o.const("dcg-key-command")
                        }, o.const("t"))), o.createElement("td", {
                            class: o.const("dcg-keyboard-shortcut dcg-os-mac")
                        }, o.createElement("span", {
                            class: o.const("dcg-key-command")
                        }, o.const("s")), o.createElement("span", {
                            class: o.const("dcg-key-command")
                        }, o.const("q")), o.createElement("span", {
                            class: o.const("dcg-key-command")
                        }, o.const("r")), o.createElement("span", {
                            class: o.const("dcg-key-command")
                        }, o.const("t")))), o.createElement("tr", null, o.createElement("td", null, o.createElement(r.default, {
                            latex: e.const("\\sqrt[3]{a}")
                        })), o.createElement("td", {
                            class: o.const("dcg-keyboard-shortcut dcg-os-windows")
                        }, o.createElement("span", {
                            class: o.const("dcg-key-command")
                        }, o.const("c")), o.createElement("span", {
                            class: o.const("dcg-key-command")
                        }, o.const("b")), o.createElement("span", {
                            class: o.const("dcg-key-command")
                        }, o.const("r")), o.createElement("span", {
                            class: o.const("dcg-key-command")
                        }, o.const("t"))), o.createElement("td", {
                            class: o.const("dcg-keyboard-shortcut dcg-os-mac")
                        }, o.createElement("span", {
                            class: o.const("dcg-key-command")
                        }, o.const("c")), o.createElement("span", {
                            class: o.const("dcg-key-command")
                        }, o.const("b")), o.createElement("span", {
                            class: o.const("dcg-key-command")
                        }, o.const("r")), o.createElement("span", {
                            class: o.const("dcg-key-command")
                        }, o.const("t")))), o.createElement("tr", null, o.createElement("td", null, o.createElement(r.default, {
                            latex: e.const("\\sqrt[n]{a}")
                        })), o.createElement("td", {
                            class: o.const("dcg-keyboard-shortcut dcg-os-windows")
                        }, o.createElement("span", {
                            class: o.const("dcg-key-command")
                        }, o.const("n")), o.createElement("span", {
                            class: o.const("dcg-key-command")
                        }, o.const("t")), o.createElement("span", {
                            class: o.const("dcg-key-command")
                        }, o.const("h")), o.createElement("span", {
                            class: o.const("dcg-key-command")
                        }, o.const("r")), o.createElement("span", {
                            class: o.const("dcg-key-command")
                        }, o.const("o")), o.createElement("span", {
                            class: o.const("dcg-key-command")
                        }, o.const("o")), o.createElement("span", {
                            class: o.const("dcg-key-command")
                        }, o.const("t"))), o.createElement("td", {
                            class: o.const("dcg-keyboard-shortcut dcg-os-mac")
                        }, o.createElement("span", {
                            class: o.const("dcg-key-command")
                        }, o.const("n")), o.createElement("span", {
                            class: o.const("dcg-key-command")
                        }, o.const("t")), o.createElement("span", {
                            class: o.const("dcg-key-command")
                        }, o.const("h")), o.createElement("span", {
                            class: o.const("dcg-key-command")
                        }, o.const("r")), o.createElement("span", {
                            class: o.const("dcg-key-command")
                        }, o.const("o")), o.createElement("span", {
                            class: o.const("dcg-key-command")
                        }, o.const("o")), o.createElement("span", {
                            class: o.const("dcg-key-command")
                        }, o.const("t")))), o.createElement("tr", null, o.createElement("td", null, o.createElement(r.default, {
                            latex: e.const("\\pi")
                        })), o.createElement("td", {
                            class: o.const("dcg-keyboard-shortcut dcg-os-windows")
                        }, o.createElement("span", {
                            class: o.const("dcg-key-command")
                        }, o.const("p")), o.createElement("span", {
                            class: o.const("dcg-key-command")
                        }, o.const("i"))), o.createElement("td", {
                            class: o.const("dcg-keyboard-shortcut dcg-os-mac")
                        }, o.createElement("span", {
                            class: o.const("dcg-key-command")
                        }, o.const("p")), o.createElement("span", {
                            class: o.const("dcg-key-command")
                        }, o.const("i")))), o.createElement("tr", null, o.createElement("td", null, o.createElement(r.default, {
                            latex: e.const("\\theta")
                        })), o.createElement("td", {
                            class: o.const("dcg-keyboard-shortcut dcg-os-windows")
                        }, o.createElement("span", {
                            class: o.const("dcg-key-command")
                        }, o.const("t")), o.createElement("span", {
                            class: o.const("dcg-key-command")
                        }, o.const("h")), o.createElement("span", {
                            class: o.const("dcg-key-command")
                        }, o.const("e")), o.createElement("span", {
                            class: o.const("dcg-key-command")
                        }, o.const("t")), o.createElement("span", {
                            class: o.const("dcg-key-command")
                        }, o.const("a"))), o.createElement("td", {
                            class: o.const("dcg-keyboard-shortcut dcg-os-mac")
                        }, o.createElement("span", {
                            class: o.const("dcg-key-command")
                        }, o.const("t")), o.createElement("span", {
                            class: o.const("dcg-key-command")
                        }, o.const("h")), o.createElement("span", {
                            class: o.const("dcg-key-command")
                        }, o.const("e")), o.createElement("span", {
                            class: o.const("dcg-key-command")
                        }, o.const("t")), o.createElement("span", {
                            class: o.const("dcg-key-command")
                        }, o.const("a")))))
                    }), o.createElement("h2", {
                        class: o.const("dcg-hotkey-section-header braille-section")
                    }, function() {
                        return e.t("Braille")
                    }), o.createElement("table", null, o.createElement("tr", null, o.createElement("th", null, function() {
                        return e.t("Function")
                    }), o.createElement("th", null, function() {
                        return e.t("Shortcut")
                    })), o.createElement("tr", null, o.createElement("td", null, function() {
                        return e.t("Switch to Nemeth")
                    }), o.createElement("td", {
                        class: o.const("dcg-keyboard-shortcut dcg-os-windows")
                    }, o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("ALT")), o.const("+"), o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("N"))), o.createElement("td", {
                        class: o.const("dcg-keyboard-shortcut dcg-os-mac")
                    }, o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("CTRL")), o.const("+"), o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("N")))), o.createElement("tr", null, o.createElement("td", null, function() {
                        return e.t("Switch to UEB")
                    }), o.createElement("td", {
                        class: o.const("dcg-keyboard-shortcut dcg-os-windows")
                    }, o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("ALT")), o.const("+"), o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("U"))), o.createElement("td", {
                        class: o.const("dcg-keyboard-shortcut dcg-os-mac")
                    }, o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("CTRL")), o.const("+"), o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("U")))), o.createElement("tr", null, o.createElement("td", null, function() {
                        return e.t("Switch to print")
                    }), o.createElement("td", {
                        class: o.const("dcg-keyboard-shortcut dcg-os-windows")
                    }, o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("ALT")), o.const("+"), o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("Q"))), o.createElement("td", {
                        class: o.const("dcg-keyboard-shortcut dcg-os-mac")
                    }, o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("CTRL")), o.const("+"), o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("Q")))), o.createElement("tr", null, o.createElement("td", null, function() {
                        return e.t("Turn Braille Typing On or Off")
                    }), o.createElement("td", {
                        class: o.const("dcg-keyboard-shortcut dcg-os-windows")
                    }, o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("ALT")), o.const("+"), o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("6"))), o.createElement("td", {
                        class: o.const("dcg-keyboard-shortcut dcg-os-mac")
                    }, o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("CTRL")), o.const("+"), o.createElement("span", {
                        class: o.const("dcg-key-command")
                    }, o.const("6")))))))
                }, t.prototype.showSymbols = function() {
                    return !this.props.fourFunction()
                }, t.prototype.getShortcutOS = function() {
                    return this.controller.getKeyboardOS()
                }, t.prototype.didMount = function() {
                    this.updateVisibleShortcuts()
                }, t.prototype.didUpdate = function() {
                    this.updateVisibleShortcuts()
                }, t.prototype.updateVisibleShortcuts = function() {
                    var e = this.getShortcutOS(),
                        t = c(".dcg-os-mac"),
                        n = c(".dcg-os-windows");
                    "mac" == e ? (t.show(), n.hide()) : (t.hide(), n.show())
                }, t
            }(s.default);
        t.default = i
    }), define("practice/keyboard-shortcuts-modal", ["require", "exports", "tslib", "dcgview", "./dcgview-practice", "./graphing-keyboard-shortcuts", "./scientific-keyboard-shortcuts", "loadcss!./modals", "loadcss!./keyboard-shortcuts"], function(e, t, n, o, s, r, c) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var a = o.Components.SwitchUnion,
            i = function(e) {
                function t() {
                    return null !== e && e.apply(this, arguments) || this
                }
                return n.__extends(t, e), t.prototype.t = function(e) {
                    return e
                }, t.prototype.template = function() {
                    var e = this;
                    return o.createElement("div", {
                        class: o.const("dcg-singleappmode-modal-container")
                    }, o.createElement("div", {
                        class: o.const("dcg-singleappmode-modal-background"),
                        onTap: function() {
                            return e.controller.dispatch({
                                type: "close-modal"
                            })
                        }
                    }), o.createElement("i", {
                        class: o.const("dcg-icon-remove"),
                        onTap: function() {
                            return e.controller.dispatch({
                                type: "close-modal"
                            })
                        }
                    }), o.createElement("div", {
                        class: o.const("dcg-singleappmode-modal dcg-keyboard-shortcuts-modal")
                    }, o.createElement("div", {
                        class: o.const("dcg-hotkeys-dialog")
                    }, o.createElement("h1", null, function() {
                        return e.t("Keyboard Shortcuts")
                    }), a(function() {
                        return e.getCalcType()
                    }, {
                        none: function() {
                            return o.createElement("span", null)
                        },
                        graphing: function() {
                            return o.createElement(r.default, {
                                controller: e.props.controller
                            })
                        },
                        scientific: function() {
                            return o.createElement(c.default, {
                                controller: e.props.controller,
                                fourFunction: e.const(!1)
                            })
                        },
                        fourFunction: function() {
                            return o.createElement(c.default, {
                                controller: e.props.controller,
                                fourFunction: e.const(!0)
                            })
                        }
                    }))))
                }, t.prototype.getShortcutOS = function() {
                    return this.controller.getKeyboardOS()
                }, t.prototype.getCalcType = function() {
                    var e = this.controller.getCurrentCalculator();
                    return e || "none"
                }, t
            }(s.default);
        t.default = i
    }), define("loadcss!practice/waiting-for-singleappmode-modal", function() {}), define("practice/waiting-for-singleappmode-modal", ["require", "exports", "tslib", "dcgview", "./dcgview-practice", "loadcss!./waiting-for-singleappmode-modal"], function(e, t, n, o, s) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var r = function(e) {
            function t() {
                return null !== e && e.apply(this, arguments) || this
            }
            return n.__extends(t, e), t.prototype.template = function() {
                var e = this;
                return o.createElement("div", {
                    class: o.const("dcg-waiting-for-singleappmode-container")
                }, o.createElement("div", {
                    class: o.const("dcg-loading-title")
                }, o.const("Attempting to enter Single-App Mode"), o.createElement("span", {
                    class: function() {
                        return 0 === e.numDots() ? "dcg-hidden-dot" : ""
                    }
                }, o.const(".")), o.createElement("span", {
                    class: function() {
                        return e.numDots() <= 1 ? "dcg-hidden-dot" : ""
                    }
                }, o.const(".")), o.createElement("span", {
                    class: function() {
                        return e.numDots() <= 2 ? "dcg-hidden-dot" : ""
                    }
                }, o.const("."))), o.createElement("div", {
                    class: o.const("dcg-loading-message")
                }, o.const('If you get stuck here, you may need to "force restart" your device. E-mail support@desmos.com for help.')), o.createElement("div", {
                    class: o.const("dcg-footer-loading-bar")
                }))
            }, t.prototype.numDots = function() {
                void 0 === this.startTime && (this.startTime = Date.now());
                return Math.floor((Date.now() - this.startTime) / 400) % 4
            }, t
        }(s.default);
        t.default = r
    }), define("loadcss!desmos-practice-icons", function() {}), define("loadcss!practice/main", function() {}), define("practice/main", ["require", "exports", "tslib", "keys", "dcgview", "./dcgview-practice", "./header-view", "./start-practice-modal", "./end-practice-modal", "./help-menu", "./keyboard-shortcuts-modal", "./waiting-for-singleappmode-modal", "underscore", "loadcss!desmos-practice-icons", "loadcss!./main"], function(e, t, n, o, s, r, c, a, i, l, u, d, p) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var m = s.Components,
            f = m.If,
            h = m.SwitchUnion,
            g = window.Desmos,
            y = function(e) {
                function t() {
                    return null !== e && e.apply(this, arguments) || this
                }
                return n.__extends(t, e), t.prototype.template = function() {
                    var e = this;
                    return s.createElement("div", {
                        class: function() {
                            return {
                                "dcg-basic-calc-practice": "fourFunction" == e.controller.getCurrentCalculator() || "scientific" == e.controller.getCurrentCalculator()
                            }
                        },
                        onKeydown: function(t) {
                            o.lookup(t) === o.ESCAPE && "none" !== e.getOpenScreen() && (t.preventDefault(), t.stopPropagation(), e.controller.dispatch({
                                type: "close-modal"
                            }))
                        }
                    }, s.createElement("div", {
                        id: s.const("dcg-header-container")
                    }, s.createElement(c.default, {
                        controller: this.props.controller
                    })), s.createElement("div", {
                        class: s.const("dcg-practice-calculator"),
                        id: s.const("graph-container"),
                        didMount: this.bindFn(this.didMountGraphContainer)
                    }), s.createElement("div", {
                        id: s.const("dcg-modal-container")
                    }, h(function() {
                        return e.getOpenScreen()
                    }, {
                        none: function() {},
                        "end-practice": function() {
                            return s.createElement(i.default, {
                                controller: e.props.controller
                            })
                        },
                        "start-practice": function() {
                            return s.createElement(a.default, {
                                controller: e.props.controller
                            })
                        },
                        "keyboard-shortcuts": function() {
                            return s.createElement(u.default, {
                                controller: e.props.controller
                            })
                        },
                        help: function() {
                            return s.createElement(l.default, {
                                controller: e.props.controller
                            })
                        }
                    })), s.createElement(f, {
                        predicate: function() {
                            return e.controller.shouldShowWaitingForSingleAppMode()
                        }
                    }, function() {
                        return s.createElement(d.default, {
                            controller: e.props.controller
                        })
                    }))
                }, t.prototype.didUpdate = function() {
                    this.syncAPIConfig()
                }, t.prototype.didMountGraphContainer = function(e) {
                    this.graphNode = e, this.syncAPIConfig()
                }, t.prototype.getOpenScreen = function() {
                    return this.controller.getCurrentModal()
                }, t.prototype.syncAPIConfig = function() {
                    var e = this.controller.getCurrentCalculator(),
                        t = this.controller.getCurrentAPIOptions(),
                        n = {
                            type: e,
                            options: t
                        };
                    if (!p.isEqual(n, this.lastConfig)) {
                        if (this.lastConfig = n, this.api && (this.api.destroy(), this.api = void 0), n) switch (e) {
                            case "graphing":
                                this.api = new g.GraphingCalculator(this.graphNode, t);
                                break;
                            case "scientific":
                                this.api = new g.ScientificCalculator(this.graphNode, t);
                                break;
                            case "fourFunction":
                                this.api = new g.FourFunctionCalculator(this.graphNode, t);
                                break;
                            case void 0:
                                break;
                            default:
                                return e
                        }
                        this.api && this.api.focusFirstExpression()
                    }
                }, t
            }(r.default);
        t.default = y
    }),
    function(e, t) {
        "object" == typeof exports && "object" == typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define("flux", [], t) : "object" == typeof exports ? exports.Flux = t() : e.Flux = t()
    }(this, function() {
        return function(e) {
            function t(o) {
                if (n[o]) return n[o].exports;
                var s = n[o] = {
                    exports: {},
                    id: o,
                    loaded: !1
                };
                return e[o].call(s.exports, s, s.exports, t), s.loaded = !0, s.exports
            }
            var n = {};
            return t.m = e, t.c = n, t.p = "", t(0)
        }([function(e, t, n) {
            "use strict";
            e.exports.Dispatcher = n(1)
        }, function(e, t, n) {
            "use strict";

            function o(e, t) {
                if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
            }
            t.__esModule = !0;
            var s = n(2),
                r = function() {
                    function e() {
                        o(this, e), this._callbacks = {}, this._isDispatching = !1, this._isHandled = {}, this._isPending = {}, this._lastID = 1
                    }
                    return e.prototype.register = function(e) {
                        var t = "ID_" + this._lastID++;
                        return this._callbacks[t] = e, t
                    }, e.prototype.unregister = function(e) {
                        this._callbacks[e] || s(!1, "Dispatcher.unregister(...): `%s` does not map to a registered callback.", e), delete this._callbacks[e]
                    }, e.prototype.waitFor = function(e) {
                        this._isDispatching || s(!1, "Dispatcher.waitFor(...): Must be invoked while dispatching.");
                        for (var t = 0; t < e.length; t++) {
                            var n = e[t];
                            this._isPending[n] ? this._isHandled[n] || s(!1, "Dispatcher.waitFor(...): Circular dependency detected while waiting for `%s`.", n) : (this._callbacks[n] || s(!1, "Dispatcher.waitFor(...): `%s` does not map to a registered callback.", n), this._invokeCallback(n))
                        }
                    }, e.prototype.dispatch = function(e) {
                        this._isDispatching && s(!1, "Dispatch.dispatch(...): Cannot dispatch in the middle of a dispatch."), this._startDispatching(e);
                        try {
                            for (var t in this._callbacks) this._isPending[t] || this._invokeCallback(t)
                        } finally {
                            this._stopDispatching()
                        }
                    }, e.prototype.isDispatching = function() {
                        return this._isDispatching
                    }, e.prototype._invokeCallback = function(e) {
                        this._isPending[e] = !0, this._callbacks[e](this._pendingPayload), this._isHandled[e] = !0
                    }, e.prototype._startDispatching = function(e) {
                        for (var t in this._callbacks) this._isPending[t] = !1, this._isHandled[t] = !1;
                        this._pendingPayload = e, this._isDispatching = !0
                    }, e.prototype._stopDispatching = function() {
                        delete this._pendingPayload, this._isDispatching = !1
                    }, e
                }();
            e.exports = r
        }, function(e, t, n) {
            "use strict";

            function o(e, t, n, o, s, r, c, a) {
                if (void 0 === t) throw new Error("invariant requires an error message argument");
                if (!e) {
                    var i;
                    if (void 0 === t) i = new Error("Minified exception occurred; use the non-minified dev environment for the full error message and additional helpful warnings.");
                    else {
                        var l = [n, o, s, r, c, a],
                            u = 0;
                        i = new Error(t.replace(/%s/g, function() {
                            return l[u++]
                        })), i.name = "Invariant Violation"
                    }
                    throw i.framesToPop = 1, i
                }
            }
            e.exports = o
        }])
    }), define("lib/console", ["require", "exports", "console"], function(e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        }), t.log = n.log, t.warn = n.warn
    }), define("lib/i18n", ["require", "exports", "config", "jquery", "underscore", "lib/console"], function(e, t, n, o, s, r) {
        "use strict";

        function c(e, t) {
            f = e || "", h = t || {}
        }

        function a(e) {
            for (var t, n = /(__[^_]+__)/g, o = []; null !== (t = n.exec(e));) o.push({
                index: t.index,
                text: t[0]
            });
            e = e.replace(/[a-z]/gi, "♦");
            for (var s = e.split(""), r = 0; r < o.length; r++)
                for (var c = o[r].index, a = o[r].text, i = 0; i < a.length; i++) s[c + i] = a[i];
            return s.join("")
        }

        function i(e, t, o) {
            var s = void 0 !== o ? o : f,
                r = h[s] && h[s][e] || e || "";
            if (n.get("bare-i18n") && (r = a(r)), t)
                for (var c in t) t.hasOwnProperty(c) && (r = r.split("__" + c + "__").join(t[c]));
            return r
        }

        function l(e) {
            var n = [];
            return s.each(e, function(e) {
                if (e && "string" == typeof e) {
                    var o = e.split("-")[0];
                    n.push(e), n.push(o), s.each(t.enabled_languages, function(e, t) {
                        t.split("-")[0] === o && e.useAsRoot && n.push(t)
                    })
                }
            }), n
        }

        function u() {
            for (var e = l([n.get("lang"), navigator.userLanguage, navigator.language]), o = 0; o < e.length; o++) {
                var r = e[o];
                if (t.enabled_languages.hasOwnProperty(r)) return r;
                if (s.contains(g, r)) return r
            }
            return "en"
        }

        function d() {
            return f
        }

        function p(e) {
            var t = o.Deferred();
            return "undefined" == typeof Desmos ? (t.reject(), t.promise()) : Desmos.supportedLanguages.indexOf(e) >= 0 || "en" === e ? (c(e, Desmos.locales), t.resolve(!0), t.promise()) : (o.get("/api/v1/calculator/language/" + e, function(n) {
                Desmos.locales || (Desmos.locales = {}), Desmos.supportedLanguages || (Desmos.supportedLanguages = []), Desmos.locales[e] = n[e], Desmos.supportedLanguages.push(e), c(e, Desmos.locales), t.resolve(!0)
            }).fail(function(n) {
                404 === n.status && r.warn(e + " is not an available language."), t.reject()
            }), t.promise())
        }

        function m(e, t) {
            if (null === e || void 0 === e) return "";
            if ("string" == typeof e) return e;
            if ("number" == typeof e) return "" + e;
            var n, o = e.vars;
            if (o) {
                n = {};
                for (var s in o) o.hasOwnProperty(s) && (n[s] = m(o[s], t))
            }
            return i(e.msg, n, t)
        }
        Object.defineProperty(t, "__esModule", {
            value: !0
        }), t.locales = function() {
            return "undefined" != typeof Desmos && Desmos.locales ? Desmos.locales : {}
        }();
        var f = "",
            h = {};
        t.enabled_languages = {
            en: {
                displayName: "English (US)",
                userGuideURL: "https://desmos.s3.amazonaws.com/Desmos_User_Guide.pdf",
                useAsRoot: !1
            },
            "en-GB": {
                displayName: "English (GB)",
                userGuideURL: "https://desmos.s3.amazonaws.com/Desmos_User_Guide.pdf",
                useAsRoot: !1
            },
            "es-ES": {
                displayName: "Español (España)",
                userGuideURL: "https://desmos.s3.amazonaws.com/Desmos_User_Guide_ES-ES.pdf",
                useAsRoot: !0
            },
            ru: {
                displayName: "Русский",
                userGuideURL: "https://desmos.s3.amazonaws.com/Desmos_User_Guide_RU.pdf",
                useAsRoot: !1
            },
            da: {
                displayName: "Dansk",
                userGuideURL: "https://desmos.s3.amazonaws.com/Desmos_User_Guide.pdf",
                useAsRoot: !1
            },
            de: {
                displayName: "Deutsch",
                userGuideURL: "https://desmos.s3.amazonaws.com/Desmos_User_Guide_DE.pdf",
                useAsRoot: !1
            },
            "pt-BR": {
                displayName: "Português (Brasil)",
                userGuideURL: "https://desmos.s3.amazonaws.com/Desmos_User_Guide.pdf",
                useAsRoot: !1
            },
            "pt-PT": {
                displayName: "Português (Portugal)",
                userGuideURL: "https://desmos.s3.amazonaws.com/Desmos_User_Guide.pdf",
                useAsRoot: !1
            },
            ca: {
                displayName: "Català",
                userGuideURL: "https://desmos.s3.amazonaws.com/Desmos_User_Guide.pdf",
                useAsRoot: !1
            },
            fr: {
                displayName: "Français",
                userGuideURL: "https://desmos.s3.amazonaws.com/Desmos_User_Guide_FR.pdf",
                useAsRoot: !1
            },
            it: {
                displayName: "Italiano",
                userGuideURL: "https://desmos.s3.amazonaws.com/Desmos_User_Guide_IT.pdf",
                useAsRoot: !1
            },
            is: {
                displayName: "Íslenska",
                userGuideURL: "https://desmos.s3.amazonaws.com/Desmos_User_Guide.pdf",
                useAsRoot: !1
            },
            nl: {
                displayName: "Nederlands",
                userGuideURL: "https://desmos.s3.amazonaws.com/Desmos_User_Guide.pdf",
                useAsRoot: !1
            },
            no: {
                displayName: "Norsk",
                userGuideURL: "https://desmos.s3.amazonaws.com/Desmos_User_Guide.pdf",
                useAsRoot: !1
            },
            "sv-SE": {
                displayName: "Svenska",
                userGuideURL: "https://desmos.s3.amazonaws.com/Desmos_User_Guide.pdf",
                useAsRoot: !1
            },
            hr: {
                displayName: "Hrvatski",
                userGuideURL: "https://desmos.s3.amazonaws.com/Desmos_User_Guide.pdf",
                useAsRoot: !1
            },
            hu: {
                displayName: "Magyar",
                userGuideURL: "https://desmos.s3.amazonaws.com/Desmos_User_Guide.pdf",
                useAsRoot: !1
            },
            cs: {
                displayName: "Čeština",
                userGuideURL: "https://desmos.s3.amazonaws.com/Desmos_User_Guide.pdf",
                useAsRoot: !1
            },
            tr: {
                displayName: "Türkçe",
                userGuideURL: "https://desmos.s3.amazonaws.com/Desmos_User_Guide_TR.pdf",
                useAsRoot: !1
            },
            sl: {
                displayName: "Slovenščina",
                userGuideURL: "https://desmos.s3.amazonaws.com/Desmos_User_Guide_SL.pdf",
                useAsRoot: !1
            },
            lt: {
                displayName: "Lietuvių",
                userGuideURL: "https://desmos.s3.amazonaws.com/Desmos_User_Guide.pdf",
                useAsRoot: !1
            },
            pl: {
                displayName: "Polski",
                userGuideURL: "https://desmos.s3.amazonaws.com/Desmos_User_Guide_PL.pdf",
                useAsRoot: !1
            },
            ro: {
                displayName: "Română",
                userGuideURL: "https://desmos.s3.amazonaws.com/Desmos_User_Guide.pdf",
                useAsRoot: !1
            },
            id: {
                displayName: "Bahasa Indonesia",
                userGuideURL: "https://desmos.s3.amazonaws.com/Desmos_User_Guide.pdf",
                useAsRoot: !1
            },
            vi: {
                displayName: "Tiếng Việt",
                userGuideURL: "https://desmos.s3.amazonaws.com/Desmos_User_Guide_VI.pdf",
                useAsRoot: !1
            },
            el: {
                displayName: "Ελληνικά",
                userGuideURL: "https://desmos.s3.amazonaws.com/Desmos_User_Guide_EL.pdf",
                useAsRoot: !1
            },
            "sr-CS": {
                displayName: "SRPSKI",
                userGuideURL: "https://desmos.s3.amazonaws.com/Desmos_User_Guide.pdf",
                useAsRoot: !1
            },
            bg: {
                displayName: "Български",
                userGuideURL: "https://desmos.s3.amazonaws.com/Desmos_User_Guide_BG.pdf",
                useAsRoot: !1
            },
            mk: {
                displayName: "Македонски",
                userGuideURL: "https://desmos.s3.amazonaws.com/Desmos_User_Guide.pdf",
                useAsRoot: !1
            },
            uk: {
                displayName: "Українська",
                userGuideURL: "https://desmos.s3.amazonaws.com/Desmos_User_Guide.pdf",
                useAsRoot: !1
            },
            ka: {
                displayName: "ქართული",
                userGuideURL: "https://desmos.s3.amazonaws.com/Desmos_User_Guide.pdf",
                useAsRoot: !1
            },
            th: {
                displayName: "ภาษาไทย",
                userGuideURL: "https://desmos.s3.amazonaws.com/Desmos_User_Guide.pdf",
                useAsRoot: !1
            },
            "zh-CN": {
                displayName: "简体中文",
                useAsRoot: !0,
                userGuideURL: "https://desmos.s3.amazonaws.com/Desmos_User_Guide_ZH-CN.pdf"
            },
            "zh-TW": {
                displayName: "繁體中文",
                userGuideURL: "https://desmos.s3.amazonaws.com/Desmos_User_Guide_ZH-TW.pdf",
                useAsRoot: !1
            },
            ko: {
                displayName: "한국어",
                userGuideURL: "https://desmos.s3.amazonaws.com/Desmos_User_Guide.pdf",
                useAsRoot: !1
            },
            ja: {
                displayName: "日本語",
                userGuideURL: "https://desmos.s3.amazonaws.com/Desmos_User_Guide_JA.pdf",
                useAsRoot: !1
            }
        };
        var g = ["sr", "bn", "eu", "he", "hi", "ar", "fi", "kk", "ml-IN", "tr", "fa"];
        t.init = c, t.t = i, t.detectLanguage = u, t.currentLanguage = d, t.fetchLanguage = p, t.unpack = m, c(u(), t.locales)
    }), define("lib/urlparser", ["require", "exports"], function(e, t) {
        "use strict";

        function n(e, t) {
            var n = new RegExp("[?|&]" + t + "=([^&;]+?)(&|#|;|$)"),
                o = n.exec(e);
            return o ? decodeURIComponent(o[1].replace(/\+/g, "%20")) : null
        }

        function o(e, t) {
            return new RegExp("[?|&]" + t + "(=|&|;|$)").test(e)
        }

        function s(e, t, n) {
            if (t !== encodeURIComponent(t)) throw new Error("Programming error: parameter name should be URL-safe without encoding.");
            var o = encodeURIComponent(n);
            return e.length ? e + "&" + t + "=" + o : "?" + t + "=" + o
        }

        function r(e, t, n) {
            var o = new RegExp("([?|&])" + t + "=([^&;]+?)(&|#|;|$)"),
                s = o.exec(e);
            if (!s) return e;
            var r = s[1],
                c = s[2],
                a = "" + r + t + "=" + c,
                i = encodeURIComponent(n),
                l = "" + r + t + "=" + i;
            return e.replace(a, l)
        }

        function c(e, t) {
            var n = new RegExp("([?|&])" + t + "=([^&;]+?)(&|#|;|$)"),
                o = n.exec(e);
            if (!o) return e;
            var s = o[1],
                r = o[2],
                c = "" + s + t + "=" + r,
                a = e.replace(c, "");
            return "&" === a[0] ? a.replace("&", "?") : a
        }

        function a(e, t, n) {
            return o(e, t) ? r(e, t, n) : s(e, t, n)
        }
        Object.defineProperty(t, "__esModule", {
            value: !0
        }), t.getParameter = n, t.hasParameter = o, t.pushParameter = s, t.replaceParameter = r, t.deleteParameter = c, t.setParameter = a
    }), define("analytics/looker-app", ["require", "exports", "tslib", "underscore", "lib/urlparser"], function(e, t, n, o, s) {
        "use strict";

        function r(e, t) {
            l += 1;
            var o = "";
            try {
                o = JSON.stringify({
                    timestamp: Date.now(),
                    seqNum: l,
                    payloadJSON: t,
                    breadcrumbs: u
                })
            } catch (e) {
                o = "<error stringifying>"
            }
            i.push(n.__assign(n.__assign({}, a), {
                eventType: e,
                payloadJSON: o
            })), m(), u.push(e), u.length > c && u.shift()
        }
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var c = 20,
            a = {
                eventType: "eventType",
                pageLoadId: s.getParameter(location.search, "pageLoadId"),
                url: document.location.href,
                source: "webview",
                app: s.getParameter(location.search, "appBundleId"),
                userAgent: navigator.userAgent
            },
            i = [],
            l = 0,
            u = [];
        t.logAppEvent = r;
        var d = !1,
            p = window.XMLHttpRequest,
            m = o.throttle(function() {
                if (!d && 0 != i.length) {
                    var e = i.splice(0, 50);
                    d = !0;
                    var t = new p;
                    t.addEventListener("load", function() {
                        d = !1, m()
                    }), t.open("POST", "https://fsoq1oibef.execute-api.us-east-1.amazonaws.com/prod"), t.setRequestHeader("Content-Type", "application/json;charset=UTF-8"), t.send(JSON.stringify(e))
                }
            }, 1e3, {
                leading: !1
            })
    }), define("practice/constants", ["require", "exports"], function(e, t) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        }), t.DEFAULT_GRAPHING_TITLE = "Graphing—Testing Calculator", t.DEFAULT_SCIENTIFIC_TITLE = "Scientific—Testing Calculator", t.DEFAULT_FOUR_FUNCTION_TITLE = "Four Function—Testing Calculator", t.DEFAULT_GRAPHING_HEADER_COLOR = "#008154", t.DEFAULT_SCIENTIFIC_HEADER_COLOR = "#844CC3", t.DEFAULT_FOUR_FUNCTION_HEADER_COLOR = "#206CB8"
    }), define("practice/controller", ["require", "exports", "lib/app-bridge", "flux", "lib/i18n", "bugsnag", "browser", "./test-configs", "analytics/looker-app", "./constants", "underscore"], function(e, t, n, o, s, r, c, a, i, l, u) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var d = function() {
            function e() {
                var e = this;
                this.language = "en", this.currentModal = "start-practice", this.tentativeConfig = {
                    testId: "default",
                    calculator: "graphing"
                }, this.dispatcher = new o.Dispatcher, this.t = function(t, n) {
                    return s.t(t, n, e.language)
                }, this.dispatch = function(t) {
                    r.leaveBreadcrumb("dispatch", t), e.dispatcher.dispatch(t);
                    for (var n; n = e._queuedCallbacks.shift();) n()
                }, this._queuedCallbacks = [], this.dispatcher = new o.Dispatcher, this.hookUpDispatcher(), this.keyboardOS = c.IS_APPLE ? "mac" : "windows"
            }
            return e.prototype.runAfterDispatch = function(e) {
                this._queuedCallbacks.push(e)
            }, e.prototype.enqueueEvent = function(e) {
                var t = this;
                this.runAfterDispatch(function() {
                    t.onEventEmitted && t.onEventEmitted(e)
                })
            }, e.prototype.hookUpDispatcher = function() {
                var e = this;
                this.dispatcher.register(function(t) {
                    switch (e.enqueueEvent("render"), e.validateTestStatus(), "tick" !== t.type && e.sendLookerEvent("dispatch", t), t.type) {
                        case "tick":
                            break;
                        case "open-modal":
                            e.currentModal = t.modal;
                            break;
                        case "close-modal":
                            e.currentModal = "none";
                            break;
                        case "start-practice":
                            e.startPractice({
                                source: "dropdown",
                                testId: t.testId,
                                calculator: t.calculator
                            });
                            break;
                        case "start-test":
                            if (e.isConfiguredByAppConfig()) return void e.startTest({
                                source: "appConfig",
                                calculator: t.calculator,
                                config: e.readAppConfig()
                            });
                            e.isInSingleAppMode() ? e.startTest({
                                source: "dropdown",
                                testId: t.testId,
                                calculator: t.calculator
                            }) : e.requestVoluntarySingleAppModeOn();
                            break;
                        case "header-done":
                            e.isInPracticeSession() ? e.finalizeCurrentSession() : e.currentModal = "end-practice";
                            break;
                        case "end-practice":
                            e.finalizeCurrentSession();
                            break;
                        case "toggle-help-menu":
                            "help" === e.currentModal ? e.currentModal = "none" : e.currentModal = "help";
                            break;
                        case "close-help-menu":
                            "help" === e.currentModal && (e.currentModal = "none");
                            break;
                        case "request-voluntary-singleapp-mode":
                            e.requestVoluntarySingleAppModeOn();
                            break;
                        case "set-tentative-config":
                            e.tentativeConfig = {
                                testId: t.testId,
                                calculator: t.calculator
                            };
                            break;
                        default:
                            return t
                    }
                    e.isInSession() ? "start-practice" === e.currentModal && (e.currentModal = "none") : e.currentModal = "start-practice", "start-practice" === e.currentModal ? e.isInSession() && (e.currentModal = "none") : "end-practice" === e.currentModal && (e.isInSession() || (e.currentModal = "none")), e.logAnyStateChangesAfterDispatch()
                })
            }, e.prototype.validateTestStatus = function() {
                var e;
                e = this.currentSession && "appConfig" === this.currentSession.settings.source ? this.currentSession.settings.config : void 0;
                var t = this.readAppConfig();
                return u.isEqual(e, t) ? this.currentSession && this.currentSession.startedInSingleAppMode && !this.isInSingleAppMode() ? (this.sendLookerEvent("singleAppModeAborted"), void this.finalizeCurrentSession()) : void(!this.isInSession() && this.isInSingleAppMode() && this.didRequestAppSelfLock() && (this.sendLookerEvent("singleAppModeGranted"), this.startTest({
                    source: "dropdown",
                    testId: this.tentativeConfig.testId,
                    calculator: this.tentativeConfig.calculator
                }))) : (this.sendLookerEvent("appConfigChanged", {
                    before: e,
                    after: t
                }), void this.finalizeCurrentSession())
            }, e.prototype.startPractice = function(e) {
                this.sendLookerEvent(".startPractice()", e), this.currentSession = {
                    startTime: Date.now(),
                    onlyPractice: !0,
                    startedInSingleAppMode: this.isInSingleAppMode(),
                    settings: e
                }
            }, e.prototype.startTest = function(e) {
                this.sendLookerEvent(".startTest()", e), this.currentSession = {
                    startTime: Date.now(),
                    onlyPractice: !1,
                    startedInSingleAppMode: this.isInSingleAppMode(),
                    settings: e
                }
            }, e.prototype.getNameForMDMCalculator = function(e) {
                var t = this.readAppConfig();
                if (!t) return "";
                var n = t.options[e];
                return n && n.title ? n.title : ""
            }, e.prototype.isAllowedMDMCalculator = function(e) {
                var t = this.readAppConfig();
                return !!t && !!t.options[e]
            }, e.prototype.getSoleMDMCalculatorOption = function() {
                var e = this.readAppConfig();
                if (e) {
                    var t = Object.keys(e.options);
                    return 1 === t.length ? t[0] : void 0
                }
            }, e.prototype.finalizeCurrentSession = function() {
                this.sendLookerEvent(".finalizeCurrentSession()"), this.currentSession = void 0, this.requestVoluntarySingleAppModeOff();
                var e = this.readAppConfig();
                if (e)
                    if (this.isConfiguredByAppConfig() && "legacy_app" !== this.getPlatform()) {
                        var t = this.getSoleMDMCalculatorOption();
                        t && this.startTest({
                            source: "appConfig",
                            config: e,
                            calculator: t
                        })
                    } else "legacy_app" === this.getPlatform() && this.startPractice({
                        source: "appConfig",
                        config: e,
                        calculator: "graphing"
                    })
            }, e.prototype.isInSession = function() {
                return !!this.currentSession
            }, e.prototype.isInPracticeSession = function() {
                return !(!this.currentSession || !this.currentSession.onlyPractice)
            }, e.prototype.isInTestSession = function() {
                return !(!this.currentSession || this.currentSession.onlyPractice)
            }, e.prototype.getPlatform = function() {
                var e = window.platform;
                if ("chrome_app" === e) {
                    var t = !1;
                    if (-1 !== document.location.search.indexOf("pretendChromeOS") ? t = !0 : -1 !== navigator.userAgent.indexOf("CrOS") && (t = !0), !1 === t) return "legacy_app"
                }
                return e
            }, e.prototype.isOnlyForPractice = function() {
                return "web_app" === this.getPlatform()
            }, e.prototype.isConfiguredByAppConfig = function() {
                return !!this.readAppConfig()
            }, e.prototype.shouldShowSecureBadge = function() {
                return !!this.getSecuredByMessage()
            }, e.prototype.getSecuredByMessage = function() {
                var e = this.readAppConfig();
                if (e) {
                    var t = e.securedBy;
                    return t || ""
                }
                switch (this.getSingleAppMode()) {
                    case "guided-access":
                        return "Guided Access";
                    case "aac-mode":
                        return "App Self-Lock";
                    case "chrome-kiosk-mode":
                        return "Kiosk Mode"
                }
                return ""
            }, e.prototype.getExitInstructions = function() {
                var e = this.currentSession && this.currentSession.settings;
                if (e && "appConfig" === e.source && e.config.exitInstructions) return e.config.exitInstructions;
                var t = 'If you\'re done, show this screen to your teacher. Press "Continue Session" to return to the calculator.';
                switch (this.getSingleAppMode()) {
                    case "guided-access":
                        t += "\n\nTo exit Guided Access, triple-click the Side or Home button.";
                        break;
                    case "aac-mode":
                        t += "\n\nApp Self-Lock will end when you are done.";
                        break;
                    case "chrome-kiosk-mode":
                        t += "\n\nTo exit Kiosk mode, restart the Chromebook."
                }
                return t
            }, e.prototype.shouldShowStartPracticeButton = function() {
                return "chrome_app" === this.getPlatform() ? !this.isInSingleAppMode() : !this.isConfiguredByAppConfig() && !this.isInSingleAppMode()
            }, e.prototype.shouldShowStartTestButton = function() {
                return "chrome_app" === this.getPlatform() ? this.isInSingleAppMode() : "android" === this.getPlatform() ? !this.isInternetConnected() : "web_app" !== this.getPlatform()
            }, e.prototype.shouldShowDoneButton = function() {
                return "legacy_app" !== this.getPlatform()
            }, e.prototype.shouldShowImDoneButton = function() {
                var e = this.currentSession && this.currentSession.settings;
                if (e && "appConfig" === e.source) return !!e.config.allowImDone;
                switch (this.getSingleAppMode()) {
                    case "none":
                    case "aac-mode":
                        return !0;
                    case "guided-access":
                    case "chrome-kiosk-mode":
                        return !1
                }
                return !0
            }, e.prototype.getKeyboardOS = function() {
                return this.keyboardOS
            }, e.prototype.readAppConfig = function() {
                if ("legacy_app" === this.getPlatform()) return {
                    options: {
                        graphing: {
                            headerColor: "#397dc7"
                        }
                    }
                };
                var e = window.dcg_appconfig;
                if (e) try {
                    var t = JSON.parse(decodeURIComponent(e));
                    if (t.options) return t;
                    return
                } catch (e) {
                    return
                }
            }, e.prototype.isInternetConnected = function() {
                return !!navigator.onLine
            }, e.prototype.shouldShowInternetWarning = function() {
                return "android" === this.getPlatform() && this.isInternetConnected()
            }, e.prototype.shouldShowWaitingForSingleAppMode = function() {
                return "win10_app" === this.getPlatform() && !this.isInSingleAppMode() || "android" !== this.getPlatform() && !(!this.didRequestAppSelfLock() || this.isInSingleAppMode())
            }, e.prototype.isInSingleAppMode = function() {
                return "none" !== this.getSingleAppMode()
            }, e.prototype.getSingleAppMode = function() {
                switch (this.getPlatform()) {
                    case "chrome_app":
                        return document.location.search.indexOf("chromeosKioskMode") >= 0 ? "chrome-kiosk-mode" : "none";
                    case "ios":
                        return window.dcg_aac_active ? this.didRequestAppSelfLock() ? "aac-mode" : "guided-access" : "none";
                    case "android":
                        return this.isInternetConnected() ? "none" : window.dcg_screenpinning_active ? "screen-pinning" : "none";
                    case "win10_app":
                        return window.dcg_takeatest_active ? "take-a-test" : "none";
                    case "web_app":
                        return "none"
                }
                return "none"
            }, e.prototype.didRequestAppSelfLock = function() {
                return !!window.dcg_requested_appselflock
            }, e.prototype.isMobileApp = function() {
                var e = this.getPlatform();
                return "ios" === e || "android" === e
            }, e.prototype.requestVoluntarySingleAppModeOn = function() {
                this.sendLookerEvent(".requestAACOn()"), window.dcg_requested_appselflock = !0, this.isMobileApp() && setTimeout(function() {
                    n.startSingleAppMode()
                }, 0)
            }, e.prototype.requestVoluntarySingleAppModeOff = function() {
                this.sendLookerEvent(".requestAACOff()"), window.dcg_requested_appselflock = !1, this.isMobileApp() && setTimeout(function() {
                    n.endSingleAppMode()
                }, 0)
            }, e.prototype.getCurrentModal = function() {
                return this.currentModal
            }, e.prototype.getPracticeElapsedTime = function() {
                var e = this.currentSession;
                if (!e) return "";
                var t = Date.now() - e.startTime,
                    n = t / 1e3,
                    o = Math.floor(n / 60),
                    s = Math.floor(o / 60);
                o -= 60 * s;
                var r = "";
                return s > 0 ? r += s + " hr " + o + " min" : o + " minute" + (1 !== o ? "s" : "")
            }, e.prototype.getPracticeStartTime = function() {
                var e = this.currentSession;
                return e ? new Date(e.startTime).toLocaleTimeString() : ""
            }, e.prototype.getDefaultTitleForCalculator = function(e) {
                switch (e) {
                    case "fourFunction":
                        return l.DEFAULT_FOUR_FUNCTION_TITLE;
                    case "scientific":
                        return l.DEFAULT_SCIENTIFIC_TITLE;
                    case "graphing":
                        return l.DEFAULT_GRAPHING_TITLE
                }
                return ""
            }, e.prototype.getSelectedAppConfigOption = function() {
                var e = this.getCurrentCalculator();
                if (e) {
                    var t = this.currentSession && this.currentSession.settings;
                    if (t && "appConfig" === t.source) return t.config.options[e]
                }
            }, e.prototype.getCustomBranding = function() {
                var e = this.readAppConfig();
                return e && e.customBranding ? e.customBranding : ""
            }, e.prototype.getCurrentTitle = function() {
                var e = this.getCurrentCalculator();
                if (!e) return "";
                var t = this.getSelectedAppConfigOption();
                if (t && t.title) return t.title;
                var n = this.currentSession && this.currentSession.settings;
                return n && "dropdown" === n.source && "default" !== n.testId ? a.getTestDetails(n.testId).name : this.getDefaultTitleForCalculator(e)
            }, e.prototype.getCurrentCalculator = function() {
                if (this.currentSession) return this.currentSession.settings.calculator
            }, e.prototype.getCurrentAPIOptions = function() {
                var e = this.getSelectedAppConfigOption();
                if (e && e.apiOptions) return e.apiOptions;
                var t = this.getCurrentCalculator();
                if (t && this.currentSession) {
                    var n, o = this.currentSession.settings;
                    return n = "appConfig" === o.source ? "default" : o.testId, a.getTestDetails(n).options[t]
                }
            }, e.prototype.getTentativeConfigTestId = function() {
                return this.tentativeConfig.testId
            }, e.prototype.getTentativeConfigCalculator = function() {
                return this.tentativeConfig.calculator
            }, e.prototype.getHeaderColor = function() {
                var e = this.getSelectedAppConfigOption();
                if (e && e.headerColor) return e.headerColor;
                var t = this.currentSession,
                    n = this.getCurrentCalculator();
                if (!n || !t || t.onlyPractice) return "#333";
                switch (n) {
                    case "fourFunction":
                        return l.DEFAULT_FOUR_FUNCTION_HEADER_COLOR;
                    case "scientific":
                        return l.DEFAULT_SCIENTIFIC_HEADER_COLOR;
                    case "graphing":
                        return l.DEFAULT_GRAPHING_HEADER_COLOR;
                    default:
                        return n
                }
            }, e.prototype.logAnyStateChangesAfterDispatch = function() {
                var e = {};
                this.currentModal !== this._lastModal && (e.modalBefore = this._lastModal, e.modalAfter = this.currentModal, this._lastModal = this.currentModal);
                var t = this.getSingleAppMode();
                t !== this._lastSingleAppMode && (e.singleAppModeBefore = this._lastSingleAppMode, e.singleAppModeAfter = t, this._lastSingleAppMode = t);
                var n = this.shouldShowWaitingForSingleAppMode();
                n !== this._lastShouldShowWaiting && (e.showWaitingBefore = this._lastShouldShowWaiting, e.showWaitingAfter = n, this._lastShouldShowWaiting = n), 0 !== Object.keys(e).length && this.sendLookerEvent("stateChangesAfterDispatch", e)
            }, e.prototype.sendLookerEvent = function(e, t) {
                "ios" === this.getPlatform() && i.logAppEvent(e, t)
            }, e
        }();
        t.default = d
    }), define("loadcss!main", function() {}), define("loadcss!secure", function() {}), define("main/calc_practice", ["require", "exports", "lib/app-bridge", "main/shared-clock-bus", "dcgview", "practice/main", "practice/controller", "loadcss!main", "loadcss!secure"], function(e, t, n, o, s, r, c) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var a = new c.default,
            i = s.mountToNode(r.default, document.getElementById("root"), {
                controller: function() {
                    return a
                }
            });
        a.onEventEmitted = function(e) {
            "render" === e && i.update()
        }, o.subscribe(function() {
            a.dispatch({
                type: "tick"
            })
        }), a.dispatch({
            type: "tick"
        }), window.MainController = a, n.hideLoadingScreen()
    }), define("toplevel/calculator_practice", ["require", "main/calc_practice", "touchtracking"], function(e) {
        e("main/calc_practice"), e("touchtracking").monitor(document.body)
    });