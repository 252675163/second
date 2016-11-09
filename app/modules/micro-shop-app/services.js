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
                //��ȡ΢���û���Ϣ
                service.getMicroShopUserInfo = function () {
                    return microShopIndexNetService.getMicroShopUserInfo();
                }
                //��ȡfooter ����֧��byУ����
                service.getFooter = function () {
                    return microShopIndexNetService.getFooter();
                }
                return service;
            }
        ]);
});


 