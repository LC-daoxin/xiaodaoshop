<?php
header('Access-Control-Allow-Origin:*');
header('Access-Control-Allow-Methods:POST');
header('Access-Control-Max-Age:60');
header('Access-Control-Allow-Headers:x-requested-with,content-type');
header("Content-type:text/json;charset=utf-8");
require_once "DBConn.php";
$pdo = DBConn::makeDBConn();
$pdo->query('set names utf8;');

if(!empty($_GET['goodsid'])&&!empty($_GET['loginname'])&&!empty($_GET['goodsnum'])&& $_GET['state'] == 1){
	$goodsid = $_GET['goodsid'];
	$loginname =  $_GET['loginname'];
	$goodsnum =  $_GET['goodsnum'];
	$sql = "select * from user where username='$loginname'or tel='$loginname'";
	$res = $pdo -> query($sql);
	$result = $res->fetchAll(PDO::FETCH_ASSOC);
	$cartuser = $result[0]["id"];
	$find = "select * from cart where userid = '$cartuser' and goodsid='$goodsid'";
	$findres = $pdo -> query($find);
	$findresult = $findres->fetchAll(PDO::FETCH_ASSOC);
	if($findresult){
		$goodsnumall = $findresult[0]["goodsnum"]+$goodsnum;
		if($goodsnumall<=200){
			$numadd = "update `cart` set `goodsnum`='$goodsnumall' where `userid`='$cartuser' and `goodsid`='$goodsid'";
				$addres = $pdo -> query($numadd);
		}else{
			$numadd2 = "update `cart` set `goodsnum`=200 where `userid`='$cartuser' and `goodsid`='$goodsid'";
			$add2res = $pdo -> query($numadd2);
		}
	}else{
		$setcart = "insert into `cart` (`cartid`, `userid`, `goodsid`, `goodsnum`) values ( null, '$cartuser','$goodsid','$goodsnum')";
		$insertcart = $pdo -> query($setcart);
	}
	$numarr = [];
	$cartnum = "select * from cart where userid ='$cartuser'";
	$getnum = $pdo -> query($cartnum);
	$numresult = $getnum->fetchAll(PDO::FETCH_ASSOC);
	$amount = null;
	foreach ($numresult as $item) {
		/*array_push($numarr,$item);*/
		$amount += $item["goodsnum"];
	}
	echo json_encode($amount);
}else if(!empty($_GET['loginname']) && $_GET['state'] == 1){
	$loginname =  $_GET['loginname'];
	$sql = "select * from user where username='$loginname'or tel='$loginname'";
	$res = $pdo -> query($sql);
	$result = $res->fetchAll(PDO::FETCH_ASSOC);
	$cartuser = $result[0]["id"];
	$numarr = [];
	$cartnum = "select * from cart where userid ='$cartuser'";
	$getnum = $pdo -> query($cartnum);
	$numresult = $getnum->fetchAll(PDO::FETCH_ASSOC);
	$amount = null;
	foreach ($numresult as $item) {
		$amount += $item["goodsnum"];
	}
	echo json_encode($amount);
}else if(!empty($_GET['loginname']) && $_GET['state'] == 2){
	$loginname =  $_GET['loginname'];
	$sql = "select * from user where username='$loginname'or tel='$loginname'";
	$res = $pdo -> query($sql);
	$result = $res->fetchAll(PDO::FETCH_ASSOC);
	$cartuser = $result[0]["id"];
	$numarr = [];
	$cartnum = "select * from cart where userid ='$cartuser'";
	$getnum = $pdo -> query($cartnum);
	$numresult = $getnum->fetchAll(PDO::FETCH_ASSOC);
	if (count($numresult) >0){
		foreach ($numresult as $item) {
			foreach ($item as $it) {
				$itemgoodsid = $item["goodsid"];
				$goodssql = "select * from goods where goodsid='$itemgoodsid'";
				$goodsres = $pdo -> query($goodssql);
				$goodsresult = $goodsres->fetchAll(PDO::FETCH_ASSOC);
				$item["imgsrc"] = $goodsresult[0]['imgsrc'];
				$item["tjtitle"] = $goodsresult[0]['tjtitle'];
				$item["bigprice"] = $goodsresult[0]['bigprice'];
				$item["smallprice"] = $goodsresult[0]['smallprice'];
				$item["totalnum"] = $goodsresult[0]['price']*$item["goodsnum"];
			}
			array_push($numarr,$item);
		}
		/*print_r($numarr);*/
		echo json_encode($numarr);
    }else{
       echo json_encode("none");
    }
}else if(!empty($_GET['goodsid'])&&!empty($_GET['loginname'])&&!empty($_GET['goodsnum'])&& $_GET['state'] == 3){
	$goodsid = $_GET['goodsid'];
	$loginname =  $_GET['loginname'];
	$goodsnum =  $_GET['goodsnum'];
	$sql = "select * from user where username='$loginname'or tel='$loginname'";
	$res = $pdo -> query($sql);
	$result = $res->fetchAll(PDO::FETCH_ASSOC);
	$cartuser = $result[0]["id"];
	$find = "select * from cart where userid = '$cartuser' and goodsid='$goodsid'";
	$findres = $pdo -> query($find);
	$findresult = $findres->fetchAll(PDO::FETCH_ASSOC);
	if($findresult){
		$goodsnumall = $goodsnum;
		if($goodsnumall<=200){
			$numadd = "update `cart` set `goodsnum`='$goodsnumall' where `userid`='$cartuser' and `goodsid`='$goodsid'";
				$addres = $pdo -> query($numadd);
		}else{
			$numadd2 = "update `cart` set `goodsnum`=200 where `userid`='$cartuser' and `goodsid`='$goodsid'";
			$add2res = $pdo -> query($numadd2);
		}
	}
	$numarr = [];
	$cartnum = "select * from cart where userid ='$cartuser'";
	$getnum = $pdo -> query($cartnum);
	$numresult = $getnum->fetchAll(PDO::FETCH_ASSOC);
	if (count($numresult) >0){
		foreach ($numresult as $item) {
			foreach ($item as $it) {
				$itemgoodsid = $item["goodsid"];
				$goodssql = "select * from goods where goodsid='$itemgoodsid'";
				$goodsres = $pdo -> query($goodssql);
				$goodsresult = $goodsres->fetchAll(PDO::FETCH_ASSOC);
				$item["imgsrc"] = $goodsresult[0]['imgsrc'];
				$item["tjtitle"] = $goodsresult[0]['tjtitle'];
				$item["bigprice"] = $goodsresult[0]['bigprice'];
				$item["smallprice"] = $goodsresult[0]['smallprice'];
				$item["totalnum"] = $goodsresult[0]['price']*$item["goodsnum"];
			}
			array_push($numarr,$item);
		}
		/*print_r($numarr);*/
		echo json_encode($numarr);
    }else{
       echo json_encode("none");
    }
}else if(!empty($_GET['goodsid'])&&!empty($_GET['loginname']) && $_GET['state'] == 4){
	$loginname =  $_GET['loginname'];
	$goodsid = $_GET['goodsid'];
	$sql = "select * from user where username='$loginname'or tel='$loginname'";
	$res = $pdo -> query($sql);
	$result = $res->fetchAll(PDO::FETCH_ASSOC);
	$cartuser = $result[0]["id"];
	$numarr = [];
	$delete = "delete from `cart` where userid ='$cartuser' and goodsid='$goodsid'";
	$deleteres = $pdo -> query($delete);
	$cartnum = "select * from cart where userid ='$cartuser'";
	$getnum = $pdo -> query($cartnum);
	$numresult = $getnum->fetchAll(PDO::FETCH_ASSOC);
	if (count($numresult) >0){
		foreach ($numresult as $item) {
			foreach ($item as $it) {
				$itemgoodsid = $item["goodsid"];
				$goodssql = "select * from goods where goodsid='$itemgoodsid'";
				$goodsres = $pdo -> query($goodssql);
				$goodsresult = $goodsres->fetchAll(PDO::FETCH_ASSOC);
				$item["imgsrc"] = $goodsresult[0]['imgsrc'];
				$item["tjtitle"] = $goodsresult[0]['tjtitle'];
				$item["bigprice"] = $goodsresult[0]['bigprice'];
				$item["smallprice"] = $goodsresult[0]['smallprice'];
				$item["totalnum"] = $goodsresult[0]['price']*$item["goodsnum"];
			}
			array_push($numarr,$item);
		}
		/*print_r($numarr);*/
		echo json_encode($numarr);
    }else{
       echo json_encode("none");
    }
}


