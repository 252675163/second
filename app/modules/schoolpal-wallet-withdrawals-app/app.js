"use strict";
/**
 * author: 
 * time:
 * description:提现
 */


define([
    "ionic",
    "modules/schoolpal-wallet-withdrawals-app/controller",
    "services/permission"
], function() {

    return angular.module("SchoolpalWalletWithdrawalsApp", [
            "ionic",
            "SchoolpalWalletWithdrawalsApp.controllers",
            "services.permission"
        ])
        .config([
            '$stateProvider',
            function($stateProvider) {

                $stateProvider.state('schoolpalwallet.withdrawals', {
                    title: '提现',
                    cache: false,
                    url: '/withdrawals',
                    templateUrl: 'modules/schoolpal-wallet-withdrawals-app/schoolpal-wallet-withdrawals-app.html',
                    controller: 'SchoolpalWalletWithdrawalsAppController',
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