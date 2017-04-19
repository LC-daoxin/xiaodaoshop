/**
 * Created by Administrator on 2016/8/15.
 */
myApp.controller("indexCtrl", ["$scope","checkLogin",function ($scope,checkLogin) {
    $(".newslist").html("");
    $("body").removeClass("gbackg");
    $(".g-head").css({"display":"none"});
    $("#nav").css("display", "block");
    $("#footer").css("display", "block");
    $(".yin").css("display", "none");
    $(".xd-header-yin").css("display", "none");
    $(".tag-box").css("display","none");
    getnews();
    function getnews(){
        $.ajax({
            type: "get",
            async:false,
            url: "http://api.jisuapi.com/news/get?callback=getBack",
            dataType: "jsonp",
            jsonp: "callback",
            jsonpcallback: "getBack",
            data: {
                "channel": "头条",
                "appkey": "7650a841abacc32d"
            },
            success: function (data) {
                setnews(data.result.list,data);
            }
        });
    }
    function setnews(data,dataall){
        $(".newslist").html("");
        $(data).each(function (index, element) {
            $(".newslist").append("<a href='#news'><li class='newstext'>"+data[index].title+"</li></a>")
        });
        shownews(dataall);
    }
    function shownews(data) {
        $(".newslist li").eq(0).css("display", "block").html(data.result.list[0].title);
        var num = 1;
        var time=setInterval(settimenews(num), 3000);
        $("a").on("click",function(){
            clearInterval(time);
        })
    }
    function settimenews(num){
        $(".newslist li").css("display", "none");
        $(".newslist li").eq(num+1).css("display", "block").siblings().css("display", "none");
        num++;
        if (num > 8) {
            num = -1;
        }
    }
    /*三个轮播图*/
    function titleimg() {
        $.ajax({
            type: "get",
            url: "http://localhost/xiaodaoshop/PHP/tejia.php",
            data: {
                imgtype: 1
            },
            dataType: "json",
            success: function (data) {
                headimg(data);
                var mySwiper = new Swiper('.swiper-container', {
                    pagination: '.swiper-pagination',
                    paginationClickable: true,
                    loop: true,
                    autoplay: 3000
                });
            }
        });
    }
    titleimg();
    function headimg(data) {
        $(data).each(function (index, element) {
            $("#headimg").append("<div class='swiper-slide'><a href='"+data[index].href+"'><img class='bai' src='" + data[index].imgsrc + "'/></a></div>")
        });
    }
    function starshow() {
        $.ajax({
            type: "get",
            url: "http://localhost/xiaodaoshop/PHP/tejia.php",
            data: {
                imgtype: 2
            },
            dataType: "json",
            success: function (data) {
                starimg(data);
                var gunSwiper = new Swiper('.swiper-container2', {
                    pagination: '.swiper-pagination2',
                    paginationClickable: true,
                    loop: true,
                    autoplay: 3000
                });
            }
        });
    }
    starshow();
    function starimg(data) {
        $(data).each(function (index, element) {
            $("#starimg").append("<div class='swiper-slide'><a href='"+data[index].href+"'><img class='bai' src='" + data[index].imgsrc + "'/></a></div>")
        });
    }
    function tejia() {
        $.ajax({
            type: "get",
            url: "http://localhost/xiaodaoshop/PHP/tejia.php",
            data: {
                imgtype: 3
            },
            dataType: "json",
            success: function (data) {
                tejiashow(data);
                var swiper = new Swiper('.swiper-container1', {
                    slidesPerView: 5,
                    spaceBetween: 50,
                    breakpoints: {
                        1024: {
                            slidesPerView: 6.5,
                            spaceBetween: 20
                        },
                        768: {
                            slidesPerView: 5.5,
                            spaceBetween: 20
                        },
                        640: {
                            slidesPerView: 4.5,
                            spaceBetween: 20
                        },
                        320: {
                            slidesPerView: 3.5,
                            spaceBetween: 20
                        }
                    }
                });
            }
        });
    }
    tejia();
    function tejiashow(data) {
        $(data).each(function (index, element) {
            $("#tejiaswiper").append("<div class='swiper-slide'><a class='bdr'><div class='tuili'><img class='bai' src='" + data[index].imgsrc + "'/><span class='tjprice1'>" + data[index].nowprice + "</span><span class='tjprice2'>" + data[index].oldprice + "</span></div></a></div>")
        });
    }
    /*三个轮播图*/

    var goodsl = 0;
    var nums = 0;
    $(window).scroll(function () {
        if ($(".tjli:last").offset()) {
            var lastShop = $(".tjli:last").offset().top;
        }
        var scrollHeight = $(window).scrollTop();
        var winHeight = $(window).height();
        /* var mineheight = $(".tjli:last").height();*/
        var one = 1;
        if (lastShop< scrollHeight + winHeight) {
            $.ajax({
                type: "get",
                url: "http://www.lcdaoxin.com/xiaodaoshop/PHP/goods.php",
                dataType: "json",
                success: function (data) {
                    var gl = $(".tuijianul>li").length;
                    var numl = data.length;
                    if (gl <= numl && nums == 0) {
                        showtj();
                    }
                }
            });
        }
    });
    showtj();
    function showtj(nums) {
        $.ajax({
            type: "get",
            url: "http://www.lcdaoxin.com/xiaodaoshop/PHP/goods.php",
            dataType: "json",
            beforeSend: function () {     //请求成功前触发的局部事件
                $('.ing').html("加载中..");
            },
            success: function (data) {
                goodsl = $(".tuijianul>li").length;
                if (goodsl < data.length) {
                    show($(data).slice(goodsl, goodsl + 4), goodsl+4, data.length);
                }else if(goodsl == data.length){
                    if(nums == 0){
                        show($(data).slice(goodsl, goodsl + 4), goodsl+4, data.length);
                    }

                }
            }
        });
    }
    function show(data, goodsl, length) {
        $(data).each(function (index, element) {
            $(".tuijianul").append("<li class='tjli'><div class='whiteli'><a href='goods.html?id="+data[index].goodsid+"'><img class='bai' src='" + data[index].imgsrc + "'><span class='tjtext'>" + data[index].tjtitle + "</span></a><span class='tj-price'>¥<span class='big-price'>" + data[index].bigprice + "</span><span class='small-price'>." + data[index].smallprice + "</span></span><a class='button-xq' href='goods.html?id="+data[index].goodsid+"'>详情</a></div></li>")
        });
        if (goodsl == length) {
            nums = 1;
            $('.ing').html("<i class='icon iconfont inao'>&#xe622;</i>抱歉，没有更多商品推荐！");
        }
    }
    (function () {
        function refresh() {
            var endTime = new Date("2016/9/30 00:00:00");
            var nowTime = new Date();
            var currentTime = parseInt((endTime.getTime() - nowTime.getTime()) / 1000);
            if (currentTime < 0) {
                currentTime = 0;
            }
            var day = parseInt((currentTime / 3600) / 24);
            var hour = parseInt((currentTime / 3600) % 24);
            var minute = parseInt((currentTime / 60) % 60);
            var second = parseInt(currentTime % 60);
            $(".clock>span:nth-child(1)").html(day < 10 ? "0" + day : day);
            $(".clock>span:nth-child(3)").html(hour < 10 ? "0" + hour : hour);
            $(".clock>span:nth-child(5)").html(minute < 10 ? "0" + minute : minute);
            $(".clock>span:nth-child(7)").html(second < 10 ? "0" + second : second);
        }
        refresh();
        setInterval(refresh, 1000);
    })();
    checkLogin.docheck();//检查登录
}]);