"use strict";
/**
 * author :xj
 * time: 2016年5月10日 16:48:04
 * description:带回调的输入框
 */


define(["ionic"], function () {
    angular.module("TextInputCallback.directive", [])
        .directive("textInputCallback", [
            "$window", "$timeout", "textInputCallbackService",
            function ($window, $timeout, textInputCallbackService) {
                return {
                    restrict: "E",
                    scope: {},
                    templateUrl: "components/textinput_callback/template.html",
                    link: function (scope, iElement, iAttr) {

                        textInputCallbackService.reRender = function () {

                            scope.isShow = textInputCallbackService.data.isShow;
                            scope.inputModel = textInputCallbackService.data.currentValue || "";
                            scope.callbackFun = textInputCallbackService.data.callBack;

                            //字符限制相关
                            scope.isDiff = textInputCallbackService.data.isDiff;
                            scope.maxLength = textInputCallbackService.data.maxLength;
                            scope.type = textInputCallbackService.data.type;
                            scope.placeholder = textInputCallbackService.data.placeholder;

                            //将br替换为\n
                            scope.inputModel = scope.inputModel.replace(/<br\s*\/?\s*>/ig, "\n");

                            if (scope.isDiff) {
                                scope.currentLength = scope.getStrleng(scope.inputModel);
                            } else {
                                scope.currentLength = scope.inputModel.length;
                            }

                            $timeout(function () {
                                var obj = iElement.find("#customInputCallback")[0];
                                obj.focus();
                                var len = obj.value.length;
                                if (document.selection) {
                                    var sel = obj.createTextRange();
                                    sel.moveStart("character", len);
                                    sel.collapse();
                                    sel.select();
                                } else if (typeof obj.selectionStart == "number" && typeof obj.selectionEnd == "number") {
                                    obj.selectionStart = obj.selectionEnd = len;
                                }
                            });

                        }

                        //页面切换时隐藏输入框
                        textInputCallbackService.hideTextInput = function () {
                            scope.isShow = false;
                        }


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

                        //输入框字数限制
                        scope.$watch("inputModel", function (newVal, oldVal) {
                            if (newVal !== oldVal) {
                                if (scope.isDiff) {
                                    scope.currentLength = scope.getStrleng(newVal);
                                } else {
                                    scope.currentLength = newVal.length;
                                }

                                if (scope.getStrleng(newVal) > scope.maxLength) {
                                    //todo
                                    var oldStrLength = oldVal ? oldVal.length : 0;

                                    if (scope.isDiff) {
                                        scope.inputModel = substrByDiffChineseAndEnglish(newVal, scope.maxLength, oldStrLength);
                                        scope.currentLength = scope.getStrleng(scope.inputModel);
                                    } else {
                                        scope.inputModel = newVal.substr(0, scope.maxLength);
                                        scope.currentLength = scope.inputModel.length;
                                    }
                                    //scope.checkWord();
                                    // scope.inputModel = newVal.substr(0, scope.maxLength);
                                }
                            }
                        });


                        //检查输入字符数
                        scope.checkWord = function () {

                            scope.currentLength = scope.getStrleng(scope.inputModel);
                            // scope.currentLength = scope.inputModel.length;

                        };

                        // cnchar=entryval.match(/[^x00-x80]/g)
                        //todo 暂时不区分英文中文
                        scope.getStrleng = function (str) {
                            //TODO  是否区分中英文
                            //var myLen = 0;
                            //var i = 0;
                            //for (; (i < str.length); i++) {
                            //    if (str.charCodeAt(i) > 0 && str.charCodeAt(i) < 128)
                            //        myLen++;
                            //    else {
                            //        myLen += 2;
                            //    }
                            //}
                            //return myLen;
                            str = str || "";
                            var chineseWord = str.match(/[^\x00-\x80]/g);
                            chineseWord = chineseWord || [];
                            return str.length + chineseWord.length


                        };

                        scope.getCurrentValue = function () {
                            if (scope.isDiff) {
                                return Math.ceil(scope.currentLength / 2);
                            }
                            else {
                                return scope.currentLength;
                            }
                        }

                        scope.getMaxValue = function () {
                            if (scope.isDiff) {
                                return parseInt(scope.maxLength / 2);
                            }
                            else {
                                return parseInt(scope.maxLength);
                            }
                        }

                        scope.cancel = function () {
                            scope.isShow = false;
                        }
                        scope.callback = function () {
                            textInputCallbackService.data.currentValue = scope.inputModel; 
                            if (scope.callbackFun) {
                                var result = scope.callbackFun();
                                if (angular.isUndefined(result)) {

                                } else {
                                    result = !result;
                                    scope.isShow = result || false;
                                    return;
                                }
                            }
                            scope.isShow = false;
 
                        }

                    }
                };
            }
        ])
});