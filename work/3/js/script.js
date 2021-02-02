$(function(){
	resize();
	$(window).load(function(){
		if(!($("html,body").is(":animated"))){
			$(".wrap .cover").fadeOut(400);
			$(".intro_menu li").addClass("ani");
			if(winWidth > 1400){
				$(".result_menu").css({"left":-((winWidth-rcWidth)/3),opacity:0});
			}
			setTimeout(function(){
				if(winWidth > 1400){
					$(".result_menu").stop().animate({left:0,opacity:1},450,"easeInOutQuint");
				}
			},100);
		}
	});
	$(window).resize(function(){
		resize();
	});
	//결과페이지-탭
	/*$(".tab_menu li").each(function(i){
		$(this).find(">a").click(function(e){
			e.preventDefault();
			$(".tab_menu li a, .tab").removeClass("on");
			$(this).addClass("on");
			$(".tab").eq(i).addClass("on");
			if($(".tab.on").hasClass("prokion")){
				$(".result_menu").addClass("prokion");
			}else{
				$(".result_menu").removeClass("prokion");
			}
		});
	});*/
	//도넛그래프
	circleGraph("graph_1",0,70,30);
	circleGraph("graph_2",0,50,50);
	circleGraph("graph_3",0,20,80);
	circleGraph("graph_4",0,70,30);
	circleGraph("graph_5",0,70,30);
	circleGraph("graph_6",100,0,0);
});
var winWidth = $(window).width(),
	winHeight = $(window).height(),
	rcWidth = $(".result .content").width();
function resize(){
	winWidth = $(window).width();
	winHeight = $(window).height();
	//1400초과result메뉴가로길이	
	if(winWidth <= 1400){
		$(".result").addClass("w_1400");
		$(".result_menu").css("width",100+"%");
	}else{
		$(".result").removeClass("w_1400");
		rcWidth = $(".result .content").width();
		$(".result_menu").css("width",winWidth-rcWidth);
	}
}
//도넛그래프
function circleGraph(id,firstNum,secNum,thirdNum){
	var g_reco = document.getElementById(id);
	if(g_reco){
		g_reco.width = 142;
		g_reco.height = 142;
		var cv;
		var center = 71;
		if(!g_reco.getContext){
			cv = window.G_vmlCanvasManager.initElement(g_reco).getContext("2d");
		}else{
			cv = g_reco.getContext("2d");
		}
		//두번째원
		cv.arc(center,center,center,0,2*Math.PI,false);
		cv.fillStyle = "#f54448";//두번째원색
		cv.fill();
		//두번째원
		if(secNum){
			var secondPer = (firstNum+secNum) / 100*360;
			cv.beginPath();
			cv.moveTo(center,center);
			cv.lineTo(center,0);
			cv.arc(center,center,center,-90*(Math.PI/180),(secondPer-90)*(Math.PI/180),false);
			cv.closePath();
			cv.fillStyle = "#2a6cda";
			cv.fill();
		}		
		//첫번째원(제일큰원)
		if(firstNum){
			var firstPer = firstNum / 100*360;
			cv.beginPath();
			cv.moveTo(center,center);
			cv.lineTo(center,0);			
			cv.arc(center,center,center,-90*(Math.PI/180),(firstPer-90)*(Math.PI/180),false);
			cv.closePath();
			cv.fillStyle = "#767676";//첫번째원색
			cv.fill();
		}
		//도넛모양만들기(안건드려도됨)
		cv.beginPath();
		cv.arc(center,center,55,0, 2*Math.PI,false);
		cv.fillStyle = "#292d38";
		cv.fill();
	}
}