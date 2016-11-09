/**
 * author :zhouhuijuan
 * time: 2016年6月29日
 * description:砍价策略制定输入
 */
define(["ionic", "services/net/activity-template"], function () {
    return angular.module('MicroSpellgroup1_2.Service', ["services.net.activityTemplate"]).
        factory('microSpellgroup1_2Service', ['$http', 'activityFormService', 'activityTemplateService',
            function ($http, activityFormService, activityTemplateService) {


            var service = {};
            service.getHelpersByActivityId = function (id, state, pageIndex, pageSize) {
                return activityTemplateService.getHelpersByActivityId(id,state,pageIndex,5)
            }
            var serviceData = {};
            service.getTemplateData = function () {
                return serviceData;
            }
            service.setTemplateData = function (templateData) {
                console.log("set");

                serviceData.templateData = templateData;
            }
         

            return service;

        }]);
});



