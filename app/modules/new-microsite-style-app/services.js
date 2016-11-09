"use strict";
/**
 * author :小潘
 * time: 2015年12月1日 15:20:08
 * description: 新微官网预览模块
 */

define(["ionic", "services/net/new-site-preview", "services/net/templatesmodel"], function () {
    return angular.module("NewMicroSiteStyleApp.services", ["services.net.newSitePreview", "services.net.templatesModel"])
        .service("newMicroSiteStyleAppService", [
            "$rootScope", "newSitePreviewNetService", "templatesModelService",
            function ($rootScope, newSitePreviewNetService, templatesModelService) {
                var microSiteStyleAppService = {};

                microSiteStyleAppService.makeNewModel = function (modeId) {
                    return templatesModelService.makeNewWebsiteNewModel(modeId);
                };
                microSiteStyleAppService.updteModules = function(modeId,oldModules){
                    return templatesModelService.updateWebsiteModulesByMode(modeId,oldModules);
                };

                microSiteStyleAppService.getStyleListModel = function () {
                    var styleIds = [1,2,3,4,5,6,7,8];//正在使用的风格
                    var baseUrl = window.resourceDoMain+"/app/img/";
                    var styleListModel = [];
                    for(var i= 0;i<styleIds.length;i++){
                        var styleId =styleIds[i];
                        //命名规则 "newsite_style"+styleId+"_sl.jpg"
                        var styleImageUrl =baseUrl+"newsite_style"+styleId+"_sl.jpg";
                        styleListModel.push({styleId:styleId,styleImageUrl:styleImageUrl});
                    }
                    return styleListModel;
                };

                return microSiteStyleAppService;
            }
        ]);
});


