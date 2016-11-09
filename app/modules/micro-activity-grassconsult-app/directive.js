"use strict";
/**
 * author :小宝
 * time: 2015年9月11日 
 * description: 种草活动
 */


define(["ionic"],function () {
    angular.module("MicroActivityGrassConsultApp.directives", [])
        
        .directive("helloWorld1", [
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

