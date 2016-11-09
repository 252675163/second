"use strict";
/**
 * author :
 * time:
 * description:
 */


define(["ionic", "services/net/micro-shop-index", "services/net/micro-shop-management"], function () {
    return angular.module("MicroShopOrderCheckApp.services", ["services.net.microShopIndex", "services.net.microShopManagement"])
        .service("MicroShopOrderCheckAppService", [
            "$rootScope", "microShopIndexNetService", "promptBarService", "microShopManagementNetService",
            function ($rootScope, microShopIndexNetService, promptBarService, microShopManagementNetService) {
                var service = {};
                //商品信息 uiModel化
                service.parseBizModelToUiModel = function (order, product) {
                    var model = {
                        imgUrl: "",
                        title: "标题啊",
                        introduce: "产品的介绍",
                        price: "1599",//现价
                        originPrice: "1", //原价
                        activityTypeModel: {
                            type: "",
                            activityTypeName: "一元砍价",
                            name: "砍价商品",
                            className: ""
                        },
                        productId: 1, //商品id
                        isOnSelf: false,
                        userName: "",
                        userPhone: "",
                        orderNumber: "",
                        orderState: ""
                    }

                    model.productId = product.Id;
                    model.introduce = product.Introduce;
                    model.title = product.Name;
                    model.originPrice = product.OriginPrice;
                    model.price = product.Price;
                    if (!!product.Images) {
                        product.Images = JSON.parse(product.Images);
                        model.imgUrl = !!product.Images && product.Images.constructor === Array ? product.Images[0].url : "";
                    }
                    switch(product.MarketMode) {
                        case 1:
                            model.activityTypeModel.name = "砍价商品";
                            model.activityTypeModel.activityTypeName = "一元砍价";
                            break;
                        case 2:
                            model.activityTypeModel.name = "一口价商品";
                            model.activityTypeModel.activityTypeName = "一口价";
                            break;
                    }
                    model.isOnSelf = product.ProductState == 1;
                    model.activityTypeModel.type = product.MarketMode;
                    model.userName = order.UserName;
                    model.userPhone = order.UserPhone;
                    model.orderNumber = order.OrderNumber;
                    model.orderState = order.OrderState;
                    return model;
                }
                //获取商品详情
                service.getMicroShopProductDetail = function (productId) {
                    return microShopIndexNetService.getMicroShopProductDetail(productId);
                }
                //获取用户信息
                service.getActivityUserInfo = function (activityUserId) {
                    return microShopIndexNetService.getActivityUserInfo(activityUserId);
                }
                //获取根据订单号获取订单
                service.getMicroShopOrder = function (orderId) {
                    return microShopIndexNetService.getMicroShopOrder(orderId);
                }
                //获取支付参数
                service.getPayParameters = function (orderId) {
                    return microShopIndexNetService.getPayParameters(orderId);
                }
                //支付前确认订单状态
                service.getMicroShopOrderByPay = function (orderId) {
                    return microShopIndexNetService.getMicroShopOrderByPay(orderId);
                }
                //支付完成更新订单状态
                service.payReturn = function (orderId) {
                    return microShopIndexNetService.payReturn(orderId);
                }
                return service;
            }
        ]);
});