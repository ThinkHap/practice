<!DOCTYPE html>
<html>
    <head>
        <meta charset="gbk" />
        <title>demo</title>
        <style type="text/css">
            body, form, h1, h2, h3, h4, p, img, ul, li, ol, dl, dt, dd, a, span, input, tr, th, td{margin:0;padding:0;}
		    body {font:normal 12px/1.5 "Arial","宋体","Simsun","Tahoma",sans-serif;}
		    li{list-style:none;}
		    img {border:0 none;vertical-align:top;}
		    table {border-collapse:collapse;border-spacing:0;}
            .cf:after{display:block;visibility:hidden;font-size:0;line-height:0;clear:both;content:"";}  
            .cf{zoom:1;}
		    a{color:#000;text-decoration:none;}
		    a:visited{}
		    a:hover{text-decoration:underline;}
		    a:active{}
        </style>
         <script src="http://a.tbcdn.cn/s/kissy/1.1.6/kissy-min.js?t=20111130.js"></script>
    </head>
    <body>
        <a href="#" title="" target="_blank">请登录</a>
        <script>
            function isLogin(){
                if (KISSY.Cookie.get('login')){
                        alert("你已经登录");
                }else {
                    alert("请登录")
                }
            }
            isLogin();

        </script>
    </body>
</html>
