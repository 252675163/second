"use strict";
/**
 * author :yinglechao
 * time: 2015年9月13日
 * description: templateModel就是该模板创建的结构，自定义
 */


define(["ionic"], function() {
    angular.module("PromptBar.directive", [])
        .directive("promptBar", [
                "$window", "$timeout", "promptBarService", function($window, $timeout, promptBarService) {
                    return {
                        restrict: "E",
                        scope: {},
                        templateUrl: "components/prompt_bar/template.html",
                        link: function(scope, iElement, iAttr) {
                            scope.promptBarInfo = promptBarService.promptBarInfo;
                            scope.closeRemind = function() {
                                promptBarService.promptBarInfo.isShow = false;
                            };

                        }

                    };
                }
            ]
        );
});