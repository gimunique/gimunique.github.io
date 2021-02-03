var marbleInfo;

$(window).on({
    load: function () {
        var _totalMarbleCount = 37;
        var _currentMarbleNumber = 0;

        marbleInfo = new function () {
            this.moveAnimation = moveAnimation,
                this.setScreenPosition = setScreenPosition,
                this.setCurrentMarbleNumber = setCurrentMarbleNumber,
                this.getCurrentMarbleNumber = getCurrentMarbleNumber,
                this.getTotalMarbleCount = getTotalMarbleCount,
                this.message = message
        }

        init();

        function init() {
            // 말 초기 위치 값 설정
            _currentMarbleNumber = 0;
        }

        // 말 이동 처리
        function moveAnimation() {
            var moveDistanceX = 100;
            var moveDistanceY = 100;
            var defaultPosition = {
                left: -5,
                top: -56
            };

            $(".current_position").hide();

            // 좌상 -> 우상
            if (_currentMarbleNumber < 12) {
                if (0 < _currentMarbleNumber) {
                    $(".current_position").css({
                        "left": defaultPosition.left + (_currentMarbleNumber * moveDistanceX) + "px",
                        "top": defaultPosition.top + "px"
                    }).show();
                } else {
                    $(".current_position").css(defaultPosition).show();
                }
            }
            // 우상 -> 우하
            else if (_currentMarbleNumber < 19) {
                $(".current_position").css({
                    "left": 1095 + "px",
                    "top": defaultPosition.top + ((_currentMarbleNumber - 11) * moveDistanceY) + "px"
                }).show();
            }
            // 우하 -> 좌하
            else if (_currentMarbleNumber < 31) {
                $(".current_position").css({
                    "left": 1095 - ((_currentMarbleNumber - 19) * moveDistanceX) + "px",
                    "top": 744 + "px"
                }).show();
            }
            // 좌하 -> 좌상
            else if (_currentMarbleNumber < 38) {
                $(".current_position").css({
                    "left": defaultPosition.left + "px",
                    "top": 744 - ((_currentMarbleNumber - 30) * moveDistanceY) + "px"
                }).show();
            }
        }

        // 말 이동 시 화면 scroll
        function setScreenPosition() {
            var nowSct = $(".board_box").offset().top;
            if (_currentMarbleNumber < 16 || (_currentMarbleNumber > 34 && _currentMarbleNumber < 38)) {
                $(window).scrollTop(nowSct - 80);
            } else {
                $(window).scrollTop(nowSct + 200);
            }
        }

        // 말 위치 값 설정
        function setCurrentMarbleNumber(number) {
            _currentMarbleNumber = number;
        }

        // 현재 말 위치 가져오기 
        function getCurrentMarbleNumber() {
            return _currentMarbleNumber;
        }

        // 마블 전체 칸 갯수 가져오기
        function getTotalMarbleCount() {
            return _totalMarbleCount;
        }

        // alert 처리
        function message() {
            var itemName = $(".board > div").eq(_currentMarbleNumber).text();
            var itemMessage = "[" + itemName + "] 아이템을 획득하였습니다.\n캐쉬 인벤토리를 확인하세요!";
            var finishMessage = "완주 성공!"

            if (_currentMarbleNumber === 0) {
                alert(finishMessage);
            } else if (_currentMarbleNumber > 0 && _currentMarbleNumber <= 37) {
                alert(itemMessage);
            }
        }
    }
});