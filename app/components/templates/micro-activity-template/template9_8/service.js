/**
 * Created by dayday on 2015/9/11.
 */
define(['ionic'], function () {
    return angular.module('Template9_8.Service', []).
        factory('template9_8Service', ['$http', function ($http) {

            var service = {};
            service.model =
            {
                title: "关于我们",
                title2: "10月25日下午14:00",
                description: "校宝秀国际教育不仅给孩子提供专业的文化课教育，更重视孩子的身心发展。快乐学习，高效学习是校宝秀国际教育一贯地追求。期待给您孩子更好的未来。\n"+
                              "戴安娜老师将为家长们开课讲解孩子备考贴士，会教您如何应对孩子的负面情绪，如何管理孩子的学习状态，如何呵护孩子的身心健康，期待您的参与。",
                imageUrl: [window.resourceDoMain+'/app/img/acty16_pic_8.jpg']
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