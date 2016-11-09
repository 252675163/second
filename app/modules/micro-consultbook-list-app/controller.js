"use strict";
/**

 */

define(["ionic", "modules/micro-consultbook-list-app/services", "services/net/common"],
    function() {
        return angular.module("MicroConsultBookListApp.controllers", ["MicroConsultBookListApp.services", "services.net.common"])
            .controller("MicroConsultBookListAppController", [
                "$scope", "$rootScope", "MicroConsultBookListAppService", "$state", "commonNetService", "$timeout", "promptBarService",
                function ($scope, $rootScope, microConsultBookListAppService, $state, commonNetService, $timeout, promptBarService) {

                    var pageSize = 10;
                    $scope.page = {
                        totalCount: "",
                        currentIndex: "",
                        itemCount: ""
                    };
                    $scope.type = 100;//全部：100，官网：0，活动：1

                    $scope.loadMore = function () {
                        microConsultBookListAppService.GetUserSummaries($scope.page.currentIndex+1,pageSize, $scope.type).success(function (result) {
                            console.log("ajjajajajdffdfg");
                            $scope.$broadcast('scroll.infiniteScrollComplete');
                            if(result.status==1){
                                var list = result.data.list;
                                for (var i = 0; i <list.length; i++) {
                                    if (list[i].ShareConfig) {
                                        list[i].Title = JSON.parse(list[i].ShareConfig).title;
                                    } else {
                                        var defaultShareModel = microConsultBookListAppService.getTemplateDefaultTitle($scope.data[i].TemplateId, $scope.data[i].Type);
                                        list[i].Title = defaultShareModel.title;
                                    }
                                }
                                $scope.data = $scope.data.concat(list);
                                $scope.page = result.data.page;
                            }else{
                                promptBarService.showErrorBar(result.message,3000);
                            }


                        });
                    };
                    $scope.consults = function (activityId,type) {
                        $rootScope.$state.go("consultbook", { id: activityId, type: type }, {
                            reload: true,
                            inherit: false
                        });
                    }

                    //初始化
                    $scope.init = function() {

                        microConsultBookListAppService.GetUserSummaries(1,pageSize, $scope.type).success(function (result) {
                            if(result.status==1){
                                $scope.data = result.data.list;
                                $scope.page = result.data.page;
                                for (var i = 0; i < $scope.data.length; i++) {
                                    if ($scope.data[i].ShareConfig) {
                                        $scope.data[i].Title = JSON.parse($scope.data[i].ShareConfig).title;
                                    } else {
                                        var defaultShareModel = microConsultBookListAppService.getTemplateDefaultTitle($scope.data[i].TemplateId, $scope.data[i].Type);
                                        $scope.data[i].Title = defaultShareModel.title;
                                    }
                                }

                            }else{
                                promptBarService.showErrorBar(result.message,3000);
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

                }
            ]);
    });