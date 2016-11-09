"use strict";
/**
 * author
 * time:
 * description:新建活动页面
 */


define([
    "ionic",
    "modules/user-login-app/controller",
    "services/permission"
], function() {

    return angular.module("UserLoginApp", [
            "ionic",
            "UserLoginApp.controllers",
            "services.permission"
        ])
        .config([
            "$stateProvider",
            function($stateProvider) {

                $stateProvider.state("userLogin", {
                    title: "校宝秀登陆",
                    cache: false,
                    url: "/userLogin?userType",
                    //userType = 0:绑过手机的老用户，userType = 1：其他未绑定的用户
                    templateUrl: "modules/user-login-app/template.html",
                    controller: "userLoginAppController",
                    resolve: {
                        permission: [
                            "permissionService", "$stateParams", function (permissionService, $stateParams) {
                                //统一增加后台页面的Loading效果 by xp 2015年11月13日 16:09:13
                                $(".lockMask-loading2").show();

                                return;
                            }
                        ]
                    }
                });

            }
        ]);
});