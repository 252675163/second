"use strict";
/**
 * author: 
 * time:
 * description:新建广告Banner页面
 */


define([
    "ionic",
    "modules/micro-shop-koubei-management-productedit-app/controller",
    "services/permission"
], function() {

    return angular.module("MicroShopManagementProductEditApp", [
            "ionic",
            "MicroShopKoubeiManagementProductEditApp.controllers",
            "services.permission"
        ])
        .config([
            '$stateProvider',
            function($stateProvider) {

                $stateProvider.state('microshopkoubei.productedit', {
                    title: '新增商品',
                    cache: false,
                    url: '/productedit?id',
                    templateUrl: 'modules/micro-shop-koubei-management-productedit-app/micro-shop-koubei-management-productedit-app.html',
                    controller: 'MicroShopKoubeiManagementProductEditAppController',
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