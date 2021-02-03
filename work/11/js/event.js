$(function () {
	cardS();
	cardM();

	$(".bg_pop, .pop .close").click(function (e) {
		e.preventDefault();

		$(".pop").removeClass("show");
		$(".bg_pop").fadeOut("fast", function () {
			$(".pop").hide();
		});
	});

	$(".btn_pop li").each(function (i) {
		$(this).find(">a").click(function (e) {
			e.preventDefault();

			$(".pop:eq(" + i + ")").show(function () {
				$(this).addClass("show");
				$(".bg_pop").fadeIn("fast");
			});

			if ($(".pop2").css("display") == "block") {
				popScroll();
			}
		});
	});

	var sct = $(window).scrollTop();
	var winHeight = $(window).height();

	$(window).scroll(function () {
		sct = $(window).scrollTop();
		if (sct >= winHeight / 1.7) {
			$(".qmenu").addClass("show");
		} else {
			$(".qmenu").removeClass("show");
		}
	});

	$(".qmenu .top").click(function (e) {
		e.preventDefault();
		$("html, body").stop().animate({
			scrollTop: 0
		}, 600, "easeInOutExpo")
	})

	// TweenMax.to(대상오브젝트, 시간, 속성)
	var p1 = new TimelineMax({repeat: -1, repeatDelay: -.5}),
		p2 = new TimelineMax({repeat: -1, repeatDelay: -.5}),
		e = [
				{x: 0, y: 0, autoAlpha: 0},
				{x: 250, y: 60, autoAlpha: 1},
				{x: 0, y: 120, autoAlpha: 1},
				{x: 250, y: 180, autoAlpha: 1},
				{x: 0, y: 240, autoAlpha: 0}
			],
		s = 3;

	p1.from($(".particle .p1, .particle .p8"), s, {bezier: {type: "soft", values: e}});
	p1.from($(".particle .p4"), s, {bezier: {type: "soft", values: e}});
	p1.from($(".particle .p9"), s, {bezier: {type: "soft", values: e}}, "-=2.5");
	p1.from($(".particle .p3"), s, {bezier: {type: "soft", values: e}}, "-=2.5");
	p1.from($(".particle .p10"), s, {bezier: {type: "soft", values: e}}, "-=2.5");
	p1.from($(".particle .p12, .particle .p15"), s, {bezier: {type: "soft", values: e}}, "-=2.5");
	p2.from($(".particle .p11"), s, {bezier: {type: "soft", values: e}});
	p1.from($(".particle .p2"), s, {bezier: {type: "soft", values: e}}, "-=2");
	p2.from($(".particle .p5"), s, {bezier: {type: "soft", values: e}}, "-=2");
	p2.from($(".particle .p7"), s, {bezier: {type: "soft", values: e}}, "-=2");
	p2.from($(".particle .p6"), s, {bezier: {type: "soft", values: e}}, "-=2");
	p2.from($(".particle .p13, .particle .p14"), s, {bezier: {type: "soft", values: e}}, "-=2");
});

function popScroll() {
	var popScroll = new IScroll('.pop2 .tb_wrap', {
		scrollbars: true,
		mouseWheel: true,
		interactiveScrollbars: true,
		shrinkScrollbars: 'scale'
	});
}

function cardM() {
	$(".main .user_zone").stop().animate({top: 419}, 1800, "linear", function () {
		$(this).stop().animate({top: 404}, 1800, "linear", function () {
			cardM();
		});
	})
};

function cardS() {
	$(".main .card").stop().animate({top: 351}, 1800, "linear", function () {
		$(this).stop().animate({top: 366}, 1800, "linear", function () {
			cardS();
		});
	})
};