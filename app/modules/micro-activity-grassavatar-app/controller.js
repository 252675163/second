"use strict";
/**
 * author :小宝
 * time: 2015年9月11日
 * description: 种草活动
 */


define(["ionic", "modules/micro-activity-grassavatar-app/services", /*"modules/micro-activity-grass-app/services", "modules/microactivityapp/services",*/ "services/net/grass", "services/net/common" ],
    function() {
        return angular.module("MicroActivityGrassAvatarApp.controllers", ["MicroActivityGrassAvatarApp.services", "MicroActivityGrassApp.services", "MicroActivityApp.services", "services.net.grass", "services.net.common"])
            .controller("MicroActivityGrassAvatarAppController", [
                "$scope", "$rootScope", "MicroActivityGrassAvatarAppService", "$state", "$sce", "MicroActivityGrassAppService", "microActivityAppService", "uploadImgService", "grassNetService", "commonNetService",
                function($scope, $rootScope, MicroActivityGrassAvatarAppService, $state, $sce, MicroActivityGrassAppService, microActivityAppService, uploadImgService, grassNetService, commonNetService) {
                    //$scope.musicId = $scope.$stateParams.musicId;
                    //pv数据统计
                    $scope.ispreview = $scope.$stateParams.ispreview; //是否是预览


                    $scope.stuid = $scope.$stateParams.stuid;
                    $scope.user = microActivityAppService.getGrassUser();
                    $scope.musicId = -1;
                    $scope.flg = true;
                    $scope.tempUser = {};
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

                    if ($scope.user) {
                        $scope.tempUser = angular.copy($scope.user);
                        var temp = {};
                        temp.headImg = "";
                        //var tempUser = {};

                        //var tempUser = angular.copy($scope.user);
                        $scope.tempUser.Config = JSON.stringify(temp);
                    } else {
                        if ($scope.ispreview == "true") {
                            $scope.tempUser.ActivityId = -1;
                        } else {
                            if ($scope.activityData == undefined) {
                                //TODO 新需求 重新获取activityData

//                       window.location.href = "/Common/error";
                            } else {
                                $scope.tempUser.ActivityId = $scope.activityData.Id;
                            }
                        }

                    }
                    //$scope.changeMusic = function(url) {
                    //    if (url == "") {
                    //        $scope.musicTemp = " ";
                    //    } else {
                    //        $scope.musicTemp = url;;
                    //    }
                    //    //利用sce转换音乐地址
                    //    return $sce.trustAsResourceUrl($scope.musicTemp);
                    //}; //首页A过来的

                    if ($scope.ispreview == "true") {
                        if (microActivityAppService.getGrassPreview().Config != undefined) {
                            $scope.musicId = JSON.parse(microActivityAppService.getGrassPreview().Config).musicId; //获取音频地址
                            $scope.musicUrl = $sce.trustAsResourceUrl($scope.musicId);
                            setTimeout(function() {
                                var a = document.getElementsByTagName("audio");
                                a[0].load();
                                //hack ios下不能循环播放  by xp 2015年11月28日 16:17:52
                                a[0].addEventListener('ended', function () {
                                    //等待500毫秒
                                    setTimeout(function () { a[0].play(); }, 500);
                                }, false);
                                a[0].play();

                            }, 0);
                        } else {
                            window.location.href = "/Common/error?mark=MicroActivityGrassAvatarAppController_getGrassPreview().Config_isUndefined";
                        }
                    } else {
                        //真是数据
                        //$scope.musicId = grassNetService.getActivityInfoByStuId($scope.stuid).musicId;
                        var tempid = -1;
                        if (microActivityAppService.getGrassUser()) {
                            $scope.musicId = JSON.parse(microActivityAppService.getGrassUser().ActivityConfig).musicId;
                            tempid = microActivityAppService.getGrassUser().ActivityId;
                            //音乐2015.11.18 by yinglechao
                            $scope.musicUrl = $sce.trustAsResourceUrl($scope.musicId);
                            setTimeout(function() {
                                var a = document.getElementsByTagName("audio");
                                a[0].load();
                                //hack ios下不能循环播放  by xp 2015年11月28日 16:17:52
                                a[0].addEventListener('ended', function () {
                                    //等待500毫秒
                                    setTimeout(function () { a[0].play(); }, 500);
                                }, false);
                                a[0].play();
                            }, 0);
                            commonNetService.saveForeLog({ OriginId: tempid, Type: "Activity", Operation: "Visit" }).success(function(result) {
                                //console.log("保存成功")
                            });
                            if (microActivityAppService.getGrassUser().ShareConfig) {
                                var config = angular.fromJson(microActivityAppService.getGrassUser().ShareConfig);
                                config.link = window.shareServer + "/Home/GrassShareRoute?p=" + location.hash.slice(2);
                                //将当前页面的title改成自定义之后的title
                                $scope.$state.current.title = config.title;
                                commonNetService.setShareMessageReception(config);
                            }
                        } else {
                            // 新需求 该页面被分享出去之后强制跳转回流程首页
                            if ($scope.activityData == undefined) {

//                                grassNetService.getActivityById($scope.$stateParams.activityid).success(function(data) {
//                                    $scope.activityData = data;
//                                    $scope.tempUser.ActivityId = $scope.activityData.Id;
//                                    $scope.musicId = JSON.parse($scope.activityData.Config).musicId;
//                                    tempid = $scope.activityData.Id;
//                                    $scope.musicUrl = $scope.changeMusic($scope.musicId);
//                                    commonNetService.saveForeLog({ OriginId: tempid, Type: "Activity", Operation: "Visit" }).success(function(result) {
//                                    });
                                //                                });

                                if ($scope.$stateParams.isFromA) {
                                    //跳回A流程的首页
                                    $state.go("activity.grassindex", { ispreview: $scope.ispreview, activityid: $scope.$stateParams.activityid });
                                } else {
                                    //跳回B流程的首页
                                    $state.go("activity.grassindexb", { ispreview: $scope.ispreview, stuid: $scope.stuid });
                                }
                            } else {
                                $scope.tempUser.ActivityId = $scope.activityData.Id;
                                $scope.musicId = JSON.parse($scope.activityData.Config).musicId;
                                //$scope.musicUrl = $scope.changeMusic($scope.musicId);
                                //音乐2015.11.18 by yinglechao
                                $scope.musicUrl = $sce.trustAsResourceUrl($scope.musicId);
                                setTimeout(function() {
                                    var a = document.getElementsByTagName("audio");
                                    a[0].load();
                                    //hack ios下不能循环播放  by xp 2015年11月28日 16:17:52
                                    a[0].addEventListener('ended', function () {
                                        //等待500毫秒
                                        setTimeout(function () { a[0].play(); }, 500);
                                    }, false);
                                    a[0].play();

                                }, 0);
                                commonNetService.saveForeLog({ OriginId: $scope.tempUser.ActivityId, Type: "Activity", Operation: "Visit" }).success(function(result) {
                                });

                                if ($scope.activityData.ShareConfig) {
                                    var config = angular.fromJson($scope.activityData.ShareConfig);
                                    config.link = window.shareServer + "/Home/GrassShareRoute?p=" + location.hash.slice(2);
                                    //将当前页面的title改成自定义之后的title
                                    $scope.$state.current.title = config.title;
                                    commonNetService.setShareMessageReception(config);
                                }

                            }

                        }

                    }


                    $scope.config = {
                        aspectRatio: 1 / 1,
                        autoCropArea: 0.7,
                        strict: true,
                        guides: false,
                        center: true,
                        highlight: false,
                        dragCrop: false,
                        cropBoxMovable: false,
                        cropBoxResizable: false,
                        zoom: -0.2,
                        checkImageOrigin: true,
                        background: false,
                        minContainerHeight: document.documentElement ? document.documentElement.clientHeight ? document.documentElement.clientHeight : 400 : 400,
                        minContainerWidth: document.documentElement ? document.documentElement.clientWidth ? document.documentElement.clientWidth : 300 : 300
                    };


                    $scope.updateImg = function() {
                        uploadImgService.upLoadImg($scope.config, 2, $scope.upLoadFinish);
                    };


                    $scope.sectionModel = {
                        templateModel: ""
                    };

                    $scope.upLoadFinish = function(url) {
                        $scope.imageUrl = url;
                        $scope.isUpdateImg = false;

                        //往后端写数据
                        var temp = {};
                        temp.headImg = url;
                        $scope.tempUser.Config = JSON.stringify(temp);


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
                        $scope.tempUser.Id = 0;
                        $scope.tempUser.Name = "";
                        $scope.tempUser.Phone = "";
                        $scope.tempUser.Score = 0;
                        $scope.tempUser.CreatedAt = null;
                        microActivityAppService.setGrassTempUser($scope.tempUser); //存到缓存中

                        $state.go("activity.consult", { ispreview: $scope.ispreview, stuid: $scope.stuid, isFromA: $scope.$stateParams.isFromA, activityid: $scope.$stateParams.activityid });
                    };
                    $scope.$on("$stateChangeStart", function(event) {
                        document.getElementsByTagName("audio")[0].pause();
                        document.getElementsByTagName("audio")[0].setAttribute("src", "");
                    });

                }
            ]);
    });