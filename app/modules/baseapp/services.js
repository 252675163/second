"use strict";
/**
 * author :小潘
 * time: 2015年9月9日 20:59:58
 * description:
 */

define(["ionic", 'services/net/common'], function () {
    return angular.module("BaseApp.services", ['services.net.common'])
    .factory("BaseAppService", [
        'commonNetService',"activityFormService", function (commonNetService) {
            var commonServices = {};


            return commonServices;
        }
    ]);
});