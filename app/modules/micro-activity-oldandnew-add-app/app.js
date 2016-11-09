"use strict";
/**
 * author :LTD
 * time: 2015年9月11日 15:03:48
 * description: 微活动增加页面模块
 */


define([
    "ionic",
    "modules/micro-activity-oldandnew-add-app/controller",
    "services/permission"
], function () {

    return angular.module("MicroActivityOldAndNewAddApp", [
        "ionic",
        "MicroActivityOldAndNewAddApp.controllers",
        "services.permission"
    ])
        .config([
            '$stateProvider',
            function ($stateProvider) {

                $stateProvider.state('activity.oldandnewadd', {
                    title:'添加页面',
                    url: '/oldandnewadd?templateId&activityId&activityType',
                    templateUrl: 'modules/micro-activity-oldandnew-add-app/micro-activity-oldandnew-add-app.html',
                    controller: 'MicroActivityOldAndNewAddAppController',
                    resolve: {
                        permission: ["permissionService", "$stateParams", function (permissionService, $stateParams) {
                            //统一增加后台页面的Loading效果 by xp 2015年11月13日 16:09:13
                            $(".lockMask-loading2").show();
                            return permissionService.hasPermission();
                        }]
                    }

                });

            }
        ]);
});
