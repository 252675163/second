"use strict";
/**
 * author :小潘
 * time: 2015年9月9日 20:22:48
 * description: 微活动主模块，warning ：编辑模块强依赖首页siteModel
 */


define([
    "ionic",
    "modules/microsite-edit-app/directive",
    "modules/microsite-edit-app/controller",
    //微官网模板组件
    //"components/templates/micro-site-template/app",
    "services/permission",
    "services/net/common"
], function() {

    return angular.module("MicroSiteEditApp", [
            "ionic",
            "MicroSiteEditApp.directives",
            "MicroSiteEditApp.controllers",
            "MicroTemplate",
            "services.permission",
            "services.net.common"
        ])
        .config([
            "$stateProvider",
            function($stateProvider) {

                $stateProvider.state("site.edit", {
                    url: "/edit?templateId&websiteId&isHold",
                    title: "编辑我的场景",
                    templateUrl: "modules/microsite-edit-app/microsite-edit-app.html",
                    controller: "MicroSiteEditAppController",
                    resolve: {
                        webSite: [
                            "siteEditNetService", "$stateParams", "$rootScope", "commonNetService",
                            function(siteEditNetService, $stateParams, $rootScope, commonNetService) {
                                //统一增加后台页面的Loading效果 by xp 2015年11月13日 16:09:13
                                $(".lockMask-loading2").show();
                                return siteEditNetService.getWebSite($stateParams.websiteId).then(function(result) {

                                    var webSite = result.data;
                                    //数据统计
                                    commonNetService.saveBackLog({ OriginId: webSite.Id, Type: "Website", Operation: "Edit" }).then(function(res) {
                                        //统一增加后台页面的Loading效果 by xp 2015年11月13日 16:09:13
                                        if (!$rootScope.isFirstLoad) {
                                            $timeout(function() {
                                                $(".lockMask-loading2").hide();
                                                $rootScope.isFirstLoad = true;
                                            }, 1833);
                                        } else {
                                            $(".lockMask-loading2").hide();
                                        }
                                    });

                                    return webSite;

                                });
                            }
                        ],
                        permission: [
                            "permissionService", "$stateParams",
                            function(permissionService, $stateParams) {
                                return permissionService.hasPermission() && permissionService.hasPhone();
                            }
                        ]
                    }

                });

            }
        ]);
});