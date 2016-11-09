"use strict";
/**
 * author: 
 * time:
 * description:微店首页
 */


define([
    "ionic",
    "modules/micro-shop-order-check-app/controller",
    "services/permission"
], function() {

    return angular.module("MicroShopOrderCheckApp", [
            "ionic",
            "MicroShopOrderCheckApp.controllers",
            "services.permission"
        ])
        .config([
            '$stateProvider',
            function($stateProvider) {

                $stateProvider.state('microshop.ordercheck', {
                    title: '订单详情',
                    cache: false,
                    url: '/ordercheck?orderId',
                    templateUrl: 'modules/micro-shop-order-check-app/micro-shop-order-check-app.html',
                    controller: 'MicroShopOrderCheckAppController',
                    resolve: {
                        permission: ["permissionService", "$stateParams", function(permissionService, $stateParams) {
                            //统一增加后台页面的Loading效果
                            $(".lockMask-loading2").show();
                            return ;
                        }]
                    }

                });

            }
        ]);
});