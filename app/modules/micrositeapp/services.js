"use strict";
/**
 * author :小潘
 * time: 2015年9月9日 20:59:58
 * description:
 */

define(["ionic"],function () {
    return angular.module("MicroSiteApp.services", [])
        .service("microSiteAppService", [
            "$rootScope",
            function ($rootScope) {
                var microSiteAppService = {};


                return microSiteAppService;
            }
        ]);
});


