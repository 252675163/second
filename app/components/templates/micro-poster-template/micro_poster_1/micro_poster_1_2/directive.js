"use strict";
/**
 * author :zhouhuijuan
 * time: 2016年6月29日
 * description: templateModel就是该模板创建的结构，自定义
 */


define(["ionic", "components/multi_textinput/app", "components/textinput_callback/app"], function () {
    angular.module("MicroPoster1_2.directives", ["MultiTextInput", "TextInputCallback"])
        .directive("microPoster1by2", [
            "$window", "$timeout", "$rootScope", "microPoster1_2Service", "uploadImgService", "maskService", "promptBarService", "multiTextInputService", "textInputCallbackService", "commonNetService",
            function ($window, $timeout, $rootScope, microPoster1_2Service, uploadImgService, maskService, promptBarService, multiTextInputService, textInputCallbackService, commonNetService) {
                return {
                    restrict: 'EA',
                    templateUrl: "components/templates/micro-poster-template/micro_poster_1/micro_poster_1_2/template.html",
                    link: function (scope, iElement, iAttr) {

                        function init() {
                            if (angular.equals(scope.templateModel, {}) || angular.isUndefined(scope.templateModel)) {
                                scope.sectionModel.templateModel = angular.copy(microPoster1_2Service.model);
                                scope.templateModel = scope.sectionModel.templateModel;
                            }
                            if (angular.equals(scope.templateModel.imageUrl, []) || angular.isUndefined(scope.templateModel.imageUrl)) {
                                scope.sectionModel.templateModel.imageUrl = angular.copy(microPoster1_2Service.model.imageUrl);
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
                            uploadImgService.upLoadImg(microPoster1_2Service.getConfigByAspectRatio(1), 1, scope.upLoadHeadImgFinish);
                         
                        };
                        scope.inputconfig = [
                            {
                                width: 500,
                                height: 50,
                                fontSize: 40
                            },
                            {
                                width: 560,
                                height: 234,
                                fontSize: 24
                            }
                        ]

                    }

                }
            }]
        )

});

