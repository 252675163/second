"use strict";
/**
 * author :zhouhuijuan
 * time:2016.8.2
 * description:用户机构设置和数据迁移页
 */


define([
    "ionic",
    "modules/user-account-app/controller",
    "services/net/common",
    "services/permission"
], function () {

    return angular.module("UserAccountApp", [
        "ionic",
        "UserAccountApp.controllers",
        "services.net.common",
        "services.permission"
    ])
        .config([
            '$stateProvider',
            function ($stateProvider) {

                $stateProvider.state('userAccount', {
                    title:'机构账号设置',
                    cache: false,
                    //type=1 需要显示机构异常提示弹框
                    url: '/userAccount?type',
                    templateUrl: 'modules/user-account-app/template.html',
                    controller: 'userAccountAppController',
                    resolve: {
                        permission: ["permissionService", "$stateParams", function (permissionService, $stateParams) {
                            //统一增加后台页面的Loading效果 by xp 2015年11月13日 16:09:13
                            $(".lockMask-loading2").show();
                            return permissionService.hasPermission();
                        }]
                    }

                });

            }
        ]);
});
