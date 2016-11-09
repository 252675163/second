"use strict";
/**
 * author
 * time:
 * description:VIP订单列表
 */


define([
    "ionic",
    "modules/user-orderlist-app/controller",
    "services/permission"
], function () {

    return angular.module("UserOrderListApp", [
        "ionic",
        "UserOrderListApp.controllers",
        "services.permission"
    ])
        .config([
            '$stateProvider',
            function ($stateProvider) {

                $stateProvider.state('userOrderList', {
                    title:'VIP订单列表',
                    cache: false,
                    url: '/userOrderList?comeFrom',
                    templateUrl: 'modules/user-orderlist-app/template.html',
                    controller: 'userOrderListAppController',
                    resolve: {
                        permission: ["permissionService", "$stateParams", function (permissionService, $stateParams) {
                            //自定义跟踪页面
                            if (window._hmt) {
                                window._hmt.push(['_trackPageview', "/usercenter/remainingdays"]);
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
