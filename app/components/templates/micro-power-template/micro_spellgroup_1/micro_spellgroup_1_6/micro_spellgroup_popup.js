"use strict";
/**
 * author :zhouhuijuan
 * time: 2016年6月29日
 * description: templateModel就是该模板创建的结构，自定义
 */


define(["ionic", "components/multi_textinput/app", "components/textinput_callback/app"], function () {
    angular.module("MicroSpellgroup1_6_1.directives", ["MultiTextInput", "TextInputCallback"])
        .directive("microSpellgroup1by6by1", [
            "$window", "$timeout", "$rootScope", "microSpellgroup1_6Service", "uploadImgService", "maskService", "promptBarService", "multiTextInputService", "textInputCallbackService", "commonNetService", "$compile", function ($window, $timeout, $rootScope, microSpellgroup1_6Service, uploadImgService, maskService, promptBarService, multiTextInputService, textInputCallbackService, commonNetService, $compile) {
                return {
                    restrict: 'EA',
                    templateUrl: "components/templates/micro-power-template/micro_spellgroup_1/micro_spellgroup_1_6/micro_spellgroup_popup.html",
                    link: function (scope, iElement, iAttr) {
                        scope.hideMask = function () {
                            maskService.hideModal();
                            iElement.remove();
                        }
                    }

                }
            }]
        )

});

