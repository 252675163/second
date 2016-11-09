"use strict";
/**
 * author: 
 * time:
 * description:微店首页
 */


define([
    "ionic",
    "modules/micro-shop-my-shop-app/controller",
    "services/permission",
    "modules/micro-shop-my-shop-app/filter"
], function () {

    return angular.module("MicroShopMyShopApp", [
        "ionic",
        "MicroShopMyShopApp.controllers",
        "services.permission",
        "MicroShopMyShopApp.Filter"
    ])
        .config([
            '$stateProvider',
            function ($stateProvider) {

                $stateProvider.state('microshop.index.myshop', {
                    title: '我的店铺',
                    cache: false,
                    url: '/myshop?type&isFirstLoad',
                    templateUrl: 'modules/micro-shop-my-shop-app/micro-shop-my-shop-app.html',
                    controller: 'MicroShopMyShopAppController',
                    resolve: {
                        permission: ["permissionService", "$stateParams", function (permissionService, $stateParams) {

                            //统一增加后台页面的Loading效果
                            $(".lockMask-loading2").show();
                            return ;
                        }]
                    }

                });

            }
        ]);
});
