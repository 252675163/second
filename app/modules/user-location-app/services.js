"use strict";
/**
 * author :cxd
 * time:2016年6月2日16:03:30
 * description:
 */


define(["ionic"], function () {
    return angular.module("UserLocationApp.services", ["Services.net.userCenter"])
        .service("userLocationAppService", [
            "$rootScope",  "promptBarService",
            function ($rootScope,  promptBarService) {
                var service = {};
                var alphaList = ["A","B","C","D","E","F","G","H","J","K","L","M","N","P","Q","R","S","T","W","X","Y","Z"]
                

               service.getAlphaList = function () {
                    return alphaList;
                };


                return service;
            }
        ]);
});


