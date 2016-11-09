"use strict";
/**
 * author :
 * time:
 * description:
 */


define(["ionic", "services/net/micro-shop-koubei"], function() {
    return angular.module("MicroShopKoubeiLoginApp.services", ["services.net.microShopKoubei"])
        .service("MicroShopKoubeiLoginAppService", [
            "$rootScope", "microShopKoubeiNetService", "promptBarService",
            function($rootScope, microShopKoubeiNetService, promptBarService) {
                var service = {};

                service.getShopUiModel = function(shop) {
                    var model = {
                        id: 1,
                        name: "test",
                        orgid:1
                    };
                    model.name = shop.ShopName;
                    model.id = shop.ShopId;
                    model.orgId = shop.OrgId;
                    return model;
                }

                //获取店铺列表
                service.getSyncShopList = function(signId) {
                    return microShopKoubeiNetService.getSyncShopList(signId);
                };
                //发送手机验证码
                service.sendVerifyCode = function(phone) {
                    return microShopKoubeiNetService.sendVerifyCode(phone);
                };
                //同步店铺
                service.syncShop = function (orgId,shopId) {
                    return microShopKoubeiNetService.syncShop(orgId,shopId);
                };
                //登陆
                service.login = function(userLogin) {
                    return microShopKoubeiNetService.login(userLogin);
                };
                //注册
                service.reg = function(userReg) {
                    return microShopKoubeiNetService.reg(userReg);
                };
                //获取当前用户状态
                service.getUserState = function(data) {
                    return microShopKoubeiNetService.getUserState(data);
                };
                //获取pc二维码
                service.getQrCode = function(url) {
                    return microShopKoubeiNetService.getQrCode(url);
                };
                return service;
            }
        ]);
});