
var SetValueInfo;

$(window).on({
    beforeunload : function(){
        $(this).scrollLeft(0);
    },
    load : function(){
        //공통 값 저장
        SetValueInfo = new function(){
            this.sectionWidth = $(".section").width(),
            this.sectionLength = $(".section").length;
        }

        //사이즈 셋팅
        initSizeSetting(); 

        //가로 스크롤 이벤트
        horizontalScrollingEvent();
        
        //비주얼 모션
        (function initMotion(){
            var Browser = navigator.userAgent;
            $(".wrap").addClass("load");
            TweenMax.to($(".shadow"), 1, {opacity:0, display:"none", ease:Linear.easeNone});
            TweenMax.fromTo($(".dungeon_info .item"), 1.8, {y:-8}, {y:8, repeat:-1, yoyo:true, ease:Sine.easeInOut});

            if(Browser.indexOf("MSIE 7") !== -1 || Browser.indexOf("MSIE 8") !== -1){
                $(".smoke").hide();
            }else{
                //메인 타이틀
                var mainTitleTl = new TimelineMax();
                mainTitleTl.fromTo($(".main_title h2 .m1, .main_title h2 .m2"), 1.2, {opacity:0, scaleX:1, scaleY:2}, {opacity:0.25, scaleX:1, scaleY:1, delay:0.15, ease:Power3.easeInOut})
                .to($(".main_title h2 .m1, .main_title h2 .m2"), 1.5, {opacity:1, ease:Sine.easeInOut}, "-=0.45");
                TweenMax.fromTo($(".main_title h2 .m3"), 1, {opacity:0}, {opacity:1, delay:0.5, ease:Sine.easeInOut});
                TweenMax.fromTo($(".main_title .sub_title"), 0.75, {y:20, opacity:0}, {y:0, opacity:1, delay:1.3, ease:Sine.easeInOut});
                TweenMax.fromTo($(".main_title .season"), 0.75, {y:-20, opacity:0}, {y:0, opacity:1, delay:1.3, ease:Sine.easeInOut});
                TweenMax.fromTo($(".main_title .date"), 1, {opacity:0}, {opacity:1, delay:1.8, ease:Sine.easeInOut});

                //메인 스모크
                var smokeTL = new TimelineMax({repeat:-1, repeatDelay:-2.5, yoyo:false});
                var smokePosition1 = [
                    {x:0, y:0, autoAlpha:0},
                    {x:100, y:-250, autoAlpha:1},
                    {x:200, y:-300, autoAlpha:0}
                ]
                var smokePosition2 = [
                    {x:0, y:0, autoAlpha:0},
                    {x:300, y:-450, autoAlpha:1},
                    {x:400, y:-500, autoAlpha:0}
                ]
                var smokePosition3 = [
                    {x:0, y:0, autoAlpha:0},
                    {x:50, y:-50, autoAlpha:1},
                    {x:100, y:-100, autoAlpha:0}
                ]
                smokeTL.to($(".smoke .s1"), 8.5, {bezier:{type:"soft", values:smokePosition1}})
                .to($(".smoke .s2"), 8.5, {bezier:{type:"soft", values:smokePosition2}}, "-=7.5")
                .to($(".smoke .s3"), 5.5, {bezier:{type:"soft", values:smokePosition3}}, "-=7.5");
            }
        }());
        
        //메인 메뉴 클릭 이동
        buttonClickScrollingPosition(".main_menu li");

        //네이게이션 클릭 이동
        buttonClickScrollingPosition(".nav li");

        //첫화면으로 클릭 이동
        buttonClickScrollingPosition(".btn_left");

        function buttonClickScrollingPosition(element){
            var arrSectionOffsetLeft =  getArrSectionOffsetLeft();
            var speed = 1200;
            var easing = "easeOutQuart";
            var $element = $(element);

            if($element.length === 1){
                $element.on("click", function(){
                    $("html, body").stop().animate({scrollLeft:arrSectionOffsetLeft[0]}, speed, easing);
                });              
            }
            if($element.length === 2){
                $element.find(">button").on("click", function(){
                    if($(this).parents("li").index() === 0){
                        $("html, body").stop().animate({scrollLeft:arrSectionOffsetLeft[1]}, speed, easing);
                    }else{
                        $("html, body").stop().animate({scrollLeft:arrSectionOffsetLeft[4]}, speed, easing);
                    }
                });             
            }
            if($element.length === 6){
                $element.each(function(i){
                    $(this).find(">button").click(function(){
                        $("html, body").stop().animate({scrollLeft:arrSectionOffsetLeft[i+1]}, speed, easing);
                    });
                });
            }
        }
        
        //던전 이미지 팝업
        $(".dungeon_img li").each(function(i){
            $(this).find(">button").click(function(){
                $(".pop_wrap").fadeIn("fast");
                $(".pop .dungeon").empty().append("<img src='./images/dungeon"+(i+1)+".jpg' alt=''>");
            });
        });
        $(".btn_close, .dimmed").click(function(){
            $(".pop_wrap").fadeOut("fast");
        });
    },
    resize : function(){
        initSizeSetting();
    },
    scroll : function(){
        var windowScrollLeft = $(window).scrollLeft();
        var arrSectionOffsetLeft =  getArrSectionOffsetLeft();  
       
        //백그라운드 확대, 축소, 패럴럭스
        parallaxObject(); 
        
        //메인메뉴 active
        if(windowScrollLeft >= arrSectionOffsetLeft[1]-(SetValueInfo.sectionWidth/3) && windowScrollLeft < arrSectionOffsetLeft[4]-(SetValueInfo.sectionWidth/3)){
            $(".main_menu .menu1").addClass("active").siblings("li").removeClass("active");
        }else if(windowScrollLeft >= arrSectionOffsetLeft[4]-(SetValueInfo.sectionWidth/3)){
            $(".main_menu .menu2").addClass("active").siblings("li").removeClass("active");
        }else{
            $(".main_menu li").removeClass("active");
        }
        
        //nav show/hide
        if(windowScrollLeft >= arrSectionOffsetLeft[1]-(SetValueInfo.sectionWidth/3)){
            $(".wrap .nav").fadeIn("fast");
        }else{
            $(".wrap .nav").fadeOut("fast");
        }

        //nav active
        for(var i=1; i<SetValueInfo.sectionLength; i++){          
            if(windowScrollLeft >= arrSectionOffsetLeft[i]-(SetValueInfo.sectionWidth/3)){
                $(".nav li:eq("+(i-1)+")").addClass("active").siblings("li").removeClass("active");
            }
        }
    }
});

