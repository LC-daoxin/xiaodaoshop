/**
 * Created by lince on 16/8/18.
 */
myApp.controller("MainCtrl", ["$scope","checkLogin", function ($scope,checkLogin) {
    $(window).scroll(function (event) {
        var opacity = ($(window).scrollTop() - 30) / 300;
        if ($(window).scrollTop() > 30 && $(window).scrollTop() <= 285) {
            $(".xd-search-box-cover").css("opacity", opacity);
        } else {
            $(".xd-search-box-cover").css("opacity", "0");
        }
        if ($(window).scrollTop() > 285) {
            $(".xd-search-box-cover").css("opacity", "0.85");
        }
    });
    /*判断用户是否点击30天免登录，同时检测是否登录*/
    checkLogin.docheck();
    /*超过30天删除local*/
    if(new Date(localStorage.getItem("freelogin"))<new Date()){
        localStorage.removeItem("xdln");
        localStorage.removeItem("xdpw");
        localStorage.removeItem("freelogin");
    }
}]);
