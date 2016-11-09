"use strict";
/**
 * author :小潘
 * time: 2015年9月9日 20:59:58
 * description:
 */

define(["ionic", "services/net/site-publish"], function() {
    return angular.module("MicroSitePublishApp.services", ["services.net.sitePublish"])
        .service("MicroSitePublishAppService", [
            "$rootScope", "sitePublishNetService",
            function($rootScope, sitePublishNetService) {
                var microSitePublishAppService = {};
                microSitePublishAppService.uiModelToBizModel = function(obj,userId, templateId, webIdByTemplate, id, secret) {
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
                    if (id == undefined) {
                        return {
                            Id: webIdByTemplate,
                            TemplateId: templateId,
                            Menu: JSON.stringify(menu),
                            Config: JSON.stringify(obj),
                            CreatedAt: "",
                            UserId:userId

                        };
                    } else {
                        return {
                            AppId: id,
                            AppSecret: secret,
                            Id: webIdByTemplate,
                            TemplateId: templateId,
                            Menu: JSON.stringify(menu),
                            Config: JSON.stringify(obj),
                            CreatedAt: "",
                            UserId:userId

                        };
                    }
                };
                microSitePublishAppService.saveWeb = function(obj) {
                    return sitePublishNetService.saveWeb(obj);
                };
                microSitePublishAppService.getMessage = function() {
                    return sitePublishNetService.getMessage();
                };
                microSitePublishAppService.saveWebAndPublish = function(obj) {
                    return sitePublishNetService.saveWebAndPublish(obj);
                };
                return microSitePublishAppService;
            }
        ]);
});