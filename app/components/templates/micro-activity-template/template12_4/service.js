/**
 * Created by dayday on 2015/9/11.
 * 学习日记
 */
define(['ionic'], function () {
    return angular.module('Template12_4.Service', []).
        factory('template12_4Service', ['$http', function ($http) {

            var service = {};
            service.model = {
                name: "米花花\n"+
                      "Mylers",
                description: '班级：ELES小天才班\n' +
                             '活泼聪明，乐于助人。自从来了校宝秀，年纪小小的米花花同学已经不止一次在英语竞赛中获奖了。' ,
                imageUrl: [window.resourceDoMain+"/app/img/acty11_pic1.jpg"],
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