"use strict";
/**
 * author
 * time:
 * description:咨询本搜索页
 */


define([
    "ionic",
    "modules/micro-registrationbook-search-app/controller",
    "services/permission"
], function () {
    return angular.module("MicroRegistrationbookSearchApp", [
        "ionic",
        "MicroRegistrationbookSearchApp.controllers",
        "services.permission"
    ])
        .config([
            '$stateProvider',
            function ($stateProvider) {

                $stateProvider.state('registrationbook.registrationbooksearch', {
                    title: '搜索',
                    cache: false,
                    url: '/registrationbooksearch',
                    templateUrl: 'modules/micro-registrationbook-search-app/micro-registrationbook-search-app.html',
                    controller: 'microRegistrationbookSearchAppController',
                    resolve: {
                        permission: ["permissionService", "$stateParams", function (permissionService, $stateParams) {
                            //搜索百度统计
                            if (window._hmt) {
                                window._hmt.push(['_trackPageview', "/client/search"]);
                            }

                            return permissionService.hasPermission();
                        }]
                    }
                });

            }
        ]);
});