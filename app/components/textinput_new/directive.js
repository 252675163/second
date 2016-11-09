"use strict";
/**
 * author :lvli
 * time: 
 * description: 
 */


define(["ionic"], function () {
    angular.module("NewTextInput.directive", [])
        .directive("newTextInput", [
            "$window", "$timeout", "$q", "$ionicScrollDelegate", function ($window, $timeout, $q, $ionicScrollDelegate) {
                return {
                    restrict: "E",
                    //隔离作用域
                    scope: {},
                    templateUrl: "components/textinput_new/textinput_new.html",
                    link: function (scope, iElement, iAttr) {
                        //是否显示输入框
                        scope.isShow = false;
                        function disableMove(e) {
                            //                                e.preventDefault();
                            if (ionic.tap.isTextInput(e.target) && e.target.scrollHeight > 100) {
                                return e;
                            } else {
                                e.preventDefault();
                            }
                        }

                        var wordPerLine = 0,
                            lineNum = 0,
                            defaultMaxLine = 7;
                        var defaultInputConfig = {
                            isReplace: false,
                            isDiff: true,        //是否区分中英文和全角
                            width: 0,            //宽度
                            height: 0,           //高度
                            fontSize: 0,         //字体大小
                            lineHeight: 0,       //行高
                            isFixHeight: true,   //是否固定高度
                            tagName: "div",      //html标签名
                            rows: 0              //行数
                        };
                        var inputConfig;


                        function getWordPerLine(str) {
                            var len = 0;
                            str = !str ? "" : str;
                            for (var i = 0, l = str.length; i < l; i++) {
                                if (str[i].match(/[^\x00-\xff]/ig) && inputConfig.isDiff) {
                                    len += 2;
                                }
                                else {
                                    len += 1;
                                }
                            }
                            return len;
                        }

                        function getStringAndLength(str) {
                            var strObj = {
                                length: 0,
                                value: ""
                            };
                            var strArr = str.split("\n"),
                                isMaxLen = false;
                            for (var i = 0, aLen = strArr.length; i < aLen && !isMaxLen; i++) {
                                var lstr = strArr[i],
                                    len = getWordPerLine(lstr);
                                if (i != strArr.length - 1 && len < wordPerLine) {
                                    len = wordPerLine;
                                }
                                if (len > wordPerLine && i != strArr.length - 1) {
                                    len = Math.ceil(len / wordPerLine) * wordPerLine;
                                }
                                if (strObj.length + len > scope.maxLength) {
                                    var sLen = 0;
                                    lstr = !lstr ? "" : lstr;
                                    for (var j = 0, l = lstr.length; j < l; j++) {
                                        var wLen = lstr[j].match(/[^\x00-\xff]/ig) && inputConfig.isDiff ? 2 : 1;
                                        if (strObj.length + sLen + wLen > scope.maxLength) {
                                            strArr[i] = lstr.substr(0, j);
                                            strArr = strArr.slice(0, i + 1);
                                            len = sLen;
                                            break;
                                        }
                                        sLen += wLen;
                                    }
                                    if (!lstr) {
                                        len = 0;
                                        strArr = strArr.slice(0, i + 1);
                                    }
                                }
                                strObj.length += len;
                            }
                            strObj.value = strArr.join("\n");
                            return strObj;
                        }

                        function getLineNumber() {
                            var lineNumber = 0;
                            if (!inputConfig.isFixHeight) {
                                return defaultMaxLine;
                            }
                            if (inputConfig.tagName == "input") {
                                lineNumber = 1;
                            }
                            else {
                                lineNumber = inputConfig.rows == 0 ? parseInt(inputConfig.height / inputConfig.lineHeight) : inputConfig.rows;
                            }
                            return lineNumber;
                        }

                        function getInputWordPerLine() {
                            var wordNum = parseInt(inputConfig.width / inputConfig.fontSize);
                            //textarea标签下，手机显示的字数比实际算出的字数要少1;
                            if (inputConfig.tagName == "textarea") {
                                wordNum -= 1;
                            }
                            return wordNum * 2;
                        }

                        scope.$on("newCustomInput", function (event, obj) {
                            scope.moveEvent = ionic.on("touchmove", disableMove, document);
                            scope.$evalAsync(function () {
                                if (obj.ngModel) {
                                    inputConfig = angular.copy(defaultInputConfig, {});
                                    inputConfig = obj.inputConfig && obj.inputConfig.constructor === Object ? angular.extend({}, inputConfig, obj.inputConfig) : inputConfig;
                                    wordPerLine = getInputWordPerLine();
                                    lineNum = getLineNumber();
                                    scope.isShow = true;
                                    scope.inputModel = obj.ngModel.$viewValue;
                                    scope.ngModel = obj.ngModel;
                                    scope.maxLength = wordPerLine * lineNum;
                                    scope.isReplace = inputConfig.isReplace;
                                    scope.isDiff = inputConfig.isDiff;//是否区分中英文
                                    //                                        scope.currentLength = scope.getStrleng(scope.inputModel);
                                    //将br替换为\n
                                    scope.inputModel = scope.inputModel.replace(/<br\s*\/?\s*>/ig, "\n");
                                    var strObj = getStringAndLength(scope.inputModel);
                                    scope.currentLength = strObj.length;
                                    var remainingWords = parseInt((scope.maxLength - scope.currentLength) / 2);
                                    scope.remainingWords = remainingWords < 0 ? 0 : remainingWords;
                                    //if (scope.isDiff) {
                                    //    scope.currentLength = scope.getStrleng(scope.inputModel);
                                    //} else {
                                    //    scope.currentLength = scope.inputModel.length;
                                    //}
                                    //scope.checkWord();
                                    //                                        $(iElement.find("#customInput")).focus();


                                    $timeout(function () {
                                        var obj = iElement.find("#customInput")[0];
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

                            });

                        });

                        //输入框字数限制
                        scope.$watch("inputModel", function (newVal, oldVal) {
                            if (newVal !== oldVal) {
                                var strObj = getStringAndLength(scope.inputModel);
                                scope.currentLength = strObj.length;
                                var remainingWords = parseInt((scope.maxLength - scope.currentLength) / 2);
                                scope.remainingWords = remainingWords < 0 ? 0 : remainingWords;
                                scope.inputModel = strObj.value;
                            }
                        });

                        // 关闭输入框
                        scope.close = function () {
                            ionic.off("touchmove", disableMove, document);
                            scope.isShow = false;
                            if (scope.isReplace) {
                                var value = scope.inputModel.replace(/\n/g, "<br/>");
                                scope.inputModel = value;
                            }
                            scope.ngModel.$setViewValue(scope.inputModel);
                            scope.ngModel.$render();
                        };



                    }


                };
            }
        ]
    );
});