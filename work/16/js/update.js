$(function () {
    slide = false;
    pgOn = $(".section.show").index(".section"), pgLeng = $(".section").length;

    // 마우스 휠 이벤트
    wheel();

    // 페이지 높이 세팅
    setHeight();
    $(window).resize(function () {
        setHeight();
    });

    // 썸네일 클릭
    popEvent();

    // 서브 페이지 이동
    $(".header .menu li a").removeClass("on");
    $(".menu li a").click(function (e) {
        e.preventDefault();
        if ($(this).hasClass("on") || $(".section.cover").hasClass("show")) return false;
        var onIdx;
        if (!$(this).parent("li").hasClass("mn_m")) {
            onIdx = parseInt($(this).parent().attr("class").split("mn_")[1]) - 1;
            pgOn = $(".sub .content_wrap:eq(" + onIdx + ") .cover").index(".section");
            $(".section:lt(" + pgOn + ")").filter(":not(.main)").addClass("active");
            goFor();
        } else {
            pgOn = $(".section:eq(" + pgOn + ")").parent().find(".cover").index(".section");
            goRev("main");
        }
    });

    // 서브페이지 내 이동
    $(".pager li a").click(function (e) {
        e.preventDefault();
        if ($(this).hasClass("on")) return false;
        clearTimeout(actIntv);
        var pgNext = pgOn + ($(this).parent().index() - $(".pager.show li .on").parent().index());
        if (pgNext < pgOn) {
            pgOn = pgNext;
            goRev();
        } else if (pgNext > pgOn) {
            pgOn = pgNext;
            goFor();
        }
    });

    // 메인 메뉴 이벤트
    $(".main .menu").mouseleave(function () {
        $(".menu .progress span").css({left: ""});
    });
    $(".main .menu li").each(function (i) {
        $(this).find(">a").mouseover(function () {
            if ($(this).parent("li").index() == 0) {
                $(".menu .progress span").css({left: 27});
            } else if ($(this).parent("li").index() == 1) {
                $(".menu .progress span").css({left: 244});
            } else if ($(this).parent("li").index() == 2) {
                $(".menu .progress span").css({left: 510});
            } else {
                $(".menu .progress span").css({left: 724});
            }
        });
    });

    // 메인 타이틀 이벤트
    $(".main .main_title h2 .h2_title").mgGlitch({
        destroy: false, // set 'true' to stop the plugin
        glitch: true, // set 'false' to stop glitching
        scale: false, // set 'false' to stop scaling
        blend: true, // set 'false' to stop glitch blending
        blendModeType: 'hue'
    });

    // 서브 내레이션 스크롤 이벤트
    $(".content1-1 .nr_scroll").mCustomScrollbar({
        axis: "y",
        scrollInertia: 550,
        live: true,
        callbacks: {
            onScrollStart: function () {
                if (slide) return false;
            }
        }
    });

    // New Item Pop
    $(".content3-1 .item_wrap li").each(function (i) {
        $(this).children(".btn_detail").find(">a").click(function (e) {
            e.preventDefault();
            $(".npop_wrap").show();
            $(".npop:eq(" + i + ")").show();
        });
    });
    $(".npop_wrap .btn_close, .npop_wrap .bg_pop").click(function (e) {
        e.preventDefault();
        $(".npop_wrap, .npop").hide();
    });
    window.getParameter = function (param) {
        if (param) var r = location.search.match(new RegExp("[&?]" + param + "=(.*?)(&|$)"));
        return r && r[1] ? r[1] : null;
    }
    if (getParameter("page") == 1) {
        $(".wrap").removeClass("on_m").addClass("on_s");
        $(".menu .mn_1 a").addClass("on")
        $(".main").removeClass("show").css({"z-index": ""});
        $(".content1").show();
        $(".content1 .cover").addClass("show active");

        setTimeout(function () {
            pgOn++;
            goFor();
        }, 1000);
    }
});

var speed = 700;
var slide = true;
var ease = "easeOutSine";
var pgOn = 0;
var pgLeng;
var pgClass;
var actIntv
var $pgDiv;

