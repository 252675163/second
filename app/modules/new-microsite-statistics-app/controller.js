"use strict";
/**
 * author :小潘
 * time: 2015年9月9日 20:59:58
 * description:
 */


define(["ionic", "modules/new-microsite-statistics-app/services", "services/net/common"],
    function() {
        return angular.module("NewMicroSiteStatisticsApp.controllers", ["NewMicroSiteStatisticsApp.services", "services.net.common"])
            .controller("NewMicroSiteStatisticsAppController", [
                "$scope", "$rootScope", "NewMicroSiteStatisticsAppService", "commonNetService", "$timeout",
                function($scope, $rootScope, NewMicroSiteStatisticsAppService, commonNetService, $timeout) {

                    $scope.formatDateByStatistics = function(data) {
                        //var d = new Date(parseInt(data.substr(6, 13)));
                        //var year = d.getFullYear();
                        //var month = d.getMonth() + 1;
                        //var date = d.getDate();

                        //return year + "-" + month + "-" + date;

                        return data && new Date(parseInt(data.substr(6, 13)));
                    };

                    $scope.consults = function() {
                        //$rootScope.$state.go("newsite.consultbook", { id: $scope.$stateParams.websiteId, type: "0" }, {
                        //    reload: true,
                        //    inherit: false
                        //});
                        //跳转到校宝咨询本
                        //if ($scope.isSchoolpalUser) {
                           // window.location.href = "/OAuth/SchoolPalRoute?redirectUrl=" + encodeURIComponent(window.schoolPalAuthenticationServer + "/Consult/ConsultList?sceneId=" + $scope.$stateParams.websiteId + "&sceneType=" + $scope.$stateParams.templateType);
                       // }
                        //2016.5.12 跳转到新报名本 
                       // else {
                            $rootScope.$state.go("registrationbook.registrationbookall", { id: $scope.$stateParams.websiteId, type: "1", trace: "traceByStatistic" });
                       // }
                    };
                    $scope.init = function () {
                        commonNetService.addBackgroundOperationLog("SiteReport");

                        $scope.isSchoolpalUser = (window.isSchoolpalUser == "true") ? true : false;

                        //if (angular.isUndefined($scope.$stateParams.templateId)) {
                        $scope.$state.current.title = "微官网_数据统计";
                        //TODO 微官网 参数传递还有问题
                        NewMicroSiteStatisticsAppService.GetFgStatistics($scope.$stateParams.websiteId, 0).success(function(result) {
                            $scope.data = result;
                            //统一增加后台页面的Loading效果 by xp 2015年11月13日 16:09:13
                            if (!$rootScope.isFirstLoad) {
                                $timeout(function() {
                                    $(".lockMask-loading2").hide();
                                    $rootScope.isFirstLoad = true;
                                }, 1833);
                            } else {
                                $timeout(function() {
                                    $(".lockMask-loading2").hide();
                                    $rootScope.isFirstLoad = true;
                                }, 1000);
                            }
                        });
                        //} 

                    };
                    $scope.init();

                    $scope.$on("$stateChangeStart", function(event, toState) {
                        if (toState.name.indexOf("newsite") !== -1) {
                            event.targetScope.siteModel = angular.copy($scope.siteModel);
                        }

                    });
                }
            ]);
    });