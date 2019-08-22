$(window).on({
    load : function(){
        var _intervalId = 0;
        var _number = 0;

        init();

        //주사위 클릭
        $(".btn_roll").on({click : onDiceClick});

        function init(){
            $(".dice_wrap .dice").hide().removeClass("dice"+_number).prev(".btn_roll").fadeIn(500);
            $(".dice_wrap").removeClass("rolling");

            _intervalId = initAnimation();
        }

        //주사위 모션
        function initAnimation(){
            var intervalId = setInterval(function(){
                $(".btn_roll").removeClass("shake");
                setTimeout(function(){
                    $(".btn_roll").addClass("shake");
                }, 1000);
            }, 3500);
            return intervalId;
        }
        
        //주사위 클릭시 정보 갱신(랜덤으로 부여 받은 주사위 숫자 갱신, 말의 현재 위치 값 갱신)
        function setInfo(){
            if($(".dice_wrap").hasClass("rolling") == false){
                $(".dice_wrap").addClass("rolling");
                
                $(".dice_wrap .btn_roll").hide(function(){
                    clearInterval(_intervalId);
                }).removeClass("shake");

                $(".dice_wrap .dice").show();

                //주사위 클릭 후 랜덤으로 부여 받은 숫자 저장
                _number = getRandomNumber();

                //현재 말의 위치 + 주사위 부여 숫자가 보드칸 전체 갯수보다 클 경우
                if((marbleInfo.getCurrentMarbleNumber() + _number) > marbleInfo.getTotalMarbleCount()){
                    //완주한 상태이므로 말의 위치를 0으로 최기화
                    marbleInfo.setCurrentMarbleNumber(0);
                }else{
                    var sumNumber = marbleInfo.getCurrentMarbleNumber() + _number;
                    marbleInfo.setCurrentMarbleNumber(sumNumber);
                }
            }
        }

        //주사위 클릭시 애니메이션 처리
        function moveAnimation(){
            var rollNumber = 0;
            var rollDirect = 0; //주사위 크기 구분(0: 커지는, 1: 작아지는)
            var rollScale; //주사위 비율
            var scaleCount = 0.05; //주사위 크기 확대/축소 시 변폭 기준
            var moveIntervalId = setInterval(function(){
                if(rollDirect == 0){
                    $(".dice_wrap .dice").removeClass("dice_roll"+rollNumber);
                    rollNumber++;
                    rollScale = (1 + rollNumber * scaleCount).toFixed(2);
                    $(".dice_wrap .dice").addClass("dice_roll"+rollNumber).css("transform","scale("+rollScale+")");
                    if(rollNumber == 6){
                        rollDirect = 1;
                    }
                }else{
                    if(rollNumber > 1){
                        $(".dice_wrap .dice").removeClass("dice_roll"+rollNumber);
                        rollNumber--;
                        rollScale = (rollScale - scaleCount).toFixed(2);
                        rollScale = rollScale > 1 ? rollScale : 1
                        $(".dice_wrap .dice").addClass("dice_roll"+rollNumber).css("transform","scale("+rollScale+")");
                    }else{
                        clearInterval(moveIntervalId);
                        $(".dice_wrap .dice").removeClass("dice_roll"+rollNumber).addClass("dice"+_number).css("transform","");
                    }
                }
            }, 50);
        }

        //주사위 숫자 랜덤 반환
        function getRandomNumber(){
            return Math.floor(Math.random() * 6) + 1;
        }

        //주사위 클릭 처리
        function onDiceClick(){
            setInfo();
            moveAnimation();
            
            setTimeout(function(){
                marbleInfo.setScreenPosition();
                marbleInfo.moveAnimation();
                
                //말 이동 후 얼럿창, 초기화
                setTimeout(function(){
                    marbleInfo.message();
                    init();
                }, 500);
            }, 1000);
        }
    }
});