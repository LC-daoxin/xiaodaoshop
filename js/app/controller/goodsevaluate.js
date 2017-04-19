/**
 * Created by lince on 16/8/22.
 */
myGoods.controller("goodsevaluateCtrl", ["$scope","httpajax","goodsid",function (scope,httpajax,goodsid) {
    $(".xd-head-title").css("display", "block");
    $(".goodsfoot").css("display", "block");
    $(".xd-head-title1").css("display", "none");
    $("body").addClass("graycomment");
    $(".xd-head-title a").on("click",function(){
        $(".xd-head-title a").removeClass("header-tab-selected");
        $(this).addClass("header-tab-selected");
    });
    $(".xd-head-title a").removeClass("header-tab-selected");
    $(".xd-head-title>li:eq(2) a").addClass("header-tab-selected");
    function evaluate(arr,flag) {
        $.ajax({
            type: "get",
            url: "http://www.lcdaoxin.com/xiaodaoshop/PHP/goods.php",
            dataType: "json",
            success: function (data) {
                var num = url(data);
                commentnum(data,num);
                var comments;
                if(flag == undefined){
                    comments = data[num].comment;
                }else{
                    comments = arr;
                }
                addstar(comments);
                $(".commentlist li").last().addClass("padbootom");
            }
        });
    }
    var touchnum = null;
    var arrlist=[];
    httpajax.getcomment("http://www.lcdaoxin.com/xiaodaoshop/PHP/goods.php").success(function (data) {
        var num = url(data);
        var arr = data[num].comment;
        if(arr !== undefined){
            scope.commentarr = arr;
            evaluate();
            $(".tabs li").eq(0).addClass("item-red");
        }
        $(".tabs li").on("click",function(){
            $(this).addClass("item-red").siblings().removeClass("item-red");
            $(".commentlist li").last().removeClass("padbootom");
            touchnum = $(this).attr("data-num");
            arr = [];
            arr = touchlist(data,num,touchnum);
            scope.commentarr = arr;
            scope.$apply();
            $(".star").html("");
            var flag = true;
            evaluate(arr,flag);
        });

    });
    function touchlist(data,num,touchnum){
        var alll = data[num].comment.length;
        arrlist = [];
        if(touchnum == 1){
            for(var t=0;t<alll;t++){
                arrlist.push(data[num].comment[t]);
            }
            return arrlist;
        }else if(touchnum == 2){
            for(var i=0;i<alll;i++){
                if(data[num].comment[i].starnum == 5||data[num].comment[i].starnum == 4){
                    arrlist.push(data[num].comment[i]);
                }
            }
            return arrlist;
        }else if(touchnum == 3){
            for(var j=0;j<alll;j++){
                if(data[num].comment[j].starnum == 3||data[num].comment[j].starnum == 2){
                    arrlist.push(data[num].comment[j]);
                }
            }
            return arrlist;
        }else if(touchnum == 4){
            for(var k=0;k<alll;k++){
                if(data[num].comment[k].starnum == 1){
                    arrlist.push(data[num].comment[k]);
                }
            }
            return arrlist;
        }else if(touchnum == 5){
            for(var g=0;g<alll;g++){
                if(data[num].comment[g].imgcomment.length !== 0){
                    arrlist.push(data[num].comment[g]);
                }
            }
            return arrlist;
        }

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
            star(lists[index].starnum, lists[index].userid)
        });
    }
    function url(data){
        var url = window.location.href;
        var id=goodsid(url);
        var dataid = null;
        for(var i=0;i<data.length;i++){
            if(data[i].goodsid == id){
                dataid = i;
            }
        }
        return dataid;
    }
    function commentnum(data,num){
        var allnum = data[num].comment.length;
        $(".tabs li:eq(0) p:eq(1)").html(allnum);
        var goodnum=0;
        var middlenum=0;
        var poornum=0;
        var imgnum=0;
        for(var i=0;i<allnum;i++){
            if(data[num].comment[i].starnum == 5||data[num].comment[i].starnum == 4){
                goodnum += 1;
            }else if(data[num].comment[i].starnum == 3||data[num].comment[i].starnum == 2){
                middlenum += 1;
            }else if(data[num].comment[i].starnum == 1){
                poornum +=1;
            }
            /*if(data[num].comment[i].imgcomment.length !== 0){
                imgnum +=1;
            }*/ /*暂时无图片判断*/
        }
        $(".tabs li:eq(1) p:eq(1)").html(goodnum);
        $(".tabs li:eq(2) p:eq(1)").html(middlenum);
        $(".tabs li:eq(3) p:eq(1)").html(poornum);
        $(".tabs li:eq(4) p:eq(1)").html(imgnum);
    }
}]);