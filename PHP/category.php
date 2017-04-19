 <?php
header('Access-Control-Allow-Origin:*');
header('Access-Control-Allow-Methods:POST');
header('Access-Control-Max-Age:60');
header('Access-Control-Allow-Headers:x-requested-with,content-type');
header("Content-type:text/json;charset=utf-8");
$arr_category_1 = array(
	array(
		"fruit" => "热门品牌",
		"fruitimg" => array(
			"img/classlist/f1.jpg",
			"img/classlist/f2.png",
			"img/classlist/f3.jpg",
			"img/classlist/f4.jpg",
			"img/classlist/f5.png",
			"img/classlist/f6.png",
			"img/classlist/f7.jpg",
			"img/classlist/f8.png"
		),
		"fruitdesc" => array(
			"iPhone","小米","华为","魅族","三星","OPPO","中兴","vivo"
		),
	),
);
$arr_category_2 = array(
	array(
		"fruit" => "电脑整机",
		"fruitimg" => array(
			"img/classlist/e1.jpg",
			"img/classlist/e2.jpg",
			"img/classlist/e3.jpg",
			"img/classlist/e4.jpg",
			"img/classlist/e5.jpg",
			"img/classlist/e6.jpg",
			"img/classlist/e7.jpg"
		),
		"fruitdesc" => array(
			"笔记本","游戏电脑","台式机","游戏本","一体机","服务器/工作站","笔记本配件"
		),
	),
	array(
		"fruit" => "电脑配件",
		"fruitimg" => array(
			"img/classlist/e8.jpg",
			"img/classlist/e9.jpg",
			"img/classlist/e10.jpg",
			"img/classlist/e11.jpg",
			"img/classlist/e12.jpg",
			"img/classlist/e13.jpg",
			"img/classlist/e14.jpg",
			"img/classlist/e15.jpg",
			"img/classlist/e16.jpg",
			"img/classlist/e17.jpg",
		),
		"fruitdesc" => array(
			"显示器","组装电脑","CPU","SSD固态硬盘","显卡","主板","硬盘","内存","机箱","电源"
		),
	),
);
$arr_category_3 = array(
	array(
		"fruit" => "推荐品牌",
		"fruitimg" => array(
			"img/classlist/a1.jpg",
			"img/classlist/a2.jpg",
			"img/classlist/a3.jpg",
			"img/classlist/a4.jpg",
			"img/classlist/a5.jpg",
			"img/classlist/a6.jpg",
			"img/classlist/a7.jpg",
			"img/classlist/a8.jpg",
			"img/classlist/a9.jpg"
		),
		"fruitdesc" => array(
			"欧时力","雅莹","MO&Co.","ONLY","VERO MODA","DAZZLE","太平鸟","伊芙丽","哥弟"
		),
	),
	array(
		"fruit" => "热卖品类",
		"fruitimg" => array(
			"img/classlist/b1.jpg",
			"img/classlist/b2.jpg",
			"img/classlist/b3.jpg",
			"img/classlist/b4.jpg",
			"img/classlist/b5.jpg",
			"img/classlist/b6.jpg",
			"img/classlist/b7.jpg",
			"img/classlist/b8.jpg",
			"img/classlist/b9.jpg"
		),
		"fruitdesc" => array(
			"新品连衣裙","针织开衫","长袖衬衫","时尚T恤","雪纺衫","小脚牛仔裤","连帽卫衣","棒球衫","蕾丝裙"
		),
	),
);

