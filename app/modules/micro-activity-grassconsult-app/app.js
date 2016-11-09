"use strict";
/**
 * author :小宝
 * time: 2015年9月11日 
 * description: 种草活动
 */


define([
"ionic",
"modules/micro-activity-grassconsult-app/directive",
"modules/micro-activity-grassconsult-app/controller",
"services/permission"
], function () {

    return angular.module("MicroActivityGrassConsultApp", [
        "ionic",
        "MicroActivityGrassConsultApp.directives",
        "MicroActivityGrassConsultApp.controllers",
        "services.permission"
    ])
        .config([
            '$stateProvider',
            function ($stateProvider) {

                $stateProvider.state('activity.consult', {
                    //parent: 'activity',
                    cache: false,
                    title: "种草减学费",
                    url: '/consult/:ispreview?stuid&isFromA&activityid',
                    templateUrl: 'modules/micro-activity-grassconsult-app/micro-activity-grassconsult-app.html',
                    controller: 'MicroActivityGrassConsultAppController',
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
