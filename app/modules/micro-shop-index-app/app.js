"use strict";
/**
 * author: 
 * time:
 * description:微店首页
 */


define([
    "ionic",
    "modules/micro-shop-index-app/controller",
    "services/permission"
], function () {

    return angular.module("MicroShopIndexApp", [
        "ionic",
        "MicroShopIndexApp.controllers",
        "services.permission"
    ])
        .config([
            '$stateProvider',
            function ($stateProvider) {

                $stateProvider.state('microshop.index', {
                    title:'我的微店',
                    cache: false,
                    url: '/index',
                    templateUrl: 'modules/micro-shop-index-app/micro-shop-index-app.html',
                    controller: 'MicroShopIndexAppController',
                    resolve: {
                    }

                });

            }
        ]);
});
