"use strict";
/**
 * author :yinglechao
 * time: 2015年10月20日
 * description: templateModel就是该模板创建的结构，自定义
 */


define(["ionic", "components/templates/micro-power-template/micro_bargain_1/micro_bargain_1_1/service"], function () {
    angular.module("MicroBargain1_1Step1.directives", ['MicroBargain1_1.Service'])
        .directive("microBargain1by1Step1", [
            "$window", "$timeout", "$rootScope", "microBargain1_1Service", "uploadImgService", "maskService", "promptBarService", "commonNetService", function ($window, $timeout, $rootScope, microBargain1_1Service, uploadImgService, maskService, promptBarService, commonNetService) {
                return {
                    restrict: 'EA',
                    scope: false,
            
                    templateUrl: "components/templates/micro-power-template/micro_bargain_1/micro_bargain_1_1/templates_steps/template_step1.html",
                    link: function (scope, iElement, iAttr) {


                    }
                }
            }]
    )

});

