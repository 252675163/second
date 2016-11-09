"use strict";
/**
 * author :
 * time:
 * description:
 */

define(["ionic", "modules/micro-shop-koubei-management-order-app/services"],
    function() {
        return angular.module("MicroShopKoubeiManagementOrderApp.controllers", ["MicroShopKoubeiManagementOrderApp.services"])
            .controller("MicroShopKoubeiManagementOrderAppController", [
                "$scope", "$rootScope", "$window", "promptBarService", "commonNetService", "MicroShopKoubeiManagementOrderAppService", "MicroShopKoubeiManagementAppService", "$ionicPopup", "$timeout", "maskService", "singleThreadedNetService",
                function($scope, $rootScope, $window, promptBarService, commonNetService, MicroShopKoubeiManagementOrderAppService, MicroShopKoubeiManagementAppService, $ionicPopup, $timeout, maskService, singleThreadedNetService) {
                    var pageSize = 8;
                    $scope.shownothing = false;
                    //--end
                    $scope.page = {
                        totalCount: 10,
                        currentIndex: 1,
                        itemCount: 8
                    };
                    //分页加载函数
                    $scope.loadMore = singleThreadedNetService(function() {
                        $scope.page.currentIndex++;
                        return MicroShopKoubeiManagementOrderAppService.getMicroShopOrders($scope.page.currentIndex, pageSize).then(function(result) {
                            var data = result.data;
                            if (data.status == 1 && data.data) {
                                $scope.page = data.data.page;
                                angular.forEach(data.data.list, function(model) {
                                    var productModel = MicroShopKoubeiManagementOrderAppService.parseBizModelToUiModel(model);
                                    $scope.orderList.push(productModel);
                                });
                            } else {
                                promptBarService.showErrorBar(data.message, 3000);
                            }
                            $scope.$broadcast("scroll.infiniteScrollComplete");
                        });
                    });

                    //更新订单状态为已完成
                    $scope.updateOrderFinish = singleThreadedNetService(function(order) {
                        var confirmPopup = $ionicPopup.confirm({
                            template: "您确认此订单已完成了吗？",
                            cancelText: "取消",
                            okText: "确认"
                        });
                        confirmPopup.then(function(res) {
                            if (res) {
                                MicroShopKoubeiManagementOrderAppService.updateMicroShopOrderFinish(order.id).then(function(result) {
                                    if (result.data.status == 1) {
                                        order.orderStateCodeModel = {
                                            code: 2,
                                            name: "已完成",
                                            className: "micro-shop-status-gray"
                                        };
                                    } else {
                                        promptBarService.showErrorBar(data.message, 3000);
                                    }
                                });
                            }
                        });
                    });

                    function init() {
                        //订单管理百度统计埋点
                        // if (window._hmt && $scope.microShopModel.shopId != 0) {
                        //     window._hmt.push(['_trackPageview', "/MShopBorder/ShopID=" + $scope.microShopModel.shopId]);
                        // }
                        MicroShopKoubeiManagementAppService.setFooterTabIndex(2);
                        MicroShopKoubeiManagementAppService.showTabs(true);
                        // $scope.orderList = [];
                        // MicroShopKoubeiManagementOrderAppService.getMicroShopOrders($scope.page.currentIndex, pageSize).then(function(result) {
                        //     var data = result.data;
                        //     if (data.status == 1) {
                        //         if (data.data) {
                        //             $scope.shownothing = data.data.list.length == 0;
                        //             $scope.page = data.data.page;
                        //             angular.forEach(data.data.list, function(model) {
                        //                 var productModel = MicroShopKoubeiManagementOrderAppService.parseBizModelToUiModel(model);
                        //                 $scope.orderList.push(productModel);
                        //             });
                        //         } else {
                        //             $scope.shownothing = true;
                        //         }

                        //     } else {
                        //         promptBarService.showErrorBar(data.message, 3000);
                        //     }
                        // });
                        //关闭loading动画
                        $scope.hideLoading();
                    }

                    init();


                }
            ]);
    });