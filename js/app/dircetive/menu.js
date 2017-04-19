/**
 * Created by lince on 16/9/1.
 */
myApp.directive("menu", function () {
    return {
        restrict: "AEC",
        template: "<div class='yin'><div class='xd-header-yin'></div><ul class='xd-header-shortcut'><li><a href='index.html#/index-s'><span class='shortcut-home v1'></span><strong>首页</strong></a></li><li><a href='index.html#/search'><span class='shortcut-home v2'></span><strong>搜索</strong></a></li><li><a href='#cart'><span class='shortcut-home v3'></span><strong>购物车</strong></a></li><li><a href='javascript:void 0' id='menu-mine'><span class='shortcut-home v4'></span><strong>我的</strong></a></li></ul></div>",
        replace: true,
        link: function (scope, element, attrs) {
            $(".xd-header-icon-shortcut").on("click", function () {
                if ($(".yin").css("display") == 'none') {
                    $(".yin").css("display", "block");
                    $(".xd-header-yin").css("display", "block");
                } else {
                    $(".yin").css("display", "none");
                    $(".xd-header-yin").css("display", "none");
                }
            });
        }
    }
});
myGoods.directive("menu", function () {
    return {
        restrict: "AEC",
        template: "<div class='yin'><div class='xd-header-yin'></div><ul class='xd-header-shortcut'><li><a href='index.html#/index-s'><span class='shortcut-home v1'></span><strong>首页</strong></a></li><li><a href='index.html#/search'><span class='shortcut-home v2'></span><strong>搜索</strong></a></li><li><a href='index.html#/cart'><span class='shortcut-home v3'></span><strong>购物车</strong></a></li><li><a href='javascript:void 0' id='menu-mine'><span class='shortcut-home v4'></span><strong>我的</strong></a></li></ul></div>",
        replace: true,
        link: function (scope, element, attrs) {
            $(".xd-header-icon-shortcut").on("click", function () {
                console.log(1);
                if ($(".yin").css("display") == 'none') {
                    $(".yin").css("display", "block");
                    $(".xd-header-yin").css("display", "block");
                } else {
                    $(".yin").css("display", "none");
                    $(".xd-header-yin").css("display", "none");
                }
            });
        }
    }
});
