/**
 * author :LTD
 * time: 2015年9月15日 15:14:53
 * description: 微官网统计服务
 */
define(['ionic'], function () {
    return angular.module('services.net.siteStatistics', []).
        factory('siteStatisticsNetService', ['$http', function ($http) {
            // todo Mock
            function getModel(orgId) {
                return {
                    "data": [
                        {
                            Date: "2011/01/02",
                            Pv: 1,
                            Vv: 10,
                            Ac:100
                        },
                        {
                            Date: "2011/01/03",
                            Pv: 2,
                            Vv: 20,
                            Ac: 200
                        },
                        {
                            Date: "2011/01/04",
                            Pv: 3,
                            Vv: 30,
                            Ac: 300
                        },
                        {
                            Date: "2011/01/05",
                            Pv: 4,
                            Vv: 40,
                            Ac: 400
                        },
                        {
                            Date: "2011/01/06",
                            Pv: 5,
                            Vv: 50,
                            Ac: 500
                        },
                        {
                            Date: "2011/01/07",
                            Pv: 6,
                            Vv: 60,
                            Ac: 600
                        },
                        {
                            Date: "2011/01/08",
                            Pv: 7,
                            Vv: 70,
                            Ac: 700
                        }
                    ]
                }
            }
            //微官网
            function GetWebsiteFgStatistics(id) {
                return $http.post("/Common/GetWebsiteFgStatistics", { originId: id });
            }; 
            
            function GetActivityFgStatistics(id) {
                return $http.post("/Common/GetActivityFgStatistics", { originId: id });
            };

            function GetActivityFgStatisticsByUser(userId, templateId) {
                return $http.post("/Common/GetActivityFgStatisticsByUser", { userId: userId, templateId: templateId });
            };

            function getActivityModel(UserId, Id) {
                return $http.post("/Activity/GetDetail", { userId: UserId, templateId: Id });
            }

            return {
                GetWebsiteFgStatistics: GetWebsiteFgStatistics,
                GetActivityFgStatistics: GetActivityFgStatistics,
                getActivityModel: getActivityModel,
                GetActivityFgStatisticsByUser: GetActivityFgStatisticsByUser
            }

        }]);
})