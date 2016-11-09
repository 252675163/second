"use strict";
/**
 * author :
 * time:
 * description:
 */


define(["ionic", "services/net/micro-shop-management"], function() {
    return angular.module("MicroShopManagementSynQrCodeApp.services", ["services.net.microShopManagement"])
        .service("MicroShopManagementSynQrCodeAppService", [
            "$rootScope", "microShopManagementNetService", "promptBarService",
            function($rootScope, microShopManagementNetService, promptBarService) {
                var service = {};
                service.getAccreditQrCode = function () {
                    return microShopManagementNetService.getKoubeiAccreditQrCode();
                }
                
                return service;
            }
        ]);
});