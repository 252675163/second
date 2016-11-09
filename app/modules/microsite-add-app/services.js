"use strict";
/**
 * author :LTD
 * time: 2015年9月11日 15:03:48
 * description: 微官网增加页面服务
 */


define(["ionic", "services/net/site-add"], function () {
    return angular.module("MicroSiteAddApp.services", ["services.net.siteAdd"])
        .service("MicroSiteAddAppService", [
            "$rootScope", "siteAddNetService",
            function ($rootScope, siteAddNetService) {
                var MicroSiteAddAppService = {};

                MicroSiteAddAppService.getSection = function (templateId,pageIndex, pageSize, filter) {
                    return siteAddNetService.getSection(templateId,pageIndex, pageSize, filter);
                }

                return MicroSiteAddAppService;
            }
        ]);
});


