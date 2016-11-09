"use strict";
/**
 * author :
 * time:
 * description:
 */

define(["ionic", "modules/micro-shop-my-product-app/services", "services/common-filter"],
    function () {
        return angular.module("MicroShopMyProductApp.controllers", ["MicroShopMyProductApp.services", "CommonFilter"])
            .controller("MicroShopMyProductAppController", [
                "$scope", "$rootScope", "$window", "promptBarService", "commonNetService", "MicroShopMyProductAppService", "$ionicPopup", "$timeout", "$interval", "maskService", "$filter", "singleThreadedNetService",
                function ($scope, $rootScope, $window, promptBarService, commonNetService, MicroShopMyProductAppService, $ionicPopup, $timeout, $interval, maskService, $filter, singleThreadedNetService) {
                    $scope.shopId = $scope.$stateParams.shopId;
                    $scope.systemTime = "";
                    var timeInterval = null;
                    var filter = $filter;
                    var pageSize = 8;
                    $scope.page = {
                        totalCount: 0,
                        currentIndex: 1,
                        itemCount: 0
                    };
                    //TODO 分页加载函数
                    $scope.loadMore = singleThreadedNetService(function () {
                        $scope.page.currentIndex++;
                        return MicroShopMyProductAppService.getMyProductsList($scope.shopId, $scope.page.currentIndex, pageSize).then(
                            function (result) {
                                var data = result.data;
                                $interval.cancel(timeInterval);
                                if (data.status == 1) {
                                    if (data.data) {
                                        $scope.page = data.data.page;
                                        angular.forEach(data.data.list, function (model) {
                                            var productModel = MicroShopMyProductAppService.parseBizModelToUiModel(model);
                                            if (productModel.productStateModel.code == 0) {
                                                productModel.leftSeconds = filter("diffSeconds")($scope.systemTime, productModel.marketDate);
                                            }
                                            $scope.productList.push(productModel);
                                        });
                                        timeInterval = $interval(function () {
                                            angular.forEach($scope.productList, function (model) {
                                                if (model.productStateModel.code == 0) {
                                                    model.leftSeconds -= 1;
                                                }
                                            });
                                        }, 1000);
                                    }
                                } else {
                                    promptBarService.showErrorBar(result.data.message, 3000);
                                }
                                $scope.$broadcast("scroll.infiniteScrollComplete");
                            }
                        );
                    });
                    //去下单按钮
                    $scope.toSubmitOrder = function (model) {
                        $scope.$state.go("microshop.activity.bargain", { activityUserId: model.activityUserId, productId: model.productId });
                    }
                    //查看商品活动页
                    $scope.toProductActivity = function (model) {
                        if (model.activityTypeModel.type == 1) {
                            $scope.$state.go("microshop.activity.bargain", { activityUserId: model.activityUserId, productId: model.productId });
                        }
                    }
                    //清楚倒计时计时器
                    var stateChangeStart = $rootScope.$on("$stateChangeStart",
                        function () {
                            $interval.cancel(timeInterval);
                        });

                    //销毁rootScope上的事件
                    $scope.$on("$destroy", function () {
                        stateChangeStart();
                    });


                    function init() {
                        //判断c端用户是否登录
                        if (!$scope.microShopUser || $scope.microShopUser.userId == 0) {
                            $scope.$state.go("microshop.login", { jumpType: 3 });
                        }
                        //我的商品页百度统计埋点
                        if (window._hmt) {
                            window._hmt.push(['_trackPageview', "/MShopCmycommodity/ShopID=" + $scope.shopId]);
                        }
                        $scope.productList = [];
                        MicroShopMyProductAppService.getMyProductsList($scope.shopId, 1, pageSize).then(function (result) {
                            var data = result.data;
                            if (data.status == 1) {
                                if (data.data) {
                                    angular.forEach(data.data.list, function (model) {
                                        var productModel = MicroShopMyProductAppService.parseBizModelToUiModel(model);
                                        $scope.productList.push(productModel);
                                    });
                                    MicroShopMyProductAppService.getServerDateTime().then(function (result) {
                                        if (result.data.status == 1) {
                                            $scope.systemTime = result.data.data;
                                            angular.forEach($scope.productList, function (model) {
                                                if (model.productStateModel.code == 0) {
                                                    model.leftSeconds = filter("diffSeconds")($scope.systemTime, model.marketDate);
                                                }
                                            });
                                            timeInterval = $interval(function () {
                                                angular.forEach($scope.productList, function (model) {
                                                    if (model.productStateModel.code == 0) {
                                                        model.leftSeconds -= 1;
                                                    }
                                                });
                                            }, 1000);
                                        }
                                        else {
                                            promptBarService.showErrorBar(result.data.message, 3000);
                                        }
                                        //关闭loading动画
                                        $scope.hideLoading();
                                    });
                                    //$scope.productList = result.data.data;
                                    $scope.page = data.data.page;
                                }
                                else {
                                    //关闭loading动画
                                    $scope.hideLoading();
                                }
                            }
                            else {
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