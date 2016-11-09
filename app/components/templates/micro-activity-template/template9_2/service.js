/**
 * Created by dayday on 2015/9/11.
 */
define(['ionic'], function () {
    return angular.module('Template9_2.Service', []).
        factory('template9_2Service', ['$http', function ($http) {

            var service = {};
            service.model =
            {
                title: "半个月后期中考，您准备好了吗？",
                title1:"孩子心理",
                title2:"孩子生理",
                title3:"考试技巧",
                title4: "备考情绪",
                content: "期中考，策略好，成绩才能领先跑"
            }

            return service

        }]);
})