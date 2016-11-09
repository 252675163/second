"use strict";
/**
 * author :
 * time:
 * description:微店开通权限页
 */

define(["ionic", "modules/micro-shop-management-apply-app/services"],
    function () {
        return angular.module("MicroShopManagementApplyApp.controllers", ["MicroShopManagementApplyApp.services"])
            .controller("MicroShopManagementApplyAppController", [
                "$scope", "$rootScope", "$window", "promptBarService", "commonNetService", "MicroShopManagementApplyAppService", "$ionicPopup", "$timeout", "singleThreadedNetService",
                function ($scope, $rootScope, $window, promptBarService, commonNetService, MicroShopManagementApplyAppService, $ionicPopup, $timeout, singleThreadedNetService) {
                    $scope.hasAply = false;
                    $scope.apply = {
                        name: "",
                        mechanism: "",
                        position: "",
                        phone: ""
                    };
                    // TODO 提交开通微店的申请
                    $scope.submitAply = singleThreadedNetService(function () {

                        if (!$scope.apply.name || !$scope.apply.mechanism || !$scope.apply.position || !$scope.apply.phone) {
                            promptBarService.showErrorBar("请填写完整信息!", 3000);
                            return;
                        } else if (!$scope.apply.name.trim()) {
                            promptBarService.showErrorBar("请输入正确的姓名!", 3000);
                            return;
                        } else if (!$scope.apply.mechanism.trim()) {
                            promptBarService.showErrorBar("请输入正确的机构名称！", 3000);
                            return;
                        } else if (!$scope.apply.position.trim()) {
                            promptBarService.showErrorBar("请输入正确的职位名称！", 3000);
                            return;
                        } else if (!(/^1[3|4|5|7|8]\d{9}$/.test($scope.apply.phone))) {
                            promptBarService.showErrorBar("请输入正确的手机号码！", 3000);
                            return;
                        } else {
                            return MicroShopManagementApplyAppService.saveMicroShopApply($scope.apply.name, $scope.apply.mechanism, $scope.apply.phone, $scope.apply.position).then(function (result) {
                                if (result.data.status == 1 && result.data.data) {
                                    $scope.hasAply = true;
                                } else {
                                    promptBarService.showErrorBar(result.data.message, 3000);
                                }
                            });
                        }
                    });

                    function init() {
                        MicroShopManagementApplyAppService.getOrgNamePostion().then(function (result) {
                            if (result.data.status == 1 && result.data.data) {
                                $scope.apply.position = "";
                                $scope.apply.mechanism = result.data.data.OrgName;
                            } else {
                                promptBarService.showErrorBar(result.data.message, 3000);
                            }
                            //关闭loading动画
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
                        });
                    }

                    init();


                }
            ]);
    });