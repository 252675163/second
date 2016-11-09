

define(['ionic'], function () {
    return angular.module('microOldNewTemplate2_2_5.service', []).
        factory('microOldNewTemplate2_2_5Service', ['$http', function ($http) {

            var microOldNewTemplate2_2_5Service = {};
            microOldNewTemplate2_2_5Service.model = {
                title: '不一般的冬令营',
                description: "1.自然拼读法让孩子爱上英语\n" +
                "2.个性教程鼓励孩子独立思考\n" +
                "3.动手实践激发孩子想象力，创造力\n" +
                "4.团队活动培养领袖气质、责任意识",
                imageUrl: ['http://cdn.schoolpal.cn/shiningstar'+'/Activity/tem4_img_2.jpg',"http://cdn.schoolpal.cn/shiningstar"+'/Activity/20151028171430-f7f49.png']
            }
            return microOldNewTemplate2_2_5Service
        }]);
})

