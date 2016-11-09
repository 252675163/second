"use strict";
/**
 * author:yinglechao
 * time:2016.1.5
 * description:新官网排行榜
 */


define([
    "ionic",
    "modules/new-microsite-rank-app/controller",
    "services/permission"
], function () {

    return angular.module("MicroSiteRankApp", [
        "ionic",
        "MicroSiteRankApp.controllers",
        "services.permission"
    ])
        .config([
            '$stateProvider',
            function ($stateProvider) {

                $stateProvider.state('newsite.rank', {
                    title:'微官网风云榜',
                    url: '/rank?isShareView&websiteId',//isShare是否是分享后的页面
                    templateUrl: 'modules/new-microsite-rank-app/new-microsite-rank-app.html',
                    controller: 'microSiteRankAppController',

                    resolve: {
                        webSite: [
                            "$stateParams", "$rootScope", "$timeout",
                            function( $stateParams, $rootScope,$timeout) {

                                $(".lockMask-loading2").show();
                                if (!$rootScope.isFirstLoad) {
                                    $timeout(function () {
                                        $(".lockMask-loading2").hide();
                                        $rootScope.isFirstLoad = true;
                                    }, 1833);
                                } else {
                                    $timeout(function () {
                                        $(".lockMask-loading2").hide();
                                        $rootScope.isFirstLoad = true;
                                    }, 1000);
                                }
                                return
                            }
                        ],
                        permission: ["permissionService", "$stateParams", function (permissionService, $stateParams) {
                            //todo??
                            ////分享出去的前台页面不做鉴权
                            if($stateParams.isShareView=='true'){
                                return
                            }else{
                                return permissionService.hasPermission();
                            }

                        }]
                    }

                });

            }
        ]);
});
