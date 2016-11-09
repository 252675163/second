"use strict";
/**
 * author: 
 * time:
 * description:商品管理
 */


define([
    "ionic",
    "modules/micro-shop-management-product-app/controller",
    "services/permission"
], function () {

    return angular.module("MicroShopManagementProductApp", [
        "ionic",
        "MicroShopManagementProductApp.controllers",
        "services.permission"
    ])
        .config([
            '$stateProvider',
            function ($stateProvider) {

                $stateProvider.state('microshopmanagement.index.product', {
                    title:'商品管理',
                    cache: false,
                    url: '/product',
                    templateUrl: 'modules/micro-shop-management-product-app/micro-shop-management-product-app.html',
                    controller: 'MicroShopManagementProductAppController',
                    resolve: {
                        permission: ["permissionService", "$stateParams", function (permissionService, $stateParams) {

                            //统一增加后台页面的Loading效果
                            $(".lockMask-loading2").show();
                            return permissionService.hasPermission();
                        }]
                    }

                });

            }
        ]);
});
