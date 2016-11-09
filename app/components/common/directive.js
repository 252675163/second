"use strict";
/**
 * author :yinglechao
 * time: 2015年9月22日
 * description: 通用公用组件：placeHolder
 * 1、changePlaceHoldByFocus 改变input的placeHolder 当input获得焦点时，placeHolder置空
 *2、scrollTopByBlur 失去焦点滚到顶部（<textarea>） */


define(["ionic", "slip"], function () {
    angular.module("Common.directive", [])
        .directive("changePlaceholderByFocus", [
            "$window", "$timeout", "maskService", "$ionicLoading",
            function ($window, $timeout, maskService, $ionicLoading) {
                return function (scope, elem, attrs) {
                    //得到焦点置空placeholder，失去焦点还原placeholder
                    var placeholderText = elem.attr("placeholder");
                    elem.on("blur", function () {
                        elem.attr("placeholder", placeholderText);
                    });
                    elem.on("focus", function () {
                        elem.attr("placeholder", "");
                    });
                };
            }
        ])
        .directive("myMaxLength", [
            "$window", "$timeout",
            function ($window, $timeout) {
                return function (scope, elem, attrs) {
                    elem.bind("txtinput", function () {
                        var maxLength = elem.attr("maxlength");
                        if (elem.val().length > parseInt(maxLength)) {
                            elem.val(elem.val().slice(0, parseInt(maxLength)));
                        }
                    });

                };
            }
        ])
        .directive("myKeyboard", [
            "$window", "$timeout",
            function ($window, $timeout) {
                return function (scope, elem, attrs) {
                    elem.on("blur", function () {
                        TranslateObj.setTranslate($(".pane")[0], 0, -0, 0);
                    });
                    elem.on("focus", function () {
                        TranslateObj.setTranslate($(".pane")[0], 0, -200, 0);
                    });
                };
            }
        ])
        .directive("scrollTopByBlur", [
            "$window", "$timeout",
            function ($window, $timeout) {
                return function (scope, elem, attrs) {
                    //（多行文本框）失焦滚到顶部
                    elem.on("blur", function () {
                        elem[0].scrollTop = 0;
                    });
                };
            }
        ])
        .directive("touchTopRender", [
            "$window", "$timeout",
            function ($window, $timeout) {
                return function (scope, elem, attrs) {
                    var isScroll = attrs.scrollbarY;
                    if ("ontouchend" in $window) {
                        elem.on("touchmove", function (event) {
                            if (TranslateObj.getCoordinates(event).y <= 0) {
                                if (isScroll) {
                                    TranslateObj.setTranslate(elem.children()[0], 0, 0, 0);
                                } else {
                                    TranslateObj.setTranslate(elem[0], 0, 0, 0);
                                }
                            }
                        });
                    }

                };
            }
        ])
        //输入框获取焦点时，广播自定义输入框事件,传递当前的ngModel
        .directive("customInput", [
            "$window", "$timeout",
            function ($window, $timeout) {
                return {
                    require: "^ngModel",
                    restrict: "A",
                    scope: false,
                    link: function (scope, elem, attrs, ngModel) {
                        var maxLength = attrs.maxlength || 0;
                        var isReplace = attrs.isreplace || false;
                        var isDiff = attrs.isdiff == "true" ? true : false;
                        elem.click(function (event) {
                            //暂时增加对超链接点击的支持 by xp 2015年12月9日 13:03:26
                            if (event.target && (event.target.tagName == "A" || event.target.tagName == "IMG")) {
                            } else {
                                event.preventDefault();
                                scope.$root.$broadcast("customInput", {
                                    ngModel: ngModel,
                                    maxLength: maxLength,
                                    isReplace: isReplace,
                                    isDiff: isDiff
                                });
                                return false;
                            }

                        });
                        elem.focus(function (event) {
                            event.preventDefault();
                            return false;
                        }).blur(function (event) {
                            event.preventDefault();
                            return false;
                        });
                    }
                };
            }
        ])
        //输入框获取焦点时，广播自定义输入框事件,传递当前的ngModel
        .directive("newCustomInput", [
            "$window", "$timeout",
            function ($window, $timeout) {
                return {
                    require: "^ngModel",
                    restrict: "A",
                    scope: false,
                    link: function (scope, elem, attrs, ngModel) {
                        var inputConfig = attrs.inputconfig ? angular.fromJson(attrs.inputconfig) : {};
                        if (!!attrs.rows) {
                            var rows = isNaN(parseInt(attrs.rows)) ? 0 : parseInt(attrs.rows);
                            inputConfig.rows = rows;
                        }
                        inputConfig.tagName = elem.prop("tagName").toLowerCase();
                        elem.click(function (event) {
                            if (event.target && (event.target.tagName == "A" || event.target.tagName == "IMG")) {
                            } else {
                                event.preventDefault();
                                scope.$root.$broadcast("newCustomInput", {
                                    ngModel: ngModel,
                                    inputConfig: inputConfig
                                });
                                return false;
                            }

                        });
                        elem.focus(function (event) {
                            event.preventDefault();
                            return false;
                        }).blur(function (event) {
                            event.preventDefault();
                            return false;
                        });
                    }
                };
            }
        ])

        //PlaceHolder 自定义（变量）
        .directive("myPlaceHold", [
            "$timeout", function ($timeout) {
                return {
                    restrict: "A",
                    link: function (scope, element, attrs) {
                        $timeout(function () {
                            var myPlacehold = attrs.myPlaceHold;
                            element.attr("placeholder", myPlacehold);
                            element.bind("blur", function () {
                                element.attr("placeholder", myPlacehold);
                            });
                            element.bind("focus", function () {
                                element.attr("placeholder", "");
                            });
                        }, 0);
                    }
                };
            }
        ])
        .directive("stopMove", [
            "$timeout", function ($timeout) {
                return {
                    restrict: "E",
                    link: function (scope, element, attrs) {

//                        ionic.on("touchstart", function(e) {
//                            if ((e.target.tagName !== "TEXTAREA" && e.target.tagName !== "INPUT" && $(e.target).parent().attr("id") !== "qrcode") || ($(e.target).closest("#iSlider-wrapper").length > 0 && ionic.Platform.isIOS())) {
//                                e.preventDefault();
//                            }
                        //                        }, document);
                        $(document).on("touchstart", function (e) {
                            //如果是查看页面并且是安卓手机
                            //hack部分安卓手机input disable情况下还会弹出虚拟键盘问题
                            //配合slider组件，安卓手机上图片长按可被识别  by xp 2015年12月2日 16:26:56
                            if (($(e.target).closest("#iSlider-wrapper").length > 0 && ionic.Platform.isAndroid()) || ($(e.target).closest("#newMicroSiteContainer").length > 0 && ionic.Platform.isAndroid())) {

                            } else {
                                if ((e.target.tagName !== "TEXTAREA" && e.target.tagName !== "INPUT" && $(e.target).parent().attr("id") !== "qrcode" && $(e.target).attr("isstopmove") !== "false") || $(e.target).closest("#iSlider-wrapper").length > 0) {
                                    e.preventDefault();
                                }
                            }

                        });
                        $(document).on("touchmove", function (e) {
                            if ((e.target.tagName !== "TEXTAREA" && e.target.tagName !== "INPUT" && $(e.target).parent().attr("id") !== "qrcode" && $(e.target).attr("isstopmove") !== "false") || ($(e.target).closest("#iSlider-wrapper").length > 0)) {
                                e.preventDefault();
                            }
                        });
                        $(document).on("touchend", function (e) {
                            if (($(e.target).closest("#iSlider-wrapper").length > 0 && ionic.Platform.isAndroid()) || ($(e.target).closest("#newMicroSiteContainer").length > 0 && ionic.Platform.isAndroid())) {
                            } else {
                                if ((e.target.tagName !== "TEXTAREA" && e.target.tagName !== "INPUT" && $(e.target).parent().attr("id") !== "qrcode" && $(e.target).attr("isstopmove") !== "false") || $(e.target).closest("#iSlider-wrapper").length > 0) {
                                    e.preventDefault();
                                }
                            }
                        });
//                        ionic.on("touchmove", function(e) {
//                            if ((e.target.tagName !== "TEXTAREA" && e.target.tagName !== "INPUT" && $(e.target).parent().attr("id") !== "qrcode") || ($(e.target).closest("#iSlider-wrapper").length > 0 && ionic.Platform.isIOS())) {
//                                e.preventDefault();
//                            }
//                        }, document);
//                        ionic.on("touchend", function(e) {
//                            if ((e.target.tagName !== "TEXTAREA" && e.target.tagName !== "INPUT" && $(e.target).parent().attr("id") !== "qrcode") || ($(e.target).closest("#iSlider-wrapper").length > 0 && ionic.Platform.isIOS())) {
//                                e.preventDefault();
//                            }
//                        }, document);
                    }
                };
            }
        ])
        //解决原生ngbindhtml会将ngClick过滤掉的问题 by xp 2015年12月3日 16:05:44
        .directive("bindHtml", [
            "$compile", function ($compile) {
                return function (scope, element, attrs) {
                    scope.$watch(
                        function (scope) {
                            return scope.$eval(attrs.bindHtml);
                        },
                        function (value) {
                            element.html(value);

                            //  $compile.loadBeforeCompile("textinput",(function( $compile,templateDirective,newScope,iElement){
                            //       return function(){
                            //         var el = $compile(templateDirective)(newScope);
                            //         iElement.append(el);
                            //       }                                  
                            //  })($compile,templateDirective,newScope,iElement));

                            $compile(element.contents())(scope);
                        }
                    );
                };
            }
        ])
        //新微官网选择类别的滑动组件
        .directive("modeSlide", [
            function () {
                return function (scope, element, attrs) {
                    $.fn.extend({
                        'swipeleft': function (fn) {
                            $(this).on("touchstart", function (e) {
                                e = e.originalEvent.touches[0];
                                var sx = 0;
                                sx = e.pageX;
                                $(this).on("touchend", function (e) {
                                    e = e.originalEvent.changedTouches[0];
                                    var move = $(".microsite_choose_project")[0];
                                    var str1 = "translate3d(0,0,0)";
                                    var str2 = "translate3d(10rem,0,0)";
                                    if ((sx - e.pageX) > 5) {
                                        if (move.style.webkitTransform === str2 || move.style.MozTransform === str2 || move.style.transform === str2 || move.style.webkitTransform === str2) {
                                            $(".microsite_choose_project").css({
                                                "-webkit-transform": "translate3d(0, 0, 0)",
                                                "-o-transform": "translate3d(0, 0, 0)",
                                                "transform": "translate3d(0, 0, 0)",
                                                "-moz-transform": "translate3d(0, 0, 0)"
                                            });
                                            $("#circle2").css("background-color", "#666").siblings().css("background-color", "#e7e7e9");

                                        } else {
                                            if ($(".microsite_choose_project")[0].getElementsByClassName("activated")[0] != undefined && $(".microsite_choose_project")[0].getElementsByClassName("activated")[0].className.indexOf("microsite_project1_wrapper") >= 0) {
                                                $(".microsite_choose_project").css({
                                                    "-webkit-transform": "translate3d(0, 0, 0)",
                                                    "-o-transform": "translate3d(0, 0, 0)",
                                                    "transform": "translate3d(0, 0, 0)",
                                                    "-moz-transform": "translate3d(0, 0, 0)"
                                                });
                                                $("#circle2").css("background-color", "#666").siblings().css("background-color", "#e7e7e9");
                                            } else {
                                                $(".microsite_choose_project").css({
                                                    "-webkit-transform": "translate3d(-10rem, 0, 0)",
                                                    "-o-transform": "translate3d(-10rem, 0, 0)",
                                                    "transform": "translate3d(-10rem, 0, 0)",
                                                    "-moz-transform": "translate3d(-10rem, 0, 0)"
                                                });
                                                $("#circle3").css("background-color", "#666").siblings().css("background-color", "#e7e7e9");
                                            }
                                        }
                                        fn();
                                    }
                                    $(this).unbind("touchend");
                                });

                            });
                            return this;
                        },
                        'swiperight': function (fn) {
                            $(this).on("touchstart", function (e) {
                                e = e.originalEvent.touches[0];
                                var sx = 0;
                                sx = e.pageX;
                                $(this).on("touchend", function (e) {
                                    e = e.originalEvent.changedTouches[0];
                                    var move = $(".microsite_choose_project")[0];
                                    var str1 = "translate3d(0,0,0)";
                                    var str2 = "translate3d(-10rem,0,0)";
                                    if ((e.pageX - sx) > 5) {
                                        if (move.style.webkitTransform === str2 || move.style.MozTransform === str2 || move.style.transform === str2 || move.style.webkitTransform === str2) {
                                            $(".microsite_choose_project").css({
                                                "-webkit-transform": "translate3d(0, 0, 0)",
                                                "-o-transform": "translate3d(0, 0, 0)",
                                                "transform": "translate3d(0, 0, 0)",
                                                "-moz-transform": "translate3d(0, 0, 0)"
                                            });
                                            $("#circle2").css("background-color", "#666").siblings().css("background-color", "#e7e7e9");
                                        } else {
                                            if ($(".microsite_choose_project")[0].getElementsByClassName("activated")[0] != undefined && $(".microsite_choose_project")[0].getElementsByClassName("activated")[0].className.indexOf("microsite_project3_wrapper") >= 0) {
                                                $(".microsite_choose_project").css({
                                                    "-webkit-transform": "translate3d(0, 0, 0)",
                                                    "-o-transform": "translate3d(0, 0, 0)",
                                                    "transform": "translate3d(0, 0, 0)",
                                                    "-moz-transform": "translate3d(0, 0, 0)"
                                                });
                                                $("#circle2").css("background-color", "#666").siblings().css("background-color", "#e7e7e9");
                                            } else {
                                                $(".microsite_choose_project").css({
                                                    "-webkit-transform": "translate3d(10rem, 0, 0)",
                                                    "-o-transform": "translate3d(10rem, 0, 0)",
                                                    "transform": "translate3d(10rem, 0, 0)",
                                                    "-moz-transform": "translate3d(10rem, 0, 0)"
                                                });
                                                $("#circle1").css("background-color", "#666").siblings().css("background-color", "#e7e7e9");
                                            }
                                        }
                                        fn();
                                    }
                                    $(this).unbind("touchend");
                                });
                            });
                        }
                    });
                    //$("element").find('.microsite_project1_wrapper,.microsite_project2_wrapper,.microsite_project3_wrapper').swipeleft(function () { });
                    //$("element").find('.microsite_project1_wrapper,.microsite_project2_wrapper,.microsite_project3_wrapper').swiperight(function () { });
                    $(".microsite_project1_wrapper, .microsite_project2_wrapper, .microsite_project3_wrapper").swipeleft(function () {
                    });
                    $(".microsite_project1_wrapper, .microsite_project2_wrapper, .microsite_project3_wrapper").swiperight(function () {
                    });

                    var mdoeIndex = attrs["mdoeindex"];
                    switch (mdoeIndex) {
                        case "1":
                            $(".microsite_choose_project").css({"-webkit-transform": "translate3d(10rem, 0, 0)"});
                            $("#circle1").css("background-color", "#666").siblings().css("background-color", "#e7e7e9");
                            break;
                        case "2":
                            $(".microsite_choose_project").css({"-webkit-transform": "translate3d(0, 0, 0)"});
                            $("#circle2").css("background-color", "#666").siblings().css("background-color", "#e7e7e9");
                            break;
                        case "3":
                            $(".microsite_choose_project").css({"-webkit-transform": "translate3d(-10rem, 0, 0)"});
                            $("#circle3").css("background-color", "#666").siblings().css("background-color", "#e7e7e9");
                            break;
                        default:
                            $(".microsite_choose_project").css({"-webkit-transform": "translate3d(10rem, 0, 0)"});
                            $("#circle1").css("background-color", "#666").siblings().css("background-color", "#e7e7e9");
                            break;
                    }


                };
            }
        ])
        .directive("returnElementHeightByStyle", [
            function ($window, $timeout) {
                return {
                    restrict: "A",
                    scope: {
                        elementData: "="
                    },
                    link: function (scope, elem, attrs, ngModel) {
                        scope.elementData.height = parseFloat(document.documentElement.style.fontSize) * parseFloat(elem[0].style.height);

                    }
                };
            }
        ])
        //输入框内中文当做两个英文或数字
        .directive("chineseWordCount", [
            function ($window, $timeout) {
                return {
                    require: "^ngModel",
                    restrict: "A",
                    scope: {},
                    link: function (scope, elem, attrs, ngmodel) {

                        scope.ngmodel = ngmodel;
                        //输入框字数限制
                        scope.$watch("ngmodel.$viewValue", function (newVal, oldVal) {
                            if (newVal !== oldVal) {

                                if (scope.getStrleng(newVal) > attrs.maxlength) {

                                    var oldStrLength = oldVal ? oldVal.length : 0;

                                    scope.inputModel = substrByDiffChineseAndEnglish(newVal, attrs.maxlength, oldStrLength);

                                    scope.ngmodel.$setViewValue(scope.inputModel);
                                    scope.ngmodel.$render();
                                }
                            }
                        });


                        scope.getStrleng = function (str) {
                            str = str || "";
                            var chineseWord = str.match(/[^\x00-\x80]/g);
                            chineseWord = chineseWord || [];
                            return str.length + chineseWord.length
                        };

                        //Distinguish between Chinese and English
                        function substrByDiffChineseAndEnglish(str, maxLength, oldStrLength) {
                            var strLengthByDiff = scope.getStrleng(str);
                            var myLenByDiff = scope.getStrleng(str.substr(0, oldStrLength));
                            if (myLenByDiff >= maxLength) {
                                if (myLenByDiff == maxLength) {
                                    return str.substr(0, oldStrLength);
                                } else {
                                    oldStrLength = 0;
                                    myLenByDiff = 0;
                                }
                            }
                            for (var i = oldStrLength; i < str.length; i++) {
                                //if (str.charCodeAt(i) >= 0 && str.charCodeAt(i) <= 128) {
                                if (str[i].match(/[\x00-\x80]/g)) {
                                    myLenByDiff++;
                                } else {
                                    myLenByDiff += 2;
                                }
                                if (myLenByDiff > maxLength) {
                                    return str.substr(0, i);
                                }
                            }
                        }


                    }
                };
            }
        ])
        .directive('errSrc', [function () {
            return {
                link: function (scope, element, attrs) {
                    element.bind('error', function () {
                        if (attrs.src != attrs.errSrc) {
                            attrs.$set('src', attrs.errSrc);
                        }
                    });
                }
            };
        }]);


});