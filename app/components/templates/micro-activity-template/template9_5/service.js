/**
 * Created by dayday on 2015/9/11.
 */
define(['ionic'], function () {
    return angular.module('Template9_5.Service', []).
        factory('template9_5Service', ['$http', function ($http) {

            var service = {};
            service.model =
            {
                title: "记忆力",
                title2: "帮孩子提高记忆力",
                title3: "记忆小技巧",
                description: "a. 记忆最佳时间段：\n" +
                    "            短时记忆：05:30-07:30\n" +
                    "            长时记忆：14:00-17:00\n"+
                    "            深度思考：20:00-22:30\n"+
                    " b. 记忆的四个层次： \n" +
                    "            数字    文字    声音     图像   ",
                imageUrl: [window.resourceDoMain+'/app/img/acty16_pic_5.jpg']
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