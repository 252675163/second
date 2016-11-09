"use strict";
/**
 * author :zhouhuijuan
 * create time: 2016/9/20
 * description:咨询本日程
 */


define([
    "ionic",
    "modules/micro-registrationbook-schedule-app/controller",
    "services/permission",
    "services/net/common"/*,
    "modules/micro-registrationbook-app/filters"*/
    //挂载微官网子模块
], function () {

    return angular.module("MicroRegistrationBookScheduleApp", [
            "ionic",
            "MicroRegistrationBookScheduleApp.controllers",
            "services.permission",
            "services.net.common",
            // "TitleFilter"
    ])
        .config([
            "$stateProvider",
            function ($stateProvider) {

                $stateProvider.state("registrationbook.schedule", {
                    title: "咨询本",
                    cache: false,
                    url: "/schedule",
                    templateUrl: "modules/micro-registrationbook-schedule-app/micro-registrationbook-schedule-app.html",
                    controller: "MicroRegistrationBookScheduleAppController",
                    resolve: {
                        permission: [
                            "permissionService", "$stateParams",function (permissionService, $stateParams) {

                                //进入日程百度统计埋点
                                if (window._hmt) {
                                    window._hmt.push(['_trackPageview', "/schedule"]);
                                }

                                return permissionService.hasPermission();
                            }
                        ]
                    }
                });

            }
        ]);
});