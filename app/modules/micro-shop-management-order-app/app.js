"use strict";
/**
 * author: 
 * time:
 * description:订单管理
 */


define([
    "ionic",
    "modules/micro-shop-management-order-app/controller",
    "services/permission"
], function () {

    return angular.module("MicroShopManagementOrderApp", [
        "ionic",
        "MicroShopManagementOrderApp.controllers",
        "services.permission"
    ])
        .config([
            '$stateProvider',
            function ($stateProvider) {

                $stateProvider.state('microshopmanagement.index.order', {
                    title:'订单管理',
                    cache: false,
                    url: '/order',
                    templateUrl: 'modules/micro-shop-management-order-app/micro-shop-management-order-app.html',
                    controller: 'MicroShopManagementOrderAppController',
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
