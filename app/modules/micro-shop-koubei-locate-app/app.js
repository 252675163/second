"use strict";
/**
 * author: 
 * time:
 * description:微店口碑开店定位页面
 */


define([
    "ionic",
    "modules/micro-shop-koubei-locate-app/controller",
    "services/permission"
], function () {

    return angular.module("MicroShopKoubeiLocateApp", [
        "ionic",
        "MicroShopKoubeiLocateApp.controllers",
        "services.permission"
    ])
        .config([
            '$stateProvider',
            function ($stateProvider) {

                $stateProvider.state('microshopkoubei.locate', {
                    title: '选择地址',
                    cache: true,
                    url: '/locate',
                    templateUrl: 'modules/micro-shop-koubei-locate-app/micro-shop-koubei-locate-app.html',
                    controller: 'MicroShopKoubeiLocateAppController',
                    resolve: {
                        
                    }

                });

            }
        ]);
});
