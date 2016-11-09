"use strict";
/**
 * author :小潘
 * time: 2015年11月5日 16:43:50
 * description:校宝秀 创建场景
 */


define(["ionic", "modules/micro-new-app/services", "services/net/common", "services/net/grass"/*, "modules/microactivityapp/services"*/],
    function () {
        return angular.module("MicroNewApp.controllers", ["MicroNewApp.services", "services.net.common", "services.net.grass", "MicroActivityApp.services"])
            .controller("MicroNewAppController", [
                "$scope", "$rootScope", "MicroNewAppService", "$state", "commonNetService", "$timeout", "promptBarService", "microActivityAppService", "grassNetService","$ionicScrollDelegate",
                function ($scope, $rootScope, microNewAppService, $state, commonNetService, $timeout, promptBarService, microActivityAppService, grassNetService, $ionicScrollDelegate) {

                    $scope.TemplateList = "";
                    var pageSize = 10;
                    $scope.page = {
                        totalCount: "",
                        currentIndex: "",
                        itemCount: ""
                    };
                    $scope.templateType = $rootScope.$stateParams.templateType||0; //0 所有 2 微活动 3 微助力 4 微投票 5 微传单

                    //$scope.showAll = function () { }

                    //$scope.showActivity = function () { }

                    //$scope.showWebsite = function () { }

                    ////跳到预览
                    $scope.goPreview = function(temlateId, type, isVip) {
                        if (type == 1) {
                            if (temlateId == 2) {
                                //获取默认数据
                                var temp = grassNetService.getActivityMockInfo(0, temlateId);
                                $scope.cacheData = temp;
                                microActivityAppService.setGrassPreview($scope.cacheData);
                                $scope.$state.go("activity.grassindexb", { ispreview: true, stuid: 1 });

                            } else {
                                delete ($rootScope.siteModel);
                                $rootScope.$state.go("activity.oldandnewpreview", { templateId: temlateId, isVip: isVip });
                            }
                        } else {
                            //warning 隐藏微官网
//                            delete ($rootScope.siteModel);
//                            $scope.$state.go('newsite.preview', { templateId: temlateId});
                        }
                    };

                    //滚动加载
                    $scope.loadMore = function() {
                        microNewAppService.getTemplateDetailsByTemplateType($scope.page.currentIndex + 1, pageSize, $scope.templateType).success(function (result) {
                            $scope.$broadcast("scroll.infiniteScrollComplete");
                            if (result.status == 1) {
                                $scope.TemplateList = $scope.TemplateList.concat(result.data.list);
                                //设置标签显示
                                $scope.TemplateList = microNewAppService.setTagShowObj($scope.TemplateList);
                                $scope.page = result.data.page;
                            } else {
                                promptBarService.showErrorBar(result.message, 3000);
                            }
                        });
                    };


                    $scope.init = function () {
                        commonNetService.addBackgroundOperationLog("TemList");

                        $scope.showSwitchTab = false;
                        microNewAppService.getTemplateDetailsByTemplateType(1, pageSize, $scope.templateType).success(function (result) {
                            if (result.status == 1) {
                                $scope.TemplateList = result.data.list;
                                $scope.page = result.data.page;
                         
                                //设置标签显示
                                $scope.TemplateList = microNewAppService.setTagShowObj($scope.TemplateList);
                            } else {
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
                    };
                    $scope.init();
                    //跳到编辑
                    //$scope.goEditView = function (acytivityTemlateId) {
                    //    hardCode 种草活动templateId为2
                    //    if (acytivityTemlateId === 2) {
                    //        $rootScope.$state.go("activity.grass", {
                    //            userId: $rootScope.UserId,
                    //            templateId: acytivityTemlateId
                    //        });
                    //    } else {
                    //        delete ($rootScope.siteModel);
                    //        $rootScope.$state.go("activity.oldandnewedit", { templateId: acytivityTemlateId });
                    //    }


                    //};
                }
            ]);
    });