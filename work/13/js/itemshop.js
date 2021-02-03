var mainNum, subNum;
$(function () {
	// 아이템명
	/*$(".item_list li .name .tx").each(function(i){
		if($(this).text().length > 32){
			$(this).text($(this).text().substr(0,32)+'...');
		}
	});
	$(".i_m_wrap li .name .tx").each(function(i){
		if($(this).text().length > 28){
			$(this).text($(this).text().substr(0,28)+'...');
		}
	});*/

	// 서브페이지-메뉴
	$(".sub_menu > ul > li").each(function (i) {
		$(this).find(">a").click(function (e) {
			// e.preventDefault();
			if (!($(this).parent("li").hasClass("on"))) {
				$(".sub_menu li ul").hide();
				$(this).next("ul").show();
			} else {
				$(this).next("ul").hide();
			}
			$(this).parents("li").addClass("on").siblings("li").removeClass("on");
		});
	});
	// $(".sub_menu .on li:first").addClass("on");

	// Item Detail
	// $(".view_area .item_banner").css("height",$(".item_ex").height());

	// 바깥쪽 클릭시 레이어 닫기
	outClick();

	// 화면조정
	var winHeight = $(window).height();
	// $(".container").css("min-height",winHeight);
	// commonPage();
	$(window).resize(function () {
		// commonPage();
		var winHeight = $(window).height();
		// $(".container").css("min-height",winHeight);
	});
	if (mainNum) {
		mainPage();
		$(window).resize(function () {
			mainPage();
		});
	} else if (subNum) {
		subPage();
		$(window).resize(function () {
			subPage();
		});
	}

	// location
	if (subNum == 2) {
		$(".common_top .location").show();
		$(".location .depth1").text($(".sub_menu > ul > .on > a").text());
		$(".location .depth2").text($(".sub_menu .on .on a").text());
	} else if (subNum == 3) {
		$(".common_top .location").show();
		$(".location .depth1").text($(".sub_menu h3 a").text());
		$(".location .depth2").text($(".sub_menu > ul > .on > a").text());
	} else if (subNum == 4) {
		$(".common_top .location").show();
		$(".location .depth1").text($(".sub_menu > ul > .on > a").text());
		$(".location .depth2").text($(".sub_menu .on .on a").text());
		$(".r_menu .c_select").hide();
	} else if (subNum == 5) {
		$(".common_top .location").show();
		$(".location .depth1").text($(".sub_menu h3 a").text());
		$(".location .depth2").text($(".sub_menu > ul > .on > a").text());
		$(".r_menu .c_select").hide();
	} else {
		$(".common_top .location").hide();
	}

	// 아이템 리스트 분류창
	if (mainNum) {
		$(".r_menu .c_select").hide();
	}

	// 공통 상단 메뉴
	$(".header .gnb_list ul li a").click(function (e) {
		e.preventDefault();
		$(".header .gnb_list ul li").removeClass("on");
		$(this).parent().addClass("on");
		$(".common_top .allmenu_show, .c_select ul, .g_pop .s_result").hide();
		$(".common_top .allmenu").removeClass("up");
		if ($(this).parent().hasClass("notice")) {
			$(".header .n_list").toggle();
			$(".header .a_list").hide();
			nWidth();
		} else {
			$(".header .a_list").toggle();
			$(".header .n_list").hide();
		}
	});
	$(".common_top .allmenu").click(function (e) {
		e.preventDefault();
		$(this).toggleClass("up");
		$(".common_top .allmenu_show").toggle();
		$(".header .a_list, .header .n_list, .c_select ul, .g_pop .s_result").hide();
		$(".header .gnb_list ul li").removeClass("on");
	});
	$(".common_top .allmenu").mouseover(function () {
		$(this).addClass("up");
		$(".common_top .allmenu_show").show();
		$(".header .a_list, .header .n_list, .c_select ul, .g_pop .s_result").hide();
		$(".header .gnb_list ul li").removeClass("on");
	});
	$(".common_top .allmenu_show").mouseleave(function () {
		$(".common_top .allmenu").removeClass("up");
		$(".common_top .allmenu_show").hide();
	});

	// 공통 상단 - 알림 목록 전체삭제 가로 크기, 전체삭제 표시 유무	
	if ($(".n_list ul li").length > 0) {
		$(".n_list .del_all").show();
		$(".n_list ul").css("margin-bottom", "40px");
	} else {
		$(".n_list .del_all").hide();
		$(".n_list ul").css("margin-bottom", "0px");
	}
	addScroll();

	function addScroll() {
		if ($(".n_list ul li").length > 5) {
			$(".n_list .n_wrap > div").addClass("scroll");
			nWidth();
		} else {
			$(".n_list .n_wrap > div").removeClass("scroll");
			nWidth();
		}
	}

	function nWidth() {
		var nListWidth = $(".n_list ul").width();
		$(".n_list .del_all").width(nListWidth);
		$(".n_list p").width(nListWidth - 26);
	}

	// 공통 상단 - 알림 목록 지우기
	$(".header .n_list div .del_all").click(function (e) {
		e.preventDefault();
		$(".header .n_list div ul li, .header .n_list div .del_all").remove();
		addScroll();
		$(".n_list ul").css("margin-bottom", "0px");
		// $(".header .n_list div ul li").remove();
	});
	$(".header .n_list div ul li .del").click(function (e) {
		e.preventDefault();
		addScroll();
		$(this).parent("li").remove();
		if ($(".n_list ul li").length < 1) {
			$(".header .n_list div .del_all").remove();
			$(".n_list ul").css("margin-bottom", "0px");
		}
	});

	// 공통 북마크 팝업 레이어 창
	$(".over .bm, .price_area .btn_bm").click(function (e) {
		e.preventDefault();
		$(this).toggleClass("on");
		if ($(this).hasClass("on")) {
			$(".pop_bm").show().find(">p").text("즐겨찾기에 저장되었습니다.");
			setTimeout(function () {
				$(".pop_bm").hide();
			}, 1500);
		} else {
			$(".pop_bm").show().find(">p").text("즐겨찾기가 해제되었습니다.");
			setTimeout(function () {
				$(".pop_bm").hide();
			}, 1500);
		}
	});
	$(".pop_bm .close").click(function (e) {
		e.preventDefault();
		$(".pop_bm").hide();
	});
	/*$(".over .bm").click(function(e){
		e.preventDefault();
		$(this).toggleClass("on");
		if($(this).hasClass("on")){
			var imgSrc = $(this).parents().siblings("img").attr("src");
			var itemName = $(this).parents().siblings(".name")
			$(".add_bm").stop().animate({bottom:0}, 500, function(){
				// setTimeout(function(){
				// 	$(".add_bm").stop().animate({bottom:-216}, 500);
				// 	return false;
				// }, 3000)
			});
			$(".add_bm p img").attr("src", imgSrc);
			$(".add_bm .name").remove();
			$(this).parents().siblings(".btm").clone().insertAfter(".add_bm p img");
			// if($(".add_bm .name .tx").text().length > 20){
			// 	$(".add_bm .name .tx").text($(".add_bm .name .tx").text().substr(0,20)+'...');
			// }
		}else{
			$(".add_bm").stop().animate({bottom:-216}, 500);
		}
	});
	$(".add_bm .btn_close").click(function(e){
		e.preventDefault();
		$(".add_bm").stop().animate({bottom:-216}, 500);
	});*/

	// 메인 배너

	autoRolling();
	$(".banner_nav li").each(function (i) {
		$(this).find(">a").click(function (e) {
			e.preventDefault();
			bannerIdx = i;
			rollingStop();
			$(".banner_nav li a").removeClass("on");
			$(this).addClass("on");
			$(".banner_img li:eq(" + i + ")").fadeIn(500).siblings("li").fadeOut(500);
			setTimeout(function () {
				autoRolling();
			}, 1000)
		});
	});

	// 아이템 자세히 보기 배너 - item_detail.html
	$(".item_banner .nav").css("margin-left", -($(".item_banner .nav").width() / 2));
	$(".item_banner .nav li").each(function (i) {
		$(this).find(">a").click(function (e) {
			e.preventDefault();
			$(".item_banner .banner_img li").eq(i).addClass("on").siblings("li").removeClass("on");
			$(this).parents("li").addClass("on").siblings("li").removeClass("on");
		});
	});
	var banLength = $(".banner_img li").length;
	$(".item_banner p .a_b_num").text(("0") + (banLength))
	$(".item_banner p .now").text(("0") + ($(".banner_img .on").index() + 1))
	$(".item_banner .move").click(function (e) {
		e.preventDefault();
		var idx = $(".banner_img .on").index();
		var bannerIdx = 0;
		if ($(this).hasClass("next")) {
			var nextIdx = idx + 1;
			if (nextIdx == banLength) {
				nextIdx = 0;
			}
			$(".banner_img li").not($(".banner_img li").eq(nextIdx)).removeClass("on").hide();
			$(".banner_img li").eq(nextIdx).addClass("on").show();
		} else if ($(this).hasClass("prev")) {
			var prevIdx = idx - 1;
			if (prevIdx == -1) {
				prevIdx = banLength - 1;
			}
			$(".banner_img li").not($(".banner_img li").eq(prevIdx)).removeClass("on").hide();
			$(".banner_img li").eq(prevIdx).addClass("on").show();
		} else {
			return false;
		}
		var banNum = $(".banner_img .on").index() + 1;
		$(".item_banner p .now").text(("0") + (banNum));
	});
	$(".item_banner .move").hover(function () {
		$(".item_banner p").show()
	}, function () {
		$(".item_banner p").hide();
	});

	// 아이템 리스트 오버(공통)
	$(".item_list .over, .item_more_wrap .over").hide();
	$(".item_list ul li, .item_more_wrap ul li").each(function (i) {
		$(this).hover(function () {
			$(".item_list .over, .item_more_wrap .over").eq(i).show();
			$(".item_list .btm").eq(i).addClass("on");
			// $(".item_list .name, .item_more_wrap .name").eq(i).addClass("o_b")	
		}, function () {
			$(".item_list .over, .item_more_wrap .over").hide();
			$(".item_list .btm").removeClass("on");
			// $(".item_list .name, .item_more_wrap .name").removeClass("o_b")	
		});
		if ($(".item_list .btm:eq(" + i + ") .op").length == 1) {
			$(".btm:eq(" + i + ")").children(".name").css("margin-bottom", "5px")
		} else {
			$(".btm:eq(" + i + ")").children(".name").css("margin-bottom", "9px")
		}
	});
	$(".item_list .over .ic").hover(function () {
		$(this).toggleClass("on");
	});

	// 비드 타입 아이템 오버 
	$(".choose_wrap .type li").each(function (index) {
		$(this).hover(function () {
			$(this).children("a").addClass("select");
			$(".choose_wrap .type li").eq(index).css("z-index", "1")
			$(".choose_wrap .type .pop_benefit").eq(index).show();
		}, function () {
			$(".choose_wrap .type li a").removeClass("select");
			$(".choose_wrap .type li").css("z-index", "0")
			$(".choose_wrap .type .pop_benefit").hide();

		});
	});

	// 셀렉트박스 커스터마이징
	$("a.select_default").each(function (i) {
		$(this).click(function (e) {
			e.preventDefault();
			$("a.select_default:not(:eq(" + i + "))").next("ul").hide();
			$("a.select_default:not(:eq(" + i + "))").removeClass("on");
			$(this).toggleClass("on");
			$(this).next("ul").toggle();
			$(".header .a_list, .header .n_list, .common_top .allmenu_show").hide();
			$(".common_top .allmenu").removeClass("up");
			$(".header .gnb_list ul li").removeClass("on");
		});
	});
	$(".c_select a.select_default").next("ul").find("li a").click(function (e) {
		e.preventDefault();
		$("a.select_default").removeClass("on");
		$(this).parents("ul").prev("a.select_default").text($(this).text());
		$(this).parents("ul").hide();
	});

	// 쿠폰 등록 인풋 텍스트
	$(".c_wrap .code").focus(function () {
		$(this).next("label").addClass("blind");
	}).blur(function () {
		if ($(this).val().length == 0) {
			$(".c_wrap label").removeClass("blind");
		}
	});

	// 선물하기 팝업
	$(".d_btn .btn_gift").click(function (e) {
		e.preventDefault();
		$(".g_pop, .bg_pop").show();
	});
	$(".btn_area a").click(function (e) {
		e.preventDefault();
		$(".pop, .bg_pop").hide();
	});
	$(".g_pop .s_txt").keyup(function () {
		if (this.value.length > 0) {
			$(".g_pop .s_result").show();
		} else {
			$(".g_pop .s_result").hide();
		}
	});

	// 팝업(추가) 공통 - 180410
	$(".a_pop > .close").click(function (e) {
		e.preventDefault();
		$(".bg_pop").hide();
		$(this).parents(".a_pop").hide()
	});
	// 쿠폰함 팝업
	$(".con_page .price .btn_coupon").click(function (e) {
		e.preventDefault();
		$(".bg_pop, .cp_pop").show();
	});
	// 체크 박스(공통)
	$(".check label").click(function () {
		$(this).toggleClass("chk")
		if ($(this).hasClass("chk")) {
			$(this).prev("input").prop("checked", "checked");
		} else {
			$(this).prev("input").removeAttr("checked");
		}
	});
	var tab1 = new tab(".cp_pop");

	// 캐쉬 충전하기 팝업
	$(".c_pop .btn_limit").click(function (e) {
		e.preventDefault();
		$(this).parents(".pcon").next(".bg_cpop").show();
		$(".lm_pop").show();
	});
	$(".lm_pop > .close, .lm_pop .btn_lclose").click(function (e) {
		e.preventDefault();
		// $(".bg_cpop").hide();
		$(this).parents(".lm_pop").prev(".bg_cpop").hide();
		$(this).parents(".lm_pop").hide();
	});

	// 캐릭터, 서버 이동
	var tab1 = new tab(".move_info");
});

