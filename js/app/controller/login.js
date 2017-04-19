/**
 * Created by lince on 16/8/29.
 */
myApp.controller("loginCtrl", ["$scope","hidenav",function ($scope,hidenav) {
    hidenav();
    $("#login").css({"display":"block"});
    $("body").addClass("gbackg");
    var btnflag = 0;
    $(".label-checkbox").on("click",function(){
        if(btnflag == 0){
            $(".yuanbtn").addClass("leftbtn");
            $(".checkbtn").addClass("redbtn");
            $("#password").attr("type","text");
            btnflag = 1;
        }else{
            $(".yuanbtn").removeClass("leftbtn");
            $(".checkbtn").removeClass("redbtn");
            $("#password").attr("type","password");
            btnflag = 0;
        }
    });
    function allow(){
        if($("#password").val()!== '' && $("#loginname").val()!== ''){
            $("#loginBtn").removeClass("btngray").addClass("redbtn").attr("disabled",false);
        }else{
            $("#loginBtn").removeClass("redbtn").addClass("btngray").attr("disabled",true);
        }
    }
    $("#password").on("keyup",allow);
    $("#loginname").on("keyup",allow);
    /*验证码*/
    var handlerEmbed = function (captchaObj) {
        $("#loginBtn").click(function (e) {
            var validate = captchaObj.getValidate();
            if (!validate) {
                $("#notice")[0].className = "show1";
                setTimeout(function () {
                    $("#notice")[0].className = "hide";
                }, 2000);
                e.preventDefault();
            }else{
                $.ajax({
                    type: "post",
                    url: "http://www.lcdaoxin.com/xiaodaoshop/PHP/login.php",
                    dataType: "json",
                    data: {
                        loginname: $("#loginname").val(),
                        password: $("#password").val()
                    },
                    success: function (data) {
                        if (data == "success") {
                            rember();
                            window.location.href='index.html';
                        } else if(data == "Not filled"){
                        } else if(data == "error"){
                            $(".warntext").css("display","inline-block");
                        }
                    }
                })
            }
        });
        // 将验证码加到id为captcha的元素里，同时会有三个input的值：geetest_challenge, geetest_validate, geetest_seccode
        captchaObj.appendTo("#embed-captcha");
        captchaObj.onReady(function () {
            $("#wait")[0].className = "hide";
        });
    };
    $.ajax({
        // 获取id，challenge，success（是否启用failback）
        url: "http://www.lcdaoxin.com/xiaodaoshop/web/StartCaptchaServlet.php?type=pc&t=" + (new Date()).getTime(), // 加随机数防止缓存
        type: "get",
        dataType: "json",
        success: function (data) {
            // 使用initGeetest接口
            // 参数1：配置参数
            // 参数2：回调，回调的第一个参数验证码对象，之后可以使用它做appendTo之类的事件
            initGeetest({
                gt: data.gt,
                challenge: data.challenge,
                product: "embed", // 产品形式，包括：float，embed，popup。注意只对PC版验证码有效
                offline: !data.success // 表示用户后台检测极验服务器是否宕机，一般不需要关注
            }, handlerEmbed);
        }
    });
    /*验证码*/
    /*一个月免登录*/
    document.getElementById("laberrm").onclick = function(e) {
        var ev = e || window.event;
        var elm = ev.target || ev.srcElement;
        if (elm.tagName === 'LABEL') {return;} /*label label和input关联（for或者input在label下）会被触发两次*/
        // do something;
        if(document.getElementById("remberme").checked==true){ /*???*/
            $("#icon-rember").removeClass("icon-rember1").addClass("icon-rember");
        }else if(document.getElementById("remberme").checked==false){
            $("#icon-rember").removeClass("icon-rember").addClass("icon-rember1");
        }
    };
    /*记录用户名密码*/
    function rember(){
        var base64l=window.btoa($('#loginname').val());
        var base64p=window.btoa($('#password').val());
        var date = new Date();
        if(document.getElementById("remberme").checked==true){
            date.setTime(date.getTime() + (30 * 24 * 60 * 60 * 1000)); //免登录30天
            localStorage.setItem("freelogin",date);
            localStorage.setItem("xdln",base64l);
            localStorage.setItem("xdpw",base64p);
            sessionStorage.removeItem("xdln-l");
            sessionStorage.removeItem("xdpw-l");
            $("#mask, #popup-captcha-mobile").show();
        }else{
            sessionStorage.setItem("xdln-l",base64l);
            sessionStorage.setItem("xdpw-l",base64p);
            localStorage.removeItem("xdln");
            localStorage.removeItem("xdpw");
            localStorage.removeItem("freelogin");
            $("#mask, #popup-captcha-mobile").show();
        }
    }
}]);