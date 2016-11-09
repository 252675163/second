"use strict";
/**
 * author :LTD
 * time: 2015年9月11日 15:03:48
 * description: 微官网更换背景服务
 */

define(["ionic", "services/net/activity-view"], function() {
    return angular.module("MicroActivityOldAndNewViewApp.services", ["services.net.activityView", "services.net.templatesModel"])
        .service("MicroActivityOldAndNewViewAppService", [
            "$rootScope", "activityViewNetService", "templatesModelService",
            function($rootScope, activityViewNetService, templatesModelService) {
                var microActivityOldAndNewViewAppService = {};

                microActivityOldAndNewViewAppService.GetActivity = function(Id) {
                    return activityViewNetService.GetActivity(Id,null);
                };
                microActivityOldAndNewViewAppService.makeNewModel = function() {
                    return templatesModelService.makeNewModel();
                };
                microActivityOldAndNewViewAppService.getTemplateDefaultTitle = function(templateId) {
                    return templatesModelService.getTemplateDefaultTitle(templateId);
                };
                return microActivityOldAndNewViewAppService;
            }
        ]);
});