"use strict";
/**
 * author :
 * time: 
 * description: 报名本模块
 */


define([
    "ionic",
    "modules/micro-registrationbook-app/controller",
    /*"modules/micro-registrationbook-all-app/app",
    "modules/micro-registrationbook-ongoing-app/app",
    "modules/micro-registrationbook-search-app/app",*/
    "modules/micro-registrationbook-app/filters",
    "services/permission"
    //挂载微官网子模块
], function() {

    return angular.module("MicroRegistrationBookApp", [
            "ionic",
            "MicroRegistrationBookApp.controllers",
            // "MicroRegistrationBookAllApp",
            // "MicroRegistrationBookOngoingApp",
            // "MicroRegistrationbookSearchApp",
            "TitleFilter",
            "services.permission",
        ])
        .config([
            "$stateProvider",
            function($stateProvider) {

                $stateProvider.state("registrationbook", {
                    title: "咨询本",
                    cache: false,
                    url: "/registrationbook",
                    abstract: true,
                    templateUrl: "modules/micro-registrationbook-app/micro-registrationbook-app.html",
                    controller: "MicroRegistrationBookAppController",
                    resolve: {
                        erpUserInfo: ["permissionService", function(permissionService) {
                            return permissionService.getErpUserInfo().then(function(re) {
                                return re;
                            });
                        }]
                    }
                });

            }
        ]);
});