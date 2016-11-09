/**
 * Created by dayday on 2015/9/11.
 */
define(['ionic'], function () {
    return angular.module('Template6_5.Service', []).
        factory('template6_5Service', ['$http', function ($http) {

            var service = {};
            service.model =
            {
                title:"想和我们共享美食吗？来吧！",
                description:"美味多汁的南瓜饼、甜山芋、玉蜀黍、红莓苔子果酱、自己烘烤的面包及各种蔬菜和水果等",
                imageUrl: [window.resourceDoMain+'/app/img/acty10_pic4.jpg', window.resourceDoMain+'/app/img/acty10_pic5.jpg',window.resourceDoMain+'/app/img/acty10_pic6.jpg']
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