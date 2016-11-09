"use strict";
/**
 * author :
 * time:
 * description:
 */


define(["ionic", "services/net/user-center"], function () {
    return angular.module("UserLoginApp.services", ["Services.net.userCenter"])
        .service("userLoginAppService", [
            "$rootScope","$q", "userCenterNetService","promptBarService",
            function ($rootScope,$q, userCenterNetService,promptBarService) {
                var service = {};
                service.verifyPhone = function(phone){
                    return userCenterNetService.verifyPhone(phone);
                };
                service.sendVerificationCode = function (phone) {
                    return userCenterNetService.sendVerificationCode(phone);
                    ////2015.12.25  图形验证码
                    //return userCenterNetService.sendVerifyCodeByImageCode(phone, imgCode);
                };
                //获取老用户手机号码
                service.getPhone = function () {
                    return userCenterNetService.getPhone();
                }

                //检验手机号码类型 phoneType:1 注册，2 账号已被绑定，3 密码登录
                service.checkPhoneType = function (phone) {
                    return userCenterNetService.checkPhoneType(phone);
                }

                //登录接口  1补密码 2注册  3改密码 4密码登录 
                service.login = function (phone, code, password, type) {
                    return userCenterNetService.login(phone, code, password, type);
                }

                return service;
            }
        ]);
});


