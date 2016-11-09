"use strict";
/**
 * author:cxd
 * time:2016年7月1日19:33:30
 * description:冻结场景 推文页
 */


define(["ionic"], function () {
    return angular.module("UserRefrezeguideApp.services", ["Services.net.userCenter"])
        .service("userRefrezeguideAppService", [
            "$rootScope", "promptBarService", "commonNetService",
            function ($rootScope, promptBarService, commonNetService) {
                var service = {};

                service.getFrezecause = function (scenefreezeId) {
                    return commonNetService.FreezeCauseOfscenefreezeId(scenefreezeId);
                }
                service.getAppeleCause = function (appeleid) {
                    return commonNetService.getAppeleCause(appeleid);
                }

                return service;
            }
        ]);
});


