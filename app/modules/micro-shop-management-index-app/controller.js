"use strict";
/**
 * author :
 * time:
 * description:
 */

define(["ionic", "modules/micro-shop-management-index-app/services"],
    function() {
        return angular.module("MicroShopManagementIndexApp.controllers", ["MicroShopManagementIndexApp.services", "TextInputCallback"])
            .controller("MicroShopManagementAppIndexController", [
                "$scope", "$rootScope", "$window", "promptBarService", "textInputCallbackService", "MicroShopManagementIndexAppService", "commonNetService",
                function($scope, $rootScope, $window, promptBarService, textInputCallbackService, MicroShopManagementIndexAppService, commonNetService) {
                    // $scope.hasMicroShop = hasMicroShop;
                    //tab选中项
                    //$scope.tabIndex = 1;

                    $scope.data = MicroShopManagementIndexAppService.data;
                    //跳转到我的场景
                    $scope.goMyScenes = function() {
                            var url = "index";
                            window.location.href = $scope.getIndexRouter(url);
                            //$scope.$state.go("index", {});
                        }
                        //跳转微店
                    $scope.goMicroShop = function() {
                            $scope.$state.go("microshopmanagement.index.product", {});
                        }
                        //隐藏二维码
                    $scope.closeQrCode = function() {
                            $scope.data.isShowQrCode = false;
                        }
                        //跳转到报名本
                    $scope.goRegistrationBook = function() {
                        //if ($scope.isSchoolpalUser) {
                        // window.location.href = "/OAuth/SchoolPalRoute?redirectUrl=" + encodeURIComponent(window.schoolPalAuthenticationServer + "/Consult/ConsultList");
                        // }
                        //else {
                        var url = 'registrationbook/registrationbookall?trace=traceByAppIndex';
                        window.location.href = $scope.getIndexRouter(url);
                        //$scope.$state.go("registrationbook.registrationbookall", { trace: "traceByAppIndex" });
                        // }
                    }

                    //跳转到个人中心
                    $scope.goUserCenter = function() {
                        var url = 'userCenter';
                        window.location.href = $scope.getIndexRouter(url);
                        //$scope.$state.go("userCenter", {});
                    };
                    //tab切换
                    $scope.changeTab = function(index) {
                        $scope.data.tabIndex = index;
                        if (index == 1) {
                            $scope.$state.go("microshopmanagement.index.product");
                        } else if (index == 2) {
                            $scope.$state.go("microshopmanagement.index.order");
                        } else if (index == 3) {
                            $scope.$state.go("microshopmanagement.index.shop");
                        }
                    }

                    function init() {
                        //是否从校宝工作台进来
                        $scope.isSchoolpalUser = (window.isSchoolpalUser == "true") ? true : false;
                        if ($scope.microShopModel.shopId == 0) {
                            $scope.$state.go("microshopmanagement.create");
                        } else if ($scope.microShopModel.state == 1) {
                            window.location.href = "/Common/MicroShopError?errorMsg=shopFreeze";
                        }
                    }
                    init();
                }
            ]);
    });