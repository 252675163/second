"use strict";
/**
 * author :小潘
 * time: 2015年9月9日 20:37:00
 * description: 微活动指令集合，按功能可拆分指令 ，拆分之后需要在app.js中重新组织模块
 */


define(["ionic"], function () {
    angular.module("MicroActivityIndexApp.directives", [])
        //课程容器指令
        .directive("helloWorld5", [
            "$window", "$timeout", function ($window, $timeout) {
                return {
                    restrict: 'EA',
                    template: "<div>hello world Demo</div>",
                    link: function (scope, iElement, iAttr) {


                    }

                }
            }]
    )

});

