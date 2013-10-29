<?php
	header("Content-type:text/json");
	
	$json = Array(
		'item' => Array(
			Array(
				'href' => 'http://www.etao.com/',
				'img' => 'http://img.f2e.taobao.net/img.png_70x70.jpg',
				'alt' => 15000
			)
		)
	);
	$item = Array(
				'href' => 'http://www.etao.com/',
				'img' => 'http://img.f2e.taobao.net/img.png_70x70.jpg',
				'alt' => 100
			);
	$itemNum = $_GET['n'] != Null ? $_GET['n'] * 3 : 10;	
	for ($i = 0; $i < $itemNum; $i = $i + 1 ) {
		$newItem = array_slice($item, 0);
		array_push($json['item'], $newItem);
	}
	
    echo json_encode($json);
?>

