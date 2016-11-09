"use strict";
/**
 * author :
 * time:
 * description:
 */


define(["ionic", "services/net/micro-shop-management"], function() {
    return angular.module("MicroShopManagementProductEditApp.services", ["services.net.microShopManagement"])
        .service("MicroShopManagementProductEditAppService", [
            "$rootScope", "microShopManagementNetService", "promptBarService",
            function($rootScope, microShopManagementNetService, promptBarService) {
                var service = {};

                //商品列表uiModel转化
                service.getMicroShopModel = function(dataModels) {
                    var shopProductModel = {
                        name: "天下第一武道会", //名称
                        price: '', //现价
                        originPrice: 2400, //原价
                        productState: 1, //商品是否参与砍价状态
                        marketTime: "6天22小时46分55秒", //倒计时
                        imgUrl: "/app/img/1-2.jpg", //商品首张图片
                        marketNumber: "10",
                        introduce: "introduce",
                        stock: "",
                        id: 0,
                        typeModel: {
                            name: "一元砍价",
                            type: 1 //商品类型
                        }

                    }
                    shopProductModel.id = dataModels.Id;
                    shopProductModel.name = dataModels.Name;
                    shopProductModel.price = dataModels.Price;
                    shopProductModel.originPrice = dataModels.OriginPrice;
                    shopProductModel.productState = dataModels.ProductState;
                    shopProductModel.marketTime = dataModels.MarketDate;
                    shopProductModel.imgUrl = dataModels.Images;
                    shopProductModel.stock = dataModels.Stock;
                    shopProductModel.introduce = dataModels.Introduce;
                    shopProductModel.marketNumber = dataModels.MarketNumber;
                    shopProductModel.typeModel.type = dataModels.MarketMode;
                    shopProductModel.koubeiImages = dataModels.KouBeiImages;

                    switch (dataModels.MarketMode) {
                        case 1:
                            shopProductModel.typeModel.name = "一元砍价";
                            break;
                        case 2:
                            shopProductModel.typeModel.name = "一口价";
                            break;
                    }
                    return shopProductModel;
                }
                service.setMicroShopModel = function(dataModels) {
                    var shopModel = {};
                    shopModel.Id = dataModels.id;
                    shopModel.Name = dataModels.name;
                    shopModel.Price = dataModels.price;
                    shopModel.OriginPrice = dataModels.originPrice;
                    shopModel.ProductState = dataModels.productState;
                    shopModel.MarketDate = dataModels.marketTime;
                    shopModel.Images = angular.toJson(dataModels.imgUrl);
                    shopModel.Stock = dataModels.stock;
                    shopModel.Introduce = dataModels.introduce;
                    shopModel.MarketNumber = dataModels.marketNumber;
                    shopModel.MarketMode = dataModels.typeModel.type;
                    shopModel.KouBeiImages = angular.toJson(dataModels.koubeiImages);
                    return shopModel;
                }

                //上下架商品
                service.updateMicroShopProductState = function(id, productState) {
                    return microShopManagementNetService.updateMicroShopProductState(id, productState);
                }

                //创建商品
                service.createMicroProduct = function(product) {
                        return microShopManagementNetService.saveMicroShopProduct(product);
                    }
                    //编辑商品
                service.editMicroProduct = function(product) {
                        return microShopManagementNetService.saveMicroShopProduct(product);
                    }
                    //获取商品信息
                service.getMicroProduct = function(id) {
                        return microShopManagementNetService.getMicroShopProduct(id);
                    }
                    //编辑商品
                service.isExistProductActivityUser = function(productId) {
                    return microShopManagementNetService.isExistProductActivityUser(productId);
                }


                return service;
            }
        ]);
});