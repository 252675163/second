

define(['ionic'], function () {
    return angular.module('microOldNewTemplate2_2_1.service', []).
        factory('microOldNewTemplate2_2_1Service', ['$http', function ($http) {

            var MicroOldNewTemplate2_2_1Service = {};
            MicroOldNewTemplate2_2_1Service.model = {
                title1: "—贝贝少儿教育—",
                title2: "寒假",
                title3: "冬令营",
                title4: "孩子快乐！家长舒心！",
            }
            return MicroOldNewTemplate2_2_1Service
        }]);
})

