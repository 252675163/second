"use strict";
/**
 * author :小潘
 * time: 2015年9月9日 20:59:58
 * description:
 */


define(["ionic", "modules/micro-activity-statistics-app/services", "services/net/common"],
    function() {
        return angular.module("MicroActivityStatisticsApp.controllers", ["MicroActivityStatisticsApp.services", "services.net.common"])
            .controller("MicroActivityStatisticsAppController", [
                "$scope", "$rootScope", "MicroActivityStatisticsAppService", "commonNetService", "$timeout",
                function ($scope, $rootScope, microActivityStatisticsAppService, commonNetService, $timeout) {

                    $scope.formatDateByStatistics = function(data) {
                        //var d = new Date(parseInt(data.substr(6, 13)));
                        //var year = d.getFullYear();
                        //var month = d.getMonth() + 1;
                        //var date = d.getDate();

                        //return year + "-" + month + "-" + date;

                        return data && new Date(parseInt(data.substr(6, 13)));
                    };

                    $scope.consults = function () {
                        //2016.5.12 yinglechao 有排行榜的活动跳往老报名本，其他跳往新报名本
                        var templateCode = $scope.data.SceneTemplateInfo.TemplateCode;
                        var templateType = $scope.data.SceneTemplateInfo.TemplateType;
                        //如果是有排行榜的活动，则跳转到老的报名本 2016.5.12 by yinglechao
                        if (templateCode == "Grass1" || templateCode == "Grass2" || templateCode == "Christmas" || templateCode == "GrowVegettables" || templateCode == "Vote" || templateCode == "Aquarium" || templateCode == "Assistant") {
       
                            $rootScope.$state.go("consultbook", { id: $scope.$stateParams.activityId, type: "1", trace: "traceByStatistics" });
                        } else {
                            //if ($scope.isSchoolpalUser) {
                                //window.location.href = "/OAuth/SchoolPalRoute?redirectUrl=" + encodeURIComponent(window.schoolPalAuthenticationServer + "/Consult/ConsultList?sceneId=" + $scope.$stateParams.activityId + "&sceneType=" + templateType);
                           // }
                           // else {
                                $rootScope.$state.go("registrationbook.registrationbookall", { id: $scope.$stateParams.activityId, type: templateType, trace: "traceByStatistics" });
                            //}
                        }
                      
                    };
                    $scope.init = function() {
                        commonNetService.addBackgroundOperationLog("ActReport");
                        //是否从校宝工作台进来
                        $scope.isSchoolpalUser = (window.isSchoolpalUser == "true") ? true : false;
                        //活动模板扩展  
//                        if ($scope.$stateParams.templateId == 2) {
//                            $scope.$state.current.title = "数据统计";
//                        } else {
//                            $scope.$state.current.title = "数据统计";
//                        }

                        microActivityStatisticsAppService.GetFgStatistics($scope.$stateParams.activityId, 1).success(function(data) {
                            //微活动
                            $scope.data = data;
                            
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


                    };
                    $scope.init();

                }
            ]);
    });