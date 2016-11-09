"use strict";
/**
 * author :LTD
 * time: 2015年9月12日 14:43:48
 * description: 微官网预览模块
 */


define([
    "ionic",
    "modules/microsite-view-app/directive",
    "modules/microsite-view-app/controller",
    //微官网模板组件
    //"components/templates/micro-site-template/app",
    "services/net/common"
], function() {

    return angular.module("MicroSiteViewApp", [
            "ionic",
            "MicroSiteViewApp.directives",
            "MicroSiteViewApp.controllers",
            "MicroTemplate",
            "services.net.common"
        ])
        .config([
            '$stateProvider',
            function($stateProvider) {

                $stateProvider.state('site.view', {
                    url: '/view?currentPageIndex&id',
                    title: '这是我用校宝秀制作的场景',
                    shareImg: "http://cdn.schoolpal.cn/shiningstar" + "/Website/20151019214653-b7c17.jpg",
                    templateUrl: 'modules/microsite-view-app/microsite-view-app.html',
                    controller: 'MicroSiteViewAppController',
                    resolve: {
                        webSite: [
                            "siteViewNetService", "$stateParams", "$timeout", "commonNetService",
                            function(siteViewNetService, $stateParams, $timeout, commonNetService) {
                                //统一增加前台页面的Loading效果 by xp 2015年10月26日 20:22:57
                                $(".lockMask-loading2").show();


                                //根据userSign获取单个微官网的数据
                                return siteViewNetService.getModel($stateParams.id).then(function(result) {
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