"use strict";
/**
 * author :lv li��xu jie��jiawen xu
 * update time:2016/8/2
 * description:�����б�
 */


define(["ionic", "services/net/registration-book", "services/net/activity-index", "services/net/templatesmodel"], function () {
    return angular.module("MicroRegistrationBookChannelApp.services", ["services.net.registrationBook", "services.net.activityIndex", "services.net.templatesModel"])
        .service("MicroRegistrationBookChannelAppService", [
            "$rootScope", "registrationBookNetService", "activityIndexNetService", "templatesModelService",
              function ($rootScope, registrationBookNetService, activityIndexNetService, templatesModelService) {
                  var service = {};
                  return service;
              }
        ]);
});