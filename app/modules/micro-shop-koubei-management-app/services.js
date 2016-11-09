"use strict";
/**
 * author :
 * time:
 * description:
 */


define(["ionic", "services/net/micro-shop-koubei"], function() {
    return angular.module("MicroShopKoubeiManagementApp.services", ["services.net.microShopKoubei"])
        .service("MicroShopKoubeiManagementAppService", [
            "$rootScope", "microShopKoubeiNetService",
            function($rootScope, microShopKoubeiNetService) {
                var service = {};
                service.data = {
                    isShowTabs: true,
                    tabIndex: 1,
                    qrCodeUrl: "",
                    isShowQrCode: ""
                }


                //设置顶部导航显示
                service.showTabs = function(flag) {
                        service.data.isShowTabs = flag;
                    }
                    //设置显示tab
                service.setFooterTabIndex = function(index) {
                    service.data.tabIndex = index;
                }

                //同步
                service.syncKouBeiProduct = function() {
                    return microShopKoubeiNetService.syncKouBeiProduct();
                }
                return service;
            }
        ]);
});