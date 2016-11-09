"use strict";
/**
 * author :小潘
 * time: 2015年9月9日 20:22:48
 * description: 微活动-公开课-编辑
 * 更新：该模块为公用模块，根据templateId，选择渲染哪套模板 2015年10月27日 16:13:51
 */


define([
    "ionic",
    "modules/micro-activity-oldandnew-edit-app/directive",
    "modules/micro-activity-oldandnew-edit-app/controller",
    //微活动模板组件
    // "components/templates/micro-activity-template/app",
    //  //微助力模板组件
    // "components/templates/micro-power-template/app",
    // //微传单模板组件
    // "components/templates/micro-leaflet-template/app",
    //微海报1模板组件
    // "components/templates/micro-poster-template/micro_poster_1/app",
    // "components/templates/micro-poster-template/micro_poster_2/app",
    "services/permission",
    "services/net/common"
], function() {

    return angular.module("MicroActivityOldAndNewEditApp", [
            "ionic",
            "MicroActivityOldAndNewEditApp.directives",
            "MicroActivityOldAndNewEditApp.controllers",
            // "MicroActiveOldAndNewTemplate",
            // "MicroPowerTemplate",
            // "MicroLeafletTemplate",
            // "MicroPosterTemplate1",
            // "MicroPosterTemplate2",
            "services.permission",
            "services.net.common"
        ])
        .config([
            "$stateProvider",
            function($stateProvider) {

                $stateProvider.state("activity.oldandnewedit", {
                    title: "编辑我的场景",
                    //isHold仅限编辑附属模块之间传递，例如添加页面，添加背景时传递该值
                    url: "/oldandnewedit?templateId&activityId&isHold&activityType",
                    templateUrl: "modules/micro-activity-oldandnew-edit-app/micro-activity-oldandnew-edit-app.html",
                    controller: "MicroActivityOldAndNewEditAppController",
                    resolve: {
                        webSite: [
                            "activityEditNetService", "$stateParams", "$rootScope", "commonNetService", "$timeout",
                            function(activityEditNetService, $stateParams, $rootScope, commonNetService, $timeout) {
                                //统一增加后台页面的Loading效果 by xp 2015年11月13日 16:09:13
                                $(".lockMask-loading2").show();
                                if ($stateParams.activityId) {
                                    return activityEditNetService.getAactivity($stateParams.activityId).then(function(result) {
                                        var webSite = result.data;
                                        //数据统计
                                        commonNetService.saveBackLog({ OriginId: webSite.Id, Type: "Activity", Operation: "Edit" }).then(function(res) {
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
                                        return webSite;
                                    });
                                }
                                if ($stateParams.templateId) {
                                    return activityEditNetService.getTemplate($stateParams.templateId).then(function(result) {
                                        var webSite = result.data;

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

                                        return webSite;
                                    });
                                }
                                return null;

                            }
                        ],
                    }

                });

            }
        ]);
});