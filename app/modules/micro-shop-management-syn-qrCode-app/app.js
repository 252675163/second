"use strict";
/**
 * author: 
 * time:
 * description:微店公众号
 */


define([
    "ionic",
    "modules/micro-shop-management-syn-qrCode-app/controller",
    "services/permission"
], function() {

    return angular.module("MicroShopManagementSynQrCodeApp", [
            "ionic",
            "MicroShopManagementSynQrCodeApp.controllers",
            "services.permission"
        ])
        .config([
            '$stateProvider',
            function($stateProvider) {

                $stateProvider.state('microshopmanagement.synqrcode', {
                    title: '二维码授权',
                    cache: false,
                    url: '/synqrcode?type',
                    templateUrl: 'modules/micro-shop-management-syn-qrCode-app/micro-shop-management-syn-qrCode-app.html',
                    controller: 'MicroShopManagementSynQrCodeAppController',
                    resolve: {
                    }

                });

            }
        ]);
});