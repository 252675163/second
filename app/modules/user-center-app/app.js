"use strict";
/**
 * author
 * time:
 * description:新建活动页面
 */


define([
    "ionic",
    "modules/user-center-app/controller",
    "services/net/common",
    "components/upload_img/app",
    "services/permission"
], function () {

    return angular.module("UserCenterApp", [
        "ionic",
        "UserCenterApp.controllers",
        "services.net.common",
        "UploadImg",
        "services.permission"
    ])
        .config([
            '$stateProvider',
            function ($stateProvider) {

                $stateProvider.state('userCenter', {
                    title:'用户中心',
                    cache: false,
                    url: '/userCenter',
                    templateUrl: 'modules/user-center-app/template.html',
                    controller: 'userCenterAppController',
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
