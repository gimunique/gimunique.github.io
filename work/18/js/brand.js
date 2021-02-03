$(function () {
	$(".main").css("height", winHeight + "px");

	$(window).resize(function () {
		resize();
	});

	wheel();

	// scroll event
	$(window).bind("scroll", function () {
		sct = $(window).scrollTop();
		if (sct >= sectionOffsetTop[1]) {
			$(".wrap .link").css({
				position: "absolute",
				top: $(".main").height() + 26 + "px"
			});
			$(".btn_top").fadeIn("fast");
		} else {
			$(".wrap .link").css({
				position: "fixed",
				top: 26 + "px"
			});
			$(".btn_top").fadeOut("fast");
		}
	});
});

// window load 되기 전
$(window).bind('beforeunload', function () {
	$(window).scrollTop(0);
});

// window load 된 후
$(window).bind("load", function () {
	resize();

	// sound bar move
	$(".sbar .bar").each(function (i) {
		soundBarMove($(this));
	});

	// sound bar action
	$(".sound > a").click(function (e) {
		e.preventDefault();
		if ($(this).parents(".sound").hasClass("on")) {
			$(this).parents(".sound").removeClass("on").addClass("off");
			$(".audio").trigger("pause");
		} else {
			$(this).parents(".sound").removeClass("off").addClass("on");
			$(".audio").trigger("play");
		}
	});

	// audio play
	var audio = document.getElementById("audio");
	if (isMobile()) {
		audio.autoplay = false;
		audio.load();
		$(".sound").addClass("off");
	} else {
		audio.autoplay = true;
		audio.load();
		$(".sound").addClass("on");
	}

	// pop action
	$(".main button").click(function (e) {
		e.preventDefault();
		$(".movie_wrap").html('<iframe id="player" width="100%" height="100%" src="https://www.youtube.com/embed/Xj9_xAErX9A?enablejsapi=1&amp;playerapiid=ytplayer&amp;rel=0&amp;showinfo=0&amp;vq=hd1080&amp;wmode=opaque" frameborder="0" allowfullscreen=""></iframe>')
		$(".movie_pop").fadeIn("fast").addClass("show");
		popSize();
		$(".audio").trigger("pause");
	});
	$(".page .list li a").click(function (e) {
		e.preventDefault();
		listIdx = $(this).parents("li").index() + 1,
			listLength = $(this).parents(".list").children("li").length;
		// 화살표로 클릭 시 swiper.activeIndex와 싱크
		if (swiper != null) {
			swiper.activeIndex = listIdx - 1;
		}
		popShow();
		$(".list_pop .pimg div").each(function (i) {
			var imgSrc = "./images/", //절대 경로 url로 바꾸기
				imgName = "pop" + (i + 1)
			$(".list_pop .pimg div").eq(i).append("<img src='" + imgSrc + imgName + ".jpg' alt=''>");
		});
	});
	$(".list_pop .move").click(function (e) {
		e.preventDefault();
		if (isMobile()) {
			if ($(this).hasClass("prev")) {
				listIdx = listIdx == 1 ? 1 : listIdx - 1;
			} else {
				listIdx = listIdx == listLength ? listLength : listIdx + 1;
			}
			// 화살표로 클릭 시 swiper.activeIndex와 싱크
			if (swiper != null) {
				swiper.activeIndex = listIdx - 1;
			}
		} else {
			if ($(this).hasClass("prev")) {
				listIdx = listIdx == 1 ? listLength : listIdx - 1;
			} else {
				listIdx = listIdx == listLength ? 1 : listIdx + 1;
			}
		}
		popShow();
	});
	$(".pop .close, .pop .bg_pop").click(function (e) {
		e.preventDefault();
		$(".pop").fadeOut("fast").removeClass("show");
		if ($(this).parents(".pop").hasClass("movie_pop")) {
			if ($(".sound").hasClass("on")) {
				$(".audio").trigger("play");
			}
		}
		$(".movie_wrap").html('');
		$(".list_pop .img_wrap").removeClass("rare hero");
		$(".list_pop .pimg div").empty();
	});

	// top button
	$(".btn_top").click(function (e) {
		e.preventDefault();
		$("html,body").stop().animate({
			scrollTop: 0
		}, speed, easing);
	});
});

var winWidth = $(window).width();
var winHeight = $(window).height();
var sct = $(window).scrollTop();
var sectionOffsetTop = [];
var listIdx;
var listLength;
// 계속 신규 생성되는 swiper 처리를 막기위해 전역변수로 설정
var swiper;

// resize시 변경되는 값
function resize() {
	winHeight = $(window).height(),
		swiper;
	popSize();
	$(".main").css("height", winHeight + "px");
	$(".main .content .align").css("margin-top", -($(".main .content .align").height() / 2));
	$(".list li").css("height", $(".list li img").height() + $(".list li .name").height());
	$(".wrap .section").each(function (i) {
		sectionOffsetTop[i] = $(this).offset().top;
	});
	if (sct > sectionOffsetTop[1] && $(".page").hasClass("on")) {
		$(".wrap").css("top", -$(".main").height());
	}
	if (swiper != null) {
		swiper.activeIndex = listIdx - 1;
	}
}

