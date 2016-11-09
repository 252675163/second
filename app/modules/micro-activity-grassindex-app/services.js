"use strict";
/**
 * author :小宝
 * time: 2015年9月9日 20:59:58
 * description:
 */

define(["ionic"],function () {
    return angular.module("MicroActivityGrassIndexApp.services", [])
        .service("MicroActivityGrassIndexAppService", [
            "$rootScope",
            function ($rootScope) {
                var MicroActivityGrassGrowAppService = {};
                //生成的音乐
                MicroActivityGrassGrowAppService.getMusicUrl = function (musicId) {
                    
                };
                return MicroActivityGrassGrowAppService;
            }
        ]);
});


