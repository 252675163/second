"use strict";
/**
 * author :
 * time:
 * description:
 */


define(["ionic", "services/net/vip-club"], function () {
    return angular.module("VIPclubApp.services", ["services.net.VIPclub"])
        .service("VIPclubAppService", [
            "$rootScope", "VIPclubNetService", "promptBarService",
            function ($rootScope, VIPclubNetService, promptBarService) {
                var service = {};
                service.getAdvertisementBanner = function () {
                    return VIPclubNetService.getAdvertisementBanner();
                }; 
              

                return service;
            }
        ]);
});


