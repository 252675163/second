/**
 * author :chenxuedong
 * time: 2016-05-17 23:25:43
 * description: templateModel就是该模板创建的结构，自定义
 */
define(["ionic"], function() {
    return angular.module("Template21_3.Service", ["services.net.activityForm"]).
        factory("template21_3Service", [
            "$http", function($http) {

                var service = {};
                service.model =
                {
                    title:["活动介绍","电话","机构地址","二维码"],
                    description: ["您可填写课程介绍、学校简介等信息", "010-66666666", "北京市海淀区颐和园路5号",""]
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
                
                //用于预览时数据显示
                var activeInfo = {};
                
                //外部获得活动信息
                service.getActiveInfo = function () {
                    return activeInfo;
                };
                //保存当前的活动信息
                service.setActiveName = function (info) {
                    activeInfo = info;
                }
                
                //页面数据
                var data = {};
                service.getTemplateModel = function(){
                    return data;
                };
                service.setDataOfTempaletModel = function(templateModel){
                    data.templateModel = templateModel;
                };

                service.getConfigByAspectRatio = function (aspectRatio) {
                    return {
                        aspectRatio: aspectRatio ? aspectRatio : 16 / 9,
                        autoCropArea: 0.7,
                        strict: true,
                        guides: false,
                        center: true,
                        highlight: false,
                        dragCrop: false,
                        cropBoxMovable: false,
                        cropBoxResizable: false,
                        zoom: -0.2,
                        checkImageOrigin: true,
                        background: false,
                        //Container的最小大小为屏幕的大小，无法获取屏幕高度时使用300*400
                        minContainerHeight: document.documentElement ? document.documentElement.clientHeight ? document.documentElement.clientHeight : 400 : 400,
                        minContainerWidth: document.documentElement ? document.documentElement.clientWidth ? document.documentElement.clientWidth : 300 : 300
                    };
                };
                

                
                return service;
            }
        ]);
});