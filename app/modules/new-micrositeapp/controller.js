"use strict";
/**
 * author :小潘
 * time: 2015年12月1日 15:26:51
 * description:
 */


define(["ionic", "modules/new-micrositeapp/services"],
    function() {
        return angular.module("NewMicroSiteApp.controllers", ["NewMicroSiteApp.services"])
            .controller("NewMicroSiteAppController", [
                "$scope", "$rootScope", "microSiteAppService",
                function($scope, $rootScope, microSiteAppService) {

                    
                }
            ]);
    });