/**
 * author :huijuan
 * time: 2016年1月12日
 * description:体验课模板
 */
define(['ionic','services/net/activity-view'], function () {
    return angular.module('Template17_1.Service', ['services.net.activityView']).
        factory('template17_1Service', ['activityFormService','activityViewNetService', function (activityFormService,activityViewNetService) {

            var service = {};
            service.model =
            {  
              title: "墨香书院",
              description: "【体验课主题】了解丹青艺术，体国粹精华\n【体验课内容】由国画大师王麟先生亲自示范作画、讲解国画知识、教授国画技艺，这将是一堂天真烂漫与传统技艺碰撞的奇妙之旅... ...\n【体验课优惠】现场报名，即可获得100元学费抵扣券+课程所需学习用具~",
              imageUrl: [window.resourceDoMain + '/app/img/acty23_logo_1.jpg']
            };
            service.GetActivityUserInfo = function (userId) {
                return activityViewNetService.GetActivityUserInfo(userId);
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

                }

            };


            return service

        }]);
});