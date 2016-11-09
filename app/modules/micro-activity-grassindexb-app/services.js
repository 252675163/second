"use strict";
/**
 * author :小宝
 * time: 2015年9月9日 20:59:58
 * description:
 */

define(["ionic"],function () {
    return angular.module("MicroActivityGrassIndexBApp.services", [])
        .service("MicroActivityGrassIndexBAppService", [
            "$rootScope",
            function ($rootScope) {
                var MicroActivityGrassIndexBAppService = {};
                //生成的音乐
                MicroActivityGrassIndexBAppService.getMusicUrl = function (musicId) {
                    
                };
                //生成的音乐
                MicroActivityGrassIndexBAppService.getGrassUrl = function (score) {
                    switch (score)
                    {
                        case 1:
                            return window.resourceDoMain+"/app/img/mushroom_dance.gif";
                     
                        case 2:
                            return window.resourceDoMain+"/app/img/twograss.gif";

                        case 3:
                            return window.resourceDoMain+"/app/img/threegrass.gif";
                          
                        case 4:
                            return window.resourceDoMain+"/app/img/fourgrass.gif";
                        case 5:
                            return window.resourceDoMain+"/app/img/fivegrass.gif";
                        //case 6:
                        //    return "/app/img/fivemoregrass.gif";
                        default:
                            return window.resourceDoMain+"/app/img/fivemore.gif";
                    }
                };

                MicroActivityGrassIndexBAppService.getGrassClass = function (score) {
                    switch (score) {
                        case 1:
                            return "one";
                        case 2:
                            return "two";
                        case 3:
                            return "three";
                        case 4:
                            return "four";
                        case 5:
                            return "five";
                        default:
                            return "flowerpot";
                    }
                };
                return MicroActivityGrassIndexBAppService;
            }
        ]);
});


