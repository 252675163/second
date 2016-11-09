

define(['ionic'], function () {
    return angular.module('microOldNewTemplate7_3.service', []).
        factory('microOldNewTemplate7_3Service', ['$http', function ($http) {

            var MicroOldNewTemplate7_3Service = {};
            MicroOldNewTemplate7_3Service.model = {
                title: "做好科学合理的学习计划",
                description: "静下心来做一个规划，将单词的学习任务列下来，计算一下能够分配给英语词汇的学习时间，计划好每天应该完成的任务量，每日的任务必须当日完成。",
            }
            return MicroOldNewTemplate7_3Service
        }]);
})

