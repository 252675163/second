"use strict";
/**
 * author :小宝
 * time: 2015年9月11日 
 * description: 种草活动
 */


define([
    "ionic",
    "modules/micro-activity-grassmusic-app/controller",
    "services/permission",
], function () {

    return angular.module("MicroActivityGrassMusicApp", [
        "ionic",
        "MicroActivityGrassMusicApp.controllers",
         "services.permission"
    ])
        .config([
            '$stateProvider',
            function ($stateProvider) {

                $stateProvider.state('activity.music', {
                    //parent: 'activity',
                    title:"我的音乐库",
                    cache: false,
                    url: '/music',
                    templateUrl: 'modules/micro-activity-grassmusic-app/micro-activity-grassmusic-app.html',
                    controller: 'MicroActivityGrassMusicAppController',
                    resolve: {
                        permission: ["permissionService",  function (permissionService) {
                   
                                return permissionService.hasPermission();
                            

                        }]
                    }

                });

            }
        ]);
});
