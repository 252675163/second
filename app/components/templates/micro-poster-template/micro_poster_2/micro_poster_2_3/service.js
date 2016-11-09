/**
 * author :陈雪冬
 * time: 2016年7月27日17:13:09
 * description:微海报2
 */
define(['ionic'], function () {
    return angular.module('MicroPoster2_3.Service', []).
        factory('microPoster2_3Service', ['$http', 'activityFormService', function ($http, activityFormService) {


            var service = {};
            service.model =
                {
                    title: "教学环境介绍",
                    description: "优贝教育，专注于3-6岁幼儿的幼小衔接教学。13年教育品牌，特有专业的课程体系，标准化的管理流程。",
                    imageUrl: [window.resourceDoMain + "/app/img/poster2_3_1.png", window.resourceDoMain + "/app/img/poster2_3_2.png"]
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



