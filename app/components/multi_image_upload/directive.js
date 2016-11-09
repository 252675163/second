"use strict";
/**
 * author :lvli
 * time: 2016年7月26日
 * description: 多图片上传
 */


define(["ionic"], function() {
    angular.module("MultiImageUpload.directive", [])
        .directive("multiImageUpload", [
            "$window", "$timeout", "$rootScope", "multiImageUploadService", "uploadImgService", "showImageBigService",
            function($window, $timeout, $rootScope, multiImageUploadService, uploadImgService, showImageBigService) {
                return {
                    restrict: "EA",
                    //callback中的"=?"表示参数可传可不传
                    scope: {
                        uploadConfig: "=",
                        callback: "=?"
                    },
                    templateUrl: "components/multi_image_upload/template.html",
                    link: function(scope, iElement, iAttr) {
                        var uploadConfig = {
                            imageUrlArr: [],
                            imageType: 7,
                            maxImageNum: 3,
                            aspectRatio: 14 / 5,
                            callback: function() {},
                            extConfig: {
                                isHaveCutImg: true
                            }
                        }
                        scope.callback = scope.callback || {};
                        scope.callback.resetUploadConfig = function() {
                            scope.uploadConfig1 = angular.extend({}, uploadConfig, scope.uploadConfig);
                        }
                        scope.callback.resetUploadConfig();
                        //scope.imgAspectRatio = [1];
                        //添加图片
                        scope.addImage = function() {
                                uploadImgService.upLoadImg(multiImageUploadService.getConfigByAspectRatio(scope.uploadConfig1.aspectRatio), scope.uploadConfig1.imageType, scope.upLoadFinish, '', scope.uploadConfig1.extConfig);
                            }
                            //上传完成
                        scope.upLoadFinish = function(data) {
                            $timeout(function() {
                                scope.$apply(function() {
                                    if (scope.uploadConfig1.extConfig.serviceType == "license") {
                                        data += "-m";
                                    }
                                    if (scope.uploadConfig1.imageType == 13) {
                                        var imageObj = {
                                            url: data.Url,
                                            imageId: data.ImageId
                                        }
                                        scope.uploadConfig1.imageUrlArr.push(imageObj);
                                    } else {
                                        scope.uploadConfig1.imageUrlArr.push(data);
                                    }
                                    scope.uploadConfig1.callback();
                                });
                            });
                        };
                        //图片model监视
                        scope.$watchCollection("uploadConfig1.imageUrlArr", function(newVal, oldVal) {
                            if (newVal == oldVal || oldVal.length == 0) {
                                return;
                            }
                            scope.uploadConfig1.callback();
                        });
                        //显示大图
                        scope.showImageBig = function(index) {
                            showImageBigService.setInfo(index, true, true, scope.uploadConfig1.imageUrlArr);
                        };


                        //路由发生变化
                        var stateChangeStart = $rootScope.$on("$stateChangeStart",
                            function(event, toState, toParams, fromState, fromParams) {});

                        //销毁rootScope上的事件
                        scope.$on("$destroy", function() {
                            //destroy the ui.router [stateChageStart] event  
                            stateChangeStart();
                        });
                    }
                };
            }
        ]);
});