"use strict";
/**
 * author: 
 * time:
 * description:新建广告Banner页面
 */


define([
    "ionic",
    "modules/micro-shop-management-product-edit-app/controller",
    "services/permission"
], function () {

    return angular.module("MicroShopManagementProductEditApp", [
        "ionic",
        "MicroShopManagementProductEditApp.controllers",
        "services.permission"
    ])
        .config([
            '$stateProvider',
            function ($stateProvider) {

                $stateProvider.state('microshopmanagement.productedit', {
                    title:'新增商品',
                    cache: false,
                    url: '/productedit?id',
                    templateUrl: 'modules/micro-shop-management-product-edit-app/micro-shop-management-product-edit-app.html',
                    controller: 'MicroShopManagementProductEditAppController',
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
