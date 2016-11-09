/**
 * author :huijuan
 * time: 2016年1月12日
 * description:招生模板
 */
define(['ionic','services/net/activity-view'], function () {
    return angular.module('Template15_2.Service', ['services.net.activityView']).
        factory('template15_2Service', ['activityFormService','activityViewNetService', function (activityFormService,activityViewNetService) {

            var service = {};
            service.model =
            {
                title: "活动介绍",
                description: "【课程简介】\n英语自然拼读班：用另一种方法巧学发音！\n绘本阅读英语班：开启孩子英语启蒙！\n小升初特别辅导班：为升学竞争力加分！\n\n【招生优惠】\n1.  前100位报名者，每门课享8折。\n2.  连报两门课，第二门课优惠300元。\n3.  介绍朋友报名再送100元学费代金券。"
            };
            service.GetActivityUserInfo = function (userId) {
                return activityViewNetService.GetActivityUserInfo(userId);
            };



            return service

        }]);
});