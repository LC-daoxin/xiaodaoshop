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
if (!empty($_POST['loginname'])&&!empty($_POST['password'])){
    $username = $_POST['loginname'];
    $tel = $_POST['loginname'];
    $email = $_POST['loginname'];
    $password = $_POST['password'];
    $sql = "select * from user where (username='$username' and password='$password')or(tel='$tel' and password='$password')or(email='$email' and password='$password')";
    //预处理
    $stmt = $pdo->prepare($sql);
    //执行
    $stmt -> execute();
    $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
    if (count($result) >0){
       echo json_encode("success");
    }else{
       echo json_encode("error");
    }
}else{
    echo json_encode("Not filled");
}