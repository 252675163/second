/**
 * author :xujiawen
 * time: 2016年6月29日
 * description:砍价联系方式
 */
define(["ionic", "services/net/activity-template"], function () {
    return angular.module("MicroPoster1_4.Service", ["services.net.activityTemplate"]).
        factory("microPoster1_4Service", [
            "$http", "activityFormService", "activityTemplateService", function ($http, activityFormService, activityTemplateService) {

                var service = {};
                service.model =
                    {
                        title: "续班课程介绍",
                        imageUrl: [window.resourceDoMain + "/app/img/poster1_4_bg.png"]
                    };

                service.getConfigByAspectRatio = function (aspectRatio) {
                    return {
                        aspectRatio: aspectRatio ? aspectRatio : 16 / 9,
                        autoCropArea: 0.7,
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
                        quality:1, //品质设置
                        //Container的最小大小为屏幕的大小，无法获取屏幕高度时使用300*400
                        minContainerHeight: document.documentElement ? document.documentElement.clientHeight ? document.documentElement.clientHeight : 400 : 400,
                        minContainerWidth: document.documentElement ? document.documentElement.clientWidth ? document.documentElement.clientWidth : 300 : 300
                    };
                };
                return service;
            }
        ]);
});