/**
 * Created by dayday on 2015/9/11.
 */
define(['ionic'], function () {
    return angular.module('Template3_5.Service', []).
        factory('template3_5Service', ['$http', function ($http) {

            var service = {};
            service.model =
            {

                description: ["名师1", "名师2", "名师3"],
                imageUrl: [window.resourceDoMain+'/app/img/acty_temp36_img1.jpg', window.resourceDoMain+'/app/img/acty_temp36_img2.jpg', window.resourceDoMain+'/app/img/acty_temp36_img3.jpg']
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

