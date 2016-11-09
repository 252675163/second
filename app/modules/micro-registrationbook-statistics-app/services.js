"use strict";
/**
 * author :lv li¡¢xu jie¡¢jiawen xu
 * update time:2016/8/2
 * description:¸ú½øÁÐ±í
 */


define(["ionic", "services/net/registration-book", "services/net/activity-index", "services/net/templatesmodel"], function () {
    return angular.module("MicroRegistrationBookStatisticsApp.services", ["services.net.registrationBook", "services.net.activityIndex", "services.net.templatesModel"])
        .service("MicroRegistrationBookStatisticsAppService", [
            "$rootScope", "registrationBookNetService", "activityIndexNetService", "templatesModelService",
              function ($rootScope, registrationBookNetService, activityIndexNetService, templatesModelService) {
                  var service = {};
                  return service;
              }
        ]);
});