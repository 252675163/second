"use strict";
/**
 * author :LTD
 * time: 2015年9月11日 15:03:48
 * description: 微活动增加页面模块
 */


define([
    "ionic",
    "modules/micro-activity-oldandnew-back-app/controller",
    "services/permission"
], function() {

    return angular.module("MicroActivityOldAndNewBackApp", [
            "ionic",
            "MicroActivityOldAndNewBackApp.controllers",
            "services.permission"
        ])
        .config([
            '$stateProvider',
            function($stateProvider) {

                $stateProvider.state('activity.oldandnewback', {
                    title: '我的背景库',
                    url: '/oldandnewback?templateId&activityId&activityType',
                    templateUrl: 'modules/micro-activity-oldandnew-back-app/micro-activity-oldandnew-back-app.html',
                    controller: 'MicroActivityOldAndNewBackAppController',
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