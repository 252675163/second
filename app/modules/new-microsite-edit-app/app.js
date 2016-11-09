"use strict";
/**
 * author :小潘
 * time: 2015年12月1日 15:13:52
 * description: 新微官网编辑模块
 */


define([
    "ionic",
    "modules/new-microsite-edit-app/directive",
    "modules/new-microsite-edit-app/controller",
    //微官网模板模块
    //"components/templates/new-micro-site-template/app",
    "components/WebsiteUpload_img/app",
    "services/permission",
    "services/net/common",
    "services/net/new-site-edit",

], function() {

    return angular.module("NewMicroSiteEditApp", [
            "ionic",
            "NewMicroSiteEditApp.directives",
            "NewMicroSiteEditApp.controllers",
            // "NewMicroTemplate",
            "services.permission",
            "services.net.newSiteEdit",
            "WebsiteUploadImg"
        ])
        .config([
            "$stateProvider",
            function($stateProvider) {
                $stateProvider.state("newsite.edit", {
                    url: "/edit?templateId&websiteId&isNew",
                    title: "编辑我的微官网",
                    templateUrl: "modules/new-microsite-edit-app/new-microsite-edit-app.html",
                    controller: "NewMicroSiteEditAppController",
                    resolve: {
                        webSite: [
                            "newSiteEditNetService", "$stateParams", "$rootScope", "commonNetService", "$timeout",
                            function(newSiteEditNetService, $stateParams, $rootScope, commonNetService, $timeout) {
                                //统一增加后台页面的Loading效果 by xp 2015年11月13日 16:09:13
                                $(".lockMask-loading2").show();
                                return newSiteEditNetService.getWebSite($stateParams.websiteId).then(function(result) {

                                    var webSite = result.data;
                                    //数据统计
                                    commonNetService.saveBackLog({ OriginId: webSite.Id, Type: "Website", Operation: "Edit" }).then(function(res) {
                                        //统一增加后台页面的Loading效果 by xp 2015年11月13日 16:09:13
                                        if (!$rootScope.isFirstLoad) {
                                            $timeout(function() {
                                                $(".lockMask-loading2").hide();
                                                $rootScope.isFirstLoad = true;
                                            }, 1833);
                                        } else {
                                            $timeout(function() {
                                                $(".lockMask-loading2").hide();
                                                $rootScope.isFirstLoad = true;
                                            }, 1000);
                                        }
                                    });

                                    return webSite;

                                });
                            }
                        ],
                    }

                });

            }
        ]);
});