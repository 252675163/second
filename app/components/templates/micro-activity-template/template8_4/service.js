/**
 * Created by dayday on 2015/9/11.
 */
define(['ionic'], function () {
    return angular.module('Template8_4.Service', []).
        factory('template8_4Service', ['$http', function ($http) {

            var service = {};
            service.model =
            {
                description:"漂亮的棒棒糖，\n柔滑的热可可，\n还有漂亮的小皇冠，\n都在欢迎您的宝贝哦！",
                imageUrl: [window.resourceDoMain+'/app/img/acty12_pic_4_3.png', window.resourceDoMain+'/app/img/acty12_pic_4_1.png',window.resourceDoMain+'/app/img/acty12_pic_4_2.png']
            }
            service.getConfigByAspectRatio =function(aspectRatio) {
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
            return service

        }]);
})