// 바깥쪽 클릭시 레이어 닫기
function outClick() {
	$(document).click(function (event) {
		var outClick = $(event.target).parents(".header .content_wrap .gnb_list, .common_top, .c_select, .search_area").length;
		if (!outClick) {
			$(".header .a_list, .common_top .allmenu_show, .c_select ul, .g_pop .s_result").hide();
			$(".common_top .allmenu").removeClass("up");
			$(".header .gnb_list ul li, a.select_default").removeClass("on");
		}
	});
	$(".header .content_wrap, #content").click(function (event) {
		var outClick = $(event.target).parents(".header .content_wrap .gnb_list").length;
		if (!outClick) {
			$(".header .n_list").hide();
		}
	});
	// 180409 add
	$("input:text").focus(function () {
		$(".header .a_list, .common_top .allmenu_show, .c_select ul, .g_pop .s_result").hide();
		$(".common_top .allmenu").removeClass("up");
		$(".header .gnb_list ul li, a.select_default").removeClass("on");
	});
}

// 공통 리사이징
function commonPage() {
	winWidth = $(window).width();
	if (winWidth < 1000) {
		$(".wrap .content_wrap").css({
			"padding-left": "25px",
			"padding-right": "25px"
		});
		$(".content_wrap, .header .n_list, .header .a_list").addClass("resize");
	} else {
		$(".wrap .content_wrap").css({
			"padding-left": "30px",
			"padding-right": "30px"
		});
		$(".content_wrap, .header .n_list, .header .a_list").removeClass("resize");
	}
}

