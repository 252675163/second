"use strict";
/**
 * author :
 * time:
 * description:
 */


define(["ionic", "services/net/user-center"], function () {
    return angular.module("UserCenterApp.services", ["Services.net.userCenter"])
        .service("userCenterAppService", [
            "$rootScope", "userCenterNetService", "promptBarService",
            function ($rootScope, userCenterNetService, promptBarService) {
                var service = {};
                service.getUserInfoByUserId = function () {
                    return userCenterNetService.getUserInfoByUserId();
                };
                service.removeSchoolPalLink = function(){
                    return userCenterNetService.removeSchoolPalLink();
                };
                service.bindSchoolPal = function (schoolPalWeb, account, password) {
                    return userCenterNetService.bindSchoolPal(schoolPalWeb, account, password);
                };
                service.updateUserConfig = function (configKey, configValue) {
                    return userCenterNetService.updateUserConfig(configKey, configValue);
                }
                service.isShowNotice = function (configKey) {
                    return userCenterNetService.isShowNotice(configKey);
                }
                
                service.getSchoolPalWalletAccount = function () {
                    return userCenterNetService.getSchoolPalWalletAccount();
                }
                //注销
                service.signOut = function () {
                    return userCenterNetService.signOut();
                }
                service.getMicroShopByCurrentUser=function () { 
                    return userCenterNetService.getMicroShopByCurrentUser();
                 }
                service.verify = function (web, account, password) {
                    if (!web) {
                        promptBarService.showErrorBar("请输入校宝网址后缀！", 3000);
                        return false;
                    } else if (!account) {
                        promptBarService.showErrorBar("请输入校宝账号！", 3000);
                        return false;
                    } else if (!password) {
                        promptBarService.showErrorBar("请输入校宝密码！", 3000);
                        return false;
                    }
                    return true;
                }

                return service;
            }
        ]);
});


