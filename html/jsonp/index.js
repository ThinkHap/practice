(function(S){
  var DOM = S.DOM;
  var timeout = 2000;
  var ju = DOM.get(".jump-text02");
  //setTimeout(DOM.show(ju),3000);
  S.later(function(){
    DOM.show(ju);
    }, timeout);
  
  var item = DOM.query("#url_div");
  var url = DOM.attr(item,"href");
  if(url == ""){
		return;  
	}
	
  
  var ajax = DOM.attr(item,"name");
  
  
	function getInfo(){ 
            S.io({
                dataType: 'jsonp',
                url: url,
                data: {
                    't': new Date().getTime()+Math.ceil(Math.random()*1000)
                },
                json: "callback",
                jsonpCallback: "json_callback",
                success: function(data){
                    if (data && data.url) {
						DOM.attr(item,"href", data.url);
						jump();
					}
                }
            });
        }
	if(ajax == "true"){
        getInfo();
	}

	function jump(){
		try{
			document.getElementById("url_div").click();
		}catch(e){
			window.location.href = DOM.attr(item,"href");
		};	
	}
	
  


})(KISSY);
