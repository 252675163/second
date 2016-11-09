"use strict";
/**
 * author :
 * time:
 * description:
 */

define(["ionic", "modules/micro-shop-activity-bargain-app/services"],
    function () {
        return angular.module("MicroShopActivityBargainApp.controllers", ["MicroShopActivityBargainApp.services", "CommonFilter"])
            .controller("MicroShopActivityBargainAppController", [
                "$compile", "$scope", "$rootScope", "$window", "promptBarService", "commonNetService", "$filter", "MicroShopActivityBargainAppService", "$ionicPopup", "$timeout", "$interval", "maskService", "$ionicSlideBoxDelegate", "singleThreadedNetService", "$ionicScrollDelegate",
                function ($compile, $scope, $rootScope, $window, promptBarService, commonNetService, $filter, MicroShopActivityBargainAppService, $ionicPopup, $timeout, $interval, maskService, $ionicSlideBoxDelegate, singleThreadedNetService, $ionicScrollDelegate) {
                    $scope.activityUserId = $scope.$stateParams.activityUserId;
                    $scope.productId = $scope.$stateParams.productId;
                    $scope.shopId = $scope.$stateParams.shopId;
                    $scope.isFirstLoad = $scope.$stateParams.isFirstLoad;
                    $scope.isSelf = false;//是否自己活动页面
                    $scope.hasParticipate = false;//是否已经参加
                    $scope.canParticipate = false;//能否参加
                    $scope.hasAssistant = false;  //是否已经砍价过
                    $scope.canAssistant = false;  //能否砍价
                    $scope.hasFinished = false;  //是否已经完成活动
                    $scope.helperList = [];
                    var pageSize = 20;
                    $scope.page = {
                        totalCount: 1,
                        currentIndex: 1,
                        itemCount: 4
                    };
                    //头像和顶部图片
                    $scope.defaultHeadImg = window.resourceDoMain + "/app/img/bargain_header_bg1.png"; //默认的用户头像
                    var timeInterval,
                        isOnself = true,
                        hasGetProduct = false,
                        hasGetActivity = false,
                        hasSubmitOrder = false;
                    //更改商品介绍、活动规则切换
                    $scope.showTabPage = function (index) {
                        $scope.tabIndex = index;
                        $ionicScrollDelegate.resize();
                    }

                    //进入我的店铺
                    $scope.goToMyShop = function () {
                        $scope.$state.go("microshop.index.myshop", { shopId: $scope.productModel.shopId });
                    }

                    //进入我的商品
                    $scope.goToMyProduct = function () {
                        $scope.$state.go("microshop.index.myproduct", { shopId: $scope.productModel.shopId });
                    }

                    //点击帮他砍价
                    $scope.helpBargain = singleThreadedNetService(function () {
                        if (!$scope.canAssistant) {
                            return;
                        }
                        var helpPrice = 0;
                        return MicroShopActivityBargainAppService.microBargainPower($scope.activityUserId).then(function (result) {
                            var data = result.data;
                            if (data.status == 1 && data.data) {
                                helpPrice = data.data.VoucherAmount;
                                $scope.currentPrice += helpPrice;
                                var confirmPopup = $ionicPopup.alert({
                                    template: "<span style='line-height: 1.5;'><p class='confirm_content'>您已成功帮TA砍了</p><p class='confirm_content_highlight'>¥" + helpPrice + "</p></span>",
                                    okText: "关闭",
                                    okType: 'button-alert-positive'
                                });
                                $scope.hasAssistant = true;
                            }
                            else {
                                promptBarService.showErrorBar(result.data.message, 3000);
                            }
                        });
                    });
                    //参加活动
                    $scope.toParticipateActivitiy = function () {
                        var state = $scope.productModel.productStateModel.code;
                        //已参加
                        if (state == 1 || state == 2 | state == 3) {
                            return;
                        }
                        if ($scope.productModel.leftSeconds == 0) {
                            promptBarService.showErrorBar("此活动已结束", 3000);
                            return;
                        }
                        $scope.$state.go("microshop.participateactivity", { shopId: $scope.shopId, productId: $scope.productId });
                    }
                    //取支付路由
                    $scope.getPayRouter = function () {
                        return window.microShopShareServerName + "/Microshop/PayRoute?p=";
                    }
                    //去下单
                    $scope.placeOrder = singleThreadedNetService(function () {
                        if (hasSubmitOrder) {
                            promptBarService.showErrorBar("请不要重复提交", 3000);
                            return;
                        }
                        if ($scope.hasFinished) {
                            return MicroShopActivityBargainAppService.addMicroShopOrder($scope.activityUserId).then(function (result) {
                                var data = result.data;
                                if (data.status == 1) {
                                    var orderId = data.data;
                                    var link = $scope.getPayRouter() + encodeURIComponent("microshop/ordercheck?shopId=" + $scope.shopId + "&orderId=" + orderId);
                                    $timeout(function () {
                                        location.href = link;
                                    });
                                    hasSubmitOrder = true;
                                }
                                else {
                                    promptBarService.showErrorBar(result.data.message, 3000);
                                }
                            });
                            //$scope.$state.go("microshop.ordercheck", { shopId: $scope.shopId, activityUserId: $scope.activityUserId, productId: $scope.productId });
                        }
                    });
                    //加载砍价用户列表
                    $scope.loadHelperList = singleThreadedNetService(function () {
                        $scope.page.currentIndex++;
                        return MicroShopActivityBargainAppService.getBargainHelperInfo($scope.activityUserId, $scope.page.currentIndex, pageSize).then(function (result) {
                            var data = result.data;
                            if (data.status == 1 && data.data) {
                                $scope.page = data.data.page;
                                angular.forEach(data.data.list, function (model) {
                                    var helpModel = MicroShopActivityBargainAppService.getHelperModel(model);
                                    $scope.helperList.push(helpModel);
                                });
                            }
                            else {
                                promptBarService.showErrorBar(result.data.message, 3000);
                            }
                            $scope.$broadcast("scroll.infiniteScrollComplete");
                        });
                    });

                    //清楚倒计时计时器
                    var stateChangeStart = $rootScope.$on("$stateChangeStart",
                           function () {
                               $interval.cancel(timeInterval);
                           });

                    //销毁rootScope上的事件
                    $scope.$on("$destroy", function () {
                        stateChangeStart();
                    });
                    function isProductOnSelf(flag) {
                        if (!flag) {
                            isOnself = false;
                            $timeout(function () {
                                window.location.href = "/Common/MicroShopError?errorMsg=productOffSelf";
                            });
                        }
                    }
                    //分享配置
                    function share() {
                        if (!$scope.productModel || !$scope.activityUserInfo) {
                            return;
                        }
                        commonNetService.showOptionMenu();
                        var link = $scope.getShareRouter() + encodeURIComponent("microshop/activity/bargain?shopId=" + $scope.shopId + "&activityUserId=" + $scope.activityUserId + "&productId=" + $scope.productModel.productId);
                        var config = {
                            title: "快来帮我砍价，【" + $scope.productModel.name + "】最多优惠到" + $scope.productModel.price + "元啦~ ",
                            desc: "朋友，不求为我下火海，只求帮我砍一刀！",
                            link: link, // 分享链接
                            imgUrl: $scope.activityUserInfo.headImageUrl, // 分享图片
                            type: "",
                            dataUrl: ""
                        };
                        console.log(config);
                        //微信自定义分享
                        commonNetService.setShareMessage(config).then(function () {
                            commonNetService.showOptionMenu();
                        }, function () {
                            commonNetService.showOptionMenu();
                            promptBarService.showErrorBar("分享出错", 3000);
                        });
                    }
                    function setSlide() {
                        var mySwiper = new ionic.views.Swiper('#slide', {
                            autoplay: 2000,
                            autoplayDisableOnInteraction: false,
                            pagination: '.swiper-pagination',
                            paginationClickable: true

                        }, $scope, $compile);
                        return mySwiper;
                    }
                    function init() {
                        //活动页百度统计埋点
                        if (window._hmt) {
                            window._hmt.push(['_trackPageview', "/MShopCactivity/ShopID=" + $scope.shopId]);
                        }
                        //查看时  记录商品浏览量
                        MicroShopActivityBargainAppService.addProductPV($scope.productId).then(function (result) {
                            if (result.data.status == 1) {
                            }
                            else {
                                promptBarService.showErrorBar(result.data.message, 3000);
                            }
                        });
                        //默认显示商品介绍
                        $scope.tabIndex = 0;
                        //获取商品详情页接口
                        MicroShopActivityBargainAppService.getMicroShopProductDetail($scope.productId).then(function (result) {
                            var data = result.data;
                            if (data.status == 1) {
                                if (data.data) {
                                    $scope.productModel = MicroShopActivityBargainAppService.parseBizModelToUiModel(data.data);
                                    share();
                                    // 更改网页标题
                                    $rootScope.$state.current.title = "快来帮我砍价，【" + $scope.productModel.name + "】最多优惠到" + $scope.productModel.price + "元啦~ ";
                                    isProductOnSelf($scope.productModel.isOnSelf);
                                    $scope.hasParticipate = $scope.productModel.productStateModel.code == 1 ? true : false;
                                    $scope.canParticipate = $scope.productModel.productStateModel.code == 0 ? true : false;
                                    $timeout(function () {
                                        $scope.$apply(function () {
                                            $scope.isShowslide = $scope.productModel.imgList.length > 1;
                                        });
                                    });
                                    //倒计时
                                    MicroShopActivityBargainAppService.getServerDateTime().then(function (result) {
                                        if (result.data.status == 1) {
                                            $scope.productModel.leftSeconds = $filter("diffSeconds")(result.data.data, $scope.productModel.endDate);
                                            $scope.diffPrice = $scope.productModel.originPrice - $scope.productModel.price;
                                        } else {
                                            promptBarService.showErrorBar(result.data.message, 3000);
                                        }
                                        timeInterval = $interval(function () {
                                            if ($scope.productModel.leftSeconds > 0) {
                                                $scope.productModel.leftSeconds -= 1;

                                            }
                                            else if ($scope.productModel.leftSeconds == 0) {
                                                $interval.cancel(timeInterval);
                                            }
                                        }, 1000);
                                    });
                                    var slide = setSlide();
                                    $timeout(function () {
                                        slide.update(true);
                                    });
                                }
                                else {
                                    isProductOnSelf(false);
                                }
                            } else {
                                promptBarService.showErrorBar(result.data.message, 3000);
                            }
                            hasGetProduct = true;
                            if (isOnself && hasGetActivity) {
                                //关闭loading动画
                                $scope.hideLoading();
                            }
                        });
                        //获取活动详情
                        MicroShopActivityBargainAppService.getActivityUserInfo($scope.activityUserId).then(function (result) {
                            var data = result.data;
                            if (data.status == 1 && data.data) {
                                $scope.activityUserInfo = MicroShopActivityBargainAppService.parseActivityUserInfoModel(data.data);
                                share();
                                $scope.barginInfo = angular.fromJson(result.data.data.MicroPowerConfig);
                                if ($scope.barginInfo) {
                                    $scope.currentPrice = $scope.barginInfo.PowerTotalAmount;
                                    $scope.hasAssistant = $scope.barginInfo.IsPower;
                                    $scope.canAssistant = (!$scope.hasAssistant) && ($scope.activityUserInfo.activityUserState == 0);
                                    $scope.hasFinished = $scope.activityUserInfo.activityUserState == 1 && ($scope.barginInfo.OrderId == 0 || $scope.barginInfo.OrderState == 3);
                                }
                                if ($scope.isFirstLoad && $scope.barginInfo.IsSelf && $scope.barginInfo.PowerTotalCount == 1) {
                                    var confirmPopup = $ionicPopup.alert({
                                        template: "<span style='line-height: 1.5;'><p class='confirm_content'>您已成功帮自己砍了</p><p class='confirm_content_highlight'>¥" + $scope.currentPrice + "</p></span>",
                                        okText: "关闭",
                                        okType: 'button-alert-positive'
                                    });
                                }
                                //根据当前登录用户和活动用户判断是否自己页面
                                if ($scope.microShopUser) {
                                    $scope.isSelf = $scope.microShopUser.userId == $scope.activityUserInfo.userId;
                                }
                                else {
                                    $scope.isSelf = false;
                                }
                                //如果是自己的活动，获取帮忙砍价用户列表
                                MicroShopActivityBargainAppService.getBargainHelperInfo($scope.activityUserId, $scope.page.currentIndex, pageSize).then(function (result) {
                                    var data = result.data;
                                    if (data.status == 1 && data.data) {
                                        $scope.page = data.data.page;
                                        angular.forEach(data.data.list, function (model) {
                                            var helpModel = MicroShopActivityBargainAppService.getHelperModel(model);
                                            $scope.helperList.push(helpModel);
                                        });
                                    } else {
                                        promptBarService.showErrorBar(result.data.message, 3000);
                                    }
                                    hasGetActivity = true;
                                    if (isOnself && hasGetProduct) {
                                        //关闭loading动画
                                        $scope.hideLoading();
                                    }
                                });

                            }
                            else {
                                promptBarService.showErrorBar(result.data.message, 3000);
                            }

                        });
                    }

                    init();


                }
            ]);
    });