"use strict";
/**
 * author :LTD
 * time: 2015年9月11日 15:03:58
 * description:
 */

define(["ionic", "modules/micro-activity-oldandnew-audio-app/services"],
    function () {
        return angular.module("MicroActivityOldAndNewAudioApp.controllers", ["MicroActivityOldAndNewAudioApp.services"])
            .controller("MicroActivityOldAndNewAudioAppController", [
                "$scope", "$rootScope", "$q", "$ionicScrollDelegate", "MicroActivityOldAndNewAudioAppService", "$ionicModal", "$sce", "promptBarService", "$timeout",
                function ($scope, $rootScope, $q, $ionicScrollDelegate, microActivityOldAndNewAudioAppService, $ionicModal, $sce, promptBarService, $timeout) {

                    $scope.page = {
                        "totalCount": "",
                        "currentIndex": "",
                        "itemCount": ""
                    };
                    $scope.musicPlayingGifUrl = window.resourceDoMain+"/app/img/music-playing.gif";
                    var pageSize = 10;
                    $scope.audioTag = 1;
                    $scope.changeAudioTag = function (audioTag) {
                        if ($scope.audioTag == audioTag) {
                            return;
                        } else {
                            $scope.audioTag = audioTag;
                            queryPage(1, pageSize, $scope.audioTag, "reset").then(function () {
                                $ionicScrollDelegate.scrollTop();
                            });
                        }
                    };
                    //滚动加载by yinglechao 2015.11.14
                    $scope.loadMore = function () {
                        $scope.isLoad = true;
                        queryPage($scope.page.currentIndex + 1, pageSize, $scope.audioTag, "add").then(function (data) {
                            $scope.$broadcast("scroll.infiniteScrollComplete");
                            $scope.isLoad = false;
                        });

                    };

                    var queryPage = function (pageIndex, pageSize, audioTag, queryType) {
                        //queryType = "reset"or "add"
                        if (!queryType) {
                            queryType = "reset";
                        }
                        var d = $q.defer();
                        microActivityOldAndNewAudioAppService.getAudios($scope.$stateParams.templateId, pageIndex, pageSize, audioTag).success(function (result) {
                            if (result.status == 1) {
                                if (queryType == "add") {
                                    $scope.audios = $scope.audios.concat(result.data.list);
                                } else if (queryType == "reset") {
                                    $scope.audios = result.data.list;
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

                    //选择音乐并保存
                    $scope.saveAudioSelector = function () {
                        //利用sce转换音乐地址

                        //$scope.musicUrl为$sce的特殊对象,保存需要toString
                        $scope.siteModel.pages[0].backgroundAudio = $scope.musicUrl.toString();
                        $rootScope.$state.go("activity.oldandnewedit", {
                            templateId: $scope.$stateParams.templateId,
                            activityId: $scope.$stateParams.activityId,
                            activityType: $scope.$stateParams.activityType,
                            isHold: true
                        });
                    };

                    //  选择音乐播放
                    $scope.pickAudio = function (audiosUrl) {
                        if (!audiosUrl) {
                            $scope.musicUrl = "";
                            $scope.myaudio.pause();
                        } else {
                            $scope.musicUrl = $sce.trustAsResourceUrl(audiosUrl);
                            setTimeout(function () {
                                $scope.myaudio.load();
                                //hack ios下不能循环播放  by xp 2015年11月28日 16:17:52
                                $scope.myaudio.addEventListener("ended", function () {
                                    //等待500毫秒
                                    setTimeout(function () { $scope.myaudio.play(); }, 500);
                                }, false);
                                $scope.myaudio.play();
                            }, 0);
                        }
                    };

                    var init = function () {
                        if (!angular.isUndefined($scope.siteModel)) {
                            $scope.myaudio = document.getElementById("myaudio");
                            queryPage(1, pageSize, $scope.audioTag, "reset").then(function () {
                                $scope.musicUrl = $sce.trustAsResourceUrl($scope.siteModel.pages[0].backgroundAudio);
                                setTimeout(function () {
                                    $scope.myaudio.load();
                                    //hack ios下不能循环播放  by xp 2015年11月28日 16:17:52
                                    $scope.myaudio.addEventListener("ended", function () {
                                        //等待500毫秒
                                        setTimeout(function () { $scope.myaudio.play(); }, 500);
                                    }, false);
                                    $scope.myaudio.play();
                                }, 0);

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

                        } else {
                            // 报错页面，非法进入页面
                            window.location.href = "/Common/error?mark=MicroActivityOldAndNewAudioAppController_init_siteModel_isUndefined";
                        }
                    };
                    init();

                    $scope.$on("$stateChangeStart", function (event, toState) {
                        if (toState.name.indexOf("activity") !== -1) {
                            event.targetScope.siteModel = angular.copy($scope.siteModel);
                            event.targetScope.activityOtherConfig = angular.copy($scope.activityOtherConfig);

                        }
                    });

                }
            ]);
    });