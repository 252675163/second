/**
 * author :huijuan
 * time: 2016年1月12日
 * description:招生简章模板
 */
define(['ionic','services/net/activity-view'], function () {
    return angular.module('Template15_1.Service', ['services.net.activityView']).
        factory('template15_1Service', ['activityFormService','activityViewNetService', function (activityFormService,activityViewNetService) {

            var service = {};
            service.model =
            {  
              title: ["火炬少儿英语教育", "春季班招生简章"],
              description: "10年少儿英语培训经验，我们只专注一件事：用浸泡式学习，让孩子爱上说英语！",
              imageUrl: [window.resourceDoMain + '/app/img/acty23_logo.jpg']
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