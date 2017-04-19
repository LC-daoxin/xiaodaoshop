/**
 * Created by lince on 16/8/25.
 */
myGoods.controller("goodsCtrl", ["$scope", "goodsid", "$timeout","checkLogin", function (scope, goodsid, $timeout,checkLogin) {
    checkLogin.docheck();
    $("#goodstou").css("display", "block");
    $("#menu-mine").on("click", function () {
        if (((new Date(localStorage.getItem("freelogin")) > new Date()) && (localStorage.getItem("xdln") !== null) && (localStorage.getItem("xdpw") !== null)) || ((sessionStorage.getItem("xdln-l") !== null) && (sessionStorage.getItem("xdpw-l") !== null))) {
            $("#menu-mine").attr("href", "index.html#/mine");
        } else {
            $("#menu-mine").attr("href", "index.html#/login");
        }
    });
    function carNum(){
        var loginname = window.atob(localStorage.getItem("xdln"));
        $.ajax({
                type: "get",
                url: "http://www.lcdaoxin.com/xiaodaoshop/PHP/cart.php",
                dataType: "json",
                data: {
                    state:1,
                    loginname: loginname
                },
                success: function (data) {
                    if(data > 99){
                        $("#carNum").css("display","inline-block").html("99+");
                    }else if(data == null){
                        $("#carNum").css("display","none");
                    }else{
                        $("#carNum").css("display","inline-block").html(data);
                    }
                }
            }
        );
    }
    carNum();
    scope.gocart = function () {
        if (((new Date(localStorage.getItem("freelogin")) > new Date()) && (localStorage.getItem("xdln") !== null) && (localStorage.getItem("xdpw") !== null)) || ((sessionStorage.getItem("xdln-l") !== null) && (sessionStorage.getItem("xdpw-l") !== null))) {
            var url = window.location.href;
            var currentnum = null;
            if ($(".quantity").val() < 1 && $(".quantity").val() == '') {
                currentnum = 1;
                $(".quantity").val(1);
            } else {
                currentnum = $(".quantity").val();
            }
            var loginname = window.atob(localStorage.getItem("xdln"));//用户名
            $.ajax({
                    type: "get",
                    url: "http://www.lcdaoxin.com/xiaodaoshop/PHP/cart.php",
                    dataType: "json",
                    data: {
                        state:1,
                        goodsid: goodsid(url), //商品id
                        goodsnum: currentnum,
                        loginname: loginname
                    },
                    success: function (data) {
                        $("#messageBox").css("display", "block");
                        $timeout(function () {
                            $("#messageBox").css("display", "none");
                        }, 2000);
                        if(data > 99){
                            $("#carNum").css("display","inline-block").html("99+");
                        }else{
                            $("#carNum").css("display","inline-block").html(data);
                        }
                    }
                }
            );
        }
    };
}])
;