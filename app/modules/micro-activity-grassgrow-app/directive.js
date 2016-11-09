"use strict";
/**
 * author :小宝
 * time: 2015年9月11日 
 * description: 种草活动
 */


define(["ionic"],function () {
    angular.module("MicroActivityGrassGrowApp.directives", [])
        
        .directive("helloWorld2", [
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

