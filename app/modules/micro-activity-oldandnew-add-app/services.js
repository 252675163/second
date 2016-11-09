"use strict";
/**
 * author :LTD
 * time: 2015年9月11日 15:03:48
 * description: 微官网增加页面服务
 */


define(["ionic", "services/net/activity-add"], function () {
    return angular.module("MicroActivityOldAndNewAddApp.services", ["services.net.activityAdd"])
        .service("MicroActivityOldAndNewAddAppService", [
            "$rootScope", "activityAddNetService",
            function ($rootScope, activityAddNetService) {
                var microActivityOldAndNewAddAppService = {};

                microActivityOldAndNewAddAppService.getSection = function (templateId,pageIndex, pageSize, filter) {
                    return activityAddNetService.getSection(templateId,pageIndex, pageSize, filter);
                }

                return microActivityOldAndNewAddAppService;
            }
        ]);
});


