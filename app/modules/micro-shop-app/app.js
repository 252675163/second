"use strict";
/**
 * author: 
 * time:
 * description:微店首页
 */


define([
    "ionic",
    "modules/micro-shop-app/controller",
    "services/permission"
], function () {

    return angular.module("MicroShopApp", [
        "ionic",
        "MicroShopApp.controllers",
        "services.permission"
    ])
        .config([
            '$stateProvider',
            function ($stateProvider) {

                $stateProvider.state('microshop', {
                    title: '',
                    cache: false,
                    url: '/microshop?shopId',
                    templateUrl: 'modules/micro-shop-app/micro-shop-app.html',
                    controller: 'MicroShopAppController',
                    resolve: {
                        microShopUser: ["permissionService", "$stateParams", "$location", function (permissionService, $stateParams, $location) {
                            window.wx && window.wx.hideOptionMenu();
                            var url = $location.absUrl();
                            if (url.indexOf("/MicroShop/Share") == -1) {
                                return null;
                            }
                            return permissionService.getMicroShopUser();
                        }],
                        microShopModelById: ["permissionService","$stateParams",function(permissionService,$stateParams) {
                            return permissionService.microShopModelById($stateParams.shopId).then(function (re) {
                                return re;
                            });
                        }]
                    }

                });

            }
        ]);
});
