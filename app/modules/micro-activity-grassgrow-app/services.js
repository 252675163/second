"use strict";
/**
 * author :小宝
 * time: 2015年9月9日 20:59:58
 * description:
 */

define(["ionic"], function () {
    return angular.module("MicroActivityGrassGrowApp.services", [])
        .service("MicroActivityGrassGrowAppService", [
            "$rootScope",
            function ($rootScope) {
                var MicroActivityGrassGrowAppService = {};
                //生成的音乐
                MicroActivityGrassGrowAppService.getGrassUrl = function (index) {
                    switch (index) {
                        case 1:
                            return {
                                grassGrowUrl: window.resourceDoMain+"/app/img/grass1-1.gif",
                                grassDanceUrl: window.resourceDoMain+"/app/img/grass1-2.gif"
                            }
                            break;
                        case 2:
                            return {
                                grassGrowUrl: window.resourceDoMain+"/app/img/grass2-1.gif",
                                grassDanceUrl: window.resourceDoMain+"/app/img/grass2-2.gif"
                            }
                            break;
                        case 3:
                            return {
                                grassGrowUrl: window.resourceDoMain+"/app/img/bean-sprout-grow.gif",
                                grassDanceUrl: window.resourceDoMain+"/app/img/bean-sprout-dance.gif"
                            }
                            break;
                        case 4:
                            return {
                                grassGrowUrl: window.resourceDoMain+"/app/img/four-leaved-clover-grow.gif",
                                grassDanceUrl: window.resourceDoMain+"/app/img/four-leaved-clover-dance.gif"
                            }
                            break;
                        case 5:
                            return {
                                grassGrowUrl: window.resourceDoMain+"/app/img/pink-flower-grow.gif",
                                grassDanceUrl: window.resourceDoMain+"/app/img/pink-flower-dance.gif"
                            }
                            break;
                        case 6:
                            return {
                                grassGrowUrl: window.resourceDoMain+"/app/img/dandelion-grow.gif",
                                grassDanceUrl: window.resourceDoMain+"/app/img/dandelion-dance.gif"
                            }
                            break;
                        case 7:
                            return {
                                grassGrowUrl: window.resourceDoMain+"/app/img/sunflower-grow.gif",
                                grassDanceUrl: window.resourceDoMain+"/app/img/sunflower-dance.gif"
                            }
                            break;
                        case 8:
                            return {
                                grassGrowUrl: window.resourceDoMain+"/app/img/daisy-grow.gif",
                                grassDanceUrl: window.resourceDoMain+"/app/img/daisy-dance.gif"
                            }
                            break;
                        case 9:
                            return {
                                grassGrowUrl: window.resourceDoMain+"/app/img/grassmogu1-1.gif",
                                grassDanceUrl: window.resourceDoMain+"/app/img/grassmogu1-2.gif"
                            }
                            break;
                    }

                };
                return MicroActivityGrassGrowAppService;
            }
        ]);
});


