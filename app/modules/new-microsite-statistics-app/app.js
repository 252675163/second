"use strict";
/**
 * author :小潘
 * time: 2015年9月9日 20:22:48
 * description: 微官网数据统计模块
 */


define([
    "ionic",
    "modules/new-microsite-statistics-app/directive",
    "modules/new-microsite-statistics-app/controller",
    "services/permission",
    "services/net/common"
    //挂载微官网子模块
], function () {

    return angular.module("NewMicroSiteStatisticsApp", [
        "ionic",
        "NewMicroSiteStatisticsApp.directives",
        "NewMicroSiteStatisticsApp.controllers",
        "services.permission",
        "services.net.common"
    ])
        .config([
            '$stateProvider',
            function ($stateProvider) {

                $stateProvider.state('newsite.statistics', {
                    cache:false,
                    title: '数据统计',
                    url: '/statistics?websiteId&templateType',
                    templateUrl: 'modules/new-microsite-statistics-app/microsite-statistics-app.html',
                    controller: 'NewMicroSiteStatisticsAppController',
                    resolve: {
                        permission: [
                            "permissionService", "$stateParams", function (permissionService, $stateParams) {
                                //统一增加后台页面的Loading效果 by xp 2015年11月13日 16:09:13
                                $(".lockMask-loading2").show();
                                return permissionService.hasPermission();
                            }
                        ]
                    }

                });

            }
        ]);
});
