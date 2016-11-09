"use strict";
/**
 * author :
 * time:
 * description:
 */

define(["ionic", "modules/micro-shop-login-app/services"],
    function() {
        return angular.module("MicroShopLoginApp.controllers", ["MicroShopLoginApp.services"])
            .controller("MicroShopLoginAppController", [
                "$scope", "$rootScope", "$window", "promptBarService", "commonNetService", "MicroShopLoginAppService", "$ionicPopup", "$timeout", "maskService", "userTermsService", "$interval", "singleThreadedNetService", "$ionicHistory",
                function($scope, $rootScope, $window, promptBarService, commonNetService, MicroShopLoginAppService, $ionicPopup, $timeout, maskService, userTermsService, $interval, singleThreadedNetService, $ionicHistory) {
                    $scope.shopId = $scope.$stateParams.shopId;
                    $scope.productId = $scope.$stateParams.productId;
                    $scope.jumpType = $scope.$stateParams.jumpType
                        //是否是第一次发验证码
                    $scope.firstSend = 1;
                    var myTime;

                    //验证手机号码
                    function checkPhoneNum() {

                        var phoneRegexp = /^1[34587]\d{9}$/;

                        if (!$scope.phone) {
                            promptBarService.showErrorBar("请输入手机号！", 3000);
                            return false;
                        } else if (!phoneRegexp.test($scope.phone)) {
                            promptBarService.showErrorBar("请输入正确的手机号！", 3000);
                            return false;
                        }
                        return true;
                    }

                    //验证码校验
                    function checkCode() {

                        if (!$scope.code) {
                            promptBarService.showErrorBar("验证码不能为空！", 3000);
                            return false;
                        }
                        return true;
                    }



                    //显示用户条款
                    $scope.showUserTerms = function() {
                        userTermsService.showUserTerms();
                    }
                    //显示校宝微店用户条款
                    $scope.showMicroshopUserTerms = function () {
                        userTermsService.showMicroshopUserTerms();
                    }

                    $scope.login = singleThreadedNetService(function() {

                        if (!checkPhoneNum() || !checkCode()) {
                            return false;
                        }

                        //todo 登录后跳转
                        return MicroShopLoginAppService.login($scope.phone, $scope.code).then(function(result) {
                            if (result.data.status == 1) {
                                MicroShopLoginAppService.getMicroShopUserInfo().then(
                                    function(result) {
                                        if (result.data.status == 1 && result.data.data) {
                                            var user = {
                                                    userId: result.data.data.MicroShopUserId,
                                                    userName: result.data.data.NickName,
                                                    headImageUrl: result.data.data.HeadImageUrl,
                                                    phone: result.data.data.Phone
                                                }
                                                //更新当前微店用户信息
                                            ionic.trigger('updateMicroShopUser', user);
                                            promptBarService.showSuccessBar("登录成功", 3000);
                                            $timeout(function() {
                                                if ($scope.jumpType == 1) {
                                                    $scope.$state.go("microshop.participateactivity", {
                                                        shopId: $scope.shopId,
                                                        productId: $scope.productId,
                                                    })
                                                } else if ($scope.jumpType == 2) {
                                                    $scope.$state.go("microshop.index.myorder", { shopId: $scope.shopId });
                                                } else if ($scope.jumpType == 3) {
                                                    $scope.$state.go("microshop.index.myproduct", { shopId: $scope.shopId });
                                                }
                                            },800)
                                        }
                                    }
                                )
                            } else {
                                promptBarService.showErrorBar(result.data.message, 3000);
                            }
                        });
                    });


                    //获取手机验证码
                    $scope.sendVerifyCode = singleThreadedNetService(function() {

                        //前端手机号校验
                        if (!checkPhoneNum()) {
                            return false;
                        }

                        $interval.cancel(myTime);
                        //发送验证码
                        return MicroShopLoginAppService.sendVerifyCode($scope.phone).then(function(res) {
                            if (res.data.status == 1) {
                                $scope.countdown = 60;
                                $scope.firstSend = 0;

                                myTime = $interval(function() {
                                    if ($scope.countdown <= 0) {
                                        $interval.cancel(myTime);
                                        return;
                                    } else {
                                        $scope.countdown--;
                                    }
                                }, 1000);

                            } else {
                                promptBarService.showErrorBar(res.data.message, 3000);
                            }
                        });
                    });

                    function init() {
                        //关闭loading动画
                        $scope.hideLoading();
                    }

                    init();

                    //页面离开时销毁计时器
                    var stateChangeStart = $rootScope.$on("$stateChangeStart",
                        function(event, toState, toParams, fromState, fromParams) {
                            if (myTime) {
                                $interval.cancel(myTime);
                            }
                        });
                    $scope.$on("$destroy", function() {
                        stateChangeStart();
                    });


                }
            ]);
    });