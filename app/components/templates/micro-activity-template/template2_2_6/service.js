

define(['ionic'], function () {
    return angular.module('microOldNewTemplate2_2_6.service', []).
        factory('microOldNewTemplate2_2_6Service', ['$http', function ($http) {

            var microOldNewTemplate2_2_6Service = {};
            microOldNewTemplate2_2_6Service.model = {
                title1: "报名丰收大礼包",
                description:"1.课程学习丛书\n"+
                    "2.亲子活动图册\n"+
                    "3.家庭教育手册",
                title2: "时不待我\n" +
                    "报名要在12月10日之前哦！",
            }
            return microOldNewTemplate2_2_6Service
        }]);
})

