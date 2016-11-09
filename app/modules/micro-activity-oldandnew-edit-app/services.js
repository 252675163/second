"use strict";
/**
 * author :小潘
 * time: 2015年9月14日 14:47:02
 * description:老带新活动服务
 */

define(["ionic", "services/net/activity-edit", "services/net/templatesmodel"], function () {
    return angular.module("MicroActivityOldAndNewEditApp.services", ["services.net.activityEdit", "services.net.templatesModel", "services.net.common"])
        .service("MicroActivityOldAndNewEditAppService", [
            "$rootScope", "activityEditNetService", "templatesModelService","commonNetService",
            function ($rootScope, activityEditNetService, templatesModelService, commonNetService) {
                var microActivityOldAndNewEditAppService = {};

                microActivityOldAndNewEditAppService.showGuide = 0;
                microActivityOldAndNewEditAppService.getGuideTime = function () {

                }


                microActivityOldAndNewEditAppService.makeNewModel = function (orgName, templateId) {
                    return templatesModelService.makeNewModel(orgName, templateId);
                };
                microActivityOldAndNewEditAppService.getAactivity = function (activityId) {
                    return activityEditNetService.getAactivity(activityId);
                };
                //新增是否暂存，传入templateId
                microActivityOldAndNewEditAppService.save = function (data, is, templateId) {
                    return activityEditNetService.saveActivity(data);
                };

                microActivityOldAndNewEditAppService.uiModelToBizModel = function (obj, userId, templateId, id, templateCode, activityOtherConfig, schoolPalOrgUserId) {
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
                        Id: id,
                        UserId: userId,
                        SchoolPalOrgUserId:schoolPalOrgUserId,
                        TemplateId: templateId,
                        Config: JSON.stringify(obj),
                        CreatedAt: "",
                        isTemp: true,
                        ExtConfig: JSON.stringify(extConfig),
                        EndDate: endDate
                    };
                };
                microActivityOldAndNewEditAppService.getImgConfig = function () {
                    var config = {
                        aspectRatio: 320 / 504,
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

                microActivityOldAndNewEditAppService.getUserConfig = function (configKey) {
                    return commonNetService.getUserConfig(configKey);
                };

                microActivityOldAndNewEditAppService.updateUserConfig = function (configKey, configValue) {
                    return commonNetService.updateUserConfig(configKey, configValue);
                };

                return microActivityOldAndNewEditAppService;
            }
        ]);
});