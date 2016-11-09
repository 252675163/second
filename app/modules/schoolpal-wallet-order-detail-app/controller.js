"use strict";
/**
 * author :
 * time:
 * description:
 */

define(["ionic", "modules/schoolpal-wallet-order-detail-app/services"],
    function () {
        return angular.module("SchoolpalWalletOrderDetailApp.controllers", ["SchoolpalWalletOrderDetailApp.services"])
            .controller("SchoolpalWalletOrderDetailAppController", [
                "$scope", "$rootScope", "$window", "$timeout", "SchoolpalWalletAppService", "promptBarService",
                function ($scope, $rootScope, $window, $timeout, SchoolpalWalletAppService, promptBarService) {
                    function init() {
                        $scope.userMsg = {}
                        //判断是提现 还是订单收入 详情页
                        if ($scope.$stateParams.type == 2) {
                            $scope.withdrawalsDetail = true;
                            $rootScope.$state.current.title = "提现";
                            SchoolpalWalletAppService.getMicroShopDrawApplyDetail($scope.$stateParams.id).then(function (result) {
                                var data = result.data;
                                if (data.status == 1) {
                                    if (data.data) {
                                        $scope.orderDetail = SchoolpalWalletAppService.parseBizModelToUiModel(data.data, $scope.$stateParams.type);
                                        SchoolpalWalletAppService.getHeaderNicknameBySchoolPalCloudSignId(data.data.SchoolPalCloudSignId).then(function (result) {
                                            if (result.data.status == 1) {
                                                $scope.userMsg.name = result.data.data.nickName;
                                                $scope.userMsg.defaultShopImgUrl = result.data.data.headImg;
                                            }
                                            else {
                                                promptBarService.showErrorBar(result.data.message, 3000);
                                            }
                                            //关闭loading动画
                                            $scope.hideLoading();
                                        });
                                    }
                                    else {
                                        promptBarService.showErrorBar("不存在该提现申请", 3000);
                                    }
                                }
                                else {
                                    promptBarService.showErrorBar(result.data.message, 3000);
                                }
                            });
                        }
                        else if ($scope.$stateParams.type == 1) {

                            $scope.withdrawalsDetail = false;
                            $rootScope.$state.current.title = '订单收入';
                            SchoolpalWalletAppService.getMicroShopOrder($scope.$stateParams.id).then(function (result) {
                                var data = result.data;
                                if (data.status == 1) {
                                    if (data.data) {
                                        $scope.orderDetail = SchoolpalWalletAppService.parseBizModelToUiModel(data.data, $scope.$stateParams.type);
                                        SchoolpalWalletAppService.getMicroShopUserMsgByUserId(data.data.MicroShopUserId).then(function (result) {
                                            if (result.data.status == 1) {
                                                $scope.userMsg.name = result.data.data.NickName;
                                                $scope.userMsg.defaultShopImgUrl = result.data.data.HeadImageUrl;
                                            }
                                            else {
                                                promptBarService.showErrorBar(result.data.message, 3000);
                                            }
                                        });
                                    }
                                    else {
                                        promptBarService.showErrorBar(result.data.message, 3000);
                                    }
                                }
                                else {
                                    promptBarService.showErrorBar(result.data.message, 3000);
                                }
                                //关闭loading动画
                                $scope.hideLoading();
                            });
                        }
                    }
                    init();
                }
            ]);
    });