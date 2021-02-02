$(function(){
	switch(pageName){
		//앱 소개
		case "appinfo":
			var sct = $(window).scrollTop();
			var winHeight = $(window).height();
			var winWidth = $(window).width();
			//앱 소개 클릭 시 페이지 이동
			var hash = location.hash;
			if(hash == "#about"){
				$("html,body").stop().animate({
					scrollTop: $(".container.info").offset().top
				}, 600);
			}
			//플로팅 배너
			var floatingTop = parseInt((winHeight - 340) / 2);
			$(".floating").css("top",floatingTop);
			if(winWidth<=1300){
				$(".floating").css({"right":"27px","margin-right":0});
			}else{
				$(".floating").css({"right":"50%","margin-right":"-614px"});
			}
			$(window).resize(function(){
					winHeight = $(window).height();
					winWidth = $(window).width();
					floatingTop = parseInt((winHeight - 340) / 2);
					$(".floating").css("top",floatingTop+sct);
					if(winWidth<=1280){
						$(".floating").css({"right":"27px","margin-right":0});
					}else{
						$(".floating").css({"right":"50%","margin-right":"-614px"});
					}
				})
				//휴대전화번호 입력 placeholder
			$("dl.form_num input[type=text]").keyup(function() {
				if(this.value.length > 0){
					$(this).prev("label").hide();
				}else{
					$(this).prev("label").show();
				}
			}).blur(function(){
				if(this.value.length == 0){
					$(this).prev("label").show();
				}
			});
			//핸드폰 이미지, 리뷰 롤링
			var mmChk = false,mrChk = false;
			var mobile_p = $(".content.info_4").offset().top;
			var review_p = $(".container.review").offset().top;
			$(window).scroll(function(){
				sct = $(window).scrollTop();
				if(sct >= Math.abs(mobile_p + 56 - winHeight) && sct < mobile_p + 544){
					if(!mmChk){
						mb.play();
						mmChk = true;
					}
				}else{
					mb.stop();
					mmChk = false;
				}
				if(sct >= Math.abs(review_p - winHeight) && sct < review_p + 680){
					if(!mrChk){
						rl.rollAuto();
						mrChk = true;
					}
				}else{
					rl.rollStop();
					mrChk = false;
				}
				$(".floating").stop().animate({top:sct+floatingTop}, 450);
			});
			$(".rolling_bg").hover(function(){
				mb.stop();
			}, function(){
				mb.play();
			});
			$(".rolling_area .rolling_nav li a").click(function(e){
				e.preventDefault();
				var idx = $(this).parent().index();
				if(!$(".rolling_img li").is(":animated") && idx != mb.onindex){
					$(this).parent().siblings().removeClass("on").end().addClass("on");
					mb.stop();
					if(idx > mb.onindex){
						mb.onindex = idx;
						mb.move();
					}else{
						mb.onindex = idx;
						mb.move(1);
					}
					mb.play();
				}
			});
			$(".rolling_area .move").click(function(e){
				e.preventDefault();
				if (!$(".rolling_img li").is(":animated")){
					mb.stop();
					if($(this).hasClass("next")){
						mb.onindex++;
						mb.foward();
						mb.move();
					}else{
						mb.onindex--;
						mb.reverse();
						mb.move(1);
					}
					mb.play();
				}
			});
			//리뷰 롤링
			$(".review_roll").hover(function(){
				rl.rollStop();
			}, function(){
				rl.rollAuto();
			});
			break;
		case "eventlist":
			$(".elist ul li.end a").click(function(e){
				e.preventDefault();
				window.alert("종료된 이벤트입니다.\n더욱 좋은 이벤트로 다시 찾아뵙겠습니다.\n감사합니다.");
			});
			break;
		case "information":
			var mapFrame = [
				"http://dna.daum.net/include/tools/routemap/map_view.php?width=887&height=482&latitude=37.49858680326591&longitude=127.02622272698105&contents=&zoom=3",
				"http://dna.daum.net/include/tools/routemap/map_view.php?width=887&height=482&latitude=37.56095233596868&longitude=126.98386481900687&contents=&zoom=3",
				"http://dna.daum.net/include/tools/routemap/map_view.php?width=887&height=482&latitude=37.5240596109631&longitude=127.02791495379459&contents=&zoom=3",
				"http://dna.daum.net/include/tools/routemap/map_view.php?width=887&height=482&latitude=37.527383698818056&longitude=126.86444653110769&contents=&zoom=3",
				"http://dna.daum.net/include/tools/routemap/map_view.php?width=887&height=482&latitude=37.44347530328527&longitude=126.70321438827831&contents=&zoom=3",
				"http://dna.daum.net/include/tools/routemap/map_view.php?width=887&height=482&latitude=37.65509521827334&longitude=127.05995768604737&contents=&zoom=3",
				"http://dna.daum.net/include/tools/routemap/map_view.php?width=887&height=482&latitude=37.555374792164386&longitude=126.9353644974656&contents=&zoom=3",
				"http://dna.daum.net/include/tools/routemap/map_view.php?width=887&height=482&latitude=37.540306441011374&longitude=127.12351050217846&contents=&zoom=3",
				"http://dna.daum.net/include/tools/routemap/map_view.php?width=887&height=482&latitude=37.483303315643745&longitude=126.90115002476567&contents=&zoom=3",
				"http://dna.daum.net/include/tools/routemap/map_view.php?width=887&height=482&latitude=37.49105887358146&longitude=126.72229433115535&contents=&zoom=3",
				"http://dna.daum.net/include/tools/routemap/map_view.php?width=887&height=482&latitude=37.58097861589464&longitude=127.04699203318967&contents=&zoom=3",
				"http://dna.daum.net/include/tools/routemap/map_view.php?width=887&height=482&latitude=37.656716026842666&longitude=126.77133821836311&contents=&zoom=3",
				"http://dna.daum.net/include/tools/routemap/map_view.php?width=887&height=482&latitude=37.26327717519259&longitude=127.03311694393672&contents=&zoom=3",
				"http://dna.daum.net/include/tools/routemap/map_view.php?width=887&height=482&latitude=37.52406856644877&longitude=126.92601111433086&contents=&zoom=3"
			];
			//지점 바꾸기
			$(".hlist li a").click(function(e) {
				e.preventDefault();
				var idx = $(this).parent("li").index();
				infoPop.branches = $(this).parent("li").attr("class");
				infoPop.bname = $(".branch .br_box:eq(" + idx + ") h3").text();
				var wrapClass = $(".information").attr("class").split("information ")[1];
				$(".information").removeClass(wrapClass).addClass(infoPop.branches);
				$(this).addClass("on").parent().siblings().find("a").removeClass("on");
				$(".branch .br_box:eq(" + idx + ")").addClass("on").siblings(".br_box").removeClass("on");
				if ($(".branch .br_box:eq(" + idx + ") .map iframe").attr("src").length < 1) {
					$(".branch .br_box:eq(" + idx + ") .map iframe").attr("src", mapFrame[idx]);
				};
				if ($(".branch .br_box:eq(" + idx + ") .hos_img").length > 0) {
					$(".branch .br_box:eq(" + idx + ") .hos_img li").each(function(i) {
						$(this).find("a").prepend("<img src='./images/" + infoPop.branches + "/img_small_" + (i + 1) + ".jpg'>");
					})
				}
			});

			//이미지 보기
			$(".hos_img li a").hover(function(){
				$(this).addClass("hover");
			}, function() {
				$(this).removeClass("hover");
			}).click(infoPop.popOpen);
			$(".popup .img_area .move").click(function(e){
				e.preventDefault();
				if($(this).hasClass("prev")){
					infoPop.preView();
				}else{
					infoPop.nextView();
				}
			});
			$(".popup").click(function(e){
				e.preventDefault();
				if(!$(event.target).parents().hasClass("img_area")){
					infoPop.popClose();
				}
			});
			//마우스휠로 팝업 이전, 다음 보기
			$(".popup").bind("mousewheel", function(event){
				event.preventDefault ? event.preventDefault() : event.returnValue = false;
				if(event.originalEvent.wheelDelta != 0){
					if(event.originalEvent.wheelDelta > 0){
						//이전 이미지 보기
						infoPop.preView();
					}else if(event.originalEvent.wheelDelta < 0){
						//다음 이미지 보기
						infoPop.nextView();
					}
				}
			});
			break;
	}
});

