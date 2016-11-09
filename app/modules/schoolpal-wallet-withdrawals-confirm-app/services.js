"use strict";
/**
 * author :
 * time:
 * description:
 */


define(["ionic", "services/net/schoolpal-wallet"], function() {
    return angular.module("SchoolpalWalletWithdrawalsConfirmApp.services", ["services.net.schoolpalWallet"])
        .service("SchoolpalWalletWithdrawalsConfirmAppService", [
            "schoolpalWalletNetService",
            function(schoolpalWalletNetService) {
                var service = {};
                service.addMicroShopDrawApply = function(code, inputNum) {
                    return schoolpalWalletNetService.addMicroShopDrawApply(code, inputNum)
                }
                service.getVerificationCode = function() {
                    return schoolpalWalletNetService.getVerificationCode();
                };
                service.getPrincipalPhone = function() {
                    return schoolpalWalletNetService.getPrincipalPhone();
                };
                service.getSchoolPalWalletAccount = function() {
                    return schoolpalWalletNetService.getSchoolPalWalletAccount()
                }
                return service;
            }
        ]);
});