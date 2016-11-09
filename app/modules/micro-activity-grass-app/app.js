"use strict";
/**
 * author :小宝
 * time: 2015年9月11日 
 * description: 种草活动
 */


define([
"ionic",
"modules/micro-activity-grass-app/directive",
"modules/micro-activity-grass-app/controller",
"services/permission"
], function () {

    return angular.module("MicroActivityGrassApp", [
        "ionic",
        "MicroActivityGrassApp.directives",
        "MicroActivityGrassApp.controllers",
        "services.permission"
    ])
        .config([
            '$stateProvider',
            function ($stateProvider) {

                $stateProvider.state('activity.grass', {
                    //parent: 'activity',
                    cache: false,
                    url: '/grass/:userId?templateId&activityId',
                    templateUrl: 'modules/micro-activity-grass-app/micro-activity-grass-app.html',
                    controller: 'MicroActivityGrassAppController',
                    title:"编辑我的场景",
                    resolve: {
                        permission: ["permissionService", "$stateParams", function (permissionService, $stateParams) {
                            return permissionService.hasPermission();
                        }]
                    }

                });

            }
        ]);
});
