"use strict";
/**
 * author:cxd
 * time:2016年6月2日16:03:44
 * description:匹配地理位置信息
 */


define([
    "ionic",
    "modules/user-location-app/controller",
    "services/permission"
], function () {

    return angular.module("UserLocationApp", [
        "ionic",
        "UserLocationApp.controllers",
        "services.permission"
    ])
        .config([
            '$stateProvider',
            function ($stateProvider) {

                $stateProvider.state('userLocation', {
                    title:'机构所在地',
                    cache: false,
                    url: '/userLocation',
                    templateUrl: 'modules/user-location-app/template.html',
                    controller: 'UserLocationAppController',
                    resolve: {
                        permission: ["permissionService", "$stateParams", function (permissionService, $stateParams) {
                            //自定义跟踪页面
                            if (window._hmt) {
                                window._hmt.push(['_trackPageview', "/usercenter/local"]);
                            }
                            //统一增加后台页面的Loading效果 by xp 2015年11月13日 16:09:13
                            $(".lockMask-loading2").show();
                            return permissionService.hasPermission();
                        }]
                    }

                });

            }
        ])
})
