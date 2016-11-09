"use strict";
/**
 * author:yinglechao
 * time:
 * description:官网选择模式（简约版、xxx版）
 */


define([
    "ionic",
    "modules/new-microsite-mode-app/controller",
    "services/permission"
], function () {

    return angular.module("MicroSiteModeApp", [
        "ionic",
        "MicroSiteModeApp.controllers",
        "services.net.newSiteEdit",      
        "services.permission"
    ])
        .config([
            '$stateProvider',
            function ($stateProvider) {

                $stateProvider.state('newsite.chooseMode', {
                    title:'方案库',
                    url: '/chooseMode?websiteId&templateId&go',
                    templateUrl: 'modules/new-microsite-mode-app/micro-activity-new-app.html',
                    controller: 'microSiteModeAppController',
                    resolve: {                       
                        permission: ["permissionService", "$stateParams", function (permissionService, $stateParams) {
                            return permissionService.hasPermission();
                        }],
                         webSite: [
                            "newSiteEditNetService", "$stateParams", "$rootScope", "commonNetService","$timeout",
                            function (newSiteEditNetService, $stateParams, $rootScope, commonNetService,$timeout) {
                                //统一增加后台页面的Loading效果 by xp 2015年11月13日 16:09:13
                                $(".lockMask-loading2").show();
                                return newSiteEditNetService.getWebSite($stateParams.websiteId).then(function(result) {

                                    var webSite = result.data;
                                    //数据统计
                                    //统一增加后台页面的Loading效果 by xp 2015年11月13日 16:09:13
                                    if (!$rootScope.isFirstLoad) {
                                        $timeout(function () {
                                            $(".lockMask-loading2").hide();
                                            $rootScope.isFirstLoad = true;
                                        }, 1833);
                                    } else {
                                        $timeout(function () {
                                            $(".lockMask-loading2").hide();
                                            $rootScope.isFirstLoad = true;
                                        }, 1000);
                                    }

                                    return webSite;

                                });
                            }
                        ]
                    }

                });

            }
        ]);
});
