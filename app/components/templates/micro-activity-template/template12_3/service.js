/**
 * Created by dayday on 2015/9/11.
 * 光荣榜
 */
define(['ionic'], function () {
    return angular.module('Template12_3.Service', []).
        factory('template12_3Service', ['$http', function ($http) {

            var service = {};
            service.model = {
                title: "时代最强音\n"+
                        "ELES高分榜",
                description: '米花花       Mylers     9分\n'+
                             '高乐乐       Tyler       8分 \n'+ 
                             '田依依       Anna       8分\n'+
                             '吴琪琪       Ada         7分\n'+
                             '吴冰         Crystal     7分\n'+
                             '戴浩成       Dave       7分\n'+
                             '汪橙橙       Smile      7分\n'+
                             '陈可涵       Mary       6分\n'+
                             '杨瑞辰       Carry      6分\n'+
                             '陈梓涵       Jane       6分\n'+
                             '蔡逸辰       Jack       5分 ',
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