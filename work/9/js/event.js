$(document).ready(function () {
	bgAni1();

	$(".wrap .section").each(function (i) {
		sectionTop[i] = $(this).offset().top;
	});

	$(".qmenu .top").click(function (e) {
		e.preventDefault();
		$("html, body").stop().animate({
			scrollTop: 0
		})
	});

	$(window).bind("scroll", function () {
		sct = $(window).scrollTop();
		if (sct >= winHeight / 1.5) {
			$(".wrap .qmenu").addClass("show");
		} else {
			$(".wrap .qmenu").removeClass("show");
		}
		for (var i = 0; i < 4; i++) {
			if (sct >= sectionTop[i] - adjustH) {
				$(".section h3").removeClass("show");
				$(".section:eq(" + i + ") h3").addClass("show");
			}
		}
	});

	$(".bg_pop, .pop .close").click(function (e) {
		e.preventDefault();
		$(".pop").removeClass("show");
		$(".bg_pop").fadeOut("fast", function () {
			$(".pop").hide();
		});
		$(".iScrollVerticalScrollbar").remove();
	});

	$(".event2 ul li").each(function (i) {
		$(this).find(">a").click(function (e) {
			e.preventDefault();
			$(".pop:eq(" + i + ")").show(function () {
				$(this).addClass("show");
				$(".bg_pop").fadeIn("fast");
			});
			if ($(".pop1").css("display") == "block") {
				popScroll1();
			} else {
				popScroll2();
			}
		});
	});
});

var sectionTop = [];
var winHeight = $(window).height();
var sct = $(window).scrollTop();
var adjustH = 700;
var speed1 = 150;
var speed2 = 80;

function bgAni1() {
	$(".title .bg2").fadeIn(speed1, function () {
		$(".title .bg3").fadeIn(speed1, function () {
			$(".title .bg4").fadeIn(speed1, function () {
				$(".title .bg2, .title .bg3, .title .bg4").fadeOut(speed1, function () {
					$(".title .bg4").fadeIn(speed2, function () {
						$(".title .bg4").fadeOut(speed2, function () {
							$(".title .bg4").fadeIn(300, function () {
								setTimeout(function () {
									bgAni2();
								}, 300);
							});
						});
					});
				});
			});
		});
	});
}

function bgAni2() {
	$(".title .bg5").fadeIn(600, function () {
		$(this).fadeOut(600, function () {
			bgAni2();
		});
	});
}

function popScroll1() {
	var popScroll1 = new IScroll('.pop1 .tb_wrap', {
		scrollbars: true,
		mouseWheel: true,
		interactiveScrollbars: true,
		shrinkScrollbars: 'scale'
	});
}

function popScroll2() {
	var popScroll2 = new IScroll('.pop2 .tb_wrap', {
		scrollbars: true,
		mouseWheel: true,
		interactiveScrollbars: true,
		shrinkScrollbars: 'scale'
	});
}