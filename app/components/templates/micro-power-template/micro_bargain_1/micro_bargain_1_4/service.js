/**
 * author :xujiawen
 * time: 2016年6月29日
 * description:砍价联系方式
 */
define(["ionic", "services/net/activity-template"], function() {
    return angular.module("MicroBargain1_4.Service", ["services.net.activityTemplate"]).
        factory("microBargain1_4Service", [
            "$http", "activityFormService", "activityTemplateService", function($http, activityFormService, activityTemplateService) {

                var service = {};
                service.model =
                {
                    description: ["您可填写课程介绍、学校简介等信息", "0574-66666666","北京市海淀区颐和园路5号（益生大厦6楼608）"]
                };
                
                return service;
            }
        ]);
});