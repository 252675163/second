"use strict";
/**
 * author :小潘
 * time: 2015年9月9日 20:22:48
 * description: 微官网发布模块
 */


define([
    "ionic",
    "modules/new-microsite-publish-app/directive",
    "modules/new-microsite-publish-app/controller",
    "services/permission",
    "services/net/common"
], function() {

    return angular.module("NewMicroSitePublishApp", [
            "ionic",
            "NewMicroSitePublishApp.directives",
            "NewMicroSitePublishApp.controllers",
            "services.permission",
            "services.net.common"
        ])
        .config([
            "$stateProvider",
            function($stateProvider) {

                $stateProvider.state("newsite.publish", {
                    url: "/publish?templateId&userId&websiteId",
                    title: '同步我的微官网',
                    templateUrl: "modules/new-microsite-publish-app/new-microsite-publish-app.html",
                    controller: "newMicroSitePublishAppController",
                    resolve: {
                        permission: ["permissionService", "$stateParams", function (permissionService, $stateParams) {
                            return permissionService.hasPermission();
                        }]
                    }

                });

            }
        ]);
});