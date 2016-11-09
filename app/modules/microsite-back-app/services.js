"use strict";
/**
 * author :LTD
 * time: 2015年9月11日 15:03:48
 * description: 微官网更换背景服务
 */

define(["ionic", "services/net/site-back"], function () {
    return angular.module("MicroSiteBackApp.services", ["services.net.siteBack"])
        .service("MicroSiteBackAppService", [
            "$rootScope", "siteBackNetService",
            function ($rootScope, siteBackNetService) {
                var microSiteBackAppService = {};

                microSiteBackAppService.getBackUrl = function (templateId,pageIndex,pageSize,imgTag) {
                    return siteBackNetService.getBackUrl(templateId,pageIndex,pageSize,imgTag);
                }

                return microSiteBackAppService;
            }
        ]);
});


