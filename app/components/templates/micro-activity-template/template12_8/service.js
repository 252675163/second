/**
 * Created by dayday on 2015/9/11.
 * 学习日记
 */
define(['ionic'], function () {
    return angular.module('Template12_8.Service', []).
        factory('template12_8Service', ['$http', function ($http) {

            var service = {};
            service.model = {
                title: "您也想让孩子那么优秀？\n" +
                        " 赶紧来报名校宝ELES！",
                description:'小新星英语\n'+
                            '周六 15:00-16:30\n' +
                            '周日 8:00-9:30\n\n' +
                            '星同步\n' +
                            '周六 13:20-14:50 \n' +
                            '周日 8:20-9:50\n\n' +
                            '听说读写星概念 \n' +
                            '周六 13:30-15:00 \n' +
                            '周日 8:00-9:30\n\n' +
                            '邀请朋友一起报名，共享8.8折 ',
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