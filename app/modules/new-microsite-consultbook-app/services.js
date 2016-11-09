"use strict";
/**
 * author :
 * time: 2015年10月19日 16:03:28
 * description:
 */


define(["ionic", "services/net/consult", "services/net/activity-index", "services/net/templatesmodel"], function () {
    return angular.module("NewMicrositeConsultBookApp.services", ["services.net.consult", "services.net.activityIndex", "services.net.templatesModel"])
        .service("NewMicrositeConsultBookAppService", [
            "$rootScope", "consultNetService","activityIndexNetService","templatesModelService",
            function ($rootScope, consultNetService, activityIndexNetService, templatesModelService) {
                var service = {};

                service.GetConsults = function (id, pageIndex, pageSize, type) {
                    if (type == "1")
                    {
                        return consultNetService.GetActivityConsults(id,pageIndex,pageSize);
                    }
                    else if (type == "0")
                    {
                        return consultNetService.GetWebsiteConsults(id,pageIndex,pageSize);
                    }
                };

               service.getTemplateDefaultTitle = function (templateId, type) {
                    if (type == 1) {
                        return templatesModelService.getTemplateDefaultTitle(templateId);
                    }
                    else if (type == 0) {
                        return templatesModelService.getTemplateDefaultTitleForWebSite(templateId);
                    }

                };

                service.GetUserSummaries = function (pageIndex, pageSize, type) {
                    return consultNetService.GetUserSummaries(pageIndex, pageSize, type);
                };
                return service;
            }
        ]);
});