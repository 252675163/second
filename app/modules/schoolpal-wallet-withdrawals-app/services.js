"use strict";
/**
 * author :
 * time:
 * description:
 */


define(["ionic", "services/net/schoolpal-wallet"], function() {
    return angular.module("SchoolpalWalletWithdrawalsApp.services", ["services.net.schoolpalWallet"])
        .service("SchoolpalWalletWithdrawalsAppService", [
            "schoolpalWalletNetService",
            function(schoolpalWalletNetService) {
                var service = {};
                //获取带星号的校长手机
                service.getSchoolPalWalletAccount = function() {
                        return schoolpalWalletNetService.getSchoolPalWalletAccount()
                    }
                    //获取提现 收入订单列表
                service.getMicroShopEventLogs = function(pageIndex, pageSize) {
                        return schoolpalWalletNetService.getMicroShopEventLogs(pageIndex, pageSize)
                    }
                    //提现规则判断
                service.checkMicroShopDrawApply = function() {
                    return schoolpalWalletNetService.checkMicroShopDrawApply()
                }

                service.parseBizModelToUiModel = function(bizModel) {
                    var detail = {
                        id: 12312312131,
                        money: 1,
                        data: new Date(),
                        state: 0, //状态 1 成功
                        type: 0 //分类 2 提现
                    };
                    detail.data = bizModel.CreateAt;
                    detail.money = bizModel.Amount;
                    detail.id = bizModel.Id;
                    if (bizModel.Type == 2) {
                        //提现
                        detail.type = 2;
                        detail.state = bizModel.State;
                    } else if (bizModel.Type == 1) {
                        //订单收入
                        detail.type = 1;
                        detail.state = 1;
                    }
                    return detail;
                }
                return service;
            }
        ]);
});