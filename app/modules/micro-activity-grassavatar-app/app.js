"use strict";
/**
 * author :小宝
 * time: 2015年9月11日 
 * description: 种草活动
 */


define([
"ionic",
"modules/micro-activity-grassavatar-app/directive",
"modules/micro-activity-grassavatar-app/controller",
"services/permission"
], function () {

    return angular.module("MicroActivityGrassAvatarApp", [
        "ionic",
        "MicroActivityGrassAvatarApp.directives",
        "MicroActivityGrassAvatarApp.controllers",
        "services.permission" 
    ])
        .config([
            '$stateProvider',
            function ($stateProvider) {
                $stateProvider.state('activity.grassavatar', {
                    //parent: 'activity',
                    title: "种草减学费",
                    cache:false,//需要播放音乐~必须不能缓存
                    url: '/grassavatar/:ispreview?stuid&isFromA&activityid',
                    templateUrl: 'modules/micro-activity-grassavatar-app/micro-activity-grassavatar-app.html',
                    controller: 'MicroActivityGrassAvatarAppController',
                    resolve: {
                        permission: ["permissionService", "$stateParams", function (permissionService, $stateParams) {
                            //if ($stateParams.ispreview) {
                            //    return permissionService.hasPermission();
                            //}
                            
                        }]
                    }

                });

            }
        ]);
});
