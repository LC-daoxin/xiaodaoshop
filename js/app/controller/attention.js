/**
 * Created by lince on 16/9/7.
 */
myApp.controller("attentionCtrl", ["$scope","checkLogin","hidenav",function ($scope,checkLogin,hidenav) {
    hidenav();
    $("#attention").css({"display":"block"});
    checkLogin.docheck();
    $scope.btnred1 = function(){
        $("#guanzhushangpin span").addClass("redF");
        $("#guanzhudianpu span").removeClass();
        $(".nogoods-wrap span").html("商品");
    };
    $scope.btnred2 = function(){
        $("#guanzhudianpu span").addClass("redF");
        $("#guanzhushangpin span").removeClass();
        $(".nogoods-wrap span").html("店铺");
    };

}]);