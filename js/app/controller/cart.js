/**
 * Created by lince on 16/9/8.
 */
myApp.controller("cartCtrl", ["$scope","checkLogin","hidenav",function ($scope,checkLogin,hidenav) {
    hidenav();
    window.scrollTo(0,0);
    $("#cart").css({"display":"block"});
    checkLogin.docheck();
    $("body").addClass("gbackg");
    if (((new Date(localStorage.getItem("freelogin")) > new Date()) && (localStorage.getItem("xdln") !== null) && (localStorage.getItem("xdpw") !== null)) || ((sessionStorage.getItem("xdln-l") !== null) && (sessionStorage.getItem("xdpw-l") !== null))) {
        var loginname = window.atob(localStorage.getItem("xdln"));
        setcart();
    }else{
        $("#logincart").css("display", "none");
    }
    $scope.changecart = function(item){
        var changediv = "#"+item.goodsid+" .cartnumshow";
        var changediv1 = "#"+item.goodsid+" .cartnumset";
        $(".cartnumshow").css("display","block");
        $(".cartnumset").css("display","none");
        $(changediv).css("display","none");
        $(changediv1).css("display","block");
    };
    $scope.finishcart = function(item){
        var changediv = "#"+item.goodsid+" .cartnumshow";
        var changediv1 = "#"+item.goodsid+" .cartnumset";
        $(".cartnumshow").css("display","block");
        $(".cartnumset").css("display","none");
        $(changediv).css("display","block");
        $(changediv1).css("display","none");
        changecart(item);
    };
    $scope.removecart = function(item,$index){
        /*var deleteli = "#"+item.goodsid;
        $(deleteli).css("display","none");*/
        removecart(item);
        $scope.cartlists.splice($index,1);
        $(".cartnumshow").css("display","block");
        $(".cartnumset").css("display","none");
    };
    function changecart(item){
        var loginname = window.atob(localStorage.getItem("xdln"));
        var jjbtn = "#"+item.goodsid+" .quantity";
        var currentnum = $(jjbtn).val();
        $.ajax({
                type: "get",
                url: "http://localhost/xiaodaoshop/PHP/cart.php",
                dataType: "json",
                data: {
                    state:3,
                    loginname: loginname,
                    goodsid: item.goodsid,
                    goodsnum: currentnum
                },
                success: function (data) {
                    console.log(data);
                    show(data);
                }
            }
        );
    }
    function setcart(){
        $.ajax({
                type: "get",
                url: "http://localhost/xiaodaoshop/PHP/cart.php",
                dataType: "json",
                data: {
                    state:2,
                    loginname: loginname
                },
                success: function (data) {
                    console.log(data);
                    show(data);
                }
            }
        );
    }
    function removecart(item){
        $.ajax({
                type: "get",
                url: "http://localhost/xiaodaoshop/PHP/cart.php",
                dataType: "json",
                data: {
                    state:4,
                    loginname: loginname,
                    goodsid: item.goodsid
                },
                success: function (data) {
                    console.log(data);
                    show(data);
                }
            }
        );
    }
    function show(data){
        if(data == 'none'){
            $(".paycart").css("display", "none");
            $("#logincart").css("display", "block");
        }else{
            $(".paycart").css("display", "block");
            $(".cartbottom").css("display", "block");
            var allprice=null;
            var allnum=null;
            for(var i=0;i<data.length;i++){
                allprice += data[i].totalnum;
                allnum += Number(data[i].goodsnum);
            }
            $scope.allprice = allprice;
            if(Number(allnum)<99){
                $scope.allnum = allnum;
            }else{
                $scope.allnum = '99+';
            }
            $scope.cartlists = data;
            $scope.$apply();
        }
    }
    /*选择货品数量*/

    $scope.inputnum = function(item){
        var jjbtn = "#"+item.goodsid+" .quantity";
        var lowbtn = "#"+item.goodsid+" .lowestbuy-tip";
        if($(jjbtn).val() > 200){
            $(lowbtn).css("display","inline-block");
            $(jjbtn).val(200);
        }else if($(jjbtn).val() < 0){
            $(jjbtn).val(1);
        }else{
            $(lowbtn).css("display","none");
        }
    };
    $(".quantity").on("blur",function(){
        if($(".quantity").val() < 1){
            $(".quantity").val(1);
        }
    });
    $scope.plus = function (item) {
        var jjbtn = "#"+item.goodsid+" .quantity";
        var lowbtn = "#"+item.goodsid+" .lowestbuy-tip";
        if($(jjbtn).val() <= 1 || $(jjbtn).val()== ""){
            $(jjbtn).val(2);
            $(lowbtn).css("display","none");
        }else if($(".quantity").val()< 200){
            var num = Number($(jjbtn).val());
            num++;
            $(jjbtn).val(num);
            $(lowbtn).css("display","none");
        }else{
            $(jjbtn).css("display","inline-block");
        }
    };
    $scope.minus = function (item) {
        var lowbtn = "#"+item.goodsid+" .lowestbuy-tip";
        var jjbtn = "#"+item.goodsid+" .quantity";
        if($(jjbtn).val() <= 1 || $(jjbtn).val()== ""){
            $(jjbtn).val(1);
            $(lowbtn).css("display","none");
        }else if($(jjbtn).val()<= 200){
            var num = Number($(jjbtn).val());
            num--;
            $(jjbtn).val(num);
            $(lowbtn).css("display","none");
        }
    };
}]);