"use strict";
/**
 * author: 
 * time:
 * description:微店首页
 */


define([
    "ionic",
    "modules/micro-shop-koubei-create-shop-app/controller",
    "services/permission"
], function () {

    return angular.module("MicroShopKoubeiCreateShopApp", [
        "ionic",
        "MicroShopKoubeiCreateShopApp.controllers",
        "services.permission"
    ])
        .config([
            '$stateProvider',
            function ($stateProvider) {

                $stateProvider.state('microshopkoubei.createshop', {
                    title: '填写开店信息',
                    cache: true,
                    url: '/createshop',
                    templateUrl: 'modules/micro-shop-koubei-create-shop-app/micro-shop-koubei-create-shop-app.html',
                    controller: 'MicroShopKoubeiCreateShopAppController',
                    resolve: {
                        
                    }

                });

            }
        ]);
});
