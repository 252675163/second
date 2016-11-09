/**
 * author :陈雪冬
 * time: 2016年7月27日17:13:09
 * description:微海报2
 */
define(['ionic'], function () {
    return angular.module('MicroPoster2_5.Service', []).
        factory('microPoster2_5Service', ['$http', 'activityFormService', function ($http, activityFormService) {


            var service = {};
            service.model =
                {
                    title: "名师介绍",
                    name: ["JERRY", "JANE"],
                    description: ["各种经验", "各种经验"],
                    imageUrl: [
                        window.resourceDoMain + "/app/img/poster2_5_left.png",
                        window.resourceDoMain + "/app/img/poster2_5_right.png"
                    ]
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



