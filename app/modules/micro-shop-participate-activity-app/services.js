"use strict";
/**
 * author :
 * time:
 * description:
 */


define(["ionic", "services/net/micro-shop-index", "services/net/micro-shop-management"], function () {
    return angular.module("MicroShopParticipateActivityApp.services", ["services.net.microShopIndex", "services.net.microShopManagement"])
        .service("MicroShopParticipateActivityAppService", [
            "$rootScope", "microShopIndexNetService", "promptBarService", "microShopManagementNetService",
            function ($rootScope, microShopIndexNetService, promptBarService, microShopManagementNetService) {
                var service = {};
                //获取微店用户信息
                service.getMicroShopUserInfo = function (userId) {
                    return microShopIndexNetService.getMicroShopUserInfo(userId);
                }
                //商品信息 uiModel化
                service.parseBizModelToUiModel = function (bizModel) {
                    var uiModel = {
                        imgUrl: "",
                        title: "标题啊",
                        introduce: "产品的介绍",
                        price: "1599",
                        discount: "1", //现价
                        activityType: 1, //活动类型
                        actTypeShow: { name: "砍价商品", className: "" },
                        productId: 1, //商品id
                        shopId: 9,
                        activityId: "",
                        isOnSelf: false,
                        submitBtnText: ""
                    }
                    uiModel.productId = bizModel.Id;
                    uiModel.introduce = bizModel.Introduce;
                    uiModel.title = bizModel.Name;
                    uiModel.price = bizModel.OriginPrice;
                    uiModel.shopId = bizModel.shopId;
                    uiModel.discount = bizModel.Price;
                    if (!!bizModel.Images) {
                        bizModel.Images = JSON.parse(bizModel.Images);
                        uiModel.imgUrl = !!bizModel.Images && bizModel.Images.constructor === Array ? bizModel.Images[0].url : "";
                    }
                    uiModel.activityType = bizModel.MarketMode;
                    if (uiModel.activityType == 1) {
                        uiModel.actTypeShow = { name: "砍价商品", className: "" }
                        uiModel.submitBtnText = "生成我的砍价页面";
                    }
                    else if (uiModel.activityType == 2) {
                        uiModel.submitBtnText = "生成我的订单";
                    }
                    uiModel.isOnSelf = bizModel.ProductState == 1;
                    uiModel.activityId = bizModel.ActivityId;
                    return uiModel;
                }
                //获取商品详情
                service.getMicroShopProductDetail = function (productId) {
                    return microShopIndexNetService.getMicroShopProductDetail(productId);
                }
                //参加活动
                service.participateActivity = function (activityId, userName, phone, config) {
                    return microShopIndexNetService.addUser(activityId, userName, phone, config);
                }
                //生成订单
                service.addOrderByProductId = function (productId, userName, userPhone) {
                    return microShopIndexNetService.addOrderByProductId(productId, userName, userPhone);
                }
                return service;
            }
        ]);
});