/**
 * Created by dayday on 2015/9/11.
 */
define(['ionic'], function () {
    return angular.module('Template13_2.Service', []).
        factory('template13_2Service', ['$http','activityFormService', function ($http,activityFormService) {


            var service = {};
            service.model =
            {


                title:"活动详情",
                description:"1、满天星教育促销大优惠啦，喊人种草可以换取学费抵扣券哦~<br/>"
                            +"2、你来学校现场报名时，报上你的手机号，即可享受与种草数相应的学费优惠。<br/>"
                            +"3、介绍朋友报名更有惊喜大奖等你拿！"
            };




            return service

        }]);
});



