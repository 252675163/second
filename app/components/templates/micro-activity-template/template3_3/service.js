/**
 * Created by dayday on 2015/9/11.
 */
define(['ionic'], function () {
    return angular.module('Template3_3.Service', []).
        factory('template3_3Service', ['$http', function ($http) {

            var service = {};
            service.model =
            {
                title: "（优贝教育集团介绍）",
                description: "（优贝教育集团特色和荣誉）"

            }
            return service

        }]);
})