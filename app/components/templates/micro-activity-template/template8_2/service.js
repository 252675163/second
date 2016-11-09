/**
 * Created by dayday on 2015/9/11.
 */
define(['ionic'], function () {
    return angular.module('Template8_2.Service', []).
        factory('template8_2Service', ['$http', function ($http) {

            var service = {};
            service.model =
            {
                title:"想和我们共享美食吗？来吧！",
                description:["怀念童年时凭空出现的礼物？\n遗憾小时候没享受过童话世界？\n想看到宝贝光芒万丈的喜悦？\n…………","共享圣诞舞会\n来贝儿少儿教育"],
                imageUrl: [window.resourceDoMain+'/app/img/acty12_logo.png']
            };
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