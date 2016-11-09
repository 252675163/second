"use strict";
/**
 * author: 
 * time:
 * description:我的订单
 */


define([
    "ionic",
    "modules/micro-shop-my-order-app/controller",
    "services/permission"
], function() {

    return angular.module("MicroShopMyOrderApp", [
            "ionic",
            "MicroShopMyOrderApp.controllers",
            "services.permission"
        ])
        .config([
            '$stateProvider',
            function($stateProvider) {

                $stateProvider.state('microshop.index.myorder', {
                    title: '我的订单',
                    cache: false,
                    url: '/myorder',
                    templateUrl: 'modules/micro-shop-my-order-app/micro-shop-my-order-app.html',
                    controller: 'MicroShopMyOrderAppController',
                    resolve: {
                        permission: ["permissionService", "$stateParams", function(permissionService, $stateParams) {
                            window.wx && window.wx.hideOptionMenu();
                            //统一增加后台页面的Loading效果
                            $(".lockMask-loading2").show();
                            return ;
                        }]
                    }

                });

            }
        ]);
});