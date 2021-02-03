$(document).ready(function () {
	$(".wrap").addClass("load");
	$(".wrap .section1").addClass("active");
	$(".btn_float").css("top", quickTop);

	resize();
	$(window).resize(function () {
		resize();
	});

	$(window).scroll(function () {
		quickTop = parseInt((winHeight - 311) / 2);
		sct = $(window).scrollTop();
		sectionIdx = $(".section.active").index();
		for (var i = 0; i < 3; i++) {
			if (sct >= sectionOffsetTop[i] - winHeight / 2) {
				$(".section:eq(" + i + ")").addClass("active").siblings(".section").removeClass("active");
			}
		}
		if (sct > 0) {
			$(".btn_float").stop().animate({top: quickTop + sct});
		} else {
			$(".btn_float").stop().animate({top: quickTop});
		}
	});

	// cbt 참여 신청 팝업
	$(".wrap .btn_cbt").click(function () {
		$("body").css("overflow-y", "hidden");
		$(".pop_cbt").fadeIn("fast");
	});

	// 팝업 닫기
	$(".pop_cbt .btn_close, .pop_cbt > .bg_pop").click(function () {
		$("body").css("overflow-y", "");
		$(".pop_cbt").fadeOut("fast");
		$(".check_list li label").removeClass("checked");
		return false;
	});
	$(".wrap .btn_confirm, .pop_cbt .btn_close, .agree_wrap .bg_pop").click(function () {
		$(".agree_wrap, .pop_agree").hide();
		return false;
	});

	// 휴대폰 번호 input focus
	$(".phone input[type=text]").focus(function () {
		$(".phone label").hide();
		return false;
	}).blur(function () {
		if (this.value !== "") {
			$(".phone label").hide();
		} else {
			$(".phone label").show();
		}
		return false;
	});

	// 동의하기 check
	$(".check_list li label").click(function () {
		if (!($(this).hasClass("checked"))) {
			$(this).addClass("checked");
			$(this).prev("input[type=checkbox]").prop("checked", "checked");
		} else {
			$(this).removeClass("checked");
			$(this).prev("input[type=checkbox]").prop("checked", "");
		}
		return false;
	});

	// 자세히보기 팝업
	$(".check_list li").each(function (i) {
		$(this).find(">button").click(function () {
			$(".agree_wrap, .pop_agree:eq(" + i + ")").show();
		});
	});
});

var winHeight = $(window).height();
var sct = $(window).scrollTop();
var sectionIdx = $(".section.active").index();
var sectionOffsetTop = [];
var scrollChk = true;
var section2H = $(".section2").height();
var section3H = $(".section3").height();
var easing = "easeInOutExpo";
var speed1 = 800;
var speed2 = 100;
var quickTop = parseInt((winHeight - 311) / 2);

function resize() {
	winHeight = $(window).height();
	sct = $(window).scrollTop();
	quickTop = parseInt((winHeight - 311) / 2);
	$(".wrap .section1").css("height", winHeight);
	$(".wrap .section").each(function (i) {
		sectionOffsetTop[i] = $(this).offset().top;
	});
	if (sct > 0) {
		$(".btn_float").css("top", quickTop + sct);
	} else {
		$(".btn_float").css("top", quickTop);
	}
}