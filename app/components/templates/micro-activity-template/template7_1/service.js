

define(['ionic'], function () {
    return angular.module('microOldNewTemplate7_1.service', []).
        factory('microOldNewTemplate7_1Service', ['$http', function ($http) {

            var MicroOldNewTemplate7_1Service = {};
            MicroOldNewTemplate7_1Service.model = {
                title1: "新概念教育",
                title2: "父母英语微课堂",
                description: "快速解答问题\n" +
                    "让英语学习更轻松",
                imageUrl: [window.resourceDoMain+'/app/img/acty12_img.png']
            }
            return MicroOldNewTemplate7_1Service
        }]);
})

