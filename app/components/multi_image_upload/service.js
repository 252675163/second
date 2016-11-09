/**
 * author :lvli
 * time: 2016��7��26��
 * description: ��ͼƬ�ϴ�
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
                        //Container����С��СΪ��Ļ�Ĵ�С���޷���ȡ��Ļ�߶�ʱʹ��300*400
                        minContainerHeight: document.documentElement ? document.documentElement.clientHeight ? document.documentElement.clientHeight : 400 : 400,
                        minContainerWidth: document.documentElement ? document.documentElement.clientWidth ? document.documentElement.clientWidth : 300 : 300

                    }

                };

                return multiImageUploadService;
            }
        ]);
});