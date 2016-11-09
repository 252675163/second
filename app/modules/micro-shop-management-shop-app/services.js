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

                // ������ϢuiModelת��
                service.showShopInfos = function (shopdata) {
                    var shopInfoModel = {
                        address: "���ݹ�����11123",//��ַ
                        contact: "13755565555",//��ϵ�绰
                        id: 9, //����ID
                        images: "http://greedyint-dev.oss-cn-hangzhou.aliyuncs.com/xbshow/MicroShop/20160728204840-54365",//����ͼƬ
                        name: "����ythtty000003",//��������
                        introduce: "12312312",//��������
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

                //�༭΢��
                service.editMicroShop = function (shop) {
                    return microShopManagementNetService.saveMicroShop(shop);
                }
                //��ȡ΢����Ϣ
                service.getMicroShop = function () {
                    return microShopManagementNetService.getMicroShop();
                }


                return service;
            }
        ]);
});


