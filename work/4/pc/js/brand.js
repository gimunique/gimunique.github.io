'use strict';

var windowWidth = 0;
var windowHeight = 0;
var isSliding = false;

// 초기화
var initPage = function () {
	$('#page_wrap .page_1').css({
		'top': 0 + 'px'
	});
	pageResize();
	setPageAction();
};

// 페이지 사이즈 변경
var pageResize = function () {
	var pageWrap = $('#page_wrap');
	var windowWidth = $(window).width();
	var windowHeight = $(window).height();
	if (windowWidth < 1170) {
		windowWidth = 1170;
	}
	pageWrap.css({
		'width': windowWidth + "px",
		'height': windowHeight + "px"
	}).find('div[class*="page_"]').css({
		'width': pageWrap.width() + "px",
		'height': windowHeight + "px"
	});
	pageWrap.find('.fixed_content').css({
		'height': windowHeight + "px"
	});
};

// 페이지 동작
var setPageAction = function () {
	var pageList = $('#page_wrap div[class*="page_"]');
	var screenList = $('.img_phone .screen_wrap div[class*="screen_"]');
	var mainCharacters = $('.img_main_character > div');
	var pageListLength = pageList.length;
	var nowPageIndex = 1;
	var nextPageIndex = 0;
	var vector = 0;
	var SLIDING_SPEED = 800;
	var POP_DELAY = SLIDING_SPEED - 300;
	var POP_SPEED = 500;

	// 마우스 휠 체크
	var wheelCheck = function (event) {
		if (!isSliding) {
			var delta = 0;
			isSliding = true;
			if (!event) {
				//IE 구버전
				event = window.event;
			}
			if (event.wheelDelta) {
				delta = event.wheelDelta / 120;
			} else if (event.detail) {
				//파이어폭스
				delta = -event.detail / 3;
			}
			if (delta) {
				if (delta < 0) {
					//page down
					nextPageIndex = nowPageIndex + 1;
					if (nextPageIndex > pageListLength) {
						nextPageIndex = 1;
					}
					vector = -1;
				} else {
					//page up
					nextPageIndex = nowPageIndex - 1;
					if (nextPageIndex < 1) {
						nextPageIndex = 4;
					}
					vector = 1;
				}
			}
			startAction(nextPageIndex, vector);
		}
	};
	if (window.addEventListener) {
		window.addEventListener('DOMMouseScroll', wheelCheck, false);
	}
	window.onmousewheel = document.onmousewheel = wheelCheck;

	// 키보드 체크
	$(document).on('keydown', function (event) {
		if (!isSliding) {
			var keyCode = event.keyCode || event.which,
				KEY_UP = 40,
				KEY_DOWN = 38;
			isSliding = true;
			if (keyCode === KEY_UP) {
				nextPageIndex = nowPageIndex + 1;
				if (nextPageIndex > pageListLength) {
					nextPageIndex = 1;
				}
				vector = -1;
				startAction(nextPageIndex, vector);
			} else if (keyCode === KEY_DOWN) {
				nextPageIndex = nowPageIndex - 1;
				if (nextPageIndex < 1) {
					nextPageIndex = 4;
				}
				vector = 1;
				startAction(nextPageIndex, vector);
			}
		}
	});

	// 페이지 슬라이딩 동작
	var pageSliding = function (nextPageIndex, vector) {
		var slidingHeight = windowHeight * vector,
			pagingButton = $('.paging').find('a');
		//페이징 버튼 변환
		pagingButton.removeClass('on');
		$(pagingButton[nextPageIndex - 1]).addClass('on');
		//전체 화면 전환
		$(pageList[nowPageIndex - 1]).animate({
			'top': slidingHeight + 'px'
		}, SLIDING_SPEED, function () {
			$(this).hide();
		});
		$(pageList[nextPageIndex - 1]).css({
			'top': -slidingHeight + 'px'
		}).show().animate({
			'top': 0 + 'px'
		}, SLIDING_SPEED, function () {
			nowPageIndex = nextPageIndex;
		});
	};

	// 폰 화면 슬라이딩
	var phoneSliding = function (nextPageIndex, vector) {
		var phoneHeight = $('.img_phone .screen_wrap').height() * vector;
		$(screenList[nowPageIndex - 1]).animate({
			'top': phoneHeight + 'px'
		}, SLIDING_SPEED, function () {
			$(this).hide();
		});
		$(screenList[nextPageIndex - 1]).css({
			'top': -phoneHeight + 'px'
		}).show().animate({
			'top': 0 + 'px'
		}, SLIDING_SPEED);
	};

	// 메인 캐릭터 슬라이딩 
	var characterPop = function (nextPageIndex, vector) {
		var nowCharacter = $(mainCharacters[nowPageIndex - 1]),
			nextCharacter = $(mainCharacters[nextPageIndex - 1]),
			nowCharacterPositionY = parseInt(nowCharacter.css('bottom')),
			nextCharacterPositionY = parseInt(nextCharacter.css('bottom')),
			hiddenPosition = 0;
		if (vector < 0) {
			nowCharacterPositionY = nowCharacterPositionY + (windowHeight * -vector);
			hiddenPosition = -nextCharacter.height();
			$(nowCharacter).animate({
				'bottom': nowCharacterPositionY + 'px'
			}, SLIDING_SPEED, function () {
				$(this).removeAttr('style').hide();
			});
			$(nextCharacter).css({
				'bottom': hiddenPosition + 'px'
			}).show().delay(POP_DELAY).animate({
				'bottom': nextCharacterPositionY + 'px'
			}, POP_SPEED, function () {
				isSliding = false;
			});
		} else {
			nowCharacterPositionY = nowCharacterPositionY + (windowHeight * vector);
			hiddenPosition = nextCharacterPositionY + (windowHeight * vector);
			$(nowCharacter).animate({
				'bottom': -nowCharacterPositionY + 'px'
			}, SLIDING_SPEED, function () {
				$(this).removeAttr('style').hide();
			});
			$(nextCharacter).css({
				'bottom': hiddenPosition + 'px'
			}).show().animate({
				'bottom': nextCharacterPositionY + 'px'
			}, SLIDING_SPEED, function () {
				isSliding = false;
			});
		}
	};

	// 동작 묶음
	var startAction = function (nextPageIndex, vector) {
		pageSliding(nextPageIndex, vector);
		phoneSliding(nextPageIndex, vector);
		characterPop(nextPageIndex, vector);
	};

	// 페이징 버튼 동작
	$('.paging').find('a').on('click', function (event) {
		event.preventDefault();
		var nextPageIndex = $(this).index() + 1,
			vector = 0;
		if (nextPageIndex !== nowPageIndex) {
			if (nextPageIndex > nowPageIndex) {
				vector = -1;
			} else {
				vector = 1;
			}
			startAction(nextPageIndex, vector);
		}
	});

	// 브라우저 창 크기 변경 시
	$(window).on('resize', function () {
		pageResize();
	});
};

initPage();