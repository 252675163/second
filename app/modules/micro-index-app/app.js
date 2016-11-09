"use strict";
/**
 * author :小潘
 * time: 2015年11月5日 16:37:27
 * description: 校宝秀-首页
 */


define([
    "ionic",
    "modules/micro-index-app/controller",
    "services/net/common",
    "services/common-filter",
    "modules/micro-index-app/filters",
    "modules/micro-index-app/directive/directive",
], function () {
    return angular.module("MicroIndexApp", [
            "ionic",
            "MicroIndexApp.controllers",
            "services.net.common",
            "CommonFilter",
            "NumberFilter",
            "Notification.directives"
    ])
        .config([
            "$stateProvider",
            function ($stateProvider) {

                $stateProvider.state("index", {
                    title: "我的场景",
                    cache: false,
                    url: "/index",
                    templateUrl: "modules/micro-index-app/micro-index-app.html",
                    controller: "MicroIndexAppController",
                    resolve: {
                        userInfoModel: [
                            "MicroIndexAppService", "permissionService", "promptBarService", function (microIndexAppService, permissionService, promptBarService) {
                                //统一增加后台页面的Loading效果 by xp 2015年11月13日 16:09:13
                                $(".lockMask-loading2").show();
                                return microIndexAppService.getUserInfo().then(function (result) {
                                    if (result.data.status) {
                                        permissionService.setPhone(result.data.data.Phone || 0);
                                        return result.data.data;
                                    } else {
                                        //                                        promptBarService.showErrorBar(result.message, 3000);
                                        location.href = "/Common/Error?mark=MicroIndexApp_getUserInfo_result.data.status_Equal_Zero";
                                        return "";
                                    }
                                });
                            }
                        ],
                        permission: [
                            "permissionService", "$stateParams", function (permissionService, $stateParams) {
                                return permissionService.hasPermission();
                            }
                        ]
                    }
                });
            }
        ]);
});