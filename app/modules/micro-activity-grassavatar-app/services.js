"use strict";
/**
 * author :小宝
 * time: 2015年9月9日 20:59:58
 * description:
 */

define(["ionic"], function () {
    return angular.module("MicroActivityGrassAvatarApp.services", [])
        .service("MicroActivityGrassAvatarAppService", [
            "$rootScope",
            function ($rootScope) {
                var MicroActivityGrassAvatarAppService = {};
                //生成的音乐
                MicroActivityGrassAvatarAppService.getMusicUrl = function (musicId) {

                };
                MicroActivityGrassAvatarAppService.model = {
                    title: "活动",
                    actionName: "活动标题",
                    description: "活动简介",
                    imageUrl: ['/app/img/testimg.png', '/app/img/testimg.png']
                }

                return MicroActivityGrassAvatarAppService;
            }
        ]);
});


