"use strict";
/**
 * author :小潘
 * time: 2015年11月6日 15:17:12
 * description: 校宝秀-创建新场景
 */


define([
    "ionic",
    "modules/micro-new-app/controller",
    "services/net/common"
], function() {

    return angular.module("MicroNewApp", [
            "ionic",
            "MicroNewApp.controllers",
            "services.net.common"
        ])
        .config([
            "$stateProvider",
            function($stateProvider) {

                $stateProvider.state("new", {
                    title: "模板库",
                    cache: false,
                    url: "/new?templateType",
                    templateUrl: "modules/micro-new-app/micro-new-app.html",
                    controller: "MicroNewAppController",
                    resolve: {
                        permission: [
                            "permissionService", "$stateParams", function(permissionService, $stateParams) {
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