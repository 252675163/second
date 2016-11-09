"use strict";
/**
 * author :LTD
 * time: 2015年9月11日 15:03:58
 * description:
 */

define(["ionic", "modules/microsite-back-app/services"],
    function() {
        return angular.module("MicroSiteBackApp.controllers", ["MicroSiteBackApp.services"])
            .controller("MicroSiteBackAppController", [
                "$scope", "$rootScope", "$q", "MicroSiteBackAppService", "$ionicModal", "promptBarService",
                function($scope, $rootScope, $q, microSiteBackAppService, $ionicModal, promptBarService) {
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
                            queryPage(1, pageSize, $scope.imgTag, "reset");
                        }
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
                        microSiteBackAppService.getBackUrl($scope.$stateParams.templateId, pageIndex, pageSize, $scope.imgTag).success(function(result) {
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
                        });
                        return d.promise;
                    };

                    //选择背景
                    $scope.savePic = function(back) {
                        $scope.siteModel.pages[$scope.siteModel.currentPageIndex].sections[$scope.siteModel.currentSectionIndex].backgroundImage = back.Url;
                        $rootScope.$state.go("site.edit", { templateId: $scope.$stateParams.templateId, websiteId: $scope.$stateParams.websiteId, isHold: true }, { reload: true, inherit: false });
                    };

                    $scope.init = function() {
                        if (!angular.isUndefined($scope.siteModel)) {
                            //microSiteBackAppService.getBackUrl($scope.$stateParams.templateId).success(function (data) {
                            //    $scope.backs = data;
                            //});
                            queryPage(1, pageSize, $scope.imgTag, "reset");
                            //统一增加后台页面的Loading效果 by xp 2015年11月13日 16:09:13
                            if (!$rootScope.isFirstLoad) {
                                $timeout(function () {
                                    $(".lockMask-loading2").hide();
                                    $rootScope.isFirstLoad = true;
                                }, 1833);
                            } else {
                                $(".lockMask-loading2").hide();
                            }

                        } else {
                            // 报错页面，非法进入页面
                            window.location.href = "/Common/error";
                        }
                    };
                    $scope.init();
                    $scope.$on("$stateChangeStart", function(event, toState) {
                        if (toState.name.indexOf("site") !== -1) {
                            event.targetScope.siteModel = angular.copy($scope.siteModel);
                        }

                    });


                }
            ]);
    });