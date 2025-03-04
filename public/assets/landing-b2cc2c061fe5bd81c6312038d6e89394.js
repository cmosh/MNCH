function _init() {
    $.AdminLTE.layout = {
        activate: function() {
            var e = this;
            e.fix(), e.fixSidebar(), $(window, ".wrapper").resize(function() { e.fix(), e.fixSidebar() })
        },
        fix: function() {
            var e = $(".main-header").outerHeight() + $(".main-footer").outerHeight(),
                t = $(window).height(),
                i = $(".sidebar").height();
            if ($("body").hasClass("fixed")) $(".content-wrapper, .right-side").css("min-height", t - $(".main-footer").outerHeight());
            else {
                var s;
                t >= i ? ($(".content-wrapper, .right-side").css("min-height", t - e), s = t - e) : ($(".content-wrapper, .right-side").css("min-height", i), s = i);
                var n = $($.AdminLTE.options.controlSidebarOptions.selector);
                "undefined" != typeof n && n.height() > s && $(".content-wrapper, .right-side").css("min-height", n.height())
            }
        },
        fixSidebar: function() { return $("body").hasClass("fixed") ? ("undefined" == typeof $.fn.slimScroll && console && console.error("Error: the fixed layout requires the slimscroll plugin!"), void($.AdminLTE.options.sidebarSlimScroll && "undefined" != typeof $.fn.slimScroll && ($(".sidebar").slimScroll({ destroy: !0 }).height("auto"), $(".sidebar").slimscroll({ height: $(window).height() - $(".main-header").height() + "px", color: "rgba(0,0,0,0.2)", size: "3px" })))) : void("undefined" != typeof $.fn.slimScroll && $(".sidebar").slimScroll({ destroy: !0 }).height("auto")) }
    }, $.AdminLTE.pushMenu = {
        activate: function(e) {
            var t = $.AdminLTE.options.screenSizes;
            $(e).on("click", function(e) { e.preventDefault(), $(window).width() > t.sm - 1 ? $("body").hasClass("sidebar-collapse") ? $("body").removeClass("sidebar-collapse").trigger("expanded.pushMenu") : $("body").addClass("sidebar-collapse").trigger("collapsed.pushMenu") : $("body").hasClass("sidebar-open") ? $("body").removeClass("sidebar-open").removeClass("sidebar-collapse").trigger("collapsed.pushMenu") : $("body").addClass("sidebar-open").trigger("expanded.pushMenu") }), $(".content-wrapper").click(function() { $(window).width() <= t.sm - 1 && $("body").hasClass("sidebar-open") && $("body").removeClass("sidebar-open") }), ($.AdminLTE.options.sidebarExpandOnHover || $("body").hasClass("fixed") && $("body").hasClass("sidebar-mini")) && this.expandOnHover()
        },
        expandOnHover: function() {
            var e = this,
                t = $.AdminLTE.options.screenSizes.sm - 1;
            $(".main-sidebar").hover(function() { $("body").hasClass("sidebar-mini") && $("body").hasClass("sidebar-collapse") && $(window).width() > t && e.expand() }, function() { $("body").hasClass("sidebar-mini") && $("body").hasClass("sidebar-expanded-on-hover") && $(window).width() > t && e.collapse() })
        },
        expand: function() { $("body").removeClass("sidebar-collapse").addClass("sidebar-expanded-on-hover") },
        collapse: function() { $("body").hasClass("sidebar-expanded-on-hover") && $("body").removeClass("sidebar-expanded-on-hover").addClass("sidebar-collapse") }
    }, $.AdminLTE.tree = function(e) {
        var t = this,
            i = $.AdminLTE.options.animationSpeed;
        $("li a", $(e)).on("click", function(e) {
            var s = $(this),
                n = s.next();
            if (n.is(".treeview-menu") && n.is(":visible")) n.slideUp(i, function() { n.removeClass("menu-open") }), n.parent("li").removeClass("active");
            else if (n.is(".treeview-menu") && !n.is(":visible")) {
                var o = s.parents("ul").first(),
                    r = o.find("ul:visible").slideUp(i);
                r.removeClass("menu-open");
                var a = s.parent("li");
                n.slideDown(i, function() { n.addClass("menu-open"), o.find("li.active").removeClass("active"), a.addClass("active"), t.layout.fix() })
            }
            n.is(".treeview-menu") && e.preventDefault()
        })
    }, $.AdminLTE.controlSidebar = {
        activate: function() {
            var e = this,
                t = $.AdminLTE.options.controlSidebarOptions,
                i = $(t.selector),
                s = $(t.toggleBtnSelector);
            s.on("click", function(s) { s.preventDefault(), i.hasClass("control-sidebar-open") || $("body").hasClass("control-sidebar-open") ? e.close(i, t.slide) : e.open(i, t.slide) });
            var n = $(".control-sidebar-bg");
            e._fix(n), $("body").hasClass("fixed") ? e._fixForFixed(i) : $(".content-wrapper, .right-side").height() < i.height() && e._fixForContent(i)
        },
        open: function(e, t) { t ? e.addClass("control-sidebar-open") : $("body").addClass("control-sidebar-open") },
        close: function(e, t) { t ? e.removeClass("control-sidebar-open") : $("body").removeClass("control-sidebar-open") },
        _fix: function(e) {
            var t = this;
            $("body").hasClass("layout-boxed") ? (e.css("position", "absolute"), e.height($(".wrapper").height()), $(window).resize(function() { t._fix(e) })) : e.css({ position: "fixed", height: "auto" })
        },
        _fixForFixed: function(e) { e.css({ position: "fixed", "max-height": "100%", overflow: "auto", "padding-bottom": "50px" }) },
        _fixForContent: function(e) { $(".content-wrapper, .right-side").css("min-height", e.height()) }
    }, $.AdminLTE.boxWidget = {
        selectors: $.AdminLTE.options.boxWidgetOptions.boxWidgetSelectors,
        icons: $.AdminLTE.options.boxWidgetOptions.boxWidgetIcons,
        animationSpeed: $.AdminLTE.options.animationSpeed,
        activate: function(e) {
            var t = this;
            e || (e = document), $(e).find(t.selectors.collapse).on("click", function(e) { e.preventDefault(), t.collapse($(this)) }), $(e).find(t.selectors.remove).on("click", function(e) { e.preventDefault(), t.remove($(this)) })
        },
        collapse: function(e) {
            var t = this,
                i = e.parents(".box").first(),
                s = i.find("> .box-body, > .box-footer, > form  >.box-body, > form > .box-footer");
            i.hasClass("collapsed-box") ? (e.children(":first").removeClass(t.icons.open).addClass(t.icons.collapse), s.slideDown(t.animationSpeed, function() { i.removeClass("collapsed-box") })) : (e.children(":first").removeClass(t.icons.collapse).addClass(t.icons.open), s.slideUp(t.animationSpeed, function() { i.addClass("collapsed-box") }))
        },
        remove: function(e) {
            var t = e.parents(".box").first();
            t.slideUp(this.animationSpeed)
        }
    }
}

function getVersion() {
    var e = window.location.pathname.split("/"),
        t = e.length - 1,
        s = e.length - 2,
        n = "",
        o = "";
    for (i = 0; i < e.length; i++)
        if (n = e[i], console.log("pathPart: " + n + " index: " + i + " seclast : " + e[s]), i == t && "analytics" == e[s]) {
            switch (n) {
                case "CHV1":
                case "CHV2":
                    console.log(e[t]), refs = [], proto = window.location.protocol, hloc = window.location.host, refs[0] = proto + "//" + hloc + "/analytics/CHV1", refs[1] = proto + "//" + hloc + "/analytics/CHV2", o = "<a  href='" + refs[0] + "'>Version' 1 : 2012-2013 </a>", o += "<a  href='" + refs[1] + "'>Version 2 : 2014 - Present</a>", o += "<a href='#'>All</a>";
                    break;
                case "MNHV1":
                case "MNHV2":
                    console.log(e[t]), refs = [], proto = window.location.protocol, hloc = window.location.host, refs[0] = proto + "//" + hloc + "/analytics/MNHV1", refs[1] = proto + "//" + hloc + "/analytics/MNHV2", o = "<a  href='" + refs[0] + "'>Version' 1 : 2012-2013 </a>", o += "<a  href='" + refs[1] + "'>Version 2 : 2014 - Present</a>", o += "<a href='#'>All</a>";
                    break;
                case "IMCIV1":
                    console.log(e[t]), proto = window.location.protocol, hloc = window.location.host, refs = proto + "//" + hloc + "/analytics/IMCIV1", o = "<a  href='" + refs + "'>Version' 1 </a>";
                default:
                    console.log(e[t]), o = "no versions"
            }
            $("#verLinks").html(o)
        } else i == t && "rawdata" == e[t] || "login" == e[t] || "register" == e[t] ? ($("#verDrop").attr("hidden", "true"), console.log(e[t])) : i == t && console.log(e[t])
}
if (! function(e, t) { "object" == typeof module && "object" == typeof module.exports ? module.exports = e.document ? t(e, !0) : function(e) { if (!e.document) throw new Error("jQuery requires a window with a document"); return t(e) } : t(e) }("undefined" != typeof window ? window : this, function(e, t) {
        function i(e) {
            var t = "length" in e && e.length,
                i = Z.type(e);
            return "function" === i || Z.isWindow(e) ? !1 : 1 === e.nodeType && t ? !0 : "array" === i || 0 === t || "number" == typeof t && t > 0 && t - 1 in e
        }

        function s(e, t, i) {
            if (Z.isFunction(t)) return Z.grep(e, function(e, s) { return !!t.call(e, s, e) !== i });
            if (t.nodeType) return Z.grep(e, function(e) { return e === t !== i });
            if ("string" == typeof t) {
                if (ae.test(t)) return Z.filter(t, e, i);
                t = Z.filter(t, e)
            }
            return Z.grep(e, function(e) { return V.call(t, e) >= 0 !== i })
        }

        function n(e, t) {
            for (;
                (e = e[t]) && 1 !== e.nodeType;);
            return e
        }

        function o(e) { var t = fe[e] = {}; return Z.each(e.match(pe) || [], function(e, i) { t[i] = !0 }), t }

        function r() { Q.removeEventListener("DOMContentLoaded", r, !1), e.removeEventListener("load", r, !1), Z.ready() }

        function a() { Object.defineProperty(this.cache = {}, 0, { get: function() { return {} } }), this.expando = Z.expando + a.uid++ }

        function l(e, t, i) {
            var s;
            if (void 0 === i && 1 === e.nodeType)
                if (s = "data-" + t.replace(xe, "-$1").toLowerCase(), i = e.getAttribute(s), "string" == typeof i) {
                    try { i = "true" === i ? !0 : "false" === i ? !1 : "null" === i ? null : +i + "" === i ? +i : ye.test(i) ? Z.parseJSON(i) : i } catch (n) {}
                    be.set(e, t, i)
                } else i = void 0;
            return i
        }

        function h() { return !0 }

        function c() { return !1 }

        function u() { try { return Q.activeElement } catch (e) {} }

        function d(e, t) { return Z.nodeName(e, "table") && Z.nodeName(11 !== t.nodeType ? t : t.firstChild, "tr") ? e.getElementsByTagName("tbody")[0] || e.appendChild(e.ownerDocument.createElement("tbody")) : e }

        function p(e) { return e.type = (null !== e.getAttribute("type")) + "/" + e.type, e }

        function f(e) { var t = Oe.exec(e.type); return t ? e.type = t[1] : e.removeAttribute("type"), e }

        function m(e, t) { for (var i = 0, s = e.length; s > i; i++) ve.set(e[i], "globalEval", !t || ve.get(t[i], "globalEval")) }

        function g(e, t) {
            var i, s, n, o, r, a, l, h;
            if (1 === t.nodeType) {
                if (ve.hasData(e) && (o = ve.access(e), r = ve.set(t, o), h = o.events)) {
                    delete r.handle, r.events = {};
                    for (n in h)
                        for (i = 0, s = h[n].length; s > i; i++) Z.event.add(t, n, h[n][i])
                }
                be.hasData(e) && (a = be.access(e), l = Z.extend({}, a), be.set(t, l))
            }
        }

        function v(e, t) { var i = e.getElementsByTagName ? e.getElementsByTagName(t || "*") : e.querySelectorAll ? e.querySelectorAll(t || "*") : []; return void 0 === t || t && Z.nodeName(e, t) ? Z.merge([e], i) : i }

        function b(e, t) { var i = t.nodeName.toLowerCase(); "input" === i && Ie.test(e.type) ? t.checked = e.checked : ("input" === i || "textarea" === i) && (t.defaultValue = e.defaultValue) }

        function y(t, i) {
            var s, n = Z(i.createElement(t)).appendTo(i.body),
                o = e.getDefaultComputedStyle && (s = e.getDefaultComputedStyle(n[0])) ? s.display : Z.css(n[0], "display");
            return n.detach(), o
        }

        function x(e) {
            var t = Q,
                i = Le[e];
            return i || (i = y(e, t), "none" !== i && i || (ze = (ze || Z("<iframe frameborder='0' width='0' height='0'/>")).appendTo(t.documentElement), t = ze[0].contentDocument, t.write(), t.close(), i = y(e, t), ze.detach()), Le[e] = i), i
        }

        function w(e, t, i) { var s, n, o, r, a = e.style; return i = i || Re(e), i && (r = i.getPropertyValue(t) || i[t]), i && ("" !== r || Z.contains(e.ownerDocument, e) || (r = Z.style(e, t)), We.test(r) && Be.test(t) && (s = a.width, n = a.minWidth, o = a.maxWidth, a.minWidth = a.maxWidth = a.width = r, r = i.width, a.width = s, a.minWidth = n, a.maxWidth = o)), void 0 !== r ? r + "" : r }

        function _(e, t) { return { get: function() { return e() ? void delete this.get : (this.get = t).apply(this, arguments) } } }

        function C(e, t) {
            if (t in e) return t;
            for (var i = t[0].toUpperCase() + t.slice(1), s = t, n = Xe.length; n--;)
                if (t = Xe[n] + i, t in e) return t;
            return s
        }

        function I(e, t, i) { var s = Ue.exec(t); return s ? Math.max(0, s[1] - (i || 0)) + (s[2] || "px") : t }

        function T(e, t, i, s, n) { for (var o = i === (s ? "border" : "content") ? 4 : "width" === t ? 1 : 0, r = 0; 4 > o; o += 2) "margin" === i && (r += Z.css(e, i + _e[o], !0, n)), s ? ("content" === i && (r -= Z.css(e, "padding" + _e[o], !0, n)), "margin" !== i && (r -= Z.css(e, "border" + _e[o] + "Width", !0, n))) : (r += Z.css(e, "padding" + _e[o], !0, n), "padding" !== i && (r += Z.css(e, "border" + _e[o] + "Width", !0, n))); return r }

        function k(e, t, i) {
            var s = !0,
                n = "width" === t ? e.offsetWidth : e.offsetHeight,
                o = Re(e),
                r = "border-box" === Z.css(e, "boxSizing", !1, o);
            if (0 >= n || null == n) {
                if (n = w(e, t, o), (0 > n || null == n) && (n = e.style[t]), We.test(n)) return n;
                s = r && (G.boxSizingReliable() || n === e.style[t]), n = parseFloat(n) || 0
            }
            return n + T(e, t, i || (r ? "border" : "content"), s, o) + "px"
        }

        function S(e, t) { for (var i, s, n, o = [], r = 0, a = e.length; a > r; r++) s = e[r], s.style && (o[r] = ve.get(s, "olddisplay"), i = s.style.display, t ? (o[r] || "none" !== i || (s.style.display = ""), "" === s.style.display && Ce(s) && (o[r] = ve.access(s, "olddisplay", x(s.nodeName)))) : (n = Ce(s), "none" === i && n || ve.set(s, "olddisplay", n ? i : Z.css(s, "display")))); for (r = 0; a > r; r++) s = e[r], s.style && (t && "none" !== s.style.display && "" !== s.style.display || (s.style.display = t ? o[r] || "" : "none")); return e }

        function D(e, t, i, s, n) { return new D.prototype.init(e, t, i, s, n) }

        function P() { return setTimeout(function() { Ge = void 0 }), Ge = Z.now() }

        function j(e, t) {
            var i, s = 0,
                n = { height: e };
            for (t = t ? 1 : 0; 4 > s; s += 2 - t) i = _e[s], n["margin" + i] = n["padding" + i] = e;
            return t && (n.opacity = n.width = e), n
        }

        function E(e, t, i) {
            for (var s, n = (it[t] || []).concat(it["*"]), o = 0, r = n.length; r > o; o++)
                if (s = n[o].call(i, t, e)) return s
        }

        function q(e, t, i) {
            var s, n, o, r, a, l, h, c, u = this,
                d = {},
                p = e.style,
                f = e.nodeType && Ce(e),
                m = ve.get(e, "fxshow");
            i.queue || (a = Z._queueHooks(e, "fx"), null == a.unqueued && (a.unqueued = 0, l = a.empty.fire, a.empty.fire = function() { a.unqueued || l() }), a.unqueued++, u.always(function() { u.always(function() { a.unqueued--, Z.queue(e, "fx").length || a.empty.fire() }) })), 1 === e.nodeType && ("height" in t || "width" in t) && (i.overflow = [p.overflow, p.overflowX, p.overflowY], h = Z.css(e, "display"), c = "none" === h ? ve.get(e, "olddisplay") || x(e.nodeName) : h, "inline" === c && "none" === Z.css(e, "float") && (p.display = "inline-block")), i.overflow && (p.overflow = "hidden", u.always(function() { p.overflow = i.overflow[0], p.overflowX = i.overflow[1], p.overflowY = i.overflow[2] }));
            for (s in t)
                if (n = t[s], Je.exec(n)) {
                    if (delete t[s], o = o || "toggle" === n, n === (f ? "hide" : "show")) {
                        if ("show" !== n || !m || void 0 === m[s]) continue;
                        f = !0
                    }
                    d[s] = m && m[s] || Z.style(e, s)
                } else h = void 0;
            if (Z.isEmptyObject(d)) "inline" === ("none" === h ? x(e.nodeName) : h) && (p.display = h);
            else {
                m ? "hidden" in m && (f = m.hidden) : m = ve.access(e, "fxshow", {}), o && (m.hidden = !f), f ? Z(e).show() : u.done(function() { Z(e).hide() }), u.done(function() {
                    var t;
                    ve.remove(e, "fxshow");
                    for (t in d) Z.style(e, t, d[t])
                });
                for (s in d) r = E(f ? m[s] : 0, s, u), s in m || (m[s] = r.start, f && (r.end = r.start, r.start = "width" === s || "height" === s ? 1 : 0))
            }
        }

        function A(e, t) {
            var i, s, n, o, r;
            for (i in e)
                if (s = Z.camelCase(i), n = t[s], o = e[i], Z.isArray(o) && (n = o[1], o = e[i] = o[0]), i !== s && (e[s] = o, delete e[i]), r = Z.cssHooks[s], r && "expand" in r) { o = r.expand(o), delete e[s]; for (i in o) i in e || (e[i] = o[i], t[i] = n) } else t[s] = n
        }

        function M(e, t, i) {
            var s, n, o = 0,
                r = tt.length,
                a = Z.Deferred().always(function() { delete l.elem }),
                l = function() { if (n) return !1; for (var t = Ge || P(), i = Math.max(0, h.startTime + h.duration - t), s = i / h.duration || 0, o = 1 - s, r = 0, l = h.tweens.length; l > r; r++) h.tweens[r].run(o); return a.notifyWith(e, [h, o, i]), 1 > o && l ? i : (a.resolveWith(e, [h]), !1) },
                h = a.promise({
                    elem: e,
                    props: Z.extend({}, t),
                    opts: Z.extend(!0, { specialEasing: {} }, i),
                    originalProperties: t,
                    originalOptions: i,
                    startTime: Ge || P(),
                    duration: i.duration,
                    tweens: [],
                    createTween: function(t, i) { var s = Z.Tween(e, h.opts, t, i, h.opts.specialEasing[t] || h.opts.easing); return h.tweens.push(s), s },
                    stop: function(t) {
                        var i = 0,
                            s = t ? h.tweens.length : 0;
                        if (n) return this;
                        for (n = !0; s > i; i++) h.tweens[i].run(1);
                        return t ? a.resolveWith(e, [h, t]) : a.rejectWith(e, [h, t]), this
                    }
                }),
                c = h.props;
            for (A(c, h.opts.specialEasing); r > o; o++)
                if (s = tt[o].call(h, e, c, h.opts)) return s;
            return Z.map(c, E, h), Z.isFunction(h.opts.start) && h.opts.start.call(e, h), Z.fx.timer(Z.extend(l, { elem: e, anim: h, queue: h.opts.queue })), h.progress(h.opts.progress).done(h.opts.done, h.opts.complete).fail(h.opts.fail).always(h.opts.always)
        }

        function H(e) {
            return function(t, i) {
                "string" != typeof t && (i = t, t = "*");
                var s, n = 0,
                    o = t.toLowerCase().match(pe) || [];
                if (Z.isFunction(i))
                    for (; s = o[n++];) "+" === s[0] ? (s = s.slice(1) || "*", (e[s] = e[s] || []).unshift(i)) : (e[s] = e[s] || []).push(i)
            }
        }

        function O(e, t, i, s) {
            function n(a) { var l; return o[a] = !0, Z.each(e[a] || [], function(e, a) { var h = a(t, i, s); return "string" != typeof h || r || o[h] ? r ? !(l = h) : void 0 : (t.dataTypes.unshift(h), n(h), !1) }), l }
            var o = {},
                r = e === yt;
            return n(t.dataTypes[0]) || !o["*"] && n("*")
        }

        function N(e, t) { var i, s, n = Z.ajaxSettings.flatOptions || {}; for (i in t) void 0 !== t[i] && ((n[i] ? e : s || (s = {}))[i] = t[i]); return s && Z.extend(!0, e, s), e }

        function $(e, t, i) {
            for (var s, n, o, r, a = e.contents, l = e.dataTypes;
                "*" === l[0];) l.shift(), void 0 === s && (s = e.mimeType || t.getResponseHeader("Content-Type"));
            if (s)
                for (n in a)
                    if (a[n] && a[n].test(s)) { l.unshift(n); break }
            if (l[0] in i) o = l[0];
            else {
                for (n in i) {
                    if (!l[0] || e.converters[n + " " + l[0]]) { o = n; break }
                    r || (r = n)
                }
                o = o || r
            }
            return o ? (o !== l[0] && l.unshift(o), i[o]) : void 0
        }

        function z(e, t, i, s) {
            var n, o, r, a, l, h = {},
                c = e.dataTypes.slice();
            if (c[1])
                for (r in e.converters) h[r.toLowerCase()] = e.converters[r];
            for (o = c.shift(); o;)
                if (e.responseFields[o] && (i[e.responseFields[o]] = t), !l && s && e.dataFilter && (t = e.dataFilter(t, e.dataType)), l = o, o = c.shift())
                    if ("*" === o) o = l;
                    else if ("*" !== l && l !== o) {
                if (r = h[l + " " + o] || h["* " + o], !r)
                    for (n in h)
                        if (a = n.split(" "), a[1] === o && (r = h[l + " " + a[0]] || h["* " + a[0]])) { r === !0 ? r = h[n] : h[n] !== !0 && (o = a[0], c.unshift(a[1])); break }
                if (r !== !0)
                    if (r && e["throws"]) t = r(t);
                    else try { t = r(t) } catch (u) { return { state: "parsererror", error: r ? u : "No conversion from " + l + " to " + o } }
            }
            return { state: "success", data: t }
        }

        function L(e, t, i, s) {
            var n;
            if (Z.isArray(t)) Z.each(t, function(t, n) { i || It.test(e) ? s(e, n) : L(e + "[" + ("object" == typeof n ? t : "") + "]", n, i, s) });
            else if (i || "object" !== Z.type(t)) s(e, t);
            else
                for (n in t) L(e + "[" + n + "]", t[n], i, s)
        }

        function B(e) { return Z.isWindow(e) ? e : 9 === e.nodeType && e.defaultView }
        var W = [],
            R = W.slice,
            F = W.concat,
            U = W.push,
            V = W.indexOf,
            Y = {},
            K = Y.toString,
            X = Y.hasOwnProperty,
            G = {},
            Q = e.document,
            J = "2.1.4",
            Z = function(e, t) { return new Z.fn.init(e, t) },
            ee = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,
            te = /^-ms-/,
            ie = /-([\da-z])/gi,
            se = function(e, t) { return t.toUpperCase() };
        Z.fn = Z.prototype = {
            jquery: J,
            constructor: Z,
            selector: "",
            length: 0,
            toArray: function() { return R.call(this) },
            get: function(e) { return null != e ? 0 > e ? this[e + this.length] : this[e] : R.call(this) },
            pushStack: function(e) { var t = Z.merge(this.constructor(), e); return t.prevObject = this, t.context = this.context, t },
            each: function(e, t) { return Z.each(this, e, t) },
            map: function(e) { return this.pushStack(Z.map(this, function(t, i) { return e.call(t, i, t) })) },
            slice: function() { return this.pushStack(R.apply(this, arguments)) },
            first: function() { return this.eq(0) },
            last: function() { return this.eq(-1) },
            eq: function(e) {
                var t = this.length,
                    i = +e + (0 > e ? t : 0);
                return this.pushStack(i >= 0 && t > i ? [this[i]] : [])
            },
            end: function() { return this.prevObject || this.constructor(null) },
            push: U,
            sort: W.sort,
            splice: W.splice
        }, Z.extend = Z.fn.extend = function() {
            var e, t, i, s, n, o, r = arguments[0] || {},
                a = 1,
                l = arguments.length,
                h = !1;
            for ("boolean" == typeof r && (h = r, r = arguments[a] || {}, a++), "object" == typeof r || Z.isFunction(r) || (r = {}), a === l && (r = this, a--); l > a; a++)
                if (null != (e = arguments[a]))
                    for (t in e) i = r[t], s = e[t], r !== s && (h && s && (Z.isPlainObject(s) || (n = Z.isArray(s))) ? (n ? (n = !1, o = i && Z.isArray(i) ? i : []) : o = i && Z.isPlainObject(i) ? i : {}, r[t] = Z.extend(h, o, s)) : void 0 !== s && (r[t] = s));
            return r
        }, Z.extend({
            expando: "jQuery" + (J + Math.random()).replace(/\D/g, ""),
            isReady: !0,
            error: function(e) { throw new Error(e) },
            noop: function() {},
            isFunction: function(e) { return "function" === Z.type(e) },
            isArray: Array.isArray,
            isWindow: function(e) { return null != e && e === e.window },
            isNumeric: function(e) { return !Z.isArray(e) && e - parseFloat(e) + 1 >= 0 },
            isPlainObject: function(e) { return "object" !== Z.type(e) || e.nodeType || Z.isWindow(e) ? !1 : e.constructor && !X.call(e.constructor.prototype, "isPrototypeOf") ? !1 : !0 },
            isEmptyObject: function(e) { var t; for (t in e) return !1; return !0 },
            type: function(e) { return null == e ? e + "" : "object" == typeof e || "function" == typeof e ? Y[K.call(e)] || "object" : typeof e },
            globalEval: function(e) {
                var t, i = eval;
                e = Z.trim(e), e && (1 === e.indexOf("use strict") ? (t = Q.createElement("script"), t.text = e, Q.head.appendChild(t).parentNode.removeChild(t)) : i(e))
            },
            camelCase: function(e) { return e.replace(te, "ms-").replace(ie, se) },
            nodeName: function(e, t) { return e.nodeName && e.nodeName.toLowerCase() === t.toLowerCase() },
            each: function(e, t, s) {
                var n, o = 0,
                    r = e.length,
                    a = i(e);
                if (s) {
                    if (a)
                        for (; r > o && (n = t.apply(e[o], s), n !== !1); o++);
                    else
                        for (o in e)
                            if (n = t.apply(e[o], s), n === !1) break
                } else if (a)
                    for (; r > o && (n = t.call(e[o], o, e[o]), n !== !1); o++);
                else
                    for (o in e)
                        if (n = t.call(e[o], o, e[o]), n === !1) break; return e
            },
            trim: function(e) { return null == e ? "" : (e + "").replace(ee, "") },
            makeArray: function(e, t) { var s = t || []; return null != e && (i(Object(e)) ? Z.merge(s, "string" == typeof e ? [e] : e) : U.call(s, e)), s },
            inArray: function(e, t, i) { return null == t ? -1 : V.call(t, e, i) },
            merge: function(e, t) { for (var i = +t.length, s = 0, n = e.length; i > s; s++) e[n++] = t[s]; return e.length = n, e },
            grep: function(e, t, i) { for (var s, n = [], o = 0, r = e.length, a = !i; r > o; o++) s = !t(e[o], o), s !== a && n.push(e[o]); return n },
            map: function(e, t, s) {
                var n, o = 0,
                    r = e.length,
                    a = i(e),
                    l = [];
                if (a)
                    for (; r > o; o++) n = t(e[o], o, s), null != n && l.push(n);
                else
                    for (o in e) n = t(e[o], o, s), null != n && l.push(n);
                return F.apply([], l)
            },
            guid: 1,
            proxy: function(e, t) { var i, s, n; return "string" == typeof t && (i = e[t], t = e, e = i), Z.isFunction(e) ? (s = R.call(arguments, 2), n = function() { return e.apply(t || this, s.concat(R.call(arguments))) }, n.guid = e.guid = e.guid || Z.guid++, n) : void 0 },
            now: Date.now,
            support: G
        }), Z.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function(e, t) { Y["[object " + t + "]"] = t.toLowerCase() });
        var ne = function(e) {
            function t(e, t, i, s) {
                var n, o, r, a, l, h, u, p, f, m;
                if ((t ? t.ownerDocument || t : L) !== q && E(t), t = t || q, i = i || [], a = t.nodeType, "string" != typeof e || !e || 1 !== a && 9 !== a && 11 !== a) return i;
                if (!s && M) {
                    if (11 !== a && (n = be.exec(e)))
                        if (r = n[1]) { if (9 === a) { if (o = t.getElementById(r), !o || !o.parentNode) return i; if (o.id === r) return i.push(o), i } else if (t.ownerDocument && (o = t.ownerDocument.getElementById(r)) && $(t, o) && o.id === r) return i.push(o), i } else { if (n[2]) return J.apply(i, t.getElementsByTagName(e)), i; if ((r = n[3]) && w.getElementsByClassName) return J.apply(i, t.getElementsByClassName(r)), i }
                    if (w.qsa && (!H || !H.test(e))) {
                        if (p = u = z, f = t, m = 1 !== a && e, 1 === a && "object" !== t.nodeName.toLowerCase()) {
                            for (h = T(e), (u = t.getAttribute("id")) ? p = u.replace(xe, "\\$&") : t.setAttribute("id", p), p = "[id='" + p + "'] ", l = h.length; l--;) h[l] = p + d(h[l]);
                            f = ye.test(e) && c(t.parentNode) || t, m = h.join(",")
                        }
                        if (m) try { return J.apply(i, f.querySelectorAll(m)), i } catch (g) {} finally { u || t.removeAttribute("id") }
                    }
                }
                return S(e.replace(le, "$1"), t, i, s)
            }

            function i() {
                function e(i, s) { return t.push(i + " ") > _.cacheLength && delete e[t.shift()], e[i + " "] = s }
                var t = [];
                return e
            }

            function s(e) { return e[z] = !0, e }

            function n(e) { var t = q.createElement("div"); try { return !!e(t) } catch (i) { return !1 } finally { t.parentNode && t.parentNode.removeChild(t), t = null } }

            function o(e, t) { for (var i = e.split("|"), s = e.length; s--;) _.attrHandle[i[s]] = t }

            function r(e, t) {
                var i = t && e,
                    s = i && 1 === e.nodeType && 1 === t.nodeType && (~t.sourceIndex || Y) - (~e.sourceIndex || Y);
                if (s) return s;
                if (i)
                    for (; i = i.nextSibling;)
                        if (i === t) return -1;
                return e ? 1 : -1
            }

            function a(e) { return function(t) { var i = t.nodeName.toLowerCase(); return "input" === i && t.type === e } }

            function l(e) { return function(t) { var i = t.nodeName.toLowerCase(); return ("input" === i || "button" === i) && t.type === e } }

            function h(e) { return s(function(t) { return t = +t, s(function(i, s) { for (var n, o = e([], i.length, t), r = o.length; r--;) i[n = o[r]] && (i[n] = !(s[n] = i[n])) }) }) }

            function c(e) { return e && "undefined" != typeof e.getElementsByTagName && e }

            function u() {}

            function d(e) { for (var t = 0, i = e.length, s = ""; i > t; t++) s += e[t].value; return s }

            function p(e, t, i) {
                var s = t.dir,
                    n = i && "parentNode" === s,
                    o = W++;
                return t.first ? function(t, i, o) {
                    for (; t = t[s];)
                        if (1 === t.nodeType || n) return e(t, i, o)
                } : function(t, i, r) {
                    var a, l, h = [B, o];
                    if (r) {
                        for (; t = t[s];)
                            if ((1 === t.nodeType || n) && e(t, i, r)) return !0
                    } else
                        for (; t = t[s];)
                            if (1 === t.nodeType || n) { if (l = t[z] || (t[z] = {}), (a = l[s]) && a[0] === B && a[1] === o) return h[2] = a[2]; if (l[s] = h, h[2] = e(t, i, r)) return !0 }
                }
            }

            function f(e) {
                return e.length > 1 ? function(t, i, s) {
                    for (var n = e.length; n--;)
                        if (!e[n](t, i, s)) return !1;
                    return !0
                } : e[0]
            }

            function m(e, i, s) { for (var n = 0, o = i.length; o > n; n++) t(e, i[n], s); return s }

            function g(e, t, i, s, n) { for (var o, r = [], a = 0, l = e.length, h = null != t; l > a; a++)(o = e[a]) && (!i || i(o, s, n)) && (r.push(o), h && t.push(a)); return r }

            function v(e, t, i, n, o, r) {
                return n && !n[z] && (n = v(n)), o && !o[z] && (o = v(o, r)), s(function(s, r, a, l) {
                    var h, c, u, d = [],
                        p = [],
                        f = r.length,
                        v = s || m(t || "*", a.nodeType ? [a] : a, []),
                        b = !e || !s && t ? v : g(v, d, e, a, l),
                        y = i ? o || (s ? e : f || n) ? [] : r : b;
                    if (i && i(b, y, a, l), n)
                        for (h = g(y, p), n(h, [], a, l), c = h.length; c--;)(u = h[c]) && (y[p[c]] = !(b[p[c]] = u));
                    if (s) {
                        if (o || e) {
                            if (o) {
                                for (h = [], c = y.length; c--;)(u = y[c]) && h.push(b[c] = u);
                                o(null, y = [], h, l)
                            }
                            for (c = y.length; c--;)(u = y[c]) && (h = o ? ee(s, u) : d[c]) > -1 && (s[h] = !(r[h] = u))
                        }
                    } else y = g(y === r ? y.splice(f, y.length) : y), o ? o(null, r, y, l) : J.apply(r, y)
                })
            }

            function b(e) {
                for (var t, i, s, n = e.length, o = _.relative[e[0].type], r = o || _.relative[" "], a = o ? 1 : 0, l = p(function(e) { return e === t }, r, !0), h = p(function(e) { return ee(t, e) > -1 }, r, !0), c = [function(e, i, s) { var n = !o && (s || i !== D) || ((t = i).nodeType ? l(e, i, s) : h(e, i, s)); return t = null, n }]; n > a; a++)
                    if (i = _.relative[e[a].type]) c = [p(f(c), i)];
                    else {
                        if (i = _.filter[e[a].type].apply(null, e[a].matches), i[z]) { for (s = ++a; n > s && !_.relative[e[s].type]; s++); return v(a > 1 && f(c), a > 1 && d(e.slice(0, a - 1).concat({ value: " " === e[a - 2].type ? "*" : "" })).replace(le, "$1"), i, s > a && b(e.slice(a, s)), n > s && b(e = e.slice(s)), n > s && d(e)) }
                        c.push(i)
                    }
                return f(c)
            }

            function y(e, i) {
                var n = i.length > 0,
                    o = e.length > 0,
                    r = function(s, r, a, l, h) {
                        var c, u, d, p = 0,
                            f = "0",
                            m = s && [],
                            v = [],
                            b = D,
                            y = s || o && _.find.TAG("*", h),
                            x = B += null == b ? 1 : Math.random() || .1,
                            w = y.length;
                        for (h && (D = r !== q && r); f !== w && null != (c = y[f]); f++) {
                            if (o && c) {
                                for (u = 0; d = e[u++];)
                                    if (d(c, r, a)) { l.push(c); break }
                                h && (B = x)
                            }
                            n && ((c = !d && c) && p--, s && m.push(c))
                        }
                        if (p += f, n && f !== p) {
                            for (u = 0; d = i[u++];) d(m, v, r, a);
                            if (s) {
                                if (p > 0)
                                    for (; f--;) m[f] || v[f] || (v[f] = G.call(l));
                                v = g(v)
                            }
                            J.apply(l, v), h && !s && v.length > 0 && p + i.length > 1 && t.uniqueSort(l)
                        }
                        return h && (B = x, D = b), m
                    };
                return n ? s(r) : r
            }
            var x, w, _, C, I, T, k, S, D, P, j, E, q, A, M, H, O, N, $, z = "sizzle" + 1 * new Date,
                L = e.document,
                B = 0,
                W = 0,
                R = i(),
                F = i(),
                U = i(),
                V = function(e, t) { return e === t && (j = !0), 0 },
                Y = 1 << 31,
                K = {}.hasOwnProperty,
                X = [],
                G = X.pop,
                Q = X.push,
                J = X.push,
                Z = X.slice,
                ee = function(e, t) {
                    for (var i = 0, s = e.length; s > i; i++)
                        if (e[i] === t) return i;
                    return -1
                },
                te = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",
                ie = "[\\x20\\t\\r\\n\\f]",
                se = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",
                ne = se.replace("w", "w#"),
                oe = "\\[" + ie + "*(" + se + ")(?:" + ie + "*([*^$|!~]?=)" + ie + "*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + ne + "))|)" + ie + "*\\]",
                re = ":(" + se + ")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|" + oe + ")*)|.*)\\)|)",
                ae = new RegExp(ie + "+", "g"),
                le = new RegExp("^" + ie + "+|((?:^|[^\\\\])(?:\\\\.)*)" + ie + "+$", "g"),
                he = new RegExp("^" + ie + "*," + ie + "*"),
                ce = new RegExp("^" + ie + "*([>+~]|" + ie + ")" + ie + "*"),
                ue = new RegExp("=" + ie + "*([^\\]'\"]*?)" + ie + "*\\]", "g"),
                de = new RegExp(re),
                pe = new RegExp("^" + ne + "$"),
                fe = { ID: new RegExp("^#(" + se + ")"), CLASS: new RegExp("^\\.(" + se + ")"), TAG: new RegExp("^(" + se.replace("w", "w*") + ")"), ATTR: new RegExp("^" + oe), PSEUDO: new RegExp("^" + re), CHILD: new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + ie + "*(even|odd|(([+-]|)(\\d*)n|)" + ie + "*(?:([+-]|)" + ie + "*(\\d+)|))" + ie + "*\\)|)", "i"), bool: new RegExp("^(?:" + te + ")$", "i"), needsContext: new RegExp("^" + ie + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + ie + "*((?:-\\d)?\\d*)" + ie + "*\\)|)(?=[^-]|$)", "i") },
                me = /^(?:input|select|textarea|button)$/i,
                ge = /^h\d$/i,
                ve = /^[^{]+\{\s*\[native \w/,
                be = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,
                ye = /[+~]/,
                xe = /'|\\/g,
                we = new RegExp("\\\\([\\da-f]{1,6}" + ie + "?|(" + ie + ")|.)", "ig"),
                _e = function(e, t, i) { var s = "0x" + t - 65536; return s !== s || i ? t : 0 > s ? String.fromCharCode(s + 65536) : String.fromCharCode(s >> 10 | 55296, 1023 & s | 56320) },
                Ce = function() { E() };
            try { J.apply(X = Z.call(L.childNodes), L.childNodes), X[L.childNodes.length].nodeType } catch (Ie) {
                J = {
                    apply: X.length ? function(e, t) { Q.apply(e, Z.call(t)) } : function(e, t) {
                        for (var i = e.length, s = 0; e[i++] = t[s++];);
                        e.length = i - 1
                    }
                }
            }
            w = t.support = {}, I = t.isXML = function(e) { var t = e && (e.ownerDocument || e).documentElement; return t ? "HTML" !== t.nodeName : !1 }, E = t.setDocument = function(e) {
                var t, i, s = e ? e.ownerDocument || e : L;
                return s !== q && 9 === s.nodeType && s.documentElement ? (q = s, A = s.documentElement, i = s.defaultView, i && i !== i.top && (i.addEventListener ? i.addEventListener("unload", Ce, !1) : i.attachEvent && i.attachEvent("onunload", Ce)), M = !I(s), w.attributes = n(function(e) { return e.className = "i", !e.getAttribute("className") }), w.getElementsByTagName = n(function(e) { return e.appendChild(s.createComment("")), !e.getElementsByTagName("*").length }), w.getElementsByClassName = ve.test(s.getElementsByClassName), w.getById = n(function(e) { return A.appendChild(e).id = z, !s.getElementsByName || !s.getElementsByName(z).length }), w.getById ? (_.find.ID = function(e, t) { if ("undefined" != typeof t.getElementById && M) { var i = t.getElementById(e); return i && i.parentNode ? [i] : [] } }, _.filter.ID = function(e) { var t = e.replace(we, _e); return function(e) { return e.getAttribute("id") === t } }) : (delete _.find.ID, _.filter.ID = function(e) { var t = e.replace(we, _e); return function(e) { var i = "undefined" != typeof e.getAttributeNode && e.getAttributeNode("id"); return i && i.value === t } }), _.find.TAG = w.getElementsByTagName ? function(e, t) { return "undefined" != typeof t.getElementsByTagName ? t.getElementsByTagName(e) : w.qsa ? t.querySelectorAll(e) : void 0 } : function(e, t) {
                    var i, s = [],
                        n = 0,
                        o = t.getElementsByTagName(e);
                    if ("*" === e) { for (; i = o[n++];) 1 === i.nodeType && s.push(i); return s }
                    return o
                }, _.find.CLASS = w.getElementsByClassName && function(e, t) { return M ? t.getElementsByClassName(e) : void 0 }, O = [], H = [], (w.qsa = ve.test(s.querySelectorAll)) && (n(function(e) { A.appendChild(e).innerHTML = "<a id='" + z + "'></a><select id='" + z + "-\f]' msallowcapture=''><option selected=''></option></select>", e.querySelectorAll("[msallowcapture^='']").length && H.push("[*^$]=" + ie + "*(?:''|\"\")"), e.querySelectorAll("[selected]").length || H.push("\\[" + ie + "*(?:value|" + te + ")"), e.querySelectorAll("[id~=" + z + "-]").length || H.push("~="), e.querySelectorAll(":checked").length || H.push(":checked"), e.querySelectorAll("a#" + z + "+*").length || H.push(".#.+[+~]") }), n(function(e) {
                    var t = s.createElement("input");
                    t.setAttribute("type", "hidden"), e.appendChild(t).setAttribute("name", "D"), e.querySelectorAll("[name=d]").length && H.push("name" + ie + "*[*^$|!~]?="), e.querySelectorAll(":enabled").length || H.push(":enabled", ":disabled"), e.querySelectorAll("*,:x"), H.push(",.*:")
                })), (w.matchesSelector = ve.test(N = A.matches || A.webkitMatchesSelector || A.mozMatchesSelector || A.oMatchesSelector || A.msMatchesSelector)) && n(function(e) { w.disconnectedMatch = N.call(e, "div"), N.call(e, "[s!='']:x"), O.push("!=", re) }), H = H.length && new RegExp(H.join("|")), O = O.length && new RegExp(O.join("|")), t = ve.test(A.compareDocumentPosition), $ = t || ve.test(A.contains) ? function(e, t) {
                    var i = 9 === e.nodeType ? e.documentElement : e,
                        s = t && t.parentNode;
                    return e === s || !(!s || 1 !== s.nodeType || !(i.contains ? i.contains(s) : e.compareDocumentPosition && 16 & e.compareDocumentPosition(s)))
                } : function(e, t) {
                    if (t)
                        for (; t = t.parentNode;)
                            if (t === e) return !0;
                    return !1
                }, V = t ? function(e, t) { if (e === t) return j = !0, 0; var i = !e.compareDocumentPosition - !t.compareDocumentPosition; return i ? i : (i = (e.ownerDocument || e) === (t.ownerDocument || t) ? e.compareDocumentPosition(t) : 1, 1 & i || !w.sortDetached && t.compareDocumentPosition(e) === i ? e === s || e.ownerDocument === L && $(L, e) ? -1 : t === s || t.ownerDocument === L && $(L, t) ? 1 : P ? ee(P, e) - ee(P, t) : 0 : 4 & i ? -1 : 1) } : function(e, t) {
                    if (e === t) return j = !0, 0;
                    var i, n = 0,
                        o = e.parentNode,
                        a = t.parentNode,
                        l = [e],
                        h = [t];
                    if (!o || !a) return e === s ? -1 : t === s ? 1 : o ? -1 : a ? 1 : P ? ee(P, e) - ee(P, t) : 0;
                    if (o === a) return r(e, t);
                    for (i = e; i = i.parentNode;) l.unshift(i);
                    for (i = t; i = i.parentNode;) h.unshift(i);
                    for (; l[n] === h[n];) n++;
                    return n ? r(l[n], h[n]) : l[n] === L ? -1 : h[n] === L ? 1 : 0
                }, s) : q
            }, t.matches = function(e, i) { return t(e, null, null, i) }, t.matchesSelector = function(e, i) {
                if ((e.ownerDocument || e) !== q && E(e), i = i.replace(ue, "='$1']"), !(!w.matchesSelector || !M || O && O.test(i) || H && H.test(i))) try { var s = N.call(e, i); if (s || w.disconnectedMatch || e.document && 11 !== e.document.nodeType) return s } catch (n) {}
                return t(i, q, null, [e]).length > 0
            }, t.contains = function(e, t) { return (e.ownerDocument || e) !== q && E(e), $(e, t) }, t.attr = function(e, t) {
                (e.ownerDocument || e) !== q && E(e);
                var i = _.attrHandle[t.toLowerCase()],
                    s = i && K.call(_.attrHandle, t.toLowerCase()) ? i(e, t, !M) : void 0;
                return void 0 !== s ? s : w.attributes || !M ? e.getAttribute(t) : (s = e.getAttributeNode(t)) && s.specified ? s.value : null
            }, t.error = function(e) { throw new Error("Syntax error, unrecognized expression: " + e) }, t.uniqueSort = function(e) {
                var t, i = [],
                    s = 0,
                    n = 0;
                if (j = !w.detectDuplicates, P = !w.sortStable && e.slice(0), e.sort(V), j) { for (; t = e[n++];) t === e[n] && (s = i.push(n)); for (; s--;) e.splice(i[s], 1) }
                return P = null, e
            }, C = t.getText = function(e) {
                var t, i = "",
                    s = 0,
                    n = e.nodeType;
                if (n) { if (1 === n || 9 === n || 11 === n) { if ("string" == typeof e.textContent) return e.textContent; for (e = e.firstChild; e; e = e.nextSibling) i += C(e) } else if (3 === n || 4 === n) return e.nodeValue } else
                    for (; t = e[s++];) i += C(t);
                return i
            }, _ = t.selectors = {
                cacheLength: 50,
                createPseudo: s,
                match: fe,
                attrHandle: {},
                find: {},
                relative: { ">": { dir: "parentNode", first: !0 }, " ": { dir: "parentNode" }, "+": { dir: "previousSibling", first: !0 }, "~": { dir: "previousSibling" } },
                preFilter: { ATTR: function(e) { return e[1] = e[1].replace(we, _e), e[3] = (e[3] || e[4] || e[5] || "").replace(we, _e), "~=" === e[2] && (e[3] = " " + e[3] + " "), e.slice(0, 4) }, CHILD: function(e) { return e[1] = e[1].toLowerCase(), "nth" === e[1].slice(0, 3) ? (e[3] || t.error(e[0]), e[4] = +(e[4] ? e[5] + (e[6] || 1) : 2 * ("even" === e[3] || "odd" === e[3])), e[5] = +(e[7] + e[8] || "odd" === e[3])) : e[3] && t.error(e[0]), e }, PSEUDO: function(e) { var t, i = !e[6] && e[2]; return fe.CHILD.test(e[0]) ? null : (e[3] ? e[2] = e[4] || e[5] || "" : i && de.test(i) && (t = T(i, !0)) && (t = i.indexOf(")", i.length - t) - i.length) && (e[0] = e[0].slice(0, t), e[2] = i.slice(0, t)), e.slice(0, 3)) } },
                filter: {
                    TAG: function(e) {
                        var t = e.replace(we, _e).toLowerCase();
                        return "*" === e ? function() {
                            return !0
                        } : function(e) { return e.nodeName && e.nodeName.toLowerCase() === t }
                    },
                    CLASS: function(e) { var t = R[e + " "]; return t || (t = new RegExp("(^|" + ie + ")" + e + "(" + ie + "|$)")) && R(e, function(e) { return t.test("string" == typeof e.className && e.className || "undefined" != typeof e.getAttribute && e.getAttribute("class") || "") }) },
                    ATTR: function(e, i, s) { return function(n) { var o = t.attr(n, e); return null == o ? "!=" === i : i ? (o += "", "=" === i ? o === s : "!=" === i ? o !== s : "^=" === i ? s && 0 === o.indexOf(s) : "*=" === i ? s && o.indexOf(s) > -1 : "$=" === i ? s && o.slice(-s.length) === s : "~=" === i ? (" " + o.replace(ae, " ") + " ").indexOf(s) > -1 : "|=" === i ? o === s || o.slice(0, s.length + 1) === s + "-" : !1) : !0 } },
                    CHILD: function(e, t, i, s, n) {
                        var o = "nth" !== e.slice(0, 3),
                            r = "last" !== e.slice(-4),
                            a = "of-type" === t;
                        return 1 === s && 0 === n ? function(e) { return !!e.parentNode } : function(t, i, l) {
                            var h, c, u, d, p, f, m = o !== r ? "nextSibling" : "previousSibling",
                                g = t.parentNode,
                                v = a && t.nodeName.toLowerCase(),
                                b = !l && !a;
                            if (g) {
                                if (o) {
                                    for (; m;) {
                                        for (u = t; u = u[m];)
                                            if (a ? u.nodeName.toLowerCase() === v : 1 === u.nodeType) return !1;
                                        f = m = "only" === e && !f && "nextSibling"
                                    }
                                    return !0
                                }
                                if (f = [r ? g.firstChild : g.lastChild], r && b) {
                                    for (c = g[z] || (g[z] = {}), h = c[e] || [], p = h[0] === B && h[1], d = h[0] === B && h[2], u = p && g.childNodes[p]; u = ++p && u && u[m] || (d = p = 0) || f.pop();)
                                        if (1 === u.nodeType && ++d && u === t) { c[e] = [B, p, d]; break }
                                } else if (b && (h = (t[z] || (t[z] = {}))[e]) && h[0] === B) d = h[1];
                                else
                                    for (;
                                        (u = ++p && u && u[m] || (d = p = 0) || f.pop()) && ((a ? u.nodeName.toLowerCase() !== v : 1 !== u.nodeType) || !++d || (b && ((u[z] || (u[z] = {}))[e] = [B, d]), u !== t)););
                                return d -= n, d === s || d % s === 0 && d / s >= 0
                            }
                        }
                    },
                    PSEUDO: function(e, i) { var n, o = _.pseudos[e] || _.setFilters[e.toLowerCase()] || t.error("unsupported pseudo: " + e); return o[z] ? o(i) : o.length > 1 ? (n = [e, e, "", i], _.setFilters.hasOwnProperty(e.toLowerCase()) ? s(function(e, t) { for (var s, n = o(e, i), r = n.length; r--;) s = ee(e, n[r]), e[s] = !(t[s] = n[r]) }) : function(e) { return o(e, 0, n) }) : o }
                },
                pseudos: {
                    not: s(function(e) {
                        var t = [],
                            i = [],
                            n = k(e.replace(le, "$1"));
                        return n[z] ? s(function(e, t, i, s) { for (var o, r = n(e, null, s, []), a = e.length; a--;)(o = r[a]) && (e[a] = !(t[a] = o)) }) : function(e, s, o) { return t[0] = e, n(t, null, o, i), t[0] = null, !i.pop() }
                    }),
                    has: s(function(e) { return function(i) { return t(e, i).length > 0 } }),
                    contains: s(function(e) {
                        return e = e.replace(we, _e),
                            function(t) { return (t.textContent || t.innerText || C(t)).indexOf(e) > -1 }
                    }),
                    lang: s(function(e) {
                        return pe.test(e || "") || t.error("unsupported lang: " + e), e = e.replace(we, _e).toLowerCase(),
                            function(t) {
                                var i;
                                do
                                    if (i = M ? t.lang : t.getAttribute("xml:lang") || t.getAttribute("lang")) return i = i.toLowerCase(), i === e || 0 === i.indexOf(e + "-");
                                while ((t = t.parentNode) && 1 === t.nodeType);
                                return !1
                            }
                    }),
                    target: function(t) { var i = e.location && e.location.hash; return i && i.slice(1) === t.id },
                    root: function(e) { return e === A },
                    focus: function(e) { return e === q.activeElement && (!q.hasFocus || q.hasFocus()) && !!(e.type || e.href || ~e.tabIndex) },
                    enabled: function(e) { return e.disabled === !1 },
                    disabled: function(e) { return e.disabled === !0 },
                    checked: function(e) { var t = e.nodeName.toLowerCase(); return "input" === t && !!e.checked || "option" === t && !!e.selected },
                    selected: function(e) { return e.parentNode && e.parentNode.selectedIndex, e.selected === !0 },
                    empty: function(e) {
                        for (e = e.firstChild; e; e = e.nextSibling)
                            if (e.nodeType < 6) return !1;
                        return !0
                    },
                    parent: function(e) { return !_.pseudos.empty(e) },
                    header: function(e) { return ge.test(e.nodeName) },
                    input: function(e) { return me.test(e.nodeName) },
                    button: function(e) { var t = e.nodeName.toLowerCase(); return "input" === t && "button" === e.type || "button" === t },
                    text: function(e) { var t; return "input" === e.nodeName.toLowerCase() && "text" === e.type && (null == (t = e.getAttribute("type")) || "text" === t.toLowerCase()) },
                    first: h(function() { return [0] }),
                    last: h(function(e, t) { return [t - 1] }),
                    eq: h(function(e, t, i) { return [0 > i ? i + t : i] }),
                    even: h(function(e, t) { for (var i = 0; t > i; i += 2) e.push(i); return e }),
                    odd: h(function(e, t) { for (var i = 1; t > i; i += 2) e.push(i); return e }),
                    lt: h(function(e, t, i) { for (var s = 0 > i ? i + t : i; --s >= 0;) e.push(s); return e }),
                    gt: h(function(e, t, i) { for (var s = 0 > i ? i + t : i; ++s < t;) e.push(s); return e })
                }
            }, _.pseudos.nth = _.pseudos.eq;
            for (x in { radio: !0, checkbox: !0, file: !0, password: !0, image: !0 }) _.pseudos[x] = a(x);
            for (x in { submit: !0, reset: !0 }) _.pseudos[x] = l(x);
            return u.prototype = _.filters = _.pseudos, _.setFilters = new u, T = t.tokenize = function(e, i) {
                var s, n, o, r, a, l, h, c = F[e + " "];
                if (c) return i ? 0 : c.slice(0);
                for (a = e, l = [], h = _.preFilter; a;) {
                    (!s || (n = he.exec(a))) && (n && (a = a.slice(n[0].length) || a), l.push(o = [])), s = !1, (n = ce.exec(a)) && (s = n.shift(), o.push({ value: s, type: n[0].replace(le, " ") }), a = a.slice(s.length));
                    for (r in _.filter) !(n = fe[r].exec(a)) || h[r] && !(n = h[r](n)) || (s = n.shift(), o.push({ value: s, type: r, matches: n }), a = a.slice(s.length));
                    if (!s) break
                }
                return i ? a.length : a ? t.error(e) : F(e, l).slice(0)
            }, k = t.compile = function(e, t) {
                var i, s = [],
                    n = [],
                    o = U[e + " "];
                if (!o) {
                    for (t || (t = T(e)), i = t.length; i--;) o = b(t[i]), o[z] ? s.push(o) : n.push(o);
                    o = U(e, y(n, s)), o.selector = e
                }
                return o
            }, S = t.select = function(e, t, i, s) {
                var n, o, r, a, l, h = "function" == typeof e && e,
                    u = !s && T(e = h.selector || e);
                if (i = i || [], 1 === u.length) {
                    if (o = u[0] = u[0].slice(0), o.length > 2 && "ID" === (r = o[0]).type && w.getById && 9 === t.nodeType && M && _.relative[o[1].type]) {
                        if (t = (_.find.ID(r.matches[0].replace(we, _e), t) || [])[0], !t) return i;
                        h && (t = t.parentNode), e = e.slice(o.shift().value.length)
                    }
                    for (n = fe.needsContext.test(e) ? 0 : o.length; n-- && (r = o[n], !_.relative[a = r.type]);)
                        if ((l = _.find[a]) && (s = l(r.matches[0].replace(we, _e), ye.test(o[0].type) && c(t.parentNode) || t))) { if (o.splice(n, 1), e = s.length && d(o), !e) return J.apply(i, s), i; break }
                }
                return (h || k(e, u))(s, t, !M, i, ye.test(e) && c(t.parentNode) || t), i
            }, w.sortStable = z.split("").sort(V).join("") === z, w.detectDuplicates = !!j, E(), w.sortDetached = n(function(e) { return 1 & e.compareDocumentPosition(q.createElement("div")) }), n(function(e) { return e.innerHTML = "<a href='#'></a>", "#" === e.firstChild.getAttribute("href") }) || o("type|href|height|width", function(e, t, i) { return i ? void 0 : e.getAttribute(t, "type" === t.toLowerCase() ? 1 : 2) }), w.attributes && n(function(e) { return e.innerHTML = "<input/>", e.firstChild.setAttribute("value", ""), "" === e.firstChild.getAttribute("value") }) || o("value", function(e, t, i) { return i || "input" !== e.nodeName.toLowerCase() ? void 0 : e.defaultValue }), n(function(e) { return null == e.getAttribute("disabled") }) || o(te, function(e, t, i) { var s; return i ? void 0 : e[t] === !0 ? t.toLowerCase() : (s = e.getAttributeNode(t)) && s.specified ? s.value : null }), t
        }(e);
        Z.find = ne, Z.expr = ne.selectors, Z.expr[":"] = Z.expr.pseudos, Z.unique = ne.uniqueSort, Z.text = ne.getText, Z.isXMLDoc = ne.isXML, Z.contains = ne.contains;
        var oe = Z.expr.match.needsContext,
            re = /^<(\w+)\s*\/?>(?:<\/\1>|)$/,
            ae = /^.[^:#\[\.,]*$/;
        Z.filter = function(e, t, i) { var s = t[0]; return i && (e = ":not(" + e + ")"), 1 === t.length && 1 === s.nodeType ? Z.find.matchesSelector(s, e) ? [s] : [] : Z.find.matches(e, Z.grep(t, function(e) { return 1 === e.nodeType })) }, Z.fn.extend({
            find: function(e) {
                var t, i = this.length,
                    s = [],
                    n = this;
                if ("string" != typeof e) return this.pushStack(Z(e).filter(function() {
                    for (t = 0; i > t; t++)
                        if (Z.contains(n[t], this)) return !0
                }));
                for (t = 0; i > t; t++) Z.find(e, n[t], s);
                return s = this.pushStack(i > 1 ? Z.unique(s) : s), s.selector = this.selector ? this.selector + " " + e : e, s
            },
            filter: function(e) { return this.pushStack(s(this, e || [], !1)) },
            not: function(e) { return this.pushStack(s(this, e || [], !0)) },
            is: function(e) { return !!s(this, "string" == typeof e && oe.test(e) ? Z(e) : e || [], !1).length }
        });
        var le, he = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,
            ce = Z.fn.init = function(e, t) {
                var i, s;
                if (!e) return this;
                if ("string" == typeof e) {
                    if (i = "<" === e[0] && ">" === e[e.length - 1] && e.length >= 3 ? [null, e, null] : he.exec(e), !i || !i[1] && t) return !t || t.jquery ? (t || le).find(e) : this.constructor(t).find(e);
                    if (i[1]) {
                        if (t = t instanceof Z ? t[0] : t, Z.merge(this, Z.parseHTML(i[1], t && t.nodeType ? t.ownerDocument || t : Q, !0)), re.test(i[1]) && Z.isPlainObject(t))
                            for (i in t) Z.isFunction(this[i]) ? this[i](t[i]) : this.attr(i, t[i]);
                        return this
                    }
                    return s = Q.getElementById(i[2]), s && s.parentNode && (this.length = 1, this[0] = s), this.context = Q, this.selector = e, this
                }
                return e.nodeType ? (this.context = this[0] = e, this.length = 1, this) : Z.isFunction(e) ? "undefined" != typeof le.ready ? le.ready(e) : e(Z) : (void 0 !== e.selector && (this.selector = e.selector, this.context = e.context), Z.makeArray(e, this))
            };
        ce.prototype = Z.fn, le = Z(Q);
        var ue = /^(?:parents|prev(?:Until|All))/,
            de = { children: !0, contents: !0, next: !0, prev: !0 };
        Z.extend({
            dir: function(e, t, i) {
                for (var s = [], n = void 0 !== i;
                    (e = e[t]) && 9 !== e.nodeType;)
                    if (1 === e.nodeType) {
                        if (n && Z(e).is(i)) break;
                        s.push(e)
                    }
                return s
            },
            sibling: function(e, t) { for (var i = []; e; e = e.nextSibling) 1 === e.nodeType && e !== t && i.push(e); return i }
        }), Z.fn.extend({
            has: function(e) {
                var t = Z(e, this),
                    i = t.length;
                return this.filter(function() {
                    for (var e = 0; i > e; e++)
                        if (Z.contains(this, t[e])) return !0
                })
            },
            closest: function(e, t) {
                for (var i, s = 0, n = this.length, o = [], r = oe.test(e) || "string" != typeof e ? Z(e, t || this.context) : 0; n > s; s++)
                    for (i = this[s]; i && i !== t; i = i.parentNode)
                        if (i.nodeType < 11 && (r ? r.index(i) > -1 : 1 === i.nodeType && Z.find.matchesSelector(i, e))) { o.push(i); break }
                return this.pushStack(o.length > 1 ? Z.unique(o) : o)
            },
            index: function(e) { return e ? "string" == typeof e ? V.call(Z(e), this[0]) : V.call(this, e.jquery ? e[0] : e) : this[0] && this[0].parentNode ? this.first().prevAll().length : -1 },
            add: function(e, t) { return this.pushStack(Z.unique(Z.merge(this.get(), Z(e, t)))) },
            addBack: function(e) { return this.add(null == e ? this.prevObject : this.prevObject.filter(e)) }
        }), Z.each({ parent: function(e) { var t = e.parentNode; return t && 11 !== t.nodeType ? t : null }, parents: function(e) { return Z.dir(e, "parentNode") }, parentsUntil: function(e, t, i) { return Z.dir(e, "parentNode", i) }, next: function(e) { return n(e, "nextSibling") }, prev: function(e) { return n(e, "previousSibling") }, nextAll: function(e) { return Z.dir(e, "nextSibling") }, prevAll: function(e) { return Z.dir(e, "previousSibling") }, nextUntil: function(e, t, i) { return Z.dir(e, "nextSibling", i) }, prevUntil: function(e, t, i) { return Z.dir(e, "previousSibling", i) }, siblings: function(e) { return Z.sibling((e.parentNode || {}).firstChild, e) }, children: function(e) { return Z.sibling(e.firstChild) }, contents: function(e) { return e.contentDocument || Z.merge([], e.childNodes) } }, function(e, t) { Z.fn[e] = function(i, s) { var n = Z.map(this, t, i); return "Until" !== e.slice(-5) && (s = i), s && "string" == typeof s && (n = Z.filter(s, n)), this.length > 1 && (de[e] || Z.unique(n), ue.test(e) && n.reverse()), this.pushStack(n) } });
        var pe = /\S+/g,
            fe = {};
        Z.Callbacks = function(e) {
            e = "string" == typeof e ? fe[e] || o(e) : Z.extend({}, e);
            var t, i, s, n, r, a, l = [],
                h = !e.once && [],
                c = function(o) {
                    for (t = e.memory && o, i = !0, a = n || 0, n = 0, r = l.length, s = !0; l && r > a; a++)
                        if (l[a].apply(o[0], o[1]) === !1 && e.stopOnFalse) { t = !1; break }
                    s = !1, l && (h ? h.length && c(h.shift()) : t ? l = [] : u.disable())
                },
                u = {
                    add: function() { if (l) { var i = l.length;! function o(t) { Z.each(t, function(t, i) { var s = Z.type(i); "function" === s ? e.unique && u.has(i) || l.push(i) : i && i.length && "string" !== s && o(i) }) }(arguments), s ? r = l.length : t && (n = i, c(t)) } return this },
                    remove: function() {
                        return l && Z.each(arguments, function(e, t) {
                            for (var i;
                                (i = Z.inArray(t, l, i)) > -1;) l.splice(i, 1), s && (r >= i && r--, a >= i && a--)
                        }), this
                    },
                    has: function(e) { return e ? Z.inArray(e, l) > -1 : !(!l || !l.length) },
                    empty: function() { return l = [], r = 0, this },
                    disable: function() { return l = h = t = void 0, this },
                    disabled: function() { return !l },
                    lock: function() { return h = void 0, t || u.disable(), this },
                    locked: function() { return !h },
                    fireWith: function(e, t) { return !l || i && !h || (t = t || [], t = [e, t.slice ? t.slice() : t], s ? h.push(t) : c(t)), this },
                    fire: function() { return u.fireWith(this, arguments), this },
                    fired: function() { return !!i }
                };
            return u
        }, Z.extend({
            Deferred: function(e) {
                var t = [
                        ["resolve", "done", Z.Callbacks("once memory"), "resolved"],
                        ["reject", "fail", Z.Callbacks("once memory"), "rejected"],
                        ["notify", "progress", Z.Callbacks("memory")]
                    ],
                    i = "pending",
                    s = {
                        state: function() { return i },
                        always: function() { return n.done(arguments).fail(arguments), this },
                        then: function() {
                            var e = arguments;
                            return Z.Deferred(function(i) {
                                Z.each(t, function(t, o) {
                                    var r = Z.isFunction(e[t]) && e[t];
                                    n[o[1]](function() {
                                        var e = r && r.apply(this, arguments);
                                        e && Z.isFunction(e.promise) ? e.promise().done(i.resolve).fail(i.reject).progress(i.notify) : i[o[0] + "With"](this === s ? i.promise() : this, r ? [e] : arguments)
                                    })
                                }), e = null
                            }).promise()
                        },
                        promise: function(e) { return null != e ? Z.extend(e, s) : s }
                    },
                    n = {};
                return s.pipe = s.then, Z.each(t, function(e, o) {
                    var r = o[2],
                        a = o[3];
                    s[o[1]] = r.add, a && r.add(function() { i = a }, t[1 ^ e][2].disable, t[2][2].lock), n[o[0]] = function() { return n[o[0] + "With"](this === n ? s : this, arguments), this }, n[o[0] + "With"] = r.fireWith
                }), s.promise(n), e && e.call(n, n), n
            },
            when: function(e) {
                var t, i, s, n = 0,
                    o = R.call(arguments),
                    r = o.length,
                    a = 1 !== r || e && Z.isFunction(e.promise) ? r : 0,
                    l = 1 === a ? e : Z.Deferred(),
                    h = function(e, i, s) { return function(n) { i[e] = this, s[e] = arguments.length > 1 ? R.call(arguments) : n, s === t ? l.notifyWith(i, s) : --a || l.resolveWith(i, s) } };
                if (r > 1)
                    for (t = new Array(r), i = new Array(r), s = new Array(r); r > n; n++) o[n] && Z.isFunction(o[n].promise) ? o[n].promise().done(h(n, s, o)).fail(l.reject).progress(h(n, i, t)) : --a;
                return a || l.resolveWith(s, o), l.promise()
            }
        });
        var me;
        Z.fn.ready = function(e) { return Z.ready.promise().done(e), this }, Z.extend({
            isReady: !1,
            readyWait: 1,
            holdReady: function(e) { e ? Z.readyWait++ : Z.ready(!0) },
            ready: function(e) {
                (e === !0 ? --Z.readyWait : Z.isReady) || (Z.isReady = !0, e !== !0 && --Z.readyWait > 0 || (me.resolveWith(Q, [Z]), Z.fn.triggerHandler && (Z(Q).triggerHandler("ready"), Z(Q).off("ready"))))
            }
        }), Z.ready.promise = function(t) { return me || (me = Z.Deferred(), "complete" === Q.readyState ? setTimeout(Z.ready) : (Q.addEventListener("DOMContentLoaded", r, !1), e.addEventListener("load", r, !1))), me.promise(t) }, Z.ready.promise();
        var ge = Z.access = function(e, t, i, s, n, o, r) {
            var a = 0,
                l = e.length,
                h = null == i;
            if ("object" === Z.type(i)) { n = !0; for (a in i) Z.access(e, t, a, i[a], !0, o, r) } else if (void 0 !== s && (n = !0, Z.isFunction(s) || (r = !0), h && (r ? (t.call(e, s), t = null) : (h = t, t = function(e, t, i) { return h.call(Z(e), i) })), t))
                for (; l > a; a++) t(e[a], i, r ? s : s.call(e[a], a, t(e[a], i)));
            return n ? e : h ? t.call(e) : l ? t(e[0], i) : o
        };
        Z.acceptData = function(e) { return 1 === e.nodeType || 9 === e.nodeType || !+e.nodeType }, a.uid = 1, a.accepts = Z.acceptData, a.prototype = {
            key: function(e) {
                if (!a.accepts(e)) return 0;
                var t = {},
                    i = e[this.expando];
                if (!i) { i = a.uid++; try { t[this.expando] = { value: i }, Object.defineProperties(e, t) } catch (s) { t[this.expando] = i, Z.extend(e, t) } }
                return this.cache[i] || (this.cache[i] = {}), i
            },
            set: function(e, t, i) {
                var s, n = this.key(e),
                    o = this.cache[n];
                if ("string" == typeof t) o[t] = i;
                else if (Z.isEmptyObject(o)) Z.extend(this.cache[n], t);
                else
                    for (s in t) o[s] = t[s];
                return o
            },
            get: function(e, t) { var i = this.cache[this.key(e)]; return void 0 === t ? i : i[t] },
            access: function(e, t, i) { var s; return void 0 === t || t && "string" == typeof t && void 0 === i ? (s = this.get(e, t), void 0 !== s ? s : this.get(e, Z.camelCase(t))) : (this.set(e, t, i), void 0 !== i ? i : t) },
            remove: function(e, t) {
                var i, s, n, o = this.key(e),
                    r = this.cache[o];
                if (void 0 === t) this.cache[o] = {};
                else { Z.isArray(t) ? s = t.concat(t.map(Z.camelCase)) : (n = Z.camelCase(t), t in r ? s = [t, n] : (s = n, s = s in r ? [s] : s.match(pe) || [])), i = s.length; for (; i--;) delete r[s[i]] }
            },
            hasData: function(e) { return !Z.isEmptyObject(this.cache[e[this.expando]] || {}) },
            discard: function(e) { e[this.expando] && delete this.cache[e[this.expando]] }
        };
        var ve = new a,
            be = new a,
            ye = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
            xe = /([A-Z])/g;
        Z.extend({ hasData: function(e) { return be.hasData(e) || ve.hasData(e) }, data: function(e, t, i) { return be.access(e, t, i) }, removeData: function(e, t) { be.remove(e, t) }, _data: function(e, t, i) { return ve.access(e, t, i) }, _removeData: function(e, t) { ve.remove(e, t) } }), Z.fn.extend({
            data: function(e, t) {
                var i, s, n, o = this[0],
                    r = o && o.attributes;
                if (void 0 === e) {
                    if (this.length && (n = be.get(o), 1 === o.nodeType && !ve.get(o, "hasDataAttrs"))) {
                        for (i = r.length; i--;) r[i] && (s = r[i].name, 0 === s.indexOf("data-") && (s = Z.camelCase(s.slice(5)), l(o, s, n[s])));
                        ve.set(o, "hasDataAttrs", !0)
                    }
                    return n
                }
                return "object" == typeof e ? this.each(function() { be.set(this, e) }) : ge(this, function(t) {
                    var i, s = Z.camelCase(e);
                    if (o && void 0 === t) { if (i = be.get(o, e), void 0 !== i) return i; if (i = be.get(o, s), void 0 !== i) return i; if (i = l(o, s, void 0), void 0 !== i) return i } else this.each(function() {
                        var i = be.get(this, s);
                        be.set(this, s, t), -1 !== e.indexOf("-") && void 0 !== i && be.set(this, e, t)
                    })
                }, null, t, arguments.length > 1, null, !0)
            },
            removeData: function(e) { return this.each(function() { be.remove(this, e) }) }
        }), Z.extend({
            queue: function(e, t, i) { var s; return e ? (t = (t || "fx") + "queue", s = ve.get(e, t), i && (!s || Z.isArray(i) ? s = ve.access(e, t, Z.makeArray(i)) : s.push(i)), s || []) : void 0 },
            dequeue: function(e, t) {
                t = t || "fx";
                var i = Z.queue(e, t),
                    s = i.length,
                    n = i.shift(),
                    o = Z._queueHooks(e, t),
                    r = function() { Z.dequeue(e, t) };
                "inprogress" === n && (n = i.shift(), s--), n && ("fx" === t && i.unshift("inprogress"), delete o.stop, n.call(e, r, o)), !s && o && o.empty.fire()
            },
            _queueHooks: function(e, t) { var i = t + "queueHooks"; return ve.get(e, i) || ve.access(e, i, { empty: Z.Callbacks("once memory").add(function() { ve.remove(e, [t + "queue", i]) }) }) }
        }), Z.fn.extend({
            queue: function(e, t) {
                var i = 2;
                return "string" != typeof e && (t = e, e = "fx", i--), arguments.length < i ? Z.queue(this[0], e) : void 0 === t ? this : this.each(function() {
                    var i = Z.queue(this, e, t);
                    Z._queueHooks(this, e), "fx" === e && "inprogress" !== i[0] && Z.dequeue(this, e)
                })
            },
            dequeue: function(e) { return this.each(function() { Z.dequeue(this, e) }) },
            clearQueue: function(e) { return this.queue(e || "fx", []) },
            promise: function(e, t) {
                var i, s = 1,
                    n = Z.Deferred(),
                    o = this,
                    r = this.length,
                    a = function() {--s || n.resolveWith(o, [o]) };
                for ("string" != typeof e && (t = e, e = void 0), e = e || "fx"; r--;) i = ve.get(o[r], e + "queueHooks"), i && i.empty && (s++, i.empty.add(a));
                return a(), n.promise(t)
            }
        });
        var we = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,
            _e = ["Top", "Right", "Bottom", "Left"],
            Ce = function(e, t) { return e = t || e, "none" === Z.css(e, "display") || !Z.contains(e.ownerDocument, e) },
            Ie = /^(?:checkbox|radio)$/i;
        ! function() {
            var e = Q.createDocumentFragment(),
                t = e.appendChild(Q.createElement("div")),
                i = Q.createElement("input");
            i.setAttribute("type", "radio"), i.setAttribute("checked", "checked"), i.setAttribute("name", "t"), t.appendChild(i), G.checkClone = t.cloneNode(!0).cloneNode(!0).lastChild.checked, t.innerHTML = "<textarea>x</textarea>", G.noCloneChecked = !!t.cloneNode(!0).lastChild.defaultValue
        }();
        var Te = "undefined";
        G.focusinBubbles = "onfocusin" in e;
        var ke = /^key/,
            Se = /^(?:mouse|pointer|contextmenu)|click/,
            De = /^(?:focusinfocus|focusoutblur)$/,
            Pe = /^([^.]*)(?:\.(.+)|)$/;
        Z.event = {
            global: {},
            add: function(e, t, i, s, n) {
                var o, r, a, l, h, c, u, d, p, f, m, g = ve.get(e);
                if (g)
                    for (i.handler && (o = i, i = o.handler, n = o.selector), i.guid || (i.guid = Z.guid++), (l = g.events) || (l = g.events = {}), (r = g.handle) || (r = g.handle = function(t) { return typeof Z !== Te && Z.event.triggered !== t.type ? Z.event.dispatch.apply(e, arguments) : void 0 }), t = (t || "").match(pe) || [""], h = t.length; h--;) a = Pe.exec(t[h]) || [], p = m = a[1], f = (a[2] || "").split(".").sort(), p && (u = Z.event.special[p] || {}, p = (n ? u.delegateType : u.bindType) || p, u = Z.event.special[p] || {}, c = Z.extend({ type: p, origType: m, data: s, handler: i, guid: i.guid, selector: n, needsContext: n && Z.expr.match.needsContext.test(n), namespace: f.join(".") }, o), (d = l[p]) || (d = l[p] = [], d.delegateCount = 0, u.setup && u.setup.call(e, s, f, r) !== !1 || e.addEventListener && e.addEventListener(p, r, !1)), u.add && (u.add.call(e, c), c.handler.guid || (c.handler.guid = i.guid)), n ? d.splice(d.delegateCount++, 0, c) : d.push(c), Z.event.global[p] = !0)
            },
            remove: function(e, t, i, s, n) {
                var o, r, a, l, h, c, u, d, p, f, m, g = ve.hasData(e) && ve.get(e);
                if (g && (l = g.events)) {
                    for (t = (t || "").match(pe) || [""], h = t.length; h--;)
                        if (a = Pe.exec(t[h]) || [], p = m = a[1], f = (a[2] || "").split(".").sort(), p) {
                            for (u = Z.event.special[p] || {}, p = (s ? u.delegateType : u.bindType) || p, d = l[p] || [], a = a[2] && new RegExp("(^|\\.)" + f.join("\\.(?:.*\\.|)") + "(\\.|$)"), r = o = d.length; o--;) c = d[o], !n && m !== c.origType || i && i.guid !== c.guid || a && !a.test(c.namespace) || s && s !== c.selector && ("**" !== s || !c.selector) || (d.splice(o, 1), c.selector && d.delegateCount--, u.remove && u.remove.call(e, c));
                            r && !d.length && (u.teardown && u.teardown.call(e, f, g.handle) !== !1 || Z.removeEvent(e, p, g.handle), delete l[p])
                        } else
                            for (p in l) Z.event.remove(e, p + t[h], i, s, !0);
                    Z.isEmptyObject(l) && (delete g.handle, ve.remove(e, "events"))
                }
            },
            trigger: function(t, i, s, n) {
                var o, r, a, l, h, c, u, d = [s || Q],
                    p = X.call(t, "type") ? t.type : t,
                    f = X.call(t, "namespace") ? t.namespace.split(".") : [];
                if (r = a = s = s || Q, 3 !== s.nodeType && 8 !== s.nodeType && !De.test(p + Z.event.triggered) && (p.indexOf(".") >= 0 && (f = p.split("."), p = f.shift(), f.sort()), h = p.indexOf(":") < 0 && "on" + p, t = t[Z.expando] ? t : new Z.Event(p, "object" == typeof t && t), t.isTrigger = n ? 2 : 3, t.namespace = f.join("."), t.namespace_re = t.namespace ? new RegExp("(^|\\.)" + f.join("\\.(?:.*\\.|)") + "(\\.|$)") : null, t.result = void 0, t.target || (t.target = s), i = null == i ? [t] : Z.makeArray(i, [t]), u = Z.event.special[p] || {}, n || !u.trigger || u.trigger.apply(s, i) !== !1)) {
                    if (!n && !u.noBubble && !Z.isWindow(s)) {
                        for (l = u.delegateType || p, De.test(l + p) || (r = r.parentNode); r; r = r.parentNode) d.push(r), a = r;
                        a === (s.ownerDocument || Q) && d.push(a.defaultView || a.parentWindow || e)
                    }
                    for (o = 0;
                        (r = d[o++]) && !t.isPropagationStopped();) t.type = o > 1 ? l : u.bindType || p, c = (ve.get(r, "events") || {})[t.type] && ve.get(r, "handle"), c && c.apply(r, i), c = h && r[h], c && c.apply && Z.acceptData(r) && (t.result = c.apply(r, i), t.result === !1 && t.preventDefault());
                    return t.type = p, n || t.isDefaultPrevented() || u._default && u._default.apply(d.pop(), i) !== !1 || !Z.acceptData(s) || h && Z.isFunction(s[p]) && !Z.isWindow(s) && (a = s[h], a && (s[h] = null), Z.event.triggered = p, s[p](), Z.event.triggered = void 0, a && (s[h] = a)), t.result
                }
            },
            dispatch: function(e) {
                e = Z.event.fix(e);
                var t, i, s, n, o, r = [],
                    a = R.call(arguments),
                    l = (ve.get(this, "events") || {})[e.type] || [],
                    h = Z.event.special[e.type] || {};
                if (a[0] = e, e.delegateTarget = this, !h.preDispatch || h.preDispatch.call(this, e) !== !1) {
                    for (r = Z.event.handlers.call(this, e, l), t = 0;
                        (n = r[t++]) && !e.isPropagationStopped();)
                        for (e.currentTarget = n.elem, i = 0;
                            (o = n.handlers[i++]) && !e.isImmediatePropagationStopped();)(!e.namespace_re || e.namespace_re.test(o.namespace)) && (e.handleObj = o, e.data = o.data, s = ((Z.event.special[o.origType] || {}).handle || o.handler).apply(n.elem, a), void 0 !== s && (e.result = s) === !1 && (e.preventDefault(), e.stopPropagation()));
                    return h.postDispatch && h.postDispatch.call(this, e), e.result
                }
            },
            handlers: function(e, t) {
                var i, s, n, o, r = [],
                    a = t.delegateCount,
                    l = e.target;
                if (a && l.nodeType && (!e.button || "click" !== e.type))
                    for (; l !== this; l = l.parentNode || this)
                        if (l.disabled !== !0 || "click" !== e.type) {
                            for (s = [], i = 0; a > i; i++) o = t[i], n = o.selector + " ", void 0 === s[n] && (s[n] = o.needsContext ? Z(n, this).index(l) >= 0 : Z.find(n, this, null, [l]).length), s[n] && s.push(o);
                            s.length && r.push({ elem: l, handlers: s })
                        }
                return a < t.length && r.push({ elem: this, handlers: t.slice(a) }), r
            },
            props: "altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),
            fixHooks: {},
            keyHooks: { props: "char charCode key keyCode".split(" "), filter: function(e, t) { return null == e.which && (e.which = null != t.charCode ? t.charCode : t.keyCode), e } },
            mouseHooks: { props: "button buttons clientX clientY offsetX offsetY pageX pageY screenX screenY toElement".split(" "), filter: function(e, t) { var i, s, n, o = t.button; return null == e.pageX && null != t.clientX && (i = e.target.ownerDocument || Q, s = i.documentElement, n = i.body, e.pageX = t.clientX + (s && s.scrollLeft || n && n.scrollLeft || 0) - (s && s.clientLeft || n && n.clientLeft || 0), e.pageY = t.clientY + (s && s.scrollTop || n && n.scrollTop || 0) - (s && s.clientTop || n && n.clientTop || 0)), e.which || void 0 === o || (e.which = 1 & o ? 1 : 2 & o ? 3 : 4 & o ? 2 : 0), e } },
            fix: function(e) {
                if (e[Z.expando]) return e;
                var t, i, s, n = e.type,
                    o = e,
                    r = this.fixHooks[n];
                for (r || (this.fixHooks[n] = r = Se.test(n) ? this.mouseHooks : ke.test(n) ? this.keyHooks : {}), s = r.props ? this.props.concat(r.props) : this.props, e = new Z.Event(o), t = s.length; t--;) i = s[t], e[i] = o[i];
                return e.target || (e.target = Q), 3 === e.target.nodeType && (e.target = e.target.parentNode), r.filter ? r.filter(e, o) : e
            },
            special: { load: { noBubble: !0 }, focus: { trigger: function() { return this !== u() && this.focus ? (this.focus(), !1) : void 0 }, delegateType: "focusin" }, blur: { trigger: function() { return this === u() && this.blur ? (this.blur(), !1) : void 0 }, delegateType: "focusout" }, click: { trigger: function() { return "checkbox" === this.type && this.click && Z.nodeName(this, "input") ? (this.click(), !1) : void 0 }, _default: function(e) { return Z.nodeName(e.target, "a") } }, beforeunload: { postDispatch: function(e) { void 0 !== e.result && e.originalEvent && (e.originalEvent.returnValue = e.result) } } },
            simulate: function(e, t, i, s) {
                var n = Z.extend(new Z.Event, i, { type: e, isSimulated: !0, originalEvent: {} });
                s ? Z.event.trigger(n, null, t) : Z.event.dispatch.call(t, n), n.isDefaultPrevented() && i.preventDefault()
            }
        }, Z.removeEvent = function(e, t, i) { e.removeEventListener && e.removeEventListener(t, i, !1) }, Z.Event = function(e, t) { return this instanceof Z.Event ? (e && e.type ? (this.originalEvent = e, this.type = e.type, this.isDefaultPrevented = e.defaultPrevented || void 0 === e.defaultPrevented && e.returnValue === !1 ? h : c) : this.type = e, t && Z.extend(this, t), this.timeStamp = e && e.timeStamp || Z.now(), void(this[Z.expando] = !0)) : new Z.Event(e, t) }, Z.Event.prototype = {
            isDefaultPrevented: c,
            isPropagationStopped: c,
            isImmediatePropagationStopped: c,
            preventDefault: function() {
                var e = this.originalEvent;
                this.isDefaultPrevented = h, e && e.preventDefault && e.preventDefault()
            },
            stopPropagation: function() {
                var e = this.originalEvent;
                this.isPropagationStopped = h, e && e.stopPropagation && e.stopPropagation()
            },
            stopImmediatePropagation: function() {
                var e = this.originalEvent;
                this.isImmediatePropagationStopped = h, e && e.stopImmediatePropagation && e.stopImmediatePropagation(), this.stopPropagation()
            }
        }, Z.each({ mouseenter: "mouseover", mouseleave: "mouseout", pointerenter: "pointerover", pointerleave: "pointerout" }, function(e, t) {
            Z.event.special[e] = {
                delegateType: t,
                bindType: t,
                handle: function(e) {
                    var i, s = this,
                        n = e.relatedTarget,
                        o = e.handleObj;
                    return (!n || n !== s && !Z.contains(s, n)) && (e.type = o.origType, i = o.handler.apply(this, arguments), e.type = t), i
                }
            }
        }), G.focusinBubbles || Z.each({ focus: "focusin", blur: "focusout" }, function(e, t) {
            var i = function(e) { Z.event.simulate(t, e.target, Z.event.fix(e), !0) };
            Z.event.special[t] = {
                setup: function() {
                    var s = this.ownerDocument || this,
                        n = ve.access(s, t);
                    n || s.addEventListener(e, i, !0), ve.access(s, t, (n || 0) + 1)
                },
                teardown: function() {
                    var s = this.ownerDocument || this,
                        n = ve.access(s, t) - 1;
                    n ? ve.access(s, t, n) : (s.removeEventListener(e, i, !0), ve.remove(s, t))
                }
            }
        }), Z.fn.extend({
            on: function(e, t, i, s, n) {
                var o, r;
                if ("object" == typeof e) { "string" != typeof t && (i = i || t, t = void 0); for (r in e) this.on(r, t, i, e[r], n); return this }
                if (null == i && null == s ? (s = t, i = t = void 0) : null == s && ("string" == typeof t ? (s = i, i = void 0) : (s = i, i = t, t = void 0)), s === !1) s = c;
                else if (!s) return this;
                return 1 === n && (o = s, s = function(e) { return Z().off(e), o.apply(this, arguments) }, s.guid = o.guid || (o.guid = Z.guid++)), this.each(function() { Z.event.add(this, e, s, i, t) })
            },
            one: function(e, t, i, s) { return this.on(e, t, i, s, 1) },
            off: function(e, t, i) { var s, n; if (e && e.preventDefault && e.handleObj) return s = e.handleObj, Z(e.delegateTarget).off(s.namespace ? s.origType + "." + s.namespace : s.origType, s.selector, s.handler), this; if ("object" == typeof e) { for (n in e) this.off(n, t, e[n]); return this } return (t === !1 || "function" == typeof t) && (i = t, t = void 0), i === !1 && (i = c), this.each(function() { Z.event.remove(this, e, i, t) }) },
            trigger: function(e, t) { return this.each(function() { Z.event.trigger(e, t, this) }) },
            triggerHandler: function(e, t) { var i = this[0]; return i ? Z.event.trigger(e, t, i, !0) : void 0 }
        });
        var je = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
            Ee = /<([\w:]+)/,
            qe = /<|&#?\w+;/,
            Ae = /<(?:script|style|link)/i,
            Me = /checked\s*(?:[^=]|=\s*.checked.)/i,
            He = /^$|\/(?:java|ecma)script/i,
            Oe = /^true\/(.*)/,
            Ne = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,
            $e = { option: [1, "<select multiple='multiple'>", "</select>"], thead: [1, "<table>", "</table>"], col: [2, "<table><colgroup>", "</colgroup></table>"], tr: [2, "<table><tbody>", "</tbody></table>"], td: [3, "<table><tbody><tr>", "</tr></tbody></table>"], _default: [0, "", ""] };
        $e.optgroup = $e.option, $e.tbody = $e.tfoot = $e.colgroup = $e.caption = $e.thead, $e.th = $e.td, Z.extend({
            clone: function(e, t, i) {
                var s, n, o, r, a = e.cloneNode(!0),
                    l = Z.contains(e.ownerDocument, e);
                if (!(G.noCloneChecked || 1 !== e.nodeType && 11 !== e.nodeType || Z.isXMLDoc(e)))
                    for (r = v(a), o = v(e), s = 0, n = o.length; n > s; s++) b(o[s], r[s]);
                if (t)
                    if (i)
                        for (o = o || v(e), r = r || v(a), s = 0, n = o.length; n > s; s++) g(o[s], r[s]);
                    else g(e, a);
                return r = v(a, "script"), r.length > 0 && m(r, !l && v(e, "script")), a
            },
            buildFragment: function(e, t, i, s) {
                for (var n, o, r, a, l, h, c = t.createDocumentFragment(), u = [], d = 0, p = e.length; p > d; d++)
                    if (n = e[d], n || 0 === n)
                        if ("object" === Z.type(n)) Z.merge(u, n.nodeType ? [n] : n);
                        else if (qe.test(n)) {
                    for (o = o || c.appendChild(t.createElement("div")), r = (Ee.exec(n) || ["", ""])[1].toLowerCase(), a = $e[r] || $e._default, o.innerHTML = a[1] + n.replace(je, "<$1></$2>") + a[2], h = a[0]; h--;) o = o.lastChild;
                    Z.merge(u, o.childNodes), o = c.firstChild, o.textContent = ""
                } else u.push(t.createTextNode(n));
                for (c.textContent = "", d = 0; n = u[d++];)
                    if ((!s || -1 === Z.inArray(n, s)) && (l = Z.contains(n.ownerDocument, n), o = v(c.appendChild(n), "script"), l && m(o), i))
                        for (h = 0; n = o[h++];) He.test(n.type || "") && i.push(n);
                return c
            },
            cleanData: function(e) {
                for (var t, i, s, n, o = Z.event.special, r = 0; void 0 !== (i = e[r]); r++) {
                    if (Z.acceptData(i) && (n = i[ve.expando], n && (t = ve.cache[n]))) {
                        if (t.events)
                            for (s in t.events) o[s] ? Z.event.remove(i, s) : Z.removeEvent(i, s, t.handle);
                        ve.cache[n] && delete ve.cache[n]
                    }
                    delete be.cache[i[be.expando]]
                }
            }
        }), Z.fn.extend({
            text: function(e) {
                return ge(this, function(e) {
                    return void 0 === e ? Z.text(this) : this.empty().each(function() {
                        (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) && (this.textContent = e)
                    })
                }, null, e, arguments.length)
            },
            append: function() {
                return this.domManip(arguments, function(e) {
                    if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
                        var t = d(this, e);
                        t.appendChild(e)
                    }
                })
            },
            prepend: function() {
                return this.domManip(arguments, function(e) {
                    if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
                        var t = d(this, e);
                        t.insertBefore(e, t.firstChild)
                    }
                })
            },
            before: function() { return this.domManip(arguments, function(e) { this.parentNode && this.parentNode.insertBefore(e, this) }) },
            after: function() { return this.domManip(arguments, function(e) { this.parentNode && this.parentNode.insertBefore(e, this.nextSibling) }) },
            remove: function(e, t) { for (var i, s = e ? Z.filter(e, this) : this, n = 0; null != (i = s[n]); n++) t || 1 !== i.nodeType || Z.cleanData(v(i)), i.parentNode && (t && Z.contains(i.ownerDocument, i) && m(v(i, "script")), i.parentNode.removeChild(i)); return this },
            empty: function() { for (var e, t = 0; null != (e = this[t]); t++) 1 === e.nodeType && (Z.cleanData(v(e, !1)), e.textContent = ""); return this },
            clone: function(e, t) { return e = null == e ? !1 : e, t = null == t ? e : t, this.map(function() { return Z.clone(this, e, t) }) },
            html: function(e) {
                return ge(this, function(e) {
                    var t = this[0] || {},
                        i = 0,
                        s = this.length;
                    if (void 0 === e && 1 === t.nodeType) return t.innerHTML;
                    if ("string" == typeof e && !Ae.test(e) && !$e[(Ee.exec(e) || ["", ""])[1].toLowerCase()]) {
                        e = e.replace(je, "<$1></$2>");
                        try {
                            for (; s > i; i++) t = this[i] || {}, 1 === t.nodeType && (Z.cleanData(v(t, !1)), t.innerHTML = e);
                            t = 0
                        } catch (n) {}
                    }
                    t && this.empty().append(e)
                }, null, e, arguments.length)
            },
            replaceWith: function() { var e = arguments[0]; return this.domManip(arguments, function(t) { e = this.parentNode, Z.cleanData(v(this)), e && e.replaceChild(t, this) }), e && (e.length || e.nodeType) ? this : this.remove() },
            detach: function(e) { return this.remove(e, !0) },
            domManip: function(e, t) {
                e = F.apply([], e);
                var i, s, n, o, r, a, l = 0,
                    h = this.length,
                    c = this,
                    u = h - 1,
                    d = e[0],
                    m = Z.isFunction(d);
                if (m || h > 1 && "string" == typeof d && !G.checkClone && Me.test(d)) return this.each(function(i) {
                    var s = c.eq(i);
                    m && (e[0] = d.call(this, i, s.html())), s.domManip(e, t)
                });
                if (h && (i = Z.buildFragment(e, this[0].ownerDocument, !1, this), s = i.firstChild, 1 === i.childNodes.length && (i = s), s)) {
                    for (n = Z.map(v(i, "script"), p), o = n.length; h > l; l++) r = i, l !== u && (r = Z.clone(r, !0, !0), o && Z.merge(n, v(r, "script"))), t.call(this[l], r, l);
                    if (o)
                        for (a = n[n.length - 1].ownerDocument, Z.map(n, f), l = 0; o > l; l++) r = n[l], He.test(r.type || "") && !ve.access(r, "globalEval") && Z.contains(a, r) && (r.src ? Z._evalUrl && Z._evalUrl(r.src) : Z.globalEval(r.textContent.replace(Ne, "")))
                }
                return this
            }
        }), Z.each({ appendTo: "append", prependTo: "prepend", insertBefore: "before", insertAfter: "after", replaceAll: "replaceWith" }, function(e, t) { Z.fn[e] = function(e) { for (var i, s = [], n = Z(e), o = n.length - 1, r = 0; o >= r; r++) i = r === o ? this : this.clone(!0), Z(n[r])[t](i), U.apply(s, i.get()); return this.pushStack(s) } });
        var ze, Le = {},
            Be = /^margin/,
            We = new RegExp("^(" + we + ")(?!px)[a-z%]+$", "i"),
            Re = function(t) { return t.ownerDocument.defaultView.opener ? t.ownerDocument.defaultView.getComputedStyle(t, null) : e.getComputedStyle(t, null) };
        ! function() {
            function t() {
                r.style.cssText = "-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;display:block;margin-top:1%;top:1%;border:1px;padding:1px;width:4px;position:absolute", r.innerHTML = "", n.appendChild(o);
                var t = e.getComputedStyle(r, null);
                i = "1%" !== t.top, s = "4px" === t.width, n.removeChild(o)
            }
            var i, s, n = Q.documentElement,
                o = Q.createElement("div"),
                r = Q.createElement("div");
            r.style && (r.style.backgroundClip = "content-box", r.cloneNode(!0).style.backgroundClip = "", G.clearCloneStyle = "content-box" === r.style.backgroundClip, o.style.cssText = "border:0;width:0;height:0;top:0;left:-9999px;margin-top:1px;position:absolute",
                o.appendChild(r), e.getComputedStyle && Z.extend(G, { pixelPosition: function() { return t(), i }, boxSizingReliable: function() { return null == s && t(), s }, reliableMarginRight: function() { var t, i = r.appendChild(Q.createElement("div")); return i.style.cssText = r.style.cssText = "-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;display:block;margin:0;border:0;padding:0", i.style.marginRight = i.style.width = "0", r.style.width = "1px", n.appendChild(o), t = !parseFloat(e.getComputedStyle(i, null).marginRight), n.removeChild(o), r.removeChild(i), t } }))
        }(), Z.swap = function(e, t, i, s) {
            var n, o, r = {};
            for (o in t) r[o] = e.style[o], e.style[o] = t[o];
            n = i.apply(e, s || []);
            for (o in t) e.style[o] = r[o];
            return n
        };
        var Fe = /^(none|table(?!-c[ea]).+)/,
            Ue = new RegExp("^(" + we + ")(.*)$", "i"),
            Ve = new RegExp("^([+-])=(" + we + ")", "i"),
            Ye = { position: "absolute", visibility: "hidden", display: "block" },
            Ke = { letterSpacing: "0", fontWeight: "400" },
            Xe = ["Webkit", "O", "Moz", "ms"];
        Z.extend({
            cssHooks: { opacity: { get: function(e, t) { if (t) { var i = w(e, "opacity"); return "" === i ? "1" : i } } } },
            cssNumber: { columnCount: !0, fillOpacity: !0, flexGrow: !0, flexShrink: !0, fontWeight: !0, lineHeight: !0, opacity: !0, order: !0, orphans: !0, widows: !0, zIndex: !0, zoom: !0 },
            cssProps: { "float": "cssFloat" },
            style: function(e, t, i, s) {
                if (e && 3 !== e.nodeType && 8 !== e.nodeType && e.style) {
                    var n, o, r, a = Z.camelCase(t),
                        l = e.style;
                    return t = Z.cssProps[a] || (Z.cssProps[a] = C(l, a)), r = Z.cssHooks[t] || Z.cssHooks[a], void 0 === i ? r && "get" in r && void 0 !== (n = r.get(e, !1, s)) ? n : l[t] : (o = typeof i, "string" === o && (n = Ve.exec(i)) && (i = (n[1] + 1) * n[2] + parseFloat(Z.css(e, t)), o = "number"), void(null != i && i === i && ("number" !== o || Z.cssNumber[a] || (i += "px"), G.clearCloneStyle || "" !== i || 0 !== t.indexOf("background") || (l[t] = "inherit"), r && "set" in r && void 0 === (i = r.set(e, i, s)) || (l[t] = i))))
                }
            },
            css: function(e, t, i, s) { var n, o, r, a = Z.camelCase(t); return t = Z.cssProps[a] || (Z.cssProps[a] = C(e.style, a)), r = Z.cssHooks[t] || Z.cssHooks[a], r && "get" in r && (n = r.get(e, !0, i)), void 0 === n && (n = w(e, t, s)), "normal" === n && t in Ke && (n = Ke[t]), "" === i || i ? (o = parseFloat(n), i === !0 || Z.isNumeric(o) ? o || 0 : n) : n }
        }), Z.each(["height", "width"], function(e, t) { Z.cssHooks[t] = { get: function(e, i, s) { return i ? Fe.test(Z.css(e, "display")) && 0 === e.offsetWidth ? Z.swap(e, Ye, function() { return k(e, t, s) }) : k(e, t, s) : void 0 }, set: function(e, i, s) { var n = s && Re(e); return I(e, i, s ? T(e, t, s, "border-box" === Z.css(e, "boxSizing", !1, n), n) : 0) } } }), Z.cssHooks.marginRight = _(G.reliableMarginRight, function(e, t) { return t ? Z.swap(e, { display: "inline-block" }, w, [e, "marginRight"]) : void 0 }), Z.each({ margin: "", padding: "", border: "Width" }, function(e, t) { Z.cssHooks[e + t] = { expand: function(i) { for (var s = 0, n = {}, o = "string" == typeof i ? i.split(" ") : [i]; 4 > s; s++) n[e + _e[s] + t] = o[s] || o[s - 2] || o[0]; return n } }, Be.test(e) || (Z.cssHooks[e + t].set = I) }), Z.fn.extend({
            css: function(e, t) {
                return ge(this, function(e, t, i) {
                    var s, n, o = {},
                        r = 0;
                    if (Z.isArray(t)) { for (s = Re(e), n = t.length; n > r; r++) o[t[r]] = Z.css(e, t[r], !1, s); return o }
                    return void 0 !== i ? Z.style(e, t, i) : Z.css(e, t)
                }, e, t, arguments.length > 1)
            },
            show: function() { return S(this, !0) },
            hide: function() { return S(this) },
            toggle: function(e) { return "boolean" == typeof e ? e ? this.show() : this.hide() : this.each(function() { Ce(this) ? Z(this).show() : Z(this).hide() }) }
        }), Z.Tween = D, D.prototype = { constructor: D, init: function(e, t, i, s, n, o) { this.elem = e, this.prop = i, this.easing = n || "swing", this.options = t, this.start = this.now = this.cur(), this.end = s, this.unit = o || (Z.cssNumber[i] ? "" : "px") }, cur: function() { var e = D.propHooks[this.prop]; return e && e.get ? e.get(this) : D.propHooks._default.get(this) }, run: function(e) { var t, i = D.propHooks[this.prop]; return this.options.duration ? this.pos = t = Z.easing[this.easing](e, this.options.duration * e, 0, 1, this.options.duration) : this.pos = t = e, this.now = (this.end - this.start) * t + this.start, this.options.step && this.options.step.call(this.elem, this.now, this), i && i.set ? i.set(this) : D.propHooks._default.set(this), this } }, D.prototype.init.prototype = D.prototype, D.propHooks = { _default: { get: function(e) { var t; return null == e.elem[e.prop] || e.elem.style && null != e.elem.style[e.prop] ? (t = Z.css(e.elem, e.prop, ""), t && "auto" !== t ? t : 0) : e.elem[e.prop] }, set: function(e) { Z.fx.step[e.prop] ? Z.fx.step[e.prop](e) : e.elem.style && (null != e.elem.style[Z.cssProps[e.prop]] || Z.cssHooks[e.prop]) ? Z.style(e.elem, e.prop, e.now + e.unit) : e.elem[e.prop] = e.now } } }, D.propHooks.scrollTop = D.propHooks.scrollLeft = { set: function(e) { e.elem.nodeType && e.elem.parentNode && (e.elem[e.prop] = e.now) } }, Z.easing = { linear: function(e) { return e }, swing: function(e) { return .5 - Math.cos(e * Math.PI) / 2 } }, Z.fx = D.prototype.init, Z.fx.step = {};
        var Ge, Qe, Je = /^(?:toggle|show|hide)$/,
            Ze = new RegExp("^(?:([+-])=|)(" + we + ")([a-z%]*)$", "i"),
            et = /queueHooks$/,
            tt = [q],
            it = {
                "*": [function(e, t) {
                    var i = this.createTween(e, t),
                        s = i.cur(),
                        n = Ze.exec(t),
                        o = n && n[3] || (Z.cssNumber[e] ? "" : "px"),
                        r = (Z.cssNumber[e] || "px" !== o && +s) && Ze.exec(Z.css(i.elem, e)),
                        a = 1,
                        l = 20;
                    if (r && r[3] !== o) {
                        o = o || r[3], n = n || [], r = +s || 1;
                        do a = a || ".5", r /= a, Z.style(i.elem, e, r + o); while (a !== (a = i.cur() / s) && 1 !== a && --l)
                    }
                    return n && (r = i.start = +r || +s || 0, i.unit = o, i.end = n[1] ? r + (n[1] + 1) * n[2] : +n[2]), i
                }]
            };
        Z.Animation = Z.extend(M, { tweener: function(e, t) { Z.isFunction(e) ? (t = e, e = ["*"]) : e = e.split(" "); for (var i, s = 0, n = e.length; n > s; s++) i = e[s], it[i] = it[i] || [], it[i].unshift(t) }, prefilter: function(e, t) { t ? tt.unshift(e) : tt.push(e) } }), Z.speed = function(e, t, i) { var s = e && "object" == typeof e ? Z.extend({}, e) : { complete: i || !i && t || Z.isFunction(e) && e, duration: e, easing: i && t || t && !Z.isFunction(t) && t }; return s.duration = Z.fx.off ? 0 : "number" == typeof s.duration ? s.duration : s.duration in Z.fx.speeds ? Z.fx.speeds[s.duration] : Z.fx.speeds._default, (null == s.queue || s.queue === !0) && (s.queue = "fx"), s.old = s.complete, s.complete = function() { Z.isFunction(s.old) && s.old.call(this), s.queue && Z.dequeue(this, s.queue) }, s }, Z.fn.extend({
                fadeTo: function(e, t, i, s) { return this.filter(Ce).css("opacity", 0).show().end().animate({ opacity: t }, e, i, s) },
                animate: function(e, t, i, s) {
                    var n = Z.isEmptyObject(e),
                        o = Z.speed(t, i, s),
                        r = function() {
                            var t = M(this, Z.extend({}, e), o);
                            (n || ve.get(this, "finish")) && t.stop(!0)
                        };
                    return r.finish = r, n || o.queue === !1 ? this.each(r) : this.queue(o.queue, r)
                },
                stop: function(e, t, i) {
                    var s = function(e) {
                        var t = e.stop;
                        delete e.stop, t(i)
                    };
                    return "string" != typeof e && (i = t, t = e, e = void 0), t && e !== !1 && this.queue(e || "fx", []), this.each(function() {
                        var t = !0,
                            n = null != e && e + "queueHooks",
                            o = Z.timers,
                            r = ve.get(this);
                        if (n) r[n] && r[n].stop && s(r[n]);
                        else
                            for (n in r) r[n] && r[n].stop && et.test(n) && s(r[n]);
                        for (n = o.length; n--;) o[n].elem !== this || null != e && o[n].queue !== e || (o[n].anim.stop(i), t = !1, o.splice(n, 1));
                        (t || !i) && Z.dequeue(this, e)
                    })
                },
                finish: function(e) {
                    return e !== !1 && (e = e || "fx"), this.each(function() {
                        var t, i = ve.get(this),
                            s = i[e + "queue"],
                            n = i[e + "queueHooks"],
                            o = Z.timers,
                            r = s ? s.length : 0;
                        for (i.finish = !0, Z.queue(this, e, []), n && n.stop && n.stop.call(this, !0), t = o.length; t--;) o[t].elem === this && o[t].queue === e && (o[t].anim.stop(!0), o.splice(t, 1));
                        for (t = 0; r > t; t++) s[t] && s[t].finish && s[t].finish.call(this);
                        delete i.finish
                    })
                }
            }), Z.each(["toggle", "show", "hide"], function(e, t) {
                var i = Z.fn[t];
                Z.fn[t] = function(e, s, n) { return null == e || "boolean" == typeof e ? i.apply(this, arguments) : this.animate(j(t, !0), e, s, n) }
            }), Z.each({ slideDown: j("show"), slideUp: j("hide"), slideToggle: j("toggle"), fadeIn: { opacity: "show" }, fadeOut: { opacity: "hide" }, fadeToggle: { opacity: "toggle" } }, function(e, t) { Z.fn[e] = function(e, i, s) { return this.animate(t, e, i, s) } }), Z.timers = [], Z.fx.tick = function() {
                var e, t = 0,
                    i = Z.timers;
                for (Ge = Z.now(); t < i.length; t++) e = i[t], e() || i[t] !== e || i.splice(t--, 1);
                i.length || Z.fx.stop(), Ge = void 0
            }, Z.fx.timer = function(e) { Z.timers.push(e), e() ? Z.fx.start() : Z.timers.pop() }, Z.fx.interval = 13, Z.fx.start = function() { Qe || (Qe = setInterval(Z.fx.tick, Z.fx.interval)) }, Z.fx.stop = function() { clearInterval(Qe), Qe = null }, Z.fx.speeds = { slow: 600, fast: 200, _default: 400 }, Z.fn.delay = function(e, t) {
                return e = Z.fx ? Z.fx.speeds[e] || e : e, t = t || "fx", this.queue(t, function(t, i) {
                    var s = setTimeout(t, e);
                    i.stop = function() { clearTimeout(s) }
                })
            },
            function() {
                var e = Q.createElement("input"),
                    t = Q.createElement("select"),
                    i = t.appendChild(Q.createElement("option"));
                e.type = "checkbox", G.checkOn = "" !== e.value, G.optSelected = i.selected, t.disabled = !0, G.optDisabled = !i.disabled, e = Q.createElement("input"), e.value = "t", e.type = "radio", G.radioValue = "t" === e.value
            }();
        var st, nt, ot = Z.expr.attrHandle;
        Z.fn.extend({ attr: function(e, t) { return ge(this, Z.attr, e, t, arguments.length > 1) }, removeAttr: function(e) { return this.each(function() { Z.removeAttr(this, e) }) } }), Z.extend({
            attr: function(e, t, i) { var s, n, o = e.nodeType; return e && 3 !== o && 8 !== o && 2 !== o ? typeof e.getAttribute === Te ? Z.prop(e, t, i) : (1 === o && Z.isXMLDoc(e) || (t = t.toLowerCase(), s = Z.attrHooks[t] || (Z.expr.match.bool.test(t) ? nt : st)), void 0 === i ? s && "get" in s && null !== (n = s.get(e, t)) ? n : (n = Z.find.attr(e, t), null == n ? void 0 : n) : null !== i ? s && "set" in s && void 0 !== (n = s.set(e, i, t)) ? n : (e.setAttribute(t, i + ""), i) : void Z.removeAttr(e, t)) : void 0 },
            removeAttr: function(e, t) {
                var i, s, n = 0,
                    o = t && t.match(pe);
                if (o && 1 === e.nodeType)
                    for (; i = o[n++];) s = Z.propFix[i] || i, Z.expr.match.bool.test(i) && (e[s] = !1), e.removeAttribute(i)
            },
            attrHooks: { type: { set: function(e, t) { if (!G.radioValue && "radio" === t && Z.nodeName(e, "input")) { var i = e.value; return e.setAttribute("type", t), i && (e.value = i), t } } } }
        }), nt = { set: function(e, t, i) { return t === !1 ? Z.removeAttr(e, i) : e.setAttribute(i, i), i } }, Z.each(Z.expr.match.bool.source.match(/\w+/g), function(e, t) {
            var i = ot[t] || Z.find.attr;
            ot[t] = function(e, t, s) { var n, o; return s || (o = ot[t], ot[t] = n, n = null != i(e, t, s) ? t.toLowerCase() : null, ot[t] = o), n }
        });
        var rt = /^(?:input|select|textarea|button)$/i;
        Z.fn.extend({ prop: function(e, t) { return ge(this, Z.prop, e, t, arguments.length > 1) }, removeProp: function(e) { return this.each(function() { delete this[Z.propFix[e] || e] }) } }), Z.extend({ propFix: { "for": "htmlFor", "class": "className" }, prop: function(e, t, i) { var s, n, o, r = e.nodeType; return e && 3 !== r && 8 !== r && 2 !== r ? (o = 1 !== r || !Z.isXMLDoc(e), o && (t = Z.propFix[t] || t, n = Z.propHooks[t]), void 0 !== i ? n && "set" in n && void 0 !== (s = n.set(e, i, t)) ? s : e[t] = i : n && "get" in n && null !== (s = n.get(e, t)) ? s : e[t]) : void 0 }, propHooks: { tabIndex: { get: function(e) { return e.hasAttribute("tabindex") || rt.test(e.nodeName) || e.href ? e.tabIndex : -1 } } } }), G.optSelected || (Z.propHooks.selected = { get: function(e) { var t = e.parentNode; return t && t.parentNode && t.parentNode.selectedIndex, null } }), Z.each(["tabIndex", "readOnly", "maxLength", "cellSpacing", "cellPadding", "rowSpan", "colSpan", "useMap", "frameBorder", "contentEditable"], function() { Z.propFix[this.toLowerCase()] = this });
        var at = /[\t\r\n\f]/g;
        Z.fn.extend({
            addClass: function(e) {
                var t, i, s, n, o, r, a = "string" == typeof e && e,
                    l = 0,
                    h = this.length;
                if (Z.isFunction(e)) return this.each(function(t) { Z(this).addClass(e.call(this, t, this.className)) });
                if (a)
                    for (t = (e || "").match(pe) || []; h > l; l++)
                        if (i = this[l], s = 1 === i.nodeType && (i.className ? (" " + i.className + " ").replace(at, " ") : " ")) {
                            for (o = 0; n = t[o++];) s.indexOf(" " + n + " ") < 0 && (s += n + " ");
                            r = Z.trim(s), i.className !== r && (i.className = r)
                        }
                return this
            },
            removeClass: function(e) {
                var t, i, s, n, o, r, a = 0 === arguments.length || "string" == typeof e && e,
                    l = 0,
                    h = this.length;
                if (Z.isFunction(e)) return this.each(function(t) { Z(this).removeClass(e.call(this, t, this.className)) });
                if (a)
                    for (t = (e || "").match(pe) || []; h > l; l++)
                        if (i = this[l], s = 1 === i.nodeType && (i.className ? (" " + i.className + " ").replace(at, " ") : "")) {
                            for (o = 0; n = t[o++];)
                                for (; s.indexOf(" " + n + " ") >= 0;) s = s.replace(" " + n + " ", " ");
                            r = e ? Z.trim(s) : "", i.className !== r && (i.className = r)
                        }
                return this
            },
            toggleClass: function(e, t) {
                var i = typeof e;
                return "boolean" == typeof t && "string" === i ? t ? this.addClass(e) : this.removeClass(e) : this.each(Z.isFunction(e) ? function(i) { Z(this).toggleClass(e.call(this, i, this.className, t), t) } : function() {
                    if ("string" === i)
                        for (var t, s = 0, n = Z(this), o = e.match(pe) || []; t = o[s++];) n.hasClass(t) ? n.removeClass(t) : n.addClass(t);
                    else(i === Te || "boolean" === i) && (this.className && ve.set(this, "__className__", this.className), this.className = this.className || e === !1 ? "" : ve.get(this, "__className__") || "")
                })
            },
            hasClass: function(e) {
                for (var t = " " + e + " ", i = 0, s = this.length; s > i; i++)
                    if (1 === this[i].nodeType && (" " + this[i].className + " ").replace(at, " ").indexOf(t) >= 0) return !0;
                return !1
            }
        });
        var lt = /\r/g;
        Z.fn.extend({
            val: function(e) {
                var t, i, s, n = this[0];
                return arguments.length ? (s = Z.isFunction(e), this.each(function(i) {
                    var n;
                    1 === this.nodeType && (n = s ? e.call(this, i, Z(this).val()) : e, null == n ? n = "" : "number" == typeof n ? n += "" : Z.isArray(n) && (n = Z.map(n, function(e) { return null == e ? "" : e + "" })), t = Z.valHooks[this.type] || Z.valHooks[this.nodeName.toLowerCase()], t && "set" in t && void 0 !== t.set(this, n, "value") || (this.value = n))
                })) : n ? (t = Z.valHooks[n.type] || Z.valHooks[n.nodeName.toLowerCase()], t && "get" in t && void 0 !== (i = t.get(n, "value")) ? i : (i = n.value, "string" == typeof i ? i.replace(lt, "") : null == i ? "" : i)) : void 0
            }
        }), Z.extend({
            valHooks: {
                option: { get: function(e) { var t = Z.find.attr(e, "value"); return null != t ? t : Z.trim(Z.text(e)) } },
                select: {
                    get: function(e) {
                        for (var t, i, s = e.options, n = e.selectedIndex, o = "select-one" === e.type || 0 > n, r = o ? null : [], a = o ? n + 1 : s.length, l = 0 > n ? a : o ? n : 0; a > l; l++)
                            if (i = s[l], !(!i.selected && l !== n || (G.optDisabled ? i.disabled : null !== i.getAttribute("disabled")) || i.parentNode.disabled && Z.nodeName(i.parentNode, "optgroup"))) {
                                if (t = Z(i).val(), o) return t;
                                r.push(t)
                            }
                        return r
                    },
                    set: function(e, t) { for (var i, s, n = e.options, o = Z.makeArray(t), r = n.length; r--;) s = n[r], (s.selected = Z.inArray(s.value, o) >= 0) && (i = !0); return i || (e.selectedIndex = -1), o }
                }
            }
        }), Z.each(["radio", "checkbox"], function() { Z.valHooks[this] = { set: function(e, t) { return Z.isArray(t) ? e.checked = Z.inArray(Z(e).val(), t) >= 0 : void 0 } }, G.checkOn || (Z.valHooks[this].get = function(e) { return null === e.getAttribute("value") ? "on" : e.value }) }), Z.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "), function(e, t) { Z.fn[t] = function(e, i) { return arguments.length > 0 ? this.on(t, null, e, i) : this.trigger(t) } }), Z.fn.extend({ hover: function(e, t) { return this.mouseenter(e).mouseleave(t || e) }, bind: function(e, t, i) { return this.on(e, null, t, i) }, unbind: function(e, t) { return this.off(e, null, t) }, delegate: function(e, t, i, s) { return this.on(t, e, i, s) }, undelegate: function(e, t, i) { return 1 === arguments.length ? this.off(e, "**") : this.off(t, e || "**", i) } });
        var ht = Z.now(),
            ct = /\?/;
        Z.parseJSON = function(e) { return JSON.parse(e + "") }, Z.parseXML = function(e) { var t, i; if (!e || "string" != typeof e) return null; try { i = new DOMParser, t = i.parseFromString(e, "text/xml") } catch (s) { t = void 0 } return (!t || t.getElementsByTagName("parsererror").length) && Z.error("Invalid XML: " + e), t };
        var ut = /#.*$/,
            dt = /([?&])_=[^&]*/,
            pt = /^(.*?):[ \t]*([^\r\n]*)$/gm,
            ft = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
            mt = /^(?:GET|HEAD)$/,
            gt = /^\/\//,
            vt = /^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/,
            bt = {},
            yt = {},
            xt = "*/".concat("*"),
            wt = e.location.href,
            _t = vt.exec(wt.toLowerCase()) || [];
        Z.extend({
            active: 0,
            lastModified: {},
            etag: {},
            ajaxSettings: { url: wt, type: "GET", isLocal: ft.test(_t[1]), global: !0, processData: !0, async: !0, contentType: "application/x-www-form-urlencoded; charset=UTF-8", accepts: { "*": xt, text: "text/plain", html: "text/html", xml: "application/xml, text/xml", json: "application/json, text/javascript" }, contents: { xml: /xml/, html: /html/, json: /json/ }, responseFields: { xml: "responseXML", text: "responseText", json: "responseJSON" }, converters: { "* text": String, "text html": !0, "text json": Z.parseJSON, "text xml": Z.parseXML }, flatOptions: { url: !0, context: !0 } },
            ajaxSetup: function(e, t) { return t ? N(N(e, Z.ajaxSettings), t) : N(Z.ajaxSettings, e) },
            ajaxPrefilter: H(bt),
            ajaxTransport: H(yt),
            ajax: function(e, t) {
                function i(e, t, i, r) {
                    var l, c, v, b, x, _ = t;
                    2 !== y && (y = 2, a && clearTimeout(a), s = void 0, o = r || "", w.readyState = e > 0 ? 4 : 0, l = e >= 200 && 300 > e || 304 === e, i && (b = $(u, w, i)), b = z(u, b, w, l), l ? (u.ifModified && (x = w.getResponseHeader("Last-Modified"), x && (Z.lastModified[n] = x), x = w.getResponseHeader("etag"), x && (Z.etag[n] = x)), 204 === e || "HEAD" === u.type ? _ = "nocontent" : 304 === e ? _ = "notmodified" : (_ = b.state, c = b.data, v = b.error, l = !v)) : (v = _, (e || !_) && (_ = "error", 0 > e && (e = 0))), w.status = e, w.statusText = (t || _) + "", l ? f.resolveWith(d, [c, _, w]) : f.rejectWith(d, [w, _, v]), w.statusCode(g), g = void 0, h && p.trigger(l ? "ajaxSuccess" : "ajaxError", [w, u, l ? c : v]), m.fireWith(d, [w, _]), h && (p.trigger("ajaxComplete", [w, u]), --Z.active || Z.event.trigger("ajaxStop")))
                }
                "object" == typeof e && (t = e, e = void 0), t = t || {};
                var s, n, o, r, a, l, h, c, u = Z.ajaxSetup({}, t),
                    d = u.context || u,
                    p = u.context && (d.nodeType || d.jquery) ? Z(d) : Z.event,
                    f = Z.Deferred(),
                    m = Z.Callbacks("once memory"),
                    g = u.statusCode || {},
                    v = {},
                    b = {},
                    y = 0,
                    x = "canceled",
                    w = {
                        readyState: 0,
                        getResponseHeader: function(e) {
                            var t;
                            if (2 === y) {
                                if (!r)
                                    for (r = {}; t = pt.exec(o);) r[t[1].toLowerCase()] = t[2];
                                t = r[e.toLowerCase()]
                            }
                            return null == t ? null : t
                        },
                        getAllResponseHeaders: function() { return 2 === y ? o : null },
                        setRequestHeader: function(e, t) { var i = e.toLowerCase(); return y || (e = b[i] = b[i] || e, v[e] = t), this },
                        overrideMimeType: function(e) { return y || (u.mimeType = e), this },
                        statusCode: function(e) {
                            var t;
                            if (e)
                                if (2 > y)
                                    for (t in e) g[t] = [g[t], e[t]];
                                else w.always(e[w.status]);
                            return this
                        },
                        abort: function(e) { var t = e || x; return s && s.abort(t), i(0, t), this }
                    };
                if (f.promise(w).complete = m.add, w.success = w.done, w.error = w.fail, u.url = ((e || u.url || wt) + "").replace(ut, "").replace(gt, _t[1] + "//"), u.type = t.method || t.type || u.method || u.type, u.dataTypes = Z.trim(u.dataType || "*").toLowerCase().match(pe) || [""], null == u.crossDomain && (l = vt.exec(u.url.toLowerCase()), u.crossDomain = !(!l || l[1] === _t[1] && l[2] === _t[2] && (l[3] || ("http:" === l[1] ? "80" : "443")) === (_t[3] || ("http:" === _t[1] ? "80" : "443")))), u.data && u.processData && "string" != typeof u.data && (u.data = Z.param(u.data, u.traditional)), O(bt, u, t, w), 2 === y) return w;
                h = Z.event && u.global, h && 0 === Z.active++ && Z.event.trigger("ajaxStart"), u.type = u.type.toUpperCase(), u.hasContent = !mt.test(u.type), n = u.url, u.hasContent || (u.data && (n = u.url += (ct.test(n) ? "&" : "?") + u.data, delete u.data), u.cache === !1 && (u.url = dt.test(n) ? n.replace(dt, "$1_=" + ht++) : n + (ct.test(n) ? "&" : "?") + "_=" + ht++)), u.ifModified && (Z.lastModified[n] && w.setRequestHeader("If-Modified-Since", Z.lastModified[n]), Z.etag[n] && w.setRequestHeader("If-None-Match", Z.etag[n])), (u.data && u.hasContent && u.contentType !== !1 || t.contentType) && w.setRequestHeader("Content-Type", u.contentType), w.setRequestHeader("Accept", u.dataTypes[0] && u.accepts[u.dataTypes[0]] ? u.accepts[u.dataTypes[0]] + ("*" !== u.dataTypes[0] ? ", " + xt + "; q=0.01" : "") : u.accepts["*"]);
                for (c in u.headers) w.setRequestHeader(c, u.headers[c]);
                if (u.beforeSend && (u.beforeSend.call(d, w, u) === !1 || 2 === y)) return w.abort();
                x = "abort";
                for (c in { success: 1, error: 1, complete: 1 }) w[c](u[c]);
                if (s = O(yt, u, t, w)) {
                    w.readyState = 1, h && p.trigger("ajaxSend", [w, u]), u.async && u.timeout > 0 && (a = setTimeout(function() { w.abort("timeout") }, u.timeout));
                    try { y = 1, s.send(v, i) } catch (_) {
                        if (!(2 > y)) throw _;
                        i(-1, _)
                    }
                } else i(-1, "No Transport");
                return w
            },
            getJSON: function(e, t, i) { return Z.get(e, t, i, "json") },
            getScript: function(e, t) { return Z.get(e, void 0, t, "script") }
        }), Z.each(["get", "post"], function(e, t) { Z[t] = function(e, i, s, n) { return Z.isFunction(i) && (n = n || s, s = i, i = void 0), Z.ajax({ url: e, type: t, dataType: n, data: i, success: s }) } }), Z._evalUrl = function(e) { return Z.ajax({ url: e, type: "GET", dataType: "script", async: !1, global: !1, "throws": !0 }) }, Z.fn.extend({
            wrapAll: function(e) { var t; return Z.isFunction(e) ? this.each(function(t) { Z(this).wrapAll(e.call(this, t)) }) : (this[0] && (t = Z(e, this[0].ownerDocument).eq(0).clone(!0), this[0].parentNode && t.insertBefore(this[0]), t.map(function() { for (var e = this; e.firstElementChild;) e = e.firstElementChild; return e }).append(this)), this) },
            wrapInner: function(e) {
                return this.each(Z.isFunction(e) ? function(t) { Z(this).wrapInner(e.call(this, t)) } : function() {
                    var t = Z(this),
                        i = t.contents();
                    i.length ? i.wrapAll(e) : t.append(e)
                })
            },
            wrap: function(e) { var t = Z.isFunction(e); return this.each(function(i) { Z(this).wrapAll(t ? e.call(this, i) : e) }) },
            unwrap: function() { return this.parent().each(function() { Z.nodeName(this, "body") || Z(this).replaceWith(this.childNodes) }).end() }
        }), Z.expr.filters.hidden = function(e) { return e.offsetWidth <= 0 && e.offsetHeight <= 0 }, Z.expr.filters.visible = function(e) { return !Z.expr.filters.hidden(e) };
        var Ct = /%20/g,
            It = /\[\]$/,
            Tt = /\r?\n/g,
            kt = /^(?:submit|button|image|reset|file)$/i,
            St = /^(?:input|select|textarea|keygen)/i;
        Z.param = function(e, t) {
            var i, s = [],
                n = function(e, t) { t = Z.isFunction(t) ? t() : null == t ? "" : t, s[s.length] = encodeURIComponent(e) + "=" + encodeURIComponent(t) };
            if (void 0 === t && (t = Z.ajaxSettings && Z.ajaxSettings.traditional), Z.isArray(e) || e.jquery && !Z.isPlainObject(e)) Z.each(e, function() { n(this.name, this.value) });
            else
                for (i in e) L(i, e[i], t, n);
            return s.join("&").replace(Ct, "+")
        }, Z.fn.extend({ serialize: function() { return Z.param(this.serializeArray()) }, serializeArray: function() { return this.map(function() { var e = Z.prop(this, "elements"); return e ? Z.makeArray(e) : this }).filter(function() { var e = this.type; return this.name && !Z(this).is(":disabled") && St.test(this.nodeName) && !kt.test(e) && (this.checked || !Ie.test(e)) }).map(function(e, t) { var i = Z(this).val(); return null == i ? null : Z.isArray(i) ? Z.map(i, function(e) { return { name: t.name, value: e.replace(Tt, "\r\n") } }) : { name: t.name, value: i.replace(Tt, "\r\n") } }).get() } }), Z.ajaxSettings.xhr = function() { try { return new XMLHttpRequest } catch (e) {} };
        var Dt = 0,
            Pt = {},
            jt = { 0: 200, 1223: 204 },
            Et = Z.ajaxSettings.xhr();
        e.attachEvent && e.attachEvent("onunload", function() { for (var e in Pt) Pt[e]() }), G.cors = !!Et && "withCredentials" in Et, G.ajax = Et = !!Et, Z.ajaxTransport(function(e) {
            var t;
            return G.cors || Et && !e.crossDomain ? {
                send: function(i, s) {
                    var n, o = e.xhr(),
                        r = ++Dt;
                    if (o.open(e.type, e.url, e.async, e.username, e.password), e.xhrFields)
                        for (n in e.xhrFields) o[n] = e.xhrFields[n];
                    e.mimeType && o.overrideMimeType && o.overrideMimeType(e.mimeType), e.crossDomain || i["X-Requested-With"] || (i["X-Requested-With"] = "XMLHttpRequest");
                    for (n in i) o.setRequestHeader(n, i[n]);
                    t = function(e) { return function() { t && (delete Pt[r], t = o.onload = o.onerror = null, "abort" === e ? o.abort() : "error" === e ? s(o.status, o.statusText) : s(jt[o.status] || o.status, o.statusText, "string" == typeof o.responseText ? { text: o.responseText } : void 0, o.getAllResponseHeaders())) } }, o.onload = t(), o.onerror = t("error"), t = Pt[r] = t("abort");
                    try { o.send(e.hasContent && e.data || null) } catch (a) { if (t) throw a }
                },
                abort: function() { t && t() }
            } : void 0
        }), Z.ajaxSetup({ accepts: { script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript" }, contents: { script: /(?:java|ecma)script/ }, converters: { "text script": function(e) { return Z.globalEval(e), e } } }), Z.ajaxPrefilter("script", function(e) { void 0 === e.cache && (e.cache = !1), e.crossDomain && (e.type = "GET") }), Z.ajaxTransport("script", function(e) { if (e.crossDomain) { var t, i; return { send: function(s, n) { t = Z("<script>").prop({ async: !0, charset: e.scriptCharset, src: e.url }).on("load error", i = function(e) { t.remove(), i = null, e && n("error" === e.type ? 404 : 200, e.type) }), Q.head.appendChild(t[0]) }, abort: function() { i && i() } } } });
        var qt = [],
            At = /(=)\?(?=&|$)|\?\?/;
        Z.ajaxSetup({ jsonp: "callback", jsonpCallback: function() { var e = qt.pop() || Z.expando + "_" + ht++; return this[e] = !0, e } }), Z.ajaxPrefilter("json jsonp", function(t, i, s) { var n, o, r, a = t.jsonp !== !1 && (At.test(t.url) ? "url" : "string" == typeof t.data && !(t.contentType || "").indexOf("application/x-www-form-urlencoded") && At.test(t.data) && "data"); return a || "jsonp" === t.dataTypes[0] ? (n = t.jsonpCallback = Z.isFunction(t.jsonpCallback) ? t.jsonpCallback() : t.jsonpCallback, a ? t[a] = t[a].replace(At, "$1" + n) : t.jsonp !== !1 && (t.url += (ct.test(t.url) ? "&" : "?") + t.jsonp + "=" + n), t.converters["script json"] = function() { return r || Z.error(n + " was not called"), r[0] }, t.dataTypes[0] = "json", o = e[n], e[n] = function() { r = arguments }, s.always(function() { e[n] = o, t[n] && (t.jsonpCallback = i.jsonpCallback, qt.push(n)), r && Z.isFunction(o) && o(r[0]), r = o = void 0 }), "script") : void 0 }), Z.parseHTML = function(e, t, i) {
            if (!e || "string" != typeof e) return null;
            "boolean" == typeof t && (i = t, t = !1), t = t || Q;
            var s = re.exec(e),
                n = !i && [];
            return s ? [t.createElement(s[1])] : (s = Z.buildFragment([e], t, n), n && n.length && Z(n).remove(), Z.merge([], s.childNodes))
        };
        var Mt = Z.fn.load;
        Z.fn.load = function(e, t, i) {
            if ("string" != typeof e && Mt) return Mt.apply(this, arguments);
            var s, n, o, r = this,
                a = e.indexOf(" ");
            return a >= 0 && (s = Z.trim(e.slice(a)), e = e.slice(0, a)), Z.isFunction(t) ? (i = t, t = void 0) : t && "object" == typeof t && (n = "POST"), r.length > 0 && Z.ajax({ url: e, type: n, dataType: "html", data: t }).done(function(e) { o = arguments, r.html(s ? Z("<div>").append(Z.parseHTML(e)).find(s) : e) }).complete(i && function(e, t) { r.each(i, o || [e.responseText, t, e]) }), this
        }, Z.each(["ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend"], function(e, t) { Z.fn[t] = function(e) { return this.on(t, e) } }), Z.expr.filters.animated = function(e) { return Z.grep(Z.timers, function(t) { return e === t.elem }).length };
        var Ht = e.document.documentElement;
        Z.offset = {
            setOffset: function(e, t, i) {
                var s, n, o, r, a, l, h, c = Z.css(e, "position"),
                    u = Z(e),
                    d = {};
                "static" === c && (e.style.position = "relative"), a = u.offset(), o = Z.css(e, "top"), l = Z.css(e, "left"), h = ("absolute" === c || "fixed" === c) && (o + l).indexOf("auto") > -1, h ? (s = u.position(), r = s.top, n = s.left) : (r = parseFloat(o) || 0, n = parseFloat(l) || 0), Z.isFunction(t) && (t = t.call(e, i, a)), null != t.top && (d.top = t.top - a.top + r), null != t.left && (d.left = t.left - a.left + n), "using" in t ? t.using.call(e, d) : u.css(d)
            }
        }, Z.fn.extend({
            offset: function(e) {
                if (arguments.length) return void 0 === e ? this : this.each(function(t) { Z.offset.setOffset(this, e, t) });
                var t, i, s = this[0],
                    n = { top: 0, left: 0 },
                    o = s && s.ownerDocument;
                return o ? (t = o.documentElement, Z.contains(t, s) ? (typeof s.getBoundingClientRect !== Te && (n = s.getBoundingClientRect()), i = B(o), { top: n.top + i.pageYOffset - t.clientTop, left: n.left + i.pageXOffset - t.clientLeft }) : n) : void 0
            },
            position: function() {
                if (this[0]) {
                    var e, t, i = this[0],
                        s = { top: 0, left: 0 };
                    return "fixed" === Z.css(i, "position") ? t = i.getBoundingClientRect() : (e = this.offsetParent(), t = this.offset(), Z.nodeName(e[0], "html") || (s = e.offset()), s.top += Z.css(e[0], "borderTopWidth", !0), s.left += Z.css(e[0], "borderLeftWidth", !0)), { top: t.top - s.top - Z.css(i, "marginTop", !0), left: t.left - s.left - Z.css(i, "marginLeft", !0) }
                }
            },
            offsetParent: function() { return this.map(function() { for (var e = this.offsetParent || Ht; e && !Z.nodeName(e, "html") && "static" === Z.css(e, "position");) e = e.offsetParent; return e || Ht }) }
        }), Z.each({ scrollLeft: "pageXOffset", scrollTop: "pageYOffset" }, function(t, i) {
            var s = "pageYOffset" === i;
            Z.fn[t] = function(n) { return ge(this, function(t, n, o) { var r = B(t); return void 0 === o ? r ? r[i] : t[n] : void(r ? r.scrollTo(s ? e.pageXOffset : o, s ? o : e.pageYOffset) : t[n] = o) }, t, n, arguments.length, null) }
        }), Z.each(["top", "left"], function(e, t) { Z.cssHooks[t] = _(G.pixelPosition, function(e, i) { return i ? (i = w(e, t), We.test(i) ? Z(e).position()[t] + "px" : i) : void 0 }) }), Z.each({ Height: "height", Width: "width" }, function(e, t) {
            Z.each({ padding: "inner" + e, content: t, "": "outer" + e }, function(i, s) {
                Z.fn[s] = function(s, n) {
                    var o = arguments.length && (i || "boolean" != typeof s),
                        r = i || (s === !0 || n === !0 ? "margin" : "border");
                    return ge(this, function(t, i, s) { var n; return Z.isWindow(t) ? t.document.documentElement["client" + e] : 9 === t.nodeType ? (n = t.documentElement, Math.max(t.body["scroll" + e], n["scroll" + e], t.body["offset" + e], n["offset" + e], n["client" + e])) : void 0 === s ? Z.css(t, i, r) : Z.style(t, i, s, r) }, t, o ? s : void 0, o, null)
                }
            })
        }), Z.fn.size = function() { return this.length }, Z.fn.andSelf = Z.fn.addBack, "function" == typeof define && define.amd && define("jquery", [], function() { return Z });
        var Ot = e.jQuery,
            Nt = e.$;
        return Z.noConflict = function(t) { return e.$ === Z && (e.$ = Nt), t && e.jQuery === Z && (e.jQuery = Ot), Z }, typeof t === Te && (e.jQuery = e.$ = Z), Z
    }), "undefined" == typeof jQuery) throw new Error("AdminLTE requires jQuery");
if ($.AdminLTE = {}, $.AdminLTE.options = { navbarMenuSlimscroll: !0, navbarMenuSlimscrollWidth: "3px", navbarMenuHeight: "200px", animationSpeed: 500, sidebarToggleSelector: "[data-toggle='offcanvas']", sidebarPushMenu: !0, sidebarSlimScroll: !0, sidebarExpandOnHover: !1, enableBoxRefresh: !0, enableBSToppltip: !0, BSTooltipSelector: "[data-toggle='tooltip']", enableFastclick: !0, enableControlSidebar: !0, controlSidebarOptions: { toggleBtnSelector: "[data-toggle='control-sidebar']", selector: ".control-sidebar", slide: !0 }, enableBoxWidget: !0, boxWidgetOptions: { boxWidgetIcons: { collapse: "fa-minus", open: "fa-plus", remove: "fa-times" }, boxWidgetSelectors: { remove: '[data-widget="remove"]', collapse: '[data-widget="collapse"]' } }, directChat: { enable: !0, contactToggleSelector: '[data-widget="chat-pane-toggle"]' }, colors: { lightBlue: "#3c8dbc", red: "#f56954", green: "#00a65a", aqua: "#00c0ef", yellow: "#f39c12", blue: "#0073b7", navy: "#001F3F", teal: "#39CCCC", olive: "#3D9970", lime: "#01FF70", orange: "#FF851B", fuchsia: "#F012BE", purple: "#8E24AA", maroon: "#D81B60", black: "#222222", gray: "#d2d6de" }, screenSizes: { xs: 480, sm: 768, md: 992, lg: 1200 } }, $(function() {
        "undefined" != typeof AdminLTEOptions && $.extend(!0, $.AdminLTE.options, AdminLTEOptions);
        var e = $.AdminLTE.options;
        _init(), $.AdminLTE.layout.activate(), $.AdminLTE.tree(".sidebar"), e.enableControlSidebar && $.AdminLTE.controlSidebar.activate(), e.navbarMenuSlimscroll && "undefined" != typeof $.fn.slimscroll && $(".navbar .menu").slimscroll({ height: e.navbarMenuHeight, alwaysVisible: !1, size: e.navbarMenuSlimscrollWidth }).css("width", "100%"), e.sidebarPushMenu && $.AdminLTE.pushMenu.activate(e.sidebarToggleSelector), e.enableBSToppltip && $("body").tooltip({ selector: e.BSTooltipSelector }), e.enableBoxWidget && $.AdminLTE.boxWidget.activate(), e.enableFastclick && "undefined" != typeof FastClick && FastClick.attach(document.body), e.directChat.enable && $(e.directChat.contactToggleSelector).on("click", function() {
            var e = $(this).parents(".direct-chat").first();
            e.toggleClass("direct-chat-contacts-open")
        }), $('.btn-group[data-toggle="btn-toggle"]').each(function() {
            var e = $(this);
            $(this).find(".btn").on("click", function(t) { e.find(".btn.active").removeClass("active"), $(this).addClass("active"), t.preventDefault() })
        })
    }), function(e) {
        e.fn.boxRefresh = function(t) {
            function i(e) { e.append(o), n.onLoadStart.call(e) }

            function s(e) { e.find(o).remove(), n.onLoadDone.call(e) }
            var n = e.extend({ trigger: ".refresh-btn", source: "", onLoadStart: function(e) {}, onLoadDone: function(e) {} }, t),
                o = e('<div class="overlay"><div class="fa fa-refresh fa-spin"></div></div>');
            return this.each(function() {
                if ("" === n.source) return void(console && console.log("Please specify a source first - boxRefresh()"));
                var t = e(this),
                    o = t.find(n.trigger).first();
                o.on("click", function(e) { e.preventDefault(), i(t), t.find(".box-body").load(n.source, function() { s(t) }) })
            })
        }
    }(jQuery), function(e) { e.fn.activateBox = function() { e.AdminLTE.boxWidget.activate(this) } }(jQuery), function(e) {
        e.fn.todolist = function(t) {
            var i = e.extend({ onCheck: function(e) {}, onUncheck: function(e) {} }, t);
            return this.each(function() {
                "undefined" != typeof e.fn.iCheck ? (e("input", this).on("ifChecked", function(t) {
                    var s = e(this).parents("li").first();
                    s.toggleClass("done"), i.onCheck.call(s)
                }), e("input", this).on("ifUnchecked", function(t) {
                    var s = e(this).parents("li").first();
                    s.toggleClass("done"), i.onUncheck.call(s)
                })) : e("input", this).on("change", function(t) {
                    var s = e(this).parents("li").first();
                    s.toggleClass("done"), i.onCheck.call(s)
                })
            })
        }
    }(jQuery), "undefined" == typeof jQuery) throw new Error("Bootstrap's JavaScript requires jQuery"); + function(e) { "use strict"; var t = e.fn.jquery.split(" ")[0].split("."); if (t[0] < 2 && t[1] < 9 || 1 == t[0] && 9 == t[1] && t[2] < 1) throw new Error("Bootstrap's JavaScript requires jQuery version 1.9.1 or higher") }(jQuery), + function(e) {
    "use strict";

    function t() {
        var e = document.createElement("bootstrap"),
            t = { WebkitTransition: "webkitTransitionEnd", MozTransition: "transitionend", OTransition: "oTransitionEnd otransitionend", transition: "transitionend" };
        for (var i in t)
            if (void 0 !== e.style[i]) return { end: t[i] };
        return !1
    }
    e.fn.emulateTransitionEnd = function(t) {
        var i = !1,
            s = this;
        e(this).one("bsTransitionEnd", function() { i = !0 });
        var n = function() { i || e(s).trigger(e.support.transition.end) };
        return setTimeout(n, t), this
    }, e(function() { e.support.transition = t(), e.support.transition && (e.event.special.bsTransitionEnd = { bindType: e.support.transition.end, delegateType: e.support.transition.end, handle: function(t) { return e(t.target).is(this) ? t.handleObj.handler.apply(this, arguments) : void 0 } }) })
}(jQuery), + function(e) {
    "use strict";

    function t(t) {
        return this.each(function() {
            var i = e(this),
                n = i.data("bs.alert");
            n || i.data("bs.alert", n = new s(this)), "string" == typeof t && n[t].call(i)
        })
    }
    var i = '[data-dismiss="alert"]',
        s = function(t) { e(t).on("click", i, this.close) };
    s.VERSION = "3.3.4", s.TRANSITION_DURATION = 150, s.prototype.close = function(t) {
        function i() { r.detach().trigger("closed.bs.alert").remove() }
        var n = e(this),
            o = n.attr("data-target");
        o || (o = n.attr("href"), o = o && o.replace(/.*(?=#[^\s]*$)/, ""));
        var r = e(o);
        t && t.preventDefault(), r.length || (r = n.closest(".alert")), r.trigger(t = e.Event("close.bs.alert")), t.isDefaultPrevented() || (r.removeClass("in"), e.support.transition && r.hasClass("fade") ? r.one("bsTransitionEnd", i).emulateTransitionEnd(s.TRANSITION_DURATION) : i());
    };
    var n = e.fn.alert;
    e.fn.alert = t, e.fn.alert.Constructor = s, e.fn.alert.noConflict = function() { return e.fn.alert = n, this }, e(document).on("click.bs.alert.data-api", i, s.prototype.close)
}(jQuery), + function(e) {
    "use strict";

    function t(t) {
        return this.each(function() {
            var s = e(this),
                n = s.data("bs.button"),
                o = "object" == typeof t && t;
            n || s.data("bs.button", n = new i(this, o)), "toggle" == t ? n.toggle() : t && n.setState(t)
        })
    }
    var i = function(t, s) { this.$element = e(t), this.options = e.extend({}, i.DEFAULTS, s), this.isLoading = !1 };
    i.VERSION = "3.3.4", i.DEFAULTS = { loadingText: "loading..." }, i.prototype.setState = function(t) {
        var i = "disabled",
            s = this.$element,
            n = s.is("input") ? "val" : "html",
            o = s.data();
        t += "Text", null == o.resetText && s.data("resetText", s[n]()), setTimeout(e.proxy(function() { s[n](null == o[t] ? this.options[t] : o[t]), "loadingText" == t ? (this.isLoading = !0, s.addClass(i).attr(i, i)) : this.isLoading && (this.isLoading = !1, s.removeClass(i).removeAttr(i)) }, this), 0)
    }, i.prototype.toggle = function() {
        var e = !0,
            t = this.$element.closest('[data-toggle="buttons"]');
        if (t.length) { var i = this.$element.find("input"); "radio" == i.prop("type") && (i.prop("checked") && this.$element.hasClass("active") ? e = !1 : t.find(".active").removeClass("active")), e && i.prop("checked", !this.$element.hasClass("active")).trigger("change") } else this.$element.attr("aria-pressed", !this.$element.hasClass("active"));
        e && this.$element.toggleClass("active")
    };
    var s = e.fn.button;
    e.fn.button = t, e.fn.button.Constructor = i, e.fn.button.noConflict = function() { return e.fn.button = s, this }, e(document).on("click.bs.button.data-api", '[data-toggle^="button"]', function(i) {
        var s = e(i.target);
        s.hasClass("btn") || (s = s.closest(".btn")), t.call(s, "toggle"), i.preventDefault()
    }).on("focus.bs.button.data-api blur.bs.button.data-api", '[data-toggle^="button"]', function(t) { e(t.target).closest(".btn").toggleClass("focus", /^focus(in)?$/.test(t.type)) })
}(jQuery), + function(e) {
    "use strict";

    function t(t) {
        return this.each(function() {
            var s = e(this),
                n = s.data("bs.carousel"),
                o = e.extend({}, i.DEFAULTS, s.data(), "object" == typeof t && t),
                r = "string" == typeof t ? t : o.slide;
            n || s.data("bs.carousel", n = new i(this, o)), "number" == typeof t ? n.to(t) : r ? n[r]() : o.interval && n.pause().cycle()
        })
    }
    var i = function(t, i) { this.$element = e(t), this.$indicators = this.$element.find(".carousel-indicators"), this.options = i, this.paused = null, this.sliding = null, this.interval = null, this.$active = null, this.$items = null, this.options.keyboard && this.$element.on("keydown.bs.carousel", e.proxy(this.keydown, this)), "hover" == this.options.pause && !("ontouchstart" in document.documentElement) && this.$element.on("mouseenter.bs.carousel", e.proxy(this.pause, this)).on("mouseleave.bs.carousel", e.proxy(this.cycle, this)) };
    i.VERSION = "3.3.4", i.TRANSITION_DURATION = 600, i.DEFAULTS = { interval: 5e3, pause: "hover", wrap: !0, keyboard: !0 }, i.prototype.keydown = function(e) {
        if (!/input|textarea/i.test(e.target.tagName)) {
            switch (e.which) {
                case 37:
                    this.prev();
                    break;
                case 39:
                    this.next();
                    break;
                default:
                    return
            }
            e.preventDefault()
        }
    }, i.prototype.cycle = function(t) { return t || (this.paused = !1), this.interval && clearInterval(this.interval), this.options.interval && !this.paused && (this.interval = setInterval(e.proxy(this.next, this), this.options.interval)), this }, i.prototype.getItemIndex = function(e) { return this.$items = e.parent().children(".item"), this.$items.index(e || this.$active) }, i.prototype.getItemForDirection = function(e, t) {
        var i = this.getItemIndex(t),
            s = "prev" == e && 0 === i || "next" == e && i == this.$items.length - 1;
        if (s && !this.options.wrap) return t;
        var n = "prev" == e ? -1 : 1,
            o = (i + n) % this.$items.length;
        return this.$items.eq(o)
    }, i.prototype.to = function(e) {
        var t = this,
            i = this.getItemIndex(this.$active = this.$element.find(".item.active"));
        return e > this.$items.length - 1 || 0 > e ? void 0 : this.sliding ? this.$element.one("slid.bs.carousel", function() { t.to(e) }) : i == e ? this.pause().cycle() : this.slide(e > i ? "next" : "prev", this.$items.eq(e))
    }, i.prototype.pause = function(t) { return t || (this.paused = !0), this.$element.find(".next, .prev").length && e.support.transition && (this.$element.trigger(e.support.transition.end), this.cycle(!0)), this.interval = clearInterval(this.interval), this }, i.prototype.next = function() { return this.sliding ? void 0 : this.slide("next") }, i.prototype.prev = function() { return this.sliding ? void 0 : this.slide("prev") }, i.prototype.slide = function(t, s) {
        var n = this.$element.find(".item.active"),
            o = s || this.getItemForDirection(t, n),
            r = this.interval,
            a = "next" == t ? "left" : "right",
            l = this;
        if (o.hasClass("active")) return this.sliding = !1;
        var h = o[0],
            c = e.Event("slide.bs.carousel", { relatedTarget: h, direction: a });
        if (this.$element.trigger(c), !c.isDefaultPrevented()) {
            if (this.sliding = !0, r && this.pause(), this.$indicators.length) {
                this.$indicators.find(".active").removeClass("active");
                var u = e(this.$indicators.children()[this.getItemIndex(o)]);
                u && u.addClass("active")
            }
            var d = e.Event("slid.bs.carousel", { relatedTarget: h, direction: a });
            return e.support.transition && this.$element.hasClass("slide") ? (o.addClass(t), o[0].offsetWidth, n.addClass(a), o.addClass(a), n.one("bsTransitionEnd", function() { o.removeClass([t, a].join(" ")).addClass("active"), n.removeClass(["active", a].join(" ")), l.sliding = !1, setTimeout(function() { l.$element.trigger(d) }, 0) }).emulateTransitionEnd(i.TRANSITION_DURATION)) : (n.removeClass("active"), o.addClass("active"), this.sliding = !1, this.$element.trigger(d)), r && this.cycle(), this
        }
    };
    var s = e.fn.carousel;
    e.fn.carousel = t, e.fn.carousel.Constructor = i, e.fn.carousel.noConflict = function() { return e.fn.carousel = s, this };
    var n = function(i) {
        var s, n = e(this),
            o = e(n.attr("data-target") || (s = n.attr("href")) && s.replace(/.*(?=#[^\s]+$)/, ""));
        if (o.hasClass("carousel")) {
            var r = e.extend({}, o.data(), n.data()),
                a = n.attr("data-slide-to");
            a && (r.interval = !1), t.call(o, r), a && o.data("bs.carousel").to(a), i.preventDefault()
        }
    };
    e(document).on("click.bs.carousel.data-api", "[data-slide]", n).on("click.bs.carousel.data-api", "[data-slide-to]", n), e(window).on("load", function() {
        e('[data-ride="carousel"]').each(function() {
            var i = e(this);
            t.call(i, i.data())
        })
    })
}(jQuery), + function(e) {
    "use strict";

    function t(t) { var i, s = t.attr("data-target") || (i = t.attr("href")) && i.replace(/.*(?=#[^\s]+$)/, ""); return e(s) }

    function i(t) {
        return this.each(function() {
            var i = e(this),
                n = i.data("bs.collapse"),
                o = e.extend({}, s.DEFAULTS, i.data(), "object" == typeof t && t);
            !n && o.toggle && /show|hide/.test(t) && (o.toggle = !1), n || i.data("bs.collapse", n = new s(this, o)), "string" == typeof t && n[t]()
        })
    }
    var s = function(t, i) { this.$element = e(t), this.options = e.extend({}, s.DEFAULTS, i), this.$trigger = e('[data-toggle="collapse"][href="#' + t.id + '"],[data-toggle="collapse"][data-target="#' + t.id + '"]'), this.transitioning = null, this.options.parent ? this.$parent = this.getParent() : this.addAriaAndCollapsedClass(this.$element, this.$trigger), this.options.toggle && this.toggle() };
    s.VERSION = "3.3.4", s.TRANSITION_DURATION = 350, s.DEFAULTS = { toggle: !0 }, s.prototype.dimension = function() { var e = this.$element.hasClass("width"); return e ? "width" : "height" }, s.prototype.show = function() {
        if (!this.transitioning && !this.$element.hasClass("in")) {
            var t, n = this.$parent && this.$parent.children(".panel").children(".in, .collapsing");
            if (!(n && n.length && (t = n.data("bs.collapse"), t && t.transitioning))) {
                var o = e.Event("show.bs.collapse");
                if (this.$element.trigger(o), !o.isDefaultPrevented()) {
                    n && n.length && (i.call(n, "hide"), t || n.data("bs.collapse", null));
                    var r = this.dimension();
                    this.$element.removeClass("collapse").addClass("collapsing")[r](0).attr("aria-expanded", !0), this.$trigger.removeClass("collapsed").attr("aria-expanded", !0), this.transitioning = 1;
                    var a = function() { this.$element.removeClass("collapsing").addClass("collapse in")[r](""), this.transitioning = 0, this.$element.trigger("shown.bs.collapse") };
                    if (!e.support.transition) return a.call(this);
                    var l = e.camelCase(["scroll", r].join("-"));
                    this.$element.one("bsTransitionEnd", e.proxy(a, this)).emulateTransitionEnd(s.TRANSITION_DURATION)[r](this.$element[0][l])
                }
            }
        }
    }, s.prototype.hide = function() {
        if (!this.transitioning && this.$element.hasClass("in")) {
            var t = e.Event("hide.bs.collapse");
            if (this.$element.trigger(t), !t.isDefaultPrevented()) {
                var i = this.dimension();
                this.$element[i](this.$element[i]())[0].offsetHeight, this.$element.addClass("collapsing").removeClass("collapse in").attr("aria-expanded", !1), this.$trigger.addClass("collapsed").attr("aria-expanded", !1), this.transitioning = 1;
                var n = function() { this.transitioning = 0, this.$element.removeClass("collapsing").addClass("collapse").trigger("hidden.bs.collapse") };
                return e.support.transition ? void this.$element[i](0).one("bsTransitionEnd", e.proxy(n, this)).emulateTransitionEnd(s.TRANSITION_DURATION) : n.call(this)
            }
        }
    }, s.prototype.toggle = function() { this[this.$element.hasClass("in") ? "hide" : "show"]() }, s.prototype.getParent = function() {
        return e(this.options.parent).find('[data-toggle="collapse"][data-parent="' + this.options.parent + '"]').each(e.proxy(function(i, s) {
            var n = e(s);
            this.addAriaAndCollapsedClass(t(n), n)
        }, this)).end()
    }, s.prototype.addAriaAndCollapsedClass = function(e, t) {
        var i = e.hasClass("in");
        e.attr("aria-expanded", i), t.toggleClass("collapsed", !i).attr("aria-expanded", i)
    };
    var n = e.fn.collapse;
    e.fn.collapse = i, e.fn.collapse.Constructor = s, e.fn.collapse.noConflict = function() { return e.fn.collapse = n, this }, e(document).on("click.bs.collapse.data-api", '[data-toggle="collapse"]', function(s) {
        var n = e(this);
        n.attr("data-target") || s.preventDefault();
        var o = t(n),
            r = o.data("bs.collapse"),
            a = r ? "toggle" : n.data();
        i.call(o, a)
    })
}(jQuery), + function(e) {
    "use strict";

    function t(t) {
        t && 3 === t.which || (e(n).remove(), e(o).each(function() {
            var s = e(this),
                n = i(s),
                o = { relatedTarget: this };
            n.hasClass("open") && (n.trigger(t = e.Event("hide.bs.dropdown", o)), t.isDefaultPrevented() || (s.attr("aria-expanded", "false"), n.removeClass("open").trigger("hidden.bs.dropdown", o)))
        }))
    }

    function i(t) {
        var i = t.attr("data-target");
        i || (i = t.attr("href"), i = i && /#[A-Za-z]/.test(i) && i.replace(/.*(?=#[^\s]*$)/, ""));
        var s = i && e(i);
        return s && s.length ? s : t.parent()
    }

    function s(t) {
        return this.each(function() {
            var i = e(this),
                s = i.data("bs.dropdown");
            s || i.data("bs.dropdown", s = new r(this)), "string" == typeof t && s[t].call(i)
        })
    }
    var n = ".dropdown-backdrop",
        o = '[data-toggle="dropdown"]',
        r = function(t) { e(t).on("click.bs.dropdown", this.toggle) };
    r.VERSION = "3.3.4", r.prototype.toggle = function(s) {
        var n = e(this);
        if (!n.is(".disabled, :disabled")) {
            var o = i(n),
                r = o.hasClass("open");
            if (t(), !r) {
                "ontouchstart" in document.documentElement && !o.closest(".navbar-nav").length && e('<div class="dropdown-backdrop"/>').insertAfter(e(this)).on("click", t);
                var a = { relatedTarget: this };
                if (o.trigger(s = e.Event("show.bs.dropdown", a)), s.isDefaultPrevented()) return;
                n.trigger("focus").attr("aria-expanded", "true"), o.toggleClass("open").trigger("shown.bs.dropdown", a)
            }
            return !1
        }
    }, r.prototype.keydown = function(t) {
        if (/(38|40|27|32)/.test(t.which) && !/input|textarea/i.test(t.target.tagName)) {
            var s = e(this);
            if (t.preventDefault(), t.stopPropagation(), !s.is(".disabled, :disabled")) {
                var n = i(s),
                    r = n.hasClass("open");
                if (!r && 27 != t.which || r && 27 == t.which) return 27 == t.which && n.find(o).trigger("focus"), s.trigger("click");
                var a = " li:not(.disabled):visible a",
                    l = n.find('[role="menu"]' + a + ', [role="listbox"]' + a);
                if (l.length) {
                    var h = l.index(t.target);
                    38 == t.which && h > 0 && h--, 40 == t.which && h < l.length - 1 && h++, ~h || (h = 0), l.eq(h).trigger("focus")
                }
            }
        }
    };
    var a = e.fn.dropdown;
    e.fn.dropdown = s, e.fn.dropdown.Constructor = r, e.fn.dropdown.noConflict = function() { return e.fn.dropdown = a, this }, e(document).on("click.bs.dropdown.data-api", t).on("click.bs.dropdown.data-api", ".dropdown form", function(e) { e.stopPropagation() }).on("click.bs.dropdown.data-api", o, r.prototype.toggle).on("keydown.bs.dropdown.data-api", o, r.prototype.keydown).on("keydown.bs.dropdown.data-api", '[role="menu"]', r.prototype.keydown).on("keydown.bs.dropdown.data-api", '[role="listbox"]', r.prototype.keydown)
}(jQuery), + function(e) {
    "use strict";

    function t(t, s) {
        return this.each(function() {
            var n = e(this),
                o = n.data("bs.modal"),
                r = e.extend({}, i.DEFAULTS, n.data(), "object" == typeof t && t);
            o || n.data("bs.modal", o = new i(this, r)), "string" == typeof t ? o[t](s) : r.show && o.show(s)
        })
    }
    var i = function(t, i) { this.options = i, this.$body = e(document.body), this.$element = e(t), this.$dialog = this.$element.find(".modal-dialog"), this.$backdrop = null, this.isShown = null, this.originalBodyPad = null, this.scrollbarWidth = 0, this.ignoreBackdropClick = !1, this.options.remote && this.$element.find(".modal-content").load(this.options.remote, e.proxy(function() { this.$element.trigger("loaded.bs.modal") }, this)) };
    i.VERSION = "3.3.4", i.TRANSITION_DURATION = 300, i.BACKDROP_TRANSITION_DURATION = 150, i.DEFAULTS = { backdrop: !0, keyboard: !0, show: !0 }, i.prototype.toggle = function(e) { return this.isShown ? this.hide() : this.show(e) }, i.prototype.show = function(t) {
        var s = this,
            n = e.Event("show.bs.modal", { relatedTarget: t });
        this.$element.trigger(n), this.isShown || n.isDefaultPrevented() || (this.isShown = !0, this.checkScrollbar(), this.setScrollbar(), this.$body.addClass("modal-open"), this.escape(), this.resize(), this.$element.on("click.dismiss.bs.modal", '[data-dismiss="modal"]', e.proxy(this.hide, this)), this.$dialog.on("mousedown.dismiss.bs.modal", function() { s.$element.one("mouseup.dismiss.bs.modal", function(t) { e(t.target).is(s.$element) && (s.ignoreBackdropClick = !0) }) }), this.backdrop(function() {
            var n = e.support.transition && s.$element.hasClass("fade");
            s.$element.parent().length || s.$element.appendTo(s.$body), s.$element.show().scrollTop(0), s.adjustDialog(), n && s.$element[0].offsetWidth, s.$element.addClass("in").attr("aria-hidden", !1), s.enforceFocus();
            var o = e.Event("shown.bs.modal", { relatedTarget: t });
            n ? s.$dialog.one("bsTransitionEnd", function() { s.$element.trigger("focus").trigger(o) }).emulateTransitionEnd(i.TRANSITION_DURATION) : s.$element.trigger("focus").trigger(o)
        }))
    }, i.prototype.hide = function(t) { t && t.preventDefault(), t = e.Event("hide.bs.modal"), this.$element.trigger(t), this.isShown && !t.isDefaultPrevented() && (this.isShown = !1, this.escape(), this.resize(), e(document).off("focusin.bs.modal"), this.$element.removeClass("in").attr("aria-hidden", !0).off("click.dismiss.bs.modal").off("mouseup.dismiss.bs.modal"), this.$dialog.off("mousedown.dismiss.bs.modal"), e.support.transition && this.$element.hasClass("fade") ? this.$element.one("bsTransitionEnd", e.proxy(this.hideModal, this)).emulateTransitionEnd(i.TRANSITION_DURATION) : this.hideModal()) }, i.prototype.enforceFocus = function() { e(document).off("focusin.bs.modal").on("focusin.bs.modal", e.proxy(function(e) { this.$element[0] === e.target || this.$element.has(e.target).length || this.$element.trigger("focus") }, this)) }, i.prototype.escape = function() { this.isShown && this.options.keyboard ? this.$element.on("keydown.dismiss.bs.modal", e.proxy(function(e) { 27 == e.which && this.hide() }, this)) : this.isShown || this.$element.off("keydown.dismiss.bs.modal") }, i.prototype.resize = function() { this.isShown ? e(window).on("resize.bs.modal", e.proxy(this.handleUpdate, this)) : e(window).off("resize.bs.modal") }, i.prototype.hideModal = function() {
        var e = this;
        this.$element.hide(), this.backdrop(function() { e.$body.removeClass("modal-open"), e.resetAdjustments(), e.resetScrollbar(), e.$element.trigger("hidden.bs.modal") })
    }, i.prototype.removeBackdrop = function() { this.$backdrop && this.$backdrop.remove(), this.$backdrop = null }, i.prototype.backdrop = function(t) {
        var s = this,
            n = this.$element.hasClass("fade") ? "fade" : "";
        if (this.isShown && this.options.backdrop) {
            var o = e.support.transition && n;
            if (this.$backdrop = e('<div class="modal-backdrop ' + n + '" />').appendTo(this.$body), this.$element.on("click.dismiss.bs.modal", e.proxy(function(e) { return this.ignoreBackdropClick ? void(this.ignoreBackdropClick = !1) : void(e.target === e.currentTarget && ("static" == this.options.backdrop ? this.$element[0].focus() : this.hide())) }, this)), o && this.$backdrop[0].offsetWidth, this.$backdrop.addClass("in"), !t) return;
            o ? this.$backdrop.one("bsTransitionEnd", t).emulateTransitionEnd(i.BACKDROP_TRANSITION_DURATION) : t()
        } else if (!this.isShown && this.$backdrop) {
            this.$backdrop.removeClass("in");
            var r = function() { s.removeBackdrop(), t && t() };
            e.support.transition && this.$element.hasClass("fade") ? this.$backdrop.one("bsTransitionEnd", r).emulateTransitionEnd(i.BACKDROP_TRANSITION_DURATION) : r()
        } else t && t()
    }, i.prototype.handleUpdate = function() { this.adjustDialog() }, i.prototype.adjustDialog = function() {
        var e = this.$element[0].scrollHeight > document.documentElement.clientHeight;
        this.$element.css({ paddingLeft: !this.bodyIsOverflowing && e ? this.scrollbarWidth : "", paddingRight: this.bodyIsOverflowing && !e ? this.scrollbarWidth : "" })
    }, i.prototype.resetAdjustments = function() { this.$element.css({ paddingLeft: "", paddingRight: "" }) }, i.prototype.checkScrollbar = function() {
        var e = window.innerWidth;
        if (!e) {
            var t = document.documentElement.getBoundingClientRect();
            e = t.right - Math.abs(t.left)
        }
        this.bodyIsOverflowing = document.body.clientWidth < e, this.scrollbarWidth = this.measureScrollbar()
    }, i.prototype.setScrollbar = function() {
        var e = parseInt(this.$body.css("padding-right") || 0, 10);
        this.originalBodyPad = document.body.style.paddingRight || "", this.bodyIsOverflowing && this.$body.css("padding-right", e + this.scrollbarWidth)
    }, i.prototype.resetScrollbar = function() { this.$body.css("padding-right", this.originalBodyPad) }, i.prototype.measureScrollbar = function() {
        var e = document.createElement("div");
        e.className = "modal-scrollbar-measure", this.$body.append(e);
        var t = e.offsetWidth - e.clientWidth;
        return this.$body[0].removeChild(e), t
    };
    var s = e.fn.modal;
    e.fn.modal = t, e.fn.modal.Constructor = i, e.fn.modal.noConflict = function() { return e.fn.modal = s, this }, e(document).on("click.bs.modal.data-api", '[data-toggle="modal"]', function(i) {
        var s = e(this),
            n = s.attr("href"),
            o = e(s.attr("data-target") || n && n.replace(/.*(?=#[^\s]+$)/, "")),
            r = o.data("bs.modal") ? "toggle" : e.extend({ remote: !/#/.test(n) && n }, o.data(), s.data());
        s.is("a") && i.preventDefault(), o.one("show.bs.modal", function(e) { e.isDefaultPrevented() || o.one("hidden.bs.modal", function() { s.is(":visible") && s.trigger("focus") }) }), t.call(o, r, this)
    })
}(jQuery), + function(e) {
    "use strict";

    function t(t) {
        return this.each(function() {
            var s = e(this),
                n = s.data("bs.tooltip"),
                o = "object" == typeof t && t;
            (n || !/destroy|hide/.test(t)) && (n || s.data("bs.tooltip", n = new i(this, o)), "string" == typeof t && n[t]())
        })
    }
    var i = function(e, t) { this.type = null, this.options = null, this.enabled = null, this.timeout = null, this.hoverState = null, this.$element = null, this.init("tooltip", e, t) };
    i.VERSION = "3.3.4", i.TRANSITION_DURATION = 150, i.DEFAULTS = { animation: !0, placement: "top", selector: !1, template: '<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>', trigger: "hover focus", title: "", delay: 0, html: !1, container: !1, viewport: { selector: "body", padding: 0 } }, i.prototype.init = function(t, i, s) {
        if (this.enabled = !0, this.type = t, this.$element = e(i), this.options = this.getOptions(s), this.$viewport = this.options.viewport && e(this.options.viewport.selector || this.options.viewport), this.$element[0] instanceof document.constructor && !this.options.selector) throw new Error("`selector` option must be specified when initializing " + this.type + " on the window.document object!");
        for (var n = this.options.trigger.split(" "), o = n.length; o--;) {
            var r = n[o];
            if ("click" == r) this.$element.on("click." + this.type, this.options.selector, e.proxy(this.toggle, this));
            else if ("manual" != r) {
                var a = "hover" == r ? "mouseenter" : "focusin",
                    l = "hover" == r ? "mouseleave" : "focusout";
                this.$element.on(a + "." + this.type, this.options.selector, e.proxy(this.enter, this)), this.$element.on(l + "." + this.type, this.options.selector, e.proxy(this.leave, this))
            }
        }
        this.options.selector ? this._options = e.extend({}, this.options, { trigger: "manual", selector: "" }) : this.fixTitle()
    }, i.prototype.getDefaults = function() { return i.DEFAULTS }, i.prototype.getOptions = function(t) { return t = e.extend({}, this.getDefaults(), this.$element.data(), t), t.delay && "number" == typeof t.delay && (t.delay = { show: t.delay, hide: t.delay }), t }, i.prototype.getDelegateOptions = function() {
        var t = {},
            i = this.getDefaults();
        return this._options && e.each(this._options, function(e, s) { i[e] != s && (t[e] = s) }), t
    }, i.prototype.enter = function(t) { var i = t instanceof this.constructor ? t : e(t.currentTarget).data("bs." + this.type); return i && i.$tip && i.$tip.is(":visible") ? void(i.hoverState = "in") : (i || (i = new this.constructor(t.currentTarget, this.getDelegateOptions()), e(t.currentTarget).data("bs." + this.type, i)), clearTimeout(i.timeout), i.hoverState = "in", i.options.delay && i.options.delay.show ? void(i.timeout = setTimeout(function() { "in" == i.hoverState && i.show() }, i.options.delay.show)) : i.show()) }, i.prototype.leave = function(t) { var i = t instanceof this.constructor ? t : e(t.currentTarget).data("bs." + this.type); return i || (i = new this.constructor(t.currentTarget, this.getDelegateOptions()), e(t.currentTarget).data("bs." + this.type, i)), clearTimeout(i.timeout), i.hoverState = "out", i.options.delay && i.options.delay.hide ? void(i.timeout = setTimeout(function() { "out" == i.hoverState && i.hide() }, i.options.delay.hide)) : i.hide() }, i.prototype.show = function() {
        var t = e.Event("show.bs." + this.type);
        if (this.hasContent() && this.enabled) {
            this.$element.trigger(t);
            var s = e.contains(this.$element[0].ownerDocument.documentElement, this.$element[0]);
            if (t.isDefaultPrevented() || !s) return;
            var n = this,
                o = this.tip(),
                r = this.getUID(this.type);
            this.setContent(), o.attr("id", r), this.$element.attr("aria-describedby", r), this.options.animation && o.addClass("fade");
            var a = "function" == typeof this.options.placement ? this.options.placement.call(this, o[0], this.$element[0]) : this.options.placement,
                l = /\s?auto?\s?/i,
                h = l.test(a);
            h && (a = a.replace(l, "") || "top"), o.detach().css({ top: 0, left: 0, display: "block" }).addClass(a).data("bs." + this.type, this), this.options.container ? o.appendTo(this.options.container) : o.insertAfter(this.$element);
            var c = this.getPosition(),
                u = o[0].offsetWidth,
                d = o[0].offsetHeight;
            if (h) {
                var p = a,
                    f = this.options.container ? e(this.options.container) : this.$element.parent(),
                    m = this.getPosition(f);
                a = "bottom" == a && c.bottom + d > m.bottom ? "top" : "top" == a && c.top - d < m.top ? "bottom" : "right" == a && c.right + u > m.width ? "left" : "left" == a && c.left - u < m.left ? "right" : a, o.removeClass(p).addClass(a)
            }
            var g = this.getCalculatedOffset(a, c, u, d);
            this.applyPlacement(g, a);
            var v = function() {
                var e = n.hoverState;
                n.$element.trigger("shown.bs." + n.type), n.hoverState = null, "out" == e && n.leave(n)
            };
            e.support.transition && this.$tip.hasClass("fade") ? o.one("bsTransitionEnd", v).emulateTransitionEnd(i.TRANSITION_DURATION) : v()
        }
    }, i.prototype.applyPlacement = function(t, i) {
        var s = this.tip(),
            n = s[0].offsetWidth,
            o = s[0].offsetHeight,
            r = parseInt(s.css("margin-top"), 10),
            a = parseInt(s.css("margin-left"), 10);
        isNaN(r) && (r = 0), isNaN(a) && (a = 0), t.top = t.top + r, t.left = t.left + a, e.offset.setOffset(s[0], e.extend({ using: function(e) { s.css({ top: Math.round(e.top), left: Math.round(e.left) }) } }, t), 0), s.addClass("in");
        var l = s[0].offsetWidth,
            h = s[0].offsetHeight;
        "top" == i && h != o && (t.top = t.top + o - h);
        var c = this.getViewportAdjustedDelta(i, t, l, h);
        c.left ? t.left += c.left : t.top += c.top;
        var u = /top|bottom/.test(i),
            d = u ? 2 * c.left - n + l : 2 * c.top - o + h,
            p = u ? "offsetWidth" : "offsetHeight";
        s.offset(t), this.replaceArrow(d, s[0][p], u)
    }, i.prototype.replaceArrow = function(e, t, i) { this.arrow().css(i ? "left" : "top", 50 * (1 - e / t) + "%").css(i ? "top" : "left", "") }, i.prototype.setContent = function() {
        var e = this.tip(),
            t = this.getTitle();
        e.find(".tooltip-inner")[this.options.html ? "html" : "text"](t), e.removeClass("fade in top bottom left right")
    }, i.prototype.hide = function(t) {
        function s() { "in" != n.hoverState && o.detach(), n.$element.removeAttr("aria-describedby").trigger("hidden.bs." + n.type), t && t() }
        var n = this,
            o = e(this.$tip),
            r = e.Event("hide.bs." + this.type);
        return this.$element.trigger(r), r.isDefaultPrevented() ? void 0 : (o.removeClass("in"), e.support.transition && o.hasClass("fade") ? o.one("bsTransitionEnd", s).emulateTransitionEnd(i.TRANSITION_DURATION) : s(), this.hoverState = null, this)
    }, i.prototype.fixTitle = function() {
        var e = this.$element;
        (e.attr("title") || "string" != typeof e.attr("data-original-title")) && e.attr("data-original-title", e.attr("title") || "").attr("title", "")
    }, i.prototype.hasContent = function() { return this.getTitle() }, i.prototype.getPosition = function(t) {
        t = t || this.$element;
        var i = t[0],
            s = "BODY" == i.tagName,
            n = i.getBoundingClientRect();
        null == n.width && (n = e.extend({}, n, { width: n.right - n.left, height: n.bottom - n.top }));
        var o = s ? { top: 0, left: 0 } : t.offset(),
            r = { scroll: s ? document.documentElement.scrollTop || document.body.scrollTop : t.scrollTop() },
            a = s ? { width: e(window).width(), height: e(window).height() } : null;
        return e.extend({}, n, r, a, o)
    }, i.prototype.getCalculatedOffset = function(e, t, i, s) { return "bottom" == e ? { top: t.top + t.height, left: t.left + t.width / 2 - i / 2 } : "top" == e ? { top: t.top - s, left: t.left + t.width / 2 - i / 2 } : "left" == e ? { top: t.top + t.height / 2 - s / 2, left: t.left - i } : { top: t.top + t.height / 2 - s / 2, left: t.left + t.width } }, i.prototype.getViewportAdjustedDelta = function(e, t, i, s) {
        var n = { top: 0, left: 0 };
        if (!this.$viewport) return n;
        var o = this.options.viewport && this.options.viewport.padding || 0,
            r = this.getPosition(this.$viewport);
        if (/right|left/.test(e)) {
            var a = t.top - o - r.scroll,
                l = t.top + o - r.scroll + s;
            a < r.top ? n.top = r.top - a : l > r.top + r.height && (n.top = r.top + r.height - l)
        } else {
            var h = t.left - o,
                c = t.left + o + i;
            h < r.left ? n.left = r.left - h : c > r.width && (n.left = r.left + r.width - c)
        }
        return n
    }, i.prototype.getTitle = function() {
        var e, t = this.$element,
            i = this.options;
        return e = t.attr("data-original-title") || ("function" == typeof i.title ? i.title.call(t[0]) : i.title)
    }, i.prototype.getUID = function(e) { do e += ~~(1e6 * Math.random()); while (document.getElementById(e)); return e }, i.prototype.tip = function() { return this.$tip = this.$tip || e(this.options.template) }, i.prototype.arrow = function() { return this.$arrow = this.$arrow || this.tip().find(".tooltip-arrow") }, i.prototype.enable = function() { this.enabled = !0 }, i.prototype.disable = function() { this.enabled = !1 }, i.prototype.toggleEnabled = function() { this.enabled = !this.enabled }, i.prototype.toggle = function(t) {
        var i = this;
        t && (i = e(t.currentTarget).data("bs." + this.type), i || (i = new this.constructor(t.currentTarget, this.getDelegateOptions()), e(t.currentTarget).data("bs." + this.type, i))), i.tip().hasClass("in") ? i.leave(i) : i.enter(i)
    }, i.prototype.destroy = function() {
        var e = this;
        clearTimeout(this.timeout), this.hide(function() { e.$element.off("." + e.type).removeData("bs." + e.type) })
    };
    var s = e.fn.tooltip;
    e.fn.tooltip = t, e.fn.tooltip.Constructor = i, e.fn.tooltip.noConflict = function() { return e.fn.tooltip = s, this }
}(jQuery), + function(e) {
    "use strict";

    function t(t) {
        return this.each(function() {
            var s = e(this),
                n = s.data("bs.popover"),
                o = "object" == typeof t && t;
            (n || !/destroy|hide/.test(t)) && (n || s.data("bs.popover", n = new i(this, o)), "string" == typeof t && n[t]())
        })
    }
    var i = function(e, t) { this.init("popover", e, t) };
    if (!e.fn.tooltip) throw new Error("Popover requires tooltip.js");
    i.VERSION = "3.3.4", i.DEFAULTS = e.extend({}, e.fn.tooltip.Constructor.DEFAULTS, { placement: "right", trigger: "click", content: "", template: '<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>' }), i.prototype = e.extend({}, e.fn.tooltip.Constructor.prototype), i.prototype.constructor = i, i.prototype.getDefaults = function() { return i.DEFAULTS }, i.prototype.setContent = function() {
        var e = this.tip(),
            t = this.getTitle(),
            i = this.getContent();
        e.find(".popover-title")[this.options.html ? "html" : "text"](t), e.find(".popover-content").children().detach().end()[this.options.html ? "string" == typeof i ? "html" : "append" : "text"](i), e.removeClass("fade top bottom left right in"), e.find(".popover-title").html() || e.find(".popover-title").hide()
    }, i.prototype.hasContent = function() { return this.getTitle() || this.getContent() }, i.prototype.getContent = function() {
        var e = this.$element,
            t = this.options;
        return e.attr("data-content") || ("function" == typeof t.content ? t.content.call(e[0]) : t.content)
    }, i.prototype.arrow = function() { return this.$arrow = this.$arrow || this.tip().find(".arrow") };
    var s = e.fn.popover;
    e.fn.popover = t, e.fn.popover.Constructor = i, e.fn.popover.noConflict = function() { return e.fn.popover = s, this }
}(jQuery), + function(e) {
    "use strict";

    function t(i, s) { this.$body = e(document.body), this.$scrollElement = e(e(i).is(document.body) ? window : i), this.options = e.extend({}, t.DEFAULTS, s), this.selector = (this.options.target || "") + " .nav li > a", this.offsets = [], this.targets = [], this.activeTarget = null, this.scrollHeight = 0, this.$scrollElement.on("scroll.bs.scrollspy", e.proxy(this.process, this)), this.refresh(), this.process() }

    function i(i) {
        return this.each(function() {
            var s = e(this),
                n = s.data("bs.scrollspy"),
                o = "object" == typeof i && i;
            n || s.data("bs.scrollspy", n = new t(this, o)), "string" == typeof i && n[i]()
        })
    }
    t.VERSION = "3.3.4", t.DEFAULTS = { offset: 10 }, t.prototype.getScrollHeight = function() { return this.$scrollElement[0].scrollHeight || Math.max(this.$body[0].scrollHeight, document.documentElement.scrollHeight) }, t.prototype.refresh = function() {
        var t = this,
            i = "offset",
            s = 0;
        this.offsets = [], this.targets = [], this.scrollHeight = this.getScrollHeight(), e.isWindow(this.$scrollElement[0]) || (i = "position", s = this.$scrollElement.scrollTop()), this.$body.find(this.selector).map(function() {
            var t = e(this),
                n = t.data("target") || t.attr("href"),
                o = /^#./.test(n) && e(n);
            return o && o.length && o.is(":visible") && [
                [o[i]().top + s, n]
            ] || null
        }).sort(function(e, t) { return e[0] - t[0] }).each(function() { t.offsets.push(this[0]), t.targets.push(this[1]) })
    }, t.prototype.process = function() {
        var e, t = this.$scrollElement.scrollTop() + this.options.offset,
            i = this.getScrollHeight(),
            s = this.options.offset + i - this.$scrollElement.height(),
            n = this.offsets,
            o = this.targets,
            r = this.activeTarget;
        if (this.scrollHeight != i && this.refresh(), t >= s) return r != (e = o[o.length - 1]) && this.activate(e);
        if (r && t < n[0]) return this.activeTarget = null, this.clear();
        for (e = n.length; e--;) r != o[e] && t >= n[e] && (void 0 === n[e + 1] || t < n[e + 1]) && this.activate(o[e])
    }, t.prototype.activate = function(t) {
        this.activeTarget = t, this.clear();
        var i = this.selector + '[data-target="' + t + '"],' + this.selector + '[href="' + t + '"]',
            s = e(i).parents("li").addClass("active");
        s.parent(".dropdown-menu").length && (s = s.closest("li.dropdown").addClass("active")), s.trigger("activate.bs.scrollspy")
    }, t.prototype.clear = function() { e(this.selector).parentsUntil(this.options.target, ".active").removeClass("active") };
    var s = e.fn.scrollspy;
    e.fn.scrollspy = i, e.fn.scrollspy.Constructor = t, e.fn.scrollspy.noConflict = function() { return e.fn.scrollspy = s, this }, e(window).on("load.bs.scrollspy.data-api", function() {
        e('[data-spy="scroll"]').each(function() {
            var t = e(this);
            i.call(t, t.data())
        })
    })
}(jQuery), + function(e) {
    "use strict";

    function t(t) {
        return this.each(function() {
            var s = e(this),
                n = s.data("bs.tab");
            n || s.data("bs.tab", n = new i(this)), "string" == typeof t && n[t]()
        })
    }
    var i = function(t) { this.element = e(t) };
    i.VERSION = "3.3.4", i.TRANSITION_DURATION = 150, i.prototype.show = function() {
        var t = this.element,
            i = t.closest("ul:not(.dropdown-menu)"),
            s = t.data("target");
        if (s || (s = t.attr("href"), s = s && s.replace(/.*(?=#[^\s]*$)/, "")), !t.parent("li").hasClass("active")) {
            var n = i.find(".active:last a"),
                o = e.Event("hide.bs.tab", { relatedTarget: t[0] }),
                r = e.Event("show.bs.tab", { relatedTarget: n[0] });
            if (n.trigger(o), t.trigger(r), !r.isDefaultPrevented() && !o.isDefaultPrevented()) {
                var a = e(s);
                this.activate(t.closest("li"), i), this.activate(a, a.parent(), function() { n.trigger({ type: "hidden.bs.tab", relatedTarget: t[0] }), t.trigger({ type: "shown.bs.tab", relatedTarget: n[0] }) })
            }
        }
    }, i.prototype.activate = function(t, s, n) {
        function o() { r.removeClass("active").find("> .dropdown-menu > .active").removeClass("active").end().find('[data-toggle="tab"]').attr("aria-expanded", !1), t.addClass("active").find('[data-toggle="tab"]').attr("aria-expanded", !0), a ? (t[0].offsetWidth, t.addClass("in")) : t.removeClass("fade"), t.parent(".dropdown-menu").length && t.closest("li.dropdown").addClass("active").end().find('[data-toggle="tab"]').attr("aria-expanded", !0), n && n() }
        var r = s.find("> .active"),
            a = n && e.support.transition && (r.length && r.hasClass("fade") || !!s.find("> .fade").length);
        r.length && a ? r.one("bsTransitionEnd", o).emulateTransitionEnd(i.TRANSITION_DURATION) : o(), r.removeClass("in")
    };
    var s = e.fn.tab;
    e.fn.tab = t, e.fn.tab.Constructor = i, e.fn.tab.noConflict = function() { return e.fn.tab = s, this };
    var n = function(i) { i.preventDefault(), t.call(e(this), "show") };
    e(document).on("click.bs.tab.data-api", '[data-toggle="tab"]', n).on("click.bs.tab.data-api", '[data-toggle="pill"]', n)
}(jQuery), + function(e) {
    "use strict";

    function t(t) {
        return this.each(function() {
            var s = e(this),
                n = s.data("bs.affix"),
                o = "object" == typeof t && t;
            n || s.data("bs.affix", n = new i(this, o)), "string" == typeof t && n[t]()
        })
    }
    var i = function(t, s) {
        this.options = e.extend({}, i.DEFAULTS, s), this.$target = e(this.options.target).on("scroll.bs.affix.data-api", e.proxy(this.checkPosition, this)).on("click.bs.affix.data-api", e.proxy(this.checkPositionWithEventLoop, this)),
            this.$element = e(t), this.affixed = null, this.unpin = null, this.pinnedOffset = null, this.checkPosition()
    };
    i.VERSION = "3.3.4", i.RESET = "affix affix-top affix-bottom", i.DEFAULTS = { offset: 0, target: window }, i.prototype.getState = function(e, t, i, s) {
        var n = this.$target.scrollTop(),
            o = this.$element.offset(),
            r = this.$target.height();
        if (null != i && "top" == this.affixed) return i > n ? "top" : !1;
        if ("bottom" == this.affixed) return null != i ? n + this.unpin <= o.top ? !1 : "bottom" : e - s >= n + r ? !1 : "bottom";
        var a = null == this.affixed,
            l = a ? n : o.top,
            h = a ? r : t;
        return null != i && i >= n ? "top" : null != s && l + h >= e - s ? "bottom" : !1
    }, i.prototype.getPinnedOffset = function() {
        if (this.pinnedOffset) return this.pinnedOffset;
        this.$element.removeClass(i.RESET).addClass("affix");
        var e = this.$target.scrollTop(),
            t = this.$element.offset();
        return this.pinnedOffset = t.top - e
    }, i.prototype.checkPositionWithEventLoop = function() { setTimeout(e.proxy(this.checkPosition, this), 1) }, i.prototype.checkPosition = function() {
        if (this.$element.is(":visible")) {
            var t = this.$element.height(),
                s = this.options.offset,
                n = s.top,
                o = s.bottom,
                r = e(document.body).height();
            "object" != typeof s && (o = n = s), "function" == typeof n && (n = s.top(this.$element)), "function" == typeof o && (o = s.bottom(this.$element));
            var a = this.getState(r, t, n, o);
            if (this.affixed != a) {
                null != this.unpin && this.$element.css("top", "");
                var l = "affix" + (a ? "-" + a : ""),
                    h = e.Event(l + ".bs.affix");
                if (this.$element.trigger(h), h.isDefaultPrevented()) return;
                this.affixed = a, this.unpin = "bottom" == a ? this.getPinnedOffset() : null, this.$element.removeClass(i.RESET).addClass(l).trigger(l.replace("affix", "affixed") + ".bs.affix")
            }
            "bottom" == a && this.$element.offset({ top: r - t - o })
        }
    };
    var s = e.fn.affix;
    e.fn.affix = t, e.fn.affix.Constructor = i, e.fn.affix.noConflict = function() { return e.fn.affix = s, this }, e(window).on("load", function() {
        e('[data-spy="affix"]').each(function() {
            var i = e(this),
                s = i.data();
            s.offset = s.offset || {}, null != s.offsetBottom && (s.offset.bottom = s.offsetBottom), null != s.offsetTop && (s.offset.top = s.offsetTop), t.call(i, s)
        })
    })
}(jQuery), ! function e(t, i, s) {
    function n(r, a) {
        if (!i[r]) {
            if (!t[r]) { var l = "function" == typeof require && require; if (!a && l) return l(r, !0); if (o) return o(r, !0); var h = new Error("Cannot find module '" + r + "'"); throw h.code = "MODULE_NOT_FOUND", h }
            var c = i[r] = { exports: {} };
            t[r][0].call(c.exports, function(e) { var i = t[r][1][e]; return n(i ? i : e) }, c, c.exports, e, t, i, s)
        }
        return i[r].exports
    }
    for (var o = "function" == typeof require && require, r = 0; r < s.length; r++) n(s[r]);
    return n
}({
    1: [function(e, t) {
        ! function() {
            "use strict";

            function e(t, i) {
                function n(e, t) { return function() { return e.apply(t, arguments) } }
                var o;
                if (i = i || {}, this.trackingClick = !1, this.trackingClickStart = 0, this.targetElement = null, this.touchStartX = 0, this.touchStartY = 0, this.lastTouchIdentifier = 0, this.touchBoundary = i.touchBoundary || 10, this.layer = t, this.tapDelay = i.tapDelay || 200, this.tapTimeout = i.tapTimeout || 700, !e.notNeeded(t)) {
                    for (var r = ["onMouse", "onClick", "onTouchStart", "onTouchMove", "onTouchEnd", "onTouchCancel"], a = this, l = 0, h = r.length; h > l; l++) a[r[l]] = n(a[r[l]], a);
                    s && (t.addEventListener("mouseover", this.onMouse, !0), t.addEventListener("mousedown", this.onMouse, !0), t.addEventListener("mouseup", this.onMouse, !0)), t.addEventListener("click", this.onClick, !0), t.addEventListener("touchstart", this.onTouchStart, !1), t.addEventListener("touchmove", this.onTouchMove, !1), t.addEventListener("touchend", this.onTouchEnd, !1), t.addEventListener("touchcancel", this.onTouchCancel, !1), Event.prototype.stopImmediatePropagation || (t.removeEventListener = function(e, i, s) { var n = Node.prototype.removeEventListener; "click" === e ? n.call(t, e, i.hijacked || i, s) : n.call(t, e, i, s) }, t.addEventListener = function(e, i, s) { var n = Node.prototype.addEventListener; "click" === e ? n.call(t, e, i.hijacked || (i.hijacked = function(e) { e.propagationStopped || i(e) }), s) : n.call(t, e, i, s) }), "function" == typeof t.onclick && (o = t.onclick, t.addEventListener("click", function(e) { o(e) }, !1), t.onclick = null)
                }
            }
            var i = navigator.userAgent.indexOf("Windows Phone") >= 0,
                s = navigator.userAgent.indexOf("Android") > 0 && !i,
                n = /iP(ad|hone|od)/.test(navigator.userAgent) && !i,
                o = n && /OS 4_\d(_\d)?/.test(navigator.userAgent),
                r = n && /OS [6-7]_\d/.test(navigator.userAgent),
                a = navigator.userAgent.indexOf("BB10") > 0;
            e.prototype.needsClick = function(e) {
                switch (e.nodeName.toLowerCase()) {
                    case "button":
                    case "select":
                    case "textarea":
                        if (e.disabled) return !0;
                        break;
                    case "input":
                        if (n && "file" === e.type || e.disabled) return !0;
                        break;
                    case "label":
                    case "iframe":
                    case "video":
                        return !0
                }
                return /\bneedsclick\b/.test(e.className)
            }, e.prototype.needsFocus = function(e) {
                switch (e.nodeName.toLowerCase()) {
                    case "textarea":
                        return !0;
                    case "select":
                        return !s;
                    case "input":
                        switch (e.type) {
                            case "button":
                            case "checkbox":
                            case "file":
                            case "image":
                            case "radio":
                            case "submit":
                                return !1
                        }
                        return !e.disabled && !e.readOnly;
                    default:
                        return /\bneedsfocus\b/.test(e.className)
                }
            }, e.prototype.sendClick = function(e, t) {
                var i, s;
                document.activeElement && document.activeElement !== e && document.activeElement.blur(), s = t.changedTouches[0], i = document.createEvent("MouseEvents"), i.initMouseEvent(this.determineEventType(e), !0, !0, window, 1, s.screenX, s.screenY, s.clientX, s.clientY, !1, !1, !1, !1, 0, null), i.forwardedTouchEvent = !0, e.dispatchEvent(i)
            }, e.prototype.determineEventType = function(e) { return s && "select" === e.tagName.toLowerCase() ? "mousedown" : "click" }, e.prototype.focus = function(e) {
                var t;
                n && e.setSelectionRange && 0 !== e.type.indexOf("date") && "time" !== e.type && "month" !== e.type ? (t = e.value.length, e.setSelectionRange(t, t)) : e.focus()
            }, e.prototype.updateScrollParent = function(e) {
                var t, i;
                if (t = e.fastClickScrollParent, !t || !t.contains(e)) {
                    i = e;
                    do {
                        if (i.scrollHeight > i.offsetHeight) { t = i, e.fastClickScrollParent = i; break }
                        i = i.parentElement
                    } while (i)
                }
                t && (t.fastClickLastScrollTop = t.scrollTop)
            }, e.prototype.getTargetElementFromEventTarget = function(e) { return e.nodeType === Node.TEXT_NODE ? e.parentNode : e }, e.prototype.onTouchStart = function(e) {
                var t, i, s;
                if (e.targetTouches.length > 1) return !0;
                if (t = this.getTargetElementFromEventTarget(e.target), i = e.targetTouches[0], n) {
                    if (s = window.getSelection(), s.rangeCount && !s.isCollapsed) return !0;
                    if (!o) {
                        if (i.identifier && i.identifier === this.lastTouchIdentifier) return e.preventDefault(), !1;
                        this.lastTouchIdentifier = i.identifier, this.updateScrollParent(t)
                    }
                }
                return this.trackingClick = !0, this.trackingClickStart = e.timeStamp, this.targetElement = t, this.touchStartX = i.pageX, this.touchStartY = i.pageY, e.timeStamp - this.lastClickTime < this.tapDelay && e.preventDefault(), !0
            }, e.prototype.touchHasMoved = function(e) {
                var t = e.changedTouches[0],
                    i = this.touchBoundary;
                return Math.abs(t.pageX - this.touchStartX) > i || Math.abs(t.pageY - this.touchStartY) > i ? !0 : !1
            }, e.prototype.onTouchMove = function(e) { return this.trackingClick ? ((this.targetElement !== this.getTargetElementFromEventTarget(e.target) || this.touchHasMoved(e)) && (this.trackingClick = !1, this.targetElement = null), !0) : !0 }, e.prototype.findControl = function(e) { return void 0 !== e.control ? e.control : e.htmlFor ? document.getElementById(e.htmlFor) : e.querySelector("button, input:not([type=hidden]), keygen, meter, output, progress, select, textarea") }, e.prototype.onTouchEnd = function(e) {
                var t, i, a, l, h, c = this.targetElement;
                if (!this.trackingClick) return !0;
                if (e.timeStamp - this.lastClickTime < this.tapDelay) return this.cancelNextClick = !0, !0;
                if (e.timeStamp - this.trackingClickStart > this.tapTimeout) return !0;
                if (this.cancelNextClick = !1, this.lastClickTime = e.timeStamp, i = this.trackingClickStart, this.trackingClick = !1, this.trackingClickStart = 0, r && (h = e.changedTouches[0], c = document.elementFromPoint(h.pageX - window.pageXOffset, h.pageY - window.pageYOffset) || c, c.fastClickScrollParent = this.targetElement.fastClickScrollParent), a = c.tagName.toLowerCase(), "label" === a) {
                    if (t = this.findControl(c)) {
                        if (this.focus(c), s) return !1;
                        c = t
                    }
                } else if (this.needsFocus(c)) return e.timeStamp - i > 100 || n && window.top !== window && "input" === a ? (this.targetElement = null, !1) : (this.focus(c), this.sendClick(c, e), n && "select" === a || (this.targetElement = null, e.preventDefault()), !1);
                return n && !o && (l = c.fastClickScrollParent, l && l.fastClickLastScrollTop !== l.scrollTop) ? !0 : (this.needsClick(c) || (e.preventDefault(), this.sendClick(c, e)), !1)
            }, e.prototype.onTouchCancel = function() { this.trackingClick = !1, this.targetElement = null }, e.prototype.onMouse = function(e) { return this.targetElement ? e.forwardedTouchEvent ? !0 : !e.cancelable || this.needsClick(this.targetElement) && !this.cancelNextClick ? !0 : (e.stopImmediatePropagation ? e.stopImmediatePropagation() : e.propagationStopped = !0, e.stopPropagation(), e.preventDefault(), !1) : !0 }, e.prototype.onClick = function(e) { var t; return this.trackingClick ? (this.targetElement = null, this.trackingClick = !1, !0) : "submit" === e.target.type && 0 === e.detail ? !0 : (t = this.onMouse(e), t || (this.targetElement = null), t) }, e.prototype.destroy = function() {
                var e = this.layer;
                s && (e.removeEventListener("mouseover", this.onMouse, !0), e.removeEventListener("mousedown", this.onMouse, !0), e.removeEventListener("mouseup", this.onMouse, !0)), e.removeEventListener("click", this.onClick, !0), e.removeEventListener("touchstart", this.onTouchStart, !1), e.removeEventListener("touchmove", this.onTouchMove, !1), e.removeEventListener("touchend", this.onTouchEnd, !1), e.removeEventListener("touchcancel", this.onTouchCancel, !1)
            }, e.notNeeded = function(e) { var t, i, n, o; if ("undefined" == typeof window.ontouchstart) return !0; if (i = +(/Chrome\/([0-9]+)/.exec(navigator.userAgent) || [, 0])[1]) { if (!s) return !0; if (t = document.querySelector("meta[name=viewport]")) { if (-1 !== t.content.indexOf("user-scalable=no")) return !0; if (i > 31 && document.documentElement.scrollWidth <= window.outerWidth) return !0 } } if (a && (n = navigator.userAgent.match(/Version\/([0-9]*)\.([0-9]*)/), n[1] >= 10 && n[2] >= 3 && (t = document.querySelector("meta[name=viewport]")))) { if (-1 !== t.content.indexOf("user-scalable=no")) return !0; if (document.documentElement.scrollWidth <= window.outerWidth) return !0 } return "none" === e.style.msTouchAction || "manipulation" === e.style.touchAction ? !0 : (o = +(/Firefox\/([0-9]+)/.exec(navigator.userAgent) || [, 0])[1], o >= 27 && (t = document.querySelector("meta[name=viewport]"), t && (-1 !== t.content.indexOf("user-scalable=no") || document.documentElement.scrollWidth <= window.outerWidth)) ? !0 : "none" === e.style.touchAction || "manipulation" === e.style.touchAction ? !0 : !1) }, e.attach = function(t, i) { return new e(t, i) }, "function" == typeof define && "object" == typeof define.amd && define.amd ? define(function() { return e }) : "undefined" != typeof t && t.exports ? (t.exports = e.attach, t.exports.FastClick = e) : window.FastClick = e
        }()
    }, {}],
    2: [function(e) { window.Origami = { fastclick: e("./bower_components/fastclick/lib/fastclick.js") } }, { "./bower_components/fastclick/lib/fastclick.js": 1 }]
}, {}, [2]),
function() {
    function e() { document.dispatchEvent(new CustomEvent("o.load")) }
    document.addEventListener("load", e), "ready" === document.readyState && e()
}(),
function() {
    function e() { document.dispatchEvent(new CustomEvent("o.DOMContentLoaded")) }
    document.addEventListener("DOMContentLoaded", e), "interactive" === document.readyState && e()
}(),
function(e) {
    e.fn.extend({
        slimScroll: function(i) {
            var s = { width: "auto", height: "250px", size: "7px", color: "#000", position: "right", distance: "1px", start: "top", opacity: .4, alwaysVisible: !1, disableFadeOut: !1, railVisible: !1, railColor: "#333", railOpacity: .2, railDraggable: !0, railClass: "slimScrollRail", barClass: "slimScrollBar", wrapperClass: "slimScrollDiv", allowPageScroll: !1, wheelStep: 20, touchScrollStep: 200, borderRadius: "7px", railBorderRadius: "7px" },
                n = e.extend(s, i);
            return this.each(function() {
                function s(t) {
                    if (c) {
                        var t = t || window.event,
                            i = 0;
                        t.wheelDelta && (i = -t.wheelDelta / 120), t.detail && (i = t.detail / 3);
                        var s = t.target || t.srcTarget || t.srcElement;
                        e(s).closest("." + n.wrapperClass).is(w.parent()) && o(i, !0), t.preventDefault && !x && t.preventDefault(), x || (t.returnValue = !1)
                    }
                }

                function o(e, t, i) {
                    x = !1;
                    var s = e,
                        o = w.outerHeight() - k.outerHeight();
                    if (t && (s = parseInt(k.css("top")) + e * parseInt(n.wheelStep) / 100 * k.outerHeight(), s = Math.min(Math.max(s, 0), o), s = e > 0 ? Math.ceil(s) : Math.floor(s), k.css({ top: s + "px" })), g = parseInt(k.css("top")) / (w.outerHeight() - k.outerHeight()), s = g * (w[0].scrollHeight - w.outerHeight()), i) {
                        s = e;
                        var r = s / w[0].scrollHeight * w.outerHeight();
                        r = Math.min(Math.max(r, 0), o), k.css({ top: r + "px" })
                    }
                    w.scrollTop(s), w.trigger("slimscrolling", ~~s), l(), h()
                }

                function r() { window.addEventListener ? (this.addEventListener("DOMMouseScroll", s, !1), this.addEventListener("mousewheel", s, !1)) : document.attachEvent("onmousewheel", s) }

                function a() {
                    m = Math.max(w.outerHeight() / w[0].scrollHeight * w.outerHeight(), y), k.css({ height: m + "px" });
                    var e = m == w.outerHeight() ? "none" : "block";
                    k.css({ display: e })
                }

                function l() {
                    if (a(), clearTimeout(p), g == ~~g) {
                        if (x = n.allowPageScroll, v != g) {
                            var e = 0 == ~~g ? "top" : "bottom";
                            w.trigger("slimscroll", e)
                        }
                    } else x = !1;
                    return v = g, m >= w.outerHeight() ? void(x = !0) : (k.stop(!0, !0).fadeIn("fast"), void(n.railVisible && T.stop(!0, !0).fadeIn("fast")))
                }

                function h() { n.alwaysVisible || (p = setTimeout(function() { n.disableFadeOut && c || u || d || (k.fadeOut("slow"), T.fadeOut("slow")) }, 1e3)) }
                var c, u, d, p, f, m, g, v, b = "<div></div>",
                    y = 30,
                    x = !1,
                    w = e(this);
                if (w.parent().hasClass(n.wrapperClass)) {
                    var _ = w.scrollTop();
                    if (k = w.parent().find("." + n.barClass), T = w.parent().find("." + n.railClass), a(), e.isPlainObject(i)) {
                        if ("height" in i && "auto" == i.height) {
                            w.parent().css("height", "auto"), w.css("height", "auto");
                            var C = w.parent().parent().height();
                            w.parent().css("height", C), w.css("height", C)
                        }
                        if ("scrollTo" in i) _ = parseInt(n.scrollTo);
                        else if ("scrollBy" in i) _ += parseInt(n.scrollBy);
                        else if ("destroy" in i) return k.remove(), T.remove(), void w.unwrap();
                        o(_, !1, !0)
                    }
                } else if (!(e.isPlainObject(i) && "destroy" in i)) {
                    n.height = "auto" == n.height ? w.parent().height() : n.height;
                    var I = e(b).addClass(n.wrapperClass).css({ position: "relative", overflow: "hidden", width: n.width, height: n.height });
                    w.css({ overflow: "hidden", width: n.width, height: n.height, "-ms-touch-action": "none" });
                    var T = e(b).addClass(n.railClass).css({ width: n.size, height: "100%", position: "absolute", top: 0, display: n.alwaysVisible && n.railVisible ? "block" : "none", "border-radius": n.railBorderRadius, background: n.railColor, opacity: n.railOpacity, zIndex: 90 }),
                        k = e(b).addClass(n.barClass).css({ background: n.color, width: n.size, position: "absolute", top: 0, opacity: n.opacity, display: n.alwaysVisible ? "block" : "none", "border-radius": n.borderRadius, BorderRadius: n.borderRadius, MozBorderRadius: n.borderRadius, WebkitBorderRadius: n.borderRadius, zIndex: 99 }),
                        S = "right" == n.position ? { right: n.distance } : { left: n.distance };
                    T.css(S), k.css(S), w.wrap(I), w.parent().append(k), w.parent().append(T), n.railDraggable && k.bind("mousedown", function(i) { var s = e(document); return d = !0, t = parseFloat(k.css("top")), pageY = i.pageY, s.bind("mousemove.slimscroll", function(e) { currTop = t + e.pageY - pageY, k.css("top", currTop), o(0, k.position().top, !1) }), s.bind("mouseup.slimscroll", function(e) { d = !1, h(), s.unbind(".slimscroll") }), !1 }).bind("selectstart.slimscroll", function(e) { return e.stopPropagation(), e.preventDefault(), !1 }), T.hover(function() { l() }, function() { h() }), k.hover(function() { u = !0 }, function() { u = !1 }), w.hover(function() { c = !0, l(), h() }, function() { c = !1, h() }), window.navigator.msPointerEnabled ? (w.bind("MSPointerDown", function(e, t) { e.originalEvent.targetTouches.length && (f = e.originalEvent.targetTouches[0].pageY) }), w.bind("MSPointerMove", function(e) {
                        if (e.originalEvent.preventDefault(), e.originalEvent.targetTouches.length) {
                            var t = (f - e.originalEvent.targetTouches[0].pageY) / n.touchScrollStep;
                            o(t, !0), f = e.originalEvent.targetTouches[0].pageY
                        }
                    })) : (w.bind("touchstart", function(e, t) { e.originalEvent.touches.length && (f = e.originalEvent.touches[0].pageY) }), w.bind("touchmove", function(e) {
                        if (x || e.originalEvent.preventDefault(), e.originalEvent.touches.length) {
                            var t = (f - e.originalEvent.touches[0].pageY) / n.touchScrollStep;
                            o(t, !0), f = e.originalEvent.touches[0].pageY
                        }
                    })), a(), "bottom" === n.start ? (k.css({ top: w.outerHeight() - k.outerHeight() }), o(0, !0)) : "top" !== n.start && (o(e(n.start).position().top, null, !0), n.alwaysVisible || k.hide()), r()
                }
            }), this
        }
    }), e.fn.extend({ slimscroll: e.fn.slimScroll })
}(jQuery), ! function(e) { "function" == typeof define && define.amd ? define(["jquery"], e) : e("object" == typeof exports ? require("jquery") : jQuery) }(function(e) {
    var t = function() {
            if (e && e.fn && e.fn.select2 && e.fn.select2.amd) var t = e.fn.select2.amd;
            var t;
            return function() {
                    if (!t || !t.requirejs) {
                        t ? i = t : t = {};
                        var e, i, s;
                        ! function(t) {
                            function n(e, t) { return x.call(e, t) }

                            function o(e, t) {
                                var i, s, n, o, r, a, l, h, c, u, d, p = t && t.split("/"),
                                    f = b.map,
                                    m = f && f["*"] || {};
                                if (e && "." === e.charAt(0))
                                    if (t) {
                                        for (p = p.slice(0, p.length - 1), e = e.split("/"), r = e.length - 1, b.nodeIdCompat && _.test(e[r]) && (e[r] = e[r].replace(_, "")), e = p.concat(e), c = 0; c < e.length; c += 1)
                                            if (d = e[c], "." === d) e.splice(c, 1), c -= 1;
                                            else if (".." === d) {
                                            if (1 === c && (".." === e[2] || ".." === e[0])) break;
                                            c > 0 && (e.splice(c - 1, 2), c -= 2)
                                        }
                                        e = e.join("/")
                                    } else 0 === e.indexOf("./") && (e = e.substring(2));
                                if ((p || m) && f) {
                                    for (i = e.split("/"), c = i.length; c > 0; c -= 1) {
                                        if (s = i.slice(0, c).join("/"), p)
                                            for (u = p.length; u > 0; u -= 1)
                                                if (n = f[p.slice(0, u).join("/")], n && (n = n[s])) { o = n, a = c; break }
                                        if (o) break;
                                        !l && m && m[s] && (l = m[s], h = c)
                                    }!o && l && (o = l, a = h), o && (i.splice(0, a, o), e = i.join("/"))
                                }
                                return e
                            }

                            function r(e, i) { return function() { return p.apply(t, w.call(arguments, 0).concat([e, i])) } }

                            function a(e) { return function(t) { return o(t, e) } }

                            function l(e) { return function(t) { g[e] = t } }

                            function h(e) {
                                if (n(v, e)) {
                                    var i = v[e];
                                    delete v[e], y[e] = !0, d.apply(t, i)
                                }
                                if (!n(g, e) && !n(y, e)) throw new Error("No " + e);
                                return g[e]
                            }

                            function c(e) { var t, i = e ? e.indexOf("!") : -1; return i > -1 && (t = e.substring(0, i), e = e.substring(i + 1, e.length)), [t, e] }

                            function u(e) { return function() { return b && b.config && b.config[e] || {} } }
                            var d, p, f, m, g = {},
                                v = {},
                                b = {},
                                y = {},
                                x = Object.prototype.hasOwnProperty,
                                w = [].slice,
                                _ = /\.js$/;
                            f = function(e, t) {
                                var i, s = c(e),
                                    n = s[0];
                                return e = s[1], n && (n = o(n, t), i = h(n)), n ? e = i && i.normalize ? i.normalize(e, a(t)) : o(e, t) : (e = o(e, t), s = c(e), n = s[0], e = s[1], n && (i = h(n))), { f: n ? n + "!" + e : e, n: e, pr: n, p: i }
                            }, m = { require: function(e) { return r(e) }, exports: function(e) { var t = g[e]; return "undefined" != typeof t ? t : g[e] = {} }, module: function(e) { return { id: e, uri: "", exports: g[e], config: u(e) } } }, d = function(e, i, s, o) {
                                var a, c, u, d, p, b, x = [],
                                    w = typeof s;
                                if (o = o || e, "undefined" === w || "function" === w) {
                                    for (i = !i.length && s.length ? ["require", "exports", "module"] : i, p = 0; p < i.length; p += 1)
                                        if (d = f(i[p], o), c = d.f, "require" === c) x[p] = m.require(e);
                                        else if ("exports" === c) x[p] = m.exports(e), b = !0;
                                    else if ("module" === c) a = x[p] = m.module(e);
                                    else if (n(g, c) || n(v, c) || n(y, c)) x[p] = h(c);
                                    else {
                                        if (!d.p) throw new Error(e + " missing " + c);
                                        d.p.load(d.n, r(o, !0), l(c), {}), x[p] = g[c]
                                    }
                                    u = s ? s.apply(g[e], x) : void 0, e && (a && a.exports !== t && a.exports !== g[e] ? g[e] = a.exports : u === t && b || (g[e] = u))
                                } else e && (g[e] = s)
                            }, e = i = p = function(e, i, s, n, o) {
                                if ("string" == typeof e) return m[e] ? m[e](i) : h(f(e, i).f);
                                if (!e.splice) {
                                    if (b = e, b.deps && p(b.deps, b.callback), !i) return;
                                    i.splice ? (e = i, i = s, s = null) : e = t
                                }
                                return i = i || function() {}, "function" == typeof s && (s = n, n = o), n ? d(t, e, i, s) : setTimeout(function() { d(t, e, i, s) }, 4), p
                            }, p.config = function(e) { return p(e) }, e._defined = g, s = function(e, t, i) { t.splice || (i = t, t = []), n(g, e) || n(v, e) || (v[e] = [e, t, i]) }, s.amd = { jQuery: !0 }
                        }(), t.requirejs = e, t.require = i, t.define = s
                    }
                }(), t.define("almond", function() {}), t.define("jquery", [], function() { var t = e || $; return null == t && console && console.error && console.error("Select2: An instance of jQuery or a jQuery-compatible library was not found. Make sure that you are including jQuery before Select2 on your web page."), t }), t.define("select2/utils", ["jquery"], function(e) {
                    function t(e) {
                        var t = e.prototype,
                            i = [];
                        for (var s in t) { var n = t[s]; "function" == typeof n && "constructor" !== s && i.push(s) }
                        return i
                    }
                    var i = {};
                    i.Extend = function(e, t) {
                        function i() { this.constructor = e }
                        var s = {}.hasOwnProperty;
                        for (var n in t) s.call(t, n) && (e[n] = t[n]);
                        return i.prototype = t.prototype, e.prototype = new i, e.__super__ = t.prototype, e
                    }, i.Decorate = function(e, i) {
                        function s() {
                            var t = Array.prototype.unshift,
                                s = i.prototype.constructor.length,
                                n = e.prototype.constructor;
                            s > 0 && (t.call(arguments, e.prototype.constructor), n = i.prototype.constructor), n.apply(this, arguments)
                        }

                        function n() { this.constructor = s }
                        var o = t(i),
                            r = t(e);
                        i.displayName = e.displayName, s.prototype = new n;
                        for (var a = 0; a < r.length; a++) {
                            var l = r[a];
                            s.prototype[l] = e.prototype[l]
                        }
                        for (var h = (function(e) {
                                var t = function() {};
                                e in s.prototype && (t = s.prototype[e]);
                                var n = i.prototype[e];
                                return function() { var e = Array.prototype.unshift; return e.call(arguments, t), n.apply(this, arguments) }
                            }), c = 0; c < o.length; c++) {
                            var u = o[c];
                            s.prototype[u] = h(u)
                        }
                        return s
                    };
                    var s = function() { this.listeners = {} };
                    return s.prototype.on = function(e, t) { this.listeners = this.listeners || {}, e in this.listeners ? this.listeners[e].push(t) : this.listeners[e] = [t] }, s.prototype.trigger = function(e) {
                        var t = Array.prototype.slice;
                        this.listeners = this.listeners || {}, e in this.listeners && this.invoke(this.listeners[e], t.call(arguments, 1)), "*" in this.listeners && this.invoke(this.listeners["*"], arguments)
                    }, s.prototype.invoke = function(e, t) { for (var i = 0, s = e.length; s > i; i++) e[i].apply(this, t) }, i.Observable = s, i.generateChars = function(e) {
                        for (var t = "", i = 0; e > i; i++) {
                            var s = Math.floor(36 * Math.random());
                            t += s.toString(36)
                        }
                        return t
                    }, i.bind = function(e, t) { return function() { e.apply(t, arguments) } }, i._convertData = function(e) {
                        for (var t in e) {
                            var i = t.split("-"),
                                s = e;
                            if (1 !== i.length) {
                                for (var n = 0; n < i.length; n++) {
                                    var o = i[n];
                                    o = o.substring(0, 1).toLowerCase() + o.substring(1), o in s || (s[o] = {}), n == i.length - 1 && (s[o] = e[t]), s = s[o]
                                }
                                delete e[t]
                            }
                        }
                        return e
                    }, i.hasScroll = function(t, i) {
                        var s = e(i),
                            n = i.style.overflowX,
                            o = i.style.overflowY;
                        return n !== o || "hidden" !== o && "visible" !== o ? "scroll" === n || "scroll" === o ? !0 : s.innerHeight() < i.scrollHeight || s.innerWidth() < i.scrollWidth : !1
                    }, i.escapeMarkup = function(e) { var t = { "\\": "&#92;", "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;", "/": "&#47;" }; return "string" != typeof e ? e : String(e).replace(/[&<>"'\/\\]/g, function(e) { return t[e] }) }, i.appendMany = function(t, i) {
                        if ("1.7" === e.fn.jquery.substr(0, 3)) {
                            var s = e();
                            e.map(i, function(e) { s = s.add(e) }), i = s
                        }
                        t.append(i)
                    }, i
                }), t.define("select2/results", ["jquery", "./utils"], function(e, t) {
                    function i(e, t, s) { this.$element = e, this.data = s, this.options = t, i.__super__.constructor.call(this) }
                    return t.Extend(i, t.Observable), i.prototype.render = function() { var t = e('<ul class="select2-results__options" role="tree"></ul>'); return this.options.get("multiple") && t.attr("aria-multiselectable", "true"), this.$results = t, t }, i.prototype.clear = function() { this.$results.empty() }, i.prototype.displayMessage = function(t) {
                        var i = this.options.get("escapeMarkup");
                        this.clear(), this.hideLoading();
                        var s = e('<li role="treeitem" class="select2-results__option"></li>'),
                            n = this.options.get("translations").get(t.message);
                        s.append(i(n(t.args))), s[0].className += " select2-results__message", this.$results.append(s)
                    }, i.prototype.hideMessages = function() { this.$results.find(".select2-results__message").remove() }, i.prototype.append = function(e) {
                        this.hideLoading();
                        var t = [];
                        if (null == e.results || 0 === e.results.length) return void(0 === this.$results.children().length && this.trigger("results:message", { message: "noResults" }));
                        e.results = this.sort(e.results);
                        for (var i = 0; i < e.results.length; i++) {
                            var s = e.results[i],
                                n = this.option(s);
                            t.push(n)
                        }
                        this.$results.append(t)
                    }, i.prototype.position = function(e, t) {
                        var i = t.find(".select2-results");
                        i.append(e)
                    }, i.prototype.sort = function(e) { var t = this.options.get("sorter"); return t(e) }, i.prototype.setClasses = function() {
                        var t = this;
                        this.data.current(function(i) {
                            var s = e.map(i, function(e) { return e.id.toString() }),
                                n = t.$results.find(".select2-results__option[aria-selected]");
                            n.each(function() {
                                var t = e(this),
                                    i = e.data(this, "data"),
                                    n = "" + i.id;
                                null != i.element && i.element.selected || null == i.element && e.inArray(n, s) > -1 ? t.attr("aria-selected", "true") : t.attr("aria-selected", "false")
                            });
                            var o = n.filter("[aria-selected=true]");
                            o.length > 0 ? o.first().trigger("mouseenter") : n.first().trigger("mouseenter")
                        })
                    }, i.prototype.showLoading = function(e) {
                        this.hideLoading();
                        var t = this.options.get("translations").get("searching"),
                            i = { disabled: !0, loading: !0, text: t(e) },
                            s = this.option(i);
                        s.className += " loading-results", this.$results.prepend(s)
                    }, i.prototype.hideLoading = function() { this.$results.find(".loading-results").remove() }, i.prototype.option = function(t) {
                        var i = document.createElement("li");
                        i.className = "select2-results__option";
                        var s = { role: "treeitem", "aria-selected": "false" };
                        t.disabled && (delete s["aria-selected"], s["aria-disabled"] = "true"), null == t.id && delete s["aria-selected"], null != t._resultId && (i.id = t._resultId), t.title && (i.title = t.title), t.children && (s.role = "group", s["aria-label"] = t.text, delete s["aria-selected"]);
                        for (var n in s) {
                            var o = s[n];
                            i.setAttribute(n, o)
                        }
                        if (t.children) {
                            var r = e(i),
                                a = document.createElement("strong");
                            a.className = "select2-results__group", e(a), this.template(t, a);
                            for (var l = [], h = 0; h < t.children.length; h++) {
                                var c = t.children[h],
                                    u = this.option(c);
                                l.push(u)
                            }
                            var d = e("<ul></ul>", { "class": "select2-results__options select2-results__options--nested" });
                            d.append(l), r.append(a), r.append(d)
                        } else this.template(t, i);
                        return e.data(i, "data", t), i
                    }, i.prototype.bind = function(t, i) {
                        var s = this,
                            n = t.id + "-results";
                        this.$results.attr("id", n), t.on("results:all", function(e) { s.clear(), s.append(e.data), t.isOpen() && s.setClasses() }), t.on("results:append", function(e) { s.append(e.data), t.isOpen() && s.setClasses() }), t.on("query", function(e) { s.hideMessages(), s.showLoading(e) }), t.on("select", function() { t.isOpen() && s.setClasses() }), t.on("unselect", function() { t.isOpen() && s.setClasses() }), t.on("open", function() { s.$results.attr("aria-expanded", "true"), s.$results.attr("aria-hidden", "false"), s.setClasses(), s.ensureHighlightVisible() }), t.on("close", function() { s.$results.attr("aria-expanded", "false"), s.$results.attr("aria-hidden", "true"), s.$results.removeAttr("aria-activedescendant") }), t.on("results:toggle", function() {
                            var e = s.getHighlightedResults();
                            0 !== e.length && e.trigger("mouseup")
                        }), t.on("results:select", function() { var e = s.getHighlightedResults(); if (0 !== e.length) { var t = e.data("data"); "true" == e.attr("aria-selected") ? s.trigger("close", {}) : s.trigger("select", { data: t }) } }), t.on("results:previous", function() {
                            var e = s.getHighlightedResults(),
                                t = s.$results.find("[aria-selected]"),
                                i = t.index(e);
                            if (0 !== i) {
                                var n = i - 1;
                                0 === e.length && (n = 0);
                                var o = t.eq(n);
                                o.trigger("mouseenter");
                                var r = s.$results.offset().top,
                                    a = o.offset().top,
                                    l = s.$results.scrollTop() + (a - r);
                                0 === n ? s.$results.scrollTop(0) : 0 > a - r && s.$results.scrollTop(l)
                            }
                        }), t.on("results:next", function() {
                            var e = s.getHighlightedResults(),
                                t = s.$results.find("[aria-selected]"),
                                i = t.index(e),
                                n = i + 1;
                            if (!(n >= t.length)) {
                                var o = t.eq(n);
                                o.trigger("mouseenter");
                                var r = s.$results.offset().top + s.$results.outerHeight(!1),
                                    a = o.offset().top + o.outerHeight(!1),
                                    l = s.$results.scrollTop() + a - r;
                                0 === n ? s.$results.scrollTop(0) : a > r && s.$results.scrollTop(l)
                            }
                        }), t.on("results:focus", function(e) { e.element.addClass("select2-results__option--highlighted") }), t.on("results:message", function(e) { s.displayMessage(e) }), e.fn.mousewheel && this.$results.on("mousewheel", function(e) {
                            var t = s.$results.scrollTop(),
                                i = s.$results.get(0).scrollHeight - s.$results.scrollTop() + e.deltaY,
                                n = e.deltaY > 0 && t - e.deltaY <= 0,
                                o = e.deltaY < 0 && i <= s.$results.height();
                            n ? (s.$results.scrollTop(0), e.preventDefault(), e.stopPropagation()) : o && (s.$results.scrollTop(s.$results.get(0).scrollHeight - s.$results.height()), e.preventDefault(), e.stopPropagation())
                        }), this.$results.on("mouseup", ".select2-results__option[aria-selected]", function(t) {
                            var i = e(this),
                                n = i.data("data");
                            return "true" === i.attr("aria-selected") ? void(s.options.get("multiple") ? s.trigger("unselect", { originalEvent: t, data: n }) : s.trigger("close", {})) : void s.trigger("select", { originalEvent: t, data: n })
                        }), this.$results.on("mouseenter", ".select2-results__option[aria-selected]", function(t) {
                            var i = e(this).data("data");
                            s.getHighlightedResults().removeClass("select2-results__option--highlighted"), s.trigger("results:focus", { data: i, element: e(this) })
                        })
                    }, i.prototype.getHighlightedResults = function() { var e = this.$results.find(".select2-results__option--highlighted"); return e }, i.prototype.destroy = function() { this.$results.remove() }, i.prototype.ensureHighlightVisible = function() {
                        var e = this.getHighlightedResults();
                        if (0 !== e.length) {
                            var t = this.$results.find("[aria-selected]"),
                                i = t.index(e),
                                s = this.$results.offset().top,
                                n = e.offset().top,
                                o = this.$results.scrollTop() + (n - s),
                                r = n - s;
                            o -= 2 * e.outerHeight(!1), 2 >= i ? this.$results.scrollTop(0) : (r > this.$results.outerHeight() || 0 > r) && this.$results.scrollTop(o)
                        }
                    }, i.prototype.template = function(t, i) {
                        var s = this.options.get("templateResult"),
                            n = this.options.get("escapeMarkup"),
                            o = s(t);
                        null == o ? i.style.display = "none" : "string" == typeof o ? i.innerHTML = n(o) : e(i).append(o)
                    }, i
                }), t.define("select2/keys", [], function() { var e = { BACKSPACE: 8, TAB: 9, ENTER: 13, SHIFT: 16, CTRL: 17, ALT: 18, ESC: 27, SPACE: 32, PAGE_UP: 33, PAGE_DOWN: 34, END: 35, HOME: 36, LEFT: 37, UP: 38, RIGHT: 39, DOWN: 40, DELETE: 46 }; return e }), t.define("select2/selection/base", ["jquery", "../utils", "../keys"], function(e, t, i) {
                    function s(e, t) { this.$element = e, this.options = t, s.__super__.constructor.call(this) }
                    return t.Extend(s, t.Observable), s.prototype.render = function() { var t = e('<span class="select2-selection" role="combobox" aria-autocomplete="list" aria-haspopup="true" aria-expanded="false"></span>'); return this._tabindex = 0, null != this.$element.data("old-tabindex") ? this._tabindex = this.$element.data("old-tabindex") : null != this.$element.attr("tabindex") && (this._tabindex = this.$element.attr("tabindex")), t.attr("title", this.$element.attr("title")), t.attr("tabindex", this._tabindex), this.$selection = t, t }, s.prototype.bind = function(e, t) {
                        var s = this,
                            n = (e.id + "-container", e.id + "-results");
                        this.container = e, this.$selection.on("focus", function(e) { s.trigger("focus", e) }), this.$selection.on("blur", function(e) { s._handleBlur(e) }), this.$selection.on("keydown", function(e) { s.trigger("keypress", e), e.which === i.SPACE && e.preventDefault() }), e.on("results:focus", function(e) { s.$selection.attr("aria-activedescendant", e.data._resultId) }), e.on("selection:update", function(e) { s.update(e.data) }), e.on("open", function() { s.$selection.attr("aria-expanded", "true"), s.$selection.attr("aria-owns", n), s._attachCloseHandler(e) }), e.on("close", function() { s.$selection.attr("aria-expanded", "false"), s.$selection.removeAttr("aria-activedescendant"), s.$selection.removeAttr("aria-owns"), s.$selection.focus(), s._detachCloseHandler(e) }), e.on("enable", function() { s.$selection.attr("tabindex", s._tabindex) }), e.on("disable", function() { s.$selection.attr("tabindex", "-1") })
                    }, s.prototype._handleBlur = function(t) {
                        var i = this;
                        window.setTimeout(function() { document.activeElement == i.$selection[0] || e.contains(i.$selection[0], document.activeElement) || i.trigger("blur", t) }, 1)
                    }, s.prototype._attachCloseHandler = function(t) {
                        e(document.body).on("mousedown.select2." + t.id, function(t) {
                            var i = e(t.target),
                                s = i.closest(".select2"),
                                n = e(".select2.select2-container--open");
                            n.each(function() {
                                var t = e(this);
                                if (this != s[0]) {
                                    var i = t.data("element");
                                    i.select2("close")
                                }
                            })
                        })
                    }, s.prototype._detachCloseHandler = function(t) { e(document.body).off("mousedown.select2." + t.id) }, s.prototype.position = function(e, t) {
                        var i = t.find(".selection");
                        i.append(e)
                    }, s.prototype.destroy = function() { this._detachCloseHandler(this.container) }, s.prototype.update = function(e) { throw new Error("The `update` method must be defined in child classes.") }, s
                }), t.define("select2/selection/single", ["jquery", "./base", "../utils", "../keys"], function(e, t, i, s) {
                    function n() { n.__super__.constructor.apply(this, arguments) }
                    return i.Extend(n, t), n.prototype.render = function() { var e = n.__super__.render.call(this); return e.addClass("select2-selection--single"), e.html('<span class="select2-selection__rendered"></span><span class="select2-selection__arrow" role="presentation"><b role="presentation"></b></span>'), e }, n.prototype.bind = function(e, t) {
                        var i = this;
                        n.__super__.bind.apply(this, arguments);
                        var s = e.id + "-container";
                        this.$selection.find(".select2-selection__rendered").attr("id", s), this.$selection.attr("aria-labelledby", s), this.$selection.on("mousedown", function(e) { 1 === e.which && i.trigger("toggle", { originalEvent: e }) }), this.$selection.on("focus", function(e) {}), this.$selection.on("blur", function(e) {}), e.on("selection:update", function(e) { i.update(e.data) })
                    }, n.prototype.clear = function() { this.$selection.find(".select2-selection__rendered").empty() }, n.prototype.display = function(e, t) {
                        var i = this.options.get("templateSelection"),
                            s = this.options.get("escapeMarkup");
                        return s(i(e, t))
                    }, n.prototype.selectionContainer = function() { return e("<span></span>") }, n.prototype.update = function(e) {
                        if (0 === e.length) return void this.clear();
                        var t = e[0],
                            i = this.$selection.find(".select2-selection__rendered"),
                            s = this.display(t, i);
                        i.empty().append(s), i.prop("title", t.title || t.text)
                    }, n
                }), t.define("select2/selection/multiple", ["jquery", "./base", "../utils"], function(e, t, i) {
                    function s(e, t) { s.__super__.constructor.apply(this, arguments) }
                    return i.Extend(s, t), s.prototype.render = function() { var e = s.__super__.render.call(this); return e.addClass("select2-selection--multiple"), e.html('<ul class="select2-selection__rendered"></ul>'), e }, s.prototype.bind = function(t, i) {
                        var n = this;
                        s.__super__.bind.apply(this, arguments), this.$selection.on("click", function(e) { n.trigger("toggle", { originalEvent: e }) }), this.$selection.on("click", ".select2-selection__choice__remove", function(t) {
                            if (!n.options.get("disabled")) {
                                var i = e(this),
                                    s = i.parent(),
                                    o = s.data("data");
                                n.trigger("unselect", { originalEvent: t, data: o })
                            }
                        })
                    }, s.prototype.clear = function() { this.$selection.find(".select2-selection__rendered").empty() }, s.prototype.display = function(e, t) {
                        var i = this.options.get("templateSelection"),
                            s = this.options.get("escapeMarkup");
                        return s(i(e, t))
                    }, s.prototype.selectionContainer = function() { var t = e('<li class="select2-selection__choice"><span class="select2-selection__choice__remove" role="presentation">&times;</span></li>'); return t }, s.prototype.update = function(e) {
                        if (this.clear(), 0 !== e.length) {
                            for (var t = [], s = 0; s < e.length; s++) {
                                var n = e[s],
                                    o = this.selectionContainer(),
                                    r = this.display(n, o);
                                o.append(r), o.prop("title", n.title || n.text), o.data("data", n), t.push(o)
                            }
                            var a = this.$selection.find(".select2-selection__rendered");
                            i.appendMany(a, t)
                        }
                    }, s
                }), t.define("select2/selection/placeholder", ["../utils"], function(e) {
                    function t(e, t, i) { this.placeholder = this.normalizePlaceholder(i.get("placeholder")), e.call(this, t, i) }
                    return t.prototype.normalizePlaceholder = function(e, t) { return "string" == typeof t && (t = { id: "", text: t }), t }, t.prototype.createPlaceholder = function(e, t) { var i = this.selectionContainer(); return i.html(this.display(t)), i.addClass("select2-selection__placeholder").removeClass("select2-selection__choice"), i }, t.prototype.update = function(e, t) {
                        var i = 1 == t.length && t[0].id != this.placeholder.id,
                            s = t.length > 1;
                        if (s || i) return e.call(this, t);
                        this.clear();
                        var n = this.createPlaceholder(this.placeholder);
                        this.$selection.find(".select2-selection__rendered").append(n)
                    }, t
                }), t.define("select2/selection/allowClear", ["jquery", "../keys"], function(e, t) {
                    function i() {}
                    return i.prototype.bind = function(e, t, i) {
                        var s = this;
                        e.call(this, t, i), null == this.placeholder && this.options.get("debug") && window.console && console.error && console.error("Select2: The `allowClear` option should be used in combination with the `placeholder` option."), this.$selection.on("mousedown", ".select2-selection__clear", function(e) { s._handleClear(e) }), t.on("keypress", function(e) { s._handleKeyboardClear(e, t) })
                    }, i.prototype._handleClear = function(e, t) {
                        if (!this.options.get("disabled")) {
                            var i = this.$selection.find(".select2-selection__clear");
                            if (0 !== i.length) {
                                t.stopPropagation();
                                for (var s = i.data("data"), n = 0; n < s.length; n++) { var o = { data: s[n] }; if (this.trigger("unselect", o), o.prevented) return }
                                this.$element.val(this.placeholder.id).trigger("change"), this.trigger("toggle", {})
                            }
                        }
                    }, i.prototype._handleKeyboardClear = function(e, i, s) { s.isOpen() || (i.which == t.DELETE || i.which == t.BACKSPACE) && this._handleClear(i) }, i.prototype.update = function(t, i) {
                        if (t.call(this, i), !(this.$selection.find(".select2-selection__placeholder").length > 0 || 0 === i.length)) {
                            var s = e('<span class="select2-selection__clear">&times;</span>');
                            s.data("data", i), this.$selection.find(".select2-selection__rendered").prepend(s)
                        }
                    }, i
                }), t.define("select2/selection/search", ["jquery", "../utils", "../keys"], function(e, t, i) {
                    function s(e, t, i) { e.call(this, t, i) }
                    return s.prototype.render = function(t) {
                        var i = e('<li class="select2-search select2-search--inline"><input class="select2-search__field" type="search" tabindex="-1" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" role="textbox" /></li>');
                        this.$searchContainer = i, this.$search = i.find("input");
                        var s = t.call(this);
                        return this._transferTabIndex(), s
                    }, s.prototype.bind = function(e, t, s) {
                        var n = this;
                        e.call(this, t, s), t.on("open", function() { n.$search.trigger("focus") }), t.on("close", function() { n.$search.val(""), n.$search.trigger("focus") }), t.on("enable", function() { n.$search.prop("disabled", !1), n._transferTabIndex() }), t.on("disable", function() { n.$search.prop("disabled", !0) }), t.on("focus", function(e) { n.$search.trigger("focus") }), this.$selection.on("focusin", ".select2-search--inline", function(e) { n.trigger("focus", e) }), this.$selection.on("focusout", ".select2-search--inline", function(e) { n._handleBlur(e) }), this.$selection.on("keydown", ".select2-search--inline", function(e) {
                            e.stopPropagation(), n.trigger("keypress", e), n._keyUpPrevented = e.isDefaultPrevented();
                            var t = e.which;
                            if (t === i.BACKSPACE && "" === n.$search.val()) {
                                var s = n.$searchContainer.prev(".select2-selection__choice");
                                if (s.length > 0) {
                                    var o = s.data("data");
                                    n.searchRemoveChoice(o), e.preventDefault()
                                }
                            }
                        });
                        var o = document.documentMode,
                            r = o && 11 >= o;
                        this.$selection.on("input.searchcheck", ".select2-search--inline", function(e) { return r ? void n.$selection.off("input.search input.searchcheck") : void n.$selection.off("keyup.search") }), this.$selection.on("keyup.search input.search", ".select2-search--inline", function(e) {
                            if (r && "input" === e.type) return void n.$selection.off("input.search input.searchcheck");
                            var t = e.which;
                            t != i.SHIFT && t != i.CTRL && t != i.ALT && t != i.TAB && n.handleSearch(e)
                        })
                    }, s.prototype._transferTabIndex = function(e) { this.$search.attr("tabindex", this.$selection.attr("tabindex")), this.$selection.attr("tabindex", "-1") }, s.prototype.createPlaceholder = function(e, t) { this.$search.attr("placeholder", t.text) }, s.prototype.update = function(e, t) {
                        var i = this.$search[0] == document.activeElement;
                        this.$search.attr("placeholder", ""), e.call(this, t), this.$selection.find(".select2-selection__rendered").append(this.$searchContainer), this.resizeSearch(), i && this.$search.focus()
                    }, s.prototype.handleSearch = function() {
                        if (this.resizeSearch(), !this._keyUpPrevented) {
                            var e = this.$search.val();
                            this.trigger("query", { term: e })
                        }
                        this._keyUpPrevented = !1
                    }, s.prototype.searchRemoveChoice = function(e, t) { this.trigger("unselect", { data: t }), this.trigger("open", {}), this.$search.val(t.text + " ") }, s.prototype.resizeSearch = function() {
                        this.$search.css("width", "25px");
                        var e = "";
                        if ("" !== this.$search.attr("placeholder")) e = this.$selection.find(".select2-selection__rendered").innerWidth();
                        else {
                            var t = this.$search.val().length + 1;
                            e = .75 * t + "em"
                        }
                        this.$search.css("width", e)
                    }, s
                }), t.define("select2/selection/eventRelay", ["jquery"], function(e) {
                    function t() {}
                    return t.prototype.bind = function(t, i, s) {
                        var n = this,
                            o = ["open", "opening", "close", "closing", "select", "selecting", "unselect", "unselecting"],
                            r = ["opening", "closing", "selecting", "unselecting"];
                        t.call(this, i, s), i.on("*", function(t, i) {
                            if (-1 !== e.inArray(t, o)) {
                                i = i || {};
                                var s = e.Event("select2:" + t, { params: i });
                                n.$element.trigger(s), -1 !== e.inArray(t, r) && (i.prevented = s.isDefaultPrevented())
                            }
                        })
                    }, t
                }), t.define("select2/translation", ["jquery", "require"], function(e, t) {
                    function i(e) { this.dict = e || {} }
                    return i.prototype.all = function() { return this.dict }, i.prototype.get = function(e) { return this.dict[e] }, i.prototype.extend = function(t) { this.dict = e.extend({}, t.all(), this.dict) }, i._cache = {}, i.loadPath = function(e) {
                        if (!(e in i._cache)) {
                            var s = t(e);
                            i._cache[e] = s
                        }
                        return new i(i._cache[e])
                    }, i
                }), t.define("select2/diacritics", [], function() { var e = { "Ⓐ": "A", "Ａ": "A", "À": "A", "Á": "A", "Â": "A", "Ầ": "A", "Ấ": "A", "Ẫ": "A", "Ẩ": "A", "Ã": "A", "Ā": "A", "Ă": "A", "Ằ": "A", "Ắ": "A", "Ẵ": "A", "Ẳ": "A", "Ȧ": "A", "Ǡ": "A", "Ä": "A", "Ǟ": "A", "Ả": "A", "Å": "A", "Ǻ": "A", "Ǎ": "A", "Ȁ": "A", "Ȃ": "A", "Ạ": "A", "Ậ": "A", "Ặ": "A", "Ḁ": "A", "Ą": "A", "Ⱥ": "A", "Ɐ": "A", "Ꜳ": "AA", "Æ": "AE", "Ǽ": "AE", "Ǣ": "AE", "Ꜵ": "AO", "Ꜷ": "AU", "Ꜹ": "AV", "Ꜻ": "AV", "Ꜽ": "AY", "Ⓑ": "B", "Ｂ": "B", "Ḃ": "B", "Ḅ": "B", "Ḇ": "B", "Ƀ": "B", "Ƃ": "B", "Ɓ": "B", "Ⓒ": "C", "Ｃ": "C", "Ć": "C", "Ĉ": "C", "Ċ": "C", "Č": "C", "Ç": "C", "Ḉ": "C", "Ƈ": "C", "Ȼ": "C", "Ꜿ": "C", "Ⓓ": "D", "Ｄ": "D", "Ḋ": "D", "Ď": "D", "Ḍ": "D", "Ḑ": "D", "Ḓ": "D", "Ḏ": "D", "Đ": "D", "Ƌ": "D", "Ɗ": "D", "Ɖ": "D", "Ꝺ": "D", "Ǳ": "DZ", "Ǆ": "DZ", "ǲ": "Dz", "ǅ": "Dz", "Ⓔ": "E", "Ｅ": "E", "È": "E", "É": "E", "Ê": "E", "Ề": "E", "Ế": "E", "Ễ": "E", "Ể": "E", "Ẽ": "E", "Ē": "E", "Ḕ": "E", "Ḗ": "E", "Ĕ": "E", "Ė": "E", "Ë": "E", "Ẻ": "E", "Ě": "E", "Ȅ": "E", "Ȇ": "E", "Ẹ": "E", "Ệ": "E", "Ȩ": "E", "Ḝ": "E", "Ę": "E", "Ḙ": "E", "Ḛ": "E", "Ɛ": "E", "Ǝ": "E", "Ⓕ": "F", "Ｆ": "F", "Ḟ": "F", "Ƒ": "F", "Ꝼ": "F", "Ⓖ": "G", "Ｇ": "G", "Ǵ": "G", "Ĝ": "G", "Ḡ": "G", "Ğ": "G", "Ġ": "G", "Ǧ": "G", "Ģ": "G", "Ǥ": "G", "Ɠ": "G", "Ꞡ": "G", "Ᵹ": "G", "Ꝿ": "G", "Ⓗ": "H", "Ｈ": "H", "Ĥ": "H", "Ḣ": "H", "Ḧ": "H", "Ȟ": "H", "Ḥ": "H", "Ḩ": "H", "Ḫ": "H", "Ħ": "H", "Ⱨ": "H", "Ⱶ": "H", "Ɥ": "H", "Ⓘ": "I", "Ｉ": "I", "Ì": "I", "Í": "I", "Î": "I", "Ĩ": "I", "Ī": "I", "Ĭ": "I", "İ": "I", "Ï": "I", "Ḯ": "I", "Ỉ": "I", "Ǐ": "I", "Ȉ": "I", "Ȋ": "I", "Ị": "I", "Į": "I", "Ḭ": "I", "Ɨ": "I", "Ⓙ": "J", "Ｊ": "J", "Ĵ": "J", "Ɉ": "J", "Ⓚ": "K", "Ｋ": "K", "Ḱ": "K", "Ǩ": "K", "Ḳ": "K", "Ķ": "K", "Ḵ": "K", "Ƙ": "K", "Ⱪ": "K", "Ꝁ": "K", "Ꝃ": "K", "Ꝅ": "K", "Ꞣ": "K", "Ⓛ": "L", "Ｌ": "L", "Ŀ": "L", "Ĺ": "L", "Ľ": "L", "Ḷ": "L", "Ḹ": "L", "Ļ": "L", "Ḽ": "L", "Ḻ": "L", "Ł": "L", "Ƚ": "L", "Ɫ": "L", "Ⱡ": "L", "Ꝉ": "L", "Ꝇ": "L", "Ꞁ": "L", "Ǉ": "LJ", "ǈ": "Lj", "Ⓜ": "M", "Ｍ": "M", "Ḿ": "M", "Ṁ": "M", "Ṃ": "M", "Ɱ": "M", "Ɯ": "M", "Ⓝ": "N", "Ｎ": "N", "Ǹ": "N", "Ń": "N", "Ñ": "N", "Ṅ": "N", "Ň": "N", "Ṇ": "N", "Ņ": "N", "Ṋ": "N", "Ṉ": "N", "Ƞ": "N", "Ɲ": "N", "Ꞑ": "N", "Ꞥ": "N", "Ǌ": "NJ", "ǋ": "Nj", "Ⓞ": "O", "Ｏ": "O", "Ò": "O", "Ó": "O", "Ô": "O", "Ồ": "O", "Ố": "O", "Ỗ": "O", "Ổ": "O", "Õ": "O", "Ṍ": "O", "Ȭ": "O", "Ṏ": "O", "Ō": "O", "Ṑ": "O", "Ṓ": "O", "Ŏ": "O", "Ȯ": "O", "Ȱ": "O", "Ö": "O", "Ȫ": "O", "Ỏ": "O", "Ő": "O", "Ǒ": "O", "Ȍ": "O", "Ȏ": "O", "Ơ": "O", "Ờ": "O", "Ớ": "O", "Ỡ": "O", "Ở": "O", "Ợ": "O", "Ọ": "O", "Ộ": "O", "Ǫ": "O", "Ǭ": "O", "Ø": "O", "Ǿ": "O", "Ɔ": "O", "Ɵ": "O", "Ꝋ": "O", "Ꝍ": "O", "Ƣ": "OI", "Ꝏ": "OO", "Ȣ": "OU", "Ⓟ": "P", "Ｐ": "P", "Ṕ": "P", "Ṗ": "P", "Ƥ": "P", "Ᵽ": "P", "Ꝑ": "P", "Ꝓ": "P", "Ꝕ": "P", "Ⓠ": "Q", "Ｑ": "Q", "Ꝗ": "Q", "Ꝙ": "Q", "Ɋ": "Q", "Ⓡ": "R", "Ｒ": "R", "Ŕ": "R", "Ṙ": "R", "Ř": "R", "Ȑ": "R", "Ȓ": "R", "Ṛ": "R", "Ṝ": "R", "Ŗ": "R", "Ṟ": "R", "Ɍ": "R", "Ɽ": "R", "Ꝛ": "R", "Ꞧ": "R", "Ꞃ": "R", "Ⓢ": "S", "Ｓ": "S", "ẞ": "S", "Ś": "S", "Ṥ": "S", "Ŝ": "S", "Ṡ": "S", "Š": "S", "Ṧ": "S", "Ṣ": "S", "Ṩ": "S", "Ș": "S", "Ş": "S", "Ȿ": "S", "Ꞩ": "S", "Ꞅ": "S", "Ⓣ": "T", "Ｔ": "T", "Ṫ": "T", "Ť": "T", "Ṭ": "T", "Ț": "T", "Ţ": "T", "Ṱ": "T", "Ṯ": "T", "Ŧ": "T", "Ƭ": "T", "Ʈ": "T", "Ⱦ": "T", "Ꞇ": "T", "Ꜩ": "TZ", "Ⓤ": "U", "Ｕ": "U", "Ù": "U", "Ú": "U", "Û": "U", "Ũ": "U", "Ṹ": "U", "Ū": "U", "Ṻ": "U", "Ŭ": "U", "Ü": "U", "Ǜ": "U", "Ǘ": "U", "Ǖ": "U", "Ǚ": "U", "Ủ": "U", "Ů": "U", "Ű": "U", "Ǔ": "U", "Ȕ": "U", "Ȗ": "U", "Ư": "U", "Ừ": "U", "Ứ": "U", "Ữ": "U", "Ử": "U", "Ự": "U", "Ụ": "U", "Ṳ": "U", "Ų": "U", "Ṷ": "U", "Ṵ": "U", "Ʉ": "U", "Ⓥ": "V", "Ｖ": "V", "Ṽ": "V", "Ṿ": "V", "Ʋ": "V", "Ꝟ": "V", "Ʌ": "V", "Ꝡ": "VY", "Ⓦ": "W", "Ｗ": "W", "Ẁ": "W", "Ẃ": "W", "Ŵ": "W", "Ẇ": "W", "Ẅ": "W", "Ẉ": "W", "Ⱳ": "W", "Ⓧ": "X", "Ｘ": "X", "Ẋ": "X", "Ẍ": "X", "Ⓨ": "Y", "Ｙ": "Y", "Ỳ": "Y", "Ý": "Y", "Ŷ": "Y", "Ỹ": "Y", "Ȳ": "Y", "Ẏ": "Y", "Ÿ": "Y", "Ỷ": "Y", "Ỵ": "Y", "Ƴ": "Y", "Ɏ": "Y", "Ỿ": "Y", "Ⓩ": "Z", "Ｚ": "Z", "Ź": "Z", "Ẑ": "Z", "Ż": "Z", "Ž": "Z", "Ẓ": "Z", "Ẕ": "Z", "Ƶ": "Z", "Ȥ": "Z", "Ɀ": "Z", "Ⱬ": "Z", "Ꝣ": "Z", "ⓐ": "a", "ａ": "a", "ẚ": "a", "à": "a", "á": "a", "â": "a", "ầ": "a", "ấ": "a", "ẫ": "a", "ẩ": "a", "ã": "a", "ā": "a", "ă": "a", "ằ": "a", "ắ": "a", "ẵ": "a", "ẳ": "a", "ȧ": "a", "ǡ": "a", "ä": "a", "ǟ": "a", "ả": "a", "å": "a", "ǻ": "a", "ǎ": "a", "ȁ": "a", "ȃ": "a", "ạ": "a", "ậ": "a", "ặ": "a", "ḁ": "a", "ą": "a", "ⱥ": "a", "ɐ": "a", "ꜳ": "aa", "æ": "ae", "ǽ": "ae", "ǣ": "ae", "ꜵ": "ao", "ꜷ": "au", "ꜹ": "av", "ꜻ": "av", "ꜽ": "ay", "ⓑ": "b", "ｂ": "b", "ḃ": "b", "ḅ": "b", "ḇ": "b", "ƀ": "b", "ƃ": "b", "ɓ": "b", "ⓒ": "c", "ｃ": "c", "ć": "c", "ĉ": "c", "ċ": "c", "č": "c", "ç": "c", "ḉ": "c", "ƈ": "c", "ȼ": "c", "ꜿ": "c", "ↄ": "c", "ⓓ": "d", "ｄ": "d", "ḋ": "d", "ď": "d", "ḍ": "d", "ḑ": "d", "ḓ": "d", "ḏ": "d", "đ": "d", "ƌ": "d", "ɖ": "d", "ɗ": "d", "ꝺ": "d", "ǳ": "dz", "ǆ": "dz", "ⓔ": "e", "ｅ": "e", "è": "e", "é": "e", "ê": "e", "ề": "e", "ế": "e", "ễ": "e", "ể": "e", "ẽ": "e", "ē": "e", "ḕ": "e", "ḗ": "e", "ĕ": "e", "ė": "e", "ë": "e", "ẻ": "e", "ě": "e", "ȅ": "e", "ȇ": "e", "ẹ": "e", "ệ": "e", "ȩ": "e", "ḝ": "e", "ę": "e", "ḙ": "e", "ḛ": "e", "ɇ": "e", "ɛ": "e", "ǝ": "e", "ⓕ": "f", "ｆ": "f", "ḟ": "f", "ƒ": "f", "ꝼ": "f", "ⓖ": "g", "ｇ": "g", "ǵ": "g", "ĝ": "g", "ḡ": "g", "ğ": "g", "ġ": "g", "ǧ": "g", "ģ": "g", "ǥ": "g", "ɠ": "g", "ꞡ": "g", "ᵹ": "g", "ꝿ": "g", "ⓗ": "h", "ｈ": "h", "ĥ": "h", "ḣ": "h", "ḧ": "h", "ȟ": "h", "ḥ": "h", "ḩ": "h", "ḫ": "h", "ẖ": "h", "ħ": "h", "ⱨ": "h", "ⱶ": "h", "ɥ": "h", "ƕ": "hv", "ⓘ": "i", "ｉ": "i", "ì": "i", "í": "i", "î": "i", "ĩ": "i", "ī": "i", "ĭ": "i", "ï": "i", "ḯ": "i", "ỉ": "i", "ǐ": "i", "ȉ": "i", "ȋ": "i", "ị": "i", "į": "i", "ḭ": "i", "ɨ": "i", "ı": "i", "ⓙ": "j", "ｊ": "j", "ĵ": "j", "ǰ": "j", "ɉ": "j", "ⓚ": "k", "ｋ": "k", "ḱ": "k", "ǩ": "k", "ḳ": "k", "ķ": "k", "ḵ": "k", "ƙ": "k", "ⱪ": "k", "ꝁ": "k", "ꝃ": "k", "ꝅ": "k", "ꞣ": "k", "ⓛ": "l", "ｌ": "l", "ŀ": "l", "ĺ": "l", "ľ": "l", "ḷ": "l", "ḹ": "l", "ļ": "l", "ḽ": "l", "ḻ": "l", "ſ": "l", "ł": "l", "ƚ": "l", "ɫ": "l", "ⱡ": "l", "ꝉ": "l", "ꞁ": "l", "ꝇ": "l", "ǉ": "lj", "ⓜ": "m", "ｍ": "m", "ḿ": "m", "ṁ": "m", "ṃ": "m", "ɱ": "m", "ɯ": "m", "ⓝ": "n", "ｎ": "n", "ǹ": "n", "ń": "n", "ñ": "n", "ṅ": "n", "ň": "n", "ṇ": "n", "ņ": "n", "ṋ": "n", "ṉ": "n", "ƞ": "n", "ɲ": "n", "ŉ": "n", "ꞑ": "n", "ꞥ": "n", "ǌ": "nj", "ⓞ": "o", "ｏ": "o", "ò": "o", "ó": "o", "ô": "o", "ồ": "o", "ố": "o", "ỗ": "o", "ổ": "o", "õ": "o", "ṍ": "o", "ȭ": "o", "ṏ": "o", "ō": "o", "ṑ": "o", "ṓ": "o", "ŏ": "o", "ȯ": "o", "ȱ": "o", "ö": "o", "ȫ": "o", "ỏ": "o", "ő": "o", "ǒ": "o", "ȍ": "o", "ȏ": "o", "ơ": "o", "ờ": "o", "ớ": "o", "ỡ": "o", "ở": "o", "ợ": "o", "ọ": "o", "ộ": "o", "ǫ": "o", "ǭ": "o", "ø": "o", "ǿ": "o", "ɔ": "o", "ꝋ": "o", "ꝍ": "o", "ɵ": "o", "ƣ": "oi", "ȣ": "ou", "ꝏ": "oo", "ⓟ": "p", "ｐ": "p", "ṕ": "p", "ṗ": "p", "ƥ": "p", "ᵽ": "p", "ꝑ": "p", "ꝓ": "p", "ꝕ": "p", "ⓠ": "q", "ｑ": "q", "ɋ": "q", "ꝗ": "q", "ꝙ": "q", "ⓡ": "r", "ｒ": "r", "ŕ": "r", "ṙ": "r", "ř": "r", "ȑ": "r", "ȓ": "r", "ṛ": "r", "ṝ": "r", "ŗ": "r", "ṟ": "r", "ɍ": "r", "ɽ": "r", "ꝛ": "r", "ꞧ": "r", "ꞃ": "r", "ⓢ": "s", "ｓ": "s", "ß": "s", "ś": "s", "ṥ": "s", "ŝ": "s", "ṡ": "s", "š": "s", "ṧ": "s", "ṣ": "s", "ṩ": "s", "ș": "s", "ş": "s", "ȿ": "s", "ꞩ": "s", "ꞅ": "s", "ẛ": "s", "ⓣ": "t", "ｔ": "t", "ṫ": "t", "ẗ": "t", "ť": "t", "ṭ": "t", "ț": "t", "ţ": "t", "ṱ": "t", "ṯ": "t", "ŧ": "t", "ƭ": "t", "ʈ": "t", "ⱦ": "t", "ꞇ": "t", "ꜩ": "tz", "ⓤ": "u", "ｕ": "u", "ù": "u", "ú": "u", "û": "u", "ũ": "u", "ṹ": "u", "ū": "u", "ṻ": "u", "ŭ": "u", "ü": "u", "ǜ": "u", "ǘ": "u", "ǖ": "u", "ǚ": "u", "ủ": "u", "ů": "u", "ű": "u", "ǔ": "u", "ȕ": "u", "ȗ": "u", "ư": "u", "ừ": "u", "ứ": "u", "ữ": "u", "ử": "u", "ự": "u", "ụ": "u", "ṳ": "u", "ų": "u", "ṷ": "u", "ṵ": "u", "ʉ": "u", "ⓥ": "v", "ｖ": "v", "ṽ": "v", "ṿ": "v", "ʋ": "v", "ꝟ": "v", "ʌ": "v", "ꝡ": "vy", "ⓦ": "w", "ｗ": "w", "ẁ": "w", "ẃ": "w", "ŵ": "w", "ẇ": "w", "ẅ": "w", "ẘ": "w", "ẉ": "w", "ⱳ": "w", "ⓧ": "x", "ｘ": "x", "ẋ": "x", "ẍ": "x", "ⓨ": "y", "ｙ": "y", "ỳ": "y", "ý": "y", "ŷ": "y", "ỹ": "y", "ȳ": "y", "ẏ": "y", "ÿ": "y", "ỷ": "y", "ẙ": "y", "ỵ": "y", "ƴ": "y", "ɏ": "y", "ỿ": "y", "ⓩ": "z", "ｚ": "z", "ź": "z", "ẑ": "z", "ż": "z", "ž": "z", "ẓ": "z", "ẕ": "z", "ƶ": "z", "ȥ": "z", "ɀ": "z", "ⱬ": "z", "ꝣ": "z", "Ά": "Α", "Έ": "Ε", "Ή": "Η", "Ί": "Ι", "Ϊ": "Ι", "Ό": "Ο", "Ύ": "Υ", "Ϋ": "Υ", "Ώ": "Ω", "ά": "α", "έ": "ε", "ή": "η", "ί": "ι", "ϊ": "ι", "ΐ": "ι", "ό": "ο", "ύ": "υ", "ϋ": "υ", "ΰ": "υ", "ω": "ω", "ς": "σ" }; return e }), t.define("select2/data/base", ["../utils"], function(e) {
                    function t(e, i) { t.__super__.constructor.call(this) }
                    return e.Extend(t, e.Observable), t.prototype.current = function(e) { throw new Error("The `current` method must be defined in child classes.") }, t.prototype.query = function(e, t) { throw new Error("The `query` method must be defined in child classes.") }, t.prototype.bind = function(e, t) {}, t.prototype.destroy = function() {}, t.prototype.generateResultId = function(t, i) { var s = t.id + "-result-"; return s += e.generateChars(4), s += null != i.id ? "-" + i.id.toString() : "-" + e.generateChars(4) }, t
                }), t.define("select2/data/select", ["./base", "../utils", "jquery"], function(e, t, i) {
                    function s(e, t) { this.$element = e, this.options = t, s.__super__.constructor.call(this) }
                    return t.Extend(s, e), s.prototype.current = function(e) {
                        var t = [],
                            s = this;
                        this.$element.find(":selected").each(function() {
                            var e = i(this),
                                n = s.item(e);
                            t.push(n)
                        }), e(t)
                    }, s.prototype.select = function(e) {
                        var t = this;
                        if (e.selected = !0, i(e.element).is("option")) return e.element.selected = !0, void this.$element.trigger("change");
                        if (this.$element.prop("multiple")) this.current(function(s) {
                            var n = [];
                            e = [e], e.push.apply(e, s);
                            for (var o = 0; o < e.length; o++) { var r = e[o].id; - 1 === i.inArray(r, n) && n.push(r) }
                            t.$element.val(n), t.$element.trigger("change")
                        });
                        else {
                            var s = e.id;
                            this.$element.val(s), this.$element.trigger("change")
                        }
                    }, s.prototype.unselect = function(e) {
                        var t = this;
                        return this.$element.prop("multiple") ? (e.selected = !1, i(e.element).is("option") ? (e.element.selected = !1, void this.$element.trigger("change")) : void this.current(function(s) {
                            for (var n = [], o = 0; o < s.length; o++) {
                                var r = s[o].id;
                                r !== e.id && -1 === i.inArray(r, n) && n.push(r)
                            }
                            t.$element.val(n), t.$element.trigger("change")
                        })) : void 0
                    }, s.prototype.bind = function(e, t) {
                        var i = this;
                        this.container = e, e.on("select", function(e) { i.select(e.data) }), e.on("unselect", function(e) { i.unselect(e.data) })
                    }, s.prototype.destroy = function() { this.$element.find("*").each(function() { i.removeData(this, "data") }) }, s.prototype.query = function(e, t) {
                        var s = [],
                            n = this,
                            o = this.$element.children();
                        o.each(function() {
                            var t = i(this);
                            if (t.is("option") || t.is("optgroup")) {
                                var o = n.item(t),
                                    r = n.matches(e, o);
                                null !== r && s.push(r)
                            }
                        }), t({ results: s })
                    }, s.prototype.addOptions = function(e) { t.appendMany(this.$element, e) }, s.prototype.option = function(e) {
                        var t;
                        e.children ? (t = document.createElement("optgroup"), t.label = e.text) : (t = document.createElement("option"), void 0 !== t.textContent ? t.textContent = e.text : t.innerText = e.text), e.id && (t.value = e.id), e.disabled && (t.disabled = !0), e.selected && (t.selected = !0), e.title && (t.title = e.title);
                        var s = i(t),
                            n = this._normalizeItem(e);
                        return n.element = t, i.data(t, "data", n), s
                    }, s.prototype.item = function(e) {
                        var t = {};
                        if (t = i.data(e[0], "data"), null != t) return t;
                        if (e.is("option")) t = { id: e.val(), text: e.text(), disabled: e.prop("disabled"), selected: e.prop("selected"), title: e.prop("title") };
                        else if (e.is("optgroup")) {
                            t = { text: e.prop("label"), children: [], title: e.prop("title") };
                            for (var s = e.children("option"), n = [], o = 0; o < s.length; o++) {
                                var r = i(s[o]),
                                    a = this.item(r);
                                n.push(a)
                            }
                            t.children = n
                        }
                        return t = this._normalizeItem(t), t.element = e[0], i.data(e[0], "data", t), t
                    }, s.prototype._normalizeItem = function(e) { i.isPlainObject(e) || (e = { id: e, text: e }), e = i.extend({}, { text: "" }, e); var t = { selected: !1, disabled: !1 }; return null != e.id && (e.id = e.id.toString()), null != e.text && (e.text = e.text.toString()), null == e._resultId && e.id && null != this.container && (e._resultId = this.generateResultId(this.container, e)), i.extend({}, t, e) }, s.prototype.matches = function(e, t) { var i = this.options.get("matcher"); return i(e, t) }, s
                }), t.define("select2/data/array", ["./select", "../utils", "jquery"], function(e, t, i) {
                    function s(e, t) {
                        var i = t.get("data") || [];
                        s.__super__.constructor.call(this, e, t), this.addOptions(this.convertToOptions(i))
                    }
                    return t.Extend(s, e), s.prototype.select = function(e) {
                        var t = this.$element.find("option").filter(function(t, i) { return i.value == e.id.toString() });
                        0 === t.length && (t = this.option(e), this.addOptions(t)), s.__super__.select.call(this, e)
                    }, s.prototype.convertToOptions = function(e) {
                        function s(e) { return function() { return i(this).val() == e.id } }
                        for (var n = this, o = this.$element.find("option"), r = o.map(function() { return n.item(i(this)).id }).get(), a = [], l = 0; l < e.length; l++) {
                            var h = this._normalizeItem(e[l]);
                            if (i.inArray(h.id, r) >= 0) {
                                var c = o.filter(s(h)),
                                    u = this.item(c),
                                    d = i.extend(!0, {}, u, h),
                                    p = this.option(d);
                                c.replaceWith(p)
                            } else {
                                var f = this.option(h);
                                if (h.children) {
                                    var m = this.convertToOptions(h.children);
                                    t.appendMany(f, m)
                                }
                                a.push(f)
                            }
                        }
                        return a
                    }, s
                }), t.define("select2/data/ajax", ["./array", "../utils", "jquery"], function(e, t, i) {
                    function s(e, t) { this.ajaxOptions = this._applyDefaults(t.get("ajax")), null != this.ajaxOptions.processResults && (this.processResults = this.ajaxOptions.processResults), s.__super__.constructor.call(this, e, t) }
                    return t.Extend(s, e), s.prototype._applyDefaults = function(e) { var t = { data: function(e) { return i.extend({}, e, { q: e.term }) }, transport: function(e, t, s) { var n = i.ajax(e); return n.then(t), n.fail(s), n } }; return i.extend({}, t, e, !0) }, s.prototype.processResults = function(e) { return e }, s.prototype.query = function(e, t) {
                        function s() {
                            var s = o.transport(o, function(s) {
                                var o = n.processResults(s, e);
                                n.options.get("debug") && window.console && console.error && (o && o.results && i.isArray(o.results) || console.error("Select2: The AJAX results did not return an array in the `results` key of the response.")), t(o)
                            }, function() {});
                            n._request = s
                        }
                        var n = this;
                        null != this._request && (i.isFunction(this._request.abort) && this._request.abort(), this._request = null);
                        var o = i.extend({ type: "GET" }, this.ajaxOptions);
                        "function" == typeof o.url && (o.url = o.url.call(this.$element, e)), "function" == typeof o.data && (o.data = o.data.call(this.$element, e)), this.ajaxOptions.delay && "" !== e.term ? (this._queryTimeout && window.clearTimeout(this._queryTimeout), this._queryTimeout = window.setTimeout(s, this.ajaxOptions.delay)) : s()
                    }, s
                }), t.define("select2/data/tags", ["jquery"], function(e) {
                    function t(t, i, s) {
                        var n = s.get("tags"),
                            o = s.get("createTag");
                        if (void 0 !== o && (this.createTag = o), t.call(this, i, s), e.isArray(n))
                            for (var r = 0; r < n.length; r++) {
                                var a = n[r],
                                    l = this._normalizeItem(a),
                                    h = this.option(l);
                                this.$element.append(h)
                            }
                    }
                    return t.prototype.query = function(e, t, i) {
                        function s(e, o) {
                            for (var r = e.results, a = 0; a < r.length; a++) {
                                var l = r[a],
                                    h = null != l.children && !s({ results: l.children }, !0),
                                    c = l.text === t.term;
                                if (c || h) return o ? !1 : (e.data = r, void i(e))
                            }
                            if (o) return !0;
                            var u = n.createTag(t);
                            if (null != u) {
                                var d = n.option(u);
                                d.attr("data-select2-tag", !0), n.addOptions([d]), n.insertTag(r, u)
                            }
                            e.results = r, i(e)
                        }
                        var n = this;
                        return this._removeOldTags(), null == t.term || null != t.page ? void e.call(this, t, i) : void e.call(this, t, s)
                    }, t.prototype.createTag = function(t, i) { var s = e.trim(i.term); return "" === s ? null : { id: s, text: s } }, t.prototype.insertTag = function(e, t, i) { t.unshift(i) }, t.prototype._removeOldTags = function(t) {
                        var i = (this._lastTag, this.$element.find("option[data-select2-tag]"));
                        i.each(function() { this.selected || e(this).remove() })
                    }, t
                }), t.define("select2/data/tokenizer", ["jquery"], function(e) {
                    function t(e, t, i) {
                        var s = i.get("tokenizer");
                        void 0 !== s && (this.tokenizer = s), e.call(this, t, i)
                    }
                    return t.prototype.bind = function(e, t, i) { e.call(this, t, i), this.$search = t.dropdown.$search || t.selection.$search || i.find(".select2-search__field") }, t.prototype.query = function(e, t, i) {
                        function s(e) { n.trigger("select", { data: e }) }
                        var n = this;
                        t.term = t.term || "";
                        var o = this.tokenizer(t, this.options, s);
                        o.term !== t.term && (this.$search.length && (this.$search.val(o.term), this.$search.focus()), t.term = o.term), e.call(this, t, i)
                    }, t.prototype.tokenizer = function(t, i, s, n) {
                        for (var o = s.get("tokenSeparators") || [], r = i.term, a = 0, l = this.createTag || function(e) { return { id: e.term, text: e.term } }; a < r.length;) {
                            var h = r[a];
                            if (-1 !== e.inArray(h, o)) {
                                var c = r.substr(0, a),
                                    u = e.extend({}, i, { term: c }),
                                    d = l(u);
                                null != d ? (n(d), r = r.substr(a + 1) || "", a = 0) : a++
                            } else a++
                        }
                        return { term: r }
                    }, t
                }), t.define("select2/data/minimumInputLength", [], function() {
                    function e(e, t, i) { this.minimumInputLength = i.get("minimumInputLength"), e.call(this, t, i) }
                    return e.prototype.query = function(e, t, i) { return t.term = t.term || "", t.term.length < this.minimumInputLength ? void this.trigger("results:message", { message: "inputTooShort", args: { minimum: this.minimumInputLength, input: t.term, params: t } }) : void e.call(this, t, i) }, e
                }), t.define("select2/data/maximumInputLength", [], function() {
                    function e(e, t, i) { this.maximumInputLength = i.get("maximumInputLength"), e.call(this, t, i) }
                    return e.prototype.query = function(e, t, i) { return t.term = t.term || "", this.maximumInputLength > 0 && t.term.length > this.maximumInputLength ? void this.trigger("results:message", { message: "inputTooLong", args: { maximum: this.maximumInputLength, input: t.term, params: t } }) : void e.call(this, t, i) }, e
                }), t.define("select2/data/maximumSelectionLength", [], function() {
                    function e(e, t, i) { this.maximumSelectionLength = i.get("maximumSelectionLength"), e.call(this, t, i) }
                    return e.prototype.query = function(e, t, i) {
                        var s = this;
                        this.current(function(n) { var o = null != n ? n.length : 0; return s.maximumSelectionLength > 0 && o >= s.maximumSelectionLength ? void s.trigger("results:message", { message: "maximumSelected", args: { maximum: s.maximumSelectionLength } }) : void e.call(s, t, i) })
                    }, e
                }), t.define("select2/dropdown", ["jquery", "./utils"], function(e, t) {
                    function i(e, t) { this.$element = e, this.options = t, i.__super__.constructor.call(this) }
                    return t.Extend(i, t.Observable), i.prototype.render = function() { var t = e('<span class="select2-dropdown"><span class="select2-results"></span></span>'); return t.attr("dir", this.options.get("dir")), this.$dropdown = t, t }, i.prototype.bind = function() {}, i.prototype.position = function(e, t) {}, i.prototype.destroy = function() { this.$dropdown.remove() }, i
                }), t.define("select2/dropdown/search", ["jquery", "../utils"], function(e, t) {
                    function i() {}
                    return i.prototype.render = function(t) {
                        var i = t.call(this),
                            s = e('<span class="select2-search select2-search--dropdown"><input class="select2-search__field" type="search" tabindex="-1" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" role="textbox" /></span>');
                        return this.$searchContainer = s, this.$search = s.find("input"), i.prepend(s), i
                    }, i.prototype.bind = function(t, i, s) {
                        var n = this;
                        t.call(this, i, s), this.$search.on("keydown", function(e) { n.trigger("keypress", e), n._keyUpPrevented = e.isDefaultPrevented() }), this.$search.on("input", function(t) { e(this).off("keyup") }), this.$search.on("keyup input", function(e) { n.handleSearch(e) }), i.on("open", function() { n.$search.attr("tabindex", 0), n.$search.focus(), window.setTimeout(function() { n.$search.focus() }, 0) }), i.on("close", function() { n.$search.attr("tabindex", -1), n.$search.val("") }), i.on("results:all", function(e) {
                            if (null == e.query.term || "" === e.query.term) {
                                var t = n.showSearch(e);
                                t ? n.$searchContainer.removeClass("select2-search--hide") : n.$searchContainer.addClass("select2-search--hide")
                            }
                        })
                    }, i.prototype.handleSearch = function(e) {
                        if (!this._keyUpPrevented) {
                            var t = this.$search.val();
                            this.trigger("query", { term: t })
                        }
                        this._keyUpPrevented = !1
                    }, i.prototype.showSearch = function(e, t) { return !0 }, i
                }), t.define("select2/dropdown/hidePlaceholder", [], function() {
                    function e(e, t, i, s) { this.placeholder = this.normalizePlaceholder(i.get("placeholder")), e.call(this, t, i, s) }
                    return e.prototype.append = function(e, t) { t.results = this.removePlaceholder(t.results), e.call(this, t) }, e.prototype.normalizePlaceholder = function(e, t) { return "string" == typeof t && (t = { id: "", text: t }), t }, e.prototype.removePlaceholder = function(e, t) {
                        for (var i = t.slice(0), s = t.length - 1; s >= 0; s--) {
                            var n = t[s];
                            this.placeholder.id === n.id && i.splice(s, 1)
                        }
                        return i
                    }, e
                }), t.define("select2/dropdown/infiniteScroll", ["jquery"], function(e) {
                    function t(e, t, i, s) { this.lastParams = {}, e.call(this, t, i, s), this.$loadingMore = this.createLoadingMore(), this.loading = !1 }
                    return t.prototype.append = function(e, t) { this.$loadingMore.remove(), this.loading = !1, e.call(this, t), this.showLoadingMore(t) && this.$results.append(this.$loadingMore) }, t.prototype.bind = function(t, i, s) {
                        var n = this;
                        t.call(this, i, s), i.on("query", function(e) { n.lastParams = e, n.loading = !0 }), i.on("query:append", function(e) { n.lastParams = e, n.loading = !0 }), this.$results.on("scroll", function() {
                            var t = e.contains(document.documentElement, n.$loadingMore[0]);
                            if (!n.loading && t) {
                                var i = n.$results.offset().top + n.$results.outerHeight(!1),
                                    s = n.$loadingMore.offset().top + n.$loadingMore.outerHeight(!1);
                                i + 50 >= s && n.loadMore()
                            }
                        })
                    }, t.prototype.loadMore = function() {
                        this.loading = !0;
                        var t = e.extend({}, { page: 1 }, this.lastParams);
                        t.page++, this.trigger("query:append", t)
                    }, t.prototype.showLoadingMore = function(e, t) { return t.pagination && t.pagination.more }, t.prototype.createLoadingMore = function() {
                        var t = e('<li class="select2-results__option select2-results__option--load-more"role="treeitem" aria-disabled="true"></li>'),
                            i = this.options.get("translations").get("loadingMore");
                        return t.html(i(this.lastParams)), t
                    }, t
                }), t.define("select2/dropdown/attachBody", ["jquery", "../utils"], function(e, t) {
                    function i(e, t, i) { this.$dropdownParent = i.get("dropdownParent") || document.body, e.call(this, t, i) }
                    return i.prototype.bind = function(e, t, i) {
                        var s = this,
                            n = !1;
                        e.call(this, t, i), t.on("open", function() { s._showDropdown(), s._attachPositioningHandler(t), n || (n = !0, t.on("results:all", function() { s._positionDropdown(), s._resizeDropdown() }), t.on("results:append", function() { s._positionDropdown(), s._resizeDropdown() })) }), t.on("close", function() { s._hideDropdown(), s._detachPositioningHandler(t) }), this.$dropdownContainer.on("mousedown", function(e) { e.stopPropagation() })
                    }, i.prototype.destroy = function(e) { e.call(this), this.$dropdownContainer.remove() }, i.prototype.position = function(e, t, i) { t.attr("class", i.attr("class")), t.removeClass("select2"), t.addClass("select2-container--open"), t.css({ position: "absolute", top: -999999 }), this.$container = i }, i.prototype.render = function(t) {
                        var i = e("<span></span>"),
                            s = t.call(this);
                        return i.append(s), this.$dropdownContainer = i, i
                    }, i.prototype._hideDropdown = function(e) { this.$dropdownContainer.detach() }, i.prototype._attachPositioningHandler = function(i) {
                        var s = this,
                            n = "scroll.select2." + i.id,
                            o = "resize.select2." + i.id,
                            r = "orientationchange.select2." + i.id,
                            a = this.$container.parents().filter(t.hasScroll);
                        a.each(function() { e(this).data("select2-scroll-position", { x: e(this).scrollLeft(), y: e(this).scrollTop() }) }), a.on(n, function(t) {
                            var i = e(this).data("select2-scroll-position");
                            e(this).scrollTop(i.y)
                        }), e(window).on(n + " " + o + " " + r, function(e) { s._positionDropdown(), s._resizeDropdown() })
                    }, i.prototype._detachPositioningHandler = function(i) {
                        var s = "scroll.select2." + i.id,
                            n = "resize.select2." + i.id,
                            o = "orientationchange.select2." + i.id,
                            r = this.$container.parents().filter(t.hasScroll);
                        r.off(s), e(window).off(s + " " + n + " " + o)
                    }, i.prototype._positionDropdown = function() {
                        var t = e(window),
                            i = this.$dropdown.hasClass("select2-dropdown--above"),
                            s = this.$dropdown.hasClass("select2-dropdown--below"),
                            n = null,
                            o = (this.$container.position(), this.$container.offset());
                        o.bottom = o.top + this.$container.outerHeight(!1);
                        var r = { height: this.$container.outerHeight(!1) };
                        r.top = o.top, r.bottom = o.top + r.height;
                        var a = { height: this.$dropdown.outerHeight(!1) },
                            l = { top: t.scrollTop(), bottom: t.scrollTop() + t.height() },
                            h = l.top < o.top - a.height,
                            c = l.bottom > o.bottom + a.height,
                            u = { left: o.left, top: r.bottom };
                        i || s || (n = "below"), c || !h || i ? !h && c && i && (n = "below") : n = "above", ("above" == n || i && "below" !== n) && (u.top = r.top - a.height), null != n && (this.$dropdown.removeClass("select2-dropdown--below select2-dropdown--above").addClass("select2-dropdown--" + n), this.$container.removeClass("select2-container--below select2-container--above").addClass("select2-container--" + n)), this.$dropdownContainer.css(u)
                    }, i.prototype._resizeDropdown = function() {
                        var e = { width: this.$container.outerWidth(!1) + "px" };
                        this.options.get("dropdownAutoWidth") && (e.minWidth = e.width, e.width = "auto"), this.$dropdown.css(e)
                    }, i.prototype._showDropdown = function(e) { this.$dropdownContainer.appendTo(this.$dropdownParent), this._positionDropdown(), this._resizeDropdown() }, i
                }), t.define("select2/dropdown/minimumResultsForSearch", [], function() {
                    function e(t) {
                        for (var i = 0, s = 0; s < t.length; s++) {
                            var n = t[s];
                            n.children ? i += e(n.children) : i++
                        }
                        return i
                    }

                    function t(e, t, i, s) { this.minimumResultsForSearch = i.get("minimumResultsForSearch"), this.minimumResultsForSearch < 0 && (this.minimumResultsForSearch = 1 / 0), e.call(this, t, i, s) }
                    return t.prototype.showSearch = function(t, i) { return e(i.data.results) < this.minimumResultsForSearch ? !1 : t.call(this, i) }, t
                }), t.define("select2/dropdown/selectOnClose", [], function() {
                    function e() {}
                    return e.prototype.bind = function(e, t, i) {
                        var s = this;
                        e.call(this, t, i), t.on("close", function() { s._handleSelectOnClose() })
                    }, e.prototype._handleSelectOnClose = function() {
                        var e = this.getHighlightedResults();
                        e.length < 1 || this.trigger("select", { data: e.data("data") })
                    }, e
                }), t.define("select2/dropdown/closeOnSelect", [], function() {
                    function e() {}
                    return e.prototype.bind = function(e, t, i) {
                        var s = this;
                        e.call(this, t, i), t.on("select", function(e) { s._selectTriggered(e) }), t.on("unselect", function(e) { s._selectTriggered(e) })
                    }, e.prototype._selectTriggered = function(e, t) {
                        var i = t.originalEvent;
                        i && i.ctrlKey || this.trigger("close", {})
                    }, e
                }), t.define("select2/i18n/en", [], function() {
                    return {
                        errorLoading: function() { return "The results could not be loaded." },
                        inputTooLong: function(e) {
                            var t = e.input.length - e.maximum,
                                i = "Please delete " + t + " character";
                            return 1 != t && (i += "s"), i
                        },
                        inputTooShort: function(e) {
                            var t = e.minimum - e.input.length,
                                i = "Please enter " + t + " or more characters";
                            return i
                        },
                        loadingMore: function() { return "Loading more results…" },
                        maximumSelected: function(e) { var t = "You can only select " + e.maximum + " item"; return 1 != e.maximum && (t += "s"), t },
                        noResults: function() { return "No results found" },
                        searching: function() { return "Searching…" }
                    }
                }), t.define("select2/defaults", ["jquery", "require", "./results", "./selection/single", "./selection/multiple", "./selection/placeholder", "./selection/allowClear", "./selection/search", "./selection/eventRelay", "./utils", "./translation", "./diacritics", "./data/select", "./data/array", "./data/ajax", "./data/tags", "./data/tokenizer", "./data/minimumInputLength", "./data/maximumInputLength", "./data/maximumSelectionLength", "./dropdown", "./dropdown/search", "./dropdown/hidePlaceholder", "./dropdown/infiniteScroll", "./dropdown/attachBody", "./dropdown/minimumResultsForSearch", "./dropdown/selectOnClose", "./dropdown/closeOnSelect", "./i18n/en"], function(e, t, i, s, n, o, r, a, l, h, c, u, d, p, f, m, g, v, b, y, x, w, _, C, I, T, k, S, D) {
                    function P() { this.reset() }
                    P.prototype.apply = function(u) {
                        if (u = e.extend({}, this.defaults, u),
                            null == u.dataAdapter) {
                            if (null != u.ajax ? u.dataAdapter = f : null != u.data ? u.dataAdapter = p : u.dataAdapter = d, u.minimumInputLength > 0 && (u.dataAdapter = h.Decorate(u.dataAdapter, v)), u.maximumInputLength > 0 && (u.dataAdapter = h.Decorate(u.dataAdapter, b)), u.maximumSelectionLength > 0 && (u.dataAdapter = h.Decorate(u.dataAdapter, y)), u.tags && (u.dataAdapter = h.Decorate(u.dataAdapter, m)), (null != u.tokenSeparators || null != u.tokenizer) && (u.dataAdapter = h.Decorate(u.dataAdapter, g)), null != u.query) {
                                var D = t(u.amdBase + "compat/query");
                                u.dataAdapter = h.Decorate(u.dataAdapter, D)
                            }
                            if (null != u.initSelection) {
                                var P = t(u.amdBase + "compat/initSelection");
                                u.dataAdapter = h.Decorate(u.dataAdapter, P)
                            }
                        }
                        if (null == u.resultsAdapter && (u.resultsAdapter = i, null != u.ajax && (u.resultsAdapter = h.Decorate(u.resultsAdapter, C)), null != u.placeholder && (u.resultsAdapter = h.Decorate(u.resultsAdapter, _)), u.selectOnClose && (u.resultsAdapter = h.Decorate(u.resultsAdapter, k))), null == u.dropdownAdapter) {
                            if (u.multiple) u.dropdownAdapter = x;
                            else {
                                var j = h.Decorate(x, w);
                                u.dropdownAdapter = j
                            }
                            if (0 !== u.minimumResultsForSearch && (u.dropdownAdapter = h.Decorate(u.dropdownAdapter, T)), u.closeOnSelect && (u.dropdownAdapter = h.Decorate(u.dropdownAdapter, S)), null != u.dropdownCssClass || null != u.dropdownCss || null != u.adaptDropdownCssClass) {
                                var E = t(u.amdBase + "compat/dropdownCss");
                                u.dropdownAdapter = h.Decorate(u.dropdownAdapter, E)
                            }
                            u.dropdownAdapter = h.Decorate(u.dropdownAdapter, I)
                        }
                        if (null == u.selectionAdapter) {
                            if (u.multiple ? u.selectionAdapter = n : u.selectionAdapter = s, null != u.placeholder && (u.selectionAdapter = h.Decorate(u.selectionAdapter, o)), u.allowClear && (u.selectionAdapter = h.Decorate(u.selectionAdapter, r)), u.multiple && (u.selectionAdapter = h.Decorate(u.selectionAdapter, a)), null != u.containerCssClass || null != u.containerCss || null != u.adaptContainerCssClass) {
                                var q = t(u.amdBase + "compat/containerCss");
                                u.selectionAdapter = h.Decorate(u.selectionAdapter, q)
                            }
                            u.selectionAdapter = h.Decorate(u.selectionAdapter, l)
                        }
                        if ("string" == typeof u.language)
                            if (u.language.indexOf("-") > 0) {
                                var A = u.language.split("-"),
                                    M = A[0];
                                u.language = [u.language, M]
                            } else u.language = [u.language];
                        if (e.isArray(u.language)) {
                            var H = new c;
                            u.language.push("en");
                            for (var O = u.language, N = 0; N < O.length; N++) {
                                var $ = O[N],
                                    z = {};
                                try { z = c.loadPath($) } catch (L) { try { $ = this.defaults.amdLanguageBase + $, z = c.loadPath($) } catch (B) { u.debug && window.console && console.warn && console.warn('Select2: The language file for "' + $ + '" could not be automatically loaded. A fallback will be used instead.'); continue } }
                                H.extend(z)
                            }
                            u.translations = H
                        } else {
                            var W = c.loadPath(this.defaults.amdLanguageBase + "en"),
                                R = new c(u.language);
                            R.extend(W), u.translations = R
                        }
                        return u
                    }, P.prototype.reset = function() {
                        function t(e) {
                            function t(e) { return u[e] || e }
                            return e.replace(/[^\u0000-\u007E]/g, t)
                        }

                        function i(s, n) {
                            if ("" === e.trim(s.term)) return n;
                            if (n.children && n.children.length > 0) {
                                for (var o = e.extend(!0, {}, n), r = n.children.length - 1; r >= 0; r--) {
                                    var a = n.children[r],
                                        l = i(s, a);
                                    null == l && o.children.splice(r, 1)
                                }
                                return o.children.length > 0 ? o : i(s, o)
                            }
                            var h = t(n.text).toUpperCase(),
                                c = t(s.term).toUpperCase();
                            return h.indexOf(c) > -1 ? n : null
                        }
                        this.defaults = { amdBase: "./", amdLanguageBase: "./i18n/", closeOnSelect: !0, debug: !1, dropdownAutoWidth: !1, escapeMarkup: h.escapeMarkup, language: D, matcher: i, minimumInputLength: 0, maximumInputLength: 0, maximumSelectionLength: 0, minimumResultsForSearch: 0, selectOnClose: !1, sorter: function(e) { return e }, templateResult: function(e) { return e.text }, templateSelection: function(e) { return e.text }, theme: "default", width: "resolve" }
                    }, P.prototype.set = function(t, i) {
                        var s = e.camelCase(t),
                            n = {};
                        n[s] = i;
                        var o = h._convertData(n);
                        e.extend(this.defaults, o)
                    };
                    var j = new P;
                    return j
                }), t.define("select2/options", ["require", "jquery", "./defaults", "./utils"], function(e, t, i, s) {
                    function n(t, n) {
                        if (this.options = t, null != n && this.fromElement(n), this.options = i.apply(this.options), n && n.is("input")) {
                            var o = e(this.get("amdBase") + "compat/inputData");
                            this.options.dataAdapter = s.Decorate(this.options.dataAdapter, o)
                        }
                    }
                    return n.prototype.fromElement = function(e) {
                        var i = ["select2"];
                        null == this.options.multiple && (this.options.multiple = e.prop("multiple")), null == this.options.disabled && (this.options.disabled = e.prop("disabled")), null == this.options.language && (e.prop("lang") ? this.options.language = e.prop("lang").toLowerCase() : e.closest("[lang]").prop("lang") && (this.options.language = e.closest("[lang]").prop("lang"))), null == this.options.dir && (e.prop("dir") ? this.options.dir = e.prop("dir") : e.closest("[dir]").prop("dir") ? this.options.dir = e.closest("[dir]").prop("dir") : this.options.dir = "ltr"), e.prop("disabled", this.options.disabled), e.prop("multiple", this.options.multiple), e.data("select2Tags") && (this.options.debug && window.console && console.warn && console.warn('Select2: The `data-select2-tags` attribute has been changed to use the `data-data` and `data-tags="true"` attributes and will be removed in future versions of Select2.'), e.data("data", e.data("select2Tags")), e.data("tags", !0)), e.data("ajaxUrl") && (this.options.debug && window.console && console.warn && console.warn("Select2: The `data-ajax-url` attribute has been changed to `data-ajax--url` and support for the old attribute will be removed in future versions of Select2."), e.attr("ajax--url", e.data("ajaxUrl")), e.data("ajax--url", e.data("ajaxUrl")));
                        var n = {};
                        n = t.fn.jquery && "1." == t.fn.jquery.substr(0, 2) && e[0].dataset ? t.extend(!0, {}, e[0].dataset, e.data()) : e.data();
                        var o = t.extend(!0, {}, n);
                        o = s._convertData(o);
                        for (var r in o) t.inArray(r, i) > -1 || (t.isPlainObject(this.options[r]) ? t.extend(this.options[r], o[r]) : this.options[r] = o[r]);
                        return this
                    }, n.prototype.get = function(e) { return this.options[e] }, n.prototype.set = function(e, t) { this.options[e] = t }, n
                }), t.define("select2/core", ["jquery", "./options", "./utils", "./keys"], function(e, t, i, s) {
                    var n = function(e, i) {
                        null != e.data("select2") && e.data("select2").destroy(), this.$element = e, this.id = this._generateId(e), i = i || {}, this.options = new t(i, e), n.__super__.constructor.call(this);
                        var s = e.attr("tabindex") || 0;
                        e.data("old-tabindex", s), e.attr("tabindex", "-1");
                        var o = this.options.get("dataAdapter");
                        this.dataAdapter = new o(e, this.options);
                        var r = this.render();
                        this._placeContainer(r);
                        var a = this.options.get("selectionAdapter");
                        this.selection = new a(e, this.options), this.$selection = this.selection.render(), this.selection.position(this.$selection, r);
                        var l = this.options.get("dropdownAdapter");
                        this.dropdown = new l(e, this.options), this.$dropdown = this.dropdown.render(), this.dropdown.position(this.$dropdown, r);
                        var h = this.options.get("resultsAdapter");
                        this.results = new h(e, this.options, this.dataAdapter), this.$results = this.results.render(), this.results.position(this.$results, this.$dropdown);
                        var c = this;
                        this._bindAdapters(), this._registerDomEvents(), this._registerDataEvents(), this._registerSelectionEvents(), this._registerDropdownEvents(), this._registerResultsEvents(), this._registerEvents(), this.dataAdapter.current(function(e) { c.trigger("selection:update", { data: e }) }), e.addClass("select2-hidden-accessible"), e.attr("aria-hidden", "true"), this._syncAttributes(), e.data("select2", this)
                    };
                    return i.Extend(n, i.Observable), n.prototype._generateId = function(e) { var t = ""; return t = null != e.attr("id") ? e.attr("id") : null != e.attr("name") ? e.attr("name") + "-" + i.generateChars(2) : i.generateChars(4), t = "select2-" + t }, n.prototype._placeContainer = function(e) {
                        e.insertAfter(this.$element);
                        var t = this._resolveWidth(this.$element, this.options.get("width"));
                        null != t && e.css("width", t)
                    }, n.prototype._resolveWidth = function(e, t) {
                        var i = /^width:(([-+]?([0-9]*\.)?[0-9]+)(px|em|ex|%|in|cm|mm|pt|pc))/i;
                        if ("resolve" == t) { var s = this._resolveWidth(e, "style"); return null != s ? s : this._resolveWidth(e, "element") }
                        if ("element" == t) { var n = e.outerWidth(!1); return 0 >= n ? "auto" : n + "px" }
                        if ("style" == t) {
                            var o = e.attr("style");
                            if ("string" != typeof o) return null;
                            for (var r = o.split(";"), a = 0, l = r.length; l > a; a += 1) {
                                var h = r[a].replace(/\s/g, ""),
                                    c = h.match(i);
                                if (null !== c && c.length >= 1) return c[1]
                            }
                            return null
                        }
                        return t
                    }, n.prototype._bindAdapters = function() { this.dataAdapter.bind(this, this.$container), this.selection.bind(this, this.$container), this.dropdown.bind(this, this.$container), this.results.bind(this, this.$container) }, n.prototype._registerDomEvents = function() {
                        var t = this;
                        this.$element.on("change.select2", function() { t.dataAdapter.current(function(e) { t.trigger("selection:update", { data: e }) }) }), this._sync = i.bind(this._syncAttributes, this), this.$element[0].attachEvent && this.$element[0].attachEvent("onpropertychange", this._sync);
                        var s = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver;
                        null != s ? (this._observer = new s(function(i) { e.each(i, t._sync) }), this._observer.observe(this.$element[0], { attributes: !0, subtree: !1 })) : this.$element[0].addEventListener && this.$element[0].addEventListener("DOMAttrModified", t._sync, !1)
                    }, n.prototype._registerDataEvents = function() {
                        var e = this;
                        this.dataAdapter.on("*", function(t, i) { e.trigger(t, i) })
                    }, n.prototype._registerSelectionEvents = function() {
                        var t = this,
                            i = ["toggle", "focus"];
                        this.selection.on("toggle", function() { t.toggleDropdown() }), this.selection.on("focus", function(e) { t.focus(e) }), this.selection.on("*", function(s, n) {-1 === e.inArray(s, i) && t.trigger(s, n) })
                    }, n.prototype._registerDropdownEvents = function() {
                        var e = this;
                        this.dropdown.on("*", function(t, i) { e.trigger(t, i) })
                    }, n.prototype._registerResultsEvents = function() {
                        var e = this;
                        this.results.on("*", function(t, i) { e.trigger(t, i) })
                    }, n.prototype._registerEvents = function() {
                        var e = this;
                        this.on("open", function() { e.$container.addClass("select2-container--open") }), this.on("close", function() { e.$container.removeClass("select2-container--open") }), this.on("enable", function() { e.$container.removeClass("select2-container--disabled") }), this.on("disable", function() { e.$container.addClass("select2-container--disabled") }), this.on("blur", function() { e.$container.removeClass("select2-container--focus") }), this.on("query", function(t) { e.isOpen() || e.trigger("open", {}), this.dataAdapter.query(t, function(i) { e.trigger("results:all", { data: i, query: t }) }) }), this.on("query:append", function(t) { this.dataAdapter.query(t, function(i) { e.trigger("results:append", { data: i, query: t }) }) }), this.on("keypress", function(t) {
                            var i = t.which;
                            e.isOpen() ? i === s.ESC || i === s.TAB || i === s.UP && t.altKey ? (e.close(), t.preventDefault()) : i === s.ENTER ? (e.trigger("results:select", {}), t.preventDefault()) : i === s.SPACE && t.ctrlKey ? (e.trigger("results:toggle", {}), t.preventDefault()) : i === s.UP ? (e.trigger("results:previous", {}), t.preventDefault()) : i === s.DOWN && (e.trigger("results:next", {}), t.preventDefault()) : (i === s.ENTER || i === s.SPACE || i === s.DOWN && t.altKey) && (e.open(), t.preventDefault())
                        })
                    }, n.prototype._syncAttributes = function() { this.options.set("disabled", this.$element.prop("disabled")), this.options.get("disabled") ? (this.isOpen() && this.close(), this.trigger("disable", {})) : this.trigger("enable", {}) }, n.prototype.trigger = function(e, t) {
                        var i = n.__super__.trigger,
                            s = { open: "opening", close: "closing", select: "selecting", unselect: "unselecting" };
                        if (void 0 === t && (t = {}), e in s) {
                            var o = s[e],
                                r = { prevented: !1, name: e, args: t };
                            if (i.call(this, o, r), r.prevented) return void(t.prevented = !0)
                        }
                        i.call(this, e, t)
                    }, n.prototype.toggleDropdown = function() { this.options.get("disabled") || (this.isOpen() ? this.close() : this.open()) }, n.prototype.open = function() { this.isOpen() || this.trigger("query", {}) }, n.prototype.close = function() { this.isOpen() && this.trigger("close", {}) }, n.prototype.isOpen = function() { return this.$container.hasClass("select2-container--open") }, n.prototype.hasFocus = function() { return this.$container.hasClass("select2-container--focus") }, n.prototype.focus = function(e) { this.hasFocus() || (this.$container.addClass("select2-container--focus"), this.trigger("focus", {})) }, n.prototype.enable = function(e) {
                        this.options.get("debug") && window.console && console.warn && console.warn('Select2: The `select2("enable")` method has been deprecated and will be removed in later Select2 versions. Use $element.prop("disabled") instead.'), (null == e || 0 === e.length) && (e = [!0]);
                        var t = !e[0];
                        this.$element.prop("disabled", t)
                    }, n.prototype.data = function() { this.options.get("debug") && arguments.length > 0 && window.console && console.warn && console.warn('Select2: Data can no longer be set using `select2("data")`. You should consider setting the value instead using `$element.val()`.'); var e = []; return this.dataAdapter.current(function(t) { e = t }), e }, n.prototype.val = function(t) {
                        if (this.options.get("debug") && window.console && console.warn && console.warn('Select2: The `select2("val")` method has been deprecated and will be removed in later Select2 versions. Use $element.val() instead.'), null == t || 0 === t.length) return this.$element.val();
                        var i = t[0];
                        e.isArray(i) && (i = e.map(i, function(e) { return e.toString() })), this.$element.val(i).trigger("change")
                    }, n.prototype.destroy = function() { this.$container.remove(), this.$element[0].detachEvent && this.$element[0].detachEvent("onpropertychange", this._sync), null != this._observer ? (this._observer.disconnect(), this._observer = null) : this.$element[0].removeEventListener && this.$element[0].removeEventListener("DOMAttrModified", this._sync, !1), this._sync = null, this.$element.off(".select2"), this.$element.attr("tabindex", this.$element.data("old-tabindex")), this.$element.removeClass("select2-hidden-accessible"), this.$element.attr("aria-hidden", "false"), this.$element.removeData("select2"), this.dataAdapter.destroy(), this.selection.destroy(), this.dropdown.destroy(), this.results.destroy(), this.dataAdapter = null, this.selection = null, this.dropdown = null, this.results = null }, n.prototype.render = function() { var t = e('<span class="select2 select2-container"><span class="selection"></span><span class="dropdown-wrapper" aria-hidden="true"></span></span>'); return t.attr("dir", this.options.get("dir")), this.$container = t, this.$container.addClass("select2-container--" + this.options.get("theme")), t.data("element", this.$element), t }, n
                }), t.define("select2/compat/utils", ["jquery"], function(e) {
                    function t(t, i, s) {
                        var n, o, r = [];
                        n = e.trim(t.attr("class")), n && (n = "" + n, e(n.split(/\s+/)).each(function() { 0 === this.indexOf("select2-") && r.push(this) })), n = e.trim(i.attr("class")), n && (n = "" + n, e(n.split(/\s+/)).each(function() { 0 !== this.indexOf("select2-") && (o = s(this), null != o && r.push(o)) })), t.attr("class", r.join(" "))
                    }
                    return { syncCssClasses: t }
                }), t.define("select2/compat/containerCss", ["jquery", "./utils"], function(e, t) {
                    function i(e) { return null }

                    function s() {}
                    return s.prototype.render = function(s) {
                        var n = s.call(this),
                            o = this.options.get("containerCssClass") || "";
                        e.isFunction(o) && (o = o(this.$element));
                        var r = this.options.get("adaptContainerCssClass");
                        if (r = r || i, -1 !== o.indexOf(":all:")) {
                            o = o.replace(":all:", "");
                            var a = r;
                            r = function(e) { var t = a(e); return null != t ? t + " " + e : e }
                        }
                        var l = this.options.get("containerCss") || {};
                        return e.isFunction(l) && (l = l(this.$element)), t.syncCssClasses(n, this.$element, r), n.css(l), n.addClass(o), n
                    }, s
                }), t.define("select2/compat/dropdownCss", ["jquery", "./utils"], function(e, t) {
                    function i(e) { return null }

                    function s() {}
                    return s.prototype.render = function(s) {
                        var n = s.call(this),
                            o = this.options.get("dropdownCssClass") || "";
                        e.isFunction(o) && (o = o(this.$element));
                        var r = this.options.get("adaptDropdownCssClass");
                        if (r = r || i, -1 !== o.indexOf(":all:")) {
                            o = o.replace(":all:", "");
                            var a = r;
                            r = function(e) { var t = a(e); return null != t ? t + " " + e : e }
                        }
                        var l = this.options.get("dropdownCss") || {};
                        return e.isFunction(l) && (l = l(this.$element)), t.syncCssClasses(n, this.$element, r), n.css(l), n.addClass(o), n
                    }, s
                }), t.define("select2/compat/initSelection", ["jquery"], function(e) {
                    function t(e, t, i) { i.get("debug") && window.console && console.warn && console.warn("Select2: The `initSelection` option has been deprecated in favor of a custom data adapter that overrides the `current` method. This method is now called multiple times instead of a single time when the instance is initialized. Support will be removed for the `initSelection` option in future versions of Select2"), this.initSelection = i.get("initSelection"), this._isInitialized = !1, e.call(this, t, i) }
                    return t.prototype.current = function(t, i) { var s = this; return this._isInitialized ? void t.call(this, i) : void this.initSelection.call(null, this.$element, function(t) { s._isInitialized = !0, e.isArray(t) || (t = [t]), i(t) }) }, t
                }), t.define("select2/compat/inputData", ["jquery"], function(e) {
                    function t(e, t, i) { this._currentData = [], this._valueSeparator = i.get("valueSeparator") || ",", "hidden" === t.prop("type") && i.get("debug") && console && console.warn && console.warn("Select2: Using a hidden input with Select2 is no longer supported and may stop working in the future. It is recommended to use a `<select>` element instead."), e.call(this, t, i) }
                    return t.prototype.current = function(t, i) {
                        function s(t, i) { var n = []; return t.selected || -1 !== e.inArray(t.id, i) ? (t.selected = !0, n.push(t)) : t.selected = !1, t.children && n.push.apply(n, s(t.children, i)), n }
                        for (var n = [], o = 0; o < this._currentData.length; o++) {
                            var r = this._currentData[o];
                            n.push.apply(n, s(r, this.$element.val().split(this._valueSeparator)))
                        }
                        i(n)
                    }, t.prototype.select = function(t, i) {
                        if (this.options.get("multiple")) {
                            var s = this.$element.val();
                            s += this._valueSeparator + i.id, this.$element.val(s), this.$element.trigger("change")
                        } else this.current(function(t) { e.map(t, function(e) { e.selected = !1 }) }), this.$element.val(i.id), this.$element.trigger("change")
                    }, t.prototype.unselect = function(e, t) {
                        var i = this;
                        t.selected = !1, this.current(function(e) {
                            for (var s = [], n = 0; n < e.length; n++) {
                                var o = e[n];
                                t.id != o.id && s.push(o.id)
                            }
                            i.$element.val(s.join(i._valueSeparator)), i.$element.trigger("change")
                        })
                    }, t.prototype.query = function(e, t, i) {
                        for (var s = [], n = 0; n < this._currentData.length; n++) {
                            var o = this._currentData[n],
                                r = this.matches(t, o);
                            null !== r && s.push(r)
                        }
                        i({ results: s })
                    }, t.prototype.addOptions = function(t, i) {
                        var s = e.map(i, function(t) { return e.data(t[0], "data") });
                        this._currentData.push.apply(this._currentData, s)
                    }, t
                }), t.define("select2/compat/matcher", ["jquery"], function(e) {
                    function t(t) {
                        function i(i, s) {
                            var n = e.extend(!0, {}, s);
                            if (null == i.term || "" === e.trim(i.term)) return n;
                            if (s.children) {
                                for (var o = s.children.length - 1; o >= 0; o--) {
                                    var r = s.children[o],
                                        a = t(i.term, r.text, r);
                                    a || n.children.splice(o, 1)
                                }
                                if (n.children.length > 0) return n
                            }
                            return t(i.term, s.text, s) ? n : null
                        }
                        return i
                    }
                    return t
                }), t.define("select2/compat/query", [], function() {
                    function e(e, t, i) { i.get("debug") && window.console && console.warn && console.warn("Select2: The `query` option has been deprecated in favor of a custom data adapter that overrides the `query` method. Support will be removed for the `query` option in future versions of Select2."), e.call(this, t, i) }
                    return e.prototype.query = function(e, t, i) {
                        t.callback = i;
                        var s = this.options.get("query");
                        s.call(null, t)
                    }, e
                }), t.define("select2/dropdown/attachContainer", [], function() {
                    function e(e, t, i) { e.call(this, t, i) }
                    return e.prototype.position = function(e, t, i) {
                        var s = i.find(".dropdown-wrapper");
                        s.append(t), t.addClass("select2-dropdown--below"), i.addClass("select2-container--below")
                    }, e
                }), t.define("select2/dropdown/stopPropagation", [], function() {
                    function e() {}
                    return e.prototype.bind = function(e, t, i) {
                        e.call(this, t, i);
                        var s = ["blur", "change", "click", "dblclick", "focus", "focusin", "focusout", "input", "keydown", "keyup", "keypress", "mousedown", "mouseenter", "mouseleave", "mousemove", "mouseover", "mouseup", "search", "touchend", "touchstart"];
                        this.$dropdown.on(s.join(" "), function(e) { e.stopPropagation() })
                    }, e
                }), t.define("select2/selection/stopPropagation", [], function() {
                    function e() {}
                    return e.prototype.bind = function(e, t, i) {
                        e.call(this, t, i);
                        var s = ["blur", "change", "click", "dblclick", "focus", "focusin", "focusout", "input", "keydown", "keyup", "keypress", "mousedown", "mouseenter", "mouseleave", "mousemove", "mouseover", "mouseup", "search", "touchend", "touchstart"];
                        this.$selection.on(s.join(" "), function(e) { e.stopPropagation() })
                    }, e
                }), t.define("jquery.select2", ["jquery", "require", "./select2/core", "./select2/defaults"], function(e, t, i, s) {
                    if (t("jquery.mousewheel"), null == e.fn.select2) {
                        var n = ["open", "close", "destroy"];
                        e.fn.select2 = function(t) {
                            if (t = t || {}, "object" == typeof t) return this.each(function() {
                                var s = e.extend({}, t, !0);
                                new i(e(this), s)
                            }), this;
                            if ("string" == typeof t) {
                                var s;
                                return this.each(function() {
                                    var i = e(this).data("select2");
                                    null == i && window.console && console.error && console.error("The select2('" + t + "') method was called on an element that is not using Select2.");
                                    var n = Array.prototype.slice.call(arguments, 1);
                                    s = i[t].apply(i, n)
                                }), e.inArray(t, n) > -1 ? this : s
                            }
                            throw new Error("Invalid arguments for Select2: " + t)
                        }
                    }
                    return null == e.fn.select2.defaults && (e.fn.select2.defaults = s), i
                }),
                function(i) { "function" == typeof t.define && t.define.amd ? t.define("jquery.mousewheel", ["jquery"], i) : "object" == typeof exports ? module.exports = i : i(e) }(function(e) {
                    function t(t) {
                        var r = t || window.event,
                            a = l.call(arguments, 1),
                            h = 0,
                            u = 0,
                            d = 0,
                            p = 0,
                            f = 0,
                            m = 0;
                        if (t = e.event.fix(r), t.type = "mousewheel", "detail" in r && (d = -1 * r.detail), "wheelDelta" in r && (d = r.wheelDelta), "wheelDeltaY" in r && (d = r.wheelDeltaY), "wheelDeltaX" in r && (u = -1 * r.wheelDeltaX), "axis" in r && r.axis === r.HORIZONTAL_AXIS && (u = -1 * d, d = 0), h = 0 === d ? u : d, "deltaY" in r && (d = -1 * r.deltaY, h = d), "deltaX" in r && (u = r.deltaX, 0 === d && (h = -1 * u)), 0 !== d || 0 !== u) {
                            if (1 === r.deltaMode) {
                                var g = e.data(this, "mousewheel-line-height");
                                h *= g, d *= g, u *= g
                            } else if (2 === r.deltaMode) {
                                var v = e.data(this, "mousewheel-page-height");
                                h *= v, d *= v, u *= v
                            }
                            if (p = Math.max(Math.abs(d), Math.abs(u)), (!o || o > p) && (o = p, s(r, p) && (o /= 40)), s(r, p) && (h /= 40, u /= 40, d /= 40), h = Math[h >= 1 ? "floor" : "ceil"](h / o), u = Math[u >= 1 ? "floor" : "ceil"](u / o), d = Math[d >= 1 ? "floor" : "ceil"](d / o), c.settings.normalizeOffset && this.getBoundingClientRect) {
                                var b = this.getBoundingClientRect();
                                f = t.clientX - b.left, m = t.clientY - b.top
                            }
                            return t.deltaX = u, t.deltaY = d, t.deltaFactor = o, t.offsetX = f, t.offsetY = m, t.deltaMode = 0, a.unshift(t, h, u, d), n && clearTimeout(n), n = setTimeout(i, 200), (e.event.dispatch || e.event.handle).apply(this, a)
                        }
                    }

                    function i() { o = null }

                    function s(e, t) { return c.settings.adjustOldDeltas && "mousewheel" === e.type && t % 120 === 0 }
                    var n, o, r = ["wheel", "mousewheel", "DOMMouseScroll", "MozMousePixelScroll"],
                        a = "onwheel" in document || document.documentMode >= 9 ? ["wheel"] : ["mousewheel", "DomMouseScroll", "MozMousePixelScroll"],
                        l = Array.prototype.slice;
                    if (e.event.fixHooks)
                        for (var h = r.length; h;) e.event.fixHooks[r[--h]] = e.event.mouseHooks;
                    var c = e.event.special.mousewheel = {
                        version: "3.1.12",
                        setup: function() {
                            if (this.addEventListener)
                                for (var i = a.length; i;) this.addEventListener(a[--i], t, !1);
                            else this.onmousewheel = t;
                            e.data(this, "mousewheel-line-height", c.getLineHeight(this)), e.data(this, "mousewheel-page-height", c.getPageHeight(this))
                        },
                        teardown: function() {
                            if (this.removeEventListener)
                                for (var i = a.length; i;) this.removeEventListener(a[--i], t, !1);
                            else this.onmousewheel = null;
                            e.removeData(this, "mousewheel-line-height"), e.removeData(this, "mousewheel-page-height")
                        },
                        getLineHeight: function(t) {
                            var i = e(t),
                                s = i["offsetParent" in e.fn ? "offsetParent" : "parent"]();
                            return s.length || (s = e("body")), parseInt(s.css("fontSize"), 10) || parseInt(i.css("fontSize"), 10) || 16
                        },
                        getPageHeight: function(t) { return e(t).height() },
                        settings: { adjustOldDeltas: !0, normalizeOffset: !0 }
                    };
                    e.fn.extend({ mousewheel: function(e) { return e ? this.bind("mousewheel", e) : this.trigger("mousewheel") }, unmousewheel: function(e) { return this.unbind("mousewheel", e) } })
                }), { define: t.define, require: t.require }
        }(),
        i = t.require("jquery.select2");
    return e.fn.select2.amd = t, i
}),
function(e) { "function" == typeof define && define.amd ? define(["jquery"], e) : e(jQuery) }(function(e) {
    function t(t, s) { var n, o, r, a = t.nodeName.toLowerCase(); return "area" === a ? (n = t.parentNode, o = n.name, t.href && o && "map" === n.nodeName.toLowerCase() ? (r = e("img[usemap='#" + o + "']")[0], !!r && i(r)) : !1) : (/^(input|select|textarea|button|object)$/.test(a) ? !t.disabled : "a" === a ? t.href || s : s) && i(t) }

    function i(t) { return e.expr.filters.visible(t) && !e(t).parents().addBack().filter(function() { return "hidden" === e.css(this, "visibility") }).length }

    function s(e) {
        for (var t, i; e.length && e[0] !== document;) {
            if (t = e.css("position"), ("absolute" === t || "relative" === t || "fixed" === t) && (i = parseInt(e.css("zIndex"), 10), !isNaN(i) && 0 !== i)) return i;
            e = e.parent()
        }
        return 0
    }

    function n() { this._curInst = null, this._keyEvent = !1, this._disabledInputs = [], this._datepickerShowing = !1, this._inDialog = !1, this._mainDivId = "ui-datepicker-div", this._inlineClass = "ui-datepicker-inline", this._appendClass = "ui-datepicker-append", this._triggerClass = "ui-datepicker-trigger", this._dialogClass = "ui-datepicker-dialog", this._disableClass = "ui-datepicker-disabled", this._unselectableClass = "ui-datepicker-unselectable", this._currentClass = "ui-datepicker-current-day", this._dayOverClass = "ui-datepicker-days-cell-over", this.regional = [], this.regional[""] = { closeText: "Done", prevText: "Prev", nextText: "Next", currentText: "Today", monthNames: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"], monthNamesShort: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"], dayNames: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"], dayNamesShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"], dayNamesMin: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"], weekHeader: "Wk", dateFormat: "mm/dd/yy", firstDay: 0, isRTL: !1, showMonthAfterYear: !1, yearSuffix: "" }, this._defaults = { showOn: "focus", showAnim: "fadeIn", showOptions: {}, defaultDate: null, appendText: "", buttonText: "...", buttonImage: "", buttonImageOnly: !1, hideIfNoPrevNext: !1, navigationAsDateFormat: !1, gotoCurrent: !1, changeMonth: !1, changeYear: !1, yearRange: "c-10:c+10", showOtherMonths: !1, selectOtherMonths: !1, showWeek: !1, calculateWeek: this.iso8601Week, shortYearCutoff: "+10", minDate: null, maxDate: null, duration: "fast", beforeShowDay: null, beforeShow: null, onSelect: null, onChangeMonthYear: null, onClose: null, numberOfMonths: 1, showCurrentAtPos: 0, stepMonths: 1, stepBigMonths: 12, altField: "", altFormat: "", constrainInput: !0, showButtonPanel: !1, autoSize: !1, disabled: !1 }, e.extend(this._defaults, this.regional[""]), this.regional.en = e.extend(!0, {}, this.regional[""]), this.regional["en-US"] = e.extend(!0, {}, this.regional.en), this.dpDiv = o(e("<div id='" + this._mainDivId + "' class='ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all'></div>")) }

    function o(t) { var i = "button, .ui-datepicker-prev, .ui-datepicker-next, .ui-datepicker-calendar td a"; return t.delegate(i, "mouseout", function() { e(this).removeClass("ui-state-hover"), -1 !== this.className.indexOf("ui-datepicker-prev") && e(this).removeClass("ui-datepicker-prev-hover"), -1 !== this.className.indexOf("ui-datepicker-next") && e(this).removeClass("ui-datepicker-next-hover") }).delegate(i, "mouseover", r) }

    function r() { e.datepicker._isDisabledDatepicker(v.inline ? v.dpDiv.parent()[0] : v.input[0]) || (e(this).parents(".ui-datepicker-calendar").find("a").removeClass("ui-state-hover"), e(this).addClass("ui-state-hover"), -1 !== this.className.indexOf("ui-datepicker-prev") && e(this).addClass("ui-datepicker-prev-hover"), -1 !== this.className.indexOf("ui-datepicker-next") && e(this).addClass("ui-datepicker-next-hover")) }

    function a(t, i) { e.extend(t, i); for (var s in i) null == i[s] && (t[s] = i[s]); return t }

    function l(e) {
        return function() {
            var t = this.element.val();
            e.apply(this, arguments), this._refresh(), t !== this.element.val() && this._trigger("change")
        }
    }
    e.ui = e.ui || {}, e.extend(e.ui, { version: "1.11.4", keyCode: { BACKSPACE: 8, COMMA: 188, DELETE: 46, DOWN: 40, END: 35, ENTER: 13, ESCAPE: 27, HOME: 36, LEFT: 37, PAGE_DOWN: 34, PAGE_UP: 33, PERIOD: 190, RIGHT: 39, SPACE: 32, TAB: 9, UP: 38 } }), e.fn.extend({
        scrollParent: function(t) {
            var i = this.css("position"),
                s = "absolute" === i,
                n = t ? /(auto|scroll|hidden)/ : /(auto|scroll)/,
                o = this.parents().filter(function() { var t = e(this); return s && "static" === t.css("position") ? !1 : n.test(t.css("overflow") + t.css("overflow-y") + t.css("overflow-x")) }).eq(0);
            return "fixed" !== i && o.length ? o : e(this[0].ownerDocument || document)
        },
        uniqueId: function() { var e = 0; return function() { return this.each(function() { this.id || (this.id = "ui-id-" + ++e) }) } }(),
        removeUniqueId: function() { return this.each(function() { /^ui-id-\d+$/.test(this.id) && e(this).removeAttr("id") }) }
    }), e.extend(e.expr[":"], {
        data: e.expr.createPseudo ? e.expr.createPseudo(function(t) { return function(i) { return !!e.data(i, t) } }) : function(t, i, s) { return !!e.data(t, s[3]) },
        focusable: function(i) { return t(i, !isNaN(e.attr(i, "tabindex"))) },
        tabbable: function(i) {
            var s = e.attr(i, "tabindex"),
                n = isNaN(s);
            return (n || s >= 0) && t(i, !n)
        }
    }), e("<a>").outerWidth(1).jquery || e.each(["Width", "Height"], function(t, i) {
        function s(t, i, s, o) { return e.each(n, function() { i -= parseFloat(e.css(t, "padding" + this)) || 0, s && (i -= parseFloat(e.css(t, "border" + this + "Width")) || 0), o && (i -= parseFloat(e.css(t, "margin" + this)) || 0) }), i }
        var n = "Width" === i ? ["Left", "Right"] : ["Top", "Bottom"],
            o = i.toLowerCase(),
            r = { innerWidth: e.fn.innerWidth, innerHeight: e.fn.innerHeight, outerWidth: e.fn.outerWidth, outerHeight: e.fn.outerHeight };
        e.fn["inner" + i] = function(t) { return void 0 === t ? r["inner" + i].call(this) : this.each(function() { e(this).css(o, s(this, t) + "px") }) }, e.fn["outer" + i] = function(t, n) { return "number" != typeof t ? r["outer" + i].call(this, t) : this.each(function() { e(this).css(o, s(this, t, !0, n) + "px") }) }
    }), e.fn.addBack || (e.fn.addBack = function(e) { return this.add(null == e ? this.prevObject : this.prevObject.filter(e)) }), e("<a>").data("a-b", "a").removeData("a-b").data("a-b") && (e.fn.removeData = function(t) { return function(i) { return arguments.length ? t.call(this, e.camelCase(i)) : t.call(this) } }(e.fn.removeData)), e.ui.ie = !!/msie [\w.]+/.exec(navigator.userAgent.toLowerCase()), e.fn.extend({
        focus: function(t) {
            return function(i, s) {
                return "number" == typeof i ? this.each(function() {
                    var t = this;
                    setTimeout(function() { e(t).focus(), s && s.call(t) }, i)
                }) : t.apply(this, arguments)
            }
        }(e.fn.focus),
        disableSelection: function() { var e = "onselectstart" in document.createElement("div") ? "selectstart" : "mousedown"; return function() { return this.bind(e + ".ui-disableSelection", function(e) { e.preventDefault() }) } }(),
        enableSelection: function() { return this.unbind(".ui-disableSelection") },
        zIndex: function(t) {
            if (void 0 !== t) return this.css("zIndex", t);
            if (this.length)
                for (var i, s, n = e(this[0]); n.length && n[0] !== document;) {
                    if (i = n.css("position"), ("absolute" === i || "relative" === i || "fixed" === i) && (s = parseInt(n.css("zIndex"), 10), !isNaN(s) && 0 !== s)) return s;
                    n = n.parent()
                }
            return 0
        }
    }), e.ui.plugin = {
        add: function(t, i, s) { var n, o = e.ui[t].prototype; for (n in s) o.plugins[n] = o.plugins[n] || [], o.plugins[n].push([i, s[n]]) },
        call: function(e, t, i, s) {
            var n, o = e.plugins[t];
            if (o && (s || e.element[0].parentNode && 11 !== e.element[0].parentNode.nodeType))
                for (n = 0; o.length > n; n++) e.options[o[n][0]] && o[n][1].apply(e.element, i)
        }
    };
    var h = 0,
        c = Array.prototype.slice;
    e.cleanData = function(t) {
        return function(i) {
            var s, n, o;
            for (o = 0; null != (n = i[o]); o++) try { s = e._data(n, "events"), s && s.remove && e(n).triggerHandler("remove") } catch (r) {}
            t(i)
        }
    }(e.cleanData), e.widget = function(t, i, s) {
        var n, o, r, a, l = {},
            h = t.split(".")[0];
        return t = t.split(".")[1], n = h + "-" + t, s || (s = i, i = e.Widget), e.expr[":"][n.toLowerCase()] = function(t) { return !!e.data(t, n) }, e[h] = e[h] || {}, o = e[h][t], r = e[h][t] = function(e, t) { return this._createWidget ? void(arguments.length && this._createWidget(e, t)) : new r(e, t) }, e.extend(r, o, { version: s.version, _proto: e.extend({}, s), _childConstructors: [] }), a = new i, a.options = e.widget.extend({}, a.options), e.each(s, function(t, s) {
            return e.isFunction(s) ? void(l[t] = function() {
                var e = function() { return i.prototype[t].apply(this, arguments) },
                    n = function(e) { return i.prototype[t].apply(this, e) };
                return function() {
                    var t, i = this._super,
                        o = this._superApply;
                    return this._super = e, this._superApply = n, t = s.apply(this, arguments), this._super = i, this._superApply = o, t
                }
            }()) : void(l[t] = s)
        }), r.prototype = e.widget.extend(a, { widgetEventPrefix: o ? a.widgetEventPrefix || t : t }, l, { constructor: r, namespace: h, widgetName: t, widgetFullName: n }), o ? (e.each(o._childConstructors, function(t, i) {
            var s = i.prototype;
            e.widget(s.namespace + "." + s.widgetName, r, i._proto)
        }), delete o._childConstructors) : i._childConstructors.push(r), e.widget.bridge(t, r), r
    }, e.widget.extend = function(t) {
        for (var i, s, n = c.call(arguments, 1), o = 0, r = n.length; r > o; o++)
            for (i in n[o]) s = n[o][i], n[o].hasOwnProperty(i) && void 0 !== s && (t[i] = e.isPlainObject(s) ? e.isPlainObject(t[i]) ? e.widget.extend({}, t[i], s) : e.widget.extend({}, s) : s);
        return t
    }, e.widget.bridge = function(t, i) {
        var s = i.prototype.widgetFullName || t;
        e.fn[t] = function(n) {
            var o = "string" == typeof n,
                r = c.call(arguments, 1),
                a = this;
            return o ? this.each(function() {
                var i, o = e.data(this, s);
                return "instance" === n ? (a = o, !1) : o ? e.isFunction(o[n]) && "_" !== n.charAt(0) ? (i = o[n].apply(o, r), i !== o && void 0 !== i ? (a = i && i.jquery ? a.pushStack(i.get()) : i, !1) : void 0) : e.error("no such method '" + n + "' for " + t + " widget instance") : e.error("cannot call methods on " + t + " prior to initialization; attempted to call method '" + n + "'");
            }) : (r.length && (n = e.widget.extend.apply(null, [n].concat(r))), this.each(function() {
                var t = e.data(this, s);
                t ? (t.option(n || {}), t._init && t._init()) : e.data(this, s, new i(n, this))
            })), a
        }
    }, e.Widget = function() {}, e.Widget._childConstructors = [], e.Widget.prototype = {
        widgetName: "widget",
        widgetEventPrefix: "",
        defaultElement: "<div>",
        options: { disabled: !1, create: null },
        _createWidget: function(t, i) { i = e(i || this.defaultElement || this)[0], this.element = e(i), this.uuid = h++, this.eventNamespace = "." + this.widgetName + this.uuid, this.bindings = e(), this.hoverable = e(), this.focusable = e(), i !== this && (e.data(i, this.widgetFullName, this), this._on(!0, this.element, { remove: function(e) { e.target === i && this.destroy() } }), this.document = e(i.style ? i.ownerDocument : i.document || i), this.window = e(this.document[0].defaultView || this.document[0].parentWindow)), this.options = e.widget.extend({}, this.options, this._getCreateOptions(), t), this._create(), this._trigger("create", null, this._getCreateEventData()), this._init() },
        _getCreateOptions: e.noop,
        _getCreateEventData: e.noop,
        _create: e.noop,
        _init: e.noop,
        destroy: function() { this._destroy(), this.element.unbind(this.eventNamespace).removeData(this.widgetFullName).removeData(e.camelCase(this.widgetFullName)), this.widget().unbind(this.eventNamespace).removeAttr("aria-disabled").removeClass(this.widgetFullName + "-disabled ui-state-disabled"), this.bindings.unbind(this.eventNamespace), this.hoverable.removeClass("ui-state-hover"), this.focusable.removeClass("ui-state-focus") },
        _destroy: e.noop,
        widget: function() { return this.element },
        option: function(t, i) {
            var s, n, o, r = t;
            if (0 === arguments.length) return e.widget.extend({}, this.options);
            if ("string" == typeof t)
                if (r = {}, s = t.split("."), t = s.shift(), s.length) {
                    for (n = r[t] = e.widget.extend({}, this.options[t]), o = 0; s.length - 1 > o; o++) n[s[o]] = n[s[o]] || {}, n = n[s[o]];
                    if (t = s.pop(), 1 === arguments.length) return void 0 === n[t] ? null : n[t];
                    n[t] = i
                } else {
                    if (1 === arguments.length) return void 0 === this.options[t] ? null : this.options[t];
                    r[t] = i
                }
            return this._setOptions(r), this
        },
        _setOptions: function(e) { var t; for (t in e) this._setOption(t, e[t]); return this },
        _setOption: function(e, t) { return this.options[e] = t, "disabled" === e && (this.widget().toggleClass(this.widgetFullName + "-disabled", !!t), t && (this.hoverable.removeClass("ui-state-hover"), this.focusable.removeClass("ui-state-focus"))), this },
        enable: function() { return this._setOptions({ disabled: !1 }) },
        disable: function() { return this._setOptions({ disabled: !0 }) },
        _on: function(t, i, s) {
            var n, o = this;
            "boolean" != typeof t && (s = i, i = t, t = !1), s ? (i = n = e(i), this.bindings = this.bindings.add(i)) : (s = i, i = this.element, n = this.widget()), e.each(s, function(s, r) {
                function a() { return t || o.options.disabled !== !0 && !e(this).hasClass("ui-state-disabled") ? ("string" == typeof r ? o[r] : r).apply(o, arguments) : void 0 }
                "string" != typeof r && (a.guid = r.guid = r.guid || a.guid || e.guid++);
                var l = s.match(/^([\w:-]*)\s*(.*)$/),
                    h = l[1] + o.eventNamespace,
                    c = l[2];
                c ? n.delegate(c, h, a) : i.bind(h, a)
            })
        },
        _off: function(t, i) { i = (i || "").split(" ").join(this.eventNamespace + " ") + this.eventNamespace, t.unbind(i).undelegate(i), this.bindings = e(this.bindings.not(t).get()), this.focusable = e(this.focusable.not(t).get()), this.hoverable = e(this.hoverable.not(t).get()) },
        _delay: function(e, t) {
            function i() { return ("string" == typeof e ? s[e] : e).apply(s, arguments) }
            var s = this;
            return setTimeout(i, t || 0)
        },
        _hoverable: function(t) { this.hoverable = this.hoverable.add(t), this._on(t, { mouseenter: function(t) { e(t.currentTarget).addClass("ui-state-hover") }, mouseleave: function(t) { e(t.currentTarget).removeClass("ui-state-hover") } }) },
        _focusable: function(t) { this.focusable = this.focusable.add(t), this._on(t, { focusin: function(t) { e(t.currentTarget).addClass("ui-state-focus") }, focusout: function(t) { e(t.currentTarget).removeClass("ui-state-focus") } }) },
        _trigger: function(t, i, s) {
            var n, o, r = this.options[t];
            if (s = s || {}, i = e.Event(i), i.type = (t === this.widgetEventPrefix ? t : this.widgetEventPrefix + t).toLowerCase(), i.target = this.element[0], o = i.originalEvent)
                for (n in o) n in i || (i[n] = o[n]);
            return this.element.trigger(i, s), !(e.isFunction(r) && r.apply(this.element[0], [i].concat(s)) === !1 || i.isDefaultPrevented())
        }
    }, e.each({ show: "fadeIn", hide: "fadeOut" }, function(t, i) {
        e.Widget.prototype["_" + t] = function(s, n, o) {
            "string" == typeof n && (n = { effect: n });
            var r, a = n ? n === !0 || "number" == typeof n ? i : n.effect || i : t;
            n = n || {}, "number" == typeof n && (n = { duration: n }), r = !e.isEmptyObject(n), n.complete = o, n.delay && s.delay(n.delay), r && e.effects && e.effects.effect[a] ? s[t](n) : a !== t && s[a] ? s[a](n.duration, n.easing, o) : s.queue(function(i) { e(this)[t](), o && o.call(s[0]), i() })
        }
    }), e.widget;
    var u = !1;
    e(document).mouseup(function() { u = !1 }), e.widget("ui.mouse", {
            version: "1.11.4",
            options: { cancel: "input,textarea,button,select,option", distance: 1, delay: 0 },
            _mouseInit: function() {
                var t = this;
                this.element.bind("mousedown." + this.widgetName, function(e) { return t._mouseDown(e) }).bind("click." + this.widgetName, function(i) { return !0 === e.data(i.target, t.widgetName + ".preventClickEvent") ? (e.removeData(i.target, t.widgetName + ".preventClickEvent"), i.stopImmediatePropagation(), !1) : void 0 }), this.started = !1
            },
            _mouseDestroy: function() { this.element.unbind("." + this.widgetName), this._mouseMoveDelegate && this.document.unbind("mousemove." + this.widgetName, this._mouseMoveDelegate).unbind("mouseup." + this.widgetName, this._mouseUpDelegate) },
            _mouseDown: function(t) {
                if (!u) {
                    this._mouseMoved = !1, this._mouseStarted && this._mouseUp(t), this._mouseDownEvent = t;
                    var i = this,
                        s = 1 === t.which,
                        n = "string" == typeof this.options.cancel && t.target.nodeName ? e(t.target).closest(this.options.cancel).length : !1;
                    return s && !n && this._mouseCapture(t) ? (this.mouseDelayMet = !this.options.delay, this.mouseDelayMet || (this._mouseDelayTimer = setTimeout(function() { i.mouseDelayMet = !0 }, this.options.delay)), this._mouseDistanceMet(t) && this._mouseDelayMet(t) && (this._mouseStarted = this._mouseStart(t) !== !1, !this._mouseStarted) ? (t.preventDefault(), !0) : (!0 === e.data(t.target, this.widgetName + ".preventClickEvent") && e.removeData(t.target, this.widgetName + ".preventClickEvent"), this._mouseMoveDelegate = function(e) { return i._mouseMove(e) }, this._mouseUpDelegate = function(e) { return i._mouseUp(e) }, this.document.bind("mousemove." + this.widgetName, this._mouseMoveDelegate).bind("mouseup." + this.widgetName, this._mouseUpDelegate), t.preventDefault(), u = !0, !0)) : !0
                }
            },
            _mouseMove: function(t) { if (this._mouseMoved) { if (e.ui.ie && (!document.documentMode || 9 > document.documentMode) && !t.button) return this._mouseUp(t); if (!t.which) return this._mouseUp(t) } return (t.which || t.button) && (this._mouseMoved = !0), this._mouseStarted ? (this._mouseDrag(t), t.preventDefault()) : (this._mouseDistanceMet(t) && this._mouseDelayMet(t) && (this._mouseStarted = this._mouseStart(this._mouseDownEvent, t) !== !1, this._mouseStarted ? this._mouseDrag(t) : this._mouseUp(t)), !this._mouseStarted) },
            _mouseUp: function(t) { return this.document.unbind("mousemove." + this.widgetName, this._mouseMoveDelegate).unbind("mouseup." + this.widgetName, this._mouseUpDelegate), this._mouseStarted && (this._mouseStarted = !1, t.target === this._mouseDownEvent.target && e.data(t.target, this.widgetName + ".preventClickEvent", !0), this._mouseStop(t)), u = !1, !1 },
            _mouseDistanceMet: function(e) { return Math.max(Math.abs(this._mouseDownEvent.pageX - e.pageX), Math.abs(this._mouseDownEvent.pageY - e.pageY)) >= this.options.distance },
            _mouseDelayMet: function() { return this.mouseDelayMet },
            _mouseStart: function() {},
            _mouseDrag: function() {},
            _mouseStop: function() {},
            _mouseCapture: function() { return !0 }
        }),
        function() {
            function t(e, t, i) { return [parseFloat(e[0]) * (p.test(e[0]) ? t / 100 : 1), parseFloat(e[1]) * (p.test(e[1]) ? i / 100 : 1)] }

            function i(t, i) { return parseInt(e.css(t, i), 10) || 0 }

            function s(t) { var i = t[0]; return 9 === i.nodeType ? { width: t.width(), height: t.height(), offset: { top: 0, left: 0 } } : e.isWindow(i) ? { width: t.width(), height: t.height(), offset: { top: t.scrollTop(), left: t.scrollLeft() } } : i.preventDefault ? { width: 0, height: 0, offset: { top: i.pageY, left: i.pageX } } : { width: t.outerWidth(), height: t.outerHeight(), offset: t.offset() } }
            e.ui = e.ui || {};
            var n, o, r = Math.max,
                a = Math.abs,
                l = Math.round,
                h = /left|center|right/,
                c = /top|center|bottom/,
                u = /[\+\-]\d+(\.[\d]+)?%?/,
                d = /^\w+/,
                p = /%$/,
                f = e.fn.position;
            e.position = {
                    scrollbarWidth: function() {
                        if (void 0 !== n) return n;
                        var t, i, s = e("<div style='display:block;position:absolute;width:50px;height:50px;overflow:hidden;'><div style='height:100px;width:auto;'></div></div>"),
                            o = s.children()[0];
                        return e("body").append(s), t = o.offsetWidth, s.css("overflow", "scroll"), i = o.offsetWidth, t === i && (i = s[0].clientWidth), s.remove(), n = t - i
                    },
                    getScrollInfo: function(t) {
                        var i = t.isWindow || t.isDocument ? "" : t.element.css("overflow-x"),
                            s = t.isWindow || t.isDocument ? "" : t.element.css("overflow-y"),
                            n = "scroll" === i || "auto" === i && t.width < t.element[0].scrollWidth,
                            o = "scroll" === s || "auto" === s && t.height < t.element[0].scrollHeight;
                        return { width: o ? e.position.scrollbarWidth() : 0, height: n ? e.position.scrollbarWidth() : 0 }
                    },
                    getWithinInfo: function(t) {
                        var i = e(t || window),
                            s = e.isWindow(i[0]),
                            n = !!i[0] && 9 === i[0].nodeType;
                        return { element: i, isWindow: s, isDocument: n, offset: i.offset() || { left: 0, top: 0 }, scrollLeft: i.scrollLeft(), scrollTop: i.scrollTop(), width: s || n ? i.width() : i.outerWidth(), height: s || n ? i.height() : i.outerHeight() }
                    }
                }, e.fn.position = function(n) {
                    if (!n || !n.of) return f.apply(this, arguments);
                    n = e.extend({}, n);
                    var p, m, g, v, b, y, x = e(n.of),
                        w = e.position.getWithinInfo(n.within),
                        _ = e.position.getScrollInfo(w),
                        C = (n.collision || "flip").split(" "),
                        I = {};
                    return y = s(x), x[0].preventDefault && (n.at = "left top"), m = y.width, g = y.height, v = y.offset, b = e.extend({}, v), e.each(["my", "at"], function() {
                        var e, t, i = (n[this] || "").split(" ");
                        1 === i.length && (i = h.test(i[0]) ? i.concat(["center"]) : c.test(i[0]) ? ["center"].concat(i) : ["center", "center"]), i[0] = h.test(i[0]) ? i[0] : "center", i[1] = c.test(i[1]) ? i[1] : "center", e = u.exec(i[0]), t = u.exec(i[1]), I[this] = [e ? e[0] : 0, t ? t[0] : 0], n[this] = [d.exec(i[0])[0], d.exec(i[1])[0]]
                    }), 1 === C.length && (C[1] = C[0]), "right" === n.at[0] ? b.left += m : "center" === n.at[0] && (b.left += m / 2), "bottom" === n.at[1] ? b.top += g : "center" === n.at[1] && (b.top += g / 2), p = t(I.at, m, g), b.left += p[0], b.top += p[1], this.each(function() {
                        var s, h, c = e(this),
                            u = c.outerWidth(),
                            d = c.outerHeight(),
                            f = i(this, "marginLeft"),
                            y = i(this, "marginTop"),
                            T = u + f + i(this, "marginRight") + _.width,
                            k = d + y + i(this, "marginBottom") + _.height,
                            S = e.extend({}, b),
                            D = t(I.my, c.outerWidth(), c.outerHeight());
                        "right" === n.my[0] ? S.left -= u : "center" === n.my[0] && (S.left -= u / 2), "bottom" === n.my[1] ? S.top -= d : "center" === n.my[1] && (S.top -= d / 2), S.left += D[0], S.top += D[1], o || (S.left = l(S.left), S.top = l(S.top)), s = { marginLeft: f, marginTop: y }, e.each(["left", "top"], function(t, i) { e.ui.position[C[t]] && e.ui.position[C[t]][i](S, { targetWidth: m, targetHeight: g, elemWidth: u, elemHeight: d, collisionPosition: s, collisionWidth: T, collisionHeight: k, offset: [p[0] + D[0], p[1] + D[1]], my: n.my, at: n.at, within: w, elem: c }) }), n.using && (h = function(e) {
                            var t = v.left - S.left,
                                i = t + m - u,
                                s = v.top - S.top,
                                o = s + g - d,
                                l = { target: { element: x, left: v.left, top: v.top, width: m, height: g }, element: { element: c, left: S.left, top: S.top, width: u, height: d }, horizontal: 0 > i ? "left" : t > 0 ? "right" : "center", vertical: 0 > o ? "top" : s > 0 ? "bottom" : "middle" };
                            u > m && m > a(t + i) && (l.horizontal = "center"), d > g && g > a(s + o) && (l.vertical = "middle"), l.important = r(a(t), a(i)) > r(a(s), a(o)) ? "horizontal" : "vertical", n.using.call(this, e, l)
                        }), c.offset(e.extend(S, { using: h }))
                    })
                }, e.ui.position = {
                    fit: {
                        left: function(e, t) {
                            var i, s = t.within,
                                n = s.isWindow ? s.scrollLeft : s.offset.left,
                                o = s.width,
                                a = e.left - t.collisionPosition.marginLeft,
                                l = n - a,
                                h = a + t.collisionWidth - o - n;
                            t.collisionWidth > o ? l > 0 && 0 >= h ? (i = e.left + l + t.collisionWidth - o - n, e.left += l - i) : e.left = h > 0 && 0 >= l ? n : l > h ? n + o - t.collisionWidth : n : l > 0 ? e.left += l : h > 0 ? e.left -= h : e.left = r(e.left - a, e.left)
                        },
                        top: function(e, t) {
                            var i, s = t.within,
                                n = s.isWindow ? s.scrollTop : s.offset.top,
                                o = t.within.height,
                                a = e.top - t.collisionPosition.marginTop,
                                l = n - a,
                                h = a + t.collisionHeight - o - n;
                            t.collisionHeight > o ? l > 0 && 0 >= h ? (i = e.top + l + t.collisionHeight - o - n, e.top += l - i) : e.top = h > 0 && 0 >= l ? n : l > h ? n + o - t.collisionHeight : n : l > 0 ? e.top += l : h > 0 ? e.top -= h : e.top = r(e.top - a, e.top)
                        }
                    },
                    flip: {
                        left: function(e, t) {
                            var i, s, n = t.within,
                                o = n.offset.left + n.scrollLeft,
                                r = n.width,
                                l = n.isWindow ? n.scrollLeft : n.offset.left,
                                h = e.left - t.collisionPosition.marginLeft,
                                c = h - l,
                                u = h + t.collisionWidth - r - l,
                                d = "left" === t.my[0] ? -t.elemWidth : "right" === t.my[0] ? t.elemWidth : 0,
                                p = "left" === t.at[0] ? t.targetWidth : "right" === t.at[0] ? -t.targetWidth : 0,
                                f = -2 * t.offset[0];
                            0 > c ? (i = e.left + d + p + f + t.collisionWidth - r - o, (0 > i || a(c) > i) && (e.left += d + p + f)) : u > 0 && (s = e.left - t.collisionPosition.marginLeft + d + p + f - l, (s > 0 || u > a(s)) && (e.left += d + p + f))
                        },
                        top: function(e, t) {
                            var i, s, n = t.within,
                                o = n.offset.top + n.scrollTop,
                                r = n.height,
                                l = n.isWindow ? n.scrollTop : n.offset.top,
                                h = e.top - t.collisionPosition.marginTop,
                                c = h - l,
                                u = h + t.collisionHeight - r - l,
                                d = "top" === t.my[1],
                                p = d ? -t.elemHeight : "bottom" === t.my[1] ? t.elemHeight : 0,
                                f = "top" === t.at[1] ? t.targetHeight : "bottom" === t.at[1] ? -t.targetHeight : 0,
                                m = -2 * t.offset[1];
                            0 > c ? (s = e.top + p + f + m + t.collisionHeight - r - o, (0 > s || a(c) > s) && (e.top += p + f + m)) : u > 0 && (i = e.top - t.collisionPosition.marginTop + p + f + m - l, (i > 0 || u > a(i)) && (e.top += p + f + m))
                        }
                    },
                    flipfit: { left: function() { e.ui.position.flip.left.apply(this, arguments), e.ui.position.fit.left.apply(this, arguments) }, top: function() { e.ui.position.flip.top.apply(this, arguments), e.ui.position.fit.top.apply(this, arguments) } }
                },
                function() {
                    var t, i, s, n, r, a = document.getElementsByTagName("body")[0],
                        l = document.createElement("div");
                    t = document.createElement(a ? "div" : "body"), s = { visibility: "hidden", width: 0, height: 0, border: 0, margin: 0, background: "none" }, a && e.extend(s, { position: "absolute", left: "-1000px", top: "-1000px" });
                    for (r in s) t.style[r] = s[r];
                    t.appendChild(l), i = a || document.documentElement, i.insertBefore(t, i.firstChild), l.style.cssText = "position: absolute; left: 10.7432222px;", n = e(l).offset().left, o = n > 10 && 11 > n, t.innerHTML = "", i.removeChild(t)
                }()
        }(), e.ui.position, e.widget("ui.draggable", e.ui.mouse, {
            version: "1.11.4",
            widgetEventPrefix: "drag",
            options: { addClasses: !0, appendTo: "parent", axis: !1, connectToSortable: !1, containment: !1, cursor: "auto", cursorAt: !1, grid: !1, handle: !1, helper: "original", iframeFix: !1, opacity: !1, refreshPositions: !1, revert: !1, revertDuration: 500, scope: "default", scroll: !0, scrollSensitivity: 20, scrollSpeed: 20, snap: !1, snapMode: "both", snapTolerance: 20, stack: !1, zIndex: !1, drag: null, start: null, stop: null },
            _create: function() { "original" === this.options.helper && this._setPositionRelative(), this.options.addClasses && this.element.addClass("ui-draggable"), this.options.disabled && this.element.addClass("ui-draggable-disabled"), this._setHandleClassName(), this._mouseInit() },
            _setOption: function(e, t) { this._super(e, t), "handle" === e && (this._removeHandleClassName(), this._setHandleClassName()) },
            _destroy: function() { return (this.helper || this.element).is(".ui-draggable-dragging") ? void(this.destroyOnClear = !0) : (this.element.removeClass("ui-draggable ui-draggable-dragging ui-draggable-disabled"), this._removeHandleClassName(), void this._mouseDestroy()) },
            _mouseCapture: function(t) { var i = this.options; return this._blurActiveElement(t), this.helper || i.disabled || e(t.target).closest(".ui-resizable-handle").length > 0 ? !1 : (this.handle = this._getHandle(t), this.handle ? (this._blockFrames(i.iframeFix === !0 ? "iframe" : i.iframeFix), !0) : !1) },
            _blockFrames: function(t) { this.iframeBlocks = this.document.find(t).map(function() { var t = e(this); return e("<div>").css("position", "absolute").appendTo(t.parent()).outerWidth(t.outerWidth()).outerHeight(t.outerHeight()).offset(t.offset())[0] }) },
            _unblockFrames: function() { this.iframeBlocks && (this.iframeBlocks.remove(), delete this.iframeBlocks) },
            _blurActiveElement: function(t) { var i = this.document[0]; if (this.handleElement.is(t.target)) try { i.activeElement && "body" !== i.activeElement.nodeName.toLowerCase() && e(i.activeElement).blur() } catch (s) {} },
            _mouseStart: function(t) { var i = this.options; return this.helper = this._createHelper(t), this.helper.addClass("ui-draggable-dragging"), this._cacheHelperProportions(), e.ui.ddmanager && (e.ui.ddmanager.current = this), this._cacheMargins(), this.cssPosition = this.helper.css("position"), this.scrollParent = this.helper.scrollParent(!0), this.offsetParent = this.helper.offsetParent(), this.hasFixedAncestor = this.helper.parents().filter(function() { return "fixed" === e(this).css("position") }).length > 0, this.positionAbs = this.element.offset(), this._refreshOffsets(t), this.originalPosition = this.position = this._generatePosition(t, !1), this.originalPageX = t.pageX, this.originalPageY = t.pageY, i.cursorAt && this._adjustOffsetFromHelper(i.cursorAt), this._setContainment(), this._trigger("start", t) === !1 ? (this._clear(), !1) : (this._cacheHelperProportions(), e.ui.ddmanager && !i.dropBehaviour && e.ui.ddmanager.prepareOffsets(this, t), this._normalizeRightBottom(), this._mouseDrag(t, !0), e.ui.ddmanager && e.ui.ddmanager.dragStart(this, t), !0) },
            _refreshOffsets: function(e) { this.offset = { top: this.positionAbs.top - this.margins.top, left: this.positionAbs.left - this.margins.left, scroll: !1, parent: this._getParentOffset(), relative: this._getRelativeOffset() }, this.offset.click = { left: e.pageX - this.offset.left, top: e.pageY - this.offset.top } },
            _mouseDrag: function(t, i) {
                if (this.hasFixedAncestor && (this.offset.parent = this._getParentOffset()), this.position = this._generatePosition(t, !0), this.positionAbs = this._convertPositionTo("absolute"), !i) {
                    var s = this._uiHash();
                    if (this._trigger("drag", t, s) === !1) return this._mouseUp({}), !1;
                    this.position = s.position
                }
                return this.helper[0].style.left = this.position.left + "px", this.helper[0].style.top = this.position.top + "px", e.ui.ddmanager && e.ui.ddmanager.drag(this, t), !1
            },
            _mouseStop: function(t) {
                var i = this,
                    s = !1;
                return e.ui.ddmanager && !this.options.dropBehaviour && (s = e.ui.ddmanager.drop(this, t)), this.dropped && (s = this.dropped, this.dropped = !1), "invalid" === this.options.revert && !s || "valid" === this.options.revert && s || this.options.revert === !0 || e.isFunction(this.options.revert) && this.options.revert.call(this.element, s) ? e(this.helper).animate(this.originalPosition, parseInt(this.options.revertDuration, 10), function() { i._trigger("stop", t) !== !1 && i._clear() }) : this._trigger("stop", t) !== !1 && this._clear(), !1
            },
            _mouseUp: function(t) { return this._unblockFrames(), e.ui.ddmanager && e.ui.ddmanager.dragStop(this, t), this.handleElement.is(t.target) && this.element.focus(), e.ui.mouse.prototype._mouseUp.call(this, t) },
            cancel: function() { return this.helper.is(".ui-draggable-dragging") ? this._mouseUp({}) : this._clear(), this },
            _getHandle: function(t) { return this.options.handle ? !!e(t.target).closest(this.element.find(this.options.handle)).length : !0 },
            _setHandleClassName: function() { this.handleElement = this.options.handle ? this.element.find(this.options.handle) : this.element, this.handleElement.addClass("ui-draggable-handle") },
            _removeHandleClassName: function() { this.handleElement.removeClass("ui-draggable-handle") },
            _createHelper: function(t) {
                var i = this.options,
                    s = e.isFunction(i.helper),
                    n = s ? e(i.helper.apply(this.element[0], [t])) : "clone" === i.helper ? this.element.clone().removeAttr("id") : this.element;
                return n.parents("body").length || n.appendTo("parent" === i.appendTo ? this.element[0].parentNode : i.appendTo), s && n[0] === this.element[0] && this._setPositionRelative(), n[0] === this.element[0] || /(fixed|absolute)/.test(n.css("position")) || n.css("position", "absolute"), n
            },
            _setPositionRelative: function() { /^(?:r|a|f)/.test(this.element.css("position")) || (this.element[0].style.position = "relative") },
            _adjustOffsetFromHelper: function(t) { "string" == typeof t && (t = t.split(" ")), e.isArray(t) && (t = { left: +t[0], top: +t[1] || 0 }), "left" in t && (this.offset.click.left = t.left + this.margins.left), "right" in t && (this.offset.click.left = this.helperProportions.width - t.right + this.margins.left), "top" in t && (this.offset.click.top = t.top + this.margins.top), "bottom" in t && (this.offset.click.top = this.helperProportions.height - t.bottom + this.margins.top) },
            _isRootNode: function(e) { return /(html|body)/i.test(e.tagName) || e === this.document[0] },
            _getParentOffset: function() {
                var t = this.offsetParent.offset(),
                    i = this.document[0];
                return "absolute" === this.cssPosition && this.scrollParent[0] !== i && e.contains(this.scrollParent[0], this.offsetParent[0]) && (t.left += this.scrollParent.scrollLeft(), t.top += this.scrollParent.scrollTop()), this._isRootNode(this.offsetParent[0]) && (t = { top: 0, left: 0 }), { top: t.top + (parseInt(this.offsetParent.css("borderTopWidth"), 10) || 0), left: t.left + (parseInt(this.offsetParent.css("borderLeftWidth"), 10) || 0) }
            },
            _getRelativeOffset: function() {
                if ("relative" !== this.cssPosition) return { top: 0, left: 0 };
                var e = this.element.position(),
                    t = this._isRootNode(this.scrollParent[0]);
                return { top: e.top - (parseInt(this.helper.css("top"), 10) || 0) + (t ? 0 : this.scrollParent.scrollTop()), left: e.left - (parseInt(this.helper.css("left"), 10) || 0) + (t ? 0 : this.scrollParent.scrollLeft()) }
            },
            _cacheMargins: function() { this.margins = { left: parseInt(this.element.css("marginLeft"), 10) || 0, top: parseInt(this.element.css("marginTop"), 10) || 0, right: parseInt(this.element.css("marginRight"), 10) || 0, bottom: parseInt(this.element.css("marginBottom"), 10) || 0 } },
            _cacheHelperProportions: function() { this.helperProportions = { width: this.helper.outerWidth(), height: this.helper.outerHeight() } },
            _setContainment: function() {
                var t, i, s, n = this.options,
                    o = this.document[0];
                return this.relativeContainer = null, n.containment ? "window" === n.containment ? void(this.containment = [e(window).scrollLeft() - this.offset.relative.left - this.offset.parent.left, e(window).scrollTop() - this.offset.relative.top - this.offset.parent.top, e(window).scrollLeft() + e(window).width() - this.helperProportions.width - this.margins.left, e(window).scrollTop() + (e(window).height() || o.body.parentNode.scrollHeight) - this.helperProportions.height - this.margins.top]) : "document" === n.containment ? void(this.containment = [0, 0, e(o).width() - this.helperProportions.width - this.margins.left, (e(o).height() || o.body.parentNode.scrollHeight) - this.helperProportions.height - this.margins.top]) : n.containment.constructor === Array ? void(this.containment = n.containment) : ("parent" === n.containment && (n.containment = this.helper[0].parentNode), i = e(n.containment), s = i[0], void(s && (t = /(scroll|auto)/.test(i.css("overflow")), this.containment = [(parseInt(i.css("borderLeftWidth"), 10) || 0) + (parseInt(i.css("paddingLeft"), 10) || 0), (parseInt(i.css("borderTopWidth"), 10) || 0) + (parseInt(i.css("paddingTop"), 10) || 0), (t ? Math.max(s.scrollWidth, s.offsetWidth) : s.offsetWidth) - (parseInt(i.css("borderRightWidth"), 10) || 0) - (parseInt(i.css("paddingRight"), 10) || 0) - this.helperProportions.width - this.margins.left - this.margins.right, (t ? Math.max(s.scrollHeight, s.offsetHeight) : s.offsetHeight) - (parseInt(i.css("borderBottomWidth"), 10) || 0) - (parseInt(i.css("paddingBottom"), 10) || 0) - this.helperProportions.height - this.margins.top - this.margins.bottom], this.relativeContainer = i))) : void(this.containment = null)
            },
            _convertPositionTo: function(e, t) {
                t || (t = this.position);
                var i = "absolute" === e ? 1 : -1,
                    s = this._isRootNode(this.scrollParent[0]);
                return { top: t.top + this.offset.relative.top * i + this.offset.parent.top * i - ("fixed" === this.cssPosition ? -this.offset.scroll.top : s ? 0 : this.offset.scroll.top) * i, left: t.left + this.offset.relative.left * i + this.offset.parent.left * i - ("fixed" === this.cssPosition ? -this.offset.scroll.left : s ? 0 : this.offset.scroll.left) * i }
            },
            _generatePosition: function(e, t) {
                var i, s, n, o, r = this.options,
                    a = this._isRootNode(this.scrollParent[0]),
                    l = e.pageX,
                    h = e.pageY;
                return a && this.offset.scroll || (this.offset.scroll = { top: this.scrollParent.scrollTop(), left: this.scrollParent.scrollLeft() }), t && (this.containment && (this.relativeContainer ? (s = this.relativeContainer.offset(), i = [this.containment[0] + s.left, this.containment[1] + s.top, this.containment[2] + s.left, this.containment[3] + s.top]) : i = this.containment, e.pageX - this.offset.click.left < i[0] && (l = i[0] + this.offset.click.left), e.pageY - this.offset.click.top < i[1] && (h = i[1] + this.offset.click.top), e.pageX - this.offset.click.left > i[2] && (l = i[2] + this.offset.click.left), e.pageY - this.offset.click.top > i[3] && (h = i[3] + this.offset.click.top)), r.grid && (n = r.grid[1] ? this.originalPageY + Math.round((h - this.originalPageY) / r.grid[1]) * r.grid[1] : this.originalPageY, h = i ? n - this.offset.click.top >= i[1] || n - this.offset.click.top > i[3] ? n : n - this.offset.click.top >= i[1] ? n - r.grid[1] : n + r.grid[1] : n, o = r.grid[0] ? this.originalPageX + Math.round((l - this.originalPageX) / r.grid[0]) * r.grid[0] : this.originalPageX, l = i ? o - this.offset.click.left >= i[0] || o - this.offset.click.left > i[2] ? o : o - this.offset.click.left >= i[0] ? o - r.grid[0] : o + r.grid[0] : o), "y" === r.axis && (l = this.originalPageX), "x" === r.axis && (h = this.originalPageY)), { top: h - this.offset.click.top - this.offset.relative.top - this.offset.parent.top + ("fixed" === this.cssPosition ? -this.offset.scroll.top : a ? 0 : this.offset.scroll.top), left: l - this.offset.click.left - this.offset.relative.left - this.offset.parent.left + ("fixed" === this.cssPosition ? -this.offset.scroll.left : a ? 0 : this.offset.scroll.left) }
            },
            _clear: function() { this.helper.removeClass("ui-draggable-dragging"), this.helper[0] === this.element[0] || this.cancelHelperRemoval || this.helper.remove(), this.helper = null, this.cancelHelperRemoval = !1, this.destroyOnClear && this.destroy() },
            _normalizeRightBottom: function() { "y" !== this.options.axis && "auto" !== this.helper.css("right") && (this.helper.width(this.helper.width()), this.helper.css("right", "auto")), "x" !== this.options.axis && "auto" !== this.helper.css("bottom") && (this.helper.height(this.helper.height()), this.helper.css("bottom", "auto")) },
            _trigger: function(t, i, s) { return s = s || this._uiHash(), e.ui.plugin.call(this, t, [i, s, this], !0), /^(drag|start|stop)/.test(t) && (this.positionAbs = this._convertPositionTo("absolute"), s.offset = this.positionAbs), e.Widget.prototype._trigger.call(this, t, i, s) },
            plugins: {},
            _uiHash: function() { return { helper: this.helper, position: this.position, originalPosition: this.originalPosition, offset: this.positionAbs } }
        }), e.ui.plugin.add("draggable", "connectToSortable", {
            start: function(t, i, s) {
                var n = e.extend({}, i, { item: s.element });
                s.sortables = [], e(s.options.connectToSortable).each(function() {
                    var i = e(this).sortable("instance");
                    i && !i.options.disabled && (s.sortables.push(i), i.refreshPositions(), i._trigger("activate", t, n))
                })
            },
            stop: function(t, i, s) {
                var n = e.extend({}, i, { item: s.element });
                s.cancelHelperRemoval = !1, e.each(s.sortables, function() {
                    var e = this;
                    e.isOver ? (e.isOver = 0, s.cancelHelperRemoval = !0, e.cancelHelperRemoval = !1, e._storedCSS = { position: e.placeholder.css("position"), top: e.placeholder.css("top"), left: e.placeholder.css("left") }, e._mouseStop(t), e.options.helper = e.options._helper) : (e.cancelHelperRemoval = !0, e._trigger("deactivate", t, n))
                })
            },
            drag: function(t, i, s) {
                e.each(s.sortables, function() {
                    var n = !1,
                        o = this;
                    o.positionAbs = s.positionAbs, o.helperProportions = s.helperProportions, o.offset.click = s.offset.click, o._intersectsWith(o.containerCache) && (n = !0, e.each(s.sortables, function() { return this.positionAbs = s.positionAbs, this.helperProportions = s.helperProportions, this.offset.click = s.offset.click, this !== o && this._intersectsWith(this.containerCache) && e.contains(o.element[0], this.element[0]) && (n = !1), n })), n ? (o.isOver || (o.isOver = 1, s._parent = i.helper.parent(), o.currentItem = i.helper.appendTo(o.element).data("ui-sortable-item", !0), o.options._helper = o.options.helper, o.options.helper = function() { return i.helper[0] }, t.target = o.currentItem[0], o._mouseCapture(t, !0), o._mouseStart(t, !0, !0), o.offset.click.top = s.offset.click.top, o.offset.click.left = s.offset.click.left, o.offset.parent.left -= s.offset.parent.left - o.offset.parent.left, o.offset.parent.top -= s.offset.parent.top - o.offset.parent.top, s._trigger("toSortable", t), s.dropped = o.element, e.each(s.sortables, function() { this.refreshPositions() }), s.currentItem = s.element, o.fromOutside = s), o.currentItem && (o._mouseDrag(t), i.position = o.position)) : o.isOver && (o.isOver = 0, o.cancelHelperRemoval = !0, o.options._revert = o.options.revert, o.options.revert = !1, o._trigger("out", t, o._uiHash(o)), o._mouseStop(t, !0), o.options.revert = o.options._revert, o.options.helper = o.options._helper, o.placeholder && o.placeholder.remove(), i.helper.appendTo(s._parent), s._refreshOffsets(t), i.position = s._generatePosition(t, !0), s._trigger("fromSortable", t), s.dropped = !1, e.each(s.sortables, function() { this.refreshPositions() }))
                })
            }
        }), e.ui.plugin.add("draggable", "cursor", {
            start: function(t, i, s) {
                var n = e("body"),
                    o = s.options;
                n.css("cursor") && (o._cursor = n.css("cursor")), n.css("cursor", o.cursor)
            },
            stop: function(t, i, s) {
                var n = s.options;
                n._cursor && e("body").css("cursor", n._cursor)
            }
        }), e.ui.plugin.add("draggable", "opacity", {
            start: function(t, i, s) {
                var n = e(i.helper),
                    o = s.options;
                n.css("opacity") && (o._opacity = n.css("opacity")), n.css("opacity", o.opacity)
            },
            stop: function(t, i, s) {
                var n = s.options;
                n._opacity && e(i.helper).css("opacity", n._opacity)
            }
        }), e.ui.plugin.add("draggable", "scroll", {
            start: function(e, t, i) { i.scrollParentNotHidden || (i.scrollParentNotHidden = i.helper.scrollParent(!1)), i.scrollParentNotHidden[0] !== i.document[0] && "HTML" !== i.scrollParentNotHidden[0].tagName && (i.overflowOffset = i.scrollParentNotHidden.offset()) },
            drag: function(t, i, s) {
                var n = s.options,
                    o = !1,
                    r = s.scrollParentNotHidden[0],
                    a = s.document[0];
                r !== a && "HTML" !== r.tagName ? (n.axis && "x" === n.axis || (s.overflowOffset.top + r.offsetHeight - t.pageY < n.scrollSensitivity ? r.scrollTop = o = r.scrollTop + n.scrollSpeed : t.pageY - s.overflowOffset.top < n.scrollSensitivity && (r.scrollTop = o = r.scrollTop - n.scrollSpeed)), n.axis && "y" === n.axis || (s.overflowOffset.left + r.offsetWidth - t.pageX < n.scrollSensitivity ? r.scrollLeft = o = r.scrollLeft + n.scrollSpeed : t.pageX - s.overflowOffset.left < n.scrollSensitivity && (r.scrollLeft = o = r.scrollLeft - n.scrollSpeed))) : (n.axis && "x" === n.axis || (t.pageY - e(a).scrollTop() < n.scrollSensitivity ? o = e(a).scrollTop(e(a).scrollTop() - n.scrollSpeed) : e(window).height() - (t.pageY - e(a).scrollTop()) < n.scrollSensitivity && (o = e(a).scrollTop(e(a).scrollTop() + n.scrollSpeed))), n.axis && "y" === n.axis || (t.pageX - e(a).scrollLeft() < n.scrollSensitivity ? o = e(a).scrollLeft(e(a).scrollLeft() - n.scrollSpeed) : e(window).width() - (t.pageX - e(a).scrollLeft()) < n.scrollSensitivity && (o = e(a).scrollLeft(e(a).scrollLeft() + n.scrollSpeed)))), o !== !1 && e.ui.ddmanager && !n.dropBehaviour && e.ui.ddmanager.prepareOffsets(s, t)
            }
        }), e.ui.plugin.add("draggable", "snap", {
            start: function(t, i, s) {
                var n = s.options;
                s.snapElements = [], e(n.snap.constructor !== String ? n.snap.items || ":data(ui-draggable)" : n.snap).each(function() {
                    var t = e(this),
                        i = t.offset();
                    this !== s.element[0] && s.snapElements.push({ item: this, width: t.outerWidth(), height: t.outerHeight(), top: i.top, left: i.left })
                })
            },
            drag: function(t, i, s) {
                var n, o, r, a, l, h, c, u, d, p, f = s.options,
                    m = f.snapTolerance,
                    g = i.offset.left,
                    v = g + s.helperProportions.width,
                    b = i.offset.top,
                    y = b + s.helperProportions.height;
                for (d = s.snapElements.length - 1; d >= 0; d--) l = s.snapElements[d].left - s.margins.left, h = l + s.snapElements[d].width, c = s.snapElements[d].top - s.margins.top, u = c + s.snapElements[d].height, l - m > v || g > h + m || c - m > y || b > u + m || !e.contains(s.snapElements[d].item.ownerDocument, s.snapElements[d].item) ? (s.snapElements[d].snapping && s.options.snap.release && s.options.snap.release.call(s.element, t, e.extend(s._uiHash(), { snapItem: s.snapElements[d].item })), s.snapElements[d].snapping = !1) : ("inner" !== f.snapMode && (n = m >= Math.abs(c - y), o = m >= Math.abs(u - b), r = m >= Math.abs(l - v), a = m >= Math.abs(h - g), n && (i.position.top = s._convertPositionTo("relative", { top: c - s.helperProportions.height, left: 0 }).top), o && (i.position.top = s._convertPositionTo("relative", { top: u, left: 0 }).top), r && (i.position.left = s._convertPositionTo("relative", { top: 0, left: l - s.helperProportions.width }).left), a && (i.position.left = s._convertPositionTo("relative", { top: 0, left: h }).left)), p = n || o || r || a, "outer" !== f.snapMode && (n = m >= Math.abs(c - b), o = m >= Math.abs(u - y), r = m >= Math.abs(l - g), a = m >= Math.abs(h - v), n && (i.position.top = s._convertPositionTo("relative", { top: c, left: 0 }).top), o && (i.position.top = s._convertPositionTo("relative", { top: u - s.helperProportions.height, left: 0 }).top), r && (i.position.left = s._convertPositionTo("relative", { top: 0, left: l }).left), a && (i.position.left = s._convertPositionTo("relative", { top: 0, left: h - s.helperProportions.width }).left)), !s.snapElements[d].snapping && (n || o || r || a || p) && s.options.snap.snap && s.options.snap.snap.call(s.element, t, e.extend(s._uiHash(), { snapItem: s.snapElements[d].item })), s.snapElements[d].snapping = n || o || r || a || p)
            }
        }), e.ui.plugin.add("draggable", "stack", {
            start: function(t, i, s) {
                var n, o = s.options,
                    r = e.makeArray(e(o.stack)).sort(function(t, i) { return (parseInt(e(t).css("zIndex"), 10) || 0) - (parseInt(e(i).css("zIndex"), 10) || 0) });
                r.length && (n = parseInt(e(r[0]).css("zIndex"), 10) || 0, e(r).each(function(t) { e(this).css("zIndex", n + t) }), this.css("zIndex", n + r.length))
            }
        }), e.ui.plugin.add("draggable", "zIndex", {
            start: function(t, i, s) {
                var n = e(i.helper),
                    o = s.options;
                n.css("zIndex") && (o._zIndex = n.css("zIndex")), n.css("zIndex", o.zIndex)
            },
            stop: function(t, i, s) {
                var n = s.options;
                n._zIndex && e(i.helper).css("zIndex", n._zIndex)
            }
        }), e.ui.draggable,
        e.widget("ui.droppable", {
            version: "1.11.4",
            widgetEventPrefix: "drop",
            options: { accept: "*", activeClass: !1, addClasses: !0, greedy: !1, hoverClass: !1, scope: "default", tolerance: "intersect", activate: null, deactivate: null, drop: null, out: null, over: null },
            _create: function() {
                var t, i = this.options,
                    s = i.accept;
                this.isover = !1, this.isout = !0, this.accept = e.isFunction(s) ? s : function(e) { return e.is(s) }, this.proportions = function() { return arguments.length ? void(t = arguments[0]) : t ? t : t = { width: this.element[0].offsetWidth, height: this.element[0].offsetHeight } }, this._addToManager(i.scope), i.addClasses && this.element.addClass("ui-droppable")
            },
            _addToManager: function(t) { e.ui.ddmanager.droppables[t] = e.ui.ddmanager.droppables[t] || [], e.ui.ddmanager.droppables[t].push(this) },
            _splice: function(e) { for (var t = 0; e.length > t; t++) e[t] === this && e.splice(t, 1) },
            _destroy: function() {
                var t = e.ui.ddmanager.droppables[this.options.scope];
                this._splice(t), this.element.removeClass("ui-droppable ui-droppable-disabled")
            },
            _setOption: function(t, i) {
                if ("accept" === t) this.accept = e.isFunction(i) ? i : function(e) { return e.is(i) };
                else if ("scope" === t) {
                    var s = e.ui.ddmanager.droppables[this.options.scope];
                    this._splice(s), this._addToManager(i)
                }
                this._super(t, i)
            },
            _activate: function(t) {
                var i = e.ui.ddmanager.current;
                this.options.activeClass && this.element.addClass(this.options.activeClass), i && this._trigger("activate", t, this.ui(i))
            },
            _deactivate: function(t) {
                var i = e.ui.ddmanager.current;
                this.options.activeClass && this.element.removeClass(this.options.activeClass), i && this._trigger("deactivate", t, this.ui(i))
            },
            _over: function(t) {
                var i = e.ui.ddmanager.current;
                i && (i.currentItem || i.element)[0] !== this.element[0] && this.accept.call(this.element[0], i.currentItem || i.element) && (this.options.hoverClass && this.element.addClass(this.options.hoverClass), this._trigger("over", t, this.ui(i)))
            },
            _out: function(t) {
                var i = e.ui.ddmanager.current;
                i && (i.currentItem || i.element)[0] !== this.element[0] && this.accept.call(this.element[0], i.currentItem || i.element) && (this.options.hoverClass && this.element.removeClass(this.options.hoverClass), this._trigger("out", t, this.ui(i)))
            },
            _drop: function(t, i) {
                var s = i || e.ui.ddmanager.current,
                    n = !1;
                return s && (s.currentItem || s.element)[0] !== this.element[0] ? (this.element.find(":data(ui-droppable)").not(".ui-draggable-dragging").each(function() { var i = e(this).droppable("instance"); return i.options.greedy && !i.options.disabled && i.options.scope === s.options.scope && i.accept.call(i.element[0], s.currentItem || s.element) && e.ui.intersect(s, e.extend(i, { offset: i.element.offset() }), i.options.tolerance, t) ? (n = !0, !1) : void 0 }), n ? !1 : this.accept.call(this.element[0], s.currentItem || s.element) ? (this.options.activeClass && this.element.removeClass(this.options.activeClass), this.options.hoverClass && this.element.removeClass(this.options.hoverClass), this._trigger("drop", t, this.ui(s)), this.element) : !1) : !1
            },
            ui: function(e) { return { draggable: e.currentItem || e.element, helper: e.helper, position: e.position, offset: e.positionAbs } }
        }), e.ui.intersect = function() {
            function e(e, t, i) { return e >= t && t + i > e }
            return function(t, i, s, n) {
                if (!i.offset) return !1;
                var o = (t.positionAbs || t.position.absolute).left + t.margins.left,
                    r = (t.positionAbs || t.position.absolute).top + t.margins.top,
                    a = o + t.helperProportions.width,
                    l = r + t.helperProportions.height,
                    h = i.offset.left,
                    c = i.offset.top,
                    u = h + i.proportions().width,
                    d = c + i.proportions().height;
                switch (s) {
                    case "fit":
                        return o >= h && u >= a && r >= c && d >= l;
                    case "intersect":
                        return o + t.helperProportions.width / 2 > h && u > a - t.helperProportions.width / 2 && r + t.helperProportions.height / 2 > c && d > l - t.helperProportions.height / 2;
                    case "pointer":
                        return e(n.pageY, c, i.proportions().height) && e(n.pageX, h, i.proportions().width);
                    case "touch":
                        return (r >= c && d >= r || l >= c && d >= l || c > r && l > d) && (o >= h && u >= o || a >= h && u >= a || h > o && a > u);
                    default:
                        return !1
                }
            }
        }(), e.ui.ddmanager = {
            current: null,
            droppables: { "default": [] },
            prepareOffsets: function(t, i) {
                var s, n, o = e.ui.ddmanager.droppables[t.options.scope] || [],
                    r = i ? i.type : null,
                    a = (t.currentItem || t.element).find(":data(ui-droppable)").addBack();
                e: for (s = 0; o.length > s; s++)
                    if (!(o[s].options.disabled || t && !o[s].accept.call(o[s].element[0], t.currentItem || t.element))) {
                        for (n = 0; a.length > n; n++)
                            if (a[n] === o[s].element[0]) { o[s].proportions().height = 0; continue e }
                        o[s].visible = "none" !== o[s].element.css("display"), o[s].visible && ("mousedown" === r && o[s]._activate.call(o[s], i), o[s].offset = o[s].element.offset(), o[s].proportions({ width: o[s].element[0].offsetWidth, height: o[s].element[0].offsetHeight }))
                    }
            },
            drop: function(t, i) { var s = !1; return e.each((e.ui.ddmanager.droppables[t.options.scope] || []).slice(), function() { this.options && (!this.options.disabled && this.visible && e.ui.intersect(t, this, this.options.tolerance, i) && (s = this._drop.call(this, i) || s), !this.options.disabled && this.visible && this.accept.call(this.element[0], t.currentItem || t.element) && (this.isout = !0, this.isover = !1, this._deactivate.call(this, i))) }), s },
            dragStart: function(t, i) { t.element.parentsUntil("body").bind("scroll.droppable", function() { t.options.refreshPositions || e.ui.ddmanager.prepareOffsets(t, i) }) },
            drag: function(t, i) {
                t.options.refreshPositions && e.ui.ddmanager.prepareOffsets(t, i), e.each(e.ui.ddmanager.droppables[t.options.scope] || [], function() {
                    if (!this.options.disabled && !this.greedyChild && this.visible) {
                        var s, n, o, r = e.ui.intersect(t, this, this.options.tolerance, i),
                            a = !r && this.isover ? "isout" : r && !this.isover ? "isover" : null;
                        a && (this.options.greedy && (n = this.options.scope, o = this.element.parents(":data(ui-droppable)").filter(function() { return e(this).droppable("instance").options.scope === n }), o.length && (s = e(o[0]).droppable("instance"), s.greedyChild = "isover" === a)), s && "isover" === a && (s.isover = !1, s.isout = !0, s._out.call(s, i)), this[a] = !0, this["isout" === a ? "isover" : "isout"] = !1, this["isover" === a ? "_over" : "_out"].call(this, i), s && "isout" === a && (s.isout = !1, s.isover = !0, s._over.call(s, i)))
                    }
                })
            },
            dragStop: function(t, i) { t.element.parentsUntil("body").unbind("scroll.droppable"), t.options.refreshPositions || e.ui.ddmanager.prepareOffsets(t, i) }
        }, e.ui.droppable, e.widget("ui.resizable", e.ui.mouse, {
            version: "1.11.4",
            widgetEventPrefix: "resize",
            options: { alsoResize: !1, animate: !1, animateDuration: "slow", animateEasing: "swing", aspectRatio: !1, autoHide: !1, containment: !1, ghost: !1, grid: !1, handles: "e,s,se", helper: !1, maxHeight: null, maxWidth: null, minHeight: 10, minWidth: 10, zIndex: 90, resize: null, start: null, stop: null },
            _num: function(e) { return parseInt(e, 10) || 0 },
            _isNumber: function(e) { return !isNaN(parseInt(e, 10)) },
            _hasScroll: function(t, i) {
                if ("hidden" === e(t).css("overflow")) return !1;
                var s = i && "left" === i ? "scrollLeft" : "scrollTop",
                    n = !1;
                return t[s] > 0 ? !0 : (t[s] = 1, n = t[s] > 0, t[s] = 0, n)
            },
            _create: function() {
                var t, i, s, n, o, r = this,
                    a = this.options;
                if (this.element.addClass("ui-resizable"), e.extend(this, { _aspectRatio: !!a.aspectRatio, aspectRatio: a.aspectRatio, originalElement: this.element, _proportionallyResizeElements: [], _helper: a.helper || a.ghost || a.animate ? a.helper || "ui-resizable-helper" : null }), this.element[0].nodeName.match(/^(canvas|textarea|input|select|button|img)$/i) && (this.element.wrap(e("<div class='ui-wrapper' style='overflow: hidden;'></div>").css({ position: this.element.css("position"), width: this.element.outerWidth(), height: this.element.outerHeight(), top: this.element.css("top"), left: this.element.css("left") })), this.element = this.element.parent().data("ui-resizable", this.element.resizable("instance")), this.elementIsWrapper = !0, this.element.css({ marginLeft: this.originalElement.css("marginLeft"), marginTop: this.originalElement.css("marginTop"), marginRight: this.originalElement.css("marginRight"), marginBottom: this.originalElement.css("marginBottom") }), this.originalElement.css({ marginLeft: 0, marginTop: 0, marginRight: 0, marginBottom: 0 }), this.originalResizeStyle = this.originalElement.css("resize"), this.originalElement.css("resize", "none"), this._proportionallyResizeElements.push(this.originalElement.css({ position: "static", zoom: 1, display: "block" })), this.originalElement.css({ margin: this.originalElement.css("margin") }), this._proportionallyResize()), this.handles = a.handles || (e(".ui-resizable-handle", this.element).length ? { n: ".ui-resizable-n", e: ".ui-resizable-e", s: ".ui-resizable-s", w: ".ui-resizable-w", se: ".ui-resizable-se", sw: ".ui-resizable-sw", ne: ".ui-resizable-ne", nw: ".ui-resizable-nw" } : "e,s,se"), this._handles = e(), this.handles.constructor === String)
                    for ("all" === this.handles && (this.handles = "n,e,s,w,se,sw,ne,nw"), t = this.handles.split(","), this.handles = {}, i = 0; t.length > i; i++) s = e.trim(t[i]), o = "ui-resizable-" + s, n = e("<div class='ui-resizable-handle " + o + "'></div>"), n.css({ zIndex: a.zIndex }), "se" === s && n.addClass("ui-icon ui-icon-gripsmall-diagonal-se"), this.handles[s] = ".ui-resizable-" + s, this.element.append(n);
                this._renderAxis = function(t) {
                    var i, s, n, o;
                    t = t || this.element;
                    for (i in this.handles) this.handles[i].constructor === String ? this.handles[i] = this.element.children(this.handles[i]).first().show() : (this.handles[i].jquery || this.handles[i].nodeType) && (this.handles[i] = e(this.handles[i]), this._on(this.handles[i], { mousedown: r._mouseDown })), this.elementIsWrapper && this.originalElement[0].nodeName.match(/^(textarea|input|select|button)$/i) && (s = e(this.handles[i], this.element), o = /sw|ne|nw|se|n|s/.test(i) ? s.outerHeight() : s.outerWidth(), n = ["padding", /ne|nw|n/.test(i) ? "Top" : /se|sw|s/.test(i) ? "Bottom" : /^e$/.test(i) ? "Right" : "Left"].join(""), t.css(n, o), this._proportionallyResize()), this._handles = this._handles.add(this.handles[i])
                }, this._renderAxis(this.element), this._handles = this._handles.add(this.element.find(".ui-resizable-handle")), this._handles.disableSelection(), this._handles.mouseover(function() { r.resizing || (this.className && (n = this.className.match(/ui-resizable-(se|sw|ne|nw|n|e|s|w)/i)), r.axis = n && n[1] ? n[1] : "se") }), a.autoHide && (this._handles.hide(), e(this.element).addClass("ui-resizable-autohide").mouseenter(function() { a.disabled || (e(this).removeClass("ui-resizable-autohide"), r._handles.show()) }).mouseleave(function() { a.disabled || r.resizing || (e(this).addClass("ui-resizable-autohide"), r._handles.hide()) })), this._mouseInit()
            },
            _destroy: function() { this._mouseDestroy(); var t, i = function(t) { e(t).removeClass("ui-resizable ui-resizable-disabled ui-resizable-resizing").removeData("resizable").removeData("ui-resizable").unbind(".resizable").find(".ui-resizable-handle").remove() }; return this.elementIsWrapper && (i(this.element), t = this.element, this.originalElement.css({ position: t.css("position"), width: t.outerWidth(), height: t.outerHeight(), top: t.css("top"), left: t.css("left") }).insertAfter(t), t.remove()), this.originalElement.css("resize", this.originalResizeStyle), i(this.originalElement), this },
            _mouseCapture: function(t) { var i, s, n = !1; for (i in this.handles) s = e(this.handles[i])[0], (s === t.target || e.contains(s, t.target)) && (n = !0); return !this.options.disabled && n },
            _mouseStart: function(t) {
                var i, s, n, o = this.options,
                    r = this.element;
                return this.resizing = !0, this._renderProxy(), i = this._num(this.helper.css("left")), s = this._num(this.helper.css("top")), o.containment && (i += e(o.containment).scrollLeft() || 0, s += e(o.containment).scrollTop() || 0), this.offset = this.helper.offset(), this.position = { left: i, top: s }, this.size = this._helper ? { width: this.helper.width(), height: this.helper.height() } : { width: r.width(), height: r.height() }, this.originalSize = this._helper ? { width: r.outerWidth(), height: r.outerHeight() } : { width: r.width(), height: r.height() }, this.sizeDiff = { width: r.outerWidth() - r.width(), height: r.outerHeight() - r.height() }, this.originalPosition = { left: i, top: s }, this.originalMousePosition = { left: t.pageX, top: t.pageY }, this.aspectRatio = "number" == typeof o.aspectRatio ? o.aspectRatio : this.originalSize.width / this.originalSize.height || 1, n = e(".ui-resizable-" + this.axis).css("cursor"), e("body").css("cursor", "auto" === n ? this.axis + "-resize" : n), r.addClass("ui-resizable-resizing"), this._propagate("start", t), !0
            },
            _mouseDrag: function(t) {
                var i, s, n = this.originalMousePosition,
                    o = this.axis,
                    r = t.pageX - n.left || 0,
                    a = t.pageY - n.top || 0,
                    l = this._change[o];
                return this._updatePrevProperties(), l ? (i = l.apply(this, [t, r, a]), this._updateVirtualBoundaries(t.shiftKey), (this._aspectRatio || t.shiftKey) && (i = this._updateRatio(i, t)), i = this._respectSize(i, t), this._updateCache(i), this._propagate("resize", t), s = this._applyChanges(), !this._helper && this._proportionallyResizeElements.length && this._proportionallyResize(), e.isEmptyObject(s) || (this._updatePrevProperties(), this._trigger("resize", t, this.ui()), this._applyChanges()), !1) : !1
            },
            _mouseStop: function(t) {
                this.resizing = !1;
                var i, s, n, o, r, a, l, h = this.options,
                    c = this;
                return this._helper && (i = this._proportionallyResizeElements, s = i.length && /textarea/i.test(i[0].nodeName), n = s && this._hasScroll(i[0], "left") ? 0 : c.sizeDiff.height, o = s ? 0 : c.sizeDiff.width, r = { width: c.helper.width() - o, height: c.helper.height() - n }, a = parseInt(c.element.css("left"), 10) + (c.position.left - c.originalPosition.left) || null, l = parseInt(c.element.css("top"), 10) + (c.position.top - c.originalPosition.top) || null, h.animate || this.element.css(e.extend(r, { top: l, left: a })), c.helper.height(c.size.height), c.helper.width(c.size.width), this._helper && !h.animate && this._proportionallyResize()), e("body").css("cursor", "auto"), this.element.removeClass("ui-resizable-resizing"), this._propagate("stop", t), this._helper && this.helper.remove(), !1
            },
            _updatePrevProperties: function() { this.prevPosition = { top: this.position.top, left: this.position.left }, this.prevSize = { width: this.size.width, height: this.size.height } },
            _applyChanges: function() { var e = {}; return this.position.top !== this.prevPosition.top && (e.top = this.position.top + "px"), this.position.left !== this.prevPosition.left && (e.left = this.position.left + "px"), this.size.width !== this.prevSize.width && (e.width = this.size.width + "px"), this.size.height !== this.prevSize.height && (e.height = this.size.height + "px"), this.helper.css(e), e },
            _updateVirtualBoundaries: function(e) {
                var t, i, s, n, o, r = this.options;
                o = { minWidth: this._isNumber(r.minWidth) ? r.minWidth : 0, maxWidth: this._isNumber(r.maxWidth) ? r.maxWidth : 1 / 0, minHeight: this._isNumber(r.minHeight) ? r.minHeight : 0, maxHeight: this._isNumber(r.maxHeight) ? r.maxHeight : 1 / 0 }, (this._aspectRatio || e) && (t = o.minHeight * this.aspectRatio, s = o.minWidth / this.aspectRatio, i = o.maxHeight * this.aspectRatio, n = o.maxWidth / this.aspectRatio, t > o.minWidth && (o.minWidth = t), s > o.minHeight && (o.minHeight = s), o.maxWidth > i && (o.maxWidth = i), o.maxHeight > n && (o.maxHeight = n)), this._vBoundaries = o
            },
            _updateCache: function(e) { this.offset = this.helper.offset(), this._isNumber(e.left) && (this.position.left = e.left), this._isNumber(e.top) && (this.position.top = e.top), this._isNumber(e.height) && (this.size.height = e.height), this._isNumber(e.width) && (this.size.width = e.width) },
            _updateRatio: function(e) {
                var t = this.position,
                    i = this.size,
                    s = this.axis;
                return this._isNumber(e.height) ? e.width = e.height * this.aspectRatio : this._isNumber(e.width) && (e.height = e.width / this.aspectRatio), "sw" === s && (e.left = t.left + (i.width - e.width), e.top = null), "nw" === s && (e.top = t.top + (i.height - e.height), e.left = t.left + (i.width - e.width)), e
            },
            _respectSize: function(e) {
                var t = this._vBoundaries,
                    i = this.axis,
                    s = this._isNumber(e.width) && t.maxWidth && t.maxWidth < e.width,
                    n = this._isNumber(e.height) && t.maxHeight && t.maxHeight < e.height,
                    o = this._isNumber(e.width) && t.minWidth && t.minWidth > e.width,
                    r = this._isNumber(e.height) && t.minHeight && t.minHeight > e.height,
                    a = this.originalPosition.left + this.originalSize.width,
                    l = this.position.top + this.size.height,
                    h = /sw|nw|w/.test(i),
                    c = /nw|ne|n/.test(i);
                return o && (e.width = t.minWidth), r && (e.height = t.minHeight), s && (e.width = t.maxWidth), n && (e.height = t.maxHeight), o && h && (e.left = a - t.minWidth), s && h && (e.left = a - t.maxWidth), r && c && (e.top = l - t.minHeight), n && c && (e.top = l - t.maxHeight), e.width || e.height || e.left || !e.top ? e.width || e.height || e.top || !e.left || (e.left = null) : e.top = null, e
            },
            _getPaddingPlusBorderDimensions: function(e) { for (var t = 0, i = [], s = [e.css("borderTopWidth"), e.css("borderRightWidth"), e.css("borderBottomWidth"), e.css("borderLeftWidth")], n = [e.css("paddingTop"), e.css("paddingRight"), e.css("paddingBottom"), e.css("paddingLeft")]; 4 > t; t++) i[t] = parseInt(s[t], 10) || 0, i[t] += parseInt(n[t], 10) || 0; return { height: i[0] + i[2], width: i[1] + i[3] } },
            _proportionallyResize: function() {
                if (this._proportionallyResizeElements.length)
                    for (var e, t = 0, i = this.helper || this.element; this._proportionallyResizeElements.length > t; t++) e = this._proportionallyResizeElements[t], this.outerDimensions || (this.outerDimensions = this._getPaddingPlusBorderDimensions(e)), e.css({ height: i.height() - this.outerDimensions.height || 0, width: i.width() - this.outerDimensions.width || 0 })
            },
            _renderProxy: function() {
                var t = this.element,
                    i = this.options;
                this.elementOffset = t.offset(), this._helper ? (this.helper = this.helper || e("<div style='overflow:hidden;'></div>"), this.helper.addClass(this._helper).css({ width: this.element.outerWidth() - 1, height: this.element.outerHeight() - 1, position: "absolute", left: this.elementOffset.left + "px", top: this.elementOffset.top + "px", zIndex: ++i.zIndex }), this.helper.appendTo("body").disableSelection()) : this.helper = this.element
            },
            _change: {
                e: function(e, t) { return { width: this.originalSize.width + t } },
                w: function(e, t) {
                    var i = this.originalSize,
                        s = this.originalPosition;
                    return { left: s.left + t, width: i.width - t }
                },
                n: function(e, t, i) {
                    var s = this.originalSize,
                        n = this.originalPosition;
                    return { top: n.top + i, height: s.height - i }
                },
                s: function(e, t, i) { return { height: this.originalSize.height + i } },
                se: function(t, i, s) { return e.extend(this._change.s.apply(this, arguments), this._change.e.apply(this, [t, i, s])) },
                sw: function(t, i, s) { return e.extend(this._change.s.apply(this, arguments), this._change.w.apply(this, [t, i, s])) },
                ne: function(t, i, s) { return e.extend(this._change.n.apply(this, arguments), this._change.e.apply(this, [t, i, s])) },
                nw: function(t, i, s) { return e.extend(this._change.n.apply(this, arguments), this._change.w.apply(this, [t, i, s])) }
            },
            _propagate: function(t, i) { e.ui.plugin.call(this, t, [i, this.ui()]), "resize" !== t && this._trigger(t, i, this.ui()) },
            plugins: {},
            ui: function() { return { originalElement: this.originalElement, element: this.element, helper: this.helper, position: this.position, size: this.size, originalSize: this.originalSize, originalPosition: this.originalPosition } }
        }), e.ui.plugin.add("resizable", "animate", {
            stop: function(t) {
                var i = e(this).resizable("instance"),
                    s = i.options,
                    n = i._proportionallyResizeElements,
                    o = n.length && /textarea/i.test(n[0].nodeName),
                    r = o && i._hasScroll(n[0], "left") ? 0 : i.sizeDiff.height,
                    a = o ? 0 : i.sizeDiff.width,
                    l = { width: i.size.width - a, height: i.size.height - r },
                    h = parseInt(i.element.css("left"), 10) + (i.position.left - i.originalPosition.left) || null,
                    c = parseInt(i.element.css("top"), 10) + (i.position.top - i.originalPosition.top) || null;
                i.element.animate(e.extend(l, c && h ? { top: c, left: h } : {}), {
                    duration: s.animateDuration,
                    easing: s.animateEasing,
                    step: function() {
                        var s = { width: parseInt(i.element.css("width"), 10), height: parseInt(i.element.css("height"), 10), top: parseInt(i.element.css("top"), 10), left: parseInt(i.element.css("left"), 10) };
                        n && n.length && e(n[0]).css({ width: s.width, height: s.height }), i._updateCache(s), i._propagate("resize", t)
                    }
                })
            }
        }), e.ui.plugin.add("resizable", "containment", {
            start: function() {
                var t, i, s, n, o, r, a, l = e(this).resizable("instance"),
                    h = l.options,
                    c = l.element,
                    u = h.containment,
                    d = u instanceof e ? u.get(0) : /parent/.test(u) ? c.parent().get(0) : u;
                d && (l.containerElement = e(d), /document/.test(u) || u === document ? (l.containerOffset = { left: 0, top: 0 }, l.containerPosition = { left: 0, top: 0 }, l.parentData = { element: e(document), left: 0, top: 0, width: e(document).width(), height: e(document).height() || document.body.parentNode.scrollHeight }) : (t = e(d), i = [], e(["Top", "Right", "Left", "Bottom"]).each(function(e, s) { i[e] = l._num(t.css("padding" + s)) }), l.containerOffset = t.offset(), l.containerPosition = t.position(), l.containerSize = { height: t.innerHeight() - i[3], width: t.innerWidth() - i[1] }, s = l.containerOffset, n = l.containerSize.height, o = l.containerSize.width, r = l._hasScroll(d, "left") ? d.scrollWidth : o, a = l._hasScroll(d) ? d.scrollHeight : n, l.parentData = { element: d, left: s.left, top: s.top, width: r, height: a }))
            },
            resize: function(t) {
                var i, s, n, o, r = e(this).resizable("instance"),
                    a = r.options,
                    l = r.containerOffset,
                    h = r.position,
                    c = r._aspectRatio || t.shiftKey,
                    u = { top: 0, left: 0 },
                    d = r.containerElement,
                    p = !0;
                d[0] !== document && /static/.test(d.css("position")) && (u = l), h.left < (r._helper ? l.left : 0) && (r.size.width = r.size.width + (r._helper ? r.position.left - l.left : r.position.left - u.left), c && (r.size.height = r.size.width / r.aspectRatio, p = !1), r.position.left = a.helper ? l.left : 0), h.top < (r._helper ? l.top : 0) && (r.size.height = r.size.height + (r._helper ? r.position.top - l.top : r.position.top), c && (r.size.width = r.size.height * r.aspectRatio, p = !1), r.position.top = r._helper ? l.top : 0), n = r.containerElement.get(0) === r.element.parent().get(0), o = /relative|absolute/.test(r.containerElement.css("position")), n && o ? (r.offset.left = r.parentData.left + r.position.left, r.offset.top = r.parentData.top + r.position.top) : (r.offset.left = r.element.offset().left, r.offset.top = r.element.offset().top), i = Math.abs(r.sizeDiff.width + (r._helper ? r.offset.left - u.left : r.offset.left - l.left)), s = Math.abs(r.sizeDiff.height + (r._helper ? r.offset.top - u.top : r.offset.top - l.top)), i + r.size.width >= r.parentData.width && (r.size.width = r.parentData.width - i, c && (r.size.height = r.size.width / r.aspectRatio, p = !1)), s + r.size.height >= r.parentData.height && (r.size.height = r.parentData.height - s, c && (r.size.width = r.size.height * r.aspectRatio, p = !1)), p || (r.position.left = r.prevPosition.left, r.position.top = r.prevPosition.top, r.size.width = r.prevSize.width, r.size.height = r.prevSize.height)
            },
            stop: function() {
                var t = e(this).resizable("instance"),
                    i = t.options,
                    s = t.containerOffset,
                    n = t.containerPosition,
                    o = t.containerElement,
                    r = e(t.helper),
                    a = r.offset(),
                    l = r.outerWidth() - t.sizeDiff.width,
                    h = r.outerHeight() - t.sizeDiff.height;
                t._helper && !i.animate && /relative/.test(o.css("position")) && e(this).css({ left: a.left - n.left - s.left, width: l, height: h }), t._helper && !i.animate && /static/.test(o.css("position")) && e(this).css({ left: a.left - n.left - s.left, width: l, height: h })
            }
        }), e.ui.plugin.add("resizable", "alsoResize", {
            start: function() {
                var t = e(this).resizable("instance"),
                    i = t.options;
                e(i.alsoResize).each(function() {
                    var t = e(this);
                    t.data("ui-resizable-alsoresize", { width: parseInt(t.width(), 10), height: parseInt(t.height(), 10), left: parseInt(t.css("left"), 10), top: parseInt(t.css("top"), 10) })
                })
            },
            resize: function(t, i) {
                var s = e(this).resizable("instance"),
                    n = s.options,
                    o = s.originalSize,
                    r = s.originalPosition,
                    a = { height: s.size.height - o.height || 0, width: s.size.width - o.width || 0, top: s.position.top - r.top || 0, left: s.position.left - r.left || 0 };
                e(n.alsoResize).each(function() {
                    var t = e(this),
                        s = e(this).data("ui-resizable-alsoresize"),
                        n = {},
                        o = t.parents(i.originalElement[0]).length ? ["width", "height"] : ["width", "height", "top", "left"];
                    e.each(o, function(e, t) {
                        var i = (s[t] || 0) + (a[t] || 0);
                        i && i >= 0 && (n[t] = i || null)
                    }), t.css(n)
                })
            },
            stop: function() { e(this).removeData("resizable-alsoresize") }
        }), e.ui.plugin.add("resizable", "ghost", {
            start: function() {
                var t = e(this).resizable("instance"),
                    i = t.options,
                    s = t.size;
                t.ghost = t.originalElement.clone(), t.ghost.css({ opacity: .25, display: "block", position: "relative", height: s.height, width: s.width, margin: 0, left: 0, top: 0 }).addClass("ui-resizable-ghost").addClass("string" == typeof i.ghost ? i.ghost : ""), t.ghost.appendTo(t.helper)
            },
            resize: function() {
                var t = e(this).resizable("instance");
                t.ghost && t.ghost.css({ position: "relative", height: t.size.height, width: t.size.width })
            },
            stop: function() {
                var t = e(this).resizable("instance");
                t.ghost && t.helper && t.helper.get(0).removeChild(t.ghost.get(0))
            }
        }), e.ui.plugin.add("resizable", "grid", {
            resize: function() {
                var t, i = e(this).resizable("instance"),
                    s = i.options,
                    n = i.size,
                    o = i.originalSize,
                    r = i.originalPosition,
                    a = i.axis,
                    l = "number" == typeof s.grid ? [s.grid, s.grid] : s.grid,
                    h = l[0] || 1,
                    c = l[1] || 1,
                    u = Math.round((n.width - o.width) / h) * h,
                    d = Math.round((n.height - o.height) / c) * c,
                    p = o.width + u,
                    f = o.height + d,
                    m = s.maxWidth && p > s.maxWidth,
                    g = s.maxHeight && f > s.maxHeight,
                    v = s.minWidth && s.minWidth > p,
                    b = s.minHeight && s.minHeight > f;
                s.grid = l, v && (p += h), b && (f += c), m && (p -= h), g && (f -= c), /^(se|s|e)$/.test(a) ? (i.size.width = p, i.size.height = f) : /^(ne)$/.test(a) ? (i.size.width = p, i.size.height = f, i.position.top = r.top - d) : /^(sw)$/.test(a) ? (i.size.width = p, i.size.height = f, i.position.left = r.left - u) : ((0 >= f - c || 0 >= p - h) && (t = i._getPaddingPlusBorderDimensions(this)), f - c > 0 ? (i.size.height = f, i.position.top = r.top - d) : (f = c - t.height, i.size.height = f, i.position.top = r.top + o.height - f), p - h > 0 ? (i.size.width = p, i.position.left = r.left - u) : (p = h - t.width, i.size.width = p, i.position.left = r.left + o.width - p))
            }
        }), e.ui.resizable, e.widget("ui.selectable", e.ui.mouse, {
            version: "1.11.4",
            options: { appendTo: "body", autoRefresh: !0, distance: 0, filter: "*", tolerance: "touch", selected: null, selecting: null, start: null, stop: null, unselected: null, unselecting: null },
            _create: function() {
                var t, i = this;
                this.element.addClass("ui-selectable"), this.dragged = !1, this.refresh = function() {
                    t = e(i.options.filter, i.element[0]), t.addClass("ui-selectee"), t.each(function() {
                        var t = e(this),
                            i = t.offset();
                        e.data(this, "selectable-item", { element: this, $element: t, left: i.left, top: i.top, right: i.left + t.outerWidth(), bottom: i.top + t.outerHeight(), startselected: !1, selected: t.hasClass("ui-selected"), selecting: t.hasClass("ui-selecting"), unselecting: t.hasClass("ui-unselecting") })
                    })
                }, this.refresh(), this.selectees = t.addClass("ui-selectee"), this._mouseInit(), this.helper = e("<div class='ui-selectable-helper'></div>")
            },
            _destroy: function() { this.selectees.removeClass("ui-selectee").removeData("selectable-item"), this.element.removeClass("ui-selectable ui-selectable-disabled"), this._mouseDestroy() },
            _mouseStart: function(t) {
                var i = this,
                    s = this.options;
                this.opos = [t.pageX, t.pageY], this.options.disabled || (this.selectees = e(s.filter, this.element[0]), this._trigger("start", t), e(s.appendTo).append(this.helper), this.helper.css({ left: t.pageX, top: t.pageY, width: 0, height: 0 }), s.autoRefresh && this.refresh(), this.selectees.filter(".ui-selected").each(function() {
                    var s = e.data(this, "selectable-item");
                    s.startselected = !0, t.metaKey || t.ctrlKey || (s.$element.removeClass("ui-selected"), s.selected = !1, s.$element.addClass("ui-unselecting"), s.unselecting = !0, i._trigger("unselecting", t, { unselecting: s.element }))
                }), e(t.target).parents().addBack().each(function() { var s, n = e.data(this, "selectable-item"); return n ? (s = !t.metaKey && !t.ctrlKey || !n.$element.hasClass("ui-selected"), n.$element.removeClass(s ? "ui-unselecting" : "ui-selected").addClass(s ? "ui-selecting" : "ui-unselecting"), n.unselecting = !s, n.selecting = s, n.selected = s, s ? i._trigger("selecting", t, { selecting: n.element }) : i._trigger("unselecting", t, { unselecting: n.element }), !1) : void 0 }))
            },
            _mouseDrag: function(t) {
                if (this.dragged = !0, !this.options.disabled) {
                    var i, s = this,
                        n = this.options,
                        o = this.opos[0],
                        r = this.opos[1],
                        a = t.pageX,
                        l = t.pageY;
                    return o > a && (i = a, a = o, o = i), r > l && (i = l, l = r, r = i), this.helper.css({ left: o, top: r, width: a - o, height: l - r }), this.selectees.each(function() {
                        var i = e.data(this, "selectable-item"),
                            h = !1;
                        i && i.element !== s.element[0] && ("touch" === n.tolerance ? h = !(i.left > a || o > i.right || i.top > l || r > i.bottom) : "fit" === n.tolerance && (h = i.left > o && a > i.right && i.top > r && l > i.bottom), h ? (i.selected && (i.$element.removeClass("ui-selected"), i.selected = !1), i.unselecting && (i.$element.removeClass("ui-unselecting"), i.unselecting = !1), i.selecting || (i.$element.addClass("ui-selecting"), i.selecting = !0, s._trigger("selecting", t, { selecting: i.element }))) : (i.selecting && ((t.metaKey || t.ctrlKey) && i.startselected ? (i.$element.removeClass("ui-selecting"), i.selecting = !1, i.$element.addClass("ui-selected"), i.selected = !0) : (i.$element.removeClass("ui-selecting"), i.selecting = !1, i.startselected && (i.$element.addClass("ui-unselecting"), i.unselecting = !0), s._trigger("unselecting", t, { unselecting: i.element }))), i.selected && (t.metaKey || t.ctrlKey || i.startselected || (i.$element.removeClass("ui-selected"), i.selected = !1, i.$element.addClass("ui-unselecting"), i.unselecting = !0, s._trigger("unselecting", t, { unselecting: i.element })))))
                    }), !1
                }
            },
            _mouseStop: function(t) {
                var i = this;
                return this.dragged = !1, e(".ui-unselecting", this.element[0]).each(function() {
                    var s = e.data(this, "selectable-item");
                    s.$element.removeClass("ui-unselecting"), s.unselecting = !1, s.startselected = !1, i._trigger("unselected", t, { unselected: s.element })
                }), e(".ui-selecting", this.element[0]).each(function() {
                    var s = e.data(this, "selectable-item");
                    s.$element.removeClass("ui-selecting").addClass("ui-selected"), s.selecting = !1, s.selected = !0, s.startselected = !0, i._trigger("selected", t, { selected: s.element })
                }), this._trigger("stop", t), this.helper.remove(), !1
            }
        }), e.widget("ui.sortable", e.ui.mouse, {
            version: "1.11.4",
            widgetEventPrefix: "sort",
            ready: !1,
            options: { appendTo: "parent", axis: !1, connectWith: !1, containment: !1, cursor: "auto", cursorAt: !1, dropOnEmpty: !0, forcePlaceholderSize: !1, forceHelperSize: !1, grid: !1, handle: !1, helper: "original", items: "> *", opacity: !1, placeholder: !1, revert: !1, scroll: !0, scrollSensitivity: 20, scrollSpeed: 20, scope: "default", tolerance: "intersect", zIndex: 1e3, activate: null, beforeStop: null, change: null, deactivate: null, out: null, over: null, receive: null, remove: null, sort: null, start: null, stop: null, update: null },
            _isOverAxis: function(e, t, i) { return e >= t && t + i > e },
            _isFloating: function(e) { return /left|right/.test(e.css("float")) || /inline|table-cell/.test(e.css("display")) },
            _create: function() { this.containerCache = {}, this.element.addClass("ui-sortable"), this.refresh(), this.offset = this.element.offset(), this._mouseInit(), this._setHandleClassName(), this.ready = !0 },
            _setOption: function(e, t) { this._super(e, t), "handle" === e && this._setHandleClassName() },
            _setHandleClassName: function() {
                this.element.find(".ui-sortable-handle").removeClass("ui-sortable-handle"), e.each(this.items, function() {
                    (this.instance.options.handle ? this.item.find(this.instance.options.handle) : this.item).addClass("ui-sortable-handle")
                })
            },
            _destroy: function() { this.element.removeClass("ui-sortable ui-sortable-disabled").find(".ui-sortable-handle").removeClass("ui-sortable-handle"), this._mouseDestroy(); for (var e = this.items.length - 1; e >= 0; e--) this.items[e].item.removeData(this.widgetName + "-item"); return this },
            _mouseCapture: function(t, i) {
                var s = null,
                    n = !1,
                    o = this;
                return this.reverting ? !1 : this.options.disabled || "static" === this.options.type ? !1 : (this._refreshItems(t), e(t.target).parents().each(function() { return e.data(this, o.widgetName + "-item") === o ? (s = e(this), !1) : void 0 }), e.data(t.target, o.widgetName + "-item") === o && (s = e(t.target)), s && (!this.options.handle || i || (e(this.options.handle, s).find("*").addBack().each(function() { this === t.target && (n = !0) }), n)) ? (this.currentItem = s, this._removeCurrentsFromItems(), !0) : !1)
            },
            _mouseStart: function(t, i, s) {
                var n, o, r = this.options;
                if (this.currentContainer = this, this.refreshPositions(), this.helper = this._createHelper(t), this._cacheHelperProportions(), this._cacheMargins(), this.scrollParent = this.helper.scrollParent(), this.offset = this.currentItem.offset(), this.offset = { top: this.offset.top - this.margins.top, left: this.offset.left - this.margins.left }, e.extend(this.offset, { click: { left: t.pageX - this.offset.left, top: t.pageY - this.offset.top }, parent: this._getParentOffset(), relative: this._getRelativeOffset() }), this.helper.css("position", "absolute"), this.cssPosition = this.helper.css("position"), this.originalPosition = this._generatePosition(t), this.originalPageX = t.pageX, this.originalPageY = t.pageY, r.cursorAt && this._adjustOffsetFromHelper(r.cursorAt), this.domPosition = { prev: this.currentItem.prev()[0], parent: this.currentItem.parent()[0] }, this.helper[0] !== this.currentItem[0] && this.currentItem.hide(), this._createPlaceholder(), r.containment && this._setContainment(), r.cursor && "auto" !== r.cursor && (o = this.document.find("body"), this.storedCursor = o.css("cursor"), o.css("cursor", r.cursor), this.storedStylesheet = e("<style>*{ cursor: " + r.cursor + " !important; }</style>").appendTo(o)), r.opacity && (this.helper.css("opacity") && (this._storedOpacity = this.helper.css("opacity")), this.helper.css("opacity", r.opacity)), r.zIndex && (this.helper.css("zIndex") && (this._storedZIndex = this.helper.css("zIndex")), this.helper.css("zIndex", r.zIndex)), this.scrollParent[0] !== this.document[0] && "HTML" !== this.scrollParent[0].tagName && (this.overflowOffset = this.scrollParent.offset()), this._trigger("start", t, this._uiHash()), this._preserveHelperProportions || this._cacheHelperProportions(), !s)
                    for (n = this.containers.length - 1; n >= 0; n--) this.containers[n]._trigger("activate", t, this._uiHash(this));
                return e.ui.ddmanager && (e.ui.ddmanager.current = this), e.ui.ddmanager && !r.dropBehaviour && e.ui.ddmanager.prepareOffsets(this, t), this.dragging = !0, this.helper.addClass("ui-sortable-helper"), this._mouseDrag(t), !0
            },
            _mouseDrag: function(t) {
                var i, s, n, o, r = this.options,
                    a = !1;
                for (this.position = this._generatePosition(t), this.positionAbs = this._convertPositionTo("absolute"),
                    this.lastPositionAbs || (this.lastPositionAbs = this.positionAbs), this.options.scroll && (this.scrollParent[0] !== this.document[0] && "HTML" !== this.scrollParent[0].tagName ? (this.overflowOffset.top + this.scrollParent[0].offsetHeight - t.pageY < r.scrollSensitivity ? this.scrollParent[0].scrollTop = a = this.scrollParent[0].scrollTop + r.scrollSpeed : t.pageY - this.overflowOffset.top < r.scrollSensitivity && (this.scrollParent[0].scrollTop = a = this.scrollParent[0].scrollTop - r.scrollSpeed), this.overflowOffset.left + this.scrollParent[0].offsetWidth - t.pageX < r.scrollSensitivity ? this.scrollParent[0].scrollLeft = a = this.scrollParent[0].scrollLeft + r.scrollSpeed : t.pageX - this.overflowOffset.left < r.scrollSensitivity && (this.scrollParent[0].scrollLeft = a = this.scrollParent[0].scrollLeft - r.scrollSpeed)) : (t.pageY - this.document.scrollTop() < r.scrollSensitivity ? a = this.document.scrollTop(this.document.scrollTop() - r.scrollSpeed) : this.window.height() - (t.pageY - this.document.scrollTop()) < r.scrollSensitivity && (a = this.document.scrollTop(this.document.scrollTop() + r.scrollSpeed)), t.pageX - this.document.scrollLeft() < r.scrollSensitivity ? a = this.document.scrollLeft(this.document.scrollLeft() - r.scrollSpeed) : this.window.width() - (t.pageX - this.document.scrollLeft()) < r.scrollSensitivity && (a = this.document.scrollLeft(this.document.scrollLeft() + r.scrollSpeed))), a !== !1 && e.ui.ddmanager && !r.dropBehaviour && e.ui.ddmanager.prepareOffsets(this, t)), this.positionAbs = this._convertPositionTo("absolute"), this.options.axis && "y" === this.options.axis || (this.helper[0].style.left = this.position.left + "px"), this.options.axis && "x" === this.options.axis || (this.helper[0].style.top = this.position.top + "px"), i = this.items.length - 1; i >= 0; i--)
                    if (s = this.items[i], n = s.item[0], o = this._intersectsWithPointer(s), o && s.instance === this.currentContainer && n !== this.currentItem[0] && this.placeholder[1 === o ? "next" : "prev"]()[0] !== n && !e.contains(this.placeholder[0], n) && ("semi-dynamic" === this.options.type ? !e.contains(this.element[0], n) : !0)) {
                        if (this.direction = 1 === o ? "down" : "up", "pointer" !== this.options.tolerance && !this._intersectsWithSides(s)) break;
                        this._rearrange(t, s), this._trigger("change", t, this._uiHash());
                        break
                    }
                return this._contactContainers(t), e.ui.ddmanager && e.ui.ddmanager.drag(this, t), this._trigger("sort", t, this._uiHash()), this.lastPositionAbs = this.positionAbs, !1
            },
            _mouseStop: function(t, i) {
                if (t) {
                    if (e.ui.ddmanager && !this.options.dropBehaviour && e.ui.ddmanager.drop(this, t), this.options.revert) {
                        var s = this,
                            n = this.placeholder.offset(),
                            o = this.options.axis,
                            r = {};
                        o && "x" !== o || (r.left = n.left - this.offset.parent.left - this.margins.left + (this.offsetParent[0] === this.document[0].body ? 0 : this.offsetParent[0].scrollLeft)), o && "y" !== o || (r.top = n.top - this.offset.parent.top - this.margins.top + (this.offsetParent[0] === this.document[0].body ? 0 : this.offsetParent[0].scrollTop)), this.reverting = !0, e(this.helper).animate(r, parseInt(this.options.revert, 10) || 500, function() { s._clear(t) })
                    } else this._clear(t, i);
                    return !1
                }
            },
            cancel: function() { if (this.dragging) { this._mouseUp({ target: null }), "original" === this.options.helper ? this.currentItem.css(this._storedCSS).removeClass("ui-sortable-helper") : this.currentItem.show(); for (var t = this.containers.length - 1; t >= 0; t--) this.containers[t]._trigger("deactivate", null, this._uiHash(this)), this.containers[t].containerCache.over && (this.containers[t]._trigger("out", null, this._uiHash(this)), this.containers[t].containerCache.over = 0) } return this.placeholder && (this.placeholder[0].parentNode && this.placeholder[0].parentNode.removeChild(this.placeholder[0]), "original" !== this.options.helper && this.helper && this.helper[0].parentNode && this.helper.remove(), e.extend(this, { helper: null, dragging: !1, reverting: !1, _noFinalSort: null }), this.domPosition.prev ? e(this.domPosition.prev).after(this.currentItem) : e(this.domPosition.parent).prepend(this.currentItem)), this },
            serialize: function(t) {
                var i = this._getItemsAsjQuery(t && t.connected),
                    s = [];
                return t = t || {}, e(i).each(function() {
                    var i = (e(t.item || this).attr(t.attribute || "id") || "").match(t.expression || /(.+)[\-=_](.+)/);
                    i && s.push((t.key || i[1] + "[]") + "=" + (t.key && t.expression ? i[1] : i[2]))
                }), !s.length && t.key && s.push(t.key + "="), s.join("&")
            },
            toArray: function(t) {
                var i = this._getItemsAsjQuery(t && t.connected),
                    s = [];
                return t = t || {}, i.each(function() { s.push(e(t.item || this).attr(t.attribute || "id") || "") }), s
            },
            _intersectsWith: function(e) {
                var t = this.positionAbs.left,
                    i = t + this.helperProportions.width,
                    s = this.positionAbs.top,
                    n = s + this.helperProportions.height,
                    o = e.left,
                    r = o + e.width,
                    a = e.top,
                    l = a + e.height,
                    h = this.offset.click.top,
                    c = this.offset.click.left,
                    u = "x" === this.options.axis || s + h > a && l > s + h,
                    d = "y" === this.options.axis || t + c > o && r > t + c,
                    p = u && d;
                return "pointer" === this.options.tolerance || this.options.forcePointerForContainers || "pointer" !== this.options.tolerance && this.helperProportions[this.floating ? "width" : "height"] > e[this.floating ? "width" : "height"] ? p : t + this.helperProportions.width / 2 > o && r > i - this.helperProportions.width / 2 && s + this.helperProportions.height / 2 > a && l > n - this.helperProportions.height / 2
            },
            _intersectsWithPointer: function(e) {
                var t = "x" === this.options.axis || this._isOverAxis(this.positionAbs.top + this.offset.click.top, e.top, e.height),
                    i = "y" === this.options.axis || this._isOverAxis(this.positionAbs.left + this.offset.click.left, e.left, e.width),
                    s = t && i,
                    n = this._getDragVerticalDirection(),
                    o = this._getDragHorizontalDirection();
                return s ? this.floating ? o && "right" === o || "down" === n ? 2 : 1 : n && ("down" === n ? 2 : 1) : !1
            },
            _intersectsWithSides: function(e) {
                var t = this._isOverAxis(this.positionAbs.top + this.offset.click.top, e.top + e.height / 2, e.height),
                    i = this._isOverAxis(this.positionAbs.left + this.offset.click.left, e.left + e.width / 2, e.width),
                    s = this._getDragVerticalDirection(),
                    n = this._getDragHorizontalDirection();
                return this.floating && n ? "right" === n && i || "left" === n && !i : s && ("down" === s && t || "up" === s && !t)
            },
            _getDragVerticalDirection: function() { var e = this.positionAbs.top - this.lastPositionAbs.top; return 0 !== e && (e > 0 ? "down" : "up") },
            _getDragHorizontalDirection: function() { var e = this.positionAbs.left - this.lastPositionAbs.left; return 0 !== e && (e > 0 ? "right" : "left") },
            refresh: function(e) { return this._refreshItems(e), this._setHandleClassName(), this.refreshPositions(), this },
            _connectWith: function() { var e = this.options; return e.connectWith.constructor === String ? [e.connectWith] : e.connectWith },
            _getItemsAsjQuery: function(t) {
                function i() { a.push(this) }
                var s, n, o, r, a = [],
                    l = [],
                    h = this._connectWith();
                if (h && t)
                    for (s = h.length - 1; s >= 0; s--)
                        for (o = e(h[s], this.document[0]), n = o.length - 1; n >= 0; n--) r = e.data(o[n], this.widgetFullName), r && r !== this && !r.options.disabled && l.push([e.isFunction(r.options.items) ? r.options.items.call(r.element) : e(r.options.items, r.element).not(".ui-sortable-helper").not(".ui-sortable-placeholder"), r]);
                for (l.push([e.isFunction(this.options.items) ? this.options.items.call(this.element, null, { options: this.options, item: this.currentItem }) : e(this.options.items, this.element).not(".ui-sortable-helper").not(".ui-sortable-placeholder"), this]), s = l.length - 1; s >= 0; s--) l[s][0].each(i);
                return e(a)
            },
            _removeCurrentsFromItems: function() {
                var t = this.currentItem.find(":data(" + this.widgetName + "-item)");
                this.items = e.grep(this.items, function(e) {
                    for (var i = 0; t.length > i; i++)
                        if (t[i] === e.item[0]) return !1;
                    return !0
                })
            },
            _refreshItems: function(t) {
                this.items = [], this.containers = [this];
                var i, s, n, o, r, a, l, h, c = this.items,
                    u = [
                        [e.isFunction(this.options.items) ? this.options.items.call(this.element[0], t, { item: this.currentItem }) : e(this.options.items, this.element), this]
                    ],
                    d = this._connectWith();
                if (d && this.ready)
                    for (i = d.length - 1; i >= 0; i--)
                        for (n = e(d[i], this.document[0]), s = n.length - 1; s >= 0; s--) o = e.data(n[s], this.widgetFullName), o && o !== this && !o.options.disabled && (u.push([e.isFunction(o.options.items) ? o.options.items.call(o.element[0], t, { item: this.currentItem }) : e(o.options.items, o.element), o]), this.containers.push(o));
                for (i = u.length - 1; i >= 0; i--)
                    for (r = u[i][1], a = u[i][0], s = 0, h = a.length; h > s; s++) l = e(a[s]), l.data(this.widgetName + "-item", r), c.push({ item: l, instance: r, width: 0, height: 0, left: 0, top: 0 })
            },
            refreshPositions: function(t) {
                this.floating = this.items.length ? "x" === this.options.axis || this._isFloating(this.items[0].item) : !1, this.offsetParent && this.helper && (this.offset.parent = this._getParentOffset());
                var i, s, n, o;
                for (i = this.items.length - 1; i >= 0; i--) s = this.items[i], s.instance !== this.currentContainer && this.currentContainer && s.item[0] !== this.currentItem[0] || (n = this.options.toleranceElement ? e(this.options.toleranceElement, s.item) : s.item, t || (s.width = n.outerWidth(), s.height = n.outerHeight()), o = n.offset(), s.left = o.left, s.top = o.top);
                if (this.options.custom && this.options.custom.refreshContainers) this.options.custom.refreshContainers.call(this);
                else
                    for (i = this.containers.length - 1; i >= 0; i--) o = this.containers[i].element.offset(), this.containers[i].containerCache.left = o.left, this.containers[i].containerCache.top = o.top, this.containers[i].containerCache.width = this.containers[i].element.outerWidth(), this.containers[i].containerCache.height = this.containers[i].element.outerHeight();
                return this
            },
            _createPlaceholder: function(t) {
                t = t || this;
                var i, s = t.options;
                s.placeholder && s.placeholder.constructor !== String || (i = s.placeholder, s.placeholder = {
                    element: function() {
                        var s = t.currentItem[0].nodeName.toLowerCase(),
                            n = e("<" + s + ">", t.document[0]).addClass(i || t.currentItem[0].className + " ui-sortable-placeholder").removeClass("ui-sortable-helper");
                        return "tbody" === s ? t._createTrPlaceholder(t.currentItem.find("tr").eq(0), e("<tr>", t.document[0]).appendTo(n)) : "tr" === s ? t._createTrPlaceholder(t.currentItem, n) : "img" === s && n.attr("src", t.currentItem.attr("src")), i || n.css("visibility", "hidden"), n
                    },
                    update: function(e, n) {
                        (!i || s.forcePlaceholderSize) && (n.height() || n.height(t.currentItem.innerHeight() - parseInt(t.currentItem.css("paddingTop") || 0, 10) - parseInt(t.currentItem.css("paddingBottom") || 0, 10)), n.width() || n.width(t.currentItem.innerWidth() - parseInt(t.currentItem.css("paddingLeft") || 0, 10) - parseInt(t.currentItem.css("paddingRight") || 0, 10)))
                    }
                }), t.placeholder = e(s.placeholder.element.call(t.element, t.currentItem)), t.currentItem.after(t.placeholder), s.placeholder.update(t, t.placeholder)
            },
            _createTrPlaceholder: function(t, i) {
                var s = this;
                t.children().each(function() { e("<td>&#160;</td>", s.document[0]).attr("colspan", e(this).attr("colspan") || 1).appendTo(i) })
            },
            _contactContainers: function(t) {
                var i, s, n, o, r, a, l, h, c, u, d = null,
                    p = null;
                for (i = this.containers.length - 1; i >= 0; i--)
                    if (!e.contains(this.currentItem[0], this.containers[i].element[0]))
                        if (this._intersectsWith(this.containers[i].containerCache)) {
                            if (d && e.contains(this.containers[i].element[0], d.element[0])) continue;
                            d = this.containers[i], p = i
                        } else this.containers[i].containerCache.over && (this.containers[i]._trigger("out", t, this._uiHash(this)), this.containers[i].containerCache.over = 0);
                if (d)
                    if (1 === this.containers.length) this.containers[p].containerCache.over || (this.containers[p]._trigger("over", t, this._uiHash(this)), this.containers[p].containerCache.over = 1);
                    else {
                        for (n = 1e4, o = null, c = d.floating || this._isFloating(this.currentItem), r = c ? "left" : "top", a = c ? "width" : "height", u = c ? "clientX" : "clientY", s = this.items.length - 1; s >= 0; s--) e.contains(this.containers[p].element[0], this.items[s].item[0]) && this.items[s].item[0] !== this.currentItem[0] && (l = this.items[s].item.offset()[r], h = !1, t[u] - l > this.items[s][a] / 2 && (h = !0), n > Math.abs(t[u] - l) && (n = Math.abs(t[u] - l), o = this.items[s], this.direction = h ? "up" : "down"));
                        if (!o && !this.options.dropOnEmpty) return;
                        if (this.currentContainer === this.containers[p]) return void(this.currentContainer.containerCache.over || (this.containers[p]._trigger("over", t, this._uiHash()), this.currentContainer.containerCache.over = 1));
                        o ? this._rearrange(t, o, null, !0) : this._rearrange(t, null, this.containers[p].element, !0), this._trigger("change", t, this._uiHash()), this.containers[p]._trigger("change", t, this._uiHash(this)), this.currentContainer = this.containers[p], this.options.placeholder.update(this.currentContainer, this.placeholder), this.containers[p]._trigger("over", t, this._uiHash(this)), this.containers[p].containerCache.over = 1
                    }
            },
            _createHelper: function(t) {
                var i = this.options,
                    s = e.isFunction(i.helper) ? e(i.helper.apply(this.element[0], [t, this.currentItem])) : "clone" === i.helper ? this.currentItem.clone() : this.currentItem;
                return s.parents("body").length || e("parent" !== i.appendTo ? i.appendTo : this.currentItem[0].parentNode)[0].appendChild(s[0]), s[0] === this.currentItem[0] && (this._storedCSS = { width: this.currentItem[0].style.width, height: this.currentItem[0].style.height, position: this.currentItem.css("position"), top: this.currentItem.css("top"), left: this.currentItem.css("left") }), (!s[0].style.width || i.forceHelperSize) && s.width(this.currentItem.width()), (!s[0].style.height || i.forceHelperSize) && s.height(this.currentItem.height()), s
            },
            _adjustOffsetFromHelper: function(t) { "string" == typeof t && (t = t.split(" ")), e.isArray(t) && (t = { left: +t[0], top: +t[1] || 0 }), "left" in t && (this.offset.click.left = t.left + this.margins.left), "right" in t && (this.offset.click.left = this.helperProportions.width - t.right + this.margins.left), "top" in t && (this.offset.click.top = t.top + this.margins.top), "bottom" in t && (this.offset.click.top = this.helperProportions.height - t.bottom + this.margins.top) },
            _getParentOffset: function() { this.offsetParent = this.helper.offsetParent(); var t = this.offsetParent.offset(); return "absolute" === this.cssPosition && this.scrollParent[0] !== this.document[0] && e.contains(this.scrollParent[0], this.offsetParent[0]) && (t.left += this.scrollParent.scrollLeft(), t.top += this.scrollParent.scrollTop()), (this.offsetParent[0] === this.document[0].body || this.offsetParent[0].tagName && "html" === this.offsetParent[0].tagName.toLowerCase() && e.ui.ie) && (t = { top: 0, left: 0 }), { top: t.top + (parseInt(this.offsetParent.css("borderTopWidth"), 10) || 0), left: t.left + (parseInt(this.offsetParent.css("borderLeftWidth"), 10) || 0) } },
            _getRelativeOffset: function() { if ("relative" === this.cssPosition) { var e = this.currentItem.position(); return { top: e.top - (parseInt(this.helper.css("top"), 10) || 0) + this.scrollParent.scrollTop(), left: e.left - (parseInt(this.helper.css("left"), 10) || 0) + this.scrollParent.scrollLeft() } } return { top: 0, left: 0 } },
            _cacheMargins: function() { this.margins = { left: parseInt(this.currentItem.css("marginLeft"), 10) || 0, top: parseInt(this.currentItem.css("marginTop"), 10) || 0 } },
            _cacheHelperProportions: function() { this.helperProportions = { width: this.helper.outerWidth(), height: this.helper.outerHeight() } },
            _setContainment: function() { var t, i, s, n = this.options; "parent" === n.containment && (n.containment = this.helper[0].parentNode), ("document" === n.containment || "window" === n.containment) && (this.containment = [0 - this.offset.relative.left - this.offset.parent.left, 0 - this.offset.relative.top - this.offset.parent.top, "document" === n.containment ? this.document.width() : this.window.width() - this.helperProportions.width - this.margins.left, ("document" === n.containment ? this.document.width() : this.window.height() || this.document[0].body.parentNode.scrollHeight) - this.helperProportions.height - this.margins.top]), /^(document|window|parent)$/.test(n.containment) || (t = e(n.containment)[0], i = e(n.containment).offset(), s = "hidden" !== e(t).css("overflow"), this.containment = [i.left + (parseInt(e(t).css("borderLeftWidth"), 10) || 0) + (parseInt(e(t).css("paddingLeft"), 10) || 0) - this.margins.left, i.top + (parseInt(e(t).css("borderTopWidth"), 10) || 0) + (parseInt(e(t).css("paddingTop"), 10) || 0) - this.margins.top, i.left + (s ? Math.max(t.scrollWidth, t.offsetWidth) : t.offsetWidth) - (parseInt(e(t).css("borderLeftWidth"), 10) || 0) - (parseInt(e(t).css("paddingRight"), 10) || 0) - this.helperProportions.width - this.margins.left, i.top + (s ? Math.max(t.scrollHeight, t.offsetHeight) : t.offsetHeight) - (parseInt(e(t).css("borderTopWidth"), 10) || 0) - (parseInt(e(t).css("paddingBottom"), 10) || 0) - this.helperProportions.height - this.margins.top]) },
            _convertPositionTo: function(t, i) {
                i || (i = this.position);
                var s = "absolute" === t ? 1 : -1,
                    n = "absolute" !== this.cssPosition || this.scrollParent[0] !== this.document[0] && e.contains(this.scrollParent[0], this.offsetParent[0]) ? this.scrollParent : this.offsetParent,
                    o = /(html|body)/i.test(n[0].tagName);
                return { top: i.top + this.offset.relative.top * s + this.offset.parent.top * s - ("fixed" === this.cssPosition ? -this.scrollParent.scrollTop() : o ? 0 : n.scrollTop()) * s, left: i.left + this.offset.relative.left * s + this.offset.parent.left * s - ("fixed" === this.cssPosition ? -this.scrollParent.scrollLeft() : o ? 0 : n.scrollLeft()) * s }
            },
            _generatePosition: function(t) {
                var i, s, n = this.options,
                    o = t.pageX,
                    r = t.pageY,
                    a = "absolute" !== this.cssPosition || this.scrollParent[0] !== this.document[0] && e.contains(this.scrollParent[0], this.offsetParent[0]) ? this.scrollParent : this.offsetParent,
                    l = /(html|body)/i.test(a[0].tagName);
                return "relative" !== this.cssPosition || this.scrollParent[0] !== this.document[0] && this.scrollParent[0] !== this.offsetParent[0] || (this.offset.relative = this._getRelativeOffset()), this.originalPosition && (this.containment && (t.pageX - this.offset.click.left < this.containment[0] && (o = this.containment[0] + this.offset.click.left), t.pageY - this.offset.click.top < this.containment[1] && (r = this.containment[1] + this.offset.click.top), t.pageX - this.offset.click.left > this.containment[2] && (o = this.containment[2] + this.offset.click.left), t.pageY - this.offset.click.top > this.containment[3] && (r = this.containment[3] + this.offset.click.top)), n.grid && (i = this.originalPageY + Math.round((r - this.originalPageY) / n.grid[1]) * n.grid[1], r = this.containment ? i - this.offset.click.top >= this.containment[1] && i - this.offset.click.top <= this.containment[3] ? i : i - this.offset.click.top >= this.containment[1] ? i - n.grid[1] : i + n.grid[1] : i, s = this.originalPageX + Math.round((o - this.originalPageX) / n.grid[0]) * n.grid[0], o = this.containment ? s - this.offset.click.left >= this.containment[0] && s - this.offset.click.left <= this.containment[2] ? s : s - this.offset.click.left >= this.containment[0] ? s - n.grid[0] : s + n.grid[0] : s)), { top: r - this.offset.click.top - this.offset.relative.top - this.offset.parent.top + ("fixed" === this.cssPosition ? -this.scrollParent.scrollTop() : l ? 0 : a.scrollTop()), left: o - this.offset.click.left - this.offset.relative.left - this.offset.parent.left + ("fixed" === this.cssPosition ? -this.scrollParent.scrollLeft() : l ? 0 : a.scrollLeft()) }
            },
            _rearrange: function(e, t, i, s) {
                i ? i[0].appendChild(this.placeholder[0]) : t.item[0].parentNode.insertBefore(this.placeholder[0], "down" === this.direction ? t.item[0] : t.item[0].nextSibling), this.counter = this.counter ? ++this.counter : 1;
                var n = this.counter;
                this._delay(function() { n === this.counter && this.refreshPositions(!s) })
            },
            _clear: function(e, t) {
                function i(e, t, i) { return function(s) { i._trigger(e, s, t._uiHash(t)) } }
                this.reverting = !1;
                var s, n = [];
                if (!this._noFinalSort && this.currentItem.parent().length && this.placeholder.before(this.currentItem), this._noFinalSort = null, this.helper[0] === this.currentItem[0]) {
                    for (s in this._storedCSS)("auto" === this._storedCSS[s] || "static" === this._storedCSS[s]) && (this._storedCSS[s] = "");
                    this.currentItem.css(this._storedCSS).removeClass("ui-sortable-helper")
                } else this.currentItem.show();
                for (this.fromOutside && !t && n.push(function(e) { this._trigger("receive", e, this._uiHash(this.fromOutside)) }), !this.fromOutside && this.domPosition.prev === this.currentItem.prev().not(".ui-sortable-helper")[0] && this.domPosition.parent === this.currentItem.parent()[0] || t || n.push(function(e) { this._trigger("update", e, this._uiHash()) }), this !== this.currentContainer && (t || (n.push(function(e) { this._trigger("remove", e, this._uiHash()) }), n.push(function(e) { return function(t) { e._trigger("receive", t, this._uiHash(this)) } }.call(this, this.currentContainer)), n.push(function(e) { return function(t) { e._trigger("update", t, this._uiHash(this)) } }.call(this, this.currentContainer)))), s = this.containers.length - 1; s >= 0; s--) t || n.push(i("deactivate", this, this.containers[s])), this.containers[s].containerCache.over && (n.push(i("out", this, this.containers[s])), this.containers[s].containerCache.over = 0);
                if (this.storedCursor && (this.document.find("body").css("cursor", this.storedCursor), this.storedStylesheet.remove()), this._storedOpacity && this.helper.css("opacity", this._storedOpacity), this._storedZIndex && this.helper.css("zIndex", "auto" === this._storedZIndex ? "" : this._storedZIndex), this.dragging = !1, t || this._trigger("beforeStop", e, this._uiHash()), this.placeholder[0].parentNode.removeChild(this.placeholder[0]), this.cancelHelperRemoval || (this.helper[0] !== this.currentItem[0] && this.helper.remove(), this.helper = null), !t) {
                    for (s = 0; n.length > s; s++) n[s].call(this, e);
                    this._trigger("stop", e, this._uiHash())
                }
                return this.fromOutside = !1, !this.cancelHelperRemoval
            },
            _trigger: function() { e.Widget.prototype._trigger.apply(this, arguments) === !1 && this.cancel() },
            _uiHash: function(t) { var i = t || this; return { helper: i.helper, placeholder: i.placeholder || e([]), position: i.position, originalPosition: i.originalPosition, offset: i.positionAbs, item: i.currentItem, sender: t ? t.element : null } }
        }), e.widget("ui.accordion", {
            version: "1.11.4",
            options: { active: 0, animate: {}, collapsible: !1, event: "click", header: "> li > :first-child,> :not(li):even", heightStyle: "auto", icons: { activeHeader: "ui-icon-triangle-1-s", header: "ui-icon-triangle-1-e" }, activate: null, beforeActivate: null },
            hideProps: { borderTopWidth: "hide", borderBottomWidth: "hide", paddingTop: "hide", paddingBottom: "hide", height: "hide" },
            showProps: { borderTopWidth: "show", borderBottomWidth: "show", paddingTop: "show", paddingBottom: "show", height: "show" },
            _create: function() {
                var t = this.options;
                this.prevShow = this.prevHide = e(), this.element.addClass("ui-accordion ui-widget ui-helper-reset").attr("role", "tablist"), t.collapsible || t.active !== !1 && null != t.active || (t.active = 0), this._processPanels(), 0 > t.active && (t.active += this.headers.length), this._refresh()
            },
            _getCreateEventData: function() { return { header: this.active, panel: this.active.length ? this.active.next() : e() } },
            _createIcons: function() {
                var t = this.options.icons;
                t && (e("<span>").addClass("ui-accordion-header-icon ui-icon " + t.header).prependTo(this.headers), this.active.children(".ui-accordion-header-icon").removeClass(t.header).addClass(t.activeHeader), this.headers.addClass("ui-accordion-icons"))
            },
            _destroyIcons: function() { this.headers.removeClass("ui-accordion-icons").children(".ui-accordion-header-icon").remove() },
            _destroy: function() {
                var e;
                this.element.removeClass("ui-accordion ui-widget ui-helper-reset").removeAttr("role"), this.headers.removeClass("ui-accordion-header ui-accordion-header-active ui-state-default ui-corner-all ui-state-active ui-state-disabled ui-corner-top").removeAttr("role").removeAttr("aria-expanded").removeAttr("aria-selected").removeAttr("aria-controls").removeAttr("tabIndex").removeUniqueId(), this._destroyIcons(), e = this.headers.next().removeClass("ui-helper-reset ui-widget-content ui-corner-bottom ui-accordion-content ui-accordion-content-active ui-state-disabled").css("display", "").removeAttr("role").removeAttr("aria-hidden").removeAttr("aria-labelledby").removeUniqueId(), "content" !== this.options.heightStyle && e.css("height", "")
            },
            _setOption: function(e, t) { return "active" === e ? void this._activate(t) : ("event" === e && (this.options.event && this._off(this.headers, this.options.event), this._setupEvents(t)), this._super(e, t), "collapsible" !== e || t || this.options.active !== !1 || this._activate(0), "icons" === e && (this._destroyIcons(), t && this._createIcons()), void("disabled" === e && (this.element.toggleClass("ui-state-disabled", !!t).attr("aria-disabled", t), this.headers.add(this.headers.next()).toggleClass("ui-state-disabled", !!t)))) },
            _keydown: function(t) {
                if (!t.altKey && !t.ctrlKey) {
                    var i = e.ui.keyCode,
                        s = this.headers.length,
                        n = this.headers.index(t.target),
                        o = !1;
                    switch (t.keyCode) {
                        case i.RIGHT:
                        case i.DOWN:
                            o = this.headers[(n + 1) % s];
                            break;
                        case i.LEFT:
                        case i.UP:
                            o = this.headers[(n - 1 + s) % s];
                            break;
                        case i.SPACE:
                        case i.ENTER:
                            this._eventHandler(t);
                            break;
                        case i.HOME:
                            o = this.headers[0];
                            break;
                        case i.END:
                            o = this.headers[s - 1]
                    }
                    o && (e(t.target).attr("tabIndex", -1), e(o).attr("tabIndex", 0), o.focus(), t.preventDefault())
                }
            },
            _panelKeyDown: function(t) { t.keyCode === e.ui.keyCode.UP && t.ctrlKey && e(t.currentTarget).prev().focus() },
            refresh: function() {
                var t = this.options;
                this._processPanels(), t.active === !1 && t.collapsible === !0 || !this.headers.length ? (t.active = !1, this.active = e()) : t.active === !1 ? this._activate(0) : this.active.length && !e.contains(this.element[0], this.active[0]) ? this.headers.length === this.headers.find(".ui-state-disabled").length ? (t.active = !1, this.active = e()) : this._activate(Math.max(0, t.active - 1)) : t.active = this.headers.index(this.active), this._destroyIcons(), this._refresh()
            },
            _processPanels: function() {
                var e = this.headers,
                    t = this.panels;
                this.headers = this.element.find(this.options.header).addClass("ui-accordion-header ui-state-default ui-corner-all"), this.panels = this.headers.next().addClass("ui-accordion-content ui-helper-reset ui-widget-content ui-corner-bottom").filter(":not(.ui-accordion-content-active)").hide(), t && (this._off(e.not(this.headers)), this._off(t.not(this.panels)))
            },
            _refresh: function() {
                var t, i = this.options,
                    s = i.heightStyle,
                    n = this.element.parent();
                this.active = this._findActive(i.active).addClass("ui-accordion-header-active ui-state-active ui-corner-top").removeClass("ui-corner-all"), this.active.next().addClass("ui-accordion-content-active").show(), this.headers.attr("role", "tab").each(function() {
                    var t = e(this),
                        i = t.uniqueId().attr("id"),
                        s = t.next(),
                        n = s.uniqueId().attr("id");
                    t.attr("aria-controls", n), s.attr("aria-labelledby", i)
                }).next().attr("role", "tabpanel"), this.headers.not(this.active).attr({ "aria-selected": "false", "aria-expanded": "false", tabIndex: -1 }).next().attr({ "aria-hidden": "true" }).hide(), this.active.length ? this.active.attr({ "aria-selected": "true", "aria-expanded": "true", tabIndex: 0 }).next().attr({ "aria-hidden": "false" }) : this.headers.eq(0).attr("tabIndex", 0), this._createIcons(), this._setupEvents(i.event), "fill" === s ? (t = n.height(), this.element.siblings(":visible").each(function() {
                    var i = e(this),
                        s = i.css("position");
                    "absolute" !== s && "fixed" !== s && (t -= i.outerHeight(!0))
                }), this.headers.each(function() { t -= e(this).outerHeight(!0) }), this.headers.next().each(function() { e(this).height(Math.max(0, t - e(this).innerHeight() + e(this).height())) }).css("overflow", "auto")) : "auto" === s && (t = 0, this.headers.next().each(function() { t = Math.max(t, e(this).css("height", "").height()) }).height(t))
            },
            _activate: function(t) {
                var i = this._findActive(t)[0];
                i !== this.active[0] && (i = i || this.active[0], this._eventHandler({ target: i, currentTarget: i, preventDefault: e.noop }))
            },
            _findActive: function(t) { return "number" == typeof t ? this.headers.eq(t) : e() },
            _setupEvents: function(t) {
                var i = { keydown: "_keydown" };
                t && e.each(t.split(" "), function(e, t) { i[t] = "_eventHandler" }), this._off(this.headers.add(this.headers.next())), this._on(this.headers, i), this._on(this.headers.next(), { keydown: "_panelKeyDown" }), this._hoverable(this.headers), this._focusable(this.headers)
            },
            _eventHandler: function(t) {
                var i = this.options,
                    s = this.active,
                    n = e(t.currentTarget),
                    o = n[0] === s[0],
                    r = o && i.collapsible,
                    a = r ? e() : n.next(),
                    l = s.next(),
                    h = { oldHeader: s, oldPanel: l, newHeader: r ? e() : n, newPanel: a };
                t.preventDefault(), o && !i.collapsible || this._trigger("beforeActivate", t, h) === !1 || (i.active = r ? !1 : this.headers.index(n), this.active = o ? e() : n, this._toggle(h), s.removeClass("ui-accordion-header-active ui-state-active"), i.icons && s.children(".ui-accordion-header-icon").removeClass(i.icons.activeHeader).addClass(i.icons.header), o || (n.removeClass("ui-corner-all").addClass("ui-accordion-header-active ui-state-active ui-corner-top"), i.icons && n.children(".ui-accordion-header-icon").removeClass(i.icons.header).addClass(i.icons.activeHeader), n.next().addClass("ui-accordion-content-active")))
            },
            _toggle: function(t) {
                var i = t.newPanel,
                    s = this.prevShow.length ? this.prevShow : t.oldPanel;
                this.prevShow.add(this.prevHide).stop(!0, !0), this.prevShow = i, this.prevHide = s, this.options.animate ? this._animate(i, s, t) : (s.hide(), i.show(), this._toggleComplete(t)), s.attr({ "aria-hidden": "true" }), s.prev().attr({ "aria-selected": "false", "aria-expanded": "false" }), i.length && s.length ? s.prev().attr({ tabIndex: -1, "aria-expanded": "false" }) : i.length && this.headers.filter(function() { return 0 === parseInt(e(this).attr("tabIndex"), 10) }).attr("tabIndex", -1), i.attr("aria-hidden", "false").prev().attr({ "aria-selected": "true", "aria-expanded": "true", tabIndex: 0 })
            },
            _animate: function(e, t, i) {
                var s, n, o, r = this,
                    a = 0,
                    l = e.css("box-sizing"),
                    h = e.length && (!t.length || e.index() < t.index()),
                    c = this.options.animate || {},
                    u = h && c.down || c,
                    d = function() { r._toggleComplete(i) };
                return "number" == typeof u && (o = u), "string" == typeof u && (n = u), n = n || u.easing || c.easing, o = o || u.duration || c.duration, t.length ? e.length ? (s = e.show().outerHeight(), t.animate(this.hideProps, { duration: o, easing: n, step: function(e, t) { t.now = Math.round(e) } }), void e.hide().animate(this.showProps, { duration: o, easing: n, complete: d, step: function(e, i) { i.now = Math.round(e), "height" !== i.prop ? "content-box" === l && (a += i.now) : "content" !== r.options.heightStyle && (i.now = Math.round(s - t.outerHeight() - a), a = 0) } })) : t.animate(this.hideProps, o, n, d) : e.animate(this.showProps, o, n, d)
            },
            _toggleComplete: function(e) {
                var t = e.oldPanel;
                t.removeClass("ui-accordion-content-active").prev().removeClass("ui-corner-top").addClass("ui-corner-all"), t.length && (t.parent()[0].className = t.parent()[0].className), this._trigger("activate", null, e)
            }
        }), e.widget("ui.menu", {
            version: "1.11.4",
            defaultElement: "<ul>",
            delay: 300,
            options: { icons: { submenu: "ui-icon-carat-1-e" }, items: "> *", menus: "ul", position: { my: "left-1 top", at: "right top" }, role: "menu", blur: null, focus: null, select: null },
            _create: function() {
                this.activeMenu = this.element, this.mouseHandled = !1, this.element.uniqueId().addClass("ui-menu ui-widget ui-widget-content").toggleClass("ui-menu-icons", !!this.element.find(".ui-icon").length).attr({ role: this.options.role, tabIndex: 0 }), this.options.disabled && this.element.addClass("ui-state-disabled").attr("aria-disabled", "true"), this._on({
                    "mousedown .ui-menu-item": function(e) { e.preventDefault() },
                    "click .ui-menu-item": function(t) { var i = e(t.target);!this.mouseHandled && i.not(".ui-state-disabled").length && (this.select(t), t.isPropagationStopped() || (this.mouseHandled = !0), i.has(".ui-menu").length ? this.expand(t) : !this.element.is(":focus") && e(this.document[0].activeElement).closest(".ui-menu").length && (this.element.trigger("focus", [!0]), this.active && 1 === this.active.parents(".ui-menu").length && clearTimeout(this.timer))) },
                    "mouseenter .ui-menu-item": function(t) {
                        if (!this.previousFilter) {
                            var i = e(t.currentTarget);
                            i.siblings(".ui-state-active").removeClass("ui-state-active"), this.focus(t, i)
                        }
                    },
                    mouseleave: "collapseAll",
                    "mouseleave .ui-menu": "collapseAll",
                    focus: function(e, t) {
                        var i = this.active || this.element.find(this.options.items).eq(0);
                        t || this.focus(e, i)
                    },
                    blur: function(t) { this._delay(function() { e.contains(this.element[0], this.document[0].activeElement) || this.collapseAll(t) }) },
                    keydown: "_keydown"
                }), this.refresh(), this._on(this.document, { click: function(e) { this._closeOnDocumentClick(e) && this.collapseAll(e), this.mouseHandled = !1 } })
            },
            _destroy: function() {
                this.element.removeAttr("aria-activedescendant").find(".ui-menu").addBack().removeClass("ui-menu ui-widget ui-widget-content ui-menu-icons ui-front").removeAttr("role").removeAttr("tabIndex").removeAttr("aria-labelledby").removeAttr("aria-expanded").removeAttr("aria-hidden").removeAttr("aria-disabled").removeUniqueId().show(), this.element.find(".ui-menu-item").removeClass("ui-menu-item").removeAttr("role").removeAttr("aria-disabled").removeUniqueId().removeClass("ui-state-hover").removeAttr("tabIndex").removeAttr("role").removeAttr("aria-haspopup").children().each(function() {
                    var t = e(this);
                    t.data("ui-menu-submenu-carat") && t.remove()
                }), this.element.find(".ui-menu-divider").removeClass("ui-menu-divider ui-widget-content")
            },
            _keydown: function(t) {
                var i, s, n, o, r = !0;
                switch (t.keyCode) {
                    case e.ui.keyCode.PAGE_UP:
                        this.previousPage(t);
                        break;
                    case e.ui.keyCode.PAGE_DOWN:
                        this.nextPage(t);
                        break;
                    case e.ui.keyCode.HOME:
                        this._move("first", "first", t);
                        break;
                    case e.ui.keyCode.END:
                        this._move("last", "last", t);
                        break;
                    case e.ui.keyCode.UP:
                        this.previous(t);
                        break;
                    case e.ui.keyCode.DOWN:
                        this.next(t);
                        break;
                    case e.ui.keyCode.LEFT:
                        this.collapse(t);
                        break;
                    case e.ui.keyCode.RIGHT:
                        this.active && !this.active.is(".ui-state-disabled") && this.expand(t);
                        break;
                    case e.ui.keyCode.ENTER:
                    case e.ui.keyCode.SPACE:
                        this._activate(t);
                        break;
                    case e.ui.keyCode.ESCAPE:
                        this.collapse(t);
                        break;
                    default:
                        r = !1, s = this.previousFilter || "", n = String.fromCharCode(t.keyCode), o = !1, clearTimeout(this.filterTimer), n === s ? o = !0 : n = s + n, i = this._filterMenuItems(n), i = o && -1 !== i.index(this.active.next()) ? this.active.nextAll(".ui-menu-item") : i, i.length || (n = String.fromCharCode(t.keyCode), i = this._filterMenuItems(n)), i.length ? (this.focus(t, i),
                            this.previousFilter = n, this.filterTimer = this._delay(function() { delete this.previousFilter }, 1e3)) : delete this.previousFilter
                }
                r && t.preventDefault()
            },
            _activate: function(e) { this.active.is(".ui-state-disabled") || (this.active.is("[aria-haspopup='true']") ? this.expand(e) : this.select(e)) },
            refresh: function() {
                var t, i, s = this,
                    n = this.options.icons.submenu,
                    o = this.element.find(this.options.menus);
                this.element.toggleClass("ui-menu-icons", !!this.element.find(".ui-icon").length), o.filter(":not(.ui-menu)").addClass("ui-menu ui-widget ui-widget-content ui-front").hide().attr({ role: this.options.role, "aria-hidden": "true", "aria-expanded": "false" }).each(function() {
                    var t = e(this),
                        i = t.parent(),
                        s = e("<span>").addClass("ui-menu-icon ui-icon " + n).data("ui-menu-submenu-carat", !0);
                    i.attr("aria-haspopup", "true").prepend(s), t.attr("aria-labelledby", i.attr("id"))
                }), t = o.add(this.element), i = t.find(this.options.items), i.not(".ui-menu-item").each(function() {
                    var t = e(this);
                    s._isDivider(t) && t.addClass("ui-widget-content ui-menu-divider")
                }), i.not(".ui-menu-item, .ui-menu-divider").addClass("ui-menu-item").uniqueId().attr({ tabIndex: -1, role: this._itemRole() }), i.filter(".ui-state-disabled").attr("aria-disabled", "true"), this.active && !e.contains(this.element[0], this.active[0]) && this.blur()
            },
            _itemRole: function() { return { menu: "menuitem", listbox: "option" }[this.options.role] },
            _setOption: function(e, t) { "icons" === e && this.element.find(".ui-menu-icon").removeClass(this.options.icons.submenu).addClass(t.submenu), "disabled" === e && this.element.toggleClass("ui-state-disabled", !!t).attr("aria-disabled", t), this._super(e, t) },
            focus: function(e, t) {
                var i, s;
                this.blur(e, e && "focus" === e.type), this._scrollIntoView(t), this.active = t.first(), s = this.active.addClass("ui-state-focus").removeClass("ui-state-active"), this.options.role && this.element.attr("aria-activedescendant", s.attr("id")), this.active.parent().closest(".ui-menu-item").addClass("ui-state-active"), e && "keydown" === e.type ? this._close() : this.timer = this._delay(function() { this._close() }, this.delay), i = t.children(".ui-menu"), i.length && e && /^mouse/.test(e.type) && this._startOpening(i), this.activeMenu = t.parent(), this._trigger("focus", e, { item: t })
            },
            _scrollIntoView: function(t) {
                var i, s, n, o, r, a;
                this._hasScroll() && (i = parseFloat(e.css(this.activeMenu[0], "borderTopWidth")) || 0, s = parseFloat(e.css(this.activeMenu[0], "paddingTop")) || 0, n = t.offset().top - this.activeMenu.offset().top - i - s, o = this.activeMenu.scrollTop(), r = this.activeMenu.height(), a = t.outerHeight(), 0 > n ? this.activeMenu.scrollTop(o + n) : n + a > r && this.activeMenu.scrollTop(o + n - r + a))
            },
            blur: function(e, t) { t || clearTimeout(this.timer), this.active && (this.active.removeClass("ui-state-focus"), this.active = null, this._trigger("blur", e, { item: this.active })) },
            _startOpening: function(e) { clearTimeout(this.timer), "true" === e.attr("aria-hidden") && (this.timer = this._delay(function() { this._close(), this._open(e) }, this.delay)) },
            _open: function(t) {
                var i = e.extend({ of: this.active }, this.options.position);
                clearTimeout(this.timer), this.element.find(".ui-menu").not(t.parents(".ui-menu")).hide().attr("aria-hidden", "true"), t.show().removeAttr("aria-hidden").attr("aria-expanded", "true").position(i)
            },
            collapseAll: function(t, i) {
                clearTimeout(this.timer), this.timer = this._delay(function() {
                    var s = i ? this.element : e(t && t.target).closest(this.element.find(".ui-menu"));
                    s.length || (s = this.element), this._close(s), this.blur(t), this.activeMenu = s
                }, this.delay)
            },
            _close: function(e) { e || (e = this.active ? this.active.parent() : this.element), e.find(".ui-menu").hide().attr("aria-hidden", "true").attr("aria-expanded", "false").end().find(".ui-state-active").not(".ui-state-focus").removeClass("ui-state-active") },
            _closeOnDocumentClick: function(t) { return !e(t.target).closest(".ui-menu").length },
            _isDivider: function(e) { return !/[^\-\u2014\u2013\s]/.test(e.text()) },
            collapse: function(e) {
                var t = this.active && this.active.parent().closest(".ui-menu-item", this.element);
                t && t.length && (this._close(), this.focus(e, t))
            },
            expand: function(e) {
                var t = this.active && this.active.children(".ui-menu ").find(this.options.items).first();
                t && t.length && (this._open(t.parent()), this._delay(function() { this.focus(e, t) }))
            },
            next: function(e) { this._move("next", "first", e) },
            previous: function(e) { this._move("prev", "last", e) },
            isFirstItem: function() { return this.active && !this.active.prevAll(".ui-menu-item").length },
            isLastItem: function() { return this.active && !this.active.nextAll(".ui-menu-item").length },
            _move: function(e, t, i) {
                var s;
                this.active && (s = "first" === e || "last" === e ? this.active["first" === e ? "prevAll" : "nextAll"](".ui-menu-item").eq(-1) : this.active[e + "All"](".ui-menu-item").eq(0)), s && s.length && this.active || (s = this.activeMenu.find(this.options.items)[t]()), this.focus(i, s)
            },
            nextPage: function(t) { var i, s, n; return this.active ? void(this.isLastItem() || (this._hasScroll() ? (s = this.active.offset().top, n = this.element.height(), this.active.nextAll(".ui-menu-item").each(function() { return i = e(this), 0 > i.offset().top - s - n }), this.focus(t, i)) : this.focus(t, this.activeMenu.find(this.options.items)[this.active ? "last" : "first"]()))) : void this.next(t) },
            previousPage: function(t) { var i, s, n; return this.active ? void(this.isFirstItem() || (this._hasScroll() ? (s = this.active.offset().top, n = this.element.height(), this.active.prevAll(".ui-menu-item").each(function() { return i = e(this), i.offset().top - s + n > 0 }), this.focus(t, i)) : this.focus(t, this.activeMenu.find(this.options.items).first()))) : void this.next(t) },
            _hasScroll: function() { return this.element.outerHeight() < this.element.prop("scrollHeight") },
            select: function(t) {
                this.active = this.active || e(t.target).closest(".ui-menu-item");
                var i = { item: this.active };
                this.active.has(".ui-menu").length || this.collapseAll(t, !0), this._trigger("select", t, i)
            },
            _filterMenuItems: function(t) {
                var i = t.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, "\\$&"),
                    s = RegExp("^" + i, "i");
                return this.activeMenu.find(this.options.items).filter(".ui-menu-item").filter(function() { return s.test(e.trim(e(this).text())) })
            }
        }), e.widget("ui.autocomplete", {
            version: "1.11.4",
            defaultElement: "<input>",
            options: { appendTo: null, autoFocus: !1, delay: 300, minLength: 1, position: { my: "left top", at: "left bottom", collision: "none" }, source: null, change: null, close: null, focus: null, open: null, response: null, search: null, select: null },
            requestIndex: 0,
            pending: 0,
            _create: function() {
                var t, i, s, n = this.element[0].nodeName.toLowerCase(),
                    o = "textarea" === n,
                    r = "input" === n;
                this.isMultiLine = o ? !0 : r ? !1 : this.element.prop("isContentEditable"), this.valueMethod = this.element[o || r ? "val" : "text"], this.isNewMenu = !0, this.element.addClass("ui-autocomplete-input").attr("autocomplete", "off"), this._on(this.element, {
                    keydown: function(n) {
                        if (this.element.prop("readOnly")) return t = !0, s = !0, void(i = !0);
                        t = !1, s = !1, i = !1;
                        var o = e.ui.keyCode;
                        switch (n.keyCode) {
                            case o.PAGE_UP:
                                t = !0, this._move("previousPage", n);
                                break;
                            case o.PAGE_DOWN:
                                t = !0, this._move("nextPage", n);
                                break;
                            case o.UP:
                                t = !0, this._keyEvent("previous", n);
                                break;
                            case o.DOWN:
                                t = !0, this._keyEvent("next", n);
                                break;
                            case o.ENTER:
                                this.menu.active && (t = !0, n.preventDefault(), this.menu.select(n));
                                break;
                            case o.TAB:
                                this.menu.active && this.menu.select(n);
                                break;
                            case o.ESCAPE:
                                this.menu.element.is(":visible") && (this.isMultiLine || this._value(this.term), this.close(n), n.preventDefault());
                                break;
                            default:
                                i = !0, this._searchTimeout(n)
                        }
                    },
                    keypress: function(s) {
                        if (t) return t = !1, void((!this.isMultiLine || this.menu.element.is(":visible")) && s.preventDefault());
                        if (!i) {
                            var n = e.ui.keyCode;
                            switch (s.keyCode) {
                                case n.PAGE_UP:
                                    this._move("previousPage", s);
                                    break;
                                case n.PAGE_DOWN:
                                    this._move("nextPage", s);
                                    break;
                                case n.UP:
                                    this._keyEvent("previous", s);
                                    break;
                                case n.DOWN:
                                    this._keyEvent("next", s)
                            }
                        }
                    },
                    input: function(e) { return s ? (s = !1, void e.preventDefault()) : void this._searchTimeout(e) },
                    focus: function() { this.selectedItem = null, this.previous = this._value() },
                    blur: function(e) { return this.cancelBlur ? void delete this.cancelBlur : (clearTimeout(this.searching), this.close(e), void this._change(e)) }
                }), this._initSource(), this.menu = e("<ul>").addClass("ui-autocomplete ui-front").appendTo(this._appendTo()).menu({ role: null }).hide().menu("instance"), this._on(this.menu.element, {
                    mousedown: function(t) {
                        t.preventDefault(), this.cancelBlur = !0, this._delay(function() { delete this.cancelBlur });
                        var i = this.menu.element[0];
                        e(t.target).closest(".ui-menu-item").length || this._delay(function() {
                            var t = this;
                            this.document.one("mousedown", function(s) { s.target === t.element[0] || s.target === i || e.contains(i, s.target) || t.close() })
                        })
                    },
                    menufocus: function(t, i) { var s, n; return this.isNewMenu && (this.isNewMenu = !1, t.originalEvent && /^mouse/.test(t.originalEvent.type)) ? (this.menu.blur(), void this.document.one("mousemove", function() { e(t.target).trigger(t.originalEvent) })) : (n = i.item.data("ui-autocomplete-item"), !1 !== this._trigger("focus", t, { item: n }) && t.originalEvent && /^key/.test(t.originalEvent.type) && this._value(n.value), s = i.item.attr("aria-label") || n.value, void(s && e.trim(s).length && (this.liveRegion.children().hide(), e("<div>").text(s).appendTo(this.liveRegion)))) },
                    menuselect: function(e, t) {
                        var i = t.item.data("ui-autocomplete-item"),
                            s = this.previous;
                        this.element[0] !== this.document[0].activeElement && (this.element.focus(), this.previous = s, this._delay(function() { this.previous = s, this.selectedItem = i })), !1 !== this._trigger("select", e, { item: i }) && this._value(i.value), this.term = this._value(), this.close(e), this.selectedItem = i
                    }
                }), this.liveRegion = e("<span>", { role: "status", "aria-live": "assertive", "aria-relevant": "additions" }).addClass("ui-helper-hidden-accessible").appendTo(this.document[0].body), this._on(this.window, { beforeunload: function() { this.element.removeAttr("autocomplete") } })
            },
            _destroy: function() { clearTimeout(this.searching), this.element.removeClass("ui-autocomplete-input").removeAttr("autocomplete"), this.menu.element.remove(), this.liveRegion.remove() },
            _setOption: function(e, t) { this._super(e, t), "source" === e && this._initSource(), "appendTo" === e && this.menu.element.appendTo(this._appendTo()), "disabled" === e && t && this.xhr && this.xhr.abort() },
            _appendTo: function() { var t = this.options.appendTo; return t && (t = t.jquery || t.nodeType ? e(t) : this.document.find(t).eq(0)), t && t[0] || (t = this.element.closest(".ui-front")), t.length || (t = this.document[0].body), t },
            _initSource: function() {
                var t, i, s = this;
                e.isArray(this.options.source) ? (t = this.options.source, this.source = function(i, s) { s(e.ui.autocomplete.filter(t, i.term)) }) : "string" == typeof this.options.source ? (i = this.options.source, this.source = function(t, n) { s.xhr && s.xhr.abort(), s.xhr = e.ajax({ url: i, data: t, dataType: "json", success: function(e) { n(e) }, error: function() { n([]) } }) }) : this.source = this.options.source
            },
            _searchTimeout: function(e) {
                clearTimeout(this.searching), this.searching = this._delay(function() {
                    var t = this.term === this._value(),
                        i = this.menu.element.is(":visible"),
                        s = e.altKey || e.ctrlKey || e.metaKey || e.shiftKey;
                    (!t || t && !i && !s) && (this.selectedItem = null, this.search(null, e))
                }, this.options.delay)
            },
            search: function(e, t) { return e = null != e ? e : this._value(), this.term = this._value(), e.length < this.options.minLength ? this.close(t) : this._trigger("search", t) !== !1 ? this._search(e) : void 0 },
            _search: function(e) { this.pending++, this.element.addClass("ui-autocomplete-loading"), this.cancelSearch = !1, this.source({ term: e }, this._response()) },
            _response: function() { var t = ++this.requestIndex; return e.proxy(function(e) { t === this.requestIndex && this.__response(e), this.pending--, this.pending || this.element.removeClass("ui-autocomplete-loading") }, this) },
            __response: function(e) { e && (e = this._normalize(e)), this._trigger("response", null, { content: e }), !this.options.disabled && e && e.length && !this.cancelSearch ? (this._suggest(e), this._trigger("open")) : this._close() },
            close: function(e) { this.cancelSearch = !0, this._close(e) },
            _close: function(e) { this.menu.element.is(":visible") && (this.menu.element.hide(), this.menu.blur(), this.isNewMenu = !0, this._trigger("close", e)) },
            _change: function(e) { this.previous !== this._value() && this._trigger("change", e, { item: this.selectedItem }) },
            _normalize: function(t) { return t.length && t[0].label && t[0].value ? t : e.map(t, function(t) { return "string" == typeof t ? { label: t, value: t } : e.extend({}, t, { label: t.label || t.value, value: t.value || t.label }) }) },
            _suggest: function(t) {
                var i = this.menu.element.empty();
                this._renderMenu(i, t), this.isNewMenu = !0, this.menu.refresh(), i.show(), this._resizeMenu(), i.position(e.extend({ of: this.element }, this.options.position)), this.options.autoFocus && this.menu.next()
            },
            _resizeMenu: function() {
                var e = this.menu.element;
                e.outerWidth(Math.max(e.width("").outerWidth() + 1, this.element.outerWidth()))
            },
            _renderMenu: function(t, i) {
                var s = this;
                e.each(i, function(e, i) { s._renderItemData(t, i) })
            },
            _renderItemData: function(e, t) { return this._renderItem(e, t).data("ui-autocomplete-item", t) },
            _renderItem: function(t, i) { return e("<li>").text(i.label).appendTo(t) },
            _move: function(e, t) { return this.menu.element.is(":visible") ? this.menu.isFirstItem() && /^previous/.test(e) || this.menu.isLastItem() && /^next/.test(e) ? (this.isMultiLine || this._value(this.term), void this.menu.blur()) : void this.menu[e](t) : void this.search(null, t) },
            widget: function() { return this.menu.element },
            _value: function() { return this.valueMethod.apply(this.element, arguments) },
            _keyEvent: function(e, t) {
                (!this.isMultiLine || this.menu.element.is(":visible")) && (this._move(e, t), t.preventDefault())
            }
        }), e.extend(e.ui.autocomplete, { escapeRegex: function(e) { return e.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, "\\$&") }, filter: function(t, i) { var s = RegExp(e.ui.autocomplete.escapeRegex(i), "i"); return e.grep(t, function(e) { return s.test(e.label || e.value || e) }) } }), e.widget("ui.autocomplete", e.ui.autocomplete, {
            options: { messages: { noResults: "No search results.", results: function(e) { return e + (e > 1 ? " results are" : " result is") + " available, use up and down arrow keys to navigate." } } },
            __response: function(t) {
                var i;
                this._superApply(arguments), this.options.disabled || this.cancelSearch || (i = t && t.length ? this.options.messages.results(t.length) : this.options.messages.noResults, this.liveRegion.children().hide(), e("<div>").text(i).appendTo(this.liveRegion))
            }
        }), e.ui.autocomplete;
    var d, p = "ui-button ui-widget ui-state-default ui-corner-all",
        f = "ui-button-icons-only ui-button-icon-only ui-button-text-icons ui-button-text-icon-primary ui-button-text-icon-secondary ui-button-text-only",
        m = function() {
            var t = e(this);
            setTimeout(function() { t.find(":ui-button").button("refresh") }, 1)
        },
        g = function(t) {
            var i = t.name,
                s = t.form,
                n = e([]);
            return i && (i = i.replace(/'/g, "\\'"), n = s ? e(s).find("[name='" + i + "'][type=radio]") : e("[name='" + i + "'][type=radio]", t.ownerDocument).filter(function() { return !this.form })), n
        };
    e.widget("ui.button", {
        version: "1.11.4",
        defaultElement: "<button>",
        options: { disabled: null, text: !0, label: null, icons: { primary: null, secondary: null } },
        _create: function() {
            this.element.closest("form").unbind("reset" + this.eventNamespace).bind("reset" + this.eventNamespace, m), "boolean" != typeof this.options.disabled ? this.options.disabled = !!this.element.prop("disabled") : this.element.prop("disabled", this.options.disabled), this._determineButtonType(), this.hasTitle = !!this.buttonElement.attr("title");
            var t = this,
                i = this.options,
                s = "checkbox" === this.type || "radio" === this.type,
                n = s ? "" : "ui-state-active";
            null === i.label && (i.label = "input" === this.type ? this.buttonElement.val() : this.buttonElement.html()), this._hoverable(this.buttonElement), this.buttonElement.addClass(p).attr("role", "button").bind("mouseenter" + this.eventNamespace, function() { i.disabled || this === d && e(this).addClass("ui-state-active") }).bind("mouseleave" + this.eventNamespace, function() { i.disabled || e(this).removeClass(n) }).bind("click" + this.eventNamespace, function(e) { i.disabled && (e.preventDefault(), e.stopImmediatePropagation()) }), this._on({ focus: function() { this.buttonElement.addClass("ui-state-focus") }, blur: function() { this.buttonElement.removeClass("ui-state-focus") } }), s && this.element.bind("change" + this.eventNamespace, function() { t.refresh() }), "checkbox" === this.type ? this.buttonElement.bind("click" + this.eventNamespace, function() { return i.disabled ? !1 : void 0 }) : "radio" === this.type ? this.buttonElement.bind("click" + this.eventNamespace, function() {
                if (i.disabled) return !1;
                e(this).addClass("ui-state-active"), t.buttonElement.attr("aria-pressed", "true");
                var s = t.element[0];
                g(s).not(s).map(function() { return e(this).button("widget")[0] }).removeClass("ui-state-active").attr("aria-pressed", "false")
            }) : (this.buttonElement.bind("mousedown" + this.eventNamespace, function() { return i.disabled ? !1 : (e(this).addClass("ui-state-active"), d = this, void t.document.one("mouseup", function() { d = null })) }).bind("mouseup" + this.eventNamespace, function() { return i.disabled ? !1 : void e(this).removeClass("ui-state-active") }).bind("keydown" + this.eventNamespace, function(t) { return i.disabled ? !1 : void((t.keyCode === e.ui.keyCode.SPACE || t.keyCode === e.ui.keyCode.ENTER) && e(this).addClass("ui-state-active")) }).bind("keyup" + this.eventNamespace + " blur" + this.eventNamespace, function() { e(this).removeClass("ui-state-active") }), this.buttonElement.is("a") && this.buttonElement.keyup(function(t) { t.keyCode === e.ui.keyCode.SPACE && e(this).click() })), this._setOption("disabled", i.disabled), this._resetButton()
        },
        _determineButtonType: function() {
            var e, t, i;
            this.type = this.element.is("[type=checkbox]") ? "checkbox" : this.element.is("[type=radio]") ? "radio" : this.element.is("input") ? "input" : "button", "checkbox" === this.type || "radio" === this.type ? (e = this.element.parents().last(), t = "label[for='" + this.element.attr("id") + "']", this.buttonElement = e.find(t), this.buttonElement.length || (e = e.length ? e.siblings() : this.element.siblings(), this.buttonElement = e.filter(t), this.buttonElement.length || (this.buttonElement = e.find(t))), this.element.addClass("ui-helper-hidden-accessible"), i = this.element.is(":checked"), i && this.buttonElement.addClass("ui-state-active"), this.buttonElement.prop("aria-pressed", i)) : this.buttonElement = this.element
        },
        widget: function() { return this.buttonElement },
        _destroy: function() { this.element.removeClass("ui-helper-hidden-accessible"), this.buttonElement.removeClass(p + " ui-state-active " + f).removeAttr("role").removeAttr("aria-pressed").html(this.buttonElement.find(".ui-button-text").html()), this.hasTitle || this.buttonElement.removeAttr("title") },
        _setOption: function(e, t) { return this._super(e, t), "disabled" === e ? (this.widget().toggleClass("ui-state-disabled", !!t), this.element.prop("disabled", !!t), void(t && ("checkbox" === this.type || "radio" === this.type ? this.buttonElement.removeClass("ui-state-focus") : this.buttonElement.removeClass("ui-state-focus ui-state-active")))) : void this._resetButton() },
        refresh: function() {
            var t = this.element.is("input, button") ? this.element.is(":disabled") : this.element.hasClass("ui-button-disabled");
            t !== this.options.disabled && this._setOption("disabled", t), "radio" === this.type ? g(this.element[0]).each(function() { e(this).is(":checked") ? e(this).button("widget").addClass("ui-state-active").attr("aria-pressed", "true") : e(this).button("widget").removeClass("ui-state-active").attr("aria-pressed", "false") }) : "checkbox" === this.type && (this.element.is(":checked") ? this.buttonElement.addClass("ui-state-active").attr("aria-pressed", "true") : this.buttonElement.removeClass("ui-state-active").attr("aria-pressed", "false"))
        },
        _resetButton: function() {
            if ("input" === this.type) return void(this.options.label && this.element.val(this.options.label));
            var t = this.buttonElement.removeClass(f),
                i = e("<span></span>", this.document[0]).addClass("ui-button-text").html(this.options.label).appendTo(t.empty()).text(),
                s = this.options.icons,
                n = s.primary && s.secondary,
                o = [];
            s.primary || s.secondary ? (this.options.text && o.push("ui-button-text-icon" + (n ? "s" : s.primary ? "-primary" : "-secondary")), s.primary && t.prepend("<span class='ui-button-icon-primary ui-icon " + s.primary + "'></span>"), s.secondary && t.append("<span class='ui-button-icon-secondary ui-icon " + s.secondary + "'></span>"), this.options.text || (o.push(n ? "ui-button-icons-only" : "ui-button-icon-only"), this.hasTitle || t.attr("title", e.trim(i)))) : o.push("ui-button-text-only"), t.addClass(o.join(" "))
        }
    }), e.widget("ui.buttonset", {
        version: "1.11.4",
        options: { items: "button, input[type=button], input[type=submit], input[type=reset], input[type=checkbox], input[type=radio], a, :data(ui-button)" },
        _create: function() { this.element.addClass("ui-buttonset") },
        _init: function() { this.refresh() },
        _setOption: function(e, t) { "disabled" === e && this.buttons.button("option", e, t), this._super(e, t) },
        refresh: function() {
            var t = "rtl" === this.element.css("direction"),
                i = this.element.find(this.options.items),
                s = i.filter(":ui-button");
            i.not(":ui-button").button(), s.button("refresh"), this.buttons = i.map(function() { return e(this).button("widget")[0] }).removeClass("ui-corner-all ui-corner-left ui-corner-right").filter(":first").addClass(t ? "ui-corner-right" : "ui-corner-left").end().filter(":last").addClass(t ? "ui-corner-left" : "ui-corner-right").end().end()
        },
        _destroy: function() { this.element.removeClass("ui-buttonset"), this.buttons.map(function() { return e(this).button("widget")[0] }).removeClass("ui-corner-left ui-corner-right").end().button("destroy") }
    }), e.ui.button, e.extend(e.ui, { datepicker: { version: "1.11.4" } });
    var v;
    e.extend(n.prototype, {
        markerClassName: "hasDatepicker",
        maxRows: 4,
        _widgetDatepicker: function() { return this.dpDiv },
        setDefaults: function(e) { return a(this._defaults, e || {}), this },
        _attachDatepicker: function(t, i) {
            var s, n, o;
            s = t.nodeName.toLowerCase(), n = "div" === s || "span" === s, t.id || (this.uuid += 1, t.id = "dp" + this.uuid), o = this._newInst(e(t), n), o.settings = e.extend({}, i || {}), "input" === s ? this._connectDatepicker(t, o) : n && this._inlineDatepicker(t, o)
        },
        _newInst: function(t, i) { var s = t[0].id.replace(/([^A-Za-z0-9_\-])/g, "\\\\$1"); return { id: s, input: t, selectedDay: 0, selectedMonth: 0, selectedYear: 0, drawMonth: 0, drawYear: 0, inline: i, dpDiv: i ? o(e("<div class='" + this._inlineClass + " ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all'></div>")) : this.dpDiv } },
        _connectDatepicker: function(t, i) {
            var s = e(t);
            i.append = e([]), i.trigger = e([]), s.hasClass(this.markerClassName) || (this._attachments(s, i), s.addClass(this.markerClassName).keydown(this._doKeyDown).keypress(this._doKeyPress).keyup(this._doKeyUp), this._autoSize(i), e.data(t, "datepicker", i), i.settings.disabled && this._disableDatepicker(t))
        },
        _attachments: function(t, i) {
            var s, n, o, r = this._get(i, "appendText"),
                a = this._get(i, "isRTL");
            i.append && i.append.remove(), r && (i.append = e("<span class='" + this._appendClass + "'>" + r + "</span>"), t[a ? "before" : "after"](i.append)), t.unbind("focus", this._showDatepicker), i.trigger && i.trigger.remove(), s = this._get(i, "showOn"), ("focus" === s || "both" === s) && t.focus(this._showDatepicker), ("button" === s || "both" === s) && (n = this._get(i, "buttonText"), o = this._get(i, "buttonImage"), i.trigger = e(this._get(i, "buttonImageOnly") ? e("<img/>").addClass(this._triggerClass).attr({ src: o, alt: n, title: n }) : e("<button type='button'></button>").addClass(this._triggerClass).html(o ? e("<img/>").attr({ src: o, alt: n, title: n }) : n)), t[a ? "before" : "after"](i.trigger), i.trigger.click(function() { return e.datepicker._datepickerShowing && e.datepicker._lastInput === t[0] ? e.datepicker._hideDatepicker() : e.datepicker._datepickerShowing && e.datepicker._lastInput !== t[0] ? (e.datepicker._hideDatepicker(), e.datepicker._showDatepicker(t[0])) : e.datepicker._showDatepicker(t[0]), !1 }))
        },
        _autoSize: function(e) {
            if (this._get(e, "autoSize") && !e.inline) {
                var t, i, s, n, o = new Date(2009, 11, 20),
                    r = this._get(e, "dateFormat");
                r.match(/[DM]/) && (t = function(e) { for (i = 0, s = 0, n = 0; e.length > n; n++) e[n].length > i && (i = e[n].length, s = n); return s }, o.setMonth(t(this._get(e, r.match(/MM/) ? "monthNames" : "monthNamesShort"))), o.setDate(t(this._get(e, r.match(/DD/) ? "dayNames" : "dayNamesShort")) + 20 - o.getDay())), e.input.attr("size", this._formatDate(e, o).length)
            }
        },
        _inlineDatepicker: function(t, i) {
            var s = e(t);
            s.hasClass(this.markerClassName) || (s.addClass(this.markerClassName).append(i.dpDiv), e.data(t, "datepicker", i), this._setDate(i, this._getDefaultDate(i), !0), this._updateDatepicker(i), this._updateAlternate(i), i.settings.disabled && this._disableDatepicker(t), i.dpDiv.css("display", "block"))
        },
        _dialogDatepicker: function(t, i, s, n, o) { var r, l, h, c, u, d = this._dialogInst; return d || (this.uuid += 1, r = "dp" + this.uuid, this._dialogInput = e("<input type='text' id='" + r + "' style='position: absolute; top: -100px; width: 0px;'/>"), this._dialogInput.keydown(this._doKeyDown), e("body").append(this._dialogInput), d = this._dialogInst = this._newInst(this._dialogInput, !1), d.settings = {}, e.data(this._dialogInput[0], "datepicker", d)), a(d.settings, n || {}), i = i && i.constructor === Date ? this._formatDate(d, i) : i, this._dialogInput.val(i), this._pos = o ? o.length ? o : [o.pageX, o.pageY] : null, this._pos || (l = document.documentElement.clientWidth, h = document.documentElement.clientHeight, c = document.documentElement.scrollLeft || document.body.scrollLeft, u = document.documentElement.scrollTop || document.body.scrollTop, this._pos = [l / 2 - 100 + c, h / 2 - 150 + u]), this._dialogInput.css("left", this._pos[0] + 20 + "px").css("top", this._pos[1] + "px"), d.settings.onSelect = s, this._inDialog = !0, this.dpDiv.addClass(this._dialogClass), this._showDatepicker(this._dialogInput[0]), e.blockUI && e.blockUI(this.dpDiv), e.data(this._dialogInput[0], "datepicker", d), this },
        _destroyDatepicker: function(t) {
            var i, s = e(t),
                n = e.data(t, "datepicker");
            s.hasClass(this.markerClassName) && (i = t.nodeName.toLowerCase(), e.removeData(t, "datepicker"), "input" === i ? (n.append.remove(), n.trigger.remove(), s.removeClass(this.markerClassName).unbind("focus", this._showDatepicker).unbind("keydown", this._doKeyDown).unbind("keypress", this._doKeyPress).unbind("keyup", this._doKeyUp)) : ("div" === i || "span" === i) && s.removeClass(this.markerClassName).empty(), v === n && (v = null))
        },
        _enableDatepicker: function(t) {
            var i, s, n = e(t),
                o = e.data(t, "datepicker");
            n.hasClass(this.markerClassName) && (i = t.nodeName.toLowerCase(), "input" === i ? (t.disabled = !1, o.trigger.filter("button").each(function() { this.disabled = !1 }).end().filter("img").css({ opacity: "1.0", cursor: "" })) : ("div" === i || "span" === i) && (s = n.children("." + this._inlineClass), s.children().removeClass("ui-state-disabled"), s.find("select.ui-datepicker-month, select.ui-datepicker-year").prop("disabled", !1)), this._disabledInputs = e.map(this._disabledInputs, function(e) { return e === t ? null : e }))
        },
        _disableDatepicker: function(t) {
            var i, s, n = e(t),
                o = e.data(t, "datepicker");
            n.hasClass(this.markerClassName) && (i = t.nodeName.toLowerCase(), "input" === i ? (t.disabled = !0, o.trigger.filter("button").each(function() { this.disabled = !0 }).end().filter("img").css({ opacity: "0.5", cursor: "default" })) : ("div" === i || "span" === i) && (s = n.children("." + this._inlineClass), s.children().addClass("ui-state-disabled"), s.find("select.ui-datepicker-month, select.ui-datepicker-year").prop("disabled", !0)), this._disabledInputs = e.map(this._disabledInputs, function(e) { return e === t ? null : e }), this._disabledInputs[this._disabledInputs.length] = t)
        },
        _isDisabledDatepicker: function(e) {
            if (!e) return !1;
            for (var t = 0; this._disabledInputs.length > t; t++)
                if (this._disabledInputs[t] === e) return !0;
            return !1
        },
        _getInst: function(t) { try { return e.data(t, "datepicker") } catch (i) { throw "Missing instance data for this datepicker" } },
        _optionDatepicker: function(t, i, s) { var n, o, r, l, h = this._getInst(t); return 2 === arguments.length && "string" == typeof i ? "defaults" === i ? e.extend({}, e.datepicker._defaults) : h ? "all" === i ? e.extend({}, h.settings) : this._get(h, i) : null : (n = i || {}, "string" == typeof i && (n = {}, n[i] = s), void(h && (this._curInst === h && this._hideDatepicker(), o = this._getDateDatepicker(t, !0), r = this._getMinMaxDate(h, "min"), l = this._getMinMaxDate(h, "max"), a(h.settings, n), null !== r && void 0 !== n.dateFormat && void 0 === n.minDate && (h.settings.minDate = this._formatDate(h, r)), null !== l && void 0 !== n.dateFormat && void 0 === n.maxDate && (h.settings.maxDate = this._formatDate(h, l)), "disabled" in n && (n.disabled ? this._disableDatepicker(t) : this._enableDatepicker(t)), this._attachments(e(t), h), this._autoSize(h), this._setDate(h, o), this._updateAlternate(h), this._updateDatepicker(h)))) },
        _changeDatepicker: function(e, t, i) { this._optionDatepicker(e, t, i) },
        _refreshDatepicker: function(e) {
            var t = this._getInst(e);
            t && this._updateDatepicker(t)
        },
        _setDateDatepicker: function(e, t) {
            var i = this._getInst(e);
            i && (this._setDate(i, t), this._updateDatepicker(i), this._updateAlternate(i))
        },
        _getDateDatepicker: function(e, t) { var i = this._getInst(e); return i && !i.inline && this._setDateFromField(i, t), i ? this._getDate(i) : null },
        _doKeyDown: function(t) {
            var i, s, n, o = e.datepicker._getInst(t.target),
                r = !0,
                a = o.dpDiv.is(".ui-datepicker-rtl");
            if (o._keyEvent = !0, e.datepicker._datepickerShowing) switch (t.keyCode) {
                case 9:
                    e.datepicker._hideDatepicker(), r = !1;
                    break;
                case 13:
                    return n = e("td." + e.datepicker._dayOverClass + ":not(." + e.datepicker._currentClass + ")", o.dpDiv), n[0] && e.datepicker._selectDay(t.target, o.selectedMonth, o.selectedYear, n[0]), i = e.datepicker._get(o, "onSelect"), i ? (s = e.datepicker._formatDate(o), i.apply(o.input ? o.input[0] : null, [s, o])) : e.datepicker._hideDatepicker(), !1;
                case 27:
                    e.datepicker._hideDatepicker();
                    break;
                case 33:
                    e.datepicker._adjustDate(t.target, t.ctrlKey ? -e.datepicker._get(o, "stepBigMonths") : -e.datepicker._get(o, "stepMonths"), "M");
                    break;
                case 34:
                    e.datepicker._adjustDate(t.target, t.ctrlKey ? +e.datepicker._get(o, "stepBigMonths") : +e.datepicker._get(o, "stepMonths"), "M");
                    break;
                case 35:
                    (t.ctrlKey || t.metaKey) && e.datepicker._clearDate(t.target), r = t.ctrlKey || t.metaKey;
                    break;
                case 36:
                    (t.ctrlKey || t.metaKey) && e.datepicker._gotoToday(t.target), r = t.ctrlKey || t.metaKey;
                    break;
                case 37:
                    (t.ctrlKey || t.metaKey) && e.datepicker._adjustDate(t.target, a ? 1 : -1, "D"), r = t.ctrlKey || t.metaKey, t.originalEvent.altKey && e.datepicker._adjustDate(t.target, t.ctrlKey ? -e.datepicker._get(o, "stepBigMonths") : -e.datepicker._get(o, "stepMonths"), "M");
                    break;
                case 38:
                    (t.ctrlKey || t.metaKey) && e.datepicker._adjustDate(t.target, -7, "D"), r = t.ctrlKey || t.metaKey;
                    break;
                case 39:
                    (t.ctrlKey || t.metaKey) && e.datepicker._adjustDate(t.target, a ? -1 : 1, "D"), r = t.ctrlKey || t.metaKey, t.originalEvent.altKey && e.datepicker._adjustDate(t.target, t.ctrlKey ? +e.datepicker._get(o, "stepBigMonths") : +e.datepicker._get(o, "stepMonths"), "M");
                    break;
                case 40:
                    (t.ctrlKey || t.metaKey) && e.datepicker._adjustDate(t.target, 7, "D"), r = t.ctrlKey || t.metaKey;
                    break;
                default:
                    r = !1
            } else 36 === t.keyCode && t.ctrlKey ? e.datepicker._showDatepicker(this) : r = !1;
            r && (t.preventDefault(), t.stopPropagation())
        },
        _doKeyPress: function(t) { var i, s, n = e.datepicker._getInst(t.target); return e.datepicker._get(n, "constrainInput") ? (i = e.datepicker._possibleChars(e.datepicker._get(n, "dateFormat")), s = String.fromCharCode(null == t.charCode ? t.keyCode : t.charCode), t.ctrlKey || t.metaKey || " " > s || !i || i.indexOf(s) > -1) : void 0 },
        _doKeyUp: function(t) {
            var i, s = e.datepicker._getInst(t.target);
            if (s.input.val() !== s.lastVal) try { i = e.datepicker.parseDate(e.datepicker._get(s, "dateFormat"), s.input ? s.input.val() : null, e.datepicker._getFormatConfig(s)), i && (e.datepicker._setDateFromField(s), e.datepicker._updateAlternate(s), e.datepicker._updateDatepicker(s)) } catch (n) {}
            return !0
        },
        _showDatepicker: function(t) {
            if (t = t.target || t, "input" !== t.nodeName.toLowerCase() && (t = e("input", t.parentNode)[0]), !e.datepicker._isDisabledDatepicker(t) && e.datepicker._lastInput !== t) {
                var i, n, o, r, l, h, c;
                i = e.datepicker._getInst(t), e.datepicker._curInst && e.datepicker._curInst !== i && (e.datepicker._curInst.dpDiv.stop(!0, !0), i && e.datepicker._datepickerShowing && e.datepicker._hideDatepicker(e.datepicker._curInst.input[0])), n = e.datepicker._get(i, "beforeShow"), o = n ? n.apply(t, [t, i]) : {}, o !== !1 && (a(i.settings, o), i.lastVal = null, e.datepicker._lastInput = t, e.datepicker._setDateFromField(i), e.datepicker._inDialog && (t.value = ""), e.datepicker._pos || (e.datepicker._pos = e.datepicker._findPos(t), e.datepicker._pos[1] += t.offsetHeight), r = !1, e(t).parents().each(function() { return r |= "fixed" === e(this).css("position"), !r }), l = { left: e.datepicker._pos[0], top: e.datepicker._pos[1] }, e.datepicker._pos = null, i.dpDiv.empty(), i.dpDiv.css({ position: "absolute", display: "block", top: "-1000px" }), e.datepicker._updateDatepicker(i), l = e.datepicker._checkOffset(i, l, r), i.dpDiv.css({ position: e.datepicker._inDialog && e.blockUI ? "static" : r ? "fixed" : "absolute", display: "none", left: l.left + "px", top: l.top + "px" }), i.inline || (h = e.datepicker._get(i, "showAnim"), c = e.datepicker._get(i, "duration"), i.dpDiv.css("z-index", s(e(t)) + 1), e.datepicker._datepickerShowing = !0, e.effects && e.effects.effect[h] ? i.dpDiv.show(h, e.datepicker._get(i, "showOptions"), c) : i.dpDiv[h || "show"](h ? c : null), e.datepicker._shouldFocusInput(i) && i.input.focus(), e.datepicker._curInst = i))
            }
        },
        _updateDatepicker: function(t) {
            this.maxRows = 4, v = t, t.dpDiv.empty().append(this._generateHTML(t)), this._attachHandlers(t);
            var i, s = this._getNumberOfMonths(t),
                n = s[1],
                o = 17,
                a = t.dpDiv.find("." + this._dayOverClass + " a");
            a.length > 0 && r.apply(a.get(0)), t.dpDiv.removeClass("ui-datepicker-multi-2 ui-datepicker-multi-3 ui-datepicker-multi-4").width(""), n > 1 && t.dpDiv.addClass("ui-datepicker-multi-" + n).css("width", o * n + "em"), t.dpDiv[(1 !== s[0] || 1 !== s[1] ? "add" : "remove") + "Class"]("ui-datepicker-multi"), t.dpDiv[(this._get(t, "isRTL") ? "add" : "remove") + "Class"]("ui-datepicker-rtl"), t === e.datepicker._curInst && e.datepicker._datepickerShowing && e.datepicker._shouldFocusInput(t) && t.input.focus(), t.yearshtml && (i = t.yearshtml, setTimeout(function() { i === t.yearshtml && t.yearshtml && t.dpDiv.find("select.ui-datepicker-year:first").replaceWith(t.yearshtml), i = t.yearshtml = null }, 0))
        },
        _shouldFocusInput: function(e) { return e.input && e.input.is(":visible") && !e.input.is(":disabled") && !e.input.is(":focus") },
        _checkOffset: function(t, i, s) {
            var n = t.dpDiv.outerWidth(),
                o = t.dpDiv.outerHeight(),
                r = t.input ? t.input.outerWidth() : 0,
                a = t.input ? t.input.outerHeight() : 0,
                l = document.documentElement.clientWidth + (s ? 0 : e(document).scrollLeft()),
                h = document.documentElement.clientHeight + (s ? 0 : e(document).scrollTop());
            return i.left -= this._get(t, "isRTL") ? n - r : 0, i.left -= s && i.left === t.input.offset().left ? e(document).scrollLeft() : 0, i.top -= s && i.top === t.input.offset().top + a ? e(document).scrollTop() : 0, i.left -= Math.min(i.left, i.left + n > l && l > n ? Math.abs(i.left + n - l) : 0), i.top -= Math.min(i.top, i.top + o > h && h > o ? Math.abs(o + a) : 0), i
        },
        _findPos: function(t) { for (var i, s = this._getInst(t), n = this._get(s, "isRTL"); t && ("hidden" === t.type || 1 !== t.nodeType || e.expr.filters.hidden(t));) t = t[n ? "previousSibling" : "nextSibling"]; return i = e(t).offset(), [i.left, i.top] },
        _hideDatepicker: function(t) { var i, s, n, o, r = this._curInst;!r || t && r !== e.data(t, "datepicker") || this._datepickerShowing && (i = this._get(r, "showAnim"), s = this._get(r, "duration"), n = function() { e.datepicker._tidyDialog(r) }, e.effects && (e.effects.effect[i] || e.effects[i]) ? r.dpDiv.hide(i, e.datepicker._get(r, "showOptions"), s, n) : r.dpDiv["slideDown" === i ? "slideUp" : "fadeIn" === i ? "fadeOut" : "hide"](i ? s : null, n), i || n(), this._datepickerShowing = !1, o = this._get(r, "onClose"), o && o.apply(r.input ? r.input[0] : null, [r.input ? r.input.val() : "", r]), this._lastInput = null, this._inDialog && (this._dialogInput.css({ position: "absolute", left: "0", top: "-100px" }), e.blockUI && (e.unblockUI(), e("body").append(this.dpDiv))), this._inDialog = !1) },
        _tidyDialog: function(e) { e.dpDiv.removeClass(this._dialogClass).unbind(".ui-datepicker-calendar") },
        _checkExternalClick: function(t) {
            if (e.datepicker._curInst) {
                var i = e(t.target),
                    s = e.datepicker._getInst(i[0]);
                (i[0].id !== e.datepicker._mainDivId && 0 === i.parents("#" + e.datepicker._mainDivId).length && !i.hasClass(e.datepicker.markerClassName) && !i.closest("." + e.datepicker._triggerClass).length && e.datepicker._datepickerShowing && (!e.datepicker._inDialog || !e.blockUI) || i.hasClass(e.datepicker.markerClassName) && e.datepicker._curInst !== s) && e.datepicker._hideDatepicker()
            }
        },
        _adjustDate: function(t, i, s) {
            var n = e(t),
                o = this._getInst(n[0]);
            this._isDisabledDatepicker(n[0]) || (this._adjustInstDate(o, i + ("M" === s ? this._get(o, "showCurrentAtPos") : 0), s), this._updateDatepicker(o))
        },
        _gotoToday: function(t) {
            var i, s = e(t),
                n = this._getInst(s[0]);
            this._get(n, "gotoCurrent") && n.currentDay ? (n.selectedDay = n.currentDay, n.drawMonth = n.selectedMonth = n.currentMonth, n.drawYear = n.selectedYear = n.currentYear) : (i = new Date, n.selectedDay = i.getDate(), n.drawMonth = n.selectedMonth = i.getMonth(), n.drawYear = n.selectedYear = i.getFullYear()), this._notifyChange(n), this._adjustDate(s)
        },
        _selectMonthYear: function(t, i, s) {
            var n = e(t),
                o = this._getInst(n[0]);
            o["selected" + ("M" === s ? "Month" : "Year")] = o["draw" + ("M" === s ? "Month" : "Year")] = parseInt(i.options[i.selectedIndex].value, 10), this._notifyChange(o), this._adjustDate(n)
        },
        _selectDay: function(t, i, s, n) {
            var o, r = e(t);
            e(n).hasClass(this._unselectableClass) || this._isDisabledDatepicker(r[0]) || (o = this._getInst(r[0]), o.selectedDay = o.currentDay = e("a", n).html(), o.selectedMonth = o.currentMonth = i, o.selectedYear = o.currentYear = s, this._selectDate(t, this._formatDate(o, o.currentDay, o.currentMonth, o.currentYear)))
        },
        _clearDate: function(t) {
            var i = e(t);
            this._selectDate(i, "")
        },
        _selectDate: function(t, i) {
            var s, n = e(t),
                o = this._getInst(n[0]);
            i = null != i ? i : this._formatDate(o), o.input && o.input.val(i), this._updateAlternate(o), s = this._get(o, "onSelect"), s ? s.apply(o.input ? o.input[0] : null, [i, o]) : o.input && o.input.trigger("change"), o.inline ? this._updateDatepicker(o) : (this._hideDatepicker(), this._lastInput = o.input[0], "object" != typeof o.input[0] && o.input.focus(), this._lastInput = null)
        },
        _updateAlternate: function(t) {
            var i, s, n, o = this._get(t, "altField");
            o && (i = this._get(t, "altFormat") || this._get(t, "dateFormat"), s = this._getDate(t), n = this.formatDate(i, s, this._getFormatConfig(t)), e(o).each(function() { e(this).val(n) }))
        },
        noWeekends: function(e) { var t = e.getDay(); return [t > 0 && 6 > t, ""] },
        iso8601Week: function(e) { var t, i = new Date(e.getTime()); return i.setDate(i.getDate() + 4 - (i.getDay() || 7)), t = i.getTime(), i.setMonth(0), i.setDate(1), Math.floor(Math.round((t - i) / 864e5) / 7) + 1 },
        parseDate: function(t, i, s) {
            if (null == t || null == i) throw "Invalid arguments";
            if (i = "object" == typeof i ? "" + i : i + "", "" === i) return null;
            var n, o, r, a, l = 0,
                h = (s ? s.shortYearCutoff : null) || this._defaults.shortYearCutoff,
                c = "string" != typeof h ? h : (new Date).getFullYear() % 100 + parseInt(h, 10),
                u = (s ? s.dayNamesShort : null) || this._defaults.dayNamesShort,
                d = (s ? s.dayNames : null) || this._defaults.dayNames,
                p = (s ? s.monthNamesShort : null) || this._defaults.monthNamesShort,
                f = (s ? s.monthNames : null) || this._defaults.monthNames,
                m = -1,
                g = -1,
                v = -1,
                b = -1,
                y = !1,
                x = function(e) { var i = t.length > n + 1 && t.charAt(n + 1) === e; return i && n++, i },
                w = function(e) {
                    var t = x(e),
                        s = "@" === e ? 14 : "!" === e ? 20 : "y" === e && t ? 4 : "o" === e ? 3 : 2,
                        n = "y" === e ? s : 1,
                        o = RegExp("^\\d{" + n + "," + s + "}"),
                        r = i.substring(l).match(o);
                    if (!r) throw "Missing number at position " + l;
                    return l += r[0].length, parseInt(r[0], 10)
                },
                _ = function(t, s, n) {
                    var o = -1,
                        r = e.map(x(t) ? n : s, function(e, t) {
                            return [
                                [t, e]
                            ]
                        }).sort(function(e, t) { return -(e[1].length - t[1].length) });
                    if (e.each(r, function(e, t) { var s = t[1]; return i.substr(l, s.length).toLowerCase() === s.toLowerCase() ? (o = t[0], l += s.length, !1) : void 0 }), -1 !== o) return o + 1;
                    throw "Unknown name at position " + l
                },
                C = function() {
                    if (i.charAt(l) !== t.charAt(n)) throw "Unexpected literal at position " + l;
                    l++
                };
            for (n = 0; t.length > n; n++)
                if (y) "'" !== t.charAt(n) || x("'") ? C() : y = !1;
                else switch (t.charAt(n)) {
                    case "d":
                        v = w("d");
                        break;
                    case "D":
                        _("D", u, d);
                        break;
                    case "o":
                        b = w("o");
                        break;
                    case "m":
                        g = w("m");
                        break;
                    case "M":
                        g = _("M", p, f);
                        break;
                    case "y":
                        m = w("y");
                        break;
                    case "@":
                        a = new Date(w("@")), m = a.getFullYear(), g = a.getMonth() + 1, v = a.getDate();
                        break;
                    case "!":
                        a = new Date((w("!") - this._ticksTo1970) / 1e4), m = a.getFullYear(), g = a.getMonth() + 1, v = a.getDate();
                        break;
                    case "'":
                        x("'") ? C() : y = !0;
                        break;
                    default:
                        C()
                }
            if (i.length > l && (r = i.substr(l), !/^\s+/.test(r))) throw "Extra/unparsed characters found in date: " + r;
            if (-1 === m ? m = (new Date).getFullYear() : 100 > m && (m += (new Date).getFullYear() - (new Date).getFullYear() % 100 + (c >= m ? 0 : -100)), b > -1)
                for (g = 1, v = b; o = this._getDaysInMonth(m, g - 1), !(o >= v);) g++, v -= o;
            if (a = this._daylightSavingAdjust(new Date(m, g - 1, v)), a.getFullYear() !== m || a.getMonth() + 1 !== g || a.getDate() !== v) throw "Invalid date";
            return a
        },
        ATOM: "yy-mm-dd",
        COOKIE: "D, dd M yy",
        ISO_8601: "yy-mm-dd",
        RFC_822: "D, d M y",
        RFC_850: "DD, dd-M-y",
        RFC_1036: "D, d M y",
        RFC_1123: "D, d M yy",
        RFC_2822: "D, d M yy",
        RSS: "D, d M y",
        TICKS: "!",
        TIMESTAMP: "@",
        W3C: "yy-mm-dd",
        _ticksTo1970: 864e9 * (718685 + Math.floor(492.5) - Math.floor(19.7) + Math.floor(4.925)),
        formatDate: function(e, t, i) {
            if (!t) return "";
            var s, n = (i ? i.dayNamesShort : null) || this._defaults.dayNamesShort,
                o = (i ? i.dayNames : null) || this._defaults.dayNames,
                r = (i ? i.monthNamesShort : null) || this._defaults.monthNamesShort,
                a = (i ? i.monthNames : null) || this._defaults.monthNames,
                l = function(t) { var i = e.length > s + 1 && e.charAt(s + 1) === t; return i && s++, i },
                h = function(e, t, i) {
                    var s = "" + t;
                    if (l(e))
                        for (; i > s.length;) s = "0" + s;
                    return s
                },
                c = function(e, t, i, s) { return l(e) ? s[t] : i[t] },
                u = "",
                d = !1;
            if (t)
                for (s = 0; e.length > s; s++)
                    if (d) "'" !== e.charAt(s) || l("'") ? u += e.charAt(s) : d = !1;
                    else switch (e.charAt(s)) {
                        case "d":
                            u += h("d", t.getDate(), 2);
                            break;
                        case "D":
                            u += c("D", t.getDay(), n, o);
                            break;
                        case "o":
                            u += h("o", Math.round((new Date(t.getFullYear(), t.getMonth(), t.getDate()).getTime() - new Date(t.getFullYear(), 0, 0).getTime()) / 864e5), 3);
                            break;
                        case "m":
                            u += h("m", t.getMonth() + 1, 2);
                            break;
                        case "M":
                            u += c("M", t.getMonth(), r, a);
                            break;
                        case "y":
                            u += l("y") ? t.getFullYear() : (10 > t.getYear() % 100 ? "0" : "") + t.getYear() % 100;
                            break;
                        case "@":
                            u += t.getTime();
                            break;
                        case "!":
                            u += 1e4 * t.getTime() + this._ticksTo1970;
                            break;
                        case "'":
                            l("'") ? u += "'" : d = !0;
                            break;
                        default:
                            u += e.charAt(s)
                    }
            return u
        },
        _possibleChars: function(e) {
            var t, i = "",
                s = !1,
                n = function(i) { var s = e.length > t + 1 && e.charAt(t + 1) === i; return s && t++, s };
            for (t = 0; e.length > t; t++)
                if (s) "'" !== e.charAt(t) || n("'") ? i += e.charAt(t) : s = !1;
                else switch (e.charAt(t)) {
                    case "d":
                    case "m":
                    case "y":
                    case "@":
                        i += "0123456789";
                        break;
                    case "D":
                    case "M":
                        return null;
                    case "'":
                        n("'") ? i += "'" : s = !0;
                        break;
                    default:
                        i += e.charAt(t)
                }
            return i
        },
        _get: function(e, t) { return void 0 !== e.settings[t] ? e.settings[t] : this._defaults[t] },
        _setDateFromField: function(e, t) {
            if (e.input.val() !== e.lastVal) {
                var i = this._get(e, "dateFormat"),
                    s = e.lastVal = e.input ? e.input.val() : null,
                    n = this._getDefaultDate(e),
                    o = n,
                    r = this._getFormatConfig(e);
                try { o = this.parseDate(i, s, r) || n } catch (a) { s = t ? "" : s }
                e.selectedDay = o.getDate(), e.drawMonth = e.selectedMonth = o.getMonth(), e.drawYear = e.selectedYear = o.getFullYear(), e.currentDay = s ? o.getDate() : 0, e.currentMonth = s ? o.getMonth() : 0, e.currentYear = s ? o.getFullYear() : 0, this._adjustInstDate(e)
            }
        },
        _getDefaultDate: function(e) { return this._restrictMinMax(e, this._determineDate(e, this._get(e, "defaultDate"), new Date)) },
        _determineDate: function(t, i, s) {
            var n = function(e) { var t = new Date; return t.setDate(t.getDate() + e), t },
                o = function(i) {
                    try { return e.datepicker.parseDate(e.datepicker._get(t, "dateFormat"), i, e.datepicker._getFormatConfig(t)) } catch (s) {}
                    for (var n = (i.toLowerCase().match(/^c/) ? e.datepicker._getDate(t) : null) || new Date, o = n.getFullYear(), r = n.getMonth(), a = n.getDate(), l = /([+\-]?[0-9]+)\s*(d|D|w|W|m|M|y|Y)?/g, h = l.exec(i); h;) {
                        switch (h[2] || "d") {
                            case "d":
                            case "D":
                                a += parseInt(h[1], 10);
                                break;
                            case "w":
                            case "W":
                                a += 7 * parseInt(h[1], 10);
                                break;
                            case "m":
                            case "M":
                                r += parseInt(h[1], 10), a = Math.min(a, e.datepicker._getDaysInMonth(o, r));
                                break;
                            case "y":
                            case "Y":
                                o += parseInt(h[1], 10), a = Math.min(a, e.datepicker._getDaysInMonth(o, r))
                        }
                        h = l.exec(i)
                    }
                    return new Date(o, r, a)
                },
                r = null == i || "" === i ? s : "string" == typeof i ? o(i) : "number" == typeof i ? isNaN(i) ? s : n(i) : new Date(i.getTime());
            return r = r && "Invalid Date" == "" + r ? s : r, r && (r.setHours(0), r.setMinutes(0), r.setSeconds(0), r.setMilliseconds(0)), this._daylightSavingAdjust(r)
        },
        _daylightSavingAdjust: function(e) { return e ? (e.setHours(e.getHours() > 12 ? e.getHours() + 2 : 0), e) : null },
        _setDate: function(e, t, i) {
            var s = !t,
                n = e.selectedMonth,
                o = e.selectedYear,
                r = this._restrictMinMax(e, this._determineDate(e, t, new Date));
            e.selectedDay = e.currentDay = r.getDate(), e.drawMonth = e.selectedMonth = e.currentMonth = r.getMonth(), e.drawYear = e.selectedYear = e.currentYear = r.getFullYear(), n === e.selectedMonth && o === e.selectedYear || i || this._notifyChange(e), this._adjustInstDate(e), e.input && e.input.val(s ? "" : this._formatDate(e))
        },
        _getDate: function(e) { var t = !e.currentYear || e.input && "" === e.input.val() ? null : this._daylightSavingAdjust(new Date(e.currentYear, e.currentMonth, e.currentDay)); return t },
        _attachHandlers: function(t) {
            var i = this._get(t, "stepMonths"),
                s = "#" + t.id.replace(/\\\\/g, "\\");
            t.dpDiv.find("[data-handler]").map(function() {
                var t = { prev: function() { e.datepicker._adjustDate(s, -i, "M") }, next: function() { e.datepicker._adjustDate(s, +i, "M") }, hide: function() { e.datepicker._hideDatepicker() }, today: function() { e.datepicker._gotoToday(s) }, selectDay: function() { return e.datepicker._selectDay(s, +this.getAttribute("data-month"), +this.getAttribute("data-year"), this), !1 }, selectMonth: function() { return e.datepicker._selectMonthYear(s, this, "M"), !1 }, selectYear: function() { return e.datepicker._selectMonthYear(s, this, "Y"), !1 } };
                e(this).bind(this.getAttribute("data-event"), t[this.getAttribute("data-handler")])
            })
        },
        _generateHTML: function(e) {
            var t, i, s, n, o, r, a, l, h, c, u, d, p, f, m, g, v, b, y, x, w, _, C, I, T, k, S, D, P, j, E, q, A, M, H, O, N, $, z, L = new Date,
                B = this._daylightSavingAdjust(new Date(L.getFullYear(), L.getMonth(), L.getDate())),
                W = this._get(e, "isRTL"),
                R = this._get(e, "showButtonPanel"),
                F = this._get(e, "hideIfNoPrevNext"),
                U = this._get(e, "navigationAsDateFormat"),
                V = this._getNumberOfMonths(e),
                Y = this._get(e, "showCurrentAtPos"),
                K = this._get(e, "stepMonths"),
                X = 1 !== V[0] || 1 !== V[1],
                G = this._daylightSavingAdjust(e.currentDay ? new Date(e.currentYear, e.currentMonth, e.currentDay) : new Date(9999, 9, 9)),
                Q = this._getMinMaxDate(e, "min"),
                J = this._getMinMaxDate(e, "max"),
                Z = e.drawMonth - Y,
                ee = e.drawYear;
            if (0 > Z && (Z += 12, ee--), J)
                for (t = this._daylightSavingAdjust(new Date(J.getFullYear(), J.getMonth() - V[0] * V[1] + 1, J.getDate())), t = Q && Q > t ? Q : t; this._daylightSavingAdjust(new Date(ee, Z, 1)) > t;) Z--, 0 > Z && (Z = 11, ee--);
            for (e.drawMonth = Z, e.drawYear = ee, i = this._get(e, "prevText"), i = U ? this.formatDate(i, this._daylightSavingAdjust(new Date(ee, Z - K, 1)), this._getFormatConfig(e)) : i, s = this._canAdjustMonth(e, -1, ee, Z) ? "<a class='ui-datepicker-prev ui-corner-all' data-handler='prev' data-event='click' title='" + i + "'><span class='ui-icon ui-icon-circle-triangle-" + (W ? "e" : "w") + "'>" + i + "</span></a>" : F ? "" : "<a class='ui-datepicker-prev ui-corner-all ui-state-disabled' title='" + i + "'><span class='ui-icon ui-icon-circle-triangle-" + (W ? "e" : "w") + "'>" + i + "</span></a>", n = this._get(e, "nextText"), n = U ? this.formatDate(n, this._daylightSavingAdjust(new Date(ee, Z + K, 1)), this._getFormatConfig(e)) : n, o = this._canAdjustMonth(e, 1, ee, Z) ? "<a class='ui-datepicker-next ui-corner-all' data-handler='next' data-event='click' title='" + n + "'><span class='ui-icon ui-icon-circle-triangle-" + (W ? "w" : "e") + "'>" + n + "</span></a>" : F ? "" : "<a class='ui-datepicker-next ui-corner-all ui-state-disabled' title='" + n + "'><span class='ui-icon ui-icon-circle-triangle-" + (W ? "w" : "e") + "'>" + n + "</span></a>", r = this._get(e, "currentText"), a = this._get(e, "gotoCurrent") && e.currentDay ? G : B, r = U ? this.formatDate(r, a, this._getFormatConfig(e)) : r, l = e.inline ? "" : "<button type='button' class='ui-datepicker-close ui-state-default ui-priority-primary ui-corner-all' data-handler='hide' data-event='click'>" + this._get(e, "closeText") + "</button>", h = R ? "<div class='ui-datepicker-buttonpane ui-widget-content'>" + (W ? l : "") + (this._isInRange(e, a) ? "<button type='button' class='ui-datepicker-current ui-state-default ui-priority-secondary ui-corner-all' data-handler='today' data-event='click'>" + r + "</button>" : "") + (W ? "" : l) + "</div>" : "", c = parseInt(this._get(e, "firstDay"), 10), c = isNaN(c) ? 0 : c, u = this._get(e, "showWeek"), d = this._get(e, "dayNames"), p = this._get(e, "dayNamesMin"), f = this._get(e, "monthNames"), m = this._get(e, "monthNamesShort"), g = this._get(e, "beforeShowDay"), v = this._get(e, "showOtherMonths"), b = this._get(e, "selectOtherMonths"), y = this._getDefaultDate(e), x = "", _ = 0; V[0] > _; _++) {
                for (C = "", this.maxRows = 4, I = 0; V[1] > I; I++) {
                    if (T = this._daylightSavingAdjust(new Date(ee, Z, e.selectedDay)), k = " ui-corner-all", S = "", X) {
                        if (S += "<div class='ui-datepicker-group", V[1] > 1) switch (I) {
                            case 0:
                                S += " ui-datepicker-group-first", k = " ui-corner-" + (W ? "right" : "left");
                                break;
                            case V[1] - 1:
                                S += " ui-datepicker-group-last", k = " ui-corner-" + (W ? "left" : "right");
                                break;
                            default:
                                S += " ui-datepicker-group-middle", k = ""
                        }
                        S += "'>"
                    }
                    for (S += "<div class='ui-datepicker-header ui-widget-header ui-helper-clearfix" + k + "'>" + (/all|left/.test(k) && 0 === _ ? W ? o : s : "") + (/all|right/.test(k) && 0 === _ ? W ? s : o : "") + this._generateMonthYearHeader(e, Z, ee, Q, J, _ > 0 || I > 0, f, m) + "</div><table class='ui-datepicker-calendar'><thead><tr>", D = u ? "<th class='ui-datepicker-week-col'>" + this._get(e, "weekHeader") + "</th>" : "", w = 0; 7 > w; w++) P = (w + c) % 7, D += "<th scope='col'" + ((w + c + 6) % 7 >= 5 ? " class='ui-datepicker-week-end'" : "") + "><span title='" + d[P] + "'>" + p[P] + "</span></th>";
                    for (S += D + "</tr></thead><tbody>", j = this._getDaysInMonth(ee, Z), ee === e.selectedYear && Z === e.selectedMonth && (e.selectedDay = Math.min(e.selectedDay, j)), E = (this._getFirstDayOfMonth(ee, Z) - c + 7) % 7, q = Math.ceil((E + j) / 7), A = X && this.maxRows > q ? this.maxRows : q, this.maxRows = A, M = this._daylightSavingAdjust(new Date(ee, Z, 1 - E)), H = 0; A > H; H++) {
                        for (S += "<tr>", O = u ? "<td class='ui-datepicker-week-col'>" + this._get(e, "calculateWeek")(M) + "</td>" : "", w = 0; 7 > w; w++) N = g ? g.apply(e.input ? e.input[0] : null, [M]) : [!0, ""], $ = M.getMonth() !== Z, z = $ && !b || !N[0] || Q && Q > M || J && M > J, O += "<td class='" + ((w + c + 6) % 7 >= 5 ? " ui-datepicker-week-end" : "") + ($ ? " ui-datepicker-other-month" : "") + (M.getTime() === T.getTime() && Z === e.selectedMonth && e._keyEvent || y.getTime() === M.getTime() && y.getTime() === T.getTime() ? " " + this._dayOverClass : "") + (z ? " " + this._unselectableClass + " ui-state-disabled" : "") + ($ && !v ? "" : " " + N[1] + (M.getTime() === G.getTime() ? " " + this._currentClass : "") + (M.getTime() === B.getTime() ? " ui-datepicker-today" : "")) + "'" + ($ && !v || !N[2] ? "" : " title='" + N[2].replace(/'/g, "&#39;") + "'") + (z ? "" : " data-handler='selectDay' data-event='click' data-month='" + M.getMonth() + "' data-year='" + M.getFullYear() + "'") + ">" + ($ && !v ? "&#xa0;" : z ? "<span class='ui-state-default'>" + M.getDate() + "</span>" : "<a class='ui-state-default" + (M.getTime() === B.getTime() ? " ui-state-highlight" : "") + (M.getTime() === G.getTime() ? " ui-state-active" : "") + ($ ? " ui-priority-secondary" : "") + "' href='#'>" + M.getDate() + "</a>") + "</td>", M.setDate(M.getDate() + 1), M = this._daylightSavingAdjust(M);
                        S += O + "</tr>"
                    }
                    Z++, Z > 11 && (Z = 0, ee++), S += "</tbody></table>" + (X ? "</div>" + (V[0] > 0 && I === V[1] - 1 ? "<div class='ui-datepicker-row-break'></div>" : "") : ""), C += S
                }
                x += C
            }
            return x += h, e._keyEvent = !1, x
        },
        _generateMonthYearHeader: function(e, t, i, s, n, o, r, a) {
            var l, h, c, u, d, p, f, m, g = this._get(e, "changeMonth"),
                v = this._get(e, "changeYear"),
                b = this._get(e, "showMonthAfterYear"),
                y = "<div class='ui-datepicker-title'>",
                x = "";
            if (o || !g) x += "<span class='ui-datepicker-month'>" + r[t] + "</span>";
            else {
                for (l = s && s.getFullYear() === i, h = n && n.getFullYear() === i, x += "<select class='ui-datepicker-month' data-handler='selectMonth' data-event='change'>", c = 0; 12 > c; c++)(!l || c >= s.getMonth()) && (!h || n.getMonth() >= c) && (x += "<option value='" + c + "'" + (c === t ? " selected='selected'" : "") + ">" + a[c] + "</option>");
                x += "</select>"
            }
            if (b || (y += x + (!o && g && v ? "" : "&#xa0;")), !e.yearshtml)
                if (e.yearshtml = "", o || !v) y += "<span class='ui-datepicker-year'>" + i + "</span>";
                else {
                    for (u = this._get(e, "yearRange").split(":"), d = (new Date).getFullYear(), p = function(e) { var t = e.match(/c[+\-].*/) ? i + parseInt(e.substring(1), 10) : e.match(/[+\-].*/) ? d + parseInt(e, 10) : parseInt(e, 10); return isNaN(t) ? d : t }, f = p(u[0]), m = Math.max(f, p(u[1] || "")), f = s ? Math.max(f, s.getFullYear()) : f, m = n ? Math.min(m, n.getFullYear()) : m, e.yearshtml += "<select class='ui-datepicker-year' data-handler='selectYear' data-event='change'>"; m >= f; f++) e.yearshtml += "<option value='" + f + "'" + (f === i ? " selected='selected'" : "") + ">" + f + "</option>";
                    e.yearshtml += "</select>", y += e.yearshtml, e.yearshtml = null
                }
            return y += this._get(e, "yearSuffix"), b && (y += (!o && g && v ? "" : "&#xa0;") + x), y += "</div>"
        },
        _adjustInstDate: function(e, t, i) {
            var s = e.drawYear + ("Y" === i ? t : 0),
                n = e.drawMonth + ("M" === i ? t : 0),
                o = Math.min(e.selectedDay, this._getDaysInMonth(s, n)) + ("D" === i ? t : 0),
                r = this._restrictMinMax(e, this._daylightSavingAdjust(new Date(s, n, o)));
            e.selectedDay = r.getDate(), e.drawMonth = e.selectedMonth = r.getMonth(), e.drawYear = e.selectedYear = r.getFullYear(), ("M" === i || "Y" === i) && this._notifyChange(e)
        },
        _restrictMinMax: function(e, t) {
            var i = this._getMinMaxDate(e, "min"),
                s = this._getMinMaxDate(e, "max"),
                n = i && i > t ? i : t;
            return s && n > s ? s : n
        },
        _notifyChange: function(e) {
            var t = this._get(e, "onChangeMonthYear");
            t && t.apply(e.input ? e.input[0] : null, [e.selectedYear, e.selectedMonth + 1, e])
        },
        _getNumberOfMonths: function(e) { var t = this._get(e, "numberOfMonths"); return null == t ? [1, 1] : "number" == typeof t ? [1, t] : t },
        _getMinMaxDate: function(e, t) { return this._determineDate(e, this._get(e, t + "Date"), null) },
        _getDaysInMonth: function(e, t) { return 32 - this._daylightSavingAdjust(new Date(e, t, 32)).getDate() },
        _getFirstDayOfMonth: function(e, t) { return new Date(e, t, 1).getDay() },
        _canAdjustMonth: function(e, t, i, s) {
            var n = this._getNumberOfMonths(e),
                o = this._daylightSavingAdjust(new Date(i, s + (0 > t ? t : n[0] * n[1]), 1));
            return 0 > t && o.setDate(this._getDaysInMonth(o.getFullYear(), o.getMonth())), this._isInRange(e, o)
        },
        _isInRange: function(e, t) {
            var i, s, n = this._getMinMaxDate(e, "min"),
                o = this._getMinMaxDate(e, "max"),
                r = null,
                a = null,
                l = this._get(e, "yearRange");
            return l && (i = l.split(":"), s = (new Date).getFullYear(), r = parseInt(i[0], 10), a = parseInt(i[1], 10), i[0].match(/[+\-].*/) && (r += s), i[1].match(/[+\-].*/) && (a += s)), (!n || t.getTime() >= n.getTime()) && (!o || t.getTime() <= o.getTime()) && (!r || t.getFullYear() >= r) && (!a || a >= t.getFullYear())
        },
        _getFormatConfig: function(e) { var t = this._get(e, "shortYearCutoff"); return t = "string" != typeof t ? t : (new Date).getFullYear() % 100 + parseInt(t, 10), { shortYearCutoff: t, dayNamesShort: this._get(e, "dayNamesShort"), dayNames: this._get(e, "dayNames"), monthNamesShort: this._get(e, "monthNamesShort"), monthNames: this._get(e, "monthNames") } },
        _formatDate: function(e, t, i, s) { t || (e.currentDay = e.selectedDay, e.currentMonth = e.selectedMonth, e.currentYear = e.selectedYear); var n = t ? "object" == typeof t ? t : this._daylightSavingAdjust(new Date(s, i, t)) : this._daylightSavingAdjust(new Date(e.currentYear, e.currentMonth, e.currentDay)); return this.formatDate(this._get(e, "dateFormat"), n, this._getFormatConfig(e)) }
    }), e.fn.datepicker = function(t) {
        if (!this.length) return this;
        e.datepicker.initialized || (e(document).mousedown(e.datepicker._checkExternalClick), e.datepicker.initialized = !0), 0 === e("#" + e.datepicker._mainDivId).length && e("body").append(e.datepicker.dpDiv);
        var i = Array.prototype.slice.call(arguments, 1);
        return "string" != typeof t || "isDisabled" !== t && "getDate" !== t && "widget" !== t ? "option" === t && 2 === arguments.length && "string" == typeof arguments[1] ? e.datepicker["_" + t + "Datepicker"].apply(e.datepicker, [this[0]].concat(i)) : this.each(function() { "string" == typeof t ? e.datepicker["_" + t + "Datepicker"].apply(e.datepicker, [this].concat(i)) : e.datepicker._attachDatepicker(this, t) }) : e.datepicker["_" + t + "Datepicker"].apply(e.datepicker, [this[0]].concat(i))
    }, e.datepicker = new n, e.datepicker.initialized = !1, e.datepicker.uuid = (new Date).getTime(), e.datepicker.version = "1.11.4", e.datepicker, e.widget("ui.dialog", {
        version: "1.11.4",
        options: {
            appendTo: "body",
            autoOpen: !0,
            buttons: [],
            closeOnEscape: !0,
            closeText: "Close",
            dialogClass: "",
            draggable: !0,
            hide: null,
            height: "auto",
            maxHeight: null,
            maxWidth: null,
            minHeight: 150,
            minWidth: 150,
            modal: !1,
            position: {
                my: "center",
                at: "center",
                of: window,
                collision: "fit",
                using: function(t) {
                    var i = e(this).css(t).offset().top;
                    0 > i && e(this).css("top", t.top - i)
                }
            },
            resizable: !0,
            show: null,
            title: null,
            width: 300,
            beforeClose: null,
            close: null,
            drag: null,
            dragStart: null,
            dragStop: null,
            focus: null,
            open: null,
            resize: null,
            resizeStart: null,
            resizeStop: null
        },
        sizeRelatedOptions: { buttons: !0, height: !0, maxHeight: !0, maxWidth: !0, minHeight: !0, minWidth: !0, width: !0 },
        resizableRelatedOptions: { maxHeight: !0, maxWidth: !0, minHeight: !0, minWidth: !0 },
        _create: function() { this.originalCss = { display: this.element[0].style.display, width: this.element[0].style.width, minHeight: this.element[0].style.minHeight, maxHeight: this.element[0].style.maxHeight, height: this.element[0].style.height }, this.originalPosition = { parent: this.element.parent(), index: this.element.parent().children().index(this.element) }, this.originalTitle = this.element.attr("title"), this.options.title = this.options.title || this.originalTitle, this._createWrapper(), this.element.show().removeAttr("title").addClass("ui-dialog-content ui-widget-content").appendTo(this.uiDialog), this._createTitlebar(), this._createButtonPane(), this.options.draggable && e.fn.draggable && this._makeDraggable(), this.options.resizable && e.fn.resizable && this._makeResizable(), this._isOpen = !1, this._trackFocus() },
        _init: function() { this.options.autoOpen && this.open() },
        _appendTo: function() { var t = this.options.appendTo; return t && (t.jquery || t.nodeType) ? e(t) : this.document.find(t || "body").eq(0) },
        _destroy: function() {
            var e, t = this.originalPosition;
            this._untrackInstance(), this._destroyOverlay(), this.element.removeUniqueId().removeClass("ui-dialog-content ui-widget-content").css(this.originalCss).detach(), this.uiDialog.stop(!0, !0).remove(), this.originalTitle && this.element.attr("title", this.originalTitle), e = t.parent.children().eq(t.index), e.length && e[0] !== this.element[0] ? e.before(this.element) : t.parent.append(this.element)
        },
        widget: function() { return this.uiDialog },
        disable: e.noop,
        enable: e.noop,
        close: function(t) {
            var i, s = this;
            if (this._isOpen && this._trigger("beforeClose", t) !== !1) {
                if (this._isOpen = !1, this._focusedElement = null, this._destroyOverlay(), this._untrackInstance(), !this.opener.filter(":focusable").focus().length) try { i = this.document[0].activeElement, i && "body" !== i.nodeName.toLowerCase() && e(i).blur() } catch (n) {}
                this._hide(this.uiDialog, this.options.hide, function() { s._trigger("close", t) })
            }
        },
        isOpen: function() { return this._isOpen },
        moveToTop: function() { this._moveToTop() },
        _moveToTop: function(t, i) {
            var s = !1,
                n = this.uiDialog.siblings(".ui-front:visible").map(function() { return +e(this).css("z-index") }).get(),
                o = Math.max.apply(null, n);
            return o >= +this.uiDialog.css("z-index") && (this.uiDialog.css("z-index", o + 1), s = !0), s && !i && this._trigger("focus", t), s
        },
        open: function() { var t = this; return this._isOpen ? void(this._moveToTop() && this._focusTabbable()) : (this._isOpen = !0, this.opener = e(this.document[0].activeElement), this._size(), this._position(), this._createOverlay(), this._moveToTop(null, !0), this.overlay && this.overlay.css("z-index", this.uiDialog.css("z-index") - 1), this._show(this.uiDialog, this.options.show, function() { t._focusTabbable(), t._trigger("focus") }), this._makeFocusTarget(), void this._trigger("open")) },
        _focusTabbable: function() {
            var e = this._focusedElement;
            e || (e = this.element.find("[autofocus]")), e.length || (e = this.element.find(":tabbable")), e.length || (e = this.uiDialogButtonPane.find(":tabbable")), e.length || (e = this.uiDialogTitlebarClose.filter(":tabbable")), e.length || (e = this.uiDialog), e.eq(0).focus()
        },
        _keepFocus: function(t) {
            function i() {
                var t = this.document[0].activeElement,
                    i = this.uiDialog[0] === t || e.contains(this.uiDialog[0], t);
                i || this._focusTabbable()
            }
            t.preventDefault(), i.call(this), this._delay(i)
        },
        _createWrapper: function() {
            this.uiDialog = e("<div>").addClass("ui-dialog ui-widget ui-widget-content ui-corner-all ui-front " + this.options.dialogClass).hide().attr({ tabIndex: -1, role: "dialog" }).appendTo(this._appendTo()), this._on(this.uiDialog, {
                keydown: function(t) {
                    if (this.options.closeOnEscape && !t.isDefaultPrevented() && t.keyCode && t.keyCode === e.ui.keyCode.ESCAPE) return t.preventDefault(), void this.close(t);
                    if (t.keyCode === e.ui.keyCode.TAB && !t.isDefaultPrevented()) {
                        var i = this.uiDialog.find(":tabbable"),
                            s = i.filter(":first"),
                            n = i.filter(":last");
                        t.target !== n[0] && t.target !== this.uiDialog[0] || t.shiftKey ? t.target !== s[0] && t.target !== this.uiDialog[0] || !t.shiftKey || (this._delay(function() { n.focus() }), t.preventDefault()) : (this._delay(function() { s.focus() }), t.preventDefault())
                    }
                },
                mousedown: function(e) { this._moveToTop(e) && this._focusTabbable() }
            }), this.element.find("[aria-describedby]").length || this.uiDialog.attr({ "aria-describedby": this.element.uniqueId().attr("id") })
        },
        _createTitlebar: function() {
            var t;
            this.uiDialogTitlebar = e("<div>").addClass("ui-dialog-titlebar ui-widget-header ui-corner-all ui-helper-clearfix").prependTo(this.uiDialog), this._on(this.uiDialogTitlebar, { mousedown: function(t) { e(t.target).closest(".ui-dialog-titlebar-close") || this.uiDialog.focus() } }), this.uiDialogTitlebarClose = e("<button type='button'></button>").button({ label: this.options.closeText, icons: { primary: "ui-icon-closethick" }, text: !1 }).addClass("ui-dialog-titlebar-close").appendTo(this.uiDialogTitlebar), this._on(this.uiDialogTitlebarClose, { click: function(e) { e.preventDefault(), this.close(e) } }), t = e("<span>").uniqueId().addClass("ui-dialog-title").prependTo(this.uiDialogTitlebar), this._title(t), this.uiDialog.attr({ "aria-labelledby": t.attr("id") })
        },
        _title: function(e) { this.options.title || e.html("&#160;"), e.text(this.options.title) },
        _createButtonPane: function() { this.uiDialogButtonPane = e("<div>").addClass("ui-dialog-buttonpane ui-widget-content ui-helper-clearfix"), this.uiButtonSet = e("<div>").addClass("ui-dialog-buttonset").appendTo(this.uiDialogButtonPane), this._createButtons() },
        _createButtons: function() {
            var t = this,
                i = this.options.buttons;
            return this.uiDialogButtonPane.remove(), this.uiButtonSet.empty(), e.isEmptyObject(i) || e.isArray(i) && !i.length ? void this.uiDialog.removeClass("ui-dialog-buttons") : (e.each(i, function(i, s) {
                var n, o;
                s = e.isFunction(s) ? { click: s, text: i } : s, s = e.extend({ type: "button" }, s), n = s.click, s.click = function() { n.apply(t.element[0], arguments) }, o = { icons: s.icons, text: s.showText }, delete s.icons, delete s.showText, e("<button></button>", s).button(o).appendTo(t.uiButtonSet)
            }), this.uiDialog.addClass("ui-dialog-buttons"), void this.uiDialogButtonPane.appendTo(this.uiDialog))
        },
        _makeDraggable: function() {
            function t(e) { return { position: e.position, offset: e.offset } }
            var i = this,
                s = this.options;
            this.uiDialog.draggable({
                cancel: ".ui-dialog-content, .ui-dialog-titlebar-close",
                handle: ".ui-dialog-titlebar",
                containment: "document",
                start: function(s, n) { e(this).addClass("ui-dialog-dragging"), i._blockFrames(), i._trigger("dragStart", s, t(n)) },
                drag: function(e, s) { i._trigger("drag", e, t(s)) },
                stop: function(n, o) {
                    var r = o.offset.left - i.document.scrollLeft(),
                        a = o.offset.top - i.document.scrollTop();
                    s.position = { my: "left top", at: "left" + (r >= 0 ? "+" : "") + r + " top" + (a >= 0 ? "+" : "") + a, of: i.window }, e(this).removeClass("ui-dialog-dragging"), i._unblockFrames(), i._trigger("dragStop", n, t(o))
                }
            })
        },
        _makeResizable: function() {
            function t(e) { return { originalPosition: e.originalPosition, originalSize: e.originalSize, position: e.position, size: e.size } }
            var i = this,
                s = this.options,
                n = s.resizable,
                o = this.uiDialog.css("position"),
                r = "string" == typeof n ? n : "n,e,s,w,se,sw,ne,nw";
            this.uiDialog.resizable({
                cancel: ".ui-dialog-content",
                containment: "document",
                alsoResize: this.element,
                maxWidth: s.maxWidth,
                maxHeight: s.maxHeight,
                minWidth: s.minWidth,
                minHeight: this._minHeight(),
                handles: r,
                start: function(s, n) { e(this).addClass("ui-dialog-resizing"), i._blockFrames(), i._trigger("resizeStart", s, t(n)) },
                resize: function(e, s) { i._trigger("resize", e, t(s)) },
                stop: function(n, o) {
                    var r = i.uiDialog.offset(),
                        a = r.left - i.document.scrollLeft(),
                        l = r.top - i.document.scrollTop();
                    s.height = i.uiDialog.height(), s.width = i.uiDialog.width(), s.position = { my: "left top", at: "left" + (a >= 0 ? "+" : "") + a + " top" + (l >= 0 ? "+" : "") + l, of: i.window }, e(this).removeClass("ui-dialog-resizing"), i._unblockFrames(), i._trigger("resizeStop", n, t(o))
                }
            }).css("position", o)
        },
        _trackFocus: function() { this._on(this.widget(), { focusin: function(t) { this._makeFocusTarget(), this._focusedElement = e(t.target) } }) },
        _makeFocusTarget: function() { this._untrackInstance(), this._trackingInstances().unshift(this) },
        _untrackInstance: function() {
            var t = this._trackingInstances(),
                i = e.inArray(this, t); - 1 !== i && t.splice(i, 1)
        },
        _trackingInstances: function() { var e = this.document.data("ui-dialog-instances"); return e || (e = [], this.document.data("ui-dialog-instances", e)), e },
        _minHeight: function() { var e = this.options; return "auto" === e.height ? e.minHeight : Math.min(e.minHeight, e.height) },
        _position: function() {
            var e = this.uiDialog.is(":visible");
            e || this.uiDialog.show(), this.uiDialog.position(this.options.position), e || this.uiDialog.hide()
        },
        _setOptions: function(t) {
            var i = this,
                s = !1,
                n = {};
            e.each(t, function(e, t) { i._setOption(e, t), e in i.sizeRelatedOptions && (s = !0), e in i.resizableRelatedOptions && (n[e] = t) }), s && (this._size(), this._position()), this.uiDialog.is(":data(ui-resizable)") && this.uiDialog.resizable("option", n)
        },
        _setOption: function(e, t) { var i, s, n = this.uiDialog; "dialogClass" === e && n.removeClass(this.options.dialogClass).addClass(t), "disabled" !== e && (this._super(e, t), "appendTo" === e && this.uiDialog.appendTo(this._appendTo()), "buttons" === e && this._createButtons(), "closeText" === e && this.uiDialogTitlebarClose.button({ label: "" + t }), "draggable" === e && (i = n.is(":data(ui-draggable)"), i && !t && n.draggable("destroy"), !i && t && this._makeDraggable()), "position" === e && this._position(), "resizable" === e && (s = n.is(":data(ui-resizable)"), s && !t && n.resizable("destroy"), s && "string" == typeof t && n.resizable("option", "handles", t), s || t === !1 || this._makeResizable()), "title" === e && this._title(this.uiDialogTitlebar.find(".ui-dialog-title"))) },
        _size: function() {
            var e, t, i, s = this.options;
            this.element.show().css({ width: "auto", minHeight: 0, maxHeight: "none", height: 0 }), s.minWidth > s.width && (s.width = s.minWidth), e = this.uiDialog.css({ height: "auto", width: s.width }).outerHeight(), t = Math.max(0, s.minHeight - e), i = "number" == typeof s.maxHeight ? Math.max(0, s.maxHeight - e) : "none", "auto" === s.height ? this.element.css({
                minHeight: t,
                maxHeight: i,
                height: "auto"
            }) : this.element.height(Math.max(0, s.height - e)), this.uiDialog.is(":data(ui-resizable)") && this.uiDialog.resizable("option", "minHeight", this._minHeight())
        },
        _blockFrames: function() { this.iframeBlocks = this.document.find("iframe").map(function() { var t = e(this); return e("<div>").css({ position: "absolute", width: t.outerWidth(), height: t.outerHeight() }).appendTo(t.parent()).offset(t.offset())[0] }) },
        _unblockFrames: function() { this.iframeBlocks && (this.iframeBlocks.remove(), delete this.iframeBlocks) },
        _allowInteraction: function(t) { return e(t.target).closest(".ui-dialog").length ? !0 : !!e(t.target).closest(".ui-datepicker").length },
        _createOverlay: function() {
            if (this.options.modal) {
                var t = !0;
                this._delay(function() { t = !1 }), this.document.data("ui-dialog-overlays") || this._on(this.document, { focusin: function(e) { t || this._allowInteraction(e) || (e.preventDefault(), this._trackingInstances()[0]._focusTabbable()) } }), this.overlay = e("<div>").addClass("ui-widget-overlay ui-front").appendTo(this._appendTo()), this._on(this.overlay, { mousedown: "_keepFocus" }), this.document.data("ui-dialog-overlays", (this.document.data("ui-dialog-overlays") || 0) + 1)
            }
        },
        _destroyOverlay: function() {
            if (this.options.modal && this.overlay) {
                var e = this.document.data("ui-dialog-overlays") - 1;
                e ? this.document.data("ui-dialog-overlays", e) : this.document.unbind("focusin").removeData("ui-dialog-overlays"), this.overlay.remove(), this.overlay = null
            }
        }
    }), e.widget("ui.progressbar", {
        version: "1.11.4",
        options: { max: 100, value: 0, change: null, complete: null },
        min: 0,
        _create: function() { this.oldValue = this.options.value = this._constrainedValue(), this.element.addClass("ui-progressbar ui-widget ui-widget-content ui-corner-all").attr({ role: "progressbar", "aria-valuemin": this.min }), this.valueDiv = e("<div class='ui-progressbar-value ui-widget-header ui-corner-left'></div>").appendTo(this.element), this._refreshValue() },
        _destroy: function() { this.element.removeClass("ui-progressbar ui-widget ui-widget-content ui-corner-all").removeAttr("role").removeAttr("aria-valuemin").removeAttr("aria-valuemax").removeAttr("aria-valuenow"), this.valueDiv.remove() },
        value: function(e) { return void 0 === e ? this.options.value : (this.options.value = this._constrainedValue(e), void this._refreshValue()) },
        _constrainedValue: function(e) { return void 0 === e && (e = this.options.value), this.indeterminate = e === !1, "number" != typeof e && (e = 0), this.indeterminate ? !1 : Math.min(this.options.max, Math.max(this.min, e)) },
        _setOptions: function(e) {
            var t = e.value;
            delete e.value, this._super(e), this.options.value = this._constrainedValue(t), this._refreshValue()
        },
        _setOption: function(e, t) { "max" === e && (t = Math.max(this.min, t)), "disabled" === e && this.element.toggleClass("ui-state-disabled", !!t).attr("aria-disabled", t), this._super(e, t) },
        _percentage: function() { return this.indeterminate ? 100 : 100 * (this.options.value - this.min) / (this.options.max - this.min) },
        _refreshValue: function() {
            var t = this.options.value,
                i = this._percentage();
            this.valueDiv.toggle(this.indeterminate || t > this.min).toggleClass("ui-corner-right", t === this.options.max).width(i.toFixed(0) + "%"), this.element.toggleClass("ui-progressbar-indeterminate", this.indeterminate), this.indeterminate ? (this.element.removeAttr("aria-valuenow"), this.overlayDiv || (this.overlayDiv = e("<div class='ui-progressbar-overlay'></div>").appendTo(this.valueDiv))) : (this.element.attr({ "aria-valuemax": this.options.max, "aria-valuenow": t }), this.overlayDiv && (this.overlayDiv.remove(), this.overlayDiv = null)), this.oldValue !== t && (this.oldValue = t, this._trigger("change")), t === this.options.max && this._trigger("complete")
        }
    }), e.widget("ui.selectmenu", {
        version: "1.11.4",
        defaultElement: "<select>",
        options: { appendTo: null, disabled: null, icons: { button: "ui-icon-triangle-1-s" }, position: { my: "left top", at: "left bottom", collision: "none" }, width: null, change: null, close: null, focus: null, open: null, select: null },
        _create: function() {
            var e = this.element.uniqueId().attr("id");
            this.ids = { element: e, button: e + "-button", menu: e + "-menu" }, this._drawButton(), this._drawMenu(), this.options.disabled && this.disable()
        },
        _drawButton: function() {
            var t = this;
            this.label = e("label[for='" + this.ids.element + "']").attr("for", this.ids.button), this._on(this.label, { click: function(e) { this.button.focus(), e.preventDefault() } }), this.element.hide(), this.button = e("<span>", { "class": "ui-selectmenu-button ui-widget ui-state-default ui-corner-all", tabindex: this.options.disabled ? -1 : 0, id: this.ids.button, role: "combobox", "aria-expanded": "false", "aria-autocomplete": "list", "aria-owns": this.ids.menu, "aria-haspopup": "true" }).insertAfter(this.element), e("<span>", { "class": "ui-icon " + this.options.icons.button }).prependTo(this.button), this.buttonText = e("<span>", { "class": "ui-selectmenu-text" }).appendTo(this.button), this._setText(this.buttonText, this.element.find("option:selected").text()), this._resizeButton(), this._on(this.button, this._buttonEvents), this.button.one("focusin", function() { t.menuItems || t._refreshMenu() }), this._hoverable(this.button), this._focusable(this.button)
        },
        _drawMenu: function() {
            var t = this;
            this.menu = e("<ul>", { "aria-hidden": "true", "aria-labelledby": this.ids.button, id: this.ids.menu }), this.menuWrap = e("<div>", { "class": "ui-selectmenu-menu ui-front" }).append(this.menu).appendTo(this._appendTo()), this.menuInstance = this.menu.menu({
                role: "listbox",
                select: function(e, i) { e.preventDefault(), t._setSelection(), t._select(i.item.data("ui-selectmenu-item"), e) },
                focus: function(e, i) {
                    var s = i.item.data("ui-selectmenu-item");
                    null != t.focusIndex && s.index !== t.focusIndex && (t._trigger("focus", e, { item: s }), t.isOpen || t._select(s, e)), t.focusIndex = s.index, t.button.attr("aria-activedescendant", t.menuItems.eq(s.index).attr("id"))
                }
            }).menu("instance"), this.menu.addClass("ui-corner-bottom").removeClass("ui-corner-all"), this.menuInstance._off(this.menu, "mouseleave"), this.menuInstance._closeOnDocumentClick = function() { return !1 }, this.menuInstance._isDivider = function() { return !1 }
        },
        refresh: function() { this._refreshMenu(), this._setText(this.buttonText, this._getSelectedItem().text()), this.options.width || this._resizeButton() },
        _refreshMenu: function() {
            this.menu.empty();
            var e, t = this.element.find("option");
            t.length && (this._parseOptions(t), this._renderMenu(this.menu, this.items), this.menuInstance.refresh(), this.menuItems = this.menu.find("li").not(".ui-selectmenu-optgroup"), e = this._getSelectedItem(), this.menuInstance.focus(null, e), this._setAria(e.data("ui-selectmenu-item")), this._setOption("disabled", this.element.prop("disabled")))
        },
        open: function(e) { this.options.disabled || (this.menuItems ? (this.menu.find(".ui-state-focus").removeClass("ui-state-focus"), this.menuInstance.focus(null, this._getSelectedItem())) : this._refreshMenu(), this.isOpen = !0, this._toggleAttr(), this._resizeMenu(), this._position(), this._on(this.document, this._documentClick), this._trigger("open", e)) },
        _position: function() { this.menuWrap.position(e.extend({ of: this.button }, this.options.position)) },
        close: function(e) { this.isOpen && (this.isOpen = !1, this._toggleAttr(), this.range = null, this._off(this.document), this._trigger("close", e)) },
        widget: function() { return this.button },
        menuWidget: function() { return this.menu },
        _renderMenu: function(t, i) {
            var s = this,
                n = "";
            e.each(i, function(i, o) { o.optgroup !== n && (e("<li>", { "class": "ui-selectmenu-optgroup ui-menu-divider" + (o.element.parent("optgroup").prop("disabled") ? " ui-state-disabled" : ""), text: o.optgroup }).appendTo(t), n = o.optgroup), s._renderItemData(t, o) })
        },
        _renderItemData: function(e, t) { return this._renderItem(e, t).data("ui-selectmenu-item", t) },
        _renderItem: function(t, i) { var s = e("<li>"); return i.disabled && s.addClass("ui-state-disabled"), this._setText(s, i.label), s.appendTo(t) },
        _setText: function(e, t) { t ? e.text(t) : e.html("&#160;") },
        _move: function(e, t) {
            var i, s, n = ".ui-menu-item";
            this.isOpen ? i = this.menuItems.eq(this.focusIndex) : (i = this.menuItems.eq(this.element[0].selectedIndex), n += ":not(.ui-state-disabled)"), s = "first" === e || "last" === e ? i["first" === e ? "prevAll" : "nextAll"](n).eq(-1) : i[e + "All"](n).eq(0), s.length && this.menuInstance.focus(t, s)
        },
        _getSelectedItem: function() { return this.menuItems.eq(this.element[0].selectedIndex) },
        _toggle: function(e) { this[this.isOpen ? "close" : "open"](e) },
        _setSelection: function() {
            var e;
            this.range && (window.getSelection ? (e = window.getSelection(), e.removeAllRanges(), e.addRange(this.range)) : this.range.select(), this.button.focus())
        },
        _documentClick: { mousedown: function(t) { this.isOpen && (e(t.target).closest(".ui-selectmenu-menu, #" + this.ids.button).length || this.close(t)) } },
        _buttonEvents: {
            mousedown: function() {
                var e;
                window.getSelection ? (e = window.getSelection(), e.rangeCount && (this.range = e.getRangeAt(0))) : this.range = document.selection.createRange()
            },
            click: function(e) { this._setSelection(), this._toggle(e) },
            keydown: function(t) {
                var i = !0;
                switch (t.keyCode) {
                    case e.ui.keyCode.TAB:
                    case e.ui.keyCode.ESCAPE:
                        this.close(t), i = !1;
                        break;
                    case e.ui.keyCode.ENTER:
                        this.isOpen && this._selectFocusedItem(t);
                        break;
                    case e.ui.keyCode.UP:
                        t.altKey ? this._toggle(t) : this._move("prev", t);
                        break;
                    case e.ui.keyCode.DOWN:
                        t.altKey ? this._toggle(t) : this._move("next", t);
                        break;
                    case e.ui.keyCode.SPACE:
                        this.isOpen ? this._selectFocusedItem(t) : this._toggle(t);
                        break;
                    case e.ui.keyCode.LEFT:
                        this._move("prev", t);
                        break;
                    case e.ui.keyCode.RIGHT:
                        this._move("next", t);
                        break;
                    case e.ui.keyCode.HOME:
                    case e.ui.keyCode.PAGE_UP:
                        this._move("first", t);
                        break;
                    case e.ui.keyCode.END:
                    case e.ui.keyCode.PAGE_DOWN:
                        this._move("last", t);
                        break;
                    default:
                        this.menu.trigger(t), i = !1
                }
                i && t.preventDefault()
            }
        },
        _selectFocusedItem: function(e) {
            var t = this.menuItems.eq(this.focusIndex);
            t.hasClass("ui-state-disabled") || this._select(t.data("ui-selectmenu-item"), e)
        },
        _select: function(e, t) {
            var i = this.element[0].selectedIndex;
            this.element[0].selectedIndex = e.index, this._setText(this.buttonText, e.label), this._setAria(e), this._trigger("select", t, { item: e }), e.index !== i && this._trigger("change", t, { item: e }), this.close(t)
        },
        _setAria: function(e) {
            var t = this.menuItems.eq(e.index).attr("id");
            this.button.attr({ "aria-labelledby": t, "aria-activedescendant": t }), this.menu.attr("aria-activedescendant", t)
        },
        _setOption: function(e, t) { "icons" === e && this.button.find("span.ui-icon").removeClass(this.options.icons.button).addClass(t.button), this._super(e, t), "appendTo" === e && this.menuWrap.appendTo(this._appendTo()), "disabled" === e && (this.menuInstance.option("disabled", t), this.button.toggleClass("ui-state-disabled", t).attr("aria-disabled", t), this.element.prop("disabled", t), t ? (this.button.attr("tabindex", -1), this.close()) : this.button.attr("tabindex", 0)), "width" === e && this._resizeButton() },
        _appendTo: function() { var t = this.options.appendTo; return t && (t = t.jquery || t.nodeType ? e(t) : this.document.find(t).eq(0)), t && t[0] || (t = this.element.closest(".ui-front")), t.length || (t = this.document[0].body), t },
        _toggleAttr: function() { this.button.toggleClass("ui-corner-top", this.isOpen).toggleClass("ui-corner-all", !this.isOpen).attr("aria-expanded", this.isOpen), this.menuWrap.toggleClass("ui-selectmenu-open", this.isOpen), this.menu.attr("aria-hidden", !this.isOpen) },
        _resizeButton: function() {
            var e = this.options.width;
            e || (e = this.element.show().outerWidth(), this.element.hide()), this.button.outerWidth(e)
        },
        _resizeMenu: function() { this.menu.outerWidth(Math.max(this.button.outerWidth(), this.menu.width("").outerWidth() + 1)) },
        _getCreateOptions: function() { return { disabled: this.element.prop("disabled") } },
        _parseOptions: function(t) {
            var i = [];
            t.each(function(t, s) {
                var n = e(s),
                    o = n.parent("optgroup");
                i.push({ element: n, index: t, value: n.val(), label: n.text(), optgroup: o.attr("label") || "", disabled: o.prop("disabled") || n.prop("disabled") })
            }), this.items = i
        },
        _destroy: function() { this.menuWrap.remove(), this.button.remove(), this.element.show(), this.element.removeUniqueId(), this.label.attr("for", this.ids.element) }
    }), e.widget("ui.slider", e.ui.mouse, {
        version: "1.11.4",
        widgetEventPrefix: "slide",
        options: { animate: !1, distance: 0, max: 100, min: 0, orientation: "horizontal", range: !1, step: 1, value: 0, values: null, change: null, slide: null, start: null, stop: null },
        numPages: 5,
        _create: function() { this._keySliding = !1, this._mouseSliding = !1, this._animateOff = !0, this._handleIndex = null, this._detectOrientation(), this._mouseInit(), this._calculateNewMax(), this.element.addClass("ui-slider ui-slider-" + this.orientation + " ui-widget ui-widget-content ui-corner-all"), this._refresh(), this._setOption("disabled", this.options.disabled), this._animateOff = !1 },
        _refresh: function() { this._createRange(), this._createHandles(), this._setupEvents(), this._refreshValue() },
        _createHandles: function() {
            var t, i, s = this.options,
                n = this.element.find(".ui-slider-handle").addClass("ui-state-default ui-corner-all"),
                o = "<span class='ui-slider-handle ui-state-default ui-corner-all' tabindex='0'></span>",
                r = [];
            for (i = s.values && s.values.length || 1, n.length > i && (n.slice(i).remove(), n = n.slice(0, i)), t = n.length; i > t; t++) r.push(o);
            this.handles = n.add(e(r.join("")).appendTo(this.element)), this.handle = this.handles.eq(0), this.handles.each(function(t) { e(this).data("ui-slider-handle-index", t) })
        },
        _createRange: function() {
            var t = this.options,
                i = "";
            t.range ? (t.range === !0 && (t.values ? t.values.length && 2 !== t.values.length ? t.values = [t.values[0], t.values[0]] : e.isArray(t.values) && (t.values = t.values.slice(0)) : t.values = [this._valueMin(), this._valueMin()]), this.range && this.range.length ? this.range.removeClass("ui-slider-range-min ui-slider-range-max").css({ left: "", bottom: "" }) : (this.range = e("<div></div>").appendTo(this.element), i = "ui-slider-range ui-widget-header ui-corner-all"), this.range.addClass(i + ("min" === t.range || "max" === t.range ? " ui-slider-range-" + t.range : ""))) : (this.range && this.range.remove(), this.range = null)
        },
        _setupEvents: function() { this._off(this.handles), this._on(this.handles, this._handleEvents), this._hoverable(this.handles), this._focusable(this.handles) },
        _destroy: function() { this.handles.remove(), this.range && this.range.remove(), this.element.removeClass("ui-slider ui-slider-horizontal ui-slider-vertical ui-widget ui-widget-content ui-corner-all"), this._mouseDestroy() },
        _mouseCapture: function(t) {
            var i, s, n, o, r, a, l, h, c = this,
                u = this.options;
            return u.disabled ? !1 : (this.elementSize = { width: this.element.outerWidth(), height: this.element.outerHeight() }, this.elementOffset = this.element.offset(), i = { x: t.pageX, y: t.pageY }, s = this._normValueFromMouse(i), n = this._valueMax() - this._valueMin() + 1, this.handles.each(function(t) {
                var i = Math.abs(s - c.values(t));
                (n > i || n === i && (t === c._lastChangedValue || c.values(t) === u.min)) && (n = i, o = e(this), r = t)
            }), a = this._start(t, r), a === !1 ? !1 : (this._mouseSliding = !0, this._handleIndex = r, o.addClass("ui-state-active").focus(), l = o.offset(), h = !e(t.target).parents().addBack().is(".ui-slider-handle"), this._clickOffset = h ? { left: 0, top: 0 } : { left: t.pageX - l.left - o.width() / 2, top: t.pageY - l.top - o.height() / 2 - (parseInt(o.css("borderTopWidth"), 10) || 0) - (parseInt(o.css("borderBottomWidth"), 10) || 0) + (parseInt(o.css("marginTop"), 10) || 0) }, this.handles.hasClass("ui-state-hover") || this._slide(t, r, s), this._animateOff = !0, !0))
        },
        _mouseStart: function() { return !0 },
        _mouseDrag: function(e) {
            var t = { x: e.pageX, y: e.pageY },
                i = this._normValueFromMouse(t);
            return this._slide(e, this._handleIndex, i), !1
        },
        _mouseStop: function(e) { return this.handles.removeClass("ui-state-active"), this._mouseSliding = !1, this._stop(e, this._handleIndex), this._change(e, this._handleIndex), this._handleIndex = null, this._clickOffset = null, this._animateOff = !1, !1 },
        _detectOrientation: function() { this.orientation = "vertical" === this.options.orientation ? "vertical" : "horizontal" },
        _normValueFromMouse: function(e) { var t, i, s, n, o; return "horizontal" === this.orientation ? (t = this.elementSize.width, i = e.x - this.elementOffset.left - (this._clickOffset ? this._clickOffset.left : 0)) : (t = this.elementSize.height, i = e.y - this.elementOffset.top - (this._clickOffset ? this._clickOffset.top : 0)), s = i / t, s > 1 && (s = 1), 0 > s && (s = 0), "vertical" === this.orientation && (s = 1 - s), n = this._valueMax() - this._valueMin(), o = this._valueMin() + s * n, this._trimAlignValue(o) },
        _start: function(e, t) { var i = { handle: this.handles[t], value: this.value() }; return this.options.values && this.options.values.length && (i.value = this.values(t), i.values = this.values()), this._trigger("start", e, i) },
        _slide: function(e, t, i) {
            var s, n, o;
            this.options.values && this.options.values.length ? (s = this.values(t ? 0 : 1), 2 === this.options.values.length && this.options.range === !0 && (0 === t && i > s || 1 === t && s > i) && (i = s), i !== this.values(t) && (n = this.values(), n[t] = i, o = this._trigger("slide", e, { handle: this.handles[t], value: i, values: n }), s = this.values(t ? 0 : 1), o !== !1 && this.values(t, i))) : i !== this.value() && (o = this._trigger("slide", e, { handle: this.handles[t], value: i }), o !== !1 && this.value(i))
        },
        _stop: function(e, t) {
            var i = { handle: this.handles[t], value: this.value() };
            this.options.values && this.options.values.length && (i.value = this.values(t), i.values = this.values()), this._trigger("stop", e, i)
        },
        _change: function(e, t) {
            if (!this._keySliding && !this._mouseSliding) {
                var i = { handle: this.handles[t], value: this.value() };
                this.options.values && this.options.values.length && (i.value = this.values(t), i.values = this.values()), this._lastChangedValue = t, this._trigger("change", e, i)
            }
        },
        value: function(e) { return arguments.length ? (this.options.value = this._trimAlignValue(e), this._refreshValue(), void this._change(null, 0)) : this._value() },
        values: function(t, i) {
            var s, n, o;
            if (arguments.length > 1) return this.options.values[t] = this._trimAlignValue(i), this._refreshValue(), void this._change(null, t);
            if (!arguments.length) return this._values();
            if (!e.isArray(arguments[0])) return this.options.values && this.options.values.length ? this._values(t) : this.value();
            for (s = this.options.values, n = arguments[0], o = 0; s.length > o; o += 1) s[o] = this._trimAlignValue(n[o]), this._change(null, o);
            this._refreshValue()
        },
        _setOption: function(t, i) {
            var s, n = 0;
            switch ("range" === t && this.options.range === !0 && ("min" === i ? (this.options.value = this._values(0), this.options.values = null) : "max" === i && (this.options.value = this._values(this.options.values.length - 1), this.options.values = null)), e.isArray(this.options.values) && (n = this.options.values.length), "disabled" === t && this.element.toggleClass("ui-state-disabled", !!i), this._super(t, i), t) {
                case "orientation":
                    this._detectOrientation(), this.element.removeClass("ui-slider-horizontal ui-slider-vertical").addClass("ui-slider-" + this.orientation), this._refreshValue(), this.handles.css("horizontal" === i ? "bottom" : "left", "");
                    break;
                case "value":
                    this._animateOff = !0, this._refreshValue(), this._change(null, 0), this._animateOff = !1;
                    break;
                case "values":
                    for (this._animateOff = !0, this._refreshValue(), s = 0; n > s; s += 1) this._change(null, s);
                    this._animateOff = !1;
                    break;
                case "step":
                case "min":
                case "max":
                    this._animateOff = !0, this._calculateNewMax(), this._refreshValue(), this._animateOff = !1;
                    break;
                case "range":
                    this._animateOff = !0, this._refresh(), this._animateOff = !1
            }
        },
        _value: function() { var e = this.options.value; return e = this._trimAlignValue(e) },
        _values: function(e) { var t, i, s; if (arguments.length) return t = this.options.values[e], t = this._trimAlignValue(t); if (this.options.values && this.options.values.length) { for (i = this.options.values.slice(), s = 0; i.length > s; s += 1) i[s] = this._trimAlignValue(i[s]); return i } return [] },
        _trimAlignValue: function(e) {
            if (this._valueMin() >= e) return this._valueMin();
            if (e >= this._valueMax()) return this._valueMax();
            var t = this.options.step > 0 ? this.options.step : 1,
                i = (e - this._valueMin()) % t,
                s = e - i;
            return 2 * Math.abs(i) >= t && (s += i > 0 ? t : -t), parseFloat(s.toFixed(5))
        },
        _calculateNewMax: function() {
            var e = this.options.max,
                t = this._valueMin(),
                i = this.options.step,
                s = Math.floor(+(e - t).toFixed(this._precision()) / i) * i;
            e = s + t, this.max = parseFloat(e.toFixed(this._precision()))
        },
        _precision: function() { var e = this._precisionOf(this.options.step); return null !== this.options.min && (e = Math.max(e, this._precisionOf(this.options.min))), e },
        _precisionOf: function(e) {
            var t = "" + e,
                i = t.indexOf(".");
            return -1 === i ? 0 : t.length - i - 1
        },
        _valueMin: function() { return this.options.min },
        _valueMax: function() { return this.max },
        _refreshValue: function() {
            var t, i, s, n, o, r = this.options.range,
                a = this.options,
                l = this,
                h = this._animateOff ? !1 : a.animate,
                c = {};
            this.options.values && this.options.values.length ? this.handles.each(function(s) { i = 100 * ((l.values(s) - l._valueMin()) / (l._valueMax() - l._valueMin())), c["horizontal" === l.orientation ? "left" : "bottom"] = i + "%", e(this).stop(1, 1)[h ? "animate" : "css"](c, a.animate), l.options.range === !0 && ("horizontal" === l.orientation ? (0 === s && l.range.stop(1, 1)[h ? "animate" : "css"]({ left: i + "%" }, a.animate), 1 === s && l.range[h ? "animate" : "css"]({ width: i - t + "%" }, { queue: !1, duration: a.animate })) : (0 === s && l.range.stop(1, 1)[h ? "animate" : "css"]({ bottom: i + "%" }, a.animate), 1 === s && l.range[h ? "animate" : "css"]({ height: i - t + "%" }, { queue: !1, duration: a.animate }))), t = i }) : (s = this.value(), n = this._valueMin(), o = this._valueMax(), i = o !== n ? 100 * ((s - n) / (o - n)) : 0, c["horizontal" === this.orientation ? "left" : "bottom"] = i + "%", this.handle.stop(1, 1)[h ? "animate" : "css"](c, a.animate), "min" === r && "horizontal" === this.orientation && this.range.stop(1, 1)[h ? "animate" : "css"]({ width: i + "%" }, a.animate), "max" === r && "horizontal" === this.orientation && this.range[h ? "animate" : "css"]({ width: 100 - i + "%" }, { queue: !1, duration: a.animate }), "min" === r && "vertical" === this.orientation && this.range.stop(1, 1)[h ? "animate" : "css"]({ height: i + "%" }, a.animate), "max" === r && "vertical" === this.orientation && this.range[h ? "animate" : "css"]({ height: 100 - i + "%" }, { queue: !1, duration: a.animate }))
        },
        _handleEvents: {
            keydown: function(t) {
                var i, s, n, o, r = e(t.target).data("ui-slider-handle-index");
                switch (t.keyCode) {
                    case e.ui.keyCode.HOME:
                    case e.ui.keyCode.END:
                    case e.ui.keyCode.PAGE_UP:
                    case e.ui.keyCode.PAGE_DOWN:
                    case e.ui.keyCode.UP:
                    case e.ui.keyCode.RIGHT:
                    case e.ui.keyCode.DOWN:
                    case e.ui.keyCode.LEFT:
                        if (t.preventDefault(), !this._keySliding && (this._keySliding = !0, e(t.target).addClass("ui-state-active"), i = this._start(t, r), i === !1)) return
                }
                switch (o = this.options.step, s = n = this.options.values && this.options.values.length ? this.values(r) : this.value(), t.keyCode) {
                    case e.ui.keyCode.HOME:
                        n = this._valueMin();
                        break;
                    case e.ui.keyCode.END:
                        n = this._valueMax();
                        break;
                    case e.ui.keyCode.PAGE_UP:
                        n = this._trimAlignValue(s + (this._valueMax() - this._valueMin()) / this.numPages);
                        break;
                    case e.ui.keyCode.PAGE_DOWN:
                        n = this._trimAlignValue(s - (this._valueMax() - this._valueMin()) / this.numPages);
                        break;
                    case e.ui.keyCode.UP:
                    case e.ui.keyCode.RIGHT:
                        if (s === this._valueMax()) return;
                        n = this._trimAlignValue(s + o);
                        break;
                    case e.ui.keyCode.DOWN:
                    case e.ui.keyCode.LEFT:
                        if (s === this._valueMin()) return;
                        n = this._trimAlignValue(s - o)
                }
                this._slide(t, r, n)
            },
            keyup: function(t) {
                var i = e(t.target).data("ui-slider-handle-index");
                this._keySliding && (this._keySliding = !1, this._stop(t, i), this._change(t, i), e(t.target).removeClass("ui-state-active"))
            }
        }
    }), e.widget("ui.spinner", {
        version: "1.11.4",
        defaultElement: "<input>",
        widgetEventPrefix: "spin",
        options: { culture: null, icons: { down: "ui-icon-triangle-1-s", up: "ui-icon-triangle-1-n" }, incremental: !0, max: null, min: null, numberFormat: null, page: 10, step: 1, change: null, spin: null, start: null, stop: null },
        _create: function() { this._setOption("max", this.options.max), this._setOption("min", this.options.min), this._setOption("step", this.options.step), "" !== this.value() && this._value(this.element.val(), !0), this._draw(), this._on(this._events), this._refresh(), this._on(this.window, { beforeunload: function() { this.element.removeAttr("autocomplete") } }) },
        _getCreateOptions: function() {
            var t = {},
                i = this.element;
            return e.each(["min", "max", "step"], function(e, s) {
                var n = i.attr(s);
                void 0 !== n && n.length && (t[s] = n)
            }), t
        },
        _events: {
            keydown: function(e) { this._start(e) && this._keydown(e) && e.preventDefault() },
            keyup: "_stop",
            focus: function() { this.previous = this.element.val() },
            blur: function(e) { return this.cancelBlur ? void delete this.cancelBlur : (this._stop(), this._refresh(), void(this.previous !== this.element.val() && this._trigger("change", e))) },
            mousewheel: function(e, t) {
                if (t) {
                    if (!this.spinning && !this._start(e)) return !1;
                    this._spin((t > 0 ? 1 : -1) * this.options.step, e), clearTimeout(this.mousewheelTimer), this.mousewheelTimer = this._delay(function() { this.spinning && this._stop(e) }, 100), e.preventDefault()
                }
            },
            "mousedown .ui-spinner-button": function(t) {
                function i() {
                    var e = this.element[0] === this.document[0].activeElement;
                    e || (this.element.focus(), this.previous = s, this._delay(function() { this.previous = s }))
                }
                var s;
                s = this.element[0] === this.document[0].activeElement ? this.previous : this.element.val(), t.preventDefault(), i.call(this), this.cancelBlur = !0, this._delay(function() { delete this.cancelBlur, i.call(this) }), this._start(t) !== !1 && this._repeat(null, e(t.currentTarget).hasClass("ui-spinner-up") ? 1 : -1, t)
            },
            "mouseup .ui-spinner-button": "_stop",
            "mouseenter .ui-spinner-button": function(t) { return e(t.currentTarget).hasClass("ui-state-active") ? this._start(t) === !1 ? !1 : void this._repeat(null, e(t.currentTarget).hasClass("ui-spinner-up") ? 1 : -1, t) : void 0 },
            "mouseleave .ui-spinner-button": "_stop"
        },
        _draw: function() {
            var e = this.uiSpinner = this.element.addClass("ui-spinner-input").attr("autocomplete", "off").wrap(this._uiSpinnerHtml()).parent().append(this._buttonHtml());
            this.element.attr("role", "spinbutton"), this.buttons = e.find(".ui-spinner-button").attr("tabIndex", -1).button().removeClass("ui-corner-all"), this.buttons.height() > Math.ceil(.5 * e.height()) && e.height() > 0 && e.height(e.height()), this.options.disabled && this.disable()
        },
        _keydown: function(t) {
            var i = this.options,
                s = e.ui.keyCode;
            switch (t.keyCode) {
                case s.UP:
                    return this._repeat(null, 1, t), !0;
                case s.DOWN:
                    return this._repeat(null, -1, t), !0;
                case s.PAGE_UP:
                    return this._repeat(null, i.page, t), !0;
                case s.PAGE_DOWN:
                    return this._repeat(null, -i.page, t), !0
            }
            return !1
        },
        _uiSpinnerHtml: function() { return "<span class='ui-spinner ui-widget ui-widget-content ui-corner-all'></span>" },
        _buttonHtml: function() { return "<a class='ui-spinner-button ui-spinner-up ui-corner-tr'><span class='ui-icon " + this.options.icons.up + "'>&#9650;</span></a><a class='ui-spinner-button ui-spinner-down ui-corner-br'><span class='ui-icon " + this.options.icons.down + "'>&#9660;</span></a>" },
        _start: function(e) { return this.spinning || this._trigger("start", e) !== !1 ? (this.counter || (this.counter = 1), this.spinning = !0, !0) : !1 },
        _repeat: function(e, t, i) { e = e || 500, clearTimeout(this.timer), this.timer = this._delay(function() { this._repeat(40, t, i) }, e), this._spin(t * this.options.step, i) },
        _spin: function(e, t) {
            var i = this.value() || 0;
            this.counter || (this.counter = 1), i = this._adjustValue(i + e * this._increment(this.counter)), this.spinning && this._trigger("spin", t, { value: i }) === !1 || (this._value(i), this.counter++)
        },
        _increment: function(t) { var i = this.options.incremental; return i ? e.isFunction(i) ? i(t) : Math.floor(t * t * t / 5e4 - t * t / 500 + 17 * t / 200 + 1) : 1 },
        _precision: function() { var e = this._precisionOf(this.options.step); return null !== this.options.min && (e = Math.max(e, this._precisionOf(this.options.min))), e },
        _precisionOf: function(e) {
            var t = "" + e,
                i = t.indexOf(".");
            return -1 === i ? 0 : t.length - i - 1
        },
        _adjustValue: function(e) { var t, i, s = this.options; return t = null !== s.min ? s.min : 0, i = e - t, i = Math.round(i / s.step) * s.step, e = t + i, e = parseFloat(e.toFixed(this._precision())), null !== s.max && e > s.max ? s.max : null !== s.min && s.min > e ? s.min : e },
        _stop: function(e) { this.spinning && (clearTimeout(this.timer), clearTimeout(this.mousewheelTimer), this.counter = 0, this.spinning = !1, this._trigger("stop", e)) },
        _setOption: function(e, t) { if ("culture" === e || "numberFormat" === e) { var i = this._parse(this.element.val()); return this.options[e] = t, void this.element.val(this._format(i)) }("max" === e || "min" === e || "step" === e) && "string" == typeof t && (t = this._parse(t)), "icons" === e && (this.buttons.first().find(".ui-icon").removeClass(this.options.icons.up).addClass(t.up), this.buttons.last().find(".ui-icon").removeClass(this.options.icons.down).addClass(t.down)), this._super(e, t), "disabled" === e && (this.widget().toggleClass("ui-state-disabled", !!t), this.element.prop("disabled", !!t), this.buttons.button(t ? "disable" : "enable")) },
        _setOptions: l(function(e) { this._super(e) }),
        _parse: function(e) { return "string" == typeof e && "" !== e && (e = window.Globalize && this.options.numberFormat ? Globalize.parseFloat(e, 10, this.options.culture) : +e), "" === e || isNaN(e) ? null : e },
        _format: function(e) { return "" === e ? "" : window.Globalize && this.options.numberFormat ? Globalize.format(e, this.options.numberFormat, this.options.culture) : e },
        _refresh: function() { this.element.attr({ "aria-valuemin": this.options.min, "aria-valuemax": this.options.max, "aria-valuenow": this._parse(this.element.val()) }) },
        isValid: function() { var e = this.value(); return null === e ? !1 : e === this._adjustValue(e) },
        _value: function(e, t) { var i; "" !== e && (i = this._parse(e), null !== i && (t || (i = this._adjustValue(i)), e = this._format(i))), this.element.val(e), this._refresh() },
        _destroy: function() { this.element.removeClass("ui-spinner-input").prop("disabled", !1).removeAttr("autocomplete").removeAttr("role").removeAttr("aria-valuemin").removeAttr("aria-valuemax").removeAttr("aria-valuenow"), this.uiSpinner.replaceWith(this.element) },
        stepUp: l(function(e) { this._stepUp(e) }),
        _stepUp: function(e) { this._start() && (this._spin((e || 1) * this.options.step), this._stop()) },
        stepDown: l(function(e) { this._stepDown(e) }),
        _stepDown: function(e) { this._start() && (this._spin((e || 1) * -this.options.step), this._stop()) },
        pageUp: l(function(e) { this._stepUp((e || 1) * this.options.page) }),
        pageDown: l(function(e) { this._stepDown((e || 1) * this.options.page) }),
        value: function(e) { return arguments.length ? void l(this._value).call(this, e) : this._parse(this.element.val()) },
        widget: function() { return this.uiSpinner }
    }), e.widget("ui.tabs", {
        version: "1.11.4",
        delay: 300,
        options: { active: null, collapsible: !1, event: "click", heightStyle: "content", hide: null, show: null, activate: null, beforeActivate: null, beforeLoad: null, load: null },
        _isLocal: function() {
            var e = /#.*$/;
            return function(t) {
                var i, s;
                t = t.cloneNode(!1), i = t.href.replace(e, ""), s = location.href.replace(e, "");
                try { i = decodeURIComponent(i) } catch (n) {}
                try { s = decodeURIComponent(s) } catch (n) {}
                return t.hash.length > 1 && i === s
            }
        }(),
        _create: function() {
            var t = this,
                i = this.options;
            this.running = !1, this.element.addClass("ui-tabs ui-widget ui-widget-content ui-corner-all").toggleClass("ui-tabs-collapsible", i.collapsible), this._processTabs(), i.active = this._initialActive(), e.isArray(i.disabled) && (i.disabled = e.unique(i.disabled.concat(e.map(this.tabs.filter(".ui-state-disabled"), function(e) { return t.tabs.index(e) }))).sort()), this.active = this.options.active !== !1 && this.anchors.length ? this._findActive(i.active) : e(), this._refresh(), this.active.length && this.load(i.active)
        },
        _initialActive: function() {
            var t = this.options.active,
                i = this.options.collapsible,
                s = location.hash.substring(1);
            return null === t && (s && this.tabs.each(function(i, n) { return e(n).attr("aria-controls") === s ? (t = i, !1) : void 0 }), null === t && (t = this.tabs.index(this.tabs.filter(".ui-tabs-active"))), (null === t || -1 === t) && (t = this.tabs.length ? 0 : !1)), t !== !1 && (t = this.tabs.index(this.tabs.eq(t)), -1 === t && (t = i ? !1 : 0)), !i && t === !1 && this.anchors.length && (t = 0), t
        },
        _getCreateEventData: function() { return { tab: this.active, panel: this.active.length ? this._getPanelForTab(this.active) : e() } },
        _tabKeydown: function(t) {
            var i = e(this.document[0].activeElement).closest("li"),
                s = this.tabs.index(i),
                n = !0;
            if (!this._handlePageNav(t)) {
                switch (t.keyCode) {
                    case e.ui.keyCode.RIGHT:
                    case e.ui.keyCode.DOWN:
                        s++;
                        break;
                    case e.ui.keyCode.UP:
                    case e.ui.keyCode.LEFT:
                        n = !1, s--;
                        break;
                    case e.ui.keyCode.END:
                        s = this.anchors.length - 1;
                        break;
                    case e.ui.keyCode.HOME:
                        s = 0;
                        break;
                    case e.ui.keyCode.SPACE:
                        return t.preventDefault(), clearTimeout(this.activating), void this._activate(s);
                    case e.ui.keyCode.ENTER:
                        return t.preventDefault(), clearTimeout(this.activating), void this._activate(s === this.options.active ? !1 : s);
                    default:
                        return
                }
                t.preventDefault(), clearTimeout(this.activating), s = this._focusNextTab(s, n), t.ctrlKey || t.metaKey || (i.attr("aria-selected", "false"), this.tabs.eq(s).attr("aria-selected", "true"), this.activating = this._delay(function() { this.option("active", s) }, this.delay))
            }
        },
        _panelKeydown: function(t) { this._handlePageNav(t) || t.ctrlKey && t.keyCode === e.ui.keyCode.UP && (t.preventDefault(), this.active.focus()) },
        _handlePageNav: function(t) { return t.altKey && t.keyCode === e.ui.keyCode.PAGE_UP ? (this._activate(this._focusNextTab(this.options.active - 1, !1)), !0) : t.altKey && t.keyCode === e.ui.keyCode.PAGE_DOWN ? (this._activate(this._focusNextTab(this.options.active + 1, !0)), !0) : void 0 },
        _findNextTab: function(t, i) {
            function s() { return t > n && (t = 0), 0 > t && (t = n), t }
            for (var n = this.tabs.length - 1; - 1 !== e.inArray(s(), this.options.disabled);) t = i ? t + 1 : t - 1;
            return t
        },
        _focusNextTab: function(e, t) { return e = this._findNextTab(e, t), this.tabs.eq(e).focus(), e },
        _setOption: function(e, t) {
            return "active" === e ? void this._activate(t) : "disabled" === e ? void this._setupDisabled(t) : (this._super(e, t), "collapsible" === e && (this.element.toggleClass("ui-tabs-collapsible", t), t || this.options.active !== !1 || this._activate(0)),
                "event" === e && this._setupEvents(t), void("heightStyle" === e && this._setupHeightStyle(t)))
        },
        _sanitizeSelector: function(e) { return e ? e.replace(/[!"$%&'()*+,.\/:;<=>?@\[\]\^`{|}~]/g, "\\$&") : "" },
        refresh: function() {
            var t = this.options,
                i = this.tablist.children(":has(a[href])");
            t.disabled = e.map(i.filter(".ui-state-disabled"), function(e) { return i.index(e) }), this._processTabs(), t.active !== !1 && this.anchors.length ? this.active.length && !e.contains(this.tablist[0], this.active[0]) ? this.tabs.length === t.disabled.length ? (t.active = !1, this.active = e()) : this._activate(this._findNextTab(Math.max(0, t.active - 1), !1)) : t.active = this.tabs.index(this.active) : (t.active = !1, this.active = e()), this._refresh()
        },
        _refresh: function() { this._setupDisabled(this.options.disabled), this._setupEvents(this.options.event), this._setupHeightStyle(this.options.heightStyle), this.tabs.not(this.active).attr({ "aria-selected": "false", "aria-expanded": "false", tabIndex: -1 }), this.panels.not(this._getPanelForTab(this.active)).hide().attr({ "aria-hidden": "true" }), this.active.length ? (this.active.addClass("ui-tabs-active ui-state-active").attr({ "aria-selected": "true", "aria-expanded": "true", tabIndex: 0 }), this._getPanelForTab(this.active).show().attr({ "aria-hidden": "false" })) : this.tabs.eq(0).attr("tabIndex", 0) },
        _processTabs: function() {
            var t = this,
                i = this.tabs,
                s = this.anchors,
                n = this.panels;
            this.tablist = this._getList().addClass("ui-tabs-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all").attr("role", "tablist").delegate("> li", "mousedown" + this.eventNamespace, function(t) { e(this).is(".ui-state-disabled") && t.preventDefault() }).delegate(".ui-tabs-anchor", "focus" + this.eventNamespace, function() { e(this).closest("li").is(".ui-state-disabled") && this.blur() }), this.tabs = this.tablist.find("> li:has(a[href])").addClass("ui-state-default ui-corner-top").attr({ role: "tab", tabIndex: -1 }), this.anchors = this.tabs.map(function() { return e("a", this)[0] }).addClass("ui-tabs-anchor").attr({ role: "presentation", tabIndex: -1 }), this.panels = e(), this.anchors.each(function(i, s) {
                var n, o, r, a = e(s).uniqueId().attr("id"),
                    l = e(s).closest("li"),
                    h = l.attr("aria-controls");
                t._isLocal(s) ? (n = s.hash, r = n.substring(1), o = t.element.find(t._sanitizeSelector(n))) : (r = l.attr("aria-controls") || e({}).uniqueId()[0].id, n = "#" + r, o = t.element.find(n), o.length || (o = t._createPanel(r), o.insertAfter(t.panels[i - 1] || t.tablist)), o.attr("aria-live", "polite")), o.length && (t.panels = t.panels.add(o)), h && l.data("ui-tabs-aria-controls", h), l.attr({ "aria-controls": r, "aria-labelledby": a }), o.attr("aria-labelledby", a)
            }), this.panels.addClass("ui-tabs-panel ui-widget-content ui-corner-bottom").attr("role", "tabpanel"), i && (this._off(i.not(this.tabs)), this._off(s.not(this.anchors)), this._off(n.not(this.panels)))
        },
        _getList: function() { return this.tablist || this.element.find("ol,ul").eq(0) },
        _createPanel: function(t) { return e("<div>").attr("id", t).addClass("ui-tabs-panel ui-widget-content ui-corner-bottom").data("ui-tabs-destroy", !0) },
        _setupDisabled: function(t) {
            e.isArray(t) && (t.length ? t.length === this.anchors.length && (t = !0) : t = !1);
            for (var i, s = 0; i = this.tabs[s]; s++) t === !0 || -1 !== e.inArray(s, t) ? e(i).addClass("ui-state-disabled").attr("aria-disabled", "true") : e(i).removeClass("ui-state-disabled").removeAttr("aria-disabled");
            this.options.disabled = t
        },
        _setupEvents: function(t) {
            var i = {};
            t && e.each(t.split(" "), function(e, t) { i[t] = "_eventHandler" }), this._off(this.anchors.add(this.tabs).add(this.panels)), this._on(!0, this.anchors, { click: function(e) { e.preventDefault() } }), this._on(this.anchors, i), this._on(this.tabs, { keydown: "_tabKeydown" }), this._on(this.panels, { keydown: "_panelKeydown" }), this._focusable(this.tabs), this._hoverable(this.tabs)
        },
        _setupHeightStyle: function(t) {
            var i, s = this.element.parent();
            "fill" === t ? (i = s.height(), i -= this.element.outerHeight() - this.element.height(), this.element.siblings(":visible").each(function() {
                var t = e(this),
                    s = t.css("position");
                "absolute" !== s && "fixed" !== s && (i -= t.outerHeight(!0))
            }), this.element.children().not(this.panels).each(function() { i -= e(this).outerHeight(!0) }), this.panels.each(function() { e(this).height(Math.max(0, i - e(this).innerHeight() + e(this).height())) }).css("overflow", "auto")) : "auto" === t && (i = 0, this.panels.each(function() { i = Math.max(i, e(this).height("").height()) }).height(i))
        },
        _eventHandler: function(t) {
            var i = this.options,
                s = this.active,
                n = e(t.currentTarget),
                o = n.closest("li"),
                r = o[0] === s[0],
                a = r && i.collapsible,
                l = a ? e() : this._getPanelForTab(o),
                h = s.length ? this._getPanelForTab(s) : e(),
                c = { oldTab: s, oldPanel: h, newTab: a ? e() : o, newPanel: l };
            t.preventDefault(), o.hasClass("ui-state-disabled") || o.hasClass("ui-tabs-loading") || this.running || r && !i.collapsible || this._trigger("beforeActivate", t, c) === !1 || (i.active = a ? !1 : this.tabs.index(o), this.active = r ? e() : o, this.xhr && this.xhr.abort(), h.length || l.length || e.error("jQuery UI Tabs: Mismatching fragment identifier."), l.length && this.load(this.tabs.index(o), t), this._toggle(t, c))
        },
        _toggle: function(t, i) {
            function s() { o.running = !1, o._trigger("activate", t, i) }

            function n() { i.newTab.closest("li").addClass("ui-tabs-active ui-state-active"), r.length && o.options.show ? o._show(r, o.options.show, s) : (r.show(), s()) }
            var o = this,
                r = i.newPanel,
                a = i.oldPanel;
            this.running = !0, a.length && this.options.hide ? this._hide(a, this.options.hide, function() { i.oldTab.closest("li").removeClass("ui-tabs-active ui-state-active"), n() }) : (i.oldTab.closest("li").removeClass("ui-tabs-active ui-state-active"), a.hide(), n()), a.attr("aria-hidden", "true"), i.oldTab.attr({ "aria-selected": "false", "aria-expanded": "false" }), r.length && a.length ? i.oldTab.attr("tabIndex", -1) : r.length && this.tabs.filter(function() { return 0 === e(this).attr("tabIndex") }).attr("tabIndex", -1), r.attr("aria-hidden", "false"), i.newTab.attr({ "aria-selected": "true", "aria-expanded": "true", tabIndex: 0 })
        },
        _activate: function(t) {
            var i, s = this._findActive(t);
            s[0] !== this.active[0] && (s.length || (s = this.active), i = s.find(".ui-tabs-anchor")[0], this._eventHandler({ target: i, currentTarget: i, preventDefault: e.noop }))
        },
        _findActive: function(t) { return t === !1 ? e() : this.tabs.eq(t) },
        _getIndex: function(e) { return "string" == typeof e && (e = this.anchors.index(this.anchors.filter("[href$='" + e + "']"))), e },
        _destroy: function() {
            this.xhr && this.xhr.abort(), this.element.removeClass("ui-tabs ui-widget ui-widget-content ui-corner-all ui-tabs-collapsible"), this.tablist.removeClass("ui-tabs-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all").removeAttr("role"), this.anchors.removeClass("ui-tabs-anchor").removeAttr("role").removeAttr("tabIndex").removeUniqueId(), this.tablist.unbind(this.eventNamespace), this.tabs.add(this.panels).each(function() { e.data(this, "ui-tabs-destroy") ? e(this).remove() : e(this).removeClass("ui-state-default ui-state-active ui-state-disabled ui-corner-top ui-corner-bottom ui-widget-content ui-tabs-active ui-tabs-panel").removeAttr("tabIndex").removeAttr("aria-live").removeAttr("aria-busy").removeAttr("aria-selected").removeAttr("aria-labelledby").removeAttr("aria-hidden").removeAttr("aria-expanded").removeAttr("role") }), this.tabs.each(function() {
                var t = e(this),
                    i = t.data("ui-tabs-aria-controls");
                i ? t.attr("aria-controls", i).removeData("ui-tabs-aria-controls") : t.removeAttr("aria-controls")
            }), this.panels.show(), "content" !== this.options.heightStyle && this.panels.css("height", "")
        },
        enable: function(t) {
            var i = this.options.disabled;
            i !== !1 && (void 0 === t ? i = !1 : (t = this._getIndex(t), i = e.isArray(i) ? e.map(i, function(e) { return e !== t ? e : null }) : e.map(this.tabs, function(e, i) { return i !== t ? i : null })), this._setupDisabled(i))
        },
        disable: function(t) {
            var i = this.options.disabled;
            if (i !== !0) {
                if (void 0 === t) i = !0;
                else {
                    if (t = this._getIndex(t), -1 !== e.inArray(t, i)) return;
                    i = e.isArray(i) ? e.merge([t], i).sort() : [t]
                }
                this._setupDisabled(i)
            }
        },
        load: function(t, i) {
            t = this._getIndex(t);
            var s = this,
                n = this.tabs.eq(t),
                o = n.find(".ui-tabs-anchor"),
                r = this._getPanelForTab(n),
                a = { tab: n, panel: r },
                l = function(e, t) { "abort" === t && s.panels.stop(!1, !0), n.removeClass("ui-tabs-loading"), r.removeAttr("aria-busy"), e === s.xhr && delete s.xhr };
            this._isLocal(o[0]) || (this.xhr = e.ajax(this._ajaxSettings(o, i, a)), this.xhr && "canceled" !== this.xhr.statusText && (n.addClass("ui-tabs-loading"), r.attr("aria-busy", "true"), this.xhr.done(function(e, t, n) { setTimeout(function() { r.html(e), s._trigger("load", i, a), l(n, t) }, 1) }).fail(function(e, t) { setTimeout(function() { l(e, t) }, 1) })))
        },
        _ajaxSettings: function(t, i, s) { var n = this; return { url: t.attr("href"), beforeSend: function(t, o) { return n._trigger("beforeLoad", i, e.extend({ jqXHR: t, ajaxSettings: o }, s)) } } },
        _getPanelForTab: function(t) { var i = e(t).attr("aria-controls"); return this.element.find(this._sanitizeSelector("#" + i)) }
    }), e.widget("ui.tooltip", {
        version: "1.11.4",
        options: { content: function() { var t = e(this).attr("title") || ""; return e("<a>").text(t).html() }, hide: !0, items: "[title]:not([disabled])", position: { my: "left top+15", at: "left bottom", collision: "flipfit flip" }, show: !0, tooltipClass: null, track: !1, close: null, open: null },
        _addDescribedBy: function(t, i) {
            var s = (t.attr("aria-describedby") || "").split(/\s+/);
            s.push(i), t.data("ui-tooltip-id", i).attr("aria-describedby", e.trim(s.join(" ")))
        },
        _removeDescribedBy: function(t) {
            var i = t.data("ui-tooltip-id"),
                s = (t.attr("aria-describedby") || "").split(/\s+/),
                n = e.inArray(i, s); - 1 !== n && s.splice(n, 1), t.removeData("ui-tooltip-id"), s = e.trim(s.join(" ")), s ? t.attr("aria-describedby", s) : t.removeAttr("aria-describedby")
        },
        _create: function() { this._on({ mouseover: "open", focusin: "open" }), this.tooltips = {}, this.parents = {}, this.options.disabled && this._disable(), this.liveRegion = e("<div>").attr({ role: "log", "aria-live": "assertive", "aria-relevant": "additions" }).addClass("ui-helper-hidden-accessible").appendTo(this.document[0].body) },
        _setOption: function(t, i) { var s = this; return "disabled" === t ? (this[i ? "_disable" : "_enable"](), void(this.options[t] = i)) : (this._super(t, i), void("content" === t && e.each(this.tooltips, function(e, t) { s._updateContent(t.element) }))) },
        _disable: function() {
            var t = this;
            e.each(this.tooltips, function(i, s) {
                var n = e.Event("blur");
                n.target = n.currentTarget = s.element[0], t.close(n, !0)
            }), this.element.find(this.options.items).addBack().each(function() {
                var t = e(this);
                t.is("[title]") && t.data("ui-tooltip-title", t.attr("title")).removeAttr("title")
            })
        },
        _enable: function() {
            this.element.find(this.options.items).addBack().each(function() {
                var t = e(this);
                t.data("ui-tooltip-title") && t.attr("title", t.data("ui-tooltip-title"))
            })
        },
        open: function(t) {
            var i = this,
                s = e(t ? t.target : this.element).closest(this.options.items);
            s.length && !s.data("ui-tooltip-id") && (s.attr("title") && s.data("ui-tooltip-title", s.attr("title")), s.data("ui-tooltip-open", !0), t && "mouseover" === t.type && s.parents().each(function() {
                var t, s = e(this);
                s.data("ui-tooltip-open") && (t = e.Event("blur"), t.target = t.currentTarget = this, i.close(t, !0)), s.attr("title") && (s.uniqueId(), i.parents[this.id] = { element: this, title: s.attr("title") }, s.attr("title", ""))
            }), this._registerCloseHandlers(t, s), this._updateContent(s, t))
        },
        _updateContent: function(e, t) {
            var i, s = this.options.content,
                n = this,
                o = t ? t.type : null;
            return "string" == typeof s ? this._open(t, e, s) : (i = s.call(e[0], function(i) { n._delay(function() { e.data("ui-tooltip-open") && (t && (t.type = o), this._open(t, e, i)) }) }), void(i && this._open(t, e, i)))
        },
        _open: function(t, i, s) {
            function n(e) { h.of = e, r.is(":hidden") || r.position(h) }
            var o, r, a, l, h = e.extend({}, this.options.position);
            if (s) {
                if (o = this._find(i)) return void o.tooltip.find(".ui-tooltip-content").html(s);
                i.is("[title]") && (t && "mouseover" === t.type ? i.attr("title", "") : i.removeAttr("title")), o = this._tooltip(i), r = o.tooltip, this._addDescribedBy(i, r.attr("id")), r.find(".ui-tooltip-content").html(s), this.liveRegion.children().hide(), s.clone ? (l = s.clone(), l.removeAttr("id").find("[id]").removeAttr("id")) : l = s, e("<div>").html(l).appendTo(this.liveRegion), this.options.track && t && /^mouse/.test(t.type) ? (this._on(this.document, { mousemove: n }), n(t)) : r.position(e.extend({ of: i }, this.options.position)), r.hide(), this._show(r, this.options.show), this.options.show && this.options.show.delay && (a = this.delayedShow = setInterval(function() { r.is(":visible") && (n(h.of), clearInterval(a)) }, e.fx.interval)), this._trigger("open", t, { tooltip: r })
            }
        },
        _registerCloseHandlers: function(t, i) {
            var s = {
                keyup: function(t) {
                    if (t.keyCode === e.ui.keyCode.ESCAPE) {
                        var s = e.Event(t);
                        s.currentTarget = i[0], this.close(s, !0)
                    }
                }
            };
            i[0] !== this.element[0] && (s.remove = function() { this._removeTooltip(this._find(i).tooltip) }), t && "mouseover" !== t.type || (s.mouseleave = "close"), t && "focusin" !== t.type || (s.focusout = "close"), this._on(!0, i, s)
        },
        close: function(t) {
            var i, s = this,
                n = e(t ? t.currentTarget : this.element),
                o = this._find(n);
            return o ? (i = o.tooltip, void(o.closing || (clearInterval(this.delayedShow), n.data("ui-tooltip-title") && !n.attr("title") && n.attr("title", n.data("ui-tooltip-title")), this._removeDescribedBy(n), o.hiding = !0, i.stop(!0), this._hide(i, this.options.hide, function() { s._removeTooltip(e(this)) }), n.removeData("ui-tooltip-open"), this._off(n, "mouseleave focusout keyup"), n[0] !== this.element[0] && this._off(n, "remove"), this._off(this.document, "mousemove"), t && "mouseleave" === t.type && e.each(this.parents, function(t, i) { e(i.element).attr("title", i.title), delete s.parents[t] }), o.closing = !0, this._trigger("close", t, { tooltip: i }), o.hiding || (o.closing = !1)))) : void n.removeData("ui-tooltip-open")
        },
        _tooltip: function(t) {
            var i = e("<div>").attr("role", "tooltip").addClass("ui-tooltip ui-widget ui-corner-all ui-widget-content " + (this.options.tooltipClass || "")),
                s = i.uniqueId().attr("id");
            return e("<div>").addClass("ui-tooltip-content").appendTo(i), i.appendTo(this.document[0].body), this.tooltips[s] = { element: t, tooltip: i }
        },
        _find: function(e) { var t = e.data("ui-tooltip-id"); return t ? this.tooltips[t] : null },
        _removeTooltip: function(e) { e.remove(), delete this.tooltips[e.attr("id")] },
        _destroy: function() {
            var t = this;
            e.each(this.tooltips, function(i, s) {
                var n = e.Event("blur"),
                    o = s.element;
                n.target = n.currentTarget = o[0], t.close(n, !0), e("#" + i).remove(), o.data("ui-tooltip-title") && (o.attr("title") || o.attr("title", o.data("ui-tooltip-title")), o.removeData("ui-tooltip-title"))
            }), this.liveRegion.remove()
        }
    });
    var b = "ui-effects-",
        y = e;
    e.effects = { effect: {} },
        function(e, t) {
            function i(e, t, i) { var s = u[t.type] || {}; return null == e ? i || !t.def ? null : t.def : (e = s.floor ? ~~e : parseFloat(e), isNaN(e) ? t.def : s.mod ? (e + s.mod) % s.mod : 0 > e ? 0 : e > s.max ? s.max : e) }

            function s(i) {
                var s = h(),
                    n = s._rgba = [];
                return i = i.toLowerCase(), f(l, function(e, o) {
                    var r, a = o.re.exec(i),
                        l = a && o.parse(a),
                        h = o.space || "rgba";
                    return l ? (r = s[h](l), s[c[h].cache] = r[c[h].cache], n = s._rgba = r._rgba, !1) : t
                }), n.length ? ("0,0,0,0" === n.join() && e.extend(n, o.transparent), s) : o[i]
            }

            function n(e, t, i) { return i = (i + 1) % 1, 1 > 6 * i ? e + 6 * (t - e) * i : 1 > 2 * i ? t : 2 > 3 * i ? e + 6 * (t - e) * (2 / 3 - i) : e }
            var o, r = "backgroundColor borderBottomColor borderLeftColor borderRightColor borderTopColor color columnRuleColor outlineColor textDecorationColor textEmphasisColor",
                a = /^([\-+])=\s*(\d+\.?\d*)/,
                l = [{ re: /rgba?\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*(?:,\s*(\d?(?:\.\d+)?)\s*)?\)/, parse: function(e) { return [e[1], e[2], e[3], e[4]] } }, { re: /rgba?\(\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*(?:,\s*(\d?(?:\.\d+)?)\s*)?\)/, parse: function(e) { return [2.55 * e[1], 2.55 * e[2], 2.55 * e[3], e[4]] } }, { re: /#([a-f0-9]{2})([a-f0-9]{2})([a-f0-9]{2})/, parse: function(e) { return [parseInt(e[1], 16), parseInt(e[2], 16), parseInt(e[3], 16)] } }, { re: /#([a-f0-9])([a-f0-9])([a-f0-9])/, parse: function(e) { return [parseInt(e[1] + e[1], 16), parseInt(e[2] + e[2], 16), parseInt(e[3] + e[3], 16)] } }, { re: /hsla?\(\s*(\d+(?:\.\d+)?)\s*,\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*(?:,\s*(\d?(?:\.\d+)?)\s*)?\)/, space: "hsla", parse: function(e) { return [e[1], e[2] / 100, e[3] / 100, e[4]] } }],
                h = e.Color = function(t, i, s, n) { return new e.Color.fn.parse(t, i, s, n) },
                c = { rgba: { props: { red: { idx: 0, type: "byte" }, green: { idx: 1, type: "byte" }, blue: { idx: 2, type: "byte" } } }, hsla: { props: { hue: { idx: 0, type: "degrees" }, saturation: { idx: 1, type: "percent" }, lightness: { idx: 2, type: "percent" } } } },
                u = { "byte": { floor: !0, max: 255 }, percent: { max: 1 }, degrees: { mod: 360, floor: !0 } },
                d = h.support = {},
                p = e("<p>")[0],
                f = e.each;
            p.style.cssText = "background-color:rgba(1,1,1,.5)", d.rgba = p.style.backgroundColor.indexOf("rgba") > -1, f(c, function(e, t) { t.cache = "_" + e, t.props.alpha = { idx: 3, type: "percent", def: 1 } }), h.fn = e.extend(h.prototype, {
                parse: function(n, r, a, l) {
                    if (n === t) return this._rgba = [null, null, null, null], this;
                    (n.jquery || n.nodeType) && (n = e(n).css(r), r = t);
                    var u = this,
                        d = e.type(n),
                        p = this._rgba = [];
                    return r !== t && (n = [n, r, a, l], d = "array"), "string" === d ? this.parse(s(n) || o._default) : "array" === d ? (f(c.rgba.props, function(e, t) { p[t.idx] = i(n[t.idx], t) }), this) : "object" === d ? (n instanceof h ? f(c, function(e, t) { n[t.cache] && (u[t.cache] = n[t.cache].slice()) }) : f(c, function(t, s) {
                        var o = s.cache;
                        f(s.props, function(e, t) {
                            if (!u[o] && s.to) {
                                if ("alpha" === e || null == n[e]) return;
                                u[o] = s.to(u._rgba)
                            }
                            u[o][t.idx] = i(n[e], t, !0)
                        }), u[o] && 0 > e.inArray(null, u[o].slice(0, 3)) && (u[o][3] = 1, s.from && (u._rgba = s.from(u[o])))
                    }), this) : t
                },
                is: function(e) {
                    var i = h(e),
                        s = !0,
                        n = this;
                    return f(c, function(e, o) { var r, a = i[o.cache]; return a && (r = n[o.cache] || o.to && o.to(n._rgba) || [], f(o.props, function(e, i) { return null != a[i.idx] ? s = a[i.idx] === r[i.idx] : t })), s }), s
                },
                _space: function() {
                    var e = [],
                        t = this;
                    return f(c, function(i, s) { t[s.cache] && e.push(i) }), e.pop()
                },
                transition: function(e, t) {
                    var s = h(e),
                        n = s._space(),
                        o = c[n],
                        r = 0 === this.alpha() ? h("transparent") : this,
                        a = r[o.cache] || o.to(r._rgba),
                        l = a.slice();
                    return s = s[o.cache], f(o.props, function(e, n) {
                        var o = n.idx,
                            r = a[o],
                            h = s[o],
                            c = u[n.type] || {};
                        null !== h && (null === r ? l[o] = h : (c.mod && (h - r > c.mod / 2 ? r += c.mod : r - h > c.mod / 2 && (r -= c.mod)), l[o] = i((h - r) * t + r, n)))
                    }), this[n](l)
                },
                blend: function(t) {
                    if (1 === this._rgba[3]) return this;
                    var i = this._rgba.slice(),
                        s = i.pop(),
                        n = h(t)._rgba;
                    return h(e.map(i, function(e, t) { return (1 - s) * n[t] + s * e }))
                },
                toRgbaString: function() {
                    var t = "rgba(",
                        i = e.map(this._rgba, function(e, t) { return null == e ? t > 2 ? 1 : 0 : e });
                    return 1 === i[3] && (i.pop(), t = "rgb("), t + i.join() + ")"
                },
                toHslaString: function() {
                    var t = "hsla(",
                        i = e.map(this.hsla(), function(e, t) { return null == e && (e = t > 2 ? 1 : 0), t && 3 > t && (e = Math.round(100 * e) + "%"), e });
                    return 1 === i[3] && (i.pop(), t = "hsl("), t + i.join() + ")"
                },
                toHexString: function(t) {
                    var i = this._rgba.slice(),
                        s = i.pop();
                    return t && i.push(~~(255 * s)), "#" + e.map(i, function(e) { return e = (e || 0).toString(16), 1 === e.length ? "0" + e : e }).join("")
                },
                toString: function() { return 0 === this._rgba[3] ? "transparent" : this.toRgbaString() }
            }), h.fn.parse.prototype = h.fn, c.hsla.to = function(e) {
                if (null == e[0] || null == e[1] || null == e[2]) return [null, null, null, e[3]];
                var t, i, s = e[0] / 255,
                    n = e[1] / 255,
                    o = e[2] / 255,
                    r = e[3],
                    a = Math.max(s, n, o),
                    l = Math.min(s, n, o),
                    h = a - l,
                    c = a + l,
                    u = .5 * c;
                return t = l === a ? 0 : s === a ? 60 * (n - o) / h + 360 : n === a ? 60 * (o - s) / h + 120 : 60 * (s - n) / h + 240, i = 0 === h ? 0 : .5 >= u ? h / c : h / (2 - c), [Math.round(t) % 360, i, u, null == r ? 1 : r]
            }, c.hsla.from = function(e) {
                if (null == e[0] || null == e[1] || null == e[2]) return [null, null, null, e[3]];
                var t = e[0] / 360,
                    i = e[1],
                    s = e[2],
                    o = e[3],
                    r = .5 >= s ? s * (1 + i) : s + i - s * i,
                    a = 2 * s - r;
                return [Math.round(255 * n(a, r, t + 1 / 3)), Math.round(255 * n(a, r, t)), Math.round(255 * n(a, r, t - 1 / 3)), o]
            }, f(c, function(s, n) {
                var o = n.props,
                    r = n.cache,
                    l = n.to,
                    c = n.from;
                h.fn[s] = function(s) {
                    if (l && !this[r] && (this[r] = l(this._rgba)), s === t) return this[r].slice();
                    var n, a = e.type(s),
                        u = "array" === a || "object" === a ? s : arguments,
                        d = this[r].slice();
                    return f(o, function(e, t) {
                        var s = u["object" === a ? e : t.idx];
                        null == s && (s = d[t.idx]), d[t.idx] = i(s, t)
                    }), c ? (n = h(c(d)), n[r] = d, n) : h(d)
                }, f(o, function(t, i) {
                    h.fn[t] || (h.fn[t] = function(n) {
                        var o, r = e.type(n),
                            l = "alpha" === t ? this._hsla ? "hsla" : "rgba" : s,
                            h = this[l](),
                            c = h[i.idx];
                        return "undefined" === r ? c : ("function" === r && (n = n.call(this, c), r = e.type(n)), null == n && i.empty ? this : ("string" === r && (o = a.exec(n), o && (n = c + parseFloat(o[2]) * ("+" === o[1] ? 1 : -1))), h[i.idx] = n, this[l](h)))
                    })
                })
            }), h.hook = function(t) {
                var i = t.split(" ");
                f(i, function(t, i) {
                    e.cssHooks[i] = {
                        set: function(t, n) {
                            var o, r, a = "";
                            if ("transparent" !== n && ("string" !== e.type(n) || (o = s(n)))) {
                                if (n = h(o || n), !d.rgba && 1 !== n._rgba[3]) {
                                    for (r = "backgroundColor" === i ? t.parentNode : t;
                                        ("" === a || "transparent" === a) && r && r.style;) try { a = e.css(r, "backgroundColor"), r = r.parentNode } catch (l) {}
                                    n = n.blend(a && "transparent" !== a ? a : "_default")
                                }
                                n = n.toRgbaString()
                            }
                            try { t.style[i] = n } catch (l) {}
                        }
                    }, e.fx.step[i] = function(t) { t.colorInit || (t.start = h(t.elem, i), t.end = h(t.end), t.colorInit = !0), e.cssHooks[i].set(t.elem, t.start.transition(t.end, t.pos)) }
                })
            }, h.hook(r), e.cssHooks.borderColor = { expand: function(e) { var t = {}; return f(["Top", "Right", "Bottom", "Left"], function(i, s) { t["border" + s + "Color"] = e }), t } }, o = e.Color.names = { aqua: "#00ffff", black: "#000000", blue: "#0000ff", fuchsia: "#ff00ff", gray: "#808080", green: "#008000", lime: "#00ff00", maroon: "#800000", navy: "#000080", olive: "#808000", purple: "#800080", red: "#ff0000", silver: "#c0c0c0", teal: "#008080", white: "#ffffff", yellow: "#ffff00", transparent: [null, null, null, 0], _default: "#ffffff" }
        }(y),
        function() {
            function t(t) {
                var i, s, n = t.ownerDocument.defaultView ? t.ownerDocument.defaultView.getComputedStyle(t, null) : t.currentStyle,
                    o = {};
                if (n && n.length && n[0] && n[n[0]])
                    for (s = n.length; s--;) i = n[s], "string" == typeof n[i] && (o[e.camelCase(i)] = n[i]);
                else
                    for (i in n) "string" == typeof n[i] && (o[i] = n[i]);
                return o
            }

            function i(t, i) { var s, o, r = {}; for (s in i) o = i[s], t[s] !== o && (n[s] || (e.fx.step[s] || !isNaN(parseFloat(o))) && (r[s] = o)); return r }
            var s = ["add", "remove", "toggle"],
                n = { border: 1, borderBottom: 1, borderColor: 1, borderLeft: 1, borderRight: 1, borderTop: 1, borderWidth: 1, margin: 1, padding: 1 };
            e.each(["borderLeftStyle", "borderRightStyle", "borderBottomStyle", "borderTopStyle"], function(t, i) {
                e.fx.step[i] = function(e) {
                    ("none" !== e.end && !e.setAttr || 1 === e.pos && !e.setAttr) && (y.style(e.elem, i, e.end), e.setAttr = !0)
                }
            }), e.fn.addBack || (e.fn.addBack = function(e) { return this.add(null == e ? this.prevObject : this.prevObject.filter(e)) }), e.effects.animateClass = function(n, o, r, a) {
                var l = e.speed(o, r, a);
                return this.queue(function() {
                    var o, r = e(this),
                        a = r.attr("class") || "",
                        h = l.children ? r.find("*").addBack() : r;
                    h = h.map(function() { var i = e(this); return { el: i, start: t(this) } }), o = function() { e.each(s, function(e, t) { n[t] && r[t + "Class"](n[t]) }) }, o(), h = h.map(function() { return this.end = t(this.el[0]), this.diff = i(this.start, this.end), this }), r.attr("class", a), h = h.map(function() {
                        var t = this,
                            i = e.Deferred(),
                            s = e.extend({}, l, { queue: !1, complete: function() { i.resolve(t) } });
                        return this.el.animate(this.diff, s), i.promise()
                    }), e.when.apply(e, h.get()).done(function() {
                        o(), e.each(arguments, function() {
                            var t = this.el;
                            e.each(this.diff, function(e) { t.css(e, "") })
                        }), l.complete.call(r[0])
                    })
                })
            }, e.fn.extend({ addClass: function(t) { return function(i, s, n, o) { return s ? e.effects.animateClass.call(this, { add: i }, s, n, o) : t.apply(this, arguments) } }(e.fn.addClass), removeClass: function(t) { return function(i, s, n, o) { return arguments.length > 1 ? e.effects.animateClass.call(this, { remove: i }, s, n, o) : t.apply(this, arguments) } }(e.fn.removeClass), toggleClass: function(t) { return function(i, s, n, o, r) { return "boolean" == typeof s || void 0 === s ? n ? e.effects.animateClass.call(this, s ? { add: i } : { remove: i }, n, o, r) : t.apply(this, arguments) : e.effects.animateClass.call(this, { toggle: i }, s, n, o) } }(e.fn.toggleClass), switchClass: function(t, i, s, n, o) { return e.effects.animateClass.call(this, { add: i, remove: t }, s, n, o) } })
        }(),
        function() {
            function t(t, i, s, n) { return e.isPlainObject(t) && (i = t, t = t.effect), t = { effect: t }, null == i && (i = {}), e.isFunction(i) && (n = i, s = null, i = {}), ("number" == typeof i || e.fx.speeds[i]) && (n = s, s = i, i = {}), e.isFunction(s) && (n = s, s = null), i && e.extend(t, i), s = s || i.duration, t.duration = e.fx.off ? 0 : "number" == typeof s ? s : s in e.fx.speeds ? e.fx.speeds[s] : e.fx.speeds._default, t.complete = n || i.complete, t }

            function i(t) { return !t || "number" == typeof t || e.fx.speeds[t] ? !0 : "string" != typeof t || e.effects.effect[t] ? e.isFunction(t) ? !0 : "object" != typeof t || t.effect ? !1 : !0 : !0 }
            e.extend(e.effects, {
                version: "1.11.4",
                save: function(e, t) { for (var i = 0; t.length > i; i++) null !== t[i] && e.data(b + t[i], e[0].style[t[i]]) },
                restore: function(e, t) { var i, s; for (s = 0; t.length > s; s++) null !== t[s] && (i = e.data(b + t[s]), void 0 === i && (i = ""), e.css(t[s], i)) },
                setMode: function(e, t) { return "toggle" === t && (t = e.is(":hidden") ? "show" : "hide"), t },
                getBaseline: function(e, t) {
                    var i, s;
                    switch (e[0]) {
                        case "top":
                            i = 0;
                            break;
                        case "middle":
                            i = .5;
                            break;
                        case "bottom":
                            i = 1;
                            break;
                        default:
                            i = e[0] / t.height
                    }
                    switch (e[1]) {
                        case "left":
                            s = 0;
                            break;
                        case "center":
                            s = .5;
                            break;
                        case "right":
                            s = 1;
                            break;
                        default:
                            s = e[1] / t.width
                    }
                    return { x: s, y: i }
                },
                createWrapper: function(t) {
                    if (t.parent().is(".ui-effects-wrapper")) return t.parent();
                    var i = { width: t.outerWidth(!0), height: t.outerHeight(!0), "float": t.css("float") },
                        s = e("<div></div>").addClass("ui-effects-wrapper").css({ fontSize: "100%", background: "transparent", border: "none", margin: 0, padding: 0 }),
                        n = { width: t.width(), height: t.height() },
                        o = document.activeElement;
                    try { o.id } catch (r) { o = document.body }
                    return t.wrap(s), (t[0] === o || e.contains(t[0], o)) && e(o).focus(), s = t.parent(), "static" === t.css("position") ? (s.css({ position: "relative" }), t.css({ position: "relative" })) : (e.extend(i, { position: t.css("position"), zIndex: t.css("z-index") }), e.each(["top", "left", "bottom", "right"], function(e, s) { i[s] = t.css(s), isNaN(parseInt(i[s], 10)) && (i[s] = "auto") }), t.css({ position: "relative", top: 0, left: 0, right: "auto", bottom: "auto" })), t.css(n), s.css(i).show()
                },
                removeWrapper: function(t) { var i = document.activeElement; return t.parent().is(".ui-effects-wrapper") && (t.parent().replaceWith(t), (t[0] === i || e.contains(t[0], i)) && e(i).focus()), t },
                setTransition: function(t, i, s, n) {
                    return n = n || {}, e.each(i, function(e, i) {
                        var o = t.cssUnit(i);
                        o[0] > 0 && (n[i] = o[0] * s + o[1])
                    }), n
                }
            }), e.fn.extend({
                effect: function() {
                    function i(t) {
                        function i() { e.isFunction(o) && o.call(n[0]), e.isFunction(t) && t() }
                        var n = e(this),
                            o = s.complete,
                            a = s.mode;
                        (n.is(":hidden") ? "hide" === a : "show" === a) ? (n[a](), i()) : r.call(n[0], s, i)
                    }
                    var s = t.apply(this, arguments),
                        n = s.mode,
                        o = s.queue,
                        r = e.effects.effect[s.effect];
                    return e.fx.off || !r ? n ? this[n](s.duration, s.complete) : this.each(function() { s.complete && s.complete.call(this) }) : o === !1 ? this.each(i) : this.queue(o || "fx", i)
                },
                show: function(e) { return function(s) { if (i(s)) return e.apply(this, arguments); var n = t.apply(this, arguments); return n.mode = "show", this.effect.call(this, n) } }(e.fn.show),
                hide: function(e) { return function(s) { if (i(s)) return e.apply(this, arguments); var n = t.apply(this, arguments); return n.mode = "hide", this.effect.call(this, n) } }(e.fn.hide),
                toggle: function(e) { return function(s) { if (i(s) || "boolean" == typeof s) return e.apply(this, arguments); var n = t.apply(this, arguments); return n.mode = "toggle", this.effect.call(this, n) } }(e.fn.toggle),
                cssUnit: function(t) {
                    var i = this.css(t),
                        s = [];
                    return e.each(["em", "px", "%", "pt"], function(e, t) { i.indexOf(t) > 0 && (s = [parseFloat(i), t]) }), s
                }
            })
        }(),
        function() {
            var t = {};
            e.each(["Quad", "Cubic", "Quart", "Quint", "Expo"], function(e, i) { t[i] = function(t) { return Math.pow(t, e + 2) } }), e.extend(t, {
                Sine: function(e) { return 1 - Math.cos(e * Math.PI / 2) },
                Circ: function(e) { return 1 - Math.sqrt(1 - e * e) },
                Elastic: function(e) { return 0 === e || 1 === e ? e : -Math.pow(2, 8 * (e - 1)) * Math.sin((80 * (e - 1) - 7.5) * Math.PI / 15) },
                Back: function(e) { return e * e * (3 * e - 2) },
                Bounce: function(e) {
                    for (var t, i = 4;
                        ((t = Math.pow(2, --i)) - 1) / 11 > e;);
                    return 1 / Math.pow(4, 3 - i) - 7.5625 * Math.pow((3 * t - 2) / 22 - e, 2)
                }
            }), e.each(t, function(t, i) { e.easing["easeIn" + t] = i, e.easing["easeOut" + t] = function(e) { return 1 - i(1 - e) }, e.easing["easeInOut" + t] = function(e) { return .5 > e ? i(2 * e) / 2 : 1 - i(-2 * e + 2) / 2 } })
        }(), e.effects, e.effects.effect.blind = function(t, i) {
            var s, n, o, r = e(this),
                a = /up|down|vertical/,
                l = /up|left|vertical|horizontal/,
                h = ["position", "top", "bottom", "left", "right", "height", "width"],
                c = e.effects.setMode(r, t.mode || "hide"),
                u = t.direction || "up",
                d = a.test(u),
                p = d ? "height" : "width",
                f = d ? "top" : "left",
                m = l.test(u),
                g = {},
                v = "show" === c;
            r.parent().is(".ui-effects-wrapper") ? e.effects.save(r.parent(), h) : e.effects.save(r, h), r.show(), s = e.effects.createWrapper(r).css({ overflow: "hidden" }), n = s[p](), o = parseFloat(s.css(f)) || 0, g[p] = v ? n : 0, m || (r.css(d ? "bottom" : "right", 0).css(d ? "top" : "left", "auto").css({ position: "absolute" }), g[f] = v ? o : n + o), v && (s.css(p, 0), m || s.css(f, o + n)), s.animate(g, { duration: t.duration, easing: t.easing, queue: !1, complete: function() { "hide" === c && r.hide(), e.effects.restore(r, h), e.effects.removeWrapper(r), i() } })
        }, e.effects.effect.bounce = function(t, i) {
            var s, n, o, r = e(this),
                a = ["position", "top", "bottom", "left", "right", "height", "width"],
                l = e.effects.setMode(r, t.mode || "effect"),
                h = "hide" === l,
                c = "show" === l,
                u = t.direction || "up",
                d = t.distance,
                p = t.times || 5,
                f = 2 * p + (c || h ? 1 : 0),
                m = t.duration / f,
                g = t.easing,
                v = "up" === u || "down" === u ? "top" : "left",
                b = "up" === u || "left" === u,
                y = r.queue(),
                x = y.length;
            for ((c || h) && a.push("opacity"), e.effects.save(r, a), r.show(), e.effects.createWrapper(r), d || (d = r["top" === v ? "outerHeight" : "outerWidth"]() / 3), c && (o = { opacity: 1 }, o[v] = 0, r.css("opacity", 0).css(v, b ? 2 * -d : 2 * d).animate(o, m, g)), h && (d /= Math.pow(2, p - 1)), o = {}, o[v] = 0, s = 0; p > s; s++) n = {}, n[v] = (b ? "-=" : "+=") + d, r.animate(n, m, g).animate(o, m, g), d = h ? 2 * d : d / 2;
            h && (n = { opacity: 0 }, n[v] = (b ? "-=" : "+=") + d, r.animate(n, m, g)), r.queue(function() { h && r.hide(), e.effects.restore(r, a), e.effects.removeWrapper(r), i() }), x > 1 && y.splice.apply(y, [1, 0].concat(y.splice(x, f + 1))), r.dequeue()
        }, e.effects.effect.clip = function(t, i) {
            var s, n, o, r = e(this),
                a = ["position", "top", "bottom", "left", "right", "height", "width"],
                l = e.effects.setMode(r, t.mode || "hide"),
                h = "show" === l,
                c = t.direction || "vertical",
                u = "vertical" === c,
                d = u ? "height" : "width",
                p = u ? "top" : "left",
                f = {};
            e.effects.save(r, a), r.show(), s = e.effects.createWrapper(r).css({ overflow: "hidden" }), n = "IMG" === r[0].tagName ? s : r, o = n[d](), h && (n.css(d, 0), n.css(p, o / 2)), f[d] = h ? o : 0, f[p] = h ? 0 : o / 2, n.animate(f, { queue: !1, duration: t.duration, easing: t.easing, complete: function() { h || r.hide(), e.effects.restore(r, a), e.effects.removeWrapper(r), i() } })
        }, e.effects.effect.drop = function(t, i) {
            var s, n = e(this),
                o = ["position", "top", "bottom", "left", "right", "opacity", "height", "width"],
                r = e.effects.setMode(n, t.mode || "hide"),
                a = "show" === r,
                l = t.direction || "left",
                h = "up" === l || "down" === l ? "top" : "left",
                c = "up" === l || "left" === l ? "pos" : "neg",
                u = { opacity: a ? 1 : 0 };
            e.effects.save(n, o), n.show(), e.effects.createWrapper(n), s = t.distance || n["top" === h ? "outerHeight" : "outerWidth"](!0) / 2, a && n.css("opacity", 0).css(h, "pos" === c ? -s : s), u[h] = (a ? "pos" === c ? "+=" : "-=" : "pos" === c ? "-=" : "+=") + s, n.animate(u, { queue: !1, duration: t.duration, easing: t.easing, complete: function() { "hide" === r && n.hide(), e.effects.restore(n, o), e.effects.removeWrapper(n), i() } })
        }, e.effects.effect.explode = function(t, i) {
            function s() { y.push(this), y.length === u * d && n() }

            function n() { p.css({ visibility: "visible" }), e(y).remove(), m || p.hide(), i() }
            var o, r, a, l, h, c, u = t.pieces ? Math.round(Math.sqrt(t.pieces)) : 3,
                d = u,
                p = e(this),
                f = e.effects.setMode(p, t.mode || "hide"),
                m = "show" === f,
                g = p.show().css("visibility", "hidden").offset(),
                v = Math.ceil(p.outerWidth() / d),
                b = Math.ceil(p.outerHeight() / u),
                y = [];
            for (o = 0; u > o; o++)
                for (l = g.top + o * b, c = o - (u - 1) / 2, r = 0; d > r; r++) a = g.left + r * v, h = r - (d - 1) / 2, p.clone().appendTo("body").wrap("<div></div>").css({ position: "absolute", visibility: "visible", left: -r * v, top: -o * b }).parent().addClass("ui-effects-explode").css({ position: "absolute", overflow: "hidden", width: v, height: b, left: a + (m ? h * v : 0), top: l + (m ? c * b : 0), opacity: m ? 0 : 1 }).animate({ left: a + (m ? 0 : h * v), top: l + (m ? 0 : c * b), opacity: m ? 1 : 0 }, t.duration || 500, t.easing, s)
        }, e.effects.effect.fade = function(t, i) {
            var s = e(this),
                n = e.effects.setMode(s, t.mode || "toggle");
            s.animate({ opacity: n }, { queue: !1, duration: t.duration, easing: t.easing, complete: i })
        }, e.effects.effect.fold = function(t, i) {
            var s, n, o = e(this),
                r = ["position", "top", "bottom", "left", "right", "height", "width"],
                a = e.effects.setMode(o, t.mode || "hide"),
                l = "show" === a,
                h = "hide" === a,
                c = t.size || 15,
                u = /([0-9]+)%/.exec(c),
                d = !!t.horizFirst,
                p = l !== d,
                f = p ? ["width", "height"] : ["height", "width"],
                m = t.duration / 2,
                g = {},
                v = {};
            e.effects.save(o, r), o.show(), s = e.effects.createWrapper(o).css({ overflow: "hidden" }), n = p ? [s.width(), s.height()] : [s.height(), s.width()], u && (c = parseInt(u[1], 10) / 100 * n[h ? 0 : 1]), l && s.css(d ? { height: 0, width: c } : { height: c, width: 0 }), g[f[0]] = l ? n[0] : c, v[f[1]] = l ? n[1] : 0, s.animate(g, m, t.easing).animate(v, m, t.easing, function() { h && o.hide(), e.effects.restore(o, r), e.effects.removeWrapper(o), i() })
        }, e.effects.effect.highlight = function(t, i) {
            var s = e(this),
                n = ["backgroundImage", "backgroundColor", "opacity"],
                o = e.effects.setMode(s, t.mode || "show"),
                r = { backgroundColor: s.css("backgroundColor") };
            "hide" === o && (r.opacity = 0), e.effects.save(s, n), s.show().css({ backgroundImage: "none", backgroundColor: t.color || "#ffff99" }).animate(r, { queue: !1, duration: t.duration, easing: t.easing, complete: function() { "hide" === o && s.hide(), e.effects.restore(s, n), i() } })
        }, e.effects.effect.size = function(t, i) {
            var s, n, o, r = e(this),
                a = ["position", "top", "bottom", "left", "right", "width", "height", "overflow", "opacity"],
                l = ["position", "top", "bottom", "left", "right", "overflow", "opacity"],
                h = ["width", "height", "overflow"],
                c = ["fontSize"],
                u = ["borderTopWidth", "borderBottomWidth", "paddingTop", "paddingBottom"],
                d = ["borderLeftWidth", "borderRightWidth", "paddingLeft", "paddingRight"],
                p = e.effects.setMode(r, t.mode || "effect"),
                f = t.restore || "effect" !== p,
                m = t.scale || "both",
                g = t.origin || ["middle", "center"],
                v = r.css("position"),
                b = f ? a : l,
                y = {
                    height: 0,
                    width: 0,
                    outerHeight: 0,
                    outerWidth: 0
                };
            "show" === p && r.show(), s = { height: r.height(), width: r.width(), outerHeight: r.outerHeight(), outerWidth: r.outerWidth() }, "toggle" === t.mode && "show" === p ? (r.from = t.to || y, r.to = t.from || s) : (r.from = t.from || ("show" === p ? y : s), r.to = t.to || ("hide" === p ? y : s)), o = { from: { y: r.from.height / s.height, x: r.from.width / s.width }, to: { y: r.to.height / s.height, x: r.to.width / s.width } }, ("box" === m || "both" === m) && (o.from.y !== o.to.y && (b = b.concat(u), r.from = e.effects.setTransition(r, u, o.from.y, r.from), r.to = e.effects.setTransition(r, u, o.to.y, r.to)), o.from.x !== o.to.x && (b = b.concat(d), r.from = e.effects.setTransition(r, d, o.from.x, r.from), r.to = e.effects.setTransition(r, d, o.to.x, r.to))), ("content" === m || "both" === m) && o.from.y !== o.to.y && (b = b.concat(c).concat(h), r.from = e.effects.setTransition(r, c, o.from.y, r.from), r.to = e.effects.setTransition(r, c, o.to.y, r.to)), e.effects.save(r, b), r.show(), e.effects.createWrapper(r), r.css("overflow", "hidden").css(r.from), g && (n = e.effects.getBaseline(g, s), r.from.top = (s.outerHeight - r.outerHeight()) * n.y, r.from.left = (s.outerWidth - r.outerWidth()) * n.x, r.to.top = (s.outerHeight - r.to.outerHeight) * n.y, r.to.left = (s.outerWidth - r.to.outerWidth) * n.x), r.css(r.from), ("content" === m || "both" === m) && (u = u.concat(["marginTop", "marginBottom"]).concat(c), d = d.concat(["marginLeft", "marginRight"]), h = a.concat(u).concat(d), r.find("*[width]").each(function() {
                var i = e(this),
                    s = { height: i.height(), width: i.width(), outerHeight: i.outerHeight(), outerWidth: i.outerWidth() };
                f && e.effects.save(i, h), i.from = { height: s.height * o.from.y, width: s.width * o.from.x, outerHeight: s.outerHeight * o.from.y, outerWidth: s.outerWidth * o.from.x }, i.to = { height: s.height * o.to.y, width: s.width * o.to.x, outerHeight: s.height * o.to.y, outerWidth: s.width * o.to.x }, o.from.y !== o.to.y && (i.from = e.effects.setTransition(i, u, o.from.y, i.from), i.to = e.effects.setTransition(i, u, o.to.y, i.to)), o.from.x !== o.to.x && (i.from = e.effects.setTransition(i, d, o.from.x, i.from), i.to = e.effects.setTransition(i, d, o.to.x, i.to)), i.css(i.from), i.animate(i.to, t.duration, t.easing, function() { f && e.effects.restore(i, h) })
            })), r.animate(r.to, {
                queue: !1,
                duration: t.duration,
                easing: t.easing,
                complete: function() {
                    0 === r.to.opacity && r.css("opacity", r.from.opacity), "hide" === p && r.hide(), e.effects.restore(r, b), f || ("static" === v ? r.css({ position: "relative", top: r.to.top, left: r.to.left }) : e.each(["top", "left"], function(e, t) {
                        r.css(t, function(t, i) {
                            var s = parseInt(i, 10),
                                n = e ? r.to.left : r.to.top;
                            return "auto" === i ? n + "px" : s + n + "px"
                        })
                    })), e.effects.removeWrapper(r), i()
                }
            })
        }, e.effects.effect.scale = function(t, i) {
            var s = e(this),
                n = e.extend(!0, {}, t),
                o = e.effects.setMode(s, t.mode || "effect"),
                r = parseInt(t.percent, 10) || (0 === parseInt(t.percent, 10) ? 0 : "hide" === o ? 0 : 100),
                a = t.direction || "both",
                l = t.origin,
                h = { height: s.height(), width: s.width(), outerHeight: s.outerHeight(), outerWidth: s.outerWidth() },
                c = { y: "horizontal" !== a ? r / 100 : 1, x: "vertical" !== a ? r / 100 : 1 };
            n.effect = "size", n.queue = !1, n.complete = i, "effect" !== o && (n.origin = l || ["middle", "center"], n.restore = !0), n.from = t.from || ("show" === o ? { height: 0, width: 0, outerHeight: 0, outerWidth: 0 } : h), n.to = { height: h.height * c.y, width: h.width * c.x, outerHeight: h.outerHeight * c.y, outerWidth: h.outerWidth * c.x }, n.fade && ("show" === o && (n.from.opacity = 0, n.to.opacity = 1), "hide" === o && (n.from.opacity = 1, n.to.opacity = 0)), s.effect(n)
        }, e.effects.effect.puff = function(t, i) {
            var s = e(this),
                n = e.effects.setMode(s, t.mode || "hide"),
                o = "hide" === n,
                r = parseInt(t.percent, 10) || 150,
                a = r / 100,
                l = { height: s.height(), width: s.width(), outerHeight: s.outerHeight(), outerWidth: s.outerWidth() };
            e.extend(t, { effect: "scale", queue: !1, fade: !0, mode: n, complete: i, percent: o ? r : 100, from: o ? l : { height: l.height * a, width: l.width * a, outerHeight: l.outerHeight * a, outerWidth: l.outerWidth * a } }), s.effect(t)
        }, e.effects.effect.pulsate = function(t, i) {
            var s, n = e(this),
                o = e.effects.setMode(n, t.mode || "show"),
                r = "show" === o,
                a = "hide" === o,
                l = r || "hide" === o,
                h = 2 * (t.times || 5) + (l ? 1 : 0),
                c = t.duration / h,
                u = 0,
                d = n.queue(),
                p = d.length;
            for ((r || !n.is(":visible")) && (n.css("opacity", 0).show(), u = 1), s = 1; h > s; s++) n.animate({ opacity: u }, c, t.easing), u = 1 - u;
            n.animate({ opacity: u }, c, t.easing), n.queue(function() { a && n.hide(), i() }), p > 1 && d.splice.apply(d, [1, 0].concat(d.splice(p, h + 1))), n.dequeue()
        }, e.effects.effect.shake = function(t, i) {
            var s, n = e(this),
                o = ["position", "top", "bottom", "left", "right", "height", "width"],
                r = e.effects.setMode(n, t.mode || "effect"),
                a = t.direction || "left",
                l = t.distance || 20,
                h = t.times || 3,
                c = 2 * h + 1,
                u = Math.round(t.duration / c),
                d = "up" === a || "down" === a ? "top" : "left",
                p = "up" === a || "left" === a,
                f = {},
                m = {},
                g = {},
                v = n.queue(),
                b = v.length;
            for (e.effects.save(n, o), n.show(), e.effects.createWrapper(n), f[d] = (p ? "-=" : "+=") + l, m[d] = (p ? "+=" : "-=") + 2 * l, g[d] = (p ? "-=" : "+=") + 2 * l, n.animate(f, u, t.easing), s = 1; h > s; s++) n.animate(m, u, t.easing).animate(g, u, t.easing);
            n.animate(m, u, t.easing).animate(f, u / 2, t.easing).queue(function() { "hide" === r && n.hide(), e.effects.restore(n, o), e.effects.removeWrapper(n), i() }), b > 1 && v.splice.apply(v, [1, 0].concat(v.splice(b, c + 1))), n.dequeue()
        }, e.effects.effect.slide = function(t, i) {
            var s, n = e(this),
                o = ["position", "top", "bottom", "left", "right", "width", "height"],
                r = e.effects.setMode(n, t.mode || "show"),
                a = "show" === r,
                l = t.direction || "left",
                h = "up" === l || "down" === l ? "top" : "left",
                c = "up" === l || "left" === l,
                u = {};
            e.effects.save(n, o), n.show(), s = t.distance || n["top" === h ? "outerHeight" : "outerWidth"](!0), e.effects.createWrapper(n).css({ overflow: "hidden" }), a && n.css(h, c ? isNaN(s) ? "-" + s : -s : s), u[h] = (a ? c ? "+=" : "-=" : c ? "-=" : "+=") + s, n.animate(u, { queue: !1, duration: t.duration, easing: t.easing, complete: function() { "hide" === r && n.hide(), e.effects.restore(n, o), e.effects.removeWrapper(n), i() } })
        }
});
var jqxBaseFramework = window.minQuery || window.jQuery;
! function(e) {
    e.jqx = e.jqx || {}, e.jqx.define = function(e, t, i) { e[t] = function() { this.baseType && (this.base = new e[this.baseType], this.base.defineInstance()), this.defineInstance() }, e[t].prototype.defineInstance = function() {}, e[t].prototype.base = null, e[t].prototype.baseType = void 0, i && e[i] && (e[t].prototype.baseType = i) }, e.jqx.invoke = function(t, i) {
        if (0 != i.length) {
            for (var s = typeof i == Array || i.length > 0 ? i[0] : i, n = typeof i == Array || i.length > 1 ? Array.prototype.slice.call(i, 1) : e({}).toArray(); void 0 == t[s] && null != t.base;) {
                if (void 0 != t[s] && e.isFunction(t[s])) return t[s].apply(t, n);
                if ("string" == typeof s) { var o = s.toLowerCase(); if (void 0 != t[o] && e.isFunction(t[o])) return t[o].apply(t, n) }
                t = t.base
            }
            if (void 0 != t[s] && e.isFunction(t[s])) return t[s].apply(t, n);
            if ("string" == typeof s) { var o = s.toLowerCase(); if (void 0 != t[o] && e.isFunction(t[o])) return t[o].apply(t, n) }
        }
    }, e.jqx.hasProperty = function(e, t) {
        if ("object" == typeof t)
            for (var i in t) {
                for (var s = e; s;) {
                    if (s.hasOwnProperty(i)) return !0;
                    if (s.hasOwnProperty(i.toLowerCase())) return !0;
                    s = s.base
                }
                return !1
            } else
                for (; e;) {
                    if (e.hasOwnProperty(t)) return !0;
                    if (e.hasOwnProperty(t.toLowerCase())) return !0;
                    e = e.base
                }
        return !1
    }, e.jqx.hasFunction = function(t, i) {
        if (0 == i.length) return !1;
        if (void 0 == t) return !1;
        var s = typeof i == Array || i.length > 0 ? i[0] : i;
        for (typeof i == Array || i.length > 1 ? Array.prototype.slice.call(i, 1) : {}; void 0 == t[s] && null != t.base;) {
            if (t[s] && e.isFunction(t[s])) return !0;
            if ("string" == typeof s) { var n = s.toLowerCase(); if (t[n] && e.isFunction(t[n])) return !0 }
            t = t.base
        }
        if (t[s] && e.isFunction(t[s])) return !0;
        if ("string" == typeof s) { var n = s.toLowerCase(); if (t[n] && e.isFunction(t[n])) return !0 }
        return !1
    }, e.jqx.isPropertySetter = function(t, i) { return 1 == i.length && "object" == typeof i[0] ? !0 : 2 != i.length || "string" != typeof i[0] || e.jqx.hasFunction(t, i) ? !1 : !0 }, e.jqx.validatePropertySetter = function(t, i, s) { if (!e.jqx.propertySetterValidation) return !0; if (1 == i.length && "object" == typeof i[0]) { for (var n in i[0]) { for (var o = t; !o.hasOwnProperty(n) && o.base;) o = o.base; if (!o || !o.hasOwnProperty(n)) { if (!s) { var r = o.hasOwnProperty(n.toString().toLowerCase()); if (r) return !0; throw "Invalid property: " + n } return !1 } } return !0 } if (2 != i.length) { if (!s) throw "Invalid property: " + i.length >= 0 ? i[0] : ""; return !1 } for (; !t.hasOwnProperty(i[0]) && t.base;) t = t.base; if (!t || !t.hasOwnProperty(i[0])) { if (!s) throw "Invalid property: " + i[0]; return !1 } return !0 }, Object.keys || (Object.keys = function() {
        var e = Object.prototype.hasOwnProperty,
            t = !{ toString: null }.propertyIsEnumerable("toString"),
            i = ["toString", "toLocaleString", "valueOf", "hasOwnProperty", "isPrototypeOf", "propertyIsEnumerable", "constructor"],
            s = i.length;
        return function(n) {
            if ("object" != typeof n && ("function" != typeof n || null === n)) throw new TypeError("Object.keys called on non-object");
            var o, r, a = [];
            for (o in n) e.call(n, o) && a.push(o);
            if (t)
                for (r = 0; s > r; r++) e.call(n, i[r]) && a.push(i[r]);
            return a
        }
    }()), e.jqx.set = function(t, i) {
        var s = 0;
        if (1 == i.length && "object" == typeof i[0]) {
            if (t.isInitialized && Object.keys && Object.keys(i[0]).length > 1) {
                var n = t.base ? t.base.element : t.element,
                    o = e.data(n, t.widgetName).initArgs;
                if (o && JSON && JSON.stringify && i[0] && o[0]) try { if (JSON.stringify(i[0]) == JSON.stringify(o[0])) { var r = !0; if (e.each(i[0], function(e, i) { return t[e] != i ? (r = !1, !1) : void 0 }), r) return } } catch (a) {}
                t.batchUpdate = i[0];
                var l = {},
                    h = {};
                e.each(i[0], function(e, i) {
                    for (var n = t; !n.hasOwnProperty(e) && null != n.base;) n = n.base;
                    n.hasOwnProperty(e) ? t[e] != i && (l[e] = t[e], h[e] = i, s++) : n.hasOwnProperty(e.toLowerCase()) && t[e.toLowerCase()] != i && (l[e.toLowerCase()] = t[e.toLowerCase()], h[e.toLowerCase()] = i, s++)
                }), 2 > s && (t.batchUpdate = null)
            }
            e.each(i[0], function(i, s) {
                for (var n = t; !n.hasOwnProperty(i) && null != n.base;) n = n.base;
                if (n.hasOwnProperty(i)) e.jqx.setvalueraiseevent(n, i, s);
                else if (n.hasOwnProperty(i.toLowerCase())) e.jqx.setvalueraiseevent(n, i.toLowerCase(), s);
                else if (e.jqx.propertySetterValidation) throw "jqxCore: invalid property '" + i + "'"
            }), null != t.batchUpdate && (t.batchUpdate = null, t.propertiesChangedHandler && s > 1 && t.propertiesChangedHandler(t, l, h))
        } else if (2 == i.length) {
            for (; !t.hasOwnProperty(i[0]) && t.base;) t = t.base;
            if (t.hasOwnProperty(i[0])) e.jqx.setvalueraiseevent(t, i[0], i[1]);
            else if (t.hasOwnProperty(i[0].toLowerCase())) e.jqx.setvalueraiseevent(t, i[0].toLowerCase(), i[1]);
            else if (e.jqx.propertySetterValidation) throw "jqxCore: invalid property '" + i[0] + "'"
        }
    }, e.jqx.setvalueraiseevent = function(e, t, i) {
        var s = e[t];
        e[t] = i, e.isInitialized && (void 0 != e.propertyChangedHandler && e.propertyChangedHandler(e, t, s, i), void 0 != e.propertyChangeMap && void 0 != e.propertyChangeMap[t] && e.propertyChangeMap[t](e, t, s, i))
    }, e.jqx.get = function(e, t) {
        if (void 0 == t || null == t) return void 0;
        if (e.propertyMap) { var i = e.propertyMap(t); if (null != i) return i }
        if (e.hasOwnProperty(t)) return e[t];
        if (e.hasOwnProperty(t.toLowerCase())) return e[t.toLowerCase()];
        var s = void 0;
        if (typeof t == Array) {
            if (1 != t.length) return void 0;
            s = t[0]
        } else "string" == typeof t && (s = t);
        for (; !e.hasOwnProperty(s) && e.base;) e = e.base;
        return e ? e[s] : void 0
    }, e.jqx.serialize = function(t) {
        var i = "";
        if (e.isArray(t)) {
            i = "[";
            for (var s = 0; s < t.length; s++) s > 0 && (i += ", "), i += e.jqx.serialize(t[s]);
            i += "]"
        } else if ("object" == typeof t) {
            i = "{";
            var n = 0;
            for (var s in t) n++ > 0 && (i += ", "), i += s + ": " + e.jqx.serialize(t[s]);
            i += "}"
        } else i = t.toString();
        return i
    }, e.jqx.propertySetterValidation = !0, e.jqx.jqxWidgetProxy = function(t, i, s) { var n = (e(i), e.data(i, t)); if (void 0 == n) return void 0; var o = n.instance; if (e.jqx.hasFunction(o, s)) return e.jqx.invoke(o, s); if (e.jqx.isPropertySetter(o, s)) { if (e.jqx.validatePropertySetter(o, s)) return void e.jqx.set(o, s) } else { if ("object" == typeof s && 0 == s.length) return; if ("object" == typeof s && 1 == s.length && e.jqx.hasProperty(o, s[0])) return e.jqx.get(o, s[0]); if ("string" == typeof s && e.jqx.hasProperty(o, s[0])) return e.jqx.get(o, s) } throw "jqxCore: Invalid parameter '" + e.jqx.serialize(s) + "' does not exist." }, e.jqx.applyWidget = function(t, i, s, n) {
        var o = !1;
        try { o = void 0 != window.MSApp } catch (r) {}
        var a = e(t);
        n ? (n.host = a, n.element = t) : n = new e.jqx["_" + i], "" == t.id && (t.id = e.jqx.utilities.createId());
        var l = { host: a, element: t, instance: n, initArgs: s };
        n.widgetName = i, e.data(t, i, l), e.data(t, "jqxWidget", l.instance);
        for (var h = new Array, n = l.instance; n;) n.isInitialized = !1, h.push(n), n = n.base;
        h.reverse(), h[0].theme = e.jqx.theme || "", e.jqx.jqxWidgetProxy(i, t, s);
        for (var c in h) n = h[c], 0 == c && (n.host = a, n.element = t, n.WinJS = o), void 0 != n && (n.definedInstance && n.definedInstance(), null != n.createInstance && (o ? MSApp.execUnsafeLocalFunction(function() { n.createInstance(s) }) : n.createInstance(s)));
        for (var c in h) void 0 != h[c] && (h[c].isInitialized = !0);
        o ? MSApp.execUnsafeLocalFunction(function() { l.instance.refresh(!0) }) : l.instance.refresh(!0)
    }, e.jqx.jqxWidget = function(t, i, s) {
        var n = !1;
        try { jqxArgs = Array.prototype.slice.call(s, 0) } catch (o) { jqxArgs = "" }
        try { n = void 0 != window.MSApp } catch (o) {}
        var r = t,
            a = "";
        i && (a = "_" + i), e.jqx.define(e.jqx, "_" + r, a);
        var l = new Array;
        if (!window[r]) {
            var h = function(t) {
                if (null == t) return "";
                var i = e.type(t);
                switch (i) {
                    case "string":
                    case "number":
                    case "date":
                    case "boolean":
                    case "bool":
                        return null === t ? "" : t.toString()
                }
                var s = "";
                return e.each(t, function(t) {
                    var i = this;
                    t > 0 && (s += ", "), s += "[";
                    var n = 0;
                    if ("object" == e.type(i))
                        for (var o in i) n > 0 && (s += ", "), s += "{" + o + ":" + i[o] + "}", n++;
                    else n > 0 && (s += ", "), s += "{" + t + ":" + i + "}", n++;
                    s += "]"
                }), s
            };
            window[r] = function(t, i) {
                var s = [];
                i || (i = {}), s.push(i);
                var n = t;
                if ("object" === e.type(n) && t[0] && (n = t[0].id, "" === n && (n = t[0].id = e.jqx.utilities.createId())), window.jqxWidgets && window.jqxWidgets[n]) {
                    if (i && e.each(window.jqxWidgets[n], function(t) {
                            var s = e(this.element).data();
                            s && s.jqxWidget && e(this.element)[r](i)
                        }), 1 == window.jqxWidgets[n].length) { var o = e(window.jqxWidgets[n][0].widgetInstance.element).data(); if (o && o.jqxWidget) return window.jqxWidgets[n][0] }
                    var o = e(window.jqxWidgets[n][0].widgetInstance.element).data();
                    if (o && o.jqxWidget) return window.jqxWidgets[n]
                }
                var a = e(t);
                if (0 === a.length) throw new Error("Invalid Selector - " + t + "! Please, check whether the used ID or CSS Class name is correct.");
                var c = [];
                return e.each(a, function(t) {
                    var i = a[t],
                        o = null;
                    if (!l[r]) {
                        var u = i.id;
                        i.id = "", o = e(i).clone(), i.id = u
                    }
                    if (e.jqx.applyWidget(i, r, s, void 0), !l[r]) {
                        var d = e.data(i, "jqxWidget"),
                            p = o[r]().data().jqxWidget.defineInstance(),
                            f = function(t) {
                                var i = e.data(t, "jqxWidget");
                                this.widgetInstance = i;
                                var s = e.extend(this, i);
                                return s.on = function(e, t) { s.addHandler(s.host, e, t) }, s.off = function(e) { s.removeHandler(s.host, e) }, s
                            };
                        l[r] = f, e.each(p, function(e, t) {
                            Object.defineProperty(f.prototype, e, {
                                get: function() { return this.widgetInstance ? this.widgetInstance[e] : t },
                                set: function(t) {
                                    if (this.widgetInstance && this.widgetInstance[e] != t && this.widgetInstance[e] != t && h(this.widgetInstance[e]) != h(t)) {
                                        var i = {};
                                        i[e] = t, this.widgetInstance.host[r](i), this.widgetInstance[e] = t
                                    }
                                }
                            })
                        })
                    }
                    var d = new l[r](i);
                    c.push(d), window.jqxWidgets || (window.jqxWidgets = new Array), window.jqxWidgets[n] || (window.jqxWidgets[n] = new Array), window.jqxWidgets[n].push(d)
                }), 1 === c.length ? c[0] : c
            }
        }
        e.fn[r] = function() {
            var t = Array.prototype.slice.call(arguments, 0);
            if (0 == t.length || 1 == t.length && "object" == typeof t[0]) {
                if (0 == this.length) throw this.selector ? new Error("Invalid Selector - " + this.selector + "! Please, check whether the used ID or CSS Class name is correct.") : new Error("Invalid Selector! Please, check whether the used ID or CSS Class name is correct.");
                return this.each(function() {
                    var i = (e(this), this),
                        s = e.data(i, r);
                    null == s ? e.jqx.applyWidget(i, r, t, void 0) : e.jqx.jqxWidgetProxy(r, this, t)
                })
            }
            if (0 == this.length) throw this.selector ? new Error("Invalid Selector - " + this.selector + "! Please, check whether the used ID or CSS Class name is correct.") : new Error("Invalid Selector! Please, check whether the used ID or CSS Class name is correct.");
            var i = null,
                s = 0;
            return this.each(function() {
                var n = e.jqx.jqxWidgetProxy(r, this, t);
                if (0 == s) i = n, s++;
                else {
                    if (1 == s) {
                        var o = [];
                        o.push(i), i = o
                    }
                    i.push(n)
                }
            }), i
        };
        try { e.extend(e.jqx["_" + r].prototype, Array.prototype.slice.call(s, 0)[0]) } catch (o) {}
        e.extend(e.jqx["_" + r].prototype, { toThemeProperty: function(t, i) { return e.jqx.toThemeProperty(this, t, i) } }), e.jqx["_" + r].prototype.refresh = function() { this.base && this.base.refresh(!0) }, e.jqx["_" + r].prototype.createInstance = function() {}, e.jqx["_" + r].prototype.applyTo = function(t, i) {
            if (!(i instanceof Array)) {
                var s = [];
                s.push(i), i = s
            }
            e.jqx.applyWidget(t, r, i, this)
        }, e.jqx["_" + r].prototype.getInstance = function() { return this }, e.jqx["_" + r].prototype.propertyChangeMap = {}, e.jqx["_" + r].prototype.addHandler = function(t, i, s, n) { e.jqx.addHandler(t, i, s, n) }, e.jqx["_" + r].prototype.removeHandler = function(t, i, s) { e.jqx.removeHandler(t, i, s) }
    }, e.jqx.toThemeProperty = function(e, t, i) {
        if ("" == e.theme) return t;
        for (var s = t.split(" "), n = "", o = 0; o < s.length; o++) {
            o > 0 && (n += " ");
            var r = s[o];
            n += null != i && i ? r + "-" + e.theme : r + " " + r + "-" + e.theme
        }
        return n
    }, e.jqx.addHandler = function(t, i, s, n) {
        for (var o = i.split(" "), r = 0; r < o.length; r++) {
            var a = o[r];
            if (window.addEventListener) switch (a) {
                case "mousewheel":
                    e.jqx.browser.mozilla ? t[0].addEventListener("DOMMouseScroll", s, !1) : t[0].addEventListener("mousewheel", s, !1);
                    continue;
                case "mousemove":
                    if (!n) { t[0].addEventListener("mousemove", s, !1); continue }
            }
            void 0 == n || null == n ? t.on ? t.on(a, s) : t.bind(a, s) : t.on ? t.on(a, n, s) : t.bind(a, n, s)
        }
    }, e.jqx.removeHandler = function(t, i, s) {
        if (!i) return void(t.off ? t.off() : t.unbind());
        for (var n = i.split(" "), o = 0; o < n.length; o++) {
            var r = n[o];
            if (window.removeEventListener) switch (r) {
                case "mousewheel":
                    e.jqx.browser.mozilla ? t[0].removeEventListener("DOMMouseScroll", s, !1) : t[0].removeEventListener("mousewheel", s, !1);
                    continue;
                case "mousemove":
                    if (s) { t[0].removeEventListener("mousemove", s, !1); continue }
            }
            void 0 != r ? void 0 == s ? t.off ? t.off(r) : t.unbind(r) : t.off ? t.off(r, s) : t.unbind(r, s) : t.off ? t.off() : t.unbind()
        }
    }, e.jqx.theme = e.jqx.theme || "", e.jqx.scrollAnimation = e.jqx.scrollAnimation || !1, e.jqx.resizeDelay = e.jqx.resizeDelay || 10, e.jqx.ready = function() { e(window).trigger("jqxReady") }, e.jqx.init = function() { e.each(arguments[0], function(t, i) { "theme" == t && (e.jqx.theme = i), "scrollBarSize" == t && (e.jqx.utilities.scrollBarSize = i), "touchScrollBarSize" == t && (e.jqx.utilities.touchScrollBarSize = i), "scrollBarButtonsVisibility" == t && (e.jqx.utilities.scrollBarButtonsVisibility = i) }) }, e.jqx.utilities = e.jqx.utilities || {}, e.extend(e.jqx.utilities, {
        scrollBarSize: 15,
        touchScrollBarSize: 0,
        scrollBarButtonsVisibility: "visible",
        createId: function() { var e = function() { return (65536 * (1 + Math.random()) | 0).toString(16).substring(1) }; return "jqxWidget" + e() + e() },
        setTheme: function(t, i, s) {
            if ("undefined" != typeof s) {
                for (var n = s[0].className.split(" "), o = [], r = [], a = s.children(), l = 0; l < n.length; l += 1) n[l].indexOf(t) >= 0 && (t.length > 0 ? (o.push(n[l]), r.push(n[l].replace(t, i))) : r.push(n[l].replace("-" + i, "") + "-" + i));
                this._removeOldClasses(o, s), this._addNewClasses(r, s);
                for (var l = 0; l < a.length; l += 1) this.setTheme(t, i, e(a[l]))
            }
        },
        _removeOldClasses: function(e, t) { for (var i = 0; i < e.length; i += 1) t.removeClass(e[i]) },
        _addNewClasses: function(e, t) { for (var i = 0; i < e.length; i += 1) t.addClass(e[i]) },
        getOffset: function(t) {
            var i = e.jqx.mobile.getLeftPos(t[0]),
                s = e.jqx.mobile.getTopPos(t[0]);
            return { top: s, left: i }
        },
        resize: function(t, i, s, n) {
            void 0 === n && (n = !0);
            var o = -1,
                r = this,
                a = function(e) {
                    if (!r.hiddenWidgets) return -1;
                    for (var t = -1, i = 0; i < r.hiddenWidgets.length; i++)
                        if (e.id) { if (r.hiddenWidgets[i].id == e.id) { t = i; break } } else if (r.hiddenWidgets[i].id == e[0].id) { t = i; break }
                    return t
                };
            if (this.resizeHandlers) {
                for (var l = 0; l < this.resizeHandlers.length; l++)
                    if (t.id) { if (this.resizeHandlers[l].id == t.id) { o = l; break } } else if (this.resizeHandlers[l].id == t[0].id) { o = l; break }
                if (s === !0) {
                    if (-1 != o && this.resizeHandlers.splice(o, 1), 0 == this.resizeHandlers.length) {
                        var h = e(window);
                        h.off ? (h.off("resize.jqx"), h.off("orientationchange.jqx"), h.off("orientationchanged.jqx")) : (h.unbind("resize.jqx"), h.unbind("orientationchange.jqx"), h.unbind("orientationchanged.jqx")), this.resizeHandlers = null
                    }
                    var c = a(t);
                    return void(-1 != c && this.hiddenWidgets && this.hiddenWidgets.splice(c, 1))
                }
            } else if (s === !0) { var c = a(t); return void(-1 != c && this.hiddenWidgets && this.hiddenWidgets.splice(c, 1)) }
            var r = this,
                u = function(t, i) {
                    if (r.resizeHandlers) {
                        var s = function(e) { for (var t = -1, i = e.parentNode; i;) t++, i = i.parentNode; return t },
                            n = function(e, t) {
                                if (!e.widget || !t.widget) return 0;
                                var i = s(e.widget[0]),
                                    n = s(t.widget[0]);
                                try { if (n > i) return -1; if (i > n) return 1 } catch (o) {}
                                return 0
                            },
                            o = function(t) {
                                if (r.hiddenWidgets.length > 0) {
                                    r.hiddenWidgets.sort(n);
                                    var s = function() {
                                        for (var t = !1, s = new Array, n = 0; n < r.hiddenWidgets.length; n++) {
                                            var o = r.hiddenWidgets[n];
                                            e.jqx.isHidden(o.widget) ? (t = !0, s.push(o)) : o.callback && o.callback(i)
                                        }
                                        r.hiddenWidgets = s, t || clearInterval(r.__resizeInterval)
                                    };
                                    if (0 == t) return s(), void(r.__resizeInterval && clearInterval(r.__resizeInterval));
                                    r.__resizeInterval && clearInterval(r.__resizeInterval), r.__resizeInterval = setInterval(function() { s() }, 100)
                                }
                            };
                        r.hiddenWidgets && r.hiddenWidgets.length > 0 && o(!1), r.hiddenWidgets = new Array, r.resizeHandlers.sort(n);
                        for (var l = 0; l < r.resizeHandlers.length; l++) {
                            var h = r.resizeHandlers[l],
                                c = h.widget,
                                u = h.data;
                            if (u && u.jqxWidget) {
                                var d = u.jqxWidget.width,
                                    p = u.jqxWidget.height;
                                u.jqxWidget.base && (void 0 == d && (d = u.jqxWidget.base.width), void 0 == p && (p = u.jqxWidget.base.height)), void 0 === d && void 0 === p && (d = u.jqxWidget.element.style.width, p = u.jqxWidget.element.style.height);
                                var f = !1;
                                if (null != d && -1 != d.toString().indexOf("%") && (f = !0), null != p && -1 != p.toString().indexOf("%") && (f = !0), e.jqx.isHidden(c)) - 1 === a(c) && (f || t === !0) && h.data.nestedWidget !== !0 && r.hiddenWidgets.push(h);
                                else if ((void 0 === t || t !== !0) && (f && (h.callback(i), r.hiddenWidgets.indexOf(h) >= 0 && r.hiddenWidgets.splice(r.hiddenWidgets.indexOf(h), 1)), u.jqxWidget.element)) {
                                    var m = u.jqxWidget.element.className;
                                    if ((m.indexOf("dropdownlist") >= 0 || m.indexOf("datetimeinput") >= 0 || m.indexOf("combobox") >= 0 || m.indexOf("menu") >= 0) && u.jqxWidget.isOpened) {
                                        var g = u.jqxWidget.isOpened();
                                        if (g) {
                                            if (i && "resize" == i && e.jqx.mobile.isTouchDevice()) continue;
                                            u.jqxWidget.close()
                                        }
                                    }
                                }
                            }
                        }
                        o()
                    }
                };
            if (!this.resizeHandlers) {
                this.resizeHandlers = new Array;
                var h = e(window);
                h.on ? (this._resizeTimer = null, this._initResize = null, h.on("resize.jqx", function(t) { void 0 != r._resizeTimer && clearTimeout(r._resizeTimer), r._initResize ? r._resizeTimer = setTimeout(function() { u(null, "resize") }, e.jqx.resizeDelay) : (r._initResize = !0, u(null, "resize")) }), h.on("orientationchange.jqx", function(e) { u(null, "orientationchange") }), h.on("orientationchanged.jqx", function(e) { u(null, "orientationchange") })) : (h.bind("resize.jqx", function(e) { u(null, "orientationchange") }), h.bind("orientationchange.jqx", function(e) { u(null, "orientationchange") }), h.bind("orientationchanged.jqx", function(e) { u(null, "orientationchange") }))
            }
            var d = t.data();
            n && -1 === o && this.resizeHandlers.push({ id: t[0].id, widget: t, callback: i, data: d });
            try {
                var p = d.jqxWidget.width,
                    f = d.jqxWidget.height;
                d.jqxWidget.base && (void 0 == p && (p = d.jqxWidget.base.width), void 0 == f && (f = d.jqxWidget.base.height)), void 0 === p && void 0 === f && (p = d.jqxWidget.element.style.width, f = d.jqxWidget.element.style.height);
                var m = !1;
                if (null != p && -1 != p.toString().indexOf("%") && (m = !0), null != f && -1 != f.toString().indexOf("%") && (m = !0), m) {
                    this.watchedElementData || (this.watchedElementData = []);
                    var r = this,
                        g = function(t) {
                            r.watchedElementData.forEach && r.watchedElementData.forEach(function(t) {
                                (t.element.offsetWidth !== t.offsetWidth || t.element.offsetHeight !== t.offsetHeight) && (t.offsetWidth = t.element.offsetWidth, t.offsetHeight = t.element.offsetHeight, t.timer && clearTimeout(t.timer), t.timer = setTimeout(function() { e.jqx.isHidden(e(t.element)) || t.callback() }))
                            })
                        };
                    r.watchedElementData.push({ element: t[0], offsetWidth: t[0].offsetWidth, offsetHeight: t[0].offsetHeight, callback: i }), r.observer || (r.observer = new MutationObserver(g), r.observer.observe(document.body, { attributes: !0, childList: !0, characterData: !0 }))
                }
            } catch (v) {}
            e.jqx.isHidden(t) && n === !0 && u(!0), e.jqx.resize = function() { u(null, "resize") }
        },
        html: function(t, i) {
            if (!e(t).on) return e(t).html(i);
            try {
                return e.access(t, function(i) {
                    var s = t[0] || {},
                        n = 0,
                        o = t.length;
                    if (void 0 === i) return 1 === s.nodeType ? s.innerHTML.replace(rinlinejQuery, "") : void 0;
                    var r = /<(?:script|style|link)/i,
                        a = "abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|header|hgroup|mark|meter|nav|output|progress|section|summary|time|video",
                        l = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
                        h = /<([\w:]+)/,
                        c = new RegExp("<(?:" + a + ")[\\s/>]", "i"),
                        u = /^\s+/,
                        d = { option: [1, "<select multiple='multiple'>", "</select>"], legend: [1, "<fieldset>", "</fieldset>"], thead: [1, "<table>", "</table>"], tr: [2, "<table><tbody>", "</tbody></table>"], td: [3, "<table><tbody><tr>", "</tr></tbody></table>"], col: [2, "<table><tbody></tbody><colgroup>", "</colgroup></table>"], area: [1, "<map>", "</map>"], _default: [0, "", ""] };
                    if ("string" == typeof i && !r.test(i) && (e.support.htmlSerialize || !c.test(i)) && (e.support.leadingWhitespace || !u.test(i)) && !d[(h.exec(i) || ["", ""])[1].toLowerCase()]) {
                        i = i.replace(l, "<$1></$2>");
                        try {
                            for (; o > n; n++) s = this[n] || {}, 1 === s.nodeType && (e.cleanData(s.getElementsByTagName("*")), s.innerHTML = i);
                            s = 0
                        } catch (p) {}
                    }
                    s && t.empty().append(i)
                }, null, i, arguments.length)
            } catch (s) { return e(t).html(i) }
        },
        hasTransform: function(t) { var i = ""; if (i = t.css("transform"), "" == i || "none" == i) { if (i = t.parents().css("transform"), "" != i && "none" != i) return "" != i && "none" != i; var s = e.jqx.utilities.getBrowser(); "msie" == s.browser ? (i = t.css("-ms-transform"), ("" == i || "none" == i) && (i = t.parents().css("-ms-transform"))) : "chrome" == s.browser ? (i = t.css("-webkit-transform"), ("" == i || "none" == i) && (i = t.parents().css("-webkit-transform"))) : "opera" == s.browser ? (i = t.css("-o-transform"), ("" == i || "none" == i) && (i = t.parents().css("-o-transform"))) : "mozilla" == s.browser && (i = t.css("-moz-transform"), ("" == i || "none" == i) && (i = t.parents().css("-moz-transform"))) } return ("" == i || "none" == i) && (i = e(document.body).css("transform")), "" != i && "none" != i && null != i },
        getBrowser: function() {
            var e = navigator.userAgent.toLowerCase(),
                t = /(chrome)[ \/]([\w.]+)/.exec(e) || /(webkit)[ \/]([\w.]+)/.exec(e) || /(opera)(?:.*version|)[ \/]([\w.]+)/.exec(e) || /(msie) ([\w.]+)/.exec(e) || e.indexOf("compatible") < 0 && /(mozilla)(?:.*? rv:([\w.]+)|)/.exec(e) || [],
                i = { browser: t[1] || "", version: t[2] || "0" };
            return e.indexOf("rv:11.0") >= 0 && e.indexOf(".net4.0c") >= 0 && (i.browser = "msie", i.version = "11", t[1] = "msie"), e.indexOf("edge") >= 0 && (i.browser = "msie", i.version = "12", t[1] = "msie"), i[t[1]] = t[1], i
        }
    }), e.jqx.browser = e.jqx.utilities.getBrowser(), e.jqx.isHidden = function(e) {
        if (!e || !e[0]) return !1;
        var t = e[0].offsetWidth,
            i = e[0].offsetHeight;
        return 0 === t || 0 === i ? !0 : !1
    }, e.jqx.ariaEnabled = !0, e.jqx.aria = function(t, i, s) {
        if (e.jqx.ariaEnabled)
            if (void 0 == i) e.each(t.aria, function(i, s) {
                var n = t.base ? t.base.host.attr(i) : t.host.attr(i);
                if (void 0 == n || e.isFunction(n)) {
                    var n = t[s.name];
                    e.isFunction(n) && (n = t[s.name]()), void 0 == n && (n = "");
                    try { t.base ? t.base.host.attr(i, n.toString()) : t.host.attr(i, n.toString()) } catch (o) {}
                } else {
                    var r = n;
                    switch (s.type) {
                        case "number":
                            r = new Number(n), isNaN(r) && (r = n);
                            break;
                        case "boolean":
                            r = "true" == n ? !0 : !1;
                            break;
                        case "date":
                            r = new Date(n), ("Invalid Date" == r || isNaN(r)) && (r = n)
                    }
                    t[s.name] = r
                }
            });
            else try { t.host ? t.base ? t.base.host ? t.base.host.attr(i, s.toString()) : t.attr(i, s.toString()) : t.host ? t.element.setAttribute ? t.element.setAttribute(i, s.toString()) : t.host.attr(i, s.toString()) : t.attr(i, s.toString()) : t.setAttribute && t.setAttribute(i, s.toString()) } catch (n) {}
    }, Array.prototype.indexOf || (Array.prototype.indexOf = function(e) {
        var t = this.length,
            i = Number(arguments[1]) || 0;
        for (i = 0 > i ? Math.ceil(i) : Math.floor(i), 0 > i && (i += t); t > i; i++)
            if (i in this && this[i] === e) return i;
        return -1
    }), e.jqx.mobile = e.jqx.mobile || {}, e.jqx.position = function(t) {
        var i = parseInt(t.pageX),
            s = parseInt(t.pageY);
        if (e.jqx.mobile.isTouchDevice()) {
            var n = e.jqx.mobile.getTouches(t),
                o = n[0];
            i = parseInt(o.pageX), s = parseInt(o.pageY)
        }
        return { left: i, top: s }
    }, e.extend(e.jqx.mobile, {
        _touchListener: function(e, t) {
            var i = function(e, t) { var i = document.createEvent("MouseEvents"); return i.initMouseEvent(e, t.bubbles, t.cancelable, t.view, t.detail, t.screenX, t.screenY, t.clientX, t.clientY, t.ctrlKey, t.altKey, t.shiftKey, t.metaKey, t.button, t.relatedTarget), i._pageX = t.pageX, i._pageY = t.pageY, i },
                s = { mousedown: "touchstart", mouseup: "touchend", mousemove: "touchmove" },
                n = i(s[e.type], e);
            e.target.dispatchEvent(n);
            var o = e.target["on" + s[e.type]];
            "function" == typeof o && o(e)
        },
        setMobileSimulator: function(t, i) {
            if (!this.isTouchDevice()) {
                this.simulatetouches = !0, 0 == i && (this.simulatetouches = !1);
                var s = { mousedown: "touchstart", mouseup: "touchend", mousemove: "touchmove" },
                    n = this;
                if (window.addEventListener) {
                    var o = function() { for (var e in s) t.addEventListener && (t.removeEventListener(e, n._touchListener), t.addEventListener(e, n._touchListener, !1)) };
                    e.jqx.browser.msie, o()
                }
            }
        },
        isTouchDevice: function() {
            if (void 0 != this.touchDevice) return this.touchDevice;
            var e = "Browser CodeName: " + navigator.appCodeName;
            if (e += "Browser Name: " + navigator.appName, e += "Browser Version: " + navigator.appVersion, e += "Platform: " + navigator.platform, e += "User-agent header: " + navigator.userAgent, -1 != e.indexOf("Android")) return !0;
            if (-1 != e.indexOf("IEMobile")) return !0;
            if (-1 != e.indexOf("Windows Phone")) return !0;
            if (-1 != e.indexOf("WPDesktop")) return !0;
            if (-1 != e.indexOf("ZuneWP7")) return !0;
            if (-1 != e.indexOf("BlackBerry") && -1 != e.indexOf("Mobile Safari")) return !0;
            if (-1 != e.indexOf("ipod")) return !0;
            if (-1 != e.indexOf("nokia") || -1 != e.indexOf("Nokia")) return !0;
            if (-1 != e.indexOf("Chrome/17")) return !1;
            if (-1 != e.indexOf("CrOS")) return !1;
            if (-1 != e.indexOf("Opera") && -1 == e.indexOf("Mobi") && -1 == e.indexOf("Mini") && -1 != e.indexOf("Platform: Win")) return !1;
            if (-1 != e.indexOf("Opera") && -1 != e.indexOf("Mobi") && -1 != e.indexOf("Opera Mobi")) return !0;
            var t = { ios: "i(?:Pad|Phone|Pod)(?:.*)CPU(?: iPhone)? OS ", android: "(Android |HTC_|Silk/)", blackberry: "BlackBerry(?:.*)Version/", rimTablet: "RIM Tablet OS ", webos: "(?:webOS|hpwOS)/", bada: "Bada/" };
            try {
                if (void 0 != this.touchDevice) return this.touchDevice;
                this.touchDevice = !1;
                for (i in t)
                    if (t.hasOwnProperty(i) && (prefix = t[i], match = e.match(new RegExp("(?:" + prefix + ")([^\\s;]+)")), match)) return "blackberry" == i.toString() ? (this.touchDevice = !1, !1) : (this.touchDevice = !0, !0);
                var s = navigator.userAgent;
                if (-1 != navigator.platform.toLowerCase().indexOf("win")) { if (s.indexOf("Windows Phone") >= 0 || s.indexOf("WPDesktop") >= 0 || s.indexOf("IEMobile") >= 0 || s.indexOf("ZuneWP7") >= 0) return this.touchDevice = !0, !0; if (s.indexOf("Touch") >= 0) { var n = "MSPointerDown" in window || "pointerdown" in window; return n ? (this.touchDevice = !0, !0) : s.indexOf("ARM") >= 0 ? (this.touchDevice = !0, !0) : (this.touchDevice = !1, !1) } }
                return -1 != navigator.platform.toLowerCase().indexOf("win") ? (this.touchDevice = !1, !1) : (("ontouchstart" in window || window.DocumentTouch && document instanceof DocumentTouch) && (this.touchDevice = !0), this.touchDevice)
            } catch (o) { return this.touchDevice = !1, !1 }
        },
        getLeftPos: function(e) { for (var t = e.offsetLeft; null != (e = e.offsetParent);) "HTML" != e.tagName && (t += e.offsetLeft, document.all && (t += e.clientLeft)); return t },
        getTopPos: function(t) {
            for (var i = t.offsetTop, s = e(t).coord(); null != (t = t.offsetParent);) "HTML" != t.tagName && (i += t.offsetTop - t.scrollTop, document.all && (i += t.clientTop));
            var n = navigator.userAgent.toLowerCase(),
                o = (-1 != n.indexOf("windows phone") || -1 != n.indexOf("WPDesktop") || -1 != n.indexOf("ZuneWP7") || -1 != n.indexOf("msie 9") || -1 != n.indexOf("msie 11") || -1 != n.indexOf("msie 10")) && -1 != n.indexOf("touch");
            return o ? s.top : this.isSafariMobileBrowser() ? this.isSafari4MobileBrowser() && this.isIPadSafariMobileBrowser() ? i : -1 != n.indexOf("version/7") ? s.top : ((-1 != n.indexOf("version/6") || -1 != n.indexOf("version/5")) && (i += e(window).scrollTop()), /(Android.*Chrome\/[.0-9]* (!?Mobile))/.exec(navigator.userAgent) ? i + e(window).scrollTop() : /(Android.*Chrome\/[.0-9]* Mobile)/.exec(navigator.userAgent) ? i + e(window).scrollTop() : s.top) : i
        },
        isChromeMobileBrowser: function() {
            var e = navigator.userAgent.toLowerCase(),
                t = -1 != e.indexOf("android");
            return t
        },
        isOperaMiniMobileBrowser: function() {
            var e = navigator.userAgent.toLowerCase(),
                t = -1 != e.indexOf("opera mini") || -1 != e.indexOf("opera mobi");
            return t
        },
        isOperaMiniBrowser: function() {
            var e = navigator.userAgent.toLowerCase(),
                t = -1 != e.indexOf("opera mini");
            return t
        },
        isNewSafariMobileBrowser: function() {
            var e = navigator.userAgent.toLowerCase(),
                t = -1 != e.indexOf("ipad") || -1 != e.indexOf("iphone") || -1 != e.indexOf("ipod");
            return t = t && -1 != e.indexOf("version/5")
        },
        isSafari4MobileBrowser: function() {
            var e = navigator.userAgent.toLowerCase(),
                t = -1 != e.indexOf("ipad") || -1 != e.indexOf("iphone") || -1 != e.indexOf("ipod");
            return t = t && -1 != e.indexOf("version/4")
        },
        isWindowsPhone: function() {
            var e = navigator.userAgent.toLowerCase(),
                t = -1 != e.indexOf("windows phone") || -1 != e.indexOf("WPDesktop") || -1 != e.indexOf("ZuneWP7") || -1 != e.indexOf("msie 9") || -1 != e.indexOf("msie 11") || -1 != e.indexOf("msie 10") && -1 != e.indexOf("touch");
            return t
        },
        isSafariMobileBrowser: function() {
            var e = navigator.userAgent.toLowerCase();
            if (/(Android.*Chrome\/[.0-9]* (!?Mobile))/.exec(navigator.userAgent)) return !0;
            if (/(Android.*Chrome\/[.0-9]* Mobile)/.exec(navigator.userAgent)) return !0;
            var t = -1 != e.indexOf("ipad") || -1 != e.indexOf("iphone") || -1 != e.indexOf("ipod") || -1 != e.indexOf("mobile safari");
            return t
        },
        isIPadSafariMobileBrowser: function() {
            var e = navigator.userAgent.toLowerCase(),
                t = -1 != e.indexOf("ipad");
            return t
        },
        isMobileBrowser: function() {
            var e = navigator.userAgent.toLowerCase(),
                t = -1 != e.indexOf("ipad") || -1 != e.indexOf("iphone") || -1 != e.indexOf("android");
            return t
        },
        getTouches: function(e) { if (e.originalEvent) { if (e.originalEvent.touches && e.originalEvent.touches.length) return e.originalEvent.touches; if (e.originalEvent.changedTouches && e.originalEvent.changedTouches.length) return e.originalEvent.changedTouches } return e.touches || (e.touches = new Array, e.touches[0] = void 0 != e.originalEvent ? e.originalEvent : e, void 0 != e.originalEvent && e.pageX && (e.touches[0] = e), "mousemove" == e.type && (e.touches[0] = e)), e.touches },
        getTouchEventName: function(e) { if (!this.isWindowsPhone()) return e; var t = navigator.userAgent.toLowerCase(); if (-1 != t.indexOf("windows phone 7")) { if (-1 != e.toLowerCase().indexOf("start")) return "MSPointerDown"; if (-1 != e.toLowerCase().indexOf("move")) return "MSPointerMove"; if (-1 != e.toLowerCase().indexOf("end")) return "MSPointerUp" } return -1 != e.toLowerCase().indexOf("start") ? "pointerdown" : -1 != e.toLowerCase().indexOf("move") ? "pointermove" : -1 != e.toLowerCase().indexOf("end") ? "pointerup" : void 0 },
        dispatchMouseEvent: function(e, t, i) {
            if (!this.simulatetouches) {
                var s = document.createEvent("MouseEvent");
                s.initMouseEvent(e, !0, !0, t.view, 1, t.screenX, t.screenY, t.clientX, t.clientY, !1, !1, !1, !1, 0, null), null != i && i.dispatchEvent(s)
            }
        },
        getRootNode: function(e) { for (; 1 !== e.nodeType;) e = e.parentNode; return e },
        setTouchScroll: function(e, t) { this.enableScrolling || (this.enableScrolling = []), this.enableScrolling[t] = e },
        touchScroll: function(t, i, s, n, o, r) {
            function a(e) { if (e.targetTouches && e.targetTouches.length >= 1) return e.targetTouches[0].clientY; if (e.originalEvent && void 0 !== e.originalEvent.clientY) return e.originalEvent.clientY; var t = u.getTouches(e); return t[0].clientY }

            function l(e) { if (e.targetTouches && e.targetTouches.length >= 1) return e.targetTouches[0].clientX; if (e.originalEvent && void 0 !== e.originalEvent.clientX) return e.originalEvent.clientX; var t = u.getTouches(e); return t[0].clientX }

            function h() {
                var e, t;
                A && (e = Date.now() - E, t = -A * Math.exp(-e / N), t > .5 || -.5 > t ? (R(M + t, event), requestAnimationFrame(h)) : (R(M), r.fadeOut("fast")))
            }

            function c() {
                var e, t;
                A && (e = Date.now() - E, t = -A * Math.exp(-e / N), t > .5 || -.5 > t ? (F(H + t), requestAnimationFrame(c)) : (F(H), o.fadeOut("fast")))
            }
            if (null != t) {
                var u = this,
                    d = 0,
                    p = 0,
                    f = 0,
                    m = 0,
                    g = 0,
                    v = 0;
                this.scrolling || (this.scrolling = []), this.scrolling[n] = !1;
                var b = !1,
                    y = e(t),
                    x = ["select", "input", "textarea"],
                    w = 0,
                    _ = 0;
                this.enableScrolling || (this.enableScrolling = []), this.enableScrolling[n] = !0;
                var C, I, T, k, S, D, P, j, E, q, A, M, H, O, N, n = n,
                    $ = this.getTouchEventName("touchstart") + ".touchScroll",
                    z = this.getTouchEventName("touchend") + ".touchScroll",
                    L = this.getTouchEventName("touchmove") + ".touchScroll";
                T = i, I = 0, k = 0, xoffset = 0, initialOffset = 0, initialXOffset = 0, C = o.jqxScrollBar("max"), N = 325;
                var B = function() {
                        var e, t, i, s;
                        e = Date.now(), t = e - E, E = e, i = k - j, xdelta = xoffset - xframe, j = k, xframe = xoffset, D = !0, s = 1e3 * i / (1 + t), xv = 1e3 * xdelta / (1 + t), P = .8 * s + .2 * P, xjqxAnimations = .8 * xv + .2 * xjqxAnimations
                    },
                    W = !1,
                    w = function(t) {
                        function i(e) { W = !1, D = !0, S = a(e), O = l(e), P = A = xjqxAnimations = 0, j = k, xframe = xoffset, E = Date.now(), clearInterval(q), q = setInterval(B, 100), initialOffset = k, initialXOffset = xoffset, k > 0 && T > k && "hidden" != r[0].style.visibility }
                        if (!u.enableScrolling[n]) return !0;
                        if (-1 === e.inArray(t.target.tagName.toLowerCase(), x)) {
                            k = r.jqxScrollBar("value"), xoffset = o.jqxScrollBar("value");
                            var s = u.getTouches(t),
                                h = s[0];
                            return 1 == s.length && u.dispatchMouseEvent("mousedown", h, u.getRootNode(h.target)), C = o.jqxScrollBar("max"), T = r.jqxScrollBar("max"), i(t), b = !1, p = h.pageY, g = h.pageX, u.simulatetouches && void 0 != h._pageY && (p = h._pageY, g = h._pageX), u.scrolling[n] = !0, d = 0, m = 0, !0
                        }
                    };
                y.on ? y.on($, w) : y.bind($, w);
                var R = function(e, t) { return k = e > T ? T : I > e ? I : e, s(null, e, 0, 0, t), e > T ? "max" : I > e ? "min" : "value" },
                    F = function(e, t) { return xoffset = e > C ? C : I > e ? I : e, s(e, null, 0, 0, t), e > C ? "max" : I > e ? "min" : "value" },
                    U = function(e) {
                        function t(e) {
                            var t, i, s;
                            if (D) {
                                t = a(e), s = l(e), i = S - t, xdelta = O - s;
                                var n = "value";
                                if (i > 2 || -2 > i) return S = t, n = R(k + i, e), B(), "min" == n && 0 === initialOffset ? !0 : "max" == n && initialOffset === T ? !0 : w ? (e.preventDefault(), e.stopPropagation(), W = !0, !1) : !0;
                                if (xdelta > 2 || xdelta < -2) return O = s, n = F(xoffset + xdelta, e), B(), "min" == n && 0 === initialXOffset ? !0 : "max" == n && initialXOffset === C ? !0 : x ? (W = !0, e.preventDefault(), e.stopPropagation(), !1) : !0;
                                e.preventDefault()
                            }
                        }
                        if (!u.enableScrolling[n]) return !0;
                        if (!u.scrolling[n]) return !0;
                        W && (e.preventDefault(), e.stopPropagation());
                        var i = u.getTouches(e);
                        if (i.length > 1) return !0;
                        var s = i[0].pageY,
                            h = i[0].pageX;
                        u.simulatetouches && void 0 != i[0]._pageY && (s = i[0]._pageY, h = i[0]._pageX);
                        var c = s - p,
                            y = h - g;
                        _ = s, touchHorizontalEnd = h, f = c - d, v = y - m, b = !0, d = c, m = y;
                        var x = null != o ? "hidden" != o[0].style.visibility : !0,
                            w = null != r ? "hidden" != r[0].style.visibility : !0;
                        (x || w) && (x || w) && t(e)
                    };
                y.on ? y.on(L, U) : y.bind(L, U);
                var V = function(e) {
                    if (!u.enableScrolling[n]) return !0;
                    var t = u.getTouches(e)[0];
                    if (!u.scrolling[n]) return !0;
                    if (D = !1, clearInterval(q), P > 10 || -10 > P ? (A = .8 * P, M = Math.round(k + A), E = Date.now(), requestAnimationFrame(h), r.fadeIn(100)) : xjqxAnimations > 10 || xjqxAnimations < -10 ? (A = .8 * xjqxAnimations, H = Math.round(xoffset + A), E = Date.now(), requestAnimationFrame(c), o.fadeIn(100)) : (o.fadeOut(100), r.fadeOut(100)), u.scrolling[n] = !1, !b) {
                        var t = u.getTouches(e)[0],
                            i = u.getRootNode(t.target);
                        return u.dispatchMouseEvent("mouseup", t, i), u.dispatchMouseEvent("click", t, i), !0
                    }
                    u.dispatchMouseEvent("mouseup", t, e.target)
                };
                if (this.simulatetouches) {
                    var Y = (void 0 != e(window).on || e(window).bind, function(e) {
                        try { V(e) } catch (t) {}
                        u.scrolling[n] = !1
                    });
                    if (void 0 != e(window).on ? e(document).on("mouseup.touchScroll", Y) : e(document).bind("mouseup.touchScroll", Y), window.frameElement && null != window.top) {
                        var K = function(e) {
                            try { V(e) } catch (t) {}
                            u.scrolling[n] = !1
                        };
                        window.top.document && (e(window.top.document).on ? e(window.top.document).on("mouseup", K) : e(window.top.document).bind("mouseup", K))
                    }
                    var X = (void 0 != e(document).on || e(document).bind, function(e) {
                        if (!u.scrolling[n]) return !0;
                        u.scrolling[n] = !1;
                        var t = u.getTouches(e)[0],
                            i = u.getRootNode(t.target);
                        u.dispatchMouseEvent("mouseup", t, i), u.dispatchMouseEvent("click", t, i)
                    });
                    void 0 != e(document).on ? e(document).on("touchend", X) : e(document).bind("touchend", X)
                }
                y.on && (y.on("dragstart", function(e) { e.preventDefault() }), y.on("selectstart", function(e) { e.preventDefault() })), y.on ? y.on(z + " touchcancel.touchScroll", V) : y.bind(z + " touchcancel.touchScroll", V)
            }
        }
    }), e.jqx.cookie = e.jqx.cookie || {}, e.extend(e.jqx.cookie, {
        cookie: function(t, i, s) {
            if (arguments.length > 1 && "[object Object]" !== String(i)) {
                if (s = e.extend({}, s), (null === i || void 0 === i) && (s.expires = -1), "number" == typeof s.expires) {
                    var n = s.expires,
                        o = s.expires = new Date;
                    o.setDate(o.getDate() + n)
                }
                return i = String(i), document.cookie = [encodeURIComponent(t), "=", s.raw ? i : encodeURIComponent(i), s.expires ? "; expires=" + s.expires.toUTCString() : "", s.path ? "; path=" + s.path : "", s.domain ? "; domain=" + s.domain : "", s.secure ? "; secure" : ""].join("")
            }
            s = i || {};
            var r, a = s.raw ? function(e) { return e } : decodeURIComponent;
            return (r = new RegExp("(?:^|; )" + encodeURIComponent(t) + "=([^;]*)").exec(document.cookie)) ? a(r[1]) : null
        }
    }), e.jqx.string = e.jqx.string || {}, e.extend(e.jqx.string, { replace: function(e, t, i) { if (t === i) return this; for (var s = e, n = s.indexOf(t); - 1 != n;) s = s.replace(t, i), n = s.indexOf(t); return s }, contains: function(e, t) { return null == e || null == t ? !1 : -1 != e.indexOf(t) }, containsIgnoreCase: function(e, t) { return null == e || null == t ? !1 : -1 != e.toString().toUpperCase().indexOf(t.toString().toUpperCase()) }, equals: function(e, t) { return null == e || null == t ? !1 : (e = this.normalize(e), t.length == e.length ? e.slice(0, t.length) == t : !1) }, equalsIgnoreCase: function(e, t) { return null == e || null == t ? !1 : (e = this.normalize(e), t.length == e.length ? e.toUpperCase().slice(0, t.length) == t.toUpperCase() : !1) }, startsWith: function(e, t) { return null == e || null == t ? !1 : e.slice(0, t.length) == t }, startsWithIgnoreCase: function(e, t) { return null == e || null == t ? !1 : e.toUpperCase().slice(0, t.length) == t.toUpperCase() }, normalize: function(e) { return 65279 == e.charCodeAt(e.length - 1) && (e = e.substring(0, e.length - 1)), e }, endsWith: function(e, t) { return null == e || null == t ? !1 : (e = this.normalize(e), e.slice(-t.length) == t) }, endsWithIgnoreCase: function(e, t) { return null == e || null == t ? !1 : (e = this.normalize(e), e.toUpperCase().slice(-t.length) == t.toUpperCase()) } }), e.extend(e.easing, { easeOutBack: function(e, t, i, s, n, o) { return void 0 == o && (o = 1.70158), s * ((t = t / n - 1) * t * ((o + 1) * t + o) + 1) + i }, easeInQuad: function(e, t, i, s, n) { return s * (t /= n) * t + i }, easeInOutCirc: function(e, t, i, s, n) { return (t /= n / 2) < 1 ? -s / 2 * (Math.sqrt(1 - t * t) - 1) + i : s / 2 * (Math.sqrt(1 - (t -= 2) * t) + 1) + i }, easeInOutSine: function(e, t, i, s, n) { return -s / 2 * (Math.cos(Math.PI * t / n) - 1) + i }, easeInCubic: function(e, t, i, s, n) { return s * (t /= n) * t * t + i }, easeOutCubic: function(e, t, i, s, n) { return s * ((t = t / n - 1) * t * t + 1) + i }, easeInOutCubic: function(e, t, i, s, n) { return (t /= n / 2) < 1 ? s / 2 * t * t * t + i : s / 2 * ((t -= 2) * t * t + 2) + i }, easeInSine: function(e, t, i, s, n) { return -s * Math.cos(t / n * (Math.PI / 2)) + s + i }, easeOutSine: function(e, t, i, s, n) { return s * Math.sin(t / n * (Math.PI / 2)) + i }, easeInOutSine: function(e, t, i, s, n) { return -s / 2 * (Math.cos(Math.PI * t / n) - 1) + i } })
}(jqxBaseFramework),
function(e) {
    e.extend(e.event.special, { close: { noBubble: !0 }, open: { noBubble: !0 }, cellclick: { noBubble: !0 }, rowclick: { noBubble: !0 }, tabclick: { noBubble: !0 }, selected: { noBubble: !0 }, expanded: { noBubble: !0 }, collapsed: { noBubble: !0 }, valuechanged: { noBubble: !0 }, expandedItem: { noBubble: !0 }, collapsedItem: { noBubble: !0 }, expandingItem: { noBubble: !0 }, collapsingItem: { noBubble: !0 } }), e.fn.extend({
        ischildof: function(t) {
            for (var i = e(this).parents().get(), s = 0; s < i.length; s++)
                if ("string" != typeof t) { var n = i[s]; if (void 0 !== t && n == t[0]) return !0 } else if (void 0 !== t && e(i[s]).is(t)) return !0;
            return !1
        }
    }), e.fn.jqxProxy = function() {
        var t = e(this).data().jqxWidget,
            i = Array.prototype.slice.call(arguments, 0),
            s = t.element;
        return s || (s = t.base.element), e.jqx.jqxWidgetProxy(t.widgetName, s, i)
    };
    var t = this.originalVal = e.fn.val;
    e.fn.val = function(i) { if ("undefined" == typeof i) { if (e(this).hasClass("jqx-widget")) { var s = e(this).data().jqxWidget; if (s && s.val) return s.val() } return t.call(this) } if (e(this).hasClass("jqx-widget")) { var s = e(this).data().jqxWidget; if (s && s.val) return 2 != arguments.length ? s.val(i) : s.val(i, arguments[1]) } return t.call(this, i) }, e.fn.modal && e.fn.modal.Constructor && (e.fn.modal.Constructor.prototype.enforceFocus = function() {
        e(document).off("focusin.bs.modal").on("focusin.bs.modal", e.proxy(function(t) {
            if (this.$element[0] !== t.target && !this.$element.has(t.target).length) {
                if (e(t.target).parents().hasClass("jqx-popup")) return !0;
                this.$element.trigger("focus")
            }
        }, this))
    }), e.fn.coord = function(t) {
        var i, s, n = { top: 0, left: 0 },
            o = this[0],
            r = o && o.ownerDocument;
        if (r) {
            if (i = r.documentElement, !e.contains(i, o)) return n;
            void 0 !== typeof o.getBoundingClientRect && (n = o.getBoundingClientRect());
            var a = function(t) { return e.isWindow(t) ? t : 9 === t.nodeType ? t.defaultView || t.parentWindow : !1 };
            s = a(r);
            var l = 0,
                h = 0,
                c = navigator.userAgent.toLowerCase(),
                u = -1 != c.indexOf("ipad") || -1 != c.indexOf("iphone");
            if (u && (l = 2), 1 == t && "static" != e(document.body).css("position")) {
                var d = e(document.body).coord();
                l = -d.left, h = -d.top
            }
            return { top: h + n.top + (s.pageYOffset || i.scrollTop) - (i.clientTop || 0), left: l + n.left + (s.pageXOffset || i.scrollLeft) - (i.clientLeft || 0) }
        }
    }
}(jqxBaseFramework),
function(e) {
    e.jqx.jqxWidget("jqxScrollBar", "", {}), e.extend(e.jqx._jqxScrollBar.prototype, {
        defineInstance: function() { var t = { height: null, width: null, vertical: !1, min: 0, max: 1e3, value: 0, step: 10, largestep: 50, thumbMinSize: 10, thumbSize: 0, thumbStep: "auto", roundedCorners: "all", showButtons: !0, disabled: !1, touchMode: "auto", touchModeStyle: "auto", thumbTouchSize: 0, _triggervaluechanged: !0, rtl: !1, areaDownCapture: !1, areaUpCapture: !1, _initialLayout: !1, offset: 0, reference: 0, velocity: 0, frame: 0, timestamp: 0, ticker: null, amplitude: 0, target: 0 }; return e.extend(!0, this, t), t },
        createInstance: function(e) { this.render() },
        render: function() {
            this._mouseup = new Date;
            var t = this,
                i = "<div id='jqxScrollOuterWrap' style='box-sizing: content-box; width:100%; height: 100%; align:left; border: 0px; valign:top; position: relative;'><div id='jqxScrollWrap' style='box-sizing: content-box; width:100%; height: 100%; left: 0px; top: 0px; align:left; valign:top; position: absolute;'><div id='jqxScrollBtnUp' style='box-sizing: content-box; align:left; valign:top; left: 0px; top: 0px; position: absolute;'><div></div></div><div id='jqxScrollAreaUp' style='box-sizing: content-box; align:left; valign:top; left: 0px; top: 0px; position: absolute;'></div><div id='jqxScrollThumb' style='box-sizing: content-box; align:left; valign:top; left: 0px; top: 0px; position: absolute;'></div><div id='jqxScrollAreaDown' style='box-sizing: content-box; align:left; valign:top; left: 0px; top: 0px; position: absolute;'></div><div id='jqxScrollBtnDown' style='box-sizing: content-box; align:left; valign:top; left: 0px; top: 0px; position: absolute;'><div></div></div></div></div>";
            if (e.jqx.utilities && "hidden" == e.jqx.utilities.scrollBarButtonsVisibility && (this.showButtons = !1), t.WinJS ? MSApp.execUnsafeLocalFunction(function() { t.host.html(i) }) : this.element.innerHTML = i, void 0 != this.width && parseInt(this.width) > 0 && this.host.width(parseInt(this.width)), void 0 != this.height && parseInt(this.height) > 0 && this.host.height(parseInt(this.height)), this.isPercentage = !1, null != this.width && -1 != this.width.toString().indexOf("%") && (this.host.width(this.width), this.isPercentage = !0), null != this.height && -1 != this.height.toString().indexOf("%") && (this.host.height(this.height), this.isPercentage = !0), this.isPercentage) {
                var s = this;
                e.jqx.utilities.resize(this.host, function() { s._arrange() }, !1)
            }
            this.thumbCapture = !1, this.scrollOuterWrap = e(this.element.firstChild), this.scrollWrap = e(this.scrollOuterWrap[0].firstChild), this.btnUp = e(this.scrollWrap[0].firstChild), this.areaUp = e(this.btnUp[0].nextSibling), this.btnThumb = e(this.areaUp[0].nextSibling), this.arrowUp = e(this.btnUp[0].firstChild), this.areaDown = e(this.btnThumb[0].nextSibling), this.btnDown = e(this.areaDown[0].nextSibling), this.arrowDown = e(this.btnDown[0].firstChild);
            var n = this.element.id;
            if (this.btnUp[0].id = "jqxScrollBtnUp" + n, this.btnDown[0].id = "jqxScrollBtnDown" + n, this.btnThumb[0].id = "jqxScrollThumb" + n, this.areaUp[0].id = "jqxScrollAreaUp" + n, this.areaDown[0].id = "jqxScrollAreaDown" + n, this.scrollWrap[0].id = "jqxScrollWrap" + n, this.scrollOuterWrap[0].id = "jqxScrollOuterWrap" + n, !this.host.jqxRepeatButton) throw new Error("jqxScrollBar: Missing reference to jqxbuttons.js.");
            this.btnUp.jqxRepeatButton({ _ariaDisabled: !0, overrideTheme: !0, disabled: this.disabled }), this.btnDown.jqxRepeatButton({ _ariaDisabled: !0, overrideTheme: !0, disabled: this.disabled }), this.btnDownInstance = e.data(this.btnDown[0], "jqxRepeatButton").instance, this.btnUpInstance = e.data(this.btnUp[0], "jqxRepeatButton").instance, this.areaUp.jqxRepeatButton({ _scrollAreaButton: !0, _ariaDisabled: !0, overrideTheme: !0 }), this.areaDown.jqxRepeatButton({ _scrollAreaButton: !0, _ariaDisabled: !0, overrideTheme: !0 }), this.btnThumb.jqxButton({ _ariaDisabled: !0, overrideTheme: !0, disabled: this.disabled }), this.propertyChangeMap.value = function(e, t, i, s) { isNaN(s) || i != s && e.setPosition(parseFloat(s), !0) }, this.propertyChangeMap.width = function(e, t, i, s) { void 0 != e.width && parseInt(e.width) > 0 && (e.host.width(parseInt(e.width)), e._arrange()) }, this.propertyChangeMap.height = function(e, t, i, s) { void 0 != e.height && parseInt(e.height) > 0 && (e.host.height(parseInt(e.height)), e._arrange()) }, this.propertyChangeMap.theme = function(e, t, i, s) { e.setTheme() }, this.propertyChangeMap.max = function(e, t, i, s) { isNaN(s) || i != s && (e.max = parseInt(s), e.min > e.max && (e.max = e.min + 1), e._arrange(), e.setPosition(e.value)) }, this.propertyChangeMap.min = function(e, t, i, s) { isNaN(s) || i != s && (e.min = parseInt(s), e.min > e.max && (e.max = e.min + 1), e._arrange(), e.setPosition(e.value)) }, this.propertyChangeMap.disabled = function(e, t, i, s) { i != s && (s ? e.host.addClass(e.toThemeProperty("jqx-fill-state-disabled")) : e.host.removeClass(e.toThemeProperty("jqx-fill-state-disabled")), e.btnUp.jqxRepeatButton("disabled", e.disabled), e.btnDown.jqxRepeatButton("disabled", e.disabled), e.btnThumb.jqxButton("disabled", e.disabled)) }, this.propertyChangeMap.touchMode = function(e, t, i, s) { i != s && (e._updateTouchBehavior(), s === !0 ? (e.showButtons = !1, e.refresh()) : s === !1 && (e.showButtons = !0, e.refresh())) }, this.propertyChangeMap.rtl = function(e, t, i, s) { i != s && e.refresh() }, this.buttonUpCapture = !1, this.buttonDownCapture = !1, this._updateTouchBehavior(), this.setPosition(this.value), this._addHandlers(), this.setTheme()
        },
        resize: function(e, t) { this.width = e, this.height = t, this._arrange() },
        _updateTouchBehavior: function() {
            if (this.isTouchDevice = e.jqx.mobile.isTouchDevice(), 1 == this.touchMode) {
                if (e.jqx.browser.msie && e.jqx.browser.version < 9) return void this.setTheme();
                this.isTouchDevice = !0, e.jqx.mobile.setMobileSimulator(this.btnThumb[0]), this._removeHandlers(), this._addHandlers(), this.setTheme()
            } else 0 == this.touchMode && (this.isTouchDevice = !1)
        },
        _addHandlers: function() {
            var t = this,
                i = !1;
            try {
                ("ontouchstart" in window || window.DocumentTouch && document instanceof DocumentTouch) && (i = !0, this._touchSupport = !0)
            } catch (s) {}
            if ((t.isTouchDevice || i) && (this.addHandler(this.btnThumb, e.jqx.mobile.getTouchEventName("touchend"), function(e) {
                    var i = t.vertical ? t.toThemeProperty("jqx-scrollbar-thumb-state-pressed") : t.toThemeProperty("jqx-scrollbar-thumb-state-pressed-horizontal"),
                        s = t.toThemeProperty("jqx-fill-state-pressed");
                    return t.btnThumb.removeClass(i), t.btnThumb.removeClass(s), t.disabled || t.handlemouseup(t, e), !1
                }), this.addHandler(this.btnThumb, e.jqx.mobile.getTouchEventName("touchstart"), function(e) {
                    if (!t.disabled) {
                        if (1 == t.touchMode) e.clientX = e.originalEvent.clientX, e.clientY = e.originalEvent.clientY;
                        else {
                            var i = e;
                            i.originalEvent.touches && i.originalEvent.touches.length ? (e.clientX = i.originalEvent.touches[0].clientX, e.clientY = i.originalEvent.touches[0].clientY) : (e.clientX = e.originalEvent.clientX, e.clientY = e.originalEvent.clientY)
                        }
                        t.handlemousedown(e), e.preventDefault && e.preventDefault()
                    }
                }), e.jqx.mobile.touchScroll(this.element, t.max, function(e, i, s, n, o) {
                    if ("visible" == t.host.css("visibility")) {
                        if (1 == t.touchMode) o.clientX = o.originalEvent.clientX, o.clientY = o.originalEvent.clientY;
                        else {
                            var r = o;
                            r.originalEvent.touches && r.originalEvent.touches.length ? (o.clientX = r.originalEvent.touches[0].clientX, o.clientY = r.originalEvent.touches[0].clientY) : (o.clientX = o.originalEvent.clientX, o.clientY = o.originalEvent.clientY)
                        }
                        var a = t.vertical ? t.toThemeProperty("jqx-scrollbar-thumb-state-pressed") : t.toThemeProperty("jqx-scrollbar-thumb-state-pressed-horizontal");
                        t.btnThumb.addClass(a), t.btnThumb.addClass(t.toThemeProperty("jqx-fill-state-pressed")), t.thumbCapture = !0, t.handlemousemove(o)
                    }
                }, t.element.id, t.host, t.host)), !this.isTouchDevice) {
                try {
                    if (("" != document.referrer || window.frameElement) && null != window.top && window.top != window.self) {
                        var n = null;
                        if (window.parent && document.referrer && (n = document.referrer), n && -1 != n.indexOf(document.location.host)) {
                            var o = function(e) { t.disabled || t.handlemouseup(t, e) };
                            window.top.document.addEventListener ? window.top.document.addEventListener("mouseup", o, !1) : window.top.document.attachEvent && window.top.document.attachEvent("onmouseup", o)
                        }
                    }
                } catch (r) {}
                var a = "click mouseup mousedown";
                this.addHandler(this.btnDown, a, function(e) {
                    var i = t.step;
                    switch (Math.abs(t.max - t.min) <= i && (i = 1), t.rtl && !t.vertical && (i = -t.step), e.type) {
                        case "click":
                            t.buttonDownCapture && !t.isTouchDevice ? t.disabled || t.setPosition(t.value + i) : !t.disabled && t.isTouchDevice && t.setPosition(t.value + i);
                            break;
                        case "mouseup":
                            if (!t.btnDownInstance.base.disabled && t.buttonDownCapture) return t.buttonDownCapture = !1, t.btnDown.removeClass(t.toThemeProperty("jqx-scrollbar-button-state-pressed")), t.btnDown.removeClass(t.toThemeProperty("jqx-fill-state-pressed")), t._removeArrowClasses("pressed", "down"), t.handlemouseup(t, e), t.setPosition(t.value + i), !1;
                            break;
                        case "mousedown":
                            if (!t.btnDownInstance.base.disabled) return t.buttonDownCapture = !0, t.btnDown.addClass(t.toThemeProperty("jqx-fill-state-pressed")), t.btnDown.addClass(t.toThemeProperty("jqx-scrollbar-button-state-pressed")), t._addArrowClasses("pressed", "down"), !1
                    }
                }), this.addHandler(this.btnUp, a, function(e) {
                    var i = t.step;
                    switch (Math.abs(t.max - t.min) <= i && (i = 1), t.rtl && !t.vertical && (i = -t.step), e.type) {
                        case "click":
                            t.buttonUpCapture && !t.isTouchDevice ? t.disabled || t.setPosition(t.value - i) : !t.disabled && t.isTouchDevice && t.setPosition(t.value - i);
                            break;
                        case "mouseup":
                            if (!t.btnUpInstance.base.disabled && t.buttonUpCapture) return t.buttonUpCapture = !1, t.btnUp.removeClass(t.toThemeProperty("jqx-scrollbar-button-state-pressed")), t.btnUp.removeClass(t.toThemeProperty("jqx-fill-state-pressed")), t._removeArrowClasses("pressed", "up"), t.handlemouseup(t, e), t.setPosition(t.value - i), !1;
                            break;
                        case "mousedown":
                            if (!t.btnUpInstance.base.disabled) return t.buttonUpCapture = !0, t.btnUp.addClass(t.toThemeProperty("jqx-fill-state-pressed")), t.btnUp.addClass(t.toThemeProperty("jqx-scrollbar-button-state-pressed")), t._addArrowClasses("pressed", "up"), !1
                    }
                })
            }
            var l = "click";
            if (this.isTouchDevice && (l = e.jqx.mobile.getTouchEventName("touchend")), this.addHandler(this.areaUp, l, function(e) { if (!t.disabled) { var i = t.largestep; return t.rtl && !t.vertical && (i = -t.largestep), t.setPosition(t.value - i), !1 } }), this.addHandler(this.areaDown, l, function(e) { if (!t.disabled) { var i = t.largestep; return t.rtl && !t.vertical && (i = -t.largestep), t.setPosition(t.value + i), !1 } }), this.addHandler(this.areaUp, "mousedown", function(e) { return t.disabled ? void 0 : (t.areaUpCapture = !0, !1) }), this.addHandler(this.areaDown, "mousedown", function(e) { return t.disabled ? void 0 : (t.areaDownCapture = !0, !1) }), this.addHandler(this.btnThumb, "mousedown dragstart", function(e) { return "dragstart" === e.type ? !1 : (t.disabled || t.handlemousedown(e), void(e.preventDefault && e.preventDefault())) }), this.addHandler(e(document), "mouseup." + this.element.id, function(e) { t.disabled || t.handlemouseup(t, e) }), !this.isTouchDevice && (this.mousemoveFunc = function(e) { t.disabled || t.handlemousemove(e) }, this.addHandler(e(document), "mousemove." + this.element.id, this.mousemoveFunc), this.addHandler(e(document), "mouseleave." + this.element.id, function(e) { t.disabled || t.handlemouseleave(e) }), this.addHandler(e(document), "mouseenter." + this.element.id, function(e) { t.disabled || t.handlemouseenter(e) }), !t.disabled)) {
                this.addHandler(this.btnUp, "mouseenter mouseleave", function(e) { "mouseenter" === e.type ? t.disabled || t.btnUpInstance.base.disabled || 1 == t.touchMode || (t.btnUp.addClass(t.toThemeProperty("jqx-scrollbar-button-state-hover")), t.btnUp.addClass(t.toThemeProperty("jqx-fill-state-hover")), t._addArrowClasses("hover", "up")) : t.disabled || t.btnUpInstance.base.disabled || 1 == t.touchMode || (t.btnUp.removeClass(t.toThemeProperty("jqx-scrollbar-button-state-hover")), t.btnUp.removeClass(t.toThemeProperty("jqx-fill-state-hover")), t._removeArrowClasses("hover", "up")) });
                var h = t.toThemeProperty("jqx-scrollbar-thumb-state-hover");
                t.vertical || (h = t.toThemeProperty("jqx-scrollbar-thumb-state-hover-horizontal")), this.addHandler(this.btnThumb, "mouseenter mouseleave", function(e) { "mouseenter" === e.type ? t.disabled || 1 == t.touchMode || (t.btnThumb.addClass(h), t.btnThumb.addClass(t.toThemeProperty("jqx-fill-state-hover"))) : t.disabled || 1 == t.touchMode || (t.btnThumb.removeClass(h), t.btnThumb.removeClass(t.toThemeProperty("jqx-fill-state-hover"))) }), this.addHandler(this.btnDown, "mouseenter mouseleave", function(e) { "mouseenter" === e.type ? t.disabled || t.btnDownInstance.base.disabled || 1 == t.touchMode || (t.btnDown.addClass(t.toThemeProperty("jqx-scrollbar-button-state-hover")), t.btnDown.addClass(t.toThemeProperty("jqx-fill-state-hover")), t._addArrowClasses("hover", "down")) : t.disabled || t.btnDownInstance.base.disabled || 1 == t.touchMode || (t.btnDown.removeClass(t.toThemeProperty("jqx-scrollbar-button-state-hover")), t.btnDown.removeClass(t.toThemeProperty("jqx-fill-state-hover")), t._removeArrowClasses("hover", "down")) })
            }
        },
        destroy: function() {
            var t = this.btnUp,
                i = this.btnDown,
                s = this.btnThumb,
                n = (this.scrollWrap, this.areaUp),
                o = this.areaDown;
            this.arrowUp.remove(), delete this.arrowUp, this.arrowDown.remove(), delete this.arrowDown, o.removeClass(), n.removeClass(), i.removeClass(), t.removeClass(), s.removeClass(), t.jqxRepeatButton("destroy"), i.jqxRepeatButton("destroy"), n.jqxRepeatButton("destroy"), o.jqxRepeatButton("destroy"), s.jqxButton("destroy");
            var r = e.data(this.element, "jqxScrollBar");
            this._removeHandlers(), this.btnUp = null, this.btnDown = null, this.scrollWrap = null, this.areaUp = null, this.areaDown = null, this.scrollOuterWrap = null, delete this.mousemoveFunc, delete this.btnDownInstance, delete this.btnUpInstance, delete this.scrollOuterWrap, delete this.scrollWrap, delete this.btnDown, delete this.areaDown, delete this.areaUp, delete this.btnDown, delete this.btnUp, delete this.btnThumb, delete this.propertyChangeMap.value, delete this.propertyChangeMap.min, delete this.propertyChangeMap.max, delete this.propertyChangeMap.touchMode, delete this.propertyChangeMap.disabled, delete this.propertyChangeMap.theme, delete this.propertyChangeMap, r && delete r.instance, this.host.removeData(), this.host.remove(), delete this.host, delete this.set, delete this.get, delete this.call, delete this.element
        },
        _removeHandlers: function() { this.removeHandler(this.btnUp, "mouseenter"), this.removeHandler(this.btnDown, "mouseenter"), this.removeHandler(this.btnThumb, "mouseenter"), this.removeHandler(this.btnUp, "mouseleave"), this.removeHandler(this.btnDown, "mouseleave"), this.removeHandler(this.btnThumb, "mouseleave"), this.removeHandler(this.btnUp, "click"), this.removeHandler(this.btnDown, "click"), this.removeHandler(this.btnDown, "mouseup"), this.removeHandler(this.btnUp, "mouseup"), this.removeHandler(this.btnDown, "mousedown"), this.removeHandler(this.btnUp, "mousedown"), this.removeHandler(this.areaUp, "mousedown"), this.removeHandler(this.areaDown, "mousedown"), this.removeHandler(this.areaUp, "click"), this.removeHandler(this.areaDown, "click"), this.removeHandler(this.btnThumb, "mousedown"), this.removeHandler(this.btnThumb, "dragstart"), this.removeHandler(e(document), "mouseup." + this.element.id), this.mousemoveFunc ? this.removeHandler(e(document), "mousemove." + this.element.id, this.mousemoveFunc) : this.removeHandler(e(document), "mousemove." + this.element.id), this.removeHandler(e(document), "mouseleave." + this.element.id), this.removeHandler(e(document), "mouseenter." + this.element.id) },
        _addArrowClasses: function(e, t) { "pressed" == e && (e = "selected"), "" != e && (e = "-" + e), this.vertical ? (("up" == t || void 0 == t) && this.arrowUp.addClass(this.toThemeProperty("jqx-icon-arrow-up" + e)), ("down" == t || void 0 == t) && this.arrowDown.addClass(this.toThemeProperty("jqx-icon-arrow-down" + e))) : (("up" == t || void 0 == t) && this.arrowUp.addClass(this.toThemeProperty("jqx-icon-arrow-left" + e)), ("down" == t || void 0 == t) && this.arrowDown.addClass(this.toThemeProperty("jqx-icon-arrow-right" + e))) },
        _removeArrowClasses: function(e, t) { "pressed" == e && (e = "selected"), "" != e && (e = "-" + e), this.vertical ? (("up" == t || void 0 == t) && this.arrowUp.removeClass(this.toThemeProperty("jqx-icon-arrow-up" + e)), ("down" == t || void 0 == t) && this.arrowDown.removeClass(this.toThemeProperty("jqx-icon-arrow-down" + e))) : (("up" == t || void 0 == t) && this.arrowUp.removeClass(this.toThemeProperty("jqx-icon-arrow-left" + e)), ("down" == t || void 0 == t) && this.arrowDown.removeClass(this.toThemeProperty("jqx-icon-arrow-right" + e))) },
        setTheme: function() {
            var t = this.btnUp,
                i = this.btnDown,
                s = this.btnThumb,
                n = this.scrollWrap,
                o = (this.areaUp, this.areaDown, this.arrowUp),
                r = this.arrowDown;
            this.scrollWrap[0].className = this.toThemeProperty("jqx-reset"), this.scrollOuterWrap[0].className = this.toThemeProperty("jqx-reset");
            var a = this.toThemeProperty("jqx-reset");
            this.areaDown[0].className = a, this.areaUp[0].className = a;
            var l = this.toThemeProperty("jqx-scrollbar") + " " + this.toThemeProperty("jqx-widget") + " " + this.toThemeProperty("jqx-widget-content");
            this.host.addClass(l), this.isTouchDevice && this.host.addClass(this.toThemeProperty("jqx-scrollbar-mobile")), i[0].className = this.toThemeProperty("jqx-scrollbar-button-state-normal"), t[0].className = this.toThemeProperty("jqx-scrollbar-button-state-normal");
            var h = "";
            if (this.vertical ? (o[0].className = a + " " + this.toThemeProperty("jqx-icon-arrow-up"), r[0].className = a + " " + this.toThemeProperty("jqx-icon-arrow-down"), h = this.toThemeProperty("jqx-scrollbar-thumb-state-normal")) : (o[0].className = a + " " + this.toThemeProperty("jqx-icon-arrow-left"), r[0].className = a + " " + this.toThemeProperty("jqx-icon-arrow-right"), h = this.toThemeProperty("jqx-scrollbar-thumb-state-normal-horizontal")), h += " " + this.toThemeProperty("jqx-fill-state-normal"), s[0].className = h, this.disabled ? (n.addClass(this.toThemeProperty("jqx-fill-state-disabled")), n.removeClass(this.toThemeProperty("jqx-scrollbar-state-normal"))) : (n.addClass(this.toThemeProperty("jqx-scrollbar-state-normal")), n.removeClass(this.toThemeProperty("jqx-fill-state-disabled"))), "all" == this.roundedCorners)
                if (this.host.addClass(this.toThemeProperty("jqx-rc-all")), this.vertical) {
                    var c = e.jqx.cssroundedcorners("top");
                    c = this.toThemeProperty(c), t.addClass(c);
                    var u = e.jqx.cssroundedcorners("bottom");
                    u = this.toThemeProperty(u), i.addClass(u)
                } else {
                    var d = e.jqx.cssroundedcorners("left");
                    d = this.toThemeProperty(d), t.addClass(d);
                    var p = e.jqx.cssroundedcorners("right");
                    p = this.toThemeProperty(p), i.addClass(p)
                }
            else {
                var f = e.jqx.cssroundedcorners(this.roundedCorners);
                f = this.toThemeProperty(f), elBtnUp.addClass(f), elBtnDown.addClass(f)
            }
            var f = e.jqx.cssroundedcorners(this.roundedCorners);
            f = this.toThemeProperty(f), s.hasClass(f) || s.addClass(f), this.isTouchDevice && 0 != this.touchModeStyle && (this.showButtons = !1, s.addClass(this.toThemeProperty("jqx-scrollbar-thumb-state-normal-touch")))
        },
        isScrolling: function() { return void 0 == this.thumbCapture || void 0 == this.buttonDownCapture || void 0 == this.buttonUpCapture || void 0 == this.areaDownCapture || void 0 == this.areaUpCapture ? !1 : this.thumbCapture || this.buttonDownCapture || this.buttonUpCapture || this.areaDownCapture || this.areaUpCapture },
        track: function() {
            var e, t, i, s;
            e = Date.now(), t = e - this.timestamp, this.timestamp = e, i = this.offset - this.frame, this.frame = this.offset, s = 1e3 * i / (1 + t), this.velocity = .2 * s + .2 * this.velocity
        },
        handlemousedown: function(t) {
            function i(e) { n.reference = parseInt(n.btnThumb[0].style.top), n.offset = parseInt(n.btnThumb[0].style.top), n.vertical || (n.reference = parseInt(n.btnThumb[0].style.left), n.offset = parseInt(n.btnThumb[0].style.left)), n.velocity = n.amplitude = 0, n.frame = n.offset, n.timestamp = Date.now(), clearInterval(n.ticker), n.ticker = setInterval(function() { n.track() }, 100) }
            if (void 0 == this.thumbCapture || 0 == this.thumbCapture) {
                this.thumbCapture = !0;
                var s = this.btnThumb;
                null != s && (s.addClass(this.toThemeProperty("jqx-fill-state-pressed")), this.vertical ? s.addClass(this.toThemeProperty("jqx-scrollbar-thumb-state-pressed")) : s.addClass(this.toThemeProperty("jqx-scrollbar-thumb-state-pressed-horizontal")))
            }
            var n = this;
            this.thumbCapture && e.jqx.scrollAnimation && i(t), this.dragStartX = t.clientX, this.dragStartY = t.clientY, this.dragStartValue = this.value
        },
        toggleHover: function(e, t) {},
        refresh: function() { this._arrange() },
        _setElementPosition: function(e, t, i) { isNaN(t) || parseInt(e[0].style.left) != parseInt(t) && (e[0].style.left = t + "px"), isNaN(i) || parseInt(e[0].style.top) != parseInt(i) && (e[0].style.top = i + "px") },
        _setElementTopPosition: function(e, t) { isNaN(t) || (e[0].style.top = t + "px") },
        _setElementLeftPosition: function(e, t) { isNaN(t) || (e[0].style.left = t + "px") },
        handlemouseleave: function(e) {
            var t = this.btnUp,
                i = this.btnDown;
            if ((this.buttonDownCapture || this.buttonUpCapture) && (t.removeClass(this.toThemeProperty("jqx-scrollbar-button-state-pressed")), i.removeClass(this.toThemeProperty("jqx-scrollbar-button-state-pressed")), this._removeArrowClasses("pressed")), 1 == this.thumbCapture) {
                var s = this.btnThumb,
                    n = this.vertical ? this.toThemeProperty("jqx-scrollbar-thumb-state-pressed") : this.toThemeProperty("jqx-scrollbar-thumb-state-pressed-horizontal");
                s.removeClass(n), s.removeClass(this.toThemeProperty("jqx-fill-state-pressed"))
            }
        },
        handlemouseenter: function(e) {
            var t = this.btnUp,
                i = this.btnDown;
            if (this.buttonUpCapture && (t.addClass(this.toThemeProperty("jqx-scrollbar-button-state-pressed")), t.addClass(this.toThemeProperty("jqx-fill-state-pressed")), this._addArrowClasses("pressed", "up")), this.buttonDownCapture && (i.addClass(this.toThemeProperty("jqx-scrollbar-button-state-pressed")), i.addClass(this.toThemeProperty("jqx-fill-state-pressed")), this._addArrowClasses("pressed", "down")), 1 == this.thumbCapture) {
                var s = this.btnThumb;
                this.vertical ? s.addClass(this.toThemeProperty("jqx-scrollbar-thumb-state-pressed")) : s.addClass(this.toThemeProperty("jqx-scrollbar-thumb-state-pressed-horizontal")),
                    s.addClass(this.toThemeProperty("jqx-fill-state-pressed"))
            }
        },
        handlemousemove: function(e) {
            var t = this.btnUp,
                i = this.btnDown,
                s = 0;
            if (null != i && null != t) {
                if (null != t && null != i && void 0 != this.buttonDownCapture && void 0 != this.buttonUpCapture && (this.buttonDownCapture && e.which == s ? (i.removeClass(this.toThemeProperty("jqx-scrollbar-button-state-pressed")), i.removeClass(this.toThemeProperty("jqx-fill-state-pressed")), this._removeArrowClasses("pressed", "down"), this.buttonDownCapture = !1) : this.buttonUpCapture && e.which == s && (t.removeClass(this.toThemeProperty("jqx-scrollbar-button-state-pressed")), t.removeClass(this.toThemeProperty("jqx-fill-state-pressed")), this._removeArrowClasses("pressed", "up"), this.buttonUpCapture = !1)), 1 != this.thumbCapture) return !1;
                var n = this.btnThumb;
                if (e.which == s && !this.isTouchDevice && !this._touchSupport) { this.thumbCapture = !1, this._arrange(); var o = this.vertical ? this.toThemeProperty("jqx-scrollbar-thumb-state-pressed") : this.toThemeProperty("jqx-scrollbar-thumb-state-pressed-horizontal"); return n.removeClass(o), n.removeClass(this.toThemeProperty("jqx-fill-state-pressed")), !0 }
                void 0 != e.preventDefault && e.preventDefault(), null != e.originalEvent && (e.originalEvent.mouseHandled = !0), void 0 != e.stopPropagation && e.stopPropagation();
                var r = 0;
                try {
                    r = this.vertical ? e.clientY - this.dragStartY : e.clientX - this.dragStartX;
                    var a = this._btnAndThumbSize;
                    this._btnAndThumbSize || (a = this.vertical ? t.height() + i.height() + n.height() : t.width() + i.width() + n.width());
                    var l = (this.max - this.min) / (this.scrollBarSize - a);
                    if ("auto" != this.thumbStep) { if (r *= l, Math.abs(this.dragStartValue + r - this.value) >= parseInt(this.thumbStep)) { var h = Math.round(parseInt(r) / this.thumbStep) * this.thumbStep; return this.rtl && !this.vertical ? this.setPosition(this.dragStartValue - h) : this.setPosition(this.dragStartValue + h), !1 } return !1 }
                    r *= l;
                    var h = r;
                    this.rtl && !this.vertical && (h = -r), this.setPosition(this.dragStartValue + h), this.offset = parseInt(n[0].style.left), this.vertical && (this.offset = parseInt(n[0].style.top))
                } catch (c) { alert(c) }
                return !1
            }
        },
        handlemouseup: function(t, i) {
            function s() {
                var e, t;
                if (a.amplitude)
                    if (e = Date.now() - a.timestamp, t = -a.amplitude * Math.exp(-e / 325), t > .5 || -.5 > t) {
                        var i = (a.max - a.min) / (a.scrollBarSize - a._btnAndThumbSize),
                            n = i * (a.target + t),
                            o = n;
                        a.rtl && !a.vertical && (o = -n), a.setPosition(a.dragStartValue + o), requestAnimationFrame(s)
                    } else {
                        var i = (a.max - a.min) / (a.scrollBarSize - a._btnAndThumbSize),
                            n = i * (a.target + t),
                            o = n;
                        a.rtl && !a.vertical && (o = -n), a.setPosition(a.dragStartValue + o)
                    }
            }
            var n = !1;
            if (this.thumbCapture) {
                this.thumbCapture = !1;
                var o = this.btnThumb,
                    r = this.vertical ? this.toThemeProperty("jqx-scrollbar-thumb-state-pressed") : this.toThemeProperty("jqx-scrollbar-thumb-state-pressed-horizontal");
                if (o.removeClass(r), o.removeClass(this.toThemeProperty("jqx-fill-state-pressed")), n = !0, this._mouseup = new Date, e.jqx.scrollAnimation) {
                    var a = this;
                    clearInterval(this.ticker), (this.velocity > 25 || this.velocity < -25) && (this.amplitude = .8 * this.velocity, this.target = Math.round(this.offset + this.amplitude), this.vertical ? this.target -= this.reference : this.target -= this.reference, this.timestamp = Date.now(), requestAnimationFrame(s))
                }
            }
            if (this.areaDownCapture = this.areaUpCapture = !1, this.buttonUpCapture || this.buttonDownCapture) {
                var l = this.btnUp,
                    h = this.btnDown;
                this.buttonUpCapture = !1, this.buttonDownCapture = !1, l.removeClass(this.toThemeProperty("jqx-scrollbar-button-state-pressed")), h.removeClass(this.toThemeProperty("jqx-scrollbar-button-state-pressed")), l.removeClass(this.toThemeProperty("jqx-fill-state-pressed")), h.removeClass(this.toThemeProperty("jqx-fill-state-pressed")), this._removeArrowClasses("pressed"), n = !0, this._mouseup = new Date
            }
            n && (void 0 != i.preventDefault && i.preventDefault(), null != i.originalEvent && (i.originalEvent.mouseHandled = !0), void 0 != i.stopPropagation && i.stopPropagation())
        },
        setPosition: function(t, i) {
            this.element;
            if ((void 0 == t || NaN == t) && (t = this.min), t >= this.max && (t = this.max), t < this.min && (t = this.min), this.value !== t || 1 == i) {
                if (t == this.max) {
                    var s = new e.Event("complete");
                    this.host.trigger(s)
                }
                var n = this.value;
                if (this._triggervaluechanged) {
                    var o = new e.Event("valueChanged");
                    o.previousValue = this.value, o.currentValue = t
                }
                this.value = t, this._positionelements(), this._triggervaluechanged && this.host.trigger(o), this.valueChanged && this.valueChanged({ currentValue: this.value, previousvalue: n })
            }
            return t
        },
        val: function(e) {
            var t = function(t) {
                for (var i in t)
                    if (t.hasOwnProperty(i)) return !1;
                return "number" == typeof e ? !1 : "date" == typeof e ? !1 : "boolean" == typeof e ? !1 : "string" == typeof e ? !1 : !0
            };
            return t(e) || 0 == arguments.length ? this.value : (this.setPosition(e), e)
        },
        _getThumbSize: function(e) {
            var t = this.max - this.min,
                i = 0;
            return t > 1 ? i = e / (t + e) * e : 1 == t ? i = e - 1 : 0 == t && (i = e), this.thumbSize > 0 && (i = this.thumbSize), i < this.thumbMinSize && (i = this.thumbMinSize), Math.min(i, e)
        },
        _positionelements: function() {
            var e = (this.element, this.areaUp),
                t = this.areaDown,
                i = (this.btnUp, this.btnDown, this.btnThumb),
                s = (this.scrollWrap, this._height ? this._height : this.host.height()),
                n = this._width ? this._width : this.host.width(),
                o = this.vertical ? n : s;
            this.showButtons || (o = 0);
            var r = this.vertical ? s : n;
            this.scrollBarSize = r;
            var a = this._getThumbSize(r - 2 * o);
            a = Math.floor(a), a < this.thumbMinSize && (a = this.thumbMinSize), (NaN == s || 10 > s) && (s = 10), (NaN == n || 10 > n) && (n = 10), o += 2, this.btnSize = o;
            var l = this._btnAndThumbSize;
            if (!this._btnAndThumbSize) {
                var l = this.vertical ? 2 * this.btnSize + i.outerHeight() : 2 * this.btnSize + i.outerWidth();
                l = Math.round(l)
            }
            var h = (r - l) / (this.max - this.min) * (this.value - this.min);
            if (this.rtl && !this.vertical && (h = (r - l) / (this.max - this.min) * (this.max - this.value - this.min)), h = Math.round(h), 0 > h && (h = 0), this.vertical) {
                var c = r - h - l;
                0 > c && (c = 0), t[0].style.height = c + "px", e[0].style.height = h + "px", this._setElementTopPosition(e, o), this._setElementTopPosition(i, o + h), this._setElementTopPosition(t, o + h + a)
            } else e[0].style.width = h + "px", r - h - l >= 0 ? t[0].style.width = r - h - l + "px" : t[0].style.width = "0px", this._setElementLeftPosition(e, o), this._setElementLeftPosition(i, o + h), this._setElementLeftPosition(t, 2 + o + h + a)
        },
        _arrange: function() {
            var e = this;
            if (e._initialLayout) return void(e._initialLayout = !1);
            if (e.min > e.max) {
                var t = e.min;
                e.min = e.max, e.max = t
            }
            if (e.min < 0) {
                var i = e.max - e.min;
                e.min = 0, e.max = i
            }
            var s = (e.element, e.areaUp),
                n = e.areaDown,
                o = e.btnUp,
                r = e.btnDown,
                a = e.btnThumb,
                l = e.scrollWrap,
                h = parseInt(e.element.style.height),
                c = parseInt(e.element.style.width);
            if (e.isPercentage) var h = e.host.height(),
                c = e.host.width();
            isNaN(h) && (h = 0), isNaN(c) && (c = 0), e._width = c, e._height = h;
            var u = e.vertical ? c : h;
            e.showButtons || (u = 0), o[0].style.width = u + "px", o[0].style.height = u + "px", r[0].style.width = u + "px", r[0].style.height = u + "px", e.vertical ? l[0].style.width = c + 2 + "px" : l[0].style.height = h + 2 + "px", e._setElementPosition(o, 0, 0);
            var d = u + 2;
            e.vertical ? e._setElementPosition(r, 0, h - d) : e._setElementPosition(r, c - d, 0);
            var p = e.vertical ? h : c;
            e.scrollBarSize = p;
            var f = e._getThumbSize(p - 2 * d);
            f = Math.floor(f - 2), f < e.thumbMinSize && (f = e.thumbMinSize);
            var m = !1;
            e.isTouchDevice && 0 != e.touchModeStyle && (m = !0), e.vertical ? (a[0].style.width = c + "px", a[0].style.height = f + "px", m && 0 !== e.thumbTouchSize && (a.css({ width: e.thumbTouchSize + "px" }), a.css("margin-left", (e.host.width() - e.thumbTouchSize) / 2))) : (a[0].style.width = f + "px", a[0].style.height = h + "px", m && 0 !== e.thumbTouchSize && (a.css({ height: e.thumbTouchSize + "px" }), a.css("margin-top", (e.host.height() - e.thumbTouchSize) / 2))), (NaN == h || 10 > h) && (h = 10), (NaN == c || 10 > c) && (c = 10), e.btnSize = u;
            var g = e.vertical ? 2 * d + (2 + parseInt(a[0].style.height)) : 2 * d + (2 + parseInt(a[0].style.width));
            g = Math.round(g), e._btnAndThumbSize = g;
            var v = (p - g) / (e.max - e.min) * (e.value - e.min);
            if (e.rtl && !e.vertical && (v = (p - g) / (e.max - e.min) * (e.max - e.value - e.min)), v = Math.round(v), (isNaN(v) || 0 > v || v === -(1 / 0) || v === 1 / 0) && (v = 0), e.vertical) {
                var b = p - v - g;
                0 > b && (b = 0), n[0].style.height = b + "px", n[0].style.width = c + "px", s[0].style.height = v + "px", s[0].style.width = c + "px";
                var y = parseInt(e.element.style.height);
                e.isPercentage && (y = e.host.height()), a[0].style.visibility = "inherit", (y - 3 * parseInt(u) < 0 || g > y) && (a[0].style.visibility = "hidden"), e._setElementPosition(s, 0, d), e._setElementPosition(a, 0, d + v), e._setElementPosition(n, 0, d + v + f)
            } else {
                v > 0 && (s[0].style.width = v + "px"), h > 0 && (s[0].style.height = h + "px");
                var x = p - v - g;
                0 > x && (x = 0), n[0].style.width = x + "px", n[0].style.height = h + "px";
                var w = parseInt(e.element.style.width);
                e.isPercentage && (w = e.host.width()), a[0].style.visibility = "inherit", (w - 3 * parseInt(u) < 0 || g > w) && (a[0].style.visibility = "hidden"), e._setElementPosition(s, d, 0), e._setElementPosition(a, d + v, 0), e._setElementPosition(n, d + v + f, 0)
            }
        }
    })
}(jqxBaseFramework),
function(e) {
    e.jqx.cssroundedcorners = function(e) {
        var t = { all: "jqx-rc-all", top: "jqx-rc-t", bottom: "jqx-rc-b", left: "jqx-rc-l", right: "jqx-rc-r", "top-right": "jqx-rc-tr", "top-left": "jqx-rc-tl", "bottom-right": "jqx-rc-br", "bottom-left": "jqx-rc-bl" };
        for (prop in t)
            if (t.hasOwnProperty(prop) && e == prop) return t[prop]
    }, e.jqx.jqxWidget("jqxButton", "", {}), e.extend(e.jqx._jqxButton.prototype, {
        defineInstance: function() { var t = { cursor: "arrow", roundedCorners: "all", disabled: !1, height: null, width: null, overrideTheme: !1, enableHover: !0, enableDefault: !0, enablePressed: !0, imgPosition: "center", imgSrc: "", imgWidth: 16, imgHeight: 16, value: null, textPosition: "", textImageRelation: "overlay", rtl: !1, _ariaDisabled: !1, _scrollAreaButton: !1, template: "default", aria: { "aria-disabled": { name: "disabled", type: "boolean" } } }; return e.extend(!0, this, t), t },
        _addImage: function(t) {
            var i = this;
            if ("input" == i.element.nodeName.toLowerCase() || "button" == i.element.nodeName.toLowerCase() || "div" == i.element.nodeName.toLowerCase()) {
                if (i._img) i._img[0].setAttribute("src", i.imgSrc), i._img[0].setAttribute("width", i.imgWidth), i._img[0].setAttribute("height", i.imgHeight), i._text.html(i.value);
                else {
                    i.field = i.element, i.field.className && (i._className = i.field.className);
                    var s = { title: i.field.title },
                        n = null;
                    if (i.field.getAttribute("value")) var n = i.field.getAttribute("value");
                    else if ("input" != i.element.nodeName.toLowerCase()) var n = i.element.innerHTML;
                    i.value && (n = i.value), i.field.id.length ? s.id = i.field.id.replace(/[^\w]/g, "_") + "_" + t : s.id = e.jqx.utilities.createId() + "_" + t;
                    var o = e("<div></div>", s);
                    o[0].style.cssText = i.field.style.cssText, o.css("box-sizing", "border-box");
                    var r = e("<img/>");
                    r[0].setAttribute("src", i.imgSrc), r[0].setAttribute("width", i.imgWidth), r[0].setAttribute("height", i.imgHeight), o.append(r), i._img = r;
                    var a = e("<span></span>");
                    n && (a.html(n), i.value = n), o.append(a), i._text = a, e(i.field).hide().after(o);
                    var l = i.host.data();
                    if (i.host = o, i.host.data(l), i.element = o[0], i.element.id = i.field.id, i.field.id = s.id, i._className && (i.host.addClass(i._className), e(i.field).removeClass(i._className)), i.field.tabIndex) {
                        var h = i.field.tabIndex;
                        i.field.tabIndex = -1, i.element.tabIndex = h
                    }
                }
                i.imgSrc ? i._img.show() : i._img.hide(), i.value ? i._text.show() : i._text.hide(), i._positionTextAndImage()
            }
        },
        _positionTextAndImage: function() {
            var e = this,
                t = e.host.outerWidth(),
                i = e.host.outerHeight(),
                s = e.imgWidth,
                n = e.imgHeight;
            "" == e.imgSrc && (s = 0, n = 0);
            var o = e._text.width(),
                r = e._text.height(),
                a = 4,
                l = 4,
                h = 4,
                c = 0,
                u = 0;
            switch (e.textImageRelation) {
                case "imageBeforeText":
                case "textBeforeImage":
                    c = s + o + 2 * h + a + 2 * l, u = Math.max(n, r) + 2 * h + a + 2 * l;
                    break;
                case "imageAboveText":
                case "textAboveImage":
                    c = Math.max(s, o) + 2 * h, u = n + r + a + 2 * h + 2 * l;
                    break;
                case "overlay":
                    c = Math.max(s, o) + 2 * h, u = Math.max(n, r) + 2 * h
            }
            e.width || (e.host.width(c), t = c), e.height || (e.host.height(u), i = u), e._img.css("position", "absolute"), e._text.css("position", "absolute"), e.host.css("position", "relative"), e.host.css("overflow", "hidden");
            var d = {},
                p = {},
                f = function(e, t, i, s, n) {
                    switch (t.width < s && (t.width = s), t.height < n && (t.height = n), i) {
                        case "left":
                            e.style.left = t.left + "px", e.style.top = t.top + t.height / 2 - n / 2 + "px";
                            break;
                        case "topLeft":
                            e.style.left = t.left + "px", e.style.top = t.top + "px";
                            break;
                        case "bottomLeft":
                            e.style.left = t.left + "px", e.style.top = t.top + t.height - n + "px";
                            break;
                        default:
                        case "center":
                            e.style.left = t.left + t.width / 2 - s / 2 + "px", e.style.top = t.top + t.height / 2 - n / 2 + "px";
                            break;
                        case "top":
                            e.style.left = t.left + t.width / 2 - s / 2 + "px", e.style.top = t.top + "px";
                            break;
                        case "bottom":
                            e.style.left = t.left + t.width / 2 - s / 2 + "px", e.style.top = t.top + t.height - n + "px";
                            break;
                        case "right":
                            e.style.left = t.left + t.width - s + "px", e.style.top = t.top + t.height / 2 - n / 2 + "px";
                            break;
                        case "topRight":
                            e.style.left = t.left + t.width - s + "px", e.style.top = t.top + "px";
                            break;
                        case "bottomRight":
                            e.style.left = t.left + t.width - s + "px", e.style.top = t.top + t.height - n + "px"
                    }
                },
                m = 0,
                g = 0,
                v = t,
                b = i,
                y = (v - m) / 2,
                x = (b - g) / 2,
                w = e._img,
                _ = e._text,
                C = b - g,
                I = v - m;
            switch (m += l, g += l, v = v - l - 2, I = I - 2 * l - 2, C = C - 2 * l - 2, e.textImageRelation) {
                case "imageBeforeText":
                    switch (e.imgPosition) {
                        case "left":
                        case "topLeft":
                        case "bottomLeft":
                            p = { left: m, top: g, width: m + s, height: C }, d = { left: m + s + a, top: g, width: I - s - a, height: C };
                            break;
                        case "center":
                        case "top":
                        case "bottom":
                            p = { left: y - o / 2 - s / 2 - a / 2, top: g, width: s, height: C }, d = { left: p.left + s + a, top: g, width: v - p.left - s - a, height: C };
                            break;
                        case "right":
                        case "topRight":
                        case "bottomRight":
                            p = { left: v - o - s - a, top: g, width: s, height: C }, d = { left: p.left + s + a, top: g, width: v - p.left - s - a, height: C }
                    }
                    f(w[0], p, e.imgPosition, s, n), f(_[0], d, e.textPosition, o, r);
                    break;
                case "textBeforeImage":
                    switch (e.textPosition) {
                        case "left":
                        case "topLeft":
                        case "bottomLeft":
                            d = { left: m, top: g, width: m + o, height: C }, p = { left: m + o + a, top: g, width: I - o - a, height: C };
                            break;
                        case "center":
                        case "top":
                        case "bottom":
                            d = { left: y - o / 2 - s / 2 - a / 2, top: g, width: o, height: C }, p = { left: d.left + o + a, top: g, width: v - d.left - o - a, height: C };
                            break;
                        case "right":
                        case "topRight":
                        case "bottomRight":
                            d = { left: v - o - s - a, top: g, width: o, height: C }, p = { left: d.left + o + a, top: g, width: v - d.left - o - a, height: C }
                    }
                    f(w[0], p, e.imgPosition, s, n), f(_[0], d, e.textPosition, o, r);
                    break;
                case "imageAboveText":
                    switch (e.imgPosition) {
                        case "topRight":
                        case "top":
                        case "topLeft":
                            p = { left: m, top: g, width: I, height: n }, d = { left: m, top: g + n + a, width: I, height: C - n - a };
                            break;
                        case "left":
                        case "center":
                        case "right":
                            p = { left: m, top: x - n / 2 - r / 2 - a / 2, width: I, height: n }, d = { left: m, top: p.top + a + n, width: I, height: C - p.top - a - n };
                            break;
                        case "bottomLeft":
                        case "bottom":
                        case "bottomRight":
                            p = { left: m, top: b - n - r - a, width: I, height: n }, d = { left: m, top: p.top + a + n, width: I, height: r }
                    }
                    f(w[0], p, e.imgPosition, s, n), f(_[0], d, e.textPosition, o, r);
                    break;
                case "textAboveImage":
                    switch (e.textPosition) {
                        case "topRight":
                        case "top":
                        case "topLeft":
                            d = { left: m, top: g, width: I, height: r }, p = { left: m, top: g + r + a, width: I, height: C - r - a };
                            break;
                        case "left":
                        case "center":
                        case "right":
                            d = { left: m, top: x - n / 2 - r / 2 - a / 2, width: I, height: r }, p = { left: m, top: d.top + a + r, width: I, height: C - d.top - a - r };
                            break;
                        case "bottomLeft":
                        case "bottom":
                        case "bottomRight":
                            d = { left: m, top: b - n - r - a, width: I, height: r }, p = { left: m, top: d.top + a + r, width: I, height: n }
                    }
                    f(w[0], p, e.imgPosition, s, n), f(_[0], d, e.textPosition, o, r);
                    break;
                case "overlay":
                default:
                    d = { left: m, top: g, width: I, height: C }, p = { left: m, top: g, width: I, height: C }, f(w[0], p, e.imgPosition, s, n), f(_[0], d, e.textPosition, o, r)
            }
        },
        createInstance: function(t) {
            var i = this;
            i._setSize(), ("" != i.imgSrc || "" != i.textPosition || i.element.value && i.element.value.indexOf("<") >= 0 || null != i.value) && (i.refresh(), i._addImage("jqxButton")), i._ariaDisabled || i.host.attr("role", "button"), i.overrideTheme || (i.host.addClass(i.toThemeProperty(e.jqx.cssroundedcorners(i.roundedCorners))), i.enableDefault && i.host.addClass(i.toThemeProperty("jqx-button")), i.host.addClass(i.toThemeProperty("jqx-widget"))), i.isTouchDevice = e.jqx.mobile.isTouchDevice(), i._ariaDisabled || e.jqx.aria(this), "arrow" != i.cursor && (i.disabled ? i.host.css({ cursor: "arrow" }) : i.host.css({ cursor: i.cursor }));
            var s = "mouseenter mouseleave mousedown focus blur";
            if (i._scrollAreaButton) var s = "mousedown";
            i.isTouchDevice && (i.addHandler(i.host, e.jqx.mobile.getTouchEventName("touchstart"), function(e) { i.isPressed = !0, i.refresh() }), i.addHandler(e(document), e.jqx.mobile.getTouchEventName("touchend") + "." + i.element.id, function(e) { i.isPressed = !1, i.refresh() })), i.addHandler(i.host, s, function(e) {
                switch (e.type) {
                    case "mouseenter":
                        i.isTouchDevice || !i.disabled && i.enableHover && (i.isMouseOver = !0, i.refresh());
                        break;
                    case "mouseleave":
                        i.isTouchDevice || !i.disabled && i.enableHover && (i.isMouseOver = !1, i.refresh());
                        break;
                    case "mousedown":
                        i.disabled || (i.isPressed = !0, i.refresh());
                        break;
                    case "focus":
                        i.disabled || (i.isFocused = !0, i.refresh());
                        break;
                    case "blur":
                        i.disabled || (i.isFocused = !1, i.refresh())
                }
            }), i.mouseupfunc = function(e) { i.disabled || (i.isPressed || i.isMouseOver) && (i.isPressed = !1, i.refresh()) }, i.addHandler(e(document), "mouseup.button" + i.element.id, i.mouseupfunc);
            try {
                if (("" != document.referrer || window.frameElement) && null != window.top && window.top != window.self) {
                    var n = "";
                    if (window.parent && document.referrer && (n = document.referrer), -1 != n.indexOf(document.location.host)) {
                        var o = function(e) { i.isPressed = !1, i.refresh() };
                        window.top.document && i.addHandler(e(window.top.document), "mouseup", o)
                    }
                }
            } catch (r) {}
            i.propertyChangeMap.roundedCorners = function(t, i, s, n) { t.host.removeClass(t.toThemeProperty(e.jqx.cssroundedcorners(s))), t.host.addClass(t.toThemeProperty(e.jqx.cssroundedcorners(n))) }, i.propertyChangeMap.disabled = function(t, i, s, n) { s != n && (t.refresh(), t.host[0].disabled = n, t.host.attr("disabled", n), n ? t.host.css({ cursor: "default" }) : t.host.css({ cursor: t.cursor }), e.jqx.aria(t, "aria-disabled", t.disabled)) }, i.propertyChangeMap.rtl = function(e, t, i, s) { i != s && e.refresh() }, i.propertyChangeMap.template = function(e, t, i, s) { i != s && (e.host.removeClass(e.toThemeProperty("jqx-" + i)), e.refresh()) }, i.propertyChangeMap.theme = function(t, i, s, n) { t.host.removeClass(), t.enableDefault && t.host.addClass(t.toThemeProperty("jqx-button")), t.host.addClass(t.toThemeProperty("jqx-widget")), t.overrideTheme || t.host.addClass(t.toThemeProperty(e.jqx.cssroundedcorners(t.roundedCorners))), t._oldCSSCurrent = null, t.refresh() }, i.disabled && (i.element.disabled = !0, i.host.attr("disabled", !0))
        },
        resize: function(e, t) { this.width = e, this.height = t, this._setSize() },
        val: function() {
            var t = this,
                i = t.host.find("input");
            return i.length > 0 ? 0 == arguments.length || "object" == typeof value ? i.val() : (i.val(value), t.refresh(), i.val()) : 0 == arguments.length || "object" == typeof value ? "button" == t.element.nodeName.toLowerCase() ? e(t.element).text() : t.element.value : (t.element.value = arguments[0], "button" == t.element.nodeName.toLowerCase() && e(t.element).text(arguments[0]), void t.refresh())
        },
        _setSize: function() {
            var e = this;
            null == e.width || -1 == e.width.toString().indexOf("px") && -1 == e.width.toString().indexOf("%") ? void 0 == e.width || isNaN(e.width) || e.host.css("width", e.width) : e.host.css("width", e.width), null == e.height || -1 == e.height.toString().indexOf("px") && -1 == e.height.toString().indexOf("%") ? void 0 == e.height || isNaN(e.height) || e.host.css("height", parseInt(e.height)) : e.host.css("height", e.height)
        },
        _removeHandlers: function() {
            var t = this;
            t.removeHandler(t.host, "selectstart"), t.removeHandler(t.host, "click"), t.removeHandler(t.host, "focus"), t.removeHandler(t.host, "blur"), t.removeHandler(t.host, "mouseenter"), t.removeHandler(t.host, "mouseleave"), t.removeHandler(t.host, "mousedown"), t.removeHandler(e(document), "mouseup.button" + t.element.id, t.mouseupfunc), t.isTouchDevice && (t.removeHandler(t.host, e.jqx.mobile.getTouchEventName("touchstart")), t.removeHandler(e(document), e.jqx.mobile.getTouchEventName("touchend") + "." + t.element.id)), t.mouseupfunc = null, delete t.mouseupfunc
        },
        focus: function() { this.host.focus() },
        destroy: function() {
            var t = this;
            t._removeHandlers();
            var i = e.data(t.element, "jqxButton");
            i && delete i.instance, t.host.removeClass(), t.host.removeData(), t.host.remove(), delete t.set, delete t.get, delete t.call, delete t.element, delete t.host
        },
        render: function() { this.refresh() },
        propertiesChangedHandler: function(e, t, i) { i && i.width && i.height && 2 == Object.keys(i).length && (e._setSize(), e.refresh()) },
        propertyChangedHandler: function(e, t, i, s) { void 0 != this.isInitialized && 0 != this.isInitialized && s != i && (e.batchUpdate && e.batchUpdate.width && e.batchUpdate.height && 2 == Object.keys(e.batchUpdate).length || (("textImageRelation" == t || "textPosition" == t || "imgPosition" == t) && (e._img ? e._positionTextAndImage() : e._addImage("jqxButton")), ("imgSrc" == t || "imgWidth" == t || "imgHeight" == t || "value" == t) && e._addImage("jqxButton"), ("width" == t || "height" == t) && (e._setSize(), e.refresh()))) },
        refresh: function() {
            var e = this;
            if (!e.overrideTheme) {
                var t = e.toThemeProperty("jqx-fill-state-focus"),
                    i = e.toThemeProperty("jqx-fill-state-disabled"),
                    s = e.toThemeProperty("jqx-fill-state-normal");
                e.enableDefault || (s = "");
                var n = e.toThemeProperty("jqx-fill-state-hover"),
                    o = e.toThemeProperty("jqx-fill-state-pressed"),
                    r = e.toThemeProperty("jqx-fill-state-pressed");
                e.enablePressed || (o = "");
                var a = "";
                if (e.host) {
                    if (e.host[0].disabled = e.disabled, e.disabled) return e._oldCSSCurrent && e.host.removeClass(e._oldCSSCurrent), a = s + " " + i, "default" !== e.template && "" !== e.template && (a += " jqx-" + e.template, "" != e.theme && (a += " jqx-" + e.template + "-" + e.theme)), e.host.addClass(a), void(e._oldCSSCurrent = a);
                    a = e.isMouseOver && !e.isTouchDevice ? e.isPressed ? r : n : e.isPressed ? o : s, e.isFocused && (a += " " + t), "default" !== e.template && "" !== e.template && (a += " jqx-" + e.template, "" != e.theme && (a += " jqx-" + e.template + "-" + e.theme)), a != e._oldCSSCurrent && (e._oldCSSCurrent && e.host.removeClass(e._oldCSSCurrent), e.host.addClass(a), e._oldCSSCurrent = a), e.rtl && (e.host.addClass(e.toThemeProperty("jqx-rtl")), e.host.css("direction", "rtl"))
                }
            }
        }
    }), e.jqx.jqxWidget("jqxLinkButton", "", {}), e.extend(e.jqx._jqxLinkButton.prototype, {
        defineInstance: function() { this.disabled = !1, this.height = null, this.width = null, this.rtl = !1, this.href = null },
        createInstance: function(e) {
            var t = this;
            this.host.onselectstart = function() { return !1 }, this.host.attr("role", "button");
            var i = this.height || this.host.height(),
                s = this.width || this.host.width();
            this.href = this.host.attr("href"), this.target = this.host.attr("target"), this.content = this.host.text(), this.element.innerHTML = "", this.host.append("<input type='button' class='jqx-wrapper'/>");
            var n = this.host.find("input");
            n.addClass(this.toThemeProperty("jqx-reset")), n.width(s), n.height(i), n.val(this.content), this.host.find("tr").addClass(this.toThemeProperty("jqx-reset")), this.host.find("td").addClass(this.toThemeProperty("jqx-reset")), this.host.find("tbody").addClass(this.toThemeProperty("jqx-reset")), this.host.css("color", "inherit"), this.host.addClass(this.toThemeProperty("jqx-link")), n.css({ width: s }), n.css({ height: i });
            var o = void 0 == e ? {} : e[0] || {};
            n.jqxButton(o), this.disabled && (this.host[0].disabled = !0), this.propertyChangeMap.disabled = function(e, t, i, s) { e.host[0].disabled = s, e.host.find("input").jqxButton({ disabled: s }) }, this.addHandler(n, "click", function(e) { return this.disabled || t.onclick(e), !1 })
        },
        onclick: function(e) { null != this.target ? window.open(this.href, this.target) : window.location = this.href }
    }), e.jqx.jqxWidget("jqxRepeatButton", "jqxButton", {}), e.extend(e.jqx._jqxRepeatButton.prototype, {
        defineInstance: function() { this.delay = 50 },
        createInstance: function(t) {
            var i = this,
                s = e.jqx.mobile.isTouchDevice(),
                n = s ? "touchend." + this.base.element.id : "mouseup." + this.base.element.id,
                o = s ? "touchstart." + this.base.element.id : "mousedown." + this.base.element.id;
            this.addHandler(e(document), n, function(e) { null != i.timeout && (clearTimeout(i.timeout), i.timeout = null, i.refresh()), void 0 != i.timer && (clearInterval(i.timer), i.timer = null, i.refresh()) }), this.addHandler(this.base.host, o, function(e) { null != i.timer && clearInterval(i.timer), i.timeout = setTimeout(function() { clearInterval(i.timer), i.timer = setInterval(function(e) { i.ontimer(e) }, i.delay) }, 150) }), this.mousemovefunc = function(e) { s || 0 == e.which && null != i.timer && (clearInterval(i.timer), i.timer = null) }, this.addHandler(this.base.host, "mousemove", this.mousemovefunc)
        },
        destroy: function() {
            var t = e.jqx.mobile.isTouchDevice(),
                i = t ? "touchend." + this.base.element.id : "mouseup." + this.base.element.id,
                s = t ? "touchstart." + this.base.element.id : "mousedown." + this.base.element.id;
            this.removeHandler(this.base.host, "mousemove", this.mousemovefunc), this.removeHandler(this.base.host, s), this.removeHandler(e(document), i), this.timer = null, delete this.mousemovefunc, delete this.timer;
            var n = e.data(this.base.element, "jqxRepeatButton");
            n && delete n.instance, e(this.base.element).removeData(), this.base.destroy(), delete this.base
        },
        stop: function() { clearInterval(this.timer), this.timer = null },
        ontimer: function(t) {
            var t = new e.Event("click");
            null != this.base && null != this.base.host && this.base.host.trigger(t)
        }
    }), e.jqx.jqxWidget("jqxToggleButton", "jqxButton", {}), e.extend(e.jqx._jqxToggleButton.prototype, {
        defineInstance: function() { this.toggled = !1, this.uiToggle = !0, this.aria = { "aria-checked": { name: "toggled", type: "boolean" }, "aria-disabled": { name: "disabled", type: "boolean" } } },
        createInstance: function(t) {
            var i = this;
            i.base.overrideTheme = !0, i.isTouchDevice = e.jqx.mobile.isTouchDevice(), e.jqx.aria(this), i.propertyChangeMap.roundedCorners = function(t, i, s, n) { t.base.host.removeClass(t.toThemeProperty(e.jqx.cssroundedcorners(s))), t.base.host.addClass(t.toThemeProperty(e.jqx.cssroundedcorners(n))) }, i.propertyChangeMap.toggled = function(e, t, i, s) { e.refresh() }, i.propertyChangeMap.disabled = function(e, t, i, s) { e.base.disabled = s, e.refresh() }, i.addHandler(i.base.host, "click", function(e) {!i.base.disabled && i.uiToggle && i.toggle() }), i.isTouchDevice || (i.addHandler(i.base.host, "mouseenter", function(e) { i.base.disabled || i.refresh() }), i.addHandler(i.base.host, "mouseleave", function(e) { i.base.disabled || i.refresh() })), i.addHandler(i.base.host, "mousedown", function(e) { i.base.disabled || i.refresh() }), i.addHandler(e(document), "mouseup.togglebutton" + i.base.element.id, function(e) { i.base.disabled || i.refresh() })
        },
        destroy: function() { this._removeHandlers(), this.base.destroy() },
        _removeHandlers: function() { this.removeHandler(this.base.host, "click"), this.removeHandler(this.base.host, "mouseenter"), this.removeHandler(this.base.host, "mouseleave"), this.removeHandler(this.base.host, "mousedown"), this.removeHandler(e(document), "mouseup.togglebutton" + this.base.element.id) },
        toggle: function() { this.toggled = !this.toggled, this.refresh(), e.jqx.aria(this, "aria-checked", this.toggled) },
        unCheck: function() { this.toggled = !1, this.refresh() },
        check: function() { this.toggled = !0, this.refresh() },
        refresh: function() {
            var e = this,
                t = e.base.toThemeProperty("jqx-fill-state-disabled"),
                i = e.base.toThemeProperty("jqx-fill-state-normal");
            e.base.enableDefault || (i = "");
            var s = e.base.toThemeProperty("jqx-fill-state-hover"),
                n = e.base.toThemeProperty("jqx-fill-state-pressed"),
                o = e.base.toThemeProperty("jqx-fill-state-pressed"),
                r = "";
            return e.base.host[0].disabled = e.base.disabled, e.base.disabled ? (r = i + " " + t, void e.base.host.addClass(r)) : (r = e.base.isMouseOver && !e.isTouchDevice ? e.base.isPressed || e.toggled ? o : s : e.base.isPressed || e.toggled ? n : i, "default" !== e.base.template && "" !== e.base.template && (r += " jqx-" + e.base.template, "" != e.base.theme && (r += " jqx-" + e.template + "-" + e.base.theme)), e.base.host.hasClass(t) && t != r && e.base.host.removeClass(t), e.base.host.hasClass(i) && i != r && e.base.host.removeClass(i), e.base.host.hasClass(s) && s != r && e.base.host.removeClass(s), e.base.host.hasClass(n) && n != r && e.base.host.removeClass(n), e.base.host.hasClass(o) && o != r && e.base.host.removeClass(o), void(e.base.host.hasClass(r) || e.base.host.addClass(r)))
        }
    })
}(jqxBaseFramework),
function(e) {
    e.jqx.jqxWidget("jqxListBox", "", {}), e.extend(e.jqx._jqxListBox.prototype, {
        defineInstance: function() { var t = { disabled: !1, width: null, height: null, items: new Array, multiple: !1, selectedIndex: -1, selectedIndexes: new Array, source: null, scrollBarSize: e.jqx.utilities.scrollBarSize, enableHover: !0, enableSelection: !0, visualItems: new Array, groups: new Array, equalItemsWidth: !0, itemHeight: -1, visibleItems: new Array, emptyGroupText: "Group", checkboxes: !1, hasThreeStates: !1, autoHeight: !1, autoItemsHeight: !1, roundedcorners: !0, touchMode: "auto", displayMember: "", groupMember: "", valueMember: "", searchMember: "", searchMode: "startswithignorecase", incrementalSearch: !0, incrementalSearchDelay: 1e3, incrementalSearchKeyDownDelay: 300, allowDrag: !1, allowDrop: !0, dropAction: "default", touchModeStyle: "auto", keyboardNavigation: !0, enableMouseWheel: !0, multipleextended: !1, selectedValues: new Array, emptyString: "", rtl: !1, rendered: null, renderer: null, dragStart: null, dragEnd: null, focusable: !0, ready: null, _checkForHiddenParent: !0, autoBind: !0, _renderOnDemand: !1, filterable: !1, filterHeight: 27, filterPlaceHolder: "Looking for", filterDelay: 100, filterChange: null, aria: { "aria-disabled": { name: "disabled", type: "boolean" } }, events: ["select", "unselect", "change", "checkChange", "dragStart", "dragEnd", "bindingComplete"] }; return e.extend(!0, this, t), t },
        createInstance: function(t) {
            var i = this;
            15 != e.jqx.utilities.scrollBarSize && (i.scrollBarSize = e.jqx.utilities.scrollBarSize), null == i.width && (i.width = 200), null == i.height && (i.height = 200), i.renderListBox();
            var s = i;
            e.jqx.utilities.resize(i.host, function() { s._updateSize() }, !1, i._checkForHiddenParent)
        },
        resize: function(e, t) { this.width = e, this.height = t, this._updateSize() },
        render: function() { this.renderListBox(), this.refresh() },
        renderListBox: function() {
            var t = this,
                i = t.element.nodeName.toLowerCase();
            if ("select" == i || "ul" == i || "ol" == i) {
                t.field = t.element, t.field.className && (t._className = t.field.className);
                var s = { title: t.field.title };
                t.field.id.length ? s.id = t.field.id.replace(/[^\w]/g, "_") + "_jqxListBox" : s.id = e.jqx.utilities.createId() + "_jqxListBox";
                var n = e("<div></div>", s);
                t.width || (t.width = e(t.field).width()), t.height || (t.height = e(t.field).outerHeight()), t.element.style.cssText = t.field.style.cssText, e(t.field).hide().after(n);
                var o = t.host.data();
                if (t.host = n, t.host.data(o), t.element = n[0], t.element.id = t.field.id, t.field.id = s.id, t._className && (t.host.addClass(t._className), e(t.field).removeClass(t._className)), t.field.tabIndex) {
                    var r = t.field.tabIndex;
                    t.field.tabIndex = -1, t.element.tabIndex = r
                }
            }
            t.element.innerHTML = "";
            var t = t,
                a = t.element.className;
            a += " " + t.toThemeProperty("jqx-listbox"), a += " " + t.toThemeProperty("jqx-reset"), a += " " + t.toThemeProperty("jqx-rc-all"), a += " " + t.toThemeProperty("jqx-widget"), a += " " + t.toThemeProperty("jqx-widget-content"), t.element.className = a;
            var l = !1;
            null != t.width && -1 != t.width.toString().indexOf("%") && (t.host.width(t.width), l = !0), null != t.height && -1 != t.height.toString().indexOf("%") && (t.host.height(t.height), 0 == t.host.height() && t.host.height(200), l = !0), null != t.width && -1 != t.width.toString().indexOf("px") ? t.host.width(t.width) : void 0 == t.width || isNaN(t.width) || (t.element.style.width = parseInt(t.width) + "px"), null != t.height && -1 != t.height.toString().indexOf("px") ? t.host.height(t.height) : void 0 == t.height || isNaN(t.height) || (t.element.style.height = parseInt(t.height) + "px"), t.multiple || t.multipleextended || t.checkboxes ? e.jqx.aria(t, "aria-multiselectable", !0) : e.jqx.aria(t, "aria-multiselectable", !1);
            var h = "<div style='-webkit-appearance: none; background: transparent; outline: none; width:100%; height: 100%; align:left; border: 0px; padding: 0px; margin: 0px; left: 0px; top: 0px; valign:top; position: relative;'><div style='-webkit-appearance: none; border: none; background: transparent; outline: none; width:100%; height: 100%; padding: 0px; margin: 0px; align:left; left: 0px; top: 0px; valign:top; position: relative;'><div id='filter" + t.element.id + "' style='display: none; visibility: inherit; align:left; valign:top; left: 0px; top: 0px; position: absolute;'><input style='position: absolute;'/></div><div id='listBoxContent' style='-webkit-appearance: none; border: none; background: transparent; outline: none; border: none; padding: 0px; overflow: hidden; margin: 0px; align:left; valign:top; left: 0px; top: 0px; position: absolute;'></div><div id='verticalScrollBar" + t.element.id + "' style='visibility: inherit; align:left; valign:top; left: 0px; top: 0px; position: absolute;'></div><div id='horizontalScrollBar" + t.element.id + "' style='visibility: inherit; align:left; valign:top; left: 0px; top: 0px; position: absolute;'></div><div id='bottomRight' style='align:left; valign:top; left: 0px; top: 0px; border: none; position: absolute;'/></div></div>";
            t.host.attr("role", "listbox"), t.element.innerHTML = h, t._checkForHiddenParent && (t._addInput(), t.host.attr("tabIndex") || t.host.attr("tabIndex", 1)), t.filter = e(t.element.firstChild.firstChild.firstChild), t.filterInput = e(t.filter[0].firstChild), t.filterInput.attr("placeholder", t.filterPlaceHolder), t.filterInput.addClass(t.toThemeProperty("jqx-widget jqx-listbox-filter-input jqx-input jqx-rc-all")), t.addHandler(t.filterInput, "keyup.textchange", function(e) { 13 == e.keyCode ? t._search(e) : t.filterDelay > 0 && (t._filterTimer && clearTimeout(t._filterTimer), t._filterTimer = setTimeout(function() { t._search(e) }, t.filterDelay)), e.stopPropagation() });
            var c = e(t.element.firstChild.firstChild.firstChild.nextSibling.nextSibling);
            if (!t.host.jqxButton) throw new Error("jqxListBox: Missing reference to jqxbuttons.js.");
            if (!c.jqxScrollBar) throw new Error("jqxListBox: Missing reference to jqxscrollbar.js.");
            var u = parseInt(t.host.height()) / 2;
            0 == u && (u = 10), t.vScrollBar = c.jqxScrollBar({ _initialLayout: !0, vertical: !0, rtl: t.rtl, theme: t.theme, touchMode: t.touchMode, largestep: u });
            var d = e(t.element.firstChild.firstChild.firstChild.nextSibling.nextSibling.nextSibling);
            if (t.hScrollBar = d.jqxScrollBar({ _initialLayout: !0, vertical: !1, rtl: t.rtl, touchMode: t.touchMode, theme: t.theme }), t.content = e(t.element.firstChild.firstChild.firstChild.nextSibling), t.content[0].id = "listBoxContent" + t.element.id, t.bottomRight = e(t.element.firstChild.firstChild.firstChild.nextSibling.nextSibling.nextSibling.nextSibling).addClass(t.toThemeProperty("jqx-listbox-bottomright")).addClass(t.toThemeProperty("jqx-scrollbar-state-normal")), t.bottomRight[0].id = "bottomRight" + t.element.id, t.vScrollInstance = e.data(t.vScrollBar[0], "jqxScrollBar").instance, t.hScrollInstance = e.data(t.hScrollBar[0], "jqxScrollBar").instance, t.isTouchDevice() && !(e.jqx.browser.msie && e.jqx.browser.version < 9)) {
                var p = e("<div class='overlay' unselectable='on' style='z-index: 99; -webkit-appearance: none; border: none; background: black; opacity: 0.01; outline: none; border: none; padding: 0px; overflow: hidden; margin: 0px; align:left; valign:top; left: 0px; top: 0px; position: absolute;'></div>");
                t.content.parent().append(p), t.overlayContent = t.host.find(".overlay"), t.filterable && t.overlayContent.css("top", "30px")
            }
            t._updateTouchScrolling(), t.host.addClass("jqx-disableselect"), t.host.jqxDragDrop && jqxListBoxDragDrop()
        },
        _highlight: function(e, t) { var i = t.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, "\\$&"); return e.replace(new RegExp("(" + i + ")", "ig"), function(e, t) { return "<b>" + t + "</b>" }) },
        _addInput: function() {
            var t = this.host.attr("name");
            t && this.host.attr("name", ""), this.input = e("<input type='hidden'/>"), this.host.append(this.input), this.input.attr("name", t)
        },
        _updateTouchScrolling: function() {
            var t = this;
            if (this.isTouchDevice()) {
                t.enableHover = !1;
                var i = this.overlayContent ? this.overlayContent : this.content;
                this.removeHandler(e(i), e.jqx.mobile.getTouchEventName("touchstart") + ".touchScroll"), this.removeHandler(e(i), e.jqx.mobile.getTouchEventName("touchmove") + ".touchScroll"), this.removeHandler(e(i), e.jqx.mobile.getTouchEventName("touchend") + ".touchScroll"), this.removeHandler(e(i), "touchcancel.touchScroll"), e.jqx.mobile.touchScroll(i, t.vScrollInstance.max, function(e, i) {
                    if (null != i && "hidden" != t.vScrollBar.css("visibility")) {
                        t.vScrollInstance.value;
                        t.vScrollInstance.setPosition(i), t._lastScroll = new Date
                    }
                    if (null != e && "hidden" != t.hScrollBar.css("visibility")) {
                        t.hScrollInstance.value;
                        t.hScrollInstance.setPosition(e), t._lastScroll = new Date
                    }
                }, this.element.id, this.hScrollBar, this.vScrollBar), "visible" != t.vScrollBar.css("visibility") && "visible" != t.hScrollBar.css("visibility") ? e.jqx.mobile.setTouchScroll(!1, this.element.id) : e.jqx.mobile.setTouchScroll(!0, this.element.id), this._arrange()
            }
        },
        isTouchDevice: function() {
            var t = e.jqx.mobile.isTouchDevice();
            if (1 == this.touchMode) {
                if (this.touchDevice) return !0;
                if (e.jqx.browser.msie && e.jqx.browser.version < 9) return !1;
                this.touchDevice = !0, t = !0, e.jqx.mobile.setMobileSimulator(this.element)
            } else 0 == this.touchMode && (t = !1);
            return t && 0 != this.touchModeStyle && (this.scrollBarSize = e.jqx.utilities.touchScrollBarSize), t && this.host.addClass(this.toThemeProperty("jqx-touch")), t
        },
        beginUpdate: function() { this.updatingListBox = !0 },
        endUpdate: function() { this.updatingListBox = !1, this._addItems(), this._renderItems() },
        beginUpdateLayout: function() { this.updating = !0 },
        resumeUpdateLayout: function() { this.updating = !1, this.vScrollInstance.value = 0, this._render(!1) },
        propertiesChangedHandler: function(e, t, i) { i.width && i.height && 2 == Object.keys(i).length && (e._cachedItemHtml = new Array, e.refresh()) },
        propertyChangedHandler: function(t, i, s, n) {
            if (void 0 != this.isInitialized && 0 != this.isInitialized && s != n && !(t.batchUpdate && t.batchUpdate.width && t.batchUpdate.height && 2 == Object.keys(t.batchUpdate).length)) {
                if ("_renderOnDemand" == i && (t._render(!1, !0), -1 != t.selectedIndex)) {
                    var o = t.selectedIndex;
                    t.selectedIndex = -1, t._stopEvents = !0, t.selectIndex(o, !1, !0), -1 == t.selectedIndex && (t.selectedIndex = o), t._stopEvents = !1
                }
                if ("filterable" == i && t.refresh(), "filterHeight" == i && t._arrange(), "filterPlaceHolder" == i && t.filterInput.attr("placeholder", n), "renderer" == i && (t._cachedItemHtml = new Array, t.refresh()), "itemHeight" == i && t.refresh(), ("source" == i || "checkboxes" == i) && (null == n && s && s.unbindBindingUpdate && (s.unbindBindingUpdate(t.element.id), s.unbindDownloadComplete(t.element.id)), t.clearSelection(), t.refresh()), ("scrollBarSize" == i || "equalItemsWidth" == i) && n != s && t._updatescrollbars(), "disabled" == i && (t._renderItems(), t.vScrollBar.jqxScrollBar({ disabled: n }), t.hScrollBar.jqxScrollBar({ disabled: n })), "touchMode" == i || "rtl" == i) {
                    if (t._removeHandlers(), t.vScrollBar.jqxScrollBar({ touchMode: n }), t.hScrollBar.jqxScrollBar({ touchMode: n }), "touchMode" == i && !(e.jqx.browser.msie && e.jqx.browser.version < 9)) {
                        var r = e("<div class='overlay' unselectable='on' style='z-index: 99; -webkit-appearance: none; border: none; background: black; opacity: 0.01; outline: none; border: none; padding: 0px; overflow: hidden; margin: 0px; align:left; valign:top; left: 0px; top: 0px; position: absolute;'></div>");
                        t.content.parent().append(r), t.overlayContent = t.host.find(".overlay")
                    }
                    t.filterable && t.filterInput && ("rtl" == i && n ? t.filterInput.addClass(t.toThemeProperty("jqx-rtl")) : "rtl" != i || n || t.filterInput.removeClass(t.toThemeProperty("jqx-rtl")), t._arrange()), t._updateTouchScrolling(), t._addHandlers(), t._render(!1)
                }
                if (this.updating || ("width" == i || "height" == i) && t._updateSize(), "theme" == i && s != n && (t.hScrollBar.jqxScrollBar({ theme: t.theme }), t.vScrollBar.jqxScrollBar({ theme: t.theme }), t.host.removeClass(), t.host.addClass(t.toThemeProperty("jqx-listbox")), t.host.addClass(t.toThemeProperty("jqx-widget")), t.host.addClass(t.toThemeProperty("jqx-widget-content")), t.host.addClass(t.toThemeProperty("jqx-reset")), t.host.addClass(t.toThemeProperty("jqx-rc-all")), t.refresh()), "selectedIndex" == i && (t.clearSelection(), t.selectIndex(n, !0)), "displayMember" == i || "valueMember" == i) {
                    if (s != n) {
                        var a = t.selectedIndex;
                        t.refresh(), t.selectedIndex = a, t.selectedIndexes[a] = a
                    }
                    t._renderItems()
                }
                "autoHeight" == i && (s != n ? t._render(!1) : (t._updatescrollbars(), t._renderItems())), t._checkForHiddenParent && e.jqx.isHidden(t.host) && e.jqx.utilities.resize(this.host, function() { t._updateSize() }, !1, t._checkForHiddenParent)
            }
        },
        loadFromSelect: function(t) {
            if (null != t) {
                var i = "#" + t,
                    s = e(i);
                if (s.length > 0) {
                    var n = e.jqx.parseSourceTag(s[0]),
                        o = n.items,
                        r = n.index;
                    this.source = o, this.fromSelect = !0, this.clearSelection(), this.selectedIndex = r, this.selectedIndexes[this.selectedIndex] = this.selectedIndex, this.refresh()
                }
            }
        },
        invalidate: function() { this._cachedItemHtml = [], this._renderItems(), this.virtualSize = null, this._updateSize() },
        refresh: function(t) {
            var i = this;
            if (void 0 != this.vScrollBar) {
                this._cachedItemHtml = [], this.visibleItems = new Array;
                var s = function(e) {
                    if (1 == e && -1 != i.selectedIndex) {
                        var t = i.selectedIndex;
                        i.selectedIndex = -1, i._stopEvents = !0, i.selectIndex(t, !1, !0), -1 == i.selectedIndex && (i.selectedIndex = t), i._stopEvents = !1
                    }
                };
                if (null != this.itemswrapper && (this.itemswrapper.remove(), this.itemswrapper = null), e.jqx.dataAdapter && null != this.source && this.source._source) return this.databind(this.source, t), void s(t);
                (this.autoBind || !this.autoBind && !t) && (this.field && this.loadSelectTag(), this.items = this.loadItems(this.source)), this._render(!1, 1 == t), s(t), this._raiseEvent("6")
            }
        },
        loadSelectTag: function() {
            var t = e.jqx.parseSourceTag(this.field);
            this.source = t.items, -1 == this.selectedIndex && (this.selectedIndex = t.index)
        },
        _render: function(e, t) { return this._renderOnDemand ? (this.visibleItems = new Array, this.renderedVisibleItems = new Array, void this._renderItems()) : (this._addItems(), this._renderItems(), this.vScrollInstance.setPosition(0), this._cachedItemHtml = new Array, (void 0 == e || e) && void 0 != this.items && null != this.items && this.selectedIndex >= 0 && this.selectedIndex < this.items.length && this.selectIndex(this.selectedIndex, !0, !0, !0), this.allowDrag && this._enableDragDrop && (this._enableDragDrop(), this.isTouchDevice()) ? (this._removeHandlers(), this.overlayContent && (this.overlayContent.remove(), this.overlayContent = null), this._updateTouchScrolling(), void this._addHandlers()) : (this._updateTouchScrolling(), this.rendered && this.rendered(), void(this.ready && this.ready()))) },
        _hitTest: function(e, t) {
            this.filterable && (t -= this.filterHeight, 0 > t && (t = 0));
            var i = parseInt(this.vScrollInstance.value),
                s = this._searchFirstVisibleIndex(t + i, this.renderedVisibleItems);
            if (void 0 != this.renderedVisibleItems[s] && this.renderedVisibleItems[s].isGroup) return null;
            if (this.renderedVisibleItems.length > 0) { var n = this.renderedVisibleItems[this.renderedVisibleItems.length - 1]; if (n.height + n.top < t + i) return null }
            return s = this._searchFirstVisibleIndex(t + i), this.visibleItems[s]
        },
        _searchFirstVisibleIndex: function(e, t) {
            void 0 == e && (e = parseInt(this.vScrollInstance.value));
            var i = 0;
            (void 0 == t || null == t) && (t = this.visibleItems);
            for (var s = t.length; s >= i;) {
                mid = parseInt((i + s) / 2);
                var n = t[mid];
                if (void 0 == n) break;
                if (n.initialTop > e && n.initialTop + n.height > e) s = mid - 1;
                else {
                    if (!(n.initialTop < e && n.initialTop + n.height <= e)) return mid;
                    i = mid + 1
                }
            }
            return 0
        },
        _renderItems: function() {
            if (void 0 == this.items || 0 == this.items.length) return void(this.visibleItems = new Array);
            if (1 != this.updatingListBox) {
                var t = this.isTouchDevice(),
                    i = this.vScrollInstance,
                    s = this.hScrollInstance,
                    n = parseInt(i.value),
                    o = parseInt(s.value);
                this.rtl && "hidden" != this.hScrollBar[0].style.visibility && (o = s.max - o);
                var r = (this.items.length, this.host.width(), parseInt(this.content[0].style.width)),
                    a = r + parseInt(s.max),
                    l = parseInt(this.vScrollBar[0].style.width) + 2;
                "hidden" == this.vScrollBar[0].style.visibility && (l = 0), "visible" != this.hScrollBar[0].style.visibility && (a = r);
                var h = (this._getVirtualItemsCount(), new Array),
                    c = 0,
                    u = parseInt(this.element.style.height) + 2; - 1 != this.element.style.height.indexOf("%") && (u = this.host.outerHeight()), isNaN(u) && (u = 0);
                var d = 0,
                    p = 0,
                    f = 0;
                if (0 == i.value || 0 == this.visibleItems.length)
                    for (var m = 0; m < this.items.length; m++) {
                        var g = this.items[m];
                        if (g.visible) {
                            g.top = -n, g.initialTop = -n, !g.isGroup && g.visible && (this.visibleItems[p++] = g, g.visibleIndex = p - 1), this.renderedVisibleItems[f++] = g, g.left = -o;
                            var v = g.top + g.height;
                            v >= 0 && g.top - g.height <= u && (h[c++] = { index: m, item: g }), n -= g.height, n--
                        }
                    }
                var b = n > 0 ? this._searchFirstVisibleIndex(this.vScrollInstance.value, this.renderedVisibleItems) : 0,
                    y = 0;
                c = 0;
                for (var x = this.vScrollInstance.value, w = 0; 100 + u > y;) {
                    var g = this.renderedVisibleItems[b];
                    if (void 0 == g) break;
                    if (g.visible) {
                        g.left = -o;
                        var v = g.top + g.height - x;
                        v >= 0 && g.initialTop - x - g.height <= 2 * u && (h[c++] = { index: b, item: g })
                    }
                    if (b++, g.visible && (y += g.initialTop - x + g.height - y), w++, w > this.items.length - 1) break
                }
                if (!this._renderOnDemand)
                    for (var _ = this.toThemeProperty("jqx-listitem-state-normal") + " " + this.toThemeProperty("jqx-item"), C = this.toThemeProperty("jqx-listitem-state-group"), I = this.toThemeProperty("jqx-listitem-state-disabled") + " " + this.toThemeProperty("jqx-fill-state-disabled"), T = 0, k = this, m = 0; m < this.visualItems.length; m++) {
                        var S = this.visualItems[m],
                            D = function() {
                                var e = S[0].firstChild;
                                if (k.checkboxes && (e = S[0].lastChild), null != e && (e.style.visibility = "hidden", e.className = ""), k.checkboxes) {
                                    var t = S.find(".chkbox");
                                    t.css({ visibility: "hidden" })
                                }
                            };
                        if (m < h.length) {
                            var g = h[m].item;
                            if (g.initialTop - x >= u) { D(); continue }
                            var P = e(S[0].firstChild);
                            if (this.checkboxes && (P = e(S[0].lastChild)), 0 == P.length) continue;
                            if (null == P[0]) continue;
                            P[0].className = "", P[0].style.display = "block", P[0].style.visibility = "inherit";
                            var j = "";
                            if (j = !g.isGroup && !this.selectedIndexes[g.index] >= 0 ? _ : C, (g.disabled || this.disabled) && (j += " " + I), this.roundedcorners && (j += " " + this.toThemeProperty("jqx-rc-all")), t && (j += " " + this.toThemeProperty("jqx-listitem-state-normal-touch")), P[0].className = j, this.renderer)
                                if (g.key || (g.key = this.generatekey()), this._cachedItemHtml || (this._cachedItemHtml = new Array), this._cachedItemHtml[g.key]) P[0].innerHTML != this._cachedItemHtml[g.key] && (P[0].innerHTML = this._cachedItemHtml[g.key]);
                                else {
                                    var E = this.renderer(g.index, g.label, g.value);
                                    P[0].innerHTML = E, this._cachedItemHtml[g.key] = P[0].innerHTML
                                }
                            else {
                                if (-1 !== this.itemHeight) {
                                    var q = 2 + 2 * parseInt(P.css("padding-top"));
                                    P[0].style.lineHeight = g.height - q + "px", P.css("vertical-align", "middle")
                                }
                                null != g.html && g.html.toString().length > 0 ? P[0].innerHTML = g.html : null != g.label || null != g.value ? null != g.label ? (P[0].innerHTML !== g.label && (P[0].innerHTML = g.label), "" == e.trim(g.label) && (P[0].innerHTML = this.emptyString, "" == this.emptyString && (P[0].style.height = g.height - 8 + "px")), this.incrementalSearch || g.disabled || void 0 != this.searchString && "" != this.searchString && (P[0].innerHTML = this._highlight(g.label.toString(), this.searchString))) : null === g.label ? (P[0].innerHTML = this.emptyString, "" == this.emptyString && (P[0].style.height = g.height - 8 + "px")) : P[0].innerHTML !== g.value ? P[0].innerHTML = g.value : "" == g.label && (P[0].innerHTML = " ") : ("" == g.label || null == g.label) && (P[0].innerHTML = "", P[0].style.height = g.height - 8 + "px")
                            }
                            if (S[0].style.left = g.left + "px", S[0].style.top = g.initialTop - x + "px", g.element = P[0], g.title && (P[0].title = g.title), this.equalItemsWidth && !g.isGroup) {
                                if (0 == d) {
                                    var A = parseInt(a),
                                        M = parseInt(P.outerWidth()) - parseInt(P.width());
                                    A -= M;
                                    var H = 1;
                                    H = null != H ? parseInt(H) : 0, A -= 2 * H, d = A, this.checkboxes && "hidden" == this.hScrollBar[0].style.visibility && (d -= 18)
                                }
                                r > this.virtualSize.width ? (P[0].style.width = d + "px", g.width = d) : (P[0].style.width = -4 + this.virtualSize.width + "px", g.width = this.virtualSize.width - 4)
                            } else P.width() < this.host.width() && P.width(this.host.width() - 2);
                            if (this.rtl && (P[0].style.textAlign = "right"), this.autoItemsHeight && (P[0].style.whiteSpace = "pre-line", P.width(d), g.width = d), T = 0, this.checkboxes && !g.isGroup) {
                                0 == T && (T = (g.height - 16) / 2, T++);
                                var O = e(S.children()[0]);
                                O[0].item = g, this.rtl ? "0px" != P[0].style.left && (P[0].style.left = "0px") : "18px" != P[0].style.left && (P[0].style.left = "18px"), this.rtl && O.css("left", 8 + g.width + "px"), O[0].style.top = T + "px", O[0].style.display = "block", O[0].style.visibility = "inherit";
                                var N = g.checked,
                                    $ = g.checked ? " " + this.toThemeProperty("jqx-checkbox-check-checked") : "";
                                O[0].firstChild && O[0].firstChild.firstChild && O[0].firstChild.firstChild.firstChild && O[0].firstChild.firstChild && (N ? O[0].firstChild.firstChild.firstChild.className = $ : N === !1 ? O[0].firstChild.firstChild.firstChild.className = "" : null === N && (O[0].firstChild.firstChild.firstChild.className = this.toThemeProperty("jqx-checkbox-check-indeterminate"))), e.jqx.ariaEnabled && (N ? S[0].setAttribute("aria-selected", !0) : S[0].removeAttribute("aria-selected"))
                            } else if (this.checkboxes) {
                                var O = e(S.children()[0]);
                                O.css({ display: "none", visibility: "inherit" })
                            }!g.disabled && (!this.filterable && this.selectedIndexes[g.visibleIndex] >= 0 || g.selected && this.filterable) ? (P.addClass(this.toThemeProperty("jqx-listitem-state-selected")), P.addClass(this.toThemeProperty("jqx-fill-state-pressed")), e.jqx.ariaEnabled && (S[0].setAttribute("aria-selected", !0), this._activeElement = S[0])) : this.checkboxes || e.jqx.ariaEnabled && S[0].removeAttribute("aria-selected")
                        } else D()
                    }
            }
        },
        generatekey: function() { var e = function() { return (65536 * (1 + Math.random()) | 0).toString(16).substring(1) }; return e() + e() + "-" + e() + "-" + e() + "-" + e() + "-" + e() + e() + e() },
        _calculateVirtualSize: function(t) {
            if (!this._renderOnDemand) {
                var i = 0,
                    s = 2,
                    n = 0,
                    o = document.createElement("span");
                this.equalItemsWidth && e(o).css("float", "left"), o.style.whiteSpace = "pre";
                var r = 0,
                    a = void 0 === t ? this.host.outerHeight() : t + 2;
                document.body.appendChild(o);
                var l = this.items.length,
                    h = this.host.width();
                if (this.autoItemsHeight && (h -= 10, "hidden" != this.vScrollBar.css("visibility") && (h -= 20)), this.autoItemsHeight || this.renderer || this.groups.length >= 1 || l > 0 && null != this.items[0].html && "" != this.items[0].html)
                    for (var n = 0; l > n; n++) {
                        var c = this.items[n];
                        if ((!c.isGroup || "" != c.label || "" != c.html) && c.visible) {
                            var u = "";
                            if (u += c.isGroup ? this.toThemeProperty("jqx-listitem-state-group jqx-rc-all") : this.toThemeProperty("jqx-widget jqx-listitem-state-normal jqx-rc-all"), u += " " + this.toThemeProperty("jqx-fill-state-normal"), this.isTouchDevice() && (u += " " + this.toThemeProperty("jqx-touch")), o.className = u, this.autoItemsHeight) {
                                o.style.whiteSpace = "pre-line";
                                var d = this.checkboxes ? -20 : 0;
                                o.style.width = d + h + "px"
                            }
                            if (this.renderer) {
                                var p = this.renderer(c.index, c.label, c.value);
                                o.innerHTML = p
                            } else null != c.html && c.html.toString().length > 0 ? o.innerHTML = c.html : (null != c.label || null != c.value) && (null != c.label ? (o.innerHTML = c.label, "" == c.label && (o.innerHTML = "Empty")) : o.innerHTML = c.value);
                            var f = o.offsetHeight,
                                m = o.offsetWidth;
                            this.itemHeight > -1 && (f = this.itemHeight), c.height = f, c.width = m, f++, s += f, i = Math.max(i, m), a >= s && r++
                        }
                    } else {
                        for (var s = 0, g = 0, v = "", b = 0, y = 0, x = -1, n = 0; l > n; n++) {
                            var c = this.items[n];
                            if ((!c.isGroup || "" != c.label || "" != c.html) && c.visible) {
                                x++;
                                var u = "";
                                if (0 == x) {
                                    if (u += this.toThemeProperty("jqx-listitem-state-normal jqx-rc-all"), u += " " + this.toThemeProperty("jqx-fill-state-normal"), u += " " + this.toThemeProperty("jqx-widget"), u += " " + this.toThemeProperty("jqx-listbox"), u += " " + this.toThemeProperty("jqx-widget-content"), this.isTouchDevice() && (u += " " + this.toThemeProperty("jqx-touch"), u += " " + this.toThemeProperty("jqx-listitem-state-normal-touch")), o.className = u, this.autoItemsHeight) {
                                        o.style.whiteSpace = "pre-line";
                                        var d = this.checkboxes ? -20 : 0;
                                        o.style.width = d + h + "px"
                                    }
                                    null == c.html || "" == c.label || null == c.label ? o.innerHTML = "Item" : null != c.html && c.html.toString().length > 0 ? o.innerHTML = c.html : (null != c.label || null != c.value) && (null != c.label ? null != c.label.toString().match(new RegExp("\\w")) || null != c.label.toString().match(new RegExp("\\d")) ? o.innerHTML = c.label : o.innerHTML = "Item" : o.innerHTML = c.value);
                                    var f = 1 + o.offsetHeight;
                                    this.itemHeight > -1 && (f = this.itemHeight), g = f
                                }
                                void 0 != b && (y = b), null != c.html && c.html.toString().length > 0 ? (b = Math.max(b, c.html.toString().length), y != b && (v = c.html)) : null != c.label ? (b = Math.max(b, c.label.length), y != b && (v = c.label)) : null != c.value && (b = Math.max(b, c.value.length), y != b && (v = c.value)), c.height = g, s += g, s++, a >= s && r++
                            }
                        }
                        o.innerHTML = v, i = o.offsetWidth
                    }
                return s += 2, 10 > r && (r = 10), this.filterable && (s += this.filterHeight), o.parentNode.removeChild(o), { width: i, height: s, itemsPerPage: r }
            }
        },
        _getVirtualItemsCount: function() { if (0 == this.virtualItemsCount) { var e = parseInt(this.host.height()) / 5; return e > this.items.length && (e = this.items.length), e } return this.virtualItemsCount },
        _addItems: function(t) {
            if (!this._renderOnDemand) {
                var i = this;
                if (1 != i.updatingListBox) {
                    if (void 0 == i.items || 0 == i.items.length) return i.virtualSize = { width: 0, height: 0, itemsPerPage: 0 }, i._updatescrollbars(), i.renderedVisibleItems = new Array, void(i.itemswrapper && i.itemswrapper.children().remove());
                    var s = i.host.height();
                    if (0 == t) {
                        var n = i._calculateVirtualSize(s),
                            o = 2 * n.itemsPerPage;
                        i.autoHeight && (o = i.items.length), i.virtualItemsCount = Math.min(o, i.items.length);
                        n.width;
                        return i.virtualSize = n, void i._updatescrollbars()
                    }
                    var r = this,
                        a = 0;
                    i.visibleItems = new Array, i.renderedVisibleItems = new Array, i._removeHandlers(), i.allowDrag && i._enableDragDrop && (i.itemswrapper = null), null == i.itemswrapper && (i.content[0].innerHTML = "", i.itemswrapper = e('<div style="outline: 0 none; overflow:hidden; width:100%; position: relative;"></div>'), i.itemswrapper[0].style.height = 2 * s + "px", i.content[0].appendChild(i.itemswrapper[0]));
                    var n = i._calculateVirtualSize(s),
                        o = 2 * n.itemsPerPage;
                    i.autoHeight && (o = i.items.length), i.virtualItemsCount = Math.min(o, i.items.length);
                    var i = this;
                    n.width;
                    i.virtualSize = n;
                    var l = Math.max(i.host.width(), 17 + n.width);
                    i.itemswrapper[0].style.width = l + "px";
                    for (var h = 0, c = "", u = e.jqx.browser.msie && e.jqx.browser.version < 9, d = u ? ' unselectable="on"' : "", p = h; p < i.virtualItemsCount; p++) {
                        var f = i.items[p],
                            m = "listitem" + p + i.element.id;
                        if (c += "<div" + d + " role='option' id='" + m + "' class='jqx-listitem-element'>", i.checkboxes) {
                            c += '<div style="background-color: transparent; padding: 0; margin: 0; position: absolute; float: left; width: 16px; height: 16px;" class="chkbox">';
                            var g = '<div class="' + i.toThemeProperty("jqx-checkbox-default") + " " + i.toThemeProperty("jqx-fill-state-normal") + " " + i.toThemeProperty("jqx-rc-all") + '"><div style="cursor: pointer; width: 13px; height: 13px;">',
                                v = f.checked ? " " + i.toThemeProperty("jqx-checkbox-check-checked") : "";
                            g += '<span style="width: 13px; height: 13px;" class="checkBoxCheck' + v + '"></span>', g += "</div></div>", c += g, c += "</div>"
                        }
                        c += "<span" + d + " style='white-space: pre; -ms-touch-action: none;'></span></div>"
                    }
                    r.WinJS ? i.itemswrapper.html(c) : i.itemswrapper[0].innerHTML = c;
                    for (var b = i.itemswrapper.children(), p = h; p < i.virtualItemsCount; p++) {
                        var f = i.items[p],
                            y = e(b[p]);
                        if (i.allowDrag && i._enableDragDrop && y.addClass("draggable"), i.checkboxes) {
                            e(y.children()[0]);
                            y.css("float", "left");
                            var x = e(y[0].firstChild);
                            x.css("float", "left")
                        }
                        y[0].style.height = f.height + "px", y[0].style.top = a + "px", a += f.height + 1, i.visualItems[p] = y
                    }
                    if (i._addHandlers(), i._updatescrollbars(), i.autoItemsHeight) {
                        var n = i._calculateVirtualSize(s),
                            o = 2 * n.itemsPerPage;
                        i.autoHeight && (o = i.items.length), i.virtualItemsCount = Math.min(o, i.items.length);
                        var i = this;
                        n.width;
                        i.virtualSize = n, i._updatescrollbars()
                    }
                    e.jqx.browser.msie && e.jqx.browser.version < 8 && (i.host.attr("hideFocus", !0), i.host.find("div").attr("hideFocus", !0))
                }
            }
        },
        _updatescrollbars: function() {
            var t = this;
            if (t.virtualSize) {
                var i = t.virtualSize.height,
                    s = t.virtualSize.width,
                    n = t.vScrollInstance,
                    o = t.hScrollInstance;
                t._arrange(!1);
                var r = !1,
                    a = t.host.outerWidth(),
                    l = t.host.outerHeight(),
                    h = 0;
                if (s > a && (h = t.hScrollBar.outerHeight() + 2), i + h > l) {
                    var c = n.max;
                    n.max = 2 + parseInt(i) + h - parseInt(l - 2), "inherit" != t.vScrollBar[0].style.visibility && (t.vScrollBar[0].style.visibility = "inherit", r = !0), c != n.max && n._arrange()
                } else "hidden" != t.vScrollBar[0].style.visibility && (t.vScrollBar[0].style.visibility = "hidden", r = !0, n.setPosition(0));
                var u = 0;
                "hidden" != t.vScrollBar[0].style.visibility && (u = t.scrollBarSize + 6);
                var d = t.checkboxes ? 20 : 0;
                if (t.autoItemsHeight) t.hScrollBar[0].style.visibility = "hidden";
                else if (s >= a - u - d) { var p = o.max; "inherit" == t.vScrollBar[0].style.visibility ? o.max = d + u + parseInt(s) - t.host.width() + 4 : o.max = d + parseInt(s) - t.host.width() + 6, "inherit" != t.hScrollBar[0].style.visibility && (t.hScrollBar[0].style.visibility = "inherit", r = !0), p != o.max && o._arrange(), "inherit" == t.vScrollBar[0].style.visibility && (n.max = 2 + parseInt(i) + t.hScrollBar.outerHeight() + 2 - parseInt(t.host.height())) } else "hidden" != t.hScrollBar[0].style.visibility && (t.hScrollBar[0].style.visibility = "hidden", r = !0);
                o.setPosition(0), r && t._arrange(), t.itemswrapper && (t.itemswrapper[0].style.width = Math.max(0, Math.max(a - 2, 17 + s)) + "px", t.itemswrapper[0].style.height = Math.max(0, 2 * l) + "px");
                var f = t.isTouchDevice();
                f && ("visible" != t.vScrollBar.css("visibility") && "visible" != t.hScrollBar.css("visibility") ? e.jqx.mobile.setTouchScroll(!1, t.element.id) : e.jqx.mobile.setTouchScroll(!0, t.element.id))
            }
        },
        clear: function() { this.source = null, this.clearSelection(), this.refresh() },
        clearSelection: function(e) {
            for (var t = 0; t < this.selectedIndexes.length; t++) this.selectedIndexes[t] && -1 != this.selectedIndexes[t] && this._raiseEvent("1", { index: t, type: "api", item: this.getVisibleItem(t), originalEvent: null }), this.selectedIndexes[t] = -1;
            this.selectedIndex = -1, this.selectedValue = null, this.selectedValues = new Array, 0 != e && this._renderItems()
        },
        unselectIndex: function(e, t) {
            if (!isNaN(e)) {
                this.selectedIndexes[e] = -1;
                for (var i = !1, s = 0; s < this.selectedIndexes.length; s++) { var n = this.selectedIndexes[s]; - 1 != n && void 0 != n && (i = !0) }
                if (!i) {
                    this.selectedValue = null, this.selectedIndex = -1;
                    var o = this.getVisibleItem(e);
                    o && this.selectedValues[o.value] && (this.selectedValues[o.value] = null)
                }(void 0 == t || 1 == t) && (this._renderItems(), this._raiseEvent("1", { index: e, type: "api", item: this.getVisibleItem(e), originalEvent: null })), this._updateInputSelection(), this._raiseEvent("2", { index: e, type: "api", item: this.getItem(e) })
            }
        },
        getInfo: function() {
            var e = this,
                t = this.getItems(),
                i = this.getVisibleItems(),
                s = function() {
                    var t = e.vScrollInstance.value;
                    e.filterable && (t -= e.filterHeight);
                    for (var s = new Array, n = 0; n < i.length; n++) {
                        var o = i[n];
                        if (o) {
                            var r = o.initialTop,
                                a = o.height,
                                l = !0;
                            (0 > r + a - t || r - t >= e.host.height()) && (l = !1), l && s.push(o)
                        }
                    }
                    return s
                }();
            return { items: t, visibleItems: i, viewItems: s }
        },
        getItem: function(t) {
            if (-1 == t || isNaN(t) || "string" == typeof t) return -1 === t ? null : this.getItemByValue(t);
            var i = null;
            e.each(this.items, function() { return this.index == t ? (i = this, !1) : void 0 });
            return i
        },
        getVisibleItem: function(e) { return -1 == e || isNaN(e) || "string" == typeof e ? -1 === e ? null : this.getItemByValue(e) : this.visibleItems[e] },
        getVisibleItems: function() { return this.visibleItems },
        checkIndex: function(t, i, s) {
            if (this.checkboxes && !isNaN(t) && !(0 > t || t >= this.visibleItems.length || null != this.visibleItems[t] && this.visibleItems[t].disabled || this.disabled)) {
                var n = this.getItem(t);
                if (this.groups.length > 0 || this.filterable) var n = this.getVisibleItem(t);
                if (null != n) {
                    e(n.checkBoxElement);
                    n.checked = !0, (void 0 == i || 1 == i) && this._updateCheckedItems()
                }(void 0 == s || 1 == s) && this._raiseEvent(3, { label: n.label, value: n.value, checked: !0, item: n })
            }
        },
        getCheckedItems: function() { if (!this.checkboxes) return null; var t = new Array; if (void 0 != this.items) return e.each(this.items, function() { this.checked && (t[t.length] = this) }), t },
        checkAll: function(t) {
            if (this.checkboxes && !this.disabled) {
                var i = this;
                e.each(this.items, function() {
                    var e = this;
                    t !== !1 && e.checked !== !0 && i._raiseEvent(3, { label: e.label, value: e.value, checked: !0, item: e }), this.checked = !0
                }), this._updateCheckedItems()
            }
        },
        uncheckAll: function(t) {
            if (this.checkboxes && !this.disabled) {
                var i = this;
                e.each(this.items, function() {
                    var e = this;
                    t !== !1 && e.checked !== !1 && (this.checked = !1, i._raiseEvent(3, { label: e.label, value: e.value, checked: !1, item: e })), this.checked = !1
                }), this._updateCheckedItems()
            }
        },
        uncheckIndex: function(t, i, s) {
            if (this.checkboxes && !isNaN(t) && !(0 > t || t >= this.visibleItems.length || null != this.visibleItems[t] && this.visibleItems[t].disabled || this.disabled)) {
                var n = this.getItem(t);
                if (this.groups.length > 0 || this.filterable) var n = this.getVisibleItem(t);
                if (null != n) {
                    e(n.checkBoxElement);
                    n.checked = !1, (void 0 == i || 1 == i) && this._updateCheckedItems()
                }(void 0 == s || 1 == s) && this._raiseEvent(3, { label: n.label, value: n.value, checked: !1, item: n })
            }
        },
        indeterminateIndex: function(t, i, s) {
            if (this.checkboxes && !isNaN(t) && !(0 > t || t >= this.visibleItems.length || null != this.visibleItems[t] && this.visibleItems[t].disabled || this.disabled)) {
                var n = this.getItem(t);
                if (this.groups.length > 0 || this.filterable) var n = this.getVisibleItem(t);
                if (null != n) {
                    e(n.checkBoxElement);
                    n.checked = null, (void 0 == i || 1 == i) && this._updateCheckedItems()
                }(void 0 == s || 1 == s) && this._raiseEvent(3, { checked: null })
            }
        },
        getSelectedIndex: function() { return this.selectedIndex },
        getSelectedItems: function() {
            var e = this.getVisibleItems(),
                t = this.selectedIndexes,
                i = [];
            for (var s in t) - 1 != t[s] && (i[i.length] = e[s]);
            return i
        },
        getSelectedItem: function() { var e = this.getSelectedItems(); return e && e.length > 0 ? e[0] : null },
        _updateCheckedItems: function() {
            var t = this.selectedIndex;
            this.clearSelection(!1);
            this.getCheckedItems();
            this.selectedIndex = t, this._renderItems();
            var i = e.data(this.element, "hoveredItem");
            null != i && (e(i).addClass(this.toThemeProperty("jqx-listitem-state-hover")), e(i).addClass(this.toThemeProperty("jqx-fill-state-hover"))), this._updateInputSelection()
        },
        getItemByValue: function(t) {
            if (null != this.visibleItems) {
                if (t && t.value && (t = t.value), this.itemsByValue) return this.itemsByValue[e.trim(t).split(" ").join("?")];
                for (var i = this.visibleItems, s = 0; s < i.length; s++)
                    if (i[s].value == t) return i[s]
            }
        },
        checkItem: function(e) { if (null != e) { var t = this._getItemByParam(e); return this.checkIndex(t.visibleIndex, !0) } return !1 },
        uncheckItem: function(e) { if (null != e) { var t = this._getItemByParam(e); return this.uncheckIndex(t.visibleIndex, !0) } return !1 },
        indeterminateItem: function(e) { if (null != e) { var t = this._getItemByParam(e); return this.indeterminateIndex(t.visibleIndex, !0) } return !1 },
        val: function(e) {
            if (this.input) {
                var t = function(t) {
                    for (var i in t)
                        if (t.hasOwnProperty(i)) return !1;
                    return "number" == typeof e ? !1 : "date" == typeof e ? !1 : "boolean" == typeof e ? !1 : "string" == typeof e ? !1 : !0
                };
                if (t(e) || 0 == arguments.length) return this.input.val();
                var i = this.getItemByValue(e);
                return null != i && this.selectItem(i), this.input ? this.input.val() : void 0
            }
        },
        selectItem: function(e) {
            if (null != e) {
                if (void 0 == e.index) {
                    var t = this.getItemByValue(e);
                    t && (e = t)
                }
                return this.selectIndex(e.visibleIndex, !0)
            }
            return this.clearSelection(), !1
        },
        unselectItem: function(e) {
            if (null != e) {
                if (void 0 == e.index) {
                    var t = this.getItemByValue(e);
                    t && (e = t)
                }
                return this.unselectIndex(e.visibleIndex, !0)
            }
            return !1
        },
        selectIndex: function(e, t, i, s, n, o) {
            if (!isNaN(e)) {
                var r = this.selectedIndex;
                if (this.filterable && (this.selectedIndex = -1), !(-1 > e || e >= this.visibleItems.length || null != this.visibleItems[e] && this.visibleItems[e].disabled || this.disabled)) {
                    if (!(this.multiple || this.multipleextended || this.selectedIndex != e || s || this.checkboxes)) return void(this.visibleItems && this.items && this.visibleItems.length != this.items.length && (l = this.getVisibleItem(e), l && (this.selectedValue = l.value, this.selectedValues[l.value] = l.value)));
                    if (this.checkboxes) {
                        this._updateCheckedItems();
                        var a = r;
                        this.selectedIndex != e || this.multiple || (a = -1), void 0 == n && (n = "none");
                        var l = this.getItem(e),
                            h = this.getItem(a);
                        return this.visibleItems && this.items && this.visibleItems.length != this.items.length && (l = this.getVisibleItem(e), h = this.getVisibleItem(a)), this._raiseEvent("1", { index: a, type: n, item: h, originalEvent: o }), this.selectedIndex = e, this.selectedIndexes[a] = -1, this.selectedIndexes[e] = e, l && (this.selectedValue = l.value, this.selectedValues[l.value] = l.value), this._raiseEvent("0", { index: e, type: n, item: l, originalEvent: o }), void this._renderItems()
                    }
                    this.focused = !0;
                    var c = !1;
                    this.selectedIndex != e && (c = !0);
                    var a = r;
                    this.selectedIndex != e || this.multiple || (a = -1), void 0 == n && (n = "none");
                    var l = this.getItem(e),
                        h = this.getItem(a);
                    if (this.visibleItems && this.items && this.visibleItems.length != this.items.length && (l = this.getVisibleItem(e), h = this.getVisibleItem(a)), void 0 != s && s) this._raiseEvent("1", { index: a, type: n, item: h, originalEvent: o }), this.selectedIndex = e, this.selectedIndexes[a] = -1, this.selectedIndexes[e] = e, l && (this.selectedValue = l.value, this.selectedValues[l.value] = l.value), this._raiseEvent("0", { index: e, type: n, item: l, originalEvent: o });
                    else {
                        var u = this,
                            d = function(e, t, i, s, n, o) { u._raiseEvent("1", { index: t, type: i, item: s, originalEvent: o }), u.selectedIndex = e, u.selectedIndexes = [], t = e, u.selectedIndexes[e] = e, u.selectedValues = new Array, n && (u.selectedValues[n.value] = n.value), u._raiseEvent("0", { index: e, type: i, item: n, originalEvent: o }) },
                            p = function(e, t, i, s, n, o) { void 0 == u.selectedIndexes[e] || -1 == u.selectedIndexes[e] ? (u.selectedIndexes[e] = e, u.selectedIndex = e, n && (u.selectedValues[n.value] = n.value, u._raiseEvent("0", { index: e, type: i, item: n, originalEvent: o }))) : (t = u.selectedIndexes[e], s = u.getVisibleItem(t), s && (u.selectedValues[s.value] = null), u.selectedIndexes[e] = -1, u.selectedIndex = -1, u._raiseEvent("1", { index: t, type: i, item: s, originalEvent: o })) };
                        if (this.multipleextended)
                            if (this._shiftKey || this._ctrlKey) {
                                if (this._ctrlKey) "keyboard" == n && (this.clearSelection(!1), u._clickedIndex = e), p(e, a, n, h, l, o);
                                else if (this._shiftKey) {
                                    void 0 == u._clickedIndex && (u._clickedIndex = a);
                                    var f = Math.min(u._clickedIndex, e),
                                        m = Math.max(u._clickedIndex, e);
                                    this.clearSelection(!1);
                                    for (var g = f; m >= g; g++) u.selectedIndexes[g] = g, u.selectedValues[u.getVisibleItem(g).value] = u.getVisibleItem(g).value, u._raiseEvent("0", { index: g, type: n, item: this.getVisibleItem(g), originalEvent: o });
                                    "keyboard" != n ? u.selectedIndex = u._clickedIndex : u.selectedIndex = e
                                }
                            } else "keyboard" != n && "mouse" != n ? (p(e, a, n, h, l, o), u._clickedIndex = e) : (this.clearSelection(!1), u._clickedIndex = e, d(e, a, n, h, l, o));
                        else this.multiple ? p(e, a, n, h, l, o) : (l && (this.selectedValue = l.value), d(e, a, n, h, l, o))
                    }
                    return (void 0 == i || 1 == i) && this._renderItems(), void 0 != t && null != t && 1 == t && this.ensureVisible(e), this._raiseEvent("2", { index: e, item: l, oldItem: h, type: n, originalEvent: o }), this._updateInputSelection(), c
                }
            }
        },
        _updateInputSelection: function() {
            this._syncSelection();
            var t = new Array;
            if (this.input && (-1 == this.selectedIndex ? this.input.val("") : this.items && void 0 != this.items[this.selectedIndex] && (this.input.val(this.items[this.selectedIndex].value), t.push(this.items[this.selectedIndex].value)), this.multiple || this.multipleextended || this.checkboxes)) {
                var i = this.checkboxes ? this.getCheckedItems() : this.getSelectedItems(),
                    s = "";
                if (i) {
                    for (var n = 0; n < i.length; n++) void 0 != i[n] && (s += n == i.length - 1 ? i[n].value : i[n].value + ",", t.push(i[n].value));
                    this.input.val(s)
                }
            }
            this.field && this.input && ("select" == this.field.nodeName.toLowerCase() ? e.each(this.field, function(i, s) { e(this).removeAttr("selected"), this.selected = t.indexOf(this.value) >= 0, this.selected && e(this).attr("selected", !0) }) : e.each(this.items, function(i, s) {
                e(this.originalItem.originalItem).removeAttr("data-selected"), this.selected = t.indexOf(this.value) >= 0, this.selected && e(this.originalItem.originalItem).attr("data-selected", !0)
            }))
        },
        isIndexInView: function(e) {
            if (isNaN(e)) return !1;
            if (!this.items) return !1;
            if (0 > e || e >= this.items.length) return !1;
            var t = this.vScrollInstance.value,
                i = 0;
            this.filterable && (i = this.filterHeight);
            var s = this.visibleItems[e];
            if (void 0 == s) return !0;
            var n = s.initialTop,
                o = s.height;
            return i > n - t || n - t + i + o >= this.host.outerHeight() ? !1 : !0
        },
        _itemsInPage: function() {
            var t = 0,
                i = this;
            return this.items && e.each(this.items, function() { return this.initialTop + this.height >= i.content.height() ? !1 : void t++ }), t
        },
        _firstItemIndex: function() { return null != this.visibleItems ? this.visibleItems[0] && this.visibleItems[0].isGroup ? this._nextItemIndex(0) : 0 : -1 },
        _lastItemIndex: function() { return null != this.visibleItems ? this.visibleItems[this.visibleItems.length - 1] && this.visibleItems[this.visibleItems.length - 1].isGroup ? this._prevItemIndex(this.visibleItems.length - 1) : this.visibleItems.length - 1 : -1 },
        _nextItemIndex: function(e) {
            for (indx = e + 1; indx < this.visibleItems.length; indx++)
                if (this.visibleItems[indx] && !this.visibleItems[indx].disabled && !this.visibleItems[indx].isGroup) return indx;
            return -1
        },
        _prevItemIndex: function(e) {
            for (indx = e - 1; indx >= 0; indx--)
                if (this.visibleItems[indx] && !this.visibleItems[indx].disabled && !this.visibleItems[indx].isGroup) return indx;
            return -1
        },
        clearFilter: function() { this.filterInput.val(""), this._updateItemsVisibility("") },
        _search: function(e) {
            var t = this,
                i = t.filterInput.val();
            return 9 != e.keyCode && "none" != t.searchMode && null != t.searchMode && "undefined" != t.searchMode && 16 != e.keyCode && 17 != e.keyCode && 20 != e.keyCode ? 37 == e.keyCode || 39 == e.keyCode ? !1 : void(e.altKey || 18 == e.keyCode || e.keyCode >= 33 && e.keyCode <= 40 || (e.ctrlKey || e.metaKey || t.ctrlKey) && 88 != e.keyCode && 86 != e.keyCode || i !== t.searchString && t._updateItemsVisibility(i)) : void 0
        },
        _updateItemsVisibility: function(t) {
            var i = this.getItems();
            if (void 0 == i) return { index: -1, matchItem: new Array };
            var s = this,
                n = -1,
                o = new Array,
                r = 0;
            e.each(i, function(i) {
                var a = "";
                if (!this.isGroup) {
                    a = this.searchLabel ? this.searchLabel : this.label ? this.label : this.value ? this.value : this.title ? this.title : "jqxItem", a = a.toString();
                    var l = !1;
                    switch (s.searchMode) {
                        case "containsignorecase":
                            l = e.jqx.string.containsIgnoreCase(a, t);
                            break;
                        case "contains":
                            l = e.jqx.string.contains(a, t);
                            break;
                        case "equals":
                            l = e.jqx.string.equals(a, t);
                            break;
                        case "equalsignorecase":
                            l = e.jqx.string.equalsIgnoreCase(a, t);
                            break;
                        case "startswith":
                            l = e.jqx.string.startsWith(a, t);
                            break;
                        case "startswithignorecase":
                            l = e.jqx.string.startsWithIgnoreCase(a, t);
                            break;
                        case "endswith":
                            l = e.jqx.string.endsWith(a, t);
                            break;
                        case "endswithignorecase":
                            l = e.jqx.string.endsWithIgnoreCase(a, t)
                    }
                    l || (this.visible = !1), l && (o[r++] = this, this.visible = !0, n = this.visibleIndex), "" == t && (this.visible = !0, l = !1)
                }
            }), s.renderedVisibleItems = new Array, s.visibleItems = new Array, s.vScrollInstance.setPosition(0, !0), s._addItems(!1), s._renderItems();
            for (var a = 0; a < s.items.length; a++) s.selectedIndexes[a] = -1;
            s.selectedIndex = -1;
            for (var l in s.selectedValues) {
                var t = s.selectedValues[l],
                    h = s.getItemByValue(t);
                h && h.visible && (s.selectedIndex = h.visibleIndex, s.selectedIndexes[h.visibleIndex] = h.visibleIndex)
            }
            s._syncSelection(), s.filterChange && s.filterChange(t)
        },
        _getMatches: function(t, i) {
            if (void 0 == t || 0 == t.length) return -1;
            void 0 == i && (i = 0);
            var s = this.getItems(),
                n = this,
                o = -1;
            return e.each(s, function(s) {
                var r = "";
                if (!this.isGroup) {
                    r = this.searchLabel ? this.searchLabel.toString() : this.label ? this.label.toString() : this.value ? this.value.toString() : this.title ? this.title.toString() : "jqxItem";
                    var a = !1;
                    switch (n.searchMode) {
                        case "containsignorecase":
                            a = e.jqx.string.containsIgnoreCase(r, t);
                            break;
                        case "contains":
                            a = e.jqx.string.contains(r, t);
                            break;
                        case "equals":
                            a = e.jqx.string.equals(r, t);
                            break;
                        case "equalsignorecase":
                            a = e.jqx.string.equalsIgnoreCase(r, t);
                            break;
                        case "startswith":
                            a = e.jqx.string.startsWith(r, t);
                            break;
                        case "startswithignorecase":
                            a = e.jqx.string.startsWithIgnoreCase(r, t);
                            break;
                        case "endswith":
                            a = e.jqx.string.endsWith(r, t);
                            break;
                        case "endswithignorecase":
                            a = e.jqx.string.endsWithIgnoreCase(r, t)
                    }
                    if (a && this.visibleIndex >= i) return o = this.visibleIndex, !1
                }
            }), o
        },
        findItems: function(t) {
            var i = this.getItems(),
                s = this,
                n = 0,
                o = new Array;
            return e.each(i, function(i) {
                var r = "";
                if (!this.isGroup) {
                    r = this.label ? this.label : this.value ? this.value : this.title ? this.title : "jqxItem";
                    var a = !1;
                    switch (s.searchMode) {
                        case "containsignorecase":
                            a = e.jqx.string.containsIgnoreCase(r, t);
                            break;
                        case "contains":
                            a = e.jqx.string.contains(r, t);
                            break;
                        case "equals":
                            a = e.jqx.string.equals(r, t);
                            break;
                        case "equalsignorecase":
                            a = e.jqx.string.equalsIgnoreCase(r, t);
                            break;
                        case "startswith":
                            a = e.jqx.string.startsWith(r, t);
                            break;
                        case "startswithignorecase":
                            a = e.jqx.string.startsWithIgnoreCase(r, t);
                            break;
                        case "endswith":
                            a = e.jqx.string.endsWith(r, t);
                            break;
                        case "endswithignorecase":
                            a = e.jqx.string.endsWithIgnoreCase(r, t)
                    }
                    a && (o[n++] = this)
                }
            }), o
        },
        _syncSelection: function() {
            var e = this;
            if (e.filterable) {
                if (e.items)
                    for (var t = 0; t < e.items.length; t++) {
                        var i = e.items[t];
                        i.selected = !1
                    }
                for (var t = 0; t < e.visibleItems.length; t++) {
                    var i = e.visibleItems[t];
                    e.selectedIndexes && e.selectedIndexes[t] == i.visibleIndex && (i.selected = !0)
                }
                e.itemswrapper && e._renderItems()
            }
        },
        _handleKeyDown: function(e) {
            var t = e.keyCode,
                i = this,
                s = i.selectedIndex,
                n = i.selectedIndex;
            if (this.keyboardNavigation && this.enableSelection && (!this.filterInput || e.target != this.filterInput[0])) {
                var o = function() {
                    (i.multiple || i.checkboxes) && i.clearSelection(!1)
                };
                if (e.altKey && (t = -1), 32 == t && this.checkboxes) { var r = this.getItem(s); return null != r && (i._updateItemCheck(r, s), e.preventDefault()), i._searchString = "", i.selectIndex(r.visibleIndex, !1, !0, !0, "keyboard", e), void i._renderItems() }
                if (i.incrementalSearch) {
                    var a = -1;
                    i._searchString || (i._searchString = ""), (8 == t || 46 == t) && i._searchString.length >= 1 && (i._searchString = i._searchString.substr(0, i._searchString.length - 1));
                    var l = String.fromCharCode(t),
                        h = !isNaN(parseInt(l)),
                        c = !1;
                    if (t >= 65 && 97 >= t || h || 8 == t || 32 == t || 46 == t) {
                        e.shiftKey || (l = l.toLocaleLowerCase());
                        var u = 1 + i.selectedIndex;
                        8 != t && 32 != t && 46 != t && (i._searchString.length > 0 && i._searchString.substr(0, 1) == l ? (u = 1 + i.selectedIndex, i._searchString += l) : i._searchString += l), 32 == t && (i._searchString += " ");
                        var d = this._getMatches(i._searchString, u);
                        if (a = d, a == i._lastMatchIndex || -1 == a) {
                            var d = this._getMatches(i._searchString, 0);
                            a = d
                        }
                        if (i._lastMatchIndex = a, a >= 0) {
                            var p = function() {
                                o(), i.selectIndex(a, !1, !1, !1, "keyboard", e);
                                var t = i.isIndexInView(a);
                                t ? i._renderItems() : i.ensureVisible(a)
                            };
                            i._toSelectTimer && clearTimeout(i._toSelectTimer), i._toSelectTimer = setTimeout(function() { p() }, i.incrementalSearchKeyDownDelay)
                        }
                        c = !0
                    }
                    if (void 0 != i._searchTimer && clearTimeout(i._searchTimer), (27 == t || 13 == t) && (i._searchString = ""), i._searchTimer = setTimeout(function() { i._searchString = "", i._renderItems() }, i.incrementalSearchDelay), a >= 0) return;
                    if (c) return !1
                }
                if (33 == t) {
                    var f = i._itemsInPage();
                    i.selectedIndex - f >= 0 ? (o(), i.selectIndex(n - f, !1, !1, !1, "keyboard", e)) : (o(), i.selectIndex(i._firstItemIndex(), !1, !1, !1, "keyboard", e)), i._searchString = ""
                }
                if (32 == t && this.checkboxes) {
                    var r = this.getItem(s);
                    null != r && (i._updateItemCheck(r, s), e.preventDefault()), i._searchString = ""
                }
                if (36 == t && (o(), i.selectIndex(i._firstItemIndex(), !1, !1, !1, "keyboard", e), i._searchString = ""), 35 == t && (o(), i.selectIndex(i._lastItemIndex(), !1, !1, !1, "keyboard", e), i._searchString = ""), 34 == t) {
                    var f = i._itemsInPage();
                    i.selectedIndex + f < i.visibleItems.length ? (o(), i.selectIndex(n + f, !1, !1, !1, "keyboard", e)) : (o(), i.selectIndex(i._lastItemIndex(), !1, !1, !1, "keyboard", e)), i._searchString = ""
                }
                if (38 == t) {
                    if (i._searchString = "", !(i.selectedIndex > 0)) return !1;
                    var m = i._prevItemIndex(i.selectedIndex);
                    if (m == i.selectedIndex || -1 == m) return !0;
                    o(), i.selectIndex(m, !1, !1, !1, "keyboard", e)
                } else if (40 == t) {
                    if (i._searchString = "", !(i.selectedIndex + 1 < i.visibleItems.length)) return !1;
                    var m = i._nextItemIndex(i.selectedIndex);
                    if (m == i.selectedIndex || -1 == m) return !0;
                    o(), i.selectIndex(m, !1, !1, !1, "keyboard", e)
                }
                if (35 == t || 36 == t || 38 == t || 40 == t || 34 == t || 33 == t) { var g = i.isIndexInView(i.selectedIndex); return g ? i._renderItems() : i.ensureVisible(i.selectedIndex), !1 }
                return !0
            }
        },
        _updateItemCheck: function(e, t) {
            if (!this.disabled) switch (1 == e.checked ? e.checked = e.hasThreeStates && this.hasThreeStates ? null : !1 : e.checked = null != e.checked, e.checked) {
                case !0:
                    this.checkIndex(t);
                    break;
                case !1:
                    this.uncheckIndex(t);
                    break;
                default:
                    this.indeterminateIndex(t)
            }
        },
        wheel: function(e, t) {
            if (t.autoHeight || !t.enableMouseWheel) return e.returnValue = !0, !0;
            if (t.disabled) return !0;
            var i = 0;
            if (e || (e = window.event), e.originalEvent && e.originalEvent.wheelDelta && (e.wheelDelta = e.originalEvent.wheelDelta), e.wheelDelta ? i = e.wheelDelta / 120 : e.detail && (i = -e.detail / 3), i) { var s = t._handleDelta(i); return s && (e.preventDefault && e.preventDefault(), null != e.originalEvent && (e.originalEvent.mouseHandled = !0), void 0 != e.stopPropagation && e.stopPropagation()), s ? (s = !1, e.returnValue = s, s) : !1 }
            e.preventDefault && e.preventDefault(), e.returnValue = !1
        },
        _handleDelta: function(e) {
            var t = this.vScrollInstance.value;
            0 > e ? this.scrollDown() : this.scrollUp();
            var i = this.vScrollInstance.value;
            return t != i ? !0 : !1
        },
        focus: function() {
            try {
                this.focused = !0, this.host.focus();
                var e = this;
                setTimeout(function() { e.host.focus() }, 25)
            } catch (t) {}
        },
        _removeHandlers: function() { this.removeHandler(e(document), "keydown.listbox" + this.element.id), this.removeHandler(e(document), "keyup.listbox" + this.element.id), this.removeHandler(this.vScrollBar, "valueChanged"), this.removeHandler(this.hScrollBar, "valueChanged"), this._mousewheelfunc ? this.removeHandler(this.host, "mousewheel", this._mousewheelfunc) : this.removeHandler(this.host, "mousewheel"), this.removeHandler(this.host, "keydown"), this.removeHandler(this.content, "mouseleave"), this.removeHandler(this.content, "focus"), this.removeHandler(this.content, "blur"), this.removeHandler(this.host, "focus"), this.removeHandler(this.host, "blur"), this.removeHandler(this.content, "mouseenter"), this.removeHandler(this.content, "mouseup"), this.removeHandler(this.content, "mousedown"), this.removeHandler(this.content, "touchend"), this._mousemovefunc ? this.removeHandler(this.content, "mousemove", this._mousemovefunc) : this.removeHandler(this.content, "mousemove"), this.removeHandler(this.content, "selectstart"), this.overlayContent && this.removeHandler(this.overlayContent, e.jqx.mobile.getTouchEventName("touchend")) },
        _updateSize: function() {
            this.virtualSize || (this._oldheight = null, this.virtualSize = this._calculateVirtualSize());
            var e = this;
            if (e._arrange(), e.host.height() != e._oldheight || e.host.width() != e._oldwidth) {
                e.host.width() != e._oldwidth;
                if (e.autoItemsHeight) e._render(!1);
                else if (e.items)
                    if (e.items.length > 0 && e.virtualItemsCount * e.items[0].height < e._oldheight - 2) e._render(!1);
                    else {
                        var t = e.vScrollInstance.value;
                        e._updatescrollbars(), e._renderItems(), t < e.vScrollInstance.max ? e.vScrollInstance.setPosition(t) : e.vScrollInstance.setPosition(e.vScrollInstance.max)
                    }
                e._oldwidth = e.host.width(), e._oldheight = e.host.height()
            }
        },
        _addHandlers: function() {
            var t = this;
            this.focused = !1;
            var i = (new Date, this.isTouchDevice());
            this.addHandler(this.vScrollBar, "valueChanged", function(i) { e.jqx.browser.msie && e.jqx.browser.version > 9 ? setTimeout(function() { t._renderItems() }, 1) : t._renderItems() }), this.addHandler(this.hScrollBar, "valueChanged", function() { t._renderItems() }), this._mousewheelfunc && this.removeHandler(this.host, "mousewheel", this._mousewheelfunc), this._mousewheelfunc = function(e) { t.wheel(e, t) }, this.addHandler(this.host, "mousewheel", this._mousewheelfunc), this.addHandler(e(document), "keydown.listbox" + this.element.id, function(e) { t._ctrlKey = e.ctrlKey || e.metaKey, t._shiftKey = e.shiftKey }), this.addHandler(e(document), "keyup.listbox" + this.element.id, function(e) { t._ctrlKey = e.ctrlKey || e.metaKey, t._shiftKey = e.shiftKey }), this.addHandler(this.host, "keydown", function(e) { return t._handleKeyDown(e) }), this.addHandler(this.content, "mouseleave", function(i) {
                t.focused = !1;
                var s = e.data(t.element, "hoveredItem");
                null != s && (e(s).removeClass(t.toThemeProperty("jqx-listitem-state-hover")), e(s).removeClass(t.toThemeProperty("jqx-fill-state-hover")), e.data(t.element, "hoveredItem", null))
            }), this.addHandler(this.content, "focus", function(e) { t.disabled || (t.host.addClass(t.toThemeProperty("jqx-fill-state-focus")), t.focused = !0) }), this.addHandler(this.content, "blur", function(e) { t.focused = !1, t.host.removeClass(t.toThemeProperty("jqx-fill-state-focus")) }), this.addHandler(this.host, "focus", function(e) { t.disabled || (t.host.addClass(t.toThemeProperty("jqx-fill-state-focus")), t.focused = !0) }), this.addHandler(this.host, "blur", function(i) { e.jqx.browser.msie && e.jqx.browser.version < 9 && t.focused || (t.host.removeClass(t.toThemeProperty("jqx-fill-state-focus")), t.focused = !1) }), this.addHandler(this.content, "mouseenter", function(e) { t.focused = !0 });
            var s = e.jqx.utilities.hasTransform(this.host);
            if (this.enableSelection) {
                var n = t.isTouchDevice() && this.touchMode !== !0,
                    o = n ? "touchend" : "mousedown";
                if (this.overlayContent) this.addHandler(this.overlayContent, e.jqx.mobile.getTouchEventName("touchend"), function(i) {
                    if (!t.enableSelection) return !0;
                    if (n && (t._newScroll = new Date, t._newScroll - t._lastScroll < 500)) return !0;
                    var s = e.jqx.mobile.getTouches(i),
                        o = s[0];
                    if (void 0 != o) {
                        var r = t.host.offset(),
                            a = parseInt(o.pageX),
                            l = parseInt(o.pageY);
                        1 == t.touchMode && void 0 != o._pageX && (a = parseInt(o._pageX), l = parseInt(o._pageY)), a -= r.left, l -= r.top;
                        var h = t._hitTest(a, l);
                        if (null != h && !h.isGroup) {
                            if (t._newScroll = new Date, t._newScroll - t._lastScroll < 500) return !1;
                            if (t.checkboxes) return void t._updateItemCheck(h, h.visibleIndex);
                            if (-1 == h.html.indexOf("href")) return t.selectIndex(h.visibleIndex, !1, !0, !1, "mouse", i), i.preventDefault && i.preventDefault(), t.content.trigger("click"), !1;
                            setTimeout(function() { return t.selectIndex(h.visibleIndex, !1, !0, !1, "mouse", i), t.content.trigger("click"), !1 }, 100)
                        }
                    }
                });
                else {
                    var r = !1;
                    this.addHandler(this.content, o, function(i) {
                        if (!t.enableSelection) return !0;
                        if (r = !0, n && (t._newScroll = new Date, t._newScroll - t._lastScroll < 500)) return !1;
                        if (t.focused = !0, !t.isTouchDevice() && t.focusable && t.host.focus(), i.target.id != "listBoxContent" + t.element.id && t.itemswrapper[0] != i.target) {
                            var a = i.target,
                                l = e(a).offset(),
                                h = t.host.offset();
                            if (s) {
                                var c = e.jqx.mobile.getLeftPos(a),
                                    u = e.jqx.mobile.getTopPos(a);
                                l.left = c, l.top = u, c = e.jqx.mobile.getLeftPos(t.element), u = e.jqx.mobile.getTopPos(t.element), h.left = c, h.top = u
                            }
                            var d = parseInt(l.top) - parseInt(h.top),
                                p = parseInt(l.left) - parseInt(h.left),
                                f = t._hitTest(p, d);
                            if (null != f && !f.isGroup) {
                                var m = function(e, i) {
                                    if (t._shiftKey || (t._clickedIndex = e.visibleIndex), t.checkboxes)
                                        if (p = 20 + i.pageX - l.left, t.rtl) {
                                            "hidden" != t.hScrollBar.css("visibility") ? t.hScrollInstance.max : t.host.width();
                                            p <= t.host.width() - 20 && (t.allowDrag ? setTimeout(function() { t._dragItem || r || (t._updateItemCheck(e, e.visibleIndex), t.selectIndex(e.visibleIndex, !1, !0, !1, "mouse", i)) }, 200) : (t._updateItemCheck(e, e.visibleIndex), t.selectIndex(e.visibleIndex, !1, !0, !1, "mouse", i)))
                                        } else p + t.hScrollInstance.value >= 20 && (t.allowDrag ? setTimeout(function() { t._dragItem || r || (t._updateItemCheck(e, e.visibleIndex), t.selectIndex(e.visibleIndex, !1, !0, !1, "mouse", i)) }, 200) : (t._updateItemCheck(e, e.visibleIndex), t.selectIndex(e.visibleIndex, !1, !0, !1, "mouse", i)));
                                    else t.selectIndex(e.visibleIndex, !1, !0, !1, "mouse", i)
                                };
                                f.disabled || (-1 != f.html.indexOf("href") ? setTimeout(function() { m(f, i) }, 100) : m(f, i))
                            }
                            if ("mousedown" == o) { var g = !1; return i.which ? g = 3 == i.which : i.button && (g = 2 == i.button), g ? !0 : !1 }
                        }
                        return !0
                    })
                }
                this.addHandler(this.content, "mouseup", function(e) { t.vScrollInstance.handlemouseup(t, e), r = !1 }), e.jqx.browser.msie && this.addHandler(this.content, "selectstart", function(e) { return !1 })
            }
            var i = this.isTouchDevice();
            this.enableHover && !i && (this._mousemovefunc = function(n) {
                if (i) return !0;
                if (!t.enableHover) return !0;
                1 == e.jqx.browser.msie && e.jqx.browser.version < 9 ? 0 : 1;
                if (null == n.target) return !0;
                if (t.disabled) return !0;
                t.focused = !0;
                var o = t.vScrollInstance.isScrolling();
                if (!o && n.target.id != "listBoxContent" + t.element.id && t.itemswrapper[0] != n.target) {
                    var r = n.target,
                        a = e(r).offset(),
                        l = t.host.offset();
                    if (s) {
                        var h = e.jqx.mobile.getLeftPos(r),
                            c = e.jqx.mobile.getTopPos(r);
                        a.left = h, a.top = c, h = e.jqx.mobile.getLeftPos(t.element), c = e.jqx.mobile.getTopPos(t.element), l.left = h, l.top = c
                    }
                    var u = parseInt(a.top) - parseInt(l.top),
                        d = parseInt(a.left) - parseInt(l.left),
                        p = t._hitTest(d, u);
                    if (null != p && !p.isGroup && !p.disabled) {
                        var f = e.data(t.element, "hoveredItem");
                        null != f && (e(f).removeClass(t.toThemeProperty("jqx-listitem-state-hover")), e(f).removeClass(t.toThemeProperty("jqx-fill-state-hover"))), e.data(t.element, "hoveredItem", p.element);
                        var m = e(p.element);
                        m.addClass(t.toThemeProperty("jqx-listitem-state-hover")), m.addClass(t.toThemeProperty("jqx-fill-state-hover"))
                    }
                }
            }, this.addHandler(this.content, "mousemove", this._mousemovefunc))
        },
        _arrange: function(e) {
            void 0 == e && (e = !0);
            var t = this,
                i = null,
                s = null,
                n = t.filterable ? t.filterHeight : 0,
                o = function(e) { return e = t.host.height(), 0 == e && (e = 200, t.host.height(e)), e };
            null != t.width && -1 != t.width.toString().indexOf("px") ? i = t.width : void 0 == t.width || isNaN(t.width) || (i = t.width), null != t.height && -1 != t.height.toString().indexOf("px") ? s = t.height : void 0 == t.height || isNaN(t.height) || (s = t.height), null != t.width && -1 != t.width.toString().indexOf("%") && (t.host.css("width", t.width), i = t.host.width()), null != t.height && -1 != t.height.toString().indexOf("%") && (t.host.css("height", t.height), s = o(s)), null != i && (i = parseInt(i), parseInt(t.element.style.width) != parseInt(t.width) && t.host.width(t.width)), t.autoHeight ? t.virtualSize && ("hidden" != t.hScrollBar.css("visibility") ? (t.host.height(t.virtualSize.height + parseInt(t.scrollBarSize) + 3), t.height = t.virtualSize.height + parseInt(t.scrollBarSize) + 3, s = t.height) : (t.host.height(t.virtualSize.height), t.height = t.virtualSize.height, s = t.virtualSize.height)) : null != s && (s = parseInt(s), parseInt(t.element.style.height) != parseInt(t.height) && (t.host.height(t.height), o(s)));
            var r = t.scrollBarSize;
            isNaN(r) && (r = parseInt(r), isNaN(r) ? r = "17px" : r += "px"), r = parseInt(r);
            var a = 4,
                l = 2,
                h = 1;
            if (t.vScrollBar && ("hidden" != t.vScrollBar[0].style.visibility ? h = r + a : t.vScrollInstance.setPosition(0), 0 == r && (h = 1, l = 1), t.hScrollBar)) {
                "hidden" != t.hScrollBar[0].style.visibility ? l = r + a : t.hScrollInstance.setPosition(0), t.autoItemsHeight && (t.hScrollBar[0].style.visibility = "hidden", l = 0), null == s && (s = 0);
                var c = parseInt(s) - a - r;
                0 > c && (c = 0), parseInt(t.hScrollBar[0].style.height) != r && (parseInt(r) < 0 && (r = 0), t.hScrollBar[0].style.height = parseInt(r) + "px"), t.hScrollBar[0].style.top != c + "px" && (t.hScrollBar[0].style.top = c + "px", t.hScrollBar[0].style.left = "0px");
                var u = i - r - a;
                0 > u && (u = 0);
                var d = u + "px";
                if (t.hScrollBar[0].style.width != d && (t.hScrollBar[0].style.width = d), 1 >= h && i >= 2 && (t.hScrollBar[0].style.width = parseInt(i - 2) + "px"), r != parseInt(t.vScrollBar[0].style.width) && (t.vScrollBar[0].style.width = parseInt(r) + "px"), parseInt(s) - l != parseInt(t.vScrollBar[0].style.height)) {
                    var p = parseInt(s) - l;
                    0 > p && (p = 0), t.vScrollBar[0].style.height = p + "px"
                }
                null == i && (i = 0);
                var f = parseInt(i) - parseInt(r) - a + "px";
                f != t.vScrollBar[0].style.left && (parseInt(f) >= 0 && (t.vScrollBar[0].style.left = f), t.vScrollBar[0].style.top = "0px");
                var m = t.vScrollInstance;
                m.disabled = t.disabled, e && m._arrange();
                var g = t.hScrollInstance;
                if (g.disabled = t.disabled, e && g._arrange(), "hidden" != t.vScrollBar[0].style.visibility && "hidden" != t.hScrollBar[0].style.visibility ? (t.bottomRight[0].style.visibility = "inherit", t.bottomRight[0].style.left = 1 + parseInt(t.vScrollBar[0].style.left) + "px", t.bottomRight[0].style.top = 1 + parseInt(t.hScrollBar[0].style.top) + "px", t.rtl && t.bottomRight.css({ left: 0 }), t.bottomRight[0].style.width = parseInt(r) + 3 + "px", t.bottomRight[0].style.height = parseInt(r) + 3 + "px") : t.bottomRight[0].style.visibility = "hidden", parseInt(t.content[0].style.width) != parseInt(i) - h) {
                    var v = parseInt(i) - h;
                    0 > v && (v = 0), t.content[0].style.width = v + "px"
                }
                if (t.rtl && (t.vScrollBar.css({ left: "0px", top: "0px" }), t.hScrollBar.css({ left: t.vScrollBar.width() + 2 + "px" }), "hidden" != t.vScrollBar[0].style.visibility ? t.content.css("margin-left", 4 + t.vScrollBar.width()) : (t.content.css("margin-left", 0), t.hScrollBar.css({ left: "0px" })), t.filterable && t.filterInput && t.filterInput.css({ left: t.vScrollBar.width() + 6 + "px" })), parseInt(t.content[0].style.height) != parseInt(s) - l) {
                    var b = parseInt(s) - l;
                    0 > b && (b = 0), t.content[0].style.height = b + "px", t.content[0].style.top = "0px"
                }
                n > 0 && (t.content[0].style.top = n + "px", t.content[0].style.height = parseInt(t.content[0].style.height) - n + "px"), t.filterable ? (t.filterInput[0].style.height = n - 6 + "px", t.filterInput[0].style.top = "3px", t.rtl || (t.filterInput[0].style.left = parseInt(t.content.css("left")) + 3 + "px"), t.filterInput[0].style.width = parseInt(t.content.css("width")) - 7 + "px", t.filter[0].style.display = "block") : t.filter[0].style.display = "none", t.overlayContent && (t.overlayContent.width(parseInt(i) - h), t.overlayContent.height(parseInt(s) - l))
            }
        },
        ensureVisible: function(t, i) {
            if (isNaN(t)) {
                var s = this.getItemByValue(t);
                s && (t = s.index)
            }
            var n = this.isIndexInView(t);
            if (n) {
                if (i)
                    for (indx = 0; indx < this.visibleItems.length; indx++) {
                        var s = this.visibleItems[indx];
                        if (s.visibleIndex == t && !s.isGroup) {
                            var o = this.vScrollInstance.value,
                                r = s.initialTop;
                            this.filterable && (r = this.filterHeight + 2 + s.initialTop), o + this.host.height() < this.vScrollInstance.max && this.vScrollInstance.setPosition(r)
                        }
                    }
            } else {
                if (0 > t) return;
                if (this.autoHeight) {
                    var a = e.data(this.vScrollBar[0], "jqxScrollBar").instance;
                    a.setPosition(0)
                } else
                    for (indx = 0; indx < this.visibleItems.length; indx++) {
                        var s = this.visibleItems[indx];
                        if (s.visibleIndex == t && !s.isGroup) {
                            var a = e.data(this.vScrollBar[0], "jqxScrollBar").instance,
                                o = a.value,
                                l = this.filterable ? this.filterHeight + 2 : 0,
                                h = "hidden" === this.hScrollBar.css("visibility"),
                                c = h ? 0 : this.scrollBarSize + 4;
                            if (s.initialTop < o) a.setPosition(s.initialTop), 0 == indx && a.setPosition(0);
                            else if (s.initialTop + s.height > o + this.host.height() - l) {
                                var u = this.host.height();
                                if (this.filterable ? a.setPosition(this.filterHeight + 2 + s.initialTop + s.height + 2 - u + c) : (a.setPosition(s.initialTop + s.height + 2 - u + c), indx === this.visibleItems.length - 1 && a.setPosition(a.max)), i) {
                                    var o = a.value,
                                        r = s.initialTop;
                                    this.filterable && (r = this.filterHeight + 2 + s.initialTop), o + u < a.max && a.setPosition(r)
                                }
                            }
                            break
                        }
                    }
            }
            this._renderItems()
        },
        scrollTo: function(e, t) { "hidden" != this.vScrollBar.css("visibility") && this.vScrollInstance.setPosition(t), "hidden" != this.hScrollBar.css("visibility") && this.hScrollInstance.setPosition(e) },
        scrollDown: function() { if ("hidden" == this.vScrollBar.css("visibility")) return !1; var e = this.vScrollInstance; return e.value + e.largestep <= e.max ? (e.setPosition(e.value + e.largestep), !0) : (e.setPosition(e.max), !0) },
        scrollUp: function() { if ("hidden" == this.vScrollBar.css("visibility")) return !1; var e = this.vScrollInstance; return e.value - e.largestep >= e.min ? (e.setPosition(e.value - e.largestep), !0) : e.value != e.min ? (e.setPosition(e.min), !0) : !1 },
        databind: function(t, i) {
            this.records = new Array;
            var s = t._source ? !0 : !1,
                n = new e.jqx.dataAdapter(t, { autoBind: !1 });
            s && (n = t, t = t._source);
            var o = function(e) { void 0 != t.type && (n._options.type = t.type), void 0 != t.formatdata && (n._options.formatData = t.formatdata), void 0 != t.contenttype && (n._options.contentType = t.contenttype), void 0 != t.async && (n._options.async = t.async) },
                r = function(t, i) {
                    var s = function(i) {
                        var s = null;
                        if ("string" == typeof i) var n = i,
                            o = i,
                            r = "";
                        else if (void 0 != t.displayMember && "" != t.displayMember) var o = i[t.valueMember],
                            n = i[t.displayMember];
                        var r = "";
                        if (t.groupMember ? r = i[t.groupMember] : i && void 0 != i.group && (r = i.group), t.searchMember ? s = i[t.searchMember] : i && void 0 != i.searchLabel && (s = i.searchLabel), t.valueMember || t.displayMember || "string" == e.type(i) && (n = o = i.toString()), i && void 0 != i.label) var n = i.label;
                        if (i && void 0 != i.value) var o = i.value;
                        var a = !1;
                        i && void 0 != i.checked && (a = i.checked);
                        var l = "";
                        i && void 0 != i.html && (l = i.html);
                        var h = !0;
                        i && void 0 != i.visible && (h = i.visible);
                        var c = !1;
                        i && void 0 != i.disabled && (c = i.disabled);
                        var u = !1;
                        i && void 0 != i.hasThreeStates && (u = i.hasThreeStates);
                        var d = {};
                        return d.label = n, d.value = o, d.searchLabel = s, d.html = l, d.visible = h, d.originalItem = i, d.group = r, d.groupHtml = "", d.disabled = c, d.checked = a, d.hasThreeStates = u, d
                    };
                    if (void 0 != i) {
                        var o = n._changedrecords[0];
                        if (o) return void e.each(n._changedrecords, function() {
                            var e = this.index,
                                n = this.record;
                            if ("remove" != i) var o = s(n);
                            switch (i) {
                                case "update":
                                    t.updateAt(o, e);
                                    break;
                                case "add":
                                    t.insertAt(o, e);
                                    break;
                                case "remove":
                                    t.removeAt(e)
                            }
                        })
                    }
                    t.records = n.records;
                    for (var r = t.records.length, a = new Array, l = 0; r > l; l++) {
                        var h = t.records[l],
                            c = s(h);
                        c.index = l, a[l] = c
                    }
                    t.items = t.loadItems(a, !0), t._render(), t._raiseEvent("6")
                };
            o(this);
            var a = this;
            switch (t.datatype) {
                case "local":
                case "array":
                default:
                    (null != t.localdata || e.isArray(t)) && (n.unbindBindingUpdate(this.element.id), (this.autoBind || !this.autoBind && !i) && n.dataBind(), r(this), n.bindBindingUpdate(this.element.id, function(e) { r(a, e) }));
                    break;
                case "json":
                case "jsonp":
                case "xml":
                case "xhtml":
                case "script":
                case "text":
                case "csv":
                case "tab":
                    if (null != t.localdata) return n.unbindBindingUpdate(this.element.id), (this.autoBind || !this.autoBind && !i) && n.dataBind(), r(this), void n.bindBindingUpdate(this.element.id, function() { r(a) });
                    var l = {};
                    n._options.data ? e.extend(n._options.data, l) : (t.data && e.extend(l, t.data), n._options.data = l);
                    var h = function() { r(a) };
                    n.unbindDownloadComplete(a.element.id), n.bindDownloadComplete(a.element.id, h), (this.autoBind || !this.autoBind && !i) && n.dataBind()
            }
        },
        loadItems: function(t, i) {
            if (null == t) return this.groups = new Array, this.items = new Array, void(this.visualItems = new Array);
            var s = this,
                n = 0,
                o = 0,
                r = 0;
            this.groups = new Array, this.items = new Array, this.visualItems = new Array;
            var a = new Array;
            this.itemsByValue = new Array, e.map(t, function(t) {
                if (void 0 == t) return null;
                var l = new e.jqx._jqxListBox.item,
                    h = t.group,
                    c = t.groupHtml,
                    u = t.title,
                    d = null;
                if (s.searchMember ? d = t[s.searchMember] : t && void 0 != t.searchLabel && (d = t.searchLabel), (null == u || void 0 == u) && (u = ""), (null == h || void 0 == h) && (h = ""), s.groupMember && (h = t[s.groupMember]), (null == c || void 0 == c) && (c = ""), !s.groups[h]) {
                    s.groups[h] = { items: new Array, index: -1, caption: h, captionHtml: c }, n++;
                    var p = n + "jqxGroup";
                    s.groups[p] = s.groups[h], o++, s.groups.length = o
                }
                var f = s.groups[h];
                return f.index++, f.items[f.index] = l, "string" == typeof t ? (l.label = t, l.value = t, arguments.length > 1 && arguments[1] && "string" == e.type(arguments[1]) && (l.label = t, l.value = arguments[1])) : null == t.label && null == t.value && null == t.html && null == t.group && null == t.groupHtml ? (l.label = t.toString(), l.value = t.toString()) : (l.label = t.label, l.value = t.value, void 0 === l.label && (l.label = t.value), void 0 === l.value && (l.value = t.label)), "string" != typeof t && (void 0 === t.label && "" != s.displayMember && (void 0 != t[s.displayMember] ? l.label = t[s.displayMember] : l.label = ""), void 0 === t.value && "" != s.valueMember && (l.value = t[s.valueMember])), l.hasThreeStates = void 0 != t.hasThreeStates ? t.hasThreeStates : !0, l.originalItem = t, i && (l.originalItem = t.originalItem), l.title = u, u && void 0 === l.value && void 0 === l.label && (l.value = l.label = u), l.html = t.html || "", t.html && "" != t.html, l.group = h, l.checked = t.checked || !1, l.groupHtml = t.groupHtml || "", l.disabled = t.disabled || !1, l.visible = void 0 != t.visible ? t.visible : !0, l.searchLabel = d, l.index = r, a[r] = l, r++, l
            });
            var l = new Array,
                h = 0;
            if (void 0 == this.fromSelect || 0 == this.fromSelect)
                for (var c = 0; o > c; c++) {
                    var n = c + 1,
                        u = n + "jqxGroup",
                        d = this.groups[u];
                    if (void 0 == d || null == d) break;
                    if (0 == c && "" == d.caption && "" == d.captionHtml && 1 >= o) {
                        for (var p = 0; p < d.items.length; p++) {
                            var f = d.items[p].value;
                            (void 0 == d.items[p].value || null == d.items[p].value) && (f = p), this.itemsByValue[e.trim(f).split(" ").join("?")] = d.items[p]
                        }
                        return d.items
                    }
                    var m = new e.jqx._jqxListBox.item;
                    m.isGroup = !0, m.label = d.caption, "" == d.caption && "" == d.captionHtml && (d.caption = this.emptyGroupText, m.label = d.caption), m.html = d.captionHtml, l[h] = m, h++;
                    for (var g = 0; g < d.items.length; g++) {
                        l[h] = d.items[g];
                        var f = d.items[g].value;
                        ("" == d.items[g].value || null == d.items[g].value) && (f = h), s.itemsByValue[e.trim(f).split(" ").join("?")] = d.items[g], h++
                    }
                } else {
                    var h = 0,
                        v = new Array;
                    e.each(a, function() {
                        if (!v[this.group] && "" != this.group) {
                            var t = new e.jqx._jqxListBox.item;
                            t.isGroup = !0, t.label = this.group, l[h] = t, h++, v[this.group] = !0
                        }
                        l[h] = this;
                        var i = this.value;
                        ("" == this.value || null == this.value) && (i = h - 1), s.itemsByValue[e.trim(i).split(" ").join("?")] = this, h++
                    })
                }
            return l
        },
        _mapItem: function(t) { var i = new e.jqx._jqxListBox.item; return this.displayMember && (void 0 == t.label && (t.label = t[this.displayMember]), void 0 == t.value && (t.value = t[this.valueMember])), "string" == typeof t ? (i.label = t, i.value = t) : "number" == typeof t ? (i.label = t.toString(), i.value = t.toString()) : (i.label = void 0 !== t.label ? t.label : t.value, i.value = void 0 !== t.value ? t.value : t.label), void 0 == i.label && void 0 == i.value && void 0 == i.html && (i.label = i.value = t), i.html = t.html || "", i.group = t.group || "", i.checked = t.checked || !1, i.title = t.title || "", i.groupHtml = t.groupHtml || "", i.disabled = t.disabled || !1, i.visible = t.visible || !0, i },
        addItem: function(e) { return this.insertAt(e, this.items ? this.items.length : 0) },
        _getItemByParam: function(e) {
            if (null != e && void 0 == e.index) {
                var t = this.getItemByValue(e);
                t && (e = t)
            }
            return e
        },
        insertItem: function(e, t) { var i = this._getItemByParam(e); return this.insertAt(i, t) },
        updateItem: function(e, t) { var i = this._getItemByParam(t); return i && void 0 != i.index ? this.updateAt(e, i.index) : !1 },
        updateAt: function(t, i) {
            if (null != t) {
                var s = this._mapItem(t);
                this.itemsByValue[e.trim(s.value).split(" ").join("?")] = this.items[i], this.items[i].value = s.value, this.items[i].label = s.label, this.items[i].html = s.html, this.items[i].disabled = s.disabled
            }
            this._cachedItemHtml = [], this._renderItems(), this.rendered && this.rendered()
        },
        insertAt: function(t, i) {
            if (null == t) return !1;
            if (this._cachedItemHtml = [], void 0 == this.items || 0 == this.items.length) {
                this.source = new Array, this.refresh();
                var s = this._mapItem(t);
                s.index = 0, this.items[this.items.length] = s, this._addItems(!0), this._renderItems(), this.rendered && this.rendered(), this.allowDrag && this._enableDragDrop && this._enableDragDrop();
                var n = s.value;
                return ("" == s.value || null == s.value) && (n = i), this.itemsByValue[e.trim(n).split(" ").join("?")] = s, !1
            }
            var s = this._mapItem(t);
            if (-1 == i || void 0 == i || null == i || i >= this.items.length) s.index = this.items.length, this.items[this.items.length] = s;
            else {
                for (var o = new Array, r = 0, a = !1, l = 0, h = 0; h < this.items.length; h++) 0 == this.items[h].isGroup && l >= i && !a && (o[r++] = s, s.index = i, l++, a = !0), o[r] = this.items[h], this.items[h].isGroup || (o[r].index = l, l++), r++;
                this.items = o
            }
            var n = s.value;
            ("" == s.value || null == s.value) && (n = i), this.itemsByValue[e.trim(n).split(" ").join("?")] = s, this.visibleItems = new Array, this.renderedVisibleItems = new Array;
            var c = e.data(this.vScrollBar[0], "jqxScrollBar").instance,
                u = c.value;
            return c.setPosition(0), this.allowDrag && this._enableDragDrop || this.virtualSize && this.virtualSize.height < 10 + this.host.height() ? this._addItems(!0) : this._addItems(!1), this.groups.length > 1, this._renderItems(), this.allowDrag && this._enableDragDrop && this._enableDragDrop(), c.setPosition(u), this.rendered && this.rendered(), !0
        },
        removeAt: function(t) {
            if (0 > t || t > this.items.length - 1) return !1;
            if (void 0 == t) return !1;
            var i = this.items[t].height,
                s = this.items[t].value;
            if (("" == s || null == s) && (s = t), this.itemsByValue[e.trim(s).split(" ").join("?")] = null, this.groups.length > 1) {
                for (var n = new Array, o = 0; o < this.items.length; o++) this.items[o].isGroup || n.push({ item: this.items[o], key: o });
                if (!n[t]) return !1;
                this.items.splice(n[t].key, 1)
            } else this.items.splice(t, 1);
            for (var r = new Array, a = 0, l = 0, o = 0; o < this.items.length; o++) r[a] = this.items[o], this.items[o].isGroup || (r[a].index = l, l++), a++;
            this.items = r;
            var h = e.data(this.vScrollBar[0], "jqxScrollBar").instance,
                h = e.data(this.vScrollBar[0], "jqxScrollBar").instance,
                c = h.value;
            if (h.setPosition(0), this.visibleItems = new Array, this.renderedVisibleItems = new Array, this.items.length > 0) {
                if (this.virtualSize) {
                    this.virtualSize.height -= i;
                    var u = 2 * this.virtualSize.itemsPerPage;
                    this.autoHeight && (u = this.items.length), this.virtualItemsCount = Math.min(u, this.items.length)
                }
                this._updatescrollbars()
            } else this._addItems();
            this._renderItems(), this.allowDrag && this._enableDragDrop && this._enableDragDrop(), "hidden" != this.vScrollBar.css("visibility") ? h.setPosition(c) : h.setPosition(0), this.itemsByValue = new Array;
            for (var d = 0; d < this.items.length; d++) {
                var s = this.items[d].value;
                ("" == this.items[d].value || null == this.items[d].value) && (s = d), this.itemsByValue[e.trim(s).split(" ").join("?")] = this.items[d]
            }
            return this.rendered && this.rendered(), !0
        },
        removeItem: function(e, t) {
            var i = this._getItemByParam(e),
                s = -1;
            if (i && void 0 != i.index && t !== !0) {
                for (var n = 0; n < this.items.length; n++)
                    if (this.items[n].label == i.label && this.items[n].value == i.value) { s = n; break }
                if (-1 != s) return this.removeAt(s)
            }
            return -1 == s ? this.removeAt(i.index) : void 0
        },
        getItems: function() {
            return this.items;
        },
        disableItem: function(e) {
            var t = this._getItemByParam(e);
            this.disableAt(t.index)
        },
        enableItem: function(e) {
            var t = this._getItemByParam(e);
            this.enableAt(t.index)
        },
        disableAt: function(e) { return this.items ? 0 > e || e > this.items.length - 1 ? !1 : (this.items[e].disabled = !0, this._renderItems(), !0) : !1 },
        enableAt: function(e) { return this.items ? 0 > e || e > this.items.length - 1 ? !1 : (this.items[e].disabled = !1, this._renderItems(), !0) : !1 },
        destroy: function() {
            this.source && this.source.unbindBindingUpdate && this.source.unbindBindingUpdate(this.element.id), this._removeHandlers(), this.vScrollBar.jqxScrollBar("destroy"), this.hScrollBar.jqxScrollBar("destroy"), this.vScrollBar.remove(), this.hScrollBar.remove(), this.content.remove(), e.jqx.utilities.resize(this.host, null, !0);
            var t = e.data(this.element, "jqxListBox");
            delete this.hScrollInstance, delete this.vScrollInstance, delete this.vScrollBar, delete this.hScrollBar, delete this.content, delete this.bottomRight, delete this.itemswrapper, delete this.visualItems, delete this.visibleItems, delete this.items, delete this.groups, delete this.renderedVisibleItems, delete this._mousewheelfunc, delete this._mousemovefunc, delete this._cachedItemHtml, delete this.itemsByValue, delete this._activeElement, delete this.source, delete this.events, this.input && (this.input.remove(), delete this.input), t && delete t.instance, this.host.removeData(), this.host.removeClass(), this.host.remove(), this.element = null, delete this.element, this.host = null, delete this.set, delete this.get, delete this.call, delete this.host
        },
        _raiseEvent: function(t, i) {
            if (1 == this._stopEvents) return !0;
            void 0 == i && (i = { owner: null });
            var s = this.events[t];
            args = i, args.owner = this, this._updateInputSelection();
            var n = new e.Event(s);
            if (n.owner = this, n.args = args, null != this.host) var o = this.host.trigger(n);
            return o
        }
    })
}(jqxBaseFramework),
function(e) {
    e.jqx.parseSourceTag = function(t) {
        var i = new Array,
            s = e(t).find("option"),
            n = e(t).find("optgroup"),
            o = !1;
        0 === s.length && (s = e(t).find("li"), s.length > 0 && (o = !0));
        var r = null,
            r = -1,
            a = new Array;
        if (e.each(s, function(t) {
                var s = n.find(this).length > 0,
                    l = null;
                null == this.text || null != this.label && "" != this.label || (this.label = this.text), o === !0 && (this.label = e(this).text(), this.selected = e(this).attr("data-selected"), this.checked = this.selected, this.value = e(this).attr("data-value") || t, this.disabled = e(this).attr("disabled"));
                var h = { style: this.style.cssText, selected: this.selected, html: this.innerHTML, classes: this.className, disabled: this.disabled, value: this.value, label: this.label, title: this.title, originalItem: this },
                    c = e.jqx.browser.msie && e.jqx.browser.version < 8;
                c && !o && "" == h.value && null != this.text && this.text.length > 0 && (h.value = this.text), s && (l = n.find(this).parent()[0].label, h.group = l, a[l] || (a[l] = new Array, a.length++), a[l].push(h)), this.selected && (r = t), h.checked = this.selected, void 0 !== h.label && i.push(h)
            }), a.length > 0) {
            var l = new Array;
            for (var h in a)
                if ("indexOf" !== h) {
                    for (var c = null, u = 0; u < n.length; u++)
                        if (h === n[u].label || n[u].text) { c = n[u]; break }
                    e.each(a[h], function(e, t) { void 0 !== this.label && l.push(this) })
                }
        }
        return l && l.length > 0 ? { items: l, index: r } : { items: i, index: r }
    }, e.jqx._jqxListBox.item = function() { var e = { group: "", groupHtml: "", selected: !1, isGroup: !1, highlighted: !1, value: null, label: "", html: null, visible: !0, disabled: !1, element: null, width: null, height: null, initialTop: null, top: null, left: null, title: "", index: -1, checkBoxElement: null, originalItem: null, checked: !1, visibleIndex: -1 }; return e }
}(jqxBaseFramework), $(document).ready(function() { $(".cmpr").attr("hidden", "true"), getVersion() });