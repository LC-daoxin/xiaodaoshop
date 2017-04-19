/**
 * Created by lince on 16/8/16.
 */
myGoods.factory("httpajax", function ($http) {
    var doRequest = function (url) {
        return $http({
            method: "get",
            url: url
        })
    };
    return {
        getcomment: function (url) {
            return doRequest(url);
        }
    };

});
myGoods.service("getAddress", function () {
    /* var Address = null;*/
    var arr = [];
    return arr;
});
myApp.factory("checkLogin", function () {
    var login = function () {
        if (((new Date(localStorage.getItem("freelogin")) > new Date()) && (localStorage.getItem("xdln") !== null) && (localStorage.getItem("xdpw") !== null)) || ((sessionStorage.getItem("xdln-l") !== null) && (sessionStorage.getItem("xdpw-l") !== null))) {
            $("#menu-mine").attr("href", "#mine");
            $(".attentionto").attr("href", "#attention");
            $("#mine").attr("href", "#mine");
            $("#index_Login1").css("display", "block");
            $("#index_Login").css("display", "none");
            $("#emptyCartLogin").css("display", "none");
        } else {
            $("#menu-mine").attr("href", "#login");
            $(".attentionto").attr("href", "#login");
            $("#index_Login1").css("display", "none");
            $("#index_Login").css("display", "block");
            $("#mine").attr("href", "#login");
            $("#emptyCartLogin").css("display", "block");
        }
    };
    return {
        docheck: function () {
            return login();
        }
    }
});
myApp.factory("hidenav", function () {
    return function () {
        $("#nav").css({"display": "none"});
        $("#footer").css({"display": "none"});
        $(".g-head").css({"display": "none"});
        $(".yin").css("display", "none");
        $(".xd-header-yin").css("display", "none");
        $("body").removeClass("gbackg");
    };
});
myGoods.factory("goodsid", function () {  //返回当前页面商品id
    return function (url) {
        var locationSearch = url.slice(-30).length > 0 ? url.slice(-30) : '';
        /*var str1 = locationSearch.slice(1);
        var arr1 = str1.split('#');*/
        var arr1 = locationSearch.split('#');
        var idarr = arr1[0].split('=');
        id = idarr[1];
        return id;
    }
});
myGoods.factory("checkLogin", function () {
    var login = function () {
        if (((new Date(localStorage.getItem("freelogin")) > new Date()) && (localStorage.getItem("xdln") !== null) && (localStorage.getItem("xdpw") !== null)) || ((sessionStorage.getItem("xdln-l") !== null) && (sessionStorage.getItem("xdpw-l") !== null))) {
            $(".yellow-color").removeAttr("href");/*.attr("ng-click","gocart()")*/
            $(".red-color").removeAttr("href");
            $(".order-numbers").css("display","block");
        } else {
            $(".yellow-color").attr("href", "index.html#/login").removeAttr("ng-click","gocart()");
            $(".red-color").attr("href", "index.html#/login");
            $(".order-numbers").css("display","none");
        }
    };
    return {
        docheck: function () {
            return login();
        }
    }
});