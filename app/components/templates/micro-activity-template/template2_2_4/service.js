

define(['ionic'], function () {
    return angular.module('microOldNewTemplate2_2_4.service', []).
        factory('microOldNewTemplate2_2_4Service', ['$http', function ($http) {

            var microOldNewTemplate2_2_4Service = {};
            microOldNewTemplate2_2_4Service.model = {
                description: "相信我们\n" +
                    "来贝贝少儿教育吧！"
            }
            return microOldNewTemplate2_2_4Service
        }]);
})

