"use strict";
/**
 * author :yinglechao
 * time: 2015年10月20日
 * description: templateModel就是该模板创建的结构，自定义
 */


define(["ionic", "components/templates/micro-activity-template/template13_1/service"], function () {
    angular.module("Template13_1Step1.directives", ['Template13_1.Service'])
        .directive("template13by1Step1", [
            "$window", "$timeout", "$rootScope", "template13_1Service", "uploadImgService", "maskService", "promptBarService", "commonNetService", function ($window, $timeout, $rootScope, template13_1Service, uploadImgService, maskService, promptBarService, commonNetService) {
                return {
                    restrict: 'EA',
                    scope:false,
                    templateUrl: "components/templates/micro-activity-template/template13_1/templates_steps/template_step1.html",
                    link: function (scope, iElement, iAttr) {


                    }
                }
            }]
    )

});

