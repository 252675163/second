/**
 * Created by dayday on 2015/9/11.
 * 学习日记
 */
define(['ionic'], function () {
    return angular.module('Template7.Service', []).
        factory('template7Service', ['$http', function ($http) {

            var service = {};
            service.model = {
                title: "活动细则",
                content: '推荐有奖：\n' +
                        '1.成功邀请好友参加公开课，您和朋友每人都可获得100元学费抵扣券。\n' +
                        '2.学费抵扣券允许累加，但一门课程最多可以使用2张。\n\n参加有奖：\n名师坐阵、机会难得！\n参加公开课的每一位贵宾，都可获赠名师XXX主编的绝密语法提分教材哦！',
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