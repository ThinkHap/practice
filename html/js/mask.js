    var oClick = document.getElementById("J_click");
    oClick.onclick = function(){
        showMsg(1);
        return false;
    }
    

//    function showMsg(num){
//        var html = document.documentElement, 
//            body = document.body, 
//            cW = html.clientWidth || body.clientWidth, 
//            cH = html.clientHeight || body.clientHeight, 
//            oH = document.body.offsetHeight,
//            sT = html.scrollTop || body.scrollTop, 
//            msgBox = document.getElementById("J_msg"),
//            msgMask = document.getElementById("J_mask"),
//            msg = "J_msg" + num,
//            box = document.getElementById(msg), 
//            areas = box.getElementsByTagName('area'), 
//            img = box.getElementsByTagName('img')[0];
//        msgBox.style.display = 'block';
//        msgMask.style.width = cW + 'px';
//        msgMask.style.height = oH + 'px';
//        box.style.cssText = 'margin-left: -' + img.width * 0.5 + 'px';
//        box.style.top = (cH - img.height) * 0.5 + sT + 'px';
//        box.style.display = 'block';
//        for (var i = 0; i < areas.length; i++) {
//            areas[i].onclick = function(){
//                msgBox.style.display = 'none';
//                box.style.display = 'none';
//                return false;
//            }
//        }
//    }

        function showMsg(num){
            var html = document.documentElement, 
                body = document.body, 
                cW = html.clientWidth || body.clientWidth, 
                cH = html.clientHeight || body.clientHeight, 
                oW = document.body.offsetWidth,
                oH = document.body.offsetHeight,
                sT = html.scrollTop || body.scrollTop, 
                msgBox = document.getElementById("J_msgbox"),
                msgMask = document.getElementById("J_mask"),
                msg = "J_msg" + num,
                box = document.getElementById(msg), 
                links = box.getElementsByTagName('a'); 
                //img = box.getElementsByTagName('img')[0];
            msgBox.style.display = 'block';
            msgMask.style.width = oW + 'px';
            msgMask.style.height = oH + 'px';
            box.style.cssText = 'margin-left: -126px';
            box.style.top = (cH -box.offsetHeight)*0.5 +sT +'px';
            //box.style.cssText = 'margin-left: -' + box.offsetWidth * 0.5 + 'px;margin-top:-' + box.offsetHeight * 0.5 + 'px;';
            //box.style.top = (cH - box.offsetHeight) * 0.5 + sT + 'px';
            //box.style.top = (cH - box.offsetHeight) * 0.5 + sT + 'px';
            box.style.display = 'block';
            for (var i = 0; i < links.length; i++) {
                //if (links[i].className.indexOf('close')){
                    links[i].onclick = function(){
                        msgBox.style.display = 'none';
                        box.style.display = 'none';
                        return false;
                    }
                //}
            }
        }

    
   
    
//    function ShowDiv(Imgid,oCloseid){
//    	  var oDiv = document.getElementById("Tcdiv");
//    	  oDiv.style.display = 'block' ;
//    	  
//    	  var Height = document.body.offsetHeight;
//    	  var Width = document.body.clientWidth;
//    	  var BodyDiv = document.getElementById("Bodybg");
//    
//    	  BodyDiv.style.width = Width + "px";
//    	  BodyDiv.style.height = Height + "px";
//    	  BodyDiv.style.display = "block";
//    	  
//    	  
//    	  var TabDIV = document .getElementById("DivMain");
//    	  var TabHeight = document.documentElement.clientHeight ;
//    	  var TabWidth = document.documentElement.clientWidth;
//    	  var Tabscroll = document.documentElement.scrollTop || document.body.scrollTop;
//    	  TabDIV.style.left = TabWidth / 2 - 333 / 2 + "px";
//    	  TabDIV.style.top = TabHeight / 2 - 165 / 2 + Tabscroll + "px";
//    	  TabDIV.style.display = "block";
//      
//      	  var oImg = document.getElementById(Imgid);
//    	  oImg.style.display = "block";
//    	  
//    	  var oClose = document.getElementById(oCloseid);
//    	  oClose.onclick = function(){
//    		  	Divclose(Imgid);
//    		};
//    		document.getElementById("Tenclose").onclick = function(){Divclose("oTen");return false;};
//    		document.getElementById("Hundredsclose").onclick = function(){Divclose("oHundreds");return false;};
//    		document.getElementById("Thousandsclose").onclick = function(){Divclose("oThousands");return false;};
//    		document.getElementById("Regretclose").onclick = function(){Divclose("oRegret");return false;};
//    		document.getElementById("oLose").onclick = function(){Divclose("oOpportunity");return false;};
//    		document.getElementById("oTmclose").onclick = function(){Divclose("oTm");return false;};
//    		function Divclose(closeimg){
//    			var Oimg = document.getElementById(closeimg);
//    			BodyDiv.style.display = "none" ;
//    			TabDIV.style.display = "none" ;
//    			Oimg.style.display = "none";
//    			oDiv.style.display = 'none' ;
//    		}
//    };
