"use strict";
/**
 * author :小潘
 * time: 2015年9月9日 20:22:48
 * description: 微活动主模块
 */


define([
    "ionic",
    "modules/microsite-index-app/directive",
    "modules/microsite-index-app/controller",
    //"components/templates/micro-site-template/app",
    "services/permission",
    "services/net/common"
], function() {

    return angular.module("MicroSiteIndexApp", [
            "ionic",
            "MicroSiteIndexApp.directives",
            "MicroSiteIndexApp.controllers",
            "MicroTemplate",
            "services.permission",
            "services.net.common"

        ])
        .config([
            '$stateProvider',
            function($stateProvider) {

                $stateProvider.state('site.index', {
                    url: '/index?id',
                    title: '我的场景',
                    cache: false,
                    templateUrl: 'modules/microsite-index-app/microsite-index-app.html',
                    controller: 'MicroSiteIndexAppController',
                    resolve: {
                        webSite: [
                            "siteIndexNetService", "$stateParams", "$ionicLoading",
                            function(siteIndexNetService, $stateParams, $ionicLoading) {
                                $ionicLoading.show({
                                    template: '<ion-spinner icon="android"></ion-spinner>'
                                });
                                //根据userSign获取单个微官网的数据
                                return siteIndexNetService.getModel($stateParams.id).then(function(result) {

                                    var webSite = result.data;
                                    $ionicLoading.hide();
                                    return webSite;
                                });
                            }
                        ],
                        permission: ["permissionService", "$stateParams", function(permissionService, $stateParams) {
                            return permissionService.hasPermission();
                        }]
                    }


                });

            }
        ]);
});