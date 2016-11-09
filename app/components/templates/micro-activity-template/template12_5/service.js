/**
 * Created by dayday on 2015/9/11.
 * 学习日记
 */
define(['ionic'], function () {
    return angular.module('Template12_5.Service', []).
        factory('template12_5Service', ['$http', function ($http) {

            var service = {};
            service.model = {
                name: "高乐乐\n"+
                      "Tyler",
                description: '班级：ELES小天才班\n'+
                            '机智聪颖的小帅哥，高分拿到手软。不仅学习好，还是校宝秀艺术乐园里的架子鼓小能手呢~' ,
                imageUrl: [window.resourceDoMain+"/app/img/acty11_pic2.jpg"],
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