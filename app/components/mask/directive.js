"use strict";
/**
 * author :yinglechao
 * time: 2015年9月13日
 * description: templateModel就是该模板创建的结构，自定义
 */


define(["ionic"], function() {
    angular.module("Mask.directive", [])
        .directive("customMask", [
                "$window", "$timeout", "$rootScope", "maskService", "$ionicLoading", function($window, $timeout, $rootScope, maskService, $ionicLoading) {
                    return {
                        restrict: "E",
                        scope: {},
                        templateUrl: "components/mask/template.html",
                        link: function(scope, iElement, iAttr) {
                            scope.mask = maskService.mask;

                            scope.hideMask = function() {
                                scope.mask.isShow = false;
                            };
                            maskService.showModal = function () {
                                scope.mask.isShow = true;
                                scope.mask.type = 51;
                            };
                         
                            maskService.initModal = function (ele) {
                                iElement.find(".element_js").children()&&iElement.find(".element_js").children().remove()
                                iElement.find(".element_js").append(ele);
                                //scope.mask.isShow = true;
                                //scope.mask.type = 51;
                            };
                            maskService.hideModal = function () {
                                scope.mask.isShow = false;
                            };
                            //初始化时带上回调函数
                            scope.hideMaskWithCallback = function () {
                                scope.mask.callback();
                                scope.mask.isShow = false;
                            };

                            var stateChangeStart = $rootScope.$on("$stateChangeStart",
                                function(event, toState, toParams, fromState, fromParams) {
                                    scope.hideMask();
                                });


                            scope.$on("$destroy", function() {
                                //destroy the ui.router [stateChageStart] event  
                                stateChangeStart();
                            });
                        }

                    };
                }
            ]
        );
});