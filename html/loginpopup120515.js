/**
 * \u767b\u5f55\u5f39\u51fa\u7a97
 */
KISSY.add('LoginPopup', function() {
    var S = KISSY, D = S.DOM, E = S.Event;
    var LoginPopup = function() {
        var config = {
                redirect_url: window.location.href,
                triggers: '.J_CheckLogin',
                loginType: 'taobao',
                isRedirectToA: true, //登录后是否直接跳转到a链接的href属性
                mask: true,
                isCheckLongOrTrueLogin: false //登录的判断标准是否认为长登录也是需要弹出浮出层（包括 长登录 和 真正登录） 默认登录是指真正登录 不包含长登录
            }, 

            init = function(cfg) {
                config = S.merge(config, cfg);                     
                var triggers = S.query(config.triggers);
                if (!triggers) return;
                E.on(triggers, 'click', clickHandler);
            },

            //验证是否真正登录
            checkTrueLogin = function() {
                var login = S.Cookie.get('login') == 'true',
                    aNick = S.Cookie.get('a_nk'), // 支付宝用户昵称，Session 内有效
                    nick = S.Cookie.get('_nk_'); // 用户昵称，Session 内有效
                    return login && nick || login && aNick;
            },

            //验证是否登录（包括长登录）
            checkLongOrTrueLogin = function () {
                var trackNick = S.Cookie.get('tracknick');//上一次登录的用户名
                    ck1 = S.Cookie.get('ck1'); // 长登录标志
                    return checkTrueLogin() || trackNick && ck1;
            },

            //单击验证 请求浮出层
            clickHandler = function(e) {
                if (checkTrueLogin()) return; 
                if (config.isCheckLongOrTrueLogin && checkLongOrTrueLogin()) return; 
                e.preventDefault();
                var redirect = (config.isRedirectToA) ? e.currentTarget.href : config.redirect_url;
                showLoginPopup({redirect_url: redirect});
            },

            //showLoginPopup显示弹出层
            /*cfg = {
             *    redirect_url: window.location.href, //登录完成后跳转的地址
             *    loginType: '', //默认首次展现哪个tab  可选值为 taobao alipay 默认为alipay   
	         *    mask: true
             * }
             */
            showLoginPopup = function (cfg) {
                config = S.merge(config, cfg);                     
				if (window.loginFormPopup) {
                    //如果登录弹出层已经初始化一次 无需再次初始化 只需改变iframe的src的值
                    KISSY.ChangeIframeSrc(config.redirect_url, config.loginType);
                    window.loginFormPopup.show();
					S.Stat.pv("#J_LoginPopup"); 
                    window.loginFormPopup.center();
                } else {
                    var host = (window.location.href.indexOf('i.daily.etao.net') === -1) ? 'i.etao.com' : 'i.daily.etao.net',
						scriptUrl = 'http://' + host + '/templates/loginpopup.php?logintype=' + config.loginType + '&redirect_url=' + encodeURIComponent(config.redirect_url);
						// scriptUrl = 'http://localhost/myetao/template/login/loginpopup.php?logintype=' + config.loginType + '&redirect_url=' + encodeURIComponent(config.redirect_url);
                        //scriptUrl = 'http://taobao104-pc/myetao/template/ansy/loginpopup.php?redirect_url=' + encodeURIComponent(config.redirect_url) + '&logintype=' + config.loginType;
                        S.getScript('http://a.tbcdn.cn/apps/e/login/120510/loginpopup.css');  
                    /*S.getScript(scriptUrl, {
                            success: function() {
                                var popupContainer = document.createElement('div'),
									loginFormPopup;
                                document.body.appendChild(popupContainer);
                                D.html(popupContainer, window.LoginPopupHtml, true);
                                S.use('overlay', function() {
                                    loginFormPopup = new S.Popup({
                                        srcNode: '#J_LoginPopup',
                                        width: 342,
                                        height: 378,//iframe\u6700\u5408\u9002\u7684\u9ad8\u5ea6\u662f400
                                        mask: config.mask,
                                        zIndex: 10001
                                    });                    
									window.loginFormPopup = loginFormPopup;
                                    loginFormPopup.center();
                                    loginFormPopup.show();
                                });
                                //初始化关闭按钮，这里关闭按钮的class是J_CloseLoginBtn 支持在浮出层上添加其他的关闭按钮
                                var closeLoginBtn = S.all('.J_CloseLoginBtn');
                                if (!closeLoginBtn.length) return;
                                closeLoginBtn.on('click', function() {
                                    loginFormPopup.hide();                    
                                });
								S.Stat.init("#J_LoginPopup"); 
                            }
                    });*/
                    KISSY.use("overlay", function (S, Overlay) {
                        S.getScript(scriptUrl, function () {
                            var loginFormPopup = new Overlay({
                                width:342,
                                height: 378,//iframe最合适的高度是400
                                mask: config.mask,
                                zIndex: 10001
                            });
                            loginFormPopup.render();
                            loginFormPopup.get("contentEl").html(window.LoginPopupHtml, true);
                            loginFormPopup.center();
                            loginFormPopup.show();
                            window.loginFormPopup = loginFormPopup;
                            var closeLoginBtn = S.all('.J_CloseLoginBtn');
                            if (!closeLoginBtn.length) return;
                            closeLoginBtn.on('click', function() {
                                loginFormPopup.hide();
                            });
                            S.Stat.init("#J_LoginPopup");
                        });
                    });
                }
            };
        return {
            init: init,
            showLoginPopup: showLoginPopup,
            checkTrueLogin: checkTrueLogin,
            checkLongOrTrueLogin: checkLongOrTrueLogin
        };
    };
    KISSY.LoginPopup = LoginPopup;
});

