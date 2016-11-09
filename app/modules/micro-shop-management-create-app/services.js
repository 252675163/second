"use strict";
/**
 * author :
 * time:
 * description:
 */


define(["ionic", "services/net/micro-shop-management"], function () {
    return angular.module("MicroShopManagementCreateApp.services", ["services.net.microShopManagement"])
        .service("MicroShopManagementCreateAppService", [
            "$rootScope", "microShopManagementNetService", "promptBarService",
            function ($rootScope, microShopManagementNetService, promptBarService) {
                var service = {};
                service.model = {
                    id: 0,
                    name: "",
                    address: "",
                    contact: "",
                    introduce: "",
                    images: "",
                    licensePic: ""
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
                //获取微店申请信息
                service.getMicroShopApply = function () {
                    return microShopManagementNetService.getMicroShopApply();
                }
                //校验
                service.isValid = function (model) {
                    if (model.name == "") {
                        return 1; //名字为空
                    }
                    if (model.address == "") {
                        return 2; //地址为空
                    }
                    if (model.contact == "") {
                        return 3; //号码为空
                    }
                    if (model.name.trim() == "") {
                        return 4; //存在空格
                    }
                    if (model.address.trim() == "") {
                        return 5; //存在空格
                    }
                    if (model.contact) {
                        var phoneRegexp = /^(0[0-9]{2,3})?([2-9][0-9]{6,7})$|(^(1[3|5|8|4|7])\d{9}$)/;
                        if (!phoneRegexp.test(model.contact))
                            return 6; //号码不正确
                    }
                    if (angular.fromJson(model.licensePic).length == 0) {
                        return 7; //营业执照未上传
                    }
                    return 0; //格式正确
                };
                return service;
            }
        ]);
});