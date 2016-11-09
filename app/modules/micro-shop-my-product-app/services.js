"use strict";
/**
 * author :
 * time:
 * description:
 */


define(["ionic", "services/net/micro-shop-index"], function () {
    return angular.module("MicroShopMyProductApp.services", ["services.net.microShopIndex"])
        .service("MicroShopMyProductAppService", [
            "$rootScope", "microShopIndexNetService",
            function ($rootScope, microShopIndexNetService) {
                var service = {};
                //获取我的商品列表
                service.getMyProductsList = function (shopId, pageIndex, pageSize) {
                    return microShopIndexNetService.getMyProductsList(shopId, pageIndex, pageSize);
                }
                //获取系统时间
                service.getServerDateTime = function () {
                    return microShopIndexNetService.getServerDateTime();
                }

                service.parseBizModelToUiModel = function (bizModel) {
                    var productModel = {
                        productId: 1,
                        title: "幼儿电钢入门初级课堂班课初级",
                        activityTypeModel: {
                            type: 1,
                            name: "一元砍价",
                            className: ""
                        },
                        priceModel: {
                            price: "",
                            name: ""
                        },
                        productStateModel: {
                            code: "", //ProductStateCode 状态 进行中 0 已失效 1 已完成 2
                            name: "",
                            className: ""
                        },
                        imgUrl: "", //商品首张图片
                        progress: 0,
                        marketDate: "", //截止时间
                        leftSeconds: "", //剩余时间
                        hasOrder: false, //是否生成订单
                        activityUserId: ""
                    }
                    productModel.productId = bizModel.ProductId;
                    productModel.title = bizModel.Name;
                    //活动类型
                    switch (bizModel.MarketMode) {
                        case 1:
                            productModel.activityTypeModel.name = "一元砍价";
                            productModel.activityTypeModel.className = "";
                            break;
                        case 2:
                            productModel.activityTypeModel.name = "一口价";
                            productModel.activityTypeModel.className = "";
                            break;
                    }
                    //商品状态
                    productModel.activityTypeModel.type = bizModel.MarketMode;
                    if (bizModel.ActivityUserStateCode == 0) {
                        productModel.productStateModel.name = "进行中";
                        productModel.productStateModel.className = "";
                        productModel.priceModel.name = "当前价格";
                    } else if (bizModel.ActivityUserStateCode == 1) {
                        productModel.productStateModel.name = "已失效";
                        productModel.productStateModel.className = "micro-shop-status-gray";
                        productModel.priceModel.name = "当前价格";
                    } else if (bizModel.ActivityUserStateCode == 2) {
                        productModel.productStateModel.name = "已完成";
                        productModel.productStateModel.className = "micro-shop-status-green";
                        productModel.priceModel.name = "成交价格";
                    }
                    productModel.productStateModel.code = bizModel.ActivityUserStateCode;
                    productModel.priceModel.price = bizModel.OriginPrice - bizModel.Amount;
                    if (!!bizModel.Images) {
                        bizModel.Images = angular.fromJson(bizModel.Images);
                        productModel.imgUrl = bizModel.Images.constructor === Array ? bizModel.Images[0].url : "";
                    }
                    var progress = (bizModel.Amount / (bizModel.OriginPrice - bizModel.Price) * 100);
                    if (progress == 0) {
                        productModel.progress = 0
                    } else {
                        productModel.progress = progress < 5 ? 5 : progress;
                    }
                    productModel.marketDate = bizModel.MarketDate;
                    productModel.hasOrder = bizModel.OrderId == 0 || bizModel.OrderState == 3 ? false : true;
                    productModel.activityUserId = bizModel.ActivityUserId;
                    return productModel;
                }
                return service;
            }
        ]);
});