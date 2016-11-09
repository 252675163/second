"use strict";
/**
 * author :小潘
 * time: 2015年12月1日 15:21:33
 * description: 新微官网前台模块（无鉴权）
 */


define([
    "ionic",
    "modules/new-microsite-view-app/directive",
    "modules/new-microsite-view-app/controller",
    //微官网模板组件
    //"components/templates/new-micro-site-template/app",
    "services/net/common",
    //点赞
    "components/site_praise/app"
], function() {

    return angular.module("NewMicroSiteViewApp", [
            "ionic",
            "NewMicroSiteViewApp.directives",
            "NewMicroSiteViewApp.controllers",
            // "NewMicroTemplate",
            "services.net.common",
            //点赞
            "SitePraise"
        ])
        .config([
            '$stateProvider',
            function($stateProvider) {

                $stateProvider.state('newsite.view', {
                    url: '/view?id&sceneTemporaryUnfreezeValue',
                    title: '这是我用校宝秀制作的场景',
                    shareImg: "http://cdn.schoolpal.cn/shiningstar" + "/Website/20151019214653-b7c17.jpg",
                    templateUrl: 'modules/new-microsite-view-app/new-microsite-view-app.html',
                    controller: 'NewMicroSiteViewAppController',
                    resolve: {
                        webSite: [
                            "newSiteViewNetService", "$stateParams", "$timeout", "commonNetService",
                            function(newSiteViewNetService, $stateParams, $timeout, commonNetService) {
                                //统一增加前台页面的Loading效果 by xp 2015年10月26日 20:22:57
                                $(".lockMask-loading2").show();


                                //根据userSign获取单个微官网的数据
                                return newSiteViewNetService.getModel(parseInt($stateParams.id,10), $stateParams.sceneTemporaryUnfreezeValue).then(function(result) {
                                    //统一增加前台页面的Loading效果 by xp 2015年10月26日 20:22:57
                                    //强制限时1.83秒
                                    $timeout(function() {
                                        $(".lockMask-loading2").hide();
                                    }, 1833);
                                    var webSite = result.data;
                                    //数据统计
                                    commonNetService.saveForeLog({ OriginId: webSite.Id, Type: 'Website', Operation: 'Visit' });
                                    return webSite;
                                });
                            }
                        ]
                    }

                });

            }
        ]);
});