/**
 * Created by lince on 16/8/17.
 */
myGoods.controller("goodsdetailsCtrl", ["$scope", "goodsid",function ($scope,goodsid) {
    $("body").removeClass("graycomment");
    $(".xd-head-title").css("display", "block");
    $(".goodsfoot").css("display", "block");
    $(".xd-head-title1").css("display", "none");
    $(".xd-head-title a").on("click",function(){
        $(".xd-head-title a").removeClass("header-tab-selected");
        $(this).addClass("header-tab-selected");
    });
    $(".xd-head-title a").removeClass("header-tab-selected");
    $(".xd-head-title>li:eq(1) a").addClass("header-tab-selected");
    function addimg() {
        $.ajax({
            type: "get",
            url: "http://www.lcdaoxin.com/xiaodaoshop/PHP/goods.php",
            dataType: "json",
            success: function (data) {
                var num = url(data);
                if(data[num].imgdescribe !== undefined){
                    addimgdetials(data[num].imgdescribe);
                }
            }
        });
    }
    addimg();
    function addimgdetials(data) {
        $(data).each(function (index, element) {
            $(".goodsdetails-img").append(" <img src='"+data[index]+"' style='display:block;'>")
        });
    }
    function parseQueryString(url){
        var locationSearch=url.slice(-22).length>0?url.slice(-22):'';
        var str1=locationSearch.slice(1);
        var arr1=str1.split('#');
        var idarr=arr1[0].split('=');
        id=idarr[1];
        return id;
    }
    function url(data){
        var url = window.location.href;
        /*parseQueryString(url);
        var id=parseQueryString(url);*/
        var id=goodsid(url);
        var dataid = null;
        for(var i=0;i<data.length;i++){
            if(data[i].goodsid == id){
                dataid = i;
            }
        }
        return dataid;
    }
}]);