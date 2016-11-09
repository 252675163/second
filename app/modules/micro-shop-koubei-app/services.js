"use strict";
/**
 * author :
 * time:
 * description:
 */


define(["ionic", "services/net/micro-shop-koubei"], function () {
    return angular.module("MicroShopKoubeiApp.services", ["services.net.microShopKoubei"])
        .service("MicroShopKoubeiAppService", [
            "$rootScope", "microShopKoubeiNetService", 
            function ($rootScope, microShopKoubeiNetService) {
               
            }
        ]);
});


 