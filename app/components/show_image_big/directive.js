"use strict";
/**
 * author :yinglechao
 * time: 2015年9月13日
 * description: templateModel就是该模板创建的结构，自定义
 */


define(["ionic"], function() {
    angular.module("showImageBig.directive", [])
        .directive("showImageBig", [
                "$window", "$timeout", "$rootScope", "$ionicSlideBoxDelegate", "showImageBigService", "$ionicScrollDelegate",
                function($window, $timeout, $rootScope, $ionicSlideBoxDelegate, showImageBigService, $ionicScrollDelegate) {
                    return {
                        restrict: "E",
                        //继承父作用域
                        scope: true,
                        templateUrl: "components/show_image_big/template.html",
                        link: function(scope, iElement, iAttr) {
                            scope.info = showImageBigService.info;

                            scope.$watch("info.isShow", function(nv, ov) {
                                if (nv == ov) {
                                    return;
                                }
                                if (scope.info.isShow == false) {
                                    return;
                                }
                                //if (scope.info.templateName == "site-news") {
                                //    for (var i = 0; i < scope.modules.length; i++) {
                                //        if (scope.modules[i].templateName == "site-news") {
                                //            scope.templateModel = scope.modules[i].templateModel.News[scope.info.newsIndex];
                                //        }
                                //    }
                                //} else {
                                //    for (var i = 0; i < scope.modules.length; i++) {
                                //        if (scope.modules[i].templateName == scope.info.templateName) {
                                //            scope.templateModel = scope.modules[i].templateModel;
                                //        }
                                //    }

                                scope.imageUrl = scope.info.imageUrl;

                                iElement.find(".cardEdit_modal").one("click", function() {
                                    $timeout(function() {
                                        scope.info.isShow = false;
                                    }, 0);
                                });
                                $timeout(function() {
                                    $ionicSlideBoxDelegate.update();
                                }, 50);
                                //    .then(function () {
                                //    $ionicSlideBoxDelegate.slide(scope.info.imageIndex,0);
                                //});
                                $ionicScrollDelegate.$getByHandle("showBigImgContent").scrollTop();


                            });

                            scope.deleteImage = function() {
                                scope.imageUrl.splice(scope.info.imageIndex, 1);
                                $ionicSlideBoxDelegate.update();
                                scope.info.isShow = false;
                            };

                            scope.onSlideChanged = function(index) {
                                scope.info.imageIndex = index;
                                $ionicScrollDelegate.$getByHandle("showBigImgContent").scrollTop();
                            };

                            var stateChangeStart = $rootScope.$on("$stateChangeStart", function(event, toState, toParams, fromState, fromParams) {
                                scope.info.isShow = false;
                            });

                            //销毁rootScope上的事件
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