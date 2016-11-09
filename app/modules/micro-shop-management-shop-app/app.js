"use strict";
/**
 * author: 
 * time:
 * description:店铺管理
 */


define([
    "ionic",
    "modules/micro-shop-management-shop-app/controller",
    "services/permission"
], function () {

    return angular.module("MicroShopManagementShopApp", [
        "ionic",
        "MicroShopManagementShopApp.controllers",
        "services.permission"
    ])
        .config([
            '$stateProvider',
            function ($stateProvider) {

                $stateProvider.state('microshopmanagement.index.shop', {
                    title:'店铺管理',
                    cache: false,
                    url: '/shop',
                    templateUrl: 'modules/micro-shop-management-shop-app/micro-shop-management-shop-app.html',
                    controller: 'MicroShopManagementShopAppController',
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
