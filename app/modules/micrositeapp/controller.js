"use strict";
/**
 * author :小潘
 * time: 2015年9月9日 20:59:58
 * description:
 */


define(["ionic", "modules/micrositeapp/services"],
    function() {
        return angular.module("MicroSiteApp.controllers", ["MicroSiteApp.services"])
            .controller("MicroSiteAppController", [
                "$scope", "$rootScope", "microSiteAppService",
                function($scope, $rootScope, microSiteAppService) {

                    
                }
            ]);
    });