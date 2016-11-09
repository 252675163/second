/**
 * 
 */
define(['ionic'], function () {
    return angular.module('Template23_2.Service', []).
        factory('template23_2Service', ['$http', 'activityFormService', function ($http, activityFormService) {


            var service = {};
            service.model =
            {
                title: "活动详情",
                description: "1、满天星教育夏招活动开始啦！邀请朋友帮你捕鱼，可以减免学费哦~<br/>"
                                + "2、现场报名时，凭你的手机号与水族馆的鱼总数兑换相应的学费优惠。<br/>"
                                + "3、介绍朋友报名，更有惊喜大礼等你拿哦！"
            };







            return service

        }]);
});



