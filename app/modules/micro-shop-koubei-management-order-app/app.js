"use strict";
/**
 * author: 
 * time:
 * description:订单管理
 */


define([
    "ionic",
    "modules/micro-shop-koubei-management-order-app/controller",
    "services/permission"
], function() {

    return angular.module("MicroShopKoubeiManagementOrderApp", [
            "ionic",
            "MicroShopKoubeiManagementOrderApp.controllers",
            "services.permission"
        ])
        .config([
            '$stateProvider',
            function($stateProvider) {

                $stateProvider.state('microshopkoubei.management.order', {
                    title: '订单管理',
                    cache: false,
                    url: '/order',
                    templateUrl: 'modules/micro-shop-koubei-management-order-app/micro-shop-koubei-management-order-app.html',
                    controller: 'MicroShopKoubeiManagementOrderAppController',
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