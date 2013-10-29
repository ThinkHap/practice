(function(S){
    var S = KISSY, D = S.DOM, E = S.Event;
    var defaultConfig = {
        'trigger': '.J_bg', //勾子1
        'speed': '-0.5', //速率
        'trigger2': '.J_bg2', //勾子2
        'speed2': '0.2', //速率2
    };
    KISSY.add('component/bgview', function(S) {
        function Bgview(c) {
            var self = this;
            if (!(self instanceof Bgview)) {
                return new S.Bgview();
            }
            S.mix(defaultConfig, c);
            return self;
        }

        S.augment(Bgview, {
            init:function () {
                function bgScroll(obj, speed){
                    var scrollTop = D.scrollTop(),
                        scrollLeft = D.scrollLeft(),
                        viewportHeight = D.viewportHeight(),
                        objHeight = D.height(obj),
                        _objPos = D.css(obj, 'background-position');
                    if(!obj.attr('data-pos')){
                        obj.attr('data-pos', _objPos);
                    }
                    var objPos = obj.attr('data-pos'),
                        objPosX = objPos.split(" ")[0],
                        objPosY = objPos.split(" ")[1];
                    if(scrollTop + viewportHeight/4 > D.offset(obj).top && scrollTop + viewportHeight/4 < D.offset(obj).top + objHeight){
                        var len = scrollTop + viewportHeight/4 - D.offset(obj).top,
                            pos = parseFloat(objPosY) + len * speed;
                        D.css(obj, 'background-position', objPosX + " " + pos +'px');
                    }else if(scrollTop + viewportHeight/4 <= D.offset(obj).top){
                        D.css(obj, 'background-position', objPos);
                    }else if(scrollTop + viewportHeight/4 >= D.offset(obj).top + objHeight){
                        var len = objHeight,
                            pos = parseFloat(objPosY) + len * speed;
                        D.css(obj, 'background-position', objPosX + " " + pos +'px');
                    }
                }
                S.all(defaultConfig['trigger']).each(function(obj){
                    E.on(window, 'scroll load', function(){
                        bgScroll(obj, defaultConfig['speed']);
                    })
                }) 
                S.all(defaultConfig['trigger2']).each(function(obj){
                    E.on(window, 'scroll load', function(){
                        bgScroll(obj, defaultConfig['speed2']);
                    })
                }) 
            }
        });

        //return Bgview;
        S.Bgview = Bgview;
    });
})(KISSY);
