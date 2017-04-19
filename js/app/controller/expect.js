/**
 * Created by lince on 16/9/1.
 */
myApp.controller("expectCtrl", ["$scope", function ($scope) {
    $("#nav").css({"display":"none"});
    $("#footer").css({"display":"none"});
    $("#expect").css({"display":"block"});
    var h=document.body.clientHeight;
    $(".page-expect").css("height",h-44+'px');
}]);