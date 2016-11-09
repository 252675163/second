/**
 * Created by dayday on 2015/9/11.
 */
define(['ionic'], function () {
    return angular.module('Template9_3.Service', []).
        factory('template9_3Service', ['$http', function ($http) {

            var service = {};
            service.model =
            {
                title: "孩子心理",
                title2: "心理专家给您解围",
                description: "以挑战的姿态面对考试，需要我们家长站在人生的高度看待考试。当我们以高远的姿态看待考试时，无形中也会激励孩子。\n"+
                             "别让爱和关怀成为孩子的负担，避免瓦伦达心态束缚孩子自由发展",
                imageUrl: [window.resourceDoMain+'/app/img/acty16_pic_3.jpg']
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