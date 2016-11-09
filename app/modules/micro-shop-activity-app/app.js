"use strict";
/**
 * author: 
 * time:
 * description:微店首页
 */


define([
    "ionic",
    "modules/micro-shop-activity-app/controller",
    "services/permission"
], function () {

    return angular.module("MicroShopActivityApp", [
        "ionic",
        "MicroShopActivityApp.controllers",
        "services.permission"
    ])
        .config([
            '$stateProvider',
            function ($stateProvider) {

                $stateProvider.state('microshop.activity', {
                    title:'',
                    cache: false,
                    url: '/activity',
                    templateUrl: 'modules/micro-shop-activity-app/micro-shop-activity-app.html',
                    controller: 'MicroShopActivityAppController',
                    resolve: {
                      
                    }

                });

            }
        ]);
});
