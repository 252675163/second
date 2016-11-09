"use strict";
/**
 * author :
 * time:
 * description:
 */

define(["ionic", "modules/schoolpal-wallet-withdrawals-app/services"],
    function () {
        return angular.module("SchoolpalWalletWithdrawalsApp.controllers", ["SchoolpalWalletWithdrawalsApp.services"])
            .controller("SchoolpalWalletWithdrawalsAppController", [
                "$scope", "$rootScope", "$window", "$timeout", "SchoolpalWalletWithdrawalsAppService", "promptBarService", "singleThreadedNetService",
                function ($scope, $rootScope, $window, $timeout, SchoolpalWalletWithdrawalsAppService, promptBarService, singleThreadedNetService) {
                    //是否为机构
                    $scope.isOrg = true;
                    //账户信息
                    $scope.account = {};
                    $scope.page = {
                        totalCount: 0,
                        currentIndex: 1,
                        itemCount: 0
                    };
                    var pageSize = 12,
                        hasGetList = false,
                        hasGetAccount = false;
                    //分页加载函数
                    $scope.loadMore = singleThreadedNetService(function () {
                        $scope.page.currentIndex++;
                        return SchoolpalWalletWithdrawalsAppService.getMicroShopEventLogs($scope.page.currentIndex, pageSize).then(function (result) {
                            var data = result.data;
                            if (data.status == 1 && data.data) {
                                $scope.page = data.data.page;
                                angular.forEach(data.data.list, function (model) {
                                    var data = SchoolpalWalletWithdrawalsAppService.parseBizModelToUiModel(model);
                                    $scope.cashDetailsList.push(data);
                                });
                            } else {
                                promptBarService.showErrorBar(data.message, 3000);
                            }
                            $scope.$broadcast("scroll.infiniteScrollComplete");
                        });
                    });
                    //跳转详情页
                    $scope.toDetail = function (id, type) {
                        $scope.$state.go('schoolpalwallet.orderdetail', { id: id, type: type });
                    }

                    //提现按钮
                    $scope.withDraw = function () {
                        if ($scope.account.balance == 0 || !$scope.account.balance) {
                            promptBarService.showErrorBar("您的余额为零，不可提现！", 3000);
                            return;
                        }
                        if ($scope.account.balance < window.withdrawalAmount) {
                            promptBarService.showErrorBar("您的余额小于100，不可提现！", 3000);
                            return;
                        }
                        //提现权限确认
                        SchoolpalWalletWithdrawalsAppService.checkMicroShopDrawApply().then(function (result) {
                            var data = result.data;
                            if (data.status == 1 && data.data) {
                                if (data.data.Status) {
                                    //跳转至校宝钱包公众号
                                    var url = encodeURIComponent("schoolpalwallet/withdrawalsconfirm");
                                    var link = $scope.getWithdrawRouter(url);
                                    $timeout(function () {
                                        window.location.href = link;
                                    }, 0);
                                    //$scope.$state.go('schoolpalwallet.withdrawalsconfirm');
                                } else {
                                    promptBarService.showErrorBar(data.data.Message, 3000);
                                }
                            } else {
                                promptBarService.showErrorBar(data.message, 3000);
                            }
                        });

                    }
                    function init() {
                        $scope.cashDetailsList = [];
                        SchoolpalWalletWithdrawalsAppService.getSchoolPalWalletAccount().then(function (result) {
                            var data = result.data;
                            if (data.status == 1) {
                                if (data.data) {
                                    $scope.account.balance = data.data.Balance;
                                    // $scope.detailType = true;
                                    // $scope.showWitnDraw2 = false;
                                } else {
                                    $scope.account.balance = 0;
                                }
                            } else {
                                promptBarService.showErrorBar(result.data.message, 3000);
                            }
                            hasGetAccount = true;
                            if (hasGetList) {
                                //关闭loading动画
                                $scope.hideLoading();
                            }
                        });

                        //加载提现 订单收入列表
                        SchoolpalWalletWithdrawalsAppService.getMicroShopEventLogs($scope.page.currentIndex, pageSize).then(function (result) {
                            var data = result.data;
                            if (data.status == 1) {
                                if (data.data) {
                                    $scope.page = data.data.page;
                                    angular.forEach(data.data.list, function (model) {
                                        var data = SchoolpalWalletWithdrawalsAppService.parseBizModelToUiModel(model);
                                        $scope.cashDetailsList.push(data);
                                    });
                                } else {
                                    promptBarService.showErrorBar(result.data.message, 3000);
                                }
                            } else {
                                promptBarService.showErrorBar(result.data.message, 3000);
                            }
                            hasGetList = true;
                            if (hasGetAccount) {
                                //关闭loading动画
                                $scope.hideLoading();
                            }
                        });
                    }

                    init();

                }
            ]);
    });