"use strict";
/**
 * author :小潘
 * time: 2015年9月9日 20:59:58
 * description:
 */


define(["ionic"], function() {
    angular.module("MicroSitePublishApp.directives", [])
        .directive("helloWorld9", [
                "$window", "$timeout", function($window, $timeout) {
                    return {
                        restrict: "EA",
                        template: "<div>hello world Demo</div>",
                        link: function(scope, iElement, iAttr) {


                        }

                    };
                }
            ]
        );
});