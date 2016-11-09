"use strict";
/**
 * author: 
 * time:
 * description:微店管理首页
 */


define([
    "ionic",
    "modules/micro-shop-management-create-app/controller",
    "services/permission"
], function() {

    return angular.module("MicroShopManagementCreateApp", [
            "ionic",
            "MicroShopManagementCreateApp.controllers",
            "services.permission"
        ])
        .config([
            '$stateProvider',
            function($stateProvider) {

                $stateProvider.state('microshopmanagement.create', {
                    title: '创建微店',
                    cache: false,
                    url: '/create',
                    templateUrl: 'modules/micro-shop-management-create-app/micro-shop-management-create-app.html',
                    controller: 'MicroShopManagementCreateAppController',
                    resolve: {
                        permission: ["permissionService", "$stateParams", function(permissionService, $stateParams) {

                            //统一增加后台页面的Loading效果
                            $(".lockMask-loading2").show();
                            return permissionService.hasPermission();
                        }]
                    }

                });

            }
        ]);
});