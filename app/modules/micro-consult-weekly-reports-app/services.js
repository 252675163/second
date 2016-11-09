"use strict";
/**
 * author :
 * time:
 * description:咨询本周报
 */

define(["ionic", "services/net/consult-weekly-reports","services/net/templatesmodel"], function () {
    return angular.module("MicroConsultWeeklyReportsApp.services", ["services.net.consultWeeklyReports","services.net.templatesModel"])
        .service("MicroConsultWeeklyReportsAppService", [
            "$rootScope", "consultWeeklyReportsNetService","templatesModelService",
            function ($rootScope, consultWeeklyReportsNetService,templatesModelService) {
                var service = {};
                //获取默认title
                //2015.12.17 添加第三个参数style ,新微官网需要
                service.getTemplateDefaultTitle = function (templateId, type,style) {
                    if (type == 1) {
                        return templatesModelService.getTemplateDefaultTitle(templateId);
                    }
                    else if(type==0) {
                        return templatesModelService.getTemplateDefaultTitleForWebSite(templateId,style);
                    }

                };
                //获取webSite默认title
                service.getTemplateDefaultTitleForWebSite = function (templateId,style) {
                    return templatesModelService.getTemplateDefaultTitleForWebSite(templateId,style);
                };
                //


                //shareConfig微信分享结构
                service.shareConfigModel = function (title, desc, link, imgUrl, type, dataUrl) {
                    return {
                        title: title ? title : "",
                        desc: desc ? desc : "",
                        link: link ? link : "",
                        imgUrl: imgUrl ? imgUrl : "",
                        type: type ? type : "",
                        dataUrl: dataUrl ? dataUrl : ""
                    };
                };



                //获得活动/微官网列表（type：0官网 1活动 2全部）
                service.getSummariesByHaveConsult = function (pageIndex, pageSize, type,startDate,endDate) {
                    return consultWeeklyReportsNetService.getSummariesByHaveConsult(pageIndex, pageSize, type,startDate,endDate);
                };
                return service;
            }
        ]);
});