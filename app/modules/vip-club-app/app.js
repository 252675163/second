"use strict";
/**
 * author: 
 * time:
 * description:新建广告Banner页面
 */


define([
    "ionic",
    "modules/vip-club-app/controller",
    "services/permission"
], function () {

    return angular.module("VIPclubApp", [
        "ionic",
        "VIPclubApp.controllers",
        "services.permission"
    ])
        .config([
            '$stateProvider',
            function ($stateProvider) {

                $stateProvider.state('VIPclub', {
                    title:'VIP商店',
                    cache: false,
                    url: '/VIPclub',
                    templateUrl: 'modules/vip-club-app/template.html',
                    controller: 'VIPclubAppController',
                    resolve: {
                        permission: ["permissionService", "$stateParams", function (permissionService, $stateParams) {
                            if (window._hmt) {
                                window._hmt.push(['_trackPageview', '/VIPclub']);
                            }

                            //统一增加后台页面的Loading效果
                            $(".lockMask-loading2").show();
                            return permissionService.hasPermission();
                        }]
                    }

                });

            }
        ]);
});
