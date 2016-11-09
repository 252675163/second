"use strict";
/**
 * author :yinglechao
 * time: 2015年10月20日
 * description: templateModel就是该模板创建的结构，自定义
 */


define(["ionic", "components/templates/micro-activity-template/template23_1/service"], function () {
    angular.module("Template23_1Step1.directives", ['Template23_1.Service'])
        .directive("template23by1Step1", [
            "$window", "$timeout", "$rootScope", "template23_1Service", "uploadImgService", "maskService", "promptBarService", "commonNetService", function ($window, $timeout, $rootScope, template23_1Service, uploadImgService, maskService, promptBarService, commonNetService) {
                return {
                    restrict: 'EA',
                    templateUrl: "components/templates/micro-activity-template/template23_1/templates_steps/template_step1.html",
                    link: function (scope, iElement, iAttr) {
                    }
                }
            }]
    )

});

