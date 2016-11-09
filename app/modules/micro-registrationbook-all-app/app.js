"use strict";
/**
 * author :xujie luhao zhouhuijuan
 * update time:2016/10/8
 * description:咨询本全部列表
 */


define([
    "ionic",
    "modules/micro-registrationbook-all-app/controller",
    "services/permission",
    "services/net/common"/*,
    "modules/micro-registrationbook-app/filters"*/
    //挂载微官网子模块
], function () {

    return angular.module("MicroRegistrationBookAllApp", [
            "ionic",
            "MicroRegistrationBookAllApp.controllers",
            "services.permission",
            "services.net.common",
            //"TitleFilter"
    ])
        .config([
            "$stateProvider",
            function ($stateProvider) {

                $stateProvider.state("registrationbook.registrationbookall", {
                    title: "咨询本",
                    cache: false,
                    url: "/registrationbookall?id&type&trace",
                    templateUrl: "modules/micro-registrationbook-all-app/micro-registrationbook-all-app.html",
                    controller: "MicroRegistrationBookAllAppController",
                    resolve: {
                        permission: [
                            "permissionService", "$stateParams", function (permissionService, $stateParams) {

                                if (window._hmt) {
                                    $stateParams.trace && window._hmt.push(['_trackPageview', "/" + $stateParams.trace]);
                                    window._hmt.push(['_trackPageview', "/client"]);
                                }
                                return permissionService.hasPermission();
                            }
                        ]
                    },
                });

            }
        ]);
});