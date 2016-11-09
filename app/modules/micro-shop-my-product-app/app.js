"use strict";
/**
 * author: 
 * time:
 * description:我的商品
 */


define([
    "ionic",
    "modules/micro-shop-my-product-app/controller",
    "services/permission"
], function() {

    return angular.module("MicroShopMyProductApp", [
            "ionic",
            "MicroShopMyProductApp.controllers",
            "services.permission"
        ])
        .config([
            '$stateProvider',
            function($stateProvider) {

                $stateProvider.state('microshop.index.myproduct', {
                    title: '我的商品',
                    cache: false,
                    url: '/myproduct',
                    templateUrl: 'modules/micro-shop-my-product-app/micro-shop-my-product-app.html',
                    controller: 'MicroShopMyProductAppController',
                    resolve: {
                        permission: ["permissionService", "$stateParams", function(permissionService, $stateParams) {
                            window.wx && window.wx.hideOptionMenu();
                            //统一增加后台页面的Loading效果
                            $(".lockMask-loading2").show();
                            return;
                        }]
                    }

                });

            }
        ]);
});