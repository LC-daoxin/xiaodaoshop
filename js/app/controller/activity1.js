/**
 * Created by lince on 16/9/21.
 */
myApp.controller("activity1Ctrl", ["$scope","checkLogin","hidenav",function ($scope,checkLogin,hidenav) {
    hidenav();
    checkLogin.docheck();
    $("#activity1").css({"display":"block"});
}]);