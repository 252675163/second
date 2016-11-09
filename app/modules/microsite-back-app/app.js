"use strict";
/**
 * author :LTD
 * time: 2015年9月11日 15:03:48
 * description: 微官网更换背景模块
 */


define([
    "ionic",
    "modules/microsite-back-app/controller",
    "services/permission"
], function () {

    return angular.module("MicroSiteBackApp", [
        "ionic",
        "MicroSiteBackApp.controllers",
        "services.permission"
    ])
        .config([
            '$stateProvider',
            function ($stateProvider) {

                $stateProvider.state('site.back', {
                    url: '/back?page?section&templateId&websiteId',
                    title: '我的背景库',
                    templateUrl: 'modules/microsite-back-app/microsite-back-app.html',
                    controller: 'MicroSiteBackAppController',
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
