$(function(){
    //응모권 장수, 회전수 변수
    var coupon;
    var rotate;

    //룰렛 돌리기 클릭
    $(".roulette .btn_rotate").click(function(e){
        e.preventDefault();
        //응모권 수령 대상자일 경우, ajax success 후 들어가야 하는 내용
        
        // 응모권 장수를 아래 coupon 변수에 넣어주세요 (1,3,5,10 중)
        coupon = 5;
        //응모권 장수에 따라 회전 돌리기
        if(coupon == 1){
            rotate = 90;
        } else if(coupon == 10){
            rotate = 180;
        } else if(coupon == 5){
            rotate = 270;
        } else{
            rotate = 360;
        }
        //룰렛 돌리기 + 당첨 됐다고 말해주기 + 버튼 비활성화
        $("#roulette").rotate({
            animateTo:360*5 + rotate,
            duration:3000,
            easing:$.easing.easeInOutElastic,
            callback:function(){
                alert("응모권 "+coupon+"장에 당첨되었습니다.");   
                $(".roulette .btn_rotate").addClass("disabled");
            }
        });
    });

    //맨 위로 버튼 위치
    topPosition();
    $(window).resize(function(){
        topPosition();
    });

    //스크롤 모션
    var scrollChk = true;
    var clouds = [-168, 454, -68];
    $(window).scroll(function(){
        var sct = $(window).scrollTop();
        if(sct>=0 && sct<600){
            $(".cloud").each(function(i){
                if(i==0){
                    $(".cloud_1").stop().animate({left:clouds[i]-sct*0.1});
                } else{
                    $(this).stop().animate({right:clouds[i]-sct*i/10});
                }
            });
            scrollChk = true;
            $(".quick .quick_wrap").stop().animate({height:0},300,function(){
                 $(".quick").fadeOut(75);
            });
        }else{
            if(scrollChk){
                $(".quick").show();
                $(".quick .quick_wrap").stop().css("height",0).animate({height:247},500);
                scrollChk = false;
            }
        }
    });

    //맨위로 버튼 클릭
    $(".quick .go_top a").click(function(e){
		e.preventDefault();
		$("html, body").stop().animate({scrollTop:0})
    });
    
    //레이어팝업 보여주기, 닫기
    $(".event_wrap .btn_list").click(function(e){
        e.preventDefault();
        $(".layer_pop, .bg_pop").fadeIn(350);
    });
    $(".layer_pop .btn_close, .bg_pop").click(function(e){
        e.preventDefault();
        $(".layer_pop, .bg_pop").fadeOut(350);
    });

	//radio 버튼
	$(".item_list input[type=radio]").change(function(){
		var checked = $(this).prop("checked"),
		 	radioName = $(this).attr("name")
		if(checked){
			$(this).parent("li").addClass("checked");
			$("input[name =" +radioName+ "]").not(":checked").parent("li").removeClass("checked");
		}
	});
});

function topPosition(){
    var winWidth = $(window).width();
    if(winWidth<=1300){
        $(".quick").removeClass("q_1400").addClass("q_1280");
    } else if(winWidth<=1400){
        $(".quick").removeClass("q_1280").addClass("q_1400");
    } else{
        $(".quick").removeClass("q_1280 q_1400");
    }
}