"use strict";
/**
 * author :yinglechao
 * time: 2015年9月13日
 * description:
 */


define(["ionic"],
    function() {
        angular.module("WebsiteUploadImg.directive", [])
            .directive("websiteUploadImg",
                [
                    "$window", "$timeout", "WebsiteUploadImgService", "$ionicLoading", "$rootScope",
                    function($window, $timeout, websiteUploadImgService, $ionicLoading, $rootScope) {
                        return {
                            restrict: "E",
                            //继承作用域
                            scope: true,
                            templateUrl: "components/WebsiteUpload_img/upload_img.html",
                            link: function(scope, iElement, iAttr) {

                                //Method  destroy the cropper and report base64 [img] dom |||| xp 2015年12月29日 12:43:41
                                var removeDom = function () {
                                    var $img = $(iElement).find("#websiteReport > img");
                                    $img.remove();
                                };


                                function doFinish(startTimestamp, sSize, rst) {
                                    $timeout(function() {
                                            $ionicLoading.hide();
                                        },
                                        800);

                                    $ionicLoading.show({
                                        template: "<div>" +
                                            '<div class="lockMask"></div>' +
                                            '<div class="pic_upload_loading"></div>' +
                                            "</div>"
                                    });

                                    websiteUploadImgService.upload(scope.fileName, rst.base64, scope.fileUsage)
                                        .then(
                                            function(result) {

                                                scope.finishFunction(result.data.data);
                                                $timeout(function() {
                                                        $ionicLoading.hide();
                                                        removeDom();
                                                    },
                                                    800);
                                            },
                                            function() {
                                                $timeout(function() {
                                                        $ionicLoading.hide();
                                                        removeDom();
                                                    },
                                                    800);
                                            }
                                        );
                                }

                                //路由发生变化，裁剪框消失
                                var stateChangeStart = $rootScope.$on("$stateChangeStart",
                                    function(event, toState, toParams, fromState, fromParams) {
                                        $(iElement).find("#showEdit").fadeOut();
                                    });

                                $(iElement)
                                    .find("#image")
                                    .on("change",
                                        function() {

                                            if (this.files[0].size > 10 * 1024 * 1024) {
                                                $timeout(function() {
                                                        scope.isShowError = true;
                                                    },
                                                    0);
                                                //scope.isShowError=true;
                                                scope.remind = "请上传不超过10MB的图片！";
                                                $timeout(function() {
                                                        scope.isShowError = false;
                                                    },
                                                    3000);
                                                //解决选择同一张图片不能触发change事件问题
                                                $(iElement).find("#image").val("");
                                                return;
                                            }
                                            if (this.files[0].type.toLocaleLowerCase() != "image/jpeg" &&
                                                this.files[0].type.toLocaleLowerCase() != "image/png") {
                                                $timeout(function() {
                                                        scope.isShowError = true;
                                                    },
                                                    0);
                                                //scope.isShowError=true;
                                                scope.remind = "请上传jpg或png格式的图片！！";
                                                $timeout(function() {
                                                        scope.isShowError = false;
                                                    },
                                                    3000);
                                                //解决选择同一张图片不能触发change事件问题
                                                $(iElement).find("#image").val("");
                                                return;
                                            }
                                            $ionicLoading.show({
                                                template: "<div>" +
                                                    '<div class="lockMask"></div>' +
                                                    '<div class="pic_upload_loading"></div>' +
                                                    "</div>"
                                            });
                                            scope.fileName = this.files[0].name;
                                            scope.fileType = this.files[0].type;
                                            var startTimestamp = (new Date()).valueOf();
                                            var that = this;
                                            lrz(this.files[0],
                                               {
                                                   width: 1300,
                                                   height: 1300,
                                                   quality: 1
                                               })
                                               .then(function (rst) {
                                                   //console.log(rst);
                                                   doFinish(startTimestamp, that.files[0].size, rst);
                                                   //解决选择同一张图片不能触发change事件问题
                                                   $(iElement).find("#image").val("");
                                                   return rst;
                                               })
                                               .always(function () {
                                               });
                                        });


                                websiteUploadImgService
                                    .upLoadImg = function(config, fileUsage, finishFunction, cancelFunction) {
                                        scope.fileUsage = fileUsage;
                                        if (!config) {
                                            scope.config = websiteUploadImgService.config;
                                        } else {
                                            scope.config = config;
                                        }
                                        scope.finishFunction = finishFunction;
                                        scope.cancelFunction = cancelFunction ? cancelFunction : "";
                                        $timeout(function() {
                                                $(iElement).find("#image").click();
                                            },
                                            0);
                                    };

                                //销毁rootScope上的事件
                                scope.$on("$destroy",
                                    function() {
                                        //destroy the ui.router [stateChageStart] event  
                                        stateChangeStart();
                                    });

                            }

                        };
                    }
                ]
            );
    });