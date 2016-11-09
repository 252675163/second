"use strict";
/**
 * author :
 * time:
 * description:
 */

define(["ionic", "modules/micro-shop-my-order-app/services", "services/common-filter"],
    function () {
        return angular.module("MicroShopMyOrderApp.controllers", ["MicroShopMyOrderApp.services", "CommonFilter"])
            .controller("MicroShopMyOrderAppController", [
                "$scope", "$rootScope", "$window", "promptBarService", "commonNetService", "MicroShopMyOrderAppService", "$ionicPopup", "$timeout", "singleThreadedNetService",
                function ($scope, $rootScope, $window, promptBarService, commonNetService, MicroShopMyOrderAppService, $ionicPopup, $timeout, singleThreadedNetService) {
                    $scope.shopId = $scope.$stateParams.shopId;
                    $scope.user = { name: "", phone: "", headImageUrl: "" };
                    var pageSize = 8;
                    $scope.page = {
                        totalCount: 0,
                        currentIndex: 1,
                        itemCount: 0
                    };
                    var hasGetUserInfo = false,
                        hasGetList = false;
                    //TODO 取支付路由
                    $scope.getPayRouter = function () {
                        return window.microShopShareServerName + "/Microshop/PayRoute?p=";
                    }
                    //TODO 支付
                    $scope.toPay = function (order) {
                        //$scope.$state.go("microshopordercheck", { orderId: orderId, productId: productId });
                        var link = $scope.getPayRouter() + encodeURIComponent("microshop/ordercheck?shopId=" + $scope.shopId + "&orderId=" + order.id);
                        location.href = link;
                    }

                    //分页加载函数
                    $scope.loadMore = singleThreadedNetService(function () {
                        $scope.page.currentIndex++;
                        return MicroShopMyOrderAppService.getOrderList($scope.shopId, $scope.page.currentIndex, pageSize).then(
                            function (result) {
                                if (result.data.status == 1) {
                                    var data = result.data;
                                    if (data.data) {
                                        angular.forEach(data.data.list, function (model) {
                                            var productModel = MicroShopMyOrderAppService.parseBizModelToUiModel(model);
                                            $scope.orderList.push(productModel);
                                        });
                                    }
                                } else {
                                    promptBarService.showErrorBar(result.data.message, 3000);
                                }
                                $scope.$broadcast("scroll.infiniteScrollComplete");
                            }
                        );
                    });

                    function init() {
                        $scope.orderList = [];
                        //判断c端用户是否登录
                        if (!$scope.microShopUser || $scope.microShopUser.userId == 0) {
                            $scope.$state.go("microshop.login", { jumpType: 2 });
                            return;
                        }
                        //我的订单页百度统计埋点
                        if (window._hmt) {
                            window._hmt.push(['_trackPageview', "/MShopCmyorder/ShopID=" + $scope.shopId]);
                        }
                        //获取当前用户信息
                        MicroShopMyOrderAppService.getMicroShopUserInfo().then(function (result) {
                            var data = result.data;
                            if (data.status == 1) {
                                if (data.data) {
                                    $scope.user = {
                                        name: data.data.NickName,
                                        phone: data.data.Phone,
                                        headImageUrl: data.data.HeadImageUrl
                                    };
                                }
                            } else {
                                promptBarService.showErrorBar(result.data.message, 3000);
                            }
                            hasGetList = true;
                            if (hasGetUserInfo) {
                                //关闭loading动画
                                $scope.hideLoading();
                            }
                        });
                        //获取我的订单列表
                        MicroShopMyOrderAppService.getOrderList($scope.shopId, $scope.page.currentIndex, pageSize).then(function (result) {
                            var data = result.data;
                            if (data.status == 1) {
                                if (data.data) {
                                    angular.forEach(data.data.list, function (model) {
                                        var orderModel = MicroShopMyOrderAppService.parseBizModelToUiModel(model);
                                        $scope.orderList.push(orderModel);
                                    });
                                    $scope.page = data.data.page;
                                }
                            } else {
                                promptBarService.showErrorBar(result.data.message, 3000);
                            }
                            hasGetUserInfo = true;
                            if (hasGetList) {
                                //关闭loading动画
                                $scope.hideLoading();
                            }
                        });

                    }

                    init();
                }
            ]);
    });