function popShow() {
	/* var imgSrc = "https://static.estgames.co.kr/novawars/brand/images/", //절대 경로 url로 바꾸기
		imgName = "pop"+listIdx
	$(".list_pop .img_wrap").empty().append("<img src='"+imgSrc+imgName+".jpg' alt=''>"); */
	$(".list_pop .pimg div:eq(" + (listIdx - 1) + ")").addClass("on").siblings("div").removeClass("on");
	$(".list_pop").fadeIn("fast").addClass("show");
	if (listIdx > 20 && listIdx < 38) {
		$(".list_pop .img_wrap").removeClass("hero").addClass("rare");
	} else if (listIdx > 37) {
		$(".list_pop .img_wrap").removeClass("rare").addClass("hero");
	} else {
		$(".list_pop .img_wrap").removeClass("rare hero");
	}
	popSize();

	// 모바일 터치
	if (isMobile()) {
		// swiper 신규생성을 막기위해 null이 아닐 경우만 swiper 생성
		if (swiper == null) {
			swiper = new Swiper('.swiper-container', {});
		}
		$(".swiper-wrapper").css({
			"transform": "translate3d(" + -($(".swiper-slide").width() * (listIdx - 1)) + "px," + 0 + "," + 0 + ")"
		});
		$(".list_pop .pimg > div").removeClass("swiper-slide-prev swiper-slide-active swiper-slide-next");
		$(".list_pop .pimg > div").eq(listIdx - 2).addClass("swiper-slide-prev");
		$(".list_pop .pimg > div").eq(listIdx - 1).addClass("swiper-slide-active");
		$(".list_pop .pimg > div").eq(listIdx).addClass("swiper-slide-next");
		swiper.updateClasses = function () {
			listIdx = (swiper.activeIndex + 1);
			swiper.slides.removeClass(swiper.params.slideActiveClass + ' ' + swiper.params.slideNextClass + ' ' + swiper.params.slidePrevClass);
			var activeSlide = swiper.slides.eq(swiper.activeIndex);
			// Active classes
			activeSlide.addClass(swiper.params.slideActiveClass);
			// Next Slide
			var nextSlide = activeSlide.next('.' + swiper.params.slideClass).addClass(swiper.params.slideNextClass);
			if (swiper.params.loop && nextSlide.length === 0) {
				swiper.slides.eq(0).addClass(swiper.params.slideNextClass);
			}
			// Prev Slide
			var prevSlide = activeSlide.prev('.' + swiper.params.slideClass).addClass(swiper.params.slidePrevClass);
			if (swiper.params.loop && prevSlide.length === 0) {
				swiper.slides.eq(-1).addClass(swiper.params.slidePrevClass);
			}
			if (swiper.activeIndex > 19 && swiper.activeIndex < 37) {
				$(".list_pop .img_wrap").removeClass("hero").addClass("rare");
			} else if (swiper.activeIndex > 36) {
				$(".list_pop .img_wrap").removeClass("rare").addClass("hero");
			} else {
				$(".list_pop .img_wrap").removeClass("rare hero");
			}
		}
	}
}

// 팝업 크기
function popSize() {
	var popWidth = $(".show .pop_wrap").width();
	var popHeight = $(".show .pop_wrap").width() * 0.75;
	var imgHeight = $(".show .pop_wrap").width() * 0.656;
	$(".show > .pop_wrap").css({
		"margin-top": -(popHeight / 2) + "px",
		"margin-left": -(popWidth / 2) + "px"
	});
	$(".list_pop .img_wrap,.movie_pop .movie_wrap").css("height", imgHeight + "px");
	$(".list_pop .move").css({"height": imgHeight + "px"});
}

// 사운드 바 애니메이션
function soundBarMove(bar) {
	var height = Math.floor(Math.random() * 27) + 1;
	bar.animate({height: height}, 150, function () {
		soundBarMove($(this));
	});
}

// 모바일 분기
function isMobile() {
	var UserAgent = navigator.userAgent;
	if (UserAgent.match(/iPhone|iPod|iPad|Android|Windows CE|BlackBerry|Symbian|Windows Phone|webOS|Opera Mini|Opera Mobi|POLARIS|IEMobile|lgtelecom|nokia|SonyEricsson/i) != null || UserAgent.match(/LG|SAMSUNG|Samsung/) != null) {
		return true;
	} else {
		return false;
	}
}

// youtube
var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

function onYouTubeIframeAPIReady() {
	player = new YT.Player('player');
}

// 휠 이벤트
function wheel() {
	var scrollChk = true;
	var easing = "easeInOutExpo";
	var delta = 0;
	var speed = 800;
	$(".wrap").on("mousewheel DOMMouseScroll", function (event) {
		if (event.originalEvent.wheelDelta) {
			delta = parseInt(event.originalEvent.wheelDelta) / Math.abs(parseInt(event.originalEvent.wheelDelta));
		} else if (event.originalEvent.detail) {
			delta = -parseInt(event.originalEvent.detail) / Math.abs(parseInt(event.originalEvent.detail));
		} else if (event.originalEvent.deltaY) {
			delta = -parseInt(event.originalEvent.deltaY) / Math.abs(parseInt(event.originalEvent.deltaY));
		}
		if (scrollChk) {
			if (delta == -1 && sct == 0 && $(".main").hasClass("on")) {
				event.preventDefault ? event.preventDefault() : event.returnValue = false;
				scrollChk = false;
				$(".wrap").stop().animate({top: -$(".main").height()}, speed, easing, function () {
					scrollChk = true;
					$(".main").removeClass("on");
					$(".page").addClass("on");
				});
				return false;
			} else if (delta == 1 && sct == 0 && $(".page").hasClass("on")) {
				event.preventDefault ? event.preventDefault() : event.returnValue = false;
				scrollChk = false;
				$(".wrap").stop().animate({top: 0}, speed, easing, function () {
					scrollChk = true;
					$(".page").removeClass("on");
					$(".main").addClass("on");
				});
				return false;
			}
		} else {
			event.preventDefault ? event.preventDefault() : event.returnValue = false;
		}
	});
}