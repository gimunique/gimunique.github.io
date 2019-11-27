$(document).ready(function(){
	$(".section1").addClass("on");
	
	$(".wrap .section").each(function(i){
		sectionTop[i] = $(this).offset().top-154;
	});
	
	$(window).load(function(){
		idx = $(".section.on").index();
		$(".quick .move").removeClass("q0 q1 q2 q3").addClass("q"+(idx-1)+"");
		$(".wrap").addClass("load");
	});

	$(window).resize(function(){
		winHeight = $(window).height();
	});

	//메인 애니메이션
	$(".section1").on("mousemove",function(e){
		ease = "linear",
		speed = 100;
		$(".section1 .f1").stop().animate({"left":-(141-(e.pageX/50))},speed,ease);
		$(".section1 .f2").stop().animate({"left":632-(e.pageX/80)},speed,ease);
		$(".section1 .f3").stop().animate({"right":-(103+(e.pageX/120))},speed,ease);
		$(".section1 .f4").stop().animate({"right":-(399-(e.pageX/100))},speed,ease);
		$(".section1 .f5").stop().animate({"right":-(203-(e.pageX/80))},speed,ease);
		$(".section1 .light1").css({
			"-webkit-transform": "translate(-"+e.pageX/80+"px,-"+e.pageY/100+"px)",
			"-webkit-transition": "all 0ms linear",
			"transform": "translate(-"+e.pageX/80+"px,-"+e.pageY/100+"px)",
			"transition": "all 0ms linear"
		});
		$(".section1 .flame").css({
			"-webkit-transform": "translate("+e.pageX/150+"px,"+e.pageY/100+"px)",
			"-webkit-transition": "all 0ms linear",
			"transform": "translate("+e.pageX/150+"px,"+e.pageY/100+"px)",
			"transition": "all 0ms linear"
		});
	});
	
	//메뉴 클릭시 화면 이동
	$(".header .menu li").each(function(i){
		$(this).find(">a").click(function(e){
			e.preventDefault();
			$("html, body").stop().animate({scrollTop:sectionTop[i+1]},pageSpeed,ease);
		});
	});
	$(".quick ul li").each(function(i){
		$(this).find(">a").click(function(e){
			e.preventDefault();
			$("html, body").stop().animate({scrollTop:sectionTop[i]},pageSpeed,ease);
		});
	});

	$(window).scroll(function(){
		sct = $(window).scrollTop();
		//메뉴 on, off
		for(var i=0; i<4; i++){
			if(sct >= sectionTop[i]-parseInt(winHeight/1.5)){
				$(".section:eq("+i+")").addClass("on").siblings(".section").removeClass("on");
				setTimeout(function(){
					idx = $(".section.on").index();
					$(".quick .move").removeClass("q0 q1 q2 q3").addClass("q"+(idx-1)+"");
				},500);
			}
			if(sct >= sectionTop[i+1]-parseInt(winHeight/1.5)){
				setTimeout(function(){
					if(idx > 1){
						$(".header .menu li:eq("+(idx-2)+")").addClass("on").siblings("li").removeClass("on");
					}
				},500);
			}else if(sct < sectionTop[1]-parseInt(winHeight/1.5)){
				$(".header .menu li").removeClass("on");
			}
		}
	});
	
	//데모나이트 장비 - 하단 탭
	$(".section2 .item_list li").each(function(i){
		$(this).find(">a").click(function(e){
			e.preventDefault();
			$(".section2 .item_list li:eq("+i+")").addClass("on").siblings("li").removeClass("on");	
			$(".section2 .item:eq("+i+")").addClass("show").siblings().removeClass("show active");
			setTimeout(function(){
				$(".section2 .item.show").addClass("active");
			}, 100);
		});
	});

	//던전 - 팝업
	$(".bg_pop, .pop .close").click(function(e){
		e.preventDefault();
		$(".bg_pop, .pop").fadeOut("fast");
	});
	$(".pop .bg").hover(function(){
		$(".pop .move").fadeIn("fast");
	}, function(){
		$(".pop .move").fadeOut("fast");
	})
	$(".section3 .dungeon li a").click(function(e){
		e.preventDefault();
		dungeonIdx = $(this).parents(".dungeon").index(),
		thumbIdx = $(this).parents("li").index()+1,
		thumbLength = $(this).parents(".dungeon").children("li").length;
		$(".bg_pop").fadeIn("fast");
		popImg();
	});
	$(".pop .move").click(function(e){
		e.preventDefault();
		if($(this).hasClass("prev")){
			thumbIdx = thumbIdx == 1 ? thumbLength : thumbIdx-1 
		}else{
			thumbIdx = thumbIdx == thumbLength ? 1 : thumbIdx+1
		}
		popImg();
	});
});

var winHeight = $(window).height();
var sct = $(window).scrollTop();
var sectionTop = [];
var ease = "easeInOutQuart";
var pageSpeed = 500;
var speed;
var idx;
var dungeonIdx;
var thumbIdx;
var thumbLength;

function popImg(){
	var imgSrc = "./images/"; //절대 경로 url로 바꾸기
	var imgName = "pop"+dungeonIdx+"_"+thumbIdx;
	$(".pop").fadeIn("fast");
	$(".pop .img_wrap").empty().append("<img src='"+imgSrc+imgName+".jpg' alt=''>");
}

//하위버전 indexOf
if(!Array.prototype.indexOf){
    Array.prototype.indexOf = function(obj, start){
         for(var i = (start || 0), j = this.length; i < j; i++){
             if(this[i] === obj){ return i;}
         }
         return-1;
    }
}