function wheel() {
    var delta = 0;
    $(".section").on("mousewheel DOMMouseScroll", function (e) {
        if (slide) return false;
        if ($(e.target).parents().hasClass("nr_scroll") || $(e.target).hasClass("nr_scroll")) {
            return true;
        }
        e.preventDefault ? e.preventDefault() : e.returnValue = false;
        if (e.originalEvent.wheelDelta) {
            delta = parseInt(e.originalEvent.wheelDelta) / Math.abs(parseInt(e.originalEvent.wheelDelta));
        } else if (e.originalEvent.detail) {
            delta = -parseInt(e.originalEvent.detail) / Math.abs(parseInt(e.originalEvent.detail));
        } else if (e.originalEvent.deltaY) {
            delta = -parseInt(e.originalEvent.deltaY) / Math.abs(parseInt(e.originalEvent.deltaY));
        }
        pageMove(delta);
    }).on("touchstart", function (e) {
        var event = e.originalEvent;
        winHeight = $(window).height(),
            startY = event.touches[0].clientY;
    }).on("touchend", function (e) {
        if (slide) return false;
        var event = e.originalEvent,
            endY = event.changedTouches[0].clientY;
        if (Math.abs(endY - startY) >= 100) {
            if (endY < startY) {
                delta = -1;
            } else if (endY > startY) {
                delta = 1;
            }
            pageMove(delta);
        }
        return true;
    })
}

// 페이지 이동
function pageMove(delta) {
    if (slide) {
        return false;
    } else if (!slide && (delta == -1 || delta == 1)) {
        // 휠 아래로
        if (delta == -1) {
            if ($(".section.show").index(".section") == pgLeng - 1 || $(".section.cover").hasClass("show")) {
                return false;
            }
            pgOn++;
            goFor();
        } // 휠 위로
        else if (delta == 1) {
            if ($(".wrap").hasClass("on_m")) {
                slide = false;
                return false;
            };
            pgOn--;
            goRev();
        }
    }
}

// 페이지 세팅
function pageSet() {
    slide = true;
    clearTimeout(actIntv);
    $pgDiv = $(".section:eq(" + pgOn + ")"),
        pgClass = $(".section:eq(" + pgOn + ")").attr("class").split(" ")[1];
    var pgIdx,
        $pgPar = $pgDiv.parent(".content_wrap");
    if ($pgPar.length) {
        prIdx = $(".sub .content_wrap").index($pgPar);
        $(".header .menu li a:eq(" + (prIdx + 1) + ")").addClass("on").parent().siblings().find("a").removeClass("on");
        if (pgClass != "cover") {
            pgIdx = $pgPar.find(".section").index($pgDiv) - 1;
            $pgPar.find(".pager").addClass("show").find("li:eq(" + pgIdx + ") a").addClass("on").parent().siblings().find("a").removeClass("on");
        } else {
            $(".pager").removeClass("show");
        }
    }
    if ($(".section.content1-1").hasClass("show")) {
        $(".narrative .scroll_hide").show();
    }
}

// forward
function goFor() {
    pageSet();
    $(".wrap").removeClass("on_m").addClass("on_s");
    $(".wrap .sub").css({top: 0});
    if (pgClass == "cover") {
        $pgDiv.addClass("show").parent().show().css({"z-index": 10}).siblings().css({"z-index": ""});
        $pgDiv.find(".bg_cover").stop().css({width: 0}).animate({width: 50 + "%"}, speed, ease, function () {
            if ($(this).index() == 0) {
                $(this).css({width: ""}).parents(".content_wrap").css({"z-index": ""});
                $(".section:eq(" + pgOn + ")").parent().siblings().css({display: ""});
                $(".section:not(:eq(" + pgOn + "))").removeClass("show");
                $(".section:gt(" + pgOn + ")").removeClass("active");
                
                setTimeout(function () {
                    pgOn++;
                    goFor();
                }, 1000);
            }
        });
    } else {
        $(".section.show").stop().css({"z-index": 10, top: 0 + "%"}).animate({top: -100 + "%"}, speed, ease, function () {
            $(this).css({"z-index": ""});
        });
        $pgDiv.addClass("show").stop().css({top: 10 + "%", "z-index": ""}).animate({top: 0}, speed, ease, function () {
            $(".section:not(:eq(" + pgOn + "))").css({top: ""}).removeClass("show");
            $(".section.cover").removeClass("active");
            slide = false;
            if (pgClass == "content1-1") {
                $(".narrative .scroll_hide").hide();
            }
        });
    }
    actIntv = setTimeout(function () {
        $(".section:eq(" + pgOn + ")").addClass("active");
    }, 300);
}

