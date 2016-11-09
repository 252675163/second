"use strict";
/**
 * author :
 * time:
 * description:
 */


define(["ionic", "services/net/micro-shop-index"], function () {
    return angular.module("MicroShopProductDetailApp.services", ["services.net.microShopIndex"])
        .service("MicroShopProductDetailAppService", [
            "$rootScope", "microShopIndexNetService", "promptBarService",
            function ($rootScope, microShopIndexNetService, promptBarService) {
                var service = {};
                //获取商品信息
                service.getMicroShopProductDetail = function (productId) {
                    return microShopIndexNetService.getMicroShopProductDetail(productId);
                }
                //获取系统时间
                service.getServerDateTime = function () {
                    return microShopIndexNetService.getServerDateTime();
                }
                //统计商品浏览量
                service.addProductPV = function (productId) {
                    return microShopIndexNetService.addMicroShopLog(productId, 2);
                }
                //获取购买者列表
                service.getShopBuyRecords = function (productId, pageIndex, pageSize) {
                    return microShopIndexNetService.getShopBuyRecords(productId, pageIndex, pageSize);
                }
                
                //uiModel转化
                service.parseBizModelToUiModel = function (bizModel) {
                    var productModel = {
                        productId: "",
                        shopId: "",
                        name: "天下第一武道会",//名称
                        price: 1,  //现价
                        originPrice: 2400, //原价
                        saleNum: 0,//已出售数量
                        stock: "",//库存
                        isOnSelf: false,
                        productStateModel: {//商品状态  0 正常、1 已参加、2 已售罄、3 已结束
                            code: "",
                            name: ""
                        },
                        activityTypeModel: {
                            type: 1,
                            name: "一元砍价",
                            buyerListTitle: "看看谁砍到了1块钱",
                            buyerListResult: "砍到1元",
                            ableBuyBtn:'',
                            unableBuyBtn:'',
                        },
                        endDate: "",//截止时间
                        leftSeconds: "",
                        imgList: "/app/img/1-2.jpg", //商品首张图片
                        introduction: "",//商品介绍
                        activityRule: "",//活动规则
                        pageViews: 0  //浏览量
                    }
                    productModel.productId = bizModel.Id;
                    productModel.shopId = bizModel.ShopId;
                    productModel.name = bizModel.Name;
                    productModel.price = bizModel.Price;
                    productModel.originPrice = bizModel.OriginPrice;
                    productModel.saleNum = bizModel.PayOrderCount + bizModel.FinishOrderCount;
                    productModel.stock = bizModel.Stock;
                    productModel.isOnSelf = bizModel.ProductState == 1;
                    productModel.productStateModel.code = bizModel.ProductStateCode;
                    if (productModel.productStateModel.code == 0) {
                        productModel.productStateModel.name = "马上参加";
                    }
                    else if (productModel.productStateModel.code == 1) {
                        productModel.productStateModel.name = "已参加";
                    }
                    else if (productModel.productStateModel.code == 2) {
                        productModel.productStateModel.name = "商品已售罄";
                    }
                    else if (productModel.productStateModel.code == 3) {
                        productModel.productStateModel.name = "活动已结束";
                    }
                    if (bizModel.MarketMode == 1) {
                        productModel.activityTypeModel.name = "一元砍价";
                        productModel.activityRule = "1.点击【马上参加】可以生成自己的砍价页面；\n" +
                        "2.您能帮每个分享者砍价一次，也能帮自己砍价；\n" +
                        "3.当商品价格砍到了一元时，就可以直接下单购买；\n" +
                        "4.每个优惠商品数量有限，先到先得。\n";
                        productModel.activityTypeModel.buyerListTitle= "看看谁砍到了1块钱";
                        productModel.activityTypeModel.buyerListResult= "砍到1元";
                        productModel.activityTypeModel.ableBuyBtn = "马上参加";
                        productModel.activityTypeModel.unableBuyBtn = "已参加";

                    } else if (bizModel.MarketMode == 2) {
                        productModel.activityTypeModel.name = "一口价";
                        productModel.activityRule = "免费";
                        productModel.activityTypeModel.buyerListTitle = "看看谁已经购买了";
                        productModel.activityTypeModel.buyerListResult = "购买成功";
                        productModel.activityTypeModel.ableBuyBtn = "购买";
                        productModel.activityTypeModel.unableBuyBtn = "已购买";
                    }
                    productModel.activityTypeModel.type = bizModel.MarketMode;
                    productModel.endDate = bizModel.MarketDate;
                    productModel.imgList = angular.fromJson(bizModel.Images);
                    productModel.introduction = !bizModel.Introduce ? "该商品暂无介绍" : bizModel.Introduce;
                    productModel.pageViews = bizModel.PageViews > 999999 ? 999999 : bizModel.PageViews;

                    return productModel;
                }
                //uiModel转化 购买列表
                service.buyerModel = function (bizModel) {
                    var model = {
                        name: "",//姓名
                        imgUrl: "",//头像
                        helpTime: ""//帮砍时间

                    }
                    model.name = bizModel.NickName;
                    model.imgUrl = bizModel.HeadImgUrl;
                    model.helpTime = bizModel.CreatedAt;

                    return model;
                }


                return service;
            }
        ]);
});


