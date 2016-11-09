"use strict";
/**
 * author :小潘
 * time: 2015年9月9日 20:59:58
 * description:
 */


define(["ionic", "services/net/templatesmodel"], function () {
    return angular.module("MicroActivityApp.services", ["services.net.templatesModel"])
        .service("microActivityAppService", [
            "$rootScope", "templatesModelService", 
            function ($rootScope, templatesModelService) {
                var grassPreview = {};//用于种草编辑预览
                var grassUser ;//用于种草前台流程
                var tempUser ;//临时用户
                var microActivityAppService = {};
                microActivityAppService.setGrassPreview=function (model) {
                    grassPreview = model;
                };
                microActivityAppService.getGrassPreview=function () {
                    return grassPreview;
                };
                microActivityAppService.setGrassUser=function (model) {
                    grassUser = model;
                };
                microActivityAppService.getGrassUser=function () {
                    return grassUser;
                }
                microActivityAppService.setGrassTempUser = function (model) {
                    tempUser = model;
                };
                microActivityAppService.getGrassTempUser = function () {
                    return tempUser;
                }

                microActivityAppService.shareConfigModel = function (title, desc, link, imgUrl, type, dataUrl) {
                    return {
                        title: title ? title : "",
                        desc: desc ? desc : "",
                        link: link ? link : "",
                        imgUrl: imgUrl ? imgUrl : "",
                        type: type ? type : "",
                        dataUrl: dataUrl ? dataUrl : ""
                    };
                };


                microActivityAppService.getTemplateDefaultTitle = function (templateId) {
                    return templatesModelService.getTemplateDefaultTitle(templateId);
                };
                return microActivityAppService;
            }
        ]);
});


