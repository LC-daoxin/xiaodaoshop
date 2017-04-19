<?php
header('Access-Control-Allow-Origin:*');
header('Access-Control-Allow-Methods:POST');
header('Access-Control-Max-Age:60');
header('Access-Control-Allow-Headers:x-requested-with,content-type');
header("Content-type:text/json;charset=utf-8");

require_once "DBConn.php";
$arr = [];
$pdo = DBConn::makeDBConn();
$pdo->query('set names utf8;');
$sql = "select * from goods";
$res = $pdo -> query($sql);
$result = $res->fetchAll(PDO::FETCH_ASSOC);
foreach ($result as $item) {
    $goodslist = $item["goodsid"];
    $sqlimgdetails = "select * from goodsimg where goodsid='$goodslist' and type='imgdetails'";
    $getimg = $pdo -> query($sqlimgdetails);
    $imgresult = $getimg->fetchAll(PDO::FETCH_ASSOC);
    $goods = [];

    foreach ($item as $it) {
        /*array_push($goods,$it);*/
        $goods["goodsid"] = $item['goodsid'];
        $goods["imgsrc"] = $item['imgsrc'];
        $goods["tjtitle"] = $item['tjtitle'];
        $goods["bigprice"] = $item['bigprice'];
        $goods["smallprice"] = $item['smallprice'];
        $goods["gdescribe"] = $item['gdescribe'];
        $goods["shopimg"] = $item['shopimg'];
        $goods["shopname"] = $item['shopname'];
        $goods["type"] = $item['type'];
        $goods["Stocknum"] = $item['Stocknum'];
        $goods["status"] = $item['status'];
        $goods["killprice"] = $item['killprice'];
        $goods["percentage"] = $item['percentage'];
    }
    $imgdetails =[];
    foreach ($imgresult as $itemimg) {
        array_push($imgdetails,$itemimg["content"]);
    }
    $sqlimgdescribe = "select * from goodsimg where goodsid='$goodslist' and type='imgdescribe'";
    $getimg1 = $pdo -> query($sqlimgdescribe);
    $imgresult1 = $getimg1->fetchAll(PDO::FETCH_ASSOC);
    $imgdescribe =[];
    foreach ($imgresult1 as $itemimg1) {
        array_push($imgdescribe,$itemimg1["content"]);
    }
    $comment = [];
    $sqlcomment = "select * from comment where goodsid='$goodslist'";
    $getcomment = $pdo -> query($sqlcomment);
    $commentresult = $getcomment->fetchAll(PDO::FETCH_ASSOC);
    foreach ($commentresult as $itemcomment) {
        array_push($comment,$itemcomment);
    }
    /*array_push($goods,$imgdetails);
    array_push($goods,$imgdescribe);
    array_push($goods,$commentresult);*/
    $goods["imgdetails"] = $imgdetails;
    $goods["imgdescribe"] = $imgdescribe;
    $goods["comment"] = $commentresult;
    array_push($arr,$goods);
}

echo json_encode($arr);
/*print_r($arr);*/