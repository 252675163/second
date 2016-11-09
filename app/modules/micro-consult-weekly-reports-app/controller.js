"use strict";
/**
 * author :
 * time:
 * description:咨询本周报
 */


define(["ionic", "modules/micro-consult-weekly-reports-app/services", "services/net/common", "services/common-service"],
    function() {
        return angular.module("MicroConsultWeeklyReportsApp.controllers",
            ["MicroConsultWeeklyReportsApp.services", "services.net.common", "Services.common"])
            .controller("MicroConsultWeeklyReportsAppController",
            [
                "$scope", "$rootScope", "$filter", "MicroConsultWeeklyReportsAppService", "$state", "commonNetService",
                "$timeout", "promptBarService", "uploadImgService", "$ionicScrollDelegate", "singleThreadedNetService",
                function($scope,
                    $rootScope,
                    $filter,
                    microConsultWeeklyReportsAppService,
                    $state,
                    commonNetService,
                    $timeout,
                    promptBarService,
                    uploadImgService,
                    $ionicScrollDelegate,
                    singleThreadedNetService) {

                    var pageSize = 10;
                    var pageIndex = 1;
                    $scope.page = {
                        totalCount: "",
                        currentIndex: "",
                        itemCount: ""
                    };
                    $scope.type = 0; //0:官网，1活动，100：全部
                    $scope.headBox = {};
                    //头部高度 滚动切换样式需要
                    // var headHeight = parseFloat(document.documentElement.style.fontSize)*parseFloat(document.getElementsByClassName("header_banner")[0].style.height);

                    // 跳转到咨询本
                    $scope.goConsult = function(id, type, templateCode, templateType) {
                        //如果是有排行榜的活动，则跳转到老的报名本 2016.5.12 by yinglechao
                        if (templateCode == "Grass1" ||
                            templateCode == "Grass2" ||
                            templateCode == "Christmas" ||
                            templateCode == "GrowVegettables" ||
                            templateCode == "Vote" ||
                            templateCode == "Aquarium"||
                            templateCode == "Assistant") {
                            $scope.$state.go("consultbook", { id: id, type: type, trace: "traceByWeeklyReports" });
                        } else {
                            $scope.$state.go("registrationbook.registrationbookall",
                            { id: id, type: templateType, trace: "traceByWeeklyReports" });
                        }

                    };

                    //切换列表数据 （增加Loading效果） type:0 官网 1 活动 2 全部
                    $scope.switchType = singleThreadedNetService(function(type) {
                        $scope.type = type;
                        return microConsultWeeklyReportsAppService
                            .getSummariesByHaveConsult(1, pageSize, $scope.type, $scope.startDate, $scope.endDate)
                            .success(function(result) {

                                if (result.status == 1) {
                                    var scrollTop = $ionicScrollDelegate.getScrollPosition().top >=
                                        $scope.headBox.height
                                        ? $scope.headBox.height
                                        : $ionicScrollDelegate.getScrollPosition().top;
                                    $scope.renderDataList(result.data.list, "reset");
                                    $ionicScrollDelegate.scrollTo(0, scrollTop);
                                    $scope.page = result.data.page;
                                } else {
                                    promptBarService.showErrorBar(result.message, 3000);
                                }
                            });
                    });

                    //滚动加载
                    $scope.loadMore = function() {
                        microConsultWeeklyReportsAppService
                            .getSummariesByHaveConsult($scope.page.currentIndex + 1,
                                pageSize,
                                $scope.type,
                                $scope.startDate,
                                $scope.endDate)
                            .success(function(result) {
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
                    //数据渲染
                    $scope.renderDataList = function(list, renderType) {
                        //renderType:"reset"/"add"
                        //renderType默认为“reset”
                        if (!renderType) {
                            renderType = "reset";
                        }
                        //设置title
                        for (var i = 0; i < list.length; i++) {
                            if (list[i].ShareConfig) {
                                list[i].Title = JSON.parse(list[i].ShareConfig).title;
                                list[i].config = angular.fromJson(list[i].shareConfig);
                                list[i].configPreviewImg = JSON.parse(list[i].ShareConfig).imgUrl;
                                list[i].desc = JSON.parse(list[i].ShareConfig).desc;
                            } else {
                                // {\"title\":\"这是我用校宝秀做的第一个场景\",\"desc\":\"请在此输入场景简介，这里一共可以输入140个字\",\"link\":\"\",\"imgUrl\":\"http://cdn.schoolpal.cn/shiningstar"+"/Activity/temp3_share_img.jpg\",\"type\":\"\",\"dataUrl\":\"\"}
                                //2016.1.19 tetle和desc不使用默认文案
                                var type = list[i].Type == 1 ? "activity" : "webSite";
                                if (type == "activity") {
                                    var shareConfig = microConsultWeeklyReportsAppService
                                        .getTemplateDefaultTitle(list[i].TemplateId, list[i].Type, list[i].Style);
                                    list[i].Title = shareConfig.title;
                                    list[i].config = shareConfig;
                                    list[i].configPreviewImg = shareConfig.imgUrl;
                                    list[i].desc = shareConfig.desc;
                                } else {
                                    var shareConfig = microConsultWeeklyReportsAppService
                                        .getTemplateDefaultTitle(list[i].TemplateId, list[i].Type, list[i].Style);
                                    var emptyShareConfig = angular
                                        .copy(microConsultWeeklyReportsAppService.shareConfigModel);
                                    // list[i].Title = emptyShareConfig.title;
                                    list[i].config = emptyShareConfig;
                                    list[i].configPreviewImg = shareConfig.imgUrl;
                                    list[i].desc = emptyShareConfig.desc;
                                }
                            }
                        }
                        if (renderType == "add") {
                            $scope.data = $scope.data.concat(list);
                        } else {
                            $scope.data = list;
                        }

                    };

                    //滚动 置顶head
                    $scope.locationNav = function() {
                        //获取滚动的距离
                        var top = $ionicScrollDelegate.getScrollPosition().top;
                        console.log($scope.headBox.height);
                        if (top > $scope.headBox.height) {
                            $scope.isFixedNav = true;
                            $timeout(function() {
                                    if ($scope.$root.$$phase != "$apply" && $scope.$root.$$phase != "$digest") {
                                        $scope.$apply();
                                    }
                                },
                                0);
                        } else if (top <= $scope.headBox.height) {
                            $scope.isFixedNav = false;
                            $timeout(function() {
                                    if ($scope.$root.$$phase != "$apply" && $scope.$root.$$phase != "$digest") {
                                        $scope.$apply();
                                    }
                                },
                                0);
                        }

                    };


                    //初始化
                    $scope.init = function() {
                        commonNetService.addBackgroundOperationLog("LeadsWeeklyRemind");

                        $scope.startDate = $scope.$stateParams.startDate;
                        $scope.endDate = $scope.$stateParams.endDate;
                        if ($scope.endDate == "true" ||
                            $scope.startDate == "true" ||
                            !$scope.endDate ||
                            !$scope.startDate) {
                            location.href = "/Common/Error?mark=MicroConsultWeeklyReportsAppController_init_startDateOrendDate_vaild";
                        }

                        //获取活动或官网列表
                        microConsultWeeklyReportsAppService
                            .getSummariesByHaveConsult(pageIndex,
                                pageSize,
                                $scope.type,
                                $scope.startDate,
                                $scope.endDate)
                            .success(function(result) {

                                if (result.status == 1) {
                                    $scope.renderDataList(result.data.list, "reset");
                                    $scope.page = result.data.page;
                                    $scope.consultCountForSite = result.data.info.WebsiteConsults;
                                    $scope.consultCountForActivity = result.data.info.ActivityConsults;

                                } else {
                                    promptBarService.showErrorBar(result.message, 3000);
                                }

                                //统一增加后台页面的Loading效果 by xp 2015年11月13日 16:09:13
                                if (!$rootScope.isFirstLoad) {
                                    $timeout(function() {
                                            $(".lockMask-loading2").hide();
                                            $rootScope.isFirstLoad = true;
                                        },
                                        1833);
                                } else {
                                    $(".lockMask-loading2").hide();
                                }
                            });
                    };
                    $scope.init();


                }
            ]);
    });