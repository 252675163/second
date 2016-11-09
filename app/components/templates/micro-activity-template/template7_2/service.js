

define(['ionic'], function () {
    return angular.module('microOldNewTemplate7_2.service', []).
        factory('microOldNewTemplate7_2Service', ['$http', function ($http) {

            var MicroOldNewTemplate7_2Service = {};
            MicroOldNewTemplate7_2Service.model = {
                title1:"Question:",
                description1: "如何让孩子既快又有效地掌握英文单词？",
                title2:"Answer:",
                description2: "1. 引导孩子做好科学合理的学习计划；\n"+
                        "2. 向孩子强调全面地理解、掌握单词的重要性 ；\n"+
                        "3. 鼓励孩子在听说读写练习中复习和检验单词的掌握情况 ",
            }
            return MicroOldNewTemplate7_2Service
        }]);
})

