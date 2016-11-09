"use strict";
/**
 * author :小潘
 * time: 2015年9月9日 20:59:58
 * description:
 */


define(["ionic", "services/net/activity-index","services/net/templatesmodel"], function () {
    return angular.module("MicroActivityIndexApp.services", ["services.net.activityIndex","services.net.templatesModel"])
        .service("MicroActivityIndexAppService", [
            "$rootScope","activityIndexNetService","templatesModelService",
            function ($rootScope, activityIndexNetService, templatesModelService) {
                var microActivityIndexAppService = {};

                microActivityIndexAppService.uiModelToBizModel = function (obj, userId, templateId, id) {

                    return {
                        Id: id,
                        UserId: userId,
                        TemplateId: templateId,
                        Config: JSON.stringify(obj),
                        CreatedAt: ""

                    }
                };

                microActivityIndexAppService.getTemplateDefaultTitle = function(templateId) {
                    return templatesModelService.getTemplateDefaultTitle(templateId);
                };

                microActivityIndexAppService.shareConfigModel = function(title,desc,link,imgUrl,type,dataUrl){
                    return {
                        title: title?title:"",
                        desc: desc?desc:"",
                        link: link?link:"",
                        imgUrl:imgUrl?imgUrl:"",
                        type: type?type:"",
                        dataUrl:dataUrl?dataUrl:""
                    }
                };


                microActivityIndexAppService.Save = function (obj) {
                    return activityIndexNetService.saveActivity(obj);
                };
                microActivityIndexAppService.getModel = function (orgId) {
                    return activityIndexNetService.getModel(orgId);
                };

                microActivityIndexAppService.getActivityList = function(userId){
                    return activityIndexNetService.getActivityList(userId);

                };
                microActivityIndexAppService.getActivityModel = function (UserId, templateId,activityId) {
                    return activityIndexNetService.getActivityModel(UserId, templateId,activityId);
                };
                microActivityIndexAppService.updateShareConfig = function(id,userId,userSign,ShareConfig){
                    return activityIndexNetService.updateShareConfig(id,userId,userSign,ShareConfig);
                };
                return microActivityIndexAppService;
            }
        ]);
});


