"use strict";
/**
 * author: 
 * time:
 * description:微店首页
 */


define([
    "ionic",
    "modules/micro-shop-participate-activity-app/controller",
    "services/permission"
], function() {

    return angular.module("MicroShopParticipateActivityApp", [
            "ionic",
            "MicroShopParticipateActivityApp.controllers",
            "services.permission"
        ])
        .config([
            '$stateProvider',
            function($stateProvider) {

                $stateProvider.state('microshop.participateactivity', {
                    title: '编辑您的信息',
                    cache: false,
                    url: '/participateactivity?productId&type',
                    templateUrl: 'modules/micro-shop-participate-activity-app/micro-shop-participate-activity-app.html',
                    controller: 'MicroShopParticipateActivityAppController',
                    resolve: {
                        permission: ["permissionService", "$stateParams", function(permissionService, $stateParams) {
                            window.wx && window.wx.hideOptionMenu();
                            //统一增加后台页面的Loading效果
                            $(".lockMask-loading2").show();
                            return ;
                        }]
                    }

                });

            }
        ]);
});