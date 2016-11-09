"use strict";
/**
 * author :小潘
 * time: 2015年9月9日 20:59:58
 * description:
 */


define(["ionic", "modules/microactivityapp/services"],
    function() {
        return angular.module("MicroActivityApp.controllers", ["MicroActivityApp.services"])
            .controller("MicroActivityAppController", [
                "$scope", "$rootScope", "microActivityAppService",
                function($scope, $rootScope, microActivityAppService) {
                   
                }
            ]);
    });