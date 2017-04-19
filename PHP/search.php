 <?php
header('Access-Control-Allow-Origin:*');
header('Access-Control-Allow-Methods:POST');
header('Access-Control-Max-Age:60');
header('Access-Control-Allow-Headers:x-requested-with,content-type');
header("Content-type:text/json;charset=utf-8");

$arr = array("印花连衣裙", "T恤衫", "吊带/背心", "牛仔裤", "时尚风衣", "百搭衬衫", "早秋新品","碎花长裙","童装童鞋","运动鞋","防水冲锋衣","修身休闲裤","V领针织衫");

echo json_encode($arr);