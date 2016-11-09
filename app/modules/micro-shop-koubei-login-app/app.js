"use strict";
/**
 * author: 
 * time:
 * description:
 */


define([
    "ionic",
    "modules/micro-shop-koubei-login-app/controller",
    "services/permission"
], function () {

    return angular.module("MicroShopKoubeiLoginApp", [
        "ionic",
        "MicroShopKoubeiLoginApp.controllers",
        "services.permission"
    ])
        .config([
            '$stateProvider',
            function ($stateProvider) {

                $stateProvider.state('microshopkoubei.login', {
                    title: '校宝秀登陆',
                    cache: false,
                    url: '/login?app_id&source&scope&auth_type&auth_code',
                    //url: '/login',
                    templateUrl: 'modules/micro-shop-koubei-login-app/micro-shop-koubei-login-app.html',
                    controller: 'MicroShopKoubeiLoginAppController',
                    resolve: {
                        

                    }

                });

            }
        ]);
});
