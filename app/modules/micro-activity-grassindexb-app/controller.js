"use strict";
/**
 * author :小宝
 * time: 2015年9月11日
 * description: 种草活动
 */


define(["ionic", "modules/micro-activity-grassindexb-app/services", /*"modules/microactivityapp/services",*/ "services/net/grass", /*"modules/micro-activity-grass-app/directive", */"services/net/common"],
    function() {
        return angular.module("MicroActivityGrassIndexBApp.controllers", ["MicroActivityGrassIndexBApp.services", "MicroActivityApp.services", "services.net.grass", "MicroActivityGrassApp.directives", "services.net.common"])
            .controller("MicroActivityGrassIndexBAppController", [
                "$scope", "$rootScope", "MicroActivityGrassIndexBAppService", "$state", "$sce", "$timeout", "microActivityAppService", "grassNetService", "commonNetService", "$ionicLoading",
                function($scope, $rootScope, microActivityGrassIndexBAppService, $state, $sce, $timeout, microActivityAppService, grassNetService, commonNetService, $ionicLoading) {


                    $scope.ispreview = $scope.$stateParams.ispreview; //是否是预览
                    $scope.stuid = $scope.$stateParams.stuid; //分享者id
                    $scope.grassUrl = "";
                    $scope.grassClass = "";
                    $scope.headImg = " ";
                    $scope.isShow = false;
                    $scope.name = "";
                    $scope.foot = "";
                    if ($scope.ispreview == "true") {
                        //统一增加前台页面的Loading效果 by xp 2015年10月26日 20:22:57
                        $(".lockMask-loading2").hide();
                        if (angular.isUndefined(microActivityAppService.getGrassPreview().Config)) {
                            window.location.href = "/Common/error?mark=MicroActivityGrassIndexBAppController_getGrassPreview().Config_isUndefined";
                        } else {
                            $scope.title = JSON.parse(microActivityAppService.getGrassPreview().Config).title;
                            $scope.name = "XXX";
                            $scope.foot = microActivityAppService.getGrassPreview().Footer && microActivityAppService.getGrassPreview().Footer.replace(/href\s*?=\s*?[\"'](.*?)[\"']/g, "href='javascript:void(0);'");
                        }
                    } else {
                        //$scope.title = grassNetService.getActivityInfoByStuId($scope.stuid).title;
                        grassNetService.getActivityInfoByStuId($scope.stuid).success(function(data) {
                            if (data && data.ActivityConfig) {
                                $scope.foot = data.Footer;
                                commonNetService.saveForeLog({
                                    OriginId: data.ActivityId,
                                    Type: "Activity",
                                    Operation: "Visit"
                                }).success(function(result) {
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

                                //取真实数据
                                microActivityAppService.setGrassUser(data);
                                $scope.score = data.Score;
                                $scope.name = data.Name;

                                if (data.Score > 0) {
                                    setTimeout(function() {
                                        $scope.grassUrl = microActivityGrassIndexBAppService.getGrassUrl(data.Score);
                                        $scope.grassClass = microActivityGrassIndexBAppService.getGrassClass(data.Score);
                                        $scope.isShow = true;
                                    }, 0);

                                }
                                if (data.Config) {
                                    $scope.headImg = JSON.parse(data.Config).headImg;
                                } else {
                                    $scope.headImg = "";
                                }

                                if (data.ShareConfig) {
                                    var config = angular.fromJson(data.ShareConfig);
                                    config.link = window.shareServer + "/Home/GrassShareRoute?p=" + location.hash.slice(2);
                                    //将当前页面的title改成自定义之后的title
                                    $scope.$state.current.title = config.title;
                                    commonNetService.setShareMessageReception(config);
                                }

                                $scope.title = JSON.parse(data.ActivityConfig).title;
                            } else {
                                location.href = "/Common/Error?mark=MicroActivityGrassIndexBAppController_dataOrdata.ActivityConfig_isUndefined";
                                return;
                            }

                            if ($scope.title)
                                $scope.title = $scope.title.replace(/ /g, "&nbsp;").replace(/\n/g, "<br/>");


                        });
                    }
                    if ($scope.title) {
                        $scope.title = $scope.title.replace(/ /g, "&nbsp;").replace(/\n/g, "<br/>");
                    }

                    //跳转至种草
                    $scope.goGrow = function() {
                        $state.go("activity.grow", { ispreview: $scope.ispreview, stuid: $scope.stuid });
                    };
                    //跳转新建咨询
                    $scope.goConsult = function() {
                        $state.go("activity.grassavatar", { ispreview: $scope.ispreview, stuid: $scope.stuid });
                    };
                    $scope.pause = function() {
                        //暂停音乐
                    };
                }
            ]);
    });