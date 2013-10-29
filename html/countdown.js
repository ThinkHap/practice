/*pub-1|2012-02-10 13:43:53*/
KISSY.add("Countdown", function(B, E, A) {
	var D = "http://paimai.taobao.com/json/get_legacy_auction.htm?";
	function C(G, H) {
		var F = {};
		this.container = G;
		this.config = B.merge(F, H);
		this.itemList = [],
		this.overList = [],
		this._init()
	}
	B.augment(C, B.EventTarget, {
		timer: function() {
			var N = this,
			J = N.itemList,
			G = N.overList,
			F = N.start,
			I, K = "paintOver";
			var O = B.merge({},
			B.EventTarget);
			function L(Q) {
				var P = + new Date();
				return Q - (P - F)
			}
			var M = function(R, T) {
				var Q = E.get("input.hour", R),
				P = E.get("input.min", R),
				S = E.get("input.sec", R);
				T = N._timeSplit(L(T));
				if (!T) {
					return false
				}
				E.val(Q, T.h);
				E.val(P, T.m);
				E.val(S, T.s);
				return true
			};
			function H() {
				if (J.length === 0) {
					I && clearTimeout(I);
					return
				}
				for (var W = 0; W < J.length; W++) {
					var X = J[W],
					S = X[0],
					V = X[1],
					Q = V.leftTime,
					T = V.end,
					R = V.timeToStart,
					P = V.start,
					U;
					if (R > 0) {
						U = M(S, R);
						if (!U) {
							O.fire(K, {
								isStart: true,
								nodeIndex: W
							})
						}
					} else {
						U = M(S, Q);
						if (!U) {
							O.fire(K, {
								isOver: true,
								nodeIndex: W,
								end: T
							})
						}
					}
				}
				I = setTimeout(H, 1000)
			}
			return {
				add: function(P) {
					J.push(P)
				},
				addOver: function(P) {
					G.push(P)
				},
				run: function() {
					H()
				},
				stop: function() {
					I && clearTimeout(I)
				},
				onStop: function() {
					var P = function(R) {
						var Q = B.indexOf(R, J);
						if (Q !== - 1) {
							J.splice(Q, 1)
						}
					};
					O.on(K, function(T) {
						var W, S, U, V, R = "{h}\u70b9{m}\u5206{s}\u79d2";
						if (T.isStart) {
							W = J[T.nodeIndex],
							S = W[0],
							U = W[1],
							V = U.leftTime;
							M(S, V);
							U.timeToStart = 0;
							N._changeStatus({
								isStart: true,
								node: S
							})
						}
						if (T.isOver) {
							W = J[T.nodeIndex],
							S = W[0];
							var X = E.get("span.J_TimeLeft", S),
							Q = T.end;
							E.html(X, B.substitute(R, N._timeFormat(Q)));
							N._changeStatus({
								isOver: true,
								node: S
							});
							P(S)
						}
					})
				}
			}
		},
		_init: function() {
			var G = this,
			F = G.container;
			G.start = + new Date();
			G._getList();
			G._getData()
		},
		_getList: function() {
			var H = this;
			var K = E.query(".paimai-item");
			var G = [],
			J = [];
			for (var I = 0, F = K.length; I < F; I++) {
				G[K[I].getAttribute("data-itemid")] = K[I];
				J.push(K[I].getAttribute("data-itemid"))
			}
			H._itemEls = G;
			H._itemIds = J;
			return {
				itemsEls: G,
				itemIds: J
			}
		},
		_getData: function() {
			var G = this,
			J = G._itemEls,
			F = G._itemIds;
			if (F.length == 0) {
				var I = G.timer();
				I.onStop();
				I.run();
				new A("#J_TabContainer");
				G._getMpp();
				return
			}
			var H = F.splice(0, 20);
			G._itemIds = F;
			B.getScript(D + "itemIds=" + H.join(",") + "&t=" + new Date().getTime(), function() {
				if (!getLegacyAuction) {
					return
				}
				var M = getLegacyAuction.list;
				getLegacyAuction = null;
				for (var L = 0, K = M.length; L < K; L++) {
					G._paint(J[M[L].itemId], M[L])
				}
				G._getData()
			})
		},
		_paint: function(U, Z) {
			var O = Z.itemId,
			Q = Z.leftTime,
			I = Z.end,
			W = Z.timeToStart,
			M = Z.currentPrice,
			V = Z.bidCnt,
			L = Z.quantity,
			X = E.get(".pai-button", U),
			R = this,
			F = R._timeFormat,
			N = this.timer();
			template = "{h}\u70b9{m}\u5206{s}\u79d2";
			var T = E.get(".big-price", U),
			S = E.get(".decimal", U),
			J = E.get(".label", U),
			G = E.get(".J_AuctionCount", U),
			K = E.get(".storage", U),
			H = E.get(".J_TimeTitle", U),
			Y = M.split(".");
			E.html(T, Y[0] + ".");
			E.html(S, Y[1]);
			E.html(G, V);
			E.html(K, L);
			if (W > 0) {
				E.html(H, "\u8ddd\u79bb\u5f00\u62cd");
				E.addClass(X, "will-begin")
			}
			if (Q < 0) {
				var P = E.get("span.J_TimeLeft", U);
				R._changeStatus({
					isOver: true,
					node: U
				});
				E.addClass(X, "time-out");
				if (V > 0) {
					E.html(J, "\u6210\u4ea4\u4ef7\u683c")
				}
				E.html(P, B.substitute(template, F(I)));
				N.addOver(U);
				return
			}
			N.add([U, Z])
		},
		_changeStatus: function(M) {
			var Q = ".J_PriceTitle",
			H = ".J_TimeTitle",
			S = ".pai-button",
			L = ".J_AuctionCount",
			O = "\u6210\u4ea4\u4ef7\u683c",
			P = "\u6210\u4ea4\u65f6\u95f4",
			K = "\u7ed3\u675f\u65f6\u95f4",
			G = "\u5269\u4f59\u65f6\u95f4";
			var J = M.node,
			R = E.get(Q, J),
			N = E.get(H, J),
			I = E.get(S, J),
			F = E.get(L, J);
			if (M.isStart) {
				E.html(N, G);
				E.removeClass(I, "will-begin")
			}
			if (M.isOver) {
				if (E.html(F) > 0) {
					E.html(N, P);
					E.html(R, O)
				} else {
					E.html(N, K)
				}
				E.removeClass(I, "will-begin");
				E.addClass(I, "time-out")
			}
		},
		_timeSplit: function(I) {
			var H = this,
			M = H._addZero,
			L = Math.floor(I / 1000);
			if (L < 0) {
				return false
			}
			var K = L % 60,
			J = Math.floor(L / 60) % 60,
			F = Math.floor(L / 3600) % 24,
			G = parseInt((L / 3600) / 24, 10);
			return {
				d: G,
				s: M(K),
				m: M(J),
				h: M(F + 24 * G)
			}
		},
		_timeFormat: function(H) {
			var G = this,
			J = G._addZero,
			F = new Date(Number(H));
			var I = F.toTimeString().slice(0, 8).split(":");
			return {
				h: I[0],
				m: I[1],
				s: I[2]
			}
		},
		_addZero: function(F) {
			if (F < 10) {
				F = "0" + F
			}
			return F
		},
		_getMpp: function() {
			var G = this,
			K = G._itemEls,
			F = G._itemIds;
			function I(L) {
				J(K[L.itemId], L)
			}
			function J(P, R) {
				var O = E.get("em.J_AuctionCount", P),
				Q = E.get(".big-price", P),
				S = E.get(".decimal", P),
				N = R.price,
				M = R.totalCnt;
				var L = N.split(".");
				E.html(Q, L[0] + ".");
				E.html(S, L[1]);
				E.html(O, M)
			}
			var H = "http://a.tbcdn.cn/p/tstart/1.0/build/tb-mpp-min.js?t=20110920.js";
			B.getScript(H, function() {
				if (!g_config) {
					return
				}
				Mpp.Notify.register({
					appId: g_config.appId,
					type: 1,
					callback: I
				})
			})
		}
	});
	return C
},
{
	requires: ["dom", "Switch"]
});
KISSY.add("Switch", function(D, E, B, A) {
	var F;
	function C(H, I) {
		var G = {
			markupType: 0,
			effect: "none",
			steps: 1,
			triggerType: "click"
		};
		this.container = H;
		this.config = D.merge(G, I);
		this._init()
	}
	D.augment(C, {
		_init: function() {
			var I = this,
			H = I.config,
			G = I.container;
			if (!D.get(G)) {
				return
			}
			I.curIndex = 0;
			F = new A(G, H);
			I._switchCtrl();
			I._timeEnd()
		},
		_timeEnd: function() {
			if (!D.isObject(F)) {
				return false
			}
			var G = this;
			H();
			function H() {
				setInterval(function() {
					var J = G._getArea(),
					I = G.curIndex;
					if (J === I + 2) {
						G._switchCtrl()
					}
				},
				2000)
			}
		},
		_switchCtrl: function() {
			var G = this;
			function K(M) {
				var L = F.panels[M - 1],
				N = D.all(".time-out", L);
				itemEl = D.all(".paimai-item", L);
				if (N) {
					if (N.length == itemEl.length) {
						return true
					}
				}
				return false
			}
			function J(L) {
				if (L < 4 && K(L)) {
					L += 1
				}
				return L
			}
			function I() {
				var L;
				switch (G._getArea()) {
				case 1:
					L = J(1);
					break;
				case 2:
					L = J(2);
					break;
				case 3:
					L = J(3);
					break;
				case 4:
					L = J(4);
					break;
				default:
					L = 0
				}
				L--;
				return L
			}
			function H(N) {
				var M = F.panels[N],
				P = D.all(".paimai-item", M),
				L = [];
				for (var O = 0; O < P.length; O++) {
					var Q = E.attr(P[O], "data-itemid");
					Q && L.push(Q)
				}
				window.g_config = {
					appId: 1009,
					itemId: L
				}
			}
			G.curIndex = I();
			F.switchTo(G.curIndex);
			H(G.curIndex)
		},
		_formatTime: function(G) {
			var H = new Date();
			H.setHours(G);
			H.setMinutes(0);
			H.setSeconds(0);
			return H
		},
		_getArea: function() {
			var P = this,
			H = + new Date();
			var K = + P._formatTime(10),
			N = + P._formatTime(13),
			L = + P._formatTime(13),
			G = + P._formatTime(16),
			J = + P._formatTime(16),
			I = + P._formatTime(19),
			M = + P._formatTime(19),
			O = + P._formatTime(22);
			if ((H >= K && H <= N) || H < K) {
				return 1
			} else {
				if ((H >= L && H <= G) || (H > G && H < J)) {
					return 2
				} else {
					if ((H >= J && H <= I) || (H > I && H < M)) {
						return 3
					} else {
						if ((H >= M && H <= O) || H > O) {
							return 4
						} else {
							return 0
						}
					}
				}
			}
		}
	});
	return C
},
{
	requires: ["dom", "event", "switchable"]
});
KISSY.add("tiantian", function(C, E, A, B, D) {
	function F() {
		new D()
	}
	return F
},
{
	requires: ["dom", "event", "Switch", "Countdown"]
});

