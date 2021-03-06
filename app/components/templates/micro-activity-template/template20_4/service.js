/**
 * Created by dayday on 2015/9/11.
 */
define(["ionic", "services/net/activity-template"], function() {
    return angular.module("Template20_4.Service", ["services.net.activityTemplate"]).
        factory("template20_4Service", [
            "$http", "activityFormService", "activityTemplateService", function($http, activityFormService, activityTemplateService) {

                var service = {};

                ////谁帮我中了草的用户信息列表
                service.getVoucherRankUserInfos = function (id, userType, pageIndex) {
                    //是否是第一次分享出来的页面
                    var isFirstShare = userType == "old" ? true : false;
                    return activityTemplateService.getVoucherRankUserInfos(id, isFirstShare, pageIndex);
                };
                service.render = function() {};
                service.setRenderCallback = function(callback) {
                    service.render = callback;
                };

                var uiConfig = {
                    isShow:true
                };
                service.getUiConfig=function(){
                    return uiConfig;
                };
                //配置是否显示
                service.setUiConfigOfIsShow = function(isShow){
                    uiConfig.isShow=isShow;
                };

                
                return service;
            }
        ]);
});