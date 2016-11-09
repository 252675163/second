/**
 * Created by dayday on 2015/9/11.
 */
define(['ionic'], function () {
    return angular.module('Template3_6.Service', []).
        factory('template3_6Service', ['$http', function ($http) {

            var service = {};
            service.model =
            {
                title:["活动详情"],
                description:["1.活动时间\n2.活动范围\n3.参与方式"]
            };
            return service

        }]);
})
