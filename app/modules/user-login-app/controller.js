"use strict";
/**
 * author :
 * time:
 * description:
 */

define(["ionic", "modules/user-login-app/services"],
    function() {
        return angular.module("UserLoginApp.controllers", ["UserLoginApp.services"])
            .controller("userLoginAppController", [
                "$scope", "$rootScope", "$q", "$timeout", "promptBarService", "userLoginAppService", "maskService", "commonNetService", "$interval", "$ionicPopup", "userTermsService","singleThreadedNetService",
                function ($scope, $rootScope, $q, $timeout, promptBarService, userLoginAppService, maskService, commonNetService, $interval, $ionicPopup, userTermsService, singleThreadedNetService) {
                    
                    $scope.step = 1;
                    $scope.countdown = 0;
                    $scope.firstSend = 1;
                    $scope.phone = "";
                    $scope.password = "";
                    $scope.code = "";
                    var myTime;
                    //type 1补密码 2注册  3改密码 4密码登录 

                    function init() {

                        //老用户第一次手机号默认输入 step==2 type=1
                        if ($scope.$state.params.userType == "0") {

                            userLoginAppService.getPhone().success(function (result) {
                                if (result.status == 1) {
                                    $scope.step = 2;
                                    $scope.type = 1;
                                    $scope.phone = result.data.phone;
                                    $scope.$state.current.title = "设置密码";

                                    //补密码百度统计埋点
                                    if (window._hmt) {
                                        window._hmt.push(['_trackPageview', "/landing/addkey"]);
                                    }
                                }
                                else {
                                    promptBarService.showErrorBar(result.message, 3000);
                                }

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

                        //新用户注册||密码登录 step==1
                        else {
                            $scope.step = 1;
                            $scope.$state.current.title = "校宝秀";

                            //填写手机号百度统计埋点
                            if (window._hmt) {
                                window._hmt.push(['_trackPageview', "/landing/phonenumber"]);
                            } 

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

                    //显示用户条款弹窗
                    $scope.showUserTerms = function () {
                        userTermsService.showUserTerms();
                    }


                    //step=1 按钮方法
                    $scope.getStartStep1 = singleThreadedNetService(function () {

                        //前端手机号校验
                        if (!checkPhoneNum()) {
                            return false;
                        }

                        //{phoneType 1.新用户注册 step=2 type=2 2.提示"该账号已被绑定，请尝试使用其他帐号登录！" 3.手机密码登录 step==3 }
                        return userLoginAppService.checkPhoneType($scope.phone).success(function (result) {
                            if (result.status == 1) {
                                if (result.data.phoneType == 1) {

                                    //新用户注册 直接发送验证码
                                    $interval.cancel(myTime);
                                    //发送验证码
                                    userLoginAppService.sendVerificationCode($scope.phone).then(function (res) {
                                        if (res.data.status == 1) {
                                            $scope.countdown = 60;
                                            $scope.firstSend = 0;

                                            //页面跳转
                                            $scope.step = 2;
                                            $scope.type = 2;
                                            $scope.$state.current.title = "注册";

                                            myTime = $interval(function () {
                                                if ($scope.countdown <= 0) {
                                                    $interval.cancel(myTime);
                                                    return;
                                                }
                                                else {
                                                    $scope.countdown--;
                                                }
                                            }, 1000);

                                        } else {
                                            promptBarService.showErrorBar(res.data.message, 3000);
                                        }
                                    });


                                    //注册百度统计埋点
                                    if (window._hmt) {
                                        window._hmt.push(['_trackPageview', "/landing/signup"]);
                                    }
                                }
                                else if (result.data.phoneType == 3) {
                                    $scope.step = 3;
                                    $scope.type = 4;
                                    $scope.$state.current.title = "登录";

                                    //登录百度统计埋点
                                    if (window._hmt) {
                                        window._hmt.push(['_trackPageview', "/landing/signin"]);
                                    }
                                }
                                else if (result.data.phoneType == 2) {
                                    promptBarService.showErrorBar("该账号已被绑定，请尝试使用其他帐号登录！", 3000);
                                }
                            }
                            else {
                                promptBarService.showErrorBar(result.message, 3000);
                            }
                        });
                    });
                    

                    //step=2 按钮方法 
                    $scope.getStartStep2 = singleThreadedNetService(function () {

                        //不是密码登录
                        if ($scope.type != 4) {
                            //前端手机号校验
                            if (!checkPhoneNum() || !checkCode() || !checkPassword()) {
                                return false;
                            }
                        }
                        else {
                            if (!checkPasswordNotNull()) {
                                return false;
                            }
                        }

                        //老用户第一次手机号默认输入 新用户  改密码
                        return userLoginAppService.login($scope.phone, $scope.code, $scope.password, $scope.type).success(function (result) {
                            if (result.status == 1) {

                                commonNetService.addBackgroundOperationLog("Login");

                                if (result.data.loginStatus == 0) {
                                    location.href = "/Home/BackgroundRoute?p=userCenter";
                                }
                                else if (result.data.loginStatus == 1) {
                                    var confirmPopup = $ionicPopup.alert({
                                        template: "<span style='line-height: 1.5;'><p class='confirm_title'>机构账号异常</p><p class='confirm_content'>当前机构账号异常，系统已进行自动切换，请前往用户中心进行设置。</p></span>",
                                        okText: "确认"
                                    });
                                    confirmPopup.then(function (res) {
                                        if (res) {
                                            location.href = "/Home/BackgroundRoute?p=userCenter";
                                        }
                                    });
                                }
                                else if (result.data.loginStatus == 2) {
                                    location.href = "/Home/BackgroundRoute?p=userAccount";
                                }
                            }
                            else {
                                promptBarService.showErrorBar(result.message, 3000);
                            }
                        });
                    });

                    //step=3 忘记密码方法 
                    $scope.forgetPassword = function () {
                        $scope.code = "";
                        $scope.password = "";

                        //手机号码不可更改
                        $scope.step = 2;
                        $scope.type = 3;

                        $scope.$state.current.title = "重置密码";

                        //找回密码百度统计埋点
                        if (window._hmt) {
                            window._hmt.push(['_trackPageview', "/landing/forgetkey"]);
                        }
                    }

                    //验证手机号
                    function checkPhoneNum() {

                        var phoneRegexp = /^1[34587]\d{9}$/;

                        if (!$scope.phone) {
                            promptBarService.showErrorBar("请输入手机号！", 3000);
                            return false;
                        }
                        else if (!phoneRegexp.test($scope.phone)) {
                            promptBarService.showErrorBar("请输入正确的手机号！", 3000);
                            return false;
                        }
                        return true;
                    }

                    //验证密码及验证码
                    function checkCode() {

                        if (!$scope.code) {
                            promptBarService.showErrorBar("请输入验证码！", 3000);
                            return false;
                        }
                        return true;
                    }

                    function checkPassword() {
                        if (!$scope.password) {
                            promptBarService.showErrorBar("请输入密码！", 3000);
                            return false;
                        }
                        if ($scope.password.length < 6 || $scope.password.length > 20) {
                            promptBarService.showErrorBar("请输入6-20位密码！", 3000);
                            return false;
                        }
                        return true;
                    }

                    function checkPasswordNotNull() {
                        if (!$scope.password) {
                            promptBarService.showErrorBar("请输入密码！", 3000);
                            return false;
                        }
                        return true;
                    }


                    //获取手机验证码
                    $scope.sendVerificationCode = singleThreadedNetService(function () {

                        //前端手机号校验
                        if (!checkPhoneNum()) {
                            return false;
                        }

                        //发送验证码
                        $interval.cancel(myTime);

                        return userLoginAppService.sendVerificationCode($scope.phone).then(function (res) {
                            if (res.data.status == 1) {
                                $scope.countdown = 60;
                                $scope.firstSend = 0;

                                myTime = $interval(function () {
                                    if ($scope.countdown <= 0) {
                                        $interval.cancel(myTime);
                                        return;
                                    }
                                    else {
                                        $scope.countdown--;
                                    }
                                }, 1000);

                            } else {
                                promptBarService.showErrorBar(res.data.message, 3000);
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

                }
            ]);
    });