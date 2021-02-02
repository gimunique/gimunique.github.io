/* 
 * 파일명: common.js
 * 설명: 공통 UI 스크립트
 * 작성자: EUGENE KIM
 * 최종수정일: 2020.10.26 
*/

/*
 * 예약어는 사용하지 않는다.
 * 되도록 전역 변수는 사용하지 않는다.
 * 지역 변수명: "_"로 시작(ex: _a) 
 * 생성자 함수: 파스칼 케이스(ex: AppleJuice)
 * 변수, 함수: 카멜 케이스(ex: appleJuice)
 * 상수(변하지 않는 값)은 영문 대문자 스네이크 표기법을 사용한다(ex: APPLE_JUICE)
*/

"use strict";

var UIObj = new SetDefaultUI();
var Controller = new ScrollMagic.Controller();
var pageName = UIObj.getPageName();

$(window).on({
    // pagehide: function () {
    //     $(this).scrollTop(0);
    // },
    // beforeunload: function () {
    //     $(this).scrollTop(0);
    // },
    load: function () {
        var _getWindowSize = UIObj.getWindowSize();
        var _windowScrollTop = UIObj.getWindowScrollTop();
        var _getSectionOffsetTop = UIObj.getSectionOffsetTop();
        var _isIE = UIObj.isIE();
        var _isMobile = UIObj.isMobile();

        // 공통 이벤트
        UIObj.init(_isIE, _isMobile);
        
        // window resize event
        UIObj.setWindowSizeEvent(_getWindowSize, _isMobile);
        
        // section add/remove class "active"
        UIObj.sectionScrollEvent(_windowScrollTop, _getSectionOffsetTop, _getWindowSize);

        // 특정 서브 페이지 이벤트 추가
        if (pageName === "company" || pageName === "recruit" || pageName === "contact") {
            // 탑버튼 show/hide
            UIObj.btnTopShowHide(_windowScrollTop, _getSectionOffsetTop);
        }
    },
    resize: function () {
        var _getWindowSize = UIObj.getWindowSize();
        var _isMobile = UIObj.isMobile();
        
        // window resize event
        UIObj.setWindowSizeEvent(_getWindowSize, _isMobile);
    },
    scroll: function () {
        var _getWindowSize = UIObj.getWindowSize();
        var _windowScrollTop = UIObj.getWindowScrollTop();
        var _getSectionOffsetTop = UIObj.getSectionOffsetTop();

        // section add/remove class "active"
        UIObj.sectionScrollEvent(_windowScrollTop, _getSectionOffsetTop, _getWindowSize);
        
        // 특정 서브 페이지 이벤트 추가
        if (pageName === "company" || pageName === "recruit" || pageName === "contact") {
            UIObj.subTitleScrollEvent(_windowScrollTop, _getSectionOffsetTop);

            // 탑버튼 show/hide
            UIObj.btnTopShowHide(_windowScrollTop, _getSectionOffsetTop);
        }
    },
    hashchange: function () {
        // UIObj.hashChangeEvent();
    }
});

