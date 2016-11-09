"use strict";
/**
 * description: 校宝秀-消息提醒设置
 */

define([
    "ionic",
    "modules/user-signupremind-setting-app/controller",
    "services/net/common"
], function() {

    return angular.module("UserSignUpRemindSettingApp", [
            "ionic",
            "UserSignUpRemindSettingApp.controllers",
            "services.net.common"
    ])
    .config([
            "$stateProvider",
            function ($stateProvider) {

                $stateProvider.state("userSignUpRemindSetting", {
                    title: "消息提醒设置",
                    cache: false,
                    url: "/userSignUpRemindSetting?go",
                    templateUrl: "modules/user-signupremind-setting-app/user-signupremind-setting-app.html",
                    controller: "userSignUpRemindSettingAppController",
                    resolve: {
                        permission: [
                            "permissionService", "$stateParams", function (permissionService, $stateParams) {

                                //自定义跟踪页面
                                if (window._hmt) {
                                    window._hmt.push(['_trackPageview', "/usercenter/remindersettings"]);
                                }
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