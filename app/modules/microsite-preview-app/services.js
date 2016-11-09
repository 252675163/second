"use strict";
/**
 * author :LTD
 * time: 2015年9月11日 15:03:48
 * description: 微官网更换背景服务
 */

define(["ionic", "services/net/site-preview", "services/net/templatesmodel"], function () {
    return angular.module("MicroSitePreviewApp.services", ["services.net.sitePreview", "services.net.templatesModel"])
        .service("MicroSitePreviewAppService", [
            "$rootScope", "sitePreviewNetService", "templatesModelService",
            function ($rootScope, sitePreviewNetService, templatesModelService) {
                var microSitePreviewAppService = {};

                microSitePreviewAppService.uiModelToBizModel = function (obj, userId, templateId, id) {

                    return {
                        Id: id,
                        UserId: userId,
                        TemplateId: templateId,
                        Config: JSON.stringify(obj),
                        CreatedAt: ""


                    };
                };
                microSitePreviewAppService.shareConfigModel = function (title, desc, link, imgUrl, type, dataUrl) {
                    return {
                        title: title ? title : "",
                        desc: desc ? desc : "",
                        link: link ? link : "",
                        imgUrl: imgUrl ? imgUrl : "",
                        type: type ? type : "",
                        dataUrl: dataUrl ? dataUrl : ""
                    };
                };

                microSitePreviewAppService.Save = function (obj) {
                    return sitePreviewNetService.saveWebsite(obj);
                };

                microSitePreviewAppService.makeNewModel = function (orgName, templateId) {
                    return templatesModelService.makeWebsiteNewModel(orgName, templateId);
                };

                //microSitePreviewAppService.getTemplateDefaultTitle = function (templateId) {
                //    return templatesModelService.getTemplateDefaultTitle(templateId);
                //};

                microSitePreviewAppService.getWebSite = function (websiteId) {
                    return sitePreviewNetService.getWebSite(websiteId);
                };
                microSitePreviewAppService.updateShareConfig = function (id, shareConfig) {
                    return sitePreviewNetService.updateShareConfig(id, shareConfig);
                };


                return microSitePreviewAppService;
            }
        ]);
});