//사이즈 셋팅
function initSizeSetting(){
    var windowWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    var windowHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;

    $(".wrap, .section").css({
        "height" : windowHeight
    });

    if(windowWidth > 1920){
        $(".section .bg").css({"margin-left" : -(windowWidth/2)}).addClass("cover");
        $(".wrap").css({
            "width" : windowWidth * SetValueInfo.sectionLength
        });
        $(".section").css({
            "width" : windowWidth
        });
        $(".section1 .main_title").css({"top" : windowWidth*0.11510416});
    }else{
        $(".section .bg").css({"margin-left" : -(SetValueInfo.sectionWidth/2)}).removeClass("cover");
        $(".wrap").css({
            "width" : SetValueInfo.sectionWidth * SetValueInfo.sectionLength
        });
        $(".section").css({
            "width" : SetValueInfo.sectionWidth
        });
        $(".section1 .main_title").css({"top" : "221px"});
    }
}

//section scrollLeft 배열 저장
function getArrSectionOffsetLeft(){
    var secitonOffsetLeftArray = [];
    for(var i=0; i<SetValueInfo.sectionLength; i++){
        //secitonOffsetLeftArray[i] = $(".section:eq("+i+")").offset().left;
        secitonOffsetLeftArray.push($(".section:eq("+i+")").offset().left); 
    }
    return secitonOffsetLeftArray;
}

