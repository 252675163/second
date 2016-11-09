/**
 * Created by dayday on 2015/9/11.
 * author: 雪冬
 * time: 2016年10月18日19:49:49
 * description：
 */


define(["ionic", "services/net/activity-template"], function() {
    return angular.module("TemplateTextShow.Service", ["services.net.activityTemplate"]).
        factory("templateTextShowService", [
            function() {

                var service = {};
                service.model =
                {
                    titleColor:"#000",
                    bgColor: "#fff",                              //背景色值
                    radius: "5",                                  //圆角值
                    imgs: [0,0,0]                            //默认图片
                };

                service.render = function () { };
                service.setRenderCallback = function (callback) {
                    service.render = callback;
                };

                service.getConfigByAspectRatio =function(aspectRatio) {
                    return {
                        aspectRatio:aspectRatio?aspectRatio: 1 ,
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
                        minContainerHeight:  document.documentElement?document.documentElement.clientHeight?document.documentElement.clientHeight:400:400,
                        minContainerWidth: document.documentElement?document.documentElement.clientWidth?document.documentElement.clientWidth:300:300
                    };
                };
                return service;
            }
        ]);
});