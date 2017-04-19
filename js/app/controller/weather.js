/**
 * Created by lince on 16/9/4.
 */
myApp.controller("weatherCtrl", ["$scope","hidenav",function ($scope,hidenav) {
    hidenav();
    getweather("北京");
    function getweather(city){
        $.ajax({
            type: "get",
            async:false,
            url: "http://api.jisuapi.com/weather/query?appkey=7650a841abacc32d&city="+city,
            dataType: "jsonp",
            jsonp: "callback",
            jsonpcallback: "getBack",
            success: function (data) {
                console.log(data);
                if(data.msg == "ok"){
                    $(".search_page").css("display","none");
                    $(".active1 a").html(data.result.city);
                    $(".js_search_tips ul .bcity").html(data.result.city);
                    setweather(data.result,city);
                    $(".search_page .box span").css("display","none");
                    $(".js_input").val("");
                }else{
                    alert("城市数据不存在！");
                }

            }
        });
    }
    function setweather(data,city){
        $(".city").html(city);
        $(".info_wea").html(data.weather);
        $(".info_about em").html(data.temp);
        $(".info_about p:eq(0)").html(data.winddirect+data.windpower+" 风速"+data.windspeed+"级"+" 湿度"+data.humidity+"%");
        $(".info_about p:eq(1)").html(data.index[6].detail);
        if(data.weather == "雷阵雨"){
            $(".days .single:eq(0) img").attr("src","img/weather/w4.png");
        }else if(data.weather == "晴"){
            $(".days .single:eq(0) img").attr("src","img/weather/w0.png");
        }else{
            $(".days .single:eq(0) img").attr("src","img/weather/w2.png");
        }
        if(data.daily[1].day.weather == "晴"){
            $(".days .single:eq(1) img").attr("src","img/weather/w0.png");
        }else if(data.daily[1].day.weather == "雷阵雨"){
            $(".days .single:eq(1) img").attr("src","img/weather/w4.png");
        }else{
            $(".days .single:eq(1) img").attr("src","img/weather/w2.png");
        }
        if(data.aqi.quality == "良"){
            $(".info_aqi .info_warn").removeClass().addClass("info_warn warn_2");
            $(".info_aqi strong").html(data.aqi.aqi+" "+data.aqi.quality);
            $(".days .single:eq(0) span").html(data.aqi.quality).removeClass().addClass("warn_2");
        }else if(data.aqi.quality == "优"){
            $(".info_aqi .info_warn").removeClass().addClass("info_warn warn_1");
            $(".info_aqi strong").html(data.aqi.aqi+" "+data.aqi.quality);
            $(".days .single:eq(0) span").html(data.aqi.quality).removeClass().addClass("warn_1");
        }else{
            $(".info_aqi .info_warn").removeClass().addClass("info_warn warn_3");
            $(".info_aqi strong").html(data.aqi.aqi+" "+data.aqi.quality);
            $(".days .single:eq(0) span").html(data.aqi.quality).removeClass().addClass("warn_3");
        }
        $(".days .single:eq(0) b").html(data.templow+"/"+data.temphigh+"°");
        $(".days .single:eq(0) strong").html(data.weather);
        $(".days .single:eq(1) b").html(data.daily[1].night.templow+"/"+data.daily[1].day.temphigh+"°");
        $(".days .single:eq(1) strong").html(data.daily[1].day.weather);
        $(".chart ul li:eq(0) span").html(data.aqi.pm2_5);
        $(".chart ul li:eq(1) span").html(data.aqi.no2);
        $(".chart ul li:eq(2) span").html(data.aqi.so2);
        $(".chart ul li:eq(3) span").html(data.aqi.o3);
        $(".chart ul li:eq(4) span").html(data.aqi.co);
        $(".aqi_tips .api_text:eq(0) span:eq(0)").html(data.index[0].iname+":");
        $(".aqi_tips .api_text:eq(0) span:eq(1)").html(data.index[0].detail);
        $(".aqi_tips .api_text:eq(1) span:eq(0)").html(data.index[1].iname+":");
        $(".aqi_tips .api_text:eq(1) span:eq(1)").html(data.index[1].detail);
        $(".aqi_tips .api_text:eq(2) span:eq(0)").html(data.index[2].iname+":");
        $(".aqi_tips .api_text:eq(2) span:eq(1)").html(data.index[2].detail);
        $(".aqi_tips .api_text:eq(3) span:eq(0)").html(data.index[3].iname+":");
        $(".aqi_tips .api_text:eq(3) span:eq(1)").html(data.index[3].detail);
        $(".aqi_tips .api_text:eq(4) span:eq(0)").html(data.index[4].iname+":");
        $(".aqi_tips .api_text:eq(4) span:eq(1)").html(data.index[4].detail);
    }
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
                setnews(data.result.list.slice(0,4));
            }
        });
    }
    function setnews(data){
        $(data).each(function (index, element) {
            $(".weanews ul").append("<li><a target='_blank' href='"+data[index].url+"'>"+data[index].title+"</a></li>")
        });
    }
    $("#t-city").on("click",function(){
        $(".search_page").css("display","block");
    });
    $(".return").on("click",function(){
        $(".search_page").css("display","none");
    });
    $(".js_input").on("keyup",function(){
        if($(".js_input").val()!==""){
            $(".search_page .box span").css("display","block");
        }else{
            $(".search_page .box span").css("display","none");
        }
    }).keyup(function (event) {
        var keycode = event.keyCode;
        if (keycode == 13) {
            getweather($(".js_input").val());
        }
    });
    $(".search_page .box span").on("click",function(){
        getweather($(".js_input").val());
    });
    $(".js_search_tips li").on("click",function(){
        $(".search_page .box span").css("display","block");
        $(".js_input").val(this.innerHTML);
    })
}]);