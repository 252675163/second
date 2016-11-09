"use strict";
/**
 * author: 
 * time:
 * description:商品管理
 */


define([
    "ionic",
    "modules/micro-shop-koubei-management-product-app/controller",
    "services/permission"
], function() {

    return angular.module("MicroShopKoubeiManagementProductApp", [
            "ionic",
            "MicroShopKoubeiManagementProductApp.controllers",
            "services.permission"
        ])
        .config([
            '$stateProvider',
            function($stateProvider) {

                $stateProvider.state('microshopkoubei.management.product', {
                    title: '商品管理',
                    cache: false,
                    url: '/product',
                    templateUrl: 'modules/micro-shop-koubei-management-product-app/micro-shop-koubei-management-product-app.html',
                    controller: 'MicroShopKoubeiManagementProductAppController',
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