"use strict";
/**
 * author :
 * time: 
 * description:
 */


define(["ionic", "modules/micro-registrationbook-app/services"],
    function() {
        return angular.module("MicroRegistrationBookApp.controllers", ["MicroRegistrationBookApp.services", "TextInputCallback"])
            .controller("MicroRegistrationBookAppController", [
                "$scope", "$filter", "$rootScope", "$q", "MicroRegistrationBookAppService", "promptBarService", "commonNetService", "$timeout", "textInputCallbackService", "$ionicScrollDelegate", "permissionService", "maskService", "erpUserInfo",
                function($scope, $filter, $rootScope, $q, MicroRegistrationBookAppService, promptBarService, commonNetService, $timeout, textInputCallbackService, $ionicScrollDelegate, permissionService, maskService, erpUserInfo) {
                    $scope.currentUserLocation = {
                        Id: 0,
                        DistrictName: "",
                        FullName: "",
                        Country: "",
                        Province: "",
                        City: "",
                        Canton: "",
                        PinYin: "",
                        PinYinForShort: "",
                        Location: "",
                    };
                    $scope.erpUserInfo = {
                        "UserId": 0,
                        "OrgId": 0,
                        "OrgName": "",
                        "OrgState": null,
                        "UserName": "",
                        "Level": null,
                        "Enable": true,
                        "Crmver": "",
                        "SchoolName": ""
                    };
                    //筛选条件
                    $scope.filterCondition = {
                            statusList: [],
                            typeList: [],
                            sceneIdList: [],
                            interests: [],
                            salesMan: [],
                            searchTags: [],
                            searchCollect: '',
                            orderBy: 'Desc',
                            orderByField: 'EditDate',
                            isSaved : false //保存过筛选条件则标记为true（由于从单个场景进来，带上场景参数，此时进入某场景点击物理返回，url中依旧带着场景参数，需要判断templateIdList用的是url参数，还是用$scope.filterCondition中保存的）
                    }
                    
                        //判断是否微信浏览器打开
                    function isWeiXin() {
                        var ua = window.navigator.userAgent.toLowerCase();
                        if (!angular.equals(ua, null) && !angular.isUndefined(ua) && ua.match(/MicroMessenger/i) == 'micromessenger') {
                            return true;
                        } else {
                            return false;
                        }
                    }
                    //更新第一次遮罩提示显示状态
                    $scope.closeFirstRemind = function () {
                        MicroRegistrationBookAppService.updateUserConfig("IsShowRegBookGuide", "false").then(function (result) {
                            if (result.data.status == 1) {
                            }
                            else {
                                promptBarService.showErrorBar(result.data.message, 3000);
                            }
                        }, null);
                    }
                    function init() {
                        $scope.isSchoolpalUser = (window.isSchoolpalUser == "true") ? true : false;
                        //咨询本内底部tab显示条件
                        $scope.showFooterTab = (isWeiXin() && !$scope.isSchoolpalUser) || window.dev;
                        $scope.erpUserInfo = erpUserInfo;
                        MicroRegistrationBookAppService.isShowNotice("IsShowRegBookGuide").then(function(res1) {
                            if (res1.data.status == 1) {
                                var isFirstVisiteBook = res1.data.data.ConfigValue;
                                //判断是否有地址信息  无则判断是否是第一次进入  是则获取位置 否则跳过 本地标签
                                //$scope.currentUserLocation得到当前用户的地理信息
                                commonNetService.getDistrictByUserId().then(function(result) {
                                    if (result.data.status == 1) {
                                        if (result.data.data && result.data.data.Id > 0) {
                                            $scope.currentUserLocation = result.data.data;
                                            return
                                        } else {
                                            if (isFirstVisiteBook != "false") {
                                                //首次进入时获取当前位置 并保存
                                                commonNetService.getWxLocation() //微信接口 定位获取经纬度 
                                                    .then(commonNetService.transWxtoBaidu) //误差坐标转换
                                                    .then(commonNetService.getGeoToAddress) //坐标转为地址 返回地址格式
                                                    .then(function(res) {
                                                        if (res.Id != "0") {
                                                            commonNetService.updateDistrictByUserId(res.Id)
                                                                .success(function(res2) {
                                                                    if (res2.status == 1) {
                                                                        //console.log(res);
                                                                        $timeout(function() {
                                                                            $scope.$apply(
                                                                                function() {
                                                                                    $scope.currentUserLocation.Id = res.data.Id;
                                                                                }
                                                                            )
                                                                        }, 0);
                                                                    }
                                                                })
                                                        }
                                                    })
                                                    .catch(function(error) {
                                                        //promptBarService.showErrorBar("位置获取失败", 3000);
                                                    });
                                            }
                                        }
                                    } else {
                                        promptBarService.showErrorBar(result.data.message, 3000);
                                    }
                                });
                                if (isFirstVisiteBook != "false") {
                                    maskService.showMask("", 0, false, 32, $scope.closeFirstRemind);
                                }
                            } else {
                                promptBarService.showErrorBar(res1.data.message, 3000);
                            }
                        });
                    }

                    init();
                }
            ]);
    });