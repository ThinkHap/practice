/*pub-1|2011-12-27 17:02:15*/
KISSY.add("pai-home", function(A) {
	var U = {};
	var L = A.DOM,
	K = A.Event,
	C = A.Node;
	var T = location.host,
	I = {};
	var O = {};
	var G = "http://" + (/daily.taobao.net/g.test(T.toString()) ? "paimai.daily.taobao.net": "paimai.taobao.com");
	var V = '<em class="hour">{h}</em>\u5c0f\u65f6<em class="min">{m}</em>\u5206<em class="sec">{s}</em>\u79d2',
	F = '<em class="hour">{h}</em>\u65f6<em class="min">{m}</em>\u5206<em class="sec">{s}</em>\u79d2',
	H = '<em class="day">{d}</em>\u5929<em class="hour" >{h}</em>\u5c0f\u65f6<em class="min">{m}</em>\u5206<em class="sec">{s}</em>\u79d2',
	R = '<em  class="min">{m}</em>\u5206<em class="sec">{s}</em>\u79d2';
	var J = G + "/json/get_legacy_auction.htm?itemIds=",
	B = G + "/json/get_tiny_auction.htm?itemIds=",
	P = G + "/json/get_ending_auction.htm?itemIds=";
	A.Paimai = A.Paimai || {};
	function M(W) {
		var N = "_nk_",
		E = "_l_g_",
		S = "tracknick",
		X = "ck1",
		D = A.Cookie.get;
		return !! (D(E) && D(N)) || (W ? false: !! (D(X) && D(S)))
	}
	function Q(D) {
		var N = "_point_" + A.now(),
		E = window[N] = new Image();
		E.onload = (E.onerror = function() {
			window[N] = null
		});
		E.src = D;
		E = null
	}
	A.Paimai.UnifyDomain = function() {
		try {
			if (location.href.indexOf("paimai.daily.taobao.net") > - 1) {
				document.domain = "paimai.daily.taobao.net"
			}
			if (location.href.indexOf("paimai.taobao.com") > - 1) {
				document.domain = "paimai.taobao.com"
			}
		} catch(D) {}
	};
	A.Paimai.SlidePic = {
		init: function() {
			if (A.get("#tab-container")) {
				A.use("switchable", function(D) {
					D.Tabs("#tab-container", {
						markupType: 0,
						effect: "none",
						steps: 1,
						triggerType: "mouse"
					})
				})
			}
		}
	};
	A.Paimai.Offer = {
		init: function() {
			if (!A.get(".offer-action")) {
				return
			}
			A.use("overlay", function() {
				var D = false;
				var E = new A.Dialog({
					width: M() ? 560: 340,
					bodyStyle: {
						height: 280
					},
					elCls: ".J_PaiDialog",
					mask: true,
					bodyContent: '<iframe scrolling="no" height="280" width="100%" frameborder="0" id="paimaiIframe"></iframe>'
				});
				E.render();
				E.hide();
				var N = A.get("#paimaiIframe");
				K.on(".price-button", "click", function(X) {
					Q("http://www.atpanel.com/tbpaimai.1.11?home=");
					var S = L.parent(X.target, ".slide-content"),
					W = A.one(prefix = "#" + S.id + " .price-input");
					X.halt(true);
					if (!U.iframe) {
						E.set("bodyContent", "<code>\u8bf7\u5237\u65b0\u9875\u9762\u91cd\u8bd5</code>");
						E.show()
					} else {
						if (!D) {
							K.on(N, "load", function() {
								if (M()) {
									E.resizeBox()
								}
								E.show();
								E.center()
							});
							D = true
						}
						N.src = U.iframe + (U.iframe.indexOf("?") ? "?": "&") + "t=" + ( + new Date()) + "&input=" + W.val() + "&itemId=" + S.id + "&cycleId=" + W.attr("data-circle") + "&isNew=" + A.one("#isNew").val()
					}
				});
				A.mix(E, {
					resizeBox: function() {
						A.DOM.width(A.DOM.parent(N, ".ks-dialog"), 554);
						E.center()
					}
				});
				A.Paimai.OfferDialog = E
			})
		}
	};
	A.Paimai.RenderFirst = function(E) {
		var D = B + E.join(",") + "&t=" + + new Date;
		A.getScript(D, function() {
			var W = getTinyAuction.list;
			if (W && W.length) {
				for (var N = 0; N < W.length; N++) {
					var S = "#" + W[N].itemId;
					if (A.one(S)) {
						A.Paimai.updateRecords(W[N]);
						L.html(S + " .J_InitPrice", W[N].initPrice)
					}
				}
			}
		})
	};
	A.Paimai.updateRecords = function(Y) {
		if (Y) {
			if (!X(Y)) {
				return
			}
			N(Y);
			E(Y);
			S(Y)
		}
		function X(d) {
			var c = "#" + d.itemId;
			var a = A.one(c + " .price-input"),
			Z,
			b;
			if (d.cycleId) {
				a && a.attr("data-version", d.version)
			}
			Z = parseInt(a.attr("data-version"), 10);
			b = parseInt(d.version, 10);
			if (!a) {
				return false
			}
			if (a) {
				if (Z >= b && ! d.cycleId) {
					return false
				}
				a.attr("data-version", d.version);
				return true
			}
			return true
		}
		function N(f) {
			var d = "#" + f.itemId;
			var e = A.one(d + " .J_CurrentPrice");
			var b = f.price.split(".");
			var c = '<em class="mark">&yen;</em><em class="big-price">{y}.</em><em class="decimal">{f}</em>';
			L.html(e, A.substitute(c, {
				y: b[0],
				f: b[1]
			}));
			L.html(d + " .J_AddPrice", f.increment);
			L.html(d + " .J_AuctionPeople", f.bidderCnt);
			var Z = A.one(d + " input.price-input");
			var a = f.nextMinBid;
			if (0 == a) {
				a = ( + f.price + + f.increment).toFixed(2)
			}
			if ( + f.bidderCnt === 0) {
				a = ( + f.price).toFixed(2)
			}
			Z.val(a);
			Z.attr("data-min", a);
			Z.attr("data-range", f.increment);
			Z.attr("data-circle", f.cycleId);
			Z.attr("data-version", f.version);
			if (f.leftTime <= 0) {
				Z.val(0);
				Z.attr("data-min", 0);
				Z.attr("data-range", 0)
			}
		}
		function E(f) {
			var d = "#" + f.itemId,
			c = f.price,
			b = f.reservePrice,
			Z = f.bidderCnt;
			var a = d + " .J_ReserveText";
			if ( + b === 0) {
				L.html(a, "\u6b64\u5b9d\u8d1d\u6ca1\u6709")
			} else {
				if ( + b > 0 && + Z === 0) {
					L.html(a, "\u6b64\u5b9d\u8d1d\u8bbe\u6709")
				} else {
					if ( + c >= + b) {
						L.html(a, "\u5f53\u524d\u4ef7\u683c\u5df2\u8d85\u8fc7")
					} else {
						if ( + c < + b) {
							L.html(a, "\u5f53\u524d\u4ef7\u683c\u672a\u8d85\u8fc7")
						}
					}
				}
			}
			var e = {
				autoFit: false,
				eventType: "mouse",
				disableClick: false,
				delay: 0.1,
				position: "right",
				offset: [15, - 25]
			};
			if (A.UA.ie !== 6 && A.UA.ie !== 7) {
				A.mix(e, {
					effect: "fade"
				})
			}
			A.SimplePopup.decorate(A.one(d + " .J_ReservePrice"), ".price-overlay", e)
		}
		function S(Z) {
			A.use("calendar", function(c) {
				var d = + new Date() + + Z.leftTime,
				b = c.Date.format(d, "isoDateTime").replace(/T/, "  ");
				Z.thresholdTime && (O[Z.itemId] = Math.floor(Z.thresholdTime / 1000, 10));
				var a = {
					timeToEnd: Math.floor(parseInt(Z.leftTime / 1000, 10)),
					template: H,
					itemId: Z.itemId,
					ends: "<em>" + b + "</em>",
					isBig: true,
					currentPrice: Z.price,
					reservePrice: Z.reservePrice,
					timeToGo: Z.timeToGo
				};
				if (I[Z.itemId]) {
					I[Z.itemId].cancel()
				}
				if (Z.timeToGo && parseInt(Z.timeToGo, 10) > 0) {
					a = D(Z, a)
				}
				if (parseInt(Z.leftTime, 10) <= 0) {
					W(Z);
					return
				}
				c.Paimai.Countdown.init(a)
			})
		}
		function D(b, Z) {
			var a = "#" + b.itemId;
			L.html(a + " .J_TimeTitle", "\u8ddd\u79bb\u5f00\u62cd\u8fd8\u6709");
			A.one(a + " .price-button").addClass("will-begin");
			L.attr(a + " .price-button", "disabled", true);
			A.one(a + " .plus-sign").addClass("grey-add");
			A.one(a + " .minus-sign").addClass("grey-cut");
			L.addClass(a + " a.J_Sign", "sleepLink");
			Z.timeToEnd = Math.floor(parseInt(b.timeToGo / 1000, 10));
			Z.followTime = Math.floor(parseInt(b.leftTime / 1000, 10));
			return Z
		}
		function W(a) {
			var Z = "#" + a.itemId;
			L.html(Z + " .J_TimeTitle", "\u6210\u4ea4\u65f6\u95f4");
			if (a.bidderCnt === 0) {
				L.html(Z + " .J_TimeTitle", "\u7ed3\u675f\u65f6\u95f4")
			}
			L.html(Z + " .J_TimeLeft", "<em>" + a.ends + "</em>");
			A.one(Z + " .price-button").addClass("is-over");
			L.attr(Z + " .price-button", "disabled", true);
			A.one(Z + " .plus-sign").addClass("grey-add");
			A.one(Z + " .minus-sign").addClass("grey-cut");
			L.addClass(Z + " a.J_Sign", "sleepLink")
		}
	};
	A.Paimai.RenderNormal = function() {
		function S(W) {
			var X = W.requestUrl + W.itemIds + "&t=" + + new Date;
			if (W.isNormal) {
				A.getScript(X, function() {
					var Y = getLegacyAuction.list;
					if (Y && Y.length) {
						E(Y, W)
					}
				},
				"utf-8")
			} else {
				A.getScript(X, function() {
					var Y = getTinyAuction.list;
					if (Y && Y.length) {
						W.ends = "0";
						E(Y, W)
					}
				},
				"utf-8")
			}
		}
		function E(b, a) {
			for (var Z = 0; Z < b.length; Z++) {
				if (A.one("#" + b[Z].itemId)) {
					var Y = (b[Z].currentPrice + "").split(".");
					if (!Y[1]) {
						Y[1] = "00"
					}
					var X = {
						timeToEnd: Math.floor(parseInt(b[Z].leftTime / 1000, 10)),
						template: a.template,
						itemId: b[Z].itemId,
						timeToStart: Math.floor(parseInt(b[Z].timeToStart / 1000, 10)),
						ends: Math.floor(parseInt(b[Z].end, 10))
					};
					if (a.isNormal) {
						D(b[Z]);
						if (X.timeToStart > 0) {
							var W = Math.floor(parseInt((b[Z].end - b[Z].start) / 1000, 10));
							X.timeToEnd = X.timeToStart;
							X.timeToStart = W
						}
					} else {
						X.ends = a.ends
					}
					A.Paimai.Countdown.init(X)
				}
			}
		}
		function D(X) {
			var a = X.itemId,
			W = "#" + a;
			var Z = parseInt(X.leftTime, 10),
			Y = parseInt(X.timeToStart, 10);
			if (Y > 0) {
				L.addClass(L.get(W + " .label"), "will-begin");
				L.html(W + " .J_LeadPrice", X.currentPrice);
				L.html(W + " .J_PeopleNum", X.bidCnt);
				L.addClass(W + " .button", "will-begin")
			} else {
				if (Z > 0) {
					A.Paimai.Countdown.switcher.isOn = true;
					L.html(W + " .J_LeadPrice", X.currentPrice);
					L.html(W + " .J_PeopleNum", X.bidCnt);
					L.removeClass(W + " .button", "time-out will-begin")
				} else {
					if (Z <= 0) {
						A.Paimai.Countdown.switcher.isOn = false;
						if (I[a]) {
							I[a].cancel()
						}
						L.addClass(L.get(W + " .label"), "is-over");
						L.html(W + " .J_LeadPrice", X.currentPrice);
						L.html(W + " .J_PeopleNum", X.bidCnt);
						L.addClass(W + " .button", "time-out")
					}
				}
			}
		}
		function N() {
			var X = U.akeys,
			b = U.bkeys,
			d = A.Paimai.SliceArray(X),
			W;
			var Z = {},
			a = {};
			var Y = 0;
			if (!d) {
				return
			}
			function c() {
				if (Y < d.length) {
					setTimeout(function() {
						W = d[Y].join(",");
						Z = {
							itemIds: W,
							template: V,
							isNormal: true,
							requestUrl: J
						},
						S(Z);
						Y++;
						c()
					},
					1)
				}
			}
			c();
			a = {
				itemIds: b.join(","),
				template: V,
				requestUrl: B,
				isNormal: false
			},
			setTimeout(function() {
				S(a)
			},
			0.5)
		}
		return {
			init: N
		}
	} ();
	A.Paimai.SliceArray = function(W) {
		if (W.length === 0) {
			return
		}
		var N = Math.ceil(W.length / 20, 10);
		var S = new Array(N),
		E;
		for (var D = 0; D < N; D++) {
			E = W.slice(D * 20, (D + 1) * 20);
			S[D] = E
		}
		return S
	};
	A.Paimai.Countdown = (function() {
		var Z = {};
		var c = {};
		var a, e, N, Y;
		function W(d, f) {
			e = d % 60;
			N = Math.floor(d / 60) % 60;
			Y = Math.floor(d / 3600);
			a = parseInt(Y / 24);
			if (f) {
				Y = Y % 24
			}
			return {
				d: a < 10 ? "0" + a: a,
				s: e < 10 ? "0" + e: e,
				m: N < 10 ? "0" + N: N,
				h: Y < 10 ? "0" + Y: Y
			}
		}
		function X(f) {
			var d = new Date(f).toLocaleTimeString().split(":");
			return {
				h: d[0],
				m: d[1],
				s: d[2]
			}
		}
		function b(f) {
			var i = f.timeToEnd,
			h = f.template,
			k = f.itemId;
			var g = O[k];
			var j = "#" + k;
			var d = j + " .J_TimeLeft";
			if (!A.get(d)) {
				return
			}
			if (i <= 0) {
				i = 0;
				Z.isOn = false;
				if (I[k]) {
					I[k].cancel()
				}
				L.html(A.get(d), A.substitute(F, X(f.ends)));
				if (f.isBig) {
					L.html(A.get(d), A.substitute(h, W(i, f.isBig)))
				}
				return
			} else {
				if (i > 0) {
					Z.isOn = true;
					I[k] = A.later(function() {
						L.html(A.get(d), A.substitute(h, W(i, f.isBig)));
						i--;
						if ( + f.timeToGo <= 0 && ! c[k] && g && g > 0 && i <= g - 1) {
							c[k] = true;
							D(j)
						}
						if (i <= - 1) {
							if (f.followTime) {
								i = f.followTime;
								f.followTime = null;
								f.timeToGo = - 1;
								E(j);
								return
							} else {
								if (f.timeToStart) {
									i = f.timeToStart;
									A.one(j + " .button") && L.removeClass(j + " .button", "will-begin");
									var l = L.get(j + " .will-begin");
									l && L.removeClass(l, "will-begin");
									f.timeToStart = null;
									return
								}
							}
							if (f.isBig) {
								S(j, f);
								L.remove(j + " .J_DelayPop");
								A.one(j + " .J_TimeLeft") && L.html(j + " .J_TimeLeft", f.ends)
							} else {
								A.one(j + " .J_TimeLeft") && L.html(j + " .J_TimeLeft", A.substitute(F, X(f.ends)));
								A.one(j + " .button") && L.addClass(j + " .button", "time-out");
								l = L.get(j + " .label");
								l && L.addClass(l, "is-over")
							}
							I[f.itemId].cancel()
						}
					},
					1000, true)
				}
			}
		}
		function D(f) {
			var g = L.create("<a>", {
				href: "http://service.taobao.com/support/help-13728.htm",
				title: "\u5ef6\u65f6\u62cd\u8bf4\u660e",
				target: "_blank"
			});
			var d = L.create("<img>", {
				src: "http://img01.taobaocdn.com/tps/i1/T1SQKvXf4ZXXXXXXXX-25-18.gif",
				css: {
					position: "absolute",
					left: "593",
					top: "167"
				},
				"class": "J_DelayPop"
			});
			L.append(d, g);
			L.insertBefore(g, f + " .J_TimeLeft")
		}
		function E(d) {
			L.removeAttr(d + " .price-button", "disabled");
			L.removeClass(d + " .price-button", "will-begin");
			L.removeClass(d + " .plus-sign", "grey-add");
			L.removeClass(d + " .minus-sign", "grey-cut");
			L.removeClass(d + " a.J_Sign", "sleepLink");
			L.html(d + " .J_TimeTitle", "\u5269\u4f59\u65f6\u95f4")
		}
		function S(f, d) {
			L.attr(f + " .price-button", "disabled", true);
			L.addClass(f + " .price-button", "time-out");
			L.addClass(f + " .plus-sign", "grey-add");
			L.addClass(f + " .minus-sign", "grey-cut");
			L.addClass(f + " a.J_Sign", "sleepLink");
			if (d.reservePrice <= d.currentPrice) {
				L.html(f + " .J_TimeTitle", "\u6210\u4ea4\u65f6\u95f4")
			} else {
				L.html(f + " .J_TimeTitle", "\u7ed3\u675f\u65f6\u95f4")
			}
		}
		return {
			init: b,
			switcher: Z,
			timeFormat: W
		}
	})();
	A.Paimai.PriceOperation = {
		init: function() {
			if (!A.one(".price-input")) {
				return
			}
			function D(E) {
				return parseFloat(E.val(), 10)
			}
			K.on("a.J_Sign", "click", function(Y) {
				var X = "#" + L.parent(Y.target, ".slide-content").id;
				if (L.hasClass(X + " a.J_Sign", "sleepLink")) {
					return
				}
				Y.halt(true);
				var Z = A.one(X + " .price-input");
				var W = D(Z),
				E = parseFloat(Z.attr("data-range"), 10),
				S = parseFloat(Z.attr("data-min") || 0, 10),
				N = A.one(Y.target);
				if (N.hasClass("plus") || N.hasClass("plus-sign")) {
					Q("http://www.atpanel.com/tbpaimai.1.10?home=");
					W += + E
				} else {
					if (N.hasClass("minus") || N.hasClass("minus-sign")) {
						Q("http://www.atpanel.com/tbpaimai.1.9?home=");
						W -= + E
					}
				}
				W = W >= S ? W: S;
				Z.val(W.toFixed(2))
			}),
			K.on(".price-input", "blur", function(Y) {
				Q("http://www.atpanel.com/tbpaimai.1.12?home=");
				var S = /[^-\d\.]/g;
				if (E.val() < 0) {
					Q("http://www.atpanel.com/tbpaimai.1.13?home=")
				}
				if (isNaN(E.val()) || S.test(E.val())) {
					Q("http://www.atpanel.com/tbpaimai.1.14?home=")
				}
				var X = "#" + L.parent(Y.target, ".slide-content").id;
				var E = A.one(this);
				var N = parseFloat(E.attr("data-min") || 0, 10);
				var W = parseFloat(E.val().replace(/[^\d\.]/g, ""), 10);
				W = isNaN(W) ? N: Math.max(N, W);
				W = Math.min(20000000, W);
				E.val(W.toFixed(2))
			})
		}
	};
	A.Paimai.RenderEnd = {
		timer: {},
		_splitPrice: function(D) {
			var E = D.split(".");
			return {
				i: E[0],
				d: E[1]
			}
		},
		_getLeftTime: function(N) {
			var E = A.Paimai.RenderEnd;
			var W = E.start,
			S = + N.leftTime,
			D = + new Date();
			return S
		},
		_isSeen: function(E) {
			var D = L.offset(E);
			return L.scrollTop() >= D.top
		},
		_endTimeFormat: function(E) {
			var N, D;
			N = E % 60;
			D = Math.floor(E / 60);
			return {
				m: D < 10 ? "0" + D: D,
				s: N < 10 ? "0" + N: N
			}
		},
		_openTimer: function(W, X) {
			var N = A.Paimai.RenderEnd;
			var Y = N.timer;
			var S = N._getLeftTime(W),
			E = Math.floor(S / 1000);
			var D = "#item1";
			return (function() {
				Y[X] = A.later(function() {
					L.html(X + " .J_TimeLeft", A.substitute(R, N._endTimeFormat(E)));
					E--;
					if (E === - 1) {
						Y[X].cancel();
						A.one(X + " .button") && L.addClass(X + " .button", "time-out");
						if (N._isSeen(D)) {
							N.start = + new Date();
							A.ajax({
								type: "POST",
								url: P + W.itemId,
								success: function(Z) {
									N._renderInfo(Z, X)
								},
								dataType: "json"
							})
						}
					}
				},
				1000, true);
				N.timer = Y
			})
		},
		_renderInfo: function(S, W) {
			var D = A.Paimai.RenderEnd,
			E;
			var N = S.list;
			N && A.each(N, function(Y, X) {
				X = X + 1;
				var Z = W ? W: "#item" + X;
				E = D._splitPrice(Y.currentPrice),
				priceTpl = '<em>{i}.</em><em class="decimal">{d}</em>',
				imgHref = "http://item.taobao.com/item.htm?id=";
				A.one(Z + " .img") && A.one(Z + " .img").attr("src", Y.picUrl);
				A.one(Z + " .img") && A.one(Z + " .img").attr("alt", Y.title);
				A.all(Z + " a").attr("href", imgHref + Y.itemId);
				L.html(Z + " .name", Y.title);
				L.html(Z + " .J_PeopleNum", Y.bidCnt);
				L.html(Z + " .J_LeadPrice", A.substitute(priceTpl, E));
				A.one(Z + " .button") && L.removeClass(Z + " .button", "time-out");
				D._openTimer(Y, Z)()
			})
		},
		_lazyCallBack: function() {
			var E = A.Paimai.RenderEnd;
			var N = E.timer;
			var D;
			if (N.hasOwnProperty("#item1")) {
				return
			} else {
				A.ajax({
					type: "POST",
					url: P,
					success: function(S) {
						E._renderInfo(S)
					},
					dataType: "json"
				})
			}
		},
		init: function() {
			var E;
			var D = A.Paimai.RenderEnd;
			D.start = + new Date();
			A.use("datalazyload", function(N) {
				E = N.DataLazyload();
				N.available("#J_EndList", D._lazyCallBack)
			})
		}
	};
	A.Paimai.init = function(D) {
		A.mix(U, D);
		A.Paimai.Offer.init();
		A.Paimai.RenderFirst(U.ckeys);
		A.Paimai.SlidePic.init();
		A.Paimai.PriceOperation.init();
		A.Paimai.RenderNormal.init();
		A.Paimai.RenderEnd.init()
	}
});
/*pub-2|2011-10-31 11:45:58*/
(function(a) {
	function b() {
		var b = a.DOM,
		c = a.Event,
		d = {
			position: "right",
			align: "top",
			autoFit: ! 0,
			eventType: "mouse",
			delay: .1,
			disableClick: ! 0,
			width: 200,
			height: 200
		},
		e = function(a) {
			var b = a.target;
			e._target == b ? this.popup.style.display == "block" ? this.hide() : this.show() : this.show(b),
			a.preventDefault(),
			e._target = b
		},
		f = function(a) {
			var b = a.target;
			clearTimeout(this._popupHideTimeId);
			var c = this;
			this._popupShowTimeId = setTimeout(function() {
				c.show(b)
			},
			this.config.delay * 1e3),
			this.config.disableClick && ! b.onclick && (b.onclick = function(a) {
				a.preventDefault()
			})
		},
		g = function(a) {
			clearTimeout(this._popupShowTimeId);
			var c = a.relatedTarget;
			this.popup != c && ! b.contains(this.popup, c) && this.delayHide(c),
			a.preventDefault()
		},
		h = function(a) {
			var b = this.currentHandle ? this.currentHandle: this;
			if (this._handles) for (var c = 0, d = this._handles; c < d.length; ++c) clearTimeout(d[c]._popupHideTimeId);
			else clearTimeout(b._popupHideTimeId)
		},
		i = function(a) {
			var c = this.currentHandle ? this.currentHandle: this,
			d = a.relatedTarget;
			c.popup != d && ! b.contains(c.popup, d) && c.delayHide(d)
		};
		this.decorate = function(j, k, l) {
			j = b.query(j),
			k = b.get(k);
			if (!j || ! k) return;
			l = a.merge(d, l || {});
			var m = {};
			return m._popupShowTimeId = null,
			m._popupHideTimeId = null,
			m._beforeShow = function() {
				return ! 0
			},
			a.mix(m, a.EventTarget),
			a.mix(m, {
				popup: k,
				trigger: j,
				config: l,
				show: function(c) {
					if (!this._beforeShow(c)) return;
					var d = b.offset(c),
					e = [d.left, d.top];
					a.isArray(this.config.offset) && (e[0] += parseInt(this.config.offset[0]), e[1] += parseInt(this.config.offset[1]));
					var f = c.offsetWidth,
					g = c.offsetHeight,
					h = l.width,
					i = l.height,
					j = b.viewportWidth(),
					k = b.viewportHeight(),
					m = b.scrollLeft(),
					n = b.scrollTop(),
					o = e[0],
					p = e[1];
					l.position == "left" ? (o = e[0] - h, p = l.align == "center" ? p - i / 2 + g / 2: l.align == "bottom" ? p + g - i: p) : l.position == "right" ? (o = e[0] + f, p = l.align == "center" ? p - i / 2 + g / 2: l.align == "bottom" ? p + g - i: p) : l.position == "bottom" ? (p += g, o = l.align == "center" ? o + f / 2 - h / 2: l.align == "right" ? o + f - h: o) : l.position == "top" && (p -= i, o = l.align == "center" ? o + f / 2 - h / 2: l.align == "right" ? o + f - h: o),
					p < 0 && (p = 0),
					o < 0 && (o = 0),
					this.config.autoFit && p - n + i > k && (p = k - i + n - 2, p < 0 && (p = 0)),
					b.css(this.popup, {
						position: "absolute",
						top: p + "px",
						left: o + "px"
					});
					if (this.config.effect) {
						if (this.config.effect == "fade") {
							b.css(this.popup, "opacity", 0),
							b.show(this.popup);
							var q = new a.Anim(this.popup, {
								opacity: 1
							},
							.4);
							q.run()
						}
					} else b.show(this.popup);
					this.fire("afterShow", {
						trigger: c
					})
				},
				hide: function(a) {
					b.hide(this.popup),
					this.fire("afterHide", {
						trigger: a
					})
				},
				delayHide: function(a) {
					var b = this;
					this._popupHideTimeId = setTimeout(function() {
						b.hide(a)
					},
					this.config.delay * 1e3)
				}
			}),
			l.onShow && m.on("afterShow", l.onShow),
			l.onHide && m.on("afterHide", l.onHide),
			l.eventType == "mouse" ? (c.on(j, "mouseover", f, m, ! 0), c.on(j, "mouseout", g, m, ! 0), l.shareSinglePopup || (c.on(k, "mouseover", h, m, ! 0), c.on(k, "mouseout", i, m, ! 0))) : l.eventType == "click" && c.on(j, "click", e, m, ! 0),
			b.hide(k),
			m
		}
	}
	a.SimplePopup = new b
})(KISSY);

