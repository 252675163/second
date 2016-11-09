/**
 * Created by dayday on 2015/9/11.
 */
define(['ionic'], function () {
    return angular.module('Template6_1.Service', []).
        factory('template6_1Service', ['$http', function ($http) {

            var service = {};
            service.model =
            {
                title:"感恩节",
                description:"2015-11-26\n"+
                "11月第四个星期四\n"+
                "COMING"
            }
            return service

        }]);
})