"use strict";
/**
 * author :yinglechao
 * time: 2015年9月13日
 * description: templateModel就是该模板创建的结构，自定义
 */


define(["ionic"], function () {
    angular.module("UserTerms.directive", [])
        .directive("userTerms", [
                "$window", "$timeout", "userTermsService", "$rootScope", function ($window, $timeout, userTermsService, $rootScope) {
                    return {
                        restrict: "E",
                        scope: false,
                        templateUrl: "components/user_terms/template.html",
                        link: function (scope, iElement, iAttr) {
                            scope.termsModel = userTermsService.termsModel;
                            scope.hideUserTerms = function () {
                                userTermsService.termsModel.isShow = false;
                            };
                            //隐藏微店用户条款
                            scope.hideMicroshopUserTerms = function () {
                                userTermsService.termsModel.isShowMicroshopUserTerms = false;
                            };
                            var stateChangeStart = $rootScope.$on("$stateChangeStart",
                                function (event, toState, toParams, fromState, fromParams) {
                                    scope.hideUserTerms();
                                });


                            scope.$on("$destroy", function () {
                                //destroy the ui.router [stateChageStart] event  
                                stateChangeStart();
                            });
                        }

                    };
                }
        ]
        );
});