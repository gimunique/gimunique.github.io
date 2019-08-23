$(window).bind("load", function(){
	$(".container .main_menu").stop().animate({top:157,opacity:1}, 500, "jswing");
	wave();
});

$(document).ready(function(){
	wheel();

	cntPosi();
	$(window).resize(function(){		
		cntPosi();	
	});

	//망자의탑 B3F 페이지
	window.getParameter=function(param){
		if(param) var r=location.search.match(new RegExp("[&?]"+param+"=(.*?)(&|$)"));
		return r&&r[1]?r[1]:null;
	}
	if(getParameter("page") == 5){
		$(".container_wrap").css({"top":-winHeight});
		$(".wrap.main").removeClass("on");
		$(".wrap.sub").show().addClass("on");
		$(".wrap.sub .event_wrap").css({"top":65});
		$(".wrap .sub_menu li").removeClass("on");
		$(".wrap .sub_menu li").eq(4).addClass("on");
		$(".wrap .event").hide();
		$(".wrap .event").eq(4).show();
		$(".sub_menu .handle").animate({deg:180},{
			duration: 0,
			step: function(now){
				$(".sub_menu .handle").css({
					transform: "rotate(" + now + "deg)"
				});
			}
		});
	}

	//주요메뉴
	$(".container .menu").each(function(mIdx){
		$(".container .menu").eq(mIdx).find("li").each(function(i){
			$(this).find(">a").click(function(e){
				e.preventDefault();
				$("html, body").stop().animate({scrollTop:0},300);
				$(".pop, .pop li").hide();
				$(".wrap .sub_menu li").removeClass("on");
				$(".wrap .sub_menu li").eq(i).addClass("on");
				$(".wrap .event:not(:eq("+i+"))").hide();
				$(".wrap .event").eq(i).show();
				$(".wrap .event .page_1").siblings(".page").hide();
				$(".wrap .event:eq("+i+") .page_1").show();
				$(".wrap .event .page_top ul li").removeClass("on");
				$(".wrap .event:eq("+i+") .page_top ul li:first").addClass("on");
				if($(this).parents(".menu").hasClass("main_menu")){
					wheelDown();
				}
				//핸들Rotate
				$(".sub_menu .handle").animate({deg:45*i},{
					duration: 200,
					step: function(now){
						$(".sub_menu .handle").css({
							transform: "rotate(" + now + "deg)"
						});
					}
				});
				//페이지메뉴-애니
				if($(this).parents(".menu").parents("div").hasClass("sub_menu")){
					$(".page_wrap .page_menu .bg").css({"width":0,"opacity":0}).stop().animate({width:351,opacity:1},250,"jswing");					
				}
			});
		});
	});

	//서브-개별메뉴
	$(".page_menu").each(function(pIdx){
		$(".page_menu").eq(pIdx).find("li").each(function(i){
			$(this).find(">a").click(function(e){
				e.preventDefault();
				$("html, body").stop().animate({scrollTop:0},300);
				$(".pop, .pop li").hide();
				$(this).parents("li").siblings("li").removeClass("on");
				$(this).parents("li").addClass("on");
				$(this).parents(".page_top").siblings(".page:not(:eq("+i+"))").hide();
				$(this).parents(".page_top").siblings(".page").eq(i).show();
			})
		});
	});

	//이미지-마우스오버
	$(".page .p_img .over").hide();
	$(".page .p_img li a").hover(function(){
		$(this).children(".over").show();
	}, function(){
		$(".page .p_img .over").hide();
	});

	//이미지팝업
	$(".pop .btn_close, .bg_hide").click(function(e){
		e.preventDefault();
		$(".pop, .pop li, .bg_hide").hide();
		$(".event").css("z-index",0);
		$(".pop li").removeClass("on");
	});

	var pop1 = new popIdx(".event_1 .page_3");
	var pop2 = new popIdx(".event_1 .page_4");
	var pop3 = new popIdx(".event_2 .page_1");
	var pop4 = new popIdx(".event_5 .page_2");

	//업데이트3-캐릭터썸네일
	$(".thumb_btn li").each(function(i){
		$(this).find(">a").click(function(e){
			e.preventDefault();
			$(".thumb_btn li").removeClass("on");
			$(this).parent("li").addClass("on");
			$(".thumb_info li").fadeOut(100);
			$(".thumb_info li").eq(i).fadeIn(100);
		});
	});

	//맨위로
	$(".sub_menu .btn_top").click(function(e){
		e.preventDefault();
		wheelUp();
	});
});

var sct = $(window).scrollTop();
var winWidth = $(window).width();
var winHeight = $(window).height();
var scrollChk = true;	
var upCount = 0;	
var ease = "easeInOutExpo";
var speed = 800;

//파도애니메이션
function wave(){
	$(".wrap .wave").stop().animate({opacity:0.3},1400,function(){
		$(this).stop().animate({opacity:1},1400,function(){
			wave();
		});
	});
};

