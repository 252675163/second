"use strict";
/**
 * author :
 * time:
 * description:
 */


define(["ionic", "services/net/user-redeemcode-exchange"], function () {
    return angular.module("UserRedeemCodeExchangeApp.services", ["services.net.userRedeemCodeExchange"])
        .service("userRedeemCodeExchangeAppService", [
            "$rootScope", "userRedeemCodeExchangeNetService",
            function ($rootScope, userRedeemCodeExchangeNetService) {
                var service = {};

                service.exchangeVip = function (VipCode) {
                    return userRedeemCodeExchangeNetService.exchangeVip(VipCode);
                };

                service.getUserInfoByUserId = function () {
                    return userRedeemCodeExchangeNetService.getUserInfoByUserId();
                };

                return service;
            }
        ]);
});


