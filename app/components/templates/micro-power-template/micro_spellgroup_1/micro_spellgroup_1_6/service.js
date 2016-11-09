/**
 * author :zhouhuijuan
 * time: 2016年6月29日
 * description:砍价策略制定输入
 */
define(["ionic", "services/net/activity-template"], function () {
    return angular.module('MicroSpellgroup1_6.Service', ["services.net.activityTemplate"]).
        factory('microSpellgroup1_6Service', ['$http', 'activityFormService', 'activityTemplateService',
            function ($http, activityFormService, activityTemplateService) {


                var service = {};
                service.getHelpersByActivityId = function (id, state, pageIndex, pageSize) {
                    return activityTemplateService.getHelpersByActivityId(id, state, pageIndex, 5)
                }
                //获取活动助力详情列表 微拼团模板
                service.getHelperList = function (activityUserId) {
                    return activityTemplateService.getHelperList(activityUserId);

                }


                return service;

            }]);
});



