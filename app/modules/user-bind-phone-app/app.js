"use strict";
/**
 * author
 * time:
 * description:新建活动页面
 */


define([
    "ionic",
    "modules/user-bind-phone-app/controller",
    "services/permission"
], function() {

    return angular.module("UserBindPhoneApp", [
            "ionic",
            "UserBindPhoneApp.controllers",
            "services.permission"
        ])
        .config([
            "$stateProvider",
            function($stateProvider) {

                $stateProvider.state("bindPhone", {
                    title: "绑定手机",
                    cache: false,
                    url: "/bindPhone?go&cueType",
                    //go = 1:go绑定成功后跳转到用户中心，go = 2：绑定成功后跳转到首页
                    //cueType 绑定成功提示类型 Vip码扫码进入时
                    templateUrl: "modules/user-bind-phone-app/template.html",
                    controller: "userBindPhoneAppController",
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