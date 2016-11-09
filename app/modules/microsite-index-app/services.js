"use strict";
/**
 * author :小潘
 * time: 2015年9月9日 20:59:58
 * description:
 */

define(["ionic", "services/net/site-index"], function () {
    return angular.module("MicroSiteIndexApp.services", ["services.net.siteIndex"])
        .service("MicroSiteIndexAppService", [
            "$rootScope","siteIndexNetService",
            function ($rootScope, siteIndexNetService) {
                var MicroSiteIndexAppService = {};
                MicroSiteIndexAppService.shareConfigModel = function(title,desc,link,imgUrl,type,dataUrl){
                    return {
                        title: title?title:"",
                        desc: desc?desc:"",
                        link: link?link:"",
                        imgUrl:imgUrl?imgUrl:"",
                        type: type?type:"",
                        dataUrl:dataUrl?dataUrl:""
                    }
                }

                MicroSiteIndexAppService.getModel = function (orgId) {
                    return siteIndexNetService.getModel(orgId);
                }
                MicroSiteIndexAppService.makeNewModel = function (OrgName) {
                    return siteIndexNetService.makeNewModel(OrgName);
                }

                MicroSiteIndexAppService.uiModelToBizModel = function (obj, User, TemplateId, WebIdByTemplate) {
                    var menu = [{
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
                    ]
                    return {
                        Id: WebIdByTemplate,
                        UserSign: User,
                        TemplateId: TemplateId,
                        Menu: JSON.stringify(menu),
                        Config: JSON.stringify(obj),
                        CreatedAt: ""

                    }
                }

                MicroSiteIndexAppService.saveWeb = function (obj) {
                    return siteIndexNetService.saveWeb(obj);
                };
                MicroSiteIndexAppService.updateShareConfig = function(id,userSign,shareConfig){
                    return siteIndexNetService.updateShareConfig(id,userSign,shareConfig);
                };
                return MicroSiteIndexAppService;
            }
        ]);
});


