"use strict";
/**
 * author :
 * time: 2015年9月9日 20:59:58
 * description:
 */


define(["ionic", "services/net/activity-index", "services/net/consult", "services/net/templatesmodel"], function () {
    return angular.module("MicroConsultBookListApp.services", ["services.net.activityIndex", "services.net.consult", "services.net.templatesModel"])
        .service("MicroConsultBookListAppService", [
            "$rootScope", "activityIndexNetService", "consultNetService", "templatesModelService",
            function ($rootScope, activityIndexNetService, consultNetService, templatesModelService) {
                var MicroConsultBookListAppService = {};

                MicroConsultBookListAppService.GetUserSummaries = function (pageIndex, pageSize, type) {
                    return consultNetService.GetUserSummaries(pageIndex, pageSize, type);

                };

                MicroConsultBookListAppService.getTemplateDefaultTitle = function (templateId, type) {
                    if (type == 1) {
                        return templatesModelService.getTemplateDefaultTitle(templateId);
                    }
                    else if (type == 0) {
                        return templatesModelService.getTemplateDefaultTitleForWebSite(templateId);
                    }

                };

                return MicroConsultBookListAppService;
            }
        ]);
});


