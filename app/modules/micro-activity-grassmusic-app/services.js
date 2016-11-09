"use strict";
/**
 * author :小宝
 * time: 2015年9月9日 20:59:58
 * description:
 */

define(["ionic"],function () {
    return angular.module("MicroActivityGrassMusicApp.services", [])
        .service("MicroActivityGrassMusicAppService", [
            "$rootScope",
            function ($rootScope) {
                var MicroActivityGrassAppService = {};


                return MicroActivityGrassAppService;
            }
        ]);
});


