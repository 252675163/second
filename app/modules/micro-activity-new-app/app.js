"use strict";
/**
 * author
 * time:
 * description:新建活动页面
 */


define([
    "ionic",
    "modules/micro-activity-new-app//controller",
    "services/permission"
], function () {

    return angular.module("MicroActivityNewApp", [
        "ionic",
        "MicroActivityNewApp.controllers",
        "services.permission"
    ])
        .config([
            '$stateProvider',
            function ($stateProvider) {

                $stateProvider.state('activity.new', {
                    title:'我的模版库',
                    url: '/activitynew',
                    templateUrl: 'modules/micro-activity-new-app/micro-activity-new-app.html',
                    controller: 'microActivityNewAppService',
                    resolve: {
                        permission: ["permissionService", "$stateParams", function (permissionService, $stateParams) {
                            return permissionService.hasPermission();
                        }]
                    }

                });

            }
        ]);
});
