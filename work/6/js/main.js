function sendLoginInfo() {
    var form = $('#LoginForm');

    if ($("#login_id").val() == "") {
        $("#popEmail_1").show();
        $("span#bg_pop").show();
        return;
    }
    if ($("#login_pw").val() == "") {
        $("#popEmail_5").show();
        $("span#bg_pop").show();
        return;
    }
    var successFunc = function (re) {
        if (re.result) {
            $(location).attr('href', $('#MoveLink').text());
        } else {
            $("#popEmail_6").show().children("p").html(re.msg);
            $("span#bg_pop").show();
        }
    }

    $('#LoginForm').send($('#LoginLink').text(), successFunc);
};
$(function () {
    $(".d_btn_logout").on('click', function () {
        isUtil.movePage('/main/index.php/main/Logout');
    });
    $(".pop_alert .btn_close, .pop_alert .btn_blue").click(function (e) {
        $(this).parents(".pop_alert").hide();
        $("span#bg_pop").hide();
        return false;
    });
    var isProccessing = false;
    $(".btn_email").click(function (e) {
        var email = $(this).parent().children("input").eq(0).val();

        if (email == "") {
            $("#popEmail_1").show();
            $("span#bg_pop").show();
            e.preventDefault();
            return;
        }
        if (!((/^([a-zA-Z0-9\+_\-]+)(\.[a-zA-Z0-9\+_\-]+)*@([a-zA-Z0-9\-]+\.)+[a-zA-Z]{2,6}$/).test(email))) {
            $("#popEmail_2").show();
            $("span#bg_pop").show();
            e.preventDefault();
            return;
        }
        var potal = ["hanmail.net", "naver.com", "hotmail.com", "yahoo.co.kr", "yahoo.com", "hanmir.com", "paran.com", "lycos.co.kr", "nate.com",
            "dreamwiz.com", "korea.com", "empas.com", "empal.com", "netian.com", "freechal.com", "msn.com", "gmail.com", "chol.com", "hanafos.com", "sayclub.com",
            "me.com", "icloud.com", "daum.net", "hanmail.com", "outlook.com", "outlook.kr", "bizhard.com", "live.co.kr", "live.com", "hitel.net", "yopmail.com",
            "OUTLOOK.COM.AR", "OUTLOOK.COM.AU", "OUTLOOK.AT", "OUTLOOK.BE", "OUTLOOK.COM.BR", "LIVE.CA", "OUTLOOK.CL", "LIVE.CN", "OUTLOOK.DK", "HOTMAIL.FI", "OUTLOOK.FR", "OUTLOOK.DE", "LIVE.HK", "OUTLOOK.HU", "OUTLOOK.IN", "OUTLOOK.IE", "OUTLOOK.CO.IL", "OUTLOOK.IT", "OUTLOOK.JP", "HOTMAIL.KR", "HOTMAIL.MY", "LIVE.COM.MX", "LIVE.NL", "LIVE.NO", "OUTLOOK.PH", "OUTLOOK.PT", "OUTLOOK.RU", "OUTLOOK.SA", "OUTLOOK.SG", "LIVE.CO.ZA", "OUTLOOK.ES", "LIVEMAIL.TW", "OUTLOOK.CO.TH", "OUTLOOK.COM.TR", "LIVE.CO.UK"
        ];
        var isPotal = false;

        $.each(potal, function (index, item) {
            if (item.toLowerCase() == email.split("@")[1].toLowerCase())
                isPotal = true;
        });
        if (isPotal) {
            $("#popEmail_3").show();
            $("span#bg_pop").show();
            e.preventDefault();
            return;
        }
        if (!isProccessing) {
            isProccessing = true;
            $.ajax({
                "url": $('#TeamUPStartLink').text(),
                "type": "post",
                "data": {
                    "Email": email
                },
                "dataType": "json",
                success: function (data) {
                    isProccessing = false;
                    if (data.result) {
                        ga('send', 'event', 'join', 'click');
                        isUtil.movePage($('#ApplicationMainLink').text(), {
                            "Email": email
                        }, true);
                    } else {
                        $("#popEmail_4").show();
                        $("span#bg_pop").show();
                        e.preventDefault();
                    }
                }
            });
        }
    });
    $("#btn_demo").click(function (e) {
        var email = $("#inputDemo").val();

        if (email == "") {
            $("#popEmail_1").show();
            $("span#bg_pop").show();
            e.preventDefault();
            return;
        }
        if (!((/^([a-zA-Z0-9\+_\-]+)(\.[a-zA-Z0-9\+_\-]+)*@([a-zA-Z0-9\-]+\.)+[a-zA-Z]{2,6}$/).test(email))) {
            $("#popEmail_2").show();
            $("span#bg_pop").show();
            e.preventDefault();
            return;
        }
        if (!isProccessing) {
            isProccessing = true;
            $.ajax({
                "url": $('#TeamUPDemoLink').text(),
                "type": "post",
                "data": {
                    "Email": email
                },
                "dataType": "json",
                success: function (data) {
                    isProccessing = false;
                    if (data.result) {
                        ga('send', 'event', 'demo', 'click');
                        isUtil.movePage($('#TeamUPDemoMainLink').text());
                    } else {
                        $("#popEmail_4").show();
                        $("span#bg_pop").show();
                        e.preventDefault();
                    }
                }
            });
        }
    });

    $("#inputJoin, #inputStart, #inputDemo").keypress(function (e) {
        if (e.keyCode == 13) {
            if ($("#popEmail_1").css("display") == "block" || $("#popEmail_2").css("display") == "block" || $("#popEmail_3").css("display") == "block" || $("#popEmail_4").css("display") == "block") {
                $(".n_pop").hide();
                $("span#bg_pop").hide();
            } else {
                if ($(this).attr("id") == "inputJoin")
                    $("#btn_email_top").click();
                else if ($(this).attr("id") == "inputDemo") {
                    $("#btn_demo").click();
                } else {
                    $("#btn_email_bottom").click();
                }
                e.preventDefault();
            }
            e.preventDefault();
        }
    });

    $("#login_pw").keypress(function (e) {
        if (e.keyCode == 13) {
            if ($("#popEmail_1").css("display") == "block" || $("#popEmail_5").css("display") == "block" || $("#popEmail_6").css("display") == "block") {
                $(".n_pop").hide();
                $("span#bg_pop").hide();
                e.preventDefault();
            } else {
                $('#LoginForm').submit();
                e.preventDefault();
            }

        }
    });

    $(".btn_tw").click(function (e) {
        var ShareUrl = "https://twitter.com/intent/tweet?";
        var text = "text=" + encodeURIComponent($("#TwitterShareDescription").text());
        var url = "&url=" + encodeURIComponent("https://www.tmup.com/main/index.php");
        window.open(ShareUrl + text + url, 'TW', 'scrollbars=yes,toolbar=no,menubar=no,resizable=yes,width=700,height=445,left=0,top=0');
    });

    $(".btn_fb").click(function (e) {
        var ShareUrl = "http://www.facebook.com/sharer/sharer.php?";
        var url = "u=" + encodeURIComponent("https://www.tmup.com/main/index.php");
        window.open(ShareUrl + url, 'FaceBook', 'scrollbars=yes,toolbar=no,menubar=no,resizable=yes,width=600,height=300,left=0,top=0');
    });

    $('.windows, .google, .app, .manual, .leaflet').on('click', function () {
        var name = $(this).prop('class');
        ga('send', 'event', name, 'click');
    });
});
// 하위버전 indexOf 사용하기
if (!Array.prototype.indexOf) {
    Array.prototype.indexOf = function (obj, start) {
        for (var i = (start || 0), j = this.length; i < j; i++) {
            if (this[i] === obj) {
                return i;
            }
        }
        return -1;
    }
}
$(function () {
    // 로그인
    $(".header .util_menu a.btn_login, .header .login_box .btn_close").click(function (e) {
        e.preventDefault();
        $(this).parents(".util_menu").toggleClass("loginon");
    })
    $(document).bind("click", function (e) {
        if (!$(e.target).parents().hasClass("util_menu")) {
            $(".header .util_menu").removeClass("loginon");
        }
    })
    // 배경
    var bgInteval;
    if ($(".main_pc").length > 0) {
        mainScroll();
        bgInteval = setInterval(bgRolling, 4000);
    } else {
        $(".header .submenu").addClass("load");
    }
    // 메인 기능소개 hover
    $(".main_wrap .func_thumb li > a").hover(function () {
        $(this).parent().siblings().find("a").removeClass("hover");
        $(this).addClass("hover");
    }, function () {
        $(this).removeClass("hover");
    })
    // 기능 소개 탭
    $(".func_wrap .func_tab li > a").click(function (e) {
        e.preventDefault();
        if (!$(this).parent().hasClass("on")) {
            $(this).parent().addClass("on").siblings().removeClass("on");
        }
    })
})

