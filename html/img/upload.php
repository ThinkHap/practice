<?php
require_once('config.php');
?>
<!DOCTYPE HTML>
<html>
<head>
<meta http-equiv="content-type" content="text/html; charset=UTF-8"/>
<title>图片上传</title>
<style type="text/css">
	body {
		font-family:微软雅黑, Geneva, sans-serif;
		font-size:13px;
		color:#333;
		background:url(./plupload/bg.jpg);
	}
	#wrap {
		width: 990px;
		margin: 0 auto;
	}
	.select_path {
		font-size: 16px;
		color: #42454A;
		margin-bottom: 20px;
	}
	.select_path input,
	.select_path select {
		font-family:微软雅黑, Geneva, sans-serif;
		border: 1px solid #aaa;
		border-radius: 3px;
		padding: 0 3px;
		transition: all 0.3s ease-in-out 0s;
	}
	.select_path input:focus,
	.select_path select:focus {
		border-color: #444;
		box-shadow: 0 0 5px #666;
	}
	.select_path hr {
		color: #eee;
	}
	#previewbox {
		padding-top: 10px;
		padding-left: 10px;
	}
	#previewbox img {
		border: 1px solid #aaa;
		border-radius: 3px;
		min-height: 45px;
		min-width: 45px;
	}
</style>
<link rel="stylesheet" href="http://ajax.googleapis.com/ajax/libs/jqueryui/1.8.9/themes/base/jquery-ui.css" type="text/css" />
<link rel="stylesheet" href="./plupload/js/jquery.ui.plupload/css/jquery.ui.plupload.css" type="text/css" />
<link rel="stylesheet" type="text/css" href="./plupload/js/form/jquery.editable-select.css">

<script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/1.5.1/jquery.min.js"></script>
<script type="text/javascript" src="./plupload/js/yahoo/browserplus-min.js"></script>
<script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jqueryui/1.8.9/jquery-ui.min.js"></script>
<script type="text/javascript" src="./plupload/js/form/jquery.editable-select.pack.js"></script>
  
<script type="text/javascript" src="./plupload/js/plupload.js"></script>
<script type="text/javascript" src="./plupload/js/plupload.gears.js"></script>
<script type="text/javascript" src="./plupload/js/plupload.silverlight.js"></script>
<script type="text/javascript" src="./plupload/js/plupload.flash.js"></script>
<script type="text/javascript" src="./plupload/js/plupload.browserplus.js"></script>
<script type="text/javascript" src="./plupload/js/plupload.html4.js"></script>
<script type="text/javascript" src="./plupload/js/plupload.html5.js"></script>
<script type="text/javascript" src="./plupload/js/jquery.ui.plupload/jquery.ui.plupload.js"></script>

</head>
<body>
<div id="wrap">
	<div class="select_path">
		<h3>贡献自己的YY图片，要和谐哦！</h3>
		<label for="upath">设置一个你想要的目录吧：</label>
		<select name="upath" id="upath" class="editable-select">
			<option selected="selected">default</option>
	<?php
	if (is_dir(IMGPATH)) {
		if ($dh = opendir(IMGPATH)) {
			while (($file = readdir($dh)) !== false) {
				if ($file!="." && $file!=".." && is_dir(IMGPATH.$file) && $file!='default') {
					echo "<option>".$file."</option>";
				}
			}
			closedir($dh);
		}
	}
	?>
		</select>
		<hr />
		<div id="previewbox">
			<img src="http://img.f2e.taobao.net/img.png_47x47.jpg" />
			<img src="http://img.f2e.taobao.net/img.png_48x48.jpg" />
			<img src="http://img.f2e.taobao.net/img.png_49x49.jpg" />
			<img src="http://img.f2e.taobao.net/img.png_50x50.jpg" />
			<img src="http://img.f2e.taobao.net/img.png_51x51.jpg" />
			<img src="http://img.f2e.taobao.net/img.png_52x52.jpg" />
			<img src="http://img.f2e.taobao.net/img.png_53x53.jpg" />
			<img src="http://img.f2e.taobao.net/img.png_54x54.jpg" />
			<img src="http://img.f2e.taobao.net/img.png_55x55.jpg" />
			<img src="http://img.f2e.taobao.net/img.png_54x54.jpg" />
			<img src="http://img.f2e.taobao.net/img.png_53x53.jpg" />
			<img src="http://img.f2e.taobao.net/img.png_52x52.jpg" />
			<img src="http://img.f2e.taobao.net/img.png_51x51.jpg" />
			<img src="http://img.f2e.taobao.net/img.png_50x50.jpg" />
			<img src="http://img.f2e.taobao.net/img.png_49x49.jpg" />
			<img src="http://img.f2e.taobao.net/img.png_48x48.jpg" />
			<img src="http://img.f2e.taobao.net/img.png_47x47.jpg" />
		</div>
	</div>
	<div id="all_uploader">天啊！你的浏览器gears,html5,flash,silverlight,browserplus居然一个都不支持，赶快去装个chrome吧。</div>
