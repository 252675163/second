"use strict";
/**
 * author :小潘
 * time: 2015年12月1日 15:29:09
 * description:
 */

define(["ionic"],function () {
    return angular.module("NewMicroSiteApp.services", [])
        .service("microSiteAppService", [
            "$rootScope",
            function ($rootScope) {
                var microSiteAppService = {};


                return microSiteAppService;
            }
        ]);
});


