"use strict";
/**
 * author :LTD
 * time: 2015年9月11日 15:03:58
 * description:
 */

define(["ionic", "modules/micro-activity-oldandnew-add-app/services"],
    function() {
        return angular.module("MicroActivityOldAndNewAddApp.controllers", ["MicroActivityOldAndNewAddApp.services"])
            .controller("MicroActivityOldAndNewAddAppController", [
                "$scope", "$rootScope", "$q", "$ionicScrollDelegate", "MicroActivityOldAndNewAddAppService", "promptBarService", "$timeout",
                function($scope, $rootScope, $q, $ionicScrollDelegate, microActivityOldAndNewAddAppService, promptBarService, $timeout) {


                    var pageSize = 10;
                    $scope.page = {
                        totalCount: "",
                        currentIndex: "",
                        itemCount: ""
                    };
                    $scope.hideAllType = $scope.$stateParams.activityType == '2' ? true : false;
                    $scope.type = $scope.hideAllType ? "index" : "all"; //$scope.type =all,index,imageOrText,form
                    //选择模板
                    $scope.saveMould = function(name, sectionbackgroundImage, type) {
                        if ($scope.siteModel.pages[$scope.siteModel.currentPageIndex].sections.length < 10) {
                            $scope.siteModel.pages[$scope.siteModel.currentPageIndex].sections.splice($scope.siteModel.currentSectionIndex + 1, 0, {
                                "sectionName": "",
                                "templateName": name,
                                "templateModel": {},
                                "backgroundImage": sectionbackgroundImage,
                                "type": type
                            });
                            $scope.siteModel.currentSectionIndex++;
                            $rootScope.$state.go("activity.oldandnewedit", {
                                templateId: $scope.$stateParams.templateId,
                                activityId: $scope.$stateParams.activityId,
                                activityType: $scope.$stateParams.activityType,
                                isHold: true
                            }, { inherit: false });
                        }

                    };

                    //添加模板分类 2015.11.7 by yinglechao
                    $scope.changeType = function(type) {
                        //$scope.type =all,index,imageOrText,form
                        if ($scope.type == type) {
                            return;
                        } else {
                            queryPage(1, pageSize, type, "reset").then(function() {
                                $ionicScrollDelegate.scrollTop();
                                $scope.type = type;

                            });
                        }
                    };

                    //滚动加载by yinglechao 2015.11.7
                    $scope.loadMore = function() {
                        console.log("加载下一页数据");
                        if (!$scope.isLoad) {
                            $scope.isLoad = true;
                            queryPage($scope.page.currentIndex + 1, pageSize, $scope.type, "add").then(function(data) {
                                $scope.$broadcast("scroll.infiniteScrollComplete");
                                $scope.isLoad = false;
                            });
                        } else {
                            $scope.$broadcast("scroll.infiniteScrollComplete");
                        }
                    };

                    //根据条件加载数据by yinglechao 2015.11.7
                    var queryPage = function(pageIndex, pageSize, filter, queryType) {
                        //queryType = "add" / "reset"
                        var query = queryType || "add";
                        var d = $q.defer();
                        microActivityOldAndNewAddAppService.getSection($scope.$stateParams.templateId, pageIndex, pageSize, filter).then(function(result) {
                            if (result.data.status == 1) {
                                if (queryType == "add") {
                                    $scope.sections = $scope.sections.concat(result.data.data.list);
                                } else {
                                    $scope.sections = result.data.data.list;
                                }
                                $scope.page = result.data.data.page;
                                console.log($scope.page);
                                d.resolve();
                            } else {
                                promptBarService.showErrorBar(result.data.message, 3000);
                                d.reject(result.data.message);
                            }
                            //统一增加后台页面的Loading效果 by xp 2015年11月13日 16:09:13
                            if (!$rootScope.isFirstLoad) {
                                $timeout(function() {
                                    $(".lockMask-loading2").hide();
                                    $rootScope.isFirstLoad = true;
                                }, 1833);
                            } else {
                                $timeout(function() {
                                    $(".lockMask-loading2").hide();
                                    $rootScope.isFirstLoad = true;
                                }, 1000);
                            }
                        });
                        return d.promise;
                    };


                    $scope.init = function() {

                        if (!angular.isUndefined($scope.siteModel)) {
                            //todo 新活动不给予选择【模板】
                            if ($scope.$stateParams.showAllType) {

                            }
                            queryPage(1, pageSize, $scope.type, "reset");
                            // $scope.sections = microActivityOldAndNewAddAppService.getSection($scope.$stateParams.templateId);

                        } else {
                            // 报错页面，非法进入页面
                            window.location.href = "/Common/error?mark=MicroActivityOldAndNewAddAppController_init_siteModel_isUndefined";
                        }

                    };
                    $scope.init();
                    $scope.$on("$stateChangeStart", function(event, toState) {
                        if (toState.name.indexOf("activity") !== -1) {
                            event.targetScope.siteModel = angular.copy($scope.siteModel);
                            event.targetScope.activityOtherConfig = angular.copy($scope.activityOtherConfig);

                        }
                    });

                }
            ]);
    });