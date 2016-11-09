"use strict";
/**
 * author
 * time:
 * description:VIP码兑换页面
 */


define([
    "ionic",
    "modules/user-redeemcode-exchange-app/controller",
    "services/permission"
], function () {

    return angular.module("UserRedeemCodeExchangeApp", [
        "ionic",
        "UserRedeemCodeExchangeApp.controllers",
        "services.permission"
    ])
        .config([
            '$stateProvider',
            function ($stateProvider) {

                $stateProvider.state('userRedeemCodeExchange', {
                    title: 'VIP码兑换',
                    cache: false,
                    url: '/userRedeemCodeExchange?quivive',
                    templateUrl: 'modules/user-redeemcode-exchange-app/template.html',
                    controller: 'userRedeemCodeExchangeAppController',
                    resolve: {
                        permission: ["permissionService", "$stateParams", function (permissionService, $stateParams) {
                            //自定义跟踪页面
                            if (window._hmt) {
                                window._hmt.push(['_trackPageview', "/usercenter/vipcode"]);
                            }
                            //统一增加后台页面的Loading效果 by xp 2015年11月13日 16:09:13
                            $(".lockMask-loading2").show();
                            return permissionService.hasPermission();
                        }]
                    }

                });

            }
        ]);
});
