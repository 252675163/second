"use strict";
/**
 * author: 
 * time:
 * description:微店管理首页
 */


define([
    "ionic",
    "modules/micro-shop-management-index-app/controller",
    "services/permission"
], function () {

    return angular.module("MicroShopManagementIndexApp", [
        "ionic",
        "MicroShopManagementIndexApp.controllers",
        "services.permission"
    ])
        .config([
            '$stateProvider',
            function ($stateProvider) {

                $stateProvider.state('microshopmanagement.index', {
                    title: '我的微店',
                    cache: false,
                    url: '/index',
                    templateUrl: 'modules/micro-shop-management-index-app/micro-shop-management-index-app.html',
                    controller: 'MicroShopManagementAppIndexController',
                    resolve: {
                        permission: ["permissionService", "$stateParams", function (permissionService, $stateParams) {

                            //统一增加后台页面的Loading效果
                            //$(".lockMask-loading2").show();
                            return permissionService.hasPermission();
                        }]
                        
                    }

                });

            }
        ]);
});
