$(function () {
	$("#section_wrap").pagepiling({
		menu: '#update_menu',
		direction: 'vertical',
		verticalCentered: true,
		sectionsColor: [],
		anchors: ['intro', 'field', 'dungeon1', 'dungeon2', 'battle1', 'battle2', 'battle3', 'level', 'system1', 'system2', 'item1', 'item2'],
		scrollingSpeed: 100, // 800
		easing: 'swing',
		loopBottom: false, // 마직막 페이지 스크롤시 첫 페이지
		loopTop: false, // 첫 페이지 스크롤시 마지막 페이지
		css3: true,
		navigation: false,
		// normalScrollElements: null,
		// normalScrollElements: '.section9',
		normalScrollElementTouchThreshold: 5,
		touchSensitivity: 5,
		keyboardScrolling: true,
		sectionSelector: '.section',
		animateAnchor: false, // 앵커화면 로드시 첫 페이지 슬라이딩
		// events
		onLeave: function (index, nextIndex, direction) {},
		afterLoad: function (anchorLink, index) {
			var speed = 500;
			var activeIdx;
			if (index == 1) {
				$(".depth1").removeClass("on");
				$(".sub_menu").slideUp(speed);
				// $(".section1").addClass("on")
			}
			$(".depth2.active").parents(".depth1").addClass("on").siblings(".depth1").removeClass("on");
			$(".depth1.on").find(">.sub_menu").slideDown(speed).parents(".depth1").siblings(".depth1").find(">.sub_menu").slideUp(speed);
			$(".section.active").addClass("on").siblings(".section").removeClass("on");
			$(".section.active .tab_menu li").first().addClass("on").siblings("li").removeClass("on");
			$(".section.active .tab").first().show().siblings(".tab").hide();
		},
		afterRender: function () {}
	});

	// 디폴트
	cellFx('.cell_fx');
	resize();
	$(".section7 .content").css("margin-top", -(($(".section7 .content").height() / 2) + 8) + "px");

	// 이미지 썸네일 - 텍스트 있는 경우 마우스 오버
	$(".img_list-txt li a").hover(function () {
		$(this).next("p").css("color", "#ff4200");
	}, function () {
		$(".img_list-txt li p").css("color", "#c8c8c8");
	});

	//탭
	var tab1 = new tab(".section9");
	var tab2 = new tab(".section10");
	$(window).load(function () {
		$(".wrap").addClass("load");
		setTimeout(function () {
			$(".load_bg").hide();
		}, 1000);
		if ($(".section1").hasClass("active")) {
			$(".m1").addClass("active");
			$(".section1").addClass("on");
		}
	});

	// 윈도우 리사이즈
	$(window).resize(function () {
		resize();
	});

	// 레이어 팝업
	$(".bg_hide, .pop_wrap .close").click(function (e) {
		e.preventDefault();
		$(".pop").empty();
		$(".bg_hide, .pop_wrap").hide();
		$(".pop").removeClass("show")
	});
	$(".img_list li a").click(function (e) {
		e.preventDefault();
		sectionIdx = $(this).parents(".section").index(),
			thumbIdx = $(this).parent("li").index(),
			thumbLength = $(this).parents(".img_list").children("li").length - 1,
			bgColor = $(".pop_wrap, .pop_wrap .move"),
			movie = [
				['<iframe width="1194" height="714" src="https://www.youtube.com/embed/VwcZD5ZQ6nQ?rel=0&amp;showinfo=0&amp;vq=hd1080" frameborder="0" allowfullscreen></iframe>'],
				['<iframe width="1194" height="714" src="https://www.youtube.com/embed/A_Khe50nvGc?rel=0&amp;showinfo=0&amp;vq=hd1080" frameborder="0" allowfullscreen></iframe>'],
				['<iframe width="1194" height="714" src="https://www.youtube.com/embed/8_bL98CrRNU?rel=0&amp;showinfo=0&amp;vq=hd1080" frameborder="0" allowfullscreen></iframe>']
			];
		$(".bg_hide, .pop_wrap").show();

		// 팝업 배경 색상 변경
		if (sectionIdx == 1) {
			bgColor.css("background-color", "#00a8ff");
		} else if (sectionIdx == 2 || sectionIdx == 3) {
			bgColor.css("background-color", "#ad0000");
		} else if (sectionIdx == 4 || sectionIdx == 5 || sectionIdx == 6) {
			bgColor.css("background-color", "#ffa000");
		} else if (sectionIdx == 10 || sectionIdx == 11) {
			bgColor.css("background-color", "#ff4200");
		}
		popThumb();
	});

	$(".pop_wrap .move").click(function (e) {
		e.preventDefault();
		if ($(this).hasClass("prev")) {
			thumbIdx = thumbIdx == 0 ? thumbLength : thumbIdx - 1
		} else {
			thumbIdx = thumbIdx == thumbLength ? 0 : thumbIdx + 1;
		}
		popThumb();
	});
});

