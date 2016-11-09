"use strict";
/**
 * author :yinglechao
 * time: 2015年9月13日
 * description:
 */


define(["ionic"],
    function () {
        angular.module("UploadImg.directive", [])
            .directive("uploadImg",
                [
                    "$window", "$timeout", "uploadImgService", "$ionicLoading", "$rootScope",
                    function ($window, $timeout, uploadImgService, $ionicLoading, $rootScope) {
                        return {
                            restrict: "EA",
                            scope: true,
                            templateUrl: "components/upload_img/upload_img.html",
                            link: function (scope, iElement, iAttr) {
                                //图片文件对象
                                var imageFile;
                                //Method  destroy the cropper and report base64 [img] dom |||| xp 2015年12月29日 12:43:41
                                var removeDom = function () {
                                    var $img = $(iElement).find("#report > img");
                                    $img.cropper && $img.cropper("destroy");
                                    $img.remove();
                                };


                                function toFixed2(num) {
                                    return parseFloat(+num.toFixed(2));
                                }

                                $(iElement)
                                    .find("#cancleBtn")
                                    .on("click",
                                        function () {
                                            $(iElement).find("#showEdit").fadeOut();
                                            angular.isFunction(scope.cancelFunction) ? scope.cancelFunction() : "";
                                            removeDom();
                                            //   scope.isUpdateImg = false;
                                        });

                                $(iElement)
                                    .find("#confirmBtn")
                                    .on("click", confirmBtnHandle);
                                function confirmBtnHandle() {
                                    $(iElement).find("#showEdit").fadeOut();
                                    var $image = $(iElement).find("#report > img");
                                    var dataURL = "", imgurl = "";
                                    if (scope.extConfig.isHaveCutImg) {
                                        dataURL = $image.cropper("getCroppedCanvas");
                                        imgurl = dataURL.toDataURL(scope.fileType, 0.5);
                                    } else {
                                        imgurl = $image.attr("src");
                                    }
                                    $ionicLoading.show({
                                        template: "<div>" +
                                            '<div class="lockMask"></div>' +
                                            '<div class="pic_upload_loading"></div>' +
                                            "</div>"
                                    });

                                    //如果是微店营业执照图片上传，上传文件对象
                                    if (scope.extConfig.serviceType == "license") {
                                        imgurl = imageFile;
                                    }
                                    uploadImgService.upload(scope.fileName, imgurl, scope.fileUsage, scope.extConfig.serviceType)
                                        .then(
                                            function (result) {
                                                scope.finishFunction(result.data.data);
                                                //destroy the cropper
                                                $image.cropper && $image.cropper("destroy");
                                                $timeout(function () {
                                                    removeDom();
                                                    $ionicLoading.hide();
                                                },
                                                    800);


                                            },
                                            function (result) {
                                                //alert(JSON.stringify(result.data).toString().substring(100));
                                                //destroy the cropper
                                                removeDom();
                                                $timeout(function () {
                                                    $ionicLoading.hide();
                                                },
                                                    800);
                                            }
                                        );


                                }
                                function cutImg() {
                                    $(iElement).find("#showEdit").fadeIn();
                                    var $image = $(iElement).find("#report > img");
                                    $image.cropper(
                                        //裁剪配置参数
                                        scope.config
                                    );
                                }

                                function doFinish(startTimestamp, sSize, rst) {
                                   if (scope.extConfig.isHaveCutImg) {
                                    $timeout(function() {
                                            $ionicLoading.hide();
                                        },
                                        800);
                                    }

                                    $(iElement)
                                        .find("#report")
                                        .html("<img src=\"" + rst.base64 + "\" style=\"width: 100%;height:100%\">");
                                    //如果不需要裁剪，直接上传图片
                                    if (!scope.extConfig.isHaveCutImg) {
                                        confirmBtnHandle();
                                    } else {
                                        //压缩完成后裁剪
                                        cutImg();

                                    }

                                }
                                function checkImageType(type, thisScope) {
                                    if (type == "jpg" && thisScope.files[0].type.toLocaleLowerCase() != "image/jpeg") {
                                        return 0;

                                    }
                                    if (type == "png" && thisScope.files[0].type.toLocaleLowerCase() != "image/png") {
                                        return 0;

                                    }
                                    return 1;
                                }

                                //路由发生变化，裁剪框消失
                                var stateChangeStart = $rootScope.$on("$stateChangeStart",
                                    function (event, toState, toParams, fromState, fromParams) {
                                        $(iElement).find("#showEdit").fadeOut();
                                    });

                                $(iElement)
                                    .find("#image")
                                    .on("change",
                                        function () {
                                            if (this.files[0].size > 10 * 1024 * 1024) {
                                                $timeout(function () {
                                                    scope.isShowError = true;
                                                },
                                                    0);
                                                scope.remind = "请上传不超过10MB的图片！";
                                                $timeout(function () {
                                                    scope.isShowError = false;
                                                },
                                                    3000);
                                                //解决选择同一张图片不能触发change事件问题
                                                $(iElement).find("#image").val("");
                                                return;
                                            }
                                            imageFile = this.files[0];
                                            //如果图片超过一兆，压缩时降低图片品质
                                            if (this.files[0].size > 1 * 1024 * 1024) {
                                                scope.config.quality = 0.7;
                                            }
                                            var supportImgType = scope.extConfig.supportImgType;
                                            //默认配置 允许上传jpg和png
                                            if (supportImgType == "default") {
                                                if (this.files[0].type.toLocaleLowerCase() != "image/jpeg" &&
                                                    this.files[0].type.toLocaleLowerCase() != "image/png") {
                                                    $timeout(function () {
                                                        scope.isShowError = true;
                                                    },
                                                        0);
                                                    //scope.isShowError=true;
                                                    scope.remind = "请上传jpg或png格式的图片！！";
                                                    $timeout(function () {
                                                        scope.isShowError = false;
                                                    },
                                                        3000);
                                                    //解决选择同一张图片不能触发change事件问题
                                                    $(iElement).find("#image").val("");
                                                    return;
                                                }
                                            }
                                            else if (Object.prototype.toString.call(supportImgType) == "[object Array]") {
                                                var matchCount = 0;
                                                var _this = this;
                                                angular.forEach(supportImgType, function (type) {
                                                    matchCount += checkImageType(type, _this);

                                                });
                                                if (matchCount === 0) {
                                                    $timeout(function () {
                                                        scope.isShowError = true;
                                                    },
                                                        0);
                                                    //scope.isShowError=true;
                                                    var typeStr = scope.extConfig.supportImgType.slice(0, supportImgType.length - 1).join("、");
                                                    scope.remind = "请上传" + typeStr + (typeStr?"或":"") + supportImgType[supportImgType.length - 1] + "格式的图片！！";
                                                    $timeout(function () {
                                                        scope.isShowError = false;
                                                    },
                                                        3000);
                                                    //解决选择同一张图片不能触发change事件问题
                                                    $(iElement).find("#image").val("");
                                                    return;

                                                }
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
                                                    quality: scope.config.quality || 1
                                                })
                                                .then(function (rst) {
                                                    doFinish(startTimestamp, that.files[0].size, rst);
                                                    //解决选择同一张图片不能触发change事件问题
                                                    $(iElement).find("#image").val("");
                                                    return rst;
                                                })
                                                .always(function () {
                                                    // 不管是成功失败，这里都会执行

                                                });
                                        });


                                //@config obj cropper配置
                                //@fileUsage int 文件保存作用域Website = 0,Activity = 1,ActivityUser = 2,QrCode = 3,QrCodeLimit = 4,Weixin = 5,Leaflet = 6
                                //@finishFunction Function   完成回调函数
                                //@cancelFunction Function   取消回调函数
                                //@extConfig obj 扩展配置 isHaveCutImg 是否需要裁剪，默认为true需要
                                uploadImgService.upLoadImg = function (config, fileUsage, finishFunction, cancelFunction, extConfig) {
                                    scope.fileUsage = fileUsage;
                                    if (!config) {
                                        scope.config = uploadImgService.config;
                                    } else {
                                        scope.config = config;
                                    }

                                    var newExtConfig = angular.extend({}, uploadImgService.extConfig, extConfig);
                                    scope.extConfig = newExtConfig;

                                    //如果不需要裁剪，压缩时将图片的品质较低
                                    if (!scope.extConfig.isHaveCutImg) {
                                        scope.config.quality = 0.7;
                                    }
                                    scope.finishFunction = finishFunction;
                                    scope.cancelFunction = cancelFunction ? cancelFunction : "";


                                    $timeout(function () {
                                        $(iElement).find("#image").click();
                                    },
                                        0);
                                };


                                //销毁该指令
                                scope.$on("$destroy",
                                    function () {
                                        //destroy the ui.router [stateChageStart] event  
                                        stateChangeStart();
                                        removeDom();
                                    });

                            }

                        };
                    }
                ]
            );
    });