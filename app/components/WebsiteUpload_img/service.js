/**
 * Created by dayday on 2015/9/11.
 */
define(["ionic"], function() {
    return angular.module("WebsiteUploadImg.Service", []).
        factory("WebsiteUploadImgService", [
            "$http", "commonNetService",function($http,commonNetService) {

                var websiteUploadImgService = {};
                websiteUploadImgService.upload = function (fileName, content, usage) {
                    return commonNetService.UploadImageDS(fileName, content, usage);
                };
                websiteUploadImgService.config = {
                    aspectRatio: 1 / 1, //纵横比
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
                    minContainerHeight: 400,
                    minContainerWidth: 300
                };
                return websiteUploadImgService;
            }
        ]);
})