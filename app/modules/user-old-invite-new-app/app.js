"use strict";
/**
 * author
 * time:
 * description:新建活动页面
 */


define([
    "ionic",
    "modules/user-old-invite-new-app/controller",
    "services/permission"
], function () {

    return angular.module("UserOldInviteNewApp", [
        "ionic",
        "UserOldInviteNewApp.controllers",
        "services.permission"
    ])
        .config([
            '$stateProvider',
            function ($stateProvider) {

                $stateProvider.state('oldinvitenew', {
                    title:'邀请有礼',
                    cache: false,
                    url: '/oldinvitenew?id&isshare&iscutpage',
                    templateUrl: 'modules/user-old-invite-new-app/template.html',
                    controller: 'OldInviteNewController',
                    resolve: {
                        permission: ["permissionService", "$stateParams", function (permissionService, $stateParams) {
                            //自定义跟踪页面
                            if (window._hmt) {
                                window._hmt.push(['_trackPageview', "/usercenter/invitation"]);
                            }
                            //统一增加后台页面的Loading效果 by xp 2015年11月13日 16:09:13
                            $(".lockMask-loading2").show();
                           
                            if($stateParams.id) {
                                return;
                            }else{
                                return permissionService.hasPermission();
                            }
                        }]
                    }

                });

            }
        ]);
});
