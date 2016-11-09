"use strict";
/**
 * author :小宝
 * time: 2015年9月11日 
 * description: 种草活动
 */


define([
"ionic",
"modules/micro-activity-grassgrow-app/directive",
"modules/micro-activity-grassgrow-app/controller",
"services/permission"

], function () {

    return angular.module("MicroActivityGrassGrowApp", [
        "ionic",
        "MicroActivityGrassGrowApp.directives",
        "MicroActivityGrassGrowApp.controllers",
         "services.permission"
    ])
        .config([
            '$stateProvider',
            function ($stateProvider) {

                $stateProvider.state('activity.grow', {
                    //parent: 'activity',
                    cache: false,//需要播放音乐~必须不能缓存
                    title: "种草减学费",
                    url: '/grow/:ispreview?stuid',
                    templateUrl: 'modules/micro-activity-grassgrow-app/micro-activity-grassgrow-app.html',
                    controller: 'MicroActivityGrassGrowAppController',
                    resolve: {
                        permission: ["permissionService", "$stateParams", function (permissionService, $stateParams) {
                            if ($stateParams.ispreview == "true") {
                                return permissionService.hasPermission();
                            }

                        }]
                    }

                });

            }
        ]);
});
