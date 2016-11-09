"use strict";
/**
 * author :
 * time:
 * description:
 */


define(["ionic", "services/net/micro-shop-index"], function () {
    return angular.module("MicroShopIndexApp.services", ["services.net.microShopIndex"])
        .service("MicroShopIndexAppService", [
            "$rootScope", "microShopIndexNetService", "promptBarService",
            function($rootScope, microShopIndexNetService, promptBarService) {
                var service = {};
               
                return service;
            }
        ]);
});


 