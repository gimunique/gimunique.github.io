//전역변수는 대문자로
var Browser = navigator.userAgent;
var PortfolioInfos = [];
var CurrentPageNumber = 0;
var TotalPageCount = 0;
var PageSize = 6;

$(document).ready(function(){
    //하위버전(ie9이하) svg 파일 check, png 파일로 대체
    if(!Modernizr.svg){
        $(".svg").each(function(){
            var src = $(this).attr("src");
            $(this).attr("src", src.replace(/\.svg/, '.png'));
        });
    }
});

function getAjaxPortfolioInfos(){
    return $.ajax({
        url: "list.json",
        type: "GET",
        dataType: "json",
        error: function(request, status, error){
            alert("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
        }
    });
}

function getParameterByName(name){
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)");
    var results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

//ie9이하 .filter() 
if(!Array.prototype.filter){
    Array.prototype.filter = function(func, thisArg){
        'use strict';
        if(!((typeof func === 'Function' || typeof func === 'function') && this))
        throw new TypeError();
        var len = this.length >>> 0;
        var res = new Array(len);
        var t = this, c = 0, i = -1;
        if(thisArg === undefined){
            while (++i !== len){
                if (i in this){
                    if (func(t[i], i, t)){
                        res[c++] = t[i];
                    }
                }
            }
        }else{
            while (++i !== len){
                if(i in this){
                    if (func.call(thisArg, t[i], i, t)){
                        res[c++] = t[i];
                    }
                }
            }
        }
        res.length = c;
        return res;
    };
}