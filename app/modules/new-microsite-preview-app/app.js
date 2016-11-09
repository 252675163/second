"use strict";
/**
 * author :小潘
 * time: 2015年12月1日 15:18:35
 * description: 新微官网预览模块
 */


define([
    "ionic",
    "modules/new-microsite-preview-app/directive",
    "modules/new-microsite-preview-app/controller",
    //微官网模板组件
    // "components/templates/new-micro-site-template/app",
    "services/permission",
    "services/net/common"
], function() {

    return angular.module("NewMicroSitePreviewApp", [
            "ionic",
            "NewMicroSitePreviewApp.directives",
            "NewMicroSitePreviewApp.controllers",
            // "NewMicroTemplate",
            "services.permission",
            "services.net.common"
        ])
        .config([
            "$stateProvider",
            function($stateProvider) {
                $stateProvider.state("newsite.preview", {
                    url: "/preview?templateId&websiteId&isNew",
                    title: "预览我的场景",
                    templateUrl: "modules/new-microsite-preview-app/new-microsite-preview-app.html",
                    controller: "NewMicroSitePreviewAppController",
                    resolve: {
                        webSite: [
                            "newSitePreviewNetService", "$stateParams", "$rootScope", "commonNetService","$timeout",
                            function(newSitePreviewNetService, $stateParams, $rootScope, commonNetService,$timeout) {
                                $(".lockMask-loading2").show();

                                return newSitePreviewNetService.getWebSite($stateParams.websiteId).then(function(result) {

                                    var webSite = result.data;
                                    //数据统计
                                    commonNetService.saveBackLog({ OriginId: webSite.Id, Type: "Website", Operation: "Preview" }).then(function(res) {
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
                                    });
                                    return webSite;
                                });

                            }
                        ],
                        permission: [
                            "permissionService", "$stateParams", function(permissionService, $stateParams) {
                                return permissionService.hasPermission();
                            }
                        ]
                    }

                });

            }
        ]);
});