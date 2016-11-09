/**
 * author :陈雪冬
 * time: 2016年7月27日17:13:09
 * description:微海报2
 */
define(['ionic'], function () {
    return angular.module('MicroPoster2_7.Service', []).
        factory('microBoster2_7Service', ['$http', 'activityFormService', function ($http, activityFormService) {


            var service = {};
            service.model =
                {
                    title: "报名优惠",
                    description: ["优贝教育，专注于3-6岁幼儿的幼小衔接教学。13年教育品牌，特有专业的课程体系，标准化的管理流程，拥有强大的师资力量和较好的学习氛围。", "优贝教育，专注于3-6岁幼儿的幼小衔接教学。13年教育品牌，特有专业的课程体系，标准化的管理流程，拥有强大的师资力量和较好的学习氛围。"]

                };
            return service;

        }]);
});



