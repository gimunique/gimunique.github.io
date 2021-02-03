$(window).bind("load", function () {
	resize();
	$(window).resize(function () {
		resize();
	});

	// lighting ani
	bgAni();
	setInterval(function () {
		bgAni();
	}, 5000);
});

$(document).ready(function () {
	pageLoad();

	$(".wrap .section").each(function (i) {
		sectionTop[i] = $(this).offset().top;
	});

	$(".section .block").each(function (i) {
		blockTop[i] = $(this).offset().top;
	});

	// 메뉴, 퀵메뉴 클릭 시 화면 이동
	$(".header .menu li").each(function (i) {
		$(this).find(">a").click(function (e) {
			e.preventDefault();
			$("html, body").stop().animate({
				scrollTop: sectionTop[i + 1]
			}, pageSpeed, ease);
			location.hash = hashName[i]
		});
	});
	$(".qmenu li").each(function (i) {
		$(this).find(">a").click(function (e) {
			e.preventDefault();
			if ($(this).parents("li").hasClass("top")) {
				$("html, body").stop().animate({scrollTop: 0}, pageSpeed, ease);
			} else {
				$("html, body").stop().animate({scrollTop: sectionTop[i]}, pageSpeed, ease);
				location.hash = hashName[i - 1];
			}
		});
	});

	$(window).bind("scroll", function () {
		sct = $(window).scrollTop();

		// 메뉴 on, off
		for (var i = 0; i < 3; i++) {
			var h = 300;
			if (sct >= sectionTop[i + 1] - h) {
				$(".header .menu li:eq(" + i + ")").addClass("on").siblings("li").removeClass("on");
			} else if (sct < sectionTop[1] - h) {
				$(".header .menu li").removeClass("on");
			}
			if (sct >= sectionTop[i] - h) {
				$(".qmenu li:eq(" + i + ")").addClass("on").siblings("li").removeClass("on");
			}
			if (sct == 0) {
				location.hash = "";
			}
		}

		// 타이틀
		$(".section h3").each(function (i) {
			var o = (sct - sectionTop[i + 1] + (h * 3)) / 800,
				y1 = (sectionTop[i + 1] - sct) / 13,
				y2 = (sectionTop[i + 1] - sct) / 11;
			if (sct >= sectionTop[i + 1] - 800) {
				$(this).css({opacity: 1, transform: "translateY(0px)"});
				$(this).prev(".ud").css({opacity: 1, transform: "translateY(0px)"});
				$(this).next(".ink").css({opacity: 1, transform: "translateY(0px)"});
			} else if (sct < sectionTop[i + 1] - (h * 3)) {
				$(this).css({opacity: 0, transform: "translateY(50px)"});
				$(this).prev(".ud").css({opacity: 0, transform: "translateY(80px)"});
				$(this).next(".ink").css({opacity: 0, transform: "translateY(80px)"});
			} else {
				$(this).css({opacity: o, transform: "translateY(" + y1 + "px)"});
				$(this).prev(".ud").css({opacity: o, transform: "translateY(" + y2 + "px)"});
				$(this).next(".ink").css({opacity: o, transform: "translateY(" + y2 + "px)"});
			}
		});

		// 블럭 애니메이션
		$(".section .block").each(function (i) {
			var bh = $(this).height(),
				o1 = (sct - blockTop[i] + (h * 3)) / 484,
				o2 = (sct - blockTop[i] + (h * 3)) / (h * 3),
				y1 = (blockTop[i] - sct) / (h * 3),
				y2 = (blockTop[i] - sct) / 20,
				y3 = (blockTop[i] - sct) / 5000;
			if (sct >= blockTop[i] - h) {
				$(this).find("h4, .btn_detail, .add_txt, .sl, .narr").css({opacity: 1, transform: "translateY(0px)"});
			} else if (sct < blockTop[i] - h * 3) {
				$(this).find("h4, .btn_detail, .narr").css({opacity: 0, transform: "translateY(30px)"});
				$(this).find(".add_txt, .sl").css({opacity: 0, transform: "translateY(100px)"});
			} else {
				$(this).find("h4, .btn_detail").css({opacity: o1, transform: "translateY(" + y1 + "px)"});
				$(this).find(".add_txt, .sl").css({opacity: o2, transform: "translateY(" + y2 + "px)"});
				$(this).find(".narr").css({opacity: o1, transform: "translateY(" + y3 + "px)"});
			}
			if (sct >= blockTop[i] - 800 && sct <= blockTop[i] + bh - 100) {
				$(this).addClass("active");
			} else {
				$(this).removeClass("active");
			}
		});
	});

	// 팝업 공통
	$(".update1 .thumbnail li a").click(function (e) {
		e.preventDefault();
		$(".bg_pop").fadeIn("fast");
	});
	$(".bg_pop, .pop .close").click(function (e) {
		e.preventDefault();
		$(".bg_pop, .pop").fadeOut("fast");
	});

	// updadte1 팝업
	$(".update1 .thumbnail li a").click(function () {
		blockIdx = $(this).parents(".block").index(),
			thumbIdx = $(this).parents("li").index() + 1;
		thumbLength = $(this).parents(".thumbnail").children("li").length;
		imgPop();
	});
	$(".img_pop .move").click(function (e) {
		e.preventDefault();
		if ($(this).hasClass("prev")) {
			thumbIdx = thumbIdx == 1 ? thumbLength : thumbIdx - 1
		} else {
			thumbIdx = thumbIdx == thumbLength ? 1 : thumbIdx + 1
		}
		imgPop();
	});
	$(".img_pop").hover(function () {
		$(".img_pop .move").fadeIn("fast");
	}, function () {
		$(".img_pop .move").fadeOut("fast");
	});
});

