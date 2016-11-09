"use strict";
/**
 * author :yinglechao
 * time: 2015年10月20日
 * description: templateModel就是该模板创建的结构，自定义
 */


define(["ionic"], function () {
    angular.module("MicroPoster1_1.directives", [])
        .directive("microPoster1by1", [
            "$window", "$timeout", "$interval", "$rootScope", "$q", "$filter", "$ionicScrollDelegate", "microPoster1_1Service", "uploadImgService", "maskService", "promptBarService", "commonNetService"
            , function ($window, $timeout, $interval, $rootScope, $q, $filter, $ionicScrollDelegate, microPoster1_1Service, uploadImgService, maskService, promptBarService, commonNetService) {
                return {
                    restrict: "EA",
                    templateUrl: "components/templates/micro-poster-template/micro_poster_1/micro_poster_1_1/template.html",
                    link: function (scope, iElement, iAttr) {
                        function init() {
                            if (angular.equals(scope.templateModel, {}) || angular.isUndefined(scope.templateModel)) {
                                scope.sectionModel.templateModel = angular.copy(microPoster1_1Service.model);
                                scope.templateModel = scope.sectionModel.templateModel;
                            }
                            if (angular.equals(scope.templateModel.imageUrl, []) || angular.isUndefined(scope.templateModel.imageUrl)) {
                                scope.sectionModel.templateModel.imageUrl = angular.copy(microPoster1_1Service.model.imageUrl);
                                scope.templateModel.imageUrl = scope.sectionModel.templateModel.imageUrl;
                            }
                            scope.isEdit = scope.status == "edit" ? true : false;

                            //背景图片
                            iElement[0].getElementsByClassName("bgPan")[0].style.backgroundImage = ' url' + '("' + scope.sectionModel.backgroundImage + '")';
                            iElement[0].getElementsByClassName("bgPan")[0].style.backgroundSize = "100% 100%";
                            scope.$watch('sectionModel.backgroundImage', function (newValue, oldValue, scope) {
                                if (newValue != oldValue) {
                                    iElement[0].getElementsByClassName("bgPan")[0].style.backgroundImage = 'url' + '("' + scope.sectionModel.backgroundImage + '")';
                                }
                            });
                        }

                        init();

                        scope.upLoadHeadImgFinish = function (url) {
                            $timeout(function () {
                                scope.$apply(function () {
                                    scope.sectionModel.templateModel.imageUrl[scope.imgIndex] = url;
                                });
                            });
                        };
                        scope.updateImg = function (index) {
                            scope.imgIndex = index;
                            if (!scope.isEdit) {
                                return
                            }
                            uploadImgService.upLoadImg(microPoster1_1Service.getConfigByAspectRatio(1), 1, scope.upLoadHeadImgFinish);
                           
                        };

                        scope.inputconfig = [
                            {
                                width: 520,
                                height: 60,
                                fontSize: 56
                            },
                            {
                                width: 450,
                                height: 45,
                                fontSize: 36
                            }
                        ]
                    }
                };
            }
        ]
        );
});