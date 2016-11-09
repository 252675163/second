"use strict";
/**
 * author: 
 * time:
 * description:微店首页
 */


define([
    "ionic",
    "modules/schoolpal-wallet-app/controller",
    "services/permission"
], function() {

    return angular.module("SchoolpalWalletApp", [
            "ionic",
            "SchoolpalWalletApp.controllers",
            "services.permission"
        ])
        .config([
            '$stateProvider',
            function($stateProvider) {

                $stateProvider.state('schoolpalwallet', {
                    title: '',
                    cache: false,
                    url: '/schoolpalwallet',
                    templateUrl: 'modules/schoolpal-wallet-app/schoolpal-wallet-app.html',
                    controller: 'SchoolpalWalletAppController',
                    resolve: {
                        permission: ["permissionService", "$stateParams", function(permissionService, $stateParams) {
                            //$(".lockMask-loading2").show();
                            return permissionService.hasPermission();
                        }]
                    }

                });

            }
        ]);
});