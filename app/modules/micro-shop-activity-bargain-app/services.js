"use strict";
/**
 * author :
 * time:
 * description:
 */


define(["ionic", "services/net/micro-shop-index"], function () {
    return angular.module("MicroShopActivityBargainApp.services", ["services.net.microShopIndex"])
        .service("MicroShopActivityBargainAppService", [
            "$rootScope", "microShopIndexNetService",
            function ($rootScope, microShopIndexNetService) {
                var service = {};
                //获取活动详情
                service.getActivityUserInfo = function (activityUserId) {
                    return microShopIndexNetService.getActivityUserInfo(activityUserId);
                }
                //获取商品信息
                service.getMicroShopProductDetail = function (productId) {
                    return microShopIndexNetService.getMicroShopProductDetail(productId);
                }
                //获取系统时间
                service.getServerDateTime = function () {
                    return microShopIndexNetService.getServerDateTime();
                }
                //砍价接口
                service.microBargainPower = function (activityUserId) {
                    return microShopIndexNetService.microBargainPower(activityUserId);
                }
                //获取帮忙砍价用户列表
                service.getBargainHelperInfo = function (activityUserId, pageIndex, pageSize) {
                    return microShopIndexNetService.getBargainHelperInfo(activityUserId, pageIndex, pageSize);
                }
                //生成订单
                service.addMicroShopOrder = function (activityUserId) {
                    return microShopIndexNetService.addMicroShopOrder(activityUserId);
                }
                //统计商品浏览量
                service.addProductPV = function (productId) {
                    return microShopIndexNetService.addMicroShopLog(productId, 2);
                }
                //uiModel转化
                service.parseBizModelToUiModel = function (bizModel) {
                    var productModel = {
                        productId: "",
                        shopId: "",
                        name: "天下第一武道会", //名称
                        price: 1, //现价
                        originPrice: 2400, //原价
                        saleNum: 0, //已出售数量
                        stock: "", //库存
                        productStateModel: { //商品状态  0 正常、1 已参加、2 已售罄、3 已结束
                            code: "",
                            name: ""
                        },
                        isOnSelf: false,//商品是否上架
                        activityName: "",//活动名称
                        endDate: "",//截止时间
                        leftSeconds: "",//剩余秒数
                        imgList: "/app/img/1-2.jpg", //商品图片
                        introduction: "",//商品介绍
                        activityRule: ""//活动规则

                    }
                    productModel.productId = bizModel.Id;
                    productModel.shopId = bizModel.ShopId;
                    productModel.name = bizModel.Name;
                    productModel.price = bizModel.Price;
                    productModel.originPrice = bizModel.OriginPrice;
                    productModel.saleNum = bizModel.PayOrderCount + bizModel.FinishOrderCount;;
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
                        productModel.activityName = "一元砍价";
                        productModel.activityRule = "1.点击【马上参加】可以生成自己的砍价页面；\n" +
                        "2.您能帮每个分享者砍价一次，也能帮自己砍价；\n" +
                        "3.当商品价格砍到了一元时，就可以直接下单购买；\n" +
                        "4.每个优惠商品数量有限，先到先得。\n";
                    }
                    productModel.endDate = bizModel.MarketDate;
                    productModel.imgList = angular.fromJson(bizModel.Images);
                    productModel.introduction = !bizModel.Introduce ? "该商品暂无介绍" : bizModel.Introduce;
                    return productModel;
                }
                service.parseActivityUserInfoModel = function (model) {
                    var uiModel = {
                        userId: "",
                        activityUserId: "",//活动id
                        userName: "",//活动用户名字
                        headImageUrl: "",//活动用户头像
                        activityUserState: ""
                    }
                    uiModel.userId = model.UserId;
                    uiModel.activityUserId = model.Id;
                    uiModel.userName = model.Name;
                    if (model.Config) {
                        uiModel.headImageUrl = angular.fromJson(model.Config).headImageUrl;
                    }
                    uiModel.activityUserState = model.ActivityUserState;
                    return uiModel;
                }
                //uiModel转化
                //service.parseBizModelToUiModel = function (bizModel) {
                //    var orderModel = {
                //        createtAt: "",
                //        id: 1,
                //        imgUrl: "", //轮播图图片
                //        userPhoto:"",//用户头像
                //        introduce: "",//商品介绍
                //        marketDate: "",//活动截止时间
                //        activityType: "",//活动类型
                //        marketNumber: "",//需砍价人数
                //        name: "",//活动名称
                //        userName:"",//用户名
                //        orderCount: "",//已抢够数
                //        originPrice: "",//原价
                //        price: "",//优惠价
                //        productState: "",//商品状态
                //        productStateCode: "",//状态代码 仓库中:0 出售中:1 已售罄:2 已结束:3
                //        shopId: "",
                //        stock: "",//商品总量
                //        userId: "",
                //        helpName: "",//帮砍帮砍时间姓名
                //        helpImg: "",//帮砍头像
                //        helpPrice: "",//帮砍价格
                //        helpTime: "",//帮砍时间

                //    }

                //    orderModel.createtAt = bizModel.CreateAt;
                //    orderModel.id = bizModel.Id;
                //    orderModel.imgUrl = bizModel.Images;
                //    orderModel.introduce = bizModel.Introduce;
                //    orderModel.marketDate = bizModel.MarketDate;
                //    orderModel.activityType = bizModel.MarketMode;//砍价模式
                //    orderModel.marketNumber = bizModel.MarketNumber;
                //    orderModel.name = bizModel.Name;
                //    orderModel.orderCount = bizModel.OrderCount;
                //    orderModel.originPrice = bizModel.OriginPrice;
                //    orderModel.price = bizModel.Price;
                //    orderModel.productState = bizModel.ProductState;
                //    orderModel.productStateCode = bizModel.ProductStateCode;
                //    orderModel.shopId = bizModel.ShopId;
                //    orderModel.stock = bizModel.Stock;
                //    orderModel.userId = bizModel.UserId;


                //    return orderModel;
                //} 

                service.getHelperModel = function (bizModel) {
                    var model = {
                        name: "",//帮砍帮砍时间姓名
                        imgUrl: "",//帮砍头像
                        helpPrice: "",//帮砍价格
                        helpTime: ""//帮砍时间

                    }
                    model.name = bizModel.Nickname;
                    model.imgUrl = bizModel.HeadImgUrl;
                    model.helpPrice = bizModel.Amount;
                    model.helpTime = bizModel.CreatedAt;

                    return model;
                }

                return service;
            }
        ]);
});


