<?php
//error_reporting(E_ALL);

require_once('config.php');
//�ļ��д���
$upath = isset($_REQUEST["type"]) ? $_REQUEST["type"] : '';
if($upath == 'img') $upath = 'default';
if($upath == 'all') $upath = '';

//����Ŀ¼�������
$imgurls = openpath(IMGPATH.$upath.'/',"/.*[\.jpg|\.png|\.gif]/",true);
//�����ȡһ������
$imgurl = $imgurls[array_rand($imgurls)];

$x = strtolower($_GET["x"]); //GET the query string from the URL. x would = 600x400 if the url was http://url/x=600x400
if($x == '') $x = '320x320';

//Find the image dimensions
$dimensions = explode('x', $x);
$width = preg_replace('/[^\d]/i', '',$dimensions[0]);
$height = $width;
if ($dimensions[1]) {
	$height = preg_replace('/[^\d]/i', '',$dimensions[1]);
}

$filename='';
$filename=CACHEPATH.$width.'x'.$height.".png";
$cachetime = $cachetime>0 ? $cachetime : 10;//����ʱ��s
//����ȡ���� isset($_REQUEST["nc"])
header('Content-Type: image/png');
if(file_exists($filename) && (time()-filemtime($filename))<$cachetime && !isset($_REQUEST["nc"])){
	//header("Location: $filename");
	imagepng(imagecreatefrompng($filename));
	die();
}


// Set the content-type
$area = $width * $height;
if ($area >= 16000000) { //Limit the size of the image to no more than an area of 16,000,000.
	die("Too big of an image!"); //If it is too big we kill the script.
}

$text_angle = 0; //I don't use this but if you wanted to angle your text you would change it here.

// realpath is important on linux.
$font = realpath(FONTPATH); // If you want to use a different font simply upload the true type font (.ttf) file to the same directory as this PHP file and set the $font variable to the font file name. I'm using the M+ font which is free for distribution -> http://www.fontsquirrel.com/fonts/M-1c


//���ͼƬ����ͼƬ��������������ɫ
if($imgurl != ''){
	$img = cutphoto(IMGPATH.$upath.'/'.$imgurl,$width,$height);
}
if(!$img){
	$img = imageCreate($width,$height); //Create an image.
	// Create some colors
	$white = imagecolorallocate($img, 255, 255, 255);
	$grey = imagecolorallocate($img, 128, 128, 128);
	$black = imagecolorallocate($img, 0, 0, 0);
	$orange = imagecolorallocate($img, 253, 129, 14);
	imageFilledRectangle($img, 0, 0, $width, $height, $orange); //Creates the rectangle with the specified background color. http://us2.php.net/manual/en/function.imagefilledrectangle.php
}
$white = imagecolorallocate($img, 255, 255, 255);
$grey = imagecolorallocate($img, 128, 128, 128);
$black = imagecolorallocate($img, 0, 0, 0);
$orange = imagecolorallocate($img, 253, 129, 14);

if (isset($_GET['text'])) {
	$text = $_GET['text'];
	$text = preg_replace('/\|/i', "\n", $text);
}
else {
	$text = $width.'x'.$height; //This is the default text string that will go right in the middle of the rectangle. &#215; is the multiplication sign, it is not an 'x'.
}

//Ric Ewing: I modified this to behave better with long or narrow images and condensed the resize code to a single line. 
//$fontsize = max(min($width/strlen($text), $height/strlen($text)),5); //scale the text size based on the smaller of width/8 or hieght/2 with a minimum size of 5.

$fontsize = max(min($width/strlen($text)*1.15, $height*0.5) ,5);

$textBox = imagettfbbox_t($fontsize, $text_angle, $font, $text); //Pass these variable to a function that calculates the position of the bounding box.

$textWidth = ceil( ($textBox[4] - $textBox[1]) * 1.07 ); //Calculates the width of the text box by subtracting the Upper Right "X" position with the Lower Left "X" position.

$textHeight = ceil( (abs($textBox[7])+abs($textBox[1])) * 1 ); //Calculates the height of the text box by adding the absolute value of the Upper Left "Y" position with the Lower Left "Y" position.

$textX = ceil( ($width - $textWidth)/2 ); //Determines where to set the X position of the text box so it is centered.
$textY = ceil( ($height - $textHeight)/2 + $textHeight ); //Determines where to set the Y position of the text box so it is centered.


imagettftext($img, $fontsize, $text_angle, $textX, $textY, $white, $font, $text);	 //Create and positions the text http://us2.php.net/manual/en/function.imagettftext.php

// Using imagepng() results in clearer text compared with imagejpeg()
if($filename && CACHEPATH){
	imagepng($img,$filename);
}
imagepng($img);
imagedestroy($img);