var winWidth = $(window).width();
var winHeight = $(window).height();
var sectionIdx;
var thumbIdx;
var thumbLength;
var imgSrc;
var imgNum;
var bgColor;
var popTxt;
var movie;

// 윈도우 리사이즈
function resize() {
	winWidth = $(window).width(),
		winHeight = $(window).height();
	$(".wrap, .section_wrap").css("height", winHeight);
	if (winWidth <= 1280) {
		$(".wrap").addClass("resize_w");
	} else {
		$(".wrap").removeClass("resize_w");
	}
	if (winHeight <= 920) {
		$(".wrap").addClass("resize_h");
	} else {
		$(".wrap").removeClass("resize_h");
	}
}

// 레이어 팝업
function popThumb() {
	imgSrc = "http://image.cabal2.co.kr/Intro/170620_update/images/pop",
		imgNum = sectionIdx + "_" + thumbIdx,
		popTxt = $(".active .img_list-txt li").eq(thumbIdx).find(">p").text();
	if (sectionIdx < 4) {
		if (thumbIdx > 0) {
			$(".pop").empty().append("<img src='" + imgSrc + imgNum + ".jpg' alt=''>");
		} else {
			$(".pop").empty().append(movie[sectionIdx - 1]);
		}
	} else if (sectionIdx > 9) {
		$(".pop").empty().append("<p>" + popTxt + "</p><img src='" + imgSrc + imgNum + ".jpg' alt=''>")
	} else {
		$(".pop").empty().append("<img src='" + imgSrc + imgNum + ".jpg' alt=''>");
	}
}

// 탭
function tab(targetClass) {
	var tabMenu = $(targetClass).find(".tab_menu li"),
		tabContent = $(targetClass).find(".tab"),
		speed = 500;
	tabMenu.each(function (i) {
		$(this).find(">a").click(function (e) {
			e.preventDefault();
			$(this).parent("li").addClass("on").siblings("li").removeClass("on");
			tabContent.eq(i).fadeIn(speed).siblings(".tab").fadeOut(speed);
		});
	});
	// 디폴트
	tabMenu.first().addClass("on");
	tabContent.first().show();
}

// 텍스트 애니메이션
var rRange = function (min, max) {
	return Math.floor((Math.random() * (max - min + 1)) + min);
}

function cellFx(targetClass) {
	// setFade = [ view/hidden[0] , boxSize[1] , fadeTime[2], boxDelayMin[3], boxDelayMax[4], translateZmin[5],translateZmax[6]] 
	// ["view", 45, 0.5, 0, 50, 100, 150]
	var setFade = ["view", 45, 0.5, 0, 50, 200, 300],
		// boxZindex = 200,
		boxBg = $(targetClass).css("background-image");
	if (setFade[0] === "view") {
		$(targetClass).addClass("fadeOn");
	}
	$(targetClass).each(function (e) {
		isNaN($(this).attr("data-delay")) ? orderDelay = 0 : orderDelay = Number($(this).attr("data-delay"))
		maxX = $(this).innerWidth() / setFade[1];
		maxY = $(this).innerHeight() / setFade[1];
		for (y = 0; y < maxY; y++) {
			for (x = 0; x < maxX; x++) {
				$(this).append('<span class="cell" style="width:' + setFade[1] + 'px; height:' + setFade[1] + 'px; left:' + (x * setFade[1]) + 'px; top:' + (y * setFade[1]) + 'px; background-position:-' + (x * setFade[1]) + 'px -' + (y * setFade[1]) + 'px; transform:translate3d(0,0,' + (rRange(-setFade[5], setFade[6])) + 'px); -webkit-transform:translate3d(0,0,' + (rRange(-setFade[5], setFade[6])) + 'px);"></span>');
			}
		}
		// transition-delay:' + (orderDelay+(rRange(setFade[3], setFade[4]) / 100)) + 's;
	});
}