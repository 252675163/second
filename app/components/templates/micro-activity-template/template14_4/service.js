/**
 * Created by dayday on 2015/9/11.
 */
define(["ionic", "services/net/activity-template"], function() {
    return angular.module("Template14_4.Service", ["services.net.activityTemplate"]).
        factory("template14_4Service", [
            "$http", "activityFormService", "activityTemplateService", function($http, activityFormService, activityTemplateService) {

                var service = {};

                //谁帮我中了草的用户信息列表
                service.getGrassUserInfos = function(id, userType) {
                    //是否是第一次分享出来的页面
                    var isFirstShare = userType == "old" ? true : false;
                    return activityTemplateService.getGrassUserInfos(id, isFirstShare);

                };

                service.getChristmasUserInfos = function (id, userType, pageIndex) {
                    //是否是第一次分享出来的页面
                    var isFirstShare = userType == "old" ? true : false;
                    return activityTemplateService.getChristmasUserInfos(id, isFirstShare, pageIndex);
                };
                service.render = function() {};
                service.setRenderCallback = function(callback) {
                    service.render = callback;
                };


                return service;
            }
        ]);
});