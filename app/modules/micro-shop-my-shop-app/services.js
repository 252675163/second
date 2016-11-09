"use strict";
/**
 * author :
 * time:
 * description:
 */


define(["ionic", "services/net/micro-shop-index"], function () {
    return angular.module("MicroShopMyShopApp.services", ["services.net.microShopIndex"])
        .service("MicroShopMyShopAppService", [
            "$rootScope", "microShopIndexNetService", "promptBarService",
            function ($rootScope, microShopIndexNetService, promptBarService) {
                var service = {};
                service.shareConfig = {
                    "title": "【满天星机构】的小店开业啦，快来抢购吧！",
                    "desc": "新店开张，优惠多多，好处多多，快来购买吧！",
                    "link": "http://dev.xbx100.cn/GameViewoolw2ggqm33irsor8eqoxbt9Share?p=activity/oldandnewview?Id=1407",
                    "imgUrl": "http://cdn.schoolpal.cn/shiningstar/Activity/20160513195258-4626f.png",
                    "type": "",
                    "dataUrl": ""
                }
                //商品列表uiModel转化
                service.getMicroShopModel = function (model) {
                    var productModel = {
                        id: 1,
                        name: "天下第一武道会", //名称
                        price: 0, //原价
                        originPrice: 2400, //现价
                        endDate: "", //倒计时
                        imgList: "/app/img/1-2.jpg", //商品图片,
                        productStateCodeModel: {
                            code: 0,
                            name: ""
                        }, //用户参与活动状态值
                        marketMode: 1,
                        leftSeconds: 0,//剩余时间
                        saleNum:0
                    }
                    productModel.id = model.Id;
                    productModel.name = model.Name;
                    productModel.price = model.Price;
                    productModel.originPrice = model.OriginPrice;
                    productModel.endDate = model.MarketDate;
                    productModel.imgList = angular.fromJson(model.Images);
                    productModel.productStateCodeModel.code = model.ProductStateCode;
                    if (productModel.productStateCodeModel.code == 2) {
                        productModel.productStateCodeModel.name = "商品已售罄";
                    }
                    else if (productModel.productStateCodeModel.code == 3) {
                        productModel.productStateCodeModel.name = "活动已结束";
                    }
                    productModel.marketMode = model.MarketMode;
                    productModel.saleNum = model.PayOrderCount + model.FinishOrderCount;
                    return productModel;
                }

                // 店铺信息uiModel转化
                service.getShopInfoModel = function (model) {
                    var shopInfoModel = {
                        address: "杭州哈哈哈11123",//地址
                        contact: "13755565555",//联系电话
                        id: 9, //店铺ID
                        imageUrl: "",//店铺图片
                        name: "满天ythtty000003",//店铺名称
                        introduce: "12312312",//机构介绍
                        shareConfig: ""//分享信息
                    }
                    shopInfoModel.id = model.Id;
                    shopInfoModel.name = model.Name;
                    shopInfoModel.address = model.Address;
                    shopInfoModel.contact = model.Contact;
                    shopInfoModel.introduce = model.Introduce;
                    shopInfoModel.imageUrl = angular.fromJson(model.Images);
                    shopInfoModel.shareConfig = !model.ShareConfig ? model.ShareConfig : angular.fromJson(model.ShareConfig);
                    return shopInfoModel;
                }

                service.getMicroShopByShopId = function (id) {
                    return microShopIndexNetService.getMicroShopByShopId(id);
                }
                service.getMicroShopProductsList = function (id, pageIndex, pageSize) {
                    return microShopIndexNetService.getMicroShopProductsList(id, pageIndex, pageSize);
                }
                service.getSystemTime = function () {
                    return microShopIndexNetService.getServerDateTime();
                }
                service.updateShareConfig = function (id, config) {
                    return microShopIndexNetService.updateShareConfig(id, config);
                }
                //统计店铺浏览量
                service.addShopPV = function (shopId) {
                    return microShopIndexNetService.addMicroShopLog(shopId, 1);
                }
                return service;
            }
        ]);
});


