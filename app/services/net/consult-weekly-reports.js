/**
 * Created by dayday on 2016/2/19.
 */
define(['ionic'], function () {
    return angular.module('services.net.consultWeeklyReports', []).
        factory('consultWeeklyReportsNetService', ['$http', function ($http) {
            //活动/微官网列表
            function getSummariesByHaveConsult(pageIndex, pageSize, type, startDate, endDate) {
                var data = {
                    Page: {PageIndex: pageIndex, PageSize: pageSize},
                    Filter: {Type: type,StartDate:startDate,EndDate:endDate}
                };
                //todo
                return $http.post("/Home/GetEnrollWeekly", data);
            }


            return {
                getSummariesByHaveConsult: getSummariesByHaveConsult
            }

        }
        ]
    )
});