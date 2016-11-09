"use strict";
/**
 * author :小潘
 * time: 2015年9月9日 20:59:58
 * description:
 */

define(["ionic"],function () {
    return angular.module("MicroActivityGrassApp.services", [])
        .service("MicroActivityGrassAppService", [
            "$rootScope",
            function ($rootScope) {
                var MicroActivityGrassAppService = {};
                //todo 删
                //生成的音乐
                MicroActivityGrassAppService.getMusicUrl = function (musicId) {
                    switch (musicId) {
                        case "1":
                            return "http://abirdvideo.oss-cn-hangzhou.aliyuncs.com/%E7%88%B1%E5%95%A6%E5%95%A6.mp3";
                            break;
                        case "2":
                            return "http://greedyint-1course.oss.aliyuncs.com/GY/Audio/20150720170048-303d2.mp3";
                            break;
                        case "3":
                            return "http://greedyint-1course.oss.aliyuncs.com/XHD2/Audio/20150708153939-c0a50.mp3";
                            break;
                        case "4":
                            return "http://greedyint-1course.oss.aliyuncs.com/GY/Audio/20150722103656-d03d7.mp3";
                            break;
                        case "5":
                            return "http://greedyint-1course.oss.aliyuncs.com/GY/Audio/20150708143613-99d52.mp3";
                            break;
                        default:
                            return "http://abirdvideo.oss-cn-hangzhou.aliyuncs.com/%E7%88%B1%E5%95%A6%E5%95%A6.mp3";
                    }
                };
                //MicroActivityGrassAppService.updateShareConfig = function(id, shareConfig) {
                //    return activityPreviewNetService.updateShareConfig(id, shareConfig);
                //};


                return MicroActivityGrassAppService;
            }
        ]);
});


