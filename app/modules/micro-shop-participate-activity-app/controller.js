"use strict";
/**
 * author :
 * time:
 * description:
 */

define(["ionic", "modules/micro-shop-participate-activity-app/services"],
    function () {
        return angular.module("MicroShopParticipateActivityApp.controllers", ["MicroShopParticipateActivityApp.services"])
            .controller("MicroShopParticipateActivityAppController", [
                "$scope", "$rootScope", "$window", "promptBarService", "commonNetService", "MicroShopParticipateActivityAppService", "$ionicPopup", "$timeout", "maskService", "userTermsService", "singleThreadedNetService",
                function ($scope, $rootScope, $window, promptBarService, commonNetService, MicroShopParticipateActivityAppService, $ionicPopup, $timeout, maskService, userTermsService, singleThreadedNetService) {
                    $scope.checkBoolean = true;
                    $scope.user = { phone: "", name: "", config: "" }
                    $scope.productId = $rootScope.$stateParams.productId;
                    $scope.shopId = $rootScope.$stateParams.shopId;
                    $scope.type = $rootScope.$stateParams.type;
                    var hasSubmit = false;
                    //取支付路由
                    $scope.getPayRouter = function () {
                        return window.microShopShareServerName + "/Microshop/PayRoute?p=";
                    }
                    // 生成砍价页面
                    $scope.payOrder = singleThreadedNetService(function () {
                        if (hasSubmit) {
                            promptBarService.showErrorBar("请不要重复提交", 3000);
                            return;
                        }
                        if ($scope.user.name == "") {
                            promptBarService.showErrorBar("请输入预留姓名！", 3000);
                            return;
                        } else if ($scope.user.phone == "") {
                            promptBarService.showErrorBar("请输入预留手机号码", 3000);
                            return;
                        } else if (!(/^1[3|4|5|7|8]\d{9}$/.test($scope.user.phone))) {
                            promptBarService.showErrorBar("请输入正确的手机号码！", 3000);
                            return;
                        } else if (!$scope.checkBoolean) {
                            promptBarService.showErrorBar("请勾选用户条款！", 3000);
                            return;
                        }
                        else if ($scope.type == "preview") {
                            promptBarService.showErrorBar("预览页面下不能生成砍价页面", 3000);
                            return;
                        }
                        else {
                            if ($scope.product.activityType == 1) {
                                return MicroShopParticipateActivityAppService.participateActivity($scope.product.activityId, $scope.user.name, $scope.user.phone, $scope.user.config).then(function (result) {
                                    if (result.data.status == 1 && result.data.data) {
                                        var activityUserId = result.data.data;
                                        $timeout(function () {
                                            $scope.$state.go("microshop.activity.bargain",
                                            {
                                                shopId: $scope.shopId,
                                                productId: $scope.productId,
                                                activityUserId: activityUserId,
                                                isFirstLoad: true
                                            });
                                        }, 0);
                                        hasSubmit = true;
                                    } else {
                                        promptBarService.showErrorBar(result.data.message, 3000);
                                    }
                                });
                            }
                            else if ($scope.product.activityType == 2) {
                                return MicroShopParticipateActivityAppService.addOrderByProductId($scope.product.productId, $scope.user.name, $scope.user.phone).then(function (result) {
                                    var data = result.data;
                                    if (data.status == 1) {
                                        var orderId = data.data;
                                        var link = $scope.getPayRouter() + encodeURIComponent("microshop/ordercheck?shopId=" + $scope.shopId + "&orderId=" + orderId);
                                        $timeout(function () {
                                            location.href = link;
                                        });
                                        hasSubmit = true;
                                    }
                                    else {
                                        promptBarService.showErrorBar(result.data.message, 3000);
                                    }
                                });
                            }

                        }
                    });
                    //  勾选用户条款
                    $scope.agreeUserTerms = function () {
                        $scope.checkBoolean = !$scope.checkBoolean;
                    }
                    //  显示用户条款
                    $scope.showUserTerms = function () {
                        userTermsService.showUserTerms();
                    }
                    //商品是否上架状态
                    function isProductOnSelf(flag) {
                        if (!flag) {
                            $timeout(function () {
                                window.location.href = "/Common/MicroShopError?errorMsg=productOffSelf";
                            });
                        }
                    }

                    function init() {
                        //判断c端用户是否登录
                        if (!$scope.microShopUser || $scope.microShopUser.userId == 0) {
                            if ($scope.type != "preview") {
                                $scope.$state.go("microshop.login", { productId: $scope.productId, jumpType: 1 });
                                return;
                            }
                        }
                        //非预览时获取C端信息
                        if ($scope.type != "preview") {
                            MicroShopParticipateActivityAppService.getMicroShopUserInfo().then(function (result) {
                                if (result.data.status == 1) {
                                    if (result.data.data) {
                                        //未登录
                                        if (result.data.data.MicroShopUserId == 0) {
                                            $scope.$state.go("microshop.login", { productId: $scope.productId, jumpType: 1 });
                                        } else {
                                            $scope.user.phone = result.data.data.Phone;
                                            var config = {
                                                headImageUrl: result.data.data.HeadImageUrl
                                            }
                                            $scope.user.config = angular.toJson(config);
                                        }
                                    }
                                } else {
                                    promptBarService.showErrorBar(result.data.message, 3000);
                                }
                            });
                        } else {
                            $scope.user.phone = ""
                        }
                        MicroShopParticipateActivityAppService.getMicroShopProductDetail($scope.productId).then(function (result) {
                            if (result.data.status == 1) {
                                if (result.data.data) {
                                    $scope.product = MicroShopParticipateActivityAppService.parseBizModelToUiModel(result.data.data);
                                    isProductOnSelf($scope.product.isOnSelf);
                                } else {
                                    isProductOnSelf(false);
                                }

                            } else {
                                promptBarService.showErrorBar(data.message, 3000);
                            }
                            //关闭loading动画
                            $scope.hideLoading();
                        });


                    }

                    init();
                }
            ]);
    });