"use strict";
/**
 * description:校宝秀 报名消息提醒
 */


define(["ionic", "modules/user-signupremind-setting-app/services", "services/net/common"],
    function() {
        return angular.module("UserSignUpRemindSettingApp.controllers", ["UserSignUpRemindSettingApp.services", "services.net.common"])
            .controller("userSignUpRemindSettingAppController", [
                "$scope", "$rootScope", "userSignUpRemindSettingAppService", "$state", "$ionicPopup","commonNetService", "$timeout", "singleThreadedNetService","promptBarService",
                function ($scope, $rootScope, userSignUpRemindSettingAppService, $state,$ionicPopup, commonNetService, $timeout, singleThreadedNetService, promptBarService) {

                    

                    function init() {
                        commonNetService.addBackgroundOperationLog("MsgRemindSet");
                        //获取开关状态
                        userSignUpRemindSettingAppService.getUserSignUpRemind().then(function (res) {

                            if (res.data.status == 1) {
                                $scope.isShowRemind = res.data.data.isNotReceiveMsg;
                                $scope.isNotInstructionsMsg = res.data.data.isNotInstructionsMsg;
                            }
                            else {
                                //错误提示
                                promptBarService.showErrorBar(res.data.message, 3000);
                            }

                        
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

                        }, null);

                    }

                    init();

                    //保存学员报名状态
                    $scope.remindFinish = singleThreadedNetService(function () {
                        userSignUpRemindSettingAppService.setUserSignUpRemind($scope.isShowRemind, 1);
                    });
                    //保存软件更新状态
                    $scope.InstructionsFinish = singleThreadedNetService(function () {
                        userSignUpRemindSettingAppService.setUserSignUpRemind($scope.isNotInstructionsMsg, 2);
                    });
                    //关闭学员报名提醒
                    $scope.changeShowRemid = function () {
                        if ($scope.isShowRemind == true) {
                            $scope.isShowRemind = !$scope.isShowRemind;
                            var confirmPopup = $ionicPopup.confirm({
                                template: "<span style='line-height: 1.5;'><p class='confirm_title'>关闭学员咨询提醒</p><p class='confirm_content'>关闭后，您将无法再收到日报、周报和实时提醒哦，确认关闭吗？</p></span>",
                                cancelText: "取消",
                                okText: "关闭提醒"
                            });
                            confirmPopup.then(function (res) {
                                if (res) {
                                    $scope.isShowRemind = true;
                                    $scope.remindFinish();
                                } else {
                                    $scope.isShowRemind = false;
                                }   
                            });
                        }
                        else {
                            $scope.remindFinish();
                        }
                        
                    };
                    //关闭软件更新提醒
                    $scope.changeNotInstructionsMsg = function () {
                        if ($scope.isNotInstructionsMsg == true) {
                        $scope.isNotInstructionsMsg = !$scope.isNotInstructionsMsg;
                            var confirmPopup = $ionicPopup.confirm({
                                template: "<span style='line-height: 1.5;'><p class='confirm_title'>关闭软件更新提醒</p><p class='confirm_content'>关闭后，您将无法再收到软件更新提醒哦，确认关闭吗？</p></span>",
                                cancelText: "取消",
                                okText: "关闭提醒"
                            });
                            confirmPopup.then(function (res) {
                                if (res) {
                                    $scope.isNotInstructionsMsg = true;
                                    $scope.InstructionsFinish();
                                } else {
                                    $scope.isNotInstructionsMsg = false;
                                }
                            });
                        }
                        else {
                            $scope.InstructionsFinish();
                        }
                    };
                    
                }
            ]);
    });