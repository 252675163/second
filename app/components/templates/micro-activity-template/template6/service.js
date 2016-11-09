

define(['ionic'], function () {
    return angular.module('microOldNewTemplate6.service', []).
        factory('microOldNewTemplate6Service', ['$http', function ($http) {

            var MicroOldNewTemplate6Service = {};
            MicroOldNewTemplate6Service.model = {
                title1: "向日葵教育",
                title2: "英语班公开课",
                content: "一次尝试\n也许是孩子重要的转折点。"
            }
            return MicroOldNewTemplate6Service
        }]);
})