// 메인 리사이징
function mainPage() {
	winWidth = $(window).width();
	$(".container").addClass("main");
}

// 서브 리사이징
function subPage() {
	winWidth = $(window).width();
	$(".container").addClass("sub");
	if (winWidth < 1000) {
		$(".item_more_wrap ul li:nth-child(4n)").hide();
		$(".choose_wrap .type_wrap").css("padding", "17px 61px");
		$(".period_wrap .p_sel").css("padding", "15px 0 36px 11px");
	} else {
		$(".item_more_wrap ul li:nth-child(4n)").show();
		$(".choose_wrap .type_wrap").css("padding", "17px 44px");
		$(".period_wrap .p_sel").css("padding", "29px 0 61px 11px");
		// $(".item_detail_wrap").removeClass("resize");
	}
}

// 메인 배너 롤링
var bannerIdx = 0;
var b_a_r;

function bannerRolling() {
	var banLength = $(".banner_area .banner_img li").length;
	bannerIdx++;
	if (banLength > 1) {
		$(".banner_area .banner_img li:eq(" + (bannerIdx - 1) + ")").fadeOut(500);
		if (bannerIdx != banLength) {
			$(".banner_area .banner_img li:eq(" + bannerIdx + ")").fadeIn(500);
		} else {
			$(".banner_area .banner_img li:first").show().fadeIn(500);
			bannerIdx = 0;
		}
		$(".banner_area .banner_nav li a").removeClass("on");
		$(".banner_area .banner_nav li a:eq(" + bannerIdx + ")").addClass("on");
	}
}

function autoRolling() {
	b_a_r = setInterval("bannerRolling()", 3500);
}

function rollingStop() {
	clearInterval(b_a_r);
}

// 탭메뉴
function tab(tabClass) {
	var tabMenu = $(tabClass).find(".tmenu li"),
		tabCon = $(tabClass).find(".tab");
	tabMenu.each(function (i) {
		$(this).find(">a").click(function (e) {
			e.preventDefault();
			tabCon.eq(i).show().siblings(".tab").hide();
			$(this).parents("li").addClass("on").siblings("li").removeClass("on");
		});
	});
}