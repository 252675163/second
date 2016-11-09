"use strict";
/**
 * author: 
 * time:
 * description:提现记录详情、交易订单详情
 */


define([
    "ionic",
    "modules/schoolpal-wallet-order-detail-app/controller",
    "services/permission"
], function() {

    return angular.module("SchoolpalWalletOrderDetailApp", [
            "ionic",
            "SchoolpalWalletOrderDetailApp.controllers",
            "services.permission"
        ])
        .config([
            '$stateProvider',
            function($stateProvider) {

                $stateProvider.state('schoolpalwallet.orderdetail', {
                    title: '',
                    cache: false,
                    url: '/orderdetail?type&id',
                    templateUrl: 'modules/schoolpal-wallet-order-detail-app/schoolpal-wallet-order-detail-app.html',
                    controller: 'SchoolpalWalletOrderDetailAppController',
                    resolve: {
                        permission: ["permissionService", "$stateParams", function(permissionService, $stateParams) {
                            $(".lockMask-loading2").show();
                            return permissionService.hasPermission();
                        }]
                    }

                });

            }
        ]);
});