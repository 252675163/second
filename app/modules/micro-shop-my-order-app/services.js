"use strict";
/**
 * author :
 * time:
 * description:
 */

define(["ionic", "services/net/micro-shop-index"], function () {
    return angular.module("MicroShopMyOrderApp.services", ["services.net.microShopIndex"])
        .service("MicroShopMyOrderAppService", [
            "$rootScope", "microShopIndexNetService", "promptBarService",
            function ($rootScope, microShopIndexNetService, promptBarService) {
                var service = {};
                //获取用户订单列表
                service.getOrderList = function (shopId, pageIndex, pageSize) {
                    return microShopIndexNetService.getMyOrderList(shopId, pageIndex, pageSize);
                }
                //获取微店用户信息
                service.getMicroShopUserInfo = function () {
                    return microShopIndexNetService.getMicroShopUserInfo();
                }
                // C端我的订单 订单数据Model UI化
                service.parseBizModelToUiModel = function (bizModel) {
                    var orderModel = {
                        id:"",
                        productName: "撒大大大的萨达1", //商品名
                        orderStateModel: {  //0待付款,1已付款,2已完成,3已失效.
                            code: "",
                            name: "未付款",
                            className: ""
                        },
                        activityTypeModel: {
                            type: "",
                            name: "一元砍价",
                            className: ""
                        },
                        price: 1498, //原价
                        discount: 1, //优惠价
                        userName: "周星星", //预留姓名
                        phone: 18296114288, //预留电话
                        imgUrl: "", //商品图片
                        productId: 1, //商品Id
                        orderNumber: 555555555555555, //订单号
                        orderDate: "" //下单时间
                    }
                    orderModel.id = bizModel.Id;
                    orderModel.productId = bizModel.ProductId;
                    orderModel.productName = bizModel.ProductName;
                    orderModel.originPrice = bizModel.ProductOriginPrice;
                    orderModel.price = bizModel.ProductPrice;
                    orderModel.orderNumber = bizModel.OrderNumber;
                    orderModel.userName = bizModel.UserName;
                    orderModel.phone = bizModel.UserPhone;
                    orderModel.orderDate = bizModel.CreateAt;
                    if (!!bizModel.ProductImages) {
                        bizModel.ProductImages = angular.fromJson(bizModel.ProductImages);
                        orderModel.imgUrl = bizModel.ProductImages.constructor === Array ? bizModel.ProductImages[0].url : "";
                    }
                    //活动类型
                    switch (bizModel.ProductMarketMode) {
                        case 1:
                            orderModel.activityTypeModel.name = "一元砍价";
                            orderModel.activityTypeModel.className = "";
                            break;
                        case 2:
                            orderModel.activityTypeModel.name = "一口价";
                            orderModel.activityTypeModel.className = "";
                            break;
                    }
                    orderModel.activityTypeModel.type = bizModel.ProductMarketMode;
                    //订单状态
                    switch (bizModel.OrderStateCode) {
                        case 0:
                            orderModel.orderStateModel.name = "未付款";
                            orderModel.orderStateModel.className = "";
                            break;
                        case 1:
                            orderModel.orderStateModel.name = "已付款";
                            orderModel.orderStateModel.className = "micro-shop-status-green";
                            break;
                        case 2:
                            orderModel.orderStateModel.name = "已完成";
                            orderModel.orderStateModel.className = "micro-shop-status-gray";
                            break;
                        case 3:
                            orderModel.orderStateModel.name = "已失效";
                            orderModel.orderStateModel.className = "micro-shop-status-gray";
                            break;
                    }
                    orderModel.orderStateModel.code = bizModel.OrderStateCode;
                    return orderModel;
                }
                return service;
            }
        ]);
});