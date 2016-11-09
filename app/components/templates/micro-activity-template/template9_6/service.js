/**
 * Created by dayday on 2015/9/11.
 */
define(['ionic'], function () {
    return angular.module('Template9_6.Service', []).
        factory('template9_6Service', ['$http', function ($http) {

            var service = {};
            service.model =
            {
                title: "日程安排",
                title2: "帮孩子合理安排学习时间",
                title3: "轻轻松松每一天",
                description:"07:00 起床洗漱\n"+
                    "07:30 读英语\n"+
                    "08:15 逻辑思维训练\n"+
                    "11:30 吃午饭\n"+
                    "12:00 小憩半小时\n"+
                    "13:00 开始长期记忆学科的学习\n"+
                    "17:30 吃晚饭\n"+
                    "19:00 晚上学习",
                imageUrl: [window.resourceDoMain+'/app/img/acty16_pic_6.jpg']
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