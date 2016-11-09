

define(['ionic'], function () {
    return angular.module('microOldNewTemplate7_4.service', []).
        factory('microOldNewTemplate7_4Service', ['$http', function ($http) {

            var MicroOldNewTemplate7_4Service = {};
            MicroOldNewTemplate7_4Service.model = {
                title: "全面地理解\n" +
                       "掌握单词",
                description: "只有真正理解、掌握了单词，才能再熟练、准确地运用、使用，这一点是非常重要的。\n\n"+
                             "对于单词，不仅要学会其基本词义，还要能够拼写，知道它的语法特点、习惯搭配以及语体色彩等，特别是重点词汇。\n\n"+
                             "语言的运用是灵活的，如果只是机械地背单词、用单词也是不够的，在做实际题目时一定要考虑语境。",
            }
            return MicroOldNewTemplate7_4Service
        }]);
})

