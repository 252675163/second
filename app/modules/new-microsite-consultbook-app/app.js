"use strict";
/**
 * author :小潘
 * time: 2015年9月9日 20:22:48
 * description: 微官网数据统计模块
 */


define([
    "ionic",
    "modules/new-microsite-consultbook-app/controller",
    "services/permission",
    "services/net/common",
    "modules/new-microsite-consultbook-app/filters"
    //挂载微官网子模块
], function() {

    return angular.module("NewMicrositeConsultBookApp", [
            "ionic",
            "NewMicrositeConsultBookApp.controllers",
            "services.permission",
            "services.net.common",
            "TitleFilter"
        ])
        .config([
            "$stateProvider",
            function($stateProvider) {

                $stateProvider.state("newsite.consultbook", {
                    title: "咨询本",
                    cache: false,
                    url: "/consultbook?id&type&trace",
                    templateUrl: "modules/new-microsite-consultbook-app/micro-consultbook-app.html",
                    controller: "NewMicrositeConsultBookAppController",
                    resolve: {
                        permission: [
                            "permissionService", "$stateParams", function (permissionService, $stateParams) {
                                //自定义跟踪页面
                                if (window._hmt) {
                                    window._hmt.push(['_trackPageview', '/consultbook/' + $stateParams.trace]);
                                }
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