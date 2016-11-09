/**
 * 
 */
define(["ionic", "services/net/activity-template"], function () {
    return angular.module("Template24_4.Service", ["services.net.activityTemplate"]).
        factory("template24_4Service", [
            "$http",  "activityTemplateService", function ($http, activityTemplateService) {

                var service = {};
                service.model = {
                    "title": "看看谁帮你种了菜",
                    "description": "帮你种了一棵菜",
                    "titleColor": "red",                            //标题色值
                    "descriptionColor": "#333"                      //提示文案色值
                };

                ////助力用户信息列表
                service.getChristmasUserInfos = function (id, userType, pageIndex) {
                    //是否是第一次分享出来的页面
                    var isFirstShare = userType == "old" ? true : false;
                    return activityTemplateService.getActivityInteractiveRecords(id, isFirstShare, pageIndex);
                };
                service.render = function () { };
                service.setRenderCallback = function (callback) {
                    service.render = callback;
                };


                return service;
            }
        ]);
});