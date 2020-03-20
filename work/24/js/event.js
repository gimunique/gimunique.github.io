"use strict";
$(window).on({
    load: function(){       
        (function(){
            // start animation
            $(".wrap").addClass("load");
            var char1Tl = new TimelineMax(); 
            char1Tl.fromTo($(".wrap .char1"), 1.4, {x:-850, y:-650}, {x:-50, y:-300, opacity:1, delay:0.3, ease:Elastic.easeOut.config(1, 1)})
            .to($(".wrap .char1"), 0.35, {x:0, y:0, ease:Elastic.easeOut.config(1, 0.25)}, "-=1.15")
            .to($(".wrap .char1 .text"), 0.09, {x:3.5, y:-3.5, repeat:3, yoyo:true, ease:Sine.easeInOut, onComplete:function(){
                var charTextTl = new TimelineMax({delay:2.5, repeat:-1, repeatDelay:2.25});
                charTextTl .to($(".wrap .char1 .text"), 0.09, {x:3.5, y:-3.5, repeat:3, yoyo:true, ease:Sine.easeInOut});
            }}, "-=0.5");
            TweenMax.fromTo($(".wrap .char2"), 0.15, {x:70}, {x:0, opacity:1, delay:0.5, ease:Sine.easeInOut, onComplete:function(){
                var charTextTl = new TimelineMax({delay:1.2, repeat:-1, repeatDelay:2.6});
                charTextTl .to($(".wrap .char2 .text"), 0.09, {x:3.5, y:-3.5, repeat:3, yoyo:true, ease:Sine.easeInOut});
            }});
            TweenMax.fromTo($(".wrap .char3"), 0.15, {x:-50}, {x:0, opacity:1, delay:0.5, ease:Sine.easeInOut, onComplete:function(){
                var charTextTl = new TimelineMax({delay:0.9, repeat:-1, repeatDelay:2.45});
                charTextTl .to($(".wrap .char3 .text"), 0.09, {x:-3.5, y:-5.5, repeat:3, yoyo:true, ease:Sine.easeInOut});
            }});
            TweenMax.fromTo($(".title_wrap p.text"), 0.35, {y:50}, {y:0, opacity:1, delay:0.5, ease:Elastic.easeOut.config(1, 0.65)});
            TweenMax.fromTo($(".title_wrap .date"), 0.35, {y:-80}, {y:0, opacity:1, delay:0.5, ease:Elastic.easeOut.config(1, 0.65)});
            TweenMax.fromTo($(".title_wrap h2 .t13"), 0.35, {scale:1.5}, {scale:1, opacity:1, delay:0.5, ease:Elastic.easeOut.config(1, 0.65)});          
            TweenMax.fromTo($(".p1"), 2.75, {x:250, opacity:0}, {x:0, opacity:1, delay:0.65, ease:Expo.easeOut});
            TweenMax.fromTo($(".p2"), 2.75, {x:-300, opacity:0}, {x:0, opacity:1, delay:0.65, ease:Expo.easeOut});
            TweenMax.fromTo($(".p3"), 2.75, {x:-300, opacity:0}, {x:0, opacity:1, delay:0.65, ease:Expo.easeOut});
            TweenMax.fromTo($(".p4"), 2.75, {x:-150, opacity:0}, {x:0, opacity:1, delay:0.65, ease:Expo.easeOut});
            TweenMax.fromTo($(".quick"), 0.4, {x:86}, {x:0, opacity:1, delay:1.5, ease:Expo.easeOut});
        }());
        
        // 보상 아이템 상세 정보 버튼
        $(".btn_item a").on("mousedown", function(){
            $(this).css({"top":"6px"});
        }).on("mouseup", function(){
            $(this).css({"top":"0px"});
        });

        // TOP 버튼
        $(".btn_top button").on("click", function(){
            $("html, body").stop().animate({scrollTop:0}, 350);
        });       
    },
    scroll: function(){
        var winScrollTop = $(window).scrollTop();
        var bingoWrapOffsetTop = $(".bingo_wrap").offset().top;
        if(winScrollTop > 0 && bingoWrapOffsetTop > winScrollTop){
            var moveX1 = winScrollTop/5;
            var moveX2 = winScrollTop/3.5;             
            TweenMax.to($(".p1"), 2.75, {x:-moveX1, ease:Expo.easeOut});
            TweenMax.to($(".p2"), 2.75, {x:moveX2, ease:Expo.easeOut});
            TweenMax.to($(".p3"), 2.75, {x:-moveX2, ease:Expo.easeOut});
            TweenMax.to($(".p4"), 2.75, {x:moveX1, ease:Expo.easeOut});
        }
    }
});