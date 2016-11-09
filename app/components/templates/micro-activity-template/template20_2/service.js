/**
 * Created by dayday on 2015/9/11.
 */
define(['ionic'], function () {
    return angular.module('Template20_2.Service', []).
        factory('template20_2Service', ['$http','activityFormService', function ($http,activityFormService) {


            var service = {};
            service.model =
            {
                title:"使用条件",
                description: "1、报名XX课程/报名满XX元可用\n"
                            + "2、【2016.5.1-2016.12.31】期间，每人只能用一张代金券"
            };

            var usageInfo = {};
            //外部获得使用条件
            service.getUsageInfo = function () {
                return usageInfo;
            };
            service.setUsageInfo = function (info) {
                usageInfo.description = info;
            };

            return service

        }]);
});



