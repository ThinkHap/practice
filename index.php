<?php
    function recurDir($pathName) {
        //$arr = array("prepromotion", "prepromotion-new");
        if (!is_dir($pathName) && !is_readable($pathName)) {
            return false;
        }
        $strCtn = "<ul>";
		// templateĿ¼��
        $opendir = opendir($pathName);
		
		// ��ʼ��templateĿ¼index.php�ļ�title��ǩ�ı�
		$f_title = '';
		$md_fdata = '';
		
		// ѭ��templateĿ¼��
        while (false !== ($fileName = readdir($opendir))) {
			if($fileName !== "." && $fileName !== ".."){
				// ��ȡ�index.php�ļ�
                $m_path = file_exists($pathName."/".$fileName."/index.php") ? $pathName."/".$fileName."/index.php" : $pathName."/".$fileName."/index.html";
				if (file_exists($m_path)) {
                    $timestamp = filemtime($m_path);
                    $filemtime = date("20y��m��d�� g:i a",$timestamp+3600*8);

					// ��ȡindex.php�ļ�
					$f_txt = file_get_contents($m_path);
					
					// ƥ��title��ǩ����
					if (preg_match("/<title>(.*)<\/title>/",$f_txt,$matches)) {
						$f_title = $matches[1];	
					
					// ƥ�䲻�ɹ���������blockĿ¼����ѭ�����������ļ��е�title��ǩ����
					} else {
						$block_path = is_dir($pathName."/".$fileName."/"."block") ? $pathName."/".$fileName."/"."block" : $pathName."/".$fileName."/"."blocks";
						
						if (is_dir($block_path)) {
							$block_opendir = opendir($block_path);
							while (false !== ($block_file = readdir($block_opendir))) {
								if($block_file !== "." && $block_file !== "..") {
									// ƴ��blockĿ¼�ļ�����·��
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
				
				// ��ȡREADME.md�ļ�����
				$md_path = $pathName."/".$fileName."/README.md";
				if (file_exists($md_path)) {
					$md_fopen = fopen($md_path, "rt");
					if (filesize($md_path) !== 0) {
						$md_fdata = preg_replace("/\r{1,}\n{1,}/m","<br>",file_get_contents($md_path));
					} else {
						$md_fdata = '����Ϊ��';	
					}
				} else {
					$md_fdata = 'δ����README.md�ļ�';	
				}
				
                if (is_dir($fullName)) {
                $strCtn.= "<li><div class=\"title-wrap\"><a class=\"title\" href=\"$fullName\" title=\"$f_title\" target=\"_blank\"><strong>".$f_title."</strong></a></div>
					<div class=\"remark\"><span class=\"dir\">����Ŀ¼��$fileName</span>
					<span class=\"access-time\">���һ���޸�ʱ�䣺$filemtime</span></div>
					<div class=\"reademe\"><h4>$fileName/README.md��</h4><div class=\"reademe-ctn\">$md_fdata</div></div></li>";
                }
            }
			// ����һ��ѭ���е�title��ǩ�������
			$f_title = '';
			$md_fdata = '';
        };
        $strCtn.= "</ul>";
        echo $strCtn;
    }

if($_GET['page']) {
	// ��ʼ����Ϣ
    include('template/'.$_GET['page'].'/index.php');
}
else {
    echo '
<!DOCTYPE html>
<html>
<head>
<meta charset="gbk" />
<title>ThinkHap������ϰ��</title>
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
.content .title { text-decoration: none; color: #F60; font-family: "����"; font-size: 18px; margin-right: 50px; }
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
    	<strong>�б�</strong>
    	<span>�������򣺷��ʻ�ļ�ͳһΪindex.php�ļ������ļ�Ҫ��title��ǩ������Ϊ�գ���贴��README�ļ���˵������顣</span>
    </h2>';
     recurDir('template');
	echo 
'</div>

</body>
</html>';
}
?>
