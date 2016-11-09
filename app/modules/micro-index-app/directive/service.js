"use strict";
/**
 * Created by cm on 2016/1/5.
 */
define(["ionic","services/net/index"], function () {
    return angular.module("Notification.Service", ["services.net.index"]).
        factory("notificationService", [
            "$http", "$timeout", "$q","indexNetService",  function ($http, $timeout, $q,indexNetService) {

                var service = {};
                //获得过公告的配置
                //type：第一种通过location.href进行跳转。第二种站内页面跳转（$state.go）
                //content：顶部消息正文
                //link:跳转地址，例如：【http://www.baidu.com  | /new 】
                service.getNoticeConfig = function () {
                    return indexNetService.getNoticeConfig();
                };

                service.isShowNotice = function (configKey) {
                    return indexNetService.isShowNotice(configKey);
                }

                service.updateUserConfig = function (configKey,configValue) {
                    return indexNetService.updateUserConfig(configKey, configValue);
                }

                return service;
            }
        ]);
});