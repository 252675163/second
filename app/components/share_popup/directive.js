"use strict";
/**
 * author :zhouhuijuan
 * time: 2016年4月20日
 * description:
 */


define(["ionic"], function () {
    angular.module("SharePopup.directive", [])
        .directive("sharePopup", [
                "$window", "$timeout", "$rootScope", "sharePopupService", "uploadImgService", function ($window, $timeout, $rootScope, sharePopupService, uploadImgService) {
                    return {
                        restrict: "EA",
                        scope: {
                            
                        },
                        templateUrl: "components/share_popup/template.html",
                        link: function (scope, iElement, iAttr) {
                            //关闭弹窗
                            scope.closePopup = function () {
                                scope.config.isShow = false;
                                scope.config.isShare = false;
                            };
                            scope.config = sharePopupService.config;
                            scope.imgConfig = sharePopupService.imgConfig;
                            //保存
                            scope.save=function() {
                                scope.config.saveCallback();
                            }
                            //分享
                            scope.share=function() {
                                scope.config.shareCallback();
                            }
                            scope.changeShareImage = function () {
                                uploadImgService.upLoadImg(scope.imgConfig, 1, scope.upLoadFinish);
                            };
                            scope.upLoadFinish = function (url) {
                                $timeout(function () {
                                    scope.$apply(function () {
                                        scope.config.shareModel.imgUrl = url;
                                    });
                                }, 0);
                            };
                            //路由发生变化，裁剪框消失
                            var stateChangeStart = $rootScope.$on("$stateChangeStart",
                                function (event, toState, toParams, fromState, fromParams) {
                                    scope.closePopup();
                                });

                            //销毁rootScope上的事件
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