"use strict";
/**
 * author :
 * time:
 * description:
 */

define(["ionic", "modules/vip-club-app/services"],
    function () {
        return angular.module("VIPclubApp.controllers", ["VIPclubApp.services"])
            .controller("VIPclubAppController", [
                "$scope", "$rootScope", "$window", "promptBarService", "commonNetService", "VIPclubAppService", "$ionicPopup", "$timeout", "maskService",
                function ($scope, $rootScope,$window, promptBarService,commonNetService, VIPclubAppService, $ionicPopup, $timeout, maskService) {

                    //--end
                    $scope.toUserCenter = function () {
                        if (window._hmt) {
                            window._hmt.push(['_trackPageview', '/VIPclubtousercenter']);
                        }
                        $rootScope.$state.go("userCenter", {});
                    };
                    
                    $scope.renderDataList=function(list){
                        $scope.list=list;
                    }

                    $scope.toBannerLink = function (link,id) {
                        if (window._hmt) {
                            window._hmt.push(['_trackPageview', '/VIPclubbanner/'+id]);
                        }
                        $window.location.href = link;
                    }

                    function init() {
                        commonNetService.addBackgroundOperationLog("VipStore");

                        VIPclubAppService.getAdvertisementBanner().success(function (result) {
                            if (result.status == 1&&!!result.data&&!!result.data.list) {
                                $scope.renderDataList(result.data.list);
                            }
                        })

                        //统一增加后台页面的Loading效果 
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
                    }

                    init();


                }
            ]);
    });