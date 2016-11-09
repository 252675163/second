/**
 * Created by dayday on 2015/9/11.
 */
define(["ionic", "services/net/activity-template"], function() {
    return angular.module("MicroBargain1_6.Service", ["services.net.activityTemplate"]).
        factory("microBargain1_6Service", [
            "$http", "activityFormService", "activityTemplateService", function($http, activityFormService, activityTemplateService) {

                var service = {};

                //帮我砍价的用户信息列表
                service.getChristmasUserInfos = function (id, userType, pageIndex) {
                    //是否是第一次分享出来的页面
                    var isFirstShare = userType == "old" ? true : false;
                    return activityTemplateService.getBargainHelperInfo(id, isFirstShare, pageIndex);
                };
                service.render = function() {};
                service.setRenderCallback = function(callback) {
                    service.render = callback;
                };


                return service;
            }
        ]);
});