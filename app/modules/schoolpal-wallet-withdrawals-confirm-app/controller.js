"use strict";
/**
 * author :
 * time:
 * description:
 */

define(["ionic", "modules/schoolpal-wallet-withdrawals-confirm-app/services"],
    function () {
        return angular.module("SchoolpalWalletWithdrawalsConfirmApp.controllers", ["SchoolpalWalletWithdrawalsConfirmApp.services"])
            .controller("SchoolpalWalletWithdrawalsConfirmAppController", [
                "$scope", "$rootScope", "$window", "$timeout", "SchoolpalWalletWithdrawalsConfirmAppService", "promptBarService", "singleThreadedNetService", "$interval",
                function ($scope, $rootScope, $window, $timeout, SchoolpalWalletWithdrawalsConfirmAppService, promptBarService, singleThreadedNetService, $interval) {
                    //账户信息
                    $scope.account = {};
                    //是否是第一次发验证码
                    $scope.firstSend = 1;
                    $scope.countdown = 0;
                    //校长手机
                    $scope.phone = $scope.phone;
                    //是否为机构版
                    $scope.isOrg = true;
                    //短信弹窗
                    $scope.showPopup = false;
                    //输入金额
                    $scope.inputNum = '';
                    //验证码
                    $scope.code = '';
                    //提交按钮是否可用
                    $scope.ableToSubmit = false;
                    $scope.introduction = '1、校宝钱包余额不足100元时不可提现\n' +
                        '2、当日提现的金额第2天到账\n' +
                        '3、提现手续费：1%（用于支付微信服务费等费用）\n' +
                        '4、每周最多可提现2次\n' +
                        '5、提现钱款会转账至您的微信->我的->钱包中\n';
                    var myTime,
                        hasGetPhone = false,
                        hasGetAccount = false;
                    $scope.withdrawalsConfirm = true;
                    $scope.withdrawalsSuccess = false;
                    //正整数正则
                    var numReg = new RegExp(/^[0-9]*[1-9][0-9]*$/);
                    //判断是否输入金额
                    $scope.check = function () {
                        if (numReg.test($scope.inputNum) && $scope.account.balance >= $scope.inputNum && $scope.inputNum >= window.withdrawalAmount) {
                            $scope.ableToSubmit = true;
                            return true;
                        } else {
                            $scope.ableToSubmit = false;
                            return false;
                        }
                    }
                    //提现 显示验证号码弹窗
                    $scope.withDraw = function () {
                        if ($scope.ableToSubmit) {
                            if ($scope.account.balance < $scope.inputNum) {
                                promptBarService.showErrorBar("输入金额不能大于账户余额", 3000);
                                return;
                            }
                            else if ($scope.inputNum < window.withdrawalAmount) {
                                promptBarService.showErrorBar("每次提现金额不能小于100", 3000);
                                return;
                            }
                            else {
                                $scope.showPopup = true;
                            }
                        } else {
                            return;
                        }
                    }
                    //发送验证码
                    $scope.getVerificationCode = singleThreadedNetService(function () {
                        return SchoolpalWalletWithdrawalsConfirmAppService.getVerificationCode().then(function (result) {
                            var data = result.data;
                            if (data.status == 1) {
                                $scope.countdown = 60;
                                $scope.firstSend = 0;
                                myTime = $interval(function () {
                                    if ($scope.countdown <= 0) {
                                        $interval.cancel(myTime);
                                        return;
                                    } else {
                                        $scope.countdown--;
                                    }
                                }, 1000);
                            } else {
                                promptBarService.showErrorBar(result.data.message, 3000);
                            }
                        });
                    });
                    //页面离开时销毁计时器
                    var stateChangeStart = $rootScope.$on("$stateChangeStart",
                        function (event, toState, toParams, fromState, fromParams) {
                            if (myTime) {
                                $interval.cancel(myTime);
                            }
                        });
                    $scope.$on("$destroy", function () {
                        stateChangeStart();
                    });
                    //确认提现
                    $scope.verify = singleThreadedNetService(function (code, inputNum) {
                        if (code == "" || code.toString().split("").length != 4) {
                            promptBarService.showErrorBar("请输入正确的验证码", 3000);
                            return;
                        }
                        return SchoolpalWalletWithdrawalsConfirmAppService.addMicroShopDrawApply(code, inputNum).then(function (result) {
                            var data = result.data;
                            if (data.status == 1) {
                                if (data.data) {
                                    $scope.showPopup = false;
                                    $scope.withdrawalsConfirm = false;
                                    $scope.withdrawalsSuccess = true;
                                } else {
                                    promptBarService.showErrorBar(result.data.message, 3000);
                                }
                            } else {
                                promptBarService.showErrorBar(result.data.message, 3000);
                            }
                        });
                    });
                    //取消mask
                    $scope.cencelMask = function () {
                        $scope.showPopup = false;
                    }
                    //返回钱包页
                    $scope.backToWallet = function () {
                        var url = 'schoolpalwallet.withdrawals';
                        window.location.href = $scope.getIndexRouter(url);
                        //$scope.$state.go('schoolpalwallet.withdrawals');
                    }

                    function init() {
                        SchoolpalWalletWithdrawalsConfirmAppService.getPrincipalPhone().then(function (result) {
                            var data = result.data;
                            if (data.status == 1) {
                                if (data.data) {
                                    var ophone = data.data.tel.toString();
                                    $scope.phone = ophone.substr(0, 3) + '****' + ophone.substr(7, 11);
                                    if (data.data.crmver.toString() == "个人版") {
                                        $scope.isOrg = false;
                                    } else {
                                        $scope.isOrg = true;
                                    }
                                } else {
                                    promptBarService.showErrorBar(result.data.message, 3000);
                                }
                            }
                            else {
                                promptBarService.showErrorBar(result.data.message, 3000);
                            }
                            hasGetPhone = true;
                            if (hasGetAccount) {
                                //关闭loading动画
                                $scope.hideLoading();
                            }
                        });
                        SchoolpalWalletWithdrawalsConfirmAppService.getSchoolPalWalletAccount().then(function (result) {
                            var data = result.data;
                            if (data.status == 1) {
                                if (data.data) {
                                    $scope.account.balance = data.data.Balance;
                                } else {
                                    promptBarService.showErrorBar(result.data.message, 3000);
                                }
                            }
                            else {
                                promptBarService.showErrorBar(result.data.message, 3000);
                            }
                            hasGetAccount = true;
                            if (hasGetPhone) {
                                //关闭loading动画
                                $scope.hideLoading();
                            }
                        });

                    }
                    init();
                }
            ]);
    });