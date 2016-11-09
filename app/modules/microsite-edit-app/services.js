"use strict";
/**
 * author :小潘
 * time: 2015年9月9日 20:59:58
 * description:
 */

define(["ionic", "services/net/site-edit"], function() {
    return angular.module("MicroSiteEditApp.services", ["services.net.siteEdit", "services.net.templatesModel"])
        .service("MicroSiteEditAppService", [
            "$rootScope", "siteEditNetService","templatesModelService",
            function ($rootScope, siteEditNetService, templatesModelService) {
                var microSiteEditAppService = {};

                microSiteEditAppService.makeNewModel = function (orgName, templateId) {
                    return templatesModelService.makeWebsiteNewModel(orgName, templateId);
                };

                microSiteEditAppService.getWebSite = function (websiteId) {
                    return siteEditNetService.getWebSite(websiteId);
                };

                microSiteEditAppService.save = function (obj) {
                    return siteEditNetService.saveWeb(obj);
                };

                microSiteEditAppService.getImgConfig = function() {
                    var config = {
                        aspectRatio: 9 / 16,
                        autoCropArea: 1,
                        strict: true,
                        guides: false,
                        center: true,
                        highlight: false,
                        dragCrop: false,
                        cropBoxMovable: false,
                        cropBoxResizable: false,
                        zoom: -0.2,
                        checkImageOrigin: true,
                        background: false,
                        //Container的最小大小为屏幕的大小，无法获取屏幕高度时使用300*400
                        minContainerHeight: document.documentElement ? document.documentElement.clientHeight ? document.documentElement.clientHeight : 400 : 400,
                        minContainerWidth: document.documentElement ? document.documentElement.clientWidth ? document.documentElement.clientWidth : 300 : 300

                    };
                    return config;
                };

                microSiteEditAppService.uiModelToBizModel = function(obj, templateId, webIdByTemplate,userId) {
                    var menu = [
                        {
                            Name: obj.pages[0].pageName,
                            Url: "site/view?currentPageIndex=0&id="
                        },
                        {
                            Name: obj.pages[1].pageName,
                            Url: "site/view?currentPageIndex=1&id="
                        },
                        {
                            Name: obj.pages[2].pageName,
                            Url: "site/view?currentPageIndex=2&id="
                        },
                    ];
                    return {
                        Id: webIdByTemplate||0,
                        TemplateId: templateId,
                        Menu: JSON.stringify(menu),
                        Config: JSON.stringify(obj),
                        CreatedAt: "",
                        UserId:userId||0

                    };
                };

                return microSiteEditAppService;
            }
        ]);
});