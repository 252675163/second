"use strict";
/**
 * author :LTD
 * time: 2015年9月14日 15:35:48
 * description: 微活动老带新yin
 */


define([
    "ionic",
    "modules/micro-activity-oldandnew-audio-app/controller",
    //微官网模板组件
    // "components/templates/micro-activity-template/app",
    "services/permission"
], function () {

    return angular.module("MicroActivityOldAndNewAudioApp", [
        "ionic",
        "MicroActivityOldAndNewAudioApp.controllers",
        // "MicroActiveOldAndNewTemplate",
        "services.permission"
    ])
        .config([
            '$stateProvider',
            function ($stateProvider) {

                $stateProvider.state('activity.oldandnewaudio', {
                    cache: false,
                    title: '我的音乐库',
                    url: '/oldandnewaudio?templateId&activityId&activityType',
                    templateUrl: 'modules/micro-activity-oldandnew-audio-app/micro-activity-oldandnew-audio-app.html',
                    controller: 'MicroActivityOldAndNewAudioAppController',
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
