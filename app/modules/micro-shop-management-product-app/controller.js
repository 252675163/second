"use strict";
/**
 * author :
 * time:
 * description:
 */

define(["ionic", "modules/micro-shop-management-product-app/services"],
    function () {
        return angular.module("MicroShopManagementProductApp.controllers", ["MicroShopManagementProductApp.services"])
            .controller("MicroShopManagementProductAppController", [
                "$scope", "$rootScope", "$window", "promptBarService", "commonNetService", "MicroShopManagementProductAppService", "$ionicPopup", "$timeout", "maskService", "singleThreadedNetService", "MicroShopManagementIndexAppService",
                function ($scope, $rootScope, $window, promptBarService, commonNetService, MicroShopManagementProductAppService, $ionicPopup, $timeout, maskService, singleThreadedNetService, MicroShopManagementIndexAppService) {
                    var pageSize = 8;
                    var $parentScope = $scope.$parent;
                    $scope.shownothing = false;
                    $scope.page = {
                        totalCount: 0,
                        currentIndex: 1,
                        itemCount: 0
                    };
                    //编辑
                    $scope.editProduct = function (id) {
                        $scope.$state.go("microshopmanagement.productedit", { id: id });
                    }
                    //显示二维码
                    $scope.showQrCode = function (model) {
                        MicroShopManagementIndexAppService.showQrCodeUrl(model.qrCodeUrl);
                        ////解决android上二维码不能长按保存的情况 将cdn上的路径替换成oss 临时方案
                        //if (ionic.Platform.isIOS()) {
                        //    $parentScope.qrCodeImageUrl = model.qrCode;
                        //} else {
                        //    $parentScope.qrCodeImageUrl = getOssUrlByCdn(model.qrCode);
                        //}

                    };
                    //将cdn上的路径替换成oss
                    function getOssUrlByCdn(cdnUrl) {
                        var ossUrl = "";
                        ossUrl = cdnUrl.replace('http://cdn.schoolpal.cn', 'http://oss.aliyuncs.com/schoolpal');
                        return ossUrl;
                    }
                    //上架
                    $scope.onShelf = function (model) {
                        var confirmPopup = $ionicPopup.confirm({
                            template: "您确认要上架吗?",
                            cancelText: "取消",
                            okText: "确认"
                        });
                        confirmPopup.then(function (res) {
                            if (res) {
                                MicroShopManagementProductAppService.updateMicroShopProductState(model.id, 1).then(function (re) {
                                    if (re.data.status == 1) {
                                        var code = re.data.data,
                                            productStateModel;
                                        switch (code) {
                                            case 0:
                                                productStateModel = {
                                                    name: "仓库中",
                                                    className: "micro-shop-status-green"
                                                };
                                                break;
                                            case 1:
                                                productStateModel = {
                                                    name: "出售中",
                                                    className: ""
                                                };
                                                break;
                                            case 2:
                                                productStateModel = {
                                                    name: "已售罄",
                                                    className: "micro-shop-status-gray"
                                                };
                                                break;
                                            case 3:
                                                productStateModel = {
                                                    name: "已结束",
                                                    className: "micro-shop-status-gray"
                                                };
                                                break;

                                            default:
                                                productStateModel = {
                                                    name: "出售中",
                                                    className: ""
                                                };
                                        }
                                        productStateModel.code = code;
                                        $timeout(function () {
                                            $scope.$apply(function () {
                                                model.productState = 1;
                                                model.productStateModel = productStateModel;
                                            });
                                        });
                                    } else {
                                        promptBarService.showErrorBar(data.message, 3000);
                                    }
                                });
                            }
                        });
                    };
                    //下架
                    $scope.offShelf = function (model) {
                        var confirmPopup = $ionicPopup.confirm({
                            template: "您确认要下架吗？",
                            cancelText: "取消",
                            okText: "确认"
                        });
                        confirmPopup.then(function (res) {
                            if (res) {
                                MicroShopManagementProductAppService.updateMicroShopProductState(model.id, 0).then(function (re) {
                                    if (re.data.status == 1) {
                                        model.productState = 0;
                                        model.productStateModel = {
                                            code: 0,
                                            name: "仓库中",
                                            className: "micro-shop-status-green"
                                        }
                                    } else {
                                        promptBarService.showErrorBar(data.message, 3000);
                                    }
                                });
                            }
                        });

                    };
                    //删除
                    $scope.delete = function (model, index) {
                        var confirmPopup = $ionicPopup.confirm({
                            template: "您确认要删除吗？",
                            cancelText: "取消",
                            okText: "确认"
                        });
                        confirmPopup.then(function (res) {
                            if (res) {
                                MicroShopManagementProductAppService.deleteMicroShopProduct(model.id).then(function (re) {
                                    if (re.data.status == 1) {
                                        $scope.productList.splice(index, 1);
                                        $scope.shownothing = $scope.productList.length == 0;
                                    } else {
                                        promptBarService.showErrorBar(data.message, 3000);
                                    }
                                });
                            }
                        });
                    };
                    $scope.getShareRouter = function () {
                        return window.microShopShareServerName + "/MicroShop"+Math.random().toString(36).substr(2)+"ShareRoute?uiRoute=";
                    }
                    //TODO 分享
                    $scope.share = function (model) {
                        commonNetService.showOptionMenu();
                        //var shareRouter = "Share" + Math.random().toString(36).substr(2) + "Share";
                        //var shareRouter="http://dev.xbx100.cn/MicroShop/ShareRoute?uiRoute=/microshop/productdetail?shopId=12&productId=116";
                        var link = $scope.getShareRouter() + encodeURIComponent("microshop/productdetail?shopId=" + model.shopId + "&productId=" + model.id);
                        //console.log(link);
                        var config = MicroShopManagementProductAppService.shareConfigModel;
                        if (config) {
                            config.link = link;
                            config.desc = "库存一丢丢，下单要趁早！";
                            config.imgUrl = model.imgUrl;
                            if (model.activityType == 1) {
                                config.title= "只要1块钱，快来购买" + model.name + "吧！";
                               
                            } else if (model.activityType == 2) {
                                config.title= "好货不等人，快来购买" + model.name + "吧！";
                            }
                        }
                        maskService.showMask("", 0, false, 2); 
                        //微信自定义分享
                        commonNetService.setShareMessage(config).then(function () {
                            maskService.hideMask();
                        }, function () {
                            maskService.hideMask();
                            promptBarService.showErrorBar("分享出错", 3000);
                        });
                    }
                    //分页加载函数
                    $scope.loadMore = singleThreadedNetService(function () {
                        $scope.page.currentIndex++;
                        return MicroShopManagementProductAppService.getMicroShopProducts($scope.page.currentIndex, pageSize).then(function (result) {
                            var data = result.data;
                            if (data.status == 1 && data.data) {
                                $scope.page = data.data.page;
                                angular.forEach(data.data.list, function (model) {
                                    var productModel = MicroShopManagementProductAppService.parseBizModelToUiModel(model);
                                    $scope.productList.push(productModel);
                                });
                            } else {
                                promptBarService.showErrorBar(data.message, 3000);
                            }
                            $scope.$broadcast("scroll.infiniteScrollComplete");
                        });
                    });
                    //前往商品详情页
                    $scope.toProductDetail = function (model) {
                        if (model.productState == 1) {
                            $scope.$state.go("microshop.productdetail", { shopId: model.shopId, productId: model.id, type: "preview" });
                        }
                    }
                    //添加商品
                    $scope.addProduct = function () {
                        $scope.$state.go("microshopmanagement.productedit", {});
                    }

                    function init() {
                        if ($scope.microShopModel.shopId == 0) {
                            return;
                        }
                        //商品管理百度统计埋点
                        if (window._hmt && $scope.microShopModel.shopId != 0) {
                            window._hmt.push(['_trackPageview', "/MShopBcommodity/ShopID=" + $scope.microShopModel.shopId]);
                        }
                        MicroShopManagementIndexAppService.setFooterTabIndex(1);
                        MicroShopManagementIndexAppService.showTabs(true);
                        $scope.productList = [];
                        MicroShopManagementProductAppService.getMicroShopProducts($scope.page.currentIndex, pageSize).then(function (result) {
                            var data = result.data;
                            if (data.status == 1) {
                                if (data.data) {
                                    $scope.shownothing = data.data.list.length == 0;
                                    $scope.page = data.data.page;
                                    angular.forEach(data.data.list, function (model) {
                                        var productModel = MicroShopManagementProductAppService.parseBizModelToUiModel(model);
                                        $scope.productList.push(productModel);
                                    });
                                }
                                else {
                                    $scope.shownothing = true;
                                }

                            } else {
                                promptBarService.showErrorBar(data.message, 3000);
                            }
                        });
                        //关闭loading动画
                        $scope.hideLoading();
                    }

                    init();


                }
            ]);
    });