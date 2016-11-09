"use strict";
/**
 * author: 
 * time:
 * description:微店首页
 */


define([
    "ionic",
    "modules/micro-shop-product-detail-app/controller",
    "services/permission"
], function() {

    return angular.module("MicroShopProductDetailApp", [
            "ionic",
            "MicroShopProductDetailApp.controllers",
            "services.permission"
        ])
        .config([
            '$stateProvider',
            function($stateProvider) {

                $stateProvider.state('microshop.productdetail', {
                    title: '商品详情',
                    cache: false,
                    url: '/productdetail?productId&type',
                    templateUrl: 'modules/micro-shop-product-detail-app/micro-shop-product-detail-app.html',
                    controller: 'MicroShopProductDetailAppController',
                    resolve: {
                        permission: ["permissionService", "$stateParams", function(permissionService, $stateParams) {

                            //统一增加后台页面的Loading效果
                            $(".lockMask-loading2").show();
                            return;
                        }]
                    }

                });

            }
        ]);
});