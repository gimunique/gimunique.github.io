$(window).on({
    load : function(){
        var ajax = getAjaxPortfolioInfos();
        ajax.success(function(data){
            if(data != null && data.length > 0){
                PortfolioInfos = data;
                var seq = getParameterByName("seq");
                initPortfolioDetailInfos(seq);
            }else{
                alert("포트폴리오 정보 없음");
            }
        });

        $(".work .btn_top").click(function(){
            var speed = 500;
            var ease = "easeInOutCirc";
            $("html, body").stop().animate({scrollTop:0}, speed, ease);
        });
        
        // 포트폴리오 정보 조회 및 화면 그리기
        function initPortfolioDetailInfos(seq){
            var currentPortfolioInfo = getPortfolioDetailInfos(seq, PortfolioInfos);
            paintPortfolioDetailInfos(currentPortfolioInfo);
        }

        // 포트폴리오 정보 가져오기
        function getPortfolioDetailInfos(seq, portfolioInfos){
            var currentPortfolioInfo = portfolioInfos.filter(function(index){
                return index.seq == seq;
            });
            // 값이 있을 경우 포트폴리오 상세 정보 반환
            if(currentPortfolioInfo != null && currentPortfolioInfo.length > 0){
                return currentPortfolioInfo[0];
            }else{
                return null;
            }
        }

        // 포트폴리오 정보 화면에 그리기
        function paintPortfolioDetailInfos(portfolioInfo){
            $('#title').text(portfolioInfo.title);
            $('#subject').text(portfolioInfo.subject);
            $('#role').text(portfolioInfo.role);
            $('#participation').text(portfolioInfo.partcipation);
            // $('#note').text(portfolioInfo.note);

            $.each(portfolioInfo.detail, function(index, detailPortfolioInfo){
                $(".img_wrap").append("<img src='"+ detailPortfolioInfo.imageUrl +"' alt='"+ detailPortfolioInfo.description +"'>");
            });
            $.each(portfolioInfo.link, function(index, linkPortfolioInfo){
                $(".url_wrap").append(
                    "<a href='" + linkPortfolioInfo.linkUrl + "' class='" + linkPortfolioInfo.className + "' title='" + linkPortfolioInfo.title + "'>" +
                    "<img src='" + linkPortfolioInfo.imgUrl + "' alt=''>" +
                    "</a>");
            });
        }
    }
});