"use strict";
/**
 * author :小潘
 * time: 2015年11月5日 16:44:01
 * description:校宝秀首页
 */


define(["ionic", "services/net/index", "services/net/activity-preview", "services/net/templatesmodel"], function () {
    return angular.module("MicroIndexApp.services", ["services.net.index", "services.net.activityPreview", "services.net.templatesModel"])
        .service("MicroIndexAppService", [
            "$rootScope", "indexNetService", "activityPreviewNetService", "templatesModelService",
            function ($rootScope, indexNetService, activityPreviewNetService, templatesModelService) {
                var microIndexAppService = {};


                //获取微官网数据
                microIndexAppService.getWebSiteModel = function (webSiteId) {
                    return indexNetService.getWebSiteModel(webSiteId);
                }


                //保存微官网数据
                microIndexAppService.saveWebSite= function(obj) {
                    return indexNetService.saveWebSite(obj);
                }

                


                //保存微活动数据
                microIndexAppService.SaveActivity = function(obj) {
                    return indexNetService.saveActivity(obj);
                };

                //
                microIndexAppService.getModel = function(orgId) {
                    return indexNetService.getModel(orgId);
                };

                //获取微活动列表
                microIndexAppService.getActivityList = function(userId) {
                    return indexNetService.getActivityList(userId);

                };

                //获得单个微活动数据
                microIndexAppService.getActivityModel = function(activityId) {
                    return indexNetService.getActivityModel(activityId);
                };

                //更新分享结构
                microIndexAppService.updateShareConfig = function(id, shareConfig) {
                    return indexNetService.updateShareConfig(id, shareConfig);
                };
                microIndexAppService.updateShareConfigForWebSite = function(id,shareConfig) {
                    return indexNetService.updateShareConfig(id, shareConfig,"webSite");
                };

                //获取默认title
                //2015.12.17 添加第三个参数style ,新微官网需要
                microIndexAppService.getTemplateDefaultTitle = function (templateId, type,style) {
                    if (type == 1) {
                        return templatesModelService.getTemplateDefaultTitle(templateId);
                    }
                    else if(type==0) {
                        return templatesModelService.getTemplateDefaultTitleForWebSite(templateId,style);
                    }
                    
                };
                //获取webSite默认title
                microIndexAppService.getTemplateDefaultTitleForWebSite = function (templateId,style) {
                    return templatesModelService.getTemplateDefaultTitleForWebSite(templateId,style);
                };
                //


                //获取分享接口
                microIndexAppService.shareConfigModel = function (title, desc, link, imgUrl, type, dataUrl) {
                    return {
                        title: title ? title : "",
                        desc: desc ? desc : "",
                        link: link ? link : "",
                        imgUrl: imgUrl ? imgUrl : "",
                        type: type ? type : "",
                        dataUrl: dataUrl ? dataUrl : ""
                    };
                };


                //获得摘要列表（type：0官网 1活动 2全部）
                microIndexAppService.getSummaries = function (pageIndex, pageSize, type) {
                    return indexNetService.getSummaries(pageIndex, pageSize, type);
                }

                //获取用户场景列表（type 0 全部 1 微官网 2 微活动 3 微助力 4 微投票 5 微传单）
                microIndexAppService.getUserScenes = function (pageIndex, pageSize, type) {
                    return indexNetService.getUserScenes(pageIndex, pageSize, type);
                }

                //删除官网或者活动
                microIndexAppService.delModel = function (id,type) {
                    return indexNetService.delModel(id,type);
                }

                // 复制接口
                microIndexAppService.copy = function (id, shareConfig, type) {
                    return indexNetService.copy(id, shareConfig, type);
                };

                // 复制接口 仅限于新种草活动  by xp 2015年12月10日 00:06:27
                microIndexAppService.copyNewGrass = function (id, shareConfig) {
                    return indexNetService.copyNewGrass(id, shareConfig);
                };
               

                //二维码接口
                microIndexAppService.goQrCode = function (id, type) {
                     return indexNetService.goQrCode(id, type);
                }
                // 
                microIndexAppService.getUserInfo = function () {
                    return indexNetService.getUserInfo();
                }
                //microIndexAppService.uiModelToBizModel = function (obj, userId, templateId, id) {
                //    return {
                //        Id: id,
                //        UserId: userId,
                //        TemplateId: templateId,
                //        Config:obj,
                //        CreatedAt: ""
                //    };
                //};

                //microIndexAppService.SaveCopyModel = function (obj) {
                //    return activityPreviewNetService.saveActivity(obj);
                //};

                //microIndexAppService.updateShareConfig = function (id, userId, userSign, shareConfig) {
                //    return activityPreviewNetService.updateShareConfig(id, userId, userSign, shareConfig);
                //};

                //更新活动截止日
                microIndexAppService.updateEndDate=function(activityId, endDate) {
                    return indexNetService.updateEndDate(activityId, endDate);
                }

                return microIndexAppService;
            }
        ]);
});