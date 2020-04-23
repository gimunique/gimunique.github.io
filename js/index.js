$(document).ready(function(){
    //화면 처음 이미지 load
    /* var introImg = {
        imgInterval : 0,
        initIdx : -1,
        init : function(element){
            introImg.startInterval($(element), this.initIdx);
        },
        startInterval : function(moveElement, idx){
            this.imgInterval = setInterval(function(){
                idx++;
                if(idx >= moveElement.length){idx = 0;}
                moveElement.eq(idx).show().siblings(moveElement).hide();
            }, 80);  
        },
        stopInterval : function(){
            clearInterval(this.imgInterval);
            imgInterval = 0;
            $("html, body").scrollTop(0);
            $(".load_img").stop().animate({opacity:0}, 600, function(){
                $(this).remove();
            });
        }
    }
    introImg.init(".load_img img");
    setTimeout(function(){
        introImg.stopInterval();
    }, 2400); */

    //하위버전(ie8이하) 화면 높이값 가져오기
    if(Browser.indexOf("MSIE 7") !== -1 || Browser.indexOf("MSIE 8") !== -1){
        var winHeight = window.innerHeight|| document.documentElement.clientHeight || document.body.clientHeight;
        $(".main").css("height", winHeight);
    }
});

$(window).on({
    load : function(){
        TweenMax.to($(".scroll .img"), 0.4, {y : -10, ease : Circ.easeOut, repeat : -1, yoyo : true});
        setInterval(setTime, 1000);
        resize();
        scrollEvent();
        navEvent(".pg_nav li");
        navEvent(".gnb li");
        showHideBanner(".banner_wrap");
        loadImgInterval();
        
        //화면 처음 이미지 load
        function loadImgInterval(){
            var speed = 80;
            var num = 1;
            var maxNum = 10;
            var intervalId = setInterval(function(){
                var loadImgSrc = "https://gimunique.github.io/images/load" + num +".png"
                $(".load_img").attr("src", loadImgSrc);
                num >= maxNum ? num = 1 : num++;
            }, speed);
            setTimeout(function(){
                clearInterval(intervalId);
                $("html, body").scrollTop(0);
                $(".load_wrap").stop().animate({opacity:0}, speed*9, function(){
                    $(this).remove();
                });
            }, speed*30);
        }

        //gnb 버튼 클릭시 이벤트
        $(".btn_gnb").bind("click", function(){
            $(this).add(".gnb").toggleClass("active");
            if(Browser.indexOf("MSIE 7") !== -1){
                $(".gnb.active").length == 1 ? $(".pg_nav").hide() : $(".pg_nav").show();
            }
        });
            
        //오른쪽 상단 레이어팝업 클릭시 이벤트
        $(".btn_lp li").each(function(i){
            $(this).find(">button").bind("click", function(){
                $(".main .lp:eq("+i+")").show().siblings(".lp").hide();
            });
        });
        $(".lp .btn_close").bind("click", function(){$(this).parent("div").hide()});

        var ajax = getAjaxPortfolioInfos();
        ajax.success(function(data){
            if(data != null && data.length > 0){
                //PortfolioInfos = data;
                PortfolioInfos = data.sort(function(currObj, nextObj){
                    return currObj.seq < nextObj.seq ? -1 : currObj.seq > nextObj.seq ? 1 : 0;
                });

                if(PortfolioInfos.length % PageSize === 0){
                    TotalPageCount = Math.floor(PortfolioInfos.length / PageSize);
                }else{
                    TotalPageCount = Math.floor(PortfolioInfos.length / PageSize) + 1;
                }
                $(".btn_more .total").text(TotalPageCount);
            }else{
                alert("포트폴리오 정보 없음");
            }
            initPortfolioInfos();
        });

        //더보기 버튼 클릭
        $(".btn_more").bind("click", function(){
            if(CurrentPageNumber === TotalPageCount){
                alert("마지막 페이지 입니다.");
            }else{
                initPortfolioInfos();
            }
        });
        
        //포트폴리오 정보 조회 및 화면 그리기
        function initPortfolioInfos(){
            //현재 페이지 번호 설정
            CurrentPageNumber = (CurrentPageNumber + 1);
            
            var currentPortfolioInfos = getPortfolioInfos(CurrentPageNumber, PageSize, PortfolioInfos);
            paintPortfolioInfos(currentPortfolioInfos);

            //더보기에 노출 될 현재 페이지 번호와 전체 페이지 갯수 처리
            $(".btn_more .current").text(CurrentPageNumber);
        }

        //포트폴리오 정보 가져오기
        function getPortfolioInfos(currentPageNumber, pageSize, portfolioInfos){
            var currentPortfolioInfos = portfolioInfos.filter(function(element){
                return element.seq > ((currentPageNumber - 1) * pageSize) &&  
                element.seq <= (currentPageNumber * pageSize);
            });
            return currentPortfolioInfos;
        }

        //포트폴리오 정보 화면에 그리기
        function paintPortfolioInfos(portfolioInfos){
            $.each(portfolioInfos, function(index, portfolioInfo){
                $(".pf_list").append(
                    (portfolioInfo.seq % 3 == 2 ? "<li class='mid'>" : "<li>") + 
                    "<a href='./work.html?seq=" + portfolioInfo.seq + "' target='_blank'>" +
                    "<img src='" + portfolioInfo.imageUrl + "' alt='" + portfolioInfo.title + "'>" + 
                    "<div class='hover'><span class='align title'><strong>" + portfolioInfo.title + "</strong><p>" + portfolioInfo.subject + "</p></span><span class='align ah'></span></div>" + 
                    "</a></li>"
                );
            });
        }

        //하단(Contact) 클릭 배너
        function showHideBanner(element){
            var $element = $(element);
            var $nav = $element.find(".nav li");
            var $banner = $element.find(".banner li");
            var $btn = $element.find(".nav_wrap .btn");
            var bannerLength = $banner.length;
            var activeIdx = $(".banner li.active").index();
            $nav.children("button").bind("click", function(){
                var clickIdx = $(this).parent("li").index();
                $(this).parent("li").addClass("active").siblings("li").removeClass("active");
                $banner.eq(clickIdx).addClass("active").siblings("li").removeClass("active");
            });
            $btn.bind("click", function(){
                if($(this).hasClass("btn_prev")){
                    activeIdx = activeIdx == 0 ?  bannerLength-1 : activeIdx-1;
                    $(".banner li:eq("+activeIdx+"), .nav li:eq("+activeIdx+")").addClass("active").siblings("li").removeClass("active");
                }else{
                    activeIdx = activeIdx == bannerLength-1 ?  0 : activeIdx+1;
                    $(".banner li:eq("+activeIdx+"), .nav li:eq("+activeIdx+")").addClass("active").siblings("li").removeClass("active");
                } 
            });
        }

        //페이지 네비게이션 클릭 이벤트
        function navEvent(element){
            $(element).find(">button").click(function(){
                var speed = 500;
                var ease = "easeInOutCirc";
                var navLength = $(element).length;    
                var navIdx = $(this).parent("li").index();
                var $section = $(".section");
                if(navLength < 4){
                    $(".btn_gnb, .gnb").removeClass("active");
                    $("html, body").scrollTop($section.eq(navIdx+1).offset().top+90);
                }else{
                    if(navIdx == 0){
                        $("html, body").stop().animate({scrollTop:$section.eq(navIdx).offset().top},speed,ease);
                    }else{
                        $("html, body").stop().animate({scrollTop:$section.eq(navIdx).offset().top+90},speed,ease);
                    }
                }
            });
        }

        //시계 팝업
        function setTime(){
            var getDate = new Date();
            var getHour = getDate.getHours();
            var getMinute = getDate.getMinutes();
            var getSecond = getDate.getSeconds();
            var setHour;
            var setMinute;
            var setSecond;
            getHour >= 10 ? setHour = getHour : setHour = "0"+getHour;
            getMinute >= 10 ? setMinute = getMinute : setMinute = "0"+getMinute;
            getSecond >= 10 ? setSecond = getSecond : setSecond = "0"+getSecond;
            $(".lp_clock .hour").text(setHour);
            $(".lp_clock .min").text(setMinute);
            $(".lp_clock .sec").text(setSecond);
        }
    },
    resize : function(){
        resize();
    },
    scroll : function(){
        scrollEvent();
    }
});

//화면크기에 따른 컨텐츠 사이즈 조정 함수
function resize(){
    var winWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    var arrSkillHeight = [];
    $(".ab_list .skill").each(function(i){
        arrSkillHeight.push($(".ab_list .skill").eq(i).height());
    });
    var getMaxHeight = Math.max.apply(null, arrSkillHeight)
    if(winWidth < 480){
        $(".ab_list > li").css("min-height", getMaxHeight+20);
    }else if(winWidth >= 480 && winWidth < 1200){
        $(".ab_list > li").css("min-height", getMaxHeight+49);
    }else{
        $(".ab_list > li").css("min-height", "");
    }
}

//스크롤 위치에 따른 발생 이벤트 함수
function scrollEvent(){
    var sct = $(window).scrollTop();
    var $section = $(".wrap > .section");
    for(var i=0; i<$section.length; i++){
        if(sct >= $section.eq(i).offset().top-220){
            $(".pg_nav li").eq(i).addClass("active").siblings("li").removeClass("active");
        }
    }  
}