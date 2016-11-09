"use strict";
/**
 * author :xj
 * time: 2016年5月10日 16:48:04
 * description:带回调的输入框
 */


define(["ionic"], function () {
    angular.module("MultiTextInput.directive", [])
        .directive("multiTextInput", [
            "$window", "$timeout", "multiTextInputService",
            function ($window, $timeout, multiTextInputService) {
                return {
                    restrict: "E",
                    scope: {},
                    templateUrl: "components/multi_textinput/template.html",
                    link: function (scope, iElement, iAttr) {

                        multiTextInputService.reRender = function () {

                            scope.isShow = multiTextInputService.data.isShow;
                            scope.viewList = multiTextInputService.data.viewList;
                            angular.forEach(scope.viewList, function (item) {
                                item.inputModel = item.currentValue || "";
                            });
                            scope.callbackFun = multiTextInputService.data.callBack;

                            //字符限制相关
                            scope.isDiff = multiTextInputService.data.isDiff;

                            //将br替换为\n
                            /*angular.forEach(scope.viewList, function (item) {
                                item.inputModel = item.inputModel.replace(/<br\s*\/?\s*>/ig, "\n");
                            });
                            */
                            if (scope.isDiff) {
                                angular.forEach(scope.viewList, function (item) {
                                    item.currentLength = scope.getStrleng(item.inputModel);
                                });
                            } else {
                                angular.forEach(scope.viewList, function (item) {
                                    item.currentLength = item.inputModel.length;
                                });
                            }

                            /* $timeout(function () {
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
                             */
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
                        
                            scope.$watch("viewList", function (newVal, oldVal) {
                              angular.forEach(newVal, function (item,key) {
                                if (newVal !== oldVal) {
                                    if (scope.isDiff) {
                                        item.currentLength = scope.getStrleng(item.inputModel);
                                    } else {
                                        item.currentLength = item.inputModel.length;
                                    }
                                    if (scope.getStrleng(item.inputModel) > item.maxLength) {
                                        //todo
                                        var oldStrLength = oldVal ? oldVal[key].inputModel.length : 0;

                                        if (scope.isDiff) {
                                            item.inputModel = substrByDiffChineseAndEnglish(item.inputModel, item.maxLength, oldStrLength);
                                            item.currentLength = scope.getStrleng(item.inputModel);
                                        } else {
                                            item.inputModel = item.inputModel.substr(0, item.maxLength);
                                            item.currentLength = item.inputModel.length;
                                        }
                                        //scope.checkWord();
                                        // scope.inputModel = newVal.substr(0, scope.maxLength);
                                    }
                                }
                              });
                            },true);
                        
                        scope.getStrleng = function (str) {
                            str = str || "";
                            var chineseWord = str.match(/[^\x00-\x80]/g);
                            chineseWord = chineseWord || [];
                            return str.length + chineseWord.length;


                        };
                        scope.getCurrentValue = function (item) {
                            if (scope.isDiff) {
                                return Math.ceil(item.currentLength / 2);
                            }
                            else {
                                return item.currentLength;
                            }
                        }
                        
                        scope.getMaxValue = function (item) {
                            if (scope.isDiff) {
                                return parseInt(item.maxLength / 2);
                            }
                            else {
                                return parseInt(item.maxLength);
                            }
                        }

                        scope.cancel = function () {
                            scope.isShow = false;
                        }
                        scope.callback = function () {
                            angular.forEach(scope.viewList, function (item) {
                                item.currentValue = item.inputModel;
                            });
                            if (scope.callbackFun) {
                                var result = scope.callbackFun();
                                result = !result;
                                scope.isShow = result || false;
                                return;
                            }
                            scope.isShow = false;
                        }



                    }
                };
            }
        ])
});