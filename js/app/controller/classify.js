/**
 * Created by lince on 16/9/1.
 */
myApp.controller("classifyCtrl", ["$scope","hidenav","checkLogin",function ($scope,hidenav,checkLogin) {
    hidenav();
    checkLogin.docheck();
    window.scrollTo(0,0);
    $("#classify").css({"display":"block"});
    function getFoods(category){
        $.ajax({
            type:"get",
            url:"http://www.lcdaoxin.com/xiaodaoshop/PHP/category.php",
            dataType:"json",
            data:{
                category:category
            },
            success:function(data){
                foodsAdapter(data);
            }
        });
    }
    getFoods("手机数码");
    $(".leftMenuContent").on("click","li",function(){
        $(this).addClass("active").siblings().removeClass("active");
        $(".foodlist").html("");
        getFoods($(this).html());
    });
    function foodsAdapter(data){
        $(data).each(function(index){
            $(".foodlist").append("<dl class='foodclass'><dt class='foodtitle'>"+data[index].fruit+"</dt><dd class='fl-a'></dd></dl>");
            $(data[index].fruitimg).each(function(imgindex){
                $(".fl-a").eq(index).append("<a href='javascript:;' class='food'><img class='food-img' src='"+data[index].fruitimg[imgindex]+"'><span class='food-name'>"+data[index].fruitdesc[imgindex]+"</span></a>");
            });
        });
    }
}]);