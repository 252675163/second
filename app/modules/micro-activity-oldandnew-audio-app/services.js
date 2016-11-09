"use strict";
/**
 * author :LTD
 * time: 2015年9月11日 15:03:48
 * description: 微官网更换背景服务
 */

define(["ionic", "services/net/activity-audio"], function () {
    return angular.module("MicroActivityOldAndNewAudioApp.services", ["services.net.activityAudio"])
        .service("MicroActivityOldAndNewAudioAppService", [
            "$rootScope", "activityAudioNetService",
            function ($rootScope, activityAudioNetService) {
                var microActivityOldAndNewAudioAppService = {};

                microActivityOldAndNewAudioAppService.getAudios = function (templateId,pageIndex,pageSize,audioTag) {
                    return activityAudioNetService.getAudios(templateId,pageIndex,pageSize,audioTag);
                }

                return microActivityOldAndNewAudioAppService;
            }
        ]);
});