// reverse
function goRev(cl) {
    pageSet();
    $(".section.show").stop().css({top: 0, "z-index": ""}).animate({top: 10 + "%"}, speed, ease, function () {
        $(this).css({top: ""}).removeClass("active");
    });
    $pgDiv.addClass("show active").stop().css({"z-index": 10, top: -100 + "%"}).animate({top: 0 + "%"}, speed, ease, function () {
        $(this).css({"z-index": ""});
        $(".section:not(:eq(" + pgOn + "))").removeClass("show");
        $(".section:gt(" + pgOn + ")").removeClass("active");
        if (pgClass == "cover") {
            if (cl == "main") {
                pgOn = 0;
            } else {
                pgOn--;
            }
            pageSet();
            if (pgClass == "main") {
                $(".wrap").removeClass("on_s").addClass("on_m");
                $(".header .menu li a").removeClass("on");
            }
            $(".section.show").removeClass("active");
            $pgDiv.addClass("show").parent().show();
            $(".section.show").css({"z-index": 10});
            $(".section.show .bg_cover").css({width: 50 + "%"}).stop().animate({width: 0}, speed, ease, function () {
                slide = false;
                if ($(this).index() == 0) {
                    $(this).css({width: ""}).parent().css({"z-index": ""}).parents(".content_wrap").css({display: ""});
                    $(".section:not(:eq(" + pgOn + "))").removeClass("show");
                    if (pgClass == "main") {
                        $(".wrap .sub").css({top: ""});
                    }
                }
            })

        } else {
            slide = false;
            if (pgClass == "content1-1") {
                $(".narrative .scroll_hide").hide();
            }
        }
    });
}

// 페이지 높이 세팅
function setHeight() {
    var winHeight = $(window).height() < 890 ? 890 : $(window).height(),
        winWidth = $(window).width();
    $(".wrap").css({
        height: winHeight
    });
    if (winWidth < 1500) {
        $(".layerpop").addClass("w1500");
    } else {
        $(".layerpop").removeClass("w1500");
    }
    if (winWidth < 1600) {
        $(".header").addClass("w1600");
    } else {
        $(".header").removeClass("w1600");
    }
}

// 썸네일 클릭
function popEvent() {
    var thumb, ext, tidx, pidx;
    $(".thumb_wrap li a").click(function (e) {
        e.preventDefault();
        thumb = $(this).parents(".thumb_wrap").attr("class").split(" ")[1];
        ext = thumb == "monster" ? ".png" : ".jpg";
        tidx = $(this).parent().index();
        pidx = $(this).parents(".thumb_wrap").index(".thumb_wrap." + thumb);
        if ($(".layerpop .pop > div." + thumb + " ul:eq(" + pidx + ") li:eq(" + tidx + ")").is(":empty")) {
            $(".layerpop .pop > div." + thumb + " ul:eq(" + pidx + ") li:eq(" + tidx + ")").html("<img src='http://image.cabal.co.kr/Intro/170705_intro/images/img_" + thumb + "_" + (pidx + 1) + "-" + (tidx + 1) + ext + "' alt =''>");
        }
        $(".layerpop").show().find(".pop").addClass("show_" + thumb).find("div." + thumb + " ul:eq(" + pidx + ") li:eq(" + tidx + ")").addClass("show");
    });
    $(".layerpop .bg_pop, .layerpop .btn_close").click(function () {
        $(".layerpop").hide().find(".pop").attr("class", "pop").find("li").removeClass("show");
        return false;
    });
    $(".layerpop .pop .btn_move").click(function (e) {
        e.preventDefault();
        var sleng = $(".layerpop .pop > div." + thumb + " ul:eq(" + pidx + ") li").length - 1;
        if ($(this).hasClass("prev")) {
            tidx = tidx == 0 ? sleng : tidx - 1;
        } else {
            tidx = tidx == sleng ? 0 : tidx + 1;
        }
        if ($(".layerpop .pop > div." + thumb + " ul:eq(" + pidx + ") li:eq(" + tidx + ")").is(":empty")) {
            $(".layerpop .pop > div." + thumb + " ul:eq(" + pidx + ") li:eq(" + tidx + ")").html("<img src='http://image.cabal.co.kr/Intro/170705_intro/images/img_" + thumb + "_" + (pidx + 1) + "-" + (tidx + 1) + ext + "' alt =''>");
        }
        $(".layerpop  .pop > div." + thumb + " ul:eq(" + pidx + ") li:eq(" + tidx + ")").addClass("show").siblings().removeClass("show");
    });
}