//가로 스크롤 이벤트
function horizontalScrollingEvent(){
    var scrollLeftPosition = 0;
    $("html, body").on("mousewheel DOMMouseScroll", function(event){
        var windowWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
        var windowScrollLeft = $(window).scrollLeft();
        var speed = 800;
        var easing = "easeOutQuart";

        if(event.originalEvent.wheelDelta){
            delta = parseInt(event.originalEvent.wheelDelta)/Math.abs(parseInt(event.originalEvent.wheelDelta));
        } else if(event.originalEvent.detail){
            delta = -parseInt(event.originalEvent.detail)/Math.abs(parseInt(event.originalEvent.detail));
        } else if(event.originalEvent.deltaY){
            delta = -parseInt(event.originalEvent.deltaY)/Math.abs(parseInt(event.originalEvent.deltaY));
        }
        
        //scrollLeftPosition -= (delta * 80);
        scrollLeftPosition = windowScrollLeft - (delta * 400);
        
        // DOWN, go right
        if(delta < 0){ 
            if(windowWidth > 1920){
                if(scrollLeftPosition > (windowWidth * SetValueInfo.sectionLength) - windowWidth){
                    scrollLeftPosition = (windowWidth * SetValueInfo.sectionLength) - windowWidth;
                } 
            }else{
                if(scrollLeftPosition > (SetValueInfo.sectionWidth * SetValueInfo.sectionLength) - windowWidth){
                    scrollLeftPosition = (SetValueInfo.sectionWidth * SetValueInfo.sectionLength) - windowWidth;
                } 
            }
        }
        // UP, go left
        else if(delta > 0){ 
            if(scrollLeftPosition < 0){
                scrollLeftPosition = 0;
            }
        }
        
        $(this).stop().animate({scrollLeft:scrollLeftPosition}, speed, easing);
    });
}

//section별 X Position 반환
function getPositionValue(sectionOffsetLeft, windowScrollLeft){
    var XPositions = {XPos1 : 0, XPos2 : 0, XPos3 : 0};
    XPositions.XPos1 += (sectionOffsetLeft - windowScrollLeft)/10;
    XPositions.XPos2 += (sectionOffsetLeft - windowScrollLeft)/7.5;
    XPositions.XPos3 += (sectionOffsetLeft - windowScrollLeft)/5;
    return XPositions;
}

