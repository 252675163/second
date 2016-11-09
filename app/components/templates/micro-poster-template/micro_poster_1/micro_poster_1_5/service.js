/**
 * Created by dayday on 2015/9/11.
 */
define(["ionic", "services/net/activity-template"], function () {
    return angular.module("MicroPoster1_5.Service", ["services.net.activityTemplate"]).
        factory("microPoster1_5Service", [
            "$http", function ($http) {

                var service = {};
                service.model =
                    {
                        title: "续班优惠活动",
                        description: "活动介绍"
                    };
                return service;
            }
        ]);
});