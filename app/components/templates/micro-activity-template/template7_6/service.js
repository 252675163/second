

define(['ionic'], function () {
    return angular.module('microOldNewTemplate7_6.service', []).
        factory('microOldNewTemplate7_6Service', ['$http', function ($http) {

            var MicroOldNewTemplate7_6Service = {};
            MicroOldNewTemplate7_6Service.model = {
                title: "父母微课堂",
                description:"讲师：Christina\n"+
                    "时间：2015年11月30日\n" +
                    "          14:00-16:00\n" +
                    "地点：杭州市西湖区文二路188号\n"+
                    "交通：附近公交站“浙江工商大学 \n" +
                    "          站”可乘坐公交15路、56路、 \n" +
                    "          77路、307路、快速公交\n" +
                    "          B2线前往。",
            }
            return MicroOldNewTemplate7_6Service
        }]);
})