var winWidth = $(window).width();
var sct = $(window).scrollTop();
var sectionTop = [];
var blockTop = [];
var blockIdx;
var thumbIdx;
var thumbLength;
var mPos;
var mPosMove;
var imgScr;
var imgName;
var hash = location.hash.indexOf("?") > -1 ? location.hash.split("#")[1].split("?")[0] : location.hash.split("#")[1];
var hashName = ["Update1", "Update2"];
var ease = "easeInOutExpo";
var pageSpeed = 600;

function resize() {
	winWidth = $(window).width();
	if (winWidth <= 1263) {
		mPos = -326;
		$(".wrap").addClass("resize");
		$(".header .menu .m1").css({left: mPos});
		$(".header .menu .m2").css({right: mPos});
	} else if (winWidth <= 1800) {
		mPos = -426,
		mPosMove = parseInt((1920 - winWidth) * 0.15);
		
		$(".header .menu .m1").css({left: mPos + mPosMove});
		$(".header .menu .m2").css({right: mPos + mPosMove});
	} else {
		$(".wrap").removeClass("resize");
		$(".header .menu .m1").css({left: ""});
		$(".header .menu .m2").css({right: ""});
	}
}

function imgPop() {
	imgSrc = "http://image.cabal.co.kr/Intro/171206_intro/images",
	imgName = "/imgP" + blockIdx + "_" + thumbIdx;
	$(".img_pop").fadeIn("fast");
	$(".img_pop .image_wrap").empty().append("<img src='" + imgSrc + imgName + ".png' alt=''>");
}

function bgAni() {
	var bg = setInterval(function () {
		$(".main .bg2").fadeIn(30, function () {
			$(this).fadeOut(50, function () {
				$(this).fadeIn(800, function () {
					$(this).fadeOut(800);
				});
			});
		});
	}, 10);

	setTimeout(function () {
		clearInterval(bg)
	}, 120)
}

//페이지별 주소
function pageLoad() {
	for (var i = 0; i < hashName.length; i++) {
		if (hashName[i].indexOf(hash) == 0) {
			$("html, body").scrollTop(sectionTop[i + 1]);
		}
	}
}

//하위버전 indexOf
if (!Array.prototype.indexOf) {
	Array.prototype.indexOf = function (obj, start) {
		for (var i = (start || 0), j = this.length; i < j; i++) {
			if (this[i] === obj) {
				return i;
			}
		}
		return -1;
	}
}