

define(['ionic'], function () {
    return angular.module('microOldNewTemplate2_2_2.service', []).
        factory('microOldNewTemplate2_2_2Service', ['$http', function ($http) {

            var microOldNewTemplate2_2_2Service = {};
            microOldNewTemplate2_2_2Service.model = {
                description: "一到寒假就担心：\n" +
                "电视看太多近视了？！\n" +
                "运动太少长胖了？！\n"+
                "别人孩子都在学习了？！",
                imageUrl: ['http://cdn.schoolpal.cn/shiningstar'+'/Activity/tem4_img_1.jpg']
            };
            return microOldNewTemplate2_2_2Service
        }]);
});


