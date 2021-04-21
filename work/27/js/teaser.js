"use strict";

$(window).on({
    beforeunload: function () {
        $(window).scrollTop(0);
    },
    load: function () {
        var _getWindowSize = getWindowSize();
        var _isIE = isIE();

        // ie object-fit bug
        if (_isIE !== false) {
            $(".bg_video").addClass("is_ie");
        }
        
        // 페이지 높이 설정
        $(".wrap .teaser").css({"height": _getWindowSize.height});

        // 타이틀 모션
        (function titleMotion() {
            gsap.to(".wrap .shadow", {duration: 1.25, opacity: 0, display: "none", ease: "none", delay: 0.85});

            var _tl = gsap.timeline({ defaults: {duration: 0.8, opacity: 1, ease: "expo.in"}});
            _tl.set(".text_bi .cabal", {y: -30, opacity: 0})
            .set(".text_bi .red", {rotateX: 90 + "deg", opacity: 0})
            .to(".text_bi .cabal", {duration: 0.75, y: 0, ease: "expo.out", delay: 1.35})
            .to(".text_red .r1", {height: 100 + "%"}, "-=0.8")
            .to(".text_red .r2", {width: 100 + "%"}, "-=0.6")
            .to(".text_red .r3", {height: 100 + "%"}, "-=0.6")
            .to(".text_red .r4", {height: 100 + "%"}, "-=0.8")
            .fromTo(".title_wrap p", {opacity: 0}, {duration: 0.95, ease: "power1.out"}, "+=0.15")
            .to(".text_bi .red", {duration: 0.405, rotateX: 0.001 + "deg", ease: "sine.out", delay: 1.35}, "-=1.7")
            .to(".text_red", {duration: 1.85, webkitFilter:"blur(" + 8 + "px)", opacity: 0, ease: "power4.in"}, "-=2.2");
        }());
        
        // 사운드 on/off
        (function soundMutedEvent() {
            var $btnSound = $(".btn_sound");
            $btnSound.on("click", function () {
                if ($btnSound.hasClass("mute_on") === false) {
                    $btnSound.addClass("mute_on");
                    $(".bg_video").prop("muted", false);
                } else {
                    $btnSound.removeClass("mute_on");
                    $(".bg_video").prop("muted", true);
                } 
            });
        }());
    },
    resize: function () {
        var _getWindowSize = getWindowSize();

        // 페이지 높이 - 반응형
        $(".wrap .teaser").css({"height": _getWindowSize.height});
    }
});

// window width/height
function getWindowSize () {
    var _width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    var _height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;

    return {
        width: _width,
        height: _height
    }
}

// IE check!
function isIE () {
    var _agent = navigator.userAgent.toLowerCase();
    var _isIE = (_agent.indexOf('trident') !== -1 || _agent.indexOf("msie") !== -1) ? parseInt(_agent.split("msie")[1]) : false;

    return _isIE;
};