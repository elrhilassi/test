!function(e, t, n, r) {
    t[e] = n.call(t);
    for (var o = 0; o < r.length; o++)
        r[o](t[e]);
    "undefined" != typeof module && module.exports ? module.exports = t[e] : "function" == typeof define && define.amd && define(function() {
        return t[e]
    })
}("Primus", this || {}, function() {
    return function r(o, i, s) {
        function c(t, e) {
            if (!i[t]) {
                if (!o[t]) {
                    var n = "function" == typeof require && require;
                    if (!e && n)
                        return n(t, !0);
                    if (a)
                        return a(t, !0);
                    throw (e = new Error("Cannot find module '" + t + "'")).code = "MODULE_NOT_FOUND",
                    e
                }
                n = i[t] = {
                    exports: {}
                },
                o[t][0].call(n.exports, function(e) {
                    return c(o[t][1][e] || e)
                }, n, n.exports, r, o, i, s)
            }
            return i[t].exports
        }
        for (var a = "function" == typeof require && require, e = 0; e < s.length; e++)
            c(s[e]);
        return c
    }({
        1: [function(e, t, n) {
            "use strict";
            t.exports = function(r, i) {
                var s = /[, ]+/;
                function o(e, t) {
                    if (i[e]) {
                        if ("string" == typeof i[e] && (i[e] = i[e].split(s)),
                        "function" == typeof i[e])
                            return i[e].call(t);
                        for (var n, r, o = 0; o < i[e].length; o++)
                            "function" == (n = typeof (r = i[e][o])) ? r.call(t) : "string" == n && "function" == typeof t[r] && t[r]()
                    }
                }
                return i = i || {},
                "string" == typeof (r = r || []) && (r = r.split(s)),
                function() {
                    var e, t = this, n = 0;
                    if (null === t[r[0]])
                        return !1;
                    for (o("before", t); n < r.length; n++)
                        t[e = r[n]] && ("function" == typeof t[e].destroy && t[e].destroy(),
                        t[e] = null);
                    return t.emit && t.emit("destroy"),
                    o("after", t),
                    !0
                }
            }
        }
        , {}],
        2: [function(e, t, n) {
            "use strict";
            t.exports = function() {
                for (var r, o = this, e = 0, t = arguments.length, i = new Array(t); e < t; e++)
                    i[e] = arguments[e];
                return "function" != typeof i[i.length - 1] ? function() {
                    for (var e = 0, t = arguments.length, n = new Array(t); e < t; e++)
                        n[e] = arguments[e];
                    return o.emit.apply(o, i.concat(n))
                }
                : (r = i.pop(),
                function() {
                    for (var e = 0, t = arguments.length, n = new Array(t + 1); e < t; e++)
                        n[e + 1] = arguments[e];
                    return n[0] = function(e, t) {
                        if (e)
                            return o.emit("error", e);
                        n = void 0 === t ? n.slice(1) : null === t ? [] : t,
                        o.emit.apply(o, i.concat(n))
                    }
                    ,
                    r.apply(o, n),
                    !0
                }
                )
            }
        }
        , {}],
        3: [function(e, t, n) {
            "use strict";
            var r = Object.prototype.hasOwnProperty
              , h = "~";
            function o() {}
            function i(e, t, n) {
                this.fn = e,
                this.context = t,
                this.once = n || !1
            }
            function s(e, t, n, r, o) {
                if ("function" != typeof n)
                    throw new TypeError("The listener must be a function");
                n = new i(n,r || e,o),
                r = h ? h + t : t;
                return e._events[r] ? e._events[r].fn ? e._events[r] = [e._events[r], n] : e._events[r].push(n) : (e._events[r] = n,
                e._eventsCount++),
                e
            }
            function a(e, t) {
                0 == --e._eventsCount ? e._events = new o : delete e._events[t]
            }
            function c() {
                this._events = new o,
                this._eventsCount = 0
            }
            Object.create && (o.prototype = Object.create(null),
            (new o).__proto__ || (h = !1)),
            c.prototype.eventNames = function() {
                var e, t, n = [];
                if (0 === this._eventsCount)
                    return n;
                for (t in e = this._events)
                    r.call(e, t) && n.push(h ? t.slice(1) : t);
                return Object.getOwnPropertySymbols ? n.concat(Object.getOwnPropertySymbols(e)) : n
            }
            ,
            c.prototype.listeners = function(e) {
                var e = h ? h + e : e
                  , t = this._events[e];
                if (!t)
                    return [];
                if (t.fn)
                    return [t.fn];
                for (var n = 0, r = t.length, o = new Array(r); n < r; n++)
                    o[n] = t[n].fn;
                return o
            }
            ,
            c.prototype.listenerCount = function(e) {
                e = h ? h + e : e,
                e = this._events[e];
                return e ? e.fn ? 1 : e.length : 0
            }
            ,
            c.prototype.emit = function(e, t, n, r, o, i) {
                var s = h ? h + e : e;
                if (!this._events[s])
                    return !1;
                var c, a = this._events[s], u = arguments.length;
                if (a.fn) {
                    switch (a.once && this.removeListener(e, a.fn, void 0, !0),
                    u) {
                    case 1:
                        return a.fn.call(a.context),
                        !0;
                    case 2:
                        return a.fn.call(a.context, t),
                        !0;
                    case 3:
                        return a.fn.call(a.context, t, n),
                        !0;
                    case 4:
                        return a.fn.call(a.context, t, n, r),
                        !0;
                    case 5:
                        return a.fn.call(a.context, t, n, r, o),
                        !0;
                    case 6:
                        return a.fn.call(a.context, t, n, r, o, i),
                        !0
                    }
                    for (p = 1,
                    c = new Array(u - 1); p < u; p++)
                        c[p - 1] = arguments[p];
                    a.fn.apply(a.context, c)
                } else
                    for (var f, l = a.length, p = 0; p < l; p++)
                        switch (a[p].once && this.removeListener(e, a[p].fn, void 0, !0),
                        u) {
                        case 1:
                            a[p].fn.call(a[p].context);
                            break;
                        case 2:
                            a[p].fn.call(a[p].context, t);
                            break;
                        case 3:
                            a[p].fn.call(a[p].context, t, n);
                            break;
                        case 4:
                            a[p].fn.call(a[p].context, t, n, r);
                            break;
                        default:
                            if (!c)
                                for (f = 1,
                                c = new Array(u - 1); f < u; f++)
                                    c[f - 1] = arguments[f];
                            a[p].fn.apply(a[p].context, c)
                        }
                return !0
            }
            ,
            c.prototype.on = function(e, t, n) {
                return s(this, e, t, n, !1)
            }
            ,
            c.prototype.once = function(e, t, n) {
                return s(this, e, t, n, !0)
            }
            ,
            c.prototype.removeListener = function(e, t, n, r) {
                e = h ? h + e : e;
                if (this._events[e])
                    if (t) {
                        var o = this._events[e];
                        if (o.fn)
                            o.fn !== t || r && !o.once || n && o.context !== n || a(this, e);
                        else {
                            for (var i = 0, s = [], c = o.length; i < c; i++)
                                (o[i].fn !== t || r && !o[i].once || n && o[i].context !== n) && s.push(o[i]);
                            s.length ? this._events[e] = 1 === s.length ? s[0] : s : a(this, e)
                        }
                    } else
                        a(this, e);
                return this
            }
            ,
            c.prototype.removeAllListeners = function(e) {
                return e ? (e = h ? h + e : e,
                this._events[e] && a(this, e)) : (this._events = new o,
                this._eventsCount = 0),
                this
            }
            ,
            c.prototype.off = c.prototype.removeListener,
            c.prototype.addListener = c.prototype.on,
            c.prefixed = h,
            c.EventEmitter = c,
            void 0 !== t && (t.exports = c)
        }
        , {}],
        4: [function(e, t, n) {
            "function" == typeof Object.create ? t.exports = function(e, t) {
                e.super_ = t,
                e.prototype = Object.create(t.prototype, {
                    constructor: {
                        value: e,
                        enumerable: !1,
                        writable: !0,
                        configurable: !0
                    }
                })
            }
            : t.exports = function(e, t) {
                e.super_ = t;
                function n() {}
                n.prototype = t.prototype,
                e.prototype = new n,
                e.prototype.constructor = e
            }
        }
        , {}],
        5: [function(e, t, n) {
            "use strict";
            var o = new RegExp("^((?:\\d+)?\\.?\\d+) *(" + ["milliseconds?", "msecs?", "ms", "seconds?", "secs?", "s", "minutes?", "mins?", "m", "hours?", "hrs?", "h", "days?", "d", "weeks?", "wks?", "w", "years?", "yrs?", "y"].join("|") + ")?$","i");
            t.exports = function(e) {
                var t, n, r = typeof e;
                if ("number" == r)
                    return e;
                if ("string" != r || "0" === e || !e)
                    return 0;
                if (+e)
                    return +e;
                if (1e4 < e.length || !(n = o.exec(e)))
                    return 0;
                switch (t = parseFloat(n[1]),
                n[2].toLowerCase()) {
                case "years":
                case "year":
                case "yrs":
                case "yr":
                case "y":
                    return 31536e6 * t;
                case "weeks":
                case "week":
                case "wks":
                case "wk":
                case "w":
                    return 6048e5 * t;
                case "days":
                case "day":
                case "d":
                    return 864e5 * t;
                case "hours":
                case "hour":
                case "hrs":
                case "hr":
                case "h":
                    return 36e5 * t;
                case "minutes":
                case "minute":
                case "mins":
                case "min":
                case "m":
                    return 6e4 * t;
                case "seconds":
                case "second":
                case "secs":
                case "sec":
                case "s":
                    return 1e3 * t;
                default:
                    return t
                }
            }
        }
        , {}],
        6: [function(e, t, n) {
            "use strict";
            t.exports = function(e) {
                var t, n = 0;
                function r() {
                    return n || (n = 1,
                    t = e.apply(this, arguments),
                    e = null),
                    t
                }
                return r.displayName = e.displayName || e.name || r.displayName || r.name,
                r
            }
        }
        , {}],
        7: [function(e, t, n) {
            var r, o, t = t.exports = {};
            function i() {
                throw new Error("setTimeout has not been defined")
            }
            function s() {
                throw new Error("clearTimeout has not been defined")
            }
            try {
                r = "function" == typeof setTimeout ? setTimeout : i
            } catch (e) {
                r = i
            }
            try {
                o = "function" == typeof clearTimeout ? clearTimeout : s
            } catch (e) {
                o = s
            }
            function c(t) {
                if (r === setTimeout)
                    return setTimeout(t, 0);
                if ((r === i || !r) && setTimeout)
                    return (r = setTimeout)(t, 0);
                try {
                    return r(t, 0)
                } catch (e) {
                    try {
                        return r.call(null, t, 0)
                    } catch (e) {
                        return r.call(this, t, 0)
                    }
                }
            }
            var a, u = [], f = !1, l = -1;
            function p() {
                f && a && (f = !1,
                a.length ? u = a.concat(u) : l = -1,
                u.length) && h()
            }
            function h() {
                if (!f) {
                    for (var e = c(p), t = (f = !0,
                    u.length); t; ) {
                        for (a = u,
                        u = []; ++l < t; )
                            a && a[l].run();
                        l = -1,
                        t = u.length
                    }
                    a = null,
                    f = !1,
                    !function(t) {
                        if (o === clearTimeout)
                            return clearTimeout(t);
                        if ((o === s || !o) && clearTimeout)
                            return (o = clearTimeout)(t);
                        try {
                            o(t)
                        } catch (e) {
                            try {
                                return o.call(null, t)
                            } catch (e) {
                                return o.call(this, t)
                            }
                        }
                    }(e)
                }
            }
            function m(e, t) {
                this.fun = e,
                this.array = t
            }
            function d() {}
            t.nextTick = function(e) {
                var t = new Array(arguments.length - 1);
                if (1 < arguments.length)
                    for (var n = 1; n < arguments.length; n++)
                        t[n - 1] = arguments[n];
                u.push(new m(e,t)),
                1 !== u.length || f || c(h)
            }
            ,
            m.prototype.run = function() {
                this.fun.apply(null, this.array)
            }
            ,
            t.title = "browser",
            t.browser = !0,
            t.env = {},
            t.argv = [],
            t.version = "",
            t.versions = {},
            t.on = d,
            t.addListener = d,
            t.once = d,
            t.off = d,
            t.removeListener = d,
            t.removeAllListeners = d,
            t.emit = d,
            t.prependListener = d,
            t.prependOnceListener = d,
            t.listeners = function(e) {
                return []
            }
            ,
            t.binding = function(e) {
                throw new Error("process.binding is not supported")
            }
            ,
            t.cwd = function() {
                return "/"
            }
            ,
            t.chdir = function(e) {
                throw new Error("process.chdir is not supported")
            }
            ,
            t.umask = function() {
                return 0
            }
        }
        , {}],
        8: [function(e, t, n) {
            "use strict";
            var o = Object.prototype.hasOwnProperty;
            function i(e) {
                return decodeURIComponent(e.replace(/\+/g, " "))
            }
            n.stringify = function(e, t) {
                var n, r = [];
                for (n in "string" != typeof (t = t || "") && (t = "?"),
                e)
                    o.call(e, n) && r.push(encodeURIComponent(n) + "=" + encodeURIComponent(e[n]));
                return r.length ? t + r.join("&") : ""
            }
            ,
            n.parse = function(e) {
                for (var t = /([^=?&]+)=?([^&]*)/g, n = {}; o = t.exec(e); ) {
                    var r = i(o[1])
                      , o = i(o[2]);
                    r in n || (n[r] = o)
                }
                return n
            }
        }
        , {}],
        9: [function(e, t, n) {
            "use strict";
            var r = e("eventemitter3")
              , o = e("millisecond")
              , i = e("demolish")
              , s = e("tick-tock")
              , c = e("one-time");
            function a(e, t, n) {
                return o((e in n ? n : e in t ? t : u)[e])
            }
            function u(e) {
                var t = this;
                if (!(t instanceof u))
                    return new u(e);
                e = e || {},
                t.attempt = null,
                t._fn = null,
                t["reconnect timeout"] = a("reconnect timeout", t, e),
                t.retries = a("retries", t, e),
                t.factor = a("factor", t, e),
                t.max = a("max", t, e),
                t.min = a("min", t, e),
                t.timers = new s(t)
            }
            ((u.prototype = new r).constructor = u)["reconnect timeout"] = "30 seconds",
            u.max = 1 / 0,
            u.min = "500 ms",
            u.retries = 10,
            u.factor = 2,
            u.prototype.reconnect = function() {
                var n = this;
                return n.backoff(function(e, t) {
                    if (t.duration = +new Date - t.start,
                    e)
                        return n.emit("reconnect failed", e, t);
                    n.emit("reconnected", t)
                }, n.attempt)
            }
            ,
            u.prototype.backoff = function(n, r) {
                var o = this;
                return (r = r || o.attempt || {}).backoff || (r["reconnect timeout"] = a("reconnect timeout", o, r),
                r.retries = a("retries", o, r),
                r.factor = a("factor", o, r),
                r.max = a("max", o, r),
                r.min = a("min", o, r),
                r.start = +r.start || +new Date,
                r.duration = +r.duration || 0,
                r.attempt = +r.attempt || 0,
                r.attempt === r.retries ? n.call(o, new Error("Unable to recover"), r) : (r.backoff = !0,
                r.attempt++,
                (o.attempt = r).scheduled = 1 !== r.attempt ? Math.min(Math.round((Math.random() + 1) * r.min * Math.pow(r.factor, r.attempt - 1)), r.max) : r.min,
                o.timers.setTimeout("reconnect", function() {
                    r.duration = +new Date - r.start,
                    r.backoff = !1,
                    o.timers.clear("reconnect, timeout");
                    var t = o._fn = c(function(e) {
                        if (o.reset(),
                        e)
                            return o.backoff(n, r);
                        n.call(o, void 0, r)
                    });
                    o.emit("reconnect", r, t),
                    o.timers.setTimeout("timeout", function() {
                        var e = new Error("Failed to reconnect in a timely manner");
                        r.duration = +new Date - r.start,
                        o.emit("reconnect timeout", e, r),
                        t(e)
                    }, r["reconnect timeout"])
                }, r.scheduled),
                o.emit("reconnect scheduled", r))),
                o
            }
            ,
            u.prototype.reconnecting = function() {
                return !!this.attempt
            }
            ,
            u.prototype.reconnected = function(e) {
                return this._fn && this._fn(e),
                this
            }
            ,
            u.prototype.reset = function() {
                return this._fn = this.attempt = null,
                this.timers.clear("reconnect, timeout"),
                this
            }
            ,
            u.prototype.destroy = i("timers attempt _fn"),
            t.exports = u
        }
        , {
            demolish: 1,
            eventemitter3: 10,
            millisecond: 5,
            "one-time": 6,
            "tick-tock": 12
        }],
        10: [function(e, t, n) {
            "use strict";
            var h = "function" != typeof Object.create && "~";
            function r(e, t, n) {
                this.fn = e,
                this.context = t,
                this.once = n || !1
            }
            function o() {}
            o.prototype._events = void 0,
            o.prototype.listeners = function(e, t) {
                var n = this._events && this._events[h ? h + e : e];
                if (t)
                    return !!n;
                if (!n)
                    return [];
                if (n.fn)
                    return [n.fn];
                for (var r = 0, o = n.length, i = new Array(o); r < o; r++)
                    i[r] = n[r].fn;
                return i
            }
            ,
            o.prototype.emit = function(e, t, n, r, o, i) {
                var s = h ? h + e : e;
                if (!this._events || !this._events[s])
                    return !1;
                var c, a = this._events[s], u = arguments.length;
                if ("function" == typeof a.fn) {
                    switch (a.once && this.removeListener(e, a.fn, void 0, !0),
                    u) {
                    case 1:
                        return a.fn.call(a.context),
                        !0;
                    case 2:
                        return a.fn.call(a.context, t),
                        !0;
                    case 3:
                        return a.fn.call(a.context, t, n),
                        !0;
                    case 4:
                        return a.fn.call(a.context, t, n, r),
                        !0;
                    case 5:
                        return a.fn.call(a.context, t, n, r, o),
                        !0;
                    case 6:
                        return a.fn.call(a.context, t, n, r, o, i),
                        !0
                    }
                    for (p = 1,
                    c = new Array(u - 1); p < u; p++)
                        c[p - 1] = arguments[p];
                    a.fn.apply(a.context, c)
                } else
                    for (var f, l = a.length, p = 0; p < l; p++)
                        switch (a[p].once && this.removeListener(e, a[p].fn, void 0, !0),
                        u) {
                        case 1:
                            a[p].fn.call(a[p].context);
                            break;
                        case 2:
                            a[p].fn.call(a[p].context, t);
                            break;
                        case 3:
                            a[p].fn.call(a[p].context, t, n);
                            break;
                        default:
                            if (!c)
                                for (f = 1,
                                c = new Array(u - 1); f < u; f++)
                                    c[f - 1] = arguments[f];
                            a[p].fn.apply(a[p].context, c)
                        }
                return !0
            }
            ,
            o.prototype.on = function(e, t, n) {
                t = new r(t,n || this),
                n = h ? h + e : e;
                return this._events || (this._events = h ? {} : Object.create(null)),
                this._events[n] ? this._events[n].fn ? this._events[n] = [this._events[n], t] : this._events[n].push(t) : this._events[n] = t,
                this
            }
            ,
            o.prototype.once = function(e, t, n) {
                t = new r(t,n || this,!0),
                n = h ? h + e : e;
                return this._events || (this._events = h ? {} : Object.create(null)),
                this._events[n] ? this._events[n].fn ? this._events[n] = [this._events[n], t] : this._events[n].push(t) : this._events[n] = t,
                this
            }
            ,
            o.prototype.removeListener = function(e, t, n, r) {
                e = h ? h + e : e;
                if (this._events && this._events[e]) {
                    var o = this._events[e]
                      , i = [];
                    if (t)
                        if (o.fn)
                            (o.fn !== t || r && !o.once || n && o.context !== n) && i.push(o);
                        else
                            for (var s = 0, c = o.length; s < c; s++)
                                (o[s].fn !== t || r && !o[s].once || n && o[s].context !== n) && i.push(o[s]);
                    i.length ? this._events[e] = 1 === i.length ? i[0] : i : delete this._events[e]
                }
                return this
            }
            ,
            o.prototype.removeAllListeners = function(e) {
                return this._events && (e ? delete this._events[h ? h + e : e] : this._events = h ? {} : Object.create(null)),
                this
            }
            ,
            o.prototype.off = o.prototype.removeListener,
            o.prototype.addListener = o.prototype.on,
            o.prototype.setMaxListeners = function() {
                return this
            }
            ,
            o.prefixed = h,
            void 0 !== t && (t.exports = o)
        }
        , {}],
        11: [function(e, t, n) {
            "use strict";
            t.exports = function(e, t) {
                if (t = t.split(":")[0],
                !(e = +e))
                    return !1;
                switch (t) {
                case "http":
                case "ws":
                    return 80 !== e;
                case "https":
                case "wss":
                    return 443 !== e;
                case "ftp":
                    return 21 !== e;
                case "gopher":
                    return 70 !== e;
                case "file":
                    return !1
                }
                return 0 !== e
            }
        }
        , {}],
        12: [function(e, f, t) {
            !function(r, t) {
                "use strict";
                var i = Object.prototype.hasOwnProperty
                  , s = e("millisecond");
                function c(e, t, n, r) {
                    this.start = +new Date,
                    this.duration = n,
                    this.clear = t,
                    this.timer = e,
                    this.fns = [r]
                }
                function a(e) {
                    clearTimeout(e)
                }
                function u(e) {
                    clearInterval(e)
                }
                function o(e) {
                    t(e)
                }
                function n(e) {
                    if (!(this instanceof n))
                        return new n(e);
                    this.timers = {},
                    this.context = e || this
                }
                c.prototype.remaining = function() {
                    return this.duration - this.taken()
                }
                ,
                c.prototype.taken = function() {
                    return +new Date - this.start
                }
                ,
                n.prototype.tock = function(r, o) {
                    var i = this;
                    return function() {
                        if (r in i.timers) {
                            var e = i.timers[r].fns.slice()
                              , t = e.length
                              , n = 0;
                            for (o ? i.clear(r) : i.start = +new Date; n < t; n++)
                                e[n].call(i.context)
                        }
                    }
                }
                ,
                n.prototype.setTimeout = function(e, t, n) {
                    var r, o = this;
                    return o.timers[e] ? o.timers[e].fns.push(t) : (r = s(n),
                    o.timers[e] = new c(setTimeout(o.tock(e, !0), s(n)),a,r,t)),
                    o
                }
                ,
                n.prototype.setInterval = function(e, t, n) {
                    var r, o = this;
                    return o.timers[e] ? o.timers[e].fns.push(t) : (r = s(n),
                    o.timers[e] = new c(setInterval(o.tock(e), s(n)),u,r,t)),
                    o
                }
                ,
                n.prototype.setImmediate = function(e, t) {
                    var n = this;
                    return "function" != typeof r ? n.setTimeout(e, t, 0) : (n.timers[e] ? n.timers[e].fns.push(t) : n.timers[e] = new c(r(n.tock(e, !0)),o,0,t),
                    n)
                }
                ,
                n.prototype.active = function(e) {
                    return e in this.timers
                }
                ,
                n.prototype.clear = function() {
                    var e, t, n, r = arguments.length ? arguments : [], o = this;
                    if (!(r = 1 === r.length && "string" == typeof r[0] ? r[0].split(/[, ]+/) : r).length)
                        for (e in o.timers)
                            i.call(o.timers, e) && r.push(e);
                    for (t = 0,
                    n = r.length; t < n; t++)
                        (e = o.timers[r[t]]) && (e.clear(e.timer),
                        e.fns = e.timer = e.clear = null,
                        delete o.timers[r[t]]);
                    return o
                }
                ,
                n.prototype.adjust = function(e, t) {
                    var n, t = s(t), r = this.timers[e];
                    return r && (n = r.clear === u,
                    r.clear(r.timer),
                    r.start = +new Date,
                    r.duration = t,
                    r.timer = (n ? setInterval : setTimeout)(this.tock(e, !n), t)),
                    this
                }
                ,
                n.prototype.end = n.prototype.destroy = function() {
                    return !(!this.context || (this.clear(),
                    this.context = this.timers = null))
                }
                ,
                n.Timer = c,
                f.exports = n
            }
            .call(this, e("timers").setImmediate, e("timers").clearImmediate)
        }
        , {
            millisecond: 5,
            timers: 13
        }],
        13: [function(a, e, u) {
            !function(e, t) {
                var r = a("process/browser.js").nextTick
                  , n = Function.prototype.apply
                  , o = Array.prototype.slice
                  , i = {}
                  , s = 0;
                function c(e, t) {
                    this._id = e,
                    this._clearFn = t
                }
                u.setTimeout = function() {
                    return new c(n.call(setTimeout, window, arguments),clearTimeout)
                }
                ,
                u.setInterval = function() {
                    return new c(n.call(setInterval, window, arguments),clearInterval)
                }
                ,
                u.clearTimeout = u.clearInterval = function(e) {
                    e.close()
                }
                ,
                c.prototype.unref = c.prototype.ref = function() {}
                ,
                c.prototype.close = function() {
                    this._clearFn.call(window, this._id)
                }
                ,
                u.enroll = function(e, t) {
                    clearTimeout(e._idleTimeoutId),
                    e._idleTimeout = t
                }
                ,
                u.unenroll = function(e) {
                    clearTimeout(e._idleTimeoutId),
                    e._idleTimeout = -1
                }
                ,
                u._unrefActive = u.active = function(e) {
                    clearTimeout(e._idleTimeoutId);
                    var t = e._idleTimeout;
                    0 <= t && (e._idleTimeoutId = setTimeout(function() {
                        e._onTimeout && e._onTimeout()
                    }, t))
                }
                ,
                u.setImmediate = "function" == typeof e ? e : function(e) {
                    var t = s++
                      , n = !(arguments.length < 2) && o.call(arguments, 1);
                    return i[t] = !0,
                    r(function() {
                        i[t] && (n ? e.apply(null, n) : e.call(null),
                        u.clearImmediate(t))
                    }),
                    t
                }
                ,
                u.clearImmediate = "function" == typeof t ? t : function(e) {
                    delete i[e]
                }
            }
            .call(this, a("timers").setImmediate, a("timers").clearImmediate)
        }
        , {
            "process/browser.js": 7,
            timers: 13
        }],
        14: [function(e, n, t) {
            !function(o) {
                "use strict";
                var p = e("requires-port")
                  , h = e("querystringify")
                  , t = /^([a-z][a-z0-9.+-]*:)?(\/\/)?([\S\s]*)/i
                  , i = /^[A-Za-z][A-Za-z0-9+-.]*:\/\//
                  , m = [["#", "hash"], ["?", "query"], function(e) {
                    return e.replace("\\", "/")
                }
                , ["/", "pathname"], ["@", "auth", 1], [NaN, "host", void 0, 1, 1], [/:(\d+)$/, "port", void 0, 1], [NaN, "hostname", void 0, 1, 1]]
                  , s = {
                    hash: 1,
                    query: 1
                };
                function d(e) {
                    var t, n = o && o.location || {}, r = {}, n = typeof (e = e || n);
                    if ("blob:" === e.protocol)
                        r = new v(unescape(e.pathname),{});
                    else if ("string" == n)
                        for (t in r = new v(e,{}),
                        s)
                            delete r[t];
                    else if ("object" == n) {
                        for (t in e)
                            t in s || (r[t] = e[t]);
                        void 0 === r.slashes && (r.slashes = i.test(e.href))
                    }
                    return r
                }
                function y(e) {
                    e = t.exec(e);
                    return {
                        protocol: e[1] ? e[1].toLowerCase() : "",
                        slashes: !!e[2],
                        rest: e[3]
                    }
                }
                function v(e, t, n) {
                    if (!(this instanceof v))
                        return new v(e,t,n);
                    var r, o, i, s, c, a = m.slice(), u = typeof t, f = this, l = 0;
                    for ("object" != u && "string" != u && (n = t,
                    t = null),
                    n && "function" != typeof n && (n = h.parse),
                    t = d(t),
                    r = !(u = y(e || "")).protocol && !u.slashes,
                    f.slashes = u.slashes || r && t.slashes,
                    f.protocol = u.protocol || t.protocol || "",
                    e = u.rest,
                    u.slashes || (a[3] = [/(.*)/, "pathname"]); l < a.length; l++)
                        "function" == typeof (i = a[l]) ? e = i(e) : (o = i[0],
                        c = i[1],
                        o != o ? f[c] = e : "string" == typeof o ? ~(s = e.indexOf(o)) && (e = "number" == typeof i[2] ? (f[c] = e.slice(0, s),
                        e.slice(s + i[2])) : (f[c] = e.slice(s),
                        e.slice(0, s))) : (s = o.exec(e)) && (f[c] = s[1],
                        e = e.slice(0, s.index)),
                        f[c] = f[c] || r && i[3] && t[c] || "",
                        i[4] && (f[c] = f[c].toLowerCase()));
                    n && (f.query = n(f.query)),
                    r && t.slashes && "/" !== f.pathname.charAt(0) && ("" !== f.pathname || "" !== t.pathname) && (f.pathname = function(e, t) {
                        for (var n = (t || "/").split("/").slice(0, -1).concat(e.split("/")), r = n.length, t = n[r - 1], o = !1, i = 0; r--; )
                            "." === n[r] ? n.splice(r, 1) : ".." === n[r] ? (n.splice(r, 1),
                            i++) : i && (0 === r && (o = !0),
                            n.splice(r, 1),
                            i--);
                        return o && n.unshift(""),
                        "." !== t && ".." !== t || n.push(""),
                        n.join("/")
                    }(f.pathname, t.pathname)),
                    p(f.port, f.protocol) || (f.host = f.hostname,
                    f.port = ""),
                    f.username = f.password = "",
                    f.auth && (i = f.auth.split(":"),
                    f.username = i[0] || "",
                    f.password = i[1] || ""),
                    f.origin = f.protocol && f.host && "file:" !== f.protocol ? f.protocol + "//" + f.host : "null",
                    f.href = f.toString()
                }
                v.prototype = {
                    set: function(e, t, n) {
                        var r, o = this;
                        switch (e) {
                        case "query":
                            "string" == typeof t && t.length && (t = (n || h.parse)(t)),
                            o[e] = t;
                            break;
                        case "port":
                            o[e] = t,
                            p(t, o.protocol) ? t && (o.host = o.hostname + ":" + t) : (o.host = o.hostname,
                            o[e] = "");
                            break;
                        case "hostname":
                            o[e] = t,
                            o.port && (t += ":" + o.port),
                            o.host = t;
                            break;
                        case "host":
                            o[e] = t,
                            /:\d+$/.test(t) ? (t = t.split(":"),
                            o.port = t.pop(),
                            o.hostname = t.join(":")) : (o.hostname = t,
                            o.port = "");
                            break;
                        case "protocol":
                            o.protocol = t.toLowerCase(),
                            o.slashes = !n;
                            break;
                        case "pathname":
                        case "hash":
                            t ? (r = "pathname" === e ? "/" : "#",
                            o[e] = t.charAt(0) !== r ? r + t : t) : o[e] = t;
                            break;
                        default:
                            o[e] = t
                        }
                        for (var i = 0; i < m.length; i++) {
                            var s = m[i];
                            s[4] && (o[s[1]] = o[s[1]].toLowerCase())
                        }
                        return o.origin = o.protocol && o.host && "file:" !== o.protocol ? o.protocol + "//" + o.host : "null",
                        o.href = o.toString(),
                        o
                    },
                    toString: function(e) {
                        e && "function" == typeof e || (e = h.stringify);
                        var t = this
                          , n = ((n = t.protocol) && ":" !== n.charAt(n.length - 1) && (n += ":"),
                        n + (t.slashes ? "//" : ""));
                        return t.username && (n += t.username,
                        t.password && (n += ":" + t.password),
                        n += "@"),
                        n += t.host + t.pathname,
                        (e = "object" == typeof t.query ? e(t.query) : t.query) && (n += "?" !== e.charAt(0) ? "?" + e : e),
                        t.hash && (n += t.hash),
                        n
                    }
                },
                v.extractProtocol = y,
                v.location = d,
                v.qs = h,
                n.exports = v
            }
            .call(this, "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {})
        }
        , {
            querystringify: 8,
            "requires-port": 11
        }],
        15: [function(e, t, n) {
            "use strict";
            var r, o = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-_".split(""), i = 64, s = {}, c = 0, a = 0;
            function u(e) {
                for (var t = ""; t = o[e % i] + t,
                0 < (e = Math.floor(e / i)); )
                    ;
                return t
            }
            function f() {
                var e = u(+new Date);
                return e !== r ? (c = 0,
                r = e) : e + "." + u(c++)
            }
            for (; a < i; a++)
                s[o[a]] = a;
            f.encode = u,
            f.decode = function(e) {
                var t = 0;
                for (a = 0; a < e.length; a++)
                    t = t * i + s[e.charAt(a)];
                return t
            }
            ,
            t.exports = f
        }
        , {}],
        16: [function(t, e, n) {
            "use strict";
            var r, o = t("eventemitter3"), i = t("tick-tock"), s = t("recovery"), c = t("querystringify"), a = t("inherits"), u = t("demolish"), f = t("yeast"), l = /\u2028/g, p = /\u2029/g;
            function h(e, t) {
                if (!(e instanceof m)) {
                    t = new Error("Primus#" + t + "'s context should called with a Primus instance");
                    if ("function" != typeof e.listeners || !e.listeners("error").length)
                        throw t;
                    e.emit("error", t)
                }
            }
            try {
                r = location.origin || location.protocol + "//" + location.host
            } catch (e) {
                r = "http://127.0.0.1"
            }
            function m(e, t) {
                var n;
                return this instanceof m ? (m.Stream.call(this),
                "function" != typeof this.client ? this.critical(new Error("The client library has not been compiled correctly, see https://github.com/primus/primus#client-library for more details")) : ("object" == typeof e ? e = (t = e).url || t.uri || r : t = t || {},
                "ping"in t || "pong"in t ? this.critical(new Error("The `ping` and `pong` options have been removed")) : (n = this,
                t.queueSize = "queueSize"in t ? t.queueSize : 1 / 0,
                t.timeout = "timeout"in t ? t.timeout : 1e4,
                t.reconnect = "reconnect"in t ? t.reconnect : {},
                t.pingTimeout = "pingTimeout"in t ? t.pingTimeout : 45e3,
                t.strategy = "strategy"in t ? t.strategy : [],
                t.transport = "transport"in t ? t.transport : {},
                n.buffer = [],
                n.writable = !0,
                n.readable = !0,
                n.url = n.parse(e || r),
                n.readyState = m.CLOSED,
                n.options = t,
                n.timers = new i(this),
                n.socket = null,
                n.disconnect = !1,
                n.transport = t.transport,
                n.transformers = {
                    outgoing: [],
                    incoming: []
                },
                n.recovery = new s(t.reconnect),
                "string" == typeof t.strategy && (t.strategy = t.strategy.split(/\s?,\s?/g)),
                !1 === t.strategy ? t.strategy = [] : t.strategy.length || (t.strategy.push("disconnect", "online"),
                this.authorization) || t.strategy.push("timeout"),
                t.strategy = t.strategy.join(",").toLowerCase(),
                "websockets"in t && (n.AVOID_WEBSOCKETS = !t.websockets),
                "network"in t && (n.NETWORK_EVENTS = t.network),
                t.manual || n.timers.setTimeout("open", function() {
                    n.timers.clear("open"),
                    n.open()
                }, 0),
                void n.initialise(t)))) : new m(e,t)
            }
            m.requires = m.require = function(e) {
                if ("function" == typeof t)
                    return t(e)
            }
            ;
            try {
                m.Stream = m.requires("stream")
            } catch (e) {}
            m.Stream || (m.Stream = o),
            a(m, m.Stream),
            m.OPENING = 1,
            m.CLOSED = 2,
            m.OPEN = 3,
            m.prototype.AVOID_WEBSOCKETS = !1,
            m.prototype.NETWORK_EVENTS = !1,
            m.prototype.online = !0;
            try {
                !(m.prototype.NETWORK_EVENTS = "onLine"in navigator && (window.addEventListener || document.body.attachEvent)) || navigator.onLine || (m.prototype.online = !1)
            } catch (e) {}
            m.prototype.ark = {},
            m.prototype.emits = t("emits"),
            m.prototype.plugin = function(e) {
                if (h(this, "plugin"),
                e)
                    return this.ark[e];
                var t = {};
                for (e in this.ark)
                    t[e] = this.ark[e];
                return t
            }
            ,
            (m.prototype.reserved = function(e) {
                return /^(incoming|outgoing)::/.test(e) || e in this.reserved.events
            }
            ).events = {
                "reconnect scheduled": 1,
                "reconnect timeout": 1,
                readyStateChange: 1,
                "reconnect failed": 1,
                reconnected: 1,
                reconnect: 1,
                offline: 1,
                timeout: 1,
                destroy: 1,
                online: 1,
                error: 1,
                close: 1,
                open: 1,
                data: 1,
                end: 1
            },
            m.prototype.initialise = function(e) {
                var t, o = this;
                for (t in o.recovery.on("reconnected", o.emits("reconnected")).on("reconnect failed", o.emits("reconnect failed", function(e) {
                    o.emit("end"),
                    e()
                })).on("reconnect timeout", o.emits("reconnect timeout")).on("reconnect scheduled", o.emits("reconnect scheduled")).on("reconnect", o.emits("reconnect", function(e) {
                    o.emit("outgoing::reconnect"),
                    e()
                })),
                o.on("outgoing::open", function() {
                    var e = o.readyState;
                    o.readyState = m.OPENING,
                    e !== o.readyState && o.emit("readyStateChange", "opening")
                }),
                o.on("incoming::open", function() {
                    var e = o.readyState;
                    if (o.recovery.reconnecting() && o.recovery.reconnected(),
                    o.writable = !0,
                    o.readable = !0,
                    o.online || (o.online = !0,
                    o.emit("online")),
                    o.readyState = m.OPEN,
                    e !== o.readyState && o.emit("readyStateChange", "open"),
                    o.heartbeat(),
                    o.buffer.length) {
                        var t = o.buffer.slice()
                          , n = t.length
                          , r = 0;
                        for (o.buffer.length = 0; r < n; r++)
                            o._write(t[r])
                    }
                    o.emit("open")
                }),
                o.on("incoming::ping", function(e) {
                    o.online = !0,
                    o.heartbeat(),
                    o.emit("outgoing::pong", e),
                    o._write("primus::pong::" + e)
                }),
                o.on("incoming::error", function(e) {
                    var t = o.timers.active("connect")
                      , n = e;
                    if ("string" == typeof e)
                        n = new Error(e);
                    else if (!(e instanceof Error) && "object" == typeof e)
                        for (var r in n = new Error(e.message || e.reason),
                        e)
                            Object.prototype.hasOwnProperty.call(e, r) && (n[r] = e[r]);
                    if (o.recovery.reconnecting())
                        return o.recovery.reconnected(n);
                    o.listeners("error").length && o.emit("error", n),
                    t && (~o.options.strategy.indexOf("timeout") ? o.recovery.reconnect() : o.end())
                }),
                o.on("incoming::data", function(n) {
                    o.decoder(n, function(e, t) {
                        if (e)
                            return o.listeners("error").length && o.emit("error", e);
                        o.protocol(t) || o.transforms(o, o, "incoming", t, n)
                    })
                }),
                o.on("incoming::end", function() {
                    var e = o.readyState;
                    return o.disconnect ? (o.disconnect = !1,
                    o.end()) : (o.readyState = m.CLOSED,
                    e !== o.readyState && o.emit("readyStateChange", "end"),
                    o.timers.active("connect") && o.end(),
                    e !== m.OPEN ? !!o.recovery.reconnecting() && o.recovery.reconnect() : (this.writable = !1,
                    this.readable = !1,
                    this.timers.clear(),
                    o.emit("close"),
                    ~o.options.strategy.indexOf("disconnect") ? o.recovery.reconnect() : (o.emit("outgoing::end"),
                    void o.emit("end"))))
                }),
                o.client(),
                o.ark)
                    o.ark[t].call(o, o, e);
                return o.NETWORK_EVENTS && (o.offlineHandler = function() {
                    o.online && (o.online = !1,
                    o.emit("offline"),
                    o.end(),
                    o.recovery.reset())
                }
                ,
                o.onlineHandler = function() {
                    o.online || (o.online = !0,
                    o.emit("online"),
                    ~o.options.strategy.indexOf("online") && o.recovery.reconnect())
                }
                ,
                window.addEventListener ? (window.addEventListener("offline", o.offlineHandler, !1),
                window.addEventListener("online", o.onlineHandler, !1)) : document.body.attachEvent && (document.body.attachEvent("onoffline", o.offlineHandler),
                document.body.attachEvent("ononline", o.onlineHandler))),
                o
            }
            ,
            m.prototype.protocol = function(e) {
                if ("string" != typeof e || 0 !== e.indexOf("primus::"))
                    return !1;
                var t = e.indexOf(":", 8)
                  , n = e.slice(t + 2);
                switch (e.slice(8, t)) {
                case "ping":
                    this.emit("incoming::ping", +n);
                    break;
                case "server":
                    "close" === n && (this.disconnect = !0);
                    break;
                case "id":
                    this.emit("incoming::id", n);
                    break;
                default:
                    return !1
                }
                return !0
            }
            ,
            m.prototype.transforms = function(e, i, t, n, r) {
                var s = {
                    data: n
                }
                  , c = e.transformers[t];
                return function n(r, o) {
                    var e = c[r++];
                    return e ? 1 === e.length ? !1 === e.call(i, s) ? void 0 : n(r, o) : void e.call(i, s, function(e, t) {
                        if (e)
                            return i.emit("error", e);
                        !1 !== t && n(r, o)
                    }) : o()
                }(0, function() {
                    if ("incoming" === t)
                        return i.emit("data", s.data, r);
                    i._write(s.data)
                }),
                this
            }
            ,
            m.prototype.id = function(e) {
                return this.socket && this.socket.id ? e(this.socket.id) : (this._write("primus::id::"),
                this.once("incoming::id", e))
            }
            ,
            m.prototype.open = function() {
                return h(this, "open"),
                !this.recovery.reconnecting() && this.options.timeout && this.timeout(),
                this.emit("outgoing::open"),
                this
            }
            ,
            m.prototype.write = function(e) {
                return h(this, "write"),
                this.transforms(this, this, "outgoing", e),
                !0
            }
            ,
            m.prototype._write = function(e) {
                var n = this;
                return m.OPEN !== n.readyState ? (this.buffer.length === this.options.queueSize && this.buffer.splice(0, 1),
                this.buffer.push(e),
                !1) : (n.encoder(e, function(e, t) {
                    if (e)
                        return n.listeners("error").length && n.emit("error", e);
                    "string" == typeof t && ~(t = ~t.indexOf("\u2028") ? t.replace(l, "\\u2028") : t).indexOf("\u2029") && (t = t.replace(p, "\\u2029")),
                    n.emit("outgoing::data", t)
                }),
                !0)
            }
            ,
            m.prototype.heartbeat = function() {
                return this.options.pingTimeout && (this.timers.clear("heartbeat"),
                this.timers.setTimeout("heartbeat", function() {
                    this.online && (this.online = !1,
                    this.emit("offline"),
                    this.emit("incoming::end"))
                }, this.options.pingTimeout)),
                this
            }
            ,
            m.prototype.timeout = function() {
                var e = this;
                function t() {
                    e.removeListener("error", t).removeListener("open", t).removeListener("end", t).timers.clear("connect")
                }
                return e.timers.setTimeout("connect", function() {
                    t(),
                    e.readyState === m.OPEN || e.recovery.reconnecting() || (e.emit("timeout"),
                    ~e.options.strategy.indexOf("timeout") ? e.recovery.reconnect() : e.end())
                }, e.options.timeout),
                e.on("error", t).on("open", t).on("end", t)
            }
            ,
            m.prototype.end = function(e) {
                return h(this, "end"),
                this.readyState !== m.CLOSED || this.timers.active("connect") || this.timers.active("open") ? (void 0 !== e && this.write(e),
                this.writable = !1,
                this.readable = !1,
                e = this.readyState,
                this.readyState = m.CLOSED,
                e !== this.readyState && this.emit("readyStateChange", "end"),
                this.timers.clear(),
                this.emit("outgoing::end"),
                this.emit("close"),
                this.emit("end")) : this.recovery.reconnecting() && (this.recovery.reset(),
                this.emit("end")),
                this
            }
            ,
            m.prototype.destroy = u("url timers options recovery socket transport transformers", {
                before: "end",
                after: ["removeAllListeners", function() {
                    this.NETWORK_EVENTS && (window.addEventListener ? (window.removeEventListener("offline", this.offlineHandler),
                    window.removeEventListener("online", this.onlineHandler)) : document.body.attachEvent && (document.body.detachEvent("onoffline", this.offlineHandler),
                    document.body.detachEvent("ononline", this.onlineHandler)))
                }
                ]
            }),
            m.prototype.clone = function(e) {
                return this.merge({}, e)
            }
            ,
            m.prototype.merge = function(e) {
                for (var t, n, r = 1; r < arguments.length; r++)
                    for (t in n = arguments[r])
                        Object.prototype.hasOwnProperty.call(n, t) && (e[t] = n[t]);
                return e
            }
            ,
            m.prototype.parse = t("url-parse"),
            m.prototype.querystring = c.parse,
            m.prototype.querystringify = c.stringify,
            m.prototype.uri = function(e) {
                var t = this.url
                  , n = []
                  , r = !1
                  , o = (e.query && (r = !0),
                (e = e || {}).protocol = "protocol"in e ? e.protocol : "http:",
                e.query = !(!t.query || !r) && t.query.slice(1),
                e.secure = "secure"in e ? e.secure : "https:" === t.protocol || "wss:" === t.protocol,
                e.auth = ("auth"in e ? e : t).auth,
                e.pathname = ("pathname"in e ? e : this).pathname,
                e.port = "port"in e ? +e.port : +t.port || (e.secure ? 443 : 80),
                this.querystring(e.query || ""));
                return o._primuscb = f(),
                e.query = this.querystringify(o),
                this.emit("outgoing::url", e),
                n.push(e.secure ? e.protocol.replace(":", "s:") : e.protocol, ""),
                n.push(e.auth ? e.auth + "@" + t.host : t.host),
                e.pathname && n.push(e.pathname.slice(1)),
                r ? n[n.length - 1] += "?" + e.query : delete e.query,
                e.object ? e : n.join("/")
            }
            ,
            m.prototype.transform = function(e, t) {
                return h(this, "transform"),
                e in this.transformers ? (this.transformers[e].push(t),
                this) : this.critical(new Error("Invalid transformer type"))
            }
            ,
            m.prototype.critical = function(e) {
                if (this.emit("error", e))
                    return this;
                throw e
            }
            ,
            m.connect = function(e, t) {
                return new m(e,t)
            }
            ,
            m.EventEmitter = o,
            m.prototype.client = function() {
                var t, n = this, r = function() {
                    if ("undefined" != typeof WebSocket)
                        return WebSocket;
                    if ("undefined" != typeof MozWebSocket)
                        return MozWebSocket;
                    try {
                        return m.requires("ws")
                    } catch (e) {}
                }();
                if (!r)
                    return n.critical(new Error("Missing required `ws` module. Please run `npm install --save ws`"));
                n.on("outgoing::open", function() {
                    n.emit("outgoing::end");
                    try {
                        var e = {
                            protocol: "ws+unix:" === n.url.protocol ? "ws+unix:" : "ws:",
                            query: !0
                        };
                        3 === r.length ? ("ws+unix:" === e.protocol && (e.pathname = n.url.pathname + ":" + n.pathname),
                        n.socket = t = new r(n.uri(e),[],n.transport)) : (n.socket = t = new r(n.uri(e)),
                        t.binaryType = "arraybuffer")
                    } catch (e) {
                        return n.emit("error", e)
                    }
                    t.onopen = n.emits("incoming::open"),
                    t.onerror = n.emits("incoming::error"),
                    t.onclose = n.emits("incoming::end"),
                    t.onmessage = n.emits("incoming::data", function(e, t) {
                        e(void 0, t.data)
                    })
                }),
                n.on("outgoing::data", function(e) {
                    if (t && t.readyState === r.OPEN)
                        try {
                            t.send(e)
                        } catch (e) {
                            n.emit("incoming::error", e)
                        }
                }),
                n.on("outgoing::reconnect", function() {
                    n.emit("outgoing::open")
                }),
                n.on("outgoing::end", function() {
                    t && (t.onerror = t.onopen = t.onclose = t.onmessage = function() {}
                    ,
                    t.close(),
                    t = null)
                })
            }
            ,
            m.prototype.authorization = !1,
            m.prototype.pathname = "/primus",
            m.prototype.encoder = function(e, t) {
                var n;
                try {
                    e = JSON.stringify(e)
                } catch (e) {
                    n = e
                }
                t(n, e)
            }
            ,
            m.prototype.decoder = function(e, t) {
                var n;
                if ("string" != typeof e)
                    return t(n, e);
                try {
                    e = JSON.parse(e)
                } catch (e) {
                    n = e
                }
                t(n, e)
            }
            ,
            m.prototype.version = "7.2.3",
            "undefined" != typeof document && "undefined" != typeof navigator && (document.addEventListener && document.addEventListener("keydown", function(e) {
                27 === e.keyCode && e.preventDefault && e.preventDefault()
            }, !1),
            c = +[(u = (a = (navigator.userAgent || "").toLowerCase()).match(/.+(?:rv|it|ra|ie)[/: ](\d+)\.(\d+)(?:\.(\d+))?/) || [])[1], u[2]].join("."),
            !~a.indexOf("chrome")) && ~a.indexOf("safari") && c < 534.54 && (m.prototype.AVOID_WEBSOCKETS = !0),
            e.exports = m
        }
        , {
            demolish: 1,
            emits: 2,
            eventemitter3: 3,
            inherits: 4,
            querystringify: 8,
            recovery: 9,
            "tick-tock": 12,
            "url-parse": 14,
            yeast: 15
        }]
    }, {}, [16])(16)
}, []);
