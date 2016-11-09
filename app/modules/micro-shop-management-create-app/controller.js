"use strict";
/**
 * author :
 * time:
 * description:
 */

define(["ionic", "modules/micro-shop-management-create-app/services"],
    function () {
        return angular.module("MicroShopManagementCreateApp.controllers", ["MicroShopManagementCreateApp.services"])
            .controller("MicroShopManagementCreateAppController", [
                "$scope", "$rootScope", "$window", "promptBarService", "commonNetService", "MicroShopManagementCreateAppService", "$ionicPopup", "$timeout", "singleThreadedNetService", "userTermsService",
                function ($scope, $rootScope, $window, promptBarService, commonNetService, MicroShopManagementCreateAppService, $ionicPopup, $timeout, singleThreadedNetService, userTermsService) {
                    //tab选中项
                    $scope.tabIndex = 1;

                    //是否同意微店条款
                    $scope.isAgreeUserTerms = true;
                    //显示开通按钮
                    $scope.showOpened = false;
                    //显示申请按钮
                    $scope.showApply = false;
                    // 是否显示填写店铺信息
                    $scope.showEdit = false;
                    //同一个机构重复申请
                    $scope.isRepeatApply = false;
                    $scope.showCreateShopPopup = false;
                    $scope.shop = MicroShopManagementCreateAppService.model;
                    //店铺图片上传配置
                    $scope.uploadConfig = {
                        imageUrlArr: [],
                        imageType: 7,
                        maxImageNum: 1,
                        aspectRatio: 640 / 244
                    }
                    //营业执照上传配置
                    $scope.licenseUploadConfig = {
                        imageUrlArr: [],
                        imageType: 7,
                        maxImageNum: 2,
                        extConfig: {
                            isHaveCutImg: false,
                            serviceType: "license"
                        }
                    }
                    $scope.shopId = 0;
                    //显示创建微店弹框
                    $scope.showCreatePopup = function () {
                        $scope.showCreateShopPopup = true;
                        $scope.showOpened = false;
                    }
                    // 跳转微店申请
                    $scope.toMicroShopApply = function () {
                        if ($scope.isRepeatApply) {
                            promptBarService.showErrorBar("机构已提交申请", 3000);
                        } else {
                            $scope.$state.go("microshopmanagementapply");
                        }

                    }
                    $scope.toggleUserTerms = function () {
                        $scope.isAgreeUserTerms = !$scope.isAgreeUserTerms;
                    }
                    //创建微店
                    $scope.createMicroShop = singleThreadedNetService(function () {
                        $scope.shop.licensePic = getShopImages($scope.licenseUploadConfig.imageUrlArr, 1);
                        $scope.shop.images = getShopImages($scope.uploadConfig.imageUrlArr);
                        if (!validForm()) {
                            return;
                        }
                        if ($scope.shopId != 0) {
                            $scope.$state.go("microshop.index.myshop", { shopId: $scope.shopId, type: "preview" });
                            return;
                        }
                        //请求创建微店接口，跳转至微店首页
                        return MicroShopManagementCreateAppService.createMicroShop($scope.shop).then(function (result) {
                            if (result.data.status == 1) {
                                if (result.data.data != 0) {
                                    $scope.shopId = result.data.data;
                                    $timeout(function () {
                                        $scope.$state.go("microshop.index.myshop", { shopId: $scope.shopId, type: "preview", isFirstLoad: true });
                                    }, 0);
                                }
                            } else {
                                promptBarService.showErrorBar(result.data.message, 3000);
                            }
                        });
                    });
                    //跳转到我的场景
                    $scope.goMyScenes = function () {
                        var url = "index";
                        window.location.href = $scope.getIndexRouter(url);
                    }
                    //跳转微店
                    $scope.goMicroShop = function () {
                        $scope.$state.go("microshopmanagement.index.product", {});
                    }

                    //跳转到报名本
                    $scope.goRegistrationBook = function () {
                        //if ($scope.isSchoolpalUser) {
                        //  window.location.href = "/OAuth/SchoolPalRoute?redirectUrl=" + encodeURIComponent(window.schoolPalAuthenticationServer + "/Consult/ConsultList");
                        //}
                        // else {
                        var url = 'registrationbook/registrationbookall?trace=traceByAppIndex';
                        window.location.href = $scope.getIndexRouter(url);
                        // }
                    }

                    //跳转到个人中心
                    $scope.goUserCenter = function () {
                        var url = 'userCenter';
                        window.location.href = $scope.getIndexRouter(url);
                    };

                    function validForm() {
                        var type = MicroShopManagementCreateAppService.isValid($scope.shop);
                        if (type == 0 && !$scope.isAgreeUserTerms) {
                            type = 8;
                        }
                        switch (type) {
                            case 1:
                                promptBarService.showErrorBar("请填写店铺名称", 3000);
                                return false;
                            case 2:
                                promptBarService.showErrorBar("请填写店铺地址", 3000);
                                return false;
                            case 3:
                                promptBarService.showErrorBar("请填写店铺电话", 3000);
                                return false;
                            case 4:
                                promptBarService.showErrorBar("请输入正确的店铺名称", 3000);
                                return false;
                            case 5:
                                promptBarService.showErrorBar("请输入正确的店铺地址", 3000);
                                return false;
                            case 6:
                                promptBarService.showErrorBar("请输入正确的联系电话", 3000);
                                return false;
                            case 7:
                                promptBarService.showErrorBar("请上传营业执照", 3000);
                                return false;
                            case 8:
                                promptBarService.showErrorBar("请同意校宝微店用户条款", 3000);
                                return false;
                            default:
                                return true;
                        }
                    }
                    //  显示用户条款
                    $scope.showMicroshopUserTerms = function () {
                        userTermsService.showMicroshopUserTerms();
                    }
                    function getShopImages(imageList, type) {
                        var imageArr = [];
                        angular.forEach(imageList, function (url) {
                            var imageObj = {
                                url: type == 1 ? url.slice(0, url.length - 2) : url
                            }
                            imageArr.push(imageObj);
                        });
                        return angular.toJson(imageArr);
                    }

                    function init() {
                        //是否从校宝工作台进来
                        $scope.isSchoolpalUser = (window.isSchoolpalUser == "true") ? true : false;
                        if ($scope.microShopModel.shopId != 0) {
                            $scope.$state.go("microshopmanagement.index.product");
                        }
                        MicroShopManagementCreateAppService.getMicroShopApply().then(function (result) {
                            if (result.data.status == 1) {
                                var data = result.data;
                                if (data.data && data.data.State == 1) {
                                    $scope.showOpened = true;
                                    $scope.showApply = false;
                                } else if (data.data && data.data.State == 0) {
                                    $scope.showApply = true;
                                    $scope.showOpened = false;
                                    $scope.isRepeatApply = true
                                }
                                else {
                                    $scope.showApply = true;
                                    $scope.showOpened = false;
                                }
                            } else {
                                promptBarService.showErrorBar(result.data.message, 3000);
                            }
                            //关闭loading动画
                            $scope.hideLoading();
                        });
                        // if ($scope.hasShop) {
                        //     $scope.$state.go("microshopmanagement.product");
                        // }
                        // MicroShopManagementCreateAppService.getMicroShop().then(function(result) {
                        //     if (result.data.status == 1) {
                        //         var microShop = result.data.data;
                        //         $scope.hasShop = microShop == null || angular.isUndefined(microShop) ? false : true;
                        //         var productStateUrl = "microshopmanagement.product";
                        //         if ($scope.hasShop && $scope.$state.current.name != productStateUrl)
                        //             $scope.$state.go(productStateUrl);

                        //     } else {
                        //         promptBarService.showErrorBar(result.data.message, 3000);
                        //     }
                        // });

                    }

                    init();


                }
            ]);
    });