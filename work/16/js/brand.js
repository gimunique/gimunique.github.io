$(function(){
	var c_func = new ContentSlide(".function");
	var c_ring = new ContentSlide(".ringstore");
	
	$(".gnb h1 a").click(mainPager);
	$(".gnb ul li a").click(gnbPager);
	$(".gnb .gnb_2 a").click(function(){
		$(".container_wrap").css({top:0});
		c_func.conNum = 0
		c_func.pagerOn();
		$(".on .page_1 .page_txt").css({top:0,opacity:1});
		$(".on .page_1 .page_img").css({top:0,opacity:1});
		c_func.conMove();
	});
	$(".gnb .gnb_3 a").click(function(){
		$(".container_wrap").css({top:0});
		c_ring.conNum = 0
		c_ring.pagerOn();
		$(".on .page_1 .page_txt").css({top:0,opacity:1});
		$(".on .page_1 .page_img").css({top:0,opacity:1});
		c_ring.conMove();
		c_ring.conMoveRing();
	});
	$(".gnb h1 a, .gnb li a").click(function(e){
		e.preventDefault();
	});
		
	$(".wrap, .content").css("height", conHeight + "px");
	$(window).resize(function(){
		conHeight = $(window).height() - 90;
		$(".wrap, .content").css("height", conHeight + "px");
		$(".function .container_wrap").css({
			"top":-(conHeight * c_func.conNum) + "px"
		});
		$(".ringstore .container_wrap").css({
			"top":-(conHeight * c_ring.conNum) + "px"
		});
	});
	
	$(".wrap").bind("mousewheel", function(event){
		event.preventDefault ? event.preventDefault() : event.returnValue = false;
		if (event.originalEvent.wheelDelta != 0){
			if(event.originalEvent.wheelDelta > 0){
				if(!($(".wrap, .container_wrap").is(":animated"))){
					wheel = false;
                    if($(".info").hasClass("on")){
                        gnbPager(0);
                    }
                    if($(".function").hasClass("on")) {
						if($(".func_page .p1 a").hasClass("on")){
                            gnbPager(1);
                        }
                    }
                    if($(".ringstore").hasClass("on")){
                        if($(".ring_page .p1 a").hasClass("on")){
                            var conHeight = $(window).height() - 90;
							$(".function .container_wrap").css({top:-conHeight * 5});
							c_func.conNum = 5; 
							gnbPager(2);
							c_func.conMove();
                        }
						c_func.pagerOn();
						$(".on .page_6 .page_txt").css({top:0,opacity:1});
						$(".on .page_6 .page_img").css({top:0,opacity:1});
                    }
                }
			}else if(event.originalEvent.wheelDelta < 0){
				if(!($(".wrap, .container_wrap").is(":animated"))){
					wheel = true;
                    if($(".main").hasClass("on")){
                        gnbPager(1);
                    }
                    if($(".info").hasClass("on")){
                        gnbPager(2);
						c_func.conMove();
						$(".container_wrap").css({top:0});
						c_func.conNum = 0
						c_func.pagerOn();
						$(".on .page_1 .page_txt").css({top:0,opacity:1});
						$(".on .page_1 .page_img").css({top:0,opacity:1});
                    }
                    if($(".function").hasClass("on")){
                        if($(".func_page .p6 a").hasClass("on")){
                            gnbPager(3);
                            c_ring.conMoveRing();
							$(".container_wrap").css({top:0});
							c_ring.conNum = 0
							c_ring.pagerOn();
							$(".on .page_1 .page_txt").css({top:0,opacity:1});
							$(".on .page_1 .page_img").css({top:0,opacity:1});
                        }
                    }
                }
			}
			if($(".function").hasClass("on")){
				c_func.move();
				c_func.conMove();
			}else if ($(".ringstore").hasClass("on")){
				c_ring.move();
				c_ring.conMoveRing();
			}
		}
	});
	
	$(".pager li a").click(function(e){
		e.preventDefault();
		var idx = $(this).parent().index();
		if($(".function").hasClass("on")){
			c_func.pagerClick(idx);
			c_func.conMove();
		} else{
			c_ring.pagerClick(idx);
			c_ring.conMoveRing();
		}
	});
	
	// 메인 배너 롤링
	if($(".main").length > 0){
		$(".banner_img").cycle({
			fx: 'fade',
			speed: 'slow',
			timeout: 2500,
			cleartype: false,
			pager: '.banner_nav'
		});
		$(".banner_img").mouseenter(function(){
			$(this).cycle('pause');
		});
		$(".banner_img").mouseleave(function(){
			$(this).cycle('resume');
		});
	}
})

