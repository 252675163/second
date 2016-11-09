/**
 * Created by dayday on 2015/9/11.
 * 学习日记
 */
define(['ionic'], function () {
    return angular.module('Template12_6.Service', []).
        factory('template12_6Service', ['$http', function ($http) {

            var service = {};
            service.model = {
                title: "ELES领取证书风采",
                imageUrl: [window.resourceDoMain+"/app/img/acty11_pic3.jpg", window.resourceDoMain+"/app/img/acty11_pic4.jpg", window.resourceDoMain+"/app/img/acty11_pic5.jpg"],
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
});