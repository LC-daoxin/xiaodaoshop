/**
 * Created by lince on 16/9/21.
 */
myApp.controller("activity4Ctrl", ["$scope","checkLogin","hidenav",function ($scope,checkLogin,hidenav) {
    hidenav();
    checkLogin.docheck();
    $("#activity4").css({"display":"block"});
}]);