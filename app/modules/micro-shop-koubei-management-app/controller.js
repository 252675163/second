"use strict";
/**
 * author :
 * time:
 * description:
 */

define(["ionic", "modules/micro-shop-koubei-management-app/services"],
    function() {
        return angular.module("MicroShopKoubeiManagementApp.controllers", ["MicroShopKoubeiManagementApp.services", "TextInputCallback"])
            .controller("MicroShopKoubeiManagementAppController", [
                "$scope", "$rootScope", "$window", "promptBarService", "MicroShopKoubeiManagementAppService", "$ionicPopup", "$timeout",
                function($scope, $rootScope, $window, promptBarService, MicroShopKoubeiManagementAppService, $ionicPopup, $timeout) {
                    $scope.userNoticeShow = false; //显示用户须知
                    $scope.getIndexRouter = function(url) {
                            return window.server + "/home/index#/" + url;
                        }
                        //控制同步遮罩样式
                    $scope.syncPop = {
                            locaMaskShow: false,
                            syncSucce: false,
                            syncLoad: false,
                            syncAlert: false,
                            text: ""
                        }
                        //统一增加后台页面的Loading效果
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
                        // $scope.qc = window.resourceDoMain + "/app/img/default_qrcode.jpg"
                        //TODO 同步
                    $scope.sync = function() {
                        MicroShopKoubeiManagementAppService.syncKouBeiProduct().then(function(result) {
                            if (result.data.status == 1) {
                                $scope.syncPop = {
                                    locaMaskShow: true,
                                    syncAlert: false,
                                    syncSucce: true,
                                }
                                $timeout(function() {
                                    $scope.syncPop = {
                                        locaMaskShow: false,
                                        syncAlert: false,
                                        syncSucce: false,
                                    }
                                }, 2000)
                            } else {
                                $scope.syncPop = {
                                    locaMaskShow: true,
                                    syncAlert: true,
                                    syncSucce: false,
                                    text: data.message,
                                }

                            }
                        });
                        $scope.syncPop = {
                                locaMaskShow: true,
                                syncLoad: true
                            }
                            // $timeout(
                            //     function() {
                            //         // $scope.syncPop = {
                            //         //     syncAlert: true,
                            //         //     text: "您的校宝微店无可同步内容",
                            //         //     locaMaskShow: true
                            //         //         // text:"同步超时",
                            //         // };
                            //         $scope.syncPop = {
                            //             locaMaskShow: true,
                            //             syncAlert: true,
                            //             syncSucce: false,
                            //             text: "同步超时",
                            //         }
                            //         $timeout(function() {
                            //             // $scope.syncPop = {
                            //             //     locaMaskShow: false,
                            //             //     syncAlert: false,
                            //             //     text: ""
                            //             // };

                        //         }, 8000);
                        //     }, 2000
                        // )



                        // $scope.syncPop.syncShow = true;

                    }

                    //关闭同步弹窗
                    $scope.closeSyncPop = function() {
                        $scope.syncPop = {
                            locaMaskShow: false,
                            syncSucce: false,
                            syncLoad: false,
                            syncAlert: false,
                            text: ""
                        }
                    }

                    //显示用户须知弹窗
                    $scope.showUserNotice = function() {
                            $scope.userNoticeShow = true;
                        }
                        //关闭用户须知弹窗
                    $scope.hideUserNotice = function() {
                        $scope.userNoticeShow = false;
                    }

                    $scope.data = MicroShopKoubeiManagementAppService.data;
                    //tab切换
                    $scope.changeTab = function(index) {
                        $scope.data.tabIndex = index;
                        if (index == 1) {
                            $scope.$state.go("microshopkoubei.management.product");
                        } else if (index == 2) {
                            $scope.$state.go("microshopkoubei.management.order");
                        }
                    }

                    function init() {

                    }
                    init();
                }
            ]);
    });