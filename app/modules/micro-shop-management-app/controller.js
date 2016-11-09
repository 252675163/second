"use strict";
/**
 * author :
 * time:
 * description:
 */

define(["ionic", "modules/micro-shop-management-app/services"],
    function() {
        return angular.module("MicroShopManagementApp.controllers", ["MicroShopManagementApp.services", "TextInputCallback"])
            .controller("MicroShopManagementAppController", [
                "$scope", "$rootScope", "$window", "promptBarService", "microShopModel", "$timeout", "maskService", "MicroShopManagementAppService",
                function($scope, $rootScope, $window, promptBarService, microShopModel, $timeout, maskService, MicroShopManagementAppService) {
                    $scope.microShopModel = microShopModel;
                    $scope.hasKouBei = false;
                    $scope.getIndexRouter = function(url) {
                            return window.server + "/home/index#/" + url;
                        }
                        //�ر�loading����
                    $scope.hideLoading = function() {
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
                    }

                    function init() {
                        if ($scope.microShopModel.shopId == 0) {
                            return;
                        }
                        MicroShopManagementAppService.hasKouBei($scope.microShopModel.shopId).then(function(result) {
                            if (result.data.status == 1) {
                                $scope.hasKouBei = result.data.data.HasKoubeiShop;
                            } else {
                                promptBarService.showErrorBar(result.data.message, 3000);
                            }
                        });
                        //����δ�ϴ�Ӫҵִ����Ϣ��������ʾ����
                        if (!$scope.microShopModel.licensePic || angular.fromJson($scope.microShopModel.licensePic).length == 0) {
                            maskService.showMask("", 0, false, 36);
                        }
                    }
                    init();
                }
            ]);
    });