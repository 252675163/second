 "use strict";
/**
 * author :yinglechao
 * time: 2015年9月13日
 * description: templateModel就是该模板创建的结构，自定义
 */


define(["ionic"], function() {
    angular.module("NextButton.directive", [])
        .directive("nextButton", [
                "$window", "$timeout", "$ionicLoading",function($window, $timeout,$ionicLoading) {
                    return {
                        restrict: "E",
                        scope: {
                            "activityTemplateId":"=",
                            "nextButtonType":"="
                        },
                        templateUrl: "components/next_button/template.html",
                        link: function(scope, iElement, iAttr) {
                            if(scope.activityTemplateId==5){
                                scope.type=2;
                            } else if (scope.activityTemplateId == 13 || scope.activityTemplateId == 14|| scope.activityTemplateId == 18|| scope.activityTemplateId == 19) {
                                scope.type=0;
                            }else{
                                scope.type = scope.nextButtonType;
                            }
                        }


                    };
                }
            ]
        );
});