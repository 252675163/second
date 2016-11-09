/**
 * Created by dayday on 2015/9/11.
 */
define(['ionic'], function () {
    return angular.module('Template9_7.Service', []).
        factory('template9_7Service', ['$http', function ($http) {

            var service = {};
            service.model =
            {
                title: "备考情绪",
                title2: "记得照顾孩子情绪，及时缓解孩子压力",
                description: "尝试观察孩子情绪，当他们以轻松的姿态讲述考场故事时，家长需要做的是倾听，与之同乐；如果孩子悲伤地讲述那些事情，忌讳家长也表现出更多的负面情绪，因为当前最重要的任务是调整好心情。",
                imageUrl: [window.resourceDoMain+'/app/img/acty16_pic_7.jpg']
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