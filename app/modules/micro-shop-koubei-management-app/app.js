"use strict";
/**
 * author: 
 * time:
 * description:微店管理首页
 */


define([
    "ionic",
    "modules/micro-shop-koubei-management-app/controller",
    "services/permission"
], function() {

    return angular.module("MicroShopKoubeiManagementApp", [
            "ionic",
            "MicroShopKoubeiManagementApp.controllers",
            "services.permission"
        ])
        .config([
            '$stateProvider',
            function($stateProvider) {

                $stateProvider.state('microshopkoubei.management', {
                    title: '我的微店',
                    cache: false,
                    url: '/management',
                    templateUrl: 'modules/micro-shop-koubei-management-app/micro-shop-koubei-management-app.html',
                    controller: 'MicroShopKoubeiManagementAppController',
                    resolve: {
                        permission: [function() {
                            //统一增加后台页面的Loading效果
                            $(".lockMask-loading2").show();
                        }]
                    }

                });

            }
        ]);
});