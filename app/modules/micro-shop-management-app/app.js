"use strict";
/**
 * author: 
 * time:
 * description:微店管理首页
 */


define([
    "ionic",
    "modules/micro-shop-management-app/controller",
    "services/permission"
], function () {

    return angular.module("MicroShopManagementApp", [
        "ionic",
        "MicroShopManagementApp.controllers",
        "services.permission"
    ])
        .config([
            '$stateProvider',
            function ($stateProvider) {

                $stateProvider.state('microshopmanagement', {
                    title: '我的微店',
                    cache: false,
                    url: '/microshopmanagement',
                    templateUrl: 'modules/micro-shop-management-app/micro-shop-management-app.html',
                    controller: 'MicroShopManagementAppController',
                    resolve: {
                        permission: ["permissionService", "$stateParams", function (permissionService, $stateParams) {
                            window.wx && window.wx.hideOptionMenu();
                            //统一增加后台页面的Loading效果
                            //$(".lockMask-loading2").show();
                            return permissionService.hasPermission();
                        }],
                        microShopModel: ["permissionService",function(permissionService) {
                            return permissionService.microShopModel().then(function (re) {
                                return re;
                            });
                        }]
                    }

                });

            }
        ]);
});
