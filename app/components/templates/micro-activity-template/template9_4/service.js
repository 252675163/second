/**
 * Created by dayday on 2015/9/11.
 */
define(['ionic'], function () {
    return angular.module('Template9_4.Service', []).
        factory('template9_4Service', ['$http', function ($http) {

            var service = {};
            service.model =
            {
                title: "生理饮食",
                title2: "荤素搭配  合理膳食",
                title3: "开始营养膳食",
                description: "a. 一日三餐要合理安排。主食最好粗细粮搭配；副食则要蔬菜加豆制品，一起食用动物性食物，如瘦肉、鱼、虾等。\n"+
                             "b. 家长在做菜时可以加一些酸味辛香的调味品，可以增强孩子食欲。\n" +
                             "c. 多吃水果，草莓能缓解紧张，柠檬能使精力充沛。",
                imageUrl: [window.resourceDoMain+'/app/img/acty16_pic_4.jpg']
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