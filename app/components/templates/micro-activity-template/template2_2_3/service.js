

define(['ionic'], function () {
    return angular.module('microOldNewTemplate2_2_3.service', []).
        factory('microOldNewTemplate2_2_3Service', ['$http', function ($http) {

            var microOldNewTemplate2_2_3Service = {};
            microOldNewTemplate2_2_3Service.model = {
                description: "如何让孩子学习、玩耍两不误？\n" +
                "如何让孩子养成专注、耐心、\n" +
                "积极沟通的好习惯？",
                imageUrl: ['http://cdn.schoolpal.cn/shiningstar'+'/Activity/20151028171350-f538d.png']
            }
            return microOldNewTemplate2_2_3Service
        }]);
})

