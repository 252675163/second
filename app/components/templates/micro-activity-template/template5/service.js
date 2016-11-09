/**
 * Created by dayday on 2015/9/11.
 */
define(['ionic'], function () {
    return angular.module('MicroOldNewTemplate5.Service', []).
        factory('microOldNewTemplate5Service', ['$http', function ($http) {

            var microTemplate6Service = {};
            microTemplate6Service.model =
            {
                title: "XXX老师",
                description: "给您带来备受欢迎的xxx课程",
                imageUrl: [window.resourceDoMain+'/app/img/acty_temp5_img.jpg', window.resourceDoMain+'/app/img/testImg4.jpg']
            };
            microTemplate6Service.getConfigByAspectRatio =function(aspectRatio) {
                return {
                    aspectRatio:aspectRatio?aspectRatio: 16 /9 ,
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
                    minContainerHeight:  document.documentElement?document.documentElement.clientHeight?document.documentElement.clientHeight:400:400,
                    minContainerWidth: document.documentElement?document.documentElement.clientWidth?document.documentElement.clientWidth:300:300

                }

            };

            return microTemplate6Service

        }]);
})
