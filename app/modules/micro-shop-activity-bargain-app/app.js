"use strict";
/**
 * author: 
 * time:
 * description:微店首页
 */


define([
    "ionic",
    "modules/micro-shop-activity-bargain-app/controller",
    "services/permission"
], function () {

    return angular.module("MicroShopActivityBargainApp", [
        "ionic",
        "MicroShopActivityBargainApp.controllers",
        "services.permission"
    ])
        .config([
            '$stateProvider',
            function ($stateProvider) {

                $stateProvider.state('microshop.activity.bargain', {
                    title: '活动详情',
                    cache: false,
                    url: '/bargain?activityUserId&productId&isFirstLoad',
                    templateUrl: 'modules/micro-shop-activity-bargain-app/micro-shop-activity-bargain-app.html',
                    controller: 'MicroShopActivityBargainAppController',
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