//백그라운드 확대, 축소, 패럴럭스
function parallaxObject(){
    var windowScrollLeft = $(window).scrollLeft();
    var arrSectionOffsetLeft =  getArrSectionOffsetLeft();    
    var bgScale = 0;
    var standardScale = 130;
    var limitScale = 100;
    var standardDivision = 60;
    var monsterOpacity = 0; 
    var XPositions = {};
    
    //reset position
    if(windowScrollLeft === 0){
        $(".section .monster, .section .dungeon_img li").css({"transform" : "translateX("+ 0 +"px)"});
    }
    
    //두번째 페이지 몬스터 투명도
    if(windowScrollLeft >= arrSectionOffsetLeft[0] && windowScrollLeft < arrSectionOffsetLeft[2]){     
        monsterOpacity -= -((windowScrollLeft/800).toFixed(2));
        monsterOpacity <= 1 ? $(".section2 .monster1").css({"opacity" : monsterOpacity}) : $(".section2 .monster1").css({"opacity" : 1});
    }
    
    //컨텐츠, 배경 스케일
    if(windowScrollLeft > arrSectionOffsetLeft[0] && windowScrollLeft <= arrSectionOffsetLeft[2]+(SetValueInfo.sectionWidth/3)){
        bgScale = standardScale - ((windowScrollLeft-arrSectionOffsetLeft[1])/standardDivision).toFixed(1);
        bgScale <= limitScale ? bgScale = limitScale : $(".section2 .bg").css({"background-size" :  bgScale + "% auto"});

        XPositions = getPositionValue(arrSectionOffsetLeft[1], windowScrollLeft);
        //$(".section2 .info_txt").css({"transform" : "translateX("+ xPos1 +"px)"});
        $(".section2 .monster1, .section2 .monster3").css({"transform" : "translateX("+ XPositions.XPos2 +"px)"}); 
        $(".section2 .monster2").css({"transform" : "translateX("+ XPositions.XPos3 +"px)"}); 
    }
    if(windowScrollLeft > arrSectionOffsetLeft[1] && windowScrollLeft <= arrSectionOffsetLeft[3]+(SetValueInfo.sectionWidth/3)){ 
        bgScale = standardScale - ((windowScrollLeft-arrSectionOffsetLeft[2])/standardDivision).toFixed(1);
        bgScale <= limitScale ? bgScale = limitScale : $(".section3 .bg").css({"background-size" :  bgScale + "% auto"});
        
        XPositions = getPositionValue(arrSectionOffsetLeft[2], windowScrollLeft);
        //$(".section3 .dungeon_info").css({"transform" : "translateX("+ XPositions.XPos1 +"px)"});
    }
    if(windowScrollLeft > arrSectionOffsetLeft[2] && windowScrollLeft <= arrSectionOffsetLeft[4]+(SetValueInfo.sectionWidth/3)){ 
        bgScale = standardScale - ((windowScrollLeft-arrSectionOffsetLeft[3])/standardDivision).toFixed(1);
        bgScale <= limitScale ? bgScale = limitScale : $(".section4 .bg").css({"background-size" :  bgScale + "% auto"});
        
        XPositions = getPositionValue(arrSectionOffsetLeft[3], windowScrollLeft);
        $(".section4 .dungeon1").css({"transform" : "translateX("+ XPositions.XPos1 +"px)"});
        $(".section4 .monster4").css({"transform" : "translateX("+ XPositions.XPos3 +"px)"});
    }
    if(windowScrollLeft > arrSectionOffsetLeft[3] && windowScrollLeft <= arrSectionOffsetLeft[5]+(SetValueInfo.sectionWidth/3)){ 
        bgScale = standardScale - ((windowScrollLeft-arrSectionOffsetLeft[4])/standardDivision).toFixed(1);
        bgScale <= limitScale ? bgScale = limitScale : $(".section5 .bg").css({"background-size" :  bgScale + "% auto"});

        XPositions = getPositionValue(arrSectionOffsetLeft[4], windowScrollLeft);
        $(".section5 .monster5").css({"transform" : "translateX("+ XPositions.XPos1 +"px)"});
    }
    if(windowScrollLeft > arrSectionOffsetLeft[4] && windowScrollLeft <= arrSectionOffsetLeft[6]+(SetValueInfo.sectionWidth/3)){ 
        bgScale = standardScale - ((windowScrollLeft-arrSectionOffsetLeft[5])/standardDivision).toFixed(1);
        bgScale <= limitScale ? bgScale = limitScale : $(".section6 .bg").css({"background-size" :  bgScale + "% auto"});

        XPositions = getPositionValue(arrSectionOffsetLeft[5], windowScrollLeft);
        $(".section6 .monster6").css({"transform" : "translateX("+ XPositions.XPos1 +"px)"});
        $(".section6 .monster7").css({"transform" : "translateX("+ XPositions.XPos3 +"px)"});
    }
    if(windowScrollLeft > arrSectionOffsetLeft[5]){ 
        bgScale = limitScale - ((windowScrollLeft-arrSectionOffsetLeft[6])/standardDivision).toFixed(1);
        bgScale <= limitScale ? bgScale = limitScale : $(".section7 .bg").css({"background-size" :  bgScale + "% auto"});

        XPositions = getPositionValue(arrSectionOffsetLeft[6], windowScrollLeft);
        $(".section7 .dungeon2").css({"transform" : "translateX("+ XPositions.XPos1 +"px)"});
        $(".section7 .monster8").css({"transform" : "translateX("+ XPositions.XPos3 +"px)"});
    }
}