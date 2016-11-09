"use strict";
/**
 * author: 
 * time:
 * description:确认提现
 */


define([
    "ionic",
    "modules/schoolpal-wallet-withdrawals-confirm-app/controller",
    "services/permission"
], function() {

    return angular.module("SchoolpalWalletWithdrawalsConfirmApp", [
            "ionic",
            "SchoolpalWalletWithdrawalsConfirmApp.controllers",
            "services.permission"
        ])
        .config([
            '$stateProvider',
            function($stateProvider) {

                $stateProvider.state('schoolpalwallet.withdrawalsconfirm', {
                    title: '确认提现',
                    cache: false,
                    url: '/withdrawalsconfirm',
                    templateUrl: 'modules/schoolpal-wallet-withdrawals-confirm-app/schoolpal-wallet-withdrawals-confirm-app.html',
                    controller: 'SchoolpalWalletWithdrawalsConfirmAppController',
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