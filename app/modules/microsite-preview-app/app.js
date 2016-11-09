"use strict";
/**
 * author :LTD
 * time: 2015年9月12日 14:43:48
 * description: 微官网预览模块
 */


define([
    "ionic",
    "modules/microsite-preview-app/directive",
    "modules/microsite-preview-app/controller",
    //微官网模板组件
    //"components/templates/micro-site-template/app",
    "services/permission",
    "services/net/common"
], function() {

    return angular.module("MicroSitePreviewApp", [
            "ionic",
            "MicroSitePreviewApp.directives",
            "MicroSitePreviewApp.controllers",
            "MicroTemplate",
            "services.permission",
            "services.net.common"
        ])
        .config([
            "$stateProvider",
            function($stateProvider) {

                $stateProvider.state("site.preview", {
                    url: "/preview?templateId&websiteId&isHold",
                    title: "预览我的场景",
                    templateUrl: "modules/microsite-preview-app/microsite-preview-app.html",
                    controller: "MicroSitePreviewAppController",
                    resolve: {
                        webSite: [
                            "sitePreviewNetService", "$stateParams", "$rootScope", "commonNetService",
                            function(sitePreviewNetService, $stateParams, $rootScope, commonNetService) {

                                return sitePreviewNetService.getWebSite($stateParams.websiteId).then(function(result) {

                                    var webSite = result.data;
                                    //数据统计
                                    commonNetService.saveBackLog({ OriginId: webSite.Id, Type: "webSite", Operation: "Preview" });
                                    return webSite;
                                });

                            }
                        ],
                        permission: [
                            "permissionService", "$stateParams",
                            function(permissionService, $stateParams) {
                                return permissionService.hasPermission();
                            }
                        ]
                    }

                });

            }
        ]);
});