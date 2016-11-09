"use strict";
/**
 * author :小潘
 * time: 2015年11月7日 16:47:13
 * description: 输入框获取焦点时，弹出新的输入框
 */


define(["ionic"], function () {
    angular.module("TextInput.directive", [])
        .directive("textInput", [
            "$window", "$timeout", "$q", "$ionicScrollDelegate", function ($window, $timeout, $q, $ionicScrollDelegate) {
                return {
                    restrict: "E",
                    //隔离作用域
                    scope: {},
                    templateUrl: "components/textinput/text_input.html",
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


                        scope.$on("customInput", function (event, obj) {
                            scope.moveEvent = ionic.on("touchmove", disableMove, document);
                            scope.$evalAsync(function () {
                                if (obj.ngModel) {
                                    scope.isShow = true;
                                    scope.inputModel = obj.ngModel.$viewValue;
                                    scope.oldValueText = angular.copy(obj.ngModel.$viewValue);
                                    scope.ngModel = obj.ngModel;
                                    scope.maxLength = obj.maxLength;
                                    scope.isReplace = obj.isReplace;
                                    scope.isDiff = obj.isDiff;//是否区分中英文
                                    //                                        scope.currentLength = scope.getStrleng(scope.inputModel);
                                    //将br替换为\n
                                    scope.inputModel = scope.inputModel.replace(/<br\s*\/?\s*>/ig, "\n");
                                    if( scope.isDiff){
                                        scope.currentLength = scope.getStrleng(scope.inputModel);
                                    }else{
                                        scope.currentLength = scope.inputModel.length;
                                    }
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
                        //Distinguish between Chinese and English
                        function substrByDiffChineseAndEnglish(str, maxLength, oldStrLength) {
                            var strLengthByDiff = scope.getStrleng(str);
                            var myLenByDiff  = scope.getStrleng(str.substr(0, oldStrLength));
                            if(myLenByDiff>=maxLength){
                                if(myLenByDiff==maxLength){
                                    return  str.substr(0, oldStrLength);
                                }else{
                                    oldStrLength = 0;
                                    myLenByDiff = 0;
                                }
                            }
                            for (var i = oldStrLength; i < str.length; i++) {
                                //if (str.charCodeAt(i) >= 0 && str.charCodeAt(i) <= 128) {
                                if (str[i].match(/[\x00-\x80]/g)) {
                                    myLenByDiff++;
                                }else {
                                    myLenByDiff += 2;
                                }
                                if(myLenByDiff>maxLength){
                                    return  str.substr(0, i);
                                }
                            }
                        }

                        //输入框字数限制
                        scope.$watch("inputModel", function (newVal, oldVal) {
                            if (newVal !== oldVal) {
                                if( scope.isDiff){
                                    scope.currentLength = scope.getStrleng(newVal);
                                }else{
                                    scope.currentLength = newVal.length;
                                }

                                if (scope.getStrleng(newVal) > scope.maxLength) {
                                    //todo
                                    var oldStrLength = oldVal?oldVal.length:0;

                                    if( scope.isDiff){
                                        scope.inputModel = substrByDiffChineseAndEnglish(newVal,scope.maxLength,oldStrLength);
                                        scope.currentLength = scope.getStrleng(scope.inputModel);
                                    }else{
                                        scope.inputModel = newVal.substr(0, scope.maxLength);
                                        scope.currentLength = scope.inputModel.length;
                                    }
                                    //scope.checkWord();
                                    // scope.inputModel = newVal.substr(0, scope.maxLength);
                                }
                            }
                        });

                        //确认
                        scope.sure = function () {
                            ionic.off("touchmove", disableMove, document);
                            scope.isShow = false;
                            if (scope.isReplace) {
                                var value = scope.inputModel.replace(/\n/g, "<br/>");
                                scope.inputModel = value;
                            }
                            scope.ngModel.$setViewValue(scope.inputModel);
                            scope.ngModel.$render();
                        };

                        //取消
                        scope.cancel = function () {
                            ionic.off("touchmove", disableMove, document);
                            scope.isShow = false;

                            scope.ngModel.$setViewValue(scope.oldValueText);
                            scope.ngModel.$render();
                        }

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
                            str = str||"";
                            var chineseWord = str.match(/[^\x00-\x80]/g);
                            chineseWord = chineseWord||[];
                            return str.length + chineseWord.length


                        };


                    }


                };
            }
        ]
    );
});