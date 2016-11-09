"use strict";
/**
 * author :
 * time:
 * description:
 */


define(["ionic", "services/net/activity-new-activity"], function () {
    return angular.module("MicroActivityNewApp.services", ["services.net.activityNew"])
        .service("microActivityNewAppService", [
            "$rootScope", "activityNewNetService",
            function ($rootScope, activityNewNetService) {
                var microActivityNewAppService = {};

                microActivityNewAppService.getActivityTemplate = function (userId) {
                    return activityNewNetService.getActivityTemplate(userId);
                };

                return microActivityNewAppService;
            }
        ]);
});


