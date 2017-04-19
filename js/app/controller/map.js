/**
 * Created by lince on 16/8/25.
 */
myGoods.controller("mapCtrl",["$scope","getAddress",function(scope,getAddress){
    mapurl();
    function mapurl(){
        var url = window.location.href;
        var str1=url.slice(0);
        var arr1=str1.split('#');
        var arr2=arr1[1].split('/');
        if(arr2[1] == 'map'){
            $(".xd-head-title").css("display", "none");
            $(".xd-head-title1").css("display", "block");
            $(".goodsfoot").css("display", "none");
            $(".goodsback").attr("href","#goods-s");
        }
    }
    $(".goodsback").on("click",function(){
        $(".xd-head-title").css("display", "block");
        $(".xd-head-title1").css("display", "none");
        $(".goodsfoot").css("display", "block");
    });
    if (navigator.userAgent.match(/mobile/i)) {
        getLocation();
       /* mapajax(116.404,39.915);*/
    }else{
        mapajax(116.404,39.915);
        /*var point = new BMap.Point(116.404, 39.915);
        setmap(point);*/
    }
    function getLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function (position) {
                var pc = position.coords,
                    lat = pc.latitude,
                    lng = pc.longitude;
                $.ajax({
                    type: "get",
                    url: "http://api.map.baidu.com/geoconv/v1/?coords=" + lng + "," + lat + "&from=1&to=5&ak=6ksoQIt7Mnty6pULRYyxhtdrFKlIBa56",
                    dataType: "jsonp",
                    jsonp: "callback",
                    success: function (data) {
                        $.ajax({
                            type: "get",
                            dataType: "jsonp",
                            jsonp: "callback",
                            jsonpCallback: "renderReverse",
                            url: "http://api.map.baidu.com/geocoder/v2/?ak=6ksoQIt7Mnty6pULRYyxhtdrFKlIBa56&callback=renderReverse&location=" + data.result[0].y + "," + data.result[0].x + "&output=json&pois=1",
                            success: function (result) {
                                eachaddress(result.result.pois,result);
                                setaddress(result);
                            }
                        })
                    }
                })
            },function(error) {
                mapajax(116.404,39.915);
            });
        }
    }
    function mapajax(lng,lat,flag){
        $.ajax({
            type: "get",
            dataType: "jsonp",
            jsonp: "callback",
            jsonpCallback: "renderReverse",
            url: "http://api.map.baidu.com/geocoder/v2/?ak=6ksoQIt7Mnty6pULRYyxhtdrFKlIBa56&callback=renderReverse&location=" + lat + "," + lng + "&output=json&pois=1",
            success: function (result) {
                $(".addresslist li").remove();
                eachaddress(result.result.pois,result,flag);
                setaddress(result);
            }
        })
    }
    function eachaddress(data,result,flag){
        if(flag !== true){
            $("#maptext").html("");
        }
        $(".addresslist").append("<li><div class='adsi'><i class='iconfont'>&#xe611;</i></div><div class='ads-item1'><p class='pitem1'><span class='p-blue'>[当前]</span><span class='pitem1-s'></span></p><p class='pitem2'></p></div></li>");
        $(".addresslist li:eq(0) .pitem1-s").html(result.result.formatted_address);
        $(".addresslist li:eq(0) .pitem2").html(result.result.sematic_description);
        $(data).each(function (index, element) {
            $(".addresslist").append("<li><div class='adsi'><i class='iconfont'>&#xe611;</i></div><div class='ads-item1'><p class='pitem1'><span class='p-blue'></span><span class='pitem1-s'>"+data[index].name+"</span></p><p class='pitem2'>"+data[index].addr+"</p></div></li>")
        });
        $(".addresslist li:eq(0) .p-blue").html("[当前]");
    }
    function setaddress(position) {
        var a = position.result.location.lng, b = position.result.location.lat;
        sessionStorage.setItem("zuo", a);
        sessionStorage.setItem("you", b);
        var l = sessionStorage.getItem("zuo");
        var r = sessionStorage.getItem("you");
        var point = new BMap.Point(l, r);  // 创建点坐标
        setmap(point);
    }
    function setmap(point) {
        var map = new BMap.Map("container");
        var marker = new BMap.Marker(point);        // 创建标注
        map.addOverlay(marker);
        map.centerAndZoom(point, 17);                 // 初始化地图，设置中心点坐标和地图级别
        map.addControl(new BMap.NavigationControl());
        map.addControl(new BMap.ScaleControl());
        map.addControl(new BMap.OverviewMapControl());
        map.addControl(new BMap.MapTypeControl());
        map.setCurrentCity("北京");
        marker.enableDragging();
        marker.addEventListener("dragend", listenmarker, false);
    }
    function theLocation() {
        var map = new BMap.Map("container");
        var location = document.getElementById("mapaddress").value;
        if (location !== "") {
            var myGeo = new BMap.Geocoder(); // 将地址解析结果显示在地图上,并调整地图视野
            myGeo.getPoint(location, function (point) {
                if (point) {
                    mapajax(point.lng,point.lat);
                } else {
                    $("#maptext").html("抱歉，您选择的地址没有搜索到结果！");
                    mapajax(116.404,39.915,true);
                }
            }, "北京市");
        }
    }
    function listenmarker(e) {
        $(".addresslist li").remove();
        mapajax(e.point.lng,e.point.lat);
    }
    function eachaddress1(data){
        $("#maptext").html("");
        $(data).each(function (index, element) {
            $(".addresslist").append("<li><div class='adsi'><i class='iconfont'>&#xe611;</i></div><div class='ads-item1'><p class='pitem1'><span class='p-blue'></span><span class='pitem1-s'>"+data[index].title+"</span></p><p class='pitem2'>"+data[index].address+"</p></div></li>")
        });
        $(".addresslist li:eq(0) .p-blue").html("[当前]");
    }

    $("#mapaddress").on("blur",function(){
        var val =document.getElementById("mapaddress").value;
        if(val.trim().length > 0){
            theLocation();
        }
    }).keyup(function (event) {
        var val =document.getElementById("mapaddress").value;
        var keycode = event.keyCode;
        if (keycode == 13) {
            if(val.trim().length > 0){
                theLocation();
            }
        }
    });
    $(document).on("click", ".addresslist li", function() {
        /*console.log(this);*/
        var addressText = $(this).children(".ads-item1").children(".pitem1").children(".pitem1-s")[0].innerHTML;
        sessionStorage.setItem("addressText",addressText);
        getAddress.length =0;
        getAddress.push(addressText);
        $(".addresslist-a").attr("href","#goods-s").trigger("click");
    })
}]);