/**
 * 
 */
define(['ionic','services/net/activity-template'], function () {
    return angular.module('MicroPoster1_1.Service', ['services.net.activityTemplate']).
        factory('microPoster1_1Service', ['$http','activityFormService','activityTemplateService', function ($http,activityFormService,activityTemplateService) {
            var service = {};
            service.model =
            {
                title: "优贝教育",
                description: "秋季班续班优惠",
                imageUrl: [window.resourceDoMain + "/app/img/poster1_1_logo.png"]
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
                    //Container的最小大小为屏幕的大小，无法获取屏幕高度时使用300*400
                    minContainerHeight: document.documentElement ? document.documentElement.clientHeight ? document.documentElement.clientHeight : 400 : 400,
                    minContainerWidth: document.documentElement ? document.documentElement.clientWidth ? document.documentElement.clientWidth : 300 : 300
                };
            };



            return service;

        }]);
});



