"use strict";
/**
 * author :LTD
 * time: 2015年9月11日 15:03:48
 * description: 微官网更换背景服务
 */

define(["ionic", "services/net/site-view"], function () {
    return angular.module("MicroSiteViewApp.services", ["services.net.siteView"])
        .service("MicroSiteViewAppService", [
            "$rootScope", "siteViewNetService",
            function ($rootScope, siteViewNetService) {
                var microSiteViewAppService = {};

                microSiteViewAppService.getModel = function (webSiteId) {
                    return siteViewNetService.getModel(webSiteId);
                }
                microSiteViewAppService.makeNewModel = function (orgName) {
                    return siteViewNetService.makeNewModel(orgName);
                }
                return microSiteViewAppService;
            }
        ]);
});


