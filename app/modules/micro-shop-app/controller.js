"use strict";
/**
 * author :
 * time:
 * description:
 */

define(["ionic", "modules/micro-shop-app/services"],
    function() {
        return angular.module("MicroShopApp.controllers", ["MicroShopApp.services"])
            .controller("MicroShopAppController", [
                "$scope", "$rootScope", "$window", "promptBarService", "commonNetService", "MicroShopAppService", "$ionicPopup", "$timeout", "maskService", "microShopUser", "permissionService", "microShopModelById",
                function($scope, $rootScope, $window, promptBarService, commonNetService, MicroShopAppService, $ionicPopup, $timeout, maskService, microShopUser, permissionService, microShopModelById) {
                    //微店登录用户
                    $scope.microShopUser = microShopUser;
                    $scope.microShopState = microShopModelById;
                    $scope.isPreview = $scope.$stateParams.type == "preview";
                    $scope.getShareRouter = function() {
                        return window.microShopShareServerName + "/MicroShop"+Math.random().toString(36).substr(2)+"ShareRoute?uiRoute=";
                    }
                    //更新当前微店用户信息
                    ionic.on("updateMicroShopUser", function (event) {
                        $scope.microShopUser = event.detail;
                        event.stopPropagation();
                    });
                    //关闭loading动画
                    $scope.hideLoading = function () {
                        if (!$rootScope.isFirstLoad) {
                            $timeout(function () {
                                $(".lockMask-loading2").hide();
                                $rootScope.isFirstLoad = true;
                            }, 1833);
                        }
                        else {
                            $timeout(function () {
                                $(".lockMask-loading2").hide();
                                $rootScope.isFirstLoad = true;
                            }, 1000);
                        }
                    }
                    function init() {
                        if ($scope.microShopState.state == 1) {
                            window.location.href = "/Common/MicroShopError?errorMsg=shopFreeze";
                        }
                        //if (!$scope.isPreview) {
                        //    permissionService.getMicroShopUser().then(function(result) {
                        //        $scope.microShopUser = result;
                        //    });
                        //}
                    }

                    init();


                }
            ]);
    });