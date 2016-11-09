"use strict";
/**
 * author :LTD
 * time: 2015年9月11日 15:03:58
 * description:
 */

define(["ionic", "modules/micro-activity-oldandnew-back-app/services"],
    function() {
        return angular.module("MicroActivityOldAndNewBackApp.controllers", ["MicroActivityOldAndNewBackApp.services"])
            .controller("MicroActivityOldAndNewBackAppController", [
                "$scope", "$rootScope", "$timeout", "$q","$ionicScrollDelegate", "MicroActivityOldAndNewBackAppService", "promptBarService",
                function($scope, $rootScope, $timeout, $q,$ionicScrollDelegate, microActivityOldAndNewBackAppService, promptBarService) {
                    $scope.page = {
                        "totalCount": "",
                        "currentIndex": "",
                        "itemCount": ""
                    };
                    var pageSize = 10;
                    $scope.imgTag = 1;
                    $scope.changeImgTag = function(imgTag) {
                        if ($scope.imgTag == imgTag) {
                            return;
                        } else {
                            $scope.imgTag = imgTag;
                            queryPage(1, pageSize, $scope.imgTag, "reset").then(function(){
                                $ionicScrollDelegate.scrollTop();
                            });
                        }
                    };

                    //选择背景
                    $scope.savePic = function(back) {
                        $scope.siteModel.pages[$scope.siteModel.currentPageIndex].sections[$scope.siteModel.currentSectionIndex].backgroundImage = back.Url;
                        $rootScope.$state.go("activity.oldandnewedit", {
                            templateId: $scope.$stateParams.templateId,
                            activityId: $scope.$stateParams.activityId,
                            activityType: $scope.$stateParams.activityType,
                            isHold: true

                        }, { inherit: false });
                    };

                    //滚动加载
                    $scope.loadMore = function() {
                        queryPage($scope.page.currentIndex + 1, pageSize, $scope.imgTag, "add").then(function() {
                            $scope.$broadcast("scroll.infiniteScrollComplete");
                        });
                    };
                    //公用querypage方法
                    var queryPage = function(pageIndex, pageSize, imgTag, queryType) {
                        //queryType = "reset"or "add"
                        if (!queryType) {
                            queryType = "reset";
                        }
                        var d = $q.defer();
                        microActivityOldAndNewBackAppService.getBackUrl($scope.$stateParams.templateId, pageIndex, pageSize, $scope.imgTag).success(function(result) {

                            if (result.status == 1) {
                                if (queryType == "add") {
                                    $scope.backs = $scope.backs.concat(result.data.list);
                                } else if (queryType == "reset") {
                                    $scope.backs = result.data.list;
                                }
                                $scope.page = result.data.page;
                                d.resolve();
                            } else {
                                promptBarService.showErrorBar(result.message, 3000);
                                d.reject();
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
                        return d.promise;
                    };


                    $scope.init = function() {
                        if (!angular.isUndefined($scope.siteModel)) {
                            queryPage(1, pageSize, $scope.imgTag, "reset");

                        } else {
                            // 报错页面，非法进入页面
                            window.location.href = "/Common/error?mark=MicroActivityOldAndNewBackAppController_init_siteModel_isUndefined";
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