//앱소개 핸드폰 이미지 롤링
var mb = {
	onindex: 0,
	previndex: 0,
	width: 282,
	speed: 500,
	delay: 2500,
	term: "",
	len: 4,
	foward: function(){
		this.onindex = this.previndex == this.len - 1 ? 0 : this.previndex + 1;
	},
	reverse: function(){
		this.onindex = this.previndex == 0 ? this.len - 1 : this.previndex - 1;
	},
	move: function(dir){
		var direction;
		if(dir != 1){
			direction = this.width;
		}else{
			direction = -this.width;
		}
		$(".rolling_img li:eq(" + this.onindex + ")").stop().show().css("left", direction).animate({
			left: 0
		}, this.speed);
		$(".rolling_img li:eq(" + this.previndex + ")").stop().animate({
			left: -direction
		}, this.speed, function(){
			$(this).hide();
		});
		$(".rolling_area .rolling_nav li:eq(" + this.onindex + ")").addClass("on").siblings().removeClass("on");
		this.previndex = this.onindex;
	},
	play: function(){
		this.term = setInterval(function(){
			mb.foward();
			mb.move();
		}, this.delay);
	},
	stop: function(){
		clearInterval(this.term);
	}
};

//앱소개 리뷰 롤링
var rl = {
	rollterm: "",
	delay: 2500,
	rollspeed: 800,
	rolling: function(){
		var moveheight = $(".review_roll li:first").height() + 20;
		$(".review_roll li:eq(4)").show();
		$(".review_roll li:first").stop().animate({
			marginTop: -moveheight
		}, rl.rollspeed, function(){
			$(this).hide().css("margin-top", 0).appendTo($(".review_roll ul"));
		});
	},
	rollAuto: function(){
		this.rollterm = setInterval(rl.rolling, rl.delay);
	},
	rollStop: function(){
		clearInterval(this.rollterm);
	}
};

