"use strict";
/**
 * author:cxd
 * time:2016年7月1日19:33:30
 * description:冻结场景 推文页
 */


define([
    "ionic",
    "modules/user-refrezeguide-app/controller",
    "services/permission"
], function () {

    return angular.module("UserRefrezeguideApp", [
        "ionic",
        "UserRefrezeguideApp.controllers",
        "services.permission"
    ])
        .config([
            '$stateProvider',
            function ($stateProvider) {

                $stateProvider.state('refrezeguide', {
                    title:'校宝秀',
                    cache: false,
                    url: '/refrezeguide?scenefreezeId&appealId',
                    templateUrl: 'modules/user-refrezeguide-app/template.html',
                    controller: 'UserRefrezeguideAppController',
                    resolve: {
                        permission: ["permissionService", "$stateParams", function (permissionService, $stateParams) {
                            //统一增加后台页面的Loading效果 by xp 2015年11月13日 16:09:13
                            $(".lockMask-loading2").show();
                            return permissionService.hasPermission();
                        }]
                    }

                });

            }
        ])
})
