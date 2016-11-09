"use strict";
/**
 * author :小潘
 * time: 2015年10月19日 16:03:28
 * description:
 */


define(["ionic", "services/net/site-statistics", "services/net/common"], function () {
    return angular.module("MicroActivityStatisticsApp.services", ["services.net.siteStatistics", "services.net.common"])
        .service("MicroActivityStatisticsAppService", [
            "$rootScope", "siteStatisticsNetService","commonNetService",
            function ($rootScope, siteStatisticsNetService, commonNetService) {
                var microActivityStatisticsAppService = {};

                microActivityStatisticsAppService.GetWebsiteFgStatistics = function(id) {
                    return siteStatisticsNetService.GetWebsiteFgStatistics(id);
                };
                microActivityStatisticsAppService.GetActivityFgStatistics = function(id) {
                    return siteStatisticsNetService.GetActivityFgStatistics(id);
                };
                microActivityStatisticsAppService.GetActivityFgStatisticsByUser = function(userId, templateId) {
                    return siteStatisticsNetService.GetActivityFgStatisticsByUser(userId, templateId);
                };
                microActivityStatisticsAppService.getActivityModel = function(UserId, Id) {
                    return siteStatisticsNetService.getActivityModel(UserId, Id);
                };

                microActivityStatisticsAppService.GetFgStatistics = function (activityId,type) {
                    return commonNetService.GetFgStatistics(activityId,type)
                }   
                return microActivityStatisticsAppService;
            }
        ]);
});