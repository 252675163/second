/**
 * 
 */
define(["ionic", "services/net/activity-template"], function () {
    return angular.module("Template23_5.Service", ["services.net.activityTemplate"]).
        factory("template23_5Service", [
            "$http", "activityFormService", "activityTemplateService", function ($http, activityFormService, activityTemplateService) {

                var service = {};

                //后去排行榜
                service.getGrassRanks = function (id, userType) {
                    //是否是第一次分享出来的页面
                    var isFirstShare = userType == "old" ? true : false;
                    return activityTemplateService.getGrassRanks(id, isFirstShare);

                };

                var userInfo = {};
                //获取当前用户信息
                service.getUserInfo = function () {
                    return userInfo;
                };
                service.setUserInfo = function (info) {
                    userInfo = info;
                };
                service.render = function () { };
                service.setRenderCallback = function (callback) {
                    service.render = callback;
                };
                return service;
            }
        ]);
});