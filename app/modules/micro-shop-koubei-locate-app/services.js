"use strict";
/**
 * author :
 * time:
 * description:
 */


define(["ionic", "services/net/micro-shop-koubei"], function () {
    return angular.module("MicroShopKoubeiLocateApp.services", ["services.net.microShopKoubei"])
        .service("MicroShopKoubeiLocateAppService", [
            "$rootScope", "microShopKoubeiNetService",
            function ($rootScope, microShopKoubeiNetService) {
                var service = {};
              

                return service;
            }
        ]);
});


 