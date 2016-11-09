"use strict";
/**
 * author :LTD
 * time: 2015年9月11日 15:03:48
 * description: 微官网增加页面服务
 */


define(["ionic", "services/net/activity-back"], function () {
    return angular.module("MicroActivityOldAndNewBackApp.services", ["services.net.activityBack"])
        .service("MicroActivityOldAndNewBackAppService", [
            "$rootScope", "activityBackNetService",
            function ($rootScope, activityBackNetService) {
                var microActivityOldAndNewBackAppService = {};

                microActivityOldAndNewBackAppService.getBackUrl = function (templateId,pageIndex,pageSize,imgTag) {
                    return activityBackNetService.getBackUrl(templateId,pageIndex,pageSize,imgTag);
                }

                return microActivityOldAndNewBackAppService;
            }
        ]);
});


