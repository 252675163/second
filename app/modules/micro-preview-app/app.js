"use strict";
/**
 * author :小潘
 * time: 2016年3月21日 20:25:30
 * description: 微活动前台预览（无鉴权）
 */


define([
    "ionic",
    "modules/micro-preview-app/controller",
    "modules/micro-preview-app/directive",
    //"components/templates/micro-activity-template/app",
    //微助力模板组件
    //"components/templates/micro-power-template/app",
    //微传单模板组件
    //"components/templates/micro-leaflet-template/app",
    "services/net/common"
], function() {

    return angular.module("MicroPreviewApp", [
            "ionic",
            "MicroPreviewApp.controllers",
            "MicroPreviewApp.directives",
            // "MicroActiveOldAndNewTemplate",
            // "MicroPowerTemplate",
            // "MicroLeafletTemplate",
            "services.net.common"
        ])
        .config([
            "$stateProvider",
            function($stateProvider) {
                // 游戏型模板和普通型模板区分。 jssdk不一样
                $stateProvider.state("activity.preview", {
                    cache: false,
                    title: "校宝秀，秀出精彩活动~",
                    url: "/preview?templateId&step",
                    templateUrl: "modules/micro-preview-app/micro-preview-app.html",
                    controller: "MicroPreviewAppController",
                    resolve: {
                        webSite: [
                            "activityPreviewNetService", "$stateParams", "$timeout", "$rootScope",
                            function(activityPreviewNetService, $stateParams, $timeout, $rootScope) {
                                //统一增加后台页面的Loading效果 by xp 2015年11月13日 16:09:13
                                $(".lockMask-loading2").show();
                                return activityPreviewNetService.getTemplateById($stateParams.templateId).then(function(result) {
                                    if (parseInt($stateParams.step || 0) <= 1) {
                                        $timeout(function() {
                                            $(".lockMask-loading2").hide();
                                            $rootScope.$broadcast('hideLoading');
                                        }, 1000);
                                    }

                                    return result.data;

                                });

                            }
                        ]
                    }

                });

            }
        ]);
});