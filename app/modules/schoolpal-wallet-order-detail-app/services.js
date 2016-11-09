"use strict";
/**
 * author :
 * time:
 * description:
 */


define(["ionic", "services/net/schoolpal-wallet"], function() {
    return angular.module("SchoolpalWalletOrderDetailApp.services", ["services.net.schoolpalWallet"])
        .service("SchoolpalWalletAppService", [
            "schoolpalWalletNetService",
            function(schoolpalWalletNetService) {
                var service = {};
                //获取提现详情
                service.getMicroShopDrawApplyDetail = function(id) {
                        return schoolpalWalletNetService.getMicroShopDrawApplyDetail(id);
                    }
                    //获取订单详情
                service.getMicroShopOrder = function(id) {
                    return schoolpalWalletNetService.getMicroShopOrder(id);
                }

                //获取订单详情
                service.getMicroShopUserMsgByUserId = function(id) {
                        return schoolpalWalletNetService.getMicroShopUserMsgByUserId(id);
                    }
                    //获取提现订单头像和昵称
                service.getHeaderNicknameBySchoolPalCloudSignId = function(id) {
                        return schoolpalWalletNetService.getHeaderNicknameBySchoolPalCloudSignId(id);
                    }
                    //uiModel转化
                service.parseBizModelToUiModel = function(bizModel, type) {
                    var detail = {
                        money: 120,
                        id: '1111111112112121',
                        product: '新概念英语初级入门',
                        createDate: new Date(),
                        phone: 18296111111,
                        stateName: "提现成功"
                    };
                     detail.createDate = bizModel.CreateAt;
                    if (type == 2) {
                        detail.createDate = bizModel.CreateAt;
                        detail.phone = bizModel.UserPhone;
                        detail.payMethod = '余额';
                        detail.money = bizModel.Amount;
                        if (bizModel.ApplyState == 0) {
                            detail.stateName = "提现等待中"
                        } else if (bizModel.ApplyState == 1) {
                            detail.stateName = "提现成功"
                        } else if (bizModel.ApplyState == 2) {
                            detail.stateName = "提现失败"
                        }
                    } else if (type == 1) {
                        detail.product = bizModel.ProductName;
                        detail.stateName = "交易成功"
                        detail.money = bizModel.ProductPrice;
                        detail.id = bizModel.OrderNumber;
                        detail.payMethod = "微信支付"
                    }

                    return detail;
                }
                return service;
            }
        ]);
});