/**
 * Created by dayday on 2015/9/11.
 */
define(["ionic"], function() {
    return angular.module("Template20_3.Service", []).
        factory("template20_3Service", [
            "$http", "activityFormService", function($http, activityFormService) {

                var service = {};
                service.model =
                {
                    title:["活动介绍","电话","地址"],
                    description: ["您可填写课程介绍、学校简介、报名附加优惠等信息", "010-66666666", "北京市海淀区颐和园路5号"]
                };

                var contactInfo = {};
                //外部获得使用条件
                service.getContactInfo = function () {
                    return contactInfo;
                };
                service.setContactInfo = function (model) {
                    contactInfo.title = model.title;
                    contactInfo.description = model.description;
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