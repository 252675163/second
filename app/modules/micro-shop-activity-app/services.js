"use strict";
/**
 * author :
 * time:
 * description:
 */


define(["ionic", "services/net/micro-shop-index"], function () {
    return angular.module("MicroShopActivityApp.services", ["services.net.microShopIndex"])
        .service("MicroShopActivityAppService", [
            "$rootScope", "microShopIndexNetService", "promptBarService",
            function ($rootScope, microShopIndexNetService, promptBarService) {
                var service = {};
                


                return service;
            }
        ]);
});


