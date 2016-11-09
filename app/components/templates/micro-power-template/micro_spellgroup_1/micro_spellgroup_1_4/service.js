/**
 * author :xujiawen
 * time: 2016年6月29日
 * description:砍价联系方式
 */
define(["ionic", "services/net/activity-template"], function() {
    return angular.module("MicroSpellgroup1_4.Service", ["services.net.activityTemplate"]).
        factory("microSpellgroup1_4Service", [
            "$http", "activityFormService", "activityTemplateService", function($http, activityFormService, activityTemplateService) {

                var service = {};
                service.model =
                {
                    title:"游戏规则",
                    description: [" 1.本次活动每人只能进行一次报名。"+
           "\n2.您可以开新团或直接参团。"+
           "\n3.当有人开团后，您可以查看【火热拼团中】的名单，快速参加。"+
           "\n4.报名成功后邀请小伙伴参加，快速完成拼团。"+
           "\n5.拼团完成后请尽快联系我们哦~"]
                };
                
                return service;
            }
        ]);
});