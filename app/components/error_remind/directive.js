"use strict";
/**
 * author :yinglechao
 * time: 2015年9月13日
 * description: templateModel就是该模板创建的结构，自定义
 */


define(["ionic"], function () {
    angular.module("ErrorRemind.directive", [])
        .directive("errorRemind", [
                "$window", "$timeout", function ($window, $timeout) {
                    return {
                        restrict: "EA",
                        scope: {
                            myRemind: '=',
                            isShow: '='
                        },
                        templateUrl: "components/error_remind/error_remind.html",
                        link: function (scope, iElement, iAttr) {


                            //scope.isShow = false;
                            //scope.isHave = false;

                            //scope.$watch('myRemind', function (value) {
                            //    if (value) {
                            //        scope.remind = value;
                            //        scope.isShow = true;
                            //    }
                            //    else {
                            //        scope.remind = "";
                            //        scope.isShow = false;
                            //    }
                            //})
                            scope.closeRemind = function () {
                                //scope.remind = "";
                                scope.isShow = false;
                            };



                        }







                    };
                }
        ]
        );
});