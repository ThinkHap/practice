KISSY.add('Bounce', function(S) {
    var S = KISSY, D = S.DOM, E = S.Event;
    var POSITION = 'position', RELATIVE = 'relative', ABSOLUTE = 'absolute',
        PX = 'px', X = 'x', Y = 'y',
        defaultPosition = [0, 0];

    //var conf = {
    //    J_bounce: '.bounce-list', //��Ҫ�����Ԫ��class
    //    height: 10,   //�����ĸ߶ȣ���λpx
    //    time: 1000,  //���������ʱ��
    //    duration: 200  //��������ʱ��
    //};

    /**
     * �๹����
     */
    function Bounce(container, config) {
        var self = this;

        if (!(self instanceof Bounce)) {
            return new S.Bounce();
        }

        self.container = container = S.one(container);
        if(!container) {
            return;
        }

        Bounce.superclass.constructor.call(self, config)

        //conf = S.merge(conf, config);

        self._init();
    }

    Bounce.ATTRS = {
        trigger: {
            value: '.bounce-list'
        },
        axis: {  //��������ˮƽ����(X) or ��ֱ����(Y)
            value: 'Y'
        },
        position: { //px, ˮƽ�ʹ�ֱ�����ϣ���Ը�Ԫ�ص�λ�ã� y  or [x,y], Ĭ��Ϊ[0,0]
            value: defaultPosition,
            setter: function(v) {
                var tmp = S.makeArray(v),
                    deft = this.get(POSITION);
                if (S.isUndefined(tmp[0])) {
                    tmp[1] = deft[1];
                }
                return tmp;
            },
            getter: function(v){
                var tmp = S.makeArray(v),
                    deft = defaultPosition;
                if(S.isUndefined(tmp[0])){
                    tmp = deft;
                }else if (S.isUndefined(tmp[1])) {
                    tmp[1] = deft[1];
                }
                return tmp;
            }
        },
        zIndex: {
            value: 99
        },
        duration: { //s, �����ٶ�
            value: 0.2
        },
        interval: { //s, ���ʱ��
            value: 2
        },
        offset: {
            value: 10
        },
        effect: { //����Ч��
            value: ['backOut', 'backOut']
        }
    };

    S.extend(Bounce, S.Base);

    /**
     * ��չԭ�ͷ���
     */
    S.augment(Bounce, {
        _init:function(){
            var self = this,
                position = self.get(POSITION);

            //console.log(self.get('trigger'));
            var lists = self.container.all(self.get('trigger'));
            if(lists.length === 0) { return; }

            lists.each(function(elem){
                var list = S.one(elem);    
                //console.log(list);
                if(list.css(POSITION) !== ABSOLUTE) {
                    var x = position[0] || 0,
                        y = position[1] || 0;
                    list.css({position: RELATIVE, left: x + PX, top: y + PX, zIndex: self.get('zIndex')});
                }
            });
            self._autoPlay();
        },
        _autoPlay:function(){
            var self = this;
            var lists = self.container.all(self.get('trigger'));
            var interval = self.get('interval') * 1000;
            var timer = S.later(function(){
                self._bindUI(lists);       
            }, interval);
        },
        _bindUI:function(lists){
            var self = this;
            var len = lists.length
            var ram = Math.floor(Math.random()*len); 
            self._anim(S.one(lists[ram]));
        },
        _anim:function(list){
            var self = this;
            var axis = self.get('axis'),
                duration = self.get('duration'),
                offset = self.get('offset'),
                effect = self.get('effect');

            if(typeof(effect) == 'string') {
                effect = [effect, effect];
            }

            var list_left = parseInt(list.css('left'));
            var list_top = parseInt(list.css('top'));
            var position = [list_left, list_top];
            if(axis == 'X'){
                console.log('x');
                list.animate({left: position[0] + offset + PX}, duration, effect[0], function(){list.animate({left: position[0] + PX}, duration, effect[1], self._autoPlay())});
            }else if(axis == 'Y'){
                list.animate({top: position[1] + offset + PX}, duration, effect[0], function(){list.animate({top: position[1] + PX}, duration, effect[1], function(){self._autoPlay()})});
            }
        }
    });

    S.Bounce = Bounce;
    return Bounce;
},{
});
