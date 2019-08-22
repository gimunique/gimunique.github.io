$(window).bind('beforeunload', function(){
    $(window).scrollTop(0);
});

$(document).ready(function(){
    $(".wrap").addClass("load");
    
    setTimeout(function(){
        $(".wrap.load .bg_load").hide();
    },2500);
    
    $(".update_wrap > .section").each(function(i){
        sectionOffsetTop[i] = $(this).offset().top;
    });
    
    resize();

    $(window).resize(function(){
        resize();  
    });

    $(window).bind("scroll", function(){
        sct = $(window).scrollTop();
        winHeight = $(".main").height();
        
        //header 위치
        if(sct >= winHeight){
            $(".header").css({"position":"fixed"});
        }else{
            $(".header").css({"position":"absolute"});
        }

        //nav on, off
        for(var i=0; i<3; i++){
            if(sct >= sectionOffsetTop[i]-scrollPos){
                $(".nav li:eq("+(i+1)+")").addClass("on").siblings("li").removeClass("on");
                $(".header ul li:eq("+i+")").addClass("on").siblings("li").removeClass("on");
            }
            if(sct >= sectionOffsetTop[i]+250){
                $(".update_wrap .section:eq("+i+")").addClass("on").siblings(".section").removeClass("on");
            }
        }
        if(sct < winHeight){
            $(".nav li").eq(0).addClass("on").siblings("li").removeClass("on");
        }
        if(sct < winHeight/5){
            $(".header ul li, .update_wrap .section").removeClass("on");
        }
    
        //main title scale animation
        if(sct <= winHeight){
            $(".main .mtitle").css({
                transform:"scale("+(sct/(winHeight/3.2))+")",
                opacity : ((sct-winHeight)*-0.001)
            }); 
        }
        if(sct < winHeight/3.2){
            $(".main .mtitle").css({
                transform:"scale(1)",
                opacity : "1"
            });
        }
    });

    //업데이트 메뉴, 네이게이션 클릭(화면 이동)
    $(".header li").each(function(i){
        $(this).find(">a").click(function(e){
            e.preventDefault();
            winHeight = $(".main").height();
            $("html, body").stop().animate({scrollTop:winHeight+sectionOffsetTop[i]-scrollPos},pageSpeed,ease);
        });
    });
    $(".nav li").each(function(i){
        $(this).find(">a").click(function(e){
            e.preventDefault();
            winHeight = $(".main").height();
            if($(this).parents("li").hasClass("nav_main")){
                $("html, body").stop().animate({scrollTop:0},pageSpeed,ease);
            }else{
                $("html, body").stop().animate({scrollTop:winHeight+sectionOffsetTop[i-1]-scrollPos},pageSpeed,ease);
            }
        });
    });

    //update1 modal popup
    $(".bg_pop, .modal_pop .close").click(function(e){
        e.preventDefault();
        $(".modal_pop, .modal_pop .img_pop li").fadeOut("fast");
    });
    $(".dungeon li a").click(function(e){
        e.preventDefault();
        imgPopIdx = $(this).parents("li").index();
        imgPopLength = $(this).parents(".dungeon").children("li").length; 
        $(".modal_pop").fadeIn("fast");
        $(".modal_pop .img_pop li:eq("+imgPopIdx+")").show();
        
    });
    $(".modal_pop .move").click(function(){
        if($(this).hasClass("prev")){
           
            imgPopIdx = imgPopIdx == 0 ? imgPopLength-1 : imgPopIdx-1;
            $(".modal_pop .img_pop li:eq("+imgPopIdx+")").show().siblings("li").hide();
            
        }else{ 
            
            imgPopIdx = imgPopIdx == imgPopLength-1 ? 0 : imgPopIdx+1;
            $(".modal_pop .img_pop li:eq("+imgPopIdx+")").show().siblings("li").hide();
            
        }
    });
    
    //update2 길드 퀘스트 진행 방법
    $(".progress .order li button").click(function(e){
        e.preventDefault();
        var clickIdx = $(this).parents("li").index();
        var orderOnIdx = $(".order li.on").index();
        $(this).parents("li").addClass("on").siblings('li').removeClass("on");
        if(clickIdx > orderOnIdx){
            $(".progress_img li:eq("+orderOnIdx+")").removeClass("on").stop().animate({left:-100+"%"},progressSpeed,progressEase, function(){
                $(this).hide();
            });
            $(".progress_img li:eq("+clickIdx+")").addClass("on").show().css("left","100%").stop().animate({left:0},progressSpeed,progressEase);
        }else{
            $(".progress_img li:eq("+orderOnIdx+")").removeClass("on").stop().animate({left:100+"%"},progressSpeed,progressEase, function(){
                $(this).hide();
            });
            $(".progress_img li:eq("+clickIdx+")").addClass("on").show().css("left","-100%").stop().animate({left:0},progressSpeed,progressEase);
        }
    });
    $(".progress .move").click(function(){
        var imgOnIdx = $(".progress_img li.on").index();
        var imgLength = $(".progress_img li").length;
        if($(this).hasClass("prev")){
            if(imgOnIdx !== 0){
                $(".progress_img li.on").removeClass("on").stop().animate({left:100+"%"},progressSpeed,progressEase, function(){
                    $(this).hide();
                });
                $(".progress_img li:eq("+(imgOnIdx-1)+")").addClass("on").show().css("left","-100%").stop().animate({left:0},progressSpeed,progressEase);
                $(".progress .order li:eq("+(imgOnIdx-1)+")").addClass("on").siblings('li').removeClass("on");
            }else{
                return false;
            }
        }else{
            if(imgOnIdx !== imgLength-1){
                $(".progress_img li.on").removeClass("on").stop().animate({left:-100+"%"},progressSpeed,progressEase, function(){
                    $(this).hide();
                });
                $(".progress_img li:eq("+(imgOnIdx+1)+")").addClass("on").show().css("left","100%").stop().animate({left:0},progressSpeed,progressEase);
                $(".progress .order li:eq("+(imgOnIdx+1)+")").addClass("on").siblings('li').removeClass("on");
            }else{
                return false;
            }
        }
    });
});

var winHeight = $(window).height();
var sct = $(window).scrollTop();
var sectionOffsetTop = [];
var scrollPos = 110;
var ease = "easeInQuint";
var pageSpeed = 800;
var progressSpeed = 600;
var progressEase = "easeOutQuart"
var scrollChk = true;
var imgPopIdx;
var imgPopLength;

//resize action
function resize(){
    winHeight = $(window).height(); 
    if(winHeight < 1000){
        $(".main, #fires1").css("height",winHeight);
        $(".wrap").css("padding-top",winHeight);
    }else{
        $(".main, #fires1").css("height","1000px");
        $(".wrap").css("padding-top","1000px");
    }
    if(winHeight < 938){
        $(".main .content").css("padding-top","820px");
        $(".main .btn_scroll").css("width",5.5+"%");
    }else{
        $(".main .content").css("padding-top","850px");
        $(".main .btn_scroll").css("width",8.16+"%");
    }
}