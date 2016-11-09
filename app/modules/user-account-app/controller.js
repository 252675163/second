"use strict";
/**
 * author :zhouhuijuan
 * time:2016.8.2
 * description:用户机构设置和数据迁移页
 */

define(["ionic", "modules/user-account-app/services", "services/net/common"],
    function () {
        return angular.module("UserAccountApp.controllers", ["UserAccountApp.services", "services.net.common"])
            .controller("userAccountAppController", [
                "$scope", "$rootScope", "promptBarService", "userAccountAppService", "$ionicPopup", "$timeout", "maskService", "commonNetService", "$interval",
                function ($scope, $rootScope, promptBarService, userAccountAppService, $ionicPopup, $timeout, maskService, commonNetService, $interval) {
                    $scope.schoolPalInfo = {
                        web: "",
                        account: "",
                        password: "",
                    };

                    //迁移状态请求次数
                    var getStateTimes = 0;

                    //绑定校宝账号
                    $scope.bindSchoolPal = function () {
                        if ($scope.isBind) {
                            return;
                        }
                        // 字段校验
                        if (!userAccountAppService.verify($scope.schoolPalInfo.web, $scope.schoolPalInfo.account, $scope.schoolPalInfo.password)) {
                            return;
                        }
                        $scope.isBind = true;
                        userAccountAppService.bindSchoolPal($scope.schoolPalInfo.web, $scope.schoolPalInfo.account, $scope.schoolPalInfo.password).then(function (result) {
                            if (result.data.status == 1) {

                                //绑定完成后获取机构列表
                                userAccountAppService.getAccountList().then(function (result) {
                                    if (result.data.status == 1) {
                                        $scope.accountList = result.data.data;

                                        $scope.bindScoolPalBox = false;
                                        maskService.showMask(["绑定成功！"], 3000, false, 5).then(function () {

                                            $scope.isBind = false;
                                            $scope.schoolPalInfo.web = '';
                                            $scope.schoolPalInfo.account = '';
                                            $scope.schoolPalInfo.password = '';
                                        });
                                    } else {
                                        promptBarService.showErrorBar(result.data.message, 3000);
                                    }
                                });

                            } else {
                                $scope.isBind = false;
                                promptBarService.showErrorBar(result.data.message, 3000);
                            }
                        });
                    };

                    //解绑
                    $scope.removeSchoolPalLink = function (SchoolPalOrgId, SchoolPalOrgUserId) {
                        var confirmPopup = $ionicPopup.confirm({
                            template: "<span style='line-height: 1.5;'><p class='confirm_content'>是否确认解除绑定该机构帐号？</p></span>",
                            cancelText: "取消",
                            okText: "确认"
                        });
                        confirmPopup.then(function (res) {
                            if (res) {
                                userAccountAppService.removeSchoolPalLink(SchoolPalOrgId, SchoolPalOrgUserId).then(function (result) {
                                    if (result.data.status == 1) {

                                        userAccountAppService.getAccountList().then(function (result) {
                                            if (result.data.status == 1) {
                                                $scope.accountList = result.data.data;
                                                promptBarService.showSuccessBar("解绑成功", 3000);

                                            } else {
                                                promptBarService.showErrorBar(result.data.message, 3000);
                                            }
                                        });

                                    } else {
                                        promptBarService.showErrorBar(result.data.message, 3000);
                                    }
                                });
                            }
                        });
                        //解绑机构百度统计
                        if (window._hmt) {
                            window._hmt.push(['_trackPageview', "/orgaccount/delete"]);
                        }
                    };
                    //展示机构迁移选择页面
                    $scope.goTransferList = function () {
                        userAccountAppService.orgHasData($scope.personal.SchoolPalOrgUserId, $scope.personal.SchoolPalOrgId).then(function (result) {
                            if (result.data.status == 1) {
                                //判断是否无数据
                                if (result.data.data)
                                    $scope.TransferData = true;
                                else
                                    promptBarService.showErrorBar("当前机构帐号无数据，无需迁移。", 3000);
                            }
                            else {
                                promptBarService.showErrorBar(result.data.message, 3000);
                            }
                        });

                    };
                    //数据迁移
                    $scope.transferData = function (PeSchoolPalOrgUserId, SchoolPalOrgUserId) {

                        $scope.showTransferingMask = true;
                        userAccountAppService.transferData(PeSchoolPalOrgUserId, SchoolPalOrgUserId).then(function (result) {

                            if (result.data.status == 1) {

                                getStateTimes = 0;

                                $scope.getResult2 = $interval(function () {

                                    getStateTimes++;

                                    //迁移状态请求三次后 提示迁移失败
                                    if (getStateTimes > 3) {
                                        $interval.cancel($scope.getResult2);

                                        var confirmPopup = $ionicPopup.alert({
                                            template: "<span style='line-height: 1.5;'><p class='confirm_content'>非常抱歉，数据迁移繁忙，请稍后重试。</p></span>",
                                            okText: "确认"
                                        });
                                        confirmPopup.then(function (res) {
                                            if (res) {
                                                $scope.showTransferingMask = false;
                                            }
                                        });

                                        return;
                                    }
                                    else {

                                        //30s后获取迁移状态
                                        userAccountAppService.getMigrateState().then(function (result) {
                                            if (result.data.status == 1) {
                                                $scope.transferDataStatus2 = angular.copy(result.data.data);

                                                //迁移完成
                                                if ($scope.transferDataStatus2 && ($scope.transferDataStatus2.DataMigrateState == 2 || $scope.transferDataStatus2.DataMigrateState == 5)) {

                                                    $interval.cancel($scope.getResult2);

                                                    if ($scope.transferDataStatus2.IsSuccess) {
                                                        //获得数据迁移结果，成功，关闭数据迁移中遮罩，显示迁移成功遮罩
                                                        $scope.showTransferingMask = false;
                                                        $scope.showTransferSuccessMask = true;
                                                        $timeout(function () {
                                                            $scope.showTransferSuccessMask = false;
                                                        }, 3000);
                                                    }
                                                    else {
                                                        //数据迁移失败
                                                        var confirmPopup = $ionicPopup.confirm({
                                                            template: "<span style='line-height: 1.5;'><p class='confirm_content'>非常抱歉，数据迁移失败。是否重试？</p></span>",
                                                            cancelText: "取消",
                                                            okText: "确认"
                                                        });
                                                        confirmPopup.then(function (res) {
                                                            if (res) {
                                                                $scope.transferData(PeSchoolPalOrgUserId, SchoolPalOrgUserId);
                                                            } else {
                                                                $scope.showTransferingMask = false;
                                                            }
                                                        });
                                                    }
                                                    return;
                                                }
                                                    //迁移无法完成 提示终止迁移
                                                else if ($scope.transferDataStatus2 && $scope.transferDataStatus2.DataMigrateState == 3) {

                                                    $interval.cancel($scope.getResult2);

                                                    var confirmPopup = $ionicPopup.alert({
                                                        template: "<span style='line-height: 1.5;'><p class='confirm_content'>非常抱歉，数据迁移失败。</p></span>",
                                                        okText: "确认"
                                                    });
                                                    confirmPopup.then(function (res) {
                                                        if (res) {
                                                            $scope.showTransferingMask = false;
                                                        }
                                                    });
                                                }
                                                    //机构账号权限异常  无法进行数据迁移
                                                else if ($scope.transferDataStatus2 && $scope.transferDataStatus2.DataMigrateState == 4) {

                                                    $interval.cancel($scope.getResult2);
                                                    var confirmPopup = $ionicPopup.alert({
                                                        template: "<span style='line-height: 1.5;'><p class='confirm_content'>非常抱歉，该机构账号无法进行数据迁移。</p></span>",
                                                        okText: "确认"
                                                    });
                                                    confirmPopup.then(function (res) {
                                                        if (res) {
                                                            $scope.showTransferingMask = false;
                                                        }
                                                    });
                                                }
                                            }
                                            else {
                                                promptBarService.showErrorBar(result.data.message, 3000);
                                                $interval.cancel($scope.getResult2);
                                                $scope.showTransferingMask = false;
                                                return;
                                            }

                                        });
                                    }

                                }, 30000);

                            }
                            else {
                                $scope.showTransferingMask = false;
                                promptBarService.showErrorBar(result.data.message, 3000);
                            }

                        });
                        //数据迁移百度统计
                        if (window._hmt) {
                            window._hmt.push(['_trackPageview', "/orgaccount/transfer"]);
                        }
                    }
                    //点击选择数据迁移的机构
                    $scope.chooseTransferAccount = function (item) {
                        var confirmPopup = $ionicPopup.confirm({
                            template: "<span style='line-height: 1.5;'><p class='confirm_content'>确认将当前机构的全部场景和咨询迁移到此机构中去吗？该操作不可撤销！</p></span>",
                            cancelText: "取消",
                            okText: "确认"
                        });
                        confirmPopup.then(function (res) {
                            if (res) {

                                //判断当前机构是否可用
                                userAccountAppService.getOrgUserState(item.SchoolPalOrgUserId).then(function (result) {
                                    if (result.data.status == 1 && result.data.data) {

                                        //先切换选中的
                                        userAccountAppService.switchAccount(item.SchoolPalOrgId, item.SchoolPalOrgUserId).then(function (result) {
                                            if (result.data.status == 1) {

                                                //显示切换后的数据列表
                                                userAccountAppService.getAccountList().then(function (result) {
                                                    if (result.data.status == 1) {
                                                        $scope.accountList = result.data.data;
                                                        $scope.TransferData = false;
                                                        $scope.transferData($scope.personal.SchoolPalOrgUserId, item.SchoolPalOrgUserId);
                                                    } else {
                                                        promptBarService.showErrorBar(result.data.message, 3000);
                                                    }
                                                });
                                            } else {
                                                promptBarService.showErrorBar(result.data.message, 3000);
                                            }
                                        });

                                    }
                                    else {
                                        //机构不可用 更新列表隐藏该机构
                                        userAccountAppService.getAccountList().then(function (res1) {
                                            if (res1.data.status == 1) {
                                                $scope.accountList = res1.data.data;

                                                //判断可迁移列表是否为空 为空则提示后重新跳转
                                                var reLoading = true;
                                                for (var i = 0; i < $scope.accountList.length; i++) {
                                                    if ($scope.accountList[i].Crmver != "个人版" && $scope.accountList[i].Enable && !$scope.isUnusualOrg($scope.accountList[i])) {
                                                        reLoading = false;
                                                        break;
                                                    }
                                                }
                                                if (reLoading) {

                                                    var confirmPopup = $ionicPopup.alert({
                                                        template: "<span style='line-height: 1.5;'><p class='confirm_content'>非常抱歉，该机构账号无法进行数据迁移。</p></span>",
                                                        okText: "确认"
                                                    });
                                                    confirmPopup.then(function (res) {
                                                        if (res) {
                                                            $scope.TransferData = false;
                                                        }
                                                    });
                                                }
                                                else {
                                                    promptBarService.showErrorBar("非常抱歉，该机构账号无法进行数据迁移。", 3000);
                                                }

                                            } else {
                                                promptBarService.showErrorBar(res1.data.message, 3000);
                                            }
                                        });
                                    }
                                });
                            }
                        });
                    }
                    //切换绑定
                    $scope.changeAcount = function (item) {
                        if (item.Enable) {
                            var confirmPopup = $ionicPopup.confirm({
                                template: "<span style='line-height: 1.5;'><p class='confirm_content'>确认切换默认机构账号吗？</p></span>",
                                cancelText: "取消",
                                okText: "确认"
                            });
                            confirmPopup.then(function (res) {
                                if (res) {

                                    //当前切换机构不是异常机构
                                    if (!$scope.isUnusualOrg(item)) {
                                        userAccountAppService.switchAccount(item.SchoolPalOrgId, item.SchoolPalOrgUserId).then(function (result) {
                                            if (result.data.status == 1) {

                                                //切换机构统计
                                                commonNetService.addBackgroundOperationLog("ResetOrg");

                                                //显示切换后的数据列表
                                                userAccountAppService.getAccountList().then(function (result) {
                                                    if (result.data.status == 1) {
                                                        $scope.accountList = result.data.data;
                                                    } else {
                                                        promptBarService.showErrorBar(result.data.message, 3000);
                                                    }
                                                });
                                            } else {
                                                promptBarService.showErrorBar(result.data.message, 3000);
                                            }
                                        });
                                    }
                                    else {
                                        var confirmPopup = $ionicPopup.alert({
                                            template: "<span style='line-height: 1.5;'><p class='confirm_content'>该机构帐号暂时无法使用校宝秀功能，请尝试关联其他机构帐号。</p></span>",
                                            okText: "确认"
                                        });
                                    }

                                }
                            });
                            //切换绑定百度统计
                            if (window._hmt) {
                                window._hmt.push(['_trackPageview', "/orgaccount/update"]);
                            }
                        }
                    }
                    $scope.goBindSchoolPal = function () {
                        //新增绑定机构百度统计
                        if (window._hmt) {
                            window._hmt.push(['_trackPageview', "/orgaccount/insert"]);
                        }
                        $scope.bindScoolPalBox = true;
                    };

                    $scope.closeBindScoolPalBox = function () {
                        $scope.bindScoolPalBox = false;
                    }

                    //数据迁移解疑
                    $scope.showReminder = function () {
                        var alertPopup = $ionicPopup.alert({
                            template: '<div class="text-center"><i class="show-reminder-img"></i></div>',
                            okText: '关闭'
                        });
                    }

                    function init() {

                        commonNetService.addBackgroundOperationLog("UserIndex");

                        if ($scope.$state.params.type == 1) {
                            //账号异常弹窗提示
                            var confirmPopup = $ionicPopup.alert({
                                template: "<span style='line-height: 1.5;'><p class='confirm_title'>机构账号异常</p><p class='confirm_content'>检测到默认关联的机构账号异常，请重新设置。</p></span>",
                                okText: "确认"
                            });
                        }
                        if ($scope.$state.params.type == 2) {
                            var confirmPopup = $ionicPopup.alert({
                                template: "<span style='line-height: 1.5;'><p class='confirm_title'>机构账号异常</p><p class='confirm_content'>该机构帐号暂时无法使用校宝秀功能，请尝试关联其他机构帐号。</p></span>",
                                okText: "确认"
                            });
                        }



                        //当前机构是否是异常机构
                        $scope.isUnusualOrg = function (item) {
                            if ( item.LevelName == "教师" || item.LevelName == "教务" || item.LevelName == "人事" || item.LevelName == "财务")
                                return true;
                            else
                                return false;
                        }

                        $scope.TransferData = false;
                        userAccountAppService.getAccountList().then(function (result) {
                            if (result.data.status == 1) {
                                $scope.accountList = result.data.data;

                                if ($scope.accountList && $scope.accountList.length > 0) {
                                    if ($scope.accountList[0].Crmver == "个人版") {
                                        $scope.personal = angular.copy($scope.accountList[0]);
                                    }

                                    if ($scope.accountList.length > 1) {
                                        if ($scope.accountList[1].Crmver == "个人版") {
                                            $scope.personal = angular.copy($scope.accountList[1]);
                                        }
                                    }
                                }


                                //获得迁移结果请求
                                userAccountAppService.getMigrateState().then(function (result) {
                                    if (result.data.status == 1) {
                                        $scope.transferDataStatus = angular.copy(result.data.data);

                                        //DataMigrateState 0 未迁移   1 迁移中  2 迁移完成（包含成功失败） 3 迁移数据有问题，无法进行迁移  4 机构账号权限异常  无法进行数据迁移 5 日志问题迁移失败(和2迁移完成同样操作，提供再次迁移按钮)
                                        //迁移状态为迁移结束
                                        if ($scope.transferDataStatus && ($scope.transferDataStatus.DataMigrateState == 2 || $scope.transferDataStatus.DataMigrateState == 5)) {

                                            if ($scope.transferDataStatus.IsSuccess) {
                                                //获得数据迁移结果，成功，显示迁移成功遮罩
                                                $scope.showTransferSuccessMask = true;

                                                $timeout(function () {
                                                    $scope.showTransferSuccessMask = false;
                                                }, 3000);
                                            }
                                            else {
                                                //数据迁移失败
                                                var confirmPopup = $ionicPopup.confirm({
                                                    template: "<span style='line-height: 1.5;'><p class='confirm_content'>非常抱歉，数据迁移失败。是否重试？</p></span>",
                                                    cancelText: "取消",
                                                    okText: "确认"
                                                });
                                                confirmPopup.then(function (res) {
                                                    if (res) {
                                                        $scope.transferData($scope.transferDataStatus.sponsorOrgUserId, $scope.transferDataStatus.receiverOrgUserId);
                                                    }
                                                });
                                            }
                                            return;
                                        }
                                            //迁移中
                                        else if ($scope.transferDataStatus && $scope.transferDataStatus.DataMigrateState == 1) {
                                            //显示迁移中遮罩
                                            $scope.showTransferingMask = true;

                                            //设置30秒重新请求
                                            $scope.getResult = $interval(function () {

                                                getStateTimes++;
                                                //迁移状态请求三次后 提示迁移失败
                                                if (getStateTimes > 3) {
                                                    $interval.cancel($scope.getResult);

                                                    var confirmPopup = $ionicPopup.alert({
                                                        template:
                                                            "<span style='line-height: 1.5;'><p class='confirm_content'>非常抱歉，数据迁移繁忙，请稍后重试。</p></span>",
                                                        okText: "确认"
                                                    });
                                                    confirmPopup.then(function (res) {
                                                        if (res) {
                                                            $scope.showTransferingMask = false;
                                                        }
                                                    });

                                                    return;
                                                }
                                                else {

                                                    //获得迁移结果请求
                                                    userAccountAppService.getMigrateState().then(function (result) {
                                                        if (result.data.status == 1) {
                                                            $scope.transferDataStatus1 = angular.copy(result.data.data);

                                                            //再次请求 迁移状态为完成
                                                            if ($scope.transferDataStatus1 && ($scope.transferDataStatus1.DataMigrateState == 2 || $scope.transferDataStatus1.DataMigrateState == 5)) {

                                                                $interval.cancel($scope.getResult);

                                                                if ($scope.transferDataStatus.IsSuccess) {
                                                                    //获得数据迁移结果，成功，关闭数据迁移中遮罩，显示迁移成功遮罩
                                                                    $scope.showTransferingMask = false;
                                                                    $scope.showTransferSuccessMask = true;
                                                                    $timeout(function () {
                                                                        $scope.showTransferSuccessMask = false;
                                                                    }, 3000);
                                                                }
                                                                else {
                                                                    //数据迁移失败
                                                                    var confirmPopup = $ionicPopup.confirm({
                                                                        template: "<span style='line-height: 1.5;'><p class='confirm_content'>非常抱歉，数据迁移失败。是否重试？</p></span>",
                                                                        cancelText: "取消",
                                                                        okText: "确认"
                                                                    });
                                                                    confirmPopup.then(function (res) {
                                                                        if (res) {
                                                                            $scope.transferData($scope.transferDataStatus1.sponsorOrgUserId, $scope.transferDataStatus1.receiverOrgUserId);
                                                                        } else {
                                                                            $scope.showTransferingMask = false;
                                                                        }
                                                                    });
                                                                }
                                                                return;
                                                            }

                                                        }
                                                        else {
                                                            promptBarService.showErrorBar(result.data.message, 3000);
                                                            $interval.cancel($scope.getResult);
                                                            $scope.showTransferingMask = false;
                                                            return;
                                                        }
                                                    });

                                                }

                                            }, 30000);

                                        }
                                            //迁移无法完成 提示终止迁移
                                        else if ($scope.transferDataStatus && $scope.transferDataStatus.DataMigrateState == 3) {

                                            var confirmPopup = $ionicPopup.alert({
                                                template: "<span style='line-height: 1.5;'><p class='confirm_content'>非常抱歉，数据迁移失败。</p></span>",
                                                okText: "确认"
                                            });
                                            confirmPopup.then(function (res) {
                                                if (res) {
                                                    $scope.showTransferingMask = false;
                                                }
                                            });
                                        }
                                            //机构账号权限异常  无法进行数据迁移
                                        else if ($scope.transferDataStatus && $scope.transferDataStatus.DataMigrateState == 4) {

                                            var confirmPopup = $ionicPopup.alert({
                                                template: "<span style='line-height: 1.5;'><p class='confirm_content'>非常抱歉，该机构账号无法进行数据迁移。</p></span>",
                                                okText: "确认"
                                            });
                                            confirmPopup.then(function (res) {
                                                if (res) {
                                                    $scope.showTransferingMask = false;
                                                }
                                            });
                                        }
                                    }
                                    else {
                                        promptBarService.showErrorBar(result.data.message, 3000);
                                    }
                                });


                            } else {
                                promptBarService.showErrorBar(result.data.message, 3000);
                            }

                            //判断机构可用的是否大于1  "教师","教务","人事","财务"当做禁用处理
                            $scope.checkNormalOrgNum = function (accountList) {
                                var j = 0;
                                if (accountList) {
                                    for (var i = 0; i < accountList.length; i++) {
                                        if (accountList[i].Enable && !$scope.isUnusualOrg(accountList[i])) {
                                            j++;
                                            if (j >= 2) {
                                                return true;
                                            }
                                        }
                                    }
                                }
                                return false;
                            }


                            //统一增加后台页面的Loading效果 by xp 2015年11月13日 16:09:13
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
                        });

                    }

                    init();


                    //页面离开时销毁计时器
                    var stateChangeStart = $rootScope.$on("$stateChangeStart",
                        function (event, toState, toParams, fromState, fromParams) {
                            if ($scope.getResult) {
                                $interval.cancel($scope.getResult);
                            }
                            if ($scope.getResult2) {
                                $interval.cancel($scope.getResult2);
                            }
                        });
                    $scope.$on("$destroy", function () {
                        stateChangeStart();
                    });


                }
            ])
        .filter('Maxlength', [function (input, max) {

            return function (input, max) {
                if (!input) {
                    return;
                }
                if (input.length <= max) {
                    return input;
                }
                else {
                    return input.slice(0, max) + "...";
                }

            };
        }]);
    });