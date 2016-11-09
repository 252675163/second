"use strict";
/**
 * author :小潘
 * time: 2016年3月21日 20:25:30
 * description: 微活动前台预览（无鉴权）
 */

define(["ionic", "services/net/activity-preview", "services/net/templatesmodel"], function() {
    return angular.module("MicroPreviewApp.services", ["services.net.activityPreview", "services.net.templatesModel"])
        .service("MicroPreviewAppService", [
            "$rootScope", "activityPreviewNetService",
            function($rootScope, activityPreviewNetService) {
                var microPreviewAppService = {};

                microPreviewAppService.shareConfigModel = function(title, desc, link, imgUrl, type, dataUrl) {
                    return {
                        title: title ? title : "",
                        desc: desc ? desc : "",
                        link: link ? link : "",
                        imgUrl: imgUrl ? imgUrl : "",
                        type: type ? type : "",
                        dataUrl: dataUrl ? dataUrl : ""
                    };
                };
                return microPreviewAppService;
            }
        ]);
});