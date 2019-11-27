$(function(){
	//swiper
    var swiper = new Swiper('.swiper-container',{
      pagination:{
      	el: '.swiper-pagination',
		clickable: true
      },
	  navigation:{
		nextEl: '.swiper-button-next',
		prevEl: '.swiper-button-prev',
      }
    });
	
	resize();
	$(window).resize(function(){
		resize();
	});
	
	//cbt 참여 신청 팝업
	$(".wrap .btn_cbt").click(function(){
		$("html, body").scrollTop(0);
		$(".pop_cbt").fadeIn("fast");
	});
	
	//팝업 닫기
	$(".pop_cbt .btn_close").click(function(){
		$(".pop_cbt").fadeOut("fast");
		$(".check_list li label").removeClass("checked");
		return false;
	});
	$(".wrap .btn_confirm, .pop_cbt .btn_close").click(function(){
		$(".agree_wrap, .pop_agree").hide();
		return false;
	});
	
	//휴대폰 번호 input focus
	$(".phone input[type=text]").bind("focus", function(){
		$(".phone label").hide();
		return false;
	}).bind("blur", function(){
		if(this.value !== ""){
			$(".phone label").hide();
		}else{
			$(".phone label").show();
		}
		return false;
	}); 
	
	//동의하기 check
	$(".check_list li label").click(function(){
		if(!($(this).hasClass("checked"))){
			$(this).addClass("checked");
			$(this).prev("input[type=checkbox]").prop("checked","checked");
		}else{
			$(this).removeClass("checked");
			$(this).prev("input[type=checkbox]").prop("checked","");
		}
		return false;
	});

	//자세히보기 팝업
	$(".check_list li").each(function(i){
		$(this).find(">button").click(function(){
			$(".agree_wrap, .pop_agree:eq("+i+")").show();
			
			return false;
		});
	});
});

var section1 = $(".section1").height();
var popHeight = $(".pop_apply").height();
var docHeight = $(window).height();

function resize(){
	section1 = $(".section1").height();
	popHeight = $(".pop_apply").height();
	docHeight = $(document).height();
	$(".pop_apply").css("top",(section1-popHeight)/2);
	$(".agree_wrap").css({
		"height": docHeight,
		"margin-top": -(docHeight/2)
	
	})
}