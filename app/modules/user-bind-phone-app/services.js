"use strict";
/**
 * author :
 * time:
 * description:
 */


define(["ionic", "services/net/user-center"], function () {
    return angular.module("UserBindPhoneApp.services", ["Services.net.userCenter"])
        .service("userBindPhoneAppService", [
            "$rootScope","$q", "userCenterNetService","promptBarService",
            function ($rootScope,$q, userCenterNetService,promptBarService) {
                var service = {};

                //service.getUserInfoByUserId = function () {
                //    return userCenterNetService.getUserInfoByUserId();
                //};
                //service.bindSchoolPal = function(schoolPalWeb,account,password){
                //    return userCenterNetService.bindSchoolPal(schoolPalWeb,account,password);
                //};
                service.verifyPhone = function(phone){
                    return userCenterNetService.verifyPhone(phone);
                };
                service.bindPhone = function(phone,code){
                    return userCenterNetService.bindPhone(phone,code);
                };
                service.sendVerificationCode = function (phone) {
                    return userCenterNetService.sendVerificationCode(phone);
                    ////2015.12.25  图形验证码
                    //return userCenterNetService.sendVerifyCodeByImageCode(phone, imgCode);
                };
                //前端校验手机号
                service.verifyPhoneStep1 = function(phone){
                        var d = $q.defer();
                        var phoneRegexp =/^1[34587]\d{9}$/;
                        //      console.log(phoneRegexp.test(phone));
                        if (!phone) {
                            promptBarService.showErrorBar("手机号码不能为空",3000);
                            d.reject({error: 21});
                         }
                        else if (!phoneRegexp.test(phone)) {
                            promptBarService.showErrorBar("手机号码格式不正确",3000);
                            d.reject({error:22});
                            //号码不正确
                        }
                        else {
                            d.resolve();
                        }
                        return d.promise;

                };



                return service;
            }
        ]);
});


