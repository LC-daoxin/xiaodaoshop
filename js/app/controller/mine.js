/**
 * Created by lince on 16/8/31.
 */
myApp.controller("mineCtrl", ["$scope","hidenav",function ($scope,hidenav) {
    hidenav();
    $("#myXD").css({"display":"block"});
    var showID=null;
    if(localStorage.getItem("xdln")!==null){
        showID = window.atob(localStorage.getItem("xdln"));
        $("#mname").html("XD-"+showID);
    }else{
        showID = window.atob(sessionStorage.getItem("xdln-l"));
        $("#mname").html("XD-"+showID);
    }
    $("#zhuxiao").on("click",function(){
        sessionStorage.removeItem("xdln-l");
        sessionStorage.removeItem("xdpw-l");
        localStorage.removeItem("xdln");
        localStorage.removeItem("xdpw");
        localStorage.removeItem("freelogin");
        window.location.href="index.html";
    })
}]);