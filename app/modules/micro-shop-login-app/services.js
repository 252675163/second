"use strict";
/**
 * author :
 * time:
 * description:
 */


define(["ionic", "services/net/micro-shop-index"], function() {
    return angular.module("MicroShopLoginApp.services", ["services.net.microShopIndex"])
        .service("MicroShopLoginAppService", [
            "$rootScope", "microShopIndexNetService", "userCenterNetService", "promptBarService",
            function($rootScope, microShopIndexNetService, userCenterNetService, promptBarService) {
                var service = {};


                //获取验证码
                service.sendVerifyCode = function(phone) {
                    return microShopIndexNetService.sendVerifyCode(phone);
                };

                //提交绑定
                service.login = function(phone, code) {
                    return microShopIndexNetService.boundPhone(phone, code);
                };
                //获取用户信息
                service.getMicroShopUserInfo = function() {
                    return microShopIndexNetService.getMicroShopUserInfo();
                };
                return service;
            }
        ]);
});