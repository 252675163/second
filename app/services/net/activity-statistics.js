/**
 * author :LTD
 * time: 2015年9月15日 15:14:53
 * description: 微官网统计服务
 */
define(['ionic'], function () {
    return angular.module('services.net.activityStatistics', []).
        factory('activityStatisticsNetService', ['$http', function ($http) {
            // todo Mock
            function GetActivityFgStatistics(id) {
                return $http.post("/Common/GetActivityFgStatistics", { originId: id });
            };

            

            return {
                GetActivityFgStatistics: GetActivityFgStatistics
            }

        }]);
})