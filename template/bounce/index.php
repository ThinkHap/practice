<!DOCTYPE html>
<html>
    <head>
        <meta charset="gbk" />
        <title>bounce - demo</title>
        <style type="text/css">
            body, form, h1, h2, h3, h4, p, img, ul, li, ol, dl, dt, dd, a, span, input, tr, th, td{margin:0;padding:0;}
            body {font:normal 12px/1.5 "Arial","宋体","Simsun","Tahoma",sans-serif;}
            li {list-style:none;}
            img {border:0 none;vertical-align:top;}
            table {border-collapse:collapse;border-spacing:0;}
            .clear-fix:after {display:block;visibility:hidden;font-size:0;line-height:0;clear:both;content:"";}  
            .clear-fix {zoom:1;}
            a {color:#000;text-decoration:none;}
            a:hover {color:#f44;text-decoration:underline;}

            .bounce-container ul {
                padding: 100px;
                background-color:#ccc;
            }
            .bounce-container .bounce-list {
                float:left;
                width: 20px;
                height: 20px;
                margin-right: 100px;
                border-radius: 8px;
                background-color: #f44;
            }
        </style>
        <script src="https://s.tbcdn.cn/s/kissy/1.2.0/kissy-min.js"></script>
    </head>
    <body>
        <div class="bounce-container" id="J_Bounce">
            <ul class="clear-fix">
                <li class="bounce-list"></li>
                <li class="bounce-list"></li>
                <li class="bounce-list"></li>
                <li class="bounce-list"></li>
                <li class="bounce-list"></li>
            </ul>
        </div>
        <script>
            var S = KISSY, D = S.DOM, E = S.Event;

            S.add('Bounce', {
                fullpath:'../../src/bounce/bounce.js'
            });
            
            KISSY.use('Bounce', function(S, Bounce){
                var Bounce = new Bounce('#J_Bounce', {interval: 3, position: [5,5], offset: -20});
            });
        </script>
    </body>
</html>