//윈도우 리사이즈 - 컨텐츠이동
function cntPosi(){
	winWidth = $(window).width();
	winHeight = $(window).height();
	if($(".sub").hasClass("on")){
		$(".container_wrap").css("top",-winHeight);
	}
	$(".main").css("height",winHeight);
	$(".page .p_img li").removeClass("last");
	if(winWidth < 1700){
		$(".main_title, .main_menu, .sub_menu, .sub_title, .page_wrap, .page_wrap .page").addClass("w_1280");
		$(".event_1 .page_3 li:nth-child(2n), .event_1 .page_4 li:nth-child(3n), .event_2 .page_1 li:nth-child(2n), .event_5 .page_2 li:nth-child(2n)").addClass("last");
		$(".sub .link").hide();
	}else{
		$(".main_title, .main_menu, .sub_menu, .sub_title, .page_wrap, .page_wrap .page").removeClass("w_1280");
		$(".page_3 li:nth-child(3n), .page_4 li:nth-child(5n), .event_2 .page_1 li:nth-child(3n), .event_5 .page_2 li:nth-child(3n)").addClass("last");
		$(".sub .link").show();
	}
}

//이미지 모달 팝업
function popIdx(popNum){
	var target = $(popNum).find(".pop ul");
	var targetChild = target.children("li");
	var targetNav = $(popNum).find(".btn");
	var popLength = target.children("li").length;
	targetNav.click(function(e){
		e.preventDefault();		
		var idx = target.find(".on").index();
		var bannerIdx = 0;
		if($(this).hasClass("next")){
			var nextIdx = idx + 1;
			if(nextIdx == popLength){
				nextIdx = 0;
			}
			targetChild.not(targetChild.eq(nextIdx)).removeClass("on").hide();
			targetChild.eq(nextIdx).addClass("on").show();	
			$(".pop .nav .title").text($(this).parents(".pop").siblings(".p_img").children("li").eq(nextIdx).find("p").text());		
			accPop()	;
		}else if($(this).hasClass("prev")){
			var prevIdx = idx - 1;
			if(prevIdx == -1){
				prevIdx = popLength - 1;
			}
			targetChild.not(targetChild.eq(prevIdx)).removeClass("on").hide();
			targetChild.eq(prevIdx).addClass("on").show();
			$(".pop .nav .title").text($(this).parents(".pop").siblings(".p_img").children("li").eq(prevIdx).find("p").text());		
			accPop();
		}else{			
			return false;
		}
	});
	$(".container .event .p_img li").each(function(i){
		$(this).find(">a").click(function(e){
			e.preventDefault();
			$(this).parents(".p_img").prev(".bg_hide").show();
			$(this).parents(".p_img").siblings(".pop").show();
			$(".pop li").eq(i).show().addClass("on");
			$(".pop .nav .title").text($(this).find("p").text());
			$(".event").css("z-index",20);
			accPop();
		});
	});
}

//상위악세서리
function accPop(){
	if($(".event_2 .page_1 .pop .p5").hasClass("on")){
		$(".event_2 .pop").css({"height":"819px","margin-top":"-440px"});
	}else{
		$(".event_2 .pop").css({"height":"588px","margin-top":"-325px"});
	}
}

//휠이벤트
function wheel(){
	var delta = 0;	
	$(".container_wrap").on("mousewheel DOMMouseScroll",function(event){
		if(event.originalEvent.wheelDelta){
			delta = parseInt(event.originalEvent.wheelDelta)/Math.abs(parseInt(event.originalEvent.wheelDelta));
		} else if(event.originalEvent.detail){
			delta = -parseInt(event.originalEvent.detail)/Math.abs(parseInt(event.originalEvent.detail));
		} else if(event.originalEvent.deltaY){
			delta = -parseInt(event.originalEvent.deltaY)/Math.abs(parseInt(event.originalEvent.deltaY));
		}
		if(scrollChk){
			if(delta == -1 && sct == 0  && $(".main").hasClass("on")){
				event.preventDefault ? event.preventDefault() : event.returnValue = false;
				wheelDown();
			}else if(delta == 1 && $(".sub").hasClass("on") && sct == 0){
				//event.preventDefault ? event.preventDefault() : event.returnValue = false;
				upCount++;
				if(upCount === 10){
					wheelUp();
				}
			}
		}else{
			event.preventDefault ? event.preventDefault() : event.returnValue = false;
		}
	});
}

function wheelDown(){
	scrollChk = false;
	$(".container_wrap").stop().animate({top:-winHeight}, speed, ease, function(){
		scrollChk = true;
		$(".wrap.main").removeClass("on");
		
	});
	$(".wrap.sub").fadeIn().addClass("on");
	$(".wrap.sub .event_wrap").css({"top":winHeight,"opacity":0}).animate({top:65,"opacity":1},speed,"jswing");
	return false;	
}

function wheelUp(){
	scrollChk = false;
	$(".container_wrap").stop().animate({top:0}, speed, ease, function(){
		scrollChk = true;	
		$(".wrap.sub").hide().removeClass("on");
		$(".wrap.main").addClass("on");
		$(".pop, .pop li, .bg_hide").hide();
	});
	upCount = 0;
	return false;
}