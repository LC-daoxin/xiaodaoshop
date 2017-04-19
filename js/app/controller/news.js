/**
 * Created by lince on 16/9/3.
 */
myApp.controller("newsCtrl", ["$scope", function ($scope) {
    $("#nav").css({"display":"none"});
    $("#footer").css({"display":"none"});
    $(".tag-box").css("display","block");
    shownewspage();
    function shownewspage(){
        $.ajax({
            type: "get",
            async:false,
            url: "http://api.jisuapi.com/news/channel?appkey=7650a841abacc32d",
            dataType: "jsonp",
            jsonp: "callback",
            jsonpcallback: "getBack",
            success: function (data) {
                channel(data.result);
                var newsswiper = new Swiper('.swiper-container-new', {
                    slidesPerView: 8,
                    spaceBetween: 10,
                    breakpoints: {
                        640: {
                            slidesPerView: 6,
                            spaceBetween: 10
                        },
                        320: {
                            slidesPerView: 5,
                            spaceBetween: 10
                        }
                    }
                });
            }
        });
    }
    function channel(data){
        $(data).each(function (index, element) {
            if(data[index]== "头条"){
                $("#newstitle").append("<div class='swiper-slide swiper-slide-news news-dborder'>"+data[index]+"</div>")
            }else{
                $("#newstitle").append("<div class='swiper-slide swiper-slide-news'>"+data[index]+"</div>")
            }
        });
    }
    newsshow("头条");
    $(document).on("click", "#newstitle .swiper-slide", function() {
        $(".newsmain").html("");
        newsshow($(this)[0].innerHTML);
        $("#newstitle .swiper-slide").removeClass("news-dborder");
        $(this)[0].className = "swiper-slide swiper-slide-news news-dborder";
    });
    function newsshow(title){
        $.ajax({
            type: "get",
            async:false,
            url: "http://api.jisuapi.com/news/get?callback=getBack",
            dataType: "jsonp",
            jsonp: "callback",
            jsonpcallback: "getBack",
            data: {
                "channel": title,
                "appkey": "7650a841abacc32d"
            },
            success: function (data) {
                newscontent(data.result.list);
            }
        });
    }
    function newscontent(data){
        $(data).each(function (index, element) {
            if(data[index].pic !== ""){
                $(".newsmain").append("<a href='"+data[index].url+"'><div class='news-container'><div class='pic-text-item'><img src='"+data[index].pic+"'/></div><div class='newsinfo'><h4 class='newsitem-title'>"+data[index].title+"</h4><span class='desc'>"+data[index].src+"</span><span class='action-wrapper'>"+data[index].time+"</span></div></div></a>")
            }else{
                $(".newsmain").append("<a href='"+data[index].url+"'><div class='news-container'><div class='pic-text-item'><img src='img/noimg.jpg'/></div><div class='newsinfo'><h4 class='newsitem-title'>"+data[index].title+"</h4><span class='desc'>"+data[index].src+"</span><span class='action-wrapper'>"+data[index].time+"</span></div></div></a>")
            }
        });

    }

}]);