<!DOCTYPE html>
<html>
    <head>
        <meta charset="gbk" />
        <title>demo</title>
        <style type="text/css">
            body, form, h1, h2, h3, h4, p, img, ul, li, ol, dl, dt, dd, a, span, input, tr, th, td{margin:0;padding:0;}
		    body {font:normal 12px/1.5 "Arial","����","Simsun","Tahoma",sans-serif;}
		    li {list-style:none;}
		    img {border:0 none;vertical-align:top;}
		    table {border-collapse:collapse;border-spacing:0;}
            .clear-fix:after {display:block;visibility:hidden;font-size:0;line-height:0;clear:both;content:"";}  
            .clear-fix {zoom:1;}
		    a {color:#000;text-decoration:none;}
		    a:hover {color:#f44;text-decoration:underline;}
            
        </style>
        <script src="http://a.tbcdn.cn/s/kissy/1.2.0/kissy.js"></script>
        <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.9.0/jquery.js"></script>
        <style type="text/css">
            .wrap {
                width:400px;
                height:400px;
                margin: 50px 0 0 50px;
                border:1px solid #00f;
                position:relative;
            }
            .center {
                position:absolute;
                top: 50%;
                left: 50%;
                display:block;
                width: 100px;
                height:100px;
                margin: -50px 0 0 -50px;
                border-radius:50px;
                background-color:#f60;
            }
            .circle {
                position:absolute;
                top: 0%;
                left: 50%;
                display:block;
                width:50px;
                height:50px;
                margin:-25px 0 0 -25px;
                background-color:#f90;
                border-radius:25px;
                -webkit-transform-origin: 50% 225px;
                -webkit-animation: circles 4s linear infinite;
            }
            .circle:hover{
                -webkit-transform: rotate(90deg);
            }
            @-webkit-keyframes circles {
                from {-webkit-transform:rotate(0deg);}
                to {-webkit-transform:rotate(360deg);}
            }
            /*
            @-webkit-keyframes animations{
            	0%{left:0%;top:50%;}
            	12.5%{left:14.64%;top:14.64%;}
            	25%{left: 50%;top:0%;}
            	37.5%{left:85.36%;top:14.64%;}
            	50%{left:100%;top:50%;}
            	62.5%{left:85.36%;top:85.36%;}
            	75%{left: 50%;top: 100%;}
            	87.5%{left:14.64%;top:85.36%;}
            	100%{left: 0%; top: 50%;}
            }
            */
            
        </style>
    </head>
    <body>
        <div class="wrap">
            <s class="center"></s>
            <s class="circle"></s>
        </div>
    </body>
</html>
