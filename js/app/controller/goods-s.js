/**
 * Created by lince on 16/8/17.
 */
myGoods.controller("goods-sCtrl", ["$scope", "httpajax", "getAddress", "goodsid",function (scope, httpajax, getAddress,goodsid) {
    $(".xd-head-title").css("display", "block");
    $(".goodsfoot").css("display", "block");
    $(".xd-head-title1").css("display", "none");
    $("body").removeClass("graycomment");
    function goodstimg() {
        $.ajax({
            type: "get",
            url: "http://www.lcdaoxin.com/xiaodaoshop/PHP/goods.php",
            dataType: "json",
            success: function (data) {
                var num = url(data);
                if (data[num].imgdetails !== undefined) {
                    gheadimg(data[num].imgdetails);
                    var mySwiper = new Swiper('.swiper-container', {
                        pagination: '.swiper-pagination',
                        paginationClickable: true,
                        loop: true,
                        autoplay: 3000,
                        paginationType: 'fraction'
                    });
                    addcontain(data, num);
                }
            }
        });
    }

    function gheadimg(data) {
        $(data).each(function (index, element) {
            $("#goodsimg").append("<div class='swiper-slide xzh'><img src='" + data[index] + "'/></div>");
        });
    }

    function addcontain(data, num) {
        $(".big-price").html($(data)[num].bigprice);
        $(".small-price").html($(data)[num].smallprice);
        $("#goodsname").html($(data)[num].tjtitle);
        $(".prod-act").html($(data)[num].gdescribe);
        $(".shop-icon img").attr("src", $(data)[num].shopimg);
        $(".shop-name").html($(data)[num].shopname);
        var comments = data[num].comment;
        addstar(comments);
    }

    function star(data, index) { //添加用户评价星级
        var staridname = "#" + index;
        for (var i = 0; i < data; i++) {
            $(staridname).append("<i class='iconfont'>&#xe628;</i>");
        }
        var unstarnum = 5 - data;
        for (var j = 0; j < unstarnum; j++) {
            $(staridname).append("<i class='iconfont' style='color:gainsboro !important;'>&#xe628;</i>");
        }
    }

    function addstar(lists) {
        $(lists).each(function (index, element) {
            star(lists[index].starnum, lists[index].userid);
        });
    }

    $(".xd-head-title a").on("click", function () {
        $(".xd-head-title a").removeClass("header-tab-selected");
        $(this).addClass("header-tab-selected");
    });
    $(".xd-head-title a").removeClass("header-tab-selected");
    $(".xd-head-title>li:eq(0) a").addClass("header-tab-selected");

    httpajax.getcomment("http://www.lcdaoxin.com/xiaodaoshop/PHP/goods.php").success(function (data) {
        var num = url(data);
        var arr = data[num].comment;
        if (arr !== undefined) {
            scope.lists = arr.slice(0, 3);
        }
        goodstimg();
    });
    function url(data) { /*根据传回来的goodsid 确认对应*/
        var url = window.location.href;
        var id = goodsid(url);//获取传过来的商品id
        var dataid = null;
        for (var i = 0; i < data.length; i++) {
            if (data[i].goodsid == id) {
                dataid = i;
            }
        }
        return dataid;
    }

    /*获取当前城市名*/
    function myFun(result) {
        var cityName = result.name;
        $(".Address .city").html("");
        if (getAddress[0] === null) {
            $(".Address .city").html(cityName);
        } else if (getAddress[0] === undefined) {
            $(".Address .city").html(cityName);
        }
    }

    var myCity = new BMap.LocalCity();
    myCity.get(myFun);

    /*控制跳转到map*/
    $("#address").on("click", function () {
        $(".xd-head-title").css("display", "none");
        $(".xd-head-title1").css("display", "block");
        $(".goodsfoot").css("display", "none");
        $(".goodsback").attr("href", "");
    });
    /*绑定点击的地址信息，并显示*/
    /*scope.address = sessionStorage.getItem("addressText");*/
    scope.address = getAddress[0];

    /*选择货品数量*/
    $(".quantity").keyup(function(){
       if($(".quantity").val() > 200){
           $(".lowestbuy-tip").css("display","inline-block");
           $(".quantity").val(200);
       }else if($(".quantity").val() < 1){
           $(".quantity").val(1);
       }
    });
    scope.plus = function () {
        if($(".quantity").val() <= 1 || $(".quantity").val()== ""){
            $(".quantity").val(2);
            $(".lowestbuy-tip").css("display","none");
        }else if($(".quantity").val()< 200){
            var num = parseInt($(".quantity").val());
            num++;
            $(".quantity").val(num);
            $(".lowestbuy-tip").css("display","none");
        }else{
            $(".lowestbuy-tip").css("display","inline-block");
        }
        /*$(".quantity").attr("value", parseInt($(".quantity").val()) + 1);*///有问题，小数无法改变
    };
    scope.minus = function () {
        if($(".quantity").val() <= 1 || $(".quantity").val()== ""){
            $(".quantity").val(1);
            $(".lowestbuy-tip").css("display","none");
        }else if($(".quantity").val()<= 200){
            var num = parseInt($(".quantity").val());
            num--;
            $(".quantity").val(num);
            $(".lowestbuy-tip").css("display","none");
        }
    };
}]);