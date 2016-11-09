/**
 * Created by dayday on 2015/9/11.
 */
define(['ionic'], function () {
    return angular.module('Template3_2.Service', []).
        factory('template3_2Service', ['$http', function ($http) {

            var service = {};
            service.model =
            {
                description: "（优贝教育集团介绍）"
            }
            return service

        }]);
})