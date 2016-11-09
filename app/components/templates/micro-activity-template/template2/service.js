

define(['ionic'], function () {
    return angular.module('microOldNewTemplate2.service', []).
        factory('microOldNewTemplate2Service', ['$http', function ($http) {

            var MicroOldNewTemplate2Service = {};
            MicroOldNewTemplate2Service.model = {
                title1: "满天星教育集团",
                title2:"英语班公开课",
                content: "公开课特色",
                imageUrl: [window.resourceDoMain+'/app/img/acty_temp2_img.jpg'],
            }

            MicroOldNewTemplate2Service.getConfigByAspectRatio = function (aspectRatio) {
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
            return MicroOldNewTemplate2Service
        }]);
})

