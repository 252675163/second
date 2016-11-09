"use strict";
/**
 * author :lv li¡¢xu jie¡¢jiawen xu
 * update time:2016/8/2
 * description:¸ú½øÁÐ±í
 */


define(["ionic", "services/net/registration-book", "services/net/activity-index", "services/net/templatesmodel"], function () {
    return angular.module("MicroRegistrationBookOngoingApp.services", ["services.net.registrationBook", "services.net.activityIndex", "services.net.templatesModel"])
        .service("MicroRegistrationBookOngoingAppService", [
            "$rootScope", "registrationBookNetService", "activityIndexNetService", "templatesModelService",
              function ($rootScope, registrationBookNetService, activityIndexNetService, templatesModelService) {
                  var service = {};

                  service.getRegBookUserList = function (pageIndex, pageSize, regBookUserListType, followUpStatusList, regBookTemplateTypeList, sceneIdList) {
                      return registrationBookNetService.getRegBookUserList(pageIndex, pageSize, regBookUserListType, followUpStatusList, regBookTemplateTypeList, sceneIdList);
                  };

                  service.getNewUserNum = function () {
                      return registrationBookNetService.getNewUserNum();
                  };

                  service.markTop = function (regUserId, isTop) {
                      return registrationBookNetService.markTop(regUserId, isTop);
                  };

                  service.setContent = function (regUserId, content) {
                      return registrationBookNetService.setContent(regUserId, content);
                  }; 

                  service.markAsRead = function (regUserId) {
                      return registrationBookNetService.markAsRead(regUserId);
                  };

                  service.GetRegistrationBookSceneList = function (pageIndex, pageSize) {
                      return registrationBookNetService.GetRegistrationBookSceneList(pageIndex, pageSize);
                  };

                  service.isShowNotice = function (configKey) {
                      return registrationBookNetService.isShowNotice(configKey);
                  }

                  service.updateUserConfig = function (configKey, configValue) {
                      return registrationBookNetService.updateUserConfig(configKey, configValue);
                  }
                  
                  service.setVisitTime = function (regUserId, visitTime, type) {
                      return registrationBookNetService.setVisitTime(regUserId, visitTime, type);
                  }

                  service.getCurrentUserInfo = function () {
                      return registrationBookNetService.getCurrentUserInfo();
                  }

                  service.createCommu = function (regUserId, content) {
                      return registrationBookNetService.createCommu(regUserId, content);
                  }; 

                  service.getCommuList = function (regUserId,pageIndex,pageSize) {
                      return registrationBookNetService.getCommuList(regUserId,pageIndex,pageSize);
                  };

                  return service;
              }
        ]);
});