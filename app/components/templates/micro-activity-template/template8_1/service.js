/**
 * Created by dayday on 2015/9/11.
 */
define(['ionic'], function () {
    return angular.module('Template8_1.Service', []).
        factory('template8_1Service', ['$http', function ($http) {

            var service = {};
            service.model =
            {

                description:"您收到一张神秘的圣诞舞会邀请函快打开看看吧~"
            }

            return service

        }]);
})