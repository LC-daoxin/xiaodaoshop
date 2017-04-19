/**
 * Created by lince on 16/8/17.
 */
myApp.directive("backtop", function () {
    return {
        restrict: "AEC",
        template: "<div class='backTop'><img class='topimg bai' src='img/top.png'></div>",
        replace: true,
        link: function (scope, element, attrs) {
            var url = window.location.href;
            var str1 = url.slice(0);
            var arr1 = str1.split('#');
            var arr2 = arr1[1].split('/');
            if (arr2[1] == 'news') {
                $(".backTop").css("bottom", 20 + 'px');
            }else{
                $(".backTop").css("bottom", 65 + 'px');
            }
            $(window).scroll(function (event) {
                var winh = $(window).height() / 2;
                if ($(window).scrollTop() > winh) {
                    element.css("display", "block");
                } else {
                    element.css("display", "none");
                }
            });
            element.on("click", function () {
                /*$("body,html").animate({
                 scrollTop: 0
                 })*/
                $("body,html").scrollTop(0);

            });
        }
    }
});
myGoods.directive("gbacktop", function () {
    return {
        restrict: "AEC",
        template: "<div class='gbackTop'><img class='topimg bai' src='img/top.png'></div>",
        replace: true,
        link: function (scope, element, attrs) {
            var url = window.location.href;
            var str1 = url.slice(0);
            var arr1 = str1.split('#');
            var arr2 = arr1[1].split('/');
            if (arr2[1] == 'map') {
                $(".gbackTop").css("bottom", 20 + 'px');
            }else{
                $(".gbackTop").css("bottom", 65 + 'px');
            }
            $(window).scroll(function (event) {
                var winh = $(window).height() / 2;
                if ($(window).scrollTop() > winh) {
                    element.css("display", "block");
                } else {
                    element.css("display", "none");
                }
            });
            element.on("click", function () {
                /*$("body,html").animate({
                 scrollTop: 0
                 })*/
                $("body,html").scrollTop(0);

            });
        }
    }
});