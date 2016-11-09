"use strict";
/**
 * author :xu jie
 * time: 
 * description: 跟进列表
 */


define([
    "ionic",
    "echarts",
    "modules/micro-registrationbook-statistics-app/controller",
    "services/permission",
    "services/net/common"
    
    //"modules/micro-registrationbook-app/filters"*/
    //挂载微官网子模块
], function () {

    return angular.module("MicroRegistrationBookStatisticsApp", [
            "ionic",
            "MicroRegistrationBookStatisticsApp.controllers",
            "services.permission",
            "services.net.common"
            // "TitleFilter"
    ])
        .config([
            "$stateProvider",
            function ($stateProvider) {

                $stateProvider.state("registrationbook.statistics", {
                    title: "咨询本",
                    cache: false,
                    url: "/statistics",
                    templateUrl: "modules/micro-registrationbook-statistics-app/micro-registrationbook-statistics-app.html",
                    controller: "MicroRegistrationBookStatisticsAppController",
                    resolve: {
                        permission: [
                            "permissionService", "$stateParams",function (permissionService, $stateParams) {

                                //进入跟进列表百度统计埋点
                                if (window._hmt) {
                                    $stateParams.trace && window._hmt.push(['_trackPageview', "/registrationbook/" + $stateParams.trace]);
                                    window._hmt.push(['_trackPageview', "/registrationbook/CRMongong"]);
                                }

                                return permissionService.hasPermission();
                            }
                        ]
                    }
                });

            }
        ]);
});