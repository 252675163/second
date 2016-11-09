/**
 * Created by dayday on 2015/9/11.
 * 学习日记
 */
define(['ionic'], function () {
    return angular.module('Template5_1.Service', []).
        factory('template5_1Service', ['$http', function ($http) {

            var service = {};
            service.model =
            {
                content:["校宝秀国际教育","学习日记","  给孩子的最美礼物  \n让学习的路走得更远！"]
        };
            return service

        }]);
});