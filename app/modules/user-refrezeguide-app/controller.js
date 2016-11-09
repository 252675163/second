"use strict";
/**
 * author:cxd
 * time:2016年7月1日19:33:30
 * description:冻结场景 推文页
 */

define(["ionic", "modules/user-refrezeguide-app/services"],
    function () {
        return angular.module("UserRefrezeguideApp.controllers", ["UserRefrezeguideApp.services"])
            .controller("UserRefrezeguideAppController", [
                "$scope", "$rootScope", "$timeout", "userRefrezeguideAppService", "$location",
                function ($scope, $rootScope, $timeout, userRefrezeguideAppService, $location) {

                    var init = function () {

                        var scenefreezeId = $location.search().scenefreezeId;     //冻结ID
                        var appealid = $location.search().appealId;     //申诉ID

                        $timeout(function () {
                            
                            if (appealid) { //如果申诉ID 有值  则获取 申诉失败的原因
                                $scope.replaytext = "回复";
                                userRefrezeguideAppService.getAppeleCause(appealid).then(function (res) {
                                    if (res.data.status == 1) {
                                        var apply = res.data.data;
                                        $scope.frezereason = apply.Details;
                                        $scope.frezetime = apply.ReplyTime;
                                        $scope.imgs = apply.Screenshots == "" ? [] : JSON.parse(apply.Screenshots);
                                        $scope.title = apply.SceneName;
                                    }
                                }, function (err) {
                                    console.log(err)
                                })
                            } else {
                                $scope.replaytext = "冻结";
                                userRefrezeguideAppService.getFrezecause(scenefreezeId).then(function (res) {
                                    if (res.data.status == 1) {
                                        var freze = res.data.data;
                                        $scope.frezereason = freze.Details;
                                        $scope.frezetime = freze.FreezeTime;
                                        $scope.imgs = freze.Screenshots == "" ? [] : JSON.parse(freze.Screenshots);
                                        $scope.title = freze.SceneName;
                                    }
                                })
                            }
                            $(".lockMask-loading2").hide();
                        }, 1833);
                    }

                    init();
                    $scope.gohome = function () {
                        $scope.$state.go("index", {});
                    }

                }
            ]);
    });