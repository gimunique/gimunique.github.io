var winHeight = $(window).height();
var winScrollTop = $(window).scrollTop();

$(window).on({
    beforeunload: function () {
        $(this).scrollTop(0);
    },
    load: function () {
        // 비주얼 모션
        initMotion();

        // 주사위 이미지 data positon 초기값 설정
        $(".moving_dice").data("position", 0);
        // 배경 주사위 움직임
        window.requestAnimationFrame(initParallax);

        // 버튼 - 팝업 이름 지정
        $(".btn_how").data("popName", "pop1");
        $(".btn_list").data("popName", "pop2");
        // 팝업
        initLayerPopup(".btn_how");
        initLayerPopup(".btn_list");

        // 비주얼 모션
        function initMotion(){
            TweenMax.to($(".shadow"), 0.3, {opacity: 0, display: "none", ease: Linear.easeNone});

            // 주사위
            var diceTl = new TimelineMax(); 
            diceTl.fromTo($(".wrap .a_dice"), 0.8, {x: -1000, y: -1000}, {x: -380, y: -230, rotation: 720, opacity: 1, delay: 1.3, ease: Elastic.easeOut.config(1, 1)})
            .to($(".wrap .a_dice"), 1, {x: 300, y: -300, rotation: 360, ease: Elastic.easeOut.config(1, 0.5)}, "-=0.5")
            .to($(".wrap .a_dice"), 0.5, {x: 0, y: 0, rotation: -1080, ease: Elastic.easeOut.config(1, 1)}, "-=0.8");

            // 타이틀
            TweenMax.from($(".title_wrap"), 0.8, {y: -50, ease: Expo.easeOut});
            TweenMax.fromTo($(".h2_bg"), 0.2, {scale: 1.5},{scale: 1, opacity: 1, delay: 0.5, ease: Expo.easeOut});
            TweenMax.fromTo($(".h2_btm .b1"), 0.3, {x: -120, y: 100}, {x: 0, y: 0, opacity: 1, delay: 0.5, ease: Elastic.easeOut.config(1, 0.5)});
            TweenMax.fromTo($(".h2_btm .b2"), 0.3, {x: 120, y: 100}, {x: 0, y: 0, opacity: 1, delay: 0.5, ease: Elastic.easeOut.config(1, 0.5)});
            TweenMax.fromTo($(".title_wrap .date"), 0.3, {y: -15}, {y: 0, opacity: 1, delay: 0.6, ease: Expo.easeOut});
            
            var titleTl = new TimelineMax();
            titleTl.fromTo($(".h2_top .t1, .h2_top .t11"), 0.12, {y: -50}, {y: 0, opacity: 1, delay: 0.7, ease: Elastic.easeOut.config(1, 0.5)})
            .fromTo($(".h2_top .t2, .h2_top .t10"), 0.12, {y: -50}, {y: 0, opacity: 1, ease: Elastic.easeOut.config(1, 0.5)})
            .fromTo($(".h2_top .t3, .h2_top .t9"), 0.12, {y: -50}, {y: 0, opacity: 1, ease: Elastic.easeOut.config(1, 0.5)})
            .fromTo($(".h2_top .t4, .h2_top .t8"), 0.12, {y: -50}, {y: 0, opacity: 1, ease: Elastic.easeOut.config(1, 0.5)})
            .fromTo($(".h2_top .t5, .h2_top .t7"), 0.12, {y: -50}, {y: 0, opacity: 1, ease: Elastic.easeOut.config(1, 0.5)})
            .fromTo($(".h2_top .t6"), 0.12, {y: -50}, {y: 0, opacity: 1, ease: Elastic.easeOut.config(1, 0.5)});

            // 보드판
            var boardTl = new TimelineMax();
            boardTl.fromTo($(".board_wrap"), 1.2, {y: 1000}, {y: -350, ease: Expo.easeOut})
            .to($(".board_wrap"), 0.8, {y: 0, opacity: 1, ease: Elastic.easeOut.config(1, 0.5)}, "-=0.9")
            .fromTo($(".paper"), 0.4, {rotation: -4}, {rotation: 0, opacity: 1, ease: Linear.easeNone}, "-=0.5");

            TweenMax.to($(".current_position"), 0.4, {y: -8, repeat: -1, yoyo: true, ease: Circ.easeOut});
        }

        // 팝업 공통
        function initLayerPopup(btnClass) {
            var $btnClass = $(btnClass);
            var getPopName = $btnClass.data("popName");
            var $popWrap = ".pop_wrap";
            var $findPop = $($popWrap).find("." + getPopName);
            var $openPop = $findPop.selector;
            $btnClass.on({
                click: function () {
                    $("html, body").stop().animate({scrollTop: 500}, 250);
                    $($openPop + ", " + $popWrap).fadeIn("fast");
                }
            });

            // 팝업 닫기
            $(".btn_close, .dimmed").click(function () {
                $($openPop + ", " + $popWrap).fadeOut("fast");
            });
        }

        // 배경 주사위 페럴럭스
        function initParallax() {
            // 소수점 내림
            var position = Math.floor($(".moving_dice").data("position"));
            // position 값 갱신
            position += (-(winScrollTop / 2.5) - position) * 0.03; //곱하는 숫자가 클수록 결과값 높아짐, 폭이 큼, 부자연스러움
            // data값 및 translateY값 갱신
            $(".moving_dice").data("position", position).css("transform", "translateY(" + position + "px)");
            // 반복
            window.requestAnimationFrame(initParallax);
        }

        // ie9 이하 window.requestAnimationFrame 처리
        (function polyfill_rAF() {
            var lastTime = 0;
            var vendors = ['webkit', 'moz', 'ms', 'o'];
            for (var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
                window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
                window.cancelAnimationFrame =
                    window[vendors[x] + 'CancelAnimationFrame'] || window[vendors[x] + 'CancelRequestAnimationFrame'];
            }
            if (!window.requestAnimationFrame)
                window.requestAnimationFrame = function (callback, element) {
                    var currTime = new Date().getTime();
                    var timeToCall = Math.max(0, 16 - (currTime - lastTime));
                    var id = window.setTimeout(function () {
                            callback(currTime + timeToCall);
                        },
                        timeToCall);
                    lastTime = currTime + timeToCall;
                    return id;
                };
            if (!window.cancelAnimationFrame)
                window.cancelAnimationFrame = function (id) {
                    clearTimeout(id);
                };
        }());
    },
    resize: function () {
        winHeight = $(window).height();
    },
    scroll: function () {
        winScrollTop = $(window).scrollTop();
    }
});