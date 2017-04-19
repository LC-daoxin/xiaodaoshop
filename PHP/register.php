<?php
header('Access-Control-Allow-Origin:*');
header('Access-Control-Allow-Methods:POST');
header('Access-Control-Max-Age:60');
header('Access-Control-Allow-Headers:x-requested-with,content-type');
header("Content-type:text/json;charset=utf-8");

require_once "DBConn.php";
//连接数据

$pdo = DBConn::makeDBConn();

//获取参数
if (!empty($_POST['tel'])&&!empty($_POST['password'])){
    $tel = $_POST['tel'];
    $password = $_POST['password'];
    $sql = "INSERT INTO `user`(`id`, `username`, `password`, `tel`) VALUES (?,?,?,?)";
    //预处理模式
    $stmt = $pdo -> prepare($sql);
    $stmt -> bindValue(1,null);//绑定数据
    $stmt -> bindValue(2,null);
    $stmt -> bindValue(3,$password);
    $stmt -> bindValue(4,$tel);
    //执行
    $stmt -> execute();
//检测是否成功 影响行数
    if ($stmt -> rowCount()>0){
        echo json_encode("success");
    }else{
        echo json_encode("error");
    }
}else{
     echo json_encode("Not filled");
}