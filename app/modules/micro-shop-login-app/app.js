"use strict";
/**
 * author: 
 * time:
 * description:微店登录
 */


define([
    "ionic",
    "modules/micro-shop-login-app/controller",
    "services/permission"
], function() {

    return angular.module("MicroShopLoginApp", [
            "ionic",
            "MicroShopLoginApp.controllers",
            "services.permission"
        ])
        .config([
            '$stateProvider',
            function($stateProvider) {

                $stateProvider.state('microshop.login', {
                    title: '登录页',
                    cache: false,
                    url: '/login?productId&jumpType',
                    templateUrl: 'modules/micro-shop-login-app/micro-shop-login-app.html',
                    controller: 'MicroShopLoginAppController',
                    resolve: {
                        permission: ["permissionService", "$stateParams", function(permissionService, $stateParams) {

                            //统一增加后台页面的Loading效果
                            $(".lockMask-loading2").show();
                            return;
                        }]
                    }

                });

            }
        ]);
});