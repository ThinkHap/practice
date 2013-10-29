KISSY.ready(function(S){
        var Event = S.Event, DOM = S.DOM, UA = S.UA, handle;
        S.use('switchable',function(){
            new S.Accordion('#J_ECM2_Accordion',{
                triggerType: 'mouse'
            });
        });
        Event.on('#J_ECM2_ImgMask a','mouseenter',function(){
//        DOM.css(DOM.children(this,'.J_Mask'),'visibility','visible');
            handle = S.Anim(DOM.children(DOM.children(this,'.J_Mask'),'s'),{opacity:'0.2',filter:'alpha(opacity=100)'}, 0.3, 'easeOut');
            handle.run();
            if(UA.ie <= 7){DOM.css(DOM.children(DOM.children(this,'.J_Mask'),'s'),'filter','alpha(opacity=30)');}
        });
        Event.on('#J_ECM2_ImgMask a','mouseleave',function(){
      //      DOM.css(DOM.children(this,'.J_Mask'),'visibility','hidden');
            if(handle)handle.stop();
            S.Anim(DOM.children(DOM.children(this,'.J_Mask'),'s'),{opacity:'0',filter:'alpha(opacity=0)'}, 0.1, 'easeOut').run();
        });
    });

