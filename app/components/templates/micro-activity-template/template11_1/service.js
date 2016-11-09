/**
 * author :wenjun
 * time: 2015年11月23日
 * description:元旦活动模板
 */
define(['ionic','services/net/activity-view'], function () {
    return angular.module('Template11_1.Service', ['services.net.activityView']).
        factory('template11_1Service', ['activityFormService','activityViewNetService', function (activityFormService,activityViewNetService) {

            var service = {};
            service.model =
            {
                title: ["元旦快乐", "Happy New Year"],
                description: ["来自『", " XXX", "』的祝福"]
            };
            service.GetActivityUserInfo = function (userId) {
                return activityViewNetService.GetActivityUserInfo(userId);
            };



            return service

        }]);
});