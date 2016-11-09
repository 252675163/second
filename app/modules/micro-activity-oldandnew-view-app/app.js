"use strict";
/**
 * author :LTD
 * time: 2015年9月14日 15:35:48
 * description: 微活动老带新预览
 */


define([
    "ionic",
    "modules/micro-activity-oldandnew-view-app/controller",
    "modules/micro-activity-oldandnew-view-app/directive",
    //微官网模板组件
    // "components/templates/micro-activity-template/app",
    
    // //微助力模板组件
    // "components/templates/micro-power-template/app",
    // //微传单模板组件
    // "components/templates/micro-leaflet-template/app",
    //微海报模板组件
    // "components/templates/micro-poster-template/micro_poster_1/app",
    // "components/templates/micro-poster-template/micro_poster_2/app",
    "services/net/common"
], function() {

    return angular.module("MicroActivityOldAndNewViewApp", [
            "ionic",
            "MicroActivityOldAndNewViewApp.controllers",
            "MicroActivityOldAndNewViewApp.directives",
            // "MicroActiveOldAndNewTemplate",
            // "MicroPowerTemplate",
            // "MicroLeafletTemplate",
            // "MicroPosterTemplate1",
            // "MicroPosterTemplate2",
            "services.net.common"
        ])
        .config([
            "$stateProvider",
            function($stateProvider) {

                $stateProvider.state("activity.oldandnewview", {
                    cache: false,
                    title: "免费微活动，点开有惊喜~",
                    shareImg: "http://cdn.schoolpal.cn/shiningstar" + "/Activity/20150924210053-2ae9c.jpg",
                    //新增地址栏参数shareTitle【微信自定义分享title】
                    url: "/oldandnewview?Id&templateId&oldUser&introducerId&step&shareTitle&defaultCurrentIndex&sceneTemporaryUnfreezeValue&content",
                    templateUrl: "modules/micro-activity-oldandnew-view-app/micro-activity-oldandnew-view-app.html",
                    controller: "MicroActivityOldAndNewViewAppController",
                    resolve: {
                        webSite: [
                            "$rootScope", "activityViewNetService", "$stateParams", "$timeout", "commonNetService",
                            function($rootScope, activityViewNetService, $stateParams, $timeout, commonNetService) {
                                //统一增加前台页面的Loading效果 by xp 2015年10月26日 20:22:57
                                $(".lockMask-loading2").show();
                                //根据userSign获取单个微官网的数据
                                return activityViewNetService.GetActivity($stateParams.Id,$stateParams.sceneTemporaryUnfreezeValue).then(function(result) {
                                    var webSite = result.data;
                                    //数据统计
                                    commonNetService.saveForeLog({ OriginId: webSite.Id, Type: "Activity", Operation: "Visit" }).then(function() {
                                        //统一增加后台页面的Loading效果 by xp 2015年11月13日 16:09:13
                                        //如果是种草的表单页面，loading在种草指令里控制 step!
                                        if (parseInt($stateParams.step||0)>1) {

                                        }else  if (!$rootScope.isFirstLoad) {
                                            $timeout(function() {
                                                $(".lockMask-loading2").hide();
                                                $rootScope.$broadcast('hideLoading');
                                                $rootScope.isFirstLoad = true;
                                            }, 1833);
                                        } else {
                                            $timeout(function() {
                                                $(".lockMask-loading2").hide();
                                                $rootScope.$broadcast('hideLoading');
                                                $rootScope.isFirstLoad = true;
                                            }, 1000);
                                        }
                                    });
                                    return webSite;
                                });
                            }
                        ]
                    }
                });

            }
        ]);
});