</div>
<script type="text/javascript">
// Convert divs to queue widgets when the DOM is ready
$(function() {
	$("#all_uploader").plupload({
		// General settings
		runtimes : 'gears,html5,flash,silverlight,browserplus',
		url : './plupload/do.php',
		max_file_size : '10mb',
		chunk_size : '1mb',
		unique_names : true,

		// Resize images on clientside if we can
		//resize : {width : 320, height : 240, quality : 90},
		
		// Rename files by clicking on their titles
		rename: true,
		
		// Sort files
		sortable: true,

		// Specify what files to browse for
		filters : [
			{title : "Image files", extensions : "jpg,gif,png"}
		],

		// Flash settings
		flash_swf_url : './plupload/js/plupload.flash.swf',

		// Silverlight settings
		silverlight_xap_url : './plupload/js/plupload.silverlight.xap'
	});
	var uploader = $('#all_uploader').plupload('getUploader');
	uploader.bind('StateChanged', function(up) {
		if(up.state == plupload.STARTED){
			//获取上传路径，并且过滤特殊字符
			var upath = $('#upath')[0].value;
			if(/[^a-z0-9]/.test(upath)){
				upath = upath.replace(/[^a-zA-Z0-9]/g,'');
				$('#upath')[0].value = upath;
			}
			if(uploader.settings.url.indexOf('?') > -1){
				uploader.settings.url += '&upath='+upath;
			}else{
				uploader.settings.url += '?upath='+upath;
			}
		}
	});
    $('.editable-select').editableSelect(
      {
        bg_iframe: true,
		onSelect: function(list_item) {
			$('#previewbox img')[0].src="http://img.f2e.taobao.net/"+list_item[0].innerHTML+".png_47x47.jpg";
			$('#previewbox img')[1].src="http://img.f2e.taobao.net/"+list_item[0].innerHTML+".png_48x48.jpg";
			$('#previewbox img')[2].src="http://img.f2e.taobao.net/"+list_item[0].innerHTML+".png_49x49.jpg";
			$('#previewbox img')[3].src="http://img.f2e.taobao.net/"+list_item[0].innerHTML+".png_50x50.jpg";
			$('#previewbox img')[4].src="http://img.f2e.taobao.net/"+list_item[0].innerHTML+".png_51x51.jpg";
			$('#previewbox img')[5].src="http://img.f2e.taobao.net/"+list_item[0].innerHTML+".png_52x52.jpg";
			$('#previewbox img')[6].src="http://img.f2e.taobao.net/"+list_item[0].innerHTML+".png_53x53.jpg";
			$('#previewbox img')[7].src="http://img.f2e.taobao.net/"+list_item[0].innerHTML+".png_54x54.jpg";
			$('#previewbox img')[8].src="http://img.f2e.taobao.net/"+list_item[0].innerHTML+".png_55x55.jpg";
			$('#previewbox img')[9].src="http://img.f2e.taobao.net/"+list_item[0].innerHTML+".png_54x54.jpg";
			$('#previewbox img')[10].src="http://img.f2e.taobao.net/"+list_item[0].innerHTML+".png_53x53.jpg";
			$('#previewbox img')[11].src="http://img.f2e.taobao.net/"+list_item[0].innerHTML+".png_52x52.jpg";
			$('#previewbox img')[12].src="http://img.f2e.taobao.net/"+list_item[0].innerHTML+".png_51x51.jpg";
			$('#previewbox img')[13].src="http://img.f2e.taobao.net/"+list_item[0].innerHTML+".png_50x50.jpg";
			$('#previewbox img')[14].src="http://img.f2e.taobao.net/"+list_item[0].innerHTML+".png_49x49.jpg";
			$('#previewbox img')[15].src="http://img.f2e.taobao.net/"+list_item[0].innerHTML+".png_48x48.jpg";
			$('#previewbox img')[16].src="http://img.f2e.taobao.net/"+list_item[0].innerHTML+".png_47x47.jpg";
		},
	}
    );
	 

});
</script>

</body>
</html>