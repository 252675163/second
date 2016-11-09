"use strict";
/**
 * author :小宝
 * time: 2015年9月11日 
 * description: 种草活动
 */


define([
    "ionic",
    "modules/micro-activity-grassindexb-app/directive",
    "modules/micro-activity-grassindexb-app/controller",
    "services/permission"
], function() {

    return angular.module("MicroActivityGrassIndexBApp", [
            "ionic",
            "MicroActivityGrassIndexBApp.directives",
            "MicroActivityGrassIndexBApp.controllers",
            "services.permission"
        ])
        .config([
            "$stateProvider",
            function($stateProvider) {

                $stateProvider.state("activity.grassindexb", {
                    cache: false,
                    title: "种草减学费",
                    shareImg:"http://cdn.schoolpal.cn/shiningstar"+"/Activity/20150924205925-f68d7.jpg",
                    url: "/grassindexb/:ispreview?stuid",
                    templateUrl: "modules/micro-activity-grassindexb-app/micro-activity-grassindexb-app.html",
                    controller: "MicroActivityGrassIndexBAppController",
                    resolve: {
                        permission: [
                            "permissionService", "$stateParams", function (permissionService, $stateParams) {
                                //统一增加前台页面的Loading效果 by xp 2015年10月26日 20:22:57
                                $(".lockMask-loading2").show();
                                if ($stateParams.ispreview == "true") {
                                    return permissionService.hasPermission();
                                }

                            }
                        ]
                    }

                });

            }
        ]);
});