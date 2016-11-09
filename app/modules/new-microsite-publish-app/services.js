"use strict";
/**
 * author :小潘
 * time: 2015年9月9日 20:59:58
 * description:
 */

define(["ionic", "services/net/new-site-publish"], function() {
    return angular.module("NewMicroSitePublishApp.services", ["services.net.newSitePublish"])
        .service("newMicroSitePublishAppService", [
            "$rootScope", "newSitePublishNetService",
            function($rootScope, newSitePublishNetService) {
                var newMicroSitePublishAppService = {};

                newMicroSitePublishAppService.isValid = function(name, phone) {
                    if (name == "") {
                        //var nameRegexp = /^.{1,15}$/;
                        //if (!nameRegexp.test(name))
                        return 1; //名字不正确
                    }
                    if (phone) {
                        var phoneRegexp = /^(0[0-9]{2,3})?([2-9][0-9]{6,7})$|(^(1[3|5|8|4|7])\d{9}$)/;
                        //      console.log(phoneRegexp.test(phone));
                        if (!phoneRegexp.test(phone))
                            return 4; //号码不正确
                    } else {
                        return 3; //号码为空
                    }
                    return 0; //格式正确

                };

                newMicroSitePublishAppService.saveAppInfoAndAppInfo = function(websiteId,userInfo,isManual,appInfo){
                    //isManual是否手动 vip：isManual = false，普通：isManual = true
                    return newSitePublishNetService.saveAppInfoAndAppInfo(websiteId,userInfo.name,userInfo.phone,isManual,appInfo.id,appInfo.secret);
                };
                newMicroSitePublishAppService.getUserWeixinInfo = function(websiteId) {
                    return newSitePublishNetService.getUserWeixinInfo(websiteId);
                };


                return newMicroSitePublishAppService;
            }
        ]);
});