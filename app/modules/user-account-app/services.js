"use strict";
/**
 * author :zhouhuijuan
 * time:2016.8.2
 * description:用户机构设置和数据迁移页
 */


define(["ionic", "services/net/user-center"], function () {
    return angular.module("UserAccountApp.services", ["Services.net.userCenter"])
        .service("userAccountAppService", [
            "$rootScope", "userCenterNetService", "promptBarService",
            function ($rootScope, userCenterNetService, promptBarService) {
                var service = {};
                service.getUserInfoByUserId = function () {
                    return userCenterNetService.getUserInfoByUserId();
                };
                //解绑
                service.removeSchoolPalLink = function (orgId, orgUserId) {
                    return userCenterNetService.removeSchoolPalLink(orgId, orgUserId);
                };
                //绑定新机构
                service.bindSchoolPal = function (schoolPalWeb, account, password) {
                    return userCenterNetService.bindSchoolPal(schoolPalWeb, account, password);
                };
                //切换关联机构
                service.switchAccount = function (orgId, orgUserId) {
                    return userCenterNetService.switchAccount(orgId, orgUserId);
                };
                service.verify = function (web, account, password) {
                    if (!web) {
                        promptBarService.showErrorBar("请输入机构后缀！", 3000);
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
                //机构数据是否为空 （个人版数据迁移前判断）
                service.orgHasData = function (orgUserId, orgId) {
                    return userCenterNetService.orgHasData(orgUserId, orgId);
                }
                //获取机构状态
                service.getOrgUserState = function (orgUserId) {
                    return userCenterNetService.getOrgUserState(orgUserId);
                }

                //获得机构列表
                service.getAccountList = function () {
                    return userCenterNetService.getUserAccountList();
                }
                //数据迁移
                service.transferData = function (perOrgUserId,orgUserId) {
                    return userCenterNetService.transferData(perOrgUserId, orgUserId);
                };
                //迁移是否完成
                service.getMigrateState = function () {
                    return userCenterNetService.getMigrateState();
                };

                return service;
            }
        ]);
});


