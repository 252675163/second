/**
 * Created by dayday on 2015/9/11.
 */
define(["ionic", "services/net/activity-template"], function() {
    return angular.module("Template19_6.Service", ["services.net.activityTemplate"]).
        factory("template19_6Service", [
            "$http", "activityFormService", "activityTemplateService", function($http, activityFormService, activityTemplateService) {

                var service = {};
                service.model =
                {
                    titleColor:"#000",
                    bgColor: "#fff",                              //背景色值
                    radius: "5",                                  //圆角值
                    imgs: [0,0,0]                            //默认图片
                };

                //后去排行榜
                service.getGrassRanks = function (id, userType) {
                    //是否是第一次分享出来的页面
                    var isFirstShare = userType == "old" ? true : false;
                    return activityTemplateService.getGrassRanks(id, isFirstShare);

                };

                service.render = function () { };
                service.setRenderCallback = function (callback) {
                    service.render = callback;
                };
                var data = {};
                //设置图片信息
                service.getImgInfo = function () {
                    return data;
                };
                //保存图片信息
                service.setImgName = function (info) {
                    data.imgs = info;
                }
                //清空data
                service.cleanDate = function () {
                    data = {};
                }
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