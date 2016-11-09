"use strict";
/**
 * author :
 * time:
 * description:
 */

define(["ionic", "modules/user-bind-schoolpal-app/services"],
    function() {
        return angular.module("UserBindSchoolPalApp.controllers", ["UserBindSchoolPalApp.services"])
            .controller("userBindSchoolPalAppController", [
                "$scope", "$rootScope", "$timeout", "promptBarService", "userBindSchoolPalAppService","maskService",
                function($scope, $rootScope, $timeout, promptBarService, userBindSchoolPalAppService,maskService) {
                    $scope.isShowBindSuccessBox = false;
                    $scope.schoolPalInfo = {
                        web: "",
                        account: "",
                        password: ""
                    };
                    $scope.bindSchoolPal = function() {
                        if( $scope.isBind){
                            return ;
                        }
                        // 字段校验
                        if (!verify()) {
                            return;
                        }
                        $scope.isBind = true;
                        userBindSchoolPalAppService.bindSchoolPal($scope.schoolPalInfo.web, $scope.schoolPalInfo.account, $scope.schoolPalInfo.password).then(function(result) {
                            if (result.data.status == 1) {
                               // $scope.isShowBindSuccessBox = true;
                                //
                                maskService.showMask(["绑定成功！"],3000,false,5).then(function(){
                                    $scope.$state.go("userCenter", {}, { reload: true });
                                });
                                $scope.isBind = false;
                                //$timeout(function() {
                                //
                                //}, 3000);
                            } else {
                                $scope.isBind = false;
                                promptBarService.showErrorBar(result.data.message, 3000);
                            }
                        });
                    };

                    //$scope.schoolPalInfo.web, $scope.schoolPalInfo.account, $scope.schoolPalInfo.password
                    function verify() {
                        if (!$scope.schoolPalInfo.web) {
                            promptBarService.showErrorBar("请输入校宝网址后缀！", 3000);
                            return false;
                        } else if (!$scope.schoolPalInfo.account) {
                            promptBarService.showErrorBar("请输入校宝账号！", 3000);
                            return false;
                        } else if (!$scope.schoolPalInfo.password) {
                            promptBarService.showErrorBar("请输入校宝密码！", 3000);
                            return false;
                        }
                        return true;
                    }


                    function init() {
                        userBindSchoolPalAppService.getUserInfoByUserId().then(function(result) {
                            if (result.data.status == 1) {
                                $scope.userInfo = result.data.data;
                                //用户头像写死
                                $scope.userInfo.Photo = window.resourceDoMain+"/app/img/user_center_default_photo.png";
                            } else {
                                promptBarService.showErrorBar(result.data.message, 3000);
                            }

                            //统一增加后台页面的Loading效果 by xp 2015年11月13日 16:09:13
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

                        });
                    }

                    init();


                }
            ]);
    });