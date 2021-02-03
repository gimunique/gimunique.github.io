"use strict";
$(document).ready(function () {
    ////////////////////***** MOCK UP *****////////////////////
    // 1, 3, 5주차 bingo_wrap에 odd_week 클래스 동적 추가
    $(".bingo_wrap").addClass("odd_week");
    // 2, 4, 6주차 bingo_wrap에 even_week 클래스 동적 추가
    // $(".bingo_wrap").addClass("even_week");
    // 미션 완료 시 <li> 태그에 get 클래스 동적 추가
    $(".bingo_list li:eq(0), .bingo_list li:eq(4), .cum_list li:eq(0)").addClass("get");
    // 미션 완료 시 <li> 태그에 done 클래스 동적 추가
    $(".bingo_list li:eq(5), .bingo_list li:eq(9), .cum_list li:eq(1)").addClass("done");
    ////////////////////***** MOCK UP *****////////////////////

    // 미션완료, 보상완료 태그 동적 추가    
    addBingoFinishTag($(".bingo_list li"));
    addBingoFinishTag($(".cum_list li"));

    function addBingoFinishTag(list) {
        var $listClass = list;
        for (var i = 0; i < $listClass.length; i++) {
            if ($listClass.eq(i).hasClass("get")) {
                $listClass.eq(i).find(".r_com").remove();
                $listClass.eq(i).append("<div class='m_com'><p>미션완료</p><button type='button' class='btn_get'>상품수령</button></div>");
            } else if ($listClass.eq(i).hasClass("done")) {
                $listClass.eq(i).find(".m_com").remove();
                $listClass.eq(i).append("<div class='r_com'><p>보상완료</p></div>");
            }
        }
    }

    // 빙고판 변경되는 부분 LIST
    var setBingoContentsList = [{
            type: "odd",
            index: 2,
            name: "아레나 입장",
            number: "7회"
        },
        {
            type: "odd",
            index: 3,
            name: "잡동사니 아이템 루팅",
            number: "100개"
        },
        {
            type: "odd",
            index: 8,
            name: "고급 등급 아이템 루팅",
            number: "100개"
        },
        {
            type: "odd",
            index: 9,
            name: "NPC 상점 아이템 구매",
            number: "5회"
        },
        {
            type: "odd",
            index: 13,
            name: "희귀 등급 아이템 루팅",
            number: "30개"
        },
        {
            type: "odd",
            index: 14,
            name: "고급 등급 이상 아이템 추출",
            number: "100개"
        },
        {
            type: "odd",
            index: 18,
            name: "영웅 등급 아이템 루팅",
            number: "7개"
        },
        {
            type: "odd",
            index: 19,
            name: "생산",
            number: "5회"
        },
        {
            type: "even",
            index: 2,
            name: "결투장 입장",
            number: "15회"
        },
        {
            type: "even",
            index: 3,
            name: "정복 점수 획득",
            number: "30,000점"
        },
        {
            type: "even",
            index: 8,
            name: "아비스모 점수 획득",
            number: "100,000점"
        },
        {
            type: "even",
            index: 9,
            name: "NPC 상점 아이템 구매",
            number: "50회"
        },
        {
            type: "even",
            index: 13,
            name: "명예 점수 획득",
            number: "10,000점"
        },
        {
            type: "even",
            index: 14,
            name: "적 100마리 처치",
            number: "100마리"
        },
        {
            type: "even",
            index: 18,
            name: "도전 점수 획득",
            number: "10,000점"
        },
        {
            type: "even",
            index: 19,
            name: "제작",
            number: "5회"
        }
    ];

    // 빙고판 변경되는 부분 화면 렌더링
    optimizationFilter();
    if ($(".bingo_wrap").hasClass("odd_week")) {
        var bingoContentsOddList = setBingoContentsList.filter(function (index) {
            return index.type == "odd";
        });
        for (var i = 0; i < bingoContentsOddList.length; i++) {
            $(".bingo_list li:nth-child(" + bingoContentsOddList[i].index + ") .name").append(bingoContentsOddList[i].name);
            $(".bingo_list li:nth-child(" + bingoContentsOddList[i].index + ") .c_num").append(bingoContentsOddList[i].number);
        }
    } else if ($(".bingo_wrap").hasClass("even_week")) {
        var bingoContentsEvenList = setBingoContentsList.filter(function (index) {
            return index.type == "even";
        });
        for (var i = 0; i < bingoContentsEvenList.length; i++) {
            $(".bingo_list li:nth-child(" + bingoContentsEvenList[i].index + ") .name").append(bingoContentsEvenList[i].name);
            $(".bingo_list li:nth-child(" + bingoContentsEvenList[i].index + ") .c_num").append(bingoContentsEvenList[i].number);
        }
    }

    // ie9이하 filter() 최적화
    function optimizationFilter() {
        if (!Array.prototype.filter) {
            Array.prototype.filter = function (func, thisArg) {
                'use strict';
                if (!((typeof func === 'Function' || typeof func === 'function') && this))
                    throw new TypeError();
                var len = this.length >>> 0,
                    res = new Array(len),
                    t = this,
                    c = 0,
                    i = -1;
                if (thisArg === undefined) {
                    while (++i !== len) {
                        if (i in this) {
                            if (func(t[i], i, t)) {
                                res[c++] = t[i];
                            }
                        }
                    }
                } else {
                    while (++i !== len) {
                        if (i in this) {
                            if (func.call(thisArg, t[i], i, t)) {
                                res[c++] = t[i];
                            }
                        }
                    }
                }
                res.length = c;
                return res;
            };
        }
    }
});