"use strict";
/**
 * author: 
 * time:
 * description:微店管理首页
 */


define([
    "ionic",
    "modules/micro-shop-management-apply-app/controller",
    "services/permission"
], function() {

    return angular.module("MicroShopManagementApplyApp", [
            "ionic",
            "MicroShopManagementApplyApp.controllers",
            "services.permission"
        ])
        .config([
            '$stateProvider',
            function($stateProvider) {

                $stateProvider.state('microshopmanagementapply', {
                    title: '校宝微店开通申请',
                    cache: false,
                    url: '/microshopmanagementapply',
                    templateUrl: 'modules/micro-shop-management-apply-app/micro-shop-management-apply-app.html',
                    controller: 'MicroShopManagementApplyAppController',
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