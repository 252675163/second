"use strict";
/**
 * author :小宝
 * time: 2015年9月11日
 * description: 种草活动
 */


define(["ionic", "modules/micro-activity-grassmusic-app/services", /*"modules/micro-activity-grass-app/services", "modules/microactivityapp/services",*/ "services/net/grass", "services/net/common"],
    function() {
        return angular.module("MicroActivityGrassMusicApp.controllers", ["MicroActivityGrassMusicApp.services", "MicroActivityGrassApp.services", "MicroActivityApp.services", "services.net.grass", "services.net.common"])
            .controller("MicroActivityGrassMusicAppController", [
                "$scope", "$rootScope", "$q", "$ionicScrollDelegate", "promptBarService", "MicroActivityGrassMusicAppService", "$state", "MicroActivityGrassAppService", "$sce", "microActivityAppService", "grassNetService", "commonNetService",
                function($scope, $rootScope, $q, $ionicScrollDelegate, promptBarService, microActivityGrassMusicAppService, $state, microActivityGrassAppService, $sce, microActivityAppService, grassNetService, commonNetService) {
                    //$scope.index = $scope.$stateParams.musicId;


                    $scope.page = {
                        "totalCount": "",
                        "currentIndex": "",
                        "itemCount": ""
                    };
                    var pageSize = 10;
                    $scope.audioTag = 1;
                    $scope.changeAudioTag = function(audioTag) {
                        if ($scope.audioTag == audioTag) {
                            return;
                        } else {
                            $scope.audioTag = audioTag;
                            queryPage(1, pageSize, $scope.audioTag, "reset").then(
                                function() {
                                    $ionicScrollDelegate.scrollTop();
                                }
                            );
                        }
                    };
                    //滚动加载by yinglechao 2015.11.7
                    $scope.loadMore = function() {
                        if (!$scope.isLoad) {
                            $scope.isLoad = true;
                            queryPage($scope.page.currentIndex + 1, pageSize, $scope.audioTag, "add").then(function(data) {
                                $scope.$broadcast("scroll.infiniteScrollComplete");
                                $scope.isLoad = false;
                            });
                        } else {
                            $scope.$broadcast("scroll.infiniteScrollComplete");
                        }
                    };
                    var queryPage = function(pageIndex, pageSize, audioTag, queryType) {
                        //queryType = "reset"or "add"
                        if (!queryType) {
                            queryType = "reset";
                        }
                        var d = $q.defer();
                        grassNetService.getMusic(microActivityAppService.getGrassPreview().TemplateId, pageIndex, pageSize, audioTag).success(function(result) {
                            if (result.status == 1) {
                                if (queryType == "add") {
                                    $scope.musics = $scope.musics.concat(result.data.list);
                                } else if (queryType == "reset") {
                                    $scope.musics = result.data.list;
                                }
                                $scope.page = result.data.page;
                                d.resolve();
                            } else {
                                promptBarService.showErrorBar(result.message, 3000);
                                d.reject();
                            }
                        });
                        return d.promise;
                    };
                    $scope.changeIndex = function(musicUrl) {
                        //表示选中项
                        if ($scope.index == "") {
                            $scope.musicUrl = " ";
                        } else {
                            $scope.musicUrl = $sce.trustAsResourceUrl(musicUrl);
                        }
                        setTimeout(function() {
                            $scope.myaudio.load();
                            //hack ios下不能循环播放  by xp 2015年11月28日 16:17:52
                            $scope.myaudio.addEventListener("ended", function () {
                                //等待500毫秒 
                                setTimeout(function () { $scope.myaudio.play(); }, 500);
                            }, false);
                            $scope.myaudio.play();
                        }, 0);

                    };
                    $scope.goGrass = function() {
                        //保存音乐并跳转
                        var model = microActivityAppService.getGrassPreview();
                        $scope.config.musicId = $scope.musicUrl.toString();

                        model.Config = JSON.stringify($scope.config);
                        microActivityAppService.setGrassPreview(model);
                        $state.go("activity.grass", {
                            userId: model.UserId,
                            templateId: model.TemplateId
                        });
                    };

                    function init() {
                        $scope.myaudio = document.getElementById("myaudio");
                        //if (angular.isUndefined(microActivityAppService.getGrassPreview().Id)) {
                        //    window.location.href = "/Common/error";
                        //} else {

                        $scope.config = JSON.parse(microActivityAppService.getGrassPreview().Config);
                        $scope.musicUrl = "";
                        queryPage(1, pageSize, $scope.audioTag, "reset").then(function() {
                            $scope.musicUrl = $sce.trustAsResourceUrl($scope.config.musicId);
                            setTimeout(function() {
                                $scope.myaudio.load();
                                //hack ios下不能循环播放  by xp 2015年11月28日 16:17:52
                                $scope.myaudio.addEventListener("ended", function() {
                                    //等待500毫秒 
                                    setTimeout(function() { $scope.myaudio.play(); }, 500);
                                }, false);
                                $scope.myaudio.play();
                            }, 0);

                        }); //}
                    }

                    init();


                    $scope.$on("$stateChangeStart", function(event) {
                        event.targetScope.isChange = true;
                        document.getElementsByTagName("audio")[0].pause();
                        document.getElementsByTagName("audio")[0].setAttribute("src", "");
                    });

                }
            ]);
    });