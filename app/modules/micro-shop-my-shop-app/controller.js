"use strict";
/**
 * author :
 * time:
 * description:
 */

define(["ionic", "modules/micro-shop-my-shop-app/services", "services/net/common", "components/upload_img/app"],
    function () {
        return angular.module("MicroShopMyShopApp.controllers", ["MicroShopMyShopApp.services", "services.net.common", "UploadImg"])
            .controller("MicroShopMyShopAppController", [
                "$scope", "$rootScope", "$stateParams", "$interval", "$window", "$ionicSlideBoxDelegate", "promptBarService", "$timeout", "$filter", "commonNetService", "MicroShopMyShopAppService", "$ionicPopup", "maskService", "uploadImgService", "singleThreadedNetService", "sharePopupService", "myFooterService","MicroShopAppService",
                function ($scope, $rootScope, $stateParams, $interval, $window, $ionicSlideBoxDelegate, promptBarService, $timeout, $filter, commonNetService, MicroShopMyShopAppService, $ionicPopup, maskService, uploadImgService, singleThreadedNetService, sharePopupService, myFooterService, MicroShopAppService) {
                    var pageSize = 4;
                    $scope.page = {
                        totalCount: 10,
                        currentIndex: 1,
                        itemCount: 4
                    };
                    $scope.productList = [];
                    $scope.shopId = $scope.$stateParams.shopId;
                    $scope.viewType = $scope.$stateParams.type;
                    $scope.isPreview = $scope.viewType == "preview" ? true : false;
                    $scope.isShowIntroduce = false;
                    $scope.systemTime = "";
                    var defaultShopImgUrl = window.resourceDoMain + "/app/img/micro-shop-default-img.png",
                        defaultShareImgUrl = window.resourceDoMain + "/app/img/micro-shop-share-img.png",
                        shareModel,
                        sharePopupConfig = {
                            shareModel: {
                                "title": "我们学校的小店开业了，快来抢购吧！",
                                "desc": "新店开张，优惠多多，好处多多，快来购买吧！",
                                "imgUrl": defaultShareImgUrl
                            },
                            saveCallback: saveCallback,
                            shareCallback: shareCallback
                        }
                    var filter = $filter;
                    var timeInterval = null;
                    //TODO 同步公众号
                    $scope.syn = function () {
                        $scope.$state.go("microshopmanagement.syn", {type:1});
                        //var confirmPopup = $ionicPopup.confirm({
                        //    template: "<div class='microshopSynPop'><p class='top'>一键授权即可把您创建好的微店放进您的微信公众号的菜单里。</p><p class='bot'>注意：若已有菜单将会被覆盖，未经过认证的订阅号将无法进行同步。</p></div>",
                        //    cancelText: "取消",
                        //    okText: "确认"
                        //});
                        //confirmPopup.then(function (res) {
                        //    if (res) {
                        //        $scope.$state.go("microshopmanagement.syn", {});
                        //    } else {
                        //        return;
                        //    }
                        //});
                    }

                    // 分享保存回调
                    function saveCallback() {
                        shareModel = sharePopupService.getShareModel();
                        if (!shareModelValidate(shareModel)) {
                            return;
                        }
                        MicroShopMyShopAppService.updateShareConfig($scope.shopId, angular.toJson(shareModel)).then(function (res) {
                            if (res.data.status == 1) {
                                $scope.shareModel = shareModel;
                            } else {
                                sharePopupConfig.shareModel = $scope.shareModel;
                                sharePopupService.setSharePopupConfig(sharePopupConfig);
                                promptBarService.showErrorBar(result.data.message, 3000);
                            }
                            sharePopupService.closeSharePopup();
                        });
                    }
                    //分享回调
                    function shareCallback() {
                        shareModel = sharePopupService.getShareModel();
                        if (!shareModelValidate(shareModel)) {
                            return;
                        }
                        //微信自定义分享
                        MicroShopMyShopAppService.updateShareConfig($scope.shopId, angular.toJson(shareModel)).then(function (res) {
                            if (res.data.status == 1) {
                                $scope.shareModel = shareModel;
                                var shareConfig = getShareConfig(shareModel);
                                commonNetService.setShareMessage(shareConfig).then(function (res) {
                                    sharePopupService.closeMask();
                                }, function () {
                                    sharePopupService.closeMask();
                                    promptBarService.showErrorBar("分享出错", 3000);
                                });
                                sharePopupService.showMask();
                            } else {
                                sharePopupConfig.shareModel = $scope.shareModel;
                                sharePopupService.setSharePopupConfig(sharePopupConfig);
                                promptBarService.showErrorBar(result.data.message, 3000);
                            }
                            sharePopupService.closeSharePopup();
                        });
                    }
                    //分享model校验
                    function shareModelValidate(model) {
                        if (!model.title) {
                            promptBarService.showErrorBar("分享标题不能为空哦~！", 3000);
                            return false;
                        }
                        return true;
                    };
                    //显示分享弹窗
                    $scope.share = function () {
                        sharePopupService.showSharePopup();
                    }
                    //滚动图片计时器
                    var slideInterval = $interval(function () {
                        $ionicSlideBoxDelegate.update(); //刷新轮播图
                        $ionicSlideBoxDelegate.loop(true);
                    }, 2500)
                    //清除倒计时计时器
                    var stateChangeStart = $rootScope.$on("$stateChangeStart",
                        function () {
                            $interval.cancel(timeInterval);
                            $interval.cancel(slideInterval);
                        });

                    //销毁rootScope上的事件
                    $scope.$on("$destroy", function () {
                        stateChangeStart();
                    });
                    // 分页加载更多
                    $scope.loadMore = singleThreadedNetService(function () {
                        $scope.page.currentIndex++;
                        return MicroShopMyShopAppService.getMicroShopProductsList($scope.shopId, $scope.page.currentIndex, pageSize).then(function (result) {
                            $interval.cancel(timeInterval);
                            if (result.data.status == 1 && result.data.data) {
                                $scope.page = result.data.data.page;
                                angular.forEach(result.data.data.list, function (model) {
                                    var productModel = MicroShopMyShopAppService.getMicroShopModel(model);
                                    if (productModel.productStateCodeModel.code == 1 || productModel.productStateCodeModel.code == 0) {
                                        productModel.leftSeconds = filter("diffSeconds")($scope.systemTime, productModel.endDate);
                                    }
                                    $scope.productList.push(productModel);
                                });
                                timeInterval = $interval(function () {
                                    angular.forEach($scope.productList, function (model) {
                                        if ((model.productStateCodeModel.code == 1 || model.productStateCodeModel.code == 0) && model.leftSeconds > 0) {
                                            model.leftSeconds -= 1;
                                        }
                                    });
                                }, 1000);
                                $ionicSlideBoxDelegate.update(); //刷新轮播图
                                $ionicSlideBoxDelegate.loop(true);

                            } else {
                                promptBarService.showErrorBar(result.message, 3000);
                            }
                            $scope.$broadcast("scroll.infiniteScrollComplete");
                        });
                    });
                    // 参加砍价todo  
                    $scope.goMargin = function (model) {
                        if (model.productStateCodeModel.code == 0) {
                            if (model.leftSeconds > 0) {
                                $scope.$state.go("microshop.participateactivity", { shopId: $scope.shopId, productId: model.id, type: $scope.viewType });
                            } else {
                                $scope.goDetail(model.id);
                                $scope.avtiveEnd = true;
                            }
                        } else {
                            $scope.goDetail(model.id);
                        }
                    };
                    //商品详情页
                    $scope.goDetail = function (id) {
                        $scope.$state.go("microshop.productdetail", { shopId: $scope.shopId, productId: id, type: $scope.viewType });
                    }

                    function getShareConfig(model) {
                        var shareConfig = MicroShopMyShopAppService.shareConfig;
                        var link = $scope.getShareRouter() + encodeURIComponent("microshop/index/myshop?shopId=" + $scope.shopinfos.id);
                        shareConfig.title = model.title;
                        shareConfig.desc = model.desc;
                        shareConfig.imgUrl = model.imgUrl;
                        shareConfig.link = link;
                        return shareConfig;
                    }
                    //分享配置
                    function share() {
                        commonNetService.showOptionMenu();
                        var link = $scope.getShareRouter() + encodeURIComponent("microshop/index/myshop?shopId=" + $scope.shopinfos.id);
                        var config = {
                            "title": $scope.shareModel.title,
                            "desc": $scope.shareModel.desc,
                            "link": link,
                            "imgUrl": $scope.shareModel.imgUrl,
                            "type": "",
                            "dataUrl": ""
                        };
                        //微信自定义分享
                        commonNetService.setShareMessage(config).then(function () {
                            commonNetService.showOptionMenu();
                        }, function () {
                            commonNetService.showOptionMenu();
                            promptBarService.showErrorBar("分享出错", 3000);
                        });
                    }

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

                        if ($scope.$stateParams.isFirstLoad) {
                            maskService.showMask("", 0, false, 35);
                        }
                        if (!$scope.isPreview) {
                            //微店首页管理百度统计埋点
                            if (window._hmt) {
                                window._hmt.push(['_trackPageview', "/MShopChomepage/ShopID=" + $scope.shopId]);
                            }
                            //查看页 记录店铺浏览量
                            MicroShopMyShopAppService.addShopPV($scope.shopId).then(function (result) {
                                if (result.data.status == 1) {

                                } else {
                                    promptBarService.showErrorBar(result.data.msg, 3000);
                                }
                            });
                        } else {
                            window.wx && window.wx.hideOptionMenu();
                        }

                        //获取店铺详情
                        MicroShopMyShopAppService.getMicroShopByShopId($scope.shopId).then(function (result) {
                            if (result.data.status == 1) {
                                if (result.data.data) {
                                    var shopInfoModel = MicroShopMyShopAppService.getShopInfoModel(result.data.data);
                                    $scope.shopinfos = shopInfoModel;
                                    $scope.shareModel = !$scope.shopinfos.shareConfig ? sharePopupConfig.shareModel : $scope.shopinfos.shareConfig;
                                    sharePopupConfig.shareModel = $scope.shareModel;
                                    sharePopupService.setSharePopupConfig(sharePopupConfig);
                                    // 若是C端用户更改网页标题todo
                                    if ($scope.isPreview) {
                                        $rootScope.$state.current.title = "我的店铺";
                                    } else {
                                        share();
                                        $rootScope.$state.current.title = $scope.shopinfos.name + "的小店开业啦，快来抢购吧！";
                                    }
                                    if (!$scope.shopinfos.imageUrl || $scope.shopinfos.imageUrl.length == 0) {
                                        $scope.shopinfos.imageUrl = defaultShopImgUrl;
                                    } else {
                                        $scope.shopinfos.imageUrl = shopInfoModel.imageUrl[0].url;
                                    }
                                }

                            } else {
                                promptBarService.showErrorBar(result.data.msg, 3000);
                            }
                        });
                        //获取店铺商品列表
                        MicroShopMyShopAppService.getMicroShopProductsList($scope.shopId, $scope.page.currentIndex, pageSize).then(function (result) {
                            var data = result.data;
                            if (data.status == 1) {
                                if (data.data) {
                                    $scope.page = data.data.page;
                                    angular.forEach(data.data.list, function (model) {
                                        var goodsModel = MicroShopMyShopAppService.getMicroShopModel(model);
                                        $scope.productList.push(goodsModel);
                                    });
                                    $ionicSlideBoxDelegate.update(); //刷新轮播图
                                }
                                $scope.showProductList = $scope.productList == 0 ? false : true;
                                MicroShopMyShopAppService.getSystemTime().then(function (result) {
                                    if (result.data.status == 1) {
                                        if (data.data) {
                                            $scope.systemTime = result.data.data;
                                            angular.forEach($scope.productList, function (model) {
                                                if (model.productStateCodeModel.code == 1 || model.productStateCodeModel.code == 0) {
                                                    model.leftSeconds = filter("diffSeconds")($scope.systemTime, model.endDate);
                                                }
                                            });
                                            timeInterval = $interval(function () {
                                                angular.forEach($scope.productList, function (model) {
                                                    if ((model.productStateCodeModel.code == 1 || model.productStateCodeModel.code == 0) && model.leftSeconds > 0) {
                                                        model.leftSeconds -= 1;
                                                    }
                                                });

                                            }, 1000);
                                            $ionicSlideBoxDelegate.update(); //刷新轮播图
                                            $ionicSlideBoxDelegate.loop(true);
                                        }
                                    } else {
                                        promptBarService.showErrorBar(result.data.message, 3000);
                                    }
                                    //关闭loading动画
                                    $scope.hideLoading();
                                });
                                $scope.isShowIntroduce = ($scope.productList.length == $scope.page.itemCount) ? true : false;
                            } else {
                                //关闭loading动画
                                $scope.hideLoading();
                                promptBarService.showErrorBar(result.message, 3000);
                            }
                        });

                    }
                    init();
                }
            ]);
    });