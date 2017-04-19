/**
 * Created by Administrator on 2016/8/15.
 */
myApp.controller("searchCtrl", ["$scope","hidenav",function ($scope,hidenav) {
    hidenav();
    $("#search-t").css("display", "block");
    var key = document.getElementById("key");
    var li = document.getElementById('shangpin').getElementsByTagName('li');
    var btn = document.getElementById('sousuo');
    var span = document.getElementById('hislist').getElementsByTagName('span');
    var huan = document.getElementById('huan');
    var color = ['#f75c5c', 'pink', '#6de46d', 'orange', '#8f8fe8', 'yellow'];
    var datalist = [];
    var arr = [];
//服务器获取数据
    function ajax() {
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4) {
                if (xhr.status == 200) {
                    pushData(JSON.parse(xhr.responseText));
                }
            }
        };
        xhr.open("get", "http://localhost/xiaodaoshop/PHP/search.php");//apache时记得把localhost改地址
        xhr.send();
    }

//把回调数据放在datalist数组中，并调用turn方法
    function pushData(xhrdata) {
        for (var i = 0; i < xhrdata.length; i++) {
            datalist.push(xhrdata[i]);
        }
        turn();
    }

    ajax();
    licolor();

//换一批 点击事件
    huan.onclick = function () {
        turn();
        licolor();
    };

//licolor方法 和turn方法一样，不过改变的是随机背景颜色，并且不重复
    function licolor() {
        var lin = [];
        for (var i = 0; i < 6; i++) {
            var y = Math.floor(Math.random() * color.length);
            li[i].style.backgroundColor = color[y];
            lin.push(color.splice(y, 1).join(''));
        }
        for (var t = 0; t < 6; t++) {
            color.push(lin[t]);
        }
    }

//turn方法：随机打乱显示热门商品 并且不重复
    function turn() {
        arr = datalist;
        var lin = [];
        for (var j = 0; j < 6; j++) {
            var y = Math.floor(Math.random() * arr.length);
            li[j].innerHTML = arr[y];
            lin.push(arr.splice(y, 1).join('')); //删除掉已显示过得商品，使其不重复显示，并把删除掉的元素放到新数组中
        }
        for (var i = 0; i < 6; i++) {
            arr.push(lin[i]); //新数组添加到原数组中，原数组元素不变
        }
    }

//判断localAtorage是否为空，不为空则按照sckey内元素数量显示，最多显示6个搜索历史
    if (localStorage.getItem("sckey") == null) {

    } else {
        var localData = localStorage.getItem("sckey");
        var lindata = localData.split(",");
        var num = lindata.length;
        for (var i = 0; i < num; i++) {
            $('#hislist li').eq(i).css("display", "block");
        }
        show(); //调用show方法
    }
//绑定回车键 按回车触发btn
    $("#key").keyup(function (event) {
        var keycode = event.keyCode;
        console.log(event);
        if (keycode == 13) {
            $('#sousuo').trigger('click');
        }
    });
//搜索点击事件 判断local是否为空，为空则创建local并把新输入的添加到local中，输入一个显示一个，去重（搜索历史不重复显示），新输入的如果已有历史记录则放到第一个显示，优化历史记录保存不超过7个。
    btn.onclick = function () {
        var lval = key.value;
        if (lval.trim().length > 0) { //先判断输入的是不是空格
            if (localStorage.getItem("sckey") == null) {
                localStorage.setItem("sckey", lval);
                var currentData = localStorage.getItem("sckey");
                $("#hislist li:eq(0)").css("display", "block"); //输入一个显示一个
                span[0].innerHTML = currentData;
            } else {
                var currentData1 = localStorage.getItem("sckey");
                var lval1 = key.value;
                var cd1 = currentData1.split(",");
                cd1.push(lval1);
                var quchong = cd1;
                var num = quchong.quchong().length;
                quchong = quchong.quchong();//去重（搜索历史不重复显示）
                quchong = quchong.top(lval1, quchong);//新输入的如果已有历史记录则放到第一个显示
                if (num < 7) {
                    $('#hislist li').eq(num - 1).css("display", "block");
                }
                if (num == 7) {  //优化历史记录保存不超过7个
                    quchong = six(quchong);
                }
                setLocalData(quchong);
                show();
            }
        }

    };
//新输入的如果已有历史记录则放到第一个显示,并删除原来位置的历史记录
    Array.prototype.top = function (kval, arr) {
        var num;
        for (var i = 0; i < arr.length; i++) {
            num = i;
            if (arr[i] == kval) {
                arr.splice(num, 1);
            }
        }
        arr.push(kval);
        return arr;
    };
//优化历史记录保存不超过7个
    function six(arr) {
        var num = arr.length - 1;
        var lindata = [];
        for (var i = num; i > 0; i--) {
            lindata[i - 1] = arr[i];
        }
        localStorage.removeItem("sckey");
        localStorage.setItem("sckey", lindata);
        return lindata;
    }

    function setLocalData(value) {
        localStorage.setItem("sckey", value);
    }

//show方法 显示按照倒叙形式，最新搜索的在最上面显示
    function show() {
        var arr = localStorage.getItem("sckey").split(",");
        var max = arr.length - 1;
        for (var i = 0; i < 6; i++) {
            span[i].innerHTML = arr[max];
            max--;
        }
    }

//清除，localStorge 清除显示
    $('#clear').on("click", function () {
        localStorage.removeItem("sckey");
        $("#hislist li").css("display", "none");
    });
//去重
    Array.prototype.quchong = function () {
        var res = [];
        var json = {};
        for (var i = 0; i < this.length; i++) {
            if (!json[this[i]]) {
                res.push(this[i]);
                json[this[i]] = 1;
            }
        }
        return res;
    };
//        点击搜索
    $("#hislist li span").on("click", function () {
        $('#key').val($(this).html());
    });
    $("#shangpin li").on('click', function () {
        $('#key').val($(this).html());
    });

}]);