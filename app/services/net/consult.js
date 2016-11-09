/**
 * author :
 * time: 2015年9月15日 15:14:53
 * description: 微官网统计服务
 */
define(['ionic'], function () {
    return angular.module('services.net.consult', []).
        factory('consultNetService', ['$http', function ($http) {
            // todo Mock
            function GetActivityConsults(id,pageIndex,pageSize) {
                return $http.post("/Activity/GetConsults", { page: { pageIndex: pageIndex, pageSize: pageSize }, Filter: { OriginId: id } });
            };

            //todo
            function GetWebsiteConsults(id,pageIndex,pageSize) {
                return $http.post("/Website/GetConsults", { page: { pageIndex: pageIndex, pageSize: pageSize }, Filter: { OriginId: id } });
            };


            function GetUserSummaries(pageIndex, pageSize, type) {
                return $http.post("/Home/GetSummaries", { page: { pageIndex: pageIndex, pageSize: pageSize }, Filter: {  Type: type } });
            }
            //删除/恢复 参赛用户
            function UpdateActivityUserIsDeleted(id) {
                return $http.post("/Activity/UpdateActivityUserIsDeleted", { id: id});
            }

            return {
                GetActivityConsults: GetActivityConsults,
                GetWebsiteConsults: GetWebsiteConsults,
                GetUserSummaries: GetUserSummaries,
                UpdateActivityUserIsDeleted: UpdateActivityUserIsDeleted
            }

        }]);
})