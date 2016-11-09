"use strict";
/**
 * author :
 * time:
 * description:
 */

define(["ionic", "modules/user-center-app/services", "services/net/common"],
    function () {
        return angular.module("UserCenterApp.controllers", ["UserCenterApp.services", "services.net.grass", "services.net.common"])
            .controller("userCenterAppController", [
                "$scope", "$rootScope", "promptBarService", "userCenterAppService", "$ionicPopup", "$timeout", "userTermsService", "maskService", "commonNetService",
                function ($scope, $rootScope, promptBarService, userCenterAppService, $ionicPopup, $timeout, userTermsService, maskService, commonNetService) {
                    $scope.schoolPalInfo = {
                        web: "",
                        account: "",
                        password: "",
                    };
                    $scope.isBinddata = {};
                    //钱包
                    $scope.walletAmount = { show: false, money: null };
                    $scope.showLink = "https://mp.weixin.qq.com/s?__biz=MzIxNDA5MTcyOQ==&mid=408140676&idx=1&sn=216a6e7d45cd56705197aacc6616a615";
                    $scope.helpCenter = "https://mp.weixin.qq.com/s?__biz=MzIxNDA5MTcyOQ==&mid=509819077&idx=1&sn=0be41485c58d9f87f3467630d323fe99";
                    $scope.userProvision = "https://mp.weixin.qq.com/s?__biz=MzIxNDA5MTcyOQ==&mid=509819242&idx=1&sn=5d843fc4b4c4674c0e024b5a7bb6f79b";
                    //绑定校宝账号
                    $scope.bindSchoolPal = function () {
                        if ($scope.isBind) {
                            return;
                        }
                        // 字段校验
                        if (!userCenterAppService.verify($scope.schoolPalInfo.web, $scope.schoolPalInfo.account, $scope.schoolPalInfo.password)) {
                            return;
                        }
                        $scope.isBind = true;
                        userCenterAppService.bindSchoolPal($scope.schoolPalInfo.web, $scope.schoolPalInfo.account, $scope.schoolPalInfo.password).then(function (result) {
                            if (result.data.status == 1) {
                                // $scope.isShowBindSuccessBox = true;
                                //
                                $scope.bindScoolPalBox = false;
                                maskService.showMask(["绑定成功！"], 3000, false, 5).then(function () {

                                    $scope.userInfo.Ename = $scope.schoolPalInfo.web;
                                    $scope.userInfo.SchoolPalName = $scope.schoolPalInfo.account;
                                    $scope.isBind = false;
                                    $scope.schoolPalInfo.web = '';
                                    $scope.schoolPalInfo.account = '';
                                    $scope.schoolPalInfo.password = '';
                                    $scope.isBinddata.isHaveBind = true;
                                });
                            } else {
                                $scope.isBind = false;
                                $scope.isBinddata.isHaveBind = false;
                                promptBarService.showErrorBar(result.data.message, 3000);
                            }
                        });
                    };

                    //解绑
                    $scope.removeSchoolPalLink = function () {
                        var confirmPopup = $ionicPopup.confirm({
                            template: "<span style='line-height: 1.5;'><p class='confirm_title'>校宝ERP机构帐号解绑</p><p class='confirm_content'>解除绑定后，线索将不再同步到校宝ERP，确认解绑？</p></span>",
                            cancelText: "取消",
                            okText: "确认解绑"
                        });
                        confirmPopup.then(function (res) {
                            if (res) {
                                userCenterAppService.removeSchoolPalLink($scope.$state.params.userId).then(function (result) {
                                    if (result.data.status == 1) {
                                        promptBarService.showSuccessBar("解绑成功", 3000);
                                        $scope.userInfo.SchoolPalName = "";
                                        $scope.userInfo.Ename = "";
                                        $scope.isBinddata.isHaveBind = false;
                                    } else {
                                        promptBarService.showErrorBar(result.data.message, 3000);
                                    }
                                });
                            } else {
                                $scope.isBinddata.isHaveBind = true;
                            }
                        });

                    };
                    //注销
                    $scope.signOut = function () {
                        var confirmPopup = $ionicPopup.confirm({
                            template: "<span style='line-height: 1.5;'><p class='confirm_content'>确认注销吗？</p></span>",
                            cancelText: "取消",
                            okText: "确认"
                        });
                        confirmPopup.then(function (res) {
                            if (res) {
                                userCenterAppService.signOut().then(function (result) {
                                    if (result.data.status == 1) {
                                        location.href = "/Home/LoginRoute?p=userLogin?userType=1";
                                    } else {
                                        promptBarService.showErrorBar(result.data.message, 3000);
                                    }
                                });
                            }
                        });
                        //注销百度统计埋点
                        if (window._hmt) {
                            window._hmt.push(['_trackPageview', "/landing/signout"]);
                        }
                    }
                    //切换绑定
                    /*
                    $scope.changeIsHaveBind = function () {
                        if ($scope.isBinddata.isHaveBind == false) {
                            $scope.isBinddata.isHaveBind = !$scope.isBinddata.isHaveBind;
                            $scope.removeSchoolPalLink();
                        }
                        else {
                            $scope.isBinddata.isHaveBind = !$scope.isBinddata.isHaveBind;
                            $scope.goBindSchoolPal();
                        }
                    };
                    */
                    //打开帮助中心统计埋点
                    $scope.goHelpCenter = function () {
                        if (window._hmt) {
                            window._hmt.push(['_trackPageview', "/usercenter/helpcenter"]);
                        }
                    }
                    //显示用户条款弹窗
                    $scope.showUserTerms = function () {
                        userTermsService.showUserTerms();
                    }

                    var tmpobj = {
                        formType: 'advice'
                    }
                    //建议数据绑定
                    $scope.feedbackData = tmpobj;
                    //建议
                    $scope.goSuggest = function () {
                        ionic.EventController.trigger("showFeedbackForm");
                    }

                    ionic.EventController.on("showFeedbackForm", function (evt) {
                        $scope.ifShowFeedback = !$scope.ifShowFeedback;
                    });

                    //跳转页面---
                    //$scope.goGetVIP = function() {
                    //    //去领红包页面
                    //    window.location.href = "/Show/Coupon";

                    //};
                    //跳转到我的场景
                    $scope.goMyScenes = function () {
                        $scope.$state.go("index", {});
                        //校宝工作台百度统计
                        if ($scope.isSchoolpalUser) {
                            if (window._hmt) {
                                window._hmt.push(['_trackPageview', "/ERPworkshop/index"]);
                            }
                        }
                    }
                    //跳转校宝钱包
                    $scope.goWallet = function () {
                        $scope.$state.go("schoolpalwallet.withdrawals");
                    }
                    //跳转微店
                    $scope.goMicroShop = function () {
                        window.location.href = commonNetService.getMicroShopRouter();
                    }
                    //跳转到报名本
                    $scope.goRegistrationBook = function () {
                        //校宝工作台跳转到校宝ERP咨询本
                        //if ($scope.isSchoolpalUser) {
                            //window.location.href = "/OAuth/SchoolPalRoute?redirectUrl=" + encodeURIComponent(window.schoolPalAuthenticationServer + "/Consult/ConsultList");
                        //} else {
                            $scope.$state.go("registrationbook.registrationbookall", { trace: "traceByAppIndex" });
                       // }
                    }
                    $scope.goIndex = function () {
                        $scope.$state.go("index", {}, { reload: true });
                    };

                    $scope.goBindSchoolPal = function () {
                        //$scope.$state.go("bindSchoolPal", {}, { reload: true });
                        $scope.bindScoolPalBox = true;
                    };

                    $scope.closeBindScoolPalBox = function () {
                        $scope.bindScoolPalBox = false;
                    }

                    $scope.goSignupRemind = function () {
                        $scope.$state.go("userSignUpRemindSetting", { go: "userCenter" }, { reload: true });
                    }

                    $scope.goOldInviteNew = function () {
                        $scope.$state.go("oldinvitenew", { isshare: false }, { reload: true });
                    };

                    $scope.goVIPCode = function () {
                        $scope.$state.go("userRedeemCodeExchange", {}, { reload: true });
                    };

                    $scope.goOrderList = function () {
                        $scope.$state.go("userOrderList", { comeFrom: 1 }, { reload: true });
                    }
                    //跳转至用户地理信息
                    $scope.goUserLocation = function () {
                        $scope.$state.go("userLocation", { reload: true });
                    }
                    //--end
                    //跳转至用户地理信息
                    $scope.goUserAccount = function () {
                        $scope.$state.go("userAccount", { reload: true });
                    }
                    //--end
                    //更新第一次遮罩提示显示状态
                    $scope.closeFirstRemind = function () {
                        userCenterAppService.updateUserConfig("IsShowUserCenterGuide", "false").then(function (result) {
                            if (result.data.status != 1) {
                                promptBarService.showErrorBar(result.data.message, 3000);
                            }
                        }, null);
                    }


                    function init() {

                        commonNetService.addBackgroundOperationLog("UserIndex");
                        $scope.isBinddata.isHaveBind = false;
                        $scope.isSchoolpalUser = (window.isSchoolpalUser == "true") ? true : false;

                        //校宝秀用户才需要显示遮罩
                        if (!$scope.isSchoolpalUser) {
                            userCenterAppService.isShowNotice("IsShowUserCenterGuide").then(function (result) {
                                if (result.data.status == 1) {
                                    //判断当前用户是否要显示第一次提示
                                    if (result.data.data.ConfigValue != "false") {
                                        maskService.showMask("", 0, false, 34, $scope.closeFirstRemind);
                                    }
                                } else {
                                    promptBarService.showErrorBar(result.message, 3000);
                                }
                            }, null);
                        }

                        //获取用户校宝钱包信息
                        userCenterAppService.getMicroShopByCurrentUser().then(function (result) {
                            if (result.data.status == 1) {
                                if (result.data.data) {
                                    userCenterAppService.getSchoolPalWalletAccount().then(function (result) {
                                        if (result.data.status == 1 && result.data.data) {
                                            $scope.walletAmount.money = result.data.data.Balance;
                                            $scope.walletAmount.show = true;
                                        } else if (result.data.status == 1 && !result.data.data) {
                                            $scope.walletAmount.money = 0;
                                            $scope.walletAmount.show = true;
                                        } else {
                                            $scope.walletAmount.show = false;
                                            promptBarService.showErrorBar(result.data.message, 3000);
                                        }
                                    });
                                } else {
                                    $scope.walletAmount.show = false;
                                }
                            } else {
                                $scope.walletAmount.show = false;
                                promptBarService.showErrorBar(result.data.message, 3000);
                            }
                        })
                        userCenterAppService.getUserInfoByUserId().then(function (result) {
                            if (result.data.status == 1) {
                                $scope.userInfo = result.data.data;
                                if ($scope.userInfo.SchoolPalName) {
                                    $scope.isBinddata.isHaveBind = true;
                                }

                            } else {
                                promptBarService.showErrorBar(result.data.message, 3000);
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
                        commonNetService.getDistrictByUserId().then(function (res) {
                            if (res.data.data) {
                                $scope.DistrictName = res.data.data.DistrictName;
                                console.log(res);
                            }
                        })

                    }

                    init();



                }
            ]);
    });