<?php
header('Access-Control-Allow-Origin:*');
header('Access-Control-Allow-Methods:POST');
header('Access-Control-Max-Age:60');
header('Access-Control-Allow-Headers:x-requested-with,content-type');
header("Content-type:text/json;charset=utf-8");

$page = $_GET["imgtype"];

$tejia = array(
		array(
			"imgsrc" => "img/indeximg/t1.jpg",
			"nowprice" => "¥89",
			"oldprice" => "¥122"
			),
		array(
			"imgsrc" => "img/indeximg/t2.jpg",
			"nowprice" => "¥78",
			"oldprice" => "¥99"
			),
		array(
			"imgsrc" => "img/indeximg/t3.jpg",
			"nowprice" => "¥119",
			"oldprice" => "¥152"
			),
		array(
			"imgsrc" => "img/indeximg/t4.jpg",
			"nowprice" => "¥288",
			"oldprice" => "¥312"
			),
		array(
			"imgsrc" => "img/indeximg/t5.jpg",
			"nowprice" => "¥1889",
			"oldprice" => "¥2450"
			),
		array(
			"imgsrc" => "img/indeximg/t6.jpg",
			"nowprice" => "¥459",
			"oldprice" => "¥623"
			),
		array(
			"imgsrc" => "img/indeximg/t7.jpg",
			"nowprice" => "¥39",
			"oldprice" => "¥49"
			),
		array(
			"imgsrc" => "img/indeximg/t8.jpg",
			"nowprice" => "¥188",
			"oldprice" => "¥240"
			),
		array(
			"imgsrc" => "img/indeximg/t9.jpg",
			"nowprice" => "¥199",
			"oldprice" => "¥299"
			),
		array(
			"imgsrc" => "img/indeximg/t10.jpg",
			"nowprice" => "¥18.9",
			"oldprice" => "¥22"
			),
		array(
			"imgsrc" => "img/indeximg/t11.jpg",
			"nowprice" => "¥19",
			"oldprice" => "¥28"
			),
		array(
			"imgsrc" => "img/indeximg/t12.jpg",
			"nowprice" => "¥9.9",
			"oldprice" => "¥12"
			),
	);
$zjl = array(
		array(
			"imgsrc" => "img/indeximg/g3.jpg",
			"href" => "#activity3"
			),
		array(
			"imgsrc" => "img/indeximg/g3.jpg",
			"href" => "#activity3"
			)
);
$head = array(
		array(
			"imgsrc" => "img/indeximg/nav4.jpg",
			"href" => "#activity1"
			),
		array(
			"imgsrc" => "img/indeximg/nav5.jpg",
			"href" => "#activity2"
			),
		array(
			"imgsrc" => "img/indeximg/nav6.jpg",
			"href" => "#activity4"
			)
);
if($page == 1){
	echo json_encode($head);
}else if($page == 2){
	echo json_encode($zjl);
}else if($page == 3){
	echo json_encode($tejia);
}