function SetDefaultUI() {
    var _userAgent = navigator.userAgent;
    var _pcBreakPoint = 1200;
    var _mobileBreakPoint = 768;
    
    this.init = function (isIE, isMobile) {
        $(".wrap").addClass("load");
        
        // gnb menu toggle
        this.gnbMenuToggleEvent(".btn_menu", isIE);
        
        // footer select box toggle
        this.selectBoxEvent(".family_site button");
       
        // 문의하기 메뉴 해시 체인지
        // this.hashChangeEvent();

        // 페이지별 DEFAULT 이벤트 추가
        switch (pageName) {
            case "main":
                this.mainEvent();
                // console.log(pageName);
                break;
            case "company":
                this.companyEvent();
                // console.log(pageName);
                break;
            case "recruit":
                this.recruitEvent(isMobile);
                // console.log(pageName);
                break;
            case "contact":
                this.contactEvent(isIE);
                // console.log(pageName);
                break;
        }

        // 특정 서브 페이지 이벤트 추가
        if (pageName === "company" || pageName === "recruit" || pageName === "contact") {
            this.subTitleInitEvent();
            $(".header").addClass("chrome_hack");

            // 맨 위로 버튼 클릭
            this.btnTopEvent(".btn_top");
            
            // go recruit hover event
            this.goRecruitHoverEvent();
        } else {
            $(".header").addClass("absolute");
        }
    };

    this.getPageName = function () {
        var _pageName = $(".container").children()[0].className.split(" ")[0];
        return _pageName;
    };

    this.getWindowSize = function () {
        var _width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
        var _height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;

        return {
            width: _width,
            height: _height
        }
    };

    this.getWindowScrollTop = function () {
        var _windowScrollTop = $(window).scrollTop();
        return _windowScrollTop;
    };

    this.getSectionOffsetTop = function () {
        var _sectionOffsetTopArr = [];

        $(".wrap section").each(function (i) {
            _sectionOffsetTopArr.push(parseInt($(".wrap section").eq(i).offset().top));
        });
        return _sectionOffsetTopArr;
    };

    this.setWindowSizeEvent = function (getWindowSize, isMobile) {
        var _setCopyText = this.setCopyText();
        // var _fixedSize = this.sectionScrollFixedSize(getWindowSize);

        // menu hover
        this.gnbMenuHoverEvent();
        
        // footer text render
        if (getWindowSize.width < _mobileBreakPoint) {
            $(".footer .copy_wrap p").html(_setCopyText.arrMobileCopyText);
        } else {
            $(".footer .copy_wrap p").html(_setCopyText.arrPcCopyText);
        }

        // 화면 비율에 따른 첫번째 section active
        /* if (_fixedSize) {
            $("section").eq(1).addClass("active");
        } else {
            $("section").eq(1).removeClass("active");
        } */

        // 페이지별 SCROLL MAGIC 이벤트 추가 
        switch (pageName) {
            case "company":
                if (getWindowSize.width >= _mobileBreakPoint) { 
                    var _signature = new ScrollMagic.Scene({
                        triggerElement: ".company_signature",
                        triggerHook: 0,
                        offset: -150
                    })
                    .setClassToggle(".signature", "active")
                    .addTo(Controller)
                    // .addIndicators({name: "signature"});

                    var _subsidiary = new ScrollMagic.Scene({
                        triggerElement: ".company_subsidiary",
                        triggerHook: 0,
                        offset: -100
                    })
                    .setClassToggle(".company_subsidiary li", "active")
                    .addTo(Controller)
                    // .addIndicators({name: "subsidiary"});
                }
                break;
            case "recruit":
                if (getWindowSize.width >= _pcBreakPoint || isMobile === false) { 
                    var _eachLifeWrap = document.querySelectorAll(".life_content");
                    for (var i = 0; i < _eachLifeWrap.length; i++) {
                        var _lifeWrapMotion = new ScrollMagic.Scene({
                            triggerElement: _eachLifeWrap [i],
                            triggerHook: 0,
                            offset: -630
                        })
                        .setClassToggle(_eachLifeWrap[i], "active")
                        .addTo(Controller)
                        // .addIndicators({name: "lifeWrapMotion"});
                    }
                }
                break;
            case "contact":
                if (getWindowSize.width >= _mobileBreakPoint) {
                    var _customer = new ScrollMagic.Scene({
                        triggerElement: ".contact_customer",
                        triggerHook: 0,
                        offset: -150
                    })
                    .setClassToggle(".contact_customer ul", "active")
                    .addTo(Controller)
                    // .addIndicators({name: "customer"});
                }
                break;
        }
    };

    this.setCopyText = function () {
        var _arrCopyText = [
            "(주)이스트게임즈 대표이사 이형백",
            "서울시 서초구 반포대로 3 이스트빌딩",
            "사업자등록번호 214-88-80538",
            "통신판매업 신고번호 2015-서울서초-00698호",
            "전화 : 02 585 4263",
            "팩스 : 02 882 1177"
        ];
        var _arrPcCopyText = [];
        var _arrMobileCopyText = [];

        for (var i = 0; i < _arrCopyText.length; i++) {
            // pc
            i % 2 === 0 ? _arrPcCopyText.push(_arrCopyText[i] + " | ") : _arrPcCopyText.push(_arrCopyText[i] + "<br>");
            // mobile
            i === 4 ? _arrMobileCopyText.push(_arrCopyText[i] + " | ") : _arrMobileCopyText.push(_arrCopyText[i] + "<br>");
        }

        return {
            arrPcCopyText: _arrPcCopyText,
            arrMobileCopyText: _arrMobileCopyText
        }
    };

    this.btnTopShowHide = function (windowScrollTop, getSectionOffsetTop) {
        if (windowScrollTop > getSectionOffsetTop[1] / 2.5) {
            $(".go_top").addClass("active");
        } else {
            $(".go_top").removeClass("active");
        }
    };

    this.btnTopEvent = function (target) {
        var $target = $(target);
        var _speed = 350;
        $target.on("click", function () {
            $("html, body").stop().animate({
                scrollTop: 0
            }, _speed);
        });
    };

    this.goRecruitHoverEvent = function () {
        for (var i = 6; i > 0; i--) {
            $("<span class='deco" + ' ' + "deco" + i + "'></span>").insertAfter(".go_recruit .btn_apply");
        }

        $(".go_recruit").on("mouseover", function () {
            $(this).addClass("active");
        }).on("mouseout", function () {
            $(this).removeClass("active");
        });
    };

    this.isIE = function () {
        var _isIE = _userAgent.toLowerCase().indexOf("msie") !== -1 ? parseInt(_userAgent.toLowerCase().split("msie")[1]) : false;
        return _isIE;
    };

    this.isMobile = function () {
        var _isMobile = _userAgent.match(/iPhone|iPod|Android|Windows CE|BlackBerry|Symbian|Windows Phone|webOS|Opera Mini|Opera Mobi|POLARIS|IEMobile|lgtelecom|nokia|SonyEricsson/i) !== null || _userAgent.match(/LG|SAMSUNG|Samsung/) !== null;
        return _isMobile;
    };

    this.isLandScape = function () {
         // 모바일에서 가로일 때
        var _isLandScape = window.orientation === 90 || window.orientation === -90;
        return _isLandScape;
    };

    this.hashChangeEvent = function () {
        // 문의하기 메뉴 클릭 시
        if (pageName === "contact" && location.href.split("#").length > 1) {
            var _hashName = location.href.split("#")[1];
            var _hasDataSelector = $($("[data-hash =" + _hashName + "]")[0]);
            var _screenPosition = parseInt(_hasDataSelector.offset().top) + 1;
            var _speed = 350;
            $("html, body").scrollTop(_screenPosition);
            // $("html, body").stop().animate({scrollTop: _screenPosition}, _speed);

            // 해시태그를 가지고 있는데 다시 클릭 시
            $(".util2 a").on("click", function () {
                // $("html, body").scrollTop(_screenPosition);
                $("html, body").stop().animate({scrollTop: _screenPosition}, _speed);
            });
        }  
    };

    this.gnbMenuHoverEvent = function () {
        var _menu = $(".menu li");
        var _hoverLine = $(".under_line");
        var _ease = Power2.easeOut;
        var _speed = 0.4;
        var _defaultPosition = $(".menu").offset().left + ($(".menu").width() / 2) - 40;

        // default positon
        if (_menu.hasClass("active") === false) {
            // main page
            TweenMax.set(_hoverLine, {
                left: _defaultPosition,
                width: $(".menu li").eq(1).width()
            });
        } else {
            // other page
            TweenMax.set(_hoverLine, {
                left: $(".menu .active a").offset().left,
                width: $(".menu .active").width(),
                opacity: 1
            });
        }
            
        // when hover   
        _menu.mouseover(function () {
            TweenMax.to(_hoverLine, _speed, {
                left: $(this).children().offset().left,
                width: $(this).width(),
                opacity: 1,
                ease: _ease
            });
        }).mouseout(function () {
            if (_menu.hasClass("active") === false) {
                // main page
                TweenMax.to($(".under_line"), _speed, {
                    opacity: 0,
                    ease: _ease
                });
            } else {
                // other page
                TweenMax.to(_hoverLine, _speed, {
                    left: $(".menu .active a").offset().left,
                    width: $(".menu .active").width(),
                    opacity: 1,
                    ease: _ease
                });
            } 
        });
    };

    this.gnbMenuToggleEvent = function (target, isIE) {
        var $target = $(target);
        var _scrollbarWidth =  window.innerWidth - document.documentElement.clientWidth;
        
        $target.on("click", function () {
            $(this).toggleClass("active");
            
            if ($target.hasClass("active")) {
                $(this).next().addClass("active").children(".menu_side").scrollTop(0);

                if (isIE === 9 && isIE !== false) {
                    // ie9
                    addStyle();
                } else {
                    // 나머지 브라우저
                    setTimeout(function () {
                        addStyle();
                    }, 80); // 180
                }
            } else {
                $(this).next().removeClass("active");
                removeStyle();
            }
        });

        // gnb 배경, 메뉴 클릭 시 
        $(".dimmed, .menu_wrap .menu_side a").on("click", function () {
            $target.removeClass("active").next().removeClass("active");
            removeStyle();       
        });

        // body overflow hidden 시 스크롤바 width로 인한 화면 딸각거림 방지
        function addStyle() {
            $("body").addClass("scroll_hidden").css({"padding-right": _scrollbarWidth});
            $(".sub_title .bg, .sub_title .content").css({"left": -(_scrollbarWidth / 2)});
            $(".header .menu").css({
                "margin-right": _scrollbarWidth,
                "visibility": "hidden"
            });
        }
        
        function removeStyle() {
            $("body").removeClass("scroll_hidden").css({"padding-right": 0});
            $(".sub_title .bg, .sub_title .content").css({"left": 0});
            $(".header .menu").css({
                "margin-right": 0,
                "visibility": "visible"
            });
        }
    };

    this.selectBoxEvent = function (target) {
        var $target = $(target);
        var _speed = 300;

        $target.on("click", function (event) {
            $(this).toggleClass("active").next("ul").slideToggle(_speed);
        });
        $(document).on("click", function (event) {
            if ($(event.target).parents(".family_site").length !== 1) {
                $target.removeClass("active").next("ul").slideUp(_speed);
            }
        });
    };

    this.subTitleInitEvent = function () {
        var _speed = 0.75;
        var _delay = 0.35;
        var _ease = "power4.out";
        TweenMax.to($(".load .sub_title .bg"), _speed, {scale: 1, delay: _delay, ease: _ease});
        TweenMax.fromTo($(".load .sub_title h3"), _speed, {y: -50}, {y: 0, opacity: 1, delay: _delay, ease: _ease});
        TweenMax.fromTo($(".load .sub_title .additional_text"), _speed, {y: 50}, {y: 0, opacity: 1, delay: _delay, ease: _ease});
    };

    this.subTitleScrollEvent = function (windowScrollTop, getSectionOffsetTop) {
        var _isLandScape = this.isLandScape();
        var _textOpacity = 1;
        var _bgScale = 1;
        var _baseValue = 720;
        var _ease = Linear.easeNone;

        // mobile landscpae이 아닐때만 sub title 스크롤 애니메이션 실행
        if (_isLandScape === false) {      
            if (windowScrollTop > 0 && windowScrollTop < getSectionOffsetTop[1]) {
                _textOpacity += -((windowScrollTop / _baseValue).toFixed(2));
                TweenMax.to($(".sub_title .content span"), 0.03, {opacity: _textOpacity, ease: _ease});

                _bgScale -= -((windowScrollTop / (_baseValue * 5)).toFixed(2));
                TweenMax.to($(".sub_title .bg"), 0.03, {scale: _bgScale, ease: _ease});
            } else if (windowScrollTop === 0) {
                TweenMax.to($(".sub_title .content span"), {opacity: _textOpacity});
                TweenMax.to($(".sub_title .bg"), {scale: _bgScale});
            }
        } else {
            TweenMax.set($(".sub_title .content span"), {opacity: _textOpacity});
            TweenMax.set($(".sub_title .bg"), {scale: _bgScale});
        }     
    };

    this.sectionScrollFixedSize = function (getWindowSize) {
        //! 화면 비율 기준(window 높이에 따라 첫번째 class="section"에 active를 줄지 말지의 기준)
        var _fixedSize = getWindowSize.width * 0.75 < getWindowSize.height;
        return _fixedSize;
    };

    this.sectionScrollEvent = function (windowScrollTop, getSectionOffsetTop, getWindowSize) {
        var _basePosition;
        var _adjustValue = getWindowSize.height * 0.1;
        var _mainAdjustValue = getWindowSize.height * 0.8;
        var _otherAdjustValue = getWindowSize.height * 0.7;
        // var _fixedSize = this.sectionScrollFixedSize(getWindowSize);
        
        // section add/remove class active
        for (var i = 1; i < getSectionOffsetTop.length; i++) {
            if (pageName === "main") {
                _basePosition = getSectionOffsetTop[i] - _mainAdjustValue > 0 ? getSectionOffsetTop[i] - _mainAdjustValue : 0;
            } else {
                _basePosition = getSectionOffsetTop[i] - _otherAdjustValue > 0 ? getSectionOffsetTop[i] - _otherAdjustValue : 0;
            }

            // add active
            if (windowScrollTop >= _basePosition) {
                $("section").eq(i).addClass("active");
               
                //! 게임 4개 이하 시, if문 전체 주석 처리
                if (pageName === "main" && i === 2) {
                    setTimeout(function () {
                        $("section").eq(2).addClass("inactive");

                        // 메인 페이지 game slide play
                        $(".game_slide").slick("slickPlay");
                    }, 1090);
                }
            }

            // remove active
            if (i !== 1) {
                if (windowScrollTop < _basePosition - _adjustValue) {
                    $("section").eq(i).removeClass("active");
                }
            } else {
                if (windowScrollTop < _basePosition) { 
                    $("section").eq(1).removeClass("active");
                }
            }
        }
    };
    ////////////////////////////////////////////////// 페이지별 DEFAULT 이벤트 //////////////////////////////////////////////////
    // main
    this.mainEvent = function () {
        // main slide
        $(".main_slide").slick({
            dots: false,
            fade: true,
            speed: 850,
            autoplay: true,
            autoplaySpeed: 3000,
            touchThreshold: 150,
            touchMove: false
        }).on("beforeChange", function (event, slick, currentSlide, nextSlide) {
            // main slide paging number
            var _slideLength = $(".main_slide .slide").length;
            var _currentBannerCount = nextSlide + 1;
            $(".main_banner .paging").html(_currentBannerCount + " / " + _slideLength);
        });

        // main slide text motion
        TweenMax.fromTo($(".load .main h2"), 1, {y: -35}, {y: 0, opacity: 1, delay: 0.65, ease: "power4.out"});
        TweenMax.fromTo($(".load .main_banner article p"), 1, {y: 35}, {y: 0, opacity: 1, delay: 0.65, ease: "power4.out"});
        TweenMax.to($(".load .main_banner article a"), 1, {x: 0, opacity: 1, delay: 0.65, ease: "power4.out"});

        // game slide
        $(".game_slide").slick({
            slidesToShow: 4,
            slidesToScroll: 1,              // 4개 이상 시, 주석 풀기
            swipe: false,
            infinite: true,                 // 4개 이하 시, false로 변경
            speed: 850,
            autoplay: false,                // 고정 >>> 4개 이상일때는 (this.sectionScrollEvent내에서 애니메이션 이후, .slick("slickPlay") 해줌)
            autoplaySpeed: 3000,         
            touchThreshold: 150,
            touchMove: false,
            responsive: [{
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                    swipe: true,
                    infinite: true,
                    // autoplay: true,
                    touchMove: false
                }
            }]
        }).on("beforeChange", function (event, slick, currentSlide, nextSlide) {
            $(".game_slide").slick("slickPlay");
        }); // 4개 이하 시 주석 처리(beforeChange 부분)
    };

    // company
    this.companyEvent = function () {
        // 날짜 fixed
        var _historyYearFixed = new ScrollMagic.Scene({
            triggerElement: ".history_wrap",
            triggerHook: 0
        })
        .setClassToggle(".year_wrap", "fixed")
        .addTo(Controller)
        // .addIndicators({name: "historyYearFixed"});

        // fixed된 날짜 hide
        var _yearDisappear = new ScrollMagic.Scene({
            triggerElement: ".company_signature",
            offset: 225
        })
        .setClassToggle(".year_wrap", "blur")
        .addTo(Controller)
        // .addIndicators({name: "yearDisappear"});

        // 연혁별 날짜 변경
        var _eachHistoryContents = document.querySelectorAll(".history_content ul");
        for (var i = 0; i < _eachHistoryContents.length; i++) {
            var _HistorYearChange = new ScrollMagic.Scene({
                triggerElement: _eachHistoryContents[i],
                triggerHook: 0,
                offset: -265
            })
            .setClassToggle(_eachHistoryContents[i], "active")
            .on("enter leave", function (event) {
                $(".year").text($(".history_content ul.active").last().data('year'));
            })
            .addTo(Controller)
            // .addIndicators({name: "HistorYearChange"});
        }
    }

    // recruit
    this.recruitEvent = function (isMobile) {
        // job preview tab
        $(".interview_list li").each(function () {
            $(this).find(">button").on("click", function () {
                $(this).parent().toggleClass("active").siblings().removeClass("active");
                $(".active dl").scrollTop(0);
                $("html, body").scrollTop($(this).offset().top);
            });
        });
        
        // job preview scroll
        if (isMobile === false) {
            $(".interview_list .interview").mCustomScrollbar({
                scrollInertia: 850
            });
        } else {
            $(".interview_list .interview").mCustomScrollbar("destroy"); 
            $(".interview_list .interview div").css({"overflow-y": "scroll"});
        }
    };

    // contact
    this.contactEvent = function (isIE) {
        // 구글 지도 최적화(ie11 이상부터 렌더링 됨)
        if (isIE < 11 && isIE !== false) {
            $(".contact .map_wrap").remove();
        } else {
            $(".map_wrap").append("<iframe src='https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d3166.1494544314323!2d127.01008030555724!3d37.48079938730743!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x357ca110ba33adbd%3A0x74b320d6524b7c08!2zMzfCsDI4JzUxLjIiTiAxMjfCsDAwJzQ0LjUiRQ!5e0!3m2!1sko!2skr!4v1600416844148!5m2!1sko!2skr' width='100%' height='100%' frameborder='0' style='border:0' allowfullscreen='' aria-hidden='false' tabindex='0' title='이스트게임즈 찾아 오시는 길'></iframe>");
        }

        // 문의 유형 체크박스
        $(".check_wrap .check").each(function (index) {
            $(this).find(">label").on("click", function () {
                $(".check_wrap label").eq(index).addClass("active").next("input").attr("checked", true).parent("div").siblings("div").find(">label").removeClass("active").next("input").attr("checked", false);
            });
        });
    };
    ////////////////////////////////////////////////// 페이지별 DEFAULT 이벤트 //////////////////////////////////////////////////
}