//피부과정보 팝업
var infoPop = {
	branches: "gangnam",
	bname: "강남점",
	index: 1,
	u_idx: 0,
	imgsrc: "./images/",
	imglength: 0,
	speed: 400,
	setting: function(){
		$(".popup .img_box img").attr("src", infoPop.imgsrc + infoPop.branches + "/img_big_" + infoPop.index + ".jpg");
		$(".popup .pop_title .count span").text(infoPop.index);
	},
	//팝업 오픈
	popOpen: function(){
		$(".popup").show();
		infoPop.index = $(this).parent("li").index() + 1;
		infoPop.imglength = $(this).parents("ul").find("li").length;
		$(".popup .pop_title .brname span").text(infoPop.bname);
		infoPop.setting();
		return false;
	},
	//팝업 닫기
	popClose: function(){
		$(".popup").hide();
		$(".popup .img_box img").attr("src", " ");
		return false;
	},
	//이전 이미지 보기
	preView: function(){
		infoPop.index != 1 ? infoPop.index = infoPop.index - 1 : infoPop.index = infoPop.imglength;
		infoPop.setting();
	},
	//다음 이미지 보기
	nextView: function(){
		infoPop.index != infoPop.imglength ? infoPop.index = infoPop.index + 1 : infoPop.index = 1;
		infoPop.setting();
	}
};

function fbs_click(width, height){
	event.stopPropagation();
	event.preventDefault();

	var leftPosition, topPosition;
	leftPosition = (window.screen.width / 2) - ((width / 2) + 10);
	topPosition = (window.screen.height / 2) - ((height / 2) + 50);
	var windowFeatures = "status=no,height=" + height + ",width=" + width + ",resizable=yes,left=" + leftPosition + ",top=" + topPosition + ",screenX=" + leftPosition + ",screenY=" + topPosition + ",toolbar=no,menubar=no,scrollbars=no,location=no,directories=no";
	var u = location.href;
	var t = document.title;
	window.open('http://www.facebook.com/sharer.php?u=' + encodeURIComponent(u) + '&t=' + encodeURIComponent(t), 'sharer', windowFeatures);
	return false;
}