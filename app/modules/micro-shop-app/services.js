"use strict";
/**
 * author :
 * time:
 * description:
 */


define(["ionic", "services/net/micro-shop-index"], function () {
    return angular.module("MicroShopApp.services", ["services.net.microShopIndex"])
        .service("MicroShopAppService", [
            "$rootScope", "microShopIndexNetService", "promptBarService",
            function($rootScope, microShopIndexNetService, promptBarService) {
                var service = {};
                //获取微店用户信息
                service.getMicroShopUserInfo = function () {
                    return microShopIndexNetService.getMicroShopUserInfo();
                }
                //获取footer 技术支持by校宝秀
                service.getFooter = function () {
                    return microShopIndexNetService.getFooter();
                }
                return service;
            }
        ]);
});


 