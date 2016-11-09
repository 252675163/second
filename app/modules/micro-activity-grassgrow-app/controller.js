"use strict";
/**
 * author :小宝
 * time: 2015年9月11日
 * description: 种草活动
 */


define(["ionic", "modules/micro-activity-grassgrow-app/services", /*"modules/microactivityapp/services", "modules/micro-activity-grass-app/services",*/ "services/net/grass", "services/net/common"],
    function() {
        return angular.module("MicroActivityGrassGrowApp.controllers", ["MicroActivityGrassGrowApp.services", "MicroActivityApp.services", "MicroActivityGrassApp.services", "services.net.grass", "services.net.common"])
            .controller("MicroActivityGrassGrowAppController", [
                "$scope", "$rootScope", "MicroActivityGrassGrowAppService", "$state", "$sce", "$timeout", "microActivityAppService", "MicroActivityGrassAppService", "grassNetService", "commonNetService","promptBarService",
                function ($scope, $rootScope, microActivityGrassGrowAppService, $state, $sce, $timeout, microActivityAppService, microActivityGrassAppService, grassNetService, commonNetService, promptBarService) {
                    $scope.stuid = $scope.$stateParams.stuid;
                    $scope.ispreview = $scope.$stateParams.ispreview; //是否是预览
                    $scope.user;
                    //需求：缩减种草流程，帮他种草之后直接进入选择种草页面  by xp 2015年10月26日 15:32:22
                    $scope.isChoose = true;
                    $scope.grassGrowUrl = "";
                    $scope.grassDanceUrl = "";
                    $scope.isGrow = false;
                    $scope.isDance = false;
                    $scope.isAllowGrow = true;
                    $scope.musicId = -1;
                    $scope.flg = true;
                    $scope.isLoging = true;
                    $scope.musics;
                    $scope.musicUrl = "";
                    //grassNetService.getMusic(microActivityAppService.getGrassPreview().TemplateId).success(function (data) {
                    //    //console.log(data);
                    //    $scope.musics = data;
                    //    $scope.musicUrl = $scope.changeMusic($scope.musicId);
                    //    setTimeout(function () {
                    //        var a = document.getElementsByTagName("audio");
                    //        a[0].load();
                    //    }, 0);
                    //});
                    //加载动画
                    $timeout(function() {
                        $scope.isLoging = false;
                    }, 1000);

                    //$scope.changeMusic = function (url) {
                    //    if (url == "") {
                    //        $scope.musicTemp = " ";
                    //    } else {
                    //        $scope.musicTemp = url;
                    //    }
                    //    //利用sce转换音乐地址
                    //    return $sce.trustAsResourceUrl($scope.musicTemp);
                    //};

                    $scope.avatar = "";
                    //$scope.changeMusic = function (index) {
                    //    if ($scope.musicId == "-1") {
                    //        $scope.musicTemp = " ";
                    //    }
                    //    else {
                    //        $scope.musicTemp = MicroActivityGrassAppService.getMusicUrl($scope.musicId + "");
                    //    }
                    //    //利用sce转换音乐地址
                    //    return $sce.trustAsResourceUrl($scope.musicTemp);
                    //}

                    if ($scope.ispreview == "true") {
                        if (angular.isUndefined(microActivityAppService.getGrassPreview().Config)) {
                            window.location.href = "/Common/error?mark=MicroActivityGrassGrowAppController_getGrassPreview().Config_isUndefined";
                        } else {
                            $scope.musicId = JSON.parse(microActivityAppService.getGrassPreview().Config).musicId; //获取音频地址
                            $scope.musicUrl =$sce.trustAsResourceUrl($scope.musicId);
                            setTimeout(function () {
                                var a = document.getElementsByTagName("audio");
                                a[0].load();
                                //hack ios下不能循环播放  by xp 2015年11月28日 16:17:52
                                a[0].addEventListener('ended', function () {
                                    //等待500毫秒
                                    setTimeout(function () { a[0].play(); }, 500);
                                }, false);
                                a[0].play();
                            }, 0);
                        }
                    } else {
                        //真是数据
                        //$scope.musicId = grassNetService.getActivityInfoByStuId($scope.stuid).musicId;
                        //pv数据统计
                        if (!microActivityAppService.getGrassUser()) {
                            //新需求 种草页面均可被分享 自动跳转回B流程首页 2015年10月20日 17:28:05  by xp
                            $state.go("activity.grassindexb", { ispreview: $scope.ispreview, stuid: $scope.stuid });
//                            grassNetService.getActivityInfoByStuId($scope.stuid).success(function(data) {
//                                $scope.user = data;
//                                $scope.musicId = JSON.parse($scope.user.ActivityConfig).musicId;
//                                if (!$scope.user.Config) {
//                                    $scope.avatar = "";
//
//                                } else {
//                                    $scope.avatar = JSON.parse($scope.user.Config).headImg;
//
//                                }
//                                $scope.musicUrl = $scope.changeMusic($scope.musicId);
//                                commonNetService.saveForeLog({ OriginId: $scope.user.ActivityId, Type: "Activity", Operation: "Visit" }).success(function(result) {
//                                    //console.log("保存成功")
//                                });
//                            });

//                            window.location.href = "/Common/error";
//                            return;
                        } else {
                            $scope.user = microActivityAppService.getGrassUser();

                            $scope.musicId = JSON.parse($scope.user.ActivityConfig).musicId;
                            if (!$scope.user.Config) {
                                $scope.avatar = "";

                            } else {
                                $scope.avatar = JSON.parse($scope.user.Config).headImg;

                            }
                            //$sce.trustAsResourceUrl($scope.musicTemp)
                            $scope.musicUrl =$sce.trustAsResourceUrl($scope.musicId);
                            setTimeout(function () {
                                var a = document.getElementsByTagName("audio");
                                a[0].load();
                                //hack ios下不能循环播放  by xp 2015年11月28日 16:17:52
                                a[0].addEventListener('ended', function () {
                                    //等待500毫秒
                                    setTimeout(function () { a[0].play(); }, 500);
                                }, false);
                                a[0].play();
                            }, 0);
                            commonNetService.saveForeLog({ OriginId: $scope.user.ActivityId, Type: "Activity", Operation: "Visit" }).success(function (result) {
                                //console.log("保存成功")
                            });

                            if ($scope.user.ShareConfig) {
                                var config = angular.fromJson($scope.user.ShareConfig);
                                config.link = window.shareServer + "/Home/GrassShareRoute?p=" + location.hash.slice(2);
                                //将当前页面的title改成自定义之后的title
                                $scope.$state.current.title = config.title;
                                commonNetService.setShareMessageReception(config);
                            }

                        }

                    }



                    //选草点击
                    $scope.chooseGrass = function() {
                        $scope.isChoose = true;
                    };
                    //选择草就改变人的数量
                    $scope.changeStuGrass = function() {
                        if ($scope.ispreview == "true") {
                            console.log("没有必要往数据库存");
                        } else {
                            grassNetService.updateScore($scope.stuid).success(function(data) {
                                if (data.status == 1) {
                                    //其他提示信息
                                    console.log(data.message);
                                } else {
                                    promptBarService.showErrorBar(data.message);
                                }
                            });

                        }
                    };
                    //关闭选草界面
                    $scope.closeGrass = function() {
                        $scope.isChoose = false;
                    }; //选草
                    $scope.chooseGrassAction = function(index) {
                        $scope.isChoose = false;
                        $scope.isAllowGrow = false;
                        var tempObj = microActivityGrassGrowAppService.getGrassUrl(index);
                        $scope.grassGrowUrl = tempObj.grassGrowUrl + "?date=" + Date.now();
                        $scope.grassDanceUrl = tempObj.grassDanceUrl + "?date=" + Date.now();
                        $scope.isGrow = true;
                        $timeout(function() {
                            $scope.isGrow = false;
                            $scope.isDance = true;
                        }, 900);
                        //这里需要更新数据
                        $scope.changeStuGrass();
                    };
                    $scope.pause = function(flg) {
                        var audio = document.getElementsByTagName("audio");
                        if (flg) {
                            audio[0].pause();

                        } else {
                            audio[0].play();
                        }
                        $scope.flg = !flg;
                    };
                    $scope.goConsult = function() {
                        if ($scope.ispreview == "true") {
                            $state.go("activity.grassavatar", { ispreview: $scope.ispreview, stuid: $scope.stuid });

                        } else {
                            $state.go("activity.grassavatar", { ispreview: $scope.ispreview, stuid: $scope.stuid, activityid: $scope.user.ActivityId });
                        }

                    };
                    $scope.$on("$stateChangeStart", function(event) {
                        document.getElementsByTagName("audio")[0].pause();
                        document.getElementsByTagName("audio")[0].setAttribute("src", "");
                    });
                }
            ]);
    });