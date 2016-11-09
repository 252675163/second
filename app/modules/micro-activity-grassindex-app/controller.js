"use strict";
/**
 * author :小宝
 * time: 2015年9月11日
 * description: 种草活动
 */


define(["ionic", "modules/micro-activity-grassindex-app/services",/* "modules/microactivityapp/services", */"services/net/grass", "services/net/common"],
    function() {
        return angular.module("MicroActivityGrassIndexApp.controllers", ["MicroActivityGrassIndexApp.services", "MicroActivityApp.services", "services.net.grass", "services.net.common"])
            .controller("MicroActivityGrassIndexAppController", [
                "$scope", "$rootScope", "MicroActivityGrassIndexAppService", "$state", "$sce", "$timeout", "microActivityAppService", "grassNetService", "commonNetService", "$ionicLoading",
                function($scope, $rootScope, microActivityGrassIndexAppService, $state, $sce, $timeout, microActivityAppService, grassNetService, commonNetService, $ionicLoading) {
                    $scope.activityid = $scope.$stateParams.activityid; //是否是预览
                    //统一增加前台页面的Loading效果 by xp 2015年10月26日 20:22:57
                    $(".lockMask-loading2").show();
                    grassNetService.getActivityById($scope.activityid).success(function(data) {


                        if (data) {
                            if (data.Config == "" || data.Config == null) {
                                location.href = "/Common/error?mark=MicroActivityGrassIndexBAppController_data.Config_isNullOrEmply";
                                return;
                                //warning 查看页面没有Config结构，不在创建默认数据  2015年11月18日 14:27:25
                            } else {
                                $scope.title = JSON.parse(data.Config).title;
                                $scope.activityData = data;


                                commonNetService.saveForeLog({
                                    OriginId: $scope.activityid,
                                    Type: "Activity",
                                    Operation: "Visit"
                                }).success(function(result) {

                                });

                                if ($scope.title) {
                                    $scope.title = $scope.title.replace(/ /g, "&nbsp;").replace(/\n/g, "<br/>");
                                }
                                if (data.ShareConfig) {
                                    //将当前页面的title改成自定义之后的title
                                    var config = angular.fromJson(data.ShareConfig);
                                    $scope.$state.current.title = config.title;
                                    commonNetService.setShareMessageReception(config);
                                }

                                //统一增加后台页面的Loading效果 by xp 2015年11月13日 16:09:13
                                $timeout(function () {
                                    $(".lockMask-loading2").hide();
                                }, 1000);

                            }


                        }


                    });

                    //跳转新建咨询
                    $scope.goConsult = function() {
                        $scope.$on("$stateChangeStart", function(event) {
                            event.targetScope.activityData = $scope.activityData;
                        });
                        $state.go("activity.grassavatar", { ispreview: $scope.ispreview, stuid: $scope.stuid, isFromA: true, activityid: $scope.$stateParams.activityid });
                    };
                }
            ]);
    });