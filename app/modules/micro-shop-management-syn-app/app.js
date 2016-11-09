"use strict";
/**
 * author: 
 * time:
 * description:微店公众号
 */


define([
    "ionic",
    "modules/micro-shop-management-syn-app/controller",
    "services/permission"
], function() {

    return angular.module("MicroShopManagementSynApp", [
            "ionic",
            "MicroShopManagementSynApp.controllers",
            "services.permission"
        ])
        .config([
            '$stateProvider',
            function($stateProvider) {

                $stateProvider.state('microshopmanagement.syn', {
                    title: '同步流程',
                    cache: false,
                    url: '/syn?type',
                    templateUrl: 'modules/micro-shop-management-syn-app/micro-shop-management-syn-app.html',
                    controller: 'MicroShopManagementSynAppController',
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