"use strict";
/**
 * author :小潘
 * time: 2015年9月9日 20:22:48
 * description: 微活动-首页
 */


define([
    "ionic",
    "modules/micro-consultbook-list-app/controller",
    "services/net/common"
], function() {

    return angular.module("MicroConsultBookListApp", [
            "ionic",
            "MicroConsultBookListApp.controllers",
            "services.net.common"
        ])
        .config([
            "$stateProvider",
            function($stateProvider) {

                $stateProvider.state("consultbooklist", {
                    title: "选择场景",
                    cache: false,
                    url: "/consultbooklist?type",
                    templateUrl: "modules/micro-consultbook-list-app/micro-consultbook-list-app.html",
                    controller: "MicroConsultBookListAppController",
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