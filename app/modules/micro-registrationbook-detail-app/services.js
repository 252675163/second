"use strict";
/**
 * author :lv li、xu jie、jiawen xu
 * update time: 2016/8/2
 * description:咨询本详情页
 */


define(["ionic", "services/net/registration-book"], function() {
    return angular.module("MicroRegistrationBookDetailApp.services", ["services.net.registrationBook"])
        .service("microRegistrationbookDetailAppService", [
            "$rootScope", "registrationBookNetService", "promptBarService",
            function($rootScope, registrationBookNetService, promptBarService) {
                var service = {};
                service.getRegBookUserById = function(userId) {
                    return registrationBookNetService.getRegBookUserById(userId);
                };

                service.updateRegBookUser = function(data) {
                    return registrationBookNetService.updateRegBookUser(data);
                }

                service.updateRegBookUserTopStatus = function(userId, isTop) {
                    return registrationBookNetService.markTop(userId, isTop);
                }

                service.getRegbookUserRecordByRegBookUserId = function(userId, pageIndex, pageSize) {
                    return registrationBookNetService.getRegbookUserRecordByRegBookUserId(userId, pageIndex, pageSize);
                }

                // service.setVisitTime = function(regUserId, visitTime, type) {
                //     return registrationBookNetService.setVisitTime(regUserId, visitTime, type);
                // }

                // service.updateUserConfig = function(configKey, configValue) {
                //     return registrationBookNetService.updateUserConfig(configKey, configValue);
                // }

                // service.isShowNotice = function(configKey) {
                //     return registrationBookNetService.isShowNotice(configKey);
                // }

                // service.getCurrentUserInfo = function() {
                //     return registrationBookNetService.getCurrentUserInfo();
                // }

                // service.getCommuList = function(regUserId, pageIndex, pageSize) {
                //     return registrationBookNetService.getCommuList(regUserId, pageIndex, pageSize);
                // };

                service.createCommu = function(regUserId, content, remindDate, isRemind) {
                    return registrationBookNetService.createCommu(regUserId, content, remindDate, isRemind);
                };
                service.getSaleManList = function() {
                    return registrationBookNetService.getSaleManList();
                };

                service.scheduleDone = function(commuId, isDone) {
                    return registrationBookNetService.scheduleDone(commuId, isDone);
                };

                service.getConsultFollowingUp = function(pageIndex, pageSize, id) {
                    return registrationBookNetService.getConsultFollowingUp(pageIndex, pageSize, id);
                };

                service.getLesson = function() {
                    return registrationBookNetService.getLesson();
                };



                return service;
            }
        ]);
});