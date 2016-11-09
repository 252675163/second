"use strict";
/**
 * author :小潘
 * time: 2015年9月9日 20:22:48
 * description: 微官网发布模块
 */


define([
    "ionic",
    "modules/microsite-publish-app/directive",
    "modules/microsite-publish-app/controller",
    "services/permission",
    "services/net/common"
], function() {

    return angular.module("MicroSitePublishApp", [
            "ionic",
            "MicroSitePublishApp.directives",
            "MicroSitePublishApp.controllers",
            "services.permission",
            "services.net.common"
        ])
        .config([
            "$stateProvider",
            function($stateProvider) {

                $stateProvider.state("site.publish", {
                    url: "/publish?templateId&userId&websiteId",
                    title: '发布我的场景',
                    templateUrl: "modules/microsite-publish-app/microsite-publish-app.html",
                    controller: "MicroSitePublishAppController",
                    resolve: {
                        permission: ["permissionService", "$stateParams", function (permissionService, $stateParams) {
                            return permissionService.hasPermission();
                        }]
                    }

                });

            }
        ]);
});