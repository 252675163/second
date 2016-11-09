"use strict";
/**
 * author :
 * time:
 * description:
 */


define(["ionic", "services/net/micro-shop-management"], function() {
    return angular.module("MicroShopManagementSynApp.services", ["services.net.microShopManagement"])
        .service("MicroShopManagementSynAppService", [
            "$rootScope", "microShopManagementNetService", "promptBarService",
            function($rootScope, microShopManagementNetService, promptBarService) {
                var service = {};
                return service;
            }
        ]);
});