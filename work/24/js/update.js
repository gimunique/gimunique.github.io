"use strict";

$(window).on({
    beforeunload: function () {
        $(window).scrollTop(0);
    },
    load: function () {
        var _getSectionOffsetTop = getSectionOffsetTop();
        var _isIE = isIE();

        // window load event
        (function setLoadMotionEvent() {
            $(".wrap").addClass("load");

            if ($(".wrap").hasClass("load") === true) {
                gsap.to(".wrap .shadow", {duration: 1.95, opacity: 0, display: "none", ease: "none"});
                gsap.fromTo(".btn_float", {opacity: 0}, {duration: 1.95, opacity: 1, scale: 1, ease: "sine.in"});
                gsap.to(".wrap .scroll", {duration: 0.45, opacity: 1, ease: "circ.in"});

                setTimeout(function () {
                    $(".wrap .menu_wrap").addClass("active");

                    // 유튜브 IE10 이상 지원
                    if (_isIE > 9 || _isIE === false) {
                        $(".update1 .video_wrap .video").append("<iframe id='ytplayer' type='text/html' width='516' height='290.25' src='https://www.youtube.com/embed/dIdAfXhxCT0' frameborder='0' allowfullscreen>");
                    } else {
                        $(".update1 .video_wrap .video").append("<p>영상은 <span>Internet Explorer 10</span> 이상 부터 지원 됩니다.</p>");
                    }
                }, 2350);
            }
        }());
        
        // main motion event
        (function setMainMotionEvent() {
            // blood particle
            for (var i = 0; i < 10; i++) {
                var _leftPosition1 = random(40, 60).toFixed(1);
                var _leftPosition2 = random(15, 65).toFixed(1);
                var _size1 = random(1, 8);
                var _size2 = random(2, 5);
                var _speed = random(3.5, 6.5);

                $(".skull_wrap .bg_blood").append("<span class='blood1' style='left:" + _leftPosition1 + "%;width:" + parseInt(_size1) + "px;height:" + parseInt(_size1) + "px;animation-duration:" + _speed + "s;animation-delay:" + (parseInt(_size1) + 0.15) + "s;'></span>");
                $(".skull_wrap .bg_blood").append("<span class='blood2' style='left:" + _leftPosition2 + "%;width:" + parseInt(_size2) + "px;height:" + parseInt(_size2) + "px;animation-duration:" + _speed + "s;animation-delay:" + (parseInt(_size1) - 0.15) + "s;'></span>");
            };
        }());

        // button top click event
        (function setBtnTopEvent() {
            $(".wrap .btn_top").on("click", function () {
                var _speed = 0.65;
                var _ease = "circ.out";
    
                gsap.to("html, body", {duration: _speed, scrollTo: {y: 0}, ease: _ease});
            });
        }());
        
        // update menu event
        (function setUpdateMenuEvent() {
            // update menu button
            $(".menu_wrap .btn_menu").on("click", function () {
                $(this).parent(".menu_wrap").toggleClass("active");
            });
            
            // update menu click event
            $(".update_menu li").each(function (i) {
                $(this).find(">button").on("click", function () {
                    var _modifyPosition = 45;
                    var _speed = 0.65;
                    var _ease = "circ.out";
    
                    gsap.to("html, body", {duration: _speed, scrollTo: {y: _getSectionOffsetTop[i+1] - _modifyPosition}, ease: _ease});
                });
            });
        }());
        
        // upadate 01 >>> slick slide
        (function setSlickSlide() {
            // 전체 페이지
            $(".update1 .class_list").slick({
                fade: true,
                dots: true,
                speed: 450,
                touchThreshold: 150
            });
    
            // 전용 무기
            $(".update1 .weapon_list").slick({
                dots: true,
                speed: 350,
                swipe: false
            }).on("beforeChange", function (event, slick, currentSlide, nextSlide) {
                $(".update1 .weapon_name li").eq(nextSlide).fadeIn("fast").siblings("li").fadeOut("fast");
            });
        }());

        // 레이어 팝업
        (function setLayerPopEvent() {
            var _fileName = "";
            var _listLength = 0;
            var _listIndex = 0;
            var _pop = $(".pop_wrap");

            $(".inside li").each(function (i) {
                $(this).find(">button").on("click", function () {
                    _fileName =  $(this).parents("ul")[0].className;
                    _listLength = $(this).parents("ul").children("li").length;
                    _listIndex = i + 1;

                    _pop.fadeIn("fast");
                    setLayerPopImageSrc();
                });
            }); 

            $(".monster li").each(function (i) {
                $(this).find(">button").on("click", function () {
                    _fileName =  $(this).parents("ul")[0].className;
                    _listLength = $(this).parents("ul").children("li").length;
                    _listIndex = i + 1;

                    _pop.fadeIn("fast");
                    setLayerPopImageSrc();
                });
            });  

            // 이전, 다음 버튼
            _pop.find(".btn_arrow").on("click", function () {
                if ($(this).hasClass("btn_prev")) {
                    _listIndex = _listIndex === 1 ? _listLength : _listIndex - 1;
                } else {
                    _listIndex = _listIndex === _listLength ? 1 : _listIndex + 1;
                }

                setLayerPopImageSrc();
            });

            // pop hide
            _pop.find(".dimmed, .btn_close").on("click", function () {
                _pop.fadeOut("fast");
            });

            // 팝업 이미지 경로 설정 및 img 태그 박기
            function setLayerPopImageSrc() {
                var _imgSrc = "http://image.cabal.co.kr/Intro/201202_update/images/img_";

                $(".pop_wrap .img_wrap").empty().append("<img src='" + _imgSrc + _fileName + _listIndex + ".jpg' alt=''>");
            }
        }());
    },
    scroll: function () {
        var _windowScrollTop = $(window).scrollTop();
        var _getSectionOffsetTop = getSectionOffsetTop();
        var _getArticleOffsetTop = getArticleOffsetTop();
        var _modifyPosition = 865;
        var _positionY = 0;
        
        // 각 section 마다 active class, menu active
        for (var i = 1; i < _getSectionOffsetTop.length; i++) {
            if (_windowScrollTop > _getSectionOffsetTop[i] - _modifyPosition) {
                $(".section").eq(i).addClass("active");
                $(".update_menu li").eq(i - 1).addClass("active").siblings("li").removeClass("active");
            }

            // section remove active
            if (_windowScrollTop > _getSectionOffsetTop[i]) {
                $(".section").eq(i + 1).removeClass("active");
            }

            // 메뉴 remove active
            if (_windowScrollTop < _getSectionOffsetTop[1] - _modifyPosition) {
                $(".section, .update_menu li").removeClass("active");
            }
        }

        // scroll, button top show/hide event
        if (_windowScrollTop > parseInt(_getSectionOffsetTop[1] / 3)) {
            $(".wrap .scroll").addClass("hide");
            $(".wrap .btn_top").removeClass("hide");
        } else {
            $(".wrap .scroll").removeClass("hide");
            $(".wrap .btn_top").addClass("hide");
        }

        // main soul 모션
        if (_windowScrollTop > 0 &&  _windowScrollTop < parseInt(_getSectionOffsetTop[1] / 1.5)) {
            _positionY -= (_windowScrollTop / 3.2).toFixed(0);
            
            gsap.to(".main .soul", {duration: 1, y: _positionY, ease: "sine.out"});
        } else if (_windowScrollTop === 0) {
            gsap.to(".main .soul", {duration: 1, y: _positionY, ease: "sine.out"});
        }
        
        ////////////////////////////////////////////////// update1 //////////////////////////////////////////////////
        if (_windowScrollTop > $(".update1 .class_wrap").offset().top - _modifyPosition) {
            $(".update1 .class_wrap").addClass("active");
        } else {
            $(".update1 .class_wrap").removeClass("active");
        }

        ////////////////////////////////////////////////// update2 //////////////////////////////////////////////////
        for (var i = 0; i < _getArticleOffsetTop.length; i++) {
            if (_windowScrollTop > _getArticleOffsetTop[i] - _modifyPosition) {
                $(".update2 article").eq(i).addClass("active");
            }
            
            // article remove active
            if (_windowScrollTop < _getArticleOffsetTop[i + 1]) {
                $(".update2 article").eq(i + 1).removeClass("active");
            } 
        }
        
        // 첫번째 article remove active
        if (_windowScrollTop < _getArticleOffsetTop[0] - _modifyPosition) {
            $(".update2 article").eq(0).removeClass("active");
        }
        ////////////////////////////////////////////////// update3 //////////////////////////////////////////////////
        if (_windowScrollTop > $(".update3 dl").offset().top - (_modifyPosition + 85)) {
            $(".update3 dl, .update3 strong").addClass("active");
        } else {
            $(".update3 dl, .update3 strong").removeClass("active");
        }
    }
});

// section offset top
function getSectionOffsetTop() {
    var _sectionOffsetTopArr = [];

    $(".wrap .section").each(function (i) {
        _sectionOffsetTopArr.push(parseInt($(".wrap section").eq(i).offset().top));
    });
    return _sectionOffsetTopArr;
}

// update2 article offset top
function getArticleOffsetTop() {
    var _articleOffsetTopArr = [];

    $(".update2 article").each(function (i) {
        _articleOffsetTopArr.push(parseInt($(".update2 article").eq(i).offset().top));
    });
    return _articleOffsetTopArr;
}

// particle random num
function random(min, max) {
    return min + Math.random() * (max - min);
}

// is IE
function isIE() {
    var _userAgent = navigator.userAgent;
    var _isIE = _userAgent.toLowerCase().indexOf("msie") !== -1 ? parseInt(_userAgent.toLowerCase().split("msie")[1]) : false;

    return _isIE;
};