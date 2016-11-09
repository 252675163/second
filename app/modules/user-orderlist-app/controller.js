"use strict";
/**
 * author :huijuan
 * time:2016/3/7
 * description:VIP订单列表
 */

define(["ionic", "modules/user-orderlist-app/services", "services/net/common", "services/common-service"],
    function() {
        return angular.module("UserOrderListApp.controllers", ["UserOrderListApp.services","services.net.common", "Services.common"])
            .controller("userOrderListAppController", [
                "$scope", "$rootScope", "promptBarService", "userOrderListAppService", "$ionicPopup", "$timeout", "$stateParams", "$ionicScrollDelegate", "singleThreadedNetService", "commonNetService",
                function ($scope, $rootScope, promptBarService, userOrderListAppService, $ionicPopup, $timeout, $stateParams, $ionicScrollDelegate, singleThreadedNetService, commonNetService) {

                    var pageSize = 10;
                    var pageIndex = 1;
                    $scope.page = {
                        totalCount: "",
                        currentIndex: "",
                        itemCount: ""
                    };
                    $scope.type = 1;

                    //切换列表数据 （增加Loading效果） type:1-全部，2-邀请记录，3-VIP码兑换记录
                    $scope.switchType = singleThreadedNetService(function (type) {
                        $scope.type = type;
                        return userOrderListAppService.getVipOrderList(1, pageSize, $scope.type).success(function (result) {

                            if (result.status == 1) {
                                $scope.renderDataList(result.data.list, "reset");
                                $ionicScrollDelegate.scrollTop();
                                $scope.page = result.data.page;
                            } else {
                                promptBarService.showErrorBar(result.message, 3000);
                            }
                        });
                    });
                    //格式化日期
                    $scope.formatDateByStatistics = function (data) {
                        return data && new Date(parseInt(data.substr(6, 13)));
                    };
                    $scope.getVipTagName = function (data) {
                        if (data == 1) {
                            return "邀请用户";
                        }
                        else if (data == 2) {
                            return "VIP码";
                        }
                        else if(data==3){
                        return "首次绑定";
                        }
                    };
                    //滚动加载
                    $scope.loadMore = function () {
                        userOrderListAppService.getVipOrderList($scope.page.currentIndex + 1, pageSize, $scope.type).success(function (result) {
                            $scope.$broadcast("scroll.infiniteScrollComplete");
                            if (result.status == 1) {
                                $scope.renderDataList(result.data.list, "add");
                                $scope.page = result.data.page;
                            } else {
                                promptBarService.showErrorBar(result.message, 3000);
                            }

                        });
                    };
                    //数据渲染
                    $scope.renderDataList = function (list, renderType) {
                        //renderType:"reset"/"add"
                        //renderType默认为“reset”
                        if (!renderType) {
                            renderType = "reset";
                        }

                        if (renderType == "add") {
                            $scope.list = $scope.list.concat(list);
                        } else {
                            $scope.list = list;
                        }
                    };

                    function init() {
                        commonNetService.addBackgroundOperationLog("VipOrders");

                        $scope.type = ($stateParams.comeFrom != undefined) ? $scope.$state.params.comeFrom : 1;
                        //从不同的路由进来，用户中心，邀请有礼，VIP兑换（1，2，3）
                        userOrderListAppService.getVipOrderList(pageIndex, pageSize, $scope.type).success(function (result) {
                            if (result.status == 1) {
                                $scope.renderDataList(result.data.list, "reset");
                                $scope.page = result.data.page;
                            } else {
                                promptBarService.showErrorBar(result.message, 3000);
                            }
                        });
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

                    init();


                }
            ]);
    });