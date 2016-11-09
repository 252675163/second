/**
 * Created by dayday on 2015/9/11.
 */
define(['ionic'], function () {
    return angular.module('Template3_4.Service', []).
        factory('template3_4Service', ['$http', function ($http) {

            var service = {};
            service.model =
            {
                title: ["王牌课程1", "王牌课程2", "王牌课程3"],
                description:["单击此处添加文本，这里一共可以输入6行字","单击此处添加文本，这里一共可以输入6行字","单击此处添加文本，这里一共可以输入6行字"],
                imageUrl: [window.resourceDoMain+'/app/img/acty_temp35_img1.jpg', window.resourceDoMain+'/app/img/acty_temp35_img2.jpg', window.resourceDoMain+'/app/img/acty_temp35_img3.jpg']
            };
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