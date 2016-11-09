/**
 * Created by dayday on 2015/9/11.
 */
define(['ionic'], function () {
    return angular.module('Template10_4.Service', []).
        factory('template10_4Service', ['activityFormService', function (activityFormService) {

            var service = {};
            service.model =
            {

                description: ["评估教学享报名优惠", "家长互动谱写孩子未来"],
                imageUrl: [window.resourceDoMain+'/app/img/acty18_pic_4_1.jpg',
                    window.resourceDoMain+'/app/img/acty18_pic_4_2.jpg'],
                submitName: "提交"
            }
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
})