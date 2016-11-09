"use strict";
/**
 * author :
 * time:
 * description:
 */

define(["ionic", "modules/micro-shop-order-check-app/services"],
    function () {
        return angular.module("MicroShopOrderCheckApp.controllers", ["MicroShopOrderCheckApp.services"])
            .controller("MicroShopOrderCheckAppController", [
                "$scope", "$rootScope", "$window", "promptBarService", "commonNetService", "MicroShopOrderCheckAppService", "$timeout", "singleThreadedNetService",
                function ($scope, $rootScope, $window, promptBarService, commonNetService, MicroShopOrderCheckAppService, $timeout, singleThreadedNetService) {
                    $scope.productId = $scope.$stateParams.productId;
                    $scope.orderId = $scope.$stateParams.orderId;
                    $scope.activityUserId = $scope.$stateParams.activityUserId;
                    $scope.user = { phone: "", name: "" };
                    $scope.shopId = $scope.$stateParams.shopId;
                    var hasPay = false,
                        isPaying = false;

                    function payCallback(res) {
                        if (res.err_msg == "get_brand_wcpay_request:ok") {
                            $timeout(function () {
                                $scope.$apply(function () {
                                    $scope.paySuccess = true;
                                });
                            });
                            hasPay = true;
                            //更新订单状态
                            MicroShopOrderCheckAppService.payReturn($scope.orderId).then(function (re) {
                            });
                        }
                        if (res.err_msg == "get_brand_wcpay_request:cancel") {
                        }
                        if (res.err_msg == "get_brand_wcpay_request:fail") {
                            promptBarService.showErrorBar("支付失败", 3000);
                        }
                        isPaying = false;
                    }
                    // 去支付 
                    $scope.pay = singleThreadedNetService(function () {
                        if (isPaying && hasPay) {
                            return;
                        }
                        MicroShopOrderCheckAppService.getMicroShopOrderByPay($scope.orderId).then(function (result) {
                            if (result.data.status == 1) {
                                var data = result.data.data;
                                if (data) {
                                    var orderState = data.OrderState;
                                    if (orderState == 0) {
                                        var res = commonNetService.callWxPay($scope.parameters, payCallback);
                                        if (!res) {
                                            isPaying = false;
                                            promptBarService.showErrorBar("支付环境异常", 3000);
                                            return;
                                        }
                                    }
                                    else if (orderState == 1) {
                                        promptBarService.showErrorBar("订单已付款", 3000);
                                    }
                                    else if (orderState == 2) {
                                        promptBarService.showErrorBar("订单已完成", 3000);
                                    }
                                    else if (orderState == 3) {
                                        promptBarService.showErrorBar("订单已失效", 3000);
                                    }
                                    isPaying = false;
                                }
                            }
                            else {
                                promptBarService.showErrorBar(result.data.message, 3000);
                            }
                        });




                    });
                    ////商品是否上架状态
                    //function isProductOnSelf(flag) {
                    //    if (!flag) {
                    //        window.location.href = "/Common/MicroShopError?errorMsg=productOffSelf";
                    //    }
                    //}
                    $scope.getShareRouter = function () {
                        return window.microShopShareServerName + "/MicroShop" + Math.random().toString(36).substr(2) + "ShareRoute?uiRoute=";
                    }
                    $scope.goMyOrder = function () {
                        var link = $scope.getShareRouter() + encodeURIComponent("microshop/index/myorder?shopId=" + $scope.shopId);
                        $timeout(function () {
                            location.href = link;
                        },0);
                    }
                    function init() {
                        window.wx && window.wx.hideOptionMenu();
                        $scope.paySuccess = false;
                        MicroShopOrderCheckAppService.getMicroShopOrder($scope.orderId).then(function (result) {
                            if (result.data.status == 1) {
                                var data = result.data.data;
                                if (data && data.order && data.product) {
                                    $scope.order = MicroShopOrderCheckAppService.parseBizModelToUiModel(data.order, data.product);
                                    //isProductOnSelf($scope.order.isOnSelf);
                                }
                                else {
                                    //isProductOnSelf(false);
                                }
                            }
                            else {
                                promptBarService.showErrorBar(result.data.message, 3000);
                            }
                            //关闭loading动画
                            $scope.hideLoading();
                        });
                        MicroShopOrderCheckAppService.getPayParameters($scope.orderId).then(function (result) {
                            if (result.status == 200) {
                                if (result.data == 1 || result.data == 2) {
                                    promptBarService.showErrorBar("订单已支付", 3000);
                                }
                                else if (result.data == 3) {
                                    promptBarService.showErrorBar("订单已失效", 3000);
                                }
                                else if (!result.data) {
                                    promptBarService.showErrorBar("获取支付参数失败", 3000);
                                }
                                else {
                                    $scope.parameters = result.data;
                                }
                            }
                            else {
                                promptBarService.showErrorBar(result.message, 3000);
                            }
                        });

                    }
                    init();
                }
            ]);
    });