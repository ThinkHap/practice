/*pub-2|2011-12-07 10:18:43*/document.domain="taobao.com",KISSY.add("Countdown",function(a){function d(b,c){if(!(this instanceof d))return new d(b,c);
b=a.get(b);
if(!b)return;
this.container=b,this.config=a.merge(d.Config,c),this._init()}var b=a.DOM,c="afterPaint";
d.Config={effect:"normal",_varReg:/\$\{([\-\w]+)\}/g,_clock:["d",100,2,"h",1e3,2,"m",60,2,"s",60,2,"u",10,1]};
var e=function(){function d(){var a=+(new Date),e=100-a+d.lastTime,f,g;
while(c.length)c.shift()();
for(f=0,g=b.length;
f<g;
f+=2){b[f+1]+=2;
if(b[f+1]===21||(b[f+1]&1)===0)b[f](a),b[f+1]&=1}d.lastTime=a,e=e>0?e:0,setTimeout(d,e)}var b=[],c=[];
return d.lastTime=+(new Date),setTimeout(d,100),{add:function(a,d){c.push(function(){b.push(a),b.push(d===1e3?1:0)})},remove:function(d){c.push(function(){var c=a.indexOf(d,b);
c!==-1&&b.splice(a.indexOf(d,b),2)})}}}();
a.augment(d,a.EventTarget,{_init:function(){var c=this,d=c.config,f=d._varReg,g=d._clock,h=c.container,i=[];
this._notify=[],c.hands=i,c.frequency=1e3,c.total=d.total||parseInt(b.attr(h,"data-time"),10),c.startAt=+(new Date),f.lastIndex=0,h.innerHTML=h.innerHTML.replace(f,function(a,b){if(b==="u"||b==="s-ext")c.frequency=100;
var d="";
return b==="s-ext"?(i.push({type:"s"}),i.push({type:"u"}),d=c._html("","s","handlet")+c._html(".","","digital")+c._html("","u","handlet")):i.push({type:b}),c._html(d,b,"hand")}),a.each(i,function(b){var c=b.type,d=100,e;
b.node=a.one(h).one(".hand-"+c);
for(e=g.length-3;
e>-1;
e-=3){if(c===g[e])break;
d*=g[e+1]}b.base=d,b.radix=g[e+1],b.bits=g[e+2]}),c._reflow(c.startAt);
var j=c._reflow;
c._reflow=function(a){return j.call(c,a)},e.add(c._reflow,c.frequency)},_reflow:function(b){var c=this.total+this.startAt-b;
return c<this.frequency&&(e.remove(this._reflow),this.fire("end")),a.each(this.hands,function(a){a.lastValue=a.value,a.value=Math.floor(c/a.base)%a.radix}),this._repaint(),this._notify[c]&&a.each(this._notify[c],function(a){a()}),this},_repaint:function(){var a=this,b=a.config.effect;
d.Effects[b].paint.apply(a),a.fire(c)},_toDigitals:function(a,b){a=a<0?0:a;
var c=[];
while(b--)c[b]=a%10,a=Math.floor(a/10);
return c},_html:function(b,c,d){a.isArray(b)&&(b=b.join(""));
switch(d){case"hand":c=d+" hand-"+c;
break;
case"handlet":c=d+" hand-"+c;
break;
case"digital":b==="."?c=d+" "+d+"-point "+c:c=d+" "+d+"-"+b+" "+c}return'<s class="'+c+'">'+b+"</s>"},notify:function(a,b){var c=this._notify[a]||[];
return c.push(b),this._notify[a]=c,this}}),a.Countdown=d}),KISSY.add("CountdownEffects",function(a){var b=a.DOM,c=a.Countdown;
c.Effects={normal:{paint:function(){var b=this,c;
a.each(b.hands,function(d){d.lastValue!==d.value&&(c="",a.each(b._toDigitals(d.value,d.bits),function(a){c+=b._html(a,"","digital")}),d.node.html(c))})}},slide:{paint:function(){var b=this,d,e,f,g;
a.each(b.hands,function(a){if(a.lastValue!==a.value){d="",e=a.bits,f=b._toDigitals(a.value,e),a.lastValue===undefined?g=f:g=b._toDigitals(a.lastValue,e);
while(e--)g[e]!==f[e]?d=b._html([b._html(f[e],"","digital"),b._html(g[e],"","digital")],"slide-wrap")+d:d=b._html(f[e],"","digital")+d;
a.node.html(d)}}),c.Effects.slide.afterPaint.apply(b)},afterPaint:function(){a.each(this.hands,function(a){if(a.lastValue!==a.value&&a.lastValue!==undefined){var b=a.node,c=b.one(".digital").height();
b.css("height",c),b.all(".slide-wrap").css("top",-c).animate("top: 0",.5,"easeIn")}})}},flip:{paint:function(){var b=this,d,e,f;
a.each(b.hands,function(c){c.lastValue!==c.value&&(d="",e="",f="",a.each(b._toDigitals(c.value,c.bits),function(a){e+=b._html(a,"","digital")}),c.lastValue===undefined?c.node.html(e):(e=b._html(e,"handlet"),a.each(b._toDigitals(c.lastValue,c.bits),function(a){f+=b._html(a,"","digital")}),d=b._html(f,"handlet mask"),f=b._html(f,"handlet"),c.node.html(e+f+d)))}),c.Effects.flip.afterPaint.apply(b)},afterPaint:function(){a.each(this.hands,function(a){if(a.lastValue!==a.value&&a.lastValue!==undefined){var b=a.node,c=b.all(".handlet"),d=c.item(0),e=c.item(1),f=c.item(2),g=b.width(),h=b.height(),i=Math.floor(h/2),j=h-i;
e.css({clip:"rect("+i+"px, "+g+"px, "+h+"px, 0)"}),f.css({overflow:"hidden",height:i+"px"}),f.animate({top:i+"px",height:0},.15,"easeNone",function(){f.html(d.html()),f.css({top:0,height:i+"px",clip:"rect("+i+"px, "+g+"px, "+h+"px, 0)"}),f.animate("height: "+h+"px",.3,"bounceOut")})}})}}}}),function(a){var b=function(){},c=window.location.search;
DEBUG=!1,c.indexOf("debug")>-1&&(console=window.console||{log:b,error:b,info:b,warn:b},DEBUG=!0,window.DEBUG=DEBUG),a.app("Guess");
var d={attributes:{},CONST:{EMPTY:b},set:function(a,b,c){var d=this.attributes[a];
return d!==b&&(this.attributes[a]=b,c||this.fire("change:"+a,{old:d,now:b})),this},get:function(a,b){return b?this.CONST[a]:this.attributes[a]},init:function(b){this.attributes=a.clone(this.attributes),a.mix(this.attributes,b),this._init&&this._init()},bind:function(b,c){if(a.bind)return a.bind(b,c);
c=c||this;
var d=a.makeArray(arguments).slice(2);
if(b instanceof Function)return function(){var e=a.makeArray(arguments);
b.apply(c,e.concat(d))}}};
Guess.StdClass=d}(KISSY),Guess.add("panel-api",function(a){function c(){this.init.apply(this,arguments)}var b=KISSY,d=a.StdClass.get("EMPTY",!0);
b.augment(c,b.EventTarget),b.augment(c,a.StdClass),b.augment(c,{attributes:{success:d,error:d,times:0,max:5,url:"",ids:"",duration:300},_init:function(){var a=this.get("url");
if(!a){DEBUG===!0&&console.error("\u914d\u7f6eurl\u4e0d\u80fd\u4e3a\u7a7a");
return}var b=this.get("ids");
b=b.join(","),this.set("ids",b,!0),this.set("error",this._error,!0),this.set("success",this._success,!0)},load:function(){var a=b.io;
a({url:this.get("url"),data:{ids:this.get("ids")},success:this.bind(this.get("success"),this),error:this.bind(this.get("error"),this),dataType:"jsonp",jsonp:"jsoncallback"})},_error:function(){var a=this.get("times"),c=this.get("max");
a<c&&(a+=1,this.fire("error",{times:a}),this.set("times",a,!0),b.later(this.load,this.get("duration"),!1,this)),DEBUG===!0&&console.log("\u52a0\u8f7d\u6570\u636e\u5931\u8d25")},_success:function(a){this.fire("success",{data:a}),this.set("times",this.get("max"))}}),Guess.Api=c}),Guess.add("guess-panel",function(a){
    var b=KISSY,
        c=function(){this.init.apply(this,arguments)};
    b.augment(c,b.EventTarget),
    b.augment(c,a.StdClass),
    b.augment(c,{
        attributes:{
            base:".J_timmer",
            end:0,
            id:"",
            life:"baby",
            type:"comming",
            tip:".J_preTitle",
            timmer:".J_timmer",
            total:0
        },
        CONST:{
            tips:{
                going:"\u3010\u6b63\u5728\u8da3\u5473\u731c\u3011",
                finish:"\u3010\u5f00\u5956\u8da3\u5473\u731c\u3011",
                comming:"\u3010\u5373\u5c06\u8da3\u5473\u731c\u3011"
            }
        },
        _init:function(){
            var a=this.get("base");
            if(!a.nodeType||a.nodeType!=="-ks-Node")
                a=b.one(a),this.set("base",a,!0);
            if(!a)  return;
            var c=this.get("timmer");
            c=a.one(c),
            this.set("timmer",c,!0),
            this.set("end",parseInt(this.get("end"),10),!0),
            this.set("start",parseInt(this.get("start"),10),!0),
            this._bind(),
            this._setLife()
        },
        _setLife:function(){
            var a=this.get("end"),
                b=this.get("start"),
                c,
                d=this.get("total");
            b?(d=b,c="comming",this.set("start",0)):a?(d=a,c="going",this.set("end",0)):c="finish",
            this.set("total",d,!0),
            this.set("life",c)
        },
        _bind:function(){
            this.on("change:life",this._status,this)
        },
        _status:function(a){
            a.old==="baby"&&(a.old=this.get("type"));
            var b=this.get("base");
            b.removeClass(a.old).addClass(a.now);
            var c=this.get("tips",!0);
            b.one(".J_preTitle").html(c[a.now]),
            a.now!=="finish"?this._countdown():this.get("timmer").remove()
        },
        _countdown:function(){
            var a=this.get("timmer"),
                c=this.get("total")*1e3,
                d=this;
            b.use("Countdown",function(){
                var e=new b.Countdown(a,{total:c});
                e.on("end",function(){
                    a.html('<span class="tips">\u8ddd\u79bb\u63ed\u6653\u65f6\u95f4\u8fd8\u6709\uff1a</span><span class="timmer-countdown">${h}\u65f6${m}\u5206${s}\u79d2</span>'),
                    d._setLife()
                })
            })
        }
    }),
    a.Panel=c}),Guess.use("guess-panel,panel-api",function(a){var b=KISSY,c={};
c.ids=[],c.url="http://cai.taobao.com/GetAttendTotalUserCount.do";
var d={},e=b.all(".J_panel");
e.each(function(b){var d=b.attr("data-id"),e=b.attr("data-end"),f=b.attr("data-start"),g=b.attr("data-life");
c.ids.push(b.attr("data-id")),g!="finish"&&new a.Panel({base:b,end:e,start:f})});
var f=new a.Api(c);
f.on("success",function(a){a=a.data,e.each(function(){b.one(this).one(".num").html(a[b.one(this).attr("data-id")].star)})}),f.load()}),KISSY.ready(function(a){a.use("datalazyload",function(a){var b=a.DataLazyload()}),KISSY.io({url:activityUrl,type:"get",dataType:"jsonp",data:{activityId:activityId},jsonp:"jsoncallback",success:function(a){a.success&&KISSY.use("event,switchable,template",function(b,c){var e=b.Template('<ul class="news-items">{{#each result}}<li><span>{{_ks_value.createTime}} <a href="http://cai.taobao.com/guess_detail.htm?activityId='+activityId+'" target="_blank">\u83b7\u5f97\u514d\u5355</a></span>{{_ks_value.nick}}</li>{{/each}}{{#if result.length>6}}{{#each result}}<li><span>{{_ks_value.createTime}} <a href="http://cai.taobao.com/guess_detail.htm?activityId='+activityId+'" target="_blank">\u83b7\u5f97\u514d\u5355</a></span>{{_ks_value.nick}}</li>{{/each}}{{/if}}</ul>');
b.one("#J_Gift").html(e.render(a));
if(a.result.length>6){var f=b.Slide("#J_Gift",{contentCls:"news-items",hasTriggers:!1,effect:"scrolly",interval:3,duration:.5});
f.length=f.length/2}})}})});

