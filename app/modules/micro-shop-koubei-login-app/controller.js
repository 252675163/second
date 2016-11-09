"use strict";
/**
 * author :
 * time:
 * description:
 */

define(["ionic", "modules/micro-shop-koubei-login-app/services"],
    function() {
        return angular.module("MicroShopKoubeiLoginApp.controllers", ["MicroShopKoubeiLoginApp.services", "TextInputCallback"])
            .controller("MicroShopKoubeiLoginAppController", [
                "$scope", "$rootScope", "$window", "promptBarService", "MicroShopKoubeiLoginAppService", "commonNetService", "userTermsService", "singleThreadedNetService", "$timeout", "$interval",
                function($scope, $rootScope, $window, promptBarService, MicroShopKoubeiLoginAppService, commonNetService, userTermsService, singleThreadedNetService, $timeout, $interval) {
                    $scope.countdown = 0;
                    $scope.firstSend = 1;
                    $scope.step = 1; //1：登陆 2：同步 3：注册
                    $scope.shopList = [];
                    $scope.userLogin = {
                        phone: "",
                        password: ""
                    }
                    $scope.userReg = {
                        phone: "",
                        code: "",
                        password: ""
                    }
                    $scope.qrCode = "";
                    $scope.showPage = 1; //1:mobile  2：pc二维码
                    var myTime;
                    var urlData = {
                        app_id: $scope.$stateParams.app_id,
                        source: $scope.$stateParams.source,
                        scope: $scope.$stateParams.scope,
                        auth_type: $scope.$stateParams.auth_type,
                        auth_code: $scope.$stateParams.auth_code,
                    }

                    //显示用户条款弹窗
                    $scope.showUserTerms = function() {
                        userTermsService.showUserTerms();
                    }


                    //安卓输入框遮挡修复，兼容ios和android 2016年10月25日16:49:54  by 陈天宇
                    var keyBoardFix = function() {

                        var
                            winH = $(window).height(),
                            $html = $("html"),
                            $body = $("body"),
                            $wrapDiv = $('.view-container'), //最外层内容容器
                            $isliderWrap = $(".user-login1"), //渲染模板容器

                            inputsOnFocus = function() {
                                $html.css("height", "100%");
                                $body.css({ "overflow": "visible", "height": "100%" });
                                $wrapDiv.height(winH);
                            },

                            inputsOnBlur = function() {
                                $html.css("height", "");
                                $body.css({ "overflow": "", "height": "" });
                                $wrapDiv.css("height", "");
                            };

                        //事件代理，绑定后处理事件
                        $isliderWrap
                            .on("focus", "input[placeholder], textarea", inputsOnFocus)
                            .on("blur", "input[placeholder], textarea", inputsOnBlur);
                    };

                    //同步店铺
                    $scope.syncShop = singleThreadedNetService(function(shop) {
                        return MicroShopKoubeiLoginAppService.syncShop(shop.orgId, shop.id).then(function(result) {
                            var data = result.data;
                            if (data && data.status == 1) {
                                $scope.$state.go("microshopkoubei.management.product");
                            } else {
                                promptBarService.showErrorBar(data.message, 3000);
                            }

                        });
                    });

                    function checkPhone(phone) {
                        var phoneRegexp = /^(0[0-9]{2,3})?([2-9][0-9]{6,7})$|(^(1[3|5|8|4|7])\d{9}$)/;
                        if (!phone) {
                            promptBarService.showErrorBar("请输入手机号！", 3000);
                            return false;
                        } else if (!phoneRegexp.test(phone)) {
                            promptBarService.showErrorBar("请输入正确的手机号！", 3000);
                            return false;
                        }
                        return true;
                    }

                    //验证表单
                    function checkForm(data, type) {
                        if (!checkPhone(data.phone)) {
                            return false;
                        }
                        //1登陆 2注册
                        if (type == 2 && !data.code) {
                            promptBarService.showErrorBar("请输入验证码！", 3000);
                            return false;
                        }

                        if (!data.password) {
                            promptBarService.showErrorBar("请输入密码！", 3000);
                            return false;
                        } else if (data.password.length < 6 || data.password.length > 20) {
                            promptBarService.showErrorBar("请输入6-20位密码！", 3000);
                            return false;
                        }
                        return true;
                    }

                    //发送验证码
                    $scope.sendVerificationCode = singleThreadedNetService(function() {

                        //前端手机号校验
                        if (!checkPhone($scope.userReg.phone)) {
                            return false;
                        }
                        $interval.cancel(myTime);
                        return MicroShopKoubeiLoginAppService.sendVerifyCode($scope.userReg.phone).then(function(result) {
                            var data = result.data;
                            if (data && data.status == 1) {
                                //发送验证码
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
                                promptBarService.showErrorBar(result.data.message, 3000);
                            }
                        });


                    });

                    //登陆
                    $scope.login = singleThreadedNetService(function() {
                        //登陆、注册表单验证
                        if (!checkForm($scope.userLogin, 1)) {
                            return false;
                        }
                        return MicroShopKoubeiLoginAppService.login($scope.userLogin).then(function(result) {
                            var data = result.data
                            if (data && data.status == 1) {
                                //获取店铺列表
                                getShopList(data.data);
                            } else if (data.error == 1) {
                                promptBarService.showErrorBar("用户名或密码错误", 3000);
                            } else if (data.error == 4) {
                                promptBarService.showErrorBar("账号已被锁定", 3000);
                            } else {
                                promptBarService.showErrorBar(data.message, 3000);
                            }

                        });
                    });


                    //跳转注册
                    $scope.gotoReg = function() {
                            $scope.step = 3;
                            $rootScope.$state.current.title = "校宝秀注册";
                        }
                        //注册提交
                    $scope.reg = singleThreadedNetService(function() {
                        //前端手机号、验证码、密码校验
                        if (!checkForm($scope.userReg, 2)) {
                            return false;
                        }
                        return MicroShopKoubeiLoginAppService.reg($scope.userReg).then(function(result) {
                            var data = result.data;
                            if (data && data.status) {
                                //获取店铺列表
                                getShopList(data.data);

                            } else if (data.error == 1) {
                                promptBarService.showErrorBar("手机号已注册", 3000);
                            } else {
                                promptBarService.showErrorBar(data.message, 3000);
                            }

                        });
                    });
                    //获取店铺列表
                    function getShopList(signId) {
                        MicroShopKoubeiLoginAppService.getSyncShopList(signId).then(function(result) {
                            var data = result.data;
                            if (data && data.status == 1) {
                                angular.forEach(data.data, function(model) {
                                    var shop = MicroShopKoubeiLoginAppService.getShopUiModel(model);
                                    $scope.shopList.push(shop);
                                });
                            }
                            //data.status为0 直接显示无店铺提示
                            $scope.step = 2;
                            $rootScope.$state.current.title = "选择同步信息的微店";

                        });
                    }

                    function init() {
                        var mobileReg = /(android|iphone|windows phone|ipad|ipod)/;
                        $timeout(function() {
                                keyBoardFix();
                            })
                            //pc端
                        if (!mobileReg.test(navigator.userAgent.toLowerCase())) {
                            $scope.showPage = 2;
                            $rootScope.$state.current.title = "校宝口碑通工作台";
                            var url = window.server + "/koubei/IsvTransfer?app_id=2008&source=source&scope=scope&auth_type=auth_type&auth_code=auth_code";
                            MicroShopKoubeiLoginAppService.getQrCode(url).then(function(result) {
                                var data = result.data;
                                if (data && data.status) {
                                    $scope.qrCode = data.data
                                } else {
                                    promptBarService.showErrorBar(data.message, 3000);
                                }
                            })
                        }
                        //移动端
                        else {
                            MicroShopKoubeiLoginAppService.getUserState(urlData).then(function(result) {
                                var data = result.data;
                                if (data && data.status) {
                                    //todo 判断页面的跳转
                                    if (data.data.Type == 2) {
                                        $scope.$state.go("microshopkoubei.management.product");
                                    }

                                } else {
                                    promptBarService.showErrorBar(data.message, 3000);
                                }
                            })
                        }

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