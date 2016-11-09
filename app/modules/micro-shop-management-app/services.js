"use strict";
/**
 * author :
 * time:
 * description:
 */


define(["ionic", "services/net/micro-shop-management"], function() {
    return angular.module("MicroShopManagementApp.services", ["services.net.microShopManagement"])
        .service("MicroShopManagementAppService", [
            "$rootScope", "microShopManagementNetService", "promptBarService",
            function($rootScope, microShopManagementNetService, promptBarService) {
                var service = {};
                service.hasKouBei = function(shopId) {
                    return microShopManagementNetService.hasKouBei(shopId);
                }
                return service;
            }
        ]);
});