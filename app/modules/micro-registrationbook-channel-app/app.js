"use strict";
/**
 * author :
 * time: 
 * description:来源模块
 */


define([
    "ionic",
    "modules/micro-registrationbook-channel-app/controller",
    "services/permission",
    "services/net/common"
    
    //"modules/micro-registrationbook-app/filters"*/
    //挂载微官网子模块
], function () {

    return angular.module("MicroRegistrationBookChannelApp", [
            "ionic",
            "MicroRegistrationBookChannelApp.controllers",
            "services.permission",
            "services.net.common"
            // "TitleFilter"
    ])
        .config([
            "$stateProvider",
            function ($stateProvider) {

                $stateProvider.state("registrationbook.channel", {
                    title: "咨询本",
                    cache: false,
                    url: "/channel",
                    templateUrl: "modules/micro-registrationbook-channel-app/micro-registrationbook-channel-app.html",
                    controller: "MicroRegistrationBookChannelAppController",
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