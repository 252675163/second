"use strict";
/**
 * author :LTD
 * time: 2015年9月11日 15:03:48
 * description: 微官网更换背景服务
 */

define(["ionic", "services/net/activity-preview", "services/net/templatesmodel"], function() {
    return angular.module("MicroActivityOldAndNewPreviewApp.services",
        ["services.net.activityPreview", "services.net.templatesModel"])
        .service("MicroActivityOldAndNewPreviewAppService", [
            "$rootScope", "activityPreviewNetService", "templatesModelService",
            function($rootScope, activityPreviewNetService, templatesModelService) {
                var microActivityOldAndNewPreviewAppService = {};

                microActivityOldAndNewPreviewAppService.uiModelToBizModel = function (obj, templateId, id, userId, templateCode, activityOtherConfig, isTemp, schoolPalOrgUserId) {
                    //2016.5.25 增加参数是否暂存 isTemp为true时，会保存shareConfig
                    var extConfig = '';
                    var endDate = "";
                    //2016.6.27  ectConfig由指令内部控制
                    if (activityOtherConfig) {
                        if (activityOtherConfig.activityExtConfig) {
                            extConfig = activityOtherConfig.activityExtConfig;
                        }
                        if (activityOtherConfig.endDate) {
                            endDate = activityOtherConfig.endDate;
                        }
                    }
                    //2016.4.25 代金券模板需要新增 字段ExtConfig，记录面额，助力人数和使用条件的信息
                    if (templateCode == "Voucher") {
                        extConfig = {
                            "VoucherAmount": obj.pages[0].sections[0].templateModel.couponsAmount,//"代金券金额",
                            "VoucherPcu":obj.pages[0].sections[0].templateModel.helperCount,// "代金券助力人数",
                            "VoucherCondition":obj.pages[0].sections[1].templateModel.description// "代金券助力条件"
                        };
                    }
                   

                    return {
                        Id: id || 0,
                        TemplateId: templateId,
                        Config: JSON.stringify(obj),
                        CreatedAt: "",
                        UserId: userId,
                        SchoolPalOrgUserId:schoolPalOrgUserId||0,
                        ExtConfig:  JSON.stringify(extConfig),
                        IsTemp: isTemp || false,
                        EndDate: endDate
                    };
                };
                microActivityOldAndNewPreviewAppService.shareConfigModel = function(title, desc, link, imgUrl, type, dataUrl) {
                    return {
                        title: title ? title : "",
                        desc: desc ? desc : "",
                        link: link ? link : "",
                        imgUrl: imgUrl ? imgUrl : "",
                        type: type ? type : "",
                        dataUrl: dataUrl ? dataUrl : ""
                    };
                };

                microActivityOldAndNewPreviewAppService.Save = function(obj) {
                    return activityPreviewNetService.saveActivity(obj);
                };

                microActivityOldAndNewPreviewAppService.makeNewModel = function(orgName, templateId) {
                    return templatesModelService.makeNewModel(orgName, templateId);
                };

                microActivityOldAndNewPreviewAppService.getTemplateDefaultTitle = function(templateId) {
                    return templatesModelService.getTemplateDefaultTitle(templateId);
                };
                microActivityOldAndNewPreviewAppService.getActivity = function(activityId,templateId) {
                    return activityPreviewNetService.getActivity(activityId,templateId);
                };
                microActivityOldAndNewPreviewAppService.updateShareConfig = function(id, shareConfig) {
                    return activityPreviewNetService.updateShareConfig(id, shareConfig);
                };
                return microActivityOldAndNewPreviewAppService;
            }
        ]);
});