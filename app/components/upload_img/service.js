/**
 * Created by dayday on 2015/9/11.
 */
define(["ionic"], function () {
    return angular.module("UploadImg.Service", []).
        factory("uploadImgService", [
            "$http", "commonNetService", function ($http, commonNetService) {

                var uploadImgService = {};
                uploadImgService.upload = function (fileName, content, usage, serviceType) {
                    if (serviceType == "default") {
                        return commonNetService.upLoadImg(fileName, content, usage);
                    }
                    else if (serviceType == "headerImg") {
                        //头像上传
                        return commonNetService.uploadHeadImg(fileName, content, usage);
                    }
                    else if (serviceType == "koubei") {
                        //口碑图片上传
                        return commonNetService.upLoadKoubeiImg(fileName, content, usage);
                    }
                    else if (serviceType == "license") {
                        //微店营业执照图片上传
                        return commonNetService.uploadLicenseImage(fileName, content, usage);
                    }
                };
                uploadImgService.config = {
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

                uploadImgService.extConfig = {
                    isHaveCutImg: true,
                    supportImgType: "default",
                    serviceType: "default",
                    maxSize: "default"

                }
                return uploadImgService;
            }

        ]);
})