"use strict";
/**
 * author :
 * time:
 * description:
 */


define(["ionic", "services/net/micro-shop-management"], function () {
    return angular.module("MicroShopManagementProductApp.services", ["services.net.microShopManagement"])
        .service("MicroShopManagementProductAppService", [
            "$rootScope", "microShopManagementNetService", "promptBarService",
            function ($rootScope, microShopManagementNetService, promptBarService) {
                var service = {};
                //获取商品列表
                service.getMicroShopProducts = function (pageIndex, pageSize) {
                    return microShopManagementNetService.getMicroShopProducts(pageIndex, pageSize);
                }
                //上下架商品
                service.updateMicroShopProductState = function (id, productState) {
                    return microShopManagementNetService.updateMicroShopProductState(id, productState);
                }
                //删除商品
                service.deleteMicroShopProduct = function (id) {
                    return microShopManagementNetService.deleteMicroShopProduct(id);
                }
                //uiModel转化
                service.parseBizModelToUiModel = function (bizModel) {
                    var productModel = {
                        id: 1,
                        shopId: 0,
                        name: "满天小星星",//名称
                        price: 1499,  //原价
                        discount: 1, //优惠价
                        activityType: 1, //活动类型
                        activityTypeName: "一元砍价",
                        productState: 1,         //商品状态（上下架）
                        productStateModel: {
                            code: 1,
                            name: "出售中",
                            className: ""
                        },
                        imgUrl: "", //商品首张图片
                        qrCodeUrl: "",
                        pageViews: 0
                    }
                    productModel.id = bizModel.Id;
                    productModel.shopId = bizModel.ShopId;
                    productModel.name = bizModel.Name;
                    productModel.price = bizModel.OriginPrice;
                    productModel.discount = bizModel.Price;
                    productModel.stock = bizModel.Stock;
                    productModel.saleNum = bizModel.PayOrderCount + bizModel.FinishOrderCount;
                    productModel.activityType = bizModel.MarketMode;
                    productModel.productState = bizModel.ProductState;
                    if (!!bizModel.Images) {
                        bizModel.Images = angular.fromJson(bizModel.Images);
                        productModel.imgUrl = bizModel.Images.constructor === Array ? bizModel.Images[0].url : "";

                    }
                    /// 状态代码 仓库中:0 出售中:1 已售罄:2 已结束:3
                    if (bizModel.ProductStateCode == 0) {
                        productModel.productStateModel = {
                            name: "仓库中",
                            className: "micro-shop-status-green"
                        }
                    }
                    else if (bizModel.ProductStateCode == 1) {
                        productModel.productStateModel = {
                            name: "出售中",
                            className: ""
                        }
                    }
                    else if (bizModel.ProductStateCode == 2) {
                        productModel.productStateModel = {
                            name: "已售罄",
                            className: "micro-shop-status-gray"
                        }
                    }
                    else if (bizModel.ProductStateCode == 3) {
                        productModel.productStateModel = {
                            name: "已结束",
                            className: "micro-shop-status-gray"
                        }
                    };
                    productModel.productStateModel.code = bizModel.ProductStateCode;
                    //活动类型标签
                    switch(productModel.activityType) {
                        case 1:
                            productModel.activityTypeName = "一元砍价";
                            break;
                        case 2:
                            productModel.activityTypeName = "一口价";
                            break;
                    }
                    productModel.qrCodeUrl = bizModel.QrCode;
                    productModel.pageViews = bizModel.PageViews > 999999 ? 999999 : bizModel.PageViews;
                    return productModel;
                }
                service.shareConfigModel = {
                    title: "", // 分享标题
                    desc: "", // 分享描述
                    link: "", // 分享链接
                    imgUrl: "", // 分享图标
                    type: "",
                    dataUrl: ""
                };
                return service;
            }
        ]);
});


