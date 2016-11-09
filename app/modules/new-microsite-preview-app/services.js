"use strict";
/**
 * author :小潘
 * time: 2015年12月1日 15:20:08
 * description: 新微官网预览模块
 */

define(["ionic", "services/net/new-site-preview", "services/net/templatesmodel"], function () {
    return angular.module("NewMicroSitePreviewApp.services", ["services.net.newSitePreview", "services.net.templatesModel"])
        .service("newMicroSitePreviewAppService", [
            "$rootScope", "newSitePreviewNetService", "templatesModelService",
            function ($rootScope, newSitePreviewNetService, templatesModelService) {
                var microSitePreviewAppService = {};
                microSitePreviewAppService.uiModelToBizModel = function (obj1, templateId, websiteId, userId,schoolPalOrgUserId) {
                    ////将禁用模块的数据清空
                    //angular.forEach(obj.modules,function(data){
                    //    if(data.isDisabled){
                    //        data.templateModel = {};
                    //    }
                    //});
                    var coverInfo = microSitePreviewAppService.getCoverInfoBySiteModel(obj1);
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
                        IsEditDone:obj1.isEditDone,
                        Logo:coverInfo.logo||"",
                        Title:coverInfo.title||"",
                        SchoolPalOrgUserId:schoolPalOrgUserId || 0,
                    };
                };
                //通过siteModel获取官网的logo,机构title和机构简介
                microSitePreviewAppService.getCoverInfoBySiteModel = function(siteModel){
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
                    return newSitePreviewNetService.saveWebsite(obj);
                };

                microSitePreviewAppService.makeNewModel = function (modeId) {
                    return templatesModelService.makeNewWebsiteNewModel(modeId);
                };

                //microSitePreviewAppService.getTemplateDefaultTitle = function (templateId) {
                //    return templatesModelService.getTemplateDefaultTitle(templateId);
                //};
                microSitePreviewAppService.getDefaultShareModel = function(templateId,style){
                    return templatesModelService.getTemplateDefaultTitleForNewWebSite(templateId,style);
                };

                microSitePreviewAppService.getWebSite = function (websiteId) {
                    return newSitePreviewNetService.getWebsite(websiteId);
                };
                microSitePreviewAppService.updateShareConfig = function (id, shareConfig) {
                    return newSitePreviewNetService.updateShareConfig(id, shareConfig);
                };
                microSitePreviewAppService.vierifyNewsiteModulesFunction = function (modules,isShowErrorMessage) {
                    return templatesModelService.vierifyNewsiteModulesFunction(modules,isShowErrorMessage);
                };



                return microSitePreviewAppService;
            }
        ]);
});


