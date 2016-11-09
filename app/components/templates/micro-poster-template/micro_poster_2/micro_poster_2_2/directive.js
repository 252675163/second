"use strict";
/**
 * author :陈雪冬
 * time: 2016年7月27日17:11:31
 * description: 微海报2
 */


define(["ionic", "components/multi_textinput/app", "components/textinput_callback/app"], function () {
    angular.module("MicroPoster2_2.directives", ["MultiTextInput", "TextInputCallback"])
        .directive("microPoster2by2", [
            "$window", "$timeout", "$rootScope", "microPoster2_2Service", "uploadImgService", "maskService", "promptBarService", "multiTextInputService", "textInputCallbackService", "commonNetService", function ($window, $timeout, $rootScope, microPoster2_2Service, uploadImgService, maskService, promptBarService, multiTextInputService, textInputCallbackService, commonNetService) {
                return {
                    restrict: 'EA',
                    templateUrl: "components/templates/micro-poster-template/micro_poster_2/micro_poster_2_2/template.html",
                    link: function (scope, iElement, iAttr) {
                        function init() {
                            if (angular.equals(scope.templateModel, {}) || angular.isUndefined(scope.templateModel)) {
                                scope.sectionModel.templateModel = angular.copy(microPoster2_2Service.model);
                                scope.templateModel = scope.sectionModel.templateModel;
                            }
                            if (angular.equals(scope.templateModel.imageUrl, []) || angular.isUndefined(scope.templateModel.imageUrl)) {
                                scope.sectionModel.templateModel.imageUrl = angular.copy(microPoster2_2Service.model.imageUrl);
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
                            uploadImgService.upLoadImg(microPoster2_2Service.getConfigByAspectRatio(1), 1, scope.upLoadHeadImgFinish);
                           
                        };

                        scope.inputconfig = [
                            {
                                width: 554,
                                height: 60,
                                fontSize: 60
                            },
                            {
                                width: 450,
                                height: 330,
                                fontSize: 24
                            }
                        ]
                    }

                }
            }]
        )

});

