"use strict";
/**
 * author :LTD
 * time: 2015年9月11日 15:03:48
 * description: 微官网增加页面模块
 */


define([
    "ionic",
    "modules/microsite-add-app/controller",
    "services/permission"
], function () {

    return angular.module("MicroSiteAddApp", [
        "ionic",
        "MicroSiteAddApp.controllers",
        "services.permission"
    ])
        .config([
            '$stateProvider',
            function ($stateProvider) {

                $stateProvider.state('site.add', {
                    url: '/add?templateId&websiteId',
                    title: ' 添加页面',
                    templateUrl: 'modules/microsite-add-app/microsite-add-app.html',
                    controller: 'MicroSiteAddAppController',
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
