"use strict";
/**
 * author :小潘
 * time: 2015年12月1日 15:18:35
 * description: 新微官网预览模块
 */


define([
    "ionic",
    "modules/new-microsite-style-app/directive",
    "modules/new-microsite-style-app/controller",
    //微官网模板组件
    //"components/templates/new-micro-site-template/app",
    "services/permission",
    "services/net/common"
], function() {

    return angular.module("NewMicroSiteStyleApp", [
            "ionic",
            "NewMicroSiteStyleApp.directives",
            "NewMicroSiteStyleApp.controllers",
            // "NewMicroTemplate",
            "services.permission",
            "services.net.common"
        ])
        .config([
            "$stateProvider",
            function($stateProvider) {

                $stateProvider.state("newsite.style", {
                    url: "/style?templateId&websiteId",
                    title: "更换风格",
                    templateUrl: "modules/new-microsite-style-app/new-microsite-style-app.html",
                    controller: "NewMicroSiteStyleAppController",
                    resolve: {
                        webSite: [
                            "newSitePreviewNetService", "$stateParams", "$rootScope", "commonNetService", "$timeout",
                            function(newSitePreviewNetService, $stateParams, $rootScope, commonNetService, $timeout) {

                                $(".lockMask-loading2").show();

                                return newSitePreviewNetService.getWebSite($stateParams.websiteId).then(function(result) {

                                    var webSite = result.data;
                                    //数据统计
                                    commonNetService.saveBackLog({ OriginId: webSite.Id, Type: "Website", Operation: "Preview" }).then(function(res) {
                                        //统一增加后台页面的Loading效果 by xp 2015年11月13日 16:09:13
                                        if (!$rootScope.isFirstLoad) {
                                            $timeout(function() {
                                                $(".lockMask-loading2").hide();
                                                $rootScope.isFirstLoad = true;
                                            }, 1833);
                                        } else {
                                            $timeout(function() {
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