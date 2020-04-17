var ul=$(".carousel_box>ul"),
    point_box=$(".point_box ul"),
    left_arrow=$(".left_arrow"),
    right_arrow=$(".right_arrow"),
    carousel_box=$(".carousel_box");

$.ajax({
    url:"http://jianshe.bluej.cn/api/index/get_carousel?postion_id=3",
    success: function(data){
        banner(data);
    }
})

function banner(number){
    number.data.forEach(function(val){
        ul.append(`<li><a href=""><img src="http://jianshe.bluej.cn${val.ch_img_url}" alt=""></a></li>`);
        point_box.append("<li></li>");
    })
    var  point_list=$(".point_box li");
    point_list.eq(0).addClass("active");
    var now_index=last_index=0;
    var timer,is_run=false;
    right_arrow.on("click",function(){
        if(!is_run){
            is_run=true;
            if(++now_index==point_list.length){
                right_end_run();
            }else{
                run();
            }
        } 
    })
    left_arrow.on("click",function(){
        if(!is_run){
            is_run=true;
            if(--now_index==-1){
                left_end_run();
            }else{
                run();
            }
        } 
    })
    function run(){
        ul.css("transform","translateX(-"+now_index+"00%)");
        // point_list.eq(last_index).removeClass("active");
        // point_list.eq(now_index).addClass("active");
        point_list.eq(now_index).addClass("active").siblings().removeClass("active");
        last_index=now_index;
        ul.on("transitionend",function(){
            is_run=false;
        })
    }
    var first_clone=ul.children(":first").clone();
    function right_end_run(){
        ul.append(first_clone);
        ul.css("transform","translateX(-"+now_index+"00%)");
        ul.on("transitionend",right_end);
    }
    function right_end(){
        now_index=0;
        ul.css("transition","none");
        ul.css("transform","translateX(-"+now_index+"00%)");
        first_clone.remove()
        getComputedStyle((ul)[0]).transition;
        ul.css("transition","");
        point_list.eq(last_index).removeClass("active");
        point_list.eq(now_index).addClass("active");
        last_index=now_index;
        is_run=false;
        ul.unbind("transitionend",right_end);
    }
    var last_clone=ul.children(":last").clone();
    function left_end_run(){
            ul.prepend(last_clone);
            ul.css("transition","none");
            ul.css("transform","translateX(-100%)");
            getComputedStyle((ul)[0]).transition;
            ul.css("transition","");
            ul.css("transform","translateX(0)");
            ul.on("transitionend",left_end);
    }
    function left_end(){
        now_index=point_list.length-1;
        ul.css("transition","none");
        ul.css("transform","translateX(-"+now_index+"00%)");
        last_clone.remove();
        getComputedStyle((ul)[0]).transition;
        ul.css("transition","");
        point_list.eq(last_index).removeClass("active");
        point_list.eq(now_index).addClass("active");
        last_index=now_index;
        is_run=false;
        ul.unbind("transitionend",left_end);
    }
    point_list.each(function(index,val){
        $(val).on("click",function(){
            ul.css("transform","translateX(-"+index+"00%)");
            // if(!$(val).hasClass("active")){
            //     $(val).addClass("active");
            //     point_list.eq(last_index).removeClass("active");
            // }
            $(val).addClass("active").siblings().removeClass("active");
            last_index=index;
        })
    })
    function autoPlay(){
        timer=setInterval(function(){
            if(!is_run){
                is_run=true;
                if(++now_index==point_list.length){
                    right_end_run();
                }else{
                    run();
                }
            }
        },2000)
    }
    autoPlay();
    carousel_box.on("mouseenter",function(){
        clearInterval(timer);
    })
    carousel_box.on("mouseleave",function(){
        autoPlay();
    })
    // carousel_box.hover(function(){clearInterval(timer);},autoPlay())
}