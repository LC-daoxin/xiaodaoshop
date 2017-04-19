/**
 * Created by lince on 16/8/16.
 */
myApp.filter("suolue",function(){
    return function(con){
        var arr=con.toString().substring(0,3);
        var arr1=con.toString().substring(7,11);
        return arr+"****"+arr1;
    }
});
myGoods.filter("hide",function(){
    return function(text){
        var arr=text.substr(0,1);
        var arr1=text.substr(-1,1);
        return arr+"***"+arr1;
    }
});
myGoods.filter("dataform",function(){
    return function(text){
        /*var day=text.substr(0,4);
        var day1=text.substr(4,2);
        var day2=text.substr(6,2);*/
        var day=text.substring(0,4);
        var day1=text.substring(4,6);
        var day2=text.substring(6,8);
        return day+"-"+day1+"-"+day2;
    }
});