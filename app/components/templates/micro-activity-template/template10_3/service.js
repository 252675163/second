/**
 * Created by dayday on 2015/9/11.
 */
define(['ionic'], function () {
    return angular.module('Template10_3.Service', []).
        factory('template10_3Service', ['activityFormService', function (activityFormService) {

            var service = {};
            service.model =
            {
                title: "知名教师面对面",
                description: "林斌，北京师范大学毕业\n20年教书育人经验\n400多位得意门生\n授课风趣幽默，深受广大学子欢迎",
                imageUrl: [window.resourceDoMain+'/app/img/acty18_pic_3.jpg']
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
})