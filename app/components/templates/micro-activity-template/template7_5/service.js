

define(['ionic'], function () {
    return angular.module('microOldNewTemplate7_5.service', []).
        factory('microOldNewTemplate7_5Service', ['$http', function ($http) {

            var MicroOldNewTemplate7_5Service = {};
            MicroOldNewTemplate7_5Service.model = {
                title: "在实际\n" +
                        "练习中\n" +
                        "复习和检测",
                description: "英语单词的学习不是孤立的，一定要结合文章和其他各种练习来加深理解和掌握程度。\n\n"+
                             "我们只有主动地去学习和体会单词的用法，才能更深层次地记忆和掌握单词。",
            }
            return MicroOldNewTemplate7_5Service
        }]);
})

