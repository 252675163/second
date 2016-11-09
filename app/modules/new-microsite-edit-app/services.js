"use strict";
/**
 * author :小潘
 * time: 2015年9月9日 20:59:58
 * description:
 */

define(["ionic", "services/net/new-site-edit"], function() {
    return angular.module("NewMicroSiteEditApp.services", ["services.net.newSiteEdit", "services.net.templatesModel", "services.net.common"])
        .service("newMicroSiteEditAppService", [
            "$rootScope", "newSiteEditNetService", "templatesModelService", "commonNetService",
            function ($rootScope, newSiteEditNetService, templatesModelService, commonNetService) {
                var microSiteEditAppService = {};

                microSiteEditAppService.shareConfigModel = function (title, desc, link, imgUrl, type, dataUrl) {
                    return {
                        title: title ? title : "",
                        desc: desc ? desc : "",
                        link: link ? link : "",
                        imgUrl: imgUrl ? imgUrl : "",
                        type: type ? type : "",
                        dataUrl: dataUrl ? dataUrl : ""
                    };
                };

                microSiteEditAppService.getDefaultShareModel = function(templateId,style){
                    return templatesModelService.getTemplateDefaultTitleForNewWebSite(templateId,style);
                };

                microSiteEditAppService.updateShareConfig = function (id, shareConfig) {
                    return newSiteEditNetService.updateShareConfig(id, shareConfig);
                };


                microSiteEditAppService.makeNewModel = function (modeId) {
                    return templatesModelService.makeNewWebsiteNewModel(modeId);
                };

                microSiteEditAppService.getWebSite = function (websiteId) {
                    return newSiteEditNetService.getWebSite(websiteId);
                };

                microSiteEditAppService.save = function (obj) {
                    return newSiteEditNetService.saveWeb(obj);
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

                microSiteEditAppService.uiModelToBizModel = function (obj1, templateId, websiteId, userId, schoolPalOrgUserId) {
                    ////将禁用模块的数据清空
                    //angular.forEach(obj.modules,function(data){
                    //    if(data.isDisabled){
                    //        data.templateModel = {};
                    //    }
                    //});
                    var coverInfo =  microSiteEditAppService.getCoverInfoBySiteModel(obj1);
                    //isEditDone不存进Config
                    var obj = angular.copy(obj1);
                    delete (obj.isEditDone);
                    return {
                        Id: websiteId||0,
                        //menu字段
                        TemplateId: 10,//新微官网的templateId写死为10
                        Config: JSON.stringify(obj),
                        CreatedAt: "",
                        UserId:userId||0,
                        Style:obj.style,
                        Mode:obj.plan,
                        IsEditDone: obj1.isEditDone,
                        Logo:coverInfo.logo||"",
                        Title: coverInfo.title || "",
                        SchoolPalOrgUserId: schoolPalOrgUserId||0,
                    };
                };
                //通过siteModel获取官网的logo,机构title和机构简介
                microSiteEditAppService.getCoverInfoBySiteModel = function(siteModel){
                    var coverModel = siteModel.modules.filter(function(data){
                        return data.templateName=="site-cover"
                    });
                    var coverInfo = {};
                    if(coverModel[0]) {
                        coverInfo = {
                            logo: coverModel[0].templateModel.imageUrl[0],
                            title: coverModel[0].templateModel.description[0],
                            desc: coverModel[0].templateModel.description[2]
                        }
                    }
                    return coverInfo;
                };

                microSiteEditAppService.vierifyNewsiteModulesFunction = function(modules){
                    return templatesModelService.vierifyNewsiteModulesFunction(modules);
                };

                microSiteEditAppService.getUserConfig = function (configKey) {
                    return commonNetService.getUserConfig(configKey);
                };

                microSiteEditAppService.updateUserConfig = function (configKey, configValue) {
                    return commonNetService.updateUserConfig(configKey, configValue);
                };

                return microSiteEditAppService;
            }
        ]);
});