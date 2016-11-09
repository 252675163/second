"use strict";
/**
 * author :陈雪冬
 * time: 2016年7月27日17:11:31
 * description: 微海报2
 */


define(["ionic", "components/multi_textinput/app", "components/textinput_callback/app"], function () {
    angular.module("MicroPoster2_7.directives", ["MultiTextInput", "TextInputCallback"])
        .directive("microPoster2by7", [
            "$window", "$timeout", "$rootScope", "microBoster2_7Service", "uploadImgService", "maskService", "promptBarService", "multiTextInputService", "textInputCallbackService","commonNetService", 
            function ($window, $timeout, $rootScope, microBoster2_7Service, uploadImgService, maskService, promptBarService,multiTextInputService,textInputCallbackService, commonNetService) {
                return {
                    restrict: 'EA',
                    templateUrl: "components/templates/micro-poster-template/micro_poster_2/micro_poster_2_7/template.html",
                    link: function (scope, iElement, iAttr) {
                        function init() {
                            if (angular.equals(scope.templateModel, {}) || angular.isUndefined(scope.templateModel)) {
                                scope.sectionModel.templateModel = angular.copy(microBoster2_7Service.model);
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
                                width: 380,
                                height: 320,
                                fontSize: 24
                            },
                            {
                                width: 160,
                                height: 50,
                                fontSize: 50
                            }
                        ]
                    }

                }
            }]
        )

});

