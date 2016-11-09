/**
 * author :lvli
 * time: 2016年7月26日
 * description: 多图片上传
 */
define(["ionic"], function () {
    return angular.module("MultiImageUpload.Service", []).
        factory("multiImageUploadService", [
            "$http", "$timeout", "$q", function ($http, $timeout, $q) {

                var multiImageUploadService = {};
                multiImageUploadService.getConfigByAspectRatio = function (aspectRatio) {
                    return {
                        aspectRatio: aspectRatio ? aspectRatio : 16 / 9,
                        autoCropArea: 0.85,
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

                return multiImageUploadService;
            }
        ]);
});