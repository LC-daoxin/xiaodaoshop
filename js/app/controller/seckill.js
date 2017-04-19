/**
 * Created by lince on 16/9/13.
 */
myApp.controller("seckillCtrl", ["$scope", "checkLogin", "hidenav", "$compile",function ($scope, checkLogin, hidenav,$compile) {
    hidenav();
    $("#seckill").css({"display": "block"});
    checkLogin.docheck();
    window.scrollTo(0, 0);
    var el=$compile("<li class='bdr-bom' id='{{item.goodsid}}' ng-repeat='item in killlists'><div class='skill-pic'><div class='killimg'><a href='goods.html?id={{item.goodsid}}'><img ng-src='{{item.imgsrc}}'></a></div></div><a href='goods.html?id={{item.goodsid}}'><p class='g-title'>{{item.tjtitle}}</p></a><p class='g-price'><i class='doller'>￥</i>{{item.bigprice}}<span class='f-s-12'>.{{item.smallprice}}</span></p><div class='skill-price'><p class='g-price-odd'><del>{{item.killprice}}</del></p><div class='skill-lod'><span class='sale-count'>已秒<em>{{item.percentage}}</em>%</span><div class='kill-progress'><div class='skill-pro-bg'><p class='skill-iteam-progress'><span class='skill-pro-insetbg'><span class='skill-iteam-pro' style='width: {{item.percentage}}%;'></span></span></p></div></div></div></div><a href='goods.html?id={{item.goodsid}}'><span class='skill-count'>去秒杀</span><span class='skill-count1'>秒杀完毕</span></a></li>")($scope);
    /*倒计时*/
    function timeshow() {
        var _t = new Date();
        if (_t.getHours() >= 0 && _t.getHours() < 8) {
            $(".tap-list li").removeClass("cur");
            $("#0").addClass("cur");
            getseckillgoods(0);
        } else if (_t.getHours() >= 8 && _t.getHours() < 12) {
            $(".tap-list li").removeClass("cur");
            $("#8").addClass("cur");
            $("#8 p:eq(1)").html("秒杀中");
            $("#0 p:eq(1)").html("已结束");
            getseckillgoods(8);
        } else if (_t.getHours() >= 12 && _t.getHours() < 16) {
            $(".tap-list li").removeClass("cur");
            $("#12").addClass("cur");
            $("#12 p:eq(1)").html("秒杀中");
            $("#0 p:eq(1)").html("已结束");
            $("#8 p:eq(1)").html("已结束");
            getseckillgoods(16);
        } else if (_t.getHours() >= 16 && _t.getHours() < 20) {
            $(".tap-list li").removeClass("cur");
            $("#16").addClass("cur");
            $("#16 p:eq(1)").html("秒杀中");
            $("#0 p:eq(1)").html("已结束");
            $("#8 p:eq(1)").html("已结束");
            $("#12 p:eq(1)").html("已结束");
            getseckillgoods(22);
        } else if (_t.getHours() >= 20 && _t.getHours() < 24) {
            $(".tap-list li").removeClass("cur");
            $("#20").addClass("cur");
            $("#20 p:eq(1)").html("秒杀中");
            $("#0 p:eq(1)").html("已结束");
            $("#8 p:eq(1)").html("已结束");
            $("#12 p:eq(1)").html("已结束");
            $("#16 p:eq(1)").html("已结束");
            getseckillgoods(5);
        }
    }
    timeshow();
    function getseckillgoods(index) {
        $.ajax({
            type: "get",
            url: "http://localhost/xiaodaoshop/PHP/goods.php",
            dataType: "json",
            beforeSend: function (XMLHttpRequest) {
                $('#seckilling').empty();

                $('#seckill-body').hide();
                $('.errPic').show();
            },
            success: function (data, textStatus) {
               /* $('#seckilling').html("");*/
                $('#seckilling').append(el);
                if (textStatus == 'success') {
                    $scope.killlists = data.slice(index,index+9);
                    $scope.$apply();
                    killover(data);
                }
            },
            complete: function (XMLHttpRequest, textStatus) {
                $('.errPic').hide();
                $('#seckill-body').show();
            },
            error: function () {
            }
        })
    }
    $(window).scroll(function () {
        if ($(window).scrollTop() > 0) {
            $(".yin").css("display", "none");
        }
        if ($(window).scrollTop() > 44) {
            $("#topfixed").css("position", "fixed");
        } else {
            $("#topfixed").css("position", "static");
        }
    });
    function refresh() {
        var _t1 = new Date();
        var htime = null;
        if (_t1.getHours() >= 0 && _t1.getHours() < 8) {
            htime = "8";
        } else if (_t1.getHours() >= 8 && _t1.getHours() < 12) {
            htime = "12";
        } else if (_t1.getHours() >= 12 && _t1.getHours() < 16) {
            htime = "16";
        } else if (_t1.getHours() >= 16 && _t1.getHours() < 20) {
            htime = "20";
        } else if (_t1.getHours() >= 20 && _t1.getHours() < 24) {
            htime = "23";
        }
        var nowTime = new Date();
        var day = nowTime.getDate();
        if (_t1.getHours() >= 20 && _t1.getHours() < 24){
            var endTime = new Date("2016/9/" + day + " " + htime + ":59:59");
            var currentTime = parseInt((endTime.getTime() - nowTime.getTime()+1000) / 1000);
        }else{
            var endTime = new Date("2016/9/" + day + " " + htime + ":00:00");
            var currentTime = parseInt((endTime.getTime() - nowTime.getTime()) / 1000);
        }
        if (currentTime < 0) {
            currentTime = 0;
        }
        var hour = parseInt((currentTime / 3600) % 24);
        var minute = parseInt((currentTime / 60) % 60);
        var second = parseInt(currentTime % 60);
        $(".seckill-time:eq(0)").html(hour < 10 ? "0" + hour : hour);
        $(".seckill-time:eq(1)").html(minute < 10 ? "0" + minute : minute);
        $(".seckill-time:eq(2)").html(second < 10 ? "0" + second : second);
    }
    refresh();
    var downtime = setInterval(refresh, 1000);
    function changetime(nexttime,state){
        var _t1 = new Date();
        var htime = null;
        if (_t1.getHours() >= 0 && _t1.getHours() < 8) {
            htime = "8";
        } else if (_t1.getHours() >= 8 && _t1.getHours() < 12) {
            htime = "12";
        } else if (_t1.getHours() >= 12 && _t1.getHours() < 16) {
            htime = "16";
        } else if (_t1.getHours() >= 16 && _t1.getHours() < 20) {
            htime = "20";
        } else if (_t1.getHours() >= 20 && _t1.getHours() < 24) {
            htime = "23";
        }
        var nowTime = new Date();
        var day = nowTime.getDate();
        if(nexttime == 0 && state == 0){
            var endTime = new Date("2016/9/" + day + " 0" + htime + ":00:00");
            $("#staticTxtEnd").html("距结束");
        }else if((nexttime == 0||nexttime == 8) && state == 1){
            var endTime = new Date("2016/9/" + day + " 0" + nexttime + ":00:00");
            $("#staticTxtEnd").html("已结束");
        }else if(state == 1 && nexttime > 8){
            var endTime = new Date("2016/9/" + day + " " + nexttime + ":00:00");
            $("#staticTxtEnd").html("已结束");
        }else if(state == 2 && nexttime == 8){
            var endTime = new Date("2016/9/" + day + " 0" + htime + ":00:00");
            $("#staticTxtEnd").html("距结束");
        }else if(state == 2 && nexttime > 8 && (_t1.getHours() >= 20 && _t1.getHours() < 24)){
            var endTime = new Date("2016/9/" + day + " " + htime + ":59:59");
            $("#staticTxtEnd").html("距结束");
        }else if(state == 2 && nexttime > 8 && (_t1.getHours() >= 0 && _t1.getHours() < 20)){
            var endTime = new Date("2016/9/" + day + " " + htime + ":00:00");
            $("#staticTxtEnd").html("距结束");
        }else{
            var endTime = new Date("2016/9/" + day + " " + nexttime + ":00:00");
            $("#staticTxtEnd").html("距开始");
        }
        var currentTime = null;
        if(state == 1||state == 0||state == 2){
            currentTime = parseInt((endTime.getTime() - nowTime.getTime()) / 1000);
        }else if(state == 3){
            currentTime = parseInt((endTime.getTime() - nowTime.getTime() ) / 1000);
        }
        if (currentTime < 0) {
            currentTime = 0;
        }
        var hour = parseInt((currentTime / 3600) % 24);
        var minute = parseInt((currentTime / 60) % 60);
        var second = parseInt(currentTime % 60);
        $(".seckill-time:eq(0)").html(hour < 10 ? "0" + hour : hour);
        $(".seckill-time:eq(1)").html(minute < 10 ? "0" + minute : minute);
        $(".seckill-time:eq(2)").html(second < 10 ? "0" + second : second);
    }
    var downtime1 = null;
    $(".tap-list li").on("click", function () {
        $(this).addClass("cur").siblings().removeClass();
        var index = $(this).attr("id");
        var status = $(this).attr("id");
        var _ct = new Date();
        if(_ct.getHours()<8){
            clearInterval(downtime);
            clearInterval(downtime1);
            changetime(status,0);
            downtime1 = setInterval(function(){
                changetime(status,0);
            }, 1000);
        }else if(_ct.getHours()>=Number(status)+4){
            clearInterval(downtime);
            clearInterval(downtime1);
            changetime(status,1);
            downtime1 = setInterval(function(){
                changetime(status,1);
            }, 1000);
        }else if(_ct.getHours()>=Number(status)){
            clearInterval(downtime);
            clearInterval(downtime1);
            changetime(status,2);
            downtime1 = setInterval(function(){
                changetime(status,2);
            }, 1000);
        }else{
            clearInterval(downtime);
            clearInterval(downtime1);
            changetime(status,3);
            downtime1 = setInterval(function(){
                changetime(status,3);
            }, 1000);
        }
        if(status == 0){
            getseckillgoods(0);
        }else if(status == 8){
            getseckillgoods(8);
        }else if(status == 12){
            getseckillgoods(16);
        }else if(status == 16){
            getseckillgoods(22);
        }else if(status == 20){
            getseckillgoods(5);
        }
    });
    function killover(data){
        for(var i = 0 ;i<data.length;i++){
            if(data[i].percentage == 100){
                var killcss = "#"+data[i].goodsid+" .kill-progress";
                var htmlcss = "#"+data[i].goodsid+" .sale-count";
                var btncss = "#"+data[i].goodsid+" .skill-count";
                var btncss1 = "#"+data[i].goodsid+" .skill-count1";
                $(killcss).css("display","none");
                $(htmlcss).html("100件已秒杀完").css("margin-right","10px");
                $(btncss).css("display","none");
                $(btncss1).css("display","block");
            }
        }
    }

}]);