var conHeight = $(window).height() - 90;
var contentNum = 0;
function ContentSlide(pageClass){	
	var speed = 650;
	var page = $(pageClass);
	this.conNum = 0;
	this.length = page.find(".content").length;
	this.move = function(){
		var conHeight = $(window).height() - 90;
		if(!($(".wrap, .container_wrap").is(":animated"))){
		  if(this.conNum < this.length -1 && wheel){
			  this.conNum ++;
		  }else if(this.conNum > 0 && !wheel){
			  this.conNum --;
		  }
		  $(".on .container_wrap").animate({top:-conHeight * this.conNum}, speed, "jswing");
		  this.pagerOn();
		}
	}
	this.pagerClick = function(idx){
		var conHeight = $(window).height() - 90;
		if(this.conNum != idx){
			this.conNum = idx;
		}
		$(".on .container_wrap").animate({top:-conHeight * this.conNum}, speed, "jswing");
		this.pagerOn();
	}
	this.pagerOn = function(){
		$(".on .pager li:not(:eq("+this.conNum+")) a").removeClass("on");
		$(".on .pager li:eq("+this.conNum+") a").addClass("on");
	}
	this.conMove = function(){
		var txtRols = 1000;
		var imgRols = 1200;
		var idx = this.conNum - 1;
		if(this.conNum != idx){
			$(".on .content:eq("+this.conNum+") .page_txt").stop().animate({top:0,opacity:1}, txtRols);
			$(".on .content:eq("+this.conNum+") .page_img").stop().animate({top:0,opacity:1}, imgRols);
			$(".on .content:not(:eq("+this.conNum+")) .page_txt").stop().animate({top:400,opacity:0}, txtRols);
			$(".on .content:not(:eq("+this.conNum+")) .page_img").stop().animate({top:200,opacity:0}, imgRols);
		}
	}
	this.conMoveRing = function(){
		var txtRols = 1000;
		var imgRols = 1200;
		var idx = this.conNum - 1;
		if(this.conNum != idx){
			$(".on .content:eq("+this.conNum+") .page_txt").stop().animate({top:0,opacity:1}, txtRols);
			$(".on .content:eq("+this.conNum+") .page_img").stop().animate({top:0,opacity:1}, imgRols);
			$(".on .content:not(:eq("+this.conNum+")) .page_txt").stop().animate({top:500,opacity:0}, txtRols);
			$(".on .content:not(:eq("+this.conNum+")) .page_img").stop().animate({top:300,opacity:0}, imgRols);
		}
	}
}

// 화면 전체 가로 배너
var bannerNum = 0;
var speed = 900;
var bannerlength = $(".wrap").length;
var rols = 400;

// 알람이 로고 롤링
function mainPager(){
	var bannerWidth = $(".wrap").width();
	var idx = 0;
	if(!($(".wrap").is(":animated"))){
		if(idx > bannerNum){
			$(".wrap:eq("+bannerNum+")").animate({left:-bannerWidth}, function(){
				$(this).hide();
			});
			$(".wrap").eq(idx).show().css("left",bannerWidth).animate({left:0});
		}else if (idx < bannerNum){
			$(".wrap:eq("+bannerNum+")").animate({left:bannerWidth}, function(){
				$(this).hide();
			});
			$(".wrap").eq(idx).show().css("left",-bannerWidth).animate({left:0});
		}else if(idx == bannerNum){
			return false;	
		}
	}
	bannerNum = idx;
	$(".gnb li a").removeClass("on");
	$(".wrap").removeClass("on");
	$(".main").addClass("on");
}

//GNB에 롤링
function gnbPager(num){
	var bannerWidth = $(".wrap").width();
	var idx = $(this).parent().index() + 1;
	if(idx == 0) {
		idx = num;
	}
	if(!($(".wrap").is(":animated"))){
		if(idx > bannerNum){
			$(".wrap:eq("+bannerNum+")").animate({left:-bannerWidth}, function(){
				$(this).hide();
			});
			$(".wrap").eq(idx).show().css("left",bannerWidth).animate({left:0});
		}else if (idx < bannerNum){
			$(".wrap:eq("+bannerNum+")").animate({left:bannerWidth}, function(){
				$(this).hide();
			});
			$(".wrap").eq(idx).show().css("left",-bannerWidth).animate({left:0});
		}else if(idx == bannerNum){
			return false;	
		}
		bannerNum = idx;
	}
	$(".wrap").removeClass("on");
	$(".wrap:eq("+bannerNum+")").addClass("on");
	$(".gnb li a").removeClass("on");
    if(bannerNum >0 ){
	   $(".gnb li a").eq(bannerNum - 1).addClass("on");
    }
}