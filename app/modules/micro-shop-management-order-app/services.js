"use strict";
/**
 * author :
 * time:
 * description:
 */


define(["ionic", "services/net/micro-shop-management"], function () {
    return angular.module("MicroShopManagementOrderApp.services", ["services.net.microShopManagement"])
        .service("MicroShopManagementOrderAppService", [
            "$rootScope", "microShopManagementNetService", "promptBarService",
            function ($rootScope, microShopManagementNetService, promptBarService) {
                var service = {};

                //订单商品列表
                service.getMicroShopOrders = function (pageIndex, pageSize) {
                    return microShopManagementNetService.getMicroShopOrders(pageIndex, pageSize);
                }

                //更新订单状态为已完成
                service.updateMicroShopOrderFinish = function (orderId) {
                    return microShopManagementNetService.updateMicroShopOrderFinish(orderId);
                }
                

                //uiModel转化
                service.parseBizModelToUiModel = function (bizModel) {
                    var orderModel = {
                        id: 1,
                        orderNumber: "4444444444",
                        //orderState: 1,        //订单状态
                        orderStateCodeModel: {
                            code: 1,//订单状态 0: "待付款",1: "已付款",2: "已完成",3: "已失效"
                            name: "已付款",
                            className:""
                        },     
                        orderCreateDate:"",
                        userName: "星星",
                        userPhone:"13733333333",
                        productName: "满天小星星",//名称
                        productPrice: 1499,  //原价
                        productDiscount: 1, //优惠价
                        productImgUrl: "/app/img/1-2.jpg" //商品首张图片
                        
                    }
                    orderModel.id = bizModel.Id;
                    orderModel.orderNumber = bizModel.OrderNumber;
                    if (bizModel.OrderStateCode == 0) {
                        orderModel.orderStateCodeModel.name = "待付款";
                        orderModel.orderStateCodeModel.className = "";
                    } 
                    else if (bizModel.OrderStateCode == 1) {
                        orderModel.orderStateCodeModel.name = "已付款";
                        orderModel.orderStateCodeModel.className = "micro-shop-status-green";
                    }
                    else if (bizModel.OrderStateCode == 2) {
                        orderModel.orderStateCodeModel.name = "已完成";
                        orderModel.orderStateCodeModel.className = "micro-shop-status-gray";
                    }
                    else if (bizModel.OrderStateCode == 3) {
                        orderModel.orderStateCodeModel.name = "已失效";
                        orderModel.orderStateCodeModel.className = "micro-shop-status-gray";
                    }
                    orderModel.orderStateCodeModel.code = bizModel.OrderStateCode;
                    //orderModel.orderState = bizModel.OrderState;
                    orderModel.orderCreateDate = bizModel.CreateAt;
                    orderModel.userName = bizModel.UserName;
                    orderModel.userPhone = bizModel.UserPhone;
                    orderModel.productName = bizModel.ProductName;
                    orderModel.productPrice = bizModel.ProductOriginPrice;
                    orderModel.productDiscount = bizModel.ProductPrice;
                    if (!!bizModel.ProductImages) {
                        bizModel.ProductImages = angular.fromJson(bizModel.ProductImages);
                        orderModel.productImgUrl = bizModel.ProductImages.constructor === Array ? bizModel.ProductImages[0].url : "";
                    }
                    return orderModel;
                }

                return service;
            }
        ]);
});


