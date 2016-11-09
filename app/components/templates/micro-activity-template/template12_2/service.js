/**
 * Created by dayday on 2015/9/11.
 * 光荣榜
 */
define(['ionic'], function () {
    return angular.module('Template12_2.Service', []).
        factory('template12_2Service', ['$http', function ($http) {

            var service = {};
            service.model = {
                title: "I’M CHAMPION",
                description: '小朋友们棒棒哒\n' +
                             '恭贺小朋友们在ELES  \n' +
                             '北美英文语言测试中 \n' +
                             "取得高分",
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