$arr_category_4 = array(
	array(
		"fruit" => "热卖选购",
		"fruitimg" => array(
			"img/classlist/c1.jpg",
			"img/classlist/c2.jpg",
			"img/classlist/c3.jpg",
			"img/classlist/c4.jpg",
			"img/classlist/c5.jpg",
			"img/classlist/c6.jpg",
			"img/classlist/c7.jpg",
			"img/classlist/c8.jpg",
			"img/classlist/c9.jpg",
		),
		"fruitdesc" => array(
			"微鲸","三星","美的","海尔","飞利浦","西门子","海信","九阳","格力"
		),
	),
	array(
		"fruit" => "电视",
		"fruitimg" => array(
			"img/classlist/d1.jpg",
			"img/classlist/d2.jpg",
			"img/classlist/d3.jpg"
		),
		"fruitdesc" => array(
			"合资电视","国产电视","互联网电视"
		),
	),
	array(
		"fruit" => "空调",
		"fruitimg" => array(
			"img/classlist/d4.jpg",
            "img/classlist/d5.jpg",
            "img/classlist/d6.jpg"
		),
		"fruitdesc" => array(
			"壁挂式空调","柜式空调","空调配件"
		),
	),
	array(
		"fruit" => "洗衣机",
		"fruitimg" => array(
			"img/classlist/d7.jpg",
			"img/classlist/d8.jpg",
			"img/classlist/d9.jpg",
			"img/classlist/d10.jpg",
			"img/classlist/d11.jpg"
		),
		"fruitdesc" => array(
			"滚筒洗衣机","洗烘一体机","波轮洗衣机","迷你洗衣机","洗衣机配件"
		),
	),
	array(
		"fruit" => "冰箱",
		"fruitimg" => array(
			"img/classlist/d12.jpg",
            "img/classlist/d13.jpg"
		),
		"fruitdesc" => array(
			"多门冰箱","单门冰箱"
		),
	),

);
$arr_category_5 = array(
	array(
		"fruit" => "水果",
		"fruitimg" => array(
			"http://iwen.wiki/zhichenshop/category/s1.jpg",
			"http://iwen.wiki/zhichenshop/category/s2.jpg",
			"http://iwen.wiki/zhichenshop/category/s3.jpg",
			"http://iwen.wiki/zhichenshop/category/s4.jpg",
			"http://iwen.wiki/zhichenshop/category/s5.jpg",
			"http://iwen.wiki/zhichenshop/category/s6.jpg"
		),
		"fruitdesc" => array(
			"苹果","梨","瓜类","迷糊桃","柑桔柚","更多水果"
		),
	),
	array(
		"fruit" => "蔬菜",
		"fruitimg" => array(
			"http://iwen.wiki/zhichenshop/category/c1.jpg",
			"http://iwen.wiki/zhichenshop/category/c2.jpg",
			"http://iwen.wiki/zhichenshop/category/c3.jpg",
			"http://iwen.wiki/zhichenshop/category/c4.jpg",
			"http://iwen.wiki/zhichenshop/category/c5.jpg",
			"http://iwen.wiki/zhichenshop/category/c6.jpg"
		),
		"fruitdesc" => array(
			"根茎类","叶菜类","瓜果类","菇菌类","调味类","半成品净菜"
		),
	),
);

$arr_category_6 = array(
	array(
		"fruit" => "牛羊猪禽",
		"fruitimg" => array(
			"http://iwen.wiki/zhichenshop/category/q1.jpg",
			"http://iwen.wiki/zhichenshop/category/q2.jpg",
			"http://iwen.wiki/zhichenshop/category/q3.jpg",
			"http://iwen.wiki/zhichenshop/category/q4.jpg",
			"http://iwen.wiki/zhichenshop/category/q5.jpg"
		),
		"fruitdesc" => array(
			"牛肉","羊肉","猪肉","内脏","禽类"
		),
	),
	array(
		"fruit" => "水产海鲜",
		"fruitimg" => array(
			"http://iwen.wiki/zhichenshop/category/h1.jpg",
			"http://iwen.wiki/zhichenshop/category/h2.jpg",
			"http://iwen.wiki/zhichenshop/category/h3.jpg"
		),
		"fruitdesc" => array(
			"鱼类","虾蟹贝类","其他水产"
		),
	),
	array(
		"fruit" => "蛋类",
		"fruitimg" => array(
			"http://iwen.wiki/zhichenshop/category/d1.jpg",
			"http://iwen.wiki/zhichenshop/category/d2.jpg",
			"http://iwen.wiki/zhichenshop/category/d3.jpg"
		),
		"fruitdesc" => array(
			"鸡蛋","鸭蛋","其他蛋类"
		),
	),
	array(
		"fruit" => "奶制品",
		"fruitimg" => array(
			"http://iwen.wiki/zhichenshop/category/n1.jpg",
			"http://iwen.wiki/zhichenshop/category/n2.jpg",
			"http://iwen.wiki/zhichenshop/category/n3.jpg",
			"http://iwen.wiki/zhichenshop/category/n4.jpg",
			"http://iwen.wiki/zhichenshop/category/n5.jpg"
		),
		"fruitdesc" => array(
			"牛奶","酸奶","乳酪类","加味奶","豆浆/豆奶"
		),
	),
	array(
		"fruit" => "进口奶制品",
		"fruitimg" => array(
			"http://iwen.wiki/zhichenshop/category/n1.jpg",
			"http://iwen.wiki/zhichenshop/category/n2.jpg"
		),
		"fruitdesc" => array(
			"进口牛奶","其他乳制品"
		),
	),
);

if ($_GET['category'] == "手机数码") {
	echo json_encode($arr_category_1);
}else if($_GET['category'] == "电脑办公"){
	echo json_encode($arr_category_2);
}else if($_GET['category'] == "潮流女装"){
 	echo json_encode($arr_category_3);
}else if($_GET['category'] == "家用电器"){
 	echo json_encode($arr_category_4);
}else if($_GET['category'] == "水果蔬菜"){
 	echo json_encode($arr_category_5);
}else if($_GET['category'] == "肉禽蛋奶"){
 	echo json_encode($arr_category_6);
}else{
	echo json_encode($arr_category_1);
}