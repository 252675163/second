"use strict";
/**
 * author :
 * time:
 * description:
 */

define(["ionic", "modules/micro-shop-product-detail-app/services"],
    function () {
        return angular.module("MicroShopProductDetailApp.controllers", ["MicroShopProductDetailApp.services", "CommonFilter"])
            .controller("MicroShopProductDetailAppController", [
                "$compile", "$scope", "$rootScope", "$window", "promptBarService", "commonNetService", "$filter", "MicroShopProductDetailAppService", "$ionicPopup", "$timeout", "$interval", "maskService", "$ionicSlideBoxDelegate", "$ionicScrollDelegate", "myFooterService", "MicroShopAppService", "singleThreadedNetService",
                function ($compile, $scope, $rootScope, $window, promptBarService, commonNetService, $filter, MicroShopProductDetailAppService, $ionicPopup, $timeout, $interval, maskService, $ionicSlideBoxDelegate, $ionicScrollDelegate, myFooterService, MicroShopAppService, singleThreadedNetService) {
                    var timeInterval = null, isOnself = true;
                    $scope.buyerList = [];
                    $scope.page = {
                        totalCount: 1,
                        currentIndex: 1,
                        itemCount: 4
                    };
                    var pageSize = 10;
                    $scope.productId = $scope.$stateParams.productId;
                    $scope.shopId = $scope.$stateParams.shopId;
                    $scope.viewType = $scope.$stateParams.type;
                    $scope.isPreview = $scope.viewType == "preview";
                    var productTitle = "";
                    //更改商品介绍、活动规则切换
                    $scope.showTab = function (index) {
                        $scope.tabIndex = index;
                        $ionicScrollDelegate.resize();
                    }

                    //进入我的店铺
                    $scope.goToMyShop = function () {
                        $scope.$state.go("microshop.index.myshop", { shopId: $scope.shopId, type: $scope.viewType });
                    }

                    //进入我的商品
                    $scope.goToMyProduct = function () {
                        if ($scope.isPreview) {
                            promptBarService.showErrorBar("预览页面不可查看我的商品", 3000);
                            return;
                        }
                        $scope.$state.go("microshop.index.myproduct", { shopId: $scope.shopId });
                    }
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
                        $timeout(function () {
                            $scope.$state.go("microshop.participateactivity", { productId: $scope.productId, type: $scope.viewType, shopId: $scope.shopId });
                        });
                    }
                    //清除倒计时计时器
                    var stateChangeStart = $rootScope.$on("$stateChangeStart",
                           function () {
                               $interval.cancel(timeInterval);
                           });

                    //销毁rootScope上的事件
                    $scope.$on("$destroy", function () {
                        stateChangeStart();
                    });
                    //监听举报事件
                    ionic.EventController.on("showFeedbackForm", function (evt) {
                        $scope.ifShowFeedback = !$scope.ifShowFeedback;
                    });
                    //分享配置
                    function share(model) {
                        commonNetService.showOptionMenu();
                        var link = $scope.getShareRouter() + encodeURIComponent("microshop/productdetail?shopId=" + model.shopId + "&productId=" + model.productId);                        
                        var config = {
                            title: productTitle,
                            desc: "库存一丢丢，下单要趁早！",
                            link: link, // 分享链接
                            imgUrl: model.imgList[0].url, // 分享图片
                            type: "",
                            dataUrl: ""
                        };
                       
                        //微信自定义分享
                        commonNetService.setShareMessage(config).then(function () {
                            commonNetService.showOptionMenu();
                        }, function () {
                            commonNetService.showOptionMenu();
                            promptBarService.showErrorBar("分享出错", 3000);
                        });
                    }
                    //商品是否上架状态
                    function isProductOnSelf(flag) {
                        if (!flag) {
                            isOnself = false;
                            $timeout(function () {
                                window.location.href = "/Common/MicroShopError?errorMsg=productOffSelf";
                            });
                        }
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

                    
                    //滚动加载购买用户列表
                    $scope.loadBuyerList = singleThreadedNetService(function () {
                        $scope.page.currentIndex++;
                        return MicroShopProductDetailAppService.getShopBuyRecords($scope.productModel.productId, $scope.page.currentIndex, pageSize).then(function (result) {
                            var data = result.data;
                            if (data.status == 1 && data.data) {
                                $scope.page = data.data.page;
                                angular.forEach(data.data.list, function (model) {
                                    var buyerModel = MicroShopProductDetailAppService.buyerModel(model);
                                    $scope.buyerList.push(buyerModel);
                                });
                            } else {
                                promptBarService.showErrorBar(result.data.message, 3000);
                            }
                            $scope.$broadcast("scroll.infiniteScrollComplete");
                        });
                    });

                    function init() {
                        //设置技术支持by校宝秀
                        MicroShopAppService.getFooter().then(function (result) {
                            var data = result.data;
                            if (data.status == 1 && data.data) {
                                var footer = data.data;
                                if ($scope.isPreview) {
                                    footer = footer.replace(/href\s*?=\s*?[\"'](.*?)[\"']/g, "href='javascript:void(0);'");
                                }
                                myFooterService.hideFeedback();
                                myFooterService.setFooter(footer);
                            }
                            else {

                            }
                        });
                        if (!$scope.isPreview) {
                            //商品详情页管理百度统计埋点
                            if (window._hmt) {
                                window._hmt.push(['_trackPageview', "/MShopCcommodity/ShopID=" + $scope.shopId]);
                            }
                            //查看时  记录商品浏览量
                            MicroShopProductDetailAppService.addProductPV($scope.productId).then(function (result) {
                                if (result.data.status == 1) {

                                }
                                else {
                                    promptBarService.showErrorBar(result.data.message, 3000);
                                }
                            });
                        }

                        //默认显示商品介绍
                        $scope.showPage = 0;
                        MicroShopProductDetailAppService.getMicroShopProductDetail($scope.productId).then(function (result) {
                            $scope.tabIndex = 0;
                            var data = result.data;
                            if (data.status == 1) {
                                if (data.data) {
                                    $scope.productModel = MicroShopProductDetailAppService.parseBizModelToUiModel(data.data);
                                    if ($scope.productModel.activityTypeModel.type == 1) {
                                        productTitle = "只要1块钱，快来购买" + $scope.productModel.name + "吧！";
                                    } else if ($scope.productModel.activityTypeModel.type == 2) {
                                        productTitle = "好货不等人，快来购买" + $scope.productModel.name + "吧！";
                                    }
                                    // 若是C端用户更改网页标题
                                    if ($scope.isPreview) {
                                        
                                    }
                                    else {
                                        $rootScope.$state.current.title = productTitle;
                                    }
                                    share($scope.productModel);
                                    $timeout(function () {
                                        $scope.$apply(function () {
                                            $scope.productModel = $scope.productModel;
                                            $scope.isShowslide = $scope.productModel.imgList.length > 1;
                                        });
                                    });
                                    isProductOnSelf($scope.productModel.isOnSelf);
                                    $scope.hasParticipate = $scope.productModel.productStateModel.code == 1 ? true : false;
                                    $scope.canParticipate = $scope.productModel.productStateModel.code == 0 ? true : false;
                                    var slide = setSlide();
                                    $timeout(function () {
                                        slide.update(true);
                                    });
                                    //倒计时
                                    MicroShopProductDetailAppService.getServerDateTime().then(function (result) {
                                        if (result.data.status == 1) {
                                            $scope.productModel.leftSeconds = $filter("diffSeconds")(result.data.data, $scope.productModel.endDate);
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
                                        if (isOnself) {
                                            //关闭loading动画
                                            $scope.hideLoading();
                                        }
                                    });
                                    //获取购买者列表
                                    MicroShopProductDetailAppService.getShopBuyRecords($scope.productModel.productId, $scope.page.currentIndex, pageSize).then(function (result) {
                                        var data = result.data;
                                        if (data.status == 1 && data.data) {
                                            $scope.page = data.data.page;
                                            angular.forEach(data.data.list, function (model) {
                                                var buyerModel = MicroShopProductDetailAppService.buyerModel(model);
                                                $scope.buyerList.push(buyerModel);
                                            });
                                        } else {
                                            promptBarService.showErrorBar(result.data.message, 3000);
                                        }

                                    });
                                }
                                else {
                                    isProductOnSelf(false);
                                }
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