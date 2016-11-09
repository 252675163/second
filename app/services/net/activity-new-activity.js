/**
 * Created by dayday on 2015/10/21.
 * 新建活动相关请求接口
 */
define(['ionic'], function () {
    return angular.module('services.net.activityNew', []).
        factory('activityNewNetService', ['$http', function ($http) {
            // todo Mock
            function getActivityTemplate() {
                return $http.post("/Activity/GetAllTemplates");

            }
            //新建一个活动
            function newActivity(){
                var url = "";
                var data = {};
                return $http.post(url,data);
            }

            return {
                getActivityTemplate: getActivityTemplate
            }

        }]);
})