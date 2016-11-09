"use strict";
/**
 * author :
 * time:
 * description:
 */


define(["ionic", "services/net/micro-shop-management"], function () {
    return angular.module("MicroShopManagementIndexApp.services", ["services.net.microShopManagement"])
        .service("MicroShopManagementIndexAppService", [
            "$rootScope", "microShopManagementNetService", "promptBarService",
            function ($rootScope, microShopManagementNetService, promptBarService) {
                var service = {};
                service.data = {
                    isShowTabs: true,
                    tabIndex: 1,
                    qrCodeUrl: "",
                    isShowQrCode: ""
                }
                //创建微店
                service.createMicroShop = function (shop) {
                    return microShopManagementNetService.saveMicroShop(shop);
                }
                //编辑微店
                service.editMicroShop = function (shop) {
                    return microShopManagementNetService.saveMicroShop(shop);
                }
                //获取微店信息
                service.getMicroShop = function () {
                    return microShopManagementNetService.getMicroShop();
                }
                //设置顶部导航显示
                service.showTabs = function (flag) {
                    service.data.isShowTabs = flag;
                }
                //设置显示tab
                service.setFooterTabIndex = function (index) {
                    service.data.tabIndex = index;
                }
                //显示二维码
                service.showQrCodeUrl = function (url) {
                    service.data.qrCodeUrl = url;
                    service.data.isShowQrCode = true;
                }
                //隐藏二维码
                service.closeQrCodeUrl = function () {
                    service.data.isShowQrCode = false;
                }
                return service;
            }
        ]);
});


