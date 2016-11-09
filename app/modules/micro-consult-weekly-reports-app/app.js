"use strict";
/**
 * author :
 * time:
 * description: 咨询本周报
 */


define([
    "ionic",
    "modules/micro-consult-weekly-reports-app/controller",
    "services/net/common",
    "services/common-filter",
], function() {

    return angular.module("MicroConsultWeeklyReportsApp", [
            "ionic",
            "MicroConsultWeeklyReportsApp.controllers",
            "services.net.common",
            "CommonFilter"
        ])
        .config([
            "$stateProvider",
            function($stateProvider) {

                $stateProvider.state("consultWeeklyReports", {
                    title: "报名周报",
                    cache: false,
                    url: "/consultWeeklyReports?startDate&endDate&trace",
                    templateUrl: "modules/micro-consult-weekly-reports-app/micro-consult-weekly-reports-app.html",
                    controller: "MicroConsultWeeklyReportsAppController",
                    resolve: {
                        permission: [
                            "permissionService", "$stateParams", function (permissionService, $stateParams) {
                                //百度统计自定义跟踪页面
                                if (window._hmt) {
                                    window._hmt.push(['_trackPageview', '/consultWeeklyReports/' + $stateParams.trace]);
                                }
                                //统一增加后台页面的Loading效果 by xp 2015年11月13日 16:09:13
                                $(".lockMask-loading2").show();
                                return permissionService.hasPermission();
                            }
                        ]
                    }
                });

            }
        ]);
});