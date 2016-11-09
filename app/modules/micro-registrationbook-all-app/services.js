"use strict";
/**
 * author :
 * time: 
 * description:
 */


define(["ionic", "services/net/registration-book", "services/net/activity-index", "services/net/templatesmodel"], function() {
    return angular.module("MicroRegistrationBookAllApp.services", ["services.net.registrationBook", "services.net.activityIndex", "services.net.templatesModel"])
        .service("MicroRegistrationBookAllAppService", [
            "$rootScope", "registrationBookNetService", "activityIndexNetService", "templatesModelService",
            function($rootScope, registrationBookNetService, activityIndexNetService, templatesModelService) {
                var service = {};
                service.getRegBookUserList = function(pageIndex, pageSize, regBookUserListType, followUpStatusList, regBookTemplateTypeList, sceneIdList, interests, salesMan, searchTags, searchCollect, orderByField, orderBy) {
                    return registrationBookNetService.getRegBookUserList(pageIndex, pageSize, regBookUserListType, followUpStatusList, regBookTemplateTypeList, sceneIdList, interests, salesMan, searchTags, searchCollect, orderByField, orderBy);
                };

                // service.getNewUserNum = function() {
                //     return registrationBookNetService.getNewUserNum();
                // };

                // service.markTop = function(regUserId, isTop) {
                //     return registrationBookNetService.markTop(regUserId, isTop);
                // };

                service.markAsRead = function(regUserId) {
                    return registrationBookNetService.markAsRead(regUserId);
                };

                service.GetRegistrationBookSceneList = function(pageIndex, pageSize) {
                    return registrationBookNetService.GetRegistrationBookSceneList(pageIndex, pageSize);
                };



                // service.updateUserConfig = function(configKey, configValue) {
                //     return registrationBookNetService.updateUserConfig(configKey, configValue);
                // }

                // service.getCurrentUserInfo = function() {
                //     return registrationBookNetService.getCurrentUserInfo();
                // }

                service.fastCreateConsult = function(res) {
                    return registrationBookNetService.fastCreateConsult(res);
                }

                service.getSaleManList = function() {
                    return registrationBookNetService.getSaleManList();
                };

                service.allotSalesMan = function(saleManName, regUesrs) {
                    return registrationBookNetService.allotSalesMan(saleManName, regUesrs);
                };

                // service.getErpUserInfo = function() {
                //     return registrationBookNetService.getErpUserInfo();
                // };

                return service;
            }
        ]);
});