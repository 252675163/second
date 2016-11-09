"use strict";
/**
 * author
 * time:
 * description:新建活动页面
 */


define([
    "ionic",
    "modules/user-bind-schoolpal-app/controller",
    "services/permission"
], function() {

    return angular.module("UserBindSchoolPalApp", [
            "ionic",
            "UserBindSchoolPalApp.controllers",
            "services.permission"
        ])
        .config([
            "$stateProvider",
            function($stateProvider) {

                $stateProvider.state("bindSchoolPal", {
                    title: "用户中心",
                    cache: false,
                    url: "/bindSchoolPal",
                    templateUrl: "modules/user-bind-schoolpal-app/template.html",
                    controller: "userBindSchoolPalAppController",
                    resolve: {
                        permission: [
                            "permissionService", "$stateParams", function (permissionService, $stateParams) {
                                //统一增加后台页面的Loading效果 by xp 2015年11月13日 16:09:13
                                $(".lockMask-loading2").show();
                                return permissionService.hasPermission();
                            }
                        ]
                    }

                });

            }
        ]);
});