//Ruquay K Calloway http://ruquay.com/sandbox/imagettf/ made a better function to find the coordinates of the text bounding box so I used it.
function imagettfbbox_t($size, $text_angle, $fontfile, $text){
    // compute size with a zero angle
    $coords = imagettfbbox($size, 0, $fontfile, $text);
    
	// convert angle to radians
    $a = deg2rad($text_angle);
    
	// compute some usefull values
    $ca = cos($a);
    $sa = sin($a);
    $ret = array();
    
	// perform transformations
    for($i = 0; $i < 7; $i += 2){
        $ret[$i] = round($coords[$i] * $ca + $coords[$i+1] * $sa);
        $ret[$i+1] = round($coords[$i+1] * $ca - $coords[$i] * $sa);
    }
    return $ret;
}
/*
*         $o_photo ԭͼ·��
*         $width    �����
*         $height   �����
*         ���÷���   cutphoto("test.jpg","temp.jpg",256,146);
*		  return img
*/
function cutphoto($o_photo,$width,$height){
	if( @eregi('.jpg',$o_photo) ){
	   $temp_img = imagecreatefromjpeg($o_photo);
	}elseif( @eregi('.png',$o_photo) ){
	   $temp_img = imagecreatefrompng($o_photo);
	}elseif( @eregi('.gif',$o_photo) ){
	   $temp_img = imagecreatefromgif($o_photo);
	}else{
	   die("ͼƬ��ʽ����$o_photo");
	}
	$o_width   = imagesx($temp_img);                                 //ȡ��ԭͼ��
	$o_height = imagesy($temp_img);                                 //ȡ��ԭͼ��

	//�жϴ�����
	if($width>$o_width || $height>$o_height){         //ԭͼ���߱ȹ涨�ĳߴ�С,����ѹ��
			 $newwidth=$o_width;
			 $newheight=$o_height;

			 if($o_width>$width){
					 $newwidth=$width;
					 $newheight=$o_height*$width/$o_width;
			 }

			 if($newheight>$height){
					 $newwidth=$newwidth*$height/$newheight;
					 $newheight=$height;
			 }

			 //����ͼƬ
			 $new_img = imagecreatetruecolor($newwidth, $newheight);
			 imagecopyresampled($new_img, $temp_img, 0, 0, 0, 0, $newwidth, $newheight, $o_width, $o_height);
			 return $new_img;
	}else{                                                                                 //ԭͼ����߶��ȹ涨�ߴ��,����ѹ����ü�
			 if($o_height*$width/$o_width>$height){         //��ȷ��width��涨��ͬ,���height�ȹ涨��,��ok
					 $newwidth=$width;
					 $newheight=$o_height*$width/$o_width;
					 $x=0;
					 $y=($newheight-$height)/2;
			 }else{                                                                         //����ȷ��height��涨��ͬ,width����Ӧ
					 $newwidth=$o_width*$height/$o_height;
					 $newheight=$height;
					 $x=($newwidth-$width)/2;
					 $y=0;
			 }

			 //����ͼƬ
			 $new_img = imagecreatetruecolor($newwidth, $newheight);
			 imagecopyresampled($new_img, $temp_img, 0, 0, 0, 0, $newwidth, $newheight, $o_width, $o_height);
			 
			 $o_width   = imagesx($new_img);                                 //ȡ������ͼ��
			 $o_height = imagesy($new_img);                                 //ȡ������ͼ��

			 //�ü�ͼƬ
			 $new_imgx = imagecreatetruecolor($width,$height);
			 imagecopyresampled($new_imgx,$new_img,0,0,$x,$y,$width,$height,$width,$height);
			 return $new_imgx;
	}

}
//��ȡָ��Ŀ¼�µ��ļ��б�

//$path ָ����Ŀ¼��Ĭ��Ϊ��ǰĿ¼
//$ifchild �Ƿ���ʾ��Ŀ¼�ļ��б�Ĭ�ϲ���ʾ
//$preg һ����������ƥ���ļ���

//$curpath ��ʾ��ǰ��·����Ĭ��Ϊ�ӵ�ǰĿ¼��ʼ�������Ҫ��Ϊ����ʾȷ��href·��

function openpath($path=".",$preg="/.*/",$ifchild=false,$curpath=""){
	$list = array();
	$handle = opendir($path);
	if($handle){
		$file = readdir($handle);
		while($file && preg_match($preg,$file)){
			if ($file != "." && $file != "..") {
				if(is_dir($path.$file)){
					if($ifchild){
						$list = array_merge($list,openpath($path."/".$file.'/', $preg, $ifchild, $curpath.$file.'/'));
					}else{
						$list[] = ($curpath.$file);
					}
				}else{
					$list[] = ($curpath.$file);
				}
			}
			$file = readdir($handle);
		}
	}
	closedir($handle);
	return $list;
}
?>