function mainScroll() {
    var pageHash = ["join", "function", "premium"];
    var newhash = location.hash.split("#")[1];
    var pagePos = pageHash.indexOf(newhash);
    var pos = [];
    var headerHeight, sct;
    var scSpeed = 600;
    var scEase = "easeOutCubic";
    var winHeight = $(window).height();
    var newhash = location.hash.split("#")[1];
    $(window).load(function () {
        sct = $(window).scrollTop();
        $(".main_wrap .section").each(function (i) {
            pos.push($(this).offset().top);
        })
        headerHeight = $(".main_pc .header").height();
        scrollEv();
        if (pagePos > 0) {
            $(window).scrollTop(pos[pagePos] - headerHeight);
        } else {
            $(window).scrollTop(0);
        }
    })
    //메인 화살표 버튼
    $(".main_wrap .main_title .btn_scroll").click(function (e) {
        e.preventDefault();
        $("html,body").stop().animate({
            scrollTop: pos[1] - headerHeight
        }, scSpeed, scEase);

    })
    $(".main_pc .header .gnb li > a").click(function (e) {
        var idx = $(this).parent().index();
        if (idx != $(".main_pc .header .gnb > li").length - 1) {
            e.preventDefault();
            $("html,body").stop().animate({
                scrollTop: pos[idx] - headerHeight
            }, scSpeed, scEase);
        }
    })
    $(window).resize(function () {
        winHeight = $(window).height();
    })
    $(window).scroll(function () {
        sct = $(window).scrollTop();
        scrollEv();
    })

    function scrollEv() {
        var p;
        if (sct < pos[1] - winHeight / 2) {
            p = 0;
            $(".main_bg").removeClass("blur_scroll");
        } else if (sct < pos[2] - winHeight / 2) {
            p = 1;
            $(".func_thumb .func_list").addClass("funcon");
            $(".main_bg").addClass("blur_scroll");
        } else {
            p = 2;
        }
        $(".header .gnb li:eq(" + p + ")").addClass("on").siblings().removeClass("on");
    }
}
// 메인 배경
function bgRolling() {
    var rspeed = 700;
    var leng = $(".main_title .main_bg").children().length;
    var nowShow = $(".main_title .main_bg span.show").index();
    var nextShow = nowShow < leng - 1 ? nowShow + 1 : 0;
    $(".main_title .main_bg span:eq(" + nowShow + ")").stop().animate({
        opacity: 0
    }, rspeed, function () {
        $(this).removeClass("show").hide();
    });
    $(".main_title .main_bg span:eq(" + nextShow + ")").stop().show().css({
        opacity: 0.2
    }).animate({
        opacity: 1
    }, rspeed, function () {
        $(this).addClass("show");
    });
}