/**
 * Created by lince on 16/8/30.
 */
myApp.controller("registerCtrl", ["$scope","hidenav",function ($scope,hidenav) {
    hidenav();
    $("#register").css({"display":"block"});
    var btnflag = 0;
    var h=document.body.clientHeight;
    $(".page").css("height",h-44+'px');
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
        $(".warnred-y").css("display","none");
        if($("#telphone").val()!== ''&&$("#telsubmit").attr("data-flag")!=="1"){
            $("#telsubmit").removeClass("mesg-disable");
        }else{
            $("#telsubmit").addClass("mesg-disable");
        }
        if($("#password").val()!== '' && $("#telphone").val()!== ''&& $("#Securitycode").val()!== ''){
            $("#loginBtn").removeClass("btngray").addClass("redbtn").attr("disabled",false);
        }else{
            $("#loginBtn").removeClass("redbtn").addClass("btngray").attr("disabled",true);
        }
    }
    $("#password").on("keyup",allow);
    $("#telphone").on("keyup",allow);
    $("#Securitycode").on("keyup",allow);
    /*生成随机四位验证码*/
    var MIMAJ = "1234567890";
    function yzm(MIMAJ) {
        var sum = '';
        for (var i = 0; i < 4; i++) {
            var a = Math.floor(Math.random() * MIMAJ.length);
            sum += MIMAJ.substring(a, a + 1);
        }
        return sum;
    }
    /*获取短信验证码*/
    $("#telsubmit").on("click",function(){
        var telregexp=/^1[3|4|5|7|8]\d{9}$/;
        if(telregexp.test($("#telphone").val())){
            $(".warnred-tel").css("display","none");
            $("#telborder").removeClass("telborder");
            sessionStorage.setItem("newphone",$("#telphone").val());
            if($("#telphone").val() == sessionStorage.getItem("sendphone")){
                if(new Date(sessionStorage.getItem("outtime"))>new Date()){
                    $(".warnred-p").css("display","inline-block");
                    /*刷新后改为另一个号码，再刷新换成第一个号码，可以继续发送，这个bug未解决*/
                }else{
                    sendphone();
                }
            }else{
                $(".warnred-p").css("display","none");
                sendphone();
            }
        }else{
            $(".warnred-tel").css("display","inline-block");
            $("#telborder").addClass("telborder");
        }
    });
    function sendphone(){
        $.ajax({
            type: "post",
            url: "http://www.lcdaoxin.com/xiaodaoshop/PHP/checktel.php",
            dataType: "json",
            data: {
                tel: $("#telphone").val()
            },
            success: function (data) {
                if (data == "had") {
                    $(".warnred-y").css("display","inline-block");
                }else{
                    $(".pop-dialog").css("display","block");
                    $(".pop-msg span").html($("#telphone").val());
                }
            }
        })
    }
    $(".btn-cancel").on("click",function(){
        $(".pop-dialog").css("display","none");
    });
    $(".btn-continue").on("click",function(){
        $(".pop-dialog").css("display","none");
        sessionStorage.setItem("sendphone",$("#telphone").val());
        var date = new Date();
        date.setTime(date.getTime() + (2 * 60 * 1000)); //2分钟过期
        sessionStorage.setItem("outtime",date);
        time($("#telsubmit"));
        var ycode =yzm(MIMAJ);
        console.log(ycode);
        var ycodea = window.btoa(ycode);
        sessionStorage.setItem("ycode",ycodea);
        var url = "http://api.jisuapi.com/sms/send?mobile="+$("#telphone").val()+"&content=您申请了手机号注册，验证码为："+ycode+"，两分钟内有效。请在注册页面中输入以完成注册！【小刀商城】&appkey= 7650a841abacc32d";
        $.ajax({
            type: "post",
            url: url,
            dataType: "jsonp",
            jsonp: "callback",
            jsonpcallback: "getBack",
            success: function (data) {
                console.log(data);
            }
        })
    });
    /*获取短信验证码*/
    /*发送等待120秒*/
    var wait=120;
    function time(o) {
        $("#telsubmit").attr("data-flag","1");
        if (wait == 0) {
            $("#telsubmit").removeClass("mesg-disable").attr("data-flag","0");
            o.attr("disabled",false);
            o.attr("value","获取短信验证码");
            wait = 120;
        } else {
            $("#telsubmit").addClass("mesg-disable");
            o.attr("disabled", true);
            o.attr("value","重新发送(" + wait + ")");
            wait--;
            setTimeout(function() {
                    time(o)
                },
                1000)
        }
    }
    /*滑动验证框，才能点击*/

    $("#loginBtn").click(function () {
        var ycode = window.atob(sessionStorage.getItem("ycode"));
        if(ycode == $("#Securitycode").val()){
            $("#Securitycodeborder").removeClass("Securitycodeborder");
            $(".warnred-m").css("display","none");
            var pwregexp=/^\w{5,19}$/;
            if(pwregexp.test($("#password").val())){
                $(".warnred-pw").css("display","none");
                $("#passwordborder").removeClass("passwordborder");
            }else{
                $(".warnred-pw").css("display","inline-block");
                $("#passwordborder").addClass("passwordborder");
            }
        }else{
            $("#Securitycodeborder").addClass("Securitycodeborder");
            $(".warnred-m").css("display","inline-block");
        }
    });
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
                    url: "http://www.lcdaoxin.com/xiaodaoshop/PHP/register.php",
                    dataType: "json",
                    data: {
                        tel: $("#telphone").val(),
                        password: $("#password").val()
                    },
                    success: function (data) {
                        if (data == "success") {
                            window.location.href='index.html#/login';
                        } else if(data == "Not filled"){
                            console.log(data);
                        } else if(data == "error"){
                            console.log(data);
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
}]);