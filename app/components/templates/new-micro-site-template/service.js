/**
 * Created by dayday on 2015/12/2.
 */
define(['ionic'], function () {
    return angular.module('SiteTemplateCommon.Service', []).
        factory('siteTemplateCommonService',['$http', 'promptBarService',function ($http,promptBarService) {

            var service = {};

            service.getCropperConfigByAspectRatio = function (aspectRatio) {
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
            service.verifyPhone =function(){

            };




            return service

        }]);
});


