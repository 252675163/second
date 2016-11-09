"use strict";
/**
 * author :
 * time:
 * description:
 */


define(["ionic", "services/net/micro-shop-koubei"], function () {
    return angular.module("MicroShopKoubeiCreateShopApp.services", ["services.net.microShopKoubei"])
        .service("MicroShopKoubeiCreateShopAppService", [
            "$rootScope", "microShopKoubeiNetService", "promptBarService", "commonNetService",
            function ($rootScope, microShopKoubeiNetService, promptBarService, commonNetService) {
                var service = {};
                //商品列表uiModel转化
                var shopModel = {
                    name: '',//门店名称
                    locate: {
                        address: "杭州西湖区华星时代广场a座",
                        provinceCode: "",
                        cityCode: "",
                        districtCode: "",
                        districtStr:"",
                        location: {
                            lat: 0,//纬度
                            lng: 0  //经度
                        }
                    },//门店地址
                    tel: '',  //门店电话
                    categoryId: '', //经营种类
                    firstPicture: '',  //门店首图
                    indoorPicture: '',//门店內照与内景照
                    businessLicense: '', //营业执照
                    regNumber: '',//注册号
                    businessName: '',//字号名称
                }
                service.getKoubeiShopModel = function (dataModels) {
                    shopModel.name = dataModels.Name;
                    shopModel.locate.address = dataModels.Address;
                    shopModel.tel = dataModels.Contact;

                    return shopModel;
                }
                service.setKoubeiShopModel = function (dataModels) {
                    var koubeiShopModel = {};
                    koubeiShopModel.CategoryId = dataModels.categoryId;//类目id
                    koubeiShopModel.MainShopName = dataModels.name;//微店名
                    koubeiShopModel.ProvinceCode = dataModels.locate.provinceCode;//省代码
                    koubeiShopModel.CityCode = dataModels.locate.cityCode;//市代码
                    koubeiShopModel.DistrictCode = dataModels.locate.districtCode;//区代码
                    koubeiShopModel.Address = dataModels.locate.address;//地址
                    koubeiShopModel.Longitude = dataModels.locate.location.lng;//经度
                    koubeiShopModel.Latitude = dataModels.locate.location.lat;//纬度
                    koubeiShopModel.ContactNumber = dataModels.tel;//门店电话号码
                    koubeiShopModel.MainImage = dataModels.firstPicture;//主图代码
                    koubeiShopModel.Licence = dataModels.businessLicense;//营业执照代码
                    koubeiShopModel.LicenceCode = dataModels.regNumber;//营业执照编号
                    koubeiShopModel.LicenceName = dataModels.businessName;//营业执照店名
                    koubeiShopModel.AuditImages = dataModels.indoorPicture;//门店内景图
                    koubeiShopModel.AuthLetter = dataModels.accreditImg;//门店内景图
                    return koubeiShopModel;
                }
                //保存地址
                service.saveLocate = function (locate) {
                    shopModel.locate = locate;
                    shopModel.address = locate.address
                }
                //获取地址
                service.getLocate = function () {
                    return shopModel.locate;
                }
                //提交店铺信息
                service.saveShopInformation = function (shop) {
                    return microShopKoubeiNetService.saveShopInformation(shop);
                }
                //获取店铺信息
                service.getShopInformation = function () {
                    return microShopKoubeiNetService.getShopInformation();
                }
                //获取店铺申请状态
                service.mcroShopOpenState = function () {
                    return microShopKoubeiNetService.mcroShopOpenState();
                }

                return service;



            }
        ])

});


