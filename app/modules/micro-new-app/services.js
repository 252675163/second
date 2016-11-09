"use strict";
/**
 * author :小潘
 * time: 2015年11月5日 16:44:01
 * description:校宝秀创建新场景
 */


define(["ionic", "services/net/new", "services/net/templatesmodel"], function() {
    return angular.module("MicroNewApp.services", ["services.net.new", "services.net.templatesModel"])
        .service("MicroNewAppService", [
            "$rootScope", "newNetService", "templatesModelService",
            function($rootScope, newNetService, templatesModelService) {
                var microNewAppService = {};

                microNewAppService.getTemplateDetailsByTemplateType = function (pageIndex, pageSize, type) {
                    return newNetService.getTemplateDetailsByTemplateType(pageIndex, pageSize, type);
                };

                //设置显示标签对象 
                microNewAppService.setTagShowObj = function (templatesModel) {

                    angular.forEach(templatesModel, function(template) {
                        template.tagShow = {
                            'vip': false,
                            'new': false,
                            'hot': false
                        };
                        angular.forEach(template.TagList, function (tag) {
                            if (tag.Code == "VIP") {
                                template.tagShow["vip"] = true;
                            }
                            if (tag.Code == "HOT") {
                                template.tagShow["hot"] = true;
                            }
                            if (tag.Code == "NEW") {
                                template.tagShow["new"] = true;
                            }

                        });
                        //显示规则：vip有则显示，hot和new出现一个显示其一，同时出现则显示hot
                        if (template.tagShow["new"] && template.tagShow["hot"]) {
                            template.tagShow["new"] = false;
                        }
                    });
                   


                    return templatesModel;
                };
                return microNewAppService;
            }
        ]);
});