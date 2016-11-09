"use strict";
/**
 * author :
 * time:
 * description:
 */

define(["ionic", "modules/user-bind-phone-app/services"],
    function() {
        return angular.module("UserBindPhoneApp.controllers", ["UserBindPhoneApp.services"])
            .controller("userBindPhoneAppController", [
                "$scope", "$rootScope", "$q", "$timeout", "promptBarService", "userBindPhoneAppService", "maskService","commonNetService","userTermsService",
                function ($scope, $rootScope, $q, $timeout, promptBarService, userBindPhoneAppService, maskService, commonNetService, userTermsService) {
                    commonNetService.addBackgroundOperationLog("PhoneBind");

                    $scope.step = 1;
                    $scope.countdown = 0;

                    //$scope.schoolPalInfo.web, $scope.schoolPalInfo.account, $scope.schoolPalInfo.password
                    function verify() {
                        var d = $q.defer();
                        userBindPhoneAppService.verifyPhoneStep1($scope.phone).then(function() {
                            if (!$scope.code) {
                                promptBarService.showErrorBar("验证码不能为空！", 3000);
                                d.reject();
                            } else {
                                d.resolve();
                            }

                        }, function() {
                            d.reject(); 
                        });
                        return d.promise;
                    }
                    $scope.showUserTerms = function () {
                        userTermsService.showUserTerms();
                    }

                    $scope.bindPhone = function() {
                        if ($scope.isBind) {
                            return;
                        }
                        // 字段校验
                        verify().then(function() {
                            $scope.isBind = true;
                            userBindPhoneAppService.bindPhone($scope.phone, $scope.code).then(function(result) {
                                $scope.isBind = false;
                                if (result.data.status == 1) {
                                    //绑定成功挑转到用户中心
                                    if ($scope.$state.params.go == 2) {
                                        maskService.showMask("绑定成功！<br/>这就带您返回场景主页哦~<br>选择您喜欢的模板马上开始制作吧", 3000, false, 3).then(function() {
                                            $scope.$state.go("index", {}, { reload: true });
                                        });
                                    } else if ($scope.$state.params.cueType == "vipExchange") {
                                        maskService.showMask(["绑定成功 <br/>请再次扫码领取VIP"], 3000, false, 5).then(function () {
                                            $scope.$state.go("userCenter", {}, { reload: true });
                                        });
                                    }
                                    else {
                                        //文案todo
                                        maskService.showMask(["绑定成功！", "<span>3</span>秒后自动跳转"], 3000, false, 5).then(function () {
                                            $scope.$state.go("userCenter", {}, { reload: true });
                                        });
                                    }
                                } else {
                                    promptBarService.showErrorBar(result.data.message, 3000);
                                }
                            });
                        }, function() {
                            $scope.isBind = false;
                        });
                    };


                    $scope.sendVerificationCode = function () {
                        var myTime;
                        
                        //第一次请求先做手机号码校验 todo 还是离焦的时候做手机号码校验？？
                        if ($scope.step == 1) {
                            $scope.countdown = 60;
                            userBindPhoneAppService.verifyPhoneStep1($scope.phone).then(function() {
                                    return userBindPhoneAppService.verifyPhone($scope.phone);
                                }, null)
                                .then(function(result) {
                                    if (result.data.status == 1) {
                                        //发送验证码
                                        clearInterval(myTime);
                                        //todo 去除图形验证码
                                        userBindPhoneAppService.sendVerificationCode($scope.phone).then(function (res) {
                                                if (res.data.status == 1) {
                                                    $scope.step = 2;
                                                    myTime=setInterval(function () {
                                                        if ($scope.countdown == 0) {
                                                            clearInterval(myTime);
                                                            return;
                                                        }
                                                        $scope.countdown--;
                                                        $scope.$digest(); // 通知视图模型的变化
                                                    }, 1000);

                                                } else {
                                                    promptBarService.showErrorBar(res.data.message, 3000);
                                                }
                                            }
                                        );
                                    } else {
                                        promptBarService.showErrorBar(result.data.message, 3000);
                                    }

                                }, null);
                        } else {
                            //重新发送验证码

                            if ($scope.countdown) {
                                return;
                            }
                            clearInterval(myTime);
                            $scope.countdown = 60;
                            userBindPhoneAppService.sendVerificationCode($scope.phone).then(function (res) {
                                    if (res.data.status == 1) {
                                        myTime = setInterval(function() {
                                            if ($scope.countdown == 0) {
                                                clearInterval(myTime);
                                                return;
                                            }
                                            $scope.countdown--;
                                            $scope.$digest(); // 通知视图模型的变化
                                        }, 1000);

                                    } else {
                                        promptBarService.showErrorBar(res.data.message, 3000);

                                    }
                                }
                            );
                        }
                    };

                    //统一增加后台页面的Loading效果 by xp 2015年11月13日 16:09:13
                    if (!$rootScope.isFirstLoad) {
                        $timeout(function() {
                            $(".lockMask-loading2").hide();
                            $rootScope.isFirstLoad = true;
                        }, 1833);
                    } else {
                        $timeout(function() {
                            $(".lockMask-loading2").hide();
                            $rootScope.isFirstLoad = true;
                        }, 1000);
                    }


                }
            ]);
    });