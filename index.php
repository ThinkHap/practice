<?php
    function recurDir($pathName) {
        //$arr = array("prepromotion", "prepromotion-new");
        if (!is_dir($pathName) && !is_readable($pathName)) {
            return false;
        }
        $strCtn = "<ul>";
		// template目录流
        $opendir = opendir($pathName);
		
		// 初始化template目录index.php文件title标签文本
		$f_title = '';
		$md_fdata = '';
		
		// 循环template目录流
        while (false !== ($fileName = readdir($opendir))) {
			if($fileName !== "." && $fileName !== ".."){
				// 获取活动index.php文件
                $m_path = file_exists($pathName."/".$fileName."/index.php") ? $pathName."/".$fileName."/index.php" : $pathName."/".$fileName."/index.html";
				if (file_exists($m_path)) {
                    $timestamp = filemtime($m_path);
                    $filemtime = date("20y年m月d日 g:i a",$timestamp+3600*8);

					// 读取index.php文件
					$f_txt = file_get_contents($m_path);
					
					// 匹配title标签内容
					if (preg_match("/<title>(.*)<\/title>/",$f_txt,$matches)) {
						$f_title = $matches[1];	
					
					// 匹配不成功，继续打开block目录流，循环各个区块文件中的title标签内容
					} else {
						$block_path = is_dir($pathName."/".$fileName."/"."block") ? $pathName."/".$fileName."/"."block" : $pathName."/".$fileName."/"."blocks";
						
						if (is_dir($block_path)) {
							$block_opendir = opendir($block_path);
							while (false !== ($block_file = readdir($block_opendir))) {
								if($block_file !== "." && $block_file !== "..") {
									// 拼接block目录文件完整路径
									$block_fpath = $block_path."/".$block_file;
									
									if (file_exists($block_fpath)) {
										$block_txt = file_get_contents($block_fpath);
										if (preg_match("/<title>(.*)<\/title>/",$block_txt,$matches)) {
											$f_title = $matches[1];
										}
									}

								}
							}
						}
					}
                }
                $fullName = $pathName."/".$fileName;
                //if(in_array($fileName,$arr)) {
                //    $fullName = 'http://'.$_SERVER ['HTTP_HOST'].'/tms/?page='.$fileName;
                //}
				
				// 读取README.md文件内容
				$md_path = $pathName."/".$fileName."/README.md";
				if (file_exists($md_path)) {
					$md_fopen = fopen($md_path, "rt");
					if (filesize($md_path) !== 0) {
						$md_fdata = preg_replace("/\r{1,}\n{1,}/m","<br>",file_get_contents($md_path));
					} else {
						$md_fdata = '内容为空';	
					}
				} else {
					$md_fdata = '未创建README.md文件';	
				}
				
                if (is_dir($fullName)) {
                $strCtn.= "<li><div class=\"title-wrap\"><a class=\"title\" href=\"$fullName\" title=\"$f_title\" target=\"_blank\"><strong>".$f_title."</strong></a></div>
					<div class=\"remark\"><span class=\"dir\">所在目录：$fileName</span>
					<span class=\"access-time\">最后一次修改时间：$filemtime</span></div>
					<div class=\"reademe\"><h4>$fileName/README.md：</h4><div class=\"reademe-ctn\">$md_fdata</div></div></li>";
                }
            }
			// 将上一次循环中的title标签内容清空
			$f_title = '';
			$md_fdata = '';
        };
        $strCtn.= "</ul>";
        echo $strCtn;
    }

if($_GET['page']) {
	// 初始化信息
    include('template/'.$_GET['page'].'/index.php');
}
else {
    echo '
<!DOCTYPE html>
<html>
<head>
<meta charset="gbk" />
<title>ThinkHap个人练习库</title>
<style>
body, button, input, select, textarea { font: 12px/1.5 tahoma,arial; }
body, h1, h2, h3, h4, h5, h6, hr, p, blockquote, dl, dt, dd, ul, ol, li, pre, form, fieldset, legend, button, input, textarea, th, td { margin: 0; padding: 0; }
.content { width: 1280px; margin: 50px auto; }
.content h2 { margin: 0 0 30px 0; padding: 0 0 12px 0; border-bottom: 1px solid #72bc00; }
.content h2 strong { display: block; font-family: Tahoma, Geneva, sans-serif; color: #72bc00; font-size: 20px; }
.content h2 span { display: block; font-size: 12px; color: #060; margin: 5px 0; font-weight: normal; }
.content ul { list-style: none; margin: 0; padding: 0; }
.content ul li { line-height: 25px; margin-bottom: 25px; }
.content .title-wrap, .tms-content .remark { width: 100%; }
.content .remark { overflow: hidden; }
.content .title { text-decoration: none; color: #F60; font-family: "宋体"; font-size: 18px; margin-right: 50px; }
.content .title:hover { text-decoration: underline; }
.content .dir, .tms-content .access-time { float: left; }
.content .dir { margin-right: 10px; color: #360; }
.content .modification-time { color: #660; }

.reademe h4 { color: #360; font-weight: normal; }
.reademe .reademe-ctn { background-color: #EEEEEE; border-radius: 3px 3px 3px 3px; display: inline-block; margin-top: 5px; padding: 3px 10px; }

</style>
</head>
<body>

<div class="content">
    <h2>
    	<strong>列表</strong>
    	<span>创建规则：访问活动文件统一为index.php文件，且文件要有title标签，不能为空；活动需创建README文件，说明活动详情。</span>
    </h2>';
     recurDir('template');
	echo 
'</div>

</body>
</html>';
}
?>
