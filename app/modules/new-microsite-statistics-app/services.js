"use strict";
/**
 * author :小潘
 * time: 2015年9月9日 20:59:58
 * description:
 */


define(["ionic", "services/net/site-statistics", "services/net/common"], function () {
    return angular.module("NewMicroSiteStatisticsApp.services", ["services.net.siteStatistics", "services.net.common"])
        .service("NewMicroSiteStatisticsAppService", [
            "$rootScope", "siteStatisticsNetService", "commonNetService",
            function ($rootScope, siteStatisticsNetService, commonNetService) {
                var NewMicroSiteStatisticsAppService = {};

                NewMicroSiteStatisticsAppService.GetWebsiteFgStatistics = function (id) {
                    return siteStatisticsNetService.GetWebsiteFgStatistics(id);
                };
                NewMicroSiteStatisticsAppService.GetActivityFgStatistics = function (id) {
                    return siteStatisticsNetService.GetActivityFgStatistics(id);
                };
                NewMicroSiteStatisticsAppService.GetActivityFgStatisticsByUser = function (userId, templateId) {
                    return siteStatisticsNetService.GetActivityFgStatisticsByUser(userId, templateId);
                };
                NewMicroSiteStatisticsAppService.getActivityModel = function (UserId, Id) {
                    return siteStatisticsNetService.getActivityModel(UserId, Id);
                };

                NewMicroSiteStatisticsAppService.GetFgStatistics = function (websiteId, type) {
                    return commonNetService.GetFgStatistics(websiteId, type)
                }

                return NewMicroSiteStatisticsAppService;
            }
        ]);
});