"use strict";
/**
 * author :
 * time:
 * description:
 */


define(["ionic", "services/net/user-center"], function () {
    return angular.module("UserBindSchoolPalApp.services", ["Services.net.userCenter"])
        .service("userBindSchoolPalAppService", [
            "$rootScope", "userCenterNetService",
            function ($rootScope, userCenterNetService) {
                var service = {};

                service.getUserInfoByUserId = function () {
                    return userCenterNetService.getUserInfoByUserId();
                };
                service.bindSchoolPal = function(schoolPalWeb,account,password){
                    return userCenterNetService.bindSchoolPal(schoolPalWeb,account,password);
                };

                return service;
            }
        ]);
});


