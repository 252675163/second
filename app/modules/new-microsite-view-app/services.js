"use strict";
/**
 * author :LTD
 * time: 2015年9月11日 15:03:48
 * description: 微官网更换背景服务
 */

define(["ionic", "services/net/new-site-view"], function () {
    return angular.module("NewMicroSiteViewApp.services", ["services.net.newSiteView"])
        .service("NewMicroSiteViewAppService", [
            "$rootScope", "newSiteViewNetService","templatesModelService",
            function ($rootScope, newSiteViewNetService,templatesModelService) {
                var NewMicroSiteViewAppService = {};

                NewMicroSiteViewAppService.getModel = function (webSiteId) {
                    return newSiteViewNetService.getModel(webSiteId,null);
                };
                NewMicroSiteViewAppService.makeNewModel = function (orgName) {
                    return newSiteViewNetService.makeNewModel(orgName);
                };
                NewMicroSiteViewAppService.getTemplateDefaultTitle = function(templateId,style){
                    return templatesModelService.getTemplateDefaultTitleForNewWebSite(templateId,style);
                };
                return NewMicroSiteViewAppService;
            }
        ]);
});


