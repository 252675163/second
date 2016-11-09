"use strict";
/**
 * description:校宝秀报名消息提醒
 */


define(["ionic", "services/net/user-signupremind"], function () {
    return angular.module("UserSignUpRemindSettingApp.services", ["Services.net.userSignupremind"])
        .service("userSignUpRemindSettingAppService", [
            "$rootScope", "userSignupremindNetService",
            function ($rootScope, userSignupremindNetService) {
                var service = {};

                service.getUserSignUpRemind = function () {
                    return userSignupremindNetService.getUserSignUpRemind();
                }

                service.setUserSignUpRemind = function (isNotRemindMsg, type) {
                    return userSignupremindNetService.setUserSignUpRemind(isNotRemindMsg, type);
                }

                return service;
            }
        ]);
});