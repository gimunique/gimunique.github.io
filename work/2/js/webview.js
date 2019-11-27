$(document).ready(function(){
	resize();
	$(window).resize(function(){
		resize();
	});
	$(".pop .close, .pop .bg_pop").click(function(e){
		e.preventDefault();		
		swiper.destroy(false,true);
		$(".show .swiper-wrapper div").empty();
		$(".pop").hide().removeClass("show");
	});
	$(".section .list li a").click(function(e){
		e.preventDefault();
		sectionIdx = $(this).parents(".section").index()+1,
		listIdx = $(this).parents("li").index(),
		listLength = $(this).parents(".list").children("li").length-1;
		$(this).parents(".content").next(".pop").fadeIn("fast").addClass("show");
		popShow();
		$(".show .swiper-wrapper div").each(function(i){
			var imgSrc = "./images/", //절대 경로 url로 바꾸기
				imgName = "pop"+sectionIdx+"_"+(i+1);
			$(".show .swiper-wrapper div").eq(i).append("<img src='"+imgSrc+imgName+".jpg' alt=''>");
		});
	}).on("touchstart",function(){
		$(this).parents("li").addClass("on");
	}).on("touchend",function(){
		$(this).parents("li").removeClass("on");
	});
	$(".pop .move").click(function(e){
		e.preventDefault();
		if($(this).hasClass("prev")){
			listIdx = listIdx == 0 ? 0 : listIdx-1;
		}else{
			listIdx = listIdx == listLength ? listLength : listIdx+1;
		}
		popShow();
	});
});
var sectionIdx;
var listIdx;
var listLength;
//계속 신규 생성되는 swiper 처리를 막기위해 전역변수로 설정
var swiper;
function resize(){
	popShow();
}
function popSize(){
	var popWidth = $(".show .pop_wrap").width(),
		popHeight = $(".show .pop_wrap").height();
	$(".show > .pop_wrap").css({
		"margin-top" : -(popHeight/2)+"px",
		"margin-left" : -(popWidth/2)+"px"
	});
}
function popShow(){
	popSize();
	//모바일 터치
	//swiper 신규생성을 막기위해 null이 아닐 경우만 swiper 생성
	if($(".pop").hasClass("show")){
		//swiper 초기화
		if(swiper != null){swiper.destroy();}
		swiper = new Swiper('.show .swiper-container');
		$(".show .swiper-wrapper").css({
			"transform" : "translate3d("+-($(".show .swiper-slide").width()*listIdx)+"px,"+0+","+0+")"	
		});
		$(".show .swiper-wrapper > div").removeClass("swiper-slide-prev swiper-slide-active swiper-slide-next");
		$(".show .swiper-wrapper > div").eq(listIdx-1).addClass("swiper-slide-prev");
		$(".show .swiper-wrapper > div").eq(listIdx).addClass("swiper-slide-active");
		$(".show .swiper-wrapper > div").eq(listIdx+1).addClass("swiper-slide-next");
		popStyle(this);
		swiper.updateClasses = function(){
			listIdx = swiper.activeIndex;
			swiper.slides.removeClass(swiper.params.slideActiveClass + ' ' + swiper.params.slideNextClass + ' ' + swiper.params.slidePrevClass);
			var activeSlide = swiper.slides.eq(swiper.activeIndex);
			//Active classes
			activeSlide.addClass(swiper.params.slideActiveClass);
			//Next Slide
			var nextSlide = activeSlide.next('.' + swiper.params.slideClass).addClass(swiper.params.slideNextClass);
			if(swiper.params.loop && nextSlide.length === 0){
				swiper.slides.eq(0).addClass(swiper.params.slideNextClass);
			}
			//Prev Slide
			var prevSlide = activeSlide.prev('.' + swiper.params.slideClass).addClass(swiper.params.slidePrevClass);
			if(swiper.params.loop && prevSlide.length === 0){
				swiper.slides.eq(-1).addClass(swiper.params.slidePrevClass);
			}
			popStyle(this);
		}
	}
}
function popStyle(obj){
	//move
	if(listIdx == 0){
		$(".show .prev").addClass("off");
	}else if(listIdx == listLength){
		$(".show .next").addClass("off");
	}else{
		$(".show .move").removeClass("off");
	}
	//border
	if($(".show .swiper-slide-active").hasClass("rare")){
		$(".show .swiper-container").css("border-color","#3260ee");
	}else if($(".show .swiper-slide-active").hasClass("hero")){
		$(".show .swiper-container").css("border-color","#8943dd");
	}else{
		$(".show .swiper-container").css("border-color","#394052");
	}
}