"use strict";
/**
 * author :
 * time:
 * description:
 */

define(["ionic", "modules/user-redeemcode-exchange-app/services"],
    function() {
        return angular.module("UserRedeemCodeExchangeApp.controllers", ["UserRedeemCodeExchangeApp.services", "services.net.grass"])
            .controller("userRedeemCodeExchangeAppController", [
                "$scope", "$rootScope", "promptBarService", "userRedeemCodeExchangeAppService", "$ionicPopup", "$timeout", "commonNetService", "$ionicHistory",
                function ($scope, $rootScope, promptBarService, userRedeemCodeExchangeAppService, $ionicPopup, $timeout, commonNetService, $ionicHistory) {

                    $scope.showVipExplain = "http://mp.weixin.qq.com/s?__biz=MzIxNDA5MTcyOQ==&mid=408105727&idx=1&sn=549f233514de63aacca5d1e7f0b91e90";

                    //兑换确定按钮
                    $scope.exchangeVipCode = function () {

                        //防止重复提交
                        if ($scope.isExchange)
                        {
                            return;
                        }

                        //验证vip码
                        if ($scope.VipCode != "") {
                            $scope.isExchange = true;
                            userRedeemCodeExchangeAppService.exchangeVip($scope.VipCode).then(function (res) {

                                $scope.isExchange = false;

                                //验证成功
                                if (res.data.status == 1) {
                                    $scope.exchangeState = true;

                                    //你的vip剩余天数
                                    $scope.vipDateRest = res.data.data.Rest;
                                }
                                else
                                {
                                    promptBarService.showErrorBar(res.data.message, 3000);
                                }
                            }, null)

                        } else {
                            promptBarService.showErrorBar("请输入VIP码", 3000);
                        }
                    };

                    //跳转到VIP订单列表页面
                    $scope.goUserOrderList = function(){
                        $scope.$state.go("userOrderList", { comeFrom: 3 });
                    };

                    //跳转到用户中心
                    $scope.goUserCenter = function () {
                        $scope.$state.go("userCenter", {});
                    };

                    function init() {

                        commonNetService.addBackgroundOperationLog("VipCode");
                        $scope.VipCode = "";
                        $scope.exchangeState = false;
                            
                        if ($scope.$stateParams.quivive) {
                            userRedeemCodeExchangeAppService.exchangeVip($scope.$stateParams.quivive).then(function (res) {
                                //验证成功
                                if (res.data.status == 1) {
                                    $scope.exchangeState = true;

                                    //你的vip剩余天数
                                    $scope.vipDateRest = res.data.data.Rest;
                                }
                                else {
                                    promptBarService.showErrorBar(res.data.message, 3000);
                                }

                                //清除历史记录
                                $ionicHistory.clearHistory();

                                //统一增加后台页面的Loading效果 by xp 2015年11月13日 16:09:13
                                if (!$rootScope.isFirstLoad) {
                                    $timeout(function () {
                                        $(".lockMask-loading2").hide();
                                        $rootScope.isFirstLoad = true;
                                    }, 1833);
                                } else {
                                    $timeout(function () {
                                        $(".lockMask-loading2").hide();
                                        $rootScope.isFirstLoad = true;
                                    }, 1000);
                                }
                            });
                        }
                            
                        if (!$scope.$stateParams.quivive) {
                            //统一增加后台页面的Loading效果 by xp 2015年11月13日 16:09:13
                            if (!$rootScope.isFirstLoad) {
                                $timeout(function () {
                                    $(".lockMask-loading2").hide();
                                    $rootScope.isFirstLoad = true;
                                }, 1833);
                            } else {
                                $timeout(function () {
                                    $(".lockMask-loading2").hide();
                                    $rootScope.isFirstLoad = true;
                                }, 1000);
                            }
                        }
                    }
                    init();
                }
            ]);
    });