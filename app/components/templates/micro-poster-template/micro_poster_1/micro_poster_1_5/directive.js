"use strict";
/**
 * author :zhouhuijuan
 * time: 2016年6月29日
 * description: templateModel就是该模板创建的结构，自定义
 */


define(["ionic", "components/multi_textinput/app", "components/textinput_callback/app"], function () {
    angular.module("MicroPoster1_5.directives", ["MultiTextInput", "TextInputCallback"])
        .directive("microPoster1by5", [
            "$window", "$timeout", "$rootScope", "microPoster1_5Service", "uploadImgService", "maskService", "promptBarService", "multiTextInputService", "textInputCallbackService", "commonNetService",
            function ($window, $timeout, $rootScope, microPoster1_5Service, uploadImgService, maskService, promptBarService, multiTextInputService, textInputCallbackService, commonNetService) {
                return {
                    restrict: 'EA',
                    templateUrl: "components/templates/micro-poster-template/micro_poster_1/micro_poster_1_5/template.html",
                    link: function (scope, iElement, iAttr) {

                        function init() {
                            if (angular.equals(scope.templateModel, {}) || angular.isUndefined(scope.templateModel)) {
                                scope.sectionModel.templateModel = angular.copy(microPoster1_5Service.model);
                                scope.templateModel = scope.sectionModel.templateModel;
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
                        scope.inputconfig = [
                            {
                                width: 312,
                                height: 40,
                                fontSize: 40
                            },
                            {
                                width: 450,
                                height: 720,
                                fontSize: 24
                            }
                        ];
                    }
                }

            }]
        )

});

