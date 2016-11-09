"use strict";
/**
 * author :lv li、xujie、jiawen xu
 * update time: 2016/8/2
 * description:跟进列表
 */


define(["ionic", "modules/micro-registrationbook-channel-app/services"],
    function () {
        return angular.module("MicroRegistrationBookChannelApp.controllers", ["MicroRegistrationBookChannelApp.services", "TextInputCallback"])
            .controller("MicroRegistrationBookChannelAppController", [
                "$scope", "$filter", "$rootScope", "$q", "$sce", "MicroRegistrationBookChannelAppService", "promptBarService", "commonNetService", "$timeout", "textInputCallbackService", "$ionicScrollDelegate", "permissionService", "maskService", "$location",
                function ($scope, $filter, $rootScope, $q, $sce, MicroRegistrationBookChannelAppService, promptBarService, commonNetService, $timeout, textInputCallbackService, $ionicScrollDelegate, permissionService, maskService, $location) {

                    $scope.saleData = [
                    {
                        name: "全部咨询",
                        registrationDate: "999",
                        transferData:"80%",
                    }, {
                        name: "已分配",
                        registrationDate: "222",
                        transferData: "20%",
                    }, {
                        name: "跟进中",
                        registrationDate: "333",
                        transferData: "30%",
                    }, {
                        name: "已到访",
                        registrationDate: "444",
                        transferData: "10%",
                    }, {
                        name: "已成交",
                        registrationDate: "555",
                        transferData: "20%",
                    }, ];

                    //跳转到我的场景
                    $scope.goMyScenes = function () {
                        $scope.$state.go("index", {});
                    }
                    //跳转微店
                    $scope.goMicroShop = function () {
                        window.location.href = commonNetService.getMicroShopRouter();
                    }
                    //跳转到个人中心
                    $scope.goUserCenter = function () {
                        $scope.$state.go("userCenter", {});
                    };
                    $scope.goAllList = function () {
                        $scope.$state.go("registrationbook.registrationbookall");
                    }
                    $scope.goSchedule = function () {
                        $scope.$state.go("registrationbook.schedule");
                    }
                    $scope.goStatistics = function () {
                        $scope.$state.go("registrationbook.statistics");
                    }
                           
                    //初始化
                    $scope.init = function () {
                        //统一增加后台页面的Loading效果 
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
                    };
                    
                    $scope.init();

                }
            ]);
    });