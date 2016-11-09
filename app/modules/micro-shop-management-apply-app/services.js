"use strict";
/**
 * author :
 * time:
 * description:
 */


define(["ionic", "services/net/micro-shop-management"], function() {
    return angular.module("MicroShopManagementApplyApp.services", ["services.net.microShopManagement"])
        .service("MicroShopManagementApplyAppService", [
            "$rootScope", "microShopManagementNetService", "promptBarService",
            function($rootScope, microShopManagementNetService, promptBarService) {
                var service = {};
                service.saveMicroShopApply = function(userName, schoolOrgName, contact, position) {
                    return microShopManagementNetService.saveMicroShopApply(userName, schoolOrgName, contact, position);
                }
                service.getOrgNamePostion = function() {
                    return microShopManagementNetService.getOrgNamePostion();
                }

                return service;
            }
        ]);
});