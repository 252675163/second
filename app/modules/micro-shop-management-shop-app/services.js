"use strict";
/**
 * author :
 * time:
 * description:
 */


define(["ionic", "services/net/micro-shop-management"], function () {
    return angular.module("MicroShopManagementShopApp.services", ["services.net.microShopManagement"])
        .service("MicroShopManagementShopAppService", [
            "$rootScope", "microShopManagementNetService", "promptBarService",
            function ($rootScope, microShopManagementNetService, promptBarService) {
                var service = {};

                // 店铺信息uiModel转化
                service.showShopInfos = function (shopdata) {
                    var shopInfoModel = {
                        address: "杭州哈哈哈11123",//地址
                        contact: "13755565555",//联系电话
                        id: 9, //店铺ID
                        images: "http://greedyint-dev.oss-cn-hangzhou.aliyuncs.com/xbshow/MicroShop/20160728204840-54365",//店铺图片
                        name: "满天ythtty000003",//店铺名称
                        introduce: "12312312",//机构介绍
                        licensePic: "",
                        qrCodeUrl: ""
                    }
                    shopInfoModel.id = shopdata.Id;
                    shopInfoModel.name = shopdata.Name;
                    shopInfoModel.address = shopdata.Address;
                    shopInfoModel.contact = shopdata.Contact;
                    shopInfoModel.introduce = shopdata.Introduce;
                    shopInfoModel.images = shopdata.Images;
                    shopInfoModel.licensePic = shopdata.LicensePic;
                    shopInfoModel.qrCodeUrl = shopdata.QrCode;
                    return shopInfoModel;
                }

                //编辑微店
                service.editMicroShop = function (shop) {
                    return microShopManagementNetService.saveMicroShop(shop);
                }
                //获取微店信息
                service.getMicroShop = function () {
                    return microShopManagementNetService.getMicroShop();
                }


                return service;
            }
        ]);
});


