"use strict";
/**
 * author :
 * time:
 * description:
 */

define(["ionic", "modules/micro-shop-management-shop-app/services", "components/textinput_callback/app"],
    function () {
        return angular.module("MicroShopManagementShopApp.controllers", ["MicroShopManagementShopApp.services", "TextInputCallback"])
            .controller("MicroShopManagementShopAppController", [
                "$scope", "$rootScope", "$window", "promptBarService", "commonNetService", "MicroShopManagementShopAppService", "$ionicPopup", "$timeout", "maskService", "textInputCallbackService", "MicroShopManagementIndexAppService",
                function ($scope, $rootScope, $window, promptBarService, commonNetService, MicroShopManagementShopAppService, $ionicPopup, $timeout, maskService, textInputCallbackService, MicroShopManagementIndexAppService) {
                    //机构图片上传配置
                    $scope.uploadConfig = {
                        imageUrlArr: [],
                        imageType: 7,
                        maxImageNum: 1,
                        aspectRatio: 640 / 244,
                        callback: function () {
                            $scope.shop.images = getShopImages(1);
                            MicroShopManagementShopAppService.editMicroShop($scope.shop).then(function (result) {
                                if (result.data.status == 1) {

                                } else {
                                    promptBarService.showErrorBar(result.data.message, 3000);
                                }
                            });
                        }
                    }
                    //营业执照上传配置
                    $scope.licenseUploadConfig = {
                        imageUrlArr: [],
                        imageType: 7,
                        maxImageNum: 2,
                        extConfig: {
                            isHaveCutImg: false,
                            serviceType: "license"
                        },
                        callback: function () {
                            $scope.shop.licensePic = getShopImages(2);
                            MicroShopManagementShopAppService.editMicroShop($scope.shop).then(function (result) {
                                if (result.data.status == 1) {

                                } else {
                                    promptBarService.showErrorBar(result.data.message, 3000);
                                }
                            });
                        }
                    }
                    //显示二维码
                    $scope.showQrCode = function () {
                        MicroShopManagementIndexAppService.showQrCodeUrl($scope.shop.qrCodeUrl);
                    };
                    //获取图片url
                    function getShopImages(type) {
                        var list = type == 1 ? $scope.uploadConfig.imageUrlArr : $scope.licenseUploadConfig.imageUrlArr,
                            imageArr = [];
                        angular.forEach(list,
                            function (url) {
                                var imageObj = {
                                    url: type == 2 ? url.slice(0, url.length - 2) : url
                                }
                                imageArr.push(imageObj);
                            });
                        return angular.toJson(imageArr);
                    }
                    //同步
                    $scope.syn = function (type) {
                        $scope.$state.go("microshopmanagement.syn", { type: type });
                    }
                    //编辑信息
                    $scope.showText = function (type) {
                        var charType;
                        if (type == "name") {
                            charType = {
                                type: "name",
                                maxLength: 18,
                                isDiff: false
                            }
                        } else if (type == "address") {
                            charType = {
                                type: "address",
                                maxLength: 40,
                                isDiff: false
                            }
                        } else if (type == "contact") {
                            charType = {
                                type: "contact",
                                maxLength: 20,
                                isDiff: false
                            }
                        } else if (type == "introduce") {
                            charType = {
                                type: "introduce",
                                maxLength: 500,
                                isDiff: false
                            }
                        }

                        var setValue = function () {
                            //获得更改后的值
                            var value = textInputCallbackService.getCurrentValue();

                            var data = angular.copy($scope.shop);
                            data[type] = value;

                            if (type == "contact") {
                                var phoneRegexp = /^(0[0-9]{2,3})?([2-9][0-9]{6,7})$|(^(1[3|5|8|4|7])\d{9}$)/;
                                //      console.log(phoneRegexp.test(phone));
                                if (!phoneRegexp.test(value)) {
                                    promptBarService.showErrorBar("请输入正确的联系电话", 3000); //号码不正确
                                    return;
                                }
                            }
                            if (type == "name") {
                                if (value.trim() == "") {
                                    promptBarService.showErrorBar("请输入正确的店铺名称", 3000);
                                    return;
                                }
                            }
                            if (type == "address") {
                                if (value.trim() == "") {
                                    promptBarService.showErrorBar("请输入正确的详细地址", 3000);
                                    return;
                                }
                            }

                            $scope.shop[type] = value;
                            MicroShopManagementShopAppService.editMicroShop(data).then(function (result) {
                                if (result.data.status == 1) {

                                } else {
                                    promptBarService.showErrorBar(result.data.message, 3000);
                                }
                            });
                        }
                        //更改的字段，回调函数，输入限制
                        textInputCallbackService.showTextInput($scope.shop[type], setValue, charType);
                    }


                    $scope.previewShop = function () {
                        $scope.$state.go("microshop.index.myshop", { shopId: $scope.shop.id, type: "preview" });
                    }

                    function init() {
                        //店铺管理百度统计埋点
                        if (window._hmt && $scope.microShopModel.shopId != 0) {
                            window._hmt.push(['_trackPageview', "/MShopBadmin/ShopID=" + $scope.microShopModel.shopId]);
                        }
                        MicroShopManagementIndexAppService.setFooterTabIndex(3);
                        MicroShopManagementIndexAppService.showTabs(true);
                        MicroShopManagementShopAppService.getMicroShop().then(function (result) {
                            if (result.data.status == 1 && result.data.data) {
                                var shopInfoModel = MicroShopManagementShopAppService.showShopInfos(result.data.data);
                                $scope.shop = shopInfoModel;
                                var img = angular.fromJson($scope.shop.images);
                                angular.forEach(img, function (image) {
                                    $scope.uploadConfig.imageUrlArr.push(image.url);
                                });
                                if ($scope.shop.licensePic) {
                                    var licensePic = angular.fromJson($scope.shop.licensePic);
                                    angular.forEach(licensePic, function (image) {
                                        $scope.licenseUploadConfig.imageUrlArr.push(image.url+"-m");
                                    });
                                }

                                //关闭loading动画
                                $scope.hideLoading();
                            } else {
                                //关闭loading动画
                                $scope.hideLoading();
                                promptBarService.showErrorBar(result.data.message, 3000);
                            }
                        });
                    }

                    init();


                }
            ]);
    });