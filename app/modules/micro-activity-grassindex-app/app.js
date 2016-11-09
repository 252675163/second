"use strict";
/**
 * author :小宝
 * time: 2015年9月11日 
 * description: 种草活动
 */


define([
"ionic",
"modules/micro-activity-grassindex-app/directive",
"modules/micro-activity-grassindex-app/controller",
"services/permission"
], function () {

    return angular.module("MicroActivityGrassIndexApp", [
        "ionic",
        "MicroActivityGrassIndexApp.directives",
        "MicroActivityGrassIndexApp.controllers",
        "services.permission"        
    ])
        .config([
            '$stateProvider',
            function ($stateProvider) {

                $stateProvider.state('activity.grassindex', {
                    //parent: 'activity',
                    //cache:false,//需要播放音乐~必须不能缓存
                    title: "种草减学费",
                    shareImg:"http://cdn.schoolpal.cn/shiningstar"+"/Activity/20150924205925-f68d7.jpg",
                    url: '/grassindex/:activityid',
                    templateUrl: 'modules/micro-activity-grassindex-app/micro-activity-grassindex-app.html',
                    controller: 'MicroActivityGrassIndexAppController',
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
