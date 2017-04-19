/**
 * Created by lince on 16/9/21.
 */
myApp.controller("activity2Ctrl", ["$scope","checkLogin","hidenav","$location",'$anchorScroll',function ($scope,checkLogin,hidenav,$location,$anchorScroll) {
    hidenav();
    checkLogin.docheck();
    $("#activity2").css({"display":"block"});
    $scope.gotoBottom = function() {
        // 将location.hash的值设置为
        // 你想要滚动到的元素的id
        $location.hash('bottom');
        // 调用 $anchorScroll()
        $anchorScroll();
    };
}]);