"use strict";
/**
 * author :
 * time:
 * description:
 */

define(["ionic", "modules/micro-shop-index-app/services"],
    function () {
        return angular.module("MicroShopIndexApp.controllers", ["MicroShopIndexApp.services"])
            .controller("MicroShopIndexAppController", [
                "$scope", "$rootScope", "$window", "promptBarService", "commonNetService", "MicroShopIndexAppService", "$ionicPopup", "$timeout", "maskService",
                function ($scope, $rootScope, $window, promptBarService, commonNetService, MicroShopIndexAppService, $ionicPopup, $timeout, maskService) {
                    //tab切换
                    $scope.changeTab = function (index) {
                        var isPreview = $scope.$stateParams.type == "preview";
                        var shopId = $scope.$stateParams.shopId;
                        if (index == 1) {
                            $scope.$state.go("microshop.index.myshop", { shopId: shopId });
                        }
                        else if (index == 2) {
                            if (isPreview) {
                                promptBarService.showErrorBar("预览页面不可查看我的商品", 3000);
                                return;
                            }
                            $scope.$state.go("microshop.index.myproduct", { shopId: shopId });
                        }
                        else if (index == 3) {
                            if (isPreview) {
                                promptBarService.showErrorBar("预览页面不可查看我的订单", 3000);
                                return;
                            }
                            $scope.$state.go("microshop.index.myorder", { shopId: shopId });
                        }
                    }
                    function init() {
                    }

                    init();


                }
            ]);
    });