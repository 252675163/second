"use strict";
/**
 * author :
 * time:
 * description:
 */

define(["ionic", "modules/micro-shop-management-syn-qrCode-app/services"],
    function () {
        return angular.module("MicroShopManagementSynQrCodeApp.controllers", ["MicroShopManagementSynQrCodeApp.services"])
            .controller("MicroShopManagementSynQrCodeAppController", [
                "$scope", "$rootScope", "$window", "promptBarService", "commonNetService","MicroShopManagementSynQrCodeAppService",
                function ($scope, $rootScope, $window, promptBarService, commonNetService, MicroShopManagementSynQrCodeAppService) {
                    
                    $scope.choiceType = function () {
                        switch (parseInt($scope.type)) {
                            case 1:
                                $rootScope.$state.current.title = "二维码授权";
                                $scope.qrCode = window.microShopSynQrCodeUrl;
                                break;
                            case 2:
                                $rootScope.$state.current.title = "口碑二维码";
                                MicroShopManagementSynQrCodeAppService.getAccreditQrCode().then(function (result) {
                                    if (result.data.Status) {
                                        $scope.qrCode = result.data.Data;
                                    } else {
                                        promptBarService.showErrorBar(result.data.message, 3000);
                                    }
                                });
                                break;
                        }
                    }

                    function init() {
                        $scope.type = $scope.$stateParams.type;

                        $scope.choiceType();
                        //关闭loading动画
                        $scope.hideLoading();
                    }

                    
                    init();


                }
            ]);
    });