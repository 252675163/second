"use strict";
/**
 * author: 
 * time:
 * description:微店首页
 */


define([
    "ionic",
    "modules/micro-shop-koubei-app/controller",
    "services/permission"
], function () {

    return angular.module("MicroShopKoubeiApp", [
        "ionic",
        "MicroShopKoubeiApp.controllers",
        "services.permission"
    ])
        .config([
            '$stateProvider',
            function ($stateProvider) {

                $stateProvider.state('microshopkoubei', {
                    title: '',
                    cache: false,
                    url: '/microshopkoubei',
                    templateUrl: 'modules/micro-shop-koubei-app/micro-shop-koubei-app.html',
                    controller: 'MicroShopKoubeiAppController',
                    resolve: {
                        
                    }

                });

            }
        ]);
});
