/**
 * author :xujiawen
 * time: 2016年6月29日
 * description:砍价联系方式
 */
define(["ionic", "services/net/activity-template"], function() {
    return angular.module("MicroSpellgroup1_5.Service", ["services.net.activityTemplate"]).
        factory("microSpellgroup1_5Service", [
            "$http", "activityFormService", "activityTemplateService", function($http, activityFormService, activityTemplateService) {

                var service = {};
                service.model =
                {
                    tel:"0575-66666666",
                    address: "北京市海淀区颐和园路5号"
                };
                var serviceInfo = {};
                service.getModel = function () {

                    return serviceInfo;
                }
                service.setModel = function (templateModel) {

                    serviceInfo.templateModel = templateModel;
                }
                return service;
            }
        ]);
});